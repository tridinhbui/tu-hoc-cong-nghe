"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UserPlus, UserCheck } from "lucide-react";
import { followUser, unfollowUser } from "@/lib/cloudflare-follows";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, btnSecondary } from "@/components/ui/system";

interface FollowButtonProps {
  currentUserId: string;
  targetUserId: string;
  initialFollowing: boolean;
  /** "sm" for inline use next to a name in a post card; "md" for the
   *  profile page header, which has room to spare. */
  size?: "sm" | "md";
  /** Following affects every post by this author currently in view, not
   *  just the one the click came from - the caller uses this to sync all of
   *  them instead of just the row that owns this particular button. */
  onChange?: (following: boolean) => void;
}

export default function FollowButton({ currentUserId, targetUserId, initialFollowing, size = "sm", onChange }: FollowButtonProps) {
  const { t } = useI18n();
  const [following, setFollowing] = useState(initialFollowing);
  const [busy, setBusy] = useState(false);

  // Real-time feed refreshes hand down a fresh `is_following` on every
  // re-render - không nhận lại thì một `following` cũ do bấm lạc quan để lại
  // sẽ trôi khỏi trạng thái thật trên server.
  //
  // Chỉnh ngay trong lúc render thay vì trong effect: React thấy setState của
  // chính component đang render thì dựng lại luôn trước khi vẽ, nên người
  // dùng không bao giờ thấy khung hình mang giá trị cũ. Bản dùng effect thì
  // có - nó vẽ giá trị cũ một lần rồi mới sửa.
  const [syncedProp, setSyncedProp] = useState(initialFollowing);
  if (syncedProp !== initialFollowing) {
    setSyncedProp(initialFollowing);
    setFollowing(initialFollowing);
  }

  if (currentUserId === targetUserId) return null;

  const handleClick = async () => {
    if (busy) return;
    const next = !following;
    setBusy(true);
    setFollowing(next);
    onChange?.(next);
    try {
      if (next) {
        await followUser(currentUserId, targetUserId);
      } else {
        await unfollowUser(currentUserId, targetUserId);
      }
    } catch (error) {
      // Roll back - the toggle above was optimistic.
      setFollowing(!next);
      onChange?.(!next);
      toast.error(error instanceof Error ? error.message : t.miscUi.followButton.genericError);
    } finally {
      setBusy(false);
    }
  };

  const Icon = following ? UserCheck : UserPlus;
  const isSmall = size === "sm";

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={busy}
      className={
        isSmall
          ? `inline-flex items-center gap-1 rounded-sm border px-2.5 py-1 text-[11px] font-bold transition-colors disabled:opacity-50 cursor-pointer ${
              following
                ? "border-line-strong text-ink-muted hover:border-line-firm"
                : "border-stone-950 bg-stone-950 text-white hover:border-brand-700 hover:bg-brand-700 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950 dark:hover:border-brand-300 dark:hover:bg-brand-300"
            }`
          : `${following ? btnSecondary : btnPrimary} cursor-pointer`
      }
    >
      <Icon className={isSmall ? "h-3 w-3" : "h-4 w-4"} />
      {following ? t.miscUi.followButton.following : t.miscUi.followButton.follow}
    </button>
  );
}
