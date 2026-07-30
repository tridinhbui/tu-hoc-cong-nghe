const d = (...labels) => labels.map((label, index) => ({ label, arrow: index < labels.length - 1 }));

const q = (question, options, correct, explanation) => ({
  question,
  options,
  correct,
  explanation,
});

const patch = (lesson) => lesson;

export const lessonOverrides = {
  "khau-hao-co-ban": patch({
    "quiz": [
      {
        "question": "Báo cáo kết quả kinh doanh (P&L) trả lời câu hỏi nào?",
        "options": [
          "Công ty đang nợ bao nhiêu?",
          "Công ty có gì?",
          "Công ty lãi hay lỗ trong kỳ?",
          "Công ty có bao nhiêu tiền mặt?"
        ],
        "correct": 2,
        "explanation": "P&L (Income Statement) cho biết doanh thu trừ đi chi phí = lợi nhuận ròng của kỳ."
      },
      {
        "question": "P&L là báo cáo của khoảng thời gian nào?",
        "options": [
          "Thời điểm cụ thể (như 31/12)",
          "Khoảng thời gian (quý, năm) - từ ngày này đến ngày kia",
          "Không có thời gian cụ thể",
          "Liên tục"
        ],
        "correct": 1,
        "explanation": "P&L là báo cáo hiệu quả vận hành trong một chu kỳ (tháng, quý, năm), khác với bảng cân đối (thời điểm)."
      },
      {
        "question": "COGS (Chi phí vốn hàng bán) nằm ở phần nào của P&L?",
        "options": [
          "Ở dưới cùng (chi phí vận hành)",
          "Nằm ngay sau doanh thu (để tính Gross Profit)",
          "Không nằm trên P&L",
          "Ở cuối cùng"
        ],
        "correct": 1,
        "explanation": "Cấu trúc P&L: Revenue - COGS = Gross Profit - Operating Expenses = Operating Income - Interest & Tax = Net Income."
      },
      {
        "question": "Chi phí trả trước (Prepaid Insurance) được ghi nhận trên P&L năm nay bao nhiêu?",
        "options": [
          "Toàn bộ chi phí trả trước",
          "Chỉ phần bảo hiểm đã được sử dụng trong năm nay",
          "Không ghi nhận gì",
          "Một nửa"
        ],
        "correct": 1,
        "explanation": "Accrual accounting: chi phí khi dùng, không khi trả. Nên P&L ghi lần lần theo mức sử dụng."
      },
      {
        "question": "Nếu P&L cho thấy công ty lãi 100 triệu nhưng dòng tiền âm, nguyên nhân có thể là?",
        "options": [
          "Do bộ phận kế toán của công ty đã tính toán sai sót ở đâu đó trong báo cáo tài chính kỳ này",
          "Vì công ty chi nhiều tiền mua tài sản mới (CapEx) hoặc bị đọng vốn trong tồn kho, khoản phải thu",
          "Không tồn tại bất kỳ lý do hợp lý nào có thể giải thích cho sự chênh lệch này",
          "Đơn giản chỉ vì khoản nợ phải trả của công ty đã tăng lên trong kỳ báo cáo"
        ],
        "correct": 1,
        "explanation": "P&L ≠ Cash Flow. P&L ghi nhận lợi nhuận kế toán, nhưng dòng tiền thực tế bị âm do chi đầu tư tài sản cố định mới (CapEx không trừ ngay vào P&L) hoặc tiền bị khóa trong tồn kho và khoản phải thu chưa thu được tiền."
      },
      {
        "question": "Scenario: Công ty bán 1.000 sản phẩm với giá 100k/sản phẩm, COGS = 50k/sản phẩm. Gross Profit bằng?",
        "options": [
          "50 triệu",
          "100 triệu",
          "50 tỷ",
          "Không thể xác định"
        ],
        "correct": 0,
        "explanation": "Revenue = 1.000 × 100k = 100 triệu. COGS = 1.000 × 50k = 50 triệu. Gross Profit = 100 - 50 = 50 triệu."
      },
      {
        "question": "Nếu Operating Income = 200 triệu, lãi vay = 50 triệu, thuế = 30 triệu. Net Income bằng?",
        "options": [
          "200 triệu",
          "170 triệu",
          "120 triệu",
          "Không thể xác định"
        ],
        "correct": 2,
        "explanation": "Net Income = Operating Income - Interest - Taxes = 200 - 50 - 30 = 120 triệu."
      }
    ]
  }),
  "working-capital-van-hanh": patch({
    "quiz": [
      {
        "question": "CCC = DIO + DSO - DPO. Đo:",
        "options": [
          "Doanh thu",
          "Thời gian từ chi tiền mua hàng đến nhận tiền bán hàng - ngắn = tốt",
          "Tiền vào ra",
          "Không định nghĩa"
        ],
        "correct": 1,
        "explanation": "CCC ngắn = công ty không phải chờ lâu = dòng tiền tốt."
      },
      {
        "question": "CCC = 10 ngày:",
        "options": [
          "Xấu, quá ngắn",
          "Tốt, rất ngắn = không phải chờ = dòng tiền tốt",
          "Không quyết định được",
          "Phụ thuộc doanh số"
        ],
        "correct": 1,
        "explanation": "CCC ngắn = ít vốn lưu động = dòng tiền mạnh. Amazon ~5 ngày, startup 60+ ngày."
      },
      {
        "question": "Để giảm chu kỳ chuyển đổi tiền mặt (CCC), doanh nghiệp nên áp dụng chiến lược nào?",
        "options": [
          "Chỉ bán hàng nhanh hơn (giảm DIO)",
          "Kết hợp: Xoay vòng kho nhanh (↓DIO) + Thu tiền khách nhanh (↓DSO) + Đàm phán kéo dài thời gian trả nợ nhà cung cấp (↑DPO)",
          "Cắt giảm doanh thu để giảm tồn kho",
          "Tăng thời gian cho khách nợ và trả nợ nhà cung cấp ngay lập tức"
        ],
        "correct": 1,
        "explanation": "Công thức CCC = DIO + DSO - DPO. Để giảm CCC (giúp giải phóng tiền mặt nhanh hơn), doanh nghiệp cần kết hợp bán hàng nhanh (↓DIO), thu tiền khách nhanh (↓DSO) và tận dụng thời gian trả chậm từ nhà cung cấp (↑DPO)."
      },
      {
        "question": "Startup CCC dài vì:",
        "options": [
          "Quản lý tệ",
          "Không lịch sử → nhà cung cấp không cho nợ + khách chậm trả",
          "Vì luật pháp",
          "Vì không vốn"
        ],
        "correct": 1,
        "explanation": "Startup CCC dài = cần vốn lưu động lớn = thiếu tiền dù lãi."
      },
      {
        "question": "CCC tăng từ 30 lên 40 ngày, ảnh hưởng:",
        "options": [
          "Doanh thu giảm",
          "Cần vốn lưu động thêm ~10 ngày doanh thu/ngày",
          "Không ảnh hưởng",
          "Lợi nhuận tăng"
        ],
        "correct": 1,
        "explanation": "CCC tăng = cần tiền mặt thêm = dòng tiền bị thắt chặt."
      },
      {
        "question": "JIT inventory giúp giảm CCC bằng:",
        "options": [
          "Không giúp",
          "Giảm DIO bằng cách chỉ mua hàng khi cần",
          "Tăng giá",
          "Giảm chất lượng"
        ],
        "correct": 1,
        "explanation": "JIT = DIO ~0 = tiền mặt nhả ra nhanh = CCC ngắn."
      },
      {
        "question": "Startup ưu tiên tối ưu CCC hay tăng lãi:",
        "options": [
          "Tỉ tăng lãi",
          "Tối ưu CCC trước (sống sót), sau tăng lãi",
          "Tỉ tối ưu CCC",
          "Không quan trọng"
        ],
        "correct": 1,
        "explanation": "Lãi nhưng thiếu tiền → phá sản. Sống sót trước, lãi sau."
      }
    ]
  }),
  "discontinued-operations": patch({
    "openingQuestion": "Net Income = 50 tỷ, trong đó Discontinued Ops gain = 80 tỷ. Continuing Operations thực chất là bao nhiêu?",
    "openingOptions": [
      "-30 tỷ",
      "0 tỷ",
      "50 tỷ",
      "130 tỷ"
    ],
    "correctOption": 0,
    "explanation": "50 = Continuing + 80, nên Continuing Operations = -30 tỷ. Core business đang lỗ dù Net Income nhìn có vẻ dương - đây là lý do nhà phân tích luôn tách riêng hai phần này trước khi đánh giá sức khỏe thực sự của doanh nghiệp.",
    "diagram": [
      {
        "label": "Net Income tổng",
        "arrow": true
      },
      {
        "label": "Tách discontinued ops",
        "arrow": true
      },
      {
        "label": "Ra continuing operations",
        "arrow": true
      },
      {
        "label": "Chỉ nhìn phần continuing để đánh giá core business",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Doanh nghiệp thoái vốn một mảng kinh doanh",
      "description": "Khi một tập đoàn bán đứt một công ty con, khoản lãi từ giao dịch đó được ghi vào phần Discontinued Operations chứ không phải kết quả hoạt động lõi. Nếu năm đó mảng lõi lỗ, con số Net Income tổng vẫn có thể dương nhờ khoản lãi một lần này. Nhà phân tích vì vậy luôn đọc theo thứ tự ngược lại: bắt đầu từ dòng lợi nhuận từ hoạt động tiếp tục, rồi mới xem phần một lần đóng góp bao nhiêu - chứ không đọc từ dòng cuối lên."
    },
    "quiz": [
      {
        "question": "Điều nào nên làm đầu tiên khi thấy một khoản lợi nhuận đột biến trong báo cáo?",
        "options": [
          "Cộng luôn vào giá trị doanh nghiệp",
          "Tách xem là continuing hay discontinued",
          "Bỏ qua vì chỉ là kế toán",
          "Dùng ngay để dự báo năm sau"
        ],
        "correct": 1,
        "explanation": "Bài học quan trọng nhất là tách lợi nhuận lõi khỏi khoản một lần để tránh bị Net Income đánh lừa."
      },
      {
        "question": "Nếu một công ty liên tục có discontinued gains mỗi năm, tín hiệu đó thường nói gì?",
        "options": [
          "Doanh nghiệp rất khỏe",
          "Chỉ là may mắn ngẫu nhiên",
          "Cần soi lại chất lượng capital allocation và tính bền vững của lợi nhuận",
          "Không có ý nghĩa gì"
        ],
        "correct": 2,
        "explanation": "Khoản một lần lặp lại nhiều kỳ thường không còn là 'one-off' nữa, mà là dấu hiệu cần đọc kỹ mô hình kinh doanh."
      },
      {
        "question": "Một doanh nghiệp có khoản lãi từ hoạt động đã ngừng xuất hiện đều trong 4 năm liên tiếp. Điều này gợi ý gì?",
        "options": [
          "Cần soi lại: khoản 'một lần' lặp lại nhiều kỳ thường phản ánh mô hình bán tài sản để bù đắp hoạt động lõi yếu",
          "Doanh nghiệp đang rất khỏe vì năm nào cũng có thêm lợi nhuận",
          "Đây là hiện tượng kế toán bình thường, không cần chú ý",
          "Nên cộng toàn bộ vào lợi nhuận lõi để so sánh"
        ],
        "correct": 0,
        "explanation": "Bản chất của khoản một lần là không lặp lại. Khi nó lặp lại đều đặn, câu hỏi đúng là doanh nghiệp đang sống bằng bán tài sản hay bằng kinh doanh."
      },
      {
        "question": "Khi phân tích một doanh nghiệp vừa bán một mảng kinh doanh, câu hỏi quan trọng nhất về phần doanh thu bị hụt là gì?",
        "options": [
          "Mảng đó trước đây đóng góp bao nhiêu doanh thu và lợi nhuận, và năm sau lấy gì bù đắp",
          "Giá bán có cao hơn giá trị sổ sách không",
          "Bên mua là ai",
          "Giao dịch có được kiểm toán không"
        ],
        "correct": 0,
        "explanation": "Khoản lãi từ giao dịch chỉ ảnh hưởng một kỳ, nhưng phần doanh thu và lợi nhuận mất đi ảnh hưởng mọi kỳ sau. Đó mới là thứ định hình bức tranh tương lai."
      }
    ],
    "keyTakeaways": [
      "Luôn tách Continuing Operations khi phân tích",
      "Discontinued ops là khoản một lần, không dùng để value core business",
      "Lợi nhuận đột biến lặp lại nhiều kỳ là red flag"
    ],
    "summary": {
      "keyIdea": "Đọc lợi nhuận lõi trước khi tin vào Net Income.",
      "commonMistake": "Nhìn số lãi cuối cùng mà quên hỏi lãi đó đến từ đâu.",
      "action": "Mở báo cáo tài chính và so sánh Net Income với Continuing Operations trong 2-3 kỳ gần nhất."
    },
    "application": {
      "title": "Đọc báo cáo thật",
      "message": "Lấy một báo cáo tài chính gần nhất, tìm dòng continuing vs discontinued operations rồi đánh dấu khoản nào là lõi, khoản nào là một lần.",
      "secondary": "Nếu khoản một lần quá lớn so với core business, đừng dự báo tương lai dựa trên Net Income tổng."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Net Income đẹp không phải lúc nào cũng nghĩa là hoạt động kinh doanh chính đang khỏe. Khi một công ty thoái vốn hoặc bán mảng kinh doanh, khoản lãi/lỗ một lần đó có thể làm con số cuối cùng trông rất khác với thực tế vận hành."
      },
      {
        "type": "heading",
        "text": "Tách Continuing Operations khỏi Discontinued Operations"
      },
      {
        "type": "paragraph",
        "text": "Báo cáo kết quả kinh doanh chuẩn tách riêng lợi nhuận từ hoạt động đang tiếp tục (Continuing Operations) và lợi nhuận/lỗ từ mảng đã hoặc sắp ngừng hoạt động (Discontinued Operations). Một khoản lãi lớn từ việc bán mảng kinh doanh có thể đẩy Net Income tổng lên rất cao trong một kỳ, nhưng không nói lên gì về khả năng sinh lời của phần công ty còn lại."
      },
      {
        "type": "list",
        "items": [
          "Luôn tách Continuing Operations trước khi đánh giá sức khỏe kinh doanh",
          "Discontinued ops là khoản một lần, không dùng để dự báo tương lai",
          "Lợi nhuận đột biến lặp lại nhiều kỳ là dấu hiệu cần soi kỹ, không còn là 'one-off' nữa"
        ]
      },
      {
        "type": "formula",
        "title": "Tách hai phần trong báo cáo kết quả kinh doanh",
        "equation": "Net Income = Lợi nhuận từ hoạt động tiếp tục + Lãi/lỗ từ hoạt động đã ngừng",
        "variables": [
          {
            "symbol": "Continuing",
            "name": "Hoạt động tiếp tục",
            "description": "Phần kinh doanh doanh nghiệp còn giữ - đây mới là cơ sở để dự báo tương lai."
          },
          {
            "symbol": "Discontinued",
            "name": "Hoạt động đã/sắp ngừng",
            "description": "Mảng đã bán hoặc sắp đóng, gồm cả lãi/lỗ từ chính giao dịch bán."
          }
        ],
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "Net Income 50 tỷ = Continuing + 80 tỷ",
          "result": "Continuing = −30 tỷ",
          "explanation": "Doanh nghiệp báo lãi 50 tỷ, nhưng toàn bộ đến từ khoản lãi 80 tỷ khi bán mảng kinh doanh. Hoạt động lõi thực tế lỗ 30 tỷ - và đó mới là con số nói lên năm sau sẽ ra sao."
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đọc từ dòng cuối lên",
          "text": "\"Net Income 50 tỷ, tăng so với năm trước - doanh nghiệp đang cải thiện.\" Kết luận sai vì phần tăng đến từ một giao dịch không lặp lại."
        },
        "right": {
          "label": "Đọc từ hoạt động lõi xuống",
          "text": "\"Hoạt động tiếp tục lỗ 30 tỷ; lãi 80 tỷ đến từ bán mảng X, là khoản một lần. Cần xem mảng lõi năm sau còn nguồn thu bù đắp nào không.\""
        }
      },
      {
        "type": "heading",
        "text": "Ba chỗ cần soi khi thấy khoản một lần lớn"
      },
      {
        "type": "list",
        "items": [
          "Khoản đó có thực sự một lần không - kiểm tra 3-5 năm gần nhất xem 'one-off' có xuất hiện đều đặn hay không.",
          "Mảng bị bán đóng góp bao nhiêu doanh thu và lợi nhuận trước đây - phần hụt này năm sau lấy gì bù?",
          "Tiền bán thu về được dùng làm gì: trả nợ, tái đầu tư, hay chia cổ tức. Đây là chỉ dấu về chất lượng phân bổ vốn."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Con số cuối cùng trên báo cáo chỉ là điểm khởi đầu.",
          "Luôn hỏi: lợi nhuận này đến từ đâu, và nó có lặp lại được không?"
        ]
      }
    ]
  }),
  "on-tap-wacc": patch({
    "openingQuestion": "WACC = Ke × We + Kd × (1−t) × Wd. Vì sao chi phí nợ phải nhân (1−t)?",
    "openingOptions": [
      "Vì nợ không có rủi ro",
      "Vì lãi vay được trừ thuế",
      "Vì nợ luôn rẻ hơn vốn chủ",
      "Vì kế toán yêu cầu"
    ],
    "correctOption": 1,
    "explanation": "Lãi vay tạo ra tax shield, làm chi phí nợ thực tế thấp hơn lãi suất danh nghĩa - vì lãi vay được khấu trừ trước thuế, nhà nước gián tiếp chia sẻ một phần chi phí lãi vay với doanh nghiệp thông qua khoản thuế được giảm trừ.",
    "diagram": [
      {
        "label": "Chi phí vốn cổ phần",
        "arrow": true
      },
      {
        "label": "Chi phí nợ sau thuế",
        "arrow": true
      },
      {
        "label": "Trọng số vốn",
        "arrow": true
      },
      {
        "label": "Ra WACC",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Vì sao không thể vay mãi để hạ WACC",
      "description": "Trên lý thuyết, vì nợ rẻ hơn vốn chủ nhờ lá chắn thuế, tăng tỷ trọng nợ sẽ kéo WACC xuống. Nhưng điều đó chỉ đúng đến một ngưỡng. Khi nợ vượt mức an toàn, ngân hàng đòi lãi suất cao hơn, xếp hạng tín nhiệm bị hạ, và cổ đông cũng đòi hỏi tỷ suất sinh lời cao hơn vì rủi ro phá sản tăng. Cả chi phí nợ lẫn chi phí vốn chủ cùng tăng, và WACC quay đầu đi lên. Đây là lý do mỗi doanh nghiệp có một vùng cấu trúc vốn hợp lý riêng thay vì một tỷ lệ nợ tối ưu chung cho mọi ngành."
    },
    "quiz": [
      {
        "question": "WACC thường được dùng như gì trong định giá?",
        "options": [
          "Lợi nhuận tối đa cần đạt",
          "Hurdle rate tối thiểu",
          "Lãi suất ngân hàng",
          "Biên lợi nhuận gộp"
        ],
        "correct": 1,
        "explanation": "WACC là mức lợi nhuận tối thiểu dự án phải vượt qua để tạo giá trị."
      },
      {
        "question": "Điều nào có thể làm WACC tăng?",
        "options": [
          "Fed tăng lãi suất",
          "Công ty giữ nhiều tiền mặt hơn",
          "ROIC cao hơn WACC",
          "Tăng tax shield vô hạn"
        ],
        "correct": 0,
        "explanation": "Khi risk-free rate tăng, cost of equity và chi phí vốn thường tăng theo."
      },
      {
        "question": "Vì sao tăng tỷ trọng nợ không thể hạ WACC mãi mãi?",
        "options": [
          "Vì vượt ngưỡng an toàn, cả chi phí nợ lẫn chi phí vốn chủ đều tăng do rủi ro phá sản, kéo WACC quay đầu đi lên",
          "Vì luật giới hạn tỷ lệ nợ tối đa của doanh nghiệp",
          "Vì lá chắn thuế chỉ áp dụng cho khoản vay đầu tiên",
          "Vì ngân hàng không cho vay quá ba lần vốn chủ"
        ],
        "correct": 0,
        "explanation": "Lợi ích lá chắn thuế bị triệt tiêu dần bởi chi phí kiệt quệ tài chính. Giao điểm của hai lực này tạo ra vùng cấu trúc vốn hợp lý cho từng doanh nghiệp."
      },
      {
        "question": "Dùng WACC của toàn doanh nghiệp để đánh giá một dự án rủi ro cao hơn hẳn hoạt động lõi sẽ dẫn tới điều gì?",
        "options": [
          "Đánh giá quá lạc quan, vì dự án rủi ro cao lẽ ra phải bị chiết khấu bằng tỷ suất cao hơn",
          "Đánh giá quá bi quan",
          "Không ảnh hưởng gì vì WACC là chỉ số của doanh nghiệp",
          "Chỉ ảnh hưởng đến báo cáo thuế"
        ],
        "correct": 0,
        "explanation": "Tỷ suất chiết khấu phải phản ánh rủi ro của chính dòng tiền được chiết khấu. Dùng WACC chung cho dự án rủi ro cao là hạ thấp mức đòi hỏi, khiến dự án trông hấp dẫn hơn thực tế."
      }
    ],
    "keyTakeaways": [
      "WACC là hurdle rate tối thiểu",
      "Debt rẻ hơn equity vì tax shield, nhưng nợ quá cao làm rủi ro tăng",
      "WACC không cố định, nó thay đổi theo lãi suất và cấu trúc vốn"
    ],
    "summary": {
      "keyIdea": "WACC là giá vốn bình quân của toàn bộ nguồn vốn.",
      "commonMistake": "Nhầm chi phí nợ danh nghĩa với chi phí nợ sau thuế.",
      "action": "Thử tính WACC sơ bộ cho một công ty bạn đang theo dõi."
    },
    "application": {
      "title": "Thử tính ngay",
      "message": "Chọn một công ty bạn biết, ước lượng tỷ trọng nợ/vốn chủ, rồi tính sơ bộ WACC bằng lãi suất nợ sau thuế và cost of equity.",
      "secondary": "Dù chỉ là ước lượng, bạn sẽ thấy vì sao nợ rẻ hơn equity nhưng không phải lúc nào cũng tốt hơn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "WACC (Weighted Average Cost of Capital) là một trong những con số quan trọng nhất trong tài chính doanh nghiệp - nhưng cũng là con số dễ bị hiểu sai nhất."
      },
      {
        "type": "heading",
        "text": "Vì sao chi phí nợ phải nhân (1−t)"
      },
      {
        "type": "paragraph",
        "text": "Lãi vay được khấu trừ trước thuế thu nhập doanh nghiệp, tạo ra 'tax shield' - nhà nước gián tiếp chia sẻ một phần chi phí lãi vay với doanh nghiệp. Vì vậy chi phí nợ THỰC TẾ luôn thấp hơn lãi suất danh nghĩa ghi trên hợp đồng vay, và công thức WACC phải nhân với (1−t) để phản ánh đúng chi phí sau thuế này."
      },
      {
        "type": "list",
        "items": [
          "WACC là hurdle rate tối thiểu một dự án phải vượt qua để tạo giá trị",
          "Nợ rẻ hơn vốn chủ nhờ tax shield, nhưng nợ quá cao làm tăng rủi ro phá sản",
          "WACC không cố định - nó thay đổi theo lãi suất thị trường và cấu trúc vốn của doanh nghiệp"
        ]
      },
      {
        "type": "formula",
        "title": "Công thức WACC",
        "equation": "WACC = (E/V) × Re + (D/V) × Rd × (1 − t)",
        "variables": [
          {
            "symbol": "E/V",
            "name": "Tỷ trọng vốn chủ",
            "description": "Giá trị vốn chủ chia tổng vốn (E + D). Thường tính theo giá thị trường, không theo sổ sách."
          },
          {
            "symbol": "Re",
            "name": "Chi phí vốn chủ",
            "description": "Tỷ suất sinh lời cổ đông đòi hỏi, thường ước lượng bằng CAPM."
          },
          {
            "symbol": "D/V",
            "name": "Tỷ trọng nợ",
            "description": "Giá trị nợ vay chia tổng vốn."
          },
          {
            "symbol": "Rd",
            "name": "Chi phí nợ",
            "description": "Lãi suất vay bình quân trước thuế."
          },
          {
            "symbol": "t",
            "name": "Thuế suất",
            "description": "Thuế suất thuế thu nhập doanh nghiệp - nguồn gốc của lá chắn thuế."
          }
        ],
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "0,6 × 14% + 0,4 × 9% × (1 − 20%)",
          "result": "= 8,4% + 2,88% = 11,28%",
          "explanation": "Doanh nghiệp 60% vốn chủ, 40% nợ; cổ đông đòi 14%, lãi vay 9%, thuế 20%. Chi phí nợ sau thuế chỉ còn 7,2% chứ không phải 9% - phần chênh lệch chính là lá chắn thuế."
        }
      },
      {
        "type": "heading",
        "text": "Bốn lỗi hay gặp khi tính và dùng WACC"
      },
      {
        "type": "list",
        "items": [
          "Lấy tỷ trọng theo giá trị sổ sách thay vì giá thị trường - sai lệch rất lớn với doanh nghiệp niêm yết có thị giá cao hơn nhiều so với vốn điều lệ.",
          "Quên nhân (1 − t) cho chi phí nợ, làm WACC bị đội lên và mọi dự án đều trông kém hấp dẫn.",
          "Dùng WACC của cả doanh nghiệp cho một dự án có mức rủi ro khác hẳn hoạt động lõi.",
          "Coi WACC là con số cố định tra một lần rồi dùng mãi, trong khi nó thay đổi theo lãi suất thị trường và cấu trúc vốn."
        ]
      },
      {
        "type": "callout",
        "label": "Nhớ một câu",
        "text": "WACC là mức sinh lời tối thiểu để dự án không phá hủy giá trị. Dự án sinh lời 10% trong khi WACC là 11,28% thì dù có lãi kế toán, nó vẫn đang làm nghèo cổ đông đi."
      },
      {
        "type": "closing",
        "lines": [
          "WACC không phải một con số cố định để tra bảng.",
          "Nó phản ánh đúng chi phí thực sự của từng đồng vốn doanh nghiệp đang sử dụng."
        ]
      }
    ]
  }),
  "roic": patch({
    "openingQuestion": "ROIC = NOPAT / Invested Capital. Vì sao ROIC tốt hơn ROE để đánh giá hiệu quả?",
    "openingOptions": [
      "ROIC luôn cao hơn ROE",
      "ROIC không bị bóp méo bởi leverage",
      "ROIC dễ tính hơn",
      "ROIC chỉ dùng cho ngân hàng"
    ],
    "correctOption": 1,
    "explanation": "ROE có thể tăng chỉ nhờ vay nợ nhiều hơn, ngay cả khi hiệu quả kinh doanh lõi không đổi. ROIC đo hiệu quả trên toàn bộ vốn đầu tư (cả nợ lẫn vốn chủ) nên nhìn được chất lượng tạo giá trị thật, không bị đòn bẩy tài chính làm méo mó.",
    "diagram": [
      {
        "label": "NOPAT",
        "arrow": true
      },
      {
        "label": "Chia cho invested capital",
        "arrow": true
      },
      {
        "label": "So với WACC",
        "arrow": true
      },
      {
        "label": "Ra giá trị tạo thêm",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Hai doanh nghiệp cùng ROE 20%",
      "description": "Doanh nghiệp A có ROE 20% với tỷ lệ nợ rất thấp; doanh nghiệp B cũng ROE 20% nhưng vốn chủ chỉ chiếm một phần ba tổng nguồn vốn, phần còn lại là vay. Nhìn ROE, hai bên như nhau. Nhìn ROIC, khoảng cách lộ ra: A tạo ra mức sinh lời đó trên toàn bộ vốn sử dụng, còn B đang khuếch đại một mức sinh lời lõi thấp hơn bằng đòn bẩy. Khi lãi suất tăng hoặc doanh thu giảm, B chịu ảnh hưởng nặng hơn nhiều - đòn bẩy khuếch đại cả hai chiều, không chỉ chiều đi lên."
    },
    "quiz": [
      {
        "question": "ROIC > WACC thường hàm ý gì?",
        "options": [
          "Doanh nghiệp đang phá hủy giá trị",
          "Doanh nghiệp tạo giá trị",
          "Doanh nghiệp chắc chắn sẽ tăng giá cổ phiếu",
          "Doanh nghiệp không cần tăng trưởng"
        ],
        "correct": 1,
        "explanation": "Khi lợi nhuận trên vốn đầu tư lớn hơn chi phí vốn, công ty đang tạo thêm giá trị."
      },
      {
        "question": "ROIC tăng nhưng tăng trưởng không đổi thường kéo theo gì?",
        "options": [
          "FCF thấp hơn",
          "FCF cao hơn",
          "Nợ tăng tự động",
          "Biên lợi nhuận gộp giảm"
        ],
        "correct": 1,
        "explanation": "ROIC cao hơn đồng nghĩa cần tái đầu tư ít hơn để đạt cùng tăng trưởng, nên free cash flow tăng."
      },
      {
        "question": "Hai doanh nghiệp cùng ROE 20% nhưng ROIC lần lượt là 18% và 9%. Điều đó nói lên gì?",
        "options": [
          "Doanh nghiệp ROIC 9% đang dựa nhiều vào đòn bẩy để đạt cùng mức ROE, nên rủi ro hơn khi lãi suất tăng",
          "Hai doanh nghiệp có chất lượng như nhau vì ROE bằng nhau",
          "Doanh nghiệp ROIC 9% có chất lượng lợi nhuận tốt hơn",
          "ROIC thấp hơn ROE là dấu hiệu sai sót kế toán"
        ],
        "correct": 0,
        "explanation": "Khoảng cách giữa ROE và ROIC chính là phần đóng góp của đòn bẩy tài chính. Khoảng cách càng rộng, ROE càng phụ thuộc vào việc vay nợ thay vì vào hiệu quả kinh doanh."
      },
      {
        "question": "Vì sao NOPAT dùng EBIT thay vì lợi nhuận sau thuế thông thường?",
        "options": [
          "Vì EBIT chưa trừ lãi vay, nên tử số không bị ảnh hưởng bởi cách doanh nghiệp tài trợ vốn",
          "Vì EBIT luôn lớn hơn nên chỉ số đẹp hơn",
          "Vì lợi nhuận sau thuế không có trong báo cáo",
          "Vì chuẩn mực kế toán yêu cầu như vậy"
        ],
        "correct": 0,
        "explanation": "Mẫu số của ROIC gồm cả nợ, nên tử số cũng phải là lợi nhuận thuộc về cả chủ nợ lẫn cổ đông - tức trước lãi vay. Giữ nhất quán tử số và mẫu số là điều làm ROIC trung lập với cấu trúc vốn."
      }
    ],
    "keyTakeaways": [
      "ROIC đo hiệu quả trên toàn bộ capital, không chỉ equity",
      "ROIC > WACC = tạo value",
      "ROIC cao thường đi cùng valuation premium"
    ],
    "summary": {
      "keyIdea": "ROIC là thước đo tốt hơn ROE để nhìn chất lượng tạo giá trị.",
      "commonMistake": "Bị ROE cao đánh lừa mà quên đòn bẩy nợ.",
      "action": "So sánh ROIC và WACC của một công ty trước khi kết luận nó đáng mua."
    },
    "application": {
      "title": "Đọc báo cáo thật",
      "message": "Lấy một công ty bạn quen, ước lượng NOPAT và invested capital rồi so với WACC để xem doanh nghiệp đó đang tạo hay phá hủy giá trị.",
      "secondary": "Nếu ROIC thấp hơn WACC, tăng trưởng chưa chắc là tốt."
    },
    "sections": [
      {
        "type": "lead",
        "text": "ROE (Return on Equity) là chỉ số quen thuộc, nhưng nó có một điểm yếu lớn: một công ty có thể đẩy ROE lên chỉ bằng cách vay nợ nhiều hơn, mà không thực sự cải thiện hiệu quả kinh doanh."
      },
      {
        "type": "heading",
        "text": "ROIC nhìn toàn bộ vốn, không chỉ vốn chủ"
      },
      {
        "type": "paragraph",
        "text": "ROIC (Return on Invested Capital) = NOPAT / Invested Capital, đo lợi nhuận trên TOÀN BỘ vốn đầu tư - cả nợ lẫn vốn chủ sở hữu. Vì mẫu số đã bao gồm cả nợ, ROIC không bị 'thổi phồng' bởi đòn bẩy tài chính như ROE, nên nó phản ánh đúng hơn khả năng tạo giá trị thực của hoạt động kinh doanh cốt lõi."
      },
      {
        "type": "list",
        "items": [
          "ROIC > WACC nghĩa là doanh nghiệp đang tạo thêm giá trị cho nhà đầu tư",
          "ROIC cao hơn giúp doanh nghiệp cần tái đầu tư ít hơn để đạt cùng mức tăng trưởng, nên FCF thường cao hơn",
          "Doanh nghiệp ROIC cao và ổn định thường được thị trường định giá cao hơn (valuation premium)"
        ]
      },
      {
        "type": "formula",
        "title": "Công thức ROIC",
        "equation": "ROIC = NOPAT ÷ Vốn đầu tư",
        "variables": [
          {
            "symbol": "NOPAT",
            "name": "Lợi nhuận hoạt động sau thuế",
            "description": "EBIT × (1 − thuế suất). Dùng EBIT nên chưa trừ lãi vay - đó là lý do ROIC không bị đòn bẩy làm méo."
          },
          {
            "symbol": "Vốn đầu tư",
            "name": "Invested capital",
            "description": "Vốn chủ + nợ vay − tiền mặt dư thừa. Tức toàn bộ vốn thực sự đang dùng cho hoạt động kinh doanh."
          }
        ],
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "EBIT 500 tỷ × (1 − 20%) ÷ 2.500 tỷ",
          "result": "= 400 ÷ 2.500 = 16%",
          "explanation": "Mỗi 100 đồng vốn đưa vào kinh doanh tạo ra 16 đồng lợi nhuận hoạt động sau thuế. Nếu WACC là 11%, doanh nghiệp đang tạo thêm 5 điểm phần trăm giá trị trên mỗi đồng vốn."
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "ROE",
          "text": "Mẫu số chỉ có vốn chủ. Vay thêm nợ để tài trợ cùng hoạt động sẽ làm mẫu số nhỏ đi và ROE tăng lên, dù hiệu quả kinh doanh không đổi."
        },
        "right": {
          "label": "ROIC",
          "text": "Mẫu số gồm cả nợ lẫn vốn chủ, tử số dùng NOPAT chưa trừ lãi vay. Vay thêm không làm ROIC tăng - nó chỉ đo hiệu quả của hoạt động kinh doanh."
        }
      },
      {
        "type": "heading",
        "text": "Đọc ROIC cho đúng"
      },
      {
        "type": "list",
        "items": [
          "Luôn đặt ROIC cạnh WACC: chênh lệch dương mới là tạo giá trị, và độ rộng của chênh lệch quan trọng hơn con số tuyệt đối.",
          "Xem xu hướng nhiều năm: ROIC 16% đang giảm dần từ 22% kể câu chuyện khác hẳn ROIC 16% đang tăng từ 11%.",
          "So sánh trong cùng ngành: ngành thâm dụng vốn (điện, thép, hạ tầng) tự nhiên có ROIC thấp hơn ngành nhẹ vốn (phần mềm, dịch vụ).",
          "Cẩn thận với tiền mặt lớn: nếu không loại tiền dư thừa khỏi vốn đầu tư, ROIC của doanh nghiệp nhiều tiền sẽ bị hiểu thấp hơn thực tế."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Đừng để ROE cao đánh lừa bạn.",
          "Luôn hỏi thêm: hiệu quả đó đến từ kinh doanh tốt, hay chỉ từ vay nợ nhiều hơn?"
        ]
      }
    ]
  }),
  "roic-phan-2": patch({
    "openingQuestion": "Nếu ROIC tăng còn growth giữ nguyên, điều gì xảy ra với FCF?",
    "openingOptions": [
      "FCF giảm",
      "FCF tăng",
      "FCF không đổi",
      "FCF âm ngay"
    ],
    "correctOption": 1,
    "explanation": "FCF = NOPAT − Reinvestment, mà Reinvestment ≈ Growth / ROIC. ROIC tăng thì cần tái đầu tư ít hơn để đạt cùng mức tăng trưởng, nên phần NOPAT còn lại chuyển thành FCF tăng lên - đây là lý do doanh nghiệp ROIC cao thường được định giá cao hơn.",
    "diagram": [
      {
        "label": "ROIC",
        "arrow": true
      },
      {
        "label": "Cần ít tái đầu tư hơn",
        "arrow": true
      },
      {
        "label": "FCF tăng",
        "arrow": true
      },
      {
        "label": "Valuation premium",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Tăng trưởng khi ROIC thấp hơn chi phí vốn",
      "description": "Đây là nghịch lý làm nhiều nhà đầu tư mới bối rối: một doanh nghiệp tăng trưởng doanh thu 25% mỗi năm mà cổ phiếu vẫn đi xuống. Nếu ROIC của phần vốn tái đầu tư thấp hơn WACC, thì mỗi đồng bỏ thêm vào để tăng trưởng đang trả về ít hơn chi phí huy động nó - càng tăng trưởng nhanh, giá trị bị phá hủy càng nhiều và dòng tiền tự do càng âm. Đó là lý do tăng trưởng phải luôn được đọc kèm ROIC chứ không bao giờ đọc một mình."
    },
    "quiz": [
      {
        "question": "Mối liên hệ gần nhất giữa ROIC và valuation là gì?",
        "options": [
          "ROIC cao thường hỗ trợ FCF cao hơn",
          "ROIC cao làm doanh nghiệp kém hấp dẫn hơn",
          "ROIC không liên quan đến định giá",
          "ROIC chỉ quan trọng ở bank"
        ],
        "correct": 0,
        "explanation": "ROIC cao giúp công ty tạo cash tốt hơn trên cùng mức tăng trưởng."
      },
      {
        "question": "Khi ROIC < WACC mà công ty vẫn cố tăng trưởng nhanh, rủi ro là gì?",
        "options": [
          "Value creation",
          "Giá trị tăng tự động",
          "Phá hủy giá trị",
          "Không có rủi ro gì"
        ],
        "correct": 2,
        "explanation": "Tăng trưởng dưới mức chi phí vốn thường làm giá trị doanh nghiệp đi xuống."
      },
      {
        "question": "Doanh nghiệp có ROIC 10%, WACC 12%, đang tăng trưởng 20%/năm. Đánh giá đúng nhất là gì?",
        "options": [
          "Tăng trưởng đang phá hủy giá trị vì mỗi đồng vốn mới sinh lời thấp hơn chi phí huy động nó",
          "Tăng trưởng nhanh luôn tốt cho cổ đông",
          "ROIC thấp không quan trọng nếu tăng trưởng đủ nhanh",
          "Cần tăng trưởng nhanh hơn nữa để bù ROIC thấp"
        ],
        "correct": 0,
        "explanation": "Khi ROIC thấp hơn WACC, tăng trưởng chỉ khuếch đại phần chênh lệch âm. Tăng trưởng nhanh hơn làm tình hình xấu đi chứ không cứu được."
      },
      {
        "question": "Cùng NOPAT và cùng tăng trưởng 8%, vì sao doanh nghiệp ROIC 20% có dòng tiền tự do cao hơn hẳn doanh nghiệp ROIC 10%?",
        "options": [
          "Vì cần tái đầu tư ít hơn để đạt cùng mức tăng trưởng, nên phần NOPAT còn lại nhiều hơn",
          "Vì doanh nghiệp ROIC cao được vay với lãi suất thấp hơn",
          "Vì doanh nghiệp ROIC cao trả thuế ít hơn",
          "Vì doanh nghiệp ROIC cao có doanh thu lớn hơn"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ tái đầu tư bằng g chia ROIC. ROIC càng cao thì để đạt cùng g cần giữ lại càng ít, và phần dôi ra chính là dòng tiền tự do cho nhà đầu tư."
      }
    ],
    "keyTakeaways": [
      "ROIC cao giúp tăng FCF",
      "ROIC < WACC là tăng trưởng phá hủy value",
      "Đọc ROIC phải đi cùng growth và reinvestment"
    ],
    "summary": {
      "keyIdea": "ROIC cao làm mỗi đồng tăng trưởng ít tốn vốn hơn.",
      "commonMistake": "Chỉ nhìn tốc độ tăng doanh thu mà quên chất lượng của tăng trưởng.",
      "action": "Thử ước tính tỷ lệ tái đầu tư của một công ty bạn đang theo dõi."
    },
    "application": {
      "title": "Thử tính ngay",
      "message": "Lấy một công ty đang tăng trưởng mạnh, ước tính growth và ROIC để xem công ty đó cần tái đầu tư bao nhiêu cho mỗi đồng tăng trưởng.",
      "secondary": "Càng ít phải bơm vốn để tăng trưởng, FCF càng khỏe."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nếu ROIC cao giúp doanh nghiệp tạo giá trị, thì mối liên hệ giữa ROIC và dòng tiền tự do (FCF) là gì? Đây là mảnh ghép giúp hiểu vì sao thị trường sẵn sàng trả bội số cao hơn cho một số doanh nghiệp."
      },
      {
        "type": "heading",
        "text": "ROIC cao nghĩa là tái đầu tư ít hơn để tăng trưởng"
      },
      {
        "type": "paragraph",
        "text": "FCF ≈ NOPAT − Reinvestment, mà mức tái đầu tư cần thiết để đạt một tốc độ tăng trưởng nhất định tỷ lệ nghịch với ROIC (Reinvestment ≈ Growth / ROIC). Nói cách khác, doanh nghiệp ROIC cao chỉ cần bỏ ra ít vốn hơn để đạt cùng mức tăng trưởng doanh thu/lợi nhuận - phần NOPAT còn dư lại chuyển thành FCF nhiều hơn."
      },
      {
        "type": "list",
        "items": [
          "ROIC cao giúp tăng FCF ở cùng một tốc độ tăng trưởng",
          "Khi ROIC < WACC, càng tăng trưởng nhanh càng phá hủy giá trị, không phải tạo ra giá trị",
          "Đọc ROIC luôn cần đi cùng tốc độ tăng trưởng và tỷ lệ tái đầu tư, không đọc một mình nó"
        ]
      },
      {
        "type": "formula",
        "title": "Quan hệ giữa tăng trưởng, ROIC và dòng tiền tự do",
        "equation": "FCF = NOPAT × (1 − g ÷ ROIC)",
        "variables": [
          {
            "symbol": "g",
            "name": "Tốc độ tăng trưởng",
            "description": "Mức tăng trưởng của NOPAT mà doanh nghiệp muốn đạt được."
          },
          {
            "symbol": "g ÷ ROIC",
            "name": "Tỷ lệ tái đầu tư",
            "description": "Phần NOPAT phải giữ lại để tài trợ tăng trưởng. ROIC càng cao thì tỷ lệ này càng nhỏ."
          }
        ],
        "example": {
          "title": "Cùng tăng trưởng 8%, hai mức ROIC",
          "calculation": "ROIC 20%: 1 − 8/20 = 60% NOPAT thành FCF · ROIC 10%: 1 − 8/10 = 20%",
          "result": "Gấp ba lần dòng tiền tự do",
          "explanation": "Cùng NOPAT và cùng tốc độ tăng trưởng, doanh nghiệp ROIC 20% giữ lại được 60% NOPAT dưới dạng tiền mặt, còn doanh nghiệp ROIC 10% chỉ còn 20%. Đây chính là lý do thị trường trả bội số cao hơn cho ROIC cao."
        }
      },
      {
        "type": "heading",
        "text": "Ba trường hợp của tăng trưởng"
      },
      {
        "type": "list",
        "items": [
          "ROIC > WACC: tăng trưởng tạo giá trị. Càng tăng trưởng nhanh, giá trị doanh nghiệp càng lớn.",
          "ROIC = WACC: tăng trưởng trung tính. Doanh nghiệp lớn lên nhưng giá trị cho cổ đông gần như không đổi.",
          "ROIC < WACC: tăng trưởng phá hủy giá trị. Lúc này thu hẹp lại và trả tiền về cho cổ đông là lựa chọn tốt hơn mở rộng."
        ]
      },
      {
        "type": "callout",
        "label": "Câu hỏi nên hỏi khi thấy kế hoạch mở rộng",
        "text": "Không phải \"doanh nghiệp sẽ tăng trưởng bao nhiêu\", mà \"mức sinh lời trên phần vốn mới bỏ ra là bao nhiêu, và nó có vượt chi phí vốn không\". Rất nhiều kế hoạch tăng trưởng ấn tượng không bao giờ trả lời được câu thứ hai."
      },
      {
        "type": "closing",
        "lines": [
          "Tăng trưởng không tự động là tốt.",
          "Tăng trưởng chỉ tốt khi ROIC của phần vốn tái đầu tư đó vượt chi phí vốn."
        ]
      }
    ]
  }),
  "commodity-phan-2": patch({
    "openingQuestion": "Khi inventory tăng liên tục còn demand yếu, giá commodity thường đi hướng nào?",
    "openingOptions": [
      "Tăng",
      "Giảm",
      "Không đổi",
      "Tăng rồi giảm"
    ],
    "correctOption": 1,
    "explanation": "Tồn kho dư là tín hiệu supply vượt demand, tạo áp lực giảm giá lên hàng hóa - nhà giao dịch commodity thường theo dõi báo cáo tồn kho hàng tuần/tháng sát sao hơn cả báo cáo tài chính doanh nghiệp vì nó phản ánh cán cân cung-cầu gần thời gian thực nhất.",
    "diagram": [
      {
        "label": "Supply",
        "arrow": true
      },
      {
        "label": "Demand",
        "arrow": true
      },
      {
        "label": "Inventory",
        "arrow": true
      },
      {
        "label": "Giá commodity",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Vì sao chu kỳ hàng hóa lặp lại",
      "description": "Chu kỳ hàng hóa gần như luôn đi theo cùng một kịch bản. Giá cao khuyến khích các nhà sản xuất mở rộng công suất, nhưng mở một mỏ mới hay trồng một vụ mới cần nhiều năm. Đến khi nguồn cung mới đi vào hoạt động thì nhu cầu thường đã hạ nhiệt, cung vượt cầu, tồn kho chất lên và giá lao dốc. Giá thấp lại khiến các dự án bị hoãn và công suất bị cắt, gieo mầm cho đợt thiếu hụt kế tiếp. Độ trễ giữa quyết định đầu tư và sản lượng thực tế chính là lý do cấu trúc khiến hàng hóa mang tính chu kỳ mạnh hơn hầu hết ngành khác."
    },
    "quiz": [
      {
        "question": "Chỉ báo ngắn hạn quan trọng nhất với commodity thường là gì?",
        "options": [
          "Earnings per share",
          "Inventory",
          "Dividend yield",
          "Book value"
        ],
        "correct": 1,
        "explanation": "Hàng tồn kho cho thấy cán cân cung cầu đang thừa hay thiếu."
      },
      {
        "question": "Vì sao commodity thường biến động mạnh hơn sản phẩm dịch vụ?",
        "options": [
          "Vì khó đo supply-demand hơn",
          "Vì giá hoàn toàn cố định",
          "Vì không có chu kỳ",
          "Vì không cần inventory"
        ],
        "correct": 0,
        "explanation": "Chu kỳ cung chậm, kho dự trữ và đầu cơ khiến giá commodity dễ dao động mạnh."
      },
      {
        "question": "Vì sao ngành hàng hóa có tính chu kỳ mạnh hơn hầu hết các ngành khác?",
        "options": [
          "Vì độ trễ giữa quyết định đầu tư và sản lượng thực tế rất dài, nên nguồn cung mới thường đến đúng lúc nhu cầu đã hạ nhiệt",
          "Vì hàng hóa không thể lưu kho",
          "Vì nhu cầu hàng hóa thay đổi ngẫu nhiên",
          "Vì giá hàng hóa do các sàn giao dịch ấn định"
        ],
        "correct": 0,
        "explanation": "Mở một mỏ hay trồng một vụ mất nhiều năm. Chính độ trễ này tạo ra vòng lặp giá cao → đầu tư ồ ạt → dư cung → giá thấp → cắt đầu tư → thiếu hụt."
      },
      {
        "question": "Tồn kho giảm nhanh. Vì sao chưa đủ để kết luận giá sẽ tăng bền?",
        "options": [
          "Vì cần phân biệt tồn kho giảm do tiêu thụ thật với giảm do gián đoạn nguồn cung tạm thời",
          "Vì tồn kho không liên quan đến giá",
          "Vì dữ liệu tồn kho luôn công bố chậm",
          "Vì giá hàng hóa chỉ phụ thuộc vào tỷ giá"
        ],
        "correct": 0,
        "explanation": "Nhu cầu tăng bền và gián đoạn cung tạm thời cùng làm tồn kho giảm, nhưng dẫn tới hai kết cục khác hẳn: một bên giá giữ được mặt bằng mới, một bên giá quay về khi nguồn cung khôi phục."
      }
    ],
    "keyTakeaways": [
      "Commodity phản ứng mạnh với supply/demand và inventory",
      "Hàng hóa có tính chu kỳ cao do độ trễ cung ứng",
      "Hedging là quản trị rủi ro, không phải đầu cơ"
    ],
    "summary": {
      "keyIdea": "Inventory là tín hiệu nhanh nhất của commodity.",
      "commonMistake": "Chỉ nhìn giá hiện tại mà bỏ qua tín hiệu tồn kho.",
      "action": "Tra dữ liệu inventory của một commodity bạn quan tâm và so với vài kỳ trước."
    },
    "application": {
      "title": "Tra cứu ngay",
      "message": "Chọn một commodity như dầu, thép hoặc nông sản, kiểm tra inventory gần nhất rồi ghi lại xu hướng tăng hay giảm.",
      "secondary": "Tồn kho đổi chiều thường báo trước biến động giá."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nếu bài trước giới thiệu commodity là hàng hóa chuẩn hóa, bài này đi sâu vào tín hiệu quan trọng nhất để dự đoán hướng đi ngắn hạn của giá: tồn kho."
      },
      {
        "type": "heading",
        "text": "Inventory - chỉ báo cung-cầu gần thời gian thực nhất"
      },
      {
        "type": "paragraph",
        "text": "Khi tồn kho một loại hàng hóa tăng liên tục trong khi nhu cầu yếu, đó là tín hiệu rõ ràng rằng nguồn cung đang vượt cầu, tạo áp lực giảm giá. Ngược lại, tồn kho giảm nhanh trong khi nhu cầu vẫn mạnh thường báo hiệu giá sắp tăng. Vì báo cáo tài chính doanh nghiệp thường công bố chậm (theo quý), trong khi dữ liệu tồn kho hàng hóa được cập nhật hàng tuần/tháng, nhà giao dịch commodity coi đây là chỉ báo sớm quan trọng nhất."
      },
      {
        "type": "list",
        "items": [
          "Inventory là chỉ báo ngắn hạn quan trọng nhất với thị trường commodity",
          "Hàng hóa có tính chu kỳ cao vì cung ứng (khai thác, trồng trọt) có độ trễ lớn so với thay đổi nhu cầu",
          "Hedging bằng futures là công cụ quản trị rủi ro, không phải công cụ đầu cơ"
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tồn kho tăng, nhu cầu yếu",
          "text": "Cung đang vượt cầu. Giá chịu áp lực giảm. Doanh nghiệp khai thác chịu ảnh hưởng nặng nhất vì chi phí cố định cao và không giảm sản lượng nhanh được."
        },
        "right": {
          "label": "Tồn kho giảm nhanh, nhu cầu mạnh",
          "text": "Cung đang thiếu hụt. Giá chịu áp lực tăng. Nhưng cần kiểm tra tồn kho giảm vì tiêu thụ thật hay vì gián đoạn nguồn cung tạm thời - hai nguyên nhân dẫn tới hai kết cục rất khác nhau."
        }
      },
      {
        "type": "heading",
        "text": "Ba lớp thông tin khi đọc thị trường hàng hóa"
      },
      {
        "type": "list",
        "items": [
          "Lớp cung: công suất mới sắp đi vào hoạt động, chi phí sản xuất biên của nhóm nhà sản xuất đắt nhất, gián đoạn do thời tiết hoặc địa chính trị.",
          "Lớp cầu: tăng trưởng công nghiệp của các nước tiêu thụ lớn, mùa vụ, và khả năng thay thế bằng hàng hóa khác khi giá lên cao.",
          "Lớp tài chính: lãi suất và tỷ giá đồng tiền định giá, chi phí lưu kho, và dòng tiền đầu cơ - lớp này có thể đẩy giá lệch khỏi cân đối cung cầu trong ngắn hạn."
        ]
      },
      {
        "type": "callout",
        "label": "Phòng hộ khác đầu cơ",
        "text": "Một doanh nghiệp sản xuất dùng hợp đồng tương lai để chốt giá đầu vào là đang giảm rủi ro - lãi lỗ của hợp đồng bù trừ cho biến động giá hàng thật. Một bên không có nhu cầu hàng thật mà vẫn mua hợp đồng thì đang nhận thêm rủi ro. Cùng một công cụ, hai mục đích trái ngược nhau."
      },
      {
        "type": "closing",
        "lines": [
          "Với commodity, đừng chỉ nhìn giá hiện tại.",
          "Tồn kho đang tăng hay giảm mới là câu chuyện thực sự đằng sau biến động giá."
        ]
      }
    ]
  }),
  "market-fair-value": patch({
    "openingQuestion": "Cổ phiếu tăng mạnh nhưng P/E cũng tăng nhanh, làm sao biết còn đang ở fair value hay đã quá đắt?",
    "openingOptions": [
      "Nhìn giá cao là biết đắt",
      "Chỉ cần P/E thấp là mua",
      "Phải so growth, biên lợi nhuận và discount rate",
      "Không thể biết"
    ],
    "correctOption": 2,
    "explanation": "Fair value là một vùng giá hợp lý dựa trên tăng trưởng kỳ vọng, chất lượng lợi nhuận và chi phí vốn - không phải một con số cố định. Hai nhà phân tích dùng cùng dữ liệu nhưng khác giả định tăng trưởng hoàn toàn có thể ra hai vùng fair value khác nhau, cả hai đều hợp lý.",
    "diagram": [
      {
        "label": "Growth",
        "arrow": true
      },
      {
        "label": "Profit quality",
        "arrow": true
      },
      {
        "label": "Discount rate",
        "arrow": true
      },
      {
        "label": "Fair value range",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "P/E cao nói lên điều gì",
      "description": "P/E không phải thước đo đắt rẻ mà là thước đo kỳ vọng. Một doanh nghiệp giao dịch ở P/E 30 nghĩa là thị trường đang đặt cược lợi nhuận sẽ tăng đáng kể trong nhiều năm tới; nếu tăng trưởng thực tế đạt được, mức giá đó có thể hoàn toàn hợp lý. Ngược lại, P/E 8 không tự động là rẻ - nó có thể phản ánh việc thị trường tin lợi nhuận sắp giảm, hoặc lợi nhuận hiện tại đang ở đỉnh chu kỳ. Câu hỏi hữu ích không phải 'P/E bao nhiêu là hợp lý' mà là 'mức giá này đang giả định điều gì về tương lai, và giả định đó có thực tế không'."
    },
    "quiz": [
      {
        "question": "Khi nào multiple cao vẫn có thể hợp lý?",
        "options": [
          "Khi growth và ROIC đủ mạnh để tạo cash tương lai",
          "Khi giá cổ phiếu đã tăng mạnh",
          "Khi báo chí khen nhiều",
          "Khi công ty không có nợ"
        ],
        "correct": 0,
        "explanation": "Multiple cao có thể hợp lý nếu doanh nghiệp có khả năng tăng trưởng bền vững và tạo cash mạnh."
      },
      {
        "question": "Hai công ty cùng ngành có P/E khác nhau 2 lần. Điều này có tự động nghĩa là công ty P/E thấp hơn đang rẻ hơn không?",
        "options": [
          "Có, luôn luôn đúng",
          "Không - cần so sánh cùng tốc độ tăng trưởng và chất lượng lợi nhuận trước khi kết luận công ty nào thực sự rẻ hơn",
          "Không thể so sánh hai công ty khác nhau",
          "Chỉ đúng nếu cùng vốn hóa thị trường"
        ],
        "correct": 1,
        "explanation": "P/E chỉ là một điểm dữ liệu. Công ty P/E cao hơn có thể xứng đáng nếu tăng trưởng nhanh hơn và lợi nhuận chất lượng hơn - so sánh multiple mà bỏ qua growth và profit quality dễ dẫn đến kết luận sai."
      },
      {
        "question": "Một doanh nghiệp chu kỳ có P/E rất thấp. Vì sao điều này chưa chắc là dấu hiệu rẻ?",
        "options": [
          "Vì lợi nhuận có thể đang ở đỉnh chu kỳ, khiến mẫu số bất thường cao và P/E trông thấp giả tạo",
          "Vì doanh nghiệp chu kỳ không dùng được P/E",
          "Vì P/E thấp luôn phản ánh gian lận kế toán",
          "Vì P/E chỉ áp dụng cho doanh nghiệp công nghệ"
        ],
        "correct": 0,
        "explanation": "Với doanh nghiệp chu kỳ, P/E thấp nhất thường xuất hiện ngay trước khi lợi nhuận đảo chiều đi xuống, và P/E cao nhất xuất hiện ở đáy. Đây là bẫy kinh điển của định giá tương đối."
      },
      {
        "question": "Cách 'đọc ngược từ giá ra giả định' hữu ích ở điểm nào?",
        "options": [
          "Nó biến câu hỏi mơ hồ 'đắt hay rẻ' thành câu hỏi kiểm chứng được về tăng trưởng và biên lợi nhuận cần thiết",
          "Nó cho ra con số giá trị chính xác hơn DCF",
          "Nó loại bỏ hoàn toàn nhu cầu dùng giả định",
          "Nó chỉ dùng được cho doanh nghiệp chưa niêm yết"
        ],
        "correct": 0,
        "explanation": "Cách này không loại bỏ giả định, nhưng đưa giả định ra ánh sáng để đối chiếu với lịch sử doanh nghiệp và quy mô thị trường - tức là biến nó thành thứ có thể phản biện."
      }
    ],
    "keyTakeaways": [
      "Fair value là một vùng, không phải một điểm",
      "P/E phải đọc cùng growth và chất lượng lợi nhuận",
      "Margin of safety vẫn quan trọng ngay cả với công ty tốt"
    ],
    "summary": {
      "keyIdea": "Giá hợp lý phụ thuộc vào tăng trưởng và chất lượng cash flow.",
      "commonMistake": "Chỉ nhìn một multiple rồi kết luận rẻ/đắt.",
      "action": "So sánh một công ty tăng trưởng với 2-3 công ty cùng ngành bằng cùng một bội số."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một cổ phiếu tăng giá mạnh, P/E cũng tăng theo - làm sao biết đây là 'đắt hợp lý' hay 'đắt quá đà'? Câu trả lời không nằm ở một con số duy nhất."
      },
      {
        "type": "heading",
        "text": "Fair value là một vùng, không phải một điểm"
      },
      {
        "type": "paragraph",
        "text": "Giá trị hợp lý của một cổ phiếu phụ thuộc vào tốc độ tăng trưởng kỳ vọng, chất lượng lợi nhuận, và chi phí vốn - ba yếu tố đều mang tính giả định về tương lai. Hai nhà phân tích dùng cùng dữ liệu quá khứ nhưng khác giả định tăng trưởng hoàn toàn có thể đưa ra hai vùng fair value khác nhau, và cả hai đều có thể hợp lý theo góc nhìn riêng."
      },
      {
        "type": "list",
        "items": [
          "Multiple cao vẫn có thể hợp lý nếu growth và ROIC đủ mạnh để tạo dòng tiền tương lai lớn",
          "So sánh P/E giữa hai công ty mà bỏ qua tốc độ tăng trưởng và chất lượng lợi nhuận dễ dẫn đến kết luận sai",
          "Margin of safety vẫn quan trọng ngay cả khi phân tích một công ty tốt"
        ]
      },
      {
        "type": "heading",
        "text": "Đọc ngược từ giá ra giả định"
      },
      {
        "type": "paragraph",
        "text": "Thay vì cố tính ra một giá trị hợp lý rồi so với thị giá, nhiều nhà phân tích làm ngược lại: lấy thị giá hiện tại, rồi tìm xem cần tốc độ tăng trưởng và biên lợi nhuận nào để mức giá đó hợp lý. Cách này biến câu hỏi mơ hồ 'đắt hay rẻ' thành câu hỏi kiểm chứng được: doanh nghiệp có từng đạt mức tăng trưởng đó chưa, ngành có đủ lớn để hấp thụ không, và đối thủ sẽ phản ứng thế nào."
      },
      {
        "type": "comparison",
        "left": {
          "label": "So sánh P/E thuần",
          "text": "\"Công ty A P/E 12, công ty B P/E 25, vậy A rẻ hơn.\" Bỏ qua chênh lệch tăng trưởng, chất lượng lợi nhuận, mức nợ và vị thế chu kỳ - bốn thứ giải thích phần lớn khoảng cách bội số."
        },
        "right": {
          "label": "So sánh có điều chỉnh",
          "text": "\"A tăng trưởng 5%, ROIC 9%, nợ cao; B tăng trưởng 18%, ROIC 22%, gần như không nợ. Chênh lệch bội số phản ánh khác biệt thật, câu hỏi là chênh lệch đó đã đủ hay quá mức.\""
        }
      },
      {
        "type": "heading",
        "text": "Ba nguồn sai lệch phổ biến khi định giá tương đối"
      },
      {
        "type": "list",
        "items": [
          "Lợi nhuận ở đỉnh hoặc đáy chu kỳ: doanh nghiệp chu kỳ thường trông rẻ nhất đúng lúc lợi nhuận sắp giảm.",
          "Lợi nhuận có khoản bất thường: một khoản lãi một lần làm E tăng, kéo P/E xuống và tạo cảm giác rẻ giả tạo.",
          "Bỏ qua nợ: P/E chỉ nhìn phần vốn chủ. Hai doanh nghiệp cùng P/E nhưng khác hẳn về nợ thì rủi ro rất khác nhau - đây là lý do EV/EBITDA thường được dùng bổ sung."
        ]
      },
      {
        "type": "callout",
        "label": "Biên an toàn",
        "text": "Vì giá trị hợp lý luôn là một vùng chứ không phải một điểm, khoảng chênh giữa giá mua và cận dưới của vùng đó chính là phần đệm cho việc bạn có thể sai. Doanh nghiệp tốt mua ở mức giá không còn biên an toàn vẫn có thể là một khoản đầu tư kém."
      },
      {
        "type": "closing",
        "lines": [
          "Đừng hỏi 'cổ phiếu này đắt hay rẻ' bằng một con số duy nhất.",
          "Hãy hỏi: giả định tăng trưởng đằng sau mức giá này có thực tế không?"
        ]
      }
    ]
  }),
  "vingroup-cash-flow": patch({
    "openingQuestion": "Doanh thu tăng nhưng operating cash flow lại âm, điều đó nói gì về chất lượng kinh doanh?",
    "openingOptions": [
      "Doanh nghiệp chắc chắn yếu",
      "Có thể đang kẹt vốn lưu động hoặc CapEx lớn",
      "Luôn là tín hiệu tốt",
      "Không liên quan"
    ],
    "correctOption": 1,
    "explanation": "Lợi nhuận và cash flow khác nhau vì doanh thu có thể ghi nhận trước tiền, hoặc tiền bị khóa vào tồn kho, phải thu, capex. Đây là lý do nhà đầu tư luôn đối chiếu Net Income với Operating Cash Flow thay vì chỉ tin vào một con số duy nhất.",
    "diagram": [
      {
        "label": "Lợi nhuận kế toán",
        "arrow": true
      },
      {
        "label": "Working capital",
        "arrow": true
      },
      {
        "label": "CapEx",
        "arrow": true
      },
      {
        "label": "Operating cash flow",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Vì sao bất động sản và bán lẻ hay lệch dòng tiền",
      "description": "Ở doanh nghiệp bất động sản, tiền chi ra cho quỹ đất và chi phí xây dựng nằm trong hàng tồn kho suốt nhiều năm trước khi doanh thu được ghi nhận. Ở bán lẻ, mỗi cửa hàng mới mở đều cần hàng lấp đầy kệ trước khi bán được đồng nào. Trong cả hai mô hình, giai đoạn mở rộng mạnh gần như luôn đi kèm dòng tiền kinh doanh yếu, và điều đó tự nó chưa phải vấn đề. Vấn đề nằm ở chỗ khác: mở rộng ấy có chuyển thành doanh thu và tiền về trong những kỳ sau hay không - và câu trả lời chỉ hiện ra khi bạn theo dõi qua nhiều kỳ liên tiếp."
    },
    "quiz": [
      {
        "question": "Điều gì thường làm OCF yếu hơn Net Income?",
        "options": [
          "Working capital tăng mạnh",
          "Doanh thu tăng",
          "Lãi suất giảm",
          "Biên gộp cao"
        ],
        "correct": 0,
        "explanation": "Khi phải bỏ tiền vào tồn kho và khoản phải thu, OCF có thể yếu dù lợi nhuận kế toán vẫn đẹp."
      },
      {
        "question": "Nếu một doanh nghiệp liên tục có OCF yếu hơn Net Income trong nhiều năm liền, đây là tín hiệu gì?",
        "options": [
          "Không đáng lo, chỉ là biến động ngắn hạn",
          "Cần soi kỹ chất lượng lợi nhuận - lợi nhuận báo cáo có thể không chuyển hóa thành tiền mặt thật",
          "Doanh nghiệp chắc chắn đang gian lận",
          "Đây luôn là dấu hiệu tốt vì đang đầu tư mạnh"
        ],
        "correct": 1,
        "explanation": "Một vài kỳ lệch nhau là bình thường, nhưng lệch nhau liên tục nhiều năm là dấu hiệu cảnh báo về chất lượng lợi nhuận (quality of earnings) cần điều tra sâu hơn, chứ không nên tự động quy kết là gian lận hay tốt."
      },
      {
        "question": "Doanh nghiệp bất động sản có dòng tiền kinh doanh âm trong giai đoạn triển khai dự án lớn. Cách đọc đúng là gì?",
        "options": [
          "Đây có thể là bình thường với mô hình này; cần theo dõi các kỳ sau xem tiền có về khi dự án bàn giao không",
          "Đây luôn là dấu hiệu doanh nghiệp sắp mất khả năng thanh toán",
          "Không cần quan tâm vì bất động sản luôn có dòng tiền âm",
          "Nên so sánh trực tiếp với doanh nghiệp phần mềm để đánh giá"
        ],
        "correct": 0,
        "explanation": "Đặc thù ngành làm cho việc lệch dòng tiền là bình thường ở giai đoạn đầu tư. Điều cần theo dõi là dòng tiền có quay lại khi tài sản đi vào khai thác hay không."
      },
      {
        "question": "Trong công thức chuyển từ lợi nhuận sang dòng tiền hoạt động, vì sao khấu hao được cộng lại?",
        "options": [
          "Vì đó là chi phí đã trừ khi tính lợi nhuận nhưng không thực sự làm doanh nghiệp mất tiền trong kỳ",
          "Vì khấu hao là một khoản thu nhập",
          "Vì khấu hao được hoàn thuế",
          "Vì chuẩn mực kế toán yêu cầu cộng lại"
        ],
        "correct": 0,
        "explanation": "Tiền đã chi ra ở thời điểm mua tài sản. Khấu hao chỉ phân bổ chi phí đó qua các kỳ trên sổ sách, nên khi quy về dòng tiền phải cộng ngược lại."
      }
    ],
    "keyTakeaways": [
      "OCF mới cho thấy tiền mặt thật sinh ra từ hoạt động",
      "Working capital và CapEx là hai nguồn lệch lớn nhất",
      "Không nên định giá chỉ bằng Net Income"
    ],
    "summary": {
      "keyIdea": "Cash flow trả lời câu hỏi công ty thật sự tạo ra bao nhiêu tiền.",
      "commonMistake": "Nhầm lợi nhuận kế toán với tiền mặt.",
      "action": "So sánh OCF với Net Income của công ty bạn đang theo dõi trong 3 năm gần nhất."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Doanh thu tăng, nhưng dòng tiền từ hoạt động kinh doanh (OCF) lại âm - đây là tình huống khiến nhiều nhà đầu tư mới bối rối, nhưng lại rất phổ biến ở các doanh nghiệp lớn, đặc biệt bất động sản và bán lẻ."
      },
      {
        "type": "heading",
        "text": "Vì sao lợi nhuận và dòng tiền có thể đi ngược chiều nhau"
      },
      {
        "type": "paragraph",
        "text": "Kế toán dồn tích (accrual accounting) cho phép ghi nhận doanh thu trước khi thực sự thu được tiền. Khi khoản phải thu, hàng tồn kho, hoặc dự án dở dang tăng nhanh, tiền mặt thực tế bị 'khóa' lại trong các khoản mục này dù lợi nhuận kế toán vẫn nhìn rất đẹp. Đây là lý do nhà đầu tư luôn đối chiếu Net Income với Operating Cash Flow, thay vì chỉ tin vào một con số duy nhất."
      },
      {
        "type": "list",
        "items": [
          "Working capital tăng mạnh là nguyên nhân phổ biến nhất khiến OCF yếu hơn Net Income",
          "Một vài kỳ lệch nhau là bình thường, nhưng lệch liên tục nhiều năm là tín hiệu cần soi kỹ chất lượng lợi nhuận",
          "OCF mới là thước đo tiền mặt thật doanh nghiệp tạo ra từ hoạt động kinh doanh"
        ]
      },
      {
        "type": "formula",
        "title": "Từ lợi nhuận sang dòng tiền hoạt động",
        "equation": "OCF ≈ Lợi nhuận sau thuế + Khấu hao − Thay đổi vốn lưu động",
        "variables": [
          {
            "symbol": "Khấu hao",
            "name": "Chi phí phi tiền mặt",
            "description": "Đã trừ khi tính lợi nhuận nhưng không làm mất tiền, nên cộng lại."
          },
          {
            "symbol": "Thay đổi vốn lưu động",
            "name": "Working capital",
            "description": "Phải thu và tồn kho tăng thì tiền bị khóa lại; phải trả tăng thì tiền được giữ lại lâu hơn."
          }
        ],
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "300 tỷ + 150 tỷ − 600 tỷ",
          "result": "= −150 tỷ",
          "explanation": "Doanh nghiệp lãi 300 tỷ nhưng phải thu và tồn kho tăng thêm 600 tỷ trong kỳ. Kết quả là dòng tiền kinh doanh âm 150 tỷ dù báo cáo kết quả kinh doanh nhìn rất tích cực."
        }
      },
      {
        "type": "heading",
        "text": "Phân biệt lệch lành mạnh với lệch đáng lo"
      },
      {
        "type": "list",
        "items": [
          "Lành mạnh: lệch xuất hiện trong giai đoạn mở rộng có kế hoạch rõ, và thu hẹp lại ở các kỳ sau khi tài sản đi vào khai thác.",
          "Đáng lo: lệch kéo dài nhiều năm mà không thu hẹp, phải thu tăng nhanh hơn doanh thu, hoặc tồn kho tăng trong khi doanh thu đi ngang.",
          "Rất đáng lo: doanh nghiệp phải vay thêm liên tục để bù dòng tiền kinh doanh âm, khiến nợ vay và chi phí lãi cùng tăng."
        ]
      },
      {
        "type": "callout",
        "label": "Ba dòng tiền, ba câu hỏi",
        "text": "Dòng tiền kinh doanh trả lời 'hoạt động chính có tạo ra tiền không'. Dòng tiền đầu tư trả lời 'doanh nghiệp đang bỏ tiền vào đâu'. Dòng tiền tài chính trả lời 'phần thiếu được bù bằng gì - vay thêm hay phát hành cổ phần'. Đọc đủ ba dòng mới thấy được bức tranh tài trợ thật."
      },
      {
        "type": "closing",
        "lines": [
          "Lợi nhuận kế toán kể một câu chuyện.",
          "Dòng tiền hoạt động kể câu chuyện thật hơn về sức khỏe tài chính của doanh nghiệp."
        ]
      }
    ]
  }),
  "enterprise-value": patch({
    "openingQuestion": "Vì sao khi mua đứt một công ty, người mua không chỉ trả Market Cap?",
    "openingOptions": [
      "Vì phải gánh cả nợ và nhận lại tiền mặt",
      "Vì luật luôn cộng thêm phí",
      "Vì Market Cap là giá tài sản cố định",
      "Vì vậy EV luôn nhỏ hơn market cap"
    ],
    "correctOption": 0,
    "explanation": "Enterprise Value = Market Cap + Debt − Cash, phản ánh chi phí thực để mua toàn bộ hoạt động kinh doanh. Người mua phải gánh khoản nợ hiện có nhưng cũng nhận lại tiền mặt sẵn có trong công ty, nên EV mới là thước đo giá mua đứt chính xác hơn market cap.",
    "diagram": [
      {
        "label": "Market cap",
        "arrow": true
      },
      {
        "label": "+ Debt",
        "arrow": true
      },
      {
        "label": "− Cash",
        "arrow": true
      },
      {
        "label": "Enterprise value",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Hai doanh nghiệp cùng vốn hóa, giá mua khác nhau",
      "description": "Giả sử hai doanh nghiệp cùng có vốn hóa 5.000 tỷ. Doanh nghiệp A có 2.000 tỷ nợ vay và 200 tỷ tiền mặt; doanh nghiệp B không nợ và có 1.500 tỷ tiền mặt. Enterprise Value của A là 6.800 tỷ, của B là 3.500 tỷ - chênh gần gấp đôi dù vốn hóa như nhau. Nếu bạn so sánh hai doanh nghiệp này bằng P/E, khác biệt đó biến mất hoàn toàn; so sánh bằng EV/EBITDA thì nó hiện ra ngay. Đây là lý do trong M&A và định giá so sánh, EV gần như luôn được ưu tiên hơn vốn hóa."
    },
    "quiz": [
      {
        "question": "Công ty A có market cap 100, debt 30, cash 10. EV là bao nhiêu?",
        "options": [
          "90",
          "100",
          "120",
          "130"
        ],
        "correct": 2,
        "explanation": "EV = 100 + 30 − 10 = 120."
      },
      {
        "question": "Vì sao EV/EBITDA thường được dùng để so sánh doanh nghiệp thay vì P/E khi các công ty có cấu trúc vốn (tỷ lệ nợ/vốn chủ) khác nhau nhiều?",
        "options": [
          "Vì EBITDA luôn chính xác hơn lợi nhuận ròng",
          "Vì EV/EBITDA trung lập với cấu trúc vốn - so sánh được các công ty dù vay nợ nhiều hay ít khác nhau, còn P/E bị ảnh hưởng bởi lãi vay và thuế",
          "Vì EBITDA không cần báo cáo tài chính",
          "Vì P/E chỉ dùng được cho ngân hàng"
        ],
        "correct": 1,
        "explanation": "EV nằm ở tử số đã bao gồm cả nợ, còn EBITDA ở mẫu số chưa trừ lãi vay và thuế - nên EV/EBITDA loại bỏ được ảnh hưởng của cấu trúc vốn, giúp so sánh công khai bằng giữa các doanh nghiệp vay nợ khác nhau công bằng hơn P/E."
      },
      {
        "question": "Vì sao tiền mặt được TRỪ khi tính Enterprise Value?",
        "options": [
          "Vì bên mua nhận lại số tiền đó sau khi mua, nên chi phí thực để sở hữu hoạt động kinh doanh giảm đi tương ứng",
          "Vì tiền mặt không phải là tài sản",
          "Vì tiền mặt đã nằm trong vốn hóa thị trường nên phải loại trừ trùng lặp",
          "Vì chuẩn mực kế toán quy định như vậy"
        ],
        "correct": 0,
        "explanation": "EV đo chi phí thực để sở hữu phần hoạt động kinh doanh. Tiền có sẵn trong công ty có thể dùng ngay để hoàn lại một phần giá mua, nên nó làm giảm chi phí thực."
      },
      {
        "question": "Hai doanh nghiệp cùng vốn hóa nhưng một bên nợ nhiều, một bên nhiều tiền mặt. Chỉ số nào phản ánh khác biệt đó?",
        "options": [
          "EV/EBITDA, vì cả tử số lẫn mẫu số đều trung lập với cấu trúc vốn",
          "P/E, vì nó dựa trên lợi nhuận sau thuế",
          "ROE, vì nó đo hiệu quả trên vốn chủ",
          "Biên lợi nhuận gộp"
        ],
        "correct": 0,
        "explanation": "P/E bỏ qua hoàn toàn nợ và tiền mặt. EV/EBITDA đưa cả hai vào, nên phản ánh được chênh lệch về cấu trúc vốn giữa hai doanh nghiệp."
      }
    ],
    "keyTakeaways": [
      "EV là giá mua đứt toàn bộ business",
      "Nợ làm EV tăng, cash làm EV giảm",
      "EV thường là nền tảng cho nhiều bội số định giá"
    ],
    "summary": {
      "keyIdea": "EV là giá mua đứt toàn bộ business",
      "commonMistake": "Dễ bỏ qua: nợ làm EV tăng, cash làm EV giảm",
      "action": "EV thường là nền tảng cho nhiều bội số định giá"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khi một công ty muốn mua đứt công ty khác, họ không chỉ trả đúng giá trị vốn hóa thị trường (market cap) - vì market cap chưa kể hết câu chuyện."
      },
      {
        "type": "heading",
        "text": "EV = Market Cap + Debt − Cash"
      },
      {
        "type": "paragraph",
        "text": "Enterprise Value phản ánh chi phí thực sự để sở hữu toàn bộ hoạt động kinh doanh: bên mua phải gánh khoản nợ hiện có của công ty mục tiêu (cộng thêm vào giá phải trả), nhưng cũng nhận lại toàn bộ tiền mặt sẵn có trong công ty (trừ bớt khỏi giá phải trả). Đây là lý do EV, không phải market cap, mới là nền tảng cho hầu hết các bội số định giá dùng trong M&A."
      },
      {
        "type": "list",
        "items": [
          "EV là giá mua đứt toàn bộ hoạt động kinh doanh, không chỉ phần vốn cổ phần",
          "Nợ làm EV tăng lên, tiền mặt làm EV giảm xuống",
          "EV/EBITDA trung lập với cấu trúc vốn nên so sánh công bằng hơn P/E giữa các công ty có tỷ lệ nợ khác nhau"
        ]
      },
      {
        "type": "formula",
        "title": "Công thức Enterprise Value",
        "equation": "EV = Vốn hóa thị trường + Nợ vay − Tiền và tương đương tiền",
        "variables": [
          {
            "symbol": "Vốn hóa",
            "name": "Market cap",
            "description": "Giá cổ phiếu × số cổ phiếu đang lưu hành - phần giá trị thuộc về cổ đông."
          },
          {
            "symbol": "Nợ vay",
            "name": "Debt",
            "description": "Bên mua phải gánh, nên cộng vào giá thực phải trả."
          },
          {
            "symbol": "Tiền mặt",
            "name": "Cash",
            "description": "Bên mua nhận lại, nên trừ khỏi giá thực phải trả."
          }
        ],
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "5.000 + 2.000 − 200",
          "result": "= 6.800 tỷ",
          "explanation": "Mua đứt doanh nghiệp này thực chất tốn 6.800 tỷ chứ không phải 5.000 tỷ, vì bên mua thừa hưởng cả khoản nợ 2.000 tỷ và chỉ nhận lại 200 tỷ tiền mặt."
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "P/E",
          "text": "Chỉ nhìn phần vốn cổ đông, và mẫu số là lợi nhuận sau lãi vay. Hai doanh nghiệp giống hệt nhau về hoạt động nhưng khác cấu trúc vốn sẽ cho hai P/E khác nhau."
        },
        "right": {
          "label": "EV/EBITDA",
          "text": "Tử số gồm cả nợ, mẫu số là lợi nhuận trước lãi vay. Vì cả hai vế đều trung lập với cách tài trợ, bội số này so sánh được giữa các doanh nghiệp có mức nợ khác nhau."
        }
      },
      {
        "type": "heading",
        "text": "Ba lưu ý khi tính EV"
      },
      {
        "type": "list",
        "items": [
          "Chỉ trừ phần tiền mặt dư thừa, không trừ toàn bộ - doanh nghiệp luôn cần một lượng tiền để vận hành hằng ngày.",
          "Nhớ cộng thêm lợi ích cổ đông thiểu số và cổ phiếu ưu đãi nếu có, vì đó cũng là phần bên mua phải xử lý.",
          "Dùng giá trị thị trường của nợ khi có thể; với nợ ngân hàng thông thường thì giá trị sổ sách là xấp xỉ chấp nhận được."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Market cap chỉ là giá trị phần vốn cổ đông đang nắm giữ.",
          "Enterprise Value mới là giá thực sự để sở hữu toàn bộ doanh nghiệp."
        ]
      }
    ]
  }),
  "cap-rate": patch({
    "openingQuestion": "Cap rate trong BĐS cho biết điều gì quan trọng nhất?",
    "openingOptions": [
      "Giá thuê cao hay thấp",
      "Tỷ lệ NOI trên giá trị tài sản",
      "Tỷ lệ đòn bẩy",
      "Tỷ lệ trống mặt bằng"
    ],
    "correctOption": 1,
    "explanation": "Cap rate = NOI / Property Value, là thước đo lợi suất thô của một tài sản bất động sản - cho biết nếu mua tài sản đó với giá thị trường hiện tại, nhà đầu tư nhận được tỷ suất sinh lời hàng năm bao nhiêu từ dòng thu nhập cho thuê, chưa tính đòn bẩy tài chính.",
    "diagram": [
      {
        "label": "Net operating income",
        "arrow": true
      },
      {
        "label": "Chia cho property value",
        "arrow": true
      },
      {
        "label": "Ra cap rate",
        "arrow": true
      },
      {
        "label": "So sánh các tài sản BĐS",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Cùng NOI, hai mức cap rate",
      "description": "Hai tòa nhà văn phòng cùng cho ra thu nhập hoạt động ròng 10 tỷ đồng mỗi năm. Tòa ở trung tâm, khách thuê là các doanh nghiệp lớn với hợp đồng dài hạn, được thị trường định giá ở cap rate 6% - tức khoảng 167 tỷ. Tòa ở vùng ven, tỷ lệ trống cao hơn và khách thuê kém ổn định, giao dịch ở cap rate 10% - tức 100 tỷ. Cùng một dòng thu nhập, chênh lệch giá trị gần 70%. Cap rate vì vậy không phải thước đo chất lượng theo kiểu càng cao càng tốt: nó là mức bù rủi ro mà thị trường đòi hỏi."
    },
    "quiz": [
      {
        "question": "Nếu cap rate giảm mà NOI không đổi, giá trị tài sản sẽ thế nào?",
        "options": [
          "Tăng",
          "Giảm",
          "Không đổi",
          "Âm"
        ],
        "correct": 0,
        "explanation": "Giá trị = NOI / cap rate, nên cap rate giảm sẽ đẩy giá trị tài sản lên."
      },
      {
        "question": "Vì sao cap rate của bất động sản văn phòng trung tâm thành phố thường thấp hơn cap rate của kho bãi ngoại ô?",
        "options": [
          "Vì văn phòng trung tâm rủi ro thấp hơn nên nhà đầu tư chấp nhận lợi suất thấp hơn để đổi lấy sự ổn định và thanh khoản cao hơn",
          "Vì kho bãi luôn có NOI cao hơn",
          "Vì văn phòng trung tâm không tính cap rate",
          "Vì cap rate chỉ phụ thuộc diện tích"
        ],
        "correct": 0,
        "explanation": "Cap rate phản ánh cả lợi suất lẫn rủi ro cảm nhận: tài sản vị trí đắc địa, thanh khoản cao, rủi ro thấp thường có cap rate thấp hơn (giá cao hơn cho cùng NOI); tài sản rủi ro cao hơn cần cap rate cao hơn để bù đắp."
      },
      {
        "question": "Vì sao cap rate thấp thường đi kèm tài sản được coi là an toàn hơn?",
        "options": [
          "Vì nhà đầu tư chấp nhận lợi suất thấp hơn khi rủi ro thấp hơn, và mức chấp nhận đó đẩy giá tài sản lên",
          "Vì tài sản an toàn có chi phí vận hành cao hơn",
          "Vì cap rate thấp nghĩa là NOI thấp",
          "Vì ngân hàng cho vay nhiều hơn với tài sản cap rate thấp"
        ],
        "correct": 0,
        "explanation": "Cap rate là lợi suất đòi hỏi. Tài sản càng chắc chắn về dòng tiền, nhà đầu tư càng chấp nhận lợi suất thấp, đồng nghĩa trả giá cao hơn cho cùng một mức NOI."
      },
      {
        "question": "Điều nào sau đây cap rate KHÔNG phản ánh?",
        "options": [
          "Ảnh hưởng của việc dùng vốn vay để mua tài sản",
          "Mức lợi suất thị trường đòi hỏi cho tài sản đó",
          "Quan hệ giữa NOI và giá trị tài sản",
          "Mức độ rủi ro cảm nhận của thị trường"
        ],
        "correct": 0,
        "explanation": "Cap rate được tính như thể mua bằng toàn bộ tiền mặt. Khi có vay nợ, lợi suất trên vốn tự có sẽ được khuếch đại theo cả hai chiều và phải tính riêng."
      }
    ],
    "keyTakeaways": [
      "Cap rate là NOI chia cho giá trị tài sản",
      "Cap rate thấp hơn thường đồng nghĩa định giá cao hơn",
      "Cần so cap rate trong cùng phân khúc tài sản"
    ],
    "summary": {
      "keyIdea": "Cap rate là NOI chia cho giá trị tài sản",
      "commonMistake": "Dễ bỏ qua: cap rate thấp hơn thường đồng nghĩa định giá cao hơn",
      "action": "Cần so cap rate trong cùng phân khúc tài sản"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trong đầu tư bất động sản cho thuê, cap rate là một trong những con số đầu tiên nhà đầu tư tính đến - nhưng ý nghĩa thực sự của nó thường bị hiểu đơn giản hóa quá mức."
      },
      {
        "type": "heading",
        "text": "Cap rate = NOI / Property Value"
      },
      {
        "type": "paragraph",
        "text": "Cap rate cho biết tỷ suất sinh lời hàng năm từ dòng thu nhập cho thuê nếu mua tài sản ở giá thị trường hiện tại, chưa tính đến đòn bẩy tài chính (vay để mua). Cap rate không chỉ phản ánh lợi suất mà còn phản ánh mức độ rủi ro cảm nhận: tài sản vị trí đắc địa, thanh khoản cao thường có cap rate thấp hơn (giá cao hơn cho cùng NOI), còn tài sản rủi ro cao hơn cần cap rate cao hơn để bù đắp."
      },
      {
        "type": "list",
        "items": [
          "Cap rate giảm mà NOI không đổi sẽ đẩy giá trị tài sản lên (Giá trị = NOI / cap rate)",
          "Bất động sản trung tâm thành phố thường có cap rate thấp hơn khu vực ngoại ô vì rủi ro thấp hơn",
          "Chỉ nên so sánh cap rate trong cùng phân khúc tài sản để có ý nghĩa"
        ]
      },
      {
        "type": "formula",
        "title": "Ba cách viết cùng một công thức",
        "equation": "Giá trị tài sản = NOI ÷ Cap rate",
        "variables": [
          {
            "symbol": "NOI",
            "name": "Thu nhập hoạt động ròng",
            "description": "Tiền thuê thu được trừ chi phí vận hành, quản lý, thuế tài sản, bảo hiểm - chưa trừ lãi vay và khấu hao."
          },
          {
            "symbol": "Cap rate",
            "name": "Tỷ suất vốn hóa",
            "description": "Mức lợi suất thị trường đòi hỏi cho loại tài sản và mức rủi ro đó."
          }
        ],
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "10 tỷ ÷ 6% so với 10 tỷ ÷ 10%",
          "result": "167 tỷ so với 100 tỷ",
          "explanation": "Cap rate thấp đi 4 điểm phần trăm làm giá trị tài sản tăng 67% dù dòng tiền không đổi. Đây là lý do trong bất động sản, biến động của mặt bằng cap rate ảnh hưởng tới giá trị mạnh hơn cả biến động tiền thuê."
        }
      },
      {
        "type": "heading",
        "text": "Ba điều cap rate không nói cho bạn biết"
      },
      {
        "type": "list",
        "items": [
          "Không tính đòn bẩy: cap rate giả định mua bằng tiền mặt. Lợi suất thực tế trên vốn tự có sẽ khác hẳn khi có vay nợ.",
          "Không tính chi phí vốn lớn sắp tới: một tòa nhà cũ sắp phải thay hệ thống điều hòa hay thang máy có NOI hiện tại đẹp nhưng dòng tiền tương lai sẽ bị bào mòn.",
          "Không tính tăng trưởng tiền thuê: hai tài sản cùng cap rate nhưng một bên nằm ở khu vực tiền thuê đang tăng nhanh thì giá trị dài hạn rất khác."
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận với NOI được trình bày sẵn",
        "text": "NOI trong hồ sơ chào bán thường là con số đã được tối ưu: dùng tỷ lệ lấp đầy cao nhất từng đạt, ước tính chi phí vận hành thấp, và bỏ qua chi phí quản lý tài sản. Hãy tự dựng lại NOI từ hợp đồng thuê thực tế và chi phí ba năm gần nhất trước khi tính cap rate."
      },
      {
        "type": "closing",
        "lines": [
          "Cap rate thấp không có nghĩa là tài sản đó tệ.",
          "Nó thường có nghĩa là thị trường đang định giá tài sản đó an toàn hơn."
        ]
      }
    ]
  }),
  "operating-leverage": patch({
    "openingQuestion": "Vì sao SaaS có thể tăng lợi nhuận nhanh hơn hãng hàng không khi doanh thu tăng?",
    "openingOptions": [
      "Vì SaaS không có chi phí",
      "Vì fixed cost cao tạo operating leverage",
      "Vì vé máy bay rẻ hơn phần mềm",
      "Vì SaaS không cần khách hàng"
    ],
    "correctOption": 1,
    "explanation": "Khi chi phí cố định lớn, mỗi đồng doanh thu tăng thêm sẽ rơi xuống lợi nhuận nhanh hơn, đó là operating leverage. Điều này hoạt động theo cả hai chiều: doanh thu tăng thì lợi nhuận tăng nhanh, nhưng doanh thu giảm thì lợi nhuận cũng giảm nhanh không kém.",
    "diagram": [
      {
        "label": "Fixed costs",
        "arrow": true
      },
      {
        "label": "Doanh thu tăng",
        "arrow": true
      },
      {
        "label": "Biên lợi nhuận mở rộng",
        "arrow": true
      },
      {
        "label": "Operating leverage",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Cùng giảm 20% doanh thu, hai kết cục",
      "description": "Doanh nghiệp A có 80% chi phí là cố định; doanh nghiệp B có 80% chi phí là biến đổi. Cả hai cùng có doanh thu 100 và tổng chi phí 90, tức lãi 10. Khi doanh thu giảm 20% xuống còn 80: A chỉ tiết kiệm được phần chi phí biến đổi giảm theo, chi phí còn khoảng 86, nên lỗ 6. B có chi phí giảm gần theo tỷ lệ doanh thu, còn khoảng 76, nên vẫn lãi 4. Cùng một cú sốc doanh thu, một bên lỗ và một bên vẫn có lãi - khác biệt hoàn toàn nằm ở cơ cấu chi phí chứ không ở chất lượng quản trị."
    },
    "quiz": [
      {
        "question": "Operating leverage cao thường làm điều gì?",
        "options": [
          "Lợi nhuận nhạy hơn với doanh thu",
          "Doanh thu giảm ngay",
          "Nợ giảm",
          "Biên gộp luôn âm"
        ],
        "correct": 0,
        "explanation": "Doanh thu tăng một chút có thể kéo lợi nhuận tăng rất mạnh nếu fixed costs đã được hấp thụ."
      },
      {
        "question": "Trong một cuộc suy thoái khiến doanh thu giảm mạnh, doanh nghiệp nào chịu tổn thương lợi nhuận nặng hơn: SaaS (fixed cost cao) hay công ty gia công theo đơn hàng (variable cost cao)?",
        "options": [
          "Công ty gia công vì chi phí biến đổi khó cắt giảm",
          "SaaS thường chịu tổn thương lợi nhuận nặng hơn vì chi phí cố định vẫn phải trả dù doanh thu giảm, trong khi công ty variable cost cao có thể cắt giảm chi phí theo doanh thu",
          "Cả hai tổn thương như nhau",
          "Không doanh nghiệp nào bị ảnh hưởng vì suy thoái chỉ ảnh hưởng giá cổ phiếu"
        ],
        "correct": 1,
        "explanation": "Operating leverage cao là con dao hai lưỡi: nó khuếch đại lợi nhuận khi doanh thu tăng nhưng cũng khuếch đại lỗ khi doanh thu giảm, vì chi phí cố định vẫn phải trả bất kể doanh thu ra sao - đây là lý do cổ phiếu SaaS thường biến động mạnh hơn trong suy thoái."
      },
      {
        "question": "Doanh nghiệp có DOL bằng 3. Doanh thu giảm 10% thì lợi nhuận hoạt động thay đổi ra sao?",
        "options": [
          "Giảm khoảng 30%, vì đòn bẩy hoạt động khuếch đại theo cả hai chiều",
          "Giảm khoảng 10%, vì lợi nhuận biến động cùng tỷ lệ doanh thu",
          "Giảm khoảng 3%",
          "Không đổi, vì chi phí cố định không phụ thuộc doanh thu"
        ],
        "correct": 0,
        "explanation": "Chi phí cố định không giảm theo doanh thu, nên phần doanh thu mất đi trừ thẳng vào lợi nhuận. Đó là lý do khuếch đại xảy ra mạnh nhất đúng lúc doanh nghiệp cần đệm nhất."
      },
      {
        "question": "Tổ hợp nào rủi ro nhất?",
        "options": [
          "Đòn bẩy hoạt động cao + doanh thu mang tính chu kỳ + nợ vay lớn",
          "Đòn bẩy hoạt động cao + doanh thu ổn định + không nợ",
          "Chi phí biến đổi cao + doanh thu chu kỳ",
          "Chi phí biến đổi cao + nợ vay lớn"
        ],
        "correct": 0,
        "explanation": "Ba yếu tố này khuếch đại lẫn nhau: doanh thu sụt kéo lợi nhuận sụt mạnh hơn nhiều, trong khi nghĩa vụ trả lãi vẫn giữ nguyên. Đây là công thức dẫn tới kiệt quệ tài chính trong suy thoái."
      }
    ],
    "keyTakeaways": [
      "Fixed costs lớn làm lãi/lỗ nhạy hơn với doanh thu",
      "Operating leverage cao vừa là cơ hội vừa là rủi ro",
      "Cần đọc cùng chu kỳ doanh thu"
    ],
    "summary": {
      "keyIdea": "Fixed costs lớn làm lãi/lỗ nhạy hơn với doanh thu",
      "commonMistake": "Dễ bỏ qua: operating leverage cao vừa là cơ hội vừa là rủi ro",
      "action": "Cần đọc cùng chu kỳ doanh thu"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Vì sao một công ty phần mềm SaaS có thể tăng lợi nhuận nhanh hơn nhiều so với hãng hàng không, dù cả hai đều tăng doanh thu cùng một tỷ lệ phần trăm?"
      },
      {
        "type": "heading",
        "text": "Chi phí cố định là chìa khóa của operating leverage"
      },
      {
        "type": "paragraph",
        "text": "Khi chi phí cố định (fixed costs) chiếm tỷ trọng lớn trong cơ cấu chi phí, mỗi đồng doanh thu tăng thêm sẽ 'rơi xuống' lợi nhuận nhanh hơn nhiều - vì phần lớn chi phí đã được hấp thụ, không tăng theo doanh thu. Nhưng operating leverage là con dao hai lưỡi: nó khuếch đại cả lợi nhuận khi doanh thu tăng lẫn khoản lỗ khi doanh thu giảm, vì chi phí cố định vẫn phải trả bất kể kết quả kinh doanh."
      },
      {
        "type": "list",
        "items": [
          "Operating leverage cao làm lợi nhuận nhạy hơn nhiều với biến động doanh thu, theo cả hai chiều",
          "SaaS (fixed cost cao) thường chịu tổn thương lợi nhuận nặng hơn trong suy thoái so với doanh nghiệp variable cost cao",
          "Cần đọc operating leverage cùng chu kỳ doanh thu của ngành, không đọc riêng lẻ"
        ]
      },
      {
        "type": "formula",
        "title": "Đo mức độ đòn bẩy hoạt động",
        "equation": "DOL = % thay đổi lợi nhuận hoạt động ÷ % thay đổi doanh thu",
        "variables": [
          {
            "symbol": "DOL",
            "name": "Degree of operating leverage",
            "description": "DOL bằng 3 nghĩa là doanh thu tăng 1% thì lợi nhuận hoạt động tăng khoảng 3% - và giảm 1% thì lợi nhuận giảm khoảng 3%."
          }
        ],
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "Doanh thu +10% → lợi nhuận hoạt động +32%",
          "result": "DOL ≈ 3,2",
          "explanation": "Mức khuếch đại này rất hấp dẫn trong giai đoạn tăng trưởng, nhưng chính nó cũng khiến lợi nhuận bốc hơi nhanh khi doanh thu quay đầu. DOL cao nghĩa là biên độ dao động lợi nhuận lớn ở cả hai chiều."
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chi phí cố định cao",
          "text": "Phần mềm, viễn thông, hàng không, xi măng. Điểm hòa vốn cao, nhưng vượt qua rồi thì mỗi đồng doanh thu thêm gần như chảy thẳng xuống lợi nhuận. Rủi ro tập trung ở giai đoạn doanh thu sụt."
        },
        "right": {
          "label": "Chi phí biến đổi cao",
          "text": "Thương mại, phân phối, gia công. Biên lợi nhuận mỏng nhưng ổn định hơn qua chu kỳ, vì chi phí co lại cùng doanh thu. Ít khi lãi đột biến, cũng ít khi lỗ nặng."
        }
      },
      {
        "type": "heading",
        "text": "Đọc đòn bẩy hoạt động cùng ba yếu tố khác"
      },
      {
        "type": "list",
        "items": [
          "Tính ổn định của doanh thu: đòn bẩy cao cộng doanh thu chu kỳ là tổ hợp rủi ro nhất.",
          "Đòn bẩy tài chính: doanh nghiệp vừa có chi phí cố định cao vừa vay nhiều thì hai lớp khuếch đại chồng lên nhau.",
          "Vị trí so với điểm hòa vốn: doanh thu vừa trên điểm hòa vốn thì chỉ cần sụt nhẹ đã lỗ; doanh thu gấp đôi điểm hòa vốn có đệm dày hơn nhiều."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Chi phí cố định lớn không tự động là tốt hay xấu.",
          "Nó khuếch đại bất kỳ điều gì xảy ra với doanh thu - cả tốt lẫn xấu."
        ]
      }
    ]
  }),
  "income-affiliates-jv": patch({
    "openingQuestion": "Khi nào một khoản đầu tư được ghi nhận bằng equity method thay vì hợp nhất?",
    "openingOptions": [
      "Khi sở hữu 0-5%",
      "Khi sở hữu 20-50% hoặc có ảnh hưởng đáng kể",
      "Chỉ khi sở hữu 100%",
      "Không bao giờ"
    ],
    "correctOption": 1,
    "explanation": "Công ty có ảnh hưởng đáng kể thường ghi nhận theo equity method; còn kiểm soát đa số mới hợp nhất vào BCTC. Ranh giới 20-50% sở hữu là ngưỡng kế toán quy ước cho ảnh hưởng đáng kể - trên 50% thường coi là kiểm soát và phải hợp nhất toàn bộ báo cáo tài chính của công ty con.",
    "diagram": [
      {
        "label": "Sở hữu đáng kể",
        "arrow": true
      },
      {
        "label": "Equity method",
        "arrow": true
      },
      {
        "label": "Kiểm soát",
        "arrow": true
      },
      {
        "label": "Consolidation",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Lợi nhuận có, tiền chưa chắc có",
      "description": "Đây là điểm dễ bỏ sót nhất của phương pháp vốn chủ sở hữu. Khi công ty liên kết báo lãi, công ty mẹ ghi nhận phần tương ứng vào lợi nhuận ngay trong kỳ - nhưng tiền chỉ thực sự về khi công ty liên kết quyết định chia cổ tức, mà quyết định đó công ty mẹ không tự mình kiểm soát được vì chỉ nắm dưới 50%. Kết quả là một doanh nghiệp có thể ghi nhận hàng trăm tỷ lợi nhuận từ liên kết suốt nhiều năm mà dòng tiền thực nhận chỉ bằng một phần nhỏ. Khi so lợi nhuận với dòng tiền kinh doanh, đây thường là một trong những nguyên nhân gây chênh lệch."
    },
    "quiz": [
      {
        "question": "Tại sao equity income không giống hoàn toàn doanh thu hoạt động lõi?",
        "options": [
          "Vì đó là lợi nhuận từ phần sở hữu, không phải sales của core business",
          "Vì equity income luôn âm",
          "Vì không có dòng tiền",
          "Vì là cash accounting"
        ],
        "correct": 0,
        "explanation": "Lợi nhuận từ affiliates/JV là phần chia lợi nhuận chứ không phải doanh thu bán hàng của business lõi."
      },
      {
        "question": "Một công ty có Net Income tăng mạnh chủ yếu nhờ equity income từ một liên doanh lớn tăng đột biến một lần. Nhà đầu tư nên làm gì?",
        "options": [
          "Coi đây là tín hiệu core business đang tăng trưởng bền vững",
          "Tách riêng equity income khỏi lợi nhuận từ hoạt động lõi để đánh giá xem sự tăng trưởng đó có lặp lại được không",
          "Bỏ qua vì equity income luôn nhỏ",
          "Tự động kết luận công ty đang gian lận"
        ],
        "correct": 1,
        "explanation": "Equity income phụ thuộc vào hoạt động của công ty liên kết, có thể biến động thất thường và không phản ánh sức khỏe của mảng kinh doanh chính - tách riêng nó ra giúp nhà đầu tư đánh giá đúng tính bền vững của lợi nhuận."
      },
      {
        "question": "Vì sao lợi nhuận ghi nhận theo phương pháp vốn chủ sở hữu có thể không đi kèm dòng tiền?",
        "options": [
          "Vì tiền chỉ về khi công ty liên kết chia cổ tức, mà công ty mẹ không kiểm soát được quyết định đó",
          "Vì khoản lợi nhuận này bị đánh thuế hai lần",
          "Vì kế toán không cho phép ghi nhận tiền từ công ty liên kết",
          "Vì công ty liên kết luôn giữ lại toàn bộ lợi nhuận"
        ],
        "correct": 0,
        "explanation": "Ghi nhận lợi nhuận theo tỷ lệ sở hữu là bút toán trên sổ. Dòng tiền chỉ phát sinh khi có cổ tức, và với mức sở hữu dưới 50% thì công ty mẹ không tự quyết được việc đó."
      },
      {
        "question": "Khác biệt lớn nhất giữa hợp nhất và phương pháp vốn chủ sở hữu trên bảng cân đối là gì?",
        "options": [
          "Hợp nhất đưa toàn bộ nợ của công ty con lên bảng cân đối, còn phương pháp vốn chủ sở hữu thì không",
          "Hợp nhất không ghi nhận tài sản của công ty con",
          "Phương pháp vốn chủ sở hữu ghi nhận doanh thu của công ty liên kết",
          "Hai phương pháp cho kết quả giống hệt nhau trên bảng cân đối"
        ],
        "correct": 0,
        "explanation": "Đây là lý do mức sở hữu quanh ngưỡng 50% rất quan trọng với người phân tích: cùng một hoạt động kinh doanh, nợ có thể hiện lên hoặc không hiện lên bảng cân đối hợp nhất."
      }
    ],
    "keyTakeaways": [
      "20-50% thường liên quan ảnh hưởng đáng kể",
      "Trên 50% thường chuyển sang consolidation",
      "Equity income cần đọc riêng khỏi core operating profit"
    ],
    "summary": {
      "keyIdea": "20-50% thường liên quan ảnh hưởng đáng kể",
      "commonMistake": "Dễ bỏ qua: trên 50% thường chuyển sang consolidation",
      "action": "Equity income cần đọc riêng khỏi core operating profit"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khi một tập đoàn sở hữu một phần công ty khác (liên doanh, công ty liên kết), phần lợi nhuận nhận được từ đó được ghi nhận khác hẳn so với doanh thu bán hàng thông thường."
      },
      {
        "type": "heading",
        "text": "Equity method - khi ảnh hưởng đáng kể nhưng chưa kiểm soát"
      },
      {
        "type": "paragraph",
        "text": "Khi sở hữu 20-50% một công ty khác (ngưỡng kế toán quy ước cho 'ảnh hưởng đáng kể'), khoản đầu tư đó thường được ghi nhận theo equity method - công ty mẹ ghi nhận phần lợi nhuận tương ứng với tỷ lệ sở hữu, gọi là equity income. Trên 50% sở hữu (kiểm soát), toàn bộ báo cáo tài chính công ty con phải được hợp nhất (consolidation), không chỉ ghi nhận phần lợi nhuận."
      },
      {
        "type": "list",
        "items": [
          "Equity income là phần chia lợi nhuận từ công ty liên kết, không phải doanh thu bán hàng của hoạt động lõi",
          "20-50% sở hữu thường tương ứng ảnh hưởng đáng kể (equity method); trên 50% thường chuyển sang hợp nhất",
          "Nếu Net Income tăng mạnh chủ yếu nhờ equity income đột biến, cần tách riêng để đánh giá tính bền vững"
        ]
      },
      {
        "type": "conceptTable",
        "title": "Ba mức sở hữu, ba cách ghi nhận",
        "subtitle": "Ngưỡng là quy ước kế toán, bản chất nằm ở mức độ ảnh hưởng và kiểm soát",
        "concepts": [
          {
            "vi": "Dưới 20%",
            "en": "Khoản đầu tư tài chính",
            "def": "Thường ghi nhận theo giá gốc hoặc giá trị hợp lý. Chỉ ghi nhận thu nhập khi nhận cổ tức hoặc khi bán."
          },
          {
            "vi": "20% - 50%",
            "en": "Phương pháp vốn chủ sở hữu",
            "def": "Ghi nhận phần lợi nhuận tương ứng tỷ lệ sở hữu vào kết quả kinh doanh, giá trị khoản đầu tư trên bảng cân đối tăng giảm theo."
          },
          {
            "vi": "Trên 50%",
            "en": "Hợp nhất",
            "def": "Đưa toàn bộ doanh thu, chi phí, tài sản, nợ của công ty con vào báo cáo hợp nhất, rồi tách phần không thuộc sở hữu ra dòng lợi ích cổ đông thiểu số."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Phương pháp vốn chủ sở hữu",
          "text": "Doanh thu của công ty liên kết KHÔNG xuất hiện trong doanh thu của công ty mẹ. Chỉ một dòng lợi nhuận được ghi nhận. Nợ của công ty liên kết cũng không nằm trên bảng cân đối hợp nhất."
        },
        "right": {
          "label": "Hợp nhất",
          "text": "Toàn bộ doanh thu, chi phí, tài sản và NỢ của công ty con đi vào báo cáo hợp nhất, kể cả khi công ty mẹ chỉ sở hữu 51%. Phần không sở hữu được tách ra ở dòng lợi ích cổ đông thiểu số."
        }
      },
      {
        "type": "heading",
        "text": "Ba câu hỏi khi thấy lợi nhuận từ liên kết lớn"
      },
      {
        "type": "list",
        "items": [
          "Phần này chiếm bao nhiêu phần trăm lợi nhuận sau thuế? Trên 20-30% thì hoạt động lõi không còn là câu chuyện chính.",
          "Có ổn định qua các năm không, hay đến từ một khoản đột biến của công ty liên kết?",
          "Cổ tức thực nhận từ các công ty liên kết là bao nhiêu so với lợi nhuận đã ghi nhận? Khoảng cách lớn và kéo dài là điều cần giải thích."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Không phải mọi đồng lợi nhuận đều đến từ hoạt động kinh doanh chính.",
          "Tách riêng equity income giúp nhìn đúng sức khỏe của core business."
        ]
      }
    ]
  }),
  "interim-comprehensive-income": patch({
    "openingQuestion": "Comprehensive income khác net income ở điểm nào?",
    "openingOptions": [
      "Chỉ là tên gọi khác",
      "Bao gồm OCI ngoài net income",
      "Chỉ dùng cho ngân hàng",
      "Luôn nhỏ hơn"
    ],
    "correctOption": 1,
    "explanation": "Comprehensive income = Net income + OCI, tức là cộng thêm các khoản lãi/lỗ chưa hiện thực hoặc chuyển đổi ngoại tệ. Những khoản này chưa đi qua báo cáo kết quả kinh doanh nên không ảnh hưởng EPS, nhưng vẫn làm thay đổi giá trị vốn chủ sở hữu trên bảng cân đối.",
    "diagram": [
      {
        "label": "Net income",
        "arrow": true
      },
      {
        "label": "+ OCI",
        "arrow": true
      },
      {
        "label": "Comprehensive income",
        "arrow": true
      },
      {
        "label": "Bức tranh đầy đủ hơn",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Doanh nghiệp xuất khẩu có công ty con ở nước ngoài",
      "description": "Một doanh nghiệp Việt Nam có công ty con hoạt động bằng ngoại tệ. Mỗi kỳ, khi quy đổi báo cáo của công ty con về đồng Việt Nam để hợp nhất, chênh lệch tỷ giá phát sinh không đi qua báo cáo kết quả kinh doanh mà được ghi thẳng vào thu nhập toàn diện khác. Kết quả là lợi nhuận sau thuế và chỉ số EPS không hề thay đổi vì biến động tỷ giá, nhưng vốn chủ sở hữu trên bảng cân đối vẫn tăng hoặc giảm đáng kể. Ai chỉ theo dõi EPS sẽ hoàn toàn không thấy phần biến động này."
    },
    "quiz": [
      {
        "question": "OCI thường chứa gì?",
        "options": [
          "Thu nhập từ bán hàng",
          "Chênh lệch tỷ giá và unrealized gains/losses",
          "Chỉ lãi vay",
          "Lương nhân viên"
        ],
        "correct": 1,
        "explanation": "OCI ghi nhận các khoản ngoài net income nhưng vẫn ảnh hưởng đến vốn chủ."
      },
      {
        "question": "Một công ty đa quốc gia có OCI âm lớn do chênh lệch tỷ giá trong khi Net Income vẫn dương. Điều này có nghĩa gì?",
        "options": [
          "Công ty đang gian lận báo cáo",
          "Hoạt động kinh doanh chính vẫn có lãi, nhưng giá trị vốn chủ đang bị bào mòn bởi biến động tỷ giá của tài sản/nợ ở nước ngoài - một rủi ro cần theo dõi dù chưa hiện thực hóa",
          "Net Income sẽ tự động giảm theo OCI",
          "Không có ý nghĩa gì vì OCI không quan trọng"
        ],
        "correct": 1,
        "explanation": "OCI âm do tỷ giá cho thấy rủi ro ngoại hối đang ăn mòn giá trị sổ sách dù chưa ảnh hưởng đến lợi nhuận báo cáo - với công ty có tài sản/nợ lớn ở nước ngoài, đây là tín hiệu quan trọng về mức độ rủi ro tiền tệ cần theo dõi song song với Net Income."
      },
      {
        "question": "Vì sao chênh lệch tỷ giá khi hợp nhất công ty con nước ngoài được đưa vào OCI thay vì lợi nhuận?",
        "options": [
          "Vì đó là khoản chưa hiện thực hóa và không phản ánh năng lực vận hành, nên được tách khỏi thước đo hiệu quả điều hành",
          "Vì khoản đó không ảnh hưởng đến vốn chủ sở hữu",
          "Vì cơ quan thuế không cho ghi vào lợi nhuận",
          "Vì khoản đó luôn có giá trị bằng không vào cuối năm"
        ],
        "correct": 0,
        "explanation": "Mục đích là giữ cho chỉ tiêu lợi nhuận phản ánh hoạt động kinh doanh. Nhưng khoản đó vẫn làm thay đổi vốn chủ sở hữu thật, nên không được bỏ qua khi đánh giá giá trị."
      },
      {
        "question": "Nhóm doanh nghiệp nào cần đọc kỹ OCI nhất?",
        "options": [
          "Doanh nghiệp có công ty con ở nước ngoài hoặc nắm danh mục tài sản tài chính lớn",
          "Doanh nghiệp bán lẻ nội địa quy mô nhỏ",
          "Doanh nghiệp mới thành lập",
          "Doanh nghiệp không có nợ vay"
        ],
        "correct": 0,
        "explanation": "Ở các nhóm này, biến động tỷ giá và đánh giá lại tài sản tài chính có thể lớn hơn cả lợi nhuận hoạt động trong một kỳ, nên bỏ qua OCI là bỏ qua phần đáng kể của bức tranh."
      }
    ],
    "keyTakeaways": [
      "Comprehensive income rộng hơn net income",
      "OCI có thể làm vốn chủ thay đổi đáng kể",
      "Cần xem khi phân tích doanh nghiệp quốc tế hoặc tài sản tài chính lớn"
    ],
    "summary": {
      "keyIdea": "Comprehensive income rộng hơn net income",
      "commonMistake": "Dễ bỏ qua: oCI có thể làm vốn chủ thay đổi đáng kể",
      "action": "Cần xem khi phân tích doanh nghiệp quốc tế hoặc tài sản tài chính lớn"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Net income là chỉ số quen thuộc nhất trên báo cáo tài chính, nhưng nó chưa kể hết toàn bộ câu chuyện về sự thay đổi giá trị vốn chủ sở hữu trong kỳ."
      },
      {
        "type": "heading",
        "text": "Comprehensive Income = Net Income + OCI"
      },
      {
        "type": "paragraph",
        "text": "Other Comprehensive Income (OCI) ghi nhận các khoản lãi/lỗ CHƯA HIỆN THỰC HÓA - phổ biến nhất là chênh lệch tỷ giá khi hợp nhất báo cáo công ty con ở nước ngoài, hoặc biến động giá trị hợp lý của một số tài sản tài chính. Những khoản này chưa đi qua báo cáo kết quả kinh doanh nên không ảnh hưởng EPS, nhưng vẫn làm thay đổi giá trị vốn chủ sở hữu trên bảng cân đối."
      },
      {
        "type": "list",
        "items": [
          "OCI thường chứa chênh lệch tỷ giá và các khoản lãi/lỗ chưa hiện thực hóa khác",
          "Comprehensive income rộng hơn net income, phản ánh đầy đủ hơn sự thay đổi giá trị vốn chủ",
          "Đặc biệt quan trọng khi phân tích doanh nghiệp đa quốc gia hoặc nắm giữ nhiều tài sản tài chính"
        ]
      },
      {
        "type": "formula",
        "title": "Hai tầng của kết quả trong kỳ",
        "equation": "Thu nhập toàn diện = Lợi nhuận sau thuế + Thu nhập toàn diện khác (OCI)",
        "variables": [
          {
            "symbol": "Lợi nhuận sau thuế",
            "name": "Net income",
            "description": "Phần đã đi qua báo cáo kết quả kinh doanh, là mẫu số của EPS."
          },
          {
            "symbol": "OCI",
            "name": "Other comprehensive income",
            "description": "Các khoản lãi/lỗ chưa hiện thực hóa: chênh lệch tỷ giá khi hợp nhất, đánh giá lại một số tài sản tài chính, một số khoản liên quan quỹ hưu trí."
          }
        ],
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "Lợi nhuận sau thuế 500 tỷ + OCI (−180 tỷ)",
          "result": "Thu nhập toàn diện = 320 tỷ",
          "explanation": "EPS vẫn được tính trên 500 tỷ và trông rất ổn, nhưng phần giá trị thực sự tăng thêm cho cổ đông trong kỳ chỉ là 320 tỷ. Khoảng cách 180 tỷ chỉ hiện ra nếu bạn đọc tới báo cáo thu nhập toàn diện."
        }
      },
      {
        "type": "heading",
        "text": "Vì sao có khoản được đưa vào OCI thay vì lợi nhuận"
      },
      {
        "type": "paragraph",
        "text": "Nguyên tắc chung là tách những khoản chưa hiện thực hóa và nằm ngoài tầm kiểm soát của hoạt động kinh doanh ra khỏi thước đo hiệu quả điều hành. Biến động tỷ giá hay giá trị hợp lý của tài sản tài chính có thể đảo chiều ở kỳ sau; nếu đưa hết vào lợi nhuận thì con số lợi nhuận sẽ dao động mạnh vì những lý do không phản ánh năng lực vận hành. Đổi lại, người đọc phải nhớ mở thêm một báo cáo nữa mới thấy đủ bức tranh."
      },
      {
        "type": "callout",
        "label": "Khi nào OCI đáng chú ý nhất",
        "text": "Ba trường hợp: doanh nghiệp có nhiều công ty con ở nước ngoài, doanh nghiệp nắm giữ danh mục tài sản tài chính lớn (ngân hàng, bảo hiểm), và doanh nghiệp có nghĩa vụ quỹ hưu trí đáng kể. Với ba nhóm này, chỉ đọc lợi nhuận sau thuế là bỏ sót một phần lớn câu chuyện."
      },
      {
        "type": "closing",
        "lines": [
          "Net income không phải là toàn bộ bức tranh về giá trị vốn chủ đang thay đổi.",
          "OCI là phần âm thầm nhưng có thể rất đáng kể, đặc biệt với doanh nghiệp quốc tế."
        ]
      }
    ]
  }),
  "transfer-pricing": patch({
    "openingQuestion": "Transfer pricing là gì trong một tập đoàn đa quốc gia?",
    "openingOptions": [
      "Cách tính thuế VAT",
      "Giá nội bộ giữa các công ty liên quan",
      "Giá cổ phiếu nội bộ",
      "Một loại nợ ngắn hạn"
    ],
    "correctOption": 1,
    "explanation": "Transfer pricing là giá mà các công ty liên kết dùng để bán hàng hóa, dịch vụ hoặc IP cho nhau. Vì các bên liên kết không có động cơ thương lượng độc lập như hai công ty xa lạ, mức giá này ảnh hưởng trực tiếp đến việc lợi nhuận (và thuế phải nộp) được ghi nhận ở quốc gia nào.",
    "diagram": [
      {
        "label": "Công ty A",
        "arrow": true
      },
      {
        "label": "Bán nội bộ",
        "arrow": true
      },
      {
        "label": "Công ty B",
        "arrow": true
      },
      {
        "label": "Phân bổ lợi nhuận và thuế",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Quyền sở hữu trí tuệ - chỗ khó định giá nhất",
      "description": "Với hàng hóa hữu hình, cơ quan thuế còn có thể so sánh giá nội bộ với giá thị trường của sản phẩm tương tự. Với quyền sở hữu trí tuệ - thương hiệu, công nghệ, thuật toán - việc đó khó hơn nhiều vì không tồn tại một thị trường tham chiếu. Một tập đoàn có thể đặt pháp nhân nắm giữ quyền sở hữu trí tuệ ở nơi thuế suất thấp, rồi các công ty con ở những thị trường thuế cao trả phí bản quyền về đó. Về hình thức, mỗi giao dịch đều có hợp đồng; về bản chất, lợi nhuận đã dịch chuyển khỏi nơi doanh thu thực sự phát sinh. Đây là lý do các quy định về chuyển giá tập trung mạnh nhất vào giao dịch tài sản vô hình và dịch vụ nội bộ."
    },
    "quiz": [
      {
        "question": "Nguyên tắc arm's length nhằm làm gì?",
        "options": [
          "Định giá nội bộ như bên độc lập sẽ làm",
          "Đẩy lợi nhuận về nơi thuế thấp bằng mọi giá",
          "Tránh báo cáo tài chính",
          "Tăng chi phí cố định"
        ],
        "correct": 0,
        "explanation": "Arm's length yêu cầu giao dịch nội bộ giống như giao dịch giữa hai bên độc lập."
      },
      {
        "question": "Vì sao cơ quan thuế các nước đặc biệt quan tâm giám sát transfer pricing của các tập đoàn đa quốc gia?",
        "options": [
          "Vì họ muốn kiểm soát chất lượng sản phẩm",
          "Vì định giá nội bộ sai lệch có thể được dùng để chuyển lợi nhuận từ nước thuế cao sang nước thuế thấp, làm giảm số thuế phải nộp một cách nhân tạo",
          "Vì transfer pricing chỉ áp dụng cho công ty công nghệ",
          "Vì luật kế toán quốc tế cấm giao dịch nội bộ"
        ],
        "correct": 1,
        "explanation": "Nếu một công ty con ở nước thuế cao bán rẻ cho công ty con ở nước thuế thấp (hoặc ngược lại tính phí cao cho dịch vụ/IP nội bộ), lợi nhuận tập đoàn có thể bị dồn về nơi thuế thấp một cách nhân tạo - đây là lý do các cơ quan thuế yêu cầu tuân thủ nguyên tắc arm's length."
      },
      {
        "question": "Vì sao giao dịch quyền sở hữu trí tuệ nội bộ khó kiểm soát về chuyển giá hơn hàng hóa hữu hình?",
        "options": [
          "Vì thường không tồn tại giao dịch thị trường tương tự để so sánh giá",
          "Vì tài sản vô hình không được phép chuyển nhượng nội bộ",
          "Vì tài sản vô hình không có giá trị kế toán",
          "Vì cơ quan thuế không quan tâm đến tài sản vô hình"
        ],
        "correct": 0,
        "explanation": "Nguyên tắc giá thị trường dựa trên việc tìm được giao dịch so sánh. Với thương hiệu hay công nghệ độc quyền, không có thị trường tham chiếu, nên khoảng dao động của mức giá 'hợp lý' rất rộng."
      },
      {
        "question": "Với nhà đầu tư, rủi ro chính từ vấn đề chuyển giá là gì?",
        "options": [
          "Nghĩa vụ thuế truy thu và chi phí tranh chấp kéo dài, ảnh hưởng trực tiếp đến dòng tiền",
          "Doanh thu bị ghi giảm ở mọi thị trường",
          "Cổ phiếu bị hủy niêm yết bắt buộc",
          "Doanh nghiệp phải hợp nhất lại toàn bộ công ty con"
        ],
        "correct": 0,
        "explanation": "Đây là rủi ro định lượng được và cần theo dõi qua thuyết minh về giao dịch với bên liên quan cùng các khoản dự phòng thuế mà doanh nghiệp trích lập."
      }
    ],
    "keyTakeaways": [
      "Transfer pricing ảnh hưởng tới lợi nhuận và thuế",
      "Arm's length principle là chuẩn quan trọng",
      "Cần đọc cùng cấu trúc tập đoàn"
    ],
    "summary": {
      "keyIdea": "Transfer pricing ảnh hưởng tới lợi nhuận và thuế",
      "commonMistake": "Dễ bỏ qua: arm's length principle là chuẩn quan trọng",
      "action": "Cần đọc cùng cấu trúc tập đoàn"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trong một tập đoàn đa quốc gia, các công ty con thường xuyên mua bán hàng hóa, dịch vụ, hoặc quyền sở hữu trí tuệ cho nhau - mức giá của những giao dịch nội bộ này có tên gọi riêng: transfer pricing."
      },
      {
        "type": "heading",
        "text": "Vì sao transfer pricing bị giám sát chặt chẽ"
      },
      {
        "type": "paragraph",
        "text": "Vì các bên liên kết không có động cơ thương lượng độc lập như hai công ty xa lạ, mức giá nội bộ có thể được điều chỉnh để dồn lợi nhuận về quốc gia có thuế suất thấp hơn - một hình thức tối ưu thuế nhân tạo. Nguyên tắc 'arm's length' yêu cầu giao dịch nội bộ phải được định giá như thể đó là giao dịch giữa hai bên độc lập, để đảm bảo lợi nhuận (và thuế) được ghi nhận đúng nơi giá trị thực sự được tạo ra."
      },
      {
        "type": "list",
        "items": [
          "Transfer pricing là giá nội bộ giữa các công ty liên kết trong cùng tập đoàn",
          "Arm's length principle yêu cầu định giá nội bộ như giữa hai bên độc lập",
          "Cơ quan thuế giám sát chặt vì định giá sai lệch có thể chuyển lợi nhuận về nơi thuế thấp một cách nhân tạo"
        ]
      },
      {
        "type": "heading",
        "text": "Cách kiểm tra nguyên tắc giá thị trường"
      },
      {
        "type": "list",
        "items": [
          "So sánh giá giao dịch độc lập: tìm giao dịch tương tự giữa hai bên không liên kết để đối chiếu trực tiếp. Đơn giản nhất nhưng thường không có dữ liệu so sánh phù hợp.",
          "Giá bán lại: lấy giá bán cho khách hàng cuối trừ đi một mức lợi nhuận gộp hợp lý của khâu phân phối.",
          "Giá vốn cộng lãi: lấy chi phí sản xuất cộng một tỷ lệ lãi thông thường của ngành.",
          "So sánh tỷ suất lợi nhuận thuần và phân bổ lợi nhuận: dùng khi các phương pháp trên không áp dụng được, đặc biệt với tài sản vô hình."
        ]
      },
      {
        "type": "callout",
        "label": "Vì sao nhà đầu tư cần quan tâm",
        "text": "Rủi ro chuyển giá không nằm ở đạo đức mà nằm ở dòng tiền: một quyết định truy thu của cơ quan thuế có thể tạo ra nghĩa vụ hàng trăm tỷ và kéo dài nhiều năm tranh chấp. Với doanh nghiệp có giao dịch liên kết lớn, phần thuyết minh về giao dịch với bên liên quan là mục cần đọc kỹ."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dấu hiệu cần soi",
          "text": "Tỷ suất lợi nhuận của công ty tại thị trường lớn nhất lại thấp bất thường so với trung bình tập đoàn; phí bản quyền hoặc phí quản lý trả cho công ty mẹ chiếm tỷ trọng lớn và tăng nhanh hơn doanh thu."
        },
        "right": {
          "label": "Dấu hiệu bình thường",
          "text": "Giao dịch liên kết có hồ sơ xác định giá đầy đủ, tỷ suất lợi nhuận từng khâu tương đương mặt bằng ngành, và thuyết minh nêu rõ phương pháp định giá đang áp dụng."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Transfer pricing không chỉ là vấn đề kế toán nội bộ.",
          "Nó ảnh hưởng trực tiếp đến việc lợi nhuận tập đoàn được ghi nhận - và đóng thuế - ở đâu."
        ]
      }
    ]
  }),
  "maple-leaf-leverage": patch({
    "openingQuestion": "Net Debt/EBITDA cho biết điều gì trước tiên?",
    "openingOptions": [
      "Khả năng trả nợ bằng dòng tiền vận hành",
      "Biên gộp",
      "Tốc độ tăng trưởng doanh thu",
      "Số lượng cổ phiếu lưu hành"
    ],
    "correctOption": 0,
    "explanation": "Tỷ lệ này cho biết nếu dùng EBITDA hiện tại để trả nợ, doanh nghiệp cần bao lâu để trả hết nợ ròng. Tỷ lệ càng cao, doanh nghiệp càng cần nhiều năm hơn để trả hết nợ bằng dòng tiền vận hành hiện tại, tức là biên an toàn tài chính càng mỏng.",
    "diagram": [
      {
        "label": "Net debt",
        "arrow": true
      },
      {
        "label": "Chia EBITDA",
        "arrow": true
      },
      {
        "label": "Ra leverage ratio",
        "arrow": true
      },
      {
        "label": "So với ngưỡng an toàn",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Vì sao tỷ lệ nợ xấu đi khi chu kỳ đảo chiều",
      "description": "Một doanh nghiệp ngành chu kỳ có nợ ròng 3.000 tỷ và EBITDA 1.000 tỷ, tức tỷ lệ 3 lần - nhìn qua khá bình thường. Nhưng khi chu kỳ đảo chiều và EBITDA rơi xuống 400 tỷ, tỷ lệ lập tức thành 7,5 lần dù doanh nghiệp chưa vay thêm một đồng nào. Đây là điểm khiến chỉ số này dễ gây hiểu lầm: mẫu số biến động mạnh hơn tử số rất nhiều. Vì vậy cách đọc đúng là thử tính lại tỷ lệ với mức EBITDA của năm tệ nhất trong chu kỳ trước, thay vì chỉ nhìn con số của năm hiện tại."
    },
    "quiz": [
      {
        "question": "Tỷ lệ net debt/EBITDA quá cao thường hàm ý gì?",
        "options": [
          "Rủi ro thanh khoản cao hơn",
          "Cổ tức cao hơn",
          "Doanh thu chắc chắn tăng",
          "Giá trị sổ sách tăng"
        ],
        "correct": 0,
        "explanation": "Đòn bẩy cao làm biên an toàn mỏng hơn nếu EBITDA giảm."
      },
      {
        "question": "Một doanh nghiệp chu kỳ (như thép, dầu khí) có net debt/EBITDA = 3x ở đỉnh chu kỳ. Vì sao con số này đáng lo hơn cùng tỷ lệ ở một doanh nghiệp phòng thủ (như bán lẻ thực phẩm)?",
        "options": [
          "Vì thép luôn tệ hơn bán lẻ",
          "Vì EBITDA của doanh nghiệp chu kỳ có thể sụt mạnh khi chu kỳ đảo chiều, khiến tỷ lệ 3x có thể vọt lên rất cao chỉ trong 1-2 năm, trong khi EBITDA doanh nghiệp phòng thủ ổn định hơn nhiều",
          "Vì thép có nợ bằng ngoại tệ",
          "Không có sự khác biệt nào đáng kể"
        ],
        "correct": 1,
        "explanation": "Net debt/EBITDA đo bằng EBITDA hiện tại, nhưng với doanh nghiệp chu kỳ, chính EBITDA đó rất dễ biến động mạnh theo chu kỳ ngành - cùng một tỷ lệ nợ có thể an toàn ở doanh nghiệp phòng thủ nhưng rủi ro cao ở doanh nghiệp chu kỳ khi EBITDA sụt giảm đột ngột."
      },
      {
        "question": "Doanh nghiệp không vay thêm nhưng tỷ lệ nợ ròng trên EBITDA tăng từ 3 lên 7,5 lần. Nguyên nhân là gì?",
        "options": [
          "EBITDA sụt giảm mạnh, làm mẫu số nhỏ đi trong khi nợ giữ nguyên",
          "Doanh nghiệp đã trả bớt tiền mặt cho cổ đông",
          "Chi phí lãi vay tăng",
          "Doanh nghiệp thay đổi chính sách khấu hao"
        ],
        "correct": 0,
        "explanation": "Với ngành chu kỳ, mẫu số dao động mạnh hơn tử số rất nhiều. Đó là lý do nên thử tính lại tỷ lệ ở mức EBITDA của năm tệ nhất trong chu kỳ trước."
      },
      {
        "question": "Vì sao EBITDA có thể phóng đại khả năng trả nợ ở doanh nghiệp thâm dụng vốn?",
        "options": [
          "Vì nó bỏ qua khấu hao, trong khi doanh nghiệp vẫn phải liên tục chi tiền tái đầu tư tài sản",
          "Vì EBITDA đã trừ lãi vay hai lần",
          "Vì EBITDA không bao gồm doanh thu tài chính",
          "Vì EBITDA luôn nhỏ hơn lợi nhuận sau thuế"
        ],
        "correct": 0,
        "explanation": "Khấu hao là chi phí phi tiền mặt trong kỳ nhưng phản ánh nhu cầu chi tiền thật để duy trì tài sản. Bỏ qua nó khiến phần tiền thực sự còn lại để trả nợ bị đánh giá cao hơn thực tế."
      }
    ],
    "keyTakeaways": [
      "Net debt/EBITDA là thước đo leverage phổ biến",
      "Cần so sánh theo ngành, không đọc độc lập",
      "Đòn bẩy cao đi kèm rủi ro tái cấp vốn"
    ],
    "summary": {
      "keyIdea": "Net debt/EBITDA là thước đo leverage phổ biến",
      "commonMistake": "Dễ bỏ qua: cần so sánh theo ngành, không đọc độc lập",
      "action": "Đòn bẩy cao đi kèm rủi ro tái cấp vốn"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Net Debt/EBITDA là một trong những chỉ số đòn bẩy được theo dõi sát sao nhất - nhưng cùng một con số có thể mang ý nghĩa rủi ro rất khác nhau tùy ngành."
      },
      {
        "type": "heading",
        "text": "Net Debt/EBITDA đo gì"
      },
      {
        "type": "paragraph",
        "text": "Tỷ lệ này cho biết nếu dùng toàn bộ EBITDA hiện tại để trả nợ, doanh nghiệp cần bao nhiêu năm để trả hết nợ ròng. Tỷ lệ càng cao, biên an toàn tài chính càng mỏng. Với doanh nghiệp chu kỳ (thép, dầu khí), rủi ro lớn hơn nhiều so với doanh nghiệp phòng thủ ở cùng tỷ lệ nợ, vì chính EBITDA của họ có thể sụt mạnh khi chu kỳ đảo chiều, khiến tỷ lệ này vọt lên rất nhanh."
      },
      {
        "type": "list",
        "items": [
          "Net Debt/EBITDA cao đồng nghĩa rủi ro thanh khoản cao hơn nếu EBITDA giảm",
          "Luôn cần so sánh theo ngành - cùng tỷ lệ nợ có thể an toàn ở ngành phòng thủ nhưng rủi ro ở ngành chu kỳ",
          "Đòn bẩy cao đi kèm rủi ro tái cấp vốn khi khoản nợ đến hạn"
        ]
      },
      {
        "type": "formula",
        "title": "Công thức và cách đọc",
        "equation": "Nợ ròng ÷ EBITDA = (Nợ vay − Tiền mặt) ÷ EBITDA",
        "variables": [
          {
            "symbol": "Nợ ròng",
            "name": "Net debt",
            "description": "Tổng nợ vay ngắn hạn và dài hạn trừ tiền và tương đương tiền."
          },
          {
            "symbol": "EBITDA",
            "name": "Lợi nhuận trước lãi vay, thuế và khấu hao",
            "description": "Xấp xỉ dòng tiền vận hành trước các khoản đầu tư - dùng làm nguồn trả nợ giả định."
          }
        ],
        "example": {
          "title": "Cùng nợ, hai giai đoạn chu kỳ",
          "calculation": "3.000 ÷ 1.000 so với 3.000 ÷ 400",
          "result": "3,0 lần so với 7,5 lần",
          "explanation": "Doanh nghiệp không vay thêm đồng nào, nhưng mức đòn bẩy đo được tăng gấp 2,5 lần chỉ vì EBITDA giảm. Rủi ro thực đã tăng đúng như con số phản ánh - và đó là lúc các điều khoản ràng buộc trong hợp đồng vay dễ bị vi phạm nhất."
        }
      },
      {
        "type": "heading",
        "text": "Ba yếu tố phải đọc kèm"
      },
      {
        "type": "list",
        "items": [
          "Cơ cấu kỳ hạn nợ: 3 lần nhưng phần lớn đáo hạn trong 12 tháng tới rủi ro hơn nhiều so với 4 lần trải đều trong 7 năm.",
          "Khả năng trả lãi: tỷ lệ EBIT chia chi phí lãi vay cho biết doanh nghiệp còn đệm bao nhiêu trước khi không đủ trả lãi.",
          "Điều khoản ràng buộc trong hợp đồng vay: nhiều hợp đồng quy định trần cho tỷ lệ nợ ròng trên EBITDA; vượt trần có thể kích hoạt yêu cầu trả nợ trước hạn ngay giữa lúc khó khăn nhất."
        ]
      },
      {
        "type": "callout",
        "label": "Hạn chế của EBITDA",
        "text": "EBITDA bỏ qua khấu hao, nên với doanh nghiệp thâm dụng vốn phải tái đầu tư liên tục, nó phóng đại dòng tiền thực sự dùng để trả nợ được. Với các ngành này nên đối chiếu thêm dòng tiền kinh doanh trừ chi đầu tư duy trì."
      },
      {
        "type": "closing",
        "lines": [
          "Một con số Net Debt/EBITDA không có ý nghĩa gì nếu tách khỏi bối cảnh ngành.",
          "Luôn hỏi: EBITDA của doanh nghiệp này ổn định đến đâu qua các chu kỳ?"
        ]
      }
    ]
  }),
  "tesla-cash-flow": patch({
    "openingQuestion": "Tại sao một công ty có net income dương nhưng operating cash flow vẫn yếu?",
    "openingOptions": [
      "Vì doanh thu chưa thu tiền",
      "Vì tiền mặt biến mất",
      "Vì chỉ số kế toán sai",
      "Vì không có thuế"
    ],
    "correctOption": 0,
    "explanation": "Doanh thu và lợi nhuận có thể ghi nhận trước khi tiền thực sự về, đặc biệt khi khoản phải thu và vốn lưu động tăng. Ở các doanh nghiệp tăng trưởng nhanh, khoảng lệch này có thể kéo dài nhiều quý liên tiếp khi công ty liên tục mở rộng quy mô hoạt động.",
    "diagram": [
      {
        "label": "Net income",
        "arrow": true
      },
      {
        "label": "Working capital",
        "arrow": true
      },
      {
        "label": "CapEx",
        "arrow": true
      },
      {
        "label": "Operating cash flow",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Ba câu hỏi khi dòng tiền âm ở doanh nghiệp tăng trưởng",
      "description": "Dòng tiền kinh doanh âm ở một doanh nghiệp đang mở rộng nhanh không tự nó là tín hiệu xấu, nhưng nó luôn đặt ra ba câu hỏi. Thứ nhất, tiền đang bị khóa vào đâu - phải thu, tồn kho, hay chi đầu tư tài sản? Thứ hai, khoản đó có chuyển thành doanh thu ở các kỳ sau không, hay chỉ tích tụ mãi? Thứ ba, doanh nghiệp lấy nguồn nào để trụ qua giai đoạn này - tiền mặt sẵn có, vay thêm, hay phát hành cổ phần làm pha loãng cổ đông hiện hữu? Doanh nghiệp trả lời được cả ba câu và có xu hướng cải thiện qua các quý thì đang đầu tư; doanh nghiệp không trả lời được thì đang đốt tiền."
    },
    "quiz": [
      {
        "question": "Khi nào OCF thường yếu hơn net income?",
        "options": [
          "Khi khoản phải thu tăng",
          "Khi lãi suất giảm",
          "Khi biên gộp tăng",
          "Khi cổ tức tăng"
        ],
        "correct": 0,
        "explanation": "Working capital phình ra làm tiền bị giữ lại trong business."
      },
      {
        "question": "Một công ty tăng trưởng nhanh có net income dương nhiều quý liên tiếp nhưng OCF âm liên tục vì CapEx và working capital tăng mạnh. Đây có tự động là dấu hiệu xấu không?",
        "options": [
          "Có, luôn luôn là dấu hiệu xấu cần bán cổ phiếu ngay",
          "Không tự động xấu - cần xem công ty có đang đầu tư đúng vào tăng trưởng tương lai hay không, và liệu công ty có đủ nguồn vốn (huy động vốn, vay) để duy trì trong giai đoạn này",
          "Không quan trọng vì net income mới là chỉ số duy nhất cần nhìn",
          "Chỉ xấu nếu công ty niêm yết ở Mỹ"
        ],
        "correct": 1,
        "explanation": "Nhiều doanh nghiệp tăng trưởng nhanh (như Tesla ở giai đoạn mở rộng) có OCF âm hợp lý vì đang đầu tư mạnh cho tương lai - điều quan trọng là công ty có đủ nguồn vốn để duy trì và liệu khoản đầu tư đó có tạo ra ROIC tốt trong dài hạn hay không, không chỉ nhìn dấu âm/dương đơn thuần."
      },
      {
        "question": "Điều gì phân biệt 'đầu tư cho tăng trưởng' với 'đốt tiền' khi dòng tiền kinh doanh âm?",
        "options": [
          "Khoản tiền bị khóa có chuyển thành doanh thu ở các kỳ sau và dòng tiền có cải thiện dần hay không",
          "Quy mô tuyệt đối của dòng tiền âm",
          "Việc doanh nghiệp có niêm yết hay không",
          "Việc doanh nghiệp có báo lãi kế toán hay không"
        ],
        "correct": 0,
        "explanation": "Cả hai trường hợp đều cho ra dòng tiền âm ở hiện tại. Chỉ có diễn biến ở các kỳ tiếp theo mới phân biệt được, nên phải theo dõi xu hướng chứ không kết luận từ một kỳ."
      },
      {
        "question": "Vì sao nên nhìn dòng tiền kinh doanh cộng dồn bốn quý thay vì từng quý?",
        "options": [
          "Vì vốn lưu động dao động mạnh theo mùa vụ, khiến từng quý riêng lẻ dễ gây hiểu nhầm",
          "Vì báo cáo quý không được kiểm toán nên không đáng tin",
          "Vì doanh nghiệp chỉ công bố dòng tiền mỗi năm một lần",
          "Vì bốn quý luôn cho kết quả dương"
        ],
        "correct": 0,
        "explanation": "Nhiều ngành có mùa cao điểm rõ rệt: tồn kho tăng trước mùa và giảm sau mùa. Cộng dồn bốn quý loại bỏ được nhiễu này và cho thấy xu hướng thật."
      }
    ],
    "keyTakeaways": [
      "Net income không thay thế được cash flow",
      "Working capital và CapEx là hai nguồn lệch lớn",
      "Đọc báo cáo phải xem cả lợi nhuận và tiền mặt"
    ],
    "summary": {
      "keyIdea": "Net income không thay thế được cash flow",
      "commonMistake": "Dễ bỏ qua: working capital và CapEx là hai nguồn lệch lớn",
      "action": "Đọc báo cáo phải xem cả lợi nhuận và tiền mặt"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một công ty có Net Income dương nhiều quý liên tiếp nhưng Operating Cash Flow vẫn yếu - đây là tình huống thường gặp ở các doanh nghiệp tăng trưởng nhanh."
      },
      {
        "type": "heading",
        "text": "Doanh thu ghi nhận trước, tiền về sau"
      },
      {
        "type": "paragraph",
        "text": "Doanh thu và lợi nhuận có thể được ghi nhận trước khi tiền thực sự về, đặc biệt khi khoản phải thu và vốn lưu động tăng nhanh cùng tốc độ mở rộng quy mô. Đây không tự động là dấu hiệu xấu - cần xem doanh nghiệp có đang đầu tư đúng vào tăng trưởng tương lai hay không, và liệu có đủ nguồn vốn (huy động, vay) để duy trì trong giai đoạn OCF âm này."
      },
      {
        "type": "list",
        "items": [
          "Khoản phải thu tăng mạnh là nguyên nhân phổ biến khiến OCF yếu hơn Net Income",
          "OCF âm ở doanh nghiệp tăng trưởng nhanh có thể hợp lý nếu đang đầu tư đúng hướng và có đủ nguồn vốn duy trì",
          "Net income không thay thế được việc theo dõi cả working capital và CapEx"
        ]
      },
      {
        "type": "heading",
        "text": "Bốn chỉ số theo dõi cùng nhau qua các quý"
      },
      {
        "type": "list",
        "items": [
          "Tốc độ tăng phải thu so với tốc độ tăng doanh thu - phải thu chạy trước nhiều quý liên tiếp là dấu hiệu chính sách bán chịu đang nới rộng.",
          "Số ngày tồn kho - tăng dần nghĩa là hàng luân chuyển chậm lại, dù doanh thu vẫn tăng.",
          "Dòng tiền kinh doanh cộng dồn bốn quý - làm mượt yếu tố mùa vụ, cho thấy xu hướng thật rõ hơn từng quý riêng lẻ.",
          "Nguồn tài trợ cho phần thiếu hụt - đọc dòng tiền tài chính để biết doanh nghiệp đang vay thêm hay phát hành cổ phần."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đầu tư cho tăng trưởng",
          "text": "Tiền bị khóa vào tồn kho và tài sản cố định phục vụ công suất mới; doanh thu các quý sau tăng tương ứng; dòng tiền kinh doanh cải thiện dần khi công suất đi vào khai thác."
        },
        "right": {
          "label": "Đốt tiền",
          "text": "Tiền chủ yếu bị khóa vào phải thu khó thu hồi và tồn kho luân chuyển chậm; doanh thu không tăng tương ứng; dòng tiền kinh doanh âm sâu hơn qua từng năm và phải liên tục huy động vốn mới để bù."
        }
      },
      {
        "type": "callout",
        "label": "Nhìn cộng dồn, đừng nhìn một quý",
        "text": "Vốn lưu động dao động mạnh theo mùa vụ, nên một quý dòng tiền âm hầu như không nói lên điều gì. Bốn quý cộng dồn, so sánh với cùng kỳ năm trước, mới là góc nhìn đủ để kết luận về xu hướng."
      },
      {
        "type": "closing",
        "lines": [
          "Đừng vội kết luận xấu chỉ vì OCF âm.",
          "Câu hỏi quan trọng hơn là: doanh nghiệp có đủ nguồn vốn để duy trì giai đoạn này không, và khoản đầu tư đó có tạo giá trị dài hạn không?"
        ]
      }
    ]
  }),
  "dupont-analysis": patch({
    "openingQuestion": "DuPont Analysis tách ROE thành những phần nào?",
    "openingOptions": [
      "Margin, turnover, leverage",
      "Revenue, tax, cash",
      "Debt, dividend, growth",
      "Price, book, EPS"
    ],
    "correctOption": 0,
    "explanation": "DuPont cho phép bóc ROE thành biên lợi nhuận, vòng quay tài sản và đòn bẩy tài chính. Nhờ đó, hai công ty có ROE giống hệt nhau có thể tạo ra con số đó theo những cách rất khác nhau - và cách nào bền vững hơn mới là điều nhà đầu tư thực sự cần biết.",
    "diagram": [
      {
        "label": "Net margin",
        "arrow": true
      },
      {
        "label": "Asset turnover",
        "arrow": true
      },
      {
        "label": "Equity multiplier",
        "arrow": true
      },
      {
        "label": "ROE",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Ba con đường tới cùng một ROE 20%",
      "description": "Một chuỗi siêu thị điển hình đạt ROE cao nhờ vòng quay tài sản rất lớn dù biên lợi nhuận chỉ vài phần trăm - bán rất nhiều, lãi mỏng trên mỗi đơn vị. Một doanh nghiệp hàng xa xỉ đạt cùng ROE theo cách ngược lại: biên lợi nhuận rất dày, vòng quay chậm. Một doanh nghiệp thứ ba đạt ROE tương đương chủ yếu nhờ hệ số đòn bẩy cao - biên mỏng, vòng quay trung bình, nhưng vốn chủ chỉ chiếm một phần nhỏ nguồn vốn. Ba mô hình này chịu tác động hoàn toàn khác nhau khi lãi suất tăng hoặc nhu cầu giảm, dù bảng xếp hạng theo ROE cho thấy chúng ngang nhau."
    },
    "quiz": [
      {
        "question": "Nếu ROE tăng chủ yếu do equity multiplier, điều gì cần cảnh giác?",
        "options": [
          "Đòn bẩy đang cao hơn",
          "Margin tăng mạnh",
          "Doanh thu giảm",
          "Thuế giảm"
        ],
        "correct": 0,
        "explanation": "ROE tăng nhờ nợ nhiều hơn không chắc là chất lượng tăng trưởng tốt."
      },
      {
        "question": "Công ty A có ROE 20% chủ yếu nhờ net margin cao (biên lợi nhuận tốt). Công ty B cũng ROE 20% nhưng chủ yếu nhờ equity multiplier cao (vay nợ nhiều). Công ty nào thường được xem là chất lượng tăng trưởng bền vững hơn?",
        "options": [
          "Công ty B vì có đòn bẩy nên tăng trưởng nhanh hơn",
          "Công ty A thường bền vững hơn vì lợi nhuận cao đến từ hiệu quả kinh doanh thực sự, không phụ thuộc vào mức nợ có thể trở thành rủi ro khi lãi suất tăng hoặc dòng tiền gặp khó khăn",
          "Cả hai chất lượng như nhau vì ROE bằng nhau",
          "Không thể so sánh nếu không biết ngành nghề"
        ],
        "correct": 1,
        "explanation": "DuPont cho thấy ROE cao nhờ margin tốt (hiệu quả kinh doanh) thường bền vững hơn ROE cao nhờ đòn bẩy tài chính cao - công ty dựa nhiều vào nợ dễ tổn thương hơn khi lãi suất tăng hoặc doanh thu suy giảm, dù ROE báo cáo nhìn giống hệt nhau."
      },
      {
        "question": "ROE của một doanh nghiệp giữ ổn định ở 18% trong 5 năm, nhưng biên lợi nhuận giảm dần trong khi hệ số đòn bẩy tăng dần. Điều này nghĩa là gì?",
        "options": [
          "Hiệu quả kinh doanh đang suy giảm và được bù đắp bằng vay nợ nhiều hơn - rủi ro thực đã tăng",
          "Doanh nghiệp đang cải thiện hiệu quả sử dụng vốn",
          "Không có gì đáng ngại vì ROE không đổi",
          "Doanh nghiệp đang chuyển sang mô hình vòng quay cao"
        ],
        "correct": 0,
        "explanation": "Đây chính là loại thông tin mà con số ROE tổng hợp che giấu. Cùng một mức ROE nhưng cấu thành xấu đi thì chất lượng lợi nhuận và khả năng chống chịu đều giảm."
      },
      {
        "question": "Doanh nghiệp bán lẻ có biên lợi nhuận 2% nhưng ROE 20%. Điều đó chủ yếu nhờ đâu?",
        "options": [
          "Vòng quay tài sản rất cao, có thể kết hợp thêm đòn bẩy",
          "Biên lợi nhuận gộp cao",
          "Chi phí lãi vay thấp",
          "Thuế suất ưu đãi"
        ],
        "correct": 0,
        "explanation": "Mô hình bán lẻ sống bằng việc quay vòng hàng hóa thật nhanh: lãi mỏng trên mỗi đơn vị nhưng số vòng quay lớn, nên vẫn tạo ra mức sinh lời cao trên vốn chủ."
      }
    ],
    "keyTakeaways": [
      "DuPont giúp biết ROE đến từ đâu",
      "Margin, turnover và leverage đều có vai trò",
      "ROE cao chưa chắc đã là ROE khỏe"
    ],
    "summary": {
      "keyIdea": "DuPont giúp biết ROE đến từ đâu",
      "commonMistake": "Dễ bỏ qua: margin, turnover và leverage đều có vai trò",
      "action": "ROE cao chưa chắc đã là ROE khỏe"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hai công ty có cùng ROE 20% - nhưng con số đó có thể đến từ những nguồn hoàn toàn khác nhau, và DuPont Analysis là công cụ giúp bóc tách sự khác biệt đó."
      },
      {
        "type": "heading",
        "text": "Ba mảnh ghép của ROE"
      },
      {
        "type": "paragraph",
        "text": "DuPont tách ROE thành ba thành phần: biên lợi nhuận ròng (net margin), vòng quay tài sản (asset turnover), và đòn bẩy tài chính (equity multiplier). ROE cao nhờ margin tốt phản ánh hiệu quả kinh doanh thực sự và thường bền vững hơn; ROE cao nhờ equity multiplier (vay nợ nhiều) tiềm ẩn rủi ro lớn hơn khi lãi suất tăng hoặc dòng tiền gặp khó khăn, dù con số ROE báo cáo trông giống hệt nhau."
      },
      {
        "type": "list",
        "items": [
          "ROE = Net Margin × Asset Turnover × Equity Multiplier",
          "ROE tăng chủ yếu nhờ equity multiplier là tín hiệu cần cảnh giác về mức độ đòn bẩy",
          "ROE cao chưa chắc là ROE khỏe - cần biết nó đến từ đâu"
        ]
      },
      {
        "type": "formula",
        "title": "Phân tách DuPont ba thành phần",
        "equation": "ROE = (Lợi nhuận ÷ Doanh thu) × (Doanh thu ÷ Tài sản) × (Tài sản ÷ Vốn chủ)",
        "variables": [
          {
            "symbol": "Biên lợi nhuận ròng",
            "name": "Net margin",
            "description": "Kiếm được bao nhiêu lãi trên mỗi đồng doanh thu - phản ánh sức mạnh định giá và kiểm soát chi phí."
          },
          {
            "symbol": "Vòng quay tài sản",
            "name": "Asset turnover",
            "description": "Mỗi đồng tài sản tạo ra bao nhiêu đồng doanh thu - phản ánh hiệu quả sử dụng tài sản."
          },
          {
            "symbol": "Hệ số đòn bẩy",
            "name": "Equity multiplier",
            "description": "Tài sản gấp bao nhiêu lần vốn chủ - càng cao nghĩa là càng dựa nhiều vào nợ."
          }
        ],
        "example": {
          "title": "Hai mô hình, cùng ROE",
          "calculation": "Bán lẻ: 2% × 4,0 × 2,5 · Hàng cao cấp: 20% × 0,5 × 2,0",
          "result": "20% và 20%",
          "explanation": "Cùng ROE 20% nhưng bản chất khác hẳn: một bên sống bằng vòng quay, một bên sống bằng biên lợi nhuận. Chiến lược, rủi ro và cách phản ứng với suy thoái của hai mô hình này hoàn toàn khác nhau."
        }
      },
      {
        "type": "heading",
        "text": "Đọc xu hướng từng thành phần qua 5 năm"
      },
      {
        "type": "list",
        "items": [
          "Biên lợi nhuận giảm dần: sức mạnh định giá đang yếu đi, hoặc cạnh tranh gay gắt hơn, hoặc cơ cấu sản phẩm dịch chuyển sang phân khúc lãi mỏng.",
          "Vòng quay tài sản giảm dần: tài sản mới đầu tư chưa tạo ra doanh thu tương ứng - cần xem là do dự án chưa vận hành hết công suất hay do đầu tư kém hiệu quả.",
          "Hệ số đòn bẩy tăng dần: ROE được giữ vững nhờ vay thêm chứ không nhờ cải thiện hoạt động - đây là mẫu hình đáng lo nhất vì nó che giấu sự suy giảm ở hai thành phần kia."
        ]
      },
      {
        "type": "callout",
        "label": "Câu hỏi cuối cùng của DuPont",
        "text": "Không phải \"ROE bao nhiêu\" mà là \"nếu lãi suất tăng 3 điểm phần trăm và doanh thu giảm 15%, thành phần nào của ROE này sẽ chịu ảnh hưởng nặng nhất\". Câu trả lời cho biết mức độ bền của con số bạn đang nhìn."
      },
      {
        "type": "closing",
        "lines": [
          "ROE là một con số tổng hợp, không phải điểm dừng của phân tích.",
          "DuPont giúp bạn hỏi đúng câu hỏi tiếp theo: con số này đến từ đâu?"
        ]
      }
    ]
  }),
  "dividend": patch({
    "openingQuestion": "Cổ tức bền vững phụ thuộc nhiều nhất vào yếu tố nào?",
    "openingOptions": [
      "Doanh thu tăng",
      "Free cash flow và payout discipline",
      "P/B thấp",
      "Số lượng nhân viên"
    ],
    "correctOption": 1,
    "explanation": "Cổ tức chỉ bền khi doanh nghiệp thật sự tạo ra tiền mặt đủ sau CapEx và nhu cầu tái đầu tư. Trả cổ tức từ vay nợ hoặc tiền mặt dự trữ trong khi FCF âm là một mô hình khó duy trì lâu dài và thường là dấu hiệu cảnh báo sớm.",
    "diagram": [
      {
        "label": "FCF",
        "arrow": true
      },
      {
        "label": "Payout ratio",
        "arrow": true
      },
      {
        "label": "Cổ tức",
        "arrow": true
      },
      {
        "label": "Tính bền vững",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Doanh nghiệp trưởng thành",
      "description": "Các công ty mature thường chi trả cổ tức đều hơn vì nhu cầu tái đầu tư thấp hơn các doanh nghiệp tăng trưởng."
    },
    "quiz": [
      {
        "question": "Một doanh nghiệp có Net Income cao nhưng FCF âm thì trả cổ tức thế nào?",
        "options": [
          "Rất bền vững",
          "Có thể phải vay hoặc dùng tiền mặt dự trữ",
          "Không liên quan",
          "Chỉ cần chia cổ phiếu"
        ],
        "correct": 1,
        "explanation": "Nếu tiền mặt thật không đủ, cổ tức chỉ có thể đến từ nguồn khác chứ không phải từ hoạt động hiện tại."
      },
      {
        "question": "Một công ty giữ nguyên mức cổ tức trong 5 năm liền dù FCF giảm dần mỗi năm. Rủi ro lớn nhất là gì?",
        "options": [
          "Không có rủi ro vì cổ tức không đổi luôn tốt",
          "Payout ratio (tỷ lệ chia so với FCF) đang tăng dần đến mức không bền vững, và công ty có thể buộc phải cắt giảm cổ tức đột ngột khi FCF không còn đủ bù đắp",
          "Cổ đông sẽ được lợi nhiều hơn",
          "Giá cổ phiếu chắc chắn sẽ tăng"
        ],
        "correct": 1,
        "explanation": "Giữ nguyên cổ tức khi FCF giảm dần nghĩa là payout ratio đang âm thầm tăng lên - đến một điểm tới hạn, công ty sẽ phải vay để trả cổ tức hoặc cắt giảm đột ngột, điều mà thị trường thường phản ứng rất tiêu cực vì đã kỳ vọng mức cổ tức ổn định."
      },
      {
        "question": "Doanh nghiệp có lợi nhuận 500 tỷ, FCF 300 tỷ, đã trả cổ tức 350 tỷ. Nhận định nào đúng?",
        "options": [
          "Payout ratio trên lợi nhuận trông an toàn (70%) nhưng cổ tức đã vượt FCF, phần chênh phải lấy từ tiền mặt dự trữ hoặc vay thêm",
          "Cổ tức hoàn toàn bền vững vì payout ratio dưới 100%",
          "Doanh nghiệp chắc chắn đang gian lận báo cáo tài chính",
          "Không thể đánh giá nếu chưa biết ngành"
        ],
        "correct": 0,
        "explanation": "Đây chính là điểm mấu chốt bài học: hai thước đo trên hai mẫu số khác nhau cho hai kết luận khác nhau, và FCF mới phản ánh tiền mặt thật."
      },
      {
        "question": "Vì sao ban lãnh đạo thường ngại cắt giảm cổ tức, kể cả khi FCF đã yếu đi rõ rệt?",
        "options": [
          "Vì thị trường thường đọc việc cắt cổ tức như tín hiệu tiêu cực về triển vọng dòng tiền, khiến giá cổ phiếu phản ứng mạnh",
          "Vì luật pháp cấm doanh nghiệp cắt giảm cổ tức",
          "Vì cổ tức không ảnh hưởng đến giá cổ phiếu",
          "Vì cổ đông luôn đồng ý ngay khi được giải thích lý do"
        ],
        "correct": 0,
        "explanation": "Tín hiệu học (signaling) là lý do kinh tế thực sự đằng sau việc nhiều doanh nghiệp trì hoãn cắt cổ tức lâu hơn mức tài chính cho phép, cho tới khi không còn lựa chọn khác."
      }
    ],
    "keyTakeaways": [
      "Cổ tức phải đọc cùng FCF",
      "Payout ratio cao chưa chắc bền",
      "Mature business thường phù hợp hơn growth business để chia cổ tức"
    ],
    "summary": {
      "keyIdea": "Cổ tức phải đọc cùng FCF",
      "commonMistake": "Dễ bỏ qua: payout ratio cao chưa chắc bền",
      "action": "Mature business thường phù hợp hơn growth business để chia cổ tức"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cổ tức đều đặn là dấu hiệu doanh nghiệp ổn định - nhưng cổ tức chỉ thực sự bền vững khi nó được trả từ tiền mặt thật, không phải từ vay nợ hay dự trữ."
      },
      {
        "type": "heading",
        "text": "Free Cash Flow quyết định tính bền vững của cổ tức"
      },
      {
        "type": "paragraph",
        "text": "Cổ tức chỉ bền khi doanh nghiệp thật sự tạo ra đủ tiền mặt sau khi đã trừ CapEx và các nhu cầu tái đầu tư cần thiết. Nếu Net Income cao nhưng FCF âm, doanh nghiệp chỉ có thể trả cổ tức bằng cách vay thêm hoặc dùng tiền mặt dự trữ - một mô hình khó duy trì lâu dài. Giữ nguyên mức cổ tức trong khi FCF giảm dần mỗi năm là một tín hiệu cảnh báo âm thầm: payout ratio đang tăng dần đến mức không bền vững."
      },
      {
        "type": "list",
        "items": [
          "Cổ tức phải luôn được đọc cùng FCF, không chỉ Net Income",
          "Payout ratio cao và tăng dần là tín hiệu cảnh báo, ngay cả khi mức cổ tức tuyệt đối không đổi",
          "Doanh nghiệp trưởng thành (mature) thường phù hợp trả cổ tức hơn doanh nghiệp đang tăng trưởng mạnh"
        ]
      },
      {
        "type": "formula",
        "title": "Tỷ lệ chi trả và phần dư ra",
        "equation": "Payout ratio = Cổ tức đã trả ÷ Lợi nhuận sau thuế",
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "Lợi nhuận 500 tỷ, FCF 300 tỷ, cổ tức đã trả 350 tỷ",
          "result": "Payout ratio 70% trên lợi nhuận nhưng vượt cả FCF",
          "explanation": "Doanh nghiệp đang trả nhiều hơn số tiền mặt tự do nó tạo ra trong kỳ - phần chênh 50 tỷ phải lấy từ tiền mặt dự trữ hoặc vay thêm. Payout ratio tính trên lợi nhuận kế toán trông vẫn an toàn (70%), nhưng so với FCF thì đã vượt 100%."
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cổ tức bền vững",
          "text": "FCF ổn định và lớn hơn cổ tức chi trả nhiều năm liền, payout ratio giữ trong khoảng an toàn, doanh nghiệp vẫn còn dư tiền cho các nhu cầu bất ngờ."
        },
        "right": {
          "label": "Cổ tức đang ăn vào vốn",
          "text": "FCF giảm dần hoặc âm nhưng mức cổ tức tuyệt đối vẫn được giữ nguyên - ban lãnh đạo lo ngại cắt cổ tức sẽ bị thị trường phản ứng tiêu cực, nên vay thêm hoặc rút dự trữ để duy trì."
        }
      },
      {
        "type": "heading",
        "text": "Ba dấu hiệu cổ tức đang gặp rủi ro"
      },
      {
        "type": "list",
        "items": [
          "Payout ratio tính trên FCF liên tục vượt 100% qua nhiều năm, dù payout ratio trên lợi nhuận kế toán vẫn trông ổn.",
          "Nợ vay tăng đều đặn trong khi mức cổ tức không đổi - dấu hiệu vay để trả cổ tức thay vì để đầu tư.",
          "Tiền mặt và tương đương tiền giảm dần qua các kỳ trong khi cổ tức vẫn giữ nguyên mức cũ."
        ]
      },
      {
        "type": "callout",
        "label": "Vì sao doanh nghiệp ngại cắt cổ tức",
        "text": "Cắt giảm cổ tức thường bị thị trường đọc như tín hiệu ban lãnh đạo không còn tin vào triển vọng dòng tiền tương lai, nên giá cổ phiếu hay phản ứng tiêu cực mạnh hơn mức giảm cổ tức thực tế. Chính nỗi lo này đôi khi khiến doanh nghiệp duy trì cổ tức bằng mọi giá lâu hơn mức lành mạnh, cho tới khi buộc phải cắt đột ngột."
      },
      {
        "type": "closing",
        "lines": [
          "Một mức cổ tức ổn định trên giấy tờ không đảm bảo nó bền vững.",
          "Luôn kiểm tra: tiền mặt thật có đủ để trả cổ tức đó không?"
        ]
      }
    ]
  }),
  "walmart-earnings": patch({
    "openingQuestion": "Walmart thường tạo lợi nhuận bằng cách nào?",
    "openingOptions": [
      "Biên gộp siêu cao",
      "Volume lớn, turnover nhanh, logistics mạnh",
      "Dùng nhiều nợ",
      "Chờ giá hàng tăng"
    ],
    "correctOption": 1,
    "explanation": "Bán lẻ lớn thường thắng nhờ vòng quay hàng, quy mô mua hàng và chuỗi cung ứng, không chỉ nhờ margin cao. Với biên lợi nhuận từng đơn hàng mỏng, lợi nhuận tổng thể đến từ việc bán được rất nhiều đơn hàng với chi phí vận hành mỗi đơn hàng thấp.",
    "diagram": [
      {
        "label": "Volume lớn",
        "arrow": true
      },
      {
        "label": "Inventory turn",
        "arrow": true
      },
      {
        "label": "Logistics",
        "arrow": true
      },
      {
        "label": "Lợi nhuận ổn định",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Walmart",
      "description": "Bài học của Walmart là đọc earnings phải nhìn cả vận hành, tồn kho, biên gộp và hiệu quả chuỗi cung ứng."
    },
    "quiz": [
      {
        "question": "Khi inventory turn tăng, nó thường nói điều gì?",
        "options": [
          "Hàng bán nhanh hơn",
          "Hàng đắt hơn",
          "Nợ tăng",
          "Cổ tức giảm"
        ],
        "correct": 0,
        "explanation": "Vòng quay hàng tốt thường cho thấy demand và vận hành khỏe."
      },
      {
        "question": "Vì sao một chuỗi bán lẻ có biên lợi nhuận gộp thấp hơn đối thủ vẫn có thể có ROIC cao hơn?",
        "options": [
          "Không thể xảy ra, biên lợi nhuận thấp luôn dẫn đến ROIC thấp",
          "Có thể xảy ra nếu vòng quay tài sản (asset turnover) đủ cao để bù lại - bán được nhiều hàng hơn trên cùng lượng vốn đầu tư có thể thắng cả khi margin từng đơn vị thấp hơn",
          "Chỉ có thể nếu công ty đó không có nợ",
          "ROIC không liên quan đến biên lợi nhuận"
        ],
        "correct": 1,
        "explanation": "Đây chính là logic DuPont áp dụng vào bán lẻ: ROIC = margin × turnover. Một chuỗi bán lẻ margin thấp nhưng turnover rất cao (bán nhanh, tồn kho ít) hoàn toàn có thể đạt ROIC cao hơn đối thủ margin cao nhưng turnover chậm."
      },
      {
        "question": "Hai chuỗi bán lẻ cùng đạt ROIC 12%: chuỗi A biên 2% vòng quay 6 lần, chuỗi B biên 8% vòng quay 1,5 lần. Kết luận nào đúng?",
        "options": [
          "Cả hai đều có thể là mô hình kinh doanh khỏe mạnh, khác nhau về cách tạo ra cùng một mức hiệu quả",
          "Chuỗi B chắc chắn tốt hơn vì biên lợi nhuận cao hơn",
          "Chuỗi A chắc chắn tốt hơn vì vòng quay nhanh hơn",
          "Không thể so sánh hai chuỗi khác mô hình kinh doanh"
        ],
        "correct": 0,
        "explanation": "ROIC là tích của hai yếu tố. Nhìn riêng biên lợi nhuận mà không nhìn vòng quay sẽ đánh giá sai chuỗi A là yếu, trong khi thực chất nó chỉ đang chọn chiến lược khác."
      },
      {
        "question": "Doanh thu tổng tăng 30% chủ yếu nhờ mở thêm cửa hàng, trong khi doanh thu cửa hàng cũ chỉ tăng 1%. Đánh giá đúng nhất là gì?",
        "options": [
          "Phần lớn tăng trưởng đến từ mở rộng quy mô chứ không phải hoạt động lõi mạnh lên - cần xem cửa hàng mới có hiệu quả không",
          "Đây là bằng chứng doanh nghiệp đang tăng trưởng rất khỏe",
          "Doanh thu cửa hàng cũ không quan trọng nếu tổng doanh thu vẫn tăng",
          "Cần cắt bớt cửa hàng cũ vì tăng trưởng chậm"
        ],
        "correct": 0,
        "explanation": "Tách được hai nguồn tăng trưởng là kỹ năng cốt lõi khi đọc báo cáo bán lẻ. Mở rộng quy mô làm con số tổng đẹp lên nhưng không nói gì về sức khỏe hoạt động cốt lõi."
      }
    ],
    "keyTakeaways": [
      "Bán lẻ lớn thắng bằng volume và turnover",
      "Earnings story phải đọc cùng vận hành",
      "Tồn kho là biến cực quan trọng với retail"
    ],
    "summary": {
      "keyIdea": "Bán lẻ lớn thắng bằng volume và turnover",
      "commonMistake": "Dễ bỏ qua: earnings story phải đọc cùng vận hành",
      "action": "Tồn kho là biến cực quan trọng với retail"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Walmart không thắng nhờ biên lợi nhuận cao - thực tế biên lợi nhuận bán lẻ của họ khá mỏng. Bí quyết nằm ở một công thức khác."
      },
      {
        "type": "heading",
        "text": "Volume, turnover và logistics - công thức của bán lẻ lớn"
      },
      {
        "type": "paragraph",
        "text": "Bán lẻ quy mô lớn thường thắng nhờ khối lượng bán hàng khổng lồ, vòng quay tồn kho nhanh, và chuỗi cung ứng hiệu quả - không chỉ nhờ biên lợi nhuận cao trên từng đơn hàng. Đây chính là logic DuPont áp dụng vào bán lẻ: ROIC = margin × turnover. Một chuỗi margin thấp nhưng turnover rất cao (bán nhanh, tồn kho ít) hoàn toàn có thể đạt ROIC cao hơn đối thủ margin cao nhưng turnover chậm."
      },
      {
        "type": "list",
        "items": [
          "Bán lẻ lớn thắng bằng volume và turnover, không chỉ margin",
          "Inventory turnover tăng thường cho thấy nhu cầu và vận hành đang khỏe",
          "Đọc earnings bán lẻ cần nhìn cả vận hành, tồn kho, và hiệu quả chuỗi cung ứng, không chỉ EPS"
        ]
      },
      {
        "type": "formula",
        "title": "ROIC bán lẻ tách theo DuPont",
        "equation": "ROIC ≈ Biên lợi nhuận × Vòng quay tài sản",
        "example": {
          "title": "Hai chuỗi bán lẻ, cùng ROIC",
          "calculation": "Chuỗi A: biên 2% × vòng quay 6 lần · Chuỗi B: biên 8% × vòng quay 1,5 lần",
          "result": "Cả hai đều ra ROIC khoảng 12%",
          "explanation": "Chuỗi A sống bằng việc bán rất nhiều với lãi mỏng trên mỗi đơn hàng; chuỗi B sống bằng biên lợi nhuận cao nhưng bán chậm hơn. Không mô hình nào tốt hơn tuyệt đối - chúng chỉ phù hợp với chiến lược định vị khác nhau, và đọc riêng biên lợi nhuận mà không nhìn vòng quay sẽ đánh giá sai sức khỏe thực sự."
        }
      },
      {
        "type": "heading",
        "text": "Bốn chỉ số nên đọc cùng doanh thu khi xem báo cáo bán lẻ"
      },
      {
        "type": "list",
        "items": [
          "Tăng trưởng doanh thu cùng cửa hàng: tách phần tăng thật từ hoạt động cốt lõi khỏi phần tăng chỉ vì mở thêm cửa hàng mới.",
          "Vòng quay hàng tồn kho: tăng dần thường cho thấy nhu cầu khỏe và vận hành chuỗi cung ứng hiệu quả.",
          "Biên lợi nhuận gộp: giảm trong khi doanh thu tăng có thể là dấu hiệu phải giảm giá để đẩy hàng.",
          "Chi phí vận hành trên mỗi đơn hàng: đây là nơi các chuỗi lớn thực sự cạnh tranh nhau, không phải ở giá bán."
        ]
      },
      {
        "type": "callout",
        "label": "Vì sao quy mô lại là lợi thế thực sự",
        "text": "Sức mạnh đàm phán với nhà cung cấp, khả năng đầu tư hệ thống logistics, và chi phí cố định trải rộng trên nhiều cửa hàng đều là những lợi thế chỉ đến khi doanh nghiệp đủ lớn. Đây là lý do bán lẻ có xu hướng hội tụ về một vài chuỗi lớn thắng thế, thay vì nhiều chuỗi nhỏ cùng tồn tại với biên lợi nhuận tương đương."
      },
      {
        "type": "closing",
        "lines": [
          "Biên lợi nhuận thấp không đồng nghĩa với doanh nghiệp yếu.",
          "Với bán lẻ quy mô lớn, tốc độ quay vòng vốn mới là chìa khóa."
        ]
      }
    ]
  }),
  "inventory-turnover": patch({
    "openingQuestion": "Inventory turnover giảm mạnh thường báo hiệu điều gì?",
    "openingOptions": [
      "Hàng bán chậm hơn",
      "Lợi nhuận chắc chắn tăng",
      "Tiền mặt tăng ngay",
      "Không có ý nghĩa"
    ],
    "correctOption": 0,
    "explanation": "Inventory turnover = COGS / Average Inventory. Giảm nhanh thường cho thấy hàng ứ đọng hoặc bán chậm - vốn lưu động bị giữ lại trong kho lâu hơn, làm tăng rủi ro hàng lỗi mốt, hư hỏng hoặc phải giảm giá xả kho.",
    "diagram": [
      {
        "label": "COGS",
        "arrow": true
      },
      {
        "label": "Average inventory",
        "arrow": true
      },
      {
        "label": "Inventory turnover",
        "arrow": true
      },
      {
        "label": "Days inventory outstanding",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Zara",
      "description": "Fast fashion thành công một phần vì vòng quay tồn kho nhanh, giảm rủi ro hàng lỗi mốt."
    },
    "quiz": [
      {
        "question": "DIO tăng mạnh thường hàm ý gì?",
        "options": [
          "Trung bình mất nhiều ngày hơn để bán hết hàng",
          "Hàng được bán ngay",
          "Tồn kho không liên quan",
          "ROIC tăng tự động"
        ],
        "correct": 0,
        "explanation": "DIO cao nghĩa là vốn bị kẹt trong kho lâu hơn."
      },
      {
        "question": "Một công ty thời trang có DIO tăng từ 60 ngày lên 120 ngày trong một năm, trong khi doanh thu vẫn tăng nhẹ. Điều gì đáng lo nhất ở đây?",
        "options": [
          "Không có gì đáng lo vì doanh thu vẫn tăng",
          "Doanh thu tăng có thể chỉ đến từ giảm giá xả hàng tồn cũ, trong khi hàng mới nhập có nguy cơ lỗi mốt trước khi bán được - cần xem kỹ biên lợi nhuận gộp có giảm theo không",
          "DIO tăng luôn là dấu hiệu tốt cho ngành thời trang",
          "Chỉ cần quan tâm đến doanh thu, không cần nhìn DIO"
        ],
        "correct": 1,
        "explanation": "Với ngành có tính mùa vụ và thời trang cao như apparel, DIO tăng gấp đôi là tín hiệu cảnh báo nghiêm trọng: nếu doanh thu tăng chỉ nhờ giảm giá mạnh để đẩy hàng tồn, biên lợi nhuận gộp thường sẽ giảm theo - cần đọc DIO cùng gross margin để có bức tranh đầy đủ."
      },
      {
        "question": "COGS 720 tỷ, tồn kho bình quân 120 tỷ. Số ngày tồn kho trung bình là bao nhiêu?",
        "options": [
          "Khoảng 61 ngày",
          "Khoảng 120 ngày",
          "Khoảng 6 ngày",
          "Khoảng 720 ngày"
        ],
        "correct": 0,
        "explanation": "Turnover = 720 ÷ 120 = 6 lần. DIO = 365 ÷ 6 ≈ 61 ngày. Đây là thời gian trung bình một lô hàng nằm trong kho trước khi được bán."
      },
      {
        "question": "DIO tăng dần trong khi biên lợi nhuận gộp cũng giảm dần. Cách đọc hợp lý nhất là gì?",
        "options": [
          "Có thể doanh nghiệp đang giảm giá để đẩy hàng tồn đang bán chậm, khiến doanh thu tăng nhưng lợi nhuận kém đi",
          "Đây là dấu hiệu doanh nghiệp đang mở rộng rất tốt",
          "Hai chỉ số này không liên quan đến nhau",
          "Chắc chắn doanh nghiệp đang gian lận kế toán"
        ],
        "correct": 0,
        "explanation": "Đọc hai chỉ số cùng nhau giúp phân biệt DIO tăng vì lý do chiến lược với DIO tăng vì vấn đề nhu cầu - biên lợi nhuận giảm đồng thời là bằng chứng nghiêng về khả năng thứ hai."
      }
    ],
    "keyTakeaways": [
      "Inventory turnover = COGS / average inventory",
      "DIO = 365 / turnover",
      "Tồn kho là cảnh báo sớm của vấn đề bán hàng"
    ],
    "summary": {
      "keyIdea": "Inventory turnover = COGS / average inventory",
      "commonMistake": "Dễ bỏ qua: dIO = 365 / turnover",
      "action": "Tồn kho là cảnh báo sớm của vấn đề bán hàng"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hàng tồn kho không chỉ là một dòng trên bảng cân đối - tốc độ quay vòng của nó là một trong những chỉ báo sớm nhất về sức khỏe kinh doanh của một doanh nghiệp bán hàng hóa vật lý."
      },
      {
        "type": "heading",
        "text": "Inventory Turnover và Days Inventory Outstanding"
      },
      {
        "type": "paragraph",
        "text": "Inventory Turnover = COGS / Average Inventory, cho biết doanh nghiệp bán hết và thay mới tồn kho bao nhiêu lần trong kỳ. Days Inventory Outstanding (DIO = 365/turnover) cho biết trung bình mất bao nhiêu ngày để bán hết hàng. Turnover giảm mạnh (DIO tăng) thường báo hiệu hàng ứ đọng hoặc bán chậm - đặc biệt nguy hiểm với ngành có tính mùa vụ cao như thời trang, nơi hàng tồn có nguy cơ lỗi mốt trước khi bán được."
      },
      {
        "type": "list",
        "items": [
          "Inventory Turnover giảm mạnh thường báo hiệu hàng bán chậm hơn",
          "DIO tăng nghĩa là vốn lưu động bị kẹt trong kho lâu hơn, tăng rủi ro hàng lỗi mốt/hư hỏng",
          "Với ngành thời trang, cần đọc DIO cùng biên lợi nhuận gộp để phát hiện việc tăng doanh thu chỉ nhờ giảm giá xả hàng tồn"
        ]
      },
      {
        "type": "formula",
        "title": "Số ngày tồn kho trung bình",
        "equation": "DIO = 365 ÷ Inventory Turnover",
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "COGS 600 tỷ, tồn kho bình quân 100 tỷ → turnover 6 lần",
          "result": "DIO ≈ 61 ngày",
          "explanation": "Trung bình mất khoảng hai tháng để bán hết một lô hàng và thay mới. Nếu năm sau DIO tăng lên 85 ngày mà doanh thu không tăng tương ứng, đó là dấu hiệu hàng đang bán chậm lại, đáng để tìm hiểu nguyên nhân trước khi nó lộ ra ở dòng lợi nhuận."
        }
      },
      {
        "type": "heading",
        "text": "Vì sao DIO tăng là cảnh báo sớm"
      },
      {
        "type": "paragraph",
        "text": "Doanh nghiệp thường phát hiện vấn đề bán hàng chậm chạp qua tồn kho trước khi nó hiện rõ trên báo cáo lợi nhuận, vì hàng tồn phải chờ vài kỳ mới được ghi nhận thành doanh thu hoặc bị giảm giá xả kho. Đó là lý do DIO được xem là chỉ báo sớm: nó cho thấy vấn đề đang tích tụ trước khi ảnh hưởng lan tới lợi nhuận."
      },
      {
        "type": "comparison",
        "left": {
          "label": "DIO tăng vì mở rộng có kế hoạch",
          "text": "Doanh nghiệp chủ động tích trữ hàng trước mùa cao điểm hoặc trước khi mở thêm kênh phân phối mới. DIO tăng tạm thời nhưng có lý do rõ ràng và dự kiến giảm lại sau đó."
        },
        "right": {
          "label": "DIO tăng vì hàng bán chậm",
          "text": "Nhu cầu yếu đi nhưng doanh nghiệp chưa điều chỉnh kế hoạch sản xuất hoặc nhập hàng. DIO tăng dần đều qua nhiều quý mà không có lý do mùa vụ hay chiến lược rõ ràng."
        }
      },
      {
        "type": "callout",
        "label": "Đọc cùng biên lợi nhuận gộp",
        "text": "Nếu doanh thu vẫn tăng nhưng biên lợi nhuận gộp giảm cùng lúc DIO tăng, khả năng cao doanh nghiệp đang phải giảm giá để đẩy bớt hàng tồn - tức là con số doanh thu đẹp đang được mua bằng lợi nhuận kém đi, chứ không phải nhu cầu thực sự mạnh lên."
      },
      {
        "type": "closing",
        "lines": [
          "Tồn kho tăng chậm lại không phải lúc nào cũng xấu, nhưng luôn đáng để hỏi vì sao.",
          "Đây là một trong những cảnh báo sớm nhất trước khi vấn đề xuất hiện trên báo cáo lợi nhuận."
        ]
      }
    ]
  }),
  "post-ipo-dividend": patch({
    "openingQuestion": "Sau IPO, khi nào doanh nghiệp nên trả cổ tức?",
    "openingOptions": [
      "Ngay lập tức nếu có tên tuổi",
      "Khi FCF ổn định và đầu tư tăng trưởng đã đủ",
      "Chỉ khi thị giá giảm",
      "Càng nhiều càng tốt"
    ],
    "correctOption": 1,
    "explanation": "Doanh nghiệp tăng trưởng mạnh thường nên ưu tiên tái đầu tư trước; cổ tức chỉ hợp lý khi cash flow và cơ hội đầu tư đã chín. Trả cổ tức quá sớm khi vẫn còn nhiều cơ hội ROIC cao để tái đầu tư có thể là một quyết định phân bổ vốn kém hiệu quả.",
    "diagram": [
      {
        "label": "FCF",
        "arrow": true
      },
      {
        "label": "Opportunities",
        "arrow": true
      },
      {
        "label": "Payout policy",
        "arrow": true
      },
      {
        "label": "Cổ tức hay tái đầu tư",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Công ty mới niêm yết",
      "description": "Một doanh nghiệp sau IPO có thể còn cần giữ tiền mặt để mở rộng hơn là chia hết cho cổ đông."
    },
    "quiz": [
      {
        "question": "Tại sao nhiều công ty tăng trưởng không nên trả cổ tức cao ngay?",
        "options": [
          "Vì cần giữ vốn cho cơ hội đầu tư tốt hơn",
          "Vì thị trường cấm",
          "Vì cổ đông không thích tiền",
          "Vì kế toán không cho phép"
        ],
        "correct": 0,
        "explanation": "Vốn giữ lại có thể tạo giá trị lớn hơn nếu ROIC của dự án mới cao."
      },
      {
        "question": "Một công ty vừa IPO tuyên bố sẽ trả cổ tức cao ngay để tri ân cổ đông dù vẫn còn nhiều dự án mở rộng có ROIC cao hơn WACC. Quyết định này nên được đánh giá thế nào?",
        "options": [
          "Luôn tích cực vì cổ đông thích tiền mặt ngay",
          "Có thể là phân bổ vốn kém hiệu quả - nếu công ty còn dự án ROIC cao hơn chi phí vốn, giữ lại để tái đầu tư thường tạo giá trị dài hạn lớn hơn cho cổ đông so với chia cổ tức sớm",
          "Không quan trọng vì cổ tức không ảnh hưởng giá trị công ty",
          "Chỉ nên đánh giá dựa trên phản ứng giá cổ phiếu ngắn hạn"
        ],
        "correct": 1,
        "explanation": "Nguyên tắc phân bổ vốn cơ bản: nếu công ty có dự án với ROIC > WACC, giữ lại vốn để tái đầu tư thường tạo nhiều giá trị hơn chia cổ tức - một công ty mới IPO vẫn còn nhiều cơ hội tăng trưởng tốt mà vội chia cổ tức cao có thể đang bỏ lỡ cơ hội tạo giá trị lớn hơn cho chính cổ đông đó."
      },
      {
        "question": "Công ty mới IPO còn nhiều dự án ROIC 25% trong khi WACC là 12%. Quyết định nào tạo nhiều giá trị hơn cho cổ đông dài hạn?",
        "options": [
          "Giữ lại vốn để tái đầu tư vào các dự án đó, vì chênh lệch 13 điểm phần trăm là giá trị bị bỏ lỡ nếu chia cổ tức ngay",
          "Chia cổ tức ngay để tri ân cổ đông sớm",
          "Chia một nửa, giữ một nửa bất kể tình hình dự án",
          "Không có cách nào để quyết định đúng"
        ],
        "correct": 0,
        "explanation": "Khi ROIC vượt WACC rõ rệt, giữ lại vốn tái đầu tư gần như luôn tạo nhiều giá trị hơn chia ngay - đây là logic cốt lõi của chính sách phân bổ vốn."
      },
      {
        "question": "Khi nào một doanh nghiệp nên chuyển từ giữ lại vốn sang chia cổ tức?",
        "options": [
          "Khi các dự án tái đầu tư còn lại có ROIC biên giảm về gần mức chi phí vốn",
          "Ngay khi vừa niêm yết, bất kể tình hình dự án",
          "Chỉ khi lợi nhuận sau thuế vượt một ngưỡng tuyệt đối cố định",
          "Không bao giờ nên chia cổ tức nếu công ty còn tăng trưởng"
        ],
        "correct": 0,
        "explanation": "Đây là logic vòng đời doanh nghiệp: khi cơ hội đầu tư ROIC cao cạn dần, giữ tiền mặt không mục đích trở thành chi phí cơ hội, và chia cổ tức trở thành lựa chọn hợp lý hơn."
      }
    ],
    "keyTakeaways": [
      "Dividend policy phải gắn với growth stage",
      "FCF và cơ hội đầu tư quan trọng hơn cảm xúc chia tiền",
      "IPO không đồng nghĩa với việc phải trả cổ tức ngay"
    ],
    "summary": {
      "keyIdea": "Dividend policy phải gắn với growth stage",
      "commonMistake": "Dễ bỏ qua: fCF và cơ hội đầu tư quan trọng hơn cảm xúc chia tiền",
      "action": "IPO không đồng nghĩa với việc phải trả cổ tức ngay"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sau khi IPO, nhiều nhà đầu tư mong chờ doanh nghiệp sớm chia cổ tức để 'tri ân cổ đông' - nhưng đây không phải lúc nào cũng là quyết định phân bổ vốn tốt nhất."
      },
      {
        "type": "heading",
        "text": "Nguyên tắc phân bổ vốn: giữ lại hay chia?"
      },
      {
        "type": "paragraph",
        "text": "Nếu công ty vẫn còn nhiều dự án với ROIC vượt WACC (chi phí vốn), giữ lại vốn để tái đầu tư thường tạo nhiều giá trị dài hạn hơn cho cổ đông so với chia cổ tức sớm. Một công ty mới IPO thường vẫn còn nhiều cơ hội tăng trưởng tốt - vội chia cổ tức cao ngay có thể đang bỏ lỡ cơ hội tạo giá trị lớn hơn nhiều cho chính những cổ đông đó."
      },
      {
        "type": "list",
        "items": [
          "Cổ tức chỉ hợp lý khi FCF ổn định và các cơ hội đầu tư có ROIC cao đã được khai thác đủ",
          "Nếu còn dự án ROIC > WACC, giữ lại vốn thường tạo giá trị lớn hơn chia cổ tức",
          "Dividend policy cần gắn với giai đoạn tăng trưởng của doanh nghiệp, không phải cảm xúc 'tri ân cổ đông'"
        ]
      },
      {
        "type": "formula",
        "title": "Khi nào giữ lại vốn tạo giá trị hơn chia ra",
        "equation": "Giữ lại có lợi khi: ROIC của dự án tái đầu tư > WACC",
        "example": {
          "title": "So sánh hai lựa chọn",
          "calculation": "Giữ lại 1.000 tỷ, đầu tư ở ROIC 25%, WACC 12%",
          "result": "Tạo thêm giá trị ròng khoảng 13% trên số vốn đó mỗi năm",
          "explanation": "Nếu công ty vẫn còn dự án ở mức sinh lời này, chia hết 1.000 tỷ đó cho cổ đông đồng nghĩa từ bỏ khoản chênh lệch 13% mỗi năm - một chi phí cơ hội rất lớn mà bảng cân đối không hiện ra trực tiếp."
        }
      },
      {
        "type": "heading",
        "text": "Vòng đời doanh nghiệp và chính sách cổ tức"
      },
      {
        "type": "list",
        "items": [
          "Giai đoạn tăng trưởng cao: nhiều dự án ROIC vượt WACC, giữ lại vốn gần như luôn tốt hơn chia ra.",
          "Giai đoạn trưởng thành: dự án còn lại ít dần, ROIC biên giảm về gần WACC - đây là lúc cổ tức bắt đầu hợp lý.",
          "Giai đoạn bão hòa: hầu như không còn dự án ROIC cao, giữ tiền mặt không mục đích chỉ tạo chi phí cơ hội - lúc này chia cổ tức hoặc mua lại cổ phiếu là lựa chọn tốt cho cổ đông."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Áp lực chia cổ tức sớm",
          "text": "Nhà đầu tư quen với việc nhận cổ tức đều đặn từ các khoản đầu tư khác, kỳ vọng công ty mới niêm yết cũng làm vậy để 'chứng minh sức khỏe tài chính' - dù công ty vẫn còn nhiều cơ hội tăng trưởng tốt hơn."
        },
        "right": {
          "label": "Phân bổ vốn đúng giai đoạn",
          "text": "Ban lãnh đạo giải thích rõ các dự án ROIC cao đang cần vốn, và cam kết sẽ chuyển sang chia cổ tức khi cơ hội tái đầu tư cạn dần - đây là cách truyền thông đúng với nhà đầu tư dài hạn."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chia cổ tức sớm nghe có vẻ hào phóng, nhưng chưa chắc là quyết định tốt nhất cho cổ đông.",
          "Câu hỏi đúng là: công ty còn cơ hội đầu tư nào tốt hơn việc trả tiền ngay không?"
        ]
      }
    ]
  }),
  "disney-pixar-ma": patch({
    "openingQuestion": "Horizontal M&A như Disney-Pixar thường nhắm tới điều gì?",
    "openingOptions": [
      "Synergy doanh thu và quyền sở hữu IP",
      "Giảm thuế ngay lập tức",
      "Tăng nợ xấu",
      "Giảm tồn kho"
    ],
    "correctOption": 0,
    "explanation": "Khi hai doanh nghiệp cùng một chuỗi giá trị kết hợp, synergy đến từ phân phối, IP và khả năng khai thác chéo khách hàng. Loại synergy này (revenue synergy) thường khó đo lường và mất nhiều thời gian hiện thực hóa hơn synergy cắt giảm chi phí (cost synergy).",
    "diagram": [
      {
        "label": "Doanh nghiệp A",
        "arrow": true
      },
      {
        "label": "Kết hợp với B",
        "arrow": true
      },
      {
        "label": "Synergy",
        "arrow": true
      },
      {
        "label": "Giá trị hợp nhất",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Disney-Pixar",
      "description": "Thương vụ Disney-Pixar thường được nhắc như một ví dụ về M&A tạo thêm giá trị nhờ hệ sinh thái nội dung và phân phối."
    },
    "quiz": [
      {
        "question": "Nếu synergy chỉ tồn tại trên slide mà không ra cash, điều gì nên nghi ngờ?",
        "options": [
          "Phân tích đã đủ",
          "Deal có thể bị overpay",
          "Synergy chắc chắn lớn",
          "Không cần DD"
        ],
        "correct": 1,
        "explanation": "Synergy phải đi kèm dòng tiền thực, không chỉ là câu chuyện truyền thông."
      },
      {
        "question": "Vì sao cost synergy (cắt giảm chi phí trùng lặp) thường dễ hiện thực hóa hơn revenue synergy (tăng doanh thu chéo) sau một thương vụ M&A?",
        "options": [
          "Vì cost synergy không cần thực hiện gì cả",
          "Vì cost synergy nằm trong tầm kiểm soát nội bộ của doanh nghiệp (sa thải, đóng cửa trùng lặp), còn revenue synergy phụ thuộc vào phản ứng của khách hàng bên ngoài - khó dự đoán và kiểm soát hơn nhiều",
          "Vì revenue synergy luôn lớn hơn cost synergy",
          "Vì cost synergy chỉ áp dụng cho công ty nhỏ"
        ],
        "correct": 1,
        "explanation": "Cắt giảm chi phí trùng lặp (văn phòng, nhân sự, hệ thống) là quyết định nội bộ công ty có thể chủ động thực hiện, trong khi tăng doanh thu nhờ bán chéo sản phẩm phụ thuộc vào việc khách hàng có thực sự mua thêm hay không - đây là lý do nhà đầu tư M&A thường hoài nghi các con số revenue synergy trong slide thuyết trình deal."
      },
      {
        "question": "Vì sao nhà đầu tư thường hoài nghi con số revenue synergy được trình bày khi công bố thương vụ M&A?",
        "options": [
          "Vì nó phụ thuộc vào hành vi thực tế của khách hàng trong tương lai, khó kiểm chứng và thường mất nhiều năm hơn dự kiến để đạt được",
          "Vì revenue synergy không bao giờ có thật",
          "Vì cost synergy luôn lớn hơn revenue synergy",
          "Vì luật pháp cấm công bố revenue synergy"
        ],
        "correct": 0,
        "explanation": "Cost synergy nằm trong tầm kiểm soát nội bộ nên dễ đo và dễ đạt hơn. Revenue synergy đòi hỏi khách hàng phản ứng đúng như kỳ vọng - biến số nằm ngoài tầm kiểm soát của bên mua."
      },
      {
        "question": "Điểm nào thường được nhắc đến như lý do khiến thương vụ Disney-Pixar được xem là thành công?",
        "options": [
          "Disney giữ đội ngũ sáng tạo cốt lõi của Pixar hoạt động độc lập thay vì áp đặt bộ máy quản lý của mình",
          "Disney trả giá thấp hơn giá trị thị trường của Pixar",
          "Thương vụ hoàn toàn không tốn chi phí tích hợp",
          "Pixar được sáp nhập hoàn toàn vào bộ máy vận hành của Disney ngay lập tức"
        ],
        "correct": 0,
        "explanation": "Đây là ví dụ về cân bằng giữa khai thác cộng hưởng (mạng lưới phân phối của Disney) và bảo toàn giá trị cốt lõi (năng lực sáng tạo của Pixar) - điều nhiều thương vụ thất bại vì làm ngược lại."
      }
    ],
    "keyTakeaways": [
      "M&A tốt phải tạo synergy thực",
      "Revenue synergy và cost synergy cần đo bằng cash",
      "Đừng trả quá nhiều cho câu chuyện đẹp"
    ],
    "summary": {
      "keyIdea": "M&A tốt phải tạo synergy thực",
      "commonMistake": "Dễ bỏ qua: revenue synergy và cost synergy cần đo bằng cash",
      "action": "Đừng trả quá nhiều cho câu chuyện đẹp"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thương vụ Disney mua lại Pixar thường được nhắc đến như một ví dụ M&A thành công - nhưng điều gì thực sự làm nên một thương vụ 'thành công' về mặt tài chính?"
      },
      {
        "type": "heading",
        "text": "Synergy phải ra tiền, không chỉ ra trên slide"
      },
      {
        "type": "paragraph",
        "text": "Trong M&A theo chiều ngang (horizontal M&A), giá trị kỳ vọng thường đến từ synergy - cắt giảm chi phí trùng lặp (cost synergy) hoặc tăng doanh thu chéo qua kết hợp phân phối và IP (revenue synergy). Cost synergy dễ hiện thực hóa hơn vì nằm trong tầm kiểm soát nội bộ doanh nghiệp; revenue synergy khó hơn nhiều vì phụ thuộc vào phản ứng thực tế của khách hàng - đây là lý do nhà đầu tư thường hoài nghi các con số revenue synergy được trình bày trong slide thuyết trình deal."
      },
      {
        "type": "list",
        "items": [
          "Synergy chỉ có ý nghĩa khi chuyển hóa thành dòng tiền thực, không chỉ là câu chuyện trên giấy",
          "Cost synergy (cắt giảm chi phí) thường dễ hiện thực hóa hơn revenue synergy (tăng doanh thu chéo)",
          "Nếu không thấy dòng tiền thực từ synergy, nên nghi ngờ khả năng deal đã bị trả giá quá cao (overpay)"
        ]
      },
      {
        "type": "heading",
        "text": "Cách kiểm chứng synergy có thật hay chỉ trên giấy"
      },
      {
        "type": "list",
        "items": [
          "Cost synergy: tìm dòng chi phí cụ thể được cắt giảm trong báo cáo sau sáp nhập - nếu tổng chi phí vận hành giảm đúng như dự kiến, đó là bằng chứng thật.",
          "Revenue synergy: tìm bằng chứng doanh thu chéo thực sự tăng - ví dụ số lượng sản phẩm kết hợp thương hiệu được bán ra, hoặc tăng trưởng ở kênh phân phối mới được tiếp cận.",
          "Thời gian hiện thực hóa: cost synergy thường thấy trong 1-2 năm đầu; revenue synergy thường mất 3-5 năm hoặc lâu hơn, và một phần đáng kể không bao giờ đạt được như kế hoạch ban đầu."
        ]
      },
      {
        "type": "callout",
        "label": "Vì sao trường hợp Disney-Pixar hay được nhắc như một mẫu hình tốt",
        "text": "Điểm khác biệt không chỉ nằm ở việc kết hợp IP, mà ở việc Disney giữ được đội ngũ sáng tạo cốt lõi của Pixar hoạt động độc lập thay vì áp đặt bộ máy quản lý của mình lên - tức là bảo toàn đúng thứ tạo ra giá trị ban đầu, trong khi vẫn khai thác được mạng lưới phân phối và thương mại hóa khổng lồ của Disney. Đây chính là cân bằng giữa tích hợp và bảo toàn mà nhiều thương vụ khác thất bại."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Synergy trên slide",
          "text": "\"Kết hợp hai thương hiệu sẽ tạo ra 2 tỷ USD giá trị cộng hưởng trong 5 năm.\" Con số không kèm cơ chế cụ thể: sản phẩm nào, kênh nào, khách hàng nào sẽ tạo ra khoản đó."
        },
        "right": {
          "label": "Synergy có thể kiểm chứng",
          "text": "\"Giảm 300 tỷ chi phí trùng lặp ở bộ phận hậu cần trong năm đầu (đã xác định cụ thể vị trí); doanh thu từ dòng sản phẩm kết hợp thương hiệu đạt 150 tỷ trong năm hai, đo được qua doanh số thực tế.\""
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một câu chuyện M&A hay không đảm bảo một thương vụ tốt.",
          "Luôn hỏi: synergy này có thể đo bằng tiền mặt thực tế không, hay chỉ tồn tại trên slide?"
        ]
      }
    ]
  }),
  "nvidia-cash-securities": patch({
    "openingQuestion": "Treasury và FP&A nhìn cash & marketable securities để làm gì khác nhau?",
    "openingOptions": [
      "Một bên để vay, một bên để chia cổ tức",
      "Một bên tối ưu thanh khoản, bên kia tối ưu chiến lược vốn",
      "Không khác nhau",
      "Chỉ để trang trí BCTC"
    ],
    "correctOption": 1,
    "explanation": "Treasury nhìn thanh khoản và rủi ro ngắn hạn; FP&A nhìn cách dùng cash cho buyback, M&A, capex hay dự trữ. Hai bộ phận cùng nhìn vào một con số cash trên bảng cân đối nhưng đặt câu hỏi rất khác nhau: liệu đã đủ an toàn chưa, so với nên phân bổ thế nào để tạo giá trị tốt nhất.",
    "diagram": [
      {
        "label": "Cash stack",
        "arrow": true
      },
      {
        "label": "Marketable securities",
        "arrow": true
      },
      {
        "label": "Liquidity",
        "arrow": true
      },
      {
        "label": "Capital allocation",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "NVIDIA",
      "description": "Doanh nghiệp tăng trưởng mạnh có thể giữ lượng cash lớn để cân bằng đầu tư, buyback và đệm rủi ro chu kỳ."
    },
    "quiz": [
      {
        "question": "Cash lớn trên bảng cân đối có luôn là tín hiệu xấu không?",
        "options": [
          "Có",
          "Không, nếu đi kèm chiến lược vốn rõ ràng",
          "Chỉ xấu với công ty công nghệ",
          "Không bao giờ quan trọng"
        ],
        "correct": 1,
        "explanation": "Cash có thể là đệm an toàn hoặc là vốn chưa được phân bổ hiệu quả - phải đọc cùng chiến lược capital allocation."
      },
      {
        "question": "Một công ty công nghệ giữ lượng cash khổng lồ trong nhiều năm mà không đầu tư, không buyback, không M&A. Nhà đầu tư nên đặt câu hỏi gì?",
        "options": [
          "Không cần hỏi gì vì cash nhiều luôn tốt",
          "Liệu ban lãnh đạo có đang thiếu chiến lược phân bổ vốn rõ ràng, khiến vốn cổ đông bị 'chôn' trong tài khoản thay vì tạo thêm giá trị qua đầu tư, mua lại cổ phiếu hay cổ tức",
          "Công ty chắc chắn sắp phá sản",
          "Cash dự trữ không liên quan đến cổ đông"
        ],
        "correct": 1,
        "explanation": "Cash lớn không tự động tạo giá trị nếu không có chiến lược sử dụng rõ ràng - vốn đó lẽ ra có thể sinh lời qua tái đầu tư, được trả lại cho cổ đông qua buyback/cổ tức, hoặc dùng cho M&A tạo giá trị. Giữ cash quá lâu không mục đích là một dạng chi phí cơ hội ẩn."
      },
      {
        "question": "Vì sao Treasury và FP&A trong cùng một doanh nghiệp có thể nhìn cùng con số tiền mặt nhưng đưa ra khuyến nghị khác nhau?",
        "options": [
          "Vì họ trả lời hai câu hỏi khác nhau: Treasury quan tâm an toàn thanh khoản, FP&A quan tâm hiệu quả phân bổ vốn dài hạn",
          "Vì một trong hai bộ phận đang tính sai số liệu",
          "Vì Treasury không được phép biết số dư tiền mặt thực tế",
          "Vì FP&A chỉ làm việc vào cuối năm tài chính"
        ],
        "correct": 0,
        "explanation": "Đây không phải là mâu thuẫn mà là sự phân công tự nhiên: một bên bảo vệ khỏi rủi ro, một bên tối ưu hóa giá trị. Doanh nghiệp cần cả hai góc nhìn."
      },
      {
        "question": "Tiền mặt tăng đều đặn nhiều năm mà không có buyback, M&A hay tăng capex đáng kể. Điều này gợi ý gì?",
        "options": [
          "Có thể doanh nghiệp đang thiếu chiến lược phân bổ vốn rõ ràng, khiến vốn cổ đông bị chôn thay vì tạo thêm giá trị",
          "Đây luôn là dấu hiệu tích cực về sức khỏe tài chính",
          "Doanh nghiệp chắc chắn sắp phá sản",
          "Không có ý nghĩa gì cần quan tâm"
        ],
        "correct": 0,
        "explanation": "Tiền mặt lớn không tự động xấu, nhưng tích lũy kéo dài không mục đích là dấu hiệu đáng đặt câu hỏi về năng lực phân bổ vốn của ban lãnh đạo."
      }
    ],
    "keyTakeaways": [
      "Treasury và FP&A đọc cash với mục tiêu khác nhau",
      "Cash lớn chưa chắc xấu, nhưng phải có lý do sử dụng",
      "Đọc cùng buyback, capex và M&A"
    ],
    "summary": {
      "keyIdea": "Treasury và FP&A đọc cash với mục tiêu khác nhau",
      "commonMistake": "Dễ bỏ qua: cash lớn chưa chắc xấu, nhưng phải có lý do sử dụng",
      "action": "Đọc cùng buyback, capex và M&A"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cùng một con số tiền mặt trên bảng cân đối, nhưng bộ phận Treasury và FP&A trong một doanh nghiệp lại đặt ra những câu hỏi rất khác nhau về nó."
      },
      {
        "type": "heading",
        "text": "Hai góc nhìn về cùng một con số cash"
      },
      {
        "type": "paragraph",
        "text": "Treasury quan tâm đến thanh khoản và rủi ro ngắn hạn - liệu doanh nghiệp có đủ tiền mặt an toàn cho các nghĩa vụ sắp tới. FP&A quan tâm đến chiến lược phân bổ vốn dài hạn hơn - nên dùng cash cho buyback, M&A, CapEx hay dự trữ. Một công ty giữ lượng cash khổng lồ trong nhiều năm mà không đầu tư, không buyback, không M&A có thể đang để vốn cổ đông 'chôn' trong tài khoản thay vì tạo thêm giá trị - đây là một dạng chi phí cơ hội ẩn."
      },
      {
        "type": "list",
        "items": [
          "Cash lớn không tự động là tín hiệu xấu, nếu đi kèm chiến lược phân bổ vốn rõ ràng",
          "Nhưng cash nhàn rỗi kéo dài không mục đích là một dạng chi phí cơ hội đáng lo ngại",
          "Nên đọc quy mô tiền mặt cùng với các quyết định capital allocation: buyback, capex, M&A"
        ]
      },
      {
        "type": "conceptTable",
        "title": "Hai câu hỏi khác nhau về cùng một con số tiền mặt",
        "concepts": [
          {
            "vi": "Treasury",
            "en": "An toàn thanh khoản",
            "def": "Có đủ tiền cho nghĩa vụ ngắn hạn không? Bao lâu trụ được nếu doanh thu gián đoạn? Tập trung vào rủi ro, không phải lợi suất."
          },
          {
            "vi": "FP&A / Ban lãnh đạo",
            "en": "Phân bổ vốn dài hạn",
            "def": "Nên dùng phần dư ra cho tái đầu tư, mua lại cổ phiếu, M&A hay giữ làm đệm? Tập trung vào tạo giá trị."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Đọc một bảng cân đối có nhiều tiền mặt cho đúng"
      },
      {
        "type": "list",
        "items": [
          "So tiền mặt với chi tiêu vận hành hằng năm để biết doanh nghiệp trụ được bao lâu nếu doanh thu ngừng hẳn - đây là góc nhìn của Treasury.",
          "So tiền mặt với quy mô các dự án đầu tư đang có sẵn để biết liệu doanh nghiệp có đang bỏ lỡ cơ hội vì giữ tiền quá thận trọng.",
          "Xem xu hướng nhiều năm: tiền mặt tăng đều vì tích lũy có chủ đích, hay vì thiếu ý tưởng dùng vốn?"
        ]
      },
      {
        "type": "callout",
        "label": "Chi phí cơ hội của tiền mặt nhàn rỗi",
        "text": "Tiền để không trong tài khoản chịu ảnh hưởng của lạm phát và mất đi cơ hội sinh lời cao hơn ở nơi khác. Với một công ty công nghệ tăng trưởng nhanh, mỗi tỷ đồng giữ lại thay vì tái đầu tư vào R&D hoặc mở rộng công suất có thể là một tỷ đồng lẽ ra đã tạo ra ROIC vượt trội - đây là lý do nhà đầu tư dài hạn thường đặt câu hỏi về kế hoạch dùng tiền, không chỉ hài lòng vì số dư lớn."
      },
      {
        "type": "closing",
        "lines": [
          "Một con số cash lớn tự nó không nói lên điều gì.",
          "Câu hỏi quan trọng hơn là: doanh nghiệp có kế hoạch rõ ràng để dùng nó tạo giá trị không?"
        ]
      }
    ]
  }),
  "fpt-cfo-cash": patch({
    "openingQuestion": "Khi một doanh nghiệp có nhiều tiền mặt, câu hỏi quan trọng nhất là gì?",
    "openingOptions": [
      "Làm sao giữ càng nhiều càng tốt",
      "Sẽ dùng cash cho đâu: đầu tư, mua lại hay cổ tức",
      "Có nên giấu cash không",
      "Cash nhiều thì không cần hoạch định"
    ],
    "correctOption": 1,
    "explanation": "Cash chỉ hữu ích khi được phân bổ tốt: growth, buyback, M&A, giảm nợ hoặc dự trữ an toàn. Một CFO giỏi luôn có thứ tự ưu tiên rõ ràng cho các lựa chọn này dựa trên ROIC kỳ vọng của từng phương án so với chi phí vốn của công ty.",
    "diagram": [
      {
        "label": "Cash",
        "arrow": true
      },
      {
        "label": "Growth investment",
        "arrow": true
      },
      {
        "label": "Buyback / dividend",
        "arrow": true
      },
      {
        "label": "Capital allocation",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "FPT",
      "description": "Doanh nghiệp có dòng tiền mạnh thường được xem xét ở góc độ capital allocation hơn là chỉ nhìn số dư tiền mặt."
    },
    "quiz": [
      {
        "question": "Cash dồi dào có thể làm gì cho cổ đông?",
        "options": [
          "Tạo đệm an toàn và linh hoạt vốn",
          "Làm báo cáo xấu hơn",
          "Bắt buộc phải trả hết ngay",
          "Không có tác dụng"
        ],
        "correct": 0,
        "explanation": "Tiền mặt tốt khi nó giúp doanh nghiệp linh hoạt trước cơ hội và cú sốc."
      },
      {
        "question": "Giữa việc dùng cash để mua lại cổ phiếu (buyback) và trả cổ tức, điều gì quyết định lựa chọn nào tốt hơn cho cổ đông?",
        "options": [
          "Buyback luôn tốt hơn cổ tức trong mọi trường hợp",
          "Phụ thuộc vào việc cổ phiếu đang bị định giá thấp hay không - buyback tạo giá trị tốt nhất khi giá cổ phiếu rẻ hơn giá trị thực, còn cổ tức phù hợp hơn khi công ty muốn trả tiền đều đặn không phụ thuộc định giá thị trường",
          "Cổ tức luôn tốt hơn vì cổ đông nhận tiền ngay",
          "Không có sự khác biệt nào giữa hai lựa chọn"
        ],
        "correct": 1,
        "explanation": "Buyback chỉ thực sự tạo giá trị cho cổ đông còn lại khi công ty mua cổ phiếu với giá thấp hơn giá trị nội tại - nếu mua ở giá cao, đó là phân bổ vốn kém. Cổ tức đơn giản và dễ dự đoán hơn nhưng không tận dụng được cơ hội khi cổ phiếu đang bị định giá thấp."
      },
      {
        "question": "Vì sao mua lại cổ phiếu (buyback) chỉ thực sự tạo giá trị khi cổ phiếu đang bị định giá thấp?",
        "options": [
          "Vì khi đó doanh nghiệp đang mua tài sản với giá thấp hơn giá trị thực, tạo ra giá trị dôi ra cho cổ đông còn lại",
          "Vì buyback luôn làm tăng EPS bất kể giá mua",
          "Vì luật quy định chỉ được buyback khi giá thấp",
          "Vì buyback ở giá cao sẽ bị đánh thuế nặng hơn"
        ],
        "correct": 0,
        "explanation": "EPS tăng do giảm số cổ phiếu lưu hành xảy ra bất kể giá mua, nên đó không phải thước đo đúng. Thước đo đúng là so giá mua với giá trị nội tại của doanh nghiệp."
      },
      {
        "question": "Thứ tự ưu tiên phổ biến khi phân bổ tiền mặt dư thừa là gì?",
        "options": [
          "Bảo đảm đệm thanh khoản trước, tài trợ dự án nội bộ ROIC cao, rồi mới trả lại vốn cho cổ đông",
          "Luôn ưu tiên buyback trước mọi lựa chọn khác",
          "Luôn ưu tiên M&A trước để tăng quy mô nhanh nhất",
          "Không có thứ tự nào, tùy hoàn toàn vào cảm tính ban lãnh đạo"
        ],
        "correct": 0,
        "explanation": "An toàn trước, cơ hội sinh lời cao nhất trước, phần còn lại mới trả về cho cổ đông - đây là logic phân bổ vốn kỷ luật mà một CFO giỏi thường theo đuổi."
      }
    ],
    "keyTakeaways": [
      "Quan trọng không phải chỉ có cash, mà là dùng cash thế nào",
      "Capital allocation là kỹ năng sống còn của quản trị",
      "Đừng nhầm cash lớn với hiệu quả vốn cao"
    ],
    "summary": {
      "keyIdea": "Quan trọng không phải chỉ có cash, mà là dùng cash thế nào",
      "commonMistake": "Dễ bỏ qua: capital allocation là kỹ năng sống còn của quản trị",
      "action": "Đừng nhầm cash lớn với hiệu quả vốn cao"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khi một doanh nghiệp có nhiều tiền mặt, câu hỏi quan trọng nhất không phải là 'có bao nhiêu' mà là 'sẽ dùng nó thế nào'."
      },
      {
        "type": "heading",
        "text": "Capital Allocation - kỹ năng sống còn của CFO"
      },
      {
        "type": "paragraph",
        "text": "Tiền mặt chỉ thực sự hữu ích khi được phân bổ đúng: tái đầu tư tăng trưởng, mua lại cổ phiếu (buyback), M&A, giảm nợ, hoặc giữ làm đệm an toàn. Giữa buyback và trả cổ tức, lựa chọn tốt hơn phụ thuộc vào việc cổ phiếu có đang bị định giá thấp hay không - buyback chỉ thực sự tạo giá trị cho cổ đông còn lại khi mua ở giá thấp hơn giá trị nội tại, ngược lại đó là phân bổ vốn kém."
      },
      {
        "type": "list",
        "items": [
          "Tiền mặt tốt khi nó tạo đệm an toàn và sự linh hoạt trước cơ hội/cú sốc",
          "Buyback chỉ tạo giá trị khi cổ phiếu đang bị định giá thấp hơn giá trị thực",
          "Capital allocation là kỹ năng quan trọng bậc nhất của một CFO giỏi"
        ]
      },
      {
        "type": "conceptTable",
        "title": "Năm lựa chọn dùng tiền mặt và tiêu chí chọn",
        "concepts": [
          {
            "vi": "Tái đầu tư tăng trưởng",
            "en": "Growth capex",
            "def": "Ưu tiên khi còn nhiều dự án nội bộ có ROIC vượt WACC rõ rệt."
          },
          {
            "vi": "Mua lại cổ phiếu",
            "en": "Buyback",
            "def": "Chỉ tạo giá trị khi cổ phiếu đang giao dịch dưới giá trị nội tại - mua ở giá cao là phân bổ vốn kém."
          },
          {
            "vi": "M&A",
            "en": "Mua doanh nghiệp khác",
            "def": "Hợp lý khi mục tiêu có giá hợp lý và tạo cộng hưởng thật, không chỉ để 'tiêu' bớt tiền mặt dư thừa."
          },
          {
            "vi": "Giảm nợ",
            "en": "Trả bớt nợ vay",
            "def": "Ưu tiên khi chi phí nợ cao hơn lợi suất kỳ vọng của các lựa chọn khác, hoặc khi cần giảm rủi ro tài chính."
          },
          {
            "vi": "Giữ làm đệm",
            "en": "Cash reserve",
            "def": "Cần thiết cho an toàn thanh khoản, nhưng giữ quá mức cần thiết trở thành chi phí cơ hội."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Vì sao buyback chỉ tốt khi cổ phiếu đang rẻ"
      },
      {
        "type": "paragraph",
        "text": "Mua lại cổ phiếu về bản chất là doanh nghiệp dùng tiền mặt để mua chính mình. Nếu giá thị trường thấp hơn giá trị nội tại, mỗi cổ phiếu mua lại tạo ra giá trị dôi ra cho các cổ đông còn lại - tương đương một khoản đầu tư có lợi suất cao. Nếu mua ở giá đã cao hơn giá trị thực, điều ngược lại xảy ra: tiền mặt bị tiêu tốn để mua tài sản đắt, làm giảm giá trị cho cổ đông còn lại dù về mặt kế toán EPS vẫn tăng do số cổ phiếu lưu hành giảm."
      },
      {
        "type": "callout",
        "label": "Thứ tự ưu tiên phổ biến trong thực tế",
        "text": "Nhiều CFO đi theo thứ tự: trước hết bảo đảm đủ đệm thanh khoản, sau đó tài trợ các dự án nội bộ có ROIC cao nhất trước, rồi mới cân nhắc M&A hoặc trả lại vốn cho cổ đông qua cổ tức hoặc buyback với phần còn dư."
      },
      {
        "type": "closing",
        "lines": [
          "Đừng nhầm 'có nhiều tiền mặt' với 'hiệu quả sử dụng vốn cao'.",
          "Quan trọng không phải là có bao nhiêu, mà là dùng nó tạo ra thêm bao nhiêu giá trị."
        ]
      }
    ]
  }),
  "oil-gas-business-model": patch({
    "openingQuestion": "Bốn mô hình trong ngành dầu khí khác nhau chủ yếu ở đâu?",
    "openingOptions": [
      "Vị trí địa lý",
      "Khâu chuỗi giá trị và mức độ nhạy giá hàng hóa",
      "Số lượng nhân viên",
      "Chỉ số P/B"
    ],
    "correctOption": 1,
    "explanation": "Upstream, midstream, downstream và dịch vụ dầu khí chịu rủi ro và biên lợi nhuận khác nhau dọc chuỗi giá trị. Vì vậy khi giá dầu biến động, không phải doanh nghiệp nào trong ngành cũng bị ảnh hưởng theo cùng một hướng hay cùng một mức độ.",
    "diagram": [
      {
        "label": "Upstream",
        "arrow": true
      },
      {
        "label": "Midstream",
        "arrow": true
      },
      {
        "label": "Downstream",
        "arrow": true
      },
      {
        "label": "Dịch vụ / logistics",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "PV GAS / lọc hóa dầu",
      "description": "Có doanh nghiệp hưởng lợi khi giá hàng hóa tăng, có doanh nghiệp lại phụ thuộc vào chu kỳ đầu tư và sản lượng."
    },
    "quiz": [
      {
        "question": "Khâu nào thường nhạy nhất với giá commodity?",
        "options": [
          "Upstream",
          "Downstream",
          "HR",
          "Kế toán"
        ],
        "correct": 0,
        "explanation": "Khai thác thường chịu trực tiếp nhất biến động giá hàng hóa."
      },
      {
        "question": "Khi giá dầu giảm mạnh, doanh nghiệp midstream (vận chuyển, lưu trữ qua đường ống, thường có hợp đồng phí cố định dài hạn) thường bị ảnh hưởng ra sao so với upstream (khai thác)?",
        "options": [
          "Bị ảnh hưởng nặng như nhau vì cùng ngành dầu khí",
          "Midstream thường ít bị ảnh hưởng hơn nhiều vì doanh thu đến từ phí vận chuyển/lưu trữ theo hợp đồng dài hạn, không trực tiếp phụ thuộc vào giá dầu như doanh thu bán dầu thô của upstream",
          "Midstream luôn bị ảnh hưởng nặng hơn upstream",
          "Không doanh nghiệp nào trong chuỗi bị ảnh hưởng bởi giá dầu"
        ],
        "correct": 1,
        "explanation": "Đây là lý do nhà đầu tư phân biệt các khâu trong chuỗi giá trị dầu khí: midstream vận hành giống hạ tầng thu phí hơn là doanh nghiệp thương mại hàng hóa, nên dòng tiền ổn định hơn nhiều so với upstream - nơi doanh thu gắn trực tiếp với giá dầu thị trường."
      },
      {
        "question": "Vì sao doanh nghiệp trung nguồn (vận chuyển, lưu trữ) thường ít nhạy cảm với giá dầu hơn doanh nghiệp thượng nguồn?",
        "options": [
          "Vì họ thường có hợp đồng phí cố định dài hạn, doanh thu không gắn trực tiếp với giá dầu thô",
          "Vì họ không sử dụng dầu trong hoạt động kinh doanh",
          "Vì họ được chính phủ trợ giá",
          "Vì họ không có chi phí cố định"
        ],
        "correct": 0,
        "explanation": "Mô hình kinh doanh của trung nguồn gần giống hạ tầng thu phí hơn là doanh nghiệp thương mại hàng hóa - đây là điểm khác biệt cấu trúc quan trọng nhất trong chuỗi giá trị dầu khí."
      },
      {
        "question": "Vì sao gộp chung mọi doanh nghiệp 'ngành dầu khí' khi phân tích tác động giá dầu là sai lầm?",
        "options": [
          "Vì bốn khâu trong chuỗi giá trị có mức độ nhạy cảm với giá dầu rất khác nhau, thậm chí có thể ngược chiều nhau",
          "Vì ngành dầu khí không tồn tại chuỗi giá trị",
          "Vì giá dầu không ảnh hưởng đến bất kỳ doanh nghiệp nào trong ngành",
          "Vì tất cả doanh nghiệp dầu khí đều có cùng một mô hình kinh doanh"
        ],
        "correct": 0,
        "explanation": "Đây là điểm cốt lõi của bài học: một cú sốc giá dầu có thể vừa gây hại nặng cho thượng nguồn, vừa gần như trung tính với trung nguồn, vừa có lợi cho hạ nguồn."
      }
    ],
    "keyTakeaways": [
      "Ngành dầu khí là chuỗi giá trị nhiều lớp",
      "Rủi ro và biên lợi nhuận thay đổi theo từng khâu",
      "Phải đọc theo chu kỳ hàng hóa"
    ],
    "summary": {
      "keyIdea": "Ngành dầu khí là chuỗi giá trị nhiều lớp",
      "commonMistake": "Dễ bỏ qua: rủi ro và biên lợi nhuận thay đổi theo từng khâu",
      "action": "Phải đọc theo chu kỳ hàng hóa"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Ngành dầu khí không phải một khối đồng nhất - bốn mô hình kinh doanh khác nhau trong cùng chuỗi giá trị chịu ảnh hưởng rất khác nhau khi giá dầu biến động."
      },
      {
        "type": "heading",
        "text": "Upstream, Midstream, Downstream và Dịch vụ"
      },
      {
        "type": "paragraph",
        "text": "Upstream (khai thác) chịu ảnh hưởng trực tiếp và mạnh nhất từ biến động giá dầu, vì doanh thu gắn thẳng với giá bán dầu thô. Midstream (vận chuyển, lưu trữ qua đường ống) thường có hợp đồng phí cố định dài hạn, nên dòng tiền ổn định hơn nhiều, vận hành giống hạ tầng thu phí hơn là doanh nghiệp thương mại hàng hóa. Downstream (lọc hóa dầu, phân phối) và dịch vụ có mức độ nhạy cảm riêng, thường ngược chiều với upstream trong một số giai đoạn."
      },
      {
        "type": "list",
        "items": [
          "Rủi ro và biên lợi nhuận của doanh nghiệp dầu khí thay đổi rất lớn theo từng khâu trong chuỗi giá trị",
          "Upstream nhạy cảm trực tiếp nhất với giá dầu; midstream ổn định hơn nhiều nhờ hợp đồng phí cố định",
          "Không nên gộp chung mọi doanh nghiệp 'ngành dầu khí' khi phân tích tác động của giá dầu"
        ]
      },
      {
        "type": "conceptTable",
        "title": "Bốn khâu, bốn mức độ nhạy cảm với giá dầu",
        "concepts": [
          {
            "vi": "Thượng nguồn",
            "en": "Upstream - khai thác",
            "def": "Doanh thu gắn trực tiếp với giá dầu thô. Lợi nhuận biến động mạnh nhất theo chu kỳ giá."
          },
          {
            "vi": "Trung nguồn",
            "en": "Midstream - vận chuyển, lưu trữ",
            "def": "Thường có hợp đồng phí cố định dài hạn với khách hàng, nên dòng tiền ổn định như hạ tầng thu phí, ít nhạy với giá dầu."
          },
          {
            "vi": "Hạ nguồn",
            "en": "Downstream - lọc hóa dầu, phân phối",
            "def": "Biên lợi nhuận phụ thuộc chênh lệch giữa giá dầu thô đầu vào và giá sản phẩm đầu ra, đôi khi hưởng lợi khi giá dầu giảm."
          },
          {
            "vi": "Dịch vụ dầu khí",
            "en": "Oilfield services",
            "def": "Doanh thu phụ thuộc mức đầu tư khai thác của khách hàng thượng nguồn, thường có độ trễ so với biến động giá dầu."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Vì sao gộp chung 'cổ phiếu dầu khí' là sai lầm phổ biến",
        "text": "Khi giá dầu giảm mạnh, doanh nghiệp thượng nguồn thường chịu thiệt hại nặng ngay lập tức vì doanh thu gắn thẳng với giá bán. Doanh nghiệp trung nguồn có thể gần như không bị ảnh hưởng nếu hợp đồng vận chuyển là phí cố định. Doanh nghiệp hạ nguồn đôi khi còn được lợi vì chi phí đầu vào giảm nhanh hơn giá bán sản phẩm. Nhà đầu tư gộp chung cả bốn nhóm vào một nhận định 'ngành dầu khí đang xấu' sẽ bỏ lỡ những khác biệt quan trọng này."
      },
      {
        "type": "heading",
        "text": "Câu hỏi cần trả lời trước khi phân tích một doanh nghiệp dầu khí"
      },
      {
        "type": "list",
        "items": [
          "Doanh nghiệp này thuộc khâu nào trong bốn khâu, hay hoạt động ở nhiều khâu cùng lúc?",
          "Hợp đồng doanh thu chính là giá thị trường thả nổi hay giá cố định dài hạn?",
          "Nếu giá dầu giảm 30%, doanh thu và lợi nhuận của riêng doanh nghiệp này bị ảnh hưởng bao nhiêu phần trăm?"
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Giá dầu tăng hay giảm không ảnh hưởng đều đến mọi doanh nghiệp trong ngành.",
          "Luôn xác định rõ doanh nghiệp đang ở khâu nào của chuỗi giá trị trước khi kết luận."
        ]
      }
    ]
  }),
  "bitcoin-crypto": patch({
    "openingQuestion": "Giá trị của Bitcoin thường được người ủng hộ giải thích bằng yếu tố nào?",
    "openingOptions": [
      "Supply cố định và network effect",
      "Lợi nhuận kế toán",
      "Cổ tức",
      "P/B"
    ],
    "correctOption": 0,
    "explanation": "Bitcoin không dựa vào cash flow truyền thống; nó thường được nhìn qua khan hiếm, network effect và niềm tin thị trường. Vì không có mô hình định giá dựa trên dòng tiền chiết khấu như cổ phiếu, biên độ dao động giá của nó thường lớn hơn nhiều so với tài sản truyền thống.",
    "diagram": [
      {
        "label": "Fixed supply",
        "arrow": true
      },
      {
        "label": "Network effect",
        "arrow": true
      },
      {
        "label": "Demand",
        "arrow": true
      },
      {
        "label": "Price",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Crypto market",
      "description": "Các tài sản số biến động mạnh vì định giá phụ thuộc nhiều vào kỳ vọng, thanh khoản và tâm lý thị trường."
    },
    "quiz": [
      {
        "question": "Điều nào khiến Bitcoin khác cổ phiếu truyền thống?",
        "options": [
          "Không có cash flow nền tảng",
          "Không thể mua bán",
          "Không có người dùng",
          "Không biến động"
        ],
        "correct": 0,
        "explanation": "Định giá crypto thường không đi theo khung doanh nghiệp tạo cash flow như cổ phiếu."
      },
      {
        "question": "Vì sao các mô hình định giá truyền thống như DCF hoặc P/E không áp dụng được cho Bitcoin?",
        "options": [
          "Vì Bitcoin quá mới để có dữ liệu lịch sử",
          "Vì Bitcoin không có dòng tiền, lợi nhuận hay tài sản kinh doanh tạo giá trị như một doanh nghiệp - các mô hình DCF/P/E được xây trên nền tảng dòng tiền doanh nghiệp nên không có gì để áp dụng vào",
          "Vì luật pháp cấm định giá Bitcoin bằng DCF",
          "Vì Bitcoin luôn tăng giá nên không cần định giá"
        ],
        "correct": 1,
        "explanation": "DCF chiết khấu dòng tiền tương lai của một doanh nghiệp; P/E so lợi nhuận với giá cổ phiếu - cả hai đều cần một 'doanh nghiệp' tạo ra lợi nhuận/dòng tiền. Bitcoin không phải doanh nghiệp và không tạo dòng tiền, nên giá trị của nó phụ thuộc hoàn toàn vào cung-cầu, niềm tin và network effect thay vì các mô hình định giá cash-flow truyền thống."
      },
      {
        "question": "Vì sao không thể dùng DCF để định giá Bitcoin như định giá một doanh nghiệp?",
        "options": [
          "Vì Bitcoin không phải doanh nghiệp và không tạo ra dòng tiền để chiết khấu",
          "Vì Bitcoin không có giá trị gì cả",
          "Vì DCF chỉ áp dụng được cho công ty niêm yết",
          "Vì Bitcoin có dòng tiền quá lớn để tính toán"
        ],
        "correct": 0,
        "explanation": "DCF cần một dòng tiền tương lai để chiết khấu. Bitcoin không tạo ra dòng tiền theo nghĩa đó, nên công cụ định giá dựa trên dòng tiền đơn giản là không áp dụng được, không phải vì công cụ sai."
      },
      {
        "question": "Tài sản nào khác cũng không tạo dòng tiền nhưng vẫn được thị trường công nhận có giá trị từ lâu, tương tự logic định giá Bitcoin?",
        "options": [
          "Vàng",
          "Trái phiếu chính phủ",
          "Cổ phiếu công ty tăng trưởng",
          "Bất động sản cho thuê"
        ],
        "correct": 0,
        "explanation": "Vàng được định giá qua khan hiếm và vai trò lưu trữ giá trị chứ không qua dòng tiền, là ví dụ kinh điển cho thấy một tài sản có thể có giá trị thực mà không cần mô hình chiết khấu dòng tiền."
      }
    ],
    "keyTakeaways": [
      "Crypto thường được nhìn qua supply, network effect và tâm lý",
      "Định giá khác hoàn toàn cổ phiếu",
      "Biến động và thanh khoản là trọng tâm cần quản trị"
    ],
    "summary": {
      "keyIdea": "Crypto thường được nhìn qua supply, network effect và tâm lý",
      "commonMistake": "Dễ bỏ qua: định giá khác hoàn toàn cổ phiếu",
      "action": "Biến động và thanh khoản là trọng tâm cần quản trị"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bitcoin và các tài sản số khác không thể định giá bằng DCF hay P/E - không phải vì những công cụ đó tệ, mà vì bản chất của Bitcoin hoàn toàn khác một doanh nghiệp."
      },
      {
        "type": "heading",
        "text": "Vì sao các mô hình định giá truyền thống không áp dụng được"
      },
      {
        "type": "paragraph",
        "text": "DCF chiết khấu dòng tiền tương lai của một doanh nghiệp; P/E so lợi nhuận với giá cổ phiếu - cả hai đều cần một 'doanh nghiệp' tạo ra lợi nhuận hoặc dòng tiền. Bitcoin không phải doanh nghiệp và không tạo dòng tiền, nên giá trị của nó phụ thuộc hoàn toàn vào cung khan hiếm cố định, network effect (giá trị tăng khi có nhiều người dùng hơn), và niềm tin thị trường - không phải các mô hình cash-flow truyền thống."
      },
      {
        "type": "list",
        "items": [
          "Bitcoin không có cash flow nền tảng nên DCF/P/E không áp dụng được",
          "Giá trị dựa trên khan hiếm (fixed supply), network effect và niềm tin thị trường",
          "Vì thiếu neo định giá truyền thống, biến động giá thường lớn hơn nhiều so với tài sản có dòng tiền"
        ]
      },
      {
        "type": "conceptTable",
        "title": "Ba yếu tố định giá thay thế cho dòng tiền",
        "concepts": [
          {
            "vi": "Khan hiếm cố định",
            "en": "Fixed supply",
            "def": "Tổng cung Bitcoin bị giới hạn theo giao thức, không thể phát hành thêm tùy ý như tiền pháp định - tương tự logic khan hiếm của vàng."
          },
          {
            "vi": "Hiệu ứng mạng lưới",
            "en": "Network effect",
            "def": "Giá trị của mạng lưới tăng khi có nhiều người dùng, nhiều điểm chấp nhận thanh toán, và nhiều hạ tầng xây dựng xung quanh nó hơn."
          },
          {
            "vi": "Niềm tin thị trường",
            "en": "Market sentiment",
            "def": "Không có dòng tiền neo giá trị, nên tâm lý và câu chuyện thị trường ảnh hưởng đến giá mạnh hơn nhiều so với tài sản có dòng tiền."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cổ phiếu doanh nghiệp",
          "text": "Có dòng tiền, lợi nhuận, tài sản - những thứ có thể chiết khấu về hiện tại bằng DCF hoặc so sánh bằng P/E. Giá trị có một điểm neo, dù không hoàn hảo."
        },
        "right": {
          "label": "Bitcoin",
          "text": "Không tạo dòng tiền, không có 'lợi nhuận' để so sánh. Giá trị hoàn toàn dựa trên cung cầu, niềm tin và tiện ích mạng lưới - không có điểm neo truyền thống, nên biên độ dao động lớn hơn nhiều."
        }
      },
      {
        "type": "callout",
        "label": "Điều này không có nghĩa là 'không có giá trị'",
        "text": "Nhiều tài sản không tạo dòng tiền vẫn có giá trị thực - vàng là ví dụ kinh điển, được định giá qua khan hiếm và vai trò lưu trữ giá trị suốt hàng nghìn năm mà không cần một mô hình DCF nào. Bitcoin được nhiều người xem theo logic tương tự, nhưng với lịch sử ngắn hơn nhiều nên độ bất định về giá trị dài hạn cũng lớn hơn nhiều."
      },
      {
        "type": "closing",
        "lines": [
          "Không áp dụng được DCF không có nghĩa Bitcoin không có giá trị.",
          "Nó chỉ có nghĩa là cần một khung tư duy khác để đánh giá, không phải khung tư duy của một doanh nghiệp."
        ]
      }
    ]
  }),
  "pvgas-bad-debt": patch({
    "openingQuestion": "Nợ xấu và khoản phải thu lớn thường ảnh hưởng gì trước tiên?",
    "openingOptions": [
      "Quality of earnings",
      "Tỷ lệ cổ tức",
      "Số lượng cổ phiếu",
      "Vốn hóa thị trường"
    ],
    "correctOption": 0,
    "explanation": "Khoản phải thu lớn và tập trung khách hàng cao có thể làm doanh thu đẹp nhưng cash flow xấu và tăng rủi ro tín dụng. Nếu một vài khách hàng lớn chiếm phần lớn doanh thu mà gặp khó khăn tài chính, doanh nghiệp có thể phải trích lập dự phòng nợ xấu lớn bất ngờ.",
    "diagram": [
      {
        "label": "Receivables",
        "arrow": true
      },
      {
        "label": "Concentration risk",
        "arrow": true
      },
      {
        "label": "Bad debt",
        "arrow": true
      },
      {
        "label": "Cash conversion",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "PVGas",
      "description": "Doanh nghiệp bán cho số ít khách hàng lớn cần đặc biệt soi khả năng thu tiền và rủi ro tập trung."
    },
    "quiz": [
      {
        "question": "Khoản phải thu tăng nhanh hơn doanh thu gợi ý điều gì?",
        "options": [
          "Thu tiền chậm hơn",
          "Doanh nghiệp chắc chắn khỏe hơn",
          "Không liên quan",
          "Cổ tức cao hơn"
        ],
        "correct": 0,
        "explanation": "Khi phải thu tăng mạnh, lợi nhuận kế toán có thể đẹp hơn dòng tiền thực tế."
      },
      {
        "question": "Một doanh nghiệp có 70% doanh thu đến từ 3 khách hàng lớn. Rủi ro tập trung (concentration risk) này ảnh hưởng thế nào đến việc định giá doanh nghiệp?",
        "options": [
          "Không ảnh hưởng vì doanh thu vẫn ổn định",
          "Nên được định giá thận trọng hơn (chiết khấu rủi ro cao hơn hoặc multiple thấp hơn) vì mất một trong ba khách hàng đó có thể ảnh hưởng nghiêm trọng đến doanh thu và dòng tiền, khác với doanh nghiệp có khách hàng phân tán rộng",
          "Luôn được định giá cao hơn vì khách hàng lớn đáng tin cậy hơn",
          "Chỉ ảnh hưởng đến kế toán, không ảnh hưởng định giá"
        ],
        "correct": 1,
        "explanation": "Concentration risk là một dạng rủi ro kinh doanh thực sự: mất một khách hàng lớn có thể gây tổn thất doanh thu tức thì mà doanh nghiệp khó bù đắp ngay, khác với việc mất một trong hàng nghìn khách hàng nhỏ. Nhà đầu tư thường yêu cầu biên an toàn (margin of safety) lớn hơn hoặc trả multiple thấp hơn cho các doanh nghiệp có rủi ro tập trung cao."
      },
      {
        "question": "Doanh thu tăng 8%, phải thu tăng 40%. Cách đọc đúng nhất là gì?",
        "options": [
          "Cần kiểm tra tuổi nợ và mức độ tập trung khách hàng, vì doanh nghiệp có thể đang bán chịu nhiều hơn hoặc khách hàng trả chậm hơn",
          "Đây là dấu hiệu doanh nghiệp đang tăng trưởng rất khỏe",
          "Không có gì đáng lo vì cả hai chỉ số đều dương",
          "Phải thu tăng nhanh hơn doanh thu luôn là gian lận kế toán"
        ],
        "correct": 0,
        "explanation": "Chênh lệch tốc độ lớn giữa phải thu và doanh thu là dấu hiệu cảnh báo cần điều tra thêm, chứ chưa phải kết luận cuối cùng - nhưng không nên bỏ qua."
      },
      {
        "question": "Vì sao rủi ro tập trung khách hàng cao lại đáng lo hơn một khoản phải thu lớn nhưng dàn trải trên nhiều khách hàng nhỏ?",
        "options": [
          "Vì nếu một khách hàng lớn gặp khó khăn tài chính, doanh nghiệp có thể mất một phần lớn doanh thu và phải trích lập dự phòng nợ xấu lớn cùng lúc",
          "Vì khách hàng nhỏ không bao giờ trả chậm",
          "Vì khoản phải thu dàn trải luôn được kiểm toán kỹ hơn",
          "Vì rủi ro tập trung không ảnh hưởng đến dòng tiền"
        ],
        "correct": 0,
        "explanation": "Đây là bản chất của rủi ro tập trung: thiệt hại không phân tán ra mà dồn vào một sự kiện duy nhất, khiến tác động tài chính lớn hơn nhiều so với rủi ro dàn trải."
      }
    ],
    "keyTakeaways": [
      "Receivables là điểm cần soi trong quality of earnings",
      "Concentration risk có thể làm bad debt tăng",
      "Doanh thu không đồng nghĩa với tiền đã về"
    ],
    "summary": {
      "keyIdea": "Receivables là điểm cần soi trong quality of earnings",
      "commonMistake": "Dễ bỏ qua: concentration risk có thể làm bad debt tăng",
      "action": "Doanh thu không đồng nghĩa với tiền đã về"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một doanh nghiệp có doanh thu tăng trưởng đẹp trên giấy tờ vẫn có thể tiềm ẩn rủi ro lớn nếu phần lớn doanh thu đó phụ thuộc vào một vài khách hàng."
      },
      {
        "type": "heading",
        "text": "Concentration risk và chất lượng lợi nhuận"
      },
      {
        "type": "paragraph",
        "text": "Khoản phải thu lớn và tập trung vào một vài khách hàng có thể làm doanh thu trông đẹp nhưng ẩn chứa rủi ro tín dụng cao - nếu một khách hàng lớn gặp khó khăn tài chính, doanh nghiệp có thể phải trích lập dự phòng nợ xấu lớn bất ngờ. Nhà đầu tư thường yêu cầu biên an toàn (margin of safety) lớn hơn hoặc định giá thận trọng hơn (multiple thấp hơn) cho các doanh nghiệp có rủi ro tập trung khách hàng cao."
      },
      {
        "type": "list",
        "items": [
          "Khoản phải thu tăng nhanh hơn doanh thu gợi ý việc thu tiền đang chậm lại",
          "Concentration risk cao (phụ thuộc ít khách hàng lớn) là rủi ro kinh doanh thực sự, không chỉ vấn đề kế toán",
          "Receivables là một trong những điểm cần soi kỹ nhất trong đánh giá quality of earnings"
        ]
      },
      {
        "type": "formula",
        "title": "So tốc độ tăng phải thu với tốc độ tăng doanh thu",
        "equation": "Tỷ lệ cảnh báo = % tăng phải thu ÷ % tăng doanh thu",
        "example": {
          "title": "Ví dụ minh họa",
          "calculation": "Doanh thu tăng 10%, phải thu tăng 45%",
          "result": "Tỷ lệ 4,5 lần - dấu hiệu cảnh báo rõ ràng",
          "explanation": "Phải thu tăng nhanh hơn doanh thu gần năm lần nghĩa là doanh nghiệp đang bán chịu nhiều hơn hẳn trước, hoặc khách hàng đang trả chậm hơn. Cả hai khả năng đều cần kiểm tra kỹ tuổi nợ và mức độ tập trung khách hàng trước khi tin vào con số doanh thu tăng trưởng."
        }
      },
      {
        "type": "heading",
        "text": "Ba câu hỏi khi phát hiện tập trung khách hàng cao"
      },
      {
        "type": "list",
        "items": [
          "Bao nhiêu phần trăm doanh thu đến từ khách hàng lớn nhất, và ba khách hàng lớn nhất cộng lại?",
          "Tuổi nợ của các khoản phải thu từ nhóm khách hàng đó đang giãn ra hay giữ nguyên?",
          "Mức trích lập dự phòng nợ khó đòi có tăng tương ứng với rủi ro tập trung này không, hay đang giữ nguyên bất thường?"
        ]
      },
      {
        "type": "callout",
        "label": "Vì sao thị trường định giá thấp hơn cho rủi ro tập trung khách hàng",
        "text": "Một doanh nghiệp có hàng nghìn khách hàng nhỏ mất một khách hàng cũng không ảnh hưởng nhiều. Một doanh nghiệp có một khách hàng chiếm 40% doanh thu mà khách đó gặp khó khăn tài chính có thể mất gần một nửa doanh thu chỉ sau một quyết định của bên thứ ba mà doanh nghiệp không kiểm soát được. Đây là lý do nhà đầu tư thường đòi hỏi biên an toàn lớn hơn hoặc chấp nhận trả bội số thấp hơn cho các doanh nghiệp có rủi ro tập trung cao."
      },
      {
        "type": "closing",
        "lines": [
          "Doanh thu đẹp không đồng nghĩa với tiền đã thực sự về túi.",
          "Luôn hỏi thêm: doanh thu đó đến từ bao nhiêu khách hàng, và họ có đáng tin cậy không?"
        ]
      }
    ]
  }),
  "retail-store-analysis": patch({
    "openingQuestion": "Khi phân tích doanh nghiệp bán lẻ, KPI nào nên nhìn đầu tiên?",
    "openingOptions": [
      "Store productivity, same-store sales growth và payback period",
      "EPS và P/E thôi",
      "Số lượng nhân viên",
      "Tỷ giá USD"
    ],
    "correctOption": 0,
    "explanation": "Retail sống bằng hiệu quả từng cửa hàng, doanh số trên cùng cửa hàng và tốc độ hoàn vốn mở mới - ba chỉ số này cho biết liệu việc mở rộng chuỗi có thực sự tạo giá trị hay chỉ đang làm doanh thu tổng trông lớn hơn.",
    "diagram": [
      {
        "label": "Store productivity",
        "arrow": true
      },
      {
        "label": "Same-store sales",
        "arrow": true
      },
      {
        "label": "Payback period",
        "arrow": true
      },
      {
        "label": "Mở rộng chuỗi",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Chuỗi bán lẻ",
      "description": "Một chuỗi có thể mở rất nhanh, nhưng nếu doanh thu trên mỗi cửa hàng và thời gian hoàn vốn không đẹp thì tăng trưởng đó chưa chắc tốt."
    },
    "quiz": [
      {
        "question": "Same-store sales growth cho biết gì?",
        "options": [
          "Doanh số cửa hàng cũ tăng hay giảm",
          "Doanh số online",
          "Lợi nhuận ròng",
          "Số lượng nhân sự"
        ],
        "correct": 0,
        "explanation": "SSS growth đo sức khỏe của cửa hàng hiện hữu, không bị làm méo bởi việc mở mới."
      },
      {
        "question": "Payback period dài thường hàm ý gì?",
        "options": [
          "Mở mới kém hấp dẫn hơn",
          "Cửa hàng in tiền nhanh",
          "Không quan trọng",
          "Rủi ro giảm"
        ],
        "correct": 0,
        "explanation": "Nếu phải mất quá lâu mới hoàn vốn, tốc độ mở rộng có thể không tạo giá trị như kỳ vọng."
      },
      {
        "question": "Hai cửa hàng cùng diện tích 200m², cửa hàng A doanh thu 20 tỷ, cửa hàng B doanh thu 12 tỷ. Doanh thu trên mỗi mét vuông chênh nhau bao nhiêu?",
        "options": [
          "Cửa hàng A cao gấp khoảng 1,67 lần cửa hàng B",
          "Hai cửa hàng có hiệu quả ngang nhau",
          "Cửa hàng B cao hơn vì diện tích bằng nhau",
          "Không thể so sánh nếu không biết số nhân viên"
        ],
        "correct": 0,
        "explanation": "100 triệu/m² so với 60 triệu/m², tức A hiệu quả hơn khoảng 1,67 lần trên cùng một đơn vị diện tích - đây là chỉ số quan trọng để quyết định nhân bản mô hình nào khi mở rộng."
      },
      {
        "question": "Chuỗi bán lẻ có payback period cửa hàng mới dài hơn nhiều so với trung bình ngành. Điều này gợi ý gì?",
        "options": [
          "Có thể đang mở rộng vào vị trí kém hoặc với chi phí đầu tư quá cao so với tiềm năng doanh thu",
          "Đây luôn là dấu hiệu tích cực vì đầu tư dài hạn",
          "Không liên quan đến chất lượng mở rộng",
          "Chỉ phản ánh chính sách kế toán khấu hao"
        ],
        "correct": 0,
        "explanation": "Payback dài hơn ngành là tín hiệu cảnh báo về hiệu quả của việc mở rộng, đáng để tìm hiểu nguyên nhân trước khi tiếp tục nhân rộng mô hình."
      }
    ],
    "keyTakeaways": [
      "Retail phải nhìn store-level economics",
      "SSS growth là chỉ báo sức khỏe cửa hàng hiện hữu",
      "Payback period quyết định mở mới có đáng không"
    ],
    "summary": {
      "keyIdea": "Retail phải nhìn store-level economics",
      "commonMistake": "Dễ bỏ qua: sSS growth là chỉ báo sức khỏe cửa hàng hiện hữu",
      "action": "Payback period quyết định mở mới có đáng không"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài này không chỉ là đọc doanh thu chuỗi bán lẻ. Mục tiêu là biết một cửa hàng có thật sự đáng mở hay không."
      },
      {
        "type": "heading",
        "text": "Ba KPI cốt lõi"
      },
      {
        "type": "list",
        "items": [
          "Store productivity: doanh thu hoặc lợi nhuận trên mỗi cửa hàng",
          "Same-store sales growth: tăng trưởng của cửa hàng cũ",
          "Payback period: mất bao lâu để hoàn vốn mở mới"
        ]
      },
      {
        "type": "paragraph",
        "text": "Ví dụ: một chuỗi mở thêm 50 cửa hàng mới trong năm, doanh thu tổng tăng 30% - nghe rất ấn tượng. Nhưng nếu same-store sales growth (doanh số các cửa hàng cũ) chỉ tăng 1%, gần như toàn bộ mức tăng trưởng đến từ việc mở thêm cửa hàng, không phải từ việc kinh doanh cốt lõi mạnh lên. Nếu payback period của cửa hàng mới lên tới 5-6 năm trong khi ngành trung bình 2-3 năm, chuỗi đang mở rộng chậm thu hồi vốn hơn bình thường - một tín hiệu cần thận trọng dù doanh thu tổng vẫn tăng đẹp trên báo cáo."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mở rộng nhanh",
          "text": "Nếu store productivity yếu, mở thêm cửa hàng chỉ làm doanh thu trông lớn hơn, không chắc làm giá trị lớn hơn."
        },
        "right": {
          "label": "Mở rộng khỏe",
          "text": "Khi cửa hàng mới hoàn vốn nhanh và doanh số cửa hàng cũ vẫn tăng, chuỗi có nền tảng tốt hơn để scale."
        }
      },
      {
        "type": "formula",
        "title": "Doanh thu trên mỗi mét vuông",
        "equation": "Store productivity = Doanh thu cửa hàng ÷ Diện tích sàn",
        "example": {
          "title": "So sánh hai cửa hàng cùng diện tích",
          "calculation": "Cửa hàng A: 20 tỷ ÷ 200m² · Cửa hàng B: 12 tỷ ÷ 200m²",
          "result": "100 triệu/m² so với 60 triệu/m²",
          "explanation": "Cùng diện tích mặt bằng và chi phí thuê tương đương, cửa hàng A tạo ra doanh thu gấp 1,67 lần. Khi mở rộng chuỗi, ưu tiên nhân bản mô hình vị trí và cách vận hành của cửa hàng A sẽ hiệu quả hơn nhiều so với mở đại trà không phân biệt."
        }
      },
      {
        "type": "heading",
        "text": "Payback period của cửa hàng mới nói lên điều gì"
      },
      {
        "type": "paragraph",
        "text": "Thời gian hoàn vốn cho biết bao lâu thì lợi nhuận tích lũy của một cửa hàng mới bù lại được chi phí đầu tư ban đầu - mặt bằng, nội thất, hàng hóa ban đầu. Payback càng ngắn thì mỗi đồng vốn bỏ ra mở rộng càng nhanh sinh lời trở lại để tái đầu tư tiếp. Nếu payback kéo dài hơn nhiều so với trung bình ngành, chuỗi có thể đang mở rộng vào những vị trí kém hoặc với chi phí đầu tư quá cao so với tiềm năng doanh thu."
      },
      {
        "type": "callout",
        "label": "Ba chỉ số nên đọc cùng nhau khi đánh giá kế hoạch mở rộng",
        "text": "Store productivity cho biết cửa hàng hiện có đang vận hành hiệu quả đến đâu. Same-store sales growth cho biết nhu cầu ở các cửa hàng hiện có có đang khỏe lên không. Payback period cho biết vốn bỏ ra mở mới có quay lại nhanh không. Một kế hoạch mở rộng chỉ thực sự tạo giá trị khi cả ba chỉ số này đều ủng hộ, không chỉ dựa vào con số doanh thu tổng đang tăng."
      },
      {
        "type": "closing",
        "lines": [
          "Doanh thu chuỗi không kể hết câu chuyện.",
          "Cửa hàng nào tự sinh lời mới là chỗ nên mở rộng."
        ]
      }
    ]
  }),
  "bds-business-model": patch({
    "openingQuestion": "4 mô hình kinh doanh BĐS khác nhau chủ yếu ở đâu?",
    "openingOptions": [
      "Chu kỳ vốn và nguồn doanh thu",
      "Số lượng dự án quảng cáo",
      "Tỷ giá",
      "Số phòng ban"
    ],
    "correctOption": 0,
    "explanation": "Phát triển nhà ở, khu công nghiệp, cho thuê tài sản và môi giới có chu kỳ vốn, biên lợi nhuận và rủi ro dòng tiền rất khác nhau. Gộp chung tất cả vào một nhãn công ty bất động sản khi phân tích tài chính là một trong những sai lầm phổ biến nhất của nhà đầu tư mới.",
    "diagram": [
      {
        "label": "Phát triển nhà ở",
        "arrow": true
      },
      {
        "label": "KCN",
        "arrow": true
      },
      {
        "label": "Cho thuê tài sản",
        "arrow": true
      },
      {
        "label": "Môi giới",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "BĐS Việt Nam",
      "description": "Có doanh nghiệp kiếm tiền từ chuyển giao dự án, có doanh nghiệp sống nhờ dòng tiền thuê, có doanh nghiệp hưởng hoa hồng môi giới."
    },
    "quiz": [
      {
        "question": "Mô hình nào thường tạo dòng tiền đều hơn?",
        "options": [
          "Cho thuê tài sản",
          "Phát triển đất dự án",
          "Môi giới zero",
          "Đầu cơ ngắn hạn"
        ],
        "correct": 0,
        "explanation": "Mô hình cho thuê thường cho cash flow đều hơn vì tài sản tạo tiền theo thời gian."
      },
      {
        "question": "Vì sao nhà đầu tư nên định giá một công ty phát triển dự án (developer) khác hẳn với một công ty sở hữu và cho thuê bất động sản (REIT-like)?",
        "options": [
          "Vì cả hai luôn có cùng mức rủi ro nên định giá giống nhau",
          "Vì developer có dòng tiền theo từng dự án (bùng nổ khi bàn giao, trống khi chưa có dự án mới) trong khi công ty cho thuê có dòng tiền đều đặn hơn - dùng cùng một khung định giá (như multiple P/E cố định) cho cả hai sẽ cho kết quả sai lệch",
          "Vì developer luôn có P/E thấp hơn",
          "Vì luật kế toán yêu cầu định giá khác nhau"
        ],
        "correct": 1,
        "explanation": "Developer ghi nhận doanh thu/lợi nhuận theo tiến độ hoặc thời điểm bàn giao dự án nên lợi nhuận rất gập ghềnh giữa các năm, còn công ty cho thuê có dòng tiền ổn định hơn nhiều - áp cùng một bội số định giá cho hai mô hình kinh doanh khác nhau này thường dẫn đến định giá sai."
      },
      {
        "question": "Vì sao lợi nhuận của một công ty phát triển dự án bất động sản (developer) thường gập ghềnh giữa các năm?",
        "options": [
          "Vì doanh thu và lợi nhuận được ghi nhận theo tiến độ hoặc thời điểm bàn giao dự án, không đều đặn như doanh thu cho thuê",
          "Vì công ty phát triển dự án không có doanh thu ổn định bao giờ",
          "Vì chuẩn mực kế toán bắt buộc ghi nhận không đều",
          "Vì các công ty này luôn thiếu vốn"
        ],
        "correct": 0,
        "explanation": "Bản chất mô hình kinh doanh quyết định nhịp độ ghi nhận: bàn giao dự án là sự kiện rời rạc, khác hẳn dòng thu nhập cho thuê định kỳ đều đặn."
      },
      {
        "question": "Vì sao công ty sở hữu và cho thuê tài sản thường xứng đáng bội số định giá cao hơn developer cho cùng mức lợi nhuận?",
        "options": [
          "Vì dòng tiền cho thuê ổn định và dự báo được hơn nhiều so với lợi nhuận gập ghềnh của developer",
          "Vì công ty cho thuê luôn có quy mô lớn hơn",
          "Vì công ty cho thuê không chịu rủi ro thị trường",
          "Vì developer luôn có nợ vay cao hơn"
        ],
        "correct": 0,
        "explanation": "Thị trường trả giá cao hơn cho tính chắc chắn và khả năng dự báo của dòng tiền - đây là logic chung áp dụng cho mọi loại tài sản, không riêng bất động sản."
      }
    ],
    "keyTakeaways": [
      "BĐS không phải một business model duy nhất",
      "Chu kỳ vốn và rủi ro dòng tiền khác nhau rất mạnh",
      "Phải đọc theo mô hình kiếm tiền cụ thể"
    ],
    "summary": {
      "keyIdea": "BĐS không phải một business model duy nhất",
      "commonMistake": "Dễ bỏ qua: chu kỳ vốn và rủi ro dòng tiền khác nhau rất mạnh",
      "action": "Phải đọc theo mô hình kiếm tiền cụ thể"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Gọi chung là 'công ty bất động sản' là một trong những cách phân loại gây hiểu lầm nhất trong đầu tư - vì bên trong đó là ít nhất bốn mô hình kinh doanh hoàn toàn khác nhau."
      },
      {
        "type": "heading",
        "text": "Dòng tiền gập ghềnh của developer so với dòng tiền đều của công ty cho thuê"
      },
      {
        "type": "paragraph",
        "text": "Công ty phát triển dự án (developer) ghi nhận doanh thu và lợi nhuận theo tiến độ hoặc thời điểm bàn giao - lợi nhuận vì vậy rất gập ghềnh giữa các năm, bùng nổ khi bàn giao và trống khi chưa có dự án mới. Ngược lại, công ty sở hữu và cho thuê tài sản có dòng tiền đều đặn hơn nhiều vì thu nhập đến từ hợp đồng thuê định kỳ. Áp cùng một bội số định giá (như P/E cố định) cho cả hai mô hình này gần như chắc chắn dẫn đến định giá sai."
      },
      {
        "type": "list",
        "items": [
          "Phát triển dự án: dòng tiền theo chu kỳ dự án, gập ghềnh, rủi ro cao khi thị trường đảo chiều",
          "Cho thuê tài sản: dòng tiền đều đặn hơn, ổn định hơn nhưng tăng trưởng chậm hơn",
          "Môi giới: mô hình dựa trên hoa hồng, nhạy cảm cao với thanh khoản thị trường"
        ]
      },
      {
        "type": "conceptTable",
        "title": "Bốn mô hình kinh doanh trong 'ngành bất động sản'",
        "concepts": [
          {
            "vi": "Phát triển dự án",
            "en": "Developer",
            "def": "Ghi nhận doanh thu theo tiến độ hoặc thời điểm bàn giao. Dòng tiền gập ghềnh, bùng nổ khi bàn giao và trống khi chưa có dự án mới."
          },
          {
            "vi": "Sở hữu và cho thuê",
            "en": "Property owner / REIT",
            "def": "Thu nhập từ hợp đồng thuê định kỳ, dòng tiền đều đặn hơn nhiều nhưng tăng trưởng thường chậm hơn developer."
          },
          {
            "vi": "Khu công nghiệp",
            "en": "Industrial land lease",
            "def": "Kết hợp cả hai: bán/cho thuê đất một lần và thu phí dịch vụ định kỳ, biên lợi nhuận và chu kỳ khác cả hai mô hình trên."
          },
          {
            "vi": "Môi giới",
            "en": "Brokerage",
            "def": "Thu nhập từ hoa hồng giao dịch, gần như không có tài sản cố định lớn, nhưng cực kỳ nhạy cảm với thanh khoản thị trường."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Vì sao áp cùng một bội số định giá cho cả bốn là sai"
      },
      {
        "type": "paragraph",
        "text": "Một developer với lợi nhuận đột biến năm nay vì vừa bàn giao xong một dự án lớn không nên được định giá bằng P/E của năm đó theo cùng cách với một công ty cho thuê có lợi nhuận ổn định qua nhiều năm - vì lợi nhuận của developer không lặp lại theo cùng nhịp độ. Ngược lại, công ty cho thuê xứng đáng một bội số cao hơn cho cùng mức lợi nhuận vì tính lặp lại và dự báo được của dòng tiền."
      },
      {
        "type": "callout",
        "label": "Câu hỏi đầu tiên trước khi định giá bất kỳ công ty bất động sản nào",
        "text": "Doanh thu ghi nhận năm nay có lặp lại được năm sau không, hay phụ thuộc vào việc có dự án mới bàn giao? Nếu là developer, kiểm tra quỹ đất và tiến độ dự án đang triển khai để ước lượng dòng lợi nhuận các năm tới, thay vì ngoại suy thẳng từ lợi nhuận năm hiện tại."
      },
      {
        "type": "closing",
        "lines": [
          "Trước khi định giá bất kỳ 'công ty bất động sản' nào, luôn hỏi: công ty này thực sự kiếm tiền theo mô hình nào trong bốn mô hình trên?",
          "Câu trả lời đó quyết định khung định giá và mức độ rủi ro dòng tiền bạn nên kỳ vọng."
        ]
      }
    ]
  }),
  "financial-risk": patch({
    "openingQuestion": "Rủi ro tài chính thường được chia thành những nhóm nào?",
    "openingOptions": [
      "Credit, liquidity, interest rate, market, concentration",
      "Chỉ market risk",
      "Chỉ currency risk",
      "Chỉ operational risk"
    ],
    "correctOption": 0,
    "explanation": "Một danh mục hay doanh nghiệp có thể gặp nhiều lớp rủi ro khác nhau, không chỉ một loại biến động giá. Nhiều nhà đầu tư mới chỉ nhìn market risk (giá lên xuống) mà bỏ qua các rủi ro âm thầm hơn như liquidity hay concentration risk, vốn có thể gây thiệt hại nặng hơn nhiều.",
    "diagram": [
      {
        "label": "Credit risk",
        "arrow": true
      },
      {
        "label": "Liquidity risk",
        "arrow": true
      },
      {
        "label": "Interest rate risk",
        "arrow": true
      },
      {
        "label": "Market / concentration risk",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Danh mục đầu tư / doanh nghiệp",
      "description": "Rủi ro tập trung hoặc đòn bẩy cao có thể khiến một cú sốc nhỏ biến thành vấn đề lớn về thanh khoản."
    },
    "quiz": [
      {
        "question": "Rủi ro nào xảy ra khi không bán được tài sản đủ nhanh để trả nghĩa vụ?",
        "options": [
          "Liquidity risk",
          "Market risk",
          "Tax risk",
          "Growth risk"
        ],
        "correct": 0,
        "explanation": "Thanh khoản thấp có thể làm doanh nghiệp hoặc nhà đầu tư rơi vào thế khó dù tài sản danh nghĩa vẫn còn."
      },
      {
        "question": "Một nhà đầu tư có danh mục 100% cổ phiếu công nghệ, đa dạng hóa qua 20 mã khác nhau. Loại rủi ro nào KHÔNG được giảm thiểu dù đã đa dạng hóa số lượng mã?",
        "options": [
          "Credit risk của từng công ty riêng lẻ",
          "Concentration risk theo ngành - vì tất cả cổ phiếu đều thuộc nhóm công nghệ, một cú sốc ảnh hưởng toàn ngành (như lãi suất tăng mạnh) vẫn tác động đến toàn bộ danh mục dù có 20 mã",
          "Không có rủi ro nào còn lại sau khi đa dạng hóa 20 mã",
          "Chỉ còn lại market risk chung của toàn thị trường"
        ],
        "correct": 1,
        "explanation": "Đa dạng hóa số lượng mã cổ phiếu không tự động loại bỏ rủi ro tập trung ngành - nếu toàn bộ 20 mã đều là công nghệ, chúng có xu hướng biến động cùng chiều khi có cú sốc ảnh hưởng cả ngành (như lãi suất tăng làm giảm định giá cổ phiếu tăng trưởng). Đa dạng hóa thực sự cần tài sản có mức tương quan (correlation) thấp với nhau, không chỉ là nhiều mã khác tên."
      },
      {
        "question": "Danh mục có 20 mã cổ phiếu nhưng đều thuộc ngành bất động sản. Vì sao đây vẫn là rủi ro tập trung dù có nhiều mã?",
        "options": [
          "Vì các mã cùng ngành có xu hướng biến động cùng chiều khi có cú sốc ảnh hưởng toàn ngành, nên đa dạng hóa thực chất rất thấp",
          "Vì 20 mã là số lượng quá ít để đa dạng hóa",
          "Vì cổ phiếu bất động sản luôn rủi ro hơn ngành khác",
          "Vì đa dạng hóa chỉ có ý nghĩa với trái phiếu"
        ],
        "correct": 0,
        "explanation": "Đa dạng hóa thực sự đo bằng mức độ tương quan giữa các tài sản, không phải số lượng. Nhiều mã cùng ngành có tương quan cao, nên rủi ro tập trung vẫn còn nguyên dù danh mục trông đa dạng."
      },
      {
        "question": "Vì sao rủi ro thanh khoản thường bị nhà đầu tư đánh giá thấp so với rủi ro thị trường?",
        "options": [
          "Vì nó gần như vô hình trong điều kiện thị trường bình thường, chỉ lộ ra khi cần bán gấp lúc thị trường căng thẳng",
          "Vì rủi ro thanh khoản không có thật",
          "Vì rủi ro thanh khoản chỉ ảnh hưởng đến trái phiếu",
          "Vì các cơ quan quản lý đã loại bỏ hoàn toàn rủi ro này"
        ],
        "correct": 0,
        "explanation": "Đây chính là lý do rủi ro thanh khoản nguy hiểm: nó không xuất hiện trên biểu đồ giá hằng ngày, mà chỉ hiện rõ đúng vào thời điểm bất lợi nhất khi nhà đầu tư cần thanh khoản nhất."
      }
    ],
    "keyTakeaways": [
      "Rủi ro có nhiều lớp, không chỉ giá",
      "Liquidity và concentration thường bị xem nhẹ",
      "Đa dạng hóa chỉ loại bỏ một phần rủi ro"
    ],
    "summary": {
      "keyIdea": "Rủi ro có nhiều lớp, không chỉ giá",
      "commonMistake": "Dễ bỏ qua: liquidity và concentration thường bị xem nhẹ",
      "action": "Đa dạng hóa chỉ loại bỏ một phần rủi ro"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khi nhắc đến 'rủi ro' trong đầu tư, nhiều người chỉ nghĩ ngay đến việc giá tài sản lên xuống - nhưng đó chỉ là một trong nhiều lớp rủi ro tài chính cần quan tâm."
      },
      {
        "type": "heading",
        "text": "Năm lớp rủi ro tài chính"
      },
      {
        "type": "paragraph",
        "text": "Ngoài market risk (biến động giá), một danh mục hay doanh nghiệp còn đối mặt credit risk (rủi ro đối tác không trả được nợ), liquidity risk (không bán được tài sản đủ nhanh khi cần tiền), interest rate risk (biến động lãi suất), và concentration risk (tập trung quá mức vào một loại tài sản/ngành). Đa dạng hóa số lượng mã cổ phiếu không tự động loại bỏ concentration risk theo ngành - nếu toàn bộ danh mục cùng thuộc một ngành, chúng vẫn biến động cùng chiều khi có cú sốc ảnh hưởng toàn ngành."
      },
      {
        "type": "list",
        "items": [
          "Rủi ro tài chính có nhiều lớp: credit, liquidity, interest rate, market, concentration - không chỉ giá",
          "Liquidity risk và concentration risk thường bị nhà đầu tư mới xem nhẹ hơn market risk",
          "Đa dạng hóa số lượng mã không tự động loại bỏ rủi ro tập trung ngành nếu các mã đó có tương quan cao"
        ]
      },
      {
        "type": "conceptTable",
        "title": "Năm lớp rủi ro tài chính",
        "concepts": [
          {
            "vi": "Rủi ro thị trường",
            "en": "Market risk",
            "def": "Giá tài sản biến động do các yếu tố kinh tế vĩ mô, tâm lý thị trường. Loại rủi ro dễ nhận biết nhất."
          },
          {
            "vi": "Rủi ro tín dụng",
            "en": "Credit risk",
            "def": "Đối tác hoặc bên phát hành trái phiếu không trả được nợ đúng hạn hoặc đầy đủ."
          },
          {
            "vi": "Rủi ro thanh khoản",
            "en": "Liquidity risk",
            "def": "Không bán được tài sản đủ nhanh với giá hợp lý khi cần tiền mặt gấp - thường bị đánh giá thấp cho đến khi thực sự cần bán."
          },
          {
            "vi": "Rủi ro lãi suất",
            "en": "Interest rate risk",
            "def": "Biến động lãi suất ảnh hưởng đến giá trị trái phiếu đang nắm giữ hoặc chi phí vay nợ."
          },
          {
            "vi": "Rủi ro tập trung",
            "en": "Concentration risk",
            "def": "Danh mục hoặc doanh thu phụ thuộc quá nhiều vào một tài sản, một ngành, hoặc một khách hàng."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Vì sao đa dạng hóa số lượng chưa đủ"
      },
      {
        "type": "paragraph",
        "text": "Một danh mục nắm giữ 20 mã cổ phiếu nghe có vẻ đã đa dạng hóa tốt, nhưng nếu cả 20 mã đó đều thuộc ngành bất động sản hoặc ngân hàng, chúng vẫn có xu hướng biến động cùng chiều khi có cú sốc ảnh hưởng toàn ngành - lãi suất tăng đột ngột, chính sách tín dụng thắt chặt. Đa dạng hóa thực sự cần nhìn vào mức độ tương quan giữa các tài sản, không chỉ đếm số lượng mã trong danh mục."
      },
      {
        "type": "callout",
        "label": "Rủi ro thanh khoản dễ bị bỏ qua nhất",
        "text": "Trong điều kiện thị trường bình thường, tài sản kém thanh khoản vẫn bán được, nên rủi ro này gần như vô hình. Nó chỉ lộ ra đúng lúc thị trường căng thẳng và ai cũng muốn bán cùng lúc - khi đó chênh lệch giữa giá muốn bán và giá thực bán được có thể rất lớn, đúng lúc nhà đầu tư cần tiền mặt nhất."
      },
      {
        "type": "closing",
        "lines": [
          "Rủi ro không chỉ là 'giá có thể giảm'.",
          "Hiểu đủ các lớp rủi ro giúp bạn chuẩn bị cho những cú sốc mà thị trường ít khi báo trước."
        ]
      }
    ]
  }),
  "hoc-tai-chinh-hanh-trinh": patch({
    "openingQuestion": "Điều gì làm nhiều người nản nhất khi học tài chính?",
    "openingOptions": [
      "Quá nhiều công thức và ít áp dụng",
      "Không có ví dụ thật",
      "Học quá nhanh",
      "Tất cả đúng"
    ],
    "correctOption": 3,
    "explanation": "Tài chính dễ nản vì phải vừa hiểu công thức vừa gắn với bối cảnh kinh doanh thật và quyết định thật. Khác với nhiều môn học chỉ cần ghi nhớ, tài chính đòi hỏi luyện tập áp dụng liên tục vào tình huống cụ thể mới thực sự thấm.",
    "diagram": [
      {
        "label": "Học lý thuyết",
        "arrow": true
      },
      {
        "label": "Gắn ví dụ thật",
        "arrow": true
      },
      {
        "label": "Áp dụng",
        "arrow": true
      },
      {
        "label": "Tiến bộ",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Người học tài chính",
      "description": "Người học bền thường là người biến kiến thức thành một checklist áp dụng lặp lại, thay vì cố học thuộc tất cả một lần."
    },
    "quiz": [
      {
        "question": "Cách học tài chính bền nhất thường là gì?",
        "options": [
          "Học công thức rồi áp dụng ngay vào ví dụ thật",
          "Chỉ đọc định nghĩa",
          "Chỉ xem video ngắn",
          "Đợi nhớ hết mới làm"
        ],
        "correct": 0,
        "explanation": "Tài chính hiểu sâu nhất khi đi cùng thực hành trên báo cáo, case thật và quyết định thật."
      },
      {
        "question": "Vì sao học một công thức tài chính (ví dụ NPV) mà không áp dụng vào ví dụ cụ thể thường khó nhớ lâu?",
        "options": [
          "Vì công thức tài chính luôn quá phức tạp để nhớ",
          "Vì kiến thức chỉ thực sự bám khi được gắn với một quyết định hoặc con số cụ thể - bộ não ghi nhớ ngữ cảnh và trải nghiệm áp dụng tốt hơn nhiều so với ghi nhớ một chuỗi ký hiệu trừu tượng",
          "Vì công thức tài chính thay đổi liên tục",
          "Không có sự khác biệt nào giữa học lý thuyết và học có ví dụ"
        ],
        "correct": 1,
        "explanation": "Đây là nguyên lý học tập chung, không riêng tài chính: kiến thức trừu tượng (công thức, định nghĩa) dễ quên nhanh, còn kiến thức gắn với một tình huống cụ thể mà người học tự tay tính toán hoặc áp dụng thường được ghi nhớ bền hơn nhiều - đó là lý do mỗi bài học ở đây đều có ví dụ thực tế và quiz tình huống."
      },
      {
        "question": "Vì sao gắn một khái niệm tài chính với một tình huống thật giúp ghi nhớ tốt hơn so với chỉ học định nghĩa?",
        "options": [
          "Vì bộ não ghi nhớ ngữ cảnh và trải nghiệm áp dụng tốt hơn nhiều so với một chuỗi công thức trừu tượng",
          "Vì tình huống thật luôn đơn giản hơn định nghĩa",
          "Vì định nghĩa toán học luôn sai",
          "Vì học qua tình huống không cần hiểu công thức"
        ],
        "correct": 0,
        "explanation": "Đây là nguyên lý học tập cơ bản: kiến thức gắn với bối cảnh cụ thể tạo ra nhiều điểm neo ghi nhớ hơn kiến thức trừu tượng đứng một mình."
      },
      {
        "question": "Cảm giác choáng ngợp khi học một khái niệm tài chính mới nên được hiểu như thế nào?",
        "options": [
          "Là tín hiệu bình thường cho thấy đang chạm tới ranh giới kiến thức, cần củng cố lại nền tảng trước đó",
          "Là dấu hiệu người học không có năng khiếu với tài chính",
          "Là dấu hiệu nên chuyển sang lĩnh vực khác",
          "Không có ý nghĩa gì, chỉ cần bỏ qua và học tiếp"
        ],
        "correct": 0,
        "explanation": "Vì tài chính có tính tích lũy cao, cảm giác này thường chỉ ra một lỗ hổng ở nền tảng trước đó cần được lấp lại, chứ không phản ánh khả năng học của người học."
      }
    ],
    "keyTakeaways": [
      "Tài chính nản vì nhiều lớp kiến thức",
      "Ví dụ thật giúp kiến thức bám lâu hơn",
      "Học bền là học để áp dụng"
    ],
    "summary": {
      "keyIdea": "Tài chính nản vì nhiều lớp kiến thức",
      "commonMistake": "Dễ bỏ qua: ví dụ thật giúp kiến thức bám lâu hơn",
      "action": "Học bền là học để áp dụng"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhiều người bắt đầu học tài chính với sự hào hứng, nhưng dễ nản chỉ sau vài tuần - không phải vì tài chính quá khó, mà vì cách học chưa đúng."
      },
      {
        "type": "heading",
        "text": "Vì sao kiến thức trừu tượng khó bám lâu"
      },
      {
        "type": "paragraph",
        "text": "Bộ não ghi nhớ ngữ cảnh và trải nghiệm áp dụng tốt hơn nhiều so với việc ghi nhớ một chuỗi công thức hay định nghĩa trừu tượng. Học một công thức tài chính (như NPV) mà không gắn nó với một quyết định hoặc con số cụ thể thường khó nhớ lâu - đây là lý do người học bền thường là người biến kiến thức thành checklist áp dụng lặp lại vào tình huống thật, thay vì cố học thuộc tất cả cùng lúc."
      },
      {
        "type": "list",
        "items": [
          "Tài chính dễ nản vì đòi hỏi vừa hiểu công thức, vừa gắn với bối cảnh kinh doanh thật",
          "Kiến thức gắn với tình huống cụ thể được ghi nhớ bền hơn nhiều so với công thức trừu tượng",
          "Học bền vững nhất là học đi kèm áp dụng ngay vào ví dụ thật, không chỉ đọc lý thuyết"
        ]
      },
      {
        "type": "heading",
        "text": "Ba nguyên tắc giúp kiến thức tài chính bám lại lâu hơn"
      },
      {
        "type": "list",
        "items": [
          "Gắn mỗi khái niệm với một con số hoặc tình huống thật, thay vì chỉ học định nghĩa - ví dụ tính NPV cho một quyết định mua sắm thật của chính bạn.",
          "Quay lại kiểm tra khái niệm cũ khi gặp trong bối cảnh mới - đọc một báo cáo tài chính thật và cố tìm ra khái niệm mình vừa học ở đó.",
          "Chấp nhận quên và học lại là bình thường - tài chính có nhiều khái niệm liên kết với nhau, nên việc phải quay lại vài lần trước khi thực sự thấm là chuyện tự nhiên, không phải dấu hiệu học kém."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Học theo kiểu ghi nhớ định nghĩa",
          "text": "Đọc định nghĩa NPV, học thuộc công thức, làm vài bài tập tính toán rồi chuyển sang chủ đề tiếp theo. Một tháng sau khó nhớ lại vì sao công thức đó lại có ý nghĩa."
        },
        "right": {
          "label": "Học theo kiểu áp dụng vào tình huống",
          "text": "Dùng NPV để so sánh hai lựa chọn thật - ví dụ mua trả góp hay trả thẳng một món hàng lớn. Kiến thức gắn với quyết định thật khó quên hơn nhiều vì có cảm xúc và bối cảnh đi kèm."
        }
      },
      {
        "type": "callout",
        "label": "Vì sao cảm giác 'nản' là dấu hiệu bình thường, không phải dấu hiệu bỏ cuộc",
        "text": "Tài chính là một lĩnh vực có tính tích lũy cao: khái niệm sau thường dựa trên khái niệm trước. Cảm giác choáng ngợp thường xuất hiện đúng lúc bạn chạm tới ranh giới giữa những gì đã vững và những gì chưa vững - đó là tín hiệu cần củng cố lại nền tảng, không phải tín hiệu bạn không hợp với môn học này."
      },
      {
        "type": "closing",
        "lines": [
          "Đừng cố nhớ hết mọi công thức trong một lần.",
          "Hãy áp dụng từng khái niệm vào một tình huống thật - đó là cách kiến thức thực sự bám lại."
        ]
      }
    ]
  }),
  "wealth-management": patch({
    "openingQuestion": "Wealth management thực sự quản lý cái gì trước tiên?",
    "openingOptions": [
      "Tài sản ròng và mục tiêu sống",
      "Chỉ là chọn cổ phiếu",
      "Chỉ là giữ tiền mặt",
      "Chỉ là mua bảo hiểm"
    ],
    "correctOption": 0,
    "explanation": "Wealth management bắt đầu từ net worth, mục tiêu, dòng tiền và khẩu vị rủi ro - đầu tư chỉ là một phần của bức tranh. Một kế hoạch tốt còn cần tính đến thanh khoản cho nhu cầu ngắn hạn và bảo vệ trước rủi ro bất ngờ, không chỉ tối đa hóa lợi nhuận.",
    "diagram": [
      {
        "label": "Net worth",
        "arrow": true
      },
      {
        "label": "Asset allocation",
        "arrow": true
      },
      {
        "label": "Goal planning",
        "arrow": true
      },
      {
        "label": "Tái cân bằng",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Cá nhân / gia đình",
      "description": "Một kế hoạch wealth management tốt không chỉ tối đa hóa lợi nhuận mà còn đảm bảo tiền cho mục tiêu học hành, nhà cửa, hưu trí và bảo vệ rủi ro."
    },
    "quiz": [
      {
        "question": "Tài sản nào thường nằm ở nhóm thanh khoản cao nhất?",
        "options": [
          "Tiền mặt và tiền gửi",
          "Bất động sản",
          "Cổ phiếu tăng trưởng",
          "Đồ sưu tầm"
        ],
        "correct": 0,
        "explanation": "Thanh khoản là yếu tố đầu tiên khi xây dựng bảng cân đối tài chính cá nhân."
      },
      {
        "question": "Tái cân bằng danh mục có ý nghĩa gì?",
        "options": [
          "Giữ đúng mức rủi ro đã chọn",
          "Chỉ để mua thấp bán cao ngẫu nhiên",
          "Làm danh mục xấu đi",
          "Không cần thiết nếu lãi"
        ],
        "correct": 0,
        "explanation": "Nếu không tái cân bằng, danh mục dễ lệch khỏi khẩu vị rủi ro ban đầu."
      }
    ],
    "keyTakeaways": [
      "Wealth management nhìn net worth trước, rồi mới đến đầu tư",
      "Asset allocation quan trọng hơn chọn một mã thắng",
      "Tái cân bằng giúp giữ kỷ luật rủi ro"
    ],
    "summary": {
      "keyIdea": "Wealth management nhìn net worth trước, rồi mới đến đầu tư",
      "commonMistake": "Dễ bỏ qua: asset allocation quan trọng hơn chọn một mã thắng",
      "action": "Tái cân bằng giúp giữ kỷ luật rủi ro"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Wealth management không phải là 'có nhiều tiền thì mới cần'. Nó là cách bạn tổ chức tài sản, rủi ro và mục tiêu để tiền phục vụ đời sống."
      },
      {
        "type": "heading",
        "text": "Ba lớp cần quản"
      },
      {
        "type": "conceptTable",
        "title": "Khung quản lý tài sản",
        "subtitle": "Đọc từ trái sang phải như một quy trình",
        "concepts": [
          {
            "vi": "Tài sản ròng",
            "en": "Net worth",
            "def": "Tổng tài sản trừ tổng nợ - điểm xuất phát của mọi kế hoạch."
          },
          {
            "vi": "Phân bổ tài sản",
            "en": "Asset allocation",
            "def": "Chia tiền vào tiền mặt, trái phiếu, cổ phiếu, BĐS... theo mục tiêu."
          },
          {
            "vi": "Tái cân bằng",
            "en": "Rebalancing",
            "def": "Giữ danh mục quay về tỷ trọng mục tiêu khi thị trường biến động."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Sai lầm thường gặp",
          "text": "Nhìn một kênh lợi nhuận cao rồi dồn tiền vào đó mà không xét mục tiêu, thanh khoản hay khung thời gian."
        },
        "right": {
          "label": "Cách làm đúng",
          "text": "Chia tài sản theo mục tiêu: tiền gần hạn, tiền bảo vệ, tiền tăng trưởng và tiền dài hạn."
        }
      },
      {
        "type": "paragraph",
        "text": "Ví dụ cụ thể: một gia đình có net worth 5 tỷ, mục tiêu gồm quỹ khẩn cấp (thanh khoản cao, 6 tháng chi tiêu), quỹ mua nhà trong 3 năm tới (ưu tiên an toàn), và quỹ hưu trí sau 25 năm nữa (có thể chấp nhận rủi ro cao hơn để tăng trưởng). Wealth management đúng nghĩa là phân bổ 5 tỷ đó vào ba 'ngăn' khác nhau theo đúng khung thời gian và mục tiêu của từng khoản, thay vì gộp chung và đầu tư theo một chiến lược duy nhất cho tất cả."
      },
      {
        "type": "closing",
        "lines": [
          "Quản lý tài sản tốt là để cuộc sống ít bất ngờ hơn.",
          "Không phải để chạy theo một con số lợi nhuận đẹp nhất."
        ]
      }
    ],
    "application": {
      "title": "Vẽ net worth của bạn",
      "message": "Liệt kê tài sản, nợ, tiền mặt, khoản đầu tư và mục tiêu sắp tới của bạn vào một bảng đơn giản để biết đâu là phần cần bảo vệ trước tiên.",
      "secondary": "Thường thì thanh khoản và đệm an toàn quan trọng hơn lợi nhuận tối đa."
    }
  }),
  "modern-portfolio-theory": patch({
    "openingQuestion": "MPT muốn trả lời câu hỏi nào?",
    "openingOptions": [
      "Một tài sản tốt là đủ",
      "Danh mục tối ưu cho mỗi mức rủi ro",
      "Chỉ nên mua tài sản an toàn tuyệt đối",
      "Tăng số lượng mã càng nhiều càng tốt"
    ],
    "correctOption": 1,
    "explanation": "Modern Portfolio Theory cho rằng danh mục tối ưu phụ thuộc vào return kỳ vọng, volatility và correlation giữa các tài sản - kết hợp đúng các tài sản ít tương quan có thể giảm rủi ro tổng thể mà không phải hy sinh tương ứng lợi nhuận kỳ vọng.",
    "diagram": [
      {
        "label": "Expected return",
        "arrow": true
      },
      {
        "label": "Volatility",
        "arrow": true
      },
      {
        "label": "Correlation",
        "arrow": true
      },
      {
        "label": "Efficient frontier",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Danh mục đầu tư cá nhân",
      "description": "Một người nắm 100% cổ phiếu công nghệ sẽ rủi ro khác hẳn người chia đều sang trái phiếu, tiền mặt và cổ phiếu phòng thủ."
    },
    "quiz": [
      {
        "question": "Lợi ích cốt lõi của đa dạng hóa theo MPT là gì?",
        "options": [
          "Giảm rủi ro danh mục mà không nhất thiết hy sinh tương ứng lợi nhuận kỳ vọng",
          "Tăng rủi ro để kiếm thêm phí",
          "Xóa sạch mọi rủi ro",
          "Chỉ phù hợp với quỹ lớn"
        ],
        "correct": 0,
        "explanation": "Kết hợp tài sản ít tương quan giúp giảm biến động tổng thể của danh mục."
      },
      {
        "question": "Nếu hai tài sản có correlation thấp, điều gì xảy ra với danh mục?",
        "options": [
          "Biến động danh mục có thể thấp hơn từng tài sản riêng lẻ",
          "Chắc chắn lỗ",
          "Không thay đổi",
          "Bắt buộc phải vay thêm"
        ],
        "correct": 0,
        "explanation": "Correlation thấp là nơi MPT tìm thấy lợi ích lớn nhất của diversification."
      }
    ],
    "keyTakeaways": [
      "MPT dùng return, risk và correlation để xây danh mục",
      "Đa dạng hóa đúng cách có thể giảm rủi ro tổng thể",
      "Efficient frontier là danh mục tốt nhất cho từng mức rủi ro"
    ],
    "summary": {
      "keyIdea": "MPT dùng return, risk và correlation để xây danh mục",
      "commonMistake": "Dễ bỏ qua: đa dạng hóa đúng cách có thể giảm rủi ro tổng thể",
      "action": "Efficient frontier là danh mục tốt nhất cho từng mức rủi ro"
    },
    "sections": [
      {
        "type": "lead",
        "text": "MPT không dạy bạn chọn 'mã ngon nhất'. Nó dạy bạn ghép các tài sản sao cho cả danh mục trở nên tốt hơn."
      },
      {
        "type": "heading",
        "text": "Mini simulation"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Danh mục A",
          "text": "100% cổ phiếu tăng trưởng: return cao nhưng biến động cũng cao, dễ bị một chu kỳ xấu đánh mạnh."
        },
        "right": {
          "label": "Danh mục B",
          "text": "60% cổ phiếu + 30% trái phiếu + 10% tiền mặt: return thấp hơn chút nhưng đường đi mượt hơn nhiều."
        }
      },
      {
        "type": "paragraph",
        "text": "Điểm mấu chốt của MPT không nằm ở việc chọn tài sản 'tốt nhất' riêng lẻ, mà ở mức độ tương quan (correlation) giữa chúng. Nếu cổ phiếu và trái phiếu trong Danh mục B có correlation thấp (chúng không luôn tăng/giảm cùng lúc), việc kết hợp hai tài sản này có thể giảm biến động tổng thể của danh mục nhiều hơn mức trung bình cộng đơn giản của rủi ro từng tài sản - đây chính là 'bữa trưa miễn phí' hiếm hoi trong tài chính mà Harry Markowitz đã chứng minh bằng toán học."
      },
      {
        "type": "conceptTable",
        "title": "Ba biến số trong MPT",
        "concepts": [
          {
            "vi": "Lợi nhuận kỳ vọng",
            "en": "Expected return",
            "def": "Mức lợi nhuận trung bình bạn hy vọng nhận được."
          },
          {
            "vi": "Độ biến động",
            "en": "Volatility",
            "def": "Mức dao động quanh kỳ vọng - càng cao càng khó chịu."
          },
          {
            "vi": "Tương quan",
            "en": "Correlation",
            "def": "Đo tài sản đi cùng chiều hay ngược chiều với nhau."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Danh mục tốt không phải danh mục liều nhất.",
          "Là danh mục phù hợp nhất với mục tiêu và tâm lý của bạn."
        ]
      }
    ],
    "application": {
      "title": "Tự mô phỏng danh mục",
      "message": "Lấy 3 tài sản bạn đang nghĩ tới và tự hỏi: nếu một tài sản giảm, hai tài sản kia có giúp bạn đỡ sốc không?",
      "secondary": "Đây là cách đơn giản nhất để cảm nhận hiệu ứng tương quan trong danh mục."
    }
  }),
  "finance-as-math": patch({
    "openingQuestion": "Tài chính quy về công thức toán học ở chỗ nào rõ nhất?",
    "openingOptions": [
      "DCF, WACC, terminal value và các bội số định giá",
      "Chỉ có kế toán",
      "Chỉ có thuế",
      "Chỉ có lãi suất"
    ],
    "correctOption": 0,
    "explanation": "Nhiều bài toán tài chính chỉ là chiết khấu dòng tiền, so sánh bội số và mô hình hóa rủi ro theo công thức rõ ràng. Điều khó nhất không phải là công thức, mà là chọn giả định đầu vào hợp lý - vì kết quả cuối cùng nhạy cảm rất mạnh với những giả định đó.",
    "diagram": [
      {
        "label": "Cash flows",
        "arrow": true
      },
      {
        "label": "Discount rate",
        "arrow": true
      },
      {
        "label": "Terminal value",
        "arrow": true
      },
      {
        "label": "Valuation",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Valuation model",
      "description": "Khi phân tích một doanh nghiệp, phần lớn công việc chỉ là đưa giả định hợp lý vào các công thức quen thuộc rồi kiểm tra độ nhạy."
    },
    "quiz": [
      {
        "question": "DCF chủ yếu dựa trên nguyên lý nào?",
        "options": [
          "Tiền tương lai phải chiết khấu về hiện tại",
          "Giá cổ phiếu luôn đúng",
          "Doanh nghiệp nào cũng giống nhau",
          "Lợi nhuận kế toán là đủ"
        ],
        "correct": 0,
        "explanation": "DCF quy về giá trị hiện tại của dòng tiền tương lai."
      },
      {
        "question": "Nếu công thức DCF là chính xác về mặt toán học, vì sao hai nhà phân tích dùng cùng một mô hình DCF cho cùng một công ty vẫn có thể ra hai kết quả định giá rất khác nhau?",
        "options": [
          "Vì một trong hai người tính sai công thức",
          "Vì công thức đúng nhưng giả định đầu vào (tốc độ tăng trưởng, discount rate, terminal value) khác nhau - và kết quả DCF rất nhạy cảm với những giả định này",
          "Vì DCF không phải công thức toán học chính xác",
          "Vì hai người dùng phần mềm khác nhau"
        ],
        "correct": 1,
        "explanation": "DCF là một công thức toán chính xác, nhưng đầu vào của nó (growth rate, WACC, terminal growth) đều là giả định chủ quan về tương lai - đây là lý do 'tài chính là toán học' chỉ đúng một nửa: phần công thức là toán, nhưng phần chọn giả định là phán đoán kinh doanh, không phải toán học thuần túy."
      },
      {
        "question": "Hai nhà phân tích dùng cùng công thức DCF cho cùng một công ty nhưng ra hai kết quả chênh nhau 40%. Nguyên nhân nằm ở đâu?",
        "options": [
          "Ở giả định đầu vào khác nhau về tốc độ tăng trưởng và tỷ suất chiết khấu, chứ không phải ở công thức",
          "Chắc chắn một trong hai người đã tính sai phép cộng trừ",
          "DCF không phải công thức toán học chính xác",
          "Kết quả DCF luôn giống nhau nếu tính đúng"
        ],
        "correct": 0,
        "explanation": "Bản thân công thức chiết khấu là toán học chính xác. Sự khác biệt luôn nằm ở phán đoán kinh doanh đằng sau các con số đầu vào, đây chính là điểm 'tài chính là toán học' chỉ đúng một nửa."
      },
      {
        "question": "Kỹ năng nào quan trọng hơn khả năng tính toán nhanh khi làm việc với các mô hình tài chính?",
        "options": [
          "Khả năng đặt câu hỏi đúng về cơ sở và độ nhạy của các giả định đầu vào",
          "Khả năng nhớ thuộc lòng nhiều công thức",
          "Tốc độ gõ máy tính",
          "Khả năng vẽ biểu đồ đẹp"
        ],
        "correct": 0,
        "explanation": "Vì công thức đã có sẵn và máy tính xử lý được ngay, giá trị thực sự của một nhà phân tích nằm ở việc chọn và kiểm chứng giả định - phần việc máy móc không tự làm thay được."
      }
    ],
    "keyTakeaways": [
      "Tài chính nhiều khi là toán ứng dụng",
      "DCF và multiples là hai khung quan trọng",
      "Giả định đầu vào quyết định kết quả định giá"
    ],
    "summary": {
      "keyIdea": "Tài chính nhiều khi là toán ứng dụng",
      "commonMistake": "Dễ bỏ qua: dCF và multiples là hai khung quan trọng",
      "action": "Giả định đầu vào quyết định kết quả định giá"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhiều bài toán tài chính - từ DCF đến WACC - về bản chất là các công thức toán học rõ ràng. Nhưng điều khó nhất trong tài chính không nằm ở phép tính."
      },
      {
        "type": "heading",
        "text": "Công thức đúng, nhưng giả định mới là điều quyết định"
      },
      {
        "type": "paragraph",
        "text": "DCF là một công thức toán chính xác - chiết khấu dòng tiền tương lai về hiện tại. Nhưng hai nhà phân tích dùng cùng một mô hình DCF cho cùng một công ty vẫn có thể ra hai kết quả định giá rất khác nhau, vì giả định đầu vào (tốc độ tăng trưởng, discount rate, terminal value) là những phán đoán chủ quan về tương lai, không phải con số cố định. Đây là lý do 'tài chính là toán học' chỉ đúng một nửa: phần công thức là toán, nhưng phần chọn giả định là phán đoán kinh doanh."
      },
      {
        "type": "list",
        "items": [
          "Nhiều bài toán tài chính (DCF, WACC, multiples) dựa trên công thức toán rõ ràng",
          "Kết quả cuối cùng nhạy cảm rất mạnh với giả định đầu vào, không phải với bản thân công thức",
          "Kỹ năng quan trọng nhất không phải là tính toán, mà là chọn giả định hợp lý và kiểm tra độ nhạy"
        ]
      },
      {
        "type": "formula",
        "title": "Vì sao cùng một công thức DCF cho hai kết quả rất khác nhau",
        "equation": "Giá trị = Σ (Dòng tiền năm t ÷ (1+r)^t)",
        "example": {
          "title": "Hai nhà phân tích, cùng công ty",
          "calculation": "Phân tích A: tăng trưởng 8%, r = 10% · Phân tích B: tăng trưởng 4%, r = 12%",
          "result": "Kết quả định giá chênh nhau có thể tới 40-50%",
          "explanation": "Công thức chiết khấu dòng tiền hoàn toàn giống nhau ở cả hai bên. Khác biệt nằm hoàn toàn ở hai con số giả định: tốc độ tăng trưởng và tỷ suất chiết khấu - đây là những phán đoán về tương lai, không phải phép tính có thể kiểm chứng ngay như một bài toán cộng trừ."
        }
      },
      {
        "type": "heading",
        "text": "Ba loại bài toán tài chính và mức độ chắc chắn khác nhau"
      },
      {
        "type": "list",
        "items": [
          "Tính toán thuần túy: lãi kép, giá trị tương lai của một khoản tiền đã biết lãi suất cố định - đây thực sự chỉ là toán học, kết quả không tranh cãi.",
          "Công thức với giả định đầu vào: WACC, DCF, NPV - công thức chính xác nhưng đầu vào là dự báo, nên kết quả mang tính chủ quan dù trông có vẻ chính xác đến từng đồng.",
          "Phán đoán định tính khó lượng hóa: chất lượng ban lãnh đạo, lợi thế cạnh tranh bền vững - những yếu tố này ảnh hưởng đến giả định ở lớp thứ hai nhưng bản thân chúng không có công thức."
        ]
      },
      {
        "type": "callout",
        "label": "Kỹ năng thực sự cần rèn luyện",
        "text": "Không phải là tính nhanh và chính xác - máy tính đã làm việc đó tốt hơn con người từ lâu. Kỹ năng thực sự là biết đặt câu hỏi đúng về giả định: giả định này dựa trên cơ sở nào, nó nhạy cảm ra sao với kết quả cuối, và nếu giả định sai thì sai theo hướng nào là nguy hiểm nhất."
      },
      {
        "type": "closing",
        "lines": [
          "Công thức tài chính không phải là điểm khó nhất.",
          "Chọn đúng giả định đầu vào - và biết kết quả nhạy cảm thế nào với chúng - mới là kỹ năng thực sự."
        ]
      }
    ]
  }),
  "samsung-ai-finance": patch({
    "openingQuestion": "AI capex trong một công ty chip thường tác động gì mạnh nhất?",
    "openingOptions": [
      "Revenue, margin và chu kỳ đầu tư",
      "Chỉ marketing",
      "Chỉ thuế",
      "Chỉ cổ tức"
    ],
    "correctOption": 0,
    "explanation": "AI capex có thể tăng doanh thu tương lai nhưng cũng kéo theo chu kỳ đầu tư, biên lợi nhuận và nhu cầu vốn lưu động. Ngành bán dẫn/memory vốn đã có tính chu kỳ mạnh, nên làn sóng đầu tư AI càng làm biến động cung-cầu và giá bán khó dự đoán hơn.",
    "diagram": [
      {
        "label": "AI demand",
        "arrow": true
      },
      {
        "label": "Capex",
        "arrow": true
      },
      {
        "label": "Memory cycle",
        "arrow": true
      },
      {
        "label": "Pricing power",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Samsung",
      "description": "Công ty bán chip/thiết bị thường bị định giá theo chu kỳ memory, pricing power và mức capex để bắt nhịp AI."
    },
    "quiz": [
      {
        "question": "Capex lớn chưa chắc xấu khi nào?",
        "options": [
          "Khi nó tạo năng lực sản xuất và doanh thu tương lai",
          "Khi báo chí khen",
          "Khi thị trường giảm",
          "Khi nợ tăng"
        ],
        "correct": 0,
        "explanation": "Capex là xấu hay tốt phụ thuộc vào tỷ suất sinh lời tương lai mà nó mở ra."
      },
      {
        "question": "Một công ty chip tăng capex gấp đôi để đón làn sóng AI, nhưng biên lợi nhuận quý gần nhất lại giảm. Nhà đầu tư nên phản ứng thế nào?",
        "options": [
          "Bán ngay vì biên lợi nhuận giảm luôn là tín hiệu xấu",
          "Xem xét đây có phải giai đoạn đầu tư trước khi công suất mới đi vào hoạt động hay không - biên lợi nhuận có thể tạm thời chịu áp lực từ chi phí khấu hao mới trước khi doanh thu từ công suất tăng thêm phản ánh đầy đủ",
          "Mua thêm ngay vì capex tăng luôn là tín hiệu tốt",
          "Bỏ qua biên lợi nhuận vì không liên quan đến capex"
        ],
        "correct": 1,
        "explanation": "Capex lớn thường tạo áp lực ngắn hạn lên biên lợi nhuận (khấu hao tăng ngay, trong khi doanh thu từ công suất mới cần thời gian để hiện thực hóa) - đây là độ trễ bình thường của chu kỳ đầu tư, không tự động là tín hiệu xấu, nhưng cần theo dõi liệu doanh thu có tăng tương xứng trong các quý tiếp theo hay không."
      },
      {
        "question": "Vì sao biên lợi nhuận có thể giảm ngay sau khi một doanh nghiệp bán dẫn tăng mạnh capex, dù đây không hẳn là tín hiệu xấu?",
        "options": [
          "Vì chi phí khấu hao tăng ngay khi tài sản mới đi vào vận hành, trong khi doanh thu từ công suất đó cần thời gian để lấp đầy",
          "Vì tăng capex luôn đi kèm gian lận kế toán",
          "Vì doanh thu luôn giảm ngay khi capex tăng",
          "Vì thuế suất tăng theo mức capex"
        ],
        "correct": 0,
        "explanation": "Đây là độ trễ tự nhiên giữa đầu tư và doanh thu. Cần theo dõi các quý tiếp theo để biết liệu doanh thu có tăng tương xứng hay không, trước khi kết luận khoản đầu tư đó tốt hay xấu."
      },
      {
        "question": "Rủi ro đặc thù nào khiến làn sóng đầu tư AI trong ngành bán dẫn/memory càng khó dự đoán hơn?",
        "options": [
          "Khi nhiều doanh nghiệp cùng đổ vốn đón đầu một xu hướng, rủi ro dư cung trong tương lai tăng lên nếu nhu cầu thực tế không lớn như dự báo",
          "Vì ngành này không có tính chu kỳ",
          "Vì AI không sử dụng chip bán dẫn",
          "Vì giá bán chip luôn cố định theo hợp đồng dài hạn"
        ],
        "correct": 0,
        "explanation": "Bán dẫn/memory vốn đã có tính chu kỳ mạnh; đầu tư đồng loạt đón đầu một xu hướng làm tăng thêm rủi ro dư cung nếu nhu cầu thực tế đến chậm hơn hoặc nhỏ hơn kỳ vọng của cả ngành."
      }
    ],
    "keyTakeaways": [
      "AI làm thay đổi chu kỳ capex và pricing power",
      "Đọc công ty chip phải đọc cả chu kỳ lẫn demand",
      "Capex chỉ đáng giá nếu tạo cash future đủ tốt"
    ],
    "summary": {
      "keyIdea": "AI làm thay đổi chu kỳ capex và pricing power",
      "commonMistake": "Dễ bỏ qua: đọc công ty chip phải đọc cả chu kỳ lẫn demand",
      "action": "Capex chỉ đáng giá nếu tạo cash future đủ tốt"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Làn sóng đầu tư AI đang thay đổi cách các công ty bán dẫn/memory chi tiêu vốn - và tác động của nó lên tài chính doanh nghiệp phức tạp hơn nhiều so với 'capex tăng là tốt'."
      },
      {
        "type": "heading",
        "text": "AI capex và độ trễ giữa đầu tư và doanh thu"
      },
      {
        "type": "paragraph",
        "text": "Capex lớn để đón làn sóng AI có thể tạo áp lực ngắn hạn lên biên lợi nhuận, vì chi phí khấu hao tăng ngay lập tức trong khi doanh thu từ công suất sản xuất mới cần thời gian để hiện thực hóa đầy đủ. Đây là độ trễ bình thường của chu kỳ đầu tư, không tự động là tín hiệu xấu - nhưng cần theo dõi liệu doanh thu có tăng tương xứng trong các quý tiếp theo hay không."
      },
      {
        "type": "list",
        "items": [
          "AI capex tác động đồng thời đến revenue, biên lợi nhuận và chu kỳ đầu tư của công ty chip",
          "Capex lớn không tự động xấu nếu nó tạo năng lực sản xuất và doanh thu tương lai thực sự",
          "Biên lợi nhuận giảm ngay sau khi tăng capex mạnh cần được theo dõi tiếp, không kết luận vội"
        ]
      },
      {
        "type": "heading",
        "text": "Vì sao capex tăng không tự động là tín hiệu tốt hay xấu"
      },
      {
        "type": "paragraph",
        "text": "Chi phí khấu hao từ khoản đầu tư mới bắt đầu ăn vào biên lợi nhuận ngay khi tài sản đi vào vận hành, trong khi doanh thu từ công suất mới cần thời gian để lấp đầy - có thể vài quý đến vài năm tùy chu kỳ đặt hàng của khách hàng. Đây là độ trễ tự nhiên của chu kỳ đầu tư công nghiệp nặng, không phải bằng chứng ngay lập tức về việc khoản đầu tư đó tốt hay tệ."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Capex tạo giá trị",
          "text": "Công suất mới lấp đầy theo đúng kế hoạch, doanh thu các quý sau tăng tương xứng với mức tăng khấu hao, và ROIC của khoản đầu tư mới vượt chi phí vốn sau khi đã ổn định."
        },
        "right": {
          "label": "Capex phá hủy giá trị",
          "text": "Đầu tư đón đầu chu kỳ nhưng nhu cầu không đến như kỳ vọng - hoặc đến chậm hơn nhiều so với thời gian khấu hao - khiến biên lợi nhuận bị bào mòn kéo dài mà không có doanh thu bù đắp."
        }
      },
      {
        "type": "callout",
        "label": "Đặc thù của ngành bán dẫn/memory khiến vấn đề càng phức tạp",
        "text": "Đây vốn đã là ngành có tính chu kỳ mạnh về cung cầu và giá bán, ngay cả khi không có làn sóng đầu tư mới. Khi nhiều doanh nghiệp cùng đổ vốn đón đầu một xu hướng như AI, rủi ro dư cung trong tương lai tăng lên đáng kể nếu nhu cầu thực tế không lớn như dự báo - lịch sử ngành này đã có nhiều chu kỳ đầu tư quá mức rồi giá sập theo sau."
      },
      {
        "type": "closing",
        "lines": [
          "Capex tăng mạnh không phải lúc nào cũng là tín hiệu tốt hay xấu ngay lập tức.",
          "Cần thời gian để biết liệu khoản đầu tư đó có thực sự tạo ra doanh thu tương xứng hay không."
        ]
      }
    ]
  }),
  "fcf-deep-dive": patch({
    "openingQuestion": "FCF thường được định nghĩa ngắn gọn nhất là gì?",
    "openingOptions": [
      "OCF − CapEx",
      "Net income",
      "Revenue − tax",
      "EBITDA"
    ],
    "correctOption": 0,
    "explanation": "Free Cash Flow là tiền còn lại sau khi doanh nghiệp đã tài trợ cho hoạt động và đầu tư duy trì/mở rộng cần thiết. Đây là số tiền doanh nghiệp thực sự tự do sử dụng - trả cổ tức, mua lại cổ phiếu, trả nợ hoặc tích lũy - mà không ảnh hưởng đến hoạt động kinh doanh cốt lõi.",
    "diagram": [
      {
        "label": "Operating cash flow",
        "arrow": true
      },
      {
        "label": "− CapEx",
        "arrow": true
      },
      {
        "label": "Free cash flow",
        "arrow": true
      },
      {
        "label": "Value creation",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Doanh nghiệp tăng trưởng",
      "description": "Một công ty có thể báo lãi đều, nhưng nếu phải liên tục đổ tiền vào capex và vốn lưu động, FCF vẫn có thể yếu."
    },
    "quiz": [
      {
        "question": "FCF dương bền vững thường cho thấy điều gì?",
        "options": [
          "Doanh nghiệp có khả năng tự tài trợ tốt hơn",
          "Chỉ là may mắn",
          "Không quan trọng",
          "Chắc chắn cổ phiếu sẽ tăng"
        ],
        "correct": 0,
        "explanation": "FCF dương nghĩa là business tạo tiền thật sau đầu tư cần thiết."
      },
      {
        "question": "Hai công ty cùng ngành có EBITDA bằng nhau, nhưng công ty A có FCF cao hơn hẳn công ty B. Nguyên nhân hợp lý nhất là gì?",
        "options": [
          "Công ty A có doanh thu cao hơn",
          "Công ty A có thể cần CapEx hoặc vốn lưu động ít hơn để duy trì/mở rộng hoạt động so với công ty B, dù cả hai tạo ra EBITDA giống nhau",
          "EBITDA và FCF luôn bằng nhau nên đây là điều không thể xảy ra",
          "Công ty A chắc chắn có nợ thấp hơn"
        ],
        "correct": 1,
        "explanation": "EBITDA không trừ CapEx hay thay đổi vốn lưu động, trong khi FCF thì có. Hai công ty EBITDA bằng nhau nhưng một bên cần đổ nhiều vốn hơn để duy trì tăng trưởng (ví dụ ngành thâm dụng tài sản) sẽ có FCF thấp hơn nhiều - đây là lý do FCF thường được xem là thước đo giá trị kinh tế thực tế hơn EBITDA."
      },
      {
        "question": "Hai doanh nghiệp cùng EBITDA 500 tỷ, cùng OCF 400 tỷ, nhưng CapEx lần lượt là 80 tỷ và 250 tỷ. FCF của hai bên chênh nhau bao nhiêu?",
        "options": [
          "320 tỷ so với 150 tỷ, chênh 170 tỷ",
          "Không chênh lệch vì EBITDA bằng nhau",
          "500 tỷ so với 500 tỷ",
          "80 tỷ so với 250 tỷ"
        ],
        "correct": 0,
        "explanation": "FCF = OCF − CapEx: 400 − 80 = 320 và 400 − 250 = 150. Cùng EBITDA nhưng mức độ thâm dụng vốn khác nhau khiến tiền thực sự tự do chênh lệch lớn."
      },
      {
        "question": "Vì sao dùng riêng EBITDA để so sánh hai doanh nghiệp có thể gây hiểu lầm?",
        "options": [
          "Vì EBITDA không trừ CapEx và thay đổi vốn lưu động, nên bỏ qua khác biệt về nhu cầu tái đầu tư giữa các doanh nghiệp",
          "Vì EBITDA luôn thấp hơn lợi nhuận thực tế",
          "Vì EBITDA không được kiểm toán",
          "Vì EBITDA chỉ áp dụng được cho doanh nghiệp nhỏ"
        ],
        "correct": 0,
        "explanation": "Đây chính là lý do FCF thường được xem là thước đo trung thực hơn về giá trị kinh tế thực - nó tính đến cả gánh nặng đầu tư cần thiết mà EBITDA bỏ qua."
      }
    ],
    "keyTakeaways": [
      "FCF là tiền còn lại sau đầu tư cần thiết",
      "OCF và CapEx đều phải đọc",
      "FCF mới gần nhất với giá trị kinh tế tạo ra"
    ],
    "summary": {
      "keyIdea": "FCF là tiền còn lại sau đầu tư cần thiết",
      "commonMistake": "Dễ bỏ qua: oCF và CapEx đều phải đọc",
      "action": "FCF mới gần nhất với giá trị kinh tế tạo ra"
    },
    "sections": [
      {
        "type": "lead",
        "text": "EBITDA là chỉ số quen thuộc, nhưng hai công ty cùng ngành có EBITDA giống hệt nhau vẫn có thể có sức khỏe tài chính rất khác nhau - Free Cash Flow là nơi sự khác biệt đó lộ ra."
      },
      {
        "type": "heading",
        "text": "FCF = OCF − CapEx"
      },
      {
        "type": "paragraph",
        "text": "Free Cash Flow là tiền còn lại sau khi doanh nghiệp đã tài trợ cho hoạt động và đầu tư duy trì/mở rộng cần thiết - số tiền doanh nghiệp thực sự tự do sử dụng để trả cổ tức, mua lại cổ phiếu, trả nợ, hoặc tích lũy. EBITDA không trừ CapEx hay thay đổi vốn lưu động, trong khi FCF thì có - hai công ty EBITDA bằng nhau nhưng một bên cần đổ nhiều vốn hơn để duy trì tăng trưởng (ngành thâm dụng tài sản) sẽ có FCF thấp hơn nhiều."
      },
      {
        "type": "list",
        "items": [
          "FCF là tiền còn lại sau khi trừ CapEx cần thiết khỏi dòng tiền hoạt động",
          "EBITDA bỏ qua CapEx và vốn lưu động, nên có thể đánh lừa nếu dùng một mình",
          "FCF dương bền vững cho thấy doanh nghiệp có khả năng tự tài trợ mà không cần vay thêm"
        ]
      },
      {
        "type": "formula",
        "title": "Từ EBITDA tới dòng tiền tự do",
        "equation": "FCF = Dòng tiền hoạt động kinh doanh − Chi đầu tư tài sản cố định (CapEx)",
        "example": {
          "title": "Hai doanh nghiệp cùng EBITDA",
          "calculation": "Doanh nghiệp A: OCF 400, CapEx 80 · Doanh nghiệp B: OCF 400, CapEx 250",
          "result": "FCF 320 so với FCF 150",
          "explanation": "Cùng tạo ra dòng tiền hoạt động như nhau, nhưng doanh nghiệp B cần tái đầu tư gấp ba lần để duy trì và tăng trưởng - đặc trưng của ngành thâm dụng tài sản như sản xuất nặng hay viễn thông. Số tiền thực sự tự do để trả cổ tức, mua lại cổ phiếu hay trả nợ của B thấp hơn nhiều dù EBITDA hai bên bằng nhau."
        }
      },
      {
        "type": "heading",
        "text": "Vì sao EBITDA một mình có thể gây hiểu lầm"
      },
      {
        "type": "list",
        "items": [
          "EBITDA không trừ CapEx, nên hai doanh nghiệp cùng EBITDA nhưng khác mức độ thâm dụng vốn sẽ có sức khỏe tài chính rất khác nhau.",
          "EBITDA không phản ánh thay đổi vốn lưu động - doanh nghiệp có phải thu và tồn kho tăng nhanh có thể có EBITDA đẹp nhưng tiền mặt thực tế không tăng tương ứng.",
          "EBITDA thường được dùng để tính bội số định giá vì dễ so sánh giữa các doanh nghiệp có cấu trúc vốn khác nhau, nhưng chính vì vậy nó dễ bị lạm dụng để che giấu gánh nặng đầu tư thực tế."
        ]
      },
      {
        "type": "callout",
        "label": "CapEx duy trì và CapEx mở rộng",
        "text": "Không phải mọi khoản CapEx đều giống nhau. CapEx duy trì chỉ đủ giữ tài sản hiện có vận hành bình thường; CapEx mở rộng nhằm tăng công suất hoặc mở thị trường mới. Với doanh nghiệp trưởng thành, tách được hai phần này giúp thấy rõ hơn dòng tiền tự do 'thật' nếu doanh nghiệp chỉ cần duy trì chứ không cần mở rộng thêm."
      },
      {
        "type": "closing",
        "lines": [
          "EBITDA cho biết doanh nghiệp kiếm được bao nhiêu trước các khoản điều chỉnh.",
          "FCF cho biết doanh nghiệp thực sự CÒN LẠI bao nhiêu tiền sau khi đã đầu tư cần thiết - đó mới là giá trị kinh tế thật."
        ]
      }
    ]
  }),
  "dinh-gia-tai-san-rong": patch({
    "openingQuestion": "Asset-based valuation phù hợp nhất khi nào?",
    "openingOptions": [
      "Khi muốn định giá tài sản có thể bán riêng lẻ",
      "Khi công ty không có tài sản",
      "Khi không cần báo cáo",
      "Chỉ dùng cho công nghệ"
    ],
    "correctOption": 0,
    "explanation": "Định giá theo tài sản ròng phù hợp với doanh nghiệp nhiều tài sản hữu hình hoặc tình huống thanh lý / NAV / RNAV - ví dụ công ty bất động sản, holding company nắm nhiều dự án, hoặc doanh nghiệp đang cân nhắc giải thể. Nó ít phù hợp với công ty công nghệ hay dịch vụ, nơi giá trị chủ yếu đến từ tài sản vô hình khó định giá riêng lẻ như thương hiệu hay đội ngũ.",
    "diagram": [
      {
        "label": "Assets",
        "arrow": true
      },
      {
        "label": "Liabilities",
        "arrow": true
      },
      {
        "label": "NAV / RNAV",
        "arrow": true
      },
      {
        "label": "Equity value",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "BĐS / holding company",
      "description": "Những công ty có nhiều tài sản rõ ràng như đất, dự án, tiền mặt thường được soi theo NAV bên cạnh DCF và multiples."
    },
    "quiz": [
      {
        "question": "NAV thường trả lời câu hỏi gì?",
        "options": [
          "Nếu bán hết tài sản rồi trừ nợ thì còn bao nhiêu cho cổ đông",
          "Mức doanh thu công ty dự kiến đạt được trong năm tài chính kế tiếp",
          "Tỷ lệ biên lợi nhuận gộp trên tổng doanh thu của công ty",
          "Tốc độ tăng trưởng số lượng người dùng sản phẩm của công ty"
        ],
        "correct": 0,
        "explanation": "NAV (Net Asset Value) là khung nhìn tài sản ròng khá trực tiếp: định giá từng tài sản riêng lẻ theo giá thị trường hợp lý, trừ đi toàn bộ nợ, phần còn lại là giá trị thuộc về cổ đông."
      },
      {
        "question": "Vì sao asset-based valuation thường KHÔNG phù hợp để định giá một công ty phần mềm (SaaS) đang tăng trưởng nhanh?",
        "options": [
          "Vì công ty SaaS không có nghĩa vụ công bố báo cáo tài chính định kỳ theo quy định hiện hành, nên thiếu dữ liệu đầu vào để định giá",
          "Vì giá trị của công ty SaaS chủ yếu nằm ở tài sản vô hình khó tách bán riêng lẻ (đội ngũ, công nghệ, tệp khách hàng), không phải tài sản hữu hình có thể định giá và bán rời như bất động sản",
          "Vì công ty SaaS về bản chất luôn có chỉ số NAV âm do đặc thù mô hình kinh doanh thâm dụng công nghệ",
          "Vì có quy định pháp luật hiện hành cấm áp dụng phương pháp NAV cho các công ty hoạt động trong lĩnh vực công nghệ"
        ],
        "correct": 1,
        "explanation": "Asset-based valuation giả định các tài sản có thể tách rời và bán riêng lẻ với giá trị thị trường rõ ràng - đúng với đất đai, tòa nhà, máy móc. Một công ty SaaS tạo giá trị chủ yếu từ tài sản vô hình khó định giá tách rời, nên DCF hoặc multiples (P/E, EV/Revenue) phản ánh giá trị thực tế tốt hơn nhiều."
      },
      {
        "question": "Công ty holding có tổng giá trị tài sản theo giá thị trường 6.000 tỷ và nợ vay 2.500 tỷ. NAV là bao nhiêu?",
        "options": [
          "3.500 tỷ",
          "6.000 tỷ",
          "2.500 tỷ",
          "8.500 tỷ"
        ],
        "correct": 0,
        "explanation": "NAV = Giá trị tài sản − Nợ = 6.000 − 2.500 = 3.500 tỷ. Đây là phần giá trị thuộc về cổ đông nếu bán hết tài sản theo giá thị trường và trả hết nợ."
      },
      {
        "question": "Vì sao định giá theo tài sản ròng không phù hợp với một công ty phần mềm?",
        "options": [
          "Vì giá trị công ty phần mềm chủ yếu nằm ở tài sản vô hình như đội ngũ và thuật toán, không có giá thị trường rõ ràng để cộng lại",
          "Vì công ty phần mềm không có tài sản nào cả",
          "Vì công ty phần mềm luôn có nợ vay bằng không",
          "Vì phương pháp NAV chỉ áp dụng được cho công ty niêm yết"
        ],
        "correct": 0,
        "explanation": "NAV cộng giá trị các tài sản có thể định giá riêng lẻ. Với công ty mà giá trị chủ yếu đến từ tài sản vô hình khó tách bán, phương pháp này cho ra kết quả thấp và bỏ lỡ phần lớn giá trị thực."
      }
    ],
    "keyTakeaways": [
      "Asset-based valuation hữu ích khi tài sản rõ và có thể tách rời",
      "NAV/RNAV thường dùng trong BĐS và holding",
      "Đừng dùng một khung định giá cho mọi doanh nghiệp"
    ],
    "summary": {
      "keyIdea": "Asset-based valuation hữu ích khi tài sản rõ và có thể tách rời",
      "commonMistake": "Dễ bỏ qua: nAV/RNAV thường dùng trong BĐS và holding",
      "action": "Đừng dùng một khung định giá cho mọi doanh nghiệp"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Không phải mọi doanh nghiệp đều nên định giá bằng cùng một phương pháp - với những công ty sở hữu nhiều tài sản hữu hình rõ ràng, có một cách tiếp cận trực diện hơn DCF hay multiples."
      },
      {
        "type": "heading",
        "text": "NAV: nếu bán hết tài sản rồi trả nợ, còn lại bao nhiêu"
      },
      {
        "type": "paragraph",
        "text": "Asset-based valuation định giá từng tài sản riêng lẻ theo giá thị trường hợp lý, trừ đi toàn bộ nợ - phần còn lại (Net Asset Value) là giá trị thuộc về cổ đông. Phương pháp này phù hợp với doanh nghiệp bất động sản, holding company, hoặc tình huống thanh lý, nhưng ít phù hợp với công ty công nghệ/dịch vụ - nơi giá trị chủ yếu đến từ tài sản vô hình (đội ngũ, công nghệ, tệp khách hàng) khó tách bán riêng lẻ như đất đai hay máy móc."
      },
      {
        "type": "list",
        "items": [
          "NAV = giá trị thị trường của tài sản trừ toàn bộ nợ phải trả",
          "Phù hợp nhất với doanh nghiệp nhiều tài sản hữu hình có thể tách bán riêng lẻ (BĐS, holding company)",
          "Không phù hợp với công ty giá trị chủ yếu từ tài sản vô hình như SaaS - nên dùng DCF hoặc multiples thay thế"
        ]
      },
      {
        "type": "formula",
        "title": "Công thức giá trị tài sản ròng",
        "equation": "NAV = Giá trị thị trường của tài sản − Tổng nợ phải trả",
        "example": {
          "title": "Ví dụ một công ty holding bất động sản",
          "calculation": "Tổng giá trị các dự án theo giá thị trường 5.000 tỷ − Nợ vay 2.200 tỷ",
          "result": "NAV = 2.800 tỷ",
          "explanation": "Nếu vốn hóa thị trường của công ty đang thấp hơn 2.800 tỷ đáng kể, đó có thể là dấu hiệu cổ phiếu bị định giá thấp hơn giá trị tài sản ròng - nhưng cũng cần kiểm tra vì sao thị trường lại chiết khấu, có thể do thanh khoản kém hoặc quản trị doanh nghiệp chưa minh bạch."
        }
      },
      {
        "type": "heading",
        "text": "Vì sao phương pháp này không dùng được cho công ty công nghệ"
      },
      {
        "type": "paragraph",
        "text": "Giá trị của một công ty phần mềm nằm chủ yếu ở đội ngũ kỹ sư, thuật toán độc quyền, và tệp khách hàng đang dùng sản phẩm - những thứ không có giá thị trường rõ ràng để cộng lại như đất đai hay tòa nhà. Cố gắng định giá theo tài sản ròng cho loại doanh nghiệp này sẽ cho ra một con số rất thấp và vô nghĩa, bỏ lỡ phần lớn giá trị thực sự nằm ở khả năng tạo dòng tiền tương lai."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Phù hợp với NAV",
          "text": "Công ty bất động sản nắm nhiều dự án, holding company sở hữu cổ phần ở nhiều công ty khác, hoặc doanh nghiệp đang trong quá trình thanh lý - nơi tài sản có thể định giá và bán riêng lẻ."
        },
        "right": {
          "label": "Không phù hợp với NAV",
          "text": "Công ty phần mềm, dịch vụ chuyên môn, hoặc thương hiệu tiêu dùng - nơi giá trị nằm ở tài sản vô hình khó tách bán và khó định giá độc lập."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Không có một khung định giá đúng cho mọi doanh nghiệp.",
          "Chọn đúng phương pháp theo bản chất tài sản của doanh nghiệp mới cho kết quả có ý nghĩa."
        ]
      }
    ]
  }),
  "bien-so-r-twr-mwrr": patch({
    "openingQuestion": "TWR và MWRR khác nhau ở đâu quan trọng nhất?",
    "openingOptions": [
      "TWR đo hiệu suất danh mục, MWRR bị ảnh hưởng bởi thời điểm dòng tiền",
      "MWRR luôn cao hơn",
      "TWR chỉ cho trái phiếu",
      "Hai cái là một"
    ],
    "correctOption": 0,
    "explanation": "TWR đo hiệu suất của chiến lược đầu tư; MWRR phản ánh tác động của timing dòng tiền vào/ra. Đây là lý do một quỹ có thể công bố TWR rất đẹp nhưng phần lớn nhà đầu tư thực tế trong quỹ đó lại có MWRR (trải nghiệm lợi nhuận thật) kém hơn nhiều.",
    "diagram": [
      {
        "label": "Time-weighted return",
        "arrow": true
      },
      {
        "label": "Money-weighted return",
        "arrow": true
      },
      {
        "label": "Dòng tiền vào/ra",
        "arrow": true
      },
      {
        "label": "Đọc hiệu suất đúng",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Quỹ đầu tư",
      "description": "Một quỹ có TWR đẹp nhưng MWRR xấu có thể đơn giản vì nhà đầu tư nạp tiền sai thời điểm."
    },
    "quiz": [
      {
        "question": "Khi nào MWRR dễ bị méo hơn TWR?",
        "options": [
          "Khi có nhiều dòng tiền vào/ra không đều",
          "Khi không có phí",
          "Khi không có thị trường",
          "Khi trái phiếu không tồn tại"
        ],
        "correct": 0,
        "explanation": "MWRR nhạy với thời điểm nạp/rút tiền nên có thể khác TWR khá nhiều."
      },
      {
        "question": "Một quỹ công bố TWR 15%/năm rất ấn tượng, nhưng phần lớn nhà đầu tư lại nạp thêm tiền nhiều nhất ngay trước một đợt giảm mạnh của thị trường. Trải nghiệm lợi nhuận thực tế (MWRR) của đa số nhà đầu tư sẽ ra sao?",
        "options": [
          "Vẫn đúng bằng 15% vì đó là hiệu suất của quỹ",
          "Thường thấp hơn 15% khá nhiều, vì phần vốn lớn bị đưa vào ngay trước giai đoạn thị trường xấu sẽ chịu tỷ trọng lỗ cao hơn trong tính toán MWRR",
          "Luôn cao hơn 15% vì nạp thêm tiền luôn có lợi",
          "Không thể xác định nếu không biết phí quản lý"
        ],
        "correct": 1,
        "explanation": "Đây chính là khoảng cách kinh điển giữa TWR và MWRR: TWR đo hiệu suất chiến lược bất kể dòng tiền vào/ra, nhưng MWRR (có trọng số theo thời điểm và quy mô dòng tiền) phản ánh trải nghiệm thực tế của nhà đầu tư - nếu phần lớn vốn được nạp vào đúng lúc thị trường sắp giảm, MWRR trung bình của nhà đầu tư sẽ thấp hơn TWR công bố của quỹ."
      },
      {
        "question": "Một quỹ công bố TWR 15%/năm rất ấn tượng, nhưng một nhà đầu tư cụ thể lại có MWRR chỉ vài phần trăm. Nguyên nhân hợp lý nhất là gì?",
        "options": [
          "Nhà đầu tư đó có thể đã nạp phần lớn vốn vào đúng lúc thị trường sắp giảm, khiến trải nghiệm thực tế kém hơn hiệu suất chiến lược",
          "Quỹ đã công bố sai số liệu TWR",
          "MWRR luôn thấp hơn TWR trong mọi trường hợp",
          "Nhà đầu tư đó đã bị tính phí quá cao"
        ],
        "correct": 0,
        "explanation": "Đây chính là bản chất của MWRR: nó có trọng số theo thời điểm dòng tiền, nên thời điểm nạp tiền không may có thể kéo trải nghiệm thực tế xuống thấp hơn nhiều so với hiệu suất công bố của quỹ."
      },
      {
        "question": "Vì sao các quỹ thường công bố TWR thay vì MWRR khi báo cáo hiệu suất quản lý?",
        "options": [
          "Vì TWR không bị ảnh hưởng bởi quyết định nạp/rút tiền của từng nhà đầu tư, nên đánh giá công bằng năng lực của người quản lý quỹ",
          "Vì TWR luôn cho kết quả cao hơn MWRR",
          "Vì MWRR không thể tính toán được",
          "Vì quy định pháp luật chỉ cho phép công bố TWR"
        ],
        "correct": 0,
        "explanation": "Người quản lý quỹ không kiểm soát được thời điểm nhà đầu tư nạp hay rút tiền, nên dùng TWR để đánh giá năng lực họ là công bằng hơn - MWRR phù hợp hơn khi đo trải nghiệm cá nhân."
      }
    ],
    "keyTakeaways": [
      "TWR đánh giá chiến lược, MWRR đánh giá trải nghiệm của tiền thật",
      "Timing dòng tiền có thể làm MWRR khác TWR mạnh",
      "Hiệu suất quỹ nên nhìn qua cả hai kính"
    ],
    "summary": {
      "keyIdea": "TWR đánh giá chiến lược, MWRR đánh giá trải nghiệm của tiền thật",
      "commonMistake": "Dễ bỏ qua: timing dòng tiền có thể làm MWRR khác TWR mạnh",
      "action": "Hiệu suất quỹ nên nhìn qua cả hai kính"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một quỹ công bố hiệu suất 15%/năm rất ấn tượng - nhưng liệu đó có phải là trải nghiệm lợi nhuận thực tế của phần lớn nhà đầu tư trong quỹ đó không? Câu trả lời phụ thuộc vào việc bạn đang đo bằng thước đo nào."
      },
      {
        "type": "heading",
        "text": "TWR đo chiến lược, MWRR đo trải nghiệm thật"
      },
      {
        "type": "paragraph",
        "text": "Time-Weighted Return (TWR) đo hiệu suất của chiến lược đầu tư, không bị ảnh hưởng bởi thời điểm dòng tiền vào/ra. Money-Weighted Return (MWRR) có trọng số theo thời điểm và quy mô dòng tiền, nên phản ánh trải nghiệm thực tế của nhà đầu tư - nếu phần lớn vốn được nạp vào đúng lúc thị trường sắp giảm, MWRR trung bình của nhà đầu tư sẽ thấp hơn nhiều so với TWR công bố của quỹ."
      },
      {
        "type": "list",
        "items": [
          "TWR đo hiệu suất chiến lược; MWRR đo trải nghiệm lợi nhuận thật của nhà đầu tư",
          "MWRR dễ bị méo hơn khi có nhiều dòng tiền vào/ra không đều",
          "Một quỹ TWR đẹp vẫn có thể khiến phần lớn nhà đầu tư có MWRR kém nếu họ nạp tiền sai thời điểm"
        ]
      },
      {
        "type": "conceptTable",
        "title": "Hai thước đo, hai câu hỏi khác nhau",
        "concepts": [
          {
            "vi": "Hiệu suất theo thời gian",
            "en": "TWR - Time-Weighted Return",
            "def": "Loại bỏ hoàn toàn ảnh hưởng của thời điểm và quy mô dòng tiền vào/ra, đo đúng hiệu suất của chiến lược đầu tư hoặc người quản lý quỹ."
          },
          {
            "vi": "Hiệu suất theo dòng tiền",
            "en": "MWRR - Money-Weighted Return",
            "def": "Có trọng số theo thời điểm và quy mô mỗi lần nạp/rút, phản ánh trải nghiệm lợi nhuận thực tế của một nhà đầu tư cụ thể."
          }
        ]
      },
      {
        "type": "formula",
        "title": "Ví dụ vì sao hai chỉ số có thể lệch xa nhau",
        "equation": "MWRR = tỷ suất giải phương trình sao cho giá trị hiện tại của mọi dòng tiền vào/ra bằng 0",
        "example": {
          "title": "Nhà đầu tư nạp thêm tiền đúng lúc thị trường sắp giảm",
          "calculation": "Quỹ TWR 15%/năm trong 2 năm; nhà đầu tư nạp phần lớn vốn ngay trước khi thị trường giảm 20%",
          "result": "MWRR cá nhân của nhà đầu tư đó có thể chỉ còn vài phần trăm hoặc âm",
          "explanation": "Bản thân chiến lược của quỹ vẫn tốt (TWR 15%) - vấn đề nằm ở thời điểm nạp tiền của nhà đầu tư, không phải ở năng lực quản lý quỹ. Đây là lý do quỹ công bố TWR (đánh giá công bằng cho người quản lý) trong khi trải nghiệm thực tế của từng nhà đầu tư đo bằng MWRR có thể rất khác."
        }
      },
      {
        "type": "callout",
        "label": "Vì sao cả hai chỉ số đều cần thiết, không cái nào 'đúng hơn'",
        "text": "TWR công bằng để đánh giá năng lực người quản lý quỹ, vì nó không bị ảnh hưởng bởi quyết định nạp/rút tiền của từng nhà đầu tư riêng lẻ - những quyết định người quản lý không kiểm soát được. MWRR trung thực với trải nghiệm cá nhân, cho biết chính xác nhà đầu tư đó đã kiếm được bao nhiêu trên số tiền thực tế họ đã bỏ vào. Đọc báo cáo hiệu suất quỹ mà không phân biệt hai thước đo này dễ dẫn đến kỳ vọng sai lệch."
      },
      {
        "type": "closing",
        "lines": [
          "'Hiệu suất quỹ' công bố không luôn là 'hiệu suất bạn thực sự nhận được'.",
          "Thời điểm bạn nạp và rút tiền quan trọng không kém việc chọn đúng quỹ."
        ]
      }
    ]
  }),
  "commodity": patch({
    "diagram": [
      {
        "label": "Standardized goods",
        "arrow": true
      },
      {
        "label": "Spot market",
        "arrow": true
      },
      {
        "label": "Futures / hedging",
        "arrow": true
      },
      {
        "label": "Cost driver for many industries",
        "arrow": false
      }
    ]
  }),
  "value-at-risk-var-stress-testing": patch({
    "quiz": [
      {
        "question": "Một danh mục có VaR 1 ngày ở mức tin cậy 95% là 3 triệu USD, và VaR 1 ngày ở mức 99% là 5 triệu USD. Kết luận nào đúng?",
        "options": [
          "Hai con số mâu thuẫn nhau - VaR ở mức tin cậy cao hơn thì phải nhỏ hơn mới hợp lý",
          "Cùng một danh mục đọc ở hai ngưỡng: khoảng 5% số ngày lỗ vượt 3 triệu, và khoảng 1% số ngày lỗ vượt 5 triệu",
          "VaR 99% là 5 triệu nghĩa là danh mục chắc chắn không bao giờ lỗ quá 5 triệu"
        ],
        "correct": 1,
        "explanation": "Với cùng một danh mục, VaR luôn tăng khi mức tin cậy tăng - cắt sâu hơn vào đuôi phân phối lỗ thì ngưỡng lỗ phải lớn hơn. Nên 3 triệu ở 95% và 5 triệu ở 99% là nhất quán, không phải hai mức rủi ro để đem so hơn kém. Điều quan trọng hơn: VaR chỉ nói lỗ VƯỢT ngưỡng bao nhiêu lần, không nói vượt BAO XA. Ngày tệ nhất trong 1% kia có thể lỗ 8 triệu, cũng có thể 40 triệu - VaR im lặng về chuyện đó, và đó chính là lý do phải dùng thêm Expected Shortfall và stress test."
      },
      {
        "question": "Stress test là gì và khác VaR như thế nào?",
        "options": [
          "Stress test giả lập những tình huống thị trường cực kỳ bất lợi (như khủng hoảng 2008) để xem danh mục phản ứng thế nào, còn VaR ước lượng ngưỡng lỗ gắn với một xác suất",
          "Stress test giống hệt VaR, chỉ là từ gọi khác",
          "Stress test chỉ dùng cho cổ phiếu, VaR dùng cho trái phiếu"
        ],
        "correct": 0,
        "explanation": "VaR trả lời câu hỏi có gắn xác suất: 'ở mức tin cậy X, ngưỡng lỗ là bao nhiêu', ước lượng từ phân phối lợi suất (mô phỏng lịch sử, tham số, hoặc Monte Carlo). Stress test bỏ xác suất đi và hỏi câu khác hẳn: 'nếu kịch bản cụ thể này xảy ra thì mất bao nhiêu' - lặp lại tháng 9/2008, hay VND mất giá 15% trong một tuần. Vì khủng hoảng thường là những biến động chưa từng có trong dữ liệu quá khứ, VaR hay đánh giá thấp rủi ro đúng vào lúc cần nó nhất. Hai công cụ bổ sung cho nhau chứ không thay thế nhau."
      },
      {
        "question": "Tại sao các ngân hàng cần VaR ngoài các phương pháp quản lý rủi ro khác?",
        "options": [
          "Vì VaR là cách duy nhất để tính toán rủi ro",
          "VaR cho một con số duy nhất để so sánh rủi ro giữa các danh mục khác nhau và tuân thủ quy định Basel",
          "Để tỉnh táo - VaR nhắc rằng ngay cả trong thời kỳ bình thường vẫn có xác suất mất rất nhiều tiền"
        ],
        "correct": 1,
        "explanation": "Giá trị thực dụng của VaR nằm ở chỗ nó nén rủi ro của những thứ rất khác nhau - trái phiếu, ngoại hối, phái sinh, cổ phiếu - về cùng MỘT đơn vị là tiền. Nhờ vậy hội đồng rủi ro so được bàn giao dịch này với bàn kia và đặt được hạn mức cụ thể, thay vì tranh luận định tính. Basel cũng yêu cầu đúng con số này để tính vốn cho rủi ro thị trường. Lựa chọn 'để tỉnh táo' không sai về tinh thần, nhưng đó là tác dụng phụ chứ không phải lý do ngân hàng bắt buộc phải tính VaR."
      }
    ]
  }),
  "basel-iii-regulatory-capital-requirements": patch({
    "quiz": [
      {
        "question": "Sự khác biệt giữa Tier 1 capital và Tier 2 capital là gì?",
        "options": [
          "Tier 1 là vốn chủ sở hữu + lợi nhuận giữ lại (mạnh nhất); Tier 2 là nợ thứ cấp và các công cụ yếu hơn. Khi có tổn thất, Tier 1 chịu trước",
          "Tier 1 là tiền mặt, Tier 2 là cổ phiếu",
          "Tier 1 và Tier 2 giống nhau, chỉ là tên gọi khác nhau"
        ],
        "correct": 0,
        "explanation": "Điểm mấu chốt là THỨ TỰ hấp thụ lỗ. Tier 1 - chủ yếu là vốn cổ phần phổ thông và lợi nhuận giữ lại - chịu lỗ ngay lập tức trong khi ngân hàng vẫn đang hoạt động bình thường, nên được gọi là 'going-concern capital'. Tier 2 (nợ thứ cấp, trái phiếu chuyển đổi...) chỉ hấp thụ lỗ khi ngân hàng đã đổ vỡ và bước vào xử lý, tức 'gone-concern capital'. Vì hai loại phục vụ hai thời điểm khác nhau, chúng không thay thế được cho nhau - đó là lý do Basel III đặt yêu cầu riêng cho Tier 1 chứ không chỉ cho tổng vốn."
      },
      {
        "question": "RWA (Risk Weighted Assets) là gì?",
        "options": [
          "Tổng tất cả tài sản của ngân hàng nhân với giá trị của chúng",
          "Tài sản được điều chỉnh theo độ rủi ro - ví dụ trái phiếu chính phủ trọng số 0%, khoản vay tín chấp cá nhân trọng số 100%. RWA là tổng tài sản đã cân theo rủi ro",
          "Tiền lãi lũy kế ngân hàng kiếm được trong quá khứ"
        ],
        "correct": 1,
        "explanation": "Ý tưởng nền: một đồng cho chính phủ vay và một đồng cho vay tín chấp cá nhân không rủi ro như nhau, nên không thể đòi hỏi cùng một lượng vốn. RWA nhân mỗi tài sản với một trọng số rủi ro rồi cộng lại - trái phiếu chính phủ bằng nội tệ thường 0%, cho vay doanh nghiệp 100%, một số khoản đặc biệt rủi ro còn vượt 100%. Mọi tỷ lệ an toàn vốn đều lấy RWA làm mẫu số (CAR = Vốn / RWA), nên chính bộ trọng số này quyết định ngân hàng phải có bao nhiêu vốn. Đây cũng là chỗ ngân hàng có động cơ 'tối ưu hoá' bằng cách dồn vào tài sản trọng số thấp - một điểm mà cơ quan quản lý luôn soi kỹ."
      },
      {
        "question": "Nếu một ngân hàng không đạt yêu cầu Tier 1 capital ratio, điều gì xảy ra?",
        "options": [
          "Không có gì, những quy định này chỉ là khuyến nghị",
          "Cơ quan quản lý buộc ngân hàng tăng vốn, giảm tài sản rủi ro, và trước hết là dừng chia cổ tức - không khắc phục được thì bị kiểm soát đặc biệt hoặc xử lý",
          "Ngân hàng phải nộp phạt nhưng vẫn kinh doanh bình thường"
        ],
        "correct": 1,
        "explanation": "Yêu cầu vốn không phải khuyến nghị. Khi tỷ lệ tụt dưới ngưỡng đệm, ngân hàng rơi vào vùng bị hạn chế và Basel III chặn PHÂN PHỐI LỢI NHUẬN trước tiên - cắt cổ tức, cắt thưởng, cắt mua lại cổ phiếu - vì đó là cách giữ vốn lại nhanh nhất mà không cần huy động mới. Song song là lộ trình tăng vốn hoặc thu hẹp tài sản rủi ro dưới giám sát. Nếu vẫn không khắc phục được, cơ quan quản lý can thiệp trực tiếp, tới mức kiểm soát đặc biệt hoặc xử lý ngân hàng."
      }
    ]
  }),
  "dinh-gia-bat-dong-san-tai-san-vo-hinh": patch({
    "quiz": [
      {
        "question": "Ba phương pháp định giá bất động sản chính là gì?",
        "options": [
          "DCF, kế toán, và thị trường",
          "Income Approach, Cost Approach, và Market Approach",
          "Giá vốn, giá thị trường, và giá thanh lý"
        ],
        "correct": 1,
        "explanation": "Ba cách này trả lời ba câu hỏi khác nhau về cùng một tài sản: Income Approach hỏi 'nó đẻ ra bao nhiêu tiền', Market Approach hỏi 'người ta vừa trả bao nhiêu cho cái tương tự', Cost Approach hỏi 'xây lại tốn bao nhiêu'. Một định giá tử tế chạy cả ba rồi giải thích vì sao chúng lệch nhau - chênh lệch giữa Income và Market thường tiết lộ thị trường đang kỳ vọng gì mà dòng tiền hiện tại chưa thể hiện. Một con số đứng đơn độc rất khó bảo vệ khi bị chất vấn."
      },
      {
        "question": "Income Approach định giá bất động sản dựa trên điều gì?",
        "options": [
          "Tiền mặt hiện có của chủ sở hữu",
          "Giá của tòa nhà tương tự vừa được bán gần đây",
          "Dòng tiền cho thuê (NOI) được chiết khấu về hiện tại - cùng logic với DCF nhưng áp cho bất động sản"
        ],
        "correct": 2,
        "explanation": "Income Approach chính là DCF khoác áo bất động sản: lấy NOI (doanh thu cho thuê trừ chi phí vận hành, chưa trừ lãi vay và khấu hao) rồi hoặc chia cho cap rate để ra giá trị, hoặc chiết khấu dòng NOI nhiều năm về hiện tại. Vì thế nó nhạy nhất với đúng hai giả định: tỷ lệ lấp đầy và cap rate. Cap rate nhích 0,5 điểm phần trăm có thể làm định giá đổi cả chục phần trăm - đó là lý do báo cáo định giá bất động sản bắt buộc phải có bảng độ nhạy, không phải cho đẹp."
      },
      {
        "question": "Goodwill là gì?",
        "options": [
          "Phần giá mua vượt quá giá trị hợp lý của tài sản thuần nhận diện được - mua công ty 100 triệu USD trong khi tài sản nhận diện được chỉ đáng 60 triệu, thì 40 triệu còn lại là goodwill",
          "Thiện chí của ban lãnh đạo công ty",
          "Lợi nhuận công ty tạo ra sau khi được mua lại"
        ],
        "correct": 0,
        "explanation": "Định nghĩa chuẩn dùng GIÁ TRỊ HỢP LÝ của tài sản thuần nhận diện được, không phải giá trị sổ sách - và 'nhận diện được' đã bao gồm cả tài sản vô hình tách bạch được như thương hiệu, hợp đồng khách hàng, bằng sáng chế. Phần dư còn lại chính là những thứ không thể tách rời khỏi doanh nghiệp: đội ngũ, hiệu ứng mạng lưới, kỳ vọng synergy. Goodwill không khấu hao mà phải kiểm tra suy giảm giá trị hằng năm - và một khoản ghi giảm goodwill lớn thường là lời thú nhận muộn màng rằng thương vụ đã mua hớ."
      }
    ]
  }),
  "valuation-report-tinh-hop-ly-dinh-gia": patch({
    "quiz": [
      {
        "question": "Executive Summary trong valuation report nên chứa gì?",
        "options": [
          "Chi tiết kỹ thuật của tất cả các phương pháp định giá",
          "Mục lục của báo cáo",
          "Kết luận chính: giá trị là bao nhiêu, ra bằng phương pháp nào, dựa trên những giả định nào"
        ],
        "correct": 2,
        "explanation": "Executive Summary viết cho người chỉ đọc đúng một trang - thường là CFO, hội đồng đầu tư, hoặc thẩm phán. Nó phải trả lời trọn ba câu: giá trị bao nhiêu (nên là một KHOẢNG, không phải một số duy nhất), bằng phương pháp nào, dựa trên giả định nào. Đủ để người đọc ra quyết định mà không cần lật phần kỹ thuật. Nhồi chi tiết phương pháp vào đây là biến nó thành phần thân bài thứ hai và làm hỏng đúng chức năng của nó."
      },
      {
        "question": "Tại sao Sensitivity Analysis quan trọng?",
        "options": [
          "Để cho thấy giá trị thay đổi thế nào khi giả định thay đổi - ví dụ tỷ lệ chiết khấu tăng từ 6% lên 8% thì định giá sụt bao nhiêu",
          "Vì pháp luật bắt buộc phải có",
          "Để che bớt những điểm yếu của định giá"
        ],
        "correct": 0,
        "explanation": "Định giá là một hàm số của các giả định, nên một con số đơn lẻ luôn tỏ ra chính xác hơn thực tế. Bảng độ nhạy hai chiều (thường là WACC × tốc độ tăng trưởng dài hạn) phơi bày điều đó: giá trị chạy trong khoảng nào, và quan trọng hơn - GIẢ ĐỊNH NÀO thực sự lái kết quả. Nghịch lý là nó khiến báo cáo đáng tin hơn chứ không yếu đi, vì người đọc thấy bạn biết rõ chỗ nào mong manh. Báo cáo giấu độ nhạy luôn là báo cáo bị đánh sập đầu tiên khi có tranh chấp."
      },
      {
        "question": "Khi một valuation report bị tranh cãi (ví dụ trong phiên tòa), điều gì được xem xét trước tiên?",
        "options": [
          "Giá trị cuối cùng (định giá là 50 triệu hay 100 triệu USD)",
          "Phương pháp, giả định và dữ liệu đã dùng - tính hợp lý của từng bước",
          "Ai là người viết báo cáo"
        ],
        "correct": 1,
        "explanation": "Trong tranh chấp, không ai chứng minh được con số cuối là 'đúng' - giá trị hợp lý vốn dĩ là một ước lượng, không phải sự thật quan sát được. Cái bị mổ xẻ là QUY TRÌNH: phương pháp có phù hợp với loại tài sản không, giả định có nguồn và có nhất quán với nhau không, các giao dịch so sánh có thật sự tương đương không, ngày định giá có đúng không. Một định giá 50 triệu USD lập luận chặt chẽ sẽ đứng vững trước một định giá 50 triệu USD không giải thích nổi vì sao chọn WACC 9%."
      }
    ]
  }),
  "investment-thesis-research-report-structure": patch({
    "quiz": [
      {
        "question": "Các phần chính của một investment thesis là gì?",
        "options": [
          "Luận điểm chính, bằng chứng, lý do thị trường đang định giá sai, catalyst, và rủi ro",
          "Tên công ty, giá cổ phiếu, tiểu sử CEO",
          "Chỉ là một dự đoán giá sẽ tăng hay giảm"
        ],
        "correct": 0,
        "explanation": "Một luận điểm đầu tư đầy đủ phải trả lời được: tôi tin điều gì, dựa trên bằng chứng nào, VÌ SAO thị trường đang định giá sai (variant perception - nếu ai cũng nghĩ như tôi thì giá đã phản ánh rồi), điều gì sẽ khiến thị trường nhận ra, và nếu tôi sai thì sai ở đâu. Thiếu phần catalyst, đó là một nhận định có thể đúng mãi mà không bao giờ sinh lời. Thiếu phần rủi ro, đó là lời quảng cáo chứ không phải phân tích."
      },
      {
        "question": "Catalyst trong đầu tư là gì?",
        "options": [
          "Nguyên nhân lịch sử hình thành công ty",
          "Sự kiện hoặc thay đổi sẽ kích hoạt việc thị trường định giá lại - ra sản phẩm mới, M&A, thoái vốn mảng lỗ, thay đổi chính sách",
          "Một loại chất xúc tác hóa học"
        ],
        "correct": 1,
        "explanation": "Catalyst là câu trả lời cho 'vì sao là BÂY GIỜ'. Một cổ phiếu định giá thấp có thể tiếp tục định giá thấp nhiều năm - thị trường không có nghĩa vụ đồng ý với bạn theo lịch của bạn. Catalyst là sự kiện có thời điểm tương đối xác định buộc giá phải phản ứng: kết quả quý, ra mắt sản phẩm, bán mảng lỗ, thay CEO, phán quyết pháp lý, thay đổi quy định. Đây cũng là phần quyết định quy mô vị thế và thời hạn nắm giữ - không có catalyst thì không biết nên chờ bao lâu."
      },
      {
        "question": "Cấu trúc của một research report là gì?",
        "options": [
          "Chỉ cần viết giá mục tiêu là đủ",
          "Chỉ là danh sách các con số tài chính",
          "Executive Summary, Investment Thesis, Industry Analysis, Company Analysis, Valuation, Risk Assessment, Recommendation"
        ],
        "correct": 2,
        "explanation": "Trình tự này đi từ KẾT LUẬN xuống bằng chứng, vì người đọc chuyên nghiệp đọc theo đúng thứ tự đó và thường dừng giữa chừng. Mỗi phần có một nhiệm vụ riêng: ngành để định khung, công ty để nêu lợi thế cạnh tranh, định giá để ra con số, rủi ro để chứng minh bạn đã tự phản biện, khuyến nghị để nói rõ hành động và giá mục tiêu. Báo cáo chỉ có giá mục tiêu mà không có đường dẫn tới nó thì không ai đặt lệnh theo được."
      }
    ]
  }),
  "quy-trinh-tham-dinh-tin-dung-5c-framework": patch({
    "quiz": [
      {
        "question": "Character trong 5C là gì?",
        "options": [
          "Tính cách và cá tính của người vay",
          "Thiện chí trả nợ đo bằng bằng chứng: lịch sử tín dụng, số ngày quá hạn, uy tín trong thanh toán",
          "Trình độ học vấn của người vay"
        ],
        "correct": 1,
        "explanation": "Đây đúng là chỗ bẫy của bản dịch. 'Character' không phải tính cách theo nghĩa thông thường, mà là thiện chí trả nợ ĐO BẰNG BẰNG CHỨNG - lịch sử tín dụng trên CIC, số ngày quá hạn, cách người vay xử lý các khoản nợ cũ khi gặp khó, uy tín với nhà cung cấp. Phân biệt then chốt trong tín dụng: willingness to pay (Character) tách hẳn khỏi ability to pay (Capacity). Một người thừa khả năng trả vẫn có thể chọn không trả, và hồ sơ quá khứ là chỉ báo tốt nhất cho lựa chọn đó."
      },
      {
        "question": "Capacity là gì?",
        "options": [
          "Quy mô của công ty",
          "Tuổi của người vay",
          "Khả năng trả nợ dựa trên thu nhập, lợi nhuận và dòng tiền - đo bằng D/E, Interest Coverage, DSCR"
        ],
        "correct": 2,
        "explanation": "Capacity là chân đế của khoản vay: tiền ở đâu ra để trả. Với doanh nghiệp, người ta nhìn dòng tiền từ hoạt động kinh doanh chứ không phải lợi nhuận kế toán, qua Debt/EBITDA, Interest Coverage (EBIT chia lãi vay) và DSCR (dòng tiền khả dụng chia nghĩa vụ nợ). Với cá nhân là tỷ lệ nghĩa vụ trả nợ trên thu nhập. Nhớ đúng thứ tự ưu tiên: tài sản thế chấp chỉ là phương án dự phòng, DÒNG TIỀN mới là nguồn trả nợ - ngân hàng cho vay để thu lãi, không phải để đi phát mại nhà."
      },
      {
        "question": "Tại sao Conditions (điều kiện kinh tế) lại quan trọng?",
        "options": [
          "Vì ngay cả khi Character, Capacity, Capital, Collateral đều tốt, một cú suy thoái hoặc cú sốc riêng của ngành vẫn có thể khiến khách hàng mất khả năng trả",
          "Vì pháp luật bắt buộc phải đánh giá",
          "Vì nó quyết định mức lãi suất cho vay"
        ],
        "correct": 0,
        "explanation": "Bốn chữ C còn lại đều đo ở cấp TỪNG người vay; Conditions là chữ C duy nhất nhìn ra bên ngoài. Nó quan trọng vì rủi ro tín dụng có tính tương quan: khi ngành hoặc nền kinh tế xấu đi, cả một rổ khách hàng vốn tốt cùng gặp khó MỘT LÚC - đúng vào lúc giá tài sản thế chấp cũng giảm, nên phương án dự phòng hỏng cùng lúc với nguồn trả nợ chính. Đó chính là cơ chế đã làm vỡ nhiều danh mục trông rất an toàn khi xét từng hồ sơ riêng lẻ, và là lý do ngân hàng đặt hạn mức theo ngành chứ không chỉ theo khách hàng."
      }
    ]
  }),
  "hedging-instruments-fx-derivatives": patch({
    "quiz": [
      {
        "question": "Sự khác biệt giữa Forward, Futures và Options là gì?",
        "options": [
          "Không có khác biệt, chỉ là ba tên gọi của cùng một thứ",
          "Forward là tài sản, Futures là tiền mặt",
          "Forward: hợp đồng tùy chỉnh, giao dịch OTC. Futures: chuẩn hóa, giao dịch trên sàn, ký quỹ hằng ngày. Cả hai đều bắt buộc thực hiện, còn Options chỉ trao quyền chứ không bắt buộc"
        ],
        "correct": 2,
        "explanation": "Có hai trục phân biệt, đừng trộn chúng vào nhau. Trục thứ nhất là NƠI GIAO DỊCH: Forward ký tay đôi ngoài sàn (OTC) nên tùy chỉnh được số tiền và ngày đáo hạn, đổi lại gánh rủi ro đối tác; Futures chuẩn hoá và giao dịch qua sàn có trung tâm bù trừ, phải ký quỹ và tất toán lãi lỗ hằng ngày. Trục thứ hai là NGHĨA VỤ: Forward và Futures đều BẮT BUỘC thực hiện khi đáo hạn, còn Options chỉ trao QUYỀN - nên người mua option phải trả phí (premium) để giữ được phần lợi khi giá đi thuận và bỏ quyền khi giá đi nghịch."
      },
      {
        "question": "Tại sao swaps được dùng trong quản lý rủi ro lãi suất?",
        "options": [
          "Swap lãi suất: một bên trả lãi cố định, bên kia trả lãi thả nổi. Bên trả cố định được bảo vệ khi lãi suất tăng, bên kia hưởng lợi khi lãi suất giảm",
          "Vì swap là một loại trái phiếu",
          "Vì swap là một loại cổ phiếu"
        ],
        "correct": 0,
        "explanation": "Interest Rate Swap không chuyển tiền gốc, chỉ hoán đổi DÒNG LÃI tính trên một số tiền danh nghĩa. Công dụng thực tế là khớp lại cấu trúc nợ với cấu trúc doanh thu: doanh nghiệp đang vay thả nổi nhưng có doanh thu ổn định sẽ trả cố định / nhận thả nổi để chốt cứng chi phí lãi vay, khỏi phải đoán lãi suất; ngân hàng dùng chiều ngược lại để cân bằng bảng cân đối. Lưu ý quan trọng: swap không làm rủi ro biến mất, nó chỉ chuyển rủi ro sang bên có khẩu vị ngược lại - và tạo ra rủi ro đối tác mới."
      },
      {
        "question": "Call option trên USD là gì?",
        "options": [
          "Một cuộc gọi để hỏi tỷ giá",
          "Quyền (nhưng không bắt buộc) mua USD ở mức tỷ giá đã chốt - tỷ giá tăng thì thực hiện quyền, giảm thì bỏ quyền",
          "Một loại lãi suất áp cho khoản vay USD"
        ],
        "correct": 1,
        "explanation": "Call USD là quyền mua USD ở tỷ giá đã chốt trước (strike). Với doanh nghiệp Việt Nam nhập khẩu phải trả USD sau 3 tháng, nó hoạt động đúng như một hợp đồng bảo hiểm tỷ giá: USD tăng vượt strike thì thực hiện quyền và mua theo giá cũ; USD giảm thì bỏ quyền, ra thị trường mua rẻ hơn, và thiệt hại tối đa đúng bằng khoản phí đã trả. Khác biệt căn bản so với forward: forward khoá chặt tỷ giá cả hai chiều và không tốn phí ban đầu, còn option để ngỏ phần lợi nhưng phải trả phí - chọn cái nào là đánh đổi giữa chi phí và tính linh hoạt, không có cái nào luôn tốt hơn."
      }
    ]
  }),
  "operating-expense": patch({
    "quiz": [
      {
        "question": "Operating Expense (OpEx) bao gồm những gì?",
        "options": [
          "SG&A, R&D và khấu hao - chi phí vận hành không trực tiếp sản xuất",
          "Chỉ lương nhân viên bán hàng và chi phí marketing của kỳ",
          "Chi phí nguyên vật liệu và lương công nhân trực tiếp sản xuất",
          "Toàn bộ chi phí của công ty, gồm cả COGS và lãi vay"
        ],
        "correct": 0,
        "explanation": "OpEx = tất cả chi phí vận hành doanh nghiệp trừ COGS. Gồm: lương office, marketing, R&D, khấu hao, vv."
      },
      {
        "question": "SG&A là gì?",
        "options": [
          "Selling (bán hàng, marketing), General (lương chung, office), Administrative (admin, legal)",
          "Sales Growth & Advertising - phần doanh thu tăng thêm nhờ chi phí quảng cáo bỏ ra trong kỳ báo cáo",
          "Chi phí nguyên vật liệu và nhân công trực tiếp, tức phần lõi của COGS",
          "Chi phí lãi vay và thuế, nằm dưới dòng Operating Income"
        ],
        "correct": 0,
        "explanation": "SG&A = bán + quản lý + hành chính. Chiếm phần lớn OpEx ở công ty bán lẻ/dịch vụ."
      },
      {
        "question": "R&D là gì?",
        "options": [
          "Revenue & Distribution - chi phí phân phối hàng hóa tới các nhà bán lẻ và đại lý trong kỳ",
          "Chi phí thuê ngoài nghiên cứu thị trường, luôn nằm trong COGS",
          "Research & Development - chi phí phát triển sản phẩm mới, cải tiến sản phẩm cũ",
          "Khoản đầu tư được vốn hóa thành tài sản, không xuất hiện trên P&L"
        ],
        "correct": 2,
        "explanation": "R&D = đầu tư vào tương lai. Cao ở tech/pharma, thấp ở retail/F&B."
      },
      {
        "question": "Công ty có Gross Profit 600, OpEx 400. Operating Income = ?",
        "options": [
          "1.000 (= 600 + 400)",
          "600 - OpEx chưa được trừ ở dòng này",
          "200 (= 600 - 400)",
          "Không tính được vì thiếu doanh thu"
        ],
        "correct": 2,
        "explanation": "Operating Income (EBIT) = Gross Profit - OpEx = 600 - 400 = 200."
      },
      {
        "question": "OpEx cao có tốt hay tệ?",
        "options": [
          "Tùy: cao mà doanh thu đứng thì ăn margin, cao vào R&D có thể là đầu tư tốt",
          "Luôn tệ - mọi đồng OpEx bỏ ra đều làm giảm lợi nhuận thuộc về cổ đông của công ty",
          "Luôn tốt - OpEx cao chứng tỏ công ty đang mở rộng quy mô nhanh",
          "Không ảnh hưởng vì OpEx nằm dưới dòng Operating Income"
        ],
        "correct": 0,
        "explanation": "OpEx cao vào marketing/bán hàng = tạo doanh thu tương lai. OpEx cao vào R&D = tạo sản phẩm tương lai. Không phải chỉ 'lãng phí'."
      },
      {
        "question": "Nếu muốn cải thiện Operating Margin, công ty nên làm gì?",
        "options": [
          "Vay thêm để mở rộng, vì chi phí lãi vay được trừ ra trước khi tính Operating Income của kỳ",
          "Tăng doanh thu, giảm OpEx không cần thiết, hoặc giữ OpEx ổn định khi doanh thu tăng",
          "Giảm doanh thu để tỷ lệ OpEx trên doanh thu trông nhỏ hơn",
          "Chuyển một phần OpEx sang COGS, vì COGS không ảnh hưởng margin vận hành"
        ],
        "correct": 1,
        "explanation": "Operating Margin = Operating Income / Revenue. Tăng lãi vận hành hoặc doanh thu đều cải thiện margin."
      },
      {
        "question": "Công ty A: Revenue 1000, COGS 400, SG&A 300, R&D 100. Operating Income = ?",
        "options": [
          "600 (= 1.000 - 400, chỉ trừ COGS)",
          "500 (= 1.000 - 300 - 100 - 100)",
          "200 (= 1.000 - 400 - 300 - 100)",
          "300 (= 1.000 - 400 - 300, bỏ R&D vì coi là đầu tư)"
        ],
        "correct": 2,
        "explanation": "OI = Revenue - COGS - SG&A - R&D = 1000 - 400 - 300 - 100 = 200."
      },
      {
        "question": "Cắt chi phí R&D để tăng Operating Income ngắn hạn, tốt hay tệ?",
        "options": [
          "Tốt - R&D là chi phí không bắt buộc nên cắt là quyết định đúng",
          "Không ảnh hưởng vì R&D được vốn hóa, không nằm trên P&L kỳ này",
          "Tốt - cắt R&D làm tăng cả Operating Income và dòng tiền tự do trong dài hạn",
          "Tệ - sản phẩm tương lai yếu đi, đánh đổi dài hạn cho lợi nhuận ngắn hạn"
        ],
        "correct": 3,
        "explanation": "Cutting R&D = ngắn hạn giúp lợi nhuận, nhưng dài hạn công ty lỗi vì mất sức cạnh tranh."
      },
      {
        "question": "Vì sao kế toán phân biệt COGS và OpEx?",
        "options": [
          "Vì chuẩn mực kế toán cấm gộp hai loại chi phí này vào cùng một dòng",
          "COGS biến đổi theo doanh thu, OpEx gần như cố định - phân biệt để đo operating leverage",
          "Vì COGS được trừ thuế còn OpEx thì không, nên thuế phải tính khác nhau",
          "Vì COGS thuộc dòng tiền vận hành còn OpEx thuộc dòng tiền đầu tư"
        ],
        "correct": 1,
        "explanation": "COGS thay đổi theo doanh thu (variable). OpEx ít thay đổi (fixed). Phân biệt để lập kế hoạch Operating Leverage."
      },
      {
        "question": "Operating Leverage cao (OpEx cao tương đối doanh thu) có tốt không?",
        "options": [
          "Luôn tốt vì chi phí cố định cao giúp công ty chịu được các đợt suy thoái kéo dài",
          "Tốt khi doanh thu tăng vì margin tăng nhanh, nguy hiểm khi doanh thu giảm",
          "Luôn xấu vì chi phí cố định làm công ty mất linh hoạt trong mọi chu kỳ",
          "Không liên quan tới doanh thu, chỉ ảnh hưởng tới lãi vay phải trả"
        ],
        "correct": 1,
        "explanation": "High Op Leverage = Doanh thu +10% → OI +20%. Nhưng doanh thu -10% → OI -20%. Rủi ro hai chiều."
      },
      {
        "question": "Vì sao R&D thường được xem là một khoản đầu tư cho tương lai hơn là chi phí thuần túy, dù kế toán vẫn ghi nhận nó vào Operating Expense của kỳ hiện tại?",
        "options": [
          "Vì luật yêu cầu R&D phải ghi nhận khác mọi loại chi phí vận hành khác",
          "Vì R&D luôn mang lại lợi nhuận ngay trong kỳ nên không cần vốn hóa",
          "Vì lợi ích tương lai của R&D quá bất định để vốn hóa, nên ghi thẳng vào chi phí",
          "Vì R&D không ảnh hưởng Net Income, chỉ ảnh hưởng bảng cân đối kế toán"
        ],
        "correct": 2,
        "explanation": "Chuẩn mực kế toán thận trọng: vì lợi ích tương lai từ R&D quá bất định để đo lường đáng tin cậy, R&D được ghi thẳng vào chi phí thay vì vốn hóa thành tài sản như CapEx - dù về bản chất kinh tế, R&D chính là một khoản đầu tư dài hạn."
      }
    ]
  }),
  "net-income-y-nghia": patch({
    "quiz": [
      {
        "question": "Net Income là gì?",
        "options": [
          "Tổng doanh thu công ty ghi nhận được trong kỳ báo cáo, trước mọi chi phí",
          "Tiền mặt công ty thực nhận trong kỳ, sau khi trừ hết các khoản đã chi",
          "Lợi nhuận trước lãi vay và thuế, tức dòng Operating Income của kỳ",
          "Lợi nhuận ròng - phần còn lại của cổ đông sau mọi chi phí và thuế"
        ],
        "correct": 3,
        "explanation": "Net Income = (Revenue - COGS - OpEx - Interest) - Tax. Đây là 'lợi nhuận cuối cùng' trên P&L."
      },
      {
        "question": "Tại sao Net Income được gọi là 'Bottom Line'?",
        "options": [
          "Vì nó là dòng cuối cùng của P&L, sau khi đã trừ mọi chi phí và thuế",
          "Vì nó là chỉ số duy nhất nhà đầu tư cần xem khi đánh giá một doanh nghiệp",
          "Vì nó luôn nằm ở đáy bảng cân đối kế toán, dưới phần vốn chủ sở hữu",
          "Vì nó là mức sàn lợi nhuận mà công ty cam kết đạt được với cổ đông"
        ],
        "correct": 0,
        "explanation": "P&L đọc từ trên xuống: Revenue → Gross Profit → Operating Income → EBT → Net Income. NI là dòng cuối."
      },
      {
        "question": "Net Income dương = công ty lãi, đúng hay sai?",
        "options": [
          "Đúng luôn - Net Income dương thì nghĩa là công ty đang có lãi thật sự trong kỳ",
          "Chưa đủ - cần so với doanh thu (margin) và đối chiếu dòng tiền thực",
          "Sai luôn - Net Income dương chỉ là kết quả của thủ thuật kế toán",
          "Không xác định được vì Net Income không liên quan tới lãi hay lỗ"
        ],
        "correct": 1,
        "explanation": "NI +100 triệu trên doanh thu 5.000 = 2% margin = yếu ớt. NI +100 triệu trên doanh thu 500 = 20% = tốt. Context quan trọng."
      },
      {
        "question": "Giới hạn của Net Income là gì?",
        "options": [
          "Không có giới hạn nào - Net Income đã phản ánh đầy đủ dòng tiền thu chi của kỳ",
          "NI chỉ sai khi công ty có nợ, vì lãi vay được trừ trước khi tính thuế",
          "NI luôn thấp hơn dòng tiền thực, nên chỉ cần cộng lại phần khấu hao",
          "Accrual: NI chứa chi phí không phải tiền (khấu hao) và doanh thu bán chịu"
        ],
        "correct": 3,
        "explanation": "Công ty NI +100 nhưng Cash Flow -50 (dòng tiền âm). NI không nói toàn bộ câu chuyện."
      },
      {
        "question": "EPS (Earnings Per Share) là gì?",
        "options": [
          "EPS = Net Income ÷ số cổ phiếu đang lưu hành = lợi nhuận mỗi cổ phiếu",
          "EPS = Net Income ÷ vốn chủ sở hữu, tức tỷ suất lợi nhuận trên vốn góp",
          "EPS = doanh thu ÷ số cổ phiếu đang lưu hành, đo quy mô trên mỗi cổ phiếu",
          "EPS = cổ tức chia trên mỗi cổ phiếu trong kỳ, sau khi đã trừ thuế cổ tức"
        ],
        "correct": 0,
        "explanation": "EPS = lợi nhuận 'nằm trên' từng cổ phiếu. Nếu NI 1000 triệu, 100M cổ phiếu → EPS = 10 nghìn/cổ phiếu."
      },
      {
        "question": "Tại sao hãng phát triển phần mềm thường có Net Income thấp dù doanh thu cao?",
        "options": [
          "Vì R&D cao đẩy OpEx lên, nhưng đó là đầu tư cho sản phẩm tương lai",
          "Vì phần mềm có COGS rất cao nên Gross Margin bị bóp xuống còn rất mỏng",
          "Vì công ty phần mềm thường vay nhiều nên lãi vay ăn gần hết lợi nhuận",
          "Vì thuế suất áp cho ngành công nghệ cao hơn các ngành sản xuất khác"
        ],
        "correct": 0,
        "explanation": "Software company: Revenue 1000, R&D 600, SG&A 300, khấu hao 50 → EBIT 50 = 5% Net Margin. R&D cao vào sản phẩm tương lai."
      },
      {
        "question": "Net Margin = ?",
        "options": [
          "Net Income ÷ Revenue - tỷ lệ lợi nhuận ròng trên doanh thu",
          "Net Income ÷ COGS - tỷ lệ lợi nhuận trên chi phí vốn hàng bán",
          "Net Income ÷ Operating Expense - lợi nhuận thu về trên mỗi đồng OpEx",
          "Revenue ÷ Net Income - số đồng doanh thu cần để tạo một đồng lãi"
        ],
        "correct": 0,
        "explanation": "Net Margin = NI / Revenue. Nếu NI 100, Revenue 1000 → Net Margin 10%."
      },
      {
        "question": "Nếu Net Income tăng nhưng không phải vì hoạt động kinh doanh (ví dụ: bán bất động sản, tái cấu trúc tài chính), điều này tốt hay tệ?",
        "options": [
          "Tệ - đó là khoản một lần, năm sau không lặp lại; nên xem Operating Income",
          "Tốt - lợi nhuận nào cũng là lợi nhuận, nhà đầu tư không phân biệt nguồn gốc",
          "Không ảnh hưởng vì các khoản một lần đã bị loại khỏi Net Income sẵn rồi",
          "Tốt - bán tài sản chứng tỏ công ty đang tối ưu hóa bảng cân đối kế toán"
        ],
        "correct": 0,
        "explanation": "One-off gains inflate NI nhưng không bền vững. Nhà đầu tư prefer NI từ hoạt động kinh doanh thường xuyên."
      },
      {
        "question": "Tại sao kế toán phân biệt Operating Income và Net Income?",
        "options": [
          "Vì chuẩn mực kế toán bắt buộc phải trình bày đủ cả hai dòng trên báo cáo",
          "Operating = hiệu quả kinh doanh cốt lõi; Net = sau cả lãi vay và thuế",
          "Vì Operating Income chịu thuế còn Net Income thì đã trừ thuế xong rồi",
          "Vì Operating Income thuộc P&L còn Net Income thuộc bảng cân đối kế toán"
        ],
        "correct": 1,
        "explanation": "Operating Income 200 → (Interest 150) → (Tax 8) → Net 42. Operating khỏe nhưng Net yếu vì nợ cao. Phân biệt rõ vấn đề."
      },
      {
        "question": "Để đánh giá sức khỏe kinh doanh thực, nhà đầu tư nên xem gì trước tiên?",
        "options": [
          "Operating Income hoặc EBITDA, rồi Net Margin, rồi đến dòng tiền",
          "Chỉ Net Income, vì đó là con số cuối cùng đã gói đủ mọi thông tin",
          "Chỉ doanh thu, vì doanh thu tăng thì lợi nhuận chắc chắn sẽ tăng theo",
          "Chỉ Gross Profit, vì đó là phần lợi nhuận sạch nhất trên báo cáo"
        ],
        "correct": 0,
        "explanation": "Operating Income/EBITDA sạch. Net Income bị ảnh hưởng cấu trúc vốn. Cash Flow bị ảnh hưởng accrual. Nhìn cả 3 cho toàn cảnh."
      },
      {
        "question": "Một công ty có Net Income tăng trưởng đều 15%/năm trong 3 năm liên tiếp, nhưng phần lớn mức tăng đến từ việc giảm dự phòng nợ xấu (một ước tính kế toán) chứ không phải tăng doanh thu thực. Điều này nói lên điều gì về \"chất lượng lợi nhuận\" (earnings quality)?",
        "options": [
          "Chỉ cần Net Income dương là đủ, nguồn gốc tăng trưởng không quan trọng",
          "Đáng ngờ - tăng trưởng đến từ một ước tính kế toán, không từ kinh doanh",
          "Không liên quan - chất lượng lợi nhuận chỉ xét ở dòng tiền, không ở Net Income",
          "Rất tốt - Net Income tăng đều ba năm là dấu hiệu của doanh nghiệp ổn định"
        ],
        "correct": 1,
        "explanation": "Chất lượng lợi nhuận cao khi tăng trưởng đến từ doanh thu thực và kiểm soát chi phí hiệu quả. Tăng trưởng từ các ước tính kế toán chủ quan (dự phòng, đánh giá lại tài sản) là dấu hiệu cảnh báo cần đào sâu vào ghi chú báo cáo tài chính (financial notes) để hiểu bản chất thực sự."
      }
    ]
  }),
  "balance-sheet-doc": patch({
    "quiz": [
      {
        "question": "Balance Sheet là gì?",
        "options": [
          "Ảnh chụp tại một thời điểm: Assets = Liabilities + Equity",
          "Báo cáo lợi nhuận của cả kỳ, từ doanh thu xuống lợi nhuận ròng",
          "Báo cáo dòng tiền vào ra trong kỳ, chia theo ba nhóm hoạt động",
          "Bảng liệt kê tài sản theo giá thị trường tại ngày lập báo cáo"
        ],
        "correct": 0,
        "explanation": "Balance Sheet: Assets = Liabilities + Equity. Tại ngày 31/12, toàn bộ tài sản và nguồn gốc của chúng."
      },
      {
        "question": "Tại sao gọi là 'Balance Sheet'?",
        "options": [
          "Vì nó cân đối doanh thu với chi phí để tìm ra lợi nhuận của kỳ",
          "Vì A = L + E phải luôn cân; không cân là lỗi hoặc gian lận",
          "Vì nó cân bằng dòng tiền vào và dòng tiền ra trong cùng một kỳ",
          "Vì hai cột trái phải luôn có đúng cùng một số lượng dòng dữ liệu"
        ],
        "correct": 1,
        "explanation": "Từ 'balance' = tính cân bằng. Balance Sheet phải cân bằng, nếu không là lỗi kế toán."
      },
      {
        "question": "Balance Sheet và P&L khác nhau ở điểm nào?",
        "options": [
          "Balance Sheet là cả kỳ; P&L chỉ chụp lại ngày cuối cùng của kỳ đó",
          "Balance Sheet dùng giá thị trường; P&L dùng giá gốc theo sổ sách",
          "Balance Sheet là một thời điểm; P&L là cả một khoảng thời gian",
          "Balance Sheet chỉ dành cho nội bộ; P&L mới là báo cáo công bố ra ngoài"
        ],
        "correct": 2,
        "explanation": "Balance Sheet: ảnh chụp ngày 31/12. P&L: câu chuyện trong cả năm. Khác nhau hoàn toàn."
      },
      {
        "question": "Nếu Balance Sheet không cân bằng (A ≠ L + E), điều này báo hiệu gì?",
        "options": [
          "Bình thường - độ lệch nhỏ luôn được chấp nhận do làm tròn số liệu",
          "Công ty đang lỗ, vì lỗ làm vốn chủ sở hữu nhỏ hơn phần còn lại",
          "Công ty có nợ ngoại bảng, phần chênh chính là số nợ chưa ghi nhận",
          "Lỗi ghi sổ hoặc gian lận - đẳng thức kế toán buộc phải cân"
        ],
        "correct": 3,
        "explanation": "Balance Sheet phải cân bằng. Nếu không = lỗi ghi sổ hoặc gian lận tài chính."
      },
      {
        "question": "Net Income từ P&L liên quan gì đến Balance Sheet?",
        "options": [
          "Net Income cộng thẳng vào Cash, vì lợi nhuận là tiền công ty thu về",
          "Net Income cộng vào Retained Earnings trong phần vốn chủ sở hữu",
          "Không liên quan - hai báo cáo được lập độc lập từ sổ cái kế toán",
          "Net Income làm giảm Liabilities, vì lãi được dùng để trả nợ trước tiên"
        ],
        "correct": 1,
        "explanation": "Nếu NI = 100 triệu năm nay, Retained Earnings tăng 100 triệu (trừ cổ tức chia). P&L & Balance Sheet kết nối qua Retained Earnings."
      },
      {
        "question": "Tại sao nhà đầu tư xem Balance Sheet?",
        "options": [
          "Chỉ để tính số thuế thu nhập doanh nghiệp phải nộp trong kỳ",
          "Để hiểu cấu trúc vốn: nợ, vốn chủ và chất lượng tài sản",
          "Để biết công ty lãi hay lỗ, vì lợi nhuận nằm ở phần vốn chủ",
          "Để dự báo doanh thu năm sau dựa trên quy mô tài sản hiện tại"
        ],
        "correct": 1,
        "explanation": "Balance Sheet cho thấy: công ty nợ quá không, có tiền không, tài sản khỏe không, vốn chủ sở hữu đủ không."
      },
      {
        "question": "Công ty có Assets 1000, Liabilities 600, Equity bằng bao nhiêu?",
        "options": [
          "400 (= 1.000 - 600)",
          "1.600 (= 1.000 + 600)",
          "600 - Equity luôn bằng Liabilities",
          "Không tính được vì thiếu số lợi nhuận giữ lại"
        ],
        "correct": 0,
        "explanation": "A = L + E → 1000 = 600 + E → E = 400."
      },
      {
        "question": "Balance Sheet có structure giống gì?",
        "options": [
          "Trái là Liabilities, phải là Assets; phần Equity nằm ngoài bảng",
          "Trái là Assets, phải là Liabilities + Equity; hai phía luôn cân",
          "Xếp theo thứ tự thời gian giống P&L, từ đầu kỳ xuống cuối kỳ",
          "Không có cấu trúc cố định, mỗi công ty tự chọn cách trình bày riêng"
        ],
        "correct": 1,
        "explanation": "T-account format: trái Assets, phải Liabilities & Equity. Hoặc account format: Assets trên, Liabilities & Equity dưới. Luôn A = L + E."
      },
      {
        "question": "Để so sánh tình hình tài chính công ty năm nay vs năm ngoái, nên xem gì?",
        "options": [
          "So sánh Balance Sheet hai năm: Assets, Equity và đòn bẩy đổi thế nào",
          "Chỉ P&L, vì so sánh lợi nhuận hai năm là đủ để thấy toàn cảnh",
          "Chỉ Cash Flow, vì tiền là thứ duy nhất không thể bị bóp méo bằng kế toán",
          "Không so sánh được vì Balance Sheet chỉ có giá trị tại ngày lập báo cáo"
        ],
        "correct": 0,
        "explanation": "Balance Sheet trend: so sánh 2 năm để thấy công ty có lớn hơn, có nợ quá không, có tiền hơn không."
      },
      {
        "question": "Nếu Assets tăng nhưng phần lớn từ Goodwill (từ mua công ty), tốt hay tệ?",
        "options": [
          "Rất tốt - Goodwill là tài sản vô hình có giá trị nhất trên bảng cân đối",
          "Cảnh báo - Goodwill không tạo dòng tiền, có thể phải ghi impairment",
          "Không liên quan - Goodwill chỉ là bút toán kỹ thuật khi hợp nhất báo cáo",
          "Tốt - Goodwill cao chứng tỏ công ty mua được thương hiệu mạnh giá rẻ"
        ],
        "correct": 1,
        "explanation": "Goodwill cao = overpaid M&A. Nếu M&A fail = Impairment loss on P&L năm sau = trừ Net Income."
      },
      {
        "question": "Vì sao Balance Sheet được gọi là một \"bức ảnh chụp\" (snapshot) trong khi Income Statement và Cash Flow Statement được gọi là \"đoạn phim\" (flow)?",
        "options": [
          "Vì Balance Sheet luôn ngắn hơn hai báo cáo kia nên chỉ chụp được một phần",
          "Vì Balance Sheet phản ánh trạng thái tại một thời điểm, hai báo cáo kia phản ánh biến động trong cả kỳ",
          "Vì Balance Sheet không có số liệu lũy kế, chỉ có số liệu của riêng tháng cuối",
          "Vì ba báo cáo không thật sự khác nhau, chỉ là ba cách trình bày cùng dữ liệu"
        ],
        "correct": 1,
        "explanation": "Đây là điểm phân biệt quan trọng nhất giữa ba báo cáo: Balance Sheet = trạng thái tại một thời điểm (stock), P&L và Cash Flow = biến động trong một khoảng thời gian (flow). Hiểu đúng sự khác biệt này giúp tránh nhầm lẫn khi so sánh số liệu giữa các báo cáo."
      }
    ]
  }),
  "current-non-current-assets": patch({
    "quiz": [
      {
        "question": "Current Assets là gì?",
        "options": [
          "Tài sản có giá trị lớn nhất trên bảng cân đối kế toán, thường là nhà máy và thiết bị",
          "Tài sản sẽ chuyển thành tiền trong 12 tháng: tiền mặt, phải thu, tồn kho",
          "Tài sản cố định dùng để sản xuất, được khấu hao dần qua các năm",
          "Tài sản công ty đang thế chấp cho ngân hàng để vay vốn ngắn hạn"
        ],
        "correct": 1,
        "explanation": "Current Assets = sẽ dùng/bán/tiêu thụ trong 1 năm. Gồm: Cash, Receivables, Inventory."
      },
      {
        "question": "Non-current Assets là gì?",
        "options": [
          "Tài sản có giá trị nhỏ, không đáng kể nên không cần theo dõi riêng biệt",
          "Tài sản đang bị lỗ hoặc mất giá, chờ thanh lý khỏi bảng cân đối",
          "Tài sản giữ lâu hơn 12 tháng: bất động sản, máy móc, bằng sáng chế",
          "Tài sản không thuộc quyền sở hữu công ty nhưng vẫn đang sử dụng"
        ],
        "correct": 2,
        "explanation": "Non-current Assets = Tài sản dài hạn = sẽ giữ >1 năm để tạo doanh thu tương lai."
      },
      {
        "question": "Trong Current Assets, cái nào thanh khoản cao nhất?",
        "options": [
          "Inventory - hàng luôn bán được ngay khi cần tiền",
          "Prepaid - đã trả trước nên có thể lấy lại bất cứ lúc nào",
          "Receivables - khách hàng có nghĩa vụ trả nên coi như tiền",
          "Cash - không cần chuyển đổi, dùng được ngay"
        ],
        "correct": 3,
        "explanation": "Thanh khoản = có bao lâu để chuyển thành tiền. Cash = 0 ngày, Receivables = 30-60 ngày, Inventory = 60-90+ ngày."
      },
      {
        "question": "Working Capital = ?",
        "options": [
          "Current Assets - Current Liabilities = khả năng trả nợ ngắn hạn",
          "Current Assets + Current Liabilities = tổng nguồn vốn ngắn hạn của kỳ",
          "Revenue - COGS = phần lãi gộp dùng để tài trợ hoạt động",
          "Vốn điều lệ chia cho số lao động, tức vốn trên mỗi công nhân"
        ],
        "correct": 0,
        "explanation": "WC = tài sản ngắn hạn - nợ ngắn hạn. Dương = tốt (có khả năng trả nợ). Âm = nguy hiểm."
      },
      {
        "question": "Nếu Working Capital giảm, nguyên nhân có thể là?",
        "options": [
          "Doanh thu tăng, vì doanh thu cao luôn kéo vốn lưu động xuống thấp",
          "Tồn kho hoặc phải thu tăng nhanh, nợ ngắn hạn tăng, hoặc tiền giảm",
          "Lợi nhuận tăng, vì lãi được ghi thẳng vào nợ ngắn hạn phải trả",
          "Công ty trả cổ tức bằng cổ phiếu, làm giảm vốn chủ sở hữu tương ứng"
        ],
        "correct": 1,
        "explanation": "WC giảm = khả năng trả nợ ngắn hạn giảm. Cần kiểm tra: dòng tiền ok, Inventory không bị kẹt, Receivables chưa quá hạn."
      },
      {
        "question": "Current Ratio = ?",
        "options": [
          "Current Assets × 2, tức mức đệm an toàn kép cho các khoản nợ sắp đến hạn",
          "Current Assets - Revenue, phần tài sản không do doanh thu tạo ra",
          "Current Assets ÷ Current Liabilities - trên 1 là tốt, dưới 1 rủi ro",
          "Current Liabilities ÷ Current Assets - càng cao thì càng an toàn"
        ],
        "correct": 2,
        "explanation": "CR = tài sản ngắn hạn / nợ ngắn hạn. Nếu CR 1.5 = 1.5 đồng tài sản đối 1 đồng nợ = có đệm 50%."
      },
      {
        "question": "Inventory là tài sản ngắn hạn hay dài hạn?",
        "options": [
          "Dài hạn - hàng tồn kho là tài sản công ty giữ để sản xuất lâu dài",
          "Vô hình - vì giá trị tồn kho phụ thuộc vào nhu cầu thị trường",
          "Cố định - tồn kho luôn phải duy trì ở một mức tối thiểu nhất định",
          "Ngắn hạn - phần lớn tồn kho được bán trong vòng dưới 1 năm"
        ],
        "correct": 3,
        "explanation": "Inventory = hàng đang chờ bán. Thường bán trong tháng/quý = ngắn hạn. Ngoại lệ: vintage wine, real estate."
      },
      {
        "question": "Tại sao phân biệt Current vs Non-current Assets?",
        "options": [
          "Để đánh giá thanh khoản: Current sắp thành tiền, Non-current dùng lâu dài",
          "Vì chuẩn mực kế toán bắt buộc như vậy, không có ý nghĩa phân tích nào khác",
          "Vì chỉ Current Assets mới được tính vào tổng tài sản của công ty",
          "Vì Non-current Assets không bị khấu hao nên phải trình bày riêng ra"
        ],
        "correct": 0,
        "explanation": "Current Assets là bộ đệm thanh khoản ngắn hạn. Non-current là vốn thực lâu dài để tạo dòng tiền tương lai."
      },
      {
        "question": "Nếu công ty có Current Ratio 0.8 (Current Liabilities > Current Assets), điều này báo hiệu gì?",
        "options": [
          "Bình thường - phần lớn doanh nghiệp vận hành quanh mức 0,8",
          "Nguy hiểm - không đủ tài sản ngắn hạn trả nợ ngắn hạn",
          "Rất tốt - tỷ lệ dưới 1 chứng tỏ công ty dùng vốn rất hiệu quả",
          "Không ảnh hưởng vì Current Ratio chỉ là chỉ số kế toán hình thức"
        ],
        "correct": 1,
        "explanation": "CR < 1 = Insolvency risk (khả năng phá sản). Nếu không cải thiện, công ty sẽ default nợ."
      },
      {
        "question": "Cash Ratio (Cash ÷ Current Liabilities) vs Current Ratio, cái nào bảo thủ hơn?",
        "options": [
          "Current Ratio - vì nó gộp cả ba loại tài sản ngắn hạn vào",
          "Bằng nhau, vì cả hai đều lấy Current Liabilities làm mẫu số",
          "Cash Ratio - chỉ tính tiền, bỏ qua phải thu và tồn kho",
          "Không so sánh được vì hai chỉ số đo hai thứ hoàn toàn khác nhau"
        ],
        "correct": 2,
        "explanation": "Cash Ratio = siêu bảo thủ. CR = bảo thủ hơn Acid-Test Ratio. Acid-Test = moderate. Chọn theo mức độ rủi ro."
      },
      {
        "question": "Goodwill xuất hiện trên Balance Sheet của một công ty khi nào, và vì sao nó không tự nhiên xuất hiện với một công ty tự phát triển nội bộ?",
        "options": [
          "Khi công ty đạt lợi nhuận cao liên tục, thương hiệu được ghi nhận",
          "Mọi công ty đều tự động có goodwill sau 5 năm hoạt động ổn định",
          "Khi công ty tự xây thương hiệu mạnh, giá trị được đánh giá lại hàng năm",
          "Chỉ khi mua lại doanh nghiệp khác với giá cao hơn giá trị tài sản ròng"
        ],
        "correct": 3,
        "explanation": "Goodwill chỉ phát sinh từ M&A: Goodwill = Giá mua − Giá trị tài sản ròng công bằng (fair value) của công ty bị mua. Đây là lý do công ty tự phát triển thương hiệu mạnh (như Google, Vinamilk xây dựng nội bộ) không có goodwill khổng lồ trên sổ sách dù giá trị thương hiệu thực tế rất lớn."
      }
    ]
  }),
  "current-long-term-liabilities": patch({
    "quiz": [
      {
        "question": "Current Liabilities là gì?",
        "options": [
          "Nợ đã quá hạn thanh toán, đang chờ đàm phán lại với chủ nợ",
          "Nợ dài hạn công ty dự định trả trước hạn để giảm chi phí lãi vay",
          "Nợ phải trả trong 12 tháng: nợ ngắn hạn, phải trả người bán, lương, thuế",
          "Nợ phát sinh thường xuyên trong kỳ hoạt động, không phụ thuộc kỳ hạn trả"
        ],
        "correct": 2,
        "explanation": "Current Liabilities = nợ sắp đến hạn <1 năm. Gồm: ST Debt, Payables, Accrued Expense."
      },
      {
        "question": "Long-term Liabilities là gì?",
        "options": [
          "Nợ có giá trị nhỏ nên được xếp xuống cuối bảng cân đối kế toán hợp nhất",
          "Nợ cố định không thay đổi giá trị theo thời gian hay theo lãi suất",
          "Nợ phải trả ngay khi chủ nợ yêu cầu, không có kỳ hạn cụ thể",
          "Nợ phải trả sau 12 tháng: trái phiếu, vay dài hạn, thuế hoãn lại"
        ],
        "correct": 3,
        "explanation": "Long-term Liabilities = nợ sắp đến hạn >1 năm. Gồm: LT Debt, Bonds, Deferred Tax."
      },
      {
        "question": "Tại sao phân biệt Current vs Long-term Liabilities?",
        "options": [
          "Để thấy áp lực thanh toán ngắn hạn: Current là sắp phải trả tiền",
          "Vì chuẩn mực kế toán yêu cầu, không có ý nghĩa phân tích nào",
          "Vì chỉ nợ ngắn hạn mới phải trả lãi, còn nợ dài hạn thì không",
          "Vì nợ dài hạn không được tính vào tổng nợ khi đánh giá đòn bẩy"
        ],
        "correct": 0,
        "explanation": "Current Liabilities áp lực ngắn hạn. Long-term không gấp. Phân biệt để xem công ty có khả năng sống sót qua 12 tháng không."
      },
      {
        "question": "Accounts Payable (khoản phải trả nhà cung cấp) là gì?",
        "options": [
          "Tiền khách hàng còn nợ công ty sau khi mua hàng trả chậm",
          "Chi phí hoạt động đã trả bằng tiền trong kỳ báo cáo",
          "Tiền công ty nợ nhà cung cấp vì đã mua hàng chịu",
          "Tiền công ty đặt trước cho nhà cung cấp để giữ hàng"
        ],
        "correct": 2,
        "explanation": "Payables = bên bán cho công ty nợ tiền hàng. Thường 30-60 ngày để trả. Phần của Current Liabilities."
      },
      {
        "question": "Accrued Expenses là gì?",
        "options": [
          "Chi phí đã phát sinh nhưng chưa chi tiền: lương, tiền điện chưa trả",
          "Chi phí đã chi tiền nhưng chưa phát sinh, như tiền thuê trả trước",
          "Chi phí dự kiến phát sinh kỳ sau, được ghi nhận trước cho thận trọng",
          "Chi phí bị loại khỏi P&L vì chưa có hóa đơn hợp lệ từ nhà cung cấp"
        ],
        "correct": 0,
        "explanation": "Accrued Expenses = chi phí đã phát sinh (obligation) nhưng chưa trả tiền. Phần Current Liabilities."
      },
      {
        "question": "Nợ dài hạn được reclassify sang Current Liabilities khi nào?",
        "options": [
          "Không bao giờ - nợ đã phân loại dài hạn thì giữ nguyên đến khi trả",
          "Khi công ty lỗ, vì lỗ làm toàn bộ nợ trở thành nợ đến hạn ngay",
          "Khi lãi suất thị trường tăng, vì chi phí vay dài hạn đắt lên",
          "Khi còn dưới 12 tháng đến hạn, phần đó chuyển sang Current"
        ],
        "correct": 3,
        "explanation": "Năm 1 vay 3 năm = tất cả ở LT. Năm 2 = 1 năm còn lại được chuyển sang Current, 1 năm ở LT."
      },
      {
        "question": "Nếu Current Liabilities > Current Assets, công ty đang ở tình trạng gì?",
        "options": [
          "Negative Working Capital - không đủ tài sản ngắn hạn trả nợ ngắn hạn",
          "Bình thường, vì nợ ngắn hạn luôn lớn hơn tài sản ngắn hạn",
          "Tốt - nợ ngắn hạn cao chứng tỏ nhà cung cấp tin tưởng công ty tuyệt đối",
          "Cực tốt - dấu hiệu công ty quản lý vốn lưu động hiệu quả tuyệt đối"
        ],
        "correct": 0,
        "explanation": "Negative WC = Solvency risk. Cần xem Cash Flow tạo tiền ra nhanh không. Nếu tệ = phải vay thêm hoặc default."
      },
      {
        "question": "Debt-to-Equity Ratio = ?",
        "options": [
          "Total Liabilities × Equity, tức tổng nguồn vốn công ty huy động",
          "Total Liabilities ÷ Equity - trên 1 nghĩa là nợ nhiều hơn vốn",
          "Net Income ÷ Equity, tức tỷ suất lợi nhuận trên vốn chủ sở hữu",
          "Equity ÷ Total Liabilities - càng cao thì đòn bẩy càng lớn"
        ],
        "correct": 1,
        "explanation": "D/E = Leverage. Nếu D/E 2.0 = nợ gấp 2 lần vốn = rủi ro cao. D/E 0.5 = nợ bằng nửa vốn = bảo thủ."
      },
      {
        "question": "Công ty có Total Liabilities 6000, Equity 3000, D/E ratio = ?",
        "options": [
          "0,5 (= 3.000 / 6.000)",
          "2,0 (= 6.000 / 3.000)",
          "3,0 (= 9.000 / 3.000)",
          "Không tính được vì thiếu tổng tài sản"
        ],
        "correct": 1,
        "explanation": "D/E = 6000 / 3000 = 2.0 = công ty nợ 2 lần vốn = leverage cao = rủi ro."
      },
      {
        "question": "Nếu muốn giảm D/E Ratio, công ty nên làm gì?",
        "options": [
          "Vay thêm nợ dài hạn để thay cho nợ ngắn hạn đang phải trả",
          "Tăng chi phí để giảm lợi nhuận, nhờ đó giảm phần nợ phải trả",
          "Chia cổ tức bằng tiền, vì cổ tức làm giảm cả nợ lẫn vốn chủ",
          "Trả nợ sớm, tăng vốn chủ sở hữu, hoặc giữ lại lợi nhuận"
        ],
        "correct": 3,
        "explanation": "D/E giảm = công ty ít nợ hơn = bảo thủ hơn = rủi ro giảm. Ngân hàng/nhà đầu tư thích D/E thấp."
      },
      {
        "question": "Vì sao các nhà phân tích tín dụng (credit analyst) đặc biệt quan tâm đến \"debt maturity schedule\" (lịch đáo hạn nợ) thay vì chỉ nhìn tổng dư nợ?",
        "options": [
          "Vì nhiều khoản dồn đáo hạn cùng lúc gây rủi ro thanh khoản, dù tổng nợ vừa phải",
          "Vì lịch đáo hạn quyết định số thuế công ty phải nộp trong từng năm",
          "Vì tổng dư nợ không quan trọng, chỉ cần xem chi tiết từng khoản vay",
          "Vì debt maturity schedule là số liệu bắt buộc công bố theo chuẩn mực"
        ],
        "correct": 0,
        "explanation": "\"Maturity wall\" - khi một lượng lớn nợ đáo hạn cùng lúc - buộc công ty phải tái cấp vốn (refinance) một khối lượng lớn trong thời gian ngắn. Nếu điều kiện tín dụng thị trường xấu đi đúng lúc đó, công ty có thể rơi vào khủng hoảng thanh khoản dù tổng nợ không hề tăng."
      }
    ]
  }),
  "yield-to-maturity": patch({
    "quiz": [
      {
        "question": "Trái phiếu mệnh giá 1 triệu, coupon 6%, đang bán ở 950.000đ. YTM so với 6%?",
        "options": [
          "YTM = 6% - giá mua không ảnh hưởng gì, YTM luôn bằng đúng coupon rate",
          "YTM < 6% - trả ít hơn mệnh giá nên nhận lãi ít hơn tương ứng",
          "YTM = 0 - vì chưa đáo hạn nên chưa xác định được lợi suất",
          "YTM > 6% - mua dưới mệnh giá nên có thêm lãi vốn cộng vào coupon"
        ],
        "correct": 3,
        "explanation": "Mua ở 950.000đ → khi đáo hạn nhận 1.000.000đ = capital gain 50.000đ + coupon hàng năm. YTM bao gồm cả hai → cao hơn coupon rate 6%. YTM là con số quan trọng nhất khi so sánh trái phiếu."
      },
      {
        "question": "Một trái phiếu có coupon rate 6% nhưng đang giao dịch ở mức giá cao hơn mệnh giá (premium). YTM của trái phiếu này sẽ như thế nào so với 6%?",
        "options": [
          "Thấp hơn 6% - trả trên mệnh giá nên lỗ vốn khi đáo hạn, kéo lợi suất xuống",
          "Cao hơn 6% - giá cao chứng tỏ thị trường đánh giá trái phiếu này rất tốt nên lợi suất cao",
          "Vẫn đúng 6% - YTM bằng coupon rate bất kể mua ở giá nào",
          "Không xác định được nếu chưa biết kỳ hạn còn lại của trái phiếu"
        ],
        "correct": 0,
        "explanation": "Đây là mối quan hệ đối xứng với trường hợp mua giá chiết khấu: mua trái phiếu ở giá premium (trên mệnh giá) sẽ có YTM thấp hơn coupon rate, vì phần chênh lệch giá bị lỗ khi đáo hạn sẽ kéo lợi suất thực tế xuống dưới mức lãi coupon danh nghĩa."
      }
    ]
  }),
  "private-equity-la-gi": patch({
    "quiz": [
      {
        "question": "PE exit bằng cách nào?",
        "options": [
          "Giữ mãi mãi - quỹ PE không có thời hạn nên không cần thoái vốn",
          "Trả cổ tức đều hàng năm cho nhà đầu tư thay vì phải bán lại doanh nghiệp cho ai",
          "Cho công ty phá sản để xóa nợ, rồi mua lại tài sản với giá thấp",
          "IPO, bán cho strategic buyer, hoặc bán cho PE khác - thường sau 5-7 năm"
        ],
        "correct": 3,
        "explanation": "PE có thời hạn fund thường 10 năm (5-7 năm hold + 2-3 năm raise + exit). Exit options: IPO (thanh khoản cao nhất), strategic sale (thường giá cao nhất vì synergy), secondary buyout (bán cho PE khác). Mỗi exit thể hiện liquidity khác nhau."
      },
      {
        "question": "Vì sao một nhà đầu tư cá nhân muốn tiếp cận lợi nhuận từ Private Equity thường khó khăn hơn nhiều so với đầu tư vào cổ phiếu niêm yết thông thường?",
        "options": [
          "Vốn tối thiểu rất lớn và khóa vốn nhiều năm, chỉ dành cho tổ chức",
          "Bất kỳ ai cũng đầu tư PE dễ như mua cổ phiếu, chỉ cần mở tài khoản",
          "Vì PE luôn có lợi nhuận thấp hơn cổ phiếu niêm yết nên ít ai mua",
          "Vì quỹ PE bị pháp luật cấm nhận vốn từ nhà đầu tư trong nước"
        ],
        "correct": 0,
        "explanation": "Private Equity có rào cản tiếp cận cao (vốn tối thiểu lớn, thanh khoản thấp, thời gian khóa vốn dài) - đây là lý do lợi nhuận cao hơn tiềm năng của PE thường chỉ dành cho nhà đầu tư tổ chức lớn (quỹ hưu trí, quỹ đầu tư quốc gia) và cá nhân siêu giàu, không phải nhà đầu tư đại chúng thông thường."
      }
    ]
  }),
  "pb-la-gi": patch({
    "quiz": [
      {
        "question": "P/B phù hợp nhất để định giá ngành nào?",
        "options": [
          "Retail - vì hàng tồn kho luôn được ghi đúng theo giá thị trường",
          "Pharma - vì chi phí R&D đều được vốn hóa vào giá trị sổ sách",
          "Ngân hàng, bảo hiểm, BĐS - tài sản chiếm phần lớn giá trị",
          "Tech startup - vì giá trị nằm ở tài sản trí tuệ đã ghi nhận"
        ],
        "correct": 2,
        "explanation": "P/B hữu ích khi tài sản trên sổ sách phản ánh đúng giá trị thực (ngân hàng: danh mục cho vay; BĐS: tài sản đất đai). Với tech/software, book value thấp không phản ánh giá trị thương hiệu và IP."
      },
      {
        "question": "Vì sao một ngân hàng có P/B = 0.7 không tự động là một cơ hội đầu tư giá trị hấp dẫn?",
        "options": [
          "P/B dưới 1 luôn là cơ hội tốt, nên mua ngay khi thấy tỷ lệ này xuất hiện",
          "P/B dưới 1 chỉ xảy ra với ngân hàng sắp bị buộc phá sản bắt buộc",
          "Không cần phân tích thêm, P/B thấp thì cứ mua và giữ dài hạn",
          "Cần kiểm tra chất lượng tài sản - nợ xấu chưa trích lập làm sổ sách ảo"
        ],
        "correct": 3,
        "explanation": "P/B thấp có thể là \"value trap\" (bẫy giá trị) nếu giá trị sổ sách công bố không phản ánh đúng chất lượng tài sản thực - đặc biệt quan trọng với ngân hàng nơi phần lớn tài sản là các khoản cho vay có thể ẩn chứa nợ xấu chưa được trích lập đầy đủ."
      }
    ]
  }),
  "debt-to-equity": patch({
    "quiz": [
      {
        "question": "Ngành nào thường chấp nhận D/E cao nhất?",
        "options": [
          "Tech startup - vì tăng trưởng nhanh nên trả nợ được dễ dàng",
          "Retail - vì hàng tồn kho luôn dùng làm tài sản đảm bảo được",
          "Utility (điện, nước, gas) - dòng tiền ổn định, tài sản lớn",
          "Tư vấn - vì chi phí thấp nên lợi nhuận dư trả lãi vay dễ dàng"
        ],
        "correct": 2,
        "explanation": "Utility có dòng tiền rất ổn định và dự báo được, tài sản lớn làm tài sản đảm bảo → chấp nhận D/E cao. Tech startup không có tài sản đảm bảo và dòng tiền không ổn định → D/E thấp."
      },
      {
        "question": "Vì sao một mức D/E được xem là \"an toàn\" với ngành điện lực có thể bị xem là \"cực kỳ rủi ro\" với một startup công nghệ?",
        "options": [
          "Vì công thức tính D/E của hai ngành khác nhau về cách gộp nợ",
          "Mọi ngành nên có D/E giống nhau để nhà đầu tư dễ so sánh với nhau",
          "Vì startup công nghệ không được phép vay nợ theo quy định hiện hành",
          "Vì độ ổn định dòng tiền khác nhau - điện luôn có tiền trả lãi đều"
        ],
        "correct": 3,
        "explanation": "Mức D/E \"an toàn\" luôn phải đánh giá trong bối cảnh ngành: khả năng chịu đựng nợ phụ thuộc vào tính ổn định và dự báo được của dòng tiền tạo ra, không phải một con số tuyệt đối áp dụng chung cho mọi doanh nghiệp."
      }
    ]
  }),
  "current-ratio": patch({
    "quiz": [
      {
        "question": "Current Ratio = 3.0 - dấu hiệu tốt hay xấu?",
        "options": [
          "Luôn tốt - càng cao thì khả năng trả nợ ngắn hạn càng vững chắc",
          "Xấu - tỷ lệ trên 2 nghĩa là công ty đang thiếu nợ để tận dụng đòn bẩy",
          "Có thể tốt hoặc xấu - quá cao có thể là tiền nhàn rỗi hoặc tồn kho ứ",
          "Không có ý nghĩa vì Current Ratio không tính chất lượng tài sản"
        ],
        "correct": 2,
        "explanation": "Current Ratio quá cao (>3) có thể là dấu hiệu: inventory tích lũy (chưa bán được), quản lý vốn kém (giữ tiền mặt không hiệu quả), hoặc thiếu cơ hội đầu tư."
      },
      {
        "question": "Vì sao Current Ratio dưới 1.0 KHÔNG phải lúc nào cũng là dấu hiệu nguy hiểm, đặc biệt với ngành bán lẻ tiêu dùng nhanh?",
        "options": [
          "Vì bán lẻ được phép loại hàng tồn kho ra khỏi công thức tính",
          "Bán lẻ thu tiền ngay nên vẫn đủ tiền trả nợ dù tỷ lệ thấp",
          "Current Ratio dưới 1,0 luôn nguy hiểm, không có ngoại lệ nào cả",
          "Chỉ ngân hàng mới được phép có Current Ratio dưới 1,0 theo quy định"
        ],
        "correct": 1,
        "explanation": "Cần xem Current Ratio trong bối cảnh chu kỳ tiền mặt của từng ngành: doanh nghiệp bán lẻ/siêu thị có Cash Conversion Cycle rất ngắn (thậm chí âm) nên có thể vận hành an toàn với Current Ratio thấp hơn nhiều so với ngưỡng \"an toàn\" thông thường 1.5-2.0 áp dụng cho ngành sản xuất."
      }
    ]
  }),
  "capex-vs-opex": patch({
    "quiz": [
      {
        "question": "Tại sao FCF thường khác Net Income?",
        "options": [
          "Do sai sót kế toán khi lập báo cáo, nên hai con số không bao giờ khớp nhau",
          "Do thuế được tính khác nhau giữa hai chỉ tiêu này trong cùng kỳ",
          "CapEx và thay đổi vốn lưu động không qua P&L nhưng ảnh hưởng tiền thật",
          "Do cổ tức trả cho cổ đông được trừ khỏi FCF nhưng không khỏi lãi"
        ],
        "correct": 2,
        "explanation": "FCF = Net Income + D&A − CapEx − ΔWC. D&A không phải tiền thật (cộng lại). CapEx là tiền thật nhưng không qua P&L ngay (trừ ra). WC thay đổi ảnh hưởng cash nhưng không qua income statement. Vì vậy FCF ≠ Net Income."
      },
      {
        "question": "Vì sao phân biệt đúng CapEx và OpEx quan trọng khi so sánh Free Cash Flow giữa hai công ty cùng ngành?",
        "options": [
          "Không quan trọng, chỉ cần nhìn Net Income là đủ để so sánh hai bên",
          "Chỉ công ty công nghệ mới cần phân biệt CapEx với OpEx khi báo cáo",
          "CapEx và OpEx giống hệt nhau về ảnh hưởng tài chính nên không cần tách",
          "Vì chính sách vốn hóa khác nhau: vốn hóa nhiều thì Net Income đẹp hơn"
        ],
        "correct": 3,
        "explanation": "Chính sách vốn hóa chi phí (như Netflix vốn hóa chi phí sản xuất nội dung) có thể làm Net Income \"đẹp\" hơn thực tế trong ngắn hạn, nhưng dòng tiền thực sự đã chi ra ngay khi CapEx phát sinh - đây là lý do nhà đầu tư tinh ý luôn theo dõi FCF song song với Net Income để có bức tranh đầy đủ."
      }
    ]
  }),
  "risk-free-rate": patch({
    "quiz": [
      {
        "question": "Market Risk Premium lịch sử của Mỹ thường là bao nhiêu?",
        "options": [
          "1-2% - vì cổ phiếu chỉ nhích hơn trái phiếu chính phủ chút ít",
          "10-15% - đúng bằng mức sinh lời trung bình của chỉ số S&P 500",
          "5-7% - con số lịch sử dài hạn thường được dùng",
          "Trên 20% - phần bù rủi ro phải lớn để bù cho biến động cổ phiếu"
        ],
        "correct": 2,
        "explanation": "Equity Risk Premium lịch sử của Mỹ khoảng 5-7%/năm kể từ đầu thế kỷ 20. Damodaran cập nhật hàng năm. Con số này thay đổi theo từng giai đoạn và thường tranh luận trong giới tài chính."
      },
      {
        "question": "Nếu risk-free rate của một quốc gia tăng mạnh (ví dụ do lạm phát cao khiến ngân hàng trung ương phải tăng lãi suất), điều gì thường xảy ra với định giá cổ phiếu trên thị trường đó, các yếu tố khác không đổi?",
        "options": [
          "Không ảnh hưởng gì tới định giá cổ phiếu, chỉ tác động lên trái phiếu",
          "Định giá tăng vì lãi suất cao khiến thị trường hấp dẫn hơn với vốn",
          "Chỉ ảnh hưởng cổ phiếu ngân hàng, các ngành khác gần như không đổi",
          "Định giá giảm - Cost of Equity tăng làm discount rate trong DCF tăng"
        ],
        "correct": 3,
        "explanation": "Đây là kênh truyền dẫn quan trọng nhất giữa chính sách tiền tệ và thị trường chứng khoán: risk-free rate là nền tảng của CAPM và WACC - khi nó tăng, chi phí vốn của MỌI doanh nghiệp tăng theo, kéo giảm định giá DCF trên diện rộng, đây là lý do thị trường chứng khoán thường phản ứng tiêu cực khi ngân hàng trung ương tăng lãi suất mạnh."
      }
    ]
  }),
  "default-risk": patch({
    "quiz": [
      {
        "question": "Tại sao senior secured bonds có recovery rate cao hơn unsecured bonds?",
        "options": [
          "Coupon cao hơn nên trái chủ đã thu về phần lớn vốn trước khi vỡ nợ",
          "Lãi suất thấp hơn nên tổng nghĩa vụ nợ của công ty nhẹ đi nhiều",
          "Kỳ hạn ngắn hơn nên đáo hạn trước khi công ty kịp mất khả năng trả",
          "Có tài sản thế chấp cụ thể - được thanh toán trước các chủ nợ khác"
        ],
        "correct": 3,
        "explanation": "Thứ tự ưu tiên phá sản: Secured creditors → Senior unsecured → Subordinated → Preferred equity → Common equity. Senior secured nhận trung bình 60-80%. Subordinated có thể nhận < 20%. Common equity thường về 0."
      },
      {
        "question": "Vì sao recovery rate (tỷ lệ thu hồi vốn) của trái phiếu có tài sản đảm bảo (secured) thường cao hơn đáng kể so với trái phiếu không có đảm bảo (unsecured), ngay cả khi cùng một công ty vỡ nợ?",
        "options": [
          "Trái phiếu không đảm bảo luôn có recovery rate cao hơn secured",
          "Recovery rate chỉ phụ thuộc quy mô công ty, không phụ thuộc loại nợ",
          "Không có khác biệt về recovery rate giữa hai loại trong cùng vụ",
          "Trái chủ secured được ưu tiên thu hồi từ chính tài sản thế chấp đó"
        ],
        "correct": 3,
        "explanation": "Cấu trúc \"có đảm bảo\" (secured) tạo ra quyền ưu tiên pháp lý rõ ràng đối với một tài sản cụ thể của công ty - đây là lý do trái phiếu secured luôn có recovery rate cao hơn unsecured trong cùng một vụ phá sản, và cũng là lý do chúng thường có lãi suất thấp hơn (rủi ro thấp hơn)."
      }
    ]
  }),
  "working-capital-management": patch({
    "quiz": [
      {
        "question": "Cách nào giúp doanh nghiệp giải phóng vốn lưu động nhanh nhất?",
        "options": [
          "Thu tiền nhanh hơn, giảm tồn kho, trả nhà cung cấp chậm hơn",
          "Tăng doanh thu, vì doanh thu cao thì vốn lưu động tự giải phóng",
          "Tăng lợi nhuận, vì lãi được ghi thẳng vào vốn lưu động của kỳ",
          "Vay thêm ngân hàng, vì tiền vay làm vốn lưu động dương trở lại"
        ],
        "correct": 0,
        "explanation": "Cash Conversion Cycle = DSO + DIO − DPO. Giảm DSO (invoice nhanh, discount), giảm DIO (JIT inventory), tăng DPO (thương lượng điều khoản thanh toán). Amazon có CCC âm - khách trả tiền trước khi Amazon phải trả supplier."
      },
      {
        "question": "Vì sao \"tăng trưởng quá nhanh\" đôi khi lại là nguyên nhân khiến một doanh nghiệp phá sản, dù đang có lãi trên sổ sách?",
        "options": [
          "Vốn lưu động không liên quan gì tới tốc độ tăng trưởng doanh thu",
          "Tăng trưởng cần thêm vốn lưu động; không kịp huy động là hết tiền",
          "Chỉ doanh nghiệp đang thua lỗ mới có rủi ro phá sản, có lãi thì không",
          "Tăng trưởng nhanh không bao giờ gây rủi ro tài chính cho công ty"
        ],
        "correct": 1,
        "explanation": "Đây là hiện tượng \"growing broke\" đã đề cập ở Chặng 3: tăng trưởng đòi hỏi vốn, và nếu công ty không có kế hoạch tài trợ vốn lưu động tương ứng với tốc độ tăng trưởng, ngay cả một doanh nghiệp có lãi và mô hình kinh doanh tốt vẫn có thể hết tiền mặt và phá sản."
      }
    ]
  }),
  "gordon-growth-method": patch({
    "quiz": [
      {
        "question": "Điều gì xảy ra với Terminal Value nếu giả định g (tăng trưởng vĩnh viễn) tiến gần đến WACC?",
        "options": [
          "Giảm về 0, vì tăng trưởng cao làm dòng tiền tương lai mất giá trị",
          "Không đổi, vì g xuất hiện ở cả tử số và mẫu số nên triệt tiêu nhau",
          "Tiến đến vô cực - mẫu số (WACC − g) tiến về 0, kết quả vô nghĩa",
          "Không ảnh hưởng đáng kể, vì Terminal Value luôn bị chiết khấu về sau"
        ],
        "correct": 2,
        "explanation": "Đây là 'bẫy toán học' quan trọng cần tránh: nếu g tiến gần WACC, mẫu số (WACC − g) tiến về 0, khiến Terminal Value tiến về vô cực - một kết quả phi lý về mặt kinh tế. Đây là lý do g luôn phải thấp hơn WACC đáng kể (thường chỉ 2-3% so với WACC 8-12%), và không bao giờ nên giả định g bằng hoặc vượt WACC."
      },
      {
        "question": "Nếu một nhà phân tích vô tình dùng g (tăng trưởng vĩnh viễn) = 6% trong khi WACC của công ty chỉ là 8%, kết quả Terminal Value sẽ bị ảnh hưởng thế nào so với dùng g hợp lý hơn (2-3%)?",
        "options": [
          "Không ảnh hưởng đáng kể vì chênh lệch g giữa hai giả định là nhỏ",
          "Terminal Value sẽ giảm xuống, vì g cao làm chiết khấu mạnh hơn",
          "Bị thổi phồng rất lớn - mẫu số chỉ còn 2% thay vì 5-6%",
          "g càng cao thì định giá càng đáng tin vì phản ánh triển vọng thật"
        ],
        "correct": 2,
        "explanation": "Đây chính xác là \"bẫy toán học\" đã cảnh báo: g gần WACC làm mẫu số (WACC−g) rất nhỏ, thổi phồng Terminal Value một cách phi lý - sai lầm phổ biến này là lý do nhiều mô hình DCF thiếu kinh nghiệm cho ra định giá quá lạc quan không có cơ sở kinh tế vững chắc."
      }
    ]
  }),
  "ebit-operating-income": patch({
    "quiz": [
      {
        "question": "EBIT là gì?",
        "options": [
          "Lợi nhuận ròng còn lại sau khi đã trừ toàn bộ lãi vay và thuế phải nộp trong kỳ báo cáo",
          "EBIT = Earnings Before Interest & Tax - lợi nhuận kinh doanh trước lãi vay và thuế",
          "Tiền mặt công ty tạo ra từ hoạt động kinh doanh trong kỳ báo cáo",
          "Tổng chi phí vận hành công ty phải chịu trước khi tính thuế"
        ],
        "correct": 1,
        "explanation": "EBIT = Operating Income. Tên gọi khác của cùng một thứ. Cho biết hiệu quả kinh doanh thuần."
      },
      {
        "question": "EBIT khác Net Income ở điểm nào?",
        "options": [
          "EBIT luôn lớn hơn Net Income vì nó gồm cả doanh thu tài chính",
          "Net Income luôn lớn hơn EBIT vì được cộng thêm phần hoàn thuế",
          "EBIT chưa trừ lãi vay và thuế; Net Income đã trừ hết",
          "Hai chỉ tiêu giống nhau, chỉ khác tên gọi giữa các chuẩn mực"
        ],
        "correct": 2,
        "explanation": "EBIT phản ánh hoạt động kinh doanh. Net phản ánh lợi nhuận cuối cùng cho cổ đông sau mọi chi phí."
      },
      {
        "question": "Công ty có lợi nhuận ròng âm nhưng EBIT dương. Nguyên nhân?",
        "options": [
          "Kế toán ghi sai, vì EBIT dương thì Net Income không thể âm",
          "Không thể xảy ra - hai chỉ tiêu luôn cùng dấu với nhau",
          "Công ty ghi nhận doanh thu chưa thu tiền nên lợi nhuận bị âm",
          "Lãi vay và thuế quá cao khiến Net Income âm dù EBIT dương"
        ],
        "correct": 3,
        "explanation": "EBIT = 100, Lãi vay = 150 → Net = -50. Có thể xảy ra nếu công ty nợ quá cao."
      },
      {
        "question": "EBIT Margin là gì?",
        "options": [
          "EBIT / Revenue - hiệu quả vận hành thuần, bằng Operating Margin",
          "EBIT / Tổng tài sản - hiệu suất sinh lời của toàn bộ tài sản",
          "Gross Profit / Revenue - phần lãi gộp còn lại trên mỗi đồng doanh thu",
          "EBIT / Vốn chủ sở hữu - lợi nhuận vận hành trên vốn cổ đông góp"
        ],
        "correct": 0,
        "explanation": "EBIT Margin = EBIT / Revenue. Nếu EBIT Margin 15% = mỗi 100 doanh thu, 15 là lợi nhuận vận hành."
      },
      {
        "question": "Công ty A: Revenue 1000, EBIT 200. EBIT Margin = ?",
        "options": [
          "200% (= 1.000/200 quy về phần trăm)",
          "20% (= 200/1.000)",
          "50% (= 200/400 phần lãi gộp)",
          "Không tính được vì thiếu số COGS"
        ],
        "correct": 1,
        "explanation": "EBIT Margin = 200/1000 = 20% = 0.2."
      },
      {
        "question": "Nếu muốn so sánh hoạt động kinh doanh 2 công ty có lãi vay & cấu trúc thuế khác nhau, nên dùng?",
        "options": [
          "Net Income, vì đó là con số cuối cùng sau mọi chi phí đã trừ",
          "Revenue, vì doanh thu không bị ảnh hưởng bởi cấu trúc vốn",
          "EBIT hoặc EBITDA - loại bỏ tác động của lãi vay và thuế",
          "Gross Profit, vì nó nằm trên cả lãi vay và chi phí vận hành"
        ],
        "correct": 2,
        "explanation": "EBIT sạch vì loại bỏ tất cả những gì không liên quan hoạt động kinh doanh cốt lõi."
      },
      {
        "question": "EBITDA vs EBIT, khác nhau ở điểm nào?",
        "options": [
          "EBIT cộng lại D&A còn EBITDA thì giữ nguyên chi phí khấu hao",
          "EBITDA đã trừ thuế còn EBIT thì chưa trừ thuế phải nộp",
          "Hai chỉ tiêu giống nhau, EBITDA chỉ là cách gọi ở Mỹ",
          "EBITDA cộng lại D&A; EBIT vẫn tính khấu hao vào chi phí"
        ],
        "correct": 3,
        "explanation": "EBITDA = EBIT + D&A. Dùng để so sánh khi D&A khác nhau (do tài sản khác nhau)."
      },
      {
        "question": "Công ty bán được nhiều hơn nhưng EBIT giảm. Nguyên nhân có thể là?",
        "options": [
          "COGS tăng nhanh hơn doanh thu, hoặc chi phí vận hành tăng",
          "Kế toán ghi sai, vì bán được nhiều hơn thì EBIT phải tăng theo",
          "Lãi vay tăng, vì lãi vay được trừ trước khi ra EBIT",
          "Thuế suất tăng, làm giảm lợi nhuận vận hành của công ty"
        ],
        "correct": 0,
        "explanation": "EBIT = Revenue - COGS - OpEx. Nếu giảm khi Revenue tăng → COGS hoặc OpEx tăng quá nhanh."
      },
      {
        "question": "Nhà đầu tư quan tâm gì nhất trong EBIT?",
        "options": [
          "Giá trị tuyệt đối của EBIT, vì số càng lớn thì công ty càng tốt",
          "EBIT Margin và xu hướng của nó - vận hành có cải thiện không",
          "Chỉ cần EBIT dương hay âm, mức độ không quan trọng lắm",
          "Không quan trọng, vì EBIT chưa phản ánh lợi nhuận cổ đông"
        ],
        "correct": 1,
        "explanation": "Absolute EBIT ít ý nghĩa nếu không biết margin. EBIT Margin 5% vs 15% kể câu chuyện khác nhau."
      },
      {
        "question": "EBIT dùng để tính chỉ tiêu nào quan trọng?",
        "options": [
          "Gross Margin = EBIT chia doanh thu thuần của kỳ báo cáo hiện tại",
          "Chỉ dùng để tính doanh thu ước tính cho kỳ kế tiếp",
          "Interest Coverage Ratio = EBIT / Lãi vay - khả năng trả lãi",
          "Không dùng để tính chỉ tiêu nào, EBIT chỉ để trình bày"
        ],
        "correct": 2,
        "explanation": "ICR = EBIT / Interest Expense. Nhà băng xem ICR để quyết định cho vay hay không."
      },
      {
        "question": "Công ty A và B có cùng EBIT nhưng công ty A vay nợ nhiều hơn nhiều so với B. So sánh EBIT giữa hai công ty này có công bằng hơn so sánh Net Income không?",
        "options": [
          "Không, vì Net Income luôn là chỉ số tốt nhất để so sánh",
          "Có - EBIT loại bỏ ảnh hưởng của cơ cấu vốn khác nhau",
          "Không, vì EBIT không phản ánh hiệu quả vận hành thực tế",
          "Cả EBIT và Net Income đều không dùng để so sánh được"
        ],
        "correct": 1,
        "explanation": "Đây chính là lý do EBIT tồn tại: bằng cách bỏ qua lãi vay và thuế - hai yếu tố phụ thuộc vào quyết định tài trợ vốn (financing decision) chứ không phải hiệu quả vận hành - EBIT cho một sân chơi công bằng để so sánh các công ty có cơ cấu vốn khác nhau."
      }
    ]
  }),
  "chinh-sach-tien-te": patch({
    "quiz": [
      {
        "question": "QE (Quantitative Easing) là gì?",
        "options": [
          "Tăng lãi suất điều hành để hút tiền khỏi hệ thống ngân hàng",
          "Tăng tỷ lệ dự trữ bắt buộc để giảm khả năng cho vay của bank",
          "Phá giá đồng nội tệ để hỗ trợ xuất khẩu và tăng tổng cầu",
          "Fed mua trái phiếu để bơm tiền, giảm lãi suất dài hạn"
        ],
        "correct": 3,
        "explanation": "QE: khi lãi suất đã về 0 (zero lower bound), Fed mua Treasuries và MBS → bơm tiền, giảm lãi dài hạn. Dùng sau khủng hoảng 2008 và COVID-2020. QT (Quantitative Tightening) là ngược lại."
      },
      {
        "question": "Vì sao chính sách tiền tệ thường được xem là có \"độ trễ\" đáng kể - nghĩa là tác động của việc tăng/giảm lãi suất không xuất hiện ngay lập tức mà mất nhiều tháng mới thẩm thấu vào nền kinh tế?",
        "options": [
          "Vì quyết định vay và đầu tư thực cần thời gian để triển khai",
          "Chính sách tiền tệ có tác động tức thì, không hề có độ trễ nào",
          "Độ trễ chỉ xảy ra ở các nước đang phát triển, không ở Mỹ",
          "Vì các ngân hàng thương mại cố tình trì hoãn thực hiện"
        ],
        "correct": 0,
        "explanation": "Độ trễ chính sách tiền tệ (thường 6-18 tháng) là lý do các ngân hàng trung ương phải đưa ra quyết định dựa trên DỰ BÁO tương lai chứ không chỉ dữ liệu hiện tại - một thách thức lớn vì họ phải hành động trước khi thấy rõ kết quả."
      }
    ]
  }),
  "npv-co-ban": patch({
    "quiz": [
      {
        "question": "Điều gì làm NPV nhạy cảm nhất?",
        "options": [
          "Discount rate và dự báo dòng tiền - sai nhỏ cho kết quả rất khác",
          "Số năm dự án, vì dự án càng dài thì NPV càng lớn theo tỷ lệ thuận",
          "Chi phí đầu tư ban đầu, vì đó là con số duy nhất chắc chắn",
          "Thuế suất, vì thuế quyết định phần lớn dòng tiền sau cùng"
        ],
        "correct": 0,
        "explanation": "NPV nhạy cảm với: (1) discount rate - tăng 2% có thể đổi NPV từ dương sang âm; (2) dự báo FCF - optimistic bias phổ biến trong corporate finance. Sensitivity analysis bắt buộc."
      },
      {
        "question": "Một dự án có NPV = 0 chính xác (không dương không âm). Điều này có nghĩa gì về mặt kinh tế?",
        "options": [
          "NPV = 0 nghĩa là dự án sẽ lỗ đúng bằng vốn đầu tư ban đầu",
          "Dự án sinh lời đúng bằng chi phí vốn - hòa vốn về kinh tế",
          "Dự án hoàn toàn không đáng thực hiện vì không tạo lợi nhuận",
          "NPV = 0 không thể xảy ra trong thực tế vì luôn có sai số"
        ],
        "correct": 1,
        "explanation": "NPV = 0 là điểm cân bằng: dự án sinh lời chính xác bằng với những gì nhà đầu tư có thể kiếm được từ một khoản đầu tư khác cùng mức rủi ro - không tệ, nhưng cũng không có lý do đặc biệt để ưu tiên dự án này."
      }
    ]
  }),
  "equity-value-vs-enterprise-value": patch({
    "quiz": [
      {
        "question": "Khi tính các chỉ số định giá như EV/EBITDA thay vì P/E, vì sao cần dùng EV thay vì Equity Value?",
        "options": [
          "Vì EV luôn cho ra kết quả định giá đẹp hơn P/E thông thường",
          "Vì chuẩn mực kế toán yêu cầu dùng EV cho mọi hệ số định giá",
          "Vì EBITDA thuộc về mọi nhà đầu tư nên phải khớp với EV",
          "EV/EBITDA và P/E dùng thay thế nhau tùy ý, không có quy tắc"
        ],
        "correct": 2,
        "explanation": "Nguyên tắc định giá quan trọng: tử số và mẫu số phải cùng 'phạm vi' đối tượng thụ hưởng. P/E dùng Equity Value (giá cổ phiếu) so với Earnings (lợi nhuận sau lãi vay - chỉ thuộc về cổ đông). EV/EBITDA dùng EV (toàn bộ doanh nghiệp) so với EBITDA (trước lãi vay)."
      },
      {
        "question": "Một nhà phân tích nhầm lẫn dùng Enterprise Value thay vì Equity Value khi tính P/E ratio (đáng lẽ P/E = Equity Value / Net Income). Sai lầm này ảnh hưởng thế nào đến kết quả, đặc biệt với công ty có nợ vay lớn?",
        "options": [
          "Sai lầm này chỉ ảnh hưởng với công ty hoàn toàn không có nợ",
          "Không ảnh hưởng gì vì EV và Equity Value luôn bằng nhau",
          "P/E sẽ chính xác hơn khi dùng EV vì EV bao quát hơn",
          "P/E bị thổi phồng - EV cao hơn Equity Value khi nợ lớn"
        ],
        "correct": 3,
        "explanation": "Đây là lỗi \"trộn phạm vi\" kinh điển trong định giá - P/E phải dùng Equity Value (thuộc về cổ đông) chia cho Net Income (lợi nhuận sau khi đã trả chủ nợ, cũng thuộc về cổ đông); dùng nhầm EV (bao gồm cả phần thuộc về chủ nợ) làm hệ số bị thổi phồng."
      }
    ]
  }),
  "dcf-la-gi-day133": patch({
    "quiz": [
      {
        "question": "Vì sao DCF được xem là phương pháp định giá 'tuyệt đối' trong khi Comps và Precedent Transaction là 'tương đối'?",
        "options": [
          "Vì DCF chỉ áp dụng được cho công ty đã niêm yết trên sàn",
          "Vì DCF dựng giá trị từ nội tại công ty, không tham chiếu công ty khác",
          "Vì DCF không cần bất kỳ giả định nào nên kết quả khách quan",
          "Vì DCF luôn cho kết quả chính xác tuyệt đối trong mọi trường hợp và mọi ngành"
        ],
        "correct": 1,
        "explanation": "Comps và Precedent Transaction đều là định giá TƯƠNG ĐỐI - dựa vào cách thị trường định giá công ty khác. DCF là định giá TUYỆT ĐỐI - xây dựng giá trị hoàn toàn từ nội tại công ty (dự báo dòng tiền, rủi ro riêng, chi phí vốn)."
      },
      {
        "question": "Một nhà phân tích xây dựng hai mô hình DCF cho cùng một công ty, chỉ khác nhau ở giả định tỷ lệ tăng trưởng doanh thu 5 năm tới (8% vs 12%). Kết quả định giá có thể chênh lệch bao nhiêu, và điều này nói lên điều gì về bản chất của DCF?",
        "options": [
          "Kết quả giống hệt nhau vì chỉ khác nhau một giả định nhỏ",
          "DCF luôn cho kết quả chính xác bất kể giả định đầu vào nào được dùng",
          "Chênh lệch rất lớn (20-50%+) - DCF phản ánh chất lượng giả định",
          "Tăng trưởng doanh thu không ảnh hưởng đáng kể tới kết quả DCF"
        ],
        "correct": 2,
        "explanation": "Đây là bản chất quan trọng cần ghi nhớ về DCF: \"garbage in, garbage out\" - độ chính xác của kết quả hoàn toàn phụ thuộc vào chất lượng giả định đầu vào, không phải bản thân công thức."
      }
    ]
  }),
  "npv-vs-payback": patch({
    "quiz": [
      {
        "question": "Khi nào Payback Period có giá trị thực tế?",
        "options": [
          "Với dự án dài hạn, vì Payback đo được cả giá trị tạo ra sau khi hoàn vốn",
          "Luôn dùng thay cho NPV vì Payback đơn giản và trực quan hơn",
          "Không bao giờ - Payback không có giá trị thực tế nào cả",
          "Khi cần đánh giá rủi ro thanh khoản - tiền phải về trước khi cạn"
        ],
        "correct": 3,
        "explanation": "Payback hữu ích để đánh giá: (1) rủi ro thanh khoản - công ty cần tiền về sớm; (2) độ chắc chắn - dự án nhanh ít bất định hơn. Nhưng không nên dùng thay thế NPV để ra quyết định đầu tư."
      },
      {
        "question": "Nếu một công ty CHỈ dùng Payback Period để quyết định đầu tư, loại dự án nào có nguy cơ bị bỏ lỡ nhiều nhất?",
        "options": [
          "Các dự án ngắn hạn có lợi nhuận ổn định và hoàn vốn nhanh",
          "Chỉ các dự án rủi ro cao mới bị ảnh hưởng bởi tiêu chí này",
          "Dự án dài hạn giá trị lớn nhưng lâu sinh lời: R&D, hạ tầng",
          "Không có loại dự án nào bị bỏ lỡ vì Payback đã đủ toàn diện"
        ],
        "correct": 2,
        "explanation": "Đây là lý do các công ty chỉ dùng Payback Period thường bỏ lỡ các khoản đầu tư chiến lược dài hạn (R&D đột phá, xây dựng thương hiệu, hạ tầng công nghệ) - những dự án này thường có Payback Period dài nhưng NPV thực sự rất lớn."
      }
    ]
  }),
  "gia-trai-phieu-va-lai-suat": patch({
    "quiz": [
      {
        "question": "Trái phiếu 10 năm hay 1 năm nhạy cảm hơn với lãi suất?",
        "options": [
          "1 năm - kỳ hạn ngắn nên giá phản ứng nhanh và mạnh hơn",
          "Như nhau, vì lãi suất tác động đồng đều lên mọi trái phiếu",
          "10 năm - duration dài hơn nên giá biến động mạnh hơn",
          "Phụ thuộc coupon rate, kỳ hạn không liên quan tới độ nhạy"
        ],
        "correct": 2,
        "explanation": "Duration (thời lượng) đo độ nhạy cảm của giá trái phiếu với lãi suất. Duration 10 năm: lãi suất tăng 1% → giá giảm ~10%. Duration 1 năm: giá giảm ~1%. Trái phiếu dài hạn = rủi ro lãi suất cao hơn."
      },
      {
        "question": "Trái phiếu kỳ hạn 30 năm và trái phiếu kỳ hạn 2 năm cùng có coupon 5%. Khi lãi suất thị trường tăng 1%, trái phiếu nào giảm giá mạnh hơn?",
        "options": [
          "Trái phiếu 2 năm giảm mạnh hơn vì phải tái đầu tư sớm hơn",
          "Cả hai giảm như nhau vì có cùng mức coupon 5% giống nhau",
          "Không có liên hệ giữa kỳ hạn và độ nhạy cảm với lãi suất",
          "Trái phiếu 30 năm giảm mạnh hơn - duration dài hơn nhiều"
        ],
        "correct": 3,
        "explanation": "Đây là khái niệm Duration sẽ học chi tiết sau: trái phiếu kỳ hạn càng dài, giá càng nhạy cảm với biến động lãi suất, vì có nhiều dòng tiền tương lai hơn phải chiết khấu lại theo mức lãi suất mới."
      }
    ]
  }),
  "operating-margin": patch({
    "quiz": [
      {
        "question": "Doanh nghiệp nào có Operating Margin cao nhất thường?",
        "options": [
          "Hàng không - vì giá vé cao và chi phí biên mỗi khách rất thấp",
          "Siêu thị - vì vòng quay hàng nhanh nên lợi nhuận tích lũy cao",
          "Xây dựng - vì hợp đồng lớn nên lợi nhuận trên mỗi dự án cao",
          "Software/SaaS - chi phí biên gần 0 khi mở rộng quy mô"
        ],
        "correct": 3,
        "explanation": "Software/SaaS có operating margin rất cao (thường 20-40%+) vì chi phí để phục vụ thêm một khách hàng gần như bằng 0. Ngược lại, ngành vận tải, bán lẻ, xây dựng có margin thấp."
      },
      {
        "question": "Vì sao khoảng cách giữa Gross Margin và Operating Margin của một công ty là một thông tin đáng giá cần theo dõi?",
        "options": [
          "Khoảng cách lớn = chi phí vận hành đang ăn nhiều lãi gộp",
          "Khoảng cách này không có ý nghĩa phân tích gì đáng chú ý",
          "Chỉ cần nhìn Operating Margin, không cần quan tâm Gross Margin",
          "Khoảng cách luôn cố định ở mọi công ty nên không cần theo dõi"
        ],
        "correct": 0,
        "explanation": "Theo dõi cả hai margin cùng lúc cho một bức tranh đầy đủ hơn: Gross Margin cho biết hiệu quả sản xuất/mua hàng, khoảng cách với Operating Margin cho biết công ty có đang kiểm soát chi phí bán hàng và quản lý hiệu quả hay không."
      }
    ]
  }),
  "credit-rating": patch({
    "quiz": [
      {
        "question": "Fallen Angel là gì?",
        "options": [
          "Trái phiếu bị hạ từ Investment Grade xuống High-Yield",
          "Trái phiếu chính phủ phát hành với lãi suất thấp hơn thị trường",
          "Trái phiếu đã vỡ nợ và đang trong quá trình tái cấu trúc",
          "Trái phiếu coupon cao do doanh nghiệp mới thành lập phát hành"
        ],
        "correct": 0,
        "explanation": "Fallen Angel: từng là investment grade, bị hạ xuống junk (BB hoặc thấp hơn). Nhiều quỹ có mandate chỉ giữ IG → phải bán → giá giảm mạnh dù doanh nghiệp vẫn khả thi. Đây có thể là cơ hội mua nếu downgrade là quá mức."
      },
      {
        "question": "Vì sao một trái phiếu bị hạ bậc tín nhiệm từ Investment Grade xuống High-Yield (junk) thường gây ra một đợt bán tháo mạnh, vượt xa mức độ rủi ro thực tế mới tăng thêm?",
        "options": [
          "Việc hạ bậc tín nhiệm không ảnh hưởng gì tới hành vi của quỹ tổ chức",
          "Vì nhiều quỹ chỉ được giữ Investment Grade nên buộc phải bán",
          "Vì đây chỉ là phản ứng cảm tính, không có cơ sở nào cả",
          "Vì trái phiếu junk luôn có giá trị thu hồi bằng 0 khi vỡ nợ"
        ],
        "correct": 1,
        "explanation": "Đây là hiện tượng \"fallen angel\" - khi trái phiếu Investment Grade bị hạ xuống High-Yield, các quy định đầu tư bắt buộc của nhiều quỹ tổ chức lớn kích hoạt làn sóng bán bắt buộc, tạo ra áp lực giá giảm mạnh hơn nhiều so với thay đổi rủi ro thực."
      }
    ]
  }),
  "no-co-loi-ich-gi": patch({
    "quiz": [
      {
        "question": "Nếu lãi suất vay 8%, thuế suất 20%, cost of debt after-tax là bao nhiêu?",
        "options": [
          "1,6% = 8% × 20% (phần thuế tiết kiệm)",
          "10% = 8% ÷ (1 − 20%)",
          "8% - thuế không ảnh hưởng chi phí nợ",
          "6,4% = 8% × (1 − 20%)"
        ],
        "correct": 3,
        "explanation": "After-tax cost of debt = Kd × (1 − T) = 8% × 0.8 = 6.4%. Đây là chi phí thực vì lãi vay được khấu trừ thuế. Đây là lý do WACC dùng after-tax cost of debt."
      },
      {
        "question": "Nếu chính phủ tăng thuế suất doanh nghiệp từ 20% lên 25%, giá trị của lá chắn thuế từ nợ vay (tax shield) sẽ thay đổi thế nào?",
        "options": [
          "Giảm xuống, vì thuế suất cao hơn làm chi phí thực của khoản nợ đắt hơn",
          "Không ảnh hưởng gì tới giá trị lá chắn thuế của khoản nợ",
          "Chỉ ảnh hưởng nếu công ty đang thua lỗ và không phải nộp thuế",
          "Tăng - Tax Shield = Lãi vay × Thuế suất, thuế cao thì tiết kiệm nhiều"
        ],
        "correct": 3,
        "explanation": "Công thức Tax Shield = Interest Expense × Tax Rate cho thấy mối quan hệ thuận: thuế suất càng cao, giá trị tiết kiệm thuế từ mỗi đồng lãi vay càng lớn - đây là lý do ở các quốc gia có thuế suất doanh nghiệp cao, doanh nghiệp thường dùng nhiều nợ hơn."
      }
    ]
  }),
  "interest-tax-expense": patch({
    "quiz": [
      {
        "question": "Interest Expense là gì?",
        "options": [
          "Tiền bán hàng công ty nhận được từ khách hàng trong kỳ báo cáo",
          "Chi phí lãi vay - tiền phải trả cho bên cho vay vì khoản nợ",
          "Chi phí hoạt động thường xuyên nằm trong nhóm OpEx của kỳ",
          "Tiền công ty cho vay lại và nhận lãi từ bên thứ ba"
        ],
        "correct": 1,
        "explanation": "Interest = lãi vay. Phụ thuộc nợ × lãi suất. Công ty càng nợ, Interest Expense càng cao."
      },
      {
        "question": "Tax Expense là gì?",
        "options": [
          "Chi phí bao bì và vận chuyển, thuộc nhóm chi phí bán hàng",
          "Chi phí vận hành nằm trong OpEx, trừ trước khi ra EBIT",
          "Không phải chi phí mà là khoản phân phối lợi nhuận cho nhà nước",
          "Thuế phải nộp, tính từ lợi nhuận trước thuế (EBT) × thuế suất"
        ],
        "correct": 3,
        "explanation": "Tax Expense = EBT × Tax Rate. Nếu Tax Rate 20%, EBT 100 → Tax = 20."
      },
      {
        "question": "EBT là gì?",
        "options": [
          "Earnings Before Tax = EBIT − Interest, lợi nhuận trước thuế",
          "Earnings Before Total, tức doanh thu trước mọi khoản giảm trừ",
          "Earnings Business Total, tổng lợi nhuận của các mảng kinh doanh",
          "Lợi nhuận sau thuế nhưng trước khi chia cổ tức cho cổ đông"
        ],
        "correct": 0,
        "explanation": "EBT = EBIT - Interest = lợi nhuận sau lãi vay nhưng trước thuế."
      },
      {
        "question": "Net Income = ?",
        "options": [
          "Revenue − COGS, tức lợi nhuận gộp của kỳ báo cáo",
          "EBT − Tax = EBIT − Interest − Tax, lợi nhuận cuối cùng",
          "EBIT, vì lãi vay và thuế đã được trừ ở các dòng trên",
          "EBT − Interest, vì lãi vay luôn được trừ sau khi đã tính thuế"
        ],
        "correct": 1,
        "explanation": "Net Income = EBT - Tax = (Revenue - COGS - OpEx - Interest) - Tax."
      },
      {
        "question": "Công ty A: EBIT 200, Interest 50, Tax Rate 20%. Net Income = ?",
        "options": [
          "150 (= 200 − 50, chưa trừ thuế)",
          "100 (= 200 × (1 − 0,2) − 50, sai thứ tự)",
          "120 (= (200 − 50) × (1 − 0,2))",
          "160 (= 200 × (1 − 0,2))"
        ],
        "correct": 2,
        "explanation": "EBT = 200 - 50 = 150. Tax = 150 × 20% = 30. NI = 150 - 30 = 120."
      },
      {
        "question": "Nếu công ty có nợ cao (Interest cao), tác động gì?",
        "options": [
          "Tốt cho cổ đông vì lá chắn thuế bù lại toàn bộ lãi vay",
          "Không ảnh hưởng vì lãi vay nằm dưới dòng Net Income",
          "Tốt, vì nợ cao chứng tỏ ngân hàng tin tưởng công ty",
          "EBT thấp → Net Income thấp → phần cổ đông giảm mạnh"
        ],
        "correct": 3,
        "explanation": "High Leverage = Interest high → Net Income thấp. Rủi ro: nếu EBIT giảm, cổ đông phải chịu mất mát nặng."
      },
      {
        "question": "Nếu muốn tăng Net Income, công ty nên làm gì?",
        "options": [
          "Tăng EBIT, giảm lãi vay bằng cách trả nợ, hoặc tối ưu thuế",
          "Chỉ cần tăng Revenue, vì doanh thu là thứ quyết định lợi nhuận cuối",
          "Tăng nợ, vì lá chắn thuế làm Net Income tăng theo lãi vay",
          "Không làm gì được, Net Income do thị trường quyết định"
        ],
        "correct": 0,
        "explanation": "NI = (EBIT - Interest) × (1 - Tax Rate). Tăng EBIT hoặc giảm Interest đều tăng NI."
      },
      {
        "question": "Tại sao nhà đầu tư quan tâm tỷ lệ EBIT/Interest (ICR)?",
        "options": [
          "Không cần quan tâm vì ICR chỉ là chỉ số kế toán nội bộ",
          "ICR phản ánh khả năng trả lãi - dưới 1,5 là nguy hiểm",
          "Chỉ ngân hàng quan tâm, nhà đầu tư cổ phiếu không cần biết",
          "ICR đo tốc độ tăng trưởng lợi nhuận qua các năm liên tiếp"
        ],
        "correct": 1,
        "explanation": "ICR = EBIT / Interest. Nếu ICR 1.5 = chỉ đủ trả lãi, không còn gì cho cổ đông. Nếu ICR 5 = rất an toàn."
      },
      {
        "question": "Tax Rate tăng từ 20% lên 25%, tác động gì?",
        "options": [
          "Không ảnh hưởng vì thuế nằm ngoài báo cáo kết quả",
          "Cổ đông được lợi vì lá chắn thuế từ nợ tăng giá trị",
          "Net Income giảm vì phải nộp thuế cao hơn",
          "Tốt, vì thuế cao chứng tỏ công ty đang lãi nhiều hơn"
        ],
        "correct": 2,
        "explanation": "Nếu EBT ổn định, Tax Rate ↑ → Tax Expense ↑ → NI ↓."
      },
      {
        "question": "Công ty có Net Income dương nhưng lộ nguy hiểm là gì?",
        "options": [
          "EBIT thấp, vì EBIT thấp thì Net Income không thể dương",
          "Doanh thu giảm, vì doanh thu giảm luôn kéo NI xuống âm",
          "COGS cao, vì COGS cao thì thuế phải nộp cũng cao theo",
          "Lãi vay quá cao - NI dương nhưng phần cổ đông rất nhỏ"
        ],
        "correct": 3,
        "explanation": "Nếu EBIT 100, Interest 80, Tax 4 → NI = 16. Net Income dương nhưng phần cổ đông rất nhỏ vì Interest cao."
      },
      {
        "question": "Vì sao \"lá chắn thuế\" (tax shield) từ lãi vay lại được xem là một lợi ích, dù về bản chất công ty vẫn đang phải trả tiền lãi thực sự cho ngân hàng?",
        "options": [
          "Vì lãi vay được khấu trừ trước thuế, giảm số thuế phải nộp",
          "Vì ngân hàng miễn một phần lãi cho công ty vay nhiều",
          "Vì lãi vay không cần trả thật, chỉ là bút toán kế toán",
          "Vì lãi vay luôn thấp hơn số thuế công ty phải nộp trong kỳ"
        ],
        "correct": 0,
        "explanation": "Nếu thuế suất là 20%, mỗi 100 đồng lãi vay giúp công ty tiết kiệm 20 đồng thuế phải nộp - chi phí lãi vay \"thực\" chỉ còn 80 đồng sau thuế. Đây là lý do nợ có chi phí thấp hơn vốn chủ sở hữu."
      }
    ]
  }),
  "on-tap-tai-chinh-doanh-nghiep": patch({
    "quiz": [
      {
        "question": "Tại sao WACC quan trọng với mọi quyết định tài chính?",
        "options": [
          "WACC là hurdle rate - dự án phải sinh lợi hơn WACC mới tạo giá trị",
          "Vì WACC dễ tính nên được dùng làm chuẩn chung cho mọi ngành và mọi dự án",
          "Vì kế toán cần WACC để lập báo cáo tài chính cuối năm",
          "Vì ngân hàng yêu cầu công bố WACC khi xét cấp hạn mức vay"
        ],
        "correct": 0,
        "explanation": "WACC là chi phí vốn trung bình -'giá tối thiểu' của mọi đồng vốn huy động. Đầu tư dưới WACC = phá hủy giá trị dù có lợi nhuận. WACC thay đổi theo cơ cấu vốn, lãi suất thị trường, rủi ro doanh nghiệp."
      },
      {
        "question": "Sau khi học Chặng 6, vì sao hiểu về M&A, LBO, VC/PE lại quan trọng ngay cả với một nhà đầu tư cá nhân chỉ mua cổ phiếu trên sàn, không trực tiếp tham gia các thương vụ này?",
        "options": [
          "Kiến thức Corporate Finance không liên quan tới đầu tư cổ phiếu cá nhân",
          "Vì M&A, buyback, tin PE mua lại đều tác động ngay tới giá cổ phiếu",
          "Chỉ cần đọc báo cáo tài chính, không cần hiểu M&A hay LBO",
          "Không quan trọng, kiến thức này chỉ dành cho dân chuyên nghiệp"
        ],
        "correct": 1,
        "explanation": "Nhà đầu tư cổ phiếu thường xuyên phải phản ứng với tin tức M&A, buyback, hay thay đổi cơ cấu vốn của các công ty họ đang nắm giữ - hiểu đúng bản chất tài chính đằng sau những sự kiện này giúp đánh giá thay vì phản ứng cảm tính."
      }
    ]
  }),
  "comparable-company-analysis-la-gi": patch({
    "quiz": [
      {
        "question": "Hạn chế lớn nhất của phương pháp Comparable Company Analysis là gì?",
        "options": [
          "Phương pháp này quá phức tạp nên hiếm khi được dùng trong thực tế định giá",
          "Comps luôn cho kết quả chính xác hơn DCF nên bị lạm dụng",
          "Không áp dụng được cho công ty niêm yết vì giá đã công khai",
          "Nếu cả ngành đang bị định giá sai, Comps kế thừa nguyên sai lệch đó"
        ],
        "correct": 3,
        "explanation": "Comps là phương pháp định giá TƯƠNG ĐỐI (relative valuation) - nó trả lời câu hỏi 'công ty này rẻ/đắt hơn các công ty tương tự bao nhiêu', không phải 'công ty này thực sự đáng giá bao nhiêu'."
      },
      {
        "question": "Khi chọn nhóm công ty so sánh (comparable companies) để định giá một công ty mục tiêu, tiêu chí nào quan trọng hơn: cùng quy mô doanh thu hay cùng đặc điểm rủi ro và tăng trưởng kinh doanh?",
        "options": [
          "Cùng rủi ro và tăng trưởng quan trọng hơn cùng quy mô doanh thu",
          "Cùng quy mô doanh thu luôn là tiêu chí quan trọng nhất khi chọn",
          "Chỉ cần cùng ngành là đủ, không cần xem thêm tiêu chí nào khác",
          "Không tiêu chí nào quan trọng hơn, chọn bao nhiêu công ty cũng được"
        ],
        "correct": 0,
        "explanation": "Bản chất của Comps là giả định \"công ty tương tự sẽ được định giá tương tự\" - sự tương tự này nên dựa trên các yếu tố THỰC SỰ ảnh hưởng đến định giá (tăng trưởng, rủi ro, biên lợi nhuận, mô hình kinh doanh)."
      }
    ]
  }),
  "pe-dung-khi-nao": patch({
    "quiz": [
      {
        "question": "Vì sao không nên so sánh trực tiếp P/E giữa một công ty ngành bán lẻ và một công ty ngành công nghệ tăng trưởng cao?",
        "options": [
          "Vì hai ngành dùng chuẩn mực kế toán khác nhau khi tính lợi nhuận EPS",
          "Vì P/E không áp dụng được cho ngành bán lẻ tiêu dùng nhanh",
          "Vì công nghệ luôn phải có P/E thấp hơn bán lẻ theo lý thuyết",
          "Vì P/E hợp lý phụ thuộc tăng trưởng, rủi ro và đặc điểm ngành"
        ],
        "correct": 3,
        "explanation": "P/E cao hơn thường phản ánh kỳ vọng tăng trưởng lợi nhuận cao hơn trong tương lai - ngành công nghệ tăng trưởng nhanh xứng đáng P/E cao hơn ngành bán lẻ tăng trưởng chậm."
      },
      {
        "question": "Hai công ty cùng ngành có P/E lần lượt là 15x và 8x. Công ty P/E 8x vừa trải qua một khoản lãi bất thường lớn (one-time gain) từ việc bán tài sản trong năm nay. P/E 8x của công ty này có đáng tin cậy để so sánh không?",
        "options": [
          "Không - lãi bất thường phóng đại Net Income, cần normalize",
          "Hoàn toàn đáng tin cậy, cứ so sánh trực tiếp hai chỉ số P/E với nhau",
          "Công ty P/E 8x chắc chắn tốt hơn vì rẻ hơn công ty P/E 15x",
          "Khoản lãi bất thường không ảnh hưởng gì tới cách tính P/E"
        ],
        "correct": 0,
        "explanation": "Đây là lý do các nhà phân tích luôn \"làm sạch\" (normalize) lợi nhuận trước khi tính các bội số định giá - loại bỏ các khoản mục bất thường, một lần (non-recurring) để P/E phản ánh đúng khả năng sinh lời cốt lõi."
      }
    ]
  }),
  "credit-spread": patch({
    "quiz": [
      {
        "question": "High-yield spreads nới rộng mạnh báo hiệu điều gì?",
        "options": [
          "Kinh tế đang tốt, vì spread rộng nghĩa là lợi suất trái phiếu cao hơn",
          "Lãi suất điều hành sắp tăng nên trái phiếu bị bán ra trước",
          "Không có ý nghĩa, spread thay đổi hàng ngày là bình thường",
          "Thị trường lo rủi ro vỡ nợ tăng - thường báo hiệu suy thoái"
        ],
        "correct": 3,
        "explanation": "HY spread > 800-1000 bps thường đi cùng hoặc trước suy thoái. 2008: HY spread vọt lên 2000 bps. Spreads là chỉ báo sớm sức khỏe tín dụng nền kinh tế."
      },
      {
        "question": "Nếu credit spread của toàn bộ thị trường trái phiếu doanh nghiệp đột ngột mở rộng mạnh trong một thời gian ngắn (không riêng một công ty cụ thể nào), điều này thường phản ánh điều gì về tâm lý thị trường tổng thể?",
        "options": [
          "Chỉ phản ánh vấn đề riêng của một vài công ty phát hành cụ thể",
          "Đây luôn là dấu hiệu lỗi kỹ thuật khi tính toán spread thị trường",
          "Lo ngại rủi ro hệ thống - mọi trái phiếu bị đòi phần bù cao hơn",
          "Credit spread không bao giờ thay đổi đồng loạt trên diện rộng"
        ],
        "correct": 2,
        "explanation": "Sự mở rộng đồng loạt của credit spread trên toàn thị trường (không riêng công ty cụ thể) là một chỉ báo vĩ mô quan trọng về mức độ \"sợ hãi\" hệ thống."
      }
    ]
  }),
  "option-la-gi": patch({
    "quiz": [
      {
        "question": "Vì sao option được ví như một loại 'bảo hiểm' tài chính?",
        "options": [
          "Người mua trả phí cố định để được bảo vệ, lỗ tối đa là phí đó",
          "Vì chính các công ty bảo hiểm là bên phát hành option ra thị trường",
          "Vì option luôn có lãi nên là công cụ an toàn như bảo hiểm",
          "Option không liên quan gì tới bảo hiểm, chỉ là công cụ đầu cơ"
        ],
        "correct": 0,
        "explanation": "Giống hợp đồng bảo hiểm: bạn trả premium (phí) để có quyền bảo vệ nếu có sự kiện bất lợi xảy ra. Nếu sự kiện đó không xảy ra, bạn chỉ mất phí premium."
      },
      {
        "question": "Một nhà đầu tư mua cả call option VÀ put option cùng strike price, cùng ngày đáo hạn trên cùng một cổ phiếu (chiến lược \"straddle\"). Họ đang đặt cược vào điều gì?",
        "options": [
          "Đặt cược giá cổ phiếu sẽ hoàn toàn không thay đổi cho tới đúng ngày đáo hạn",
          "Giá biến động mạnh theo bất kỳ hướng nào - đứng yên thì lỗ cả hai phí",
          "Đặt cược giá tăng mạnh, vì call luôn có giá trị lớn hơn put",
          "Đặt cược giá giảm mạnh, vì put bảo vệ được toàn bộ danh mục"
        ],
        "correct": 1,
        "explanation": "Straddle là chiến lược đặt cược vào ĐỘ BIẾN ĐỘNG (volatility) chứ không phải hướng đi cụ thể của giá - phù hợp khi nhà đầu tư dự đoán một sự kiện lớn sắp xảy ra sẽ tạo biến động mạnh."
      }
    ]
  }),
  "beta-la-gi": patch({
    "quiz": [
      {
        "question": "Ngành nào thường có beta thấp nhất?",
        "options": [
          "Utility và hàng tiêu dùng thiết yếu - nhu cầu ổn định",
          "Tài chính - vì ngân hàng được nhà nước bảo hộ khi khủng hoảng",
          "Du lịch - vì nhu cầu đi lại đã trở nên thiết yếu với mọi người",
          "Công nghệ - vì tăng trưởng cao giúp cổ phiếu ít biến động hơn"
        ],
        "correct": 0,
        "explanation": "Utility và staples (Unilever, P&G) có beta thấp (~0.3-0.7) vì nhu cầu điện/nước/thực phẩm ổn định trong mọi chu kỳ kinh tế. Tech và ngân hàng thường beta > 1."
      },
      {
        "question": "Vì sao một cổ phiếu có Beta = 0.5 vẫn có thể lỗ nặng trong một đợt sụp đổ thị trường nghiêm trọng, dù về lý thuyết nó chỉ nên biến động bằng một nửa thị trường?",
        "options": [
          "Cổ phiếu Beta thấp luôn an toàn tuyệt đối trong mọi kịch bản của thị trường",
          "Beta là ước tính thống kê từ quá khứ; khủng hoảng làm tương quan vọt lên",
          "Beta = 0,5 đảm bảo cổ phiếu không giảm quá một nửa mức thị trường",
          "Beta không có ý nghĩa gì trong thực tế đầu tư nên bỏ qua được"
        ],
        "correct": 1,
        "explanation": "Beta là một mô hình thống kê dựa trên dữ liệu quá khứ, không phải một sự đảm bảo tuyệt đối cho tương lai - trong khủng hoảng thanh khoản nghiêm trọng (như tháng 3/2020), nhà đầu tư thường bán tháo MỌI tài sản."
      }
    ]
  }),
  "portfolio-la-gi": patch({
    "quiz": [
      {
        "question": "Vì sao nhà đầu tư nên nghĩ về portfolio thay vì từng khoản đầu tư riêng lẻ?",
        "options": [
          "Vì portfolio luôn có lợi nhuận cao hơn từng cổ phiếu riêng lẻ",
          "Vì gộp thành danh mục giúp giảm thuế phải nộp khi chốt lời",
          "Không có lý do đặc biệt, chỉ là cách trình bày cho gọn",
          "Vì rủi ro và lợi nhuận đáng quan tâm là của cả danh mục"
        ],
        "correct": 3,
        "explanation": "Đây là nền tảng của Modern Portfolio Theory: một tài sản có thể rủi ro cao khi đứng một mình nhưng lại làm GIẢM rủi ro tổng thể của danh mục nếu nó biến động ngược chiều với các tài sản khác."
      },
      {
        "question": "Một danh mục chỉ gồm 2 cổ phiếu cùng ngành ngân hàng có thực sự được xem là \"đa dạng hóa\" chỉ vì có 2 tài sản khác nhau?",
        "options": [
          "Có, vì có nhiều hơn một tài sản là đã đa dạng hóa được rồi",
          "Đa dạng hóa chỉ có ý nghĩa khi danh mục có từ 10 tài sản trở lên, dưới mức đó thì không",
          "Không - đa dạng hóa cần tương quan thấp, hai bank đi cùng chiều",
          "Chỉ cần từ hai tài sản trở lên là đủ tiêu chuẩn đa dạng hóa"
        ],
        "correct": 2,
        "explanation": "Số lượng tài sản không phải yếu tố duy nhất quyết định mức độ đa dạng hóa thực sự - điều quan trọng hơn là mức độ tương quan (correlation) giữa các tài sản đó."
      }
    ]
  }),
  "enterprise-value-la-gi-day125": patch({
    "quiz": [
      {
        "question": "Công ty A có Market Cap 100 tỷ, nợ 30 tỷ, tiền mặt 10 tỷ. Enterprise Value của công ty A là bao nhiêu?",
        "options": [
          "130 tỷ (100 + 30, chưa trừ tiền mặt)",
          "120 tỷ (100 + 30 − 10)",
          "90 tỷ (100 − 30 + 10, sai dấu)",
          "100 tỷ - EV bằng đúng Market Cap"
        ],
        "correct": 1,
        "explanation": "EV = Market Cap + Nợ − Tiền mặt = 100 + 30 − 10 = 120 tỷ. Công ty có nhiều tiền mặt sẽ có EV thấp hơn Market Cap tương ứng."
      },
      {
        "question": "Một công ty có Market Cap 500 tỷ, không có nợ vay, nhưng có 200 tỷ tiền mặt. Enterprise Value của công ty này là bao nhiêu, và điều gì đặc biệt về trường hợp này?",
        "options": [
          "EV = 700 tỷ (500 + 200), vì tiền mặt làm công ty đáng giá hơn",
          "EV = 300 tỷ, thấp hơn Market Cap - trường hợp net cash dương",
          "EV = 500 tỷ, bằng đúng Market Cap vì công ty không có nợ",
          "Không tính được EV nếu công ty không có khoản nợ vay nào"
        ],
        "correct": 1,
        "explanation": "Đây là trường hợp thú vị của các công ty \"net cash\" (như nhiều công ty công nghệ có lượng tiền mặt khổng lồ): EV thấp hơn Market Cap phản ánh đúng thực tế kinh tế."
      }
    ]
  }),
  "cash-conversion-cycle": patch({
    "quiz": [
      {
        "question": "Công ty sản xuất theo đơn hàng (make-to-order) thường có DIO thế nào?",
        "options": [
          "Thấp hơn make-to-stock vì chỉ sản xuất khi đã có đơn hàng",
          "Rất cao, vì phải giữ nguyên liệu sẵn để làm hàng theo đơn",
          "Bằng nhau, vì DIO không phụ thuộc mô hình sản xuất nào",
          "Không có DIO, vì hàng được giao ngay khi sản xuất xong"
        ],
        "correct": 0,
        "explanation": "Make-to-order: sản xuất khi có đơn → ít hàng tồn kho → DIO thấp → CCC ngắn hơn. Make-to-stock: sản xuất trước → DIO cao. Lựa chọn mô hình ảnh hưởng trực tiếp đến CCC."
      },
      {
        "question": "Vì sao một công ty có Cash Conversion Cycle âm được xem là có lợi thế cạnh tranh tài chính đáng kể?",
        "options": [
          "Vì nhà cung cấp thực chất đang tài trợ vốn lưu động miễn phí",
          "CCC âm là lỗi tính toán, không thể xảy ra trong thực tế",
          "CCC âm chỉ có ý nghĩa với các công ty công nghệ nền tảng",
          "Vì CCC âm nghĩa là công ty đang lỗ nên không cần vốn lưu động"
        ],
        "correct": 0,
        "explanation": "CCC âm là một trong những lợi thế cạnh tranh tài chính mạnh nhất một doanh nghiệp có thể có: nó cho phép mở rộng quy mô kinh doanh mà không cần huy động thêm nhiều vốn lưu động."
      }
    ]
  }),
  "lam-phat-va-dau-tu": patch({
    "quiz": [
      {
        "question": "Tại sao hyperinflation phá hủy nền kinh tế?",
        "options": [
          "Tiền mất chức năng trao đổi → quay lại đổi hàng → kinh tế sụp",
          "Giá tăng thì người bán có lợi nên tổng cầu được kích thích mạnh",
          "Xuất khẩu tăng vì đồng nội tệ rẻ hơn so với các đối tác",
          "Ngân hàng lãi nhiều hơn vì lãi suất cho vay tăng theo giá"
        ],
        "correct": 0,
        "explanation": "Zimbabwe (2008): lạm phát 79.6 tỷ %/tháng - in tờ 100 nghìn tỷ đô Zimbabwe. Venezuela (2018): 1.000.000%+/năm. Khi tiền mất chức năng store of value và medium of exchange, nền kinh tế quay về trao đổi hàng hóa."
      },
      {
        "question": "Vì sao trái phiếu dài hạn với coupon cố định thường bị xem là tài sản \"tệ nhất\" để nắm giữ trong giai đoạn lạm phát cao và tăng nhanh?",
        "options": [
          "Lạm phát không ảnh hưởng gì tới trái phiếu vì coupon đã được cố định sẵn",
          "Coupon cố định không theo lạm phát, giá lại giảm khi lãi suất tăng",
          "Vì trái phiếu dài hạn luôn có mức coupon rất thấp ngay từ đầu",
          "Trái phiếu dài hạn luôn tăng giá khi lạm phát tăng nhờ phần bù"
        ],
        "correct": 1,
        "explanation": "Trái phiếu dài hạn coupon cố định chịu thiệt hại kép trong môi trường lạm phát tăng cao: (1) sức mua thực của dòng coupon cố định giảm, và (2) giá trái phiếu giảm do lãi suất thị trường tăng."
      }
    ]
  }),
  "venture-capital-la-gi": patch({
    "quiz": [
      {
        "question": "Pre-money valuation $10M, VC đầu tư $2M. Post-money valuation và % VC sở hữu?",
        "options": [
          "12 triệu $ và 20%, vì lấy 2/10 tính trên pre-money",
          "10 triệu $ và 20%, vì định giá không đổi sau khi rót vốn",
          "Post-money = 12 triệu $; VC sở hữu 2/12 = 16,7%",
          "8 triệu $ và 25%, vì khoản đầu tư trừ khỏi định giá"
        ],
        "correct": 2,
        "explanation": "Post-money = Pre-money + Investment = 10 + 2 = $12M. VC% = Investment / Post-money = 2/12 = 16.7%. Dilution xảy ra với tất cả cổ đông hiện hữu."
      },
      {
        "question": "Vì sao mô hình \"power law\" trong đầu tư mạo hiểm khiến các quỹ VC sẵn sàng chấp nhận tỷ lệ thất bại rất cao (70-90%) của danh mục đầu tư?",
        "options": [
          "Tỷ lệ thất bại cao không ảnh hưởng gì tới chiến lược của VC",
          "Vì VC không có khả năng chọn lọc startup tốt nên đầu tư dàn trải",
          "Vì VC luôn thua lỗ nên chấp nhận rủi ro cao là điều bắt buộc",
          "Vì một vài khoản thắng gấp trăm lần bù hết phần thất bại"
        ],
        "correct": 3,
        "explanation": "Đây là khác biệt căn bản giữa tư duy đầu tư VC và đầu tư truyền thống: thay vì tối thiểu hóa rủi ro từng khoản đầu tư, VC tối ưu hóa cho khả năng bắt được những \"outlier\" cực lớn."
      }
    ]
  }),
  "gross-margin": patch({
    "quiz": [
      {
        "question": "Gross margin giảm từ 40% xuống 35% qua 2 năm - gợi ý điều gì?",
        "options": [
          "Thuế tăng, vì thuế được trừ ngay trong giá vốn hàng bán",
          "Doanh thu giảm, vì Gross Margin tính trên doanh thu tuyệt đối",
          "Áp lực giá bán, chi phí nguyên liệu tăng, hoặc mix sản phẩm đổi",
          "Không đáng lo, biến động 5 điểm phần trăm là bình thường mỗi năm"
        ],
        "correct": 2,
        "explanation": "Gross margin suy giảm là warning signal cần điều tra: (1) pricing power giảm; (2) input cost tăng chưa chuyển được sang giá bán; (3) sản phẩm biên cao bị thay thế bởi sản phẩm biên thấp."
      },
      {
        "question": "Một công ty bán lẻ có Gross Margin thấp hơn nhiều so với một công ty công nghệ. Điều này có nghĩa công ty bán lẻ đang kinh doanh kém hơn?",
        "options": [
          "Đúng, Gross Margin thấp hơn luôn nghĩa là kinh doanh kém hơn hẳn",
          "Công ty bán lẻ luôn nên chuyển sang mô hình công nghệ để cải thiện biên lợi nhuận",
          "Gross Margin không có ý nghĩa gì khi đánh giá ngành bán lẻ cả",
          "Không - bán lẻ theo mô hình biên thấp, vòng quay nhanh, ROE vẫn tốt"
        ],
        "correct": 3,
        "explanation": "Đây là lý do không thể so sánh Gross Margin xuyên ngành: mô hình \"biên thấp, vòng quay nhanh\" (low margin, high turnover) của bán lẻ có thể tạo ra ROE tương đương hoặc vượt ngành công nghệ."
      }
    ]
  }),
  "present-value": patch({
    "quiz": [
      {
        "question": "Tại sao tỷ lệ chiết khấu cao hơn làm giảm Present Value?",
        "options": [
          "Vì rủi ro giảm nên dòng tiền tương lai trở nên đáng tin hơn hiện tại",
          "Vì chi phí cơ hội cao hơn - tiền hôm nay sinh lời được nhiều hơn",
          "Vì lạm phát tăng làm giá trị danh nghĩa của dòng tiền giảm đi",
          "Vì công thức quy định vậy, không có lý do kinh tế nào đằng sau"
        ],
        "correct": 1,
        "explanation": "Discount rate cao = chi phí cơ hội cao = tiền tương lai ít giá trị hơn so với hiện tại. Khi lãi suất tăng, PV của mọi dòng tiền tương lai giảm → giá cổ phiếu và trái phiếu giảm."
      },
      {
        "question": "Nếu discount rate giảm từ 10% xuống 5%, Present Value của một khoản tiền nhận trong tương lai sẽ thay đổi thế nào?",
        "options": [
          "Giảm xuống, vì lãi suất giảm thì tiền tương lai sinh lời ít hơn",
          "Không thay đổi vì FV và số năm đều không đổi",
          "Tăng lên - r nhỏ hơn thì mẫu số nhỏ hơn nên PV lớn hơn",
          "Chỉ thay đổi nếu số năm chiết khấu cũng thay đổi theo"
        ],
        "correct": 2,
        "explanation": "PV = FV / (1+r)^n - r càng nhỏ, mẫu số càng nhỏ, PV càng lớn. Đây chính là lý do khi lãi suất thị trường giảm, giá trị định giá của cổ phiếu và trái phiếu tăng."
      }
    ]
  }),
  "perpetuity": patch({
    "quiz": [
      {
        "question": "Growing perpetuity (perpetuity tăng trưởng đều) có công thức PV là gì?",
        "options": [
          "C × (r − g), tức nhân thay vì chia cho phần chênh lệch",
          "C / r, tức công thức perpetuity không tăng trưởng",
          "C × r, lấy dòng tiền nhân với chi phí vốn yêu cầu",
          "C / (r − g), với g là tốc độ tăng trưởng vĩnh viễn"
        ],
        "correct": 3,
        "explanation": "PV = C / (r − g). Dùng trong Gordon Growth Model để tính Terminal Value của DCF. Nhạy cảm với g: nếu g gần r, PV tăng vô hạn - đây là 'garbage in' phổ biến trong DCF."
      },
      {
        "question": "Vì sao một dòng tiền kéo dài VÔ HẠN (perpetuity) lại có giá trị hiện tại HỮU HẠN, thay vì tiến tới vô cực?",
        "options": [
          "Vì dòng tiền càng xa càng bị chiết khấu mạnh, tổng vẫn hội tụ",
          "Vì trên thực tế không ai sống đủ lâu để nhận hết dòng tiền vô hạn",
          "Vì công thức tính sai nhưng vẫn được chấp nhận trong thực tế",
          "Perpetuity thực ra không có giá trị hiện tại xác định nào cả"
        ],
        "correct": 0,
        "explanation": "Đây là một kết quả toán học đẹp: dù cộng vô hạn số hạng, nếu mỗi số hạng nhỏ dần theo cấp số nhân (do chiết khấu), tổng vẫn hội tụ về một giá trị hữu hạn = C/r."
      }
    ]
  }),
  "unit-economics": patch({
    "quiz": [
      {
        "question": "Contribution Margin là gì?",
        "options": [
          "Gross Profit, tức doanh thu trừ toàn bộ giá vốn hàng bán",
          "Lợi nhuận sau thuế phân bổ cho từng đơn vị sản phẩm bán ra",
          "Doanh thu thuần sau khi trừ chiết khấu và hàng trả lại",
          "Doanh thu trừ chi phí biến đổi - phần bù chi phí cố định"
        ],
        "correct": 3,
        "explanation": "CM = Revenue − Variable Costs. CM/Revenue = CM%. Nếu CM% cao, mỗi đơn vị bán thêm đóng góp nhiều cho fixed cost và profit. SaaS thường CM% > 70%."
      },
      {
        "question": "Một startup có LTV/CAC = 0.8 (dưới 1) nhưng đang tăng trưởng số lượng khách hàng rất nhanh. Điều gì đang thực sự xảy ra về mặt tài chính?",
        "options": [
          "Đang lỗ trên mỗi khách mới - tăng nhanh thì đốt tiền nhanh hơn",
          "Mô hình kinh doanh rất tốt, vì tăng trưởng khách hàng nhanh",
          "LTV/CAC dưới 1 không có ý nghĩa gì đáng lo ngại trong giai đoạn đầu",
          "Chắc chắn sẽ thành công vì tăng trưởng nhanh luôn là tín hiệu tốt"
        ],
        "correct": 0,
        "explanation": "LTV/CAC dưới 1 là một cảnh báo nghiêm trọng: mỗi khách hàng mới thực chất đang làm công ty LỖ THÊM, không phải lãi thêm. Tăng trưởng nhanh trong tình huống này chỉ là \"tăng trưởng đốt tiền\"."
      }
    ]
  }),
  "yield-curve": patch({
    "quiz": [
      {
        "question": "Đường yield curve dốc lên (steep) cho biết gì?",
        "options": [
          "Suy thoái sắp xảy ra, vì đường cong dốc báo hiệu bất ổn",
          "Thị trường kỳ vọng tăng trưởng và lạm phát cao hơn về sau",
          "Lãi suất ngắn hạn đang cao hơn lãi suất dài hạn rất nhiều",
          "Fed đang tăng lãi suất nên toàn bộ đường cong dịch lên"
        ],
        "correct": 1,
        "explanation": "Steep curve: spread giữa 10-year và 2-year yield lớn → thị trường lạc quan về tăng trưởng dài hạn. Xảy ra sau recession khi Fed cắt lãi ngắn hạn nhưng dài hạn còn cao."
      },
      {
        "question": "Vì sao các nhà đầu tư tổ chức lớn theo dõi Yield Curve chặt chẽ hơn nhiều so với việc chỉ nhìn một mức lãi suất đơn lẻ (như lãi suất 10 năm)?",
        "options": [
          "Vì Yield Curve dễ đọc hơn một con số lãi suất đơn lẻ nhiều",
          "Chỉ ngân hàng trung ương mới cần quan tâm tới Yield Curve",
          "Vì hình dạng cả đường cong phản ánh kỳ vọng ở nhiều kỳ hạn cùng lúc",
          "Yield Curve không cung cấp thông tin nào hữu ích hơn một mức lãi suất đơn lẻ"
        ],
        "correct": 2,
        "explanation": "Yield Curve là một \"bản đồ\" kỳ vọng thị trường trải dài qua nhiều kỳ hạn - độ dốc, hình dạng đảo ngược hay bình thường của toàn bộ đường cong cho biết nhiều thông tin hơn một điểm."
      }
    ]
  }),
  "on-tap-trai-phieu": patch({
    "quiz": [
      {
        "question": "Duration và Convexity liên quan thế nào đến quản lý rủi ro trái phiếu?",
        "options": [
          "Duration đo độ nhạy tuyến tính; Convexity chỉnh phần phi tuyến",
          "Convexity luôn âm nên chỉ làm tăng thiệt hại khi lãi suất đổi",
          "Cả hai chỉ dành cho nhà đầu tư tổ chức, cá nhân không cần biết tới",
          "Không liên quan tới rủi ro, chỉ dùng để tính lợi suất đáo hạn"
        ],
        "correct": 0,
        "explanation": "Modified Duration ≈ %ΔPrice / %ΔYield. Convexity: khi yield thay đổi lớn, duration không đủ chính xác - convexity bổ sung. Positive convexity (thông thường): giá giảm ít hơn dự đoán."
      },
      {
        "question": "Sau khi học Chặng 8, vì sao hiểu về trái phiếu lại quan trọng ngay cả với một nhà đầu tư chỉ tập trung vào cổ phiếu, không bao giờ trực tiếp mua trái phiếu?",
        "options": [
          "Trái phiếu và cổ phiếu là hai thị trường hoàn toàn tách biệt nhau",
          "Vì lãi suất và yield curve tác động tới WACC và CAPM của cổ phiếu",
          "Không quan trọng, kiến thức trái phiếu chỉ dành cho dân chuyên biệt",
          "Chỉ cần quan tâm báo cáo tài chính, không cần hiểu thị trường nợ"
        ],
        "correct": 1,
        "explanation": "Đây là mối liên kết xuyên suốt toàn bộ chương trình: risk-free rate (từ trái phiếu chính phủ) là nền tảng của CAPM và WACC - hai công cụ định giá cổ phiếu quan trọng nhất."
      }
    ]
  }),
  "case-dinh-gia-pe-va-dcf": patch({
    "quiz": [
      {
        "question": "Nếu định giá P/E (dựa trên thị trường) cao hơn đáng kể so với DCF (dựa trên nội tại), khả năng nào sau đây là hợp lý nhất để xem xét?",
        "options": [
          "P/E luôn chính xác hơn DCF nên cứ lấy kết quả P/E làm chuẩn",
          "DCF luôn sai vì dựa trên dự báo nên phải bỏ qua hoàn toàn",
          "Không có cách nào giải thích được sự chênh lệch giữa hai con số",
          "Có thể cả ngành đang được thị trường định giá cao hơn nội tại"
        ],
        "correct": 3,
        "explanation": "Khi phương pháp dựa trên thị trường (P/E, tương đối) cho kết quả cao hơn đáng kể so với phương pháp dựa trên nội tại (DCF, tuyệt đối), đây thường là dấu hiệu của định giá quá cao toàn ngành."
      },
      {
        "question": "Trong case định giá này, nếu bạn phải đưa ra một khuyến nghị đầu tư cuối cùng chỉ dựa trên hai kết quả chênh lệch (P/E: 60.000đ, DCF: 45.000đ), cách tiếp cận nào thể hiện tư duy phân tích tài chính chín chắn nhất?",
        "options": [
          "Bỏ qua hoàn toàn kết quả DCF vì P/E dễ hiểu hơn với khách hàng",
          "Trình bày cả hai như một dải giá trị và giải thích rõ giả định",
          "Luôn chọn con số cao hơn để có lý do mua vào ngay lập tức",
          "Lấy trung bình cộng hai con số mà không cần giải thích thêm"
        ],
        "correct": 1,
        "explanation": "Đây là tổng kết quan trọng nhất của cả Chặng 7: định giá tài chính không bao giờ là một khoa học chính xác tuyệt đối - tư duy chín chắn thể hiện qua việc trình bày trung thực một dải giá trị."
      }
    ]
  }),
  "pb-dung-khi-nao": patch({
    "quiz": [
      {
        "question": "P/B nhỏ hơn 1 (giá cổ phiếu thấp hơn giá trị sổ sách) luôn là dấu hiệu cổ phiếu 'rẻ' và nên mua?",
        "options": [
          "Không - P/B thấp có thể do tài sản kém chất lượng hoặc ROE thấp",
          "Đúng, luôn nên mua ngay khi thấy P/B xuống dưới mức 1 lần sổ sách",
          "P/B dưới 1 chỉ xảy ra với công ty sắp phá sản nên phải tránh",
          "P/B không bao giờ xuống dưới 1 trong thực tế thị trường"
        ],
        "correct": 0,
        "explanation": "P/B thấp có thể là cơ hội giá trị thực sự, nhưng cũng có thể là 'value trap' - thị trường đã định giá đúng vì lo ngại chính đáng: chất lượng tài sản kém, nợ xấu ẩn ở ngân hàng."
      },
      {
        "question": "Một công ty công nghệ có P/B = 15x (rất cao so với ngân hàng thường 1-2x). Điều này có nghĩa cổ phiếu công nghệ đang bị định giá quá cao một cách bất hợp lý?",
        "options": [
          "Đúng, P/B cao luôn nghĩa là định giá quá cao một cách bất hợp lý",
          "Không - giá trị nằm ở tài sản vô hình chưa ghi trên sổ sách",
          "Ngân hàng luôn có P/B cao hơn công ty công nghệ trên thị trường",
          "P/B chỉ áp dụng cho ngân hàng, không dùng được cho công nghệ"
        ],
        "correct": 1,
        "explanation": "Đây chính là lý do P/B không phù hợp để định giá công ty công nghệ - giá trị thực sự của các công ty này nằm ở tài sản vô hình không hiện diện trên bảng cân đối kế toán."
      }
    ]
  }),
  "burn-rate-runway": patch({
    "quiz": [
      {
        "question": "Nên ưu tiên giảm burn rate hay tăng doanh thu khi runway ngắn?",
        "options": [
          "Giảm burn rate luôn tốt hơn vì tiết kiệm là chắc chắn nhất",
          "Tăng revenue luôn tốt hơn vì doanh thu giải quyết mọi vấn đề",
          "Không quan trọng, miễn là gọi được vòng vốn tiếp theo đúng hạn",
          "Tùy: nếu tăng trưởng doanh thu rõ ràng thì đẩy revenue, không thì giảm burn"
        ],
        "correct": 3,
        "explanation": "Default alive hay default dead? Nếu với tốc độ hiện tại revenue sẽ vượt burn rate trước khi hết tiền → default alive, có thể giữ tăng trưởng. Nếu không → phải cắt chi phí."
      },
      {
        "question": "Vì sao môi trường lãi suất tăng cao (như 2022-2023) đặc biệt nguy hiểm với các startup có burn rate cao và chưa có lợi nhuận?",
        "options": [
          "Lãi suất cao hạ định giá công ty tăng trưởng và siết nguồn vốn VC",
          "Lãi suất không ảnh hưởng gì đến startup vì họ không vay ngân hàng",
          "Runway không liên quan gì đến môi trường lãi suất của nền kinh tế",
          "Lãi suất cao luôn có lợi cho startup vì tiền gửi sinh lời nhiều hơn"
        ],
        "correct": 0,
        "explanation": "Đây là kênh truyền dẫn gián tiếp nhưng mạnh mẽ: lãi suất cao làm giảm định giá tăng trưởng và siết chặt nguồn vốn đầu tư mạo hiểm toàn cầu - startup runway ngắn có thể không gọi được vốn kịp."
      }
    ]
  }),
  "standard-deviation-dau-tu": patch({
    "quiz": [
      {
        "question": "Trong phân phối chuẩn (normal distribution), khoảng bao nhiêu phần trăm kết quả nằm trong phạm vi ±1 độ lệch chuẩn quanh giá trị trung bình?",
        "options": [
          "Khoảng 50%, vì một độ lệch chuẩn chia đôi phân phối",
          "Khoảng 68% - theo quy tắc 68-95-99,7 của phân phối chuẩn",
          "Không thể xác định nếu thiếu dữ liệu lợi suất thực tế",
          "100%, vì mọi quan sát đều nằm trong một độ lệch chuẩn"
        ],
        "correct": 1,
        "explanation": "Quy tắc 68-95-99.7: nếu lợi suất phân phối chuẩn, khoảng 68% quan sát nằm trong ±1 độ lệch chuẩn, 95% trong ±2 độ lệch chuẩn, 99.7% trong ±3 độ lệch chuẩn."
      },
      {
        "question": "Nếu phân phối lợi suất của một tài sản không tuân theo phân phối chuẩn (có \"đuôi béo\" - fat tails, tức xác suất xảy ra sự kiện cực đoan cao hơn dự đoán), việc chỉ dùng độ lệch chuẩn để đo rủi ro có đủ không?",
        "options": [
          "Chỉ cần dùng độ lệch chuẩn cho mọi loại tài sản trong mọi tình huống",
          "Đủ, độ lệch chuẩn luôn phản ánh chính xác mọi loại rủi ro tài sản",
          "Phân phối chuẩn luôn đúng với mọi loại tài sản tài chính hiện có",
          "Không đủ - nó đánh giá thấp xác suất sự kiện cực đoan, cần thêm VaR"
        ],
        "correct": 3,
        "explanation": "Đây là một hạn chế quan trọng đã được nhiều nhà kinh tế học (như Nassim Taleb với khái niệm \"Black Swan\") chỉ ra: thị trường tài chính thực tế thường có nhiều sự kiện cực đoan hơn phân phối chuẩn dự đoán."
      }
    ]
  }),
  "cost-of-capital": patch({
    "quiz": [
      {
        "question": "Nguồn vốn nào thường rẻ hơn về chi phí sau thuế?",
        "options": [
          "Debt - lãi vay được khấu trừ thuế nên chi phí thực thấp hơn",
          "Equity, vì cổ đông không đòi hỏi khoản chi trả cố định nào",
          "Bằng nhau, vì thị trường luôn định giá lại cho cân bằng rủi ro",
          "Phụ thuộc ngành, không có nguyên tắc chung nào áp dụng được"
        ],
        "correct": 0,
        "explanation": "Cost of Debt = Lãi suất × (1 − Tax Rate). Tax shield từ lãi vay làm debt rẻ hơn equity về mặt chi phí vốn sau thuế."
      },
      {
        "question": "Một công ty dùng lợi nhuận giữ lại (retained earnings, không phải tiền vay hay phát hành cổ phiếu mới) để tài trợ một dự án mới. Chi phí vốn của khoản tiền này có bằng 0 không?",
        "options": [
          "Chi phí vốn chỉ áp dụng cho tiền vay, không áp dụng cho vốn nội bộ",
          "Không - tiền đó thuộc cổ đông, chi phí cơ hội là cost of equity",
          "Đúng, lợi nhuận giữ lại là tiền miễn phí nên chi phí vốn bằng 0",
          "Lợi nhuận giữ lại luôn có chi phí vốn cao hơn vay ngân hàng"
        ],
        "correct": 1,
        "explanation": "Đây là một nhầm lẫn phổ biến: dù không phải trả lãi trực tiếp, lợi nhuận giữ lại vẫn có chi phí cơ hội - số tiền đó thuộc về cổ đông và có thể được chia làm cổ tức để họ tự đầu tư."
      }
    ]
  }),
  "revenue-multiple-dung-khi-nao": patch({
    "quiz": [
      {
        "question": "Vì sao Revenue Multiple được xem là chỉ số định giá kém tin cậy nhất so với P/E hay EV/EBITDA?",
        "options": [
          "Vì doanh thu khó dự báo hơn lợi nhuận nên bội số kém ổn định",
          "Vì doanh thu luôn bị thổi phồng trong báo cáo tài chính công bố",
          "Vì doanh thu không nói gì về biên lợi nhuận hay hiệu quả chi phí",
          "Revenue Multiple thực ra chính xác hơn các chỉ số định giá khác"
        ],
        "correct": 2,
        "explanation": "Doanh thu chỉ là 'dòng trên cùng' (top line), không phản ánh chi phí, biên lợi nhuận, hay hiệu quả vận hành. Hai công ty doanh thu 1000 tỷ nhưng một lãi lớn một lỗ nặng có cùng bội số."
      },
      {
        "question": "Hai startup SaaS cùng có EV/Revenue = 8x, nhưng startup A có biên lợi nhuận gộp 80% trong khi startup B chỉ có 30%. Bội số bằng nhau này có phản ánh đúng giá trị tương đối của hai công ty không?",
        "options": [
          "Có, vì bội số Revenue bằng nhau nên hai công ty giá trị tương đương",
          "Startup B luôn tốt hơn A vì biên thấp cho thấy giá bán cạnh tranh",
          "Biên lợi nhuận gộp không liên quan gì tới việc đọc Revenue Multiple",
          "Không - cùng bội số nghĩa là A đang bị định giá thấp tương đối"
        ],
        "correct": 3,
        "explanation": "Đây chính là hạn chế lớn nhất của Revenue Multiple: nó hoàn toàn bỏ qua biên lợi nhuận - hai công ty cùng bội số Revenue nhưng biên lợi nhuận khác xa nhau có giá trị kinh tế rất khác."
      }
    ]
  }),
  "mutual-fund-la-gi": patch({
    "quiz": [
      {
        "question": "Vì sao mutual fund chủ động (actively managed) thường có phí quản lý cao hơn ETF thụ động?",
        "options": [
          "Vì cần đội ngũ nghiên cứu và chọn lọc cổ phiếu liên tục",
          "Vì quy định pháp luật yêu cầu quỹ chủ động thu phí cao hơn",
          "Không có sự khác biệt đáng kể về chi phí giữa hai loại quỹ này",
          "Vì mutual fund luôn có hiệu suất tốt hơn ETF nên thu phí cao hơn"
        ],
        "correct": 0,
        "explanation": "Chi phí vận hành của một quỹ chủ động (lương chuyên gia phân tích, nghiên cứu thị trường, giao dịch thường xuyên hơn) cao hơn nhiều so với một quỹ ETF thụ động chỉ sao chép chỉ số."
      },
      {
        "question": "Vì sao Mutual Fund thường yêu cầu số tiền đầu tư tối thiểu ban đầu (ví dụ 1 triệu đồng hoặc nhiều hơn), trong khi ETF có thể mua với số lượng cổ phiếu nhỏ tùy ý trên sàn?",
        "options": [
          "Ngưỡng tối thiểu không liên quan gì tới cơ chế giao dịch của quỹ",
          "Mutual Fund giao dịch trực tiếp với công ty quản lý; ETF mua bán trên sàn",
          "Không có sự khác biệt về ngưỡng đầu tư tối thiểu giữa hai loại quỹ",
          "ETF luôn yêu cầu số vốn đầu tư lớn hơn Mutual Fund rất nhiều"
        ],
        "correct": 1,
        "explanation": "Sự khác biệt về cơ chế phân phối (Mutual Fund qua công ty quản lý quỹ trực tiếp, ETF qua sàn giao dịch như cổ phiếu) tạo ra sự khác biệt tự nhiên về ngưỡng đầu tư tối thiểu."
      }
    ]
  }),
  "alpha-la-gi": patch({
    "quiz": [
      {
        "question": "Vì sao phần lớn quỹ đầu tư chủ động (active fund) thường có Alpha gần 0 hoặc âm trong dài hạn?",
        "options": [
          "Vì thị trường khá hiệu quả, và phí quản lý ăn hết phần vượt trội",
          "Vì các nhà quản lý quỹ nhìn chung không đủ trình độ phân tích thị trường",
          "Vì các quỹ chủ động thường gian lận số liệu khi công bố kết quả",
          "Vì Alpha là khái niệm không thể đo lường chính xác trong thực tế"
        ],
        "correct": 0,
        "explanation": "Lý thuyết thị trường hiệu quả (Efficient Market Hypothesis) cho rằng giá tài sản đã phản ánh gần như toàn bộ thông tin công khai, khiến việc tìm kiếm Alpha dương bền vững rất khó."
      },
      {
        "question": "Một quỹ có Alpha dương trong 3 năm liên tiếp nhưng dựa trên chỉ một chiến lược đầu tư duy nhất (ví dụ chỉ mua cổ phiếu giá trị). Điều gì cần cân nhắc trước khi kết luận đây là \"kỹ năng\" thực sự bền vững?",
        "options": [
          "Không cần cân nhắc gì thêm, Alpha dương suốt 3 năm liên tiếp đã là bằng chứng đủ",
          "Có thể chỉ là factor exposure đang thuận, không phải kỹ năng chọn cổ phiếu",
          "Ba năm luôn là khoảng thời gian đủ dài để chứng minh kỹ năng bền vững",
          "Alpha không liên quan gì tới chiến lược đầu tư mà quỹ đang sử dụng"
        ],
        "correct": 1,
        "explanation": "Đây là phân biệt quan trọng giữa \"factor exposure\" (được hưởng lợi từ một yếu tố thị trường đang thịnh hành) và \"true alpha\" (kỹ năng chọn lựa vượt trội thực sự)."
      }
    ]
  }),
  "fcfe-la-gi": patch({
    "quiz": [
      {
        "question": "Nếu công ty vay thêm một khoản nợ mới lớn trong năm, điều này ảnh hưởng thế nào đến FCFE của năm đó?",
        "options": [
          "FCFE chỉ bị ảnh hưởng bởi lãi vay, không liên quan tới khoản vay gốc",
          "FCFE luôn giảm khi công ty vay thêm nợ vì nghĩa vụ trả tăng lên",
          "Không ảnh hưởng gì tới FCFE vì vay nợ là hoạt động tài chính",
          "FCFE tăng thêm phần tiền vay mới nhận được trong kỳ đó"
        ],
        "correct": 3,
        "explanation": "Công thức FCFE bao gồm '+ Vay nợ ròng mới' - nếu công ty vay thêm nợ trong kỳ, dòng tiền nhận được từ khoản vay đó cộng thêm vào FCFE của cổ đông trong kỳ đó."
      },
      {
        "question": "Công ty tăng vay nợ mới đáng kể trong năm để tài trợ một dự án đầu tư. Điều này ảnh hưởng ngay lập tức đến FCFE và FCFF của năm đó như thế nào - có giống nhau không?",
        "options": [
          "FCFE tăng theo tiền vay; FCFF không đổi vì tính trước cấu trúc vốn",
          "Cả hai đều không bị ảnh hưởng bởi việc công ty vay thêm nợ mới",
          "Cả FCFE và FCFF đều tăng như nhau khi công ty vay thêm nợ mới",
          "FCFF sẽ giảm mạnh khi vay thêm nợ vì lãi vay được trừ vào đó"
        ],
        "correct": 0,
        "explanation": "Đây là khác biệt cốt lõi giữa hai chỉ số: FCFE bị ảnh hưởng trực tiếp bởi các quyết định tài trợ vốn (vay/trả nợ), trong khi FCFF độc lập với cấu trúc vốn."
      }
    ]
  }),
  "yield-curve-la-gi": patch({
    "quiz": [
      {
        "question": "Đường cong lợi suất bị 'đảo ngược' (inverted yield curve) - khi lãi suất ngắn hạn cao hơn dài hạn - thường báo hiệu điều gì?",
        "options": [
          "Lạm phát sắp giảm về 0 nên lợi suất dài hạn không cần cao",
          "Không có ý nghĩa dự báo gì, chỉ là biến động ngắn hạn của thị trường",
          "Nền kinh tế đang tăng trưởng rất mạnh nên tiền dồn vào ngắn hạn",
          "Thị trường lo suy thoái - một trong những chỉ báo đáng tin nhất"
        ],
        "correct": 3,
        "explanation": "Inverted yield curve xảy ra khi nhà đầu tư kỳ vọng ngân hàng trung ương sẽ phải hạ lãi suất trong tương lai để cứu nền kinh tế đang suy yếu, nên đổ xô mua trái phiếu dài hạn."
      },
      {
        "question": "Nếu yield curve có dạng \"hình chữ U\" bất thường (lợi suất ngắn hạn cao, giữa kỳ thấp, dài hạn lại cao trở lại), điều này có thể phản ánh sự pha trộn của những kỳ vọng nào từ thị trường?",
        "options": [
          "Yield curve chỉ có hai dạng: bình thường hoặc đảo ngược hoàn toàn",
          "Hình dạng yield curve luôn đơn giản và dễ dự đoán theo chu kỳ",
          "Yield curve không bao giờ có hình dạng phức tạp như mô tả trên",
          "Thắt chặt hiện tại, kỳ vọng suy thoái giữa kỳ, lạm phát dài hạn"
        ],
        "correct": 3,
        "explanation": "Yield curve trong thực tế có thể có nhiều hình dạng phức tạp hơn hai trạng thái đơn giản (bình thường/đảo ngược) - mỗi đoạn của đường cong phản ánh kỳ vọng ở một khung thời gian khác nhau."
      }
    ]
  }),
  "don-bay-tai-chinh-2": patch({
    "quiz": [
      {
        "question": "Rủi ro lớn nhất của đòn bẩy cao là gì?",
        "options": [
          "Khi doanh thu giảm, lãi vay cố định khuếch đại lỗ - kiệt quệ tài chính",
          "Cổ đông bất mãn vì lợi nhuận phải chia bớt cho các chủ nợ",
          "Thuế phải nộp tăng lên vì lãi vay làm lợi nhuận biến động",
          "Lợi nhuận thấp hơn so với công ty không dùng nợ trong mọi kịch bản kinh doanh"
        ],
        "correct": 0,
        "explanation": "Operating leverage + Financial leverage = Total leverage. Khi doanh thu giảm 20%, doanh nghiệp đòn bẩy cao có thể lỗ 60-80% EBIT."
      },
      {
        "question": "Nếu ROIC (lợi nhuận trên vốn đầu tư) của một doanh nghiệp giảm xuống THẤP HƠN chi phí nợ vay, đòn bẩy tài chính sẽ ảnh hưởng thế nào đến ROE so với khi ROIC còn cao hơn chi phí nợ?",
        "options": [
          "Đòn bẩy không có tác động gì tới ROE trong trường hợp này",
          "Khuếch đại theo chiều ngược lại - ROE giảm mạnh hơn công ty không nợ",
          "ROIC không liên quan gì tới việc đòn bẩy ảnh hưởng ROE thế nào",
          "Đòn bẩy vẫn luôn khuếch đại ROE lên cao hơn bất kể ROIC ra sao đi chăng nữa"
        ],
        "correct": 1,
        "explanation": "Đây chính là \"con dao hai lưỡi\" của đòn bẩy: khi ROIC > chi phí nợ, đòn bẩy khuếch đại ROE lên; nhưng khi ROIC < chi phí nợ, nó khuếch đại theo chiều ngược lại."
      }
    ]
  }),
  "strike-price-expiration-date": patch({
    "quiz": [
      {
        "question": "Option 'in-the-money' nghĩa là gì?",
        "options": [
          "Option không có ai mua bán nên mất thanh khoản hoàn toàn",
          "Option đã hết hạn nhưng vẫn còn giá trị nội tại để thực hiện",
          "Có giá trị nếu thực hiện ngay: call thì giá > strike, put thì ngược lại",
          "Option chưa được niêm yết nên chỉ giao dịch trên thị trường OTC phi tập trung"
        ],
        "correct": 2,
        "explanation": "In-the-money (ITM): thực hiện quyền ngay sẽ có lãi. Out-of-the-money (OTM): thực hiện quyền ngay sẽ lỗ, không ai làm vậy. At-the-money (ATM): giá thị trường bằng strike."
      },
      {
        "question": "Hai option cùng cổ phiếu, cùng strike price, nhưng một đáo hạn sau 1 tuần và một đáo hạn sau 1 năm. Nếu cả hai đều đang out-of-the-money (chưa có lãi nếu thực hiện ngay), option nào có Time Value cao hơn?",
        "options": [
          "Cả hai có Time Value bằng nhau vì cùng strike price và cùng một cổ phiếu cơ sở",
          "Option đáo hạn sau 1 tuần luôn có Time Value cao hơn vì gấp gáp hơn",
          "Time Value không liên quan gì tới thời gian còn lại đến ngày đáo hạn",
          "Option 1 năm - còn nhiều thời gian nghĩa là nhiều cơ hội giá chạy hơn"
        ],
        "correct": 3,
        "explanation": "Time Value phản ánh trực tiếp \"cơ hội\" còn lại để giá di chuyển có lợi trước khi đáo hạn - thời gian còn lại càng dài, xác suất giá di chuyển đủ xa càng cao."
      }
    ]
  }),
  "net-profit-margin": patch({
    "quiz": [
      {
        "question": "Điều gì có thể làm Net Margin giảm nhưng Operating Margin không đổi?",
        "options": [
          "COGS tăng, làm giá vốn ăn vào lợi nhuận trước khi ra Operating Income",
          "Lãi vay tăng hoặc thuế suất tăng - cả hai nằm dưới Operating Income",
          "SG&A tăng, làm chi phí bán hàng và quản lý cao hơn trong kỳ",
          "Doanh thu giảm, làm cả hai biên lợi nhuận giảm cùng một nhịp"
        ],
        "correct": 1,
        "explanation": "Net Margin = Operating Margin − Interest/Revenue − Tax/Revenue. Nếu Operating Margin không đổi nhưng Net Margin giảm, nguyên nhân là lãi vay tăng hoặc thuế tăng."
      },
      {
        "question": "Một công ty có Net Margin chỉ 3% nhưng vòng quay tài sản (Asset Turnover) rất nhanh vẫn có thể có ROE hấp dẫn. Điều này minh họa nguyên tắc gì trong phân tích tài chính?",
        "options": [
          "Công ty này chắc chắn đang gặp vấn đề nghiêm trọng về lợi nhuận",
          "ROE là kết quả tổng hợp của margin, vòng quay và đòn bẩy",
          "Vòng quay tài sản không liên quan gì tới ROE của doanh nghiệp",
          "Net Margin luôn là chỉ số quan trọng nhất, không cần xem thêm"
        ],
        "correct": 1,
        "explanation": "Đây chính là insight của DuPont Analysis: ROE = Net Margin × Asset Turnover × Financial Leverage. Một công ty bán lẻ margin thấp nhưng bán hàng rất nhanh vẫn có ROE tốt."
      }
    ]
  }),
  "ipo-la-gi": patch({
    "quiz": [
      {
        "question": "Underwriter trong IPO làm gì?",
        "options": [
          "Mua cổ phiếu thay cho nhà đầu tư nhỏ lẻ trong đợt phát hành lần đầu",
          "Quản lý cổ phiếu sau IPO và duy trì thanh khoản trên sàn",
          "Ngân hàng đầu tư bảo lãnh: định giá, bán, cam kết mua phần dư",
          "Kiểm toán báo cáo tài chính trước khi công ty được niêm yết"
        ],
        "correct": 2,
        "explanation": "Underwriter (Goldman Sachs, Morgan Stanley...) được trả 3-7% tổng giá trị IPO. Họ xây dựng book (thu thập order), định giá, và trong firm-commitment underwriting thì cam kết mua phần không bán được."
      },
      {
        "question": "Vì sao nhiều công ty tăng trưởng nhanh chọn IPO qua con đường truyền thống thay vì SPAC merger (như VinFast), dù SPAC thường nhanh hơn và ít tốn kém hơn ban đầu?",
        "options": [
          "IPO truyền thống không phải trả phí underwriter nên rẻ hơn SPAC",
          "SPAC luôn tốt hơn IPO truyền thống trong mọi trường hợp niêm yết cổ phiếu",
          "Không có sự khác biệt nào giữa hai phương thức lên sàn này cả",
          "Due diligence nghiêm hơn, uy tín và định giá ổn định hơn về dài hạn"
        ],
        "correct": 3,
        "explanation": "SPAC (Special Purpose Acquisition Company) nổi lên như một con đường IPO nhanh hơn, nhưng thực tế nhiều công ty niêm yết qua SPAC đã giảm giá mạnh sau niêm yết do thiếu giám sát chặt chẽ ban đầu."
      }
    ]
  }),
  "eps-chi-so": patch({
    "quiz": [
      {
        "question": "Tại sao dùng diluted EPS thay vì basic EPS?",
        "options": [
          "Diluted tính cả options/warrants - phản ánh rủi ro pha loãng",
          "Quy định bắt buộc phải công bố, không có ý nghĩa phân tích riêng nào",
          "Basic EPS tính sai vì không loại cổ phiếu quỹ ra khỏi mẫu số",
          "Diluted EPS luôn cao hơn basic nên trông đẹp hơn với cổ đông"
        ],
        "correct": 0,
        "explanation": "Diluted EPS cho biết EPS sẽ là bao nhiêu nếu TẤT CẢ options, warrants, convertibles được thực hiện. Thường thấp hơn basic EPS. Phản ánh đúng hơn rủi ro pha loãng."
      },
      {
        "question": "Công ty phát hành thêm 20% cổ phiếu mới để huy động vốn (không thay đổi Net Income ngay lập tức). Điều gì xảy ra với EPS?",
        "options": [
          "Không xác định được nếu thiếu thông tin về giá cổ phiếu mới",
          "EPS không thay đổi vì Net Income vẫn giữ nguyên như trước",
          "EPS tăng lên vì công ty có thêm vốn để mở rộng kinh doanh",
          "EPS giảm - cùng Net Income chia cho nhiều cổ phiếu hơn"
        ],
        "correct": 3,
        "explanation": "Đây là hiện tượng dilution (pha loãng): phát hành thêm cổ phiếu làm tăng mẫu số trong công thức EPS = Net Income / Số cổ phiếu, khiến EPS giảm."
      }
    ]
  }),
  "modigliani-miller": patch({
    "quiz": [
      {
        "question": "Tại sao MM không áp dụng hoàn toàn trong thực tế?",
        "options": [
          "MM chỉ dùng cho công ty Mỹ nên không áp dụng được ở các thị trường khác",
          "Thực tế có thuế, chi phí phá sản, thông tin bất cân xứng, agency cost",
          "MM quá phức tạp nên các CFO trong thực tế không dùng tới nó",
          "MM đã bị giới học thuật bác bỏ hoàn toàn từ nhiều thập kỷ trước"
        ],
        "correct": 1,
        "explanation": "MM giả định: không thuế, không chi phí phá sản, thị trường hoàn hảo, không agency costs. Thực tế vi phạm tất cả. Trade-off theory và Pecking order theory ra đời để bù đắp."
      },
      {
        "question": "Nếu lý thuyết MM (không thuế) cho rằng cơ cấu vốn không ảnh hưởng đến giá trị doanh nghiệp, tại sao trong thực tế các CFO vẫn dành rất nhiều công sức tối ưu hóa cơ cấu vốn?",
        "options": [
          "Vì lý thuyết MM đã bị chứng minh là hoàn toàn sai trong mọi trường hợp",
          "Các CFO thực ra không cần quan tâm tới cơ cấu vốn của công ty",
          "Vì MM chỉ đúng trong điều kiện lý tưởng; thực tế có thuế và phá sản",
          "MM chỉ áp dụng cho công ty nhỏ, không dùng cho tập đoàn lớn"
        ],
        "correct": 2,
        "explanation": "Giá trị thực sự của MM Theorem không phải ở kết luận (cơ cấu vốn không quan trọng trong thị trường hoàn hảo), mà ở việc nó chỉ ra CHÍNH XÁC những yếu tố nào làm cơ cấu vốn trở nên quan trọng."
      }
    ]
  }),
  "vi-sao-doanh-nghiep-dung-phai-sinh-phong-ho": patch({
    "quiz": [
      {
        "question": "Một công ty hedge giá dầu ở mức 70 USD/thùng, nhưng sau đó giá dầu giảm còn 50 USD. Công ty có 'thua lỗ' trong việc hedging này không?",
        "options": [
          "Có, họ đã mất tiền vì quyết định hedge sai thời điểm của thị trường dầu",
          "Công ty nên hủy hợp đồng hedging ngay lập tức để cắt lỗ",
          "Không thể xảy ra tình huống này vì forward tự điều chỉnh theo giá",
          "Kế toán thì trả cao hơn giá thị trường, nhưng mục tiêu là chắc chắn"
        ],
        "correct": 3,
        "explanation": "Đây là hiểu lầm phổ biến nhất về hedging: mục tiêu không phải là 'thắng thị trường' mà là loại bỏ sự bất định. Nếu giá giảm sau khi đã hedge ở mức cao hơn, đó là cái giá của sự chắc chắn."
      },
      {
        "question": "Một CFO quyết định KHÔNG hedge rủi ro giá nguyên liệu đầu vào, với lý do \"chúng tôi tin vào khả năng dự đoán thị trường tốt hơn đối thủ\". Quan điểm này có phù hợp với triết lý hedging đã học không?",
        "options": [
          "Không - đó là đầu cơ trá hình, ngược triết lý giảm bất định",
          "Hoàn toàn phù hợp, đây chính xác là mục đích của việc hedging",
          "CFO luôn đúng vì có nhiều kinh nghiệm hơn nhân viên cấp dưới",
          "Không có khác biệt nào giữa hedging và speculation ở đây cả"
        ],
        "correct": 0,
        "explanation": "Đây là một cái bẫy tư duy phổ biến ở cấp quản lý doanh nghiệp: viện lý do \"dự đoán tốt hơn thị trường\" để không hedge thực chất là đang đầu cơ (speculation), không phải quản trị rủi ro."
      }
    ]
  }),
  "case-xuat-khau-phong-ho-ty-gia": patch({
    "quiz": [
      {
        "question": "Nếu VND giảm giá mạnh so với USD sau khi doanh nghiệp đã ký forward bán USD ở tỷ giá cố định, doanh nghiệp có 'thiệt' không?",
        "options": [
          "Có, họ mất cơ hội thu về nhiều VND hơn nếu không hedge trước",
          "Thiệt về cơ hội, nhưng mục tiêu loại bỏ rủi ro đã đạt được",
          "Hợp đồng forward sẽ tự động hủy trong trường hợp tỷ giá biến động",
          "Ngân hàng phải bồi thường phần chênh lệch tỷ giá cho doanh nghiệp"
        ],
        "correct": 1,
        "explanation": "Tương tự case hedging giá dầu: khi đã chọn sự chắc chắn (certainty) thay vì đầu cơ vào biến động tỷ giá có lợi, doanh nghiệp chấp nhận đánh đổi cơ hội."
      },
      {
        "question": "Nếu doanh nghiệp xuất khẩu trong case này chọn hedge bằng option (mua put option bán USD) thay vì forward contract, điều gì khác biệt về khả năng linh hoạt so với dùng forward?",
        "options": [
          "Option cho quyền, không nghĩa vụ - linh hoạt hơn nhưng phải trả phí",
          "Option không được phép dùng để hedge rủi ro tỷ giá cho doanh thu xuất khẩu",
          "Option luôn rẻ hơn forward contract trong mọi trường hợp sử dụng",
          "Không có sự khác biệt nào giữa hai công cụ phòng hộ tỷ giá này"
        ],
        "correct": 0,
        "explanation": "Đây là sự đánh đổi cốt lõi giữa forward và option: forward miễn phí (không premium) nhưng bắt buộc thực hiện dù bất lợi; option có phí nhưng để ngỏ phần lợi."
      }
    ]
  }),
  "put-option-la-gi": patch({
    "quiz": [
      {
        "question": "Người bán (writer) put option ở vị thế nào?",
        "options": [
          "Có nghĩa vụ mua ở strike nếu bên mua thực hiện - nhận premium",
          "Có quyền chọn thực hiện hay không, giống hệt như người mua put",
          "Không có rủi ro gì vì đã nhận được premium ngay từ đầu kỳ",
          "Luôn phải bán tài sản trước khi hợp đồng option đáo hạn"
        ],
        "correct": 0,
        "explanation": "Bất đối xứng quyền lợi trong option: người MUA có quyền chọn (không nghĩa vụ), người BÁN (writer) luôn có NGHĨA VỤ nếu bên mua thực hiện quyền. Đổi lại writer nhận premium."
      },
      {
        "question": "Một nhà đầu tư giữ cổ phiếu và bán (viết) covered call trên chính cổ phiếu đó (cam kết bán ở strike price nếu người mua thực hiện quyền). Chiến lược này giới hạn điều gì và tạo ra thu nhập từ đâu?",
        "options": [
          "Covered call luôn rủi ro cao hơn nắm giữ cổ phiếu thông thường",
          "Chiến lược này chỉ có lợi khi giá cổ phiếu giảm mạnh và nhanh",
          "Không giới hạn gì và cũng không tạo ra thu nhập gì thêm cả",
          "Giới hạn lợi nhuận tăng giá, đổi lấy thu nhập từ premium"
        ],
        "correct": 3,
        "explanation": "Covered call là chiến lược \"income generation\" phổ biến: nhà đầu tư chấp nhận giới hạn lợi nhuận tăng giá (upside) để đổi lấy thu nhập premium chắc chắn."
      }
    ]
  }),
  "ev-ebitda-dung-khi-nao": patch({
    "quiz": [
      {
        "question": "Hai công ty A và B có cùng EBITDA nhưng A vay nợ nhiều còn B gần như không có nợ. P/E của công ty nào có xu hướng bị bóp méo cao hơn dù hoạt động kinh doanh cốt lõi tương đương?",
        "options": [
          "Công ty B, vì không có nợ nên lợi nhuận sau thuế cao hơn A",
          "Không thể so sánh nếu thiếu thông tin về ngành của hai công ty",
          "Cả hai P/E luôn bằng nhau nếu EBITDA của chúng bằng nhau",
          "Công ty A - lãi vay lớn làm Net Income và EPS thấp hơn, đẩy P/E lên"
        ],
        "correct": 3,
        "explanation": "Đây chính là lý do EV/EBITDA được ưa chuộng hơn P/E khi so sánh công ty có cơ cấu vốn khác nhau: P/E bị ảnh hưởng bởi chi phí lãi vay (nằm dưới EBITDA), còn EV/EBITDA thì không."
      },
      {
        "question": "Một công ty có EV/EBITDA = 20x trong khi trung bình ngành chỉ 10x. Ngoài khả năng công ty được định giá quá cao, còn lý do hợp lý nào khác có thể giải thích mức bội số cao gấp đôi này?",
        "options": [
          "Không có lý do hợp lý nào khác ngoài việc công ty đang bị định giá quá cao",
          "Bội số cao hơn ngành luôn là dấu hiệu của gian lận tài chính",
          "Có thể tăng trưởng EBITDA vượt trội, moat mạnh, hoặc là mục tiêu M&A",
          "EV/EBITDA của công ty này chắc chắn đã bị tính toán sai ở đâu đó"
        ],
        "correct": 2,
        "explanation": "So sánh bội số với trung bình ngành chỉ là điểm khởi đầu - một công ty có chất lượng vượt trội (tăng trưởng cao hơn, lợi thế cạnh tranh bền vững, rủi ro thấp hơn) xứng đáng bội số cao hơn."
      }
    ]
  }),
  "precedent-transaction-la-gi": patch({
    "quiz": [
      {
        "question": "Vì sao bội số từ Precedent Transaction thường cao hơn bội số từ Comparable Company Analysis?",
        "options": [
          "Vì bên mua phải trả control premium để giành quyền kiểm soát",
          "Vì Precedent Transaction chỉ dùng cho các công ty quy mô lớn",
          "Vì dữ liệu thương vụ M&A công bố luôn không chính xác",
          "Không có khác biệt hệ thống nào giữa hai phương pháp định giá"
        ],
        "correct": 0,
        "explanation": "Control premium phản ánh giá trị của quyền kiểm soát: bên sở hữu chi phối có thể thay đổi ban lãnh đạo, chiến lược, cơ cấu vốn để tối ưu hóa giá trị công ty."
      },
      {
        "question": "Một thương vụ Precedent Transaction xảy ra trong giai đoạn thị trường M&A cực kỳ sôi động (nhiều bên cạnh tranh mua cùng một mục tiêu). Bội số từ thương vụ này có nên áp dụng trực tiếp để định giá một công ty tương tự trong giai đoạn thị trường M&A trầm lắng hiện tại không?",
        "options": [
          "Precedent Transaction không bao giờ bị ảnh hưởng bởi điều kiện thị trường",
          "Cần điều chỉnh - bội số rất nhạy với điều kiện thị trường lúc đó",
          "Chỉ cần thương vụ cùng ngành là đủ, bất kể thời điểm xảy ra",
          "Có, cứ áp dụng trực tiếp vì đều là thương vụ trong cùng ngành"
        ],
        "correct": 1,
        "explanation": "Đây là hạn chế quan trọng của Precedent Transaction Analysis: bội số phản ánh điều kiện thị trường M&A TẠI THỜI ĐIỂM giao dịch xảy ra (mức độ cạnh tranh, tâm lý thị trường)."
      }
    ]
  }),
  "forward-contract-la-gi": patch({
    "quiz": [
      {
        "question": "Rủi ro lớn nhất của forward contract so với futures là gì?",
        "options": [
          "Forward luôn đắt hơn futures vì phải thương lượng riêng từng lần",
          "Forward yêu cầu ký quỹ hàng ngày nên chiếm dụng vốn nhiều hơn",
          "Counterparty risk cao hơn - OTC, không có sàn đứng ra đảm bảo",
          "Forward không thể dùng cho hàng hóa, chỉ dùng cho tiền tệ"
        ],
        "correct": 2,
        "explanation": "Forward là hợp đồng OTC (over-the-counter) - không qua trung gian sàn giao dịch đảm bảo thực hiện. Nếu một bên phá sản hoặc từ chối thực hiện, bên còn lại chịu tổn thất."
      },
      {
        "question": "Hai bên A và B ký forward contract mua/bán 100 tấn gạo sau 6 tháng ở giá 15.000đ/kg. Nếu sau 6 tháng, một bên phá sản và không thể thực hiện hợp đồng, hậu quả pháp lý xảy ra với bên còn lại là gì?",
        "options": [
          "Sàn giao dịch sẽ tự động bồi thường cho bên bị thiệt hại",
          "Cả hai bên đều không phải chịu trách nhiệm gì trong tình huống này",
          "Bên còn lại chịu tổn thất và phải tự đi đòi qua thủ tục pháp lý",
          "Không có hậu quả gì vì hợp đồng tự động hủy khi một bên phá sản"
        ],
        "correct": 2,
        "explanation": "Đây chính là rủi ro cốt lõi của forward contract (OTC, không qua sàn): không có clearing house đứng giữa đảm bảo thực hiện nghĩa vụ."
      }
    ]
  }),
  "tai-chinh-la-gi": patch({
    "quiz": [
    {
      "question": "Tài chính khác kế toán ở điểm nào cơ bản nhất?",
      "options": [
        "Kế toán ghi lại quá khứ, tài chính ra quyết định cho tương lai",
        "Kế toán dự báo dòng tiền, tài chính chỉ ghi sổ theo chuẩn mực",
        "Tài chính chỉ dùng trong ngân hàng, kế toán dùng ở mọi ngành",
        "Tài chính làm việc với số liệu, kế toán với văn bản pháp lý"
      ],
      "correct": 0,
      "explanation": "Kế toán ghi chép chính xác những gì đã xảy ra. Tài chính dùng dữ liệu đó để ra quyết định về tương lai: đầu tư gì, vay bao nhiêu, phân bổ vốn ra sao."
    },
    {
      "question": "Vì sao tài chính không chỉ là tiền?",
      "options": [
        "Vì tiền chỉ chiếm một phần rất nhỏ trong tổng thể của cả nền kinh tế quốc gia và toàn cầu",
        "Vì tài chính đòi hỏi thêm kỹ năng giao tiếp và đàm phán tốt với khách hàng, đối tác",
        "Vì tài chính liên quan đến thời gian, rủi ro và cơ hội bị bỏ lỡ, không chỉ số tiền",
        "Vì tài chính bao gồm cả lĩnh vực bất động sản, vốn không liên quan trực tiếp đến tiền mặt"
      ],
      "correct": 2,
      "explanation": "Tài chính xoay quanh 3 trục: giá trị theo thời gian, mức độ rủi ro, và chi phí cơ hội. Tiền chỉ là đơn vị đo, không phải toàn bộ câu chuyện."
    },
    {
      "question": "Chi phí cơ hội là gì?",
      "options": [
        "Giá trị của phương án tốt nhất bạn từ bỏ khi chọn",
        "Chi phí thực tế bạn đã bỏ ra cho lựa chọn hiện tại",
        "Khoản lỗ phát sinh khi lựa chọn của bạn thất bại",
        "Phần chênh lệch giữa giá mua và giá bán một tài sản"
      ],
      "correct": 0,
      "explanation": "Nếu bạn dùng 100 triệu mua xe, chi phí cơ hội là số tiền bạn có thể kiếm được nếu đem 100 triệu đó đầu tư. Mọi quyết định đều có chi phí cơ hội."
    },
    {
      "question": "Scenario: Bạn có 50 triệu đồng. Lựa chọn A: Mua iPhone mới. Lựa chọn B: Đầu tư vào chứng khoán kỳ vọng 15%/năm. Nếu chọn A, chi phí cơ hội 1 năm sau là bao nhiêu?",
      "options": [
        "50 triệu đồng",
        "7.5 triệu đồng (15% của 50 triệu)",
        "Không có chi phí cơ hội vì iPhone là tài sản",
        "Chỉ có chi phí cơ hội nếu iPhone mất giá"
      ],
      "correct": 1,
      "explanation": "Chi phí cơ hội = 50 triệu × 15% = 7.5 triệu. Đây là số tiền bạn bỏ lỡ khi chọn mua iPhone thay vì đầu tư. Chi phí cơ hội luôn tồn tại với mọi quyết định."
    }
  ]
  }),
  "tien-la-gi": patch({
    "quiz": [
    {
      "question": "Tiền và tài sản khác nhau ở điểm gì quan trọng nhất?",
      "options": [
        "Tiền dùng được ngay, tài sản phải bán mới thành tiền",
        "Tiền do ngân hàng tạo, tài sản do doanh nghiệp tạo",
        "Tài sản luôn có giá trị cao hơn tiền mặt cùng lúc",
        "Tiền sinh lãi theo thời gian, tài sản thì không"
      ],
      "correct": 0,
      "explanation": "Tiền mặt là tài sản có thanh khoản cao nhất: bạn dùng được ngay. Cổ phiếu, bất động sản, vàng đều là tài sản nhưng cần thời gian và chi phí để chuyển thành tiền."
    },
    {
      "question": "Net worth (tài sản ròng) của bạn là gì?",
      "options": [
        "Tổng tài sản trừ đi tổng nợ phải trả",
        "Số dư tất cả tài khoản ngân hàng của bạn",
        "Tổng thu nhập trừ tổng chi phí trong năm",
        "Giá trị ngôi nhà và xe bạn đang sở hữu"
      ],
      "correct": 0,
      "explanation": "Net worth = Assets - Liabilities. Người thu nhập 100 triệu/tháng nhưng nợ 5 tỷ có thể có net worth âm. Người thu nhập 15 triệu tích lũy 10 năm có thể có net worth dương."
    },
    {
      "question": "Lạm phát ảnh hưởng đến tiền mặt và tài sản khác nhau thế nào?",
      "options": [
        "Tiền mặt mất sức mua; tài sản thực thường giữ giá trị",
        "Cả tiền mặt và tài sản thực đều mất giá như nhau",
        "Tài sản thực mất giá nhanh hơn tiền mặt khi lạm phát",
        "Gửi tiết kiệm ngân hàng thì tiền không chịu lạm phát"
      ],
      "correct": 0,
      "explanation": "Giữ tiền mặt khi lạm phát 6% nghĩa là mỗi năm bạn mất 6% sức mua. Đây là lý do tại sao cần đầu tư: để lợi nhuận vượt lạm phát."
    },
    {
      "question": "Scenario: Bạn có 500 triệu đồng. Lựa chọn A: Giữ tiền mặt tại nhà. Lựa chọn B: Mua vàng (giá vàng tăng trung bình 5%/năm, lạm phát 4%/năm). Sau 3 năm, lựa chọn nào bảo toàn sức mua tốt hơn và chênh lệch khoảng bao nhiêu?",
      "options": [
        "B tốt hơn, chênh khoảng 15% (3% × 3 năm)",
        "A tốt hơn vì tiền mặt không có rủi ro biến động giá",
        "Hai lựa chọn tương đương vì vàng cũng mất giá",
        "B tốt hơn nhưng chênh chỉ khoảng 3% (1% × 3 năm)"
      ],
      "correct": 0,
      "explanation": "Tiền mặt mất 4%/năm theo lạm phát → sau 3 năm mất ~12% sức mua. Vàng tăng 5%/năm → sau 3 năm tăng ~15% giá trị danh nghĩa. Lợi nhuận thực của vàng ≈ 1%/năm (5% - 4%). Vàng bảo toàn sức mua tốt hơn tiền mặt trong môi trường lạm phát."
    }
  ]
  }),
  "thu-nhap-chi-phi-tiet-kiem": patch({
    "quiz": [
    {
      "question": "Sự khác nhau giữa tiết kiệm và đầu tư là gì?",
      "options": [
        "Tiết kiệm bảo toàn vốn; đầu tư chấp nhận rủi ro để sinh lời",
        "Tiết kiệm chỉ dùng ngân hàng, đầu tư chỉ dùng chứng khoán",
        "Đầu tư bảo toàn vốn, còn tiết kiệm mới chấp nhận rủi ro",
        "Cả hai đều bảo toàn vốn, chỉ khác nhau về mức lãi suất"
      ],
      "correct": 0,
      "explanation": "Tiết kiệm bảo toàn vốn, lãi suất thường thấp hơn lạm phát. Đầu tư chấp nhận rủi ro để đổi lấy lợi nhuận cao hơn, mục tiêu là tăng trưởng tài sản thực."
    },
    {
      "question": "Chi phí nào dưới đây là chi phí biến đổi (variable cost)?",
      "options": [
        "Tiền mua sắm quần áo tùy nhu cầu",
        "Học phí trả theo học kỳ",
        "Tiền thuê nhà hàng tháng",
        "Tiền vay ngân hàng trả góp cố định"
      ],
      "correct": 0,
      "explanation": "Chi phí biến đổi thay đổi tùy theo hành vi và nhu cầu. Thuê nhà, trả góp là chi phí cố định. Mua sắm quần áo phụ thuộc vào quyết định của bạn mỗi tháng."
    },
    {
      "question": "Scenario: Bạn thu nhập 20 triệu/tháng. Chi phí cố định (thuê nhà, trả góp, điện nước): 12 triệu. Chi phí biến đổi (ăn uống, mua sắm, giải trí): 5 triệu. Tỷ lệ tiết kiệm hiện tại là bao nhiêu? Nếu giảm chi phí biến đổi xuống 3 triệu, tỷ lệ tiết kiệm mới là bao nhiêu?",
      "options": [
        "Hiện tại 15%, mới 25% (3/20 rồi 5/20)",
        "Hiện tại 25%, mới 30% (chia cho chi phí)",
        "Hiện tại 15%, mới 20% (chỉ giảm 1 triệu)",
        "Hiện tại 20%, mới 25% (quên điện nước)"
      ],
      "correct": 0,
      "explanation": "Hiện tại: (20 - 12 - 5) / 20 = 3 / 20 = 15%. Mới: (20 - 12 - 3) / 20 = 5 / 20 = 25%. Giảm chi phí biến đổi 2 triệu tăng tỷ lệ tiết kiệm từ 15% lên 25%."
    }
  ]
  }),
  "dong-tien": patch({
    "quiz": [
    {
      "question": "Dòng tiền dương (positive cash flow) nghĩa là gì?",
      "options": [
        "Tiền vào nhiều hơn tiền ra trong kỳ",
        "Công ty có lợi nhuận kế toán dương trong kỳ",
        "Công ty không còn khoản nợ vay nào phải trả",
        "Doanh thu trong kỳ tăng so với kỳ trước"
      ],
      "correct": 0,
      "explanation": "Dòng tiền dương nghĩa là trong kỳ đó bạn thu vào nhiều hơn chi ra, bất kể lợi nhuận kế toán là bao nhiêu. Đây là sức khỏe tiền mặt thực tế."
    },
    {
      "question": "Ai thường phân tích dòng tiền kỹ nhất khi đánh giá một doanh nghiệp?",
      "options": [
        "Ngân hàng cho vay và nhà đầu tư dài hạn",
        "Bộ phận marketing khi lập kế hoạch bán hàng",
        "Kế toán nội bộ khi lập báo cáo thuế cuối năm",
        "Khách hàng khi so sánh giá sản phẩm"
      ],
      "correct": 0,
      "explanation": "Ngân hàng muốn biết công ty có đủ tiền trả nợ không. Nhà đầu tư muốn biết công ty tạo tiền thật hay chỉ lợi nhuận trên giấy. Cả hai đều nhìn vào dòng tiền."
    },
    {
      "question": "Scenario: Bạn kinh doanh online. Tháng 1: bán hàng 100 triệu, khách trả ngay 70 triệu, 30 triệu trả sau 30 ngày. Chi phí nhập hàng 60 triệu trả ngay. Lợi nhuận tháng 1 là bao nhiêu? Dòng tiền tháng 1 là bao nhiêu?",
      "options": [
        "Lợi nhuận 40 triệu, dòng tiền 10 triệu",
        "Lợi nhuận 40 triệu, dòng tiền 40 triệu (quên công nợ)",
        "Lợi nhuận 10 triệu, dòng tiền 10 triệu (lấy tiền thu)",
        "Lợi nhuận 10 triệu, dòng tiền 40 triệu (đảo ngược)"
      ],
      "correct": 0,
      "explanation": "Lợi nhuận = Doanh thu - Chi phí = 100 - 60 = 40 triệu. Dòng tiền = Tiền vào - Tiền ra = 70 - 60 = 10 triệu. 30 triệu công nợ sẽ về dòng tiền tháng 2. Đây là ví dụ điển hình: lợi nhuận > dòng tiền."
    }
  ]
  }),
  "tai-san-tieu-san": patch({
    "quiz": [
    {
      "question": "Theo định nghĩa dòng tiền, tài sản (asset) là gì?",
      "options": [
        "Thứ tạo ra dòng tiền dương hoặc tăng giá trị cho bạn",
        "Bất cứ thứ gì có giá trị mua bán trên thị trường",
        "Thứ được ghi tên bạn trong giấy tờ pháp lý",
        "Tiền mặt, vàng và chứng khoán bạn đang giữ"
      ],
      "correct": 0,
      "explanation": "Theo góc nhìn dòng tiền: tài sản là thứ làm tiền vào túi bạn. Cổ phiếu trả cổ tức, căn hộ cho thuê, kỹ năng tạo thu nhập cao hơn đều là tài sản theo nghĩa này."
    },
    {
      "question": "Điều gì sai khi áp dụng cực đoan quan điểm 'nhà bạn ở là tiêu sản'?",
      "options": [
        "Bỏ qua giá trị phi tài chính (an cư, ổn định) và khả năng tăng giá dài hạn của bất động sản",
        "Quan điểm đó chỉ đúng ở các nước đang phát triển, không áp dụng được tại thị trường Việt Nam",
        "Sai vì chỉ người có thu nhập cao mới bị ảnh hưởng, người bình thường thì không cần quan tâm",
        "Không có gì sai cả, quan điểm dòng tiền áp dụng tuyệt đối đúng trong mọi trường hợp không ngoại lệ"
      ],
      "correct": 0,
      "explanation": "Tài chính cá nhân không chỉ tối ưu dòng tiền. An cư, sự ổn định tâm lý và tăng giá tài sản dài hạn đều có giá trị. Cực đoan kiểu gì cũng dẫn đến quyết định lệch."
    },
    {
      "question": "Scenario: Bạn có 200 triệu đồng. Lựa chọn A: Mua xe máy cá nhân (chi phí bảo hiểm, xăng, bảo trì ~5 triệu/năm). Lựa chọn B: Mua xe máy chạy Grab (thu nhập ~15 triệu/năm sau khi trừ chi phí). Theo định nghĩa dòng tiền, lựa chọn nào là tài sản?",
      "options": [
        "B là tài sản vì tạo dòng tiền dương 15 triệu/năm",
        "A là tài sản vì xe cá nhân vẫn có giá trị bán lại",
        "Cả hai đều là tài sản vì đều có giá trị thị trường",
        "Không cái nào là tài sản vì xe máy luôn mất giá"
      ],
      "correct": 0,
      "explanation": "Theo định nghĩa dòng tiền: tài sản là thứ bỏ tiền vào túi bạn. Xe chạy Grab tạo 15 triệu/năm dòng tiền dương → tài sản. Xe cá nhân lấy 5 triệu/năm → tiêu sản. Cùng một loại xe, khác cách dùng → khác kết quả."
    }
  ]
  }),
  "lai-suat-la-gi": patch({
    "quiz": [
    {
      "question": "Tại sao ngân hàng trung ương tăng lãi suất khi lạm phát cao?",
      "options": [
        "Để làm chậm chi tiêu và đầu tư, hạ nhiệt cầu",
        "Để ngân hàng thương mại tăng biên lãi cho vay",
        "Để thu hút vốn ngoại vào trái phiếu chính phủ",
        "Để bù phần giá trị tiền gửi bị lạm phát bào mòn"
      ],
      "correct": 0,
      "explanation": "Lãi suất cao làm vay đắt hơn, tiết kiệm hấp dẫn hơn, người tiêu dùng và doanh nghiệp chi tiêu ít hơn. Cầu giảm thì giá hạ nhiệt. Đây là cơ chế chống lạm phát cơ bản."
    },
    {
      "question": "Lãi suất thực (real interest rate) là gì?",
      "options": [
        "Lãi suất danh nghĩa trừ đi tỷ lệ lạm phát",
        "Lãi suất danh nghĩa cộng với tỷ lệ lạm phát",
        "Lãi suất còn lại sau khi trừ thuế thu nhập",
        "Lãi suất do ngân hàng trung ương công bố"
      ],
      "correct": 0,
      "explanation": "Lãi suất thực = lãi suất danh nghĩa - lạm phát. Nếu ngân hàng trả 6%/năm nhưng lạm phát 7%, lãi suất thực là âm 1%. Bạn thực ra đang mất tiền dù được trả lãi."
    },
    {
      "question": "Scenario: Bạn vay 500 triệu mua nhà, lãi suất 10%/năm trong 10 năm. Lạm phát bình quân 5%/năm. Lãi suất thực của khoản vay là bao nhiêu? Lạm phát có lợi cho người vay hay người cho vay?",
      "options": [
        "Lãi suất thực 5%, có lợi cho người vay",
        "Lãi suất thực 15%, có lợi cho người vay",
        "Lãi suất thực 10%, không ai lợi",
        "Lãi suất thực 5%, có lợi cho người cho vay"
      ],
      "correct": 0,
      "explanation": "Lãi suất thực = 10% - 5% = 5%. Lạm phát làm giảm giá trị thực của số tiền bạn phải trả lại. Người vay được lợi vì trả lại tiền đã mất giá. Người cho vay bị thiệt vì nhận lại tiền có sức mua thấp hơn."
    }
  ]
  }),
  "lai-don-lai-kep": patch({
    "quiz": [
    {
      "question": "Tại sao lãi kép tạo ra nhiều tiền hơn lãi đơn?",
      "options": [
        "Vì lãi kiếm được cũng được tái đầu tư và sinh lãi tiếp",
        "Vì lãi suất áp dụng cho lãi kép luôn cao hơn lãi đơn",
        "Vì lãi kép được tính theo ngày thay vì theo năm",
        "Vì lãi kép chỉ áp dụng cho khoản gốc lớn hơn nhiều"
      ],
      "correct": 0,
      "explanation": "Lãi đơn chỉ tính trên gốc ban đầu. Lãi kép tính trên gốc cộng toàn bộ lãi đã tích lũy. Năm này lãi trở thành gốc cho năm sau, tạo hiệu ứng bóng tuyết."
    },
    {
      "question": "Quy tắc 72 cho biết điều gì?",
      "options": [
        "Chia 72 cho lãi suất để biết số năm tiền tăng gấp đôi",
        "Cần đầu tư liên tục trong 72 tháng mới thấy lãi kép rõ",
        "Tỷ lệ tiết kiệm tối ưu là 72% thu nhập hàng tháng",
        "Nhân 72 với lãi suất để ra số năm tăng gấp đôi"
      ],
      "correct": 0,
      "explanation": "Quy tắc 72: số năm tăng gấp đôi = 72 / lãi suất. Lãi 6%: tăng gấp đôi sau 12 năm. Lãi 10%: sau 7.2 năm. Công cụ tính nhanh không cần máy tính."
    },
    {
      "question": "Scenario: Bạn 25 tuổi, có 100 triệu đồng. Lựa chọn A: Bắt đầu đầu tư ngay với lãi kép 10%/năm. Lựa chọn B: Chờ đến 35 tuổi mới đầu tư với cùng lãi suất 10%/năm. Khi cả hai cùng 65 tuổi, chênh lệch tài sản giữa A và B là bao nhiêu?",
      "options": [
        "Chênh lệch khoảng 2,6 lần",
        "Chênh khoảng 1,33 lần (lấy 40/30)",
        "Chênh lệch khoảng 10 lần",
        "Chênh lệch khoảng 4 lần"
      ],
      "correct": 0,
      "explanation": "A đầu tư 40 năm: 100 triệu × (1.1)^40 ≈ 4,53 tỷ. B đầu tư 30 năm: 100 triệu × (1.1)^30 ≈ 1,74 tỷ. Tỷ lệ chênh lệch = 4,53/1,74 ≈ 2,6 lần. Chỉ 10 năm đầu tư sớm hơn đã tạo ra chênh lệch tài sản gấp 2,6 lần nhờ lãi kép."
    }
  ]
  }),
  "suc-manh-thoi-gian": patch({
    "quiz": [
    {
      "question": "Tại sao bắt đầu đầu tư sớm quan trọng hơn đầu tư nhiều?",
      "options": [
        "Vì lãi kép cần thời gian dài mới tạo khác biệt lớn",
        "Vì thị trường chứng khoán luôn tăng trong dài hạn",
        "Vì người trẻ chịu rủi ro tốt hơn người lớn tuổi",
        "Vì lãi suất cao hơn ở thị trường mới nổi"
      ],
      "correct": 0,
      "explanation": "Lãi kép tăng trưởng hàm mũ, không tuyến tính. 10 năm đầu bắt đầu sớm hơn có thể tạo ra nhiều tiền hơn 20 năm đầu tư thêm về sau."
    },
    {
      "question": "Dollar Cost Averaging (DCA) là gì và tại sao phù hợp với đầu tư dài hạn?",
      "options": [
        "Đầu tư một khoản cố định đều đặn mỗi tháng",
        "Đầu tư toàn bộ tiền một lần khi thị trường xuống thấp",
        "Tính trung bình lãi suất của nhiều khoản đầu tư",
        "Chuyển tiền sang đô la Mỹ để tránh mất giá"
      ],
      "correct": 0,
      "explanation": "DCA loại bỏ áp lực phải chọn đúng thời điểm vào thị trường. Mua đều hàng tháng: khi giá thấp mua được nhiều, khi cao mua ít hơn. Trung bình giá mua thấp hơn đỉnh thị trường."
    },
    {
      "question": "Scenario: Bạn có 2 lựa chọn đầu tư quỹ cổ phiếu với lãi trung bình 12%/năm. Lựa chọn A: Đầu tư 10 triệu/tháng trong 10 năm (tổng 1.2 tỷ). Lựa chọn B: Đợi 5 năm rồi đầu tư 20 triệu/tháng trong 5 năm (cũng tổng 1.2 tỷ). Sau 15 năm từ hôm nay, lựa chọn nào cho kết quả tốt hơn và chênh lệch khoảng bao nhiêu?",
      "options": [
        "Lựa chọn B tốt hơn, chênh lệch khoảng 30%",
        "Lựa chọn B tốt hơn vì đầu tư số tiền lớn hơn mỗi tháng",
        "Lựa chọn A tốt hơn, chênh lệch khoảng 50%",
        "Hai lựa chọn bằng nhau vì tổng vốn đầu tư như nhau"
      ],
      "correct": 2,
      "explanation": "A: đầu tư 10 năm, tiền tăng trưởng 15 năm. B: đầu tư 5 năm, tiền tăng trưởng 10 năm. Với lãi kép, 5 năm tăng trưởng thêm tạo ra chênh lệch lớn. A có lợi nhờ thời gian tăng trưởng dài hơn dù tổng vốn như nhau."
    }
  ]
  }),
  "lam-phat-la-gi": patch({
    "quiz": [
    {
      "question": "Cơ chế chính gây ra lạm phát là gì?",
      "options": [
        "Quá nhiều tiền đuổi theo quá ít hàng hóa",
        "Doanh nghiệp đồng loạt tăng giá để tăng lợi nhuận",
        "Người dân tiết kiệm quá ít so với mức thu nhập",
        "Giá dầu thế giới tăng là nguyên nhân duy nhất"
      ],
      "correct": 0,
      "explanation": "Lạm phát có hai nguồn chính: cầu kéo (demand-pull, quá nhiều tiền trong nền kinh tế) và chi phí đẩy (cost-push, nguyên vật liệu đắt hơn). Thường xảy ra cùng lúc."
    },
    {
      "question": "Tại sao mức lạm phát 2% lại được coi là lành mạnh?",
      "options": [
        "Vì nó kích thích chi tiêu và đầu tư hôm nay",
        "Vì 2% vừa đủ bù đắp khấu hao tài sản cố định",
        "Vì IMF quy định bắt buộc mức này cho các nước",
        "Vì doanh nghiệp cần tăng giá 2% để giữ lợi nhuận"
      ],
      "correct": 0,
      "explanation": "Lạm phát vừa phải tạo ra áp lực chi tiêu: tiền sẽ mất giá nên tốt hơn là đầu tư hôm nay. Deflation (giảm phát) nguy hiểm hơn vì mọi người trì hoãn mua sắm chờ giá giảm tiếp."
    },
    {
      "question": "Scenario: Bạn có 100 triệu đồng gửi tiết kiệm ngân hàng lãi suất 6%/năm. Lạm phát bình quân 4%/năm. Sau 5 năm, sức mua thực tế của tiền bạn tăng hay giảm và bao nhiêu?",
      "options": [
        "Tăng 30% (6% × 5 năm)",
        "Không đổi vì lãi suất bù đắp lạm phát",
        "Giảm 20% (4% × 5 năm)",
        "Tăng 10% ((6% - 4%) × 5 năm)"
      ],
      "correct": 3,
      "explanation": "Lãi suất thực = Lãi suất danh nghĩa - Lạm phát = 6% - 4% = 2%/năm. Sau 5 năm, sức mua thực tế tăng khoảng 10% (2% × 5). Nếu lãi suất < lạm phát, bạn mất sức mua dù số tiền tăng."
    }
  ]
  }),
  "gia-tri-thoi-gian-cua-tien": patch({
    "quiz": [
    {
      "question": "Công thức Present Value (PV) là gì?",
      "options": [
        "PV = FV / (1+r)^n",
        "PV = FV × (1+r)^n",
        "PV = FV / (1 + r×n)",
        "PV = FV − (r × n)"
      ],
      "correct": 0,
      "explanation": "PV = FV / (1+r)^n. Chiết khấu (discount) dòng tiền tương lai về hôm nay theo tỷ lệ r mỗi năm, qua n năm. Đây là phép tính ngược của lãi kép."
    },
    {
      "question": "Discount rate (tỷ lệ chiết khấu) đại diện cho điều gì?",
      "options": [
        "Mức lãi suất do Ngân hàng Nhà nước công bố áp dụng chung cho toàn bộ nền kinh tế mỗi năm",
        "Tỷ lệ lạm phát hiện tại được Tổng cục Thống kê công bố định kỳ hàng tháng hoặc hàng quý",
        "Tỷ lệ phần trăm giảm giá bán lẻ hàng hóa mà các cửa hàng áp dụng vào dịp khuyến mãi",
        "Chi phí cơ hội của vốn: lợi nhuận tốt nhất bạn có thể kiếm với rủi ro tương đương"
      ],
      "correct": 3,
      "explanation": "Discount rate phản ánh chi phí cơ hội: nếu bạn có thể kiếm 10%/năm với rủi ro tương đương, thì dùng 10% để chiết khấu. Dòng tiền tương lai chỉ đáng giá nếu PV của nó cao hơn chi phí hôm nay."
    },
    {
      "question": "Scenario: Một dự án đầu tư cần vốn 500 triệu hôm nay. Dự kiến dòng tiền: năm 1: 100 triệu, năm 2: 200 triệu, năm 3: 300 triệu. Với discount rate 10%, PV của tổng dòng tiền tương lai là bao nhiêu? Dự án có nên đầu tư?",
      "options": [
        "PV = 481 triệu, không nên đầu tư",
        "PV = 550 triệu, nên đầu tư (không chiết khấu)",
        "PV = 600 triệu, nên đầu tư (cộng thẳng dòng tiền)",
        "PV = 450 triệu, không nên đầu tư"
      ],
      "correct": 0,
      "explanation": "PV = 100/(1.1) + 200/(1.1)^2 + 300/(1.1)^3 = 90.9 + 165.3 + 225.4 = 481.6 triệu. PV (481 triệu) < Vốn đầu tư (500 triệu) → Không nên đầu tư vì lỗ về giá trị thời gian."
    }
  ]
  }),
  "rui-ro-la-gi": patch({
    "quiz": [
    {
      "question": "Risk premium là gì?",
      "options": [
        "Phần lợi nhuận đầu tư bị đánh thuế thu nhập cá nhân bổ sung theo quy định hiện hành",
        "Khoản phí bảo hiểm bắt buộc mà mọi nhà đầu tư phải đóng trước khi được phép mua trái phiếu doanh nghiệp",
        "Mức độ rủi ro chung của toàn bộ thị trường chứng khoán trong một giai đoạn nhất định",
        "Lợi nhuận thêm mà nhà đầu tư yêu cầu khi chấp nhận rủi ro cao hơn tài sản phi rủi ro"
      ],
      "correct": 3,
      "explanation": "Risk premium = lợi nhuận kỳ vọng - lãi suất phi rủi ro. Cổ phiếu Mỹ lịch sử có risk premium khoảng 5-7% so với trái phiếu chính phủ. Đây là phần thưởng cho sự biến động."
    },
    {
      "question": "Diversification (đa dạng hóa) giúp giảm loại rủi ro nào?",
      "options": [
        "Unsystematic risk (rủi ro riêng của từng công ty/ngành)",
        "Systematic risk (rủi ro của toàn thị trường chung)",
        "Rủi ro lãi suất và rủi ro tỷ giá hối đoái",
        "Mọi loại rủi ro, cả riêng lẻ lẫn toàn thị trường"
      ],
      "correct": 0,
      "explanation": "Đa dạng hóa loại bỏ rủi ro đặc thù của từng tài sản (công ty phá sản, scandal, ngành suy thoái). Nhưng rủi ro thị trường chung (suy thoái toàn nền kinh tế) không thể đa dạng hóa được."
    },
    {
      "question": "Scenario: Bạn có 1 tỷ đồng để đầu tư. Lựa chọn A: Đặt vào trái phiếu chính phủ lãi 6%/năm, gần như không rủi ro. Lựa chọn B: Đầu tư vào quỹ cổ phiếu VN-Index, lịch sử trung bình 12%/năm nhưng có thể -20% trong năm xấu. Lựa chọn C: Đầu tư vào startup, có thể x10 vốn nhưng 80% khả năng mất trắng. Nếu bạn cần tiền mua nhà sau 3 năm, lựa chọn nào phù hợp nhất?",
      "options": [
        "Lựa chọn B vì lãi cao hơn và 3 năm đủ để thị trường phục hồi",
        "Lựa chọn A vì cần bảo toàn vốn cho mục tiêu ngắn hạn",
        "Chia đều 3 lựa chọn để đa dạng hóa",
        "Lựa chọn C vì cơ hội lợi nhuận cao nhất"
      ],
      "correct": 1,
      "explanation": "Mục tiêu mua nhà sau 3 năm là ngắn hạn, cần bảo toàn vốn. Startup quá rủi ro, cổ phiếu có thể giảm sâu trong 3 năm. Trái phiếu chính phủ phù hợp nhất vì rủi ro thấp, bảo toàn vốn dù lãi không cao nhất."
    }
  ]
  }),
  "loi-nhuan-ky-vong": patch({
    "quiz": [
    {
      "question": "Tại sao lợi nhuận kỳ vọng không đảm bảo kết quả thực tế?",
      "options": [
        "Vì kỳ vọng là trung bình dài hạn, không phải từng năm",
        "Vì xác suất ước tính ban đầu hầu như luôn sai lệch",
        "Vì công thức tính luôn chứa sai số làm tròn nhất định",
        "Vì thị trường không hiệu quả nên giá phản ánh sai rủi ro"
      ],
      "correct": 0,
      "explanation": "Kỳ vọng 8% nghĩa là trung bình nhiều lần. Trong một lần cụ thể, bạn có thể được 20% hoặc mất 10%. Sự phân tán quanh giá trị kỳ vọng chính là rủi ro."
    },
    {
      "question": "Sharpe Ratio đo gì?",
      "options": [
        "Lợi nhuận thặng dư chia cho độ lệch chuẩn",
        "Tổng lợi nhuận danh mục đạt được trong năm",
        "Độ lệch chuẩn chia cho lợi nhuận thặng dư",
        "Xác suất danh mục thua lỗ trong một năm bất kỳ"
      ],
      "correct": 0,
      "explanation": "Sharpe Ratio = (lợi nhuận danh mục - lãi suất phi rủi ro) / độ lệch chuẩn. Nó đo lợi nhuận nhận được trên mỗi đơn vị rủi ro chấp nhận. Sharpe cao hơn nghĩa là hiệu quả hơn."
    },
    {
      "question": "Scenario: Bạn có 2 quỹ đầu tư để chọn. Quỹ A: Lợi nhuận kỳ vọng 15%/năm, độ lệch chuẩn 20%. Quỹ B: Lợi nhuận kỳ vọng 12%/năm, độ lệch chuẩn 10%. Lãi suất phi rủi ro là 6%. Quỹ nào có Sharpe Ratio tốt hơn và giá trị là bao nhiêu?",
      "options": [
        "Quỹ B tốt hơn, Sharpe = 0.60",
        "Quỹ A tốt hơn, Sharpe = 0.45",
        "Quỹ A tốt hơn, Sharpe = 0.75 (quên trừ 6%)",
        "Quỹ B tốt hơn, Sharpe = 0.90 (quên trừ 6%)"
      ],
      "correct": 0,
      "explanation": "Sharpe A = (15% - 6%) / 20% = 0.45. Sharpe B = (12% - 6%) / 10% = 0.60. Quỹ B có Sharpe cao hơn nghĩa là tạo ra lợi nhuận thặng dư tốt hơn trên mỗi đơn vị rủi ro chấp nhận."
    }
  ]
  }),
  "thanh-khoan-la-gi": patch({
    "quiz": [
    {
      "question": "Liquidity premium là gì?",
      "options": [
        "Lợi nhuận thêm để bù cho tài sản khó bán",
        "Phần thưởng dành cho giao dịch khối lượng lớn",
        "Tỷ lệ dự trữ bắt buộc mà ngân hàng phải giữ",
        "Phí trả thêm để được thanh toán nhanh hơn"
      ],
      "correct": 0,
      "explanation": "Tài sản kém thanh khoản phải trả lợi nhuận cao hơn để bù đắp cho nhà đầu tư. Đất nền trả lợi suất cao hơn cổ phiếu lớn một phần vì khó bán hơn. Đây là liquidity premium."
    },
    {
      "question": "Ngân hàng quản lý thanh khoản bằng cách nào?",
      "options": [
        "Giữ toàn bộ tiền huy động được trong két sắt, không đem cho vay hay đầu tư bất kỳ khoản nào",
        "Chỉ cho vay các khoản ngắn hạn dưới 1 năm để luôn thu hồi vốn kịp thời khi cần",
        "Duy trì tỷ lệ dự trữ bắt buộc và danh mục tài sản có thể bán nhanh khi cần",
        "Không cần chủ động quản lý vì đã có Ngân hàng Nhà nước đứng ra bảo lãnh mọi rủi ro"
      ],
      "correct": 2,
      "explanation": "Ngân hàng huy động tiền ngắn hạn (tiết kiệm) nhưng cho vay dài hạn (thế chấp). Rủi ro thanh khoản xảy ra khi nhiều người rút tiền cùng lúc (bank run). Dự trữ và tài sản thanh khoản cao là lớp bảo vệ đầu tiên."
    },
    {
      "question": "Scenario: Bạn có 2 tỷ đồng cần đầu tư trong 5 năm. Lựa chọn A: Đất ven đô giá rẻ, dự kiến tăng giá 15%/năm nhưng rất khó bán, có thể mất 1-2 năm mới bán được. Lựa chọn B: Cổ phiếu blue-chip niêm yết, dự kiến tăng giá 10%/năm nhưng có thể bán bất cứ ngày nào. Nếu bạn có thể cần tiền gấp bất cứ lúc nào, lựa chọn nào phù hợp hơn?",
      "options": [
        "B vì thanh khoản cao, bán được ngay khi cần",
        "A vì lợi nhuận kỳ vọng cao hơn 5%/năm",
        "Chia 50-50 để cân bằng lợi nhuận và thanh khoản",
        "Cả hai đều không phù hợp vì rủi ro quá cao"
      ],
      "correct": 0,
      "explanation": "Nếu có thể cần tiền gấp, thanh khoản quan trọng hơn lợi nhuận kỳ vọng. Đất khó bán có thể không bán được khi cần, gây áp lực tài chính. Cổ phiếu có thể bán trong vài ngày, linh hoạt hơn cho nhu cầu tài chính không lường trước."
    }
  ]
  }),
  "no-tot-no-xau": patch({
    "quiz": [
    {
      "question": "Điều gì phân biệt nợ tốt và nợ xấu cơ bản nhất?",
      "options": [
        "Nợ tốt mua tài sản sinh lợi hơn lãi vay",
        "Có tài sản thế chấp là nợ tốt, không có là nợ xấu",
        "Lãi suất dưới 10%/năm là nợ tốt, trên 10% là nợ xấu",
        "Nợ ngắn hạn là nợ tốt, nợ dài hạn là nợ xấu"
      ],
      "correct": 0,
      "explanation": "Nếu tài sản mua về tạo lợi nhuận cao hơn lãi suất vay, nợ làm tăng tài sản ròng. Nếu dùng để tiêu dùng hoặc mua thứ mất giá, nợ làm giảm tài sản ròng theo thời gian."
    },
    {
      "question": "Debt-to-income ratio (DTI) là gì và tại sao quan trọng?",
      "options": [
        "Tổng nợ phải trả hàng tháng chia thu nhập hàng tháng",
        "Tổng dư nợ chia tổng giá trị tài sản đang sở hữu",
        "Số tháng cần để trả hết nợ nếu dùng hết thu nhập",
        "Lãi suất trung bình của mọi khoản vay đang có"
      ],
      "correct": 0,
      "explanation": "DTI = tổng nợ hàng tháng / thu nhập hàng tháng. Ngân hàng thường yêu cầu DTI dưới 43% khi xét duyệt vay. DTI cao nghĩa là thu nhập bị chiếm dụng quá nhiều cho nợ, ít dư địa xử lý cú sốc."
    },
    {
      "question": "Scenario: Bạn có thu nhập 30 triệu/tháng. Hiện tại bạn đang trả nợ nhà 8 triệu/tháng và nợ xe 3 triệu/tháng. Bạn đang cân nhắc vay thêm 5 triệu/tháng để mở quán cà phê với dự kiến lợi nhuận 8 triệu/tháng sau chi phí. DTI mới của bạn sẽ là bao nhiêu và khoản vay này có nên thực hiện?",
      "options": [
        "DTI = 53%, không nên vay vì vượt ngưỡng",
        "DTI = 43%, nên vay vì vẫn trong ngưỡng cho phép",
        "DTI = 36%, nên vay vì DTI còn thấp (bỏ nợ xe)",
        "DTI = 47%, nên vay vì quán cà phê bù được lãi"
      ],
      "correct": 0,
      "explanation": "Tổng nợ mới = 8 + 3 + 5 = 16 triệu/tháng. DTI = 16 / 30 = 53%. DTI 53% vượt ngưỡng an toàn 43% của ngân hàng, nghĩa là thu nhập bị chiếm dụng quá nhiều. Dù quán cà phê sinh lời, rủi ro tài chính vẫn quá cao."
    }
  ]
  }),
  "don-bay-tai-chinh": patch({
    "quiz": [
    {
      "question": "Đòn bẩy tài chính khuếch đại điều gì?",
      "options": [
        "Khuếch đại cả lợi nhuận lẫn thua lỗ trên vốn tự có",
        "Khuếch đại lợi nhuận nhưng giới hạn lỗ ở vốn tự có",
        "Chỉ khuếch đại lợi nhuận khi thị trường đang tăng",
        "Khuếch đại doanh thu nhưng không đổi tỷ suất lợi nhuận"
      ],
      "correct": 0,
      "explanation": "Đòn bẩy là con dao hai lưỡi. Nếu đầu tư tốt, ROE tăng gấp nhiều lần. Nếu đầu tư xấu, mức thua lỗ cũng khuếch đại, có thể vượt cả vốn tự có nếu không quản lý."
    },
    {
      "question": "Tỷ lệ đòn bẩy (leverage ratio) 4:1 nghĩa là gì?",
      "options": [
        "1 đồng vốn tự có kiểm soát 4 đồng tài sản",
        "Cứ 4 đồng lợi nhuận mới trả được 1 đồng lãi vay",
        "Vay gấp 4 lần thu nhập hàng năm của bạn",
        "Tài sản dự kiến tăng 4 lần trong vòng một năm"
      ],
      "correct": 0,
      "explanation": "Leverage 4:1 = tổng tài sản 400 triệu, vốn tự có 100 triệu, nợ 300 triệu. Mỗi biến động 1% của tổng tài sản tạo ra biến động 4% trên vốn tự có."
    },
    {
      "question": "Scenario: Bạn có 200 triệu vốn tự có. Lựa chọn A: Đầu tư không dùng đòn bẩy, dự kiến lợi nhuận 15%/năm. Lựa chọn B: Vay thêm 600 triệu (tổng 800 triệu) với lãi 8%/năm, dự kiến lợi nhuận 15%/năm trên tổng tài sản. Nếu thị trường tăng 15%, ROE của mỗi lựa chọn là bao nhiêu? Nếu thị trường giảm 10% thì sao?",
      "options": [
        "A: 15%/-10%; B: 36%/-64%",
        "A: 15%/-10%; B: 15%/-10% (bỏ đòn bẩy)",
        "A: 15%/-10%; B: 27%/-34% (quên lãi vay)",
        "A: 15%/-10%; B: 60%/-40% (nhân thẳng 4)"
      ],
      "correct": 0,
      "explanation": "Khi tăng 15%: A = 15%. B: Lãi = 800x15% - 600x8% = 120 - 48 = 72 triệu. ROE = 72/200 = 36%. Khi giảm 10%: A = -10%. B: Lỗ = 800x(-10%) - 600x8% = -80 - 48 = -128 triệu. ROE = -128/200 = -64%. Đòn bẩy khuếch đại cả thắng lẫn thua."
    }
  ]
  }),
  "ca-nhan-doanh-nghiep-chinh-phu": patch({
    "quiz": [
    {
      "question": "Điều gì giống nhau giữa tài chính cá nhân và tài chính doanh nghiệp?",
      "options": [
        "Cả hai đều phải cân nhắc: chi phí vốn, lợi nhuận kỳ vọng và rủi ro khi ra quyết định",
        "Cả hai đều dùng đúng một bộ báo cáo tài chính chuẩn hóa để so sánh hiệu quả qua các năm",
        "Cả hai đều có quyền phát hành cổ phiếu ra công chúng để huy động vốn khi cần mở rộng",
        "Cả hai đều nộp thuế thu nhập theo đúng một biểu thuế suất cố định do nhà nước quy định"
      ],
      "correct": 0,
      "explanation": "Dù quy mô khác nhau, cá nhân và doanh nghiệp đều đối mặt với bài toán cơ bản: phân bổ nguồn lực hữu hạn giữa các lựa chọn, cân nhắc rủi ro và lợi nhuận, và quản lý dòng tiền."
    },
    {
      "question": "Chính sách tài khóa (fiscal policy) khác chính sách tiền tệ (monetary policy) như thế nào?",
      "options": [
        "Fiscal là thu chi ngân sách; monetary là cung tiền, lãi suất",
        "Fiscal do ngân hàng trung ương điều hành, monetary do chính phủ",
        "Fiscal chỉ được dùng trong giai đoạn khủng hoảng kinh tế",
        "Fiscal tác động ngắn hạn, monetary tác động dài hạn"
      ],
      "correct": 0,
      "explanation": "Fiscal policy: chính phủ điều tiết qua thuế và chi tiêu công. Monetary policy: ngân hàng trung ương điều tiết qua lãi suất và cung tiền. Hai công cụ khác nhau, thường phối hợp nhau."
    },
    {
      "question": "Scenario: Kinh tế đang suy thoái, doanh nghiệp đóng cửa, người dân mất việc. Chính phủ muốn kích cầu. Lựa chọn A: Giảm thuế 20% để người dân có thêm tiền tiêu dùng. Lựa chọn B: Tăng chi tiêu công 500 nghìn tỷ để xây dựng đường sá, tạo việc làm. Lựa chọn C: Ngân hàng trung ương giảm lãi suất 2% để doanh nghiệp vay rẻ hơn. Lựa chọn nào là fiscal policy và tại sao?",
      "options": [
        "A và B là fiscal policy, C là monetary policy",
        "Chỉ A là fiscal policy vì chỉ A liên quan đến thuế",
        "Cả ba đều là fiscal policy vì cùng mục tiêu kích cầu",
        "Chỉ C là fiscal policy vì tác động qua lãi suất"
      ],
      "correct": 0,
      "explanation": "Fiscal policy (chính sách tài khóa) bao gồm thuế và chi tiêu của chính phủ. Lựa chọn A (giảm thuế) và B (tăng chi tiêu công) đều là fiscal policy. Lựa chọn C (giảm lãi suất) là monetary policy (chính sách tiền tệ) do ngân hàng trung ương thực hiện."
    }
  ]
  }),
  "he-thong-tai-chinh": patch({
    "quiz": [
    {
      "question": "Quỹ đầu tư (investment fund) khác ngân hàng ở điểm nào?",
      "options": [
        "Quỹ gom vốn để đầu tư; ngân hàng huy động để cho vay",
        "Quỹ chỉ mua trái phiếu, ngân hàng chỉ mua cổ phiếu",
        "Quỹ cam kết hoàn vốn, ngân hàng thì không cam kết",
        "Quỹ không cần giấy phép, ngân hàng thì bắt buộc"
      ],
      "correct": 0,
      "explanation": "Ngân hàng: trung gian tín dụng (huy động cho vay). Quỹ đầu tư: gom vốn từ nhiều người để đầu tư vào cổ phiếu, trái phiếu, bất động sản. Nhà đầu tư quỹ chịu rủi ro thị trường, không được bảo lãnh vốn."
    },
    {
      "question": "Thị trường sơ cấp và thị trường thứ cấp khác nhau thế nào?",
      "options": [
        "Thị trường sơ cấp chuyên giao dịch cổ phiếu trong khi thị trường thứ cấp chỉ giao dịch trái phiếu doanh nghiệp",
        "Thị trường sơ cấp dành cho nhà đầu tư mới bắt đầu, thứ cấp dành cho nhà đầu tư có nhiều kinh nghiệm hơn",
        "Thị trường sơ cấp luôn tốt hơn vì nhà đầu tư mua được đúng mức giá phát hành gốc ban đầu",
        "Sơ cấp là nơi doanh nghiệp phát hành chứng khoán lần đầu; thứ cấp là nơi nhà đầu tư mua bán lại với nhau"
      ],
      "correct": 3,
      "explanation": "IPO là thị trường sơ cấp: doanh nghiệp nhận tiền trực tiếp từ nhà đầu tư. Sau đó, cổ phiếu giao dịch trên sàn là thị trường thứ cấp: tiền chảy giữa nhà đầu tư, không vào doanh nghiệp nữa."
    },
    {
      "question": "Scenario: Bạn có 500 triệu đồng muốn đầu tư. Lựa chọn A: Gửi tiết kiệm ngân hàng 6%/năm, được bảo lãnh vốn. Lựa chọn B: Mua quỹ đầu tư chứng khoán, dự kiến lợi nhuận 12%/năm nhưng có thể thua lỗ 20% trong năm xấu. Lựa chọn C: Mua cổ phiếu trực tiếp trên thị trường thứ cấp, dự kiến lợi nhuận 15%/năm nhưng rủi ro cao nhất. Nếu bạn cần tiền sau 6 tháng để mua nhà và không thể chịu rủi ro mất vốn, lựa chọn nào phù hợp nhất?",
      "options": [
        "A vì bảo toàn vốn và rút được bất cứ lúc nào",
        "B vì lợi nhuận kỳ vọng cao gấp đôi gửi tiết kiệm",
        "Chia đều ba lựa chọn để đa dạng hóa rủi ro",
        "C vì lợi nhuận cao nhất trong ba lựa chọn"
      ],
      "correct": 0,
      "explanation": "Khi cần tiền trong ngắn hạn (6 tháng) và không thể chịu rủi ro mất vốn, bảo toàn vốn là ưu tiên hàng đầu. Gửi tiết kiệm bảo lãnh vốn, có thể rút bất cứ lúc nào. Quỹ và cổ phiếu có rủi ro thị trường, giá có thể giảm khi cần tiền."
    }
  ]
  }),
  "thi-truong-tai-chinh": patch({
    "quiz": [
    {
      "question": "Efficient Market Hypothesis (EMH) nói gì?",
      "options": [
        "Giá đã phản ánh mọi thông tin công khai có sẵn",
        "Thị trường luôn tăng dài hạn bất kể vĩ mô",
        "Thị trường hiệu quả là thị trường không có rủi ro",
        "Giả thuyết chỉ đúng ở thị trường đã phát triển"
      ],
      "correct": 0,
      "explanation": "EMH cho rằng giá hiện tại đã phản ánh mọi thông tin. Nếu đúng, phân tích kỹ thuật hay cơ bản không thể liên tục tạo ra alpha (lợi nhuận vượt thị trường). Đây là lý do nhiều chuyên gia ủng hộ quỹ chỉ số."
    },
    {
      "question": "Bull market và bear market khác nhau thế nào?",
      "options": [
        "Bull market: xu hướng tăng kéo dài (thường trên 20%); bear market: xu hướng giảm kéo dài (thường dưới -20%)",
        "Bull market là thuật ngữ chỉ thị trường chứng khoán nói chung, bear market chỉ thị trường trái phiếu nói riêng",
        "Bull market thường được dùng phổ biến ở Mỹ, còn bear market là thuật ngữ đặc trưng riêng của châu Á",
        "Đây chỉ là hai biệt ngữ mang tính hình tượng, không có định nghĩa hay ngưỡng phần trăm chính xác nào"
      ],
      "correct": 0,
      "explanation": "Quy ước: tăng 20% từ đáy là bull market; giảm 20% từ đỉnh là bear market. Lịch sử cho thấy bull market thường kéo dài hơn và tăng nhiều hơn bear market giảm, đây là cơ sở cho triết lý đầu tư dài hạn."
    },
    {
      "question": "Scenario: Bạn đang theo dõi thị trường chứng khoán. VN-Index đã giảm 25% từ đỉnh 6 tháng trước, nhiều nhà đầu tư hoảng loạn bán tháo. Bạn có 100 triệu đồng tiền mặt. Lựa chọn A: Mua vào ngay vì giá đã giảm nhiều, cơ hội tốt. Lựa chọn B: Chờ đợi vì thị trường có thể giảm thêm. Lựa chọn C: Bỏ qua thị trường, gửi tiết kiệm an toàn. Nếu bạn tin vào Efficient Market Hypothesis và lịch sử cho thấy bull market thường kéo dài hơn bear market, lựa chọn nào phù hợp nhất?",
      "options": [
        "Chia nhỏ: mua dần để trung bình giá",
        "A vì giá đã giảm 25%, chắc chắn là đáy",
        "B vì cần chờ xác nhận đáy rồi mới mua vào",
        "C vì thị trường quá rủi ro trong giai đoạn này"
      ],
      "correct": 0,
      "explanation": "Theo EMH, giá hiện tại đã phản ánh thông tin, không thể dự đoán đáy chính xác. Lịch sử cho thấy thị trường hồi phục sau bear market. Chiến lược DCA (Dollar Cost Averaging) - chia nhỏ và mua dần - giúp giảm rủi ro thời điểm, phù hợp với nhà đầu tư dài hạn."
    }
  ]
  }),
  "on-tap-chang-1": patch({
    "quiz": [
    {
      "question": "Khái niệm nào kết nối tất cả 20 bài học chặng 1?",
      "options": [
        "Giá trị thời gian của tiền",
        "Dòng tiền vào và ra hàng tháng",
        "Lãi suất ngân hàng công bố",
        "Tối đa hóa lợi nhuận trước mắt"
      ],
      "correct": 0,
      "explanation": "Time Value of Money là sợi chỉ đỏ: lãi kép, PV/FV, lạm phát, rủi ro, đòn bẩy đều là các biểu hiện khác nhau của cùng một nguyên lý: tiền ở thời điểm khác nhau có giá trị khác nhau."
    },
    {
      "question": "Nếu bạn phải nhớ một điều duy nhất từ chặng 1, đó là gì?",
      "options": [
        "Đầu tư sớm, hiểu rủi ro, quản lý dòng tiền",
        "Tránh vay nợ bằng mọi giá trong mọi hoàn cảnh",
        "Luôn gửi tiết kiệm ngân hàng cho an toàn",
        "Cổ phiếu luôn tốt hơn gửi ngân hàng dài hạn"
      ],
      "correct": 0,
      "explanation": "Bốn trụ cột tài chính cá nhân: bắt đầu sớm để tận dụng lãi kép, hiểu và định giá đúng rủi ro, quản lý dòng tiền trước lợi nhuận, và dùng đòn bẩy có tính toán."
    },
    {
      "question": "Scenario: Bạn 25 tuổi, thu nhập 20 triệu/tháng, chi phí 15 triệu/tháng. Bạn có 100 triệu tiền mặt. Lãi suất ngân hàng 6%/năm, lạm phát 4%/năm. Bạn muốn mua nhà sau 10 năm giá 2 tỷ. Bạn có 3 chiến lược: A) Gửi tiết kiệm 100 triệu + tiết kiệm 5 triệu/tháng. B) Đầu tư cổ phiếu với kỳ vọng 12%/năm, rủi ro có thể -20% trong năm xấu. C) Kết hợp: 50 triệu gửi tiết kiệm an toàn, 50 triệu đầu tư cổ phiếu, tiết kiệm 5 triệu/tháng. Dựa trên các khái niệm chặng 1 (lãi kép, rủi ro, dòng tiền, thời gian), chiến lược nào phù hợp nhất cho mục tiêu 10 năm?",
      "options": [
        "Chiến lược C vì cân bằng an toàn và tăng trưởng",
        "Chiến lược A vì an toàn tuyệt đối cho mục tiêu này",
        "Chiến lược B vì lợi nhuận cao nhất, đạt mục tiêu nhanh",
        "Không nên mua nhà vì giá quá cao so với thu nhập"
      ],
      "correct": 0,
      "explanation": "Với mục tiêu 10 năm, thời gian là ally. Chiến lược C cân bằng: 50 triệu an toàn cho trường hợp khẩn cấp, 50 triệu đầu tư để tận dụng lãi kép dài hạn, 5 triệu/tháng tiết kiệm đều đặn. Lãi kép 12% trên 10 năm có thể tăng gấp 3 lần, nhưng vẫn có phần an toàn để chịu rủi ro. Đây là ứng dụng của: quản lý rủi ro, giá trị thời gian của tiền, và dòng tiền."
    }
  ]
  }),
  "financial-ratios-la-gi": patch({
    "quiz": [
      {
        "question": "Khi dùng ratios để so sánh, điều quan trọng nhất cần lưu ý là gì?",
        "options": [
          "So sánh trong cùng ngành và cùng thời kỳ",
          "Chọn ratio có giá trị cao nhất trong nhóm để đại diện",
          "Dùng càng nhiều ratio càng tốt rồi lấy trung bình lại",
          "Ưu tiên số liệu quý gần nhất vì nó phản ánh hiện tại"
        ],
        "correct": 0,
        "explanation": "Ratio có ý nghĩa khi so sánh trong bối cảnh: cùng ngành (gross margin 20% tốt với retailer nhưng xấu với pharma), cùng thời kỳ, và so với lịch sử của chính công ty đó."
      },
      {
        "question": "Vì sao \"lợi nhuận tuyệt đối\" là một trong những con số dễ gây hiểu lầm nhất khi so sánh hai doanh nghiệp?",
        "options": [
          "Vì nó không cho biết đã dùng bao nhiêu vốn để tạo ra",
          "Vì lợi nhuận tuyệt đối chưa trừ thuế nên chưa so được",
          "Vì chuẩn mực kế toán mỗi nước ghi nhận doanh thu khác",
          "Vì con số tuyệt đối luôn được làm tròn nên sai số lớn"
        ],
        "correct": 0,
        "explanation": "Ratios ra đời chính để giải quyết vấn đề này - chuẩn hóa lợi nhuận theo quy mô vốn/tài sản/doanh thu bỏ ra, cho phép so sánh hiệu quả thực sự giữa các doanh nghiệp có quy mô rất khác nhau."
      },
      {
        "question": "Công ty A lãi 100 tỷ trên vốn chủ 2.000 tỷ; công ty B lãi 10 tỷ trên vốn chủ 100 tỷ. Ai dùng vốn hiệu quả hơn?",
        "options": [
          "B, vì ROE đạt 10% so với 5% của A",
          "A, vì lợi nhuận tuyệt đối gấp mười lần B",
          "A, vì quy mô vốn lớn hơn nên an toàn hơn",
          "Bằng nhau, vì tỷ lệ lãi trên doanh thu như nhau"
        ],
        "correct": 0,
        "explanation": "A lãi gấp 10 lần B về số tuyệt đối nhưng dùng vốn gấp 20 lần. ROE của A là 100/2.000 = 5%, của B là 10/100 = 10% - B tạo ra gấp đôi lợi nhuận trên mỗi đồng vốn cổ đông bỏ vào."
      },
      {
        "question": "Chỉ số nào chuẩn hóa lợi nhuận theo tài sản chứ không theo vốn chủ?",
        "options": [
          "ROA - lợi nhuận trên tổng tài sản",
          "ROE - lợi nhuận trên vốn chủ sở hữu",
          "Gross Margin - lợi nhuận gộp trên doanh thu",
          "Asset Turnover - doanh thu trên tổng tài sản"
        ],
        "correct": 0,
        "explanation": "Mỗi nhóm ratio chọn một mẫu số khác nhau. ROA lấy tổng tài sản, ROE lấy vốn chủ, margin lấy doanh thu. Asset Turnover cũng chia cho tài sản nhưng tử số là doanh thu, không phải lợi nhuận."
      },
      {
        "question": "Một doanh nghiệp có ROE 18%, cao hơn trung bình ngành 12%. Kết luận nào hợp lý nhất?",
        "options": [
          "Cần xem xu hướng nhiều năm và cơ cấu nợ trước khi kết luận",
          "Doanh nghiệp đang có lợi thế cạnh tranh bền vững",
          "Nên mua cổ phiếu vì ROE vượt trung bình ngành",
          "Ngành này suy giảm nên mức trung bình bị kéo xuống"
        ],
        "correct": 0,
        "explanation": "Một con số tại một thời điểm chưa nói lên điều gì. ROE 18% có thể đến từ hiệu quả thật, hoặc từ đòn bẩy cao, hoặc từ một khoản lãi bất thường trong kỳ - ba nguyên nhân dẫn tới ba kết luận đầu tư khác nhau."
      }
    ]
  }),
  "roa-chi-so": patch({
    "quiz": [
      {
        "question": "Doanh nghiệp nào thường có ROA cao nhất?",
        "options": [
          "Công ty phần mềm, ít tài sản cố định",
          "Ngân hàng, vì danh mục cho vay rất lớn",
          "Hãng hàng không, vì đội bay giá trị cao",
          "Nhà máy điện, vì tài sản hạ tầng lớn"
        ],
        "correct": 0,
        "explanation": "Asset-light businesses như software, consulting có ít tài sản cố định nhưng tạo ra nhiều lợi nhuận → ROA cao. Ngân hàng có tổng tài sản rất lớn (cho vay) nên ROA thường chỉ 1-2%."
      },
      {
        "question": "Vì sao so sánh ROA giữa một ngân hàng và một công ty phần mềm gần như vô nghĩa, dù công thức tính ROA là như nhau cho cả hai?",
        "options": [
          "Vì hai mô hình cần lượng tài sản khác nhau về bản chất",
          "Vì ngân hàng áp dụng chuẩn mực kế toán riêng cho tài sản",
          "Vì công ty phần mềm không ghi nhận tài sản cố định nào",
          "Vì lợi nhuận ngân hàng đã trừ dự phòng nên không so được"
        ],
        "correct": 0,
        "explanation": "ROA chỉ có ý nghĩa khi so sánh các công ty CÙNG NGÀNH có mô hình sử dụng tài sản tương tự nhau. So sánh xuyên ngành (đặc biệt giữa ngành thâm dụng tài sản như ngân hàng và ngành thâm dụng con người như tư vấn) sẽ luôn cho kết quả sai lệch."
      },
      {
        "question": "Doanh nghiệp lãi ròng 60 tỷ, tổng tài sản 1.500 tỷ. ROA bằng bao nhiêu?",
        "options": [
          "4% (= 60 ÷ 1.500, lãi ròng chia tổng tài sản)",
          "25% (= 1.500 ÷ 60, đảo ngược tử và mẫu số)",
          "40% (= 60 ÷ 150, lệch một chữ số 0)",
          "6% (= 60 ÷ 1.000, làm tròn tài sản xuống)"
        ],
        "correct": 0,
        "explanation": "ROA = Lợi nhuận ròng / Tổng tài sản = 60/1.500 = 4%. Mỗi đồng tài sản đang tạo ra 4 xu lợi nhuận. Với một nhà sản xuất, mức này là bình thường; với một công ty phần mềm thì là thấp."
      },
      {
        "question": "ROA của một nhà sản xuất tăng từ 6% lên 9% trong ba năm, trong khi tổng tài sản gần như không đổi. Điều gì đã xảy ra?",
        "options": [
          "Lợi nhuận tăng trên cùng nền tài sản cũ",
          "Doanh nghiệp đã bán bớt tài sản kém hiệu quả",
          "Tổng tài sản đã giảm mạnh do khấu hao nhanh",
          "Doanh nghiệp chuyển sang mô hình asset-light"
        ],
        "correct": 0,
        "explanation": "ROA có thể tăng do tử số tăng hoặc mẫu số giảm. Đề bài đã chốt mẫu số gần như không đổi, nên chỉ còn một lời giải thích: cùng bộ tài sản đó nay tạo ra nhiều lợi nhuận hơn."
      },
      {
        "question": "ROA và ROE khác nhau ở đâu?",
        "options": [
          "Mẫu số: tổng tài sản so với vốn chủ sở hữu",
          "Tử số: lợi nhuận gộp so với lợi nhuận ròng",
          "ROA tính theo quý, còn ROE tính theo cả năm",
          "ROA dùng cho công ty chưa niêm yết, ROE cho niêm yết"
        ],
        "correct": 0,
        "explanation": "Cùng tử số là lợi nhuận ròng, khác mẫu số. Khoảng cách giữa hai chỉ số chính là đòn bẩy: doanh nghiệp vay càng nhiều, tài sản càng lớn hơn vốn chủ, ROE càng vượt xa ROA."
      }
    ]
  }),
  "roe-chi-so": patch({
    "quiz": [
      {
        "question": "DuPont decomposition phân tích ROE thành những gì?",
        "options": [
          "Net Margin × Asset Turnover × Financial Leverage",
          "Gross Margin × Asset Turnover × Thuế suất",
          "Net Margin × Vòng quay tồn kho × Đòn bẩy",
          "Doanh thu × Vốn chủ sở hữu × Hệ số thanh toán"
        ],
        "correct": 0,
        "explanation": "ROE = Net Margin × Asset Turnover × Equity Multiplier. Công ty có ROE cao nhờ: (1) margin cao, (2) vòng quay tài sản nhanh, hoặc (3) đòn bẩy tài chính cao. Cần biết ROE cao từ nguồn nào."
      },
      {
        "question": "Hai công ty đều có ROE = 25%, nhưng công ty A đạt được nhờ Net Margin và Asset Turnover tốt, còn công ty B đạt được chủ yếu nhờ vay nợ rất nhiều (Financial Leverage cao). Công ty nào rủi ro hơn về lâu dài?",
        "options": [
          "Công ty B - ROE dựa vào đòn bẩy dễ sụp khi lãi suất tăng",
          "Công ty A - biên lợi nhuận cao thường đi kèm rủi ro giá",
          "Bằng nhau - ROE giống nhau nghĩa là rủi ro giống nhau",
          "Công ty B - nhưng chỉ khi ngành đang tăng trưởng chậm lại"
        ],
        "correct": 0,
        "explanation": "Đây chính là lý do phải luôn \"bóc tách\" ROE bằng DuPont trước khi kết luận. ROE cao nhờ đòn bẩy tài chính là một \"cấu trúc mong manh\" - chỉ cần lãi suất tăng hoặc lợi nhuận hoạt động giảm nhẹ, ROE có thể sụp đổ nhanh và kéo theo rủi ro phá sản cao hơn nhiều."
      },
      {
        "question": "Lãi ròng 90 tỷ, vốn chủ sở hữu 500 tỷ, tổng tài sản 1.500 tỷ. ROE bằng bao nhiêu?",
        "options": [
          "18% (= 90 ÷ 500, lãi ròng chia vốn chủ)",
          "6% (= 90 ÷ 1.500, dùng nhầm tổng tài sản)",
          "33% (= 500 ÷ 1.500, tỷ trọng vốn chủ)",
          "3,6% (= 90 ÷ 2.000, cộng nhầm hai mẫu số)"
        ],
        "correct": 0,
        "explanation": "ROE = Lợi nhuận ròng / Vốn chủ sở hữu = 90/500 = 18%. Con số 6% ở phương án B chính là ROA - dùng nhầm tổng tài sản làm mẫu số là lỗi phổ biến nhất với chỉ số này."
      },
      {
        "question": "ROE của một doanh nghiệp nhảy từ 15% lên 60% dù lợi nhuận gần như không đổi. Nguyên nhân có khả năng nhất?",
        "options": [
          "Vốn chủ sở hữu thu hẹp mạnh, làm mẫu số nhỏ đi",
          "Doanh thu tăng đột biến trong kỳ vừa rồi",
          "Tổng tài sản tăng nhanh nhờ vay thêm dài hạn",
          "Biên lợi nhuận gộp cải thiện nhờ giá nguyên liệu giảm"
        ],
        "correct": 0,
        "explanation": "Tử số đứng yên thì chỉ mẫu số giải thích được cú nhảy. Vốn chủ co lại vì mua cổ phiếu quỹ quy mô lớn hoặc vì lỗ lũy kế ăn mòn - ROE 60% kiểu này là dấu hiệu cảnh báo, không phải thành tích."
      },
      {
        "question": "Vì sao ROE duy trì trên 15% suốt nhiều năm được coi là dấu hiệu của lợi thế cạnh tranh?",
        "options": [
          "Vì cạnh tranh thường kéo lợi suất vốn về mức trung bình",
          "Vì ROE trên 15% là ngưỡng bắt buộc để được niêm yết",
          "Vì mức đó đảm bảo doanh nghiệp luôn trả cổ tức đều đặn",
          "Vì các quỹ đầu tư chỉ giải ngân khi ROE vượt qua 15%"
        ],
        "correct": 0,
        "explanation": "Lợi suất cao thu hút đối thủ, đối thủ kéo lợi suất xuống. Giữ được ROE cao qua nhiều năm nghĩa là có thứ gì đó ngăn quá trình đó lại - thương hiệu, chi phí chuyển đổi, quy mô - tức là một economic moat thật."
      }
    ]
  }),
  "roic-chi-so": patch({
    "quiz": [
      {
        "question": "Công ty có ROIC = 8% và WACC = 10%. Điều này có nghĩa là gì?",
        "options": [
          "Công ty đang phá hủy giá trị dù vẫn báo lãi",
          "Công ty đang tạo giá trị nhưng với tốc độ chậm",
          "Công ty cần vay thêm nợ để hạ chi phí vốn xuống",
          "Công ty hòa vốn về mặt kinh tế, chưa lãi chưa lỗ"
        ],
        "correct": 0,
        "explanation": "Khi ROIC < WACC, mỗi đồng đầu tư tạo ra ít hơn chi phí để có vốn đó. Doanh nghiệp đang phá hủy giá trị cổ đông dù vẫn có lãi trên P&L."
      },
      {
        "question": "Vì sao ROIC được nhiều quỹ đầu tư dài hạn xem là chỉ số \"trung thực\" hơn ROE khi đánh giá chất lượng thực sự của một doanh nghiệp?",
        "options": [
          "Vì mẫu số gồm cả nợ nên vay thêm không đẩy chỉ số lên",
          "Vì ROIC dùng lợi nhuận sau thuế nên phản ánh sát hơn ROE",
          "Vì ROIC loại trừ tài sản vô hình vốn hay bị định giá cao",
          "Vì ROIC được kiểm toán riêng còn ROE thì doanh nghiệp tự công bố"
        ],
        "correct": 0,
        "explanation": "ROE có thể bị bóp méo dễ dàng: vay thêm nợ để mua lại cổ phiếu (buyback) sẽ tự động đẩy ROE lên dù hiệu quả kinh doanh cốt lõi không đổi. ROIC miễn nhiễm với thủ thuật này vì mẫu số là TOÀN BỘ vốn đầu tư (Debt + Equity), phản ánh đúng hơn khả năng tạo giá trị thực sự của hoạt động kinh doanh."
      },
      {
        "question": "Một doanh nghiệp có ROIC 6%, WACC 9%, và đang lên kế hoạch mở rộng gấp đôi quy mô. Nhà đầu tư nên nghĩ gì?",
        "options": [
          "Mở rộng sẽ phá hủy giá trị nhanh gấp đôi",
          "Mở rộng giúp chia đều chi phí cố định nên ROIC sẽ tăng",
          "Quy mô lớn hơn thường kéo WACC xuống dưới mức ROIC",
          "Cần chờ kết quả năm sau rồi mới đánh giá được điều gì"
        ],
        "correct": 0,
        "explanation": "Tăng trưởng chỉ tốt khi ROIC > WACC. Dưới ngưỡng đó, mỗi đồng vốn mới rót vào lại mất thêm 3 xu - mở rộng làm vấn đề to ra chứ không sửa được nó. Đây là lý do nhiều thương vụ mở rộng rầm rộ vẫn làm cổ phiếu giảm."
      },
      {
        "question": "Doanh nghiệp có NOPAT 120 tỷ, vốn đầu tư 1.000 tỷ (nợ 400, vốn chủ 600). ROIC bằng bao nhiêu?",
        "options": [
          "12% (= 120 ÷ 1.000, chia toàn bộ vốn đầu tư)",
          "20% (= 120 ÷ 600, chỉ chia cho vốn chủ - đó là ROE)",
          "30% (= 120 ÷ 400, chỉ chia cho phần nợ vay)",
          "8,6% (= 120 ÷ 1.400, cộng nhầm nợ và vốn chủ hai lần)"
        ],
        "correct": 0,
        "explanation": "ROIC = NOPAT / Invested Capital = 120/1.000 = 12%. Phương án B chính là ROE - dùng nhầm vốn chủ làm mẫu số là cách vô tình khiến một doanh nghiệp vay nhiều trông hiệu quả hơn thực tế."
      },
      {
        "question": "Hai mảng của cùng tập đoàn có ROIC 25% và 7%. Vì sao thị trường thường định giá chúng theo hai bội số khác nhau?",
        "options": [
          "Vì mảng ROIC cao biến mỗi đồng tái đầu tư thành nhiều giá trị hơn",
          "Vì mảng ROIC cao luôn có doanh thu lớn hơn mảng còn lại",
          "Vì quy định kế toán buộc tách riêng bội số cho từng mảng",
          "Vì mảng ROIC thấp thường có rủi ro pháp lý cao hơn hẳn"
        ],
        "correct": 0,
        "explanation": "Giá trị của tăng trưởng phụ thuộc vào lợi suất tạo ra trên vốn tái đầu tư. Mảng 25% biến mỗi đồng giữ lại thành nhiều giá trị hơn hẳn mảng 7%, nên xứng đáng bội số cao hơn - đây là lập luận đằng sau việc tách mảng (spin-off)."
      }
    ]
  }),
  "quick-ratio": patch({
    "quiz": [
      {
        "question": "Ngành nào cần theo dõi Quick Ratio nhiều nhất?",
        "options": [
          "Bán lẻ thời trang, tồn kho dễ lỗi mùa",
          "Ngân hàng, vì tài sản chủ yếu là khoản vay",
          "Tư vấn quản lý, vì chi phí chính là lương",
          "Phần mềm, vì doanh thu ghi nhận theo kỳ"
        ],
        "correct": 0,
        "explanation": "Bán lẻ hàng theo mùa (thời trang, điện tử) có inventory lớn và có thể lỗi thời. Current Ratio có thể tốt nhưng Quick Ratio thấp, phản ánh rủi ro thanh khoản thực tế tốt hơn."
      },
      {
        "question": "Vì sao khoảng cách lớn giữa Current Ratio và Quick Ratio của một công ty là một tín hiệu cảnh báo cần chú ý?",
        "options": [
          "Vì thanh khoản đang phụ thuộc vào việc bán được hàng tồn kho",
          "Vì công ty đang giữ quá nhiều tiền mặt không sinh lời",
          "Vì khoản phải thu đã tăng nhanh hơn doanh thu trong kỳ",
          "Vì nợ ngắn hạn đang lớn hơn nợ dài hạn một cách bất thường"
        ],
        "correct": 0,
        "explanation": "Quick Ratio loại bỏ hàng tồn kho chính vì đây là tài sản ngắn hạn kém thanh khoản và rủi ro nhất - dễ mất giá trị (lỗi thời, hết mùa) và không chắc bán được nhanh với giá gốc. Khoảng cách lớn giữa hai ratio cảnh báo công ty đang phụ thuộc quá nhiều vào khả năng bán hàng tồn kho để đảm bảo thanh khoản."
      },
      {
        "question": "Tài sản ngắn hạn 600 tỷ, trong đó tồn kho 250 tỷ; nợ ngắn hạn 300 tỷ. Quick Ratio bằng bao nhiêu?",
        "options": [
          "1,17 (= (600 − 250) ÷ 300, đã trừ tồn kho)",
          "2,0 (= 600 ÷ 300, quên trừ tồn kho - đó là Current)",
          "0,83 (= 250 ÷ 300, chỉ lấy riêng phần tồn kho)",
          "1,83 (= (600 − 50) ÷ 300, trừ nhầm con số tồn kho)"
        ],
        "correct": 0,
        "explanation": "Quick Ratio = (Tài sản ngắn hạn − Tồn kho) / Nợ ngắn hạn = 350/300 = 1,17. Current Ratio là 2,0 - khoảng cách giữa hai con số cho thấy gần một nửa tài sản ngắn hạn nằm ở hàng chưa bán được."
      },
      {
        "question": "Một chuỗi thời trang có Current Ratio 2,5 nhưng Quick Ratio chỉ 0,6. Kết luận nào đúng nhất?",
        "options": [
          "Khả năng trả nợ ngắn hạn phụ thuộc vào việc xả được hàng",
          "Công ty an toàn vì Current Ratio đã trên mức 2,0",
          "Công ty đang thiếu hàng để bán trong mùa cao điểm",
          "Nợ ngắn hạn của công ty đã bị ghi nhận thiếu trong kỳ"
        ],
        "correct": 0,
        "explanation": "Quick Ratio 0,6 nghĩa là tiền và khoản phải thu chỉ phủ được 60% nợ ngắn hạn. Phần còn lại trông chờ vào bán hàng tồn kho - đúng loại tài sản có thể mất 50-70% giá trị nếu lỡ mùa."
      },
      {
        "question": "Với một công ty phần mềm, Current Ratio và Quick Ratio gần như bằng nhau. Vì sao?",
        "options": [
          "Vì công ty gần như không có hàng tồn kho để trừ ra",
          "Vì phần mềm được ghi nhận toàn bộ vào tài sản vô hình",
          "Vì doanh thu trả trước làm hai chỉ số tự động bằng nhau",
          "Vì chuẩn mực kế toán không cho phép công ty phần mềm có tồn kho"
        ],
        "correct": 0,
        "explanation": "Hai chỉ số chỉ khác nhau đúng ở phần tồn kho. Không có tồn kho thì không có gì để trừ, nên với phần mềm và dịch vụ, tính thêm Quick Ratio hầu như không cho thêm thông tin nào."
      }
    ]
  }),
  "interest-coverage-chi-so": patch({
    "quiz": [
      {
        "question": "Interest Coverage giảm từ 5x xuống 1.8x qua 2 năm. Bạn lo điều gì?",
        "options": [
          "Biên an toàn thu hẹp nhanh, dễ mất khả năng trả lãi",
          "Doanh nghiệp đang trả bớt nợ nên chi phí lãi giảm dần",
          "Tỷ lệ D/E đã xuống thấp hơn mức trung bình của ngành",
          "Doanh thu tăng nhanh khiến chi phí lãi bị pha loãng đi"
        ],
        "correct": 0,
        "explanation": "Trend giảm nhanh là warning sign quan trọng hơn con số tại một thời điểm. EBIT đang giảm hoặc interest expense đang tăng - cần điều tra nguyên nhân và đánh giá sustainability."
      },
      {
        "question": "Vì sao Interest Coverage đặc biệt quan trọng để theo dõi với các doanh nghiệp có tỷ lệ nợ vay cao qua trái phiếu?",
        "options": [
          "Vì trễ hạn trả lãi trái phiếu kích hoạt vỡ nợ ngay lập tức",
          "Vì lãi suất trái phiếu luôn cao hơn lãi vay ngân hàng nhiều",
          "Vì trái phiếu không có tài sản bảo đảm nên rủi ro lớn hơn",
          "Vì trái phiếu phải trả cả gốc lẫn lãi vào mỗi kỳ thanh toán"
        ],
        "correct": 0,
        "explanation": "Interest Coverage là chỉ báo sớm (leading indicator) về khả năng vỡ nợ - nó cho biết công ty còn \"đệm\" (buffer) bao nhiêu trước khi lợi nhuận hoạt động không đủ trả lãi. Với trái phiếu, việc không trả được lãi đúng hạn kích hoạt default ngay lập tức, khác với vay ngân hàng có thể đàm phán gia hạn."
      },
      {
        "question": "EBIT 240 tỷ, chi phí lãi vay 80 tỷ. Interest Coverage bằng bao nhiêu?",
        "options": [
          "3,0x (= 240 ÷ 80, EBIT chia chi phí lãi)",
          "0,33x (= 80 ÷ 240, đảo ngược tử và mẫu số)",
          "2,0x (= (240 − 80) ÷ 80, trừ lãi trước khi chia)",
          "4,0x (= 240 ÷ 60, dùng nhầm số chi phí lãi vay)"
        ],
        "correct": 0,
        "explanation": "Interest Coverage = EBIT / Chi phí lãi vay = 240/80 = 3,0x. Nằm trong vùng 2-3x: chấp nhận được nhưng cần theo dõi sát, vì EBIT chỉ cần giảm một phần ba là chạm ngưỡng nguy hiểm."
      },
      {
        "question": "Công ty X giữ Interest Coverage ổn định 2,5x suốt 5 năm. Công ty Y giảm từ 6x xuống 2,8x trong 2 năm. Bên nào đáng lo hơn?",
        "options": [
          "Y, vì tốc độ xấu đi quan trọng hơn mức tuyệt đối",
          "X, vì con số tuyệt đối của X đang thấp hơn Y",
          "Bằng nhau, vì cả hai đều nằm trong vùng 2-3x",
          "X, vì giữ nguyên một mức nhiều năm là dấu hiệu trì trệ"
        ],
        "correct": 0,
        "explanation": "Y vẫn cao hơn X về con số, nhưng đã mất hơn một nửa đệm an toàn trong hai năm. Nếu xu hướng đó tiếp tục thêm một năm, Y rơi xuống dưới 1,5x - còn X đã chứng minh được khả năng giữ mức của mình qua nhiều chu kỳ."
      },
      {
        "question": "Interest Coverage bằng 1,0x nghĩa là gì?",
        "options": [
          "Lợi nhuận hoạt động vừa đủ trả lãi, không còn dư đồng nào",
          "Doanh nghiệp đã trả xong toàn bộ lãi vay của năm nay",
          "Nợ vay đúng bằng lợi nhuận hoạt động trong kỳ vừa rồi",
          "Doanh nghiệp hòa vốn, doanh thu vừa đủ bù mọi chi phí"
        ],
        "correct": 0,
        "explanation": "EBIT vừa khớp chi phí lãi, nghĩa là không còn gì cho thuế, cho cổ đông, cho tái đầu tư. Chỉ cần một quý doanh thu yếu là phải vay thêm hoặc bán tài sản chỉ để trả lãi - trạng thái này hiếm khi kéo dài quá lâu."
      }
    ]
  }),
  "asset-turnover": patch({
    "quiz": [
      {
        "question": "Trong DuPont formula, Asset Turnover kết hợp với gì để tính ROE?",
        "options": [
          "Net Margin và Equity Multiplier",
          "Gross Margin và tỷ lệ chi trả cổ tức",
          "Net Margin và vòng quay hàng tồn kho",
          "Biên EBITDA và hệ số thanh toán nhanh"
        ],
        "correct": 0,
        "explanation": "DuPont: ROE = Net Margin × Asset Turnover × Financial Leverage. Walmart có Net Margin thấp (~2-3%) nhưng Asset Turnover cao (~2.5x) và leverage vừa phải → ROE 15-20%."
      },
      {
        "question": "Một công ty sản xuất có Asset Turnover thấp hơn nhiều so với đối thủ cùng ngành trong 3 năm liên tiếp. Điều này có ý nghĩa gì cần điều tra thêm?",
        "options": [
          "Có thể dư thừa công suất hoặc tài sản không sinh lời",
          "Có thể công ty đang bán hàng với giá cao hơn đối thủ",
          "Có thể công ty vừa thanh lý bớt nhà xưởng cũ trong kỳ",
          "Có thể chi phí nguyên liệu của công ty thấp hơn mặt bằng"
        ],
        "correct": 0,
        "explanation": "So sánh Asset Turnover với đối thủ TRỰC TIẾP cùng ngành (không phải trung bình toàn thị trường) là cách đúng để phát hiện vấn đề thực sự - nếu công ty thấp hơn đáng kể so với đối thủ cùng quy mô, cùng mô hình kinh doanh, đó là tín hiệu cần điều tra hiệu quả sử dụng tài sản."
      },
      {
        "question": "Doanh thu 3.000 tỷ, tổng tài sản 1.200 tỷ. Asset Turnover bằng bao nhiêu?",
        "options": [
          "2,5 lần (= 3.000 ÷ 1.200, doanh thu chia tài sản)",
          "0,4 lần (= 1.200 ÷ 3.000, đảo ngược tử và mẫu số)",
          "1,8 lần (= (3.000 − 1.200) ÷ 1.000, trừ trước khi chia)",
          "3,0 lần (= 3.000 ÷ 1.000, làm tròn tài sản xuống)"
        ],
        "correct": 0,
        "explanation": "Asset Turnover = Doanh thu / Tổng tài sản = 3.000/1.200 = 2,5 lần. Mỗi đồng tài sản đang tạo ra 2,5 đồng doanh thu - mức điển hình của bán lẻ, và rất cao đối với một nhà sản xuất nặng."
      },
      {
        "question": "Vì sao Hòa Phát có Asset Turnover thấp hơn hẳn một công ty tư vấn quản lý?",
        "options": [
          "Vì sản xuất thép cần khu liên hợp trị giá hàng chục nghìn tỷ",
          "Vì công ty tư vấn có biên lợi nhuận cao hơn ngành thép",
          "Vì doanh thu ngành thép biến động mạnh theo chu kỳ hàng hóa",
          "Vì công ty tư vấn thu tiền trước còn thép bán chịu cho khách"
        ],
        "correct": 0,
        "explanation": "Mẫu số của Hòa Phát là hàng chục nghìn tỷ tài sản cố định; của công ty tư vấn thì gần như bằng không. Chênh lệch này phản ánh mô hình kinh doanh, không phải năng lực quản trị - nên chỉ so trong cùng ngành mới có nghĩa."
      },
      {
        "question": "Walmart có Net Margin chỉ 2-3% nhưng ROE vẫn đạt 15-20%. Mảnh ghép nào giải thích điều đó?",
        "options": [
          "Asset Turnover khoảng 2,5 lần bù cho biên mỏng",
          "Đòn bẩy tài chính rất cao so với các đối thủ bán lẻ",
          "Biên lợi nhuận gộp cao hơn nhiều so với biên ròng",
          "Vòng quay tồn kho chậm giúp giữ giá bán ổn định hơn"
        ],
        "correct": 0,
        "explanation": "DuPont nhân ba thành phần với nhau, nên biên mỏng vẫn ra ROE tốt nếu vòng quay đủ nhanh. Đây chính là mô hình \"biên thấp, vòng quay cao\" của bán lẻ - và là lý do không thể đánh giá bán lẻ bằng riêng chỉ số margin."
      }
    ]
  }),
  "pe-la-gi": patch({
    "quiz": [
      {
        "question": "Vấn đề lớn nhất của P/E khi so sánh các công ty là gì?",
        "options": [
          "Bị bóp méo bởi cơ cấu vốn và chính sách kế toán",
          "Chỉ tính được cho doanh nghiệp đã niêm yết sàn lớn",
          "Thay đổi mỗi phiên nên không dùng để so sánh được",
          "Cần dữ liệu 5 năm liền mới cho ra kết quả đáng tin"
        ],
        "correct": 0,
        "explanation": "P/E bị bóp méo bởi đòn bẩy tài chính (interest expense) và chính sách kế toán. Không dùng được với công ty lỗ (P/E âm). Nên dùng EV/EBITDA để so sánh công ty có cơ cấu vốn khác nhau."
      },
      {
        "question": "Hai cổ phiếu cùng ngành có P/E lần lượt là 10x và 25x. Kết luận nào là hợp lý nhất chỉ dựa trên thông tin này?",
        "options": [
          "Cần tìm hiểu lý do đằng sau chênh lệch trước khi kết luận",
          "Cổ phiếu 10x rẻ hơn nên là cơ hội đầu tư tốt hơn hẳn",
          "Cổ phiếu 25x tốt hơn vì được thị trường ưa chuộng hơn",
          "Chênh lệch này chỉ phản ánh quy mô vốn hóa khác nhau"
        ],
        "correct": 0,
        "explanation": "P/E chỉ là điểm khởi đầu của phân tích, không phải kết luận cuối cùng. Chênh lệch P/E lớn giữa hai công ty cùng ngành luôn có lý do - nhiệm vụ của nhà phân tích là tìm ra lý do đó là hợp lý (tăng trưởng thật) hay thị trường đang định giá sai."
      },
      {
        "question": "Giá cổ phiếu 60.000đ, EPS 4.000đ. P/E bằng bao nhiêu?",
        "options": [
          "15 lần (= 60.000 ÷ 4.000, giá chia EPS)",
          "0,067 lần (= 4.000 ÷ 60.000, đảo tử và mẫu)",
          "24 lần (= 60.000 ÷ 2.500, dùng nhầm số EPS)",
          "56.000đ (= 60.000 − 4.000, trừ thay vì chia)"
        ],
        "correct": 0,
        "explanation": "P/E = Giá / EPS = 60.000/4.000 = 15 lần. Đọc theo nghĩa đen: nhà đầu tư đang trả 15 đồng cho mỗi đồng lợi nhuận hàng năm, tức cần 15 năm lợi nhuận ở mức hiện tại để hoàn lại giá mua."
      },
      {
        "question": "Một công ty đang lỗ. P/E của nó nói lên điều gì?",
        "options": [
          "Không dùng được, vì P/E âm không có ý nghĩa kinh tế",
          "P/E bằng 0 vì lợi nhuận trong kỳ không còn dương nữa",
          "P/E rất cao, phản ánh kỳ vọng phục hồi của thị trường",
          "P/E vẫn tính bình thường nhưng phải lấy giá trị tuyệt đối"
        ],
        "correct": 0,
        "explanation": "Mẫu số âm khiến chỉ số mất ý nghĩa - một công ty lỗ nặng hơn sẽ cho P/E âm 'ít âm hơn', điều hoàn toàn vô nghĩa. Với doanh nghiệp lỗ, thị trường chuyển sang EV/EBITDA, EV/Doanh thu hoặc P/B."
      },
      {
        "question": "Vì sao ngân hàng Việt Nam thường giao dịch ở P/E 8-12 lần còn FPT ở 15-20 lần?",
        "options": [
          "Thị trường kỳ vọng tốc độ tăng lợi nhuận khác nhau",
          "Ngân hàng có vốn hóa lớn hơn nên bội số bị kéo xuống",
          "Cổ phiếu công nghệ có thanh khoản thấp hơn ngân hàng",
          "Ngân hàng trả cổ tức tiền mặt đều hơn doanh nghiệp công nghệ"
        ],
        "correct": 0,
        "explanation": "P/E là cái giá thị trường trả cho tăng trưởng tương lai. Ngành tăng trưởng chậm và chịu quản lý vốn chặt như ngân hàng nhận bội số thấp hơn; kỳ vọng lợi nhuận tăng nhanh được trả giá cao hơn."
      }
    ]
  }),
  "ev-ebitda-la-gi": patch({
    "quiz": [
      {
        "question": "EV/EBITDA ngành tech thường cao hơn ngành retail vì sao?",
        "options": [
          "Thị trường kỳ vọng tăng trưởng và biên mở rộng hơn",
          "Doanh nghiệp tech dùng nhiều vốn cố định hơn retail",
          "Retail hầu như không tạo ra EBITDA dương ổn định",
          "Enterprise Value của tech thấp hơn nên bội số cao lên"
        ],
        "correct": 0,
        "explanation": "Doanh nghiệp tăng trưởng cao + biên có thể mở rộng được → thị trường trả premium (EV/EBITDA cao). Retail tăng trưởng chậm, margin thấp → EV/EBITDA thấp hơn. Kỳ vọng tăng trưởng được định giá vào multiple."
      },
      {
        "question": "Vì sao các ngân hàng đầu tư trong thương vụ M&A gần như luôn ưu tiên dùng EV/EBITDA thay vì P/E để định giá công ty mục tiêu?",
        "options": [
          "Vì bên mua tiếp nhận cả nợ, nên cần giá trọn gói",
          "Vì P/E không áp dụng được cho công ty chưa niêm yết",
          "Vì EV/EBITDA thường cho mức định giá thấp hơn P/E",
          "Vì EBITDA được kiểm toán còn lợi nhuận ròng thì không"
        ],
        "correct": 0,
        "explanation": "Trong M&A, bên mua đứt (acquire) toàn bộ doanh nghiệp bao gồm cả nghĩa vụ nợ hiện có - EV phản ánh đúng \"giá trọn gói\" này, trong khi P/E chỉ nhìn từ góc độ cổ đông (Equity Value), bỏ qua phần nợ mà bên mua cũng phải gánh."
      },
      {
        "question": "Vốn hóa 800 tỷ, nợ vay 300 tỷ, tiền mặt 100 tỷ, EBITDA 200 tỷ. EV/EBITDA bằng bao nhiêu?",
        "options": [
          "5,0x (EV = 800 + 300 − 100 = 1.000; chia 200)",
          "4,0x (EV = 800; bỏ quên nợ vay và tiền mặt)",
          "6,0x (EV = 800 + 300 + 100; cộng nhầm tiền mặt)",
          "5,5x (EV = 800 + 300 − 100 + 100; cộng tiền hai lần)"
        ],
        "correct": 0,
        "explanation": "EV = Vốn hóa + Nợ vay − Tiền mặt = 800 + 300 − 100 = 1.000 tỷ. EV/EBITDA = 1.000/200 = 5,0x. Tiền mặt bị trừ ra vì bên mua có thể dùng chính số tiền đó để trả bớt giá mua."
      },
      {
        "question": "Hai công ty có EBITDA giống hệt nhau nhưng một bên vay nhiều hơn hẳn. So sánh chúng bằng chỉ số nào là đúng?",
        "options": [
          "EV/EBITDA, vì chỉ số này trung lập với cơ cấu vốn",
          "P/E, vì chỉ số này đã phản ánh chi phí lãi vay thực tế",
          "P/B, vì giá trị sổ sách không phụ thuộc vào nợ vay",
          "Biên lợi nhuận ròng, vì nó chuẩn hóa theo doanh thu"
        ],
        "correct": 0,
        "explanation": "Bên vay nhiều trả lãi nhiều, Net Income thấp hơn, P/E trông cao hơn - dù hoạt động kinh doanh cốt lõi y hệt. EV/EBITDA đứng trên cả nợ lẫn vốn chủ nên không bị ảnh hưởng bởi cách doanh nghiệp huy động vốn."
      },
      {
        "question": "Điểm yếu của EBITDA mà người dùng EV/EBITDA cần nhớ là gì?",
        "options": [
          "Nó bỏ qua chi phí đầu tư tài sản để duy trì hoạt động",
          "Nó bị ảnh hưởng bởi thuế suất khác nhau giữa các nước",
          "Nó chỉ tính được với doanh nghiệp có tài sản cố định lớn",
          "Nó thay đổi theo cơ cấu vốn giống hệt như lợi nhuận ròng"
        ],
        "correct": 0,
        "explanation": "EBITDA cộng ngược khấu hao, nên một doanh nghiệp phải liên tục thay máy móc trông giống hệt một doanh nghiệp không cần đầu tư gì. Đây là lý do EBITDA từng bị gọi là lợi nhuận trước mọi thứ tệ."
      }
    ]
  }),
  "eps-chi-so": patch({
    "quiz": [
      {
        "question": "Tại sao dùng diluted EPS thay vì basic EPS?",
        "options": [
          "Diluted tính cả options/warrants - phản ánh rủi ro pha loãng",
          "Quy định bắt buộc phải công bố, không có ý nghĩa phân tích riêng nào",
          "Basic EPS tính sai vì không loại cổ phiếu quỹ ra khỏi mẫu số",
          "Diluted EPS luôn cao hơn basic nên trông đẹp hơn với cổ đông"
        ],
        "correct": 0,
        "explanation": "Diluted EPS cho biết EPS sẽ là bao nhiêu nếu TẤT CẢ options, warrants, convertibles được thực hiện. Thường thấp hơn basic EPS. Phản ánh đúng hơn rủi ro pha loãng."
      },
      {
        "question": "Công ty phát hành thêm 20% cổ phiếu mới để huy động vốn (không thay đổi Net Income ngay lập tức). Điều gì xảy ra với EPS?",
        "options": [
          "Không xác định được nếu thiếu thông tin về giá cổ phiếu mới",
          "EPS không thay đổi vì Net Income vẫn giữ nguyên như trước",
          "EPS tăng lên vì công ty có thêm vốn để mở rộng kinh doanh",
          "EPS giảm - cùng Net Income chia cho nhiều cổ phiếu hơn"
        ],
        "correct": 3,
        "explanation": "Đây là hiện tượng dilution (pha loãng): phát hành thêm cổ phiếu làm tăng mẫu số trong công thức EPS = Net Income / Số cổ phiếu, khiến EPS giảm."
      },
      {
        "question": "Lợi nhuận ròng 480 tỷ, số cổ phiếu lưu hành 120 triệu. EPS bằng bao nhiêu?",
        "options": [
          "4.000đ (= 480 tỷ ÷ 120 triệu cổ phiếu)",
          "400đ (= 480 tỷ ÷ 1,2 tỷ, lệch một chữ số 0)",
          "25.000đ (= 120 triệu ÷ 480 tỷ, đảo tử mẫu)",
          "40.000đ (= 480 tỷ ÷ 12 triệu, sai số cổ phiếu)"
        ],
        "correct": 0,
        "explanation": "EPS = Lợi nhuận ròng / Số cổ phiếu lưu hành = 480.000.000.000 / 120.000.000 = 4.000đ mỗi cổ phiếu. Nhân với P/E thị trường sẽ ra mức giá lý thuyết của cổ phiếu đó."
      },
      {
        "question": "EPS tăng 15% nhưng lợi nhuận ròng chỉ tăng 5%. Nguyên nhân khả dĩ nhất?",
        "options": [
          "Công ty đã mua lại cổ phiếu quỹ, làm giảm số lượng lưu hành",
          "Công ty vừa phát hành thêm cổ phiếu để huy động vốn mới",
          "Biên lợi nhuận gộp cải thiện nhờ chi phí đầu vào giảm",
          "Thuế suất doanh nghiệp được điều chỉnh giảm trong kỳ này"
        ],
        "correct": 0,
        "explanation": "Tử số tăng 5% mà kết quả tăng 15% thì mẫu số phải co lại. Mua cổ phiếu quỹ làm giảm số cổ phiếu lưu hành, đẩy EPS lên mà không cần kinh doanh tốt hơn - một cách làm đẹp chỉ số cần nhận ra."
      },
      {
        "question": "Vì sao EPS một mình không đủ để so sánh hai doanh nghiệp?",
        "options": [
          "Vì nó phụ thuộc vào số cổ phiếu, vốn tùy mỗi công ty",
          "Vì EPS không tính đến chi phí lãi vay của doanh nghiệp",
          "Vì EPS chỉ công bố theo năm nên không so sánh kịp thời",
          "Vì mỗi ngành áp dụng một công thức tính EPS riêng biệt"
        ],
        "correct": 0,
        "explanation": "Một công ty có thể chia cùng khoản lợi nhuận cho 10 triệu hay 1 tỷ cổ phiếu, cho ra EPS chênh nhau trăm lần mà giá trị doanh nghiệp không đổi. EPS chỉ có nghĩa khi đặt cạnh giá cổ phiếu - tức là P/E."
      }
    ]
  }),
  "pb-la-gi": patch({
    "quiz": [
      {
        "question": "P/B phù hợp nhất để định giá ngành nào?",
        "options": [
          "Retail - vì hàng tồn kho luôn được ghi đúng theo giá thị trường",
          "Pharma - vì chi phí R&D đều được vốn hóa vào giá trị sổ sách",
          "Ngân hàng, bảo hiểm, BĐS - tài sản chiếm phần lớn giá trị",
          "Tech startup - vì giá trị nằm ở tài sản trí tuệ đã ghi nhận"
        ],
        "correct": 2,
        "explanation": "P/B hữu ích khi tài sản trên sổ sách phản ánh đúng giá trị thực (ngân hàng: danh mục cho vay; BĐS: tài sản đất đai). Với tech/software, book value thấp không phản ánh giá trị thương hiệu và IP."
      },
      {
        "question": "Vì sao một ngân hàng có P/B = 0.7 không tự động là một cơ hội đầu tư giá trị hấp dẫn?",
        "options": [
          "P/B dưới 1 luôn là cơ hội tốt, nên mua ngay khi thấy tỷ lệ này xuất hiện",
          "P/B dưới 1 chỉ xảy ra với ngân hàng sắp bị buộc phá sản bắt buộc",
          "Không cần phân tích thêm, P/B thấp thì cứ mua và giữ dài hạn",
          "Cần kiểm tra chất lượng tài sản - nợ xấu chưa trích lập làm sổ sách ảo"
        ],
        "correct": 3,
        "explanation": "P/B thấp có thể là \"value trap\" (bẫy giá trị) nếu giá trị sổ sách công bố không phản ánh đúng chất lượng tài sản thực - đặc biệt quan trọng với ngân hàng nơi phần lớn tài sản là các khoản cho vay có thể ẩn chứa nợ xấu chưa được trích lập đầy đủ."
      },
      {
        "question": "Vốn hóa 1.400 tỷ, vốn chủ sở hữu trên sổ sách 2.000 tỷ. P/B bằng bao nhiêu?",
        "options": [
          "0,7 lần (= 1.400 ÷ 2.000, vốn hóa chia sổ sách)",
          "1,43 lần (= 2.000 ÷ 1.400, đảo tử và mẫu số)",
          "0,6 tỷ (= 2.000 − 1.400, lấy hiệu thay vì thương)",
          "1,4 lần (= 1.400 ÷ 1.000, làm tròn sổ sách xuống)"
        ],
        "correct": 0,
        "explanation": "P/B = Vốn hóa / Giá trị sổ sách = 1.400/2.000 = 0,7. Thị trường đang trả 70 xu cho mỗi đồng tài sản ròng ghi sổ - hoặc là cơ hội, hoặc là thị trường không tin con số sổ sách đó."
      },
      {
        "question": "Vì sao P/B gần như vô dụng khi định giá một công ty phần mềm?",
        "options": [
          "Vì giá trị nằm ở thương hiệu và IP, thứ không ghi trên sổ",
          "Vì công ty phần mềm không được phép ghi nhận vốn chủ",
          "Vì giá trị sổ sách của công ty phần mềm luôn bị âm",
          "Vì phần mềm khấu hao quá nhanh nên sổ sách lạc hậu ngay"
        ],
        "correct": 0,
        "explanation": "Chi phí xây thương hiệu và phát triển sản phẩm phần lớn bị ghi thẳng vào chi phí, không nằm trên bảng cân đối. Book value vì thế bỏ sót đúng thứ tạo ra giá trị, khiến P/E hay EV/EBITDA phù hợp hơn."
      },
      {
        "question": "Mối liên hệ giữa P/B và ROE là gì?",
        "options": [
          "ROE càng cao thì thị trường càng sẵn sàng trả P/B cao hơn nữa",
          "P/B và ROE luôn biến động ngược chiều với nhau",
          "P/B nhân với ROE sẽ ra P/E của cùng doanh nghiệp",
          "Hai chỉ số này độc lập, không có liên hệ nào với nhau"
        ],
        "correct": 0,
        "explanation": "Doanh nghiệp tạo ra 20% trên mỗi đồng vốn chủ đáng giá hơn doanh nghiệp chỉ tạo ra 5% trên cùng số vốn đó. Đây là lý do ngân hàng ROE cao giao dịch trên 2x book trong khi ngân hàng ROE thấp nằm dưới 1x."
      }
    ]
  }),
  "inventory-turnover-co-ban": patch({
    "quiz": [
      {
        "question": "Days Inventory Outstanding (DIO) = 90 ngày có nghĩa là gì?",
        "options": [
          "Trung bình mất 90 ngày để bán hết lô hàng tồn kho",
          "Hàng tồn kho quay được 90 vòng trong một năm tài chính",
          "Doanh nghiệp cần 90 ngày để sản xuất xong một lô hàng",
          "Doanh nghiệp giữ đủ hàng để bán trong 90 ngày tới nữa"
        ],
        "correct": 0,
        "explanation": "DIO = 365 / Inventory Turnover. DIO cao = hàng bán chậm, vốn kẹt lâu hơn. So sánh với ngành: 90 ngày tốt với đồ nội thất, kém với thực phẩm."
      },
      {
        "question": "Vì sao Inventory Turnover đặc biệt quan trọng với ngành thời trang hơn là ngành thực phẩm đóng hộp có hạn sử dụng dài?",
        "options": [
          "Vì hàng thời trang mất giá theo mốt dù vẫn còn nguyên vẹn",
          "Vì thực phẩm đóng hộp có biên lợi nhuận cao hơn nhiều",
          "Vì ngành thời trang thường không dùng kho tự vận hành",
          "Vì hạn sử dụng dài khiến vốn kẹt trong kho lâu hơn hẳn"
        ],
        "correct": 0,
        "explanation": "Rủi ro tồn kho không chỉ đến từ hạn sử dụng vật lý mà còn từ \"hạn sử dụng kinh tế\" - với thời trang, một chiếc áo lỗi mốt có thể mất 50-70% giá trị dù vẫn còn mới nguyên."
      },
      {
        "question": "COGS trong năm là 1.800 tỷ, tồn kho bình quân 300 tỷ. Inventory Turnover và DIO bằng bao nhiêu?",
        "options": [
          "6 vòng, DIO ≈ 61 ngày (= 365 ÷ 6 vòng)",
          "6 vòng, DIO ≈ 30 ngày (= 180 ÷ 6, dùng nửa năm)",
          "0,17 vòng, DIO ≈ 2.190 ngày (đảo tử và mẫu)",
          "5 vòng, DIO ≈ 73 ngày (= 1.500 ÷ 300, sai COGS)"
        ],
        "correct": 0,
        "explanation": "Inventory Turnover = COGS / Tồn kho bình quân = 1.800/300 = 6 vòng. DIO = 365/6 ≈ 61 ngày. Mỗi lô hàng nằm trong kho khoảng hai tháng trước khi bán được."
      },
      {
        "question": "Inventory Turnover của một nhà bán lẻ giảm từ 8 vòng xuống 5 vòng trong hai năm. Lo ngại chính là gì?",
        "options": [
          "Hàng đang ứ đọng, có thể phải giảm giá mạnh để xả kho",
          "Doanh nghiệp đang thiếu hàng để đáp ứng nhu cầu",
          "Chi phí lưu kho giảm vì hàng luân chuyển chậm hơn",
          "Biên lợi nhuận gộp sẽ tự động tăng theo vòng quay"
        ],
        "correct": 0,
        "explanation": "Vòng quay chậm lại nghĩa là hàng nằm kho lâu hơn: vốn bị chôn, chi phí lưu kho tăng, và khả năng phải hạ giá để giải phóng kho cũng tăng - điều sẽ ăn thẳng vào biên lợi nhuận kỳ sau."
      },
      {
        "question": "Mô hình fast fashion của Zara ảnh hưởng thế nào tới chỉ số này?",
        "options": [
          "Vòng quay rất cao vì hàng ra vào kho trong vài tuần",
          "Vòng quay thấp vì phải giữ nhiều mẫu mã cùng lúc",
          "Chỉ số không đổi vì fast fashion chỉ rút ngắn khâu thiết kế",
          "Vòng quay cao nhưng đi kèm tỷ lệ hàng tồn lỗi mốt lớn hơn"
        ],
        "correct": 0,
        "explanation": "Rút vòng đời sản phẩm từ vài tháng xuống vài tuần đẩy Inventory Turnover lên rất cao, giảm cả vốn kẹt trong kho lẫn rủi ro lỗi mốt - lợi thế vận hành này chính là điều đối thủ khó sao chép."
      }
    ]
  }),
  "receivables-turnover": patch({
    "quiz": [
      {
        "question": "Cách nào giúp doanh nghiệp giảm DSO?",
        "options": [
          "Chiết khấu thanh toán sớm, đặt cọc, hoặc factoring",
          "Tăng giá bán để bù đắp phần vốn bị khách chiếm dụng",
          "Nới điều khoản tín dụng để khách hàng mua nhiều hơn",
          "Tăng dự trữ hàng tồn kho nhằm giao hàng nhanh hơn nữa"
        ],
        "correct": 0,
        "explanation": "Giảm DSO: (1) chiết khấu 1-2% nếu trả trong 10 ngày; (2) yêu cầu đặt cọc; (3) factoring - bán AR cho bên thứ ba để nhận tiền ngay (mất một phần). Giảm DSO cải thiện OCF trực tiếp."
      },
      {
        "question": "Một công ty có DSO tăng dần từ 45 ngày lên 90 ngày qua 3 năm, trong khi ngành vẫn giữ ổn định quanh 45-50 ngày. Đây có phải tín hiệu đáng lo?",
        "options": [
          "Đáng lo - có thể đang nới tín dụng để đẩy doanh thu",
          "Không, vì DSO tăng cho thấy doanh số đang tăng nhanh",
          "Không, chỉ cần so với chính công ty năm trước là đủ",
          "Đáng lo, nhưng chỉ khi doanh thu cùng kỳ cũng giảm theo"
        ],
        "correct": 0,
        "explanation": "So sánh xu hướng DSO của một công ty theo THỜI GIAN và với TRUNG BÌNH NGÀNH cùng lúc là cách phân tích đúng - DSO tăng lệch khỏi xu hướng ngành là tín hiệu cảnh báo sớm về chất lượng doanh thu."
      },
      {
        "question": "Doanh thu năm 3.650 tỷ, khoản phải thu bình quân 600 tỷ. DSO bằng bao nhiêu?",
        "options": [
          "60 ngày (= 600 ÷ 3.650 × 365 ngày)",
          "6 ngày (= 3.650 ÷ 600, đảo tử và mẫu số)",
          "36,5 ngày (= 3.650 ÷ 100, chia nhầm mốc)",
          "120 ngày (= 600 ÷ 1.825, dùng nửa năm doanh thu)"
        ],
        "correct": 0,
        "explanation": "DSO = Khoản phải thu / Doanh thu × 365 = 600/3.650 × 365 = 60 ngày. Trung bình có 600 tỷ tiền của công ty đang nằm ở túi khách hàng tại mọi thời điểm."
      },
      {
        "question": "Doanh thu và lợi nhuận đều tăng, nhưng dòng tiền từ hoạt động lại âm và DSO tăng vọt. Điều này gợi ý gì?",
        "options": [
          "Doanh thu đã được ghi nhận nhưng tiền chưa thực sự về",
          "Công ty đang đầu tư mạnh vào nhà xưởng và thiết bị",
          "Chi phí lãi vay đã tăng nhanh hơn lợi nhuận gộp",
          "Hàng tồn kho đang được bán ra nhanh hơn dự kiến"
        ],
        "correct": 0,
        "explanation": "Lợi nhuận ghi theo nguyên tắc dồn tích, dòng tiền thì không. Doanh thu tăng mà tiền không về, DSO phình ra - đây là dạng cảnh báo sớm kinh điển về chất lượng doanh thu, đôi khi là dấu hiệu nhồi hàng cho đại lý."
      },
      {
        "question": "Vì sao DSO 120 ngày có thể bình thường với nhà thầu xây dựng nhưng bất thường với chuỗi cà phê?",
        "options": [
          "Vì chuỗi cà phê thu tiền ngay còn B2B thanh toán theo đợt",
          "Vì nhà thầu xây dựng có biên lợi nhuận cao hơn nhiều",
          "Vì chuỗi cà phê không ghi nhận khoản phải thu nào cả",
          "Vì hợp đồng xây dựng luôn được ngân hàng bảo lãnh thanh toán"
        ],
        "correct": 0,
        "explanation": "Bán lẻ thu tiền mặt tại quầy nên DSO gần bằng 0; hợp đồng xây dựng nghiệm thu và thanh toán theo giai đoạn nên vài tháng là chuẩn ngành. Chỉ số chỉ có nghĩa khi đặt cạnh mô hình kinh doanh."
      }
    ]
  }),
  "on-tap-chi-so-tai-chinh": patch({
    "quiz": [
      {
        "question": "Điều quan trọng nhất khi dùng ratios là gì?",
        "options": [
          "So sánh cùng ngành, cùng kỳ và theo xu hướng",
          "Tính đúng công thức trước khi diễn giải kết quả",
          "Dùng càng nhiều chỉ số càng cho kết luận chắc chắn",
          "Ưu tiên số liệu kỳ gần nhất vì nó phản ánh hiện tại"
        ],
        "correct": 0,
        "explanation": "Ratios có ý nghĩa trong bối cảnh: so với ngành, so với lịch sử, so với đối thủ. Một chỉ số P/E 20x không nói lên điều gì nếu không biết ngành benchmark là bao nhiêu."
      },
      {
        "question": "Một cổ phiếu có ROE rất cao (30%) nhưng D/E cũng rất cao (4.0) và Current Ratio dưới 1. Kết luận nào là hợp lý nhất khi nhìn tổng thể 3 chỉ số này cùng lúc?",
        "options": [
          "ROE cao nhờ đòn bẩy, đi kèm thanh khoản mỏng manh",
          "Đây là cơ hội tốt vì ROE vượt xa mặt bằng chung ngành",
          "D/E và Current Ratio không liên quan tới chất lượng ROE",
          "Cần thêm dữ liệu cổ tức mới kết luận được điều gì đó"
        ],
        "correct": 0,
        "explanation": "Đây chính là bài học cốt lõi của chặng này: không một chỉ số đơn lẻ nào kể hết câu chuyện. ROE cao kết hợp với đòn bẩy cao và thanh khoản yếu là một tổ hợp cảnh báo kinh điển."
      },
      {
        "question": "Bốn nhóm chỉ số cần chạy qua trước khi kết luận về một doanh nghiệp là gì?",
        "options": [
          "Profitability, Liquidity, Leverage, Valuation",
          "Doanh thu, Chi phí, Lợi nhuận, Dòng tiền hoạt động",
          "Tăng trưởng, Thị phần, Thương hiệu, Nhân sự chủ chốt",
          "Bảng cân đối, Kết quả kinh doanh, Lưu chuyển tiền, Thuyết minh"
        ],
        "correct": 0,
        "explanation": "Bốn nhóm trả lời bốn câu hỏi khác nhau: kiếm được bao nhiêu, có trả nổi nợ ngắn hạn không, vay bao nhiêu, và đang được định giá thế nào. Bỏ qua nhóm nào cũng để lại một góc tối."
      },
      {
        "question": "Công ty A: ROE 18%, D/E 0,4. Công ty B: ROE 18%, D/E 2,5. Cùng ngành. Nhận định nào đúng?",
        "options": [
          "A tạo ra cùng mức sinh lời nhưng với rủi ro thấp hơn nhiều",
          "B hiệu quả hơn vì tận dụng được đòn bẩy tài chính tốt",
          "Hai công ty tương đương vì ROE hoàn toàn bằng nhau",
          "Không so sánh được nếu chưa biết P/E của từng công ty"
        ],
        "correct": 0,
        "explanation": "Cùng một kết quả nhưng B phải vay gấp sáu lần A để đạt được. Khi lãi suất tăng hoặc lợi nhuận hoạt động chững lại, ROE của B sẽ rơi nhanh hơn nhiều - cùng con số, không cùng chất lượng."
      },
      {
        "question": "Vì sao một chỉ số duy nhất không đủ để ra quyết định đầu tư?",
        "options": [
          "Vì mỗi chỉ số chỉ soi một mặt và đều có cách bị bóp méo",
          "Vì các chỉ số tài chính được công bố ở những thời điểm khác nhau",
          "Vì chuẩn mực kế toán thay đổi khiến chỉ số cũ không còn đúng",
          "Vì nhà đầu tư cá nhân không tiếp cận được đủ dữ liệu để tính"
        ],
        "correct": 0,
        "explanation": "P/E bị đòn bẩy làm lệch, ROE bị vay nợ thổi lên, P/B bỏ sót tài sản vô hình, Current Ratio che giấu chất lượng tồn kho. Mỗi chỉ số có một điểm mù, và chúng chỉ bịt được cho nhau khi đọc cùng lúc."
      }
    ]
  }),
  "gross-margin": patch({
    "quiz": [
      {
        "question": "Gross margin giảm từ 40% xuống 35% qua 2 năm - gợi ý điều gì?",
        "options": [
          "Thuế tăng, vì thuế được trừ ngay trong giá vốn hàng bán",
          "Doanh thu giảm, vì Gross Margin tính trên doanh thu tuyệt đối",
          "Áp lực giá bán, chi phí nguyên liệu tăng, hoặc mix sản phẩm đổi",
          "Không đáng lo, biến động 5 điểm phần trăm là bình thường mỗi năm"
        ],
        "correct": 2,
        "explanation": "Gross margin suy giảm là warning signal cần điều tra: (1) pricing power giảm; (2) input cost tăng chưa chuyển được sang giá bán; (3) sản phẩm biên cao bị thay thế bởi sản phẩm biên thấp."
      },
      {
        "question": "Một công ty bán lẻ có Gross Margin thấp hơn nhiều so với một công ty công nghệ. Điều này có nghĩa công ty bán lẻ đang kinh doanh kém hơn?",
        "options": [
          "Đúng, Gross Margin thấp hơn luôn nghĩa là kinh doanh kém hơn hẳn",
          "Công ty bán lẻ luôn nên chuyển sang mô hình công nghệ để cải thiện biên lợi nhuận",
          "Gross Margin không có ý nghĩa gì khi đánh giá ngành bán lẻ cả",
          "Không - bán lẻ theo mô hình biên thấp, vòng quay nhanh, ROE vẫn tốt"
        ],
        "correct": 3,
        "explanation": "Đây là lý do không thể so sánh Gross Margin xuyên ngành: mô hình \"biên thấp, vòng quay nhanh\" (low margin, high turnover) của bán lẻ có thể tạo ra ROE tương đương hoặc vượt ngành công nghệ."
      },
      {
        "question": "Doanh thu 2.000 tỷ, giá vốn hàng bán 1.300 tỷ. Gross Margin bằng bao nhiêu?",
        "options": [
          "35% (= (2.000 − 1.300) ÷ 2.000, lãi gộp chia doanh thu)",
          "65% (= 1.300 ÷ 2.000, lấy tỷ trọng giá vốn)",
          "700 tỷ (= 2.000 − 1.300, chưa chia doanh thu)",
          "53,8% (= 700 ÷ 1.300, chia nhầm cho giá vốn)"
        ],
        "correct": 0,
        "explanation": "Gross Margin = (Doanh thu − COGS) / Doanh thu = 700/2.000 = 35%. Mỗi 100 đồng doanh thu còn lại 35 đồng để trả chi phí bán hàng, quản lý, lãi vay và thuế."
      },
      {
        "question": "Gross Margin ổn định nhưng Operating Margin giảm dần qua ba năm. Vấn đề nằm ở đâu?",
        "options": [
          "Ở chi phí bán hàng và quản lý, không phải giá vốn",
          "Ở giá nguyên liệu đầu vào đang tăng nhanh hơn giá bán",
          "Ở chi phí lãi vay tăng do doanh nghiệp vay thêm nợ mới",
          "Ở thuế suất doanh nghiệp được điều chỉnh tăng trong kỳ"
        ],
        "correct": 0,
        "explanation": "Hai biên này chỉ khác nhau đúng ở khối chi phí vận hành. Giá vốn giữ nguyên tỷ lệ mà biên hoạt động vẫn tụt nghĩa là SG&A đang phình nhanh hơn doanh thu."
      },
      {
        "question": "Vì sao Gross Margin của một hãng phần mềm thường trên 70% còn siêu thị chỉ khoảng 20-25%?",
        "options": [
          "Vì bán thêm một bản phần mềm gần như không tốn giá vốn",
          "Vì siêu thị phải chi nhiều hơn cho quảng cáo và khuyến mãi",
          "Vì hãng phần mềm được hưởng ưu đãi thuế cao hơn siêu thị",
          "Vì siêu thị có vòng quay hàng tồn kho nhanh hơn nhiều lần"
        ],
        "correct": 0,
        "explanation": "Chi phí biên của bản sao thứ một triệu gần bằng không, trong khi siêu thị phải mua từng món hàng trước khi bán lại. Biên gộp phản ánh cấu trúc chi phí của mô hình, nên so xuyên ngành là vô nghĩa."
      }
    ]
  }),
  "operating-margin": patch({
    "quiz": [
      {
        "question": "Doanh nghiệp nào có Operating Margin cao nhất thường?",
        "options": [
          "Hàng không - vì giá vé cao và chi phí biên mỗi khách rất thấp",
          "Siêu thị - vì vòng quay hàng nhanh nên lợi nhuận tích lũy cao",
          "Xây dựng - vì hợp đồng lớn nên lợi nhuận trên mỗi dự án cao",
          "Software/SaaS - chi phí biên gần 0 khi mở rộng quy mô"
        ],
        "correct": 3,
        "explanation": "Software/SaaS có operating margin rất cao (thường 20-40%+) vì chi phí để phục vụ thêm một khách hàng gần như bằng 0. Ngược lại, ngành vận tải, bán lẻ, xây dựng có margin thấp."
      },
      {
        "question": "Vì sao khoảng cách giữa Gross Margin và Operating Margin của một công ty là một thông tin đáng giá cần theo dõi?",
        "options": [
          "Khoảng cách lớn = chi phí vận hành đang ăn nhiều lãi gộp",
          "Khoảng cách này không có ý nghĩa phân tích gì đáng chú ý",
          "Chỉ cần nhìn Operating Margin, không cần quan tâm Gross Margin",
          "Khoảng cách luôn cố định ở mọi công ty nên không cần theo dõi"
        ],
        "correct": 0,
        "explanation": "Theo dõi cả hai margin cùng lúc cho một bức tranh đầy đủ hơn: Gross Margin cho biết hiệu quả sản xuất/mua hàng, khoảng cách với Operating Margin cho biết công ty có đang kiểm soát chi phí bán hàng và quản lý hiệu quả hay không."
      },
      {
        "question": "Doanh thu 1.500 tỷ, EBIT 180 tỷ. Operating Margin bằng bao nhiêu?",
        "options": [
          "12% (= 180 ÷ 1.500, EBIT chia doanh thu)",
          "8,3 lần (= 1.500 ÷ 180, đảo tử và mẫu số)",
          "18% (= 180 ÷ 1.000, làm tròn doanh thu xuống)",
          "1.320 tỷ (= 1.500 − 180, lấy hiệu thay vì thương)"
        ],
        "correct": 0,
        "explanation": "Operating Margin = EBIT / Doanh thu = 180/1.500 = 12%. Đây là phần còn lại sau cả giá vốn lẫn chi phí vận hành, nhưng trước lãi vay và thuế - nên nó đo hiệu quả kinh doanh cốt lõi."
      },
      {
        "question": "Vì sao Operating Margin so sánh công bằng hơn Net Margin giữa hai doanh nghiệp cùng ngành?",
        "options": [
          "Vì nó chưa bị ảnh hưởng bởi cơ cấu nợ và thuế suất",
          "Vì nó đã loại trừ toàn bộ chi phí cố định của doanh nghiệp",
          "Vì nó được tính theo chuẩn mực kế toán quốc tế thống nhất",
          "Vì nó phản ánh cả phần lợi nhuận từ hoạt động tài chính"
        ],
        "correct": 0,
        "explanation": "Hai công ty vận hành y hệt nhau nhưng một bên vay nhiều sẽ có Net Margin thấp hơn hẳn. Cắt trước lãi vay và thuế giúp nhìn thẳng vào chất lượng vận hành, tách khỏi cách huy động vốn."
      },
      {
        "question": "Operating Margin âm nhưng Gross Margin vẫn dương 40%. Điều đó nghĩa là gì?",
        "options": [
          "Bán có lãi gộp nhưng chi phí vận hành nuốt hết phần đó",
          "Doanh nghiệp đang bán hàng dưới giá vốn để giành thị phần",
          "Chi phí lãi vay đã vượt quá lợi nhuận gộp trong kỳ",
          "Doanh nghiệp ghi nhận một khoản lỗ tỷ giá lớn cuối năm"
        ],
        "correct": 0,
        "explanation": "Lãi vay chưa nằm trong Operating Margin, nên thủ phạm chỉ có thể là SG&A. Đây là hình ảnh quen thuộc của startup giai đoạn đốt tiền: sản phẩm có biên tốt, nhưng bộ máy và marketing lớn hơn quy mô doanh thu hiện tại."
      }
    ]
  }),
  "net-profit-margin": patch({
    "quiz": [
      {
        "question": "Điều gì có thể làm Net Margin giảm nhưng Operating Margin không đổi?",
        "options": [
          "Lãi vay tăng hoặc thuế suất tăng - cả hai nằm dưới Operating Income",
          "COGS tăng, làm giá vốn ăn vào lợi nhuận trước khi ra Operating Income",
          "SG&A tăng, làm chi phí bán hàng và quản lý cao hơn trong kỳ",
          "Doanh thu giảm, làm cả hai biên lợi nhuận giảm cùng một nhịp"
        ],
        "correct": 0,
        "explanation": "Net Margin = Operating Margin − Interest/Revenue − Tax/Revenue. Nếu Operating Margin không đổi nhưng Net Margin giảm, nguyên nhân là lãi vay tăng hoặc thuế tăng."
      },
      {
        "question": "Một công ty có Net Margin chỉ 3% nhưng vòng quay tài sản (Asset Turnover) rất nhanh vẫn có thể có ROE hấp dẫn. Điều này minh họa nguyên tắc gì trong phân tích tài chính?",
        "options": [
          "Công ty này chắc chắn đang gặp vấn đề nghiêm trọng về lợi nhuận",
          "ROE là kết quả tổng hợp của margin, vòng quay và đòn bẩy",
          "Vòng quay tài sản không liên quan gì tới ROE của doanh nghiệp",
          "Net Margin luôn là chỉ số quan trọng nhất, không cần xem thêm"
        ],
        "correct": 1,
        "explanation": "Đây chính là insight của DuPont Analysis: ROE = Net Margin × Asset Turnover × Financial Leverage. Một công ty bán lẻ margin thấp nhưng bán hàng rất nhanh vẫn có ROE tốt."
      },
      {
        "question": "Lợi nhuận ròng 90 tỷ, doanh thu 1.800 tỷ. Net Margin bằng bao nhiêu?",
        "options": [
          "5% (= 90 ÷ 1.800, lãi ròng chia doanh thu)",
          "20 lần (= 1.800 ÷ 90, đảo tử và mẫu số)",
          "9% (= 90 ÷ 1.000, làm tròn doanh thu xuống)",
          "4,7% (= 90 ÷ 1.890, cộng nhầm lãi vào doanh thu)"
        ],
        "correct": 0,
        "explanation": "Net Margin = Lợi nhuận ròng / Doanh thu = 90/1.800 = 5%. Sau tất cả chi phí, thuế và lãi vay, mỗi 100 đồng doanh thu giữ lại được 5 đồng cho cổ đông."
      },
      {
        "question": "Net Margin của một doanh nghiệp tăng mạnh trong khi Operating Margin đứng yên. Nguyên nhân khả dĩ nhất?",
        "options": [
          "Chi phí lãi vay hoặc thuế suất đã giảm trong kỳ vừa rồi",
          "Doanh nghiệp đã cắt giảm mạnh chi phí bán hàng",
          "Giá vốn hàng bán giảm nhờ nguyên liệu rẻ hơn",
          "Doanh thu tăng nhanh hơn toàn bộ chi phí vận hành"
        ],
        "correct": 0,
        "explanation": "Khoảng cách giữa hai biên này đúng bằng lãi vay và thuế. Vận hành không đổi mà kết quả cuối tốt lên thì phần cải thiện đến từ dưới dòng EBIT - và đó thường là cải thiện một lần, không lặp lại."
      },
      {
        "question": "Vì sao Net Margin 3% của một chuỗi siêu thị không đáng lo bằng Net Margin 3% của một hãng phần mềm?",
        "options": [
          "Vì bán lẻ bù bằng vòng quay tài sản rất nhanh",
          "Vì siêu thị được hưởng thuế suất ưu đãi hơn phần mềm",
          "Vì hãng phần mềm có chi phí lãi vay cao hơn nhiều",
          "Vì bán lẻ ghi nhận doanh thu theo phương pháp khác hẳn"
        ],
        "correct": 0,
        "explanation": "DuPont nhân biên với vòng quay: siêu thị quay tài sản 2,5 lần/năm nên biên 3% vẫn ra ROE tốt. Phần mềm quay chậm và lẽ ra phải có biên rất cao - 3% ở đó nghĩa là có gì đó hỏng."
      }
    ]
  }),
  "current-ratio": patch({
    "quiz": [
      {
        "question": "Current Ratio = 3.0 - dấu hiệu tốt hay xấu?",
        "options": [
          "Luôn tốt - càng cao thì khả năng trả nợ ngắn hạn càng vững chắc",
          "Xấu - tỷ lệ trên 2 nghĩa là công ty đang thiếu nợ để tận dụng đòn bẩy",
          "Có thể tốt hoặc xấu - quá cao có thể là tiền nhàn rỗi hoặc tồn kho ứ",
          "Không có ý nghĩa vì Current Ratio không tính chất lượng tài sản"
        ],
        "correct": 2,
        "explanation": "Current Ratio quá cao (>3) có thể là dấu hiệu: inventory tích lũy (chưa bán được), quản lý vốn kém (giữ tiền mặt không hiệu quả), hoặc thiếu cơ hội đầu tư."
      },
      {
        "question": "Vì sao Current Ratio dưới 1.0 KHÔNG phải lúc nào cũng là dấu hiệu nguy hiểm, đặc biệt với ngành bán lẻ tiêu dùng nhanh?",
        "options": [
          "Vì bán lẻ được phép loại hàng tồn kho ra khỏi công thức tính",
          "Bán lẻ thu tiền ngay nên vẫn đủ tiền trả nợ dù tỷ lệ thấp",
          "Current Ratio dưới 1,0 luôn nguy hiểm, không có ngoại lệ nào cả",
          "Chỉ ngân hàng mới được phép có Current Ratio dưới 1,0 theo quy định"
        ],
        "correct": 1,
        "explanation": "Cần xem Current Ratio trong bối cảnh chu kỳ tiền mặt của từng ngành: doanh nghiệp bán lẻ/siêu thị có Cash Conversion Cycle rất ngắn (thậm chí âm) nên có thể vận hành an toàn với Current Ratio thấp hơn nhiều so với ngưỡng \"an toàn\" thông thường 1.5-2.0 áp dụng cho ngành sản xuất."
      },
      {
        "question": "Tài sản ngắn hạn 900 tỷ, nợ ngắn hạn 500 tỷ. Current Ratio bằng bao nhiêu?",
        "options": [
          "1,8 (= 900 ÷ 500, tài sản chia nợ ngắn hạn)",
          "0,56 (= 500 ÷ 900, đảo ngược tử và mẫu số)",
          "400 tỷ (= 900 − 500, lấy hiệu thay vì thương)",
          "1,5 (= 900 ÷ 600, dùng nhầm số nợ ngắn hạn)"
        ],
        "correct": 0,
        "explanation": "Current Ratio = Tài sản ngắn hạn / Nợ ngắn hạn = 900/500 = 1,8. Mỗi đồng nợ đến hạn trong năm được phủ bởi 1,8 đồng tài sản có thể chuyển thành tiền trong cùng kỳ."
      },
      {
        "question": "Current Ratio bằng 5,0 có phải luôn là tin tốt?",
        "options": [
          "Không - có thể là tiền hoặc tồn kho đang bị ứ đọng",
          "Có - tỷ lệ càng cao thì khả năng trả nợ càng chắc chắn",
          "Không - vì tỷ lệ trên 3,0 vi phạm chuẩn mực kế toán",
          "Có - nhưng chỉ với doanh nghiệp trong ngành sản xuất"
        ],
        "correct": 0,
        "explanation": "Thanh khoản quá dư cũng là vốn không sinh lời: tiền nằm im, hàng nằm kho, khách nợ lâu. Chỉ số này có vùng hợp lý theo ngành chứ không phải càng cao càng tốt."
      },
      {
        "question": "Vì sao Current Ratio dưới 1 không tự động nghĩa là doanh nghiệp sắp mất khả năng thanh toán?",
        "options": [
          "Vì có mô hình thu tiền trước và trả nhà cung cấp sau",
          "Vì nợ ngắn hạn luôn được ngân hàng tự động gia hạn thêm",
          "Vì tài sản dài hạn có thể bán nhanh để bù phần thiếu hụt",
          "Vì chuẩn mực kế toán cho phép hoãn ghi nhận nợ đến hạn"
        ],
        "correct": 0,
        "explanation": "Siêu thị và chuỗi đăng ký thu tiền ngay nhưng trả nhà cung cấp sau 30-60 ngày, nên vốn lưu động âm là dấu hiệu quyền lực với nhà cung cấp chứ không phải nguy hiểm - miễn là doanh thu còn chảy đều."
      }
    ]
  }),
  "debt-to-equity": patch({
    "quiz": [
      {
        "question": "Ngành nào thường chấp nhận D/E cao nhất?",
        "options": [
          "Tech startup - vì tăng trưởng nhanh nên trả nợ được dễ dàng",
          "Retail - vì hàng tồn kho luôn dùng làm tài sản đảm bảo được",
          "Utility (điện, nước, gas) - dòng tiền ổn định, tài sản lớn",
          "Tư vấn - vì chi phí thấp nên lợi nhuận dư trả lãi vay dễ dàng"
        ],
        "correct": 2,
        "explanation": "Utility có dòng tiền rất ổn định và dự báo được, tài sản lớn làm tài sản đảm bảo → chấp nhận D/E cao. Tech startup không có tài sản đảm bảo và dòng tiền không ổn định → D/E thấp."
      },
      {
        "question": "Vì sao một mức D/E được xem là \"an toàn\" với ngành điện lực có thể bị xem là \"cực kỳ rủi ro\" với một startup công nghệ?",
        "options": [
          "Vì công thức tính D/E của hai ngành khác nhau về cách gộp nợ",
          "Mọi ngành nên có D/E giống nhau để nhà đầu tư dễ so sánh với nhau",
          "Vì startup công nghệ không được phép vay nợ theo quy định hiện hành",
          "Vì độ ổn định dòng tiền khác nhau - điện luôn có tiền trả lãi đều"
        ],
        "correct": 3,
        "explanation": "Mức D/E \"an toàn\" luôn phải đánh giá trong bối cảnh ngành: khả năng chịu đựng nợ phụ thuộc vào tính ổn định và dự báo được của dòng tiền tạo ra, không phải một con số tuyệt đối áp dụng chung cho mọi doanh nghiệp."
      },
      {
        "question": "Nợ vay 1.200 tỷ, vốn chủ sở hữu 800 tỷ. D/E bằng bao nhiêu?",
        "options": [
          "1,5 (= 1.200 ÷ 800, nợ chia vốn chủ)",
          "0,67 (= 800 ÷ 1.200, đảo tử và mẫu số)",
          "0,6 (= 1.200 ÷ 2.000, chia cho tổng nguồn vốn)",
          "400 tỷ (= 1.200 − 800, lấy hiệu thay vì thương)"
        ],
        "correct": 0,
        "explanation": "D/E = Nợ vay / Vốn chủ sở hữu = 1.200/800 = 1,5. Cứ mỗi đồng vốn cổ đông bỏ vào thì có 1,5 đồng đi vay - phương án C nhầm sang tỷ lệ nợ trên tổng nguồn vốn, một chỉ số khác."
      },
      {
        "question": "Vì sao D/E 2,0 có thể chấp nhận được với một công ty điện nước nhưng đáng lo với một công ty phần mềm?",
        "options": [
          "Vì dòng tiền điện nước ổn định và dễ dự báo hơn nhiều",
          "Vì công ty điện nước được nhà nước bảo lãnh khoản vay",
          "Vì công ty phần mềm không có tài sản để thế chấp vay",
          "Vì lãi suất cho vay ngành tiện ích thường thấp hơn hẳn"
        ],
        "correct": 0,
        "explanation": "Khả năng gánh nợ phụ thuộc vào độ chắc chắn của dòng tiền trả nợ. Hóa đơn điện đến đều mỗi tháng bất kể chu kỳ; doanh thu phần mềm có thể mất một hợp đồng lớn và rơi 30% trong một quý."
      },
      {
        "question": "D/E tăng từ 0,8 lên 2,2 trong hai năm mà tổng nợ gần như không đổi. Điều gì đã xảy ra?",
        "options": [
          "Vốn chủ sở hữu đã co lại vì lỗ lũy kế hoặc mua cổ phiếu quỹ",
          "Doanh nghiệp đã vay thêm một khoản nợ dài hạn lớn",
          "Tổng tài sản tăng nhanh nhờ đánh giá lại bất động sản",
          "Doanh thu giảm khiến tỷ lệ nợ trên doanh thu tăng lên"
        ],
        "correct": 0,
        "explanation": "Tử số đứng yên thì mẫu số phải co. Lỗ lũy kế ăn vào vốn chủ hoặc mua lại cổ phiếu quỹ đều làm D/E xấu đi mà doanh nghiệp không hề vay thêm đồng nào - rủi ro tăng thật, chỉ là không đến từ hướng ta hay nhìn."
      }
    ]
  }),
  "cash-conversion-cycle": patch({
    "quiz": [
      {
        "question": "Công ty sản xuất theo đơn hàng (make-to-order) thường có DIO thế nào?",
        "options": [
          "Thấp hơn make-to-stock vì chỉ sản xuất khi đã có đơn hàng",
          "Rất cao, vì phải giữ nguyên liệu sẵn để làm hàng theo đơn",
          "Bằng nhau, vì DIO không phụ thuộc mô hình sản xuất nào",
          "Không có DIO, vì hàng được giao ngay khi sản xuất xong"
        ],
        "correct": 0,
        "explanation": "Make-to-order: sản xuất khi có đơn → ít hàng tồn kho → DIO thấp → CCC ngắn hơn. Make-to-stock: sản xuất trước → DIO cao. Lựa chọn mô hình ảnh hưởng trực tiếp đến CCC."
      },
      {
        "question": "Vì sao một công ty có Cash Conversion Cycle âm được xem là có lợi thế cạnh tranh tài chính đáng kể?",
        "options": [
          "Vì nhà cung cấp thực chất đang tài trợ vốn lưu động miễn phí",
          "CCC âm là lỗi tính toán, không thể xảy ra trong thực tế",
          "CCC âm chỉ có ý nghĩa với các công ty công nghệ nền tảng",
          "Vì CCC âm nghĩa là công ty đang lỗ nên không cần vốn lưu động"
        ],
        "correct": 0,
        "explanation": "CCC âm là một trong những lợi thế cạnh tranh tài chính mạnh nhất một doanh nghiệp có thể có: nó cho phép mở rộng quy mô kinh doanh mà không cần huy động thêm nhiều vốn lưu động."
      },
      {
        "question": "DIO 60 ngày, DSO 45 ngày, DPO 30 ngày. Cash Conversion Cycle bằng bao nhiêu?",
        "options": [
          "75 ngày (= DIO 60 + DSO 45 − DPO 30 ngày)",
          "135 ngày (= 60 + 45 + 30, cộng nhầm cả ba)",
          "45 ngày (= 60 − 45 + 30, sai dấu hai vế)",
          "15 ngày (= 60 − 45, bỏ quên khoản phải trả)"
        ],
        "correct": 0,
        "explanation": "CCC = DIO + DSO − DPO = 60 + 45 − 30 = 75 ngày. Tiền của doanh nghiệp bị kẹt 75 ngày giữa lúc trả nhà cung cấp và lúc thu được tiền từ khách."
      },
      {
        "question": "Vì sao Cash Conversion Cycle âm lại là một lợi thế lớn?",
        "options": [
          "Vì doanh nghiệp dùng tiền nhà cung cấp để tài trợ vốn",
          "Vì doanh nghiệp không cần vay ngân hàng cho tài sản cố định",
          "Vì chỉ số âm cho thấy hàng tồn kho đã được bán hết sạch",
          "Vì nó nghĩa là doanh nghiệp đang có lợi nhuận rất cao"
        ],
        "correct": 0,
        "explanation": "Thu tiền khách trước khi phải trả nhà cung cấp nghĩa là càng bán nhiều, càng có thêm tiền mặt để dùng miễn phí. Đây là cách bán lẻ và mô hình thuê bao tự tài trợ tăng trưởng mà không cần vay."
      },
      {
        "question": "Cách nào rút ngắn CCC mà không làm hỏng quan hệ với khách hàng?",
        "options": [
          "Tăng vòng quay hàng tồn kho để giảm DIO xuống",
          "Kéo dài thời hạn trả nhà cung cấp càng lâu càng tốt",
          "Siết chặt điều khoản tín dụng với toàn bộ khách hàng",
          "Giảm giá bán để khách thanh toán ngay bằng tiền mặt"
        ],
        "correct": 0,
        "explanation": "Ba đòn bẩy của CCC không ngang nhau về cái giá phải trả: siết khách hàng làm mất đơn, ép nhà cung cấp làm hỏng quan hệ, còn bán hàng nhanh hơn thì cải thiện cả ba con số cùng lúc."
      }
    ]
  }),
  "present-value": patch({
    "quiz": [
      {
        "question": "Tại sao tỷ lệ chiết khấu cao hơn làm giảm Present Value?",
        "options": [
          "Vì rủi ro giảm nên dòng tiền tương lai trở nên đáng tin hơn hiện tại",
          "Vì chi phí cơ hội cao hơn - tiền hôm nay sinh lời được nhiều hơn",
          "Vì lạm phát tăng làm giá trị danh nghĩa của dòng tiền giảm đi",
          "Vì công thức quy định vậy, không có lý do kinh tế nào đằng sau"
        ],
        "correct": 1,
        "explanation": "Discount rate cao = chi phí cơ hội cao = tiền tương lai ít giá trị hơn so với hiện tại. Khi lãi suất tăng, PV của mọi dòng tiền tương lai giảm → giá cổ phiếu và trái phiếu giảm."
      },
      {
        "question": "Nếu discount rate giảm từ 10% xuống 5%, Present Value của một khoản tiền nhận trong tương lai sẽ thay đổi thế nào?",
        "options": [
          "Giảm xuống, vì lãi suất giảm thì tiền tương lai sinh lời ít hơn",
          "Không thay đổi vì FV và số năm đều không đổi",
          "Tăng lên - r nhỏ hơn thì mẫu số nhỏ hơn nên PV lớn hơn",
          "Chỉ thay đổi nếu số năm chiết khấu cũng thay đổi theo"
        ],
        "correct": 2,
        "explanation": "PV = FV / (1+r)^n - r càng nhỏ, mẫu số càng nhỏ, PV càng lớn. Đây chính là lý do khi lãi suất thị trường giảm, giá trị định giá của cổ phiếu và trái phiếu tăng."
      },
      {
        "question": "Nhận 1.000.000đ sau 5 năm, discount rate 10%. PV bằng bao nhiêu?",
        "options": [
          "≈ 620.900đ (= 1tr ÷ 1,1 mũ 5, tức chia cho 1,61)",
          "≈ 500.000đ (= 1tr ÷ 2, chia đôi cho 5 năm)",
          "≈ 909.100đ (= 1tr ÷ 1,1, chỉ chiết khấu 1 năm)",
          "≈ 1.610.500đ (= 1tr × 1,61, nhân thay vì chia)"
        ],
        "correct": 0,
        "explanation": "PV = FV / (1+r)^n = 1.000.000 / 1,61051 ≈ 620.900đ. Phương án D chính là Future Value - nhân lên là đi tới tương lai, chia xuống mới là kéo về hiện tại."
      },
      {
        "question": "Hai dòng tiền 1 tỷ, một nhận sau 3 năm, một sau 10 năm, cùng discount rate. So sánh PV?",
        "options": [
          "Dòng 3 năm có PV cao hơn vì bị chiết khấu ít lần hơn",
          "Hai dòng có PV bằng nhau vì số tiền danh nghĩa như nhau",
          "Dòng 10 năm cao hơn vì có thêm thời gian sinh lãi kép",
          "Không so được nếu chưa biết dòng tiền có tăng trưởng không"
        ],
        "correct": 0,
        "explanation": "Mẫu số (1+r)^n phình theo cấp số nhân khi n tăng. Đây là lý do trong mô hình DCF, dòng tiền của những năm cuối đóng góp ít hơn hẳn dù con số danh nghĩa có thể lớn hơn."
      },
      {
        "question": "Vì sao PV là nền tảng của mọi mô hình định giá?",
        "options": [
          "Vì nó quy mọi dòng tiền khác thời điểm về cùng một mốc",
          "Vì nó loại bỏ được ảnh hưởng của lạm phát khỏi dòng tiền",
          "Vì nó cho biết doanh nghiệp có đủ tiền mặt trả nợ hay không",
          "Vì nó là chỉ số duy nhất không phụ thuộc vào giả định nào"
        ],
        "correct": 0,
        "explanation": "Không thể cộng 100 triệu của năm nay với 100 triệu của năm thứ bảy - chúng là hai đơn vị khác nhau. Chiết khấu là phép quy đổi giúp cộng chúng lại, và mọi mô hình DCF chỉ là chuỗi phép quy đổi đó lặp lại."
      }
    ]
  }),
  "perpetuity": patch({
    "quiz": [
      {
        "question": "Growing perpetuity (perpetuity tăng trưởng đều) có công thức PV là gì?",
        "options": [
          "C × (r − g), tức nhân thay vì chia cho phần chênh lệch",
          "C / r, tức công thức perpetuity không tăng trưởng",
          "C × r, lấy dòng tiền nhân với chi phí vốn yêu cầu",
          "C / (r − g), với g là tốc độ tăng trưởng vĩnh viễn"
        ],
        "correct": 3,
        "explanation": "PV = C / (r − g). Dùng trong Gordon Growth Model để tính Terminal Value của DCF. Nhạy cảm với g: nếu g gần r, PV tăng vô hạn - đây là 'garbage in' phổ biến trong DCF."
      },
      {
        "question": "Vì sao một dòng tiền kéo dài VÔ HẠN (perpetuity) lại có giá trị hiện tại HỮU HẠN, thay vì tiến tới vô cực?",
        "options": [
          "Vì dòng tiền càng xa càng bị chiết khấu mạnh, tổng vẫn hội tụ",
          "Vì trên thực tế không ai sống đủ lâu để nhận hết dòng tiền vô hạn",
          "Vì công thức tính sai nhưng vẫn được chấp nhận trong thực tế",
          "Perpetuity thực ra không có giá trị hiện tại xác định nào cả"
        ],
        "correct": 0,
        "explanation": "Đây là một kết quả toán học đẹp: dù cộng vô hạn số hạng, nếu mỗi số hạng nhỏ dần theo cấp số nhân (do chiết khấu), tổng vẫn hội tụ về một giá trị hữu hạn = C/r."
      },
      {
        "question": "Cổ tức cố định 10 triệu đồng/năm mãi mãi, discount rate 8%. PV bằng bao nhiêu?",
        "options": [
          "125 triệu (= 10 ÷ 0,08, dòng tiền chia cho lãi suất)",
          "80 triệu (= 10 × 8, nhân thay vì chia cho r)",
          "12,5 triệu (= 10 ÷ 0,8, sai một chữ số thập phân)",
          "Vô hạn, vì dòng tiền kéo dài mãi mãi không kết thúc"
        ],
        "correct": 0,
        "explanation": "PV = C / r = 10/0,08 = 125 triệu. Dòng tiền vô hạn vẫn cho giá trị hữu hạn vì mỗi năm càng xa lại bị chia cho một mẫu số lớn hơn, và tổng của chuỗi đó hội tụ."
      },
      {
        "question": "Gordon Growth: C = 100 tỷ, r = 10%, g = 4%. Terminal Value bằng bao nhiêu?",
        "options": [
          "1.667 tỷ (= 100 ÷ (0,10 − 0,04), chia cho r trừ g)",
          "1.000 tỷ (= 100 ÷ 0,10, bỏ quên tốc độ g)",
          "2.500 tỷ (= 100 ÷ 0,04, chia nhầm cho g)",
          "714 tỷ (= 100 ÷ (0,10 + 0,04), cộng thay vì trừ)"
        ],
        "correct": 0,
        "explanation": "PV = C / (r − g) = 100/0,06 ≈ 1.667 tỷ. Mẫu số chỉ 6% nên nó rất nhạy: đổi g từ 4% lên 5% đẩy kết quả lên 2.000 tỷ, tức tăng 20% chỉ vì một giả định."
      },
      {
        "question": "Vì sao giả định g trong Gordon Growth phải nhỏ hơn tốc độ tăng trưởng dài hạn của nền kinh tế?",
        "options": [
          "Vì nếu không, doanh nghiệp sẽ lớn hơn cả nền kinh tế",
          "Vì công thức sẽ cho kết quả âm khi g vượt quá 5% mỗi năm",
          "Vì chuẩn mực định giá giới hạn g ở mức lạm phát mục tiêu",
          "Vì dòng tiền thực tế không bao giờ tăng quá nhanh được"
        ],
        "correct": 0,
        "explanation": "g áp dụng cho vô hạn năm. Một doanh nghiệp tăng 8% mãi mãi trong nền kinh tế tăng 3% sẽ dần chiếm toàn bộ nền kinh tế đó - điều bất khả. Đây là lý do g thường bị chặn quanh mức tăng trưởng GDP dài hạn."
      }
    ]
  }),
  "npv-co-ban": patch({
    "quiz": [
      {
        "question": "Điều gì làm NPV nhạy cảm nhất?",
        "options": [
          "Discount rate và dự báo dòng tiền - sai nhỏ cho kết quả rất khác",
          "Số năm dự án, vì dự án càng dài thì NPV càng lớn theo tỷ lệ thuận",
          "Chi phí đầu tư ban đầu, vì đó là con số duy nhất chắc chắn",
          "Thuế suất, vì thuế quyết định phần lớn dòng tiền sau cùng"
        ],
        "correct": 0,
        "explanation": "NPV nhạy cảm với: (1) discount rate - tăng 2% có thể đổi NPV từ dương sang âm; (2) dự báo FCF - optimistic bias phổ biến trong corporate finance. Sensitivity analysis bắt buộc."
      },
      {
        "question": "Một dự án có NPV = 0 chính xác (không dương không âm). Điều này có nghĩa gì về mặt kinh tế?",
        "options": [
          "NPV = 0 nghĩa là dự án sẽ lỗ đúng bằng vốn đầu tư ban đầu",
          "Dự án sinh lời đúng bằng chi phí vốn - hòa vốn về kinh tế",
          "Dự án hoàn toàn không đáng thực hiện vì không tạo lợi nhuận",
          "NPV = 0 không thể xảy ra trong thực tế vì luôn có sai số"
        ],
        "correct": 1,
        "explanation": "NPV = 0 là điểm cân bằng: dự án sinh lời chính xác bằng với những gì nhà đầu tư có thể kiếm được từ một khoản đầu tư khác cùng mức rủi ro - không tệ, nhưng cũng không có lý do đặc biệt để ưu tiên dự án này."
      },
      {
        "question": "Đầu tư 500 tỷ, PV của toàn bộ dòng tiền tương lai là 560 tỷ. NPV bằng bao nhiêu và nên làm gì?",
        "options": [
          "+60 tỷ, nên làm vì dự án tạo ra thêm giá trị thật",
          "+1,12 lần, nên làm vì tỷ lệ này lớn hơn 1",
          "−60 tỷ, không nên làm vì chi phí vượt lợi ích",
          "+560 tỷ, nên làm vì toàn bộ dòng tiền đều dương"
        ],
        "correct": 0,
        "explanation": "NPV = 560 − 500 = +60 tỷ. Con số này đọc thẳng được: dự án làm tăng giá trị doanh nghiệp thêm 60 tỷ tính theo tiền hôm nay, sau khi đã trả đủ chi phí vốn."
      },
      {
        "question": "Vì sao tăng discount rate lại làm NPV giảm?",
        "options": [
          "Vì mọi dòng tiền tương lai bị chiết khấu mạnh hơn",
          "Vì chi phí đầu tư ban đầu bị nhân lên theo lãi suất",
          "Vì dòng tiền của những năm đầu bị loại khỏi phép tính",
          "Vì thuế phải nộp tăng lên khi chi phí vốn tăng theo"
        ],
        "correct": 0,
        "explanation": "Vốn đầu tư ban đầu đã ở thời điểm 0 nên không bị chiết khấu; chỉ phần dòng tiền tương lai co lại. Đây là lý do một dự án biên có thể chuyển từ đáng làm sang không đáng làm chỉ vì lãi suất tăng 2%."
      },
      {
        "question": "Hai dự án cùng NPV +100 tỷ, nhưng dự án A cần vốn 200 tỷ còn B cần 2.000 tỷ. Chọn thế nào?",
        "options": [
          "A, vì tạo ra cùng mức giá trị trên nền vốn nhỏ hơn mười lần",
          "B, vì quy mô lớn hơn nên tác động cũng lớn hơn",
          "Bằng nhau, vì tiêu chí NPV cho kết quả giống hệt nhau",
          "Không quyết được nếu chưa biết thời gian hoàn vốn"
        ],
        "correct": 0,
        "explanation": "NPV không nói gì về hiệu suất trên mỗi đồng vốn. Khi vốn có hạn - và nó luôn có hạn - phải xét thêm chỉ số sinh lời (NPV/vốn đầu tư) để xếp hạng, nếu không sẽ dồn hết vốn vào một dự án cồng kềnh."
      }
    ]
  }),
  "npv-vs-payback": patch({
    "quiz": [
      {
        "question": "Khi nào Payback Period có giá trị thực tế?",
        "options": [
          "Với dự án dài hạn, vì Payback đo được cả giá trị tạo ra sau khi hoàn vốn",
          "Luôn dùng thay cho NPV vì Payback đơn giản và trực quan hơn",
          "Không bao giờ - Payback không có giá trị thực tế nào cả",
          "Khi cần đánh giá rủi ro thanh khoản - tiền phải về trước khi cạn"
        ],
        "correct": 3,
        "explanation": "Payback hữu ích để đánh giá: (1) rủi ro thanh khoản - công ty cần tiền về sớm; (2) độ chắc chắn - dự án nhanh ít bất định hơn. Nhưng không nên dùng thay thế NPV để ra quyết định đầu tư."
      },
      {
        "question": "Nếu một công ty CHỈ dùng Payback Period để quyết định đầu tư, loại dự án nào có nguy cơ bị bỏ lỡ nhiều nhất?",
        "options": [
          "Các dự án ngắn hạn có lợi nhuận ổn định và hoàn vốn nhanh",
          "Chỉ các dự án rủi ro cao mới bị ảnh hưởng bởi tiêu chí này",
          "Dự án dài hạn giá trị lớn nhưng lâu sinh lời: R&D, hạ tầng",
          "Không có loại dự án nào bị bỏ lỡ vì Payback đã đủ toàn diện"
        ],
        "correct": 2,
        "explanation": "Đây là lý do các công ty chỉ dùng Payback Period thường bỏ lỡ các khoản đầu tư chiến lược dài hạn (R&D đột phá, xây dựng thương hiệu, hạ tầng công nghệ) - những dự án này thường có Payback Period dài nhưng NPV thực sự rất lớn."
      },
      {
        "question": "Vì sao Payback Period bỏ sót giá trị của một dự án dài hạn?",
        "options": [
          "Vì nó dừng đếm ngay khi vốn vừa được thu hồi đủ",
          "Vì nó chiết khấu dòng tiền quá mạnh ở các năm cuối",
          "Vì nó chỉ tính dòng tiền của ba năm đầu tiên dự án",
          "Vì nó cộng cả chi phí khấu hao vào dòng tiền hằng năm"
        ],
        "correct": 0,
        "explanation": "Mọi đồng tiền phát sinh sau điểm hoàn vốn đều không được đếm. Một nhà máy hoàn vốn năm thứ 5 rồi sinh lãi thêm 15 năm trông y hệt một nhà máy hoàn vốn năm thứ 5 rồi ngừng hoạt động."
      },
      {
        "question": "Doanh nghiệp nào có lý do chính đáng để coi trọng Payback Period?",
        "options": [
          "Doanh nghiệp thiếu tiền mặt, cần vốn quay vòng thật nhanh",
          "Doanh nghiệp có chi phí vốn thấp và dòng tiền dồi dào",
          "Doanh nghiệp đầu tư hạ tầng với vòng đời trên 20 năm",
          "Doanh nghiệp niêm yết cần tối đa hóa giá trị cổ đông"
        ],
        "correct": 0,
        "explanation": "Payback đo rủi ro thanh khoản chứ không đo giá trị. Với doanh nghiệp mà cạn tiền là chết, biết bao lâu tiền quay về đôi khi cấp bách hơn biết dự án tạo ra bao nhiêu giá trị."
      },
      {
        "question": "Chỉ dùng Payback để chọn dự án thì doanh nghiệp có xu hướng gì?",
        "options": [
          "Bỏ lỡ các dự án dài hạn tạo giá trị lớn hơn nhiều",
          "Chọn quá nhiều dự án rủi ro cao với vòng đời rất dài",
          "Đánh giá quá cao các dự án cần vốn đầu tư ban đầu lớn",
          "Ưu tiên dự án có dòng tiền tăng dần về những năm cuối"
        ],
        "correct": 0,
        "explanation": "Tiêu chí này thiên vị dự án ngắn, hoàn vốn nhanh. Áp dụng lâu dài, doanh nghiệp dần chỉ còn các khoản đầu tư nhỏ và an toàn, trong khi đối thủ dùng NPV chấp nhận những dự án chậm mà lớn."
      }
    ]
  }),
  "cost-of-capital": patch({
    "quiz": [
      {
        "question": "Nguồn vốn nào thường rẻ hơn về chi phí sau thuế?",
        "options": [
          "Debt - lãi vay được khấu trừ thuế nên chi phí thực thấp hơn",
          "Equity, vì cổ đông không đòi hỏi khoản chi trả cố định nào",
          "Bằng nhau, vì thị trường luôn định giá lại cho cân bằng rủi ro",
          "Phụ thuộc ngành, không có nguyên tắc chung nào áp dụng được"
        ],
        "correct": 0,
        "explanation": "Cost of Debt = Lãi suất × (1 − Tax Rate). Tax shield từ lãi vay làm debt rẻ hơn equity về mặt chi phí vốn sau thuế."
      },
      {
        "question": "Một công ty dùng lợi nhuận giữ lại (retained earnings, không phải tiền vay hay phát hành cổ phiếu mới) để tài trợ một dự án mới. Chi phí vốn của khoản tiền này có bằng 0 không?",
        "options": [
          "Chi phí vốn chỉ áp dụng cho tiền vay, không áp dụng cho vốn nội bộ",
          "Không - tiền đó thuộc cổ đông, chi phí cơ hội là cost of equity",
          "Đúng, lợi nhuận giữ lại là tiền miễn phí nên chi phí vốn bằng 0",
          "Lợi nhuận giữ lại luôn có chi phí vốn cao hơn vay ngân hàng"
        ],
        "correct": 1,
        "explanation": "Đây là một nhầm lẫn phổ biến: dù không phải trả lãi trực tiếp, lợi nhuận giữ lại vẫn có chi phí cơ hội - số tiền đó thuộc về cổ đông và có thể được chia làm cổ tức để họ tự đầu tư."
      },
      {
        "question": "Vì sao chi phí nợ sau thuế thấp hơn chi phí vốn chủ?",
        "options": [
          "Vì lãi vay được trừ thuế còn cổ tức thì không",
          "Vì ngân hàng luôn cho vay với lãi suất ưu đãi hơn",
          "Vì cổ đông không đòi hỏi mức sinh lời cụ thể nào cả",
          "Vì nợ vay luôn có tài sản bảo đảm nên rủi ro thấp hơn"
        ],
        "correct": 0,
        "explanation": "Hai lý do chồng lên nhau: chủ nợ được trả trước nên đòi hỏi ít hơn, và lãi vay còn được khấu trừ thuế. Nhưng nợ rẻ không có nghĩa là vay càng nhiều càng tốt - rủi ro phá sản tăng sẽ đẩy cả hai chi phí lên."
      },
      {
        "question": "Lãi vay 10%, thuế suất doanh nghiệp 20%. Chi phí nợ sau thuế bằng bao nhiêu?",
        "options": [
          "8% (= 10% × (1 − 20%), nhờ có lá chắn thuế)",
          "12% (= 10% × (1 + 20%), cộng thuế vào)",
          "2% (= 10% × 20%, chỉ lấy phần thuế)",
          "10% (thuế không ảnh hưởng tới chi phí nợ)"
        ],
        "correct": 0,
        "explanation": "Kd sau thuế = Kd × (1 − T) = 10% × 0,8 = 8%. Mỗi đồng lãi trả đi làm giảm thu nhập chịu thuế, nên nhà nước gánh hộ 20% chi phí đó - đây gọi là lá chắn thuế."
      },
      {
        "question": "Vì sao lợi nhuận giữ lại không phải nguồn vốn miễn phí?",
        "options": [
          "Vì cổ đông đáng lẽ nhận được số tiền đó để tự đầu tư",
          "Vì doanh nghiệp phải nộp thuế thêm khi giữ lại lợi nhuận",
          "Vì lợi nhuận giữ lại phải trả lãi giống như khoản vay",
          "Vì kiểm toán yêu cầu ghi nhận chi phí sử dụng vốn nội bộ"
        ],
        "correct": 0,
        "explanation": "Đó là tiền của cổ đông đang được giữ lại thay vì chia. Chi phí của nó là chi phí cơ hội - mức sinh lời cổ đông có thể đạt được ở nơi khác với cùng rủi ro - nên bằng đúng cost of equity."
      }
    ]
  }),
  "beta-la-gi": patch({
    "quiz": [
      {
        "question": "Ngành nào thường có beta thấp nhất?",
        "options": [
          "Utility và hàng tiêu dùng thiết yếu - nhu cầu ổn định",
          "Tài chính - vì ngân hàng được nhà nước bảo hộ khi khủng hoảng",
          "Du lịch - vì nhu cầu đi lại đã trở nên thiết yếu với mọi người",
          "Công nghệ - vì tăng trưởng cao giúp cổ phiếu ít biến động hơn"
        ],
        "correct": 0,
        "explanation": "Utility và staples (Unilever, P&G) có beta thấp (~0.3-0.7) vì nhu cầu điện/nước/thực phẩm ổn định trong mọi chu kỳ kinh tế. Tech và ngân hàng thường beta > 1."
      },
      {
        "question": "Vì sao một cổ phiếu có Beta = 0.5 vẫn có thể lỗ nặng trong một đợt sụp đổ thị trường nghiêm trọng, dù về lý thuyết nó chỉ nên biến động bằng một nửa thị trường?",
        "options": [
          "Cổ phiếu Beta thấp luôn an toàn tuyệt đối trong mọi kịch bản của thị trường",
          "Beta là ước tính thống kê từ quá khứ; khủng hoảng làm tương quan vọt lên",
          "Beta = 0,5 đảm bảo cổ phiếu không giảm quá một nửa mức thị trường",
          "Beta không có ý nghĩa gì trong thực tế đầu tư nên bỏ qua được"
        ],
        "correct": 1,
        "explanation": "Beta là một mô hình thống kê dựa trên dữ liệu quá khứ, không phải một sự đảm bảo tuyệt đối cho tương lai - trong khủng hoảng thanh khoản nghiêm trọng (như tháng 3/2020), nhà đầu tư thường bán tháo MỌI tài sản."
      },
      {
        "question": "Beta = 1,5, thị trường giảm 10%. Cổ phiếu dự kiến biến động thế nào?",
        "options": [
          "Giảm khoảng 15% (= 10% × beta 1,5, khuếch đại hai chiều)",
          "Giảm khoảng 6,7% (= 10% ÷ 1,5, chia thay vì nhân)",
          "Giảm khoảng 11,5% (= 10% + 1,5 điểm phần trăm)",
          "Giảm đúng 10% vì beta chỉ áp dụng lúc thị trường tăng"
        ],
        "correct": 0,
        "explanation": "Beta khuếch đại theo cả hai chiều: thị trường giảm 10% thì kỳ vọng cổ phiếu giảm 15%. Đây là con số kỳ vọng trung bình, không phải mức đảm bảo cho một phiên cụ thể."
      },
      {
        "question": "Vì sao ngành điện nước thường có beta thấp còn công nghệ thì cao?",
        "options": [
          "Vì nhu cầu điện nước gần như không đổi theo chu kỳ",
          "Vì cổ phiếu điện nước có thanh khoản thấp hơn nhiều",
          "Vì công ty công nghệ vay nợ nhiều hơn ngành điện nước",
          "Vì ngành điện nước được nhà nước bảo hộ khỏi cạnh tranh"
        ],
        "correct": 0,
        "explanation": "Beta đo độ nhạy với chu kỳ kinh tế. Người ta vẫn dùng điện khi suy thoái, nhưng hoãn mua phần mềm mới và cắt ngân sách quảng cáo - nên lợi nhuận công nghệ dao động mạnh hơn nhiều."
      },
      {
        "question": "Beta không đo được loại rủi ro nào?",
        "options": [
          "Rủi ro riêng của doanh nghiệp, như cháy nhà máy",
          "Rủi ro lãi suất tăng trên toàn thị trường tài chính",
          "Rủi ro suy thoái kinh tế lan rộng ra mọi ngành nghề",
          "Rủi ro thị trường chứng khoán sụt giảm kéo dài nhiều năm"
        ],
        "correct": 0,
        "explanation": "Beta chỉ đo rủi ro hệ thống - phần biến động cùng nhịp với thị trường. Rủi ro riêng lẻ được xem là có thể triệt tiêu bằng đa dạng hóa, nên mô hình không trả thêm phần bù cho nó."
      }
    ]
  }),
  "risk-free-rate": patch({
    "quiz": [
      {
        "question": "Market Risk Premium lịch sử của Mỹ thường là bao nhiêu?",
        "options": [
          "1-2% - vì cổ phiếu chỉ nhích hơn trái phiếu chính phủ chút ít",
          "10-15% - đúng bằng mức sinh lời trung bình của chỉ số S&P 500",
          "5-7% - con số lịch sử dài hạn thường được dùng",
          "Trên 20% - phần bù rủi ro phải lớn để bù cho biến động cổ phiếu"
        ],
        "correct": 2,
        "explanation": "Equity Risk Premium lịch sử của Mỹ khoảng 5-7%/năm kể từ đầu thế kỷ 20. Damodaran cập nhật hàng năm. Con số này thay đổi theo từng giai đoạn và thường tranh luận trong giới tài chính."
      },
      {
        "question": "Nếu risk-free rate của một quốc gia tăng mạnh (ví dụ do lạm phát cao khiến ngân hàng trung ương phải tăng lãi suất), điều gì thường xảy ra với định giá cổ phiếu trên thị trường đó, các yếu tố khác không đổi?",
        "options": [
          "Không ảnh hưởng gì tới định giá cổ phiếu, chỉ tác động lên trái phiếu",
          "Định giá tăng vì lãi suất cao khiến thị trường hấp dẫn hơn với vốn",
          "Chỉ ảnh hưởng cổ phiếu ngân hàng, các ngành khác gần như không đổi",
          "Định giá giảm - Cost of Equity tăng làm discount rate trong DCF tăng"
        ],
        "correct": 3,
        "explanation": "Đây là kênh truyền dẫn quan trọng nhất giữa chính sách tiền tệ và thị trường chứng khoán: risk-free rate là nền tảng của CAPM và WACC - khi nó tăng, chi phí vốn của MỌI doanh nghiệp tăng theo, kéo giảm định giá DCF trên diện rộng, đây là lý do thị trường chứng khoán thường phản ứng tiêu cực khi ngân hàng trung ương tăng lãi suất mạnh."
      },
      {
        "question": "Rf = 3,5%, MRP = 7%, beta = 1,2. Cost of Equity theo CAPM bằng bao nhiêu?",
        "options": [
          "11,9% (= 3,5% + 1,2 × 7%, Rf cộng beta nhân MRP)",
          "10,5% (= 3,5% + 7%, bỏ quên hệ số beta)",
          "8,4% (= 1,2 × 7%, bỏ quên phần Rf nền)",
          "12,6% (= (3,5% + 7%) × 1,2, nhân cả Rf)"
        ],
        "correct": 0,
        "explanation": "Ke = Rf + β × MRP = 3,5% + 8,4% = 11,9%. Beta chỉ nhân với phần bù rủi ro, không nhân với risk-free rate - Rf là nền mà mọi nhà đầu tư đều nhận được dù không chịu rủi ro nào."
      },
      {
        "question": "Vì sao không nên dùng lợi suất trái phiếu Kho bạc Mỹ làm Rf khi định giá dòng tiền VND?",
        "options": [
          "Vì hai đồng tiền có kỳ vọng lạm phát khác nhau",
          "Vì trái phiếu Mỹ có kỳ hạn ngắn hơn trái phiếu Việt Nam",
          "Vì quy định kế toán Việt Nam không cho phép dùng số liệu ngoại",
          "Vì lợi suất trái phiếu Mỹ biến động mạnh hơn nên kém tin cậy"
        ],
        "correct": 0,
        "explanation": "Dòng tiền và tỷ lệ chiết khấu phải cùng một đồng tiền. Trộn Rf của USD với dòng tiền VND là ngầm giả định hai đồng tiền có cùng kỳ vọng lạm phát - điều không đúng, và sai số đó chảy thẳng vào kết quả định giá."
      },
      {
        "question": "Ngân hàng trung ương tăng lãi suất điều hành. Chuỗi tác động tới định giá cổ phiếu diễn ra thế nào?",
        "options": [
          "Rf tăng, Ke tăng, WACC tăng, giá trị DCF giảm",
          "Rf tăng, beta tăng theo, chỉ cổ phiếu rủi ro cao bị ảnh hưởng",
          "Rf tăng nhưng MRP giảm tương ứng nên định giá không đổi",
          "Rf tăng làm dòng tiền doanh nghiệp giảm, kéo định giá xuống"
        ],
        "correct": 0,
        "explanation": "Rf là nền của mọi mô hình định giá rủi ro, nên nó nhích lên là cả mặt bằng nhích theo. Không doanh nghiệp nào làm ăn kém đi, nhưng mẫu số của mọi mô hình DCF vừa lớn lên cùng lúc."
      }
    ]
  }),
};

export function applyLessonOverrides(lessons) {
  return lessons.map((lesson) => {
    const override = lessonOverrides[lesson.slug];
    return override ? { ...lesson, ...override } : lesson;
  });
}
