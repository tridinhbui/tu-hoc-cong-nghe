"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Gift, Copy, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getMyReferralStats, REFERRER_BONUS_XP, REFERRED_BONUS_XP } from "@/lib/referrals";

// Referral is fully wired end-to-end (lib/referrals.ts) but previously only
// surfaced via ReferralCard on the Friends page - nobody landing straight on
// the dashboard would ever discover it. This is a once-per-session popup
// (sessionStorage-gated, not shown every single visit) nudging toward that
// same reward, plus mentioning chests since finishing lessons regularly
// (which referring a study buddy encourages) is how weekly-quest chests get
// unlocked (see lib/chests.ts / CombinedRewardsWidget).
const SESSION_KEY = "thtcdn_referral_prompt_shown";

export default function ReferralPromptModal() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY)) return;

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      // Only bother users who haven't already invited anyone - repeat
      // referrers already know where ReferralCard lives on the Friends page.
      getMyReferralStats(user.id)
        .then((stats) => {
          if (stats.totalInvited === 0) {
            const timer = window.setTimeout(() => setOpen(true), 4000);
            return () => window.clearTimeout(timer);
          }
        })
        .catch(() => {});
    });
  }, []);

  function dismiss() {
    setOpen(false);
    if (typeof window !== "undefined") window.sessionStorage.setItem(SESSION_KEY, "1");
  }

  if (!open || !userId) return null;

  const link = `${window.location.origin}/login?ref=${userId}`;

  function handleCopy() {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success("Đã sao chép link mời!");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-stone-200 dark:border-stone-800 w-full max-w-sm p-6 relative">
        <button
          onClick={dismiss}
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
            onClick={dismiss}
            className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            Để sau
          </button>
          <Link
            href="/ban-be"
            onClick={dismiss}
            className="flex-1 px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold text-center hover:opacity-90 transition-opacity"
          >
            Xem thêm →
          </Link>
        </div>
      </div>
    </div>
  );
}
