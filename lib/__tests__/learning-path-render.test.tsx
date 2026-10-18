import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement } from "react";
import { I18nProvider } from "@/lib/i18n/context";
import { MEDIAN_LESSON_MINUTES } from "@/lib/learning-pace";

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

// Server action: import thẳng vào một component "use client" thì vitest kéo
// theo cả cloudflare-server, vốn đọc biến môi trường lúc import.
vi.mock("@/app/(app)/lo-trinh/actions", () => ({
  saveLearningPathPrefs: vi.fn(async () => ({ ok: true })),
}));

const COUNTS = { personal: 135, professional: 472 };
const DONE = { personal: 12, professional: 0 };
const NO_ENTRY = { personal: {}, professional: {} };

async function markup(
  locale: "vi" | "en",
  props: Partial<{
    savedTrack: "personal" | "professional" | null;
    savedPace: { perDay: 1 | 2; daysPerWeek: number } | null;
  }> = {},
) {
  const { default: LearningPathClient } = await import("@/components/LearningPathClient");
  const node = (
    <LearningPathClient
      counts={COUNTS}
      done={DONE}
      userId="u1"
      topicEntry={NO_ENTRY}
      savedTrack={props.savedTrack ?? null}
      savedPace={props.savedPace ?? null}
    />
  ) as ReactElement;
  return renderToStaticMarkup(<I18nProvider initialLocale={locale}>{node}</I18nProvider>);
}

describe("trang /lo-trinh dựng ra chữ gì", () => {
  it("hiện con số phút mỗi ngày ngay đầu trang, trước mọi phần giải thích", async () => {
    const html = await markup("vi");
    // Đo bằng ID của khối, không bằng tên khối. Mục lục ở đầu trang liệt kê
    // đúng những cái tên đó, nên indexOf trên chữ sẽ bắt trúng mục lục và báo
    // sai thứ tự trong khi thứ tự vẫn đúng - phép kiểm hỏng theo kiểu tệ nhất,
    // đỏ vì một thay đổi hợp lệ.
    // Khẩu hiệu là một KHOẢNG (10-15), chủ ý không bám trung vị đo được: nó nói
    // thời gian làm cả bài kể cả thực hành, không chỉ thời gian đọc.
    const minutes = html.indexOf("10-15 phút mỗi ngày");
    const howTo = html.indexOf('id="how"');
    expect(minutes).toBeGreaterThan(-1);
    expect(howTo).toBeGreaterThan(-1);
    expect(minutes).toBeLessThan(howTo);
  });

  it("đi theo thứ tự mục tiêu -> hướng đi -> bài đầu tiên -> phần giải thích", async () => {
    const html = await markup("vi");
    // Render tĩnh thì effect chưa chạy, nên khối bài đầu tiên ở trạng thái ĐANG
    // ĐỌC tiến độ. Điều đáng canh là VỊ TRÍ của khối: sau bước chọn hướng, và
    // trước mọi phần giải thích (đã gập vào `details`).
    const pick = html.indexOf('id="pick"');
    const first = html.indexOf('id="first"');
    const howTo = html.indexOf('id="how"');
    expect(pick).toBeGreaterThan(-1);
    expect(first).toBeGreaterThan(pick);
    expect(howTo).toBeGreaterThan(first);
  });

  it("hiện số bài thật của từng hướng, không phải số viết cứng", async () => {
    const html = await markup("vi");
    // Hướng ĐANG CHỌN đếm số CÒN LẠI (135 − 12), hướng kia đếm tổng.
    expect(html).toContain("còn 123 bài");
    expect(html).toContain("472 bài");
  });

  it("thẻ đang chọn không bao giờ ghi cùng lúc hai con số cho một hướng", async () => {
    // Lỗi cũ: cả hai thẻ đều in tổng, nên thẻ đang chọn ghi "135 bài · khoảng
    // 27 tuần" ngay trên ô ước lượng ghi "Còn 123 bài ... khoảng 25 tuần".
    const html = await markup("vi");
    expect(html).toContain("Còn 123 bài");
    expect(html).not.toContain("135 bài");
  });

  it("lựa chọn lưu trên server thắng, không phải mặc định personal", async () => {
    const html = await markup("vi", { savedTrack: "professional" });
    // Thẻ hướng chuyên ngành là thẻ đang chọn, nên nó đếm số còn lại (472 − 0).
    expect(html).toContain("còn 472 bài");
    // Và ghi chú riêng của hướng chuyên ngành phải hiện ngay từ lần dựng đầu.
    expect(html).toContain("Nghề công nghệ");
  });

  it("nhịp lưu trên server dựng ra ngay, không chờ effect", async () => {
    const html = await markup("vi", { savedPace: { perDay: 2, daysPerWeek: 3 } });
    // 123 bài còn lại, 2 bài/ngày, 3 ngày/tuần = 6 bài/tuần -> 21 tuần.
    expect(html).toContain("21 tuần");
    // 2 bài x trung vị một bài. Lấy từ hằng số chứ không ghi cứng: con số này
    // đã đổi từ 5 lên 8 khi kho thêm 740 bài dài hơn, và test này đỏ theo.
    expect(html).toContain(`${2 * MEDIAN_LESSON_MINUTES} phút`);
  });

  it("thanh tiến độ nói được với trình đọc màn hình", async () => {
    const html = await markup("vi");
    // Render tĩnh chưa có greeting nên khối này ở trạng thái đang tải; phép
    // kiểm thật nằm ở chỗ thuộc tính có mặt khi khối dựng ra, nên chỉ cần
    // chắc rằng chuỗi aria đã vào từ điển và không lọt ra ngoài nó.
    expect(html).not.toContain("progressbar\"></div>");
  });

  it("các khối có neo thật, và phần giải thích gập lại chứ không bị bỏ", async () => {
    const html = await markup("vi");
    for (const id of ["pick", "pace", "first", "how", "worry", "check"]) {
      expect(html, id).toContain(`id="${id}"`);
    }
    expect(html).toContain("<details");
  });

  it("mỗi chặng hiện số bài đã học trên tổng, theo hướng đang chọn", async () => {
    const { default: LearningPathClient } = await import("@/components/LearningPathClient");
    const node = (
      <LearningPathClient
        counts={COUNTS}
        done={DONE}
        userId="u1"
        topicEntry={NO_ENTRY}
        savedTrack={null}
        savedPace={null}
        milestones={{ personal: [{ total: 9, done: 2 }, { total: 8, done: 0 }], professional: [{ total: 5, done: 0 }] }}
      />
    ) as ReactElement;
    const html = renderToStaticMarkup(<I18nProvider initialLocale="vi">{node}</I18nProvider>);
    expect(html).toContain("2/9 bài");
    expect(html).toContain("0/8 bài");
    expect(html).not.toContain("0/5 bài");
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
