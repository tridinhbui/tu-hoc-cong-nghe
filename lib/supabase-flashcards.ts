import { createClient } from "./supabase";

export interface Flashcard {
  id?: number;
  term: string;
  definition: string;
  interval: number; // in days
  ease_factor: number; // default 2.5
  repetitions: number; // default 0
  next_review_at: string;
  created_at?: string;
}

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "PGRST116" || error.code === "42P01" || error.message?.includes("does not exist") || false;
}

// SM2 Algorithm for Spaced Repetition
// quality: 0 (forgot/incorrect) to 5 (perfect recall/easy)
export function calculateSM2(
  quality: number,
  prevRepetitions: number,
  prevEaseFactor: number,
  prevInterval: number
) {
  let repetitions = prevRepetitions;
  let easeFactor = prevEaseFactor;
  let interval = prevInterval;

  if (quality >= 3) {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.ceil(prevInterval * easeFactor);
    }
    repetitions++;
  } else {
    repetitions = 0;
    interval = 1;
  }

  // Adjust Ease Factor (minimum 1.3)
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    repetitions,
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    nextReviewAt: nextReview.toISOString(),
  };
}

function localKey(userId: string) {
  return `flashcards_${userId}`;
}

function readLocal(userId: string): Flashcard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(localKey(userId));
    return raw ? (JSON.parse(raw) as Flashcard[]) : [];
  } catch {
    return [];
  }
}

// Fetch all flashcards for a user.
//
// Reported by a learner: "flash card lưu từ mà k sài đc" - saving a term
// appeared to work, but the review list came up empty. Cause was an
// asymmetry between this function and saveFlashcard: saveFlashcard falls back
// to localStorage on ANY error and returns true (so the UI says "saved"),
// while this one only fell back on isMissingTableError. A permission error -
// 42501, which is exactly what user_flashcards returned before
// 20260730_missing_grants_flashcards_recalls.sql granted table privileges -
// therefore wrote to localStorage but read back an empty array. The card was
// saved, just nowhere the app would ever look.
//
// Now the two agree: any failure reads from the same place any failure
// writes to. And when the database recovers, cards stranded in localStorage
// are merged in and pushed back up, so a learner who saved terms during the
// outage doesn't silently lose them.
export async function getFlashcards(userId: string): Promise<Flashcard[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_flashcards")
    .select("term, definition, interval, ease_factor, repetitions, next_review_at")
    .eq("user_id", userId);

  if (error) {
    if (!isMissingTableError(error)) {
      console.error("Error reading flashcards, falling back to LocalStorage:", error);
    }
    return readLocal(userId);
  }

  const remote = (data ?? []) as Flashcard[];
  const local = readLocal(userId);
  if (local.length === 0) return remote;

  const remoteTerms = new Set(remote.map((c) => c.term));
  const stranded = local.filter((c) => !remoteTerms.has(c.term));
  if (stranded.length === 0) {
    // Everything local is now server-side; drop the shadow copy so it can't
    // resurrect cards the learner later deletes.
    if (typeof window !== "undefined") window.localStorage.removeItem(localKey(userId));
    return remote;
  }

  // Best-effort re-upload. Deliberately not awaited through saveFlashcard -
  // that would recurse back into this function.
  void supabase
    .from("user_flashcards")
    .upsert(
      stranded.map((c) => ({
        user_id: userId,
        term: c.term,
        definition: c.definition,
        interval: c.interval,
        ease_factor: c.ease_factor,
        repetitions: c.repetitions,
        next_review_at: c.next_review_at,
      })),
      { onConflict: "user_id,term" }
    )
    .then(({ error: syncError }) => {
      if (!syncError && typeof window !== "undefined") {
        window.localStorage.removeItem(localKey(userId));
      }
    });

  // Returned immediately either way, so the learner sees their saved terms on
  // this render rather than after a successful round trip.
  return [...remote, ...stranded];
}

// Add or update a flashcard
export async function saveFlashcard(userId: string, card: Flashcard): Promise<boolean> {
  const supabase = createClient();
  // Without an explicit onConflict target, PostgREST's upsert defaults to
  // the table's PRIMARY KEY (id) - but new/updated cards from this app
  // never carry an id, so every call behaved as a plain INSERT and then hit
  // the user_flashcards_unique(user_id, term) constraint on the second save
  // of any given card, failing with a 23505 violation. That's the exact
  // review flow this whole feature exists for (SM2 interval/next_review_at
  // update after every review) - it silently failed past the very first
  // review of each card, with the caught error just logged and a generic
  // "Không thể lưu trạng thái ôn tập" toast, so the card kept coming back up
  // as due immediately instead of following its computed interval.
  const { error } = await supabase
    .from("user_flashcards")
    .upsert(
      {
        user_id: userId,
        term: card.term,
        definition: card.definition,
        interval: card.interval,
        ease_factor: card.ease_factor,
        repetitions: card.repetitions,
        next_review_at: card.next_review_at,
      },
      { onConflict: "user_id,term" }
    );

  if (error) {
    // Fallback to LocalStorage for ANY error (network, auth, missing table, etc.)
    if (typeof window !== "undefined") {
      try {
        const list = await getFlashcards(userId);
        const idx = list.findIndex((c) => c.term === card.term);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...card };
        } else {
          list.push(card);
        }
        window.localStorage.setItem(`flashcards_${userId}`, JSON.stringify(list));
        return true;
      } catch (localError) {
        console.error("Error saving flashcard to LocalStorage:", localError);
      }
    }
    console.error("Error saving flashcard to Supabase:", error);
    return false;
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("thtcdn:flashcards-updated"));
  }
  return true;
}

export interface BulkImportResult {
  added: number;
  skipped: number; // terms that already exist for this user - their review progress is left untouched, not overwritten
}

/** Bulk import: one insert call for the whole batch instead of N round
 *  trips (what a naive loop calling saveFlashcard per line would do).
 *  Deliberately INSERT-only, never upsert: a term that already exists for
 *  this user is skipped rather than overwritten, so re-pasting a list that
 *  happens to include a card you've already been reviewing can't silently
 *  wipe its accumulated SM2 interval/repetitions back to a fresh card. */
/** `alsoKnownAs` là tên của cùng thẻ đó ở ngôn ngữ KHÁC.
 *
 *  Album thẻ có bản dịch (lib/flashcard-albums-i18n), nên cùng một thẻ đến đây
 *  với tên "Tài sản (Assets)" hay "Assets" tuỳ ngôn ngữ người học đang dùng. Chỉ
 *  so `term` thì người đã nhập album lúc dùng tiếng Việt, sang tiếng Anh nhập
 *  lại, sẽ nhận một bộ thẻ trùng nội dung hoàn toàn với bộ họ đang có - đúng
 *  điều chú thích ở FlashcardAlbumsGallery.tsx hứa không bao giờ xảy ra.
 *
 *  Danh sách này KHÔNG được lưu. Nó chỉ dùng để quyết định bỏ qua hay không, nên
 *  không có cột nào phải thêm và không có dữ liệu cũ nào phải sửa. */
export async function saveFlashcardsBulk(
  userId: string,
  cards: { term: string; definition: string; alsoKnownAs?: string[] }[]
): Promise<BulkImportResult> {
  if (cards.length === 0) return { added: 0, skipped: 0 };
  const supabase = createClient();

  const dedup = new Map<string, { term: string; definition: string; alsoKnownAs?: string[] }>();
  for (const c of cards) dedup.set(c.term, c);

  const existing = await getFlashcards(userId);
  const existingTerms = new Set(existing.map((c) => c.term));
  const isNew = (c: { term: string; alsoKnownAs?: string[] }) =>
    !existingTerms.has(c.term) && !(c.alsoKnownAs ?? []).some((alias) => existingTerms.has(alias));

  const toInsert = Array.from(dedup.values()).filter(isNew);
  const skipped = dedup.size - toInsert.length;
  if (toInsert.length === 0) return { added: 0, skipped };

  // Chỉ `term` và `definition` được ghi. `alsoKnownAs` là dữ liệu tạm để quyết
  // định bỏ qua, không phải một cột.
  const rows = toInsert.map((c) => ({
    user_id: userId,
    term: c.term,
    definition: c.definition,
    interval: 1,
    ease_factor: 2.5,
    repetitions: 0,
    next_review_at: new Date().toISOString(),
  }));

  const { error, count } = await supabase.from("user_flashcards").insert(rows, { count: "exact" });

  if (error) {
    // Any error, not just a missing table - see the note on getFlashcards.
    // A bulk import that lands only in localStorage is fine as long as the
    // read path looks there too, which it now does.
    if (typeof window !== "undefined") {
      try {
        const list = await getFlashcards(userId);
        const localTerms = new Set(list.map((c) => c.term));
        // Cùng phép kiểm với nhánh Supabase ở trên, kể cả `alsoKnownAs`. Hai
        // nhánh lệch luật nghĩa là chống trùng chỉ hoạt động khi có mạng.
        const toInsertLocal = Array.from(dedup.values()).filter(
          (c) =>
            !localTerms.has(c.term) &&
            !(c.alsoKnownAs ?? []).some((alias) => localTerms.has(alias))
        );
        const skippedLocal = dedup.size - toInsertLocal.length;

        if (toInsertLocal.length === 0) return { added: 0, skipped: skippedLocal };

        const newCards = toInsertLocal.map((c) => ({
          term: c.term,
          definition: c.definition,
          interval: 1,
          ease_factor: 2.5,
          repetitions: 0,
          next_review_at: new Date().toISOString(),
        }));

        const updatedList = [...list, ...newCards];
        window.localStorage.setItem(localKey(userId), JSON.stringify(updatedList));
        return { added: newCards.length, skipped: skippedLocal };
      } catch (e) {
        console.error("Local storage fallback error in bulk save:", e);
      }
    }
    console.error("Error bulk-saving flashcards:", error);
    return { added: 0, skipped };
  }
  return { added: count ?? rows.length, skipped };
}

// Remove a flashcard
export async function deleteFlashcard(userId: string, term: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_flashcards")
    .delete()
    .eq("user_id", userId)
    .eq("term", term);

  if (error) {
    // Any error, for the same reason as the read/write paths above. Without
    // this, a delete that failed on the server left the card in localStorage,
    // and getFlashcards' merge would faithfully resurrect it on next load.
    if (typeof window !== "undefined") {
      const list = await getFlashcards(userId);
      const filtered = list.filter((c) => c.term !== term);
      window.localStorage.setItem(localKey(userId), JSON.stringify(filtered));
      return true;
    }
    console.error("Error deleting flashcard:", error);
    return false;
  }

  return true;
}

// Initial finance glossary list to bootstrap flashcards for new users
export const DEFAULT_FINANCIAL_GLOSSARY: { term: string; definition: string }[] = [
  { term: "Thanh khoản (Liquidity)", definition: "Khả năng chuyển đổi một tài sản thành tiền mặt nhanh chóng mà không làm suy giảm giá trị của nó." },
  { term: "Lãi kép (Compound Interest)", definition: "Phần lãi tính trên số tiền gốc ban đầu cộng với số tiền lãi tích lũy qua các kỳ trước đó." },
  { term: "Đòn bẩy tài chính (Leverage)", definition: "Việc sử dụng vốn đi vay (nợ) để gia tăng khả năng sinh lời của một khoản đầu tư." },
  { term: "WACC (Weighted Average Cost of Capital)", definition: "Chi phí sử dụng vốn bình quân gia quyền, phản ánh mức sinh lời tối thiểu cần đạt để đáp ứng mong đợi của chủ nợ và cổ đông." },
  { term: "NPV (Net Present Value)", definition: "Giá trị hiện tại ròng, là tổng dòng tiền thu hồi trong tương lai chiết khấu về hiện tại trừ đi chi phí đầu tư ban đầu." },
  { term: "Cổ tức (Dividend)", definition: "Một phần lợi nhuận sau thuế được doanh nghiệp chia cho các cổ đông bằng tiền mặt hoặc cổ phiếu." },
  { term: "Hàng tồn kho (Inventory)", definition: "Tài sản ngắn hạn của công ty bao gồm nguyên vật liệu, bán thành phẩm và thành phẩm đang chờ tiêu thụ." },
  { term: "Bản cân đối kế toán (Balance Sheet)", definition: "Báo cáo tài chính phản ánh tổng thể tài sản, nợ phải trả và vốn chủ sở hữu tại một thời điểm nhất định." },
];
