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
const ETHICS_STANDARD_CITATIONS = ["mnpi", "gift", "fair", "record"].flatMap(
  (c) => [
    `interactiveRest.ethicsCase.${c}Standard`,
    `interactiveRest.ethicsCase.${c}Distractor1`,
    `interactiveRest.ethicsCase.${c}Distractor2`,
    `interactiveRest.ethicsCase.${c}Distractor3`,
  ]
);

const INTENTIONALLY_UNTRANSLATED = new Set([
  // The difficulty table is keyed BY the Vietnamese value, because `difficulty`
  // is a Vietnamese string union used as a value across the app (see
  // LessonTranslation in lib/lesson-types.ts). The keys are data, not copy.
  "difficulty",
  // "Tài Tài" is the name of the study-group admin character. A proper noun
  // stays as it is in every language - the same reason the leaderboard's
  // Vietnamese nicknames are exempted in lib/i18n/dictionaries/vi.ts.
  "studyGroups.byAdmin",
  "studyGroups.pinnedByAdmin",
  "chat.admin",
  "adminChat.title",
  "groupChat.byAdmin",
  "groupChat.pinnedByAdmin",
  // Already English: the in-game clan's own name, not copy to translate.
  "guild.clanTitle",
  // Ticker symbols. FPT is FPT in every language.
  "guild.step2Tickers",
  // "Tài Tài" again, plus the illustrative learner names in the logged-out
  // preview ("Hà Tường Vy", "Hà Hồng"). Personal names are proper nouns.
  "ecosystem.adminByline",
  "ecosystem.adminMessage",
  // Already English.
  "ecosystem.samplerLabel",
  // The IB drill is deliberately written in the industry's own English - these
  // four were already English in the Vietnamese source. "drillBookTitle" is the
  // title of a published guide and is never translated.
  "interview.drillTitle",
  "interview.drillBookTitle",
  "interview.goodAnswer",
  "interview.readiness",
  // Ticker lines on the game map. A ticker symbol and a figure, already English.
  "worldMap.tickerIndex",
  "worldMap.tickerClan",
  // The official CFA Level I subject names, which is why they are already
  // English in the Vietnamese dictionary. Translating them would stop them
  // matching the exam.
  "tracks.cfa.stages",
  // The name of the algorithm, already English.
  "mistakeReview.srsBadge",
  // Same drill name as interview.drillTitle, already English in the source.
  "quizPage.ibEyebrow",
  // "Tài Tài" once more - the coach byline on the resume card.
  "resume.coachReminder",
  "resume.coachSuggestion",
  // Already English in the Vietnamese source: the game's own branded chrome
  // (studio and arsenal banners, the arena badge) and two building names. They
  // are in the dictionary rather than inline because the coverage script scores
  // by position, not by language - a hard-coded English string is still a string
  // no translator can reach.
  "characterCustomizer.badge",
  "characterCustomizer.livePreviewBadge",
  "cosmeticStore.storeAlt",
  "cosmeticStore.arsenalEyebrow",
  "cosmeticStore.arsenalTitle",
  "pvpDuel.soloBossBadge",
  "pvpDuel.arenaEyebrow",
  "fedVault.buildingAlt",
  "fedVault.fedEyebrow",
  // Already English in the Vietnamese source: the season pass's own name and
  // the in-game titles it awards. A title is a proper noun the learner then
  // wears on their profile, so it reads the same in both languages.
  "seasonPass.badge",
  "seasonPass.levelLabel",
  "seasonPass.rewards",
  // The six illustrative learner nicknames on the logged-out leaderboard.
  // Personal names and a chosen handle are proper nouns; the same reason the
  // leaderboard nicknames in vi.ts are exempt.
  "leaderboardPreview.name1",
  "leaderboardPreview.name2",
  "leaderboardPreview.name3",
  "leaderboardPreview.name4",
  "leaderboardPreview.name5",
  "leaderboardPreview.name6",
  // The CFA Standards of Professional Conduct, cited by official code and title
  // - "II(A) Material Nonpublic Information". Already English in the Vietnamese
  // source for the same reason the Level I subject names are: translating one
  // stops it matching the Standard the learner is tested on. Listed key by key
  // rather than exempting the whole ethicsCase block, which also holds the case
  // scenarios and reasoning - prose that must be caught if left untranslated.
  ...ETHICS_STANDARD_CITATIONS,
  // "Tài Tài" the study coach again, and the IB track's own name, which is
  // already English in the Vietnamese source.
  "quizSuggestion.greeting",
  "quizSuggestion.suggestionLabel",
  "quizSuggestion.trackIb",
  // Formulas: a DuPont decomposition and the compound-interest options, which
  // are algebra in both languages. Translating "FV" or "PV" would stop them
  // matching the lesson that teaches them.
  "games.millionaire.questions.6.explanation",
  "games.snowballRacer.quizBoosts.compoundFormula.options",
  // District names on the game map, already English in the Vietnamese source -
  // the game's own geography, the same as the Goldman and Fed badges.
  "games.algoTrader.subtitleBadge",
  "games.candlestick.districtBadge",
  "games.maSpeedrun.districtBadge",
  // A URL, not a sentence: the example YouTube link in the admin video field.
  "adminTwo.cfaLibrary.videoLinkPlaceholder",
  // Already English in the Vietnamese source: the file-type fallback label the
  // admin preview shows for a spreadsheet.
  "adminOne.filePreview.excelSpreadsheetFallback",
  // Formulas, not sentences. "Revenue - COGS - OpEx" is the same line of
  // accounting in both languages; translating the terms would stop them
  // matching the statements the lesson teaches.
  "cashFlowSim.accountingProfitFormula",
  "cashFlowSim.realCashFlowFormula",
  "cashFlowSim.cashFlowLineFormula",
  "roeCalc.formulaBreakdown",
  // "Tự Học Tài Chính" is the product's own name and stays in an English
  // sentence, the same way the terms page names the project it governs.
  "terms.section1Body",
  "levelUp.shareCaption",
  "levelUp.shareCaptionWithName",
  // The example name in a name field. The learners are Vietnamese, so a
  // Vietnamese placeholder name is the useful hint in either UI language.
  "chatbot.namePlaceholder",
  // Already English in the Vietnamese source: two org badges on the Goldman
  // widget, the boss arena's own name, and the glossary's title (it is a
  // bilingual glossary, so its heading is English on both sides on purpose).
  "bossBattle.arenaBadge",
  "goldmanWidget.orgBadge",
  "goldmanWidget.trackBadge",
  "cfaGlossary.heading",
  // Already English: a banner label and the world-boss HP readout, both of
  // which are the game's own English chrome in the Vietnamese source too.
  "resume.heroBanner",
  "kingdomPreview.bossRaidLabel",
  "kingdomPreview.bossHpValue",
  // The product's own name, and "Tài Tài" the study-group character, both of
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
