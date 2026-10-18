// Expert simulation: một persona đi trọn hành trình landing → đăng ký →
// onboarding → bài đầu → quiz → công cụ → tiến độ → quay lại hôm sau.
// node journey.mjs <persona> <outDir>
// Đếm: thao tác (click/điền), lớp phủ chặn đường, dead end (bước không tìm ra
// lối), số màn hình phải cuộn, chữ phải quét ở mỗi màn quyết định.
import { chromium } from "playwright";
import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { measure } from "./measure.mjs";

const BASE = process.env.BASE ?? "http://localhost:4000";
const PERSONAS = {
  p1: { name: "Người mới hoàn toàn", vp: "desktop", goal: "Chưa rõ - tôi chỉ muốn", card: "Tôi muốn AI làm việc cùng mình" },
  p2: { name: "35-50 tuổi, ít dùng công nghệ", vp: "m390", goal: "Dùng AI cho công việc văn phòng", card: "Tôi muốn AI làm việc cùng mình" },
  p3: { name: "Sinh viên tự học từ 0", vp: "m390", goal: "Học bài bản để đi làm nghề" },
  p4: { name: "Người đi làm, muốn dùng AI", vp: "desktop", goal: "Làm việc với bảng số liệu", card: "Tôi muốn phân tích số liệu" },
  p5: { name: "Đã biết công nghệ, tìm nâng cao", vp: "desktop", goal: process.env.AFTER ? "Tôi đã biết lập trình" : "Học bài bản để đi làm nghề", advanced: true },
};
const VPS = { desktop: { width: 1440, height: 900 }, m390: { width: 390, height: 844 } };
const pid = process.argv[2]; const outDir = process.argv[3]; const P = PERSONAS[pid];
mkdirSync(outDir, { recursive: true });

const log = []; let stage = ""; const stages = {};
const S = () => (stages[stage] ??= { actions: 0, overlays: 0, deadEnds: [], screensScrolled: 0, wordsScanned: 0, ms: 0, notes: [] });
const act = (what, overlay = false) => { S().actions++; if (overlay) S().overlays++; log.push(`[${stage}] ${what}`); };
const dead = (what) => { S().deadEnds.push(what); log.push(`[${stage}] DEAD END: ${what}`); };
const note = (what) => { S().notes.push(what); log.push(`[${stage}] note: ${what}`); };

const browser = await chromium.launch();
const mobile = P.vp !== "desktop";
const mk = (state) => browser.newContext({ viewport: VPS[P.vp], isMobile: mobile, hasTouch: mobile, storageState: state });
let ctx = await mk(); let page = await ctx.newPage();
const settle = async (ms = 700) => { await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {}); await page.waitForTimeout(ms); const t = Date.now(); await page.getByText(/^Đang tải/).filter({ visible: true }).first().waitFor({ state: "hidden", timeout: 20000 }).catch(() => {}); const w = Date.now() - t; if (w > 1500) note(`chờ màn "Đang tải" ${(w / 1000).toFixed(1)}s (dev mode)`); };
const scan = async () => { const m = await measure(page); S().wordsScanned += m.foldWords; return m; };
const vis = (loc) => loc.filter({ visible: true }).first();
const has = async (loc, t = 600) => vis(loc).isVisible({ timeout: t }).catch(() => false);
const btn = (name) => page.getByRole("button", { name }).or(page.getByRole("link", { name }));
const shot = (n) => page.screenshot({ path: `${outDir}/${pid}-${n}.png` });
async function begin(name) { if (stage) S().ms = Date.now() - t0; stage = name; t0 = Date.now(); S(); }
let t0 = Date.now(); let advPicked = false;

// Mở menu điều hướng (mobile: nút hamburger) rồi bấm một mục.
async function nav(label) {
  if (new URL(page.url()).pathname.startsWith("/bai-hoc/")) { const back = page.locator('a[href="/hoc-bai"], a[href="/dashboard"]'); if (await has(back)) { await vis(back).click(); act("trang bài không có menu - bấm Quay lại"); await settle(1500); for (let k = 0; k < 3; k++) if (!(await clearOneOverlay({ pickGoal: false }))) break; } }
  let link = page.getByRole("link", { name: new RegExp(label, "i") });
  if (!(await has(link))) {
    if (mobile) { const menu = page.getByRole("button", { name: /menu|mở menu|điều hướng/i }); if (await has(menu)) { await vis(menu).click(); act("mở menu"); await page.waitForTimeout(500); } }
    if (!(await has(link))) { const sec = page.getByRole("button", { name: /học tập|thực hành/i }); for (const b of await sec.all()) { if (await b.isVisible() && (await b.getAttribute("aria-expanded")) === "false") { await b.click(); act("bung nhóm menu"); await page.waitForTimeout(400); if (await has(link)) break; } } }
  }
  if (!(await has(link))) return false;
  let ok = await vis(link).click({ timeout: 3000 }).then(() => true).catch(() => false);
  if (!ok) { const sec = page.getByRole("button", { name: /học tập|thực hành/i }); for (const b of await sec.all()) { if (await b.isVisible() && (await b.getAttribute("aria-expanded")) === "false") { await b.click(); act("bung nhóm menu (mục bị gập)"); await page.waitForTimeout(500); } } ok = await vis(link).click({ timeout: 3000 }).then(() => true).catch(() => false); }
  if (!ok) return false;
  act(`menu: ${label}`); await settle(); return true;
}

// Đóng/đi qua bất kỳ lớp phủ nào đang chặn. Trả về true nếu đã xử lý một lớp.
async function clearOneOverlay({ pickGoal = true } = {}) {
  const goal = page.getByRole("button", { name: new RegExp(P.goal) });
  if (pickGoal && (await has(goal))) {
    const ok = await vis(goal).click({ timeout: 3000 }).then(() => true).catch(() => false);
    if (!ok) {
      const skip = page.getByRole("button", { name: /^Bỏ qua$/ });
      if (await has(skip)) { act("bấm mục tiêu - KHÔNG phản hồi (bị lớp tour che)"); dead("ô chọn mục tiêu bị lớp tour che"); await vis(skip).click(); act("tìm ra và bấm Bỏ qua của tour", true); }
      else note("ô chọn mục tiêu đang khoá (đang lưu lựa chọn)");
      return "blocked";
    }
    act("chọn mục tiêu: " + P.goal, true);
    await page.getByText(/Hành trình của bạn|Lộ trình nền tảng|Lộ trình chuyên sâu/).first().waitFor({ timeout: 20000 }).catch(() => note("chọn mục tiêu xong nhưng 20s chưa thấy kết quả"));
    await settle(800); return "goal"; }
  const later = page.getByRole("dialog").getByRole("button", { name: /^Để sau$/ }).or(page.locator("div").filter({ hasText: /Mời bạn học cùng/ }).getByRole("button", { name: /^Để sau$/ }));
  if (await has(later)) { await vis(later).click(); act("đóng popup Mời bạn học cùng", true); await page.waitForTimeout(500); return "referral"; }
  if (P.advanced && !advPicked) { const adv = page.getByText("Công nghệ chuyên sâu").filter({ visible: true }).last(); if (await has(page.getByText("Chọn lộ trình phù hợp"))) { await adv.click().catch(() => {}); act("onboarding: chọn Công nghệ chuyên sâu", true); advPicked = true; } }
  const onbNext = btn(/^Tiếp theo$/i);
  if (await has(onbNext)) { await vis(onbNext).click(); act("onboarding: Tiếp theo", true); await page.waitForTimeout(500); return "onb"; }
  const onbDone = page.getByRole("button", { name: /^Bắt đầu học$/i });
  if (await has(onbDone)) { await vis(onbDone).click(); act("onboarding: Bắt đầu học", true); await settle(1500); return "onbdone"; }
  const tourSkip = page.getByRole("button", { name: /^Bỏ qua$/ });
  if (await has(tourSkip)) { await vis(tourSkip).click(); act("tour: Bỏ qua", true); await page.waitForTimeout(500); return "tour"; }
  return null;
}

try {
  // A. Landing → đăng ký
  await begin("A_landing_signup");
  await page.goto(BASE + "/", { waitUntil: "networkidle" }); await page.waitForTimeout(800);
  await scan(); await shot("A1-landing");
  if (P.card) {
    // Người mới: bấm CTA chính, chọn đúng nhu cầu, thử bài trước khi đăng ký.
    const cta = btn(/bắt đầu học miễn phí/i);
    if (!(await has(cta))) dead("không thấy CTA chính"); else { await vis(cta).click(); act("CTA Bắt đầu học miễn phí"); await settle(); }
    if (!new URL(page.url()).pathname.startsWith("/login")) {
      note("CTA chính không mở đăng ký mà cuộn tới khu chọn nhu cầu");
      const card = page.locator("a,div").filter({ hasText: P.card }).getByRole("link", { name: /xem hành trình/i });
      if (await has(card)) { await vis(card).click(); act("chọn thẻ nhu cầu: " + P.card); await settle(); } else dead("không thấy thẻ nhu cầu " + P.card);
      await scan(); await shot("A2-flow");
      const first = btn(/làm thứ đầu tiên/i);
      if (await has(first)) { await vis(first).click(); act("Làm thứ đầu tiên (thử bài khi chưa đăng nhập)"); await settle(1500); await scan(); await shot("A3-anon-lesson"); }
      // Từ bài thử, người dùng tìm chỗ đăng ký để lưu tiến độ.
      const join = page.locator('a[href*="/login"]').filter({ visible: true });
      if (await join.count()) { await join.first().click(); act("lời mời đăng ký trong bài thử"); await settle(); }
      else { dead("bài thử không có lời mời đăng ký/lưu tiến độ thấy được - phải tự quay lại trang chủ"); await page.goto(BASE + "/"); act("quay lại trang chủ"); await btn(/vào học ngay/i).first().click(); act("VÀO HỌC NGAY"); await settle(); }
    }
  } else {
    const enter = btn(/vào học ngay/i);
    await vis(enter).click(); act("VÀO HỌC NGAY"); await settle();
  }
  if (!(await has(page.locator('input[type="text"]'), 1500))) {
    const toSignup = page.getByRole("button", { name: /đăng ký|tạo tài khoản/i });
    if (await has(toSignup)) { await vis(toSignup).click(); act("chuyển sang Đăng ký"); await page.waitForTimeout(500); } else dead("không thấy lối đăng ký trên /login");
  }
  await scan(); await shot("A4-signup");
  const creds = { name: "Người thử " + pid, email: `ux-${pid}-${Date.now()}@example.test`, password: randomBytes(9).toString("base64url") };
  await page.fill('input[type="text"]', creds.name); act("điền tên");
  await page.fill('input[type="email"]', creds.email); act("điền email");
  await page.fill('input[type="password"]', creds.password); act("điền mật khẩu");
  await page.click('button[type="submit"]'); act("bấm Đăng ký");
  await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 60000 }); await settle(2500);
  note("đăng ký xong vào " + new URL(page.url()).pathname);

  // B. Onboarding → bài đầu tiên
  await begin("B_onboarding_to_lesson1");
  await scan(); await shot("B1-first-screen");
  let lessonUrl = null;
  for (let i = 0; i < 25 && !lessonUrl; i++) {
    if (new URL(page.url()).pathname.startsWith("/bai-hoc/")) { lessonUrl = page.url(); break; }
    const startFirst = btn(/bắt đầu bài đầu tiên/i);
    if (await has(startFirst)) {
      await shot("B2-goal-result");
      const ok = await vis(startFirst).click({ timeout: 3000 }).then(() => true).catch(() => false);
      act(ok ? "Bắt đầu bài đầu tiên" : "bấm Bắt đầu bài đầu tiên - KHÔNG phản hồi (bị lớp khác che)");
      if (!ok) { dead("nút Bắt đầu bài đầu tiên bị lớp tour che, bấm không ăn"); const skip = page.getByRole("button", { name: /^Bỏ qua$/ }); if (await has(skip)) { await vis(skip).click(); act("tìm ra và bấm Bỏ qua của tour", true); } }
      await settle(2000); continue;
    }
    const r = await clearOneOverlay();
    if (r) { if (i < 3) await shot(`B-ov${i}`); continue; }
    // Không còn lớp phủ: tự tìm đường tới bài học.
    if (P.advanced) {
      if (await nav("Học bài")) {
        const adv = page.getByRole("button", { name: /chuyên sâu|nâng cao/i }).or(page.getByText(/Công nghệ chuyên sâu/i));
        if (await has(adv)) { await vis(adv).click(); act("chọn lộ trình chuyên sâu"); await settle(); } else dead("không thấy lựa chọn nâng cao trên /hoc-bai");
        await scan(); await shot("B3-advanced");
      }
    }
    const resume = btn(/^(Học tiếp|Bắt đầu học|Tiếp tục)/i);
    if (await has(resume)) { await vis(resume).click(); act("bấm Học tiếp"); await settle(2000); continue; }
    dead("không thấy lối vào bài học"); break;
  }
  if (!lessonUrl && new URL(page.url()).pathname.startsWith("/bai-hoc/")) lessonUrl = page.url();
  note("bài đầu: " + (lessonUrl ? new URL(lessonUrl).pathname : "KHÔNG TỚI ĐƯỢC"));

  // C. Học bài đầu + làm quiz
  await begin("C_lesson_and_quiz");
  if (lessonUrl) {
    for (let k = 0; k < 3; k++) if (!(await clearOneOverlay({ pickGoal: false }))) break;
    const m = await scan(); note(`h1="${m.h1[0] ?? ""}"; ${m.words} chữ; ${m.scrollScreens} màn hình; ${m.foldInteractive} điều khiển trong màn đầu`);
    S().screensScrolled += m.scrollScreens; await shot("C1-lesson");
    // đọc: cuộn tới cuối như một người đọc thật
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += VPS[P.vp].height * 0.85) { await page.mouse.wheel(0, VPS[P.vp].height * 0.85); await page.waitForTimeout(120); }
    await page.waitForTimeout(600);
    for (let k = 0; k < 3; k++) if (!(await clearOneOverlay({ pickGoal: false }))) break;
    // quiz nhanh
    const quiz = page.locator("#lesson-quiz");
    if (!(await quiz.count())) dead("không thấy khu quiz");
    let answered = 0;
    for (let q = 0; q < 6; q++) {
      await quiz.scrollIntoViewIfNeeded().catch(() => {});
      const opt = quiz.locator("button").filter({ has: page.locator("span", { hasText: /^[A-F]$/ }) }).filter({ visible: true }).first();
      if (!(await opt.isVisible().catch(() => false))) break;
      await opt.click().catch(() => {}); act("chọn đáp án");
      const check = quiz.getByRole("button", { name: /^Kiểm tra →$/ });
      if (await has(check, 800)) { await vis(check).click().catch(() => {}); act("Kiểm tra đáp án"); }
      await page.waitForTimeout(500); answered++;
      const next = quiz.getByRole("button", { name: /^(Câu tiếp theo|Xem kết quả)/ });
      if (await has(next, 800)) { await vis(next).click().catch(() => {}); act("Câu tiếp"); await page.waitForTimeout(500); }
    }
    note(`trả lời ${answered} câu quiz`); await shot("C2-after-quiz");
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
    const midLeft = await page.getByText(/Còn trả lời câu hỏi giữa bài/).filter({ visible: true }).count();
    if (midLeft) note("quiz xong nhưng bài CHƯA hoàn thành: còn câu 'Dừng & Kiểm tra' giữa bài");
    const done = await page.getByText(/hoàn thành bài|đã hoàn thành|bài tiếp|\+\d+ XP/i).filter({ visible: true }).count();
    note(done ? "có phản hồi hoàn thành/XP trên màn hình" : "KHÔNG thấy phản hồi hoàn thành");
  }

  // D. Công cụ thực hành
  await begin("D_practice_tool");
  if (!(await nav("Mô phỏng công cụ"))) dead("không tìm thấy mục Mô phỏng công cụ trong menu");
  else {
    for (let k = 0; k < 3; k++) if (!(await clearOneOverlay({ pickGoal: false }))) break;
    const m = await scan(); await shot("D1-tools"); note(`/cong-cu: ${m.foldWords} chữ trong màn đầu`);
    const recommended = await page.getByText(/hợp cho người mới|gợi ý cho bạn|bắt đầu ở đây/i).filter({ visible: true }).count();
    note(recommended ? "có gợi ý công cụ nên bắt đầu" : "KHÔNG có gợi ý nên chọn công cụ nào - 5 lựa chọn ngang hàng");
    const start = page.locator('a[href^="/cong-cu/"]');
    if (await has(start)) { await vis(start).click({ timeout: 5000 }).catch(() => dead("nút Bắt đầu công cụ không bấm được")); act("Bắt đầu công cụ đầu tiên"); await settle(2000); await scan(); await shot("D2-tool"); note("vào " + new URL(page.url()).pathname); }
    else dead("không có nút Bắt đầu ở /cong-cu");
  }

  // E. Xem tiến độ
  await begin("E_progress");
  if (!(await nav("^Dashboard$|Trang chính|Tổng quan"))) dead("không thấy Dashboard trong menu");
  for (let k = 0; k < 4; k++) if (!(await clearOneOverlay({ pickGoal: false }))) break;
  const em = await scan(); await shot("E1-progress");
  const learned = await page.locator('[data-tour="user-stats"]').innerText().catch(() => "");
  note("khối tiến độ: " + learned.replace(/\s+/g, " ").slice(0, 140));

  // F. Quay lại hôm sau (phiên mới, cookie còn)
  await begin("F_return_next_day");
  const state = await ctx.storageState(); await ctx.close();
  ctx = await mk(state); page = await ctx.newPage();
  await page.goto(BASE + "/dashboard", { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
  await scan(); await shot("F1-return");
  for (let k = 0; k < 4; k++) if (!(await clearOneOverlay({ pickGoal: false }))) break;
  const resume = btn(/^(Học tiếp|Tiếp tục)/i);
  if (await has(resume)) { await vis(resume).click(); act("Học tiếp"); await settle(2000); note("tiếp tục ở " + new URL(page.url()).pathname); await shot("F2-resume"); }
  else dead("không thấy nút Học tiếp khi quay lại");
  S().ms = Date.now() - t0;
} catch (e) { dead("lỗi script: " + e.message.split("\n")[0]); await shot("ERR").catch(() => {}); }
await browser.close();
// ước lượng thời gian người thật (KLM): mỗi thao tác 2,5s (nghĩ 1,35 + trỏ-bấm 1,15),
// gõ ~40 ký tự 11s, quét chữ 4 từ/giây ở mỗi màn quyết định (trần 30s/màn).
const out = { persona: pid, ...P, stages };
let tot = { actions: 0, overlays: 0, deadEnds: 0, estSec: 0 };
for (const s of Object.values(stages)) { s.estHumanSec = Math.round(s.actions * 2.5 + Math.min(s.wordsScanned / 4, 30 * 4)); tot.actions += s.actions; tot.overlays += s.overlays; tot.deadEnds += s.deadEnds.length; tot.estSec += s.estHumanSec; }
tot.estSec += 11; out.total = tot; out.log = log;
writeFileSync(`${outDir}/${pid}.json`, JSON.stringify(out, null, 1));
console.log(pid, JSON.stringify(tot)); for (const [k, s] of Object.entries(stages)) console.log(" ", k, `act=${s.actions} ov=${s.overlays} dead=${s.deadEnds.length} words=${s.wordsScanned} est=${s.estHumanSec}s`, s.deadEnds.join(" | "), "|", s.notes.join(" | "));
