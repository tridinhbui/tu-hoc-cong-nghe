// Dictionary section for LessonPageClient (the lesson body chrome: Feynman
// mode toggle, section headers, practice/summary card titles) and
// LessonFunnelPanel (the admin lesson-funnel table). See "Translating the UI"
// in AGENTS.md.

export const lessonAdminVi = {
  lessonPage: {
    // Chín câu ví von, tra bằng MetaphorId từ components/LessonPageClient.tsx.
    // Trước là literal trong thân getMetaphorForLesson() - vị trí mà không phép
    // đo nào với tới, nên file đó báo 0 chuỗi trong khi mỗi bài học đều hiện một
    // câu ở đây.
    metaphors: {
      commandLine:
        "gọi món ở quán quen: thay vì chỉ trỏ vào ảnh trên thực đơn, bạn nói thẳng tên món và số lượng - nhanh hơn, và gọi được cả những món không có ảnh",
      fileSystem:
        "tủ hồ sơ nhiều ngăn: mỗi ngăn lại có ngăn nhỏ bên trong, còn đường dẫn chính là câu chỉ đường \"ngăn thứ ba, kẹp xanh, tờ thứ hai\"",
      version:
        "sổ nhật ký lật ngược được: mỗi lần sửa bạn ghi thêm một trang chứ không tẩy trang cũ, nên lúc nào cũng quay lại được bản hôm qua mà không mất bản hôm nay",
      algorithm:
        "tìm một cái tên trong danh bạ: lật từng trang thì sách càng dày càng lâu, còn mở giữa rồi bỏ hẳn nửa sai thì dày gấp đôi cũng chỉ tốn thêm một lần lật",
      database:
        "mục lục cuối sách: không có nó bạn phải đọc cả cuốn để tìm một từ, có nó thì tra một dòng là ra số trang",
      cache:
        "để sẵn chai nước trên bàn: bình vẫn ở trong bếp, nhưng thứ bạn với tay tới mười lần một buổi thì để gần cho đỡ mất công đi lại",
      api:
        "ô cửa nhỏ ở quầy tiếp tân: bạn không được vào trong phòng, chỉ đưa phiếu qua ô cửa rồi nhận lại kết quả - hai bên không cần biết bên kia sắp xếp thế nào",
      debug:
        "tìm chỗ dột trên trần: vệt nước hiện ra giữa phòng nhưng lỗ thủng thường nằm lệch đi một quãng, nên phải lần ngược theo đường nước chảy chứ không vá ngay chỗ ướt",
      fallback:
        "học đi xe đạp: đọc bao nhiêu hướng dẫn cũng không thay được lần đầu tự giữ thăng bằng",
    },

    whyItMattersTitle: "Vì sao bài này quan trọng",
    feynmanTitle: "💡 Chế độ Feynman (Giải thích siêu đơn giản)",
    feynmanSubtitle: "Tài Tài giải thích bài học này theo cách dễ nhớ nhất cho học sinh lớp 5!",
    feynmanOn: "Đang bật 💡",
    feynmanOff: "Dùng ELI5 ⚡",
    feynmanCardTitle: "Tài Tài giải thích (dành cho học sinh lớp 5)",
    feynmanCardSubtitle: "Học theo phép so sánh ẩn dụ",
    feynmanIntroPart1: "Chào bạn! Để giúp bạn ghi nhớ bài",
    feynmanIntroPart2: "nhanh nhất, Tài Tài xin đưa ra một phép so sánh siêu bình dân:",
    feynmanMetaphorLeadIn: "💡 Hãy tưởng tượng khái niệm này giống như",
    feynmanTakeawaysTitle: "3 điểm mấu chốt dễ nhớ nhất:",
    feynmanMistakePrefix: "⚠️ Sai lầm hay gặp:",
    explanationTitle: "Giải thích chi tiết",
    diagramTitle: "Sơ đồ trực quan",
    interactiveTitle: "Thử nghiệm tương tác",
    summaryImageTitle: "Tóm tắt trực quan",
    summaryImageAlt: "Tóm tắt trực quan {title}",
    realWorldExampleTitle: "Ví dụ thực tế · {company}",
    practicePromptTitle: "Luyện tập ngay",
    reviewLoopPromptPart1: "Nếu bạn chỉ nhớ 1 điều từ bài này, hãy nhớ rằng:",
    reviewLoopCta: "Ôn lại trong 1 phút trước khi chuyển bài",
    keyTakeawaysTitle: "Ghi nhớ nhanh",
  },
  adminFunnel: {
    title: "Phễu bài học · 30 ngày",
    noDataFallback: "Chưa đọc được dữ liệu.",
    totalOpens: "Đếm theo (bài, người), không theo số dòng — một người đọc lại năm lần vẫn là một người. Tổng {total} lượt mở.",
    withWhy: "Có whyItMatters",
    withoutWhy: "Không có",
    splitCaption: "đọc hết thân bài · {lessons} bài, {opens} lượt mở",
    splitNote: "Chỉ tính bài có ít nhất {min} lượt mở. Đây KHÔNG phải bằng chứng nhân quả — bài có",
    splitNoteWhyItMattersCode: "whyItMatters",
    splitNoteSuffix: "thường cũng là bài được chăm hơn về mọi mặt. Nhưng nếu hai con số gần bằng nhau thì viết lại 396 bài gần như chắc chắn không đáng, và đó đã đủ để quyết.",
    colLesson: "Bài",
    colOpens: "Mở",
    colReached: "Đọc hết",
    colDrop: "Bỏ dở",
    noRowsData: "Chưa có bài nào đủ dữ liệu.",
  },
};

export const lessonAdminEn: typeof lessonAdminVi = {
  lessonPage: {
    metaphors: {
      commandLine:
        "ordering at a regular haunt: instead of pointing at a photo on the menu, you say the dish and the quantity outright - faster, and it reaches dishes with no photo at all",
      fileSystem:
        "a filing cabinet of nested drawers: each drawer holds smaller drawers, and a path is just the direction \"third drawer, green folder, second sheet\"",
      version:
        "a logbook you can page backwards through: each edit adds a page rather than erasing the old one, so yesterday's version is always recoverable without losing today's",
      algorithm:
        "finding a name in a phone book: page by page and a thicker book costs proportionally more, but open in the middle and discard the wrong half and doubling the book costs one extra flip",
      database:
        "the index at the back of a book: without it you read the whole thing to find one word, with it a single line gives you the page",
      cache:
        "keeping a bottle of water on the desk: the jug is still in the kitchen, but what you reach for ten times an hour belongs within arm's length",
      api:
        "the small hatch at a reception desk: you never enter the room, you pass a slip through the hatch and take back the result - neither side needs to know how the other is arranged",
      debug:
        "tracing a leak in the ceiling: the stain shows in the middle of the room but the hole is usually offset, so you follow the water back rather than patching where it is wet",
      fallback:
        "learning to ride a bicycle: no amount of reading replaces the first time you hold the balance yourself",
    },

    whyItMattersTitle: "Why this lesson matters",
    feynmanTitle: "💡 Feynman mode (super simple explanation)",
    feynmanSubtitle: "Tai Tai explains this lesson the way a 5th grader would remember it best!",
    feynmanOn: "On 💡",
    feynmanOff: "Use ELI5 ⚡",
    feynmanCardTitle: "Tai Tai explains it (for a 5th grader)",
    feynmanCardSubtitle: "Learn through an analogy",
    feynmanIntroPart1: "Hi! To help you remember the lesson",
    feynmanIntroPart2: "as fast as possible, Tai Tai has a super simple comparison:",
    feynmanMetaphorLeadIn: "💡 Imagine this concept is like",
    feynmanTakeawaysTitle: "3 key points to remember:",
    feynmanMistakePrefix: "⚠️ Common mistake:",
    explanationTitle: "Detailed explanation",
    diagramTitle: "Visual diagram",
    interactiveTitle: "Interactive simulation",
    summaryImageTitle: "Visual summary",
    summaryImageAlt: "Visual summary {title}",
    realWorldExampleTitle: "Real-world example · {company}",
    practicePromptTitle: "Practice now",
    reviewLoopPromptPart1: "If you only remember one thing from this lesson, remember:",
    reviewLoopCta: "Review for 1 minute before moving on",
    keyTakeawaysTitle: "Quick recap",
  },
  adminFunnel: {
    title: "Lesson funnel · 30 days",
    noDataFallback: "Could not load the data yet.",
    totalOpens: "Counted by (lesson, person), not by row — someone who rereads five times still counts once. Total {total} opens.",
    withWhy: "Has whyItMatters",
    withoutWhy: "Missing it",
    splitCaption: "read to the end · {lessons} lessons, {opens} opens",
    splitNote: "Only counts lessons with at least {min} opens. This is NOT causal evidence — a lesson with",
    splitNoteWhyItMattersCode: "whyItMatters",
    splitNoteSuffix: "is usually also better cared for in every other way. But if the two numbers are close, rewriting all 396 lessons is almost certainly not worth it, and that's enough to decide.",
    colLesson: "Lesson",
    colOpens: "Opens",
    colReached: "Reached end",
    colDrop: "Dropped off",
    noRowsData: "No lesson has enough data yet.",
  },
};
