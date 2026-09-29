// Chữ cho đợt revamp BUILD → RUN → DEBUG → LEVEL UP (KE-HOACH-BUILD-RUN-DEBUG.md),
// khu Mô phỏng công cụ: trang tổng /cong-cu và khung ticket chung
// (components/tools/ToolShell.tsx). Đề bài từng nhiệm vụ nằm trong section của
// chính công cụ đó (tool-sql.ts, tool-api.ts, ...), khoá theo id nhiệm vụ.
//
// Lời Cơ Cơ ở đây là MẢNG câu - CoCoSays chọn một câu, và `salt` đổi theo từng
// lần chạy lỗi để hai lỗi liền nhau không nhận cùng một câu.
export const revampToolsVi = {
  revampTools: {
    hub: {
      eyebrow: "Tính năng chủ lực",
      title: "Làm việc trong môi trường nghề",
      overall: "{done}/{total} ticket đã đóng",
      ticketsDone: "{done}/{total} ticket",
      start: "Bắt đầu",
      resume: "Làm tiếp",
      review: "Xem lại",
      finished: "Đã đóng hết",
      notStarted: "Chưa mở ticket nào",
      localNote: "Tiến độ lưu trên trình duyệt này.",
    },
    shell: {
      sandbox: "Sandbox",
      ticket: "Ticket {n}/{total}",
      from: "Người yêu cầu",
      criteria: "Tiêu chí đạt",
      hint: "Gợi ý",
      hideHint: "Ẩn gợi ý",
      passed: "Đạt",
      result: "Kết quả bàn giao",
      nextTicket: "Ticket tiếp theo",
      queue: "Hàng đợi ticket",
      progress: "{done}/{total} đã đóng",
      allDone: "Hàng đợi trống - bạn đã đóng mọi ticket của công cụ này.",
      open: "Mở ticket {n}: {title}",
    },
    sql: {
      runs: "Câu lệnh chạy không lỗi",
      rows: "Trả về đúng {n} dòng",
      query: "Truy vấn",
      rowCount: "{count} dòng",
      more: "… còn {count} dòng",
      missing: "Chạy lại truy vấn để hiện lại bảng kết quả.",
    },
    api: {
      evidence: "Lần gọi đạt yêu cầu",
      latency: "{ms} ms",
      body: "Body gửi đi",
      missing: "Lần gọi này không còn trong Lịch sử.",
    },
    terminal: {
      commands: "Lệnh đã chạy",
      containers: "Container đang chạy",
      branch: "Nhánh hiện tại: {branch}",
      commits: "{count} commit",
      empty: "Chưa có lệnh nào.",
    },
    cloud: {
      summary: "Hạ tầng hiện tại",
      vms: "Máy ảo",
      sites: "Website",
      dbs: "Cơ sở dữ liệu",
      bill: "Hoá đơn tháng",
      none: "Không có",
      budget: "Ngân sách {limit}",
    },
    editor: {
      page: "Trang đang chạy",
      heading: "Tiêu đề: {text}",
      noHeading: "Chưa chạy trang lần nào.",
      console: "Console",
      files: "Tệp trong dự án",
      unsaved: "chưa lưu",
      saved: "đã lưu",
    },
    coco: {
      hintLead: "Gợi ý nhỏ:",
      done: [
        "Ticket đóng, kết quả ở ngay dưới. Tiếp theo: \"{next}\".",
        "Xong, và có bằng chứng hẳn hoi. Ticket kế tiếp đang chờ: \"{next}\".",
        "Đạt đủ tiêu chí. Người yêu cầu sẽ vui đấy - giờ tới \"{next}\".",
      ],
      allDone: [
        "Ticket cuối đã đóng. Công cụ này bạn dùng được thật rồi - thử một công cụ khác trong danh sách nhé.",
        "Hết hàng đợi! Quay lại trang tổng và mở một công cụ bạn chưa đụng tới.",
      ],
      error: {
        sql: [
          "Lỗi là chuyện thường. Đọc dòng bộ máy báo trước - nó thường chỉ đúng chữ bị gõ sai.",
          "Sửa từng mệnh đề một rồi chạy lại. Đừng sửa ba chỗ cùng lúc, khó biết chỗ nào đúng.",
          "Kiểm tra tên bảng, tên cột ở cột bên trái - sai một chữ là bộ máy không nhận.",
        ],
        api: [
          "Mã 4xx nghĩa là request có vấn đề. Mở body trả về - API thường nói rõ sai ở đâu.",
          "Soi lại method, đường dẫn và header trước. Đa số lỗi nằm ở một trong ba chỗ đó.",
          "Đọc mã trạng thái trước, rồi tới body. Hai thứ đó đủ để biết bước sửa tiếp theo.",
        ],
        terminal: [
          "Lệnh vừa rồi thoát với lỗi. Đọc dòng đỏ - nó thường nói rõ thiếu tệp nào hay sai tham số nào.",
          "Không chắc mình đang ở đâu? Gõ pwd và ls trước, rồi chạy lại lệnh.",
          "Gõ help để xem các lệnh có sẵn, hoặc thêm --help sau tên lệnh.",
        ],
        cloud: [
          "Bảng điều khiển vừa từ chối thao tác. Đọc thông báo - thường là thiếu một bước đi trước.",
          "Đám mây làm theo thứ tự: có tài nguyên, rồi cấu hình, rồi mới mở ra ngoài.",
        ],
        editor: [
          "Console có lỗi đỏ. Đọc tên lỗi và số dòng, mở đúng tệp đó mà sửa.",
          "Sửa xong nhớ bấm Chạy lại - trang chỉ đổi theo lần chạy mới nhất.",
        ],
      },
    },
  },
};

export const revampToolsEn: typeof revampToolsVi = {
  revampTools: {
    hub: {
      eyebrow: "Flagship feature",
      title: "Work in a professional environment",
      overall: "{done}/{total} tickets closed",
      ticketsDone: "{done}/{total} tickets",
      start: "Start",
      resume: "Continue",
      review: "Review",
      finished: "All closed",
      notStarted: "No tickets opened yet",
      localNote: "Progress is saved in this browser.",
    },
    shell: {
      sandbox: "Sandbox",
      ticket: "Ticket {n}/{total}",
      from: "Requested by",
      criteria: "Pass criteria",
      hint: "Hint",
      hideHint: "Hide hint",
      passed: "Passed",
      result: "Deliverable",
      nextTicket: "Next ticket",
      queue: "Ticket queue",
      progress: "{done}/{total} closed",
      allDone: "Queue empty - you have closed every ticket for this tool.",
      open: "Open ticket {n}: {title}",
    },
    sql: {
      runs: "The query runs without errors",
      rows: "Returns exactly {n} rows",
      query: "Query",
      rowCount: "{count} rows",
      more: "… {count} more rows",
      missing: "Run the query again to bring the result table back.",
    },
    api: {
      evidence: "The call that passed",
      latency: "{ms} ms",
      body: "Request body",
      missing: "This call is no longer in History.",
    },
    terminal: {
      commands: "Commands run",
      containers: "Running containers",
      branch: "Current branch: {branch}",
      commits: "{count} commits",
      empty: "No commands yet.",
    },
    cloud: {
      summary: "Current infrastructure",
      vms: "Instances",
      sites: "Websites",
      dbs: "Databases",
      bill: "Monthly bill",
      none: "None",
      budget: "Budget {limit}",
    },
    editor: {
      page: "Running page",
      heading: "Heading: {text}",
      noHeading: "The page has not been run yet.",
      console: "Console",
      files: "Project files",
      unsaved: "unsaved",
      saved: "saved",
    },
    coco: {
      hintLead: "Small hint:",
      done: [
        "Ticket closed, the result is right below. Next up: \"{next}\".",
        "Done, with proof to show for it. The next ticket is waiting: \"{next}\".",
        "Every criterion met. The requester will be happy - now on to \"{next}\".",
      ],
      allDone: [
        "Last ticket closed. You can genuinely use this tool now - try another one from the list.",
        "Queue cleared! Head back to the tools page and open one you have not touched yet.",
      ],
      error: {
        sql: [
          "Errors are normal. Read the engine's message first - it usually points at the exact typo.",
          "Fix one clause at a time and run again. Change three things at once and you won't know which one worked.",
          "Check table and column names in the left panel - one wrong letter and the engine won't recognise it.",
        ],
        api: [
          "A 4xx means the request has a problem. Open the response body - APIs usually say what is wrong.",
          "Check the method, the path and the headers first. Most mistakes live in one of those three.",
          "Read the status code first, then the body. Those two tell you the next fix.",
        ],
        terminal: [
          "That command exited with an error. Read the red line - it usually names the missing file or the wrong option.",
          "Not sure where you are? Run pwd and ls first, then try the command again.",
          "Type help to see the available commands, or add --help after a command name.",
        ],
        cloud: [
          "The console just refused that action. Read the message - usually a step before it is missing.",
          "The cloud works in order: create the resource, configure it, then open it to the outside.",
        ],
        editor: [
          "The console has a red error. Read the error name and line number, then open that file and fix it.",
          "After fixing, press Run again - the page only reflects the latest run.",
        ],
      },
    },
  },
};
