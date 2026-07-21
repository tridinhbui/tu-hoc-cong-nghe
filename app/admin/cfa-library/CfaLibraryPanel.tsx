"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save, Trash2, Plus, Loader2, Video, Sparkles } from "lucide-react";
import type { AdminBook, AdminReading, AdminModule, AdminQuizQuestion, QuizQuestionInput } from "@/lib/admin/cfa-library";
import {
  listReadingsAction,
  listModulesAction,
  updateModuleAction,
  getModuleContentAction,
  updateModuleContentAction,
  getModuleQuizAction,
  upsertQuizQuestionAction,
  deleteQuizQuestionAction,
} from "./actions";

const INTERACTIVE_TYPES = [
  { value: "", label: "Không có" },
  { value: "interest-rate", label: "Lãi suất" },
  { value: "supply-demand", label: "Cung cầu" },
  { value: "profit-calc", label: "Tính lợi nhuận" },
  { value: "roe", label: "ROE" },
  { value: "bond", label: "Trái phiếu" },
  { value: "money-vs-asset", label: "Tiền vs Tài sản" },
  { value: "cash-flow-simulator", label: "Mô phỏng dòng tiền" },
  { value: "inflation-calculator", label: "Tính lạm phát" },
];

function newBlankQuestion(questionNo: number): QuizQuestionInput & { id: string } {
  return {
    id: crypto.randomUUID(),
    questionNo,
    prompt: "",
    optionA: "",
    optionB: "",
    optionC: "",
    correct: "A",
    explanation: "",
  };
}

export default function CfaLibraryPanel({ books }: { books: AdminBook[] }) {
  const [bookId, setBookId] = useState(books[0]?.id ?? "");
  const [readings, setReadings] = useState<AdminReading[]>([]);
  const [readingId, setReadingId] = useState("");
  const [modules, setModules] = useState<AdminModule[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const [loadingReadings, setLoadingReadings] = useState(false);
  const [loadingModules, setLoadingModules] = useState(false);

  useEffect(() => {
    if (!bookId) return;
    async function load() {
      setLoadingReadings(true);
      setReadingId("");
      setModules([]);
      setSelectedModuleId(null);
      try {
        const r = await listReadingsAction(bookId);
        setReadings(r);
        if (r[0]) setReadingId(r[0].id);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Không tải được danh sách Reading");
      } finally {
        setLoadingReadings(false);
      }
    }
    load();
  }, [bookId]);

  useEffect(() => {
    if (!readingId) return;
    async function load() {
      setLoadingModules(true);
      setSelectedModuleId(null);
      try {
        setModules(await listModulesAction(readingId));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Không tải được danh sách Module");
      } finally {
        setLoadingModules(false);
      }
    }
    load();
  }, [readingId]);

  const selectedModule = modules.find((m) => m.id === selectedModuleId) ?? null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 block">Sách</label>
          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
          >
            {books.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 block">Reading</label>
          {loadingReadings ? (
            <p className="text-xs text-stone-400">Đang tải...</p>
          ) : (
            <select
              value={readingId}
              onChange={(e) => setReadingId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            >
              {readings.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.code} · {r.title}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 block">Module</label>
          {loadingModules ? (
            <p className="text-xs text-stone-400">Đang tải...</p>
          ) : (
            <div className="space-y-1 max-h-[60vh] overflow-y-auto">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModuleId(m.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedModuleId === m.id
                      ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  {m.code} · {m.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        {selectedModule ? (
          <ModuleEditor
            key={selectedModule.id}
            module={selectedModule}
            onModuleUpdated={(fields) => setModules((prev) => prev.map((m) => (m.id === selectedModule.id ? { ...m, ...fields } : m)))}
          />
        ) : (
          <div className="border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl p-10 text-center text-sm text-stone-400 dark:text-stone-500">
            Chọn một module để chỉnh sửa
          </div>
        )}
      </div>
    </div>
  );
}

function ModuleEditor({
  module: mod,
  onModuleUpdated,
}: {
  module: AdminModule;
  onModuleUpdated: (fields: { title?: string; videoUrl?: string | null; interactiveType?: string | null }) => void;
}) {
  const [title, setTitle] = useState(mod.title);
  const [videoUrl, setVideoUrl] = useState(mod.videoUrl ?? "");
  const [interactiveType, setInteractiveType] = useState(mod.interactiveType ?? "");
  const [savingMeta, setSavingMeta] = useState(false);

  const [content, setContent] = useState("");
  const [loadingContent, setLoadingContent] = useState(true);
  const [savingContent, setSavingContent] = useState(false);

  const [quiz, setQuiz] = useState<(AdminQuizQuestion | (QuizQuestionInput & { id: string; isNew?: boolean }))[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [savingQuestionId, setSavingQuestionId] = useState<string | null>(null);

  useEffect(() => {
    // loadingContent/loadingQuiz already default to true - ModuleEditor is
    // remounted fresh per module (see `key={selectedModule.id}` where it's
    // rendered), so there's no stale "still true from a previous module" to
    // reset here.
    getModuleContentAction(mod.id)
      .then(setContent)
      .catch((err) => toast.error(err instanceof Error ? err.message : "Không tải được nội dung"))
      .finally(() => setLoadingContent(false));

    getModuleQuizAction(mod.id)
      .then(setQuiz)
      .catch((err) => toast.error(err instanceof Error ? err.message : "Không tải được câu hỏi"))
      .finally(() => setLoadingQuiz(false));
  }, [mod.id]);

  async function handleSaveMeta() {
    setSavingMeta(true);
    try {
      const fields = { title, videoUrl: videoUrl.trim() || null, interactiveType: interactiveType || null };
      await updateModuleAction(mod.id, fields);
      onModuleUpdated(fields);
      toast.success("Đã lưu thông tin module");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không lưu được");
    } finally {
      setSavingMeta(false);
    }
  }

  async function handleSaveContent() {
    setSavingContent(true);
    try {
      await updateModuleContentAction(mod.id, content);
      toast.success("Đã lưu nội dung bài học");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không lưu được nội dung");
    } finally {
      setSavingContent(false);
    }
  }

  function updateQuestion(id: string, fields: Partial<QuizQuestionInput>) {
    setQuiz((prev) => prev.map((q) => (q.id === id ? { ...q, ...fields } : q)));
  }

  async function handleSaveQuestion(q: AdminQuizQuestion | (QuizQuestionInput & { id: string })) {
    if (!q.prompt.trim() || !q.optionA.trim() || !q.optionB.trim() || !q.optionC.trim()) {
      toast.error("Điền đủ câu hỏi và cả 3 đáp án trước khi lưu");
      return;
    }
    setSavingQuestionId(q.id);
    try {
      await upsertQuizQuestionAction(mod.id, {
        id: q.id,
        questionNo: q.questionNo,
        prompt: q.prompt,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        correct: q.correct as "A" | "B" | "C",
        explanation: q.explanation,
      });
      toast.success(`Đã lưu câu ${q.questionNo}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không lưu được câu hỏi");
    } finally {
      setSavingQuestionId(null);
    }
  }

  async function handleDeleteQuestion(id: string) {
    try {
      await deleteQuizQuestionAction(id);
      setQuiz((prev) => prev.filter((q) => q.id !== id));
      toast.success("Đã xoá câu hỏi");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không xoá được câu hỏi");
    }
  }

  function handleAddQuestion() {
    setQuiz((prev) => [...prev, newBlankQuestion(prev.length + 1)]);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
        <h2 className="font-bold text-stone-900 dark:text-stone-100">{mod.code} · Thông tin module</h2>
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 block">Tiêu đề</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" /> Link video YouTube (tuỳ chọn)
          </label>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Widget tương tác (tuỳ chọn)
          </label>
          <select
            value={interactiveType}
            onChange={(e) => setInteractiveType(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
          >
            {INTERACTIVE_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSaveMeta}
          disabled={savingMeta}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg disabled:opacity-50"
        >
          {savingMeta ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Lưu thông tin
        </button>
      </div>

      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-3">
        <h2 className="font-bold text-stone-900 dark:text-stone-100">Nội dung bài học</h2>
        {loadingContent ? (
          <p className="text-xs text-stone-400">Đang tải...</p>
        ) : (
          <>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono resize-y"
            />
            <button
              onClick={handleSaveContent}
              disabled={savingContent}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg disabled:opacity-50"
            >
              {savingContent ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Lưu nội dung
            </button>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-stone-900 dark:text-stone-100">Câu hỏi luyện tập ({quiz.length})</h2>
          <button
            onClick={handleAddQuestion}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border-2 border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <Plus className="w-3.5 h-3.5" /> Thêm câu hỏi
          </button>
        </div>

        {loadingQuiz ? (
          <p className="text-xs text-stone-400">Đang tải...</p>
        ) : (
          <div className="space-y-4">
            {quiz.map((q) => (
              <div key={q.id} className="border border-stone-200 dark:border-stone-800 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 dark:text-stone-400">Câu {q.questionNo}</span>
                  <button onClick={() => handleDeleteQuestion(q.id)} className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  value={q.prompt}
                  onChange={(e) => updateQuestion(q.id, { prompt: e.target.value })}
                  placeholder="Câu hỏi..."
                  rows={2}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 resize-none"
                />
                {(["A", "B", "C"] as const).map((letter) => (
                  <div key={letter} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-500 w-4">{letter}</span>
                    <input
                      value={letter === "A" ? q.optionA : letter === "B" ? q.optionB : q.optionC}
                      onChange={(e) =>
                        updateQuestion(q.id, letter === "A" ? { optionA: e.target.value } : letter === "B" ? { optionB: e.target.value } : { optionC: e.target.value })
                      }
                      className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                    />
                    <input
                      type="radio"
                      name={`correct-${q.id}`}
                      checked={q.correct === letter}
                      onChange={() => updateQuestion(q.id, { correct: letter })}
                      title="Đáp án đúng"
                    />
                  </div>
                ))}
                <textarea
                  value={q.explanation ?? ""}
                  onChange={(e) => updateQuestion(q.id, { explanation: e.target.value })}
                  placeholder="Giải thích đáp án..."
                  rows={2}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 resize-none"
                />
                <button
                  onClick={() => handleSaveQuestion(q)}
                  disabled={savingQuestionId === q.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg disabled:opacity-50"
                >
                  {savingQuestionId === q.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  Lưu câu hỏi
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
