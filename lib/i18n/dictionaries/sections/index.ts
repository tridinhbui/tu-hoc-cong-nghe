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
import { adminTwoVi, adminTwoEn } from "./admin-two";
import { bossStudyWorldVi, bossStudyWorldEn } from "./boss-study-world";
import { careerDistrictVi, careerDistrictEn } from "./career-district";
import { certificateQuestsVi, certificateQuestsEn } from "./certificate-quests";
import { cfaCalculatorsVi, cfaCalculatorsEn } from "./cfa-calculators";
import { cfaExamVi, cfaExamEn } from "./cfa-exam";
import { cosmeticsDuelVi, cosmeticsDuelEn } from "./cosmetics-duel";
import { districtContentVi, districtContentEn } from "./district-content";
import { examsOnboardingVi, examsOnboardingEn } from "./exams-onboarding";
import { financeToolsVi, financeToolsEn } from "./finance-tools";
import { interactiveChartsVi, interactiveChartsEn } from "./interactive-charts";
import { interactiveEconVi, interactiveEconEn } from "./interactive-econ";
import { legalChatVi, legalChatEn } from "./legal-chat";
import { lessonAdminVi, lessonAdminEn } from "./lesson-admin";
import { moreCalculatorsVi, moreCalculatorsEn } from "./more-calculators";
import { networthUnlockVi, networthUnlockEn } from "./networth-unlock";
import { notesStatsVi, notesStatsEn } from "./notes-stats";
import { practicePreviewVi, practicePreviewEn } from "./practice-preview";
import { questsReferralVi, questsReferralEn } from "./quests-referral";
import { rpgStudyRoomVi, rpgStudyRoomEn } from "./rpg-study-room";
import { searchUploadVi, searchUploadEn } from "./search-upload";

export const viSections = {
  ...adminOneVi,
  ...adminTwoVi,
  ...bossStudyWorldVi,
  ...careerDistrictVi,
  ...certificateQuestsVi,
  ...cfaCalculatorsVi,
  ...cfaExamVi,
  ...cosmeticsDuelVi,
  ...districtContentVi,
  ...examsOnboardingVi,
  ...financeToolsVi,
  ...interactiveChartsVi,
  ...interactiveEconVi,
  ...legalChatVi,
  ...lessonAdminVi,
  ...moreCalculatorsVi,
  ...networthUnlockVi,
  ...notesStatsVi,
  ...practicePreviewVi,
  ...questsReferralVi,
  ...rpgStudyRoomVi,
  ...searchUploadVi,
};

export const enSections: typeof viSections = {
  ...adminOneEn,
  ...adminTwoEn,
  ...bossStudyWorldEn,
  ...careerDistrictEn,
  ...certificateQuestsEn,
  ...cfaCalculatorsEn,
  ...cfaExamEn,
  ...cosmeticsDuelEn,
  ...districtContentEn,
  ...examsOnboardingEn,
  ...financeToolsEn,
  ...interactiveChartsEn,
  ...interactiveEconEn,
  ...legalChatEn,
  ...lessonAdminEn,
  ...moreCalculatorsEn,
  ...networthUnlockEn,
  ...notesStatsEn,
  ...practicePreviewEn,
  ...questsReferralEn,
  ...rpgStudyRoomEn,
  ...searchUploadEn,
};
