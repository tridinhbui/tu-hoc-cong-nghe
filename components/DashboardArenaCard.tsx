"use client";

import Link from "next/link";
import { Dices, Swords, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { trackFeatureClick } from "@/lib/feature-events";

/** Ba lối vào "thử sức", ở cột phải dashboard dưới băng chuyền người đang học.
 *
 *  VÌ SAO. Hai trong ba lối này đã CHẾT trong mã: DashboardClient vẫn dựng
 *  <BossBattleModal> và <PvpDuelModal>, nhưng `setShowBossBattle(true)` và
 *  `setShowPvpModal(true)` không được gọi ở đâu cả - chúng mất lối vào lúc thẻ
 *  mini-game bị gỡ khỏi dashboard, và không có gì báo, vì một state không bao
 *  giờ thành `true` vẫn biên dịch bình thường.
 *
 *  Cái thứ ba, quiz ngẫu nhiên, chưa bao giờ chết nhưng chỉ tới được qua thanh
 *  điều hướng.
 *
 *  Boss và solo mở modal NGAY TẠI dashboard chứ không điều hướng đi: cả hai
 *  modal đã nằm sẵn trong cây của trang này, nên đẩy người học sang /game rồi
 *  bắt họ tìm lại là thêm hai bước cho cùng một việc. Quiz thì ngược lại - nó
 *  là cả một trang có phần chọn lộ trình và độ khó, nên nó là <Link>. */

interface DashboardArenaCardProps {
  onOpenBoss: () => void;
  onOpenPvp: () => void;
}

export default function DashboardArenaCard({ onOpenBoss, onOpenPvp }: DashboardArenaCardProps) {
  const { t } = useI18n();

  const rowClass =
    "group flex w-full items-center gap-3 rounded-2xl bg-stone-50 px-3 py-2.5 text-left transition-colors hover:bg-stone-100 dark:bg-stone-950/50 dark:hover:bg-stone-800/60";

  return (
    <div className="mt-4 rounded-[24px] border border-stone-200/90 bg-white/95 p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="mb-3">
        <p className="text-[13px] font-extrabold text-stone-900 dark:text-stone-100">
          {t.dashboardArena.title}
        </p>
        <p className="text-[10px] text-stone-500 dark:text-stone-400">
          {t.dashboardArena.subtitle}
        </p>
      </div>

      <div className="space-y-1.5">
        <Link
          href="/kiem-tra"
          onClick={() => trackFeatureClick("dashboard_arena_click", { label: "quiz" })}
          className={rowClass}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
            <Dices className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-bold text-stone-800 dark:text-stone-200">
              {t.dashboardArena.quizTitle}
            </span>
            <span className="block truncate text-[10px] text-stone-500 dark:text-stone-400">
              {t.dashboardArena.quizSub}
            </span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => {
            trackFeatureClick("dashboard_arena_click", { label: "boss" });
            onOpenBoss();
          }}
          className={rowClass}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
            <Swords className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-bold text-stone-800 dark:text-stone-200">
              {t.dashboardArena.bossTitle}
            </span>
            <span className="block truncate text-[10px] text-stone-500 dark:text-stone-400">
              {t.dashboardArena.bossSub}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            trackFeatureClick("dashboard_arena_click", { label: "solo" });
            onOpenPvp();
          }}
          className={rowClass}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
            <Users className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-bold text-stone-800 dark:text-stone-200">
              {t.dashboardArena.soloTitle}
            </span>
            <span className="block truncate text-[10px] text-stone-500 dark:text-stone-400">
              {t.dashboardArena.soloSub}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
