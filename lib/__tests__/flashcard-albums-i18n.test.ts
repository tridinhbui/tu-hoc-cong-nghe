import { describe, expect, it } from "vitest";
import { VIETNAMESE_DIACRITICS } from "./vietnamese-diacritics";
import { FLASHCARD_ALBUMS } from "@/lib/flashcard-albums";
import { flashcardAlbumsEn } from "@/lib/flashcard-albums-i18n/en";
import { mergeFlashcardAlbum, mergeFlashcardAlbums } from "@/lib/flashcard-albums-i18n";

/** Cổng đủ-100% cho bản dịch album thẻ, và cổng CHỐNG TRÙNG qua hai ngôn ngữ.
 *
 *  Phần thứ hai là phần đáng có. `term` không chỉ là chữ hiển thị: album được
 *  nhập vào bộ thẻ của người học và `saveFlashcardsBulk` chống trùng bằng cách
 *  so `term` với thẻ ĐÃ LƯU. Dịch `term` mà không mang theo tên cũ thì một người
 *  đã nhập album lúc dùng tiếng Việt, sang tiếng Anh nhập lại, nhận thêm một bộ
 *  thẻ trùng nội dung hoàn toàn - và chú thích ở đầu FlashcardAlbumsGallery.tsx
 *  hứa đúng điều ngược lại. */

const VN = VIETNAMESE_DIACRITICS;
describe("bản dịch đủ", () => {
  it("mọi album đều có bản tiếng Anh, không có bản mồ côi", () => {
    const ids = new Set(FLASHCARD_ALBUMS.map((a) => a.id));
    expect(FLASHCARD_ALBUMS.filter((a) => !flashcardAlbumsEn[a.id]).map((a) => a.id)).toEqual([]);
    expect(Object.keys(flashcardAlbumsEn).filter((id) => !ids.has(id))).toEqual([]);
  });

  it("mọi album có title, description và đúng số thẻ", () => {
    for (const album of FLASHCARD_ALBUMS) {
      const patch = flashcardAlbumsEn[album.id];
      expect(patch.title, album.id).toBeTruthy();
      expect(patch.description, album.id).toBeTruthy();
      expect(patch.cards?.length, album.id).toBe(album.cards.length);
    }
  });

  it("mọi thẻ có definition tiếng Anh", () => {
    const missing: string[] = [];
    for (const album of FLASHCARD_ALBUMS)
      album.cards.forEach((card, i) => {
        if (!flashcardAlbumsEn[album.id].cards?.[i]?.definition)
          missing.push(`${album.id}[${i}] ${card.term}`);
      });
    expect(missing).toEqual([]);
  });

  it("không còn chữ tiếng Việt nào sau khi hợp nhất", () => {
    // tsc chỉ chứng minh khoá tồn tại. Bỏ trống `term` cho một thẻ tên thuần
    // tiếng Việt thì biên dịch vẫn qua và thẻ vẫn hiện tiếng Việt.
    const offenders: string[] = [];
    for (const album of mergeFlashcardAlbums(FLASHCARD_ALBUMS, "en")) {
      if (VN.test(album.title)) offenders.push(`title ${album.title}`);
      if (VN.test(album.description)) offenders.push(`description ${album.description}`);
      for (const card of album.cards) {
        if (VN.test(card.term)) offenders.push(`term ${card.term}`);
        if (VN.test(card.definition)) offenders.push(`definition ${card.term}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe("chống trùng khi người học đổi ngôn ngữ", () => {
  it("thẻ nào đổi tên đều mang theo tên tiếng Việt trong alsoKnownAs", () => {
    for (const album of FLASHCARD_ALBUMS) {
      const merged = mergeFlashcardAlbum(album, "en");
      merged.cards.forEach((card, i) => {
        const original = album.cards[i].term;
        if (card.term !== original) {
          expect(card.alsoKnownAs, `${album.id}[${i}]`).toContain(original);
        }
      });
    }
  });

  it("thẻ KHÔNG đổi tên thì không mang alsoKnownAs rỗng nghĩa", () => {
    // `alsoKnownAs: ["Sharpe Ratio"]` cho một thẻ vẫn tên "Sharpe Ratio" là dữ
    // liệu vô nghĩa đi qua cả đường nhập thẻ.
    for (const album of FLASHCARD_ALBUMS) {
      mergeFlashcardAlbum(album, "en").cards.forEach((card, i) => {
        if (card.term === album.cards[i].term) {
          expect(card.alsoKnownAs, `${album.id}[${i}]`).toBeUndefined();
        }
      });
    }
  });

  it("mô phỏng đúng cảnh đã hỏng: nhập tiếng Việt rồi nhập lại tiếng Anh", () => {
    // Đây là phép kiểm quan trọng nhất trong tệp. Nó dựng lại chính luật của
    // saveFlashcardsBulk và bắt buộc lần nhập thứ hai KHÔNG thêm thẻ nào.
    const album = FLASHCARD_ALBUMS.find((a) => a.id === "ke-toan-co-ban")!;
    const stored = new Set(mergeFlashcardAlbum(album, "vi").cards.map((c) => c.term));
    const isNew = (c: { term: string; alsoKnownAs?: string[] }) =>
      !stored.has(c.term) && !(c.alsoKnownAs ?? []).some((alias) => stored.has(alias));

    const secondImport = mergeFlashcardAlbum(album, "en").cards.filter(isNew);
    expect(secondImport.map((c) => c.term)).toEqual([]);
  });

  it("và ngược lại: nhập tiếng Anh rồi nhập lại tiếng Việt", () => {
    // Chiều này KHÔNG được `alsoKnownAs` che, vì thẻ tiếng Việt không mang tên
    // tiếng Anh. Ghi lại ở đây để nó là một giới hạn ĐÃ BIẾT chứ không phải một
    // chỗ tưởng đã kín: người nhập bằng tiếng Anh trước rồi đổi sang tiếng Việt
    // sẽ nhận bản trùng. Đóng chiều này cần một khoá không phụ thuộc ngôn ngữ,
    // tức một cột mới trên user_flashcards.
    const album = FLASHCARD_ALBUMS.find((a) => a.id === "ke-toan-co-ban")!;
    const stored = new Set(mergeFlashcardAlbum(album, "en").cards.map((c) => c.term));
    const isNew = (c: { term: string; alsoKnownAs?: string[] }) =>
      !stored.has(c.term) && !(c.alsoKnownAs ?? []).some((alias) => stored.has(alias));
    const secondImport = mergeFlashcardAlbum(album, "vi").cards.filter(isNew);
    expect(secondImport.length).toBeGreaterThan(0);
  });
});

describe("những thứ không được đổi", () => {
  it("id, emoji và gradient đi qua nguyên vẹn", () => {
    mergeFlashcardAlbums(FLASHCARD_ALBUMS, "en").forEach((album, i) => {
      const src = FLASHCARD_ALBUMS[i];
      expect([album.id, album.emoji, album.gradient]).toEqual([src.id, src.emoji, src.gradient]);
    });
  });

  it("công thức trong definition giữ nguyên từng ký tự", () => {
    // "FCFF = NI + NCC + Int(1-T) - FCInv - WCInv" là thứ người học phải nhớ
    // đúng, nên nó không được diễn đạt lại.
    const cfa = mergeFlashcardAlbum(
      FLASHCARD_ALBUMS.find((a) => a.id === "cfa-level-1-terms")!,
      "en"
    );
    const all = cfa.cards.map((c) => c.definition).join(" ");
    for (const formula of [
      "FCFF = NI + NCC + Int(1-T) - FCInv - WCInv",
      "E(R) = Rf + Beta × [E(Rm) - Rf]",
      "WACC = (Wd × Rd × (1-T)) + (Wp × Rp) + (We × Re)",
      "(Rp - Rf) / StdDev(p)",
    ]) {
      expect(all, formula).toContain(formula);
    }
  });

  it("locale vi trả về đúng album gốc", () => {
    for (const album of FLASHCARD_ALBUMS) {
      expect(mergeFlashcardAlbum(album, "vi")).toBe(album);
    }
  });
});
