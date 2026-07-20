import { useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SAMPLE_QUIZ } from '@/data/sample-lesson';
import { colors, spacing, radius, typography } from '@/constants/design';

const XP_PER_QUESTION = 5;
const PASS_RATIO = 0.6;

type Stage = 'setup' | 'active' | 'done';

export default function QuizScreen() {
  const [stage, setStage] = useState<Stage>('setup');
  const [activeQ, setActiveQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const q = SAMPLE_QUIZ[activeQ];
  const score = results.filter(Boolean).length;
  const passed = results.length > 0 && score >= Math.ceil(SAMPLE_QUIZ.length * PASS_RATIO);

  function startQuiz() {
    setStage('active');
    setActiveQ(0);
    setSelected(null);
    setAnswered(false);
    setResults([]);
  }

  function submitAnswer() {
    if (selected === null) return;
    const isCorrect = selected === q.correct;
    setResults((prev) => [...prev, isCorrect]);
    setAnswered(true);
  }

  function nextQuestion() {
    if (activeQ < SAMPLE_QUIZ.length - 1) {
      setActiveQ((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setStage('done');
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ThemedText style={styles.title}>📋 Kiểm tra kiến thức</ThemedText>
          <ThemedText style={styles.subtitle}>
            {SAMPLE_QUIZ.length} câu hỏi trắc nghiệm, +{XP_PER_QUESTION} XP mỗi câu đúng.
          </ThemedText>

          {stage === 'setup' && (
            <View style={styles.setupBox}>
              <ThemedText style={styles.setupNote}>
                Bộ câu hỏi mẫu dựa trên bài "Tài chính là gì?" - phiên bản đầy đủ theo track/độ khó cần API xác
                thực phía máy chủ (chống gian lận điểm số), giống bản web.
              </ThemedText>
              <Pressable style={styles.startButton} onPress={startQuiz}>
                <ThemedText style={styles.startButtonText}>Bắt đầu kiểm tra</ThemedText>
              </Pressable>
            </View>
          )}

          {stage === 'active' && (
            <>
              <ThemedText style={styles.progressText}>
                Câu {activeQ + 1}/{SAMPLE_QUIZ.length}
              </ThemedText>

              <View style={styles.quizCard}>
                <ThemedText style={styles.quizQuestion}>{q.question}</ThemedText>

                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrectOpt = i === q.correct;
                  return (
                    <Pressable
                      key={i}
                      style={[
                        styles.quizOption,
                        isSelected && !answered && styles.quizOptionSelected,
                        answered && isCorrectOpt && styles.quizOptionCorrect,
                        answered && isSelected && !isCorrectOpt && styles.quizOptionWrong,
                      ]}
                      onPress={() => !answered && setSelected(i)}
                      disabled={answered}
                    >
                      <ThemedText style={styles.quizOptionText}>{opt}</ThemedText>
                    </Pressable>
                  );
                })}

                {answered && (
                  <View style={styles.explanationBox}>
                    <ThemedText style={styles.explanationText}>{q.explanation}</ThemedText>
                  </View>
                )}

                {!answered ? (
                  <Pressable
                    style={[styles.quizSubmit, selected === null && styles.buttonDisabled]}
                    onPress={submitAnswer}
                    disabled={selected === null}
                  >
                    <ThemedText style={styles.quizSubmitText}>Trả lời</ThemedText>
                  </Pressable>
                ) : (
                  <Pressable style={styles.quizSubmit} onPress={nextQuestion}>
                    <ThemedText style={styles.quizSubmitText}>
                      {activeQ < SAMPLE_QUIZ.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
                    </ThemedText>
                  </Pressable>
                )}
              </View>
            </>
          )}

          {stage === 'done' && (
            <View style={styles.doneBox}>
              <ThemedText style={styles.doneEmoji}>{passed ? '🎉' : '📚'}</ThemedText>
              <ThemedText style={styles.doneScore}>
                {score}/{SAMPLE_QUIZ.length} câu đúng
              </ThemedText>
              <ThemedText style={styles.doneXp}>+{score * XP_PER_QUESTION} XP</ThemedText>
              <ThemedText style={styles.doneMessage}>
                {passed ? 'Bạn đã vượt qua bài kiểm tra!' : 'Ôn lại bài học rồi thử lại nhé.'}
              </ThemedText>
              <Pressable style={styles.startButton} onPress={startQuiz}>
                <ThemedText style={styles.startButtonText}>Làm lại</ThemedText>
              </Pressable>
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
  setupBox: { alignItems: 'center', gap: spacing[4], paddingVertical: spacing[6] },
  setupNote: { fontSize: typography.xs, color: colors.stone[500], textAlign: 'center', lineHeight: 18, paddingHorizontal: spacing[4] },
  startButton: { backgroundColor: colors.emerald[500], paddingHorizontal: spacing[6], paddingVertical: spacing[3], borderRadius: radius.lg },
  startButtonText: { color: 'white', fontSize: typography.base, fontWeight: typography.weights.bold },
  progressText: { fontSize: typography.xs, fontWeight: typography.weights.semibold, color: colors.stone[500], marginBottom: spacing[3], textAlign: 'center' },
  quizCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius['2xl'],
    padding: spacing[4],
  },
  quizQuestion: { fontSize: typography.base, fontWeight: typography.weights.bold, color: colors.stone[950], marginBottom: spacing[3] },
  quizOption: { borderWidth: 1, borderColor: colors.stone[200], borderRadius: radius.lg, padding: spacing[3], marginBottom: spacing[2] },
  quizOptionSelected: { borderColor: colors.emerald[500], backgroundColor: colors.emerald[50] },
  quizOptionCorrect: { borderColor: colors.emerald[500], backgroundColor: colors.emerald[50] },
  quizOptionWrong: { borderColor: colors.red[500], backgroundColor: 'rgba(239,68,68,0.08)' },
  quizOptionText: { fontSize: typography.sm, color: colors.stone[800] },
  explanationBox: { backgroundColor: colors.stone[50], borderRadius: radius.md, padding: spacing[3], marginTop: spacing[2], marginBottom: spacing[2] },
  explanationText: { fontSize: typography.xs, color: colors.stone[600], lineHeight: 18 },
  quizSubmit: { backgroundColor: colors.emerald[500], paddingVertical: spacing[3], borderRadius: radius.lg, alignItems: 'center', marginTop: spacing[2] },
  quizSubmitText: { color: 'white', fontSize: typography.sm, fontWeight: typography.weights.bold },
  buttonDisabled: { opacity: 0.5 },
  doneBox: { alignItems: 'center', paddingVertical: spacing[8], gap: spacing[2] },
  doneEmoji: { fontSize: 48, marginBottom: spacing[2] },
  doneScore: { fontSize: typography['2xl'], fontWeight: typography.weights.black, color: colors.stone[950] },
  doneXp: { fontSize: typography.lg, fontWeight: typography.weights.bold, color: colors.emerald[600], marginBottom: spacing[2] },
  doneMessage: { fontSize: typography.sm, color: colors.stone[600], marginBottom: spacing[4], textAlign: 'center' },
});
