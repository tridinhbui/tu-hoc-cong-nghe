"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Gift, Copy, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { REFERRER_BONUS_XP, REFERRED_BONUS_XP } from "@/lib/referrals";

// Referral is fully wired end-to-end (lib/referrals.ts). It's a permanent
// floating round button (mirrors ChatWithAdminWidget's bottom-right chat
// bubble, placed bottom-left instead) that the user can open/close
// themselves. It also auto-opens itself once - but only the first time per
// login, not on every page reload within that same login: sessionStorage
// (cleared when the tab/browser closes, unlike localStorage) is the signal
// for "this is a fresh session," so reloading the dashboard five times in a
// row only pops it open on the first of those five.
const AUTO_OPEN_KEY = "thtcdn_referral_auto_opened";

export default function ReferralPromptModal() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
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

  function handleCopy() {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success("Đã sao chép link mời!");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      {/* Floating round toggle button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            title="Mời bạn học cùng"
            className="fixed bottom-37 right-4 sm:bottom-40 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white shadow-xl hover:scale-108 transition-all duration-200 flex items-center justify-center border-2 border-white dark:border-stone-800 cursor-pointer select-none group"
          >
            <Gift className="w-6 h-6 text-white transition-transform group-hover:rotate-12" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-xs animate-pulse" />
            <div className="absolute bottom-full right-0 mb-2 bg-stone-900 text-white text-xs px-2.5 py-1 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition font-bold border border-stone-700 pointer-events-none">
              Mời bạn nhận Quà
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
            <h2 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">Mời bạn học cùng</h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
              Bạn nhận <span className="font-bold text-emerald-600 dark:text-emerald-400">+{REFERRER_BONUS_XP} XP</span>, bạn bè nhận{" "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">+{REFERRED_BONUS_XP} XP</span> ngay khi họ học xong bài đầu tiên -
              XP đó cũng tính vào tiến độ mở rương quà mỗi tuần.
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
                title="Sao chép link mời"
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
                Để sau
              </button>
              <Link
                href="/ban-be"
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold text-center hover:opacity-90 transition-opacity"
              >
                Xem thêm →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
