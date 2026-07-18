// Shared client-only helpers for the two "shareable card" surfaces
// (CertificateModal's milestone certificate, LevelUpModal's new level-up
// card): rasterizing an inline SVG to a PNG blob, and getting that PNG in
// front of the user - either straight into a share sheet (mobile browsers
// with the Web Share API's file support, which covers sharing directly into
// the Facebook/Messenger/Zalo apps) or, where that's unavailable
// (most desktop browsers), a plain download plus a nudge to attach it
// manually when posting.

/** Serializes an inline <svg> and rasterizes it to a PNG Blob at the given
 *  pixel size (should be larger than the SVG's viewBox for a crisp export -
 *  callers render at 2x their on-screen size). */
export function svgToPngBlob(svgElement: SVGSVGElement, width: number, height: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const blobUrl = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
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
