"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Code2, GraduationCap, Loader2, MessagesSquare, ShieldCheck, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { panel, textLink } from "@/components/ui/system";
import CoCoSays from "@/components/CoCoSays";
import { EVIDENCE_SOURCES, type EvidenceSource, type SkillScore } from "@/lib/practical-skill";

/**
 * Năng lực thực hành theo lĩnh vực: Frontend 64%, Data 31%, ...
 *
 * Tự fetch GET /api/skill-evidence. Con số chỉ đến từ bằng chứng (lib/practical-skill.ts),
 * không từ việc đọc bài - nên trạng thái rỗng giải thích cách làm cho thanh nhích,
 * chứ không bảo "học thêm bài".
 *
 * Chưa đăng nhập (401) thì không hiện gì.
 */

interface Props {
  /** Tăng lên để panel tải lại (sau một lượt nộp bài chẳng hạn). */
  refreshKey?: number;
  /** Ẩn khối "Tăng bằng cách nào" khi đã có bằng chứng - hợp với chỗ hẹp. */
  compact?: boolean;
  /** Thu gọn mặc định: chỉ tiêu đề và một dòng tóm tắt (hai lĩnh vực cao
   *  nhất), phần giải thích, các thanh và "Tăng bằng cách nào" nằm sau nút
   *  "Xem chi tiết". Lựa chọn mở/đóng được nhớ trong localStorage. Dashboard
   *  bật cờ này; mặc định tắt. */
  collapsible?: boolean;
  className?: string;
}

const OPEN_KEY = "thtcdn_dashboard_skill_open";
const subscribeNoop = () => () => {};
function readOpen(): boolean {
  try {
    return window.localStorage.getItem(OPEN_KEY) === "1";
  } catch {
    return false;
  }
}

const SOURCE_ICON: Record<EvidenceSource, typeof Code2> = {
  exercise: Code2,
  tool: Wrench,
  interview: MessagesSquare,
  cert: ShieldCheck,
  stage_exam: GraduationCap,
};

const SOURCE_LINK: Partial<Record<EvidenceSource, { href: string; key: "tools" | "interview" | "certs" | "stageExam" }>> = {
  tool: { href: "/cong-cu", key: "tools" },
  interview: { href: "/phong-van-ky-thuat", key: "interview" },
  cert: { href: "/chung-chi", key: "certs" },
  stage_exam: { href: "/thi-vuot-chang", key: "stageExam" },
};

export default function PracticalSkillPanel({ refreshKey = 0, compact = false, collapsible = false, className = "" }: Props) {
  const { t } = useI18n();
  const c = t.practicalSkill;
  // Đọc lựa chọn đã lưu qua useSyncExternalStore: máy chủ luôn thấy "đóng",
  // trình duyệt đọc localStorage sau hydrate - không lệch HTML.
  const storedOpen = useSyncExternalStore(subscribeNoop, readOpen, () => false);
  const [openOverride, setOpenOverride] = useState<boolean | null>(null);
  const detailsOpen = !collapsible || (openOverride ?? storedOpen);
  const toggleDetails = () => {
    const next = !(openOverride ?? storedOpen);
    setOpenOverride(next);
    try {
      window.localStorage.setItem(OPEN_KEY, next ? "1" : "0");
    } catch {
      // Không lưu được thì lựa chọn chỉ sống trong phiên này.
    }
  };
  const [state, setState] = useState<"loading" | "ready" | "error" | "guest">("loading");
  const [areas, setAreas] = useState<SkillScore[]>([]);
  const [total, setTotal] = useState(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/skill-evidence", { cache: "no-store" });
      if (res.status === 401) {
        setState("guest");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const body = (await res.json()) as { areas: SkillScore[]; total: number };
      setAreas(Array.isArray(body.areas) ? body.areas : []);
      setTotal(Number(body.total) || 0);
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- tải dữ liệu từ API sau khi gắn, và mỗi lần refreshKey đổi
    void load();
  }, [load, refreshKey]);

  if (state === "guest") return null;

  const empty = state === "ready" && total === 0;
  const topAreas = [...areas].filter((a) => a.percent > 0).sort((a, b) => b.percent - a.percent).slice(0, 2);

  return (
    <section className={`${compact ? "" : `${panel} p-4 sm:p-5`} ${className}`} aria-labelledby="practical-skill-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="practical-skill-title" className={collapsible ? "text-sm font-semibold text-ink-body" : compact ? "text-sm font-bold text-ink-body" : "text-base font-black text-ink-max"}>
          {c.title}
        </h2>
        {state === "ready" && (total > 0 || collapsible) && (
          <span className="font-mono text-xs text-ink-faint">{format(c.evidenceCount, { count: total })}</span>
        )}
      </div>
      {collapsible && !detailsOpen && state === "ready" && topAreas.length > 0 && (
        <p className="mt-1 truncate text-xs text-ink-muted">
          {topAreas.map((a) => `${c.areas[a.area]} ${a.percent}%`).join(" · ")}
        </p>
      )}
      {collapsible && state === "ready" && (
        <button
          type="button"
          onClick={toggleDetails}
          aria-expanded={detailsOpen}
          className="mt-1.5 inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-ink-faint transition-colors hover:text-ink-body"
        >
          {detailsOpen ? t.revampDashboard.hideDetails : t.revampDashboard.showDetails}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${detailsOpen ? "rotate-180" : ""}`} aria-hidden />
        </button>
      )}
      {!empty && detailsOpen && <p className={`mt-1 text-ink-muted ${compact ? "text-xs" : "text-sm"}`}>{c.subtitle}</p>}

      {state === "loading" && (
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-muted" role="status">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {c.loading}
        </p>
      )}

      {state === "error" && (
        <div className="mt-4 flex items-center gap-3 text-sm text-ink-muted">
          <span>{c.error}</span>
          <button type="button" onClick={() => void load()} className={textLink}>
            {c.retry}
          </button>
        </div>
      )}

      {empty && detailsOpen && (
        <div className="mt-3">
          <CoCoSays lines={c.emptyLines} size={compact ? 32 : 40} quiet={collapsible} />
        </div>
      )}

      {state === "ready" && detailsOpen && (
        <ul className="mt-4 space-y-2.5">
          {areas.map((a) => {
            const parts = EVIDENCE_SOURCES.filter((s) => a.counts[s] > 0).map((s) =>
              format(c.sourceCount, { count: a.counts[s], source: c.sources[s] })
            );
            const label = c.areas[a.area];
            return (
              <li key={a.area}>
                <div className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3">
                  <span className={`truncate text-sm font-bold ${a.percent > 0 ? "text-ink-body" : "text-ink-faint"}`}>{label}</span>
                  <div
                    className="h-1.5 bg-surface-sunken"
                    role="progressbar"
                    aria-label={label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={a.percent}
                  >
                    <div className="h-full bg-cyan-400 transition-[width] duration-500 dark:bg-cyan-600" style={{ width: `${a.percent}%` }} />
                  </div>
                  <span className={`text-right font-mono text-sm tabular-nums ${a.percent > 0 ? "text-ink-muted" : "text-ink-faint"}`}>
                    {a.percent}%
                  </span>
                </div>
                {parts.length > 0 && <p className="mt-0.5 pl-[7.25rem] text-xs text-ink-faint">{parts.join(" · ")}</p>}
              </li>
            );
          })}
        </ul>
      )}

      {state === "ready" && detailsOpen && (empty || !compact || collapsible) && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">{c.howTitle}</p>
          <ul className="mt-2 space-y-1.5">
            {EVIDENCE_SOURCES.map((s) => {
              const Icon = SOURCE_ICON[s];
              const link = SOURCE_LINK[s];
              return (
                <li key={s} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink">
                  <Icon className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                  <span>{c.how[s]}</span>
                  {link && (
                    <Link href={link.href} className={textLink}>
                      {c.links[link.key]}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          {!empty && <p className="mt-3 text-xs text-ink-muted">{c.capNote}</p>}
        </div>
      )}
    </section>
  );
}
