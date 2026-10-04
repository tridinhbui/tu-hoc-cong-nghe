import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 26. Một người viết cho một tệp.
export const P26_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "canh-bao-cai-gi-va-khong-canh-bao-cai-gi": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Rà bảng cảnh báo của một đội trước khi bật chế độ gọi người trực",
      task: "Đội bạn vừa soạn sáu cảnh báo định gọi người trực lúc ba giờ sáng. Bấm vào những cảnh báo KHÔNG đáng đánh thức ai, rồi nộp.",
      segments: [
        {
          text: "Tỷ lệ yêu cầu lỗi vượt 2% trong 5 phút liên tục. Kèm đường dẫn tới hướng dẫn: kiểm tra bản phát hành gần nhất, tắt cờ tính năng nếu trùng giờ.",
        },
        {
          text: "Bộ nhớ của máy chủ số 7 vượt 80%: gọi người trực ngay để xem có chuyện gì.",
          error:
            "Đây là cảnh báo theo nguyên nhân. Máy dùng nhiều bộ nhớ chưa chắc có người dùng nào bị ảnh hưởng, và người nhận không có việc cụ thể để làm. Nếu thật sự cần theo dõi thì đó là mục công việc cho sáng hôm sau, còn triệu chứng người dùng thấy sẽ được cảnh báo tỷ lệ lỗi bắt.",
        },
        {
          text: "Tốc độ tiêu ngân sách lỗi gấp 10 lần mức bình thường trong một giờ. Kèm lệnh xem biểu đồ lỗi theo bản phát hành.",
        },
        {
          text: "Cảnh báo ổ đĩa đầy 70% kêu mỗi tuần mà chưa ai xử lý lần nào, nên nâng ngưỡng lên 90% cho đỡ ồn.",
          error:
            "Cảnh báo hay kêu mà không ai làm gì thì phải XOÁ hoặc chuyển thành việc có lịch, không phải nâng ngưỡng. Nâng ngưỡng chỉ làm nó kêu thưa hơn, nó vẫn không dẫn tới hành động nào và vẫn làm mòn sự chú ý của người trực.",
        },
        {
          text: "Báo cáo cuối tháng của dịch vụ nội bộ chạy chậm hơn 30 giây: gọi người trực vì chậm là nghiêm trọng.",
          error:
            "Nghiêm trọng chưa phải tiêu chí. Câu hỏi là có ai làm được gì ngay lúc ba giờ sáng không. Báo cáo cuối tháng chậm có thể chờ tới sáng, nên đây là mục công việc, không phải cảnh báo.",
        },
        {
          text: "Độ trễ phân vị 99 của trang thanh toán vượt 3 giây trong 10 phút. Mô tả ghi rõ người dùng đang thấy trang chậm, kèm bước kiểm tra đầu tiên.",
        },
      ],
    },
    {
      type: "flow",
      title: "Một cảnh báo đi qua bộ lọc: đánh thức người, hay để sáng mai",
      steps: [
        {
          label: "Có người dùng đang bị ảnh hưởng không",
          detail:
            "Tỷ lệ lỗi trang thanh toán tăng là triệu chứng người dùng thấy, đi tiếp. Bộ nhớ máy số 7 lên 80% mà yêu cầu vẫn ổn thì dừng ở đây: ghi thành mục công việc.",
        },
        {
          label: "Có việc làm được ngay không",
          detail:
            "Người nhận cảnh báo lúc ba giờ sáng phải có ít nhất một hành động: quay lại bản trước, tắt cờ, chuyển lưu lượng. Nếu câu trả lời là chờ tới sáng thì nó không phải cảnh báo.",
        },
        {
          label: "Kèm hướng dẫn làm gì tiếp",
          detail:
            "Người trực không phải người đã viết quy tắc, và đang buồn ngủ. Cảnh báo cần nói người dùng đang thấy gì và bước kiểm tra đầu tiên là gì, đừng bắt họ đoán.",
        },
        {
          label: "Tính theo tốc độ tiêu ngân sách",
          detail:
            "Một đợt lỗi hai phút rồi tự khỏi không đáng gọi ai. Một xu hướng sẽ ăn hết ngân sách lỗi trong ba ngày thì đáng. Ngưỡng cố định không phân biệt được hai trường hợp này, tốc độ tiêu thì có.",
        },
        {
          label: "Kêu mà không ai làm gì thì xoá",
          detail:
            "Sau mỗi tuần xem lại: cảnh báo nào kêu mà chưa dẫn tới hành động thì xoá hoặc đổi thành việc có lịch. Đừng nâng ngưỡng, vì nó vẫn chiếm chỗ và vẫn dạy đội bỏ qua cảnh báo.",
        },
      ],
    },
  ],

  "trong-luc-co-su-co-vai-tro": [
    {
      type: "scenario",
      title: "Mười phút đầu của một sự cố lúc 02:40",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "02:40. Cảnh báo kêu: tỷ lệ lỗi thanh toán vượt 8% và đang tăng. Bạn là người trực duy nhất đang thức. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Mở nhật ký để tìm cho ra nguyên nhân gốc trước khi chạm vào gì", next: "doc-nhat-ky" },
            { label: "Ghi mốc 02:40 vào dòng thời gian rồi hỏi xem vừa có gì thay đổi", next: "thay-doi" },
          ],
        },
        "doc-nhat-ky": {
          text: "02:55. Nhật ký có hàng nghìn dòng lỗi giống nhau, chưa dòng nào chỉ ra nguyên nhân. Tỷ lệ lỗi vẫn 8%. Ba đồng nghiệp vừa vào kênh chung và hỏi bạn cần gì.",
          choices: [
            { label: "Nhờ cả ba cùng đọc nhật ký cho nhanh tìm ra nguyên nhân", next: "doc-chung" },
            { label: "Dừng đọc, kiểm tra xem vừa có thay đổi nào và khôi phục trước", next: "thay-doi" },
          ],
        },
        "doc-chung": {
          text: "03:25. Bốn người đọc nhật ký ở bốn chỗ khác nhau, hai người đưa ra hai giả thuyết ngược nhau và bắt đầu tranh luận. Cuối cùng một người nhận ra bản phát hành lúc 02:15 là nguyên nhân. Người dùng đã gặp lỗi gần bốn mươi phút, và quay lại bản trước chỉ mất bốn phút.",
          ending: "bad",
        },
        "thay-doi": {
          text: "Dòng thời gian cho thấy bản phát hành lúc 02:15 có bật một cờ tính năng mới cho luồng thanh toán. Bạn có hai công cụ: tắt cờ (khoảng 30 giây) hoặc quay lại bản trước (khoảng 4 phút). Kênh chung đang có nhiều người nhắn.",
          choices: [
            { label: "Tắt cờ tính năng, rồi báo vào kênh việc mình vừa làm", next: "kiem-tra" },
            { label: "Gọi thêm ba kỹ sư cùng vào sửa mã trực tiếp trên môi trường thật", next: "sua-nong" },
          ],
        },
        "sua-nong": {
          text: "Bốn người cùng gõ lệnh vào hệ thống, hai thay đổi chồng lên nhau. Lỗi đổi hình dạng nhưng không hết, và không ai biết thay đổi nào gây ra điều gì. Phải mất thêm hơn nửa giờ để dọn lại về trạng thái ban đầu.",
          ending: "bad",
        },
        "kiem-tra": {
          text: "02:49. Bảng theo dõi trở lại xanh sau hai phút. Có vẻ mọi thứ đã xong.",
          choices: [
            { label: "Đóng sự cố và đi ngủ lại vì bảng theo dõi đã xanh", next: "dong-som" },
            { label: "Xác nhận bằng số: tỷ lệ lỗi phía người dùng, hàng đợi, dữ liệu ghi sai", next: "xac-nhan" },
          ],
        },
        "dong-som": {
          text: "Sáng ra đội thanh toán phát hiện hàng đợi đơn hàng vẫn tồn đọng, và một số đơn được ghi nhận sai trạng thái trong lúc cờ còn bật. Không ai biết vì sự cố đã được đóng mà không ai kiểm tra phần còn lại.",
          ending: "bad",
        },
        "xac-nhan": {
          text: "Bạn thấy hàng đợi đang xả dần và có một nhóm đơn bị ghi sai trạng thái. Bạn ghi cả hai vào dòng thời gian, giao việc sửa dữ liệu cho sáng hôm sau với người nhận cụ thể rồi mới đóng sự cố. Người dùng ổn, và biên bản có đủ mốc giờ ghi ngay lúc đó.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba vai trong sự cố, nhìn qua một căn bếp giờ cao điểm",
      intro:
        "Tối thứ sáu, nhà hàng kín khách thì bếp bỗng cháy một chảo dầu. Nếu mọi người cùng chạy tới dập và cùng hét, lửa lan nhanh hơn. Bếp chạy được vì mỗi người giữ một việc khác nhau.",
      columns: ["Vai trong sự cố", "Trong căn bếp", "Nếu thiếu vai này"],
      rows: [
        [
          "Người sửa",
          "Một đầu bếp duy nhất cầm bình chữa cháy và xử lý chảo dầu",
          "Hai người cùng gõ lệnh, hai thay đổi chồng nhau và không ai biết cái nào làm lỗi đổi hình dạng",
        ],
        [
          "Người điều phối",
          "Bếp trưởng đứng nhìn cả bếp, quyết định dập lửa hay sơ tán khu bàn",
          "Không ai giữ bức tranh chung, mỗi người thử một hướng. Người sửa lại phải vừa gõ lệnh vừa suy nghĩ tiếp theo là gì",
        ],
        [
          "Người phát ngôn",
          "Quản lý ra gặp khách, báo bao lâu nữa phục vụ lại",
          "Người đang sửa bị ngắt liên tục bởi câu hỏi từ khách hàng, quản lý, đội khác",
        ],
      ],
      oneLiner:
        "Một người gõ lệnh, một người giữ bức tranh, một người nói với bên ngoài: tách ba việc đó ra thì cả ba nhanh hơn.",
    },
  ],

  "bien-ban-su-co-khong-do-loi": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Đọc bản nháp biên bản và tìm chỗ làm hỏng nó",
      task: "Bản nháp biên bản của một sự cố cấu hình có bảy đoạn. Bấm vào những đoạn khiến biên bản không giúp được đội học gì, rồi nộp.",
      segments: [
        {
          text: "Nguyên nhân gốc: anh Hùng đã gộp thay đổi cấu hình mà không kiểm tra cẩn thận.",
          error:
            "Câu này dừng ở một người. Câu hỏi đúng là HỆ THỐNG đã cho phép điều đó xảy ra thế nào. Người viết biên bản trong một đội quy trách nhiệm sẽ giấu đúng phần có giá trị, vì sợ nó bị dùng chống lại mình.",
        },
        {
          text: "Hệ thống cho phép gộp thay đổi cấu hình thẳng vào bản chạy thật, không qua môi trường thử và không có bước duyệt bắt buộc cho loại thay đổi này.",
        },
        {
          text: "Chỉ có một nguyên nhân: cấu hình sai. Đã sửa xong nên không còn việc nào cần làm.",
          error:
            "Sự cố lớn hầu như luôn cần nhiều lớp phòng vệ cùng thủng. Dừng ở một nguyên nhân là dừng quá sớm, và hai lớp còn lại nằm nguyên cho lần sau.",
        },
        {
          text: "Cảnh báo tỷ lệ lỗi đã bị tắt từ tháng trước vì kêu nhiều, và quy trình quay lại chưa từng được ai thử. Ba lớp cùng thủng.",
        },
        {
          text: "Việc cần làm: cả đội cần cẩn thận hơn khi gộp thay đổi cấu hình.",
          error:
            "Đây không phải một việc cần làm: không có tên người và không có hạn. Việc không có chủ sẽ thua việc gấp, và sáu tháng sau cùng sự cố có thể lặp lại.",
        },
        {
          text: "Việc cần làm: Lan bật lại cảnh báo tỷ lệ lỗi trước thứ Sáu tuần sau; Minh thêm bước thử bắt buộc cho thay đổi cấu hình trước cuối tháng.",
        },
        {
          text: "Điều đã diễn ra tốt: bản sao lưu cấu hình cho phép quay lại trong vài phút. Ghi lại để lần dọn dẹp sau không coi nó là thừa.",
        },
      ],
    },
    {
      type: "flow",
      title: "Từ lúc sự cố vừa xong tới một biên bản có việc làm cụ thể",
      steps: [
        {
          label: "Dựng dòng thời gian từ mốc đã ghi lúc xử lý",
          detail:
            "Lấy các dòng ghi ngay lúc đó: mấy giờ phát hiện, thử gì, hồi phục lúc nào. Không viết lại từ trí nhớ, vì sau khi biết kết quả trí nhớ về trình tự đã méo.",
        },
        {
          label: "Hỏi: hệ thống cho phép điều đó thế nào",
          detail:
            "Với mỗi bước hỏng, đặt câu hỏi về cơ chế thay vì về người. Ví dụ: vì sao một thay đổi cấu hình đi thẳng vào bản chạy thật được mà không qua môi trường thử?",
        },
        {
          label: "Liệt kê mọi lớp phòng vệ đã thủng",
          detail:
            "Thay đổi chưa kiểm đủ, cảnh báo bị tắt từ tháng trước, quy trình quay lại chưa ai thử. Tìm ra đủ ba lớp thay vì dừng ở lớp gây triệu chứng rõ nhất.",
        },
        {
          label: "Mỗi việc có tên người và hạn",
          detail:
            "Một danh sách việc không chủ sẽ nằm nguyên trong tài liệu. Viết tên và ngày cụ thể, rồi đưa chúng vào chỗ đội thật sự nhìn mỗi ngày.",
        },
        {
          label: "Ghi cả điều đã tốt, và viết cho cả sự cố nhỏ",
          detail:
            "Ghi cơ chế đã cứu bạn lần này để nó không bị gỡ trong đợt dọn dẹp. Sự cố nhỏ cũng nên có biên bản ngắn, vì nó thường là bản thử của một sự cố lớn cùng nguyên nhân.",
        },
      ],
    },
  ],

  "truc-cac-mo-hinh-va-cai-gia": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp gánh nặng trực theo số lần bị đánh thức, không theo số ngày",
      task: "Mỗi bộ ba là (tên, số ngày trực, số lần bị đánh thức ban đêm) trong quý. Sắp xếp để người bị đánh thức nhiều nhất đứng đầu, in mỗi người một dòng và dòng cuối ghi người có gánh nặng lớn nhất. Mã khởi đầu đang xếp theo số ngày trực, nên người trực 7 ngày không ai gọi lại đứng đầu.",
      starter: `ca = [("An", 7, 0), ("Bình", 2, 8), ("Chi", 7, 3), ("Dũng", 3, 5)]
xep = sorted(ca, key=lambda c: c[1], reverse=True)
for ten, ngay, dem in xep:
    print(f"{ten}: {dem} lần bị đánh thức trong {ngay} ngày")
print(f"Gánh nặng nhất: {xep[0][0]}")
print(f"Tổng số lần bị đánh thức: {sum(c[2] for c in ca)}")`,
      solution: `ca = [("An", 7, 0), ("Bình", 2, 8), ("Chi", 7, 3), ("Dũng", 3, 5)]
xep = sorted(ca, key=lambda c: c[2], reverse=True)
for ten, ngay, dem in xep:
    print(f"{ten}: {dem} lần bị đánh thức trong {ngay} ngày")
print(f"Gánh nặng nhất: {xep[0][0]}")
print(f"Tổng số lần bị đánh thức: {sum(c[2] for c in ca)}")`,
      expectedOutput: `Bình: 8 lần bị đánh thức trong 2 ngày
Dũng: 5 lần bị đánh thức trong 3 ngày
Chi: 3 lần bị đánh thức trong 7 ngày
An: 0 lần bị đánh thức trong 7 ngày
Gánh nặng nhất: Bình
Tổng số lần bị đánh thức: 16`,
      hints: [
        "Phần tử thứ ba của mỗi bộ ba là số lần bị đánh thức. Khoá sắp xếp đang dùng phần tử thứ hai.",
        "Số ngày trực dễ đếm nhưng không nói lên chi phí thật: ca hai ngày bị gọi tám lần nặng hơn ca bảy ngày không ai gọi.",
      ],
    },
    {
      type: "chart",
      title: "Vòng trực càng nhỏ, mỗi người gánh càng nhiều đêm",
      caption:
        "Số liệu minh hoạ, không phải đo từ một hệ thống thật. Kéo 'xác suất một đêm bị gọi' để thấy cách bền vững nhất là giảm số lần hệ thống gọi, vì sắp lịch khéo hơn chỉ chia lại cùng một gánh.",
      kind: "line",
      xLabel: "Số người trong vòng trực",
      yLabel: "Số đêm mỗi người mỗi năm",
      x: { from: 3, to: 12, step: 1 },
      params: [
        { id: "p", label: "Xác suất một đêm có người bị gọi", min: 5, max: 100, step: 5, value: 30, unit: "%" },
      ],
      series: [
        { label: "Đêm phải trực mỗi người", expr: "365/x" },
        { label: "Đêm thật sự bị đánh thức", expr: "365*p/100/x" },
      ],
    },
  ],

  "tu-khoi-phuc-va-suy-giam-nhe-nhang": [
    {
      type: "exercise",
      language: "javascript",
      title: "Viết thời gian chờ cho thử lại: tăng gấp đôi, có trần, có ngẫu nhiên",
      task: "Dịch vụ thanh toán đang lỗi thoáng qua. Mỗi lần thử lại chờ min(100 ms nhân 2 mũ lần thử, trần 1000 ms), rồi nhân với (0,5 + 0,5 nhân số ngẫu nhiên) để các máy không thử lại cùng lúc. Danh sách số ngẫu nhiên được cố định cho kết quả lặp lại được. Mã khởi đầu mới chờ tăng đều từng bước, nên không bao giờ giãn ra đủ nhanh.",
      starter: `const goc = 100, tran = 1000;
const ngauNhien = [1, 0.5, 0.5, 1, 0.5, 1];
for (let lan = 0; lan < 6; lan++) {
  const cho = goc * (lan + 1);
  const co = cho * (0.5 + 0.5 * ngauNhien[lan]);
  console.log("Lần " + (lan + 1) + ": chờ " + co + " ms");
}`,
      solution: `const goc = 100, tran = 1000;
const ngauNhien = [1, 0.5, 0.5, 1, 0.5, 1];
for (let lan = 0; lan < 6; lan++) {
  const cho = Math.min(goc * 2 ** lan, tran);
  const co = cho * (0.5 + 0.5 * ngauNhien[lan]);
  console.log("Lần " + (lan + 1) + ": chờ " + co + " ms");
}`,
      expectedOutput: `Lần 1: chờ 100 ms
Lần 2: chờ 150 ms
Lần 3: chờ 300 ms
Lần 4: chờ 800 ms
Lần 5: chờ 750 ms
Lần 6: chờ 1000 ms`,
      hints: [
        "Giãn cách gấp đôi nghĩa là goc * 2 ** lan, và Math.min với trần để nó không phình mãi.",
        "Nếu mọi máy đều chờ đúng 100, 200, 400 ms thì chúng thử lại cùng lúc và đè lên dịch vụ đang cố đứng dậy. Hệ số ngẫu nhiên là để tránh điều đó.",
      ],
    },
    {
      type: "flow",
      title: "Một yêu cầu thanh toán đi qua các lớp tự bảo vệ",
      steps: [
        {
          label: "Lỗi thoáng qua: thử lại có giãn cách",
          detail:
            "Cổng thanh toán trả lỗi một lần rồi ổn. Yêu cầu chờ một khoảng ngẫu nhiên, thử lại, và người dùng không hề biết có chuyện. Đây là lớp đầu tiên.",
        },
        {
          label: "Lỗi kéo dài: cầu dao ngắt mạch",
          detail:
            "Cổng thanh toán lỗi liên tục thì thử lại chỉ làm nó khó đứng dậy hơn. Cầu dao thấy lỗi liên tiếp, ngừng gọi, và trả lỗi ngay thay vì giữ luồng chờ.",
        },
        {
          label: "Một bản chết trong nhiều bản: kiểm tra sức khoẻ",
          detail:
            "Một trong năm bản không kết nối được cơ sở dữ liệu. Điểm kiểm tra sức khoẻ có chạm tới cơ sở dữ liệu nên báo hỏng, bộ cân bằng tải ngừng đẩy lưu lượng vào bản đó và nó được thay mới.",
        },
        {
          label: "Quá tải: tải rơi có chủ đích",
          detail:
            "Lưu lượng vượt sức chịu. Thay vì để mọi yêu cầu cùng chậm rồi cùng hết hạn, hệ thống từ chối một phần ngay từ đầu để phần còn lại được phục vụ bình thường.",
        },
        {
          label: "Suy giảm nhẹ nhàng: giữ phần cốt lõi",
          detail:
            "Dịch vụ gợi ý sản phẩm hỏng. Trang thanh toán ẩn mục gợi ý và vẫn cho đặt hàng, thay vì cố đưa mọi thứ về bình thường hoặc báo lỗi cả trang.",
        },
      ],
    },
  ],

  "chu-dong-gay-loi-de-hoc": [
    {
      type: "scenario",
      title: "Thử chuyển đổi dự phòng cơ sở dữ liệu mà chưa ai từng kích hoạt",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội có cơ chế tự động chuyển sang bản phụ của cơ sở dữ liệu khi bản chính hỏng, nhưng chưa ai từng thấy nó chạy thật. Bạn muốn chứng minh nó hoạt động. Bạn làm gì?",
          choices: [
            { label: "Tắt thẳng bản chính trên môi trường thật vào giờ cao điểm", next: "gio-cao-diem" },
            { label: "Chờ tới khi một sự cố thật xảy ra rồi sẽ biết", next: "cho-doi" },
            { label: "Viết giả thuyết, thử ở môi trường thử nghiệm có nút dừng", next: "gia-thuyet" },
          ],
        },
        "gio-cao-diem": {
          text: "Không có giả thuyết, không có nút dừng nào làm được ngay và không ai theo dõi. Bản phụ nhận lưu lượng chậm hơn dự kiến, đơn hàng thất bại trong lúc cao điểm. Bạn học được một điều, nhưng với giá của một sự cố thật vào ba giờ chiều đông khách nhất.",
          ending: "bad",
        },
        "cho-doi": {
          text: "Ba giờ sáng thứ bảy, bản chính hỏng thật. Một mình người trực phát hiện cơ chế chuyển không chạy vì ứng dụng giữ kết nối tới địa chỉ cũ. Cùng một điểm mù, nhưng lần này phát hiện ra lúc ít người nhất.",
          ending: "bad",
        },
        "gia-thuyet": {
          text: "Giả thuyết bạn viết ra: chuyển sang bản phụ trong dưới một phút và không mất giao dịch đã xác nhận. Cả đội ngồi cạnh nhau và có nút dừng. Kết quả: mất sáu phút mới chuyển xong vì ứng dụng giữ kết nối tới địa chỉ cũ. Khác dự đoán của bạn.",
          choices: [
            { label: "Ghi điểm mù, giao việc có tên và hạn, thử lại sau khi sửa", next: "sua-va-thu-lai" },
            { label: "Ghi thử xong và chạy được vì cuối cùng nó cũng chuyển", next: "bo-qua" },
            { label: "Bỏ qua kết quả vì môi trường thử nghiệm khác môi trường thật", next: "bo-qua-2" },
          ],
        },
        "sua-va-thu-lai": {
          text: "Việc sửa cách ứng dụng tìm lại bản chính có người nhận và hạn. Thử lại sau khi sửa, thời gian chuyển ngắn hơn nhiều, và bạn cũng ghi lại điều lần đầu khác dự đoán. Điểm mù được tìm ra vào giờ hành chính, trong lúc cả đội có mặt.",
          ending: "good",
        },
        "bo-qua": {
          text: "Biên bản thử nghiệm ghi chạy được và không ai theo dõi sáu phút kia. Tháng sau, bản chính hỏng thật và người dùng chờ sáu phút để đặt hàng lại được. Kết quả khác dự đoán chính là thứ bạn đã trả công để có, và bạn đã bỏ nó đi.",
          ending: "bad",
        },
        "bo-qua-2": {
          text: "Lập luận nghe có lý nên không ai kiểm tra thêm. Cấu hình kết nối trong môi trường thật cũng giống hệt môi trường thử nghiệm, nên điểm mù này vẫn nằm nguyên. Lỗi cấu hình là loại lỗi môi trường thử nghiệm bắt được với chi phí gần bằng không.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Một vòng thử nghiệm gây lỗi, từ giả thuyết tới việc có chủ",
      steps: [
        {
          label: "Viết giả thuyết trước khi chạm vào gì",
          detail:
            "Một câu duy nhất, ví dụ: tắt bản chính thì trong dưới một phút ứng dụng chuyển sang bản phụ và không mất giao dịch. Không có câu này, sau khi thấy kết quả bạn sẽ nhớ rằng mình đã đoán như vậy.",
        },
        {
          label: "Chọn phạm vi nhỏ nhất mà vẫn quan sát được",
          detail:
            "Bắt đầu ở môi trường thử nghiệm, nơi bắt được phần lớn lỗi cấu hình gần như miễn phí. Chỉ mở rộng ra môi trường thật khi môi trường nhỏ đã cho kết quả đúng giả thuyết.",
        },
        {
          label: "Chuẩn bị nút dừng làm được ngay",
          detail:
            "Biết trước lệnh nào đưa mọi thứ về trạng thái ban đầu và ai gõ nó. Nếu nút dừng cần mười phút mới có tác dụng thì bài thử đó chưa sẵn sàng chạy.",
        },
        {
          label: "Chạy khi có người theo dõi",
          detail:
            "Cả đội ngồi cạnh nhau vào giờ làm việc, một người đọc biểu đồ, một người ghi mốc giờ. Chạy rồi bỏ đó là lặp lại đúng sự cố ba giờ sáng mà bạn muốn tránh.",
        },
        {
          label: "So kết quả với giả thuyết đã viết",
          detail:
            "Đúng như dự đoán là xác nhận điều đã biết. Khác dự đoán mới là thứ bạn trả công để có: mỗi lần như vậy là một điểm mù tìm ra lúc chưa ai bị đánh thức.",
        },
        {
          label: "Giao việc cho điểm mù đã tìm ra",
          detail:
            "Điểm khác dự đoán thành việc có tên người và hạn, rồi thử lại sau khi sửa để chứng minh nó đã đóng.",
        },
      ],
    },
  ],

  "do-thoi-gian-phat-hien-va-hoi-phuc": [
    {
      type: "exercise",
      language: "python",
      title: "Đo thời gian hồi phục từ lúc biết, và đừng để trung bình che sự cố tệ nhất",
      task: "Mỗi bộ ba là (phút hệ thống thật sự bắt đầu hỏng, phút đội biết, phút người dùng ổn trở lại). Thời gian phát hiện là từ lúc hỏng tới lúc biết; thời gian hồi phục là từ lúc BIẾT tới lúc người dùng ổn. Mã khởi đầu đo hồi phục từ lúc hỏng nên cộng luôn thời gian phát hiện vào, và các con số hồi phục bị phình ra.",
      starter: `from statistics import median
su_co = [(0, 4, 19), (0, 45, 60), (0, 3, 10), (0, 6, 25), (0, 2, 12)]
phat_hien = [biet - hong for hong, biet, on in su_co]
hoi_phuc = [on - hong for hong, biet, on in su_co]
print(f"Phát hiện: trung vị {median(phat_hien)} phút, tệ nhất {max(phat_hien)} phút")
print(f"Hồi phục: trung vị {median(hoi_phuc)} phút, tệ nhất {max(hoi_phuc)} phút")
print(f"Trung bình phát hiện: {sum(phat_hien) / len(phat_hien):.1f} phút")`,
      solution: `from statistics import median
su_co = [(0, 4, 19), (0, 45, 60), (0, 3, 10), (0, 6, 25), (0, 2, 12)]
phat_hien = [biet - hong for hong, biet, on in su_co]
hoi_phuc = [on - biet for hong, biet, on in su_co]
print(f"Phát hiện: trung vị {median(phat_hien)} phút, tệ nhất {max(phat_hien)} phút")
print(f"Hồi phục: trung vị {median(hoi_phuc)} phút, tệ nhất {max(hoi_phuc)} phút")
print(f"Trung bình phát hiện: {sum(phat_hien) / len(phat_hien):.1f} phút")`,
      expectedOutput: `Phát hiện: trung vị 4 phút, tệ nhất 45 phút
Hồi phục: trung vị 15 phút, tệ nhất 19 phút
Trung bình phát hiện: 12.0 phút`,
      hints: [
        "Hồi phục bắt đầu từ lúc đội biết, nên trừ phút biết chứ không trừ phút hỏng.",
        "Nhìn dòng 1: trung bình 12 phút nghe ổn, nhưng một sự cố mất tới 45 phút mới phát hiện. Đó là lý do đo bằng phân vị chứ không bằng trung bình.",
      ],
    },
    {
      type: "chart",
      title: "Trung bình khác xa nhóm sự cố tệ nhất",
      caption:
        "Số liệu minh hoạ cho hai con số của một đội nào đó, không phải đo thật. Cột trung bình trông ổn, còn phân vị cao cho thấy những sự cố làm người dùng chờ lâu nhất.",
      kind: "bar",
      yLabel: "Phút",
      seriesLabels: ["Thời gian phát hiện", "Thời gian hồi phục"],
      data: [
        { label: "Trung bình", values: [12, 30] },
        { label: "Phân vị 50", values: [4, 15] },
        { label: "Phân vị 90", values: [38, 55] },
        { label: "Phân vị 99", values: [45, 70] },
      ],
    },
  ],

  "bon-chi-so-cach-doi-lam-viec": [
    {
      type: "scenario",
      title: "Sếp muốn gấp đôi số lần phát hành trong quý này",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Quản lý đề xuất mục tiêu quý: tăng gấp đôi tần suất phát hành. Bạn là trưởng nhóm, nhóm hiện phát hành mỗi tháng một lần. Bạn trả lời thế nào?",
          choices: [
            { label: "Nhận mục tiêu và đẩy mọi thứ ra càng sớm càng tốt", next: "day-nhanh" },
            { label: "Đề nghị đặt cả bốn chỉ số làm đối trọng của nhau", next: "bon-chi-so" },
            { label: "Đề nghị gom thành mỗi quý một lần để chắc hơn", next: "gom-lo" },
          ],
        },
        "day-nhanh": {
          text: "Số lần phát hành tăng gấp đôi và bảng theo dõi trông rất đẹp. Nhưng mỗi lần ra nhanh hơn, ít được kiểm hơn, tỷ lệ thay đổi gây hỏng tăng dần. Thứ chỉ số đại diện, tức sản phẩm chạy tốt, thì xấu đi.",
          ending: "bad",
        },
        "gom-lo": {
          text: "Mỗi lần phát hành giờ là một lô lớn. Khi hỏng, không ai biết thay đổi nào gây ra, và quay lại nghĩa là mất hết. Tần suất tụt, thời gian từ mã tới sản phẩm dài ra, còn thời gian khôi phục cũng dài hơn.",
          ending: "bad",
        },
        "bon-chi-so": {
          text: "Bạn đề nghị đo cùng lúc tần suất, thời gian từ mã tới sản phẩm, tỷ lệ thay đổi gây hỏng và thời gian khôi phục. Quản lý hỏi: vậy làm thế nào để tăng tần suất mà tỷ lệ hỏng không tăng?",
          choices: [
            { label: "Cắt thay đổi nhỏ hơn, thêm cờ tính năng, giữ đường quay lại nhanh", next: "nho-hon" },
            { label: "Thêm một vòng duyệt thủ công cho mọi lần phát hành", next: "duyet-them" },
            { label: "Chỉ đếm những lần phát hành thành công vào tỷ lệ hỏng", next: "doi-dinh-nghia" },
          ],
        },
        "nho-hon": {
          text: "Thay đổi nhỏ nên khi hỏng việc tìm nguyên nhân nhanh và quay lại rẻ. Tần suất tăng, tỷ lệ hỏng giảm thay vì tăng, thời gian khôi phục ngắn lại. Cả bốn con số cùng tiến theo hướng đúng.",
          ending: "good",
        },
        "duyet-them": {
          text: "Vòng duyệt thủ công làm mỗi thay đổi nằm chờ. Người ta dồn nhiều thay đổi vào một lần duyệt cho đỡ mất công, nên lô lớn dần lên. Thời gian từ mã tới sản phẩm dài ra và tỷ lệ hỏng không cải thiện.",
          ending: "bad",
        },
        "doi-dinh-nghia": {
          text: "Tỷ lệ hỏng hạ xuống tức thì trên giấy, vì lần nào hỏng cũng bị loại khỏi phép tính. Định nghĩa trôi đi, các quý không so sánh được với nhau, và đội mất đúng con số cảnh báo họ.",
          ending: "bad",
        },
      },
    },
    {
      type: "feynman",
      title: "Bốn chỉ số, nhìn như lái xe tới một điểm hẹn",
      intro:
        "Một tài xế chỉ nhìn đồng hồ tốc độ sẽ đi rất nhanh và đâm xe. Một tài xế chỉ nhìn phanh sẽ đi mười cây số một giờ và trễ hẹn. Lái giỏi là nhìn cả bốn đồng hồ cùng lúc.",
      columns: ["Chỉ số", "Giống như khi lái xe", "Nếu chỉ nhìn một mình nó"],
      rows: [
        [
          "Tần suất phát hành",
          "Số chuyến đi mỗi ngày",
          "Đội đẩy mọi thứ ra nhanh, tỷ lệ hỏng tăng, mà con số được đo vẫn đẹp",
        ],
        [
          "Thời gian từ mã tới sản phẩm",
          "Thời gian từ khi nổ máy tới khi tới nơi",
          "Đội cắt bớt bước kiểm cho nhanh và lại gây hỏng nhiều hơn",
        ],
        [
          "Tỷ lệ thay đổi gây hỏng",
          "Số lần va chạm trên mỗi trăm chuyến",
          "Đội gom thay đổi lại cho chắc, mỗi lần to hơn, nên khi hỏng càng khó tìm nguyên nhân",
        ],
        [
          "Thời gian khôi phục",
          "Thời gian từ lúc va chạm tới lúc đi tiếp",
          "Đội né mọi thay đổi và không đủ thực hành quay lại, nên một lần hỏng kéo rất dài",
        ],
      ],
      oneLiner:
        "Mỗi cặp là đối trọng của cặp kia: đi nhanh hơn mà không hỏng hơn mới là đội làm việc tốt, nên bốn con số chỉ có nghĩa khi nhìn cùng lúc.",
    },
  ],

  "loi-lan-truyen-giua-cac-dich-vu": [
    {
      type: "exercise",
      language: "python",
      title: "Tính số luồng bị giữ khi dịch vụ ở dưới chậm, rồi đặt thời gian chờ",
      task: "Dịch vụ A có 100 luồng, nhận 50 yêu cầu mỗi giây, mỗi yêu cầu chờ dịch vụ B. Số luồng đang bận bằng tốc độ nhân với thời gian chờ. Hãy giới hạn thời gian chờ ở 0,5 giây (yêu cầu quá hạn bị cắt và trả lỗi sớm) rồi in số luồng bận khi B chậm 0,1 giây, 1 giây và 5 giây. Mã khởi đầu chưa đặt giới hạn nên khi B chậm 5 giây A cạn luồng.",
      starter: `so_luong = 100
toc_do = 50
gioi_han = 0.5
for cham in [0.1, 1.0, 5.0]:
    cho = cham
    ban = toc_do * cho
    tinh_trang = "cạn" if ban > so_luong else "ổn"
    print(f"B chậm {cham}s: {ban:.0f}/{so_luong} luồng bận - {tinh_trang}")`,
      solution: `so_luong = 100
toc_do = 50
gioi_han = 0.5
for cham in [0.1, 1.0, 5.0]:
    cho = min(cham, gioi_han)
    ban = toc_do * cho
    tinh_trang = "cạn" if ban > so_luong else "ổn"
    print(f"B chậm {cham}s: {ban:.0f}/{so_luong} luồng bận - {tinh_trang}")`,
      expectedOutput: `B chậm 0.1s: 5/100 luồng bận - ổn
B chậm 1.0s: 25/100 luồng bận - ổn
B chậm 5.0s: 25/100 luồng bận - ổn`,
      hints: [
        "Thời gian một luồng bị giữ là min(thời gian B thật sự chậm, giới hạn). Biến gioi_han đã khai báo nhưng chưa được dùng.",
        "Tăng số luồng lên 300 cũng làm dòng cuối hết cạn, nhưng chỉ dời thời điểm cạn ra xa hơn. Thời gian chờ ngắn mới chặn đúng đường lan.",
      ],
    },
    {
      type: "chart",
      title: "Dịch vụ ở dưới chậm dần thì luồng ở trên cạn khi nào",
      caption:
        "Số liệu minh hoạ, tính theo số luồng bận bằng tốc độ nhân với thời gian chờ. Kéo thời gian chờ tối đa để thấy nó chặn số luồng bận, và kéo số luồng để thấy tăng luồng chỉ dời điểm cạn.",
      kind: "line",
      xLabel: "Độ chậm của dịch vụ ở dưới (giây)",
      yLabel: "Số luồng đang bận",
      x: { from: 0, to: 5, step: 0.5 },
      params: [
        { id: "r", label: "Tốc độ yêu cầu", min: 10, max: 100, step: 5, value: 50, unit: " yêu cầu/giây" },
        { id: "t", label: "Thời gian chờ tối đa", min: 0.2, max: 5, step: 0.1, value: 0.5, unit: " giây" },
        { id: "n", label: "Số luồng của dịch vụ ở trên", min: 20, max: 300, step: 10, value: 100 },
      ],
      series: [
        { label: "Luồng bận, không giới hạn thời gian chờ", expr: "r*x" },
        { label: "Luồng bận, có thời gian chờ tối đa", expr: "r*min(x,t)" },
        { label: "Số luồng hiện có", expr: "n" },
      ],
    },
  ],

  "kiem-thu-tai-va-ke-hoach-dung-luong": [
    {
      type: "exercise",
      language: "javascript",
      title: "Tìm phần cạn trước, đừng nâng cấu hình bộ vi xử lý",
      task: "Mỗi tài nguyên cho tối đa số yêu cầu mỗi giây bằng số lượng chia cho thời gian một yêu cầu giữ nó. Phần cạn trước là phần có giới hạn THẤP nhất. In giới hạn của từng tài nguyên rồi in phần cạn trước. Mã khởi đầu đang chọn phần có giới hạn cao nhất.",
      starter: `const taiNguyen = [
  { ten: "Bộ vi xử lý", so: 8, giu: 0.002 },
  { ten: "Luồng xử lý", so: 64, giu: 0.02 },
  { ten: "Kết nối cơ sở dữ liệu", so: 50, giu: 0.025 },
];
for (const t of taiNguyen) console.log(t.ten + ": " + Math.round(t.so / t.giu) + " yêu cầu/giây");
const can = taiNguyen.reduce((a, b) => (a.so / a.giu > b.so / b.giu ? a : b));
console.log("Cạn trước: " + can.ten);`,
      solution: `const taiNguyen = [
  { ten: "Bộ vi xử lý", so: 8, giu: 0.002 },
  { ten: "Luồng xử lý", so: 64, giu: 0.02 },
  { ten: "Kết nối cơ sở dữ liệu", so: 50, giu: 0.025 },
];
for (const t of taiNguyen) console.log(t.ten + ": " + Math.round(t.so / t.giu) + " yêu cầu/giây");
const can = taiNguyen.reduce((a, b) => (a.so / a.giu < b.so / b.giu ? a : b));
console.log("Cạn trước: " + can.ten);`,
      expectedOutput: `Bộ vi xử lý: 4000 yêu cầu/giây
Luồng xử lý: 3200 yêu cầu/giây
Kết nối cơ sở dữ liệu: 2000 yêu cầu/giây
Cạn trước: Kết nối cơ sở dữ liệu`,
      hints: [
        "Phần cạn trước là phần chạm trần sớm nhất khi tải tăng, tức giới hạn nhỏ nhất. Đổi dấu so sánh trong reduce.",
        "Nâng cấu hình máy chỉ nâng dòng đầu. Hệ thống vẫn dừng ở 2000 yêu cầu/giây trong khi mức dùng bộ vi xử lý còn thấp.",
      ],
    },
    {
      type: "flow",
      title: "Một buổi kiểm thử tải có nghĩa, từ dữ liệu tới chỗ cần tiêu tiền",
      steps: [
        {
          label: "Chuẩn bị dữ liệu có hình dạng thật",
          detail:
            "Dữ liệu lệch, có ngoại lệ, lớn như thật. Một truy vấn chạy tốt trên dữ liệu phân bố đều có thể sập khi gặp một khách hàng có nhiều đơn gấp trăm lần các khách khác.",
        },
        {
          label: "Dùng hình dạng tải thật, có đỉnh",
          detail:
            "Lưu lượng thật không đều mà có đỉnh vào giờ khuyến mãi. Phát lại đỉnh đó thay vì một đường phẳng, vì đỉnh mới là thứ hệ thống phải chịu được.",
        },
        {
          label: "Tăng dần tải và quan sát cách hỏng",
          detail:
            "Chậm dần đều cho bạn thời gian phản ứng; sập đột ngột thì không có khoảng nào cả. Câu hỏi hỏng theo cách nào quan trọng hơn con số chịu được bao nhiêu.",
        },
        {
          label: "Tìm phần cạn trước",
          detail:
            "Thường là số kết nối cơ sở dữ liệu, hàng đợi hoặc số luồng chứ ít khi là bộ vi xử lý. Nâng cấu hình máy trong khi kết nối cơ sở dữ liệu là nút thắt chỉ đốt tiền.",
        },
        {
          label: "Đo lại sau mỗi lần phát hành",
          detail:
            "Một lần phát hành là con số chịu được bao nhiêu có thể đổi. Hiểu biết về cách hỏng thì bền hơn con số, nhưng vẫn nên kiểm lại khi kiến trúc thay đổi.",
        },
      ],
    },
  ],

  "du-phong-bao-nhieu-la-du": [
    {
      type: "scenario",
      title: "Duyệt thiết kế dự phòng cho cơ sở dữ liệu thanh toán",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội đề nghị thêm bản sao cơ sở dữ liệu ở một vùng thứ hai, có cơ chế tự động chuyển khi bản chính hỏng. Bạn là người duyệt thiết kế. Bạn trả lời thế nào?",
          choices: [
            { label: "Duyệt luôn, thêm bản sao thì hệ thống chỉ có thể chắc hơn", next: "duyet-luon" },
            { label: "Hỏi lớp này chống sự cố cụ thể nào và đã từng xảy ra chưa", next: "cau-hoi-1" },
          ],
        },
        "duyet-luon": {
          text: "Sáu tháng sau, một đợt nghẽn mạng ngắn làm cơ chế chuyển đổi kích hoạt trong khi bản chính vẫn khoẻ. Cuộc chuyển đổi gây gián đoạn dài hơn nhiều so với đợt nghẽn ban đầu. Chính phần logic bị coi là hiển nhiên mới là nguyên nhân gốc.",
          ending: "bad",
        },
        "cau-hoi-1": {
          text: "Đội trả lời: chống được sự cố mất cả khu vực. Sự cố đó chưa xảy ra với hệ thống này, còn sự cố đã gặp hai lần là một máy chết. Bạn đề xuất gì?",
          choices: [
            { label: "Dùng nhiều bản trong một khu, vì sự cố đã gặp là máy chết", next: "cau-hoi-2" },
            { label: "Vẫn làm nhiều vùng cho tương lai và tính chuyện đồng bộ sau", next: "nhieu-vung" },
          ],
        },
        "nhieu-vung": {
          text: "Sau khi chạy, đội mới thấy phần đắt không phải máy chủ mà là dữ liệu. Hoặc mỗi giao dịch phải chờ đồng bộ qua khoảng cách xa, hoặc chấp nhận dữ liệu hai vùng lệch nhau tạm thời. Đó là quyết định kiến trúc đáng ra phải đưa ra trước khi thêm vùng.",
          ending: "bad",
        },
        "cau-hoi-2": {
          text: "Nhiều bản trong một khu chống đúng sự cố bạn đã gặp với chi phí thấp. Giờ còn lại cách cơ chế chuyển được kích hoạt.",
          choices: [
            { label: "Chuyển sau vài lần kiểm tra hỏng liên tiếp, và thử kích hoạt có kế hoạch", next: "tot" },
            { label: "Chuyển ngay sau một lần kiểm tra hỏng để phản ứng nhanh nhất", next: "chuyen-qua-lai" },
          ],
        },
        tot: {
          text: "Cơ chế chuyển không bị nghẽn mạng ngắn đánh lừa và đã được kích hoạt thử trong giờ hành chính. Lớp dự phòng nay chống đúng sự cố đã xảy ra và đã được chứng minh hoạt động, thay vì chỉ tạo cảm giác an toàn.",
          ending: "good",
        },
        "chuyen-qua-lai": {
          text: "Một lần kiểm tra lỗi thoáng qua làm hệ thống chuyển sang bản phụ, rồi lại chuyển ngược khi bản chính trả lời. Hệ thống chuyển qua chuyển lại, mỗi lần gây gián đoạn. Cơ chế tạo ra sự cố nó vốn được thêm vào để tránh.",
          ending: "bad",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba mức dự phòng, nhìn như mở tiệm bánh",
      intro:
        "Tiệm bánh sợ có ngày không mở được cửa. Cách phòng khác nhau về giá: thuê thêm thợ trong tiệm, mở thêm chi nhánh cùng thành phố, hoặc mở thêm một tiệm ở thành phố khác.",
      columns: ["Mức dự phòng", "Giống như", "Chống được gì, và giá phải trả"],
      rows: [
        [
          "Nhiều bản trong một khu",
          "Hai thợ cùng làm trong một tiệm: một người nghỉ, tiệm vẫn mở",
          "Chống một tiến trình hoặc một máy chết. Rẻ nhất, nhưng vẫn phải có người quyết khi nào đổi thợ",
        ],
        [
          "Nhiều khu trong một vùng",
          "Hai chi nhánh cùng thành phố: mất điện một khu, khách sang chi nhánh kia",
          "Chống sự cố mức toà nhà. Độ trễ giữa các khu vẫn rất thấp nên dữ liệu dễ đồng bộ",
        ],
        [
          "Nhiều vùng",
          "Hai tiệm ở hai thành phố, sổ sách phải đối chiếu qua đường dài",
          "Chống sự cố mức khu vực. Phần đắt là dữ liệu: chờ đồng bộ qua khoảng cách xa hoặc chấp nhận lệch tạm thời",
        ],
      ],
      oneLiner:
        "Mỗi lớp dự phòng chống đúng một loại sự cố, nên hãy hỏi nó chống sự cố nào, và đã từng được kích hoạt thử chưa.",
    },
  ],

  "phu-thuoc-ben-ngoai-va-cam-ket-cua-ho": [
    {
      type: "exercise",
      language: "python",
      title: "Tính trần độ sẵn sàng của chính bạn, rồi đưa dịch vụ gửi thư ra khỏi đường chính",
      task: "Trần độ sẵn sàng của một yêu cầu bằng tích cam kết của các dịch vụ nằm trên đường xử lý chính. Mã khởi đầu in cùng một con số cho cả hai dòng. Hãy đưa dịch vụ gửi thư vào hàng đợi, tức bỏ nó khỏi phép nhân ở dòng thứ hai, rồi xem mục tiêu 99,9% có đạt được không. Số cam kết ở đây là minh hoạ.",
      starter: `phu_thuoc = {"định danh": 99.95, "thanh toán": 99.9, "kho": 99.9, "gửi thư": 99.5}
tran = 1.0
for tl in phu_thuoc.values():
    tran *= tl / 100
print(f"Gửi thư trên đường chính: {tran * 100:.2f}%")
tran2 = 1.0
for ten, tl in phu_thuoc.items():
    tran2 *= tl / 100
print(f"Sau khi đưa gửi thư vào hàng đợi: {tran2 * 100:.2f}%")
dat = "có" if tran2 * 100 >= 99.9 else "không"
print(f"Mục tiêu 99.9% đạt được: {dat}")`,
      solution: `phu_thuoc = {"định danh": 99.95, "thanh toán": 99.9, "kho": 99.9, "gửi thư": 99.5}
tran = 1.0
for tl in phu_thuoc.values():
    tran *= tl / 100
print(f"Gửi thư trên đường chính: {tran * 100:.2f}%")
tran2 = 1.0
for ten, tl in phu_thuoc.items():
    if ten != "gửi thư":
        tran2 *= tl / 100
print(f"Sau khi đưa gửi thư vào hàng đợi: {tran2 * 100:.2f}%")
dat = "có" if tran2 * 100 >= 99.9 else "không"
print(f"Mục tiêu 99.9% đạt được: {dat}")`,
      expectedOutput: `Gửi thư trên đường chính: 99.25%
Sau khi đưa gửi thư vào hàng đợi: 99.75%
Mục tiêu 99.9% đạt được: không`,
      hints: [
        "Bỏ qua dịch vụ gửi thư trong vòng lặp thứ hai bằng một điều kiện if trên tên.",
        "Dù đã nâng trần lên 99,75% thì mục tiêu 99,9% vẫn không đạt được. Phép nhân cho thấy phải hạ mục tiêu hoặc bỏ thêm phụ thuộc khỏi đường chính.",
      ],
    },
    {
      type: "chart",
      title: "Trần độ sẵn sàng giảm theo số phụ thuộc trên đường chính",
      caption:
        "Số liệu minh hoạ, giả sử mọi dịch vụ cam kết cùng một mức và cam kết đó đúng với con số bạn tự đo. Kéo mức cam kết và nhìn đường 'trần của bạn' luôn nằm dưới đường cam kết, càng thấp khi có thêm mắt xích.",
      kind: "line",
      xLabel: "Số dịch vụ nằm trên đường xử lý chính",
      yLabel: "Độ sẵn sàng (%)",
      x: { from: 1, to: 10, step: 1 },
      params: [{ id: "a", label: "Cam kết của mỗi dịch vụ", min: 99, max: 99.99, step: 0.01, value: 99.9, unit: "%" }],
      series: [
        { label: "Trần của bạn", expr: "100*(a/100)^x" },
        { label: "Cam kết của một dịch vụ", expr: "a" },
      ],
    },
  ],

  "thay-doi-la-nguyen-nhan-pho-bien-nhat": [
    {
      type: "exercise",
      language: "javascript",
      title: "Lập danh sách ứng viên từ mọi loại thay đổi trong hai giờ trước sự cố",
      task: "Mỗi thay đổi có loại, mô tả và số phút trước thời điểm hỏng. Chọn MỌI loại thay đổi trong vòng 120 phút, in từ gần nhất tới xa nhất theo mẫu 'N phút trước - [loại] mô tả', rồi in số ứng viên. Mã khởi đầu chỉ nhìn vào bản phát hành mã.",
      starter: `const thayDoi = [
  { loai: "mã", moTa: "Phát hành bản 2.14", truoc: 300 },
  { loai: "cấu hình", moTa: "Hạ thời gian chờ kết nối từ 30 xuống 3 giây", truoc: 55 },
  { loai: "dữ liệu", moTa: "Bảng đơn hàng vượt ngưỡng 10 triệu dòng", truoc: 90 },
  { loai: "nhà cung cấp", moTa: "Cổng thanh toán đổi phiên bản API", truoc: 20 },
  { loai: "thời gian", moTa: "Chứng chỉ của dịch vụ định danh hết hạn", truoc: 5 },
];
const ungVien = thayDoi.filter((t) => t.loai === "mã" && t.truoc <= 120).sort((a, b) => a.truoc - b.truoc);
for (const t of ungVien) console.log(t.truoc + " phút trước - [" + t.loai + "] " + t.moTa);
console.log("Ứng viên: " + ungVien.length);`,
      solution: `const thayDoi = [
  { loai: "mã", moTa: "Phát hành bản 2.14", truoc: 300 },
  { loai: "cấu hình", moTa: "Hạ thời gian chờ kết nối từ 30 xuống 3 giây", truoc: 55 },
  { loai: "dữ liệu", moTa: "Bảng đơn hàng vượt ngưỡng 10 triệu dòng", truoc: 90 },
  { loai: "nhà cung cấp", moTa: "Cổng thanh toán đổi phiên bản API", truoc: 20 },
  { loai: "thời gian", moTa: "Chứng chỉ của dịch vụ định danh hết hạn", truoc: 5 },
];
const ungVien = thayDoi.filter((t) => t.truoc <= 120).sort((a, b) => a.truoc - b.truoc);
for (const t of ungVien) console.log(t.truoc + " phút trước - [" + t.loai + "] " + t.moTa);
console.log("Ứng viên: " + ungVien.length);`,
      expectedOutput: `5 phút trước - [thời gian] Chứng chỉ của dịch vụ định danh hết hạn
20 phút trước - [nhà cung cấp] Cổng thanh toán đổi phiên bản API
55 phút trước - [cấu hình] Hạ thời gian chờ kết nối từ 30 xuống 3 giây
90 phút trước - [dữ liệu] Bảng đơn hàng vượt ngưỡng 10 triệu dòng
Ứng viên: 4`,
      hints: [
        "Điều kiện lọc chỉ nên xét thời gian: truoc <= 120. Loại thay đổi không phải điều kiện.",
        "Bản phát hành mã là loại ai cũng kiểm. Bốn loại còn lại không ai gọi là thay đổi, nhưng hệ thống vẫn có thể hỏng vì chúng.",
      ],
    },
    {
      type: "flow",
      title: "Từ lúc hỏng tới ứng viên số một: câu hỏi vừa có gì thay đổi",
      steps: [
        {
          label: "Chốt thời điểm hệ thống thật sự bắt đầu hỏng",
          detail:
            "Lấy từ biểu đồ phía người dùng, không phải từ lúc cảnh báo kêu. Mốc này quyết định cửa sổ thời gian bạn sẽ đi tìm thay đổi.",
        },
        {
          label: "Mở dòng thời gian gộp mọi loại thay đổi",
          detail:
            "Mã, cấu hình, dữ liệu, phía nhà cung cấp và những thứ do thời gian. Nếu mỗi loại nằm ở một công cụ riêng thì bạn sẽ chỉ nhìn vào loại có sẵn trong tay.",
        },
        {
          label: "Duyệt đủ năm loại, không chỉ phát hành mã",
          detail:
            "Một thời gian chờ bị hạ ở cấu hình, một chứng chỉ hết hạn, một bảng vượt ngưỡng khiến truy vấn đổi kế hoạch thực thi. Không ai phát hành gì mà hệ thống vẫn hỏng.",
        },
        {
          label: "Xếp theo độ gần thời điểm hỏng",
          detail:
            "Thay đổi nằm sát mốc hỏng nhất là ứng viên số một. Với mỗi ứng viên, hỏi nó có quay lại hoặc tắt được rẻ không rồi thử cái rẻ nhất trước.",
        },
        {
          label: "Không có ứng viên thì mới tìm hướng khác",
          detail:
            "Một hệ thống không tự nhiên hỏng, nên danh sách trống nghĩa là có thay đổi chưa được ghi lại. Khi đó mới chuyển sang dấu vết và nhật ký.",
        },
      ],
    },
  ],

  "ba-loai-tin-hieu-so-lieu-nhat-ky-dau-vet": [
    {
      type: "exercise",
      language: "python",
      title: "Đọc dấu vết của một yêu cầu chậm để biết mở nhật ký của dịch vụ nào",
      task: "Dấu vết của một yêu cầu đặt hàng chậm gồm các chặng (dịch vụ, mili giây). Tìm chặng chậm nhất, tính nó chiếm bao nhiêu phần trăm tổng thời gian, rồi in dịch vụ cần mở nhật ký. Mã khởi đầu đang chọn chặng nhanh nhất nên bạn sẽ mở nhật ký sai dịch vụ.",
      starter: `chang = [("cổng", 12), ("đơn hàng", 40), ("kho", 35), ("thanh toán", 1650), ("thư", 20)]
tong = sum(ms for ten, ms in chang)
ten, ms = min(chang, key=lambda c: c[1])
print(f"Tổng: {tong} ms")
print(f"Chặng chậm nhất: {ten} ({ms} ms, {ms / tong * 100:.0f}%)")
print(f"Mở nhật ký của: {ten}")`,
      solution: `chang = [("cổng", 12), ("đơn hàng", 40), ("kho", 35), ("thanh toán", 1650), ("thư", 20)]
tong = sum(ms for ten, ms in chang)
ten, ms = max(chang, key=lambda c: c[1])
print(f"Tổng: {tong} ms")
print(f"Chặng chậm nhất: {ten} ({ms} ms, {ms / tong * 100:.0f}%)")
print(f"Mở nhật ký của: {ten}")`,
      expectedOutput: `Tổng: 1757 ms
Chặng chậm nhất: thanh toán (1650 ms, 94%)
Mở nhật ký của: thanh toán`,
      hints: [
        "Cần chặng có số mili giây lớn nhất, nên dùng max thay cho min.",
        "Dấu vết trả lời chặng nào; nhật ký của đúng dịch vụ đó mới trả lời vì sao. Mở nhật ký của cả năm dịch vụ là đọc rất nhiều dòng mà chưa biết tìm gì.",
      ],
    },
    {
      type: "flow",
      title: "Điều tra một yêu cầu đặt hàng chậm theo thứ tự số liệu, dấu vết, nhật ký",
      steps: [
        {
          label: "Số liệu cho biết Ở ĐÂU",
          detail:
            "Biểu đồ phân vị 99 của trang đặt hàng vọt lên lúc 14:10, các trang khác bình thường. Con số đã tổng hợp nên rẻ, và nó cho bạn biết nên nhìn vào luồng đặt hàng.",
        },
        {
          label: "Lấy mã định danh của một yêu cầu chậm",
          detail:
            "Dấu vết được lấy mẫu ưu tiên yêu cầu chậm và yêu cầu lỗi, nên bạn có sẵn nhiều yêu cầu chậm để chọn. Lấy ngẫu nhiên một phần trăm gần như không bao giờ cho bạn yêu cầu chậm nhất.",
        },
        {
          label: "Dấu vết cho biết CHẶNG NÀO",
          detail:
            "Dấu vết của yêu cầu đó cho thấy hầu hết thời gian nằm ở lượt gọi thanh toán, còn các chặng khác chỉ vài chục mili giây. Bạn thu hẹp từ năm dịch vụ xuống một.",
        },
        {
          label: "Nhật ký cho biết VÌ SAO",
          detail:
            "Lọc nhật ký của dịch vụ thanh toán theo đúng mã định danh. Nhờ mã đi theo yêu cầu qua cả ba loại tín hiệu, bạn không phải nối các kho rời bằng tay theo dấu thời gian.",
        },
        {
          label: "Biến điều vừa học thành phép đo",
          detail:
            "Nếu lượt gọi thanh toán chậm thầm lặng, hãy thêm phép đo và cảnh báo cho nó. Lần sau số liệu sẽ chỉ thẳng tới đó.",
        },
      ],
    },
  ],

  "case-mot-su-co-that": [
    {
      type: "scenario",
      title: "Người dùng kêu chậm, nhưng biểu đồ nói mọi thứ bình thường",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Nhiều người dùng báo trang đặt hàng chậm. Bảng theo dõi của đội cho thấy thời gian phản hồi trung bình 200 ms, như cả tuần qua. Bạn làm gì trước?",
          choices: [
            { label: "Tin bảng theo dõi, trả lời người dùng là hệ thống đang ổn", next: "tin-bang" },
            { label: "Nghi phép đo trước, xem phân vị 95 và 99 đo từ phía người dùng", next: "phan-vi" },
            { label: "Mở nhật ký của từng dịch vụ và đọc từ đầu để tìm bất thường", next: "doc-het" },
          ],
        },
        "tin-bang": {
          text: "Người dùng tiếp tục phản ánh và đội cho rằng họ nhầm. Thật ra phép đo từ phía máy chủ bằng trung bình che đi phần đuôi, nên một nhóm người dùng vẫn chờ rất lâu và không ai nhìn thấy.",
          ending: "bad",
        },
        "doc-het": {
          text: "Nhật ký có hàng triệu dòng bình thường lẫn trong số ít dòng bất thường. Bạn đọc nhiều giờ mà chưa biết mình đang tìm gì, vì chưa thu hẹp được ở đâu và chặng nào.",
          ending: "bad",
        },
        "phan-vi": {
          text: "Phân vị 95 cho thấy 5% yêu cầu mất tới tám giây. Trung bình vẫn 200 ms, đúng như tuần qua, vì phần đuôi quá nhỏ để kéo nó lên. Giờ bạn cần thu hẹp phạm vi.",
          choices: [
            { label: "Hỏi vừa có gì đổi: mã, cấu hình, dữ liệu, nhà cung cấp", next: "thay-doi" },
            { label: "Khởi động lại toàn bộ dịch vụ để xem có khỏi không", next: "khoi-dong-lai" },
          ],
        },
        "khoi-dong-lai": {
          text: "Trong mười phút khởi động lại, người dùng mất luôn dịch vụ, còn các bằng chứng trong bộ nhớ biến mất. Khi chạy lại, phần đuôi chậm xuất hiện trở lại sau vài phút và bạn vẫn chưa biết vì sao.",
          ending: "bad",
        },
        "thay-doi": {
          text: "Dòng thời gian gộp mọi loại thay đổi cho thấy không có bản phát hành mã nào, nhưng nhà cung cấp thẻ vừa đổi hành vi một điểm truy cập. Bạn cần biết chặng nào của yêu cầu bị ảnh hưởng.",
          choices: [
            { label: "Quay lại bản phát hành gần nhất vì mã là nguyên nhân thường gặp", next: "quay-lai-ma" },
            { label: "Mở dấu vết của yêu cầu chậm, rồi mới mở nhật ký của dịch vụ đó", next: "dau-vet" },
          ],
        },
        "quay-lai-ma": {
          text: "Quay lại tốn thời gian và rủi ro, nhưng không đổi được gì vì không có bản phát hành nào gây ra chuyện này. Phần đuôi chậm vẫn y nguyên, và bạn đã mất mười lăm phút để xác nhận điều bảng thay đổi đã nói sẵn.",
          ending: "bad",
        },
        "dau-vet": {
          text: "Dấu vết chỉ ra gần hết thời gian nằm ở lượt gọi nhà cung cấp thẻ, và nhật ký của đúng dịch vụ đó xác nhận. Bạn đặt thời gian chờ ngắn và cầu dao cho lượt gọi này. Biên bản ghi cả ba lớp thủng: phép đo che đuôi, cảnh báo bị tắt, tự khôi phục chưa từng được thử.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Trung bình vẫn bình thường trong khi một nhóm người dùng chờ rất lâu",
      caption:
        "Số liệu minh hoạ: phần lớn yêu cầu mất 100 ms, phần đuôi mất 8000 ms. Kéo phần trăm yêu cầu rơi vào đuôi và so đường trung bình với thời gian người dùng thuộc đuôi phải chờ.",
      kind: "line",
      xLabel: "Phần trăm yêu cầu rơi vào đuôi (%)",
      yLabel: "Thời gian (ms)",
      x: { from: 0, to: 10, step: 1 },
      params: [
        { id: "b", label: "Thời gian yêu cầu bình thường", min: 50, max: 300, step: 10, value: 100, unit: " ms" },
        { id: "d", label: "Thời gian yêu cầu thuộc đuôi", min: 1000, max: 10000, step: 500, value: 8000, unit: " ms" },
      ],
      series: [
        { label: "Trung bình", expr: "b*(1-x/100)+d*x/100" },
        { label: "Người dùng thuộc đuôi phải chờ", expr: "d" },
      ],
    },
  ],

  "tong-on-do-tin-cay": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Chấm bản kế hoạch độ tin cậy do một đội soạn",
      task: "Bản kế hoạch của một đội có sáu đoạn. Bấm vào những đoạn đi ngược cách nghĩ mà chặng này đã dạy, rồi nộp.",
      segments: [
        {
          text: "Mục tiêu: 99,99% cho mọi dịch vụ, vì độ tin cậy càng cao càng tốt.",
          error:
            "Mỗi con số chín thêm vào đều tốn tiền và thời gian lẽ ra dành cho tính năng. Câu hỏi đúng là mức nào ĐỦ cho dịch vụ này, đó là quyết định về sản phẩm chứ không phải câu hỏi cao hơn bao nhiêu.",
        },
        {
          text: "Đo tỷ lệ yêu cầu thành công từ phía người dùng, theo phân vị. Mọi bước sau đều dựa trên con số này.",
        },
        {
          text: "Cảnh báo cho bộ nhớ, ổ đĩa và CPU của từng máy, gửi cho cả đội để ai cũng nắm.",
          error:
            "Cảnh báo theo nguyên nhân thì danh sách phình ra mãi và nhiều cảnh báo không dẫn tới hành động nào. Hãy cảnh báo theo triệu chứng người dùng thấy, và chỉ cho những thứ phải làm ngay.",
        },
        {
          text: "Khi ngân sách lỗi còn thì phát hành nhanh; khi đã hết thì dừng tính năng mới và sửa độ tin cậy.",
        },
        {
          text: "Bản sao lưu và chuyển đổi dự phòng đã cấu hình xong nên coi như đã an toàn, không cần thử.",
          error:
            "Cơ chế chưa từng được kích hoạt thử vẫn được tính vào khi đánh giá rủi ro, nên nó tạo cảm giác an toàn mà không có sự an toàn. Nó tệ hơn không có gì, vì phần còn lại của hệ thống được thiết kế dựa trên giả định nó chạy.",
        },
        {
          text: "Ba vai xử lý sự cố và tiêu chí cảnh báo được thoả thuận trong một buổi họp thường, không đợi tới lúc có sự cố.",
        },
      ],
    },
    {
      type: "flow",
      title: "Chuỗi độ tin cậy của một trang thanh toán, từng bước nối vào nhau",
      steps: [
        {
          label: "Đo từ phía người dùng, theo phân vị",
          detail:
            "Tỷ lệ đơn đặt hàng thành công và độ trễ phân vị 99 của trang thanh toán, đo từ trình duyệt hoặc cổng vào. Nếu bước này đo từ phía máy chủ bằng trung bình, bốn bước sau đều đứng trên số sai.",
        },
        {
          label: "Chọn mục tiêu như một quyết định sản phẩm",
          detail:
            "Trang thanh toán cần mức tin cậy cao hơn trang xem lịch sử mua. Mục tiêu nội bộ đặt chặt hơn cam kết với khách hàng, để còn khoảng đệm.",
        },
        {
          label: "Ngân sách lỗi quyết định hằng ngày",
          detail:
            "Còn ngân sách thì cho phép phát hành tính năng mới. Hết thì cả đội chuyển sang sửa độ tin cậy, không cần một cuộc tranh luận mỗi lần.",
        },
        {
          label: "Cảnh báo theo triệu chứng, chỉ cho việc phải làm ngay",
          detail:
            "Tốc độ tiêu ngân sách vượt mức mới đánh thức người trực. Mỗi cảnh báo đi kèm hướng dẫn xử lý, còn thứ gì kêu mà không ai làm gì thì xoá.",
        },
        {
          label: "Tự động hoá và kích hoạt thử",
          detail:
            "Cầu dao, thử lại có giãn cách và chuyển đổi dự phòng được kích hoạt thử có chủ đích trong giờ làm việc. Cơ chế chưa chứng minh được là hoạt động thì chưa được tính vào độ tin cậy.",
        },
      ],
    },
  ],
};
