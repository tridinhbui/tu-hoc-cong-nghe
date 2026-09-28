// Display labels that live inside lib/*.ts data modules rather than in a
// .tsx file. Everything here sits under one top-level
// `libData` key, grouped by the module it labels:
//
//   lib/document-categories.ts        -> libData.documentCategories
//   lib/tech-cards.ts              -> libData.techCards
//   lib/highlight-stage-grouping.ts   -> libData.highlightStages
//
// Keys are the modules' own stable ids (a document category's `value`, a
// tech card's `id`) so the dictionary lookup and the underlying data never
// drift apart by position.
//
// Câu trên đây từng viết rằng những chuỗi này "vô hình với
// scripts/i18n-coverage.mjs, vốn chỉ chấm vị trí hiển thị trong .tsx". Điều đó
// hết đúng từ khi luật `data` được thêm vào bộ đếm để quét cả `const` ở phạm vi
// module trong lib/ - và chính vì thế ba tệp nguồn ở trên vẫn bị đếm là "chưa
// dịch" dù đã dịch xong. Chúng được tách khỏi tổng ở OVERLAY_COMPLETE, với điều
// kiện là lib/__tests__/lib-data-translations.test.ts bắt buộc đủ khoá - vì
// Record<string, string> nhận mọi khoá, nên thêm một thẻ mới mà quên khoá từ
// điển thì nó hiện tiếng Việt giữa giao diện tiếng Anh, không có gì báo.

export const libDataVi = {
  libData: {
    // lib/study-room-lighting.ts - nhãn thời điểm trong ngày của phòng học 3D.
    // Khoá là RoomTimeOfDay, không phải chỉ số mảng.
    roomTimeOfDay: {
      dawn: "Rạng sáng",
      morning: "Buổi sáng",
      afternoon: "Buổi chiều",
      dusk: "Hoàng hôn",
      night: "Buổi tối",
      lateNight: "Khuya",
    },


    // lib/weekly-career-mission.ts - nhiệm vụ nghề nghiệp hằng tuần.

    timeAgo: {
      justNow: "Vừa xong",
      minutes: "{n} phút trước",
      hours: "{n} giờ trước",
      days: "{n} ngày trước",
    },
    // lib/cloudflare-user.ts - câu vinh danh học viên trong lời chào của trợ lý.
    // Bốn biến thể để không lặp lại y hệt mỗi lần mở; hàm ở tầng dữ liệu chỉ
    // chọn CHỈ SỐ biến thể, câu dựng ở phía người đọc.
    shoutouts: [
      "{name} vừa đạt {value} XP - một trong những học viên chăm chỉ nhất cộng đồng!",
      "Chúc mừng {name} đã tích luỹ {value} XP - hành trình học tập rất ấn tượng!",
      "{name} đang giữ phong độ cực tốt với {value} XP tích luỹ được!",
      "Vinh danh {name} - đã đạt {value} XP nhờ học đều đặn mỗi ngày!",
    ],
    // lib/cloudflare-chat.ts - lý do một tệp bị từ chối khi gửi trong chat.
    chatUpload: {
      imageType: "Chỉ chấp nhận ảnh PNG, JPG, WEBP hoặc GIF.",
      imageTooLarge: "Ảnh vượt quá giới hạn 8MB.",
      fileType: "Chỉ chấp nhận PDF, Word, Excel, PowerPoint, TXT, CSV hoặc ZIP.",
      fileTooLarge: "Tệp vượt quá giới hạn 15MB.",
    },
    // lib/streak-reminders.ts - nội dung thông báo đẩy nhắc học.
    reminders: {
      streakTitle: "Sắp hết ngày rồi!",
      streakBody: "Học 1 bài để giữ streak {days} ngày của bạn nhé.",
      recallTitle: "Có bài ôn tập đến hạn",
      recallBodyOne: "Bạn có 1 bài ôn tập đến hạn hôm nay.",
      recallBodyMany: "Bạn có {count} bài ôn tập đến hạn hôm nay.",
    },
    documentCategories: {
      "mau-bieu": "Mẫu biểu",
      ebook: "Ebook / Tài liệu đọc",
      checklist: "Checklist",
      "cong-cu": "Công cụ (Excel/Sheet)",
      khac: "Khác",
    },
    techCards: {
      "card-fpt": {
        name: "Python",
        sector: "Ngôn ngữ lập trình",
        description: "Ngôn ngữ dễ đọc, dùng từ tự động hoá việc lặt vặt tới phân tích dữ liệu và huấn luyện mô hình AI.",
        advantage: "Hệ sinh thái thư viện khổng lồ cho dữ liệu và AI, cú pháp gần với ngôn ngữ tự nhiên.",
        metrics: ["Số thư viện trên PyPI", "Tốc độ thực thi", "Độ phủ chú thích kiểu"],
      },
      "card-vnm": {
        name: "PostgreSQL",
        sector: "Cơ sở dữ liệu quan hệ",
        description: "Hệ quản trị cơ sở dữ liệu mã nguồn mở, giữ dữ liệu nhất quán bằng transaction ACID.",
        advantage: "Hỗ trợ SQL đầy đủ, mở rộng được bằng kiểu dữ liệu và chỉ mục riêng.",
        metrics: ["Truy vấn mỗi giây", "Độ trễ truy vấn", "Tỷ lệ trúng bộ đệm"],
      },
      "card-vcb": {
        name: "Linux",
        sector: "Hệ điều hành",
        description: "Nhân hệ điều hành chạy phần lớn máy chủ, điện thoại Android và siêu máy tính trên thế giới.",
        advantage: "Mã nguồn mở, được hàng nghìn công ty cùng đóng góp và cùng soát lỗi.",
        metrics: ["Thời gian hoạt động", "Tải CPU", "Bộ nhớ đã dùng"],
      },
      "card-hpg": {
        name: "Docker",
        sector: "Đóng gói ứng dụng",
        description: "Đóng gói ứng dụng cùng mọi phụ thuộc vào container để chạy giống nhau trên mọi máy.",
        advantage: "Xoá bỏ câu \"máy tôi chạy được mà\": môi trường phát triển và môi trường thật dùng chung một ảnh.",
        metrics: ["Kích thước ảnh", "Thời gian khởi động", "Số container"],
      },
      "card-mwg": {
        name: "React",
        sector: "Thư viện giao diện web",
        description: "Thư viện dựng giao diện từ những thành phần nhỏ, tự cập nhật khi dữ liệu thay đổi.",
        advantage: "Cộng đồng rất lớn, và cách nghĩ theo thành phần dùng lại được cả trên web lẫn di động.",
        metrics: ["Thời gian hiển thị đầu", "Kích thước gói JS", "Số lần render lại"],
      },
      "card-msn": {
        name: "Kubernetes",
        sector: "Điều phối container",
        description: "Hệ thống tự xếp container lên cụm máy chủ, tự khởi động lại khi hỏng và mở rộng theo tải.",
        advantage: "Mô tả trạng thái mong muốn một lần, hệ thống tự kéo thực tế về đúng như vậy.",
        metrics: ["Số pod", "Tỷ lệ khởi động lại", "Mức dùng tài nguyên cụm"],
      },
      "card-vhm": {
        name: "Amazon Web Services",
        sector: "Điện toán đám mây",
        description: "Nền tảng đám mây cho thuê máy chủ, lưu trữ, cơ sở dữ liệu và hàng trăm dịch vụ khác theo giờ.",
        advantage: "Hạ tầng trải khắp nhiều vùng trên thế giới, bật một máy chủ mới chỉ mất vài phút.",
        metrics: ["Chi phí mỗi tháng", "Số vùng triển khai", "Độ khả dụng"],
      },
      "card-ssi": {
        name: "JavaScript",
        sector: "Ngôn ngữ của trình duyệt",
        description: "Ngôn ngữ duy nhất chạy sẵn trong mọi trình duyệt, giúp trang web phản ứng với người dùng.",
        advantage: "Viết được cả giao diện lẫn máy chủ (Node.js) bằng cùng một ngôn ngữ.",
        metrics: ["Thời gian tải trang", "Số lỗi JavaScript", "Kích thước gói"],
      },
      "card-gas": {
        name: "Redis",
        sector: "Bộ nhớ đệm trong RAM",
        description: "Kho khoá - giá trị nằm trong bộ nhớ, trả lời trong vài phần nghìn giây.",
        advantage: "Giảm tải cho cơ sở dữ liệu chính bằng cách giữ sẵn những dữ liệu hay được đọc.",
        metrics: ["Tỷ lệ trúng cache", "Độ trễ đọc", "Bộ nhớ đã dùng"],
      },
      "card-vic": {
        name: "Git",
        sector: "Quản lý phiên bản",
        description: "Hệ thống ghi lại lịch sử mọi thay đổi của mã, cho phép nhiều người làm song song trên các nhánh.",
        advantage: "Mỗi bản sao là một kho đầy đủ, nên vẫn làm việc được cả khi mất mạng.",
        metrics: ["Số commit", "Số nhánh đang mở", "Thời gian review"],
      },
    },
    highlightStages: {
      other: {
        label: "Khác",
        name: "Bài case, bài bổ sung và nội dung ngoài lộ trình",
      },
    },
  },
};

export const libDataEn: typeof libDataVi = {
  libData: {
    roomTimeOfDay: {
      dawn: "Dawn",
      morning: "Morning",
      afternoon: "Afternoon",
      dusk: "Dusk",
      night: "Evening",
      lateNight: "Late night",
    },



    timeAgo: {
      justNow: "Just now",
      minutes: "{n}m ago",
      hours: "{n}h ago",
      days: "{n}d ago",
    },
    shoutouts: [
      "{name} just hit {value} XP - one of the hardest-working learners here!",
      "Congratulations {name} on {value} XP - a genuinely impressive run.",
      "{name} is on great form, {value} XP and counting!",
      "Hats off to {name} - {value} XP from showing up every day.",
    ],
    chatUpload: {
      imageType: "Only PNG, JPG, WEBP or GIF images are accepted.",
      imageTooLarge: "That image is over the 8MB limit.",
      fileType: "Only PDF, Word, Excel, PowerPoint, TXT, CSV or ZIP files are accepted.",
      fileTooLarge: "That file is over the 15MB limit.",
    },
    reminders: {
      streakTitle: "The day is nearly over",
      streakBody: "One lesson keeps your {days}-day streak alive.",
      recallTitle: "You have reviews due",
      recallBodyOne: "You have 1 review due today.",
      recallBodyMany: "You have {count} reviews due today.",
    },
    documentCategories: {
      "mau-bieu": "Templates",
      ebook: "Ebook / Reading material",
      checklist: "Checklist",
      "cong-cu": "Tool (Excel/Sheet)",
      khac: "Other",
    },
    techCards: {
      "card-fpt": {
        name: "Python",
        sector: "Programming language",
        description: "A readable language used for everything from automating chores to data analysis and training AI models.",
        advantage: "A huge library ecosystem for data and AI, with syntax close to plain language.",
        metrics: ["Packages on PyPI", "Execution speed", "Type-hint coverage"],
      },
      "card-vnm": {
        name: "PostgreSQL",
        sector: "Relational database",
        description: "An open-source database system that keeps data consistent with ACID transactions.",
        advantage: "Full SQL support, extensible with custom data types and indexes.",
        metrics: ["Queries per second", "Query latency", "Buffer cache hit rate"],
      },
      "card-vcb": {
        name: "Linux",
        sector: "Operating system",
        description: "The operating system kernel behind most of the world's servers, Android phones and supercomputers.",
        advantage: "Open source, contributed to and reviewed by thousands of companies together.",
        metrics: ["Uptime", "CPU load", "Memory used"],
      },
      "card-hpg": {
        name: "Docker",
        sector: "Application packaging",
        description: "Packages an application and all its dependencies into a container that runs the same on every machine.",
        advantage: "Ends \"it works on my machine\": development and production share one image.",
        metrics: ["Image size", "Start-up time", "Container count"],
      },
      "card-mwg": {
        name: "React",
        sector: "Web UI library",
        description: "A library that builds interfaces from small components that update themselves when data changes.",
        advantage: "A very large community, and a component mindset that carries over to both web and mobile.",
        metrics: ["First contentful paint", "JS bundle size", "Re-render count"],
      },
      "card-msn": {
        name: "Kubernetes",
        sector: "Container orchestration",
        description: "A system that places containers across a server cluster, restarts them when they fail and scales them with load.",
        advantage: "Describe the desired state once and the system keeps pulling reality back to it.",
        metrics: ["Pod count", "Restart rate", "Cluster resource usage"],
      },
      "card-vhm": {
        name: "Amazon Web Services",
        sector: "Cloud computing",
        description: "A cloud platform renting servers, storage, databases and hundreds of other services by the hour.",
        advantage: "Infrastructure spread across many regions worldwide; a new server is minutes away.",
        metrics: ["Monthly cost", "Regions deployed", "Availability"],
      },
      "card-ssi": {
        name: "JavaScript",
        sector: "The browser's language",
        description: "The only language built into every browser, letting web pages respond to the user.",
        advantage: "One language for both the interface and the server (Node.js).",
        metrics: ["Page load time", "JavaScript errors", "Bundle size"],
      },
      "card-gas": {
        name: "Redis",
        sector: "In-memory cache",
        description: "A key-value store held in memory that answers in fractions of a millisecond.",
        advantage: "Takes load off the main database by keeping frequently read data at hand.",
        metrics: ["Cache hit rate", "Read latency", "Memory used"],
      },
      "card-vic": {
        name: "Git",
        sector: "Version control",
        description: "A system that records every change to the code and lets many people work in parallel on branches.",
        advantage: "Every clone is a complete repository, so work continues even offline.",
        metrics: ["Commits", "Open branches", "Review time"],
      },
    },
    highlightStages: {
      other: {
        label: "Other",
        name: "Case studies, supplementary lessons, and content outside the track",
      },
    },
  },
};
