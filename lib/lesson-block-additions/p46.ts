import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 46. Một người viết cho một tệp.
export const P46_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "viet-pipeline-dau-tien": [
    {
      type: "flow",
      title: "Một lần đẩy mã đi qua pipeline",
      steps: [
        { label: "Sự kiện kích hoạt", detail: "Bạn mở pull request hoặc đẩy lên nhánh main. Khối on: quyết định sự kiện nào đánh thức pipeline; nhánh khác không có trong danh sách thì không chạy gì." },
        { label: "lint chạy trước", detail: "Một máy sạch tải mã về, cài thư viện bằng npm ci rồi chạy lint và typecheck. Đây là job rẻ nhất, nên đứng đầu để lỗi cú pháp dừng mọi thứ sau trong vài chục giây." },
        { label: "test và build chạy song song", detail: "Cả hai khai báo needs: lint nên chỉ bắt đầu khi lint xanh, và vì không phụ thuộc nhau nên chạy cùng lúc trên hai máy riêng. Thời gian chờ là job dài hơn, không phải tổng hai job." },
        { label: "deploy chờ cả hai", detail: "needs: [test, build] bắt deploy đợi đủ hai job xanh. Nếu build đỏ thì test xanh cũng vô ích: deploy bị bỏ qua, không có gì ra khỏi pipeline." },
        { label: "Điều kiện nhánh", detail: "Dòng if: github.ref == 'refs/heads/main' làm deploy chỉ chạy khi mã đã vào main. Pull request chạy đến hết build rồi dừng, không bao giờ chạm môi trường thật." },
      ],
    },
  ],

  "cache-va-song-song-trong-pipeline": [
    {
      type: "flow",
      title: "Nhanh hơn mà vẫn kiểm đủ: đường đi của một lần chạy",
      steps: [
        { label: "Huỷ lần chạy cũ", detail: "Bạn đẩy thêm một commit lên cùng nhánh khi lần trước chưa xong. Nhóm concurrency huỷ lần cũ trên pull request, vì kết quả của nó đã lỗi thời; riêng nhánh main thì không huỷ để mỗi commit đều có kết quả." },
        { label: "Tính khoá cache", detail: "Khoá là npm- cộng với băm của package-lock.json. Tệp khoá không đổi thì khoá giống hệt, cache trúng; nâng một thư viện thì băm đổi, cache trượt đúng lúc cần. Khoá theo tên nhánh sẽ sai cả hai chiều." },
        { label: "Khôi phục hoặc tải mới", detail: "Trúng cache: thư mục ~/.npm được trả về và npm ci chỉ lắp lại, mất vài giây. Trượt cache: tải từ mạng như lần đầu, rồi lưu lại dưới khoá mới cho lần sau." },
        { label: "Chia kiểm thử thành bốn mảnh", detail: "Ma trận shard 1 đến 4 sinh bốn máy chạy cùng lúc, mỗi máy chạy một phần bộ kiểm thử. Tổng việc không đổi, thời gian chờ giảm gần bốn lần nếu các mảnh có độ dài gần nhau." },
        { label: "Chờ mảnh chậm nhất", detail: "Job chỉ xanh khi cả bốn mảnh xanh, nên một mảnh quá nặng kéo cả pipeline. Đo thời gian từng mảnh rồi chia lại theo thời gian chạy, không chia theo số tệp." },
      ],
    },
  ],

  "bi-mat-va-quyen-trong-pipeline": [
    {
      type: "flow",
      title: "Chìa khoá đi theo mã nào, tới job nào",
      steps: [
        { label: "Quyền mặc định chỉ đọc", detail: "Dòng permissions: contents: read ở đầu tệp áp cho mọi job. Một bước nào đó bị chiếm quyền cũng chỉ đọc được mã, không đẩy được commit hay sửa release." },
        { label: "Pull request chạy không bí mật", detail: "Job test chạy cả với pull request từ fork, tức mã của người lạ. Nó không nhận bí mật nào, nên mã độc trong package.json hay tệp cấu hình kiểm thử chạy ra cũng không có gì để lấy." },
        { label: "Mã được duyệt và gộp vào main", detail: "Chỉ sau khi có người đọc và duyệt, mã mới vào main và cho phép job deploy bắt đầu. Điều kiện if kiểm nhánh là chốt chặn thứ hai, phòng khi ai đó đổi trigger." },
        { label: "Môi trường production có luật bảo vệ", detail: "environment: production gắn bí mật với một môi trường có thể đòi người duyệt hoặc giới hạn nhánh. Bí mật không nằm chung cho cả kho, chỉ job khai báo môi trường này mới thấy." },
        { label: "Mã thông báo ngắn hạn qua OIDC", detail: "id-token: write cho phép job xin một mã tạm từ nhà cung cấp đám mây thay cho khoá cố định. Mã hết hạn sau lần chạy, nên nhật ký hay bản sao bị lộ cũng không dùng lại được." },
      ],
    },
  ],

  "trien-khai-tu-dong-canary-va-quay-lai": [
    {
      type: "flow",
      title: "Một bản mới đi qua kế hoạch canary",
      steps: [
        { label: "5% lưu lượng sang bản mới", detail: "Bản đang chạy vẫn nhận 95%. Chỉ một phần nhỏ người dùng gặp lỗi nếu có; sự cố ở bước này nhỏ và đo được." },
        { label: "Chờ đủ mẫu", detail: "Phải qua 10 phút và đủ 2000 yêu cầu mới được xét. Lỗi 1 trên 20 yêu cầu trông như 5% nhưng chỉ là may rủi; quyết định sớm trên mẫu nhỏ làm kế hoạch tăng nhầm hoặc lùi nhầm." },
        { label: "So với bản đang chạy", detail: "Hệ thống so tỷ lệ lỗi 5xx, độ trễ p95 và tải cơ sở dữ liệu của canary với bản cũ ở cùng thời điểm. Nếu cả hai cùng xấu vì lưu lượng cao điểm, mức chênh vẫn nhỏ và không bị báo oan." },
        { label: "Tăng 25%, 50% rồi 100%", detail: "Chỉ số nằm trong giới hạn thì mỗi bước chờ thêm 15 phút rồi tăng. Lỗi chỉ xuất hiện ở tải lớn sẽ lộ ra ở 50%, trước khi mọi người dùng cùng chịu." },
        { label: "Vượt ngưỡng thì quay lại", detail: "Bất kỳ chỉ số nào xấu hơn bản cũ quá mức cho phép thì khi_that_bai: quay_lai trả toàn bộ lưu lượng về bản cũ, không chờ người. Đường này cần được diễn tập định kỳ, vì đường quay lại chưa từng dùng là đường chưa chắc chạy." },
      ],
    },
  ],

  "test-chap-chon-va-giu-pipeline-xanh": [
    {
      type: "flow",
      title: "Từ một lần đỏ khó hiểu tới pipeline đáng tin trở lại",
      steps: [
        { label: "Một lần đỏ, chạy lại thì xanh", detail: "Kiểm thử trượt trên commit không liên quan, bấm chạy lại thì đạt. Nếu mọi người chỉ bấm chạy lại rồi đi tiếp, màu đỏ bắt đầu mất nghĩa từ chính lúc này." },
        { label: "Tìm trong lịch sử chạy", detail: "Lọc những kiểm thử vừa đạt vừa trượt trên cùng một commit. Kiểm thử trượt đều trên một commit lỗi là hỏng thật; chỉ cái đổi kết quả mà mã không đổi mới là chập chờn." },
        { label: "Cách ly khỏi cổng chặn", detail: "Chuyển kiểm thử chập chờn sang nhóm không chặn gộp mã, kèm người chịu trách nhiệm và hạn sửa. Cổng chính xanh trở lại và tin được, còn lỗi vẫn bị nhìn thấy." },
        { label: "Tìm nguyên nhân thật", detail: "Thường là sleep cố định, giờ hay số ngẫu nhiên, dữ liệu dùng chung giữa các kiểm thử, hoặc gọi mạng thật. In hạt giống khi hỏng để chạy lại đúng ca đó." },
        { label: "Sửa rồi trả về cổng", detail: "Thay sleep bằng chờ theo điều kiện, mỗi kiểm thử tự dựng và dọn dữ liệu, chạy theo thứ tự ngẫu nhiên để lỗi phụ thuộc thứ tự lộ sớm. Chạy lặp nhiều lần trước khi trả về, vì một lần xanh chưa chứng minh gì." },
      ],
    },
  ],

  "doc-thong-bao-loi-va-stack-trace": [
    {
      type: "flow",
      title: "Đọc một stack trace theo đúng thứ tự",
      steps: [
        { label: "Dòng đầu: cái gì hỏng", detail: "Với TypeError: Cannot read properties of undefined (reading 'email') bạn đã biết thứ đứng trước .email là undefined. Chưa cần nhìn xuống dưới để biết câu hỏi: giá trị đó đáng lẽ đến từ đâu." },
        { label: "Bỏ khung của thư viện", detail: "Các dòng trong node_modules và node: là đường ống bên trong Express hay Node. Lỗi hầu như không do chúng; đọc chúng chỉ tốn thời gian." },
        { label: "Khung đầu tiên của bạn", detail: "at guiThuXacNhan (thong-bao.js:14:32) là nơi mã của bạn chạm vào giá trị undefined. Mở tệp, dòng 14, cột 32 và xem đối tượng nào đang được lấy .email." },
        { label: "Đi ngược tới người gọi", detail: "Khung kế tiếp xuLyDonHang (don-hang.js:41) là hàm đã truyền vào giá trị đó. Giá trị trống thường sinh ra ở đây hoặc ở xa hơn, không phải ở dòng báo lỗi." },
        { label: "Đặt giả thuyết rồi mới sửa", detail: "Ví dụ: đơn hàng không có khách vì truy vấn trả về rỗng. Kiểm bằng log hoặc điểm dừng trước. Thêm dấu ?. ở dòng 14 chỉ làm lỗi biến mất mà gốc vẫn còn." },
      ],
    },
  ],

  "git-bisect-tim-commit-gay-loi": [
    {
      type: "flow",
      title: "Chia đôi lịch sử để tìm commit gây lỗi",
      steps: [
        { label: "Xác định hai đầu", detail: "Commit hiện tại là xấu, thẻ v2.3.0 tuần trước còn chạy là tốt. Hai điểm này là toàn bộ thông tin bạn cần; chưa phải đọc commit nào." },
        { label: "Git nhảy tới giữa", detail: "Với 127 commit còn lại, git checkout commit ở giữa và báo khoảng 7 bước. Bạn chỉ chạy kiểm thử nhắm đúng lỗi, ví dụ tests/xuat-hoa-don." },
        { label: "Đánh dấu tốt hoặc xấu", detail: "Kiểm thử đỏ thì git bisect bad, nghĩa là lỗi nằm ở nửa trước; xanh thì git bisect good, lỗi nằm ở nửa sau. Mỗi câu trả lời loại một nửa số commit còn nghi ngờ." },
        { label: "Lặp tới khi còn một commit", detail: "Khoảng 127 commit cần 7 lần, 1.000 commit chỉ cần 10. Commit không build được thì bỏ qua bằng git bisect skip, mã thoát 125 khi chạy tự động." },
        { label: "Đọc commit tìm được rồi reset", detail: "Git báo first bad commit là 3f2a1c9. Đọc phần thay đổi của nó để hiểu vì sao hỏng, rồi git bisect reset để quay về nhánh đang làm. Dùng git bisect run với một lệnh trả 0 hoặc khác 0 để máy làm hết vòng lặp." },
      ],
    },
  ],

  "go-loi-bang-log-va-ma-yeu-cau": [
    {
      type: "flow",
      title: "Một mã yêu cầu đi xuyên ba dịch vụ",
      steps: [
        { label: "Cửa ngoài gắn mã", detail: "Middleware đọc header x-request-id; nếu chưa có thì sinh mới bằng randomUUID, và đặt lại vào phản hồi. Từ đây mọi dòng log của yêu cầu mang cùng ma_yc." },
        { label: "Logger con mang mã theo", detail: "req.log là logger.child({ ma_yc }), nên lập trình viên chỉ ghi su_kien và giá trị liên quan. Không ai phải nhớ gắn mã bằng tay vào từng dòng, vì dòng nào thiếu mã là dòng không tìm được." },
        { label: "Truyền mã sang dịch vụ kế", detail: "Khi gọi dịch vụ thanh toán, mã đi theo header x-request-id. Quên bước này thì câu chuyện đứt tại ranh giới và log của dịch vụ sau trở thành một đám dòng không liên quan." },
        { label: "Ghi ở ranh giới", detail: "Dòng warn goi_nha_cung_cap_het_gio có đích, cho_ms: 5000 và lan_thu: 2. Gọi ra ngoài, hết giờ và thử lại là điểm hay hỏng nhất, nên cần cả thời gian chờ chứ không chỉ chữ lỗi." },
        { label: "Lọc theo mã, sắp theo thời gian", detail: "Khi có báo lỗi, tìm dòng error, lấy ma_yc của nó rồi lọc mọi dịch vụ theo mã đó. Từ hàng triệu dòng chỉ còn vài dòng kể lại đúng chuyện của một người dùng." },
      ],
    },
  ],

  "loi-tranh-chap-va-loi-luc-co-luc-khong": [
    {
      type: "flow",
      title: "Hai yêu cầu cùng mua món cuối cùng",
      steps: [
        { label: "Cả hai cùng đọc tồn", detail: "Kho còn 1 món. Yêu cầu A và B đều chạy const ton = await doc(id) và cùng thấy 1. Mỗi dòng mã đều đúng nếu chạy một mình." },
        { label: "Khoảng hở giữa đọc và ghi", detail: "Giữa await doc và await ghi, tiến trình nhường quyền cho việc khác. Trên máy bạn khoảng hở này vài mili giây và hiếm khi có yêu cầu thứ hai chen vào; trên production thì có." },
        { label: "Cả hai cùng ghi", detail: "A ghi tồn bằng 0, B cũng kiểm thấy ton > 0 vì giá trị nó cầm đã cũ, rồi ghi tồn bằng 0. Hai đơn được xác nhận cho một món hàng." },
        { label: "Ép cho nó xảy ra", detail: "Không thể bắt lỗi này bằng cách nhìn kỹ hơn. Chạy nhiều yêu cầu song song vào cùng một bản ghi, hoặc chèn chờ nhân tạo vào khoảng hở, để lỗi tái hiện mỗi lần thay vì một lần trong nghìn." },
        { label: "Đóng khoảng hở", detail: "Dùng câu lệnh ghi có điều kiện UPDATE ... SET ton = ton - 1 WHERE ton > 0 rồi kiểm số dòng bị ảnh hưởng: 0 nghĩa là hết hàng. Cần tính phức tạp hơn thì khoá dòng bằng FOR UPDATE trong giao dịch." },
      ],
    },
  ],

  "viet-lai-su-co-va-kiem-thu-hoi-quy": [
    {
      type: "flow",
      title: "Từ sự cố tới lỗi không quay lại",
      steps: [
        { label: "Giảm thiểu trước", detail: "Việc đầu tiên là cầm máu: quay lại bản trước, như lúc 15:10 trong dòng thời gian mẫu. Tìm nguyên nhân khi người dùng còn đang lỗi là chọn sai thứ tự." },
        { label: "Viết kiểm thử đỏ trước khi sửa", detail: "Tái hiện đúng ca gây lỗi, ví dụ đơn đúng mốc 500.000đ, và xác nhận kiểm thử đỏ. Kiểm thử viết sau khi sửa xanh ngay, nên bạn không biết nó có bắt được lỗi hay không." },
        { label: "Sửa cho kiểm thử xanh", detail: "Sửa nhỏ nhất đủ làm ca vừa viết đạt, và các ca cũ vẫn đạt. Kiểm thử xanh khi bản sửa đúng và đỏ khi ai đó gỡ bản sửa: đó là bằng chứng." },
        { label: "Viết bản tường thuật không đổ lỗi", detail: "Một trang gồm tác động, dòng thời gian từ bắt đầu, phát hiện, xử lý, giảm thiểu tới khắc phục, rồi hỏi vì sao ba lần: vì sao lỗi, vì sao kiểm thử không bắt, vì sao 39 phút mới phát hiện." },
        { label: "Việc cần làm có người và hạn", detail: "Mỗi việc ghi tên và ngày, ví dụ thêm cảnh báo lỗi theo từng đường dẫn. Việc không có người nhận là lời hứa mà sự cố sau sẽ nhắc lại." },
      ],
    },
  ],
};
