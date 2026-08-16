// Module-scope data tables that render Vietnamese prose directly out of a
// `const` at the top of a component, instead of through a display position
// `i18n-coverage.mjs`'s `data` rule was written to catch. See AGENTS.md,
// "Translating the UI" - this is the section that closes that blind spot for
// StageTipsBanner, RpgInventoryPanel, ScrollytellingPinnedSection and
// CongCuClient. Everything structural (ids, keys, rarity values, ordering,
// stats) stays in the component; only the human-readable strings live here.

export const dataTablesVi = {
  dataTables: {
    stageTips: {
      mascotName: "Tài Tài",
      tips: {
        "personal-Chặng 1": [
          "Quy tắc đơn giản nhất của nghề: biết máy mình đang chạy gì trước khi cài thêm thứ gì. Phần lớn sự cố 'máy chậm' của người mới là một tiến trình bỏ quên, không phải phần cứng yếu.",
          "Dòng lệnh không phải để trông ngầu; nó là thứ duy nhất lặp lại được. Việc bạn click mười lần hôm nay, tuần sau sẽ phải click lại đúng mười lần.",
          "Đường dẫn tuyệt đối và tương đối là nguồn lỗi số một của tuần đầu tiên. `./script.sh` và `script.sh` không phải lúc nào cũng như nhau.",
          "Sao lưu chưa từng phục hồi thử một lần thì chưa phải sao lưu - nó chỉ là một thư mục bạn hy vọng còn dùng được.",
        ],
        "personal-Chặng 7": [
          "Một API lạ nên được đọc bằng `curl` trước khi viết code gọi nó - thấy tận mắt JSON trả về nhanh hơn đoán từ tài liệu.",
          "Lỗi 401 và 403 khác nhau: 401 là 'bạn là ai', 403 là 'biết bạn là ai rồi nhưng không cho'. Nhầm hai cái này là mất cả buổi sửa sai chỗ.",
          "Rate limit gần như luôn tính theo cửa sổ thời gian, không phải tổng số lượt. Gọi 100 lần trong 1 giây và 100 lần trong 1 giờ là hai câu chuyện khác nhau.",
          "Đừng bao giờ nhét khoá API vào mã nguồn rồi push lên - bot quét GitHub tìm khoá lộ nhanh hơn bạn kịp xoá commit.",
        ],
        "personal-Chặng 2": [
          "Commit nhỏ và thường xuyên rẻ hơn commit to mỗi tuần một lần - khi cần lần ngược tìm chỗ hỏng, bạn sẽ biết ơn chính mình.",
          "`git commit` không gửi gì đi đâu cả. Nhiều người mới tưởng đã lưu lên máy chủ trong khi mọi thứ vẫn nằm trên máy mình cho tới lúc `git push`.",
          "Xung đột merge không phải lỗi của ai - nó chỉ là Git nói 'hai người sửa cùng một dòng, tôi không tự quyết được'.",
          "Nhánh là thứ rẻ nhất trong Git. Tạo nhánh mới cho một ý tưởng còn nhanh hơn ngồi lo mình sẽ làm hỏng nhánh chính.",
        ],
        "personal-Chặng 3": [
          "Đọc thông báo lỗi từ dòng đầu tiên, không phải dòng cuối. Dòng cuối là nơi chương trình chết, dòng đầu mới là nơi nó bắt đầu sai.",
          "Đặt tên biến là việc khó thật sự trong lập trình. `x` tiết kiệm được ba giây hôm nay và mất ba mươi phút sau sáu tháng.",
          "Một hàm làm hai việc thì sẽ có ngày bạn cần đúng một trong hai việc đó - và phải chép nó ra làm bản thứ hai.",
          "Học một ngôn ngữ cho tới lúc viết được thứ chạy được, rồi mới học ngôn ngữ thứ hai. Biết lơ mơ ba ngôn ngữ không bằng dùng thạo một.",
        ],
        "personal-Chặng 4": [
          "HTML mô tả nội dung, CSS mô tả hình thức. Trộn hai vai này là lý do một trang trông ổn trên máy bạn và vỡ trên máy người khác.",
          "Dùng thẻ đúng ngữ nghĩa (`button` cho nút, `nav` cho điều hướng) là cách rẻ nhất để trang dùng được với bàn phím và trình đọc màn hình.",
          "Phần lớn lỗi bố cục CSS đến từ việc không biết phần tử đang ở chế độ hiển thị nào - mở dev tools xem trước khi đoán.",
          "Responsive không phải là thêm một bản riêng cho điện thoại, mà là đừng cố định chiều rộng ngay từ đầu.",
        ],
        "personal-Chặng 5": [
          "JavaScript chạy một luồng. Mọi thứ trông như 'chạy song song' thực ra là xếp hàng chờ tới lượt.",
          "Bất đồng bộ khó ở chỗ thứ tự chạy khác thứ tự đọc. `console.log` đặt sau lời gọi mạng thường in ra trước kết quả mạng.",
          "Gắn sự kiện vào phần tử chưa tồn tại thì không có lỗi nào báo - chỉ là nút bấm không phản ứng. Kiểm tra phần tử có thật trước khi nghi ngờ logic.",
          "Sửa DOM trong vòng lặp là cách chắc chắn làm trang giật. Gom thay đổi lại rồi ghi một lần.",
        ],
        "personal-Chặng 6": [
          "Chọn đúng cấu trúc dữ liệu tiết kiệm nhiều hơn mọi thủ thuật tối ưu: tìm trong mảng là duyệt từng phần tử, tìm trong map là tra thẳng.",
          "Big-O nói về xu hướng khi dữ liệu lớn dần, không phải tốc độ tuyệt đối. Với 20 phần tử, thuật toán 'tệ' thường vẫn nhanh hơn.",
          "Ngăn xếp và hàng đợi khác nhau đúng một điều: lấy ra từ đầu nào. Đó là điều quyết định thứ tự xử lý của cả hệ thống.",
          "Trước khi tự viết thuật toán sắp xếp, hãy chắc là hàm sắp xếp có sẵn không đủ dùng - nó gần như luôn đủ.",
        ],
        "professional-Chặng 1": [
          "Kiểu dữ liệu không chỉ là ràng buộc trình biên dịch; nó quyết định bộ nhớ được cấp phát ra sao và dữ liệu nằm liền nhau hay rải rác.",
          "Truyền theo giá trị và truyền theo tham chiếu là gốc của lớp lỗi khó nhất cho người mới: sửa một biến và thấy một biến khác đổi theo.",
          "Thu gom rác không phải là 'không cần nghĩ về bộ nhớ nữa'. Một tham chiếu bị giữ lại ngoài ý muốn vẫn là rò rỉ, chỉ là rò rỉ im lặng.",
          "Vòng đời biến quyết định lúc nào bộ nhớ được giải phóng - và cũng quyết định lúc nào chương trình dừng một nhịp để dọn dẹp.",
        ],
        "professional-Chặng 2": [
          "Đọc mã người khác bắt đầu từ điểm vào, không từ dòng đầu file. Câu hỏi đầu tiên luôn là 'ai gọi cái này'.",
          "Stack trace đọc từ dưới lên: dưới cùng là nơi mọi thứ bắt đầu, trên cùng là nơi nó vỡ.",
          "Chú thích nói ý định, mã nói hành vi. Khi hai thứ mâu thuẫn, mã là thứ đang chạy - còn chú thích là bằng chứng ai đó từng nghĩ khác.",
          "Độ phủ kiểm thử cao không có nghĩa mã đúng, chỉ nghĩa là mã có được chạy qua. Hai chuyện đó khác nhau xa.",
        ],
        "professional-Chặng 3": [
          "Thông lượng và độ trễ không đi cùng chiều. Gom lô làm thông lượng tăng và độ trễ từng yêu cầu tệ đi.",
          "Trung bình che giấu mọi thứ đáng lo. Độ trễ trung bình 50ms có thể là 5% người dùng chờ 3 giây.",
          "Đo trước, tối ưu sau. Trực giác về điểm nghẽn sai nhiều hơn đúng, và tối ưu nhầm chỗ thì tốn công mà không đổi được gì.",
          "CPU đầy và CPU chờ I/O là hai bệnh khác nhau, thuốc cũng khác nhau - phân biệt được trước khi đụng vào mã.",
        ],
        "professional-Chặng 4": [
          "Big-O bỏ qua hằng số, còn máy thật thì không. Thuật toán O(n log n) với hằng số lớn vẫn có thể thua O(n²) ở quy mô bạn đang chạy.",
          "Phân tích khấu hao giải thích vì sao một thao tác thỉnh thoảng rất chậm mà trung bình vẫn rẻ - mảng động nới sức chứa là ví dụ kinh điển.",
          "Độ định vị dữ liệu thường quan trọng hơn số phép tính. Duyệt liền mạch trong bộ nhớ nhanh hơn nhảy lung tung nhiều lần.",
          "Cache tăng tốc bằng cách đánh đổi tính đúng đắn tức thời. Câu hỏi luôn phải là 'dữ liệu cũ bao lâu thì vẫn chấp nhận được'.",
        ],
        "professional-Chặng 5": [
          "Tách dịch vụ không tự làm hệ thống tốt hơn; nó đổi độ phức tạp trong mã lấy độ phức tạp trong mạng.",
          "Ranh giới dịch vụ nên cắt theo ranh giới dữ liệu. Hai dịch vụ dùng chung một bảng thì thực chất vẫn là một dịch vụ.",
          "Sản phẩm giai đoạn đầu hầu như luôn nên bắt đầu bằng một khối duy nhất - tách sớm là trả giá cho một quy mô chưa tới.",
          "Mỗi dịch vụ thêm vào là thêm một thứ có thể chết lúc 3 giờ sáng. Đếm chi phí đó trước khi vẽ sơ đồ.",
        ],
        "professional-Chặng 6": [
          "API là hợp đồng, và hợp đồng thì không sửa lặng lẽ. Thêm trường thì được, đổi ý nghĩa một trường là phá vỡ.",
          "REST hợp khi tài nguyên rõ ràng; GraphQL hợp khi client cần tự chọn dữ liệu; gRPC hợp khi hai bên đều là dịch vụ nội bộ và cần nhanh.",
          "Đánh phiên bản API từ ngày đầu rẻ hơn nhiều so với gắn phiên bản vào lúc đã có người dùng thật.",
          "Mã lỗi trả về là một phần của hợp đồng. Trả 200 kèm `{\"error\": ...}` là buộc mọi client phải đọc thân phản hồi mới biết chuyện gì.",
        ],
        "professional-Chặng 7": [
          "Một vòng gọi mạng tốn nhiều hơn hàng triệu phép tính. Giảm số vòng gọi gần như luôn thắng tối ưu mã.",
          "Timeout không có nghĩa là yêu cầu thất bại - nó có nghĩa bạn ngừng chờ. Bên kia có thể vẫn đang xử lý.",
          "Thử lại mà không có giãn cách tăng dần là cách biến một sự cố nhỏ thành sự cố lớn: cả đám client cùng dội lại một lúc.",
          "Thử lại chỉ an toàn với thao tác lặp lại không đổi kết quả. Thử lại một lệnh trừ tiền là trừ hai lần.",
        ],
        "professional-Chặng 8": [
          "SLO là lời hứa có ngân sách. Chạy 100% thời gian không phải mục tiêu - nó chỉ nghĩa là bạn đang trả quá nhiều cho độ tin cậy.",
          "Ngân sách lỗi còn dư là giấy phép để phát hành. Hết ngân sách là tín hiệu dừng tính năng mới, không phải tín hiệu trách ai.",
          "Hậu sự cố không đổ lỗi không phải là tử tế cho vui - người sợ bị trách sẽ giấu thông tin bạn cần nhất.",
          "Dự phòng chỉ có giá trị khi đã thử chuyển sang thật. Bản dự phòng chưa bao giờ được kích hoạt là bản dự phòng chưa biết có chạy không.",
        ],
        "professional-Chặng 9": [
          "Hàng đợi không làm hệ thống nhanh hơn; nó làm hệ thống chịu được lúc dồn tải bằng cách hoãn việc lại.",
          "Hàng đợi dài ra là triệu chứng, không phải bệnh - nghĩa là bên tiêu thụ chậm hơn bên sản xuất, và nó sẽ không tự khỏi.",
          "Idempotency là điều kiện để xử lý lại an toàn. Với hàng đợi 'ít nhất một lần', tin nhắn trùng là chuyện bình thường chứ không phải sự cố.",
          "Xử lý bất đồng bộ đổi phản hồi tức thì lấy khả năng chịu tải - và đổi luôn cả sự đơn giản khi đi tìm nguyên nhân lỗi.",
        ],
        "professional-Chặng 10": [
          "Nợ kỹ thuật không xấu; nợ kỹ thuật không ai ghi lại mới xấu. Vay có ý thức khác hẳn vay mà quên mất mình đang nợ.",
          "Đối chuẩn hiệu năng chỉ có nghĩa khi đo trên dữ liệu giống thật. Đo trên tập 100 bản ghi rồi suy ra hành vi ở 10 triệu là đoán, không phải đo.",
          "Di trú hệ thống nên chạy song song hai bên và đối chiếu kết quả trước khi cắt - 'chuyển một phát' là canh bạc không cần thiết.",
          "Tách khối nên bắt đầu từ phần ít ràng buộc nhất, không phải phần đau nhất. Phần đau nhất thường là phần bị ràng buộc nhiều nhất.",
        ],
        "professional-Chặng 13": [
          "AI không thay thế tư duy kỹ thuật; nó khuếch đại người biết đặt câu hỏi, kiểm chứng nguồn và đọc được mã nó sinh ra.",
          "Prompt tốt phải có vai trò, dữ liệu, nhiệm vụ, định dạng đầu ra và ràng buộc nguồn - thiếu một phần thì kết quả rất dễ hay nhưng khó dùng.",
          "Khi dùng AI đọc mã nguồn, hãy bắt nó trích tên file và số dòng cho từng khẳng định, và ghi 'Không tìm thấy' nếu kho mã không có.",
          "AI mạnh nhất trong quy trình: đọc tài liệu, dựng bản nháp, sinh kiểm thử, tìm chỗ khả nghi; quyết định phát hành cuối cùng vẫn cần con người chịu trách nhiệm.",
        ],
        bonus: [
          "Dự án thật là nơi lý thuyết gặp thực tế lộn xộn - kho mã thật hiếm khi gọn gàng như ví dụ trong sách.",
          "Đọc mã nguồn của một hệ thống đang chạy khác hẳn đọc ví dụ minh họa - luôn có ràng buộc lịch sử, hạn chót cũ và quyết định kiến trúc ẩn phía sau.",
          "Sửa một lỗi thật trong một dự án cụ thể là cách tốt nhất để kiểm tra xem bạn đã thực sự hiểu khái niệm hay chỉ mới thuộc lòng định nghĩa.",
          "Không có kho mã nào hoàn hảo để học - mỗi dự án đều có điểm mù riêng, quan trọng là nhận ra được điểm mù đó là gì.",
        ],
      },
    },

    rpgInventory: {
      items: {
        suit_armani: {
          name: "Vest Armani Executive",
          description: "Vest doanh nhân xa xỉ tăng +45 Sức mạnh định giá và phong thái Silicon Valley.",
        },
        watch_rolex: {
          name: "Rolex Submariner Gold",
          description: "Đồng hồ mạ vàng Thụy Sĩ giúp tăng tốc độ đọc BCTC lên +40%.",
        },
        glasses_bloomberg: {
          name: "Kính Bloomberg Terminal",
          description: "Kính nhìn thấu dòng tiền và chỉ số tài chính thời gian thực.",
        },
        pen_gold: {
          name: "Bút Vàng Ký Hợp Đồng M&A",
          description: "Bút máy mạ vàng chuyên dùng chốt các thương vụ M&A triệu đô.",
        },
        potion_x2xp: {
          name: "Thuốc X2 XP Silicon Valley (24H)",
          description: "Nhân đôi toàn bộ XP nhận được khi hoàn thành bài học và Quiz.",
        },
        card_vinamilk: {
          name: "Thẻ Doanh Nghiệp Vinamilk (VNM)",
          description: "Thẻ cổ phiếu đầu ngành tiêu dùng Việt Nam.",
        },
      },
      rarityLabels: {
        "Thường": "Thường",
        "Hiếm": "Hiếm",
        "Huyền Thoại": "Huyền Thoại",
      },
    },

    scrollytelling: {
      panels: {
        panel0: {
          tag: "01 / NGUYÊN TẮC THIẾT KẾ",
          badge: "1. Vì sao ở lại",
          title: "Vì sao 92% học viên duy trì thói quen học mỗi ngày?",
          subtitle: "Giải quyết 4 rào cản tâm lý lớn nhất khi tự học công nghệ bằng thiết kế sản phẩm tinh gọn.",
          items: [
            { title: "Chống quên bài học", desc: "Spaced Repetition tự động nhắc ôn lại đúng thời điểm sắp quên." },
            { title: "100% Miễn phí mãi mãi", desc: "Không khoá học trả phí đắt đỏ ẩn phía sau. Tự do học hoàn toàn." },
            { title: "Lộ trình rõ ràng", desc: "Chia chặng từng bước từ cơ bản đến phân tích báo cáo tài chính." },
            { title: "Đo lường phản xạ", desc: "Quiz Active Recall + XP bảng xếp hạng giúp biết ngay độ hiểu bài." },
          ],
        },
        panel1: {
          tag: "02 / PHƯƠNG PHÁP KHOA HỌC",
          badge: "2. Phương pháp",
          title: "Spaced Repetition & Active Recall — Học ít, nhớ lâu",
          subtitle: "Phương pháp ghi nhớ bám sát đường cong quên lãng (Forgetting Curve) của não bộ.",
          items: [
            { title: "5-7 phút / bài", desc: "Bài học ngắn gọn, tập trung đúng 1 khái niệm cốt lõi." },
            { title: "Active Recall", desc: "Bắt não kích hoạt nhớ lại kiến thức qua Quiz kiểm tra." },
            { title: "Nhắc ôn đúng lúc", desc: "Câu hỏi ôn lặp lại xuất hiện tự động sau ~5 bài tiếp." },
            { title: "Khắc sâu bản chất", desc: "Biến lý thuyết thành phản xạ đọc báo cáo tài chính." },
          ],
        },
        panel2: {
          tag: "03 / ĐỐI TƯỢNG PHÙ HỢP",
          badge: "3. Đối tượng",
          title: "Lộ trình được thiết kế dành riêng cho bạn",
          subtitle: "Dù bạn bắt đầu từ con số 0 hay cần chuẩn hóa kiến thức chuyên sâu.",
          items: [
            { title: "Nền tảng công nghệ", tag: "Dòng tiền", desc: "Dành cho ai muốn quản lý tiền, tiết kiệm và đầu tư an toàn." },
            { title: "Người học CFA", tag: "Candidates", desc: "Cần nạp nền tảng kiến thức chắc chắn và phản xạ lý thuyết." },
            { title: "Financial Planner", tag: "Tư vấn", desc: "Chuẩn hóa khung tư duy hoạch định tài chính bài bản." },
            { title: "Nhà đầu tư cá nhân", tag: "Cổ phiếu", desc: "Nắm vững cách đọc chỉ số tài chính và bóc tách doanh nghiệp." },
          ],
        },
      },
    },

    toolsIndex: {
      eyebrow: "Công cụ tài chính & Định giá",
      title: "Áp dụng số liệu vào thực tế",
      subtitle: "Mô phỏng tài chính cá nhân & định giá doanh nghiệp chuẩn CFA.",
      loading: "Đang tải...",
      tabs: {
        netWorth: "Tài sản ròng",
        budget: "Ngân sách 50/30/20",
        emergencyFund: "Quỹ khẩn cấp",
        compoundInterest: "Giả lập Lãi kép",
        firePlanner: "Kế hoạch FIRE",
        valuationDcf: "Định giá DCF & WACC",
        valuationModel: "Mô hình Excel",
      },
    },
  },
};

export const dataTablesEn: typeof dataTablesVi = {
  dataTables: {
    stageTips: {
      mascotName: "Tài Tài",
      tips: {
        "personal-Chặng 1": [
          "The simplest rule in the trade: know what your machine is running before you install anything else. Most 'my computer is slow' problems for beginners are a forgotten process, not weak hardware.",
          "The command line isn't about looking impressive; it's the only thing you can repeat. Ten clicks today means ten clicks again next week.",
          "Absolute and relative paths are the number one source of first-week errors. `./script.sh` and `script.sh` are not always the same thing.",
          "A backup you have never restored from once isn't a backup - it's a folder you hope still works.",
        ],
        "personal-Chặng 7": [
          "Poke at an unfamiliar API with `curl` before writing code against it - seeing the actual JSON beats guessing from the docs.",
          "401 and 403 are different: 401 is 'who are you', 403 is 'we know who you are and the answer is no'. Confusing the two costs you an afternoon fixing the wrong thing.",
          "Rate limits are almost always per time window, not per total. 100 calls in one second and 100 calls in one hour are two different stories.",
          "Never hard-code an API key and push it - bots scanning GitHub for leaked keys are faster than you can delete the commit.",
        ],
        "personal-Chặng 2": [
          "Small, frequent commits are cheaper than one big commit a week - when you need to bisect back to the breakage, you'll thank yourself.",
          "`git commit` sends nothing anywhere. Plenty of beginners think their work is on the server while it all still sits on their own machine until `git push`.",
          "A merge conflict isn't anyone's fault - it's just Git saying 'two people edited the same line, I can't decide this for you'.",
          "Branches are the cheapest thing in Git. Creating one for an idea is faster than worrying about breaking main.",
        ],
        "personal-Chặng 3": [
          "Read an error message from the first line, not the last. The last line is where the program died; the first is where it went wrong.",
          "Naming things is the genuinely hard part of programming. `x` saves three seconds today and costs thirty minutes six months from now.",
          "A function that does two things means someday you'll need exactly one of them - and end up copying it into a second version.",
          "Learn one language until you can ship something that runs, then learn the second. Vaguely knowing three beats nothing; fluently using one beats all of it.",
        ],
        "personal-Chặng 4": [
          "HTML describes content, CSS describes appearance. Mixing the two roles is why a page looks fine on your machine and falls apart on someone else's.",
          "Using semantically correct tags (`button` for buttons, `nav` for navigation) is the cheapest way to make a page work with a keyboard and a screen reader.",
          "Most CSS layout bugs come from not knowing which display mode an element is in - open dev tools before you start guessing.",
          "Responsive design isn't adding a separate phone version; it's not hard-coding a width in the first place.",
        ],
        "personal-Chặng 5": [
          "JavaScript runs on one thread. Everything that looks like it runs in parallel is really taking its turn in a queue.",
          "Async is hard because execution order isn't reading order. A `console.log` written after a network call usually prints before the result arrives.",
          "Attaching an event to an element that doesn't exist yet raises no error - the button simply does nothing. Check the element is really there before you doubt your logic.",
          "Touching the DOM inside a loop is a reliable way to make a page stutter. Batch the changes and write once.",
        ],
        "personal-Chặng 6": [
          "Picking the right data structure saves more than any optimisation trick: searching an array walks every element, looking up a map goes straight there.",
          "Big-O describes the trend as data grows, not absolute speed. At 20 elements, the 'bad' algorithm is usually still faster.",
          "A stack and a queue differ in exactly one thing: which end you take from. That one thing decides the processing order of a whole system.",
          "Before writing your own sort, make sure the built-in one really isn't enough - it almost always is.",
        ],
        "professional-Chặng 1": [
          "Types aren't just a compiler constraint; they decide how memory is allocated and whether your data sits contiguously or scattered.",
          "Pass-by-value versus pass-by-reference is the root of the hardest bug class for newcomers: changing one variable and watching another change with it.",
          "Garbage collection doesn't mean 'stop thinking about memory'. A reference accidentally held is still a leak, just a silent one.",
          "Variable lifetime decides when memory is released - and therefore when your program pauses to clean up.",
        ],
        "professional-Chặng 2": [
          "Read someone else's code from the entry point, not from line one of the file. The first question is always 'who calls this'.",
          "Read a stack trace bottom-up: the bottom is where it all started, the top is where it broke.",
          "Comments state intent, code states behaviour. When they disagree, the code is what's running - the comment is evidence somebody once thought otherwise.",
          "High test coverage doesn't mean the code is correct, only that it was executed. Those are very different claims.",
        ],
        "professional-Chặng 3": [
          "Throughput and latency don't move together. Batching raises throughput and makes each individual request slower.",
          "Averages hide everything worth worrying about. A 50ms average latency can mean 5% of users waiting three seconds.",
          "Measure first, optimise second. Intuition about bottlenecks is wrong more often than right, and optimising the wrong spot costs effort and changes nothing.",
          "A saturated CPU and a CPU waiting on I/O are two different illnesses with two different cures - tell them apart before touching code.",
        ],
        "professional-Chặng 4": [
          "Big-O drops the constants; real machines don't. An O(n log n) algorithm with a big constant can still lose to O(n²) at the scale you actually run.",
          "Amortised analysis explains why one operation is occasionally very slow while the average stays cheap - a dynamic array growing its capacity is the classic case.",
          "Data locality often matters more than the operation count. Walking contiguous memory beats jumping around it many times over.",
          "A cache buys speed by trading away immediate correctness. The question is always 'how stale is still acceptable'.",
        ],
        "professional-Chặng 5": [
          "Splitting services doesn't make a system better by itself; it trades complexity in the code for complexity on the network.",
          "Service boundaries should follow data boundaries. Two services sharing one table are really still one service.",
          "An early-stage product should almost always start as a single unit - splitting early is paying for a scale that hasn't arrived.",
          "Every service you add is one more thing that can die at 3am. Count that cost before drawing the diagram.",
        ],
        "professional-Chặng 6": [
          "An API is a contract, and contracts don't change quietly. Adding a field is fine; changing what a field means is a break.",
          "REST fits when resources are clear; GraphQL fits when clients need to pick their own data; gRPC fits when both ends are internal services that need speed.",
          "Versioning an API from day one is far cheaper than bolting versioning on once you have real users.",
          "Error codes are part of the contract. Returning 200 with `{\"error\": ...}` forces every client to parse the body just to find out what happened.",
        ],
        "professional-Chặng 7": [
          "One network round trip costs more than millions of computations. Cutting round trips almost always beats tuning code.",
          "A timeout doesn't mean the request failed - it means you stopped waiting. The other side may still be working on it.",
          "Retrying without exponential backoff is how a small incident becomes a large one: every client piles back on at the same moment.",
          "Retries are only safe for operations that produce the same result when repeated. Retrying a debit charges twice.",
        ],
        "professional-Chặng 8": [
          "An SLO is a promise with a budget. Running at 100% isn't the goal - it just means you're overpaying for reliability.",
          "Error budget left over is permission to ship. Error budget spent is a signal to pause new features, not a signal to blame someone.",
          "Blameless postmortems aren't kindness for its own sake - people who fear blame withhold exactly the information you need most.",
          "Redundancy only counts once you've actually failed over. A standby that has never been activated is a standby nobody knows works.",
        ],
        "professional-Chặng 9": [
          "A queue doesn't make a system faster; it makes a system survive a traffic spike by deferring the work.",
          "A growing queue is a symptom, not the disease - it means consumers are slower than producers, and it won't fix itself.",
          "Idempotency is the precondition for safe reprocessing. With at-least-once delivery, duplicate messages are normal, not an incident.",
          "Async processing trades an immediate response for load tolerance - and trades away easy root-cause analysis along with it.",
        ],
        "professional-Chặng 10": [
          "Technical debt isn't bad; technical debt nobody wrote down is. Borrowing deliberately is nothing like forgetting you borrowed.",
          "A benchmark only means something on realistic data. Measuring 100 records and extrapolating to 10 million is guessing, not measuring.",
          "Run both systems side by side and compare outputs before you cut over - a big-bang migration is a bet you didn't need to place.",
          "Break up the monolith starting from the least entangled piece, not the most painful one. The most painful piece is usually the most entangled.",
        ],
        "professional-Chặng 13": [
          "AI doesn't replace engineering judgement; it amplifies people who know how to ask questions, verify sources, and read the code it produces.",
          "A good prompt needs a role, data, a task, an output format, and a source constraint - miss any one piece and the output tends to look good while being hard to actually use.",
          "When using AI to read a codebase, make it cite a filename and line number for every claim, and say 'not found' when the repo doesn't have it.",
          "AI is strongest inside a workflow: reading docs, drafting a first pass, generating tests, flagging suspicious spots; the final ship decision still needs a human to own it.",
        ],
        bonus: [
          "A real project is where theory meets messy reality - real codebases are rarely as tidy as a textbook example.",
          "Reading the source of a running system is a different experience from reading a worked example - there's always historical constraint, an old deadline, and an architectural decision hiding behind it.",
          "Fixing a real bug in a specific project is the best way to check whether you actually understand a concept or just memorized its definition.",
          "No codebase is a perfect subject to learn from - every project has its own blind spot, and the point is learning to spot what that blind spot is.",
        ],
      },
    },

    rpgInventory: {
      items: {
        suit_armani: {
          name: "Armani Executive Suit",
          description: "A luxury business suit that adds +45 Valuation Power and Silicon Valley poise.",
        },
        watch_rolex: {
          name: "Rolex Submariner Gold",
          description: "A gold-plated Swiss watch that boosts financial-statement reading speed by +40%.",
        },
        glasses_bloomberg: {
          name: "Bloomberg Terminal Glasses",
          description: "Glasses that see straight through cash flow and financial metrics in real time.",
        },
        pen_gold: {
          name: "Golden M&A Signing Pen",
          description: "A gold-plated fountain pen made for closing multi-million-dollar M&A deals.",
        },
        potion_x2xp: {
          name: "Silicon Valley 2X XP Potion (24H)",
          description: "Doubles all XP earned from completing lessons and quizzes.",
        },
        card_vinamilk: {
          name: "Vinamilk (VNM) Corporate Card",
          description: "A stock card for Vietnam's leading consumer-goods company.",
        },
      },
      rarityLabels: {
        "Thường": "Common",
        "Hiếm": "Rare",
        "Huyền Thoại": "Legendary",
      },
    },

    scrollytelling: {
      panels: {
        panel0: {
          tag: "01 / DESIGN PRINCIPLES",
          badge: "1. Why learners stay",
          title: "Why do 92% of learners keep up their daily habit?",
          subtitle: "Solving the 4 biggest psychological barriers to teaching yourself tech through lean product design.",
          items: [
            { title: "Beats forgetting", desc: "Spaced repetition automatically resurfaces a review right before you'd forget it." },
            { title: "100% free, forever", desc: "No expensive paywall hiding behind it. Completely free to learn." },
            { title: "A clear path", desc: "Broken into stages, step by step, from the basics to reading financial statements." },
            { title: "Measured, not guessed", desc: "Active-recall quizzes plus an XP leaderboard show exactly how well you understood a lesson." },
          ],
        },
        panel1: {
          tag: "02 / THE SCIENCE",
          badge: "2. The method",
          title: "Spaced Repetition & Active Recall - learn less, remember longer",
          subtitle: "A memory method built around the brain's forgetting curve.",
          items: [
            { title: "5-7 minutes a lesson", desc: "Short lessons, each focused on exactly one core concept." },
            { title: "Active recall", desc: "Quizzes force your brain to actively retrieve what it just learned." },
            { title: "Reviews at the right time", desc: "Spaced-repetition questions resurface automatically after roughly 5 more lessons." },
            { title: "Makes it second nature", desc: "Turns theory into the reflex of actually reading a financial statement." },
          ],
        },
        panel2: {
          tag: "03 / WHO IT'S FOR",
          badge: "3. Who it's for",
          title: "A path designed around who you are",
          subtitle: "Whether you're starting from zero or need to formalize deep expertise.",
          items: [
            { title: "Tech foundations", tag: "Cash flow", desc: "For anyone who wants to manage money, save, and invest safely." },
            { title: "CFA candidates", tag: "Candidates", desc: "For building a solid theoretical foundation and sharp recall of it." },
            { title: "Financial planners", tag: "Advisory", desc: "For formalizing a rigorous financial-planning framework." },
            { title: "Individual investors", tag: "Equities", desc: "For mastering how to read financial ratios and dissect a company." },
          ],
        },
      },
    },

    toolsIndex: {
      eyebrow: "Financial Tools & Valuation",
      title: "Put the numbers to work",
      subtitle: "Personal-finance simulations and CFA-standard business valuation.",
      loading: "Loading...",
      tabs: {
        netWorth: "Net Worth",
        budget: "50/30/20 Budget",
        emergencyFund: "Emergency Fund",
        compoundInterest: "Compound Interest",
        firePlanner: "FIRE Planner",
        valuationDcf: "DCF & WACC Valuation",
        valuationModel: "Excel model",
      },
    },
  },
};
