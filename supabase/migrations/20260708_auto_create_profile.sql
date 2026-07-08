-- Create user_profiles row automatically when a new user signs up in auth.users.
-- Previously this happened nowhere, so new users had no profile row - any attempt
-- to upsert tour_flags, onboarding state, etc. on their profile would fail silently
-- (the row didn't exist, so upsert couldn't find it to update). This causes tours
-- to reappear on every login since the "seen" flag never actually persists.

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists create_profile_for_auth_user();

create function public.create_profile_for_auth_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    (new.raw_user_meta_data ->> 'full_name')::text
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.create_profile_for_auth_user();
