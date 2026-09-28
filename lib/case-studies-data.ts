export interface CaseStudyQuestion {
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  company: string;
  ticker: string;
  sector: string;
  difficulty: "bronze" | "silver" | "gold";
  description: string;
  caseStudyDocUrl?: string;
  questions: CaseStudyQuestion[];
  xpReward: number;
  coinReward: number;
  relatedLessonSlugs: { slug: string; title: string }[];
}

export const REAL_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "flash-sale-scaling",
    title: "Chuẩn Bị Hệ Thống Cho Đợt Flash Sale 11.11",
    company: "Sàn thương mại điện tử (tình huống giả định)",
    ticker: "SCALE",
    sector: "Thương mại điện tử & Hạ tầng",
    difficulty: "gold",
    description: "Lưu lượng dự kiến tăng gấp 20 lần trong hai giờ giảm giá. Tìm điểm nghẽn, giảm tải cho cơ sở dữ liệu, chống bán vượt tồn kho và giữ hệ thống đứng vững khi một dịch vụ bên ngoài chậm lại.",
    xpReward: 800,
    coinReward: 80,
    relatedLessonSlugs: [
      { slug: "do-tre-duoi-vi-sao-trung-binh-noi-doi", title: "Tối ưu, Bài 4: Độ trễ đuôi - vì sao trung bình nói dối" },
      { slug: "case-ty-le-trung-cache", title: "Case chuyên sâu: Tỷ lệ trúng bộ nhớ đệm" },
    ],
    questions: [
      {
        prompt: "Lưu lượng dự kiến tăng gấp 20 lần trong hai giờ flash sale. Bước chuẩn bị nào nên làm trước tiên?",
        options: [
          "Nhân số máy chủ web lên 20 lần vì tải cũng tăng đúng 20 lần",
          "Chạy kiểm thử tải với lưu lượng mô phỏng để tìm điểm nghẽn thật",
          "Tối ưu lại toàn bộ mã giao diện để trang tải nhanh hơn trước",
        ],
        correct: 1,
        explanation: "Hệ thống không mở rộng tuyến tính: thường chỉ một thành phần (cơ sở dữ liệu, một dịch vụ phụ thuộc) nghẽn trước. Kiểm thử tải cho biết đó là thành phần nào, để tiền và công sức dồn đúng chỗ thay vì nhân đều mọi thứ.",
      },
      {
        prompt: "Cơ sở dữ liệu nghẽn khi hàng nghìn người cùng xem một trang sản phẩm. Cách giảm tải hiệu quả nhất là gì?",
        options: [
          "Đặt bộ nhớ đệm cho trang sản phẩm vì dữ liệu này ít thay đổi",
          "Thêm chỉ mục cho mọi cột của bảng sản phẩm để truy vấn nhanh hơn",
          "Nâng máy chủ cơ sở dữ liệu lên cấu hình mạnh nhất có thể mua",
        ],
        correct: 0,
        explanation: "Trang sản phẩm được đọc rất nhiều nhưng hiếm khi đổi, nên bộ nhớ đệm trả lời phần lớn request mà không chạm tới cơ sở dữ liệu. Chỉ mục trên mọi cột làm chậm thao tác ghi mà mọi lượt đọc vẫn đi vào cơ sở dữ liệu; nâng cấu hình thì có trần và đắt.",
      },
      {
        prompt: "Chỉ có 1.000 sản phẩm giá sốc trong kho. Làm sao để không bán vượt số lượng?",
        options: [
          "Đọc số tồn kho, kiểm tra còn hàng, rồi ghi số mới ở một bước riêng",
          "Kiểm tra tồn kho ngay trên trình duyệt trước khi cho bấm nút mua",
          "Trừ tồn kho bằng một thao tác nguyên tử kèm điều kiện số lượng > 0",
        ],
        correct: 2,
        explanation: "Đọc rồi ghi ở hai bước là điều kiện tranh chấp kinh điển: hai request cùng đọc thấy còn 1 và cùng trừ. Một câu lệnh nguyên tử như UPDATE ... SET qty = qty - 1 WHERE qty > 0 để cơ sở dữ liệu tự bảo đảm. Kiểm tra ở trình duyệt thì người dùng sửa được.",
      },
      {
        prompt: "Dịch vụ thanh toán bên thứ ba bắt đầu chậm. Điều gì ngăn nó kéo sập cả hệ thống?",
        options: [
          "Tăng thời gian chờ để request nào cũng đợi được tới lúc có phản hồi",
          "Đặt thời gian chờ ngắn và cầu dao ngắt mạch quanh lời gọi thanh toán",
          "Tự động thử lại ngay lập tức mỗi lần lời gọi thanh toán bị lỗi",
        ],
        correct: 1,
        explanation: "Chờ lâu hơn làm luồng xử lý bị giữ lại và cạn dần, thử lại ngay thì nhân tải lên đúng dịch vụ đang yếu. Thời gian chờ ngắn cộng cầu dao ngắt mạch cô lập phần hỏng: request thanh toán thất bại nhanh, các trang khác vẫn chạy.",
      },
      {
        prompt: "Sau đợt sale, độ trễ p50 ổn định ở 120 ms nhưng khách vẫn phàn nàn là chậm. Nên xem số nào?",
        options: [
          "Độ trễ p99, vì phần đuôi mới là trải nghiệm của nhóm chậm nhất",
          "Độ trễ trung bình, vì nó đã tính đến mọi request trong đợt sale",
          "Mức dùng CPU, vì CPU thấp nghĩa là hệ thống đang phục vụ tốt",
        ],
        correct: 0,
        explanation: "p50 chỉ nói về người dùng ở giữa. Nếu 1% request mất 5 giây, trung bình gần như không nhúc nhích nhưng hàng nghìn khách vẫn gặp trang treo. CPU thấp cũng không loại trừ việc request đang chờ khoá hay chờ một dịch vụ khác.",
      },
    ],
  },
  {
    id: "saas-zero-downtime-migration",
    title: "Di Trú Cơ Sở Dữ Liệu Không Dừng Dịch Vụ",
    company: "Phần mềm quản lý bán hàng SaaS (tình huống giả định)",
    ticker: "DB-MIG",
    sector: "Phần mềm SaaS & Dữ liệu",
    difficulty: "silver",
    description: "Sản phẩm cần chuyển 2 TB dữ liệu sang một cụm cơ sở dữ liệu mới trong khi khách hàng vẫn đang dùng. Đổi lược đồ an toàn, đồng bộ dữ liệu đang thay đổi, kiểm tra độ khớp và giữ đường quay lui.",
    xpReward: 600,
    coinReward: 60,
    relatedLessonSlugs: [
      { slug: "trien-khai-khong-gian-doan", title: "Triển khai: thay máy đang chạy mà không ai nhận ra" },
      { slug: "phien-ban-api", title: "Phiên bản: sống chung với nhiều thế hệ máy khách" },
    ],
    questions: [
      {
        prompt: "Cần đổi tên cột `phone` thành `phone_number` trong một bảng đang chạy. Cách nào an toàn?",
        options: [
          "Đổi tên cột bằng một migration và triển khai mã mới cùng lúc",
          "Dừng dịch vụ vài phút lúc nửa đêm, khi ít người dùng nhất",
          "Thêm cột mới, ghi cả hai cột, chuyển đọc, rồi mới xoá cột cũ",
        ],
        correct: 2,
        explanation: "Trong lúc triển khai, bản mã cũ và mới chạy song song: đổi tên ngay là bản cũ đọc một cột không còn tồn tại. Mở rộng rồi thu hẹp (expand - contract) giữ cả hai bản đều chạy được ở mọi thời điểm, và không cần dừng dịch vụ.",
      },
      {
        prompt: "Trong lúc chép sang cụm mới, dữ liệu cũ vẫn tiếp tục thay đổi. Làm sao để hai bên khớp nhau?",
        options: [
          "Chép bản chụp ban đầu, rồi phát lại luồng thay đổi (CDC) tới khi bắt kịp",
          "Chép toàn bộ dữ liệu hai lần và coi lần sau đã bắt kịp lần trước",
          "Chép một lần rồi chuyển ngay, phần chênh lệch sẽ tự đồng bộ về sau",
        ],
        correct: 0,
        explanation: "Bản chụp cho điểm xuất phát nhất quán; bắt thay đổi dữ liệu (change data capture) phát lại mọi thao tác ghi xảy ra sau đó. Chép lại lần hai vẫn bỏ sót những gì đổi trong lúc chép, và không có cơ chế nào tự đồng bộ phần chênh lệch.",
      },
      {
        prompt: "Làm sao biết dữ liệu ở cụm mới đã khớp trước khi chuyển lưu lượng sang?",
        options: [
          "So tổng số dòng của từng bảng, số dòng bằng nhau là dữ liệu khớp",
          "So tổng kiểm (checksum) theo từng khoảng khoá giữa hai cụm",
          "Chạy thử vài truy vấn phổ biến và xem kết quả có hợp lý không",
        ],
        correct: 1,
        explanation: "Số dòng bằng nhau vẫn có thể giấu các dòng bị cắt cụt hay sai giá trị. Tổng kiểm theo từng khoảng khoá so được nội dung, và khi lệch thì chỉ ra đúng khoảng cần chép lại thay vì bắt làm lại từ đầu.",
      },
      {
        prompt: "Chuyển 100% lưu lượng sang cụm mới xong thì lỗi tăng vọt. Kế hoạch đáng lẽ phải có điều gì?",
        options: [
          "Sửa lỗi thật nhanh trên cụm mới, vì quay về cụm cũ là thừa nhận thất bại",
          "Chuyển thẳng 100% ngay từ đầu để rút ngắn thời gian chạy song song",
          "Chuyển dần theo tỷ lệ và giữ cụm cũ đồng bộ để còn quay lui được",
        ],
        correct: 2,
        explanation: "Chuyển theo nấc (1%, 10%, 50%...) để lỗi lộ ra khi mới ảnh hưởng một phần nhỏ người dùng. Giữ cụm cũ nhận đồng bộ ngược nghĩa là quay lui chỉ mất vài phút - sửa gấp trên môi trường đang cháy thường gây thêm lỗi thứ hai.",
      },
    ],
  },
  {
    id: "ride-hailing-peak-outage",
    title: "Sự Cố Ứng Dụng Đặt Xe Giờ Cao Điểm",
    company: "Ứng dụng đặt xe (tình huống giả định)",
    ticker: "SEV-1",
    sector: "Ứng dụng di động & Vận hành",
    difficulty: "gold",
    description: "18 giờ thứ Sáu, tỷ lệ đặt xe thất bại vọt lên 40%. Đi từ lúc nhận cảnh báo, khôi phục dịch vụ, khoanh vùng nguyên nhân tới bản phân tích sau sự cố.",
    xpReward: 800,
    coinReward: 80,
    relatedLessonSlugs: [
      { slug: "sli-slo-va-sla", title: "SLI, SLO và SLA - ba thứ hay bị nhầm" },
      { slug: "co-tinh-nang", title: "Cờ tính năng: tách lúc triển khai khỏi lúc phát hành" },
    ],
    questions: [
      {
        prompt: "Cảnh báo cho thấy tỷ lệ lỗi tăng vọt ngay sau bản phát hành lúc 17h45. Việc đầu tiên nên làm là gì?",
        options: [
          "Đọc log để tìm đúng dòng mã gây lỗi trước khi động vào hệ thống",
          "Quay lui bản phát hành để khôi phục dịch vụ, tìm nguyên nhân sau",
          "Tăng số máy chủ vì giờ cao điểm thường là thủ phạm gây ra lỗi",
        ],
        correct: 1,
        explanation: "Khi sự cố trùng với một thay đổi vừa phát hành, quay lui là cách nhanh nhất cắt thiệt hại: khôi phục trước, điều tra sau. Tìm dòng mã lỗi có thể mất hàng giờ trong khi khách vẫn không đặt được xe.",
      },
      {
        prompt: "Quay lui xong nhưng lỗi vẫn còn 15%. Dấu hiệu nào cho thấy nguyên nhân nằm ở một phụ thuộc bên ngoài?",
        options: [
          "Lỗi dồn vào các request gọi dịch vụ bản đồ, các luồng khác vẫn bình thường",
          "CPU máy chủ ứng dụng tăng cao, nên lỗi chắc chắn nằm trong mã của mình",
          "Lỗi bắt đầu đúng giờ cao điểm, nên nguyên nhân chỉ có thể là lượng tải",
        ],
        correct: 0,
        explanation: "Lỗi tập trung đúng ở những request đi qua một phụ thuộc là dấu hiệu khoanh vùng mạnh nhất. CPU cao có thể chính là hậu quả của việc thử lại liên tục vào dịch vụ bản đồ; trùng giờ cao điểm là tương quan chứ chưa phải nguyên nhân.",
      },
      {
        prompt: "Dịch vụ bản đồ chậm khiến luồng đặt xe bị treo. Cách giảm thiệt hại tạm thời nào hợp lý?",
        options: [
          "Tắt hẳn tính năng đặt xe tới khi dịch vụ bản đồ ổn định trở lại",
          "Cho ứng dụng thử lại liên tục tới khi dịch vụ bản đồ trả lời được",
          "Hạ cấp có kiểm soát: ước giá theo đường chim bay, tạm bỏ qua bản đồ",
        ],
        correct: 2,
        explanation: "Hạ cấp có kiểm soát giữ chức năng cốt lõi chạy với độ chính xác thấp hơn, và giá có thể chỉnh lại khi chuyến kết thúc. Tắt hẳn đặt xe là tự gây ra sự cố toàn phần; thử lại liên tục đè thêm tải lên dịch vụ đang yếu.",
      },
      {
        prompt: "Khi viết bản phân tích sau sự cố (postmortem), điều gì làm nó có giá trị nhất?",
        options: [
          "Xác định chính xác kỹ sư đã phát hành bản lỗi để tránh lặp lại",
          "Các hành động khắc phục có người phụ trách và hạn hoàn thành",
          "Mô tả dòng thời gian thật chi tiết, càng dài càng thể hiện sự nghiêm túc",
        ],
        correct: 1,
        explanation: "Một postmortem chỉ đáng giá khi nó thay đổi hệ thống: mỗi hành động có người nhận và có hạn. Tìm người để quy lỗi khiến mọi người giấu thông tin ở lần sau; dòng thời gian dài không tự sửa được gì.",
      },
    ],
  },
];
