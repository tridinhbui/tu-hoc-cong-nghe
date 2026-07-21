-- Adds optional YouTube video and interactive-widget support to CFA
-- modules, so the CFA module page (components/CfaModulePageClient.tsx) can
-- reach feature parity with the regular lesson page. The Book/Reading/
-- Module tables themselves were created outside this repo's tracked
-- migrations (external import, PascalCase naming) - this migration only
-- ALTERs the existing "Module" table, it doesn't own its creation.

alter table public."Module" add column if not exists "videoUrl" text;

-- Mirrors the same string union already used by lib/lesson-types.ts's
-- Lesson.interactiveType / components/InteractiveWidget.tsx - no new
-- widget component needed, just wiring this value through.
alter table public."Module" add column if not exists "interactiveType" text;
