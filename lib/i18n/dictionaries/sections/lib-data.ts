// Display labels that live inside lib/*.ts data modules rather than in a
// .tsx file. Everything here sits under one top-level
// `libData` key, grouped by the module it labels:
//
//   lib/document-categories.ts        -> libData.documentCategories
//   lib/finance-cards.ts              -> libData.financeCards
//   lib/highlight-stage-grouping.ts   -> libData.highlightStages
//
// Keys are the modules' own stable ids (a document category's `value`, a
// finance card's `id`) so the dictionary lookup and the underlying data never
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
    // lib/supabase-user.ts - câu vinh danh học viên trong lời chào của trợ lý.
    // Bốn biến thể để không lặp lại y hệt mỗi lần mở; hàm ở tầng dữ liệu chỉ
    // chọn CHỈ SỐ biến thể, câu dựng ở phía người đọc.
    shoutouts: [
      "🎉 {name} vừa đạt {value} XP - một trong những học viên chăm chỉ nhất cộng đồng!",
      "👏 Chúc mừng {name} đã tích luỹ {value} XP - hành trình học tập rất ấn tượng!",
      "🔥 {name} đang giữ phong độ cực tốt với {value} XP tích luỹ được!",
      "⭐ Vinh danh {name} - đã đạt {value} XP nhờ học đều đặn mỗi ngày!",
    ],
    // lib/supabase-chat.ts - lý do một tệp bị từ chối khi gửi trong chat.
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
    financeCards: {
      "card-fpt": {
        name: "Tập đoàn FPT",
        sector: "Phần mềm & dịch vụ CNTT",
        description: "Nhà xuất khẩu phần mềm lớn nhất Việt Nam, làm dự án cho khách nước ngoài.",
        advantage: "Quy mô kỹ sư, quy trình giao hàng theo dự án và mảng đào tạo tự nuôi nguồn nhân lực.",
        metrics: ["Số kỹ sư", "Dự án ký mới", "Tỷ lệ giữ người"],
      },
      "card-vnm": {
        name: "Vinamilk",
        sector: "Chuỗi cung ứng & ERP",
        description: "Chuỗi cung ứng lạnh điều phối bởi hệ ERP phủ hàng nghìn điểm phân phối.",
        advantage: "Dữ liệu tồn kho theo thời gian thực và hệ hoạch định nhu cầu chạy trên toàn quốc.",
        metrics: ["Điểm phân phối", "Độ chính xác dự báo", "Thời gian giao hàng"],
      },
      "card-vcb": {
        name: "Vietcombank",
        sector: "Hệ thống giao dịch trực tuyến",
        description: "Core banking và ứng dụng di động phục vụ hàng chục triệu người dùng mỗi ngày.",
        advantage: "Khối lượng giao dịch lớn nhất hệ thống, kèm yêu cầu uptime gần như tuyệt đối.",
        metrics: ["Giao dịch mỗi giây", "Uptime", "Người dùng hoạt động"],
      },
      "card-hpg": {
        name: "Tập đoàn Hòa Phát",
        sector: "Tự động hoá công nghiệp",
        description: "Nhà máy tích hợp với dây chuyền điều khiển tự động và cảm biến khắp chuyền.",
        advantage: "Hệ SCADA giám sát liên tục và dữ liệu vận hành thu thẳng từ dây chuyền.",
        metrics: ["Thời gian dừng máy", "Điểm đo cảm biến", "Sản lượng mỗi ca"],
      },
      "card-mwg": {
        name: "Thế Giới Di Động",
        sector: "Thương mại điện tử",
        description: "Nền tảng bán lẻ đa kênh nối hàng nghìn cửa hàng vào một kho dữ liệu chung.",
        advantage: "Hệ điểm bán, đồng bộ tồn kho theo thời gian thực và dữ liệu khách hàng tích luỹ nhiều năm.",
        metrics: ["Đơn mỗi ngày", "Độ trễ đồng bộ tồn kho", "Tỷ lệ lỗi thanh toán"],
      },
      "card-msn": {
        name: "Tập đoàn Masan",
        sector: "Nền tảng dữ liệu",
        description: "Hệ sinh thái bán lẻ - tiêu dùng chạy trên một nền dữ liệu khách hàng dùng chung.",
        advantage: "Gộp dữ liệu nhiều mảng về một chỗ, ở quy mô đủ lớn để mô hình học được thật.",
        metrics: ["Người dùng định danh", "Điểm dữ liệu mỗi ngày", "Độ trễ báo cáo"],
      },
      "card-vhm": {
        name: "Vinhomes",
        sector: "Hạ tầng số đô thị",
        description: "Khu đô thị vận hành bằng hệ quản lý cư dân, kiểm soát ra vào và thiết bị IoT.",
        advantage: "Hạ tầng mạng lắp sẵn ngay từ lúc xây, và một tập thiết bị đầu cuối rất lớn.",
        metrics: ["Thiết bị kết nối", "Căn hộ vận hành", "Sự cố hệ thống"],
      },
      "card-ssi": {
        name: "Chứng khoán SSI",
        sector: "Hệ thống độ trễ thấp",
        description: "Hệ khớp lệnh và ứng dụng giao dịch chịu tải dồn thành từng đợt theo phiên.",
        advantage: "Kinh nghiệm xử lý đỉnh tải trong vài phút mở cửa, với độ trễ tính bằng mili giây.",
        metrics: ["Độ trễ khớp lệnh", "Lệnh mỗi giây", "Đỉnh tải phiên"],
      },
      "card-gas": {
        name: "PV Gas",
        sector: "Hệ điều khiển công nghiệp",
        description: "Đường ống và nhà máy khí giám sát bằng hệ điều khiển công nghiệp chạy 24/7.",
        advantage: "Mạng cảm biến trải dài, và yêu cầu an toàn khiến mọi thay đổi đều phải quay lui được.",
        metrics: ["Trạm giám sát", "Cảnh báo mỗi tháng", "Thời gian phản hồi"],
      },
      "card-vic": {
        name: "Tập đoàn Vingroup",
        sector: "Tập đoàn công nghệ đa mảng",
        description: "Tập đoàn có mảng xe điện, phần mềm nhúng và hạ tầng dữ liệu tự vận hành.",
        advantage: "Tự viết phần mềm cho phần cứng của chính mình, từ lớp nhúng lên tới đám mây.",
        metrics: ["Xe kết nối", "Bản cập nhật OTA", "Trung tâm dữ liệu"],
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
      "🎉 {name} just hit {value} XP - one of the hardest-working learners here!",
      "👏 Congratulations {name} on {value} XP - a genuinely impressive run.",
      "🔥 {name} is on great form, {value} XP and counting!",
      "⭐ Hats off to {name} - {value} XP from showing up every day.",
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
    financeCards: {
      "card-fpt": {
        name: "FPT Corporation",
        sector: "Software & IT services",
        description: "Vietnam's largest software exporter, delivering projects for overseas clients.",
        advantage: "Engineer headcount, a project delivery process, and a training arm that feeds its own hiring.",
        metrics: ["Engineer headcount", "New projects signed", "Retention rate"],
      },
      "card-vnm": {
        name: "Vinamilk",
        sector: "Supply chain & ERP",
        description: "A cold supply chain coordinated by an ERP that reaches thousands of distribution points.",
        advantage: "Real-time inventory data and demand planning running across the whole country.",
        metrics: ["Distribution points", "Forecast accuracy", "Delivery lead time"],
      },
      "card-vcb": {
        name: "Vietcombank",
        sector: "Online transaction systems",
        description: "Core banking and a mobile app serving tens of millions of users every day.",
        advantage: "The highest transaction volume in the system, with a near-absolute uptime requirement.",
        metrics: ["Transactions per second", "Uptime", "Active users"],
      },
      "card-hpg": {
        name: "Hoa Phat Group",
        sector: "Industrial automation",
        description: "Integrated plants with automated control lines and sensors along the whole run.",
        advantage: "A SCADA system watching continuously, and operating data pulled straight off the line.",
        metrics: ["Downtime", "Sensor points", "Output per shift"],
      },
      "card-mwg": {
        name: "Mobile World (MWG)",
        sector: "E-commerce",
        description: "An omnichannel retail platform wiring thousands of stores into one shared data store.",
        advantage: "A point-of-sale system, real-time inventory sync, and years of accumulated customer data.",
        metrics: ["Orders per day", "Inventory sync lag", "Payment failure rate"],
      },
      "card-msn": {
        name: "Masan Group",
        sector: "Data platform",
        description: "A retail and consumer ecosystem running on one shared customer data platform.",
        advantage: "Data from many business lines pooled in one place, at a scale where models actually learn.",
        metrics: ["Identified users", "Data points per day", "Reporting lag"],
      },
      "card-vhm": {
        name: "Vinhomes",
        sector: "Urban digital infrastructure",
        description: "Townships run on a resident management system, access control and IoT devices.",
        advantage: "Network infrastructure laid in at construction time, and a very large endpoint fleet.",
        metrics: ["Connected devices", "Units in operation", "System incidents"],
      },
      "card-ssi": {
        name: "SSI Securities",
        sector: "Low-latency systems",
        description: "A matching engine and trading app that take load in bursts, session by session.",
        advantage: "Experience absorbing peak load in the first minutes after open, at millisecond latency.",
        metrics: ["Matching latency", "Orders per second", "Session peak load"],
      },
      "card-gas": {
        name: "PV Gas",
        sector: "Industrial control systems",
        description: "Pipelines and gas plants watched by industrial control systems running 24/7.",
        advantage: "A sensor network spread over long distances, where safety makes every change reversible by rule.",
        metrics: ["Monitoring stations", "Alerts per month", "Response time"],
      },
      "card-vic": {
        name: "Vingroup",
        sector: "Diversified technology group",
        description: "A group with electric vehicles, embedded software and data infrastructure it runs itself.",
        advantage: "Writing the software for its own hardware, from the embedded layer up to the cloud.",
        metrics: ["Connected vehicles", "OTA updates", "Data centres"],
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
