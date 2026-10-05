import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r13. Một người viết cho một tệp.
export const R13_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "mot-lan-toi-uu-lon": [
    {
      type: "scenario",
      title: "Slide báo cáo quý: thời gian tải trang giảm 40%",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn chuẩn bị báo cáo quý. Thời gian tải trang trung bình giảm từ 3,0 giây xuống 1,8 giây, sếp rất vui. Khi xem lại nhật ký thay đổi, bạn thấy đội đã gỡ một widget quảng cáo nặng khỏi trang chủ và sửa hai truy vấn chậm. Bạn muốn biết mức giảm này đến từ đâu trước khi lên slide.",
          choices: [
            { label: "Chạy lại phép đo với widget được đưa vào", next: "tach" },
            { label: "Lên slide luôn vì con số tổng đã đẹp", next: "len-slide" },
            { label: "Hỏi từng kỹ sư xem ai tự thấy mình đóng góp", next: "hoi-mieng" },
          ],
        },
        tach: {
          text: "Kết quả: gỡ widget chiếm khoảng 0,9 giây trong 1,2 giây cải thiện (số minh hoạ). Phần lặp lại được chỉ còn khoảng 0,3 giây. Sếp hỏi quý sau đặt mục tiêu bao nhiêu.",
          choices: [
            { label: "Đặt mục tiêu quý sau dựa trên phần 0,3 giây", next: "muc-tieu-that" },
            { label: "Đặt mục tiêu giảm thêm 40% như quý này", next: "muc-tieu-ao" },
          ],
        },
        "len-slide": {
          text: "Bạn báo cáo giảm 40% như một xu hướng. Sếp đặt mục tiêu giảm thêm 40% cho quý sau.",
          choices: [
            { label: "Nhận mục tiêu và tìm thêm nhát cắt", next: "ket-bad-cat" },
            { label: "Quay lại tách phần một lần ra khỏi báo cáo", next: "tach" },
          ],
        },
        "hoi-mieng": {
          text: "Mỗi người kể phần mình đóng góp, tổng các phần cộng lại gần gấp đôi mức giảm thật vì ai cũng tính cả hiệu ứng của widget. Bạn vẫn không biết phần nào lặp lại được.",
          choices: [
            { label: "Bỏ cách này, chạy lại phép đo có tách", next: "tach" },
            { label: "Lấy trung bình lời kể làm số cuối cùng", next: "ket-bad-cat" },
          ],
        },
        "muc-tieu-that": {
          text: "Slide ghi rõ: 40% giảm, trong đó phần lớn là gỡ widget (một lần), phần tối ưu truy vấn là đà. Mục tiêu quý sau là cắt thêm 0,3 giây bằng cách tối ưu truy vấn và bớt vòng gọi. Sếp hiểu đây là cải thiện có đà và duyệt kế hoạch thực tế.",
          ending: "good",
        },
        "muc-tieu-ao": {
          text: "Bạn đặt mục tiêu 40% trong khi phần lớn lợi ích quý trước là nhát cắt đã dùng rồi. Hết quý sau, thời gian tải đứng yên ở 1,8 giây, đội bị đánh giá là chững lại dù chẳng làm gì sai.",
          ending: "bad",
        },
        "ket-bad-cat": {
          text: "Quý sau đội không còn widget nào để gỡ. Chỉ số đứng yên, mục tiêu 40% trượt hoàn toàn, và đội phải giải thích vì sao một xu hướng tưởng có đà lại biến mất.",
          ending: "bad",
        },
      },
    },
  ],

  "case-uoc-luong-dung-luong": [
    {
      type: "scenario",
      title: "Cần bao nhiêu máy cho dịch vụ chưa viết xong",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Sếp hỏi cần đặt bao nhiêu máy cho dịch vụ gợi ý sản phẩm sắp ra mắt, ngân sách chốt trong tuần này. Dịch vụ chưa có tải thật. Dịch vụ thanh toán đang chạy ổn, giờ cao điểm 600 request mỗi phút trên 12 máy (số minh hoạ).",
          choices: [
            { label: "Lấy dịch vụ thanh toán làm mốc và ước hệ số", next: "mon-hoc" },
            { label: "Chờ có tải thật rồi mới trả lời sếp", next: "cho-doi" },
            { label: "Nhân đôi số máy của đội bên cạnh cho chắc", next: "doi-ben" },
          ],
        },
        "mon-hoc": {
          text: "Bạn ước dịch vụ mới nặng gấp 4 lần dịch vụ thanh toán mỗi request, và tải cao điểm bằng khoảng một nửa. Bạn cần chọn tải để tính.",
          choices: [
            { label: "Dùng tải trung bình ngày cho nhẹ ngân sách", next: "trung-binh" },
            { label: "Dùng tải giờ cao điểm rồi trừ phần dự phòng", next: "cao-diem" },
          ],
        },
        "cho-doi": {
          text: "Hạn chốt ngân sách trôi qua. Đội mua vội số máy theo cảm tính của người nói to nhất và không ghi lại giả định nào.",
          choices: [
            { label: "Tự ước lượng bù ngay trong ngày", next: "mon-hoc" },
            { label: "Chấp nhận con số đã mua", next: "ket-mu" },
          ],
        },
        "doi-ben": {
          text: "Đội bên cạnh chạy một hệ thống đọc nhiều, còn dịch vụ của bạn ghi nhiều. Hệ số so sánh gần như vô nghĩa, nhưng bạn chưa biết điều đó.",
          choices: [
            { label: "Dùng nguyên con số, hết việc", next: "ket-mu" },
            { label: "Đổi mốc sang hệ thống có hình dạng tải giống", next: "mon-hoc" },
          ],
        },
        "trung-binh": {
          text: "Con số trông gọn, ngân sách được duyệt nhanh. Đúng ngày khuyến mãi, tải giờ cao điểm gấp ba tải trung bình, các máy nghẽn và trang gợi ý chết cả tiếng.",
          ending: "bad",
        },
        "cao-diem": {
          text: "Bạn ghi vào đề xuất: số máy mỗi vùng, hệ số 4 và lý do chọn nó, dự phòng để chịu được mất một vùng, kèm ba kịch bản thấp, vừa, cao. Sếp cãi vào con số 4 thay vì con số cuối, và sau khi ra mắt đội đối chiếu để chỉnh hệ số cho lần sau.",
          ending: "good",
        },
        "ket-mu": {
          text: "Không ai biết con số đến từ giả định nào. Khi thiếu máy, đội không biết giả định nào sai để sửa; khi thừa, không ai dám giảm vì không có căn cứ.",
          ending: "bad",
        },
      },
    },
  ],

  "case-chi-phi-moi-request": [
    {
      type: "scenario",
      title: "Hoá đơn hạ tầng tăng 40%: có đáng lo không",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Tài vụ nhắn: hoá đơn hạ tầng tháng này tăng 40% so với tháng trước, giải thích giúp. Bạn có sẵn tổng chi phí và đang mở bảng số liệu lưu lượng.",
          choices: [
            { label: "Chia hoá đơn cho số request cùng kỳ", next: "chia" },
            { label: "Trả lời rằng tăng do hệ thống đang lớn lên", next: "doan" },
            { label: "Cắt ngay các máy ít dùng nhất để giảm hoá đơn", next: "cat-bua" },
          ],
        },
        chia: {
          text: "Lưu lượng tăng 5% nhưng chi phí mỗi request tăng khoảng 33% (số minh hoạ). Không phải tăng trưởng, mà có chỗ đang đốt tiền. Bạn cần biết chỗ nào.",
          choices: [
            { label: "Gắn nhãn theo dịch vụ rồi xem khoản nào tăng", next: "nhan" },
            { label: "Đoán là phần tính toán và giảm cấu hình máy", next: "cat-bua" },
          ],
        },
        doan: {
          text: "Tài vụ hỏi lại: lớn lên bao nhiêu thì đổi lại được gì. Bạn không có con số nào để trả lời.",
          choices: [
            { label: "Quay lại chia hoá đơn cho lưu lượng", next: "chia" },
            { label: "Nhắc lại rằng đây là chuyện bình thường", next: "ket-mo-ho" },
          ],
        },
        "cat-bua": {
          text: "Bạn giảm cấu hình máy tính toán. Hoá đơn gần như không đổi vì khoản tăng nằm ở chỗ khác, còn độ trễ tăng lên khiến người dùng phàn nàn.",
          ending: "bad",
        },
        nhan: {
          text: "Nhãn cho thấy một môi trường thử nghiệm chạy suốt sáu tháng không phục vụ request nào, cộng với dữ liệu nhật ký cũ vẫn tích tụ. Bạn tắt môi trường, đặt thời hạn xoá nhật ký, và gửi tài vụ chi phí mỗi request theo từng tháng để theo dõi xu hướng.",
          ending: "good",
        },
        "ket-mo-ho": {
          text: "Cuộc họp tháng sau lặp lại y hệt: một con số tăng, không ai biết vì sao, không hành động nào được giao. Khoản bị bỏ quên tiếp tục tính tiền.",
          ending: "bad",
        },
      },
    },
  ],

  "doc-dong-tai-nguyen-he-thong-lon": [
    {
      type: "scenario",
      title: "Tổng chi phí tăng gấp ba sau hai năm",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn nhận một báo cáo chi phí hạ tầng đi lên gấp ba trong hai năm. Ban giám đốc yêu cầu một kế hoạch cắt giảm trong tuần này. Bạn có thể xem tổng chi phí, số người dùng hoạt động và hoá đơn chia theo bốn nhóm.",
          choices: [
            { label: "Chia từng nhóm cho số người dùng hoạt động", next: "chia" },
            { label: "Đề xuất cắt giảm cấu hình máy tính toán", next: "tinh-toan" },
            { label: "Xin thêm một tháng để tự dựng công cụ giám sát", next: "cho" },
          ],
        },
        chia: {
          text: "Số người dùng tăng gấp hai rưỡi, tính toán trên mỗi người dùng gần như đứng yên. Lưu trữ và truyền dữ liệu mỗi người dùng đều tăng gấp đôi (số minh hoạ). Bạn cần chọn nơi xem tiếp.",
          choices: [
            { label: "Xem bảng lớn nhất đang giữ dữ liệu từ ngày nào", next: "luu-tru" },
            { label: "Tập trung tìm lỗi trong dịch vụ bên ngoài", next: "dich-vu" },
          ],
        },
        "tinh-toan": {
          text: "Nhóm tính toán là chỗ dễ nghĩ tới nhất. Bạn giảm cấu hình nhưng chi phí mỗi người dùng của nhóm này vốn không tăng, nên hầu như chẳng tiết kiệm được gì.",
          choices: [
            { label: "Quay lại chia chi phí cho người dùng", next: "chia" },
            { label: "Cắt thêm máy để đủ chỉ tiêu", next: "ket-sai-cho" },
          ],
        },
        cho: {
          text: "Một tháng trôi qua. Hệ thống giám sát mới đẹp nhưng vẫn chỉ vẽ một đường tổng đi lên, và hạn của ban giám đốc đã qua.",
          choices: [
            { label: "Dùng ngay số liệu có sẵn để chia", next: "chia" },
            { label: "Trình đường tổng kèm kế hoạch chung chung", next: "ket-sai-cho" },
          ],
        },
        "luu-tru": {
          text: "Bảng nhật ký lớn nhất giữ dữ liệu từ ngày hệ thống ra đời, chưa từng có chính sách xoá. Bạn đề xuất thời hạn giữ dữ liệu và đưa dữ liệu lạnh sang kho rẻ, rồi rà truyền dữ liệu giữa các dịch vụ bị chia nhỏ.",
          ending: "good",
        },
        "dich-vu": {
          text: "Dịch vụ bên ngoài tăng theo hợp đồng và không có gì bất thường. Bạn mất cả tuần đàm phán giá mà hoá đơn lưu trữ vẫn tiếp tục phình ra mỗi tháng.",
          ending: "bad",
        },
        "ket-sai-cho": {
          text: "Kế hoạch cắt sai chỗ. Chi phí không giảm, hiệu năng giảm, và quý sau chi phí lưu trữ vượt tính toán mà không ai thấy vì vẫn chỉ nhìn tổng.",
          ending: "bad",
        },
      },
    },
  ],

  "case-tong-chi-phi-so-huu": [
    {
      type: "scenario",
      title: "Tự dựng cơ sở dữ liệu hay dùng dịch vụ quản lý sẵn",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội cần một cơ sở dữ liệu mới. Bảng giá: tự dựng trên máy thuê tốn 40 triệu mỗi tháng, dịch vụ quản lý sẵn tốn 70 triệu (số minh hoạ). Một đồng nghiệp nói tự dựng rẻ hơn gần một nửa nên chọn luôn.",
          choices: [
            { label: "Ước số giờ vận hành mỗi tháng và quy ra tiền", next: "uoc-cong" },
            { label: "Chọn tự dựng vì hoá đơn thấp hơn rõ", next: "tu-dung" },
            { label: "Chọn dịch vụ quản lý vì cho đỡ phiền", next: "quan-ly" },
          ],
        },
        "uoc-cong": {
          text: "Đội ước tự dựng cần khoảng 60 giờ vận hành mỗi tháng (vá lỗi, nâng cấp, trực đêm), giá mỗi giờ công 500 nghìn, tức 30 triệu. Bạn cần tính thêm vài khoản.",
          choices: [
            { label: "Trừ phần hạ tầng đã có dùng lại được", next: "dung-lai" },
            { label: "Bỏ qua phần dùng lại cho bảng đơn giản", next: "don-gian" },
          ],
        },
        "tu-dung": {
          text: "Ba tháng sau, kỹ sư giỏi nhất của đội đã dành một phần ba thời gian cho vá lỗi và trực sự cố, và tính năng quý này trễ hẹn.",
          choices: [
            { label: "Quay lại tính công vận hành vào bảng so", next: "uoc-cong" },
            { label: "Tiếp tục vì đã lỡ dựng xong", next: "ket-an-phi" },
          ],
        },
        "quan-ly": {
          text: "Bạn chọn dịch vụ quản lý mà không cần so tiếp. Nhưng chưa ai kiểm tra liệu phần dư công suất của cụm đang chạy có thể phục vụ nhu cầu này gần như miễn phí hay không.",
          choices: [
            { label: "Tính lại cả hai phương án đầy đủ ba phần", next: "uoc-cong" },
            { label: "Giữ quyết định, ký hợp đồng ba năm", next: "ket-an-phi" },
          ],
        },
        "dung-lai": {
          text: "Cụm hiện có đang dư năng lực, tính được 20 triệu giá trị dùng lại. Tự dựng còn 40 + 30 - 20 = 50 triệu, dịch vụ quản lý 70 triệu vẫn đắt hơn. Bạn ghi giả định giờ vận hành và hẹn đối chiếu sau sáu tháng, tính cho ba năm chứ không cho một tháng.",
          ending: "good",
        },
        "don-gian": {
          text: "Tự dựng thành 40 + 30 = 70 triệu, ngang dịch vụ quản lý. Bạn chọn dịch vụ quản lý và bỏ phí một cụm đang chạy dư năng lực mà vẫn trả tiền hằng tháng.",
          ending: "bad",
        },
        "ket-an-phi": {
          text: "Phương án được chọn thua ở một khoản mà bảng so sánh ban đầu không có. Sáu tháng sau chi phí thật lệch khá xa dự tính, và chuyển đổi lại tốn thêm nhiều tháng.",
          ending: "bad",
        },
      },
    },
  ],

  "case-tinh-phi-ha-tang-noi-bo": [
    {
      type: "scenario",
      title: "Cuộc họp tháng nào cũng than chi phí hạ tầng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Công ty có một hoá đơn hạ tầng duy nhất. Tháng nào giám đốc cũng nhắc chi phí tăng, nhưng không đội nào thay đổi gì. Bạn được giao thử một cơ chế để các đội thấy phần của mình.",
          choices: [
            { label: "Gắn nhãn tài nguyên theo đội trước đã", next: "nhan" },
            { label: "Gửi cảnh báo toàn công ty nhắc tiết kiệm", next: "nhac" },
            { label: "Chia hoá đơn đều cho các đội cho nhanh", next: "chia-deu" },
          ],
        },
        nhan: {
          text: "Sau hai tuần, 85% tài nguyên đã có nhãn. Cụm dùng chung và khoản dư còn lại không quy về đội nào được. Bạn cần quyết định cách chia.",
          choices: [
            { label: "Chia cụm dùng chung theo mức dùng đo được", next: "do" },
            { label: "Rải khoản dư đều cho đủ tổng hoá đơn", next: "rai-deu" },
          ],
        },
        nhac: {
          text: "Cảnh báo được đọc rồi quên. Mỗi đội vẫn nhận trọn lợi ích khi tạo thêm máy thử nghiệm còn chi phí chia cho cả công ty, nên không ai đổi hành vi.",
          choices: [
            { label: "Chuyển sang gắn nhãn tài nguyên theo đội", next: "nhan" },
            { label: "Gửi thêm một cảnh báo mạnh giọng hơn", next: "ket-chet" },
          ],
        },
        "chia-deu": {
          text: "Đội dùng ít bị tính cùng mức với đội dùng nhiều. Đội dùng ít thấy bất công, đội dùng nhiều vẫn không có lý do tiết kiệm.",
          choices: [
            { label: "Làm lại, bắt đầu từ gắn nhãn", next: "nhan" },
            { label: "Giữ nguyên và giải thích rằng đây là công bằng", next: "ket-chet" },
          ],
        },
        do: {
          text: "Bạn công bố cách đo cùng con số, ghi rõ phần dư không quy được vào một dòng riêng, và gửi một trang tóm tắt xu hướng ba tháng cho từng đội. Hai tháng sau các đội tự tắt môi trường thử nghiệm không dùng, và bạn đo thành công bằng hành vi các đội chứ không bằng tổng hoá đơn.",
          ending: "good",
        },
        "rai-deu": {
          text: "Một đội thấy con số của mình có phần không phải của họ, cãi không có chỗ nào để cãi vì cách đo không được công bố. Họ phủ nhận cả bảng, và cơ chế mất uy tín từ tháng đầu.",
          ending: "bad",
        },
        "ket-chet": {
          text: "Ba tháng sau hoá đơn vẫn tăng, cuộc họp vẫn lặp lại, và thông tin vẫn không đi cùng quyền quyết định. Cơ chế bị bỏ.",
          ending: "bad",
        },
      },
    },
  ],

  "ty-le-no-ky-thuat": [
    {
      type: "scenario",
      title: "Đội nói còn 300 việc nợ, bao lâu thì dọn xong",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Một đội trình bày: 300 hạng mục nợ kỹ thuật đã ghi lại, và họ hứa dành 20% thời gian mỗi quý để dọn. Quý trước thực tế đội dọn được 25 hạng mục (số minh hoạ). Sếp muốn biết tình hình ổn hay không.",
          choices: [
            { label: "Chia 300 cho mức dọn thật 25 mỗi quý", next: "chia" },
            { label: "Chia theo 20% hứa hẹn rồi tính", next: "danh-nghia" },
            { label: "Báo rằng con số 300 quá lớn và đáng báo động", next: "bao-dong" },
          ],
        },
        chia: {
          text: "300 chia 25 bằng 12 quý, tức ba năm, trên ngưỡng 4 quý. Đội cần chọn hướng.",
          choices: [
            { label: "Xem hạn chót của từng khoản trước khi dọn", next: "han-chot" },
            { label: "Dọn theo thứ tự dễ làm trước", next: "de-truoc" },
          ],
        },
        "danh-nghia": {
          text: "Theo tỷ lệ hứa hẹn, đội dọn được nhiều hơn nên bạn tính ra khoảng 6 quý. Nghe ổn hơn thực tế nhiều, và sếp chưa cần lo.",
          choices: [
            { label: "Kiểm lại với số liệu quý vừa rồi", next: "chia" },
            { label: "Báo sếp là tình hình dưới kiểm soát", next: "ket-lac-quan" },
          ],
        },
        "bao-dong": {
          text: "Sếp hỏi ngay: thế phải làm gì và bao lâu. Con số tuyệt đối không trả lời được câu nào.",
          choices: [
            { label: "Đổi cách trình bày sang số quý cần dọn", next: "chia" },
            { label: "Xin thêm người mà không có căn cứ", next: "ket-lac-quan" },
          ],
        },
        "han-chot": {
          text: "Bạn phát hiện 40 hạng mục là thư viện hết hỗ trợ trong hai quý tới. Bạn xếp chúng lên đầu, và báo sếp tỷ lệ cùng xu hướng ba quý để theo dõi tiến triển, không chỉ một con số của một quý.",
          ending: "good",
        },
        "de-truoc": {
          text: "Đội dọn xong 25 việc nhẹ nhất. Hạn chót của thư viện hết hỗ trợ ập tới giữa quý sau, và cả đội phải bỏ mọi việc để chữa cháy.",
          ending: "bad",
        },
        "ket-lac-quan": {
          text: "Một quý cao điểm đến, đội dọn được ít hơn nhiều so với con số danh nghĩa. Nợ vượt tầm kiểm soát trước khi ai nhận ra.",
          ending: "bad",
        },
      },
    },
  ],

  "case-tach-do-tre-thanh-phan": [
    {
      type: "scenario",
      title: "Endpoint này chậm",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Khách phản ánh trang danh sách đơn hàng mất gần 2 giây. Trước khi sửa gì, bạn cần biết thời gian đi đâu. Đồng nghiệp đề xuất thêm bộ nhớ đệm khắp nơi, người khác muốn viết lại cả dịch vụ.",
          choices: [
            { label: "Tách thời gian request thành từng chặng", next: "tach" },
            { label: "Viết lại dịch vụ bằng ngôn ngữ nhanh hơn", next: "viet-lai" },
            { label: "Thêm bộ nhớ đệm ở mọi tầng cho chắc", next: "dem" },
          ],
        },
        tach: {
          text: "Phân tách theo từng chặng: truy vấn cơ sở dữ liệu chiếm 1,4 giây, tuần tự hoá 0,2 giây, mạng 0,2 giây, còn lại 0,1 giây (số minh hoạ). Bạn cần chọn cách đo.",
          choices: [
            { label: "Lấy phân vị 95 trên dữ liệu gần thật", next: "p95" },
            { label: "Lấy giá trị trung bình trên máy phát triển", next: "may-dev" },
          ],
        },
        "viet-lai": {
          text: "Sau hai tuần viết lại, tuần tự hoá nhanh gấp ba nhưng chỉ chiếm 10% tổng thời gian. Endpoint vẫn chậm gần như cũ.",
          choices: [
            { label: "Quay lại đo từng chặng", next: "tach" },
            { label: "Viết lại thêm tầng truy cập dữ liệu", next: "ket-sai-huong" },
          ],
        },
        dem: {
          text: "Bộ nhớ đệm ở tầng giao diện không giúp vì mỗi người dùng một dữ liệu khác nhau. Bạn thêm độ phức tạp mà thời gian vẫn không đổi.",
          choices: [
            { label: "Gỡ bớt và đo từng chặng để biết", next: "tach" },
            { label: "Thêm tầng đệm nữa", next: "ket-sai-huong" },
          ],
        },
        p95: {
          text: "Phân vị 95 cho thấy chặng truy vấn còn tệ hơn trung bình: thiếu chỉ mục khi bảng lớn. Sau khi thêm chỉ mục, thời gian giảm còn 0,6 giây. Bạn đo lại, ghi mốc trước và sau, và dừng khi chặng lớn nhất không còn áp đảo.",
          ending: "good",
        },
        "may-dev": {
          text: "Máy phát triển có ít dữ liệu và không có độ trễ mạng thật, trung bình trông đẹp. Bạn kết luận không có vấn đề, trong khi người dùng ở giờ cao điểm vẫn chờ gần 2 giây.",
          ending: "bad",
        },
        "ket-sai-huong": {
          text: "Hai tuần nữa trôi qua với những hướng nghe rất hợp lý nhưng không dẫn tới đâu. Chặng chiếm bảy phần mười thời gian vẫn chưa ai chạm vào.",
          ending: "bad",
        },
      },
    },
  ],

  "slo-cam-ket-do-tin-cay": [
    {
      type: "scenario",
      title: "Uptime tháng nào cũng đẹp nhưng SLO có ổn không",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Trang trạng thái công bố SLO 99,95%. Uptime mấy tháng gần đây đều trên 99,9%. Nhưng nhịp phát hành đã tăng gấp đôi, và ngân sách lỗi của tháng vừa rồi bị tiêu hết trước ngày 20 (số minh hoạ). Quản lý hỏi có cần đổi gì không.",
          choices: [
            { label: "Xem ngân sách lỗi còn lại ở đầu mỗi kỳ", next: "ngan-sach" },
            { label: "Trả lời rằng uptime tháng nào cũng đẹp", next: "uptime" },
            { label: "Đề nghị dừng phát hành cho tới hết quý", next: "dung" },
          ],
        },
        "ngan-sach": {
          text: "Ba kỳ liền ngân sách bị tiêu trên 100% mà con số công bố không đổi. Một sự cố bốn mươi phút chia cho ba mươi ngày vẫn ra con số dễ nhìn, nhưng tổng đã vượt cam kết.",
          choices: [
            { label: "Điều chỉnh SLO hoặc nâng cấp độ tin cậy thật", next: "dieu-chinh" },
            { label: "Đóng từng vi phạm bằng một cam kết mới", next: "cam-ket-moi" },
          ],
        },
        uptime: {
          text: "Quản lý yên tâm. Tháng sau sự cố lớn tiêu hết ngân sách trong hai ngày đầu, nhưng không ai có quyền dừng phát hành vì chưa có ai theo dõi nó.",
          choices: [
            { label: "Kiểm lại ngân sách lỗi còn lại", next: "ngan-sach" },
            { label: "Tiếp tục báo cáo uptime như cũ", next: "ket-vo-nghia" },
          ],
        },
        dung: {
          text: "Dừng phát hành mà không có căn cứ bằng số liệu khiến các đội phản đối, và quản lý hỏi lại dựa vào đâu để đề nghị.",
          choices: [
            { label: "Quay lại xem ngân sách lỗi để có căn cứ", next: "ngan-sach" },
            { label: "Duy trì đề nghị bằng cảm tính", next: "ket-vo-nghia" },
          ],
        },
        "dieu-chinh": {
          text: "Bạn đề xuất hạ SLO về mức đỡ nổi (hoặc tăng đầu tư độ tin cậy) và đặt quy tắc: ngân sách lỗi hết thì dừng phát hành mà không phải tranh cãi. Giữ một con số thật đỡ được còn tốt hơn giữ một con số đẹp trên giấy.",
          ending: "good",
        },
        "cam-ket-moi": {
          text: "Mỗi lần vi phạm lại sinh thêm một cam kết mới mà hệ thống không đổi gì. Mọi sự cố bình thường thành một vi phạm hợp đồng, và công cụ dừng phát hành mất tác dụng.",
          ending: "bad",
        },
        "ket-vo-nghia": {
          text: "SLO vẫn là con số đẹp trên trang trạng thái nhưng không ai tin. Khách hàng nhận ra khoảng cách giữa cam kết và trải nghiệm thực.",
          ending: "bad",
        },
      },
    },
  ],

  "ton-dong-cong-viec-vong-quay-va-so-ngay-ton": [
    {
      type: "scenario",
      title: "Hàng đợi yêu cầu của đội nền tảng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội nền tảng nhận yêu cầu từ các đội khác. Hiện có 120 hạng mục chờ, đội xử lý khoảng 12 mỗi tuần (số minh hoạ). Các đội than chờ lâu, còn trưởng nhóm khoe rằng số lượng tồn đã giảm từ 150 xuống 120.",
          choices: [
            { label: "Tính số ngày tồn bằng tồn đọng chia tốc độ ra", next: "ngay-ton" },
            { label: "Ăn mừng vì số lượng tồn đang giảm", next: "an-mung" },
            { label: "Xử lý nhanh những yêu cầu dễ nhất để giảm số", next: "de-nhat" },
          ],
        },
        "ngay-ton": {
          text: "120 chia 12 là 10 tuần chờ. Đó là câu trả lời cho người yêu cầu hỏi bao giờ tới lượt. Bạn cần nhìn thêm một chỉ số.",
          choices: [
            { label: "Xem tuổi của hạng mục cũ nhất", next: "cu-nhat" },
            { label: "Chỉ báo cáo số lượng hoàn thành trong tuần", next: "ket-mu-mau" },
          ],
        },
        "an-mung": {
          text: "Số lượng giảm nhưng có thể vì đội nhận ít yêu cầu mới hơn, không phải vì làm nhanh hơn. Người yêu cầu vẫn không biết bao giờ tới lượt mình.",
          choices: [
            { label: "Quay lại tính số ngày tồn", next: "ngay-ton" },
            { label: "Công bố con số số lượng cho toàn công ty", next: "ket-mu-mau" },
          ],
        },
        "de-nhat": {
          text: "Đội lấy những yêu cầu mới và dễ trước. Số lượng giảm nhanh, nhưng các yêu cầu khó và cũ nằm đó ngày một lâu.",
          choices: [
            { label: "Xem tuổi hạng mục cũ nhất", next: "cu-nhat" },
            { label: "Tiếp tục làm theo kiểu này", next: "ket-mu-mau" },
          ],
        },
        "cu-nhat": {
          text: "Hạng mục cũ nhất đã chờ 9 tháng, trong khi trung bình chỉ 10 tuần. Bạn đặt quy tắc một phần công suất mỗi tuần dành cho hạng mục cũ, và báo cáo cả số ngày tồn lẫn tuổi cũ nhất. Người yêu cầu có thời gian chờ thực.",
          ending: "good",
        },
        "ket-mu-mau": {
          text: "Con số số lượng đẹp nhưng người yêu cầu vẫn chờ nhiều tháng. Họ bắt đầu bỏ qua đội nền tảng và tự dựng giải pháp riêng.",
          ending: "bad",
        },
      },
    },
  ],

  "case-dat-truoc-hay-tra-theo-dung": [
    {
      type: "scenario",
      title: "Nhà cung cấp đề nghị giảm giá nếu cam kết ba năm",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Nhà cung cấp đề nghị giảm 40% nếu cam kết dùng 100 máy trong ba năm. Hiện tải đang ở 100 máy vào mùa cao điểm, còn quanh năm thấp nhất khoảng 55 máy (số minh hoạ). Đội kiến trúc cũng đang tính chuyển một dịch vụ sang cách chạy nhẹ hơn.",
          choices: [
            { label: "Vẽ tải mười hai tháng và tìm mức thấp nhất", next: "ve-tai" },
            { label: "Cam kết 100 máy để hưởng mức giảm tối đa", next: "tat-ca" },
            { label: "Không cam kết gì và trả giá theo dùng", next: "khong" },
          ],
        },
        "ve-tai": {
          text: "Phần dưới đường 55 máy tồn tại quanh năm. Phần trên là đỉnh theo mùa. Bạn cần quyết định mức cam kết.",
          choices: [
            { label: "Cam kết thấp hơn mức nghĩ, rồi tăng ở kỳ sau", next: "thap" },
            { label: "Cam kết 80 máy, nằm giữa đỉnh và nền", next: "giua" },
          ],
        },
        "tat-ca": {
          text: "Phần đỉnh chỉ tồn tại ba tháng, và dịch vụ sắp chuyển kiến trúc sẽ bỏ đi khoảng 30 máy tải. Bạn đang tính cam kết cho tải có thể biến mất.",
          choices: [
            { label: "Rà lại theo dữ liệu tải mười hai tháng", next: "ve-tai" },
            { label: "Ký luôn vì mức giảm hấp dẫn", next: "ket-tra-thua" },
          ],
        },
        khong: {
          text: "Bạn trả toàn bộ theo giá lẻ. Hoá đơn cao hơn nhiều so với cần thiết cho phần nền quanh năm mà chắc chắn còn nguyên sau một năm nữa.",
          choices: [
            { label: "Xem lại phần tải nền để cam kết", next: "ve-tai" },
            { label: "Giữ nguyên vì thích linh hoạt", next: "ket-tra-thua" },
          ],
        },
        thap: {
          text: "Bạn cam kết 40 máy, chắc chắn dùng hết. Bạn ghi lại giả định lúc ký, rà lại mỗi kỳ để so mức cam kết với mức dùng thật, và tăng cam kết khi có dữ liệu. Phần đỉnh trả theo dùng.",
          ending: "good",
        },
        giua: {
          text: "Ngoài mùa cao điểm tải chỉ ở khoảng 55 máy, và 25 máy cam kết thừa vẫn tính tiền suốt chín tháng. Mức giảm giá không bù được phần trả cho năng lực không dùng.",
          ending: "bad",
        },
        "ket-tra-thua": {
          text: "Một năm sau kiến trúc mới chạy, tải rơi xuống dưới mức cam kết. Phần thừa vẫn tính tiền hai năm nữa và không còn quyền dừng.",
          ending: "bad",
        },
      },
    },
  ],

  "doi-co-20-phan-tram-nang-luc-du": [
    {
      type: "scenario",
      title: "Quý này đội dư 20% năng lực",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Dự án lớn vừa xong, kế hoạch quý tới còn trống khoảng 20% năng lực đội. Có ba đích: tính năng mới, trả nợ kỹ thuật, gia cố độ tin cậy. Ngân sách lỗi hai kỳ gần đây bị tiêu gần hết (số minh hoạ), còn nợ kỹ thuật ở mức chấp nhận được.",
          choices: [
            { label: "Ghi phần dư thành việc cụ thể theo lợi ích biên", next: "uu-tien" },
            { label: "Chưa gán gì, cứ để đội linh hoạt", next: "de-do" },
            { label: "Chia đều ba đích cho công bằng", next: "chia-deu" },
          ],
        },
        "uu-tien": {
          text: "Bạn xếp độ tin cậy lên trước vì ngân sách lỗi đang cạn. Bạn cần quyết định quy mô.",
          choices: [
            { label: "Dồn phần lớn vào độ tin cậy, giữ nhỏ ở hai đích còn lại", next: "gia-co" },
            { label: "Dồn toàn bộ vào tính năng vì dễ thấy kết quả", next: "tinh-nang" },
          ],
        },
        "de-do": {
          text: "Tuần đầu có một yêu cầu gấp, tuần hai có hai. Đến tuần sáu, phần dư đã tan hết vào việc đến trước mà không ghi nhận.",
          choices: [
            { label: "Gán lại phần dư thành việc cụ thể", next: "uu-tien" },
            { label: "Để nguyên cách quản lý cũ", next: "ket-tan" },
          ],
        },
        "chia-deu": {
          text: "Mỗi đích được một phần ba, và không đích nào được làm tới nơi. Độ tin cậy vẫn chưa đủ sâu để giảm sự cố, tính năng chỉ ra một nửa.",
          choices: [
            { label: "Xếp lại theo lợi ích biên", next: "uu-tien" },
            { label: "Giữ nguyên và chờ quý sau", next: "ket-tan" },
          ],
        },
        "gia-co": {
          text: "Đội chạy rà soát và gia cố những điểm gây tiêu ngân sách lỗi. Quý sau ngân sách lỗi thoải mái hơn, và đội xem lại thứ tự ưu tiên vì lợi ích biên đã đổi.",
          ending: "good",
        },
        "tinh-nang": {
          text: "Tính năng ra đúng hạn, nhưng một sự cố lớn tuần cuối quý làm tiêu sạch ngân sách lỗi, và đội phải vừa sửa vừa xử lý hậu quả cho khách hàng. Gia cố sau sự cố luôn đắt hơn.",
          ending: "bad",
        },
        "ket-tan": {
          text: "Cuối quý không ai chỉ ra được phần dư đã đi đâu. Nợ không giảm, độ tin cậy không tăng, và đội vẫn kiệt sức vì việc gấp.",
          ending: "bad",
        },
      },
    },
  ],

  "case-bon-mo-hinh-trien-khai": [
    {
      type: "scenario",
      title: "Chọn nơi triển khai cho ứng dụng thanh toán",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội cần triển khai ứng dụng mới. Hai yêu cầu của pháp chế: dữ liệu khách hàng phải nằm trong nước, và đội không có ai trực đêm. Bốn mô hình đang được bàn: tự dựng tại chỗ, đám mây công cộng, lai, biên.",
          choices: [
            { label: "Liệt kê ràng buộc cứng rồi loại mô hình vi phạm", next: "rang-buoc" },
            { label: "So bảng giá bốn mô hình rồi chọn rẻ nhất", next: "bang-gia" },
            { label: "Chọn đám mây công cộng vì khởi động nhanh nhất", next: "may-nhanh" },
          ],
        },
        "rang-buoc": {
          text: "Dữ liệu trong nước loại phương án đặt ở vùng ngoài nước. Không có người trực đêm làm phương án tự dựng toàn bộ khó đỡ nổi. Còn lại hai mô hình để so.",
          choices: [
            { label: "Dùng lai: dữ liệu trong nước, phần còn lại thuê ngoài", next: "lai" },
            { label: "Tự dựng toàn bộ tại chỗ", next: "tu-dung" },
          ],
        },
        "bang-gia": {
          text: "Phương án rẻ nhất đặt dữ liệu ở vùng ngoài nước. Bạn chọn xong mới được pháp chế báo là vi phạm điều kiện không thể bỏ qua.",
          choices: [
            { label: "Quay lại liệt kê ràng buộc cứng", next: "rang-buoc" },
            { label: "Xin pháp chế châm chước", next: "ket-vi-pham" },
          ],
        },
        "may-nhanh": {
          text: "Nhà cung cấp có vùng trong nước nhưng một số dịch vụ bạn định dùng chỉ chạy ở vùng ngoài nước. Bạn chưa kiểm tra điều đó.",
          choices: [
            { label: "Kiểm ràng buộc trước khi tiếp tục", next: "rang-buoc" },
            { label: "Triển khai trước, kiểm sau", next: "ket-vi-pham" },
          ],
        },
        lai: {
          text: "Dữ liệu nhạy cảm nằm ở cụm trong nước, phần còn lại ở đám mây công cộng. Bạn chấp nhận độ phức tạp của việc nối hai nơi và giao cho đội một người phụ trách việc nối. Cả hai điều kiện được thoả và cuộc so sánh chỉ còn hai ứng viên.",
          ending: "good",
        },
        "tu-dung": {
          text: "Đội phải mua máy, thuê chỗ đặt và lo trực đêm. Không có ai trực, sự cố ban đêm kéo dài hàng giờ, và vốn ban đầu vượt xa dự tính.",
          ending: "bad",
        },
        "ket-vi-pham": {
          text: "Đến lúc kiểm toán, ứng dụng bị yêu cầu dừng vì dữ liệu nằm sai chỗ. Đội phải chuyển toàn bộ sang chỗ khác, mất nhiều tuần.",
          ending: "bad",
        },
      },
    },
  ],

  "case-no-ky-thuat-tich-luy": [
    {
      type: "scenario",
      title: "Dọn mã nào trước khi làm tính năng thanh toán",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Danh sách nợ kỹ thuật có 80 mục. Quý này đội sắp làm tính năng thanh toán trả góp, mọi thay đổi đi qua một module định giá viết ẩu từ ba năm trước. Có một thư mục mã cũ rất xấu nhưng nằm im hai năm, không ai đụng tới.",
          choices: [
            { label: "Dọn đoạn nằm trên đường đi của tính năng mới", next: "duong-di" },
            { label: "Dọn đoạn xấu nhất trước cho sạch mắt", next: "xau-nhat" },
            { label: "Dừng hết tính năng để dọn toàn bộ 80 mục", next: "don-het" },
          ],
        },
        "duong-di": {
          text: "Bạn sửa module định giá cùng lúc với tính năng. Còn một mục khác nằm cạnh đường đi nhưng phải tốn thêm vài ngày.",
          choices: [
            { label: "Ghi lại mục không dọn kèm lý do", next: "ghi" },
            { label: "Bỏ qua mà không ghi gì", next: "im-lang" },
          ],
        },
        "xau-nhat": {
          text: "Thư mục xấu nhất nằm im không lấy của ai thứ gì. Bạn mất hai tuần, mã sạch hơn nhưng tính năng thanh toán vẫn phải đi qua module định giá cũ.",
          choices: [
            { label: "Chuyển sang dọn phần nằm trên đường đi", next: "duong-di" },
            { label: "Tiếp tục dọn các mục xấu theo thứ tự", next: "ket-lai-suat" },
          ],
        },
        "don-het": {
          text: "Quý trôi qua mà tính năng thanh toán chưa ra, sếp mất kiên nhẫn. Danh sách vẫn dài thêm vì tính năng khác vẫn đẻ ra nợ mới.",
          choices: [
            { label: "Thu hẹp lại, chỉ dọn phần đường đi", next: "duong-di" },
            { label: "Tiếp tục đến hết quý", next: "ket-lai-suat" },
          ],
        },
        ghi: {
          text: "Tính năng ra đúng hạn và module định giá giờ dễ sửa. Mục chưa dọn có ghi chú rõ lý do và điều kiện nên dọn, nên người sau không phải đoán. Nợ chỉ đắt khi có lãi, và bạn trả đúng khoản đang tính lãi.",
          ending: "good",
        },
        "im-lang": {
          text: "Quý sau một kỹ sư mới đụng vào đúng chỗ đó và mất hai ngày đoán ý đồ. Khoản nợ nằm trên đường đi và lãi của nó lặp lại mỗi lần ai đó đi qua.",
          ending: "bad",
        },
        "ket-lai-suat": {
          text: "Đội dọn nhiều nhưng sai chỗ. Mỗi tính năng mới vẫn phải đi qua đoạn mã đắt lãi nhất, và danh sách nợ thật sự không ngắn đi.",
          ending: "bad",
        },
      },
    },
  ],

  "case-lap-trinh-quy-ve-may-y-tuong": [
    {
      type: "scenario",
      title: "Học ngôn ngữ thứ hai trong hai tuần",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn đã quen một ngôn ngữ, giờ công ty chuyển sang một ngôn ngữ khác và cho hai tuần để làm việc được. Danh sách framework, thư viện và cú pháp mới dài vô tận, bạn thấy hoảng vì chạy không kịp.",
          choices: [
            { label: "Hỏi ngôn ngữ mới xử lý bốn nhóm ý tưởng ra sao", next: "bon-nhom" },
            { label: "Đọc hết tài liệu từ trang đầu tiên", next: "doc-het" },
            { label: "Chép ví dụ trên mạng cho tới khi chạy được", next: "chep-mau" },
          ],
        },
        "bon-nhom": {
          text: "Bạn lập bảng: kiểu dữ liệu và cách sao chép, luồng điều khiển, trạng thái nằm ở đâu, lỗi truyền đi bằng cách nào. Bạn cần quyết định bắt đầu từ đâu.",
          choices: [
            { label: "Viết thử đoạn nhỏ cho mỗi nhóm để so với ngôn ngữ cũ", next: "viet-thu" },
            { label: "Học trước các framework phổ biến nhất", next: "framework" },
          ],
        },
        "doc-het": {
          text: "Sau ba ngày, bạn nhớ được nhiều cú pháp nhưng chưa viết được gì dùng được. Khi gặp lỗi lạ, bạn vẫn không biết hỏi gì.",
          choices: [
            { label: "Chuyển sang xem nó xử lý bốn nhóm ý tưởng", next: "bon-nhom" },
            { label: "Đọc tiếp các chương còn lại", next: "ket-chay-theo" },
          ],
        },
        "chep-mau": {
          text: "Mã chạy được nhưng bạn không hiểu vì sao. Một lỗi do sao chép tham chiếu thay vì giá trị làm dữ liệu bị đổi ở chỗ không ngờ tới.",
          choices: [
            { label: "Dừng lại, tìm hiểu cách nó biểu diễn dữ liệu", next: "bon-nhom" },
            { label: "Chép thêm ví dụ khác để lách lỗi", next: "ket-chay-theo" },
          ],
        },
        "viet-thu": {
          text: "Mỗi đoạn thử cho thấy chỗ giống và khác với ngôn ngữ cũ, như kiểu của giá trị rỗng hay cách ném và bắt lỗi. Bạn viết được việc thật sau năm ngày, vì ngôn ngữ mới chỉ chọn cách diễn đạt khác cho bốn nhóm cũ, không thêm nhóm thứ năm.",
          ending: "good",
        },
        framework: {
          text: "Bạn dùng framework theo hướng dẫn nhưng không hiểu trạng thái được giữ ở đâu. Khi framework đổi phiên bản, bạn phải học lại, và lỗi vẫn khó đọc.",
          ending: "bad",
        },
        "ket-chay-theo": {
          text: "Hết hai tuần bạn vẫn có cảm giác chạy không kịp, và danh sách cần học vẫn dài thêm mỗi tuần.",
          ending: "bad",
        },
      },
    },
  ],
};
