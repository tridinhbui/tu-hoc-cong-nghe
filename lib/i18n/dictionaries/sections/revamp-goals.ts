// Chữ cho đợt revamp BUILD → RUN → DEBUG → LEVEL UP (KE-HOACH-BUILD-RUN-DEBUG.md).
//
// Trang "Bắt đầu từ đâu" (/lo-trinh) và /hoc-theo-nhu-cau: mỗi lối học được
// trình bày như một NĂNG LỰC người học sẽ có, không như một môn học.
//
// `flows` khoá theo id trong lib/learning-flows.ts. Ba trường mỗi lối:
//   skill      - việc làm được sau khi đi hết lối, bắt đầu bằng động từ.
//   output     - thứ cụ thể cầm được ở cuối, lấy từ bài dự án `buildSlug`.
//   firstBuild - thứ ĐẦU TIÊN làm ra, lấy từ phần "Làm ngay hôm nay"
//                (`application`) của bài `firstWinSlug`, hoặc bản demo ngôi
//                nhà ở chặng 1 của lối website. Đổi bài mở đầu thì sửa câu này:
//                nó hứa đúng một việc có thật trong bài đó.
export const revampGoalsVi = {
  revampGoals: {
    effortHours: "{count} bài · ~{hours} giờ",
    effortMinutes: "{count} bài · ~{minutes} phút",
    effortLessons: "{count} bài",
    skillLabel: "KỸ NĂNG",
    outputLabel: "OUTPUT",
    firstBuildLabel: "Thứ đầu tiên bạn làm ra",
    pickHint: "Chọn một việc, xem thứ đầu tiên bạn sẽ làm ra, rồi bắt đầu.",
    select: "Chọn việc này",
    selected: "Đã chọn",
    start: "Bắt đầu",
    startWith: "Bắt đầu: {title}",
    firstLessonCta: "Làm thứ đầu tiên · {minutes} phút",
    goalOutput: "Đích đến",
    doneSoFar: "Đã xong {done} bài",
    // Bộ chọn "chọn nhiệm vụ" trên /lo-trinh (components/learning-flows/MissionPicker.tsx).
    mission: {
      title: "Hôm nay bạn muốn build cái gì?",
      hint: "Chọn một thứ bạn muốn làm ra. Mỗi hướng kết thúc bằng một sản phẩm thật của bạn.",
      starterLabel: "Hợp cho người mới",
      buildCta: "Bắt đầu xây",
      continueCta: "Học tiếp",
      viewPath: "Xem lộ trình",
      advancedTitle: "Khi đã quen tay",
      advancedHint: "Bốn hướng sâu hơn - dễ hơn nhiều nếu bạn đã đi xong một hướng ở trên.",
      levels: ["Người mới", "Cơ bản", "Trung bình", "Nâng cao"],
      levelAria: "Độ khó: {level}",
      progress: "{done}/{total} bài",
    },
    flows: {
      website: {
        skill: "Dựng, dàn trang và đưa một website lên mạng",
        output: "Trang web của bạn, có địa chỉ riêng",
        firstBuild:
          "Việc đầu tiên: sửa một trang web thật ngay ở chặng 1 - bật tắt CSS và JavaScript của ngôi nhà mẫu và xem từng phần đổi ra sao.",
      },
      "ai-assistant": {
        skill: "Giao việc cho AI và kiểm lại trước khi gửi đi",
        output: "Bot hỏi-đáp tài liệu nội bộ của phòng bạn",
        firstBuild:
          "Việc đầu tiên: một câu AI vừa viết cho bạn, có cả số điều và tên văn bản - rồi bạn tự dò xem nó có thật không.",
      },
      "ai-agent": {
        skill: "Cho AI dùng công cụ và tự làm nhiều bước",
        output: "Agent đầu tiên của bạn, chạy thật",
        firstBuild:
          "Việc đầu tiên: chạy thử một agent bằng giấy bút - lấy một việc lặp lại của bạn, viết ra từng vòng quan sát, suy luận, gọi công cụ.",
      },
      "ai-marketing": {
        skill: "Viết nội dung đúng giọng và đo cái gì hiệu quả",
        output: "Quy trình nội dung hằng tuần với AI",
        firstBuild:
          "Việc đầu tiên: hai bản của cùng một bài đăng đặt cạnh nhau - một bản AI viết mù, một bản có ba câu mô tả khách hàng của bạn.",
      },
      automation: {
        skill: "Dựng quy trình tự chạy thay bạn mỗi tuần",
        output: "Dashboard tự làm mới từ một API",
        firstBuild:
          "Việc đầu tiên: bản đồ của một việc bạn làm tay mỗi tuần - sự kiện kích hoạt, các nhánh, từng hành động và dữ liệu nó cần.",
      },
      "data-ai": {
        skill: "Biến bảng số lộn xộn thành nhận xét đã kiểm",
        output: "Trang nhận xét kinh doanh, từng số đã kiểm",
        firstBuild:
          "Việc đầu tiên: một bảng thật của bạn, làm sạch qua năm bước, với tổng trước và sau đã đối chiếu với sổ.",
      },
      "ai-safety": {
        skill: "Chặn rò rỉ dữ liệu và lừa đảo trước khi thành sự cố",
        output: "Chính sách dùng AI một trang cho phòng bạn",
        firstBuild:
          "Việc đầu tiên: rà lịch sử trò chuyện AI tuần qua của bạn, xếp mỗi lần dán vào một trong bốn mức dữ liệu.",
      },
      "ai-builder": {
        skill: "Gọi LLM, cho nó đọc tài liệu, và đo nó chạy đúng",
        output: "Bot tài liệu nội bộ bản kỹ sư, lên production",
        firstBuild:
          "Việc đầu tiên: log số token vào và ra cho mỗi lời gọi LLM - thứ cho bạn biết hội thoại nào đang đắt dần lên.",
      },
    },
  },
};

export const revampGoalsEn: typeof revampGoalsVi = {
  revampGoals: {
    effortHours: "{count} lessons · ~{hours} h",
    effortMinutes: "{count} lessons · ~{minutes} min",
    effortLessons: "{count} lessons",
    skillLabel: "SKILL",
    outputLabel: "OUTPUT",
    firstBuildLabel: "The first thing you'll make",
    pickHint: "Pick one thing, see the first thing you'll make, then start.",
    select: "Pick this",
    selected: "Selected",
    start: "Start",
    startWith: "Start: {title}",
    firstLessonCta: "Make the first thing · {minutes} min",
    goalOutput: "Where it ends",
    doneSoFar: "{done} lessons done",
    mission: {
      title: "What do you want to build today?",
      hint: "Pick something you want to make. Every path ends with a real thing of your own.",
      starterLabel: "Great for beginners",
      buildCta: "Start building",
      continueCta: "Keep going",
      viewPath: "See the path",
      advancedTitle: "Once you've got the hang of it",
      advancedHint: "Four deeper paths - much easier once you've finished one of the paths above.",
      levels: ["Beginner", "Basic", "Intermediate", "Advanced"],
      levelAria: "Difficulty: {level}",
      progress: "{done}/{total} lessons",
    },
    flows: {
      website: {
        skill: "Build, lay out and publish a website",
        output: "Your own website, at its own address",
        firstBuild:
          "First up: edit a real web page right in step 1 - switch the sample house's CSS and JavaScript on and off and watch each part change.",
      },
      "ai-assistant": {
        skill: "Hand work to AI and check it before it goes out",
        output: "A Q&A bot over your team's internal docs",
        firstBuild:
          "First up: a sentence AI just wrote for you, complete with an article number and a document name - then you check whether any of it is real.",
      },
      "ai-agent": {
        skill: "Give AI tools and let it work through several steps",
        output: "Your first agent, running for real",
        firstBuild:
          "First up: run an agent on paper - take one of your repeating tasks and write out each loop of observe, reason, call a tool.",
      },
      "ai-marketing": {
        skill: "Write on-brand content and measure what works",
        output: "A weekly content workflow with AI",
        firstBuild:
          "First up: two versions of the same post side by side - one AI wrote blind, one with three sentences about your customer.",
      },
      automation: {
        skill: "Build workflows that run for you every week",
        output: "A dashboard that refreshes itself from an API",
        firstBuild:
          "First up: a map of one task you do by hand each week - the trigger, the branches, each action and the data it needs.",
      },
      "data-ai": {
        skill: "Turn a messy table into findings you have checked",
        output: "A business findings page, every number checked",
        firstBuild:
          "First up: one of your real tables cleaned in five steps, with the totals before and after reconciled against the books.",
      },
      "ai-safety": {
        skill: "Stop data leaks and scams before they become incidents",
        output: "A one-page AI use policy for your team",
        firstBuild:
          "First up: review last week's AI chat history and sort every paste into one of four data levels.",
      },
      "ai-builder": {
        skill: "Call an LLM, give it your documents, and measure it works",
        output: "An engineer's internal docs bot, in production",
        firstBuild:
          "First up: log the input and output tokens of every LLM call - the thing that tells you which conversation is getting more expensive.",
      },
    },
  },
};
