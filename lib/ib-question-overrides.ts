// Hand-authored replacements for the scraped options in lib/ib-question-bank.ts.
//
// The original bank was machine-converted from a prose Q&A book: for all 395
// questions the "correct" option is just the first ~200 characters of the
// explanation, hard-truncated mid-sentence (90% of all options end in "..."),
// and every single one of the 1,185 distractors is verbatim another question's
// correct answer - the whole option pool is only 395 distinct strings across
// 1,580 slots. That trains "spot the sentence sharing a noun with the prompt",
// not IB knowledge, and several items are unanswerable as written.
//
// Rather than rewrite the 5.5k-line source file, overrides are applied on top
// of it by id. That keeps the change reviewable batch by batch, revertible per
// question, and leaves the scraped data in place as the fallback for ids not
// yet rewritten. `explanation` is never overridden - it survived the scrape
// intact and is still the teaching content shown after answering.
//
// Authoring rules for each entry:
//   - correct answer: one or two complete sentences, no truncation, faithful
//     to the existing explanation
//   - distractors: plausible for THIS question - the mistakes a candidate
//     actually makes (wrong statement, wrong sign, wrong tax treatment),
//     never another question's answer
//   - keep all four options similar in length so length isn't a tell

export interface IbQuestionOverride {
  options: string[];
  correct: number;
  /** Only for the handful of questions the scrape cut mid-sentence, spilling
   *  the tail of the prompt into the start of `explanation` (id 256 asks
   *  "...the cost of depreciation and lease are the same" and the explanation
   *  opens with "dollar amounts and everything else is held constant"). Where
   *  set, this restores the full prompt; `explanation` keeps its spilled
   *  opening, which reads fine as the first line of an answer. */
  question?: string;
}

export const IB_QUESTION_OVERRIDES: Record<number, IbQuestionOverride> = {
  // ── Accounting - Basic ────────────────────────────────────────────────
  160: {
    options: [
      "Income Statement (revenue and expenses down to Net Income), Balance Sheet (Assets = Liabilities + Shareholders' Equity at a point in time), and Cash Flow Statement (Net Income adjusted for non-cash items and changes in working capital, plus investing and financing activity).",
      "Income Statement, Statement of Retained Earnings, and Cash Flow Statement - the Balance Sheet is a supporting schedule rather than one of the three core statements.",
      "Balance Sheet, Cash Flow Statement, and Statement of Shareholders' Equity - the Income Statement is folded into the Balance Sheet through Retained Earnings.",
      "Income Statement, Balance Sheet, and Trial Balance - the Cash Flow Statement is derived from the other two and is not filed separately.",
    ],
    correct: 0,
  },
  161: {
    options: [
      "Income Statement: Revenue, COGS, SG&A, Operating Income, Pretax Income, Net Income. Balance Sheet: Cash, Accounts Receivable, Inventory, PP&E, Accounts Payable, Debt, Shareholders' Equity. Cash Flow Statement: Net Income, D&A, changes in working capital, CapEx, debt and equity issuance.",
      "Income Statement: Cash, Inventory, PP&E. Balance Sheet: Revenue, COGS, Operating Income. Cash Flow Statement: Dividends, buybacks and interest only.",
      "Income Statement: Revenue and Net Income only. Balance Sheet: Assets only, since Liabilities appear on the Cash Flow Statement. Cash Flow Statement: CapEx and dividends.",
      "All three statements share the same line items - Revenue, Expenses and Cash - and differ only in the time period each one covers.",
    ],
    correct: 0,
  },
  162: {
    options: [
      "Net Income flows from the Income Statement into the top of the Cash Flow Statement and into Shareholders' Equity; the Cash Flow Statement's ending Cash balance becomes Cash on the Balance Sheet, and changes in Balance Sheet items show up as working capital, investing and financing activity.",
      "The three statements are prepared independently from the general ledger and are only reconciled once a year at audit, so there is no direct link between them.",
      "The Balance Sheet flows into the Income Statement through Retained Earnings, and the Cash Flow Statement is built entirely from the Income Statement without touching the Balance Sheet.",
      "Cash Flow from Operations flows into Revenue on the Income Statement, and Net Income becomes the ending Cash balance on the Balance Sheet.",
    ],
    correct: 0,
  },
  163: {
    options: [
      "The Cash Flow Statement, because it shows how much cash the business actually generates independent of non-cash expenses - and cash generation is what matters most for overall financial health.",
      "The Income Statement, because Net Income is the single best measure of financial health and already accounts for every cash movement in the period.",
      "The Balance Sheet, because it shows the company's entire financial position and cash generation can always be inferred from the Assets side.",
      "The Income Statement, because it is the only statement audited by an outside firm and therefore the only one that can be relied on.",
    ],
    correct: 0,
  },
  164: {
    options: [
      "The Income Statement and Balance Sheet, because with a beginning and ending Balance Sheet covering the same period as the Income Statement you can construct the Cash Flow Statement yourself.",
      "The Cash Flow Statement and Balance Sheet, because Net Income can always be read directly off the top of the Cash Flow Statement.",
      "The Income Statement and Cash Flow Statement, because together they show both profitability and cash, and the Balance Sheet adds nothing that isn't already in them.",
      "The Balance Sheet and the Statement of Shareholders' Equity, because between them they capture every transaction the company recorded.",
    ],
    correct: 0,
  },
  165: {
    options: [
      "Operating Income falls $10 and Net Income falls $6 at a 40% tax rate; on the Cash Flow Statement Net Income is down $6 but the $10 non-cash Depreciation is added back, so cash rises $4; on the Balance Sheet PP&E falls $10, Cash rises $4, and Retained Earnings falls $6.",
      "Operating Income falls $10 and Net Income falls $10, since Depreciation is not tax-deductible; cash is unchanged because Depreciation never touches the Cash Flow Statement.",
      "Operating Income falls $10 and Net Income falls $6, and cash falls $6 as well, because the Depreciation charge represents money actually paid out during the period.",
      "There is no effect on any statement, because Depreciation is a non-cash expense and non-cash expenses are excluded from all three statements.",
    ],
    correct: 0,
  },
  166: {
    options: [
      "Because Depreciation is tax-deductible: it reduces Pre-Tax Income, which reduces the taxes you pay, and taxes are a real cash expense.",
      "Because a portion of Depreciation is settled in cash each period under the matching principle, which is what reduces the cash balance.",
      "Because Depreciation reduces the carrying value of PP&E, and companies must set aside an equivalent amount of cash to replace the asset.",
      "It does not actually affect cash - it only appears to, because it is added back on the Cash Flow Statement and then subtracted again on the Balance Sheet.",
    ],
    correct: 0,
  },
  167: {
    options: [
      "It varies by company - it can be its own line item, or embedded within Cost of Goods Sold or Operating Expenses. Either way it always reduces Pre-Tax Income.",
      "It always appears as its own separate line item directly below Operating Income, since accounting standards require it to be disclosed separately.",
      "It never appears on the Income Statement at all - as a non-cash charge it is disclosed only on the Cash Flow Statement.",
      "It is always embedded in SG&A, because Depreciation relates to overhead assets rather than to producing goods.",
    ],
    correct: 0,
  },
  168: {
    options: [
      "Operating Expenses rise $10 so Pre-Tax Income falls $10 and Net Income falls $6; on the Cash Flow Statement the $6 decline is offset by a $10 increase in the Accrued Compensation liability, so cash rises $4.",
      "Operating Expenses rise $10 and Net Income falls $6, and cash falls $10 as well, because compensation is always paid out in the period it is accrued.",
      "There is no Income Statement impact because the compensation has not been paid yet - only the Balance Sheet changes, with Liabilities up $10.",
      "Operating Expenses rise $10 and Net Income falls $10, since accrued compensation is not deductible until it is actually paid in cash.",
    ],
    correct: 0,
  },
  169: {
    options: [
      "No Income Statement change. On the Cash Flow Statement the Inventory build reduces Cash Flow from Operations by $10; on the Balance Sheet Inventory is up $10 and Cash is down $10, so Assets are unchanged and the sheet balances.",
      "COGS rises $10 so Net Income falls $6, and Cash falls $10 - buying inventory is an expense as soon as the cash leaves the business.",
      "No Income Statement change, and no Cash Flow Statement change either - only the Balance Sheet moves, with Inventory up $10 and Cash down $10.",
      "Inventory is up $10 and Cash is down $10, but Shareholders' Equity must also fall $10 to keep the Balance Sheet in balance.",
    ],
    correct: 0,
  },
  170: {
    options: [
      "Because the expense is only recognized when the goods are actually sold - until then the inventory sits on the Balance Sheet as an asset and is not yet a Cost of Goods Sold.",
      "Because Inventory is a working capital item, and working capital changes are recorded directly in Shareholders' Equity rather than in earnings.",
      "Because Inventory purchases are treated as capital expenditures, which never appear on the Income Statement in any period.",
      "It is affected - the Income Statement changes as soon as inventory is purchased, which is one of the most common misconceptions about the statements.",
    ],
    correct: 0,
  },
  171: {
    options: [
      "No Income Statement change yet. Cash Flow Statement: $100 outflow under Investing, offset by a $100 inflow from the debt issuance under Financing, so net cash is flat. Balance Sheet: PP&E up $100, Debt up $100.",
      "No Income Statement change. Cash falls $100 on the Cash Flow Statement, and on the Balance Sheet PP&E is up $100 while Cash is down $100 - the debt is not recorded until the first payment is made.",
      "Operating Income falls $100 immediately, since the factory purchase is an operating expense, and Debt rises $100 on the Balance Sheet.",
      "Interest Expense of $10 is recognized right away, reducing Net Income by $6, and PP&E rises $100 against a $100 increase in Debt.",
    ],
    correct: 0,
  },
  172: {
    options: [
      "Depreciation of $10 and Interest Expense of $10 reduce Pre-Tax Income by $20, so Net Income falls $12 at a 40% tax rate; the $10 Depreciation is added back on the Cash Flow Statement, so cash falls $2, and PP&E is down $10.",
      "Only the $10 of Interest Expense hits the Income Statement, since depreciation on debt-funded assets is capitalized rather than expensed; Net Income falls $6.",
      "Pre-Tax Income falls $20 and Net Income falls $12, and cash also falls $12, because both Depreciation and Interest are settled in cash during the year.",
      "Pre-Tax Income falls $10 from Interest only, and the factory's $10 of depreciation reduces Shareholders' Equity directly without touching the Income Statement.",
    ],
    correct: 0,
  },
  173: {
    options: [
      "The remaining $80 book value is written down on the Income Statement, cutting Net Income by $48 at a 40% tax rate; the write-down is non-cash so it is added back, and repaying the $100 loan is a financing outflow.",
      "The full original $100 is written down regardless of accumulated depreciation, reducing Net Income by $60, and the loan repayment has no statement impact.",
      "The $80 write-down reduces Net Income by $48 and reduces cash by $48 as well, since a write-down represents a real economic loss of cash.",
      "Nothing hits the Income Statement - the $80 is charged directly against Shareholders' Equity, and only the $100 loan repayment appears, under Investing activities.",
    ],
    correct: 0,
  },
  174: {
    options: [
      "No Income Statement change. Inventory rises $10 so Cash Flow from Operations falls $10; on the Balance Sheet Inventory is up $10 and Cash is down $10, leaving Assets flat.",
      "Revenue is unchanged but COGS rises $10, so Net Income falls $6 and cash falls $10.",
      "No changes to any statement, because ordering inventory is only a commitment until the goods are actually manufactured and sold.",
      "Inventory rises $10 and Accounts Payable rises $10, so cash is unaffected and the Balance Sheet balances without touching Cash.",
    ],
    correct: 0,
  },
  175: {
    options: [
      "Revenue up $20 and COGS up $10, so Operating Income is up $10 and Net Income up $6; on the Cash Flow Statement the $10 Inventory drawdown adds back, so cash rises $16, and on the Balance Sheet Cash is up $16 while Inventory is down $10.",
      "Revenue up $20 and COGS up $10, so Net Income is up $6, and cash rises $6 - the inventory was already paid for in the prior step so it has no further effect.",
      "Revenue up $20 with no COGS impact, since the inventory expense was already recognized when it was purchased; Net Income is up $12 and cash up $20.",
      "Revenue up $20 and COGS up $10, Net Income up $6, and cash rises $26 because both the revenue and the released inventory add to operating cash flow.",
    ],
    correct: 0,
  },
  176: {
    options: [
      "Yes - most commonly after a leveraged buyout with a dividend recapitalization, where the owner has pulled out a large amount of equity, or when a company has sustained losses long enough to make Retained Earnings deeply negative.",
      "No - Shareholders' Equity is the residual of Assets minus Liabilities and is mathematically prevented from going below zero.",
      "Yes, but only for companies in formal bankruptcy proceedings, since solvency rules otherwise require equity to stay positive.",
      "Yes, and it always means the company is insolvent and must be liquidated, since Liabilities exceed Assets.",
    ],
    correct: 0,
  },
  177: {
    options: [
      "Working Capital = Current Assets - Current Liabilities. Positive Working Capital means the company can cover its short-term liabilities with its short-term assets; bankers watch the change in Operating Working Capital as a driver of cash flow.",
      "Working Capital = Total Assets - Total Liabilities, and it measures the company's overall net worth available to shareholders.",
      "Working Capital = Cash + Accounts Receivable - Debt, and it is used mainly to size how much additional leverage a company can support.",
      "Working Capital = Revenue - Operating Expenses, and it is used as a proxy for operating cash flow when the Cash Flow Statement is unavailable.",
    ],
    correct: 0,
  },
  178: {
    options: [
      "Not necessarily - subscription businesses with large Deferred Revenue balances, and retailers that collect from customers before paying suppliers, both run negative Working Capital as a sign of strength rather than distress.",
      "Yes, always - negative Working Capital means the company cannot meet its short-term obligations and is a reliable early warning of insolvency.",
      "It is meaningless on its own, because Working Capital is an accounting construct that has no relationship to how a business is actually funded.",
      "Not necessarily, but only for capital-intensive manufacturers, where large PP&E balances make the current ratio look artificially weak.",
    ],
    correct: 0,
  },
  179: {
    options: [
      "The $100 write-down reduces Pre-Tax Income, cutting Net Income by $60 at a 40% tax rate; it is a non-cash charge so it is added back, leaving Cash Flow from Operations up $40, and on the Balance Sheet Assets fall $100 while Cash rises $40.",
      "Net Income falls $60 and cash falls $100, since a write-down reflects assets whose cash value has been permanently lost.",
      "Net Income falls $100 because write-downs are not tax-deductible, and cash is unaffected since the charge is non-cash.",
      "There is no Income Statement impact - the $100 is charged directly to Shareholders' Equity, and only the Balance Sheet changes.",
    ],
    correct: 0,
  },

  // ── Accounting - Advanced ─────────────────────────────────────────────
  193: {
    options: [
      "GAAP is accrual-based while tax accounting is closer to cash-based; GAAP typically uses straight-line depreciation where tax rules allow accelerated methods, and GAAP tracks assets and liabilities in far more detail than tax accounting needs to.",
      "GAAP and tax accounting are identical in substance - they differ only in the forms filed and the deadlines for filing them.",
      "Tax accounting is accrual-based and GAAP is cash-based, which is why taxable income is usually higher than book income.",
      "GAAP applies only to public companies and tax accounting only to private ones, so no single company ever maintains both sets of books.",
    ],
    correct: 0,
  },
  194: {
    options: [
      "They come from temporary differences between what a company deducts for book purposes and for cash-tax purposes: a Deferred Tax Liability arises when book tax expense exceeds cash tax paid, and a Deferred Tax Asset when the company has paid more in cash tax than book expense.",
      "They come from permanent differences such as tax-exempt interest, which is why they never reverse in future periods.",
      "They arise only when a company operates in more than one country and must reconcile competing national tax regimes.",
      "A Deferred Tax Asset arises when cash tax paid exceeds book tax expense, and a Deferred Tax Liability arises for the same reason - the two labels are interchangeable.",
    ],
    correct: 0,
  },
  195: {
    options: [
      "Either bottoms-up - start from individual products or customers, average sale value, and unit growth - or tops-down: start from total market size, assume a market share, and work down to the company's revenue.",
      "Always tops-down, since bottoms-up builds require internal data that public filings never disclose and so cannot be modeled.",
      "Apply a single blended growth rate to last year's revenue - segment-level builds introduce assumptions that make the model less reliable.",
      "Derive revenue from the expense base by applying the company's historical operating margin in reverse.",
    ],
    correct: 0,
  },
  196: {
    options: [
      "A true bottoms-up build starts at the department level - headcount, average salary, bonuses and benefits - usually tying headcount growth to revenue growth, then layers on the non-headcount costs.",
      "Model every expense line as a fixed percentage of the prior year's expense, since operating costs move independently of revenue.",
      "Only Cost of Goods Sold needs to be modeled - SG&A and other operating expenses are non-cash and are added back anyway.",
      "Start from the target operating margin and back into total expenses, which guarantees the model matches management's guidance.",
    ],
    correct: 0,
  },
  197: {
    options: [
      "Fall back to estimates: apply a simple growth rate to total revenue when segment detail is missing, and model major expenses as percentages of revenue when employee-level data isn't disclosed.",
      "Stop the analysis - a model built on estimated inputs has no analytical value and should not be presented to a client.",
      "Substitute the figures of the closest public comparable company, since companies in the same industry report nearly identical economics.",
      "Assume revenue and every expense line stay flat, because holding inputs constant is the only assumption that can't be wrong.",
    ],
    correct: 0,
  },
  198: {
    options: [
      "Common Stock at par value, Retained Earnings (accumulated Net Income less dividends), Additional Paid-In Capital (stock-based compensation and stock created by option exercises), and Treasury Stock for shares the company has repurchased.",
      "Cash, Accounts Receivable, Inventory and PP&E - the assets shareholders have a residual claim on.",
      "Revenue, Operating Income and Net Income, which accumulate into equity at the end of each reporting period.",
      "Long-term Debt, Accounts Payable and Deferred Revenue, since these represent capital the company has raised from outside parties.",
    ],
    correct: 0,
  },
  199: {
    options: [
      "Retained Earnings = prior Retained Earnings + Net Income - Dividends issued.",
      "Retained Earnings = prior Retained Earnings + Revenue - Operating Expenses, since dividends are charged against Additional Paid-In Capital.",
      "Retained Earnings = prior Retained Earnings + Net Income + Stock-Based Compensation, because share issuance adds to accumulated earnings.",
      "Retained Earnings = prior Retained Earnings + Cash Flow from Operations - Capital Expenditures.",
    ],
    correct: 0,
  },
  200: {
    options: [
      "APIC = prior APIC + Stock-Based Compensation + stock created by employees exercising options during the year.",
      "APIC = prior APIC + Net Income - Dividends, which is the same roll-forward used for Retained Earnings.",
      "APIC = prior APIC + the par value of all shares outstanding, restated each period at the current market price.",
      "APIC = prior APIC - Treasury Stock repurchased, since buybacks are recorded as a direct reduction of paid-in capital.",
    ],
    correct: 0,
  },
  201: {
    options: [
      "It shows how each component of Shareholders' Equity rolls forward from the prior period. It isn't used heavily, but it helps when analyzing companies with unusual stock-based compensation or share issuance activity.",
      "It is the primary statement for assessing solvency, and it replaces the Balance Sheet for companies reporting under IFRS.",
      "It reconciles Net Income to Cash Flow from Operations, which is why it sits between the Income Statement and the Cash Flow Statement.",
      "It is required only for companies in bankruptcy, to document how equity holders are being wiped out.",
    ],
    correct: 0,
  },
  202: {
    options: [
      "Restructuring charges, goodwill impairment, asset write-downs, bad debt expense, one-off legal and disaster costs. To qualify as an add-back the charge must be non-recurring and must have hit Operating Income in the first place.",
      "Interest Expense, taxes and dividends - these are the standard EBITDA add-backs regardless of whether they recur.",
      "Cost of Goods Sold and SG&A, since both are operating costs that a normalized earnings figure should exclude.",
      "Any expense that reduced Net Income in the period, whether or not it is expected to recur, since EBITDA is meant to be a pre-expense measure.",
    ],
    correct: 0,
  },
  203: {
    options: [
      "Tie each to the driver it actually moves with: Accounts Receivable and Deferred Revenue as a percentage of revenue, Accounts Payable as a percentage of COGS, and Accrued Expenses as a percentage of operating expenses or SG&A.",
      "Hold every working capital line flat at its current balance, since these items net to zero over a full cycle anyway.",
      "Grow each line at the same rate as Net Income, which keeps the Balance Sheet consistent with profitability.",
      "Project them all as a percentage of total assets, because that is the denominator the Balance Sheet must ultimately balance to.",
    ],
    correct: 0,
  },
  204: {
    options: [
      "Simply, as a percentage of revenue or of the prior PP&E balance. More rigorously, build a PP&E schedule that splits assets by useful life, depreciates each straight-line, and sets CapEx from what the company needs to maintain and grow that asset base.",
      "Set Depreciation equal to Capital Expenditures in every year, since assets are replaced as fast as they wear out.",
      "Project Depreciation off revenue but hold Capital Expenditures at zero, because CapEx is an investing item and does not belong in an operating model.",
      "Take both directly from the Income Statement, which reports the full amount of each in every period.",
    ],
    correct: 0,
  },
  205: {
    options: [
      "Quick approach: reduce Taxable Income by the NOLs usable that year and recompute tax while leaving Pre-Tax Income unchanged. Proper approach: build a book vs. cash tax schedule, with the difference accumulating in the Deferred Tax Liability.",
      "Reduce Pre-Tax Income directly by the full NOL balance in the first year, since losses may be carried forward without limit.",
      "NOLs have no effect on the three statements - they are disclosed only in the tax footnote and never touch reported figures.",
      "Add the NOL balance to Revenue as a tax credit, which flows through Net Income and increases cash in the period it is used.",
    ],
    correct: 0,
  },
  206: {
    options: [
      "Operating leases are shorter-term, convey no ownership, and their expense sits in operating expenses. Capital leases are longer-term, convey ownership rights, and are split into depreciation and interest with the obligation recorded as debt.",
      "Capital leases are shorter-term and expensed in full each period, while operating leases are capitalized on the Balance Sheet and depreciated.",
      "The two are accounting labels for the same arrangement and produce identical Income Statement and Balance Sheet treatment.",
      "Operating leases create a debt balance while capital leases do not, which is why operating leases increase Enterprise Value.",
    ],
    correct: 0,
  },
  207: {
    options: [
      "Because D&A can be embedded inside other Income Statement line items such as COGS rather than shown separately. Use the Cash Flow Statement figure when computing EBITDA, or you will undercount D&A.",
      "Because the Income Statement reports D&A gross while the Cash Flow Statement reports it net of the related tax shield.",
      "Because the Income Statement uses tax depreciation and the Cash Flow Statement uses book depreciation, so the two never agree.",
      "It should never differ - if the two figures disagree, the financial statements contain an error and do not tie out.",
    ],
    correct: 0,
  },

  // ── Enterprise / Equity Value - Basic ─────────────────────────────────
  208: {
    options: [
      "Enterprise Value is the value attributable to all investors in the business; Equity Value is only the slice belonging to shareholders. You look at both because Equity Value is the number the market quotes, while Enterprise Value is what the operating business itself is worth.",
      "They are two names for the same figure - Enterprise Value is the American convention and Equity Value the European one.",
      "Equity Value covers all investors including lenders, while Enterprise Value isolates the shareholders' claim after debt is repaid.",
      "Enterprise Value applies only to private companies and Equity Value only to listed ones, since private firms have no share price.",
    ],
    correct: 0,
  },
  209: {
    options: [
      "Enterprise Value, because it reflects what an acquirer actually pays - it includes the target's debt, which usually has to be repaid or refinanced on a change of control.",
      "Equity Value, because the acquirer only ever writes a cheque to the target's shareholders and the debt stays with the target.",
      "Neither - in an acquisition the only figure that matters is the premium over the target's undisturbed share price.",
      "Equity Value, because Enterprise Value double-counts the debt that is already reflected in the target's share price.",
    ],
    correct: 0,
  },
  210: {
    options: [
      "EV = Equity Value + Debt + Preferred Stock + Minority Interest - Cash.",
      "EV = Equity Value + Cash - Debt - Preferred Stock - Minority Interest.",
      "EV = Equity Value + Debt only - preferred stock and minority interest are equity-like and are already inside Equity Value.",
      "EV = Total Assets - Total Liabilities, adjusted to market value.",
    ],
    correct: 0,
  },
  211: {
    options: [
      "Because once a company owns more than 50% of a subsidiary it consolidates 100% of that subsidiary's financials, so the metrics reflect value the parent doesn't fully own - adding Minority Interest keeps the numerator and denominator consistent.",
      "Because minority shareholders have a senior claim on the parent's assets, which makes their stake behave like debt.",
      "Because minority interest represents cash held at subsidiaries that the parent cannot access, so it must be added back like restricted cash.",
      "You shouldn't add it - Minority Interest belongs to outside shareholders, so it is subtracted from Enterprise Value.",
    ],
    correct: 0,
  },
  212: {
    options: [
      "Start from the basic share count and add the dilutive effect of in-the-money options (via the Treasury Stock Method) plus any other dilutive securities such as warrants, convertible debt and convertible preferred stock.",
      "Add every option and convertible security outstanding to the basic share count, regardless of exercise or conversion price.",
      "Take the basic share count and add only the shares reserved under the company's equity incentive plan, whether granted or not.",
      "Divide Equity Value by the current share price - the result is the fully diluted count by definition.",
    ],
    correct: 0,
  },
  213: {
    options: [
      "$1,050. The 10 options are in-the-money, so exercising them creates 10 new shares and brings in $50 of proceeds, which repurchases 5 shares at $10 - a net 5 new shares, giving 105 shares at $10.",
      "$1,100. All 10 options are in-the-money, so 10 new shares are added at $10 each with no offset for the exercise proceeds.",
      "$1,000. Options never change fully diluted equity value because the exercise proceeds always exactly offset the new shares issued.",
      "$1,050, arrived at by adding the $50 of exercise proceeds directly to the $1,000 basic equity value without changing the share count.",
    ],
    correct: 0,
  },
  214: {
    options: [
      "$1,000. The exercise price of $15 is above the $10 share price, so the options are out-of-the-money and have no dilutive effect.",
      "$1,150. The 10 options add 10 shares regardless of exercise price, since they may still be exercised before expiry.",
      "$850. Out-of-the-money options represent a liability to the company and reduce fully diluted equity value.",
      "$1,050. Applying the Treasury Stock Method to the $15 exercise price yields a net 5 additional shares.",
    ],
    correct: 0,
  },
  215: {
    options: [
      "Cash is a non-operating asset and Equity Value already reflects it; intuitively, a buyer receives the seller's cash and so effectively pays less. It isn't perfectly accurate - some cash is needed to run the business and can't truly be swept out.",
      "Cash is subtracted because it is the most liquid asset and liquid assets are excluded from all valuation multiples by convention.",
      "It is always exactly accurate, because every dollar of cash on the balance sheet is available to the acquirer on closing.",
      "Cash should actually be added, not subtracted - a larger cash balance makes the business more valuable to a buyer.",
    ],
    correct: 0,
  },
  216: {
    options: [
      "Usually yes, since debt agreements typically require repayment or refinancing on a change of control, so the debt genuinely adds to what the buyer pays - but exceptions exist where debt can be assumed on its existing terms.",
      "Always, without exception - debt is a contractual obligation and is added to Equity Value in every situation.",
      "No - debt should never be added, because the target repays its own lenders out of its own cash flow after the deal closes.",
      "Only for investment-grade issuers; high-yield debt is excluded because it typically trades below par.",
    ],
    correct: 0,
  },
  217: {
    options: [
      "Yes - it happens when a company holds a very large cash balance relative to a very low market capitalisation, which you see with firms near bankruptcy and with financial institutions carrying big cash balances.",
      "No - Enterprise Value is the value of the whole business and a business cannot be worth less than nothing.",
      "Yes, and it always signals an arbitrage opportunity, since a buyer could acquire the company and immediately extract more cash than they paid.",
      "Yes, but only as a result of a calculation error, since Debt and Preferred Stock can only ever increase Enterprise Value.",
    ],
    correct: 0,
  },
  218: {
    options: [
      "No. Equity Value is shares outstanding times share price, and neither of those can be negative.",
      "Yes, whenever a company's liabilities exceed its assets - that is precisely what negative Shareholders' Equity means.",
      "Yes, but only for companies in liquidation, where the equity claim is formally extinguished.",
      "Yes, if the company has more debt than its market capitalisation, since the excess is charged against Equity Value.",
    ],
    correct: 0,
  },
  219: {
    options: [
      "Because Preferred Stock pays a fixed dividend and ranks ahead of common equity in a claim on assets, which makes it behave more like debt than like common stock.",
      "Because preferred shareholders can convert into common stock at any time, so their shares are always counted as dilution.",
      "Because Preferred Stock is a non-operating asset, so it is added for the same reason cash is subtracted.",
      "You shouldn't add it - preferred shareholders are equity holders, so their stake is already inside Equity Value.",
    ],
    correct: 0,
  },
  220: {
    options: [
      "If they're in-the-money (conversion price below the share price) treat them as additional dilution to Equity Value; if out-of-the-money, count their face value as Debt.",
      "Always count the full face value as Debt, since convertible bonds are legally debt instruments until conversion actually occurs.",
      "Always treat them as dilution to Equity Value, since the holder will convert eventually if the company survives.",
      "Exclude them entirely - convertibles are contingent instruments and are disclosed only in the footnotes.",
    ],
    correct: 0,
  },
  221: {
    options: [
      "The bonds are in-the-money ($100 share price vs. $50 conversion price), so treat them as shares: $10 million ÷ $1,000 par = 10,000 bonds, each converting into $1,000 ÷ $50 = 20 shares, giving 200,000 new shares and 1.2 million diluted shares.",
      "Divide the $10 million by the $1,000 par value to get 10,000 bonds, and add those 10,000 as new shares, for 1.01 million diluted shares.",
      "The bonds are out-of-the-money, so count the $10 million as Debt and leave diluted shares at 1 million.",
      "Divide the $10 million by the $100 share price to get 100,000 new shares, for 1.1 million diluted shares.",
    ],
    correct: 0,
  },
  222: {
    options: [
      "Equity Value is a market value; Shareholders' Equity is a book value. Equity Value can never be negative, while Shareholders' Equity can be any figure - and for healthy companies Equity Value normally far exceeds it.",
      "They are the same measure computed from different statements - Equity Value off the Balance Sheet and Shareholders' Equity off the Income Statement.",
      "Shareholders' Equity is the market value and Equity Value is the book value, which is why Equity Value appears on the Balance Sheet.",
      "Equity Value includes debt while Shareholders' Equity excludes it, which is the only difference between the two.",
    ],
    correct: 0,
  },

  // ── Enterprise / Equity Value - Advanced ──────────────────────────────
  223: {
    options: [
      "Yes - it's too simple. With real companies you also have to consider Net Operating Losses, long-term and equity investments, capital leases, unfunded pension obligations and other liabilities, several of which are treated like cash or like debt.",
      "No - the formula is complete, which is why it is the one convention every bank applies without adjustment.",
      "Yes - the whole formula is wrong, because Enterprise Value should be computed as Total Assets less Total Liabilities at market value.",
      "Yes - it fails only for financial institutions, and is exactly correct for every non-financial company.",
    ],
    correct: 0,
  },
  224: {
    options: [
      "Technically market value for everything, but in practice market value is only obtainable for the Equity Value portion, so the remaining items are usually taken at book value off the company's filings.",
      "Book value throughout, because market values fluctuate daily and would make the multiple non-comparable across companies.",
      "Market value throughout, which is straightforward since debt, preferred stock and minority interest all trade on observable markets.",
      "Book value for Equity Value and market value for everything else, since the share price is the least reliable input.",
    ],
    correct: 0,
  },
  225: {
    options: [
      "There's no hard rule, but most bankers treat anything above roughly 10% as unusual and worth re-checking - for example a basic Equity Value of $100 million diluting to $115 million.",
      "Anything above 1% is a red flag, since well-run companies avoid issuing dilutive securities at all.",
      "There is a formal threshold of 25% set by accounting standards, above which the dilution must be separately disclosed.",
      "The percentage is irrelevant - dilution is a mechanical calculation, so any result it produces is by definition reasonable.",
    ],
    correct: 0,
  },

  // ── Valuation - Basic ─────────────────────────────────────────────────
  226: {
    options: [
      "Comparable Companies, Precedent Transactions and Discounted Cash Flow analysis.",
      "Comparable Companies, Leveraged Buyout analysis and Liquidation Valuation.",
      "Discounted Cash Flow, Sum of the Parts and Replacement Value.",
      "Book Value, Market Capitalisation and Enterprise Value.",
    ],
    correct: 0,
  },
  227: {
    options: [
      "There's no ranking that always holds. Precedent Transactions usually come out above Comparable Companies because of the control premium in an acquisition, but a DCF can land either way and is simply more variable than the other two.",
      "DCF is always highest, then Precedent Transactions, then Comparable Companies - discounting future cash flows always captures more value than any market-based method.",
      "Comparable Companies is always highest because public market multiples price in growth expectations that private deals never reflect.",
      "Precedent Transactions is always lowest, since distressed sellers drag historical deal multiples below current trading levels.",
    ],
    correct: 0,
  },
  228: {
    options: [
      "When cash flows are unstable or unpredictable - an early-stage tech or biotech company - or when debt and working capital play a fundamentally different role, as with banks and financial institutions.",
      "When the company is unprofitable, since a DCF cannot be built on negative earnings under any circumstances.",
      "When the company is private, because a DCF requires an observable share price to compute the discount rate.",
      "Whenever comparable companies exist - a DCF is only a fallback for businesses with no public peers.",
    ],
    correct: 0,
  },
  229: {
    options: [
      "Liquidation Valuation (asset value less liabilities), Replacement Value (cost to rebuild the asset base), LBO analysis, and Sum of the Parts for multi-division businesses.",
      "Only the three core methods exist - anything else is a variation on Comparable Companies rather than a separate methodology.",
      "Book Value, Par Value and Face Value, which together capture a company's accounting worth.",
      "Dividend yield analysis and share buyback analysis, which are the standard supplements to the core three.",
    ],
    correct: 0,
  },
  230: {
    options: [
      "Mostly in bankruptcy, to see whether equity holders receive anything once debts are repaid - and to advise a struggling business on whether selling assets piecemeal beats selling the whole company.",
      "For high-growth companies, since their asset base is the only part of the business that can be valued with confidence.",
      "As the default method for any private company, because private firms have no market price to anchor a relative valuation.",
      "Whenever a DCF produces a value below the current share price, as a sanity check on the discount rate.",
    ],
    correct: 0,
  },
  231: {
    options: [
      "When a company has genuinely unrelated divisions - a conglomerate such as GE with plastics, entertainment, energy, consumer finance and technology arms - so each division is valued with its own peer set and the results are added up.",
      "When a company operates in a single industry but across several countries, so each geography can be valued separately.",
      "When a company is being liquidated, since Sum of the Parts is another name for adding up asset sale proceeds.",
      "Whenever a company has more than one product line, however closely related those product lines are.",
    ],
    correct: 0,
  },
  232: {
    options: [
      "Whenever you're looking at a leveraged buyout, and also to establish what a private equity firm could pay - which is usually less than a strategic buyer, so it tends to set a floor on the valuation range.",
      "Whenever you need the highest possible valuation, since leverage magnifies returns and therefore the price a buyer can justify.",
      "Only for companies already owned by a private equity firm, since an LBO analysis requires an existing debt structure to model.",
      "As a replacement for the DCF whenever cash flows are too unpredictable to forecast.",
    ],
    correct: 0,
  },
  233: {
    options: [
      "EV/Revenue, EV/EBITDA, EV/EBIT, P/E (share price over earnings per share) and P/BV (share price over book value).",
      "EV/Net Income, Equity Value/EBITDA, P/Revenue and Debt/Equity.",
      "EV/Free Cash Flow, EV/Dividends, P/Cash and Revenue/Assets.",
      "Only EV/EBITDA and P/E - the other ratios are industry-specific rather than general-purpose multiples.",
    ],
    correct: 0,
  },
  234: {
    options: [
      "Internet: EV/Unique Visitors, EV/Pageviews. Retail and airlines: EV/EBITDAR, which adds back rent. Energy: P/MCFE and P/NAV. Real estate: P/FFO.",
      "Every industry uses EV/EBITDA - industry-specific multiples are a myth that comes up in interviews but not in practice.",
      "Internet: P/E. Retail: EV/Revenue. Energy: EV/EBITDA. These are simply the standard multiples applied to different sectors.",
      "Industry-specific multiples all pair Equity Value with an operating metric, because operating metrics belong to shareholders.",
    ],
    correct: 0,
  },
  235: {
    options: [
      "Because those scientists or subscribers are available to all the investors in the company, both debt and equity - and Enterprise Value is the figure that represents all of them. The logic has to be checked metric by metric, though.",
      "Because Enterprise Value is always larger than Equity Value, which keeps industry multiples on a comparable scale across companies.",
      "Because Equity Value fluctuates with the share price while Enterprise Value is fixed, making it the more stable numerator.",
      "Because operational metrics like subscribers are recorded on the Balance Sheet, which is what Enterprise Value is derived from.",
    ],
    correct: 0,
  },
  236: {
    options: [
      "It could go either way, but usually the LBO gives a lower value: an LBO captures no value from the cash flows between year 1 and exit, valuing the business only on its terminal value, whereas a DCF credits every year's cash flow.",
      "The DCF is always lower, because discounting at the WACC penalises distant cash flows more heavily than an LBO's return requirement does.",
      "They always produce the same value when the same operating assumptions are used - the two are mathematically equivalent.",
      "The LBO is always higher, because the debt used in the structure adds the value of the interest tax shield on top of the business value.",
    ],
    correct: 0,
  },
  237: {
    options: [
      "As a \"football field\" chart showing the valuation range each methodology implies - always a range rather than a single number.",
      "As a single point estimate, since presenting a range signals that the analysis is not rigorous enough to defend.",
      "As a ranked table listing the methodologies from highest to lowest value, with the highest presented as the recommendation.",
      "As a pie chart splitting total value across the three methodologies by their relative weighting.",
    ],
    correct: 0,
  },
  238: {
    options: [
      "The same way you'd value a company: what comparable apple trees sell for (relative valuation) and the value of the cash flows the tree produces (intrinsic valuation). You can run a DCF on anything.",
      "You couldn't - a DCF requires financial statements, so valuation methodologies don't apply to physical assets.",
      "Only by replacement cost, since a tree produces no contractual cash flows that could be discounted.",
      "By its liquidation value alone - the timber it would yield if cut down - because that is the only certain cash it generates.",
    ],
    correct: 0,
  },
  239: {
    options: [
      "Because EBITDA is available to all investors in the company, so it must be paired with Enterprise Value, which also represents all investors. Equity Value excludes the debt claim, so pairing the two compares apples to oranges.",
      "Because EBITDA is a pre-tax figure and Equity Value is an after-tax figure, so the two are measured on inconsistent bases.",
      "Because Equity Value changes daily with the share price while EBITDA is annual, so the ratio would never be stable.",
      "You can use it - Equity Value/EBITDA is simply a less common presentation of the same relationship as EV/EBITDA.",
    ],
    correct: 0,
  },
  240: {
    options: [
      "Rarely - but it can happen when a company holds substantial hard assets while the market is severely undervaluing it for a specific reason such as an earnings miss, so its trading and transaction comps come out lower than its asset value.",
      "Whenever a company is profitable, since profitable businesses always carry assets worth more than their going-concern value.",
      "For high-growth technology companies, whose intangible assets are worth far more in a liquidation than as an operating business.",
      "Never - by definition a liquidation value is the floor and can never exceed any other methodology.",
    ],
    correct: 0,
  },
  241: {
    options: [
      "With Comparable Companies and Precedent Transactions on creative multiples such as EV/Unique Visitors and EV/Pageviews. You would not attempt a far-in-the-future DCF, because you can't credibly forecast cash flows for a company that isn't yet generating any.",
      "With a DCF projecting 20 years out, since a company with no current cash flows can only be valued on its long-run potential.",
      "You couldn't value it at all - with no revenue there is no metric to attach a multiple to.",
      "With a Liquidation Valuation, since the servers and office equipment are the only assets with a determinable value.",
    ],
    correct: 0,
  },
  242: {
    options: [
      "It depends which one: Unlevered Free Cash Flow excludes interest and so belongs to all investors, pairing with Enterprise Value; Levered Free Cash Flow is after interest and belongs to equity holders, pairing with Equity Value.",
      "Enterprise Value for both, since Free Cash Flow is an operating measure regardless of how it is defined.",
      "Equity Value for both, since Free Cash Flow is ultimately what is available to distribute to shareholders.",
      "Neither - Free Cash Flow is used in a DCF and is never expressed as a multiple.",
    ],
    correct: 0,
  },
  243: {
    options: [
      "Rarely, but yes: large financial institutions with big cash balances can have negative Enterprise Values, so Equity Value/Revenue may be the only workable option - for instance when comparing financial and non-financial companies side by side.",
      "Never, for the same reason as Equity Value/EBITDA - revenue is available to all investors, so it must pair with Enterprise Value.",
      "Always - Equity Value/Revenue is in fact the standard revenue multiple, and EV/Revenue is the unusual variant.",
      "Only for pre-revenue companies, where the denominator is small enough that the choice of numerator no longer matters.",
    ],
    correct: 0,
  },
  244: {
    options: [
      "On three axes: industry classification, financial criteria such as revenue or EBITDA, and geography. For precedent transactions you also cap the lookback, usually to deals in the past one to two years.",
      "Purely by market capitalisation, since companies of a similar size trade on similar multiples regardless of what they do.",
      "By picking the companies with multiples closest to the target's, so the resulting range is tight and defensible.",
      "By taking every listed company in the same country, since a broad sample is always more statistically reliable.",
    ],
    correct: 0,
  },
  245: {
    options: [
      "Take the median multiple from the set and apply it to the equivalent metric of the company you're valuing - for example a median precedent EBITDA multiple times your company's EBITDA.",
      "Average the valuations produced by all three methodologies to arrive at a single blended value.",
      "Take the highest multiple in the set, since that establishes the maximum an acquirer has been willing to pay.",
      "Apply the target's own historical multiple to its current metric, which controls for company-specific factors.",
    ],
    correct: 0,
  },
  246: {
    options: [
      "In pitch books and client presentations, and in a Fairness Opinion - the document a bank produces near closing to support the view that the price its client is paying or receiving is reasonable.",
      "Only internally, as a risk-management check - valuations are never shown to clients because they would create legal liability.",
      "To set the company's share price on the exchange, which is why listed companies commission one each quarter.",
      "Purely as an academic exercise during analyst training; live deals are priced by negotiation rather than valuation work.",
    ],
    correct: 0,
  },
  247: {
    options: [
      "Several reasons: it may have just beaten earnings expectations and re-rated, it may hold a competitive advantage not visible in the financials such as a key patent, or it may have just announced a favourable acquisition or new product.",
      "It can't - companies with identical growth and profitability always trade on identical multiples, which is the premise comparable analysis rests on.",
      "Because it has more debt, and leverage mechanically raises the EV/EBITDA multiple relative to unlevered peers.",
      "Because it is larger, and size alone guarantees a premium regardless of any other characteristic.",
    ],
    correct: 0,
  },
  248: {
    options: [
      "No company is fully comparable to another; the stock market is emotional, so the multiples swing with the market on any given day; and thinly-traded small caps may have share prices that don't reflect their real value.",
      "The main flaw is that public data is unreliable, since listed companies are not required to have their financials audited.",
      "They are only flawed when fewer than ten peers exist - with a large enough sample the methodology has no weaknesses.",
      "They systematically overvalue every company, because public markets always price in a control premium.",
    ],
    correct: 0,
  },
  249: {
    options: [
      "Use the 75th percentile or above rather than the median, add a premium to selected multiples, or run more aggressive projections. In practice you'd use one of these, not all three at once.",
      "Add a fixed 20% control premium, which is the standard adjustment for any competitive advantage.",
      "Exclude the weaker peers from the comparable set until the median rises to the level you consider appropriate.",
      "You don't - a competitive advantage is qualitative and cannot be reflected in a valuation.",
    ],
    correct: 0,
  },
  250: {
    options: [
      "There's no rule requiring it, though usually you do because the middle of the set is the most defensible. For a distressed or underperforming company you might use the 25th percentile instead.",
      "Yes, always - using anything other than the median makes the analysis subjective and indefensible.",
      "No, you normally use the mean, since it uses every data point rather than discarding the tails.",
      "You use the highest multiple for buy-side work and the lowest for sell-side work, depending on whose interest you represent.",
    ],
    correct: 0,
  },
  251: {
    options: [
      "Yes - when the M&A market and the public market are badly mismatched. If no public companies have been acquired recently but many small private ones have gone for very low valuations, precedents can come out below trading comps.",
      "No - the control premium in an acquisition guarantees precedent transactions always exceed trading comparables.",
      "Yes, but only when the precedent deals are all-stock, since stock consideration carries no premium.",
      "Yes, whenever the precedent transactions are more than a year old, because older deals are always priced lower.",
    ],
    correct: 0,
  },
  252: {
    options: [
      "Past deals are rarely fully comparable - structure, target size and market sentiment all move the multiple - and the data is harder to find than for public comparables, especially for acquisitions of small private companies.",
      "The only flaw is that they include a control premium, which can be removed with a standard 20% adjustment.",
      "They are less reliable than trading comps purely because there are usually fewer of them, with no other material weakness.",
      "They have no real flaws, which is why precedent transactions are treated as the single most authoritative methodology.",
    ],
    correct: 0,
  },
  253: {
    options: [
      "One sale process may have been far more competitive with more bidders, one target may have had recent bad news or a depressed share price and sold at a discount, or the two sat in industries with different median multiples.",
      "It's impossible - identical financial profiles and the same acquirer must produce the same multiple.",
      "One deal must have been all-cash and the other all-stock, which is the only factor that can double a multiple.",
      "The acquirer must have made an error in one of the two valuations, since a 2x gap has no legitimate explanation.",
    ],
    correct: 0,
  },
  254: {
    options: [
      "Because EBITDA ignores capital expenditures, which are often large and very real - hence his line about the tooth fairy paying for CapEx. EBIT is after depreciation, so it partly reflects the cost of the asset base.",
      "Because EBIT is calculated after interest, which makes it a better measure of what equity holders actually keep.",
      "Because EBITDA is not a GAAP measure and therefore cannot legally be used in a published valuation.",
      "Because EBIT multiples are consistently lower, giving a more conservative valuation in every industry.",
    ],
    correct: 0,
  },
  255: {
    options: [
      "P/E depends on capital structure while EV/EBIT and EV/EBITDA are capital-structure neutral, so P/E suits banks and financial institutions where interest is central. EV/EBIT is after D&A, making it the better fit for capital-intensive businesses.",
      "All three are capital-structure neutral and interchangeable; the choice between them is purely a matter of house convention.",
      "EV/EBITDA depends on capital structure while P/E does not, which is why P/E is the default for industrial companies.",
      "EV/EBIT and EV/EBITDA are identical in practice, since depreciation and amortisation are non-cash and net to zero over time.",
    ],
    correct: 0,
  },
  256: {
    question:
      "If you were buying a vending machine business, would you pay a higher multiple for a business where you owned the machines and they depreciated normally, or one in which you leased the machines? The cost of depreciation and lease are the same dollar amounts and everything else is held constant.",
    options: [
      "A higher multiple for the leased business. The lease is an operating expense so it sits inside EBITDA, making EBITDA lower; depreciation is excluded from EBITDA, so the owned business shows higher EBITDA and therefore a lower multiple on the same Enterprise Value.",
      "A higher multiple for the owned business, because owning the machines gives the buyer a hard asset base that a leased fleet does not.",
      "The same multiple for both, because the question states the dollar cost is identical, so the two businesses are economically equivalent.",
      "A higher multiple for the leased business, because leasing removes the machines from the Balance Sheet and therefore reduces Enterprise Value.",
    ],
    correct: 0,
  },
  257: {
    options: [
      "The same three methodologies, with adjustments: you might discount public comparable multiples by 10-15% or more for illiquidity, and there's no market price, so Cost of Equity and WACC inputs have to be estimated from public peers.",
      "Only a DCF works, since a private company has no peers and no observable transaction history.",
      "Exactly the same as a public company with no adjustments - the methodologies are indifferent to listing status.",
      "Only book value applies, because without a share price there is no way to establish a market-based valuation.",
    ],
    correct: 0,
  },
  258: {
    options: [
      "Because a precedent transaction is the purchase of an entire company, and once acquired those shares are illiquid anyway - so no illiquidity discount is warranted. Trading comps price individual liquid shares, which is the thing a private company lacks.",
      "Because precedent transactions already embed a control premium, which offsets the illiquidity discount exactly.",
      "Because transaction data is less reliable than trading data, so applying a further adjustment would compound the error.",
      "You should discount both equally - treating them differently introduces an inconsistency into the valuation.",
    ],
    correct: 0,
  },
  259: {
    options: [
      "Only as precedent transactions. They can't be used as public company comparables, or in the Cost of Equity and WACC build in a DCF, because they have no market cap and no observable Beta.",
      "Yes, anywhere - private company financials work identically to public ones for every methodology.",
      "No, never - a valuation may only reference publicly listed companies.",
      "Only in a DCF, where private company margins can be used to build the projections.",
    ],
    correct: 0,
  },

  // ── Valuation - Advanced ──────────────────────────────────────────────
  260: {
    options: [
      "Broadly the same methodologies, but you use P/E and P/BV rather than EV-based multiples because banks have unusual capital structures, and you lean on bank-specific metrics such as Net Asset Value and a dividend discount model rather than a standard DCF.",
      "Exactly the same as any other company - the methodologies are indifferent to industry, which is what makes them general-purpose.",
      "Only a liquidation valuation applies, because a bank's value is entirely the sum of the loans on its balance sheet.",
      "You use EV/EBITDA exclusively, since interest is the bank's core revenue line and must stay inside the metric.",
    ],
    correct: 0,
  },
  261: {
    options: [
      "You use public company comparables only, pick the most relevant multiple to estimate Enterprise Value, work back to Equity Value, then apply an IPO discount of roughly 10-15% and divide by the post-offering share count to get the price per share.",
      "You run all three methodologies and average them, since an IPO price has to be defensible from every angle.",
      "You use precedent transactions only, because an IPO is a sale of the company and should be priced off comparable sales.",
      "You take the last private funding round's valuation and apply the market's average one-year return to it.",
    ],
    correct: 0,
  },
  262: {
    options: [
      "TTM = most recent fiscal year + the new partial period - the same partial period a year earlier. In April you'd take the latest fiscal year, add this year's Q1 and subtract last year's Q1.",
      "TTM = most recent fiscal year + the new partial period, with no subtraction - the older quarter is already outside the twelve-month window.",
      "TTM = the sum of the last four quarters reported, which is why calendarisation is only possible for companies reporting quarterly.",
      "TTM = most recent fiscal year × the fraction of the year elapsed, annualised back up to twelve months.",
    ],
    correct: 0,
  },
  263: {
    options: [
      "You look at what buyers paid over the seller's undisturbed share price in comparable deals - a company trading at $10.00 acquired for $15.00 is a 50% premium - then apply the median premium from that set to your company's current share price.",
      "You compare the buyer's share price before and after announcement, and the change is the premium paid.",
      "You measure the gap between the deal price and the target's book value per share, which is the premium over what shareholders originally invested.",
      "You take the difference between the precedent EBITDA multiple and the trading EBITDA multiple, which is the premium by definition.",
    ],
    correct: 0,
  },
  264: {
    options: [
      "You take the median historical P/E of the comparables, apply it to your company's forward projected EPS to get a future share price, then discount that back to today at the Cost of Equity.",
      "You project the share price forward using the company's historical share price growth rate, with no discounting - the forecast is already in today's money.",
      "You apply the forward P/E of the comparables to the company's trailing EPS, which removes the need to forecast anything.",
      "You discount projected free cash flows at the WACC, which is what produces the implied future share price.",
    ],
    correct: 0,
  },
  265: {
    options: [
      "Every seller in an M&A premiums analysis must be public, since you need an unaffected share price to measure a premium against, and the set is usually much broader with looser industry and financial screens than a precedent transactions set.",
      "M&A premiums analysis uses only private sellers, since public deals already have the premium reflected in the share price.",
      "The selection criteria are identical - the two analyses differ only in what you compute from the same set of deals.",
      "M&A premiums analysis uses a much narrower set, typically three to five deals, because premiums vary too widely to average across many.",
    ],
    correct: 0,
  },
  266: {
    options: [
      "You value each division against its own comparables and transactions, derive a separate multiple for each, and add the division values together to reach the total for the company.",
      "You value the company as a whole and then allocate that total across divisions in proportion to their EBITDA contribution.",
      "You apply the parent company's blended multiple to each division's EBITDA, which keeps the analysis internally consistent.",
      "You value only the largest division and treat the rest as non-operating assets carried at book value.",
    ],
    correct: 0,
  },
  267: {
    options: [
      "You value them on the tax they'll save in future years and discount those savings back to today. Either assume the NOLs offset taxable income until exhausted, or apply the Section 382 annual limit in an acquisition.",
      "You add the full face value of the NOL balance to Enterprise Value, since it is a tax asset the acquirer receives on closing and can draw against immediately.",
      "You ignore them entirely - NOLs are a tax attribute disclosed in the footnotes and never bear on the valuation of the underlying operating business.",
      "You subtract the NOL balance from Enterprise Value, because accumulated losses represent value the company has already destroyed and will never recover.",
    ],
    correct: 0,
  },
  268: {
    options: [
      "Either the report with the most detailed breakdown, or the one whose numbers sit in the middle of the range. You specifically do not pick reports based on which bank published them, including your own.",
      "You always use your own bank's equity research, since that is the house view your team is expected to represent.",
      "You use the most bullish report available, because it produces the strongest valuation to present to the client.",
      "You average every available report, which removes analyst bias from the projections entirely.",
    ],
    correct: 0,
  },
  269: {
    options: [
      "Search the financial press and press releases, look at equity research covering the buyer around the announcement for analyst estimates of the seller's numbers, and check paid sources like Capital IQ and FactSet.",
      "Estimate the missing figures by applying the buyer's own margins to the seller's revenue, which is the standard approximation.",
      "Drop those transactions from the set - a precedent with incomplete data cannot be used under any circumstances.",
      "Use the seller's book value in place of EBITDA, since the two are close enough for screening purposes.",
    ],
    correct: 0,
  },
  270: {
    options: [
      "Usually TTM for both, then one or two years forward. You're more willing to look further back and further forward for public comparables; for precedent transactions going more than a year forward is odd, because the information is more limited.",
      "Five years back and five years forward for both, to smooth out any cyclicality in the underlying businesses.",
      "Only the most recent fiscal year for both - trailing twelve month figures mix reporting periods and aren't comparable.",
      "Forward-only for both sets, since valuation is about future performance and historical multiples are irrelevant.",
    ],
    correct: 0,
  },
  271: {
    options: [
      "Nothing forbids it, but it can mislead: arithmetic alone tends to give the 40% margin company the lower multiple whether or not it's genuinely worth less. You'd consider screening on margins and removing the outliers.",
      "The 40% margin company is clearly undervalued at 8x, so the comparison correctly identifies a buying opportunity.",
      "Nothing at all - multiples are margin-neutral by construction, which is the whole point of using EV/EBITDA.",
      "The problem is that one uses Enterprise Value and the other Equity Value, which is what creates the 2x gap.",
    ],
    correct: 0,
  },
  272: {
    options: [
      "Same methodologies plus industry multiples like P/MCFE and P/NAV; you forecast commodity prices and reserves to build revenue, and use a Net Asset Value model running reserves to depletion rather than a standard DCF.",
      "Exactly the same as a standard company, since oil and gas producers report under the same accounting rules as every other listed business.",
      "Only a DCF applies here, because volatile commodity prices make every trading comparable and precedent transaction meaningless.",
      "You value it purely on proven reserves at the current spot price, with no discounting for the years it takes to extract and sell them.",
    ],
    correct: 0,
  },
  273: {
    options: [
      "You use Price/FFO and Price/AFFO, which add back depreciation and strip out gains on property sales, alongside Net Asset Value - because real estate is asset-intensive and value depends on the cash flow specific properties generate.",
      "You use EV/EBITDA exclusively, since property companies are simply capital-intensive operating businesses.",
      "You value a REIT purely on its dividend yield, because REITs are legally required to distribute their income.",
      "You use book value of the property portfolio, since real estate is carried on the balance sheet at market value.",
    ],
    correct: 0,
  },

  // ── Discounted Cash Flow - Basic ──────────────────────────────────────
  274: {
    options: [
      "Project the financials out five to ten years, get down to Free Cash Flow each year, discount those back at WACC, add the discounted Terminal Value, and that sum is Enterprise Value - from which you back into implied share price.",
      "Project the financials out five years, sum the Free Cash Flows without discounting, and add the Terminal Value to get Enterprise Value.",
      "Take the company's current Net Income, apply the peer group's median P/E multiple, and discount the result back at the Cost of Equity.",
      "Discount the company's projected Net Income at WACC and add back the book value of its assets to get Enterprise Value.",
    ],
    correct: 0,
  },
  275: {
    options: [
      "Subtract COGS and operating expenses to get EBIT, multiply by (1 - tax rate), add back depreciation and other non-cash charges, then subtract CapEx and the change in Working Capital. Starting from EBIT gives you Unlevered Free Cash Flow.",
      "Subtract COGS and operating expenses to get EBIT, subtract interest and taxes, then add back depreciation and subtract CapEx - which gives Unlevered Free Cash Flow.",
      "Take Revenue, subtract every cash expense including CapEx, and the remainder is Free Cash Flow with no further adjustment needed.",
      "Take EBITDA, subtract taxes at the full statutory rate, and subtract the change in Working Capital - depreciation is already excluded so no add-back applies.",
    ],
    correct: 0,
  },
  276: {
    options: [
      "Take Cash Flow from Operations and subtract CapEx, which gives Levered Free Cash Flow; to reach Unlevered, add back tax-adjusted Interest Expense and subtract tax-adjusted Interest Income.",
      "Take Cash Flow from Operations and subtract CapEx, which gives Unlevered Free Cash Flow directly since operating cash flow is already before financing.",
      "Take EBITDA and subtract CapEx - the two adjustments cancel out, giving the same figure by either route.",
      "Take Net Income and add back every non-cash charge; CapEx is an investing item and is excluded from Free Cash Flow entirely.",
    ],
    correct: 0,
  },
  277: {
    options: [
      "Because that's about as far ahead as you can forecast with any credibility - under five years is too short to be useful, and beyond ten the projections become guesswork for most companies.",
      "Because accounting standards require projections to cover exactly five or ten years for a valuation to be admissible.",
      "Because the Terminal Value calculation is only mathematically valid at a five or ten year horizon.",
      "Because most debt matures within ten years, so beyond that point the capital structure can no longer be modelled.",
    ],
    correct: 0,
  },
  278: {
    options: [
      "Normally WACC, though you'd use Cost of Equity instead if the DCF is built on Levered Free Cash Flow.",
      "Always the Cost of Equity, since shareholders are the residual claimants and bear the real risk.",
      "The company's average interest rate on its outstanding debt, which is its observable cost of capital.",
      "The risk-free rate, since using anything higher would double-count risk already in the projections.",
    ],
    correct: 0,
  },
  279: {
    options: [
      "Cost of Equity × (% equity) + Cost of Debt × (% debt) × (1 - tax rate) + Cost of Preferred × (% preferred), where the percentages are each component's share of the capital structure.",
      "Cost of Equity × (% equity) + Cost of Debt × (% debt) + Cost of Preferred × (% preferred), with no tax adjustment since taxes are already in the cash flows.",
      "The simple average of the Cost of Equity and the Cost of Debt, weighted equally regardless of the actual capital structure.",
      "Cost of Debt × (% debt) × (1 - tax rate) only, because equity has no contractual cost and is therefore free capital.",
    ],
    correct: 0,
  },
  280: {
    options: [
      "Cost of Equity = Risk-Free Rate + Beta × Equity Risk Premium, where the risk-free rate is the yield on a 10- or 20-year Treasury and the equity risk premium is how much stocks are expected to outperform risk-free assets.",
      "Cost of Equity = Risk-Free Rate × Beta + Equity Risk Premium, so a higher Beta scales the entire base return.",
      "Cost of Equity = Dividend per Share ÷ Share Price, which is the return shareholders actually receive each year.",
      "Cost of Equity = Risk-Free Rate + Equity Risk Premium, with Beta applied only when the company carries debt.",
    ],
    correct: 0,
  },
  281: {
    options: [
      "Look up each comparable company's Beta, un-lever each one, take the median of the set, then re-lever it at your company's own capital structure - and use that Levered Beta in the Cost of Equity.",
      "Look up each comparable company's Beta and take the median directly, since Beta already reflects the industry's risk profile.",
      "Regress your own company's historical share price against the index; comparable companies are irrelevant to your Beta.",
      "Un-lever your own company's Beta and use that, since the unlevered figure isolates pure business risk.",
    ],
    correct: 0,
  },
  282: {
    options: [
      "Because published Betas are levered to reflect each company's existing debt. Un-levering strips that out to isolate business risk, and re-levering applies your company's own capital structure - keeping the comparison apples-to-apples.",
      "Because Beta is measured against a different index for each company, and un-levering rebases them all to a common benchmark.",
      "Because Beta drifts toward 1.0 over time, and the un-lever/re-lever step corrects for that statistical bias.",
      "You don't have to - un-levering and re-levering is a formality that leaves the median Beta essentially unchanged.",
    ],
    correct: 0,
  },
  283: {
    options: [
      "A technology company, because technology is seen as a riskier industry - its returns swing more with the market than a manufacturer's do.",
      "A manufacturing company, because heavy fixed assets and high operating leverage make earnings more volatile.",
      "They'd be identical, since Beta measures market risk and both are exposed to the same market.",
      "A manufacturing company, because manufacturers typically carry more debt and Beta rises with leverage.",
    ],
    correct: 0,
  },
  284: {
    options: [
      "You get Equity Value rather than Enterprise Value, because Levered Free Cash Flow is what's left after debt investors have been paid their interest - so only equity holders have a claim on it.",
      "You get Enterprise Value either way; the choice between levered and unlevered only changes the discount rate, not what the output represents.",
      "You get Enterprise Value, but understated by the amount of debt, so you add the debt back at the end to correct it.",
      "You get Equity Value, but only if the company has no preferred stock; otherwise the result is Enterprise Value.",
    ],
    correct: 0,
  },
  285: {
    options: [
      "Cost of Equity rather than WACC, because you're arriving at Equity Value and debt and preferred stock are no longer part of what you're valuing.",
      "WACC, because it is always the correct discount rate for any discounted cash flow analysis.",
      "The after-tax Cost of Debt, since interest has already been deducted from Levered Free Cash Flow.",
      "The risk-free rate, because levered cash flow is contractually senior and therefore close to riskless.",
    ],
    correct: 0,
  },
  286: {
    options: [
      "Either apply an exit multiple to the company's final-year EBITDA, EBIT or Free Cash Flow, or use Gordon Growth: final-year Free Cash Flow × (1 + growth rate) ÷ (discount rate - growth rate).",
      "Either apply an exit multiple to final-year EBITDA, or use Gordon Growth: final-year Free Cash Flow ÷ (growth rate - discount rate).",
      "Sum all the projected Free Cash Flows beyond the forecast period and discount that total back at the risk-free rate.",
      "Take the company's current Enterprise Value and grow it forward at the long-term growth rate to the end of the projection period.",
    ],
    correct: 0,
  },
  287: {
    options: [
      "In banking you almost always use the Multiples Method, because exit multiples come from comparable companies whereas a perpetual growth rate is largely guesswork. Gordon Growth is the fallback when there are no good comparables.",
      "Gordon Growth is the standard, because it's grounded in economic theory rather than in whatever the market happens to be paying today.",
      "You use Gordon Growth whenever the company is growing quickly, and the Multiples Method only for mature businesses.",
      "The two always produce the same Terminal Value when set consistently, so the choice is purely a matter of presentation.",
    ],
    correct: 0,
  },
  288: {
    options: [
      "Something conservative like the country's long-term GDP growth rate or the rate of inflation. In a mature economy anything above about 5% would be aggressive, since most developed economies grow more slowly than that.",
      "The company's own historical revenue growth rate, since that is the best available evidence of how fast it can grow.",
      "The industry's projected growth rate over the next five years, extended into perpetuity.",
      "The discount rate minus one or two percent, which keeps the Gordon Growth denominator from becoming too small.",
    ],
    correct: 0,
  },
  289: {
    options: [
      "Take the median of the comparable companies, or something near it - and always present a range of exit multiples and the resulting Terminal Values rather than committing to one number.",
      "Take the highest multiple in the comparable set, since the Terminal Value should reflect the company at its most mature and valuable.",
      "Use the multiple the company trades at today, since that is the market's own current assessment.",
      "Derive it from the Gordon Growth result, so the two Terminal Value methods agree by construction.",
    ],
    correct: 0,
  },
  290: {
    options: [
      "Neither reliably - both depend heavily on your assumptions. The Multiples Method tends to be more variable, though, because exit multiples span a wider range than plausible long-term growth rates do.",
      "Gordon Growth always gives the higher value, because a perpetual growth assumption compounds indefinitely while a multiple is capped.",
      "The Multiples Method always gives the higher value, because market multiples embed growth expectations that Gordon Growth leaves out.",
      "They always agree, since a given exit multiple implies a specific long-term growth rate and vice versa.",
    ],
    correct: 0,
  },
  291: {
    options: [
      "Today's median multiple may look nothing like the market's multiple five to ten years out, so it may be wrong by the time it's applied. That's why you show a range and run a sensitivity - it's especially unreliable for cyclical industries.",
      "Trading multiples exclude the control premium, so a terminal multiple built from them systematically undervalues the business.",
      "Comparable companies are usually larger than the company being valued, so their multiples are always too high to apply.",
      "There is no flaw - the terminal multiple is applied at the end of the projection period, by which point today's multiples will have converged.",
    ],
    correct: 0,
  },
  292: {
    options: [
      "The standard rule of thumb is that if well over 50% of Enterprise Value comes from the Terminal Value, the DCF leans too heavily on assumptions. In practice almost every DCF trips this test - a Terminal Value under 50% is rare.",
      "If the Terminal Value exceeds 20% of Enterprise Value, which is the accepted ceiling for a defensible DCF.",
      "If the implied exit multiple differs from the current trading multiple by more than one turn of EBITDA.",
      "You can't tell from the output - dependence on assumptions can only be assessed by re-running the model with different inputs.",
    ],
    correct: 0,
  },
  293: {
    options: [
      "Higher for the $500 million company. All else equal, smaller companies are expected to outperform larger ones and are treated as riskier - and adding a size premium would push its Cost of Equity higher still.",
      "Higher for the $5 billion company, because large caps have more analyst coverage and therefore more price volatility.",
      "Identical for both, since Cost of Equity depends on Beta and the risk-free rate, neither of which is a function of size.",
      "Higher for the $5 billion company, because a larger equity base requires a larger absolute return to satisfy investors.",
    ],
    correct: 0,
  },
  294: {
    options: [
      "It depends on whether the capital structures match. If the percentages and rates are the same, WACC is higher for the $500 million company for the same size-risk reason; if the structures differ, the answer could go either way.",
      "Always higher for the $500 million company, since WACC moves with Cost of Equity and small caps always carry the higher Cost of Equity.",
      "Always higher for the $5 billion company, because large companies carry more debt in absolute terms and debt raises WACC.",
      "Identical for both, because WACC is a weighted average and the weights normalise away any difference in company size.",
    ],
    correct: 0,
  },
  295: {
    options: [
      "More debt makes the company riskier, which raises Levered Beta - so all else equal, adding debt raises the Cost of Equity and reducing debt lowers it.",
      "More debt lowers the Cost of Equity, because interest is tax-deductible and the tax shield accrues to shareholders.",
      "There's no relationship - Cost of Equity is set by the risk-free rate and the equity risk premium, neither of which depends on leverage.",
      "More debt raises the Cost of Equity only up to the point where the company becomes distressed, after which it falls again.",
    ],
    correct: 0,
  },
  296: {
    question:
      "Cost of Equity tells us what kind of return an equity investor can expect for investing in a given company - but what about dividends? Shouldn't we factor dividend yield into the formula?",
    options: [
      "No - dividend yield is already inside Beta. Beta describes returns relative to the market as a whole, and those market returns include dividends, so adding a yield term would double-count them.",
      "Yes - you add the dividend yield to the CAPM result, since dividends are a component of shareholder return that Beta does not capture.",
      "Yes, but only for companies that pay a dividend; for non-payers the standard CAPM formula applies unchanged.",
      "No - dividends are a financing decision and have no bearing on the return an equity investor requires.",
    ],
    correct: 0,
  },
  297: {
    options: [
      "Cost of Equity = (Dividends per Share ÷ Share Price) + the growth rate of dividends. It's less common than CAPM but useful for dividend-heavy companies or when you lack reliable Beta data.",
      "Cost of Equity = Net Income ÷ Shareholders' Equity, which is simply return on equity restated as a required return.",
      "Cost of Equity = the company's WACC minus its after-tax Cost of Debt, weighted by the equity share of the capital structure.",
      "There is no alternative - CAPM is the only method for deriving Cost of Equity.",
    ],
    correct: 0,
  },
  298: {
    options: [
      "The one without debt, up to a point. Debt is cheaper than equity because interest is tax-deductible and debt sits senior to equity in a liquidation, so adding some debt lowers WACC - though past a certain level the added risk reverses that.",
      "The one with debt, because adding a second component to the capital structure can only increase the weighted average.",
      "The one without debt, permanently - WACC falls continuously as leverage rises, with no point at which it turns back up.",
      "They'd be identical, since WACC weights each component by its share of capital and the weights always sum to one.",
    ],
    correct: 0,
  },
  299: {
    options: [
      "Usually the 10% change in revenue, because it flows through every projected year and into the Terminal Value as well - though the honest answer starts with \"it depends.\"",
      "The 1% change in the discount rate, since discounting compounds across every year of the projection.",
      "They have identical impact, because a DCF is linear in both revenue and the discount rate.",
      "Neither - both are second-order effects next to the choice of exit multiple, which drives the valuation.",
    ],
    correct: 0,
  },
  300: {
    options: [
      "Now the discount rate usually matters more, since a 1% move in it compounds across every year while a 1% revenue change is a much smaller absolute shift - though it could still go either way.",
      "Revenue still matters more, because revenue changes affect the Terminal Value and discount rate changes do not.",
      "They are exactly equivalent at 1%, which is why sensitivity tables always pair the two on the same scale.",
      "Neither has a material effect at 1% - a DCF is only sensitive to changes above roughly 5%.",
    ],
    correct: 0,
  },
  301: {
    options: [
      "It's awkward, because a private company has no market cap and no Beta. You'd estimate WACC from comparable public companies, or from work already done by auditors or valuation specialists.",
      "You use the company's actual interest rate on its debt as WACC, since that is its only observable cost of capital.",
      "You can't - WACC is undefined for a private company, so private companies must be valued without a DCF.",
      "You use the risk-free rate plus a flat 5% private company premium, which is the standard market convention.",
    ],
    correct: 0,
  },
  302: {
    options: [
      "Build your own projections, revise management's downward to something more conservative, or present a sensitivity table across growth rates and margins showing both management's case and a more conservative one.",
      "Use management's projections as given - they have the best information about their own business, and substituting your own introduces bias.",
      "Apply a flat 20% haircut to every line of management's model, which is the standard adjustment for optimism bias.",
      "Abandon the DCF and rely on comparable companies instead, since a DCF is only valid with projections you fully believe.",
    ],
    correct: 0,
  },
  303: {
    options: [
      "Banks use debt as raw material for their products rather than reinvesting it in operations, interest is central to the business model, and working capital dominates the balance sheet - so unlevered free cash flow doesn't mean much. You'd use a dividend discount model instead.",
      "Because banks are too heavily regulated for their future cash flows to be projected with any confidence.",
      "Because banks report under a different accounting framework, so their financial statements can't be used to build a DCF.",
      "You would - a DCF works perfectly well for a bank, it just needs a higher discount rate to reflect the sector's risk.",
    ],
    correct: 0,
  },
  304: {
    options: [
      "Revenue growth vs. terminal multiple, EBITDA margin vs. terminal multiple, terminal multiple vs. discount rate, and long-term growth rate vs. discount rate - but not terminal multiple against long-term growth rate, since those are two ways of setting the same thing.",
      "Only revenue growth against EBITDA margin, since those are the two operating assumptions that drive the model.",
      "Terminal multiple against long-term growth rate, which is the most informative pairing because both drive Terminal Value.",
      "Any two inputs may be paired freely - there is no combination that produces a meaningless sensitivity table.",
    ],
    correct: 0,
  },
  305: {
    options: [
      "You don't account for it at all in an unlevered DCF. Principal repayment sits in Cash Flow from Financing, and unlevered free cash flow stops at Cash Flow from Operations less CapEx. It would only matter in a levered DCF, through the falling interest expense.",
      "You subtract the annual principal repayment from Free Cash Flow, since it is a genuine cash outflow the company cannot avoid.",
      "You add the repayment back, because reducing debt increases the value available to equity holders.",
      "You reduce the Terminal Value by the remaining debt balance, which is how deleveraging is captured in a DCF.",
    ],
    correct: 0,
  },

  // ── Discounted Cash Flow - Advanced ───────────────────────────────────
  306: {
    options: [
      "Because cash flow arrives evenly through the year rather than all on the last day. Without it you discount at periods 1, 2, 3...; with it you use 0.5, 1.5, 2.5..., which raises the valuation slightly.",
      "Because cash flow arrives entirely in the second half of the year for most businesses, so the periods shift from 1, 2, 3 to 1.5, 2.5, 3.5.",
      "Because it corrects for inflation between the valuation date and the mid-point of each projected year, which discounting alone misses.",
      "Because the first projected year is usually a partial year, so every subsequent period must be shifted by half a year to compensate.",
    ],
    correct: 0,
  },
  307: {
    options: [
      "Halve the stub period, then subtract 0.5 from each of the normal future periods. A Q4 stub whose normal periods run 0.25, 1.25, 2.25, 3.25 becomes 0.125, 0.75, 1.75, 2.75.",
      "Halve every period including the future ones, so normal periods of 0.25, 1.25, 2.25, 3.25 become 0.125, 0.625, 1.125, 1.625.",
      "Leave the stub at 0.25 and subtract 0.5 from the future years only, giving periods of 0.25, 0.75, 1.75, 2.75.",
      "Add 0.5 to the stub and leave the future periods unchanged, since the stub is the only partial period anywhere in the model.",
    ],
    correct: 0,
  },
  308: {
    options: [
      "It differs by method. With the Multiples Method you add 0.5 back to the final-year discount period, because you're assuming a sale at year end. With Gordon Growth you use the final-year period as-is, since cash flows keep arriving through the year in perpetuity.",
      "You add 0.5 back under both methods, since the Terminal Value is always realised at the end of the final year.",
      "You use the final-year period unchanged under both methods - the mid-year convention applies only to the projected cash flows, never to the Terminal Value.",
      "With the Multiples Method you use the period as-is and with Gordon Growth you add 0.5, because a perpetuity is valued from the year's midpoint.",
    ],
    correct: 0,
  },
  309: {
    options: [
      "From Enterprise Value, add cash and subtract debt, preferred stock, minority interest and other debt-like items to get Equity Value; then divide by a diluted share count that is circular, because the options and warrants that dilute depend on the share price you're solving for.",
      "From Enterprise Value, subtract cash and add debt to reach Equity Value, then divide by the basic shares outstanding.",
      "Divide Enterprise Value directly by the fully diluted share count - the debt and cash adjustments are already inside the discounted cash flows.",
      "From Enterprise Value, add cash and subtract debt, then divide by basic shares outstanding; options are excluded because they haven't been exercised yet.",
    ],
    correct: 0,
  },
  310: {
    options: [
      "Same mechanics as a DCF but on dividends: project earnings down to EPS, apply a payout ratio to get dividends per share, discount those at the Cost of Equity, add a terminal value based on a P/E multiple, and the result is Equity Value per share.",
      "Same mechanics as a DCF but on dividends, discounted at WACC rather than the Cost of Equity, producing Enterprise Value.",
      "Project total dividends paid, discount them at the risk-free rate since dividends are contractually committed, and add the book value of equity.",
      "Project free cash flow as normal, then multiply the result by the dividend payout ratio to isolate the shareholders' portion.",
    ],
    correct: 0,
  },
  311: {
    options: [
      "It depends on moneyness. In-the-money convertible debt isn't counted as debt - it's treated as dilution, raising Equity Value. Out-of-the-money, you do count it as debt and use the convertible's interest rate for Cost of Debt.",
      "Yes, always count it as debt - it is a debt instrument until conversion actually happens, regardless of the share price.",
      "No, never count it as debt - convertibles are equity-linked, so they always belong in the equity portion of the capital structure.",
      "You split it in proportion to the conversion probability, weighting part as debt and part as equity in the Beta calculation.",
    ],
    correct: 0,
  },
  312: {
    options: [
      "Add $100 of CapEx in year 4, which cuts that year's Free Cash Flow by $100. Enterprise Value falls by the present value of that reduction - $100 ÷ (1 + discount rate)^4 - so the new Enterprise Value is $200 minus that amount.",
      "Subtract the full $100 from Enterprise Value, giving $100, since the cash leaves the business regardless of when it happens.",
      "Add $100 of CapEx in year 4 and subtract $100 from the Terminal Value as well, to reflect the asset being carried forward.",
      "Make no change - a factory purchase is an investing activity, and Enterprise Value is unaffected by how the company deploys its cash.",
    ],
    correct: 0,
  },

  // ── Merger Model - Basic ──────────────────────────────────────────────
  313: {
    options: [
      "Make assumptions about the price and the cash/stock/debt mix, project both companies' financials, combine the income statements with the acquisition effects, and see whether the buyer's EPS rises (accretive) or falls (dilutive).",
      "Value both companies with a DCF, add the two Enterprise Values together, and the combined figure is the merged company's value.",
      "Project the target's cash flows only, discount them at the buyer's WACC, and compare the result against the purchase price.",
      "Combine both balance sheets, calculate the new debt-to-equity ratio, and use that to determine whether the deal can be financed.",
    ],
    correct: 0,
  },
  314: {
    options: [
      "It's mostly semantic - every deal has a buyer and a seller. \"Merger\" tends to describe two companies of similar size; \"acquisition\" implies the buyer is significantly larger.",
      "In a merger both companies cease to exist and a new entity is formed; in an acquisition the target survives as an independent legal entity.",
      "A merger is paid for in stock and an acquisition in cash - the consideration is what distinguishes the two.",
      "A merger requires shareholder approval from both sides while an acquisition requires approval only from the target's shareholders.",
    ],
    correct: 0,
  },
  315: {
    options: [
      "To take market share by buying a competitor, to grow faster than it could organically, because it believes the target is undervalued, or to acquire the target's customers, technology or geographic reach.",
      "Purely to reduce its tax bill, since acquisitions generate goodwill amortisation that shelters income.",
      "Mainly to increase reported EPS, which is the only motive that reliably survives scrutiny in practice.",
      "To diversify into unrelated industries, which is the strategy that consistently creates the most shareholder value.",
    ],
    correct: 0,
  },
  316: {
    options: [
      "When the Net Income the seller adds isn't enough to cover the buyer's foregone interest on cash, the extra interest on new debt, and the dilution from newly issued shares - plus acquisition effects such as intangibles amortisation.",
      "Whenever the buyer pays a premium over the target's share price, since any premium destroys value by definition.",
      "Whenever the target is unprofitable - a profitable target always makes a deal accretive.",
      "Whenever the deal is paid for in cash, because cash leaving the balance sheet always reduces the buyer's earnings.",
    ],
    correct: 0,
  },
  317: {
    options: [
      "For a cash-and-debt deal, add up the new interest expense plus the interest forgone on cash and compare that against the seller's pre-tax income. For an all-stock deal, compare the two companies' P/E multiples instead.",
      "Compare the two companies' EBITDA margins - the deal is accretive whenever the target's margin is higher.",
      "Compare the purchase price against the target's book value; anything below book value is accretive.",
      "There is no shortcut - accretion or dilution can only ever be determined by building the full model.",
    ],
    correct: 0,
  },
  318: {
    options: [
      "You can't tell without knowing it's an all-stock deal. In an all-cash or all-debt deal the two P/E multiples are irrelevant, because no shares are being issued.",
      "Accretive - a buyer with a higher P/E acquiring a lower-P/E target is accretive under every financing structure.",
      "Dilutive - paying for cheap earnings with expensive stock always reduces the buyer's EPS.",
      "Neither - the P/E comparison determines only the premium, never whether the deal moves EPS.",
    ],
    correct: 0,
  },
  319: {
    options: [
      "In an all-stock deal, a buyer with the higher P/E gets accretion and a buyer with the lower P/E gets dilution. Intuitively: if you're paying more for earnings than the market pays for your own, you're giving up value.",
      "In an all-stock deal, a buyer with the lower P/E gets accretion, because it acquires earnings more cheaply than the market values them.",
      "The rule holds for all-cash deals rather than all-stock deals, since cash consideration is what makes the multiples comparable.",
      "The comparison is between EV/EBITDA multiples rather than P/E, since EPS accretion is driven at the enterprise level.",
    ],
    correct: 0,
  },
  320: {
    options: [
      "Foregone interest on the cash spent, additional interest on any new debt, new shares outstanding if stock is issued, the seller's added net income, and acquisition effects such as amortisation of newly created intangibles.",
      "Only the seller's added net income and the new shares issued - interest effects are financing items and stay out of the EPS calculation.",
      "Only the change in goodwill, since that is the single balance sheet item an acquisition creates.",
      "The buyer's revenue and expenses simply double, since two companies of similar size are being combined.",
    ],
    correct: 0,
  },
  321: {
    options: [
      "It may want to keep the cash for other uses or as a buffer if trading turns down, and if its own stock is near an all-time high, issuing shares can be the cheaper currency at that moment.",
      "Because paying entirely in cash is prohibited above a certain deal size under securities regulations.",
      "Because cash deals are always dilutive, whereas stock deals are always accretive.",
      "Because using cash triggers an immediate tax charge for the buyer on the amount spent.",
    ],
    correct: 0,
  },
  322: {
    options: [
      "Because a strategic buyer can realise revenue and cost synergies by combining the target with its existing business, and those synergies raise what the target is worth to it. A PE firm can't, unless it already owns a complementary company.",
      "Because private equity firms are legally capped on the multiple they may pay for any acquisition.",
      "Because strategic acquirers have a lower cost of capital, and every deal is priced off the buyer's WACC.",
      "Because private equity firms always pay in cash while strategics can pay in stock, which is inherently more valuable.",
    ],
    correct: 0,
  },
  323: {
    options: [
      "They capture what the buyer paid above the fair market value of the seller's identifiable net assets - roughly the equity purchase price less the seller's book value - covering things like brand, customer relationships and intellectual property.",
      "They represent the cash the buyer spent on the acquisition, capitalised on the balance sheet rather than expensed.",
      "They are created only when the buyer pays in stock, since stock consideration has no book value to offset.",
      "They represent the target's accumulated retained earnings, transferred onto the buyer's balance sheet at closing.",
    ],
    correct: 0,
  },
  324: {
    options: [
      "Goodwill generally sits unchanged for years and isn't amortised - it moves only on impairment or another acquisition. Other Intangible Assets are amortised over a set life, and that amortisation reduces pre-tax income each period.",
      "Goodwill is amortised over a set life while Other Intangibles sit unchanged until impaired - the opposite of the usual assumption.",
      "Both are amortised on the same schedule; the distinction exists only for disclosure purposes.",
      "Goodwill relates to tangible assets acquired at a premium, while Other Intangibles cover patents and trademarks only.",
    ],
    correct: 0,
  },
  325: {
    options: [
      "Yes - a Purchased In-Process R&D write-off, covering acquired R&D projects not yet complete, and a Deferred Revenue write-off, reducing the target's deferred revenue balance to its fair value at closing.",
      "No - Goodwill and Other Intangibles between them capture every intangible effect of an acquisition.",
      "Yes - the target's accumulated depreciation, which is written off in full and re-established at the acquisition date.",
      "Yes - the buyer's own brand value, which must be revalued upward to reflect the enlarged business.",
    ],
    correct: 0,
  },
  326: {
    options: [
      "Cases where the combination is worth more than the two companies separately. Revenue synergies come from cross-selling or reaching new customers; cost synergies come from consolidating buildings, systems and redundant headcount.",
      "Synergies are the premium the buyer pays over the target's share price, which is why they're also called the control premium.",
      "Synergies are the tax savings created by the target's net operating losses transferring to the buyer.",
      "Synergies are the reduction in the combined company's cost of capital that follows from being larger and more diversified.",
    ],
    correct: 0,
  },
  327: {
    options: [
      "Revenue synergies are added to combined revenue at an assumed margin, so they flow down through the income statement. Cost synergies are subtracted from the combined cost base, usually from COGS or operating expenses.",
      "Both are added directly to combined net income, since that is where their effect ultimately lands.",
      "Both are added to the purchase price, because the buyer is effectively paying for the value they create.",
      "Revenue synergies reduce operating expenses and cost synergies increase revenue - the labels refer to where the benefit shows up, not its source.",
    ],
    correct: 0,
  },
  328: {
    options: [
      "Cost synergies. Nobody in M&A takes revenue synergies very seriously because they're so hard to predict, whereas consolidating buildings and cutting duplicated roles is far more concrete.",
      "Revenue synergies, because growth creates more lasting value than one-off cost cuts.",
      "They carry equal weight, which is why models always assume the same realisation rate for both.",
      "Neither is taken seriously - synergies are excluded from merger models entirely because they can't be verified.",
    ],
    correct: 0,
  },
  329: {
    options: [
      "Cash, if resources were unlimited. Cash is the cheapest currency because the interest forgone on it is usually lower than the interest payable on new debt, and both are cheaper than the dilution from issuing stock.",
      "Stock, because issuing shares costs nothing in cash and therefore has no effect on the buyer's earnings.",
      "Debt, because interest is tax-deductible, which makes it the cheapest form of consideration in every case.",
      "It makes no difference - the three are economically equivalent once the deal closes.",
    ],
    correct: 0,
  },
  330: {
    options: [
      "Look at comparable companies and precedent transactions: take the median Debt/EBITDA ratio from that set and apply it to the combined company's LTM EBITDA.",
      "As much as the lenders will provide, since the constraint is availability of credit rather than any analytical limit.",
      "Up to the target's total asset value, since assets serve as collateral for the acquisition debt.",
      "A fixed maximum of 50% of the purchase price, which is the standard limit in acquisition financing.",
    ],
    correct: 0,
  },
  331: {
    options: [
      "With the same valuation methodologies. For a public target you also watch the premium over the current share price - typically 15-30% - since it has to be enough to win shareholder approval.",
      "By taking the target's book value and adding a standard 20% control premium.",
      "By whatever the buyer can afford given its debt capacity, since price is set by financing rather than by valuation.",
      "By the target's last funding round or last traded price exactly, since paying any premium destroys value for the buyer.",
    ],
    correct: 0,
  },
  332: {
    options: [
      "A very large Goodwill and Other Intangibles balance gets created, and if the acquisition underperforms the buyer often has to take a substantial goodwill impairment charge later.",
      "The buyer must restate the purchase price downward in the following period to match fair value.",
      "Nothing shows up in the accounts - overpayment is only ever visible in the share price reaction.",
      "The excess is recorded as a loss on the income statement immediately at closing.",
    ],
    correct: 0,
  },
  333: {
    options: [
      "The buyer's share price falls by the per-share equivalent of the $50 million of lost value - not necessarily by half - and depending on the structure the seller effectively receives only about half of what it expected.",
      "The buyer's share price halves, since the acquired asset is now worth half what was paid for it.",
      "Nothing changes for the buyer - the deal price was fixed at signing, so the market's later view is irrelevant.",
      "The seller must return $50 million in cash to the buyer under standard purchase agreement terms.",
    ],
    correct: 0,
  },
  334: {
    options: [
      "Because integrating another company and actually realising the synergies is far harder in practice than on paper, and many deals are done for the wrong reasons - empire-building or pressure to grow - in the first place.",
      "Because the accounting treatment of goodwill mechanically depresses the combined company's earnings for years afterwards.",
      "Because regulators block most transactions before they can deliver their intended benefits.",
      "Because buyers almost always underpay, and underpaying leaves the target's management unmotivated after closing.",
    ],
    correct: 0,
  },
  335: {
    options: [
      "It's a sanity check for testing assumptions, not a decision-maker. It might tell you a deal could be modestly accretive and is therefore worth exploring further - no company decides to transact on a model's output.",
      "It sets the final purchase price, which is then presented to the target's board as a binding offer.",
      "It has no role in negotiation - merger models are built only after signing, for internal reporting purposes.",
      "It determines the financing mix, which the model optimises automatically to maximise accretion.",
    ],
    correct: 0,
  },
  336: {
    options: [
      "Purchase price, the cash/stock/debt mix, and revenue and expense synergies most commonly. Operating variables such as revenue growth or EBITDA margin come up too, though those are more often built into the model's scenarios.",
      "Only the purchase price, since every other variable is fixed by the deal structure once terms are agreed.",
      "The discount rate and the terminal multiple, which are the two inputs that drive any valuation output.",
      "The target's historical growth rates, since sensitivities are run on what has already happened rather than on deal terms.",
    ],
    correct: 0,
  },

  // ── Merger Model - Advanced ───────────────────────────────────────────
  337: {
    options: [
      "Under purchase accounting the seller's shareholders' equity is wiped out and the premium over it becomes Goodwill on the combined balance sheet. Under pooling accounting you simply add the two equity balances together and no Goodwill arises.",
      "Under pooling accounting the seller's equity is wiped out and Goodwill is created; under purchase accounting the two equity balances are simply combined.",
      "The two produce identical balance sheets and differ only in how the transaction is disclosed in the footnotes.",
      "Purchase accounting applies to cash deals and pooling accounting to stock deals, with the consideration determining which is used.",
    ],
    correct: 0,
  },
  338: {
    options: [
      "Take the target's revenue driver - say Yahoo earns $0.10 revenue per search - assume the buyer lifts it to its own higher rate, then multiply the improvement by the target's search volume to get the incremental revenue.",
      "Take the combined revenue of both companies and apply an assumed synergy percentage, typically 5-10%, to arrive at the uplift.",
      "Add the two companies' revenues together and apply the buyer's operating margin, since the margin difference is the synergy.",
      "Take the premium paid over the target's market value and treat that as the revenue synergy the buyer must generate to justify it.",
    ],
    correct: 0,
  },
  339: {
    options: [
      "Work out the headcount overlap: if the buyer has 5,000 SG&A staff and the target 1,000, and only 200 of the target's are needed post-deal, the other 800 are eliminated - multiply by average salary and benefits to get the saving.",
      "Take the combined SG&A of both companies and reduce it by a standard 20%, which is the accepted benchmark for expense synergies.",
      "Subtract the target's total SG&A from the combined figure, since the buyer's existing team absorbs all of the target's functions.",
      "Take the difference between the two companies' EBITDA margins and apply it to combined revenue.",
    ],
    correct: 0,
  },
  340: {
    options: [
      "Apply Section 382: allowable NOLs each year = equity purchase price × the highest adjusted long-term rate of the past three months. A $1 billion price at a 5% rate allows $50 million a year, so $250 million of NOLs would be used over five years.",
      "The buyer inherits the full NOL balance and may use all of it in the first year to offset combined taxable income.",
      "Apply Section 382: allowable NOLs each year = the seller's NOL balance × the long-term rate, so $250 million at 5% gives $12.5 million a year.",
      "NOLs are extinguished on a change of control, so they never carry over to the buyer in any structure.",
    ],
    correct: 0,
  },
  341: {
    options: [
      "They arise when assets are written up or down in a transaction: a write-up creates a Deferred Tax Liability, and a write-down creates a Deferred Tax Asset, because the book basis moves while the tax basis does not.",
      "They arise when assets are written up or down: a write-up creates a Deferred Tax Asset, and a write-down creates a Deferred Tax Liability.",
      "They arise from the difference between the purchase price and the target's market capitalisation at announcement.",
      "They arise only when the buyer and the seller are taxed in different jurisdictions and the rates have to be reconciled.",
    ],
    correct: 0,
  },
  342: {
    options: [
      "They feed into the Goodwill calculation on the pro-forma balance sheet. Deferred Tax Asset = asset write-down × tax rate; Deferred Tax Liability = asset write-up × tax rate. A $100 million write-up at 40% creates a $40 million DTL.",
      "They feed into the Goodwill calculation, with Deferred Tax Asset = asset write-up × tax rate and Deferred Tax Liability = asset write-down × tax rate.",
      "They are recorded on the income statement at closing rather than the balance sheet, so they don't affect Goodwill at all.",
      "They offset each other exactly in every transaction, so the net effect on the balance sheet adjustment is always zero.",
    ],
    correct: 0,
  },
  343: {
    options: [
      "No - in an asset purchase the book basis of the assets always matches the tax basis. They arise in a stock purchase, where book values are written up or down but tax values aren't.",
      "Yes - deferred taxes arise in every transaction structure, since the purchase price always differs from the assets' carrying value.",
      "No - in an asset purchase the tax basis is unchanged while the book basis moves, which is precisely why no timing difference arises.",
      "Yes, but only Deferred Tax Assets - an asset purchase can never create a Deferred Tax Liability.",
    ],
    correct: 0,
  },
  344: {
    options: [
      "Build a book vs. cash tax schedule: compute what the company owes on book pre-tax income, then what it actually pays in cash after NOLs and the newly created depreciation and amortisation - the difference flows through the DTL each year.",
      "Amortise the opening DTL balance straight-line over the life of the acquired intangibles, with no separate tax schedule required.",
      "Hold the DTL flat at its closing-date balance, since deferred taxes are a one-time purchase accounting entry.",
      "Release the entire DTL into income in the first projected year, since the write-up is recognised immediately for tax purposes.",
    ],
    correct: 0,
  },
  345: {
    options: [
      "Goodwill = equity purchase price - seller book value + seller's existing Goodwill - asset write-ups - seller's existing DTL + write-down of seller's existing DTA + newly created DTL.",
      "Goodwill = equity purchase price - seller book value + asset write-ups, since write-ups add to the premium being paid.",
      "Goodwill = equity purchase price - seller book value, with deferred taxes and existing goodwill having no bearing on the calculation.",
      "Goodwill = enterprise purchase price - seller total assets + seller total liabilities - asset write-ups + newly created DTA.",
    ],
    correct: 0,
  },
  346: {
    options: [
      "Because Deferred Tax Assets include NOLs, and you may use those NOLs post-transaction to shelter the combined company's taxable income. In an asset or 338(h)(10) purchase you assume the whole NOL balance goes to zero.",
      "Because the seller's DTA is an intangible asset and all intangibles are written down to zero at closing.",
      "Because a DTA represents taxes already paid, and the buyer cannot claim a refund for taxes it did not pay itself.",
      "You don't write it down - the seller's existing DTA transfers to the buyer at its full carrying value in every structure.",
    ],
    correct: 0,
  },
  347: {
    options: [
      "It blends the two structures: legally a stock purchase, but treated as an asset purchase for tax. The seller still faces double taxation, while the buyer gets a stepped-up asset basis and the depreciation and amortisation deductions that come with it.",
      "It converts an asset purchase into a stock purchase for tax purposes, letting the seller avoid double taxation entirely.",
      "It allows the buyer to acquire only selected assets while still receiving the target's NOLs in full.",
      "It is a filing that exempts the transaction from antitrust review when the deal falls below a size threshold.",
    ],
    correct: 0,
  },
  348: {
    options: [
      "It fixes the number of buyer shares each seller share converts into - say 1.5 buyer shares per seller share - rather than fixing a dollar value. That shifts the risk of the buyer's share price moving between signing and closing.",
      "It is the ratio of the buyer's P/E to the seller's P/E, used to determine whether an all-stock deal will be accretive.",
      "It is the proportion of the purchase price paid in stock rather than cash, expressed as a percentage of the total.",
      "It converts the seller's share price into the buyer's currency in a cross-border deal, fixed at the closing-date exchange rate.",
    ],
    correct: 0,
  },
  349: {
    options: [
      "Purchase price and form of consideration, transaction structure (stock, asset or 338(h)(10)), treatment of options, reps and warranties, and the no-shop and go-shop provisions governing whether the seller may seek other bidders.",
      "Only the purchase price and the closing date - everything else is covered by statute rather than negotiated in the agreement.",
      "The synergy targets and the integration plan, since those determine whether the deal delivers its intended value.",
      "The buyer's financing commitments and its board's fairness opinion, which together form the substance of the agreement.",
    ],
    correct: 0,
  },
  350: {
    options: [
      "A deferred payment contingent on the target hitting agreed financial or operational goals after closing. It's common with private companies and start-ups, and lets a buyer bridge a valuation gap without paying the full price upfront.",
      "A payment the seller makes back to the buyer if the target misses its post-closing targets.",
      "A clause allowing the buyer to walk away without penalty if the target's earnings fall before closing.",
      "A retention bonus paid to the target's management to keep them in place through the integration period.",
    ],
    correct: 0,
  },
  351: {
    options: [
      "The mechanics are the same, but the structure is more likely to be an asset purchase or 338(h)(10) election, and a private seller has no EPS - so you only project down to Net Income on its income statement.",
      "It can't be done - accretion/dilution requires both companies to have a share price and an EPS.",
      "You use the private seller's book value per share in place of EPS, which makes the comparison directly equivalent.",
      "The mechanics are the same, but you must assume an all-cash structure, since a private seller cannot receive listed stock.",
    ],
    correct: 0,
  },
  352: {
    options: [
      "Set EPS accretion/dilution to exactly $0.00 and back-solve for the synergies required to get there. It tells you whether the deal works mathematically - a large required number means the deal is a stretch.",
      "Add the revenue and cost synergies together and divide by the purchase price, giving the synergy yield on the deal.",
      "Calculate the synergies needed to cover the premium paid over the target's undisturbed share price.",
      "Set the combined company's EPS equal to the target's standalone EPS and solve for the implied purchase price.",
    ],
    correct: 0,
  },
  353: {
    options: [
      "Combine the income statements as usual, then combine the balance sheets excluding the seller's shareholders' equity, make the pro-forma adjustments for goodwill, write-ups and new debt, and project the combined cash flow statement forward from there.",
      "Combine all three statements line by line including the seller's shareholders' equity, then let the cash balance plug any difference.",
      "You can't - a merger model is an income statement exercise, and the balance sheet and cash flow statement can't be combined pro-forma.",
      "Combine the balance sheets first and derive the combined income statement from the change in retained earnings between periods.",
    ],
    correct: 0,
  },
  354: {
    options: [
      "It depends on the Purchase Agreement - the buyer may assume them, or let the seller cash them out where the per-share price exceeds the exercise price. If assumed, they convert into buyer shares at the exchange ratio and add to the diluted count.",
      "They are always cancelled at closing without payment, since the target's securities cease to exist after the acquisition.",
      "They are always cashed out at full face value regardless of exercise price, and the cost is added to the purchase price.",
      "They are ignored in a merger model, because dilutive securities affect only the target's standalone valuation.",
    ],
    correct: 0,
  },
  355: {
    options: [
      "Stock purchase, asset purchase, and a 338(h)(10) election. A stock purchase transfers all assets and liabilities including off-balance-sheet items and taxes the seller at capital gains rates; an asset purchase lets the buyer select what it takes and step up the basis.",
      "Cash purchase, stock purchase, and debt-financed purchase - the three structures are defined by the form of consideration.",
      "Merger, tender offer, and hostile takeover, which are the three routes to acquiring control of a company.",
      "Stock purchase, asset purchase, and reverse merger, the last being the standard route for taking a private company public.",
    ],
    correct: 0,
  },
  356: {
    options: [
      "The seller almost always prefers a stock purchase - it avoids double taxation and transfers the liabilities away. The buyer almost always prefers an asset purchase, to pick what it takes on and to get the tax deduction from the stepped-up basis.",
      "Both prefer a stock purchase, which is why it is by far the most common structure in practice.",
      "The seller prefers an asset purchase to retain its corporate shell, while the buyer prefers a stock purchase for the clean transfer.",
      "Neither has a preference - the structure is determined by regulation rather than negotiated between the parties.",
    ],
    correct: 0,
  },
  357: {
    options: [
      "It compares how much revenue, EBITDA, pre-tax income and cash each side brings to the combination, to gauge what the ownership split of the combined company arguably should be.",
      "It compares the synergies each side is expected to contribute, to determine how the benefits should be shared.",
      "It measures how much each company contributed to the sector's growth over the past five years.",
      "It allocates the purchase price across the target's divisions in proportion to the earnings each generates.",
    ],
    correct: 0,
  },
  358: {
    options: [
      "Under current rules you expense transaction and miscellaneous fees upfront, but capitalise financing fees and amortise them over the life of the debt. Previously all of them were capitalised and amortised.",
      "You capitalise all of them and amortise over the life of the debt, which is the treatment current standards require.",
      "You expense all of them upfront, since none of these costs creates a future economic benefit.",
      "You add all of them to the purchase price and let them flow into Goodwill on the pro-forma balance sheet.",
    ],
    correct: 0,
  },

  // ── LBO Model - Basic ─────────────────────────────────────────────────
  359: {
    options: [
      "Set the purchase price, debt/equity mix and interest rates; build the sources and uses and the new balance sheet; project operations and the debt paydown; then assume an exit multiple and compute the IRR to the private equity firm.",
      "Project the target's free cash flows, discount them at WACC, and compare the resulting Enterprise Value against the purchase price.",
      "Combine the buyer's and the target's income statements and check whether the acquirer's EPS rises or falls.",
      "Value the company on comparable LBO transactions, then apply the median leverage ratio to determine the equity cheque required.",
    ],
    correct: 0,
  },
  360: {
    options: [
      "To boost the return on your own money. Borrowed money isn't yours - earning a given profit on a $2 billion equity cheque plus $3 billion of debt produces a far higher return than funding the whole $5 billion yourself.",
      "Because debt is permanent capital that never has to be repaid, unlike equity which investors eventually redeem.",
      "Because interest payments reduce the purchase price the seller receives, lowering the effective cost of the acquisition.",
      "Because lenders take on the operating risk of the business, leaving the equity holders exposed only to the interest cost.",
    ],
    correct: 0,
  },
  361: {
    options: [
      "Purchase and exit multiples have the largest impact on returns, followed by the amount of leverage used, and then operational factors like revenue growth and EBITDA margins.",
      "Revenue growth and EBITDA margins dominate, since operational improvement is what private equity firms actually control.",
      "The interest rate on the debt, since interest expense is the single largest cash outflow in the holding period.",
      "The length of the holding period, because IRR is calculated over time and nothing else affects it as directly.",
    ],
    correct: 0,
  },
  362: {
    options: [
      "The same way as anywhere else - from what comparable companies trade at and what multiples similar LBO transactions were done at - and you present a range through sensitivity tables rather than a single pair.",
      "You set the exit multiple equal to the purchase multiple, since assuming multiple expansion is considered too aggressive to defend.",
      "You derive both from the target IRR by back-solving, which guarantees the deal clears the firm's return hurdle.",
      "You use the highest multiple in the comparable set for the purchase and the lowest for the exit, to stress-test the deal.",
    ],
    correct: 0,
  },
  363: {
    options: [
      "Stable, predictable cash flows in a low-risk business, limited ongoing CapEx needs, room to cut costs and lift margins, and ideally a strong management team already in place.",
      "High growth and heavy reinvestment needs, since rapid expansion is what generates the return over the holding period.",
      "A large existing debt balance, which demonstrates the business can already support leverage.",
      "Volatile cash flows, because the resulting low purchase price leaves the most room for multiple expansion at exit.",
    ],
    correct: 0,
  },
  364: {
    options: [
      "Set a target IRR - say 25% - and back-solve for the purchase price that delivers it. It's called a floor valuation because a private equity firm generally pays less than a strategic buyer, who can also capture synergies.",
      "Take the exit value and discount it at WACC; the result is the floor because it ignores any operational improvement.",
      "It's called a floor valuation because leverage guarantees a minimum return regardless of how the business performs.",
      "You take the median multiple of comparable LBOs, which sets a floor because past deals bound what buyers will pay.",
    ],
    correct: 0,
  },
  365: {
    options: [
      "Taking out a mortgage to buy a house: the down payment is the investor equity, the mortgage is the debt, the interest payments are the debt interest, and selling the house later is the exit.",
      "Buying shares on margin, where the broker's loan is the debt and the shares are the acquired company.",
      "Leasing a car, where the monthly payments are the interest and the residual value at the end is the exit multiple.",
      "Starting a business with a partner, where your partner's contribution plays the role of the debt in the structure.",
    ],
    correct: 0,
  },
  366: {
    options: [
      "On the liabilities and equity side, the new debt is added and the existing shareholders' equity is wiped out and replaced by the private equity firm's contribution. On the assets side, cash is adjusted and Goodwill is created to balance.",
      "Both sides are simply combined with the buyer's, the same way a merger model consolidates two balance sheets.",
      "Only the assets side changes - the debt sits off balance sheet at the acquisition vehicle rather than at the company.",
      "Shareholders' equity is left in place and the new debt is added alongside it, which is what increases total capitalisation.",
    ],
    correct: 0,
  },
  367: {
    options: [
      "They represent the premium paid over the fair market value of the company, and they act as the plug that makes the change on the assets side balance the change on the liabilities and equity side.",
      "They represent the interest that will be paid over the life of the debt, capitalised at the acquisition date.",
      "They represent the private equity firm's equity contribution, recorded as an intangible until the exit.",
      "They arise only if the target already carried goodwill, which then transfers across at its existing carrying value.",
    ],
    correct: 0,
  },
  368: {
    options: [
      "Because the situations differ: a PE firm plans to exit in a few years, so it cares less about the relative expense of cash versus debt and more about using leverage to lift its return on a smaller equity cheque.",
      "Because private equity firms are prohibited from using their own funds for more than half of any acquisition.",
      "Because debt is genuinely cheaper than cash for a financial buyer, whereas it is more expensive for a strategic one.",
      "Because using debt lets the firm avoid consolidating the portfolio company into its own financial statements.",
    ],
    correct: 0,
  },
  369: {
    options: [
      "There are shortcuts - a full balance sheet is sometimes skipped when bankers are pressed for time. You do need an income statement, enough of a cash flow statement to drive the debt paydown, and the debt schedule itself.",
      "No shortcuts exist - all three statements plus the debt schedule are required for the model to balance.",
      "You only ever need the income statement, since IRR depends on EBITDA at entry and at exit and nothing else.",
      "You only need the cash flow statement, because debt repayment capacity is the sole driver of returns in an LBO.",
    ],
    correct: 0,
  },
  370: {
    options: [
      "Look at comparable LBOs of similarly sized companies in the same industry and see what terms and how many tranches those deals used.",
      "Take the target's EBITDA and multiply by six, which is the standard leverage ceiling across all industries.",
      "Raise as much as the target IRR requires, since more leverage always improves returns and lenders price the risk.",
      "Match the target's existing debt balance, since that is demonstrably the amount the business can service.",
    ],
    correct: 0,
  },
  371: {
    options: [
      "It depends entirely on the company, the industry and what comparable LBOs achieved - you'd look at debt comps showing the types, tranches and terms similarly sized companies in that sector obtained.",
      "Leverage of 6x EBITDA and interest coverage of 2x are the universal thresholds lenders apply.",
      "Any ratio is acceptable as long as the company generates positive free cash flow after interest.",
      "Leverage should never exceed the industry's median EV/EBITDA multiple, which caps debt at the enterprise value.",
    ],
    correct: 0,
  },
  372: {
    options: [
      "High-yield debt carries higher interest, is usually fixed-rate with no amortisation and carries prepayment penalties, and has incurrence covenants; bank debt is cheaper, amortises, is often floating-rate and carries stricter maintenance covenants.",
      "Bank debt carries the higher interest rate and stricter covenants, while high-yield debt is cheaper and more flexible.",
      "They are economically identical and differ only in whether the lender is a bank or an institutional investor.",
      "High-yield debt is secured against the company's assets while bank debt is unsecured, which is what drives the rate difference.",
    ],
    correct: 0,
  },
  373: {
    options: [
      "When the firm wants the cheaper option because it's worried about covering interest, or when it's planning significant expansion or CapEx and doesn't want the restrictions high-yield terms would impose.",
      "When the firm intends to refinance quickly, since bank debt can be repaid without penalty at any time.",
      "When the company has volatile cash flows, because bank debt's maintenance covenants are more forgiving of a bad quarter.",
      "When interest rates are expected to rise, since bank debt is fixed-rate and locks in the current cost.",
    ],
    correct: 0,
  },
  374: {
    options: [
      "When the firm plans to refinance later, or doesn't think returns are especially sensitive to the interest cost, and has no major expansion plans that the tighter bank covenants would get in the way of.",
      "When the firm wants the lowest possible interest cost over the holding period.",
      "When the company's cash flows are highly predictable, since high-yield lenders require certainty of repayment.",
      "When the deal is small, since high-yield issuance is only economic below a certain transaction size.",
    ],
    correct: 0,
  },
  375: {
    options: [
      "Because mature, cash-flow-stable companies exist in almost every industry including technology - and some firms specialise, for instance in consolidating a fragmented sector or turning around distressed businesses.",
      "Because technology companies always trade at low multiples, which guarantees multiple expansion at exit.",
      "Because riskier industries carry higher discount rates, and a higher discount rate mechanically raises IRR.",
      "They wouldn't - private equity firms avoid technology entirely because the cash flows can't support leverage.",
    ],
    correct: 0,
  },
  376: {
    options: [
      "Pay a lower purchase price, achieve a higher exit multiple, use more leverage, grow the business faster organically or by acquisition, or lift margins by cutting costs.",
      "Extend the holding period, since IRR compounds over time and a longer hold always produces a higher return.",
      "Pay a higher purchase price to secure a higher-quality asset, which will command a premium at exit.",
      "Reduce leverage, which lowers interest expense and leaves more cash available to distribute to the fund.",
    ],
    correct: 0,
  },
  377: {
    options: [
      "Interest on the debt is tax-deductible, so the company pays less tax and keeps more cash than it otherwise would at that level of pre-tax profit - though its cash flow is still lower than with no debt at all.",
      "The debt itself is tax-deductible, so the full principal reduces the company's taxable income over the holding period.",
      "It means the private equity firm pays no tax on its eventual capital gain, because the debt shelters the exit proceeds.",
      "It means the company's cash flow is higher with debt than without it, which is why leverage improves the business economically.",
    ],
    correct: 0,
  },
  378: {
    options: [
      "The portfolio company takes on new debt purely to fund a special dividend back to the private equity firm that owns it - the firm recovers part of its investment without selling the business.",
      "The private equity firm injects fresh equity so the company can pay down its existing debt more quickly.",
      "The company issues new shares to the public and uses the proceeds to repay the acquisition debt.",
      "The company refinances its existing debt at a lower rate and pays the interest saving out as a dividend.",
    ],
    correct: 0,
  },
  379: {
    options: [
      "To boost returns. More leverage raises the return, and the recap lets the firm recover part of its equity investment early - a smaller effective equity outlay produces a higher IRR on the same exit.",
      "To reduce the company's tax bill, since dividends paid to shareholders are deductible against corporate income.",
      "To improve the company's credit rating ahead of an exit, by demonstrating it can raise new debt.",
      "To return capital to the company's management team, who typically hold the majority of the equity.",
    ],
    correct: 0,
  },
  380: {
    options: [
      "No income statement change. On the balance sheet, debt rises and shareholders' equity falls by the same amount so it stays in balance. On the cash flow statement, the debt raised and the dividend paid both sit in financing and offset.",
      "Net income falls by the dividend amount, and on the balance sheet both cash and shareholders' equity decline.",
      "No income statement change, but cash rises by the amount of new debt since the dividend is paid in the following period.",
      "Debt rises and cash rises on the balance sheet, with the dividend recorded as an expense on the income statement.",
    ],
    correct: 0,
  },

  // ── LBO Model - Advanced ──────────────────────────────────────────────
  381: {
    options: [
      "Running from cheapest and most senior to most expensive and most junior: Revolver, Term Loan A, Term Loan B, Senior Notes, Subordinated Notes and Mezzanine. As you move down, interest rises, security falls, amortisation disappears and covenants loosen from maintenance to incurrence.",
      "Running from cheapest to most expensive: Mezzanine, Subordinated Notes, Senior Notes, Term Loans and finally the Revolver, which is the most expensive because it can be drawn at will.",
      "There are only two types - bank debt and high-yield debt - and any further distinction is a matter of the lender's name rather than the instrument.",
      "All tranches carry the same interest rate and seniority; they differ only in maturity, which is what determines the repayment order.",
    ],
    correct: 0,
  },
  382: {
    options: [
      "Much like a merger model: you compute Goodwill, Other Intangibles and the write-ups the same way, then adjust the balance sheet for the cash used, capitalised financing fees, written-up assets and new debt.",
      "You don't adjust the balance sheet at all in an LBO - the write-ups apply only in an M&A deal where two companies combine.",
      "You write assets down rather than up, because the private equity firm is buying at a discount to fair value.",
      "You revalue only the intangible assets; tangible assets stay at their existing book value throughout the holding period.",
    ],
    correct: 0,
  },
  383: {
    options: [
      "Lay out the interest and principal payments the lenders receive each year, then run an IRR starting from the original debt as a negative Year 0 amount, with the payments as positive inflows over the holding period.",
      "Divide the total interest received over the holding period by the original principal - that annualised figure is the debt IRR.",
      "Take the coupon rate on the debt, which by definition is the return the debt investors earn.",
      "You can't calculate it - IRR applies only to equity, since debt returns are contractual rather than residual.",
    ],
    correct: 0,
  },
  384: {
    options: [
      "To keep management motivated and in place until exit, much like an earnout in an M&A deal. In the model it dilutes the private equity firm's stake at exit, reducing the proceeds and therefore the IRR.",
      "To satisfy a regulatory requirement that management hold a minimum stake in any leveraged buyout.",
      "To reduce the equity cheque the firm has to write at closing, since management funds part of the purchase price.",
      "It has no effect on the model - the option pool is granted from the firm's own carried interest rather than company equity.",
    ],
    correct: 0,
  },
  385: {
    options: [
      "PIK debt requires no cash interest - the interest accrues to the principal, which grows over time. It preserves cash for the business, but the balance compounds, and a PIK toggle lets the company choose cash or accrual each period.",
      "PIK debt requires interest to be paid in additional shares rather than cash, diluting the equity holders each period.",
      "PIK debt carries a lower interest rate than bank debt because no cash payment is required, which is why firms prefer it.",
      "PIK debt is repaid entirely at maturity with no interest at all, functioning as a zero-coupon instrument.",
    ],
    correct: 0,
  },
  386: {
    options: [
      "Incurrence covenants bar specific actions - taking on more than a set amount of debt, making acquisitions above a threshold, exceeding a CapEx limit. Maintenance covenants require ratios to be met each period, such as a maximum Debt/EBITDA or minimum interest coverage.",
      "Incurrence covenants require ratios to be met every quarter, while maintenance covenants restrict specific actions such as asset sales.",
      "Both are tested quarterly and differ only in whether the lender is a bank or a bondholder.",
      "Incurrence covenants apply before the deal closes and maintenance covenants only afterwards, which is the whole distinction.",
    ],
    correct: 0,
  },
  387: {
    options: [
      "Usually not - a 338(h)(10) election requires the buyer to be a C corporation, and private equity firms are typically LLCs or limited partnerships that acquire through an LLC shell.",
      "Yes, always - the election is available in any acquisition regardless of how the buyer is organised.",
      "Usually not, because the election requires the seller to be a public company and most LBO targets are private.",
      "Yes, but only where the target is itself an LLC, in which case the election passes through automatically.",
    ],
    correct: 0,
  },
  388: {
    options: [
      "Only Revolvers and Term Loans have them - high-yield debt has no prepayment option, so it's always zero. Work out the cash available from the beginning balance less the minimum cash balance and mandatory repayments, then apply it to the most senior tranche first.",
      "Apply available cash to the most expensive tranche first, since repaying high-yield debt saves the most interest.",
      "Optional repayments apply to every tranche equally, split in proportion to each one's share of total debt.",
      "You repay the full cash balance each year, since holding cash in an LBO earns less than the interest it would save.",
    ],
    correct: 0,
  },
  389: {
    options: [
      "It covers the gap when mandatory repayments exceed the cash available: Revolver Borrowing = MAX(0, total mandatory repayment - cash flow available). It starts undrawn and is repaid first once cash flow recovers.",
      "It funds the equity portion of the purchase price at closing and is repaid from the exit proceeds.",
      "It is fully drawn at closing to maximise leverage, then amortised on a fixed schedule like a term loan.",
      "It is the tranche repaid last, after all term loans and notes, because it is the cheapest form of debt.",
    ],
    correct: 0,
  },
  390: {
    options: [
      "Cost savings from headcount reductions hitting COGS or operating expenses, new depreciation from PP&E write-ups, new amortisation from intangible write-ups and capitalised financing fees, and the new interest expense from the LBO debt.",
      "Only the new interest expense - operational changes are modelled separately and don't enter the income statement.",
      "You replace the target's revenue with the private equity firm's projections and leave every expense line unchanged.",
      "You remove depreciation and amortisation entirely, since an LBO is analysed on an EBITDA basis throughout.",
    ],
    correct: 0,
  },
  391: {
    options: [
      "Yes, and more often than you'd expect. High-yield lenders can be earning 10-15%, which is close to guaranteed if the debt is repaid. If they beat the sponsor's return, it tells you the deal underperformed - the company didn't grow or exit well enough to justify the equity risk.",
      "No - equity is junior to debt, so equity holders always earn more in exchange for bearing more risk.",
      "Yes, but only if the company defaults and the lenders take ownership through a restructuring.",
      "Yes, and it indicates the deal was structured well, since cheap debt returns mean the sponsor kept more of the upside.",
    ],
    correct: 0,
  },

  // ── Brain Teaser ──────────────────────────────────────────────────────
  392: {
    options: [
      "It's impossible. Covering 60 miles at an average of 30 mph already takes 2 hours, and averaging 60 mph over those same 2 hours would mean travelling 120 miles, not 60.",
      "90 mph - the driver has to make up the shortfall, so they need to travel at three times the original speed.",
      "120 mph, since doubling the average speed over a fixed distance requires doubling the instantaneous speed twice over.",
      "60 mph - simply driving at the target average speed for the remainder of the journey achieves it.",
    ],
    correct: 0,
  },
  393: {
    options: [
      "142.5 degrees. The minute hand sits at 270 degrees from 12, and the hour hand has moved three-quarters of the way from 1 to 2, putting it at 52.5 degrees - a gap of 217.5 degrees, so the smaller angle is 142.5.",
      "120 degrees. The hour hand is at 1 and the minute hand at 9, which is four hour-marks apart at 30 degrees each.",
      "127.5 degrees, taking the hour hand as having moved a quarter of the way from 1 towards 2.",
      "150 degrees, since the hands are five hour-marks apart at 30 degrees each.",
    ],
    correct: 0,
  },
  394: {
    question:
      "You have stacks of quarters, dimes, nickels and pennies ($0.25, $0.10, $0.05 and $0.01), with an unlimited number of coins in each stack. You can take coins from any stack in any amount and in any order. What is the greatest dollar value you can hold without being able to make change for a dollar?",
    options: [
      "$1.19 - three quarters, four dimes and four pennies. A fourth quarter would make $1.00, a fifth dime would combine with two quarters to make $1.00, any nickel would complete $1.00 with the quarters and dimes, and a fifth penny would do the same.",
      "$0.99 - anything at or above a dollar can obviously make change for a dollar, so ninety-nine cents is the ceiling.",
      "$1.24 - four quarters minus a penny, which is the largest amount short of two full dollars in quarters.",
      "$1.19, reached with four quarters, one dime, one nickel and four pennies, none of which combine to exactly a dollar.",
    ],
    correct: 0,
  },
  395: {
    options: [
      "Fill the 3L and pour it into the 5L. Refill the 3L and top up the 5L, leaving 1L in the 3L. Empty the 5L, pour the 1L into it, then fill the 3L and add it - giving exactly 4L.",
      "Fill the 5L and pour it into the 3L, leaving 2L in the 5L. Empty the 3L, transfer the 2L across, then refill the 5L - giving exactly 4L.",
      "Fill the 3L twice into the 5L, which overflows by 1L, and the overflow leaves exactly 4L in the 5L bucket.",
      "It can't be done - with only 3L and 5L measures, every reachable quantity is a multiple of one or the other.",
    ],
    correct: 0,
  },
};
