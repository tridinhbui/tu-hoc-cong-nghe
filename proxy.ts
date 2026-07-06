import { NextRequest, NextResponse } from "next/server";
import { isLessonLockedForUser } from "@/lib/lesson-locking";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// A handful of lessons are hand-authored as their own static page
// (app/bai-hoc/<slug>/page.tsx, e.g. "roic", "walmart-earnings",
// "vingroup-cash-flow") instead of going through the data-driven
// app/bai-hoc/[slug]/page.tsx route. Next.js resolves the static route
// first, so [slug]'s own server-side lock check (lib/lesson-locking.ts)
// never runs for these — they would otherwise ship full lesson content to
// anyone who requests the URL, locked or not, logged in or not.
//
// This is the only place that can catch it before the static page renders.
// Scoped to just this known list (not every /bai-hoc/* request) so the
// common case — lessons served by [slug], which already checks itself —
// doesn't pay for a second DB round trip per page view.
//
// Maintenance note: if a new lesson is hand-coded as its own static page
// under app/bai-hoc/<slug>/ AND is not isFundamental (i.e. meant to be
// locked behind a prerequisite), its slug + numeric lesson id must be added
// here too, or its lock is purely cosmetic on the dashboard.
const STATIC_PAGE_LESSON_IDS: Record<string, number> = {
  "bds-business-model": 1028,
  "bitcoin-crypto": 1025,
  "cap-rate": 1009,
  "commodity": 261,
  "commodity-phan-2": 1005,
  "discontinued-operations": 1001,
  "disney-pixar-ma": 1021,
  "dividend": 1017,
  "dupont-analysis": 1016,
  "enterprise-value": 1008,
  "fcf-deep-dive": 1035,
  "finance-as-math": 1033,
  "financial-risk": 1029,
  "fpt-cfo-cash": 1023,
  "hoc-tai-chinh-hanh-trinh": 1030,
  "income-affiliates-jv": 1011,
  "interim-comprehensive-income": 1012,
  "inventory-turnover": 1019,
  "maple-leaf-leverage": 1014,
  "market-fair-value": 1006,
  "modern-portfolio-theory": 1032,
  "nvidia-cash-securities": 1022,
  "oil-gas-business-model": 1024,
  "on-tap-wacc": 1002,
  "operating-leverage": 1010,
  "post-ipo-dividend": 1020,
  "pvgas-bad-debt": 1026,
  "retail-store-analysis": 1027,
  "roic": 1003,
  "roic-phan-2": 1004,
  "samsung-ai-finance": 1034,
  "tesla-cash-flow": 1015,
  "transfer-pricing": 1013,
  "vingroup-cash-flow": 1007,
  "walmart-earnings": 1018,
  "wealth-management": 1031,
};

export default async function proxy(req: NextRequest) {
  const [, section, slug] = req.nextUrl.pathname.split("/");
  if (section !== "bai-hoc" || !slug) return NextResponse.next();

  const lessonId = STATIC_PAGE_LESSON_IDS[slug];
  if (lessonId === undefined) return NextResponse.next();

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const locked = await isLessonLockedForUser(lessonId, user?.id ?? null);
  if (locked) {
    return NextResponse.redirect(new URL(`/dashboard?locked=${encodeURIComponent(slug)}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bai-hoc/:path*"],
};
