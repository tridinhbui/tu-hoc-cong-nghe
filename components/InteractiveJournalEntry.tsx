"use client";

import { useState } from "react";

// Định khoản một nghiệp vụ, widget cho các bài khai `interactiveType:
// "journal-entry"`.
//
// Ghi sổ kép là thứ không học được bằng cách đọc. Bảng "tài sản tăng ghi Nợ,
// nợ phải trả tăng ghi Có" đọc xong ai cũng thuộc và không ai dùng được, vì
// cái phải luyện không phải bảng - mà là hai câu hỏi đặt trước nó: nghiệp vụ
// này làm cái gì tăng, và cái gì giảm.
//
// Nên widget bắt chọn hai vế cho một nghiệp vụ có thật, rồi hiện phương trình
// kế toán trước và sau. Chọn sai thì không chỉ báo sai: nó chỉ ra vế nào lệch
// và vì sao, vì "sai rồi" không dạy được gì.
//
// Nghiệp vụ thứ ba cố ý là mua tài sản - chỗ người mới sai nhiều nhất khi coi
// mọi khoản chi tiền là chi phí.

type AccountId = "cash" | "fixedAsset" | "inventory" | "receivable" | "loan" | "payable" | "equity" | "revenue" | "expense";

interface Account {
  id: AccountId;
  label: string;
  /** Nhóm quyết định phía nào của phương trình kế toán. */
  kind: "asset" | "liability" | "equity" | "revenue" | "expense";
}

const ACCOUNTS: Account[] = [
  { id: "cash", label: "Tiền mặt / tiền gửi", kind: "asset" },
  { id: "fixedAsset", label: "Tài sản cố định", kind: "asset" },
  { id: "inventory", label: "Hàng tồn kho", kind: "asset" },
  { id: "receivable", label: "Phải thu khách hàng", kind: "asset" },
  { id: "loan", label: "Vay ngân hàng", kind: "liability" },
  { id: "payable", label: "Phải trả người bán", kind: "liability" },
  { id: "equity", label: "Vốn chủ sở hữu", kind: "equity" },
  { id: "revenue", label: "Doanh thu", kind: "revenue" },
  { id: "expense", label: "Chi phí", kind: "expense" },
];

interface Transaction {
  id: string;
  text: string;
  amount: number;
  debit: AccountId;
  credit: AccountId;
  why: string;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "loan",
    text: "Vay ngân hàng 500 triệu, tiền về tài khoản công ty.",
    amount: 500,
    debit: "cash",
    credit: "loan",
    why: "Tiền là tài sản và nó tăng, nên ghi bên Nợ. Nghĩa vụ trả nợ cũng tăng, nên ghi bên Có. Cả hai bên bảng cân đối cùng phình ra 500 - tiền vay không phải doanh thu, vì nó phải trả lại.",
  },
  {
    id: "buy-asset",
    text: "Mua một máy in 20 triệu, trả ngay bằng tiền mặt.",
    amount: 20,
    debit: "fixedAsset",
    credit: "cash",
    why: "Đây là chỗ người mới sai nhiều nhất: chi tiền không đồng nghĩa phát sinh chi phí. Cái máy vẫn còn đó nên chưa có của cải nào tiêu hao - chỉ là đổi từ tiền sang một tài sản khác. Tổng tài sản không đổi. Nó sẽ tiêu hao dần qua khấu hao.",
  },
  {
    id: "salary",
    text: "Trả lương nhân viên 80 triệu bằng chuyển khoản.",
    amount: 80,
    debit: "expense",
    credit: "cash",
    why: "Công sức đã tiêu hao và không để lại tài sản nào, nên đây là chi phí thật - chi phí tăng ghi bên Nợ. Tiền giảm ghi bên Có. Đây là dạng nghiệp vụ duy nhất làm lợi nhuận giảm.",
  },
  {
    id: "sale-credit",
    text: "Bán hàng 150 triệu, khách nhận nợ chưa trả tiền.",
    amount: 150,
    debit: "receivable",
    credit: "revenue",
    why: "Doanh thu ghi nhận khi bán, không đợi thu tiền - đó là nguyên tắc dồn tích. Chưa có đồng tiền nào về nhưng lợi nhuận đã tăng, và đây chính là lý do một công ty có thể lãi mà vẫn không đủ tiền trả lương.",
  },
  {
    id: "pay-supplier",
    text: "Trả 60 triệu tiền nợ cho nhà cung cấp.",
    amount: 60,
    debit: "payable",
    credit: "cash",
    why: "Nghĩa vụ giảm nên ghi bên Nợ; tiền giảm nên ghi bên Có. Cả hai bên bảng cân đối cùng co lại. Không có chi phí nào phát sinh ở đây - chi phí đã được ghi từ lúc nhận hàng.",
  },
];

/** Phương trình kế toán sau nghiệp vụ, tính theo nhóm tài khoản. */
function equationDelta(t: Transaction) {
  const kind = (id: AccountId) => ACCOUNTS.find((a) => a.id === id)!.kind;
  const d = kind(t.debit);
  const c = kind(t.credit);
  // Ghi Nợ làm tài sản/chi phí tăng, nợ phải trả/vốn chủ/doanh thu giảm.
  let assets = 0;
  let claims = 0; // nợ phải trả + vốn chủ (chi phí và doanh thu chảy vào vốn chủ)
  if (d === "asset") assets += t.amount;
  else claims -= t.amount;
  if (c === "asset") assets -= t.amount;
  else claims += t.amount;
  return { assets, claims };
}

export default function InteractiveJournalEntry() {
  const [index, setIndex] = useState(0);
  const [debit, setDebit] = useState<AccountId | "">("");
  const [credit, setCredit] = useState<AccountId | "">("");
  const [checked, setChecked] = useState(false);

  const t = TRANSACTIONS[index];
  const debitOk = debit === t.debit;
  const creditOk = credit === t.credit;
  const delta = equationDelta(t);

  function goTo(i: number) {
    setIndex(i);
    setDebit("");
    setCredit("");
    setChecked(false);
  }

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
          Nghiệp vụ {index + 1}/{TRANSACTIONS.length}
        </h3>
        <div className="flex gap-1">
          {TRANSACTIONS.map((x, i) => (
            <button
              key={x.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Nghiệp vụ ${i + 1}`}
              aria-current={i === index}
              className={`h-2 w-6 cursor-pointer rounded-full ${
                i === index ? "bg-stone-900 dark:bg-stone-100" : "bg-stone-200 dark:bg-stone-700"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 rounded-2xl bg-stone-50 px-3 py-2.5 text-sm font-semibold leading-snug text-stone-800 dark:bg-stone-800/60 dark:text-stone-100">
        {t.text}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Side
          side="Nợ"
          hint="cái gì tăng lên"
          value={debit}
          onChange={(v) => { setDebit(v); setChecked(false); }}
          checked={checked}
          ok={debitOk}
          answer={t.debit}
        />
        <Side
          side="Có"
          hint="cái gì đi ra, hoặc nghĩa vụ nào tăng"
          value={credit}
          onChange={(v) => { setCredit(v); setChecked(false); }}
          checked={checked}
          ok={creditOk}
          answer={t.credit}
        />
      </div>

      <button
        type="button"
        disabled={!debit || !credit}
        onClick={() => setChecked(true)}
        className="mt-3 cursor-pointer rounded-full bg-stone-900 px-4 py-2 text-[11px] font-bold text-white hover:bg-stone-700 disabled:cursor-default disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900"
      >
        Kiểm tra định khoản
      </button>

      {checked && (
        <div className="mt-4 space-y-3">
          <p
            className={`rounded-2xl px-3 py-2 text-xs font-bold ${
              debitOk && creditOk
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                : "bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
            }`}
          >
            {debitOk && creditOk
              ? "Đúng cả hai vế."
              : !debitOk && !creditOk
                ? "Cả hai vế chưa đúng — thử đặt lại hai câu hỏi: cái gì tăng, cái gì giảm."
                : !debitOk
                  ? "Vế Có đúng, vế Nợ chưa. Hỏi lại: nghiệp vụ này làm cái gì TĂNG lên?"
                  : "Vế Nợ đúng, vế Có chưa. Hỏi lại: cái gì đi ra khỏi doanh nghiệp, hoặc nghĩa vụ nào tăng?"}
          </p>

          <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Phương trình kế toán sau nghiệp vụ
            </p>
            <p className="mt-1 font-mono text-[12px] text-stone-700 dark:text-stone-200">
              Tài sản {sign(delta.assets)} = Nợ phải trả + Vốn chủ {sign(delta.claims)}
            </p>
            <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
              {delta.assets === 0 && delta.claims === 0
                ? "Hai bên không đổi — nghiệp vụ chỉ đổi hình thái trong cùng một bên."
                : "Hai vế đổi cùng một lượng, nên phương trình vẫn cân. Đó là ý nghĩa của ghi sổ kép."}
            </p>
          </div>

          <p className="rounded-2xl bg-stone-50 px-3 py-2.5 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
            {t.why}
          </p>

          {index < TRANSACTIONS.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="cursor-pointer rounded-full border border-stone-300 px-4 py-2 text-[11px] font-bold text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:text-stone-200"
            >
              Nghiệp vụ tiếp theo →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function sign(v: number): string {
  if (v === 0) return "không đổi";
  return v > 0 ? `+${v}` : `${v}`;
}

function Side({
  side,
  hint,
  value,
  onChange,
  checked,
  ok,
  answer,
}: {
  side: string;
  hint: string;
  value: AccountId | "";
  onChange: (v: AccountId) => void;
  checked: boolean;
  ok: boolean;
  answer: AccountId;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-stone-700 dark:text-stone-200">
        Ghi {side}{" "}
        <span className="font-normal text-stone-400 dark:text-stone-500">— {hint}</span>
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as AccountId)}
        aria-label={`Tài khoản ghi ${side}`}
        className={`mt-1.5 w-full cursor-pointer rounded-xl border bg-white px-3 py-2 text-xs text-stone-800 dark:bg-stone-900 dark:text-stone-100 ${
          !checked
            ? "border-stone-300 dark:border-stone-700"
            : ok
              ? "border-emerald-400 dark:border-emerald-600"
              : "border-rose-400 dark:border-rose-700"
        }`}
      >
        <option value="">— chọn tài khoản —</option>
        {ACCOUNTS.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>
      {checked && !ok && (
        <span className="mt-1 block text-[11px] text-stone-500 dark:text-stone-400">
          Đáp án: {ACCOUNTS.find((a) => a.id === answer)!.label}
        </span>
      )}
    </label>
  );
}
