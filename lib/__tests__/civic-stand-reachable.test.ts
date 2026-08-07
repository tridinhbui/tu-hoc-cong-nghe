import { describe, expect, it } from "vitest";
import {
  civicRoomsOf,
  districtRoomsOf,
  getRoom as getRoomOf,
  isAtCivicStand,
  moveWithin,
  type DistrictRoom,
} from "@/components/career-district/district-space";
import { vi as viDict } from "@/lib/i18n/dictionaries/vi";

const CIVIC_ROOMS = civicRoomsOf(viDict);
const DISTRICT_ROOMS = districtRoomsOf(viDict);
const getRoom = (id: Parameters<typeof getRoomOf>[1]) => getRoomOf(viDict, id);

/** Từ cửa vào có ĐI TỚI được bục giữa phòng không.
 *
 *  Bục là thứ duy nhất mở nội dung của một phòng dân sự ra. Đi tới được nó
 *  không phải chuyện hiển nhiên: giữa cửa và bục có thể có đồ đạc, và mỗi căn
 *  phòng dạy đêm nay đều thêm đồ mới vào đúng khoảng giữa đó - vòng cung của
 *  phòng vòng quay tiền, dãy cột của phòng rủi ro, bàn tròn của bàn tròn giảng
 *  lại.
 *
 *  Bài này thay cho một buổi ngồi chụp màn hình. Tôi đã đi thử phòng vòng quay
 *  tiền bằng tay và tưởng bục không kích hoạt - thật ra nhân vật mới đi được
 *  nửa đường, vì khung xem chỉ nhích một khung hình mỗi lần chụp. Mô phỏng
 *  chính bộ giải va chạm thật thì trả lời dứt điểm, cho cả mười hai phòng, và
 *  không bao giờ mỏi tay.
 *
 *  Mô phỏng đi thẳng chứ không tìm đường: nếu một căn phòng cần vòng vèo mới
 *  tới được bục thì đó tự nó là lỗi thiết kế - người học sẽ húc vào đồ đạc rồi
 *  bỏ cuộc, đúng như bộ giải va chạm này làm. */

const STEP = 0.12;
const MAX_STEPS = 600;

/** Đi thẳng từ (x,z) về đích, mỗi bước qua đúng bộ giải va chạm của trò chơi.
 *  Trả về chỗ dừng lại. */
function walkTo(room: DistrictRoom, from: { x: number; z: number }, to: { x: number; z: number }) {
  let { x, z } = from;
  for (let i = 0; i < MAX_STEPS; i++) {
    const dx = to.x - x;
    const dz = to.z - z;
    const dist = Math.hypot(dx, dz);
    if (dist < STEP) break;
    const next = moveWithin(room, x + (dx / dist) * STEP, z + (dz / dist) * STEP);
    // Kẹt: một bước mà không nhúc nhích nghĩa là có thứ chắn ngang và đi thẳng
    // không qua được.
    if (Math.hypot(next.x - x, next.z - z) < STEP * 0.2) return { x, z, stuck: true };
    x = next.x;
    z = next.z;
  }
  return { x, z, stuck: false };
}

/** Chỗ đứng khi vừa qua cửa vào, lấy từ chính cửa trên phố - đúng dữ liệu mà
 *  trò chơi dùng, không phải một con số chép lại. */
function arrival(id: string) {
  return DISTRICT_ROOMS.street.doorways.find((d) => d.to === id)?.arriveAt;
}

describe("bục giữa phòng dân sự", () => {
  it("phòng nào cũng có chỗ đứng khi vào, lấy từ cửa trên phố", () => {
    for (const c of CIVIC_ROOMS) {
      expect(arrival(c.id as string), `${c.id} không có cửa trên phố`).toBeTruthy();
    }
  });

  it("đi thẳng từ cửa vào là tới được bục, ở cả mười hai phòng", () => {
    for (const c of CIVIC_ROOMS) {
      const room = getRoom(c.id)!;
      const from = arrival(c.id as string)!;
      // Bục ở (0, −1) trong mọi phòng dân sự - cùng chỗ với vòng sáng dưới sàn.
      const end = walkTo(room, from, { x: 0, z: -1 });
      expect(
        isAtCivicStand(room, end.x, end.z),
        `${c.id}: đi thẳng từ cửa dừng ở (${end.x.toFixed(2)}, ${end.z.toFixed(2)})` +
          `${end.stuck ? " vì bị chắn" : ""} - chưa tới bục`
      ).toBe(true);
    }
  });

  it("và quay lại được cửa ra sau khi đứng ở bục", () => {
    // Vào được mà ra không được là một cái bẫy. Đồ đạc thêm vào giữa phòng có
    // thể chắn đúng đường về mà không chắn đường vào, vì hai đường không
    // giống nhau khi bộ giải va chạm chỉ đẩy ra một hướng.
    for (const c of CIVIC_ROOMS) {
      const room = getRoom(c.id)!;
      const exit = room.doorways.find((d) => d.to === "street")!;
      const stand = walkTo(room, arrival(c.id as string)!, { x: 0, z: -1 });
      const back = walkTo(room, stand, { x: exit.x, z: exit.z });
      expect(
        Math.hypot(back.x - exit.x, back.z - exit.z) <= exit.reach,
        `${c.id}: từ bục không về tới được cửa ra`
      ).toBe(true);
    }
  });
});
