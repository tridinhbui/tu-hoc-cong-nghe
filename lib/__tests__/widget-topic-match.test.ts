import { describe, expect, it } from "vitest";
import { lessons } from "../lessons";
import { WIDGET_TOPIC_TERMS, widgetMatchesTopic } from "../widget-topics";
import { WIDGET_TYPES } from "@/components/InteractiveWidget";

// Cửa chặn cho khối "Thử nghiệm tương tác".
//
// `interactiveType` là một chuỗi gắn tay, và cho tới nay không có gì đối chiếu
// nó với nội dung bài. Hậu quả không lộ ra: bài GARCH khai `chart` thì hiện
// một biểu đồ lãi đơn - lãi kép, bài ghi sổ kép khai `process` thì hiện sơ đồ
// ba báo cáo. Không lỗi, không cảnh báo, chỉ là widget nói chuyện khác.
//
// Đây không phải phép đo chất lượng - nó chỉ bắt cái NGƯỢC HẲN chủ đề. Một bài
// chỉ cần chứa một trong nhiều từ khoá rộng của widget mình khai là qua.

const withWidget = lessons.filter((l) => l.interactiveType);

describe("widget khớp chủ đề bài học", () => {
  it("có đủ bài dùng widget để phép kiểm này có nghĩa", () => {
    expect(withWidget.length).toBeGreaterThan(200);
  });

  it("mọi bài đều nói về đúng chuyện widget của nó dạy", () => {
    const off = withWidget
      .filter((l) => !widgetMatchesTopic(l.interactiveType!, l))
      .map((l) => `${l.id} [${l.interactiveType}] ${l.title.slice(0, 52)}`);
    expect(off).toEqual([]);
  });
});

describe("bảng từ khoá tự nó nhất quán", () => {
  it("mọi loại widget đang được bài học dùng đều có mục trong bảng", () => {
    const used = [...new Set(withWidget.map((l) => l.interactiveType!))];
    const missing = used.filter((t) => !WIDGET_TOPIC_TERMS[t]);
    expect(missing).toEqual([]);
  });

  it("mọi loại trong bảng đều là widget có thật", () => {
    const real = new Set(WIDGET_TYPES as readonly string[]);
    const ghosts = Object.keys(WIDGET_TOPIC_TERMS).filter((t) => !real.has(t));
    expect(ghosts).toEqual([]);
  });

  it("không mục nào bỏ trống", () => {
    for (const [type, terms] of Object.entries(WIDGET_TOPIC_TERMS)) {
      expect(terms.length, type).toBeGreaterThan(0);
    }
  });
});
