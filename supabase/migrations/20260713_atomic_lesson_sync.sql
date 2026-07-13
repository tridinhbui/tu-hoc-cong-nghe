create or replace function public.sync_lessons_atomic(p_lessons jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  payload_count integer;
  affected_count integer;
begin
  if jsonb_typeof(p_lessons) <> 'array' then
    raise exception 'p_lessons must be a JSON array';
  end if;

  create temporary table tmp_sync_lessons (
    id bigint primary key,
    slug text not null,
    title text not null,
    subtitle text,
    duration text,
    difficulty text,
    emoji text,
    opening_question text,
    opening_options jsonb,
    correct_option integer,
    explanation text,
    key_takeaways jsonb,
    track text not null,
    status text not null,
    stage_number integer,
    day_number integer
  ) on commit drop;

  insert into tmp_sync_lessons (
    id,
    slug,
    title,
    subtitle,
    duration,
    difficulty,
    emoji,
    opening_question,
    opening_options,
    correct_option,
    explanation,
    key_takeaways,
    track,
    status,
    stage_number,
    day_number
  )
  select
    x.id,
    x.slug,
    x.title,
    x.subtitle,
    x.duration,
    x.difficulty,
    x.emoji,
    x.opening_question,
    x.opening_options,
    x.correct_option,
    x.explanation,
    x.key_takeaways,
    coalesce(x.track, 'professional'),
    coalesce(x.status, 'published'),
    x.stage_number,
    x.day_number
  from jsonb_to_recordset(p_lessons) as x(
    id bigint,
    slug text,
    title text,
    subtitle text,
    duration text,
    difficulty text,
    emoji text,
    opening_question text,
    opening_options jsonb,
    correct_option integer,
    explanation text,
    key_takeaways jsonb,
    track text,
    status text,
    stage_number integer,
    day_number integer
  );

  select count(*) into payload_count from tmp_sync_lessons;

  if payload_count <> jsonb_array_length(p_lessons) then
    raise exception 'Payload contains duplicate lesson ids';
  end if;

  if exists (
    select 1
    from tmp_sync_lessons
    group by slug
    having count(*) > 1
  ) then
    raise exception 'Payload contains duplicate lesson slugs';
  end if;

  lock table public.lessons in share row exclusive mode;

  update public.lessons l
  set
    slug = '__sync_tmp__' || l.id || '__' || substr(md5(random()::text || clock_timestamp()::text), 1, 10),
    updated_at = now()
  from tmp_sync_lessons s
  where l.slug = s.slug
    and l.id <> s.id;

  insert into public.lessons (
    id,
    slug,
    title,
    subtitle,
    duration,
    difficulty,
    emoji,
    opening_question,
    opening_options,
    correct_option,
    explanation,
    key_takeaways,
    track,
    status,
    stage_number,
    day_number
  )
  select
    id,
    slug,
    title,
    subtitle,
    duration,
    difficulty,
    emoji,
    opening_question,
    opening_options,
    correct_option,
    explanation,
    key_takeaways,
    track,
    status,
    stage_number,
    day_number
  from tmp_sync_lessons
  on conflict (id) do update
  set
    slug = excluded.slug,
    title = excluded.title,
    subtitle = excluded.subtitle,
    duration = excluded.duration,
    difficulty = excluded.difficulty,
    emoji = excluded.emoji,
    opening_question = excluded.opening_question,
    opening_options = excluded.opening_options,
    correct_option = excluded.correct_option,
    explanation = excluded.explanation,
    key_takeaways = excluded.key_takeaways,
    track = excluded.track,
    status = excluded.status,
    stage_number = excluded.stage_number,
    day_number = excluded.day_number,
    updated_at = now();

  delete from public.lessons l
  where not exists (
    select 1
    from tmp_sync_lessons s
    where s.id = l.id
  );

  get diagnostics affected_count = row_count;
  return payload_count;
end;
$$;

grant execute on function public.sync_lessons_atomic(jsonb) to service_role;
