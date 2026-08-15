"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { translateApiError } from "@/lib/api-error-code";
import {
  Award,
  CheckCircle2,
  Gift,
  Loader2,
  Mic,
  Plus,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { COMPETENCIES, type CompetencyScore } from "@/lib/career-competency";
import { CERTIFICATION_TARGETS } from "@/lib/career-skill-gap";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import {
  CV_BULLET_MAX_LENGTH,
  CV_BULLET_MIN_LENGTH,
  addCvBullet,
  claimCareerMission,
  deleteCvBullet,
  fetchCareerProfile,
  type CareerProfileResponse,
} from "@/lib/career-profile";
import { recalculateUserStats } from "@/lib/supabase-user";
import MockInterviewModal from "@/components/MockInterviewModal";
import { useI18n } from "@/lib/i18n/context";
import { mergeCareer } from "@/lib/finance-careers-i18n";
import { format } from "@/lib/i18n";

// The three /su-nghiep career surfaces in one panel, because all three read
// from the same GET /api/career-profile response: the competency profile
// ("Kiến thức tài chính 72%..."), the Job Skill Gap against a chosen target,
// and the Weekly Career Mission list. Splitting them into three components
// would mean three fetches of the same aggregation.
//
// Everything rendered here is derived server-side; the panel holds no score
// state of its own, and every write (claim, CV bullet) is followed by a
// refetch rather than a local patch, so the numbers can't drift from what
// the next page load would show.

interface CareerProfilePanelProps {
  userId: string | null;
  /** Career currently open on the page - the default Job Skill Gap target. */
  careerId: string;
}

const SCORE_BY_ID = (scores: CompetencyScore[]) => new Map(scores.map((s) => [s.id, s]));

function Bar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(2, percent)}%`, background: color }}
      />
    </div>
  );
}

export default function CareerProfilePanel({ userId, careerId }: CareerProfilePanelProps) {
  const { t, locale } = useI18n();
  const [data, setData] = useState<CareerProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [targetId, setTargetId] = useState<string>(careerId);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [bulletDraft, setBulletDraft] = useState("");
  const [savingBullet, setSavingBullet] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);

  // Following the career the user clicks in the list keeps the gap panel
  // answering the question they're currently asking ("what if I went for
  // this one?") without a second selector to keep in sync.
  useEffect(() => setTargetId(careerId), [careerId]);

  const load = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setData(await fetchCareerProfile(targetId));
      setFailed(false);
    } catch (error) {
      console.error("Error loading career profile:", error);
      setFailed(true);
    }
    setLoading(false);
  }, [userId, targetId]);

  useEffect(() => {
    void load();
  }, [load]);

  const scores = useMemo(() => SCORE_BY_ID(data?.competencies ?? []), [data]);

  async function handleClaim(missionId: string) {
    setClaimingId(missionId);
    try {
      const res = await claimCareerMission(missionId);
      if (res.claimed) {
        toast.success(format(t.careerProfile.claimed, { xp: res.xpEarned, coins: res.coinEarned }));
        // XP is summed from the claim ledger rather than written by the
        // route, so the recalc is what actually moves the user's total.
        if (userId) await recalculateUserStats(userId).catch(() => {});
      }
      await load();
    } catch (error) {
      toast.error(translateApiError(t, error) ?? t.careerProfile.claimFailed);
    }
    setClaimingId(null);
  }

  async function handleAddBullet() {
    if (!userId) return;
    setSavingBullet(true);
    try {
      await addCvBullet(userId, targetId, bulletDraft);
      setBulletDraft("");
      toast.success(t.careerProfile.bulletSaved);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.careerProfile.bulletSaveFailed);
    }
    setSavingBullet(false);
  }

  async function handleDeleteBullet(id: number) {
    try {
      await deleteCvBullet(id);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.careerProfile.bulletDeleteFailed);
    }
  }

  if (!userId) {
    return (
      <div className="p-6 rounded-2xl border-2 border-dashed border-stone-200 dark:border-stone-800 text-center">
        <p className="text-sm font-bold text-stone-500 dark:text-stone-400">
          {t.careerProfile.signInPrompt}
        </p>
        <Link
          href="/login"
          className="inline-block mt-3 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black transition-colors"
        >
          {t.careerProfile.signIn}
        </Link>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="py-16 flex flex-col items-center gap-3 text-stone-500 dark:text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p className="text-xs font-bold">{t.careerProfile.computing}</p>
      </div>
    );
  }

  if (failed || !data) {
    return (
      <div className="py-12 flex flex-col items-center gap-3">
        <p className="text-sm font-bold text-stone-500 dark:text-stone-400">
          {t.careerProfile.loadFailed}
        </p>
        <button
          onClick={() => void load()}
          className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black cursor-pointer"
        >
          {t.careerProfile.retry}
        </button>
      </div>
    );
  }

  const { skillGap, missions, cvBullets } = data;

  return (
    <div className="space-y-8">
      {/* 1. Competency profile ------------------------------------------ */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            {t.careerProfile.title}
          </h3>
          <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500">
            {format(t.careerProfile.lessonsCompleted, { count: data.totalLessonsCompleted })}
          </span>
        </div>

        {/* HÀNG DỮ LIỆU, KHÔNG PHẢI THẺ CON.
            Sáu trục năng lực trước đây là sáu tấm thẻ bo 16px có viền và nền
            riêng, nằm trong một khối vốn đã là thẻ - và mỗi thẻ lại mang một
            màu riêng cho con số và thanh tiến độ, tức sáu màu cho sáu thứ cùng
            loại. Màu ở đó không phân biệt được gì mà chỉ nói "cái này quan
            trọng", sáu lần.
            Giờ mỗi trục là một hàng, ngăn nhau bằng một đường kẻ; con số căn
            phải làm cột số liệu đọc dọc được; thanh tiến độ dùng đúng một màu
            nhấn. */}
        <div className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
          {COMPETENCIES.map((competency) => {
            const score = scores.get(competency.id);
            return (
              <div key={competency.id} className="py-3.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {t.competencies[competency.id]?.label ?? competency.label}
                  </span>
                  <span className="text-base font-bold tabular-nums text-stone-900 dark:text-stone-100">
                    {score?.score ?? 0}%
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                  {t.competencies[competency.id]?.blurb ?? competency.blurb}
                </p>
                <div className="mt-2.5">
                  <Bar percent={score?.score ?? 0} color="#059669" />
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {(score?.parts ?? []).map((part) => (
                    <span key={part.key} className="text-[10px] font-bold text-stone-400 dark:text-stone-500">
                      {t.competencyParts[part.key] ?? part.label}:{" "}
                      <span className="text-stone-600 dark:text-stone-300">
                        {part.unit ? `${part.value} ${t.competencyUnits[part.unit] ?? part.unit}` : part.value}
                      </span>
                    </span>
                  ))}
                </div>
                <Link
                  href={competency.actionHref}
                  className="inline-block mt-3 text-[11px] font-black text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {t.competencies[competency.id]?.actionLabel ?? competency.actionLabel} →
                </Link>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setInterviewOpen(true)}
          // Chàm -> xanh lá. Trang này có nút chàm, hổ phách, xanh da trời và
          // hồng cho bốn hành động ngang cấp; bốn màu cho "đây là nút" thì màu
          // thôi không còn chỉ ra cái nào chính. Một nhấn duy nhất, dùng lại
          // đúng màu xanh của cả sản phẩm.
          className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          <Mic className="w-4 h-4" />
          {t.careerProfile.mockInterview}
        </button>
      </section>

      {/* 2. Job Skill Gap ------------------------------------------------ */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-violet-500" />
            {t.careerProfile.gapTitle}
          </h3>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-bold text-stone-700 dark:text-stone-200 cursor-pointer"
          >
            <optgroup label={t.careerProfile.groupCertifications}>
              {Object.entries(CERTIFICATION_TARGETS).map(([id, cert]) => (
                <option key={id} value={id}>
                  {cert.emoji} {cert.label}
                </option>
              ))}
            </optgroup>
            <optgroup label={t.careerProfile.groupCareers}>
              {FINANCE_CAREERS.map((career) => (
                <option key={career.id} value={career.id}>
                  {career.emoji} {mergeCareer(career, locale).title}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {!skillGap ? (
          <p className="text-sm font-bold text-stone-500 dark:text-stone-400">
            {t.careerProfile.pickGoal}
          </p>
        ) : (
          <>
            {/* Con số sẵn sàng: bỏ tấm nền tím. Cỡ chữ đã làm nó nổi bật hơn
                bất kỳ cái hộp nào, và màu tím ở đây không mang nghĩa gì - nó
                chỉ là màu thứ tư trên cùng một màn hình. */}
            <div className="flex items-baseline gap-4 border-b border-stone-200 pb-3 dark:border-stone-800">
              <span className="text-3xl font-bold tabular-nums text-stone-900 dark:text-stone-100">
                {skillGap.readiness}%
              </span>
              <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
                {t.careerProfile.readinessBody}
              </p>
            </div>

            {/* Từng mảng kỹ năng: hàng có đường kẻ thay cho thẻ. Trạng thái
                "đã đạt" do dấu tích và màu chữ nói, không cần cả một tấm nền
                xanh - nền màu cho mỗi mục đạt sẽ biến danh sách thành một dãy
                khối màu xen kẽ. */}
            <div className="mt-1 divide-y divide-stone-200 dark:divide-stone-800">
              {skillGap.items.map((item) => (
                <div key={item.domain} className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      {item.met && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {t.skillDomains[item.domain].label}
                      {item.priority === "must" && !item.met && (
                        <span className="px-1.5 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[9px] uppercase tracking-wider">
                          {t.careerProfile.required}
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] font-black tabular-nums text-stone-500 dark:text-stone-400 shrink-0">
                      {item.current}% / {item.target}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <Bar percent={item.current} color={item.met ? "#10b981" : "#7c3aed"} />
                  </div>
                  <p className="mt-2 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                    {item.met
                      ? format(t.careerProfile.requirementMet, { hint: t.skillDomains[item.domain].gapHint })
                      : format(t.careerProfile.requirementGap, { hint: t.skillDomains[item.domain].gapHint, count: item.lessonsToGo })}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* 3. Weekly Career Mission ---------------------------------------- */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            {t.careerProfile.missionsTitle}
          </h3>
          <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500">
            {missions.completedCount}/{missions.missions.length} · {missions.weekKey}
          </span>
        </div>

        <div className="space-y-2">
          {missions.missions.map((mission) => {
            const percent = Math.min(100, Math.round((mission.current / mission.target) * 100));
            return (
              <div
                key={mission.id}
                className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-black text-stone-900 dark:text-stone-100">{t.libData.careerMissions[mission.id as keyof typeof t.libData.careerMissions]?.title ?? mission.title}</p>
                    <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                      {t.libData.careerMissions[mission.id as keyof typeof t.libData.careerMissions]?.description ?? mission.description}
                    </p>
                  </div>
                  <span className="text-[11px] font-black tabular-nums text-stone-500 dark:text-stone-400 shrink-0">
                    {Math.min(mission.current, mission.target)}/{mission.target} {mission.unit}
                  </span>
                </div>

                <div className="mt-2.5">
                  <Bar percent={percent} color={mission.completed ? "#10b981" : "#f59e0b"} />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-black text-amber-600 dark:text-amber-400">
                    {format(t.careerProfile.missionReward, { xp: mission.xpReward, coins: mission.coinReward })}
                  </span>
                  {mission.claimed ? (
                    <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t.careerProfile.alreadyClaimed}
                    </span>
                  ) : mission.claimable ? (
                    <button
                      onClick={() => void handleClaim(mission.id)}
                      disabled={claimingId === mission.id}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white text-[11px] font-black inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {claimingId === mission.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Gift className="w-3.5 h-3.5" />
                      )}
                      {t.careerProfile.claim}
                    </button>
                  ) : mission.id === "mock_interview" ? (
                    <button
                      onClick={() => setInterviewOpen(true)}
                      className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-[11px] font-black transition-colors cursor-pointer"
                    >
                      {t.libData.careerMissions[mission.id as keyof typeof t.libData.careerMissions]?.ctaLabel ?? mission.ctaLabel}
                    </button>
                  ) : (
                    <Link
                      href={mission.href}
                      className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-[11px] font-black transition-colors"
                    >
                      {t.libData.careerMissions[mission.id as keyof typeof t.libData.careerMissions]?.ctaLabel ?? mission.ctaLabel}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-3 p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
            missions.perfectWeek.unlocked
              ? "border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10"
              : "border-dashed border-stone-200 dark:border-stone-800"
          }`}
        >
          <div>
            <p className="text-xs font-black text-stone-900 dark:text-stone-100">
              {format(t.careerProfile.perfectWeek, { xp: missions.perfectWeek.xpReward, coins: missions.perfectWeek.coinReward })}
            </p>
            <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
              {format(t.careerProfile.perfectWeekBody, { count: missions.missions.length })}
            </p>
          </div>
          {missions.perfectWeek.claimed ? (
            <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">{t.careerProfile.alreadyClaimed}</span>
          ) : (
            <button
              onClick={() => void handleClaim("perfect_week")}
              disabled={!missions.perfectWeek.claimable || claimingId === "perfect_week"}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-black transition-colors cursor-pointer"
            >
              {claimingId === "perfect_week" ? t.careerProfile.claiming : t.careerProfile.claim}
            </button>
          )}
        </div>
      </section>

      {/* 4. CV bullets ---------------------------------------------------- */}
      <section>
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 flex items-center gap-1.5 mb-3">
          <Plus className="w-4 h-4 text-sky-500" />
          {t.careerProfile.bulletsTitle}
        </h3>
        <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
          {t.careerProfile.bulletsHintPart1}
          <strong>{t.careerProfile.bulletsFormula}</strong>
          {t.careerProfile.bulletsHintPart2}
        </p>

        <textarea
          value={bulletDraft}
          onChange={(e) => setBulletDraft(e.target.value.slice(0, CV_BULLET_MAX_LENGTH))}
          rows={3}
          placeholder={t.careerProfile.bulletPlaceholder}
          className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/40 text-xs text-stone-800 dark:text-stone-200 leading-relaxed resize-none focus:outline-none focus:border-sky-400"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 tabular-nums">
            {format(t.careerProfile.bulletCounter, { count: bulletDraft.trim().length, max: CV_BULLET_MAX_LENGTH, min: CV_BULLET_MIN_LENGTH })}
          </span>
          <button
            onClick={() => void handleAddBullet()}
            disabled={savingBullet || bulletDraft.trim().length < CV_BULLET_MIN_LENGTH}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-black transition-colors cursor-pointer"
          >
            {savingBullet ? t.careerProfile.savingBullet : t.careerProfile.addBullet}
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {cvBullets.length === 0 ? (
            <p className="text-[11px] font-bold text-stone-400 dark:text-stone-500">
              {t.careerProfile.bulletsEmpty}
            </p>
          ) : (
            cvBullets.map((bullet) => (
              <div
                key={bullet.id}
                className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/40 flex items-start gap-3"
              >
                <p className="flex-1 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {bullet.content}
                </p>
                <button
                  onClick={() => void handleDeleteBullet(bullet.id)}
                  aria-label={t.careerProfile.deleteBulletAria}
                  className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-rose-500 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {interviewOpen && (
        <MockInterviewModal
          userId={userId}
          onClose={() => setInterviewOpen(false)}
          onFinished={() => void load()}
        />
      )}
    </div>
  );
}
