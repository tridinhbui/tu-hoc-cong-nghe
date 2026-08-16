import type { Lesson } from "./lesson-types";

// Chặng 17 của track cá nhân: bất động sản Việt Nam trong thực tế.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI, VÀ VÌ SAO NÓ KHÔNG TRÙNG CHẶNG 9. Chặng 9 có phần
// lý thuyết: khoản vay mua nhà hoạt động thế nào (289), vay bao nhiêu là an
// toàn theo DTI (290), thuê hay mua (291). Chặng này bắt đầu từ chỗ đó dừng
// lại: kiểm gì trước khi đặt cọc, chi phí thật ngoài giá niêm yết, lãi thả nổi
// sau kỳ ưu đãi, và lợi suất cho thuê sau khi trừ hết.
//
// Ids 360-367 nối tiếp Chặng 16 (350-357).
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts.
//
// TỆP NÀY ĐÃ ĐƯỢC DỰNG LẠI TỪ lib/lessons-data. Một lệnh thay chuỗi sai đã xoá
// mọi dấu nháy kép trong bản gốc, và tệp chưa từng được commit nên git không có
// bản nào. Thứ tự phương án trong quiz vì thế là thứ tự SAU balanceLessonQuizzes
// chứ không phải thứ tự lúc viết - nội dung và chỉ số `correct` không đổi.

export const REAL_ESTATE_VN_LESSONS: Lesson[] = [
  {
    "id": 360,
    "slug": "phap-ly-truoc-khi-dat-coc",
    "title": "Chặng 17, Bài 1: Kiểm pháp lý trước khi đặt cọc",
    "subtitle": "Sổ đỏ trong tay người bán chưa trả lời được câu hỏi nào quan trọng",
    "duration": "8 phút",
    "difficulty": "Khó",
    "emoji": "📜",
    "track": "personal",
    "whyItMatters": "Đây là bước duy nhất trong toàn bộ giao dịch mà sai sót không sửa được bằng tiền. Một căn nhà mua hớ giá thì vẫn là căn nhà; một căn vướng pháp lý có thể mắc kẹt nhiều năm hoặc mất trắng, và phần lớn vấn đề đều kiểm ra được trước khi đặt cọc.",
    "openingQuestion": "Người bán đưa sổ đỏ bản gốc cho bạn xem. Điều đó chứng minh được gì?",
    "openingOptions": [
      "Rằng bất động sản đó không có tranh chấp và giao dịch được ngay",
      "Rằng có một giấy chứng nhận tồn tại - còn hiện trạng thì phải kiểm riêng",
      "Trên thực tế, rằng người đang cầm sổ là chủ sở hữu hợp pháp duy nhất của tài sản",
      "Rằng bất động sản đó không nằm trong khu vực bị quy hoạch giải tỏa"
    ],
    "correctOption": 1,
    "explanation": "Giấy chứng nhận cho biết tại thời điểm cấp, cơ quan có thẩm quyền đã ghi nhận quyền của ai đó với thửa đất ấy. Nó không cho biết những gì xảy ra sau đó: tài sản có đang thế chấp ở ngân hàng không, có đang tranh chấp không, có nằm trong quy hoạch không, và người đang cầm sổ có đủ thẩm quyền bán không - nhiều tài sản thuộc sở hữu chung của vợ chồng hoặc của nhiều người thừa kế, nên một chữ ký là chưa đủ. Sổ trong tay người bán cũng không chứng minh họ là chủ, vì sổ có thể đang được cầm giữ vì lý do khác. Bốn thứ ấy đều kiểm được, và chúng phải được kiểm TRƯỚC khi đặt cọc chứ không phải trước khi công chứng.",
    "diagram": [
      {
        "label": "Sổ chỉ nói: có giấy chứng nhận tồn tại",
        "arrow": true
      },
      {
        "label": "Kiểm thế chấp, tranh chấp, quy hoạch",
        "arrow": true
      },
      {
        "label": "Kiểm ai đủ thẩm quyền ký bán",
        "arrow": true
      },
      {
        "label": "Xong hết mới đặt cọc, không đặt trước"
      }
    ],
    "realWorldExample": {
      "company": "Thứ tự đảo ngược là chỗ mất tiền",
      "description": "Trình tự phổ biến trên thực tế: xem nhà, ưng, đặt cọc để giữ, rồi mới bắt đầu tìm hiểu pháp lý. Nếu phát hiện vấn đề ở bước sau, người mua đứng trước lựa chọn tệ: bỏ cọc, hoặc đi tiếp vào một giao dịch có rủi ro. Đảo lại thứ tự - kiểm trước, cọc sau - không tốn thêm đồng nào mà loại bỏ hoàn toàn tình huống ấy."
    },
    "quiz": [
      {
        "question": "Bất động sản đang được thế chấp tại ngân hàng thì sao?",
        "options": [
          "Vẫn giao dịch được nhưng phải xử lý khoản vay và giải chấp theo đúng trình tự",
          "Không thể giao dịch cho tới khi người bán trả hết nợ và rút sổ về",
          "Về nguyên tắc, giao dịch bình thường vì việc thế chấp không ảnh hưởng tới quyền sở hữu",
          "Người mua tự động kế thừa khoản vay đó cùng với quyền sở hữu tài sản"
        ],
        "correct": 0,
        "explanation": "Đây là tình huống rất phổ biến và hoàn toàn xử lý được, nhưng nó cần một trình tự cụ thể có sự tham gia của ngân hàng. Điều nguy hiểm là không biết tài sản đang thế chấp và đặt cọc như một giao dịch thông thường."
      },
      {
        "question": "Vì sao cần kiểm ai có thẩm quyền ký bán?",
        "options": [
          "Theo cách hiểu phổ biến, vì chỉ người đứng tên đầu tiên trên sổ mới được phép ký hợp đồng bán",
          "Vì tài sản có thể thuộc sở hữu chung của vợ chồng hoặc nhiều người thừa kế",
          "Vì người bán phải có hộ khẩu tại địa phương nơi có bất động sản",
          "Vì người bán cần chứng minh đã sở hữu tài sản trên năm năm liên tục"
        ],
        "correct": 1,
        "explanation": "Thiếu chữ ký của một đồng sở hữu có thể khiến giao dịch bị vô hiệu về sau, kể cả khi bạn đã trả đủ tiền và đã nhận nhà. Đây là loại rủi ro xuất hiện muộn và rất khó xử lý."
      },
      {
        "question": "Thông tin quy hoạch nên được kiểm ở đâu?",
        "options": [
          "Qua môi giới đang giới thiệu bất động sản đó cho bạn",
          "Nhiều người cho rằng trên các trang tin bất động sản có nhiều người theo dõi nhất",
          "Tại cơ quan quản lý quy hoạch của địa phương, không dựa vào lời người bán",
          "Bằng cách hỏi những hộ dân đang sinh sống xung quanh khu vực"
        ],
        "correct": 2,
        "explanation": "Hỏi hàng xóm cho biết thông tin hữu ích về khu vực nhưng không phải bằng chứng pháp lý. Môi giới có lợi ích trong việc giao dịch xảy ra, nên thông tin từ họ cần được kiểm chứng độc lập."
      },
      {
        "question": "Vì sao phải kiểm pháp lý TRƯỚC khi đặt cọc chứ không phải sau?",
        "options": [
          "Vì người bán có quyền từ chối cung cấp giấy tờ sau khi đã nhận cọc",
          "Vì cơ quan chức năng chỉ cung cấp thông tin cho người chưa đặt cọc",
          "Vì phí kiểm tra pháp lý tăng lên sau khi hợp đồng đặt cọc được ký",
          "Vì sau khi đặt cọc, phát hiện vấn đề nghĩa là bạn phải chọn giữa mất cọc và rủi ro"
        ],
        "correct": 3,
        "explanation": "Đặt cọc tạo ra áp lực tài chính đúng vào lúc bạn cần đầu óc tỉnh táo nhất. Đảo thứ tự lại không tốn thêm gì mà loại bỏ hẳn tình huống phải chọn giữa hai phương án đều tệ."
      },
      {
        "question": "Nếu người bán giục đặt cọc gấp vì có người khác đang hỏi mua thì sao?",
        "options": [
          "Đó là áp lực thời gian - dấu hiệu quen thuộc, và nó không thay đổi được rủi ro pháp lý",
          "Nên đặt cọc ngay để giữ chỗ rồi kiểm tra pháp lý song song sau đó",
          "Nên đề nghị đặt cọc một khoản nhỏ hơn để giảm thiệt hại nếu có vấn đề",
          "Nên yêu cầu người bán cam kết bằng miệng rằng pháp lý không có vấn đề gì"
        ],
        "correct": 0,
        "explanation": "Đây đúng là kỹ thuật tạo trạng thái gấp gáp mà Chặng 16 đã mô tả, và nó xuất hiện trong cả những giao dịch hoàn toàn hợp pháp. Một bất động sản mất vì chậm vài ngày rẻ hơn nhiều so với một bất động sản vướng pháp lý."
      }
    ],
    "keyTakeaways": [
      "Giấy chứng nhận chỉ nói có giấy tồn tại - thế chấp, tranh chấp, quy hoạch phải kiểm riêng",
      "Tài sản chung của vợ chồng hoặc nhiều người thừa kế cần đủ chữ ký, thiếu một là rủi ro",
      "Kiểm quy hoạch tại cơ quan có thẩm quyền, không dựa vào lời môi giới hay người bán",
      "Thứ tự đúng: kiểm xong hết rồi mới đặt cọc"
    ],
    "practicePrompt": {
      "question": "Bạn ưng một căn nhà, môi giới nói cần cọc trong hôm nay vì có khách khác. Bạn làm gì?",
      "options": [
        "Hoãn cọc cho tới khi kiểm xong pháp lý, chấp nhận khả năng mất cơ hội",
        "Đặt cọc một khoản nhỏ để giữ chỗ rồi kiểm tra pháp lý trong tuần sau",
        "Yêu cầu môi giới cung cấp giấy tờ pháp lý ngay trong buổi gặp hôm đó",
        "Đề nghị ký hợp đồng đặt cọc kèm điều khoản hoàn cọc nếu pháp lý có vấn đề"
      ],
      "correct": 0,
      "explanation": "Điều khoản hoàn cọc nghe hợp lý và nó có ích, nhưng đòi lại tiền theo một điều khoản là việc tốn thời gian và không chắc chắn. Còn giấy tờ đưa ngay trong buổi gặp thì bạn không có thời gian đối chiếu với cơ quan chức năng."
    },
    "summary": {
      "keyIdea": "Bốn thứ phải kiểm trước khi đặt cọc: thế chấp, tranh chấp, quy hoạch, thẩm quyền ký",
      "commonMistake": "Đặt cọc để giữ chỗ rồi mới tìm hiểu pháp lý - đảo ngược đúng thứ tự quan trọng nhất",
      "action": "Lập danh sách bốn mục cần kiểm và không đặt cọc cho tới khi cả bốn đều xong."
    },
    "application": {
      "title": "Bốn ô phải tích trước khi cọc",
      "message": "Tài sản có đang thế chấp không. Có tranh chấp không. Quy hoạch thế nào. Ai đủ thẩm quyền ký bán. Bốn câu này kiểm được ở cơ quan có thẩm quyền, và chúng quyết định giao dịch có an toàn hay không.",
      "secondary": "Với giao dịch lớn nhất đời người, chi phí thuê một người có chuyên môn kiểm giúp là khoản nhỏ nhất trong toàn bộ thương vụ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng 9 đã dạy khoản vay mua nhà hoạt động thế nào và vay bao nhiêu là an toàn. Chặng này bắt đầu từ chỗ đó dừng lại - và bước đầu tiên là bước duy nhất mà sai sót không sửa được bằng tiền."
      },
      {
        "type": "heading",
        "text": "Giấy chứng nhận trả lời được gì và không trả lời được gì"
      },
      {
        "type": "paragraph",
        "text": "Nó cho biết tại thời điểm cấp, quyền với thửa đất ấy đã được ghi nhận cho ai. Mọi thứ xảy ra sau đó nằm ngoài tờ giấy: khoản vay được thế chấp bằng chính tài sản này, một tranh chấp thừa kế trong gia đình, một đồ án quy hoạch mới, hay đơn giản là người đang cầm sổ không phải người có quyền bán. Bốn khoảng trống ấy đều lấp được, và chúng phải được lấp trước khi có tiền đổi tay."
      },
      {
        "type": "conceptTable",
        "title": "Bốn thứ phải kiểm, và kiểm ở đâu",
        "subtitle": "Không cái nào đọc ra được từ chính tờ giấy chứng nhận",
        "concepts": [
          {
            "vi": "Thế chấp",
            "en": "Mortgage status",
            "def": "Tài sản đang được dùng bảo đảm cho khoản vay nào không. Rất phổ biến và xử lý được, nhưng phải theo đúng trình tự có ngân hàng tham gia."
          },
          {
            "vi": "Tranh chấp",
            "en": "Disputes",
            "def": "Tranh chấp ranh giới, thừa kế, hoặc khiếu kiện đang diễn ra. Kiểm tại cơ quan quản lý đất đai địa phương."
          },
          {
            "vi": "Quy hoạch",
            "en": "Zoning",
            "def": "Có nằm trong diện quy hoạch, mở đường, giải tỏa không. Chỉ thông tin từ cơ quan có thẩm quyền mới dùng được."
          },
          {
            "vi": "Thẩm quyền ký",
            "en": "Authority to sell",
            "def": "Tài sản chung vợ chồng, đồng thừa kế, hay ủy quyền. Thiếu một chữ ký có thể làm giao dịch vô hiệu về sau."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Áp lực thời gian xuất hiện cả trong giao dịch hợp pháp",
        "text": "Câu có khách khác đang hỏi mua là thật trong nhiều trường hợp, và cũng là câu được dùng khi có vấn đề cần giấu. Bạn không phân biệt được hai trường hợp, nên quy tắc phải giống nhau ở cả hai: không đặt cọc trước khi kiểm xong. Mất một cơ hội mua nhà là chuyện có thể chịu được; mua một tài sản vướng pháp lý thì không."
      },
      {
        "type": "closing",
        "lines": [
          "Đây là bước rẻ nhất trong cả thương vụ và cũng là bước duy nhất không có cơ hội làm lại.",
          "Bài sau: hợp đồng đặt cọc - vì sao nó ràng buộc hơn nhiều người tưởng."
        ]
      }
    ]
  },
  {
    "id": 361,
    "slug": "hop-dong-dat-coc-va-phat-coc",
    "title": "Chặng 17, Bài 2: Hợp đồng đặt cọc và chuyện phạt cọc",
    "subtitle": "Ràng buộc đi cả hai chiều, và chiều nào cũng có cái giá được định sẵn",
    "duration": "7 phút",
    "difficulty": "Trung bình",
    "emoji": "✍️",
    "track": "personal",
    "whyItMatters": "Nhiều người coi đặt cọc là một thủ tục giữ chỗ có thể rút lại. Thực tế nó là một cam kết có chế tài, và chế tài ấy khác nhau tùy bên nào đổi ý - biết điều đó trước quyết định số tiền cọc nên là bao nhiêu.",
    "openingQuestion": "Bạn đặt cọc rồi đổi ý không mua nữa. Điều gì xảy ra?",
    "openingOptions": [
      "Được hoàn lại toàn bộ tiền cọc vì hợp đồng mua bán chưa được ký kết",
      "Mất khoản tiền cọc, trừ khi hợp đồng có thỏa thuận khác về việc này",
      "Được hoàn một nửa tiền cọc theo nguyên tắc chia đôi thiệt hại",
      "Phải bồi thường thêm một khoản bằng đúng giá trị của bất động sản"
    ],
    "correctOption": 1,
    "explanation": "Đặt cọc là biện pháp bảo đảm cho việc giao kết hợp đồng, nên nó có chế tài rõ ràng: bên đặt cọc từ chối thì mất cọc. Chiều ngược lại cũng có chế tài - bên nhận cọc từ chối thì phải trả lại cọc kèm một khoản tương đương, tức là họ mất một khoản bằng đúng số tiền cọc. Đây là điểm nhiều người mua không biết, và nó có ý nghĩa thực tế: nếu người bán đổi ý vì có khách trả giá cao hơn, phần bù họ phải trả cho bạn được tính bằng số tiền cọc. Cọc quá nhỏ khiến việc người bán đổi ý trở nên rẻ; cọc quá lớn thì rủi ro của bạn tăng lên. Các bên hoàn toàn có thể thỏa thuận khác trong hợp đồng, nên điều khoản mới là thứ quyết định chứ không phải mặc định.",
    "diagram": [
      {
        "label": "Bên mua đổi ý: mất cọc",
        "arrow": true
      },
      {
        "label": "Bên bán đổi ý: trả cọc kèm khoản tương đương",
        "arrow": true
      },
      {
        "label": "Cọc quá nhỏ thì người bán đổi ý rất rẻ",
        "arrow": true
      },
      {
        "label": "Điều khoản trong hợp đồng quyết định, không phải mặc định"
      }
    ],
    "realWorldExample": {
      "company": "Vì sao cọc quá nhỏ lại bất lợi cho người mua",
      "description": "Người mua đặt cọc một khoản rất nhỏ để thấy an toàn hơn. Vài tuần sau có người trả giá cao hơn đáng kể, và người bán quyết định đổi ý - phần họ phải bù cho bạn chỉ bằng khoản cọc nhỏ ấy, thấp hơn nhiều so với phần chênh lệch họ nhận thêm. Khoản cọc nhỏ đã biến cam kết của người bán thành một quyền chọn rẻ tiền."
    },
    "quiz": [
      {
        "question": "Nếu bên nhận cọc từ chối bán thì chế tài là gì?",
        "options": [
          "Trong phần lớn trường hợp, chỉ phải trả lại đúng số tiền cọc đã nhận, không phát sinh gì thêm",
          "Trả lại tiền cọc và thêm một khoản tương đương, trừ khi có thỏa thuận khác",
          "Phải bồi thường theo giá thị trường hiện tại của bất động sản đó",
          "Không phải chịu chế tài nào vì hợp đồng mua bán chưa được ký"
        ],
        "correct": 1,
        "explanation": "Chế tài đi cả hai chiều và nhiều người mua không biết vế này. Nó có ý nghĩa thực tế: nó quyết định việc người bán đổi ý tốn kém tới đâu."
      },
      {
        "question": "Số tiền cọc quá nhỏ gây bất lợi gì cho người mua?",
        "options": [
          "Theo kinh nghiệm thường gặp, nó buộc người mua phải bổ sung thêm cọc trước khi công chứng",
          "Nó khiến hợp đồng đặt cọc không có giá trị pháp lý ràng buộc",
          "Nó làm việc người bán đổi ý trở nên rẻ, nên cam kết ràng buộc yếu đi",
          "Nó làm tăng thuế và phí phải nộp khi hoàn tất giao dịch"
        ],
        "correct": 2,
        "explanation": "Vì phần bù người bán phải trả được tính theo số tiền cọc, cọc nhỏ biến cam kết của họ thành một quyền chọn rẻ. Đây là đánh đổi hai chiều chứ không phải cọc càng nhỏ càng an toàn."
      },
      {
        "question": "Điều khoản nào đáng đưa vào hợp đồng đặt cọc nhất?",
        "options": [
          "Thỏa thuận về việc bên nào chịu chi phí môi giới của giao dịch",
          "Cam kết của người bán rằng bất động sản không có vấn đề pháp lý nào",
          "Trên thực tế, quyền của người mua được kiểm tra lại hiện trạng trước khi công chứng",
          "Các trường hợp được hoàn cọc, và mốc thời gian cụ thể để hoàn tất giao dịch"
        ],
        "correct": 3,
        "explanation": "Ba điều khoản kia đều có ích. Nhưng chỉ điều khoản đầu xử lý được tình huống tệ nhất - phát hiện vấn đề sau khi đã cọc - bằng cách định trước khi nào bạn lấy lại được tiền."
      },
      {
        "question": "Vì sao vẫn nên kiểm pháp lý dù đã có điều khoản hoàn cọc?",
        "options": [
          "Vì đòi lại tiền theo một điều khoản là việc tốn thời gian và không chắc chắn",
          "Vì điều khoản hoàn cọc không có giá trị nếu chưa được công chứng",
          "Về nguyên tắc, vì cơ quan chức năng không công nhận các hợp đồng đặt cọc tư nhân",
          "Vì người bán luôn có quyền từ chối hoàn cọc theo ý muốn của họ"
        ],
        "correct": 0,
        "explanation": "Một điều khoản tốt cho bạn cơ sở để đòi, không cho bạn tiền về ngay. Khoảng cách giữa hai thứ đó có thể là nhiều tháng, nên nó là lớp dự phòng chứ không thay thế được việc kiểm trước."
      },
      {
        "question": "Tiền cọc nên được giao thế nào?",
        "options": [
          "Bằng tiền mặt để giao dịch nhanh gọn và giữ được sự riêng tư",
          "Chuyển khoản có nội dung rõ ràng để có bằng chứng về khoản đã giao",
          "Qua môi giới để họ giữ hộ cho tới khi hai bên hoàn tất thủ tục",
          "Chia thành nhiều lần nhỏ để giảm rủi ro nếu có vấn đề phát sinh"
        ],
        "correct": 1,
        "explanation": "Giao qua môi giới đưa thêm một bên trung gian vào giữa mà không thêm bảo đảm nào. Chứng cứ về việc đã giao tiền là thứ quan trọng nhất nếu về sau có tranh chấp."
      }
    ],
    "keyTakeaways": [
      "Đặt cọc là cam kết có chế tài, không phải thủ tục giữ chỗ rút lại được",
      "Bên mua đổi ý mất cọc; bên bán đổi ý trả cọc kèm một khoản tương đương",
      "Cọc quá nhỏ biến cam kết của người bán thành một quyền chọn rẻ tiền",
      "Điều khoản trong hợp đồng quyết định - mặc định pháp luật chỉ áp khi không thỏa thuận khác"
    ],
    "practicePrompt": {
      "question": "Người bán đề nghị nhận cọc bằng tiền mặt, không lập hợp đồng, chỉ viết giấy tay. Bạn nên làm gì?",
      "options": [
        "Đề nghị lập hợp đồng đặt cọc rõ điều khoản và chuyển khoản có nội dung",
        "Đồng ý vì giấy viết tay có chữ ký hai bên vẫn có giá trị pháp lý",
        "Đồng ý nhưng quay video lại toàn bộ quá trình giao tiền làm bằng chứng",
        "Giảm số tiền cọc xuống mức thấp nhất có thể để hạn chế rủi ro"
      ],
      "correct": 0,
      "explanation": "Giấy viết tay có giá trị nhưng nó thường thiếu đúng những điều khoản quan trọng nhất: khi nào hoàn cọc, mốc hoàn tất, xử lý ra sao nếu phát hiện vấn đề pháp lý. Video chứng minh việc giao tiền chứ không tạo ra thỏa thuận nào."
    },
    "summary": {
      "keyIdea": "Đặt cọc ràng buộc cả hai bên, và số tiền cọc quyết định cam kết ấy chặt tới đâu",
      "commonMistake": "Coi cọc là khoản giữ chỗ rút lại được, và chọn cọc thật nhỏ vì tưởng như vậy an toàn hơn",
      "action": "Trước khi cọc, đọc kỹ điều khoản hoàn cọc và mốc thời gian hoàn tất giao dịch."
    },
    "application": {
      "title": "Ba điều khoản cần có",
      "message": "Các trường hợp được hoàn cọc, mốc thời gian hoàn tất giao dịch, và cách xử lý nếu phát hiện vấn đề pháp lý. Thiếu ba điều này thì hợp đồng đặt cọc chỉ bảo vệ được một bên.",
      "secondary": "Luôn chuyển khoản với nội dung ghi rõ mục đích. Bằng chứng về khoản đã giao là thứ đầu tiên cần tới nếu có tranh chấp."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài trước nói phải kiểm xong pháp lý rồi mới cọc. Bài này nói về chính cái cọc ấy - và vì sao nó ràng buộc hơn nhiều so với cảm giác của một khoản giữ chỗ."
      },
      {
        "type": "heading",
        "text": "Chế tài đi cả hai chiều"
      },
      {
        "type": "paragraph",
        "text": "Người mua thường chỉ biết vế của mình: đổi ý thì mất cọc. Vế còn lại ít được nhắc tới nhưng quan trọng không kém - nếu người bán từ chối bán, họ phải trả lại cọc kèm một khoản tương đương. Nghĩa là số tiền cọc chính là thước đo mức độ ràng buộc của cả hai bên, và nó nên được chọn có cân nhắc chứ không phải chọn thật nhỏ cho an toàn."
      },
      {
        "type": "conceptTable",
        "title": "Cọc nhỏ và cọc lớn, mỗi bên một rủi ro",
        "subtitle": "Không có mức nào an toàn tuyệt đối - đây là đánh đổi hai chiều",
        "concepts": [
          {
            "vi": "Cọc quá nhỏ",
            "en": "Too small",
            "def": "Người bán đổi ý rất rẻ. Khi có khách trả cao hơn, phần họ phải bù cho bạn nhỏ hơn phần chênh họ nhận thêm."
          },
          {
            "vi": "Cọc quá lớn",
            "en": "Too large",
            "def": "Rủi ro của bạn tăng theo. Nếu phát hiện vấn đề sau khi cọc, khoản có thể mất lớn hơn hẳn."
          },
          {
            "vi": "Điều khoản hoàn cọc",
            "en": "Refund clause",
            "def": "Quan trọng hơn cả con số. Nó định trước tình huống nào bạn lấy lại được tiền, thay vì để mọi thứ phụ thuộc thiện chí."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Điều khoản là lớp dự phòng, không thay thế việc kiểm trước",
        "text": "Một điều khoản hoàn cọc tốt cho bạn cơ sở để đòi lại tiền - nó không cho bạn tiền về ngay. Khoảng cách giữa có cơ sở và nhận được có thể là nhiều tháng thương lượng hoặc hơn thế. Nên thứ tự của bài trước vẫn giữ nguyên: kiểm xong rồi mới cọc, và điều khoản chỉ để phòng trường hợp còn sót."
      },
      {
        "type": "closing",
        "lines": [
          "Cọc không phải chỗ giữ chân người bán, nó là chỗ hai bên định giá trước cho việc đổi ý.",
          "Bài sau: ngoài giá mua, bạn còn phải chuẩn bị bao nhiêu nữa."
        ]
      }
    ]
  },
  {
    "id": 362,
    "slug": "chi-phi-that-khi-mua-nha",
    "title": "Chặng 17, Bài 3: Chi phí thật khi mua nhà",
    "subtitle": "Giá niêm yết không phải số tiền bạn cần chuẩn bị",
    "duration": "7 phút",
    "difficulty": "Trung bình",
    "emoji": "🧾",
    "track": "personal",
    "whyItMatters": "Người mua thường tính đủ tiền cho giá nhà và khoản vay, rồi phát hiện thiếu vào đúng lúc phải hoàn tất thủ tục. Các khoản kèm theo không lớn so với giá nhà nhưng chúng đến cùng lúc, và chúng thường là phần đẩy người mua vào cảnh vay thêm gấp.",
    "openingQuestion": "Ngoài giá mua, khoản nào chắc chắn phát sinh trong một giao dịch nhà đất?",
    "openingOptions": [
      "Lệ phí trước bạ, thuế thu nhập từ chuyển nhượng, phí công chứng và các lệ phí hồ sơ",
      "Chỉ có phí công chứng, các khoản còn lại do bên bán chịu toàn bộ",
      "Chỉ có phí môi giới nếu giao dịch được thực hiện qua trung gian",
      "Không có khoản nào bắt buộc, mọi chi phí đều do hai bên tự thỏa thuận"
    ],
    "correctOption": 0,
    "explanation": "Một giao dịch chuyển nhượng bất động sản luôn kéo theo một nhóm khoản bắt buộc: lệ phí trước bạ tính trên giá trị tài sản, thuế thu nhập cá nhân từ chuyển nhượng, phí công chứng hợp đồng, và các lệ phí hồ sơ đăng ký biến động. Việc bên nào chịu khoản nào là do hai bên thỏa thuận - trên thực tế người mua thường gánh phần lớn - nhưng bản thân các khoản ấy thì không thỏa thuận bỏ được. Cộng thêm chi phí không bắt buộc mà gần như luôn có: môi giới, sửa chữa ban đầu, chuyển nhà, và nội thất cơ bản. Người tính đủ tiền cho đúng giá nhà sẽ thiếu ở bước cuối.",
    "diagram": [
      {
        "label": "Giá mua",
        "arrow": true
      },
      {
        "label": "Cộng nhóm thuế phí bắt buộc",
        "arrow": true
      },
      {
        "label": "Cộng môi giới, sửa chữa, chuyển nhà",
        "arrow": true
      },
      {
        "label": "Đó mới là số tiền cần chuẩn bị"
      }
    ],
    "realWorldExample": {
      "company": "Thiếu ở bước cuối",
      "description": "Một cặp vợ chồng tính vừa đủ: tiền tích lũy cộng khoản vay bằng đúng giá nhà. Tới khi làm thủ tục, nhóm thuế phí và các khoản sửa chữa tối thiểu để dọn vào ở cộng lại thành một con số không nhỏ, và họ phải vay tiêu dùng lãi cao để bù. Khoản vay ấy đắt hơn nhiều so với khoản vay mua nhà, và nó phát sinh chỉ vì phép tính ban đầu dừng ở giá niêm yết."
    },
    "quiz": [
      {
        "question": "Việc bên nào chịu thuế phí được quyết định thế nào?",
        "options": [
          "Theo quy định cứng, người mua chịu toàn bộ trong mọi trường hợp",
          "Theo quy định cứng, người bán chịu toàn bộ và không thay đổi được",
          "Do hai bên thỏa thuận, nhưng bản thân các khoản đó thì không bỏ được",
          "Do cơ quan công chứng quyết định dựa trên giá trị giao dịch"
        ],
        "correct": 2,
        "explanation": "Đây là điểm cần đưa vào thương lượng giá ngay từ đầu chứ không để tới lúc làm thủ tục. Trên thực tế người mua thường gánh phần lớn, nên nó nên được tính vào tổng chi phí ngay khi so sánh các bất động sản."
      },
      {
        "question": "Vì sao thiếu tiền ở bước cuối lại đặc biệt tốn kém?",
        "options": [
          "Vì ngân hàng sẽ tăng lãi suất khoản vay nếu hồ sơ bị kéo dài",
          "Vì giao dịch sẽ bị hủy và người mua mất toàn bộ tiền cọc đã đặt",
          "Theo cách hiểu phổ biến, vì cơ quan thuế tính thêm tiền chậm nộp trên các khoản còn thiếu",
          "Vì người mua thường phải vay tiêu dùng lãi cao hơn hẳn khoản vay mua nhà"
        ],
        "correct": 3,
        "explanation": "Khoản vay mua nhà có tài sản bảo đảm nên lãi thấp hơn nhiều so với vay tiêu dùng. Thiếu vài chục triệu ở bước cuối thường được bù bằng loại vay đắt nhất, và nó kéo dài nhiều năm sau đó."
      },
      {
        "question": "Khoản nào dễ bị bỏ sót nhất khi lập ngân sách mua nhà?",
        "options": [
          "Chi phí sửa chữa và nội thất tối thiểu để có thể dọn vào ở được",
          "Giá mua bất động sản đã được thỏa thuận giữa hai bên",
          "Số tiền vay được ngân hàng phê duyệt theo hồ sơ tín dụng",
          "Nhiều người cho rằng khoản tiền tích lũy sẵn có của gia đình dành cho việc mua nhà"
        ],
        "correct": 0,
        "explanation": "Ba khoản kia đều là con số lớn nên không ai quên. Chi phí để căn nhà dùng được thì rải ra thành nhiều khoản nhỏ và thường chỉ hiện ra sau khi nhận nhà."
      },
      {
        "question": "Nên xử lý nhóm chi phí này thế nào khi so sánh hai bất động sản?",
        "options": [
          "So bằng giá niêm yết vì thuế phí tỷ lệ như nhau ở mọi bất động sản",
          "Quy tất cả về tổng chi phí sở hữu thay vì so bằng giá niêm yết",
          "Bỏ qua vì các khoản này nhỏ so với giá trị của bất động sản",
          "Chỉ tính khi hai bất động sản có mức giá chênh lệch dưới mười phần trăm"
        ],
        "correct": 1,
        "explanation": "Hai căn cùng giá có thể chênh nhau đáng kể ở phần thỏa thuận ai chịu thuế phí, ở tình trạng cần sửa chữa, và ở phí quản lý hằng tháng nếu là chung cư. Chỉ tổng chi phí mới so được."
      },
      {
        "question": "Nên chuẩn bị khoản dự phòng bao nhiêu ngoài các khoản đã tính?",
        "options": [
          "Đúng bằng số tiền cọc để phòng trường hợp giao dịch không thành",
          "Trong phần lớn trường hợp, không cần vì các khoản thuế phí đều tính chính xác được từ trước",
          "Một khoản đệm cho phát sinh, vì gần như mọi giao dịch đều có việc không lường trước",
          "Bằng ba tháng lương theo nguyên tắc chung của quỹ khẩn cấp"
        ],
        "correct": 2,
        "explanation": "Quỹ khẩn cấp là khoản riêng và không nên bị tiêu vào việc mua nhà - đó chính là lý do cần một khoản đệm riêng cho giao dịch này."
      }
    ],
    "keyTakeaways": [
      "Nhóm thuế phí bắt buộc luôn phát sinh; chỉ việc bên nào chịu là thỏa thuận được",
      "Chi phí sửa chữa và nội thất tối thiểu là khoản bị bỏ sót nhiều nhất",
      "Thiếu tiền ở bước cuối thường được bù bằng vay tiêu dùng - loại vay đắt nhất",
      "So sánh bất động sản bằng tổng chi phí sở hữu, không bằng giá niêm yết"
    ],
    "practicePrompt": {
      "question": "Bạn có đủ tiền cho đúng giá nhà cộng khoản vay đã được duyệt. Bước tiếp theo nên làm gì?",
      "options": [
        "Lập bảng tổng chi phí gồm thuế phí, sửa chữa, chuyển nhà và một khoản đệm",
        "Tiến hành đặt cọc vì phần tài chính đã được chuẩn bị đầy đủ",
        "Đề nghị người bán giảm giá đúng bằng phần thuế phí sẽ phát sinh",
        "Vay thêm một khoản dự phòng từ ngân hàng ngay khi làm hồ sơ vay"
      ],
      "correct": 0,
      "explanation": "Vay thêm dự phòng nghe chủ động nhưng nó tăng nghĩa vụ trả nợ dài hạn cho một khoản có thể không dùng tới. Lập bảng trước cho biết bạn thật sự thiếu bao nhiêu, và thường con số ấy nhỏ hơn nhiều so với một khoản vay thêm."
    },
    "summary": {
      "keyIdea": "Số tiền cần chuẩn bị là giá mua cộng thuế phí cộng chi phí để căn nhà dùng được",
      "commonMistake": "Tính vừa đủ cho giá niêm yết, rồi bù phần thiếu bằng vay tiêu dùng lãi cao",
      "action": "Lập bảng tổng chi phí trước khi đặt cọc, gồm cả khoản đệm cho phát sinh."
    },
    "application": {
      "title": "Bảng tổng chi phí trước khi cọc",
      "message": "Ghi ra: giá mua, nhóm thuế phí, phí môi giới, chi phí sửa chữa tối thiểu, chi phí chuyển nhà, và một khoản đệm. Tổng đó mới là số tiền bạn cần có.",
      "secondary": "Thỏa thuận ai chịu khoản nào ngay khi thương lượng giá, không để tới lúc làm thủ tục - lúc đó bạn không còn vị thế để thương lượng."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hai bài trước nói về pháp lý và cam kết. Bài này về một phép cộng đơn giản mà rất nhiều người làm thiếu, và làm thiếu đúng vào bước không còn lùi được."
      },
      {
        "type": "heading",
        "text": "Ba nhóm chi phí ngoài giá mua"
      },
      {
        "type": "conceptTable",
        "title": "Cộng đủ ba nhóm rồi mới biết cần bao nhiêu tiền",
        "subtitle": "Nhóm đầu bắt buộc, hai nhóm sau gần như luôn có",
        "concepts": [
          {
            "vi": "Thuế và lệ phí",
            "en": "Taxes & fees",
            "def": "Lệ phí trước bạ, thuế thu nhập từ chuyển nhượng, phí công chứng, lệ phí hồ sơ. Ai chịu là thỏa thuận, có phát sinh thì không."
          },
          {
            "vi": "Chi phí giao dịch",
            "en": "Transaction costs",
            "def": "Môi giới, thẩm định giá nếu vay ngân hàng, bảo hiểm khoản vay. Xuất hiện tùy cách bạn mua nhưng thường có."
          },
          {
            "vi": "Chi phí để ở được",
            "en": "Move-in costs",
            "def": "Sửa chữa tối thiểu, nội thất cơ bản, chuyển nhà. Rải ra nhiều khoản nhỏ nên hay bị bỏ sót nhất."
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Không nhóm nào trong ba nhóm này lớn so với giá nhà. Vấn đề là chúng đến gần như cùng lúc, vào đúng giai đoạn tiền tích lũy đã dồn hết cho khoản trả trước. Đó là lý do chúng thường được bù bằng vay tiêu dùng - loại vay có lãi cao nhất - cho một nhu cầu lẽ ra đã tính trước được."
      },
      {
        "type": "callout",
        "label": "Thỏa thuận ai chịu thuế phí ngay khi thương lượng giá",
        "text": "Đây là phần của cuộc thương lượng chứ không phải thủ tục hành chính ở cuối. Để tới lúc làm hồ sơ mới bàn thì bạn đã cọc, đã cam kết, và không còn vị thế nào để thương lượng. Đưa nó vào cùng lúc với giá thì nó chỉ là một dòng nữa trong cùng cuộc trao đổi."
      },
      {
        "type": "closing",
        "lines": [
          "Giá niêm yết là con số bắt đầu cuộc thương lượng, không phải con số bạn cần chuẩn bị.",
          "Bài sau: khoản vay đã duyệt rồi, nhưng con số trả hằng tháng sẽ đổi."
        ]
      }
    ]
  },
  {
    "id": 363,
    "slug": "lai-suat-tha-noi-sau-uu-dai",
    "title": "Chặng 17, Bài 4: Lãi thả nổi và cú sốc sau kỳ ưu đãi",
    "subtitle": "Con số trong năm đầu không phải con số bạn sẽ trả trong hai mươi năm còn lại",
    "duration": "8 phút",
    "difficulty": "Khó",
    "emoji": "📈",
    "track": "personal",
    "whyItMatters": "Đây là chỗ nhiều gia đình tính đúng khả năng trả nợ nhưng tính trên sai con số. Mức lãi ưu đãi thường chỉ kéo dài một tới hai năm đầu, sau đó chuyển sang thả nổi - và khoản trả hằng tháng có thể tăng đáng kể đúng vào lúc mọi khoản chi khác cũng đã ổn định ở mức cao.",
    "openingQuestion": "Lãi suất thả nổi sau kỳ ưu đãi thường được tính thế nào?",
    "openingOptions": [
      "Bằng một lãi suất cơ sở do ngân hàng công bố, cộng thêm một biên độ cố định",
      "Theo kinh nghiệm thường gặp, bằng đúng mức lãi suất ưu đãi ban đầu cộng thêm một phần trăm mỗi năm",
      "Bằng lãi suất trung bình của thị trường tại thời điểm hết kỳ ưu đãi",
      "Do ngân hàng tự quyết định lại hằng năm mà không theo công thức nào"
    ],
    "correctOption": 0,
    "explanation": "Công thức phổ biến là một lãi suất cơ sở cộng biên độ. Biên độ thường cố định suốt thời gian vay và được ghi trong hợp đồng; lãi suất cơ sở thì thay đổi theo chính sách của ngân hàng. Điều này có hai hệ quả quan trọng. Thứ nhất, mức lãi sau ưu đãi gần như luôn cao hơn mức ưu đãi, đôi khi cao hơn khá nhiều - nên khoản trả hằng tháng tăng lên chứ không giữ nguyên. Thứ hai, biên độ là phần bạn thương lượng được trước khi ký, còn lãi suất cơ sở thì không. Nhiều người so sánh các ngân hàng bằng mức ưu đãi năm đầu, trong khi thứ quyết định hai mươi năm còn lại là biên độ.",
    "diagram": [
      {
        "label": "Năm đầu: lãi ưu đãi",
        "arrow": true
      },
      {
        "label": "Sau đó: lãi cơ sở cộng biên độ",
        "arrow": true
      },
      {
        "label": "Biên độ thương lượng được, lãi cơ sở thì không",
        "arrow": true
      },
      {
        "label": "So ngân hàng bằng BIÊN ĐỘ, không bằng ưu đãi năm đầu"
      }
    ],
    "realWorldExample": {
      "company": "Tính đúng nhưng tính trên sai con số",
      "description": "Một gia đình tính khả năng trả nợ dựa trên mức ưu đãi của năm đầu và thấy vừa sức. Sang năm thứ hai, khoản trả hằng tháng tăng đáng kể vì lãi chuyển sang thả nổi - trong khi tiền học của con, chi phí sinh hoạt và mọi thứ khác đã ổn định ở mức của năm trước. Phép tính ban đầu không sai về phương pháp; nó chỉ dùng con số của giai đoạn ngắn nhất trong cả khoản vay."
    },
    "quiz": [
      {
        "question": "Phần nào của lãi suất thả nổi bạn thương lượng được?",
        "options": [
          "Biên độ, vì nó được ghi cố định trong hợp đồng ngay từ đầu",
          "Lãi suất cơ sở, vì ngân hàng điều chỉnh nó theo từng khách hàng",
          "Cả hai đều thương lượng được nếu khoản vay đủ lớn",
          "Không phần nào thương lượng được vì cả hai do ngân hàng quyết định"
        ],
        "correct": 0,
        "explanation": "Lãi suất cơ sở áp chung cho mọi khách và thay đổi theo chính sách chung. Biên độ là phần riêng của hợp đồng bạn, nên đó chính là chỗ đáng dồn sức thương lượng và cũng là chỗ đáng so sánh giữa các ngân hàng."
      },
      {
        "question": "Vì sao so sánh ngân hàng bằng mức ưu đãi năm đầu là sai?",
        "options": [
          "Vì ưu đãi chỉ áp một tới hai năm, còn biên độ áp cho toàn bộ thời gian còn lại",
          "Về nguyên tắc, vì mức ưu đãi được công bố không phải mức thực tế khách hàng nhận được",
          "Vì các ngân hàng đều áp cùng một mức ưu đãi theo quy định chung",
          "Vì ưu đãi chỉ dành cho khách hàng vay lần đầu tại ngân hàng đó"
        ],
        "correct": 0,
        "explanation": "Với khoản vay hai mươi năm, mức ưu đãi chi phối khoảng năm tới mười phần trăm thời gian còn biên độ chi phối phần còn lại. Chọn theo con số của giai đoạn ngắn là để cái đuôi vẫy con chó."
      },
      {
        "question": "Cách kiểm tra khả năng trả nợ đúng đắn nhất là gì?",
        "options": [
          "Tính theo mức lãi ưu đãi vì đó là con số ghi trong hợp đồng tín dụng",
          "Tính khoản trả hằng tháng theo mức lãi sau ưu đãi, cộng thêm một khoảng đệm",
          "Tính theo mức lãi trung bình giữa ưu đãi và thả nổi cho cân bằng",
          "Theo cách hiểu phổ biến, tính theo mức lãi cao nhất mà ngân hàng đã từng áp dụng trong lịch sử"
        ],
        "correct": 1,
        "explanation": "Đây là phép thử thật của khoản vay. Nếu khoản trả ở mức lãi sau ưu đãi đã vượt khả năng, thì khoản vay ấy không phù hợp - dù năm đầu có dễ chịu tới đâu."
      },
      {
        "question": "Phí trả nợ trước hạn có ý nghĩa gì với người vay?",
        "options": [
          "Nó chỉ áp dụng khi người vay chậm trả và bị chuyển nhóm nợ xấu",
          "Nhiều người cho rằng nó là khoản thưởng ngân hàng trả cho khách hàng trả nợ sớm hơn hạn",
          "Nó làm việc tất toán sớm hoặc chuyển sang ngân hàng khác trở nên tốn kém",
          "Nó được miễn hoàn toàn với các khoản vay có tài sản bảo đảm"
        ],
        "correct": 2,
        "explanation": "Khoản phí này thường giảm dần theo số năm đã vay và biến mất sau một mốc nhất định. Nó đáng đọc kỹ vì nó quyết định bạn có linh hoạt chuyển sang nơi lãi thấp hơn hay không."
      },
      {
        "question": "Khoản trả hằng tháng tăng sau kỳ ưu đãi nên được chuẩn bị thế nào?",
        "options": [
          "Đề nghị ngân hàng kéo dài thời gian ưu đãi khi sắp hết hạn",
          "Trong phần lớn trường hợp, chờ tới khi lãi tăng rồi mới điều chỉnh lại chi tiêu của gia đình",
          "Vay thêm một khoản dự phòng ngay từ đầu để bù phần tăng sau này",
          "Tiết kiệm phần chênh lệch ngay từ năm đầu để tạo đệm và tập quen mức chi mới"
        ],
        "correct": 3,
        "explanation": "Cách này làm hai việc cùng lúc: tạo ra khoản đệm và cho bạn biết trước liệu mức chi mới có sống được không - trong khi vẫn còn thời gian để xử lý nếu câu trả lời là không."
      }
    ],
    "keyTakeaways": [
      "Lãi thả nổi = lãi cơ sở + biên độ; biên độ thương lượng được, lãi cơ sở thì không",
      "So sánh ngân hàng bằng BIÊN ĐỘ, không bằng mức ưu đãi của một hai năm đầu",
      "Kiểm tra khả năng trả nợ theo mức lãi SAU ưu đãi, không theo mức ưu đãi",
      "Phí trả nợ trước hạn quyết định bạn có chuyển sang nơi rẻ hơn được hay không"
    ],
    "practicePrompt": {
      "question": "Ngân hàng A ưu đãi thấp hơn B trong năm đầu, nhưng biên độ cao hơn. Với khoản vay hai mươi năm, nên chọn thế nào?",
      "options": [
        "Tính tổng tiền lãi cả kỳ vay của hai phương án rồi so, biên độ thường quyết định",
        "Chọn A vì khoản tiết kiệm được ngay trong năm đầu là chắc chắn",
        "Chọn B vì biên độ thấp luôn tốt hơn bất kể mức ưu đãi ra sao",
        "Trên thực tế, chọn theo ngân hàng nào giải ngân nhanh hơn để kịp tiến độ giao dịch mà không cần kiểm tra thêm"
      ],
      "correct": 0,
      "explanation": "Biên độ thường quyết định vì nó áp cho phần lớn thời gian, nhưng nói luôn tốt hơn là bỏ qua phép tính. Với khoản vay ngắn hoặc dự định tất toán sớm, kết luận có thể ngược lại - nên hãy tính thay vì áp một quy tắc."
    },
    "summary": {
      "keyIdea": "Mức ưu đãi chi phối một hai năm; biên độ chi phối phần còn lại của khoản vay",
      "commonMistake": "Tính khả năng trả nợ theo lãi ưu đãi năm đầu, rồi chật vật từ năm thứ hai",
      "action": "Hỏi rõ biên độ và tính lại khoản trả hằng tháng theo mức lãi sau ưu đãi."
    },
    "application": {
      "title": "Ba câu hỏi trước khi ký hợp đồng vay",
      "message": "Biên độ là bao nhiêu và có cố định suốt kỳ vay không. Khoản trả hằng tháng sẽ là bao nhiêu ở mức lãi sau ưu đãi. Phí trả nợ trước hạn tính thế nào và kéo dài mấy năm.",
      "secondary": "Nếu con số ở câu thứ hai đã vượt khả năng của gia đình, đó là câu trả lời cho toàn bộ giao dịch - không phải vấn đề cần giải quyết sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng 9 đã dạy vay bao nhiêu là an toàn theo tỷ lệ trả nợ trên thu nhập. Bài này về một chi tiết làm sai lệch chính phép tính ấy: con số bạn dùng để tính chỉ đúng trong một hai năm đầu."
      },
      {
        "type": "heading",
        "text": "Hai phần của một lãi suất thả nổi"
      },
      {
        "type": "paragraph",
        "text": "Sau kỳ ưu đãi, lãi suất thường được tính bằng một lãi suất cơ sở do ngân hàng công bố cộng với một biên độ. Biên độ ghi trong hợp đồng và thường cố định suốt kỳ vay - đó là phần thuộc về riêng bạn và là phần thương lượng được. Lãi suất cơ sở thay đổi theo chính sách chung, không ai thương lượng được. Nghĩa là khi so sánh các ngân hàng, thứ đáng so là biên độ chứ không phải con số ưu đãi được quảng cáo to nhất."
      },
      {
        "type": "conceptTable",
        "title": "Ba con số cần hỏi rõ trước khi ký",
        "subtitle": "Chỉ con số đầu tiên được quảng cáo, hai con số sau quyết định nhiều hơn",
        "concepts": [
          {
            "vi": "Lãi ưu đãi",
            "en": "Teaser rate",
            "def": "Áp một tới hai năm đầu. Đây là con số được quảng cáo, và nó chi phối phần nhỏ nhất của khoản vay."
          },
          {
            "vi": "Biên độ",
            "en": "Spread",
            "def": "Cộng vào lãi cơ sở sau kỳ ưu đãi, thường cố định suốt kỳ vay. Đây là con số thật sự đáng so sánh và đáng thương lượng."
          },
          {
            "vi": "Phí trả nợ trước hạn",
            "en": "Prepayment fee",
            "def": "Quyết định bạn có chuyển sang ngân hàng rẻ hơn được không, hoặc tất toán sớm khi có tiền. Thường giảm dần theo năm."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Tiết kiệm phần chênh ngay từ năm đầu",
        "text": "Nếu khoản trả sau ưu đãi cao hơn khoản trả năm đầu, hãy để dành đúng phần chênh ấy ngay từ tháng đầu tiên. Việc này làm hai việc cùng lúc: tạo một khoản đệm, và cho bạn biết sớm liệu mức chi mới có sống được không - trong khi vẫn còn thời gian để xử lý nếu câu trả lời là không."
      },
      {
        "type": "closing",
        "lines": [
          "Khoản vay hai mươi năm nên được đánh giá bằng con số của năm thứ mười, không phải năm thứ nhất.",
          "Bài sau: chung cư có những khoản mà nhà đất không có."
        ]
      }
    ]
  },
  {
    "id": 364,
    "slug": "chung-cu-phi-va-so-huu-chung",
    "title": "Chặng 17, Bài 5: Chung cư - những khoản nhà đất không có",
    "subtitle": "Phí quản lý chạy suốt đời sở hữu, và một phần tài sản không thuộc riêng bạn",
    "duration": "7 phút",
    "difficulty": "Trung bình",
    "emoji": "🏢",
    "track": "personal",
    "whyItMatters": "Chung cư được so với nhà đất bằng giá mỗi mét vuông, trong khi cấu trúc chi phí và cấu trúc sở hữu của hai loại khác hẳn nhau. Vài khoản chỉ có ở chung cư chạy đều đặn suốt thời gian sở hữu và cần được đưa vào phép so sánh ngay từ đầu.",
    "openingQuestion": "Phí quản lý chung cư có đặc điểm gì đáng lưu ý nhất?",
    "openingOptions": [
      "Nó chạy đều mỗi tháng suốt thời gian sở hữu và có thể được điều chỉnh tăng",
      "Nó chỉ được thu trong năm năm đầu sau khi tòa nhà đi vào vận hành",
      "Theo kinh nghiệm thường gặp, nó được tính một lần vào giá bán nên người mua không phải trả thêm",
      "Nó do cư dân tự nguyện đóng góp nên không bắt buộc phải nộp"
    ],
    "correctOption": 0,
    "explanation": "Phí quản lý thường tính theo diện tích mỗi tháng và tồn tại suốt thời gian bạn sở hữu căn hộ - nó chi trả cho bảo vệ, vệ sinh, thang máy, chiếu sáng khu vực chung và vận hành tòa nhà. Đây là khoản chi cố định dài hạn giống tiền điện nước, và nó có thể được điều chỉnh theo thời gian. Với một căn hộ giữ hai mươi năm, tổng phí quản lý cộng lại là một con số đáng kể mà phép so sánh theo giá mỗi mét vuông bỏ qua hoàn toàn. Ngoài ra còn kinh phí bảo trì phần sở hữu chung - một khoản đóng khi nhận nhà, dùng cho việc sửa chữa lớn các hạng mục dùng chung về sau.",
    "diagram": [
      {
        "label": "Giá mua: so được bằng mỗi mét vuông",
        "arrow": true
      },
      {
        "label": "Phí quản lý: chạy mỗi tháng, suốt đời sở hữu",
        "arrow": true
      },
      {
        "label": "Kinh phí bảo trì: đóng khi nhận nhà",
        "arrow": true
      },
      {
        "label": "Cộng cả ba mới so được với nhà đất"
      }
    ],
    "realWorldExample": {
      "company": "Hai căn cùng giá, khác nhau sau mười năm",
      "description": "Hai căn hộ cùng diện tích và cùng giá bán, nhưng một tòa có phí quản lý cao hơn đáng kể vì nhiều tiện ích. Sau mười năm, chênh lệch phí cộng dồn thành một con số không nhỏ so với giá căn hộ - và nó không xuất hiện ở bất kỳ đâu trong phép so sánh ban đầu, vốn chỉ nhìn vào giá mỗi mét vuông."
    },
    "quiz": [
      {
        "question": "Kinh phí bảo trì phần sở hữu chung dùng để làm gì?",
        "options": [
          "Sửa chữa và thay thế các hạng mục thuộc sở hữu chung của tòa nhà về sau",
          "Chi trả lương cho ban quản lý và nhân viên vận hành hằng tháng",
          "Bù đắp chi phí điện nước của các căn hộ chưa có người ở",
          "Về nguyên tắc, đóng góp vào quỹ dự phòng của chủ đầu tư cho các dự án tiếp theo"
        ],
        "correct": 0,
        "explanation": "Cần phân biệt với phí quản lý: phí quản lý chi cho vận hành hằng ngày, còn kinh phí bảo trì dành cho những hạng mục lớn có tuổi thọ nhiều năm như thang máy hay hệ thống kỹ thuật."
      },
      {
        "question": "Diện tích ghi trong hợp đồng nên được hiểu thế nào?",
        "options": [
          "Luôn là diện tích sử dụng thực tế mà bạn đi lại được bên trong căn hộ",
          "Cần biết rõ cách đo, vì cùng một căn có thể ra hai con số khác nhau",
          "Luôn bao gồm cả phần diện tích chung được phân bổ cho mỗi căn hộ",
          "Chỉ mang tính tham khảo vì diện tích thật được đo lại khi bàn giao"
        ],
        "correct": 1,
        "explanation": "Có nhiều cách đo cho ra các con số khác nhau, và giá mỗi mét vuông tính trên cách đo nào thì phải so với cách đo đó. So hai căn bằng hai cách đo khác nhau là so hai thứ khác nhau."
      },
      {
        "question": "Vì sao chất lượng ban quản lý lại là yếu tố tài chính?",
        "options": [
          "Theo cách hiểu phổ biến, vì họ có quyền thu thêm các khoản phí ngoài quy định của hợp đồng",
          "Vì ban quản lý quyết định mức giá bán căn hộ trong tòa nhà",
          "Vì vận hành kém làm tòa nhà xuống cấp nhanh và ảnh hưởng giá bán lại",
          "Vì họ chịu trách nhiệm nộp thuế bất động sản thay cho cư dân"
        ],
        "correct": 2,
        "explanation": "Đây là yếu tố khó lượng hóa nhưng ảnh hưởng thật. Một tòa nhà được vận hành tốt giữ giá tốt hơn hẳn tòa cùng vị trí nhưng xuống cấp - và bạn quan sát được điều này trước khi mua bằng cách tới xem vào các thời điểm khác nhau."
      },
      {
        "question": "So sánh chung cư với nhà đất nên dựa trên cơ sở nào?",
        "options": [
          "Tốc độ tăng giá trong năm năm gần nhất của từng loại hình",
          "Giá mỗi mét vuông vì đó là thước đo chuẩn của thị trường",
          "Vị trí và tiện ích xung quanh vì đó là yếu tố quyết định giá trị",
          "Tổng chi phí sở hữu theo năm, gồm cả phí quản lý và bảo trì"
        ],
        "correct": 3,
        "explanation": "Giá mỗi mét vuông so được hai chung cư với nhau nếu cùng cách đo, nhưng nó không so được chung cư với nhà đất vì hai loại có cấu trúc chi phí khác hẳn nhau."
      },
      {
        "question": "Điều gì nên kiểm tra về tòa nhà trước khi mua căn hộ đã qua sử dụng?",
        "options": [
          "Tình trạng vận hành, mức phí hiện tại, và tình hình quỹ bảo trì của tòa nhà",
          "Số lượng căn hộ đang được rao bán trong cùng tòa nhà đó",
          "Nhiều người cho rằng danh sách các tiện ích được chủ đầu tư quảng cáo khi mở bán",
          "Tên tuổi của chủ đầu tư đã xây dựng tòa nhà đó ban đầu"
        ],
        "correct": 0,
        "explanation": "Quỹ bảo trì cạn trong khi tòa nhà đã cũ nghĩa là các khoản sửa chữa lớn sắp tới sẽ được chia cho cư dân. Đây là nghĩa vụ tài chính tương lai mà người mua kế thừa và ít ai hỏi tới."
      }
    ],
    "keyTakeaways": [
      "Phí quản lý chạy suốt thời gian sở hữu và cộng dồn thành con số đáng kể",
      "Kinh phí bảo trì khác phí quản lý: một bên cho vận hành hằng ngày, một bên cho sửa chữa lớn",
      "Diện tích có nhiều cách đo - so hai căn phải so cùng một cách",
      "Quỹ bảo trì cạn ở tòa nhà cũ là nghĩa vụ tương lai mà người mua kế thừa"
    ],
    "practicePrompt": {
      "question": "Hai căn hộ cùng giá, cùng diện tích, nhưng một nơi phí quản lý cao gấp đôi. Nên đánh giá thế nào?",
      "options": [
        "Quy phần chênh phí ra tổng của mười năm rồi so với chênh lệch giá mua",
        "Trên thực tế, chọn nơi phí thấp hơn vì đó là khoản chi cố định phải trả mãi mãi",
        "Chọn nơi phí cao hơn vì phí cao đồng nghĩa với dịch vụ tốt hơn",
        "Bỏ qua vì phí quản lý là khoản nhỏ so với giá trị của căn hộ"
      ],
      "correct": 0,
      "explanation": "Phí cao có thể tương xứng với tiện ích bạn thật sự dùng, hoặc không - đó là câu hỏi riêng. Nhưng trước khi trả lời nó, hãy quy phần chênh ra con số tuyệt đối của nhiều năm để biết mình đang cân nhắc bao nhiêu tiền."
    },
    "summary": {
      "keyIdea": "Chung cư có nhóm chi phí định kỳ mà nhà đất không có, và phép so theo mỗi mét vuông bỏ qua chúng",
      "commonMistake": "So chung cư với nhà đất bằng giá mỗi mét vuông như thể hai loại có cùng cấu trúc chi phí",
      "action": "Hỏi mức phí quản lý hiện tại và quy nó ra tổng của mười năm trước khi so sánh."
    },
    "application": {
      "title": "Quy phí về con số nhiều năm",
      "message": "Lấy mức phí quản lý mỗi tháng nhân với số tháng bạn dự định sở hữu. Đặt con số ấy cạnh giá mua - nó thường lớn hơn nhiều so với cảm giác về một khoản phí hằng tháng.",
      "secondary": "Với căn hộ đã qua sử dụng, hỏi thêm tình hình quỹ bảo trì. Quỹ cạn ở một tòa nhà cũ là chi phí tương lai bạn sẽ gánh chung."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chung cư và nhà đất thường được so với nhau bằng một con số duy nhất là giá mỗi mét vuông. Bài này về những khoản mà con số ấy không chứa."
      },
      {
        "type": "heading",
        "text": "Hai khoản chỉ có ở chung cư"
      },
      {
        "type": "paragraph",
        "text": "Phí quản lý là khoản chạy đều mỗi tháng suốt thời gian sở hữu, chi cho bảo vệ, vệ sinh, thang máy và vận hành khu vực chung. Kinh phí bảo trì phần sở hữu chung là khoản đóng khi nhận nhà, dành cho việc sửa chữa lớn về sau. Cả hai đều hợp lý về mặt chức năng - tòa nhà cần được vận hành và bảo trì - nhưng cả hai đều nằm ngoài phép so sánh theo giá mỗi mét vuông."
      },
      {
        "type": "callout",
        "label": "Một phần tài sản của bạn là sở hữu chung",
        "text": "Hành lang, thang máy, sân, hệ thống kỹ thuật thuộc về toàn bộ cư dân chứ không thuộc riêng ai. Nghĩa là chất lượng cuộc sống và giá bán lại của căn hộ phụ thuộc vào các quyết định tập thể, chủ yếu qua ban quản trị. Đây là khác biệt về bản chất so với nhà đất, nơi mọi quyết định về tài sản đều là của riêng bạn."
      },
      {
        "type": "list",
        "items": [
          "Hỏi mức phí quản lý hiện tại và lịch sử điều chỉnh của nó",
          "Hỏi cách đo diện tích ghi trong hợp đồng, và so hai căn bằng cùng một cách",
          "Với căn đã qua sử dụng: hỏi tình hình quỹ bảo trì và các hạng mục sắp phải sửa",
          "Tới xem tòa nhà vào vài thời điểm khác nhau để thấy chất lượng vận hành thật"
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Giá mỗi mét vuông so được hai chung cư, nhưng không so được chung cư với nhà đất.",
          "Bài sau: đất nền - loại tài sản có vấn đề ngược lại."
        ]
      }
    ]
  },
  {
    "id": 365,
    "slug": "dat-nen-va-rui-ro-thanh-khoan",
    "title": "Chặng 17, Bài 6: Đất nền và rủi ro thanh khoản",
    "subtitle": "Không có phí hằng tháng, nhưng cũng không có ai mua khi bạn cần bán",
    "duration": "7 phút",
    "difficulty": "Trung bình",
    "emoji": "🏞️",
    "track": "personal",
    "whyItMatters": "Đất nền hấp dẫn vì nó không có phí quản lý, không xuống cấp, và câu chuyện tăng giá thì dễ kể. Rủi ro của nó nằm ở chỗ ngược lại với chung cư: không phải chi phí đều đặn, mà là khả năng bán được khi bạn cần tiền.",
    "openingQuestion": "Rủi ro lớn nhất của đất nền so với chung cư ở khu dân cư là gì?",
    "openingOptions": [
      "Thanh khoản - có thể mất rất lâu mới tìm được người mua ở mức giá hợp lý",
      "Trong phần lớn trường hợp, chi phí duy trì hằng năm cao hơn nhiều so với một căn hộ chung cư",
      "Giá trị giảm dần theo thời gian do tài sản bị xuống cấp tự nhiên",
      "Thủ tục pháp lý phức tạp hơn nên không chuyển nhượng được"
    ],
    "correctOption": 0,
    "explanation": "Đất không xuống cấp và gần như không có chi phí duy trì định kỳ, đó là ưu điểm thật. Nhưng số người mua một lô đất ở vị trí cụ thể tại một thời điểm cụ thể ít hơn nhiều so với số người tìm mua căn hộ để ở - đặc biệt với đất ở xa khu dân cư hiện hữu. Hệ quả là khi bạn cần tiền, khoảng thời gian từ lúc rao tới lúc bán được có thể kéo dài nhiều tháng, và mức giá bán được thường thấp hơn giá bạn nghĩ nó đáng. Thanh khoản kém không phải vấn đề nếu bạn không cần bán; nó chỉ trở thành vấn đề đúng vào lúc cần - và đó thường là lúc thị trường cũng đang khó.",
    "diagram": [
      {
        "label": "Không phí quản lý, không xuống cấp",
        "arrow": true
      },
      {
        "label": "Nhưng ít người mua ở mỗi thời điểm",
        "arrow": true
      },
      {
        "label": "Bán được có thể mất nhiều tháng",
        "arrow": true
      },
      {
        "label": "Và thường ở giá thấp hơn kỳ vọng"
      }
    ],
    "realWorldExample": {
      "company": "Giá rao và giá bán được",
      "description": "Một lô đất được rao ở mức giá mà chủ tin là hợp lý, dựa trên các giao dịch từng nghe nói trong khu vực. Sáu tháng không có người hỏi mua nghiêm túc. Giá rao trong trường hợp này không phải giá thị trường - nó là một đề nghị chưa ai chấp nhận. Với tài sản ít giao dịch, khoảng cách giữa giá rao và giá bán được có thể rất lớn và chỉ lộ ra khi bạn thật sự cần bán."
    },
    "quiz": [
      {
        "question": "Vì sao giá rao không phải giá thị trường với đất nền?",
        "options": [
          "Vì người bán luôn rao cao hơn giá thật để có chỗ thương lượng xuống",
          "Vì giá thị trường chỉ hình thành khi có giao dịch thật, mà đất nền giao dịch thưa",
          "Trên thực tế, vì các trang rao bán không kiểm chứng thông tin do người đăng cung cấp",
          "Vì giá rao chưa bao gồm thuế phí mà người mua phải nộp thêm"
        ],
        "correct": 1,
        "explanation": "Với cổ phiếu, giá hình thành liên tục vì có hàng nghìn giao dịch mỗi ngày. Với một lô đất cụ thể, có thể nhiều tháng không có giao dịch nào - nên con số duy nhất bạn thấy là đề nghị của người bán, không phải mức thị trường chấp nhận."
      },
      {
        "question": "Khi nào rủi ro thanh khoản trở thành vấn đề thật?",
        "options": [
          "Khi tài sản đã được nắm giữ quá năm năm mà chưa tăng giá",
          "Ngay khi mua, vì tài sản kém thanh khoản mất giá nhanh hơn",
          "Đúng lúc bạn cần tiền gấp, và đó thường trùng với lúc thị trường khó",
          "Về nguyên tắc, chỉ khi bạn mua bằng vốn vay chứ không phải bằng tiền của mình"
        ],
        "correct": 2,
        "explanation": "Đây là điểm quan trọng nhất: rủi ro thanh khoản không xuất hiện đều đặn mà dồn vào đúng thời điểm xấu nhất. Khi kinh tế khó khăn thì bạn cần tiền hơn, và cũng chính lúc đó ít người mua hơn."
      },
      {
        "question": "Vay tiền mua đất nền làm rủi ro thay đổi thế nào?",
        "options": [
          "Nó làm tăng thanh khoản vì người mua sau có thể kế thừa khoản vay",
          "Theo cách hiểu phổ biến, nó giảm rủi ro vì ngân hàng đã thẩm định giá trị tài sản trước khi cho vay",
          "Nó không đổi gì vì khoản vay được bảo đảm bằng chính lô đất đó",
          "Nó tạo nghĩa vụ trả nợ hằng tháng trên một tài sản không tạo ra dòng tiền nào"
        ],
        "correct": 3,
        "explanation": "Đây là kết hợp nguy hiểm nhất trong bài: nghĩa vụ trả nợ đều đặn trên một tài sản không sinh dòng tiền và khó bán. Khi áp lực trả nợ tăng, bạn buộc phải bán vào đúng lúc khó bán nhất."
      },
      {
        "question": "Điều gì ảnh hưởng mạnh nhất tới thanh khoản của một lô đất?",
        "options": [
          "Vị trí có nằm trong khu dân cư hiện hữu và có nhu cầu ở thật hay không",
          "Nhiều người cho rằng diện tích lô đất có phải con số chẵn và dễ chia nhỏ hay không",
          "Số lượng lô đất khác đang được rao bán trong cùng khu vực",
          "Thời gian mà chủ sở hữu hiện tại đã nắm giữ lô đất đó"
        ],
        "correct": 0,
        "explanation": "Nhu cầu ở thật là nguồn cầu bền nhất. Đất ở nơi chưa có người ở thì người mua chủ yếu là người đầu tư khác - và nguồn cầu đó biến mất rất nhanh khi tâm lý thị trường đổi chiều."
      },
      {
        "question": "Đất nền phù hợp với khoản tiền nào?",
        "options": [
          "Trong phần lớn trường hợp, khoản tiết kiệm trung hạn cần dùng trong ba tới năm năm tới",
          "Khoản dài hạn thật sự, không có mốc phải dùng và không vay để mua",
          "Khoản dự phòng cho các tình huống khẩn cấp của gia đình",
          "Khoản vay được với lãi suất ưu đãi trong hai năm đầu tiên"
        ],
        "correct": 1,
        "explanation": "Ba phương án còn lại đều mâu thuẫn với đặc tính thanh khoản kém. Tài sản có thể mất nhiều tháng mới bán được thì không thể gắn với bất kỳ mốc thời gian nào."
      }
    ],
    "keyTakeaways": [
      "Ưu điểm thật: không phí quản lý, không xuống cấp",
      "Rủi ro chính là thanh khoản - có thể mất nhiều tháng mới bán được",
      "Giá rao không phải giá thị trường khi tài sản giao dịch thưa",
      "Vay tiền mua đất nền là kết hợp nghĩa vụ đều đặn với tài sản khó bán"
    ],
    "practicePrompt": {
      "question": "Bạn định mua đất nền bằng phần lớn tiền tích lũy, kỳ vọng bán lại sau ba năm để lấy tiền cho con du học. Vấn đề là gì?",
      "options": [
        "Một mốc chi cụ thể không hợp với tài sản có thể mất nhiều tháng mới bán được",
        "Theo kinh nghiệm thường gặp, ba năm là quá ngắn để đất nền kịp tăng giá đủ bù chi phí giao dịch",
        "Nên chọn chung cư vì nó cho thuê được trong thời gian chờ bán",
        "Nên vay thêm để mua lô lớn hơn vì lô lớn dễ bán hơn lô nhỏ"
      ],
      "correct": 0,
      "explanation": "Vấn đề không nằm ở việc giá có tăng hay không - nó nằm ở chỗ bạn có bán được đúng lúc cần hay không. Chặng 12 đã có nguyên tắc này: khoản gắn với một mốc cụ thể phải nằm ở nơi cho giá trị biết trước vào đúng ngày đó."
    },
    "summary": {
      "keyIdea": "Đất nền đổi chi phí định kỳ lấy rủi ro thanh khoản, và rủi ro ấy dồn vào đúng lúc xấu nhất",
      "commonMistake": "Gắn một mốc chi tiêu cụ thể với tài sản có thể mất nhiều tháng mới bán được",
      "action": "Hỏi lô đất bạn đang cân nhắc có bao nhiêu giao dịch thật trong khu vực năm qua."
    },
    "application": {
      "title": "Đếm giao dịch thật, không đếm tin rao",
      "message": "Với khu vực bạn đang cân nhắc, tìm xem có bao nhiêu giao dịch thật đã hoàn tất trong một năm qua. Số giao dịch thấp nghĩa là khi bạn muốn bán, bạn sẽ ở trong cùng tình huống đó.",
      "secondary": "Đặt thêm một câu hỏi: người mua lại lô này sẽ là ai và họ mua để làm gì. Nếu câu trả lời là một nhà đầu tư khác, nguồn cầu ấy kém bền hơn nhiều so với nhu cầu ở thật."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài trước nói chung cư có nhóm chi phí định kỳ mà nhà đất không có. Bài này về mặt còn lại của cùng phép đánh đổi: đất nền không có chi phí ấy, nhưng có một rủi ro mà chung cư ở khu dân cư ít gặp hơn."
      },
      {
        "type": "heading",
        "text": "Thanh khoản là gì trong bất động sản"
      },
      {
        "type": "paragraph",
        "text": "Chặng 3 đã định nghĩa thanh khoản là mức độ dễ đổi tài sản ra tiền mà không phải giảm giá nhiều. Với cổ phiếu niêm yết, bạn bán trong vài giây ở mức giá đang hiển thị. Với một lô đất cụ thể, có thể nhiều tháng không có ai hỏi mua nghiêm túc - và mức giá bạn nhìn thấy trên các tin rao là đề nghị của người bán chứ không phải mức mà thị trường đã chấp nhận."
      },
      {
        "type": "conceptTable",
        "title": "Hai loại bất động sản, hai loại rủi ro",
        "subtitle": "Không loại nào an toàn hơn - chúng đổi rủi ro này lấy rủi ro kia",
        "concepts": [
          {
            "vi": "Chung cư ở khu dân cư",
            "en": "Apartment",
            "def": "Chi phí định kỳ đều đặn, nhưng có nhu cầu ở thật nên thường bán được nhanh hơn ở mức giá gần với mặt bằng."
          },
          {
            "vi": "Đất nền khu dân cư hiện hữu",
            "en": "Established land",
            "def": "Không phí định kỳ, và vẫn có nhu cầu ở thật đỡ lưng. Đây là nhóm cân bằng nhất trong ba nhóm."
          },
          {
            "vi": "Đất xa khu dân cư",
            "en": "Remote land",
            "def": "Không phí định kỳ, nhưng người mua chủ yếu là nhà đầu tư khác. Nguồn cầu ấy biến mất nhanh khi tâm lý thị trường đổi chiều."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Rủi ro thanh khoản dồn vào đúng thời điểm xấu nhất",
        "text": "Nó không xuất hiện đều đặn mỗi tháng như một khoản phí. Nó nằm im nhiều năm rồi hiện ra đúng lúc bạn cần tiền - và lý do bạn cần tiền thường trùng với lý do người khác cũng đang thiếu tiền. Đó là điều khiến nó nguy hiểm hơn một chi phí cố định có thể dự tính được."
      },
      {
        "type": "closing",
        "lines": [
          "Không có phí hằng tháng không có nghĩa là không có cái giá - cái giá ở đây trả bằng thời gian, vào đúng lúc bạn không có thời gian.",
          "Bài sau: nếu mua để cho thuê thì lợi suất thật là bao nhiêu."
        ]
      }
    ]
  },
  {
    "id": 366,
    "slug": "loi-suat-cho-thue-that",
    "title": "Chặng 17, Bài 7: Lợi suất cho thuê thật sau mọi chi phí",
    "subtitle": "Tiền thuê gộp luôn đẹp; con số cần so sánh là phần còn lại sau khi trừ hết",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🔑",
    "track": "personal",
    "whyItMatters": "Mua để cho thuê được nhìn qua một con số duy nhất là tiền thuê hằng tháng, và con số đó bỏ qua tháng trống, chi phí sửa chữa, thuế phí và cả vốn đang bị chôn. Quy về lợi suất là cách duy nhất so được nó với các lựa chọn khác cùng số tiền.",
    "openingQuestion": "Căn hộ 2 tỷ cho thuê 10 triệu mỗi tháng. Lợi suất gộp trước mọi chi phí là bao nhiêu?",
    "openingOptions": [
      "6%/năm (= 10 triệu × 12 ÷ 2 tỷ)",
      "10%/năm (= 10 triệu ÷ 100 triệu, nhầm đơn vị mẫu số)",
      "0,5%/năm (= 10 triệu ÷ 2 tỷ, quên nhân số tháng)",
      "12%/năm (= 12 tháng, nhầm số tháng thành tỷ lệ phần trăm)"
    ],
    "correctOption": 0,
    "explanation": "120 triệu tiền thuê một năm trên 2 tỷ vốn là 6% - và đó mới là con số GỘP, trước khi trừ bất cứ thứ gì. Trừ tháng trống giữa hai người thuê, chi phí sửa chữa và thay thế đồ, phí quản lý nếu là chung cư, thuế và lệ phí liên quan tới hoạt động cho thuê, phần còn lại thường thấp hơn đáng kể. Đây là phép tính quyết định: chỉ khi quy về phần trăm trên vốn thì mới so được khoản đầu tư này với tiền gửi, với trái phiếu hay với một danh mục cổ phiếu cùng số tiền. Nhìn vào con số mười triệu mỗi tháng thì không so được với gì cả.",
    "diagram": [
      {
        "label": "Tiền thuê năm chia cho vốn: lợi suất gộp",
        "arrow": true
      },
      {
        "label": "Trừ tháng trống",
        "arrow": true
      },
      {
        "label": "Trừ sửa chữa, phí quản lý, thuế",
        "arrow": true
      },
      {
        "label": "Phần còn lại mới đem so với kênh khác"
      }
    ],
    "realWorldExample": {
      "company": "Sáu phần trăm thành bao nhiêu",
      "description": "Cùng căn hộ trên: giả sử mỗi năm trống một tháng khi đổi người thuê, mất khoảng 10 triệu. Sửa chữa và thay thế đồ đạc trung bình 8 triệu một năm. Phí quản lý 6 triệu. Cộng lại khoảng 24 triệu, nên phần còn lại là 96 triệu - tức khoảng 4,8% trên vốn, chưa tính thuế. Con số ấy vẫn có thể hợp lý, nhưng nó khác hẳn 6% và nó là con số đúng để đem so sánh."
    },
    "quiz": [
      {
        "question": "Vì sao phải quy tiền thuê về phần trăm trên vốn?",
        "options": [
          "Vì ngân hàng dùng tỷ lệ này để quyết định hạn mức cho vay mua nhà",
          "Trên thực tế, vì cơ quan thuế yêu cầu kê khai thu nhập cho thuê theo tỷ lệ phần trăm",
          "Vì chỉ phần trăm mới so được khoản này với các lựa chọn khác cùng số tiền",
          "Vì tiền thuê thay đổi theo từng năm nên không dùng số tuyệt đối được"
        ],
        "correct": 2,
        "explanation": "Mười triệu mỗi tháng nghe hấp dẫn cho tới khi biết nó đến từ hai tỷ vốn. Cùng hai tỷ đó ở nơi khác có thể cho nhiều hơn mà không kèm việc quản lý - và phép so ấy chỉ hiện ra khi quy về phần trăm."
      },
      {
        "question": "Khoản nào thường bị bỏ qua nhất khi tính lợi suất cho thuê?",
        "options": [
          "Khoản vay ngân hàng dùng để mua bất động sản đó",
          "Về nguyên tắc, tiền thuê hằng tháng mà người thuê chuyển vào tài khoản",
          "Giá mua ban đầu của bất động sản đem cho thuê",
          "Tháng trống giữa hai người thuê và chi phí sửa chữa định kỳ"
        ],
        "correct": 3,
        "explanation": "Hai khoản này không có hóa đơn cố định nên không xuất hiện trong phép tính của phần lớn người. Nhưng chúng lặp lại đều đặn qua các năm và có thể ăn một phần tư lợi suất gộp."
      },
      {
        "question": "Cho thuê khác các khoản đầu tư tài chính ở điểm nào ít được nhắc?",
        "options": [
          "Nó đòi hỏi thời gian và công quản lý, tức một chi phí không hiện trên sổ sách",
          "Nó không chịu thuế trong khi đầu tư tài chính thì có",
          "Nó cho dòng tiền chắc chắn hơn nên rủi ro thấp hơn hẳn",
          "Theo cách hiểu phổ biến, nó không bị ảnh hưởng bởi lạm phát vì tiền thuê được điều chỉnh tự động"
        ],
        "correct": 0,
        "explanation": "Tìm người thuê, xử lý hỏng hóc, đòi tiền chậm trả - đây là công việc thật. Chặng 13 đã gọi đúng tên loại này: nó là kinh doanh chứ không phải thu nhập thụ động, và công sức ấy nên được tính vào."
      },
      {
        "question": "Lợi suất thuần 4,5% trong khi tiền gửi trả 6%. Kết luận nào hợp lý nhất?",
        "options": [
          "Nên bán bất động sản ngay vì tiền gửi cho lợi suất cao hơn mà không cần làm gì",
          "Cần cân nhắc thêm kỳ vọng tăng giá tài sản và công quản lý trước khi kết luận",
          "Nên tăng tiền thuê lên cho tới khi lợi suất vượt qua mức lãi tiền gửi",
          "Không so sánh được vì bất động sản và tiền gửi là hai loại tài sản khác nhau"
        ],
        "correct": 1,
        "explanation": "Lợi suất cho thuê chỉ là một nửa câu chuyện - nửa còn lại là thay đổi giá trị tài sản, thứ tiền gửi không có. Nhưng phép so vẫn cần thiết, vì nếu không có cả hai vế thì không biết mình đang kỳ vọng vào đâu."
      },
      {
        "question": "Vay tiền để mua bất động sản cho thuê ảnh hưởng thế nào?",
        "options": [
          "Làm tăng lợi suất vì bạn dùng ít vốn tự có hơn cho cùng tài sản",
          "Nhiều người cho rằng không ảnh hưởng vì tiền thuê của người thuê dùng để trả khoản vay",
          "Lãi vay phải được trừ vào dòng tiền, và nó có thể lớn hơn tiền thuê nhận được",
          "Chỉ ảnh hưởng nếu lãi suất vay cao hơn lợi suất cho thuê gộp"
        ],
        "correct": 2,
        "explanation": "Câu tiền thuê tự trả khoản vay là giả định phổ biến và thường sai: với lợi suất cho thuê thấp hơn lãi vay, mỗi tháng bạn phải bù thêm từ túi mình - và đó là điều cần biết trước chứ không phải phát hiện sau."
      }
    ],
    "keyTakeaways": [
      "Quy tiền thuê về phần trăm trên vốn - chỉ khi đó mới so được với các lựa chọn khác",
      "Tháng trống và chi phí sửa chữa là hai khoản bị bỏ qua nhiều nhất",
      "Cho thuê là kinh doanh chứ không phải thu nhập thụ động - công quản lý là chi phí thật",
      "Tiền thuê tự trả khoản vay là giả định thường sai khi lợi suất thấp hơn lãi vay"
    ],
    "practicePrompt": {
      "question": "Bạn định vay 1 tỷ để mua căn hộ 2 tỷ cho thuê 10 triệu mỗi tháng. Phép tính nào cần làm trước?",
      "options": [
        "So tiền thuê thuần hằng tháng với khoản trả nợ, để biết mỗi tháng phải bù bao nhiêu",
        "Tính xem sau bao nhiêu năm tiền thuê thu về sẽ bằng giá mua ban đầu",
        "Ước lượng giá căn hộ sẽ tăng bao nhiêu phần trăm trong mười năm tới",
        "Theo kinh nghiệm thường gặp, so lợi suất cho thuê gộp với mức lãi suất ưu đãi năm đầu của khoản vay"
      ],
      "correct": 0,
      "explanation": "Đây là phép tính quyết định bạn có duy trì được khoản đầu tư hay không. Kỳ vọng tăng giá chỉ có ý nghĩa nếu bạn còn giữ được tài sản tới lúc đó - và dòng tiền âm mỗi tháng là thứ quyết định điều ấy."
    },
    "summary": {
      "keyIdea": "Lợi suất thuần trên vốn là con số duy nhất so được khoản này với các lựa chọn khác",
      "commonMistake": "Đánh giá bằng tiền thuê hằng tháng và bỏ qua tháng trống, sửa chữa và công quản lý",
      "action": "Tính lợi suất thuần của bất động sản bạn đang có hoặc đang cân nhắc."
    },
    "application": {
      "title": "Một phép chia và bốn phép trừ",
      "message": "Tiền thuê cả năm, trừ tháng trống dự kiến, trừ sửa chữa trung bình, trừ phí quản lý, trừ thuế phí. Chia cho tổng vốn đã bỏ ra gồm cả chi phí mua. Đó là lợi suất thuần.",
      "secondary": "Đặt con số ấy cạnh lãi tiền gửi hiện hành. Nếu nó thấp hơn, phần chênh lệch chính là số tiền bạn đang trả để đổi lấy kỳ vọng tăng giá."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng 13 đã nói cho thuê nhà không phải thu nhập thụ động như quảng cáo. Bài này làm phép tính cụ thể cho đúng nhận định đó."
      },
      {
        "type": "heading",
        "text": "Từ tiền thuê gộp tới lợi suất thuần"
      },
      {
        "type": "formula",
        "title": "Lợi suất cho thuê thuần",
        "equation": "Lợi suất thuần = (Tiền thuê năm − Chi phí năm) ÷ Tổng vốn đã bỏ ra",
        "variables": [
          {
            "symbol": "Tiền thuê năm",
            "name": "Tiền thuê thực nhận",
            "description": "Đã trừ các tháng trống giữa hai người thuê"
          },
          {
            "symbol": "Chi phí năm",
            "name": "Sửa chữa, phí quản lý, thuế phí",
            "description": "Rải đều theo năm, kể cả khoản chỉ phát sinh vài năm một lần"
          },
          {
            "symbol": "Tổng vốn",
            "name": "Giá mua cộng mọi chi phí giao dịch",
            "description": "Gồm cả nhóm thuế phí và chi phí sửa chữa ban đầu ở bài 3"
          }
        ],
        "example": {
          "title": "Từ 6% xuống còn bao nhiêu",
          "calculation": "Thuê 120 triệu/năm · trống 1 tháng −10 · sửa chữa −8 · phí quản lý −6 · còn 96 triệu trên 2 tỷ",
          "result": "Khoảng 4,8% trước thuế",
          "explanation": "Con số này vẫn có thể hợp lý tùy kỳ vọng tăng giá và tùy các lựa chọn khác của bạn. Điều quan trọng là nó khác hẳn 6%, và nó mới là con số dùng để so sánh được."
        }
      },
      {
        "type": "callout",
        "label": "Công quản lý là chi phí, kể cả khi bạn tự làm",
        "text": "Tìm người thuê, xử lý hỏng hóc, nhắc tiền chậm trả, làm lại hợp đồng - nếu thuê người khác làm thì đó là một khoản chi rõ ràng. Tự làm không làm chi phí ấy biến mất, nó chỉ chuyển từ tiền sang thời gian của bạn. Bỏ nó ra khỏi phép tính là làm cho khoản đầu tư này trông tốt hơn thực tế."
      },
      {
        "type": "closing",
        "lines": [
          "Mười triệu mỗi tháng không so được với gì cả; 4,8% một năm thì so được với mọi thứ.",
          "Bài cuối chặng: gộp bảy bài thành danh sách việc cần làm trước khi xuống tiền."
        ]
      }
    ]
  },
  {
    "id": 367,
    "slug": "checklist-truoc-khi-xuong-tien",
    "title": "Chặng 17, Bài 8: Tổng kết - danh sách trước khi xuống tiền",
    "subtitle": "Bảy bài trước là bảy chỗ mất tiền; bài này xếp chúng thành thứ tự việc cần làm",
    "duration": "7 phút",
    "difficulty": "Trung bình",
    "emoji": "✅",
    "track": "personal",
    "whyItMatters": "Với phần lớn hộ gia đình, đây là giao dịch lớn nhất đời người và cũng là giao dịch ít có cơ hội sửa sai nhất. Một danh sách theo đúng thứ tự làm được nhiều hơn mọi lời khuyên chung, vì nó ngăn đúng những việc bị làm ngược.",
    "openingQuestion": "Việc nào phải làm TRƯỚC TIÊN khi cân nhắc mua bất động sản?",
    "openingOptions": [
      "Xác định mục đích - để ở hay để đầu tư - vì hai việc có tiêu chí khác nhau",
      "Tìm hiểu giá thị trường của khu vực bạn đang quan tâm nhất",
      "Trong phần lớn trường hợp, liên hệ ngân hàng để biết mình được duyệt vay tối đa bao nhiêu",
      "Xem càng nhiều bất động sản càng tốt để có cơ sở so sánh"
    ],
    "correctOption": 0,
    "explanation": "Mua để ở và mua để đầu tư dùng hai bộ tiêu chí gần như không giao nhau. Để ở thì quãng đường đi làm, trường học của con và chất lượng sống quyết định; lợi suất cho thuê gần như không liên quan. Để đầu tư thì lợi suất, thanh khoản và khả năng bán lại quyết định; còn bạn có thích căn nhà ấy hay không thì không quan trọng. Người không phân định rõ từ đầu thường dùng lẫn lộn hai bộ tiêu chí, và kết quả là một tài sản vừa không thoải mái để ở vừa không hiệu quả để đầu tư. Ba việc còn lại đều cần thiết, và cả ba đều chỉ có nghĩa sau khi đã trả lời câu đầu tiên.",
    "diagram": [
      {
        "label": "Để ở hay để đầu tư",
        "arrow": true
      },
      {
        "label": "Tổng chi phí và khả năng trả nợ ở lãi SAU ưu đãi",
        "arrow": true
      },
      {
        "label": "Kiểm pháp lý đầy đủ",
        "arrow": true
      },
      {
        "label": "Rồi mới đặt cọc"
      }
    ],
    "realWorldExample": {
      "company": "Bốn bước, và ba bước hay bị đảo",
      "description": "Trình tự thường gặp trên thực tế: xem nhà, ưng, đặt cọc, rồi mới lo vay và kiểm pháp lý. Trình tự đúng ngược lại gần như hoàn toàn: xác định mục đích, tính tổng chi phí và khả năng trả nợ, kiểm pháp lý, rồi mới cọc. Không bước nào trong bốn bước ấy tốn kém, nhưng làm sai thứ tự thì mọi bước sau đều diễn ra dưới áp lực của khoản cọc đã đặt."
    },
    "quiz": [
      {
        "question": "Vì sao mục đích phải được xác định trước tiên?",
        "options": [
          "Trên thực tế, vì chỉ mua để ở mới được vay với thời hạn dài trên hai mươi năm",
          "Vì ngân hàng áp mức lãi suất khác nhau cho hai mục đích này",
          "Vì thuế phí chuyển nhượng khác nhau tùy theo mục đích sử dụng",
          "Vì để ở và để đầu tư dùng hai bộ tiêu chí gần như không giao nhau"
        ],
        "correct": 3,
        "explanation": "Lẫn lộn hai bộ tiêu chí thường cho ra một tài sản không đạt được mục tiêu nào. Chọn rõ ràng từ đầu giúp loại bỏ nhanh phần lớn lựa chọn không phù hợp."
      },
      {
        "question": "Khả năng trả nợ nên được kiểm bằng con số nào?",
        "options": [
          "Khoản trả hằng tháng ở mức lãi sau kỳ ưu đãi, cộng thêm khoảng đệm",
          "Khoản trả hằng tháng theo mức lãi ưu đãi của năm đầu tiên",
          "Tổng số tiền lãi phải trả trong toàn bộ thời gian vay",
          "Về nguyên tắc, số tiền tối đa mà ngân hàng đã phê duyệt cho hồ sơ của bạn"
        ],
        "correct": 0,
        "explanation": "Hạn mức ngân hàng duyệt là mức họ chấp nhận rủi ro, không phải mức bạn sống được. Hai con số này thường khác nhau, và khoảng cách giữa chúng là chỗ nhiều gia đình gặp khó từ năm thứ hai."
      },
      {
        "question": "Bước nào tuyệt đối không được làm sau khi đặt cọc?",
        "options": [
          "Theo cách hiểu phổ biến, thương lượng giá, vì giá đã được chốt trong hợp đồng đặt cọc",
          "Kiểm tra pháp lý, vì phát hiện vấn đề khi đó chỉ còn hai lựa chọn đều tệ",
          "Làm hồ sơ vay ngân hàng, vì cần có hợp đồng cọc mới nộp được",
          "Đo đạc lại diện tích thực tế của bất động sản định mua"
        ],
        "correct": 1,
        "explanation": "Hồ sơ vay thường đúng là làm sau khi có hợp đồng cọc, nên đó là thứ tự bình thường. Chỉ có kiểm pháp lý là bước mà làm sau sẽ đặt bạn vào tình huống không có lối ra tốt."
      },
      {
        "question": "Khi so sánh hai bất động sản, cơ sở nào đúng?",
        "options": [
          "Mức giá mà người bán đưa ra ban đầu trước khi thương lượng",
          "Giá mỗi mét vuông vì đó là thước đo được thị trường dùng phổ biến",
          "Tổng chi phí sở hữu nhiều năm, gồm cả thuế phí và chi phí định kỳ",
          "Tốc độ tăng giá của khu vực trong ba năm gần nhất"
        ],
        "correct": 2,
        "explanation": "Hai bất động sản cùng giá có thể chênh nhau đáng kể ở phí quản lý, ở chi phí sửa chữa ban đầu, và ở thỏa thuận ai chịu thuế phí. Chỉ tổng chi phí mới đưa chúng về cùng một thước đo."
      },
      {
        "question": "Dấu hiệu nào cho thấy nên dừng lại và xem xét lại?",
        "options": [
          "Nhiều người cho rằng bạn chưa xem đủ số lượng bất động sản mà mình đã dự định xem",
          "Bất động sản có giá cao hơn mức trung bình của khu vực đó",
          "Người bán không đồng ý giảm giá theo mức bạn đề nghị ban đầu",
          "Bạn đang bị giục quyết định gấp, hoặc phải vay thêm để đủ chi phí phát sinh"
        ],
        "correct": 3,
        "explanation": "Hai dấu hiệu này xuất hiện ở gần như mọi giao dịch có vấn đề. Áp lực thời gian ngăn bạn kiểm chứng, còn phải vay thêm để đủ chi phí nghĩa là phép tính ban đầu đã sai ở đâu đó."
      }
    ],
    "keyTakeaways": [
      "Xác định để ở hay để đầu tư trước - hai mục đích dùng hai bộ tiêu chí khác nhau",
      "Kiểm khả năng trả nợ bằng lãi SAU ưu đãi, không bằng hạn mức ngân hàng duyệt",
      "Kiểm pháp lý xong hết rồi mới đặt cọc, không có ngoại lệ",
      "So sánh bằng tổng chi phí sở hữu, không bằng giá mỗi mét vuông"
    ],
    "practicePrompt": {
      "question": "Bạn đã ưng một căn, đã tính đủ tiền, môi giới giục cọc trong hôm nay. Còn thiếu bước nào?",
      "options": [
        "Kiểm pháp lý, và kiểm khả năng trả nợ ở mức lãi sau kỳ ưu đãi",
        "Theo kinh nghiệm thường gặp, xem thêm vài căn khác để chắc chắn đây là lựa chọn tốt nhất",
        "Thương lượng thêm để giảm giá xuống mức thấp hơn nữa",
        "Hỏi ý kiến người thân và bạn bè về căn nhà bạn định mua"
      ],
      "correct": 0,
      "explanation": "Hai bước này là hai chỗ mà sai sót gây hậu quả không sửa được: một bên là rủi ro pháp lý, một bên là khoản trả nợ vượt khả năng từ năm thứ hai. Ba phương án còn lại đều hữu ích nhưng không thuộc loại không sửa được."
    },
    "summary": {
      "keyIdea": "Bốn bước theo đúng thứ tự: mục đích, tài chính, pháp lý, rồi mới cọc",
      "commonMistake": "Đặt cọc trước rồi mới lo pháp lý và khoản vay - mọi bước sau đó đều dưới áp lực",
      "action": "Trước giao dịch tiếp theo, viết ra bốn bước và không bỏ qua bước nào."
    },
    "application": {
      "title": "Bốn bước, theo đúng thứ tự",
      "message": "Một: để ở hay để đầu tư. Hai: tổng chi phí và khoản trả hằng tháng ở lãi sau ưu đãi. Ba: kiểm đủ bốn mục pháp lý. Bốn: đặt cọc với điều khoản hoàn cọc rõ ràng.",
      "secondary": "Không bước nào tốn kém, và cả bốn cộng lại mất ít thời gian hơn nhiều so với việc xử lý hậu quả của một bước bị bỏ qua."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bảy bài trước là bảy chỗ mất tiền trong một giao dịch bất động sản. Bài này không thêm chỗ nào - nó chỉ xếp chúng theo thứ tự mà một người thật sự phải đi qua."
      },
      {
        "type": "heading",
        "text": "Vì sao thứ tự lại quyết định"
      },
      {
        "type": "paragraph",
        "text": "Ba bước đầu đều rẻ và đều làm được trong vài ngày. Bước thứ tư - đặt cọc - là bước tạo ra cam kết tài chính. Khi thứ tự bị đảo và cọc đi trước, cả ba bước còn lại đều diễn ra dưới áp lực của một khoản tiền đã ra khỏi tài khoản. Áp lực ấy làm người ta bỏ qua những phát hiện đáng lẽ phải khiến họ dừng lại, vì dừng lại lúc đó đồng nghĩa với mất tiền."
      },
      {
        "type": "conceptTable",
        "title": "Bốn bước, và cái giá của việc bỏ qua",
        "subtitle": "Ba bước đầu rẻ; bước thứ tư là bước không lùi được",
        "concepts": [
          {
            "vi": "Xác định mục đích",
            "en": "Purpose",
            "def": "Để ở hay để đầu tư. Bỏ qua thì bạn dùng lẫn hai bộ tiêu chí và thường được một tài sản không đạt mục tiêu nào."
          },
          {
            "vi": "Tính tài chính",
            "en": "Affordability",
            "def": "Tổng chi phí gồm thuế phí, và khoản trả hằng tháng ở lãi sau ưu đãi. Bỏ qua thì chật vật từ năm thứ hai."
          },
          {
            "vi": "Kiểm pháp lý",
            "en": "Legal check",
            "def": "Thế chấp, tranh chấp, quy hoạch, thẩm quyền ký. Bỏ qua thì rủi ro không sửa được bằng tiền."
          },
          {
            "vi": "Đặt cọc",
            "en": "Deposit",
            "def": "Cam kết có chế tài hai chiều. Đây là bước duy nhất tạo ra ràng buộc, nên nó phải đứng cuối."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Áp lực thời gian là dấu hiệu chung của mọi giao dịch có vấn đề",
        "text": "Nó cũng xuất hiện trong nhiều giao dịch hoàn toàn bình thường, và bạn không phân biệt được hai trường hợp từ bên ngoài. Nên quy tắc phải giống nhau ở cả hai: không rút ngắn ba bước đầu để kịp một mốc do người khác đặt ra. Mất một cơ hội là chuyện chịu được; mua phải một tài sản vướng pháp lý hoặc một khoản vay vượt sức thì không."
      },
      {
        "type": "closing",
        "lines": [
          "Hết Chặng 17. Với giao dịch lớn nhất đời người, thứ tự làm việc quan trọng hơn mọi mẹo thương lượng.",
          "Và bước duy nhất không lùi được luôn phải là bước cuối cùng."
        ]
      }
    ]
  }
];
