// Toàn bộ chữ của /loi-nhan: lời chào theo giờ, 16 nỗi lo kèm góc nhìn khác,
// ba câu hỏi tự gỡ, đoạn kết và phần ranh giới.
//
// Đây là phần chữ khó dịch nhất trong repo, và không phải vì từ vựng. Mỗi
// `reframe` được viết để THỪA NHẬN nỗi lo trước rồi mới đặt lại tỷ lệ; dịch
// hơi lệch một chút là thành gạt phăng đi ("đừng lo", "chỉ cần nghĩ khác").
// Người đọc trang này lúc một giờ sáng sẽ nhận ra ngay sự khác biệt đó.
//
// Ba chỗ phải giữ nguyên ý, không được làm mềm:
//   - `wr-16` nói mệt kéo dài là "tín hiệu cần nghe, không phải kẻ thù cần
//     thắng", và khuyên nói với một người thật nếu kéo dài nhiều tuần. Đó là
//     câu duy nhất trong pool chỉ ra ngoài ứng dụng.
//   - `QUIET_CORNER_LIMITS` là ranh giới pháp lý và đạo đức của trang, luôn
//     hiển thị, không gập lại được.
//   - Đoạn kết đứng TRƯỚC ranh giới có chủ đích: ấn tượng cuối cùng phải là
//     lời cho phép rời đi, không phải lời cảnh báo. Thứ tự đó nằm ở component,
//     nhưng bản dịch không được làm đoạn kết nghe như một disclaimer thứ hai.
//
// Khoá theo `id` với nỗi lo và câu hỏi; phần còn lại khoá theo tên trường.
//
// Xem AGENTS.md, mục "Translating the UI".

export const quietCornerCopyVi = {
  quietGreeting: {
    lateNight:
      "Đã quá nửa đêm. Nỗi lo nào cũng nghe to hơn vào giờ này - chúng sẽ nhỏ lại dưới ánh sáng ban ngày.",
    morning: "Chào buổi sáng. Ngày chưa đòi hỏi gì ở bạn cả - khoan hãy vội.",
    afternoon:
      "Giữa một ngày bận, bạn vẫn ghé qua đây - vậy là bạn biết tự cho mình một quãng nghỉ.",
    evening: "Ngày hôm nay đã xong phần việc của nó. Buổi tối còn lại là của bạn.",
    night: "Đêm đã khuya. Không còn việc gì của hôm nay bắt buộc phải xong nữa.",
  },
  worrySetDown: {
    action: "Mình đặt nó xuống hôm nay",
    done: "Đã đặt xuống. Nó vẫn ở đây nếu bạn muốn cầm lên xem lại.",
  },
  quietQuestions: {
    title: "Ba câu hỏi cho nỗi lo của riêng bạn",
    intro:
      "Khi nỗi lo không nằm trong danh sách trên, ba câu này thường đủ để tách phần xử lý được ra khỏi phần chỉ có thể chờ.",
  },
  quietClosing: {
    title: "Trước khi bạn quay lại",
    line1: "Không có gì trên trang này cần hoàn thành, nên cũng không có gì đang dở dang.",
    line2:
      "Nghỉ đủ rồi thì quay lại. Chưa đủ thì ở thêm một lát. Ngọn lửa không tắt khi bạn rời đi.",
  },
  quietLimits: {
    title: "Trang này không thay thế được điều gì",
    body: "Đây là một góc để dừng lại một phút, không phải tư vấn tâm lý và cũng không phải tư vấn nghề nghiệp. Nếu sự lo lắng kéo dài, ảnh hưởng tới giấc ngủ, công việc hay các mối quan hệ của bạn, hãy nói chuyện với một người bạn tin tưởng hoặc tìm tới chuyên gia sức khoẻ tâm thần. Việc đó không phải là yếu đuối - nó cũng giống như đi khám khi cơ thể có vấn đề vậy.",
  },
  worryReframes: {
    "wr-01": {
      worry: "Mình đang tụt lại phía sau so với bạn bè cùng tuổi.",
      reframe:
        "Bạn đang so sánh phần trong của mình với phần ngoài của họ - bạn biết hết nợ và nỗi lo của bản thân, nhưng chỉ thấy phần họ chọn cho bạn thấy. So sánh với chính mình sáu tháng trước mới là phép đo có thật.",
    },
    "wr-02": {
      worry: "Mình bắt đầu quá muộn rồi.",
      reframe:
        "Muộn hơn lý tưởng không có nghĩa là hết. Thời điểm tốt thứ hai để bắt đầu luôn là bây giờ, và điều đó đúng ở mọi độ tuổi - câu này không phải để an ủi, nó chỉ là số học.",
    },
    "wr-03": {
      worry: "Mình sợ mở lại đoạn mã mình viết sáu tháng trước.",
      reframe:
        "Né tránh làm nỗi lo lớn lên chứ không nhỏ đi - phần đáng sợ nhất thường là khoảng trống bạn tự lấp bằng tưởng tượng. Đoạn mã thật, dù tệ, vẫn là thứ hữu hạn và sửa được.",
    },
    "wr-04": {
      worry: "Mình thấy tệ vì đã chọn sai công nghệ cho dự án.",
      reframe:
        "Bạn quyết định bằng thông tin có lúc đó, không phải thông tin bây giờ. Đánh giá lại lựa chọn bằng những gì chỉ sau này mới biết là tự phạt mình vì một việc bất khả.",
    },
    "wr-05": {
      worry: "Nhìn vào đống thứ phải học là mình thấy nghẹt thở, không biết bắt đầu từ đâu.",
      reframe:
        "Cảm giác đó thường đến từ việc ôm tất cả cùng lúc chứ không từ độ khó thật. Chọn đúng một thứ nhỏ cho hôm nay và cho phép mình bỏ qua phần còn lại tới mai.",
    },
    "wr-06": {
      worry: "Mình thấy mình kém cỏi vì không hiểu mấy thứ kỹ thuật này.",
      reframe:
        "Không ai sinh ra đã biết. Đây là kiến thức chuyên môn phải học, không phải bản năng ai cũng có sẵn - việc bạn thấy khó là dấu hiệu bạn đang học thật, không phải dấu hiệu bạn kém.",
    },
    "wr-07": {
      worry: "Mình thấy có lỗi mỗi khi nghỉ ngơi thay vì học thêm.",
      reframe:
        "Một nhịp học mà mọi lúc nghỉ đều kèm cảm giác tội lỗi là nhịp sẽ bị bỏ. Chỗ cho việc nghỉ không phải là lỗ hổng của kế hoạch - nó là thứ giữ kế hoạch sống được.",
    },
    "wr-08": {
      worry: "Mình lo mình sẽ chẳng bao giờ giỏi đủ.",
      reframe:
        "\"Đủ\" không có mốc mặc định - nếu không tự định nghĩa, nó sẽ luôn lùi ra xa đúng bằng tốc độ bạn tiến tới. Viết ra một thứ cụ thể bạn muốn làm được biến nỗi lo vô hạn thành một mục tiêu hữu hạn.",
    },
    "wr-09": {
      worry: "Mình đang giấu đội một chỗ trong hệ thống mà mình biết là hỏng.",
      reframe:
        "Chỗ hỏng có phạm vi, còn sự giấu giếm thì không - và thứ không đo được mới là thứ nặng thêm mỗi ngày. Không cần báo cho tất cả mọi người; một người trong đội biết chuyện là gánh đã được chia đôi.",
    },
    "wr-10": {
      worry: "Đồng nghiệp nhờ làm giúp ngoài giờ, mình không biết từ chối sao cho phải.",
      reframe:
        "Từ chối một việc không phải là từ chối một con người. Một lời không rõ ràng và tử tế thường giữ được quan hệ lâu hơn một cái gật đầu miễn cưỡng kèm theo ấm ức.",
    },
    "wr-11": {
      worry: "Xung quanh ai cũng khoe dự án mới, chỉ mình vẫn loay hoay.",
      reframe:
        "Bạn đang nghe những dự án chạy được kể lại - phần hỏng giữa chừng hiếm khi được đem đi khoe. Đi chậm ở một thứ mình chưa hiểu không phải là tụt lại; đó là sự cẩn thận đang làm đúng việc của nó.",
    },
    "wr-12": {
      worry: "Cả nhà trông vào thu nhập của mình, mình không được phép sai.",
      reframe:
        "Trụ cột cũng là người - được phép mệt, được phép sai rồi sửa. Điều gia đình cần về lâu dài không phải một người không bao giờ sai, mà một người không gãy; và người không gãy là người biết lúc nào cần đặt gánh xuống.",
    },
    "wr-13": {
      worry: "Mình sợ mất việc và không có gì để dựa vào.",
      reframe:
        "Nỗi sợ đó đang chỉ đúng chỗ: nó không phải chuyện tính cách, nó là chuyện chưa có đệm. Đệm không cần lớn ngay - một kỹ năng nữa dùng được ở nơi khác đã đổi hẳn cảm giác so với con số không, và nó xây được bằng những buổi rất ngắn.",
    },
    "wr-14": {
      worry: "Lương mình mãi không tăng, cố gắng cũng chẳng để làm gì.",
      reframe:
        "Thu nhập tăng theo bậc chứ hiếm khi tăng đều, nên quãng phẳng không có nghĩa là đứng yên - phần lớn thứ tạo ra bậc tiếp theo được tích trong đúng những quãng phẳng đó. Điều bạn kiểm soát được là năng lực và thông tin về mức giá thị trường của nó.",
    },
    "wr-15": {
      worry: "Mình muốn đổi hướng nhưng sợ mất hết những gì đã xây.",
      reframe:
        "Phần lớn thứ bạn đã xây là kỹ năng và cách làm việc, và chúng đi theo bạn qua mọi ngành. Thứ thật sự mất đi thường nhỏ hơn nhiều so với con số bạn đang hình dung - và chi phí chìm thì không nên là lý do để ở lại.",
    },
    "wr-16": {
      worry: "Mình thấy mệt và không còn muốn cố gắng nữa.",
      reframe:
        "Mệt kéo dài là tín hiệu cần nghe, không phải kẻ thù cần thắng. Nghỉ có kế hoạch rẻ hơn rất nhiều so với nghỉ vì kiệt sức - và nếu cảm giác này ở lại nhiều tuần, đó là lúc nên nói với một người thật, không phải cố thêm một chút nữa.",
    },
  } as Record<string, { worry: string; reframe: string }>,
  quietQuestionItems: {
    "qq-01": {
      question: "Đây là một vấn đề, hay là một cảm giác về vấn đề?",
      note: "Vấn đề có con số và có hạn: còn thiếu bao nhiêu, tới ngày nào. Cảm giác thì không có bờ, nên nó nghe to hơn nhiều so với thứ đang thật sự xảy ra. Viết ra con số cụ thể là cách nhanh nhất để biết mình đang đối mặt với cái nào.",
    },
    "qq-02": {
      question: "Có việc gì tôi làm được trong tuần này không?",
      note: "Nếu có, nó thường nhỏ hơn nhiều so với hình dung - mở một bảng sao kê, hỏi một câu, viết ra một danh sách. Nếu không có việc nào, thì nỗi lo này thuộc nhóm phải chờ, và ngồi nghĩ thêm về nó tối nay không làm nó ngắn lại.",
    },
    "qq-03": {
      question: "Một năm nữa nhìn lại, chuyện này còn lớn thế này không?",
      note: "Câu này không để phủ nhận nỗi lo mà để đặt lại tỷ lệ. Một số chuyện vẫn sẽ lớn, và biết được điều đó cũng có ích - nó cho bạn lý do để xử lý nghiêm túc thay vì để đó. Phần lớn còn lại thì không, và chúng đang chiếm chỗ nhiều hơn phần chúng đáng.",
    },
  } as Record<string, { question: string; note: string }>,
};

export const quietCornerCopyEn: typeof quietCornerCopyVi = {
  quietGreeting: {
    lateNight:
      "It's past midnight. Every worry sounds louder at this hour - they get smaller in daylight.",
    morning: "Good morning. The day hasn't asked anything of you yet - there's no rush.",
    afternoon:
      "In the middle of a busy day you still came here - so you do know how to give yourself a pause.",
    evening: "Today has done its share of the work. The rest of the evening is yours.",
    night: "It's late. Nothing left from today has to be finished tonight.",
  },
  worrySetDown: {
    action: "I'm setting this down for today",
    done: "Set down. It'll still be here if you want to pick it up again.",
  },
  quietQuestions: {
    title: "Three questions for a worry of your own",
    intro:
      "When your worry isn't on the list above, these three are usually enough to separate the part you can act on from the part that can only be waited out.",
  },
  quietClosing: {
    title: "Before you head back",
    line1: "There's nothing on this page to complete, so there's nothing left unfinished either.",
    line2:
      "Go back when you've rested enough. Stay a little longer if you haven't. The fire doesn't go out when you leave.",
  },
  quietLimits: {
    title: "This page doesn't replace anything",
    body: "This is a corner to stop in for a minute. It isn't therapy, and it isn't career advice. If the anxiety persists, or it's affecting your sleep, your work or your relationships, talk to someone you trust or reach out to a mental health professional. That isn't weakness - it's the same as seeing a doctor when something is wrong with your body.",
  },
  worryReframes: {
    "wr-01": {
      worry: "I'm falling behind people my own age.",
      reframe:
        "You're comparing your inside to their outside - you know every debt and every worry of your own, and you only see the part they chose to show you. Comparing yourself to yourself six months ago is the measurement that's actually real.",
    },
    "wr-02": {
      worry: "I started far too late.",
      reframe:
        "Later than ideal doesn't mean over. The second-best time to start is always now, and that holds at any age - this isn't meant as comfort, it's just arithmetic.",
    },
    "wr-03": {
      worry: "I'm afraid to reopen the code I wrote six months ago.",
      reframe:
        "Avoiding it makes the worry grow, not shrink - the frightening part is usually the blank you're filling in with imagination. The real code, however bad, is finite and fixable.",
    },
    "wr-04": {
      worry: "I feel awful about picking the wrong technology for a project.",
      reframe:
        "You decided with the information you had then, not the information you have now. Judging that choice by what only became knowable later is punishing yourself for something impossible.",
    },
    "wr-05": {
      worry: "Looking at everything I still have to learn makes my chest tighten. I don't know where to start.",
      reframe:
        "That feeling usually comes from holding all of it at once, not from how hard it actually is. Pick exactly one small thing for today, and give yourself permission to leave the rest until tomorrow.",
    },
    "wr-06": {
      worry: "I feel stupid for not understanding this technical stuff.",
      reframe:
        "Nobody is born knowing it. This is specialist knowledge you have to be taught, not an instinct everyone else came with - finding it hard is a sign you're really learning, not a sign you're slow.",
    },
    "wr-07": {
      worry: "I feel guilty every time I rest instead of studying more.",
      reframe:
        "A study rhythm where every break comes with guilt is a rhythm that gets abandoned. Room for rest isn't a hole in the plan - it's what keeps the plan alive.",
    },
    "wr-08": {
      worry: "I worry I'll never be good enough.",
      reframe:
        "\"Enough\" has no default mark - if you don't define it, it retreats at exactly the speed you advance. Writing down one specific thing you want to be able to build turns an endless worry into a finite goal.",
    },
    "wr-09": {
      worry: "I'm hiding a part of the system from my team that I know is broken.",
      reframe:
        "The broken part has a scope; the hiding doesn't - and the thing you can't measure is the one that gets heavier every day. You don't have to tell everyone; one person on the team knowing already halves it.",
    },
    "wr-10": {
      worry: "A colleague asked me to help outside working hours and I don't know how to say no properly.",
      reframe:
        "Turning down a task isn't turning down a person. A clear, kind no usually preserves the relationship longer than a reluctant yes carrying resentment behind it.",
    },
    "wr-11": {
      worry: "Everyone around me is posting new projects and I'm the only one still stuck.",
      reframe:
        "You're hearing about the projects that shipped - the parts that broke halfway rarely get posted. Going slowly on something you don't understand yet isn't falling behind; that's care doing its job.",
    },
    "wr-12": {
      worry: "My whole family depends on my income. I'm not allowed to get it wrong.",
      reframe:
        "The person holding things up is still a person - allowed to be tired, allowed to be wrong and then fix it. What a family needs over the long run isn't someone who never errs, it's someone who doesn't break; and the person who doesn't break is the one who knows when to set the weight down.",
    },
    "wr-13": {
      worry: "I'm scared of losing my job with nothing to fall back on.",
      reframe:
        "That fear is pointing at the right thing: it isn't about your character, it's about not having a cushion yet. The cushion doesn't have to be big straight away - one more skill that transfers elsewhere already changes how it feels against zero, and it's built in very short sessions.",
    },
    "wr-14": {
      worry: "My salary never moves. Trying harder doesn't seem to matter.",
      reframe:
        "Income rises in steps and rarely in a smooth line, so a flat stretch isn't standing still - most of what produces the next step gets accumulated during exactly those flat stretches. What you control is your capability, and knowing what it's worth on the market.",
    },
    "wr-15": {
      worry: "I want to change direction but I'm afraid of losing everything I've built.",
      reframe:
        "Most of what you've built is skill and the way you work, and those travel with you into any industry. What is genuinely lost is usually far smaller than the figure you're picturing - and a sunk cost shouldn't be the reason you stay.",
    },
    "wr-16": {
      worry: "I'm tired and I don't want to keep trying.",
      reframe:
        "Tiredness that lasts is a signal to listen to, not an enemy to beat. A planned rest is far cheaper than a rest forced by burnout - and if this feeling stays for weeks, that's the point to tell a real person, not to push a little further.",
    },
  },
  quietQuestionItems: {
    "qq-01": {
      question: "Is this a problem, or a feeling about a problem?",
      note: "A problem has a number and a limit: how much is short, and by when. A feeling has no edges, so it sounds much louder than whatever is actually happening. Writing down the specific figure is the fastest way to tell which one you're facing.",
    },
    "qq-02": {
      question: "Is there anything I can do about it this week?",
      note: "If there is, it's usually far smaller than it looked - opening a statement, asking one question, writing one list. If there isn't, then this worry belongs to the waiting kind, and sitting with it tonight won't make it any shorter.",
    },
    "qq-03": {
      question: "Looking back a year from now, will this still be this big?",
      note: "This question isn't there to dismiss the worry, it's there to reset the scale. Some things will still be big, and knowing that helps too - it gives you a reason to deal with them properly rather than leave them. Most of the rest won't be, and they're taking up more room than they've earned.",
    },
  },
};
