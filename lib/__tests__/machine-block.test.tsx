// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";
import { LOCALE_COOKIE } from "@/lib/i18n/locales";
import { T06_ADDITIONS } from "@/lib/lesson-block-additions/t06";
import type { LessonSectionBlock } from "@/lib/lesson-types";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));
const { default: MachineBlock } = await import("@/components/lesson-blocks/MachineBlock");
afterEach(() => {
  cleanup();
  document.cookie = `${LOCALE_COOKIE}=; max-age=0`;
});

type M = Extract<LessonSectionBlock, { type: "machine" }>;
const get = (slug: string) => T06_ADDITIONS[slug].find((b) => b.type === "machine") as M;
const show = (b: M, onPass = vi.fn(), locale: "vi" | "en" = "vi") => {
  document.cookie = `${LOCALE_COOKIE}=${locale}`;
  render(<I18nProvider initialLocale={locale}><MachineBlock {...b} onPass={onPass} /></I18nProvider>);
  return onPass;
};

describe("MachineBlock cpu", () => {
  it("mã khởi đầu chạy xong nhưng sai mục tiêu, không gọi onPass", () => {
    const onPass = show(get("chuong-trinh-trong-bo-nho"));
    fireEvent.click(screen.getByText("Chạy hết"));
    expect(screen.getByText(/ô 2 đang là 36, cần 42/)).toBeTruthy();
    expect(onPass).not.toHaveBeenCalled();
  });
  it("sửa mã theo lời giải rồi chạy thì qua bài và ghi nhận một lần", () => {
    const b = get("chuong-trinh-trong-bo-nho");
    const onPass = show(b);
    fireEvent.change(screen.getByLabelText(/Chương trình/), { target: { value: (b as Extract<M, { kind: "cpu" }>).solution.join("\n") } });
    fireEvent.click(screen.getByText("Chạy hết"));
    expect(screen.getByText(/Đạt mục tiêu/)).toBeTruthy();
    expect(onPass).toHaveBeenCalledTimes(1);
  });
  it("lệnh sai hiện lỗi đọc được và khoá nút chạy; vòng lặp vô hạn dừng", () => {
    show(get("chuong-trinh-trong-bo-nho"));
    const box = screen.getByLabelText(/Chương trình/);
    fireEvent.change(box, { target: { value: "MUL R0, R1" } });
    expect(screen.getByRole("alert").textContent).toContain("MUL");
    expect((screen.getByText("Chạy hết").closest("button") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(box, { target: { value: "v:\nJMP v" } });
    fireEvent.click(screen.getByText("Chạy hết"));
    expect(screen.getByRole("alert").textContent).toContain("400");
  });
  it("lời giải khoá tới khi đã chạy thử; thông báo lỗi dịch được", () => {
    show(get("bo-cuc-bo-nho-va-chi-phi-truy-cap"), vi.fn(), "en");
    expect(screen.queryByText("Show solution")).toBeNull();
    fireEvent.change(screen.getByLabelText(/Program/), { target: { value: "FOO" } });
    expect(screen.getByRole("alert").textContent).toContain("there is no instruction");
  });
});

describe("MachineBlock scheduler", () => {
  it("kéo thanh trượt tới quantum đúng thì đạt cả hai giới hạn", () => {
    const b = get("tien-trinh-chuong-trinh-dang-chay");
    const onPass = show(b);
    expect(onPass).not.toHaveBeenCalled();
    fireEvent.change(screen.getByRole("slider"), { target: { value: "3" } });
    expect(screen.getByText(/Đạt cả hai giới hạn/)).toBeTruthy();
    expect(onPass).toHaveBeenCalledTimes(1);
  });
  it("có bản chữ của dòng thời gian cho người đọc màn hình", () => {
    show(get("he-dieu-hanh-lam-gi"));
    expect(document.querySelectorAll("ol.sr-only li").length).toBeGreaterThan(3);
  });
});

describe("MachineBlock http", () => {
  it("sửa từng tầng: 404 → 405 → 401 → 400 → 201, ghi nhận đúng một lần", () => {
    const onPass = show(get("http-yeu-cau-va-phan-hoi"));
    const send = () => fireEvent.click(screen.getByText("Gửi yêu cầu"));
    const status = () => screen.getByText(/^\d{3} /).textContent;
    send();
    expect(status()).toMatch(/^404/);
    fireEvent.change(screen.getByLabelText("Đường dẫn"), { target: { value: "/notes" } });
    expect(screen.getByText(/Chưa gửi/)).toBeTruthy();
    send();
    expect(status()).toMatch(/^405/);
    fireEvent.change(screen.getByLabelText("Phương thức"), { target: { value: "POST" } });
    send();
    expect(status()).toMatch(/^401/);
    fireEvent.change(screen.getByLabelText("Thẻ đăng nhập (token)"), { target: { value: "good" } });
    send();
    expect(status()).toMatch(/^400/);
    expect(onPass).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/Thân yêu cầu/), { target: { value: '{"title": "Mua sữa"}' } });
    send();
    expect(status()).toMatch(/^201/);
    expect(onPass).toHaveBeenCalledTimes(1);
  });
});

describe("MachineBlock dns", () => {
  it("TTL dài nhất chưa đạt; kéo về 120 thì đạt cả hai giới hạn", () => {
    const onPass = show(get("dns-tu-ten-mien-toi-dia-chi-ip"));
    expect(screen.queryByText(/Đạt cả hai giới hạn/)).toBeNull();
    fireEvent.change(screen.getByRole("slider"), { target: { value: "120" } });
    expect(screen.getByText(/Đạt cả hai giới hạn/)).toBeTruthy();
    expect(onPass).toHaveBeenCalledTimes(1);
  });
  it("bảng tra cứu có chú thích cho trình đọc màn hình và đánh dấu địa chỉ cũ bằng chữ", () => {
    show(get("dns-tu-ten-mien-toi-dia-chi-ip"));
    expect(document.querySelector("table caption")).toBeTruthy();
    expect(screen.getAllByText("cũ").length).toBeGreaterThan(0);
  });
});
