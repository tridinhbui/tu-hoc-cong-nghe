import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 28. Một người viết cho một tệp.
export const P28_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Bất đồng bộ ─────────────────────────────────────────────────────────
  "case-mot-hang-doi-bi-ton-dong": [
    {
      type: "exercise",
      language: "python",
      title: "Đọc tồn đọng từ tốc độ vào và ra",
      task: "Cho số tin vào và số tin được xử lý ra mỗi phút trong 5 phút. In số tin tồn đọng cuối mỗi phút (tồn = tồn trước + vào - ra), rồi in kết luận: nếu tốc độ ra cuối kỳ tụt hơn 20% so với đầu kỳ trong khi tốc độ vào gần như phẳng (lệch không quá 10%), in 'Người tiêu thụ chậm đi - đừng thêm người tiêu thụ'; nếu tốc độ vào tăng hơn 20%, in 'Nhà sản xuất tăng - mở rộng người tiêu thụ'; còn lại in 'Chưa rõ - đo thêm'.",
      starter:
        "vao = [500, 510, 495, 505, 500]\nra = [500, 420, 300, 200, 150]\nton = 0\nfor phut in range(5):\n    ton += ra[phut] - vao[phut]\n    print(f\"Phút {phut + 1}: tồn {ton}\")\n\nprint(\"Nhà sản xuất tăng - mở rộng người tiêu thụ\")",
      solution:
        "vao = [500, 510, 495, 505, 500]\nra = [500, 420, 300, 200, 150]\nton = 0\nfor phut in range(5):\n    ton += vao[phut] - ra[phut]\n    print(f\"Phút {phut + 1}: tồn {ton}\")\n\nif ra[-1] < ra[0] * 0.8 and abs(vao[-1] - vao[0]) <= vao[0] * 0.1:\n    print(\"Người tiêu thụ chậm đi - đừng thêm người tiêu thụ\")\nelif vao[-1] > vao[0] * 1.2:\n    print(\"Nhà sản xuất tăng - mở rộng người tiêu thụ\")\nelse:\n    print(\"Chưa rõ - đo thêm\")",
      expectedOutput:
        "Phút 1: tồn 0\nPhút 2: tồn 90\nPhút 3: tồn 285\nPhút 4: tồn 590\nPhút 5: tồn 940\nNgười tiêu thụ chậm đi - đừng thêm người tiêu thụ",
      hints: [
        "Tồn đọng tăng khi vào lớn hơn ra, nên phép cộng phải là vào trừ ra chứ không phải ngược lại.",
        "Kết luận lấy từ hai so sánh: ra cuối kỳ so với ra đầu kỳ, và vào cuối kỳ so với vào đầu kỳ.",
      ],
    },
    {
      type: "flow",
      title: "Ba mươi giây đầu và các bước sau đó",
      steps: [
        {
          label: "Vẽ vào và ra chồng nhau",
          detail:
            "Mở hai đường: số tin vào mỗi phút và số tin xử lý ra mỗi phút, cùng một trục thời gian. Đường tồn đọng chỉ cho biết có chuyện, còn hai đường này cho biết chuyện nằm ở phía nào.",
        },
        {
          label: "Đọc hình dạng",
          detail:
            "Vào phẳng và ra tụt nghĩa là phía dưới người tiêu thụ đang yếu. Vào dựng đứng và ra phẳng nghĩa là có nhiều việc hơn mức thường. Hai hình dạng này cần hai hành động ngược nhau.",
        },
        {
          label: "Giảm tải chỗ yếu",
          detail:
            "Nếu chỗ yếu là cơ sở dữ liệu đầy kết nối hay dịch vụ ngoài chậm, thêm người tiêu thụ chỉ đẩy thêm kết nối vào chỗ đang ngợp. Việc đầu tiên là bớt áp lực lên nó.",
        },
        {
          label: "Tăng thông lượng sau",
          detail:
            "Chỉ khi chỗ yếu hồi phục mới thêm người tiêu thụ để tiêu hao phần tồn. Làm sớm hơn thì tồn đọng không giảm mà sự cố lan rộng hơn.",
        },
        {
          label: "Mở hàng đợi thư chết",
          detail:
            "Trong lúc phía dưới yếu, một phần tin đã hết số lần thử và rơi vào đây. Chúng không còn nằm trong con số tồn đọng, nên bảng theo dõi xanh vẫn có thể che việc chưa được làm.",
        },
      ],
    },
  ],

  "cong-viec-theo-lich-so-voi-su-kien": [
    {
      type: "scenario",
      title: "Điểm thưởng bị thiếu mà không ai báo lỗi",
      start: "dau",
      nodes: {
        dau: {
          text: "Hệ thống cộng điểm thưởng cho khách bằng sự kiện 'đơn đã giao'. Cuối tháng bộ phận chăm sóc khách báo vài chục khách không nhận được điểm, nhưng không có dòng lỗi nào trong nhật ký. Bạn làm gì trước?",
          choices: [
            { label: "Tăng số lần thử lại của người tiêu thụ sự kiện", next: "thulai" },
            { label: "Thêm công việc hằng đêm đối chiếu đơn với điểm", next: "doichieu" },
            { label: "Coi là ngoại lệ hiếm vì sự kiện vốn đã tin cậy", next: "boqua" },
          ],
        },
        thulai: {
          text: "Số lần thử lại tăng nhưng điểm vẫn thiếu: những sự kiện này chưa bao giờ tới được người tiêu thụ nên không có gì để thử lại. Bạn cần biết cách phát hiện thứ chưa từng được kích hoạt. Tiếp theo?",
          choices: [
            { label: "Đặt cảnh báo khi số lỗi của người tiêu thụ tăng", next: "canhbao" },
            { label: "Chạy một công việc theo lịch quét đơn đã giao", next: "doichieu" },
          ],
        },
        canhbao: {
          text: "Cảnh báo không bao giờ kêu, vì số lỗi vẫn bằng không: một sự kiện bị mất thì không sinh ra lỗi nào. Tháng sau lại có thêm khách thiếu điểm và bạn lại biết qua bộ phận chăm sóc khách.",
          ending: "bad",
        },
        boqua: {
          text: "Không làm gì. Vài tháng sau một lần đổi cấu hình bộ lọc làm rơi cả một loại đơn, hàng nghìn khách mất điểm trong hai tuần trước khi ai đó nhận ra. Khách quen là nhóm phàn nàn to nhất.",
          ending: "bad",
        },
        doichieu: {
          text: "Công việc chạy mỗi đêm so từng đơn đã giao với điểm đã cộng và tự bổ sung phần thiếu. Nó tìm ra đúng nhóm đơn bị rơi, và từ đó cứ thiếu là có dòng báo ngay hôm sau. Sự kiện vẫn là đường chính, lịch là lưới bắt những gì sự kiện làm rơi.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Độ trễ cố định của công việc theo lịch",
      caption:
        "Số liệu minh hoạ. Công việc chạy mỗi X phút thì một việc xảy ra ngay sau lần chạy phải chờ gần hết khoảng đó. Độ trễ này không đổi dù tải nhiều hay ít, nên lịch không thay được sự kiện ở những việc cần phản hồi tức thì.",
      kind: "line",
      xLabel: "Khoảng cách giữa hai lần chạy (phút)",
      yLabel: "Độ trễ (phút)",
      x: { from: 60, to: 1440, step: 60 },
      params: [{ id: "proc", label: "Thời gian xử lý một lượt", min: 1, max: 60, step: 1, value: 10, unit: "phút" }],
      series: [
        { label: "Độ trễ tối đa", expr: "x+proc" },
        { label: "Độ trễ trung bình", expr: "x/2+proc" },
      ],
    },
  ],

  "mot-luong-dat-hang-bat-dong-bo": [
    {
      type: "exercise",
      language: "javascript",
      title: "Xếp thứ tự các bước tiến của đơn hàng",
      task: "Mỗi bước có thể thu hồi được (thuHoi: true) hoặc không. Sắp lại danh sách để mọi bước thu hồi được đứng trước, giữ nguyên thứ tự ban đầu trong mỗi nhóm. In mỗi bước dạng '1. Tên' và, nếu thu hồi được, thêm ' (ngược: tên hành động ngược)'. Bước không thu hồi được in kèm ' (không thu hồi được)'.",
      starter:
        "const buoc = [\n  { ten: \"Gửi thư xác nhận\", thuHoi: false },\n  { ten: \"Giữ hàng\", thuHoi: true, nguoc: \"nhả hàng\" },\n  { ten: \"Thu tiền\", thuHoi: true, nguoc: \"hoàn tiền\" },\n  { ten: \"Giao cho vận chuyển\", thuHoi: false },\n];\nbuoc.forEach((b, i) => {\n  console.log(`${i + 1}. ${b.ten}`);\n});",
      solution:
        "const buoc = [\n  { ten: \"Gửi thư xác nhận\", thuHoi: false },\n  { ten: \"Giữ hàng\", thuHoi: true, nguoc: \"nhả hàng\" },\n  { ten: \"Thu tiền\", thuHoi: true, nguoc: \"hoàn tiền\" },\n  { ten: \"Giao cho vận chuyển\", thuHoi: false },\n];\nconst sapXep = [...buoc.filter((b) => b.thuHoi), ...buoc.filter((b) => !b.thuHoi)];\nsapXep.forEach((b, i) => {\n  const ghiChu = b.thuHoi ? `ngược: ${b.nguoc}` : \"không thu hồi được\";\n  console.log(`${i + 1}. ${b.ten} (${ghiChu})`);\n});",
      expectedOutput:
        "1. Giữ hàng (ngược: nhả hàng)\n2. Thu tiền (ngược: hoàn tiền)\n3. Gửi thư xác nhận (không thu hồi được)\n4. Giao cho vận chuyển (không thu hồi được)",
      hints: [
        "Dùng filter hai lần rồi nối hai mảng lại, vì filter giữ nguyên thứ tự ban đầu.",
        "Bước nào thất bại giữa chừng cũng chỉ cần chạy ngược các bước thu hồi được đã xong trước nó, nên các bước không thu hồi được phải ở cuối.",
      ],
    },
    {
      type: "flow",
      title: "Một đơn hàng đi từ lúc bấm nút tới lúc đối chiếu",
      steps: [
        {
          label: "Đồng bộ: kiểm hàng còn",
          detail:
            "Người dùng đang chờ câu trả lời 'đặt được hay không', nên đây là phần duy nhất chạy trong yêu cầu. Nó trả về ngay và đơn chuyển sang trạng thái đang xử lý.",
        },
        {
          label: "Ghi đơn và sự kiện cùng giao dịch",
          detail:
            "Đơn và bản ghi sự kiện 'đơn đã tạo' vào hộp thư đi trong cùng một giao dịch. Hoặc cả hai tồn tại, hoặc không cái nào: không còn đơn tồn tại mà không ai biết.",
        },
        {
          label: "Chuyển sự kiện ra ngoài",
          detail:
            "Một tiến trình đọc hộp thư đi và đẩy sự kiện sang hàng đợi. Nó có thể đẩy một sự kiện hai lần nếu bị ngắt giữa chừng, và đó là lý do bước sau phải chịu được nhận trùng.",
        },
        {
          label: "Các bước tiến, thu hồi được trước",
          detail:
            "Giữ hàng rồi thu tiền, mỗi người tiêu thụ bất biến khi lặp lại. Nếu thu tiền thất bại, hành động ngược nhả hàng được chạy, chứ không có giao dịch nào để huỷ.",
        },
        {
          label: "Gửi thư ở cuối",
          detail:
            "Thư đã gửi thì không thu hồi được, nên nó chỉ chạy khi mọi bước trước đã thành công. Trạng thái đơn đổi thành đã xong và người dùng thấy điều đó.",
        },
        {
          label: "Đối chiếu hằng đêm",
          detail:
            "Một công việc nhìn từ ngoài chuỗi sự kiện: đơn nào ghi nhận mà chưa tới trạng thái cuối. Đây là thứ duy nhất bắt được sự kiện bị mất, vì mọi cơ chế khác đều do chính sự kiện kích hoạt.",
        },
      ],
    },
  ],

  "on-tap-xu-ly-bat-dong-bo": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản nháp thiết kế luồng thanh toán của 'AI'",
      task: "Một công cụ AI viết đoạn tóm tắt thiết kế luồng thanh toán bất đồng bộ cho đội. Bấm vào những câu bạn thấy sai về kỹ thuật rồi nộp.",
      segments: [
        {
          text: "Sau khi thu tiền thành công, hệ thống ghi đơn và gửi tin nhắn sang hàng đợi, nên bước gửi thư xác nhận được đặt ở cuối luồng.",
        },
        {
          text: "Vì việc ghi đơn và việc gửi tin nằm trong cùng một giao dịch cơ sở dữ liệu, tin nhắn không bao giờ bị sót.",
          error:
            "Giao dịch cơ sở dữ liệu không bọc được hàng đợi tin nhắn bên ngoài. Khe hở giữa ghi dữ liệu và gửi tin nhắn chính là lý do có mẫu hộp thư đi, và cả khi dùng nó vẫn cần đối chiếu.",
        },
        {
          text: "Khi người tiêu thụ nhận một tin hai lần, giao dịch cơ sở dữ liệu sẽ tự ngăn việc xử lý trùng.",
          error:
            "Giao dịch bảo vệ tính nhất quán của một lần ghi, không nhận ra tin đã xử lý rồi. Phải viết thao tác bất biến khi lặp lại, hoặc dùng khoá chống trùng do bên gọi sinh ra.",
        },
        {
          text: "Nếu bước thu tiền thất bại sau khi đã giữ hàng, ta chạy hành động ngược là nhả hàng thay vì cố huỷ một giao dịch đã commit.",
        },
        {
          text: "Hàng đợi tồn mười nghìn tin là dấu hiệu chắc chắn của sự cố, nên cảnh báo đặt ngay tại ngưỡng đó.",
          error:
            "Mười nghìn tin có thể là vài giây việc hoặc vài giờ, tuỳ tốc độ xử lý. Ngưỡng cảnh báo hợp lý dựa vào thời gian cần để tiêu hết tồn đọng, chứ không phải một con số tuyệt đối.",
        },
        {
          text: "Trước khi đóng sự cố nên mở hàng đợi thư chết, vì tin hết số lần thử nằm ở đó chứ không nằm trong con số tồn đọng.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Mỗi cơ chế chặn đúng một kiểu hỏng",
      intro:
        "Hãy nghĩ tới một quán ăn gọi món bằng phiếu giấy. Phiếu bị rơi trên đường vào bếp là một kiểu hỏng, phiếu bị đưa hai lần là kiểu khác, món đã nấu mà khách đổi ý lại là kiểu khác nữa. Mỗi kiểu cần một cách xử lý riêng.",
      columns: ["Cơ chế", "Sinh ra để chặn", "Vẫn không chặn được"],
      rows: [
        [
          "Hộp thư đi",
          "Đơn đã ghi mà không ai nhận được thông báo",
          "Tin nhắn bị mất ở chỗ khác trong chuỗi — cần lượt đối chiếu hằng đêm",
        ],
        [
          "Thao tác bất biến, khoá chống trùng",
          "Cùng một tin nhận hai lần khi thử lại",
          "Việc không làm lại được như gửi thư — phải đặt ở cuối luồng",
        ],
        [
          "Hành động bù trừ",
          "Một bước thất bại sau khi các bước trước đã xong",
          "Bước đã không thu hồi được — nên sắp nó cuối cùng",
        ],
        [
          "Hàng đợi thư chết",
          "Tin hết số lần thử mà không bị mất lặng lẽ",
          "Việc vẫn còn đó nếu không ai mở hàng đợi này ra kiểm",
        ],
      ],
      oneLiner: "Hỏi 'cơ chế này sinh ra để chặn kiểu hỏng nào' trước khi dùng nó, vì không cơ chế nào chặn được hết.",
    },
  ],

  // ── Masterclass ─────────────────────────────────────────────────────────
  "masterclass-ha-tang-trung-tam-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Máy mạnh hơn nhưng tủ lại yếu đi",
      task: "Một tủ có 42 vị trí và được cấp 8 kW điện. Máy A ăn 450 W và có năng lực 100 đơn vị, máy B ăn 700 W và có năng lực 150 đơn vị. Số máy lắp được là số nhỏ hơn giữa số vị trí và số máy mà công suất điện cấp nổi. In số máy và tổng năng lực của tủ cho từng loại, rồi in loại cho tủ nhiều năng lực hơn.",
      starter:
        "vi_tri = 42\ndien_w = 8000\nmay = {\"A\": (450, 100), \"B\": (700, 150)}\nkq = {}\nfor ten, (watt, nang_luc) in may.items():\n    so_may = vi_tri\n    kq[ten] = so_may * nang_luc\n    print(f\"Máy {ten}: lắp {so_may} máy, năng lực {kq[ten]}\")\nprint(f\"Chọn máy {max(kq, key=kq.get)}\")",
      solution:
        "vi_tri = 42\ndien_w = 8000\nmay = {\"A\": (450, 100), \"B\": (700, 150)}\nkq = {}\nfor ten, (watt, nang_luc) in may.items():\n    so_may = min(vi_tri, dien_w // watt)\n    kq[ten] = so_may * nang_luc\n    print(f\"Máy {ten}: lắp {so_may} máy, năng lực {kq[ten]}\")\nprint(f\"Chọn máy {max(kq, key=kq.get)}\")",
      expectedOutput: "Máy A: lắp 17 máy, năng lực 1700\nMáy B: lắp 11 máy, năng lực 1650\nChọn máy A",
      hints: [
        "Công suất điện cấp chia cho công suất một máy cho ra số máy tối đa về điện; dùng chia lấy phần nguyên //.",
        "Giới hạn thật là cái hết trước: lấy min của giới hạn vị trí và giới hạn điện.",
      ],
    },
    {
      type: "chart",
      title: "Cái hết trước trong một tủ máy",
      caption:
        "Số liệu minh hoạ: tủ 42 vị trí, công suất điện kéo được trên thanh trượt. Khi máy ăn ít điện thì vị trí là giới hạn; vượt một ngưỡng thì điện là giới hạn và phần vị trí còn lại bỏ trống nhưng vẫn nằm trong hợp đồng thuê.",
      kind: "line",
      xLabel: "Công suất một máy (W)",
      yLabel: "Số máy lắp được",
      x: { from: 300, to: 1500, step: 100 },
      params: [{ id: "cap", label: "Công suất điện cấp cho tủ", min: 4, max: 20, step: 1, value: 8, unit: "kW" }],
      series: [
        { label: "Số máy lắp được", expr: "min(42, floor(cap*1000/x))" },
        { label: "Số vị trí trong tủ", expr: "42" },
      ],
    },
  ],

  "masterclass-mang-doanh-nghiep-va-cam-ket-duong-truyen": [
    {
      type: "scenario",
      title: "Hai nhà cung cấp, có thật là hai đường?",
      start: "dau",
      nodes: {
        dau: {
          text: "Công ty cần đường truyền dự phòng. Nhà cung cấp thứ hai chào một đường 'độc lập hoàn toàn' với đường hiện tại, giá hợp lý. Bạn xử lý thế nào?",
          choices: [
            { label: "Ký ngay vì hai hợp đồng khác nhau tức là độc lập", next: "ky" },
            { label: "Hỏi tuyến cáp và điểm vào toà nhà của đường mới", next: "hoi" },
            { label: "Chọn nhà cung cấp rẻ nhất trong số các chào giá", next: "re" },
          ],
        },
        ky: {
          text: "Cả hai đường đi cùng một cống ngầm và vào qua cùng một phòng thiết bị. Một công trình đào đường cắt cáp, văn phòng mất kết nối bốn giờ và đường 'dự phòng' đứt cùng lúc với đường chính.",
          ending: "bad",
        },
        re: {
          text: "Giá rẻ nhất lại đi nhờ sợi cáp của nhà cung cấp hiện tại. Khi sợi đó gặp sự cố, bạn trả tiền cho hai hợp đồng mà chỉ nhận được đúng một đường truyền không hoạt động.",
          ending: "bad",
        },
        hoi: {
          text: "Nhà cung cấp trả lời: tuyến chính đi riêng, nhưng đoạn cuối vào toà nhà dùng chung cống ngầm với đường hiện tại. Bạn đề xuất gì?",
          choices: [
            { label: "Chấp nhận vì đoạn chung chỉ chiếm phần ngắn", next: "chapnhan" },
            { label: "Yêu cầu đi cửa vào khác hoặc đi tuyến khác", next: "sla" },
          ],
        },
        chapnhan: {
          text: "Đoạn ngắn nhất cũng là chỗ dễ bị đào trúng nhất, và đó chính là điểm hỏng chung. Sơ đồ logic vẫn có hai đường, nhưng ở tầng vật lý chỉ có một.",
          ending: "bad",
        },
        sla: {
          text: "Đường mới được chuyển sang một cửa vào khác. Giờ tới bản cam kết dịch vụ ghi 99,9%. Bạn làm gì với con số này?",
          choices: [
            { label: "Đọc xem đo ở đâu, đo cái gì và loại trừ gì", next: "tot" },
            { label: "Yên tâm vì có mức bồi thường nếu vi phạm", next: "boithuong" },
          ],
        },
        boithuong: {
          text: "Cam kết đo ở biên mạng nhà cung cấp, nên đứt đoạn cuối tới văn phòng không tính. Khi sự cố xảy ra, khoản bồi thường chỉ là một phần phí tháng và không bù được doanh thu mất trong bốn giờ.",
          ending: "bad",
        },
        tot: {
          text: "Bạn thấy cam kết đo tới tận thiết bị của bạn và nêu rõ các trường hợp loại trừ, rồi đưa nó vào bản ghi quyết định. Hai đường đi hai cửa vào, và cam kết đo đúng chỗ hay hỏng.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Kiểm một phương án dự phòng từ tầng vật lý",
      steps: [
        {
          label: "Hỏi tuyến cáp",
          detail:
            "Yêu cầu từng nhà cung cấp cho biết đường cáp đi qua những đâu. Câu trả lời 'độc lập về logic' chưa đủ: hai hợp đồng khác nhau vẫn có thể chạy trên một sợi cáp.",
        },
        {
          label: "Đi xuống nhìn điểm vào",
          detail:
            "Đến tầng hầm hay phòng thiết bị và xem mỗi đường cáp vào toà nhà ở đâu. Hai đường vào chung một cửa là hai đường có chung một điểm hỏng, kiểm được bằng cách đi bộ.",
        },
        {
          label: "Kiểm nguồn điện và thiết bị",
          detail:
            "Hai đường truyền nhưng cùng cắm vào một bộ định tuyến hay một nguồn thì cũng là một điểm hỏng. Tách chúng trước khi coi là có dự phòng.",
        },
        {
          label: "Đọc cam kết dịch vụ",
          detail:
            "Tìm ba thứ: đo cái gì, đo ở đâu, loại trừ gì. Đoạn cuối tới bạn là đoạn hay hỏng nhất, nên nếu nó nằm ngoài phạm vi đo thì con số phần trăm không bảo vệ bạn.",
        },
        {
          label: "Ngắt thử một đường",
          detail:
            "Rút một đường trong giờ thấp điểm và xem hệ thống có chuyển sang đường còn lại không, mất bao lâu. Phương án chưa được thử là phương án chưa tồn tại.",
        },
      ],
    },
  ],

  "ky-thuat-giai-doan-dau-khoi-nghiep": [
    {
      type: "scenario",
      title: "Ba tuần trước buổi trình diễn với nhà đầu tư",
      start: "dau",
      nodes: {
        dau: {
          text: "Đội bốn người còn ba tuần. Việc cần làm gồm đăng nhập, thanh toán, mô hình dữ liệu khách hàng và một màn gợi ý sản phẩm chưa chắc sẽ giữ lại. Bạn chia công sức thế nào?",
          choices: [
            { label: "Làm cẩn thận như nhau cho mọi phần, kể cả gợi ý", next: "deu" },
            { label: "Làm tắt tất cả để kịp, sửa sau khi có tiền", next: "tat" },
            { label: "Cẩn thận phần dữ liệu và thanh toán, tắt phần gợi ý", next: "chon" },
          ],
        },
        deu: {
          text: "Ba tuần hết, phần đăng nhập và thanh toán tốt nhưng màn gợi ý còn dang dở và chưa có ai thử nó với khách thật. Buổi trình diễn có bản đẹp mà không có điều gì để học.",
          ending: "bad",
        },
        tat: {
          text: "Buổi trình diễn kịp, nhưng mô hình dữ liệu viết vội đã chứa dữ liệu thật của khách sau sáu tháng. Sửa nó cần một cuộc di trú, một khoảng ngừng và một phương án quay lui mà đội không còn thời gian làm.",
          ending: "bad",
        },
        chon: {
          text: "Màn gợi ý được làm bằng một danh sách cố định, chạy được trong ngày. Bạn sắp chốt tuần, vậy ghi khoản nợ này ở đâu?",
          choices: [
            { label: "Nhớ trong đầu, cả đội đều biết rồi", next: "nho" },
            { label: "Một dòng trong tệp ghi chú, kèm điều kiện phải trả", next: "ghi" },
          ],
        },
        nho: {
          text: "Người viết phần gợi ý rời đội sau hai tháng. Khi số người dùng đồng thời vượt một nghìn, danh sách cố định làm hệ thống chậm và không ai nhớ nó từng là một khoản nợ.",
          ending: "bad",
        },
        ghi: {
          text: "Dòng ghi chú nêu rõ: danh sách cố định, sẽ hỏng khi quá một nghìn người dùng đồng thời. Điều kiện ấy đưa khoản nợ vào kế hoạch quý sau, trước khi nó xuất hiện thành sự cố.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Bốn phần của một sản phẩm giai đoạn đầu",
      intro:
        "Hãy nghĩ tới việc dọn vào một căn nhà thuê. Bạn sơn lại tường và thuê đồ nội thất vì có thể đổi chỗ sau một tuần. Nhưng bạn không đục móng hay thay khoá cửa tạm bợ, vì sai ở đó thì sửa đắt và nguy hiểm.",
      columns: ["Phần của sản phẩm", "Giống như", "Mức đầu tư nên có"],
      rows: [
        ["Mô hình dữ liệu", "Móng nhà", "Cẩn thận nhất — sau sáu tháng đã có dữ liệu thật nằm trong đó"],
        ["Đăng nhập, tính tiền", "Khoá cửa và két", "Đầy đủ — sai ở đây tốn tiền thật và nó còn ở lại"],
        ["Giao diện, luồng thao tác", "Sơn tường", "Làm nhanh — có thể bị vứt trong một tuần"],
        ["Thuật toán gợi ý", "Đồ nội thất thuê", "Làm tắt có ghi chú — kèm điều kiện phải trả"],
      ],
      oneLiner: "Bảo vệ đầy đủ phần chắc chắn, chấp nhận nợ ở phần đang dò, và ghi lại mình đã vay gì.",
    },
  ],

  "quan-tri-rui-ro-dinh-luong-var-black-swan": [
    {
      type: "exercise",
      language: "python",
      title: "Một phần trăm yêu cầu chậm, bao nhiêu phiên bị ảnh hưởng",
      task: "Phân vị 99 nghĩa là 1% số yêu cầu chậm. Một phiên làm việc gồm nhiều yêu cầu độc lập. Với p = 0.01, in xác suất (tính theo phần trăm, một chữ số thập phân) để một phiên có n yêu cầu gặp ÍT NHẤT một yêu cầu chậm, với n là 1, 10 và 100.",
      starter:
        "p = 0.01\nfor n in (1, 10, 100):\n    xac_suat = n * p * 100\n    print(f\"{n} yêu cầu: {xac_suat:.1f}%\")",
      solution:
        "p = 0.01\nfor n in (1, 10, 100):\n    xac_suat = (1 - (1 - p) ** n) * 100\n    print(f\"{n} yêu cầu: {xac_suat:.1f}%\")",
      expectedOutput: "1 yêu cầu: 1.0%\n10 yêu cầu: 9.6%\n100 yêu cầu: 63.4%",
      hints: [
        "Dễ hơn là tính xác suất KHÔNG gặp yêu cầu chậm nào: mỗi yêu cầu có 0.99 để nhanh, n yêu cầu nhân lên n lần.",
        "Rồi lấy 1 trừ đi kết quả đó. Phép nhân n * p chỉ gần đúng khi n nhỏ.",
      ],
    },
    {
      type: "chart",
      title: "Phần đuôi nhân lên theo độ dài phiên",
      caption:
        "Số liệu minh hoạ, tính theo giả định các yêu cầu độc lập. Kéo tỷ lệ chậm để thấy một con số trông nhỏ trên mỗi yêu cầu có thể thành khả năng cao mà một người dùng bình thường gặp phải trong một phiên.",
      kind: "line",
      xLabel: "Số yêu cầu trong một phiên",
      yLabel: "Xác suất gặp ít nhất một yêu cầu chậm (%)",
      x: { from: 0, to: 300, step: 20 },
      params: [{ id: "p", label: "Tỷ lệ yêu cầu chậm", min: 0.1, max: 5, step: 0.1, value: 1, unit: "%" }],
      series: [{ label: "Xác suất mỗi phiên", expr: "(1-(1-p/100)^x)*100" }],
    },
  ],

  "phan-mem-tiet-kiem-nang-luong": [
    {
      type: "exercise",
      language: "python",
      title: "Mười máy rảnh ăn bao nhiêu điện",
      task: "Một máy chủ tiêu thụ P = 300 W ở mức đỉnh và khoảng một nửa số đó khi nhàn rỗi, tăng tuyến tính tới đỉnh: công suất = P × (0.5 + 0.5 × U), với U là mức sử dụng từ 0 tới 1. So mười máy chạy ở U = 0.1 với hai máy gánh cùng lượng việc ở U = 0.5. In điện tiêu thụ một tháng (30 ngày, đơn vị kWh, làm tròn số nguyên) của hai cách và phần trăm giảm.",
      starter:
        "P = 300\n\ndef cong_suat(u):\n    return P * u\n\ndef kwh_thang(so_may, u):\n    return so_may * cong_suat(u) * 24 * 30 / 1000\n\ntruoc = kwh_thang(10, 0.1)\nsau = kwh_thang(2, 0.5)\nprint(f\"Trước: {round(truoc)} kWh/tháng\")\nprint(f\"Sau: {round(sau)} kWh/tháng\")\nprint(f\"Giảm: {round(truoc - sau)} kWh ({round((truoc - sau) / truoc * 100)}%)\")",
      solution:
        "P = 300\n\ndef cong_suat(u):\n    return P * (0.5 + 0.5 * u)\n\ndef kwh_thang(so_may, u):\n    return so_may * cong_suat(u) * 24 * 30 / 1000\n\ntruoc = kwh_thang(10, 0.1)\nsau = kwh_thang(2, 0.5)\nprint(f\"Trước: {round(truoc)} kWh/tháng\")\nprint(f\"Sau: {round(sau)} kWh/tháng\")\nprint(f\"Giảm: {round(truoc - sau)} kWh ({round((truoc - sau) / truoc * 100)}%)\")",
      expectedOutput: "Trước: 1188 kWh/tháng\nSau: 324 kWh/tháng\nGiảm: 864 kWh (73%)",
      hints: [
        "Công suất không tỉ lệ thẳng với U: máy rảnh vẫn ăn P × 0.5, và phần còn lại mới tăng theo U.",
        "Với công thức đúng, mười máy ở U = 0.1 ăn 165 W mỗi máy; hai máy ở U = 0.5 ăn 225 W mỗi máy.",
      ],
    },
    {
      type: "feynman",
      title: "Giảm thật hay chỉ chuyển chỗ",
      intro:
        "Hãy nghĩ tới tiền điện của một căn nhà. Tắt đèn phòng không ai ở thì hoá đơn giảm thật. Còn đem bóng đèn sang nhà hàng xóm cắm thì hoá đơn nhà bạn đẹp hơn, nhưng tổng lượng điện của khu phố không đổi.",
      columns: ["Việc làm", "Loại", "Vì sao"],
      rows: [
        ["Gộp tải để cụm máy chạy mức cao", "Giảm thật", "Bớt máy rảnh vẫn ăn khoảng nửa công suất đỉnh"],
        ["Xoá tác vụ định kỳ không ai đọc", "Giảm thật", "Điện giảm kể cả khi mọi vùng đều chạy bằng nguồn sạch"],
        ["Dời công việc sang vùng dùng điện tái tạo", "Chuyển chỗ", "Lượng điện sạch trong vùng là hữu hạn, tổng tiêu thụ không đổi"],
        ["Mua chứng chỉ bù trừ vào báo cáo", "Chuyển chỗ", "Con số báo cáo giảm mà không có thay đổi nào trong hệ thống"],
      ],
      oneLiner: "Giảm thật là tổng ki-lô-oát giờ xuống và còn nguyên giá trị kể cả khi mọi vùng đều sạch.",
    },
  ],

  // ── Case chuyên sâu ─────────────────────────────────────────────────────
  "mot-lan-toi-uu-lon": [
    {
      type: "exercise",
      language: "python",
      title: "Tách phần một lần khỏi phần lặp lại được",
      task: "Độ trễ p95 của một dịch vụ giảm từ 900 ms xuống 600 ms trong quý, nhưng 150 ms trong đó là do gỡ một tính năng nặng (thay đổi một lần). In cải thiện tổng, phần một lần, phần lặp lại được, tỷ trọng một lần (phần trăm, số nguyên), và dự báo p95 cuối quý sau nếu chỉ lặp lại được mức cải thiện lặp lại của quý này.",
      starter:
        "dau, cuoi = 900, 600\nmot_lan = 150\ntong = dau - cuoi\nlap_lai = tong\nprint(f\"Cải thiện tổng: {tong} ms\")\nprint(f\"Một lần: {mot_lan} ms\")\nprint(f\"Lặp lại được: {lap_lai} ms\")\nprint(f\"Tỷ trọng một lần: {round(mot_lan / tong * 100)}%\")\nprint(f\"Dự báo cuối quý sau: {cuoi - lap_lai} ms\")",
      solution:
        "dau, cuoi = 900, 600\nmot_lan = 150\ntong = dau - cuoi\nlap_lai = tong - mot_lan\nprint(f\"Cải thiện tổng: {tong} ms\")\nprint(f\"Một lần: {mot_lan} ms\")\nprint(f\"Lặp lại được: {lap_lai} ms\")\nprint(f\"Tỷ trọng một lần: {round(mot_lan / tong * 100)}%\")\nprint(f\"Dự báo cuối quý sau: {cuoi - lap_lai} ms\")",
      expectedOutput:
        "Cải thiện tổng: 300 ms\nMột lần: 150 ms\nLặp lại được: 150 ms\nTỷ trọng một lần: 50%\nDự báo cuối quý sau: 450 ms",
      hints: [
        "Phần lặp lại được là phần còn lại sau khi trừ đi các thay đổi một lần khỏi cải thiện tổng.",
        "Dự báo chỉ dựa trên phần lặp lại được, vì phần một lần không xảy ra lần nữa.",
      ],
    },
    {
      type: "chart",
      title: "Cùng một mức cải thiện, hai quỹ đạo khác nhau",
      caption:
        "Số liệu minh hoạ: chỉ số bắt đầu ở 100 và càng thấp càng tốt. Kéo phần một lần lên cao và phần lặp lại xuống thấp để thấy chỉ số nhảy một bậc ở quý đầu rồi gần như đứng yên.",
      kind: "line",
      xLabel: "Quý",
      yLabel: "Chỉ số (đầu kỳ = 100)",
      x: { from: 0, to: 4, step: 1 },
      params: [
        { id: "mot", label: "Phần cải thiện một lần (ở quý 1)", min: 0, max: 40, step: 5, value: 20, unit: "điểm" },
        { id: "lap", label: "Phần lặp lại mỗi quý", min: 0, max: 10, step: 1, value: 3, unit: "điểm" },
      ],
      series: [{ label: "Chỉ số theo quý", expr: "100-min(x,1)*mot-x*lap" }],
    },
  ],

  "case-uoc-luong-dung-luong": [
    {
      type: "exercise",
      language: "python",
      title: "Cần bao nhiêu máy khi mất một vùng vẫn chịu được",
      task: "Dịch vụ tham chiếu có tải đỉnh 3000 request/phút, hệ thống mới được ước là nặng gấp 8 lần. Một máy gánh được 1000 request/phút. Triển khai trên 3 vùng, và nếu mất một vùng thì hai vùng còn lại phải gánh toàn bộ tải đỉnh. In số máy mỗi vùng (làm tròn lên) và tổng số máy.",
      starter:
        "import math\n\ntai_dinh = 3000\nhe_so = 8\nmay_gianh = 1000\nso_vung = 3\n\ntai = tai_dinh * he_so\nmoi_vung = math.ceil(tai / so_vung / may_gianh)\nprint(f\"Máy mỗi vùng: {moi_vung}\")\nprint(f\"Tổng: {moi_vung * so_vung}\")",
      solution:
        "import math\n\ntai_dinh = 3000\nhe_so = 8\nmay_gianh = 1000\nso_vung = 3\n\ntai = tai_dinh * he_so\nmoi_vung = math.ceil(tai / (so_vung - 1) / may_gianh)\nprint(f\"Máy mỗi vùng: {moi_vung}\")\nprint(f\"Tổng: {moi_vung * so_vung}\")",
      expectedOutput: "Máy mỗi vùng: 12\nTổng: 36",
      hints: [
        "Câu hỏi là 'còn lại vùng nào gánh nổi tải', nên chia tải cho số vùng còn lại sau khi mất một vùng.",
        "Mười hai máy mỗi vùng ở đây là hệ quả của một giả định (hệ số 8), và đó là con số nên ghi cạnh kết quả.",
      ],
    },
    {
      type: "flow",
      title: "Chuỗi ước lượng, ghi giả định ở từng bước",
      steps: [
        {
          label: "Chọn dịch vụ tham chiếu",
          detail:
            "Một hệ thống đã chạy có cùng hình dạng tải: ghi nhiều đối chiếu với ghi nhiều, đọc nhiều với đọc nhiều. Chọn khác hình dạng thì hệ số ở bước sau mất nghĩa.",
        },
        {
          label: "Lấy tải giờ cao điểm",
          detail:
            "Dùng số request ở lúc bận nhất của dịch vụ tham chiếu, không dùng trung bình ngày. Trung bình làm phẳng giờ đông, đúng lúc hệ thống mới dễ sập.",
        },
        {
          label: "Nhân hệ số nặng nhẹ",
          detail:
            "Ước hệ thống mới nặng gấp mấy lần dịch vụ tham chiếu và ghi lý do. Đây là chỗ hai người ước cùng bài có thể ra kết quả cách nhau gấp đôi.",
        },
        {
          label: "Tính dự phòng mất một vùng",
          detail:
            "Quyết định các vùng còn lại phải gánh được bao nhiêu khi mất một vùng, rồi chia cho số máy một máy gánh được. Quên bước này thì con số đẹp trên giấy mà sập dây chuyền thật.",
        },
        {
          label: "Trình bày ba kịch bản",
          detail:
            "Cho khoảng thấp, vừa, cao thay vì một con số, kèm hệ số đứng sau mỗi kịch bản. Người quyết định thấy kết quả nhạy với giả định nào, và có thể cãi vào đúng chỗ đó.",
        },
      ],
    },
  ],

  "case-chi-phi-moi-request": [
    {
      type: "exercise",
      language: "python",
      title: "Cùng tăng 40% tổng chi phí, hai tình trạng trái ngược",
      task: "Hai dịch vụ cùng tăng tổng chi phí từ 100 lên 140 (triệu đồng). Dịch vụ A phục vụ 50 → 75 (triệu request), dịch vụ B giữ ở 50 → 50. Với mỗi dịch vụ in chi phí mỗi request trước và sau (hai chữ số thập phân), phần trăm đổi (có dấu, một chữ số thập phân), và kết luận: nếu chi phí mỗi request giảm in 'mở rộng có lợi', ngược lại in 'có chỗ đang bị đốt'.",
      starter:
        "dich_vu = {\"A\": ((100, 50), (140, 75)), \"B\": ((100, 50), (140, 50))}\nfor ten, (truoc, sau) in dich_vu.items():\n    a = truoc[0] / truoc[1]\n    b = sau[0] / sau[1]\n    doi = (sau[0] / truoc[0] - 1) * 100\n    ket_luan = \"có chỗ đang bị đốt\"\n    print(f\"{ten}: {a:.2f} -> {b:.2f} ({doi:+.1f}%) - {ket_luan}\")",
      solution:
        "dich_vu = {\"A\": ((100, 50), (140, 75)), \"B\": ((100, 50), (140, 50))}\nfor ten, (truoc, sau) in dich_vu.items():\n    a = truoc[0] / truoc[1]\n    b = sau[0] / sau[1]\n    doi = (b / a - 1) * 100\n    ket_luan = \"mở rộng có lợi\" if b < a else \"có chỗ đang bị đốt\"\n    print(f\"{ten}: {a:.2f} -> {b:.2f} ({doi:+.1f}%) - {ket_luan}\")",
      expectedOutput:
        "A: 2.00 -> 1.87 (-6.7%) - mở rộng có lợi\nB: 2.00 -> 2.80 (+40.0%) - có chỗ đang bị đốt",
      hints: [
        "Phần trăm đổi phải tính trên chi phí mỗi request (b so với a), không phải trên tổng chi phí.",
        "Kết luận lấy từ việc so b với a, không để cố định một chuỗi cho cả hai dịch vụ.",
      ],
    },
    {
      type: "flow",
      title: "Từ một hoá đơn tới một hành động",
      steps: [
        {
          label: "Gắn nhãn theo dịch vụ",
          detail:
            "Không có nhãn thì hoá đơn chỉ là một con số. Gắn nhãn tài nguyên theo dịch vụ để mỗi khoản tiền có tên và có người chịu trách nhiệm.",
        },
        {
          label: "Chia cho lưu lượng",
          detail:
            "Chi phí mỗi request tách tăng trưởng khỏi lãng phí. Cùng tăng 40% tổng, request cũng tăng thì tốt, request đứng yên thì có chỗ đang bị đốt.",
        },
        {
          label: "Soi ba khoản không đi theo lưu lượng",
          detail:
            "Lưu trữ tích luỹ, truyền dữ liệu ra ngoài, và tài nguyên bật rồi quên tắt. Chúng khiến chi phí mỗi request xấu đi dù lưu lượng không đổi.",
        },
        {
          label: "Đo theo đơn vị nghiệp vụ",
          detail:
            "Chia thêm cho mỗi đơn hàng hay mỗi người dùng hoạt động để nói chuyện được với người ngoài đội. Câu 'mỗi đơn đắt thêm 12%' dễ hành động hơn 'tốn thêm 16 triệu'.",
        },
        {
          label: "Lưu lại mỗi tháng",
          detail:
            "Một điểm đo chưa có hướng. Giữ con số hằng tháng để thấy xu hướng, và nhìn thay đổi theo bản phát hành để biết nó bắt đầu từ đâu.",
        },
      ],
    },
  ],

  "case-chi-phi-va-kien-truc": [
    {
      type: "scenario",
      title: "Chi phí mỗi request tăng 30% trong hai tháng",
      start: "dau",
      nodes: {
        dau: {
          text: "Chi phí mỗi request tăng 30% trong hai tháng. Tài nguyên chưa gắn nhãn theo dịch vụ đầy đủ. Quản lý muốn thấy chi phí giảm ngay tháng sau. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Hạ cấu hình máy và tắt bớt các môi trường thử", next: "cat" },
            { label: "Gắn nhãn theo dịch vụ rồi xếp hạng mức tăng", next: "nhan" },
            { label: "Thương lượng giảm giá với nhà cung cấp hạ tầng", next: "giam" },
          ],
        },
        cat: {
          text: "Chi phí giảm ngay tháng sau, như quản lý muốn. Hai tháng sau nó quay lại mức cũ vì nhu cầu sinh ra chi phí vẫn còn nguyên, và đội mất thêm công vì máy hạ cấu hình bắt đầu chậm.",
          ending: "bad",
        },
        giam: {
          text: "Nhà cung cấp giảm một phần nhỏ, và nó có hiệu lực từ quý sau. Trong lúc đó, nguyên nhân thật vẫn nằm trong mã và mức tăng tiếp tục tích luỹ.",
          ending: "bad",
        },
        nhan: {
          text: "Danh sách xếp hạng cho thấy dịch vụ tìm kiếm chiếm phần lớn mức tăng. Bạn đối chiếu mốc chi phí tăng với nhật ký triển khai: nó khớp với một bản phát hành ba tuần trước. Bạn làm gì tiếp theo?",
          choices: [
            { label: "Tăng thời gian giữ bộ đệm vì nghĩ chắc do truy vấn nhiều", next: "doan" },
            { label: "Mở thay đổi của bản phát hành đó và đếm truy vấn", next: "diff" },
          ],
        },
        doan: {
          text: "Giữ bộ đệm lâu hơn che bớt triệu chứng nhưng không đụng tới chỗ sinh ra nó. Chi phí giảm một ít rồi lại tăng, và đội vẫn chưa biết gốc rễ ở đâu.",
          ending: "bad",
        },
        diff: {
          text: "Bản phát hành thêm một truy vấn nằm trong vòng lặp: mỗi lượt tìm kiếm sinh ra hàng chục truy vấn cơ sở dữ liệu. Bạn sửa đúng một chỗ trong mã. Sau khi sửa, bạn báo cáo thế nào?",
          choices: [
            { label: "Báo đã xong ngay khi hoá đơn tuần đầu giảm", next: "voi" },
            { label: "Theo dõi chi phí mỗi request qua vài kỳ", next: "tot" },
          ],
        },
        voi: {
          text: "Một hoá đơn giảm thì chưa chứng minh gì, và tuần sau một thay đổi khác lại đẩy chi phí lên mà không ai để ý vì việc theo dõi đã dừng. Hai tháng sau, bảng chi phí lại xấu và không có đường cơ sở để so.",
          ending: "bad",
        },
        tot: {
          text: "Chi phí mỗi request giữ ở mức thấp qua ba kỳ liên tiếp nên mức giảm là thật. Nhãn và đường theo dõi vẫn còn đó, nên lần sau một bản phát hành làm xấu đi sẽ bị phát hiện trong vài ngày.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Đi ngược từ con số xấu về quyết định sinh ra nó",
      steps: [
        {
          label: "Con số xấu ở mức tổng",
          detail:
            "Chi phí mỗi request tăng. Chưa có thông tin nào về chỗ nào, nên chưa nên cắt gì cả.",
        },
        {
          label: "Danh sách xếp hạng theo dịch vụ",
          detail:
            "Nhãn tài nguyên biến một con số thành bảng: dịch vụ nào chiếm bao nhiêu và phần tăng đến từ đâu. Thường một hoặc hai dịch vụ chiếm phần lớn mức tăng.",
        },
        {
          label: "Đối chiếu nhật ký triển khai",
          detail:
            "Đặt mốc chi phí bắt đầu tăng cạnh các bản phát hành của dịch vụ đó. Nguyên nhân thường nằm ở bản phát hành quanh thời điểm ấy.",
        },
        {
          label: "Thử bốn nguyên nhân hay gặp",
          detail:
            "Gọi dịch vụ theo từng thao tác, bộ đệm ngừng lặng lẽ, truy vấn N+1 mới xuất hiện, hoặc nhật ký ghi quá chi tiết. Mỗi nguyên nhân có một phép đo riêng để kiểm.",
        },
        {
          label: "Sửa một chỗ rồi theo dõi",
          detail:
            "Sửa trong mã chứ không chỉ cắt tài nguyên, rồi xem chi phí mỗi request qua vài kỳ. Mức giảm đến từ lượng tải thật sự ít đi sẽ giữ được.",
        },
      ],
    },
  ],

  "tai-nguyen-tinh-toan-khan-hiem": [
    {
      type: "exercise",
      language: "python",
      title: "Trả bớt máy nhờ xếp hàng công việc",
      task: "Một nhóm giữ 8 máy chuyên dụng. Số giờ chạy thật của các công việc mỗi ngày là [5, 3, 7, 4, 6, 2, 5, 6]. In mức sử dụng hiện tại (phần trăm, một chữ số thập phân), số máy cần nếu xếp hàng để mỗi máy chạy ở mức sử dụng 60% (làm tròn lên), và số máy có thể trả lại cho nhóm khác.",
      starter:
        "import math\n\ngio_chay = [5, 3, 7, 4, 6, 2, 5, 6]\nso_may = len(gio_chay)\ntong = sum(gio_chay)\nhien_tai = tong / (so_may * 24) * 100\ncan = math.ceil(tong / 24)\nprint(f\"Mức sử dụng hiện tại: {hien_tai:.1f}%\")\nprint(f\"Máy cần ở mức 60%: {can}\")\nprint(f\"Máy trả lại: {so_may - can}\")",
      solution:
        "import math\n\ngio_chay = [5, 3, 7, 4, 6, 2, 5, 6]\nso_may = len(gio_chay)\ntong = sum(gio_chay)\nhien_tai = tong / (so_may * 24) * 100\ncan = math.ceil(tong / (24 * 0.6))\nprint(f\"Mức sử dụng hiện tại: {hien_tai:.1f}%\")\nprint(f\"Máy cần ở mức 60%: {can}\")\nprint(f\"Máy trả lại: {so_may - can}\")",
      expectedOutput: "Mức sử dụng hiện tại: 19.8%\nMáy cần ở mức 60%: 3\nMáy trả lại: 5",
      hints: [
        "Một máy chỉ chạy tốt ở 60% thì mỗi máy gánh 24 × 0.6 giờ việc mỗi ngày.",
        "Chia tổng giờ việc cho số giờ hữu ích của một máy rồi làm tròn lên bằng math.ceil.",
      ],
    },
    {
      type: "feynman",
      title: "Hai loại tài nguyên cần hai cách nghĩ",
      intro:
        "Hãy nghĩ tới nước và vé xem một buổi hoà nhạc đã hết chỗ. Cần thêm nước thì mở vòi và trả thêm tiền. Còn vé thì dù bạn trả giá gấp đôi, số ghế trong phòng vẫn đúng bấy nhiêu, chỉ đổi ai ngồi vào.",
      columns: ["Loại", "Ví dụ", "Bài toán thật sự là"],
      rows: [
        ["Co giãn", "Dung lượng lưu trữ, băng thông, máy phổ thông", "Chi phí — trả thêm là có ngay"],
        ["Bị chặn vật lý", "Máy chuyên dụng khan hiếm, hạn mức nhà cung cấp", "Phân bổ — trả giá cao chỉ quyết định ai nhận phần đang có"],
        ["Cách xử lý của đội", "Giảm lượng cần, đổi loại, tăng mức sử dụng", "Việc trong tầm tay, ra kết quả trong vài ngày"],
      ],
      oneLiner: "Với tài nguyên bị chặn vật lý, đừng hỏi 'trả bao nhiêu' mà hỏi 'dùng phần mình đang giữ tốt hơn thế nào'.",
    },
  ],

  "chi-phi-moi-request-co-hop-ly": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản đọc số liệu chi phí của 'AI'",
      task: "Một công cụ AI viết nhận xét về chi phí mỗi request của một dịch vụ đang tăng trưởng nhanh. Bấm vào những câu có kết luận sai rồi nộp.",
      segments: [
        {
          text: "Chi phí mỗi request tháng này cao hơn dịch vụ cùng ngành, nên dịch vụ này chắc chắn đang lãng phí.",
          error:
            "So với dịch vụ cùng ngành chưa nói gì khi lượng việc mỗi request khác nhau. Phải so với dịch vụ làm cùng lượng việc mỗi request, và loại trừ dung lượng đặt trước cho tăng trưởng.",
        },
        {
          text: "Dung lượng đặt trước cho tăng trưởng chưa phục vụ ai, nên cần tách riêng khỏi phần đem so.",
        },
        {
          text: "Một điểm đo trong một tháng là đủ để kết luận hệ số đang đi theo hướng nào.",
          error:
            "Một điểm không có hướng. Cần xem hệ số đi qua nhiều tháng trong khi lưu lượng cũng đổi, vì xu hướng mới nói lên điều gì.",
        },
        {
          text: "Nếu hệ số tăng trong lúc lưu lượng cũng tăng thì đó là dấu hiệu xấu, vì quy mô lớn hơn lẽ ra phải làm nó rẻ đi.",
        },
        {
          text: "Phần dự phòng bắt buộc cũng là lãng phí, nên cắt trước tiên để hệ số xuống nhanh.",
          error:
            "Dự phòng là chi phí của cam kết chứ không phải của request. Cắt nó làm hệ số đẹp lên nhưng đổi bằng khả năng chịu sự cố.",
        },
        {
          text: "Trước khi kết luận nên hỏi hệ số sẽ về đâu khi tăng trưởng chậm lại, chứ không chỉ so với một dịch vụ đã ổn định.",
        },
      ],
    },
    {
      type: "chart",
      title: "Tỷ lệ trúng bộ đệm kéo chi phí mỗi request xuống",
      caption:
        "Số liệu minh hoạ: giá một lượt đọc từ cơ sở dữ liệu và từ bộ đệm chỉ để thấy hình dạng, mỗi hệ thống có con số riêng. Kéo mức dự phòng để thấy phần dự phòng nhân lên cả đường chi phí.",
      kind: "line",
      xLabel: "Tỷ lệ trúng bộ đệm (%)",
      yLabel: "Chi phí mỗi request (đồng)",
      x: { from: 0, to: 100, step: 10 },
      params: [
        { id: "db", label: "Chi phí một lượt đọc cơ sở dữ liệu", min: 1, max: 6, step: 0.5, value: 3, unit: "đồng" },
        { id: "cache", label: "Chi phí một lượt đọc bộ đệm", min: 0.1, max: 1, step: 0.1, value: 0.3, unit: "đồng" },
        { id: "res", label: "Mức dự phòng cộng thêm", min: 0, max: 50, step: 5, value: 20, unit: "%" },
      ],
      series: [
        { label: "Chưa tính dự phòng", expr: "x/100*cache+(1-x/100)*db" },
        { label: "Có cộng dự phòng", expr: "(x/100*cache+(1-x/100)*db)*(1+res/100)" },
      ],
    },
  ],

  "doc-dong-tai-nguyen-he-thong-lon": [
    {
      type: "exercise",
      language: "python",
      title: "Chia cho đơn vị việc rồi mới đọc từng nhóm",
      task: "Sau hai năm, số người dùng hoạt động tăng từ 100 nghìn lên 250 nghìn. Chi phí (triệu đồng) của bốn nhóm: tính toán 100 → 280, lưu trữ 20 → 110, truyền dữ liệu 10 → 50, dịch vụ ngoài 30 → 70. Với mỗi nhóm in tăng trưởng chi phí mỗi người dùng (đã chia cho mức tăng của người dùng, một chữ số thập phân, ví dụ 1.1x), rồi in tổng chi phí mỗi nghìn người dùng lúc đầu và lúc sau (hai chữ số thập phân).",
      starter:
        "nguoi = (100, 250)\nnhom = {\"Tính toán\": (100, 280), \"Lưu trữ\": (20, 110), \"Truyền dữ liệu\": (10, 50), \"Dịch vụ ngoài\": (30, 70)}\nfor ten, (a, b) in nhom.items():\n    print(f\"{ten}: {b / a:.1f}x\")\ntong_a = sum(a for a, b in nhom.values())\ntong_b = sum(b for a, b in nhom.values())\nprint(f\"Mỗi nghìn người dùng: {tong_a / nguoi[0]:.2f} -> {tong_b / nguoi[1]:.2f}\")",
      solution:
        "nguoi = (100, 250)\nnhom = {\"Tính toán\": (100, 280), \"Lưu trữ\": (20, 110), \"Truyền dữ liệu\": (10, 50), \"Dịch vụ ngoài\": (30, 70)}\nhe_so_nguoi = nguoi[1] / nguoi[0]\nfor ten, (a, b) in nhom.items():\n    print(f\"{ten}: {b / a / he_so_nguoi:.1f}x\")\ntong_a = sum(a for a, b in nhom.values())\ntong_b = sum(b for a, b in nhom.values())\nprint(f\"Mỗi nghìn người dùng: {tong_a / nguoi[0]:.2f} -> {tong_b / nguoi[1]:.2f}\")",
      expectedOutput:
        "Tính toán: 1.1x\nLưu trữ: 2.2x\nTruyền dữ liệu: 2.0x\nDịch vụ ngoài: 0.9x\nMỗi nghìn người dùng: 1.60 -> 2.04",
      hints: [
        "Tăng trưởng thô của chi phí lẫn cả phần do có thêm người dùng. Chia nó cho mức tăng của người dùng (250 / 100) để chỉ còn phần hiệu quả.",
        "Dòng cuối đã đúng sẵn: nó chia tổng cho số người dùng ở từng mốc, nên mỗi nhóm cũng phải chia cho đơn vị việc.",
      ],
    },
    {
      type: "chart",
      title: "Bốn nhóm chi phí sau khi chia cho người dùng",
      caption:
        "Số liệu minh hoạ: chi phí (triệu đồng) trên mỗi nghìn người dùng ở đầu và sau hai năm. Tổng tăng gấp ba nghe đáng lo, nhưng chia ra thì tính toán và dịch vụ ngoài gần như đứng yên, còn lưu trữ và truyền dữ liệu mới là chỗ cần xem.",
      kind: "bar",
      xLabel: "Nhóm chi phí",
      yLabel: "Chi phí mỗi nghìn người dùng (triệu đồng)",
      data: [
        { label: "Tính toán", values: [1, 1.12] },
        { label: "Lưu trữ", values: [0.2, 0.44] },
        { label: "Truyền dữ liệu", values: [0.1, 0.2] },
        { label: "Dịch vụ ngoài", values: [0.3, 0.28] },
      ],
      seriesLabels: ["Đầu kỳ", "Sau hai năm"],
    },
  ],
};
