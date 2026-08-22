import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PREVIEW_LESSON_SLUGS, isPreviewLessonPath, isPreviewLessonSlug } from "@/lib/preview-lessons";
import { TRACKS } from "@/lib/tracks";

/** Bài học xem thử cho khách chưa đăng nhập.
 *
 *  Tính năng này là một chuỗi bốn mắt xích, và đứt mắt nào cũng cho ra cùng
 *  một triệu chứng câm lặng: khách bấm "Xem thử bài học" rồi rơi vào trang
 *  đăng nhập, đúng cú cụt mà nó sinh ra để chữa. Bốn mắt xích:
 *
 *    1. slug có trong PREVIEW_LESSON_SLUGS
 *    2. proxy hỏi isPreviewLessonPath trước khi đá về /login
 *    3. bài đó thật sự tồn tại trong lib/lessons-data
 *    4. bài đó KHÔNG có trang viết tay riêng - trang viết tay không đi qua
 *       LessonPageLayout, nên nó không có nhánh xử lý khách nào cả
 *
 *  Không mắt nào trong bốn cái được tsc kiểm: chúng là chuỗi ký tự trỏ sang
 *  dữ liệu và sang thư mục ở nơi khác. Cùng lý do với lib/__tests__/world-links.test.ts. */

const repoRoot = path.resolve(__dirname, "..", "..");

describe("đường dẫn bài xem thử", () => {
  it("nhận đúng bốn slug, và chỉ chúng", () => {
    for (const slug of PREVIEW_LESSON_SLUGS) {
      expect(isPreviewLessonPath(`/bai-hoc/${slug}`), slug).toBe(true);
    }
    expect(isPreviewLessonPath("/bai-hoc/khau-hao")).toBe(false);
    expect(isPreviewLessonPath("/bai-hoc")).toBe(false);
    expect(isPreviewLessonPath("/dashboard")).toBe(false);
  });

  it("không mở toang thư mục con hay đuôi lạ", () => {
    const slug = PREVIEW_LESSON_SLUGS[0];
    // Nếu chỗ này thành startsWith lỏng tay thì mọi thứ nằm dưới bài xem thử
    // cũng ra công khai theo.
    expect(isPreviewLessonPath(`/bai-hoc/${slug}/`)).toBe(false);
    expect(isPreviewLessonPath(`/bai-hoc/${slug}/edit`)).toBe(false);
    expect(isPreviewLessonPath(`/bai-hoc/${slug}x`)).toBe(false);
    expect(isPreviewLessonSlug(`${slug}/`)).toBe(false);
  });

  it("hàng rào thật sự hỏi tới nó", () => {
    // Bài kiểm đọc NGUỒN chứ không gọi hàm: thứ cần khoá ở đây là "hàng rào có
    // hỏi tới danh sách này không". Gỡ lời gọi đi thì bốn bài xem thử lặng lẽ
    // biến mất sau tường đăng nhập, và không có gì khác báo động - một bài test
    // gọi thẳng isPreviewLessonSlug() vẫn xanh khi không ai gọi nó.
    //
    // Hàng rào từng là `proxy.ts`, dùng isPreviewLessonPath trên cả đường dẫn.
    // Proxy đã đi vì Workers không chạy được Node middleware; cổng giờ nằm ở
    // layout của route bài học và nhận sẵn `params.slug`, nên nó hỏi bằng
    // isPreviewLessonSlug - không còn đường dẫn để mà cắt.
    const gate = path.join(repoRoot, "app", "bai-hoc", "[slug]", "layout.tsx");
    const source = readFileSync(gate, "utf8");
    expect(source).toContain("isPreviewLessonSlug");
    // Và phải là điều kiện phủ định: gọi hàm rồi vẫn gác hết thì bốn bài kia
    // cũng không vào được.
    expect(source).toMatch(/if\s*\(!isPreviewLessonSlug\(/);
  });
});

describe("bài xem thử phải học được thật", () => {
  // lib/lessons-data/ do scripts/generate-lesson-data.mjs sinh ra và nằm trong
  // .gitignore, còn CI chạy `npm test` TRƯỚC `npm run audit:lessons` - nên trên
  // một bản checkout sạch thư mục đó chưa tồn tại. Bỏ qua thay vì fail: một
  // cổng đỏ vì thiếu tệp sinh ra tự động chỉ dạy người ta bỏ qua màu đỏ. Ở máy
  // dev (đã chạy `npm run dev`) thì nó chạy thật.
  const dataDir = path.join(repoRoot, "lib", "lessons-data");
  it.skipIf(!existsSync(dataDir))("mỗi slug đều có dữ liệu bài học", () => {
    for (const slug of PREVIEW_LESSON_SLUGS) {
      expect(
        existsSync(path.join(dataDir, `${slug}.json`)),
        `thiếu lib/lessons-data/${slug}.json - slug này không dựng thành bài học nào`
      ).toBe(true);
    }
  });

  it("không slug nào có trang viết tay riêng", () => {
    for (const slug of PREVIEW_LESSON_SLUGS) {
      const dir = path.join(repoRoot, "app", "bai-hoc", slug);
      expect(
        existsSync(dir),
        `app/bai-hoc/${slug}/ tồn tại - Next sẽ phục vụ trang viết tay đó thay cho ` +
          `route dữ liệu, và trang viết tay không đi qua LessonPageLayout nên khách ` +
          `sẽ không thấy thẻ mời đăng ký ở cuối bài`
      ).toBe(false);
    }
  });

  it("giữ đúng hai slug mà giao diện đã hứa từ trước", () => {
    // Trang chủ ("Xem thử bài học") và panel trái của trang đăng nhập đều dẫn
    // tới previewSlug của track. Đổi một bên mà quên bên kia thì cái nút lại
    // trỏ vào một bài không công khai.
    expect(PREVIEW_LESSON_SLUGS).toContain(TRACKS.personal.previewSlug);
    expect(PREVIEW_LESSON_SLUGS).toContain(TRACKS.professional.previewSlug);
  });

  it("đủ ít để vẫn còn lý do tạo tài khoản", () => {
    expect(PREVIEW_LESSON_SLUGS.length).toBeGreaterThanOrEqual(3);
    expect(PREVIEW_LESSON_SLUGS.length).toBeLessThanOrEqual(5);
  });
});
