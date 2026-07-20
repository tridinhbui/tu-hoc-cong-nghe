import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getSession, signIn, signUp, resetPassword } from '@thtcdn/auth';
import { signInWithGoogle } from '@/lib/google-auth';
import { colors, spacing, radius, typography } from '@/constants/design';

function GoogleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string }>();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(params.mode === 'signup' ? 'signup' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const session = await getSession();
    if (session) {
      router.replace('/dashboard');
    }
  }

  async function handleGooglePress() {
    setError('');
    setGoogleLoading(true);
    const result = await signInWithGoogle();
    if (!result.success) {
      if (result.error) setError(result.error);
      setGoogleLoading(false);
      return;
    }
    router.replace('/dashboard');
  }

  async function handleForgotPassword() {
    setError('');
    if (!email.trim()) {
      setError('Vui lòng nhập email của bạn.');
      return;
    }
    setLoading(true);
    const result = await resetPassword(email);
    if (!result.success) {
      setError(result.error?.message || 'Có lỗi xảy ra.');
      setLoading(false);
      return;
    }
    setResetSent(true);
    setLoading(false);
  }

  async function handleSubmit() {
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim() || !email.trim() || !password.trim()) {
          setError('Vui lòng điền đầy đủ thông tin.');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Mật khẩu phải ít nhất 6 ký tự.');
          setLoading(false);
          return;
        }

        const result = await signUp(email, password, name);
        if (!result.success) {
          setError(result.error?.message || 'Đăng ký thất bại');
          setLoading(false);
          return;
        }

        const loginResult = await signIn(email, password);
        if (!loginResult.success) {
          setError('Đăng ký thành công nhưng không thể tự động đăng nhập.');
          setLoading(false);
          return;
        }

        router.replace('/dashboard');
      } else {
        if (!email.trim() || !password.trim()) {
          setError('Vui lòng điền email và mật khẩu.');
          setLoading(false);
          return;
        }

        const result = await signIn(email, password);
        if (!result.success) {
          setError(result.error?.message || 'Đăng nhập thất bại');
          setLoading(false);
          return;
        }

        router.replace('/dashboard');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
      setLoading(false);
    }
  }

  const busy = loading || googleLoading;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable onPress={() => router.back()} style={styles.backLink}>
            <ThemedText style={styles.backLinkText}>← Về trang chủ</ThemedText>
          </Pressable>

          {/* Hero */}
          <View style={styles.hero}>
            <ThemedText style={styles.badge}>🎓 Miễn phí mãi mãi</ThemedText>
            <ThemedText type="title" style={styles.heroTitle}>
              Học Tài Chính Thực Dụng
            </ThemedText>
            <ThemedText style={styles.heroSubtitle}>
              {mode === 'login' ? 'Đăng nhập vào tài khoản' : mode === 'signup' ? 'Tạo tài khoản mới' : 'Quên mật khẩu'}
            </ThemedText>
          </View>

          {/* Form Card */}
          <ThemedView type="backgroundElement" style={styles.formCard}>
            {mode !== 'forgot' && (
              <>
                <Pressable
                  style={[styles.googleButton, busy && styles.buttonDisabled]}
                  onPress={handleGooglePress}
                  disabled={busy}
                >
                  <GoogleIcon />
                  <ThemedText style={styles.googleButtonText}>
                    {googleLoading ? 'Đang mở Google...' : 'Đăng nhập với Google'}
                  </ThemedText>
                </Pressable>

                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <ThemedText style={styles.dividerText}>Hoặc email</ThemedText>
                  <View style={styles.dividerLine} />
                </View>
              </>
            )}

            {mode === 'forgot' ? (
              resetSent ? (
                <View style={styles.resetSentBox}>
                  <ThemedText style={styles.resetSentText}>
                    Đã gửi email tới <ThemedText style={styles.resetSentEmail}>{email}</ThemedText>. Mở email và bấm vào
                    link để đặt lại mật khẩu.
                  </ThemedText>
                </View>
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.stone[400]}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!busy}
                  />
                  {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
                  <Pressable
                    style={[styles.primaryButton, busy && styles.buttonDisabled]}
                    onPress={handleForgotPassword}
                    disabled={busy}
                  >
                    <ThemedText style={styles.primaryButtonText}>
                      {loading ? 'Đang gửi...' : 'Gửi email đặt lại mật khẩu'}
                    </ThemedText>
                  </Pressable>
                </>
              )
            ) : (
              <>
                {mode === 'signup' && (
                  <TextInput
                    style={styles.input}
                    placeholder="Tên của bạn"
                    placeholderTextColor={colors.stone[400]}
                    value={name}
                    onChangeText={setName}
                    editable={!busy}
                  />
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={colors.stone[400]}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!busy}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu"
                  placeholderTextColor={colors.stone[400]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!busy}
                />

                {mode === 'login' && (
                  <Pressable
                    onPress={() => {
                      setMode('forgot');
                      setError('');
                      setResetSent(false);
                    }}
                    disabled={busy}
                  >
                    <ThemedText style={styles.forgotLink}>Quên mật khẩu?</ThemedText>
                  </Pressable>
                )}

                {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

                <Pressable
                  style={[styles.primaryButton, busy && styles.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={busy}
                >
                  <ThemedText style={styles.primaryButtonText}>
                    {loading ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                  </ThemedText>
                </Pressable>
              </>
            )}

            <Pressable
              style={styles.secondaryButton}
              onPress={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
                setResetSent(false);
              }}
              disabled={busy}
            >
              <ThemedText style={styles.secondaryButtonText}>
                {mode === 'signup' ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
              </ThemedText>
            </Pressable>
          </ThemedView>

          {/* Trust highlights (mirrors web login page's 3-card row) */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureEmoji}>🛡️</ThemedText>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.featureTitle}>Không cần trả phí</ThemedText>
                <ThemedText style={styles.featureDesc}>Học toàn bộ nội dung mà không cần thẻ.</ThemedText>
              </View>
            </View>

            <View style={styles.featureItem}>
              <ThemedText style={styles.featureEmoji}>📊</ThemedText>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.featureTitle}>Tiến độ thật</ThemedText>
                <ThemedText style={styles.featureDesc}>Lưu bài học, XP, streak và thống kê học tập.</ThemedText>
              </View>
            </View>

            <View style={styles.featureItem}>
              <ThemedText style={styles.featureEmoji}>✅</ThemedText>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.featureTitle}>Đi từng chặng</ThemedText>
                <ThemedText style={styles.featureDesc}>Không bị ngợp vì đã có lộ trình rõ ràng.</ThemedText>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.stone[50] },
  content: { paddingHorizontal: spacing[4], paddingVertical: spacing[6] },
  backLink: { marginBottom: spacing[4] },
  backLinkText: { fontSize: typography.xs, fontWeight: typography.weights.bold, color: colors.stone[500] },
  hero: { alignItems: 'center', marginBottom: spacing[6] },
  badge: {
    fontSize: typography.xs,
    fontWeight: typography.weights.bold,
    color: colors.emerald[600],
    marginBottom: spacing[2],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: typography['3xl'],
    fontWeight: typography.weights.black,
    textAlign: 'center',
    marginBottom: spacing[2],
    color: colors.stone[950],
    letterSpacing: -0.5,
  },
  heroSubtitle: { fontSize: typography.base, color: colors.stone[600], textAlign: 'center', lineHeight: 24 },
  formCard: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.stone[200],
    padding: spacing[4],
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing[6],
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    borderWidth: 1,
    borderColor: colors.stone[200],
    paddingVertical: spacing[3],
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },
  googleButtonText: { fontSize: typography.base, fontWeight: typography.weights.bold, color: colors.stone[900] },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], marginVertical: spacing[4] },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.stone[200] },
  dividerText: { fontSize: typography.xs, fontWeight: typography.weights.bold, color: colors.stone[500], textTransform: 'uppercase', letterSpacing: 1 },
  input: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    fontSize: typography.base,
    color: colors.stone[950],
    marginBottom: spacing[3],
    backgroundColor: colors.stone[50],
  },
  forgotLink: { fontSize: typography.xs, fontWeight: typography.weights.semibold, color: colors.stone[500], marginBottom: spacing[3], textAlign: 'right' },
  error: { color: colors.red[600], fontSize: typography.sm, marginTop: spacing[1], marginBottom: spacing[2] },
  resetSentBox: { backgroundColor: colors.emerald[50], borderWidth: 1, borderColor: colors.emerald[200], borderRadius: radius.lg, padding: spacing[4] },
  resetSentText: { fontSize: typography.sm, color: colors.emerald[700], lineHeight: 20 },
  resetSentEmail: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: colors.emerald[700] },
  primaryButton: {
    backgroundColor: colors.emerald[500],
    paddingVertical: spacing[3],
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: spacing[2],
  },
  primaryButtonText: { color: 'white', fontSize: typography.base, fontWeight: typography.weights.bold },
  buttonDisabled: { opacity: 0.6 },
  secondaryButton: { paddingVertical: spacing[3], alignItems: 'center', marginTop: spacing[2] },
  secondaryButtonText: { color: colors.emerald[600], fontSize: typography.sm, fontWeight: typography.weights.semibold },
  featuresContainer: { gap: spacing[3] },
  featureItem: {
    flexDirection: 'row',
    gap: spacing[3],
    padding: spacing[3],
    backgroundColor: colors.stone[50],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.stone[200],
    alignItems: 'flex-start',
  },
  featureEmoji: { fontSize: typography['2xl'] },
  featureTitle: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: colors.stone[950], marginBottom: spacing[1] },
  featureDesc: { fontSize: typography.xs, color: colors.stone[500] },
});
