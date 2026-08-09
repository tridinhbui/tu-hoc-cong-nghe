// Per-screen dictionary sections, kept in their own files.
//
// The two big dictionaries are append-only in practice, so several people (or
// several agents) adding a screen at the same time all rewrite the same last
// line of vi.ts and en.ts and clobber each other. A section in its own file has
// no shared anchor. `vi.ts` spreads `viSections` and `en.ts` spreads
// `enSections`, so a key added here is a key on `Dictionary` exactly as if it
// had been written inline - including the compile error when en.ts lacks it.
//
// Each section file exports `<name>Vi` and `<name>En: typeof <name>Vi`.

import { adminOneVi, adminOneEn } from "./admin-one";
import { adminThreeVi, adminThreeEn } from "./admin-three";
import { adminTwoVi, adminTwoEn } from "./admin-two";
import { bossStudyWorldVi, bossStudyWorldEn } from "./boss-study-world";
import { careerDistrictVi, careerDistrictEn } from "./career-district";
import { careerFrmVi, careerFrmEn } from "./career-frm";
import { certificateQuestsVi, certificateQuestsEn } from "./certificate-quests";
import { cfaCalculatorsVi, cfaCalculatorsEn } from "./cfa-calculators";
import { cfaExamVi, cfaExamEn } from "./cfa-exam";
import { cosmeticsDuelVi, cosmeticsDuelEn } from "./cosmetics-duel";
import { dataRestVi, dataRestEn } from "./data-rest";
import { dataTablesVi, dataTablesEn } from "./data-tables";
import { districtContentVi, districtContentEn } from "./district-content";
import { docsAuthVi, docsAuthEn } from "./docs-auth";
import { examsOnboardingVi, examsOnboardingEn } from "./exams-onboarding";
import { financeToolsVi, financeToolsEn } from "./finance-tools";
import { finalOneVi, finalOneEn } from "./final-one";
import { finalTwoVi, finalTwoEn } from "./final-two";
import { formulaGlossaryVi, formulaGlossaryEn } from "./formula-glossary";
import { gamesVi, gamesEn } from "./games";
import { interactiveChartsVi, interactiveChartsEn } from "./interactive-charts";
import { interactiveEconVi, interactiveEconEn } from "./interactive-econ";
import { interactiveRestVi, interactiveRestEn } from "./interactive-rest";
import { learningPathVi, learningPathEn } from "./learning-path";
import { leaderboardHonorsVi, leaderboardHonorsEn } from "./leaderboard-honors";
import { legalChatVi, legalChatEn } from "./legal-chat";
import { libDataVi, libDataEn } from "./lib-data";
import { lessonAdminVi, lessonAdminEn } from "./lesson-admin";
import { miscUiVi, miscUiEn } from "./misc-ui";
import { moreCalculatorsVi, moreCalculatorsEn } from "./more-calculators";
import { networthUnlockVi, networthUnlockEn } from "./networth-unlock";
import { notesStatsVi, notesStatsEn } from "./notes-stats";
import { placementFocusVi, placementFocusEn } from "./placement-focus";
import { practicePreviewVi, practicePreviewEn } from "./practice-preview";
import { questsReferralVi, questsReferralEn } from "./quests-referral";
import { quietForestVi, quietForestEn } from "./quiet-forest";
import { lobbyLeaderboardsVi, lobbyLeaderboardsEn } from "./lobby-leaderboards";
import { levelTitlesVi, levelTitlesEn } from "./level-titles";
import { trackStagesVi, trackStagesEn } from "./track-stages";
import { motivationVi, motivationEn } from "./motivation";
import { questsVi, questsEn } from "./quests";
import { gamesMetaVi, gamesMetaEn } from "./games-meta";
import { wisdomCardsVi, wisdomCardsEn } from "./wisdom-cards";
import { quietCornerCopyVi, quietCornerCopyEn } from "./quiet-corner";
import { rpgStudyRoomVi, rpgStudyRoomEn } from "./rpg-study-room";
import { valuationSimVi, valuationSimEn } from "./valuation-sim";
import { worldSpacesVi, worldSpacesEn } from "./world-spaces";
import { searchUploadVi, searchUploadEn } from "./search-upload";

export const viSections = {
  ...adminOneVi,
  ...adminThreeVi,
  ...adminTwoVi,
  ...bossStudyWorldVi,
  ...careerDistrictVi,
  ...careerFrmVi,
  ...certificateQuestsVi,
  ...cfaCalculatorsVi,
  ...cfaExamVi,
  ...cosmeticsDuelVi,
  ...dataRestVi,
  ...dataTablesVi,
  ...districtContentVi,
  ...docsAuthVi,
  ...examsOnboardingVi,
  ...financeToolsVi,
  ...finalOneVi,
  ...finalTwoVi,
  ...formulaGlossaryVi,
  ...gamesVi,
  ...interactiveChartsVi,
  ...interactiveEconVi,
  ...interactiveRestVi,
  ...learningPathVi,
  ...leaderboardHonorsVi,
  ...legalChatVi,
  ...libDataVi,
  ...lessonAdminVi,
  ...miscUiVi,
  ...moreCalculatorsVi,
  ...networthUnlockVi,
  ...notesStatsVi,
  ...placementFocusVi,
  ...practicePreviewVi,
  ...questsReferralVi,
  ...quietForestVi,
  ...lobbyLeaderboardsVi,
  ...levelTitlesVi,
  ...trackStagesVi,
  ...motivationVi,
  ...questsVi,
  ...gamesMetaVi,
  ...wisdomCardsVi,
  ...quietCornerCopyVi,
  ...rpgStudyRoomVi,
  ...valuationSimVi,
  ...worldSpacesVi,
  ...searchUploadVi,
};

export const enSections: typeof viSections = {
  ...adminOneEn,
  ...adminThreeEn,
  ...adminTwoEn,
  ...bossStudyWorldEn,
  ...careerDistrictEn,
  ...careerFrmEn,
  ...certificateQuestsEn,
  ...cfaCalculatorsEn,
  ...cfaExamEn,
  ...cosmeticsDuelEn,
  ...dataRestEn,
  ...dataTablesEn,
  ...districtContentEn,
  ...docsAuthEn,
  ...examsOnboardingEn,
  ...financeToolsEn,
  ...finalOneEn,
  ...finalTwoEn,
  ...formulaGlossaryEn,
  ...gamesEn,
  ...interactiveChartsEn,
  ...interactiveEconEn,
  ...interactiveRestEn,
  ...learningPathEn,
  ...leaderboardHonorsEn,
  ...legalChatEn,
  ...libDataEn,
  ...lessonAdminEn,
  ...miscUiEn,
  ...moreCalculatorsEn,
  ...networthUnlockEn,
  ...notesStatsEn,
  ...placementFocusEn,
  ...practicePreviewEn,
  ...questsReferralEn,
  ...quietForestEn,
  ...lobbyLeaderboardsEn,
  ...levelTitlesEn,
  ...trackStagesEn,
  ...motivationEn,
  ...questsEn,
  ...gamesMetaEn,
  ...wisdomCardsEn,
  ...quietCornerCopyEn,
  ...rpgStudyRoomEn,
  ...valuationSimEn,
  ...worldSpacesEn,
  ...searchUploadEn,
};
