"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TrendingUp, TrendingDown, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { recordCustomGameSession, MAX_GAME_XP_PER_TYPE } from "@/lib/games";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { btnSecondary } from "@/components/ui/system";

interface BackboneRoutingWidgetProps {
  userId: string;
}

// Mô phỏng của toà "Trung Tâm Xương Sống Internet" (id `backbone-hub`;
// id cũ được ánh xạ ở lib/legacy-ids.ts). Một cần gạt duy nhất - tỷ lệ lưu lượng chuyển
// sang tuyến dự phòng - kéo hai chỉ số theo hai hướng ngược nhau: chuyển nhiều
// thì tuyến chính hết nghẽn (mất gói giảm) nhưng đường vòng dài hơn (độ trễ
// tăng). Cửa sổ đạt cả hai mục tiêu hẹp, khoảng 38-44%, nên đẩy hết sang dự
// phòng cũng thua như không làm gì.
const START_LOSS = 6.5;
const LOSS_TARGET = 1.0;
const LATENCY_TARGET = 120;
const LINK_GBPS = 400;

function lossAt(reroute: number, turns: number): number {
  return Math.max(0.2, +(START_LOSS - reroute * 0.14 - turns * 0.05).toFixed(1));
}

function latencyAt(reroute: number, loss: number): number {
  // Mất gói kéo theo gửi lại, nên nó cũng cộng vào độ trễ.
  return Math.round(80 + reroute * 0.9 + Math.max(0, loss - 1) * 6);
}

export default function BackboneRoutingWidget({ userId }: BackboneRoutingWidgetProps) {
  const { t } = useI18n();
  const tr = t.backboneSim;
  const [reroute, setReroute] = useState<number>(0);
  const [loss, setLoss] = useState<number>(START_LOSS);
  const [latency, setLatency] = useState<number>(latencyAt(0, START_LOSS));
  const [turns, setTurns] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const delivered = Math.round(LINK_GBPS * (1 - loss / 100));

  const handleAdjust = (delta: number) => {
    const next = Math.max(0, Math.min(100, reroute + delta));
    const nextTurns = turns + 1;
    const nextLoss = lossAt(next, nextTurns);
    const nextLatency = latencyAt(next, nextLoss);

    setReroute(next);
    setLoss(nextLoss);
    setLatency(nextLatency);
    setTurns(nextTurns);

    if (nextLoss <= LOSS_TARGET && nextLatency <= LATENCY_TARGET && !completed) {
      setCompleted(true);
      toast.success(format(tr.toastSuccess, { xp: MAX_GAME_XP_PER_TYPE }));
      // Qua sổ ván game (ván tốt nhất, trần 50) - gọi thẳng addXpToUser thì XP
      // bị xoá ở lần recalculateUserStats kế tiếp.
      if (userId) void recordCustomGameSession(userId, "backbone-routing", 1, 1, MAX_GAME_XP_PER_TYPE);
    }
  };

  const handleReset = () => {
    setReroute(0);
    setLoss(START_LOSS);
    setLatency(latencyAt(0, START_LOSS));
    setTurns(0);
    setCompleted(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-stone-900 text-ink rounded-md border border-line-strong space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-sm overflow-hidden relative border border-line-strong shrink-0">
            <Image src="/rpg/silicon_valley.png" alt={tr.buildingAlt} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm text-ink-soft border border-line-strong">
                {tr.eyebrow}
              </span>
              {completed && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm text-accent-strong border border-brand-600/40">
                  {tr.completedBadge}
                </span>
              )}
            </div>
            <h3 className="text-xl font-black tracking-tight text-ink-max mt-1">{tr.title}</h3>
            <p className="text-xs text-ink-muted">{tr.subtitle}</p>
          </div>
        </div>

        <button onClick={handleReset} className={`${btnSecondary} self-start sm:self-auto cursor-pointer`}>
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{tr.resetButton}</span>
        </button>
      </div>

      <div className="bg-surface-raised dark:bg-stone-950 border border-line-strong rounded-md p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-ink-muted shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-ink-max uppercase tracking-wider">{tr.objectiveLabel}</p>
          <p className="text-ink-body leading-relaxed font-semibold">
            {tr.objectivePart1}
            <strong className="font-mono tabular-nums text-alert">{START_LOSS.toFixed(1)}%</strong>
            {tr.objectivePart2}
            <strong className="font-mono tabular-nums text-accent">{LOSS_TARGET.toFixed(1)}%</strong>
            {tr.objectivePart3}
            <strong className="font-mono tabular-nums text-accent">{format(tr.latencyValue, { value: LATENCY_TARGET })}</strong>
            {tr.objectivePart4}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-page dark:bg-stone-950 p-4.5 rounded-md border border-line-strong flex flex-col justify-between">
          <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{tr.rerouteLabel}</span>
          <div className="my-2">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-medium text-ink-max">{reroute}%</span>
          </div>
          <span className="text-[10px] text-ink-muted font-medium">{tr.rerouteDesc}</span>
        </div>

        <div className="bg-page dark:bg-stone-950 p-4.5 rounded-md border border-line-strong flex flex-col justify-between">
          <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{tr.lossLabel}</span>
          <div className="my-2">
            <span className={`font-mono tabular-nums text-2xl sm:text-3xl font-medium ${loss <= LOSS_TARGET ? "text-accent" : "text-alert"}`}>
              {loss.toFixed(1)}%
            </span>
          </div>
          <span className="text-[10px] text-ink-muted font-medium">{tr.lossTarget}</span>
        </div>

        <div className="bg-page dark:bg-stone-950 p-4.5 rounded-md border border-line-strong flex flex-col justify-between">
          <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{tr.latencyLabel}</span>
          <div className="my-2">
            <span className={`font-mono tabular-nums text-2xl sm:text-3xl font-medium ${latency <= LATENCY_TARGET ? "text-accent" : "text-alert"}`}>
              {format(tr.latencyValue, { value: latency })}
            </span>
          </div>
          <span className="text-[10px] text-ink-muted font-medium">{tr.latencyTarget}</span>
        </div>

        <div className="bg-page dark:bg-stone-950 p-4.5 rounded-md border border-line-strong flex flex-col justify-between">
          <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{tr.throughputLabel}</span>
          <div className="my-2">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-medium text-ink-max">{format(tr.throughputValue, { value: delivered })}</span>
          </div>
          <span className="text-[10px] text-ink-muted font-medium">{tr.throughputDesc}</span>
        </div>
      </div>

      <div className="bg-page dark:bg-stone-950 p-5 rounded-md border border-line-strong space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-ink-max tracking-wider">{tr.controlLabel}</span>
          <span className="text-xs text-ink-muted font-mono tabular-nums">{format(tr.turnsCount, { turns })}</span>
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button onClick={() => handleAdjust(-10)} className={`${btnSecondary} cursor-pointer`}>
            <TrendingDown className="w-4 h-4" />
            <span>{tr.decreaseLarge}</span>
          </button>
          <button onClick={() => handleAdjust(-5)} className={`${btnSecondary} cursor-pointer`}>
            <TrendingDown className="w-4 h-4" />
            <span>{tr.decreaseSmall}</span>
          </button>
          <button onClick={() => handleAdjust(5)} className={`${btnSecondary} cursor-pointer`}>
            <TrendingUp className="w-4 h-4" />
            <span>{tr.increaseSmall}</span>
          </button>
          <button onClick={() => handleAdjust(10)} className={`${btnSecondary} cursor-pointer`}>
            <TrendingUp className="w-4 h-4" />
            <span>{tr.increaseLarge}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
