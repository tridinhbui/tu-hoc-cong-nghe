import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement } from "react";
import { I18nProvider } from "@/lib/i18n/context";

// /lo-trinh nằm sau cổng đăng nhập, nên không mở được bằng mắt trong lúc phát
// triển. Test này thay cho lần xem đó: nó dựng thật component và kiểm CHỮ hiện
// ra, ở cả hai ngôn ngữ.
//
// Thứ đáng kiểm không phải màu hay khoảng cách mà là hai điều dễ vỡ nhất:
//   1. Câu trả lời "hôm nay làm gì" phải nằm TRƯỚC phần giải thích. Bản đầu đặt
//      nó ở phần thứ năm, sau bốn phần lý thuyết - người đang bối rối phải đọc
//      hết mới được trả lời. Kiểm bằng THỨ TỰ xuất hiện trong markup.
//   2. Không chuỗi nào lọt ra ngoài từ điển. i18n-coverage đọc vị trí trong cú
//      pháp; test này đọc kết quả render, nên nó bắt được cả trường hợp một
//      chuỗi tiếng Việt đi qua một biến.

// I18nProvider gọi useRouter() để đổi locale, nên phải mock next/navigation -
// cùng cách lib/__tests__/free-recall-card.test.tsx đã làm.
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

vi.mock("@/app/(app)/dashboard/actions", () => ({
  getDashboardGreetingAction: vi.fn(async () => null),
}));

const COUNTS = { personal: 135, professional: 472 };
const DONE = { personal: 12, professional: 0 };

async function markup(locale: "vi" | "en") {
  const { default: LearningPathClient } = await import("@/components/LearningPathClient");
  const node = (
    <LearningPathClient counts={COUNTS} done={DONE} userId="u1" />
  ) as ReactElement;
  return renderToStaticMarkup(<I18nProvider initialLocale={locale}>{node}</I18nProvider>);
}

describe("trang /lo-trinh dựng ra chữ gì", () => {
  it("hiện con số 6 phút ngay đầu trang, trước mọi phần giải thích", async () => {
    const html = await markup("vi");
    const minutes = html.indexOf("6 phút mỗi ngày");
    const howTo = html.indexOf("Mỗi bài học làm ba việc");
    expect(minutes).toBeGreaterThan(-1);
    expect(howTo).toBeGreaterThan(-1);
    expect(minutes).toBeLessThan(howTo);
  });

  it("đặt câu trả lời hôm-nay-làm-gì trước phần chọn lộ trình", async () => {
    const html = await markup("vi");
    // Render tĩnh thì effect chưa chạy, nên khối này đang ở trạng thái ĐANG ĐỌC
    // tiến độ - không phải trạng thái "chưa có dữ liệu". Bản đầu của phép kiểm
    // tìm câu dẫn của trạng thái thứ hai và đỏ vì tìm sai state, không vì thứ
    // tự sai. Điều đáng canh là VỊ TRÍ của khối, nên tìm chữ luôn có mặt.
    const today = html.indexOf("Đang xem bạn đang ở đâu");
    const pick = html.indexOf("Chọn một hướng");
    expect(today).toBeGreaterThan(-1);
    expect(pick).toBeGreaterThan(-1);
    expect(today).toBeLessThan(pick);
  });

  it("hiện số bài thật của từng hướng, không phải số viết cứng", async () => {
    const html = await markup("vi");
    expect(html).toContain("135 bài");
    expect(html).toContain("472 bài");
  });

  it("ba câu người học đang lo đều có mặt", async () => {
    const html = await markup("vi");
    expect(html).toContain("có phải học lại từ đầu");
    expect(html).toContain("Mọi người học nhanh hơn tôi");
    expect(html).toContain("chọn sai hướng");
  });

  it("bản tiếng Anh không còn chữ tiếng Việt nào", async () => {
    const html = await markup("en");
    const text = html.replace(/<[^>]*>/g, " ");
    const viet = text.match(/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]\S*/gi);
    expect(viet ?? []).toEqual([]);
  });
});
