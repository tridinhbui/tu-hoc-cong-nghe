// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const { default: CertTrackView } = await import("@/components/CertTrackView");
import { getCertTrack } from "@/lib/cert-tracks";
import type { LessonMeta } from "@/lib/lesson-types";

afterEach(cleanup);

const cert = getCertTrack("aws-cloud-practitioner")!;
const lesson = (id: number, title: string) => ({ id, slug: `bai-${id}`, title }) as LessonMeta;

// Trang /chung-chi/<certId>: tỉ trọng từng miền phải hiện ngay trên hàng miền,
// bài kế tiếp là bài đầu tiên CHƯA xong, và bấm vào miền thì mở danh sách bài.
describe("CertTrackView", () => {
  it("shows weights, picks the next unfinished lesson and expands a domain", () => {
    const domains = cert.domains.map((domain, i) => ({
      domain,
      lessons: i === 0 ? [lesson(1, "Đám mây là gì"), lesson(2, "Vùng và AZ")] : [lesson(10 + i, `Bài miền ${i}`)],
      completedCount: i === 0 ? 1 : 0,
    }));
    render(
      <I18nProvider initialLocale="vi">
        <CertTrackView cert={cert} domains={domains} completedLessonIds={[1]} distinctLessonCount={5} />
      </I18nProvider>
    );

    expect(screen.getByText("24% đề")).toBeTruthy();
    expect(screen.getByText("34% đề")).toBeTruthy();
    // Bài 1 đã xong, nên hero trỏ tới bài 2.
    expect(screen.getByRole("heading", { name: "Vùng và AZ" })).toBeTruthy();

    const toggle = screen.getByRole("button", { name: /Khái niệm đám mây/ });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("link", { name: "Đám mây là gì" }).getAttribute("href")).toBe("/bai-hoc/bai-1");
  });

  it("opens domain practice, asking the API for exactly that cert and domain", async () => {
    const fetchMock = vi.fn(async (_url: string) =>
      new Response(
        JSON.stringify({
          questions: [
            { lessonTitle: "Đám mây là gì", question: "Cloud là gì?", options: ["A1", "B1", "C1", "D1"], correct: 2, explanation: "Vì C1.", token: "t1" },
          ],
        }),
        { status: 200 }
      )
    );
    vi.stubGlobal("fetch", fetchMock);
    const domains = cert.domains.map((domain) => ({ domain, lessons: [lesson(1, "Đám mây là gì")], completedCount: 0 }));
    render(
      <I18nProvider initialLocale="vi">
        <CertTrackView cert={cert} domains={domains} completedLessonIds={[]} distinctLessonCount={1} />
      </I18nProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /Khái niệm đám mây/ }));
    fireEvent.click(screen.getByRole("button", { name: /Luyện miền này/ }));
    expect(await screen.findByText("Cloud là gì?")).toBeTruthy();
    expect(String(fetchMock.mock.calls[0][0])).toContain("track=cert&cert=aws-cloud-practitioner&domain=cloud-concepts");

    fireEvent.click(screen.getByRole("button", { name: /C1/ }));
    fireEvent.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText("Chính xác")).toBeTruthy();
    vi.unstubAllGlobals();
  });
});
