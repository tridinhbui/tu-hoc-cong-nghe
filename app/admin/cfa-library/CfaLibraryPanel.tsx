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
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

function getInteractiveTypes(t: Dictionary) {
  const ti = t.adminTwo.cfaLibrary.interactiveTypes;
  return [
    { value: "", label: ti.none },
    { value: "interest-rate", label: ti.interestRate },
    { value: "supply-demand", label: ti.supplyDemand },
    { value: "profit-calc", label: ti.profitCalc },
    { value: "roe", label: ti.roe },
    { value: "bond", label: ti.bond },
    { value: "money-vs-asset", label: ti.moneyVsAsset },
    { value: "cash-flow-simulator", label: ti.cashFlowSimulator },
    { value: "inflation-calculator", label: ti.inflationCalculator },
  ];
}

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
  const { t } = useI18n();
  const tc = t.adminTwo.cfaLibrary;
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
        toast.error(err instanceof Error ? err.message : tc.loadReadingsError);
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
        toast.error(err instanceof Error ? err.message : tc.loadModulesError);
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
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 block">{tc.bookLabel}</label>
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
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 block">{tc.readingLabel}</label>
          {loadingReadings ? (
            <p className="text-xs text-stone-400">{tc.loadingLabel}</p>
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
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 block">{tc.moduleLabel}</label>
          {loadingModules ? (
            <p className="text-xs text-stone-400">{tc.loadingLabel}</p>
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
            {tc.selectModulePrompt}
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

  const { t } = useI18n();
  const tc = t.adminTwo.cfaLibrary;
  const interactiveTypes = getInteractiveTypes(t);

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
      .catch((err) => toast.error(err instanceof Error ? err.message : tc.loadContentError))
      .finally(() => setLoadingContent(false));

    getModuleQuizAction(mod.id)
      .then(setQuiz)
      .catch((err) => toast.error(err instanceof Error ? err.message : tc.loadQuizError))
      .finally(() => setLoadingQuiz(false));
  }, [mod.id]);

  async function handleSaveMeta() {
    setSavingMeta(true);
    try {
      const fields = { title, videoUrl: videoUrl.trim() || null, interactiveType: interactiveType || null };
      await updateModuleAction(mod.id, fields);
      onModuleUpdated(fields);
      toast.success(tc.saveMetaSuccess);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tc.saveMetaError);
    } finally {
      setSavingMeta(false);
    }
  }

  async function handleSaveContent() {
    setSavingContent(true);
    try {
      await updateModuleContentAction(mod.id, content);
      toast.success(tc.saveContentSuccess);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tc.saveContentError);
    } finally {
      setSavingContent(false);
    }
  }

  function updateQuestion(id: string, fields: Partial<QuizQuestionInput>) {
    setQuiz((prev) => prev.map((q) => (q.id === id ? { ...q, ...fields } : q)));
  }

  async function handleSaveQuestion(q: AdminQuizQuestion | (QuizQuestionInput & { id: string })) {
    if (!q.prompt.trim() || !q.optionA.trim() || !q.optionB.trim() || !q.optionC.trim()) {
      toast.error(tc.questionIncompleteError);
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
      toast.success(format(tc.saveQuestionSuccess, { questionNo: q.questionNo }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tc.saveQuestionError);
    } finally {
      setSavingQuestionId(null);
    }
  }

  async function handleDeleteQuestion(id: string) {
    try {
      await deleteQuizQuestionAction(id);
      setQuiz((prev) => prev.filter((q) => q.id !== id));
      toast.success(tc.deleteQuestionSuccess);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tc.deleteQuestionError);
    }
  }

  function handleAddQuestion() {
    setQuiz((prev) => [...prev, newBlankQuestion(prev.length + 1)]);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
        <h2 className="font-bold text-stone-900 dark:text-stone-100">{format(tc.moduleInfoHeading, { code: mod.code })}</h2>
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 block">{tc.titleLabel}</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" /> {tc.videoLinkLabel}
          </label>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder={tc.videoLinkPlaceholder}
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> {tc.interactiveWidgetLabel}
          </label>
          <select
            value={interactiveType}
            onChange={(e) => setInteractiveType(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
          >
            {interactiveTypes.map((opt) => (
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
          {tc.saveInfoButton}
        </button>
      </div>

      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-3">
        <h2 className="font-bold text-stone-900 dark:text-stone-100">{tc.contentHeading}</h2>
        {loadingContent ? (
          <p className="text-xs text-stone-400">{tc.loadingLabel}</p>
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
              {tc.saveContentButton}
            </button>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-stone-900 dark:text-stone-100">{format(tc.practiceQuestionsHeading, { count: quiz.length })}</h2>
          <button
            onClick={handleAddQuestion}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border-2 border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <Plus className="w-3.5 h-3.5" /> {tc.addQuestionButton}
          </button>
        </div>

        {loadingQuiz ? (
          <p className="text-xs text-stone-400">{tc.loadingLabel}</p>
        ) : (
          <div className="space-y-4">
            {quiz.map((q) => (
              <div key={q.id} className="border border-stone-200 dark:border-stone-800 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 dark:text-stone-400">{format(tc.questionNumberLabel, { questionNo: q.questionNo })}</span>
                  <button onClick={() => handleDeleteQuestion(q.id)} className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  value={q.prompt}
                  onChange={(e) => updateQuestion(q.id, { prompt: e.target.value })}
                  placeholder={tc.questionPlaceholder}
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
                      title={tc.correctAnswerTitle}
                    />
                  </div>
                ))}
                <textarea
                  value={q.explanation ?? ""}
                  onChange={(e) => updateQuestion(q.id, { explanation: e.target.value })}
                  placeholder={tc.explanationPlaceholder}
                  rows={2}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 resize-none"
                />
                <button
                  onClick={() => handleSaveQuestion(q)}
                  disabled={savingQuestionId === q.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg disabled:opacity-50"
                >
                  {savingQuestionId === q.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  {tc.saveQuestionButton}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
