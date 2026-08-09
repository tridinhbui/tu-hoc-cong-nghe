import type { Locale } from "@/lib/i18n";
import { DEFAULT_FINANCIAL_GLOSSARY } from "@/lib/supabase-flashcards";
import type { ImportableCard } from "@/lib/flashcard-albums-i18n";
import { defaultGlossaryEn } from "./en";

/**
 * Bản dịch bộ thẻ mặc định (`DEFAULT_FINANCIAL_GLOSSARY`).
 *
 * Cùng cái bẫy đã ghi ở lib/flashcard-albums-i18n, và ở đây nó đến từ một
 * đường khác: `saveFlashcard` upsert theo `(user_id, term)`, nên nạp lại cùng
 * một thẻ chỉ cập nhật hàng cũ. Nhưng `term` ĐÃ DỊCH là một khoá khác - người
 * bấm "nạp bộ mẫu" lúc dùng tiếng Việt rồi bấm lại sau khi đổi sang tiếng Anh
 * sẽ có 16 thẻ trùng nội dung thay vì 8.
 *
 * Nên hàm dưới đây trả về `ImportableCard` - đúng kiểu mà `saveFlashcardsBulk`
 * nhận - kèm `alsoKnownAs` là tên tiếng Việt. Đường nạp đã đổi sang gọi bulk,
 * nên nó bỏ qua thẻ đã có ở bất kỳ ngôn ngữ nào.
 *
 * `alsoKnownAs` KHÔNG được lưu; nó chỉ dùng để quyết định bỏ qua.
 */

/** Khoá theo tên tiếng Việt gốc, vì bộ này không có `id`. */
export type GlossaryTranslation = Record<string, { term: string; definition: string }>;

const BY_LOCALE: Record<string, GlossaryTranslation> = { en: defaultGlossaryEn };

export function localizedDefaultGlossary(locale: Locale): ImportableCard[] {
  const patch = locale === "vi" ? null : BY_LOCALE[locale];
  return DEFAULT_FINANCIAL_GLOSSARY.map((card) => {
    const t = patch?.[card.term];
    if (!t) return { term: card.term, definition: card.definition };
    return {
      term: t.term,
      definition: t.definition,
      // Chỉ ghi khi tên thật sự đổi - xem lý do ở flashcard-albums-i18n.
      ...(t.term !== card.term ? { alsoKnownAs: [card.term] } : {}),
    };
  });
}
