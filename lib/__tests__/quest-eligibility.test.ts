import { describe, expect, it } from "vitest";
import {
  UNVERIFIABLE_QUESTS,
  checkQuestEligibility,
  localDayWindowUtc,
} from "@/lib/quest-eligibility";
import { DAILY_FOCUS_TARGET_MINUTES } from "@/lib/study-session";
import { QUEST_XP_REWARDS } from "@/lib/quest-rewards";

/**
 * Cổng "đã làm xong nhiệm vụ chưa" ở app/api/quests/claim.
 *
 * Trước lần sửa này cổng đó chỉ tồn tại ở giao diện, nên một lệnh curl là nhận
 * đủ XP của một nhiệm vụ chưa hề làm. Bộ kiểm này giữ ba tính chất mà một lần
 * sửa sau rất dễ làm hỏng, và hỏng im lặng:
 *
 *   1. MẶC ĐỊNH TỪ CHỐI. Thêm nhiệm vụ mới mà quên khai phép kiểm thì nó không
 *      nhận được thưởng - chứ không phải nhận được thưởng miễn phí.
 *   2. CỬA SỔ MÚI GIỜ. `dayKey` là ngày địa phương của trình duyệt; so với nửa
 *      đêm UTC sẽ từ chối oan người học buổi sáng ở châu Á.
 *   3. MỐC 25 PHÚT đọc từ cùng một hằng số với giao diện. Hai nơi lệch nhau
 *      nghĩa là nút "Nhận" hiện lên rồi máy chủ trả 403.
 */

/** Admin client giả: mọi chuỗi `.from().select().eq().gte().lte()` đều trả về
 *  cùng một kết quả đã dựng sẵn. Đủ cho các phép kiểm ở đây, vì chúng chỉ đọc
 *  `data` hoặc `count`. */
function fakeAdmin(result: { data?: unknown[]; count?: number } | Error) {
  const thenable = {
    select: () => thenable,
    eq: () => thenable,
    gte: () => thenable,
    lte: () => thenable,
    then: (resolve: (v: unknown) => void, reject: (e: unknown) => void) =>
      result instanceof Error ? reject(result) : resolve(result),
  };
  return { from: () => thenable } as never;
}

describe("cua so mot ngay dia phuong", () => {
  it("phu tu UTC+14 toi UTC-12", () => {
    const { start, end } = localDayWindowUtc("2026-08-10");
    expect(start).toBe("2026-08-09T10:00:00.000Z"); // 00:00 ngày 10 ở UTC+14
    expect(end).toBe("2026-08-11T12:00:00.000Z"); // 24:00 ngày 10 ở UTC-12
  });

  it("bai hoc xong luc 6 gio sang o Viet Nam van nam trong ngay do", () => {
    // 06:00 ngày 10/08 ở UTC+7 = 23:00 ngày 09/08 UTC. So với nửa đêm UTC thì
    // nó rơi sang HÔM TRƯỚC - đúng cái bẫy mà cửa sổ này sinh ra để tránh.
    const { start, end } = localDayWindowUtc("2026-08-10");
    const doneAt = "2026-08-09T23:00:00.000Z";
    expect(doneAt >= start && doneAt <= end).toBe(true);
  });

  it("hoat dong cach do vai ngay thi nam ngoai", () => {
    const { start, end } = localDayWindowUtc("2026-08-10");
    expect("2026-08-07T12:00:00.000Z" >= start).toBe(false);
    expect("2026-08-13T12:00:00.000Z" <= end).toBe(false);
  });
});

describe("mac dinh tu choi", () => {
  it("loai nhiem vu la thi khong nhan duoc", async () => {
    const r = await checkQuestEligibility(fakeAdmin({ count: 99 }), "u1", "daily_khong_co", "2026-08-10");
    expect(r.eligible).toBe(false);
    expect(r.reason).toBe("unknown-quest");
  });

  it("moi nhiem vu co thuong deu duoc khai o dau do", async () => {
    // Gác chính danh sách: một nhiệm vụ có XP > 0 mà không có phép kiểm, không
    // phải điểm danh, và không nằm trong danh sách miễn kiểm sẽ luôn bị 403 -
    // tức người học làm thật cũng không nhận được. Bài này bắt nó ngay lúc
    // thêm, thay vì để người dùng báo.
    const paid = Object.entries(QUEST_XP_REWARDS)
      .filter(([, xp]) => xp > 0)
      .map(([id]) => id);
    for (const id of paid) {
      const r = await checkQuestEligibility(fakeAdmin({ count: 1, data: [] }), "u1", id, "2026-08-10");
      expect(r.reason, `${id} chưa được khai trong quest-eligibility.ts`).not.toBe("unknown-quest");
    }
  });
});

describe("nhiem vu khong kiem duoc", () => {
  it("duoc cho qua, nhung phai noi ro la khong kiem duoc", async () => {
    for (const id of UNVERIFIABLE_QUESTS) {
      const r = await checkQuestEligibility(fakeAdmin({ count: 0, data: [] }), "u1", id, "2026-08-10");
      expect(r.eligible).toBe(true);
      expect(r.reason).toBe("unverifiable");
    }
  });

  it("danh sach mien kiem khong duoc phinh ra trong im lang", () => {
    // Hai cái này là hai cái duy nhất không có bảng nào ghi lại việc đã làm.
    // Thêm cái thứ ba nghĩa là mở thêm một cửa, nên nó phải đi qua đây.
    expect([...UNVERIFIABLE_QUESTS].sort()).toEqual(["career_assessment", "daily_news_quiz"]);
  });
});

describe("moc ngoi hoc", () => {
  const dayKey = "2026-08-10";

  it("thieu mot phut thi chua du", async () => {
    const seconds = DAILY_FOCUS_TARGET_MINUTES * 60 - 60;
    const r = await checkQuestEligibility(fakeAdmin({ data: [{ seconds }] }), "u1", "daily_focus", dayKey);
    expect(r.eligible).toBe(false);
    expect(r.reason).toBe("not-met");
  });

  it("du moc thi nhan duoc", async () => {
    const seconds = DAILY_FOCUS_TARGET_MINUTES * 60;
    const r = await checkQuestEligibility(fakeAdmin({ data: [{ seconds }] }), "u1", "daily_focus", dayKey);
    expect(r.eligible).toBe(true);
  });

  it("cong don nhieu phien ngan, khong doi tron mot phien", async () => {
    // 10 + 8 + 7 phút, không phiên nào chạm 25.
    const r = await checkQuestEligibility(
      fakeAdmin({ data: [{ seconds: 600 }, { seconds: 480 }, { seconds: 420 }] }),
      "u1",
      "daily_focus",
      dayKey
    );
    expect(r.eligible).toBe(true);
  });

  it("chua ngoi giay nao thi bi tu choi", async () => {
    const r = await checkQuestEligibility(fakeAdmin({ data: [] }), "u1", "daily_focus", dayKey);
    expect(r.eligible).toBe(false);
  });
});

describe("truy van hong", () => {
  it("cho qua chu khong khoa het nhiem vu lai", async () => {
    // Bảng thiếu vì migration chưa chạy không nên biến mọi nhiệm vụ thành
    // không nhận được. Mức xấu nhất ở đây vẫn bằng đúng hiện trạng trước khi
    // có cổng này.
    const r = await checkQuestEligibility(fakeAdmin(new Error("relation does not exist")), "u1", "daily_1", "2026-08-10");
    expect(r.eligible).toBe(true);
    expect(r.reason).toBe("unverifiable");
  });
});
