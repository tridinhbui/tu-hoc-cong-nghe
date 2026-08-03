import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { highlightGlossaryTerms } from "@/components/GlossaryTerm";

// Component chỉ chạm tới những thứ này khi người dùng bấm Lưu; bài test dừng
// ở lớp đánh dấu nên không cái nào được gọi tới.
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));
vi.mock("@/lib/supabase", () => ({ createClient: () => ({ auth: { getUser: vi.fn() } }) }));
vi.mock("@/lib/supabase-flashcards", () => ({ saveFlashcard: vi.fn(), getFlashcards: vi.fn() }));
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

// Người dùng báo: rê chuột từ từ gạch chân lên nút "Lưu vào Flashcard" thì
// popover biến mất giữa chừng.
//
// Nguyên nhân: popover đặt `bottom-full mb-2`. Margin nằm NGOÀI hộp của phần
// tử, nên 8px đó không thuộc về phần tử nào. Trạng thái mở lại chỉ dựa vào
// `group-hover/term`, không có handler hay timer nào giữ nó lại - chuột vừa
// rời chữ là hover tắt ngay, trước khi kịp chạm tới card.
//
// Cách sửa là chuyển khoảng cách đó thành `pb-2` trên một lớp bọc: padding
// nằm TRONG hộp, mà lớp bọc lại là con cháu của `.group/term`, nên CSS :hover
// của tổ tiên vẫn đúng khi chuột đi qua vùng đệm.
//
// Test khoá đúng bất biến đó chứ không khoá con số 8px hay tên lớp cụ thể:
// khoảng cách giữa từ và card phải nằm trong hộp, không được là margin.

function markup() {
  // `seen` theo dõi các thuật ngữ đã được gạch chân ở đoạn trước, để mỗi bài
  // chỉ chèn popover ở lần xuất hiện đầu tiên. Ở đây luôn truyền Set rỗng.
  return renderToStaticMarkup(<>{highlightGlossaryTerms("Lãi suất là gì?", new Set<string>())}</>);
}

/** Thẻ mở của phần tử được định vị phía trên từ gạch chân. */
function popoverOpenTag(html: string): string {
  const at = html.indexOf("bottom-full");
  expect(at, "không tìm thấy popover đặt trên từ (bottom-full)").toBeGreaterThan(-1);
  const start = html.lastIndexOf("<", at);
  const end = html.indexOf(">", at);
  return html.slice(start, end + 1);
}

describe("GlossaryTerm: cầu nối hover giữa từ và nút lưu flashcard", () => {
  it("chèn được popover cho một thuật ngữ có trong từ điển", () => {
    const html = markup();
    expect(html).toContain("group/term");
    expect(html).toContain("Lưu vào Flashcard");
  });

  it("tạo khoảng cách bằng padding, không phải margin", () => {
    const tag = popoverOpenTag(markup());

    // padding-bottom: vùng đệm thuộc hộp của popover nên hover được.
    expect(tag).toMatch(/\bpb-\d/);

    // margin-bottom: vùng đệm nằm ngoài hộp - đây chính là lỗi cũ.
    expect(tag).not.toMatch(/\bmb-\d/);
  });

  it("cho vùng đệm nhận chuột ngay khi con trỏ còn đang ở trên từ", () => {
    const tag = popoverOpenTag(markup());

    // Nếu thiếu vế group-hover thì vùng đệm vẫn pointer-events-none lúc chuột
    // rời chữ, và cú rê lên nút lại đứt đúng như cũ.
    expect(tag).toContain("group-hover/term:pointer-events-auto");
  });

  it("không đặt hiệu ứng thu phóng lên chính lớp bọc chứa vùng đệm", () => {
    const tag = popoverOpenTag(markup());

    // scale-95 làm hộp co lại quanh tâm, kéo mép dưới rời khỏi từ trong lúc
    // chuyển cảnh - cầu nối phải đứng yên, hiệu ứng thuộc về card bên trong.
    expect(tag).not.toMatch(/\bscale-\d/);
  });
});
