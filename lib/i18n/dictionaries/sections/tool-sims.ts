/** /cong-cu - trang tổng của bộ mô phỏng công cụ nghề công nghệ.
 *
 *  Chữ riêng của từng công cụ nằm trong tệp section của công cụ đó
 *  (tool-terminal.ts, tool-editor.ts, ...), để năm công cụ viết song song không
 *  đụng một tệp chung. Tệp này chỉ giữ thẻ giới thiệu của từng công cụ ở trang
 *  tổng - khoá theo id trong components/tools/CongCuClient.tsx. */
export const toolSimsVi = {
  toolSims: {
    eyebrow: "Mô phỏng công cụ",
    title: "Tập dùng công cụ thật của nghề",
    subtitle:
      "Mỗi công cụ chạy ngay trên trình duyệt, không cần cài gì và không sợ làm hỏng máy. Có nhiệm vụ nhỏ để bạn học bằng cách làm.",
    open: "Mở công cụ",
    missionsCount: "{count} nhiệm vụ",
    back: "Tất cả công cụ",
    safeNote: "Đây là môi trường mô phỏng: mọi thứ chạy trong trình duyệt, không đụng tới máy hay tài khoản thật của bạn.",
    missionsTitle: "Nhiệm vụ",
    missionDone: "Xong",
    allMissionsDone: "Bạn đã xong mọi nhiệm vụ của công cụ này.",
    reset: "Làm lại từ đầu",
    tools: {
      terminal: {
        name: "Terminal",
        title: "Dòng lệnh Linux, Git và Docker",
        subtitle: "Đi lại trong thư mục, tạo và sửa tệp, commit với Git, chạy container - đúng những lệnh gõ mỗi ngày.",
      },
      editor: {
        name: "Code Editor",
        title: "Trình soạn mã kiểu VS Code",
        subtitle: "Cây thư mục, tab, sửa HTML/CSS/JavaScript và xem trang chạy ngay bên cạnh, kèm console.",
      },
      sql: {
        name: "SQL Console",
        title: "Truy vấn cơ sở dữ liệu",
        subtitle: "Gõ SELECT, JOIN, GROUP BY trên một cơ sở dữ liệu cửa hàng mẫu và xem kết quả dạng bảng.",
      },
      api: {
        name: "API Client",
        title: "Gọi API như Postman",
        subtitle: "Gửi GET, POST, PUT, DELETE tới một API mẫu, đọc mã trạng thái, header và JSON trả về.",
      },
      cloud: {
        name: "Cloud Console",
        title: "Bảng điều khiển đám mây",
        subtitle: "Tạo máy chủ ảo, kho lưu trữ, cơ sở dữ liệu; đưa một trang web lên mạng và theo dõi hoá đơn hằng tháng.",
      },
    },
  },
};

export const toolSimsEn: typeof toolSimsVi = {
  toolSims: {
    eyebrow: "Tool simulators",
    title: "Practise on the tools of the trade",
    subtitle:
      "Every tool runs right in your browser - nothing to install and nothing to break. Small missions let you learn by doing.",
    open: "Open tool",
    missionsCount: "{count} missions",
    back: "All tools",
    safeNote: "This is a simulation: everything runs in your browser and never touches your real machine or accounts.",
    missionsTitle: "Missions",
    missionDone: "Done",
    allMissionsDone: "You have finished every mission for this tool.",
    reset: "Start over",
    tools: {
      terminal: {
        name: "Terminal",
        title: "Linux command line, Git and Docker",
        subtitle: "Move around folders, create and edit files, commit with Git, run containers - the commands you type every day.",
      },
      editor: {
        name: "Code Editor",
        title: "A VS Code-style editor",
        subtitle: "File tree, tabs, edit HTML/CSS/JavaScript and see the page run next to it, with a console.",
      },
      sql: {
        name: "SQL Console",
        title: "Query a database",
        subtitle: "Type SELECT, JOIN, GROUP BY against a sample shop database and see the results as a table.",
      },
      api: {
        name: "API Client",
        title: "Call APIs like Postman",
        subtitle: "Send GET, POST, PUT, DELETE to a sample API and read the status code, headers and JSON response.",
      },
      cloud: {
        name: "Cloud Console",
        title: "A cloud control panel",
        subtitle: "Launch virtual servers, storage buckets and databases; put a website online and watch the monthly bill.",
      },
    },
  },
};
