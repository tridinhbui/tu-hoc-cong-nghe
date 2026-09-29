"use client";

import { useMemo, useState } from "react";
import { Calculator, Database, Eraser } from "lucide-react";
import {
  EXCEL_PRACTICE_SETS,
  gradeSqlTask,
  gradeTask,
  type ExcelPracticeSet,
  type ExcelTask,
  type Grade,
} from "@/lib/excel-practice-data";
import { evaluateCell, formatValue, isError, normalizeRef, type Sheet } from "@/lib/mini-spreadsheet";
import { runQuery, type QueryResult } from "@/lib/mini-sql";
import { useI18n } from "@/lib/i18n/context";
import { mergeExcelPracticeSet } from "@/lib/excel-practice-data-i18n";
import { format } from "@/lib/i18n";

// Bảng tính thật, gõ được, ngay trong bài học.
//
// Chặng Excel dạy sáu bài về những thao tác chỉ học được bằng cách làm, và
// trước đây cả sáu bài khai `interactiveType: "process"` - một loại không có
// widget - nên phần thực hành hiện ra trống. Widget này thay vào đó.
//
// Ba lựa chọn đáng nói:
//
//   - MỌI ô đều sửa được, không riêng ô đích. Bài 2 yêu cầu học viên tìm ra
//     khoảng trắng thừa trong dữ liệu nguồn rồi sửa nó; khoá dữ liệu lại thì
//     bài tập đó biến mất.
//   - Chấm bằng giá trị tính ra, không so chuỗi công thức, nên nhiều cách viết
//     đúng đều được nhận. Ràng buộc về cách viết chỉ áp khi chính nó là bài
//     học, và luôn kèm lý do.
//   - Lỗi hiện ra đúng như Excel (#N/A, #DIV/0!, #CIRC!) thay vì bị nuốt. Với
//     bài 3 và bài 4, nhìn thấy lỗi lan khắp bảng CHÍNH LÀ nội dung bài.

type Props = { setKey: string };

/** Áp các ô học viên đã gõ lên trên dữ liệu gốc của bài. */
function buildSheet(base: Sheet, edits: Record<string, string>): Sheet {
  const out: Sheet = { ...base };
  for (const [ref, text] of Object.entries(edits)) {
    const trimmed = text.trim();
    if (trimmed === "") {
      delete out[ref];
      continue;
    }
    if (trimmed.startsWith("=")) {
      out[ref] = { formula: text };
      continue;
    }
    // Nhập số thì lưu thành số; còn lại giữ nguyên chuỗi, kể cả khoảng trắng
    // thừa - bài 2 phụ thuộc vào việc khoảng trắng KHÔNG bị cắt hộ.
    const num = Number(trimmed.replace(/\s/g, ""));
    out[ref] = { value: Number.isNaN(num) ? text : num };
  }
  return out;
}

export default function ExcelPractice({ setKey }: Props) {
  const { locale } = useI18n();
  const raw = EXCEL_PRACTICE_SETS[setKey];
  // Đúng MỘT chỗ áp bản dịch, ngay sau chỗ đọc bộ bài tập và trước khi phân
  // nhánh theo `kind`. Ba component con phía dưới nhận `set` đã dịch nên không
  // cần biết gì về i18n - nếu áp trong từng nhánh thì có ba chỗ phải nhớ.
  const set = raw ? mergeExcelPracticeSet(setKey, raw, locale) : raw;
  if (!set) return null;
  if (set.kind === "grid") return <GridPractice set={set} />;
  if (set.kind === "sql") return <SqlPractice set={set} />;
  return <StepsPractice set={set} />;
}

/* ------------------------------------------------------------------ *
 * Chế độ lưới
 * ------------------------------------------------------------------ */

function GridPractice({ set }: { set: Extract<ExcelPracticeSet, { kind: "grid" }> }) {
  const { t } = useI18n();
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string>(normalizeRef(set.tasks[0].target));
  const [draft, setDraft] = useState<string>("");
  const [taskIndex, setTaskIndex] = useState(0);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [solved, setSolved] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  const task: ExcelTask = set.tasks[taskIndex];

  const sheet: Sheet = useMemo(() => buildSheet(set.cells, edits), [set.cells, edits]);

  const rawOf = (ref: string) =>
    edits[ref] ?? set.cells[ref]?.formula ?? (set.cells[ref]?.value !== undefined ? String(set.cells[ref]!.value) : "");

  function selectCell(ref: string) {
    commitDraft();
    setSelected(ref);
    setDraft(rawOf(ref));
  }

  function commitDraft() {
    if (draft === rawOf(selected)) return;
    setEdits((prev) => ({ ...prev, [selected]: draft }));
    setGrade(null);
  }

  function check() {
    // Chấm trên nội dung Ô ĐANG GÕ, không đợi blur: bấm Kiểm tra ngay sau khi
    // gõ xong là thao tác tự nhiên nhất, và nếu chấm trên state cũ thì học
    // viên nhận phản hồi về công thức trước đó.
    const nextEdits = draft === rawOf(selected) ? edits : { ...edits, [selected]: draft };
    if (nextEdits !== edits) setEdits(nextEdits);
    const result = gradeTask(buildSheet(set.cells, nextEdits), task);
    setGrade(result);
    if (result.ok && !solved.includes(taskIndex)) setSolved((prev) => [...prev, taskIndex]);
  }

  function goTo(index: number) {
    commitDraft();
    setTaskIndex(index);
    setGrade(null);
    setShowHint(false);
    const ref = normalizeRef(set.tasks[index].target);
    setSelected(ref);
    setDraft(rawOf(ref));
  }

  const targetRefs = new Set(set.tasks.map((task) => normalizeRef(task.target)));
  const allDone = solved.length === set.tasks.length;

  return (
    <div className="space-y-4 rounded-md border border-line-strong bg-white p-4 sm:p-6 dark:border-stone-700 dark:bg-stone-900">
      <div>
        <h3 className="flex items-center gap-2 mb-1 text-lg font-black tracking-tight text-ink-max"><Calculator aria-hidden className="h-5 w-5 flex-shrink-0 text-ink-muted" strokeWidth={1.75} /> {set.title}</h3>
        <p className="text-sm leading-relaxed text-ink-soft">{set.intro}</p>
      </div>

      {/* Lưới */}
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="border-collapse text-[11px] sm:text-xs tabular-nums">
          <thead>
            <tr>
              <th className="w-7 bg-surface-raised border border-stone-200 dark:bg-stone-950 dark:border-stone-700" />
              {set.columns.map((col) => (
                <th
                  key={col}
                  className="min-w-[74px] px-2 py-1 font-mono font-medium text-ink-muted bg-surface-raised border border-stone-200 dark:bg-stone-950 dark:border-stone-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: set.rows }, (_, r) => r + 1).map((row) => (
              <tr key={row}>
                <th className="px-1 font-mono font-medium text-ink-muted bg-surface-raised border border-stone-200 dark:bg-stone-950 dark:border-stone-700">
                  {row}
                </th>
                {set.columns.map((col) => {
                  const ref = `${col}${row}`;
                  const value = sheet[ref] ? evaluateCell(sheet, ref) : "";
                  const isTarget = targetRefs.has(ref);
                  const isCurrent = normalizeRef(task.target) === ref;
                  const err = isError(value);
                  return (
                    <td key={ref} className="p-0 border border-line-mid">
                      <button
                        type="button"
                        onClick={() => selectCell(ref)}
                        className={[
                          "w-full h-7 px-1.5 text-left truncate transition-colors",
                          typeof value === "number" ? "text-right" : "",
                          err ? "text-red-600 font-semibold dark:text-red-400" : "text-ink-body",
                          isCurrent
                            ? "bg-brand-50 ring-2 ring-inset ring-brand-600 dark:bg-brand-950/40 dark:ring-brand-400"
                            : isTarget
                              ? "bg-brand-50/50 dark:bg-brand-950/20"
                              : "",
                          selected === ref && !isCurrent ? "ring-2 ring-inset ring-stone-400 dark:ring-stone-500" : "",
                        ].join(" ")}
                      >
                        {formatValue(value)}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Thanh công thức */}
      <div className="flex items-stretch gap-2">
        <div className="flex items-center px-2.5 rounded-sm border border-stone-200 bg-surface-raised text-ink-muted font-mono text-xs font-medium dark:border-stone-700 dark:bg-stone-950">
          {selected}
        </div>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitDraft}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              check();
            }
          }}
          placeholder={t.excelPractice.formulaPlaceholder}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="flex-1 min-w-0 px-3 py-2 rounded-sm border border-line-strong font-mono text-xs bg-white text-ink-max placeholder:text-stone-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 dark:bg-stone-950 dark:focus:border-brand-400 dark:focus:ring-brand-400 dark:border-stone-700 dark:text-stone-100 dark:placeholder:text-stone-600"
        />
        <button
          type="button"
          onClick={check}
          className="px-4 rounded-sm bg-brand-600 text-white text-xs font-bold transition-colors hover:bg-brand-700 dark:hover:bg-brand-300"
        >
          {t.excelPractice.check}
        </button>
      </div>

      {/* Nhiệm vụ */}
      <div className="space-y-3 rounded-sm border border-stone-200 bg-page p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="flex flex-wrap items-center gap-1.5">
          {set.tasks.map((item, i) => (
            <button
              key={item.target}
              type="button"
              onClick={() => goTo(i)}
              className={[
                "w-7 h-7 rounded-sm border font-mono text-[11px] font-medium tabular-nums transition-colors",
                solved.includes(i)
                  ? "border-brand-600 bg-brand-600 text-white dark:border-brand-500 dark:bg-brand-500"
                  : i === taskIndex
                    ? "border-brand-700 bg-brand-600 text-white dark:border-stone-100"
                    : "border-stone-300 bg-white text-ink-muted hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-200",
              ].join(" ")}
              aria-label={format(t.excelPractice.taskAriaLabel, { n: i + 1 })}
            >
              {solved.includes(i) ? "✓" : i + 1}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] tabular-nums text-ink-faint">
            {solved.length}/{set.tasks.length}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-ink-body">
          <span className="font-mono font-medium text-accent-strong">{normalizeRef(task.target)}</span>{" "}
          {task.prompt}
        </p>

        {grade && (
          <div
            className={[
              "border-l-2 pl-3 text-xs leading-relaxed",
              grade.ok
                ? "border-brand-600 text-brand-800 dark:border-brand-400 dark:text-brand-300"
                : "border-amber-500 text-warn-ink",
            ].join(" ")}
          >
            {grade.ok && <span className="font-bold">{t.excelPractice.correctPrefix}</span>}
            {grade.message}
          </div>
        )}

        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="text-ink-muted underline underline-offset-2 hover:text-ink"
          >
            {showHint ? t.excelPractice.hideHint : t.excelPractice.showHint}
          </button>
          {taskIndex < set.tasks.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(taskIndex + 1)}
              className="ml-auto font-bold text-accent-strong underline-offset-4 hover:underline"
            >
              {t.excelPractice.nextTask}
            </button>
          )}
        </div>

        {showHint && (
          <p className="font-mono text-[11px] text-ink-soft border border-stone-200 bg-white rounded-sm px-3 py-2 dark:border-stone-800 dark:bg-stone-900">
            {task.hint}
          </p>
        )}
      </div>

      {allDone && (
        <p className="text-xs text-center font-semibold text-accent-strong">
          {format(t.excelPractice.allDone, { n: set.tasks.length })}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Chế độ SQL
 * ------------------------------------------------------------------ */

function SqlPractice({ set }: { set: Extract<ExcelPracticeSet, { kind: "sql" }> }) {
  const { t } = useI18n();
  const [sql, setSql] = useState("");
  const [taskIndex, setTaskIndex] = useState(0);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [solved, setSolved] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  const task = set.tasks[taskIndex];

  function submit() {
    const verdict = gradeSqlTask(set.db, task, sql);
    setGrade(verdict);
    try {
      // Bảng kết quả hiện ra kể cả khi sai: nhìn thấy truy vấn của mình TRẢ VỀ
      // gì mới là cách sửa nó, chứ không phải đọc một dòng báo sai.
      setResult(sql.trim() ? runQuery(set.db, sql) : null);
    } catch {
      setResult(null);
    }
    if (verdict.ok && !solved.includes(taskIndex)) setSolved((prev) => [...prev, taskIndex]);
  }

  function goTo(index: number) {
    setTaskIndex(index);
    setGrade(null);
    setResult(null);
    setShowHint(false);
    setSql("");
  }

  return (
    <div className="space-y-4 rounded-md border border-line-strong bg-white p-4 sm:p-6 dark:border-stone-700 dark:bg-stone-900">
      <div>
        <h3 className="flex items-center gap-2 mb-1 text-lg font-black tracking-tight text-ink-max"><Database aria-hidden className="h-5 w-5 flex-shrink-0 text-ink-muted" strokeWidth={1.75} /> {set.title}</h3>
        <p className="text-sm leading-relaxed text-ink-soft">{set.intro}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {Object.values(set.db).map((table) => (
          <div key={table.name} className="overflow-hidden rounded-sm border border-line">
            <div className="border-b border-stone-200 px-3 py-1.5 bg-surface-raised font-mono text-[11px] font-medium text-ink-muted dark:border-stone-700 dark:bg-stone-950">
              {table.name}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] tabular-nums">
                <thead>
                  <tr>
                    {table.columns.map((c) => (
                      <th key={c} className="px-2 py-1 text-left font-semibold text-ink-muted">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={i} className="border-t border-line-soft">
                      {table.columns.map((c) => (
                        <td key={c} className="px-2 py-1 text-ink-body">
                          {row[c] === null ? t.excelPractice.nullValue : String(row[c])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-sm border border-stone-200 bg-page p-4 dark:border-stone-800 dark:bg-stone-950">
        <div className="flex flex-wrap items-center gap-1.5">
          {set.tasks.map((item, i) => (
            <button
              key={item.solution}
              type="button"
              onClick={() => goTo(i)}
              className={[
                "w-7 h-7 rounded-sm border font-mono text-[11px] font-medium tabular-nums transition-colors",
                solved.includes(i)
                  ? "border-brand-600 bg-brand-600 text-white dark:border-brand-500 dark:bg-brand-500"
                  : i === taskIndex
                    ? "border-brand-700 bg-brand-600 text-white dark:border-stone-100"
                    : "border-stone-300 bg-white text-ink-muted hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-200",
              ].join(" ")}
              aria-label={format(t.excelPractice.taskAriaLabel, { n: i + 1 })}
            >
              {solved.includes(i) ? "✓" : i + 1}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] tabular-nums text-ink-faint">
            {solved.length}/{set.tasks.length}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-ink-body">{task.prompt}</p>

        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows={3}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          placeholder={t.excelPractice.sqlPlaceholder}
          className="w-full px-3 py-2 rounded-sm border border-line-strong font-mono text-xs bg-white text-ink-max placeholder:text-stone-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 dark:bg-stone-950 dark:focus:border-brand-400 dark:focus:ring-brand-400 dark:border-stone-700 dark:text-stone-100 dark:placeholder:text-stone-600"
        />

        <button
          type="button"
          onClick={submit}
          className="w-full py-2.5 rounded-sm bg-brand-600 text-white text-xs font-bold transition-colors hover:bg-brand-700 dark:hover:bg-brand-300"
        >
          {t.excelPractice.runQuery}
        </button>

        {result && (
          <div className="overflow-x-auto rounded-sm border border-line-mid">
            <table className="w-full text-[11px] tabular-nums">
              <thead>
                <tr className="bg-surface">
                  {result.columns.map((c) => (
                    <th key={c} className="px-2 py-1 text-left font-semibold text-ink-muted">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i} className="border-t border-line-soft">
                    {row.map((v, j) => (
                      <td key={j} className="px-2 py-1 text-ink-body">
                        {v === null ? (
                          <span className="text-stone-400 italic">{t.excelPractice.nullValue}</span>
                        ) : (
                          String(v)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-2 py-1 text-[10px] text-ink-faint">
              {format(t.excelPractice.rowsCount, { n: result.rows.length })}
            </div>
          </div>
        )}

        {grade && (
          <div
            className={[
              "border-l-2 pl-3 text-xs leading-relaxed whitespace-pre-line",
              grade.ok
                ? "border-brand-600 text-brand-800 dark:border-brand-400 dark:text-brand-300"
                : "border-amber-500 text-warn-ink",
            ].join(" ")}
          >
            {grade.ok && <span className="font-bold">{t.excelPractice.correctPrefix}</span>}
            {grade.message}
          </div>
        )}

        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="text-ink-muted underline underline-offset-2 hover:text-ink"
          >
            {showHint ? t.excelPractice.hideHint : t.excelPractice.showHint}
          </button>
          {taskIndex < set.tasks.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(taskIndex + 1)}
              className="ml-auto font-bold text-accent-strong underline-offset-4 hover:underline"
            >
              {t.excelPractice.nextTask}
            </button>
          )}
        </div>

        {showHint && (
          <p className="font-mono text-[11px] text-ink-soft border border-stone-200 bg-white rounded-sm px-3 py-2 dark:border-stone-800 dark:bg-stone-900">
            {task.hint}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Chế độ xếp bước
 * ------------------------------------------------------------------ */

/** Đảo cố định, không dùng Math.random - hàm render phải thuần. */
export function shuffleFixed<T>(items: T[]): T[] {
  const out = [...items];
  // Hoán vị cố định: đủ để thứ tự đầu vào không phải đáp án, và giống nhau ở
  // mọi lần dựng nên server và client không lệch nhau.
  for (let i = 0; i < out.length - 1; i += 2) {
    [out[i], out[i + 1]] = [out[i + 1], out[i]];
  }
  return out.length > 2 ? [out[out.length - 1], ...out.slice(0, out.length - 1)] : out;
}

function StepsPractice({ set }: { set: Extract<ExcelPracticeSet, { kind: "steps" }> }) {
  const { t } = useI18n();
  const [order, setOrder] = useState<string[]>(() => shuffleFixed(set.task.steps));
  const [checked, setChecked] = useState(false);

  const correct = order.every((s, i) => s === set.task.steps[i]);

  function move(from: number, to: number) {
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOrder(next);
    setChecked(false);
  }

  return (
    <div className="space-y-4 rounded-md border border-line-strong bg-white p-4 sm:p-6 dark:border-stone-700 dark:bg-stone-900">
      <div>
        <h3 className="flex items-center gap-2 mb-1 text-lg font-black tracking-tight text-ink-max"><Eraser aria-hidden className="h-5 w-5 flex-shrink-0 text-ink-muted" strokeWidth={1.75} /> {set.title}</h3>
        <p className="text-sm leading-relaxed text-ink-soft">{set.intro}</p>
      </div>

      <ol className="space-y-2">
        {order.map((step, i) => {
          const misplaced = checked && step !== set.task.steps[i];
          return (
            <li
              key={step}
              className={[
                "flex items-center gap-2 rounded-sm border px-3 py-2",
                misplaced
                  ? "border-amber-500 bg-white dark:bg-stone-900"
                  : checked
                    ? "border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/40"
                    : "border-line-mid",
              ].join(" ")}
            >
              <span className="w-5 shrink-0 font-mono text-xs font-medium tabular-nums text-ink-faint">{i + 1}</span>
              <span className="flex-1 text-xs leading-relaxed text-ink-body">{step}</span>
              <span className="flex flex-col shrink-0">
                <button
                  type="button"
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0}
                  aria-label={t.excelPractice.moveUp}
                  className="px-1.5 text-stone-400 disabled:opacity-20 hover:text-ink-body"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(i, i + 1)}
                  disabled={i === order.length - 1}
                  aria-label={t.excelPractice.moveDown}
                  className="px-1.5 text-stone-400 disabled:opacity-20 hover:text-ink-body"
                >
                  ▼
                </button>
              </span>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={() => setChecked(true)}
        className="w-full py-2.5 rounded-sm bg-brand-600 text-white text-xs font-bold transition-colors hover:bg-brand-700 dark:hover:bg-brand-300"
      >
        {t.excelPractice.checkOrder}
      </button>

      {checked && (
        <div
          className={[
            "border-l-2 pl-3 text-xs leading-relaxed whitespace-pre-line",
            correct
              ? "border-brand-600 text-brand-800 dark:border-brand-400 dark:text-brand-300"
              : "border-amber-500 text-warn-ink",
          ].join(" ")}
        >
          {correct ? set.task.explain : t.excelPractice.stepsWrong}
        </div>
      )}
    </div>
  );
}
