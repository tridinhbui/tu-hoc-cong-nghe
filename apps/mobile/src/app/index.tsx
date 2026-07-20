import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  GraduationCap,
  Gauge,
  Sparkles,
  Brain,
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  CheckCircle2,
  Star,
} from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { getSession } from '@thtcdn/auth';
import { getTotalUserCount, getTotalLessonCount } from '@thtcdn/api';
import { colors, spacing, radius, typography } from '@/constants/design';

const PAIN_POINTS = [
  {
    icon: Brain,
    worry: 'Học xong rồi vài tuần sau quên sạch',
    answer:
      'Hệ thống tự chèn câu hỏi ôn lại đúng lúc sắp quên (Spaced Repetition) - không phải đọc một lần rồi thôi.',
  },
  {
    icon: Sparkles,
    worry: 'Sợ đóng tiền một khoá đắt rồi bỏ dở',
    answer: 'Toàn bộ 334+ bài học - 100% miễn phí mãi mãi, không có bài trả phí hay bản nâng cấp ẩn phía sau.',
  },
  {
    icon: GraduationCap,
    worry: 'Không biết nên bắt đầu từ đâu',
    answer: 'Lộ trình chia theo chặng rõ ràng, từ vỡ lòng đến chuyên sâu, theo đúng thứ tự cần học.',
  },
  {
    icon: Gauge,
    worry: 'Tự học một mình, không ai kiểm tra mình có hiểu không',
    answer: 'Quiz sau mỗi bài, điểm XP, bảng xếp hạng thật - biết ngay mình đã hiểu đúng hay chưa.',
  },
] as const;

const METHOD_STEPS = [
  { step: '1', title: 'Học một bài ngắn', text: '5-7 phút mỗi bài, đủ để không quá tải nhưng đủ sâu để hiểu bản chất.' },
  { step: '2', title: 'Làm quiz ngay sau đó', text: 'Active recall - tự nhớ lại thay vì đọc lại, giúp kiến thức bám sâu hơn.' },
  { step: '3', title: 'Hệ thống nhắc ôn đúng lúc', text: 'Trước khi bạn kịp quên (~5 và ~12 bài sau), một câu hỏi ôn lại xuất hiện.' },
  { step: '4', title: 'Nhớ lâu, không học vẹt', text: 'Kiến thức được củng cố nhiều lần theo đúng đường cong quên lãng (forgetting curve).' },
] as const;

const AUDIENCES = [
  { title: 'Tài chính cá nhân', text: 'Người muốn hiểu tiền, tiết kiệm, đầu tư, nợ, ngân sách và cách ra quyết định tài chính hằng ngày.' },
  { title: 'Người học CFA', text: 'Ai cần nền tảng kiến thức chắc hơn để học CFA, luyện tư duy phân tích và tăng độ bền kiến thức.' },
  { title: 'Financial planner', text: 'Người làm tư vấn hoặc lập kế hoạch tài chính cần hệ thống hóa kiến thức để tư vấn tự tin hơn.' },
  { title: 'Investor', text: 'Nhà đầu tư cá nhân muốn hiểu doanh nghiệp, định giá, dòng tiền và chất lượng tài sản sâu hơn.' },
  { title: 'Kế toán mới vào nghề', text: 'Người mới đi làm cần củng cố nền tảng để đọc số liệu, hiểu báo cáo và giao tiếp tài chính tốt hơn.' },
  { title: 'Tài chính chuyên nghiệp mới vào nghề', text: 'Nhân sự finance/FP&A/analysis mới vào nghề cần một hệ thống học nhanh, rõ và bền hơn.' },
] as const;

export default function LandingScreen() {
  const router = useRouter();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [lessonCount, setLessonCount] = useState<number | null>(null);
  const checkedAuthRef = useRef(false);

  useEffect(() => {
    if (checkedAuthRef.current) return;
    checkedAuthRef.current = true;
    getSession().then((session) => {
      if (session) router.replace('/dashboard');
    });
  }, [router]);

  useEffect(() => {
    getTotalUserCount().then(({ data }) => {
      if (data) setUserCount(Math.max(data, 1000));
    });
    getTotalLessonCount().then(({ data }) => {
      if (data) setLessonCount(Math.max(data, 334));
    });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Top VN banner */}
          <View style={styles.banner}>
            <ThemedText style={styles.bannerText}>
              Cam kết toàn bộ bài học tại đây{' '}
              <ThemedText style={styles.bannerHighlight}>miễn phí mãi mãi</ThemedText> vì sự phát triển của
              cộng đồng học tài chính cá nhân, CFA và đầu tư tại Việt Nam.
            </ThemedText>
            <Pressable
              onPress={() => Linking.openURL('https://www.facebook.com/share/g/1C2jTdsgF5/')}
              style={styles.bannerLink}
            >
              <ThemedText style={styles.bannerLinkText}>Tham gia group Facebook</ThemedText>
              <ArrowRight size={14} color={colors.white} />
            </Pressable>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerBrand}>
              <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
              <ThemedText style={styles.headerTitle}>Tự Học Tài Chính</ThemedText>
            </View>
            <Pressable style={styles.headerCta} onPress={() => router.push('/login')}>
              <ThemedText style={styles.headerCtaText}>Vào học</ThemedText>
              <ArrowRight size={14} color={colors.white} />
            </Pressable>
          </View>

          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.heroBadge}>
              <View style={styles.pulseDot} />
              <ThemedText style={styles.heroBadgeText}>Chuẩn quốc tế · Bản sắc Việt Nam 🇻🇳</ThemedText>
            </View>

            <ThemedText style={styles.heroTitle}>
              Hiểu <ThemedText style={styles.heroTitleAccent}>tiền bạc</ThemedText>,{'\n'}quản lý tài sản
            </ThemedText>

            <ThemedText style={styles.heroSubtitle}>
              334+ bài học - 100% miễn phí vĩnh viễn - giáo trình thiết kế riêng cho người Việt học tài chính
              cá nhân, CFA, lập kế hoạch tài chính, đầu tư, kế toán và tài chính chuyên nghiệp.
            </ThemedText>

            <View style={styles.heroCtaRow}>
              <Pressable style={styles.ctaPrimary} onPress={() => router.push('/login?mode=signup')}>
                <ThemedText style={styles.ctaPrimaryText}>Bắt đầu học miễn phí</ThemedText>
                <ArrowRight size={16} color={colors.white} />
              </Pressable>
              <Pressable style={styles.ctaSecondary} onPress={() => router.push('/login')}>
                <PlayCircle size={16} color={colors.stone[900]} />
                <ThemedText style={styles.ctaSecondaryText}>Xem thử bài học</ThemedText>
              </Pressable>
            </View>

            <View style={styles.statsCard}>
              <View style={styles.statsLiveBadge}>
                <View style={styles.pulseDot} />
                <ThemedText style={styles.statsLiveText}>Live cập nhật trực tiếp</ThemedText>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statsItem}>
                  <ThemedText style={styles.statsValue}>
                    {userCount ? `${userCount.toLocaleString('vi-VN')}+` : '1.000+'}
                  </ThemedText>
                  <ThemedText style={styles.statsLabel}>người học</ThemedText>
                </View>
                <View style={styles.statsDivider} />
                <View style={styles.statsItem}>
                  <ThemedText style={styles.statsValue}>{lessonCount ?? 334}+</ThemedText>
                  <ThemedText style={styles.statsLabel}>bài học</ThemedText>
                </View>
              </View>
            </View>
          </View>

          {/* Pain points */}
          <View style={styles.section}>
            <ThemedText style={styles.kicker}>Vì sao học viên chọn ở lại</ThemedText>
            <ThemedText style={styles.sectionTitle}>Những lo lắng thường gặp khi tự học tài chính</ThemedText>

            <View style={styles.grid}>
              {PAIN_POINTS.map(({ icon: Icon, worry, answer }) => (
                <View key={worry} style={styles.card}>
                  <View style={styles.cardIconWrap}>
                    <Icon size={20} color={colors.emerald[600]} />
                  </View>
                  <ThemedText style={styles.cardWorry}>“{worry}”</ThemedText>
                  <ThemedText style={styles.cardAnswer}>{answer}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Method */}
          <View style={[styles.section, styles.sectionMuted]}>
            <ThemedText style={styles.kicker}>Phương pháp học</ThemedText>
            <ThemedText style={styles.sectionTitle}>Spaced Repetition - học ít, nhớ lâu</ThemedText>
            <ThemedText style={styles.sectionBody}>
              Không phải mẹo riêng của chúng tôi - đây là phương pháp ôn tập ngắt quãng được khoa học nhận
              thức nghiên cứu kỹ nhất, dựa trên đường cong quên lãng (Ebbinghaus forgetting curve).
            </ThemedText>

            <View style={styles.grid}>
              {METHOD_STEPS.map(({ step, title, text }) => (
                <View key={step} style={styles.card}>
                  <View style={styles.stepBadge}>
                    <ThemedText style={styles.stepBadgeText}>{step}</ThemedText>
                  </View>
                  <ThemedText style={styles.cardTitle}>{title}</ThemedText>
                  <ThemedText style={styles.cardAnswer}>{text}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Audiences */}
          <View style={styles.section}>
            <ThemedText style={styles.kicker}>Đối tượng phù hợp</ThemedText>
            <ThemedText style={styles.sectionTitle}>Nền tảng này dành cho ai?</ThemedText>
            <ThemedText style={styles.sectionBody}>
              Mục tiêu của chúng tôi là đem kiến thức tài chính đến với nhiều nhóm người học khác nhau, từ tự
              học cá nhân đến lộ trình nghề nghiệp chuyên sâu.
            </ThemedText>

            <View style={styles.grid}>
              {AUDIENCES.map((item) => (
                <View key={item.title} style={styles.card}>
                  <View style={styles.audiencePill}>
                    <ThemedText style={styles.audiencePillText}>Phù hợp</ThemedText>
                  </View>
                  <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.cardAnswer}>{item.text}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Vision & Mission */}
          <View style={styles.section}>
            <View style={styles.visionCard}>
              <View style={styles.visionKickerRow}>
                <ThemedText style={styles.visionFlag}>🇻🇳</ThemedText>
                <ThemedText style={styles.kicker}>Vì sao chúng tôi làm</ThemedText>
              </View>
              <ThemedText style={styles.visionTitle}>
                Hiểu biết tài chính ở Việt Nam đang cải thiện, nhưng khoảng trống nền tảng vẫn còn rất lớn.
              </ThemedText>

              <View style={styles.visionStatsRow}>
                <View style={[styles.visionStat, styles.visionStatAccent]}>
                  <ThemedText style={styles.visionStatLabel}>Hiểu biết cơ bản</ThemedText>
                  <ThemedText style={styles.visionStatValueAccent}>24%</ThemedText>
                  <ThemedText style={styles.visionStatDesc}>đạt ngưỡng hiểu biết tài chính cơ bản.</ThemedText>
                </View>
                <View style={styles.visionStat}>
                  <ThemedText style={styles.visionStatLabelMuted}>Khoảng trống còn lại</ThemedText>
                  <ThemedText style={styles.visionStatValue}>3/4</ThemedText>
                  <ThemedText style={styles.visionStatDesc}>vẫn chưa đạt mức nền tảng.</ThemedText>
                </View>
                <View style={styles.visionStat}>
                  <ThemedText style={styles.visionStatLabelMuted}>Tiếp cận năm 2024</ThemedText>
                  <ThemedText style={styles.visionStatValue}>70,6%</ThemedText>
                  <ThemedText style={styles.visionStatDesc}>đã có tài khoản tài chính hoặc tiền di động.</ThemedText>
                </View>
              </View>

              <View style={styles.visionNote}>
                <ThemedText style={styles.visionNoteText}>
                  Vấn đề không nằm ở việc người học thiếu cố gắng, mà ở chỗ kiến thức tài chính thường còn
                  khó, rời rạc và xa nhu cầu thực tế.
                </ThemedText>
              </View>

              <View style={styles.missionBox}>
                <View style={styles.visionKickerRow}>
                  <ThemedText style={styles.visionFlag}>🇻🇳</ThemedText>
                  <ThemedText style={styles.missionKicker}>Tầm nhìn và sứ mệnh</ThemedText>
                </View>
                <View style={styles.missionItem}>
                  <ThemedText style={styles.visionStatLabelMuted}>Mục tiêu</ThemedText>
                  <ThemedText style={styles.missionText}>
                    Xây giáo trình miễn phí, rõ ràng và đủ sâu cho người học cá nhân lẫn người đi theo nghề.
                  </ThemedText>
                </View>
                <View style={[styles.missionItem, styles.missionItemAccent]}>
                  <ThemedText style={styles.missionAccentLabel}>Tinh thần</ThemedText>
                  <ThemedText style={styles.missionAccentText}>
                    Làm vì cộng đồng, duy trì miễn phí và giúp kiến thức tài chính trở nên gần gũi hơn với mọi
                    người.
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          {/* Final CTA */}
          <View style={styles.finalCta}>
            <ShieldCheck size={36} color={colors.emerald[400]} />
            <ThemedText style={styles.finalCtaTitle}>Sẵn sàng hiểu tiền bạc của chính mình?</ThemedText>
            <ThemedText style={styles.finalCtaBody}>Không mất phí, không cần thẻ, học ngay trong 30 giây.</ThemedText>
            <Pressable style={styles.finalCtaButton} onPress={() => router.push('/login?mode=signup')}>
              <ThemedText style={styles.finalCtaButtonText}>Bắt đầu học miễn phí</ThemedText>
              <ArrowRight size={16} color={colors.stone[900]} />
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerBrand}>
              <Image source={require('../../assets/images/logo.png')} style={styles.footerLogo} />
              <ThemedText style={styles.footerText}>Tự Học Tài Chính</ThemedText>
            </View>
            <ThemedText style={styles.footerText}>Điều khoản · Chính sách bảo mật</ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  banner: { backgroundColor: colors.red.vnRed, paddingHorizontal: spacing[4], paddingVertical: spacing[3], gap: spacing[2] },
  bannerText: { color: 'rgba(255,255,255,0.9)', fontSize: typography.xs, fontWeight: typography.weights.semibold, lineHeight: 18 },
  bannerHighlight: { color: colors.red.vnYellow, fontWeight: typography.weights.black, fontSize: typography.xs },
  bannerLink: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
  bannerLinkText: { color: colors.white, fontSize: typography.xs, fontWeight: typography.weights.black },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.stone[100],
  },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  logo: { width: 26, height: 26, borderRadius: 6 },
  headerTitle: { fontSize: typography.xs, fontWeight: typography.weights.black, color: colors.stone[700], textTransform: 'uppercase', letterSpacing: 1 },
  headerCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    backgroundColor: colors.emerald[500],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.lg,
  },
  headerCtaText: { color: colors.white, fontSize: typography.sm, fontWeight: typography.weights.bold },

  hero: { paddingHorizontal: spacing[4], paddingTop: spacing[6], paddingBottom: spacing[4] },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.emerald[200],
    backgroundColor: colors.emerald[50],
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    marginBottom: spacing[4],
  },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.emerald[500] },
  heroBadgeText: { fontSize: typography.xs, fontWeight: typography.weights.bold, color: colors.emerald[700] },
  heroTitle: {
    fontSize: typography['4xl'],
    fontWeight: typography.weights.black,
    color: colors.stone[900],
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: spacing[4],
  },
  heroTitleAccent: {
    color: colors.emerald[600],
    fontSize: typography['4xl'],
    fontWeight: typography.weights.black,
    lineHeight: 40,
  },
  heroSubtitle: { fontSize: typography.base, color: colors.stone[600], lineHeight: 24, marginBottom: spacing[5] },
  heroCtaRow: { gap: spacing[3], marginBottom: spacing[5] },
  ctaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    backgroundColor: colors.stone[900],
    paddingVertical: spacing[3] + 2,
    borderRadius: radius.lg,
  },
  ctaPrimaryText: { color: colors.white, fontSize: typography.base, fontWeight: typography.weights.bold },
  ctaSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    borderWidth: 1,
    borderColor: colors.stone[200],
    paddingVertical: spacing[3] + 2,
    borderRadius: radius.lg,
  },
  ctaSecondaryText: { color: colors.stone[900], fontSize: typography.base, fontWeight: typography.weights.bold },

  statsCard: { borderWidth: 1, borderColor: colors.stone[200], backgroundColor: 'rgba(250,250,249,0.7)', borderRadius: radius.xl, padding: spacing[4] },
  statsLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.3)',
    backgroundColor: colors.white,
    borderRadius: radius.full,
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    marginBottom: spacing[3],
  },
  statsLiveText: { fontSize: 10, fontWeight: typography.weights.black, color: colors.emerald[700], textTransform: 'uppercase', letterSpacing: 1 },
  statsRow: { flexDirection: 'row' },
  statsItem: { paddingRight: spacing[5] },
  statsDivider: { width: 1, backgroundColor: colors.stone[200], marginHorizontal: spacing[3] },
  statsValue: { fontSize: typography['2xl'], fontWeight: typography.weights.black, color: colors.stone[900] },
  statsLabel: { fontSize: typography.xs, fontWeight: typography.weights.semibold, color: colors.stone[500], marginTop: 2 },

  section: { paddingHorizontal: spacing[4], paddingVertical: spacing[8] },
  sectionMuted: { backgroundColor: colors.stone[50] },
  kicker: { fontSize: typography.xs, fontWeight: typography.weights.black, color: colors.emerald[600], textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: spacing[2] },
  sectionTitle: { fontSize: typography['2xl'], fontWeight: typography.weights.black, color: colors.stone[900], marginBottom: spacing[3], lineHeight: 30 },
  sectionBody: { fontSize: typography.sm, color: colors.stone[600], lineHeight: 22, marginBottom: spacing[5] },

  grid: { gap: spacing[3], marginTop: spacing[3] },
  card: { borderWidth: 1, borderColor: colors.stone[200], backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: radius['2xl'], padding: spacing[4] },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: colors.emerald[50],
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  cardWorry: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: colors.stone[500], fontStyle: 'italic', marginBottom: spacing[2] },
  cardAnswer: { fontSize: typography.sm, color: colors.stone[700], lineHeight: 20, fontWeight: typography.weights.medium },
  cardTitle: { fontSize: typography.base, fontWeight: typography.weights.extrabold, color: colors.stone[900], marginBottom: spacing[2] },

  stepBadge: { width: 32, height: 32, borderRadius: radius.md, backgroundColor: colors.emerald[500], alignItems: 'center', justifyContent: 'center', marginBottom: spacing[3] },
  stepBadgeText: { color: colors.white, fontWeight: typography.weights.black, fontSize: typography.sm },

  audiencePill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.25)',
    backgroundColor: colors.emerald[50],
    borderRadius: radius.full,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    marginBottom: spacing[3],
  },
  audiencePillText: { fontSize: 10, fontWeight: typography.weights.black, color: colors.emerald[700], textTransform: 'uppercase', letterSpacing: 1 },

  visionCard: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: radius['2xl'],
    padding: spacing[5],
  },
  visionKickerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  visionFlag: { fontSize: typography.base },
  visionTitle: { fontSize: typography.xl, fontWeight: typography.weights.black, color: colors.stone[900], lineHeight: 28, marginTop: spacing[2], marginBottom: spacing[5] },
  visionStatsRow: { gap: spacing[3] },
  visionStat: { borderWidth: 1, borderColor: colors.stone[200], backgroundColor: colors.stone[50], borderRadius: radius.lg, padding: spacing[4] },
  visionStatAccent: { borderColor: 'rgba(16,185,129,0.25)', backgroundColor: colors.emerald[50] },
  visionStatLabel: { fontSize: 10, fontWeight: typography.weights.black, color: colors.emerald[700], textTransform: 'uppercase', letterSpacing: 1 },
  visionStatLabelMuted: { fontSize: 10, fontWeight: typography.weights.black, color: colors.stone[500], textTransform: 'uppercase', letterSpacing: 1 },
  visionStatValueAccent: { fontSize: typography['3xl'], fontWeight: typography.weights.black, color: colors.emerald[600], marginTop: spacing[2] },
  visionStatValue: { fontSize: typography['3xl'], fontWeight: typography.weights.black, color: colors.stone[800], marginTop: spacing[2] },
  visionStatDesc: { fontSize: typography.xs, color: colors.stone[600], marginTop: spacing[2], lineHeight: 18 },
  visionNote: { marginTop: spacing[4], backgroundColor: colors.stone[50], borderRadius: radius.lg, padding: spacing[4], borderWidth: 1, borderColor: colors.stone[100] },
  visionNoteText: { fontSize: typography.sm, color: colors.stone[600], lineHeight: 20 },

  missionBox: { marginTop: spacing[5], borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)', backgroundColor: colors.emerald[50], borderRadius: radius.xl, padding: spacing[4], gap: spacing[3] },
  missionKicker: { fontSize: typography.xs, fontWeight: typography.weights.black, color: colors.emerald[700], textTransform: 'uppercase', letterSpacing: 1.5 },
  missionItem: { backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: radius.md, padding: spacing[3] },
  missionText: { fontSize: typography.sm, color: colors.stone[700], lineHeight: 20, marginTop: spacing[1] },
  missionItemAccent: { backgroundColor: 'rgba(16,185,129,0.12)' },
  missionAccentLabel: { fontSize: 10, fontWeight: typography.weights.black, color: colors.emerald[700], textTransform: 'uppercase', letterSpacing: 1 },
  missionAccentText: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: colors.emerald[700], lineHeight: 20, marginTop: spacing[1] },

  finalCta: { backgroundColor: colors.stone[900], paddingHorizontal: spacing[5], paddingVertical: spacing[10], alignItems: 'center' },
  finalCtaTitle: { fontSize: typography['2xl'], fontWeight: typography.weights.bold, color: colors.white, textAlign: 'center', marginTop: spacing[3], marginBottom: spacing[2] },
  finalCtaBody: { fontSize: typography.sm, color: colors.stone[300], textAlign: 'center', lineHeight: 20, marginBottom: spacing[5] },
  finalCtaButton: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], backgroundColor: colors.white, paddingHorizontal: spacing[5], paddingVertical: spacing[3] + 2, borderRadius: radius.lg },
  finalCtaButtonText: { color: colors.stone[900], fontSize: typography.base, fontWeight: typography.weights.bold },

  footer: { paddingHorizontal: spacing[4], paddingVertical: spacing[5], alignItems: 'center', gap: spacing[2] },
  footerBrand: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  footerLogo: { width: 16, height: 16, borderRadius: 4 },
  footerText: { fontSize: typography.xs, color: colors.stone[400] },
});
