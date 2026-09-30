// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { validateInteractiveBlock } from "@/lib/lesson-blocks/validate.js";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const { default: AiLabBlock } = await import("@/components/lesson-blocks/AiLabBlock");
const { default: ScenarioBlock } = await import("@/components/lesson-blocks/ScenarioBlock");

afterEach(cleanup);

type AiLab = Extract<LessonSectionBlock, { type: "aiLab" }>;
type Scenario = Extract<LessonSectionBlock, { type: "scenario" }>;

// Cùng dữ liệu với ví dụ cho bài ai-tao-sinh-lam-duoc-gi-o-van-phong.
const promptLab: AiLab = {
  type: "aiLab",
  mode: "prompt",
  title: "Nhờ AI viết email xin lùi hạn giao hàng",
  task: "Lô hàng cho khách Minh Phát trễ 3 ngày vì kho chưa nhận đủ vật tư. Lắp một prompt để AI viết nháp email báo khách.",
  parts: [
    {
      id: "context",
      label: "Bối cảnh",
      options: [
        { text: "Viết email cho khách.", feedback: "AI không biết khách là ai, trễ việc gì - nó sẽ tự bịa." },
        { text: "Tôi là nhân viên kinh doanh. Khách Minh Phát đặt 500 thùng giao ngày 12/10; kho thiếu vật tư nên giao trễ tới 15/10.", good: true, feedback: "Đủ người, việc, số lượng và ngày - AI chỉ việc viết quanh dữ kiện bạn đưa." },
      ],
    },
    {
      id: "task",
      label: "Việc cần làm",
      options: [
        { text: "Viết email xin lỗi, báo ngày giao mới 15/10 và đề nghị giao trước 200 thùng ngày 12/10.", good: true, feedback: "Nói rõ email phải làm được gì, kể cả phương án bù cho khách." },
        { text: "Viết gì đó để khách đừng giận.", feedback: "Mục tiêu mơ hồ - AI dễ hứa những thứ công ty không làm được." },
      ],
    },
    {
      id: "format",
      label: "Giọng và độ dài",
      options: [
        { text: "Viết thật hay.", feedback: "\"Hay\" không phải yêu cầu đo được - AI sẽ viết dài và văn hoa." },
        { text: "Giọng lịch sự, ngắn gọn, dưới 120 chữ, xưng \"chúng tôi\" - \"Quý khách\".", good: true, feedback: "Giọng, độ dài và cách xưng hô rõ ràng - bản nháp dùng gần như ngay." },
      ],
    },
  ],
  responses: [
    {
      requires: ["context", "task", "format"],
      text: "Kính gửi Quý khách Minh Phát,\n\nChúng tôi thành thật xin lỗi: do kho chưa nhận đủ vật tư, đơn 500 thùng sẽ giao trễ tới ngày 15/10 thay vì 12/10. Để Quý khách không gián đoạn, chúng tôi đề nghị giao trước 200 thùng vào ngày 12/10, phần còn lại ngày 15/10.\n\nMong Quý khách thông cảm và phản hồi để chúng tôi sắp xếp.\n\nTrân trọng.",
    },
    {
      requires: ["context"],
      text: "Kính gửi Quý khách Minh Phát,\n\nĐơn 500 thùng của Quý khách sẽ giao trễ tới 15/10. Chúng tôi rất lấy làm tiếc về sự bất tiện này và cam kết sẽ nỗ lực hết mình để phục vụ Quý khách tốt hơn trong tương lai...\n\n(Có đủ dữ kiện nhưng thiếu phương án bù cho khách, và giọng văn còn dài dòng.)",
    },
    {
      text: "Kính gửi Quý khách hàng thân mến,\n\nNhân dịp này, chúng tôi xin gửi lời tri ân sâu sắc và xin thông báo đơn hàng của Quý khách sẽ được giao trong 7 ngày tới kèm ưu đãi giảm 20%...\n\n(AI không biết khách, đơn hay ngày thật - nên tự bịa \"7 ngày\" và \"giảm 20%\", những điều công ty chưa hề hứa.)",
    },
  ],
};

const spotError: AiLab = {
  type: "aiLab",
  mode: "spotError",
  title: "Soát biên bản họp do AI tóm tắt",
  task: "Bạn đưa AI bản ghi cuộc họp giao ban thứ Hai và nhờ tóm tắt. Bản ghi chỉ có: doanh số tháng 9 đạt khoảng 92% kế hoạch, chị Lan phụ trách báo cáo khách hàng, hạn nộp là thứ Sáu tuần này, chưa chốt ngân sách quảng cáo. Đánh dấu những đoạn AI tự thêm.",
  segments: [
    { text: "Cuộc họp giao ban thứ Hai điểm lại kết quả kinh doanh tháng 9." },
    { text: "Doanh số tháng 9 đạt 92,4% kế hoạch, tăng 15% so với tháng 8.", error: "Bản ghi chỉ nói \"khoảng 92%\" và không nhắc tháng 8 - \"92,4%\" và \"tăng 15%\" là số AI bịa cho nghe chính xác." },
    { text: "Chị Lan phụ trách báo cáo khách hàng." },
    { text: "Hạn nộp báo cáo là thứ Sáu, ngày 17/10.", error: "Bản ghi chỉ nói \"thứ Sáu tuần này\"; AI tự điền ngày 17/10 - có thể sai ngày thật." },
    { text: "Ngân sách quảng cáo quý 4 đã được duyệt ở mức 350 triệu đồng.", error: "Bản ghi nói ngân sách CHƯA chốt. AI đảo ngược kết luận và bịa luôn con số." },
    { text: "Nội dung ngân sách sẽ bàn tiếp ở buổi họp sau." },
  ],
};

const scenario: Scenario = {
  type: "scenario",
  title: "Sếp cần bản tóm tắt báo cáo trong 30 phút",
  start: "s1",
  nodes: {
    s1: {
      text: "9 giờ sáng, sếp nhắn: \"Em tóm tắt báo cáo thị trường 40 trang này thành 1 trang, 9 rưỡi anh họp với ban giám đốc.\" Báo cáo có số liệu nội bộ chưa công bố.",
      choices: [
        { label: "Dán cả 40 trang vào một ứng dụng AI miễn phí trên điện thoại cho nhanh", next: "bad_leak" },
        { label: "Dùng công cụ AI công ty đã duyệt, dán báo cáo và nhờ tóm tắt", next: "s2" },
      ],
    },
    bad_leak: {
      text: "Bản tóm tắt ra trong 1 phút. Nhưng số liệu chưa công bố vừa được gửi lên một dịch vụ bên ngoài mà công ty không kiểm soát. Tuần sau, phòng IT hỏi vì sao tài liệu mật xuất hiện trong nhật ký truy cập ứng dụng lạ.",
      ending: "bad",
    },
    s2: {
      text: "AI trả về một trang gọn gàng, có câu: \"Thị phần công ty tăng từ 18% lên 23% trong năm.\" Còn 15 phút.",
      choices: [
        { label: "Gửi ngay cho sếp - trông đã rất chuyên nghiệp", next: "bad_number" },
        { label: "Mở báo cáo gốc, tìm các con số và tên trong bản tóm tắt để đối chiếu", next: "s3" },
      ],
    },
    bad_number: {
      text: "Trong cuộc họp, giám đốc tài chính hỏi con số 23% lấy ở trang nào. Báo cáo gốc ghi 21%. Sếp phải xin lỗi trước ban giám đốc.",
      ending: "bad",
    },
    s3: {
      text: "Bạn thấy báo cáo gốc ghi thị phần 21%, không phải 23%. Các ý khác đều khớp.",
      choices: [
        { label: "Sửa thành 21%, ghi rõ trang nguồn cạnh mỗi con số, rồi gửi sếp", next: "good" },
        { label: "Xoá hết mọi con số cho an toàn rồi gửi", next: "bad_vague" },
      ],
    },
    bad_vague: {
      text: "Bản tóm tắt không còn sai, nhưng cũng không còn gì để sếp dùng: ban giám đốc cần đúng các con số đó để ra quyết định.",
      ending: "bad",
    },
    good: {
      text: "9 giờ 25, sếp nhận một trang gọn, số đã đối chiếu, có số trang nguồn. Khi giám đốc tài chính hỏi, sếp mở đúng trang 12 trong 5 giây.",
      ending: "good",
    },
  },
};

function wrap(node: React.ReactNode) {
  return render(<I18nProvider initialLocale="vi">{node}</I18nProvider>);
}

describe("fixtures", () => {
  it("pass the interactive block validator", () => {
    for (const b of [promptLab, spotError, scenario]) expect(validateInteractiveBlock(b)).toEqual([]);
  });
});

describe("AiLabBlock prompt", () => {
  it("bad selection gets the default response and no pass", () => {
    const onPass = vi.fn();
    wrap(<AiLabBlock {...promptLab} onPass={onPass} />);
    fireEvent.click(screen.getByText("Viết email cho khách."));
    fireEvent.click(screen.getByText("Viết gì đó để khách đừng giận."));
    fireEvent.click(screen.getByText("Viết thật hay."));
    fireEvent.click(screen.getByRole("button", { name: /Gửi/ }));
    expect(screen.getByTestId("ailab-reply").textContent).toContain("giảm 20%");
    expect(screen.getAllByText("Cần sửa").length).toBe(3);
    expect(onPass).not.toHaveBeenCalled();
  });

  it("all-good selection passes once, even when resent", () => {
    const onPass = vi.fn();
    wrap(<AiLabBlock {...promptLab} onPass={onPass} />);
    for (const p of promptLab.parts) fireEvent.click(screen.getByText(p.options.find((o) => o.good)!.text));
    fireEvent.click(screen.getByRole("button", { name: /Gửi/ }));
    expect(screen.getByTestId("ailab-reply").textContent).toContain("giao trước 200 thùng");
    fireEvent.click(screen.getByRole("button", { name: /Gửi lại/ }));
    expect(onPass).toHaveBeenCalledTimes(1);
  });
});

describe("AiLabBlock spotError", () => {
  const seg = (i: number) => screen.getByText(spotError.segments[i].text);

  it("fails when an error is missed, then passes on retry with one false flag", () => {
    const onPass = vi.fn();
    wrap(<AiLabBlock {...spotError} onPass={onPass} />);
    fireEvent.click(seg(1));
    fireEvent.click(seg(3));
    fireEvent.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đạt/)).toBeTruthy();
    expect(onPass).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /Làm lại/ }));
    for (const i of [1, 3, 4, 0]) fireEvent.click(seg(i));
    fireEvent.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/^Đạt/)).toBeTruthy();
    expect(onPass).toHaveBeenCalledTimes(1);
  });

  it("fails with two false flags", () => {
    const onPass = vi.fn();
    wrap(<AiLabBlock {...spotError} onPass={onPass} />);
    for (const i of [1, 3, 4, 0, 2]) fireEvent.click(seg(i));
    fireEvent.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onPass).not.toHaveBeenCalled();
  });
});

describe("ScenarioBlock", () => {
  it("bad ending, choose again, reach good ending: onPass once", () => {
    const onPass = vi.fn();
    wrap(<ScenarioBlock {...scenario} onPass={onPass} />);
    fireEvent.click(screen.getByText(/công cụ AI công ty đã duyệt/));
    fireEvent.click(screen.getByText(/Gửi ngay cho sếp/));
    expect(screen.getByText("Kết thúc chưa tốt")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Chọn lại/ }));
    fireEvent.click(screen.getByText(/Mở báo cáo gốc/));
    fireEvent.click(screen.getByText(/Sửa thành 21%/));
    expect(screen.getByText("Kết thúc tốt")).toBeTruthy();
    expect(onPass).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: /Làm lại từ đầu/ }));
    fireEvent.click(screen.getByText(/công cụ AI công ty đã duyệt/));
    fireEvent.click(screen.getByText(/Mở báo cáo gốc/));
    fireEvent.click(screen.getByText(/Sửa thành 21%/));
    expect(onPass).toHaveBeenCalledTimes(1);
  });
});

