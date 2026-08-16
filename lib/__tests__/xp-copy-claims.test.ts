import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/** Con số XP viết cứng trong từ điển giao diện.
 *
 *  Ba lần liên tiếp, nền kinh tế XP được cân lại và câu chữ ở lại phía sau:
 *
 *  - Trang đăng nhập hứa "+120 XP / bài" trong khi một bài học cộng 10.
 *  - Thẻ "Học tiếp" hứa "+30 XP NẾU HỌC NGAY", cùng một bài học đó.
 *  - /kiem-tra hứa "+15 XP" cho quiz tin tức sau khi mức thưởng hạ còn 8.
 *
 *  Ba chỗ này giờ nội suy `{xp}` từ hằng số (XP_PER_LESSON, QUEST_XP_REWARDS),
 *  nên chúng không thể lệch nữa. Bài kiểm này giữ cho chỗ THỨ TƯ không xuất
 *  hiện: mọi chuỗi mới mang dạng "+<số> XP" đều fail cho tới khi hoặc nó nội
 *  suy từ hằng số, hoặc người thêm nó ghi tên vào danh sách dưới đây.
 *
 *  Vì sao là danh sách kế thừa chứ không phải cấm tuyệt đối: 37 chuỗi đang tồn
 *  tại (20 khoá, phần lớn có cả bản Việt lẫn Anh) và phần lớn là phần thưởng
 *  của mini game, boss, rương - những thứ chưa có hằng số duy nhất để trỏ tới,
 *  và có cái còn chẳng có sổ cái nào đứng sau.
 *  Sửa hết chúng là một việc khác, lớn hơn, và trộn vào đây thì cả hai cùng
 *  không xong. Đúng hình dạng của scripts/lesson-quiz-tell-baseline.json:
 *  danh sách chỉ được rút ngắn, KHÔNG BAO GIỜ được thêm vào.
 *
 *  Hai chuỗi trong nhóm này đã được xoá sổ chứ không kế thừa, vì chúng không
 *  chỉ lệch mà hứa thứ không tồn tại: "Lưu vào Flashcard (+5 XP)" (không sổ
 *  cái nào ghi) và "Rương Sử Thi: +3 Rương Quà & +100 XP" (chỗ ghi chú trong
 *  mã còn viết "// Award +100 XP" bên trên một lời gọi chỉ TÍNH LẠI tổng). */

const DICT_DIR = path.resolve(__dirname, "..", "i18n", "dictionaries");

/** "+50 XP", "+15 XP", "+100 XP/ván"... trong một chuỗi có nháy kép. */
const XP_LITERAL = /\+\s?\d+\s?XP/;

/** Chuỗi được phép giữ số viết cứng, kèm lý do. CHỈ ĐƯỢC RÚT NGẮN.
 *
 *  Khoá ở đây là đường dẫn "tệp:khoá" như nó xuất hiện trong nguồn, không phải
 *  số dòng - số dòng đổi mỗi lần ai đó thêm một khoá phía trên. */
const GRANDFATHERED = new Set([
  // Phần thưởng mini game / boss / đấu trường: con số nằm trong chính logic
  // trò chơi, chưa có hằng số dùng chung để trỏ tới.
  "bossStudyWorld.toastSuccess",
  "bossStudyWorld.victoryRewardPart1",
  "cosmeticsDuel.toastSoftLanding",
  "games.xpBadge",
  "worldBoss.bossRewardValue",
  "gameKingdom.quizReward",
  // Bài thi chặng: 50 XP/chặng nằm trong recalculateUserStats (milestoneXp),
  // chưa tách thành hằng số.
  "exams.xpAmountLabel",
  "exams.passToast",
  "finalOne.milestoneBonusXp",
  // Trắc nghiệm hướng nghiệp: khớp QUEST_XP_REWARDS.career_assessment = 50,
  // nhưng hai chuỗi bị cắt quanh thẻ <strong> nên chưa nội suy được gọn.
  "jobs.quizXpReward",
  "jobs.quizStart",
  // Ôn tập chủ động: 10 XP/chặng, nằm trong recalculateUserStats (recallXp).
  "recall.passedToast",
  // Chia sẻ lên FinSocial.
  "share.sharedToast",
  "share.shareCta",
  // Trang chủ và trang đăng nhập: con số MINH HOẠ trong bản demo tương tác,
  // không phải phần thưởng thật của tài khoản nào.
  "home.samplerCorrect",
  "trackPanel.samplerXp",
  "trackPanel.samplerCorrect",
  // Nhãn theo lĩnh vực trong bài kiểm tra xếp lớp.
  "placement.sectorXp30Cfa",
]);

function dictionaryFiles(): string[] {
  const files = [path.join(DICT_DIR, "vi.ts"), path.join(DICT_DIR, "en.ts")];
  const sectionsDir = path.join(DICT_DIR, "sections");
  for (const name of readdirSync(sectionsDir)) {
    if (name.endsWith(".ts")) files.push(path.join(sectionsDir, name));
  }
  return files;
}

/** Mọi dòng `khoá: "…+N XP…"` trong các tệp từ điển.
 *
 *  Đọc bằng regex trên nguồn chứ không import từ điển rồi duyệt: cần TÊN KHOÁ
 *  để danh sách kế thừa có thứ để bám vào, mà một chuỗi lồng sâu trong object
 *  thì tên khoá của nó chỉ còn trong nguồn. */
function xpLiterals(): { file: string; key: string; value: string }[] {
  const out: { file: string; key: string; value: string }[] = [];
  for (const file of dictionaryFiles()) {
    const source = readFileSync(file, "utf8");
    for (const line of source.split("\n")) {
      // Bỏ qua chú thích: chúng trích dẫn lại chính chuỗi mà chúng giải thích.
      if (line.trimStart().startsWith("//") || line.trimStart().startsWith("*")) continue;
      const match = line.match(/^\s*([A-Za-z0-9_]+):\s*"((?:[^"\\]|\\.)*)"/);
      if (!match) continue;
      if (!XP_LITERAL.test(match[2])) continue;
      out.push({ file: path.basename(file), key: match[1], value: match[2] });
    }
  }
  return out;
}

describe("lời hứa XP trong từ điển", () => {
  it("không có chuỗi '+<số> XP' mới nào ngoài danh sách kế thừa", () => {
    const offenders = xpLiterals().filter((entry) => {
      // Danh sách ghi theo "phần.khoá", còn nguồn chỉ cho ta khoá cuối - so
      // theo đuôi là đủ hẹp ở đây vì tên khoá trong từ điển gần như không
      // trùng nhau, và một trùng lặp chỉ làm bài kiểm DỄ hơn chứ không sai.
      for (const allowed of GRANDFATHERED) {
        if (allowed.endsWith(`.${entry.key}`)) return false;
      }
      return true;
    });

    expect(
      offenders.map((o) => `${o.file} · ${o.key}: "${o.value}"`),
      "Con số XP viết cứng trong copy sẽ lệch khỏi sổ cái ở lần cân bằng tiếp theo. " +
        "Hãy đổi thành {xp} rồi nội suy bằng format() từ XP_PER_LESSON / QUEST_XP_REWARDS."
    ).toEqual([]);
  });

  it("ba chuỗi đã sửa vẫn nội suy chứ không quay lại số cứng", () => {
    const source = readFileSync(path.join(DICT_DIR, "vi.ts"), "utf8");
    const enSource = readFileSync(path.join(DICT_DIR, "en.ts"), "utf8");
    for (const text of [source, enSource]) {
      for (const key of ["xpPerLesson", "xpIfNow", "newsXp"]) {
        const line = text.split("\n").find((l) => l.trimStart().startsWith(`${key}:`));
        expect(line, `thiếu khoá ${key}`).toBeTruthy();
        expect(line, `${key} phải nội suy {xp}`).toContain("{xp}");
      }
    }
  });

  it("danh sách kế thừa không chứa mục đã chết", () => {
    // Một mục thừa nghĩa là chuỗi đã được sửa mà không ai rút nó khỏi danh
    // sách - và danh sách chỉ có tác dụng nếu nó co lại theo thực tế.
    const keys = new Set(xpLiterals().map((e) => e.key));
    const dead = [...GRANDFATHERED].filter((allowed) => {
      const leaf = allowed.slice(allowed.lastIndexOf(".") + 1);
      return !keys.has(leaf);
    });
    expect(dead, "rút các mục này khỏi GRANDFATHERED").toEqual([]);
  });
});
