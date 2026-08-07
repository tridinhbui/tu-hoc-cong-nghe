// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import QuietForestScene from "@/components/QuietForestScene";
import { I18nProvider } from "@/lib/i18n/context";
import { signsOf } from "@/lib/quiet-forest-space";
import { vi as viDict } from "@/lib/i18n/dictionaries/vi";

/** Ba tấm biển với người bật giảm chuyển động.
 *
 *  Nhóm này không nhận cảnh 3D nào cả - chủ ý sẵn có, và đúng. Nhưng từ lúc ba
 *  lời nhắn được khắc lên biển TRONG cảnh, quyết định ấy lặng lẽ đổi nghĩa: nó
 *  thôi là "bớt chuyển động" và thành "bớt nội dung", với đúng nhóm cần trang
 *  này nhất.
 *
 *  Kiểm bằng test chứ không bằng ảnh chụp: nhánh này chỉ chạy khi hệ điều hành
 *  bật giảm chuyển động, nên nó là nhánh dễ hỏng mà không ai nhìn thấy nhất
 *  trong cả trang - và cũng là nhánh không mở bằng trình duyệt để xem được. */

// I18nProvider gọi useRouter để đổi ngôn ngữ - không có Router trong jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return { ...actual, useReducedMotion: () => true };
});

// WebGL không chạy trong jsdom. Nhánh đang kiểm KHÔNG dựng cảnh, nhưng
// `dynamic()` vẫn nạp module ở tầng import, nên chặn ở đây cho chắc.
vi.mock("@/components/QuietForestSceneInner", () => ({ default: () => null }));

afterEach(cleanup);

describe("giảm chuyển động", () => {
  const signs = signsOf(viDict);

  it("vẫn đọc được cả ba tấm biển", () => {
    render(
      <I18nProvider initialLocale="vi">
        <QuietForestScene />
      </I18nProvider>
    );

    for (const sign of signs) {
      expect(screen.getByText(sign.title)).toBeDefined();
      for (const line of sign.lines) {
        expect(screen.getByText(line), `${sign.id}: ${line}`).toBeDefined();
      }
    }
  });

  it("không dựng cần điều khiển - không có gì để đi", () => {
    render(
      <I18nProvider initialLocale="vi">
        <QuietForestScene />
      </I18nProvider>
    );
    expect(screen.queryByText(viDict.quietForest.signsHint)).toBeNull();
  });
});
