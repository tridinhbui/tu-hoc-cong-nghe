import "server-only";
import ExcelJS from "exceljs";

export function isExcelFileName(fileName: string): boolean {
  return /\.xlsx$/i.test(fileName);
}

const MAX_ROWS = 10;
const MAX_COLS = 7;
const COL_WIDTH = 130;
const ROW_HEIGHT = 30;
const HEADER_HEIGHT = 34;

// Ngăn xếp phông của HỆ THỐNG, không phải một tệp .ttf đi kèm.
//
// Bản trước vẽ bằng @napi-rs/canvas và phải `registerFromPath` một tệp
// NotoSans-Variable.ttf, vì canvas không mang phông nào theo và thiếu nó thì
// dấu tiếng Việt (ă, ố, ộ) hiện ra ô vuông. SVG thì để trình duyệt lo phông,
// nên tệp .ttf không còn cần thiết - và chữ có dấu hiện đúng ở mọi máy có một
// phông Unicode, tức mọi máy.
const FONT_STACK = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

function cellText(cell: ExcelJS.Cell): string {
  const v = cell.value;
  if (v === null || v === undefined) return "";
  if (typeof v === "object" && "result" in (v as unknown as Record<string, unknown>)) {
    // Ô công thức - hiện kết quả đã tính, không hiện công thức.
    return String((v as unknown as { result?: unknown }).result ?? "");
  }
  if (typeof v === "object" && "text" in (v as unknown as Record<string, unknown>)) {
    return String((v as unknown as { text?: unknown }).text ?? "");
  }
  if (v instanceof Date) return v.toLocaleDateString("vi-VN");
  return String(v);
}

// Nội dung bảng tính là dữ liệu người dùng tải lên, nên nó đi thẳng vào SVG mà
// không thoát ký tự thì một ô chứa `</text><script>` là một lỗ XSS - SVG phục
// vụ từ cùng miền vẫn chạy được script. Thoát cả năm ký tự, kể cả nháy, vì cùng
// hàm này còn dùng cho giá trị thuộc tính.
function xml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Kết xuất góc trên bên trái của trang tính đầu tiên (tối đa 10 hàng x 7 cột)
 * của một tệp .xlsx thật thành ảnh SVG, để thẻ tài liệu hiện nội dung bảng tính
 * thay vì một biểu tượng tệp chung chung - mà không cần quản trị viên tự chụp
 * màn hình rồi tải lên.
 *
 * Trả về null (KHÔNG bao giờ ném) với bất cứ thứ gì không phải .xlsx đọc được
 * (tệp .xls nhị phân cũ, tệp hỏng, workbook mã hoá, trang tính rỗng), để bên
 * gọi rơi về hành vi "không có ảnh bìa" sẵn có.
 *
 * VÌ SAO LÀ SVG CHỨ KHÔNG PHẢI PNG. Bản trước dùng @napi-rs/canvas, một thư
 * viện nhị phân gốc: `opennextjs-cloudflare build` dừng ở
 * "No loader is configured for .node files" vì Workers không nạp được mã máy.
 * SVG chỉ là chuỗi, nên nó chạy ở mọi runtime, tệp nhỏ hơn, và nét ở mọi độ
 * phân giải. Bên gọi chỉ nhận một URL và đặt vào <img>, thứ hiển thị SVG bình
 * thường - nên đổi định dạng không đụng gì tới phía hiển thị.
 */
export async function generateExcelPreviewSvg(buffer: ArrayBuffer | Buffer): Promise<string | null> {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer as ArrayBuffer);
    const sheet = workbook.worksheets[0];
    if (!sheet || sheet.rowCount === 0) return null;

    const colCount = Math.min(MAX_COLS, sheet.columnCount || MAX_COLS);
    const rowCount = Math.min(MAX_ROWS, sheet.rowCount);
    if (colCount === 0 || rowCount === 0) return null;

    const width = colCount * COL_WIDTH;
    const height = HEADER_HEIGHT + (rowCount - 1) * ROW_HEIGHT;

    const parts: string[] = [];
    parts.push(`<rect width="${width}" height="${height}" fill="#ffffff"/>`);

    // Một clipPath cho mỗi bề rộng ô, dùng lại cho mọi ô.
    //
    // Bản canvas cắt chữ bằng cách đo từng chuỗi rồi bỏ dần ký tự cuối cho tới
    // khi vừa. SVG không có phép đo nào tương đương, và đoán theo số ký tự thì
    // sai với chữ có dấu. clipPath cắt theo HÌNH HỌC nên chính xác tuyệt đối và
    // không cần biết gì về phông - đổi lại là cắt cụt thay vì thêm dấu "…".
    parts.push(
      `<defs><clipPath id="c"><rect x="8" y="0" width="${COL_WIDTH - 16}" height="${HEADER_HEIGHT}"/></clipPath>` +
      `<clipPath id="r"><rect x="8" y="0" width="${COL_WIDTH - 16}" height="${ROW_HEIGHT}"/></clipPath></defs>`
    );

    for (let r = 1; r <= rowCount; r++) {
      const row = sheet.getRow(r);
      const isHeader = r === 1;
      const y = isHeader ? 0 : HEADER_HEIGHT + (r - 2) * ROW_HEIGHT;
      const rowH = isHeader ? HEADER_HEIGHT : ROW_HEIGHT;

      // Nền hàng - hàng tiêu đề tô đậm như hàng đóng băng của bảng tính thật,
      // các hàng sau kẻ sọc xen kẽ để mắt đọc ra một cái lưới.
      const bg = isHeader ? "#1f6f4e" : r % 2 === 0 ? "#f7f7f5" : "#ffffff";
      parts.push(`<rect x="0" y="${y}" width="${width}" height="${rowH}" fill="${bg}"/>`);

      for (let c = 1; c <= colCount; c++) {
        const x = (c - 1) * COL_WIDTH;
        const cell = row.getCell(c);
        const text = cellText(cell).trim();

        parts.push(
          `<rect x="${x + 0.5}" y="${y + 0.5}" width="${COL_WIDTH - 1}" height="${rowH - 1}" ` +
          `fill="none" stroke="${isHeader ? "#1a5c40" : "#e5e5e0"}" stroke-width="1"/>`
        );

        if (!text) continue;
        const isNumeric = typeof cell.value === "number";
        const anchor = isNumeric ? "end" : "start";
        const tx = isNumeric ? COL_WIDTH - 8 : 8;
        parts.push(
          `<g transform="translate(${x},${y})" clip-path="url(#${isHeader ? "c" : "r"})">` +
          `<text x="${tx}" y="${rowH / 2}" dominant-baseline="central" text-anchor="${anchor}" ` +
          `font-family="${FONT_STACK}" font-size="13" ` +
          `font-weight="${isHeader ? "bold" : "normal"}" fill="${isHeader ? "#ffffff" : "#292524"}">` +
          `${xml(text)}</text></g>`
        );
      }
    }

    return (
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
      `viewBox="0 0 ${width} ${height}">${parts.join("")}</svg>`
    );
  } catch (err) {
    console.error("Error generating Excel preview image:", err);
    return null;
  }
}
