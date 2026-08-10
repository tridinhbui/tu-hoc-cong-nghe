// Nhóm nỗi lo ở góc yên tĩnh (/loi-nhan): năm nhãn nhóm và bốn dòng của khối
// chọn nhóm. Khoá theo `id`, vốn cũng là khoá lọc nỗi lo.
//
// TỆP NÀY BAN ĐẦU ĐỊNH GOM SÁU BỘ DỮ LIỆU NHỎ, và năm bộ kia đều bị cắt - hai
// lý do khác nhau, cả hai đáng ghi lại:
//
// BA BỘ KHÔNG AI VẼ RA. `SHOP_ITEMS`, `CHEST_REWARDS[].desc` và
// `ITEM_DESCRIPTIONS[].name` đều có HÌNH DẠNG của chuỗi hiển thị nhưng không
// component nào đọc: `SHOP_ITEMS` không được import ở đâu cả, còn
// `ITEM_DESCRIPTIONS` chỉ có `.icon` được vẽ (FinanceCharacterAvatar,
// CosmeticStore). Dịch chúng không sai, nó chỉ vô ích - và nó làm một con số
// "đã dịch" trông như tiến bộ. Chúng cố ý KHÔNG được đánh `i18n-ignore`: nếu
// ngày nào có component đọc tới, chúng phải hiện lại trong danh sách còn thiếu.
//
// KẾT CỤC CỦA BỘ ĐẦU TIÊN, ghi lại vì nó là cách xử lý đúng cho cả nhóm này:
// `SHOP_ITEMS` đã bị XOÁ chứ không được dịch. Bảy chuỗi của nó là bản sao
// nguyên văn của `CHEST_REWARDS`, nơi `desc` đã có lớp phủ ở lib-strings.ts
// (`chestDescriptions`) và CombinedRewardsWidget tra qua đó. Cả tệp
// lib/shop.ts không có tệp nào import, còn cửa hàng thật là CosmeticStore và
// nó dựng catalog riêng từ `t.cosmeticStore.items`. Dịch bản sao ấy sẽ tạo
// bảy khoá từ điển không bao giờ được vẽ; xoá nó vừa gỡ mã chết vừa làm con
// số coverage nói đúng sự thật. Cách nhận ra một bộ thuộc nhóm này: tìm chuỗi
// đó ở nơi khác trong repo trước, chứ không chỉ tìm component đọc hằng số.
//
// BỘ THỨ TƯ TỪNG BỊ XẾP NHẦM VÀO ĐÂY, và phép đo hụt ấy để 15 chuỗi ĐANG hiển
// thị nằm lại kèm một dòng chú thích nói rằng chúng không hiển thị.
// `WEEKLY_CAREER_MISSIONS` được mô tả là "chỉ được một route API đọc để ĐẾM".
// Route đó gọi buildWeeklyMissionState, và hàm này `...mission` nguyên bản ghi
// vào phản hồi - nên `title`, `description`, `ctaLabel` đi thẳng ra
// CareerProfilePanel, vốn render cả ba. Chúng giờ nằm ở libData.careerMissions,
// và lib/__tests__/lib-data-translations.test.ts bắt buộc đủ khoá.
//
// Bài học: "không component nào IMPORT hằng số" KHÔNG đồng nghĩa với "không
// hiển thị". Một spread ở tầng giữa là đủ để chuỗi đi tiếp mà không mang theo
// tên hằng số nào để grep ra.
//
// BỘ THỨ SÁU Ở LẠI, và đó là một vòng đi rồi về. Thông báo lỗi đăng nhập từng
// có mặt ở vi.ts/en.ts do phiên chạy song song đặt vào, nên tôi bỏ bản của
// mình để tránh hai khoá trùng tên trong cùng một spread. Rồi bản của họ biến
// mất khỏi vi.ts trong một thao tác stash, còn lib/auth-error-messages.ts thì
// vẫn tham chiếu `Dictionary["authErrors"]` - build hỏng, và chú thích trong
// chính tệp đó nói rằng chuỗi "nằm ở misc-data.ts". Nên chúng ở đây.
//
// Mẫu khớp trong auth-error-messages.ts là TIẾNG ANH THÔ của Supabase và không
// bao giờ dịch; thứ được dịch là câu trả về. Bản tiếng Anh cũng không phải
// chuỗi thô ấy mà là câu viết lại cho người đọc, cùng giọng với bản Việt.
//
// Xem AGENTS.md, mục "Translating the UI".

export const miscDataVi = {
  authErrors: {
    invalidEmail: "Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại.",
    notConfirmed:
      "Email chưa được xác nhận. Kiểm tra hộp thư của bạn hoặc gửi lại email xác nhận bên dưới.",
    badCredentials: "Email hoặc mật khẩu không đúng.",
    alreadyRegistered: "Email này đã có tài khoản. Hãy đăng nhập thay vì đăng ký.",
    passwordTooShort: "Mật khẩu phải có ít nhất 6 ký tự.",
    rateLimit: "Bạn đã thử quá nhiều lần. Vui lòng đợi một chút rồi thử lại.",
    network: "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.",
    generic: "Có lỗi xảy ra. Vui lòng thử lại.",
  },
  worryThemes: {
    "so-sanh": "So với người khác",
    "con-so": "Nhìn vào con số",
    "tu-trach": "Tự trách mình",
    "nguoi-than": "Người thân",
    "cong-viec": "Công việc và tương lai",
  } as Record<string, string>,
  worryThemePrompt: {
    question: "Lúc này chuyện gì đang nặng nhất?",
    note: "Chọn một nhóm thì những dòng gần bạn nhất được đưa lên trước. Không có dòng nào bị giấu đi.",
    clear: "Bỏ chọn",
    restHeading: "Những điều khác",
  },
};

export const miscDataEn: typeof miscDataVi = {
  authErrors: {
    invalidEmail: "That email address isn't valid. Please check it and try again.",
    notConfirmed:
      "This email hasn't been confirmed yet. Check your inbox, or resend the confirmation below.",
    badCredentials: "That email or password is incorrect.",
    alreadyRegistered: "There is already an account with this email. Sign in instead of signing up.",
    passwordTooShort: "The password must be at least 6 characters.",
    rateLimit: "Too many attempts. Please wait a moment and try again.",
    network: "Couldn't connect. Please check your network and try again.",
    generic: "Something went wrong. Please try again.",
  },
  worryThemes: {
    "so-sanh": "Comparing myself to others",
    "con-so": "Looking at the numbers",
    "tu-trach": "Blaming myself",
    "nguoi-than": "Family",
    "cong-viec": "Work and the future",
  },
  worryThemePrompt: {
    question: "What is weighing on you most right now?",
    note: "Pick a group and the lines closest to you move to the front. Nothing is hidden.",
    clear: "Clear",
    restHeading: "Everything else",
  },
};
