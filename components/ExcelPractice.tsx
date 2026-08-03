"use client";

import { useMemo, useState } from "react";
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
  const set = EXCEL_PRACTICE_SETS[setKey];
  if (!set) return null;
  if (set.kind === "grid") return <GridPractice set={set} />;
  if (set.kind === "sql") return <SqlPractice set={set} />;
  return <StepsPractice set={set} />;
}

/* ------------------------------------------------------------------ *
 * Chế độ lưới
 * ------------------------------------------------------------------ */

function GridPractice({ set }: { set: Extract<ExcelPracticeSet, { kind: "grid" }> }) {
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

  const targetRefs = new Set(set.tasks.map((t) => normalizeRef(t.target)));
  const allDone = solved.length === set.tasks.length;

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-4 sm:p-6 space-y-4 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">🧮 {set.title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed dark:text-stone-400">{set.intro}</p>
      </div>

      {/* Lưới */}
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="border-collapse text-[11px] sm:text-xs tabular-nums">
          <thead>
            <tr>
              <th className="w-7 bg-stone-100 border border-stone-200 dark:bg-stone-800 dark:border-stone-700" />
              {set.columns.map((col) => (
                <th
                  key={col}
                  className="min-w-[74px] px-2 py-1 font-semibold text-stone-500 bg-stone-100 border border-stone-200 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: set.rows }, (_, r) => r + 1).map((row) => (
              <tr key={row}>
                <th className="px-1 font-semibold text-stone-500 bg-stone-100 border border-stone-200 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400">
                  {row}
                </th>
                {set.columns.map((col) => {
                  const ref = `${col}${row}`;
                  const value = sheet[ref] ? evaluateCell(sheet, ref) : "";
                  const isTarget = targetRefs.has(ref);
                  const isCurrent = normalizeRef(task.target) === ref;
                  const err = isError(value);
                  return (
                    <td key={ref} className="p-0 border border-stone-200 dark:border-stone-700">
                      <button
                        type="button"
                        onClick={() => selectCell(ref)}
                        className={[
                          "w-full h-7 px-1.5 text-left truncate transition-colors",
                          typeof value === "number" ? "text-right" : "",
                          err ? "text-rose-600 font-semibold dark:text-rose-400" : "text-stone-700 dark:text-stone-200",
                          isCurrent
                            ? "bg-amber-100 ring-2 ring-inset ring-amber-400 dark:bg-amber-500/20 dark:ring-amber-500"
                            : isTarget
                              ? "bg-amber-50/70 dark:bg-amber-500/10"
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
        <div className="flex items-center px-2.5 rounded-lg bg-stone-100 text-stone-600 font-mono text-xs font-bold dark:bg-stone-800 dark:text-stone-300">
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
          placeholder="Gõ công thức, bắt đầu bằng dấu ="
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-stone-200 font-mono text-xs bg-white text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-stone-950 dark:border-stone-700 dark:text-stone-100 dark:placeholder:text-stone-600"
        />
        <button
          type="button"
          onClick={check}
          className="px-4 rounded-lg bg-stone-800 text-white text-xs font-bold hover:bg-stone-700 dark:bg-amber-500 dark:text-stone-900 dark:hover:bg-amber-400"
        >
          Kiểm tra
        </button>
      </div>

      {/* Nhiệm vụ */}
      <div className="rounded-2xl border border-stone-200 p-4 space-y-3 dark:border-stone-700">
        <div className="flex flex-wrap items-center gap-1.5">
          {set.tasks.map((t, i) => (
            <button
              key={t.target}
              type="button"
              onClick={() => goTo(i)}
              className={[
                "w-7 h-7 rounded-lg text-[11px] font-bold transition-colors",
                solved.includes(i)
                  ? "bg-emerald-500 text-white"
                  : i === taskIndex
                    ? "bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900"
                    : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400",
              ].join(" ")}
              aria-label={`Nhiệm vụ ${i + 1}`}
            >
              {solved.includes(i) ? "✓" : i + 1}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-stone-400 dark:text-stone-500">
            {solved.length}/{set.tasks.length}
          </span>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed dark:text-stone-200">
          <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{normalizeRef(task.target)}</span>{" "}
          {task.prompt}
        </p>

        {grade && (
          <div
            className={[
              "rounded-xl px-3 py-2.5 text-xs leading-relaxed",
              grade.ok
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200",
            ].join(" ")}
          >
            {grade.ok && <span className="font-bold">Đúng. </span>}
            {grade.message}
          </div>
        )}

        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="text-stone-500 underline underline-offset-2 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
          >
            {showHint ? "Ẩn gợi ý" : "Gợi ý"}
          </button>
          {taskIndex < set.tasks.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(taskIndex + 1)}
              className="ml-auto font-bold text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
            >
              Nhiệm vụ sau →
            </button>
          )}
        </div>

        {showHint && (
          <p className="font-mono text-[11px] text-stone-500 bg-stone-50 rounded-lg px-3 py-2 dark:bg-stone-800/60 dark:text-stone-400">
            {task.hint}
          </p>
        )}
      </div>

      {allDone && (
        <p className="text-xs text-center text-emerald-700 font-semibold dark:text-emerald-400">
          Xong cả {set.tasks.length} nhiệm vụ. Mở Excel lên và làm lại đúng những bước này trên một file thật.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Chế độ SQL
 * ------------------------------------------------------------------ */

function SqlPractice({ set }: { set: Extract<ExcelPracticeSet, { kind: "sql" }> }) {
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
    <div className="bg-white rounded-3xl border border-stone-100 p-4 sm:p-6 space-y-4 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">🗄️ {set.title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed dark:text-stone-400">{set.intro}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {Object.values(set.db).map((table) => (
          <div key={table.name} className="rounded-2xl border border-stone-200 overflow-hidden dark:border-stone-700">
            <div className="px-3 py-1.5 bg-stone-100 font-mono text-[11px] font-bold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              {table.name}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] tabular-nums">
                <thead>
                  <tr>
                    {table.columns.map((c) => (
                      <th key={c} className="px-2 py-1 text-left font-semibold text-stone-500 dark:text-stone-400">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={i} className="border-t border-stone-100 dark:border-stone-800">
                      {table.columns.map((c) => (
                        <td key={c} className="px-2 py-1 text-stone-700 dark:text-stone-200">
                          {row[c] === null ? "NULL" : String(row[c])}
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

      <div className="rounded-2xl border border-stone-200 p-4 space-y-3 dark:border-stone-700">
        <div className="flex flex-wrap items-center gap-1.5">
          {set.tasks.map((t, i) => (
            <button
              key={t.solution}
              type="button"
              onClick={() => goTo(i)}
              className={[
                "w-7 h-7 rounded-lg text-[11px] font-bold transition-colors",
                solved.includes(i)
                  ? "bg-emerald-500 text-white"
                  : i === taskIndex
                    ? "bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900"
                    : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400",
              ].join(" ")}
              aria-label={`Nhiệm vụ ${i + 1}`}
            >
              {solved.includes(i) ? "✓" : i + 1}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-stone-400 dark:text-stone-500">
            {solved.length}/{set.tasks.length}
          </span>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed dark:text-stone-200">{task.prompt}</p>

        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows={3}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          placeholder="SELECT ..."
          className="w-full px-3 py-2 rounded-lg border border-stone-200 font-mono text-xs bg-white text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-stone-950 dark:border-stone-700 dark:text-stone-100 dark:placeholder:text-stone-600"
        />

        <button
          type="button"
          onClick={submit}
          className="w-full py-2.5 rounded-xl bg-stone-800 text-white text-xs font-bold hover:bg-stone-700 dark:bg-amber-500 dark:text-stone-900 dark:hover:bg-amber-400"
        >
          Chạy truy vấn
        </button>

        {result && (
          <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700">
            <table className="w-full text-[11px] tabular-nums">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-800">
                  {result.columns.map((c) => (
                    <th key={c} className="px-2 py-1 text-left font-semibold text-stone-500 dark:text-stone-400">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i} className="border-t border-stone-100 dark:border-stone-800">
                    {row.map((v, j) => (
                      <td key={j} className="px-2 py-1 text-stone-700 dark:text-stone-200">
                        {v === null ? <span className="text-stone-400 italic">NULL</span> : String(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-2 py-1 text-[10px] text-stone-400 dark:text-stone-500">{result.rows.length} dòng</div>
          </div>
        )}

        {grade && (
          <div
            className={[
              "rounded-xl px-3 py-2.5 text-xs leading-relaxed whitespace-pre-line",
              grade.ok
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200",
            ].join(" ")}
          >
            {grade.ok && <span className="font-bold">Đúng. </span>}
            {grade.message}
          </div>
        )}

        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="text-stone-500 underline underline-offset-2 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
          >
            {showHint ? "Ẩn gợi ý" : "Gợi ý"}
          </button>
          {taskIndex < set.tasks.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(taskIndex + 1)}
              className="ml-auto font-bold text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
            >
              Nhiệm vụ sau →
            </button>
          )}
        </div>

        {showHint && (
          <p className="font-mono text-[11px] text-stone-500 bg-stone-50 rounded-lg px-3 py-2 dark:bg-stone-800/60 dark:text-stone-400">
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
    <div className="bg-white rounded-3xl border border-stone-100 p-4 sm:p-6 space-y-4 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">🧹 {set.title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed dark:text-stone-400">{set.intro}</p>
      </div>

      <ol className="space-y-2">
        {order.map((step, i) => {
          const misplaced = checked && step !== set.task.steps[i];
          return (
            <li
              key={step}
              className={[
                "flex items-center gap-2 rounded-xl border px-3 py-2",
                misplaced
                  ? "border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10"
                  : checked
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                    : "border-stone-200 dark:border-stone-700",
              ].join(" ")}
            >
              <span className="w-5 shrink-0 text-xs font-bold text-stone-400 dark:text-stone-500">{i + 1}</span>
              <span className="flex-1 text-xs leading-relaxed text-stone-700 dark:text-stone-200">{step}</span>
              <span className="flex flex-col shrink-0">
                <button
                  type="button"
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0}
                  aria-label="Lên một bậc"
                  className="px-1.5 text-stone-400 disabled:opacity-20 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(i, i + 1)}
                  disabled={i === order.length - 1}
                  aria-label="Xuống một bậc"
                  className="px-1.5 text-stone-400 disabled:opacity-20 hover:text-stone-700 dark:hover:text-stone-200"
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
        className="w-full py-2.5 rounded-xl bg-stone-800 text-white text-xs font-bold hover:bg-stone-700 dark:bg-amber-500 dark:text-stone-900 dark:hover:bg-amber-400"
      >
        Kiểm tra thứ tự
      </button>

      {checked && (
        <div
          className={[
            "rounded-xl px-3 py-2.5 text-xs leading-relaxed whitespace-pre-line",
            correct
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "bg-amber-50 text-amber-900 dark:bg-amber-500/10 dark:text-amber-200",
          ].join(" ")}
        >
          {correct ? set.task.explain : "Các bước tô vàng đang sai chỗ. Nghĩ xem bước nào phải xong trước thì bước sau mới có dữ liệu đúng để chạy."}
        </div>
      )}
    </div>
  );
}
