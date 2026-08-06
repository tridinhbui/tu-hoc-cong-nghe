// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BLOB_REVOKE_DELAY_MS, downloadBlob, prepareSvgForRaster, shareOrDownloadImage } from "../share-image";

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

/**
 * Nửa còn lại của đường đi: dựng được tấm PNG rồi thì còn phải GIAO nó tới tay
 * người dùng. Nửa này trước đây không có bài kiểm nào, và đó là nơi lỗi còn
 * sót lại sau lần sửa trước - người học vẫn báo "chưa tải được chứng chỉ".
 */
describe("downloadBlob", () => {
  let created: string[];
  let revoked: string[];
  let clicked: number;

  beforeEach(() => {
    vi.useFakeTimers();
    created = [];
    revoked = [];
    clicked = 0;
    URL.createObjectURL = vi.fn(() => {
      const u = `blob:test/${created.length}`;
      created.push(u);
      return u;
    });
    URL.revokeObjectURL = vi.fn((u: string) => {
      revoked.push(u);
    });
    // jsdom khong thuc su tai tep; dem so lan click la du de biet the <a> co
    // duoc kich hoat khong.
    HTMLAnchorElement.prototype.click = function () {
      clicked++;
    };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("kich hoat the <a> voi dung ten tep", () => {
    downloadBlob(new Blob(["x"]), "chung_chi.png");
    expect(clicked).toBe(1);
    expect(created).toHaveLength(1);
  });

  // Day chinh la lo hong: Safari va Firefox bat dau tai o mot luot sau, nen
  // thu hoi URL ngay trong cung luot click se huy cu tai - im lang, khong loi,
  // khong tep. Chrome thuong thoat duoc, nen may phat trien khong thay gi.
  it("KHONG thu hoi blob URL ngay trong luot click", () => {
    downloadBlob(new Blob(["x"]), "chung_chi.png");
    expect(revoked).toHaveLength(0);
  });

  it("co thu hoi sau do, de khong ro ri bo nho", () => {
    downloadBlob(new Blob(["x"]), "chung_chi.png");
    vi.advanceTimersByTime(BLOB_REVOKE_DELAY_MS);
    expect(revoked).toEqual(created);
  });
});

describe("shareOrDownloadImage", () => {
  const originalNavigator = globalThis.navigator;

  afterEach(() => {
    Object.defineProperty(globalThis, "navigator", {
      value: originalNavigator,
      configurable: true,
    });
    vi.useRealTimers();
  });

  function stubNavigator(nav: Record<string, unknown>) {
    Object.defineProperty(globalThis, "navigator", { value: nav, configurable: true });
  }

  it("dung khay chia se khi trinh duyet ho tro gui tep", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    stubNavigator({ canShare: () => true, share });
    const outcome = await shareOrDownloadImage(new Blob(["x"]), "a.png", "loi nhan");
    expect(outcome).toBe("shared");
    expect(share).toHaveBeenCalledOnce();
  });

  // Nguoi dung dong khay ma khong chon gi thi KHONG co tep nao ca. Bao thanh
  // cong o day la ly do bao loi lan nay khong con thong bao loi nao kem theo.
  it("dong khay chia se la 'cancelled', khong am tham tai xuong", async () => {
    const err = new Error("x");
    err.name = "AbortError";
    const share = vi.fn().mockRejectedValue(err);
    stubNavigator({ canShare: () => true, share });
    vi.useFakeTimers();
    const clickSpy = vi.fn();
    HTMLAnchorElement.prototype.click = clickSpy;
    const outcome = await shareOrDownloadImage(new Blob(["x"]), "a.png", "loi nhan");
    expect(outcome).toBe("cancelled");
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it("khong ho tro gui tep thi tai xuong thang", async () => {
    stubNavigator({});
    vi.useFakeTimers();
    const clickSpy = vi.fn();
    HTMLAnchorElement.prototype.click = clickSpy;
    URL.createObjectURL = vi.fn(() => "blob:test/0");
    URL.revokeObjectURL = vi.fn();
    const outcome = await shareOrDownloadImage(new Blob(["x"]), "a.png", "loi nhan");
    expect(outcome).toBe("downloaded");
    expect(clickSpy).toHaveBeenCalledOnce();
  });
});
