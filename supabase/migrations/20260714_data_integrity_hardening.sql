-- QA follow-up (Medium/Low findings) - server-side backstops for input that
-- was previously only validated in the browser. None of these change any
-- app behavior for well-behaved clients; they only reject requests that
-- bypass the UI (devtools, direct REST calls).

-- M-1 / L-2: financial-tools money fields (net worth, budget, emergency
-- fund) only had `min={0}` on the <input> (a UI hint, not a real guard) and
-- no upper bound - lib/financial-tools.ts now clamps before writing, these
-- CHECK constraints are the backstop if that's ever bypassed.
do $$ begin
  alter table public.net_worth_snapshots
    add constraint net_worth_snapshots_assets_nonneg check (total_assets >= 0 and total_assets <= 1000000000000);
exception when duplicate_object then null;
end $$;

do $$ begin
  alter table public.net_worth_snapshots
    add constraint net_worth_snapshots_liabilities_nonneg check (total_liabilities >= 0 and total_liabilities <= 1000000000000);
exception when duplicate_object then null;
end $$;

do $$ begin
  alter table public.budget_plans
    add constraint budget_plans_nonneg check (
      monthly_income >= 0 and needs_amount >= 0 and wants_amount >= 0 and savings_amount >= 0
    );
exception when duplicate_object then null;
end $$;

do $$ begin
  alter table public.emergency_funds
    add constraint emergency_funds_nonneg check (
      monthly_expenses >= 0 and current_saved >= 0 and target_months >= 1 and target_months <= 60
    );
exception when duplicate_object then null;
end $$;

-- M-5: full_name/bio were only length-checked client-side
-- (app/settings/page.tsx slices to 240 chars on change) - a direct REST
-- call could write arbitrarily long values.
do $$ begin
  alter table public.user_profiles
    add constraint user_profiles_full_name_length check (char_length(full_name) <= 100);
exception when duplicate_object then null;
end $$;

do $$ begin
  alter table public.user_profiles
    add constraint user_profiles_bio_length check (char_length(bio) <= 240);
exception when duplicate_object then null;
end $$;

-- M-6: avatar upload only validated file type/size in the browser
-- (app/settings/page.tsx) - `File.type` is client-reported and easy to
-- spoof. Enforce the same limits at the storage bucket itself.
update storage.buckets
set file_size_limit = 2097152, -- 2 MB, matches the client-side check
    allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
where id = 'avatars';
