# Supabase Schema - Tự Học Tài Chính

## Cách setup

1. Vào Supabase Dashboard: https://app.supabase.com
2. Chọn project `tuhoctaichinh`
3. Vào SQL Editor
4. Chạy các SQL scripts dưới đây

---

## 1. Table: `lessons` (Lưu trữ tất cả 200 bài học)

```sql
create table if not exists public.lessons (
  id bigint primary key,
  slug text not null unique,
  title text not null,
  subtitle text,
  stage_number int not null,
  day_number int not null,
  duration text,
  difficulty text,
  emoji text,
  opening_question text,
  opening_options text[],
  correct_option int,
  explanation text,
  key_takeaways text[],
  status text default 'draft', -- 'draft', 'ready', 'published'
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index
create index lessons_stage_idx on public.lessons(stage_number);
create index lessons_day_idx on public.lessons(day_number);
create index lessons_status_idx on public.lessons(status);
```

---

## 2. Table: `user_profiles` (Thông tin người dùng)

```sql
create table if not exists public.user_profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  bio text,
  current_level int default 1,
  total_xp int default 0,
  lessons_completed int default 0,
  avg_quiz_score float default 0,
  current_stage int default 1,
  preferred_track text default 'personal', -- 'personal' or 'professional'
  dark_mode boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index
create index user_profiles_email_idx on public.user_profiles(email);
```

---

## 3. Table: `user_progress` (Tiến độ học của mỗi user)

```sql
create table if not exists public.user_progress (
  id bigint primary key generated always as identity,
  user_id uuid not null references public.user_profiles on delete cascade,
  lesson_id bigint not null references public.lessons on delete cascade,
  completed boolean default false,
  completed_at timestamp with time zone,
  quiz_score int, -- 0-100
  time_spent_seconds int, -- Thời gian học bài này
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, lesson_id)
);

-- Index
create index user_progress_user_idx on public.user_progress(user_id);
create index user_progress_lesson_idx on public.user_progress(lesson_id);
create index user_progress_completed_idx on public.user_progress(completed);
```

---

## 4. Table: `user_stats` (Thống kê chi tiết)

```sql
create table if not exists public.user_stats (
  id bigint primary key generated always as identity,
  user_id uuid not null unique references public.user_profiles on delete cascade,
  total_lessons_completed int default 0,
  total_xp int default 0,
  current_level int default 1,
  avg_quiz_score float default 0,
  longest_streak int default 0, -- Ngày liên tiếp học
  last_lesson_date date,
  total_study_time_hours int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index
create index user_stats_user_idx on public.user_stats(user_id);
create index user_stats_level_idx on public.user_stats(current_level);
create index user_stats_xp_idx on public.user_stats(total_xp);
```

---

## 5. Table: `leaderboard_cache` (Bảng xếp hạng - cập nhật hàng ngày)

```sql
create table if not exists public.leaderboard_cache (
  id bigint primary key generated always as identity,
  user_id uuid not null references public.user_profiles on delete cascade,
  rank int,
  total_xp int,
  lessons_completed int,
  avg_quiz_score float,
  updated_at timestamp with time zone default now()
);

-- Index
create index leaderboard_rank_idx on public.leaderboard_cache(rank);
create index leaderboard_updated_idx on public.leaderboard_cache(updated_at);
```

---

## 6. Row Level Security (RLS) - Bảo mật

```sql
-- Lessons table: Mọi người có thể đọc
alter table public.lessons enable row level security;
create policy "Lessons are readable by everyone" on public.lessons for select using (true);

-- User Profiles: Chỉ chính người dùng hoặc admin
alter table public.user_profiles enable row level security;
create policy "Users can view their own profile" on public.user_profiles
  for select using (auth.uid() = id or auth.jwt() ->> 'role' = 'admin');
create policy "Users can update their own profile" on public.user_profiles
  for update using (auth.uid() = id);

-- User Progress: Chỉ chính người dùng
alter table public.user_progress enable row level security;
create policy "Users can view their own progress" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "Users can create/update their own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);
create policy "Users can update their own progress" on public.user_progress
  for update using (auth.uid() = user_id);

-- User Stats: Chỉ chính người dùng
alter table public.user_stats enable row level security;
create policy "Users can view their own stats" on public.user_stats
  for select using (auth.uid() = user_id);

-- Leaderboard: Mọi người có thể xem
alter table public.leaderboard_cache enable row level security;
create policy "Leaderboard is public" on public.leaderboard_cache for select using (true);
```

---

## Cách dùng

### 1. Tạo user profile khi người dùng đăng ký

```typescript
const createUserProfile = async (userId: string, email: string, fullName: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        id: userId,
        email,
        full_name: fullName,
        current_level: 1,
        total_xp: 0
      }
    ])
    .select();

  return { data, error };
};
```

### 2. Lưu bài học đã hoàn thành

```typescript
const markLessonComplete = async (userId: string, lessonId: number, quizScore: number) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert([
      {
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
        quiz_score: quizScore
      }
    ])
    .select();

  return { data, error };
};
```

### 3. Cập nhật user stats

```typescript
const updateUserStats = async (userId: string) => {
  // Tính toán từ user_progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('completed, quiz_score')
    .eq('user_id', userId)
    .eq('completed', true);

  const lessonsCompleted = progress?.length || 0;
  const totalXp = lessonsCompleted * 10; // 10 XP per lesson
  const avgScore = progress?.reduce((sum, p) => sum + (p.quiz_score || 0), 0) / lessonsCompleted || 0;

  const { error } = await supabase
    .from('user_stats')
    .upsert([
      {
        user_id: userId,
        total_lessons_completed: lessonsCompleted,
        total_xp: totalXp,
        current_level: Math.floor(totalXp / 150) + 1,
        avg_quiz_score: Math.round(avgScore)
      }
    ]);

  return { error };
};
```

### 4. Lấy leaderboard

```typescript
const getLeaderboard = async () => {
  const { data } = await supabase
    .from('user_stats')
    .select(`
      user_id,
      total_xp,
      total_lessons_completed,
      avg_quiz_score,
      user_profiles(full_name, email)
    `)
    .order('total_xp', { ascending: false })
    .limit(10);

  return data;
};
```

---

## Cấu trúc dữ liệu ví dụ

### lessons table
| id | title | stage_number | day_number | status |
|----|-------|--------------|-----------|--------|
| 1 | Tự học Tài chính Day 1: Tài chính là gì... | 1 | 1 | draft |
| 2 | Tự học Tài chính Day 2: Tiền là gì... | 1 | 2 | draft |

### user_profiles table
| id | email | full_name | current_level | total_xp | lessons_completed |
|----|-------|-----------|---------------|----------|------------------|
| uuid-123 | user@email.com | Nguyễn Văn A | 2 | 120 | 12 |

### user_progress table
| user_id | lesson_id | completed | quiz_score | completed_at |
|---------|-----------|-----------|-----------|--------------|
| uuid-123 | 1 | true | 85 | 2026-07-04 |

### user_stats table
| user_id | total_xp | total_lessons_completed | current_level | avg_quiz_score |
|---------|----------|------------------------|---------------|----------------|
| uuid-123 | 120 | 12 | 2 | 82 |

---

## Chạy SQL

Sao chép từng script SQL vào SQL Editor của Supabase và chạy. Hoặc tạo một migration file.
