import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable, TextInput, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAllUserNotes, createNote, deleteNote, type LessonNote } from '@thtcdn/api';
import { SAMPLE_LESSON } from '@/data/sample-lesson';
import { colors, spacing, radius, typography } from '@/constants/design';

export default function NotesScreen() {
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadNotes = useCallback(async () => {
    const { data, error: err } = await getAllUserNotes();
    if (err) {
      setError(err);
    } else {
      setNotes(data || []);
      setError('');
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes])
  );

  async function handleAddNote() {
    if (!newNote.trim()) return;
    setSaving(true);
    const { error: err } = await createNote(SAMPLE_LESSON.id, SAMPLE_LESSON.slug, newNote.trim());
    if (err) {
      setError(err);
    } else {
      setNewNote('');
      await loadNotes();
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    await deleteNote(id);
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadNotes(); }} />}
        >
          <ThemedText style={styles.title}>📝 Ghi chú của tôi</ThemedText>
          <ThemedText style={styles.subtitle}>Những ý bạn đã lưu lại khi học.</ThemedText>

          <View style={styles.addBox}>
            <TextInput
              style={styles.addInput}
              placeholder={`Thêm ghi chú cho "${SAMPLE_LESSON.title}"...`}
              placeholderTextColor={colors.stone[400]}
              value={newNote}
              onChangeText={setNewNote}
              multiline
            />
            <Pressable
              style={[styles.addButton, (!newNote.trim() || saving) && styles.buttonDisabled]}
              onPress={handleAddNote}
              disabled={!newNote.trim() || saving}
            >
              <ThemedText style={styles.addButtonText}>{saving ? 'Đang lưu...' : 'Thêm ghi chú'}</ThemedText>
            </Pressable>
          </View>

          {error ? <ThemedText style={styles.error}>⚠️ {error}</ThemedText> : null}

          {loading ? (
            <ThemedText style={styles.emptyState}>Đang tải...</ThemedText>
          ) : notes.length === 0 ? (
            <ThemedText style={styles.emptyState}>Chưa có ghi chú nào. Thêm ghi chú đầu tiên ở trên!</ThemedText>
          ) : (
            <View style={styles.notesList}>
              {notes.map((note) => (
                <View key={note.id} style={styles.noteCard}>
                  <ThemedText style={styles.noteContent}>{note.content}</ThemedText>
                  <View style={styles.noteFooter}>
                    <ThemedText style={styles.noteMeta}>
                      {note.lesson_slug} · {new Date(note.updated_at).toLocaleDateString('vi-VN')}
                    </ThemedText>
                    <Pressable onPress={() => handleDelete(note.id)}>
                      <ThemedText style={styles.deleteLink}>Xóa</ThemedText>
                    </Pressable>
                  </View>
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
  addBox: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: spacing[3],
    marginBottom: spacing[5],
  },
  addInput: { fontSize: typography.sm, color: colors.stone[800], minHeight: 60, textAlignVertical: 'top' },
  addButton: { alignSelf: 'flex-end', backgroundColor: colors.emerald[500], paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.md, marginTop: spacing[2] },
  addButtonText: { color: 'white', fontSize: typography.xs, fontWeight: typography.weights.bold },
  buttonDisabled: { opacity: 0.5 },
  error: { color: colors.red[600], fontSize: typography.sm, marginBottom: spacing[3] },
  emptyState: { textAlign: 'center', color: colors.stone[400], paddingVertical: spacing[8] },
  notesList: { gap: spacing[3] },
  noteCard: {
    borderWidth: 1,
    borderColor: colors.stone[200],
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: spacing[3],
    marginBottom: spacing[3],
  },
  noteContent: { fontSize: typography.sm, color: colors.stone[800], lineHeight: 20, marginBottom: spacing[2] },
  noteFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  noteMeta: { fontSize: typography.xs, color: colors.stone[400] },
  deleteLink: { fontSize: typography.xs, fontWeight: typography.weights.bold, color: colors.red[600] },
});
