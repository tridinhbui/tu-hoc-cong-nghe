import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { lessons } from "../lessons";

/**
 * `track` là tuỳ chọn trong kiểu `Lesson`, và điều đó đã sinh ra một lỗi sống
 * nhiều tháng mà không ai thấy.
 *
 * CHUYỆN ĐÃ XẢY RA. 37 bài không khai `track`. Hai đường mã điền giá trị mặc
 * định khác nhau cho đúng những bài ấy:
 *
 *   lib/lesson-stages.ts            → `lesson.track || "personal"`      (giao diện)
 *   app/api/admin/sync-lessons      → `lesson.track || "professional"`  (ghi vào DB)
 *
 * Nên cùng một bài hiện ra là `personal` trên giao diện và được lưu là
 * `professional` trong bảng `lessons`. Không có gì báo lỗi: cả hai đường đều
 * chạy đúng, chúng chỉ bất đồng. Đối chiếu với `lib/track-stages.ts` thì cả 37
 * bài đều thuộc TRACK_PROFESSIONAL, tức là giao diện sai cả 37.
 *
 * VÌ SAO GÁC Ở ĐÂY CHỨ KHÔNG PHẢI ĐỔI KIỂU THÀNH BẮT BUỘC. Đổi `track?:` thành
 * `track:` bắt được bài mới, nhưng nó là một thay đổi kiểu chạm vào mọi chỗ
 * dựng `LessonMeta` từng phần. Bộ kiểm này bắt đúng cùng một lớp lỗi với chi
 * phí bằng không, và nó nói được LÝ DO - thứ mà một dấu hai chấm không nói được.
 */
describe("mọi bài học đều khai track tường minh", () => {
  it("không bài nào để trống track", () => {
    const missing = lessons.filter((l) => !l.track).map((l) => `${l.id} ${l.slug}`);
    expect(missing, "bài thiếu track sẽ nhận hai giá trị mặc định khác nhau").toEqual([]);
  });

  it("không còn đường mã nào tự điền track mặc định", () => {
    // Mặc định là cách lỗi trên tái sinh: thêm một bài quên `track` thì bộ kiểm
    // trên đỏ, nhưng nếu ai đó "sửa" bằng cách thêm một mặc định mới ở chỗ thứ
    // ba thì lỗi quay lại y nguyên. Danh sách dưới đây phải rỗng.
    const roots = ["lib", "app", "scripts"];
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.name === "node_modules" || e.name.startsWith(".") || e.name === "__tests__") continue;
        const p = `${dir}/${e.name}`;
        if (e.isDirectory()) walk(p);
        else if (/\.(ts|tsx|mjs)$/.test(e.name) && !p.includes("lessons-data")) files.push(p);
      }
    };
    for (const r of roots) walk(r);

    const offenders: string[] = [];
    for (const f of files) {
      const src = readFileSync(f, "utf8");
      src.split("\n").forEach((line, i) => {
        // `lesson.track || "..."`, `l.track ?? "..."`, `.track || "..."`
        if (/\.track\s*(\|\||\?\?)\s*["']/.test(line)) offenders.push(`${f}:${i + 1}`);
      });
    }
    expect(offenders, "dùng track thật, đừng điền mặc định").toEqual([]);
  });
});
