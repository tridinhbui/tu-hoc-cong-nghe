import type { LessonRoomLinkTranslation } from "./index";

/**
 * Bản dịch tiếng Anh, khoá theo slug bài học.
 *
 * Giọng của `cta` là MỆNH LỆNH NÓI RÕ CĂN PHÒNG LÀM GÌ, không phải tên phòng -
 * đúng như chú thích trên trường ấy trong lib/lesson-room-links.ts yêu cầu.
 * "Xem khấu hao làm tiền mặt TĂNG" giữ được chỗ nhấn, nên bản Anh cũng viết in
 * hoa đúng chữ đó.
 */
export const lessonRoomLinksEn: Record<string, LessonRoomLinkTranslation> = {
  "von-luu-dong-la-gi": {
    cta: "See working capital as a loop you can walk",
    why: "On paper working capital is a subtraction. In the room it is a circle with a direction, and where it goes negative is something you can see.",
  },
  "cash-conversion-cycle": {
    cta: "Walk four businesses with different cycles",
    why: "The same formula gives a positive cycle for a contractor and a negative one for a supermarket. The room puts all four side by side so you read the sign, not just the size.",
  },
  "cash-conversion-cycle-2": {
    cta: "Walk four businesses with different cycles",
    why: "The same formula gives a positive cycle for a contractor and a negative one for a supermarket. The room puts all four side by side so you read the sign, not just the size.",
  },
  "working-capital-management": {
    cta: "See what one day out of inventory is worth in cash",
    why: "The room converts 'days' into 'money' using daily revenue - the step the lesson leaves the reader to do alone.",
  },
  "hang-ton-kho-la-gi": {
    cta: "See how much of the cycle inventory takes up",
    why: "Inventory is one of the three arcs of the cash cycle. The room shows how long it runs next to the other two.",
  },
  "khoan-phai-thu-la-gi": {
    cta: "See how receivables stretch the cycle",
    why: "Receivables are the stretch where the sale is made but the cash has not arrived. The room draws exactly that stretch on the circle.",
  },
  "diversification-da-dang-hoa": {
    cta: "See the part you get for free",
    why: "The room puts the real risk bar below the weighted-average line. The gap between them is the diversification benefit, and it shrinks as correlation rises.",
  },
  "da-dang-hoa-danh-muc-theo-nganh": {
    cta: "Try four correlation levels and see what is left",
    why: "Splitting by sector works because sectors do not move in lockstep. The room lets you drag the correlation directly, so you see where the benefit goes.",
  },
  "volatility-bien-dong": {
    cta: "See what two volatilities add up to",
    why: "Mixing 20% with 7% does NOT give 13.5%. The room shows the number everyone guesses next to the real one.",
  },
  "modern-portfolio-theory": {
    cta: "Jump to the least twitchy weighting",
    why: "The room solves the minimum-variance point in closed form and jumps straight there, instead of asking the learner to trust a picture.",
  },
  "dong-tien": {
    cta: "Try explaining it to a friend opening a restaurant",
    why: "Understanding something and explaining it are two different things. The round table makes you say it out loud, then shows you what you left out.",
  },
  "lai-don-lai-kep": {
    cta: "Try explaining compounding to an 18-year-old cousin",
    why: "Your listener is a cousin with a first part-time job, not an examiner. Change the listener and you change how you say it - and that is when the gap in your own understanding shows.",
  },
  "lai-kep-huu-tri-bat-dau-som": {
    cta: "Try saying why time beats the amount",
    why: "The lesson told you the first ten years matter most. The round table asks whether you can give the reason back without re-reading it.",
  },
  "mo-hinh-ba-bao-cao-lien-ket": {
    cta: "Touch one line, watch it run through all three statements",
    why: "A page has to tell the three statements one at a time. The room changes all three at once and highlights the line that moved, so the joint is visible instead of imagined.",
  },
  "bang-ho-tro-khau-hao-von-luu-dong": {
    cta: "Watch depreciation make cash go UP",
    why: "Depreciation is an expense that costs no cash, so it raises cash rather than lowering it. The room makes you guess first, then flips all three statements.",
  },
};
