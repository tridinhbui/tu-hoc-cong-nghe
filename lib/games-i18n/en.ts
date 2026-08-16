import type { GamesTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của phần VỎ trong lib/games.ts - tên trò, mô tả, nhãn
 * nhóm, câu hướng dẫn và danh hiệu xếp hạng.
 *
 * KHÔNG dịch nội dung chơi, và ranh giới đó không phải để tiết kiệm công:
 *
 *   - `en-vi-terms` ghép thuật ngữ TIẾNG VIỆT với thuật ngữ TIẾNG ANH, và pool
 *     của nó dựng thẳng từ FINANCE_GLOSSARY. Dịch vế trái sang tiếng Anh thì
 *     hai cột cùng một thứ tiếng và trò chơi không còn gì để ghép. `random-mix`
 *     trộn chính pool đó vào nên dính theo.
 *   - `TICKER_PAIRS` là tên doanh nghiệp ↔ mã cổ phiếu ("Vingroup ↔ VIC").
 *     Danh từ riêng; dịch là sai chứ không phải là thừa.
 *
 * Các pool còn lại (khoản mục báo cáo, tỷ số, nhóm rủi ro, chi phí, cặp
 * thuật ngữ - định nghĩa, tên - công thức) nằm trong `content` bên dưới.
 *
 * `emoji`, `accent`, `id`, `mechanic` là cấu trúc - đọc từ phía tiếng Việt.
 */
export const gamesEn: GamesTranslation = {
  special: {
    "wall-street-millionaire": {
      title: "Who Wants to Be a Wall Street Millionaire",
      description:
        "15 advanced finance questions with game-show style lifelines.",
    },
    "dcf-mastermind": {
      title: "DCF & M&A Valuation Arena",
      description:
        "Work through 5 M&A deals, set an intrinsic target price, and call buy or walk away.",
    },
    "snowball-racer": {
      title: "Compounding Snowball Race",
      description:
        "Pick an investment strategy across 20 years and try to reach $1,000,000 on compounding alone.",
    },
  },

  difficulties: {
    de: { label: "Easy", hint: "Fewer cards, no time limit" },
    "trung-binh": { label: "Medium", hint: "Default card count, no time limit" },
    kho: { label: "Hard", hint: "More cards + a 60-second limit" },
  },

  games: {
    "random-mix": {
      title: "🎲 Random mix of every topic",
      description:
        "The all-round challenge: statements, terms, ratios, formulas and risk, shuffled together.",
    },
    "financial-statement-match": {
      title: "Financial statements",
      description:
        "Drag each component onto the right tier (client / service / data & infrastructure).",
    },
    "en-vi-terms": {
      title: "English - Vietnamese terms",
      description:
        "Match each finance term in English with its Vietnamese counterpart, taken from the lessons you have studied.",
    },
    "ratio-category": {
      title: "Sorting financial ratios",
      description:
        "Drag each ratio into the right family: liquidity / profitability / leverage / efficiency.",
    },
    "term-definition": {
      title: "Terms & definitions",
      description: "Match each finance term with the short definition that fits it.",
    },
    "formula-match": {
      title: "Names & formulas",
      description:
        "Match each ratio's name with the formula that computes it (ROE, P/E, current ratio...).",
    },
    "risk-category": {
      title: "Sorting investment risk",
      description: "Drag each asset type into the right risk band: low / medium / high.",
    },
    "ticker-match": {
      title: "Stock tickers",
      description: "Match each listed company with its ticker on the exchange.",
    },
    "cost-category": {
      title: "Sorting costs",
      description: "Drag each cost into the right group: fixed or variable.",
    },
  },

  statementLabels: {
    frontend: "Client tier",
    backend: "Service tier",
    data: "Data & infrastructure tier",
  },

  buckets: {
    "financial-statement-match": {
      sourceHint: "Drag or tap a card, then drop it on the right statement",
    },
    "ratio-category": {
      sourceHint: "Drag or tap a ratio, then drop it in the right family",
      labels: {
        latency: "Latency",
        throughput: "Throughput",
        reliability: "Reliability",
        cost: "Cost",
      },
    },
    "risk-category": {
      sourceHint: "Drag or tap a change, then drop it on the right risk level",
      labels: {
        low: "Low risk",
        medium: "Medium risk",
        high: "High risk",
      },
    },
    "cost-category": {
      sourceHint: "Drag or tap a cost, then drop it in the right group",
      labels: {
        fixed: "Fixed costs",
        variable: "Variable costs",
      },
    },
  },

  pairs: {
    "term-definition": {
      leftLabel: "Term",
      rightLabel: "Definition",
      hint: "Tap a term then tap its definition (or drag and drop) to make a pair.",
    },
    "formula-match": {
      leftLabel: "Ratio name",
      rightLabel: "Formula",
      hint: "Tap a ratio name then tap its formula (or drag and drop) to make a pair.",
    },
    "ticker-match": {
      leftLabel: "Company",
      rightLabel: "Ticker",
      hint: "Tap a company then tap its ticker (or drag and drop) to make a pair.",
    },
    randomMix: {
      leftLabel: "Term / name",
      rightLabel: "Definition / ticker / concept",
      hint: "Random mix: match pairs drawn from several different topics.",
    },
    // Nhãn cột của `en-vi-terms`. Hai nhãn này PHẢI giữ đúng nghĩa ngôn ngữ:
    // cột trái là thẻ tiếng Việt, cột phải là thẻ tiếng Anh, và người chơi
    // tiếng Anh vẫn cần biết bên nào là bên nào.
    fallback: {
      leftLabel: "Vietnamese",
      rightLabel: "English",
      hint: "Drag and drop, or tap one card then tap its match, to make a pair.",
    },
  },

  titles: {
    "random-mix": ["Grandmaster of the Random Mix", "Wizard of All Topics", "Shuffle Champion"],
    "financial-statement-match": [
      "Architect of the Universe",
      "Deity of System Tiers",
      "Grandmaster of System Tiers",
    ],
    "en-vi-terms": ["Bilingual Tech Sorcerer", "Saint of Terminology", "Silicon Valley Translator"],
    "ratio-category": ["Master of Metrics", "Analyst Supreme", "Metrics Overlord"],
    "term-definition": ["Living Dictionary", "Tech Scholar", "Encyclopaedic Brain"],
    "formula-match": ["Formula Prodigy", "Sorcerer of Numbers", "Quant Champion"],
    "risk-category": ["Guardian of the Release", "Risk Management Champion", "Master of Change Review"],
    "ticker-match": ["Spirit of the Trading Floor", "Champion Tape Reader", "Ticker Legend"],
    "cost-category": [
      "Cost Accountant Supreme",
      "Master of Fixed & Variable",
      "Legend of Cost Classification",
    ],
  },

  combinedTitles: ["Mini Game Legend", "Finance Grandmaster", "All-Round Champion"],

  // ─────────────────────────────────────────────────────────────────────────
  // NỘI DUNG CHƠI. Khoá là CHUỖI TIẾNG VIỆT, không phải id - những mảng này
  // không có id, và khoá theo vị trí thì thêm một khoản mục vào giữa danh
  // sách là lệch hết phần còn lại mà không có gì báo.
  //
  // Ai gọi tới quyết định pool nào được dịch, KHÔNG phải bảng này (xem
  // localizePairConfig). Tra theo chuỗi mà không chọn pool thì "Thanh khoản"
  // trong pool vi↔en cũng thành "Liquidity", và cột phải của nó vốn đã là
  // "Liquidity" - trò chơi hiện hai thẻ giống hệt nhau ở hai cột.
  content: {
    "Thành phần React dựng danh sách sản phẩm": "A React component rendering the product list",
    "Biểu định kiểu CSS và bố cục responsive": "CSS stylesheets and responsive layout",
    "Kiểm tra hợp lệ biểu mẫu ngay trên trình duyệt": "Form validation right there in the browser",
    "Bộ định tuyến trang phía client": "The client-side page router",
    "Trạng thái cục bộ của một màn hình": "A screen's local state",
    "Ảnh và font tải kèm trang": "Images and fonts loaded with the page",
    "Service worker cho chế độ ngoại tuyến": "A service worker for offline mode",
    "Nhãn ARIA cho trình đọc màn hình": "ARIA labels for screen readers",
    "Hoạt ảnh chuyển trang": "Page transition animations",
    "localStorage giữ giỏ hàng tạm": "localStorage holding a draft cart",
    "Chia gói JavaScript theo tuyến đường": "Splitting the JavaScript bundle per route",
    "Chủ đề sáng/tối lưu theo thiết bị": "A light/dark theme saved per device",
    "Đo Core Web Vitals trên máy người dùng": "Measuring Core Web Vitals on the user's machine",
    "Endpoint REST trả danh sách đơn hàng": "A REST endpoint returning the order list",
    "Middleware xác thực JWT": "JWT authentication middleware",
    "Quy tắc phân quyền theo vai trò": "Role-based authorisation rules",
    "Giới hạn tần suất gọi API": "API rate limiting",
    "Hàng đợi xử lý việc nền": "The background job queue",
    "Tác vụ định kỳ chạy theo lịch (cron)": "Scheduled recurring jobs (cron)",
    "Gọi cổng thanh toán bên thứ ba": "Calling a third-party payment gateway",
    "Tầng nghiệp vụ tính giá và khuyến mãi": "The business layer computing prices and discounts",
    "Ghi log có cấu trúc cho mỗi request": "Structured logging for every request",
    "Kiểm tra sức khoẻ dịch vụ (health check)": "Service health checks",
    "Sinh và ký lại refresh token": "Issuing and re-signing refresh tokens",
    "Xử lý webhook đến từ đối tác": "Handling inbound partner webhooks",
    "Bộ chuyển đổi dữ liệu trước khi trả về client": "The serializer that shapes data before it reaches the client",
    "Thử lại có độ trễ tăng dần khi gọi dịch vụ ngoài": "Retrying an outbound call with exponential backoff",
    "Bảng người dùng và chỉ mục trên email": "The users table and its index on email",
    "Migration thêm cột vào bảng đơn hàng": "A migration adding a column to the orders table",
    "Bản sao chỉ đọc của cơ sở dữ liệu": "A read replica of the database",
    "Sao lưu hằng đêm và thử khôi phục": "Nightly backups and restore drills",
    "Redis làm bộ nhớ đệm phiên đăng nhập": "Redis caching login sessions",
    "Kho lưu trữ đối tượng chứa ảnh tải lên": "Object storage holding uploaded images",
    "CDN phân phối tệp tĩnh": "A CDN serving static files",
    "Cân bằng tải trước cụm máy chủ": "A load balancer in front of the server pool",
    "Container và tệp cấu hình triển khai": "Containers and deployment manifests",
    "Chứng chỉ TLS và bản ghi DNS": "TLS certificates and DNS records",
    "Kho dữ liệu phục vụ báo cáo": "The warehouse that serves reporting",
    "Hệ thống giám sát và cảnh báo": "Monitoring and alerting",
    "Quản lý bí mật và biến môi trường": "Secret management and environment variables",
    "Nhóm tự mở rộng theo tải": "An autoscaling group that follows load",
    "Giao diện để hai chương trình gọi nhau": "An interface for two programs to call each other",
    "Bộ nhớ đệm giữ lại kết quả đã tính để khỏi tính lại": "A store that keeps a computed result so it need not be computed again",
    "Gọi nhiều lần cho cùng một kết quả như gọi một lần": "Calling it many times gives the same result as calling it once",
    "Lỗi do hai luồng cùng chạm một dữ liệu không có khoá": "A bug from two threads touching the same unlocked data",
    "Cấu trúc giúp tìm dòng mà không phải quét cả bảng": "A structure that finds rows without scanning the whole table",
    "Thành phần chia lưu lượng cho nhiều máy chủ": "A component that spreads traffic across several servers",
    "Hai tiến trình cùng chờ tài nguyên của nhau, không ai đi tiếp": "Two processes each waiting on the other's resource, so neither moves",
    "Cách mô tả số bước tăng ra sao khi dữ liệu lớn dần": "A way to describe how the step count grows as the data grows",
    "Sửa cấu trúc mã mà không đổi hành vi bên ngoài": "Changing the code's structure without changing its outward behaviour",
    "Đưa hệ thống về bản phát hành trước khi có lỗi": "Returning the system to the release before the fault",
    "Giới hạn số lần gọi trong một khoảng thời gian": "A cap on how many calls are allowed in a time window",
    "Cơ chế tự thu hồi bộ nhớ không còn ai tham chiếu": "The mechanism that reclaims memory nothing references any more",
    "Index (CSDL)": "Index (database)",
    "Thời gian hoạt động / Tổng thời gian": "Time up / Total time",
    "Số request lỗi / Tổng số request": "Failed requests / Total requests",
    "Số request / Đơn vị thời gian": "Requests / Unit of time",
    "Số lần trúng / (Trúng + Trượt)": "Hits / (Hits + Misses)",
    "Tổng chi phí hạ tầng / Số request": "Total infrastructure cost / Requests",
    "Tổng thời gian khôi phục / Số sự cố": "Total recovery time / Number of incidents",
    "Số dòng được chạy bởi test / Tổng số dòng": "Lines exercised by tests / Total lines",
    "1 − Mục tiêu SLO": "1 − the SLO target",
    "Thông lượng sau / Thông lượng trước": "Throughput after / Throughput before",
    "Tổng thời gian phản hồi / Số request": "Total response time / Requests",
    "Tỷ lệ lỗi": "Error rate",
    "Thông lượng": "Throughput",
    "Chi phí mỗi request": "Cost per request",
    "Độ phủ kiểm thử": "Test coverage",
    "Ngân sách lỗi": "Error budget",
    "Hệ số mở rộng": "Scaling factor",
    "Độ trễ trung bình": "Average latency",
    // ── Bộ dữ liệu công nghệ ──
    "Đổi tên biến cục bộ": "Renaming a local variable",
    "Thêm một bài kiểm thử mới": "Adding a new test",
    "Sửa lỗi chính tả trong tài liệu": "Fixing a typo in the docs",
    "Thêm log vào một hàm sẵn có": "Adding a log line to an existing function",
    "Nâng phiên bản thư viện lên bản vá": "Bumping a library to a patch release",
    "Thêm một cột mới vào bảng dữ liệu": "Adding a new column to a table",
    "Đổi cấu hình cache": "Changing the cache configuration",
    "Tách một hàm lớn thành nhiều hàm nhỏ": "Splitting a large function into smaller ones",
    "Đổi kiểu dữ liệu của một cột đang dùng": "Changing the type of a column already in use",
    "Xoá một endpoint API công khai": "Deleting a public API endpoint",
    "Di trú cơ sở dữ liệu sang máy chủ khác": "Migrating the database to another server",
    "Đổi thuật toán băm mật khẩu": "Changing the password hashing algorithm",
    "Thuê máy chủ theo tháng": "Monthly server rental",
    "Gói giám sát trả cố định hàng tháng": "A fixed monthly monitoring plan",
    "Khấu hao thiết bị phòng máy": "Depreciation on server room hardware",
    "Phí tên miền và chứng chỉ TLS": "Domain and TLS certificate fees",
    "Lương đội vận hành": "The operations team's salaries",
    "Phí bản quyền phần mềm theo năm": "Annual software licence fees",
    "Băng thông truyền ra Internet": "Outbound internet bandwidth",
    "Số lần gọi hàm serverless": "Serverless function invocations",
    "Dung lượng lưu trữ đối tượng đã dùng": "Object storage actually used",
    "Phí gửi email theo số lượng": "Per-message email sending fees",
    "Token gọi API mô hình ngôn ngữ": "Tokens spent calling a language model API",
    "Phí ghi log theo số dòng": "Log ingestion charged per line",
    "Độ trễ trung vị (p50)": "Median latency (p50)",
    "Độ trễ đuôi (p99)": "Tail latency (p99)",
    "Thời gian phản hồi đầu tiên (TTFB)": "Time to first byte (TTFB)",
    "Số request mỗi giây (RPS)": "Requests per second (RPS)",
    "Số công việc xử lý mỗi phút": "Jobs processed per minute",
    "Băng thông thực tế": "Effective bandwidth",
    "Tỷ lệ lỗi 5xx": "5xx error rate",
    "Thời gian hoạt động (uptime)": "Uptime",
    "Thời gian khôi phục trung bình (MTTR)": "Mean time to recovery (MTTR)",
    "Chi phí trên mỗi request": "Cost per request",
    "Mức dùng CPU trung bình": "Average CPU utilisation",
    "Tỷ lệ trúng cache": "Cache hit rate",
    // ── Khoản mục bảng cân đối kế toán ──

    // ── Khoản mục báo cáo kết quả kinh doanh ──

    // ── Khoản mục báo cáo lưu chuyển tiền tệ ──

    // ── Tỷ số tài chính (những cái còn tiếng Việt; ROE, Quick Ratio... đã là
    //    tiếng Anh sẵn nên không có mặt ở đây) ──

    // ── Nhóm rủi ro đầu tư ──

    // ── Chi phí cố định / biến đổi. Chú thích trong ngoặc là ĐỀ BÀI, không
    //    phải trang trí: "(theo sản lượng)" chính là thứ khiến khoản mục đó
    //    là chi phí biến đổi, nên nó phải sang tiếng Anh nguyên vẹn. ──

    // ── Cặp thuật ngữ - định nghĩa (vế trái nào đã là tiếng Anh thì vắng mặt) ──

    // ── Cặp tên chỉ số - công thức. Giữ nguyên dấu "/" và "−" của bản gốc:
    //    đây là công thức, không phải câu văn. Hai dòng cuối trông na ná hai
    //    dòng ngay trên trong nhóm định nghĩa và ĐÚNG là phải khác nhau -
    //    trộn ngẫu nhiên có thể rút cả hai vào cùng một ván, và hai thẻ giống
    //    hệt nhau ở cột phải là một ván không giải được. ──
  },
};
