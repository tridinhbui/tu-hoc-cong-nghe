import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { WEARABLE_IN_3D, ITEM_DESCRIPTIONS } from "@/lib/rpg-items";

/** Nội dung viết tay trong các căn nhà dân sự.
 *
 *  Bài này tồn tại vì một lỗi cụ thể: bảo tàng ra đời với bốn hiện vật mà tôi
 *  tự nghĩ slug (khung-hoang-1929, khung-hoang-2008...), và ba trong bốn không
 *  tồn tại - cả gian trưng bày dẫn tới trang trống, trong khi mọi test khác
 *  vẫn xanh và cảnh 3D vẫn dựng bình thường. Một danh sách viết tay trỏ sang
 *  dữ liệu khác thì phải có người đối chiếu, và người đó không nên là người
 *  vừa viết nó. */

function lessonSlugs(): Set<string> {
  const raw = JSON.parse(readFileSync("lib/lessons-data/_index.json", "utf8"));
  const list: Array<{ slug: string }> = Array.isArray(raw) ? raw : raw.lessons ?? Object.values(raw)[0];
  return new Set(list.map((l) => l.slug));
}

/** Đọc mảng EXHIBITS ra khỏi mã nguồn thay vì export nó.
 *
 *  CivicPanel là client component kéo theo cả supabase và three; import nó vào
 *  test là kéo cả cây đó vào một bài chỉ cần bốn chuỗi. */
function exhibitSlugs(): string[] {
  const src = readFileSync("components/career-district/CivicPanel.tsx", "utf8");
  const block = src.slice(src.indexOf("const EXHIBITS"), src.indexOf("function Museum("));
  return [...block.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

describe("bảo tàng", () => {
  it("mọi hiện vật trỏ tới một bài học có thật", () => {
    const slugs = lessonSlugs();
    const exhibits = exhibitSlugs();
    expect(exhibits.length, "không đọc được danh sách hiện vật").toBeGreaterThan(0);
    const missing = exhibits.filter((s) => !slugs.has(s));
    expect(missing, "hiện vật dẫn tới trang trống").toEqual([]);
  });
});

describe("cửa hàng", () => {
  it("mọi món bày bán đều có hình 3D để mặc", () => {
    // Cửa hàng lọc bằng WEARABLE_IN_3D; bài này giữ cho danh sách ấy không
    // chứa khoá nào mà bảng vật phẩm không biết - lúc đó cửa hàng bày một nút
    // trống.
    const unknown = [...WEARABLE_IN_3D].filter((key) => !(key in ITEM_DESCRIPTIONS));
    expect(unknown, "khoá không có trong ITEM_DESCRIPTIONS").toEqual([]);
  });

  it("không có món nào vẽ được mà quên bày", () => {
    // Chiều ngược lại: một món có hình 3D nhưng không nằm trong WEARABLE_IN_3D
    // sẽ mặc được mà không mua thử được ở gương.
    const drawn = ["acc_crown", "acc_glasses", "title_vip_diamond", "pet_bull", "pet_bear"];
    for (const key of drawn) expect(WEARABLE_IN_3D.has(key), key).toBe(true);
  });
});
