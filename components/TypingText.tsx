"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
}

// Character-by-character reveal with a blinking cursor while typing - the
// classic chatbot "typing response" effect, for Tài Tài's on-demand ELI5
// explanation (components/LessonPageClient.tsx) rather than an instant
// wall of text. Resets and re-types whenever `text` changes (e.g. a
// different lesson's metaphor), so it isn't stuck mid-animation from a
// previous render.
export default function TypingText({ text, speed = 16, onDone, className }: TypingTextProps) {
  const [shownLength, setShownLength] = useState(0);

  // Đưa con trỏ về đầu ngay khi `text` đổi, làm trong lúc render chứ không
  // trong effect. Effect chạy SAU khi trình duyệt đã vẽ, nên bản cũ để lộ một
  // khung hình mang đoạn văn cũ ở độ dài cũ trước khi kịp reset - thấy rõ khi
  // đoạn mới ngắn hơn đoạn đang hiện.
  const [typingText, setTypingText] = useState(text);
  if (typingText !== text) {
    setTypingText(text);
    setShownLength(0);
  }

  useEffect(() => {
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setShownLength(i);
      if (i >= text.length) {
        window.clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  const done = shownLength >= text.length;

  return (
    <span className={className}>
      {text.slice(0, shownLength)}
      {!done && (
        <span
          aria-hidden="true"
          className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle animate-pulse"
        />
      )}
    </span>
  );
}
