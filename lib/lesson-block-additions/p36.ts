import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 36. Một người viết cho một tệp.
export const P36_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── AI trong sản phẩm: dự án nhỏ ───────────────────────────────────────
  "du-an-nho-hieu-mot-kho-ma-la": [
    {
      type: "exercise",
      language: "python",
      title: "Lần theo đường đi từ màn hình tới dữ liệu",
      task:
        "Từ điển goi cho biết hàm nào gọi hàm nào trong một kho mã lạ. Đoạn mã mới đi được một chặng nên bạn mới biết màn hình đơn hàng gọi tinh_tong và dừng ở đó. Sửa để lần theo cho tới hàm cuối cùng không gọi ai nữa, rồi in cả chuỗi và số chặng. Đây là bước ba của dự án: đi theo một đường cụ thể chứ không đọc cả kho.",
      starter:
        "goi = {\n    \"man_hinh_don\": \"tinh_tong\",\n    \"tinh_tong\": \"ap_ma_giam\",\n    \"ap_ma_giam\": \"doc_bang_gia\",\n}\nvi_tri = \"man_hinh_don\"\nduong = [vi_tri]\nduong.append(goi[vi_tri])\nprint(\" -> \".join(duong))\nprint(\"Số chặng:\", len(duong))\n",
      solution:
        "goi = {\n    \"man_hinh_don\": \"tinh_tong\",\n    \"tinh_tong\": \"ap_ma_giam\",\n    \"ap_ma_giam\": \"doc_bang_gia\",\n}\nvi_tri = \"man_hinh_don\"\nduong = [vi_tri]\nwhile vi_tri in goi:\n    vi_tri = goi[vi_tri]\n    duong.append(vi_tri)\nprint(\" -> \".join(duong))\nprint(\"Số chặng:\", len(duong))\n",
      expectedOutput: "man_hinh_don -> tinh_tong -> ap_ma_giam -> doc_bang_gia\nSố chặng: 4",
      hints: [
        "Hàm cuối cùng của đường đi là hàm không còn là khoá trong từ điển goi.",
        "Dùng vòng while vi_tri in goi: nhảy tới hàm kế tiếp rồi thêm nó vào duong.",
      ],
    },
    {
      type: "flow",
      title: "Một buổi làm quen kho mã, với mục tiêu: đổi một dòng chữ trên màn hình thanh toán",
      steps: [
        {
          label: "Bản đồ",
          detail:
            "Bạn hỏi AI kho gồm những phần nào và phần nào gọi phần nào, rồi ghi ra giấy ba bốn khối lớn (giao diện, xử lý đơn, dữ liệu). Chưa đọc hàm nào. Mục đích chỉ là có khung để đặt chi tiết vào sau này.",
        },
        {
          label: "Một thứ cụ thể",
          detail:
            "Chọn dòng chữ Thanh toán ngay trên nút cuối giỏ hàng. Nó hẹp đủ để làm trong một buổi, và đi qua đúng những phần liên quan thay vì cả hệ thống.",
        },
        {
          label: "Lần theo từng chặng",
          detail:
            "Tìm chuỗi chữ đó trong mã, thấy nó nằm trong một thành phần giao diện, rồi hỏi tiếp thành phần ấy được dựng từ đâu. Ở mỗi chặng, bạn mở mã ra đối chiếu với lời AI mô tả chứ không tin lời mô tả.",
        },
        {
          label: "Chỗ mô tả lệch mã",
          detail:
            "AI nói chữ lấy từ tệp ngôn ngữ, nhưng mã thật gắn cứng chuỗi ở một nơi khác. Mã thắng. Chỗ lệch này đáng đọc kỹ nhất, vì nó thường là một bản vá vội hoặc một ngoại lệ có lý do.",
        },
        {
          label: "Đổi một dòng và chạy",
          detail:
            "Sửa chữ thành Đặt hàng, chạy ứng dụng và xem nút đổi đúng chỗ hay không. Mất vài phút, và đó là câu trả lời dứt khoát duy nhất bạn có về việc mình đã hiểu đúng đường đi.",
        },
      ],
    },
  ],

  "du-an-nho-tim-loi-va-kiem-chung": [
    {
      type: "exercise",
      language: "python",
      title: "Ba nhóm, không phải hai",
      task:
        "Mỗi nghi ngờ đã chạy một cách chứng minh: True nghĩa là cách chứng minh cho thấy có vấn đề, False là cho thấy không có, None là kiểm mãi vẫn chưa kết luận được. Đoạn mã đang dồn None vào nhóm giả nên nhóm chưa xác định luôn rỗng. Sửa để mỗi nghi ngờ vào đúng một trong ba nhóm.",
      starter:
        "ket_qua = {\n    \"chia cho 0 khi giỏ hàng rỗng\": True,\n    \"múi giờ làm lệch ngày\": False,\n    \"bấm đúp tạo hai đơn\": None,\n    \"chậm khi mạng yếu\": None,\n}\nthat = []\ngia = []\nchua = []\nfor nghi, kq in ket_qua.items():\n    if kq:\n        that.append(nghi)\n    else:\n        gia.append(nghi)\nprint(\"Thật:\", len(that))\nprint(\"Giả:\", len(gia))\nprint(\"Chưa xác định:\", len(chua))\n",
      solution:
        "ket_qua = {\n    \"chia cho 0 khi giỏ hàng rỗng\": True,\n    \"múi giờ làm lệch ngày\": False,\n    \"bấm đúp tạo hai đơn\": None,\n    \"chậm khi mạng yếu\": None,\n}\nthat = []\ngia = []\nchua = []\nfor nghi, kq in ket_qua.items():\n    if kq is True:\n        that.append(nghi)\n    elif kq is False:\n        gia.append(nghi)\n    else:\n        chua.append(nghi)\nprint(\"Thật:\", len(that))\nprint(\"Giả:\", len(gia))\nprint(\"Chưa xác định:\", len(chua))\n",
      expectedOutput: "Thật: 1\nGiả: 1\nChưa xác định: 2",
      hints: [
        "None và False đều làm điều kiện if sai, nên if kq: else: không phân biệt được chúng.",
        "So sánh bằng is True, is False, và để nhánh else cho những gì còn lại.",
      ],
    },
    {
      type: "flow",
      title: "Từ một nghi ngờ tới một kết luận, không nhờ AI gật đầu",
      steps: [
        {
          label: "Danh sách nghi ngờ",
          detail:
            "AI liệt kê tám chỗ có thể lỗi trong hàm tính giảm giá, trong vài giây. Đây là phần dễ và là phần mô hình làm nhanh nhất, nên đừng coi nó là phần lớn công việc.",
        },
        {
          label: "Cách chứng minh cho từng cái",
          detail:
            "Với nghi ngờ mã giảm giá cộng dồn, cách chứng minh là áp hai mã cùng lúc trong môi trường thử và xem tổng tiền. Chọn việc làm trong vài phút và cho kết quả dứt khoát, không phải kết quả cần diễn giải.",
        },
        {
          label: "Tự chạy",
          detail:
            "Bạn chạy, không hỏi lại AI rằng nghi ngờ đó có đúng không. Nghi ngờ đã nằm trong ngữ cảnh nên câu trả lời kế tiếp sẽ nhất quán với nó, tức là bạn sẽ nhận được một câu đồng ý.",
        },
        {
          label: "Phân nhóm",
          detail:
            "Tổng tiền âm khi áp hai mã: thật, đưa vào danh sách cần sửa. Làm tròn cho đúng như mong đợi: giả, bỏ đi và không thêm mã phòng thủ. Kiểm mãi mà phụ thuộc dữ liệu thật mình chưa có: chưa xác định.",
        },
        {
          label: "Ghi nhóm thứ ba",
          detail:
            "Một dòng cho mỗi mục chưa xác định, kèm lý do chưa kết luận được và thứ còn thiếu để kiểm. Người sau đọc sẽ biết chỗ đó đã được xem, chứ không phải chưa ai nhìn tới.",
        },
      ],
    },
  ],

  "du-an-nho-viet-tai-lieu-mot-trang": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ AI soạn trang tài liệu, giữ cho bốn phần vẫn là của bạn",
      task:
        "Bạn vừa hiểu xong một kho mã quản lý đơn hàng và có ghi chú về những chỗ mình từng hiểu nhầm. Lắp prompt để AI soạn trang tài liệu mà hai phần có giá trị nhất không bị bịa.",
      parts: [
        {
          id: "gioi-han",
          label: "Độ dài và cấu trúc",
          options: [
            {
              text: "Viết thật đầy đủ về kho mã này, chi tiết nhất có thể",
              feedback:
                "Không có giới hạn thì ra mười trang chủ yếu kể mã đang làm gì, phần người sau đọc mã cũng suy ra được. Chẳng ai quyết định cái gì đáng giữ.",
            },
            {
              text:
                "Đúng một trang, bốn phần: làm gì, muốn sửa thì vào đâu, vì sao làm thế này, bẫy nằm ở đâu",
              good: true,
              feedback:
                "Giới hạn buộc phải chọn, và bốn phần chỉ rõ chỗ nào AI viết được từ mã, chỗ nào cần hiểu biết của bạn.",
            },
            {
              text: "Viết ngắn thôi, vài dòng mô tả chức năng chính là đủ",
              feedback:
                "Ngắn nhưng chỉ có phần làm gì, tức đúng phần dễ nhất. Hai phần về lý do và bẫy, vốn có giá trị nhất, biến mất.",
            },
          ],
        },
        {
          id: "ly-do",
          label: "Phần Vì sao làm thế này",
          options: [
            {
              text: "Tự suy ra lý do của từng quyết định thiết kế trong mã",
              feedback:
                "Lý do không nằm trong mã. AI sẽ viết ra những lý do nghe hợp lý nhưng là suy đoán, và một lý do bịa còn tệ hơn để trống.",
            },
            {
              text: "Chỉ dùng lý do tôi đưa dưới đây; chỗ nào tôi không nêu thì ghi: chưa rõ lý do",
              good: true,
              feedback:
                "Dòng chưa rõ lý do là thông tin thật và mời người biết bổ sung. Lý do chỉ đến từ bạn hoặc đồng nghiệp.",
            },
            {
              text: "Bỏ phần này đi, vì đọc mã là hiểu vì sao nó viết như vậy",
              feedback:
                "Mã cho biết nó làm gì, không cho biết phương án nào đã bị bác. Bỏ phần này là bỏ thứ người sau không thể tự tìm lại.",
            },
          ],
        },
        {
          id: "bay",
          label: "Phần Bẫy nằm ở đâu",
          options: [
            {
              text: "Liệt kê những bẫy hay gặp ở loại kho mã quản lý đơn hàng",
              feedback:
                "Danh sách chung chung cho mọi kho mã. Bẫy thật của kho này là chỗ bạn vừa hiểu nhầm, và AI không có thông tin đó.",
            },
            {
              text: "Chỉ ra mọi hàm có thể gây lỗi nếu bị gọi sai",
              feedback:
                "Gần như hàm nào cũng gây lỗi nếu gọi sai, nên danh sách dài mà không giúp ai biết chỗ nào dễ nhầm.",
            },
            {
              text: "Dưới đây là các chỗ tôi từng hiểu nhầm, hãy sắp xếp lại và diễn đạt gọn",
              good: true,
              feedback:
                "Bẫy chỉ viết được khi còn nhớ mình vừa vấp ở đâu. Bạn cung cấp nguyên liệu, AI lo phần văn.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["gioi-han", "ly-do", "bay"],
          text:
            "Trang tài liệu một trang: (1) Phần này làm gì. (2) Muốn đổi cách tính phí vận chuyển thì vào mô-đun tính phí. (3) Vì sao: bạn nêu hai lý do, ba quyết định còn lại ghi chưa rõ lý do để hỏi đồng nghiệp. (4) Bẫy: ba chỗ bạn từng hiểu nhầm, mỗi chỗ một câu. Đọc xong, người sau biết nên hỏi ai về ba quyết định kia.",
        },
        {
          requires: ["ly-do"],
          text:
            "Trang tài liệu có phần lý do trung thực, nhưng không giới hạn nên dài và lẫn nhiều mô tả mã, còn phần bẫy chỉ là danh sách chung chung.",
        },
        {
          text:
            "Một tài liệu dài, trôi chảy, mô tả kho mã rất rõ và đưa ra những lý do thiết kế nghe có vẻ chắc chắn. Không ai kiểm được lý do nào là thật, và phần bẫy không nhắc tới chỗ bạn thực sự vấp.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Bốn phần của trang tài liệu, như tờ ghi chú bàn giao nhà cho người thuê sau",
      intro:
        "Bạn sắp chuyển khỏi căn nhà đang thuê và để lại một tờ ghi chú cho người đến sau. Chỉ cần nhìn quanh là họ biết nhà có mấy phòng. Nhưng họ không thể biết cầu dao nào hay nhảy hay vì sao vòi sen luôn phải mở nhẹ.",
      columns: ["Phần của trang", "Giống như trong tờ ghi chú nhà", "AI làm thay được không"],
      rows: [
        ["Phần này làm gì", "Nhà có hai phòng ngủ, bếp ở tầng trệt", "Được: suy ra từ mã, nhìn là thấy"],
        ["Muốn sửa thì vào đâu", "Điện nước ở hộp kỹ thuật cạnh cầu thang", "Phần lớn được: lần theo mã là ra"],
        ["Vì sao làm thế này", "Vòi sen lắp lệch vì ống cũ không đổi được", "Không: lý do nằm ngoài mã"],
        ["Bẫy nằm ở đâu", "Cầu dao bếp hay nhảy khi bật lò vi sóng", "Không: chỉ người từng vấp mới biết"],
      ],
      oneLiner: "AI viết nhanh hai phần suy ra được từ mã, còn hai phần quý nhất chỉ bạn mới có.",
    },
  ],

  "du-an-nho-tu-phan-bien": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp ưu tiên theo hậu quả, không theo khả năng sai",
      task:
        "Sau buổi làm việc bạn đánh dấu ba chỗ chưa tự kiểm chứng, mỗi chỗ có khả năng sai (0 đến 1) và hậu quả nếu sai (1 đến 10, số minh hoạ). Đoạn mã đang xếp theo khả năng sai nên đưa chỗ chỉ làm hiển thị lệch lên đầu, còn lệnh xoá dữ liệu bị đẩy xuống cuối. Sửa để kiểm theo thứ tự hậu quả giảm dần.",
      starter:
        "cho = [\n    (\"lệnh xoá bản ghi cũ\", 0.1, 9),\n    (\"định dạng ngày hiển thị\", 0.6, 2),\n    (\"quyền đọc tệp cấu hình\", 0.3, 5),\n]\nthu_tu = sorted(cho, key=lambda c: c[1], reverse=True)\nfor i, c in enumerate(thu_tu, 1):\n    print(str(i) + \".\", c[0])\n",
      solution:
        "cho = [\n    (\"lệnh xoá bản ghi cũ\", 0.1, 9),\n    (\"định dạng ngày hiển thị\", 0.6, 2),\n    (\"quyền đọc tệp cấu hình\", 0.3, 5),\n]\nthu_tu = sorted(cho, key=lambda c: c[2], reverse=True)\nfor i, c in enumerate(thu_tu, 1):\n    print(str(i) + \".\", c[0])\n",
      expectedOutput:
        "1. lệnh xoá bản ghi cũ\n2. quyền đọc tệp cấu hình\n3. định dạng ngày hiển thị",
      hints: [
        "Mỗi bộ có ba phần tử: tên, khả năng sai ở chỉ số 1, hậu quả ở chỉ số 2.",
        "Đổi key của sorted sang chỉ số của hậu quả.",
      ],
    },
    {
      type: "feynman",
      title: "Ba cách tự hỏi lại, và mỗi cách bắt được gì",
      intro:
        "Bạn viết xong một bài báo cáo dài và muốn biết nó có sai không. Đọc lại một mình thấy trôi chảy. Nhờ một người bạn đọc cùng phong cách viết thì họ hay đồng ý. Nhờ một đồng nghiệp biết chuyện công ty thì họ chỉ ra ngay chỗ lệch.",
      columns: ["Cách hỏi lại", "Bắt được gì", "Bỏ sót gì"],
      rows: [
        [
          "Dựa vào cảm giác tự tin",
          "Gần như không gì: câu sai cũng trôi chảy như câu đúng",
          "Mọi thứ, vì không có tín hiệu nào phân biệt đúng và sai",
        ],
        [
          "Yêu cầu AI tự phản biện",
          "Lỗi rõ ràng, vẫn đáng làm vì nhanh",
          "Điểm mù chung: cùng dữ liệu nên lệch cùng một chỗ ở cả hai lượt",
        ],
        [
          "Một đồng nghiệp thật",
          "Quyết định cũ, ràng buộc khách hàng, lý do lịch sử",
          "Ít sót hơn, nhưng tốn thời gian của người khác",
        ],
      ],
      oneLiner: "Cảm giác chắc chắn không phải bằng chứng; hãy kiểm theo hậu quả và để một người thật xem chỗ AI không thấy.",
    },
  ],

  "tong-ket-quy-trinh-dung-ai-cho-nguoi-viet-ma": [
    {
      type: "scenario",
      title: "Một yêu cầu gấp lúc năm giờ chiều",
      start: "gap",
      nodes: {
        gap: {
          text:
            "Sếp nhờ gấp một câu truy vấn đổi trạng thái hàng nghìn đơn khách hàng trên môi trường thật, cần xong trước giờ tan làm. AI có thể viết nó trong ít giây. Bạn làm gì trước tiên?",
          choices: [
            { label: "Nhờ AI viết rồi chạy luôn vì nhìn câu truy vấn có vẻ đúng", next: "chay-ngay" },
            { label: "Tự viết từ đầu vì không muốn rủi ro gì với dữ liệu thật", next: "tu-viet" },
            { label: "Hỏi mình mất bao lâu để biết lời giải đúng, rồi quyết định giao hay không", next: "tu-hoi" },
          ],
        },
        "chay-ngay": {
          text:
            "Câu truy vấn thiếu một điều kiện WHERE nên cập nhật cả những đơn đã huỷ. Hơn hai nghìn đơn đổi nhầm trạng thái, và bạn mất cả buổi tối khôi phục từ bản sao lưu.",
          ending: "bad",
        },
        "tu-viet": {
          text:
            "Bạn viết và kiểm kỹ, nhưng mất gần ba giờ cho việc mà thử trên một bản sao chỉ cần mười phút để biết đúng hay sai. Sếp phải chờ, trong khi lẽ ra phần chậm nhất đã giao được.",
          ending: "bad",
        },
        "tu-hoi": {
          text:
            "Chạy thử trên bản sao và so số dòng bị đổi với con số bạn dự đoán là kiểm được trong mười phút, nên bạn giao việc viết cho AI. Bản sao cho kết quả đúng, nhưng có một điều kiện lọc theo cột lạ mà bạn không giải thích được. Bạn làm gì?",
          choices: [
            { label: "Gửi luôn vì kết quả trên bản sao đã đúng", next: "gui-luon" },
            { label: "Hỏi AI giải thích điều kiện đó rồi đối chiếu với lược đồ dữ liệu", next: "giai-thich" },
            { label: "Xoá điều kiện lạ đi cho truy vấn đơn giản hơn", next: "xoa-dieu-kien" },
          ],
        },
        "gui-luon": {
          text:
            "Trên bản sao đúng, trên môi trường thật cột đó chứa giá trị khác nên truy vấn bỏ sót một nhóm đơn. Bạn đã gửi thứ mình không giải thích được, đúng ranh giới mà quy trình nói là không vượt qua.",
          ending: "bad",
        },
        "xoa-dieu-kien": {
          text:
            "Điều kiện bị xoá hoá ra là thứ loại các đơn đang được đối tác xử lý. Truy vấn giờ đổi luôn cả chúng, và đối tác báo lỗi đồng bộ vào sáng hôm sau.",
          ending: "bad",
        },
        "giai-thich": {
          text:
            "Điều kiện lọc loại các đơn đang chờ đối tác, một ràng buộc mà chỉ đội bạn biết. Bạn xác nhận với đồng nghiệp, đánh dấu phần còn lại chưa tự kiểm theo hậu quả rồi mới chạy trên môi trường thật. Bạn giải thích được từng dòng mình gửi đi.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Ba thứ, đi qua một việc cụ thể trong ngày",
      steps: [
        {
          label: "Trước khi giao",
          detail:
            "Việc: sinh dữ liệu mẫu cho kiểm thử. Câu hỏi: nếu có người đưa lời giải, mình mất bao lâu để biết nó đúng? Chạy thử vài phút là biết, nên giao cho AI. Với việc quyết định có nên đổi lược đồ dữ liệu thì chưa biết cách kiểm, nên tự làm.",
        },
        {
          label: "Nhận kết quả",
          detail:
            "AI trả về đoạn mã sinh dữ liệu. Bạn chưa dán vào kho mà đọc lại và gạch ra những chỗ mình chưa tự kiểm: định dạng ngày, ký tự đặc biệt trong tên.",
        },
        {
          label: "Xếp theo hậu quả",
          detail:
            "Ký tự đặc biệt có thể làm hỏng cả bộ kiểm thử, định dạng ngày chỉ làm một bài kiểm thử đỏ. Kiểm cái đầu trước, kể cả khi mình thấy cái sau dễ sai hơn.",
        },
        {
          label: "Trước khi gửi",
          detail:
            "Ranh giới cuối: nếu đồng nghiệp hỏi dòng này làm gì, bạn trả lời được không. Chỗ nào không giải thích được thì quay lại bước trước hoặc bỏ đi, chứ không gửi đi rồi mới tìm hiểu.",
        },
        {
          label: "Khối ràng buộc dự án",
          detail:
            "Việc làm một lần để cả ba bước nhẹ hơn: một khối ngắn ghi ngôn ngữ và phiên bản, khung làm việc, quy ước, những thứ không được dùng, dán vào đầu mỗi cuộc trao đổi để AI không phải đoán điều chỉ đội bạn biết.",
        },
      ],
    },
  ],

  // ── Xác minh danh tính và tuân thủ ─────────────────────────────────────
  "xac-minh-danh-tinh-nguoi-dung-toi-muc-nao": [
    {
      type: "scenario",
      title: "Đặt mức xác minh cho một ứng dụng ví",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text:
            "Ứng dụng ví của bạn cho phép xem số dư, nạp tiền nhỏ và chuyển khoản lớn. Bộ phận tuân thủ báo cáo gian lận hằng tháng và muốn xác minh chặt. Bạn đề xuất mô hình nào?",
          choices: [
            { label: "Một mức xác minh chặt như nhau cho mọi thao tác", next: "chat-het" },
            { label: "Một mức xác minh nhẹ như nhau cho mọi thao tác", next: "nhe-het" },
            { label: "Xác minh theo bậc, mức tăng dần theo rủi ro của thao tác", next: "theo-bac" },
          ],
        },
        "chat-het": {
          text:
            "Ai chỉ muốn xem số dư cũng phải chụp giấy tờ trước. Số gian lận trong báo cáo giảm, nhưng nhiều người dùng bỏ ở bước đó, và không dòng nào trong báo cáo nào ghi lại họ.",
          ending: "bad",
        },
        "nhe-het": {
          text:
            "Đăng ký rất mượt, nhưng kẻ gian cũng vào dễ như người thật và chuyển được khoản lớn. Cuối quý, một vụ chiếm tài khoản gây thiệt hại lớn hơn mọi khoản bạn tiết kiệm được từ việc ít bước.",
          ending: "bad",
        },
        "theo-bac": {
          text:
            "Xem số dư không cần bước nào, nạp nhỏ cần số điện thoại, chuyển lớn cần giấy tờ. Sau một tháng, người dùng phàn nàn chuyển lớn phải thêm bước, còn báo cáo tuân thủ chỉ có số gian lận bị chặn. Bạn làm gì?",
          choices: [
            { label: "Bỏ bước giấy tờ vì đã có nhiều phàn nàn", next: "bo-buoc" },
            { label: "Đo thêm tỉ lệ bỏ giữa chừng ở mỗi bậc, đặt cạnh số gian lận bị chặn", next: "do-ca-hai" },
            { label: "Giữ nguyên và coi phàn nàn là cái giá chấp nhận được", next: "bo-qua" },
          ],
        },
        "bo-buoc": {
          text:
            "Tiếng phàn nàn là thứ duy nhất bạn có, nên bạn nới theo nó. Hai tuần sau gian lận ở bậc chuyển lớn tăng vọt trở lại, và lúc này bạn cũng không có số liệu nào để biết mức vừa phải nằm ở đâu.",
          ending: "bad",
        },
        "bo-qua": {
          text:
            "Phàn nàn là phần nhìn thấy được của người ở lại. Phần người đã bỏ đi thì vẫn không ai đếm, nên bạn tiếp tục tối ưu cho một nửa bức tranh mà không biết.",
          ending: "bad",
        },
        "do-ca-hai": {
          text:
            "Bạn thấy bậc chuyển lớn mất khoảng một phần tư số người bắt đầu, trong khi số gian lận bị chặn ở đó chỉ ngang vài giao dịch. Nhờ có cả hai con số trên một bảng, bạn rút bước giấy tờ thứ hai thay vì bỏ cả hai, và cuộc tranh luận lần đầu có số liệu cho cả hai phía.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Mỗi bước xác minh thêm vào: gian lận giảm, người bỏ đi tăng",
      caption:
        "Số liệu minh hoạ, không phải đo từ một hệ thống thật: giả định mỗi bước chặn một nửa số gian lận còn lại và làm một tỉ lệ cố định người dùng thật bỏ đi. Hình dạng đáng nhớ là hai đường ngược chiều, và điểm cực tiểu của tổng không nằm ở hai đầu.",
      kind: "line",
      xLabel: "Số bước xác minh",
      yLabel: "Thiệt hại mỗi tháng (nghìn USD, minh hoạ)",
      x: { from: 0, to: 6, step: 1 },
      params: [
        { id: "f", label: "Thiệt hại gian lận khi không có bước nào", min: 20, max: 200, step: 10, value: 100, unit: "nghìn USD" },
        { id: "v", label: "Giá trị người dùng thật bỏ đi, nếu mọi người đều bỏ", min: 20, max: 300, step: 10, value: 150, unit: "nghìn USD" },
        { id: "d", label: "Tỉ lệ người thật bỏ đi ở mỗi bước", min: 0.05, max: 0.4, step: 0.05, value: 0.15 },
      ],
      series: [
        { label: "Thiệt hại do gian lận (có người báo cáo)", expr: "f*(0.5^x)" },
        { label: "Thiệt hại do người thật bỏ đi (không ai báo cáo)", expr: "v*(1-(1-d)^x)" },
        { label: "Tổng hai loại thiệt hại", expr: "f*(0.5^x)+v*(1-(1-d)^x)" },
      ],
    },
  ],

  "quy-trinh-xac-minh-tu-sang-loc-toi-bao-cao": [
    {
      type: "exercise",
      language: "python",
      title: "Hàng chờ có thứ tự: dùng điều hệ thống sàng lọc đã biết",
      task:
        "Sáu hồ sơ bị đánh dấu, mỗi hồ sơ có điểm rủi ro do hệ thống chấm và một cờ cho biết nó thật sự đáng ngờ (chỉ biết sau khi xem). Người xử lý chỉ xem được 3 hồ sơ mỗi ngày. Đoạn mã đang xem theo thứ tự tới trước nên bỏ qua toàn bộ điểm rủi ro. Sửa để xem 3 hồ sơ điểm cao nhất và in id đã xem cùng số hồ sơ thật bắt được.",
      starter:
        "ho_so = [\n    (\"A\", 15, False),\n    (\"B\", 80, True),\n    (\"C\", 30, False),\n    (\"D\", 95, True),\n    (\"E\", 20, False),\n    (\"F\", 60, True),\n]\nnang_luc = 3\nda_xem = ho_so[:nang_luc]\nthat = [h for h in da_xem if h[2]]\nprint(\"Đã xem:\", \", \".join(h[0] for h in da_xem))\nprint(\"Bắt được thật: \" + str(len(that)) + \"/3\")\n",
      solution:
        "ho_so = [\n    (\"A\", 15, False),\n    (\"B\", 80, True),\n    (\"C\", 30, False),\n    (\"D\", 95, True),\n    (\"E\", 20, False),\n    (\"F\", 60, True),\n]\nnang_luc = 3\nda_xem = sorted(ho_so, key=lambda h: h[1], reverse=True)[:nang_luc]\nthat = [h for h in da_xem if h[2]]\nprint(\"Đã xem:\", \", \".join(h[0] for h in da_xem))\nprint(\"Bắt được thật: \" + str(len(that)) + \"/3\")\n",
      expectedOutput: "Đã xem: D, B, F\nBắt được thật: 3/3",
      hints: [
        "ho_so[:nang_luc] lấy ba hồ sơ đầu danh sách, không quan tâm điểm.",
        "Sắp xếp theo phần tử chỉ số 1 giảm dần trước khi cắt lấy nang_luc phần tử.",
      ],
    },
    {
      type: "chart",
      title: "Siết luật thêm, bắt được thật có thể ít đi",
      caption:
        "Mô hình minh hoạ với số tự đặt: luật chặt hơn làm độ phủ tăng dần từ 60% lên 95%, nhưng khi số hồ sơ bị đánh dấu vượt năng lực xử lý thì chất lượng mỗi lượt xem giảm theo tỉ lệ năng lực chia số hồ sơ. Kéo năng lực xử lý để thấy đỉnh dịch chuyển.",
      kind: "line",
      xLabel: "Số hồ sơ bị đánh dấu mỗi ngày",
      yLabel: "Hồ sơ thật bắt được mỗi ngày",
      x: { from: 50, to: 1000, step: 50 },
      params: [
        { id: "nl", label: "Năng lực xử lý", min: 100, max: 600, step: 50, value: 200, unit: "hồ sơ/ngày" },
        { id: "r", label: "Số hồ sơ thật đáng ngờ mỗi ngày", min: 20, max: 100, step: 10, value: 40 },
      ],
      series: [
        { label: "Bắt được thật", expr: "r*(0.6+0.35*min(x/300,1))*min(1,nl/x)" },
        { label: "Độ phủ nếu xem hết mọi hồ sơ", expr: "r*(0.6+0.35*min(x/300,1))" },
      ],
    },
  ],

  "bon-tinh-huong-xac-minh-va-cach-xu-ly": [
    {
      type: "scenario",
      title: "Hồ sơ lệch một ngày và quy tắc chưa có nhánh này",
      start: "lech",
      nodes: {
        lech: {
          text:
            "Hệ thống đánh dấu một hồ sơ chuyển tiền lớn: tên khớp, nhưng ngày sinh trên giấy tờ lệch một ngày so với đơn khai. Bạn xử lý bước đầu thế nào?",
          choices: [
            { label: "Từ chối ngay vì lệch dữ liệu là dấu hiệu giả mạo", next: "tu-choi-som" },
            { label: "Duyệt vì chắc chắn chỉ là gõ nhầm một con số", next: "duyet-som" },
            { label: "Xin thêm một bằng chứng độc lập, như giấy tờ thứ hai", next: "them-bang-chung" },
          ],
        },
        "tu-choi-som": {
          text:
            "Hồ sơ này thật ra là gõ nhầm. Người dùng bị từ chối mà không biết lý do, bỏ đi, và trong dữ liệu của bạn họ trông giống hệt một người đổi ý.",
          ending: "bad",
        },
        "duyet-som": {
          text:
            "Lần này đúng là gõ nhầm, nhưng bạn vừa đặt tiền lệ: lệch một ngày thì cho qua. Tháng sau một hồ sơ giả lệch đúng một ngày đi qua theo tiền lệ đó, và không văn bản nào ghi lại rằng nó từng được cho phép.",
          ending: "bad",
        },
        "them-bang-chung": {
          text:
            "Giấy tờ thứ hai có ngày sinh khớp với đơn khai, chỉ giấy đầu bị lệch. Không có bằng chứng giả mạo, nhưng giao dịch thuộc nhóm rủi ro cao theo luật, và quy tắc hiện tại không nói nhánh này phải xử lý ai quyết. Bạn làm gì?",
          choices: [
            { label: "Tự quyết theo cảm giác và không ghi gì thêm", next: "tu-quyet-im" },
            { label: "Từ chối hết vì giao dịch thuộc nhóm rủi ro cao", next: "tu-choi-cao" },
            { label: "Đẩy lên người có thẩm quyền, kèm lý do và hai bằng chứng", next: "day-len" },
          ],
        },
        "tu-quyet-im": {
          text:
            "Quyết định có thể đúng, nhưng nó là một tiền lệ không ai thấy. Hai người xử lý khác nhau gặp ca tương tự sẽ quyết ngược nhau, và không ai giải thích được vì sao.",
          ending: "bad",
        },
        "tu-choi-cao": {
          text:
            "Rủi ro cao nhưng không có bằng chứng đủ để từ chối, và bạn từ chối một người thật có hai giấy tờ nhất quán. Khiếu nại của họ cho thấy quy tắc chưa từng trả lời câu hỏi này.",
          ending: "bad",
        },
        "day-len": {
          text:
            "Người có thẩm quyền quyết định, và quyết định cùng lý do được ghi lại thành quy tắc cho nhánh này: bằng chứng nào là đủ, và ai quyết khi chưa đủ. Ca sau gặp tình huống tương tự sẽ được xử lý giống nhau.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Bốn tình huống khó ở quầy tiếp nhận",
      intro:
        "Hãy hình dung quầy lễ tân toà nhà văn phòng. Có khách đưa thẻ không có trong danh sách quen, có người ghi sai một chữ trong tên, có người đến thay cho sếp, và có người trông khả nghi nhưng không có gì cụ thể để từ chối.",
      columns: ["Tình huống", "Điều dễ làm sai", "Quy tắc cần nói rõ"],
      rows: [
        [
          "Giấy tờ lạ",
          "Coi giấy máy không đọc được là giấy giả",
          "Ai xem tay, bằng chứng nào đủ để chấp nhận",
        ],
        [
          "Dữ liệu lệch nhẹ",
          "Chọn vội lỗi nhập liệu hay giả mạo; cùng biểu hiện, hai hành động ngược nhau",
          "Cần thêm bằng chứng độc lập nào trước khi quyết",
        ],
        [
          "Người đại diện",
          "Xác minh hai người xong là tưởng đã xong",
          "Mối quan hệ giữa họ cũng phải được xác minh",
        ],
        [
          "Rủi ro cao, bằng chứng thiếu",
          "Từ chối cho an toàn, hoặc cho qua cho nhanh",
          "Ai quyết khi bằng chứng vẫn chưa đủ",
        ],
      ],
      oneLiner: "Tài liệu nào cũng nói bằng chứng nào là đủ; quy tắc tốt còn nói ai quyết khi chưa đủ.",
    },
  ],

  // ── Kiến trúc và vận hành ──────────────────────────────────────────────
  "ghep-cac-quyet-dinh-roi-thanh-mot-kien-truc": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm rủi ro tập trung trong danh sách những thứ đang chạy",
      task:
        "Danh sách he cho biết mỗi thành phần đang chạy có bao nhiêu người biết vận hành. Dòng nào chỉ một người biết là rủi ro tập trung: người đó nghỉ thì không ai trực được lúc ba giờ sáng. Điều kiện đang viết sai nên không tìm ra dòng nào. Sửa để in số thành phần rủi ro và tên từng thành phần.",
      starter:
        "he = {\n    \"hàng đợi tin nhắn\": 1,\n    \"cơ sở dữ liệu chính\": 4,\n    \"bộ nhớ đệm\": 2,\n    \"công cụ lập lịch cũ\": 1,\n}\nrui_ro = []\nfor ten, so_nguoi in he.items():\n    if so_nguoi == 0:\n        rui_ro.append(ten)\nprint(\"Rủi ro tập trung:\", len(rui_ro))\nfor ten in rui_ro:\n    print(\"-\", ten)\n",
      solution:
        "he = {\n    \"hàng đợi tin nhắn\": 1,\n    \"cơ sở dữ liệu chính\": 4,\n    \"bộ nhớ đệm\": 2,\n    \"công cụ lập lịch cũ\": 1,\n}\nrui_ro = []\nfor ten, so_nguoi in he.items():\n    if so_nguoi <= 1:\n        rui_ro.append(ten)\nprint(\"Rủi ro tập trung:\", len(rui_ro))\nfor ten in rui_ro:\n    print(\"-\", ten)\n",
      expectedOutput: "Rủi ro tập trung: 2\n- hàng đợi tin nhắn\n- công cụ lập lịch cũ",
      hints: [
        "Bằng 0 là không ai biết. Ở đây điều cần bắt là chỉ một người biết.",
        "Đổi điều kiện thành so_nguoi <= 1.",
      ],
    },
    {
      type: "chart",
      title: "Mỗi công nghệ thêm vào đắt hơn công nghệ trước nó",
      caption:
        "Số giờ minh hoạ, do bạn tự kéo: mỗi công nghệ tốn một lượng giờ cố định mỗi năm (nâng phiên bản, trực, đọc cảnh báo bảo mật), cộng với giờ cho từng chỗ nối giữa các cặp. Số chỗ nối tối đa là n(n-1)/2 nên đường tổng cong lên thay vì thẳng.",
      kind: "line",
      xLabel: "Số công nghệ đang nuôi",
      yLabel: "Giờ công mỗi năm (minh hoạ)",
      x: { from: 1, to: 12, step: 1 },
      params: [
        { id: "c", label: "Giờ nuôi mỗi công nghệ", min: 20, max: 200, step: 10, value: 80, unit: "giờ/năm" },
        { id: "m", label: "Giờ cho mỗi chỗ nối giữa hai công nghệ", min: 1, max: 20, step: 1, value: 6, unit: "giờ/năm" },
      ],
      series: [
        { label: "Chỉ tính phần nuôi từng công nghệ", expr: "c*x" },
        { label: "Cộng cả chỗ nối giữa các công nghệ", expr: "c*x+m*x*(x-1)/2" },
      ],
    },
  ],

  "he-thong-theo-giai-doan": [
    {
      type: "scenario",
      title: "Cùng một lời khuyên, hai giai đoạn của cùng một đội",
      start: "dau",
      nodes: {
        dau: {
          text:
            "Đội bốn người, chưa có khách trả tiền. Một kỹ sư nhiều kinh nghiệm đề xuất dựng hạ tầng nhiều vùng và bộ kiểm thử đầy đủ trước khi ra mắt, vì đó là thực hành tốt. Bạn quyết định thế nào?",
          choices: [
            { label: "Làm theo đề xuất, vì thực hành tốt thì không bao giờ sai", next: "lam-het" },
            { label: "Ra mắt sớm nhưng giữ cẩn thận mô hình dữ liệu và cách định danh", next: "ra-mat-som" },
            { label: "Ra mắt sớm, bỏ qua mọi thứ vì mã sẽ bị viết lại hết", next: "bo-het" },
          ],
        },
        "lam-het": {
          text:
            "Sáu tháng sau sản phẩm vẫn chưa ra mắt, vòng phản hồi dài và nguồn lực cạn. Bạn đã bảo vệ rất kỹ một thứ mà chưa ai chứng minh là có người cần.",
          ending: "bad",
        },
        "bo-het": {
          text:
            "Ra mắt nhanh, nhưng mô hình dữ liệu và cách đánh mã khách hàng chọn vội thì sống qua mọi lần đổi hướng. Một năm sau sửa chúng đau nhất vì đã dính vào mọi nơi.",
          ending: "bad",
        },
        "ra-mat-som": {
          text:
            "Đội ra mắt trong vài tuần, học nhanh và đổi hướng hai lần mà lõi dữ liệu vẫn nguyên. Mười tám tháng sau có khách doanh nghiệp. Một lần triển khai lỗi làm họ mất dữ liệu nửa ngày và họ nói sẽ cân nhắc rời đi. Bạn làm gì?",
          choices: [
            { label: "Giữ nhịp ra tính năng mới vì tốc độ là thế mạnh của đội", next: "giu-toc-do" },
            { label: "Ngừng ra tính năng sáu tháng để viết lại toàn bộ cho chắc", next: "viet-lai" },
            { label: "Thêm kiểm thử và triển khai từng bước cho đường dẫn quan trọng", next: "dung-cho" },
          ],
        },
        "giu-toc-do": {
          text:
            "Thứ đắt nhất đã đổi: từ thời gian học sang một sự cố. Lần triển khai lỗi tiếp theo đến trước khi bạn kịp chỉnh, và khách lớn nhất rời đi.",
          ending: "bad",
        },
        "viet-lai": {
          text:
            "Sáu tháng không tính năng mới trong khi đối thủ ra đều, còn bản viết lại mang theo cả những lỗi chưa ai hiểu hết. Bạn đổi một cực đoan lấy cực đoan kia.",
          ending: "bad",
        },
        "dung-cho": {
          text:
            "Ngưỡng chuyển giai đoạn nằm ở hậu quả của sự cố, không ở số người dùng, và bạn nhận ra nó đúng lúc. Phần quan trọng được bảo vệ nhiều hơn, phần còn lại vẫn đổi nhanh, và khách ở lại.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Cùng một việc, giá trị khác nhau theo giai đoạn",
      intro:
        "Mua bảo hiểm đầy đủ là lời khuyên tốt, nhưng với sinh viên mới ra trường chưa có gì để mất thì nó chủ yếu là khoản chi chậm bước tiến. Với người đã có nhà, có con nhỏ, chính khoản đó mới là khoản nên ưu tiên. Lời khuyên giống nhau, hoàn cảnh khác, kết luận khác.",
      columns: ["Giai đoạn", "Thứ đắt nhất", "Bộ kiểm thử đầy đủ ở đây là"],
      rows: [
        [
          "Chưa có người dùng",
          "Thời gian tới khi biết mình làm đúng thứ cần không",
          "Chi phí thuần: làm chậm việc kiểm chứng giả định lớn nhất",
        ],
        [
          "Đang lớn",
          "Thứ không mở rộng được cùng người dùng",
          "Chọn lọc: đặt vào chỗ nghẽn đang di chuyển",
        ],
        [
          "Đã trưởng thành",
          "Một sự cố",
          "Khoản đầu tư tốt nhất: bảo vệ thứ người ta đang dựa vào",
        ],
      ],
      oneLiner: "Trước khi làm theo một lời khuyên, hỏi nó được viết cho giai đoạn nào, và giai đoạn đó có phải của bạn không.",
    },
  ],

  "du-lieu-lon-vi-sao-trung-binh-khong-dung-duoc": [
    {
      type: "exercise",
      language: "python",
      title: "Chạy lại đúng phần bị lỗi, không chạy lại từ đầu",
      task:
        "Công việc được chia thành 6 phần độc lập, mỗi phần chạy 3 giờ, và phần số 2 và 5 báo lỗi. Đoạn mã đang chạy lại cả 6 phần cho cả hai cách tính nên số giờ của cách thứ hai không khác gì lần chạy lại toàn bộ. Sửa để chỉ chạy lại các phần lỗi và in danh sách các phần đó.",
      starter:
        "so_phan = 6\ngio_moi_phan = 3\nphan_loi = [2, 5]\nphan_chay_lai = list(range(so_phan))\nprint(\"Chạy lại toàn bộ:\", so_phan * gio_moi_phan, \"giờ\")\nprint(\"Chạy lại phần lỗi:\", len(phan_chay_lai) * gio_moi_phan, \"giờ\")\nprint(\"Phần chạy lại:\", phan_chay_lai)\n",
      solution:
        "so_phan = 6\ngio_moi_phan = 3\nphan_loi = [2, 5]\nphan_chay_lai = phan_loi\nprint(\"Chạy lại toàn bộ:\", so_phan * gio_moi_phan, \"giờ\")\nprint(\"Chạy lại phần lỗi:\", len(phan_chay_lai) * gio_moi_phan, \"giờ\")\nprint(\"Phần chạy lại:\", phan_chay_lai)\n",
      expectedOutput: "Chạy lại toàn bộ: 18 giờ\nChạy lại phần lỗi: 6 giờ\nPhần chạy lại: [2, 5]",
      hints: [
        "phan_chay_lai đang là mọi chỉ số từ 0 tới 5. Chỉ cần những phần nằm trong phan_loi.",
        "Điều này chỉ làm được vì các phần độc lập: chạy lại phần 2 không đụng tới phần 3.",
      ],
    },
    {
      type: "chart",
      title: "Lỗi hiếm một phần triệu, ở quy mô lớn là việc hằng ngày",
      caption:
        "Số liệu minh hoạ do bạn đặt: mỗi triệu bản ghi có một số ca lỗi hiếm. Xem số ca mỗi ngày và số người xử lý thủ công cần có tăng thẳng theo khối lượng dữ liệu, dù tỉ lệ lỗi không đổi.",
      kind: "line",
      xLabel: "Số bản ghi mỗi ngày (triệu)",
      yLabel: "Số ca mỗi ngày",
      x: { from: 100, to: 2000, step: 100 },
      params: [
        { id: "p", label: "Lỗi hiếm trên mỗi triệu bản ghi", min: 0.1, max: 5, step: 0.1, value: 1 },
        { id: "k", label: "Số ca một người xử lý được mỗi ngày", min: 10, max: 100, step: 10, value: 40 },
      ],
      series: [
        { label: "Số ca lỗi mỗi ngày", expr: "x*p" },
        { label: "Số người xử lý thủ công cần có", expr: "x*p/k" },
      ],
    },
  ],

  "doi-chuyen-trach-dung-chung-hay-rieng": [
    {
      type: "scenario",
      title: "Chuyên môn dùng chung hay riêng cho năm đội sản phẩm",
      start: "chon",
      nodes: {
        chon: {
          text:
            "Năm đội sản phẩm cần chuyên gia bảo mật, và nhu cầu đến theo đợt: dồn trước mỗi lần ra mắt rồi im lặng nhiều tuần. Bảng tính cho thấy lương một đội chung chia cho năm sản phẩm là rẻ nhất. Bạn chọn gì?",
          choices: [
            { label: "Lập một đội chung vì chia ra là rẻ nhất trên bảng tính", next: "doi-chung" },
            { label: "Mỗi đội tự tuyển một người chuyên trách của mình", next: "moi-doi-rieng" },
            { label: "Giữ nhóm nhỏ dùng chung và nhúng người vào đội sắp ra mắt", next: "nhung" },
          ],
        },
        "doi-chung": {
          text:
            "Quý sau ba đội ra mắt cùng tháng, hàng chờ của đội chung dài ba tuần, và ba lần ra mắt đều trễ. Lương của đội chung vẫn đúng như bảng tính, còn thời gian chờ của người khác thì không nằm ở dòng nào.",
          ending: "bad",
        },
        "moi-doi-rieng": {
          text:
            "Năm người, và ngoài các đợt dồn việc mỗi người rảnh nhiều tuần. Họ không học được từ ca của nhau nên chiều sâu chuyên môn của từng người mỏng đi, trong khi chi phí nhân sự gấp mấy lần.",
          ending: "bad",
        },
        nhung: {
          text:
            "Hai quý sau, các đội có người chuyên trách đúng lúc cần mà không phải chờ. Nhưng sơ đồ tổ chức không còn gọn và bộ phận tài chính hỏi vì sao một người báo cáo cho hai nơi. Bạn làm gì?",
          choices: [
            { label: "Bỏ phương án nhúng cho sơ đồ gọn lại", next: "bo-nhung" },
            { label: "Ghi lại số tuần chờ đã tránh được và giữ phương án nhúng", next: "giu-nhung" },
            { label: "Chuyển hẳn mỗi người về một đội và cố định ở đó", next: "co-dinh" },
          ],
        },
        "bo-nhung": {
          text:
            "Sơ đồ gọn lại và hàng chờ dài ra như cũ. Phương án bị bỏ vì thứ nó tiết kiệm là thời gian chờ của người khác, không có hoá đơn nào chứng minh được.",
          ending: "bad",
        },
        "co-dinh": {
          text:
            "Mỗi người gắn với một đội, tức quay về mô hình mỗi đội một người. Đội ít việc có người rảnh còn đội đang dồn việc lại thiếu, và ý định chia sẻ chuyên môn mất đi.",
          ending: "bad",
        },
        "giu-nhung": {
          text:
            "Với con số cụ thể về thời gian chờ, tài chính hiểu vì sao sơ đồ không gọn. Phương án khó vẽ nhưng được giữ, vì chi phí không hoá đơn giờ đã có một dòng trong báo cáo.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba cách tổ chức chuyên môn, và phần chi phí chỉ một cách nhìn thấy",
      intro:
        "Bệnh viện có thể để một bác sĩ chuyên khoa phục vụ mọi khoa theo lịch hẹn, để mỗi khoa có bác sĩ riêng, hoặc cử bác sĩ xuống ở hẳn một khoa trong một đợt cao điểm. Cách nào cũng có người phàn nàn, nhưng chi phí của chúng nằm ở những chỗ khác nhau.",
      columns: ["Cách tổ chức", "Chi phí thấy trên bảng tính", "Chi phí không có hoá đơn"],
      rows: [
        [
          "Đội dùng chung",
          "Lương chia cho nhiều sản phẩm, trông rất rẻ",
          "Thời gian chờ của các đội sản phẩm",
        ],
        [
          "Mỗi đội tự có người",
          "Nhiều lương hơn, dễ thấy",
          "Người rảnh ngoài đợt cao điểm và chiều sâu chuyên môn mỏng",
        ],
        [
          "Nhúng người vào đội theo giai đoạn",
          "Lương như đội chung, không tốn thêm",
          "Sơ đồ tổ chức khó vẽ, khó giải thích",
        ],
      ],
      oneLiner: "Cách rẻ nhất trên bảng tính thường chỉ rẻ vì nó trả bằng thời gian của người khác.",
    },
  ],

  "co-che-giu-hai-ban-sao-khong-lech-xa-nhau": [
    {
      type: "exercise",
      language: "python",
      title: "Chạy lại lượt đồng bộ mà không tạo bản ghi trùng",
      task:
        "Lượt đồng bộ đầu chết sau khi chép 2 trong 3 bản ghi, nên hệ thống chạy lại từ đầu. Đoạn mã đang nối thêm từng bản ghi vào danh sách, nên bản ghi đã chép lần trước bị chép lần nữa và bản sao có 5 dòng thay vì 3. Sửa để chạy lại bao nhiêu lần cũng ra cùng một kết quả, bằng cách ghi theo id thay vì nối thêm.",
      starter:
        "lan_1 = [(1, \"A\"), (2, \"B\")]\nlan_2 = [(1, \"A\"), (2, \"B\"), (3, \"C\")]\nban_sao = []\nfor ma, gia_tri in lan_1 + lan_2:\n    ban_sao.append((ma, gia_tri))\nprint(\"Số bản ghi:\", len(ban_sao))\nprint(\"Các id:\", sorted(m for m, _ in ban_sao))\n",
      solution:
        "lan_1 = [(1, \"A\"), (2, \"B\")]\nlan_2 = [(1, \"A\"), (2, \"B\"), (3, \"C\")]\nban_sao = {}\nfor ma, gia_tri in lan_1 + lan_2:\n    ban_sao[ma] = gia_tri\nprint(\"Số bản ghi:\", len(ban_sao))\nprint(\"Các id:\", sorted(ban_sao))\n",
      expectedOutput: "Số bản ghi: 3\nCác id: [1, 2, 3]",
      hints: [
        "Một từ điển với khoá là id ghi đè bản ghi cũ thay vì tạo thêm một dòng mới.",
        "Chạy lại lần thứ ba, thứ tư vẫn phải cho đúng ba bản ghi: đó là tính bất biến khi lặp lại.",
      ],
    },
    {
      type: "flow",
      title: "Một vòng đối chiếu hai bản sao dữ liệu đơn hàng",
      steps: [
        {
          label: "Đo độ lệch theo lịch",
          detail:
            "Mỗi giờ một tác vụ đếm số đơn và tổng tiền ở cả hai bên rồi so. Đây là phép đo duy nhất bắt được lệch do sửa tay, vì chỗ sửa tay không để lại dấu vết nào trong cơ chế đồng bộ.",
        },
        {
          label: "So với con số đã cam kết",
          detail:
            "Cam kết là lệch không quá năm phút với đơn hàng. Độ lệch đo được vượt con số đó thì mới là sự cố, còn dưới con số đó là hành vi bình thường chứ không phải chuyện cần đánh thức ai dậy.",
        },
        {
          label: "Tìm nguồn lệch",
          detail:
            "Xem lệch từ đâu: độ trễ đồng bộ (đợi là hết), một lượt cập nhật thất bại âm thầm, hai bên nhận hai thay đổi cùng lúc, hay có ai sửa tay. Mỗi nguồn cần cách xử lý khác nhau nên không gộp được.",
        },
        {
          label: "Áp quy tắc bên thắng",
          detail:
            "Với trạng thái đơn hàng, bên đặt hàng thắng; với địa chỉ giao, bên khách hàng thắng. Quy tắc viết sẵn theo từng loại dữ liệu để hai người trực khác nhau giải cùng một ca ra cùng kết quả.",
        },
        {
          label: "Kéo lại một cách an toàn",
          detail:
            "Cơ chế sửa ghi theo id nên chạy lại nửa chừng cũng được. Nếu mỗi lần chạy lại tạo thêm bản ghi trùng, chính cơ chế sửa lệch trở thành nguồn lệch mới.",
        },
      ],
    },
  ],

  "do-nhay-va-phi-tuyen-khi-tai-tang": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm mức sử dụng tối đa còn giữ được ngưỡng độ trễ",
      task:
        "Một dịch vụ có thời gian xử lý riêng 20 ms. Với mô hình xếp hàng đơn giản, độ trễ ở mức sử dụng u phần trăm là 20 * 100 / (100 - u) ms. Mã mới đang dùng phép ngoại suy tuyến tính nên tưởng dịch vụ chịu được gần như mọi mức. Sửa công thức để tìm mức sử dụng lớn nhất (bước 5%) mà độ trễ vẫn không quá 100 ms.",
      starter:
        "s = 20\nngưỡng = 100\ntot_nhat = 0\nfor u in range(5, 100, 5):\n    tre = s + u * s / 100\n    if tre <= ngưỡng:\n        tot_nhat = u\nprint(\"Mức sử dụng tối đa: \" + str(tot_nhat) + \"%\")\n",
      solution:
        "s = 20\nngưỡng = 100\ntot_nhat = 0\nfor u in range(5, 100, 5):\n    tre = s * 100 / (100 - u)\n    if tre <= ngưỡng:\n        tot_nhat = u\nprint(\"Mức sử dụng tối đa: \" + str(tot_nhat) + \"%\")\n",
      expectedOutput: "Mức sử dụng tối đa: 80%",
      hints: [
        "Độ trễ thật tăng rất nhanh khi mức sử dụng tiến gần 100%, vì mẫu số 100 - u tiến về 0.",
        "Công thức đúng là tre = s * 100 / (100 - u).",
      ],
    },
    {
      type: "chart",
      title: "Độ trễ theo mức sử dụng: đường thật và đường ngoại suy tuyến tính",
      caption:
        "Mô hình xếp hàng đơn giản với số tự đặt, chỉ để thấy hình dạng, không phải số đo thật. Đường ngoại suy dựng từ hai điểm đo nhẹ tải (20% và 40%) và lạc quan hơn thực tế ở mức cao. Tăng độ biến động của thời gian xử lý để thấy đuôi độ trễ dài ra ở cùng một mức sử dụng.",
      kind: "line",
      xLabel: "Mức sử dụng (%)",
      yLabel: "Độ trễ trung bình (ms, minh hoạ)",
      x: { from: 10, to: 95, step: 5 },
      params: [
        { id: "s", label: "Thời gian xử lý riêng của một yêu cầu", min: 10, max: 100, step: 5, value: 20, unit: "ms" },
        { id: "c", label: "Độ biến động của thời gian xử lý (0 là đều đặn)", min: 0, max: 2, step: 0.25, value: 1 },
      ],
      series: [
        { label: "Độ trễ thật (xếp hàng)", expr: "s+s*(1+c*c)/2*(x/100)/(1-x/100)" },
        {
          label: "Ngoại suy tuyến tính từ hai điểm 20% và 40%",
          expr: "s+s*(1+c*c)/2*0.25+(x-20)*s*(1+c*c)/2*0.4167/20",
        },
      ],
    },
  ],

  // ── Bonus ──────────────────────────────────────────────────────────────
  "chuan-bao-cao-chi-so-va-cach-chon": [
    {
      type: "exercise",
      language: "python",
      title: "Cùng một tháng, hai con số khả dụng",
      task:
        "Trong tháng 43200 phút có ba sự việc: hỏng hẳn 20 phút, chậm quá 2 giây 90 phút, bảo trì đã báo trước 60 phút. Chuẩn hợp đồng chỉ tính hỏng hẳn và loại bảo trì. Chuẩn vận hành tính cả ba. Đoạn mã đang tính cả hai chuẩn giống nhau nên ra cùng một con số. Sửa hàm kha_dung để mỗi chuẩn đếm đúng loại sự việc của nó.",
      starter:
        "su_viec = [(\"hong\", 20), (\"cham\", 90), (\"bao_tri\", 60)]\nTONG = 43200\n\ndef kha_dung(loai_tinh):\n    mat = sum(p for loai, p in su_viec)\n    return round(100 - 100 * mat / TONG, 2)\n\nprint(\"Hợp đồng:\", str(kha_dung([\"hong\"])) + \"%\")\nprint(\"Vận hành:\", str(kha_dung([\"hong\", \"cham\", \"bao_tri\"])) + \"%\")\n",
      solution:
        "su_viec = [(\"hong\", 20), (\"cham\", 90), (\"bao_tri\", 60)]\nTONG = 43200\n\ndef kha_dung(loai_tinh):\n    mat = sum(p for loai, p in su_viec if loai in loai_tinh)\n    return round(100 - 100 * mat / TONG, 2)\n\nprint(\"Hợp đồng:\", str(kha_dung([\"hong\"])) + \"%\")\nprint(\"Vận hành:\", str(kha_dung([\"hong\", \"cham\", \"bao_tri\"])) + \"%\")\n",
      expectedOutput: "Hợp đồng: 99.95%\nVận hành: 99.61%",
      hints: [
        "Tham số loai_tinh chưa được dùng. Chỉ cộng những sự việc có loại nằm trong nó.",
        "Thêm điều kiện if loai in loai_tinh vào biểu thức sum.",
      ],
    },
    {
      type: "feynman",
      title: "Cùng một hệ thống, ba người đọc, ba chuẩn khác nhau",
      intro:
        "Một bệnh nhân có một cơ thể nhưng ba bản ghi về nó. Giấy khám nộp cho bảo hiểm chỉ ghi những chỉ số đã thoả thuận từ trước. Bảng theo dõi ở phòng cấp cứu ghi mọi dao động nhỏ. Báo cáo cho giám đốc bệnh viện chỉ nói xu hướng theo quý.",
      columns: ["Người đọc", "Câu họ hỏi", "Chuẩn hợp với họ"],
      rows: [
        [
          "Khách hàng",
          "Hệ thống có giữ đúng cam kết không?",
          "Hẹp, đo từ bên ngoài, có loại trừ bảo trì: ổn định, tranh cãi được",
        ],
        [
          "Đội vận hành",
          "Hôm nay có gì bất thường không?",
          "Rộng, gồm cả chậm, đo liên tục: nhạy và luôn xấu hơn",
        ],
        [
          "Ban lãnh đạo",
          "Xu hướng đang đi đâu?",
          "Gộp mạnh, đọc theo quý, kèm đường gián đoạn nếu đổi định nghĩa",
        ],
      ],
      oneLiner: "Chọn chuẩn theo người đọc, và viết định nghĩa hỏng cạnh mỗi con số.",
    },
  ],

  "rui-ro-vat-ly-va-dia-ly-ha-tang": [
    {
      type: "exercise",
      language: "python",
      title: "Một sự kiện trong bán kính 50 km làm ngừng bao nhiêu phần",
      task:
        "Bốn trung tâm dữ liệu có toạ độ (x, y) tính bằng km trên một bản đồ phẳng minh hoạ, gom thành ba vùng trên giấy. Một sự kiện thời tiết ở (10, 5) ảnh hưởng mọi nơi trong bán kính 50 km. Đoạn mã đang dùng bán kính 5 km nên chỉ đếm được một trung tâm. Sửa bán kính và in số trung tâm ngừng cùng phần trăm. Ba vùng trên giấy không giúp gì nếu cả ba nằm trong cùng một vùng thời tiết.",
      starter:
        "import math\n\ntrung_tam = {\"A\": (0, 0), \"B\": (12, 9), \"C\": (30, 20), \"D\": (200, 150)}\nsu_kien = (10, 5)\nban_kinh = 5\nngung = [t for t, (x, y) in trung_tam.items() if math.hypot(x - su_kien[0], y - su_kien[1]) <= ban_kinh]\nprint(\"Trung tâm ngừng: \" + str(len(ngung)) + \"/\" + str(len(trung_tam)))\nprint(\"Phần hệ thống ngừng: \" + str(round(100 * len(ngung) / len(trung_tam))) + \"%\")\n",
      solution:
        "import math\n\ntrung_tam = {\"A\": (0, 0), \"B\": (12, 9), \"C\": (30, 20), \"D\": (200, 150)}\nsu_kien = (10, 5)\nban_kinh = 50\nngung = [t for t, (x, y) in trung_tam.items() if math.hypot(x - su_kien[0], y - su_kien[1]) <= ban_kinh]\nprint(\"Trung tâm ngừng: \" + str(len(ngung)) + \"/\" + str(len(trung_tam)))\nprint(\"Phần hệ thống ngừng: \" + str(round(100 * len(ngung) / len(trung_tam))) + \"%\")\n",
      expectedOutput: "Trung tâm ngừng: 3/4\nPhần hệ thống ngừng: 75%",
      hints: [
        "Câu hỏi của bài là bán kính 50 km, nhưng biến ban_kinh đang là 5.",
        "Khoảng cách tới sự kiện của A, B, C đều dưới 50 km; D thì xa hơn nhiều.",
      ],
    },
    {
      type: "flow",
      title: "Một giờ tra cứu để trả lời: sự kiện trong bán kính 50 km làm ngừng bao nhiêu phần",
      steps: [
        {
          label: "Lấy vị trí thật",
          detail:
            "Mở hợp đồng hoặc bảng điều khiển của nhà cung cấp, ghi địa điểm cụ thể của từng nơi đang chạy hệ thống, không dừng ở tên vùng. Hầu như không đội nào từng làm bước này vì tên vùng đã trả lời giúp.",
        },
        {
          label: "Tra thứ dùng chung",
          detail:
            "Với mỗi địa điểm, hỏi cùng lưới điện hay trạm biến áp nào không, cùng nhà cung cấp điện khu vực không. Câu trả lời nằm ngoài mã nên chỉ có cách hỏi nhà cung cấp, không lục tệp cấu hình.",
        },
        {
          label: "Đường truyền và con người",
          detail:
            "Các tuyến cáp có đi chung hành lang không, và nhân viên vận hành sống ở đâu so với nơi họ phải tới khi có bão hoặc lụt. Hai câu này hay bị quên vì chúng không nằm trong sơ đồ hạ tầng.",
        },
        {
          label: "Vẽ bán kính năm mươi cây số",
          detail:
            "Đặt một vòng tròn quanh từng địa điểm và đếm những nơi nằm trong cùng một vòng. Con số cần ghi là phần hệ thống ngừng nếu một sự kiện phủ trọn vòng đó, chứ không phải số vùng đang có.",
        },
        {
          label: "Ghi và chuẩn bị trước",
          detail:
            "Sự cố vật lý không có nút quay lại; phải chờ điện, chờ nước rút, chờ người tới được. Phương án chỉ có tác dụng nếu chuẩn bị từ trước, nên kết quả của giờ tra cứu này là một việc cụ thể trong kế hoạch, không phải một con số cất ngăn kéo.",
        },
      ],
    },
  ],
};
