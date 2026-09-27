import { hubNameForTable, hubNameForTopic, isWatchedTable, type ChangeSignal } from "./watched";

/**
 * Kênh realtime phía trình duyệt, nhại bề mặt RealtimeChannel của SDK client cũ mà
 * bảy module lib/cloudflare-*.ts đang gọi - để chúng không phải đổi dòng nào.
 *
 * Một kênh mở tối đa hai loại kết nối tới Durable Object:
 *   - `topic:<tên>` nếu có presence hoặc broadcast;
 *   - `table:<bảng>` cho MỖI bảng có handler `postgres_changes`.
 *
 * HAI LỖI CŨ ĐƯỢC TRÁNH TỪ GỐC, không vá ở chỗ gọi (xem
 * lib/__tests__/realtime-channel-remount.test.ts):
 *   - `channel(topic)` luôn trả về một đối tượng MỚI, không bao giờ kênh cũ cùng tên;
 *   - `.on()` không bao giờ ném, kể cả sau `subscribe()`. Chính tổ hợp "trả kênh
 *     cũ" + "ném khi đã join" từng làm sập mọi trang có chuông thông báo.
 */

export type ChannelStatus = "SUBSCRIBED" | "CHANNEL_ERROR" | "TIMED_OUT" | "CLOSED";
// Handler nhận payload hình dạng khác nhau theo loại sự kiện, đúng như bề mặt
// không định kiểu của SDK client cũ mà bảy module đang viết theo.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- xem trên
type Cb = (...args: any[]) => void;
type Filter = { event?: string; table?: string; schema?: string; filter?: string };
type Listener = { type: string; filter: Filter; cb: Cb };
type ChannelOptions = { config?: { broadcast?: { self?: boolean }; presence?: { key?: string } } };
type RowFetcher = (table: string, id: number) => Promise<Record<string, unknown> | null>;

/** Chưa từng mở được lần nào mà hỏng chừng này lần thì dừng, đừng thử mãi. */
const GIVE_UP_AFTER = 3;
const MAX_BACKOFF_MS = 30_000;
const HEARTBEAT_MS = 25_000;

const warned = new Set<string>();
function warnOnce(key: string, msg: string) {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(msg);
}

class Link {
  ws: WebSocket | null = null;
  openedOnce = false;
  failures = 0;
  stopped = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private beat: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly name: string,
    private readonly self: boolean,
    private readonly onOpen: () => void,
    private readonly onMessage: (msg: Record<string, unknown>) => void,
    private readonly onGiveUp: () => void
  ) {}

  start() {
    if (this.stopped) return;
    const proto = location.protocol === "https:" ? "wss" : "ws";
    const url = `${proto}://${location.host}/realtime/${encodeURIComponent(this.name)}${this.self ? "?self=1" : ""}`;
    let ws: WebSocket;
    try {
      ws = new WebSocket(url);
    } catch {
      this.retry();
      return;
    }
    this.ws = ws;
    ws.onopen = () => {
      this.openedOnce = true;
      this.failures = 0;
      // Nhịp tim là chuỗi "ping" trần chứ không phải JSON: Durable Object trả
      // lời nó bằng setWebSocketAutoResponse mà KHÔNG phải thức dậy, nên một
      // phòng học ngồi im cả tiếng không tốn giờ chạy nào cho nhịp tim.
      this.beat = setInterval(() => {
        if (ws.readyState === 1) ws.send("ping");
      }, HEARTBEAT_MS);
      this.onOpen();
    };
    ws.onmessage = (e) => {
      if (typeof e.data !== "string" || e.data === "pong") return;
      try {
        const msg = JSON.parse(e.data);
        if (msg && typeof msg === "object") this.onMessage(msg);
      } catch {
        // bỏ qua tin hỏng
      }
    };
    ws.onclose = () => {
      this.clearBeat();
      this.ws = null;
      this.retry();
    };
    ws.onerror = () => {
      // onclose luôn theo sau onerror; xử lý ở đó để không thử lại hai lần.
    };
  }

  private retry() {
    if (this.stopped) return;
    this.failures++;
    // Chưa mở được lần nào - thường là không có hạ tầng (chạy `next dev` không
    // qua worker, nên /realtime/* rơi vào 404). Thử mãi chỉ làm đầy console và
    // mạng. Đã từng mở thì là rớt mạng thật: thử lại mãi, lùi dần.
    if (!this.openedOnce && this.failures >= GIVE_UP_AFTER) {
      this.stopped = true;
      this.onGiveUp();
      return;
    }
    const base = Math.min(MAX_BACKOFF_MS, 1000 * 2 ** Math.min(this.failures - 1, 5));
    this.timer = setTimeout(() => this.start(), base / 2 + Math.random() * (base / 2));
  }

  send(msg: unknown): boolean {
    if (this.ws?.readyState !== 1) return false;
    this.ws.send(JSON.stringify(msg));
    return true;
  }

  stop() {
    this.stopped = true;
    if (this.timer) clearTimeout(this.timer);
    this.clearBeat();
    try {
      this.ws?.close(1000, "unsubscribe");
    } catch {
      // đã đóng
    }
    this.ws = null;
  }

  private clearBeat() {
    if (this.beat) clearInterval(this.beat);
    this.beat = null;
  }
}

/** `cột=eq.giá_trị` - dạng duy nhất các module đang dùng. */
function parseFilter(f: string | undefined): { col: string; value: string } | "none" | null {
  if (!f) return "none";
  const m = f.match(/^([A-Za-z_][A-Za-z0-9_]*)=eq\.(.*)$/);
  return m ? { col: m[1], value: m[2] } : null;
}

export class CloudflareRealtimeChannel {
  private listeners: Listener[] = [];
  private topicLink: Link | null = null;
  private tableLinks = new Map<string, Link>();
  private presence: Record<string, unknown[]> = {};
  private tracked: Record<string, unknown> | null = null;
  private statusCb: ((s: ChannelStatus, err?: Error) => void) | null = null;
  private subscribed = false;
  private closed = false;

  constructor(
    readonly topic: string,
    private readonly options: ChannelOptions | undefined,
    private readonly fetchRow: RowFetcher
  ) {}

  on(type: string, filter: Filter, cb: Cb) {
    if (typeof cb !== "function") return this;
    this.listeners.push({ type, filter: filter ?? {}, cb });
    // Đăng ký SAU khi đã subscribe vẫn phải chạy được: mở thêm kết nối còn
    // thiếu thay vì ném lỗi.
    if (this.subscribed) this.ensureLinks();
    return this;
  }

  subscribe(cb?: (s: ChannelStatus, err?: Error) => void) {
    if (cb) this.statusCb = cb;
    if (this.subscribed || this.closed) return this;
    this.subscribed = true;
    if (typeof WebSocket === "undefined" || typeof location === "undefined") {
      this.emit("CHANNEL_ERROR", new Error("Realtime chỉ chạy trong trình duyệt"));
      return this;
    }
    this.ensureLinks();
    if (!this.topicLink && this.tableLinks.size === 0) this.emit("SUBSCRIBED");
    return this;
  }

  async send(msg: { type?: string; event?: string; payload?: unknown }) {
    if (msg?.type !== "broadcast" || typeof msg.event !== "string") return "error";
    this.ensureTopicLink();
    return this.topicLink?.send({ t: "broadcast", event: msg.event, payload: msg.payload }) ? "ok" : "error";
  }

  async track(state: Record<string, unknown>) {
    this.tracked = state;
    this.ensureTopicLink();
    this.topicLink?.send({ t: "track", state });
    return "ok";
  }

  async untrack() {
    this.tracked = null;
    this.topicLink?.send({ t: "untrack" });
    return "ok";
  }

  presenceState<T = unknown>(): Record<string, T[]> {
    return this.presence as Record<string, T[]>;
  }

  async unsubscribe() {
    this.closed = true;
    this.topicLink?.stop();
    for (const l of this.tableLinks.values()) l.stop();
    this.tableLinks.clear();
    this.topicLink = null;
    this.emit("CLOSED");
    return "ok";
  }

  // ---------------------------------------------------------------------------

  private emit(s: ChannelStatus, err?: Error) {
    try {
      this.statusCb?.(s, err);
    } catch (e) {
      console.error("[realtime] callback subscribe ném lỗi:", e);
    }
  }

  private ensureLinks() {
    if (this.closed) return;
    if (this.listeners.some((l) => l.type === "presence" || l.type === "broadcast")) this.ensureTopicLink();
    for (const l of this.listeners) {
      if (l.type !== "postgres_changes") continue;
      const table = l.filter.table;
      if (!table || this.tableLinks.has(table)) continue;
      if (!isWatchedTable(table)) {
        // Đọc watched.ts: bảng không nằm trong danh sách thì không lệnh ghi nào
        // phát tín hiệu cho nó, nên nghe cũng vô ích. Bộ kiểm realtime-watched
        // lẽ ra đã chặn trường hợp này; đây là lưới thứ hai.
        warnOnce(`unwatched:${table}`, `[realtime] bảng "${table}" không được theo dõi - thêm vào WATCHED_TABLES.`);
        continue;
      }
      const link = new Link(
        hubNameForTable(table),
        false,
        () => this.onLinkOpen(),
        (msg) => this.onTableMessage(msg),
        () => this.onGiveUp(table)
      );
      this.tableLinks.set(table, link);
      link.start();
    }
  }

  private ensureTopicLink() {
    if (this.topicLink || this.closed || typeof WebSocket === "undefined") return;
    const self = !!this.options?.config?.broadcast?.self;
    this.topicLink = new Link(
      hubNameForTopic(this.topic),
      self,
      () => {
        // Kết nối lại sau rớt mạng: presence cũ đã mất ở phía hub, phải khai lại.
        if (this.tracked) this.topicLink?.send({ t: "track", state: this.tracked });
        this.onLinkOpen();
      },
      (msg) => this.onTopicMessage(msg),
      () => this.onGiveUp(this.topic)
    );
    this.topicLink.start();
  }

  private onLinkOpen() {
    const links = [this.topicLink, ...this.tableLinks.values()].filter(Boolean) as Link[];
    if (links.every((l) => l.ws?.readyState === 1)) this.emit("SUBSCRIBED");
  }

  private onGiveUp(what: string) {
    warnOnce(`giveup:${what}`, `[realtime] không nối được "${what}" - realtime tắt cho kênh này.`);
    this.emit("CHANNEL_ERROR", new Error(`realtime unavailable: ${what}`));
  }

  private onTopicMessage(msg: Record<string, unknown>) {
    if (msg.t === "presence" && msg.state && typeof msg.state === "object") {
      this.presence = msg.state as Record<string, unknown[]>;
      for (const l of this.listeners) {
        if (l.type === "presence" && (l.filter.event ?? "sync") === "sync") safeCall(l.cb, {});
      }
      return;
    }
    if (msg.t === "broadcast" && typeof msg.event === "string") {
      for (const l of this.listeners) {
        if (l.type === "broadcast" && (l.filter.event === msg.event || l.filter.event === "*")) {
          safeCall(l.cb, { type: "broadcast", event: msg.event, payload: msg.payload });
        }
      }
    }
  }

  private onTableMessage(msg: Record<string, unknown>) {
    if (msg.t !== "change" || !Array.isArray(msg.signals)) return;
    for (const s of msg.signals as ChangeSignal[]) void this.deliver(s);
  }

  private async deliver(s: ChangeSignal) {
    const matching = this.listeners.filter(
      (l) =>
        l.type === "postgres_changes" &&
        l.filter.table === s.table &&
        (!l.filter.event || l.filter.event === "*" || l.filter.event === s.event)
    );
    if (!matching.length) return;

    const base = { schema: "public", table: s.table, eventType: s.event, commit_timestamp: new Date().toISOString() };

    // Không biết hàng nào: chỉ handler không đọc payload (loại `() => refetch()`)
    // được gọi. Handler đọc `payload.new` mà nhận một đối tượng rỗng sẽ chèn một
    // tin nhắn trống vào danh sách - hỏng mà trông như chạy được.
    if (s.id === null) {
      for (const l of matching) if (l.cb.length === 0) safeCall(l.cb);
      return;
    }

    // DELETE: hàng đã mất, không đọc lại được. Chỉ có id - và mọi handler DELETE
    // trong repo chỉ đọc đúng `payload.old.id`. Không lọc theo `filter` được vì
    // không còn hàng để so; SDK client cũ cũng vậy (old record chỉ mang khoá chính
    // trừ khi bảng bật REPLICA IDENTITY FULL). Handler xoá theo id vốn vô hại
    // với id không có trong danh sách của nó.
    if (s.event === "DELETE") {
      for (const l of matching) safeCall(l.cb, { ...base, new: {}, old: { id: s.id } });
      return;
    }

    // INSERT/UPDATE: đọc lại hàng qua /api/db, DƯỚI DANH NGHĨA NGƯỜI ĐANG ĐĂNG
    // NHẬP. Đây là chỗ thay cho RLS của postgres_changes: không được đọc thì
    // nhận null, và không handler nào chạy.
    let row: Record<string, unknown> | null;
    try {
      row = await this.fetchRow(s.table, s.id);
    } catch {
      return;
    }
    if (!row || this.closed) return;

    for (const l of matching) {
      const f = parseFilter(l.filter.filter);
      if (f === null) {
        warnOnce(`filter:${l.filter.filter}`, `[realtime] bộ lọc chưa hỗ trợ: "${l.filter.filter}" - bỏ qua sự kiện.`);
        continue;
      }
      if (f !== "none" && String(row[f.col]) !== f.value) continue;
      safeCall(l.cb, { ...base, new: row, old: { id: s.id } });
    }
  }
}

function safeCall(cb: Cb, ...args: unknown[]) {
  try {
    cb(...args);
  } catch (err) {
    console.error("[realtime] handler ném lỗi:", err);
  }
}
