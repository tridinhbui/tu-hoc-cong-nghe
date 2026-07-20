import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getUserProfile, updateUserProfile, type UserProfile } from '@thtcdn/api';
import { signOut, getSession, resetPassword } from '@thtcdn/auth';
import { colors, spacing, radius, typography } from '@/constants/design';

const TRACKS: { id: 'personal' | 'professional'; label: string; desc: string }[] = [
  { id: 'personal', label: 'Tài chính cá nhân', desc: 'Lộ trình 108 ngày · dành cho người mới' },
  { id: 'professional', label: 'Tài chính chuyên ngành', desc: 'Lộ trình 180 ngày · chuyên sâu' },
];

type FlashTone = 'success' | 'error';

export default function SettingsScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [preferredTrack, setPreferredTrack] = useState<'personal' | 'professional'>('personal');
  const [darkMode, setDarkMode] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [flash, setFlash] = useState<{ tone: FlashTone; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session) {
        router.replace('/');
        return;
      }
      setEmail(session.user?.email || '');

      const { data } = await getUserProfile();
      if (data) {
        setProfile(data);
        setName(data.full_name || '');
        setBio(data.bio || '');
        setPreferredTrack(data.preferred_track || 'personal');
        setDarkMode(!!data.dark_mode);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!flash) return;
    const timeout = setTimeout(() => setFlash(null), 3000);
    return () => clearTimeout(timeout);
  }, [flash]);

  async function handleSaveProfile() {
    setSavingProfile(true);
    const { error } = await updateUserProfile({ full_name: name.trim(), bio: bio.trim() || null });
    setSavingProfile(false);
    setFlash(error ? { tone: 'error', text: error } : { tone: 'success', text: 'Đã cập nhật hồ sơ cá nhân.' });
  }

  async function handleSavePrefs() {
    setSavingPrefs(true);
    const { error } = await updateUserProfile({ preferred_track: preferredTrack, dark_mode: darkMode });
    setSavingPrefs(false);
    setFlash(error ? { tone: 'error', text: error } : { tone: 'success', text: 'Đã lưu tùy chọn học tập và giao diện.' });
  }

  async function handlePasswordReset() {
    if (!email) return;
    setSendingReset(true);
    const { success, error } = await resetPassword(email);
    setSendingReset(false);
    setFlash(
      success
        ? { tone: 'success', text: `Đã gửi email đổi mật khẩu tới ${email}.` }
        : { tone: 'error', text: error?.message || 'Không gửi được email.' }
    );
  }

  async function handleSignOut() {
    setSigningOut(true);
    const { success } = await signOut();
    if (success) router.replace('/');
    else setSigningOut(false);
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
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Pressable onPress={() => router.back()} style={styles.backLink}>
            <ThemedText style={styles.backLinkText}>← Quay lại</ThemedText>
          </Pressable>
          <ThemedText style={styles.title}>Cài đặt</ThemedText>
          <ThemedText style={styles.subtitle}>Tùy chỉnh hồ sơ, trải nghiệm học và bảo mật tài khoản.</ThemedText>

          {flash && (
            <View style={[styles.flash, flash.tone === 'error' ? styles.flashError : styles.flashSuccess]}>
              <ThemedText style={[styles.flashText, flash.tone === 'error' && styles.flashTextError]}>
                {flash.text}
              </ThemedText>
            </View>
          )}

          {/* Profile */}
          <View style={styles.card}>
            <ThemedText style={styles.cardTitle}>👤 Hồ sơ cá nhân</ThemedText>
            <ThemedText style={styles.cardDesc}>Cập nhật tên hiển thị và phần giới thiệu ngắn.</ThemedText>

            <ThemedText style={styles.fieldLabel}>Tên hiển thị</ThemedText>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Tên bạn muốn mọi người nhìn thấy"
              placeholderTextColor={colors.stone[400]}
            />

            <ThemedText style={styles.fieldLabel}>Giới thiệu ngắn</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={(t) => setBio(t.slice(0, 240))}
              placeholder="Ví dụ: Mình đang học để hiểu tiền của bản thân tốt hơn."
              placeholderTextColor={colors.stone[400]}
              multiline
            />
            <ThemedText style={styles.charCount}>{bio.length}/240 ký tự</ThemedText>

            <Pressable style={[styles.primaryButton, savingProfile && styles.buttonDisabled]} onPress={handleSaveProfile} disabled={savingProfile}>
              <ThemedText style={styles.primaryButtonText}>{savingProfile ? 'Đang lưu...' : 'Lưu hồ sơ'}</ThemedText>
            </Pressable>
          </View>

          {/* Preferences */}
          <View style={styles.card}>
            <ThemedText style={styles.cardTitle}>🌙 Giao diện & lộ trình</ThemedText>
            <ThemedText style={styles.cardDesc}>Chọn hướng học ưu tiên và giao diện sáng/tối.</ThemedText>

            <View style={styles.toggleRow}>
              <View>
                <ThemedText style={styles.toggleLabel}>Chế độ tối</ThemedText>
                <ThemedText style={styles.toggleSub}>Hiện tại: {darkMode ? 'Tối' : 'Sáng'}</ThemedText>
              </View>
              <Pressable
                style={[styles.toggle, darkMode && styles.toggleOn]}
                onPress={() => setDarkMode((d) => !d)}
              >
                <View style={[styles.toggleThumb, darkMode && styles.toggleThumbOn]} />
              </Pressable>
            </View>
            <ThemedText style={styles.toggleNote}>
              Lưu ý: giao diện tối chưa được áp dụng toàn app trên bản mobile này, chỉ lưu tùy chọn.
            </ThemedText>

            <ThemedText style={[styles.fieldLabel, { marginTop: spacing[4] }]}>Lộ trình ưu tiên</ThemedText>
            {TRACKS.map((t) => (
              <Pressable
                key={t.id}
                style={[styles.trackOption, preferredTrack === t.id && styles.trackOptionActive]}
                onPress={() => setPreferredTrack(t.id)}
              >
                <ThemedText style={styles.trackLabel}>{t.label}</ThemedText>
                <ThemedText style={styles.trackDesc}>{t.desc}</ThemedText>
              </Pressable>
            ))}

            <Pressable style={[styles.primaryButton, savingPrefs && styles.buttonDisabled]} onPress={handleSavePrefs} disabled={savingPrefs}>
              <ThemedText style={styles.primaryButtonText}>{savingPrefs ? 'Đang lưu...' : 'Lưu tùy chọn'}</ThemedText>
            </Pressable>
          </View>

          {/* Security */}
          <View style={styles.card}>
            <ThemedText style={styles.cardTitle}>🛡️ Bảo mật tài khoản</ThemedText>
            <ThemedText style={styles.fieldLabel}>Email đăng nhập</ThemedText>
            <ThemedText style={styles.staticValue}>{email}</ThemedText>

            <Pressable
              style={[styles.primaryButton, sendingReset && styles.buttonDisabled, { marginTop: spacing[3] }]}
              onPress={handlePasswordReset}
              disabled={sendingReset}
            >
              <ThemedText style={styles.primaryButtonText}>
                {sendingReset ? 'Đang gửi email...' : 'Gửi email đổi mật khẩu'}
              </ThemedText>
            </Pressable>
          </View>

          {/* Sign out */}
          <Pressable style={[styles.logoutButton, signingOut && styles.buttonDisabled]} onPress={handleSignOut} disabled={signingOut}>
            <ThemedText style={styles.logoutButtonText}>{signingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</ThemedText>
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
  backLink: { marginBottom: spacing[3] },
  backLinkText: { fontSize: typography.xs, fontWeight: typography.weights.bold, color: colors.stone[500] },
  title: { fontSize: typography['2xl'], fontWeight: typography.weights.black, color: colors.stone[950], marginBottom: spacing[1] },
  subtitle: { fontSize: typography.sm, color: colors.stone[600], marginBottom: spacing[5] },
  flash: { borderRadius: radius.lg, padding: spacing[3], marginBottom: spacing[4], borderWidth: 1 },
  flashSuccess: { backgroundColor: colors.emerald[50], borderColor: colors.emerald[200] },
  flashError: { backgroundColor: 'rgba(239,68,68,0.08)', borderColor: colors.red[500] },
  flashText: { fontSize: typography.sm, fontWeight: typography.weights.semibold, color: colors.emerald[700] },
  flashTextError: { color: colors.red[600] },
  card: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: radius['2xl'],
    padding: spacing[4],
    marginBottom: spacing[4],
  },
  cardTitle: { fontSize: typography.lg, fontWeight: typography.weights.bold, color: colors.stone[950], marginBottom: spacing[1] },
  cardDesc: { fontSize: typography.xs, color: colors.stone[500], marginBottom: spacing[3] },
  fieldLabel: { fontSize: typography.xs, fontWeight: typography.weights.bold, color: colors.stone[600], textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing[1] },
  input: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    fontSize: typography.sm,
    color: colors.stone[950],
    backgroundColor: colors.stone[50],
    marginBottom: spacing[3],
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  charCount: { fontSize: typography.xs, color: colors.stone[400], marginTop: -spacing[2], marginBottom: spacing[3] },
  staticValue: { fontSize: typography.sm, fontWeight: typography.weights.semibold, color: colors.stone[900] },
  primaryButton: { backgroundColor: colors.stone[900], paddingVertical: spacing[3], borderRadius: radius.lg, alignItems: 'center' },
  primaryButtonText: { color: 'white', fontSize: typography.sm, fontWeight: typography.weights.bold },
  buttonDisabled: { opacity: 0.6 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[2] },
  toggleLabel: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: colors.stone[950] },
  toggleSub: { fontSize: typography.xs, color: colors.stone[500], marginTop: 2 },
  toggle: { width: 52, height: 28, borderRadius: 14, backgroundColor: colors.stone[200], padding: 2, justifyContent: 'center' },
  toggleOn: { backgroundColor: colors.emerald[500] },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'white' },
  toggleThumbOn: { transform: [{ translateX: 24 }] },
  toggleNote: { fontSize: typography.xs, color: colors.stone[400], lineHeight: 16 },
  trackOption: { borderWidth: 1, borderColor: colors.stone[200], borderRadius: radius.lg, padding: spacing[3], marginBottom: spacing[2] },
  trackOptionActive: { borderColor: colors.stone[900], backgroundColor: colors.stone[50] },
  trackLabel: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: colors.stone[950] },
  trackDesc: { fontSize: typography.xs, color: colors.stone[500], marginTop: 2 },
  logoutButton: { backgroundColor: colors.red[500], borderRadius: radius.lg, paddingVertical: spacing[3], alignItems: 'center', marginBottom: spacing[6] },
  logoutButtonText: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: 'white' },
});
