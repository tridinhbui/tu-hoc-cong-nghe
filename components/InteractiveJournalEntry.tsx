"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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

function getAccounts(t: Dictionary): Account[] {
  return [
    { id: "cash", label: t.journalEntry.accountCash, kind: "asset" },
    { id: "fixedAsset", label: t.journalEntry.accountFixedAsset, kind: "asset" },
    { id: "inventory", label: t.journalEntry.accountInventory, kind: "asset" },
    { id: "receivable", label: t.journalEntry.accountReceivable, kind: "asset" },
    { id: "loan", label: t.journalEntry.accountLoan, kind: "liability" },
    { id: "payable", label: t.journalEntry.accountPayable, kind: "liability" },
    { id: "equity", label: t.journalEntry.accountEquity, kind: "equity" },
    { id: "revenue", label: t.journalEntry.accountRevenue, kind: "revenue" },
    { id: "expense", label: t.journalEntry.accountExpense, kind: "expense" },
  ];
}

interface Transaction {
  id: string;
  text: string;
  amount: number;
  debit: AccountId;
  credit: AccountId;
  why: string;
}

function getTransactions(t: Dictionary): Transaction[] {
  return [
    {
      id: "loan",
      text: t.journalEntry.txnLoanText,
      amount: 500,
      debit: "cash",
      credit: "loan",
      why: t.journalEntry.txnLoanWhy,
    },
    {
      id: "buy-asset",
      text: t.journalEntry.txnBuyAssetText,
      amount: 20,
      debit: "fixedAsset",
      credit: "cash",
      why: t.journalEntry.txnBuyAssetWhy,
    },
    {
      id: "salary",
      text: t.journalEntry.txnSalaryText,
      amount: 80,
      debit: "expense",
      credit: "cash",
      why: t.journalEntry.txnSalaryWhy,
    },
    {
      id: "sale-credit",
      text: t.journalEntry.txnSaleCreditText,
      amount: 150,
      debit: "receivable",
      credit: "revenue",
      why: t.journalEntry.txnSaleCreditWhy,
    },
    {
      id: "pay-supplier",
      text: t.journalEntry.txnPaySupplierText,
      amount: 60,
      debit: "payable",
      credit: "cash",
      why: t.journalEntry.txnPaySupplierWhy,
    },
  ];
}

/** Phương trình kế toán sau nghiệp vụ, tính theo nhóm tài khoản. */
function equationDelta(accounts: Account[], txn: Transaction) {
  const kind = (id: AccountId) => accounts.find((a) => a.id === id)!.kind;
  const d = kind(txn.debit);
  const c = kind(txn.credit);
  // Ghi Nợ làm tài sản/chi phí tăng, nợ phải trả/vốn chủ/doanh thu giảm.
  let assets = 0;
  let claims = 0; // nợ phải trả + vốn chủ (chi phí và doanh thu chảy vào vốn chủ)
  if (d === "asset") assets += txn.amount;
  else claims -= txn.amount;
  if (c === "asset") assets -= txn.amount;
  else claims += txn.amount;
  return { assets, claims };
}

export default function InteractiveJournalEntry() {
  const { t: dict } = useI18n();
  const accounts = useMemo(() => getAccounts(dict), [dict]);
  const transactions = useMemo(() => getTransactions(dict), [dict]);

  const [index, setIndex] = useState(0);
  const [debit, setDebit] = useState<AccountId | "">("");
  const [credit, setCredit] = useState<AccountId | "">("");
  const [checked, setChecked] = useState(false);

  const txn = transactions[index];
  const debitOk = debit === txn.debit;
  const creditOk = credit === txn.credit;
  const delta = equationDelta(accounts, txn);

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
          {format(dict.journalEntry.transactionCounter, { current: index + 1, total: transactions.length })}
        </h3>
        <div className="flex gap-1">
          {transactions.map((x, i) => (
            <button
              key={x.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={format(dict.journalEntry.transactionAriaLabel, { n: i + 1 })}
              aria-current={i === index}
              className={`h-2 w-6 cursor-pointer rounded-full ${
                i === index ? "bg-stone-900 dark:bg-stone-100" : "bg-stone-200 dark:bg-stone-700"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 rounded-2xl bg-stone-50 px-3 py-2.5 text-sm font-semibold leading-snug text-stone-800 dark:bg-stone-800/60 dark:text-stone-100">
        {txn.text}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Side
          side={dict.journalEntry.debitSide}
          hint={dict.journalEntry.debitHint}
          accounts={accounts}
          value={debit}
          onChange={(v) => { setDebit(v); setChecked(false); }}
          checked={checked}
          ok={debitOk}
          answer={txn.debit}
        />
        <Side
          side={dict.journalEntry.creditSide}
          hint={dict.journalEntry.creditHint}
          accounts={accounts}
          value={credit}
          onChange={(v) => { setCredit(v); setChecked(false); }}
          checked={checked}
          ok={creditOk}
          answer={txn.credit}
        />
      </div>

      <button
        type="button"
        disabled={!debit || !credit}
        onClick={() => setChecked(true)}
        className="mt-3 cursor-pointer rounded-full bg-stone-900 px-4 py-2 text-[11px] font-bold text-white hover:bg-stone-700 disabled:cursor-default disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900"
      >
        {dict.journalEntry.checkButton}
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
              ? dict.journalEntry.bothCorrect
              : !debitOk && !creditOk
                ? dict.journalEntry.bothWrong
                : !debitOk
                  ? dict.journalEntry.debitWrong
                  : dict.journalEntry.creditWrong}
          </p>

          <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
              {dict.journalEntry.equationTitle}
            </p>
            <p className="mt-1 font-mono text-[12px] text-stone-700 dark:text-stone-200">
              {format(dict.journalEntry.equationFormula, {
                assetsSign: sign(dict, delta.assets),
                claimsSign: sign(dict, delta.claims),
              })}
            </p>
            <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
              {delta.assets === 0 && delta.claims === 0
                ? dict.journalEntry.equationUnchangedHint
                : dict.journalEntry.equationBalancedHint}
            </p>
          </div>

          <p className="rounded-2xl bg-stone-50 px-3 py-2.5 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
            {txn.why}
          </p>

          {index < transactions.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="cursor-pointer rounded-full border border-stone-300 px-4 py-2 text-[11px] font-bold text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:text-stone-200"
            >
              {dict.journalEntry.nextTransaction}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function sign(t: Dictionary, v: number): string {
  if (v === 0) return t.journalEntry.signUnchanged;
  return v > 0 ? `+${v}` : `${v}`;
}

function Side({
  side,
  hint,
  accounts,
  value,
  onChange,
  checked,
  ok,
  answer,
}: {
  side: string;
  hint: string;
  accounts: Account[];
  value: AccountId | "";
  onChange: (v: AccountId) => void;
  checked: boolean;
  ok: boolean;
  answer: AccountId;
}) {
  const { t } = useI18n();
  return (
    <label className="block">
      <span className="text-xs font-bold text-stone-700 dark:text-stone-200">
        {t.journalEntry.recordSidePrefix} {side}{" "}
        <span className="font-normal text-stone-400 dark:text-stone-500">— {hint}</span>
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as AccountId)}
        aria-label={format(t.journalEntry.selectAccountAriaLabel, { side })}
        className={`mt-1.5 w-full cursor-pointer rounded-xl border bg-white px-3 py-2 text-xs text-stone-800 dark:bg-stone-900 dark:text-stone-100 ${
          !checked
            ? "border-stone-300 dark:border-stone-700"
            : ok
              ? "border-emerald-400 dark:border-emerald-600"
              : "border-rose-400 dark:border-rose-700"
        }`}
      >
        <option value="">{t.journalEntry.selectAccountPlaceholder}</option>
        {accounts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>
      {checked && !ok && (
        <span className="mt-1 block text-[11px] text-stone-500 dark:text-stone-400">
          {format(t.journalEntry.answerPrefix, { label: accounts.find((a) => a.id === answer)!.label })}
        </span>
      )}
    </label>
  );
}
