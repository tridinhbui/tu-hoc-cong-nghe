import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Mọi đường dẫn và mọi slug mà thế giới 3D trỏ tới đều phải tồn tại.
 *
 *  Bài này ra đời sau một lần soát tay: bảo tàng ship với bốn hiện vật, ba
 *  trong đó trỏ tới bài học không tồn tại. Không có gì báo - cảnh 3D vẫn dựng,
 *  `tsc` vẫn sạch, mọi test khác vẫn xanh, và người học bấm vào thì ra trang
 *  trống. Một chuỗi ký tự trỏ sang dữ liệu ở nơi khác là thứ trình biên dịch
 *  không kiểm được, nên nó phải có người kiểm.
 *
 *  Cách kiểm là đọc MÃ NGUỒN chứ không import component: mấy file kia là client
 *  component kéo theo three.js và supabase, và một bài kiểm chuỗi không đáng
 *  kéo cả cây đó vào. Đổi lại, regex phải rộng - nó bắt cả href trong chú thích
 *  - nhưng thà kiểm thừa một dòng chú thích còn hơn bỏ sót một cánh cửa. */

const WORLD_DIRS = [
  "components/lobby",
  "components/study-room",
  "components/world-controls",
];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.tsx?$/.test(name)) out.push(full);
  }
  return out;
}

function worldSource(): string {
  return WORLD_DIRS.flatMap(walk)
    .concat(["lib/rpg-buildings.ts", "components/lobby/stations.ts"])
    .map((f) => readFileSync(f, "utf8"))
    .join("\n");
}

/** Mọi route của ứng dụng, suy từ cây thư mục app router. */
function appRoutes(): Set<string> {
  const routes = new Set<string>();
  const walkApp = (dir: string, prefix: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (!statSync(full).isDirectory()) {
        if (name === "page.tsx") routes.add(prefix || "/");
        continue;
      }
      // (app) là route group - nó không xuất hiện trong URL.
      const segment = name.startsWith("(") && name.endsWith(")") ? "" : `/${name}`;
      walkApp(full, prefix + segment);
    }
  };
  walkApp("app", "");
  return routes;
}

function lessonSlugs(): Set<string> {
  const raw = JSON.parse(readFileSync("lib/lessons-data/_index.json", "utf8"));
  const list: Array<{ slug: string }> = Array.isArray(raw) ? raw : raw.lessons ?? Object.values(raw)[0];
  return new Set(list.map((l) => l.slug));
}

describe("đường dẫn trong thế giới 3D", () => {
  it("mọi href trỏ tới một route có thật", () => {
    const src = worldSource();
    const routes = appRoutes();
    // Bỏ phần query và phần nội suy: /game?building=${id} kiểm được ở /game.
    const hrefs = [...src.matchAll(/href[:=]\s*[`"]([^`"$]+)/g)]
      .map((m) => m[1].split("?")[0].replace(/\/$/, ""))
      .filter((h) => h.startsWith("/"));
    // Ngưỡng này là cái chốt chống regex hỏng, không phải mục tiêu: nó chỉ cần
    // đủ lớn để một regex trả về mảng rỗng bị bắt. Hạ từ 10 xuống 5 khi năm
    // trạm tài chính (CFA, FRM, phỏng vấn, sự nghiệp, ôn câu sai) và cổng khu
    // phố nghề bị gỡ - thế giới 3D còn 7 cánh cửa, nên mốc cũ sẽ đỏ mãi mãi
    // dù không có gì hỏng.
    expect(hrefs.length, "không đọc được href nào - regex hỏng?").toBeGreaterThan(5);

    const broken = [...new Set(hrefs)].filter((h) => {
      if (routes.has(h)) return false;
      // Route động: /bai-hoc/<slug> khớp với app/(app)/bai-hoc/[slug]
      const parts = h.split("/").filter(Boolean);
      return !routes.has(`/${parts[0]}/[slug]`) && !routes.has(`/${parts[0]}/[id]`);
    });
    expect(broken, "cánh cửa dẫn tới route không tồn tại").toEqual([]);
  });

  it("mọi slug bài học được nhắc tới đều có bài", () => {
    const src = worldSource();
    const slugs = lessonSlugs();
    // Chỉ bắt slug đứng trong một trường `slug:` - đó là dạng duy nhất thế
    // giới 3D dùng để trỏ tới bài học.
    const referenced = [...src.matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
    const missing = [...new Set(referenced)].filter((s) => !slugs.has(s));
    expect(missing, "trỏ tới bài học không tồn tại").toEqual([]);
  });
});

describe("RPC được gọi", () => {
  it("mọi RPC trong ứng dụng đều có định nghĩa trong migrations", () => {
    // Danh sách này giờ RỖNG, và nó rỗng vì phép đo bên dưới sai chứ không
    // phải vì có ai đi dọn.
    //
    // Nó từng chứa `get_dashboard_summary` và `get_lesson_state` kèm chú thích
    // rằng hai hàm ấy "được tạo ngoài thư mục migrations". Không đúng: cả hai
    // nằm trong supabase/migrations/20260804_dashboard_optimized_rpcs.sql, ngay
    // trong repo. Thứ bỏ sót chúng là biểu thức dưới đây - nó đòi tên phải có
    // tiền tố `public.`, mà không tệp migration nào trong repo viết như vậy.
    // Nên hai cái tên bị xếp vào ngoại lệ để bộ kiểm xanh trở lại, và cổng này
    // từ đó không còn gác được gì: mọi RPC mới đều sẽ trượt hệt như thế.
    //
    // Phát hiện ra vì `get_nav_state` mới thêm cũng trượt, và lần này thì lý do
    // "tạo ngoài migrations" hiển nhiên là sai - tệp migration vừa được viết ra.
    //
    // Danh sách chỉ được ngắn đi: thêm tên vào đây nghĩa là chấp nhận một hàm
    // không ai đọc được định nghĩa trong repo.
    const CREATED_OUTSIDE_MIGRATIONS = new Set<string>([]);

    const sources = [...walk("lib"), ...walk("components"), ...walk("app")]
      .map((f) => readFileSync(f, "utf8"))
      .join("\n");
    const called = new Set(
      [...sources.matchAll(/\.rpc\(\s*"([a-z_]+)"/g)].map((m) => m[1])
    );

    const migrations = readdirSync("supabase/migrations")
      .filter((f) => f.endsWith(".sql"))
      .map((f) => readFileSync(join("supabase/migrations", f), "utf8"))
      .join("\n");
    // `public.` là TUỲ CHỌN. Không tệp migration nào trong repo viết tiền tố
    // đó - chúng dựa vào `search_path` mặc định - nên đòi nó là đòi một quy
    // ước không tồn tại, và kết quả là bộ kiểm không thấy hàm nào cả.
    const defined = new Set(
      [...migrations.matchAll(/create\s+(?:or\s+replace\s+)?function\s+(?:public\.)?([a-z_]+)/gi)].map(
        (m) => m[1].toLowerCase()
      )
    );

    const undefinedCalls = [...called].filter(
      (fn) => !defined.has(fn) && !CREATED_OUTSIDE_MIGRATIONS.has(fn)
    );
    expect(undefinedCalls, "gọi một hàm không có định nghĩa trong repo").toEqual([]);
  });

  it("mọi bảng thế giới 3D ghi vào đều có migration tạo nó", () => {
    // focus_sessions là bài học cụ thể: nó được viết, được gọi từ ba nơi, và
    // migration chưa từng chạy - nên tính năng nằm im mà không ai biết. Bài
    // này ít nhất bắt được trường hợp còn tệ hơn: bảng không có cả migration.
    const migrations = readdirSync("supabase/migrations")
      .filter((f) => f.endsWith(".sql"))
      .map((f) => readFileSync(join("supabase/migrations", f), "utf8"))
      .join("\n");
    for (const table of ["focus_sessions", "user_equipments", "study_room_pomodoro"]) {
      expect(
        new RegExp(`create table if not exists public\\.${table}\\b`, "i").test(migrations),
        `${table}: không có migration nào tạo bảng này`
      ).toBe(true);
    }
  });
});
