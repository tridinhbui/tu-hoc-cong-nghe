// Shared client-only helpers for the two "shareable card" surfaces
// (CertificateModal's milestone certificate, LevelUpModal's new level-up
// card): rasterizing an inline SVG to a PNG blob, and getting that PNG in
// front of the user - either straight into a share sheet (mobile browsers
// with the Web Share API's file support, which covers sharing directly into
// the Facebook/Messenger/Zalo apps) or, where that's unavailable
// (most desktop browsers), a plain download plus a nudge to attach it
// manually when posting.

/**
 * Chuẩn bị một `<svg>` trong trang để đem rasterize: nhân bản, ép kích thước
 * và namespace, rồi trả về chuỗi XML.
 *
 * Vì sao phải ép kích thước: SVG trong trang thường chỉ có `viewBox` và lấy
 * kích thước từ CSS. Khi bị tách ra thành một tệp riêng nạp qua blob URL thì
 * KHÔNG có CSS nào cả - nó thành một ảnh không có kích thước nội tại, và
 * Safari trên iOS từ chối nạp thẳng. Đó chính là lỗi "Không thể tải chứng chỉ
 * lúc này": thẻ chứng chỉ chỉ có `viewBox` và mấy class Tailwind, trong khi
 * hai thẻ chia sẻ còn lại đặt sẵn `width`/`height` nên vẫn tải được.
 *
 * Ép ở đây thay vì bắt từng nơi gọi tự nhớ: quên một lần là hỏng im lặng trên
 * đúng nhóm thiết bị mà người viết mã ít thử nhất.
 */
export function prepareSvgForRaster(svgElement: SVGSVGElement, width: number, height: number): string {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  clone.setAttribute("width", String(width));
  clone.setAttribute("height", String(height));
  // Không có viewBox thì phóng to sẽ cắt cụt thay vì co giãn.
  if (!clone.getAttribute("viewBox")) {
    const w = svgElement.clientWidth || width;
    const h = svgElement.clientHeight || height;
    clone.setAttribute("viewBox", `0 0 ${w} ${h}`);
  }
  return new XMLSerializer().serializeToString(clone);
}

/** Serializes an inline <svg> and rasterizes it to a PNG Blob at the given
 *  pixel size (should be larger than the SVG's viewBox for a crisp export -
 *  callers render at 2x their on-screen size). */
export function svgToPngBlob(svgElement: SVGSVGElement, width: number, height: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const svgString = prepareSvgForRaster(svgElement, width, height);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const blobUrl = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      // Nạp xong mà không có kích thước nghĩa là trình duyệt đã bỏ qua nội
      // dung. Bắt ở đây để lỗi nói ra được, thay vì xuất một tấm PNG trắng.
      if (image.naturalWidth === 0 || image.naturalHeight === 0) {
        URL.revokeObjectURL(blobUrl);
        reject(new Error("SVG rasterized to a zero-sized image"));
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(blobUrl);
        reject(new Error("Canvas 2D context unavailable"));
        return;
      }
      ctx.drawImage(image, 0, 0, width, height);
      URL.revokeObjectURL(blobUrl);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob returned null"));
      }, "image/png");
    };
    image.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error("Failed to rasterize SVG"));
    };
    image.src = blobUrl;
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export type ShareOutcome = "shared" | "downloaded" | "cancelled";

/** Tries the native share sheet (with the image attached) first - this is
 *  what lets someone post straight to Facebook/Messenger/Zalo without a
 *  manual "now go attach the file" step, but only Chrome/Safari on mobile
 *  (and a shrinking set of desktop browsers) support sharing files at all.
 *  Falls back to a plain download everywhere else. */
export async function shareOrDownloadImage(blob: Blob, filename: string, shareText: string): Promise<ShareOutcome> {
  const file = new File([blob], filename, { type: "image/png" });

  if (typeof navigator !== "undefined" && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text: shareText });
      return "shared";
    } catch (error) {
      // AbortError = user closed the share sheet without picking anything -
      // not a failure, just don't fall through to a surprise download.
      if (error instanceof Error && error.name === "AbortError") return "cancelled";
      // Any other failure (e.g. no share target installed): fall back below.
    }
  }

  downloadBlob(blob, filename);
  return "downloaded";
}
