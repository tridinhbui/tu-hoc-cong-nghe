/**
 * Phía client của chỉ số năng lực thực hành: báo cho máy chủ những việc chấm
 * trong trình duyệt (bài tập viết mã, nhiệm vụ công cụ mô phỏng).
 *
 * "Bắn rồi quên", như lib/exercise-passes.ts: chưa đăng nhập, mất mạng, bảng
 * chưa migrate - không cái nào được làm hỏng khoảnh khắc "làm được rồi" của
 * người học. Máy chủ (app/api/skill-evidence) tự đối chiếu ref với danh mục và
 * tự quyết điểm; ở đây chỉ gửi ref.
 */
import { useEffect } from "react";
import { toolRef, type EvidenceSource } from "@/lib/practical-skill";

/** Ref đã gửi trong phiên này - nhiệm vụ khôi phục từ localStorage hiện "đã
 *  xong" ở mỗi lần mở trang, không cần gửi lại mỗi lần. */
const sent = new Set<string>();
const SESSION_KEY = "practical-skill-sent";

function loadSent() {
  if (sent.size > 0 || typeof window === "undefined") return;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (raw) for (const k of JSON.parse(raw) as string[]) sent.add(k);
  } catch {
    // sessionStorage bị chặn: chỉ gửi lại thừa, máy chủ bỏ trùng.
  }
}

function saveSent() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify([...sent]));
  } catch {
    // như trên
  }
}

export function recordSkillEvidence(source: Extract<EvidenceSource, "exercise" | "tool">, refs: string | string[]): void {
  if (typeof window === "undefined") return;
  loadSent();
  const fresh = [...new Set(Array.isArray(refs) ? refs : [refs])].filter((r) => !sent.has(`${source}|${r}`));
  if (fresh.length === 0) return;
  for (const r of fresh) sent.add(`${source}|${r}`);
  saveSent();
  // Máy chủ nhận tối đa 10 ref mỗi lượt.
  for (let i = 0; i < fresh.length; i += 10) {
    const chunk = fresh.slice(i, i + 10);
    try {
      void fetch("/api/skill-evidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, refs: chunk }),
        keepalive: true,
      })
        .then((res) => {
          // 401 (chưa đăng nhập): quên đi để lần sau, khi đã đăng nhập, gửi lại.
          if (res.status === 401) {
            for (const r of chunk) sent.delete(`${source}|${r}`);
            saveSent();
          }
        })
        .catch(() => {});
    } catch {
      // fetch không có (môi trường test): bỏ qua.
    }
  }
}

/**
 * Gắn vào khung công cụ: mỗi nhiệm vụ chuyển sang "đã xong" được báo lên máy
 * chủ một lần. Dùng: `useRecordToolMissions(tool, missions)` trong ToolShell.
 */
export function useRecordToolMissions(tool: string, missions: readonly { id: string; done: boolean }[]): void {
  const doneKey = missions
    .filter((m) => m.done)
    .map((m) => m.id)
    .join(",");
  useEffect(() => {
    if (!doneKey) return;
    recordSkillEvidence(
      "tool",
      doneKey.split(",").map((id) => toolRef(tool, id))
    );
  }, [tool, doneKey]);
}
