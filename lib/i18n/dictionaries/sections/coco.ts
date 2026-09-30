// Lời thoại của Cơ Cơ - linh vật trợ lý học (components/CoCoSays.tsx).
//
// Mỗi điểm chào là một MẢNG câu chứ không phải một câu: Cơ Cơ xuất hiện ở
// nhiều trang, và một câu y hệt mỗi lần mở trang thì sau ba ngày thành chữ
// dán tường. CoCoSays chọn một câu theo ngày, nên hôm nay nói một câu, mai nói
// câu khác, và trong cùng một ngày không đổi qua lại mỗi lần quay lại trang.
//
// Giọng: xưng "tớ", gọi "bạn", ngắn, nói về VIỆC SẮP LÀM chứ không khen suông.
// Không emoji - quy ước chung của app (vẽ bằng Lucide khi cần).

export const cocoVi = {
  coco: {
    name: "CƠ CƠ",
    typingLabel: "Cơ Cơ đang gõ",
    morning: "Chào buổi sáng{name}!",
    afternoon: "Chào buổi chiều{name}!",
    evening: "Chào buổi tối{name}!",
    dashboardNext: [
      "Hôm nay mình làm tiếp \"{lesson}\" nhé - xong bài này là thêm một thứ bạn tự làm được.",
      "Bài kế tiếp đang chờ: \"{lesson}\". Mười lăm phút là đủ, tớ ngồi cạnh bạn.",
      "Hôm qua bạn đã tới đây rồi. Giờ là \"{lesson}\" - đọc, chạy thử, rồi tự sửa.",
      "Một bài mỗi ngày là đủ để thấy khác biệt sau một tháng. Hôm nay: \"{lesson}\".",
    ],
    dashboardFirst: [
      "Tớ là Cơ Cơ, tớ sẽ đi cùng bạn. Bắt đầu bằng bài đầu tiên nhé - không cần biết gì trước cả.",
      "Chưa biết gì về công nghệ? Tốt, đúng chỗ rồi. Bài đầu tiên chỉ mất vài phút thôi.",
    ],
    dashboardDone: [
      "Bạn đã học hết tuyến này rồi! Giờ thử sức ở Mô phỏng công cụ hoặc Luyện phỏng vấn xem sao.",
    ],
    loTrinh: [
      "Bạn muốn làm được gì? Chọn một việc cụ thể - tớ sẽ xếp bài theo đúng việc đó.",
      "Đừng chọn môn học, hãy chọn thứ bạn muốn làm ra. Website, AI Agent, tự động hoá - đều bắt đầu từ số 0.",
      "Mỗi lối học ở đây kết thúc bằng một thứ bạn tự làm được, không phải một tờ giấy.",
    ],
    hocBai: [
      "Học một bài, chạy thử ngay, sai thì sửa - đó là cách nhanh nhất để nhớ.",
      "Mỗi chặng xong là một kỹ năng mới. Chọn chặng đang dở và đi tiếp nhé.",
    ],
    kiemTra: [
      "Làm vài câu để biết mình thật sự nhớ gì. Sai cũng tốt - tớ sẽ giải thích vì sao.",
      "Câu hỏi hôm nay không để chấm bạn, mà để chỉ ra chỗ nào cần xem lại.",
      "Năm câu thôi, khoảng hai phút. Thử xem trí nhớ hôm nay thế nào.",
    ],
    interview: [
      "Chọn vị trí, độ khó, rồi tớ đóng vai người phỏng vấn. Trả lời như đang ngồi phòng thật nhé.",
      "Nhà tuyển dụng hỏi để xem bạn nghĩ thế nào, không chỉ để nghe đáp án. Luyện cả cách giải thích.",
    ],
    tools: [
      "Đây là chỗ để làm thật: gõ lệnh, chạy truy vấn, gọi API. Làm hỏng cũng không sao - bấm làm lại là xong.",
      "Đọc về terminal mười lần không bằng gõ một lần. Chọn một công cụ và thử nhiệm vụ đầu tiên đi.",
    ],
    certs: [
      "Chứng chỉ là bằng chứng bên ngoài cho thứ bạn đã học ở đây. Học miền nặng điểm trước nhé.",
      "Mỗi miền thi có nút luyện riêng - làm xong một miền, thử mười câu để biết mình chắc chưa.",
    ],
    stageSkip: [
      "Đã biết phần này rồi? Thi vượt chặng - đạt 80% là cả chặng được tính hoàn thành.",
      "Phòng thi này tính thật: trượt thì phải chờ một lúc mới thi lại. Ôn kỹ rồi hẵng vào nhé.",
    ],
  },
  // components/CoCoChatbot.tsx - chatbot nổi trên mọi trang.
  cocoChat: {
    fabLabel: "Hỏi Cơ Cơ",
    title: "Cơ Cơ",
    status: "Trợ lý học - hỏi gì cũng được",
    close: "Đóng",
    reset: "Cuộc trò chuyện mới",
    greeting: "Chào bạn, tớ là Cơ Cơ! Bạn đang vướng chỗ nào? Hỏi tớ về bài đang học, một khái niệm khó, hay nên học gì tiếp - tớ trả lời ngay.",
    suggestions: [
      "Giải thích bài này đơn giản hơn giúp tớ",
      "API là gì?",
      "Tớ nên học gì tiếp theo?",
      "Git khác GitHub thế nào?",
    ],
    placeholder: "Nhập câu hỏi cho Cơ Cơ...",
    send: "Gửi",
    relatedLessons: "Bài học liên quan",
    offlineWithLinks: "Tớ đang không kết nối được bộ não AI, nhưng tìm thấy mấy bài này có vẻ đúng thứ bạn cần:",
    offlineNoLinks: "Tớ đang không kết nối được bộ não AI, và cũng chưa tìm thấy bài nào khớp. Bạn thử hỏi bằng từ khoá khác (ví dụ: Python, SQL, Docker) nhé.",
    rateLimited: "Bạn hỏi nhanh quá, tớ gõ không kịp! Đợi một phút rồi hỏi tiếp nhé.",
    error: "Ối, tớ bị mất kết nối. Bạn thử gửi lại nhé.",
    disclaimer: "Cơ Cơ có thể nhầm - kiểm tra lại trong bài học.",
  },
};

export const cocoEn: typeof cocoVi = {
  coco: {
    name: "COCO",
    typingLabel: "Cơ Cơ is typing",
    morning: "Good morning{name}!",
    afternoon: "Good afternoon{name}!",
    evening: "Good evening{name}!",
    dashboardNext: [
      "Let's carry on with \"{lesson}\" today - finish it and that's one more thing you can do yourself.",
      "Your next lesson is waiting: \"{lesson}\". Fifteen minutes is enough, and I'm right here.",
      "You got this far yesterday. Now it's \"{lesson}\" - read it, run it, then fix it yourself.",
      "One lesson a day is enough to feel the difference in a month. Today: \"{lesson}\".",
    ],
    dashboardFirst: [
      "I'm Cơ Cơ and I'll be learning alongside you. Start with the first lesson - no background needed.",
      "New to tech? Good, you're in the right place. The first lesson only takes a few minutes.",
    ],
    dashboardDone: [
      "You've finished this whole track! Now try the Tool Simulators or Interview Practice.",
    ],
    loTrinh: [
      "What do you want to be able to do? Pick something concrete and I'll line up the lessons for it.",
      "Don't pick a subject, pick something you want to make. A website, an AI agent, automation - all start from zero.",
      "Every path here ends with something you can build yourself, not a piece of paper.",
    ],
    hocBai: [
      "Learn a lesson, run it straight away, fix what breaks - that's the fastest way to remember.",
      "Every finished stage is a new skill. Pick the one in progress and keep going.",
    ],
    kiemTra: [
      "Answer a few questions to see what really stuck. Getting one wrong is fine - I'll explain why.",
      "Today's questions aren't here to grade you, they're here to show what to review.",
      "Just five questions, about two minutes. Let's see how your memory is doing today.",
    ],
    interview: [
      "Pick a role and a difficulty, and I'll play the interviewer. Answer as if you're in the real room.",
      "Interviewers ask to see how you think, not just to hear the answer. Practise explaining too.",
    ],
    tools: [
      "This is where you do it for real: type commands, run queries, call APIs. Break something? Just reset it.",
      "Typing one command beats reading about the terminal ten times. Pick a tool and try the first task.",
    ],
    certs: [
      "A certification is outside proof of what you've learned here. Study the heaviest domains first.",
      "Every exam domain has its own practice button - finish a domain, then try ten questions to check it stuck.",
    ],
    stageSkip: [
      "Already know this part? Take the stage skip exam - score 80% and the whole stage counts as done.",
      "This exam counts for real: fail and you wait a while before retrying. Review first, then come in.",
    ],
  },
  cocoChat: {
    fabLabel: "Ask Cơ Cơ",
    title: "Cơ Cơ",
    status: "Study buddy - ask me anything",
    close: "Close",
    reset: "New conversation",
    greeting: "Hi, I'm Cơ Cơ! Where are you stuck? Ask me about the lesson you're on, a tricky concept, or what to learn next - I'll answer right away.",
    suggestions: [
      "Explain this lesson more simply",
      "What is an API?",
      "What should I learn next?",
      "How is Git different from GitHub?",
    ],
    placeholder: "Ask Cơ Cơ a question...",
    send: "Send",
    relatedLessons: "Related lessons",
    offlineWithLinks: "I can't reach my AI brain right now, but these lessons look like what you need:",
    offlineNoLinks: "I can't reach my AI brain right now, and I couldn't find a matching lesson either. Try other keywords (e.g. Python, SQL, Docker).",
    rateLimited: "You're asking faster than I can type! Wait a minute and ask again.",
    error: "Oops, I lost the connection. Please try sending again.",
    disclaimer: "Cơ Cơ can make mistakes - double-check in the lesson.",
  },
};

