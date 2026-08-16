// 57 thẻ trí tuệ lật ra sau mỗi bài học. Khoá theo `id` - pool được chọn bằng
// `Math.random()` nên vị trí không có nghĩa gì, và thêm một thẻ vào giữa mảng
// là chuyện bình thường ở đây.
//
// Giọng của thẻ đọc kết quả quiz vừa xong: `celebrate` cho điểm tuyệt đối,
// `encourage` cho người làm dưới 70%, `steady` cho phần còn lại. Bản Anh phải
// giữ đúng giọng ấy - `encourage` được viết cho người vừa làm sai quá nửa bài
// và đang mở lại thẻ này ngay lúc đó, nên không câu nào được nghe như an ủi
// chiếu lệ hay như một lời khuyên cố gắng hơn.
//
// Xem AGENTS.md, mục "Translating the UI".

export const wisdomCardsVi = {
  wisdomCards: {
    "wc-001":
      "Viết ít mã hơn số mã bạn hiểu là quy tắc đầu tiên - không framework nào cứu được một người luôn dán vào nhiều hơn mình đọc nổi.",
    "wc-002":
      "Bản sao lưu không phải để chạy nhanh - nó tồn tại để bạn không phải sửa vội một hệ thống đang cháy vào đúng lúc tệ nhất.",
    "wc-003":
      "Thói quen commit đều cần thời gian hơn là cần một tuần cày. Mỗi ngày một chút thường thắng một đợt dồn sức rồi bỏ.",
    "wc-004": "Rủi ro lớn nhất không phải là viết ra mã tệ, mà là không bao giờ bắt đầu vì sợ viết ra mã tệ.",
    "wc-005": "Một kiến trúc tốt bị cài đặt vụng vẫn cứu được. Một kiến trúc sai được cài đặt hoàn hảo thì không.",
    "wc-006": "Dự phòng không phải để chạy nhanh hơn - nó để bạn không bị loại khỏi cuộc chơi chỉ vì một máy chủ chết.",
    "wc-007":
      "Nợ kỹ thuật có chủ đích giúp bạn ra mắt sớm. Nợ kỹ thuật không ai ghi lại giúp người sau trả lãi thay bạn.",
    "wc-008": "Máy không quan tâm mã của bạn đẹp cỡ nào - nó chỉ quan tâm mã ấy làm đúng việc gì.",
    "wc-009": "Kỷ luật viết kiểm thử cho từng thay đổi nhỏ thường thắng việc cố gỡ một lỗi lớn vào phút chót.",
    "wc-010":
      "Đọc mã nguồn một thư viện trước khi phụ thuộc vào nó giống như đọc hợp đồng trước khi ký - đừng bỏ qua bước này.",
    "wc-011": "Độ trễ là kẻ trộm âm thầm nhất - nó không làm hệ thống chết, nó lấy đi người dùng của bạn.",
    "wc-012":
      "Giám sát không phải chi phí lãng phí - nó là cách bạn biết hệ thống hỏng trước khi người dùng gọi điện báo.",
    "wc-013": "Đừng nhầm giữa 'mã chạy được' với 'mã đúng' - hai điều này không phải lúc nào cũng giống nhau.",
    "wc-014": "Một thiết kế tồi được viết ra vẫn tốt hơn không có thiết kế nào - vì ít nhất nó cho bạn thứ để sửa.",
    "wc-015":
      "Tài sản là đoạn mã người khác đọc được và sửa được. Gánh nặng là đoạn mã chỉ mình bạn hiểu - dù nó có thông minh đến đâu.",
    "wc-016": "Đừng đưa vào hệ thống một công nghệ bạn không hiểu, chỉ vì người khác đang nói nó nhanh.",
    "wc-017": "Thời gian một hệ thống đã chạy ổn định thường nói nhiều hơn số sao trên GitHub của nó.",
    "wc-018":
      "Một dòng mã xoá hôm nay đáng giá hơn một dòng mã xoá năm sau - vì mỗi tháng trôi qua lại có thêm thứ phụ thuộc vào nó.",
    "wc-019": "Đừng để cảm xúc quyết định lúc hệ thống đang sập - đó chính xác là lúc quy trình trở nên đắt giá nhất.",
    "wc-020":
      "Chi phí ẩn (một truy vấn thừa, một vòng gọi mạng thừa) âm thầm bào mòn hiệu năng nhiều hơn bạn tưởng qua nhiều năm.",
    "wc-021": "Một bản ghi log không phải để làm phiền bạn - nó để bạn biết chính xác hệ thống của mình đang làm gì.",
    "wc-022":
      "Không ai quan tâm đến mã của bạn nhiều hơn chính bạn - đừng giao toàn bộ quyết định thiết kế cho người khác.",
    "wc-023":
      "So sánh tốc độ học của mình với người khác trong nghề là con đường nhanh nhất dẫn đến quyết định sai lầm.",
    "wc-024":
      "Giỏi nghề không phải là biết thật nhiều công nghệ - đó là có đủ lựa chọn để không phải làm theo cách mình biết là sai.",
    "wc-025":
      "Học cách đọc giấy phép của một thư viện trước khi dùng - ràng buộc thật thường nằm ở những dòng chữ nhỏ nhất.",
    "wc-026": "Đầu tư vào nền tảng của chính mình luôn trả lãi cao nhất, và không framework nào làm nó lỗi thời được.",
    "wc-027":
      "Một hệ thống tốt là hệ thống bạn ngủ ngon khi tới phiên trực, không phải hệ thống có sơ đồ đẹp nhất trên giấy.",
    "wc-028": "Đừng dựng thêm một dịch vụ mới để giải quyết một vấn đề mà bạn còn chưa đo được.",
    "wc-029": "Sự kiên nhẫn khi gỡ lỗi là một kỹ năng - chỉ là ít người đủ bình tĩnh để thực sự áp dụng nó.",
    "wc-030":
      "Công nghệ không giải quyết được mọi việc, nhưng thiếu một kế hoạch rõ ràng chắc chắn tạo ra rất nhiều việc.",
    "wc-031":
      "Hãy trả cho chính mình trước - dành thời gian dọn mã ngay sau khi ra mắt, trước khi kịp bị cuốn vào tính năng mới.",
    "wc-032":
      "Giá trị của một hệ thống đến từ việc nó phục vụ được ai, không phải từ việc nó dùng công nghệ đang được bàn tán.",
    "wc-033":
      "Quản lý rủi ro vận hành không phải là tránh mọi thay đổi - đó là chỉ chấp nhận thay đổi bạn hiểu rõ và quay lui được.",
    "wc-034": "Đừng để một lần tối ưu thành công khiến bạn quên mất phép đo đã giúp bạn tìm ra nó.",
    "wc-035":
      "Cam kết của bạn trong một tài liệu thiết kế có giá trị hơn lời hứa miệng của bất kỳ ai - viết ra trước khi bắt tay làm.",
    "wc-036":
      "Dọn mã mà không có mục tiêu cụ thể rất dễ bỏ dở giữa chừng - hãy gắn mỗi lần dọn với một vấn đề có thật.",
    "wc-037": "Kỹ sư giỏi dựng nền trước, thêm tính năng sau. Người vội thường làm ngược lại.",
    "wc-038": "Không có công nghệ nào 'chắc chắn hợp' - ai nói vậy với bạn đang bán thứ gì đó, không phải sự thật.",
    "wc-039":
      "Học cách nói 'không' với một tính năng thêm vào phút chót là kỹ năng nghề quan trọng nhất ít ai dạy bạn.",
    "wc-040":
      "Một quyết định kỹ thuật tốt hôm nay là món quà bạn gửi cho chính mình mười năm sau, lúc phải mở lại kho mã ấy.",
    "wc-041":
      "Trừu tượng hoá giống như con dao hai lưỡi - đúng chỗ thì gọn cả hệ thống, sai chỗ thì giấu mất chỗ hỏng.",
    "wc-042":
      "Đừng đợi đến khi 'có dự án lớn hơn' mới bắt đầu học nền tảng - kiến thức nên đi trước quy mô, không phải theo sau.",
    "wc-043":
      "Chi phí cơ hội là thứ vô hình nhưng luôn hiện diện - mỗi giờ bạn dành cho một tính năng là một giờ không dành cho chỗ đang hỏng.",
    "wc-044":
      "Đừng nhầm lẫn giữa viết nhanh và làm xong - nhiều người viết rất nhanh rồi mất gấp đôi thời gian để sửa.",
    "wc-045": "Số lỗi còn tồn đọng của bạn nói nhiều về hệ thống hơn là số dòng mã đã viết ra.",
    "wc-cl-01": "Đúng hết không phải may mắn - đó là dấu hiệu bạn đã thật sự hiểu, không chỉ đọc lướt.",
    "wc-cl-02": "Điểm tuyệt đối hôm nay đáng giá nhất ở chỗ nó cho bạn nền để học bài khó hơn.",
    "wc-cl-03": "Hiểu đúng một khái niệm kỹ thuật là thứ không ai lấy lại được của bạn.",
    "wc-cl-04": "Làm tốt rồi thì đừng dừng ở đây - kiến thức chỉ đọng lại khi được dùng ở bài tiếp theo.",
    "wc-cl-05": "Bạn vừa chứng minh mình đọc kỹ. Trong nghề này, đọc kỹ là kỹ năng đắt tiền.",
    "wc-en-01":
      "Câu sai hôm nay là câu bạn sẽ nhớ lâu nhất. Đó là cách trí nhớ hoạt động, không phải dấu hiệu bạn kém.",
    "wc-en-02": "Sai ở bài tập rẻ hơn sai trên hệ thống thật rất nhiều. Bạn đang trả học phí bằng thời gian.",
    "wc-en-03": "Không ai hiểu một khái niệm kỹ thuật ngay lần đọc đầu. Đọc lại không phải thụt lùi.",
    "wc-en-04": "Điểm thấp chỉ nói bài này cần thêm một lượt nữa, không nói gì về khả năng của bạn.",
    "wc-en-05": "Người bỏ cuộc và người làm lại đều vừa làm sai như nhau. Khác nhau ở bước tiếp theo.",
    "wc-en-06": "Cứ ôn lại đúng những câu vừa sai - đó là cách học nhanh nhất, và cũng ít người chịu làm nhất.",
    "wc-en-07": "Chỗ bạn thấy khó chính là chỗ đáng học nhất. Phần dễ thì ai cũng qua được.",
    // `as Record<string, string>` chứ không để TypeScript suy ra 57 khoá cụ
    // thể: WisdomCardFlip tra `t.wisdomCards[card.id]` với `card.id` kiểu
    // string, và một kiểu literal 57 khoá làm phép tra đó thành lỗi.
  } as Record<string, string>,
};

export const wisdomCardsEn: typeof wisdomCardsVi = {
  wisdomCards: {
    "wc-001":
      "Writing less code than you understand is the first rule - no framework saves someone who keeps pasting in more than they can read.",
    "wc-002":
      "A backup isn't there to make things fast - it exists so you never have to patch a burning system at the worst possible moment.",
    "wc-003":
      "A steady commit habit needs time more than it needs one heroic week. A little every day usually beats a sprint you then abandon.",
    "wc-004": "The biggest risk isn't writing bad code; it's never starting because you're afraid of writing bad code.",
    "wc-005":
      "A good architecture badly implemented can still be rescued. A wrong architecture perfectly implemented cannot.",
    "wc-006":
      "Redundancy isn't there to make you faster - it's there so one dead server doesn't take you out of the game.",
    "wc-007":
      "Deliberate technical debt helps you ship early. Technical debt nobody wrote down makes the next person pay your interest.",
    "wc-008": "The machine doesn't care how elegant your code is - it only cares what that code actually does.",
    "wc-009":
      "The discipline of testing each small change usually beats trying to debug one large failure at the last minute.",
    "wc-010":
      "Reading a library's source before depending on it is like reading a contract before signing - don't skip that step.",
    "wc-011": "Latency is the quietest thief - it doesn't kill your system, it takes your users.",
    "wc-012": "Monitoring isn't wasted spend - it's how you learn the system broke before a user calls to tell you.",
    "wc-013": "Don't confuse 'the code runs' with 'the code is correct' - those two are not always the same thing.",
    "wc-014":
      "A bad design that got written down still beats no design at all - at least it gives you something to fix.",
    "wc-015":
      "An asset is code other people can read and change. A burden is code only you understand - however clever it is.",
    "wc-016":
      "Don't put a technology into your system that you don't understand, just because someone said it was fast.",
    "wc-017": "How long a system has run stably usually tells you more than how many GitHub stars it has.",
    "wc-018":
      "A line of code deleted today is worth more than one deleted next year - every month, something new comes to depend on it.",
    "wc-019":
      "Don't let emotion drive decisions while the system is down - that is exactly when process becomes most valuable.",
    "wc-020":
      "Hidden costs - one extra query, one extra network round trip - quietly erode performance far more than you'd think over the years.",
    "wc-021": "A log line isn't there to annoy you - it's there so you know exactly what your system is doing.",
    "wc-022": "Nobody cares about your code more than you do - don't hand every design decision to somebody else.",
    "wc-023": "Comparing how fast you learn against everyone else is the quickest route to a bad decision.",
    "wc-024":
      "Being good at this job isn't knowing every technology - it's having enough options that you never have to do it the way you know is wrong.",
    "wc-025":
      "Learn to read a library's licence before you use it - the real constraints are usually in the smallest print.",
    "wc-026":
      "Investing in your own fundamentals always pays the highest return, and no framework can make it obsolete.",
    "wc-027":
      "A good system is one you sleep through your on-call shift with, not one with the prettiest diagram on paper.",
    "wc-028": "Don't stand up another service to solve a problem you haven't measured yet.",
    "wc-029": "Patience while debugging is a skill - it's just that few people stay calm enough to actually use it.",
    "wc-030": "Technology doesn't solve everything, but the lack of a clear plan reliably creates plenty of work.",
    "wc-031":
      "Pay yourself first - clean up the code right after a release, before you get pulled into the next feature.",
    "wc-032":
      "A system's value comes from who it serves, not from whether it uses the technology everyone is talking about.",
    "wc-033":
      "Managing operational risk isn't avoiding every change - it's only accepting changes you understand and can roll back.",
    "wc-034": "Don't let one successful optimisation make you forget the measurement that found it.",
    "wc-035":
      "Your commitment in a design doc is worth more than anyone's verbal promise - write it down before you start building.",
    "wc-036":
      "Cleaning up code without a specific goal is easy to abandon halfway - tie every cleanup to a real problem.",
    "wc-037": "Good engineers build the foundation first and add features second. People in a hurry do the opposite.",
    "wc-038":
      "No technology is 'guaranteed to fit' - anyone telling you otherwise is selling something, not stating a fact.",
    "wc-039":
      "Learning to say 'no' to a feature added at the last minute is the most important professional skill nobody teaches you.",
    "wc-040":
      "A good technical decision today is a gift to yourself ten years from now, when you have to open that repo again.",
    "wc-041":
      "Abstraction is a double-edged blade - in the right place it tidies the whole system, in the wrong place it hides the break.",
    "wc-042":
      "Don't wait for a 'bigger project' before learning fundamentals - knowledge should lead scale, not trail it.",
    "wc-043":
      "Opportunity cost is invisible but always present - every hour on a new feature is an hour not spent on what's already broken.",
    "wc-044":
      "Don't confuse writing fast with being finished - plenty of people write very fast and then spend twice as long fixing it.",
    "wc-045": "Your open bug count says more about the system than the number of lines you've written.",
    "wc-cl-01": "Getting them all right isn't luck - it's a sign you actually understood rather than skimmed.",
    "wc-cl-02": "A perfect score today is worth most because it gives you the ground to take on a harder lesson.",
    "wc-cl-03": "Genuinely understanding a technical concept is something nobody can take back from you.",
    "wc-cl-04": "You did well, so don't stop here - knowledge only settles once it gets used in the next lesson.",
    "wc-cl-05": "You just proved you read carefully. In this line of work, reading carefully is an expensive skill.",
    "wc-en-01":
      "The question you got wrong today is the one you'll remember longest. That's how memory works, not a sign you're bad at this.",
    "wc-en-02":
      "Getting it wrong in an exercise is far cheaper than getting it wrong in production. You're paying tuition in time.",
    "wc-en-03": "Nobody understands a technical concept on the first read. Reading it again isn't going backwards.",
    "wc-en-04": "A low score only says this lesson needs one more pass; it says nothing about what you're capable of.",
    "wc-en-05":
      "The person who quits and the person who retries both just got it wrong. The difference is the next step.",
    "wc-en-06":
      "Go back over exactly the questions you just missed - it's the fastest way to learn, and the one fewest people do.",
    "wc-en-07": "The part you find hard is the part most worth learning. Anyone can get through the easy part.",
  } as Record<string, string>,
};
