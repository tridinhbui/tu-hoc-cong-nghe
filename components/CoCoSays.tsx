"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import CoCoAvatar from "@/components/CoCoAvatar";
import TypingText from "@/components/TypingText";
import { useI18n } from "@/lib/i18n/context";

/**
 * Cơ Cơ nói một câu: avatar + bong bóng thoại gõ dần từng chữ.
 *
 * Dùng ở các điểm chào đón (dashboard, đầu các trang Học tập / Thực hành)
 * thay cho một dòng phụ đề cứng: cùng thông tin, nhưng trang có một người
 * đang nói với mình chứ không phải một tờ hướng dẫn.
 *
 * Ba nhịp: vài trăm mili-giây "đang gõ" (ba chấm), rồi câu chữ hiện dần, rồi
 * đứng yên. Người bật giảm chuyển động thấy nguyên câu ngay, không chấm.
 *
 * `lines` là một mảng; câu được chọn theo NGÀY (không ngẫu nhiên mỗi lần
 * render), nên hôm nay một câu, mai câu khác, còn quay lại trang trong ngày
 * thì vẫn câu đó. Chọn sau khi mount: giờ và ngày phía server có thể khác
 * phía trình duyệt, và câu lệch nhau là lỗi hydrate.
 */

const subscribeNoop = () => () => {};

function dayIndex(): number {
  const now = new Date();
  return Math.floor((now.getTime() - now.getTimezoneOffset() * 60_000) / 86_400_000);
}

export function pickLine(lines: readonly string[], salt = 0): string {
  if (lines.length === 0) return "";
  return lines[(dayIndex() + salt) % lines.length];
}

export default function CoCoSays({
  lines,
  lead,
  vars,
  salt = 0,
  size = 44,
  className = "",
}: {
  /** Các câu có thể nói; chọn một theo ngày. */
  lines: readonly string[];
  /** Câu mở đầu in đậm trước câu chính - thường là lời chào theo giờ. */
  lead?: string;
  /** Thay `{key}` trong câu. */
  vars?: Record<string, string | number>;
  /** Lệch chỉ số chọn câu, để hai chỗ dùng cùng mảng không nói y hệt nhau. */
  salt?: number;
  size?: number;
  className?: string;
}) {
  const { t } = useI18n();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const reduced = useSyncExternalStore(
    subscribeNoop,
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    () => false
  );
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setThinking(false), 550);
    return () => window.clearTimeout(id);
  }, []);

  let line = mounted ? pickLine(lines, salt) : "";
  for (const [k, v] of Object.entries(vars ?? {})) line = line.split(`{${k}}`).join(String(v));
  const text = lead ? `${lead} ${line}` : line;

  return (
    <div className={`flex items-end gap-2.5 ${className}`}>
      <CoCoAvatar size={size} float />
      <div className="relative min-w-0 flex-1 rounded-lg rounded-bl-none border border-brand-200 bg-white px-3.5 py-2.5 dark:border-brand-900/60 dark:bg-stone-900">
        <p className="font-mono text-[9.5px] font-black tracking-wider text-accent-strong">{t.coco.name}</p>
        <p className="mt-0.5 min-h-[1.25rem] text-sm leading-relaxed text-ink" aria-live="polite">
          {!mounted ? null : thinking && !reduced ? (
            <span className="inline-flex items-center gap-1 py-1" aria-label={t.coco.typingLabel}>
              {[0, 150, 300].map((d) => (
                <span key={d} className="h-1.5 w-1.5 rounded-full bg-brand-400 motion-safe:animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </span>
          ) : reduced ? (
            text
          ) : (
            <TypingText text={text} speed={18} />
          )}
        </p>
      </div>
    </div>
  );
}

/** Lời chào theo giờ trong ngày, kèm tên nếu có. */
export function useCoCoGreeting(firstName?: string | null): string {
  const { t } = useI18n();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!mounted) return "";
  const h = new Date().getHours();
  const tpl = h < 11 ? t.coco.morning : h < 18 ? t.coco.afternoon : t.coco.evening;
  return tpl.replace("{name}", firstName ? `, ${firstName}` : "");
}
