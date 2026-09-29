import { NextRequest, NextResponse } from "next/server";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import { createAdminClient } from "@/lib/cloudflare-admin";
import { computeSkillScores, exerciseRef } from "@/lib/practical-skill";
import {
  readSkillEvidence,
  resolveClientEvidence,
  writeSkillEvidence,
  type EvidenceInsert,
} from "@/lib/practical-skill-server";

/**
 * Năng lực thực hành (lib/practical-skill.ts).
 *
 * GET  → { areas: SkillScore[], total } cho người đang đăng nhập.
 * POST { source: "exercise" | "tool", ref } (hoặc `refs`, tối đa 10) → ghi
 *      bằng chứng cho hai nguồn chấm trong trình duyệt.
 *
 * POST không nhận điểm, lĩnh vực hay nguồn nào khác từ client: chỉ một ref, và
 * ref phải có thật trong danh mục (bài tập trong lib/lessons-data/_exercises.json,
 * nhiệm vụ trong lib/tools). Câu phỏng vấn, miền chứng chỉ và thi vượt chặng
 * KHÔNG đi qua đây - chúng được ghi ngay trong route chấm bằng token đã ký
 * (knowledge-challenge/submit, stage-exam), nơi máy chủ tự biết câu nào đúng.
 */

export const dynamic = "force-dynamic";

const MAX_REFS = 10;

async function currentUserId(): Promise<{ id: string; client: Awaited<ReturnType<typeof createServerCloudflareClient>> } | null> {
  const cloudflare = await createServerCloudflareClient();
  const {
    data: { user },
    error,
  } = await cloudflare.auth.getUser();
  if (error || !user) return null;
  return { id: user.id, client: cloudflare };
}

export async function GET() {
  const me = await currentUserId();
  if (!me) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const rows = await readSkillEvidence(createAdminClient(), me.id);

  // Bài tập đã qua TRƯỚC khi có bảng bằng chứng vẫn nằm ở user_exercise_passes
  // (migrations-d1/0009): gộp vào lúc đọc, cùng phép đối chiếu danh mục, để
  // người học không mất phần đã làm. Trùng ref thì tính một lần.
  const seen = new Set(rows.map((r) => `${r.source}|${r.ref}`));
  const merged: { area: string; source: string; points: number }[] = [...rows];
  try {
    const { data } = await me.client.rpc("get_my_exercise_passes", {});
    if (Array.isArray(data)) {
      for (const p of data as { lesson_id: number; block_index: number }[]) {
        const ev = resolveClientEvidence("exercise", exerciseRef(Number(p.lesson_id), Number(p.block_index)));
        if (ev && !seen.has(`${ev.source}|${ev.ref}`)) {
          seen.add(`${ev.source}|${ev.ref}`);
          merged.push(ev);
        }
      }
    }
  } catch {
    // Bảng 0009 chưa có: chỉ còn bằng chứng từ bảng mới.
  }

  return NextResponse.json({ areas: computeSkillScores(merged), total: merged.length });
}

export async function POST(request: NextRequest) {
  const me = await currentUserId();
  if (!me) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const refs: unknown[] = Array.isArray(body?.refs) ? body.refs : [body?.ref];
  if (refs.length === 0 || refs.length > MAX_REFS) {
    return NextResponse.json({ error: "Invalid refs" }, { status: 400 });
  }

  const rows: EvidenceInsert[] = [];
  for (const ref of refs) {
    const ev = resolveClientEvidence(body?.source, ref);
    if (!ev) return NextResponse.json({ error: "Unknown evidence" }, { status: 400 });
    rows.push(ev);
  }

  await writeSkillEvidence(createAdminClient(), me.id, rows);
  return NextResponse.json({ recorded: rows.length });
}
