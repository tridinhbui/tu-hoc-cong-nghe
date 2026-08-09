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
      compound: "quả cầu tuyết lăn từ đỉnh núi: càng lăn xa càng hút thêm tuyết và phình to khổng lồ",
      cashFlow:
        "nguồn nước chảy trong sinh hoạt: dù bể nhà bạn to (tài sản lớn) nhưng nếu đường ống bị tắc (thiếu tiền mặt), bạn vẫn không có nước tắm rửa",
      interest:
        "phí thuê một chiếc xe máy: bạn mượn xe người khác đi thì cuối ngày phải trả một số tiền nhỏ gọi là tiền thuê",
      debt: "một chiếc ba lô chứa đá: giúp bạn lao dốc nhanh hơn nhờ quán tính nếu mang vừa sức, nhưng sẽ đè bẹp bạn nếu quá nặng",
      dividend:
        "vườn táo chung: bạn góp vốn mua cây con, khi cây ra trái ngọt, chủ vườn hái chia đều cho mỗi người vài trái mang về",
      inflation: "cục nước đá để ngoài nắng: cứ mỗi giờ trôi qua nó lại bị chảy bớt đi một chút giá trị mua sắm",
      valuation:
        "mua một món đồ cũ: bạn phải soi kỹ đường may, chất liệu để xem mức giá người bán nói có bị đắt quá không",
      asset: "con gà đẻ trứng vàng: mỗi ngày nó đẻ ra một quả trứng vàng để bạn đem bán kiếm tiền",
      fallback:
        "trò chơi trao đổi sticker ở trường: để đổi được sticker hiếm, bạn phải hiểu rõ giá trị của những tấm sticker mình đang sở hữu",
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
      compound: "a snowball rolling down a mountain: the further it rolls, the more snow it picks up and the bigger it grows",
      cashFlow:
        "the plumbing in your house: the tank on the roof may be huge (plenty of assets), but if the pipe is blocked (no cash), you still cannot take a shower",
      interest:
        "the fee for borrowing a motorbike: you ride someone else's bike for the day, and at the end of it you hand over a small amount for the use of it",
      debt: "a backpack full of rocks: carry a sensible load and momentum takes you downhill faster, carry too much and it flattens you",
      dividend:
        "a shared apple orchard: you chip in to buy the saplings, and when the trees fruit the keeper picks the crop and hands everyone a few apples to take home",
      inflation: "an ice cube left out in the sun: every hour that passes, a little more of its purchasing power melts away",
      valuation:
        "buying something second-hand: you check the stitching and the material closely to judge whether the seller's price is too high",
      asset: "a hen that lays golden eggs: every day it lays one more egg you can sell",
      fallback:
        "trading stickers in the schoolyard: to swap for a rare one, you have to know exactly what the stickers you already hold are worth",
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
