import { describe, expect, it } from "vitest";
import { TRACKS } from "../tracks";
import { PROFESSIONAL_BRANCHES, TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "../track-stages";
import { lessons as LESSONS } from "../lessons";

// Số hiệu chặng là thứ trôi được mà không ai biết.
//
// Track cá nhân từng có "Chặng 0 - Biết mình", rồi được đánh số lại thành
// Chặng 1 và chèn thêm chặng Thuế, đẩy mọi chặng sau lên hai bậc. Nhãn trong
// track-stages.ts đổi theo; tiêu đề bài học, văn bài, trang giới thiệu và
// bảng phân loại của analytics thì không. Kết quả là 30 bài mang tiêu đề
// "Chặng 5" trong khi nằm ở Chặng 7, và một trang giới thiệu hứa một lộ trình
// khác với lộ trình thật. Không có gì lỗi, không có test nào đỏ.
//
// Ba bất biến dưới đây là thứ khiến lần dời số tiếp theo không âm thầm được.

const stageOf = (id: number) =>
  TRACK_PERSONAL.stages.find((s) => isLessonInRange(id, s)) ??
  TRACK_PROFESSIONAL.stages.find((s) => isLessonInRange(id, s));

const isPersonal = (id: number) => TRACK_PERSONAL.stages.some((s) => isLessonInRange(id, s));

describe("số chặng trong tiêu đề bài học", () => {
  const numbered = LESSONS.filter((l) => /^Chặng \d+, Bài/.test(l.title));

  it("có bài dùng tiền tố đánh số - nếu không, test này vô nghĩa", () => {
    expect(numbered.length).toBeGreaterThan(20);
  });

  it("mọi tiêu đề đánh số đều khớp chặng thật của bài đó", () => {
    const wrong = numbered
      .map((l) => ({ l, stage: stageOf(l.id) }))
      .filter(({ l, stage }) => stage?.label !== /^Chặng \d+/.exec(l.title)![0]);
    expect(wrong.map((w) => `${w.l.id}: "${w.l.title.slice(0, 40)}" thật ra ở ${w.stage?.label}`)).toEqual([]);
  });

  it("chỉ track cá nhân được đánh số trong tiêu đề", () => {
    // Dashboard chuyên ngành đánh lại số theo nhánh nghề, nên một con số
    // tuyệt đối trong tiêu đề chỉ đúng cho một nhánh. Track cá nhân không có
    // nhánh nên số ở đó là số người học thực sự nhìn thấy.
    const numberedProfessional = numbered.filter((l) => !isPersonal(l.id));
    expect(numberedProfessional.map((l) => `${l.id}: ${l.title.slice(0, 46)}`)).toEqual([]);
  });
});

describe("số chặng nhắc trong nội dung bài", () => {
  it("bài track cá nhân chỉ nhắc tới chặng có thật", () => {
    const maxStage = TRACK_PERSONAL.stages.length;
    const bad: string[] = [];
    for (const lesson of LESSONS) {
      if (!isPersonal(lesson.id)) continue;
      for (const m of JSON.stringify(lesson).matchAll(/[Cc]hặng (\d+)/g)) {
        const n = Number(m[1]);
        if (n < 1 || n > maxStage) bad.push(`${lesson.id}: Chặng ${n}`);
      }
    }
    expect([...new Set(bad)]).toEqual([]);
  });

  it("không bài nào nhắc tới id nội bộ bốn chữ số", () => {
    // "Bài 1217" không có nghĩa gì với người học - dashboard đánh số bài theo
    // thứ tự học (001, 002...), không bao giờ hiện id trong dữ liệu.
    const bad = LESSONS.filter((l) => /[Bb]ài \d{4}/.test(JSON.stringify(l))).map((l) => l.id);
    expect(bad).toEqual([]);
  });
});

describe("trang giới thiệu track", () => {
  it("danh sách chặng cá nhân khớp đúng nhãn và thứ tự thật", () => {
    const promised = TRACKS.personal.stages.map((s) => /^Chặng \d+/.exec(s)?.[0]);
    expect(promised).toEqual(TRACK_PERSONAL.stages.map((s) => s.label));
  });

  it("danh sách chặng chuyên ngành không đánh số", () => {
    const numbered = TRACKS.professional.stages.filter((s) => /Chặng \d/.test(s));
    expect(numbered).toEqual([]);
  });
});

describe("nhãn chặng dùng làm khoá", () => {
  it("nhãn liên tục từ 1, không nhảy cóc và không còn Chặng 0", () => {
    for (const track of [TRACK_PERSONAL, TRACK_PROFESSIONAL]) {
      expect(track.stages.map((s) => s.label)).toEqual(
        track.stages.map((_, i) => `Chặng ${i + 1}`),
      );
    }
  });

  it("mọi nhãn trong nhánh nghề đều trỏ tới một chặng có thật", () => {
    const labels = new Set(TRACK_PROFESSIONAL.stages.map((s) => s.label));
    for (const branch of PROFESSIONAL_BRANCHES) {
      for (const label of branch.stageLabels) {
        expect(labels, `nhánh ${branch.id} trỏ tới ${label} không tồn tại`).toContain(label);
      }
    }
  });
});
