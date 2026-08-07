// Shared between server-only admin code and client-facing components - kept
// separate from lib/admin/documents.ts (which has a "server-only" guard) so
// client components can import the category list without pulling in
// service-role-key-using code.
//
// `value` is written to the `documents.category` column and used as
// `<option value>` - it must stay byte-identical across locales. Only the
// label is translatable, via `documentCategoriesOf(t)` below.
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

export const DOCUMENT_CATEGORIES = [
  { value: "mau-bieu", label: "Mẫu biểu" },
  { value: "ebook", label: "Ebook / Tài liệu đọc" },
  { value: "checklist", label: "Checklist" },
  { value: "cong-cu", label: "Công cụ (Excel/Sheet)" },
  { value: "khac", label: "Khác" },
] as const;

export type DocumentCategoryValue = (typeof DOCUMENT_CATEGORIES)[number]["value"];

/** DOCUMENT_CATEGORIES with labels in the current locale of
 *  `t.libData.documentCategories`. Values are untouched. */
export function documentCategoriesOf(t: Dictionary): { value: DocumentCategoryValue; label: string }[] {
  const copy = t.libData.documentCategories;
  return DOCUMENT_CATEGORIES.map((c) => ({ value: c.value, label: copy[c.value] }));
}

/** Looks up a single category's label by value, in the current locale. */
export function documentCategoryLabel(value: string, t: Dictionary): string {
  return documentCategoriesOf(t).find((c) => c.value === value)?.label ?? value;
}
