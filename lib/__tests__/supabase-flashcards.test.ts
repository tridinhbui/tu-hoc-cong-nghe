import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

// The bug this file guards against, as reported by a learner:
//   "flash card lưu từ mà k sài đc" / "làm sao để ôn tập những từ đã lưu"
// Saving a term reported success, but the review list came back empty.
//
// saveFlashcard fell back to localStorage on ANY error and returned true, so
// the UI showed "saved". getFlashcards only fell back on isMissingTableError,
// so a permission error (42501 - what user_flashcards returned before
// 20260730_missing_grants_flashcards_recalls.sql) read back []. The card was
// saved somewhere the app never looked.

const PERMISSION_DENIED = { code: "42501", message: "permission denied for table user_flashcards" };

// vitest runs with environment: "node" and jsdom isn't a dependency, so the
// browser globals the fallback path needs are stubbed here rather than
// pulling in a DOM just for four assertions.
class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string) {
    return this.store.has(k) ? this.store.get(k)! : null;
  }
  setItem(k: string, v: string) {
    this.store.set(k, String(v));
  }
  removeItem(k: string) {
    this.store.delete(k);
  }
  clear() {
    this.store.clear();
  }
}

const localStorage = new MemoryStorage();
(globalThis as Record<string, unknown>).localStorage = localStorage;
(globalThis as Record<string, unknown>).window = { localStorage };

let selectError: unknown = null;
let selectRows: unknown[] = [];
const upsertSpy = vi.fn();

vi.mock("@/lib/supabase", () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => Promise.resolve({ data: selectRows, error: selectError }),
      }),
      upsert: (rows: unknown) => {
        upsertSpy(rows);
        // Thenable so `void supabase...upsert(...).then(...)` works.
        return Promise.resolve({ error: null });
      },
    }),
  }),
}));

vi.mock("./supabase", () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => Promise.resolve({ data: selectRows, error: selectError }),
      }),
      upsert: (rows: unknown) => {
        upsertSpy(rows);
        return Promise.resolve({ error: null });
      },
    }),
  }),
}));

const USER = "user-1";
const KEY = `flashcards_${USER}`;

const card = (term: string) => ({
  term,
  definition: `def ${term}`,
  interval: 1,
  ease_factor: 2.5,
  repetitions: 0,
  next_review_at: new Date("2026-07-29").toISOString(),
});

beforeEach(() => {
  selectError = null;
  selectRows = [];
  upsertSpy.mockClear();
  localStorage.clear();
});

afterEach(() => {
  vi.resetModules();
});

async function getFlashcards(userId: string) {
  const mod = await import("@/lib/supabase-flashcards");
  return mod.getFlashcards(userId);
}

describe("getFlashcards fallback symmetry", () => {
  it("returns locally-saved cards when the table read is permission-denied", async () => {
    // This is the reported failure: the card IS saved, just not on the server.
    localStorage.setItem(KEY, JSON.stringify([card("Thanh khoản")]));
    selectError = PERMISSION_DENIED;

    const result = await getFlashcards(USER);

    expect(result.map((c) => c.term)).toEqual(["Thanh khoản"]);
  });

  it("still falls back when the table is missing entirely", async () => {
    localStorage.setItem(KEY, JSON.stringify([card("Đòn bẩy")]));
    selectError = { code: "42P01", message: "relation does not exist" };

    expect((await getFlashcards(USER)).map((c) => c.term)).toEqual(["Đòn bẩy"]);
  });

  it("returns an empty list, not a crash, when there is nothing anywhere", async () => {
    selectError = PERMISSION_DENIED;
    expect(await getFlashcards(USER)).toEqual([]);
  });

  it("survives corrupted localStorage instead of throwing", async () => {
    localStorage.setItem(KEY, "{not json");
    selectError = PERMISSION_DENIED;
    expect(await getFlashcards(USER)).toEqual([]);
  });
});

describe("recovering cards stranded during an outage", () => {
  it("merges local-only cards into the server result", async () => {
    selectRows = [card("Có sẵn trên server")];
    localStorage.setItem(KEY, JSON.stringify([card("Lưu lúc mất quyền")]));

    const result = await getFlashcards(USER);

    expect(result.map((c) => c.term).sort()).toEqual(
      ["Có sẵn trên server", "Lưu lúc mất quyền"].sort()
    );
  });

  it("pushes the stranded cards back to the server", async () => {
    selectRows = [];
    localStorage.setItem(KEY, JSON.stringify([card("Lưu lúc mất quyền")]));

    await getFlashcards(USER);

    expect(upsertSpy).toHaveBeenCalledTimes(1);
    const rows = upsertSpy.mock.calls[0][0] as { term: string; user_id: string }[];
    expect(rows).toHaveLength(1);
    expect(rows[0].term).toBe("Lưu lúc mất quyền");
    expect(rows[0].user_id).toBe(USER);
  });

  it("does not re-upload cards the server already has", async () => {
    const same = card("Trùng nhau");
    selectRows = [same];
    localStorage.setItem(KEY, JSON.stringify([same]));

    await getFlashcards(USER);

    expect(upsertSpy).not.toHaveBeenCalled();
    // Shadow copy dropped, so a later delete can't be undone by the merge.
    expect(localStorage.getItem(KEY)).toBeNull();
  });
});
