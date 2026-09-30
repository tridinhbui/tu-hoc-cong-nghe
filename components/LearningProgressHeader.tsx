"use client";

import Link from "next/link";
import { ArrowRight, Lock, Trophy } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { getLevelByXp, getNextLevel, XP_PER_LESSON } from "@/lib/levels";

/**
 * Đầu trang /hoc-bai: vòng lặp học hiện ra ngay, không phải suy ra.
 *
 * VÌ SAO CÓ. Trang này mở đầu bằng một dãy thẻ - chào mừng, lộ trình, sổ tay,
 * góc yên tĩnh - rồi mới tới danh sách chặng, và trong danh sách ấy tiến độ là
 * một con số trần "1/20". Người học phải tự ghép: mình đang cấp mấy, còn bao
 * nhiêu XP nữa lên cấp, bài kế tiếp là bài nào, học xong thì được gì. Bốn câu
 * hỏi, không câu nào được trả lời ở một chỗ.
 *
 * Khối này trả lời cả bốn theo đúng thứ tự của vòng lặp:
 *
 *     học một bài  →  +XP  →  xong chặng  →  mở thử thách  →  lên cấp
 *
 * MỘT hành động, không phải một bảng điều khiển. Chỗ này cố ý chỉ có một nút
 * chính và một dòng phần thưởng đi kèm nó. Mọi thứ khác - chuỗi ngày, hoạt
 * động gần đây, bảng xếp hạng - thuộc về cột phải, nơi chúng đứng thứ yếu.
 *
 * KHÔNG TỰ LẤY DỮ LIỆU. Mọi con số vào đây qua props từ DashboardClient, nơi
 * chúng đã có sẵn. Một truy vấn thêm ở đây là một truy vấn nhân với toàn bộ
 * lưu lượng /hoc-bai - cùng lý lẽ đã ghi ở components/NotesShortcutCard.tsx.
 * Chuỗi ngày vì thế KHÔNG nằm ở đây mà ở cột phải, chỗ DashboardStreakWidget
 * vốn đã lấy nó rồi; kéo nó lên đây là trả tiền lần thứ hai cho cùng con số.
 */

export interface StageProgress {
  label: string;
  /** Tên hiển thị đã dịch. */
  name: string;
  total: number;
  done: number;
}

export interface NextMission {
  slug: string;
  title: string;
  /** Tên chặng chứa bài này, để nói "học xong chặng nào". */
  stageName: string;
}

export default function LearningProgressHeader({
  userXp,
  stages,
  nextMission,
}: {
  userXp: number;
  stages: StageProgress[];
  nextMission: NextMission | null;
}) {
  const { t } = useI18n();
  const p = t.progressHeader;

  const level = getLevelByXp(userXp);
  const nextLevel = getNextLevel(level.level);
  // Ở cấp cao nhất thì không còn mốc nào phía trước; thanh đầy và phần "còn bao
  // nhiêu XP nữa" biến mất thay vì hiện số 0 khó hiểu.
  const xpIntoLevel = userXp - level.minXp;
  const xpSpan = nextLevel ? nextLevel.minXp - level.minXp : 0;
  const levelPct = nextLevel ? Math.min(100, Math.round((xpIntoLevel / xpSpan) * 100)) : 100;
  const xpToNext = nextLevel ? Math.max(0, nextLevel.minXp - userXp) : 0;

  // Chặng ĐANG HỌC: chặng đầu tiên chưa xong. Nếu xong hết thì lấy chặng cuối,
  // để dòng mốc phía dưới không rỗng.
  const currentStage = stages.find((s) => s.total > 0 && s.done < s.total) ?? stages[stages.length - 1];
  const stageLeft = currentStage ? currentStage.total - currentStage.done : 0;
  const stagePct =
    currentStage && currentStage.total > 0
      ? Math.round((currentStage.done / currentStage.total) * 100)
      : 0;

  return (
    <section className="rounded-card bg-surface px-5 py-6 shadow-card sm:px-6">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        {/* ── Trái: mình đang ở đâu ─────────────────────────────────────── */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint">
              {format(p.levelLabel, { level: level.level })}
            </span>
            <h2 className="truncate text-xl font-black tracking-tight text-ink">
              {t.levelTitles[level.level] ?? level.name}
            </h2>
          </div>

          {/* Thanh cấp độ. Đây là thứ thay cho con số "1/20" ở mọi chỗ: một
              thanh nói được "còn bao xa" trong một cái liếc, con số thì phải
              đọc và chia. */}
          {/* Cấp độ là TIẾN TRÌNH PHẦN THƯỞNG (XP) nên đi màu vàng; tiến độ học
              (chặng, bài) đi xanh - logic màu chung ở globals.css. */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-reward-soft ring-1 ring-inset ring-reward-line/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-reward transition-[width] duration-500 ease-out"
              style={{ width: `${levelPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-semibold text-ink-muted">
            {nextLevel
              ? format(p.xpToNext, {
                  xp: xpToNext,
                  level: t.levelTitles[nextLevel.level] ?? nextLevel.name,
                })
              : p.maxLevel}
          </p>
        </div>

        {/* ── Phải: làm gì tiếp theo ────────────────────────────────────── */}
        <div className="lg:w-[26rem] lg:shrink-0">
          {nextMission ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-strong">
                {p.nextMission}
              </p>
              <p className="mt-1.5 text-[15px] font-bold leading-snug text-ink">
                {nextMission.title}
              </p>

              <Link
                href={`/bai-hoc/${nextMission.slug}`}
                className="mt-3.5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-brand-500 to-brand-600 px-5 py-3 text-sm font-black text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_8px_20px_-10px_rgb(41_97_184/0.8)] transition-[transform,background-color] hover:to-brand-700 motion-safe:hover:-translate-y-px"
              >
                {p.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* PHẦN THƯỞNG ĐI KÈM NÚT, không phải một thẻ riêng ở đâu đó.
                  Người học cần biết bấm vào thì được gì TRƯỚC khi bấm; đặt nó
                  cách nút ba khối là bắt họ tự nối hai thứ lại. */}
              <p className="mt-2.5 text-xs font-semibold text-ink-muted">
                <span className="font-bold text-reward-strong">{format(p.reward, { xp: XP_PER_LESSON })}</span>
                {currentStage && stageLeft > 0 && (
                  <>
                    {" · "}
                    {format(p.stageRemaining, {
                      count: stageLeft,
                      stage: currentStage.name,
                    })}
                  </>
                )}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold text-ink-muted">{p.allDone}</p>
          )}
        </div>
      </div>

      {/* ── Mốc: xong chặng này thì mở ra cái gì ───────────────────────── */}
      {currentStage && currentStage.total > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-control bg-surface-raised px-3.5 py-3">
          {stageLeft > 0 ? (
            <Lock className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
          ) : (
            <Trophy className="h-3.5 w-3.5 shrink-0 text-reward" />
          )}
          <p className="text-xs font-semibold text-ink-soft">
            {format(stageLeft > 0 ? p.milestoneLocked : p.milestoneReady, {
              stage: currentStage.name,
            })}
          </p>
          {/* Thanh nhỏ của riêng chặng, đặt cạnh câu mốc chứ không đứng rời:
              nó đo đúng khoảng cách tới cái mốc mà câu vừa nhắc tới. */}
          <span className="ml-auto flex items-center gap-2">
            <span className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-sunken">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400 transition-[width] duration-500 ease-out"
                style={{ width: `${stagePct}%` }}
              />
            </span>
            <span className="text-[11px] font-bold tabular-nums text-ink-muted">
              {stagePct}%
            </span>
          </span>
        </div>
      )}
    </section>
  );
}
