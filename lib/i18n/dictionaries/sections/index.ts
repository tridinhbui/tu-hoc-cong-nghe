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
import { certificateQuestsVi, certificateQuestsEn } from "./certificate-quests";
import { cfaCalculatorsVi, cfaCalculatorsEn } from "./cfa-calculators";
import { communityLearningVi, communityLearningEn } from "./community-learning";
import { cosmeticsDuelVi, cosmeticsDuelEn } from "./cosmetics-duel";
import { dataRestVi, dataRestEn } from "./data-rest";
import { toolsSectionVi, toolsSectionEn } from "./tools-section";
import { dataTablesVi, dataTablesEn } from "./data-tables";
import { docsAuthVi, docsAuthEn } from "./docs-auth";
import { examsOnboardingVi, examsOnboardingEn } from "./exams-onboarding";
import { finalOneVi, finalOneEn } from "./final-one";
import { finalTwoVi, finalTwoEn } from "./final-two";
import { formulaGlossaryVi, formulaGlossaryEn } from "./formula-glossary";
import { gamesVi, gamesEn } from "./games";
import { interactiveChartsVi, interactiveChartsEn } from "./interactive-charts";
import { interactiveEconVi, interactiveEconEn } from "./interactive-econ";
import { interactiveRestVi, interactiveRestEn } from "./interactive-rest";
import { learningPathVi, learningPathEn } from "./learning-path";
import { leaderboardHonorsVi, leaderboardHonorsEn } from "./leaderboard-honors";
import { rpgBuildingsCopyVi, rpgBuildingsCopyEn } from "./rpg-buildings-copy";
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
import { avatarOptionsVi, avatarOptionsEn } from "./avatar-options";
import { miscDataVi, miscDataEn } from "./misc-data";
import { libStringsVi, libStringsEn } from "./lib-strings";
import { dashboardArenaVi, dashboardArenaEn } from "./dashboard-arena";
import { bespokeLessonsVi, bespokeLessonsEn } from "./bespoke-lessons";
import { badgesCompetencyVi, badgesCompetencyEn } from "./badges-competency";
import { wisdomCardsVi, wisdomCardsEn } from "./wisdom-cards";
import { quietCornerCopyVi, quietCornerCopyEn } from "./quiet-corner";
import { rpgStudyRoomVi, rpgStudyRoomEn } from "./rpg-study-room";
import { worldSpacesVi, worldSpacesEn } from "./world-spaces";
import { searchUploadVi, searchUploadEn } from "./search-upload";

export const viSections = {
  ...toolsSectionVi,
  ...cfaCalculatorsVi,
  ...adminOneVi,
  ...adminThreeVi,
  ...adminTwoVi,
  ...bossStudyWorldVi,
  ...certificateQuestsVi,
  ...cosmeticsDuelVi,
  ...dataRestVi,
  ...dataTablesVi,
  ...docsAuthVi,
  ...examsOnboardingVi,
  ...finalOneVi,
  ...finalTwoVi,
  ...formulaGlossaryVi,
  ...gamesVi,
  ...interactiveChartsVi,
  ...interactiveEconVi,
  ...interactiveRestVi,
  ...learningPathVi,
  ...leaderboardHonorsVi,
  ...rpgBuildingsCopyVi,
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
  ...avatarOptionsVi,
  ...miscDataVi,
  ...libStringsVi,
  ...dashboardArenaVi,
  ...bespokeLessonsVi,
  ...badgesCompetencyVi,
  ...wisdomCardsVi,
  ...quietCornerCopyVi,
  ...rpgStudyRoomVi,
  ...worldSpacesVi,
  ...communityLearningVi,
  ...searchUploadVi,
};

export const enSections: typeof viSections = {
  ...toolsSectionEn,
  ...cfaCalculatorsEn,
  ...adminOneEn,
  ...adminThreeEn,
  ...adminTwoEn,
  ...bossStudyWorldEn,
  ...certificateQuestsEn,
  ...cosmeticsDuelEn,
  ...dataRestEn,
  ...dataTablesEn,
  ...docsAuthEn,
  ...examsOnboardingEn,
  ...finalOneEn,
  ...finalTwoEn,
  ...formulaGlossaryEn,
  ...gamesEn,
  ...interactiveChartsEn,
  ...interactiveEconEn,
  ...interactiveRestEn,
  ...learningPathEn,
  ...leaderboardHonorsEn,
  ...rpgBuildingsCopyEn,
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
  ...avatarOptionsEn,
  ...miscDataEn,
  ...libStringsEn,
  ...dashboardArenaEn,
  ...bespokeLessonsEn,
  ...badgesCompetencyEn,
  ...wisdomCardsEn,
  ...quietCornerCopyEn,
  ...rpgStudyRoomEn,
  ...worldSpacesEn,
  ...communityLearningEn,
  ...searchUploadEn,
};
