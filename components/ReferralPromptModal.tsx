"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Gift, Copy, Check, X } from "lucide-react";
import { REFERRER_BONUS_XP, REFERRED_BONUS_XP } from "@/lib/referrals";
import { useI18n } from "@/lib/i18n/context";
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
            className="fixed bottom-37 right-4 sm:bottom-40 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white shadow-xl hover:scale-108 transition-all duration-200 flex items-center justify-center border-2 border-white dark:border-stone-800 cursor-pointer select-none group"
          >
            <Gift className="w-6 h-6 text-white transition-transform group-hover:rotate-12" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-xs animate-pulse" />
            <div className="absolute bottom-full right-0 mb-2 bg-stone-900 text-white text-xs px-2.5 py-1 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition font-bold border border-stone-700 pointer-events-none">
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
            className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-42 sm:right-[5.5rem] z-50 sm:w-96 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-lg text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Gift className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{t.referralPrompt.title}</h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
              {t.referralPrompt.descPart1}{" "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{format(t.referralPrompt.descBonus, { xp: REFERRER_BONUS_XP })}</span>
              {t.referralPrompt.descPart2}{" "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{format(t.referralPrompt.descBonus, { xp: REFERRED_BONUS_XP })}</span>{" "}
              {t.referralPrompt.descPart3}
            </p>

            <div className="flex items-center gap-2 mt-4">
              <input
                readOnly
                value={link}
                onClick={(e) => e.currentTarget.select()}
                className="flex-1 min-w-0 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-2.5 text-stone-600 dark:text-stone-400 truncate"
              />
              <button
                onClick={handleCopy}
                title={t.referralPrompt.copyButtonTitle}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                {t.referralPrompt.later}
              </button>
              <Link
                href="/ban-be"
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold text-center hover:opacity-90 transition-opacity"
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
