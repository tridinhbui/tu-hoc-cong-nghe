import type { Locale } from "@/lib/i18n";
import type { FlashcardAlbum } from "@/lib/flashcard-albums";
import { flashcardAlbumsEn } from "./en";

/**
 * Bản dịch 5 album thẻ ghi nhớ trong lib/flashcard-albums.ts.
 *
 * ĐIỀU PHẢI ĐỌC TRƯỚC KHI SỬA: `term` không chỉ là chữ hiển thị. Album được
 * NHẬP vào bộ thẻ của người học, và `saveFlashcardsBulk` chống trùng bằng cách
 * so `term` với những thẻ ĐÃ LƯU của họ. Dịch `term` mà không làm gì thêm thì
 * một người đã nhập "Tài sản (Assets)" lúc dùng tiếng Việt, sang tiếng Anh nhập
 * lại cùng album ấy, sẽ nhận thêm một thẻ "Assets" - trùng nội dung với thẻ họ
 * đang có. Chú thích ở đầu FlashcardAlbumsGallery.tsx hứa đúng điều ngược lại:
 * "importing the same album twice ... never creates duplicates".
 *
 * Nên lớp phủ này trả về CẢ tên gốc: `mergeFlashcardAlbum` gắn `alsoKnownAs` vào
 * từng thẻ, và đường nhập bỏ qua thẻ nào đã có ở BẤT KỲ ngôn ngữ nào. Bộ thẻ của
 * người học vì thế nhận thẻ theo ngôn ngữ họ đang dùng, mà không sinh bản trùng
 * của thẻ cũ.
 *
 * `id`, `emoji`, `gradient` không bao giờ dịch: `id` là khoá, hai cái sau là
 * hình thức.
 */

export interface FlashcardAlbumTranslation {
  title?: string;
  description?: string;
  /** THEO VỊ TRÍ, khớp `cards` của album gốc. */
  cards?: { term?: string; definition?: string }[];
}

const BY_LOCALE: Record<string, Record<string, FlashcardAlbumTranslation>> = {
  en: flashcardAlbumsEn,
};

/** Thẻ kèm mọi tên nó từng có ở các ngôn ngữ khác, để đường nhập nhận ra thẻ cũ. */
export type ImportableCard = {
  term: string;
  definition: string;
  alsoKnownAs?: string[];
};

/** `Omit` chứ KHÔNG phải phép giao. `FlashcardAlbum & { cards: ImportableCard[] }`
 *  cho ra `cards` kiểu `FlashcardAlbumCard[] & ImportableCard[]`, và truy cập
 *  `.alsoKnownAs` trên phần tử đó không biên dịch được - phép giao thu hẹp kiểu
 *  chứ không thay thế nó. */
export type LocalizedFlashcardAlbum = Omit<FlashcardAlbum, "cards"> & {
  cards: ImportableCard[];
};

export function mergeFlashcardAlbum(
  album: FlashcardAlbum,
  locale: Locale
): LocalizedFlashcardAlbum {
  const patch = locale === "vi" ? null : BY_LOCALE[locale]?.[album.id];
  if (!patch) return album as LocalizedFlashcardAlbum;

  // Lệch độ dài thì bỏ nguyên phần dịch thẻ và giữ tiếng Việt. Ghép theo vị trí
  // khi lệch sẽ gắn định nghĩa của thẻ này lên tên của thẻ khác - một thẻ dạy
  // sai thì tệ hơn một thẻ chưa dịch.
  const useCards = patch.cards && patch.cards.length === album.cards.length;

  return {
    ...album,
    title: patch.title ?? album.title,
    description: patch.description ?? album.description,
    cards: album.cards.map((card, i) => {
      const c = useCards ? patch.cards![i] : undefined;
      const term = c?.term ?? card.term;
      return {
        term,
        definition: c?.definition ?? card.definition,
        // Chỉ ghi khi tên thật sự đổi. `alsoKnownAs: ["Sharpe Ratio"]` cho một
        // thẻ vẫn tên "Sharpe Ratio" là dữ liệu vô nghĩa đi qua cả đường nhập.
        ...(term !== card.term ? { alsoKnownAs: [card.term] } : {}),
      };
    }),
  };
}

export function mergeFlashcardAlbums(
  albums: readonly FlashcardAlbum[],
  locale: Locale
): LocalizedFlashcardAlbum[] {
  return albums.map((album) => mergeFlashcardAlbum(album, locale));
}
