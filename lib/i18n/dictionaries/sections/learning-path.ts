/** /lo-trinh - chọn lộ trình, đặt nhịp, và hướng dẫn cho người mới.
 *
 *  Con số trong phần hướng dẫn là con số ĐO ĐƯỢC từ kho, không phải hứa hẹn:
 *  trung vị một bài là 6 phút (tính cả câu mở đầu và quiz), track cá nhân 135
 *  bài, chuyên ngành 472. Nếu kho đổi thì mấy câu này phải đổi theo - đó là lý
 *  do chúng nằm ở một section riêng chứ không rải trong component. */
export const learningPathVi = {
  learningPath: {
    title: "Lộ trình học của bạn",
    subtitle: "Chọn hướng, đặt nhịp, rồi chỉ cần bám theo",

    // 1. Chọn lộ trình
    stepPickTitle: "1. Chọn một lộ trình, đừng học cả hai",
    stepPickHint: "Một câu hỏi thôi: bạn muốn quản tiền của mình, hay muốn làm nghề tài chính?",
    trackPersonalName: "Tài chính cá nhân",
    trackPersonalFor: "Muốn quản tiền của chính mình",
    trackProfessionalName: "Chuyên ngành",
    trackProfessionalFor: "Muốn làm nghề: phân tích, IB, kiểm toán, ngân hàng",
    trackLessons: "{count} bài",
    trackPicked: "Đang theo lộ trình này",
    trackPick: "Chọn lộ trình này",
    proNote:
      "Chọn Chuyên ngành thì vẫn nên đi 20 bài đầu của track cá nhân trước: lãi kép, giá trị thời gian của tiền và rủi ro là nền của mọi thứ phía sau.",

    // 2. Đặt nhịp
    stepPaceTitle: "2. Đặt nhịp bạn giữ được",
    stepPaceHint: "Nhịp giữ được quan trọng hơn nhịp nhanh. Đổi lúc nào cũng được.",
    paceLessonsPerDay: "Số bài mỗi ngày",
    paceDaysPerWeek: "Số ngày mỗi tuần",
    paceOne: "1 bài",
    paceTwo: "2 bài",
    paceEstimate: "Với nhịp này: khoảng {weeks} tuần để xong {count} bài",
    paceMinutes: "≈ {minutes} phút mỗi ngày",
    paceWarnTitle: "Vì sao không nên dồn năm bài một buổi",
    paceWarnBody:
      "Mỗi bài tự động hiện lại ý chính của bài cách đó khoảng 5 bài và 12 bài, dưới dạng trắc nghiệm. Khoảng cách đó tính theo SỐ BÀI, nên khoảng cách theo ngày do bạn quyết. Học 1 bài/ngày thì hai lần ôn rơi vào ngày thứ 5 và thứ 12 - gần khớp đường quên tự nhiên. Dồn năm bài một buổi thì cả hai lần ôn dồn vào trong hơn hai ngày, và ôn thứ mình vừa đọc xong thì không tạo được gì. Bỏ một ngày còn tốt hơn dồn năm bài.",

    // 3. Ba bước mỗi bài
    stepHowTitle: "3. Mỗi bài, ba bước",
    howReadTitle: "Đọc hết bài",
    howReadBody: "Phải cuộn tới 95% mới được tính là xong - cố ý, vì nhảy thẳng xuống quiz thì không nhớ gì.",
    howQuizTitle: "Làm quiz",
    howQuizBody: "Không phải để lấy điểm mà để biết mình có hiểu hay không. Sai câu nào thì đọc lại đúng đoạn đó.",
    howPracticeTitle: "Làm câu luyện tập",
    howPracticeBody:
      "Một tình huống áp dụng ở cuối bài. Bước này hay bị bỏ, và nó là bước duy nhất kiểm được bạn DÙNG được kiến thức, không chỉ nhận ra nó.",

    // 4. Mốc kiểm
    stepCheckTitle: "4. Mốc kiểm - đừng đi tiếp nếu chưa qua",
    stepCheckBody:
      "Hết mỗi chặng có một bài tổng ôn. Nếu quiz tổng ôn dưới 70%, quay lại hai đến ba bài yếu nhất chứ đừng sang chặng mới: chặng sau luôn dựa vào chặng trước, nên một lỗ ở chặng 3 sẽ thành ba lỗ ở chặng 6.",
    weekRhythmTitle: "Nhịp một tuần",
    weekStudy: "{days} ngày học bài mới",
    weekReview: "1 ngày không học bài mới - làm quiz của chặng đang học",
    weekRest: "Còn lại là nghỉ. Streak có lượt bảo vệ, không cần học đủ bảy ngày.",

    // 5. Điều chỉnh
    stepAdjustTitle: "5. Hôm nay bạn nên làm gì",
    adjustLoading: "Đang đọc tiến độ của bạn...",
    adjustNextLesson: "Bài kế tiếp",
    adjustProgress: "Đã xong {done}/{total} bài của lộ trình",
    adjustWeakest: "Đang vấp nhiều nhất ở",
    adjustNoData:
      "Chưa có đủ dữ liệu để gợi ý. Học vài bài rồi quay lại đây - phần này đọc tiến độ thật của bạn.",
    adjustOpenLesson: "Vào học",
    adjustEmptyGaps: "Chưa có chủ đề nào bạn vấp nhiều - cứ đi tiếp.",
  },
};

export const learningPathEn: typeof learningPathVi = {
  learningPath: {
    title: "Your learning path",
    subtitle: "Pick a direction, set a pace, then just follow it",

    stepPickTitle: "1. Pick one path, not both",
    stepPickHint: "One question: do you want to manage your own money, or work in finance?",
    trackPersonalName: "Personal finance",
    trackPersonalFor: "I want to manage my own money",
    trackProfessionalName: "Professional",
    trackProfessionalFor: "I want the job: analysis, IB, audit, banking",
    trackLessons: "{count} lessons",
    trackPicked: "This is your current path",
    trackPick: "Choose this path",
    proNote:
      "If you pick Professional, still take the first 20 lessons of the personal track: compounding, the time value of money and risk are the foundation for everything after.",

    stepPaceTitle: "2. Set a pace you can keep",
    stepPaceHint: "A pace you keep beats a fast one. You can change this any time.",
    paceLessonsPerDay: "Lessons per day",
    paceDaysPerWeek: "Days per week",
    paceOne: "1 lesson",
    paceTwo: "2 lessons",
    paceEstimate: "At this pace: about {weeks} weeks to finish {count} lessons",
    paceMinutes: "≈ {minutes} minutes a day",
    paceWarnTitle: "Why not five lessons in one sitting",
    paceWarnBody:
      "Every lesson automatically resurfaces the key point of the lesson about 5 back and about 12 back, as a multiple-choice check. That gap is counted in LESSONS, so the gap in days is up to you. One lesson a day puts those two reviews on day 5 and day 12 - close to the natural forgetting curve. Five in one sitting collapses both reviews into a little over two days, and reviewing what you just read does nothing. Skipping a day beats stacking five.",

    stepHowTitle: "3. Three steps per lesson",
    howReadTitle: "Read the whole lesson",
    howReadBody: "You have to scroll to 95% before it counts - deliberately, because jumping to the quiz teaches you nothing.",
    howQuizTitle: "Take the quiz",
    howQuizBody: "Not for the score, but to find out whether you understood. Miss one and reread that exact passage.",
    howPracticeTitle: "Do the practice question",
    howPracticeBody:
      "An applied situation at the end of the lesson. This step gets skipped most, and it is the only one that tests whether you can USE the idea rather than recognise it.",

    stepCheckTitle: "4. Checkpoints - don't move on early",
    stepCheckBody:
      "Each stage ends with a recap lesson. If you score under 70% on its quiz, go back to the two or three weakest lessons instead of starting the next stage: every stage builds on the one before, so one gap in stage 3 becomes three gaps in stage 6.",
    weekRhythmTitle: "A week's rhythm",
    weekStudy: "{days} days on new lessons",
    weekReview: "1 day with no new lesson - take the quiz for your current stage",
    weekRest: "The rest is rest. Streaks have freezes; you don't need all seven days.",

    stepAdjustTitle: "5. What to do today",
    adjustLoading: "Reading your progress...",
    adjustNextLesson: "Next lesson",
    adjustProgress: "{done}/{total} lessons done on this path",
    adjustWeakest: "You stumble most on",
    adjustNoData:
      "Not enough data to suggest anything yet. Take a few lessons and come back - this section reads your real progress.",
    adjustOpenLesson: "Open lesson",
    adjustEmptyGaps: "No topic is tripping you up yet - keep going.",
  },
};
