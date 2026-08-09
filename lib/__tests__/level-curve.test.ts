import { describe, expect, it } from "vitest";
import { LEVELS, PREVIOUS_LEVEL_MIN_XP, XP_PER_LESSON, getLevelByXp } from "@/lib/levels";

/** Thang cấp, và một ràng buộc chỉ đi được một chiều.
 *
 *  `current_level` không được lưu như một thành tích: recalculateUserStats tính
 *  lại nó từ tổng XP mỗi lần chạy. Nên sửa `LEVELS` không phải sửa một bảng
 *  hiển thị - nó viết lại cấp bậc của MỌI tài khoản ở lần tính tiếp theo.
 *
 *  Hạ một ngưỡng thì thăng cấp người đang học: an toàn, và là điều lần cân
 *  09/08/2026 làm. NÂNG một ngưỡng thì tụt cấp mọi người đang đứng vừa đủ trên
 *  nó, im lặng, không có thông báo nào - lấy lại một thứ đã trao đi. Không có
 *  gì trong mã ngăn được điều đó ngoài bài kiểm này. */

describe("thang cấp không bao giờ tụt của ai", () => {
  it("mọi ngưỡng đều thấp hơn hoặc bằng thang cũ", () => {
    expect(LEVELS.length).toBe(PREVIOUS_LEVEL_MIN_XP.length);
    // map TRƯỚC rồi filter: đổi thứ tự thì `i` trong map là chỉ số của mảng đã
    // lọc, và thông báo lỗi sẽ đọc ngưỡng cũ của một bậc khác. Bản đầu viết
    // ngược, và nó báo "L3: 0 → 400" trong khi ngưỡng cũ của L3 là 300.
    const raised = LEVELS.map((l, i) =>
      l.minXp > PREVIOUS_LEVEL_MIN_XP[i] ? `L${l.level}: ${PREVIOUS_LEVEL_MIN_XP[i]} → ${l.minXp}` : null
    ).filter((entry): entry is string => entry !== null);
    expect(
      raised,
      "Nâng ngưỡng sẽ TỤT CẤP người đang đứng vừa đủ trên nó ở lần recalculateUserStats " +
        "tiếp theo, không báo trước. Muốn siết nền kinh tế XP thì siết ở chỗ SINH ra XP, " +
        "đừng dời cột mốc sau khi người ta đã đi qua."
    ).toEqual([]);
  });

  it("không có người dùng nào tụt cấp, thử trên toàn dải XP", () => {
    // Kiểm bằng cách quét thay vì suy luận: mốc nào cũng có thể lệch một đơn vị.
    const oldLevelAt = (xp: number) => {
      let lv = 1;
      PREVIOUS_LEVEL_MIN_XP.forEach((min, i) => {
        if (xp >= min) lv = i + 1;
      });
      return lv;
    };
    for (let xp = 0; xp <= 45000; xp += 25) {
      // cfaCompleted đủ lớn để cổng CFA ở L9 không che mất phép so sánh.
      expect(getLevelByXp(xp, 99).level, `${xp} XP`).toBeGreaterThanOrEqual(oldLevelAt(xp));
    }
  });
});

describe("thang cấp khớp với thứ nội dung thực sự sinh ra", () => {
  /** Trần XP của toàn bộ nội dung: 720 bài × 10, cộng đủ bốn chặng Active
   *  Recall cho mọi bài (30/bài, xem recallXp trong recalculateUserStats),
   *  cộng trần cứng 1.300 của bài thi chặng. KHÔNG tính nhiệm vụ lặp và quiz
   *  hằng ngày - đó là thứ cày theo thời gian, không phải thứ học được. */
  const LESSON_COUNT = 720;
  const CONTENT_XP_CEILING = LESSON_COUNT * XP_PER_LESSON + LESSON_COUNT * 30 + 1300;

  it("học hết nội dung là chạm bậc cao nhất", () => {
    // Thang cũ đứng ở 40.000 với trần nội dung 30.100: bảy bậc trên cùng chỉ
    // tới được bằng nhiệm vụ lặp, tức là bằng thời gian chứ không bằng việc học.
    expect(getLevelByXp(CONTENT_XP_CEILING, 99).level).toBe(LEVELS.length);
  });

  it("bậc cao nhất còn biên cho người bỏ qua vài chặng ôn", () => {
    const top = LEVELS[LEVELS.length - 1].minXp;
    expect(top).toBeLessThan(CONTENT_XP_CEILING);
    // Chạm đỉnh ở khoảng 90% nội dung - đủ chặt để còn là một thành tích, đủ
    // lỏng để không đòi hỏi sự hoàn hảo tuyệt đối.
    expect(top / CONTENT_XP_CEILING).toBeGreaterThan(0.85);
    expect(top / CONTENT_XP_CEILING).toBeLessThan(0.95);
  });

  it("lên cấp lần đầu nằm trong phiên học đầu tiên", () => {
    const toLevel2 = LEVELS[1].minXp;
    // Ba bài, khoảng 18 phút. Trên 5 bài thì phần thưởng đầu tiên rơi ra ngoài
    // phiên đầu, và đó chính là lỗi đang sửa.
    expect(toLevel2 / XP_PER_LESSON).toBeLessThanOrEqual(5);
    // Nhưng vẫn phải học thật: một bài là quá rẻ để có nghĩa.
    expect(toLevel2 / XP_PER_LESSON).toBeGreaterThan(1);
  });

  it("các bậc tăng dần đều, không có vách", () => {
    for (let i = 2; i < LEVELS.length; i++) {
      const prev = LEVELS[i - 1].minXp - LEVELS[i - 2].minXp;
      const cur = LEVELS[i].minXp - LEVELS[i - 1].minXp;
      expect(cur, `L${i + 1} nhảy quá gấp so với bậc trước`).toBeLessThanOrEqual(prev * 2.5);
      expect(cur, `L${i + 1} rẻ hơn bậc trước - thang phải tăng dần`).toBeGreaterThanOrEqual(prev);
    }
  });
});
