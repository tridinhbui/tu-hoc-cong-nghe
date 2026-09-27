/** /hoc-theo-nhu-cau - học theo việc muốn làm, giải thích theo lối Feynman.
 *
 *  NGUYÊN TẮC VIẾT cho mọi chuỗi ở đây, vì người đọc là người CHƯA biết gì về
 *  công nghệ và đang dò xem mình có làm nổi không:
 *  1. Đồ vật đời thường trước, thuật ngữ sau. "Khung nhà" rồi mới tới "HTML".
 *  2. Mỗi chặng chốt bằng ĐÚNG MỘT câu. Nếu không tóm được trong một câu thì
 *     chính người viết chưa hiểu - đó là phép thử Feynman.
 *  3. Tiêu đề chặng hứa điều dễ ("đơn giản hơn bạn nghĩ") và phần thân phải
 *     giữ lời hứa đó. Cái khó để dành cho bài học, không để ở cửa vào.
 *
 *  Bảng so sánh luôn ba cột: thành phần | trong đời thường | trên máy thật.
 *  `rows` là mảng ba chuỗi theo đúng thứ tự `columns`.
 *
 *  Khoá của `flows` và `steps` trùng với id trong lib/learning-flows.ts. */
export const learningFlowsVi = {
  learningFlows: {
    metaTitle: "Học theo nhu cầu | Tự học Công nghệ Mỗi Ngày",
    metaDescription:
      "Muốn làm website, dùng AI làm việc, tạo AI Agent hay làm marketing với AI? Chọn việc bạn muốn làm - mỗi chặng được giải thích bằng ví dụ đời thường.",
    brand: "Tự Học Công Nghệ",
    navLearn: "Vào học",
    eyebrow: "Học theo nhu cầu",
    title: "Bạn muốn làm được gì?",
    sub: "Không cần biết công nghệ là gì. Chọn một việc bạn muốn làm - mỗi chặng bắt đầu bằng một ví dụ đời thường, và bạn được thử tay trước khi học lý thuyết.",

    journeyTitle: "Học giống như học đàn",
    journeySub: "Không ai bắt đầu chơi guitar bằng lý thuyết hoà âm. Người ta nghe một bài hay, thử bấm vài hợp âm, và thấy: mình làm được. Ở đây cũng vậy.",
    journeySteps: ["Nhìn thấy", "Thấy hay", "Thử tay", "Mình làm được!", "Tập nhiều hơn", "Giỏi hơn", "Đam mê"],

    statusReady: "Đủ bài",
    statusPartial: "Đang bổ sung",
    statusSoon: "Sắp có",
    lessonCount: "{count} bài · khoảng {minutes} phút",
    stepCount: "{count} chặng",
    openFlow: "Xem hành trình",
    backToAll: "Tất cả nhu cầu",
    allTracks: "Hoặc học theo lộ trình đầy đủ",

    firstWinTitle: "Thử ngay - chưa cần học gì",
    firstWinSub: "Bài đầu tiên ngắn và dễ. Làm xong nó, bạn đã bước qua phần khó nhất: bắt đầu.",
    firstWinCta: "Học bài đầu tiên",

    stepLabel: "Chặng {n}",
    feynmanBadge: "Chế độ Feynman",
    feynmanHint: "Giải thích như cho một bạn nhỏ 10 tuổi",
    oneLinerLabel: "Tóm gọn trong một câu",
    lessonsHeading: "Học kỹ hơn trong chặng này",
    minutes: "{minutes} phút",

    partialNote: "Các bài nền đã có đủ. Bài hướng dẫn dựng một agent hoàn chỉnh từ đầu đến cuối đang được viết.",
    soonNote: "Chặng chuyên cho marketing đang được viết. Trong lúc chờ, các bài dưới đây dùng được ngay.",

    branchesTitle: "Khi đã thấy mình làm được: chọn hướng của bạn",
    branchesSub: "Người chơi guitar giỏi rồi thì rẽ hai hướng - làm đàn, hoặc biểu diễn. Tuỳ khẩu vị và tính cách, và cả hai đều bắt đầu từ việc thử.",
    deepenTitle: "Nghệ nhân - đào sâu",
    deepenBody: "Bạn tò mò bên trong nó chạy thế nào. Như người làm đàn đi tìm hiểu gỗ, dây, cách âm vang.",
    buildTitle: "Nghệ sĩ - làm ra sản phẩm",
    buildBody: "Bạn muốn dùng nó để làm ra thứ gì đó cho người khác dùng. Như người biểu diễn lên sân khấu.",
    branchCta: "Bắt đầu từ bài này",

    homeEyebrow: "Học theo nhu cầu",
    homeTitle: "Bắt đầu từ việc bạn muốn làm",
    homeSub: "Không phải từ môn học. Chọn một việc - mỗi chặng giải thích bằng ví dụ đời thường, có bảng so sánh, và chốt lại trong một câu.",
    homeAll: "Xem tất cả nhu cầu",

    goalCard: {
      pickTitle: "Bạn muốn làm được gì?",
      pickSub: "Chọn một việc - mình sẽ dẫn bạn đi đúng những bài cần cho việc đó, bắt đầu từ bài dễ nhất.",
      yourGoal: "Hành trình của bạn",
      progress: "{done}/{total} bài",
      stepNow: "Đang ở chặng {n}",
      nextLabel: "Bài tiếp theo",
      nextCta: "Học tiếp",
      finished: "Bạn đã đi hết hành trình này. Giờ chọn hướng: đào sâu hay làm ra sản phẩm.",
      seeFlow: "Xem cả hành trình",
      change: "Đổi mục tiêu",
      saveFailed: "Chưa lưu được lựa chọn. Thử lại sau nhé.",
    },
    demo: {
      title: "Thử ngay: bật tắt từng phần của ngôi nhà",
      sub: "Gõ tên bạn vào ô dưới rồi bật tắt CSS và JavaScript. Bạn đang sửa một trang web thật.",
      nameLabel: "Tên chủ nhà",
      defaultName: "Bạn",
      toggleHtml: "HTML - khung nhà",
      toggleCss: "CSS - sơn và trang trí",
      toggleJs: "JavaScript - điện và chuông",
      htmlAlways: "Luôn bật: không có khung thì không có nhà.",
      iframeTitle: "Bản xem trước trang web ngôi nhà",
      houseHeading: "Nhà của {name}",
      houseIntro: "Chào mừng tới trang web đầu tiên của tôi.",
      rooms: ["Phòng khách", "Bếp", "Phòng ngủ"],
      bellButton: "Bấm chuông",
      bellRung: "Ding dong! Có khách tới 🔔",
      bellSilent: "Chuông chưa nối điện…",
      lightButton: "Bật / tắt đèn",
      tryHint: "Tắt CSS: nhà vẫn đứng, chỉ mất sơn. Tắt JavaScript: vẫn đẹp, nhưng bấm chuông không reo.",
      win: "Bạn vừa sửa một trang web. Thật đấy - đó là toàn bộ ý tưởng của chặng này.",
    },

    flows: {
      website: {
        need: "Tôi muốn làm một website",
        title: "Làm website",
        promise: "Từ con số 0 tới một trang web của riêng bạn, ai cũng mở được.",
        steps: {
          house: {
            title: "Tạo ra một website đơn giản hơn bạn nghĩ",
            intro: "Hãy tưởng tượng website là một ngôi nhà. Mọi trang web bạn từng mở - Facebook, Shopee, báo điện tử - đều được dựng từ đúng ba thứ.",
            columns: ["Thành phần", "Trong ngôi nhà", "Trên website"],
            rows: [
              ["HTML", "Khung nhà: mấy tầng, phòng khách, bếp ở đâu, cửa chỗ nào", "Tiêu đề, đoạn văn, hình ảnh, nút bấm, ô nhập liệu"],
              ["CSS", "Trang trí: màu sơn, rèm cửa, đồ nội thất", "Màu sắc, cỡ chữ, hiệu ứng, vừa cả máy tính lẫn điện thoại"],
              ["JavaScript", "Tiện ích: công tắc điện, chuông cửa", "Bấm nút thì có chuyện xảy ra: mở menu, gửi form, hiện thông báo"],
            ],
            oneLiner: "HTML tạo ra thứ để nhìn thấy, CSS làm cho nó đẹp mắt, còn JavaScript làm cho nó hoạt động.",
          },
          rooms: {
            title: "Sắp xếp các phòng: bố cục dễ hơn xếp đồ đạc",
            intro: "Có khung nhà rồi, giờ là bày đồ. Bố cục trang web chính là việc quyết định món nào đặt ở đâu, cách nhau bao xa.",
            columns: ["Thành phần", "Trong ngôi nhà", "Trên website"],
            rows: [
              ["Mô hình hộp", "Mỗi món đồ có kích thước, và cần chừa khoảng trống xung quanh", "Mỗi phần tử có chiều rộng, lề, viền và khoảng đệm"],
              ["Flexbox", "Xếp đồ thành một hàng trên kệ, tự dàn đều", "Xếp các nút, thẻ thành một hàng hoặc một cột"],
              ["Grid", "Bản vẽ mặt bằng chia ô: ô này là bếp, ô kia là phòng ngủ", "Chia trang thành lưới hàng và cột"],
              ["Responsive", "Căn nhà tự co giãn theo lô đất to hay nhỏ", "Trang tự đổi bố cục khi mở trên điện thoại"],
            ],
            oneLiner: "Bố cục là xếp đồ đạc: mỗi món một kích thước, và bạn chọn xếp theo hàng hay theo ô.",
          },
          switches: {
            title: "Lắp công tắc và chuông cửa: JavaScript không đáng sợ",
            intro: "Một ngôi nhà đẹp nhưng không có điện thì chỉ để ngắm. JavaScript là hệ thống điện: có người bấm thì có việc xảy ra.",
            columns: ["Thành phần", "Trong ngôi nhà", "Trên website"],
            rows: [
              ["Biến", "Chiếc hộp có dán nhãn để cất đồ", "Chỗ cất một giá trị: tên người dùng, số lượng trong giỏ hàng"],
              ["Hàm", "Công tắc: bấm một cái là cả dàn đèn cùng sáng", "Một nhóm việc gói lại, gọi một tên là chạy cả nhóm"],
              ["Sự kiện", "Chuông cửa: chỉ reo khi có người bấm", "Chờ người dùng bấm, gõ, cuộn rồi mới phản ứng"],
              ["Biểu mẫu", "Hòm thư trước cửa: khách để lại lời nhắn", "Ô nhập liệu để người dùng gửi thông tin cho bạn"],
            ],
            oneLiner: "JavaScript là hệ thống điện: có người bấm thì trang web làm một việc gì đó.",
          },
          "open-door": {
            title: "Mở cửa đón khách: đưa trang web lên mạng",
            intro: "Nhà đã xong nhưng đang nằm trong máy của bạn - chưa ai ghé được. Đưa lên mạng giống như xây nhà trên một mảnh đất có địa chỉ.",
            columns: ["Thành phần", "Trong đời thật", "Trên internet"],
            rows: [
              ["Hosting", "Mảnh đất để dựng nhà", "Máy chủ chạy suốt ngày đêm, giữ các tệp trang web của bạn"],
              ["Tên miền", "Số nhà và tên đường", "Địa chỉ dễ nhớ như tenban.vn"],
              ["DNS", "Cuốn danh bạ tra từ địa chỉ ra đúng vị trí", "Hệ thống đổi tên miền thành địa chỉ máy chủ"],
              ["HTTPS", "Khoá cửa và phong bì dán kín", "Mã hoá để không ai đọc lén được dữ liệu trên đường đi"],
            ],
            oneLiner: "Hosting là mảnh đất, tên miền là số nhà, còn HTTPS là ổ khoá.",
          },
        },
      },
      "ai-assistant": {
        need: "Tôi muốn AI làm việc cùng mình",
        title: "Dùng AI làm việc nhanh hơn",
        promise: "Biết giao việc gì cho AI, giao thế nào, và kiểm lại ra sao.",
        steps: {
          intern: {
            title: "AI giống một thực tập sinh siêu tốc",
            intro: "Hãy hình dung ChatGPT hay Claude là một thực tập sinh đã đọc gần hết sách trong thư viện. Rất nhanh, rất giỏi - nhưng mới vào làm ngày đầu.",
            columns: ["Đặc điểm", "Thực tập sinh", "Trợ lý AI"],
            rows: [
              ["Kiến thức", "Đọc rất nhiều, nhưng chưa biết gì về công ty bạn", "Biết rộng, nhưng không biết bối cảnh của bạn nếu bạn không kể"],
              ["Tốc độ", "Làm nháp trong vài phút", "Viết nháp trong vài giây"],
              ["Điểm yếu", "Ngại hỏi, đôi khi đoán bừa cho xong", "Khi không biết vẫn trả lời rất tự tin - gọi là bịa"],
              ["Cách dùng tốt", "Giao việc rõ, rồi xem lại trước khi gửi sếp", "Mô tả rõ việc cần làm, rồi kiểm lại trước khi dùng"],
            ],
            oneLiner: "AI là thực tập sinh đọc cả thư viện: giao việc rõ ràng, và luôn kiểm lại bài của nó.",
          },
          brief: {
            title: "Giao việc cho AI dễ như viết một tờ giấy nhắn",
            intro: "Câu lệnh (prompt) chỉ là một tờ phiếu giao việc. Phiếu càng rõ, kết quả càng đúng ý - y như khi nhờ người thật.",
            columns: ["Phần của phiếu", "Khi nhờ người thật", "Khi nhờ AI"],
            rows: [
              ["Bối cảnh", "\"Anh đang lo cái hội thảo tuần sau…\"", "Bạn là ai, đang làm gì, cho ai đọc"],
              ["Việc cần làm", "\"Em viết giúp anh thư mời\"", "Nói rõ kết quả mong muốn, không phải cách làm"],
              ["Khuôn dạng", "\"Ngắn thôi, tầm năm dòng\"", "Độ dài, giọng văn, dạng bảng hay gạch đầu dòng"],
              ["Ví dụ mẫu", "\"Giống cái thư năm ngoái ấy\"", "Dán một mẫu bạn thích để nó bắt chước"],
            ],
            oneLiner: "Viết prompt như viết phiếu giao việc cho người mới: bối cảnh, việc cần làm, khuôn dạng, ví dụ.",
          },
          verify: {
            title: "Kiểm lại trước khi tin: thói quen của người dùng AI giỏi",
            intro: "Thực tập sinh giỏi đến mấy thì bài của họ vẫn phải qua mắt bạn. Với AI còn cần hơn, vì nó sai mà giọng vẫn chắc nịch.",
            columns: ["Thói quen", "Với thực tập sinh", "Với AI"],
            rows: [
              ["Hỏi lại nguồn", "\"Số liệu này em lấy ở đâu?\"", "Yêu cầu dẫn nguồn, rồi tự mở nguồn ra xem"],
              ["Làm từng bước", "Duyệt dàn ý trước khi viết cả bài", "Bắt nó trình bày từng bước để thấy chỗ sai"],
              ["Giữ bí mật", "Không đưa mật khẩu cho người mới vào", "Không dán thông tin khách hàng, mật khẩu vào khung chat"],
            ],
            oneLiner: "AI trả lời nhanh, còn việc quyết định đúng sai vẫn là của bạn.",
          },
          daily: {
            title: "Biến AI thành thói quen hằng ngày",
            intro: "Dùng một lần thì thấy hay. Dùng mỗi ngày mới thấy khác biệt - giống tập đàn mười phút mỗi ngày hơn tập ba tiếng một lần.",
            columns: ["Việc", "Tự làm", "Làm cùng AI"],
            rows: [
              ["Viết tài liệu", "Một buổi chiều", "Mười phút nháp, hai mươi phút sửa"],
              ["Tóm tắt tài liệu dài", "Đọc hết rồi ghi chú", "Nhờ tóm tắt, rồi đọc kỹ đúng phần quan trọng"],
              ["Kho câu lệnh", "Mỗi lần nghĩ lại từ đầu", "Lưu những prompt tốt để dùng lại"],
            ],
            oneLiner: "Lưu lại những câu lệnh tốt, và mỗi ngày giao cho AI một việc nhỏ.",
          },
        },
      },
      "ai-agent": {
        need: "Tôi muốn tạo một AI Agent",
        title: "Tạo AI Agent",
        promise: "Hiểu agent là gì, cho nó dùng công cụ, và dạy nó làm việc không bịa.",
        steps: {
          employee: {
            title: "AI Agent đơn giản hơn bạn nghĩ",
            intro: "Chatbot chỉ biết trả lời. Agent thì tự đi làm việc. Hãy hình dung agent là một nhân viên mới bạn vừa tuyển.",
            columns: ["Thành phần", "Một nhân viên", "Một AI Agent"],
            rows: [
              ["Bộ não", "Suy nghĩ, quyết định làm gì tiếp", "Mô hình ngôn ngữ (LLM) như GPT, Claude"],
              ["Bản mô tả công việc", "Được giao nhiệm vụ gì, giới hạn ở đâu", "Câu lệnh hệ thống (system prompt)"],
              ["Đôi tay", "Máy tính, điện thoại, sổ sách để làm việc", "Công cụ: gọi API, tìm kiếm, gửi email, đọc tệp"],
              ["Sổ tay", "Ghi lại việc đã làm, khách đã gặp", "Bộ nhớ: lưu lịch sử và dữ liệu cần dùng lại"],
              ["Cách làm việc", "Xem tình hình → nghĩ → làm → kiểm tra kết quả", "Vòng lặp: quan sát → suy luận → hành động → xem kết quả"],
            ],
            oneLiner: "Chatbot chỉ trả lời, còn Agent là một bộ não có tay chân và sổ tay để tự đi làm việc.",
          },
          hands: {
            title: "Cho agent đôi tay: API đơn giản như gọi món",
            intro: "Để agent đặt lịch, tra thời tiết hay gửi email, nó phải nói chuyện được với các dịch vụ khác. Cách nói chuyện đó gọi là API.",
            columns: ["Thành phần", "Ở nhà hàng", "Với API"],
            rows: [
              ["API", "Thực đơn: ghi rõ gọi được món gì", "Danh sách những việc dịch vụ cho phép bạn nhờ"],
              ["Yêu cầu", "Bạn gọi món với người phục vụ", "Agent gửi một yêu cầu tới dịch vụ"],
              ["JSON", "Tờ hoá đơn ghi rõ từng món", "Dữ liệu trả về, viết theo khuôn máy đọc được"],
              ["Khoá API", "Thẻ thành viên để được phục vụ", "Mã bí mật chứng minh agent được phép dùng dịch vụ"],
            ],
            oneLiner: "API là thực đơn của một dịch vụ: agent gọi đúng món thì dịch vụ mang ra đúng thứ.",
          },
          steps: {
            title: "Dạy agent làm từng bước và không bịa",
            intro: "Một nhân viên mới làm tốt khi có quy trình rõ ràng. Agent cũng vậy - và vì nó hay tự tin bịa, quy trình còn phải có bước kiểm tra.",
            columns: ["Nguyên tắc", "Với nhân viên mới", "Với agent"],
            rows: [
              ["Mô tả bài toán", "Nói kết quả cần đạt, không cầm tay chỉ việc", "Nêu mục tiêu và tiêu chí xong việc"],
              ["Chia nhỏ", "Làm xong bước một rồi báo cáo", "Bắt nó lập kế hoạch và làm từng bước"],
              ["Không đoán bừa", "\"Không chắc thì hỏi lại\"", "Cho phép nó nói \"không biết\", kiểm tra thứ nó viện dẫn"],
            ],
            oneLiner: "Agent giỏi nhờ quy trình: mục tiêu rõ, làm từng bước, không chắc thì dừng lại hỏi.",
          },
          reflexes: {
            title: "Cho agent phản xạ: tự làm khi có chuyện xảy ra",
            intro: "Agent tốt không chờ bạn nhắc. Có đơn hàng mới, có email tới - nó tự bắt tay vào việc, và biết xử lý khi mọi thứ trục trặc.",
            columns: ["Thành phần", "Trong đời thật", "Với agent"],
            rows: [
              ["Webhook", "Chuông cửa: có người tới thì reo", "Dịch vụ khác tự báo cho agent khi có chuyện mới"],
              ["Thử lại", "Gọi không ai nghe thì lát gọi lại", "Lỗi tạm thời thì chờ một chút rồi thử lại"],
              ["Xử lý lỗi", "Kế hoạch B khi nhà cung cấp hết hàng", "Dịch vụ ngoài hỏng thì agent vẫn không làm hỏng việc"],
              ["Ranh giới", "Nhân viên mới không được ký hợp đồng lớn", "Việc quan trọng phải có người duyệt trước"],
            ],
            oneLiner: "Webhook là chuông cửa của agent: có chuyện xảy ra thì nó tự đứng dậy làm việc.",
          },
        },
      },
      "ai-marketing": {
        need: "Tôi muốn làm marketing với AI",
        title: "Marketing với AI",
        promise: "Dùng AI để viết nội dung, hiểu khách hàng, và đo xem cái gì thật sự hiệu quả.",
        steps: {
          cafe: {
            title: "Marketing với AI đơn giản hơn bạn nghĩ",
            intro: "Hãy tưởng tượng bạn mở một quán cà phê. Marketing là làm sao để người đi qua dừng lại, bước vào, và quay lại lần sau.",
            columns: ["Thành phần", "Ở quán cà phê", "Khi làm với AI"],
            rows: [
              ["Nội dung", "Biển hiệu, tờ rơi, thực đơn", "AI viết nháp bài đăng, tiêu đề, email trong vài giây"],
              ["Khách hàng", "Người đi ngang qua cửa quán", "AI giúp phác hoạ chân dung khách: họ là ai, cần gì"],
              ["Dữ liệu", "Sổ ghi khách quen và món họ hay gọi", "Số liệu lượt xem, lượt bấm, đơn hàng"],
              ["Thử nghiệm", "Đổi biển hiệu xem khách có vào nhiều hơn", "Thử hai phiên bản quảng cáo, giữ bản hiệu quả hơn"],
            ],
            oneLiner: "AI viết biển hiệu nhanh hơn, còn dữ liệu cho bạn biết biển nào khách thật sự dừng lại xem.",
          },
          measure: {
            title: "Đo xem cái gì hiệu quả - đừng đoán",
            intro: "Quán đông hay vắng, bạn nhìn là biết. Trên mạng thì không - bạn phải đếm. Và đếm đúng thứ quan trọng hơn đếm thật nhiều thứ.",
            columns: ["Câu hỏi", "Ở quán cà phê", "Trên mạng"],
            rows: [
              ["Có ai cần không?", "Mở quán ở nơi không ai uống cà phê", "Làm sản phẩm rất tốt mà không ai cần"],
              ["Nhìn ở đâu?", "Sổ doanh thu cuối ngày", "Bảng số liệu (dashboard) - chỉ giữ vài con số đáng xem"],
              ["Giữ gì của khách?", "Số điện thoại khách quen, có xin phép", "Dữ liệu người dùng: chỉ thu thứ cần, giữ cẩn thận"],
            ],
            oneLiner: "Marketing giỏi không phải nói to nhất, mà là đếm đúng xem khách thật sự phản ứng với điều gì.",
          },
        },
      },
    },
  },
};

export const learningFlowsEn: typeof learningFlowsVi = {
  learningFlows: {
    metaTitle: "Learn by goal | Self-Taught Tech Daily",
    metaDescription:
      "Want to build a website, work faster with AI, create an AI agent or do marketing with AI? Pick what you want to do - every chapter is explained with everyday examples.",
    brand: "Self-Taught Tech",
    navLearn: "Start learning",
    eyebrow: "Learn by goal",
    title: "What do you want to be able to do?",
    sub: "You do not need to know what tech is. Pick something you want to do - every chapter starts with an everyday example, and you get to try it before any theory.",

    journeyTitle: "Learning, the way you learn guitar",
    journeySub: "Nobody starts guitar with harmony theory. You hear a great song, try a few chords, and realise: I can do this. Same here.",
    journeySteps: ["See it", "Love it", "Try it", "I can do it!", "Practise more", "Get better", "Passion"],

    statusReady: "Complete",
    statusPartial: "Growing",
    statusSoon: "Coming soon",
    lessonCount: "{count} lessons · about {minutes} min",
    stepCount: "{count} chapters",
    openFlow: "See the journey",
    backToAll: "All goals",
    allTracks: "Or follow the full learning path",

    firstWinTitle: "Try it now - no study needed",
    firstWinSub: "The first lesson is short and easy. Finish it and you are past the hardest part: starting.",
    firstWinCta: "Take the first lesson",

    stepLabel: "Chapter {n}",
    feynmanBadge: "Feynman mode",
    feynmanHint: "Explained as if to a 10-year-old",
    oneLinerLabel: "In one sentence",
    lessonsHeading: "Go deeper in this chapter",
    minutes: "{minutes} min",

    partialNote: "The foundation lessons are all here. An end-to-end lesson on building a complete agent is being written.",
    soonNote: "Marketing-specific chapters are being written. Meanwhile, the lessons below are ready to use.",

    branchesTitle: "Once you know you can do it: choose your direction",
    branchesSub: "A good guitarist eventually goes one of two ways - building guitars, or performing. It depends on taste and temperament, and both start by trying.",
    deepenTitle: "Craftsman - go deeper",
    deepenBody: "You are curious how it works inside. Like a luthier studying wood, strings and resonance.",
    buildTitle: "Performer - build things",
    buildBody: "You want to use it to make something other people use. Like a musician going on stage.",
    branchCta: "Start with this lesson",

    homeEyebrow: "Learn by goal",
    homeTitle: "Start from what you want to do",
    homeSub: "Not from a subject. Pick a goal - every chapter is explained with an everyday example, a comparison table, and a one-sentence summary.",
    homeAll: "See all goals",

    goalCard: {
      pickTitle: "What do you want to be able to do?",
      pickSub: "Pick one - we'll take you through exactly the lessons that goal needs, starting with the easiest.",
      yourGoal: "Your journey",
      progress: "{done}/{total} lessons",
      stepNow: "On chapter {n}",
      nextLabel: "Next lesson",
      nextCta: "Continue",
      finished: "You've finished this journey. Now choose a direction: go deeper, or build things.",
      seeFlow: "See the whole journey",
      change: "Change goal",
      saveFailed: "Couldn't save your choice. Please try again.",
    },
    demo: {
      title: "Try it: switch each part of the house on and off",
      sub: "Type your name below, then toggle CSS and JavaScript. You are editing a real web page.",
      nameLabel: "Owner's name",
      defaultName: "You",
      toggleHtml: "HTML - the frame",
      toggleCss: "CSS - paint and decor",
      toggleJs: "JavaScript - wiring and doorbell",
      htmlAlways: "Always on: no frame, no house.",
      iframeTitle: "Preview of the house web page",
      houseHeading: "{name}'s house",
      houseIntro: "Welcome to my first web page.",
      rooms: ["Living room", "Kitchen", "Bedroom"],
      bellButton: "Ring the bell",
      bellRung: "Ding dong! Someone's here 🔔",
      bellSilent: "The bell isn't wired yet…",
      lightButton: "Lights on / off",
      tryHint: "Turn off CSS: the house still stands, it just loses its paint. Turn off JavaScript: still pretty, but the bell won't ring.",
      win: "You just edited a web page. Really - that is the whole idea of this chapter.",
    },

    flows: {
      website: {
        need: "I want to make a website",
        title: "Build a website",
        promise: "From zero to a website of your own that anyone can open.",
        steps: {
          house: {
            title: "Making a website is simpler than you think",
            intro: "Picture a website as a house. Every site you have ever opened - Facebook, online shops, news sites - is built from exactly three things.",
            columns: ["Part", "In the house", "On the website"],
            rows: [
              ["HTML", "The frame: how many floors, where the living room, kitchen and doors are", "Headings, paragraphs, images, buttons, input boxes"],
              ["CSS", "Decoration: paint colour, curtains, furniture", "Colours, font sizes, effects, fitting both laptop and phone"],
              ["JavaScript", "Utilities: light switches, the doorbell", "Press a button and something happens: open a menu, send a form, show a message"],
            ],
            oneLiner: "HTML makes what you see, CSS makes it look good, and JavaScript makes it work.",
          },
          rooms: {
            title: "Arranging the rooms: layout is easier than moving furniture",
            intro: "The frame is up; now the furniture. Laying out a page is deciding where each thing goes and how far apart.",
            columns: ["Part", "In the house", "On the website"],
            rows: [
              ["Box model", "Every piece of furniture has a size and needs space around it", "Every element has a width, margin, border and padding"],
              ["Flexbox", "Lining things up on a shelf, spaced evenly", "Putting buttons or cards in a row or a column"],
              ["Grid", "A floor plan split into squares: this one's the kitchen, that one's a bedroom", "Splitting the page into rows and columns"],
              ["Responsive", "A house that stretches or shrinks to fit the plot", "A page that rearranges itself on a phone"],
            ],
            oneLiner: "Layout is arranging furniture: every piece has a size, and you choose rows or a grid.",
          },
          switches: {
            title: "Wiring the switches and doorbell: JavaScript isn't scary",
            intro: "A beautiful house with no electricity is just for looking at. JavaScript is the wiring: someone presses something, and something happens.",
            columns: ["Part", "In the house", "On the website"],
            rows: [
              ["Variable", "A labelled box you keep things in", "A place to store a value: a username, the number of items in a cart"],
              ["Function", "A switch: one press and a whole row of lights comes on", "A group of steps wrapped up and run by calling one name"],
              ["Event", "The doorbell: it only rings when someone presses it", "Waiting for the user to click, type or scroll, then reacting"],
              ["Form", "The letterbox by the door: visitors leave a note", "Input boxes where users send you information"],
            ],
            oneLiner: "JavaScript is the wiring: someone presses something and the page does something.",
          },
          "open-door": {
            title: "Opening the door to guests: putting your site online",
            intro: "The house is finished but it is sitting on your computer - nobody can visit. Going online is building the house on a plot with a real address.",
            columns: ["Part", "In real life", "On the internet"],
            rows: [
              ["Hosting", "The plot of land the house sits on", "A server running day and night, holding your site's files"],
              ["Domain", "The house number and street", "An easy address like yourname.com"],
              ["DNS", "The directory that turns an address into a location", "The system that turns a domain into a server address"],
              ["HTTPS", "A door lock and a sealed envelope", "Encryption so nobody can read the data on its way"],
            ],
            oneLiner: "Hosting is the plot, the domain is the house number, and HTTPS is the lock.",
          },
        },
      },
      "ai-assistant": {
        need: "I want AI to work alongside me",
        title: "Work faster with AI",
        promise: "Know what to hand to AI, how to hand it over, and how to check the result.",
        steps: {
          intern: {
            title: "AI is like a super-fast intern",
            intro: "Picture ChatGPT or Claude as an intern who has read almost every book in the library. Very fast, very capable - and on their first day.",
            columns: ["Trait", "An intern", "An AI assistant"],
            rows: [
              ["Knowledge", "Has read a lot, but knows nothing about your company", "Knows a lot in general, nothing about your situation unless you say"],
              ["Speed", "Drafts something in a few minutes", "Drafts something in a few seconds"],
              ["Weakness", "Shy to ask, sometimes guesses just to get it done", "Answers confidently even when it doesn't know - it makes things up"],
              ["Using it well", "Give a clear task, review before it goes to the boss", "Describe the task clearly, check before you use it"],
            ],
            oneLiner: "AI is an intern who has read the whole library: brief it clearly, and always check its work.",
          },
          brief: {
            title: "Briefing AI is as easy as writing a sticky note",
            intro: "A prompt is just a task brief. The clearer the brief, the closer the result - exactly like asking a real person.",
            columns: ["Part of the brief", "Asking a person", "Asking AI"],
            rows: [
              ["Context", "\"I'm running next week's workshop…\"", "Who you are, what you're doing, who will read it"],
              ["The task", "\"Could you write the invitation?\"", "Say the result you want, not how to get there"],
              ["Format", "\"Keep it short, about five lines\"", "Length, tone, table or bullet points"],
              ["An example", "\"Like the one we sent last year\"", "Paste a sample you like so it can copy the style"],
            ],
            oneLiner: "Write a prompt like a brief for a new hire: context, task, format, example.",
          },
          verify: {
            title: "Check before you trust: the habit of good AI users",
            intro: "However good an intern is, their work still goes past you. Even more so with AI, because it is wrong in the same confident voice.",
            columns: ["Habit", "With an intern", "With AI"],
            rows: [
              ["Ask for sources", "\"Where did this number come from?\"", "Ask for sources, then open them yourself"],
              ["Step by step", "Approve the outline before the full draft", "Make it show each step so you can spot the mistake"],
              ["Keep secrets", "Don't hand a new hire your passwords", "Don't paste customer data or passwords into the chat"],
            ],
            oneLiner: "AI answers fast; deciding what is right is still your job.",
          },
          daily: {
            title: "Make AI a daily habit",
            intro: "Using it once is fun. Using it daily is what changes things - like ten minutes of guitar a day beats three hours once.",
            columns: ["Task", "On your own", "With AI"],
            rows: [
              ["Writing a document", "An afternoon", "Ten minutes of draft, twenty of editing"],
              ["Summarising a long document", "Read it all and take notes", "Ask for a summary, then read the important part closely"],
              ["Prompt library", "Think it up from scratch every time", "Save good prompts and reuse them"],
            ],
            oneLiner: "Save your good prompts, and hand AI one small task every day.",
          },
        },
      },
      "ai-agent": {
        need: "I want to create an AI agent",
        title: "Build an AI agent",
        promise: "Understand what an agent is, give it tools, and teach it to work without making things up.",
        steps: {
          employee: {
            title: "An AI agent is simpler than you think",
            intro: "A chatbot only answers. An agent goes and does the work. Picture an agent as a new employee you just hired.",
            columns: ["Part", "An employee", "An AI agent"],
            rows: [
              ["Brain", "Thinks and decides what to do next", "A language model (LLM) such as GPT or Claude"],
              ["Job description", "What they are asked to do, and where the limits are", "The system prompt"],
              ["Hands", "A computer, phone and files to work with", "Tools: calling APIs, searching, sending email, reading files"],
              ["Notebook", "Notes on what was done and who was met", "Memory: history and data it needs again"],
              ["Way of working", "Look at the situation → think → act → check the result", "A loop: observe → reason → act → check the result"],
            ],
            oneLiner: "A chatbot only answers; an agent is a brain with hands and a notebook that goes and does the work.",
          },
          hands: {
            title: "Giving the agent hands: an API is as simple as ordering food",
            intro: "To book a meeting, check the weather or send an email, an agent has to talk to other services. That way of talking is called an API.",
            columns: ["Part", "At a restaurant", "With an API"],
            rows: [
              ["API", "The menu: what you are allowed to order", "The list of things a service lets you ask for"],
              ["Request", "You order from the waiter", "The agent sends a request to the service"],
              ["JSON", "The receipt listing every item", "The data that comes back, in a shape machines can read"],
              ["API key", "A membership card to get served", "A secret code proving the agent may use the service"],
            ],
            oneLiner: "An API is a service's menu: order the right dish and the service brings the right thing.",
          },
          steps: {
            title: "Teaching the agent to work step by step, without making things up",
            intro: "A new employee does well with a clear process. So does an agent - and because it confidently invents things, the process needs a check.",
            columns: ["Principle", "With a new employee", "With an agent"],
            rows: [
              ["Describe the problem", "State the outcome, don't micromanage", "Give the goal and what counts as done"],
              ["Break it down", "Finish step one, then report", "Make it plan first and work one step at a time"],
              ["No guessing", "\"If you're not sure, ask\"", "Let it say \"I don't know\"; check what it cites"],
            ],
            oneLiner: "A good agent runs on process: a clear goal, one step at a time, and stop to ask when unsure.",
          },
          reflexes: {
            title: "Giving the agent reflexes: acting when something happens",
            intro: "A good agent doesn't wait to be told. A new order, a new email - it gets to work on its own, and copes when things go wrong.",
            columns: ["Part", "In real life", "With an agent"],
            rows: [
              ["Webhook", "A doorbell: it rings when someone arrives", "Another service tells the agent when something new happens"],
              ["Retry", "No answer? Call again in a bit", "On a temporary error, wait a moment and try again"],
              ["Error handling", "A plan B when a supplier runs out", "If an outside service breaks, the agent doesn't break the job"],
              ["Boundaries", "A new hire can't sign big contracts", "Important actions need a human to approve first"],
            ],
            oneLiner: "A webhook is the agent's doorbell: when something happens, it gets up and goes to work.",
          },
        },
      },
      "ai-marketing": {
        need: "I want to do marketing with AI",
        title: "Marketing with AI",
        promise: "Use AI to write content, understand customers, and measure what actually works.",
        steps: {
          cafe: {
            title: "Marketing with AI is simpler than you think",
            intro: "Imagine you open a coffee shop. Marketing is getting passers-by to stop, come in, and come back next time.",
            columns: ["Part", "At the coffee shop", "With AI"],
            rows: [
              ["Content", "The sign, flyers, the menu", "AI drafts posts, headlines and emails in seconds"],
              ["Customers", "People walking past the door", "AI helps sketch who your customers are and what they need"],
              ["Data", "A notebook of regulars and what they order", "Numbers on views, clicks and orders"],
              ["Experiments", "Change the sign and see if more people come in", "Try two versions of an ad, keep the one that works better"],
            ],
            oneLiner: "AI writes the sign faster; data tells you which sign people actually stop to read.",
          },
          measure: {
            title: "Measure what works - don't guess",
            intro: "Whether the coffee shop is busy, you can see. Online you can't - you have to count. And counting the right thing beats counting lots of things.",
            columns: ["Question", "At the coffee shop", "Online"],
            rows: [
              ["Does anyone need it?", "Opening a coffee shop where nobody drinks coffee", "Building a great product nobody needs"],
              ["Where do you look?", "The till report at the end of the day", "A dashboard - keeping only the few numbers worth watching"],
              ["What do you keep?", "Regulars' phone numbers, with their permission", "User data: collect only what you need, keep it carefully"],
            ],
            oneLiner: "Good marketing isn't shouting loudest; it's counting what customers actually respond to.",
          },
        },
      },
    },
  },
};
