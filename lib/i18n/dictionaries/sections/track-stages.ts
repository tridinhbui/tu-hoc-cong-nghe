// Tên hai lộ trình, 53 chặng và 125 phần của chúng - phần chữ hiện dày nhất
// trên /hoc-bai và trong mọi thẻ tiến độ.
//
// KHOÁ THEO VỊ TRÍ, không theo tên. `TRACK_PERSONAL`/`TRACK_PROFESSIONAL` trong
// lib/track-stages.ts vẫn là nguồn duy nhất của cấu trúc: `days`,
// `extraLessonIds`, `available` quyết định bài nào thuộc chặng nào, và chúng
// không dịch được. Chỗ này chỉ thay phần chữ, đúng cách một bản dịch bài học là
// một patch đắp lên bài tiếng Việt chứ không phải bản sao của nó.
//
// Vị trí thay vì tên tiếng Việt vì cùng lý do với `level-titles.ts`: sửa một
// chữ trong dữ liệu mà khoá theo tên thì bản dịch rơi mất, im lặng, không có
// lỗi biên dịch nào. Đổi lại, thêm hay bớt một chặng mà quên sửa ở đây cũng im
// lặng như vậy - nên `lib/__tests__/track-stages-i18n.test.ts` đối chiếu cả ba:
// bản Việt ở đây phải khớp TỪNG CHỮ với dữ liệu, và bản Anh phải khớp hình dạng.
//
// Nhãn "Chặng" dịch thành "Stage", không phải "Chapter": nó là một quãng của lộ
// trình đo bằng dải bài học, còn "chapter" gợi ý một cuốn sách có mục lục cố
// định. Thuật ngữ kỹ thuật đã là tiếng Anh trong bản gốc - "SLO", "REST",
// "Foundations of Reliability" - giữ nguyên ở cả hai bản, vì người học gặp
// đúng chữ đó trong tài liệu và trong tin tuyển dụng.
//
// Xem AGENTS.md, mục "Translating the UI".

export const trackStagesVi = {
  professionalBranches: {
    services: {
      label: "Kiến trúc dịch vụ",
      subtitle: "Ngôn ngữ, kiến trúc dịch vụ, API, vận hành & dựng hệ thống",
    },
    systems: {
      label: "Hệ thống & hiệu năng",
      subtitle: "Mạng, độ tin cậy, hàng đợi, tối ưu, hệ điều hành & quy trình nghiên cứu",
    },
    "security-data": {
      label: "Bảo mật, dữ liệu & tư vấn",
      subtitle: "Xác thực, phân quyền, tuân thủ, quản trị dữ liệu & sao lưu",
    },
    quant: {
      label: "Đo lường & dữ liệu",
      subtitle: "Thống kê, hồi quy, chuỗi thời gian, SQL và benchmark cho phân tích",
    },
    data: {
      label: "Phân tích dữ liệu",
      subtitle:
        "Python, làm sạch dữ liệu, dashboard, chọn chỉ số, thử nghiệm A/B và đạo đức dữ liệu",
    },
    craft: {
      label: "Kỹ năng nghề",
      subtitle:
        "Viết tài liệu, bảo vệ thiết kế, bài kiểm tra dựng hệ thống và lộ trình nghề nghiệp",
    },
    ai: {
      label: "AI trong sản phẩm",
      subtitle: "Dùng AI để viết mã, rồi xây hệ thống có LLM bên trong: API, RAG, agent, evals, bảo mật, vận hành",
    },
  },
  trackStages: {
    personal: {
      title: "Nền tảng công nghệ",
      subtitle: "Dành cho người mới bắt đầu",
      description:
        "Dành cho người muốn hiểu máy tính, viết được chương trình đầu tiên, dựng sản phẩm chạy thật và đi làm nghề công nghệ - không cần kiến thức ngành.",
      pillars: ["Tư duy lập trình", "Web & sản phẩm", "Dữ liệu & triển khai"],
      stages: [
        {
          label: "Chặng 1",
          name: "Máy tính đơn giản hơn bạn nghĩ: hệ điều hành và dòng lệnh",
          parts: [
            "Đo trước: máy của bạn đang chạy gì",
            "Hệ điều hành và cấu trúc tập tin",
            "Dòng lệnh, quyền truy cập và mục tiêu học",
            "Giữ máy sống sót: sao lưu và tự động hoá",
          ],
        },
        {
          label: "Chặng 2",
          name: "Git đơn giản hơn bạn nghĩ: cuốn nhật ký của dự án",
          parts: ["Từ commit đầu tiên đến nhánh làm việc", "Merge, xung đột và pull request"],
        },
        {
          label: "Chặng 3",
          name: "Lập trình đơn giản hơn bạn nghĩ: tư duy và ngôn ngữ đầu tiên",
          parts: ["Biến, kiểu dữ liệu và luồng điều khiển", "Hàm, lỗi và cách chương trình chạy"],
        },
        {
          label: "Chặng 4",
          name: "Trang web đầu tiên đơn giản hơn bạn nghĩ: HTML và CSS",
          parts: [
            "Thẻ HTML, bố cục CSS và trang tĩnh",
            "Lỗi hay gặp và kỳ vọng thực tế về giao diện",
            "Khả năng truy cập, responsive và thực hành",
          ],
        },
        {
          label: "Chặng 5",
          name: "JavaScript đơn giản hơn bạn nghĩ: cho trang web biết phản ứng",
          parts: ["Nền tảng JavaScript", "DOM, sự kiện và bất đồng bộ"],
        },
        {
          label: "Chặng 6",
          name: "Cấu trúc dữ liệu đơn giản hơn bạn nghĩ: sắp xếp để tìm cho nhanh",
          parts: ["Mảng, map, ngăn xếp và hàng đợi", "Tìm kiếm, sắp xếp và tổng kết hành trình"],
        },
        {
          label: "Chặng 7",
          name: "API đơn giản như gọi món: ghép dịch vụ ngoài",
          parts: [
            "HTTP, JSON và một lệnh gọi đầu tiên",
            "Xác thực, giới hạn tần suất và xử lý lỗi",
          ],
        },
        {
          label: "Chặng 8",
          name: "Cơ sở dữ liệu đơn giản hơn bạn nghĩ: lưu và truy vấn",
          parts: ["Bảng, quan hệ, SELECT và chỉ mục", "Ghép bảng, giao dịch và truy vấn chậm"],
        },
        {
          label: "Chặng 9",
          name: "Đưa sản phẩm lên mạng đơn giản hơn bạn nghĩ: triển khai, tên miền, bảo mật",
          parts: ["Máy chủ & tên miền", "HTTPS & bảo vệ dữ liệu người dùng"],
        },
        {
          label: "Chặng 10",
          name: "Code review, kiểm thử và tài liệu",
          parts: ["Điểm mù khi tự đọc code của mình", "Kiểm thử, thói quen và kỷ luật nghề"],
        },
        {
          label: "Chặng 11",
          name: "Nghề lập trình & đầu tư vào bản thân",
          parts: [
            "Đòn bẩy kỹ năng và giá thị trường của bạn",
            "Đàm phán lương và tổng đãi ngộ",
            "Dự án phụ và nguồn thu thứ hai",
            "Đầu tư vào bản thân và bản đồ 12 tháng",
          ],
        },
        {
          label: "Chặng 12",
          name: "Linux, mạng & giao thức",
          parts: [
            "Tiến trình, tập tin và quyền",
            "Cổng, tường lửa và SSH",
            "DNS, TLS và lớp bảo vệ",
            "Shell script, cron và sắp xếp toàn bộ",
          ],
        },
        {
          label: "Chặng 13",
          name: "Đám mây đơn giản hơn bạn nghĩ: thuê hạ tầng thay vì tự xây",
          parts: [
            "Đám mây thực chất là gì",
            "Chi phí thật và chuyện tiết kiệm hạ tầng",
            "Vùng, khả dụng và độ trễ",
            "Chọn dịch vụ hợp lý và tổng kết",
          ],
        },
        {
          label: "Chặng 14",
          name: "Thị trường IT Việt Nam trong thực tế",
          parts: [
            "Làm CV và nộp hồ sơ đầu tiên",
            "Phỏng vấn, thử việc và mức lương",
            "Outsource, product và startup",
            "Đọc tin tuyển dụng và ứng tuyển thật",
          ],
        },
        {
          label: "Chặng 15",
          name: "Blockchain & ứng dụng phi tập trung",
          parts: [
            "Bản chất chuỗi khối và cách lưu khoá",
            "Ví, hợp đồng thông minh và pháp lý",
            "Lừa đảo, giới hạn ứng dụng và tổng kết",
          ],
        },
        {
          label: "Chặng 16",
          name: "An toàn thông tin & phòng tấn công",
          parts: [
            "Cơ chế tấn công và kịch bản giả mạo",
            "Mật khẩu, xác thực hai lớp và thiết bị",
            "Khi đã bị xâm nhập và quy tắc cho cả nhà",
          ],
        },
        {
          label: "Chặng 17",
          name: "Ứng dụng di động thực chiến",
          parts: [
            "Chọn nền tảng và khởi tạo dự án",
            "Chi phí thật và vòng đời phát hành",
            "Native, cross-platform và web app",
            "Danh sách kiểm trước khi lên store",
          ],
        },
        {
          label: "Chặng 18",
          name: "Những dự án lớn trong nghề",
          parts: [
            "Nguyên tắc chung và dự án cá nhân đầu tiên",
            "Dự án nhóm, sản phẩm nội bộ và mã nguồn mở",
            "Bàn giao, bảo trì và bản đồ tổng thể",
          ],
        },
        {
          label: "Chặng 19",
          name: "Sức khoẻ nghề nghiệp và rủi ro con người",
          parts: [
            "Rủi ro hai vế: kiệt sức và lệ thuộc công cụ",
            "Tư thế, mắt và nhịp làm việc bền",
            "Danh sách kiểm",
          ],
        },
        {
          label: "Chặng 20",
          name: "Nghề công nghệ theo giai đoạn sự nghiệp",
          parts: ["Junior và mid-level", "Senior, lead và sau đó"],
        },
        {
          label: "Chặng 21",
          name: "Công cụ và vận hành",
          parts: ["Bộ công cụ tối thiểu và tự động hoá", "Rà soát hằng năm và tổng kết"],
        },
        {
          label: "Chặng 22",
          name: "Marketing với AI đơn giản hơn bạn nghĩ",
          parts: ["Hiểu khách và viết đúng giọng", "Đo, giữ ranh giới và làm đều mỗi tuần"],
        },
        {
          label: "Chặng 23",
          name: "AI Agent đơn giản hơn bạn nghĩ",
          parts: ["Vòng lặp và công cụ", "Dựng agent và đặt chốt an toàn"],
        },
        {
          label: "Chặng 24",
          name: "Công nghệ trong công việc đơn giản hơn bạn nghĩ",
          parts: ["Bản đồ: phần mềm, đám mây và API", "Dữ liệu, chọn công cụ và bản đồ của phòng bạn"],
        },
        {
          label: "Chặng 25",
          name: "Dùng AI mỗi ngày ở chỗ làm",
          parts: ["Hiểu AI và giao việc cho nó", "Nghiên cứu, kiểm chứng và dùng chung"],
        },
        {
          label: "Chặng 26",
          name: "Phân tích dữ liệu với AI đơn giản hơn bạn nghĩ",
          parts: ["Dữ liệu sạch, câu hỏi đúng, công thức đúng", "Phân tích biến động và kể chuyện bằng số"],
        },
        {
          label: "Chặng 27",
          name: "Tự động hoá công việc đơn giản hơn bạn nghĩ",
          parts: ["Workflow đầu tiên và khi nó hỏng", "Dự án: báo cáo tháng và dashboard tự làm mới"],
        },
        {
          label: "Chặng 28",
          name: "AI theo phòng ban: bán hàng, chăm sóc khách hàng, vận hành",
          parts: ["Bán hàng và chăm sóc khách hàng", "Vận hành, tài liệu nội bộ và đo giá trị"],
        },
        {
          label: "Chặng 29",
          name: "Dùng AI an toàn ở nơi làm việc",
          parts: ["Dữ liệu, deepfake và câu lệnh ẩn", "Người duyệt, chính sách và tài khoản"],
        },
      ],
    },
    professional: {
      title: "Công nghệ chuyên sâu",
      subtitle: "Chuyên sâu, cho người đã có nền lập trình",
      description:
        "Lộ trình chuyên sâu dành cho người đã biết lập trình cơ bản: kiến trúc, thiết kế API, mạng, độ tin cậy, dữ liệu, hạ tầng.",
      pillars: ["Ngôn ngữ & kiến trúc", "Hiệu năng & đo lường", "Hạ tầng & độ tin cậy"],
      stages: [
        {
          label: "Chặng 1",
          name: "Nền tảng dữ liệu",
          parts: [
            "Giá trị: kiểu, phạm vi và cái rỗng",
            "Hệ thống dữ liệu: quan hệ, giao dịch và độ tin cậy",
          ],
        },
        {
          label: "Chặng 2",
          name: "Mạng và giao tiếp giữa các hệ thống",
          parts: [
            "Đường đi của một lời gọi",
            "Chịu lỗi, đo lường và bảo mật",
            "Đọc sâu: chú thích, độ phủ kiểm thử và kết quả review",
          ],
        },
        {
          label: "Chặng 3",
          name: "Từ mã nguồn tới người dùng",
          parts: ["Dựng, kiểm và đưa mã ra", "Triển khai, vận hành và học từ sự cố"],
        },
        {
          label: "Chặng 4",
          name: "Đo lường sản phẩm và chọn việc",
          parts: [
            "Đo cho đúng: chỉ số, nhóm và thử nghiệm",
            "Chọn cho đúng: ưu tiên và kiểm chứng",
          ],
        },
        {
          label: "Chặng 5",
          name: "Quy mô và nhiều đội",
          parts: [
            "Ranh giới và hợp đồng giữa các đội",
            "Phối hợp, di trú lớn và hình dạng tổ chức",
          ],
        },
        {
          label: "Chặng 6",
          name: "Bảo mật ứng dụng",
          parts: [
            "Danh tính, quyền và dữ liệu nhạy cảm",
            "Giới hạn hậu quả và chuẩn bị cho sự cố",
          ],
        },
        {
          label: "Chặng 7",
          name: "Hiệu năng: đo và tối ưu",
          parts: ["Đo trước, tìm nút thắt sau", "Thông lượng, quá tải và điểm dừng"],
        },
        {
          label: "Chặng 8",
          name: "Độ tin cậy và quản trị sự cố",
          parts: ["SLO, ngân sách lỗi và dự phòng", "Đo lường sự cố và các mô hình trực"],
        },
        {
          label: "Chặng 9",
          name: "Hàng đợi, sự kiện và xử lý bất đồng bộ",
          parts: ["Hàng đợi và pub/sub cơ bản", "Idempotency, bù trừ lỗi và tổng kết"],
        },
        {
          label: "Chặng 10",
          name: "Nâng cao: Ứng dụng nghề Kỹ sư nền tảng & hệ thống lớn",
          parts: [
            "Chất lượng mã, đối chuẩn hiệu năng và nợ kỹ thuật",
            "Di trú hệ thống, tách khối và cơ chế phát hành",
          ],
        },
        {
          label: "Chặng 11",
          name: "Vận hành sản phẩm công nghệ hiện đại",
          parts: ["Giám sát & hoạch định dung lượng", "SRE & quản trị độ tin cậy"],
        },
        {
          label: "Chặng 12",
          name: "Tâm lý người dùng và thiết kế hành vi nâng cao",
          parts: [
            "Nền tảng lý thuyết & nghiên cứu người dùng",
            "Quản lý vòng đời & thiết kế sản phẩm",
          ],
        },
        {
          label: "Chặng 13",
          name: "AI trong sản phẩm: Dùng ChatGPT/Claude để đọc mã, rà lỗi và viết tài liệu",
          parts: [
            "Bắt đầu an toàn: AI làm gì, đọc tài liệu và đọc mã nguồn",
            "Thực hành: rà soát, sinh kiểm thử, trợ lý riêng và viết tài liệu",
            "Project cuối chặng: thư viện câu lệnh và quy trình kiểm chứng",
          ],
        },
        {
          label: "Chặng 14",
          name: "Xác thực, phân quyền và tuân thủ",
          parts: [
            "Đọc và rà soát một hệ thống xác thực",
            "Phân quyền: xét duyệt, phân vai và hạn mức",
            "Tuân thủ, kiểm soát nội bộ và mô hình sản phẩm mới",
          ],
        },
        {
          label: "Chặng 15",
          name: "Tối ưu hiệu năng và quản trị rủi ro vận hành",
          parts: [
            "Tối ưu sâu: từ hồ sơ CPU đến độ trễ đuôi",
            "Đo lường và quản trị rủi ro vận hành",
          ],
        },
        {
          label: "Chặng 16",
          name: "Nền tảng: quy trình nghiên cứu và thiết kế chuyên sâu",
          parts: [
            "Quy trình nhóm, luận điểm kỹ thuật và chiến lược đo lường",
            "Cơ chế nền tảng và công cụ",
            "Tối ưu hệ thống đặc thù: thời gian thực, nhúng, dữ liệu lớn",
          ],
        },
        {
          label: "Chặng 17",
          name: "Quản trị dữ liệu và sao lưu",
          parts: [
            "Quy trình thiết kế giải pháp cho khách hàng",
            "Sao lưu: chiến lược, khôi phục thảm hoạ và quy định",
          ],
        },
        {
          label: "Chặng 18",
          name: "Phương pháp đo lường (Measurement & Benchmarking)",
          parts: [
            "Phân phối, lấy mẫu và suy diễn thống kê",
            "Hồi quy, chuỗi thời gian và kiểm chứng ngoài mẫu",
          ],
        },
        {
          label: "Chặng 19",
          name: "SQL và dữ liệu cho phân tích hệ thống",
          parts: [
            "Truy vấn, phép nối và dựng báo cáo bằng SQL",
            "Kiểm tra, làm sạch dữ liệu và tối ưu truy vấn",
          ],
        },
        {
          label: "Chặng 20",
          name: "Chuẩn mực mã nguồn và quy định dữ liệu Việt Nam",
          parts: [
            "Quy ước mã, linter và chuyển đổi chuẩn",
            "Nghị định 13 và bảo vệ dữ liệu cá nhân",
            "Lưu trữ trong nước, kiểm tra và xử phạt",
          ],
        },
        {
          label: "Chặng 21",
          name: "Hệ sinh thái công nghệ Việt Nam",
          parts: [
            "Cơ chế thị trường và vốn đầu tư nước ngoài",
            "Sản phẩm nội địa và quản trị công ty công nghệ",
            "Cộng đồng, sự kiện và quỹ đầu tư mạo hiểm",
          ],
        },
        {
          label: "Chặng 22",
          name: "Nội bộ runtime: cấu trúc và hiệu năng máy ảo",
          parts: ["Cấu trúc runtime và cơ chế cấp phát bộ nhớ", "Đo hiệu năng và gỡ bỏ điểm nghẽn"],
        },
        {
          label: "Chặng 23",
          name: "Kỹ năng nghề kỹ sư phần mềm",
          parts: [
            "Viết tài liệu thiết kế và bảo vệ phương án",
            "Bài kiểm tra dựng hệ thống và lộ trình nghề",
          ],
        },
        {
          label: "Chặng 24",
          name: "Công cụ phân tích dữ liệu",
          parts: [
            "Chuyển từ bảng tính sang code, và làm sạch dữ liệu",
            "Trực quan hóa, dashboard và SQL nâng cao",
          ],
        },
        {
          label: "Chặng 25",
          name: "Tư duy phân tích dữ liệu",
          parts: [
            "Chọn chỉ số, phân tích cohort và thử nghiệm A/B",
            "Nhân quả, kể chuyện bằng dữ liệu và đạo đức dữ liệu",
          ],
        },
        {
          label: "Chặng 26",
          name: "Lập kế hoạch dung lượng và vận hành",
          parts: [
            "Yếu tố dẫn dắt tải, kế hoạch nhân sự và lịch phát hành 13 tuần",
            "Kịch bản tải, phân bổ chi phí hạ tầng và nhịp báo cáo tháng",
          ],
        },
        {
          label: "Chặng 27",
          name: "Cơ chế phát hành và di trú hệ thống",
          parts: [
            "Phát hành dần, cờ tính năng và phân bổ lưu lượng",
            "Gỡ bỏ hệ thống cũ, quy trình di trú và nghĩa vụ bàn giao",
          ],
        },
        {
          label: "Chặng 28",
          name: "Kiểm thử: cách một bản phát hành được xác nhận",
          parts: [
            "Kết luận kiểm thử, mức nghiêm trọng và bằng chứng",
            "Chọn mẫu, lỗi ẩn và ba tuyến phòng vệ",
          ],
        },
        {
          label: "Chặng 29",
          name: "Quan hệ nhà phát triển (DevRel)",
          parts: [
            "Nghề DevRel và nghĩa vụ công bố thay đổi",
            "Lộ trình sản phẩm, gặp gỡ cộng đồng và xử lý sự cố công khai",
          ],
        },
        {
          label: "Chặng 30",
          name: "Nhật ký hệ thống và sổ sự kiện",
          parts: [
            "Ghi log có cấu trúc và đường đi từ sự kiện tới dashboard",
            "Xoay vòng log, đối chiếu và lưu trữ dài hạn",
          ],
        },
        {
          label: "Chặng 31",
          name: "Dự án hạ tầng và trung tâm dữ liệu",
          parts: [
            "Pháp lý, chi phí đầu tư ban đầu và cấu trúc dự án hạ tầng",
            "Tài nguyên thuê ngoài và rủi ro dự án",
          ],
        },
        {
          label: "Chặng 32",
          name: "Định mức tài nguyên và chi phí đám mây",
          parts: [
            "Định mức, tài nguyên dự phòng và hạ tầng dự phòng chéo",
            "Bất cân xứng thông tin và biên lợi nhuận nhà cung cấp đám mây",
          ],
        },
        {
          label: "Chặng 33",
          name: "Gọi LLM qua API: token, chi phí và độ tin cậy",
          parts: ["Token, lời gọi và đầu ra có cấu trúc", "Chi phí, độ tin cậy và chọn mô hình"],
        },
        {
          label: "Chặng 34",
          name: "RAG: cho mô hình đọc tài liệu của bạn",
          parts: ["Chia nhỏ, embedding và truy xuất", "Truy xuất tốt hơn, trả lời bám nguồn và đánh giá"],
        },
        {
          label: "Chặng 35",
          name: "Tool use, agent và MCP trong hệ thống thật",
          parts: ["Gọi công cụ, vòng lặp agent và MCP", "Quyền tối thiểu, workflow hay agent, quan sát"],
        },
        {
          label: "Chặng 36",
          name: "Đánh giá hệ thống LLM (evals)",
          parts: ["Bộ dữ liệu vàng và kiểm tất định", "LLM làm giám khảo, eval trong CI và sau ra mắt"],
        },
        {
          label: "Chặng 37",
          name: "Bảo mật và quản trị hệ thống LLM",
          parts: ["Mô hình đe doạ, prompt injection và rò rỉ dữ liệu", "Đầu ra không tin cậy, phân quyền và quản trị"],
        },
        {
          label: "Chặng 38",
          name: "Pipeline dữ liệu và vận hành LLM",
          parts: ["Pipeline, phiên bản, chi phí và giám sát", "Dự án: bot tài liệu nội bộ và agent CSKH lên production"],
        },
        {
          label: "Chặng 39",
          name: "Docker và container",
          parts: ["Container, Dockerfile và image an toàn", "Dữ liệu, nhiều dịch vụ và dự án đóng gói"],
        },
        {
          label: "Chặng 40",
          name: "CI/CD: kiểm tra và phát hành tự động",
          parts: ["Pipeline, song song và cache", "Bí mật, canary và test chập chờn"],
        },
        {
          label: "Chặng 41",
          name: "Gỡ lỗi có phương pháp",
          parts: ["Phương pháp, stack trace và bisect", "Log, tranh chấp và viết lại sự cố"],
        },
      ],
    },
  },
};

export const trackStagesEn: typeof trackStagesVi = {
  professionalBranches: {
    services: {
      label: "Service architecture",
      subtitle: "Languages, service architecture, APIs, operations & system building",
    },
    systems: {
      label: "Systems & performance",
      subtitle:
        "Networking, reliability, queues, optimisation, operating systems & the research process",
    },
    "security-data": {
      label: "Security, data & consulting",
      subtitle: "Authentication, authorisation, compliance, data governance & backups",
    },
    quant: {
      label: "Measurement & data",
      subtitle: "Statistics, regression, time series, SQL and benchmarking for analysis",
    },
    data: {
      label: "Data analysis",
      subtitle: "Python, data cleaning, dashboards, picking metrics, A/B testing and data ethics",
    },
    craft: {
      label: "Professional craft",
      subtitle: "Writing docs, defending a design, system-building tests and career paths",
    },
    ai: {
      label: "AI in the product",
      subtitle: "Using AI to write code, then building systems with an LLM inside: APIs, RAG, agents, evals, security, operations",
    },
  },
  trackStages: {
    personal: {
      title: "Technology foundations",
      subtitle: "For complete beginners",
      description:
        "For anyone who wants to understand computers, write a first program, ship something that really runs and get a job in tech - no prior industry knowledge needed.",
      pillars: ["Programming thinking", "Web & products", "Data & deployment"],
      stages: [
        {
          label: "Stage 1",
          name: "Computers are simpler than you think: the OS and the command line",
          parts: [
            "Measure first: what your machine is running",
            "Operating systems and the file tree",
            "The command line, permissions and your learning goal",
            "Keeping the machine alive: backups and automation",
          ],
        },
        {
          label: "Stage 2",
          name: "Git is simpler than you think: your project's diary",
          parts: ["From a first commit to a working branch", "Merges, conflicts and pull requests"],
        },
        {
          label: "Stage 3",
          name: "Programming is simpler than you think: thinking in code, and a first language",
          parts: [
            "Variables, data types and control flow",
            "Functions, errors and how a program runs",
          ],
        },
        {
          label: "Stage 4",
          name: "Your first web page is simpler than you think: HTML and CSS",
          parts: [
            "HTML tags, CSS layout and a static page",
            "Common mistakes and realistic expectations about UI work",
            "Accessibility, responsive design and practice",
          ],
        },
        {
          label: "Stage 5",
          name: "JavaScript is simpler than you think: making pages react",
          parts: ["JavaScript foundations", "The DOM, events and asynchronous code"],
        },
        {
          label: "Stage 6",
          name: "Data structures are simpler than you think: arrange things to find them fast",
          parts: [
            "Arrays, maps, stacks and queues",
            "Searching, sorting and wrapping up the journey",
          ],
        },
        {
          label: "Stage 7",
          name: "APIs are as simple as ordering food: wiring in outside services",
          parts: [
            "HTTP, JSON and a first request",
            "Authentication, rate limits and error handling",
          ],
        },
        {
          label: "Stage 8",
          name: "Databases are simpler than you think: storing and querying",
          parts: [
            "Tables, relations, SELECT and indexes",
            "Searching, sorting and wrapping up the journey",
          ],
        },
        {
          label: "Stage 9",
          name: "Going online is simpler than you think: deployment, domains, security",
          parts: ["Servers & domains", "HTTPS & protecting user data"],
        },
        {
          label: "Stage 10",
          name: "Code review, testing and documentation",
          parts: [
            "The blind spots in reading your own code",
            "Testing, habits and professional discipline",
          ],
        },
        {
          label: "Stage 11",
          name: "The programming career & investing in yourself",
          parts: [
            "Skill leverage and what the market pays you",
            "Salary negotiation and total compensation",
            "Side projects and a second income stream",
            "Investing in yourself and a 12-month map",
          ],
        },
        {
          label: "Stage 12",
          name: "Linux, networking & protocols",
          parts: [
            "Processes, files and permissions",
            "Ports, firewalls and SSH",
            "DNS, TLS and the protective layer",
            "Shell scripts, cron and tying it all together",
          ],
        },
        {
          label: "Stage 13",
          name: "The cloud is simpler than you think: renting instead of building",
          parts: [
            "What the cloud actually is",
            "Real costs and saving money on infrastructure",
            "Regions, availability and latency",
            "Choosing sensible services, and a wrap-up",
          ],
        },
        {
          label: "Stage 14",
          name: "The Vietnamese IT market in practice",
          parts: [
            "Building a CV and sending a first application",
            "Interviews, probation and pay levels",
            "Outsourcing, product companies and startups",
            "Reading job ads and applying for real",
          ],
        },
        {
          label: "Stage 15",
          name: "Blockchain & decentralised applications",
          parts: [
            "How a blockchain works and how keys are stored",
            "Wallets, smart contracts and the law",
            "Scams, the limits of the technology, and a wrap-up",
          ],
        },
        {
          label: "Stage 16",
          name: "Information security & defending against attacks",
          parts: [
            "How attacks work and what impersonation looks like",
            "Passwords, two-factor authentication and devices",
            "After a breach, and rules for the whole household",
          ],
        },
        {
          label: "Stage 17",
          name: "Mobile apps in practice",
          parts: [
            "Picking a platform and starting the project",
            "Real costs and the release lifecycle",
            "Native, cross-platform and web apps",
            "The checklist before you hit the store",
          ],
        },
        {
          label: "Stage 18",
          name: "The big projects of a career",
          parts: [
            "General principles and a first personal project",
            "Team projects, internal products and open source",
            "Handover, maintenance and the overall map",
          ],
        },
        {
          label: "Stage 19",
          name: "Occupational health and human risk",
          parts: [
            "Risk on two sides: burnout and tool dependence",
            "Posture, eyes and a sustainable work rhythm",
            "The checklist",
          ],
        },
        {
          label: "Stage 20",
          name: "A tech career, stage by stage",
          parts: ["Junior and mid-level", "Senior, lead and beyond"],
        },
        {
          label: "Stage 21",
          name: "Tooling and operations",
          parts: ["A minimum toolkit and automation", "The annual review, and a wrap-up"],
        },
        {
          label: "Stage 22",
          name: "Marketing with AI is simpler than you think",
          parts: ["Knowing your customer and writing in your voice", "Measuring, staying honest, and a weekly rhythm"],
        },
        {
          label: "Stage 23",
          name: "AI agents are simpler than you think",
          parts: ["The loop and the tools", "Building the agent, and its safety catches"],
        },
        {
          label: "Stage 24",
          name: "Technology at work is simpler than you think",
          parts: ["The map: software, cloud and APIs", "Data, choosing tools, and your team's map"],
        },
        {
          label: "Stage 25",
          name: "Using AI every day at work",
          parts: ["Understanding AI and briefing it", "Research, verification and sharing"],
        },
        {
          label: "Stage 26",
          name: "Data analysis with AI is simpler than you think",
          parts: ["Clean data, the right question, the right formula", "Variance analysis and telling the story with numbers"],
        },
        {
          label: "Stage 27",
          name: "Automating your work is simpler than you think",
          parts: ["Your first workflow, and when it breaks", "Projects: the monthly report and a self-refreshing dashboard"],
        },
        {
          label: "Stage 28",
          name: "AI by department: sales, support and operations",
          parts: ["Sales and customer support", "Operations, internal documents and measuring value"],
        },
        {
          label: "Stage 29",
          name: "Using AI safely at work",
          parts: ["Data, deepfakes and hidden instructions", "Reviewers, policy and accounts"],
        },
      ],
    },
    professional: {
      title: "Advanced technology",
      subtitle: "In depth, for people who already program",
      description:
        "An in-depth track for people who already know the basics of programming: architecture, API design, networking, reliability, data, infrastructure.",
      pillars: [
        "Languages & architecture",
        "Performance & measurement",
        "Infrastructure & reliability",
      ],
      stages: [
        {
          label: "Stage 1",
          name: "Data foundations",
          parts: [
            "Values: types, ranges and the empty case",
            "Data systems: relations, transactions and trust",
          ],
        },
        {
          label: "Stage 2",
          name: "Networking and service-to-service calls",
          parts: [
            "The path of a single request",
            "Failure, measurement and security",
            "Deeper reading: comments, test coverage and review outcomes",
          ],
        },
        {
          label: "Stage 3",
          name: "From source code to users",
          parts: ["Build, verify and ship", "Deploy, operate and learn from incidents"],
        },
        {
          label: "Stage 4",
          name: "Product measurement and choosing work",
          parts: [
            "Measuring right: metrics, cohorts and experiments",
            "Choosing right: prioritisation and validation",
          ],
        },
        {
          label: "Stage 5",
          name: "Scale and multiple teams",
          parts: [
            "Boundaries and contracts between teams",
            "Coordination, large migrations and org shape",
          ],
        },
        {
          label: "Stage 6",
          name: "Application security",
          parts: [
            "Identity, permissions and sensitive data",
            "Limiting blast radius and preparing for incidents",
          ],
        },
        {
          label: "Stage 7",
          name: "Performance: measure, then optimise",
          parts: [
            "Measure first, find the bottleneck second",
            "Throughput, overload and when to stop",
          ],
        },
        {
          label: "Stage 8",
          name: "Reliability and incident management",
          parts: ["SLOs, error budgets and redundancy", "Measuring incidents and on-call models"],
        },
        {
          label: "Stage 9",
          name: "Queues, events and asynchronous processing",
          parts: [
            "Queues and pub/sub basics",
            "Idempotency, compensating for failures, and a wrap-up",
          ],
        },
        {
          label: "Stage 10",
          name: "Advanced: the platform engineer's job on large systems",
          parts: [
            "Code quality, performance benchmarks and technical debt",
            "System migration, breaking up the monolith and release mechanics",
          ],
        },
        {
          label: "Stage 11",
          name: "Operating a modern technology product",
          parts: ["Monitoring & capacity planning", "SRE & managing reliability"],
        },
        {
          label: "Stage 12",
          name: "User psychology and advanced behavioural design",
          parts: [
            "Theoretical foundations & user research",
            "Lifecycle management & product design",
          ],
        },
        {
          label: "Stage 13",
          name: "AI in the product: using ChatGPT/Claude to read code, hunt bugs and write documentation",
          parts: [
            "Starting safely: what AI does, reading docs and reading source",
            "Practice: review, generating tests, your own assistant and writing docs",
            "End-of-stage project: a prompt library and a verification process",
          ],
        },
        {
          label: "Stage 14",
          name: "Authentication, authorisation and compliance",
          parts: [
            "Reading and reviewing an authentication system",
            "Authorisation: approvals, roles and limits",
            "Compliance, internal controls and new product models",
          ],
        },
        {
          label: "Stage 15",
          name: "Performance tuning and operational risk management",
          parts: [
            "Deep optimisation: from CPU profiles to tail latency",
            "Measuring and managing operational risk",
          ],
        },
        {
          label: "Stage 16",
          name: "Foundations: the research process and in-depth design",
          parts: [
            "Team process, the technical argument and a measurement strategy",
            "Platform mechanics and tooling",
            "Tuning special systems: real-time, embedded, big data",
          ],
        },
        {
          label: "Stage 17",
          name: "Data governance and backups",
          parts: [
            "Designing a solution for a client, step by step",
            "Backups: strategy, disaster recovery and regulation",
          ],
        },
        {
          label: "Stage 18",
          name: "Measurement & benchmarking method",
          parts: [
            "Distributions, sampling and statistical inference",
            "Regression, time series and out-of-sample validation",
          ],
        },
        {
          label: "Stage 19",
          name: "SQL and data for system analysis",
          parts: [
            "Queries, joins and building reports in SQL",
            "Checking data, cleaning it and tuning queries",
          ],
        },
        {
          label: "Stage 20",
          name: "Code standards and Vietnamese data regulation",
          parts: [
            "Code conventions, linters and moving to a new standard",
            "Decree 13 and personal data protection",
            "Onshore storage, inspections and penalties",
          ],
        },
        {
          label: "Stage 21",
          name: "The Vietnamese technology ecosystem",
          parts: [
            "How the market works and foreign investment",
            "Domestic products and running a tech company",
            "Communities, events and venture capital",
          ],
        },
        {
          label: "Stage 22",
          name: "Runtime internals: VM structure and performance",
          parts: [
            "Runtime structure and how memory is allocated",
            "Measuring performance and removing bottlenecks",
          ],
        },
        {
          label: "Stage 23",
          name: "The software engineer's professional craft",
          parts: [
            "Writing a design doc and defending the approach",
            "The system-building test and the career path",
          ],
        },
        {
          label: "Stage 24",
          name: "Data analysis tooling",
          parts: [
            "Moving from spreadsheets to code, and cleaning data",
            "Visualisation, dashboards and advanced SQL",
          ],
        },
        {
          label: "Stage 25",
          name: "Thinking like a data analyst",
          parts: [
            "Picking metrics, cohort analysis and A/B testing",
            "Causality, storytelling with data and data ethics",
          ],
        },
        {
          label: "Stage 26",
          name: "Capacity planning and operations",
          parts: [
            "Load drivers, staffing plans and a 13-week release calendar",
            "Load scenarios, allocating infrastructure cost and the monthly reporting rhythm",
          ],
        },
        {
          label: "Stage 27",
          name: "Release mechanics and system migration",
          parts: [
            "Gradual rollout, feature flags and traffic splitting",
            "Retiring the old system, the migration process and handover duties",
          ],
        },
        {
          label: "Stage 28",
          name: "Testing: how a release gets signed off",
          parts: [
            "Test conclusions, severity levels and evidence",
            "Sampling, hidden defects and the three lines of defence",
          ],
        },
        {
          label: "Stage 29",
          name: "Developer relations (DevRel)",
          parts: [
            "The DevRel job and the duty to announce changes",
            "The product roadmap, meeting the community and handling an incident in public",
          ],
        },
        {
          label: "Stage 30",
          name: "System logs and the event record",
          parts: [
            "Structured logging and the path from event to dashboard",
            "Log rotation, reconciliation and long-term retention",
          ],
        },
        {
          label: "Stage 31",
          name: "Infrastructure and data-centre projects",
          parts: [
            "Legal work, up-front capital cost and how an infrastructure project is structured",
            "Rented resources and project risk",
          ],
        },
        {
          label: "Stage 32",
          name: "Resource quotas and cloud cost",
          parts: [
            "Quotas, standby resources and cross-region failover infrastructure",
            "Information asymmetry and cloud-provider margins",
          ],
        },
        {
          label: "Stage 33",
          name: "Calling LLMs over an API: tokens, cost and reliability",
          parts: ["Tokens, requests and structured output", "Cost, reliability and choosing a model"],
        },
        {
          label: "Stage 34",
          name: "RAG: letting the model read your documents",
          parts: ["Chunking, embeddings and retrieval", "Better retrieval, grounded answers and evaluation"],
        },
        {
          label: "Stage 35",
          name: "Tool use, agents and MCP in real systems",
          parts: ["Tool calling, the agent loop and MCP", "Least privilege, workflow vs agent, observability"],
        },
        {
          label: "Stage 36",
          name: "Evaluating LLM systems (evals)",
          parts: ["Golden sets and deterministic checks", "LLM-as-judge, evals in CI and after launch"],
        },
        {
          label: "Stage 37",
          name: "Securing and governing LLM systems",
          parts: ["Threat model, prompt injection and data leakage", "Untrusted output, access control and governance"],
        },
        {
          label: "Stage 38",
          name: "Data pipelines and running LLMs in production",
          parts: ["Pipelines, versioning, cost and monitoring", "Projects: an internal docs bot and a support agent in production"],
        },
        {
          label: "Stage 39",
          name: "Docker and containers",
          parts: ["Containers, Dockerfiles and safe images", "Data, multiple services and a packaging project"],
        },
        {
          label: "Stage 40",
          name: "CI/CD: automated checks and releases",
          parts: ["Pipelines, parallelism and caching", "Secrets, canaries and flaky tests"],
        },
        {
          label: "Stage 41",
          name: "Debugging with a method",
          parts: ["Method, stack traces and bisect", "Logs, race conditions and incident write-ups"],
        },
      ],
    },
  },
};
