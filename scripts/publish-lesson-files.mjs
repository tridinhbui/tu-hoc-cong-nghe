// Chép lib/lessons-data và lib/lessons-i18n vào public/lesson-files/ để OpenNext
// đưa chúng vào static assets của Cloudflare. Xem lib/lesson-files.ts: dữ liệu
// bài học không được nằm trong gói worker (giới hạn 64 MiB).
//
// Chạy sau generate-lesson-data.mjs và build-translation-index.mjs (cả hai nằm
// trong prebuild). Thư mục đích nằm trong .gitignore và được xoá sạch mỗi lượt,
// nên một bài đã bị xoá không để lại tệp mồ côi.
import { cpSync, rmSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "lesson-files");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const dir of ["lessons-data", "lessons-i18n"]) {
  const src = path.join(root, "lib", dir);
  if (!existsSync(src)) throw new Error(`Thiếu lib/${dir} - chạy generate-lesson-data.mjs trước.`);
  cpSync(src, path.join(out, dir), { recursive: true });
}
console.log("Đã chép dữ liệu bài học vào public/lesson-files/");
