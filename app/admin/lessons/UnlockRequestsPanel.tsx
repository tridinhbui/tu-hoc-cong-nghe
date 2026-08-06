"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X, Inbox } from "lucide-react";
import type { UnlockRequestRow } from "@/lib/admin/unlock-requests";
import { resolveUnlockRequestAction } from "./actions";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

export default function UnlockRequestsPanel({ requests }: { requests: UnlockRequestRow[] }) {
  const router = useRouter();
  const { t, locale } = useI18n();
  const tu = t.adminThree.unlockRequestsPanel;
  const [processingId, setProcessingId] = useState<number | null>(null);

  async function handle(id: number, approve: boolean) {
    setProcessingId(id);
    try {
      await resolveUnlockRequestAction(id, approve);
      toast.success(approve ? tu.unlockApproved : tu.unlockRejected);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tu.genericError);
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900/50 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-amber-200 dark:border-amber-900/50 flex items-center gap-2">
        <Inbox className="w-4 h-4 text-amber-700 dark:text-amber-400" />
        <h2 className="font-bold text-sm text-amber-900 dark:text-amber-300">
          {format(tu.pendingTitle, { count: requests.length })}
        </h2>
      </div>
      <div className="divide-y divide-amber-200 dark:divide-amber-900/50">
        {requests.map((req) => (
          <div key={req.id} className="p-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {req.user_name ?? req.user_email} {tu.requestPart1}{req.lesson_title}{tu.requestPart2}
              </p>
              {req.note && <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">&ldquo;{req.note}&rdquo;</p>}
              <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
                {new Date(req.created_at).toLocaleString(intlLocale(locale))}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handle(req.id, true)}
                disabled={processingId === req.id}
                className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900 disabled:opacity-50"
                title={tu.approve}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handle(req.id, false)}
                disabled={processingId === req.id}
                className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900 disabled:opacity-50"
                title={tu.reject}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
