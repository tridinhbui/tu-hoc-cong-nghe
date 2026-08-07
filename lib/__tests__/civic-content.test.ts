import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { WEARABLE_IN_3D, ITEM_DESCRIPTIONS } from "@/lib/rpg-items";
import { civicRoomsOf } from "@/components/career-district/district-space";
import { vi as viDict } from "@/lib/i18n/dictionaries/vi";

const CIVIC_ROOMS = civicRoomsOf(viDict);

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

/** Mọi phòng dân sự đều có nội thất VÀ có tấm HUD.
 *
 *  Lỗ này có thật và tôi vừa đi qua nó khi thêm phòng thứ mười: cả INTERIORS
 *  trong CivicScenes.tsx lẫn hai bản đồ tấm thẻ trong CivicPanel.tsx đều khai
 *  là `Partial<Record<string, …>>`. `Partial` nghĩa là thiếu key không phải
 *  lỗi, và `string` nghĩa là gõ sai key cũng không phải lỗi. Thêm một phòng
 *  rồi quên nối là một căn phòng trống trơn mà tsc vẫn xanh - đúng kiểu hỏng
 *  im lặng mà cả đêm nay đi dọn ở chỗ khác.
 *
 *  Đọc bằng regex thay vì import: CivicScenes và CivicPanel kéo theo three và
 *  supabase, còn bài này chỉ cần danh sách key. */
function keysOfMap(file: string, marker: string): string[] {
  const src = readFileSync(file, "utf8");
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`không tìm thấy ${marker} trong ${file}`);
  const block = src.slice(start, src.indexOf("};", start));
  return [...block.matchAll(/^\s*"([a-z0-9-]+)":/gm)].map((m) => m[1]);
}

describe("phòng dân sự nối đủ", () => {
  const civicIds = CIVIC_ROOMS.map((c) => c.id as string);

  it("phòng nào cũng có nội thất 3D", () => {
    const interiors = keysOfMap("components/career-district/CivicScenes.tsx", "const INTERIORS");
    for (const id of civicIds) {
      expect(interiors, `${id} không có nội thất - vào phòng sẽ thấy bốn bức tường trống`).toContain(id);
    }
  });

  it("phòng nào cũng có tấm thẻ mở ra khi đứng lên bục", () => {
    const teaching = keysOfMap("components/career-district/CivicPanel.tsx", "const TEACHING_PANELS");
    const panels = keysOfMap("components/career-district/CivicPanel.tsx", "const PANELS");
    for (const id of civicIds) {
      expect(
        [...teaching, ...panels],
        `${id} không có tấm thẻ - đứng lên bục sẽ không có gì xảy ra`
      ).toContain(id);
    }
  });

  it("không phòng nào nối vào cả hai bản đồ tấm thẻ", () => {
    // Nối hai chỗ thì chỗ nào thắng là do thứ tự tra cứu, không do chủ ý.
    const teaching = keysOfMap("components/career-district/CivicPanel.tsx", "const TEACHING_PANELS");
    const panels = keysOfMap("components/career-district/CivicPanel.tsx", "const PANELS");
    expect(teaching.filter((k) => panels.includes(k))).toEqual([]);
  });
});

describe("cờ phòng dạy", () => {
  it("khớp đúng với danh sách tấm thẻ dạy học", () => {
    // Hai chỗ nói cùng một chuyện: `teaching: true` trong CIVIC_ROOMS quyết
    // định phòng nào đứng nhóm "Phòng học" trong bảng vào thẳng phòng, còn
    // TEACHING_PANELS quyết định phòng nào dùng tấm thẻ dạy học. Lệch nhau thì
    // một căn phòng dạy bị xếp xuống nhóm "Nơi khác" và chìm nghỉm - không có
    // gì báo, vì cả hai bên đều là giá trị hợp lệ.
    const flagged = CIVIC_ROOMS.filter((c) => c.teaching).map((c) => c.id as string).sort();
    const panels = keysOfMap("components/career-district/CivicPanel.tsx", "const TEACHING_PANELS").sort();
    expect(flagged).toEqual(panels);
  });

  it("có ít nhất một phòng dạy và ít nhất một phòng không dạy", () => {
    // Cả mười hai cùng một nhóm thì việc chia nhóm không nói được gì.
    expect(CIVIC_ROOMS.some((c) => c.teaching)).toBe(true);
    expect(CIVIC_ROOMS.some((c) => !c.teaching)).toBe(true);
  });
});
