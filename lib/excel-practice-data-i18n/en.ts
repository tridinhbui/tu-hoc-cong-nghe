import type { ExcelSetTranslation } from "./index";

/**
 * Bản tiếng Anh của 6 bộ bài tập Excel/SQL.
 *
 * Hai luật khi thêm hoặc sửa ở đây:
 *
 * 1. TÊN BẢNG VÀ TÊN CỘT SQL Ở LẠI TIẾNG VIỆT. `dich_vu`, `don_gia`, `so_luot`,
 *    `nhom`, `ma` là định danh trong `db` của tệp gốc, và bộ chấm chạy truy vấn
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
      "Column B holds 12 months of request volume. In real Excel you find the last row with Ctrl + Shift + Down rather than scrolling; here you type the range out. Cell F2 is the only assumption - every formula must point at it instead of copying its value.",
    cells: {
      A1: "Month",
      B1: "Requests",
      C1: "Forecast",
      E1: "Assumption",
      E2: "Growth",
      E4: "Full-year total",
      E5: "Months above 120",
    },
    tasks: [
      {
        prompt: "Total the requests for the whole year.",
        hint: "=SUM(the range from B2 to B13)",
        explain:
          "In Excel the fastest way to select this range is to sit on B2 and press Ctrl + Shift + Down. If that shortcut stops partway, you have just found an empty cell in your data that your eyes would have missed.",
        mustAvoidWhy: [
          "Adding cells by hand breaks the moment one more month arrives. Use a range.",
        ],
      },
      {
        prompt: "Count how many months had requests above 120.",
        hint: '=COUNTIF(range, ">120")',
        explain:
          "The condition goes inside quotation marks because Excel reads it as a string describing a comparison, not as an expression.",
      },
      {
        prompt:
          "Cell C2: forecast next year's January requests as this January's requests times the growth rate in F2. Write it so that dragging it down the column still works.",
        hint: "=B2*(1+$F$2)",
        explain:
          "F4 is the key that adds the $ signs in Excel. This is why data tests grade how you write a formula and not only the result: one formula you can drag down a column is one formula, while 12 cells typed by hand are 12 chances to be wrong.",
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
    title: "Matching unit prices onto a service list",
    intro:
      "Columns A:C are the unit-price table exported from the billing system. Columns E:F are the services you run. The job is to match unit prices onto the service list - and to catch the row that will not match before it reaches a report.",
    cells: {
      A1: "Code",
      B1: "Group",
      C1: "Unit price",
      B2: "Ingress",
      B3: "Delivery",
      B4: "Identity",
      B5: "Background jobs",
      B6: "Logging",
      E1: "Services used",
      F1: "Requests",
      G1: "Matched unit price",
      I1: "Total cost",
    },
    tasks: [
      {
        prompt:
          "Match the unit price for SSO onto the service list. Cell G3 is already done for JOB - follow that pattern.",
        hint: "=INDEX(C2:C6, MATCH(E2, A2:A6, 0)) - read it from the inside out",
        explain:
          "MATCH returns which row SSO sits on, and INDEX pulls the value from that row. The two functions are independent, so the formula survives any change to the source table's layout.",
        mustAvoidWhy: [
          "VLOOKUP buries a column number in the formula. Insert one column into the source table and it silently returns the wrong data.",
          "Typing the answer in means the formula will not update when the unit price changes.",
        ],
      },
      {
        prompt:
          "Match the unit price for CDN the same way. A correctly written formula still returns #N/A - do not change the formula, work out why and fix the data in the source table.",
        hint: "Click each cell in column A and look closely at the contents. There is a character you cannot see.",
        explain:
          "Cell A3 contains 'CDN ' with a trailing space. This is the number one cause of failed lookups in real work, and it shows up whenever data passes through more than one system. At scale the right fix is to normalise the whole column once with TRIM, not to edit rows one by one.",
      },
      {
        prompt:
          "MSG is missing from the unit-price table. Match its price with XLOOKUP, and make the formula return 0 instead of an error code when nothing is found.",
        hint: "=XLOOKUP(E5, A2:A6, C2:C6, 0) - the fourth argument is the not-found value",
        explain:
          "That fourth argument is why XLOOKUP is safer than VLOOKUP wrapped in IFERROR: IFERROR swallows every kind of error, including the ones you need to see, while this argument handles only the not-found case.",
        mustUseWhy: ["This task is about the fourth argument of XLOOKUP specifically."],
      },
      {
        prompt: "Total cost: requests times unit price, summed across all four services.",
        hint: "=F2*G2+F3*G3+F4*G4+F5*G5",
        explain:
          "Notice what just happened: 300 requests to MSG contributed exactly nothing to the total, and nothing warned you. The 0 fallback turned a row with missing data into a row that looks finished. That is why every match needs a reconciliation afterwards - count the rows that matched against the rows that should have. Without it you are only hoping.",
      },
    ],
  },

  "excel-three-statement": {
    title: "The autoscaling circularity and the check cell",
    intro:
      "This is the smallest slice of a three-tier sheet that has a real circularity: scaling cost depends on server count, server count depends on the load you have to absorb, and that load depends on the headroom left after scaling cost. You will build it, watch Excel report a circular reference, then break the loop with the switch in E8.",
    cells: {
      A1: "Operating budget",
      A2: "Compute allowance",
      A3: "Baseline load",
      A4: "Support & monitoring load",
      A5: "Headroom before scaling",
      A6: "Scaling cost",
      A7: "Headroom after scaling",
      A8: "Overhead at 20%",
      A9: "Net headroom",
      D1: "Extra servers",
      D2: "Opening count",
      D3: "Added during the period",
      D4: "Closing count",
      D5: "Average count",
      D6: "Price per server",
      D8: "Circularity breaker switch",
      G1: "Check cell",
      G2: "Scaling cost ties to server table",
    },
    tasks: [
      {
        prompt:
          "Headroom before scaling is the allowance less both load lines. Note that B3 and B4 are already negative.",
        hint: "=SUM(B2:B4)",
        explain:
          "Recording consumed capacity as negative numbers and adding everything up beats subtracting each line: a new load line only has to sit inside the range, with no formula to edit.",
      },
      {
        prompt: "Closing server count = opening count plus servers added.",
        hint: "=E2+E3",
        explain:
          "Server tables are always built as a roll-forward: open, add what was provisioned, subtract what was retired, close. That shape hands you a built-in check in every period.",
      },
      {
        prompt: "Average count = the average of opening and closing.",
        hint: "=AVERAGE(E2,E4)",
        explain:
          "Charging cost on the average count rather than the closing count is exactly what creates the circularity - and it is also what makes the cost number more accurate when the system adds servers mid-period.",
      },
      {
        prompt:
          "Scaling cost = minus the average count times the unit price, BUT if the switch in E8 equals 1 then the cost must be 0.",
        hint: "=IF(E8=1, 0, -E5*E6)",
        explain:
          "Every sheet with a circularity needs this switch. When Excel drops into a state where errors spread across the whole file, you flip the switch, everything calculates again, you fix the problem, then flip it back. Without it the only way out is closing the file without saving.",
        mustUseWhy: [
          "With no switch you have no way to break the loop when the sheet falls into error.",
        ],
      },
      {
        prompt:
          "Check cell: the difference between scaling cost on the budget and the cost computed from the server table. It must come out as 0.",
        hint: "=B6-(-E5*E6) - or any other way of expressing the same comparison",
        explain:
          "A check cell is not decoration: it is the thing that tells you the sheet just broke, at the moment it breaks. A good file collects every check into one total at the top of the sheet, and that total must always read 0.",
      },
    ],
  },

  "excel-audit": {
    title: "Check rows and hard-coded numbers",
    intro:
      "This allocation table does not balance, and cell B9 contains a hard-coded number. Neither mistake makes Excel say anything at all - which is exactly why you build check rows yourself.",
    cells: {
      A1: "Allocated",
      A2: "Memory",
      A3: "Disk",
      A4: "CPU",
      A5: "Total allocated",
      D1: "Supply",
      D2: "Cluster A",
      D3: "Cluster B",
      D4: "Cluster C",
      D5: "Total supply",
      A7: "Requests",
      A8: "Error rate",
      A9: "Errors (currently wrong)",
      G1: "Check cell",
      G2: "Balance check",
      G3: "Errors with no hard-code",
      G4: "Errors per allocated unit",
    },
    tasks: [
      {
        prompt: "Total allocated.",
        hint: "=SUM(B2:B4)",
        explain:
          "Sum a range rather than writing =B2+B3+B4: a resource line inserted in the middle lands inside the range automatically, while the cell-by-cell addition just forgets it and says nothing. This is the most common shape of silent error in sheets that many people edit.",
      },
      {
        prompt: "Total supply.",
        hint: "=SUM(E2:E4)",
        explain:
          "These two totals ought to be equal, and here they are not - but you have not spotted that just by reading two numbers. That is the point of the next task: human eyes cannot compare numbers, a check cell can, every time, automatically.",
      },
      {
        prompt:
          "Balance check cell: total allocated minus total supply. Just enter the correct formula - a non-zero result is expected at this stage.",
        hint: "=B5-E5",
        explain:
          "Off by 60. The job now is to find the 60 that went into one side and not the other. The thing you must absolutely not do is add 60 to cluster C to make it balance - that turns a visible error into a permanent one nobody will ever find.",
      },
      {
        prompt:
          "Cell B9 currently reads =1000*0.12, two hard-coded numbers. Rewrite it so it points at the requests cell and the error-rate cell.",
        hint: "=B7*B8",
        explain:
          "Both formulas give 120 today. The difference shows up the day somebody edits requests in B7: the referencing version follows, the hard-coded one does not, and nothing tells you. Pressing Ctrl + ` to show formulas is how you sweep a whole sheet for this in seconds.",
        mustAvoidWhy: [
          "The request count already lives in B7. Copying it creates a second copy that will drift.",
          "The error rate already lives in B8.",
        ],
      },
      {
        prompt:
          "Errors per allocated unit, written so that a zero total gives 0 rather than an error code.",
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
      "Two tables in the warehouse: dich_vu is the services you run, don_gia is the billing unit-price table. Type real queries into the box below. One code is missing from don_gia - the last task is finding it before it distorts every weighting.",
    tasks: [
      {
        prompt: "Return the code and request count for services with 1,000 requests or more.",
        hint: "SELECT column, column FROM table WHERE condition",
        explain:
          "The filter runs on the database side, so what crosses the wire to your machine is three rows rather than the whole table. At a few million rows, that difference is the difference between a two-second query and a frozen spreadsheet.",
      },
      {
        prompt: "Total requests, grouped by service group, sorted descending.",
        hint: "SELECT nhom, SUM(so_luot) AS tong FROM ... GROUP BY nhom ORDER BY tong DESC",
        explain:
          "GROUP BY decides what one row of the result stands for. Every column in SELECT must either appear in GROUP BY or sit inside an aggregate - otherwise the database has no way to know which value in the group to give you.",
      },
      {
        prompt:
          "Join the two tables and compute total cost: requests times unit price, summed. Use a plain JOIN.",
        hint: "SELECT SUM(d.so_luot * g.don_gia) FROM dich_vu d JOIN don_gia g ON d.ma = g.ma",
        explain:
          "This number is WRONG, and nothing tells you so. The service table holds six codes, the unit-price table has five - a plain JOIN is an INNER JOIN, so the code with no unit price drops out of the result along with all of its cost. The total still comes back looking entirely reasonable. The last task is how you catch this.",
      },
      {
        prompt: "Find exactly which service codes have no unit price in the don_gia table.",
        hint: "LEFT JOIN keeps every row on the left; unmatched sides come back as NULL. Filter with IS NULL.",
        explain:
          "LEFT JOIN forces missing data to show itself instead of vanishing. Note that it must be IS NULL and not = NULL: in SQL, NULL does not equal anything, not even itself, so = NULL always returns nothing.\n\nThis is the check to run after EVERY join: compare the row count before and after, and if they differ, find out where. A more powerful tool does not remove the need to check.",
      },
    ],
  },

  "excel-power-query": {
    title: "Building a cleaning pipeline",
    intro:
      "Every month you receive the same log export from the system: four junk header rows on top, one column per month, service codes with stray spaces. Put the Power Query steps into the order they should run. The wrong order still produces a result - it just produces a wrong one.",
    task: {
      prompt: "Drag the steps into the right order for the pipeline.",
      explain:
        "Two decisive points. Trimming spaces has to finish BEFORE the merge on service code, or the merge silently drops the rows with dirty codes - the same silent error the lookup exercise warned about. And unpivoting has to finish before the merge, because while the table still has one column per month there is no key to merge rows on.\n\nThe real value of this pipeline is not in the first run. It is next month, when you press Refresh and seven steps run again identically - not roughly the same, identically. That is the condition for figures from different periods to actually be comparable.",
      steps: [
        "Connect to the folder holding every month's file",
        "Remove the four junk rows on top and promote the first row to headers",
        "Trim the stray spaces from the service code column",
        "Set the correct data type on each column",
        "Unpivot the month columns into two columns: month and requests",
        "Merge the cluster column from the service reference table on code",
        "Load the result to a worksheet to build the report",
      ],
    },
  },
};
