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
    <div className="rounded-md border border-line-strong border-l-2 border-l-amber-500 bg-white dark:bg-stone-900 dark:border-l-amber-400 overflow-hidden">
      <div className="px-4 py-3 border-b border-line-strong bg-surface-raised dark:bg-stone-950 flex items-center gap-2">
        <Inbox className="w-4 h-4 text-warn-strong" />
        <h2 className="font-bold text-sm text-ink-max">
          {format(tu.pendingTitle, { count: requests.length })}
        </h2>
      </div>
      <div className="divide-y divide-line">
        {requests.map((req) => (
          <div key={req.id} className="p-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">
                {req.user_name ?? req.user_email} {tu.requestPart1}{req.lesson_title}{tu.requestPart2}
              </p>
              {req.note && <p className="text-xs text-ink-soft mt-1">&ldquo;{req.note}&rdquo;</p>}
              <p className="text-[11px] text-ink-faint mt-1">
                {new Date(req.created_at).toLocaleString(intlLocale(locale))}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handle(req.id, true)}
                disabled={processingId === req.id}
                aria-label={tu.approve}
                className="p-2 rounded-sm border border-brand-600 text-accent-strong hover:bg-accent-soft disabled:opacity-50 cursor-pointer dark:border-brand-400"
                title={tu.approve}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handle(req.id, false)}
                disabled={processingId === req.id}
                aria-label={tu.reject}
                className="p-2 rounded-sm border border-red-600 text-danger hover:bg-danger-soft disabled:opacity-50 cursor-pointer dark:border-red-400"
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
