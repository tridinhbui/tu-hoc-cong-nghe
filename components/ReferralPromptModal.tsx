"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Gift, Copy, Check, X } from "lucide-react";
import { REFERRER_BONUS_XP, REFERRED_BONUS_XP } from "@/lib/referrals";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, btnSecondary } from "@/components/ui/system";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { format } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/current-user";

// Referral is fully wired end-to-end (lib/referrals.ts). It's a permanent
// floating round button (mirrors ChatWithAdminWidget's bottom-right chat
// bubble, placed bottom-left instead) that the user can open/close
// themselves. It also auto-opens itself once - but only the first time per
// login, not on every page reload within that same login: sessionStorage
// (cleared when the tab/browser closes, unlike localStorage) is the signal
// for "this is a fresh session," so reloading the dashboard five times in a
// row only pops it open on the first of those five.
const AUTO_OPEN_KEY = "thtcdn_referral_auto_opened";

/** `hideTrigger` để nút tròn riêng của nó biến mất khi lối vào đã chuyển vào
 *  menu Kết nối; `isOpen`/`onOpenChange` để menu mở được nó từ ngoài. Giữ
 *  nguyên hành vi tự bật của chính widget khi không ai điều khiển. */
export default function ReferralPromptModal({
  isOpen: controlledOpen,
  onOpenChange,
  hideTrigger,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
} = {}) {
  const { t } = useI18n();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      const value = typeof next === "function" ? next(open) : next;
      setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [open, onOpenChange]
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) setUserId(user.id);
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(AUTO_OPEN_KEY)) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      window.sessionStorage.setItem(AUTO_OPEN_KEY, "1");
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [userId]);

  if (!userId) return null;

  const link = `${window.location.origin}/login?ref=${userId}`;

  async function handleCopy() {
    // `.then()` không kèm `.catch()` là im lặng: link mời không vào clipboard
    // và người dùng cũng không biết, chỉ thấy nút không phản ứng gì.
    if (!(await copyToClipboard(link))) {
      toast.error(t.referralPrompt.copyFailedToast);
      return;
    }
    setCopied(true);
    toast.success(t.referralPrompt.copyToast);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {/* Floating round toggle button */}
      <AnimatePresence>
        {!open && !hideTrigger && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            title={t.referralPrompt.floatingButtonTitle}
            aria-label={t.referralPrompt.floatingButtonTitle}
            className="fixed bottom-37 right-4 sm:bottom-40 sm:right-6 z-50 w-12 h-12 rounded-md border border-line-strong bg-white text-ink transition-colors hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-200 flex items-center justify-center cursor-pointer select-none group"
          >
            {/* Không còn chấm đỏ nhấp nháy ở góc: nó sáng với MỌI người học,
                lúc nào cũng vậy, tức là một thông báo chưa đọc không có thật. */}
            <Gift className="w-5 h-5" />
            <div className="absolute bottom-full right-0 mb-2 bg-stone-950 text-white text-xs px-2.5 py-1 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition font-bold pointer-events-none">
              {t.referralPrompt.floatingTooltip}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-42 sm:right-[5.5rem] z-50 sm:w-96 rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 p-6"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label={t.common.close}
              className="absolute top-3 right-3 p-1 rounded-sm text-ink-faint hover:bg-surface-raised hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-sm border border-line-strong text-ink-soft flex items-center justify-center mb-3">
              <Gift className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-extrabold text-ink">{t.referralPrompt.title}</h2>
            <p className="text-sm text-ink-muted mt-1.5 leading-relaxed">
              {t.referralPrompt.descPart1}{" "}
              <span className="font-bold text-ink">{format(t.referralPrompt.descBonus, { xp: REFERRER_BONUS_XP })}</span>
              {t.referralPrompt.descPart2}{" "}
              <span className="font-bold text-ink">{format(t.referralPrompt.descBonus, { xp: REFERRED_BONUS_XP })}</span>{" "}
              {t.referralPrompt.descPart3}
            </p>

            <div className="flex items-center gap-2 mt-4">
              <input
                readOnly
                value={link}
                onClick={(e) => e.currentTarget.select()}
                className="flex-1 min-w-0 font-mono text-xs bg-surface border border-line-strong rounded-sm px-3 py-2.5 text-ink-soft truncate"
              />
              <button
                onClick={handleCopy}
                title={t.referralPrompt.copyButtonTitle}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-sm border border-line-strong text-ink-soft hover:border-line-firm transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className={`${btnSecondary} flex-1 cursor-pointer`}
              >
                {t.referralPrompt.later}
              </button>
              <Link
                href="/ban-be"
                onClick={() => setOpen(false)}
                className={`${btnPrimary} flex-1`}
              >
                {t.referralPrompt.viewMore}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
