import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 09. Một người viết cho một tệp.
export const P09_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Chặng 12 ────────────────────────────────────────────────────────────
  "ra-soat-tien-gui-hang-nam": [
    {
      type: "flow",
      title: "Nửa giờ rà soát, đi từ ngoài vào trong",
      steps: [
        {
          label: "Cổng đang mở",
          detail:
            "Chạy sudo ss -tlnp và đọc từng dòng như một câu hỏi: tiến trình nào đứng sau cổng này, và người ngoài có thật sự cần gọi vào không. Dòng nào không ai giải thích được là dòng đầu tiên cần xử lý.",
        },
        {
          label: "Luật tường lửa",
          detail:
            "sudo ufw status numbered cho danh sách luật. Đặt nó cạnh danh sách cổng ở bước trước: một luật cho phép cổng mà không còn tiến trình nào lắng nghe là luật thừa, và một cổng mở mà không có luật nào nhắc tới là cổng cần tìm hiểu.",
        },
        {
          label: "Lối vào",
          detail:
            "Xem last -n 5 và các dòng Failed password trong auth.log. Câu hỏi không phải có bao nhiêu lần thất bại (luôn có) mà là tài khoản và khoá nào còn được phép vào, và ai trong số đó đã rời đội.",
        },
        {
          label: "Việc chạy ngầm",
          detail:
            "ls -lt /backup | head -3 cho biết bản sao lưu mới nhất có từ hôm nào. Với mỗi tác vụ định kỳ, hỏi lần chạy THÀNH CÔNG gần nhất là khi nào - đây là câu duy nhất bắt được kiểu hỏng im lặng.",
        },
        {
          label: "Sức khoẻ chung",
          detail:
            "apt list --upgradable cho các bản vá còn chờ, df -h / và du -sh /var/log cho ổ đĩa. Để cuối vì nếu buổi rà soát bị cắt ngang thì phần bỏ dở cũng là phần ít rủi ro nhất.",
        },
        {
          label: "Ghi lại",
          detail:
            "Một dòng cho mỗi thứ đã tìm thấy và đã xử lý, kèm ngày. Quý sau bạn mở ghi chú này ra làm điểm xuất phát, và nó cũng là bằng chứng rằng buổi rà soát có thật.",
        },
      ],
    },
  ],

  // ── Chặng 13 ────────────────────────────────────────────────────────────
  "dam-may-thuc-chat-la-gi": [
    {
      type: "sim",
      tool: "cloud",
      mission: "launch-vm",
      title: "Thuê một máy trong vài giây",
      task: "Trong bảng điều khiển đám mây, tạo một máy ảo Ubuntu cỡ small và chờ tới khi nó hiện Đang chạy. Để ý hoá đơn ước tính bắt đầu tăng từ lúc bạn bấm tạo: đó là điều bài vừa nói về cách trả tiền.",
    },
  ],

  "ba-tang-dich-vu-dam-may": [
    {
      type: "scenario",
      title: "Đội ba người, không ai chuyên vận hành",
      start: "app",
      nodes: {
        app: {
          text: "Đội ba người chuẩn bị ra mắt một ứng dụng đặt lịch. Ứng dụng chính sẽ chạy đều suốt ngày và không có ai trong đội làm vận hành. Bạn đặt nó ở đâu?",
          choices: [
            { label: "Thuê máy ảo trống, tự cài và cấu hình mọi thứ", next: "vm" },
            { label: "Đẩy mã lên nền tảng quản lý, nhà cung cấp lo phần chạy", next: "db" },
            { label: "Viết cả ứng dụng thành các hàm theo khuôn một nhà cung cấp", next: "faas" },
          ],
        },
        vm: {
          text: "Ba tháng đầu mọi thứ chạy tốt. Rồi một bản vá bảo mật của hệ điều hành ra, không ai nhắc, không có gì báo lỗi, và không ai trong đội nhớ rằng bản vá là việc của mình. Máy chạy với lỗ hổng đã biết cho tới khi có người khai thác.",
          ending: "bad",
        },
        faas: {
          text: "Ứng dụng chạy được, nhưng cách viết mã đã theo đúng khuôn của một nhà cung cấp. Một năm sau đội muốn chuyển sang nơi khác thì phần lớn mã phải viết lại, vì tri thức về nền tảng đó nằm ngay trong cấu trúc mã chứ không chỉ ở nơi chạy.",
          ending: "bad",
        },
        db: {
          text: "Ứng dụng chạy ổn trên nền tảng quản lý và đội không phải nghĩ tới bản vá. Giờ tới cơ sở dữ liệu: nó lưu toàn bộ lịch hẹn của khách. Bạn chọn gì?",
          choices: [
            { label: "Tự cài trên một máy ảo và tự viết lệnh sao lưu", next: "dbself" },
            { label: "Dùng cơ sở dữ liệu quản lý sẵn của nhà cung cấp", next: "img" },
          ],
        },
        dbself: {
          text: "Lệnh sao lưu chạy được vài tuần rồi lặng lẽ ngừng sau một lần đổi cấu hình. Khi ổ đĩa hỏng, bản sao lưu gần nhất đã cũ mấy tháng. Đây là loại hỏng không cứu được: dữ liệu khách đặt lịch mất vĩnh viễn.",
          ending: "bad",
        },
        img: {
          text: "Sao lưu và vá lỗi đã do nhà cung cấp lo. Còn một việc nữa: mỗi khi khách tải ảnh lên, cần thu nhỏ ảnh. Việc này thất thường, có hôm vài lượt, có hôm vài trăm lượt. Bạn xử lý thế nào?",
          choices: [
            { label: "Thêm một máy ảo riêng chạy cả ngày chỉ để thu nhỏ ảnh", next: "imgvm" },
            { label: "Viết phần thu nhỏ ảnh thành một hàm, trả theo lượt gọi", next: "ok" },
          ],
        },
        imgvm: {
          text: "Máy chạy hai mươi tư giờ mỗi ngày cho một việc chỉ cần vài phút, và nó lại là một máy ảo nữa cần vá. Hoá đơn tăng, việc vận hành tăng, trong khi hàm sinh ra chính cho kiểu việc thất thường này.",
          ending: "bad",
        },
        ok: {
          text: "Mỗi phần nằm đúng tầng của nó: ứng dụng chính ở nền tảng quản lý, cơ sở dữ liệu quản lý sẵn, việc thất thường ở hàm. Chỉ phần nhỏ nhất bị ràng buộc theo khuôn nhà cung cấp, và đội vẫn có thời gian làm tính năng.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba tầng dịch vụ đơn giản hơn bạn nghĩ",
      intro:
        "Hãy nghĩ tới chuyện ăn tối. Bạn có thể tự mua nguyên liệu và nấu, có thể thuê một căn bếp đủ đồ rồi tự nấu, hoặc gọi một suất đã làm sẵn. Càng đi lên bạn càng ít phải làm, và càng ít được chọn món theo ý mình.",
      columns: ["Tầng", "Giống như", "Bạn vẫn phải lo / Cái giá"],
      rows: [
        ["Máy ảo", "Tự mua nguyên liệu và nấu", "Hệ điều hành, bản vá, sao lưu — Việc nhiều nhất, kiểm soát nhiều nhất"],
        ["Nền tảng", "Thuê bếp đủ đồ rồi nấu", "Mã của bạn — Mặc định đúng cho đội nhỏ"],
        ["Hàm", "Gọi suất làm sẵn", "Chỉ logic của từng món — Khó rời đi vì mã theo khuôn họ"],
      ],
      oneLiner: "Lên một tầng là bớt một phần việc vận hành, và đổi lại là khó mang mã đi nơi khác hơn.",
    },
  ],

  "hoa-don-dam-may-nhung-khoan-khong-thay-truoc": [
    {
      type: "sim",
      tool: "cloud",
      mission: "stop-vm",
      title: "Dừng một máy chạy không và nhìn hoá đơn",
      task: "Tạo một máy ảo, chờ nó chạy, rồi dừng nó lại và xem hoá đơn tháng giảm bao nhiêu. Sau đó nhìn kỹ phần còn lại: ổ đĩa gắn kèm máy vẫn tính tiền khi máy đã dừng, nên dừng chưa phải là hết phát sinh.",
    },
    {
      type: "chart",
      title: "Phí dữ liệu đi ra tăng theo lượng người dùng",
      caption:
        "Số liệu minh hoạ: giá mỗi gigabyte ở đây chỉ để thấy hình dạng, mỗi nhà cung cấp có bảng giá riêng. Điều đáng nhớ là đường này tăng theo số người dùng, không có trần, dù hạ tầng bạn đặt không đổi.",
      kind: "line",
      xLabel: "Lượt truy cập mỗi tháng (nghìn)",
      yLabel: "Phí dữ liệu đi ra (USD)",
      x: { from: 0, to: 1000, step: 100 },
      params: [
        { id: "mb", label: "Dung lượng tải về mỗi lượt", min: 0.5, max: 10, step: 0.5, value: 2, unit: "MB" },
        { id: "price", label: "Giá mỗi gigabyte đi ra (minh hoạ)", min: 0.02, max: 0.12, step: 0.01, value: 0.08, unit: "USD" },
      ],
      series: [{ label: "Phí dữ liệu đi ra", expr: "x*1000*mb/1024*price" }],
    },
  ],

  "tiet-kiem-ha-tang-cach-nao-that-su-hieu-qua": [
    {
      type: "sim",
      tool: "cloud",
      mission: "budget",
      title: "Kéo hoá đơn về dưới ngân sách mà web vẫn sống",
      task: "Dựng một máy ảo, một website tĩnh và một cơ sở dữ liệu cho tới khi hoá đơn ước tính vượt 500.000 đ, rồi cắt giảm về dưới mức đó mà vẫn còn một máy chạy và một website sống. Với mỗi thứ bạn cắt, tự hỏi nó thuộc bước nào trong bốn bước của bài.",
    },
    {
      type: "flow",
      title: "Bốn bước tiết kiệm, đúng thứ tự",
      steps: [
        {
          label: "Tắt thứ không ai dùng",
          detail:
            "Ổ đĩa mồ côi, máy thử nghiệm quên tắt, bản sao lưu quá cũ. Cho môi trường thử nghiệm ngủ đêm và cuối tuần cắt khoảng bảy mươi phần trăm chi phí của chúng, không giảm hiệu năng của ai và không ràng buộc gì.",
        },
        {
          label: "Chỉnh cho vừa",
          detail:
            "Mở số liệu sử dụng thật trong một tháng. Nếu máy chỉ dùng dưới hai mươi phần trăm khả năng thì hạ xuống cỡ nhỏ hơn. Phải làm sau bước một, vì lúc này bạn mới thấy đúng thứ còn lại cần chạy.",
        },
        {
          label: "Tự động mở rộng",
          detail:
            "Để số máy đi theo lưu lượng thay vì đứng ở mức cao điểm cả ngày. Cần chỉnh ngưỡng: quá nhạy thì hệ thống dao động liên tục, quá chậm thì người dùng chịu ảnh hưởng trước khi máy mới sẵn sàng.",
        },
        {
          label: "Cam kết dài hạn",
          detail:
            "Chỉ cho phần NỀN đã ổn định sau ba bước trước. Làm đầu tiên thì bạn khoá giá cho cả phần đang lãng phí và trả tiền cho nó suốt ba năm, dù đây là bước có mức giảm giá lớn nhất trên giấy.",
        },
      ],
    },
  ],

  "vung-va-khu-kha-dung": [
    {
      type: "scenario",
      title: "Dự phòng cho một ứng dụng có người dùng ở Việt Nam",
      start: "start",
      nodes: {
        start: {
          text: "Ứng dụng của bạn có người dùng chủ yếu ở Việt Nam và chưa có kế hoạch mở sang châu lục khác. Bạn cần đặt máy chủ và cơ sở dữ liệu sao cho một sự cố hạ tầng không làm sập nguyên hệ thống. Bạn chọn cách nào?",
          choices: [
            { label: "Đặt mọi thứ trong một khu khả dụng cho đơn giản", next: "single" },
            { label: "Đặt ở hai khu khả dụng trong cùng một vùng", next: "region" },
            { label: "Đặt ở hai vùng ở hai châu lục khác nhau ngay từ đầu", next: "multi" },
          ],
        },
        single: {
          text: "Một sự cố mất điện hoặc hỏng thiết bị mạng ở đúng toà nhà đó là đủ để cả ứng dụng và cơ sở dữ liệu cùng ngừng. Hệ thống có dự phòng trên giấy nhưng toàn bộ nằm trong một điểm hỏng duy nhất.",
          ending: "bad",
        },
        multi: {
          text: "Máy chủ nhân đôi được dễ dàng, nhưng dữ liệu thì không: đồng bộ cơ sở dữ liệu qua hàng nghìn kilomet buộc bạn chọn giữa chờ lâu mỗi lần ghi và chấp nhận dữ liệu lệch nhau tạm thời. Bạn trả giá đắt và phức tạp cho một rủi ro mà người dùng chưa gặp.",
          ending: "bad",
        },
        region: {
          text: "Hai khu có nguồn điện và mạng độc lập, lại cách nhau độ một mili giây nên cơ sở dữ liệu đồng bộ được mà không chậm đi. Giờ tới việc chọn vùng cho nhóm máy này.",
          choices: [
            { label: "Vùng có giá thấp nhất dù ở xa người dùng", next: "far" },
            { label: "Vùng gần người dùng nhất và có đủ dịch vụ cần dùng", next: "ok" },
          ],
        },
        far: {
          text: "Mỗi yêu cầu phải đi và về quãng đường rất xa, thêm hàng chục tới hàng trăm mili giây mà không dòng mã nào tối ưu bớt được. Khoản tiết kiệm trên bảng giá bị trả lại bằng tốc độ mà người dùng cảm nhận được.",
          ending: "bad",
        },
        ok: {
          text: "Một sự cố ở cấp toà nhà không làm hệ thống ngừng, người dùng ở gần nên độ trễ thấp, và bạn chưa phải trả giá cho nhiều vùng. Nếu sau này có người dùng ở nhiều châu lục thì mới đáng cân nhắc thêm vùng.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Vùng và khu khả dụng đơn giản hơn bạn nghĩ",
      intro:
        "Hãy nghĩ tới một chuỗi cửa hàng có kho hàng. Hai kho ở hai đầu cùng một thành phố thì vẫn chạy xe qua lại trong vài phút, nhưng mất điện ở khu này không ảnh hưởng khu kia. Kho ở thành phố khác an toàn hơn trước thiên tai, nhưng chuyển hàng qua đó mất cả ngày.",
      columns: ["Mức", "Giống như", "Chống được / Cái giá"],
      rows: [
        ["Khu khả dụng", "Hai kho cùng thành phố", "Mất điện, hỏng mạng, cháy một toà nhà — Gần nhau nên độ trễ chỉ khoảng một mili giây"],
        ["Vùng", "Kho ở thành phố khác", "Sự cố cả một khu vực — Độ trễ hàng chục tới hàng trăm mili giây, dữ liệu khó đồng bộ"],
        ["Mã của bạn", "Lỗi trong cách xếp hàng", "Không mức nào chống được — Nó chạy giống nhau ở mọi khu"],
      ],
      oneLiner: "Nhiều khu trong một vùng là điểm cân bằng cho phần lớn dự án; nhiều vùng chỉ đáng khi người dùng trải nhiều châu lục.",
    },
  ],

  "do-tre-va-khoang-cach-vat-ly": [
    {
      type: "scenario",
      title: "Trang chậm ở người dùng xa, sửa gì trước",
      start: "start",
      nodes: {
        start: {
          text: "Người dùng ở một châu lục khác báo trang của bạn chậm, trong khi máy chủ đặt ở Việt Nam và ở đây thì mượt. Đội đang tranh luận nên sửa gì. Bạn đề nghị gì?",
          choices: [
            { label: "Nâng máy chủ lên gấp đôi để xử lý nhanh hơn", next: "bigger" },
            { label: "Đo xem thời gian chờ nằm ở đường truyền, máy chủ hay trình duyệt", next: "measure" },
            { label: "Viết lại các hàm xử lý chậm nhất trong mã", next: "rewrite" },
          ],
        },
        bigger: {
          text: "Bạn trả thêm tiền để cắt được vài chục mili giây xử lý, trong khi người dùng xa mất hàng trăm mili giây chỉ để đi và về. Họ gần như không thấy khác biệt, và hoá đơn thì thấy rõ.",
          ending: "bad",
        },
        rewrite: {
          text: "Đây là phần dễ nhìn thấy nhất nên dễ được chọn nhất. Mã nhanh hơn thật, nhưng nó chỉ là vài chục mili giây trong tổng thời gian chờ, còn phần lớn thời gian nằm ở đường truyền mà không dòng mã nào chạm tới.",
          ending: "bad",
        },
        measure: {
          text: "Số đo cho thấy mỗi trang gọi mười lượt API nối tiếp, mỗi lượt mất khoảng năm mươi mili giây đi và về với người dùng xa, tức nửa giây chỉ để đi lại. Phần xử lý ở máy chủ chỉ vài chục mili giây. Bạn xử lý đường truyền như thế nào?",
          choices: [
            { label: "Gộp mười lượt gọi thành một và đặt nội dung tĩnh gần người dùng", next: "ok" },
            { label: "Mua thêm băng thông cho máy chủ", next: "bandwidth" },
          ],
        },
        bandwidth: {
          text: "Băng thông quyết định thời gian tải một tệp lớn, không quyết định bao lâu bit đầu tiên tới nơi. Mười lượt gọi vẫn mất đúng mười lần thời gian đi và về, nên người dùng xa vẫn chờ như cũ.",
          ending: "bad",
        },
        ok: {
          text: "Gộp lượt cắt nửa giây đi lại xuống còn khoảng năm mươi mili giây. Nội dung tĩnh ở gần cắt thêm phần còn lại. Phần dữ liệu riêng của từng người vẫn về máy chủ gốc, nên về lâu dài vẫn cần cân nhắc vùng đặt máy chủ.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Mười lượt gọi nối tiếp so với một lượt",
      caption:
        "Số liệu minh hoạ: thời gian đi và về (RTT) là thứ bạn kéo thanh trượt, từ vài mili giây trong cùng khu vực tới vài trăm mili giây giữa hai châu lục. Đường nối tiếp tăng theo số lượt, đường gộp thì đứng yên.",
      kind: "line",
      xLabel: "Số lượt gọi cần để dựng một trang",
      yLabel: "Thời gian chỉ để đi lại (mili giây)",
      x: { from: 1, to: 20, step: 1 },
      params: [{ id: "rtt", label: "Thời gian đi và về mỗi lượt", min: 5, max: 300, step: 5, value: 50, unit: "ms" }],
      series: [
        { label: "Gọi nối tiếp từng lượt", expr: "x*rtt" },
        { label: "Gộp thành một lượt", expr: "rtt" },
      ],
    },
  ],

  "chon-dich-vu-quan-ly-san-hay-tu-dung": [
    {
      type: "scenario",
      title: "Đội bốn người cần một hàng đợi tin nhắn",
      start: "start",
      nodes: {
        start: {
          text: "Đội bốn người cần một hàng đợi tin nhắn. Một đồng nghiệp từng dựng loại này nhiều lần nói: chiều nay là xong, và bản tự dựng rẻ hơn trên bảng giá. Bạn trả lời sao?",
          choices: [
            { label: "Đồng ý, chiều nay dựng luôn vì rẻ hơn", next: "diy" },
            { label: "Hỏi có yêu cầu đặc thù không và ai sẽ vận hành về sau", next: "ask" },
          ],
        },
        diy: {
          text: "Chiều đó đúng là xong. Ba năm sau phần việc thật mới tới: vá lỗi bảo mật, nâng phiên bản, và một đêm hai giờ sáng hàng đợi hỏng cần khôi phục. Cả đội đang bận hệ thống khác nên không ai có thời gian, và phần rẻ trên bảng giá đã được trả lại bằng công vận hành.",
          ending: "bad",
        },
        ask: {
          text: "Câu trả lời: không có yêu cầu nào mà bản quản lý sẵn không đáp ứng, và cả bốn người đã kín việc với những hệ thống hiện có. Hai điều kiện để tự dựng không cùng đúng. Bạn chọn hướng nào?",
          choices: [
            { label: "Dùng bản quản lý sẵn, gọi qua một lớp trung gian trong mã", next: "ok" },
            { label: "Dùng bản quản lý sẵn, gọi trực tiếp từ khắp nơi trong mã", next: "direct" },
            { label: "Vẫn tự dựng để không phụ thuộc vào nhà cung cấp nào", next: "fear" },
          ],
        },
        direct: {
          text: "Nhanh lúc đầu. Hai năm sau nhà cung cấp tăng giá, đội muốn đổi và nhận ra lời gọi nằm rải rác ở hàng chục chỗ. Mối lo phụ thuộc có thật, nhưng cách giải là một lớp trung gian chứ không phải bỏ qua nó.",
          ending: "bad",
        },
        fear: {
          text: "Bạn trả một cái giá lớn và đều đặn để phòng một rủi ro thường không xảy ra. Mỗi hệ thống tự dựng chiếm một phần sự chú ý cố định, và tổng của chúng vượt quá khả năng của đội bốn người.",
          ending: "bad",
        },
        ok: {
          text: "Đội dùng được hàng đợi ngay trong tuần, vá lỗi và khôi phục là việc của nhà cung cấp. Muốn đổi sau này chỉ sửa một chỗ trong lớp trung gian, và thời gian tiết kiệm đi vào sản phẩm.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Quản lý sẵn hay tự dựng đơn giản hơn bạn nghĩ",
      intro:
        "Hãy nghĩ tới bữa trưa cho cả văn phòng. Bạn có thể đặt suất ăn, đắt hơn trên hoá đơn nhưng không ai phải đi chợ. Hoặc tự nấu: rẻ hơn trên giấy, nhưng ai đó phải mua đồ, nấu, rửa bát và lo khi bếp hỏng, mỗi ngày.",
      columns: ["Cách làm", "Giống như", "Phần ai cũng thấy / Phần hay bị bỏ quên"],
      rows: [
        ["Quản lý sẵn", "Đặt suất ăn", "Giá cao hơn trên bảng giá — Gần như không có việc vận hành"],
        ["Tự dựng", "Tự nấu cho cả văn phòng", "Một buổi chiều là xong — Vá lỗi, nâng phiên bản, khôi phục lúc hai giờ sáng"],
      ],
      oneLiner: "Tự dựng chỉ đáng khi có yêu cầu đặc thù VÀ có người còn thời gian vận hành; thiếu một trong hai thì chọn bản quản lý sẵn.",
    },
  ],

  "tong-ket-dam-may-va-ha-tang": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản tư vấn hạ tầng do AI viết",
      task: "Một công cụ AI viết bản tư vấn hạ tầng cho một dịch vụ có hai kỹ sư. Bấm vào các đoạn mâu thuẫn với bốn câu hỏi của bài rồi nộp.",
      segments: [
        {
          text: "Lưu lượng của dịch vụ này gần như phẳng quanh năm, nên đám mây vẫn là lựa chọn rẻ nhất nhờ khả năng co giãn.",
          error: "Lưu lượng phẳng là trường hợp đám mây kém lợi thế nhất: bạn trả cho tính co giãn mà nhu cầu không dùng tới, và máy thuê thường thắng.",
        },
        {
          text: "Vì đội chỉ có hai người, nên ưu tiên các dịch vụ quản lý sẵn để bớt phần việc vận hành.",
        },
        {
          text: "Vùng, khu khả dụng và chính sách sao lưu có thể bấm qua giá trị mặc định, vì đó chưa phải quyết định thật.",
          error: "Mỗi mặc định là một quyết định thật với hệ quả thật, và loại nguy hiểm nhất là loại không ai nhớ mình đã đưa ra.",
        },
        {
          text: "Cơ sở dữ liệu nên dùng dịch vụ quản lý sẵn, vì làm sai thì mất dữ liệu và loại hỏng đó không cứu được.",
        },
        {
          text: "Cách duy nhất để không bị trói vào một nhà cung cấp là tự dựng mọi dịch vụ.",
          error: "Một lớp trung gian trong mã để đổi nhà cung cấp chỉ sửa một chỗ rẻ hơn nhiều so với tự dựng mọi thứ để phòng một rủi ro thường không xảy ra.",
        },
        {
          text: "Nên đặt cảnh báo ngân sách ngay từ đầu để hoá đơn bất ngờ không đợi tới ngày thanh toán mới lộ.",
        },
      ],
    },
    {
      type: "flow",
      title: "Từ bốn câu hỏi tới một quyết định hạ tầng",
      steps: [
        {
          label: "Hình dạng nhu cầu",
          detail:
            "Lưu lượng thất thường hay phẳng? Thất thường thì đám mây đáng tiền vì bạn mua quyền lấy thêm tài nguyên bất cứ lúc nào; phẳng thì máy thuê thường thắng. Câu này quyết định cả khung cho các bước sau.",
        },
        {
          label: "Người vận hành",
          detail:
            "Đếm số người thật sự có thời gian vận hành. Ít người thì chọn tầng cao hơn (nền tảng, dịch vụ quản lý sẵn) và tự dựng càng ít hệ thống càng tốt.",
        },
        {
          label: "Thời gian hồi phục",
          detail:
            "Hỏng thì chịu ngừng bao lâu? Câu trả lời cho biết cần mấy khu khả dụng, và chỉ khi ngừng dịch vụ đắt tới mức trả được thì mới đáng thêm vùng.",
        },
        {
          label: "Chi phí rời đi",
          detail:
            "Rời đi thì mất bao lâu? Câu này cho biết mức ràng buộc bạn đang chấp nhận, ví dụ cân nhắc một lớp trung gian trong mã trước khi dùng thứ riêng của một nhà cung cấp.",
        },
        {
          label: "Theo dõi ba con số",
          detail:
            "Chi phí theo dịch vụ để biết tiền đi đâu, mức sử dụng thật để biết có đang trả cho thứ không dùng, và cảnh báo ngân sách để hoá đơn bất ngờ không đợi tới ngày thanh toán.",
        },
      ],
    },
  ],

  // ── Chặng 14 ────────────────────────────────────────────────────────────
  "ho-so-nghe-nghiep-github-va-cv": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản CV do AI viết giúp",
      task: "Một công cụ AI viết giúp phần nội dung CV cho một lập trình viên web. Bấm vào những dòng làm hồ sơ yếu đi rồi nộp.",
      segments: [
        {
          text: "Lập trình viên web hai năm kinh nghiệm với React và Node.js, đã đưa một ứng dụng đặt lịch lên chạy thật cho khoảng bốn mươi người dùng.",
        },
        {
          text: "Thành thạo 18 công nghệ: React, Vue, Angular, Svelte, Go, Rust, Kubernetes, Kafka, GraphQL, Redis và nhiều thứ khác.",
          error: "Danh sách dài không phân biệt thứ dùng hằng ngày với thứ cài thử một buổi tối, và chữ 'thành thạo' kéo theo một loạt câu hỏi ở vòng kỹ thuật mà bạn khó trả lời hết.",
        },
        {
          text: "Ứng dụng đặt lịch: nhắc hẹn qua tin nhắn để giảm số khách quên đến. Có liên kết chạy thử và README hướng dẫn chạy bằng một lệnh.",
        },
        {
          text: "Website bán hàng phiên bản 3: đang làm dở, liên kết chạy thử đã hết hạn, kho mã chưa có mô tả.",
          error: "Dự án bỏ dở và liên kết chết là lý do để người đọc dừng lại, và chúng làm giảm độ tin của cả các dự án tốt đứng cạnh.",
        },
        {
          text: "Kỹ năng mềm: chăm chỉ, nhiệt tình, ham học hỏi, làm việc nhóm tốt, tư duy tích cực.",
          error: "Không có bằng chứng nào đi kèm nên dòng này chỉ chiếm chỗ. Dấu vết làm việc chung như pull request đã review có sức nặng hơn nhiều.",
        },
        {
          text: "Đã gửi và được merge sáu pull request sửa lỗi cho một thư viện mã nguồn mở, có liên kết tới từng cái.",
        },
      ],
    },
  ],

  "cac-vong-phong-van-ky-thuat": [
    {
      type: "scenario",
      title: "Một đề thuật toán thiếu ràng buộc",
      start: "start",
      nodes: {
        start: {
          text: "Người phỏng vấn đọc đề: Viết hàm tìm các giá trị bị trùng trong một danh sách. Chỉ có vậy, không nói danh sách lớn cỡ nào hay kiểu dữ liệu gì. Bạn làm gì đầu tiên?",
          choices: [
            { label: "Viết mã ngay cho kịp thời gian", next: "rush" },
            { label: "Hỏi cỡ danh sách, kiểu dữ liệu và cần trả về gì", next: "ask" },
          ],
        },
        rush: {
          text: "Bạn viết xong một lời giải so sánh từng cặp. Người phỏng vấn mới nói danh sách có thể tới vài triệu phần tử, và lời giải của bạn không chạy nổi. Đề thiếu ràng buộc là chủ ý, vì yêu cầu thật cũng tới ở dạng thiếu như vậy. Bạn đã tự trả lời câu hỏi mà buổi phỏng vấn định hỏi, và trả lời sai.",
          ending: "bad",
        },
        ask: {
          text: "Người phỏng vấn nói danh sách có thể tới vài triệu số nguyên. Bạn bắt đầu cân nhắc hướng giải. Bạn làm gì?",
          choices: [
            { label: "Im lặng nghĩ cho xong rồi mới đọc lời giải", next: "silent" },
            { label: "Nói to hai hướng đang cân nhắc rồi chọn một kèm lý do", next: "design" },
          ],
        },
        silent: {
          text: "Bạn có thể nghĩ ra lời giải đúng, nhưng người phỏng vấn ngồi nhìn hai phút mà không biết bạn đang nghĩ gì. Vòng này đo cách bạn nghĩ khi gặp thứ chưa biết, và im lặng làm nó không có gì để đo.",
          ending: "bad",
        },
        design: {
          text: "Người phỏng vấn thấy cách bạn cân nhắc. Vòng sau là thiết kế hệ thống, đề là một dịch vụ rút gọn liên kết. Bạn bắt đầu thế nào?",
          choices: [
            { label: "Vẽ thật nhiều thành phần để cho thấy mình biết nhiều", next: "messy" },
            { label: "Nêu hai phương án lưu liên kết, chọn một kèm lý do", next: "ok" },
          ],
        },
        messy: {
          text: "Sơ đồ rậm nhưng không thành phần nào có lý do đứng đó. Vòng này hỏi bạn có nhìn ra đánh đổi không, và một sơ đồ đơn giản có lý do vững hơn sẽ thắng sơ đồ rậm.",
          ending: "bad",
        },
        ok: {
          text: "Bạn nêu hai cách, so sánh ngắn gọn rồi chọn một cách kèm lý do. Đó đúng là thứ vòng thiết kế đang đo. Hai vòng liên tiếp đều chuyển câu hỏi người phỏng vấn đang thật sự đặt ra thành thứ bạn trả lời được.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một vòng thuật toán, nói từ đầu tới cuối",
      steps: [
        {
          label: "Nghe đề và nhận ra chỗ thiếu",
          detail:
            "Đề ngắn như một câu thường thiếu ràng buộc quan trọng, và đó là chủ ý chứ không phải sơ suất. Bạn chưa viết gì, chỉ ghi ra những thứ chưa biết.",
        },
        {
          label: "Hỏi ràng buộc",
          detail:
            "Cỡ dữ liệu, kiểu dữ liệu, cần trả về gì, có trường hợp biên nào. Câu trả lời của người phỏng vấn sẽ loại bỏ một nửa số hướng giải ngay lập tức.",
        },
        {
          label: "Nói hướng giải",
          detail:
            "Nêu hai hướng, chọn một kèm lý do. Đây là chỗ vòng này đo cách bạn nghĩ khi gặp thứ chưa biết, nên nói to quan trọng hơn là chọn đúng ngay.",
        },
        {
          label: "Viết mã vừa viết vừa nói",
          detail:
            "Giải thích mỗi bước nhỏ khi viết. Thu âm lại một buổi tập là thấy ngay mình im lặng bao lâu.",
        },
        {
          label: "Chạy thử bằng ví dụ",
          detail:
            "Lấy một ví dụ nhỏ và một trường hợp biên, chạy tay qua mã. Cho thấy bạn tự kiểm lời giải của mình chứ không đợi người khác chỉ lỗi.",
        },
      ],
    },
  ],

  "tu-nop-ho-so-toi-ngay-di-lam": [
    {
      type: "scenario",
      title: "Cuộc gọi báo tin tốt chưa phải là hợp đồng",
      start: "start",
      nodes: {
        start: {
          text: "Sau vòng cuối, nhà tuyển dụng gọi điện báo bạn trúng tuyển. Bạn vui, và hợp đồng chưa có. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Báo nghỉ ngay ở nơi cũ vì đã chắc chắn", next: "early" },
            { label: "Cảm ơn và xin thư mời chính thức cùng vài ngày để đọc", next: "offer" },
          ],
        },
        early: {
          text: "Hai tuần sau, vì một thay đổi nội bộ, công ty mới lùi ngày bắt đầu và chữ ký vẫn chưa có. Bạn đã báo nghỉ và đã ngừng nộp hồ sơ nơi khác. Khoảng cách giữa hai thứ đó có thể là hai tuần không lương.",
          ending: "bad",
        },
        offer: {
          text: "Thư mời về. Lương ghi một con số mà không nói gross hay net, và không rõ lương đóng bảo hiểm có bằng lương hợp đồng không. Bạn làm gì?",
          choices: [
            { label: "Ký luôn vì sợ họ đổi ý, có gì hỏi sau khi vào làm", next: "sign" },
            { label: "Hỏi thẳng từng điều chưa rõ rồi mới ký", next: "ask" },
          ],
        },
        sign: {
          text: "Sau khi ký, bạn mới biết con số là gross và lương đóng bảo hiểm chỉ ở mức tối thiểu. Tiền về tài khoản ít hơn bạn tính, và các chế độ sau này cũng tính trên con số nhỏ hơn. Sau khi ký thì hỏi đã muộn.",
          ending: "bad",
        },
        ask: {
          text: "Công ty trả lời rõ ràng từng điều, bạn so sánh được với các lời mời khác và ký với đầy đủ thông tin. Giờ tới nơi cũ, hợp đồng của bạn có điều khoản báo trước. Bạn làm gì?",
          choices: [
            { label: "Báo nghỉ theo đúng điều khoản và bàn giao đầy đủ", next: "ok" },
            { label: "Nghỉ ngang trong tuần vì đã có chỗ mới", next: "abrupt" },
          ],
        },
        abrupt: {
          text: "Bạn vi phạm điều khoản hợp đồng cũ, đồng nghiệp phải gánh phần việc dở và người quản lý cũ sẽ nhớ điều đó. Ngành này nhỏ hơn bạn nghĩ, và lần chuyển việc sau có thể bị hỏi lại tên người đó.",
          ending: "bad",
        },
        ok: {
          text: "Bạn rời đi tử tế, nơi mới có thông tin đầy đủ, và người quản lý cũ sẵn lòng làm người giới thiệu. Rời tử tế là khoản đầu tư rẻ nhất vào lần chuyển việc sau.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Bốn mốc từ lúc nộp hồ sơ tới ngày đi làm",
      steps: [
        {
          label: "Nộp và chờ",
          detail:
            "Giữ nhiều hồ sơ chạy song song. Đây là mốc duy nhất mà số lượng thật sự giúp được, vì mỗi nơi trả lời với tốc độ khác nhau.",
        },
        {
          label: "Các vòng",
          detail:
            "Ngay sau mỗi buổi, ghi lại những gì được hỏi. Vòng sau và công ty sau đều dùng lại được.",
        },
        {
          label: "Lời mời và chữ ký",
          detail:
            "Khúc nguy hiểm nhất. Khi nghe tin trúng tuyển, đừng báo nghỉ, đừng ngừng nộp nơi khác. Đọc kỹ thư mời, hỏi thẳng phần chưa rõ và xin thêm ngày nếu cần.",
        },
        {
          label: "Bàn giao",
          detail:
            "Báo nghỉ theo đúng điều khoản hợp đồng cũ sau khi đã có chữ ký. Toàn bộ quãng này thường mất bốn tới mười tuần.",
        },
      ],
    },
  ],

  "luong-gross-net-thue-va-bao-hiem": [
    {
      type: "exercise",
      language: "python",
      title: "So sánh hai lời mời theo cả năm",
      task:
        "Lời mời A trả 30 triệu net mỗi tháng trong 12 tháng. Lời mời B trả 28 triệu net mỗi tháng, và hợp đồng cam kết thêm tháng thứ 13 bằng một tháng lương. Tính tổng nhận được trong năm của mỗi lời mời và in lời mời nào nhiều hơn. (Số liệu minh hoạ.)",
      starter:
        "net_a = 30\nmonths_a = 12\nnet_b = 28\nmonths_b = 12  # chỗ này thiếu một thứ hợp đồng B cam kết\n\ntotal_a = net_a * months_a\ntotal_b = net_b * months_b\n\nprint(f\"Lời mời A: {total_a} triệu/năm\")\nprint(f\"Lời mời B: {total_b} triệu/năm\")\nprint(\"Chọn:\", \"A\" if total_a > total_b else \"B\")\n",
      solution:
        "net_a = 30\nmonths_a = 12\nnet_b = 28\nmonths_b = 13\n\ntotal_a = net_a * months_a\ntotal_b = net_b * months_b\n\nprint(f\"Lời mời A: {total_a} triệu/năm\")\nprint(f\"Lời mời B: {total_b} triệu/năm\")\nprint(\"Chọn:\", \"A\" if total_a > total_b else \"B\")\n",
      expectedOutput: "Lời mời A: 360 triệu/năm\nLời mời B: 364 triệu/năm\nChọn: B",
      hints: [
        "Lời mời B có tháng thứ 13 được cam kết, nên số tháng nhận lương là 13 chứ không phải 12.",
        "Chỉ cần sửa một con số ở dòng months_b, phần còn lại của mã đã đúng.",
      ],
    },
    {
      type: "flow",
      title: "Từ gross xuống net đi qua hai lớp",
      steps: [
        {
          label: "Lương trên tin tuyển dụng",
          detail:
            "Câu hỏi đầu tiên và rẻ nhất: con số này là gross hay net? Tin tuyển dụng ghi theo cả hai kiểu và thường không nói rõ, nên đây là việc phải hỏi thẳng.",
        },
        {
          label: "Lương đóng bảo hiểm",
          detail:
            "Xác định phần lương dùng làm căn cứ đóng bảo hiểm: bằng lương hợp đồng, hay tách thành lương cứng cộng phụ cấp. Phần này có mức trần và ảnh hưởng mọi chế độ sau này.",
        },
        {
          label: "Lớp thứ nhất: bảo hiểm bắt buộc",
          detail:
            "Trừ bảo hiểm theo tỷ lệ trên lương đóng bảo hiểm. Hạ lương đóng xuống mức tối thiểu thì net tháng này cao hơn, đổi lại thai sản, thất nghiệp và hưu trí tính trên con số nhỏ hơn.",
        },
        {
          label: "Giảm trừ gia cảnh",
          detail:
            "Trừ khoản giảm trừ gia cảnh khỏi thu nhập sau bảo hiểm để ra phần thu nhập tính thuế.",
        },
        {
          label: "Lớp thứ hai: thuế thu nhập cá nhân",
          detail:
            "Tính lũy tiến trên phần thu nhập tính thuế, nên tỷ lệ hao hụt không cố định mà tăng dần theo mức lương.",
        },
        {
          label: "Net",
          detail:
            "Số tiền thật sự vào tài khoản. Khi so hai lời mời, quy cả hai về net và nhớ hỏi tháng thứ 13 hay thưởng là cam kết hay tùy kết quả.",
        },
      ],
    },
  ],

  "doc-bao-cao-luong-nganh-it": [
    {
      type: "exercise",
      language: "python",
      title: "Trung bình và trung vị của cùng một mẫu",
      task:
        "Một khảo sát có mười mức lương hằng tháng (triệu đồng). Tính trung bình, trung vị (giá trị giữa sau khi sắp xếp; với số lượng chẵn lấy trung bình hai giá trị giữa) và đếm số người dưới mức trung bình. (Số liệu minh hoạ.)",
      starter:
        "salaries = [15, 16, 17, 18, 18, 20, 22, 25, 60, 90]\n\nmean = sum(salaries) / len(salaries)\nmedian = mean  # chỗ này chưa tính trung vị thật\n\nbelow = len([s for s in salaries if s < mean])\n\nprint(f\"Trung bình: {mean}\")\nprint(f\"Trung vị: {median}\")\nprint(f\"Số người dưới trung bình: {below}\")\n",
      solution:
        "salaries = [15, 16, 17, 18, 18, 20, 22, 25, 60, 90]\n\nmean = sum(salaries) / len(salaries)\nordered = sorted(salaries)\nmid = len(ordered) // 2\nmedian = (ordered[mid - 1] + ordered[mid]) / 2\n\nbelow = len([s for s in salaries if s < mean])\n\nprint(f\"Trung bình: {mean}\")\nprint(f\"Trung vị: {median}\")\nprint(f\"Số người dưới trung bình: {below}\")\n",
      expectedOutput: "Trung bình: 30.1\nTrung vị: 19.0\nSố người dưới trung bình: 8",
      hints: [
        "Sắp xếp danh sách trước bằng sorted(), rồi lấy hai phần tử ở giữa.",
        "Với 10 phần tử, hai giá trị giữa nằm ở chỉ số 4 và 5.",
      ],
    },
    {
      type: "chart",
      title: "Mười mức lương, một cái đuôi dài về bên phải",
      caption:
        "Số liệu minh hoạ, cùng mẫu với bài tập: trung vị 19 triệu, trung bình 30,1 triệu. Hai người lương rất cao kéo trung bình lên khỏi mức mà tám trong mười người thực sự nhận.",
      kind: "bar",
      xLabel: "Khoảng lương (triệu đồng/tháng)",
      yLabel: "Số người",
      data: [
        { label: "15-19", values: [5] },
        { label: "20-29", values: [3] },
        { label: "30-59", values: [0] },
        { label: "60-89", values: [1] },
        { label: "90+", values: [1] },
      ],
      seriesLabels: ["Số người trả lời (minh hoạ)"],
    },
  ],

  "outsourcing-product-va-agency": [
    {
      type: "scenario",
      title: "Chọn nơi làm tiếp theo theo thứ mình đang thiếu",
      start: "start",
      nodes: {
        start: {
          text: "Bạn có hai năm làm ở một công ty outsourcing, đã đụng nhiều miền nghiệp vụ và nhiều mã lạ. Bạn nhận ra mình chưa bao giờ phải sửa lại thứ mình viết năm ngoái. Một công ty sản phẩm mời bạn, cùng mức lương hiện tại. Bạn quyết định theo tiêu chí nào?",
          choices: [
            { label: "Công ty sản phẩm thường được xếp cao hơn trong ngành", next: "rank" },
            { label: "Mình đang thiếu chiều sâu, nơi này có vòng phản hồi dài không", next: "depth" },
            { label: "Chọn nơi trả lương cao nhất, loại hình sao cũng được", next: "money" },
          ],
        },
        rank: {
          text: "Bạn chọn theo xếp hạng ngầm của ngành chứ không theo thứ mình thiếu. Ba năm sau bạn có chiều sâu, nhưng lại lúng túng khi phải làm việc với một hệ thống ngoài vùng quen của mình. Kỹ sư nào cũng cần cả diện lẫn chiều sâu, và bạn vừa bỏ bớt một bên.",
          ending: "bad",
        },
        money: {
          text: "Khác biệt giữa ba loại hình không nằm ở công nghệ mà ở vòng phản hồi, và mức lương không nói gì về điều đó. Ba năm sau bạn có thêm tiền nhưng không biết mình đã học được gì mới.",
          ending: "bad",
        },
        depth: {
          text: "Đúng câu hỏi: vòng phản hồi khép lại thì bạn học về đánh đổi dài hạn. Giờ bạn cần kiểm xem công ty này có thật sự cho bạn điều đó không. Bạn hỏi gì trong buổi phỏng vấn?",
          choices: [
            { label: "Hệ thống đã sống bao lâu và ai sửa phần mã cũ", next: "ok" },
            { label: "Họ đang dùng những công nghệ nào", next: "tech" },
          ],
        },
        tech: {
          text: "Công nghệ là phần dễ trả lời nhất và ít nói nhất về vòng phản hồi. Bạn vào làm rồi mới thấy nhóm nhỏ chỉ viết tính năng mới trên một hệ thống mới dựng, nên bạn vẫn chưa sửa lại thứ mình đã viết năm ngoái.",
          ending: "bad",
        },
        ok: {
          text: "Câu trả lời cho thấy hệ thống sống nhiều năm và người viết là người sửa. Nợ kỹ thuật là của bạn, và đó đúng là cách bạn học được về nó. Bạn mang theo diện đã có từ nơi cũ nên đây là bước bổ sung chứ không phải thay thế.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba loại hình công ty đơn giản hơn bạn nghĩ",
      intro:
        "Hãy nghĩ tới ba kiểu đầu bếp. Người nấu tiệc thuê gặp nhiều bếp và nhiều khách khác nhau nhưng ít khi thấy món mình nấu được ăn lần hai. Người ở một nhà hàng lâu năm nghe khách khen chê cùng một món suốt mấy năm. Người làm quầy ăn cho sự kiện phải xong đúng hẹn.",
      columns: ["Loại hình", "Giống như", "Vòng phản hồi / Bạn học được"],
      rows: [
        ["Outsourcing", "Đầu bếp nấu tiệc thuê", "Cắt ở lúc bàn giao — Diện rộng, mã lạ, nhiều kiểu khách"],
        ["Product", "Đầu bếp nhà hàng lâu năm", "Khép kín qua nhiều năm — Chiều sâu, nợ kỹ thuật của chính mình"],
        ["Agency", "Đầu bếp quầy sự kiện", "Ngắn, hẹn cứng — Ước lượng và tốc độ giao hàng"],
      ],
      oneLiner: "Không loại hình nào hơn nhau: mỗi loại dạy một thứ, và kỹ sư nào cũng cần cả diện lẫn chiều sâu.",
    },
  ],

  "esop-va-vesting": [
    {
      type: "exercise",
      language: "python",
      title: "Bao nhiêu cổ phần đã vest sau từng mốc",
      task:
        "Một gói gồm 4.800 cổ phần, vesting trong 48 tháng, có mốc chặn 12 tháng: dưới 12 tháng làm việc thì chưa vest gì, từ tháng 12 trở đi vest đều theo tháng. Hàm vested(months) trả về số cổ phần đã vest. In kết quả cho 10, 12 và 30 tháng, rồi tỷ lệ sở hữu khi công ty có 1.200.000 cổ phần lưu hành. (Số liệu minh hoạ.)",
      starter:
        "GRANT = 4800\nTOTAL_MONTHS = 48\nCLIFF = 12\nOUTSTANDING = 1200000\n\ndef vested(months):\n    # chưa xử lý mốc chặn\n    return GRANT * months // TOTAL_MONTHS\n\nfor m in (10, 12, 30):\n    print(f\"{m} tháng: {vested(m)} cổ phần\")\nprint(f\"Tỷ lệ sở hữu: {GRANT / OUTSTANDING * 100:.1f}%\")\n",
      solution:
        "GRANT = 4800\nTOTAL_MONTHS = 48\nCLIFF = 12\nOUTSTANDING = 1200000\n\ndef vested(months):\n    if months < CLIFF:\n        return 0\n    return GRANT * months // TOTAL_MONTHS\n\nfor m in (10, 12, 30):\n    print(f\"{m} tháng: {vested(m)} cổ phần\")\nprint(f\"Tỷ lệ sở hữu: {GRANT / OUTSTANDING * 100:.1f}%\")\n",
      expectedOutput: "10 tháng: 0 cổ phần\n12 tháng: 1200 cổ phần\n30 tháng: 3000 cổ phần\nTỷ lệ sở hữu: 0.4%",
      hints: [
        "Mốc chặn nghĩa là nếu months nhỏ hơn CLIFF thì kết quả phải là 0, bất kể công thức đều.",
        "Thêm một câu if ở đầu hàm vested.",
      ],
    },
    {
      type: "flow",
      title: "Ba lớp ngăn giữa lời hứa và tiền thật",
      steps: [
        {
          label: "Lời hứa trên giấy",
          detail:
            "Thư mời ghi một con số cổ phần lớn. Con số này chưa phải tiền, và chưa nói được điều gì cho tới khi qua đủ ba lớp phía sau.",
        },
        {
          label: "Lớp thời gian",
          detail:
            "Vesting trao dần, và mốc chặn có thể xoá sạch nếu bạn đi trước mốc. Hỏi: mấy năm, mốc chặn ở đâu, sau mốc thì trao theo tháng hay theo quý, và khi nghỉ việc phần đã vest có được giữ không.",
        },
        {
          label: "Lớp tỷ lệ",
          detail:
            "Số cổ phần chỉ có nghĩa khi đặt cạnh tổng số đang lưu hành, và tổng số tăng qua mỗi vòng gọi vốn. Hỏi: số này là bao nhiêu phần trăm công ty hiện nay.",
        },
        {
          label: "Lớp thanh khoản",
          detail:
            "Phải có ai đó mua thì cổ phần mới thành tiền. Hỏi: đã có đợt mua lại nào chưa, hay chỉ có kế hoạch. Đây là câu phân biệt gói thật với gói trên giấy.",
        },
        {
          label: "Tiền thật",
          detail:
            "Chỉ khi vượt qua cả ba lớp, con số ban đầu mới là tiền. Vì cả ba câu đều hỏi được trước khi ký, hãy hỏi trước chứ không phải sau.",
        },
      ],
    },
  ],
};
