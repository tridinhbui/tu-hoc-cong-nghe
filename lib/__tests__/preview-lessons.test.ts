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

  it("proxy thật sự hỏi tới nó", () => {
    // Bài kiểm đọc nguồn: proxy.ts import cả NextRequest nên không dựng được
    // trong vitest, mà thứ cần khoá ở đây chỉ là "hàng rào có gọi hàm này
    // không". Gỡ lời gọi đi thì bốn bài lại biến mất sau tường đăng nhập, và
    // không có gì khác báo động.
    const source = readFileSync(path.join(repoRoot, "proxy.ts"), "utf8");
    expect(source).toContain("isPreviewLessonPath");
  });
});

describe("bài xem thử phải học được thật", () => {
  it("mỗi slug đều có dữ liệu bài học", () => {
    for (const slug of PREVIEW_LESSON_SLUGS) {
      const file = path.join(repoRoot, "lib", "lessons-data", `${slug}.json`);
      expect(existsSync(file), `thiếu lib/lessons-data/${slug}.json`).toBe(true);
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
