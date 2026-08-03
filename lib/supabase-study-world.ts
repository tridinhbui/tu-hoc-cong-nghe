import { createClient } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { CHAT_MAX_LENGTH, type LobbyChatMessage, type LobbyPose } from "@/lib/supabase-lobby";
import type { CharacterEquipments } from "@/lib/rpg-items";

/** Hiện diện + vị trí cho phòng học nhóm đi lại được.
 *
 *  Cùng cơ chế với lib/supabase-lobby.ts - presence chở danh tính, broadcast
 *  chở vị trí và lời nói - nhưng KHÔNG dùng lại được nguyên hàm ở đó, và khác
 *  biệt không phải chuyện gu code: thư viện có đúng MỘT phòng, nên nó giữ một
 *  channel duy nhất ở tầng module. Nhóm học có nhiều phòng cùng tồn tại và một
 *  người có thể đổi phòng trong cùng một phiên, nên ở đây mọi thứ phải khoá
 *  theo roomId. Ép cái một-phòng thành nhiều-phòng thì cũng chính là file này,
 *  chỉ khác là thư viện phải gánh thêm rủi ro của một lần viết lại.
 *
 *  Phần thực sự dùng chung được thì dùng chung thật: kiểu tin nhắn, giới hạn
 *  độ dài, màu theo userId đều import từ supabase-lobby chứ không chép lại. */

/** Ngồi vào ghế nào quanh cái bàn duy nhất của phòng. Đại sảnh có nhiều bàn nên
 *  chỗ ngồi của nó là {tableId, startedAt}; ở đây chỉ có một bàn, nên chỗ ngồi
 *  rút gọn còn chỉ số ghế. */
export interface StudyWorldIdentity {
  userId: string;
  name: string;
  avatarUrl: string | null;
  color: string;
  streak: number;
  level: number;
  doneToday: boolean;
  /** Chỉ số ghế quanh bàn; null là đang đứng. */
  seat: number | null;
  /** Epoch ms lúc ngồi xuống, để đồng hồ phiên của cả bàn lấy mốc sớm nhất. */
  seatStartedAt: number | null;
  /** Đồ đang trang bị, đi kèm presence (xem LobbyIdentity). */
  gear?: CharacterEquipments | null;
}

export interface StudyWorldPeer extends StudyWorldIdentity, LobbyPose {
  updatedAt: number;
}

type PeersListener = (peers: StudyWorldPeer[]) => void;
type ChatListener = (message: LobbyChatMessage) => void;

interface World {
  channel: RealtimeChannel;
  refCount: number;
  selfId: string | null;
  lastIdentity: StudyWorldIdentity | null;
  peers: Map<string, StudyWorldPeer>;
  listeners: Set<PeersListener>;
  chatListeners: Set<ChatListener>;
}

/** Khoá phòng. Phòng học nhóm dùng số (`room_id` trong database), còn các
 *  phòng của Phố nghề dùng chuỗi ("street", "tang-cfa", "nghe-quant"…) vì
 *  chúng không có bản ghi nào trong database cả - chúng là hình học. Cả hai đi
 *  chung một kênh, chỉ cần khoá là chuỗi. */
export type WorldKey = string | number;

/** Một world cho mỗi phòng đang mở. Đếm tham chiếu vì StrictMode mount hai lần
 *  và gọi subscribe() lần hai trên cùng channel là lỗi - đúng cái bẫy mà
 *  supabase-lobby đã ghi lại trong phần đầu file của nó. */
const worlds = new Map<string, World>();

/** Topic phải CỐ ĐỊNH theo phòng, không được qua uniqueRealtimeTopic(): hậu tố
 *  ngẫu nhiên của helper đó sẽ đẩy hai người cùng phòng sang hai channel khác
 *  nhau và họ không bao giờ thấy nhau. */
function topicFor(roomId: WorldKey) {
  return `study-room-world:${roomId}`;
}

function emit(world: World) {
  const list = [...world.peers.values()];
  for (const listener of world.listeners) listener(list);
}

/** Vào phòng. Trả về hàm rời đi; gọi trong cleanup của useEffect. */
export function joinStudyWorld(
  roomId: WorldKey,
  identity: StudyWorldIdentity,
  onPeers: PeersListener,
  onChat?: ChatListener
): () => void {
  const key = String(roomId);
  let world = worlds.get(key);

  if (!world) {
    const supabase = createClient();
    const channel = supabase.channel(topicFor(roomId), {
      config: { presence: { key: identity.userId } },
    });
    world = {
      channel,
      refCount: 0,
      selfId: identity.userId,
      lastIdentity: null,
      peers: new Map(),
      listeners: new Set(),
      chatListeners: new Set(),
    };
    worlds.set(key, world);
    const w = world;

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<StudyWorldIdentity>();
        const seen = new Set<string>();
        for (const entries of Object.values(state)) {
          for (const entry of entries) {
            if (!entry?.userId) continue;
            seen.add(entry.userId);
            const existing = w.peers.get(entry.userId);
            w.peers.set(entry.userId, {
              ...entry,
              // Giữ vị trí đã biết: presence sync xảy ra mỗi lần có người ra
              // vào, và nếu nó ghi đè toạ độ thì cả phòng bị kéo về cửa mỗi
              // lần một người nữa bước vào.
              x: existing?.x ?? 0,
              z: existing?.z ?? SPAWN_Z,
              ry: existing?.ry ?? SPAWN_RY,
              updatedAt: existing?.updatedAt ?? Date.now(),
            });
          }
        }
        for (const id of [...w.peers.keys()]) {
          if (!seen.has(id)) w.peers.delete(id);
        }
        emit(w);
      })
      .on("broadcast", { event: "move" }, ({ payload }) => {
        const pose = payload as LobbyPose & { userId?: string };
        if (!pose?.userId || pose.userId === w.selfId) return;
        const existing = w.peers.get(pose.userId);
        // Chưa có trong presence thì chưa biết tên và màu - vẽ ra cũng không
        // đúng ai cả.
        if (!existing) return;
        w.peers.set(pose.userId, {
          ...existing,
          x: pose.x,
          z: pose.z,
          ry: pose.ry,
          updatedAt: Date.now(),
        });
        emit(w);
      })
      .on("broadcast", { event: "say" }, ({ payload }) => {
        const raw = payload as Partial<LobbyChatMessage>;
        if (!raw?.userId || typeof raw.text !== "string") return;
        // Người gửi đã tự hiện câu của mình rồi; nhận lại là nhân đôi.
        if (raw.userId === w.selfId) return;
        const text = raw.text.trim().slice(0, CHAT_MAX_LENGTH);
        if (!text) return;
        const message: LobbyChatMessage = {
          id: `${raw.userId}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
          userId: raw.userId,
          // Tên lấy từ presence, không tin trường name trong gói broadcast:
          // gói do client gửi nên sửa được, presence là bản ghi đã join.
          name: w.peers.get(raw.userId)?.name ?? raw.name ?? "Người học",
          text,
          at: Date.now(),
        };
        for (const listener of w.chatListeners) listener(message);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") void channel.track(identity);
      });
  } else {
    world.selfId = identity.userId;
    void world.channel.track(identity);
    onPeers([...world.peers.values()]);
  }

  world.listeners.add(onPeers);
  if (onChat) world.chatListeners.add(onChat);
  world.refCount += 1;
  world.lastIdentity = identity;

  const joined = world;
  return () => {
    joined.listeners.delete(onPeers);
    if (onChat) joined.chatListeners.delete(onChat);
    joined.refCount -= 1;
    if (joined.refCount > 0) return;
    worlds.delete(key);
    joined.peers.clear();
    void joined.channel.untrack();
    void createClient().removeChannel(joined.channel);
  };
}

/** Ngồi xuống ghế, hoặc đứng lên khi truyền null.
 *
 *  Đi qua PRESENCE chứ không phải broadcast, vì chỗ ngồi là trạng thái bền chứ
 *  không phải sự kiện: người vào phòng sau phải thấy ngay ai đang ngồi đâu và
 *  phiên bắt đầu từ lúc nào. Track lại CẢ bản ghi danh tính - Supabase không
 *  có cập nhật từng trường, gửi thiếu là những trường kia biến mất khỏi bản
 *  ghi của mình trên máy mọi người. */
export function setStudySeat(roomId: WorldKey, seat: number | null, startedAt: number | null) {
  const world = worlds.get(String(roomId));
  if (!world?.lastIdentity) return;
  world.lastIdentity = { ...world.lastIdentity, seat, seatStartedAt: seat === null ? null : startedAt };
  void world.channel.track(world.lastIdentity);
}

/** Gửi vị trí. Không tự tiết chế tần suất - phía gọi giữ nhịp, vì chỉ nó biết
 *  khi nào nhân vật thực sự nhúc nhích. */
export function sendStudyPose(roomId: WorldKey, userId: string, pose: LobbyPose) {
  const world = worlds.get(String(roomId));
  if (!world) return;
  void world.channel.send({ type: "broadcast", event: "move", payload: { userId, ...pose } });
}

/** Nói một câu trong phòng. Trả về đúng bản tin đã phát để phía gọi hiện ngay
 *  cho chính mình thay vì chờ vòng qua server.
 *
 *  Lời nói ở đây KHÔNG lưu vào database - đó là điểm khác với ô chat của phòng
 *  nhóm ngay bên cạnh, vốn ghi vào study_room_messages. Ai đang đứng trong
 *  phòng thì nghe; muốn để lại thứ đọc được sau thì gõ vào ô chat. */
export function sayInStudyWorld(
  roomId: WorldKey,
  userId: string,
  name: string,
  rawText: string
): LobbyChatMessage | null {
  const world = worlds.get(String(roomId));
  const text = rawText.trim().slice(0, CHAT_MAX_LENGTH);
  if (!text || !world) return null;
  void world.channel.send({ type: "broadcast", event: "say", payload: { userId, name, text } });
  return {
    id: `${userId}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
    userId,
    name,
    text,
    at: Date.now(),
  };
}

/** Chỗ đứng lúc mới vào: giữa cửa và bàn, quay mặt vào phòng.
 *
 *  Không đặt sát cửa dù đó là chỗ "đúng" về mặt kể chuyện: camera vai thứ ba
 *  đứng cách nhân vật ~5m về phía sau, nên đứng sát tường nam thì camera nằm
 *  NGOÀI bức tường đó - và tường chỉ vẽ một mặt, nên từ ngoài nhìn vào là một
 *  mảng đen. 3.2 là chỗ xa nhất về phía cửa mà camera vẫn còn trong phòng.
 *
 *  Khai ở đây vì cả presence (đặt tạm người chưa gửi vị trí) lẫn cảnh 3D đều
 *  cần đúng hai con số này. */
export const SPAWN_Z = 3.2;
/** ry=0 là nhìn về -z, tức nhìn vào bàn và bảng trắng. */
export const SPAWN_RY = 0;
