/**
 * Lõi của một hub realtime: presence, broadcast, và chuyển tiếp tín hiệu thay đổi.
 *
 * Tách khỏi lib/realtime/hub.ts (vỏ Durable Object) để mọi quyết định bảo mật ở
 * đây chạy được trong vitest mà không cần runtime Workers. Vỏ chỉ đổi WebSocket
 * thật sang giao diện HubSocket bên dưới.
 *
 * BA CHỖ CHẶT HƠN HỆ CŨ, cố ý:
 *
 *  - DANH TÍNH DO MÁY CHỦ CẤP. `userId` của một kết nối đến từ phiên đăng nhập
 *    đã xác thực ở worker, không bao giờ từ thứ client gửi. Presence bị ép khoá
 *    và `userId` về đúng người đó; broadcast có trường `userId` cũng bị ép. Trên
 *    Broadcast của hệ cũ không xác thực người gửi - ai cũng phát được một bước đi
 *    dưới tên người khác.
 *  - TÍN HIỆU THAY ĐỔI KHÔNG MANG NỘI DUNG. Xem ChangeSignal trong watched.ts.
 *  - CLIENT KHÔNG PHÁT ĐƯỢC TÍN HIỆU THAY ĐỔI. Chỉ máy chủ, qua onPublish, mà
 *    worker không bao giờ định tuyến request của trình duyệt tới đó.
 */

export type Attachment = {
  userId: string;
  /** Presence của kết nối này, null khi chưa track. */
  state: Record<string, unknown> | null;
  /** Có nhận lại broadcast của chính mình không - `config.broadcast.self`. */
  self: boolean;
};

export interface HubSocket {
  send(message: string): void;
  getAttachment(): Attachment | null;
  setAttachment(attachment: Attachment): void;
}

export interface HubHost {
  sockets(): HubSocket[];
}

/** Một tin quá cỡ này là lỗi hoặc lạm dụng; vị trí và một câu chat nhỏ hơn nhiều. */
export const MAX_MESSAGE_BYTES = 16 * 1024;
const MAX_EVENT_NAME = 64;

type Presence = Record<string, Array<Record<string, unknown>>>;

export class HubCore {
  constructor(private readonly host: HubHost) {}

  /** Kết nối mới đã được worker xác thực là `userId`. */
  connect(ws: HubSocket, userId: string, self: boolean) {
    ws.setAttachment({ userId, state: null, self });
    // Người mới vào phải thấy ngay ai đang ở đây, không chờ ai đó cử động.
    this.sendTo(ws, { t: "presence", state: this.presence() });
  }

  message(ws: HubSocket, raw: unknown) {
    if (typeof raw !== "string" || raw.length > MAX_MESSAGE_BYTES) return;
    let msg: Record<string, unknown>;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    if (!isPlainObject(msg)) return;
    const att = ws.getAttachment();
    if (!att) return;

    switch (msg.t) {
      case "track": {
        if (!isPlainObject(msg.state)) return;
        // Ép danh tính: client track `{ userId: "người khác" }` thì vẫn hiện ra
        // là chính nó. Khoá presence cũng là userId đã xác thực, bất kể client
        // khai `config.presence.key` là gì.
        ws.setAttachment({ ...att, state: { ...msg.state, userId: att.userId } });
        this.syncPresence();
        return;
      }
      case "untrack": {
        ws.setAttachment({ ...att, state: null });
        this.syncPresence();
        return;
      }
      case "broadcast": {
        const event = msg.event;
        if (typeof event !== "string" || !event || event.length > MAX_EVENT_NAME) return;
        let payload = msg.payload;
        if (isPlainObject(payload) && "userId" in payload) {
          payload = { ...payload, userId: att.userId };
        }
        const out = JSON.stringify({ t: "broadcast", event, payload, senderId: att.userId });
        for (const other of this.host.sockets()) {
          if (other === ws && !att.self) continue;
          safeSend(other, out);
        }
        return;
      }
      case "ping": {
        this.sendTo(ws, { t: "pong" });
        return;
      }
      // Mọi loại khác - kể cả "change" - bị bỏ qua. Tín hiệu thay đổi chỉ đến
      // từ máy chủ qua publish(); một client tự phát "change" mà được chuyển
      // tiếp thì có thể khiến mọi người khác đọc lại hàng tuỳ ý nó chọn.
      default:
        return;
    }
  }

  close(ws: HubSocket) {
    this.syncPresence(ws);
  }

  /** Tín hiệu thay đổi từ máy chủ. Trả về số kết nối đã nhận. */
  publish(body: unknown): number {
    if (!Array.isArray(body)) return 0;
    const signals = body.filter(
      (s) =>
        isPlainObject(s) &&
        typeof s.table === "string" &&
        (s.event === "INSERT" || s.event === "UPDATE" || s.event === "DELETE") &&
        (s.id === null || (typeof s.id === "number" && Number.isSafeInteger(s.id)))
    );
    if (!signals.length) return 0;
    const out = JSON.stringify({ t: "change", signals });
    let n = 0;
    for (const ws of this.host.sockets()) {
      if (safeSend(ws, out)) n++;
    }
    return n;
  }

  presence(exclude?: HubSocket): Presence {
    const state: Presence = {};
    for (const ws of this.host.sockets()) {
      if (ws === exclude) continue;
      const att = ws.getAttachment();
      if (!att?.state) continue;
      // Một người mở hai tab là hai phần tử trong cùng một khoá - đúng hình
      // dạng presenceState() của SDK client cũ, nên các chỗ gọi hiện có đọc
      // `state[userId][0]` vẫn đúng.
      (state[att.userId] ??= []).push(att.state);
    }
    return state;
  }

  private syncPresence(exclude?: HubSocket) {
    const out = JSON.stringify({ t: "presence", state: this.presence(exclude) });
    for (const ws of this.host.sockets()) {
      if (ws !== exclude) safeSend(ws, out);
    }
  }

  private sendTo(ws: HubSocket, msg: unknown) {
    safeSend(ws, JSON.stringify(msg));
  }
}

function safeSend(ws: HubSocket, message: string): boolean {
  try {
    ws.send(message);
    return true;
  } catch {
    // Kết nối đang đóng. Không để một người rớt mạng làm hỏng tin của những
    // người còn lại trong cùng vòng lặp.
    return false;
  }
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
