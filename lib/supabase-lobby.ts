import { createClient } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

/** Đại sảnh dùng CHUNG một topic cố định cho mọi client - đó là điều kiện để
 *  presence hoạt động, và cũng là lý do không được dùng uniqueRealtimeTopic()
 *  ở đây (xem lib/supabase-realtime-topic.ts: helper đó thêm hậu tố cho mỗi
 *  lần subscribe, nên hai client sẽ nằm ở hai phòng khác nhau và không bao giờ
 *  thấy nhau).
 *
 *  Nhưng bỏ helper đi thì lại gặp đúng cái nó sinh ra để né: supabase trả về
 *  channel ĐANG CÓ khi topic đã đăng ký, và gọi subscribe() lần hai trên cùng
 *  channel là lỗi. React StrictMode mount hai lần, hoặc người dùng rời trang
 *  rồi quay lại trước khi removeChannel() kịp xong, đều rơi vào đó.
 *
 *  Cách xử lý: giữ đúng MỘT channel ở tầng module và đếm tham chiếu. Mọi
 *  component gọi joinLobby() đều dùng chung channel ấy; channel chỉ thực sự
 *  đóng khi người cuối cùng rời đi. */
const LOBBY_TOPIC = "lobby:reading-room";

/** Vị trí gửi tối đa ~8 lần/giây. Realtime của Supabase mặc định chặn ở 10
 *  sự kiện/giây cho mỗi client, nên 120ms để lại biên an toàn; phần mượt do
 *  phía nhận nội suy chứ không phải do gửi dày hơn. */
export const MOVE_BROADCAST_MS = 120;

export interface LobbyIdentity {
  userId: string;
  name: string;
  avatarUrl: string | null;
  /** Màu áo nhân vật, suy ra tất định từ userId nên mỗi lần vào vẫn là màu cũ. */
  color: string;
}

export interface LobbyPose {
  x: number;
  z: number;
  /** Góc quay quanh trục đứng, radian. */
  ry: number;
}

export interface LobbyPeer extends LobbyIdentity, LobbyPose {
  /** Mốc thời gian nhận gói vị trí gần nhất, dùng để nội suy phía client. */
  updatedAt: number;
}

export interface LobbyChatMessage {
  /** Khoá cục bộ cho React - không đến từ server, chỉ cần duy nhất trong phiên. */
  id: string;
  userId: string;
  name: string;
  text: string;
  at: number;
}

/** Chat đi qua CHÍNH kênh broadcast đang chở vị trí, không mở kênh thứ hai:
 *  cùng một topic đã join, cùng một ngân sách sự kiện, và tin nhắn tới đúng
 *  tập người đang ở trong phòng mà không cần lọc gì thêm.
 *
 *  Tin nhắn KHÔNG được lưu vào database. Đây là lời nói trong một căn phòng -
 *  ai đang đứng đó thì nghe, ai vào sau thì không. Muốn để lại thứ đọc được
 *  sau đã có FinSocial; nhân đôi nó ở đây chỉ tạo ra hai nơi cùng lưu một
 *  loại nội dung với hai luật kiểm duyệt khác nhau. */
export const CHAT_MAX_LENGTH = 160;
/** Bong bóng trên đầu nhân vật sống bằng này rồi tự tan. */
export const CHAT_BUBBLE_MS = 7000;

type PeersListener = (peers: LobbyPeer[]) => void;
type ChatListener = (message: LobbyChatMessage) => void;

let channel: RealtimeChannel | null = null;
let refCount = 0;
let selfId: string | null = null;
const listeners = new Set<PeersListener>();
const chatListeners = new Set<ChatListener>();
/** Trạng thái hợp nhất: danh tính đến từ presence, vị trí đến từ broadcast. */
const peers = new Map<string, LobbyPeer>();

function emit() {
  const list = [...peers.values()];
  for (const listener of listeners) listener(list);
}

function emitChat(message: LobbyChatMessage) {
  for (const listener of chatListeners) listener(message);
}

/** Màu tất định theo userId - không lưu đâu cả, chỉ cần cùng một người thì
 *  mọi máy vẽ ra cùng một màu. */
export function colorForUser(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i += 1) {
    hash = (hash * 31 + userId.charCodeAt(i)) >>> 0;
  }
  const palette = [
    "#b45309", "#0f766e", "#7c3aed", "#be123c", "#1d4ed8",
    "#a16207", "#15803d", "#c2410c", "#4338ca", "#9d174d",
  ];
  return palette[hash % palette.length];
}

/** Tham gia đại sảnh. Trả về hàm rời đi; gọi nó trong cleanup của useEffect. */
export function joinLobby(
  identity: LobbyIdentity,
  onPeers: PeersListener,
  onChat?: ChatListener
): () => void {
  listeners.add(onPeers);
  if (onChat) chatListeners.add(onChat);
  refCount += 1;
  selfId = identity.userId;

  if (!channel) {
    const supabase = createClient();
    channel = supabase.channel(LOBBY_TOPIC, {
      config: { presence: { key: identity.userId } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel?.presenceState<LobbyIdentity>() ?? {};
        const seen = new Set<string>();
        for (const entries of Object.values(state)) {
          for (const entry of entries) {
            if (!entry?.userId) continue;
            seen.add(entry.userId);
            const existing = peers.get(entry.userId);
            peers.set(entry.userId, {
              ...entry,
              // Người mới vào đứng ở cửa cho tới khi gói vị trí đầu tiên tới;
              // giữ lại vị trí cũ nếu đã biết, để presence sync không kéo
              // người đang đi bộ giật về cửa.
              x: existing?.x ?? 0,
              z: existing?.z ?? 12,
              ry: existing?.ry ?? Math.PI,
              updatedAt: existing?.updatedAt ?? Date.now(),
            });
          }
        }
        // Ai không còn trong presence nghĩa là đã rời phòng hoặc mất kết nối.
        for (const id of [...peers.keys()]) {
          if (!seen.has(id)) peers.delete(id);
        }
        emit();
      })
      .on("broadcast", { event: "move" }, ({ payload }) => {
        const pose = payload as LobbyPose & { userId?: string };
        if (!pose?.userId || pose.userId === selfId) return;
        const existing = peers.get(pose.userId);
        // Bỏ qua gói vị trí của người chưa có trong presence: chưa biết tên
        // và màu thì vẽ ra cũng không đúng ai cả.
        if (!existing) return;
        peers.set(pose.userId, {
          ...existing,
          x: pose.x,
          z: pose.z,
          ry: pose.ry,
          updatedAt: Date.now(),
        });
        emit();
      })
      .on("broadcast", { event: "chat" }, ({ payload }) => {
        const raw = payload as Partial<LobbyChatMessage>;
        if (!raw?.userId || typeof raw.text !== "string") return;
        // Người gửi đã tự hiển thị câu của mình ngay lúc bấm gửi, không chờ
        // vòng về từ server - nếu nhận lại ở đây nữa thì câu bị nhân đôi.
        if (raw.userId === selfId) return;
        const text = raw.text.trim().slice(0, CHAT_MAX_LENGTH);
        if (!text) return;
        emitChat({
          id: `${raw.userId}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
          userId: raw.userId,
          // Tên lấy từ presence chứ không tin phần name trong gói tin: gói tin
          // do client gửi nên sửa được, còn presence là bản ghi đã join.
          name: peers.get(raw.userId)?.name ?? raw.name ?? "Người học",
          text,
          at: Date.now(),
        });
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          void channel?.track(identity);
        }
      });
  } else {
    // Channel đã mở sẵn từ một component khác: chỉ cần cập nhật danh tính,
    // tuyệt đối không gọi subscribe() lần nữa.
    void channel.track(identity);
    onPeers([...peers.values()]);
  }

  return () => {
    listeners.delete(onPeers);
    if (onChat) chatListeners.delete(onChat);
    refCount -= 1;
    if (refCount > 0) return;
    const closing = channel;
    channel = null;
    selfId = null;
    peers.clear();
    if (closing) {
      void closing.untrack();
      void createClient().removeChannel(closing);
    }
  };
}

/** Gửi một câu vào phòng. Trả về đúng bản tin đã phát để phía gọi hiển thị
 *  ngay cho chính mình, thay vì chờ nó vòng qua server rồi quay lại. */
export function sendChat(userId: string, name: string, rawText: string): LobbyChatMessage | null {
  const text = rawText.trim().slice(0, CHAT_MAX_LENGTH);
  if (!text || !channel) return null;
  const message: LobbyChatMessage = {
    id: `${userId}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
    userId,
    name,
    text,
    at: Date.now(),
  };
  void channel.send({
    type: "broadcast",
    event: "chat",
    payload: { userId, name, text },
  });
  return message;
}

/** Gửi vị trí của mình. Không tự tiết chế tần suất - phía gọi giữ nhịp bằng
 *  MOVE_BROADCAST_MS, vì nó mới biết khi nào nhân vật thực sự di chuyển. */
export function sendPose(userId: string, pose: LobbyPose) {
  if (!channel) return;
  void channel.send({
    type: "broadcast",
    event: "move",
    payload: { userId, ...pose },
  });
}
