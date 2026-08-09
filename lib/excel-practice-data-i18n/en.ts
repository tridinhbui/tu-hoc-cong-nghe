import type { ExcelSetTranslation } from "./index";

/**
 * Bản tiếng Anh của 6 bộ bài tập Excel/SQL.
 *
 * Hai luật khi thêm hoặc sửa ở đây:
 *
 * 1. TÊN BẢNG VÀ TÊN CỘT SQL Ở LẠI TIẾNG VIỆT. `danh_muc`, `gia`, `so_luong`,
 *    `nganh`, `ma` là định danh trong `db` của tệp gốc, và bộ chấm chạy truy vấn
 *    thật bằng mini-sql. Dịch chúng trong phần gợi ý là đưa cho học viên một câu
 *    truy vấn không chạy được.
 *
 * 2. Dấu thập phân đổi sang dấu chấm. "0,08" trong bản tiếng Việt phải thành
 *    "0.08", không thì người đọc tiếng Anh đọc ra tám.
 */
export const excelPracticeEn: Record<string, ExcelSetTranslation> = {
  "excel-shortcuts": {
    title: "Data ranges and the assumption cell",
    intro:
      "Column B holds 12 months of revenue. In real Excel you find the last row with Ctrl + Shift + Down rather than scrolling; here you type the range out. Cell F2 is the only assumption - every formula must point at it instead of copying its value.",
    cells: {
      A1: "Month",
      B1: "Revenue",
      C1: "Forecast",
      E1: "Assumption",
      E2: "Growth",
      E4: "Full-year total",
      E5: "Months above 120",
    },
    tasks: [
      {
        prompt: "Total the revenue for the whole year.",
        hint: "=SUM(the range from B2 to B13)",
        explain:
          "In Excel the fastest way to select this range is to sit on B2 and press Ctrl + Shift + Down. If that shortcut stops partway, you have just found an empty cell in your data that your eyes would have missed.",
        mustAvoidWhy: [
          "Adding cells by hand breaks the moment one more month arrives. Use a range.",
        ],
      },
      {
        prompt: "Count how many months had revenue above 120.",
        hint: '=COUNTIF(range, ">120")',
        explain:
          "The condition goes inside quotation marks because Excel reads it as a string describing a comparison, not as an expression.",
      },
      {
        prompt:
          "Cell C2: forecast next year's January revenue as this January's revenue times the growth rate in F2. Write it so that dragging it down the column still works.",
        hint: "=B2*(1+$F$2)",
        explain:
          "F4 is the key that adds the $ signs in Excel. This is why modelling tests grade how you write a formula and not only the result: one formula you can drag down a column is one formula, while 12 cells typed by hand are 12 chances to be wrong.",
        mustUseWhy: [
          "Without locking F2, dragging down shifts the reference to F3, F4 - all empty - and the whole column goes to 0.",
        ],
        mustAvoidWhy: [
          "Typing 0.08 straight into the formula buries an assumption. Changing it later means editing 12 cells instead of 1.",
          "Same problem: this number has to come from cell F2.",
        ],
      },
    ],
  },

  "excel-lookup": {
    title: "Matching prices into a portfolio",
    intro:
      "Columns A:C are price data exported from a system. Columns E:F are your portfolio. The job is to match prices into the portfolio - and to catch the row that will not match before it reaches a report.",
    cells: {
      A1: "Ticker",
      B1: "Sector",
      C1: "Price",
      B2: "Technology",
      B3: "Steel",
      B4: "Consumer",
      B5: "Retail",
      B6: "Brokerage",
      E1: "Portfolio",
      F1: "Shares",
      G1: "Matched price",
      I1: "Portfolio value",
    },
    tasks: [
      {
        prompt:
          "Match the price for VNM into the portfolio. Cell G3 is already done for MWG - follow that pattern.",
        hint: "=INDEX(C2:C6, MATCH(E2, A2:A6, 0)) - read it from the inside out",
        explain:
          "MATCH returns which row VNM sits on, and INDEX pulls the value from that row. The two functions are independent, so the formula survives any change to the source table's layout.",
        mustAvoidWhy: [
          "VLOOKUP buries a column number in the formula. Insert one column into the source table and it silently returns the wrong data.",
          "Typing the answer in means the formula will not update when the price changes.",
        ],
      },
      {
        prompt:
          "Match the price for HPG the same way. A correctly written formula still returns #N/A - do not change the formula, work out why and fix the data in the source table.",
        hint: "Click each cell in column A and look closely at the contents. There is a character you cannot see.",
        explain:
          "Cell A3 contains 'HPG ' with a trailing space. This is the number one cause of failed lookups in real work, and it shows up whenever data passes through more than one system. At scale the right fix is to normalise the whole column once with TRIM, not to edit rows one by one.",
      },
      {
        prompt:
          "GAS is missing from the price table. Match its price with XLOOKUP, and make the formula return 0 instead of an error code when nothing is found.",
        hint: "=XLOOKUP(E5, A2:A6, C2:C6, 0) - the fourth argument is the not-found value",
        explain:
          "That fourth argument is why XLOOKUP is safer than VLOOKUP wrapped in IFERROR: IFERROR swallows every kind of error, including the ones you need to see, while this argument handles only the not-found case.",
        mustUseWhy: ["This task is about the fourth argument of XLOOKUP specifically."],
      },
      {
        prompt: "Total portfolio value: shares times price, summed across all four tickers.",
        hint: "=F2*G2+F3*G3+F4*G4+F5*G5",
        explain:
          "Notice what just happened: 300 shares of GAS contributed exactly nothing to the total, and nothing warned you. The 0 fallback turned a row with missing data into a row that looks finished. That is why every match needs a reconciliation afterwards - count the rows that matched against the rows that should have. Without it you are only hoping.",
      },
    ],
  },

  "excel-three-statement": {
    title: "The interest circularity and the check cell",
    intro:
      "This is the smallest slice of a three-statement model that has a real circularity: interest depends on debt, debt depends on how much cash you need to borrow, and that depends on profit after interest. You will build it, watch Excel report a circular reference, then break the loop with the switch in E8.",
    cells: {
      A1: "Income statement",
      A2: "Revenue",
      A3: "Cost of goods sold",
      A4: "Selling, general & admin",
      A6: "Interest expense",
      A7: "Profit before tax",
      A8: "Tax at 20%",
      A9: "Profit after tax",
      D1: "Debt & cash",
      D2: "Opening balance",
      D3: "Drawn during the period",
      D4: "Closing balance",
      D5: "Average balance",
      D6: "Interest rate",
      D8: "Circularity breaker switch",
      G1: "Check cell",
      G2: "Interest ties to debt schedule",
    },
    tasks: [
      {
        prompt:
          "EBIT is revenue less costs. Note that B3 and B4 are already negative.",
        hint: "=SUM(B2:B4)",
        explain:
          "Recording costs as negative numbers and adding everything up beats subtracting each line: a new cost line only has to sit inside the range, with no formula to edit.",
      },
      {
        prompt: "Closing debt balance = opening balance plus new drawings.",
        hint: "=E2+E3",
        explain:
          "Debt schedules are always built as a roll-forward: open, add increases, subtract decreases, close. That shape hands you a built-in check in every period.",
      },
      {
        prompt: "Average balance = the average of opening and closing.",
        hint: "=AVERAGE(E2,E4)",
        explain:
          "Charging interest on the average balance rather than the closing balance is exactly what creates the circularity - and it is also what makes the interest number more accurate when a company draws debt mid-period.",
      },
      {
        prompt:
          "Interest expense = minus the average balance times the rate, BUT if the switch in E8 equals 1 then interest must be 0.",
        hint: "=IF(E8=1, 0, -E5*E6)",
        explain:
          "Every model with a circularity needs this switch. When Excel drops into a state where errors spread across the whole file, you flip the switch, everything calculates again, you fix the problem, then flip it back. Without it the only way out is closing the file without saving.",
        mustUseWhy: [
          "With no switch you have no way to break the loop when the model falls into error.",
        ],
      },
      {
        prompt:
          "Check cell: the difference between interest on the income statement and interest computed from the debt schedule. It must come out as 0.",
        hint: "=B6-(-E5*E6) - or any other way of expressing the same comparison",
        explain:
          "A check cell is not decoration: it is the thing that tells you the model just broke, at the moment it breaks. A good file collects every check into one total at the top of the sheet, and that total must always read 0.",
      },
    ],
  },

  "excel-audit": {
    title: "Check rows and hard-coded numbers",
    intro:
      "This balance sheet does not balance, and cell B9 contains a hard-coded number. Neither mistake makes Excel say anything at all - which is exactly why you build check rows yourself.",
    cells: {
      A1: "Assets",
      A2: "Cash",
      A3: "Receivables",
      A4: "Fixed assets",
      A5: "Total assets",
      D1: "Liabilities & equity",
      D2: "Payables",
      D3: "Debt",
      D4: "Equity",
      D5: "Total liabilities & equity",
      A7: "Revenue",
      A8: "Profit margin",
      A9: "Profit (currently wrong)",
      G1: "Check cell",
      G2: "Balance check",
      G3: "Profit with no hard-code",
      G4: "Return on assets",
    },
    tasks: [
      {
        prompt: "Total assets.",
        hint: "=SUM(B2:B4)",
        explain:
          "Sum a range rather than writing =B2+B3+B4: an asset line inserted in the middle lands inside the range automatically, while the cell-by-cell addition just forgets it and says nothing. This is the most common shape of silent error in models that many people edit.",
      },
      {
        prompt: "Total liabilities and equity.",
        hint: "=SUM(E2:E4)",
        explain:
          "These two totals ought to be equal, and here they are not - but you have not spotted that just by reading two numbers. That is the point of the next task: human eyes cannot compare numbers, a check cell can, every time, automatically.",
      },
      {
        prompt:
          "Balance check cell: total assets minus total liabilities and equity. Just enter the correct formula - a non-zero result is expected at this stage.",
        hint: "=B5-E5",
        explain:
          "Off by 60. The job now is to find the 60 that went into one side and not the other. The thing you must absolutely not do is add 60 to equity to make it balance - that turns a visible error into a permanent one nobody will ever find.",
      },
      {
        prompt:
          "Cell B9 currently reads =1000*0.12, two hard-coded numbers. Rewrite it so it points at the revenue cell and the margin cell.",
        hint: "=B7*B8",
        explain:
          "Both formulas give 120 today. The difference shows up the day somebody edits revenue in B7: the referencing version follows, the hard-coded one does not, and nothing tells you. Pressing Ctrl + ` to show formulas is how you sweep a whole sheet for this in seconds.",
        mustAvoidWhy: [
          "Revenue already lives in B7. Copying it creates a second copy that will drift.",
          "The profit margin already lives in B8.",
        ],
      },
      {
        prompt:
          "Return on total assets, written so that a zero total gives 0 rather than an error code.",
        hint: "=IFERROR(B9/B5, 0)",
        explain:
          "This is IFERROR used correctly: a division that can legitimately meet a zero denominator. Used incorrectly, it wraps a whole lookup formula and swallows the #N/A that was trying to tell you data is missing.",
        mustUseWhy: [
          "This task is about where wrapping errors belongs and where it does not.",
        ],
      },
    ],
  },

  "excel-sql": {
    title: "Pulling exactly the data you need",
    intro:
      "Two tables in the warehouse: danh_muc is your portfolio, gia is the end-of-day price table. Type real queries into the box below. One ticker is missing from gia - the last task is finding it before it distorts every weighting.",
    tasks: [
      {
        prompt: "Return the ticker and share count for positions of 1,000 shares or more.",
        hint: "SELECT column, column FROM table WHERE condition",
        explain:
          "The filter runs on the database side, so what crosses the wire to your machine is three rows rather than the whole table. At a few million rows, that difference is the difference between a two-second query and a frozen spreadsheet.",
      },
      {
        prompt: "Total shares held, grouped by sector, sorted descending.",
        hint: "SELECT nganh, SUM(so_luong) AS tong FROM ... GROUP BY nganh ORDER BY tong DESC",
        explain:
          "GROUP BY decides what one row of the result stands for. Every column in SELECT must either appear in GROUP BY or sit inside an aggregate - otherwise the database has no way to know which value in the group to give you.",
      },
      {
        prompt:
          "Join the two tables and compute total portfolio value: shares times price, summed. Use a plain JOIN.",
        hint: "SELECT SUM(d.so_luong * g.gia) FROM danh_muc d JOIN gia g ON d.ma = g.ma",
        explain:
          "This number is WRONG, and nothing tells you so. The portfolio holds six tickers, the price table has five - a plain JOIN is an INNER JOIN, so the ticker with no price drops out of the result along with all of its value. The total still comes back looking entirely reasonable. The last task is how you catch this.",
      },
      {
        prompt: "Find exactly which tickers in the portfolio have no price in the gia table.",
        hint: "LEFT JOIN keeps every row on the left; unmatched sides come back as NULL. Filter with IS NULL.",
        explain:
          "LEFT JOIN forces missing data to show itself instead of vanishing. Note that it must be IS NULL and not = NULL: in SQL, NULL does not equal anything, not even itself, so = NULL always returns nothing.\n\nThis is the check to run after EVERY join: compare the row count before and after, and if they differ, find out where. A more powerful tool does not remove the need to check.",
      },
    ],
  },

  "excel-power-query": {
    title: "Building a cleaning pipeline",
    intro:
      "Every month you receive the same sales file from the system: four junk header rows on top, one column per month, store codes with stray spaces. Put the Power Query steps into the order they should run. The wrong order still produces a result - it just produces a wrong one.",
    task: {
      prompt: "Drag the steps into the right order for the pipeline.",
      explain:
        "Two decisive points. Trimming spaces has to finish BEFORE the merge on store code, or the merge silently drops the rows with dirty codes - the same silent error the lookup exercise warned about. And unpivoting has to finish before the merge, because while the table still has one column per month there is no key to merge rows on.\n\nThe real value of this pipeline is not in the first run. It is next month, when you press Refresh and seven steps run again identically - not roughly the same, identically. That is the condition for figures from different periods to actually be comparable.",
      steps: [
        "Connect to the folder holding every month's file",
        "Remove the four junk rows on top and promote the first row to headers",
        "Trim the stray spaces from the store code column",
        "Set the correct data type on each column",
        "Unpivot the month columns into two columns: month and sales",
        "Merge the region column from the store reference table on code",
        "Load the result to a worksheet to build the report",
      ],
    },
  },
};
