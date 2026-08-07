import { describe, expect, it } from "vitest";
import { toDownloadUrl } from "../storage-download";

const PUBLIC_URL =
  "https://abc.supabase.co/storage/v1/object/public/chat-files/9f2c1a.pdf";

describe("toDownloadUrl", () => {
  it("thêm ?download với tên tệp gốc", () => {
    expect(toDownloadUrl(PUBLIC_URL, "bao-cao.pdf")).toBe(
      `${PUBLIC_URL}?download=bao-cao.pdf`
    );
  });

  it("dùng & khi URL đã có sẵn query string", () => {
    expect(toDownloadUrl(`${PUBLIC_URL}?t=123`, "a.pdf")).toBe(
      `${PUBLIC_URL}?t=123&download=a.pdf`
    );
  });

  it("mã hoá tên tệp có dấu và khoảng trắng", () => {
    // Không mã hoá thì khoảng trắng cắt cụt header Content-Disposition và
    // người dùng nhận được một tệp tên "Báo".
    expect(toDownloadUrl(PUBLIC_URL, "Báo cáo Q4.pdf")).toBe(
      `${PUBLIC_URL}?download=B%C3%A1o%20c%C3%A1o%20Q4.pdf`
    );
  });

  it("để Supabase tự chọn tên khi không có file_name", () => {
    expect(toDownloadUrl(PUBLIC_URL, null)).toBe(`${PUBLIC_URL}?download`);
    expect(toDownloadUrl(PUBLIC_URL)).toBe(`${PUBLIC_URL}?download`);
  });

  it("trả nguyên bản khi URL rỗng thay vì ném lỗi giữa cú bấm nút", () => {
    expect(toDownloadUrl("")).toBe("");
  });
});
