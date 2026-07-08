-- Per-account "have they seen this one-time product tour" flags.
--
-- The dashboard/lesson spotlight tours previously only tracked "seen" state
-- in the browser's localStorage. That breaks the "show it exactly once per
-- account" requirement in a few real ways: a different browser/device for
-- the same account never learns it was already seen, and on some mobile
-- Safari configurations (private browsing, aggressive storage eviction)
-- localStorage doesn't reliably persist between visits at all, so the tour
-- reappears on almost every login.
--
-- `tour_flags` is a small JSON bag rather than one boolean column per tour
-- so new tours (there will likely be more over time) don't each need their
-- own migration - the app just reads/writes a new key inside the same
-- column, e.g. {"dashboard": true, "lesson": true}.
alter table public.user_profiles
  add column if not exists tour_flags jsonb not null default '{}'::jsonb;
