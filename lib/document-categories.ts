// Shared between server-only admin code and client-facing components — kept
// separate from lib/admin/documents.ts (which has a "server-only" guard) so
// client components can import the category list without pulling in
// service-role-key-using code.
export const DOCUMENT_CATEGORIES = [
  { value: "mau-bieu", label: "Mẫu biểu" },
  { value: "ebook", label: "Ebook / Tài liệu đọc" },
  { value: "checklist", label: "Checklist" },
  { value: "cong-cu", label: "Công cụ (Excel/Sheet)" },
  { value: "khac", label: "Khác" },
] as const;
