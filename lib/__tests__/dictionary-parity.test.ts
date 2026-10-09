import { describe, it, expect } from "vitest";
import { vi as viDict } from "../i18n/dictionaries/vi";
import { en as enDict } from "../i18n/dictionaries/en";

// What `tsc` already guarantees, and what it does not.
//
// en.ts is declared `Dictionary`, so a key present in vi.ts and missing from
// en.ts is a compile error. That covers omissions. It says nothing about the
// VALUES: copying a Vietnamese string into en.ts to satisfy the type is a
// perfectly valid program, and it renders Vietnamese to a reader who asked for
// English. With ~3,500 UI strings still to migrate, in batches, that is the
// mistake most likely to happen repeatedly and least likely to be noticed -
// nobody re-reads a 200-key diff for language.
//
// The check below is the cheap half: any English value still carrying
// Vietnamese diacritics is untranslated, full stop.

const VIETNAMESE_DIACRITIC =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

/** Values that are legitimately identical or Vietnamese in the English
 *  dictionary, each with the reason. Anything not listed here must differ. */
/** The Standard-citation keys inside interactiveRest.ethicsCase: for each case,
 *  the keyed Standard plus its three distractors. Everything else in that block
 *  is translatable prose. */
const INTENTIONALLY_UNTRANSLATED = new Set([
  // The difficulty table is keyed BY the Vietnamese value, because `difficulty`
  // is a Vietnamese string union used as a value across the app (see
  // LessonTranslation in lib/lesson-types.ts). The keys are data, not copy.
  "difficulty",
  // Nhánh "nghề nghiệp" của bảng xếp hạng đặt tên hạng theo CHỨC DANH THẬT
  // trong ngành, và bản tiếng Việt đã viết chúng bằng tiếng Anh sẵn:
  // đó là tên gọi của chức danh ở thị trường Việt Nam, không phải một chỗ dịch
  // bị bỏ quên.
  "leaderboardHonors.career",
  // `badge` của mỗi địa điểm RPG là tên KHU trên bản đồ, và bản tiếng Việt đã
  // viết bằng tiếng Anh sẵn: "SILICON VALLEY DC", "INTERNET BACKBONE". Đó là
  // tên riêng trên bản đồ, không phải chỗ dịch bị bỏ quên. Chỉ miễn trừ `badge`; `name` và `subtitle` vẫn bị
  // chấm như mọi chuỗi khác.
  // Bốn phương án của câu "thứ tự ưu tiên trong thác phân bổ công suất" là TÊN
  // HẠNG xếp bằng mũi tên: "System Critical → Guaranteed Reserved → Deferrable
  // Batch → Spot". Bản tiếng Việt đã viết chúng bằng tiếng Anh vì đó là cách
  // gọi duy nhất trong ngành, nên bản Anh trùng khít - không phải chỗ dịch bị
  // bỏ quên. Chỉ miễn trừ ĐÚNG câu này; bốn câu còn lại của trang vẫn
  // bị chấm như mọi chuỗi khác, và `question` với `explanation` của chính nó
  // cũng vậy.
  "bespokeLessons.cac-hang-uu-tien-tai-nguyen.quiz.1.options",
  // `lboAmounts` là bốn lượng công suất - "500 vCPU", "200 vCPU". Đơn vị vCPU
  // viết y hệt trong cả hai ngôn ngữ và con số thì không dịch, nên hai bản
  // trùng khít là ĐÚNG chứ không phải quên dịch. Bản cũ ("500 tỷ" / "500bn")
  // khác nhau nên chưa bao giờ chạm tới ca kiểm này.
  "bespokeLessons.cac-hang-uu-tien-tai-nguyen.lboAmounts",
  "rpgBuildings.world-boss.badge",
  "rpgBuildings.pvp.badge",
  "rpgBuildings.arcade.badge",
  "rpgBuildings.weekly-challenge.badge",
  "rpgBuildings.capacity-lab.badge",
  "rpgBuildings.cards.badge",
  "rpgBuildings.shop.badge",
  "rpgBuildings.backbone-hub.badge",
  "rpgBuildings.silicon-bay.badge",
  "rpgBuildings.cloud-capital.badge",
  "rpgBuildings.resource-floor.badge",
  "rpgBuildings.data-haven.badge",
  "rpgBuildings.singapore-dock.badge",
  // "Cơ Cơ" is the name of the study-group admin character. A proper noun
  // stays as it is in every language - the same reason the leaderboard's
  // Vietnamese nicknames are exempted in lib/i18n/dictionaries/vi.ts.
  "studyGroups.byAdmin",
  "studyGroups.pinnedByAdmin",
  "studyGroups.taitaiFailed",
  "chat.admin",
  "chat.taitaiFailed",
  // Cùng lý do, cho câu luật mà bot đăng vào phòng: cả câu đã là tiếng Anh,
  // chỉ còn đúng tên riêng "Cơ Cơ" mang dấu - và tên riêng thì giữ nguyên ở
  // mọi ngôn ngữ. Miễn trừ đúng khoá này chứ không nới ngưỡng dấu, vì ngưỡng
  // ấy là thứ bắt được bản dịch copy-paste.
  "groupChat.botRules",
  "adminChat.title",
  "groupChat.byAdmin",
  "groupChat.pinnedByAdmin",
  // Cùng "Cơ Cơ", lần này mở đầu lời chào khi phòng vừa lập. Tin nhắn bot
  // giờ lưu dạng sự kiện và dựng câu ở phía người đọc
  // (lib/study-room-bot-messages.ts), nên chuỗi này LÀ bản tiếng Anh - chỉ có
  // tên nhân vật giữ nguyên.
  "groupChat.botRules",
  // The interview drill is deliberately written in the industry's own English - these
  // four were already English in the Vietnamese source. "drillBookTitle" is the
  // title of a published guide and is never translated.
  "interview.drillTitle",
  "interview.drillBookTitle",
  "interview.goodAnswer",
  "interview.readiness",
  // The certification's official exam-domain names.
  "tracks.certification.stages",
  // The name of the algorithm, already English.
  "mistakeReview.srsBadge",
  // Same drill name as interview.drillTitle, already English in the source.
  "quizPage.ibEyebrow",
  // "Cơ Cơ" once more - the coach byline on the resume card.
  "resume.coachReminder",
  "resume.coachSuggestion",
  // "Cơ Cơ" giải thích thẻ Feynman trong bài học - trước đây bản EN viết
  // "Tai Tai" không dấu; giờ tên linh vật giữ nguyên ở mọi ngôn ngữ.
  "lessonPage.feynmanSubtitle",
  "lessonPage.feynmanCardTitle",
  "lessonPage.feynmanIntroPart2",
  // Lời thoại của chính Cơ Cơ (lib/i18n/dictionaries/sections/coco.ts).
  "coco.typingLabel",
  "coco.dashboardFirst",
  // Chatbot Cơ Cơ (components/CoCoChatbot.tsx) - câu tiếng Anh gọi tên linh vật.
  "cocoChat.fabLabel",
  "cocoChat.title",
  "cocoChat.greeting",
  "cocoChat.placeholder",
  "cocoChat.disclaimer",
  // Already English in the Vietnamese source: the game's own branded chrome
  // (studio and arsenal banners, the arena badge) and two building names. They
  // are in the dictionary rather than inline because the coverage script scores
  // by position, not by language - a hard-coded English string is still a string
  // no translator can reach.
  "characterCustomizer.badge",
  "characterCustomizer.livePreviewBadge",
  "cosmeticStore.storeAlt",
  "cosmeticStore.arsenalEyebrow",
  "pvpDuel.soloBossBadge",
  "pvpDuel.arenaEyebrow",
  "backboneSim.eyebrow",
  // Tech card names are product names - "Amazon Web Services" is the same
  // proper noun in both languages.
  "libData.techCards.card-aws.name",
  // The six illustrative learner nicknames on the logged-out leaderboard.
  // Personal names and a chosen handle are proper nouns; the same reason the
  // leaderboard nicknames in vi.ts are exempt.
  "leaderboardPreview.name1",
  "leaderboardPreview.name2",
  "leaderboardPreview.name3",
  "leaderboardPreview.name4",
  "leaderboardPreview.name5",
  "leaderboardPreview.name6",
  // "Cơ Cơ" the study coach again.
  "quizSuggestion.greeting",
  "quizSuggestion.suggestionLabel",
  // The formula carved above each lobby station's door. Algebra, in both
  // languages - and the notation is the point of showing it.
  ...["hocBai", "kiemTra", "onTap", "congCu"].map(
    (station) => `worldSpaces.lobbyStations.${station}.formula`
  ),
  // Technical terms whose English name IS the term - "SLO (Service Level
  // Objective)" is titled the same in both languages because that is what the
  // learner has to recognise on a page or in an interview.
  "dataRest.globalSearchModal.sampleGlossary",
  // A watch. Rolex Submariner Gold is the product's name, not a description.
  "dataTables.rpgInventory.items.watch_rolex.name",
  // A proper noun and a keyboard shortcut.
  "dataRest.appNavbar.gameKingdomLabel",
  "dataRest.appNavbar.cmdKHint",
  // The mascot's name on the stage-tips banner.
  "dataTables.stageTips.mascotName",
  // The bare "XP" unit suffix, and a game district's proper name.
  "miscUi.combinedRewardsWidget.xpUnit",
  "miscUi.userStats.xpUnit",
  "miscUi.xpFloatingPopup.xpUnit",
  "miscUi.lessonRoomCard.fallbackDistrictLabel",
  // "Cơ Cơ" the coach and the product's own name, in English sentences.
  "smartRemediation.titlePart1",
  "motivationShare.downloadedFilenameCaption",
  // Product names, an already-English word, and dev-tool debug labels.
  "finalTwo.logo.productName",
  // `finalTwo.bxhPage.finSocialTitle` đứng ở đây và đã trỏ vào hư không từ
  // trước: nhánh bxhPage bỏ ba khoá FinSocial cũ mà không dọn dòng miễn trừ
  // này. Giờ cả nhánh bxhPage đã đi cùng trang /bxh, nên nó chết hai lần.
  //
  // Danh sách miễn trừ không tự kêu khi một mục trong nó hết đối tượng - nó chỉ
  // im lặng không miễn trừ gì cả. Đọc nó với giả định đó.
  "finalTwo.roadmap.title",
  "finalTwo.characterAvatar.levelPrefix",
  "finalTwo.uistatsPreview",
  // Already English in the Vietnamese source: the file-type fallback label the
  // admin preview shows for a spreadsheet.
  "adminOne.filePreview.excelSpreadsheetFallback",
  // "Tự Học Công Nghệ" is the product's own name and stays in an English
  // sentence, the same way the terms page names the project it governs.
  "terms.section1Body",
  "levelUp.shareCaption",
  "levelUp.shareCaptionWithName",
  // The example name in a name field. The learners are Vietnamese, so a
  // Vietnamese placeholder name is the useful hint in either UI language.
  "chatbot.namePlaceholder",
  // Already English in the Vietnamese source: two org badges on the capacity
  // widget and the boss arena's own name.
  "bossBattle.arenaBadge",
  "capacityPlanning.orgBadge",
  "capacityPlanning.trackBadge",
  // Already English: the world-boss HP readout and its arena label, both of
  // which are the game's own English chrome in the Vietnamese source too.
  //
  // `resume.heroBanner` ĐÃ Ở ĐÂY và không đáng ở: giá trị của nó là
  // "🎓 HERO LEARNING BANNER" - tên nội bộ của chính component, viết hoa toàn
  // bộ, hiện ra cho người dùng đọc ở thẻ trên cùng bảng điều khiển. Lý do ghi
  // kèm gọi nó là "game's own English chrome", và đó là một cách nói khác của
  // "cổng kêu nên tôi tắt cổng". Nó không phải chrome của game, nó là nhãn lập
  // trình viên đặt cho khối JSX. Giờ là chữ thật ở cả hai ngôn ngữ.
  "kingdomPreview.bossRaidLabel",
  "kingdomPreview.bossHpValue",
  // The product's own name, and "Cơ Cơ" the study-group character, both of
  // which stay as they are in an English sentence.
  "onboarding.step1Title",
  "onboarding.assistantLabel",
  // Already English in the Vietnamese source: the inventory's job-title flavour
  // text and the streak-freeze feature's own name.
  "rpgInventory.levelLabel",
  "streakWidget.modalBadge",
]);

/** Flatten to dotted paths so a failure names the exact key. */
function flatten(obj: unknown, prefix = ""): Map<string, string> {
  const out = new Map<string, string>();
  if (typeof obj !== "object" || obj === null) return out;
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") out.set(path, value);
    // An array OF STRINGS is one value, not N keys. The teach-back keyword
    // markers are per-language lists used to match a free-text answer, and the
    // two languages need different numbers of them - 10 Vietnamese phrases
    // against 8 English ones is correct, not a gap. Indexing each element turned
    // that into 38 "missing keys" and would have pushed someone to pad the
    // shorter list with filler to make the build green.
    //
    // An array of OBJECTS still has to be walked. Joining one gives
    // "[object Object] | ..." on both sides, which reads as byte-identical and
    // marked the seven translated news quizzes as untranslated copy-paste.
    else if (Array.isArray(value)) {
      if (value.every((v) => typeof v === "string")) out.set(path, value.join(" | "));
      else {
        value.forEach((element, index) => {
          for (const [k, v] of flatten(element, `${path}.${index}`)) out.set(k, v);
        });
      }
    }
    else if (typeof value === "object" && value !== null) {
      for (const [k, v] of flatten(value, path)) out.set(k, v);
    }
  }
  return out;
}

const viFlat = flatten(viDict);
const enFlat = flatten(enDict);

function isExempt(path: string): boolean {
  return [...INTENTIONALLY_UNTRANSLATED].some(
    (prefix) => path === prefix || path.startsWith(`${prefix}.`)
  );
}

describe("i18n dictionary parity", () => {
  it("has the same set of keys in both dictionaries", () => {
    // tsc catches vi-without-en. This catches the other direction: a key left
    // in en.ts after being renamed or removed from vi.ts, which is dead weight
    // no compile step complains about.
    const onlyInEn = [...enFlat.keys()].filter((k) => !viFlat.has(k));
    expect(onlyInEn).toEqual([]);

    const onlyInVi = [...viFlat.keys()].filter((k) => !enFlat.has(k));
    expect(onlyInVi).toEqual([]);
  });

  it("has no Vietnamese text left in the English dictionary", () => {
    const untranslated = [...enFlat]
      .filter(([path]) => !isExempt(path))
      .filter(([, value]) => VIETNAMESE_DIACRITIC.test(value))
      .map(([path, value]) => `${path}: "${value}"`);

    expect(
      untranslated,
      "These English values still contain Vietnamese diacritics, so they were " +
        "never translated. Add a reason to INTENTIONALLY_UNTRANSLATED only if a " +
        "value genuinely must stay Vietnamese."
    ).toEqual([]);
  });

  it("does not reuse a Vietnamese string verbatim as its English value", () => {
    // Catches the diacritic-free copy-paste: "Streak", "Level", "XP" are
    // legitimately identical, but a whole Vietnamese phrase without diacritics
    // ("Cho vay", "Chi so") is not. Length is what separates the two - a short
    // token can be a shared loanword, a sentence cannot.
    //
    // `{placeholders}` are stripped before measuring. A pure format string like
    // "{current}/{goal} XP" is byte-identical in both languages because it holds
    // no words to translate, yet it is 19 characters and tripped the threshold.
    // Measuring only the prose is what the rule was actually about.
    const SHARED_TOKEN_MAX = 16;
    const prose = (value: string) => value.replace(/\{\w+\}/g, "").trim();
    const suspicious = [...enFlat]
      .filter(([path]) => !isExempt(path))
      .filter(([path, value]) => {
        const source = viFlat.get(path);
        return source !== undefined && source === value && prose(value).length > SHARED_TOKEN_MAX;
      })
      .map(([path, value]) => `${path}: "${value}"`);

    expect(
      suspicious,
      "These English values are byte-identical to the Vietnamese and too long to " +
        "be a shared loanword, so they are most likely an untranslated copy-paste."
    ).toEqual([]);
  });
});
