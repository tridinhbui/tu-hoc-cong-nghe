// Mỗi chặng được vẽ bằng một "cảnh xưởng" - thứ chặng đó giúp bạn làm ra -
// thay vì chỉ một dòng chữ. Có 216 nhãn chặng (vi + en, hai tuyến) nhưng chỉ
// tám cảnh: vẽ một cảnh cho từng chặng sẽ thành 100 hình na ná nhau, còn tám
// cảnh thì mỗi cảnh nói được một điều rõ (máy, web, code, dữ liệu, AI, đám mây,
// bảo mật, nghề).
//
// Tra theo `tag` của StageOutcome (lib/i18n/dictionaries/sections/revamp-dashboard.ts),
// cả bản Việt lẫn bản Anh - nên thứ tự các luật quan trọng: "AI CODE" là AI chứ
// không phải code, "DỮ LIỆU + AI" là dữ liệu. lib/__tests__/stage-scene.test.ts
// đo tỉ lệ rơi về cảnh mặc định để một đợt chặng mới không âm thầm vẽ toàn bàn
// làm việc.

export type StageSceneId = "machine" | "web" | "code" | "data" | "ai" | "cloud" | "shield" | "workshop";

const RULES: [StageSceneId, RegExp][] = [
  ["shield", /BẢO MẬT|SECURITY|APPSEC|PRIVACY|QUYỀN RIÊNG TƯ|AUTH\b|SAFE AI|AI AN TOÀN|BACKUP/],
  ["machine", /TERMINAL|LINUX|NỀN TẢNG|FOUNDATIONS|CÔNG NGHỆ|WORKPLACE TECH|CẬP NHẬT|KEEPING UP/],
  ["data", /DỮ LIỆU|DATA|SQL|SHEETS|ANALYTICS|DASHBOARD|SỐ LIỆU|METRICS|BENCHMARK/],
  ["ai", /(^|\s)AI(\s|$)|LLM|RAG|AGENT|MCP|EVALS|CHATBOT|TRỢ LÝ|CUSTOM AI|DOC ASSISTANTS|ĐỌC TÀI LIỆU|HÌNH ẢNH|IMAGES|ÂM THANH|AUDIO|NGƯỜI DUYỆT|HUMAN REVIEW/],
  ["web", /HTML|CSS|JAVASCRIPT|WEB|TRANG WEB|MOBILE|DI ĐỘNG|(^|\s)UX(\s|$)|ĐƯA LÊN MẠNG|GO LIVE/],
  ["cloud", /API|DEPLOY|CLOUD|DOCKER|CI\/CD|INFRA|SRE|OPS|PLATFORM|SCALE|LOAD|LOGGING|NETWORK|RELEASE|FINOPS|PERFORMANCE|AUTOMAT|TỰ ĐỘNG|EMAIL|BLOCKCHAIN/],
  ["code", /GIT|LẬP TRÌNH|PROGRAMMING|CODE|DEBUG|GỠ LỖI|ASYNC|RUNTIME|ENGINEERING|TOOLING|QA|CÔNG CỤ|SMALL TOOLS|STANDARDS|DỰ ÁN|PROJECTS|DSA/],
];

export function stageSceneFor(tag: string | undefined | null): StageSceneId {
  const t = (tag ?? "").toUpperCase();
  for (const [scene, re] of RULES) if (re.test(t)) return scene;
  return "workshop";
}
