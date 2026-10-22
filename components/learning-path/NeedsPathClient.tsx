"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LearningGoalCard, { type FlowEffort } from "@/components/learning-flows/LearningGoalCard";
import { textLink } from "@/components/ui/system";
import { useI18n } from "@/lib/i18n/context";

/** /lo-trinh/theo-nhu-cau: thẻ chọn mục tiêu - từng nằm gập ở cuối trang lộ
 *  trình - giờ là cả một trang, vì nó là một trong ba lối vào. */
export default function NeedsPathClient({ flowEffort }: { flowEffort: FlowEffort }) {
  const { t } = useI18n();
  const p = t.learningPath;
  return (
    <div className="mx-auto max-w-5xl px-4 pt-5 pb-28 sm:px-6">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-black leading-tight tracking-tight text-ink-max sm:text-3xl">{p.needsTitle}</h1>
        <Link href="/lo-trinh" className={`${textLink} shrink-0 text-sm`}>
          <ArrowLeft className="h-4 w-4" />
          {p.backToPaths}
        </Link>
      </header>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{p.needsIntro}</p>
      <div className="mt-6">
        <LearningGoalCard effort={flowEffort} mission />
      </div>
    </div>
  );
}
