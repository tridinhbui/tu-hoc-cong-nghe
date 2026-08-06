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

import { careerDistrictVi, careerDistrictEn } from "./career-district";
import { cfaCalculatorsVi, cfaCalculatorsEn } from "./cfa-calculators";
import { cosmeticsDuelVi, cosmeticsDuelEn } from "./cosmetics-duel";
import { districtContentVi, districtContentEn } from "./district-content";
import { examsOnboardingVi, examsOnboardingEn } from "./exams-onboarding";
import { financeToolsVi, financeToolsEn } from "./finance-tools";
import { notesStatsVi, notesStatsEn } from "./notes-stats";
import { practicePreviewVi, practicePreviewEn } from "./practice-preview";
import { rpgStudyRoomVi, rpgStudyRoomEn } from "./rpg-study-room";

export const viSections = {
  ...careerDistrictVi,
  ...cfaCalculatorsVi,
  ...cosmeticsDuelVi,
  ...districtContentVi,
  ...examsOnboardingVi,
  ...financeToolsVi,
  ...notesStatsVi,
  ...practicePreviewVi,
  ...rpgStudyRoomVi,
};

export const enSections: typeof viSections = {
  ...careerDistrictEn,
  ...cfaCalculatorsEn,
  ...cosmeticsDuelEn,
  ...districtContentEn,
  ...examsOnboardingEn,
  ...financeToolsEn,
  ...notesStatsEn,
  ...practicePreviewEn,
  ...rpgStudyRoomEn,
};
