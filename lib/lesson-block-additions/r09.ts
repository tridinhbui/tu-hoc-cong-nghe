import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r09. Một người viết cho một tệp.
export const R09_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "bang-bam-hoat-dong-the-nao": [
    {
      type: "scenario",
      title: "Bảng tra phiên đăng nhập bỗng chậm lại",
      start: "start",
      nodes: {
        start: {
          text: "Dịch vụ của bạn lưu phiên đăng nhập trong một bảng băm tự cài. Tuần nào cũng ổn, rồi một đêm thời gian tra phiên tăng vọt, dù số phiên không hề tăng. Nhật ký cho thấy hàng nghìn yêu cầu có mã phiên rất lạ gửi tới. Bạn nghi điều gì trước?",
          choices: [
            { label: "Bảng đầy quá, cần cấp thêm bộ nhớ cho máy chủ", next: "memory" },
            { label: "Nhiều khoá bị ép băm về cùng một vị trí, bảng thành danh sách", next: "collide" },
            { label: "Hàm băm bị lỗi nên cho ra số ngẫu nhiên mỗi lần gọi", next: "random" },
          ],
        },
        memory: {
          text: "Bạn tăng bộ nhớ gấp đôi, đêm sau vẫn chậm y như cũ. Bộ nhớ không phải nút thắt: vài vị trí trong bảng chứa những danh sách dài, và mỗi lần tra phải duyệt hết danh sách đó dù bảng còn rất nhiều ô trống.",
          ending: "bad",
        },
        random: {
          text: "Nếu hàm băm cho số khác nhau mỗi lần thì không tra lại được phiên nào, người dùng sẽ bị đăng xuất hàng loạt. Nhưng người dùng thật vẫn đăng nhập bình thường, chỉ chậm. Giả thuyết này không khớp với triệu chứng nên bạn mất nửa ngày đọc mã không có lỗi.",
          ending: "bad",
        },
        collide: {
          text: "Đúng hướng. Có người dựng sẵn các khoá cùng rơi vào một vị trí, làm tra cứu mất dần từ gần tức thì thành duyệt tuần tự. Bạn cần chặn việc này ở gốc. Chọn cách nào?",
          choices: [
            { label: "Chặn các địa chỉ gửi nhiều mã lạ, giữ nguyên hàm băm", next: "block" },
            { label: "Trộn một giá trị ngẫu nhiên riêng của mỗi tiến trình vào hàm băm", next: "seed" },
          ],
        },
        block: {
          text: "Cuộc tấn công dừng một đêm. Tuần sau kẻ tấn công đổi địa chỉ, vì hàm băm vẫn tính trước được: ai đọc mã nguồn cũng dựng lại được bộ khoá va chạm. Bạn chữa triệu chứng chứ chưa chữa lỗ hổng.",
          ending: "bad",
        },
        seed: {
          text: "Giá trị ngẫu nhiên khác nhau mỗi lần khởi động nên không ai tính trước được vị trí của một khoá. Các khoá lạ giờ rải đều khắp bảng như khoá bình thường, và thời gian tra trở lại như cũ.",
          ending: "good",
        },
      },
    },
  ],

  "cay-va-cay-tim-kiem-nhi-phan": [
    {
      type: "scenario",
      title: "Cây tìm kiếm nhập từ bảng đã sắp sẵn",
      start: "start",
      nodes: {
        start: {
          text: "Bạn tải 100.000 mã sản phẩm, đã sắp xếp theo thứ tự tăng, vào một cây tìm kiếm nhị phân tự cài. Sau đó tra một mã mất vài giây thay vì vài micro giây. Mã tra đúng, chỉ chậm. Nguyên nhân khả dĩ nhất là gì?",
          choices: [
            { label: "Cây cài đặt sai nên so sánh nhầm hướng ở mỗi nút", next: "wrong" },
            { label: "Chèn dãy tăng dần khiến mọi nút mới đi về bên phải", next: "skew" },
            { label: "Cây có quá nhiều nút nên bộ nhớ đệm bị tràn", next: "cache" },
          ],
        },
        wrong: {
          text: "Nếu so sánh nhầm hướng thì tra sẽ trả kết quả sai chứ không chỉ chậm. Mã của bạn tìm đúng mọi giá trị, nên bạn mất thời gian soát một lỗi không tồn tại trong khi cây vẫn thành một đường thẳng.",
          ending: "bad",
        },
        cache: {
          text: "Một trăm nghìn nút vẫn nhỏ so với bộ nhớ hiện nay. Bạn tối ưu cách xếp nút trong bộ nhớ, tốc độ gần như không đổi, vì chiều cao cây mới là vấn đề: mỗi lần tra đi qua hàng chục nghìn nút.",
          ending: "bad",
        },
        skew: {
          text: "Đúng. Mỗi mã mới lớn hơn mọi mã trước nên cây thành một dây dài, chiều cao bằng số phần tử và tìm kiếm thành tuyến tính. Bạn cần khôi phục chiều cao logarit. Làm gì?",
          choices: [
            { label: "Trộn ngẫu nhiên thứ tự mã trước khi chèn, hy vọng cây cân", next: "shuffle" },
            { label: "Chuyển sang cây tự cân bằng, nó xoay lại khi cây lệch", next: "balanced" },
          ],
        },
        shuffle: {
          text: "Với dữ liệu tải một lần thì cách này chạy được, nhưng chỉ là may rủi trung bình. Lần sau dữ liệu đến theo lô đã sắp xếp từ hệ thống khác, cây lại lệch, và bạn không có bảo đảm nào cho trường hợp xấu nhất.",
          ending: "bad",
        },
        balanced: {
          text: "Cây tự cân bằng xoay lại cấu trúc khi một bên cao quá mức, nên chiều cao luôn cỡ logarit của số nút bất kể thứ tự chèn. Chèn hơi tốn thêm công, đổi lại mọi lần tra đều nhanh, kể cả với dữ liệu đã sắp sẵn.",
          ending: "good",
        },
      },
    },
  ],

  "dong-va-hang-doi-uu-tien": [
    {
      type: "scenario",
      title: "Trang xếp hạng chỉ cần mười mục đầu",
      start: "start",
      nodes: {
        start: {
          text: "Trang xếp hạng của bạn có 2 triệu bài viết với điểm số thay đổi liên tục, nhưng trang chủ chỉ hiện mười bài điểm cao nhất. Mỗi lần có bài mới bạn phải cập nhật danh sách mười bài đó. Bạn chọn cách nào?",
          choices: [
            { label: "Sắp xếp lại toàn bộ 2 triệu bài mỗi lần có bài mới", next: "sortall" },
            { label: "Giữ một đống nhỏ kích thước mười, đẩy phần tử nhỏ nhất ra khi có bài tốt hơn", next: "heap" },
            { label: "Duyệt cả 2 triệu bài để tìm mười bài cao nhất mỗi lần", next: "scan" },
          ],
        },
        sortall: {
          text: "Sắp xếp 2 triệu phần tử tốn cỡ vài chục triệu thao tác, lặp lại với mỗi bài mới. Máy chủ quá tải vào giờ cao điểm. Bạn trả tiền cho thứ tự đầy đủ của 2 triệu bài trong khi trang chỉ dùng mười.",
          ending: "bad",
        },
        scan: {
          text: "Duyệt toàn bộ mỗi lần chỉ tốn tuyến tính, tốt hơn sắp xếp, nhưng vẫn là hai triệu bước cho mỗi bài mới. Khi lượng bài tăng, độ trễ tăng đúng theo, và bạn nhìn lại cả dữ liệu cũ chưa hề thay đổi.",
          ending: "bad",
        },
        heap: {
          text: "Đống kích thước mười giữ ở gốc bài có điểm thấp nhất trong mười bài đầu. Bài mới đến thì so với gốc, và chỉ khi cao hơn mới thay gốc rồi cho chìm xuống. Mỗi bài mới tốn cỡ logarit của mười. Giờ có một yêu cầu thêm: hiển thị mười bài theo thứ tự từ cao đến thấp.",
          choices: [
            { label: "Đọc mảng của đống từ đầu đến cuối vì nó đã được sắp xếp", next: "readarray" },
            { label: "Lấy mười phần tử ra khỏi đống, rồi đảo thứ tự kết quả", next: "popall" },
          ],
        },
        readarray: {
          text: "Đống chỉ bảo đảm cha nhỏ hơn con, không bảo đảm thứ tự giữa các nhánh. Trang hiển thị mười bài lộn xộn: bài hạng bảy nằm trước bài hạng ba. Mảng của đống không phải danh sách đã sắp xếp.",
          ending: "bad",
        },
        popall: {
          text: "Lấy lần lượt phần tử nhỏ nhất ra cho dãy tăng dần, đảo lại là giảm dần. Mười lần lấy chỉ tốn cỡ mười nhân logarit mười, rất rẻ. Trang hiển thị đúng thứ tự mà không sắp xếp phần dữ liệu còn lại.",
          ending: "good",
        },
      },
    },
  ],

  "do-thi-va-cach-bieu-dien": [
    {
      type: "scenario",
      title: "Mô hình hoá tính năng theo dõi",
      start: "start",
      nodes: {
        start: {
          text: "Bạn thiết kế tính năng theo dõi cho một mạng xã hội: An theo dõi Bình không có nghĩa Bình theo dõi An. Bạn cần quyết định kiểu đồ thị trước khi viết mã. Chọn kiểu nào?",
          choices: [
            { label: "Đồ thị vô hướng, mỗi cạnh nối hai người", next: "undirected" },
            { label: "Đồ thị có hướng, cạnh đi từ người theo dõi tới người được theo dõi", next: "directed" },
            { label: "Đồ thị có trọng số, trọng số là số lần hai người tương tác", next: "weighted" },
          ],
        },
        undirected: {
          text: "Mô hình nói rằng mọi lần theo dõi đều hai chiều. Truy vấn ai đang theo dõi tôi trả về cả những người tôi theo dõi, và người nổi tiếng thấy danh sách người theo dõi chứa hàng triệu người họ chưa từng nghe tên. Sửa về sau động tới mọi chỗ dùng.",
          ending: "bad",
        },
        weighted: {
          text: "Trọng số có thể hữu ích để xếp hạng sau này, nhưng nó trả lời một câu hỏi khác. Điều bạn cần biết trước là chiều của quan hệ, mà mô hình có trọng số nhưng không hướng vẫn nói sai về thực tế ai theo dõi ai.",
          ending: "bad",
        },
        directed: {
          text: "Chiều cạnh phản ánh đúng quan hệ. Giờ tới cách lưu: mạng có một triệu người, trung bình mỗi người theo dõi khoảng trăm người khác. Bạn chọn cách lưu nào?",
          choices: [
            { label: "Ma trận kề, một ô cho mỗi cặp người", next: "matrix" },
            { label: "Danh sách kề, mỗi người giữ danh sách người họ theo dõi", next: "adj" },
          ],
        },
        matrix: {
          text: "Một triệu nhân một triệu là một nghìn tỷ ô, trong khi thực tế chỉ có khoảng một trăm triệu cạnh. Gần như toàn bộ ô là số không, bộ nhớ cạn ngay khi dựng, và bạn chưa lưu được người dùng đầu tiên.",
          ending: "bad",
        },
        adj: {
          text: "Danh sách kề chỉ lưu những cạnh có thật, cỡ một trăm triệu mục thay vì một nghìn tỷ ô. Lấy danh sách người một người theo dõi chỉ là đọc một danh sách ngắn, đúng thao tác tính năng này dùng nhiều nhất.",
          ending: "good",
        },
      },
    },
  ],

  "tap-hop-va-phep-tren-tap-hop": [
    {
      type: "scenario",
      title: "Đoạn mã đối chiếu email chạy mãi không xong",
      start: "start",
      nodes: {
        start: {
          text: "Bạn nhận lại một đoạn mã đối chiếu: với mỗi email trong danh sách mới 200.000 dòng, nó kiểm tra xem email đó có trong danh sách khách cũ cũng 200.000 dòng không, bằng cách dùng toán tử in trên danh sách. Bộ kiểm vẫn xanh nhưng chạy cả giờ. Bạn xử lý thế nào?",
          choices: [
            { label: "Chuyển danh sách khách cũ thành tập hợp rồi kiểm tra trên đó", next: "toset" },
            { label: "Chia danh sách mới thành lô nhỏ và chạy song song", next: "parallel" },
            { label: "Sắp xếp cả hai danh sách trước rồi so khớp từ đầu", next: "sortfirst" },
          ],
        },
        parallel: {
          text: "Bạn dùng thêm bốn nhân xử lý, thời gian giảm còn một phần tư, vẫn cỡ mười lăm phút. Bạn nhân tài nguyên để che một thuật toán bậc hai, và khi danh sách gấp đôi thì thời gian gấp bốn.",
          ending: "bad",
        },
        sortfirst: {
          text: "Sắp xếp rồi so khớp cũng chạy được và nhanh hơn nhiều, nhưng bạn viết thêm mã phức tạp và mất thứ tự ban đầu của danh sách mới. Tập hợp trả lời đúng câu hỏi có trong đó không mà không cần cả thứ tự.",
          ending: "bad",
        },
        toset: {
          text: "Mỗi lần kiểm tra giờ gần như tức thì thay vì duyệt 200.000 dòng, tổng thời gian từ cả giờ còn vài giây. Sếp lại hỏi: danh sách mới có email trùng nhau, và bạn cần danh sách kết quả vẫn giữ nguyên thứ tự xuất hiện ban đầu.",
          choices: [
            { label: "Ép cả danh sách mới thành tập hợp để loại trùng luôn", next: "losesorder" },
            { label: "Duyệt danh sách theo thứ tự, dùng một tập hợp phụ nhớ email đã gặp", next: "seen" },
          ],
        },
        losesorder: {
          text: "Tập hợp không bảo đảm thứ tự nên kết quả trả về lộn xộn, và hôm sau báo cáo gửi khách đổi thứ tự dòng mỗi lần chạy. Loại trùng đúng, nhưng bạn vứt thứ tự mà yêu cầu cần giữ.",
          ending: "bad",
        },
        seen: {
          text: "Danh sách vẫn được duyệt theo thứ tự, tập hợp phụ chỉ làm việc nhớ những gì đã gặp. Email trùng bị bỏ ở lần xuất hiện sau, thứ tự giữ nguyên, và mỗi bước kiểm tra vẫn tức thì.",
          ending: "good",
        },
      },
    },
  ],

  "chon-cau-truc-cho-bai-toan-that": [
    {
      type: "scenario",
      title: "Bộ nhớ đệm cho trang tra cứu sản phẩm",
      start: "start",
      nodes: {
        start: {
          text: "Bạn xây bộ nhớ đệm cho trang tra cứu sản phẩm: tra theo mã khoảng mười nghìn lần mỗi phút, thêm sản phẩm mới vài lần mỗi giờ, và thỉnh thoảng cần in toàn bộ sản phẩm theo thứ tự mã cho báo cáo. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Chọn ngay bảng băm vì ai cũng nói nó nhanh nhất", next: "hashnow" },
            { label: "Liệt kê thao tác, ước lượng tần suất từng cái, rồi mới chọn", next: "list" },
            { label: "Dùng mảng đã sắp xếp vì báo cáo cần thứ tự", next: "arraynow" },
          ],
        },
        hashnow: {
          text: "Tra theo mã rất nhanh, nhưng đến kỳ báo cáo bạn phải lấy hết khoá rồi sắp xếp từ đầu, vì bảng băm không biết giá trị nào đứng cạnh giá trị nào. Bạn chọn đúng cho thao tác chính nhưng chưa tính thao tác thứ ba.",
          ending: "bad",
        },
        arraynow: {
          text: "Báo cáo dễ viết, nhưng mười nghìn lần tra mỗi phút giờ là tìm kiếm nhị phân thay vì băm, chậm hơn rõ rệt khi số sản phẩm lớn lên. Bạn tối ưu cho thao tác hiếm nhất và chấp nhận chậm ở thao tác dùng nhiều nhất.",
          ending: "bad",
        },
        list: {
          text: "Tra là thao tác nặng nhất, thêm mới rất hiếm, và báo cáo cần thứ tự. Không cấu trúc đơn lẻ nào đẹp cả ba. Bạn cân nhắc hai hướng.",
          choices: [
            { label: "Một cây tự cân bằng, chịu tra chậm hơn bảng băm một chút", next: "tree" },
            { label: "Bảng băm cho tra cứu, thêm mảng sắp xếp lại chỉ khi in báo cáo", next: "both" },
          ],
        },
        tree: {
          text: "Cây cho cả tra cứu và thứ tự, nhưng mười nghìn lần tra mỗi phút đều trả giá logarit thay vì gần tức thì. Nó chạy được và đủ nhanh ở quy mô này, nhưng không phải lựa chọn rẻ nhất cho thao tác dùng nhiều nhất, và cũng chưa ai đo để biết có cần.",
          ending: "bad",
        },
        both: {
          text: "Tra cứu, thao tác dùng nhiều nhất, đi qua bảng băm. Việc sắp xếp chỉ xảy ra khi in báo cáo, hiếm nên đắt cũng chấp nhận được, và chèn thêm sản phẩm chỉ cần cập nhật bảng. Tổng chi phí bằng chi phí mỗi thao tác nhân số lần làm.",
          ending: "good",
        },
      },
    },
  ],

  "do-phuc-tap-va-ky-hieu-o-lon": [
    {
      type: "scenario",
      title: "Báo cáo đêm chạy từ ba phút lên ba giờ",
      start: "start",
      nodes: {
        start: {
          text: "Báo cáo chạy hằng đêm của bạn mất ba phút khi có 10.000 đơn hàng. Cuối năm có 100.000 đơn và đồng nghiệp lo nó sẽ mất ba giờ. Mã chứa hai vòng lặp lồng nhau trên danh sách đơn. Bạn nhận định thế nào?",
          choices: [
            { label: "Sẽ mất khoảng ba mươi phút, tăng theo số đơn", next: "linear" },
            { label: "Có thể mất ba giờ vì hai vòng lồng nhau thường tăng theo bình phương", next: "quad" },
            { label: "Không đoán được nếu chưa chạy thử trên máy chủ thật", next: "needrun" },
          ],
        },
        linear: {
          text: "Bạn báo sẽ tốn ba mươi phút. Đêm đó báo cáo chạy gần ba giờ và làm nghẽn cả đợt sao lưu sau nó. Gấp mười lần dữ liệu nhưng thời gian gấp một trăm lần, đúng quy luật của hai vòng lồng nhau.",
          ending: "bad",
        },
        needrun: {
          text: "Bạn chờ chạy thử, nhưng một con số đo trên một máy cho biết thời gian hôm nay, không cho biết điều gì xảy ra khi dữ liệu lớn hơn. Cuối năm vẫn đến, và bạn đưa ra cảnh báo quá muộn. Độ phức tạp trả lời được câu hỏi này mà không cần chạy.",
          ending: "bad",
        },
        quad: {
          text: "Gấp mười lần dữ liệu cho gấp một trăm lần thao tác, nên ba phút thành ba trăm phút, tức vài giờ. Bạn quyết định sửa trước khi cuối năm tới. Đọc kỹ mã, bạn thấy vòng trong chỉ để tìm khách hàng của mỗi đơn trong một danh sách. Làm gì?",
          choices: [
            { label: "Dựng sẵn một bảng tra khách hàng rồi dùng một vòng lặp duy nhất", next: "lookup" },
            { label: "Nâng cấp máy chủ lên cấu hình mạnh gấp đôi", next: "hardware" },
          ],
        },
        hardware: {
          text: "Máy mạnh gấp đôi cắt thời gian một nửa, còn ba tiếng rưỡi thành một tiếng bốn mươi lăm phút. Năm sau dữ liệu lại tăng gấp mười và thời gian lại bùng nổ. Phần cứng không bù được chênh lệch giữa hai bậc độ phức tạp.",
          ending: "bad",
        },
        lookup: {
          text: "Bảng tra biến vòng trong từ duyệt cả danh sách thành một bước tra. Thời gian tăng gần như tuyến tính theo số đơn, nên cuối năm báo cáo chạy chừng ba mươi phút thay vì ba giờ, và năm sau vẫn kiểm soát được.",
          ending: "good",
        },
      },
    },
  ],

  "tim-kiem-tuyen-tinh-va-nhi-phan": [
    {
      type: "scenario",
      title: "Tìm nhị phân trả về sản phẩm sai",
      start: "start",
      nodes: {
        start: {
          text: "Đồng nghiệp viết hàm tìm nhị phân theo giá để tìm sản phẩm trong mảng 500.000 mục. Hàm chạy tức thì nhưng thỉnh thoảng báo không tìm thấy một sản phẩm chắc chắn có trong kho. Mảng được sắp xếp theo tên sản phẩm, còn hàm tìm theo giá. Bạn nghi điều gì trước?",
          choices: [
            { label: "Mảng không sắp xếp theo đúng tiêu chí mà hàm đang tìm", next: "criterion" },
            { label: "Phép chia đôi bị làm tròn sai khiến bỏ sót phần tử giữa", next: "rounding" },
            { label: "Mảng quá lớn nên hàm tìm nhị phân mất độ chính xác", next: "toobig" },
          ],
        },
        rounding: {
          text: "Làm tròn chia đôi sai sẽ làm hụt một phần tử ở rìa, nhưng lỗi này sẽ xảy ra đều đặn ở mọi biên chứ không chỉ thỉnh thoảng. Bạn sửa phép chia và lỗi vẫn còn, vì dữ liệu chưa bao giờ được sắp xếp theo giá.",
          ending: "bad",
        },
        toobig: {
          text: "Tìm nhị phân không mất chính xác khi mảng lớn, nó chỉ cần khoảng hai mươi bước cho nửa triệu phần tử. Bạn tốn thời gian cắt mảng thành các đoạn nhỏ hơn, và lỗi giữ nguyên vì nguyên nhân nằm ở thứ tự dữ liệu.",
          ending: "bad",
        },
        criterion: {
          text: "Đúng. Tìm nhị phân loại một nửa dựa trên giả định dãy tăng dần theo tiêu chí đang so sánh. Mảng sắp xếp theo tên thì giá đứng lộn xộn, nên có lúc nó loại nhầm đúng nửa chứa đáp án. Bạn sửa thế nào?",
          choices: [
            { label: "Sắp xếp lại mảng theo giá trước mỗi lần tìm", next: "sorteach" },
            { label: "Giữ thêm một bản sắp theo giá nếu thường xuyên tìm theo giá", next: "second" },
          ],
        },
        sorteach: {
          text: "Lỗi biến mất nhưng mỗi lần tìm giờ tốn cỡ n nhân logarit n để sắp xếp trước, còn chậm hơn duyệt tuyến tính một lần. Hàm tìm nhanh của bạn thành chậm nhất trong cả hệ thống, vì chi phí chuẩn bị không được chia cho nhiều lần tìm.",
          ending: "bad",
        },
        second: {
          text: "Sắp xếp theo giá một lần, giữ bản đó, và mọi lần tìm theo giá sau này chỉ tốn khoảng hai mươi bước. Chi phí chuẩn bị được chia cho rất nhiều lần tìm, đúng trường hợp đầu tư sắp xếp trước mới hoàn vốn.",
          ending: "good",
        },
      },
    },
  ],

  "sap-xep-co-ban-va-vi-sao-cham": [
    {
      type: "scenario",
      title: "Sắp xếp một triệu dòng nhật ký",
      start: "start",
      nodes: {
        start: {
          text: "Bạn cần sắp xếp một triệu dòng nhật ký theo thời gian. Một đồng nghiệp tự viết sắp xếp chọn vì thấy ngắn và dễ hiểu, thử trên 1.000 dòng thì chạy tức thì. Bạn có nên cho dùng thật không?",
          choices: [
            { label: "Có, chạy tức thì ở 1.000 dòng thì với một triệu cũng ổn", next: "ship" },
            { label: "Không, dùng hàm sắp xếp của thư viện chuẩn", next: "stdlib" },
            { label: "Có, nhưng đổi sang sắp xếp nổi bọt vì nó trực quan hơn", next: "bubble" },
          ],
        },
        ship: {
          text: "Một nghìn dòng cần cỡ một triệu thao tác, nhanh. Một triệu dòng cần cỡ một nghìn tỷ, chậm gấp một triệu lần chứ không gấp một nghìn lần. Công việc chạy hàng ngày trời, và không máy nào mạnh hơn bù nổi.",
          ending: "bad",
        },
        bubble: {
          text: "Nổi bọt cũng bậc hai và còn thực hiện nhiều phép đổi chỗ hơn sắp xếp chọn. Bạn đổi một thuật toán chậm lấy một thuật toán chậm hơn, hầu như không thư viện nào còn dùng nó vì lý do đó.",
          ending: "bad",
        },
        stdlib: {
          text: "Thư viện chuẩn dùng thuật toán cỡ n nhân logarit n, một triệu dòng chỉ tốn cỡ hai mươi triệu thao tác. Nhưng dòng nhật ký có thời gian trùng nhau, và bạn đã sắp trước theo mức độ nghiêm trọng, nay muốn sắp theo thời gian mà vẫn giữ nguyên thứ tự mức độ giữa các dòng cùng thời điểm.",
          choices: [
            { label: "Dùng sắp xếp ổn định, các dòng bằng nhau giữ thứ tự cũ", next: "stable" },
            { label: "Dùng bất kỳ sắp xếp nào, các dòng bằng nhau thì thứ tự không quan trọng", next: "unstable" },
          ],
        },
        unstable: {
          text: "Sắp xếp không ổn định được phép đảo thứ tự các phần tử bằng nhau. Các dòng cùng giây giờ lẫn lộn mức độ nghiêm trọng, và một dòng lỗi nghiêm trọng nằm lẫn giữa các dòng thông tin, khó thấy khi điều tra sự cố.",
          ending: "bad",
        },
        stable: {
          text: "Sắp xếp ổn định giữ nguyên thứ tự tương đối của các phần tử bằng nhau, nên sắp theo mức độ trước rồi theo thời gian cho đúng kết quả cần. Cả hai lần đều chạy trong vài giây.",
          ending: "good",
        },
      },
    },
  ],

  "sap-xep-tron-va-sap-xep-nhanh": [
    {
      type: "scenario",
      title: "Sắp xếp nhanh bỗng chậm trên dữ liệu thật",
      start: "start",
      nodes: {
        start: {
          text: "Bạn viết sắp xếp nhanh, chọn phần tử đầu mảng làm mốc. Thử với dữ liệu ngẫu nhiên thì rất nhanh. Triển khai thật, dữ liệu vào đã sắp xếp sẵn thì chương trình chậm hẳn và thậm chí tràn ngăn xếp. Nguyên nhân nhiều khả năng nhất là gì?",
          choices: [
            { label: "Mốc luôn rơi vào cực trị nên mỗi lần phân hoạch chỉ tách một phần tử", next: "pivot" },
            { label: "Dữ liệu đã sắp xếp nên thuật toán làm việc thừa mà vẫn đúng", next: "extra" },
            { label: "Phép so sánh chạy chậm hơn với số đã xếp đúng thứ tự", next: "compare" },
          ],
        },
        extra: {
          text: "Dữ liệu đã sắp xếp đáng lẽ là bài dễ nhất, nhưng thuật toán của bạn lại gặp trường hợp khó nhất, nên mô tả này chưa chỉ ra cơ chế. Bạn thêm bước kiểm tra đã sắp xếp chưa, lần sau dữ liệu gần sắp xếp thì lỗi trở lại.",
          ending: "bad",
        },
        compare: {
          text: "Phép so sánh hai số tốn như nhau bất kể thứ tự. Bạn đo thời gian từng phép so sánh và không thấy gì khác biệt, trong khi số phép so sánh tăng từ cỡ n nhân logarit n lên bậc hai.",
          ending: "bad",
        },
        pivot: {
          text: "Đúng. Mốc là phần tử nhỏ nhất ở mỗi lần nên một nửa mảng rỗng, bài toán chỉ nhỏ đi một phần tử và độ sâu đệ quy bằng cả n. Độ phức tạp thành bậc hai. Bạn sửa cách chọn mốc ra sao?",
          choices: [
            { label: "Chọn mốc là phần tử cuối thay vì phần tử đầu", next: "last" },
            { label: "Chọn mốc ngẫu nhiên trong đoạn đang xét", next: "random" },
          ],
        },
        last: {
          text: "Với dữ liệu đã sắp xếp tăng dần, phần tử cuối là lớn nhất, vẫn là cực trị, và lỗi y nguyên. Bạn còn có thể bị tấn công bằng dữ liệu dựng sẵn, vì ai biết quy tắc chọn mốc đều tính trước được chỗ nó xấu.",
          ending: "bad",
        },
        random: {
          text: "Mốc ngẫu nhiên khiến không có dữ liệu cụ thể nào luôn gây trường hợp xấu, kể cả đã sắp xếp. Trung bình mỗi lần phân hoạch tách mảng khá đều, độ sâu cỡ logarit, và kẻ tấn công cũng không dựng được dữ liệu gây bậc hai.",
          ending: "good",
        },
      },
    },
  ],

  "duyet-do-thi-rong-va-sau": [
    {
      type: "scenario",
      title: "Công cụ quét liên kết cứ treo mãi",
      start: "start",
      nodes: {
        start: {
          text: "Bạn viết công cụ quét các trang của một website: từ trang chủ, đi theo mọi liên kết, mỗi trang đưa các liên kết nó chứa vào danh sách chờ. Chạy trên trang thử nghiệm thì xong, chạy trên website thật thì treo mãi, không báo lỗi. Bạn nghi điều gì?",
          choices: [
            { label: "Danh sách chờ dùng ngăn xếp, nên cần đổi sang hàng đợi", next: "queue" },
            { label: "Chưa ghi lại trang đã thăm nên các trang trỏ vòng quanh nhau mãi", next: "visited" },
            { label: "Website quá lớn nên chương trình cần thêm bộ nhớ", next: "memory" },
          ],
        },
        queue: {
          text: "Đổi ngăn xếp thành hàng đợi chỉ đổi thứ tự thăm, từ sâu trước sang rộng trước. Cả hai vẫn đi vòng mãi nếu không nhớ trang đã thăm. Chương trình vẫn treo, và bạn vừa đổi một thứ không liên quan tới lỗi.",
          ending: "bad",
        },
        memory: {
          text: "Cấp thêm bộ nhớ chỉ làm chương trình treo muộn hơn: danh sách chờ cứ đầy mãi vì trang chủ và trang liên hệ trỏ qua lại nhau vô tận. Triệu chứng của việc đi vòng là treo, không phải sai kết quả.",
          ending: "bad",
        },
        visited: {
          text: "Đúng. Website là đồ thị có chu trình: trang A trỏ tới B, B trỏ lại A. Không đánh dấu thì thuật toán đi vòng vô hạn. Bạn thêm một tập hợp các địa chỉ đã thăm. Giờ có thêm yêu cầu: tìm trang cần ít lần nhấp nhất từ trang chủ tới một trang đích.",
          choices: [
            { label: "Duyệt sâu trước, đường đầu tiên tìm được là ngắn nhất", next: "dfs" },
            { label: "Duyệt rộng trước dùng hàng đợi, lần đầu gặp đích là ít bước nhất", next: "bfs" },
          ],
        },
        dfs: {
          text: "Sâu trước đi theo một nhánh đến tận cùng rồi mới quay lại, nên đường nó tìm được đầu tiên có thể dài hàng chục bước dù có lối tắt hai bước. Báo cáo của bạn nói cần hai mươi lần nhấp, trong khi thật ra chỉ cần hai.",
          ending: "bad",
        },
        bfs: {
          text: "Rộng trước thăm theo từng lớp: mọi trang cách trang chủ một bước, rồi hai bước, rồi ba bước. Lần đầu gặp trang đích chắc chắn là với số lần nhấp ít nhất, và hàng đợi cùng tập hợp đã thăm giữ cho chương trình không đi vòng.",
          ending: "good",
        },
      },
    },
  ],

  "de-quy-va-cach-nghi-de-quy": [
    {
      type: "scenario",
      title: "Hàm đệ quy duyệt thư mục bị tràn ngăn xếp",
      start: "start",
      nodes: {
        start: {
          text: "Bạn viết hàm đệ quy tính tổng dung lượng một thư mục: cộng dung lượng tệp, rồi gọi lại chính nó cho từng thư mục con. Trên máy bạn chạy tốt. Trên máy một khách hàng nó dừng với lỗi tràn ngăn xếp. Bạn kiểm tra gì trước?",
          choices: [
            { label: "Có thư mục nào trỏ ngược lên thư mục cha tạo vòng, hoặc lồng sâu bất thường", next: "cycle" },
            { label: "Máy khách hàng có ít bộ nhớ hơn nên cần tăng bộ nhớ", next: "mem" },
            { label: "Hàm thiếu điều kiện dừng cho thư mục rỗng", next: "empty" },
          ],
        },
        mem: {
          text: "Ngăn xếp lời gọi có kích thước giới hạn riêng, không phải toàn bộ bộ nhớ máy. Tăng bộ nhớ không đổi giới hạn đó nên lỗi vẫn còn, và bạn đã gửi khách hàng một lời khuyên không có tác dụng.",
          ending: "bad",
        },
        empty: {
          text: "Thư mục rỗng tự nhiên dừng vì vòng lặp qua các con chạy zero lần, nên đó không phải lỗi. Bạn thêm điều kiện thừa và lỗi vẫn xảy ra, vì bài toán không nhỏ đi ở thư mục có đường tắt trỏ ngược lên.",
          ending: "bad",
        },
        cycle: {
          text: "Đúng. Trên máy khách hàng có một liên kết tượng trưng trỏ ngược lên thư mục cha, nên bài toán không bao giờ nhỏ đi và hàm gọi mãi cho đến khi hết ngăn xếp. Điều kiện dừng có mà bài toán không tiến tới nó. Bạn xử lý thế nào?",
          choices: [
            { label: "Nhớ các thư mục đã đi qua và bỏ qua nếu gặp lại", next: "seen" },
            { label: "Bắt lỗi tràn ngăn xếp rồi trả về tổng hiện có", next: "catch" },
          ],
        },
        catch: {
          text: "Chương trình không sập nữa, nhưng tổng trả về là con số tuỳ ý, tuỳ lúc nào ngăn xếp cạn. Khách hàng thấy dung lượng thư mục khác nhau mỗi lần chạy. Bạn che lỗi thay vì làm bài toán nhỏ đi sau mỗi lời gọi.",
          ending: "bad",
        },
        seen: {
          text: "Mỗi thư mục chỉ được đi vào một lần, nên bài toán luôn nhỏ đi và hàm chắc chắn dừng. Tổng dung lượng giờ ổn định, và bạn ghi chú lại cho mình rằng thư mục lồng sâu cả chục nghìn tầng mới cần chuyển sang vòng lặp với ngăn xếp tường minh.",
          ending: "good",
        },
      },
    },
  ],

  "quy-hoach-dong-va-ghi-nho-ket-qua": [
    {
      type: "scenario",
      title: "Tính số cách đi cầu thang chậm khủng khiếp",
      start: "start",
      nodes: {
        start: {
          text: "Bạn cần đếm số cách leo một cầu thang 45 bậc, mỗi bước leo một hoặc hai bậc. Bạn viết hàm đệ quy thuần: số cách tới bậc n bằng số cách tới bậc n-1 cộng số cách tới bậc n-2. Với 10 bậc thì tức thì, với 45 bậc thì chạy cả phút. Chuyện gì xảy ra?",
          choices: [
            { label: "Cùng một bậc bị tính lại ở rất nhiều nhánh của cây lời gọi", next: "repeat" },
            { label: "Hàm đệ quy luôn chậm hơn vòng lặp theo hàm mũ", next: "alwaysslow" },
            { label: "Số kết quả quá lớn nên phép cộng tốn nhiều thời gian", next: "bignum" },
          ],
        },
        alwaysslow: {
          text: "Đệ quy không tự nó chậm theo hàm mũ. Sắp xếp trộn đệ quy mà vẫn nhanh. Bạn viết lại bằng vòng lặp mà không hiểu nguyên nhân, và gặp đúng lỗi này lần nữa ở bài toán tiếp theo có cấu trúc tương tự.",
          ending: "bad",
        },
        bignum: {
          text: "Với 45 bậc kết quả chỉ cỡ vài tỷ, vừa trong một số nguyên thường. Phép cộng không phải thủ phạm: số lần gọi hàm mới là vấn đề, vì nó gần như nhân đôi mỗi khi thêm một bậc.",
          ending: "bad",
        },
        repeat: {
          text: "Đúng. Số cách tới bậc 30 được tính hàng nghìn lần ở các nhánh khác nhau, và tổng số lời gọi tăng theo hàm mũ. Bài toán thoả điều kiện để ghi nhớ: bài con trùng lặp và đáp án bài lớn ghép từ bài con. Bạn chọn cách nào?",
          choices: [
            { label: "Thêm một từ điển: tra trước khi tính, ghi lại sau khi tính", next: "memo" },
            { label: "Chạy hàm trên máy mạnh hơn, hoặc nhiều luồng song song", next: "faster" },
          ],
        },
        faster: {
          text: "Số lời gọi cho 45 bậc cỡ hàng tỷ, máy nhanh gấp mười chỉ rút còn vài giây. Cầu thang 60 bậc lại chậm trở lại, và bạn vẫn chưa sửa nguyên nhân là cùng bài con bị giải đi giải lại.",
          ending: "bad",
        },
        memo: {
          text: "Mỗi bậc chỉ được tính đúng một lần, cây lời gọi rơi từ hàm mũ xuống tuyến tính. Cầu thang 45 bậc cần khoảng 45 phép tính thay vì hàng tỷ. Cùng một mã còn dùng được cho bài toán tương tự có bài con trùng lặp.",
          ending: "good",
        },
      },
    },
  ],

  "thuat-toan-tham-lam": [
    {
      type: "scenario",
      title: "Máy bán hàng trả tiền thừa bằng ít tờ nhất",
      start: "start",
      nodes: {
        start: {
          text: "Bạn lập trình cho máy bán hàng một thuật toán trả tiền thừa: luôn lấy tờ mệnh giá lớn nhất không vượt quá số còn lại. Thử với mệnh giá thông thường thì ra đúng ít tờ nhất. Một khách hàng muốn dùng cùng mã cho hệ thống tiền thưởng nội bộ với mệnh giá 1, 3 và 4. Bạn nói gì?",
          choices: [
            { label: "Dùng được, tham lam luôn cho kết quả ít tờ nhất", next: "always" },
            { label: "Chưa chắc, phải kiểm tra bài toán có tính chất cho phép tham lam", next: "check" },
            { label: "Không dùng được vì tham lam chỉ chạy với tiền thật", next: "onlymoney" },
          ],
        },
        always: {
          text: "Khách trả sáu điểm thưởng: thuật toán trả 4 + 1 + 1 là ba mục, trong khi 3 + 3 chỉ cần hai. Chương trình không báo lỗi, chỉ im lặng đưa ra đáp án kém hơn, và không ai biết trừ khi có thứ khác để so sánh.",
          ending: "bad",
        },
        onlymoney: {
          text: "Tham lam không gắn với tiền thật: nó đúng với mọi bộ mệnh giá thoả một tính chất cụ thể, và với nhiều bài toán khác như xếp lịch. Từ chối cả hướng làm khiến khách mất công làm một giải pháp chậm hơn không cần thiết.",
          ending: "bad",
        },
        check: {
          text: "Đúng hướng. Tính đúng nằm ở cấu trúc của bài toán chứ không ở thuật toán, nên phải chứng minh hoặc phản bác bằng ví dụ. Bạn thử và thấy với 1, 3, 4 thì sáu điểm không tối ưu. Bây giờ chọn hướng cho khách.",
          choices: [
            { label: "Dùng quy hoạch động, xét mọi cách chia và chọn ít tờ nhất", next: "dp" },
            { label: "Giữ tham lam nhưng thêm quy tắc riêng cho riêng số sáu", next: "patch" },
          ],
        },
        patch: {
          text: "Quy tắc riêng cho số sáu chữa một ca. Số mười hai cũng sai, rồi đến những số khác, và mã thành đống ngoại lệ không ai dám đụng. Bạn vá triệu chứng của một thuật toán không đúng cho bộ mệnh giá này.",
          ending: "bad",
        },
        dp: {
          text: "Quy hoạch động tính số tờ ít nhất cho từng số tiền từ nhỏ lên, nên luôn tối ưu với mọi bộ mệnh giá. Chậm hơn tham lam một chút nhưng đúng, và bạn có sẵn bài thử cho trường hợp 1, 3, 4 để canh chừng lỗi sau này.",
          ending: "good",
        },
      },
    },
  ],

  "duong-di-ngan-nhat-tren-do-thi": [
    {
      type: "scenario",
      title: "Ứng dụng giao hàng chọn đường tốn phí hơn",
      start: "start",
      nodes: {
        start: {
          text: "Ứng dụng giao hàng của bạn dùng duyệt rộng trước để tìm tuyến từ kho tới khách. Một tài xế phàn nàn: tuyến gợi ý chỉ qua hai đoạn nhưng cả hai đều là đường phí đắt, trong khi có tuyến năm đoạn nhỏ rẻ hơn hẳn. Vì sao ứng dụng chọn như vậy?",
          choices: [
            { label: "Duyệt rộng trước đếm số đoạn đường, không cộng chi phí từng đoạn", next: "count" },
            { label: "Dữ liệu bản đồ thiếu đoạn đường nhỏ nên không xét được", next: "missing" },
            { label: "Duyệt rộng trước chỉ chạy đúng trên đồ thị có chu trình", next: "cycle" },
          ],
        },
        missing: {
          text: "Bạn kiểm tra dữ liệu và cả năm đoạn nhỏ đều có đủ. Mất nửa ngày bổ sung dữ liệu không đổi được gì, vì thuật toán không bao giờ so sánh tổng chi phí giữa hai tuyến.",
          ending: "bad",
        },
        cycle: {
          text: "Duyệt rộng trước chạy được trên cả đồ thị có và không có chu trình, miễn là đánh dấu đỉnh đã thăm. Chu trình không liên quan đến việc chọn tuyến đắt, và bạn đang sửa sai chỗ.",
          ending: "bad",
        },
        count: {
          text: "Đúng. Nó tìm đường ít cạnh nhất, đúng khi mọi cạnh cùng giá, còn ở đây mỗi đoạn có giá riêng. Bạn cần luôn mở rộng đỉnh có tổng chi phí nhỏ nhất. Bạn lấy đỉnh đó bằng cách nào?",
          choices: [
            { label: "Duyệt toàn bộ danh sách chờ để tìm đỉnh rẻ nhất mỗi lần", next: "scan" },
            { label: "Giữ danh sách chờ trong một đống ưu tiên theo tổng chi phí", next: "heap" },
          ],
        },
        scan: {
          text: "Kết quả đúng, nhưng mỗi lần chọn đỉnh tốn tuyến tính trên danh sách chờ. Với mạng đường cả thành phố nó chậm đến mức tài xế chờ nhiều giây mới có tuyến. Đúng nhưng chưa dùng được.",
          ending: "bad",
        },
        heap: {
          text: "Đống ưu tiên lấy đỉnh rẻ nhất trong thời gian logarit thay vì tuyến tính, nên tuyến được tính trong chớp mắt trên mạng lớn. Thuật toán đúng khi mọi chi phí đoạn đường không âm, điều luôn đúng với phí và quãng đường thật.",
          ending: "good",
        },
      },
    },
  ],
};
