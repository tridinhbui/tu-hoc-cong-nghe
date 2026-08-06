"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Gift, Copy, Check } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getMyReferralStats, REFERRER_BONUS_XP, REFERRED_BONUS_XP, type MyReferralStats } from "@/lib/referrals";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// "Mời bạn học cùng" - both sides get a one-time XP bonus once the invited
// person completes their first lesson (see lib/referrals.ts for the
// anti-abuse reasoning: gated on real engagement, not just a signup).
export default function ReferralCard() {
  const { t } = useI18n();
  const [userId, setUserId] = useState<string | null>(null);
  const [stats, setStats] = useState<MyReferralStats>({ totalInvited: 0, totalRewarded: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      getMyReferralStats(user.id)
        .then(setStats)
        .catch((err) => console.error("Error loading referral stats:", err));
    });
  }, []);

  if (!userId) return null;

  const link = `${window.location.origin}/login?ref=${userId}`;

  function handleCopy() {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success(t.referralCard.copyToast);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShareFacebook() {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    window.open(shareUrl, "_blank", "width=600,height=520,noopener,noreferrer");
  }

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-1.5">
        <Gift className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest">
          {t.referralCard.title}
        </h2>
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        {t.referralCard.descPart1}{" "}
        <span className="font-bold text-emerald-600 dark:text-emerald-400">{format(t.referralCard.descBonus, { xp: REFERRER_BONUS_XP })}</span>
        {t.referralCard.descPart2}{" "}
        <span className="font-bold text-emerald-600 dark:text-emerald-400">{format(t.referralCard.descBonus, { xp: REFERRED_BONUS_XP })}</span>{" "}
        {t.referralCard.descPart3}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <input
          readOnly
          value={link}
          onClick={(e) => e.currentTarget.select()}
          className="flex-1 min-w-0 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-2.5 text-stone-600 dark:text-stone-400 truncate"
        />
        <button
          onClick={handleCopy}
          title={t.referralCard.copyButtonTitle}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <button
        onClick={handleShareFacebook}
        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-bold transition-colors hover:brightness-110"
        style={{ backgroundColor: "#1877F2" }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
        </svg>
        {t.referralCard.shareFacebook}
      </button>

      {stats.totalInvited > 0 && (
        <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-3 text-center">
          {t.referralCard.invitedPrefix} <span className="font-bold text-stone-600 dark:text-stone-300">{stats.totalInvited}</span> {t.referralCard.invitedUnit}
          {stats.totalRewarded > 0 && (
            <>
              {" · "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{stats.totalRewarded}</span> {t.referralCard.rewardedUnit}
            </>
          )}
        </p>
      )}
    </div>
  );
}
