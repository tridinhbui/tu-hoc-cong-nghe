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
};
