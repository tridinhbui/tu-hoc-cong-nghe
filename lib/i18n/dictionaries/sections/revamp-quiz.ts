// Chữ cho đợt revamp BUILD → RUN → DEBUG → LEVEL UP (KE-HOACH-BUILD-RUN-DEBUG.md).
// Trang /kiem-tra (Daily Signal + Training Lab), DailyNewsQuizWidget ở biến thể
// "signal", CoCoQuizSuggestion và trang /thi-vuot-chang.
//
// "DAILY SIGNAL" và "TRAINING LAB" là TÊN khu vực, viết giống nhau ở cả hai
// ngôn ngữ theo yêu cầu - ngắn dưới ngưỡng loanword của dictionary-parity.
export const revampQuizVi = {
  revampQuiz: {
    todayLabel: "Hôm nay",
    todaySignalDone: "Daily signal đã xong",
    todaySignalPending: "Daily signal chưa làm",

    // ── Cột trái: DAILY SIGNAL ──
    signalHeading: "DAILY SIGNAL · {date}",
    signalCount: "1 câu",
    signalXp: "+{xp} XP",
    signalTime: "~60 giây",
    signalPending: "Chưa trả lời",
    signalDone: "Đã xong hôm nay",
    signalXpEarned: "+{xp} XP đã ghi",
    signalXpMissed: "0 XP - trả lời sai",
    signalNextHint: "Câu mới sau 00:00.",
    signalExpand: "Mở rộng",

    // ── Cột phải: TRAINING LAB ──
    labName: "TRAINING LAB",
    labAreaLabel: "Mảng kiến thức",
    labDifficultyLabel: "Độ khó",
    labSpecLabel: "Cấu hình phiên",
    labRewardXp: "+{xp} XP / câu đúng",
    labPassRule: "đạt từ {pct}%",
    labStart: "Chạy phiên luyện",
    suggestionLabel: "Gợi ý từ lịch sử học",
    suggestionRun: "Chạy gợi ý",
    suggestionEmpty: "Học xong vài bài là có gợi ý phiên luyện theo đúng bài bạn vừa học.",

    // ── Trong phiên ──
    runLabel: "Phiên luyện",
    stateUnanswered: "Chưa chọn đáp án",
    statePicked: "Đã chọn {letter} - bấm Kiểm tra",
    stateCorrect: "Đúng",
    stateWrong: "Sai",
    keysHint: "Phím 1-4 chọn · Enter kiểm tra",
    runningScore: "{correct} đúng",
    runningXp: "+{xp} XP",
    answerHead: "Đáp án {letter}",
    whyHead: "Vì sao",
    yourPick: "Bạn chọn {letter}",
    xpThisQuestion: "+{xp} XP",
    noXpThisQuestion: "0 XP",

    // ── Kết quả ──
    resultTitle: "Kết quả phiên",
    resultPassed: "Đạt",
    resultNotPassed: "Chưa đạt · cần {need}/{total}",
    retrySame: "Chạy lại cấu hình này",
    changeConfig: "Đổi cấu hình",

    // ── Lời Cơ Cơ sau mỗi câu và ở màn kết quả ──
    feedbackCorrect: [
      "Chuẩn. Đọc lại lập luận bên dưới - lần sau gặp dạng này bạn sẽ nhận ra ngay.",
      "Đúng rồi. Thử tự giải thích vì sao ba phương án kia sai trước khi đi tiếp.",
      "Chính xác. Giữ nhịp này cho câu tiếp theo.",
      "Đúng. Phần lập luận bên dưới là thứ đáng nhớ hơn cả đáp án.",
    ],
    feedbackWrong: [
      "Chưa đúng - không sao. Đọc lập luận bên dưới, đó mới là chỗ học được.",
      "Sai ở đây còn hơn sai lúc làm thật. Xem vì sao đáp án kia đúng nhé.",
      "Nhầm dạng này rất phổ biến. Đọc kỹ phần vì sao rồi đi tiếp.",
      "Câu này đáng xem lại. Lập luận bên dưới chỉ ra chỗ lệch.",
    ],
    resultGood: [
      "{score}/{total} - vững. Chạy một phiên khó hơn để thử giới hạn.",
      "Đúng {score}/{total}. Phần này bạn nắm rồi, chuyển sang mảng khác cũng được.",
      "{score}/{total}. Tốt - giữ nhịp luyện hằng ngày để khỏi rơi rớt.",
    ],
    resultReview: [
      "{score}/{total}. Mở lại các bài có câu sai bên dưới, rồi chạy lại phiên này.",
      "Đúng {score}/{total} - chưa chắc. Ôn đúng mấy bài được liệt kê là đủ.",
      "{score}/{total}. Không sao - giờ bạn biết chính xác chỗ cần xem lại.",
    ],
  },
};

export const revampQuizEn: typeof revampQuizVi = {
  revampQuiz: {
    todayLabel: "Today",
    todaySignalDone: "Daily signal done",
    todaySignalPending: "Daily signal pending",

    signalHeading: "DAILY SIGNAL · {date}",
    signalCount: "1 question",
    signalXp: "+{xp} XP",
    signalTime: "~60 sec",
    signalPending: "Not answered",
    signalDone: "Done for today",
    signalXpEarned: "+{xp} XP recorded",
    signalXpMissed: "0 XP - wrong answer",
    signalNextHint: "New question after 00:00.",
    signalExpand: "Expand",

    labName: "TRAINING LAB",
    labAreaLabel: "Knowledge area",
    labDifficultyLabel: "Difficulty",
    labSpecLabel: "Session config",
    labRewardXp: "+{xp} XP / correct answer",
    labPassRule: "pass at {pct}%",
    labStart: "Run session",
    suggestionLabel: "Suggested from your history",
    suggestionRun: "Run suggestion",
    suggestionEmpty: "Finish a few lessons and you'll get a session tuned to what you just studied.",

    runLabel: "Session",
    stateUnanswered: "No answer selected",
    statePicked: "Selected {letter} - press Check",
    stateCorrect: "Correct",
    stateWrong: "Wrong",
    keysHint: "Keys 1-4 select · Enter checks",
    runningScore: "{correct} correct",
    runningXp: "+{xp} XP",
    answerHead: "Answer {letter}",
    whyHead: "Why",
    yourPick: "You picked {letter}",
    xpThisQuestion: "+{xp} XP",
    noXpThisQuestion: "0 XP",

    resultTitle: "Session result",
    resultPassed: "Passed",
    resultNotPassed: "Not passed · need {need}/{total}",
    retrySame: "Rerun this config",
    changeConfig: "Change config",

    feedbackCorrect: [
      "Right. Read the reasoning below - next time you'll spot this pattern at once.",
      "Correct. Try explaining why the other three are wrong before moving on.",
      "Exactly. Keep this pace for the next one.",
      "Correct. The reasoning below is worth more than the answer itself.",
    ],
    feedbackWrong: [
      "Not quite - that's fine. Read the reasoning below, that's where the learning is.",
      "Better to miss it here than on the job. See why the other answer holds.",
      "This mix-up is very common. Read the why, then move on.",
      "Worth a second look. The reasoning below shows where it went off.",
    ],
    resultGood: [
      "{score}/{total} - solid. Run a harder session to find your limit.",
      "{score}/{total} correct. You've got this area; switching to another is fine.",
      "{score}/{total}. Good - keep a daily rhythm so it sticks.",
    ],
    resultReview: [
      "{score}/{total}. Reopen the lessons with missed questions below, then rerun this session.",
      "{score}/{total} correct - not solid yet. Reviewing just the listed lessons is enough.",
      "{score}/{total}. That's fine - now you know exactly what to revisit.",
    ],
  },
};
