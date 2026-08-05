// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { prepareSvgForRaster } from "../share-image";

/**
 * Vì sao bài này tồn tại: tấm chứng chỉ không tải được trên điện thoại, và
 * nguyên nhân là `<svg>` của nó chỉ có `viewBox` cùng mấy class Tailwind - khi
 * bị tách ra thành ảnh riêng thì không còn CSS nào, nên nó không có kích thước
 * nội tại và Safari từ chối nạp.
 *
 * Hai thẻ chia sẻ còn lại đặt sẵn `width`/`height` nên vẫn chạy, và chính sự
 * khác nhau đó khiến lỗi sống lâu: người viết mã thử thẻ này thấy chạy, không
 * ai thử thẻ kia trên iPhone.
 */

function makeSvg(attrs: Record<string, string>): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  for (const [k, v] of Object.entries(attrs)) svg.setAttribute(k, v);
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("width", "10");
  rect.setAttribute("height", "10");
  svg.appendChild(rect);
  return svg as SVGSVGElement;
}

describe("prepareSvgForRaster", () => {
  it("ép kích thước cho SVG chỉ có viewBox - đúng trường hợp của tấm chứng chỉ", () => {
    const out = prepareSvgForRaster(makeSvg({ viewBox: "0 0 800 600" }), 1600, 1200);
    expect(out).toContain('width="1600"');
    expect(out).toContain('height="1200"');
  });

  it("ghi đè kích thước cũ bằng cỡ xuất, không giữ cỡ hiển thị", () => {
    const out = prepareSvgForRaster(makeSvg({ viewBox: "0 0 800 800", width: "800", height: "800" }), 1600, 1600);
    expect(out).toContain('width="1600"');
    expect(out).not.toContain('width="800"');
  });

  it("luôn có namespace, kể cả khi thẻ trong trang không khai", () => {
    const out = prepareSvgForRaster(makeSvg({ viewBox: "0 0 10 10" }), 100, 100);
    expect(out).toContain("http://www.w3.org/2000/svg");
  });

  it("giữ nguyên viewBox có sẵn - đổi nó là méo hình", () => {
    const out = prepareSvgForRaster(makeSvg({ viewBox: "0 0 800 600" }), 1600, 1200);
    expect(out).toContain('viewBox="0 0 800 600"');
  });

  it("thiếu viewBox thì tự dựng một cái, để phóng to không bị cắt cụt", () => {
    const out = prepareSvgForRaster(makeSvg({}), 400, 300);
    expect(out).toMatch(/viewBox="0 0 \d+ \d+"/);
  });

  it("không đụng vào thẻ gốc trong trang - bản xuất là bản sao", () => {
    const svg = makeSvg({ viewBox: "0 0 800 600" });
    prepareSvgForRaster(svg, 1600, 1200);
    expect(svg.getAttribute("width")).toBeNull();
  });

  it("giữ lại nội dung bên trong", () => {
    const out = prepareSvgForRaster(makeSvg({ viewBox: "0 0 10 10" }), 100, 100);
    expect(out).toContain("<rect");
  });
});
