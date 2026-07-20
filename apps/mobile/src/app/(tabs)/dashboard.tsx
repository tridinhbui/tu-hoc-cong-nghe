import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getSession, signOut } from '@thtcdn/auth';
import { getUserProfile, getLessons, type UserProfile, type Lesson } from '@thtcdn/api';
import { DEMO_LESSON_SLUG } from '@/data/sample-lesson';
import { colors, spacing, radius, typography } from '@/constants/design';

export default function DashboardScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const session = await getSession();
      if (!session) {
        router.replace('/');
        return;
      }

      const { data: profileData, error: profileError } = await getUserProfile();
      if (profileError) {
        setError(profileError);
        setLoading(false);
        return;
      }

      if (profileData) {
        setProfile(profileData);
      }

      const { data: lessonsData, error: lessonsError } = await getLessons();
      if (lessonsError) {
        setError(lessonsError);
      } else {
        setLessons(lessonsData || []);
      }

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }

  async function handleLogout() {
    const { success } = await signOut();
    if (success) {
      router.replace('/');
    }
  }

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
          <ThemedText>Đang tải...</ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.greeting}>
                Xin chào, {profile?.full_name || 'Bạn'}! 👋
              </ThemedText>
              <ThemedText style={styles.email}>{profile?.email}</ThemedText>
            </View>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <ThemedText style={styles.logoutText}>Đăng xuất</ThemedText>
            </Pressable>
          </View>

          {/* Stats Card */}
          {profile && (
            <ThemedView type="backgroundElement" style={styles.statsCard}>
              <View style={styles.statRow}>
                <View style={styles.stat}>
                  <ThemedText style={styles.statValue}>
                    {profile.total_xp}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>XP</ThemedText>
                </View>
                <View style={styles.divider} />
                <View style={styles.stat}>
                  <ThemedText style={styles.statValue}>
                    Cấp {profile.current_level}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>Cấp độ</ThemedText>
                </View>
                <View style={styles.divider} />
                <View style={styles.stat}>
                  <ThemedText style={styles.statValue}>
                    {profile.lessons_completed}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>Hoàn thành</ThemedText>
                </View>
              </View>
            </ThemedView>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <ThemedText style={styles.error}>⚠️ {error}</ThemedText>
            </View>
          )}

          {/* Demo lesson CTA - only lesson with a working mobile viewer so far */}
          <Pressable
            style={styles.demoLessonCard}
            onPress={() => router.push(`/lesson?slug=${DEMO_LESSON_SLUG}`)}
          >
            <ThemedText style={styles.demoLessonBadge}>BÀI HỌC MẪU</ThemedText>
            <ThemedText style={styles.demoLessonTitle}>Tài chính là gì?</ThemedText>
            <ThemedText style={styles.demoLessonSubtitle}>Xem nội dung + làm quiz →</ThemedText>
          </Pressable>

          {/* Lessons Section */}
          <View style={styles.lessonsContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.lessonsTitle}>
                📚 Bài học tiếp theo
              </ThemedText>
              <ThemedText style={styles.lessonCount}>
                {lessons.length} bài
              </ThemedText>
            </View>

            <FlatList
              data={lessons.slice(0, 5)}
              keyExtractor={(item) => String(item.id)}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View style={[styles.lessonCard, index === lessons.length - 1 && styles.lessonCardLast]}>
                  <View style={styles.lessonHeader}>
                    <ThemedText style={styles.lessonNumber}>
                      {item.day_number}
                    </ThemedText>
                    <View style={{ flex: 1 }}>
                      <ThemedText style={styles.lessonTitle}>
                        {item.title}
                      </ThemedText>
                      <ThemedText style={styles.lessonMeta}>
                        {item.duration ? `⏱️ ${item.duration}` : ''}
                        {item.difficulty ? ` • ${item.difficulty}` : ''}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              )}
            />

            {lessons.length === 0 && (
              <ThemedText style={styles.emptyState}>
                Không có bài học nào. Vui lòng làm mới.
              </ThemedText>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.stone[50],
  },
  content: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[5],
    paddingVertical: spacing[2],
  },
  greeting: {
    fontSize: typography['2xl'],
    fontWeight: typography.weights.black,
    color: colors.stone[950],
    marginBottom: spacing[1],
  },
  email: {
    fontSize: typography.sm,
    color: colors.stone[500],
  },
  logoutButton: {
    backgroundColor: colors.red[500],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.md,
  },
  logoutText: {
    color: 'white',
    fontSize: typography.xs,
    fontWeight: typography.weights.bold,
  },
  statsCard: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.stone[200],
    padding: spacing[4],
    marginBottom: spacing[6],
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: typography['2xl'],
    fontWeight: typography.weights.black,
    color: colors.emerald[600],
    marginBottom: spacing[1],
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.stone[500],
    fontWeight: typography.weights.semibold,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.stone[200],
    marginHorizontal: spacing[3],
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: radius.lg,
    padding: spacing[3],
    marginBottom: spacing[4],
    borderWidth: 1,
    borderColor: colors.red[500],
  },
  error: {
    color: colors.red[600],
    fontSize: typography.sm,
    fontWeight: typography.weights.semibold,
  },
  lessonsContainer: {
    marginBottom: spacing[6],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  lessonsTitle: {
    fontSize: typography.lg,
    fontWeight: typography.weights.bold,
    color: colors.stone[950],
  },
  lessonCount: {
    fontSize: typography.xs,
    color: colors.stone[500],
    fontWeight: typography.weights.semibold,
  },
  lessonCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius.lg,
    padding: spacing[3],
    marginBottom: spacing[2],
  },
  lessonCardLast: {
    marginBottom: 0,
  },
  lessonHeader: {
    flexDirection: 'row',
    gap: spacing[3],
    alignItems: 'flex-start',
  },
  lessonNumber: {
    fontSize: typography.lg,
    fontWeight: typography.weights.black,
    color: colors.emerald[500],
    minWidth: 32,
  },
  lessonTitle: {
    fontSize: typography.base,
    fontWeight: typography.weights.semibold,
    color: colors.stone[950],
    marginBottom: spacing[1],
  },
  lessonMeta: {
    fontSize: typography.xs,
    color: colors.stone[500],
  },
  emptyState: {
    textAlign: 'center',
    color: colors.stone[400],
    paddingVertical: spacing[6],
  },
  demoLessonCard: {
    backgroundColor: colors.emerald[500],
    borderRadius: radius['2xl'],
    padding: spacing[4],
    marginBottom: spacing[6],
  },
  demoLessonBadge: {
    fontSize: typography.xs,
    fontWeight: typography.weights.black,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
    marginBottom: spacing[1],
  },
  demoLessonTitle: {
    fontSize: typography.lg,
    fontWeight: typography.weights.black,
    color: 'white',
    marginBottom: spacing[1],
  },
  demoLessonSubtitle: {
    fontSize: typography.sm,
    fontWeight: typography.weights.semibold,
    color: 'rgba(255,255,255,0.9)',
  },
});
