/** /lo-trinh - trang người mới đến trước khi học bài nào.
 *
 *  NGUYÊN TẮC VIẾT: người đọc trang này đang bối rối, nên mỗi câu phải trả lời
 *  một câu hỏi họ đang có trong đầu, và trả lời bằng chữ họ dùng. Bản đầu của
 *  trang này viết bằng giọng phân tích - "gần khớp đường quên tự nhiên", "điều
 *  kiện để cơ chế ôn hoạt động" - đúng nhưng làm người đang loạn loạn thêm.
 *
 *  Ba luật cho mọi chuỗi ở đây:
 *  1. Câu ngắn. Một ý một câu.
 *  2. Con số trước lời hứa. "6 phút" nói được nhiều hơn "nhẹ nhàng thôi".
 *  3. Trả lời cả điều họ CHƯA hỏi nhưng đang lo: bỏ một ngày có sao không, học
 *     chậm có sao không, chọn sai lộ trình thì sao.
 *
 *  Con số là con số ĐO ĐƯỢC từ kho (trung vị một bài 6 phút, khoảng nhắc lại 5
 *  và 12 bài), và lib/__tests__/learning-path-claims.test.ts neo chúng lại. */
export const learningPathVi = {
  learningPath: {
    backToDashboard: "Về Dashboard",
    title: "Bắt đầu từ đâu",
    subtitle: "Trang này trả lời ba câu: học gì, mỗi ngày bao lâu, và hôm nay làm gì.",

    // Câu trả lời trước, giải thích sau.
    heroMinutes: "6 phút mỗi ngày",
    heroBody: "Một bài học dài 6 phút, tính cả câu hỏi cuối bài. Không cần hơn.",
    heroTodayLabel: "Hôm nay bạn học bài này",
    heroOpen: "Mở bài học",
    heroNoLesson: "Chọn một lộ trình ở dưới, rồi quay lại đây - chỗ này sẽ chỉ đúng bài bạn cần học hôm nay.",
    heroLoading: "Đang xem bạn đang ở đâu...",

    stepPickTitle: "Chọn một hướng",
    stepPickHint: "Bạn muốn tự dựng được sản phẩm của mình, hay muốn đi làm nghề công nghệ? Chọn một. Đổi lúc nào cũng được.",
    trackPersonalName: "Nền tảng của tôi",
    trackPersonalFor: "Biết máy chạy thế nào, dùng Git, viết chương trình đầu tiên, dựng web, triển khai.",
    trackProfessionalName: "Nghề công nghệ",
    trackProfessionalFor: "Đọc mã người khác, thiết kế hệ thống, vận hành. Cho người muốn đi làm nghề này.",
    trackLessons: "{count} bài",
    trackTime: "khoảng {weeks} tuần",
    // Thẻ hướng ĐANG CHỌN đếm số bài CÒN LẠI, thẻ kia đếm tổng. Trước đây cả
    // hai đều đếm tổng, nên thẻ đang chọn ghi "137 bài · khoảng 28 tuần" ngay
    // trên ô ước lượng ghi "còn 97 bài · khoảng 20 tuần" - hai câu trả lời cho
    // cùng một câu hỏi, cách nhau ba dòng.
    trackLessonsLeft: "còn {count} bài",
    paceFinishBy: "Xong khoảng {date}.",
    paceSaved: "Đã lưu",
    paceSaveFailed: "Chưa lưu được - thử lại",
    tocTitle: "Trong trang này",
    parallelTitle: "Hai lối học song song",
    parallelHint: "Không nằm trong lộ trình đánh số theo ngày. Học thêm lúc nào cũng được, không phải chọn thay.",
    parallelCfaName: "CFA Level I",
    parallelCfaFor: "Mười môn, có đề luyện và bộ công thức riêng.",
    parallelFrmName: "FRM",
    parallelFrmFor: "Quản trị rủi ro, Part I và Part II.",
    adjustWeakestOpen: "Mở bài đầu tiên chưa học của chủ đề này",
    progressAria: "Đã học {done} trên {total} bài",
    trackPicked: "Bạn đang học hướng này",
    trackPick: "Chọn hướng này",
    proNote:
      "Chọn hướng nghề thì cứ đi 20 bài đầu của hướng kia trước. Dòng lệnh và Git là nền của mọi thứ phía sau, và nó chỉ mất hai tuần.",

    stepPaceTitle: "Chọn nhịp bạn giữ được",
    stepPaceHint: "Nhịp giữ được quan trọng hơn nhịp nhanh.",
    paceLessonsPerDay: "Mỗi ngày",
    paceDaysPerWeek: "Mỗi tuần",
    paceOne: "1 bài",
    paceTwo: "2 bài",
    paceDays: "{days} ngày",
    paceEstimate: "Còn {count} bài. Với nhịp này bạn xong trong khoảng {weeks} tuần.",
    paceMinutes: "Mỗi ngày khoảng {minutes} phút.",
    paceWarnTitle: "Học dồn cuối tuần có được không?",
    paceWarnBody:
      "Được, nhưng bạn sẽ nhớ ít hơn. Mỗi bài học tự động hỏi lại ý chính của bài bạn học cách đây 5 bài và 12 bài. Học 1 bài mỗi ngày thì hai câu hỏi đó đến vào ngày thứ 5 và ngày thứ 12 - đúng lúc bạn bắt đầu quên, nên nhớ lại được. Học 5 bài trong một buổi thì cả hai câu đến trong hai ngày, lúc bạn còn nhớ rõ, nên hỏi cũng như không. Nói ngắn: bỏ một ngày tốt hơn dồn năm bài.",

    stepHowTitle: "Mỗi bài học làm ba việc",
    howReadTitle: "Đọc hết",
    howReadBody: "Kéo xuống hết bài mới được tính là xong. Nhảy thẳng xuống câu hỏi thì không đọng lại gì.",
    howQuizTitle: "Trả lời câu hỏi",
    howQuizBody: "Không phải để lấy điểm. Sai câu nào thì kéo lên đọc lại đúng đoạn đó - đó là lúc bạn thực sự học.",
    howPracticeTitle: "Làm câu áp dụng cuối bài",
    howPracticeBody:
      "Một tình huống thật. Đây là bước hay bị bỏ nhất, và là bước duy nhất cho bạn biết mình dùng được kiến thức chứ không chỉ thấy quen.",

    stepWorryTitle: "Ba điều bạn có thể đang lo",
    worrySkipQ: "Bỏ mất mấy ngày rồi, có phải học lại từ đầu không?",
    worrySkipA:
      "Không. Không có gì mất đi. Mở bài kế tiếp và học tiếp - chuỗi ngày có lượt bảo vệ, và tiến độ của bạn vẫn nguyên.",
    worrySlowQ: "Mọi người học nhanh hơn tôi.",
    worrySlowA:
      "Không sao. Một bài mỗi ngày trong một năm nhiều hơn hẳn ba mươi bài trong một tuần rồi bỏ. Về đích chậm vẫn là về đích.",
    worryWrongQ: "Tôi chọn sai hướng thì sao?",
    worryWrongA:
      "Đổi được, và không mất gì. Bài bạn đã học vẫn được tính. Hai hướng dùng chung phần nền, nên phần đã đi không bỏ đi đâu.",

    stepCheckTitle: "Khi nào thì được đi tiếp",
    stepCheckBody:
      "Hết mỗi chặng có một bài tổng ôn. Làm câu hỏi của nó: từ 70% trở lên thì đi tiếp, dưới 70% thì quay lại hai ba bài bạn thấy yếu nhất. Chặng sau luôn dựa vào chặng trước, nên vá một lỗ bây giờ dễ hơn vá ba lỗ sau này.",
    weekRhythmTitle: "Một tuần trông như thế này",
    weekStudy: "{days} ngày: mỗi ngày một bài mới",
    weekReview: "1 ngày: không học bài mới, chỉ làm lại câu hỏi của chặng đang học",
    weekRest: "Ngày còn lại: nghỉ. Bạn không cần học đủ bảy ngày.",

    stepAdjustTitle: "Bạn đang ở đâu",
    adjustLoading: "Đang xem tiến độ của bạn...",
    adjustProgress: "Đã học {done} trong {total} bài.",
    adjustWeakest: "Chủ đề bạn hay sai nhất",
    adjustWeakestHint: "Nếu muốn quay lại ôn, đây là chỗ đáng ôn nhất - không phải bài mới nhất.",
    adjustNoData: "Học vài bài rồi quay lại - chỗ này sẽ cho bạn biết mình mạnh yếu ở đâu.",
    adjustEmptyGaps: "Chưa có chủ đề nào bạn sai nhiều. Cứ đi tiếp.",

    // Khối tóm tắt trên /hoc-bai - bản rút gọn của trang này, đặt đúng chỗ thẻ
    // "Chào mừng quay lại" trước đây đứng.
    notesEyebrow: "GHI CHÉP",
    notesTitle: "Sổ tay của bạn",
    notesHint: "Ghi lại điều vừa hiểu, trước khi quên.",
    notesCta: "Mở sổ tay ›",

    summaryEyebrow: "LỘ TRÌNH CỦA BẠN",
    summaryFull: "Xem lộ trình đầy đủ ›",
    summaryPace: "{perDay} bài/ngày · {days} ngày/tuần",
    summaryDone: "Đã học {done}/{total} bài",

    // Nhãn cho nút gấp/mở của hai thẻ trên. Chỉ đọc được bằng trình đọc màn
    // hình và tooltip - bản thân nút chỉ là một mũi tên.
    cardCollapse: "Thu gọn",
    cardExpand: "Mở rộng",
  },
};

export const learningPathEn: typeof learningPathVi = {
  learningPath: {
    backToDashboard: "Back to dashboard",
    title: "Where to start",
    subtitle: "This page answers three things: what to learn, how long a day, and what to do today.",

    heroMinutes: "6 minutes a day",
    heroBody: "One lesson takes 6 minutes, including the question at the end. You don't need more.",
    heroTodayLabel: "Today, this is your lesson",
    heroOpen: "Open the lesson",
    heroNoLesson: "Pick a direction below, then come back - this spot will point at the exact lesson to do today.",
    heroLoading: "Checking where you are...",

    stepPickTitle: "Pick one direction",
    stepPickHint: "Do you want to build your own things, or work in technology? Pick one. You can change it any time.",
    trackPersonalName: "My own foundation",
    trackPersonalFor: "Know how your machine works, use Git, write a first program, build a site, deploy it.",
    trackProfessionalName: "A technology career",
    trackProfessionalFor: "Read other people's code, design systems, run them. For people who want the job.",
    trackLessons: "{count} lessons",
    trackTime: "about {weeks} weeks",
    trackLessonsLeft: "{count} lessons left",
    paceFinishBy: "Done around {date}.",
    paceSaved: "Saved",
    paceSaveFailed: "Not saved - try again",
    tocTitle: "On this page",
    parallelTitle: "Two parallel tracks",
    parallelHint: "Not part of the day-numbered path. Take them any time - they are an addition, not a replacement.",
    parallelCfaName: "CFA Level I",
    parallelCfaFor: "Ten subjects, with practice questions and its own formula sheet.",
    parallelFrmName: "FRM",
    parallelFrmFor: "Risk management, Part I and Part II.",
    adjustWeakestOpen: "Open the first unfinished lesson in this topic",
    progressAria: "{done} of {total} lessons done",
    trackPicked: "This is your direction",
    trackPick: "Choose this one",
    proNote:
      "If you pick the career direction, still take the first 20 lessons of the other one. The command line and Git are the foundation for everything after, and they only take two weeks.",

    stepPaceTitle: "Pick a pace you can keep",
    stepPaceHint: "A pace you keep beats a fast one.",
    paceLessonsPerDay: "Each day",
    paceDaysPerWeek: "Each week",
    paceOne: "1 lesson",
    paceTwo: "2 lessons",
    paceDays: "{days} days",
    paceEstimate: "{count} lessons left. At this pace you finish in about {weeks} weeks.",
    paceMinutes: "About {minutes} minutes a day.",
    paceWarnTitle: "Can I just do them all at the weekend?",
    paceWarnBody:
      "You can, but you'll remember less. Every lesson quietly asks you again about the key point from 5 lessons back and 12 lessons back. At one lesson a day those two questions land on day 5 and day 12 - right as you start to forget, which is what makes it stick. Do five in one sitting and both questions arrive within two days, while you still remember clearly, so asking does nothing. Short version: skipping a day beats stacking five.",

    stepHowTitle: "Every lesson is three things",
    howReadTitle: "Read it through",
    howReadBody: "You have to scroll to the end for it to count. Jumping straight to the question leaves nothing behind.",
    howQuizTitle: "Answer the question",
    howQuizBody: "Not for a score. When you miss one, scroll back to that exact passage - that is the moment you actually learn.",
    howPracticeTitle: "Do the applied question at the end",
    howPracticeBody:
      "A real situation. This is the step most people skip, and the only one that tells you whether you can use the idea rather than just recognise it.",

    stepWorryTitle: "Three things you might be worried about",
    worrySkipQ: "I missed several days. Do I start over?",
    worrySkipA:
      "No. Nothing is lost. Open the next lesson and carry on - streaks have freezes, and your progress is untouched.",
    worrySlowQ: "Everyone else is going faster than me.",
    worrySlowA:
      "That's fine. One lesson a day for a year beats thirty in a week and then nothing. Finishing slowly is still finishing.",
    worryWrongQ: "What if I picked the wrong direction?",
    worryWrongA:
      "You can switch, and you lose nothing. Lessons you finished still count. The two directions share the same foundation, so the ground you covered stays covered.",

    stepCheckTitle: "When you're ready to move on",
    stepCheckBody:
      "Each stage ends with a recap lesson. Take its questions: 70% or above, move on; below 70%, go back to the two or three lessons you felt weakest on. Every stage builds on the one before, so patching one gap now is easier than patching three later.",
    weekRhythmTitle: "A week looks like this",
    weekStudy: "{days} days: one new lesson each",
    weekReview: "1 day: no new lesson, just redo the questions for your current stage",
    weekRest: "The day left over: rest. You don't need all seven.",

    stepAdjustTitle: "Where you are",
    adjustLoading: "Checking your progress...",
    adjustProgress: "{done} of {total} lessons done.",
    adjustWeakest: "The topic you get wrong most",
    adjustWeakestHint: "If you want to go back and review, this is the spot worth reviewing - not the newest lesson.",
    adjustNoData: "Take a few lessons and come back - this will tell you where you're strong and weak.",
    adjustEmptyGaps: "No topic is tripping you up yet. Keep going.",

    notesEyebrow: "NOTES",
    notesTitle: "Your notebook",
    notesHint: "Write down what just clicked, before it fades.",
    notesCta: "Open the notebook ›",

    summaryEyebrow: "YOUR PATH",
    summaryFull: "See the full path ›",
    summaryPace: "{perDay} lessons/day · {days} days/week",
    summaryDone: "{done} of {total} lessons done",

    cardCollapse: "Collapse",
    cardExpand: "Expand",
  },
};
