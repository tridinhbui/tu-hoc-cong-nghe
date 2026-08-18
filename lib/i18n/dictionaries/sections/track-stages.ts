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
    corporate: {
      label: "Kiến trúc dịch vụ",
      subtitle: "Ngôn ngữ, kiến trúc dịch vụ, API, vận hành & dựng hệ thống",
    },
    investment: {
      label: "Hệ thống & hiệu năng",
      subtitle: "Mạng, độ tin cậy, hàng đợi, tối ưu, hệ điều hành & quy trình nghiên cứu",
    },
    banking: {
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
      subtitle: "Dùng ChatGPT/Claude để đọc mã, rà lỗi và viết tài liệu",
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
          name: "Biết mình trước khi học: máy tính, hệ điều hành, dòng lệnh",
          parts: [
            "Đo trước: máy của bạn đang chạy gì",
            "Hệ điều hành và cấu trúc tập tin",
            "Dòng lệnh, quyền truy cập và mục tiêu học",
            "Giữ máy sống sót: sao lưu và tự động hoá",
          ],
        },
        {
          label: "Chặng 2",
          name: "Git & kho mã chung",
          parts: ["Từ commit đầu tiên đến nhánh làm việc", "Merge, xung đột và pull request"],
        },
        {
          label: "Chặng 3",
          name: "Tư duy lập trình và ngôn ngữ đầu tiên",
          parts: ["Biến, kiểu dữ liệu và luồng điều khiển", "Hàm, lỗi và cách chương trình chạy"],
        },
        {
          label: "Chặng 4",
          name: "HTML, CSS và trang web đầu tiên",
          parts: [
            "Thẻ HTML, bố cục CSS và trang tĩnh",
            "Lỗi hay gặp và kỳ vọng thực tế về giao diện",
            "Khả năng truy cập, responsive và thực hành",
          ],
        },
        {
          label: "Chặng 5",
          name: "JavaScript và trình duyệt",
          parts: ["Nền tảng JavaScript", "DOM, sự kiện và bất đồng bộ"],
        },
        {
          label: "Chặng 6",
          name: "Cấu trúc dữ liệu và thuật toán cơ bản",
          parts: ["Mảng, map, ngăn xếp và hàng đợi", "Tìm kiếm, sắp xếp và tổng kết hành trình"],
        },
        {
          label: "Chặng 7",
          name: "Gọi API và ghép dịch vụ ngoài",
          parts: [
            "HTTP, JSON và một lệnh gọi đầu tiên",
            "Xác thực, giới hạn tần suất và xử lý lỗi",
          ],
        },
        {
          label: "Chặng 8",
          name: "Cơ sở dữ liệu và truy vấn",
          parts: ["Bảng, quan hệ, SELECT và chỉ mục", "Tìm kiếm, sắp xếp và tổng kết hành trình"],
        },
        {
          label: "Chặng 9",
          name: "Triển khai, tên miền và bảo mật cơ bản",
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
          name: "Đám mây và hạ tầng thuê ngoài",
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
          name: "Đọc mã nguồn người khác viết",
          parts: [
            "Lần theo luồng gọi và trạng thái",
            "Đọc log, stack trace và case thực tế",
            "Đọc sâu: chú thích, độ phủ kiểm thử và kết quả review",
          ],
        },
        {
          label: "Chặng 3",
          name: "Chỉ số hiệu năng cơ bản",
          parts: ["Thông lượng và độ trễ", "Hiệu quả tài nguyên và đo lường cơ bản"],
        },
        {
          label: "Chặng 4",
          name: "Độ phức tạp và chi phí tính toán",
          parts: ["Big-O, phân tích khấu hao và cận dưới", "Cache, độ định vị dữ liệu và ứng dụng"],
        },
        {
          label: "Chặng 5",
          name: "Kiến trúc dịch vụ",
          parts: [
            "Tách dịch vụ và tích hợp hệ thống",
            "Vận hành hạ tầng cho sản phẩm giai đoạn đầu",
          ],
        },
        {
          label: "Chặng 6",
          name: "Thiết kế API và hợp đồng dịch vụ",
          parts: ["REST và quy ước tài nguyên", "GraphQL và gRPC"],
        },
        {
          label: "Chặng 7",
          name: "Mạng, độ trễ và giao thức",
          parts: ["TCP, HTTP/2 và chi phí một vòng gọi", "Mất gói, timeout và các kiểu thử lại"],
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
          name: "Masterclass chuyên đề: hạ tầng, mạng, startup công nghệ, bảo mật & phần mềm xanh",
          parts: [
            "Hạ tầng trung tâm dữ liệu, mạng doanh nghiệp, startup công nghệ, quản trị rủi ro bảo mật & phần mềm xanh",
          ],
        },
        {
          label: "Chặng 15",
          name: "Dựng hệ thống thực hành (System Building)",
          parts: [
            "Cấu trúc dự án, luồng dữ liệu và ba lớp dịch vụ",
            "Lớp phụ trợ, hàng đợi nền và đo hiệu năng",
            "Kiểm thử tải, rà soát thiết kế và project cuối chặng",
          ],
        },
        {
          label: "Chặng 16",
          name: "Phần mềm xanh (Green Software & hiệu quả năng lượng)",
          parts: [
            "Nền tảng: phần mềm xanh là gì, đo lường và tối ưu tiêu thụ",
            "Quy định, dấu chân carbon của hạ tầng và chi phí",
            "Quản trị kỹ thuật chuyên sâu",
          ],
        },
        {
          label: "Chặng 17",
          name: "Hệ điều hành cho người làm công nghệ",
          parts: [
            "Tiến trình: lập lịch, bộ nhớ và cấu trúc tập tin",
            "Hệ thống: tải, mở rộng, chu kỳ phát hành và chính sách vận hành",
            "Hệ phân tán và đọc chỉ báo hệ thống",
          ],
        },
        {
          label: "Chặng 18",
          name: "Xác thực, phân quyền và tuân thủ",
          parts: [
            "Đọc và rà soát một hệ thống xác thực",
            "Phân quyền: xét duyệt, phân vai và hạn mức",
            "Tuân thủ, kiểm soát nội bộ và mô hình sản phẩm mới",
          ],
        },
        {
          label: "Chặng 19",
          name: "Tối ưu hiệu năng và quản trị rủi ro vận hành",
          parts: [
            "Tối ưu sâu: từ hồ sơ CPU đến độ trễ đuôi",
            "Đo lường và quản trị rủi ro vận hành",
          ],
        },
        {
          label: "Chặng 20",
          name: "Nền tảng: quy trình nghiên cứu và thiết kế chuyên sâu",
          parts: [
            "Quy trình nhóm, luận điểm kỹ thuật và chiến lược đo lường",
            "Cơ chế nền tảng và công cụ",
            "Tối ưu hệ thống đặc thù: thời gian thực, nhúng, dữ liệu lớn",
          ],
        },
        {
          label: "Chặng 21",
          name: "Quản trị dữ liệu và sao lưu",
          parts: [
            "Quy trình thiết kế giải pháp cho khách hàng",
            "Sao lưu: chiến lược, khôi phục thảm hoạ và quy định",
          ],
        },
        {
          label: "Chặng 22",
          name: "Phương pháp đo lường (Measurement & Benchmarking)",
          parts: [
            "Phân phối, lấy mẫu và suy diễn thống kê",
            "Hồi quy, chuỗi thời gian và kiểm chứng ngoài mẫu",
          ],
        },
        {
          label: "Chặng 23",
          name: "SQL và dữ liệu cho phân tích hệ thống",
          parts: [
            "Truy vấn, phép nối và dựng báo cáo bằng SQL",
            "Kiểm tra, làm sạch dữ liệu và tối ưu truy vấn",
          ],
        },
        {
          label: "Chặng 24",
          name: "Chuẩn mực mã nguồn và quy định dữ liệu Việt Nam",
          parts: [
            "Quy ước mã, linter và chuyển đổi chuẩn",
            "Nghị định 13 và bảo vệ dữ liệu cá nhân",
            "Lưu trữ trong nước, kiểm tra và xử phạt",
          ],
        },
        {
          label: "Chặng 25",
          name: "Hệ sinh thái công nghệ Việt Nam",
          parts: [
            "Cơ chế thị trường và vốn đầu tư nước ngoài",
            "Sản phẩm nội địa và quản trị công ty công nghệ",
            "Cộng đồng, sự kiện và quỹ đầu tư mạo hiểm",
          ],
        },
        {
          label: "Chặng 26",
          name: "Hệ thống đa vùng và quốc tế hoá",
          parts: [
            "Đồng bộ đa vùng: độ trễ và nhất quán",
            "Bản địa hoá, múi giờ và rủi ro dữ liệu xuyên biên giới",
          ],
        },
        {
          label: "Chặng 27",
          name: "Nội bộ runtime: cấu trúc và hiệu năng máy ảo",
          parts: ["Cấu trúc runtime và cơ chế cấp phát bộ nhớ", "Đo hiệu năng và gỡ bỏ điểm nghẽn"],
        },
        {
          label: "Chặng 28",
          name: "Kỹ năng nghề kỹ sư phần mềm",
          parts: [
            "Viết tài liệu thiết kế và bảo vệ phương án",
            "Bài kiểm tra dựng hệ thống và lộ trình nghề",
          ],
        },
        {
          label: "Chặng 29",
          name: "Công cụ phân tích dữ liệu",
          parts: [
            "Chuyển từ bảng tính sang code, và làm sạch dữ liệu",
            "Trực quan hóa, dashboard và SQL nâng cao",
          ],
        },
        {
          label: "Chặng 30",
          name: "Tư duy phân tích dữ liệu",
          parts: [
            "Chọn chỉ số, phân tích cohort và thử nghiệm A/B",
            "Nhân quả, kể chuyện bằng dữ liệu và đạo đức dữ liệu",
          ],
        },
        {
          label: "Chặng 31",
          name: "Lập kế hoạch dung lượng và vận hành",
          parts: [
            "Yếu tố dẫn dắt tải, kế hoạch nhân sự và lịch phát hành 13 tuần",
            "Kịch bản tải, phân bổ chi phí hạ tầng và nhịp báo cáo tháng",
          ],
        },
        {
          label: "Chặng 32",
          name: "Cơ chế phát hành và di trú hệ thống",
          parts: [
            "Phát hành dần, cờ tính năng và phân bổ lưu lượng",
            "Gỡ bỏ hệ thống cũ, quy trình di trú và nghĩa vụ bàn giao",
          ],
        },
        {
          label: "Chặng 33",
          name: "Kiểm thử: cách một bản phát hành được xác nhận",
          parts: [
            "Kết luận kiểm thử, mức nghiêm trọng và bằng chứng",
            "Chọn mẫu, lỗi ẩn và ba tuyến phòng vệ",
          ],
        },
        {
          label: "Chặng 34",
          name: "SRE: Nền tảng, rủi ro vận hành & rủi ro dung lượng",
          parts: [
            "Foundations of Reliability: quản trị rủi ro, văn hoá không đổ lỗi, sự cố kinh điển",
            "Operational Resilience: dữ liệu sự cố, BCP/DR, rủi ro mô hình & bên thứ ba",
            "Capacity and Resource Risk: hạn mức, kế hoạch dung lượng, tự mở rộng",
          ],
        },
        {
          label: "Chặng 35",
          name: "SRE: Rủi ro hiệu năng",
          parts: [
            "Đo độ trễ đuôi, kiểm định hậu nghiệm và p99",
            "Mô hình biến động tải, phụ thuộc dịch vụ và kiểm thử chịu tải",
          ],
        },
        {
          label: "Chặng 36",
          name: "SRE: Bảo mật nâng cao & Vấn đề thời sự",
          parts: [
            "Chuỗi cung ứng phần mềm, ký số và rủi ro phụ thuộc bên thứ ba",
            "Shadow IT, rủi ro liên kết hệ thống và tài sản số",
            "Rủi ro nhà cung cấp độc quyền và khoá nền tảng",
          ],
        },
        {
          label: "Chặng 37",
          name: "SRE: Nền tảng, vận hành, dung lượng & đo lường nâng cao",
          parts: [
            "Foundations: phân loại sự cố, ngưỡng & hạn mức, đo hiệu quả, SLO, đạo đức, quản trị dữ liệu",
            "Foundations nâng cao: chi phí trên mỗi request & ngân sách hạ tầng, quản trị cấp lãnh đạo, bốn lựa chọn với rủi ro, rủi ro hệ thống, uy tín & chiến lược",
            "Operational nâng cao: phân tích kịch bản, dữ liệu sự cố bên ngoài, rủi ro thay đổi, dịch vụ trọng yếu, rủi ro con người",
            "Hiệu năng nâng cao: đo tải chuẩn, độ nhạy theo tài nguyên, ánh xạ nhân tố nghẽn, phân rã chi phí giữa các dịch vụ",
            "San nốt bốn phần: đo lường nâng cao, rủi ro phụ thuộc và tập trung, dung lượng theo giờ và bộ đệm, quy kết hiệu năng và rủi ro nền tảng",
            "Operational Resilience: phân loại sự cố, tự đánh giá & KRI, an ninh mạng, gian lận, dự phòng tài nguyên, rủi ro hành vi",
            "Capacity and Resources: hai loại dung lượng, thang tải, phân bổ chi phí, kiểm thử chịu tải, tài nguyên dự trữ, tự mở rộng",
            "Quantitative Analysis: Bayes, MLE, Monte Carlo, bootstrapping, EVT, PCA",
          ],
        },
        {
          label: "Chặng 38",
          name: "SRE: Đo lường, mô hình rủi ro & vấn đề thời sự",
          parts: [
            "Measurement and Risk Models: đường cơ sở, cây quyết định, mô hình hàng đợi, độ nhạy, chi phí biên, xếp hạng dịch vụ",
            "Current Issues: AI/ML, điện năng trung tâm dữ liệu, hậu monolith, hạ tầng chủ quyền, tập trung đám mây, các sự cố diện rộng gần đây",
          ],
        },
        {
          label: "Chặng 39",
          name: "Sản phẩm thanh toán và ví điện tử",
          parts: [
            "Doanh thu và đơn vị kinh tế: take rate, CAC/LTV, số dư ví",
            "Phần mất đi và đường tới hoà vốn: lỗi giao dịch, gian lận, chi phí hạ tầng",
          ],
        },
        {
          label: "Chặng 40",
          name: "Quan hệ nhà phát triển (DevRel)",
          parts: [
            "Nghề DevRel và nghĩa vụ công bố thay đổi",
            "Lộ trình sản phẩm, gặp gỡ cộng đồng và xử lý sự cố công khai",
          ],
        },
        {
          label: "Chặng 41",
          name: "Nhật ký hệ thống và sổ sự kiện",
          parts: [
            "Ghi log có cấu trúc và đường đi từ sự kiện tới dashboard",
            "Xoay vòng log, đối chiếu và lưu trữ dài hạn",
          ],
        },
        {
          label: "Chặng 42",
          name: "Dự án hạ tầng và trung tâm dữ liệu",
          parts: [
            "Pháp lý, chi phí đầu tư ban đầu và cấu trúc dự án hạ tầng",
            "Tài nguyên thuê ngoài và rủi ro dự án",
          ],
        },
        {
          label: "Chặng 43",
          name: "Định mức tài nguyên và chi phí đám mây",
          parts: [
            "Định mức, tài nguyên dự phòng và hạ tầng dự phòng chéo",
            "Bất cân xứng thông tin và biên lợi nhuận nhà cung cấp đám mây",
          ],
        },
      ],
    },
  },
};

export const trackStagesEn: typeof trackStagesVi = {
  professionalBranches: {
    corporate: {
      label: "Service architecture",
      subtitle: "Languages, service architecture, APIs, operations & system building",
    },
    investment: {
      label: "Systems & performance",
      subtitle:
        "Networking, reliability, queues, optimisation, operating systems & the research process",
    },
    banking: {
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
      subtitle: "Using ChatGPT/Claude to read code, hunt bugs and write documentation",
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
          name: "Know your setup first: computer, operating system, command line",
          parts: [
            "Measure first: what your machine is running",
            "Operating systems and the file tree",
            "The command line, permissions and your learning goal",
            "Keeping the machine alive: backups and automation",
          ],
        },
        {
          label: "Stage 2",
          name: "Git & the shared repository",
          parts: ["From a first commit to a working branch", "Merges, conflicts and pull requests"],
        },
        {
          label: "Stage 3",
          name: "Programming thinking and your first language",
          parts: [
            "Variables, data types and control flow",
            "Functions, errors and how a program runs",
          ],
        },
        {
          label: "Stage 4",
          name: "HTML, CSS and your first web page",
          parts: [
            "HTML tags, CSS layout and a static page",
            "Common mistakes and realistic expectations about UI work",
            "Accessibility, responsive design and practice",
          ],
        },
        {
          label: "Stage 5",
          name: "JavaScript and the browser",
          parts: ["JavaScript foundations", "The DOM, events and asynchronous code"],
        },
        {
          label: "Stage 6",
          name: "Basic data structures and algorithms",
          parts: [
            "Arrays, maps, stacks and queues",
            "Searching, sorting and wrapping up the journey",
          ],
        },
        {
          label: "Stage 7",
          name: "Calling APIs and wiring in outside services",
          parts: [
            "HTTP, JSON and a first request",
            "Authentication, rate limits and error handling",
          ],
        },
        {
          label: "Stage 8",
          name: "Databases and queries",
          parts: [
            "Tables, relations, SELECT and indexes",
            "Searching, sorting and wrapping up the journey",
          ],
        },
        {
          label: "Stage 9",
          name: "Deployment, domains and basic security",
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
          name: "The cloud and rented infrastructure",
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
          name: "Reading code somebody else wrote",
          parts: [
            "Following the call flow and the state",
            "Reading logs, stack traces and a real case",
            "Deeper reading: comments, test coverage and review outcomes",
          ],
        },
        {
          label: "Stage 3",
          name: "Basic performance metrics",
          parts: ["Throughput and latency", "Resource efficiency and basic measurement"],
        },
        {
          label: "Stage 4",
          name: "Complexity and the cost of computation",
          parts: [
            "Big-O, amortised analysis and lower bounds",
            "Caches, data locality and where it applies",
          ],
        },
        {
          label: "Stage 5",
          name: "Service architecture",
          parts: [
            "Splitting services and integrating systems",
            "Running infrastructure for an early-stage product",
          ],
        },
        {
          label: "Stage 6",
          name: "API design and service contracts",
          parts: ["REST and resource conventions", "GraphQL and gRPC"],
        },
        {
          label: "Stage 7",
          name: "Networking, latency and protocols",
          parts: [
            "TCP, HTTP/2 and the cost of a round trip",
            "Packet loss, timeouts and retry strategies",
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
          name: "Topic masterclass: infrastructure, networking, tech startups, security & green software",
          parts: [
            "Data-centre infrastructure, enterprise networking, tech startups, security risk management & green software",
          ],
        },
        {
          label: "Stage 15",
          name: "Hands-on system building",
          parts: [
            "Project structure, data flow and the three service layers",
            "The supporting layer, background queues and performance measurement",
            "Load testing, design review and the end-of-stage project",
          ],
        },
        {
          label: "Stage 16",
          name: "Green software (energy efficiency)",
          parts: [
            "Foundations: what green software is, measuring and cutting consumption",
            "Regulation, the carbon footprint of infrastructure, and cost",
            "Advanced engineering governance",
          ],
        },
        {
          label: "Stage 17",
          name: "Operating systems for working engineers",
          parts: [
            "Processes: scheduling, memory and the file system",
            "Systems: load, scaling, release cycles and operating policy",
            "Distributed systems and reading system indicators",
          ],
        },
        {
          label: "Stage 18",
          name: "Authentication, authorisation and compliance",
          parts: [
            "Reading and reviewing an authentication system",
            "Authorisation: approvals, roles and limits",
            "Compliance, internal controls and new product models",
          ],
        },
        {
          label: "Stage 19",
          name: "Performance tuning and operational risk management",
          parts: [
            "Deep optimisation: from CPU profiles to tail latency",
            "Measuring and managing operational risk",
          ],
        },
        {
          label: "Stage 20",
          name: "Foundations: the research process and in-depth design",
          parts: [
            "Team process, the technical argument and a measurement strategy",
            "Platform mechanics and tooling",
            "Tuning special systems: real-time, embedded, big data",
          ],
        },
        {
          label: "Stage 21",
          name: "Data governance and backups",
          parts: [
            "Designing a solution for a client, step by step",
            "Backups: strategy, disaster recovery and regulation",
          ],
        },
        {
          label: "Stage 22",
          name: "Measurement & benchmarking method",
          parts: [
            "Distributions, sampling and statistical inference",
            "Regression, time series and out-of-sample validation",
          ],
        },
        {
          label: "Stage 23",
          name: "SQL and data for system analysis",
          parts: [
            "Queries, joins and building reports in SQL",
            "Checking data, cleaning it and tuning queries",
          ],
        },
        {
          label: "Stage 24",
          name: "Code standards and Vietnamese data regulation",
          parts: [
            "Code conventions, linters and moving to a new standard",
            "Decree 13 and personal data protection",
            "Onshore storage, inspections and penalties",
          ],
        },
        {
          label: "Stage 25",
          name: "The Vietnamese technology ecosystem",
          parts: [
            "How the market works and foreign investment",
            "Domestic products and running a tech company",
            "Communities, events and venture capital",
          ],
        },
        {
          label: "Stage 26",
          name: "Multi-region systems and internationalisation",
          parts: [
            "Multi-region sync: latency and consistency",
            "Localisation, time zones and cross-border data risk",
          ],
        },
        {
          label: "Stage 27",
          name: "Runtime internals: VM structure and performance",
          parts: [
            "Runtime structure and how memory is allocated",
            "Measuring performance and removing bottlenecks",
          ],
        },
        {
          label: "Stage 28",
          name: "The software engineer's professional craft",
          parts: [
            "Writing a design doc and defending the approach",
            "The system-building test and the career path",
          ],
        },
        {
          label: "Stage 29",
          name: "Data analysis tooling",
          parts: [
            "Moving from spreadsheets to code, and cleaning data",
            "Visualisation, dashboards and advanced SQL",
          ],
        },
        {
          label: "Stage 30",
          name: "Thinking like a data analyst",
          parts: [
            "Picking metrics, cohort analysis and A/B testing",
            "Causality, storytelling with data and data ethics",
          ],
        },
        {
          label: "Stage 31",
          name: "Capacity planning and operations",
          parts: [
            "Load drivers, staffing plans and a 13-week release calendar",
            "Load scenarios, allocating infrastructure cost and the monthly reporting rhythm",
          ],
        },
        {
          label: "Stage 32",
          name: "Release mechanics and system migration",
          parts: [
            "Gradual rollout, feature flags and traffic splitting",
            "Retiring the old system, the migration process and handover duties",
          ],
        },
        {
          label: "Stage 33",
          name: "Testing: how a release gets signed off",
          parts: [
            "Test conclusions, severity levels and evidence",
            "Sampling, hidden defects and the three lines of defence",
          ],
        },
        {
          label: "Stage 34",
          name: "SRE: foundations, operational risk & capacity risk",
          parts: [
            "Foundations of Reliability: risk management, blameless culture, the classic incidents",
            "Operational Resilience: incident data, BCP/DR, model risk & third parties",
            "Capacity and Resource Risk: quotas, capacity plans, autoscaling",
          ],
        },
        {
          label: "Stage 35",
          name: "SRE: performance risk",
          parts: [
            "Measuring tail latency, backtesting and p99",
            "Modelling load volatility, service dependencies and stress testing",
          ],
        },
        {
          label: "Stage 36",
          name: "SRE: advanced security & current issues",
          parts: [
            "The software supply chain, code signing and third-party dependency risk",
            "Shadow IT, systemic interconnection risk and digital assets",
            "Sole-supplier risk and platform lock-in",
          ],
        },
        {
          label: "Stage 37",
          name: "SRE: advanced foundations, operations, capacity & measurement",
          parts: [
            "Foundations: incident taxonomy, thresholds & quotas, efficiency measures, SLOs, ethics, data governance",
            "Advanced foundations: cost per request & infrastructure budget, board-level governance, the four responses to risk, systemic risk, reputation & strategy",
            "Advanced operations: scenario analysis, external incident data, change risk, critical services, human risk",
            "Advanced performance: standard load measurement, sensitivity by resource, mapping bottleneck factors, splitting cost across services",
            "Levelling the last four: advanced measurement, dependency and concentration risk, hourly capacity and buffers, performance attribution and platform risk",
            "Operational Resilience: incident taxonomy, self-assessment & KRIs, cyber security, fraud, resource redundancy, behavioural risk",
            "Capacity and Resources: the two kinds of capacity, load ladders, cost allocation, stress testing, reserve resources, autoscaling",
            "Quantitative Analysis: Bayes, MLE, Monte Carlo, bootstrapping, EVT, PCA",
          ],
        },
        {
          label: "Stage 38",
          name: "SRE: measurement, risk models & current issues",
          parts: [
            "Measurement and Risk Models: baselines, decision trees, queueing models, sensitivity, marginal cost, service tiering",
            "Current Issues: AI/ML, data-centre power, life after the monolith, sovereign infrastructure, cloud concentration, the recent large-scale outages",
          ],
        },
        {
          label: "Stage 39",
          name: "Payment and wallet products",
          parts: [
            "Revenue and unit economics: take rate, CAC/LTV, wallet balances",
            "The leakage and the road to break-even: failed transactions, fraud, infrastructure cost",
          ],
        },
        {
          label: "Stage 40",
          name: "Developer relations (DevRel)",
          parts: [
            "The DevRel job and the duty to announce changes",
            "The product roadmap, meeting the community and handling an incident in public",
          ],
        },
        {
          label: "Stage 41",
          name: "System logs and the event record",
          parts: [
            "Structured logging and the path from event to dashboard",
            "Log rotation, reconciliation and long-term retention",
          ],
        },
        {
          label: "Stage 42",
          name: "Infrastructure and data-centre projects",
          parts: [
            "Legal work, up-front capital cost and how an infrastructure project is structured",
            "Rented resources and project risk",
          ],
        },
        {
          label: "Stage 43",
          name: "Resource quotas and cloud cost",
          parts: [
            "Quotas, standby resources and cross-region failover infrastructure",
            "Information asymmetry and cloud-provider margins",
          ],
        },
      ],
    },
  },
};
