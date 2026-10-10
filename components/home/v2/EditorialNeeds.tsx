"use client";

import { Reveal } from "@/components/ui/motion";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { FlowId } from "@/lib/learning-flows";
import { INK, Mono, PAPER, RULE } from "@/components/home/v2/kit";

/** Bốn lối cho người chưa biết gì - cùng bốn lối "Hợp cho người mới" của
 *  MissionPicker trên /lo-trinh, theo cùng thứ tự. */
const STARTER_FLOWS: FlowId[] = ["ai-assistant", "website", "data-ai", "ai-marketing"];

export const NEEDS_SECTION_ID = "bat-dau";

/** Cuộn tới khu "Bắt đầu từ việc bạn muốn làm" bằng mã, không dựa vào hành vi
 *  mặc định của liên kết `#`. Nút "Bắt đầu học miễn phí" ở đầu trang từng là một
 *  <Link href="#bat-dau"> trần và có người báo bấm không có gì xảy ra: liên kết
 *  neo hỏng im lặng ở Safari và ở trình duyệt nhúng của Zalo/Facebook (nơi người
 *  Việt hay mở link chia sẻ), và không có lỗi nào để thấy. scrollIntoView thì
 *  chạy ở mọi nơi đó. */
export function scrollToNeeds(smooth = true) {
  const el = document.getElementById(NEEDS_SECTION_ID);
  if (!el) return false;
  // Cuộn mượt cần khung hình: ở tab nền, chế độ tiết kiệm pin hay một số
  // trình duyệt nhúng nó khởi động rồi đứng yên (đo được: tab ẩn, scrollY mắc
  // ở 0 sau 2,5 giây trong khi cuộn tức thì tới ngay). Nên chỉ cuộn mượt khi
  // trang đang hiển thị, và luôn kiểm lại: nếu sau khi lẽ ra đã tới mà khu vẫn
  // chưa nằm gần mép trên thì nhảy thẳng.
  const animate = smooth && document.visibilityState === "visible";
  el.scrollIntoView({ behavior: animate ? "smooth" : "auto", block: "start" });
  if (animate) {
    window.setTimeout(() => {
      if (Math.abs(el.getBoundingClientRect().top) > 120) el.scrollIntoView({ behavior: "auto", block: "start" });
    }, 1100);
  }
  return true;
}

/**
 * "Bắt đầu từ việc bạn muốn làm" - tờ đứng ngay dưới hero.
 *
 * Đi thử trang như một người chưa biết gì về công nghệ (2026-09-29): hero nói
 * "740+ bài về lập trình, dữ liệu, AI và hạ tầng", tờ kế tiếp là bốn "thế giới"
 * Web / Data / AI / Systems với danh mục HTML, SQL, Git, Linux - và người đọc
 * không biết mình thuộc thế giới nào. Trang duy nhất khiến họ muốn học tiếp là
 * /hoc-theo-nhu-cau/ai-assistant ("AI giống một thực tập sinh siêu tốc"),
 * nằm sau một hiệu ứng rê chuột ở giữa trang.
 *
 * Tờ này đưa câu hỏi ấy lên cửa: mỗi thẻ là một câu người mới tự nói ra
 * ("Tôi muốn AI làm việc cùng mình"), lời hứa, và VIỆC ĐẦU TIÊN sẽ làm - không
 * có thuật ngữ nào. Cố ý không mang nghi thức số tờ / thanh nạp của các tờ
 * khác: đây là chỗ duy nhất trên trang phải đọc được ngay mà không cần giải mã.
 */
export function EditorialNeeds() {
  const { t } = useI18n();

  /* Mở thẳng /#bat-dau: trình duyệt cuộn tới neo ngay lúc tải, TRƯỚC khi trang
     hiện hết (chữ giải mã, phông chữ nạp xong làm bố cục dời chỗ) nên có thể
     đáp sai chỗ hoặc bị huỷ. Cuộn lại một lần sau khi bố cục ổn định. */
  useEffect(() => {
    if (window.location.hash !== `#${NEEDS_SECTION_ID}`) return;
    const id = window.setTimeout(() => scrollToNeeds(false), 350);
    return () => window.clearTimeout(id);
  }, []);
  const f = t.learningFlows;
  const g = t.revampGoals;

  return (
    <section id={NEEDS_SECTION_ID} data-dbg="section#needs" className={`scroll-mt-16 border-b-2 ${RULE} ${PAPER} ${INK}`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid items-end gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <Mono className="text-accent-strong">{f.homeEyebrow}</Mono>
            <h2 className="mt-3 text-[2.1rem] font-black leading-[1.05] tracking-[-0.035em] sm:text-5xl">{f.homeTitle}</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-7 opacity-80">{f.sub}</p>
          </Reveal>
          <Link
            href="/hoc-theo-nhu-cau"
            className="thcn-ul inline-flex min-h-11 items-center gap-2 text-sm font-bold underline-offset-4 hover:underline lg:col-span-4 lg:justify-self-end"
          >
            {f.homeAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Đường kẻ giữa các thẻ là khe 1px lộ nền mực, không phải border
            từng ô: bốn thẻ xếp 1, 2 rồi 4 cột theo bề rộng, và border từng ô
            thì phải tính lại cạnh nào kẻ ở mỗi mốc. */}
        <ul className={`mt-8 grid gap-px border-2 ${RULE} bg-[#0d0e11] dark:bg-[#eeebe3] sm:grid-cols-2 lg:grid-cols-4`}>
          {STARTER_FLOWS.map((id, idx) => {
            const copy = f.flows[id];
            return (
              <Reveal as="li" key={id} delay={idx * 90} y={22} className={`min-w-0 ${PAPER}`}>
                <Link
                  href={`/hoc-theo-nhu-cau/${id}`}
                  className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-[#0d0e11] hover:text-[#eeebe3] dark:hover:bg-[#eeebe3] dark:hover:text-[#0d0e11] sm:p-6"
                >
                  <span className="thcn-ul self-start text-xl font-black leading-snug tracking-tight">&ldquo;{copy.need}&rdquo;</span>
                  <span className="text-sm leading-6 opacity-80">{copy.promise}</span>
                  <span className="mt-auto border-t border-current/20 pt-3 text-[13px] leading-6 opacity-90">
                    {g.flows[id].firstBuild}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-wide text-accent-strong group-hover:text-brand-300 dark:group-hover:text-brand-700">
                    {f.openFlow}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
