import "server-only";
import path from "path";
import ExcelJS from "exceljs";
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";

export function isExcelFileName(fileName: string): boolean {
  return /\.xlsx$/i.test(fileName);
}

// @napi-rs/canvas ships with no fonts of its own - without registering one,
// diacritics (ă, ố, ộ, ...) render as tofu boxes since the fallback font has
// no Vietnamese glyphs. Registered once per process (module-level, guarded)
// rather than per-call.
const FONT_FAMILY = "Noto Sans THTC";
let fontRegistered = false;
function ensureFontRegistered() {
  if (fontRegistered) return;
  GlobalFonts.registerFromPath(path.join(process.cwd(), "lib/fonts/NotoSans-Variable.ttf"), FONT_FAMILY);
  fontRegistered = true;
}

const MAX_ROWS = 10;
const MAX_COLS = 7;
const COL_WIDTH = 130;
const ROW_HEIGHT = 30;
const HEADER_HEIGHT = 34;
const PADDING = 0;
const FONT = `13px "${FONT_FAMILY}"`;
const HEADER_FONT = `bold 13px "${FONT_FAMILY}"`;

function cellText(cell: ExcelJS.Cell): string {
  const v = cell.value;
  if (v === null || v === undefined) return "";
  if (typeof v === "object" && "result" in (v as unknown as Record<string, unknown>)) {
    // Formula cell - show its computed result, not the formula text.
    return String((v as unknown as { result?: unknown }).result ?? "");
  }
  if (typeof v === "object" && "text" in (v as unknown as Record<string, unknown>)) {
    return String((v as unknown as { text?: unknown }).text ?? "");
  }
  if (v instanceof Date) return v.toLocaleDateString("vi-VN");
  return String(v);
}

function truncate(ctx: ReturnType<ReturnType<typeof createCanvas>["getContext"]>, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let out = text;
  while (out.length > 0 && ctx.measureText(out + "…").width > maxWidth) {
    out = out.slice(0, -1);
  }
  return out + "…";
}

/**
 * Renders the first sheet's top-left corner (up to 10 rows x 7 columns) of a
 * real .xlsx file as a PNG "screenshot", so the giveaway card shows actual
 * spreadsheet content instead of a generic file icon - without needing an
 * admin to manually screenshot and upload one. Returns null (never throws)
 * on anything that isn't a parseable modern .xlsx (legacy binary .xls,
 * corrupt file, encrypted workbook, empty sheet...) so callers can fall back
 * to the existing "no cover image" behavior.
 */
export async function generateExcelPreviewPng(buffer: ArrayBuffer | Buffer): Promise<Buffer | null> {
  try {
    ensureFontRegistered();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer as ArrayBuffer);
    const sheet = workbook.worksheets[0];
    if (!sheet || sheet.rowCount === 0) return null;

    const colCount = Math.min(MAX_COLS, sheet.columnCount || MAX_COLS);
    const rowCount = Math.min(MAX_ROWS, sheet.rowCount);
    if (colCount === 0 || rowCount === 0) return null;

    const width = colCount * COL_WIDTH;
    const height = HEADER_HEIGHT + (rowCount - 1) * ROW_HEIGHT + PADDING;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Base background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    for (let r = 1; r <= rowCount; r++) {
      const row = sheet.getRow(r);
      const isHeader = r === 1;
      const y = isHeader ? 0 : HEADER_HEIGHT + (r - 2) * ROW_HEIGHT;
      const rowH = isHeader ? HEADER_HEIGHT : ROW_HEIGHT;

      // Row background - header shaded like a real spreadsheet's frozen row,
      // alternating stripes for the rest so it visually reads as a grid.
      ctx.fillStyle = isHeader ? "#1f6f4e" : r % 2 === 0 ? "#f7f7f5" : "#ffffff";
      ctx.fillRect(0, y, width, rowH);

      for (let c = 1; c <= colCount; c++) {
        const x = (c - 1) * COL_WIDTH;
        const cell = row.getCell(c);
        const text = cellText(cell).trim();

        ctx.strokeStyle = isHeader ? "#1a5c40" : "#e5e5e0";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, COL_WIDTH - 1, rowH - 1);

        if (text) {
          ctx.font = isHeader ? HEADER_FONT : FONT;
          ctx.fillStyle = isHeader ? "#ffffff" : "#292524";
          ctx.textBaseline = "middle";
          const isNumeric = typeof cell.value === "number";
          const maxTextWidth = COL_WIDTH - 16;
          const clipped = truncate(ctx, text, maxTextWidth);
          const textX = isNumeric ? x + COL_WIDTH - 8 - ctx.measureText(clipped).width : x + 8;
          ctx.fillText(clipped, textX, y + rowH / 2);
        }
      }
    }

    return canvas.toBuffer("image/png");
  } catch (err) {
    console.error("Error generating Excel preview image:", err);
    return null;
  }
}
