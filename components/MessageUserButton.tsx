"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MessageCircle, UserPlus, Check, Clock } from "lucide-react";
import { getCurrentUserId } from "@/lib/current-user";
import { getMySocialGraph, respondToFriendRequest, sendFriendRequest, type SocialConnection } from "@/lib/supabase-social";
import { useI18n } from "@/lib/i18n/context";

// Public profile pages (reached from the leaderboard / "nguoi-hoc") had no
// way to message someone - only a read-only stat sheet. Messaging still
// requires an accepted friendship (see 20260713_social_friends_and_messages.sql's
// RLS: direct_messages only allows insert/select when the friendship status
// is 'accepted'), so this button drives that flow inline instead of sending
// the user to /ban-be empty-handed: friend already -> straight to chat,
// they'd already invited you -> one click accepts + opens chat, nobody's
// asked yet -> sends the request (auto-accepts if it turns out they'd
// already invited you first) and lands on /ban-be to show the pending state.
export default function MessageUserButton({ targetUserId }: { targetUserId: string }) {
  const { t } = useI18n();
  const router = useRouter();
  const [connection, setConnection] = useState<SocialConnection | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getMySocialGraph()
      .then((graph) => {
        if (cancelled) return;
        setConnection(graph.find((c) => c.user_id === targetUserId) ?? null);
      })
      .catch(() => {
        if (!cancelled) setConnection(null);
      });
    return () => {
      cancelled = true;
    };
  }, [targetUserId]);

  async function handleMessage() {
    if (busy) return;
    setBusy(true);
    try {
      const userId = await getCurrentUserId();
      if (!userId) return;

      if (connection?.direction === "friend") {
        router.push(`/ban-be?with=${targetUserId}`);
        return;
      }

      if (connection?.direction === "incoming") {
        await respondToFriendRequest(connection.friendship_id, "accepted");
        toast.success(t.miscUi.messageUserButton.acceptedInviteToast);
        router.push(`/ban-be?with=${targetUserId}`);
        return;
      }

      if (connection?.direction === "outgoing") {
        router.push(`/ban-be?with=${targetUserId}`);
        return;
      }

      const result = await sendFriendRequest(userId, targetUserId);
      toast.success(result.status === "accepted" ? t.miscUi.messageUserButton.becameFriendsToast : t.miscUi.messageUserButton.requestSentToast);
      router.push(`/ban-be?with=${targetUserId}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.miscUi.messageUserButton.startFailedError);
    } finally {
      setBusy(false);
    }
  }

  if (connection === undefined) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-600"
      >
        <MessageCircle className="w-4 h-4" />
        {t.miscUi.messageUserButton.message}
      </button>
    );
  }

  const label =
    connection?.direction === "friend"
      ? t.miscUi.messageUserButton.message
      : connection?.direction === "incoming"
        ? t.miscUi.messageUserButton.acceptAndMessage
        : connection?.direction === "outgoing"
          ? t.miscUi.messageUserButton.requestSent
          : t.miscUi.messageUserButton.friendToMessage;

  const Icon = connection?.direction === "friend" ? MessageCircle : connection?.direction === "incoming" ? Check : connection?.direction === "outgoing" ? Clock : UserPlus;

  return (
    <button
      onClick={handleMessage}
      disabled={busy}
      className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 transition-opacity disabled:opacity-60"
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
