import { describe, it, expect } from "vitest";
import { LEVEL_EXAMS } from "@/lib/level-exams";
import { localizeLevelExam } from "@/lib/level-exams-i18n";
import { LEVEL_EXAMS_EN } from "@/lib/level-exams-i18n/en";

/** Đề thi thăng cấp có chấm điểm, nên mọi lỗi ở đây đều đắt hơn một nhãn sai
 *  trên màn hình: nó chấm sai một người đã hiểu bài. */
describe("bản dịch đề thi thăng cấp", () => {
  it("không đụng tới correctIndex", () => {
    for (const config of Object.values(LEVEL_EXAMS)) {
      const en = localizeLevelExam(config, "en");
      for (let i = 0; i < config.questions.length; i++) {
        expect(en.questions[i].correctIndex).toBe(config.questions[i].correctIndex);
        expect(en.questions[i].id).toBe(config.questions[i].id);
      }
    }
  });

  it("giữ nguyên số câu và số phương án", () => {
    for (const config of Object.values(LEVEL_EXAMS)) {
      const en = localizeLevelExam(config, "en");
      expect(en.questions).toHaveLength(config.questions.length);
      for (let i = 0; i < config.questions.length; i++) {
        expect(en.questions[i].options).toHaveLength(config.questions[i].options.length);
      }
    }
  });

  it("mảng options trong file dịch dài đúng bằng bản gốc", () => {
    // Lệch độ dài thì merge bỏ CẢ mảng và câu đó rơi về tiếng Việt - an toàn
    // nhưng im lặng. Bắt ngay tại đây thay vì để nó lặng lẽ không dịch.
    for (const [levelStr, patch] of Object.entries(LEVEL_EXAMS_EN)) {
      const source = LEVEL_EXAMS[Number(levelStr)];
      expect(source, `cấp ${levelStr} không có trong LEVEL_EXAMS`).toBeTruthy();
      for (const [qid, qp] of Object.entries(patch.questions ?? {})) {
        const sq = source.questions.find((q) => q.id === qid);
        expect(sq, `${qid} không có trong đề gốc`).toBeTruthy();
        if (qp.options) expect(qp.options, qid).toHaveLength(sq!.options.length);
      }
    }
  });

  it("locale gốc trả về đúng đề gốc", () => {
    for (const config of Object.values(LEVEL_EXAMS)) {
      expect(localizeLevelExam(config, "vi")).toBe(config);
    }
  });

  it("cấp chưa dịch thì rơi về tiếng Việt chứ không rỗng", () => {
    const untranslated = Object.values(LEVEL_EXAMS).find((c) => !LEVEL_EXAMS_EN[c.level]);
    expect(untranslated, "mọi cấp đã dịch - đổi bộ kiểm này thành khẳng định đã xong").toBeTruthy();
    const en = localizeLevelExam(untranslated!, "en");
    expect(en.questions[0].question).toBe(untranslated!.questions[0].question);
  });
});
