import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getFlashcards, saveFlashcard, calculateSM2, type Flashcard } from '@thtcdn/api';
import { colors, spacing, radius, typography } from '@/constants/design';

// Ported from lib/supabase-flashcards.ts DEFAULT_FINANCIAL_GLOSSARY (subset).
const SEED_GLOSSARY = [
  { term: 'Thanh khoản (Liquidity)', definition: 'Khả năng chuyển đổi một tài sản thành tiền mặt nhanh chóng mà không làm suy giảm giá trị của nó.' },
  { term: 'Lãi kép (Compound Interest)', definition: 'Phần lãi tính trên số tiền gốc ban đầu cộng với số tiền lãi tích lũy qua các kỳ trước đó.' },
  { term: 'Đòn bẩy tài chính (Leverage)', definition: 'Việc sử dụng vốn đi vay (nợ) để gia tăng khả năng sinh lời của một khoản đầu tư.' },
  { term: 'NPV (Net Present Value)', definition: 'Giá trị hiện tại ròng, là tổng dòng tiền thu hồi trong tương lai chiết khấu về hiện tại trừ đi chi phí đầu tư ban đầu.' },
  { term: 'Cổ tức (Dividend)', definition: 'Một phần lợi nhuận sau thuế được doanh nghiệp chia cho các cổ đông bằng tiền mặt hoặc cổ phiếu.' },
];

const RATINGS: { label: string; quality: number }[] = [
  { label: 'Quên', quality: 0 },
  { label: 'Khó', quality: 3 },
  { label: 'Tốt', quality: 4 },
  { label: 'Dễ', quality: 5 },
];

export default function FlashcardsScreen() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [rating, setRating] = useState(false);

  const loadCards = useCallback(async () => {
    const { data } = await getFlashcards();
    setCards(data || []);
    setActiveIndex(0);
    setFlipped(false);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCards();
    }, [loadCards])
  );

  const dueCards = cards.filter((c) => new Date(c.next_review_at) <= new Date());
  const activeCard = dueCards[activeIndex];

  async function handleSeed() {
    setSeeding(true);
    const now = new Date().toISOString();
    for (const item of SEED_GLOSSARY) {
      await saveFlashcard({
        term: item.term,
        definition: item.definition,
        interval: 0,
        ease_factor: 2.5,
        repetitions: 0,
        next_review_at: now,
      });
    }
    setSeeding(false);
    await loadCards();
  }

  async function handleRate(quality: number) {
    if (!activeCard || rating) return;
    setRating(true);
    const result = calculateSM2(quality, activeCard.repetitions, activeCard.ease_factor, activeCard.interval);
    await saveFlashcard({
      ...activeCard,
      repetitions: result.repetitions,
      ease_factor: result.easeFactor,
      interval: result.interval,
      next_review_at: result.nextReviewAt,
    });
    setRating(false);
    setFlipped(false);
    if (activeIndex < dueCards.length - 1) {
      setActiveIndex((i) => i + 1);
    } else {
      await loadCards();
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadCards(); }} />}
        >
          <ThemedText style={styles.title}>🗂️ Flashcard</ThemedText>
          <ThemedText style={styles.subtitle}>Ôn từ vựng tài chính theo Spaced Repetition (SM2).</ThemedText>

          {loading ? (
            <ThemedText style={styles.emptyState}>Đang tải...</ThemedText>
          ) : cards.length === 0 ? (
            <View style={styles.emptyBox}>
              <ThemedText style={styles.emptyText}>Bạn chưa có bộ flashcard nào.</ThemedText>
              <Pressable style={[styles.seedButton, seeding && styles.buttonDisabled]} onPress={handleSeed} disabled={seeding}>
                <ThemedText style={styles.seedButtonText}>
                  {seeding ? 'Đang thêm...' : 'Thêm bộ từ vựng mẫu (5 thẻ)'}
                </ThemedText>
              </Pressable>
            </View>
          ) : dueCards.length === 0 ? (
            <View style={styles.emptyBox}>
              <ThemedText style={styles.emptyText}>🎉 Không có thẻ nào cần ôn hôm nay. Quay lại sau nhé!</ThemedText>
            </View>
          ) : (
            <>
              <ThemedText style={styles.progressText}>
                Thẻ {activeIndex + 1}/{dueCards.length} cần ôn
              </ThemedText>

              <Pressable style={styles.flashcard} onPress={() => setFlipped((f) => !f)}>
                <ThemedText style={styles.flashcardLabel}>{flipped ? 'ĐỊNH NGHĨA' : 'THUẬT NGỮ'}</ThemedText>
                <ThemedText style={styles.flashcardText}>
                  {flipped ? activeCard.definition : activeCard.term}
                </ThemedText>
                <ThemedText style={styles.flipHint}>Chạm để {flipped ? 'xem thuật ngữ' : 'lật thẻ'}</ThemedText>
              </Pressable>

              {flipped && (
                <View style={styles.ratingRow}>
                  {RATINGS.map((r) => (
                    <Pressable
                      key={r.label}
                      style={[styles.ratingButton, rating && styles.buttonDisabled]}
                      onPress={() => handleRate(r.quality)}
                      disabled={rating}
                    >
                      <ThemedText style={styles.ratingButtonText}>{r.label}</ThemedText>
                    </Pressable>
                  ))}
                </View>
              )}
            </>
          )}

          {cards.length > 0 && (
            <View style={styles.allCardsSection}>
              <ThemedText style={styles.allCardsHeading}>Tất cả thẻ ({cards.length})</ThemedText>
              {cards.map((c) => (
                <View key={c.term} style={styles.cardListItem}>
                  <ThemedText style={styles.cardListTerm}>{c.term}</ThemedText>
                  <ThemedText style={styles.cardListMeta}>
                    Ôn lại: {new Date(c.next_review_at).toLocaleDateString('vi-VN')}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.stone[50] },
  content: { paddingHorizontal: spacing[4], paddingVertical: spacing[5] },
  title: { fontSize: typography['2xl'], fontWeight: typography.weights.black, color: colors.stone[950], marginBottom: spacing[1] },
  subtitle: { fontSize: typography.sm, color: colors.stone[600], marginBottom: spacing[5] },
  emptyState: { textAlign: 'center', color: colors.stone[400], paddingVertical: spacing[8] },
  emptyBox: { alignItems: 'center', paddingVertical: spacing[6], gap: spacing[4] },
  emptyText: { fontSize: typography.sm, color: colors.stone[500], textAlign: 'center' },
  seedButton: { backgroundColor: colors.emerald[500], paddingHorizontal: spacing[4], paddingVertical: spacing[3], borderRadius: radius.lg },
  seedButtonText: { color: 'white', fontSize: typography.sm, fontWeight: typography.weights.bold },
  buttonDisabled: { opacity: 0.5 },
  progressText: { fontSize: typography.xs, fontWeight: typography.weights.semibold, color: colors.stone[500], marginBottom: spacing[3], textAlign: 'center' },
  flashcard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius['2xl'],
    padding: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
    marginBottom: spacing[4],
  },
  flashcardLabel: { fontSize: typography.xs, fontWeight: typography.weights.black, color: colors.emerald[600], letterSpacing: 1, marginBottom: spacing[3] },
  flashcardText: { fontSize: typography.lg, fontWeight: typography.weights.bold, color: colors.stone[950], textAlign: 'center', lineHeight: 26 },
  flipHint: { fontSize: typography.xs, color: colors.stone[400], marginTop: spacing[4] },
  ratingRow: { flexDirection: 'row', gap: spacing[2], marginBottom: spacing[6] },
  ratingButton: { flex: 1, backgroundColor: colors.stone[900], paddingVertical: spacing[3], borderRadius: radius.lg, alignItems: 'center' },
  ratingButtonText: { color: 'white', fontSize: typography.xs, fontWeight: typography.weights.bold },
  allCardsSection: { marginTop: spacing[4] },
  allCardsHeading: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: colors.stone[700], marginBottom: spacing[2] },
  cardListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.stone[100],
    paddingVertical: spacing[2],
  },
  cardListTerm: { fontSize: typography.xs, color: colors.stone[800], flex: 1, marginRight: spacing[2] },
  cardListMeta: { fontSize: typography.xs, color: colors.stone[400] },
});
