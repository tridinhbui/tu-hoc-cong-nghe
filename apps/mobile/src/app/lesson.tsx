import { useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { markLessonComplete, createNote } from '@thtcdn/api';
import { SAMPLE_LESSON, SAMPLE_CONCEPTS, SAMPLE_TAKEAWAYS, SAMPLE_QUIZ } from '@/data/sample-lesson';
import { colors, spacing, radius, typography } from '@/constants/design';

export default function LessonScreen() {
  const router = useRouter();
  const [activeQ, setActiveQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean[]>(new Array(SAMPLE_QUIZ.length).fill(false));
  const [correctFlags, setCorrectFlags] = useState<boolean[]>(new Array(SAMPLE_QUIZ.length).fill(false));
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const q = SAMPLE_QUIZ[activeQ];
  const allAnswered = answered.every(Boolean);
  const score = correctFlags.filter(Boolean).length;

  function selectOption(index: number) {
    if (answered[activeQ]) return;
    setSelected(index);
  }

  function submitAnswer() {
    if (selected === null) return;
    const isCorrect = selected === q.correct;
    setAnswered((prev) => prev.map((v, i) => (i === activeQ ? true : v)));
    setCorrectFlags((prev) => prev.map((v, i) => (i === activeQ ? isCorrect : v)));
  }

  function nextQuestion() {
    if (activeQ < SAMPLE_QUIZ.length - 1) {
      setActiveQ((i) => i + 1);
      setSelected(null);
    }
  }

  async function finishLesson() {
    setCompleting(true);
    const quizScore = Math.round((score / SAMPLE_QUIZ.length) * 100);
    await markLessonComplete(SAMPLE_LESSON.id, quizScore);
    setCompleting(false);
    setCompleted(true);
  }

  async function saveNote() {
    if (!noteText.trim()) return;
    await createNote(SAMPLE_LESSON.id, SAMPLE_LESSON.slug, noteText.trim());
    setNoteSaved(true);
    setNoteText('');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={styles.backLink}>
            <ThemedText style={styles.backLinkText}>← Quay lại</ThemedText>
          </Pressable>

          <ThemedText style={styles.dayBadge}>Day {SAMPLE_LESSON.day} · {SAMPLE_LESSON.duration} · {SAMPLE_LESSON.difficulty}</ThemedText>
          <ThemedText style={styles.title}>{SAMPLE_LESSON.title}</ThemedText>
          <ThemedText style={styles.subtitle}>{SAMPLE_LESSON.subtitle}</ThemedText>

          {/* Key concepts */}
          <View style={styles.sectionBlock}>
            <ThemedText style={styles.sectionHeading}>Khái niệm cốt lõi</ThemedText>
            {SAMPLE_CONCEPTS.map((c) => (
              <View key={c.vi} style={styles.conceptCard}>
                <ThemedText style={styles.conceptTerm}>
                  {c.vi} <ThemedText style={styles.conceptEn}>({c.en})</ThemedText>
                </ThemedText>
                <ThemedText style={styles.conceptDef}>{c.def}</ThemedText>
              </View>
            ))}
          </View>

          {/* Takeaways */}
          <View style={styles.sectionBlock}>
            <ThemedText style={styles.sectionHeading}>Điểm chính cần nhớ</ThemedText>
            {SAMPLE_TAKEAWAYS.map((t, i) => (
              <View key={i} style={styles.takeawayRow}>
                <ThemedText style={styles.takeawayBullet}>✓</ThemedText>
                <ThemedText style={styles.takeawayText}>{t}</ThemedText>
              </View>
            ))}
          </View>

          {/* Personal note */}
          <View style={styles.sectionBlock}>
            <ThemedText style={styles.sectionHeading}>Ghi chú của bạn</ThemedText>
            <View style={styles.noteBox}>
              <TextInput
                style={styles.noteInput}
                placeholder="Ghi lại một ý bạn muốn nhớ từ bài này..."
                placeholderTextColor={colors.stone[400]}
                value={noteText}
                onChangeText={(text) => {
                  setNoteText(text);
                  setNoteSaved(false);
                }}
                multiline
                numberOfLines={3}
              />
              <Pressable
                style={[styles.noteSaveButton, !noteText.trim() && styles.buttonDisabled]}
                onPress={saveNote}
                disabled={!noteText.trim()}
              >
                <ThemedText style={styles.noteSaveButtonText}>
                  {noteSaved ? '✓ Đã lưu' : 'Lưu ghi chú'}
                </ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Quiz */}
          <View style={styles.sectionBlock}>
            <ThemedText style={styles.sectionHeading}>
              Quiz ({activeQ + 1}/{SAMPLE_QUIZ.length})
            </ThemedText>

            <View style={styles.quizCard}>
              <ThemedText style={styles.quizQuestion}>{q.question}</ThemedText>

              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrectOpt = i === q.correct;
                const showResult = answered[activeQ];
                return (
                  <Pressable
                    key={i}
                    style={[
                      styles.quizOption,
                      isSelected && !showResult && styles.quizOptionSelected,
                      showResult && isCorrectOpt && styles.quizOptionCorrect,
                      showResult && isSelected && !isCorrectOpt && styles.quizOptionWrong,
                    ]}
                    onPress={() => selectOption(i)}
                    disabled={showResult}
                  >
                    <ThemedText style={styles.quizOptionText}>{opt}</ThemedText>
                  </Pressable>
                );
              })}

              {answered[activeQ] && (
                <View style={styles.explanationBox}>
                  <ThemedText style={styles.explanationText}>{q.explanation}</ThemedText>
                </View>
              )}

              {!answered[activeQ] ? (
                <Pressable
                  style={[styles.quizSubmit, selected === null && styles.buttonDisabled]}
                  onPress={submitAnswer}
                  disabled={selected === null}
                >
                  <ThemedText style={styles.quizSubmitText}>Trả lời</ThemedText>
                </Pressable>
              ) : activeQ < SAMPLE_QUIZ.length - 1 ? (
                <Pressable style={styles.quizSubmit} onPress={nextQuestion}>
                  <ThemedText style={styles.quizSubmitText}>Câu tiếp theo →</ThemedText>
                </Pressable>
              ) : null}
            </View>

            {allAnswered && (
              <View style={styles.resultBox}>
                <ThemedText style={styles.resultText}>
                  Kết quả: {score}/{SAMPLE_QUIZ.length} câu đúng
                </ThemedText>
                {!completed ? (
                  <Pressable
                    style={[styles.completeButton, completing && styles.buttonDisabled]}
                    onPress={finishLesson}
                    disabled={completing}
                  >
                    <ThemedText style={styles.completeButtonText}>
                      {completing ? 'Đang lưu...' : 'Hoàn thành bài học'}
                    </ThemedText>
                  </Pressable>
                ) : (
                  <ThemedText style={styles.completedText}>✓ Đã lưu tiến độ bài học</ThemedText>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.stone[50] },
  content: { paddingHorizontal: spacing[4], paddingVertical: spacing[5] },
  backLink: { marginBottom: spacing[3] },
  backLinkText: { fontSize: typography.xs, fontWeight: typography.weights.bold, color: colors.stone[500] },
  dayBadge: {
    fontSize: typography.xs,
    fontWeight: typography.weights.bold,
    color: colors.emerald[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing[2],
  },
  title: { fontSize: typography['2xl'], fontWeight: typography.weights.black, color: colors.stone[950], marginBottom: spacing[2], lineHeight: 32 },
  subtitle: { fontSize: typography.sm, color: colors.stone[600], lineHeight: 22, marginBottom: spacing[6] },
  sectionBlock: { marginBottom: spacing[6] },
  sectionHeading: { fontSize: typography.lg, fontWeight: typography.weights.bold, color: colors.stone[950], marginBottom: spacing[3] },
  conceptCard: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius.lg,
    padding: spacing[3],
    marginBottom: spacing[2],
  },
  conceptTerm: { fontSize: typography.sm, fontWeight: typography.weights.bold, color: colors.stone[950], marginBottom: spacing[1] },
  conceptEn: { fontSize: typography.xs, fontWeight: typography.weights.medium, color: colors.stone[500] },
  conceptDef: { fontSize: typography.xs, color: colors.stone[600], lineHeight: 18 },
  takeawayRow: { flexDirection: 'row', gap: spacing[2], marginBottom: spacing[2], alignItems: 'flex-start' },
  takeawayBullet: { color: colors.emerald[600], fontWeight: typography.weights.black, fontSize: typography.sm },
  takeawayText: { flex: 1, fontSize: typography.sm, color: colors.stone[700], lineHeight: 20 },
  noteBox: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius.lg,
    padding: spacing[3],
    backgroundColor: colors.stone[50],
  },
  noteInput: {
    fontSize: typography.sm,
    color: colors.stone[800],
    minHeight: 70,
    textAlignVertical: 'top',
  },
  noteSaveButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.emerald[500],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.md,
    marginTop: spacing[2],
  },
  noteSaveButtonText: { color: 'white', fontSize: typography.xs, fontWeight: typography.weights.bold },
  quizCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius['2xl'],
    padding: spacing[4],
  },
  quizQuestion: { fontSize: typography.base, fontWeight: typography.weights.bold, color: colors.stone[950], marginBottom: spacing[3] },
  quizOption: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius.lg,
    padding: spacing[3],
    marginBottom: spacing[2],
  },
  quizOptionSelected: { borderColor: colors.emerald[500], backgroundColor: colors.emerald[50] },
  quizOptionCorrect: { borderColor: colors.emerald[500], backgroundColor: colors.emerald[50] },
  quizOptionWrong: { borderColor: colors.red[500], backgroundColor: 'rgba(239,68,68,0.08)' },
  quizOptionText: { fontSize: typography.sm, color: colors.stone[800] },
  explanationBox: { backgroundColor: colors.stone[50], borderRadius: radius.md, padding: spacing[3], marginTop: spacing[2], marginBottom: spacing[2] },
  explanationText: { fontSize: typography.xs, color: colors.stone[600], lineHeight: 18 },
  quizSubmit: { backgroundColor: colors.emerald[500], paddingVertical: spacing[3], borderRadius: radius.lg, alignItems: 'center', marginTop: spacing[2] },
  quizSubmitText: { color: 'white', fontSize: typography.sm, fontWeight: typography.weights.bold },
  buttonDisabled: { opacity: 0.5 },
  resultBox: { marginTop: spacing[4], alignItems: 'center' },
  resultText: { fontSize: typography.base, fontWeight: typography.weights.bold, color: colors.stone[900], marginBottom: spacing[3] },
  completeButton: { backgroundColor: colors.stone[900], paddingVertical: spacing[3], paddingHorizontal: spacing[6], borderRadius: radius.lg },
  completeButtonText: { color: 'white', fontSize: typography.sm, fontWeight: typography.weights.bold },
  completedText: { color: colors.emerald[600], fontSize: typography.sm, fontWeight: typography.weights.bold },
});
