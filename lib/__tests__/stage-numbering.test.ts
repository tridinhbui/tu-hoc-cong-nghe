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

describe("hệ đếm 'ngày'", () => {
  it("không track nào hứa một số ngày cố định", () => {
    // "Lộ trình 108 ngày" được viết khi track có đúng 108 bài và nhịp là mỗi
    // ngày một bài. Track cá nhân hôm nay có 136 bài, chuyên ngành 460, và
    // không màn hình nào trong ứng dụng đếm ngày cả - nên con số đó chỉ còn
    // là một lời hứa không ai đối chiếu được.
    for (const track of [TRACKS.personal, TRACKS.professional]) {
      expect(track.subtitle).not.toMatch(/\d+\s*ngày/);
    }
    for (const track of [TRACK_PERSONAL, TRACK_PROFESSIONAL]) {
      expect(track.subtitle).not.toMatch(/\d+\s*ngày/);
      expect(track.description).not.toMatch(/\d+\s*ngày/);
    }
  });
});

describe("số bài trong tiêu đề không vượt quá số bài thật", () => {
  // Mỗi chuỗi bài có một tiền tố riêng ("Excel, Bài 1", "FRM Foundations,
  // Bài 3"). Số đứng sau "Bài" phải là vị trí trong chuỗi đó, nên tập các số
  // của một chuỗi phải đúng bằng 1..N.
  //
  // Trước đây không phải vậy. "FRM Đầu tư" có 2 bài, đánh số 11 và 12; "FRM
  // Quant" có 9 bài, đánh số 7 đến 15 - chúng được viết như phần tiếp của một
  // chuỗi khác mang tiền tố khác. Và hai chuỗi bị tách đôi bởi chính tiền tố
  // của mình: "FRM Liquidity Risk, Bài 1-3" rồi "FRM Liquidity, Bài 4-11",
  // cùng một chuỗi, hai cái tên, nên nhóm nào cũng có lỗ hổng.
  const groups = new Map<string, number[]>();
  for (const lesson of LESSONS) {
    const m = /^(.{2,32}?),\s*Bài\s+(\d+)\s*[:\-]/.exec(lesson.title);
    if (!m || m[1].startsWith("Tổng ôn")) continue;
    const key = m[1].trim();
    groups.set(key, [...(groups.get(key) ?? []), Number(m[2])]);
  }

  it("có đủ chuỗi bài để phép kiểm này có nghĩa", () => {
    expect(groups.size).toBeGreaterThan(20);
  });

  it("số bài khớp vị trí trong thứ tự học, không phải thứ tự id", () => {
    // Thứ tự id không phải thứ tự học. Chặng 1 mở đầu bằng bài đo chi tiêu
    // (id 1351) đứng TRƯỚC phần audit (id 263-268) vì `parts` xếp nó lên đầu,
    // nên đánh số theo id sẽ đẩy bài mở đầu xuống thứ bảy. Bốn chuỗi FRM cũng
    // vậy: các bài đào sâu viết sau mang id lớn hơn nhưng học trước.
    const order = new Map<number, number>();
    let n = 0;
    for (const track of [TRACK_PERSONAL, TRACK_PROFESSIONAL]) {
      for (const stage of track.stages) {
        for (const part of stage.parts) {
          for (const lesson of LESSONS.filter((l) => isLessonInRange(l.id, part)).sort((a, b) => a.id - b.id)) {
            if (!order.has(lesson.id)) order.set(lesson.id, n++);
          }
        }
      }
    }

    const wrong: string[] = [];
    for (const [key, _] of groups) {
      const members = LESSONS.filter((l) => {
        const m = /^(.{2,32}?),\s*Bài\s+(\d+)\s*[:\-]/.exec(l.title);
        return m && m[1].trim() === key;
      })
        .filter((l) => order.has(l.id))
        .sort((a, b) => order.get(a.id)! - order.get(b.id)!);
      members.forEach((l, i) => {
        const num = Number(/Bài\s+(\d+)/.exec(l.title)![1]);
        if (num !== i + 1) wrong.push(`${key}: ${l.id} ghi Bài ${num} nhưng đứng thứ ${i + 1}`);
      });
    }
    expect(wrong).toEqual([]);
  });

  it("mỗi chuỗi đánh số liền mạch từ 1, không lỗ hổng và không vượt quá", () => {
    const broken = [...groups.entries()]
      .map(([key, ns]) => ({ key, ns: [...ns].sort((a, b) => a - b) }))
      .filter(({ ns }) => ns.some((n, i) => n !== i + 1))
      .map(({ key, ns }) => `${key}: có ${ns.length} bài, đánh số ${ns.join(",")}`);
    expect(broken).toEqual([]);
  });
});
