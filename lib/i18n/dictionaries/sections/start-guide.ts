/** /lo-trinh/huong-dan - "Một bài học, chơi thế này".
 *
 *  Trang này viết cho người đang đứng trước bài học đầu tiên và chưa biết mình
 *  sẽ phải làm gì với nó. Đi thử trang như một người chưa biết gì về công nghệ
 *  (2026-09-29) cho thấy ba chỗ họ khựng lại: không rõ bài mất bao lâu, không
 *  biết ô chọn đáp án đầu bài là gì ("mình chưa học mà đã bị hỏi?"), và không
 *  thấy phần thực hành là để làm - nên cuộn qua.
 *
 *  Giọng: ngắn, ấm, có chút vui, KHÔNG làm trò. Mỗi bước nói điều người đọc sẽ
 *  thấy và điều họ không cần lo. Không có thuật ngữ nào chưa được giải thích. */
export const startGuideVi = {
  startGuide: {
    metaTitle: "Học một bài thế nào | Tự Học Công Nghệ",
    back: "Về Bắt đầu từ đâu",
    eyebrow: "Hướng dẫn nhanh",
    title: "Một bài học, khoảng 15 phút. Chơi thế này.",
    sub: "Không cần biết gì trước. Các bài mới có chỗ để bấm, kéo, chọn - và sai cũng không sao.",
    coco: [
      "Lần đầu hả? Yên tâm, mình chỉ bạn bốn bước, đọc hết chưa tới một phút.",
      "Không có bài thi ở đây. Chọn sai thì mình giải thích vì sao, thế là xong.",
    ],

    stepsTitle: "Bốn bước",
    steps: [
      {
        title: "Chọn một bài",
        body: "Chọn bài nghe gần công việc của bạn nhất. Không cần chọn đúng - các bài mới đều mở đầu bằng một chuyện ở chỗ làm.",
        note: "Bên dưới có ba bài để thử.",
      },
      {
        title: "Đoán trước, đọc sau",
        body: "Đầu bài có một câu hỏi. Bạn chưa học mà đã bị hỏi? Đúng, cố ý đấy: đoán sai một lần thì nhớ lâu hơn là đọc một lần.",
        note: "Đoán bừa cũng được.",
      },
      {
        title: "Chơi phần thực hành",
        body: "Kéo thanh trượt xem con số đổi, ghép từng phần của một câu lệnh cho AI, hay chọn cách xử lý một tình huống ở chỗ làm. Làm hỏng cũng được, nó chỉ cho bạn thấy hậu quả.",
        note: "Đây là phần thú vị nhất, đừng cuộn qua.",
      },
      {
        title: "Làm một việc 20 phút",
        body: "Cuối bài có một việc nhỏ với tài liệu của chính bạn. Làm đi, rồi mai trên Dashboard sẽ có câu hỏi: hôm qua bạn thử chưa, kết quả ra sao?",
        note: "Chưa kịp cũng không sao, Cơ Cơ sẽ rủ bạn làm lại.",
      },
    ],

    tryTitle: "Ba bài để thử hôm nay",
    trySub: "Chọn một bài. Khoảng {minutes} phút.",
    tryFor: "Hợp với",
    tryMinutes: "{count} phút",
    tryOpen: "Mở bài này",
    tries: [
      { for: "ai mới vào một công việc hay một công ty" },
      { for: "ai làm kế toán, hoặc hay xem sao kê ngân hàng" },
      { for: "ai từng làm bảng chi phí hay kế hoạch" },
    ],

    stuckTitle: "Vướng thì nói",
    stuckBody:
      "Chỗ nào phải đọc hai lần, hay làm bạn muốn thoát ra? Bấm Góp ý ở cuối bài và viết đúng điều bạn nghĩ lúc đó, kể cả chỉ một câu. Đó là thứ giúp mình sửa bài nhiều nhất.",
    promises: [
      "Không chấm điểm bạn.",
      "Bỏ giữa chừng thì bài tự nhớ chỗ bạn đọc dở.",
      "Mọi bài đều miễn phí.",
    ],
    ctaPath: "Chọn lộ trình học",
  },
};

export const startGuideEn: typeof startGuideVi = {
  startGuide: {
    metaTitle: "How to take a lesson | Self-Taught Tech Daily",
    back: "Back to Where to start",
    eyebrow: "Quick guide",
    title: "One lesson, about 15 minutes. Here is how to play it.",
    sub: "You don't need to know anything first. The newer lessons have something to click, drag or choose - and being wrong is fine.",
    coco: [
      "First time? Relax, I will walk you through four steps. It takes under a minute to read.",
      "There is no exam here. If you pick wrong, I explain why, and that is it.",
    ],

    stepsTitle: "Four steps",
    steps: [
      {
        title: "Pick a lesson",
        body: "Choose the lesson that sounds closest to your job. You can't pick wrong - the newer lessons all open with something that happens at work.",
        note: "Three to try are below.",
      },
      {
        title: "Guess first, read after",
        body: "There is a question at the top. You haven't learned it yet and you're already being asked? Yes, on purpose: a wrong guess sticks better than reading once.",
        note: "A wild guess is fine.",
      },
      {
        title: "Play the practice part",
        body: "Drag a slider and watch a number change, build an instruction for an AI piece by piece, or choose how to handle a situation at work. Getting it wrong is fine - it just shows you the consequence.",
        note: "This is the fun part. Don't scroll past it.",
      },
      {
        title: "Do one 20-minute task",
        body: "At the end there is a small task using your own documents. Do it, and tomorrow the Dashboard will ask: did you try it yesterday, and how did it go?",
        note: "Didn't get to it? No problem, you will get another nudge.",
      },
    ],

    tryTitle: "Three lessons to try today",
    trySub: "Pick one. About {minutes} minutes.",
    tryFor: "Good for",
    tryMinutes: "{count} min",
    tryOpen: "Open this lesson",
    tries: [
      { for: "anyone new to a job or a company" },
      { for: "anyone in accounting, or who reads bank statements" },
      { for: "anyone who has built a cost sheet or a plan" },
    ],

    stuckTitle: "Stuck? Say so",
    stuckBody:
      "Anywhere you had to read twice, or felt like leaving? Tap Feedback at the bottom of the lesson and write exactly what you thought at that moment, even one sentence. That is what helps me fix lessons the most.",
    promises: [
      "No grading.",
      "If you stop halfway, the lesson remembers where you left off.",
      "Every lesson is free.",
    ],
    ctaPath: "Choose a learning path",
  },
};
