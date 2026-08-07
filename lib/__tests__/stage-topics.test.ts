import { describe, expect, it } from "vitest";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL } from "../track-stages";
import { STAGE_TOPIC_TABLES, TOPIC_ADVICE, TOPIC_FALLBACK, stageTopicFor } from "../stage-topics";
import { vi as viDict } from "../i18n/dictionaries/vi";
import { en as enDict } from "../i18n/dictionaries/en";

// stage-numbering.test.ts đã canh ba bất biến về số chặng, và comment đầu file
// đó nói thẳng rằng "bảng phân loại của analytics" là thứ không theo lần dời số
// vừa rồi. Bảng đó vẫn không có test nào - nên bản thứ hai của nó, trong
// app/(app)/dashboard/actions.ts, còn so với "Chặng 0" suốt từ đó tới giờ.
//
// Ba bất biến dưới đây canh cái bảng, không canh số chặng.

const LABELS = {
  personal: TRACK_PERSONAL.stages.map((s) => s.label),
  professional: TRACK_PROFESSIONAL.stages.map((s) => s.label),
} as const;

describe("bảng chủ đề theo chặng", () => {
  it("mọi chặng có thật đều có một chủ đề", () => {
    // Đây là bất biến quan trọng nhất: chèn một chặng mới vào track mà quên
    // bảng này thì test đỏ, thay vì bài học lặng lẽ nhận chủ đề mặc định.
    for (const track of ["personal", "professional"] as const) {
      const missing = LABELS[track].filter((label) => !STAGE_TOPIC_TABLES[track][label]);
      expect(missing, `${track}: chặng không có chủ đề`).toEqual([]);
    }
  });

  it("không có mục nào trỏ tới chặng không còn tồn tại", () => {
    // Hướng còn lại, và là hướng đã xảy ra thật: "Chặng 0" bị đổi tên thành
    // "Chặng 1" và phép so trong dashboard chết hẳn mà không ai biết.
    for (const track of ["personal", "professional"] as const) {
      const stale = Object.keys(STAGE_TOPIC_TABLES[track]).filter(
        (label) => !LABELS[track].includes(label)
      );
      expect(stale, `${track}: mục trỏ tới chặng đã biến mất`).toEqual([]);
    }
  });

  it("không chủ đề nào gánh quá 1/4 số chặng của track", () => {
    // Đây là hình dạng của chính lỗi vừa sửa: nhánh mặc định của chuỗi if cũ
    // gánh 34 trong 43 chặng chuyên ngành, và vì nó là một dòng `return` nên
    // không ai đọc ra con số đó. Chủ đề chỉ có nghĩa khi nó phân biệt được -
    // topicGapSummary chỉ hiện TOP 4, nên một chủ đề chiếm hơn một phần tư
    // track sẽ luôn nằm trong đó bất kể người học yếu ở đâu.
    for (const track of ["personal", "professional"] as const) {
      const fanIn = new Map<string, number>();
      for (const label of LABELS[track]) {
        const topic = STAGE_TOPIC_TABLES[track][label];
        fanIn.set(topic, (fanIn.get(topic) ?? 0) + 1);
      }
      const ceiling = Math.ceil(LABELS[track].length / 4);
      const tooBroad = [...fanIn.entries()]
        .filter(([, n]) => n > ceiling)
        .map(([topic, n]) => `${topic}: ${n}/${LABELS[track].length} chặng (trần ${ceiling})`);
      expect(tooBroad, `${track}: chủ đề gộp quá rộng`).toEqual([]);
    }
  });

  it("không còn nhắc tới Chặng 0 ở bất cứ đâu trong bảng", () => {
    for (const track of ["personal", "professional"] as const) {
      expect(STAGE_TOPIC_TABLES[track]["Chặng 0"]).toBeUndefined();
      expect(LABELS[track]).not.toContain("Chặng 0");
    }
  });
});

describe("stageTopicFor", () => {
  it("trả đúng chủ đề của chặng chứa bài đó", () => {
    // Neo vào chặng thật thay vì vào một id cụ thể, để test không đỏ mỗi lần
    // khoảng id của chặng dịch đi.
    //
    // days[0] KHÔNG phải lúc nào cũng là một id có thật: chặng gom bài rời rạc
    // (Chặng 21 - Quản lý gia sản, tám bài nằm rải trong 1232-1287) ghi
    // days: [0, 0] rồi liệt kê extraLessonIds. Bản đầu của test này lấy days[0]
    // nên đi hỏi chủ đề của id 0, và id 0 lọt vào khoảng của một chặng khác -
    // test đỏ vì lỗi của chính nó, không phải của bảng.
    for (const track of ["personal", "professional"] as const) {
      const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
      for (const stage of stages) {
        const probeId = stage.days[0] > 0 ? stage.days[0] : stage.extraLessonIds?.[0];
        expect(probeId, `${stage.label}: không tìm được id đại diện`).toBeGreaterThan(0);
        expect(stageTopicFor(probeId!, track), `${track} ${stage.label} (id ${probeId})`).toBe(
          STAGE_TOPIC_TABLES[track][stage.label]
        );
      }
    }
  });

  it("bài ngoài mọi chặng nhận chủ đề mặc định của track", () => {
    expect(stageTopicFor(999999, "personal")).toBe(TOPIC_FALLBACK.personal);
    expect(stageTopicFor(999999, "professional")).toBe(TOPIC_FALLBACK.professional);
  });

  it("hai chặng cá nhân từng bị gán sai giờ không còn sai như thế", () => {
    // Bản trong dashboard viết cho lần đánh số trước gán Chặng 2 (Thuế TNCN)
    // vào "Đầu tư cá nhân" và Chặng 3 (Tư duy tiền bạc) vào "Trái phiếu & lãi
    // suất". Chủ đề đó rồi đi vào topicGapSummary và chọn luôn câu khuyên, nên
    // người học vấp quiz Thuế được khuyên đọc lại một tình huống đầu tư.
    const stageBy = (label: string) => TRACK_PERSONAL.stages.find((s) => s.label === label)!;
    expect(stageTopicFor(stageBy("Chặng 2").days[0], "personal")).toBe("tax-payroll");
    expect(stageTopicFor(stageBy("Chặng 3").days[0], "personal")).toBe("money-foundations");
  });
});

describe("chủ đề đi qua từ điển, không phải chuỗi tiếng Việt", () => {
  // Chuyện này là lý do id tồn tại. Bản cũ trả thẳng câu chữ tiếng Việt, và câu
  // chữ đó vừa hiện lên vừa làm khóa chọn lời khuyên qua
  // topic.includes("Kế toán" | "Định giá" | ...). Dịch nhãn sang tiếng Anh là
  // mọi lời khuyên rơi về câu chung: không lỗi, không test đỏ, chỉ là lời khuyên
  // ngừng liên quan tới điều người học vừa làm sai.
  const ALL_TOPIC_IDS = [
    ...new Set([
      ...Object.values(STAGE_TOPIC_TABLES.personal),
      ...Object.values(STAGE_TOPIC_TABLES.professional),
      ...Object.values(TOPIC_FALLBACK),
      "bonus-cases" as const,
    ]),
  ];

  it("mọi id chủ đề dùng thật đều có câu chữ ở cả hai từ điển", () => {
    for (const id of ALL_TOPIC_IDS) {
      expect(viDict.topics[id], `vi thiếu topics.${id}`).toBeTruthy();
      expect(enDict.topics[id], `en thiếu topics.${id}`).toBeTruthy();
    }
  });

  it("mọi id chủ đề đều có một câu khuyên, và câu khuyên đó có câu chữ", () => {
    for (const id of ALL_TOPIC_IDS) {
      const adviceId = TOPIC_ADVICE[id];
      expect(adviceId, `TOPIC_ADVICE thiếu ${id}`).toBeTruthy();
      expect(viDict.topicAdvice[adviceId], `vi thiếu topicAdvice.${adviceId}`).toBeTruthy();
      expect(enDict.topicAdvice[adviceId], `en thiếu topicAdvice.${adviceId}`).toBeTruthy();
    }
  });

  it("không id nào trong TOPIC_ADVICE là id chết", () => {
    // Hướng còn lại: bỏ một chủ đề khỏi bảng chặng mà quên TOPIC_ADVICE thì
    // bảng phình ra bằng những dòng không bao giờ tra tới.
    const unused = Object.keys(TOPIC_ADVICE).filter((id) => !ALL_TOPIC_IDS.includes(id as never));
    expect(unused, "id có trong TOPIC_ADVICE nhưng không chặng nào dùng").toEqual([]);
  });
});
