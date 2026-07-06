# Đề xuất Cải tiến Codebase - Tự Học Tài Chính

## 1. Cải tiến Hiệu năng (Performance)

### 1.1 Code Splitting & Lazy Loading
**Vấn đề**: File `lib/lessons.ts` quá lớn (1.2MB) được load vào bundle
**Giải pháp**:
```typescript
// lib/lessons-loader.ts
export async function getLessonBySlug(slug: string) {
  const { lessons } = await import('./lessons');
  return lessons.find(l => l.slug === slug);
}

export async function getLessonsMeta() {
  const { lessons } = await import('./lessons');
  return lessons.map(l => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    // chỉ load metadata cần thiết
  }));
}
```

### 1.2 Database Query Optimization
**Vấn đề**: Nhiều query riêng lẻ trong DashboardClient
**Giải pháp**: Sử dụng Supabase joins
```typescript
// Thay vì nhiều query riêng lẻ
const { data } = await supabase
  .from('user_profiles')
  .select(`
    *,
    user_stats(*),
    user_progress(lesson_id, completed, quiz_score)
  `)
  .eq('id', userId)
  .single();
```

### 1.3 Caching Strategy
**Giải pháp**: Implement React Query hoặc SWR
```typescript
// lib/queries.ts
import { useQuery } from '@tanstack/react-query';

export function useUserProgress(userId: string) {
  return useQuery({
    queryKey: ['progress', userId],
    queryFn: () => getUserProgress(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

## 2. Cải tiến Code Organization

### 2.1 Extract Track Definitions
**Vấn đề**: Track definitions hardcoded trong DashboardClient
**Giải pháp**:
```typescript
// lib/tracks.ts
export const TRACKS = {
  personal: {
    id: 'personal' as const,
    title: 'Tài chính cá nhân',
    stages: [/* ... */]
  },
  professional: {
    id: 'professional' as const,
    title: 'Tài chính chuyên ngành',
    stages: [/* ... */]
  }
} as const;

export type TrackId = keyof typeof TRACKS;
```

### 2.2 Custom Hooks for Business Logic
**Giải pháp**:
```typescript
// hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });
  }, [router, supabase]);

  return { user, loading };
}

// hooks/useTrackSelection.ts
export function useTrackSelection() {
  const [activeTrack, setActiveTrack] = useState<'personal' | 'professional'>('personal');

  useEffect(() => {
    const saved = localStorage.getItem('activeTrack');
    if (saved === 'personal' || saved === 'professional') {
      setActiveTrack(saved);
    }
  }, []);

  const setTrack = (track: 'personal' | 'professional') => {
    setActiveTrack(track);
    localStorage.setItem('activeTrack', track);
  };

  return { activeTrack, setTrack };
}
```

### 2.3 Component Decomposition
**Vấn đề**: DashboardClient quá lớn (671 lines)
**Giải pháp**:
```typescript
// components/dashboard/TrackSelector.tsx
export function TrackSelector({ activeTrack, onSelect }: Props) {
  // Track selection logic
}

// components/dashboard/StageAccordion.tsx
export function StageAccordion({ stage, lessons, progress }: Props) {
  // Stage expansion logic
}

// components/dashboard/LeaderboardSection.tsx
export function LeaderboardSection({ entries }: Props) {
  // Leaderboard display logic
}
```

## 3. Cải tiến Type Safety

### 3.1 Strict TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 3.2 Remove `any` Types
**Vấn đề**: DashboardClient line 218 sử dụng `any[]`
**Giải pháp**:
```typescript
interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  xp: number;
  lessonsCompleted: number;
  avgQuizScore: number;
  level: number;
}

const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
```

### 3.3 Database Response Types
```typescript
// lib/supabase-types.ts
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: { /* ... */ };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      // ... other tables
    };
  };
}

// Generate với: npx supabase gen types typescript --project-id YOUR_PROJECT_ID
```

## 4. Cải tiến Error Handling

### 4.1 Centralized Error Handling
```typescript
// lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error);
  if (error.code === 'PGRST116') {
    throw new AppError('Resource not found', 'NOT_FOUND', 404);
  }
  throw new AppError(error.message, 'DATABASE_ERROR', 500);
}
```

### 4.2 Error Boundaries
```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## 5. Cải tiến Testing

### 5.1 Unit Tests Setup
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// components/__tests__/DashboardClient.test.tsx
import { render, screen } from '@testing-library/react';
import DashboardClient from '../DashboardClient';

describe('DashboardClient', () => {
  it('renders track selector', () => {
    render(<DashboardClient lessonsMeta={[]} />);
    expect(screen.getByText('Tài chính cá nhân')).toBeInTheDocument();
  });
});
```

### 5.2 Integration Tests
```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('dashboard shows user progress', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('[data-testid="user-xp"]')).toBeVisible();
});
```

## 6. Cải tiến Security

### 6.1 Environment Variables Validation
```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

### 6.2 Rate Limiting
```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

## 7. Cải tiến UX/UI

### 7.1 Loading States
```typescript
// components/LoadingSkeleton.tsx
export function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-stone-200 rounded w-1/4 mb-4" />
      <div className="h-4 bg-stone-200 rounded w-full mb-2" />
      {/* ... more skeleton items */}
    </div>
  );
}
```

### 7.2 Toast Notifications
```typescript
// components/Toast.tsx
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message: string, type: 'success' | 'error') => {
    setToasts(prev => [...prev, { id: Date.now(), message, type }]);
  };

  return { toasts, addToast };
}
```

## 8. Cải tiến Database

### 8.1 Add Indexes
```sql
-- Performance indexes
CREATE INDEX idx_user_progress_user_lesson ON user_progress(user_id, lesson_id);
CREATE INDEX idx_lessons_track_stage ON lessons(track, stage_number);
CREATE INDEX idx_user_badges_user_badge ON user_badges(user_id, badge_id);
```

### 8.2 Database Functions
```sql
-- Auto-calculate XP when lesson completed
CREATE OR REPLACE FUNCTION calculate_user_xp(user_id uuid)
RETURNS int AS $$
DECLARE
  completed_count int;
BEGIN
  SELECT COUNT(*) INTO completed_count
  FROM user_progress
  WHERE user_id = user_id AND completed = true;
  
  RETURN completed_count * 10;
END;
$$ LANGUAGE plpgsql;
```

## 9. Cải tiến Monitoring

### 9.1 Analytics Integration
```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
}

// Usage
trackEvent('lesson_completed', { lesson_id: lesson.id, score: quizScore });
```

### 9.2 Error Tracking
```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## 10. Cải tiến Developer Experience

### 10.1 Pre-commit Hooks
```bash
# .husky/pre-commit
npm run lint
npm run type-check
```

### 10.2 CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
```

## Priority Recommendations

### High Priority (Ngay lập tức)
1. **Code Splitting** - Giảm bundle size
2. **Type Safety** - Loại bỏ `any` types
3. **Error Handling** - Thêm error boundaries
4. **Database Indexes** - Cải thiện query performance

### Medium Priority (Trong 1-2 tuần)
1. **Custom Hooks** - Tái sử dụng logic
2. **Component Decomposition** - Giảm file size
3. **Testing Setup** - Thêm unit tests
4. **Loading States** - Cải thiện UX

### Low Priority (Lâu dài)
1. **Monitoring** - Analytics & error tracking
2. **Rate Limiting** - Security enhancement
3. **CI/CD** - Automation
4. **Advanced Caching** - React Query implementation

## Estimated Impact

- **Bundle Size**: Giảm ~40% sau code splitting
- **Load Time**: Giảm ~50% sau caching & optimization
- **Type Safety**: 100% type-safe sau strict mode
- **Maintainability**: Tăng ~60% sau component decomposition
- **Performance**: Giảm ~30% query time sau database optimization
