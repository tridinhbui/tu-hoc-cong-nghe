// Dictionary section for the privacy policy and terms-of-service pages, plus
// FloatingChatbot and LevelUpModal. See "Translating the UI" in AGENTS.md.
//
// privacyPolicy/terms are a translation of a legal document: translated
// faithfully and literally, not tightened or modernised. Review by whoever
// owns the policy before the English version is treated as binding.

export const legalChatVi = {
  privacyPolicy: {
    backLink: "Quay lại",
    title: "Chính sách bảo mật",
    updatedAt: "Cập nhật lần cuối: {date}",
    section1Heading: "1. Thông tin chúng tôi thu thập",
    section1Items: [
      "Email và tên hiển thị khi bạn đăng ký (qua email hoặc đăng nhập Google)",
      "Tiến độ học tập: bài đã hoàn thành, điểm quiz, thời gian học",
      "Nội dung bạn chủ động gửi: tin nhắn góp ý, tin nhắn chat với admin",
      "Thông tin kỹ thuật cơ bản (loại trình duyệt, thời gian truy cập) phục vụ vận hành và debug",
    ],
    section2Heading: "2. Mục đích sử dụng",
    section2Body:
      "Thông tin trên chỉ được dùng để: vận hành tài khoản và lưu tiến độ học tập của bạn, phản hồi góp ý/hỗ trợ, và cải thiện nội dung bài học. Chúng tôi không bán dữ liệu cá nhân của bạn cho bên thứ ba.",
    section3Heading: "3. Nơi lưu trữ dữ liệu",
    section3Body:
      "Dữ liệu tài khoản và tiến độ học tập được lưu trữ trên hạ tầng của Supabase (nhà cung cấp cơ sở dữ liệu/backend). Nếu bạn đăng nhập bằng Google, một phần thông tin (tên, ảnh đại diện, email) được lấy từ tài khoản Google của bạn theo sự đồng ý khi đăng nhập.",
    section4Heading: "4. Quyền của bạn",
    section4Body:
      "Bạn có thể yêu cầu xem, chỉnh sửa, hoặc xóa dữ liệu tài khoản của mình bất cứ lúc nào bằng cách liên hệ trực tiếp qua email bên dưới. Xóa tài khoản sẽ xóa toàn bộ tiến độ học tập liên quan.",
    section5Heading: "5. Bảo mật",
    section5Body:
      "Mật khẩu được mã hóa và quản lý bởi Supabase Auth, chúng tôi không bao giờ nhìn thấy hoặc lưu trữ mật khẩu dạng văn bản thuần. Kết nối giữa trình duyệt và máy chủ được mã hóa qua HTTPS.",
    section6Heading: "6. Liên hệ",
    section6Part1: "Mọi câu hỏi về quyền riêng tư hoặc yêu cầu xóa dữ liệu, vui lòng liên hệ",
    section6Part2: ".",
  },
  terms: {
    backLink: "Quay lại",
    title: "Điều khoản sử dụng",
    updatedAt: "Cập nhật lần cuối: {date}",
    section1Heading: "1. Về sản phẩm này",
    section1Body:
      "Tự học Công nghệ là một dự án giáo dục cá nhân, phi thương mại, được xây dựng để giúp người Việt Nam tiếp cận kiến thức công nghệ từ nền tảng tới chuyên sâu theo lộ trình từng ngày. Nội dung do một cá nhân biên soạn, không phải sản phẩm của một tổ chức đào tạo, công ty công nghệ, hay cơ quan được cấp phép cấp chứng chỉ nghề.",
    section2Heading: "2. Không phải tư vấn kỹ thuật cho hệ thống của bạn",
    section2Body:
      "Toàn bộ nội dung bài học, ví dụ, đoạn mã minh họa trên trang này chỉ nhằm mục đích giáo dục. Đây không phải tư vấn kiến trúc, khuyến nghị chọn công nghệ cụ thể cho hệ thống của bạn, hay tư vấn bảo mật/pháp lý. Bạn tự chịu trách nhiệm với các quyết định kỹ thuật của mình và nên tham khảo chuyên gia cho các quyết định quan trọng.",
    section3Heading: "3. Tài khoản của bạn",
    section3Body:
      "Bạn cần tạo tài khoản (qua email hoặc Google) để lưu tiến độ học tập. Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình. Chúng tôi có thể tạm khóa tài khoản nếu phát hiện hành vi lạm dụng hệ thống (spam, cố tình khai thác lỗ hổng, v.v).",
    section4Heading: "4. Nội dung & tài liệu tải về",
    section4Body:
      "Nội dung bài học và tài liệu ở mục \"Tài liệu miễn phí\" được cung cấp miễn phí cho mục đích học tập cá nhân. Vui lòng không sao chép, phân phối lại với mục đích thương mại mà không xin phép.",
    section5Heading: "5. Giới hạn trách nhiệm",
    section5Body:
      "Sản phẩm được cung cấp \"nguyên trạng\", không đảm bảo không có lỗi hay luôn sẵn sàng 100% thời gian. Chúng tôi không chịu trách nhiệm cho các thiệt hại phát sinh từ việc áp dụng thông tin trên trang vào hệ thống thật.",
    section6Heading: "6. Thay đổi điều khoản",
    section6Body:
      "Điều khoản này có thể được cập nhật khi sản phẩm phát triển thêm. Phiên bản mới nhất luôn được đăng tại trang này.",
    section7Heading: "7. Liên hệ",
    section7Part1: "Mọi câu hỏi về điều khoản sử dụng, vui lòng liên hệ",
    section7Part2: ".",
  },
  chatbot: {
    feedbackSubject: "Góp ý từ ứng dụng",
    anonName: "Ẩn danh",
    fabAriaLabel: "Liên hệ admin",
    fabTitle: "Góp ý & đóng góp",
    headerTitle: "Góp ý & Đóng góp",
    headerSubtitle: "Giúp chúng mình phát triển sản phẩm tốt hơn",
    sentTitle: "Đã nhận được!",
    sentBody: "Cảm ơn bạn đã góp ý. Chúng mình sẽ đọc và phản hồi sớm nhất có thể.",
    sentAnother: "Gửi thêm góp ý",
    nameLabel: "Tên của bạn",
    namePlaceholder: "Nguyễn Văn A",
    emailLabel: "Email (để admin phản hồi)",
    emailPlaceholder: "ban@email.com",
    errorSend: "Không gửi được, vui lòng thử lại sau.",
    cooldownError: "Vui lòng đợi {seconds} giây rồi gửi tiếp.",
    messageLabel: "Góp ý / Đóng góp",
    messageLabelRequired: "(bắt buộc)",
    messagePlaceholder: "Ví dụ: Bài học X còn thiếu phần giải thích về Y, hoặc mình muốn đóng góp nội dung về Z...",
    submitSending: "Đang gửi...",
    submitIdle: "Gửi góp ý",
    contactViaEmail: "Hoặc liên hệ qua email:",
  },
  levelUp: {
    dialogAriaLabel: "Lên cấp",
    closeAriaLabel: "Đóng",
    kicker: "Lên cấp!",
    heading: "Level {level}",
    headingWithName: "Level {level} · {name}",
    subtitle: "Kiến thức công nghệ của bạn đang tích luỹ thật sự. Tiếp tục phát huy nhé!",
    download: "Tải ảnh",
    share: "Chia sẻ",
    confirm: "Tuyệt vời! 🎉",
    toastSharedOrSaved: "Đã lưu/chia sẻ ảnh thành tích! 🎉",
    toastDownloaded: "Đã tải ảnh thành tích! Đăng lên story/Facebook khoe ngay nào 🎉",
    toastDownloadError: "Không thể tạo ảnh lúc này.",
    toastShared: "Đã chia sẻ thành tích!",
    toastSharedDownloaded: "Đã tải ảnh - đăng lên Facebook/story và đính kèm ảnh này nhé!",
    toastShareError: "Không thể chia sẻ lúc này.",
    shareCaption: "Mình vừa lên cấp {level} tại Tự Học Công Nghệ 🎉",
    shareCaptionWithName: "Mình vừa lên Level {level} - {name} trên Tự học Công nghệ! 🎉",
    svgHeaderName: "TỰ HỌC TÀI CHÍNH MỖI NGÀY",
    svgTitle: "THÀNH TÍCH LÊN CẤP",
    svgUserAchieved: "{userName} vừa đạt",
    svgLevel: "Level {level}",
    svgLevelWithName: "Level {level} · {name}",
    svgFooter: "HỌC TÀI CHÍNH MỖI NGÀY · TUHOCTAICHINH.COM",
  },
};

export const legalChatEn: typeof legalChatVi = {
  privacyPolicy: {
    backLink: "Back",
    title: "Privacy Policy",
    updatedAt: "Last updated: {date}",
    section1Heading: "1. Information we collect",
    section1Items: [
      "Email and display name when you sign up (via email or Google login)",
      "Learning progress: completed lessons, quiz scores, study time",
      "Content you actively send: feedback messages, chat messages with the admin",
      "Basic technical information (browser type, access time) used for operation and debugging",
    ],
    section2Heading: "2. Purpose of use",
    section2Body:
      "The information above is only used to: operate your account and save your learning progress, respond to feedback/support, and improve lesson content. We do not sell your personal data to third parties.",
    section3Heading: "3. Where data is stored",
    section3Body:
      "Account data and learning progress are stored on Supabase's infrastructure (a database/backend provider). If you sign in with Google, some information (name, avatar, email) is taken from your Google account with your consent given at sign-in.",
    section4Heading: "4. Your rights",
    section4Body:
      "You can request to view, edit, or delete your account data at any time by contacting us directly via the email below. Deleting your account will delete all related learning progress.",
    section5Heading: "5. Security",
    section5Body:
      "Passwords are encrypted and managed by Supabase Auth; we never see or store passwords in plain text. The connection between the browser and the server is encrypted via HTTPS.",
    section6Heading: "6. Contact",
    section6Part1: "For any questions about privacy or requests to delete data, please contact",
    section6Part2: ".",
  },
  terms: {
    backLink: "Back",
    title: "Terms of Service",
    updatedAt: "Last updated: {date}",
    section1Heading: "1. About this product",
    section1Body:
      "Tự học Công nghệ is a personal, non-commercial educational project, built to help Vietnamese people access technology knowledge, from the fundamentals to advanced topics, on a day-by-day path. The content is written by an individual, and is not the product of a training institution, a technology company, or an agency licensed to award professional certifications.",
    section2Heading: "2. Not technical advice for your own systems",
    section2Body:
      "All lesson content, examples, and illustrative code on this site are for educational purposes only. This is not architectural advice, a recommendation to adopt any specific technology for your system, or security/legal advice. You are solely responsible for your own technical decisions and should consult a professional for important ones.",
    section3Heading: "3. Your account",
    section3Body:
      "You need to create an account (via email or Google) to save your learning progress. You are responsible for keeping your login information secure. We may temporarily suspend an account if we detect abuse of the system (spam, deliberate exploitation of vulnerabilities, etc.).",
    section4Heading: "4. Content & downloadable materials",
    section4Body:
      "Lesson content and materials in the \"Free materials\" section are provided free of charge for personal learning purposes. Please do not copy or redistribute them for commercial purposes without permission.",
    section5Heading: "5. Limitation of liability",
    section5Body:
      "The product is provided \"as is\", with no guarantee that it is free of errors or available 100% of the time. We are not responsible for damages arising from applying the information on this site to real systems.",
    section6Heading: "6. Changes to these terms",
    section6Body:
      "These terms may be updated as the product develops further. The latest version is always posted on this page.",
    section7Heading: "7. Contact",
    section7Part1: "For any questions about these terms of service, please contact",
    section7Part2: ".",
  },
  chatbot: {
    feedbackSubject: "Feedback from the app",
    anonName: "Anonymous",
    fabAriaLabel: "Contact admin",
    fabTitle: "Feedback & contributions",
    headerTitle: "Feedback & Contributions",
    headerSubtitle: "Help us make the product better",
    sentTitle: "Received!",
    sentBody: "Thanks for your feedback. We'll read it and reply as soon as we can.",
    sentAnother: "Send more feedback",
    nameLabel: "Your name",
    namePlaceholder: "Nguyễn Văn A",
    emailLabel: "Email (for the admin to reply)",
    emailPlaceholder: "you@email.com",
    errorSend: "Couldn't send, please try again later.",
    cooldownError: "Please wait {seconds} seconds before sending again.",
    messageLabel: "Feedback / Contribution",
    messageLabelRequired: "(required)",
    messagePlaceholder: "For example: Lesson X is missing an explanation of Y, or I'd like to contribute content about Z...",
    submitSending: "Sending...",
    submitIdle: "Send feedback",
    contactViaEmail: "Or contact via email:",
  },
  levelUp: {
    dialogAriaLabel: "Level up",
    closeAriaLabel: "Close",
    kicker: "Level up!",
    heading: "Level {level}",
    headingWithName: "Level {level} · {name}",
    subtitle: "Your technology knowledge is really building up. Keep it going!",
    download: "Download",
    share: "Share",
    confirm: "Awesome! 🎉",
    toastSharedOrSaved: "Achievement image saved/shared! 🎉",
    toastDownloaded: "Achievement image downloaded! Post it to your story/Facebook now 🎉",
    toastDownloadError: "Couldn't create the image right now.",
    toastShared: "Achievement shared!",
    toastSharedDownloaded: "Image downloaded - post it to Facebook/story and attach this image!",
    toastShareError: "Couldn't share right now.",
    shareCaption: "I just reached Level {level} on Tự Học Công Nghệ 🎉",
    shareCaptionWithName: "I just reached Level {level} - {name} on Tự học Công nghệ! 🎉",
    svgHeaderName: "LEARN TECH EVERY DAY",
    svgTitle: "LEVEL-UP ACHIEVEMENT",
    svgUserAchieved: "{userName} just reached",
    svgLevel: "Level {level}",
    svgLevelWithName: "Level {level} · {name}",
    svgFooter: "LEARN TECH EVERY DAY · TUHOCTAICHINH.COM",
  },
};
