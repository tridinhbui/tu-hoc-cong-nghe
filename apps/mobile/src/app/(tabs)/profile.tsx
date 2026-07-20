import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getUserProfile, getUserStreak, type UserProfile, type UserStreak } from '@thtcdn/api';
import { signOut } from '@thtcdn/auth';
import { colors, spacing, radius, typography } from '@/constants/design';

const TRACK_LABELS: Record<string, string> = {
  personal: 'Tài chính cá nhân',
  professional: 'Tài chính chuyên ngành',
};

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [{ data: profileData }, { data: streakData }] = await Promise.all([getUserProfile(), getUserStreak()]);
        if (cancelled) return;
        setProfile(profileData);
        setStreak(streakData);
        setLoading(false);
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  async function handleSignOut() {
    setSigningOut(true);
    const { success } = await signOut();
    if (success) {
      router.replace('/');
    } else {
      setSigningOut(false);
    }
  }

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
          <ThemedText style={styles.loadingText}>Đang tải...</ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Avatar + name */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarEmoji}>👤</ThemedText>
            </View>
            <ThemedText style={styles.name}>{profile?.full_name || 'Chưa đặt tên'}</ThemedText>
            <ThemedText style={styles.email}>{profile?.email}</ThemedText>
            {profile?.bio ? <ThemedText style={styles.bio}>{profile.bio}</ThemedText> : null}
          </View>

          {/* Stats grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>{profile?.total_xp ?? 0}</ThemedText>
              <ThemedText style={styles.statLabel}>XP</ThemedText>
            </View>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>Cấp {profile?.current_level ?? 1}</ThemedText>
              <ThemedText style={styles.statLabel}>Cấp độ</ThemedText>
            </View>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>🔥 {streak?.current_streak ?? 0}</ThemedText>
              <ThemedText style={styles.statLabel}>Streak</ThemedText>
            </View>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>{profile?.lessons_completed ?? 0}</ThemedText>
              <ThemedText style={styles.statLabel}>Bài hoàn thành</ThemedText>
            </View>
          </View>

          {/* Track */}
          <View style={styles.sectionCard}>
            <ThemedText style={styles.sectionLabel}>Lộ trình ưu tiên</ThemedText>
            <ThemedText style={styles.sectionValue}>
              {TRACK_LABELS[profile?.preferred_track || 'personal']}
            </ThemedText>
          </View>

          {/* Actions */}
          <Pressable style={styles.settingsButton} onPress={() => router.push('/settings')}>
            <ThemedText style={styles.settingsButtonText}>⚙️ Cài đặt tài khoản</ThemedText>
          </Pressable>

          <Pressable
            style={[styles.logoutButton, signingOut && styles.buttonDisabled]}
            onPress={handleSignOut}
            disabled={signingOut}
          >
            <ThemedText style={styles.logoutButtonText}>
              {signingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
            </ThemedText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.stone[50] },
  content: { paddingHorizontal: spacing[4], paddingVertical: spacing[5] },
  loadingText: { textAlign: 'center', marginTop: spacing[8], color: colors.stone[400] },
  header: { alignItems: 'center', marginBottom: spacing[6] },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.stone[100],
    borderWidth: 2,
    borderColor: colors.stone[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  avatarEmoji: { fontSize: 40 },
  name: { fontSize: typography.xl, fontWeight: typography.weights.black, color: colors.stone[950], marginBottom: spacing[1] },
  email: { fontSize: typography.sm, color: colors.stone[500], marginBottom: spacing[2] },
  bio: { fontSize: typography.sm, color: colors.stone[600], textAlign: 'center', paddingHorizontal: spacing[6] },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3], marginBottom: spacing[5] },
  statCard: {
    flexBasis: '47%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: colors.stone[200],
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: radius.lg,
    padding: spacing[3],
    alignItems: 'center',
  },
  statValue: { fontSize: typography.lg, fontWeight: typography.weights.black, color: colors.emerald[600], marginBottom: spacing[1] },
  statLabel: { fontSize: typography.xs, color: colors.stone[500], fontWeight: typography.weights.semibold },
  sectionCard: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: radius.lg,
    padding: spacing[3],
    marginBottom: spacing[5],
  },
  sectionLabel: { fontSize: typography.xs, fontWeight: typography.weights.bold, color: colors.stone[500], textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing[1] },
  sectionValue: { fontSize: typography.sm, fontWeight: typography.weights.semibold, color: colors.stone[900] },
  settingsButton: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  settingsButtonText: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: colors.stone[900] },
  logoutButton: { backgroundColor: colors.red[500], borderRadius: radius.lg, paddingVertical: spacing[3], alignItems: 'center' },
  logoutButtonText: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: 'white' },
  buttonDisabled: { opacity: 0.6 },
});
