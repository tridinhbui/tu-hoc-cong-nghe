// AUTO-GENERATED from lib/lessons.ts keyTakeaways + the dashboard's stage/part
// order — do not hand-edit. Regenerate via the recall-schedule generation
// script if either file changes. Powers the spaced-repetition "Nhớ lại" card:
// for each lesson it surfaces keyTakeaways from lessons ~5 and ~12 positions
// earlier IN THE ACTUAL LEARNING SEQUENCE (respecting the reordered
// curriculum), so a recall card never references material the learner has
// not yet reached.
//
// `distractors` turns the card into a real multiple-choice retrieval check
// (pick the correct takeaway among 3) instead of a self-reported "did you
// remember?" — self-report doesn't actually test recall, an MCQ does.

export interface RecallItem {
  fromDay: number;
  fromTitle: string;
  text: string;
  distractors: string[];
}

export const RECALL_SCHEDULE: Record<number, RecallItem[]> = {
  "1": [
    {
      "fromDay": 264,
      "fromTitle": "Khẩu vị rủi ro: Bạn chịu được biến động cỡ nào?",
      "text": "Khẩu vị rủi ro = khả năng TÀI CHÍNH + khả năng TÂM LÝ; danh mục phù hợp phải nằm trong giới hạn của cả hai",
      "distractors": [
        "Là bước bắt buộc để đánh giá độ tin cậy và giới hạn của bất kỳ mô hình định giá nào",
        "Chọn loại nào phụ thuộc vào kỳ vọng lãi suất: nếu tin lãi suất sẽ tăng, lãi thả nổi có lợi hơn; nếu tin lãi suất sẽ giảm hoặc muốn dòng tiền chắc chắn, lãi cố định phù hợp hơn"
      ]
    }
  ],
  "2": [
    {
      "fromDay": 265,
      "fromTitle": "Lập ngân sách 50/30/20: Kiểm soát tiền trước khi tiền kiểm soát bạn",
      "text": "50/30/20: 50% nhu cầu thiết yếu, 30% mong muốn, 20% tiết kiệm & trả nợ — tính trên thu nhập sau thuế",
      "distractors": [
        "Nợ dài hạn: thời gian trả dài hơn, thường lãi cao hơn",
        "Chốt lời từng phần là chiến lược cân bằng giữa việc hiện thực hóa lợi nhuận và giữ cơ hội hưởng lợi nếu giá tiếp tục tăng"
      ]
    }
  ],
  "3": [
    {
      "fromDay": 266,
      "fromTitle": "Quỹ khẩn cấp: Tấm đệm trước mọi cú sốc",
      "text": "Quỹ khẩn cấp = 3-6 tháng chi tiêu thiết yếu (6-12 tháng nếu thu nhập thất thường), để ở kênh rút được trong 1-2 ngày",
      "distractors": [
        "Bảo hiểm nhân thọ bảo vệ người PHỤ THUỘC vào thu nhập của bạn, không phải bản thân bạn",
        "Tần suất hợp lý cho mục tiêu dài hạn (hưu trí, giáo dục con) là hàng tháng hoặc hàng quý"
      ]
    }
  ],
  "4": [
    {
      "fromDay": 267,
      "fromTitle": "Trả nợ thông minh: Snowball vs Avalanche",
      "text": "Avalanche (theo lãi suất cao → thấp) tối ưu về tiền; Snowball (theo số dư nhỏ → lớn) tối ưu về động lực — chọn theo con người thật của bạn",
      "distractors": [
        "Không có di chúc, tài sản chia theo pháp luật (hàng thừa kế thứ nhất: vợ/chồng, cha mẹ, con) — không nhất thiết theo mong muốn thực sự của người mất",
        "Nguyên tắc chung: chậm lại, xác minh qua kênh khác, không hành động dưới áp lực thời gian khi liên quan đến tiền bạc"
      ]
    }
  ],
  "5": [
    {
      "fromDay": 268,
      "fromTitle": "Tiết kiệm theo mục tiêu: Sinking fund và checklist nền tảng",
      "text": "Sinking fund: chia khoản chi lớn BIẾT TRƯỚC thành khoản nhỏ hàng tháng — khoản chi đoán được không bao giờ nên trở thành nợ",
      "distractors": [
        "Nhưng lãi vay được khấu trừ thuế — lá chắn thuế",
        "Cần thực hiện sensitivity analysis kỹ lưỡng vì mức độ ảnh hưởng cực lớn đến kết quả cuối cùng"
      ]
    }
  ],
  "6": [
    {
      "fromDay": 1,
      "fromTitle": "Tài chính là gì? Vì sao tài chính không chỉ là tiền.",
      "text": "Tài chính là phân bổ nguồn lực trong thời gian và bất định",
      "distractors": [
        "Lạm phát âm thầm bào mòn sức mua của tiền theo thời gian, kể cả khi số dư danh nghĩa không giảm",
        "Là cơ sở tính toán trong hầu hết các thương vụ M&A thực tế"
      ]
    }
  ],
  "7": [
    {
      "fromDay": 2,
      "fromTitle": "Tiền là gì? Tiền khác tài sản như thế nào.",
      "text": "Tiền là phương tiện trao đổi, có thanh khoản tuyệt đối",
      "distractors": [
        "Nhạy cảm với discount rate và dự báo FCF",
        "SG&A = chi phí vận hành gián tiếp (bán hàng + quản lý)"
      ]
    },
    {
      "fromDay": 263,
      "fromTitle": "Audit tài chính cá nhân: Bạn đang đứng ở đâu?",
      "text": "Tài sản ròng = Tổng tài sản − Tổng nợ; phải liệt kê ĐẦY ĐỦ cả hai vế, kể cả nợ 'mềm' (thẻ tín dụng, vay người thân, trả góp)",
      "distractors": [
        "Risk premium: phần thưởng cho việc chấp nhận rủi ro",
        "DPO = AP / (COGS/365) — đo hiệu quả quản lý AP"
      ]
    }
  ],
  "8": [
    {
      "fromDay": 3,
      "fromTitle": "Thu nhập, chi phí, tiết kiệm và đầu tư.",
      "text": "Tỷ lệ tiết kiệm quan trọng hơn số tiền tiết kiệm tuyệt đối",
      "distractors": [
        "Công ty tăng trưởng nhanh thường ưu tiên tái đầu tư hơn là chia cổ tức; công ty ổn định (như Vinamilk) thường trả cổ tức đều đặn",
        "Theo dõi OCF, không chỉ Net Income"
      ]
    },
    {
      "fromDay": 264,
      "fromTitle": "Khẩu vị rủi ro: Bạn chịu được biến động cỡ nào?",
      "text": "Khẩu vị rủi ro = khả năng TÀI CHÍNH + khả năng TÂM LÝ; danh mục phù hợp phải nằm trong giới hạn của cả hai",
      "distractors": [
        "Khi so sánh các sản phẩm 'giống trái phiếu' này, luôn xem xét: kỳ hạn, tính thanh khoản (rút trước hạn có mất lãi không), lãi suất thực nhận, và các loại phí đi kèm",
        "Debt/Equity ratio từ BS cho biết đòn bẩy tài chính"
      ]
    }
  ],
  "9": [
    {
      "fromDay": 4,
      "fromTitle": "Dòng tiền là gì? Vì sao người giàu nhìn dòng tiền trước lợi nhuận.",
      "text": "Lợi nhuận là con số kế toán; dòng tiền là tiền thực trong tài khoản",
      "distractors": [
        "Là tỷ lệ chiết khấu chuẩn trong DCF",
        "Correlation không cố định — có thể thay đổi bất lợi đúng vào giai đoạn khủng hoảng, đây là giới hạn thực tế cần lưu ý"
      ]
    },
    {
      "fromDay": 265,
      "fromTitle": "Lập ngân sách 50/30/20: Kiểm soát tiền trước khi tiền kiểm soát bạn",
      "text": "50/30/20: 50% nhu cầu thiết yếu, 30% mong muốn, 20% tiết kiệm & trả nợ — tính trên thu nhập sau thuế",
      "distractors": [
        "Synergy phải lớn hơn premium mới tạo giá trị",
        "Duration: đo độ nhạy giá với lãi suất"
      ]
    }
  ],
  "10": [
    {
      "fromDay": 5,
      "fromTitle": "Tài sản và tiêu sản: hiểu đúng, không cực đoan.",
      "text": "Tài sản tạo dòng tiền dương; tiêu sản tạo dòng tiền âm",
      "distractors": [
        "Quick Ratio loại hàng tồn kho khỏi tài sản ngắn hạn",
        "Là cơ sở tính toán trong hầu hết các thương vụ M&A thực tế"
      ]
    },
    {
      "fromDay": 266,
      "fromTitle": "Quỹ khẩn cấp: Tấm đệm trước mọi cú sốc",
      "text": "Quỹ khẩn cấp = 3-6 tháng chi tiêu thiết yếu (6-12 tháng nếu thu nhập thất thường), để ở kênh rút được trong 1-2 ngày",
      "distractors": [
        "Quỹ hưu trí bổ sung tự nguyện (Nghị định 88/2016/NĐ-CP) là lựa chọn bổ sung tự nguyện, có ưu đãi thuế, do các công ty bảo hiểm/quản lý quỹ cung cấp",
        "WACC tăng → định giá giảm → cổ phiếu rủi ro"
      ]
    }
  ],
  "11": [
    {
      "fromDay": 6,
      "fromTitle": "Lãi suất là gì? Vì sao lãi suất ảnh hưởng mọi thứ.",
      "text": "Lãi suất là giá của tiền: tăng thì vay đắt hơn, tiết kiệm hấp dẫn hơn",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "FCF = NOPAT × (1 − Growth/ROIC)"
      ]
    },
    {
      "fromDay": 267,
      "fromTitle": "Trả nợ thông minh: Snowball vs Avalanche",
      "text": "Avalanche (theo lãi suất cao → thấp) tối ưu về tiền; Snowball (theo số dư nhỏ → lớn) tối ưu về động lực — chọn theo con người thật của bạn",
      "distractors": [
        "Đầu tư vào tài sản có khả năng tăng trưởng dài hạn (cổ phiếu, quỹ đa dạng hóa) là công cụ chính để bảo vệ sức mua trước lạm phát",
        "AR tăng nhanh hơn revenue = cần điều tra"
      ]
    }
  ],
  "12": [
    {
      "fromDay": 7,
      "fromTitle": "Lãi đơn và lãi kép.",
      "text": "Lãi kép: lãi sinh lãi, tạo hiệu ứng bóng tuyết theo thời gian",
      "distractors": [
        "Danh mục phù hợp là danh mục bạn có thể kiên trì nắm giữ qua các giai đoạn giảm điểm, không phải danh mục có lợi nhuận kỳ vọng cao nhất trên giấy",
        "Là phương pháp định giá tuyệt đối, độc lập với định giá thị trường của công ty khác"
      ]
    },
    {
      "fromDay": 268,
      "fromTitle": "Tiết kiệm theo mục tiêu: Sinking fund và checklist nền tảng",
      "text": "Sinking fund: chia khoản chi lớn BIẾT TRƯỚC thành khoản nhỏ hàng tháng — khoản chi đoán được không bao giờ nên trở thành nợ",
      "distractors": [
        "Leverage ratio: tổng tài sản / vốn tự có",
        "Nợ dài hạn: thời gian trả dài hơn, thường lãi cao hơn"
      ]
    }
  ],
  "13": [
    {
      "fromDay": 8,
      "fromTitle": "Sức mạnh của thời gian trong tài chính.",
      "text": "Bắt đầu sớm quan trọng hơn đầu tư nhiều về sau",
      "distractors": [
        "Rule of 72: số năm nhân đôi ≈ 72 / lãi suất",
        "Tỷ trọng cổ phiếu nên giảm dần khi tuổi tăng, vì thời gian phục hồi sau biến động ngắn lại"
      ]
    },
    {
      "fromDay": 1,
      "fromTitle": "Tài chính là gì? Vì sao tài chính không chỉ là tiền.",
      "text": "Tài chính là phân bổ nguồn lực trong thời gian và bất định",
      "distractors": [
        "Trì hoãn đầu tư hưu trí là chi phí cơ hội không thể bù đắp lại bằng tiền bạc sau này",
        "Tài sản dài hạn: mang lại lợi ích nhiều năm, thường khấu hao dần"
      ]
    }
  ],
  "14": [
    {
      "fromDay": 9,
      "fromTitle": "Lạm phát là gì? Vì sao tiền mất giá.",
      "text": "Lạm phát làm tiền mất sức mua theo thời gian, tích lũy theo năm",
      "distractors": [
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị",
        "Khắt khe và thực tế hơn Current Ratio"
      ]
    },
    {
      "fromDay": 2,
      "fromTitle": "Tiền là gì? Tiền khác tài sản như thế nào.",
      "text": "Tiền là phương tiện trao đổi, có thanh khoản tuyệt đối",
      "distractors": [
        "Lãi suất thực ≈ Lãi suất danh nghĩa − Lạm phát",
        "Giao dịch quá thường xuyên (overtrading) làm tăng chi phí giao dịch và thường xuất phát từ cảm xúc hơn là phân tích"
      ]
    }
  ],
  "15": [
    {
      "fromDay": 10,
      "fromTitle": "Giá trị thời gian của tiền: 1 triệu hôm nay khác 1 triệu năm sau.",
      "text": "Tiền hôm nay đáng giá hơn cùng số tiền trong tương lai",
      "distractors": [
        "Quỹ chủ động thuê chuyên gia phân tích tự chọn cổ phiếu, với mục tiêu vượt trội hơn thị trường, khác với quỹ chỉ số mô phỏng máy móc",
        "CapEx: tài sản dài hạn, khấu hao dần"
      ]
    },
    {
      "fromDay": 3,
      "fromTitle": "Thu nhập, chi phí, tiết kiệm và đầu tư.",
      "text": "Tỷ lệ tiết kiệm quan trọng hơn số tiền tiết kiệm tuyệt đối",
      "distractors": [
        "DCA phù hợp nhất với người có thu nhập đều đặn, muốn xây dựng kỷ luật đầu tư dài hạn mà không cần đoán thời điểm thị trường",
        "Expected Loss = PD × LGD"
      ]
    }
  ],
  "16": [
    {
      "fromDay": 11,
      "fromTitle": "Rủi ro là gì? Không có lợi nhuận nào miễn phí.",
      "text": "Lợi nhuận cao hơn luôn đi kèm rủi ro cao hơn, không có ngoại lệ",
      "distractors": [
        "Nợ dài hạn: thời gian trả dài hơn, thường lãi cao hơn",
        "Tư duy portfolio là nền tảng của toàn bộ lý thuyết đầu tư hiện đại"
      ]
    },
    {
      "fromDay": 4,
      "fromTitle": "Dòng tiền là gì? Vì sao người giàu nhìn dòng tiền trước lợi nhuận.",
      "text": "Lợi nhuận là con số kế toán; dòng tiền là tiền thực trong tài khoản",
      "distractors": [
        "Muốn giảm rủi ro biến động giá khi lo ngại lãi suất tăng, hãy ưu tiên trái phiếu kỳ hạn ngắn hơn",
        "Cổ đông có quyền nhận cổ tức, biểu quyết, và phần tài sản còn lại khi giải thể"
      ]
    }
  ],
  "17": [
    {
      "fromDay": 12,
      "fromTitle": "Lợi nhuận kỳ vọng là gì?",
      "text": "Expected Return = tổng (xác suất x kết quả) của mọi kịch bản",
      "distractors": [
        "Phản ánh chi phí thực sự để mua đứt toàn bộ hoạt động kinh doanh của công ty",
        "Đo hiệu quả sinh lời trên mỗi đơn vị rủi ro, không chỉ lợi nhuận tuyệt đối"
      ]
    },
    {
      "fromDay": 5,
      "fromTitle": "Tài sản và tiêu sản: hiểu đúng, không cực đoan.",
      "text": "Tài sản tạo dòng tiền dương; tiêu sản tạo dòng tiền âm",
      "distractors": [
        "Rủi ro tối đa của người mua call = premium đã trả, không hơn",
        "DCA không đảm bảo lợi nhuận cao hơn đầu tư một lần — mục tiêu chính là giảm rủi ro tâm lý và rủi ro mua đúng đỉnh"
      ]
    }
  ],
  "18": [
    {
      "fromDay": 13,
      "fromTitle": "Thanh khoản là gì? Tài sản dễ bán và khó bán.",
      "text": "Thanh khoản: khả năng bán nhanh mà không mất nhiều giá trị",
      "distractors": [
        "Luôn giữ một phần tài sản ở dạng thanh khoản cao cho nhu cầu khẩn cấp",
        "Non-cash expense: không ảnh hưởng trực tiếp đến dòng tiền"
      ]
    },
    {
      "fromDay": 6,
      "fromTitle": "Lãi suất là gì? Vì sao lãi suất ảnh hưởng mọi thứ.",
      "text": "Lãi suất là giá của tiền: tăng thì vay đắt hơn, tiết kiệm hấp dẫn hơn",
      "distractors": [
        "Lựa chọn Beta phù hợp nên dựa trên chân trời đầu tư và khẩu vị rủi ro của từng nhà đầu tư",
        "Retained earnings âm = accumulated deficit — lỗ tích lũy"
      ]
    }
  ],
  "19": [
    {
      "fromDay": 14,
      "fromTitle": "Nợ tốt và nợ xấu.",
      "text": "Nợ tốt: dùng để mua tài sản sinh lợi cao hơn lãi vay",
      "distractors": [
        "Expected Return của danh mục = trung bình có trọng số theo tỷ trọng từng tài sản",
        "ETF: quỹ chứa rổ tài sản nhưng giao dịch linh hoạt như một cổ phiếu"
      ]
    },
    {
      "fromDay": 7,
      "fromTitle": "Lãi đơn và lãi kép.",
      "text": "Lãi kép: lãi sinh lãi, tạo hiệu ứng bóng tuyết theo thời gian",
      "distractors": [
        "Giá rẻ không tự động là cơ hội tốt — cần phân biệt 'rẻ vì bị bỏ quên' với 'rẻ vì thực sự có vấn đề'",
        "FIRE không nhất thiết là ngừng làm việc hoàn toàn — nhiều người chọn 'Barista FIRE' (làm việc bán thời gian) để giảm áp lực rút vốn"
      ]
    }
  ],
  "20": [
    {
      "fromDay": 15,
      "fromTitle": "Đòn bẩy tài chính là gì?",
      "text": "Đòn bẩy khuếch đại cả lợi nhuận lẫn thua lỗ so với vốn tự có",
      "distractors": [
        "VC: đầu tư mạo hiểm, chấp nhận rủi ro cao",
        "Tắt thông báo biến động giá hàng ngày trên app đầu tư là cách đơn giản để giảm cám dỗ kiểm tra liên tục"
      ]
    },
    {
      "fromDay": 8,
      "fromTitle": "Sức mạnh của thời gian trong tài chính.",
      "text": "Bắt đầu sớm quan trọng hơn đầu tư nhiều về sau",
      "distractors": [
        "Trái phiếu = cho vay, nhận coupon + hoàn vốn khi đáo hạn",
        "ROIC > WACC → tạo value"
      ]
    }
  ],
  "26": [
    {
      "fromDay": 21,
      "fromTitle": "Kế toán là ngôn ngữ của kinh doanh",
      "text": "Kế toán là ngôn ngữ của kinh doanh — ai cũng cần biết đọc",
      "distractors": [
        "Yield curve bình thường: dốc lên, kỳ hạn dài lợi suất cao hơn",
        "Lãi kép: lãi trên lãi — sức mạnh thời gian"
      ]
    }
  ],
  "27": [
    {
      "fromDay": 22,
      "fromTitle": "Doanh thu: khi nào được ghi nhận?",
      "text": "Doanh thu ≠ tiền nhận được",
      "distractors": [
        "Dựa trên dữ liệu lịch sử (Trinity Study), có xác suất thành công cao nhưng không phải đảm bảo tuyệt đối",
        "Là tỷ lệ chiết khấu chuẩn trong DCF"
      ]
    }
  ],
  "28": [
    {
      "fromDay": 23,
      "fromTitle": "Chi phí khác dòng tiền ra thế nào?",
      "text": "Chi phí kế toán ≠ dòng tiền ra trong cùng kỳ",
      "distractors": [
        "FOMO khiến nhà đầu tư mua theo đám đông ở gần đỉnh giá vì sợ bỏ lỡ, không dựa trên phân tích giá trị",
        "Premium: phí trả để có quyền chọn, là rủi ro tối đa của người mua"
      ]
    }
  ],
  "29": [
    {
      "fromDay": 24,
      "fromTitle": "Lợi nhuận gộp, hoạt động, ròng",
      "text": "Gross Profit đo hiệu quả sản xuất/kinh doanh cốt lõi",
      "distractors": [
        "Bảo hiểm nhân thọ liên kết đầu tư có phần phân bổ vào quỹ trái phiếu, nhưng đây là sản phẩm lai giữa bảo vệ và đầu tư, có phí quản lý và điều khoản riêng — cần đọc kỹ hợp đồng trước khi tham gia",
        "Trung lập với cơ cấu vốn và chính sách khấu hao — phù hợp so sánh công ty có đòn bẩy khác nhau"
      ]
    }
  ],
  "30": [
    {
      "fromDay": 25,
      "fromTitle": "Tài sản là gì trong kế toán?",
      "text": "Tài sản = những gì doanh nghiệp sở hữu và kiểm soát",
      "distractors": [
        "Báo cáo tài chính là sản phẩm của hệ thống kế toán",
        "Chi phí kế toán ≠ dòng tiền ra trong cùng kỳ"
      ]
    }
  ],
  "31": [
    {
      "fromDay": 26,
      "fromTitle": "Nợ phải trả là gì?",
      "text": "Nợ phải trả = nghĩa vụ phải thanh toán trong tương lai",
      "distractors": [
        "Giá cổ phiếu một mình không nói lên gì về độ rẻ/đắt; P/E (giá chia lợi nhuận mỗi cổ phiếu) mới là thước đo so sánh công bằng hơn",
        "Danh mục là tập hợp các khoản đầu tư được quản lý như một thể thống nhất, không phải từng khoản riêng lẻ"
      ]
    }
  ],
  "32": [
    {
      "fromDay": 27,
      "fromTitle": "Vốn chủ sở hữu là gì?",
      "text": "Equity = Tài sản − Nợ phải trả",
      "distractors": [
        "Trì hoãn đầu tư hưu trí là chi phí cơ hội không thể bù đắp lại bằng tiền bạc sau này",
        "Tài sản ngắn hạn: chuyển thành tiền trong 12 tháng"
      ]
    }
  ],
  "33": [
    {
      "fromDay": 28,
      "fromTitle": "Tài sản = Nợ + Vốn chủ",
      "text": "Assets = Liabilities + Equity — luôn luôn cân bằng",
      "distractors": [
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
        "Thay đổi WC ảnh hưởng trực tiếp đến OCF"
      ]
    },
    {
      "fromDay": 21,
      "fromTitle": "Kế toán là ngôn ngữ của kinh doanh",
      "text": "Kế toán là ngôn ngữ của kinh doanh — ai cũng cần biết đọc",
      "distractors": [
        "Nguyên tắc này tự động phát hiện nhiều loại sai sót",
        "Phản ánh pricing power và hiệu quả sản xuất"
      ]
    }
  ],
  "34": [
    {
      "fromDay": 29,
      "fromTitle": "Tại sao bảng cân đối luôn phải cân?",
      "text": "Bảng cân đối không cân = lỗi hoặc gian lận",
      "distractors": [
        "Lãi suất tăng → giá trái phiếu giảm (và ngược lại)",
        "Nền tảng an toàn cần xây trước khi tối ưu hóa các mục tiêu đầu tư dài hạn như hưu trí hay giáo dục con cái"
      ]
    },
    {
      "fromDay": 22,
      "fromTitle": "Doanh thu: khi nào được ghi nhận?",
      "text": "Doanh thu ≠ tiền nhận được",
      "distractors": [
        "Recovery rate phụ thuộc vào việc trái phiếu có tài sản đảm bảo hay không",
        "Đây là nền tảng của double-entry bookkeeping"
      ]
    }
  ],
  "35": [
    {
      "fromDay": 30,
      "fromTitle": "Khấu hao là gì?",
      "text": "Khấu hao phân bổ chi phí tài sản dài hạn qua nhiều năm",
      "distractors": [
        "FCFF: dòng tiền tự do thuộc về toàn bộ nhà cung cấp vốn (cổ đông và chủ nợ)",
        "Thời gian: lãi kép, bắt đầu sớm, PV/FV"
      ]
    },
    {
      "fromDay": 23,
      "fromTitle": "Chi phí khác dòng tiền ra thế nào?",
      "text": "Chi phí kế toán ≠ dòng tiền ra trong cùng kỳ",
      "distractors": [
        "Tiền hôm nay đáng giá hơn cùng số tiền trong tương lai",
        "Ba quyết định: Đầu tư, Tài trợ, Phân phối"
      ]
    }
  ],
  "36": [
    {
      "fromDay": 31,
      "fromTitle": "Hàng tồn kho là gì?",
      "text": "Hàng tồn kho là vốn bị kẹt — cần quản lý chặt",
      "distractors": [
        "Thực tế: Trade-off giữa tax shield và financial distress",
        "Lợi nhuận cao bất thường, ổn định, không rủi ro là dấu hiệu cảnh báo mô hình lừa đảo đa cấp/Ponzi"
      ]
    },
    {
      "fromDay": 24,
      "fromTitle": "Lợi nhuận gộp, hoạt động, ròng",
      "text": "Gross Profit đo hiệu quả sản xuất/kinh doanh cốt lõi",
      "distractors": [
        "Người nghỉ hưu đặc biệt dễ tổn thương trước lạm phát vì không còn thu nhập lương để bù đắp",
        "Receivables Turnover = Revenue / AR; DSO = 365 / Turnover"
      ]
    }
  ],
  "37": [
    {
      "fromDay": 32,
      "fromTitle": "Khoản phải thu là gì?",
      "text": "AR là tiền khách nợ — chưa chắc đã thu được",
      "distractors": [
        "Beta = độ biến động tương đối so với thị trường",
        "Nên so sánh P/E của một công ty với chính nó trong quá khứ và với các công ty cùng ngành, không so sánh công ty khác ngành với nhau"
      ]
    },
    {
      "fromDay": 25,
      "fromTitle": "Tài sản là gì trong kế toán?",
      "text": "Tài sản = những gì doanh nghiệp sở hữu và kiểm soát",
      "distractors": [
        "Rủi ro và lợi nhuận cần đánh giá ở cấp độ danh mục, không phải từng tài sản riêng lẻ",
        "Equity = Tài sản − Nợ phải trả"
      ]
    }
  ],
  "38": [
    {
      "fromDay": 33,
      "fromTitle": "Khoản phải trả là gì?",
      "text": "AP cao = doanh nghiệp mạnh dùng tiền NCC miễn lãi",
      "distractors": [
        "Sau tất cả chi phí, lãi vay và thuế",
        "Luôn so sánh trong ngành và theo xu hướng"
      ]
    },
    {
      "fromDay": 26,
      "fromTitle": "Nợ phải trả là gì?",
      "text": "Nợ phải trả = nghĩa vụ phải thanh toán trong tương lai",
      "distractors": [
        "Utility: beta thấp; Tech/Crypto: beta cao",
        "Expense ratio là phí vận hành quỹ trừ dần hàng năm vào tài sản, âm thầm nhưng có thật, dù nhà đầu tư không thấy khoản trừ trực tiếp"
      ]
    }
  ],
  "39": [
    {
      "fromDay": 34,
      "fromTitle": "Tiền mặt trên báo cáo tài chính",
      "text": "Cash = tài sản thanh khoản nhất, rủi ro thấp nhất",
      "distractors": [
        "IPO là quá trình chuyển từ private sang public để huy động vốn lớn",
        "Expiration date xa hơn → premium cao hơn (nhiều thời gian biến động hơn)"
      ]
    },
    {
      "fromDay": 27,
      "fromTitle": "Vốn chủ sở hữu là gì?",
      "text": "Equity = Tài sản − Nợ phải trả",
      "distractors": [
        "Alpha dương phản ánh kỹ năng thực sự của nhà quản lý quỹ, không phải may mắn ngắn hạn",
        "Optimal leverage tồn tại — leverage quá cao làm Ke và Kd tăng"
      ]
    }
  ],
  "40": [
    {
      "fromDay": 35,
      "fromTitle": "Nợ ngắn hạn và nợ dài hạn",
      "text": "Nợ ngắn hạn: đáo hạn ≤ 12 tháng — rủi ro thanh khoản cao hơn",
      "distractors": [
        "Nợ tốt: dùng để mua tài sản sinh lợi cao hơn lãi vay",
        "Duration: đo độ nhạy giá với lãi suất"
      ]
    },
    {
      "fromDay": 28,
      "fromTitle": "Tài sản = Nợ + Vốn chủ",
      "text": "Assets = Liabilities + Equity — luôn luôn cân bằng",
      "distractors": [
        "Spot vs Futures: contango vs backwardation",
        "Nên dùng cả hai phương pháp để kiểm tra chéo tính hợp lý của kết quả định giá"
      ]
    }
  ],
  "41": [
    {
      "fromDay": 36,
      "fromTitle": "Vốn lưu động là gì?",
      "text": "WC = Tài sản ngắn hạn − Nợ ngắn hạn",
      "distractors": [
        "Chặng 4 xây hai lớp: BẢO VỆ (quỹ khẩn cấp, bảo hiểm, bảo mật trước lừa đảo) và TỔ CHỨC (ngân sách, tờ khai tài chính, thừa kế, biết khi nào cần tư vấn chuyên nghiệp)",
        "NPV > 0: tạo giá trị; NPV < 0: phá hủy giá trị"
      ]
    },
    {
      "fromDay": 29,
      "fromTitle": "Tại sao bảng cân đối luôn phải cân?",
      "text": "Bảng cân đối không cân = lỗi hoặc gian lận",
      "distractors": [
        "Default: vi phạm nghĩa vụ trả nợ, không nhất thiết là phá sản",
        "Dividend yield = DPS / Giá cổ phiếu"
      ]
    }
  ],
  "42": [
    {
      "fromDay": 37,
      "fromTitle": "Working Capital vận hành doanh nghiệp",
      "text": "CCC = DIO + DSO − DPO — đo hiệu quả quản lý vốn lưu động",
      "distractors": [
        "Nợ dài hạn: thời gian trả dài hơn, thường lãi cao hơn",
        "Đa dạng hóa danh mục và tránh đòn bẩy quá mức là hai nguyên tắc bảo vệ cơ bản nhất cho người mới bắt đầu"
      ]
    },
    {
      "fromDay": 30,
      "fromTitle": "Khấu hao là gì?",
      "text": "Khấu hao phân bổ chi phí tài sản dài hạn qua nhiều năm",
      "distractors": [
        "Là công cụ trực quan hóa cốt lõi của Modern Portfolio Theory",
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng"
      ]
    }
  ],
  "43": [
    {
      "fromDay": 38,
      "fromTitle": "Accrual Accounting là gì?",
      "text": "Accrual: ghi nhận theo nghĩa vụ kinh tế, không theo tiền mặt",
      "distractors": [
        "Discount rate = chi phí cơ hội của vốn",
        "Thời gian tăng trưởng, không phải thời gian đóng tiền, quyết định kết quả"
      ]
    },
    {
      "fromDay": 31,
      "fromTitle": "Hàng tồn kho là gì?",
      "text": "Hàng tồn kho là vốn bị kẹt — cần quản lý chặt",
      "distractors": [
        "ETF là quỹ nắm giữ nhiều cổ phiếu (hoặc tài sản khác) cùng lúc, nhưng giao dịch dễ dàng như một cổ phiếu đơn lẻ trên sàn",
        "YTM là tiêu chí so sánh trái phiếu, không phải coupon rate"
      ]
    }
  ],
  "44": [
    {
      "fromDay": 39,
      "fromTitle": "Cash Accounting là gì?",
      "text": "Cash accounting: ghi nhận khi tiền thực sự vào/ra",
      "distractors": [
        "Lạm phát làm tiền mất sức mua theo thời gian, tích lũy theo năm",
        "Dùng YTM của trái phiếu hiện tại, không dùng lãi suất hợp đồng cũ"
      ]
    },
    {
      "fromDay": 32,
      "fromTitle": "Khoản phải thu là gì?",
      "text": "AR là tiền khách nợ — chưa chắc đã thu được",
      "distractors": [
        "COGS = chi phí trực tiếp để tạo ra sản phẩm",
        "Đòn bẩy cao khiến speculation bằng phái sinh rủi ro hơn nhiều so với giao dịch tài sản cơ sở trực tiếp"
      ]
    }
  ],
  "45": [
    {
      "fromDay": 40,
      "fromTitle": "Ôn tập: Đọc ngôn ngữ kế toán",
      "text": "Assets = Liabilities + Equity — luôn cân",
      "distractors": [
        "FOMO khiến nhà đầu tư mua theo đám đông ở gần đỉnh giá vì sợ bỏ lỡ, không dựa trên phân tích giá trị",
        "Quyết định cơ bản (ngân sách, quỹ khẩn cấp, đầu tư định kỳ) hoàn toàn có thể tự làm sau khi học đủ nền tảng"
      ]
    },
    {
      "fromDay": 33,
      "fromTitle": "Khoản phải trả là gì?",
      "text": "AP cao = doanh nghiệp mạnh dùng tiền NCC miễn lãi",
      "distractors": [
        "Nếu không chắc có nên cho vay hay không, thử tự hỏi: 'Nếu mất số tiền này, mối quan hệ có còn nguyên vẹn không?'",
        "Nên tách riêng quyết định 'mua nhà để ở' khỏi phần tính toán phân bổ danh mục đầu tư"
      ]
    }
  ],
  "46": [
    {
      "fromDay": 41,
      "fromTitle": "Bộ 3 báo cáo tài chính gồm gì?",
      "text": "P&L: lợi nhuận qua thời gian",
      "distractors": [
        "CAPM: Ke = Rf + β(Rm − Rf)",
        "Trên thế giới có S&P, Moody's, Fitch; tại Việt Nam có FiinRatings và VIS Rating đánh giá doanh nghiệp trong nước"
      ]
    },
    {
      "fromDay": 34,
      "fromTitle": "Tiền mặt trên báo cáo tài chính",
      "text": "Cash = tài sản thanh khoản nhất, rủi ro thấp nhất",
      "distractors": [
        "Nhà đang ở là khoản chi tiêu cho nhu cầu ở, không phải khoản đầu tư tạo dòng tiền — dù giá trị có thể tăng theo thời gian",
        "Lãi (coupon) trái phiếu doanh nghiệp nhận bởi cá nhân tại Việt Nam chịu thuế thu nhập cá nhân 5%, tính trên phần lãi nhận được và thường khấu trừ tại nguồn"
      ]
    }
  ],
  "47": [
    {
      "fromDay": 42,
      "fromTitle": "Income Statement: Báo cáo kết quả kinh doanh",
      "text": "P&L đi từ Revenue xuống Net Income",
      "distractors": [
        "Trái phiếu phù hợp khi: cần bảo toàn vốn, có mục tiêu chi tiêu cụ thể trong thời gian ngắn-trung hạn, hoặc muốn dòng tiền ổn định dự đoán được",
        "Là một trong những đầu vào quan trọng nhất của mọi mô hình quản trị rủi ro danh mục"
      ]
    },
    {
      "fromDay": 35,
      "fromTitle": "Nợ ngắn hạn và nợ dài hạn",
      "text": "Nợ ngắn hạn: đáo hạn ≤ 12 tháng — rủi ro thanh khoản cao hơn",
      "distractors": [
        "IRR là discount rate làm NPV = 0",
        "Lãi kép: lãi trên lãi — sức mạnh thời gian"
      ]
    }
  ],
  "48": [
    {
      "fromDay": 43,
      "fromTitle": "Revenue, COGS và Gross Profit",
      "text": "COGS = chi phí trực tiếp để tạo ra sản phẩm",
      "distractors": [
        "AP cao = doanh nghiệp mạnh dùng tiền NCC miễn lãi",
        "Trái phiếu = cho vay, nhận coupon + hoàn vốn khi đáo hạn"
      ]
    },
    {
      "fromDay": 36,
      "fromTitle": "Vốn lưu động là gì?",
      "text": "WC = Tài sản ngắn hạn − Nợ ngắn hạn",
      "distractors": [
        "Không có lãi suất cụ thể — đây là chi phí cơ hội của cổ đông",
        "Mỗi giao dịch tác động ít nhất hai dòng trong bảng cân đối"
      ]
    }
  ],
  "49": [
    {
      "fromDay": 44,
      "fromTitle": "Operating Expense: SG&A, R&D",
      "text": "SG&A = chi phí vận hành gián tiếp (bán hàng + quản lý)",
      "distractors": [
        "g (tăng trưởng vĩnh viễn) thường 2-3%, xấp xỉ tăng trưởng GDP dài hạn",
        "Discounting = compounding ngược lại"
      ]
    },
    {
      "fromDay": 37,
      "fromTitle": "Working Capital vận hành doanh nghiệp",
      "text": "CCC = DIO + DSO − DPO — đo hiệu quả quản lý vốn lưu động",
      "distractors": [
        "BHXH bắt buộc là trụ cột chính cho lương hưu tại Việt Nam, do người lao động và doanh nghiệp cùng đóng góp",
        "Cash position phản ánh sức khỏe ngắn hạn và chiến lược dài hạn"
      ]
    }
  ],
  "50": [
    {
      "fromDay": 45,
      "fromTitle": "EBIT và Operating Income",
      "text": "EBIT đo hiệu quả hoạt động, độc lập với cơ cấu vốn",
      "distractors": [
        "Standard deviation: công cụ toán học chính xác đo mức độ phân tán của lợi suất",
        "Phù hợp đánh giá thanh khoản, không phải tạo giá trị"
      ]
    },
    {
      "fromDay": 38,
      "fromTitle": "Accrual Accounting là gì?",
      "text": "Accrual: ghi nhận theo nghĩa vụ kinh tế, không theo tiền mặt",
      "distractors": [
        "EV/Revenue: dùng khi công ty chưa có lợi nhuận dương để áp dụng các chỉ số khác",
        "Dividend yield = DPS / Giá cổ phiếu"
      ]
    }
  ],
  "51": [
    {
      "fromDay": 46,
      "fromTitle": "Interest Expense và Tax Expense",
      "text": "EBIT − Interest = EBT; EBT × (1−Tax) = Net Income",
      "distractors": [
        "Danh mục phù hợp là danh mục bạn có thể kiên trì nắm giữ qua các giai đoạn giảm điểm, không phải danh mục có lợi nhuận kỳ vọng cao nhất trên giấy",
        "Chênh lệch lớn giữa các phương pháp là tín hiệu cần phân tích sâu hơn, không phải để bỏ qua"
      ]
    },
    {
      "fromDay": 39,
      "fromTitle": "Cash Accounting là gì?",
      "text": "Cash accounting: ghi nhận khi tiền thực sự vào/ra",
      "distractors": [
        "Tần suất hợp lý cho mục tiêu dài hạn (hưu trí, giáo dục con) là hàng tháng hoặc hàng quý",
        "Chốt lời từng phần là chiến lược cân bằng giữa việc hiện thực hóa lợi nhuận và giữ cơ hội hưởng lợi nếu giá tiếp tục tăng"
      ]
    }
  ],
  "52": [
    {
      "fromDay": 47,
      "fromTitle": "Net Income: ý nghĩa và giới hạn",
      "text": "Net Income là bottom line — nhưng chỉ là con số kế toán",
      "distractors": [
        "Commodity = hàng hóa chuẩn hóa, price taker",
        "Market Risk Premium = Rm − Rf ≈ 5-7% lịch sử"
      ]
    },
    {
      "fromDay": 40,
      "fromTitle": "Ôn tập: Đọc ngôn ngữ kế toán",
      "text": "Assets = Liabilities + Equity — luôn cân",
      "distractors": [
        "Volatility cao không xấu về bản chất — cần cân nhắc cùng lợi nhuận kỳ vọng và khẩu vị rủi ro",
        "Đây là phép tính nền tảng để so sánh các phương án phân bổ tài sản khác nhau"
      ]
    }
  ],
  "53": [
    {
      "fromDay": 48,
      "fromTitle": "Đọc Balance Sheet từ đầu đến cuối",
      "text": "Đọc BS: tài sản ngắn hạn vs nợ ngắn hạn trước",
      "distractors": [
        "Quỹ khẩn cấp và bảo hiểm bảo vệ cơ bản là nền tảng cần có trước khi tối ưu hóa các mục tiêu đầu tư dài hạn khác",
        "Phương pháp định giá tương đối, nhanh và dựa trên dữ liệu thị trường thực tế"
      ]
    },
    {
      "fromDay": 41,
      "fromTitle": "Bộ 3 báo cáo tài chính gồm gì?",
      "text": "P&L: lợi nhuận qua thời gian",
      "distractors": [
        "Balance Sheet: vị thế tài chính tại một thời điểm",
        "EV/Revenue: dùng khi công ty chưa có lợi nhuận dương để áp dụng các chỉ số khác"
      ]
    }
  ],
  "54": [
    {
      "fromDay": 49,
      "fromTitle": "Current Assets và Non-current Assets",
      "text": "Current assets: tiền mặt, AR, hàng tồn kho — thanh khoản trong 1 năm",
      "distractors": [
        "Chỉ số tốt nhất để đánh giá chất lượng doanh nghiệp dài hạn",
        "Software/SaaS có operating margin cao nhất do scalability"
      ]
    },
    {
      "fromDay": 42,
      "fromTitle": "Income Statement: Báo cáo kết quả kinh doanh",
      "text": "P&L đi từ Revenue xuống Net Income",
      "distractors": [
        "ROE: hiệu quả dùng vốn cổ đông để tạo lợi nhuận — càng cao càng tốt trong cùng ngành",
        "Cắt lỗ có kỷ luật (ngưỡng xác định từ trước) khác hẳn với cắt lỗ theo cảm xúc (phản ứng hoảng loạn tùy hứng khi thấy giá đỏ)"
      ]
    }
  ],
  "55": [
    {
      "fromDay": 50,
      "fromTitle": "Current và Long-term Liabilities",
      "text": "Nợ ≤ 12 tháng = current; > 12 tháng = long-term",
      "distractors": [
        "Nên dùng cả hai phương pháp để kiểm tra chéo tính hợp lý của kết quả định giá",
        "Tự đánh giá trung thực bằng cách hình dung phản ứng thực tế khi danh mục giảm 20-30% giá trị"
      ]
    },
    {
      "fromDay": 43,
      "fromTitle": "Revenue, COGS và Gross Profit",
      "text": "COGS = chi phí trực tiếp để tạo ra sản phẩm",
      "distractors": [
        "Lỗ kế toán ≠ hết tiền — D&A và WC tạo ra sự khác biệt",
        "Kết hợp trái phiếu Chính phủ (an toàn tuyệt đối, lợi suất thấp) và quỹ trái phiếu doanh nghiệp đa dạng hóa (lợi suất cao hơn, rủi ro tín dụng cao hơn) giúp cân bằng giữa an toàn và hiệu quả sinh lời"
      ]
    }
  ],
  "56": [
    {
      "fromDay": 51,
      "fromTitle": "Shareholders' Equity gồm những gì?",
      "text": "Equity gồm: common stock, APIC, retained earnings, treasury stock",
      "distractors": [
        "FCF là tiền thực sự tự do sau khi duy trì kinh doanh",
        "Việt Nam có ba sàn giao dịch chính: HOSE, HNX và UPCoM, mỗi sàn có tiêu chuẩn niêm yết khác nhau"
      ]
    },
    {
      "fromDay": 44,
      "fromTitle": "Operating Expense: SG&A, R&D",
      "text": "SG&A = chi phí vận hành gián tiếp (bán hàng + quản lý)",
      "distractors": [
        "YTM là tiêu chí so sánh trái phiếu, không phải coupon rate",
        "Nguyên nhân: coupon của trái phiếu đã phát hành không đổi, nên giá phải điều chỉnh để lợi suất thực tế tương xứng với mặt bằng lãi suất mới"
      ]
    }
  ],
  "57": [
    {
      "fromDay": 52,
      "fromTitle": "Cash Flow Statement là gì?",
      "text": "3 phần: Operating, Investing, Financing",
      "distractors": [
        "Hữu ích nhất với ngân hàng, bảo hiểm, bất động sản — nơi sổ sách phản ánh sát giá trị thực",
        "Tái cân bằng về bản chất là 'bán cao, mua thấp' có kỷ luật, ngược với bản năng tâm lý tự nhiên"
      ]
    },
    {
      "fromDay": 45,
      "fromTitle": "EBIT và Operating Income",
      "text": "EBIT đo hiệu quả hoạt động, độc lập với cơ cấu vốn",
      "distractors": [
        "Cash position phản ánh sức khỏe ngắn hạn và chiến lược dài hạn",
        "Cổ phiếu và bất động sản bảo vệ lạm phát dài hạn tốt hơn tiền gửi"
      ]
    }
  ],
  "58": [
    {
      "fromDay": 53,
      "fromTitle": "Operating Cash Flow là gì?",
      "text": "OCF = tiền thực từ kinh doanh, điều chỉnh từ Net Income",
      "distractors": [
        "Bảo hiểm nhân thọ bảo vệ người PHỤ THUỘC vào thu nhập của bạn, không phải bản thân bạn",
        "Apple: OCF mạnh, FCF gần bằng OCF, buyback liên tục"
      ]
    },
    {
      "fromDay": 46,
      "fromTitle": "Interest Expense và Tax Expense",
      "text": "EBIT − Interest = EBT; EBT × (1−Tax) = Net Income",
      "distractors": [
        "Cost of Debt after-tax = Lãi suất × (1 − Thuế suất)",
        "Kiểm tra danh mục quá thường xuyên không cải thiện hiệu suất mà còn dễ gây quyết định cảm tính, có hại cho chiến lược dài hạn"
      ]
    }
  ],
  "59": [
    {
      "fromDay": 54,
      "fromTitle": "Investing Cash Flow là gì?",
      "text": "ICF âm = đang đầu tư vào tương lai (CapEx, M&A)",
      "distractors": [
        "VC: đầu tư mạo hiểm, chấp nhận rủi ro cao",
        "FCF = NOPAT × (1 − Growth/ROIC)"
      ]
    },
    {
      "fromDay": 47,
      "fromTitle": "Net Income: ý nghĩa và giới hạn",
      "text": "Net Income là bottom line — nhưng chỉ là con số kế toán",
      "distractors": [
        "Trái phiếu phù hợp khi: cần bảo toàn vốn, có mục tiêu chi tiêu cụ thể trong thời gian ngắn-trung hạn, hoặc muốn dòng tiền ổn định dự đoán được",
        "Lựa chọn phụ thuộc vào thời gian, kiến thức và mức sẵn sàng trả phí của từng người, không có phương án nào 'luôn đúng' cho tất cả"
      ]
    }
  ],
  "60": [
    {
      "fromDay": 55,
      "fromTitle": "Financing Cash Flow là gì?",
      "text": "FCF: vay (+), trả nợ (−), phát hành CP (+), buyback (−), cổ tức (−)",
      "distractors": [
        "Portfolio: tập hợp tài sản được quản lý như một thể thống nhất",
        "Deferred revenue = tiền nhận trước → tốt cho OCF"
      ]
    },
    {
      "fromDay": 48,
      "fromTitle": "Đọc Balance Sheet từ đầu đến cuối",
      "text": "Đọc BS: tài sản ngắn hạn vs nợ ngắn hạn trước",
      "distractors": [
        "Thiên kiến 'chỉ thấy người thắng' (survivorship bias) khiến người mới dễ có kỳ vọng lợi nhuận bị thổi phồng so với thực tế",
        "Giúp khóa tỷ giá quy đổi trong dài hạn, giảm rủi ro biến động tỷ giá"
      ]
    }
  ],
  "61": [
    {
      "fromDay": 56,
      "fromTitle": "Vì sao công ty lãi nhưng thiếu tiền?",
      "text": "Lợi nhuận kế toán ≠ tiền thực trong tay",
      "distractors": [
        "Nợ xấu: dùng để tiêu dùng hoặc mua tài sản kém hơn lãi vay",
        "Financial model: dự báo tài chính theo giả định"
      ]
    },
    {
      "fromDay": 49,
      "fromTitle": "Current Assets và Non-current Assets",
      "text": "Current assets: tiền mặt, AR, hàng tồn kho — thanh khoản trong 1 năm",
      "distractors": [
        "NI dương + FCF âm = cần điều tra sâu hơn",
        "Cash accounting: ghi nhận khi tiền thực sự vào/ra"
      ]
    }
  ],
  "62": [
    {
      "fromDay": 57,
      "fromTitle": "Vì sao công ty lỗ nhưng vẫn còn tiền?",
      "text": "Lỗ kế toán ≠ hết tiền — D&A và WC tạo ra sự khác biệt",
      "distractors": [
        "Phản ánh pricing power và hiệu quả sản xuất",
        "Chi phí: phí underwriter, compliance, mất quyền riêng tư"
      ]
    },
    {
      "fromDay": 50,
      "fromTitle": "Current và Long-term Liabilities",
      "text": "Nợ ≤ 12 tháng = current; > 12 tháng = long-term",
      "distractors": [
        "Strike price gần giá thị trường hơn → premium cao hơn (với option có lợi)",
        "Ổn định dòng tiền giúp lập kế hoạch tài chính và bảo vệ covenant vay nợ"
      ]
    }
  ],
  "63": [
    {
      "fromDay": 58,
      "fromTitle": "Free Cash Flow là gì?",
      "text": "FCF = OCF − CapEx",
      "distractors": [
        "ROIC > WACC → tạo value",
        "Trái phiếu cũng hữu ích để làm 'vùng đệm' giảm biến động cho cả danh mục, không nhất thiết phải chọn hoàn toàn một trong hai"
      ]
    },
    {
      "fromDay": 51,
      "fromTitle": "Shareholders' Equity gồm những gì?",
      "text": "Equity gồm: common stock, APIC, retained earnings, treasury stock",
      "distractors": [
        "Gross Profit đo hiệu quả sản xuất/kinh doanh cốt lõi",
        "Balance Sheet: vị thế tài chính tại một thời điểm"
      ]
    }
  ],
  "64": [
    {
      "fromDay": 59,
      "fromTitle": "Đọc báo cáo tài chính Apple/Vinamilk",
      "text": "Apple: OCF mạnh, FCF gần bằng OCF, buyback liên tục",
      "distractors": [
        "EBIT − Interest = EBT; EBT × (1−Tax) = Net Income",
        "Mục tiêu là sự ổn định và dự đoán được, không phải tối đa hóa lợi nhuận"
      ]
    },
    {
      "fromDay": 52,
      "fromTitle": "Cash Flow Statement là gì?",
      "text": "3 phần: Operating, Investing, Financing",
      "distractors": [
        "Đóng góp cốt lõi: chứng minh đa dạng hóa đúng cách có thể giảm rủi ro mà không giảm lợi nhuận kỳ vọng tương ứng",
        "Cổ tức tiền mặt chịu thuế TNCN riêng biệt 5% trên số tiền nhận được, khấu trừ tại nguồn"
      ]
    }
  ],
  "65": [
    {
      "fromDay": 60,
      "fromTitle": "Ôn tập: 3 báo cáo tài chính",
      "text": "3 báo cáo liên kết với nhau qua NI và tiền mặt",
      "distractors": [
        "ROIC = NOPAT / Invested Capital",
        "Thường bao gồm 'control premium', khiến bội số cao hơn Comps"
      ]
    },
    {
      "fromDay": 53,
      "fromTitle": "Operating Cash Flow là gì?",
      "text": "OCF = tiền thực từ kinh doanh, điều chỉnh từ Net Income",
      "distractors": [
        "Nhóm rủi ro và chi phí thực tế (Day 234-235): rủi ro tái đầu tư coupon, thuế thu nhập cá nhân 5% trên lãi trái phiếu doanh nghiệp",
        "In-the-money, at-the-money, out-of-the-money mô tả vị thế option so với giá thị trường"
      ]
    }
  ],
  "66": [
    {
      "fromDay": 61,
      "fromTitle": "Financial Ratios là gì?",
      "text": "Ratios chuẩn hóa số liệu để so sánh công bằng",
      "distractors": [
        "Ba quyết định: Đầu tư, Tài trợ, Cổ tức",
        "FCF: vay (+), trả nợ (−), phát hành CP (+), buyback (−), cổ tức (−)"
      ]
    },
    {
      "fromDay": 54,
      "fromTitle": "Investing Cash Flow là gì?",
      "text": "ICF âm = đang đầu tư vào tương lai (CapEx, M&A)",
      "distractors": [
        "Giá cổ phiếu chỉ là biểu hiện thị trường của quyền lợi kinh tế thực sự bên dưới",
        "Dùng đúng mục đích (hedging) rất hữu ích; dùng sai (đầu cơ đòn bẩy cao) rất nguy hiểm"
      ]
    }
  ],
  "67": [
    {
      "fromDay": 62,
      "fromTitle": "Gross Margin: Biên lợi nhuận gộp",
      "text": "Gross Margin = Gross Profit / Revenue",
      "distractors": [
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị",
        "Expected Return của danh mục = trung bình có trọng số theo tỷ trọng từng tài sản"
      ]
    },
    {
      "fromDay": 55,
      "fromTitle": "Financing Cash Flow là gì?",
      "text": "FCF: vay (+), trả nợ (−), phát hành CP (+), buyback (−), cổ tức (−)",
      "distractors": [
        "Quyết định mua và bán đều nên dựa trên phân tích nền tảng doanh nghiệp và kế hoạch đã đặt ra từ trước, không dựa trên biến động giá ngắn hạn hay cảm xúc nhất thời",
        "Thước đo nhanh để ước lượng quy mô một công ty niêm yết"
      ]
    }
  ],
  "68": [
    {
      "fromDay": 63,
      "fromTitle": "Operating Margin: Biên lợi nhuận hoạt động",
      "text": "Operating Margin = EBIT / Revenue",
      "distractors": [
        "Rating cao hơn thường đi kèm lãi suất thấp hơn (rủi ro thấp), rating thấp hơn đi kèm lãi suất cao hơn (rủi ro cao) — nhưng rating không phải bảo đảm tuyệt đối, chỉ là công cụ tham khảo",
        "Trái phiếu mang lại lợi suất thấp hơn nhưng ổn định và dự đoán được hơn nhiều — đây là lý do cả hai đều có vai trò riêng trong một danh mục đầu tư"
      ]
    },
    {
      "fromDay": 56,
      "fromTitle": "Vì sao công ty lãi nhưng thiếu tiền?",
      "text": "Lợi nhuận kế toán ≠ tiền thực trong tay",
      "distractors": [
        "Futures: chuẩn hóa, giao dịch qua sàn, có clearing house đảm bảo",
        "Ưu: đơn giản, phù hợp SME"
      ]
    }
  ],
  "69": [
    {
      "fromDay": 64,
      "fromTitle": "Net Profit Margin: Biên lợi nhuận ròng",
      "text": "Net Margin = Net Income / Revenue",
      "distractors": [
        "Phản ánh chi phí thực sự để mua đứt toàn bộ hoạt động kinh doanh của công ty",
        "Sở hữu cổ phiếu = sở hữu tỷ lệ tương ứng trong tài sản, lợi nhuận và quyền biểu quyết"
      ]
    },
    {
      "fromDay": 57,
      "fromTitle": "Vì sao công ty lỗ nhưng vẫn còn tiền?",
      "text": "Lỗ kế toán ≠ hết tiền — D&A và WC tạo ra sự khác biệt",
      "distractors": [
        "Futures: chuẩn hóa, giao dịch qua sàn, có clearing house đảm bảo",
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng"
      ]
    }
  ],
  "70": [
    {
      "fromDay": 65,
      "fromTitle": "ROA: Lợi nhuận trên tài sản",
      "text": "ROA = Net Income / Total Assets",
      "distractors": [
        "Thỏa thuận rõ ràng ngay từ đầu về việc có tính lãi hay không, tránh mập mờ dẫn đến hiểu lầm",
        "Đa dạng hóa không phải là 'mua càng nhiều mã càng tốt' mà là chọn các tài sản ít tương quan với nhau"
      ]
    },
    {
      "fromDay": 58,
      "fromTitle": "Free Cash Flow là gì?",
      "text": "FCF = OCF − CapEx",
      "distractors": [
        "Amazon là ví dụ kinh điển: lỗ kế toán nhưng OCF mạnh",
        "Hữu ích khi định giá công ty trong bối cảnh sáp nhập hoặc mua lại toàn bộ"
      ]
    }
  ],
  "71": [
    {
      "fromDay": 66,
      "fromTitle": "ROE: Lợi nhuận trên vốn chủ",
      "text": "ROE = Net Income / Equity — quan trọng nhất với cổ đông",
      "distractors": [
        "Với thị trường có xu hướng tăng dài hạn, đầu tư một lần thường có kỳ vọng lợi nhuận nhỉnh hơn về mặt thống kê, nhưng biến động mạnh hơn trong ngắn hạn",
        "Thường có phí quản lý cao hơn nếu là quỹ chủ động, do chi phí nghiên cứu và vận hành"
      ]
    },
    {
      "fromDay": 59,
      "fromTitle": "Đọc báo cáo tài chính Apple/Vinamilk",
      "text": "Apple: OCF mạnh, FCF gần bằng OCF, buyback liên tục",
      "distractors": [
        "Trung lập với cơ cấu vốn và chính sách khấu hao — phù hợp so sánh công ty có đòn bẩy khác nhau",
        "Sharpe Ratio: lợi nhuận thặng dư trên mỗi đơn vị rủi ro"
      ]
    }
  ],
  "72": [
    {
      "fromDay": 67,
      "fromTitle": "ROIC: Lợi nhuận trên vốn đầu tư",
      "text": "ROIC = NOPAT / Invested Capital",
      "distractors": [
        "3 phần: Operating, Investing, Financing",
        "Mọi quyết định dùng tiền đều có chi phí cơ hội"
      ]
    },
    {
      "fromDay": 60,
      "fromTitle": "Ôn tập: 3 báo cáo tài chính",
      "text": "3 báo cáo liên kết với nhau qua NI và tiền mặt",
      "distractors": [
        "OCF > NI bền vững = chất lượng lợi nhuận cao",
        "Mô hình Ponzi trả lãi người trước bằng tiền người sau, sụp đổ khi dòng tiền mới không đủ"
      ]
    }
  ],
  "73": [
    {
      "fromDay": 68,
      "fromTitle": "Current Ratio: Khả năng thanh toán ngắn hạn",
      "text": "Current Ratio = Current Assets / Current Liabilities",
      "distractors": [
        "Duration: đo độ nhạy giá với lãi suất",
        "Việt Nam có ba sàn giao dịch chính: HOSE, HNX và UPCoM, mỗi sàn có tiêu chuẩn niêm yết khác nhau"
      ]
    },
    {
      "fromDay": 61,
      "fromTitle": "Financial Ratios là gì?",
      "text": "Ratios chuẩn hóa số liệu để so sánh công bằng",
      "distractors": [
        "Thiên kiến 'chỉ thấy người thắng' (survivorship bias) khiến người mới dễ có kỳ vọng lợi nhuận bị thổi phồng so với thực tế",
        "Tài khoản tự quản (self-directed): nhà đầu tư tự nghiên cứu, tự đặt lệnh mua/bán, không mất phí quản lý hàng năm nhưng cần thời gian và kiến thức"
      ]
    }
  ],
  "74": [
    {
      "fromDay": 69,
      "fromTitle": "Quick Ratio: Thanh toán nhanh",
      "text": "Quick Ratio loại hàng tồn kho khỏi tài sản ngắn hạn",
      "distractors": [
        "Kế hoạch hưu trí cần tính bằng lợi nhuận THỰC (sau khi trừ lạm phát), không chỉ nhìn con số lợi nhuận danh nghĩa",
        "MM (no tax): cơ cấu vốn không quan trọng trong thị trường hoàn hảo"
      ]
    },
    {
      "fromDay": 62,
      "fromTitle": "Gross Margin: Biên lợi nhuận gộp",
      "text": "Gross Margin = Gross Profit / Revenue",
      "distractors": [
        "Contribution Margin = Revenue − Variable Costs",
        "Thuế TNCN khi bán chứng khoán niêm yết ở Việt Nam là 0,1% trên TỔNG GIÁ TRỊ BÁN mỗi lần giao dịch, không phải trên phần lợi nhuận như thuế lãi vốn kiểu Mỹ"
      ]
    }
  ],
  "75": [
    {
      "fromDay": 70,
      "fromTitle": "Debt-to-Equity: Nợ trên vốn chủ",
      "text": "D/E = Total Debt / Equity — đo đòn bẩy tài chính",
      "distractors": [
        "Cần tính chi tiêu theo giá trị hiện tại, sau đó điều chỉnh theo lạm phát dự kiến đến năm nghỉ hưu",
        "D&A cộng lại vì non-cash; tăng WC trừ đi vì tiêu tiền"
      ]
    },
    {
      "fromDay": 63,
      "fromTitle": "Operating Margin: Biên lợi nhuận hoạt động",
      "text": "Operating Margin = EBIT / Revenue",
      "distractors": [
        "Người nghỉ hưu đặc biệt dễ tổn thương trước lạm phát vì không còn thu nhập lương để bù đắp",
        "Comps: định giá dựa trên bội số của các công ty tương đồng đã niêm yết"
      ]
    }
  ],
  "76": [
    {
      "fromDay": 71,
      "fromTitle": "Interest Coverage: Khả năng trả lãi vay",
      "text": "Interest Coverage = EBIT / Interest Expense",
      "distractors": [
        "3 báo cáo liên kết với nhau qua NI và tiền mặt",
        "Đây là nguyên tắc nền tảng chi phối mọi quyết định phân bổ tài sản"
      ]
    },
    {
      "fromDay": 64,
      "fromTitle": "Net Profit Margin: Biên lợi nhuận ròng",
      "text": "Net Margin = Net Income / Revenue",
      "distractors": [
        "Người nghỉ hưu đặc biệt dễ tổn thương trước lạm phát vì không còn thu nhập lương để bù đắp",
        "Payback: đơn giản, đo thanh khoản — dùng như metric phụ"
      ]
    }
  ],
  "77": [
    {
      "fromDay": 72,
      "fromTitle": "Asset Turnover: Hiệu quả sử dụng tài sản",
      "text": "Asset Turnover = Revenue / Total Assets",
      "distractors": [
        "IPO là quá trình chuyển từ private sang public để huy động vốn lớn",
        "Không có công thức duy nhất đúng cho mọi cổ phiếu; phân tích cơ bản là kết hợp nhiều góc nhìn để ra quyết định có cơ sở hơn là đoán mò"
      ]
    },
    {
      "fromDay": 65,
      "fromTitle": "ROA: Lợi nhuận trên tài sản",
      "text": "ROA = Net Income / Total Assets",
      "distractors": [
        "Cổ phiếu, bất động sản và một số công cụ chuyên biệt có khả năng tăng trưởng theo hoặc vượt lạm phát trong dài hạn",
        "NPV = PV(dòng tiền) − Đầu tư ban đầu"
      ]
    }
  ],
  "78": [
    {
      "fromDay": 73,
      "fromTitle": "Inventory Turnover: Vòng quay hàng tồn kho",
      "text": "Inventory Turnover = COGS / Average Inventory",
      "distractors": [
        "Cần cân nhắc chi phí giao dịch và thuế phát sinh khi tái cân bằng, tránh làm quá thường xuyên",
        "Ba yếu tố cốt lõi của mọi trái phiếu: mệnh giá (số tiền gốc), lãi suất coupon (tỷ lệ lãi trả định kỳ), và kỳ hạn (thời gian đến khi đáo hạn)"
      ]
    },
    {
      "fromDay": 66,
      "fromTitle": "ROE: Lợi nhuận trên vốn chủ",
      "text": "ROE = Net Income / Equity — quan trọng nhất với cổ đông",
      "distractors": [
        "Đây là phép tính nền tảng để so sánh các phương án phân bổ tài sản khác nhau",
        "Expected Loss = PD × LGD"
      ]
    }
  ],
  "79": [
    {
      "fromDay": 74,
      "fromTitle": "Receivables Turnover: Vòng quay khoản phải thu",
      "text": "Receivables Turnover = Revenue / AR; DSO = 365 / Turnover",
      "distractors": [
        "Chỉ số tốt nhất để đánh giá chất lượng doanh nghiệp dài hạn",
        "Lựa chọn giữa active/passive và loại quỹ nên dựa trên hiểu biết thực sự về chi phí, rủi ro và mục tiêu cá nhân, không chỉ theo xu hướng"
      ]
    },
    {
      "fromDay": 67,
      "fromTitle": "ROIC: Lợi nhuận trên vốn đầu tư",
      "text": "ROIC = NOPAT / Invested Capital",
      "distractors": [
        "DCA không đảm bảo lợi nhuận cao hơn đầu tư một lần — mục tiêu chính là giảm rủi ro tâm lý và rủi ro mua đúng đỉnh",
        "Diversification, correlation và các thước đo risk-adjusted return là bộ công cụ cốt lõi"
      ]
    }
  ],
  "80": [
    {
      "fromDay": 75,
      "fromTitle": "Cash Conversion Cycle",
      "text": "CCC = DIO + DSO − DPO",
      "distractors": [
        "P/B = Giá cổ phiếu / Book Value per Share",
        "Tần suất hợp lý cho mục tiêu dài hạn (hưu trí, giáo dục con) là hàng tháng hoặc hàng quý"
      ]
    },
    {
      "fromDay": 68,
      "fromTitle": "Current Ratio: Khả năng thanh toán ngắn hạn",
      "text": "Current Ratio = Current Assets / Current Liabilities",
      "distractors": [
        "NPV > 0: tạo giá trị; NPV < 0: phá hủy giá trị",
        "OCF > NI bền vững = chất lượng lợi nhuận cao"
      ]
    }
  ],
  "81": [
    {
      "fromDay": 76,
      "fromTitle": "EPS: Lợi nhuận trên mỗi cổ phiếu",
      "text": "EPS = Net Income / Diluted Shares Outstanding",
      "distractors": [
        "Asset-light: turnover cao; Asset-heavy: turnover thấp",
        "Đây là biến số quan trọng nhất khi xây dựng danh mục, quan trọng hơn cả lợi nhuận kỳ vọng riêng lẻ của từng tài sản"
      ]
    },
    {
      "fromDay": 69,
      "fromTitle": "Quick Ratio: Thanh toán nhanh",
      "text": "Quick Ratio loại hàng tồn kho khỏi tài sản ngắn hạn",
      "distractors": [
        "Khắt khe và thực tế hơn Current Ratio",
        "Robo-advisor là dạng trung gian: quản lý tự động bằng thuật toán, chi phí thường thấp hơn quản lý truyền thống"
      ]
    }
  ],
  "82": [
    {
      "fromDay": 77,
      "fromTitle": "P/E Ratio là gì?",
      "text": "P/E = Price / EPS — trả bao nhiêu lần lợi nhuận",
      "distractors": [
        "Strike price gần giá thị trường hơn → premium cao hơn (với option có lợi)",
        "Mọi nguồn vốn đều có chi phí cơ hội"
      ]
    },
    {
      "fromDay": 70,
      "fromTitle": "Debt-to-Equity: Nợ trên vốn chủ",
      "text": "D/E = Total Debt / Equity — đo đòn bẩy tài chính",
      "distractors": [
        "Kế hoạch thừa kế cơ bản: danh sách tài sản rõ ràng, di chúc hợp lệ, thông tin liên hệ các tài khoản quan trọng",
        "Được ưa chuộng rộng rãi trong định giá M&A và so sánh xuyên ngành"
      ]
    }
  ],
  "83": [
    {
      "fromDay": 78,
      "fromTitle": "P/B Ratio là gì?",
      "text": "P/B = Market Cap / Book Value",
      "distractors": [
        "Nền tảng lý thuyết cho hầu hết các mô hình quản lý danh mục hiện đại",
        "CCC = DIO + DSO − DPO — đo hiệu quả quản lý vốn lưu động"
      ]
    },
    {
      "fromDay": 71,
      "fromTitle": "Interest Coverage: Khả năng trả lãi vay",
      "text": "Interest Coverage = EBIT / Interest Expense",
      "distractors": [
        "Không có di chúc, tài sản chia theo pháp luật (hàng thừa kế thứ nhất: vợ/chồng, cha mẹ, con) — không nhất thiết theo mong muốn thực sự của người mất",
        "Lãi suất là giá của tiền: tăng thì vay đắt hơn, tiết kiệm hấp dẫn hơn"
      ]
    }
  ],
  "84": [
    {
      "fromDay": 79,
      "fromTitle": "EV/EBITDA là gì?",
      "text": "EV/EBITDA trung lập với cơ cấu vốn và khấu hao",
      "distractors": [
        "3 factors: Supply/Demand, Inventory, Geopolitics",
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị"
      ]
    },
    {
      "fromDay": 72,
      "fromTitle": "Asset Turnover: Hiệu quả sử dụng tài sản",
      "text": "Asset Turnover = Revenue / Total Assets",
      "distractors": [
        "Rủi ro: không miễn phí, cần được định giá, đa dạng hóa loại bỏ rủi ro đặc thù",
        "Amazon là ví dụ kinh điển: lỗ kế toán nhưng OCF mạnh"
      ]
    }
  ],
  "85": [
    {
      "fromDay": 80,
      "fromTitle": "Ôn tập: Dùng chỉ số để so sánh doanh nghiệp",
      "text": "4 nhóm ratios: Profitability, Liquidity, Leverage, Valuation",
      "distractors": [
        "Tái cân bằng về bản chất là 'bán cao, mua thấp' có kỷ luật, ngược với bản năng tâm lý tự nhiên",
        "Expected Return = tổng (xác suất x kết quả) của mọi kịch bản"
      ]
    },
    {
      "fromDay": 73,
      "fromTitle": "Inventory Turnover: Vòng quay hàng tồn kho",
      "text": "Inventory Turnover = COGS / Average Inventory",
      "distractors": [
        "Tài sản khó chia đều (nhà đất) là nguyên nhân phổ biến nhất gây tranh chấp thừa kế kéo dài",
        "Giữ lại nếu ROIC > cost of capital"
      ]
    }
  ],
  "86": [
    {
      "fromDay": 81,
      "fromTitle": "Present Value: Giá trị hiện tại",
      "text": "PV = FV / (1+r)^n",
      "distractors": [
        "D/E = Total Debt / Equity — đo đòn bẩy tài chính",
        "Ba yếu tố cốt lõi của mọi trái phiếu: mệnh giá (số tiền gốc), lãi suất coupon (tỷ lệ lãi trả định kỳ), và kỳ hạn (thời gian đến khi đáo hạn)"
      ]
    },
    {
      "fromDay": 74,
      "fromTitle": "Receivables Turnover: Vòng quay khoản phải thu",
      "text": "Receivables Turnover = Revenue / AR; DSO = 365 / Turnover",
      "distractors": [
        "Cấu trúc phí '2 và 20' điển hình khiến chi phí đầu tư cao hơn nhiều so với quỹ thụ động",
        "NPV = PV(dòng tiền) − Đầu tư ban đầu"
      ]
    }
  ],
  "87": [
    {
      "fromDay": 82,
      "fromTitle": "Future Value: Giá trị tương lai",
      "text": "FV = PV × (1+r)^n",
      "distractors": [
        "Phân tích tài chính toàn diện kết nối bốn lớp: kế toán, định giá, rủi ro, thị trường",
        "Tiền mặt mất sức mua theo lạm phát; đầu tư để bảo tồn giá trị thực"
      ]
    },
    {
      "fromDay": 75,
      "fromTitle": "Cash Conversion Cycle",
      "text": "CCC = DIO + DSO − DPO",
      "distractors": [
        "Quy trình phân tích hoàn chỉnh: đọc báo cáo → tính chỉ số → định giá → đánh giá rủi ro → đối chiếu thị trường",
        "Quy tắc 72: số năm gấp đôi = 72 chia cho lãi suất"
      ]
    }
  ],
  "88": [
    {
      "fromDay": 83,
      "fromTitle": "Discount Rate: Tỷ lệ chiết khấu",
      "text": "Discount rate = chi phí cơ hội + phần bù rủi ro",
      "distractors": [
        "Đổi lại vốn huy động được, công ty đại chúng phải minh bạch thông tin tài chính định kỳ cho nhà đầu tư",
        "Mục tiêu hedging: giảm bất định, không phải tối đa hóa lợi nhuận"
      ]
    },
    {
      "fromDay": 76,
      "fromTitle": "EPS: Lợi nhuận trên mỗi cổ phiếu",
      "text": "EPS = Net Income / Diluted Shares Outstanding",
      "distractors": [
        "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau",
        "ROIC > Kd: đòn bẩy tốt; ROIC < Kd: đòn bẩy phá hủy giá trị"
      ]
    }
  ],
  "89": [
    {
      "fromDay": 84,
      "fromTitle": "Compounding: Lãi kép trong đầu tư",
      "text": "Compounding: lãi trên lãi trên lãi — hàm mũ",
      "distractors": [
        "Ratios chuẩn hóa số liệu để so sánh công bằng",
        "Standard deviation: công cụ toán học chính xác đo mức độ phân tán của lợi suất"
      ]
    },
    {
      "fromDay": 77,
      "fromTitle": "P/E Ratio là gì?",
      "text": "P/E = Price / EPS — trả bao nhiêu lần lợi nhuận",
      "distractors": [
        "Thời gian đầu tư quan trọng hơn số tiền đóng góp trong lãi kép dài hạn",
        "Càng gần thời điểm cần dùng đến tiền (nghỉ hưu, mua nhà, học phí con), tỷ trọng trái phiếu trong danh mục nên tăng lên tương ứng để giảm rủi ro mất vốn đúng lúc cần thiết"
      ]
    }
  ],
  "90": [
    {
      "fromDay": 85,
      "fromTitle": "Discounting: Kéo tiền tương lai về hiện tại",
      "text": "Discounting = compounding ngược lại",
      "distractors": [
        "Cost synergy dễ đạt hơn revenue synergy",
        "Đa dạng hóa không có nghĩa là mua thật nhiều mã ngẫu nhiên, mà là chọn các cổ phiếu/ngành có mức độ tương quan thấp với nhau để giảm rủi ro tổng thể hiệu quả"
      ]
    },
    {
      "fromDay": 78,
      "fromTitle": "P/B Ratio là gì?",
      "text": "P/B = Market Cap / Book Value",
      "distractors": [
        "CCC ngắn: vốn quay nhanh, cần ít tiền hơn",
        "Phổ biến trong định giá startup công nghệ giai đoạn tăng trưởng sớm"
      ]
    }
  ],
  "91": [
    {
      "fromDay": 86,
      "fromTitle": "Annuity: Dòng tiền đều",
      "text": "Annuity = chuỗi thanh toán đều trong thời gian cố định",
      "distractors": [
        "P/B thấp không tự động nghĩa là 'rẻ' — cần phân tích chất lượng tài sản và ROE đi kèm",
        "Municipal bond: tài trợ hạ tầng công cộng ở cấp địa phương"
      ]
    },
    {
      "fromDay": 79,
      "fromTitle": "EV/EBITDA là gì?",
      "text": "EV/EBITDA trung lập với cơ cấu vốn và khấu hao",
      "distractors": [
        "Rút ngắn CCC = giải phóng vốn lưu động",
        "Bảo hiểm nên được hiểu là công cụ CHUYỂN GIAO RỦI RO, không phải công cụ đầu tư sinh lời"
      ]
    }
  ],
  "92": [
    {
      "fromDay": 87,
      "fromTitle": "Perpetuity: Dòng tiền vĩnh viễn",
      "text": "PV Perpetuity = C / r",
      "distractors": [
        "Tiền là phương tiện trao đổi, có thanh khoản tuyệt đối",
        "WACC = discount rate, DCF = định giá bằng dòng tiền"
      ]
    },
    {
      "fromDay": 80,
      "fromTitle": "Ôn tập: Dùng chỉ số để so sánh doanh nghiệp",
      "text": "4 nhóm ratios: Profitability, Liquidity, Leverage, Valuation",
      "distractors": [
        "Giảm CCC = giải phóng vốn, cải thiện FCF",
        "Rủi ro: overpay, culture clash, synergy thực tế thấp hơn kỳ vọng"
      ]
    }
  ],
  "93": [
    {
      "fromDay": 88,
      "fromTitle": "NPV: Giá trị hiện tại ròng",
      "text": "NPV > 0: tạo giá trị; NPV < 0: phá hủy giá trị",
      "distractors": [
        "Spot vs Futures: contango vs backwardation",
        "Bốn công cụ phái sinh chính đều xoay quanh việc chuyển giao rủi ro có cấu trúc"
      ]
    },
    {
      "fromDay": 81,
      "fromTitle": "Present Value: Giá trị hiện tại",
      "text": "PV = FV / (1+r)^n",
      "distractors": [
        "Utility: beta thấp; Tech/Crypto: beta cao",
        "NPV = tiêu chí quyết định đầu tư tốt nhất"
      ]
    }
  ],
  "94": [
    {
      "fromDay": 89,
      "fromTitle": "IRR: Tỷ suất hoàn vốn nội bộ",
      "text": "IRR là discount rate làm NPV = 0",
      "distractors": [
        "Một tài sản 'rủi ro' đứng một mình có thể làm giảm rủi ro khi đặt đúng trong danh mục",
        "Tracking Error: đo mức độ lệch giữa lợi suất quỹ và benchmark nó theo dõi"
      ]
    },
    {
      "fromDay": 82,
      "fromTitle": "Future Value: Giá trị tương lai",
      "text": "FV = PV × (1+r)^n",
      "distractors": [
        "Tài sản = những gì doanh nghiệp sở hữu và kiểm soát",
        "Lợi nhuận cao + cam kết 'không rủi ro' là dấu hiệu cảnh báo lừa đảo rõ ràng nhất — nguyên tắc rủi ro-lợi nhuận không có ngoại lệ"
      ]
    }
  ],
  "95": [
    {
      "fromDay": 90,
      "fromTitle": "Payback Period: Thời gian hoàn vốn",
      "text": "Payback = Vốn đầu tư / Dòng tiền hàng năm",
      "distractors": [
        "Beta > 1: biến động mạnh hơn thị trường; Beta < 1: ổn định hơn thị trường",
        "Công thức đơn giản PV = FV / (1+r) cho thấy: r càng lớn, PV càng nhỏ — đây là nguồn gốc toán học của quy luật lãi suất và giá trái phiếu nghịch chiều"
      ]
    },
    {
      "fromDay": 83,
      "fromTitle": "Discount Rate: Tỷ lệ chiết khấu",
      "text": "Discount rate = chi phí cơ hội + phần bù rủi ro",
      "distractors": [
        "Sơ cấp: doanh nghiệp huy động vốn; thứ cấp: nhà đầu tư giao dịch lại",
        "Người còn trẻ, còn nhiều thời gian đầu tư, thường được khuyên ưu tiên cổ phiếu hơn để tận dụng tăng trưởng dài hạn, và tăng dần tỷ trọng trái phiếu khi lớn tuổi hơn"
      ]
    }
  ],
  "96": [
    {
      "fromDay": 91,
      "fromTitle": "Vì sao NPV tốt hơn Payback?",
      "text": "NPV > IRR > Payback về mặt lý thuyết tài chính",
      "distractors": [
        "Chi phí y tế có xu hướng tăng theo tuổi tác, nên cộng thêm một khoản dự phòng riêng cho y tế",
        "Đây là khung tham khảo, không phải luật cứng — điều chỉnh theo hoàn cảnh nhưng nên biết mình đang lệch ở đâu"
      ]
    },
    {
      "fromDay": 84,
      "fromTitle": "Compounding: Lãi kép trong đầu tư",
      "text": "Compounding: lãi trên lãi trên lãi — hàm mũ",
      "distractors": [
        "Duration cao hơn khuếch đại cả lãi và lỗ khi lãi suất biến động",
        "Thiên kiến 'chỉ thấy người thắng' (survivorship bias) khiến người mới dễ có kỳ vọng lợi nhuận bị thổi phồng so với thực tế"
      ]
    }
  ],
  "97": [
    {
      "fromDay": 92,
      "fromTitle": "Cost of Capital: Chi phí vốn",
      "text": "Mọi nguồn vốn đều có chi phí cơ hội",
      "distractors": [
        "Inventory tăng nhanh hơn revenue là warning signal",
        "Forward: hợp đồng riêng tư (OTC), khóa giá mua/bán trong tương lai"
      ]
    },
    {
      "fromDay": 85,
      "fromTitle": "Discounting: Kéo tiền tương lai về hiện tại",
      "text": "Discounting = compounding ngược lại",
      "distractors": [
        "Phản ánh pricing power và hiệu quả sản xuất",
        "Lãi kép: lãi sinh lãi, tạo hiệu ứng bóng tuyết theo thời gian"
      ]
    }
  ],
  "98": [
    {
      "fromDay": 93,
      "fromTitle": "WACC là gì?",
      "text": "WACC = Ke×(E/V) + Kd×(1−T)×(D/V)",
      "distractors": [
        "P/E: giá phải trả cho mỗi đồng lợi nhuận — thấp hơn nghĩa là rẻ hơn tương đối, nhưng cần so cùng ngành",
        "Trái phiếu Chính phủ và một số công cụ nợ Nhà nước có thể có quy định thuế ưu đãi riêng — nên kiểm tra văn bản hướng dẫn hiện hành thay vì áp dụng chung một mức thuế cho mọi loại trái phiếu"
      ]
    },
    {
      "fromDay": 86,
      "fromTitle": "Annuity: Dòng tiền đều",
      "text": "Annuity = chuỗi thanh toán đều trong thời gian cố định",
      "distractors": [
        "Nợ trả từ FCF của công ty mục tiêu",
        "Hàng tồn kho là vốn bị kẹt — cần quản lý chặt"
      ]
    }
  ],
  "99": [
    {
      "fromDay": 94,
      "fromTitle": "Cost of Debt: Chi phí nợ",
      "text": "Cost of Debt after-tax = Lãi suất × (1 − Thuế suất)",
      "distractors": [
        "Tần suất hợp lý cho mục tiêu dài hạn (hưu trí, giáo dục con) là hàng tháng hoặc hàng quý",
        "Thiên kiến xác nhận khiến nhà đầu tư chỉ tìm thông tin ủng hộ quyết định đã có, bỏ qua tín hiệu cảnh báo"
      ]
    },
    {
      "fromDay": 87,
      "fromTitle": "Perpetuity: Dòng tiền vĩnh viễn",
      "text": "PV Perpetuity = C / r",
      "distractors": [
        "Thực hành định giá chuyên nghiệp luôn kết hợp nhiều phương pháp, không chỉ dựa vào một con số",
        "Vay làm giàu khi ROI đầu tư lớn hơn lãi suất vay (spread dương)"
      ]
    }
  ],
  "100": [
    {
      "fromDay": 95,
      "fromTitle": "Cost of Equity: Chi phí vốn chủ",
      "text": "Cost of Equity > Cost of Debt — cổ đông chịu rủi ro cao hơn",
      "distractors": [
        "Không có công thức duy nhất đúng cho mọi cổ phiếu; phân tích cơ bản là kết hợp nhiều góc nhìn để ra quyết định có cơ sở hơn là đoán mò",
        "Cần tính chi tiêu theo giá trị hiện tại, sau đó điều chỉnh theo lạm phát dự kiến đến năm nghỉ hưu"
      ]
    },
    {
      "fromDay": 88,
      "fromTitle": "NPV: Giá trị hiện tại ròng",
      "text": "NPV > 0: tạo giá trị; NPV < 0: phá hủy giá trị",
      "distractors": [
        "Việc tái cơ cấu danh mục diễn ra tự động theo công thức, không dựa vào phán đoán chủ quan của con người",
        "Liquidity premium: tài sản kém thanh khoản phải trả lợi suất cao hơn"
      ]
    }
  ],
  "101": [
    {
      "fromDay": 96,
      "fromTitle": "Beta là gì trong tài chính?",
      "text": "Beta = độ biến động tương đối so với thị trường",
      "distractors": [
        "MPT: nền tảng toán học để xây dựng danh mục tối ưu dựa trên return, risk, correlation",
        "Trái phiếu vận hành trên hai trục: giá trị thời gian của tiền và niềm tin tín dụng"
      ]
    },
    {
      "fromDay": 89,
      "fromTitle": "IRR: Tỷ suất hoàn vốn nội bộ",
      "text": "IRR là discount rate làm NPV = 0",
      "distractors": [
        "Lãi = Giá thị trường − Strike price − Premium (nếu thực hiện quyền)",
        "Có thể dùng đòn bẩy cao, bán khống, phái sinh phức tạp để tạo Alpha"
      ]
    }
  ],
  "102": [
    {
      "fromDay": 97,
      "fromTitle": "CAPM là gì?",
      "text": "CAPM: Ke = Rf + β(Rm − Rf)",
      "distractors": [
        "Expiration date xa hơn → premium cao hơn (nhiều thời gian biến động hơn)",
        "Rủi ro: overpay, culture clash, synergy thực tế thấp hơn kỳ vọng"
      ]
    },
    {
      "fromDay": 90,
      "fromTitle": "Payback Period: Thời gian hoàn vốn",
      "text": "Payback = Vốn đầu tư / Dòng tiền hàng năm",
      "distractors": [
        "Operating margin = EBIT / Revenue",
        "Market Risk Premium = Rm − Rf ≈ 5-7% lịch sử"
      ]
    }
  ],
  "103": [
    {
      "fromDay": 98,
      "fromTitle": "Risk-Free Rate và Market Risk Premium",
      "text": "Risk-free rate = T-bill Mỹ hoặc trái phiếu chính phủ dài hạn",
      "distractors": [
        "Cách khắc phục thực tế: chủ động tìm kiếm quan điểm trái chiều trước khi ra quyết định, không chỉ tin vào điều mình muốn tin",
        "Tính trước chi phí lãi vay, chiết khấu bằng WACC"
      ]
    },
    {
      "fromDay": 91,
      "fromTitle": "Vì sao NPV tốt hơn Payback?",
      "text": "NPV > IRR > Payback về mặt lý thuyết tài chính",
      "distractors": [
        "Khác ETF ở cơ chế giao dịch — không mua bán liên tục trong phiên",
        "Ba yếu tố cốt lõi của mọi trái phiếu: mệnh giá (số tiền gốc), lãi suất coupon (tỷ lệ lãi trả định kỳ), và kỳ hạn (thời gian đến khi đáo hạn)"
      ]
    }
  ],
  "104": [
    {
      "fromDay": 99,
      "fromTitle": "Tính NPV một dự án đơn giản",
      "text": "NPV = PV(dòng tiền) − Đầu tư ban đầu",
      "distractors": [
        "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác",
        "Retained earnings âm = accumulated deficit — lỗ tích lũy"
      ]
    },
    {
      "fromDay": 92,
      "fromTitle": "Cost of Capital: Chi phí vốn",
      "text": "Mọi nguồn vốn đều có chi phí cơ hội",
      "distractors": [
        "Đòn bẩy cao khiến speculation bằng phái sinh rủi ro hơn nhiều so với giao dịch tài sản cơ sở trực tiếp",
        "Vụ Silicon Valley Bank năm 2023 là bài học thực tế: nắm giữ quá nhiều trái phiếu dài hạn mà không tính đến khả năng cần thanh khoản gấp có thể dẫn đến thiệt hại lớn khi lãi suất biến động mạnh"
      ]
    }
  ],
  "105": [
    {
      "fromDay": 100,
      "fromTitle": "Ôn tập: Giá trị thời gian của tiền",
      "text": "TVM: 1 đồng hôm nay > 1 đồng tương lai",
      "distractors": [
        "Bốn công cụ phái sinh chính đều xoay quanh việc chuyển giao rủi ro có cấu trúc",
        "Hedge fund: quỹ tư nhân linh hoạt, ít bị ràng buộc quy định hơn mutual fund/ETF"
      ]
    },
    {
      "fromDay": 93,
      "fromTitle": "WACC là gì?",
      "text": "WACC = Ke×(E/V) + Kd×(1−T)×(D/V)",
      "distractors": [
        "IRR là discount rate làm NPV = 0",
        "Gordon Growth Method: Terminal Value = FCF cuối × (1+g) / (WACC − g)"
      ]
    }
  ],
  "106": [
    {
      "fromDay": 101,
      "fromTitle": "Corporate Finance là gì?",
      "text": "Ba quyết định: Đầu tư, Tài trợ, Cổ tức",
      "distractors": [
        "Tình huống phức tạp, một lần, hậu quả lớn (thuế, thừa kế, quyết định tài chính lớn) là lúc nên cân nhắc tư vấn chuyên nghiệp",
        "Put option: quyền bán ở strike price, có lợi khi giá giảm"
      ]
    },
    {
      "fromDay": 94,
      "fromTitle": "Cost of Debt: Chi phí nợ",
      "text": "Cost of Debt after-tax = Lãi suất × (1 − Thuế suất)",
      "distractors": [
        "NPV > 0 là tiêu chí chính để chấp nhận dự án",
        "Người mới nên bắt đầu bằng việc hiểu công ty mình sở hữu đang làm gì, trước khi quan tâm đến biến động giá ngắn hạn"
      ]
    }
  ],
  "107": [
    {
      "fromDay": 102,
      "fromTitle": "Cơ cấu vốn (Capital Structure)",
      "text": "Cơ cấu vốn = tỷ lệ Nợ / Vốn chủ",
      "distractors": [
        "Cần tính chi tiêu theo giá trị hiện tại, sau đó điều chỉnh theo lạm phát dự kiến đến năm nghỉ hưu",
        "CAPM: Ke = Rf + β(Rm − Rf)"
      ]
    },
    {
      "fromDay": 95,
      "fromTitle": "Cost of Equity: Chi phí vốn chủ",
      "text": "Cost of Equity > Cost of Debt — cổ đông chịu rủi ro cao hơn",
      "distractors": [
        "ROE đo hiệu quả sinh lời trên phần vốn này",
        "Market Risk Premium = Rm − Rf (~5-7% lịch sử Mỹ)"
      ]
    }
  ],
  "108": [
    {
      "fromDay": 103,
      "fromTitle": "Nợ có lợi ích gì cho doanh nghiệp?",
      "text": "Tax shield = Lãi vay × Thuế suất",
      "distractors": [
        "Ngành tăng trưởng cao có EV/EBITDA cao hơn",
        "Yield curve là bản đồ tổng hợp kỳ vọng của toàn thị trường về tương lai kinh tế"
      ]
    },
    {
      "fromDay": 96,
      "fromTitle": "Beta là gì trong tài chính?",
      "text": "Beta = độ biến động tương đối so với thị trường",
      "distractors": [
        "Trái phiếu lãi thả nổi (floating rate): coupon = lãi suất tham chiếu + biên độ cố định, điều chỉnh định kỳ theo thị trường",
        "Tăng lãi: thắt chặt; Giảm lãi: nới lỏng"
      ]
    }
  ],
  "109": [
    {
      "fromDay": 104,
      "fromTitle": "Đòn bẩy tài chính (Financial Leverage)",
      "text": "Đòn bẩy khuếch đại cả lợi nhuận lẫn rủi ro",
      "distractors": [
        "WACC tăng → định giá giảm → cổ phiếu rủi ro",
        "Cơ cấu vốn = tỷ lệ Nợ / Vốn chủ"
      ]
    },
    {
      "fromDay": 97,
      "fromTitle": "CAPM là gì?",
      "text": "CAPM: Ke = Rf + β(Rm − Rf)",
      "distractors": [
        "Bốn loại chính: Forward, Futures, Options, Swaps",
        "Giá cổ phiếu một mình không nói lên gì về độ rẻ/đắt; P/E (giá chia lợi nhuận mỗi cổ phiếu) mới là thước đo so sánh công bằng hơn"
      ]
    }
  ],
  "110": [
    {
      "fromDay": 105,
      "fromTitle": "Lý thuyết Modigliani-Miller",
      "text": "MM (no tax): cơ cấu vốn không quan trọng trong thị trường hoàn hảo",
      "distractors": [
        "Nhà đang ở là khoản chi tiêu cho nhu cầu ở, không phải khoản đầu tư tạo dòng tiền — dù giá trị có thể tăng theo thời gian",
        "Assets = Liabilities + Equity — luôn luôn cân bằng"
      ]
    },
    {
      "fromDay": 98,
      "fromTitle": "Risk-Free Rate và Market Risk Premium",
      "text": "Risk-free rate = T-bill Mỹ hoặc trái phiếu chính phủ dài hạn",
      "distractors": [
        "Hạn chế: kế thừa sai lệch nếu cả ngành/thị trường đang bị định giá sai một cách hệ thống",
        "Tài sản ròng = Tổng tài sản − Tổng nợ; phải liệt kê ĐẦY ĐỦ cả hai vế, kể cả nợ 'mềm' (thẻ tín dụng, vay người thân, trả góp)"
      ]
    }
  ],
  "111": [
    {
      "fromDay": 106,
      "fromTitle": "Chính sách cổ tức",
      "text": "Giữ lại nếu ROIC > cost of capital",
      "distractors": [
        "Giá trị lớn nhất của hành trình là thói quen ra quyết định tài chính có kỷ luật, áp dụng và điều chỉnh liên tục suốt đời",
        "Nếu nhóm thiết yếu vượt 50%, ưu tiên xử lý chi phí cố định trước khi cắt giảm các khoản khác"
      ]
    },
    {
      "fromDay": 99,
      "fromTitle": "Tính NPV một dự án đơn giản",
      "text": "NPV = PV(dòng tiền) − Đầu tư ban đầu",
      "distractors": [
        "Cùng một vật có thể là tài sản hoặc tiêu sản tùy cách dùng",
        "CAPM: Ke = Rf + β × (Rm − Rf)"
      ]
    }
  ],
  "112": [
    {
      "fromDay": 107,
      "fromTitle": "Mua lại cổ phiếu (Share Buyback)",
      "text": "Buyback = giảm shares outstanding → EPS tăng",
      "distractors": [
        "Đa dạng hóa qua quỹ giúp giảm rủi ro tập trung so với mua trực tiếp trái phiếu của một công ty duy nhất",
        "Đây là con số tham khảo ban đầu, nên rà soát và điều chỉnh định kỳ theo thay đổi thu nhập, chi tiêu và mục tiêu sống thực tế"
      ]
    },
    {
      "fromDay": 100,
      "fromTitle": "Ôn tập: Giá trị thời gian của tiền",
      "text": "TVM: 1 đồng hôm nay > 1 đồng tương lai",
      "distractors": [
        "Chỉ số tốt nhất để đánh giá chất lượng doanh nghiệp dài hạn",
        "Gross Profit đo hiệu quả sản xuất/kinh doanh cốt lõi"
      ]
    }
  ],
  "113": [
    {
      "fromDay": 108,
      "fromTitle": "M&A là gì?",
      "text": "Merger: hợp nhất bình đẳng; Acquisition: mua và kiểm soát",
      "distractors": [
        "Độ chính xác phụ thuộc rất nhiều vào chất lượng giả định dự báo dòng tiền và tỷ lệ chiết khấu",
        "Tracking Error: đo mức độ lệch giữa lợi suất quỹ và benchmark nó theo dõi"
      ]
    },
    {
      "fromDay": 101,
      "fromTitle": "Corporate Finance là gì?",
      "text": "Ba quyết định: Đầu tư, Tài trợ, Cổ tức",
      "distractors": [
        "Thuế chứng khoán Việt Nam (0,1% trên giá trị bán) và các loại phí (giao dịch, quản lý quỹ) đều là chi phí thực tế cần tính vào lợi nhuận ròng, dù dễ bị bỏ qua",
        "Quyết định cơ bản (ngân sách, quỹ khẩn cấp, đầu tư định kỳ) hoàn toàn có thể tự làm sau khi học đủ nền tảng"
      ]
    }
  ],
  "114": [
    {
      "fromDay": 109,
      "fromTitle": "Synergy trong M&A",
      "text": "Cost synergy dễ đạt hơn revenue synergy",
      "distractors": [
        "Phù hợp nhất với ngân hàng, bảo hiểm, BĐS",
        "Dùng cho: DCF, LBO, M&A, budgeting"
      ]
    },
    {
      "fromDay": 102,
      "fromTitle": "Cơ cấu vốn (Capital Structure)",
      "text": "Cơ cấu vốn = tỷ lệ Nợ / Vốn chủ",
      "distractors": [
        "Hạn chế: beta thay đổi, thị trường không hoàn hảo",
        "Technical default có thể xảy ra chỉ vì vi phạm covenant"
      ]
    }
  ],
  "115": [
    {
      "fromDay": 110,
      "fromTitle": "IPO là gì?",
      "text": "IPO = lần đầu bán cổ phiếu ra công chúng",
      "distractors": [
        "Doanh nghiệp tối ưu lợi nhuận và giá trị cổ đông",
        "Diversification, correlation và các thước đo risk-adjusted return là bộ công cụ cốt lõi"
      ]
    },
    {
      "fromDay": 103,
      "fromTitle": "Nợ có lợi ích gì cho doanh nghiệp?",
      "text": "Tax shield = Lãi vay × Thuế suất",
      "distractors": [
        "Nợ rẻ hơn vốn chủ sau điều chỉnh thuế",
        "Thỏa thuận rõ ràng ngay từ đầu về việc có tính lãi hay không, tránh mập mờ dẫn đến hiểu lầm"
      ]
    }
  ],
  "116": [
    {
      "fromDay": 111,
      "fromTitle": "Unit Economics",
      "text": "LTV/CAC ≥ 3: mô hình kinh doanh khả thi",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Phù hợp nhất với ngân hàng, bảo hiểm, BĐS"
      ]
    },
    {
      "fromDay": 104,
      "fromTitle": "Đòn bẩy tài chính (Financial Leverage)",
      "text": "Đòn bẩy khuếch đại cả lợi nhuận lẫn rủi ro",
      "distractors": [
        "Lãi = Giá thị trường − Strike price − Premium (nếu thực hiện quyền)",
        "Lãi suất thực ≈ Lãi suất danh nghĩa − Lạm phát"
      ]
    }
  ],
  "117": [
    {
      "fromDay": 112,
      "fromTitle": "Quản lý vốn lưu động",
      "text": "Working Capital = Current Assets − Current Liabilities",
      "distractors": [
        "Giá thị trường phản ánh kỳ vọng tổng hợp của tất cả người tham gia",
        "Tax shield = Lãi vay × Thuế suất"
      ]
    },
    {
      "fromDay": 105,
      "fromTitle": "Lý thuyết Modigliani-Miller",
      "text": "MM (no tax): cơ cấu vốn không quan trọng trong thị trường hoàn hảo",
      "distractors": [
        "ICF dương = bán tài sản hoặc thu hồi đầu tư",
        "Thứ tự ưu tiên phá sản quan trọng với risk/return"
      ]
    }
  ],
  "118": [
    {
      "fromDay": 113,
      "fromTitle": "Cash Conversion Cycle (CCC)",
      "text": "CCC = DSO + DIO − DPO",
      "distractors": [
        "So sánh trong cùng ngành và cùng thời kỳ",
        "Yield curve là bản đồ tổng hợp kỳ vọng của toàn thị trường về tương lai kinh tế"
      ]
    },
    {
      "fromDay": 106,
      "fromTitle": "Chính sách cổ tức",
      "text": "Giữ lại nếu ROIC > cost of capital",
      "distractors": [
        "Vụ Tân Hoàng Minh và Vạn Thịnh Phát năm 2022 là bài học đắt giá: lãi suất hấp dẫn bất thường luôn đi kèm rủi ro tương ứng, không nên mua trái phiếu chỉ vì tin lời tư vấn mà bỏ qua thẩm định",
        "Rating thấp → lãi suất cao (credit spread)"
      ]
    }
  ],
  "119": [
    {
      "fromDay": 114,
      "fromTitle": "CapEx vs OpEx",
      "text": "CapEx: tài sản dài hạn, khấu hao dần",
      "distractors": [
        "CCC ngắn: vốn quay nhanh, cần ít tiền hơn",
        "Quỹ khẩn cấp = 3-6 tháng chi tiêu thiết yếu (6-12 tháng nếu thu nhập thất thường), để ở kênh rút được trong 1-2 ngày"
      ]
    },
    {
      "fromDay": 107,
      "fromTitle": "Mua lại cổ phiếu (Share Buyback)",
      "text": "Buyback = giảm shares outstanding → EPS tăng",
      "distractors": [
        "Tài sản tạo dòng tiền dương; tiêu sản tạo dòng tiền âm",
        "P&L đi từ Revenue xuống Net Income"
      ]
    }
  ],
  "120": [
    {
      "fromDay": 115,
      "fromTitle": "Burn Rate và Runway",
      "text": "Runway = Cash ÷ Net Burn Rate",
      "distractors": [
        "Thường có phí quản lý cao hơn nếu là quỹ chủ động, do chi phí nghiên cứu và vận hành",
        "Điều kiện: phải có underlying exposure thực tế cần bảo vệ"
      ]
    },
    {
      "fromDay": 108,
      "fromTitle": "M&A là gì?",
      "text": "Merger: hợp nhất bình đẳng; Acquisition: mua và kiểm soát",
      "distractors": [
        "Trước khi phân bổ vốn vào trái phiếu, cần xác định rõ mục tiêu sử dụng tiền, thời điểm cần dùng, và mức độ chấp nhận rủi ro",
        "Trên thế giới có S&P, Moody's, Fitch; tại Việt Nam có FiinRatings và VIS Rating đánh giá doanh nghiệp trong nước"
      ]
    }
  ],
  "121": [
    {
      "fromDay": 116,
      "fromTitle": "Financial Model là gì?",
      "text": "Financial model: dự báo tài chính theo giả định",
      "distractors": [
        "Tài sản vô hình cũng có khấu hao (amortization)",
        "Recovery rate: secured ~50-60%, unsecured ~30-40%"
      ]
    },
    {
      "fromDay": 109,
      "fromTitle": "Synergy trong M&A",
      "text": "Cost synergy dễ đạt hơn revenue synergy",
      "distractors": [
        "Rút ngắn CCC = giải phóng vốn lưu động",
        "Năng lực thực sự là khả năng nhìn thấy mối liên kết giữa các lớp, không chỉ thuộc từng công thức riêng lẻ"
      ]
    }
  ],
  "122": [
    {
      "fromDay": 117,
      "fromTitle": "LBO là gì?",
      "text": "LBO: mua công ty với 60-80% nợ",
      "distractors": [
        "So sánh trong cùng ngành và cùng thời kỳ",
        "Kế hoạch hưu trí cần tính bằng lợi nhuận THỰC (sau khi trừ lạm phát), không chỉ nhìn con số lợi nhuận danh nghĩa"
      ]
    },
    {
      "fromDay": 110,
      "fromTitle": "IPO là gì?",
      "text": "IPO = lần đầu bán cổ phiếu ra công chúng",
      "distractors": [
        "Phân loại phổ biến: large-cap, mid-cap, small-cap dựa trên Market Cap",
        "Technical default có thể xảy ra chỉ vì vi phạm covenant"
      ]
    }
  ],
  "123": [
    {
      "fromDay": 118,
      "fromTitle": "Venture Capital là gì?",
      "text": "VC: đầu tư mạo hiểm, chấp nhận rủi ro cao",
      "distractors": [
        "Nguyên tắc này tự động phát hiện nhiều loại sai sót",
        "DIO = 365 / Turnover — số ngày trung bình để bán hết hàng"
      ]
    },
    {
      "fromDay": 111,
      "fromTitle": "Unit Economics",
      "text": "LTV/CAC ≥ 3: mô hình kinh doanh khả thi",
      "distractors": [
        "Tăng DSO đột biến = cần điều tra chất lượng doanh thu",
        "Là phương pháp định giá tuyệt đối, độc lập với định giá thị trường của công ty khác"
      ]
    }
  ],
  "124": [
    {
      "fromDay": 119,
      "fromTitle": "Private Equity là gì?",
      "text": "PE: mua công ty trưởng thành, tái cơ cấu, exit sau 5-7 năm",
      "distractors": [
        "Trái phiếu lãi thả nổi (floating rate): coupon = lãi suất tham chiếu + biên độ cố định, điều chỉnh định kỳ theo thị trường",
        "Default: vi phạm nghĩa vụ trả nợ, không nhất thiết là phá sản"
      ]
    },
    {
      "fromDay": 112,
      "fromTitle": "Quản lý vốn lưu động",
      "text": "Working Capital = Current Assets − Current Liabilities",
      "distractors": [
        "Lợi nhuận kế toán ≠ tiền thực trong tay",
        "Equity gồm: common stock, APIC, retained earnings, treasury stock"
      ]
    }
  ],
  "125": [
    {
      "fromDay": 120,
      "fromTitle": "Ôn tập: Tài chính doanh nghiệp",
      "text": "Ba quyết định: Đầu tư, Tài trợ, Phân phối",
      "distractors": [
        "Portfolio: tập hợp tài sản được quản lý như một thể thống nhất",
        "Đây chỉ là điểm khởi đầu tham khảo, cần điều chỉnh theo khả năng chịu rủi ro và mục tiêu cá nhân"
      ]
    },
    {
      "fromDay": 113,
      "fromTitle": "Cash Conversion Cycle (CCC)",
      "text": "CCC = DSO + DIO − DPO",
      "distractors": [
        "Tài sản khó chia đều (nhà đất) là nguyên nhân phổ biến nhất gây tranh chấp thừa kế kéo dài",
        "Thực hiện định kỳ (thường 6-12 tháng một lần) hoặc khi tỷ trọng lệch quá một ngưỡng nhất định (ví dụ 5-10%)"
      ]
    }
  ],
  "126": [
    {
      "fromDay": 121,
      "fromTitle": "Cổ phiếu là gì?",
      "text": "Cổ phiếu: chứng nhận quyền sở hữu một phần doanh nghiệp",
      "distractors": [
        "Avalanche (theo lãi suất cao → thấp) tối ưu về tiền; Snowball (theo số dư nhỏ → lớn) tối ưu về động lực — chọn theo con người thật của bạn",
        "Chi phí y tế có xu hướng tăng theo tuổi tác, nên cộng thêm một khoản dự phòng riêng cho y tế"
      ]
    },
    {
      "fromDay": 114,
      "fromTitle": "CapEx vs OpEx",
      "text": "CapEx: tài sản dài hạn, khấu hao dần",
      "distractors": [
        "DuPont phân tích: Margin × Turnover × Leverage",
        "Cả hai phương pháp đều yêu cầu: trả tối thiểu mọi khoản khác, dồn phần dư vào khoản ưu tiên"
      ]
    }
  ],
  "127": [
    {
      "fromDay": 122,
      "fromTitle": "Khi mua cổ phiếu, thực chất mình sở hữu gì?",
      "text": "Sở hữu cổ phiếu = sở hữu tỷ lệ tương ứng trong tài sản, lợi nhuận và quyền biểu quyết",
      "distractors": [
        "Theo dõi OCF, không chỉ Net Income",
        "Kỳ vọng thực tế giúp lập kế hoạch tiết kiệm/đầu tư hợp lý và tránh rủi ro quá mức khi chạy theo lợi nhuận phi thực tế"
      ]
    },
    {
      "fromDay": 115,
      "fromTitle": "Burn Rate và Runway",
      "text": "Runway = Cash ÷ Net Burn Rate",
      "distractors": [
        "Thời gian tăng trưởng, không phải thời gian đóng tiền, quyết định kết quả",
        "Spot vs Futures: contango vs backwardation"
      ]
    }
  ],
  "128": [
    {
      "fromDay": 123,
      "fromTitle": "Giá cổ phiếu và giá trị doanh nghiệp khác nhau thế nào?",
      "text": "Giá cổ phiếu (price): kết quả cung-cầu tức thời, có thể lệch khỏi giá trị thực",
      "distractors": [
        "Tái cân bằng vô tình tạo kỷ luật 'bán cao, mua thấp' một cách tự động, không cần dự đoán thị trường",
        "Standard deviation: công cụ toán học chính xác đo mức độ phân tán của lợi suất"
      ]
    },
    {
      "fromDay": 116,
      "fromTitle": "Financial Model là gì?",
      "text": "Financial model: dự báo tài chính theo giả định",
      "distractors": [
        "Kết hợp nhiều ratios — một ratios không đủ để ra quyết định",
        "Tax shield làm debt rẻ hơn lãi suất danh nghĩa"
      ]
    }
  ],
  "129": [
    {
      "fromDay": 124,
      "fromTitle": "Market Cap là gì?",
      "text": "Market Cap = Giá cổ phiếu × Số lượng cổ phiếu đang lưu hành",
      "distractors": [
        "DTI: theo dõi tỷ lệ nợ/thu nhập để giữ sức khỏe tài chính",
        "FV = PV × (1+r)^n"
      ]
    },
    {
      "fromDay": 117,
      "fromTitle": "LBO là gì?",
      "text": "LBO: mua công ty với 60-80% nợ",
      "distractors": [
        "ROE: hiệu quả dùng vốn cổ đông để tạo lợi nhuận — càng cao càng tốt trong cùng ngành",
        "Là một trong những đầu vào quan trọng nhất của mọi mô hình quản trị rủi ro danh mục"
      ]
    }
  ],
  "130": [
    {
      "fromDay": 125,
      "fromTitle": "Enterprise Value là gì?",
      "text": "Enterprise Value = Market Cap + Nợ − Tiền mặt",
      "distractors": [
        "Dùng cho Terminal Value trong DCF — nhạy cảm với giả định g",
        "Option hoạt động như một dạng bảo hiểm tài chính có thể định giá được"
      ]
    },
    {
      "fromDay": 118,
      "fromTitle": "Venture Capital là gì?",
      "text": "VC: đầu tư mạo hiểm, chấp nhận rủi ro cao",
      "distractors": [
        "ROIC < WACC: tăng trưởng phá hủy value",
        "Cash accounting: ghi nhận khi tiền thực sự vào/ra"
      ]
    }
  ],
  "131": [
    {
      "fromDay": 126,
      "fromTitle": "Equity Value vs Enterprise Value",
      "text": "Equity Value: giá trị dành cho cổ đông; Enterprise Value: giá trị toàn bộ doanh nghiệp",
      "distractors": [
        "Nếu không chắc có nên cho vay hay không, thử tự hỏi: 'Nếu mất số tiền này, mối quan hệ có còn nguyên vẹn không?'",
        "Audit là bước đầu tiên bắt buộc — không có nó, mọi kế hoạch tài chính sau đều thiếu cơ sở"
      ]
    },
    {
      "fromDay": 119,
      "fromTitle": "Private Equity là gì?",
      "text": "PE: mua công ty trưởng thành, tái cơ cấu, exit sau 5-7 năm",
      "distractors": [
        "Là phương pháp định giá tuyệt đối, độc lập với định giá thị trường của công ty khác",
        "Multiple phổ biến nhất trong M&A"
      ]
    }
  ],
  "132": [
    {
      "fromDay": 127,
      "fromTitle": "P/E dùng khi nào?",
      "text": "P/E = Giá cổ phiếu / EPS, phù hợp nhất với công ty lợi nhuận dương và ổn định",
      "distractors": [
        "Runway = Cash ÷ Net Burn Rate",
        "Đa dạng hóa qua nhiều loại tài sản, ngành, và loại hình đầu tư giúp giảm biến động của tài sản tổng thể"
      ]
    },
    {
      "fromDay": 120,
      "fromTitle": "Ôn tập: Tài chính doanh nghiệp",
      "text": "Ba quyết định: Đầu tư, Tài trợ, Phân phối",
      "distractors": [
        "ROIC = NOPAT / (Debt + Equity − Cash)",
        "Ở nhiều nước khác (như Mỹ với 401k, IRA) khái niệm 'tài khoản hưu trí có ưu đãi thuế' tồn tại dưới hình thức khác, nhưng nguyên lý chung là khuyến khích tiết kiệm dài hạn cho tuổi già bằng ưu đãi thuế"
      ]
    }
  ],
  "133": [
    {
      "fromDay": 128,
      "fromTitle": "P/B dùng khi nào?",
      "text": "P/B = Giá cổ phiếu / Book Value per Share",
      "distractors": [
        "Mua ETF giúp đa dạng hóa ngay lập tức chỉ với một lệnh mua, giảm rủi ro phụ thuộc vào một công ty duy nhất",
        "Đa dạng hóa giúp giảm rủi ro tập trung — nếu một bên phát hành trong danh mục quỹ gặp vấn đề, ảnh hưởng lên toàn bộ khoản đầu tư của bạn sẽ nhỏ hơn nhiều so với tự mua một trái phiếu duy nhất"
      ]
    },
    {
      "fromDay": 121,
      "fromTitle": "Cổ phiếu là gì?",
      "text": "Cổ phiếu: chứng nhận quyền sở hữu một phần doanh nghiệp",
      "distractors": [
        "Đầu tư một lần thường có kỳ vọng lợi nhuận cao hơn DCA về mặt thống kê dài hạn, vì thị trường tăng nhiều hơn giảm",
        "FCF = NI + D&A − CapEx − ΔWC"
      ]
    }
  ],
  "134": [
    {
      "fromDay": 129,
      "fromTitle": "EV/EBITDA dùng khi nào?",
      "text": "EV/EBITDA = Enterprise Value / EBITDA",
      "distractors": [
        "Chi phí quản lý quỹ chủ động cao hơn đáng kể do cần đội ngũ nghiên cứu chuyên nghiệp",
        "Trì hoãn đầu tư hưu trí là chi phí cơ hội không thể bù đắp lại bằng tiền bạc sau này"
      ]
    },
    {
      "fromDay": 122,
      "fromTitle": "Khi mua cổ phiếu, thực chất mình sở hữu gì?",
      "text": "Sở hữu cổ phiếu = sở hữu tỷ lệ tương ứng trong tài sản, lợi nhuận và quyền biểu quyết",
      "distractors": [
        "COGS = chi phí trực tiếp để tạo ra sản phẩm",
        "Đa dạng hóa: phân bổ vốn vào nhiều tài sản để giảm rủi ro không hệ thống"
      ]
    }
  ],
  "135": [
    {
      "fromDay": 130,
      "fromTitle": "Revenue Multiple dùng khi nào?",
      "text": "EV/Revenue: dùng khi công ty chưa có lợi nhuận dương để áp dụng các chỉ số khác",
      "distractors": [
        "Đòn bẩy khuếch đại cả lợi nhuận lẫn thua lỗ so với vốn tự có",
        "P/E cao hơn trung bình ngành không tự động là xấu — cần xem xét cùng tốc độ tăng trưởng lợi nhuận kỳ vọng"
      ]
    },
    {
      "fromDay": 123,
      "fromTitle": "Giá cổ phiếu và giá trị doanh nghiệp khác nhau thế nào?",
      "text": "Giá cổ phiếu (price): kết quả cung-cầu tức thời, có thể lệch khỏi giá trị thực",
      "distractors": [
        "IRR > WACC → nên đầu tư",
        "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản"
      ]
    }
  ],
  "136": [
    {
      "fromDay": 131,
      "fromTitle": "Comparable Company Analysis là gì?",
      "text": "Comps: định giá dựa trên bội số của các công ty tương đồng đã niêm yết",
      "distractors": [
        "Time Value giảm dần về 0 khi tiến gần ngày đáo hạn (time decay)",
        "Bị ảnh hưởng bởi chính sách vay/trả nợ của công ty trong từng kỳ, cần thận trọng khi diễn giải"
      ]
    },
    {
      "fromDay": 124,
      "fromTitle": "Market Cap là gì?",
      "text": "Market Cap = Giá cổ phiếu × Số lượng cổ phiếu đang lưu hành",
      "distractors": [
        "Option hoạt động như một dạng bảo hiểm tài chính có thể định giá được",
        "Mark-to-market: thanh toán lãi/lỗ hàng ngày, giảm rủi ro đối tác"
      ]
    }
  ],
  "137": [
    {
      "fromDay": 132,
      "fromTitle": "Precedent Transaction là gì?",
      "text": "Precedent Transaction: dùng giá thực tế từ các thương vụ M&A đã hoàn tất",
      "distractors": [
        "Công cụ quan trọng cho doanh nghiệp có nợ và doanh thu bằng các đồng tiền khác nhau",
        "Expense ratio là phí vận hành quỹ trừ dần hàng năm vào tài sản, âm thầm nhưng có thật, dù nhà đầu tư không thấy khoản trừ trực tiếp"
      ]
    },
    {
      "fromDay": 125,
      "fromTitle": "Enterprise Value là gì?",
      "text": "Enterprise Value = Market Cap + Nợ − Tiền mặt",
      "distractors": [
        "P&L đo hiệu quả; Balance Sheet đo sức khỏe tài chính",
        "FCF âm do buyback/trả nợ thường là tín hiệu tốt"
      ]
    }
  ],
  "138": [
    {
      "fromDay": 133,
      "fromTitle": "DCF là gì?",
      "text": "DCF: giá trị doanh nghiệp = tổng giá trị hiện tại của dòng tiền tự do tương lai",
      "distractors": [
        "Efficient Frontier: tập hợp các danh mục tối ưu cho mỗi mức rủi ro",
        "Bảo hiểm xử lý rủi ro đuôi (tail risk) — xác suất thấp nhưng thiệt hại cực lớn mà đầu tư không thể phòng ngừa"
      ]
    },
    {
      "fromDay": 126,
      "fromTitle": "Equity Value vs Enterprise Value",
      "text": "Equity Value: giá trị dành cho cổ đông; Enterprise Value: giá trị toàn bộ doanh nghiệp",
      "distractors": [
        "Software/SaaS có operating margin cao nhất do scalability",
        "Growth = ROIC × Reinvestment Rate"
      ]
    }
  ],
  "139": [
    {
      "fromDay": 134,
      "fromTitle": "FCFF là gì?",
      "text": "FCFF: dòng tiền tự do thuộc về toàn bộ nhà cung cấp vốn (cổ đông và chủ nợ)",
      "distractors": [
        "Số tiền cần để nghỉ hưu ≈ chi tiêu hàng năm × 25 (quy tắc rút 4%/năm)",
        "Terminal Value: giá trị đại diện cho dòng tiền từ sau giai đoạn dự báo chi tiết đến vô hạn"
      ]
    },
    {
      "fromDay": 127,
      "fromTitle": "P/E dùng khi nào?",
      "text": "P/E = Giá cổ phiếu / EPS, phù hợp nhất với công ty lợi nhuận dương và ổn định",
      "distractors": [
        "Double-entry: mỗi giao dịch ghi hai chiều",
        "Đa dạng hóa danh mục và tránh đòn bẩy quá mức là hai nguyên tắc bảo vệ cơ bản nhất cho người mới bắt đầu"
      ]
    }
  ],
  "140": [
    {
      "fromDay": 135,
      "fromTitle": "FCFE là gì?",
      "text": "FCFE: dòng tiền tự do còn lại chỉ thuộc về cổ đông, sau nghĩa vụ nợ",
      "distractors": [
        "Chặng 4 xây hai lớp: BẢO VỆ (quỹ khẩn cấp, bảo hiểm, bảo mật trước lừa đảo) và TỔ CHỨC (ngân sách, tờ khai tài chính, thừa kế, biết khi nào cần tư vấn chuyên nghiệp)",
        "Market Risk Premium = Rm − Rf ≈ 5-7% lịch sử"
      ]
    },
    {
      "fromDay": 128,
      "fromTitle": "P/B dùng khi nào?",
      "text": "P/B = Giá cổ phiếu / Book Value per Share",
      "distractors": [
        "ROA = Net Income / Total Assets",
        "Debt rẻ hơn equity vì tax shield"
      ]
    }
  ],
  "141": [
    {
      "fromDay": 136,
      "fromTitle": "Terminal Value là gì?",
      "text": "Terminal Value: giá trị đại diện cho dòng tiền từ sau giai đoạn dự báo chi tiết đến vô hạn",
      "distractors": [
        "Nền tảng an toàn (ngân sách, quỹ khẩn cấp, bảo hiểm) cần đi trước, danh mục đầu tư dài hạn xây dựng phía trên nền tảng đó",
        "Bondholders ưu tiên trước stockholders trong phá sản"
      ]
    },
    {
      "fromDay": 129,
      "fromTitle": "EV/EBITDA dùng khi nào?",
      "text": "EV/EBITDA = Enterprise Value / EBITDA",
      "distractors": [
        "Cần liệt kê đầy đủ mọi tài sản (tiền mặt, tiết kiệm, chứng khoán, bất động sản) và mọi khoản nợ (vay mua nhà/xe, thẻ tín dụng) để tính đúng",
        "Chương trình 262 ngày xây bốn lớp nền tảng: tư duy tiền bạc, cổ phiếu/ETF, trái phiếu, và danh mục/hưu trí/bảo vệ tài sản"
      ]
    }
  ],
  "142": [
    {
      "fromDay": 137,
      "fromTitle": "Gordon Growth Method",
      "text": "Gordon Growth Method: Terminal Value = FCF cuối × (1+g) / (WACC − g)",
      "distractors": [
        "NPV > 0: tạo giá trị; NPV < 0: phá hủy giá trị",
        "Thứ tự ưu tiên phá sản quan trọng với risk/return"
      ]
    },
    {
      "fromDay": 130,
      "fromTitle": "Revenue Multiple dùng khi nào?",
      "text": "EV/Revenue: dùng khi công ty chưa có lợi nhuận dương để áp dụng các chỉ số khác",
      "distractors": [
        "Đây là khung tham khảo, không phải luật cứng — điều chỉnh theo hoàn cảnh nhưng nên biết mình đang lệch ở đâu",
        "Premium: phí trả để có quyền chọn, là rủi ro tối đa của người mua"
      ]
    }
  ],
  "143": [
    {
      "fromDay": 138,
      "fromTitle": "Exit Multiple Method",
      "text": "Exit Multiple Method: Terminal Value dựa trên bội số thị trường điển hình (như EV/EBITDA)",
      "distractors": [
        "FOMO (sợ bỏ lỡ) là một biểu hiện phổ biến của lòng tham, khiến nhà đầu tư mua vào khi giá đã tăng nóng mà không phân tích giá trị thực",
        "Trì hoãn đầu tư hưu trí là chi phí cơ hội không thể bù đắp lại bằng tiền bạc sau này"
      ]
    },
    {
      "fromDay": 131,
      "fromTitle": "Comparable Company Analysis là gì?",
      "text": "Comps: định giá dựa trên bội số của các công ty tương đồng đã niêm yết",
      "distractors": [
        "Mua tài sản dài hạn → khấu hao dần qua các năm",
        "Là phương pháp định giá tuyệt đối, độc lập với định giá thị trường của công ty khác"
      ]
    }
  ],
  "144": [
    {
      "fromDay": 139,
      "fromTitle": "Sensitivity Analysis là gì?",
      "text": "Sensitivity Analysis: kiểm tra kết quả định giá thay đổi thế nào khi giả định chính thay đổi",
      "distractors": [
        "P/E cao thường phản ánh kỳ vọng tăng trưởng cao; P/E thấp có thể là cơ hội hoặc là dấu hiệu rủi ro",
        "Chặng 2 xoay quanh bốn trụ cột liên kết chặt chẽ: công cụ đầu tư và định giá (ETF, quỹ mở, P/E), quản trị rủi ro (đa dạng hóa, tránh đòn bẩy), kỷ luật tâm lý (tránh tham lam/sợ hãi, DCA), và kỳ vọng thực tế (8-12%/năm dài hạn, không phải làm giàu nhanh)"
      ]
    },
    {
      "fromDay": 132,
      "fromTitle": "Precedent Transaction là gì?",
      "text": "Precedent Transaction: dùng giá thực tế từ các thương vụ M&A đã hoàn tất",
      "distractors": [
        "Lãi kép: lãi trên lãi — sức mạnh thời gian",
        "Bondholders ưu tiên trước stockholders trong phá sản"
      ]
    }
  ],
  "145": [
    {
      "fromDay": 140,
      "fromTitle": "nhỏ — Định giá một công ty bằng P/E và DCF đơn giản",
      "text": "Thực hành định giá chuyên nghiệp luôn kết hợp nhiều phương pháp, không chỉ dựa vào một con số",
      "distractors": [
        "Phản ánh chi phí thực sự để mua đứt toàn bộ hoạt động kinh doanh của công ty",
        "Net Income là con số cuối sau lãi vay và thuế"
      ]
    },
    {
      "fromDay": 133,
      "fromTitle": "DCF là gì?",
      "text": "DCF: giá trị doanh nghiệp = tổng giá trị hiện tại của dòng tiền tự do tương lai",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Hạn chế: beta thay đổi, thị trường không hoàn hảo"
      ]
    }
  ],
  "146": [
    {
      "fromDay": 141,
      "fromTitle": "Trái phiếu là gì?",
      "text": "Trái phiếu = cho vay, nhận coupon + hoàn vốn khi đáo hạn",
      "distractors": [
        "Rating thấp → lãi suất cao (credit spread)",
        "Giá trị của phái sinh phụ thuộc vào mục đích sử dụng: hedging tạo giá trị thực, speculation thiếu kỷ luật có thể gây thảm họa"
      ]
    },
    {
      "fromDay": 134,
      "fromTitle": "FCFF là gì?",
      "text": "FCFF: dòng tiền tự do thuộc về toàn bộ nhà cung cấp vốn (cổ đông và chủ nợ)",
      "distractors": [
        "Swap dealer (ngân hàng đầu tư) đóng vai trò trung gian, market maker cho thị trường",
        "Mục tiêu: tối đa hóa giá trị dài hạn cho cổ đông"
      ]
    }
  ],
  "147": [
    {
      "fromDay": 142,
      "fromTitle": "Giá trái phiếu và lãi suất",
      "text": "Lãi suất tăng → giá trái phiếu giảm (và ngược lại)",
      "distractors": [
        "Cộng dồn các loại phí nhỏ có thể tạo ra tổng chi phí hàng năm 2-3% hoặc hơn, ăn mòn đáng kể lợi nhuận dài hạn",
        "Volatility cao không xấu về bản chất — cần cân nhắc cùng lợi nhuận kỳ vọng và khẩu vị rủi ro"
      ]
    },
    {
      "fromDay": 135,
      "fromTitle": "FCFE là gì?",
      "text": "FCFE: dòng tiền tự do còn lại chỉ thuộc về cổ đông, sau nghĩa vụ nợ",
      "distractors": [
        "Hai loại phổ biến nhất: Interest Rate Swap và Currency Swap",
        "ROE = Net Income / Equity — quan trọng nhất với cổ đông"
      ]
    }
  ],
  "148": [
    {
      "fromDay": 143,
      "fromTitle": "Yield to Maturity (YTM)",
      "text": "YTM = lợi suất thực nếu giữ đến đáo hạn",
      "distractors": [
        "Inverted curve: tín hiệu cảnh báo kinh tế mạnh, không nên bỏ qua",
        "Amazon là ví dụ kinh điển: lỗ kế toán nhưng OCF mạnh"
      ]
    },
    {
      "fromDay": 136,
      "fromTitle": "Terminal Value là gì?",
      "text": "Terminal Value: giá trị đại diện cho dòng tiền từ sau giai đoạn dự báo chi tiết đến vô hạn",
      "distractors": [
        "Notional principal thường không đổi tay — chỉ phần chênh lệch (net) được thanh toán",
        "Passive investing: mô phỏng chỉ số, chi phí thấp hơn nhiều"
      ]
    }
  ],
  "149": [
    {
      "fromDay": 144,
      "fromTitle": "Credit Rating (Xếp hạng tín dụng)",
      "text": "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk",
      "distractors": [
        "Cổ phiếu thường có lợi nhuận trung bình cao hơn trái phiếu trong dài hạn, để đền bù cho rủi ro cao hơn — gọi là phần bù rủi ro cổ phiếu (equity risk premium)",
        "Tăng tỷ trọng tài sản lợi nhuận cao hơn sẽ kéo expected return tổng thể lên, kèm rủi ro tăng theo"
      ]
    },
    {
      "fromDay": 137,
      "fromTitle": "Gordon Growth Method",
      "text": "Gordon Growth Method: Terminal Value = FCF cuối × (1+g) / (WACC − g)",
      "distractors": [
        "3-statement model: P&L → BS → CFS liên kết",
        "Cổ phiếu thường có lợi nhuận trung bình cao hơn trái phiếu trong dài hạn, để đền bù cho rủi ro cao hơn — gọi là phần bù rủi ro cổ phiếu (equity risk premium)"
      ]
    }
  ],
  "150": [
    {
      "fromDay": 145,
      "fromTitle": "Yield Curve",
      "text": "Yield curve: lợi suất trái phiếu theo kỳ hạn",
      "distractors": [
        "Không thể hiểu một báo cáo mà bỏ qua hai báo cáo còn lại",
        "FCF là tiền thực sự tự do sau khi duy trì kinh doanh"
      ]
    },
    {
      "fromDay": 138,
      "fromTitle": "Exit Multiple Method",
      "text": "Exit Multiple Method: Terminal Value dựa trên bội số thị trường điển hình (như EV/EBITDA)",
      "distractors": [
        "Inventory turnover = COGS / Average Inventory",
        "D&A cộng lại vì non-cash; tăng WC trừ đi vì tiêu tiền"
      ]
    }
  ],
  "151": [
    {
      "fromDay": 146,
      "fromTitle": "Lãi suất thực vs Lãi suất danh nghĩa",
      "text": "Lãi suất thực ≈ Lãi suất danh nghĩa − Lạm phát",
      "distractors": [
        "Mức D/E hợp lý phụ thuộc ngành và sự ổn định dòng tiền",
        "Cash Conversion Cycle = DSO + DIO − DPO"
      ]
    },
    {
      "fromDay": 139,
      "fromTitle": "Sensitivity Analysis là gì?",
      "text": "Sensitivity Analysis: kiểm tra kết quả định giá thay đổi thế nào khi giả định chính thay đổi",
      "distractors": [
        "Thuế TNCN khi bán chứng khoán niêm yết ở Việt Nam là 0,1% trên TỔNG GIÁ TRỊ BÁN mỗi lần giao dịch, không phải trên phần lợi nhuận như thuế lãi vốn kiểu Mỹ",
        "Robo-advisor là dạng trung gian: quản lý tự động bằng thuật toán, chi phí thường thấp hơn quản lý truyền thống"
      ]
    }
  ],
  "152": [
    {
      "fromDay": 147,
      "fromTitle": "Chính sách tiền tệ và lãi suất",
      "text": "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
      "distractors": [
        "Lạm phát âm thầm bào mòn sức mua của tiền theo thời gian, kể cả khi số dư danh nghĩa không giảm",
        "Vay phá sản khi ROI nhỏ hơn lãi suất vay (spread âm) hoặc tài sản mất giá mạnh"
      ]
    },
    {
      "fromDay": 140,
      "fromTitle": "nhỏ — Định giá một công ty bằng P/E và DCF đơn giản",
      "text": "Thực hành định giá chuyên nghiệp luôn kết hợp nhiều phương pháp, không chỉ dựa vào một con số",
      "distractors": [
        "Thời gian tăng trưởng, không phải thời gian đóng tiền, quyết định kết quả",
        "Payback = Vốn đầu tư / Dòng tiền hàng năm"
      ]
    }
  ],
  "153": [
    {
      "fromDay": 148,
      "fromTitle": "Lạm phát và tác động đến đầu tư",
      "text": "Lãi suất thực âm = tích lũy tiền mặt mất sức mua",
      "distractors": [
        "Tần suất hợp lý cho mục tiêu dài hạn (hưu trí, giáo dục con) là hàng tháng hoặc hàng quý",
        "Kỳ vọng thực tế giúp lập kế hoạch tiết kiệm/đầu tư hợp lý và tránh rủi ro quá mức khi chạy theo lợi nhuận phi thực tế"
      ]
    },
    {
      "fromDay": 141,
      "fromTitle": "Trái phiếu là gì?",
      "text": "Trái phiếu = cho vay, nhận coupon + hoàn vốn khi đáo hạn",
      "distractors": [
        "Số tiền cần để nghỉ hưu ≈ chi tiêu hàng năm × 25 (quy tắc rút 4%/năm)",
        "PE: mua công ty trưởng thành, tái cơ cấu, exit sau 5-7 năm"
      ]
    }
  ],
  "154": [
    {
      "fromDay": 149,
      "fromTitle": "Credit Spread",
      "text": "Credit spread = yield corporate − yield risk-free",
      "distractors": [
        "Ngành biến động cao nên dùng ít nợ hơn",
        "Operating Margin = EBIT / Revenue"
      ]
    },
    {
      "fromDay": 142,
      "fromTitle": "Giá trái phiếu và lãi suất",
      "text": "Lãi suất tăng → giá trái phiếu giảm (và ngược lại)",
      "distractors": [
        "Cả hai phương pháp đều yêu cầu: trả tối thiểu mọi khoản khác, dồn phần dư vào khoản ưu tiên",
        "Xuất hiện liên tục → red flag capital allocation"
      ]
    }
  ],
  "155": [
    {
      "fromDay": 150,
      "fromTitle": "Trái phiếu doanh nghiệp Việt Nam",
      "text": "TPDN VN: phát triển nhanh nhưng thiếu minh bạch",
      "distractors": [
        "Debt maturity profile = lịch trả nợ quan trọng cần theo dõi",
        "Phản ánh pricing power và hiệu quả sản xuất"
      ]
    },
    {
      "fromDay": 143,
      "fromTitle": "Yield to Maturity (YTM)",
      "text": "YTM = lợi suất thực nếu giữ đến đáo hạn",
      "distractors": [
        "FOMO (sợ bỏ lỡ) là một biểu hiện phổ biến của lòng tham, khiến nhà đầu tư mua vào khi giá đã tăng nóng mà không phân tích giá trị thực",
        "Municipal bond: tài trợ hạ tầng công cộng ở cấp địa phương"
      ]
    }
  ],
  "156": [
    {
      "fromDay": 151,
      "fromTitle": "Rủi ro vỡ nợ và Default Rate",
      "text": "Expected Loss = PD × LGD",
      "distractors": [
        "Hữu ích nhất với ngân hàng, bảo hiểm, bất động sản — nơi sổ sách phản ánh sát giá trị thực",
        "DCA (Dollar-Cost Averaging) là chia vốn thành nhiều phần, đầu tư đều đặn theo định kỳ thay vì bỏ hết vào một lần"
      ]
    },
    {
      "fromDay": 144,
      "fromTitle": "Credit Rating (Xếp hạng tín dụng)",
      "text": "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk",
      "distractors": [
        "Phù hợp với nhu cầu hedging tùy chỉnh của từng doanh nghiệp",
        "NPV > 0 là tiêu chí chính để chấp nhận dự án"
      ]
    }
  ],
  "157": [
    {
      "fromDay": 152,
      "fromTitle": "Ôn tập: Trái phiếu & Lãi suất",
      "text": "Lãi suất: công cụ điều hành kinh tế mạnh nhất",
      "distractors": [
        "Lợi nhuận kế toán ≠ tiền thực trong tay",
        "Tỷ lệ tiết kiệm quan trọng hơn số tiền tiết kiệm tuyệt đối"
      ]
    },
    {
      "fromDay": 145,
      "fromTitle": "Yield Curve",
      "text": "Yield curve: lợi suất trái phiếu theo kỳ hạn",
      "distractors": [
        "Volatility: thước đo mức độ dao động giá của một tài sản",
        "Contribution Margin = Revenue − Variable Costs"
      ]
    }
  ],
  "158": [
    {
      "fromDay": 153,
      "fromTitle": "Default là gì?",
      "text": "Default: vi phạm nghĩa vụ trả nợ, không nhất thiết là phá sản",
      "distractors": [
        "In-the-money, at-the-money, out-of-the-money mô tả vị thế option so với giá thị trường",
        "Ba luồng OCF + ICF + FCF = Net Change in Cash"
      ]
    },
    {
      "fromDay": 146,
      "fromTitle": "Lãi suất thực vs Lãi suất danh nghĩa",
      "text": "Lãi suất thực ≈ Lãi suất danh nghĩa − Lạm phát",
      "distractors": [
        "Lãi suất tăng → giá trái phiếu giảm (và ngược lại)",
        "Đầu tư tăng trưởng: chấp nhận P/E cao hôm nay để đổi lấy tăng trưởng lợi nhuận nhanh trong tương lai"
      ]
    }
  ],
  "159": [
    {
      "fromDay": 154,
      "fromTitle": "Spread là gì?",
      "text": "Spread = Yield rủi ro − Yield phi rủi ro cùng kỳ hạn",
      "distractors": [
        "Tăng tỷ trọng tài sản lợi nhuận cao hơn sẽ kéo expected return tổng thể lên, kèm rủi ro tăng theo",
        "Fallen Angel: IG bị hạ xuống HY → giá giảm mạnh"
      ]
    },
    {
      "fromDay": 147,
      "fromTitle": "Chính sách tiền tệ và lãi suất",
      "text": "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
      "distractors": [
        "MM (no tax): cơ cấu vốn không quan trọng trong thị trường hoàn hảo",
        "Nhà đầu tư giá trị tìm kiếm khoảng cách an toàn (margin of safety) giữa giá và giá trị"
      ]
    }
  ],
  "160": [
    {
      "fromDay": 155,
      "fromTitle": "Treasury Bond là gì?",
      "text": "Treasury bond: chuẩn tham chiếu risk-free toàn cầu",
      "distractors": [
        "Rủi ro lãi suất chỉ thực sự 'thiệt hại' nếu bạn phải bán trái phiếu trước khi đáo hạn ở mức giá bất lợi — giữ đến đáo hạn thì không bị ảnh hưởng",
        "Nhược: không matching, dễ bóp méo lợi nhuận"
      ]
    },
    {
      "fromDay": 148,
      "fromTitle": "Lạm phát và tác động đến đầu tư",
      "text": "Lãi suất thực âm = tích lũy tiền mặt mất sức mua",
      "distractors": [
        "Optimal leverage tồn tại — leverage quá cao làm Ke và Kd tăng",
        "Lạm phát Việt Nam có giai đoạn biến động mạnh (từng vượt 20%/năm), khiến việc chỉ giữ tiền mặt/tiết kiệm không kỳ hạn trở nên rủi ro hơn vẻ ngoài 'an toàn'"
      ]
    }
  ],
  "161": [
    {
      "fromDay": 156,
      "fromTitle": "Corporate Bond là gì?",
      "text": "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư",
      "distractors": [
        "Quy tắc 68-95-99.7 giúp ước lượng xác suất các kịch bản lợi nhuận thực tế",
        "Accrual: ghi nhận theo nghĩa vụ kinh tế, không theo tiền mặt"
      ]
    },
    {
      "fromDay": 149,
      "fromTitle": "Credit Spread",
      "text": "Credit spread = yield corporate − yield risk-free",
      "distractors": [
        "Fallen Angel: IG bị hạ xuống HY → giá giảm mạnh",
        "Luôn kiểm tra cơ chế trả phí của tư vấn viên để nhận diện xung đột lợi ích tiềm ẩn"
      ]
    }
  ],
  "162": [
    {
      "fromDay": 157,
      "fromTitle": "Municipal Bond là gì?",
      "text": "Municipal bond: tài trợ hạ tầng công cộng ở cấp địa phương",
      "distractors": [
        "Yield curve: phong vũ biểu kỳ vọng kinh tế vĩ mô",
        "Phù hợp đánh giá thanh khoản, không phải tạo giá trị"
      ]
    },
    {
      "fromDay": 150,
      "fromTitle": "Trái phiếu doanh nghiệp Việt Nam",
      "text": "TPDN VN: phát triển nhanh nhưng thiếu minh bạch",
      "distractors": [
        "Cổ phiếu: chứng nhận quyền sở hữu một phần doanh nghiệp",
        "Ba yếu tố cốt lõi của mọi trái phiếu: mệnh giá (số tiền gốc), lãi suất coupon (tỷ lệ lãi trả định kỳ), và kỳ hạn (thời gian đến khi đáo hạn)"
      ]
    }
  ],
  "163": [
    {
      "fromDay": 158,
      "fromTitle": "Yield Curve là gì?",
      "text": "Yield curve bình thường: dốc lên, kỳ hạn dài lợi suất cao hơn",
      "distractors": [
        "Nợ rẻ hơn vốn chủ sau điều chỉnh thuế",
        "Nghỉ hưu càng sớm, thời gian sống dựa vào danh mục càng dài, nên cần biên an toàn lớn hơn (rút 3-3,5% thay vì 4%)"
      ]
    },
    {
      "fromDay": 151,
      "fromTitle": "Rủi ro vỡ nợ và Default Rate",
      "text": "Expected Loss = PD × LGD",
      "distractors": [
        "Cổ phiếu mang lại lợi nhuận qua hai kênh độc lập: lãi vốn (chênh lệch giá mua-bán) và cổ tức (chia lợi nhuận trực tiếp)",
        "Risk-free rate là nền tảng của mọi mô hình định giá tài chính"
      ]
    }
  ],
  "164": [
    {
      "fromDay": 159,
      "fromTitle": "nhỏ — Đọc đường cong lợi suất",
      "text": "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
      "distractors": [
        "Sợ hãi khiến nhà đầu tư bán tháo trong hoảng loạn ở vùng giá thấp; lòng tham khiến nhà đầu tư mua đuổi hoặc dùng đòn bẩy quá mức ở vùng giá cao",
        "Merger: hợp nhất bình đẳng; Acquisition: mua và kiểm soát"
      ]
    },
    {
      "fromDay": 152,
      "fromTitle": "Ôn tập: Trái phiếu & Lãi suất",
      "text": "Lãi suất: công cụ điều hành kinh tế mạnh nhất",
      "distractors": [
        "Bắt đầu sớm quan trọng hơn đầu tư nhiều về sau",
        "Equity Value: giá trị dành cho cổ đông; Enterprise Value: giá trị toàn bộ doanh nghiệp"
      ]
    }
  ],
  "165": [
    {
      "fromDay": 160,
      "fromTitle": "Tổng ôn Chặng 8 — Trái phiếu là thế giới của lãi suất và niềm tin",
      "text": "Trái phiếu vận hành trên hai trục: giá trị thời gian của tiền và niềm tin tín dụng",
      "distractors": [
        "Quy tắc 72: số năm gấp đôi = 72 chia cho lãi suất",
        "Quyết định bán nên dựa trên việc luận điểm đầu tư ban đầu (nền tảng cơ bản doanh nghiệp) có còn đúng hay không, không nên chỉ dựa vào biến động giá ngắn hạn"
      ]
    },
    {
      "fromDay": 153,
      "fromTitle": "Default là gì?",
      "text": "Default: vi phạm nghĩa vụ trả nợ, không nhất thiết là phá sản",
      "distractors": [
        "Gordon Growth Method: Terminal Value = FCF cuối × (1+g) / (WACC − g)",
        "Rủi ro: overpay, culture clash, synergy thực tế thấp hơn kỳ vọng"
      ]
    }
  ],
  "166": [
    {
      "fromDay": 161,
      "fromTitle": "Portfolio là gì?",
      "text": "Portfolio: tập hợp tài sản được quản lý như một thể thống nhất",
      "distractors": [
        "Non-current: PP&E, intangibles, goodwill — dài hạn",
        "PE vs VC: PE = trưởng thành + LBO; VC = startup + equity"
      ]
    },
    {
      "fromDay": 154,
      "fromTitle": "Spread là gì?",
      "text": "Spread = Yield rủi ro − Yield phi rủi ro cùng kỳ hạn",
      "distractors": [
        "Quy trình xây dựng danh mục: khẩu vị rủi ro & mục tiêu → phân bổ tài sản → đa dạng hóa → chọn chiến lược (giá trị/tăng trưởng) → tái cân bằng định kỳ → kiểm soát tâm lý",
        "Yield curve: phong vũ biểu kỳ vọng kinh tế vĩ mô"
      ]
    }
  ],
  "167": [
    {
      "fromDay": 162,
      "fromTitle": "Vì sao không nên nhìn từng khoản đầu tư riêng lẻ?",
      "text": "Rủi ro của một tài sản riêng lẻ không phản ánh đúng đóng góp của nó vào rủi ro danh mục",
      "distractors": [
        "Duration cao hơn khuếch đại cả lãi và lỗ khi lãi suất biến động",
        "Cổ đông có quyền nhận cổ tức, biểu quyết, và phần tài sản còn lại khi giải thể"
      ]
    },
    {
      "fromDay": 155,
      "fromTitle": "Treasury Bond là gì?",
      "text": "Treasury bond: chuẩn tham chiếu risk-free toàn cầu",
      "distractors": [
        "Strike price gần giá thị trường hơn → premium cao hơn (với option có lợi)",
        "Ba luồng OCF + ICF + FCF = Net Change in Cash"
      ]
    }
  ],
  "168": [
    {
      "fromDay": 163,
      "fromTitle": "Diversification — Đa dạng hóa",
      "text": "Đa dạng hóa: phân bổ vốn vào nhiều tài sản để giảm rủi ro không hệ thống",
      "distractors": [
        "AP cao = doanh nghiệp mạnh dùng tiền NCC miễn lãi",
        "WACC cao → NPV giảm → ít dự án được chấp thuận hơn"
      ]
    },
    {
      "fromDay": 156,
      "fromTitle": "Corporate Bond là gì?",
      "text": "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư",
      "distractors": [
        "Là một trong những đầu vào quan trọng nhất của mọi mô hình quản trị rủi ro danh mục",
        "EV/Revenue: dùng khi công ty chưa có lợi nhuận dương để áp dụng các chỉ số khác"
      ]
    }
  ],
  "169": [
    {
      "fromDay": 164,
      "fromTitle": "Correlation — Tương quan giữa các tài sản",
      "text": "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)",
      "distractors": [
        "EPS = Net Income / Diluted Shares — dùng cho P/E",
        "Tiền hôm nay đáng giá hơn cùng số tiền trong tương lai"
      ]
    },
    {
      "fromDay": 157,
      "fromTitle": "Municipal Bond là gì?",
      "text": "Municipal bond: tài trợ hạ tầng công cộng ở cấp địa phương",
      "distractors": [
        "Nợ dài hạn: thời gian trả dài hơn, thường lãi cao hơn",
        "Hai báo cáo kết nối qua Retained Earnings"
      ]
    }
  ],
  "170": [
    {
      "fromDay": 165,
      "fromTitle": "Volatility — Biến động",
      "text": "Volatility: thước đo mức độ dao động giá của một tài sản",
      "distractors": [
        "Gross Profit = Revenue − COGS",
        "Kiến thức tự học (như các bài học trong track này) giúp bạn đặt câu hỏi thông minh hơn và đánh giá được chất lượng lời khuyên từ chuyên gia"
      ]
    },
    {
      "fromDay": 158,
      "fromTitle": "Yield Curve là gì?",
      "text": "Yield curve bình thường: dốc lên, kỳ hạn dài lợi suất cao hơn",
      "distractors": [
        "Giảm phí không cần thiết (giao dịch quá thường xuyên, quỹ phí cao không tương xứng hiệu suất) là cách cải thiện lợi nhuận ròng dễ kiểm soát nhất",
        "Số lượng cổ phiếu sở hữu không có ý nghĩa nếu tách rời khỏi quy mô và giá trị công ty"
      ]
    }
  ],
  "171": [
    {
      "fromDay": 166,
      "fromTitle": "Standard Deviation trong đầu tư",
      "text": "Standard deviation: công cụ toán học chính xác đo mức độ phân tán của lợi suất",
      "distractors": [
        "Đây chỉ là hướng dẫn tham khảo, cần điều chỉnh theo khẩu vị rủi ro cá nhân, không phải công thức cứng nhắc áp dụng y hệt cho mọi người",
        "PV Annuity = PMT × [(1−(1+r)^−n)/r]"
      ]
    },
    {
      "fromDay": 159,
      "fromTitle": "nhỏ — Đọc đường cong lợi suất",
      "text": "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
      "distractors": [
        "Rủi ro của một tài sản riêng lẻ không phản ánh đúng đóng góp của nó vào rủi ro danh mục",
        "Là công cụ trực quan hóa cốt lõi của Modern Portfolio Theory"
      ]
    }
  ],
  "172": [
    {
      "fromDay": 167,
      "fromTitle": "Expected Return của danh mục",
      "text": "Expected Return của danh mục = trung bình có trọng số theo tỷ trọng từng tài sản",
      "distractors": [
        "NPV > 0 là tiêu chí đầu tư cốt lõi",
        "Doanh nghiệp có dòng tiền ngoại tệ tương lai nên xác định rõ exposure trước khi chọn công cụ hedging"
      ]
    },
    {
      "fromDay": 160,
      "fromTitle": "Tổng ôn Chặng 8 — Trái phiếu là thế giới của lãi suất và niềm tin",
      "text": "Trái phiếu vận hành trên hai trục: giá trị thời gian của tiền và niềm tin tín dụng",
      "distractors": [
        "Rủi ro lãi suất chỉ thực sự 'thiệt hại' nếu bạn phải bán trái phiếu trước khi đáo hạn ở mức giá bất lợi — giữ đến đáo hạn thì không bị ảnh hưởng",
        "Rủi ro và lợi nhuận cần đánh giá ở cấp độ danh mục, không phải từng tài sản riêng lẻ"
      ]
    }
  ],
  "173": [
    {
      "fromDay": 168,
      "fromTitle": "Risk-Return Tradeoff",
      "text": "Risk-return tradeoff: lợi nhuận kỳ vọng cao hơn luôn đi kèm rủi ro cao hơn",
      "distractors": [
        "Đọc cả 3: P&L đo hiệu quả, BS đo vị thế, CFS đo tiền thực",
        "'Valuation football field' — dải giá trị từ nhiều phương pháp — là công cụ chuẩn trong thực hành định giá chuyên nghiệp"
      ]
    },
    {
      "fromDay": 161,
      "fromTitle": "Portfolio là gì?",
      "text": "Portfolio: tập hợp tài sản được quản lý như một thể thống nhất",
      "distractors": [
        "Net Change in Cash = OCF + ICF + FCF",
        "Trái phiếu phù hợp khi mục tiêu là bảo toàn vốn, có dòng tiền lãi ổn định, hoặc khi bạn sắp cần dùng đến khoản tiền đó trong thời gian gần (vài năm tới)"
      ]
    }
  ],
  "174": [
    {
      "fromDay": 169,
      "fromTitle": "Modern Portfolio Theory là gì?",
      "text": "MPT: nền tảng toán học để xây dựng danh mục tối ưu dựa trên return, risk, correlation",
      "distractors": [
        "Nợ phải trả = nghĩa vụ phải thanh toán trong tương lai",
        "Tăng DSO đột biến = cần điều tra chất lượng doanh thu"
      ]
    },
    {
      "fromDay": 162,
      "fromTitle": "Vì sao không nên nhìn từng khoản đầu tư riêng lẻ?",
      "text": "Rủi ro của một tài sản riêng lẻ không phản ánh đúng đóng góp của nó vào rủi ro danh mục",
      "distractors": [
        "Chặng 2 xoay quanh bốn trụ cột liên kết chặt chẽ: công cụ đầu tư và định giá (ETF, quỹ mở, P/E), quản trị rủi ro (đa dạng hóa, tránh đòn bẩy), kỷ luật tâm lý (tránh tham lam/sợ hãi, DCA), và kỳ vọng thực tế (8-12%/năm dài hạn, không phải làm giàu nhanh)",
        "Nợ xấu: dùng để tiêu dùng hoặc mua tài sản kém hơn lãi vay"
      ]
    }
  ],
  "175": [
    {
      "fromDay": 170,
      "fromTitle": "Efficient Frontier là gì?",
      "text": "Efficient Frontier: tập hợp các danh mục tối ưu cho mỗi mức rủi ro",
      "distractors": [
        "Ước tính nhanh: tài sản cần có ≈ 25 × chi phí sinh hoạt hàng năm (dựa trên quy tắc rút 4%)",
        "Duration: đo rủi ro lãi suất; Convexity: hiệu chỉnh phi tuyến"
      ]
    },
    {
      "fromDay": 163,
      "fromTitle": "Diversification — Đa dạng hóa",
      "text": "Đa dạng hóa: phân bổ vốn vào nhiều tài sản để giảm rủi ro không hệ thống",
      "distractors": [
        "Chi phí danh mục là tổng của nhiều loại phí: phí quỹ (expense ratio), phí giao dịch, phí lưu ký, phí tư vấn — không chỉ một khoản riêng lẻ",
        "Cả hai phương pháp đều yêu cầu: trả tối thiểu mọi khoản khác, dồn phần dư vào khoản ưu tiên"
      ]
    }
  ],
  "176": [
    {
      "fromDay": 171,
      "fromTitle": "Sharpe Ratio là gì?",
      "text": "Sharpe Ratio = (Return − Risk-free rate) / Độ lệch chuẩn",
      "distractors": [
        "Phân tích tài chính toàn diện kết nối bốn lớp: kế toán, định giá, rủi ro, thị trường",
        "Thuế chứng khoán Việt Nam (0,1% trên giá trị bán) và các loại phí (giao dịch, quản lý quỹ) đều là chi phí thực tế cần tính vào lợi nhuận ròng, dù dễ bị bỏ qua"
      ]
    },
    {
      "fromDay": 164,
      "fromTitle": "Correlation — Tương quan giữa các tài sản",
      "text": "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)",
      "distractors": [
        "Đo hiệu quả vận hành sau SG&A và R&D",
        "Nếu bạn giữ trái phiếu đến khi đáo hạn, biến động giá giữa chừng không ảnh hưởng đến số tiền gốc và lãi bạn nhận — chỉ ảnh hưởng nếu bạn muốn bán trước hạn"
      ]
    }
  ],
  "177": [
    {
      "fromDay": 172,
      "fromTitle": "Alpha là gì?",
      "text": "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
      "distractors": [
        "Futures phù hợp với nhà đầu tư cần thanh khoản cao và minh bạch giá",
        "Rút ngắn CCC = giải phóng vốn lưu động"
      ]
    },
    {
      "fromDay": 165,
      "fromTitle": "Volatility — Biến động",
      "text": "Volatility: thước đo mức độ dao động giá của một tài sản",
      "distractors": [
        "Điều kiện: phải có underlying exposure thực tế cần bảo vệ",
        "Spot vs Futures: contango vs backwardation"
      ]
    }
  ],
  "178": [
    {
      "fromDay": 173,
      "fromTitle": "Beta trong danh mục",
      "text": "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường",
      "distractors": [
        "Đa dạng hóa qua quỹ giúp giảm rủi ro tập trung so với mua trực tiếp trái phiếu của một công ty duy nhất",
        "Kiến thức tự học (như các bài học trong track này) giúp bạn đặt câu hỏi thông minh hơn và đánh giá được chất lượng lời khuyên từ chuyên gia"
      ]
    },
    {
      "fromDay": 166,
      "fromTitle": "Standard Deviation trong đầu tư",
      "text": "Standard deviation: công cụ toán học chính xác đo mức độ phân tán của lợi suất",
      "distractors": [
        "Trung lập với cơ cấu vốn và chính sách khấu hao — phù hợp so sánh công ty có đòn bẩy khác nhau",
        "Optimal structure: cân bằng tax shield và financial distress cost"
      ]
    }
  ],
  "179": [
    {
      "fromDay": 174,
      "fromTitle": "Tracking Error là gì?",
      "text": "Tracking Error: đo mức độ lệch giữa lợi suất quỹ và benchmark nó theo dõi",
      "distractors": [
        "Không có công thức duy nhất đúng cho mọi cổ phiếu; phân tích cơ bản là kết hợp nhiều góc nhìn để ra quyết định có cơ sở hơn là đoán mò",
        "Nhược: không matching, dễ bóp méo lợi nhuận"
      ]
    },
    {
      "fromDay": 167,
      "fromTitle": "Expected Return của danh mục",
      "text": "Expected Return của danh mục = trung bình có trọng số theo tỷ trọng từng tài sản",
      "distractors": [
        "Không cần toàn bộ danh mục ở nước ngoài — một tỷ trọng vừa phải (ví dụ 20-30%) đã đủ để giảm rủi ro tập trung đáng kể",
        "Đòn bẩy cao khuếch đại cả lãi và lỗ trên vốn bỏ ra"
      ]
    }
  ],
  "180": [
    {
      "fromDay": 175,
      "fromTitle": "Active vs Passive Investing",
      "text": "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
      "distractors": [
        "Rủi ro tỷ giá là yếu tố đặc thù: lợi nhuận thực tế = lợi nhuận tài sản kết hợp với biến động tỷ giá",
        "Dòng tiền: sức khỏe tài chính thực tế, quan trọng hơn lợi nhuận kế toán"
      ]
    },
    {
      "fromDay": 168,
      "fromTitle": "Risk-Return Tradeoff",
      "text": "Risk-return tradeoff: lợi nhuận kỳ vọng cao hơn luôn đi kèm rủi ro cao hơn",
      "distractors": [
        "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau",
        "WACC cao → NPV giảm → ít dự án được chấp thuận hơn"
      ]
    }
  ],
  "181": [
    {
      "fromDay": 176,
      "fromTitle": "ETF là gì?",
      "text": "ETF: quỹ chứa rổ tài sản nhưng giao dịch linh hoạt như một cổ phiếu",
      "distractors": [
        "Thường có chi phí quản lý thấp hơn nhiều so với quỹ tương hỗ truyền thống",
        "IRS: hoán đổi dòng lãi suất cố định và thả nổi giữa hai bên"
      ]
    },
    {
      "fromDay": 169,
      "fromTitle": "Modern Portfolio Theory là gì?",
      "text": "MPT: nền tảng toán học để xây dựng danh mục tối ưu dựa trên return, risk, correlation",
      "distractors": [
        "Nhược: không matching, dễ bóp méo lợi nhuận",
        "ROIC > WACC → tạo value"
      ]
    }
  ],
  "182": [
    {
      "fromDay": 177,
      "fromTitle": "Mutual Fund là gì?",
      "text": "Mutual Fund: quỹ tương hỗ, định giá và giao dịch một lần mỗi ngày theo NAV",
      "distractors": [
        "Khoảng cách quan trọng nhất là từ HIỂU đến LÀM — kiến thức chỉ tạo ra khác biệt khi trở thành thói quen thực hành đều đặn",
        "Volatility: thước đo mức độ dao động giá của một tài sản"
      ]
    },
    {
      "fromDay": 170,
      "fromTitle": "Efficient Frontier là gì?",
      "text": "Efficient Frontier: tập hợp các danh mục tối ưu cho mỗi mức rủi ro",
      "distractors": [
        "Quá cao cũng có thể là tín hiệu quản lý vốn kém",
        "Fisher Equation: (1+r) = (1+n)/(1+π)"
      ]
    }
  ],
  "183": [
    {
      "fromDay": 178,
      "fromTitle": "Hedge Fund là gì?",
      "text": "Hedge fund: quỹ tư nhân linh hoạt, ít bị ràng buộc quy định hơn mutual fund/ETF",
      "distractors": [
        "FCFE: dòng tiền tự do còn lại chỉ thuộc về cổ đông, sau nghĩa vụ nợ",
        "Lập giấy vay nợ rõ ràng (số tiền, lãi suất nếu có, lịch trả, chữ ký hai bên) là cách bảo vệ quan hệ, không phải thiếu tin tưởng"
      ]
    },
    {
      "fromDay": 171,
      "fromTitle": "Sharpe Ratio là gì?",
      "text": "Sharpe Ratio = (Return − Risk-free rate) / Độ lệch chuẩn",
      "distractors": [
        "Là chỉ số kém chính xác nhất vì bỏ qua hoàn toàn khả năng sinh lời",
        "Hầu hết doanh nghiệp lớn bắt buộc dùng accrual"
      ]
    }
  ],
  "184": [
    {
      "fromDay": 179,
      "fromTitle": "nhỏ — Xây danh mục 3 tài sản",
      "text": "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản",
      "distractors": [
        "50/30/20: 50% nhu cầu thiết yếu, 30% mong muốn, 20% tiết kiệm & trả nợ — tính trên thu nhập sau thuế",
        "Người còn trẻ, còn nhiều thời gian đầu tư, thường được khuyên ưu tiên cổ phiếu hơn để tận dụng tăng trưởng dài hạn, và tăng dần tỷ trọng trái phiếu khi lớn tuổi hơn"
      ]
    },
    {
      "fromDay": 172,
      "fromTitle": "Alpha là gì?",
      "text": "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
      "distractors": [
        "ROE: hiệu quả dùng vốn cổ đông để tạo lợi nhuận — càng cao càng tốt trong cùng ngành",
        "Chặng 0 hoàn chỉnh gồm: biết tài sản ròng, biết khẩu vị rủi ro, có ngân sách, có quỹ khẩn cấp, có chiến lược trả nợ, có sinking fund cho mục tiêu lớn"
      ]
    }
  ],
  "185": [
    {
      "fromDay": 180,
      "fromTitle": "Tổng ôn Chặng 9 — Đầu tư là quản lý rủi ro, không chỉ săn lợi nhuận",
      "text": "Đầu tư thành công là quản lý rủi ro có hệ thống, không chỉ săn lợi nhuận cao nhất",
      "distractors": [
        "Phù hợp nhất với ngân hàng, bảo hiểm, BĐS",
        "Spread mở rộng = thị trường lo ngại rủi ro vỡ nợ tăng"
      ]
    },
    {
      "fromDay": 173,
      "fromTitle": "Beta trong danh mục",
      "text": "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường",
      "distractors": [
        "ROE cao do nợ (đòn bẩy) khác ROE cao do hiệu quả thực sự",
        "Dùng YTM của trái phiếu hiện tại, không dùng lãi suất hợp đồng cũ"
      ]
    }
  ],
  "186": [
    {
      "fromDay": 181,
      "fromTitle": "Derivatives là gì?",
      "text": "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác",
      "distractors": [
        "FOMO (sợ bỏ lỡ) là một biểu hiện phổ biến của lòng tham, khiến nhà đầu tư mua vào khi giá đã tăng nóng mà không phân tích giá trị thực",
        "Tiền là phương tiện trao đổi, có thanh khoản tuyệt đối"
      ]
    },
    {
      "fromDay": 174,
      "fromTitle": "Tracking Error là gì?",
      "text": "Tracking Error: đo mức độ lệch giữa lợi suất quỹ và benchmark nó theo dõi",
      "distractors": [
        "Một chỉ số đơn lẻ (như P/E) không bao giờ đủ để ra quyết định đầu tư",
        "Current assets: tiền mặt, AR, hàng tồn kho — thanh khoản trong 1 năm"
      ]
    }
  ],
  "187": [
    {
      "fromDay": 182,
      "fromTitle": "Forward Contract là gì?",
      "text": "Forward: hợp đồng riêng tư (OTC), khóa giá mua/bán trong tương lai",
      "distractors": [
        "Cổ phiếu: chứng nhận quyền sở hữu một phần doanh nghiệp",
        "Vay làm giàu khi ROI đầu tư lớn hơn lãi suất vay (spread dương)"
      ]
    },
    {
      "fromDay": 175,
      "fromTitle": "Active vs Passive Investing",
      "text": "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
      "distractors": [
        "Tài chính là phân bổ nguồn lực trong thời gian và bất định",
        "P&L đi từ Revenue xuống Net Income"
      ]
    }
  ],
  "188": [
    {
      "fromDay": 183,
      "fromTitle": "Futures Contract là gì?",
      "text": "Futures: chuẩn hóa, giao dịch qua sàn, có clearing house đảm bảo",
      "distractors": [
        "Deferred revenue = tiền nhận trước → tốt cho OCF",
        "Phù hợp với nhu cầu hedging tùy chỉnh của từng doanh nghiệp"
      ]
    },
    {
      "fromDay": 176,
      "fromTitle": "ETF là gì?",
      "text": "ETF: quỹ chứa rổ tài sản nhưng giao dịch linh hoạt như một cổ phiếu",
      "distractors": [
        "DCA phù hợp nhất với người có thu nhập đều đặn, muốn xây dựng kỷ luật đầu tư dài hạn mà không cần đoán thời điểm thị trường",
        "Chặng 0 hoàn chỉnh gồm: biết tài sản ròng, biết khẩu vị rủi ro, có ngân sách, có quỹ khẩn cấp, có chiến lược trả nợ, có sinking fund cho mục tiêu lớn"
      ]
    }
  ],
  "189": [
    {
      "fromDay": 184,
      "fromTitle": "Option là gì?",
      "text": "Option: quyền (không phải nghĩa vụ) mua/bán ở strike price",
      "distractors": [
        "Lợi nhuận cao bất thường, ổn định, không rủi ro là dấu hiệu cảnh báo mô hình lừa đảo đa cấp/Ponzi",
        "Nhược điểm: giả định tái đầu tư không thực tế; nhiều IRR có thể xảy ra"
      ]
    },
    {
      "fromDay": 177,
      "fromTitle": "Mutual Fund là gì?",
      "text": "Mutual Fund: quỹ tương hỗ, định giá và giao dịch một lần mỗi ngày theo NAV",
      "distractors": [
        "NPV > 0: tạo giá trị; NPV < 0: phá hủy giá trị",
        "Nhược: không matching, dễ bóp méo lợi nhuận"
      ]
    }
  ],
  "190": [
    {
      "fromDay": 185,
      "fromTitle": "Call Option là gì?",
      "text": "Call option: quyền mua ở strike price, có lợi khi giá tăng",
      "distractors": [
        "Beta = độ biến động tương đối so với thị trường",
        "Tax shield = Lãi vay × Thuế suất"
      ]
    },
    {
      "fromDay": 178,
      "fromTitle": "Hedge Fund là gì?",
      "text": "Hedge fund: quỹ tư nhân linh hoạt, ít bị ràng buộc quy định hơn mutual fund/ETF",
      "distractors": [
        "Giảm CCC = giải phóng vốn, cải thiện FCF",
        "Rủi ro tỷ giá là yếu tố đặc thù: lợi nhuận thực tế = lợi nhuận tài sản kết hợp với biến động tỷ giá"
      ]
    }
  ],
  "191": [
    {
      "fromDay": 186,
      "fromTitle": "Put Option là gì?",
      "text": "Put option: quyền bán ở strike price, có lợi khi giá giảm",
      "distractors": [
        "Chính phủ cân bằng tăng trưởng, ổn định và phân phối công bằng",
        "Cash accounting: ghi nhận khi thực sự nhận tiền"
      ]
    },
    {
      "fromDay": 179,
      "fromTitle": "nhỏ — Xây danh mục 3 tài sản",
      "text": "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản",
      "distractors": [
        "SG&A = chi phí vận hành gián tiếp (bán hàng + quản lý)",
        "Avalanche (theo lãi suất cao → thấp) tối ưu về tiền; Snowball (theo số dư nhỏ → lớn) tối ưu về động lực — chọn theo con người thật của bạn"
      ]
    }
  ],
  "192": [
    {
      "fromDay": 187,
      "fromTitle": "Strike Price và Expiration Date",
      "text": "Strike price gần giá thị trường hơn → premium cao hơn (với option có lợi)",
      "distractors": [
        "Thực tế: Trade-off giữa tax shield và financial distress",
        "P/E cao không tự động là 'đắt' nếu tăng trưởng đủ nhanh và bền vững"
      ]
    },
    {
      "fromDay": 180,
      "fromTitle": "Tổng ôn Chặng 9 — Đầu tư là quản lý rủi ro, không chỉ săn lợi nhuận",
      "text": "Đầu tư thành công là quản lý rủi ro có hệ thống, không chỉ săn lợi nhuận cao nhất",
      "distractors": [
        "Khi một bậc đáo hạn, thường tái đầu tư vào kỳ hạn dài nhất trong ladder để duy trì cấu trúc liên tục qua thời gian",
        "Mục tiêu: tối đa hóa giá trị doanh nghiệp"
      ]
    }
  ],
  "193": [
    {
      "fromDay": 188,
      "fromTitle": "Intrinsic Value và Time Value",
      "text": "Option Price = Intrinsic Value + Time Value",
      "distractors": [
        "Deepfake AI giả mạo hình ảnh/giọng nói là hình thức lừa đảo mới đang gia tăng — luôn xác minh qua kênh độc lập trước khi chuyển tiền theo yêu cầu khẩn cấp",
        "Hầu hết doanh nghiệp lớn bắt buộc dùng accrual"
      ]
    },
    {
      "fromDay": 181,
      "fromTitle": "Derivatives là gì?",
      "text": "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác",
      "distractors": [
        "Trước khi phân bổ vốn vào trái phiếu, cần xác định rõ mục tiêu sử dụng tiền, thời điểm cần dùng, và mức độ chấp nhận rủi ro",
        "Bốn loại chính: Forward, Futures, Options, Swaps"
      ]
    }
  ],
  "194": [
    {
      "fromDay": 189,
      "fromTitle": "Hedging là gì?",
      "text": "Hedging: giảm rủi ro đã có sẵn, không tạo thêm rủi ro mới",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
        "Ưu tiên tư vấn viên tính phí rõ ràng (theo giờ/gói dịch vụ) thay vì chỉ nhận hoa hồng bán sản phẩm, để giảm xung đột lợi ích"
      ]
    },
    {
      "fromDay": 182,
      "fromTitle": "Forward Contract là gì?",
      "text": "Forward: hợp đồng riêng tư (OTC), khóa giá mua/bán trong tương lai",
      "distractors": [
        "Công cụ quan trọng cho doanh nghiệp có nợ và doanh thu bằng các đồng tiền khác nhau",
        "Lợi ích: huy động vốn lớn, exit cho founders/VC"
      ]
    }
  ],
  "195": [
    {
      "fromDay": 190,
      "fromTitle": "Speculation là gì?",
      "text": "Speculation: đặt cược vào hướng giá để kiếm lời, không có rủi ro nền tảng cần bảo vệ",
      "distractors": [
        "Rủi ro: không miễn phí, cần được định giá, đa dạng hóa loại bỏ rủi ro đặc thù",
        "Đặt lệnh mua/bán cần chú ý mức giá và loại lệnh (giá thị trường, giá giới hạn) để hiểu lệnh có khớp được hay không"
      ]
    },
    {
      "fromDay": 183,
      "fromTitle": "Futures Contract là gì?",
      "text": "Futures: chuẩn hóa, giao dịch qua sàn, có clearing house đảm bảo",
      "distractors": [
        "Công thức đơn giản PV = FV / (1+r) cho thấy: r càng lớn, PV càng nhỏ — đây là nguồn gốc toán học của quy luật lãi suất và giá trái phiếu nghịch chiều",
        "Mark-to-market: thanh toán lãi/lỗ hàng ngày, giảm rủi ro đối tác"
      ]
    }
  ],
  "196": [
    {
      "fromDay": 191,
      "fromTitle": "Swap là gì?",
      "text": "Swap: hoán đổi dòng tiền tương lai theo công thức đã thỏa thuận",
      "distractors": [
        "Asset mix ảnh hưởng đến tính thanh khoản và rủi ro",
        "Chặng 2 xoay quanh bốn trụ cột liên kết chặt chẽ: công cụ đầu tư và định giá (ETF, quỹ mở, P/E), quản trị rủi ro (đa dạng hóa, tránh đòn bẩy), kỷ luật tâm lý (tránh tham lam/sợ hãi, DCA), và kỳ vọng thực tế (8-12%/năm dài hạn, không phải làm giàu nhanh)"
      ]
    },
    {
      "fromDay": 184,
      "fromTitle": "Option là gì?",
      "text": "Option: quyền (không phải nghĩa vụ) mua/bán ở strike price",
      "distractors": [
        "IPO = lần đầu bán cổ phiếu ra công chúng",
        "Swap: hoán đổi dòng tiền tương lai theo công thức đã thỏa thuận"
      ]
    }
  ],
  "197": [
    {
      "fromDay": 192,
      "fromTitle": "Interest Rate Swap",
      "text": "IRS: hoán đổi dòng lãi suất cố định và thả nổi giữa hai bên",
      "distractors": [
        "Hữu ích khi định giá công ty trong bối cảnh sáp nhập hoặc mua lại toàn bộ",
        "Double-entry: mỗi giao dịch ghi hai chiều"
      ]
    },
    {
      "fromDay": 185,
      "fromTitle": "Call Option là gì?",
      "text": "Call option: quyền mua ở strike price, có lợi khi giá tăng",
      "distractors": [
        "Đóng góp vào quỹ hưu trí bổ sung tự nguyện (Nghị định 88/2016/NĐ-CP) được giảm trừ thuế TNCN trong hạn mức quy định",
        "Lãi suất tăng → giá trái phiếu giảm (và ngược lại)"
      ]
    }
  ],
  "198": [
    {
      "fromDay": 193,
      "fromTitle": "Currency Swap",
      "text": "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau",
      "distractors": [
        "Nguyên tắc trực quan: kỳ hạn càng dài, duration càng lớn, giá trái phiếu càng biến động mạnh khi lãi suất thay đổi",
        "Buyback giảm equity — companies với buyback lớn có thể có equity âm"
      ]
    },
    {
      "fromDay": 186,
      "fromTitle": "Put Option là gì?",
      "text": "Put option: quyền bán ở strike price, có lợi khi giá giảm",
      "distractors": [
        "MPT: nền tảng toán học để xây dựng danh mục tối ưu dựa trên return, risk, correlation",
        "Người bán option có nghĩa vụ, người mua chỉ có quyền — rủi ro bất đối xứng"
      ]
    }
  ],
  "199": [
    {
      "fromDay": 194,
      "fromTitle": "Vì sao doanh nghiệp dùng phái sinh để phòng hộ?",
      "text": "Mục tiêu hedging: giảm bất định, không phải tối đa hóa lợi nhuận",
      "distractors": [
        "Ước lượng nhanh: mục tiêu tích lũy tham khảo = (chi tiêu hàng năm dự kiến khi hưu trí - lương hưu BHXH ước tính) x 25",
        "Ước tính nhanh: tài sản cần có ≈ 25 × chi phí sinh hoạt hàng năm (dựa trên quy tắc rút 4%)"
      ]
    },
    {
      "fromDay": 187,
      "fromTitle": "Strike Price và Expiration Date",
      "text": "Strike price gần giá thị trường hơn → premium cao hơn (với option có lợi)",
      "distractors": [
        "Là tiêu chí quan trọng để đánh giá chất lượng vận hành của quỹ ETF/index",
        "Dòng tiền: sức khỏe tài chính thực tế, quan trọng hơn lợi nhuận kế toán"
      ]
    }
  ],
  "200": [
    {
      "fromDay": 195,
      "fromTitle": "Vì sao phái sinh có thể rất nguy hiểm?",
      "text": "Đòn bẩy cao khuếch đại cả lãi và lỗ trên vốn bỏ ra",
      "distractors": [
        "Là phương pháp định giá tuyệt đối, độc lập với định giá thị trường của công ty khác",
        "D/E = Total Debt / Equity — đo đòn bẩy tài chính"
      ]
    },
    {
      "fromDay": 188,
      "fromTitle": "Intrinsic Value và Time Value",
      "text": "Option Price = Intrinsic Value + Time Value",
      "distractors": [
        "VFF (VinaCapital) và TCBF (Techcom Capital) là hai quỹ trái phiếu mở phổ biến tại Việt Nam cho nhà đầu tư cá nhân, nhưng NAV vẫn có thể biến động nhẹ, không cố định như lãi suất tiết kiệm",
        "Diversification, correlation và các thước đo risk-adjusted return là bộ công cụ cốt lõi"
      ]
    }
  ],
  "201": [
    {
      "fromDay": 19,
      "fromTitle": "Thị trường tài chính là gì?",
      "text": "Giá thị trường phản ánh kỳ vọng tổng hợp của tất cả người tham gia",
      "distractors": [
        "So sánh trong ngành — mỗi ngành có benchmark khác nhau",
        "Nợ dài hạn: thời gian trả dài hơn, thường lãi cao hơn"
      ]
    },
    {
      "fromDay": 12,
      "fromTitle": "Lợi nhuận kỳ vọng là gì?",
      "text": "Expected Return = tổng (xác suất x kết quả) của mọi kịch bản",
      "distractors": [
        "Bất động sản đầu tư (mua để cho thuê) khác hẳn về bản chất tài chính: có dòng tiền thực sự từ tiền thuê",
        "Hedging = risk management, not speculation"
      ]
    }
  ],
  "202": [
    {
      "fromDay": 20,
      "fromTitle": "Tổng ôn chặng 1: tiền, thời gian, rủi ro, dòng tiền.",
      "text": "Tiền: phương tiện trao đổi, mất giá theo lạm phát",
      "distractors": [
        "Market Risk Premium = Rm − Rf (~5-7% lịch sử Mỹ)",
        "Đổi lại vốn huy động được, công ty đại chúng phải minh bạch thông tin tài chính định kỳ cho nhà đầu tư"
      ]
    },
    {
      "fromDay": 13,
      "fromTitle": "Thanh khoản là gì? Tài sản dễ bán và khó bán.",
      "text": "Thanh khoản: khả năng bán nhanh mà không mất nhiều giá trị",
      "distractors": [
        "Ba quyết định: Đầu tư, Tài trợ, Phân phối",
        "Không có kế hoạch đầu tư rõ ràng từ đầu là gốc rễ khiến nhà đầu tư dễ bị cuốn theo tin đồn và biến động ngắn hạn"
      ]
    }
  ],
  "203": [
    {
      "fromDay": 212,
      "fromTitle": "Tâm lý trong đầu tư: lòng tham và sợ hãi",
      "text": "Sợ hãi khiến nhà đầu tư bán tháo trong hoảng loạn ở vùng giá thấp; lòng tham khiến nhà đầu tư mua đuổi hoặc dùng đòn bẩy quá mức ở vùng giá cao",
      "distractors": [
        "Net Income là bottom line — nhưng chỉ là con số kế toán",
        "Nên so sánh P/E của một công ty với chính nó trong quá khứ và với các công ty cùng ngành, không so sánh công ty khác ngành với nhau"
      ]
    },
    {
      "fromDay": 14,
      "fromTitle": "Nợ tốt và nợ xấu.",
      "text": "Nợ tốt: dùng để mua tài sản sinh lợi cao hơn lãi vay",
      "distractors": [
        "Time Value giảm dần về 0 khi tiến gần ngày đáo hạn (time decay)",
        "QE: bơm tiền khi lãi suất đã về 0"
      ]
    }
  ],
  "204": [
    {
      "fromDay": 213,
      "fromTitle": "Sai lầm phổ biến của nhà đầu tư mới",
      "text": "Ba sai lầm phổ biến nhất của nhà đầu tư mới: dồn hết vốn vào một mã, dùng đòn bẩy (margin) quá mức, và tin theo 'phím hàng' thiếu kiểm chứng",
      "distractors": [
        "Phản ánh chi phí thực sự để mua đứt toàn bộ hoạt động kinh doanh của công ty",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 15,
      "fromTitle": "Đòn bẩy tài chính là gì?",
      "text": "Đòn bẩy khuếch đại cả lợi nhuận lẫn thua lỗ so với vốn tự có",
      "distractors": [
        "ETF theo dõi chỉ số rộng (như VN30) thường phù hợp làm nền tảng danh mục cho người mới hơn là ETF chuyên biệt theo một ngành hẹp",
        "Speculation: đặt cược vào hướng giá để kiếm lời, không có rủi ro nền tảng cần bảo vệ"
      ]
    }
  ],
  "205": [
    {
      "fromDay": 214,
      "fromTitle": "Kỳ vọng lợi nhuận thực tế từ cổ phiếu",
      "text": "Lợi nhuận trung bình dài hạn của thị trường chứng khoán (kể cả VN-Index) thường ở mức khoảng 8-12%/năm khi tính lãi kép qua nhiều năm, không phải 50-100%/năm như những câu chuyện thường được kể",
      "distractors": [
        "CAGR (tốc độ tăng trưởng kép bình quân) phản ánh hiệu suất thực tế chính xác hơn việc chỉ nhìn vào năm tốt nhất",
        "Tái cân bằng là đưa danh mục về đúng tỷ trọng mục tiêu ban đầu sau khi thị trường làm lệch tỷ lệ"
      ]
    },
    {
      "fromDay": 16,
      "fromTitle": "Vì sao người vay tiền có thể giàu lên hoặc phá sản.",
      "text": "Vay làm giàu khi ROI đầu tư lớn hơn lãi suất vay (spread dương)",
      "distractors": [
        "DTI: theo dõi tỷ lệ nợ/thu nhập để giữ sức khỏe tài chính",
        "Bị ảnh hưởng bởi chính sách vay/trả nợ của công ty trong từng kỳ, cần thận trọng khi diễn giải"
      ]
    }
  ],
  "206": [
    {
      "fromDay": 201,
      "fromTitle": "Cổ phiếu là gì? Tại sao người mới nên hiểu cổ phiếu",
      "text": "Mua cổ phiếu là mua một phần sở hữu thật của công ty, không phải cho vay hay cá cược",
      "distractors": [
        "Khắt khe và thực tế hơn Current Ratio",
        "Không xấu về bản chất — cung cấp thanh khoản cho thị trường phái sinh"
      ]
    },
    {
      "fromDay": 17,
      "fromTitle": "Cá nhân, doanh nghiệp và chính phủ quản lý tiền khác nhau ra sao.",
      "text": "Cá nhân tối ưu tiêu dùng và tích lũy trong vòng đời",
      "distractors": [
        "Hiểu bản chất chuyển giao rủi ro giúp đánh giá đúng bất kỳ sản phẩm phái sinh mới nào trong tương lai",
        "Tái cân bằng vô tình tạo kỷ luật 'bán cao, mua thấp' một cách tự động, không cần dự đoán thị trường"
      ]
    }
  ],
  "207": [
    {
      "fromDay": 202,
      "fromTitle": "Công ty công khai vs công ty riêng tư",
      "text": "Công ty riêng tư (private) thuộc sở hữu của một nhóm nhỏ (gia đình, sáng lập viên, quỹ đầu tư); công ty đại chúng (public) bán cổ phần rộng rãi cho công chúng qua sàn chứng khoán",
      "distractors": [
        "Municipal bond: tài trợ hạ tầng công cộng ở cấp địa phương",
        "Gross Profit đo hiệu quả sản xuất/kinh doanh cốt lõi"
      ]
    },
    {
      "fromDay": 18,
      "fromTitle": "Hệ thống tài chính gồm những ai: ngân hàng, quỹ, công ty, nhà đầu tư.",
      "text": "Ngân hàng: trung gian tín dụng, huy động để cho vay",
      "distractors": [
        "Robo-advisor là dạng trung gian: quản lý tự động bằng thuật toán, chi phí thường thấp hơn quản lý truyền thống",
        "Quy tắc 72: số năm gấp đôi = 72 chia cho lãi suất"
      ]
    }
  ],
  "208": [
    {
      "fromDay": 203,
      "fromTitle": "Cách mua cổ phiếu",
      "text": "Muốn mua cổ phiếu, phải mở tài khoản tại một công ty chứng khoán được cấp phép, không mua trực tiếp từ công ty phát hành",
      "distractors": [
        "Lợi nhuận cao hơn luôn đi kèm rủi ro cao hơn, không có ngoại lệ",
        "Là chỉ số chuẩn để so sánh hiệu suất giữa các quỹ đầu tư khác nhau"
      ]
    },
    {
      "fromDay": 19,
      "fromTitle": "Thị trường tài chính là gì?",
      "text": "Giá thị trường phản ánh kỳ vọng tổng hợp của tất cả người tham gia",
      "distractors": [
        "Deepfake AI giả mạo hình ảnh/giọng nói là hình thức lừa đảo mới đang gia tăng — luôn xác minh qua kênh độc lập trước khi chuyển tiền theo yêu cầu khẩn cấp",
        "Lợi ích chính: giảm rủi ro tái đầu tư toàn bộ vốn cùng lúc ở mức lãi suất bất lợi, đồng thời có thanh khoản đều đặn mỗi năm"
      ]
    }
  ],
  "209": [
    {
      "fromDay": 204,
      "fromTitle": "Lợi nhuận từ cổ phiếu: lãi vốn và cổ tức",
      "text": "Cổ phiếu mang lại lợi nhuận qua hai kênh độc lập: lãi vốn (chênh lệch giá mua-bán) và cổ tức (chia lợi nhuận trực tiếp)",
      "distractors": [
        "Tái cân bằng về bản chất là 'bán cao, mua thấp' có kỷ luật, ngược với bản năng tâm lý tự nhiên",
        "Rủi ro lãi suất chỉ thực sự 'thiệt hại' nếu bạn phải bán trái phiếu trước khi đáo hạn ở mức giá bất lợi — giữ đến đáo hạn thì không bị ảnh hưởng"
      ]
    },
    {
      "fromDay": 20,
      "fromTitle": "Tổng ôn chặng 1: tiền, thời gian, rủi ro, dòng tiền.",
      "text": "Tiền: phương tiện trao đổi, mất giá theo lạm phát",
      "distractors": [
        "P/E = Price / EPS — trả bao nhiêu lần lợi nhuận",
        "VFF (VinaCapital) và TCBF (Techcom Capital) là hai quỹ trái phiếu mở phổ biến tại Việt Nam cho nhà đầu tư cá nhân, nhưng NAV vẫn có thể biến động nhẹ, không cố định như lãi suất tiết kiệm"
      ]
    }
  ],
  "210": [
    {
      "fromDay": 205,
      "fromTitle": "P/E ratio đơn giản: cổ phiếu rẻ hay đắt",
      "text": "Giá cổ phiếu một mình không nói lên gì về độ rẻ/đắt; P/E (giá chia lợi nhuận mỗi cổ phiếu) mới là thước đo so sánh công bằng hơn",
      "distractors": [
        "ROIC > WACC → tạo value",
        "Đây là khung tham khảo, không phải luật cứng — điều chỉnh theo hoàn cảnh nhưng nên biết mình đang lệch ở đâu"
      ]
    },
    {
      "fromDay": 212,
      "fromTitle": "Tâm lý trong đầu tư: lòng tham và sợ hãi",
      "text": "Sợ hãi khiến nhà đầu tư bán tháo trong hoảng loạn ở vùng giá thấp; lòng tham khiến nhà đầu tư mua đuổi hoặc dùng đòn bẩy quá mức ở vùng giá cao",
      "distractors": [
        "Tài sản có correlation âm/thấp với phần còn lại có giá trị bảo vệ danh mục cao",
        "EBIT đo hiệu quả hoạt động, độc lập với cơ cấu vốn"
      ]
    }
  ],
  "211": [
    {
      "fromDay": 206,
      "fromTitle": "ETF là gì? Tại sao nó an toàn hơn cổ phiếu riêng lẻ",
      "text": "ETF là quỹ nắm giữ nhiều cổ phiếu (hoặc tài sản khác) cùng lúc, nhưng giao dịch dễ dàng như một cổ phiếu đơn lẻ trên sàn",
      "distractors": [
        "WC = Tài sản ngắn hạn − Nợ ngắn hạn",
        "Cả hai phương pháp đều yêu cầu: trả tối thiểu mọi khoản khác, dồn phần dư vào khoản ưu tiên"
      ]
    },
    {
      "fromDay": 213,
      "fromTitle": "Sai lầm phổ biến của nhà đầu tư mới",
      "text": "Ba sai lầm phổ biến nhất của nhà đầu tư mới: dồn hết vốn vào một mã, dùng đòn bẩy (margin) quá mức, và tin theo 'phím hàng' thiếu kiểm chứng",
      "distractors": [
        "Chiết khấu bằng Cost of Equity, cho ra trực tiếp Equity Value",
        "Equity gồm: common stock, APIC, retained earnings, treasury stock"
      ]
    }
  ],
  "212": [
    {
      "fromDay": 16,
      "fromTitle": "Vì sao người vay tiền có thể giàu lên hoặc phá sản.",
      "text": "Vay làm giàu khi ROI đầu tư lớn hơn lãi suất vay (spread dương)",
      "distractors": [
        "P/E cao hơn thường phản ánh kỳ vọng tăng trưởng cao hơn, không hẳn là 'đắt' một cách tuyệt đối",
        "Chặng 4 xây hai lớp: BẢO VỆ (quỹ khẩn cấp, bảo hiểm, bảo mật trước lừa đảo) và TỔ CHỨC (ngân sách, tờ khai tài chính, thừa kế, biết khi nào cần tư vấn chuyên nghiệp)"
      ]
    },
    {
      "fromDay": 9,
      "fromTitle": "Lạm phát là gì? Vì sao tiền mất giá.",
      "text": "Lạm phát làm tiền mất sức mua theo thời gian, tích lũy theo năm",
      "distractors": [
        "Nhóm chiến lược và ứng dụng thực tế (Day 236-239): chiến lược ladder, khi nào nên ưu tiên trái phiếu, các sản phẩm liên quan (CD, bảo hiểm liên kết đầu tư), và case phân bổ danh mục cụ thể",
        "Có kế hoạch đầu tư rõ ràng từ trước và tuân thủ kỷ luật là cách hiệu quả nhất để giảm ảnh hưởng của cảm xúc lên quyết định"
      ]
    }
  ],
  "213": [
    {
      "fromDay": 17,
      "fromTitle": "Cá nhân, doanh nghiệp và chính phủ quản lý tiền khác nhau ra sao.",
      "text": "Cá nhân tối ưu tiêu dùng và tích lũy trong vòng đời",
      "distractors": [
        "Lập giấy vay nợ rõ ràng (số tiền, lãi suất nếu có, lịch trả, chữ ký hai bên) là cách bảo vệ quan hệ, không phải thiếu tin tưởng",
        "WC = Tài sản ngắn hạn − Nợ ngắn hạn"
      ]
    },
    {
      "fromDay": 10,
      "fromTitle": "Giá trị thời gian của tiền: 1 triệu hôm nay khác 1 triệu năm sau.",
      "text": "Tiền hôm nay đáng giá hơn cùng số tiền trong tương lai",
      "distractors": [
        "Speculation: đặt cược vào hướng giá để kiếm lời, không có rủi ro nền tảng cần bảo vệ",
        "Cao hơn = tạo doanh thu hiệu quả hơn từ tài sản"
      ]
    }
  ],
  "214": [
    {
      "fromDay": 18,
      "fromTitle": "Hệ thống tài chính gồm những ai: ngân hàng, quỹ, công ty, nhà đầu tư.",
      "text": "Ngân hàng: trung gian tín dụng, huy động để cho vay",
      "distractors": [
        "Giá cổ phiếu chỉ là biểu hiện thị trường của quyền lợi kinh tế thực sự bên dưới",
        "DCA có giá trị tâm lý thực sự: giảm cảm giác hối tiếc nếu mua đúng đỉnh, phù hợp với dòng tiền lương hàng tháng"
      ]
    },
    {
      "fromDay": 11,
      "fromTitle": "Rủi ro là gì? Không có lợi nhuận nào miễn phí.",
      "text": "Lợi nhuận cao hơn luôn đi kèm rủi ro cao hơn, không có ngoại lệ",
      "distractors": [
        "Giá trị nội tại (value): ước tính dựa trên phân tích cơ bản dài hạn",
        "Market Cap = Giá cổ phiếu × Số lượng cổ phiếu đang lưu hành"
      ]
    }
  ],
  "215": [
    {
      "fromDay": 207,
      "fromTitle": "Quỹ chỉ số: theo dõi thị trường",
      "text": "Quỹ chỉ số mô phỏng hiệu suất của một chỉ số tham chiếu (VN30, S&P 500...), không cố gắng chọn lọc cổ phiếu để vượt trội hơn thị trường",
      "distractors": [
        "Swap dealer (ngân hàng đầu tư) đóng vai trò trung gian, market maker cho thị trường",
        "EBIT đo hiệu quả hoạt động, độc lập với cơ cấu vốn"
      ]
    },
    {
      "fromDay": 214,
      "fromTitle": "Kỳ vọng lợi nhuận thực tế từ cổ phiếu",
      "text": "Lợi nhuận trung bình dài hạn của thị trường chứng khoán (kể cả VN-Index) thường ở mức khoảng 8-12%/năm khi tính lãi kép qua nhiều năm, không phải 50-100%/năm như những câu chuyện thường được kể",
      "distractors": [
        "Đòn bẩy cao + biến động thị trường = rủi ro phá sản",
        "Operating Income = Gross Profit − SG&A − R&D"
      ]
    }
  ],
  "216": [
    {
      "fromDay": 208,
      "fromTitle": "Quỹ chủ động: chuyên gia quản lý",
      "text": "Quỹ chủ động thuê chuyên gia phân tích tự chọn cổ phiếu, với mục tiêu vượt trội hơn thị trường, khác với quỹ chỉ số mô phỏng máy móc",
      "distractors": [
        "Mỗi tầng phản ánh hiệu quả hoạt động khác nhau",
        "Lãi cao = rủi ro cao — không phải 'lợi suất tốt hơn tiền gửi'"
      ]
    },
    {
      "fromDay": 201,
      "fromTitle": "Cổ phiếu là gì? Tại sao người mới nên hiểu cổ phiếu",
      "text": "Mua cổ phiếu là mua một phần sở hữu thật của công ty, không phải cho vay hay cá cược",
      "distractors": [
        "Chứng chỉ tiền gửi (CD) là giấy tờ có giá do ngân hàng phát hành, gần giống tiết kiệm có kỳ hạn nhưng có thể chuyển nhượng và thường lãi suất nhỉnh hơn",
        "Năng lực thực sự là khả năng nhìn thấy mối liên kết giữa các lớp, không chỉ thuộc từng công thức riêng lẻ"
      ]
    }
  ],
  "217": [
    {
      "fromDay": 209,
      "fromTitle": "Phí quỹ: chi phí ẩn mà bạn phải trả",
      "text": "Expense ratio là phí vận hành quỹ trừ dần hàng năm vào tài sản, âm thầm nhưng có thật, dù nhà đầu tư không thấy khoản trừ trực tiếp",
      "distractors": [
        "Chi tiêu hàng năm càng thấp, số tiền cần tích lũy càng ít — kiểm soát chi tiêu quan trọng ngang tích lũy tài sản",
        "Nguyên tắc này tự động phát hiện nhiều loại sai sót"
      ]
    },
    {
      "fromDay": 202,
      "fromTitle": "Công ty công khai vs công ty riêng tư",
      "text": "Công ty riêng tư (private) thuộc sở hữu của một nhóm nhỏ (gia đình, sáng lập viên, quỹ đầu tư); công ty đại chúng (public) bán cổ phần rộng rãi cho công chúng qua sàn chứng khoán",
      "distractors": [
        "Payback: đơn giản, đo thanh khoản — dùng như metric phụ",
        "Tăng tỷ trọng tài sản lợi nhuận cao hơn sẽ kéo expected return tổng thể lên, kèm rủi ro tăng theo"
      ]
    }
  ],
  "218": [
    {
      "fromDay": 210,
      "fromTitle": "Cách chọn ETF phù hợp với bạn",
      "text": "Bốn tiêu chí cốt lõi khi chọn ETF: phí quản lý (expense ratio), thanh khoản giao dịch, quy mô quỹ (AUM), và tài sản/chỉ số theo dõi có phù hợp mục tiêu đầu tư hay không",
      "distractors": [
        "ROIC = NOPAT / (Debt + Equity − Cash)",
        "NI dương + FCF âm = cần điều tra sâu hơn"
      ]
    },
    {
      "fromDay": 203,
      "fromTitle": "Cách mua cổ phiếu",
      "text": "Muốn mua cổ phiếu, phải mở tài khoản tại một công ty chứng khoán được cấp phép, không mua trực tiếp từ công ty phát hành",
      "distractors": [
        "DTI: theo dõi tỷ lệ nợ/thu nhập để giữ sức khỏe tài chính",
        "Khi so sánh lợi suất giữa các kênh đầu tư (gửi tiết kiệm, trái phiếu, chứng chỉ quỹ), cần so sánh lợi suất sau thuế thay vì chỉ nhìn con số lãi suất công bố trên giấy tờ"
      ]
    }
  ],
  "219": [
    {
      "fromDay": 211,
      "fromTitle": "DCA: đầu tư định kỳ hơn là đầu tư một lần",
      "text": "DCA (Dollar-Cost Averaging) là chia vốn thành nhiều phần, đầu tư đều đặn theo định kỳ thay vì bỏ hết vào một lần",
      "distractors": [
        "Chặng 5 là nền tảng chiến lược đầu tư — Chặng 6 sẽ mở rộng sang quản lý tài sản dài hạn và hưu trí",
        "Khẩu vị rủi ro có thể thay đổi theo thời gian, hoàn cảnh sống và kinh nghiệm đầu tư — nên đánh giá lại định kỳ"
      ]
    },
    {
      "fromDay": 204,
      "fromTitle": "Lợi nhuận từ cổ phiếu: lãi vốn và cổ tức",
      "text": "Cổ phiếu mang lại lợi nhuận qua hai kênh độc lập: lãi vốn (chênh lệch giá mua-bán) và cổ tức (chia lợi nhuận trực tiếp)",
      "distractors": [
        "NPV > 0: tạo giá trị; NPV < 0: phá hủy giá trị",
        "Ba luồng OCF + ICF + FCF = Net Change in Cash"
      ]
    }
  ],
  "220": [
    {
      "fromDay": 215,
      "fromTitle": "Rủi ro của cổ phiếu đơn lẻ vs danh mục",
      "text": "Rủi ro phi hệ thống (rủi ro riêng của từng doanh nghiệp/ngành) có thể giảm đáng kể bằng cách đa dạng hóa danh mục sang nhiều cổ phiếu, nhiều ngành khác nhau",
      "distractors": [
        "Khắt khe và thực tế hơn Current Ratio",
        "Tài sản có correlation âm/thấp với phần còn lại có giá trị bảo vệ danh mục cao"
      ]
    },
    {
      "fromDay": 205,
      "fromTitle": "P/E ratio đơn giản: cổ phiếu rẻ hay đắt",
      "text": "Giá cổ phiếu một mình không nói lên gì về độ rẻ/đắt; P/E (giá chia lợi nhuận mỗi cổ phiếu) mới là thước đo so sánh công bằng hơn",
      "distractors": [
        "PV = FV / (1+r)^n; FV = PV x (1+r)^n",
        "Hedging: giảm rủi ro đã có sẵn, không tạo thêm rủi ro mới"
      ]
    }
  ],
  "221": [
    {
      "fromDay": 216,
      "fromTitle": "Tính thuế trên lợi nhuận cổ phiếu",
      "text": "Thuế TNCN khi bán chứng khoán niêm yết ở Việt Nam là 0,1% trên TỔNG GIÁ TRỊ BÁN mỗi lần giao dịch, không phải trên phần lợi nhuận như thuế lãi vốn kiểu Mỹ",
      "distractors": [
        "Đóng góp vào quỹ hưu trí bổ sung tự nguyện (Nghị định 88/2016/NĐ-CP) được giảm trừ thuế TNCN trong hạn mức quy định",
        "Deferred Revenue là liability — quan trọng với SaaS, subscription"
      ]
    },
    {
      "fromDay": 206,
      "fromTitle": "ETF là gì? Tại sao nó an toàn hơn cổ phiếu riêng lẻ",
      "text": "ETF là quỹ nắm giữ nhiều cổ phiếu (hoặc tài sản khác) cùng lúc, nhưng giao dịch dễ dàng như một cổ phiếu đơn lẻ trên sàn",
      "distractors": [
        "Case study giúp áp dụng lý thuyết vào thực tế",
        "Bắt đầu sớm 10 năm có thể tạo kết quả tương đương hoặc vượt trội so với đóng nhiều tiền hơn nhưng bắt đầu muộn"
      ]
    }
  ],
  "222": [
    {
      "fromDay": 217,
      "fromTitle": "Tài khoản tự quản vs tài khoản được quản lý",
      "text": "Tài khoản tự quản (self-directed): nhà đầu tư tự nghiên cứu, tự đặt lệnh mua/bán, không mất phí quản lý hàng năm nhưng cần thời gian và kiến thức",
      "distractors": [
        "Việc tái cơ cấu danh mục diễn ra tự động theo công thức, không dựa vào phán đoán chủ quan của con người",
        "Ở Việt Nam có các ETF nội địa như E1VFVN30 (theo dõi VN30) do các công ty quản lý quỹ như Dragon Capital vận hành"
      ]
    },
    {
      "fromDay": 207,
      "fromTitle": "Quỹ chỉ số: theo dõi thị trường",
      "text": "Quỹ chỉ số mô phỏng hiệu suất của một chỉ số tham chiếu (VN30, S&P 500...), không cố gắng chọn lọc cổ phiếu để vượt trội hơn thị trường",
      "distractors": [
        "DTI: theo dõi tỷ lệ nợ/thu nhập để giữ sức khỏe tài chính",
        "WACC cao → NPV giảm → ít dự án được chấp thuận hơn"
      ]
    }
  ],
  "223": [
    {
      "fromDay": 218,
      "fromTitle": "Khi nào nên bán cổ phiếu?",
      "text": "Quyết định bán nên dựa trên việc luận điểm đầu tư ban đầu (nền tảng cơ bản doanh nghiệp) có còn đúng hay không, không nên chỉ dựa vào biến động giá ngắn hạn",
      "distractors": [
        "Giá cổ phiếu phản ánh kỳ vọng về tương lai kinh doanh của công ty, không phải con số ngẫu nhiên",
        "LTV/CAC ≥ 3: mô hình kinh doanh khả thi"
      ]
    },
    {
      "fromDay": 208,
      "fromTitle": "Quỹ chủ động: chuyên gia quản lý",
      "text": "Quỹ chủ động thuê chuyên gia phân tích tự chọn cổ phiếu, với mục tiêu vượt trội hơn thị trường, khác với quỹ chỉ số mô phỏng máy móc",
      "distractors": [
        "ICF dương = bán tài sản hoặc thu hồi đầu tư",
        "Hurdle rate = mức sinh lời tối thiểu cần đạt"
      ]
    }
  ],
  "224": [
    {
      "fromDay": 219,
      "fromTitle": "Phân tích một cổ phiếu đơn giản",
      "text": "Phân tích cổ phiếu cơ bản nên đi qua ít nhất bốn bước: xu hướng doanh thu/lợi nhuận nhiều năm, định giá (P/E so với ngành), cổ tức, và triển vọng ngành",
      "distractors": [
        "Công ty tăng trưởng nhanh thường ưu tiên tái đầu tư hơn là chia cổ tức; công ty ổn định (như Vinamilk) thường trả cổ tức đều đặn",
        "Nên so sánh P/E của một công ty với chính nó trong quá khứ và với các công ty cùng ngành, không so sánh công ty khác ngành với nhau"
      ]
    },
    {
      "fromDay": 209,
      "fromTitle": "Phí quỹ: chi phí ẩn mà bạn phải trả",
      "text": "Expense ratio là phí vận hành quỹ trừ dần hàng năm vào tài sản, âm thầm nhưng có thật, dù nhà đầu tư không thấy khoản trừ trực tiếp",
      "distractors": [
        "Trái phiếu cũng phù hợp làm phần 'giảm xóc' trong danh mục đa dạng, giúp giảm biến động tổng thể khi kết hợp với cổ phiếu",
        "Điều kiện: phải có underlying exposure thực tế cần bảo vệ"
      ]
    }
  ],
  "225": [
    {
      "fromDay": 220,
      "fromTitle": "Tổng ôn chặng 2: đầu tư chứng khoán cơ bản",
      "text": "Chặng 2 xoay quanh bốn trụ cột liên kết chặt chẽ: công cụ đầu tư và định giá (ETF, quỹ mở, P/E), quản trị rủi ro (đa dạng hóa, tránh đòn bẩy), kỷ luật tâm lý (tránh tham lam/sợ hãi, DCA), và kỳ vọng thực tế (8-12%/năm dài hạn, không phải làm giàu nhanh)",
      "distractors": [
        "Lập di chúc hợp lệ (đúng hình thức pháp luật) giúp thể hiện rõ ý nguyện và giảm nguy cơ tranh chấp gia đình",
        "WACC = Ke×(E/V) + Kd×(1−T)×(D/V)"
      ]
    },
    {
      "fromDay": 210,
      "fromTitle": "Cách chọn ETF phù hợp với bạn",
      "text": "Bốn tiêu chí cốt lõi khi chọn ETF: phí quản lý (expense ratio), thanh khoản giao dịch, quy mô quỹ (AUM), và tài sản/chỉ số theo dõi có phù hợp mục tiêu đầu tư hay không",
      "distractors": [
        "Yield curve đảo ngược: tín hiệu cảnh báo suy thoái kinh tế mạnh",
        "DSO cao = tiền kẹt lâu trong khoản phải thu"
      ]
    }
  ],
  "226": [
    {
      "fromDay": 221,
      "fromTitle": "Trái phiếu là gì? Cho ai vay tiền",
      "text": "Trái phiếu là chứng nhận cho vay: bạn cho chính phủ hoặc doanh nghiệp vay tiền, đổi lại nhận lãi định kỳ và hoàn vốn khi đáo hạn",
      "distractors": [
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)",
        "Tài sản ngắn hạn: chuyển thành tiền trong 12 tháng"
      ]
    },
    {
      "fromDay": 211,
      "fromTitle": "DCA: đầu tư định kỳ hơn là đầu tư một lần",
      "text": "DCA (Dollar-Cost Averaging) là chia vốn thành nhiều phần, đầu tư đều đặn theo định kỳ thay vì bỏ hết vào một lần",
      "distractors": [
        "Thực hành định giá chuyên nghiệp luôn kết hợp nhiều phương pháp, không chỉ dựa vào một con số",
        "Tài khoản tự quản (self-directed): nhà đầu tư tự nghiên cứu, tự đặt lệnh mua/bán, không mất phí quản lý hàng năm nhưng cần thời gian và kiến thức"
      ]
    }
  ],
  "227": [
    {
      "fromDay": 222,
      "fromTitle": "Trái phiếu chính phủ vs trái phiếu công ty",
      "text": "Trái phiếu Chính phủ được xem là an toàn nhất (rủi ro vỡ nợ gần như bằng 0), lãi suất thấp nhất, dùng làm chuẩn so sánh cho các loại trái phiếu khác",
      "distractors": [
        "Mua cổ phiếu là mua một phần sở hữu thật của công ty, không phải cho vay hay cá cược",
        "DTI: theo dõi tỷ lệ nợ/thu nhập để giữ sức khỏe tài chính"
      ]
    },
    {
      "fromDay": 215,
      "fromTitle": "Rủi ro của cổ phiếu đơn lẻ vs danh mục",
      "text": "Rủi ro phi hệ thống (rủi ro riêng của từng doanh nghiệp/ngành) có thể giảm đáng kể bằng cách đa dạng hóa danh mục sang nhiều cổ phiếu, nhiều ngành khác nhau",
      "distractors": [
        "Tài sản = những gì doanh nghiệp sở hữu và kiểm soát",
        "Nền tảng lý thuyết cho hầu hết các mô hình quản lý danh mục hiện đại"
      ]
    }
  ],
  "228": [
    {
      "fromDay": 223,
      "fromTitle": "Lãi suất và giá trái phiếu",
      "text": "Giá trái phiếu và lãi suất thị trường luôn biến động ngược chiều nhau: lãi suất tăng thì giá trái phiếu giảm, và ngược lại",
      "distractors": [
        "Lãi suất: công cụ điều hành kinh tế mạnh nhất",
        "YTM là tiêu chí so sánh trái phiếu, không phải coupon rate"
      ]
    },
    {
      "fromDay": 216,
      "fromTitle": "Tính thuế trên lợi nhuận cổ phiếu",
      "text": "Thuế TNCN khi bán chứng khoán niêm yết ở Việt Nam là 0,1% trên TỔNG GIÁ TRỊ BÁN mỗi lần giao dịch, không phải trên phần lợi nhuận như thuế lãi vốn kiểu Mỹ",
      "distractors": [
        "Đầu tư quốc tế giảm rủi ro tập trung vào một nền kinh tế/đồng tiền duy nhất",
        "WC = Tài sản ngắn hạn − Nợ ngắn hạn"
      ]
    }
  ],
  "229": [
    {
      "fromDay": 224,
      "fromTitle": "Rủi ro vỡ nợ: xếp hạng trái phiếu",
      "text": "Xếp hạng tín nhiệm (credit rating) đánh giá khả năng trả nợ đúng hạn của bên phát hành trái phiếu, từ AAA (an toàn nhất) xuống đến các mức rủi ro cao như CCC",
      "distractors": [
        "'Valuation football field' — dải giá trị từ nhiều phương pháp — là công cụ chuẩn trong thực hành định giá chuyên nghiệp",
        "Phổ biến trong định giá startup công nghệ giai đoạn tăng trưởng sớm"
      ]
    },
    {
      "fromDay": 217,
      "fromTitle": "Tài khoản tự quản vs tài khoản được quản lý",
      "text": "Tài khoản tự quản (self-directed): nhà đầu tư tự nghiên cứu, tự đặt lệnh mua/bán, không mất phí quản lý hàng năm nhưng cần thời gian và kiến thức",
      "distractors": [
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị",
        "Lãi kép: lãi trên lãi — sức mạnh thời gian"
      ]
    }
  ],
  "230": [
    {
      "fromDay": 225,
      "fromTitle": "Khi nào nên mua trái phiếu",
      "text": "Trái phiếu phù hợp khi mục tiêu là bảo toàn vốn, có dòng tiền lãi ổn định, hoặc khi bạn sắp cần dùng đến khoản tiền đó trong thời gian gần (vài năm tới)",
      "distractors": [
        "Lỗ kế toán ≠ hết tiền — D&A và WC tạo ra sự khác biệt",
        "Giảm phí không cần thiết (giao dịch quá thường xuyên, quỹ phí cao không tương xứng hiệu suất) là cách cải thiện lợi nhuận ròng dễ kiểm soát nhất"
      ]
    },
    {
      "fromDay": 218,
      "fromTitle": "Khi nào nên bán cổ phiếu?",
      "text": "Quyết định bán nên dựa trên việc luận điểm đầu tư ban đầu (nền tảng cơ bản doanh nghiệp) có còn đúng hay không, không nên chỉ dựa vào biến động giá ngắn hạn",
      "distractors": [
        "Mô hình Ponzi trả lãi người trước bằng tiền người sau, sụp đổ khi dòng tiền mới không đủ",
        "Power law: 1-2 unicorn bù cả danh mục"
      ]
    }
  ],
  "231": [
    {
      "fromDay": 226,
      "fromTitle": "Lợi suất trái phiếu vs cổ phiếu",
      "text": "Cổ phiếu thường có lợi nhuận trung bình cao hơn trái phiếu trong dài hạn, để đền bù cho rủi ro cao hơn — gọi là phần bù rủi ro cổ phiếu (equity risk premium)",
      "distractors": [
        "Đừng gián đoạn — liên tục là chìa khóa của compounding",
        "Bắt đầu sớm quan trọng hơn đầu tư nhiều về sau"
      ]
    },
    {
      "fromDay": 219,
      "fromTitle": "Phân tích một cổ phiếu đơn giản",
      "text": "Phân tích cổ phiếu cơ bản nên đi qua ít nhất bốn bước: xu hướng doanh thu/lợi nhuận nhiều năm, định giá (P/E so với ngành), cổ tức, và triển vọng ngành",
      "distractors": [
        "FCF = NOPAT × (1 − Growth/ROIC)",
        "ETF: quỹ chứa rổ tài sản nhưng giao dịch linh hoạt như một cổ phiếu"
      ]
    }
  ],
  "232": [
    {
      "fromDay": 227,
      "fromTitle": "Rủi ro lãi suất: giá trái phiếu thay đổi như thế nào",
      "text": "Trái phiếu kỳ hạn càng dài, giá càng nhạy cảm (biến động mạnh) với thay đổi lãi suất thị trường so với trái phiếu ngắn hạn",
      "distractors": [
        "Tài sản ròng = Tổng tài sản − Tổng nợ; phải liệt kê ĐẦY ĐỦ cả hai vế, kể cả nợ 'mềm' (thẻ tín dụng, vay người thân, trả góp)",
        "Apple: OCF mạnh, FCF gần bằng OCF, buyback liên tục"
      ]
    },
    {
      "fromDay": 220,
      "fromTitle": "Tổng ôn chặng 2: đầu tư chứng khoán cơ bản",
      "text": "Chặng 2 xoay quanh bốn trụ cột liên kết chặt chẽ: công cụ đầu tư và định giá (ETF, quỹ mở, P/E), quản trị rủi ro (đa dạng hóa, tránh đòn bẩy), kỷ luật tâm lý (tránh tham lam/sợ hãi, DCA), và kỳ vọng thực tế (8-12%/năm dài hạn, không phải làm giàu nhanh)",
      "distractors": [
        "Mục tiêu hedging: giảm bất định, không phải tối đa hóa lợi nhuận",
        "Discount rate = chi phí cơ hội + phần bù rủi ro"
      ]
    }
  ],
  "233": [
    {
      "fromDay": 228,
      "fromTitle": "Danh mục tối ưu: bao nhiêu trái phiếu bao nhiêu cổ phiếu",
      "text": "Quy tắc '100 trừ tuổi' là một điểm khởi đầu đơn giản: tỷ trọng cổ phiếu = 100 trừ đi tuổi của bạn, phần còn lại là trái phiếu và tài sản ổn định",
      "distractors": [
        "Trái phiếu cũng phù hợp làm phần 'giảm xóc' trong danh mục đa dạng, giúp giảm biến động tổng thể khi kết hợp với cổ phiếu",
        "P/E cao không tự động là 'đắt' nếu tăng trưởng đủ nhanh và bền vững"
      ]
    },
    {
      "fromDay": 221,
      "fromTitle": "Trái phiếu là gì? Cho ai vay tiền",
      "text": "Trái phiếu là chứng nhận cho vay: bạn cho chính phủ hoặc doanh nghiệp vay tiền, đổi lại nhận lãi định kỳ và hoàn vốn khi đáo hạn",
      "distractors": [
        "Volatility cao không xấu về bản chất — cần cân nhắc cùng lợi nhuận kỳ vọng và khẩu vị rủi ro",
        "FCFE: dòng tiền tự do còn lại chỉ thuộc về cổ đông, sau nghĩa vụ nợ"
      ]
    }
  ],
  "234": [
    {
      "fromDay": 229,
      "fromTitle": "Quỹ trái phiếu: cho vay mà không cần chọn từng trái phiếu",
      "text": "Quỹ trái phiếu cho phép nhà đầu tư nhỏ lẻ tiếp cận một danh mục đa dạng các trái phiếu chỉ với số vốn nhỏ, thay vì phải tự mua trực tiếp từng trái phiếu với yêu cầu vốn lớn",
      "distractors": [
        "Net worth = tổng tài sản - tổng nợ",
        "Cách khắc phục thực tế: chủ động tìm kiếm quan điểm trái chiều trước khi ra quyết định, không chỉ tin vào điều mình muốn tin"
      ]
    },
    {
      "fromDay": 222,
      "fromTitle": "Trái phiếu chính phủ vs trái phiếu công ty",
      "text": "Trái phiếu Chính phủ được xem là an toàn nhất (rủi ro vỡ nợ gần như bằng 0), lãi suất thấp nhất, dùng làm chuẩn so sánh cho các loại trái phiếu khác",
      "distractors": [
        "PE: mua công ty trưởng thành, tái cơ cấu, exit sau 5-7 năm",
        "PV = FV / (1+r)^n"
      ]
    }
  ],
  "235": [
    {
      "fromDay": 230,
      "fromTitle": "Trái phiếu quốc tế: rủi ro tỷ giá",
      "text": "Đầu tư trái phiếu bằng ngoại tệ chịu thêm một lớp rủi ro nữa ngoài rủi ro tín dụng và rủi ro lãi suất: rủi ro tỷ giá hối đoái",
      "distractors": [
        "Nghỉ hưu càng sớm, thời gian sống dựa vào danh mục càng dài, nên cần biên an toàn lớn hơn (rút 3-3,5% thay vì 4%)",
        "Expense ratio là phí vận hành quỹ trừ dần hàng năm vào tài sản, âm thầm nhưng có thật, dù nhà đầu tư không thấy khoản trừ trực tiếp"
      ]
    },
    {
      "fromDay": 223,
      "fromTitle": "Lãi suất và giá trái phiếu",
      "text": "Giá trái phiếu và lãi suất thị trường luôn biến động ngược chiều nhau: lãi suất tăng thì giá trái phiếu giảm, và ngược lại",
      "distractors": [
        "DIO = 365 / Turnover — số ngày trung bình để bán hết hàng",
        "Lợi nhuận kế toán ≠ tiền thực trong tay"
      ]
    }
  ],
  "236": [
    {
      "fromDay": 231,
      "fromTitle": "Trái phiếu lãi nổi và trái phiếu lãi cố định",
      "text": "Trái phiếu lãi cố định (fixed rate): coupon không đổi suốt vòng đời, dễ dự đoán dòng tiền nhưng chịu rủi ro khi lãi suất thị trường tăng",
      "distractors": [
        "Dựa trên dữ liệu lịch sử (Trinity Study), có xác suất thành công cao nhưng không phải đảm bảo tuyệt đối",
        "Nhạy cảm với discount rate và dự báo FCF"
      ]
    },
    {
      "fromDay": 224,
      "fromTitle": "Rủi ro vỡ nợ: xếp hạng trái phiếu",
      "text": "Xếp hạng tín nhiệm (credit rating) đánh giá khả năng trả nợ đúng hạn của bên phát hành trái phiếu, từ AAA (an toàn nhất) xuống đến các mức rủi ro cao như CCC",
      "distractors": [
        "Mục tiêu: runway ≥ 18 tháng trước khi gọi vốn tiếp",
        "PE: mua công ty trưởng thành, tái cơ cấu, exit sau 5-7 năm"
      ]
    }
  ],
  "237": [
    {
      "fromDay": 232,
      "fromTitle": "Vì sao lãi suất tăng làm giá trái phiếu giảm",
      "text": "Giá trái phiếu về bản chất là giá trị hiện tại (PV) của các dòng tiền tương lai (coupon và mệnh giá), chiết khấu theo lãi suất thị trường",
      "distractors": [
        "Volatility cao không xấu về bản chất — cần cân nhắc cùng lợi nhuận kỳ vọng và khẩu vị rủi ro",
        "Bốn tiêu chí cốt lõi khi chọn ETF: phí quản lý (expense ratio), thanh khoản giao dịch, quy mô quỹ (AUM), và tài sản/chỉ số theo dõi có phù hợp mục tiêu đầu tư hay không"
      ]
    },
    {
      "fromDay": 225,
      "fromTitle": "Khi nào nên mua trái phiếu",
      "text": "Trái phiếu phù hợp khi mục tiêu là bảo toàn vốn, có dòng tiền lãi ổn định, hoặc khi bạn sắp cần dùng đến khoản tiền đó trong thời gian gần (vài năm tới)",
      "distractors": [
        "Nguyên tắc này tự động phát hiện nhiều loại sai sót",
        "Buyback giảm equity — companies với buyback lớn có thể có equity âm"
      ]
    }
  ],
  "238": [
    {
      "fromDay": 233,
      "fromTitle": "Duration: độ nhạy của trái phiếu với lãi suất",
      "text": "Duration là khái niệm đo mức độ nhạy cảm của giá trái phiếu với biến động lãi suất thị trường",
      "distractors": [
        "Ladder là chiến lược chia vốn thành nhiều phần, mua trái phiếu với các kỳ hạn đáo hạn trải đều theo thời gian thay vì dồn hết vào một kỳ hạn",
        "Vụ Tân Hoàng Minh và Vạn Thịnh Phát năm 2022 là bài học đắt giá: lãi suất hấp dẫn bất thường luôn đi kèm rủi ro tương ứng, không nên mua trái phiếu chỉ vì tin lời tư vấn mà bỏ qua thẩm định"
      ]
    },
    {
      "fromDay": 226,
      "fromTitle": "Lợi suất trái phiếu vs cổ phiếu",
      "text": "Cổ phiếu thường có lợi nhuận trung bình cao hơn trái phiếu trong dài hạn, để đền bù cho rủi ro cao hơn — gọi là phần bù rủi ro cổ phiếu (equity risk premium)",
      "distractors": [
        "P&L: lợi nhuận qua thời gian",
        "Đa dạng hóa qua quỹ giúp giảm rủi ro tập trung so với mua trực tiếp trái phiếu của một công ty duy nhất"
      ]
    }
  ],
  "239": [
    {
      "fromDay": 234,
      "fromTitle": "Tái đầu tư coupon: lợi suất thực tế",
      "text": "Lợi suất đến khi đáo hạn (yield to maturity) công bố ban đầu giả định bạn tái đầu tư mọi khoản coupon ở đúng mức lợi suất đó",
      "distractors": [
        "Kết hợp nhiều ratios — một ratios không đủ để ra quyết định",
        "Đây chỉ là điểm khởi đầu tham khảo, cần điều chỉnh theo khả năng chịu rủi ro và mục tiêu cá nhân"
      ]
    },
    {
      "fromDay": 227,
      "fromTitle": "Rủi ro lãi suất: giá trái phiếu thay đổi như thế nào",
      "text": "Trái phiếu kỳ hạn càng dài, giá càng nhạy cảm (biến động mạnh) với thay đổi lãi suất thị trường so với trái phiếu ngắn hạn",
      "distractors": [
        "FCF = NOPAT × (1 − Growth/ROIC)",
        "Thuế chứng khoán Việt Nam (0,1% trên giá trị bán) và các loại phí (giao dịch, quản lý quỹ) đều là chi phí thực tế cần tính vào lợi nhuận ròng, dù dễ bị bỏ qua"
      ]
    }
  ],
  "240": [
    {
      "fromDay": 235,
      "fromTitle": "Thuế trên lợi tức trái phiếu",
      "text": "Lãi (coupon) trái phiếu doanh nghiệp nhận bởi cá nhân tại Việt Nam chịu thuế thu nhập cá nhân 5%, tính trên phần lãi nhận được và thường khấu trừ tại nguồn",
      "distractors": [
        "ROIC < WACC: tăng trưởng phá hủy value",
        "Càng gần thời điểm cần dùng đến tiền (nghỉ hưu, mua nhà, học phí con), tỷ trọng trái phiếu trong danh mục nên tăng lên tương ứng để giảm rủi ro mất vốn đúng lúc cần thiết"
      ]
    },
    {
      "fromDay": 228,
      "fromTitle": "Danh mục tối ưu: bao nhiêu trái phiếu bao nhiêu cổ phiếu",
      "text": "Quy tắc '100 trừ tuổi' là một điểm khởi đầu đơn giản: tỷ trọng cổ phiếu = 100 trừ đi tuổi của bạn, phần còn lại là trái phiếu và tài sản ổn định",
      "distractors": [
        "Beta = độ biến động tương đối so với thị trường",
        "Discount rate = chi phí cơ hội + phần bù rủi ro"
      ]
    }
  ],
  "241": [
    {
      "fromDay": 236,
      "fromTitle": "Chiến lược ladder: mua trái phiếu khác hạn",
      "text": "Ladder là chiến lược chia vốn thành nhiều phần, mua trái phiếu với các kỳ hạn đáo hạn trải đều theo thời gian thay vì dồn hết vào một kỳ hạn",
      "distractors": [
        "Compounding: lãi trên lãi trên lãi — hàm mũ",
        "HY spreads: chỉ báo sớm suy thoái"
      ]
    },
    {
      "fromDay": 229,
      "fromTitle": "Quỹ trái phiếu: cho vay mà không cần chọn từng trái phiếu",
      "text": "Quỹ trái phiếu cho phép nhà đầu tư nhỏ lẻ tiếp cận một danh mục đa dạng các trái phiếu chỉ với số vốn nhỏ, thay vì phải tự mua trực tiếp từng trái phiếu với yêu cầu vốn lớn",
      "distractors": [
        "Tính trước chi phí lãi vay, chiết khấu bằng WACC",
        "FCFF: dòng tiền tự do thuộc về toàn bộ nhà cung cấp vốn (cổ đông và chủ nợ)"
      ]
    }
  ],
  "242": [
    {
      "fromDay": 237,
      "fromTitle": "Khi nào trái phiếu là lựa chọn tốt",
      "text": "Trái phiếu phù hợp khi: cần bảo toàn vốn, có mục tiêu chi tiêu cụ thể trong thời gian ngắn-trung hạn, hoặc muốn dòng tiền ổn định dự đoán được",
      "distractors": [
        "Giá trị nội tại (value): ước tính dựa trên phân tích cơ bản dài hạn",
        "Đây là nguyên tắc nền tảng chi phối mọi quyết định phân bổ tài sản"
      ]
    },
    {
      "fromDay": 230,
      "fromTitle": "Trái phiếu quốc tế: rủi ro tỷ giá",
      "text": "Đầu tư trái phiếu bằng ngoại tệ chịu thêm một lớp rủi ro nữa ngoài rủi ro tín dụng và rủi ro lãi suất: rủi ro tỷ giá hối đoái",
      "distractors": [
        "Chặng 2 xoay quanh bốn trụ cột liên kết chặt chẽ: công cụ đầu tư và định giá (ETF, quỹ mở, P/E), quản trị rủi ro (đa dạng hóa, tránh đòn bẩy), kỷ luật tâm lý (tránh tham lam/sợ hãi, DCA), và kỳ vọng thực tế (8-12%/năm dài hạn, không phải làm giàu nhanh)",
        "Chi phí y tế có xu hướng tăng theo tuổi tác, nên cộng thêm một khoản dự phòng riêng cho y tế"
      ]
    }
  ],
  "243": [
    {
      "fromDay": 238,
      "fromTitle": "Các loại trái phiếu khác: bảo hiểm, tiết kiệm",
      "text": "Chứng chỉ tiền gửi (CD) là giấy tờ có giá do ngân hàng phát hành, gần giống tiết kiệm có kỳ hạn nhưng có thể chuyển nhượng và thường lãi suất nhỉnh hơn",
      "distractors": [
        "Case study giúp áp dụng lý thuyết vào thực tế",
        "Lãi cao = rủi ro cao — không phải 'lợi suất tốt hơn tiền gửi'"
      ]
    },
    {
      "fromDay": 231,
      "fromTitle": "Trái phiếu lãi nổi và trái phiếu lãi cố định",
      "text": "Trái phiếu lãi cố định (fixed rate): coupon không đổi suốt vòng đời, dễ dự đoán dòng tiền nhưng chịu rủi ro khi lãi suất thị trường tăng",
      "distractors": [
        "Nhóm kiến thức nền tảng (Day 221-224): trái phiếu là gì, ai phát hành, mối quan hệ lãi suất-giá, rủi ro tín dụng và xếp hạng tín nhiệm",
        "D/E: mức độ dùng nợ — phải đánh giá theo đặc thù ngành, không có ngưỡng chung cho mọi công ty"
      ]
    }
  ],
  "244": [
    {
      "fromDay": 239,
      "fromTitle": "Phân tích danh mục trái phiếu đơn giản",
      "text": "Trước khi phân bổ vốn vào trái phiếu, cần xác định rõ mục tiêu sử dụng tiền, thời điểm cần dùng, và mức độ chấp nhận rủi ro",
      "distractors": [
        "Rủi ro hệ thống (rủi ro của toàn thị trường như suy thoái, lạm phát) không thể loại bỏ hoàn toàn chỉ bằng đa dạng hóa cổ phiếu, cần kết hợp phân bổ tài sản đa dạng hơn",
        "Net Change in Cash = OCF + ICF + FCF"
      ]
    },
    {
      "fromDay": 232,
      "fromTitle": "Vì sao lãi suất tăng làm giá trái phiếu giảm",
      "text": "Giá trái phiếu về bản chất là giá trị hiện tại (PV) của các dòng tiền tương lai (coupon và mệnh giá), chiết khấu theo lãi suất thị trường",
      "distractors": [
        "Ước tính nhanh: tài sản cần có ≈ 25 × chi phí sinh hoạt hàng năm (dựa trên quy tắc rút 4%)",
        "Gordon Growth Method: Terminal Value = FCF cuối × (1+g) / (WACC − g)"
      ]
    }
  ],
  "245": [
    {
      "fromDay": 240,
      "fromTitle": "Tổng ôn chặng 3: trái phiếu cho người bảo thủ",
      "text": "Nhóm kiến thức nền tảng (Day 221-224): trái phiếu là gì, ai phát hành, mối quan hệ lãi suất-giá, rủi ro tín dụng và xếp hạng tín nhiệm",
      "distractors": [
        "Phòng hộ lãi suất thả nổi: nhận thả nổi, trả cố định qua hợp đồng IRS",
        "DCA có giá trị tâm lý thực sự: giảm cảm giác hối tiếc nếu mua đúng đỉnh, phù hợp với dòng tiền lương hàng tháng"
      ]
    },
    {
      "fromDay": 233,
      "fromTitle": "Duration: độ nhạy của trái phiếu với lãi suất",
      "text": "Duration là khái niệm đo mức độ nhạy cảm của giá trái phiếu với biến động lãi suất thị trường",
      "distractors": [
        "Chỉ tạo giá trị khi mua dưới intrinsic value",
        "Theo dõi OCF, không chỉ Net Income"
      ]
    }
  ],
  "246": [
    {
      "fromDay": 241,
      "fromTitle": "Danh mục là gì? Tại sao không nên bỏ tất cả vào 1 rổ",
      "text": "Danh mục là tập hợp các khoản đầu tư được quản lý như một thể thống nhất, không phải từng khoản riêng lẻ",
      "distractors": [
        "Thực tế: Trade-off giữa tax shield và financial distress",
        "Rủi ro của một tài sản riêng lẻ không phản ánh đúng đóng góp của nó vào rủi ro danh mục"
      ]
    },
    {
      "fromDay": 234,
      "fromTitle": "Tái đầu tư coupon: lợi suất thực tế",
      "text": "Lợi suất đến khi đáo hạn (yield to maturity) công bố ban đầu giả định bạn tái đầu tư mọi khoản coupon ở đúng mức lợi suất đó",
      "distractors": [
        "Lãi (coupon) trái phiếu doanh nghiệp nhận bởi cá nhân tại Việt Nam chịu thuế thu nhập cá nhân 5%, tính trên phần lãi nhận được và thường khấu trừ tại nguồn",
        "Cash position phản ánh sức khỏe ngắn hạn và chiến lược dài hạn"
      ]
    }
  ],
  "247": [
    {
      "fromDay": 242,
      "fromTitle": "Cân bằng cổ phiếu-trái phiếu theo tuổi",
      "text": "Tỷ trọng cổ phiếu nên giảm dần khi tuổi tăng, vì thời gian phục hồi sau biến động ngắn lại",
      "distractors": [
        "PE: mua công ty trưởng thành, tái cơ cấu, exit sau 5-7 năm",
        "Lợi nhuận cao hơn luôn đi kèm rủi ro cao hơn, không có ngoại lệ"
      ]
    },
    {
      "fromDay": 235,
      "fromTitle": "Thuế trên lợi tức trái phiếu",
      "text": "Lãi (coupon) trái phiếu doanh nghiệp nhận bởi cá nhân tại Việt Nam chịu thuế thu nhập cá nhân 5%, tính trên phần lãi nhận được và thường khấu trừ tại nguồn",
      "distractors": [
        "Ba luồng OCF + ICF + FCF = Net Change in Cash",
        "P/E = Price / EPS — trả bao nhiêu lần lợi nhuận"
      ]
    }
  ],
  "248": [
    {
      "fromDay": 243,
      "fromTitle": "Đặc tính cá nhân: cẩn thận hay mạo hiểm",
      "text": "Khả năng chịu rủi ro gồm hai phần: khả năng tài chính khách quan và thái độ tâm lý chủ quan với biến động",
      "distractors": [
        "Matching principle: doanh thu và chi phí khớp cùng kỳ",
        "Ước lượng nhanh: mục tiêu tích lũy tham khảo = (chi tiêu hàng năm dự kiến khi hưu trí - lương hưu BHXH ước tính) x 25"
      ]
    },
    {
      "fromDay": 236,
      "fromTitle": "Chiến lược ladder: mua trái phiếu khác hạn",
      "text": "Ladder là chiến lược chia vốn thành nhiều phần, mua trái phiếu với các kỳ hạn đáo hạn trải đều theo thời gian thay vì dồn hết vào một kỳ hạn",
      "distractors": [
        "Net burn = Chi tiêu − Doanh thu",
        "Đầu tư tăng trưởng: chấp nhận P/E cao hôm nay để đổi lấy tăng trưởng lợi nhuận nhanh trong tương lai"
      ]
    }
  ],
  "249": [
    {
      "fromDay": 244,
      "fromTitle": "Tái cân bằng danh mục hàng năm",
      "text": "Tái cân bằng là đưa danh mục về đúng tỷ trọng mục tiêu ban đầu sau khi thị trường làm lệch tỷ lệ",
      "distractors": [
        "Ba căn cứ hợp lý để bán: luận điểm đầu tư không còn đúng, định giá đã quá cao so với giá trị thực, hoặc có cơ hội đầu tư khác hấp dẫn hơn để tái phân bổ vốn",
        "Hai loại chính: General Obligation (thuế chung) và Revenue bond (doanh thu dự án)"
      ]
    },
    {
      "fromDay": 237,
      "fromTitle": "Khi nào trái phiếu là lựa chọn tốt",
      "text": "Trái phiếu phù hợp khi: cần bảo toàn vốn, có mục tiêu chi tiêu cụ thể trong thời gian ngắn-trung hạn, hoặc muốn dòng tiền ổn định dự đoán được",
      "distractors": [
        "Theo dõi OCF, không chỉ Net Income",
        "FOMO (sợ bỏ lỡ) là một biểu hiện phổ biến của lòng tham, khiến nhà đầu tư mua vào khi giá đã tăng nóng mà không phân tích giá trị thực"
      ]
    }
  ],
  "250": [
    {
      "fromDay": 245,
      "fromTitle": "Phí quản lý: chi phí của danh mục",
      "text": "Chi phí danh mục là tổng của nhiều loại phí: phí quỹ (expense ratio), phí giao dịch, phí lưu ký, phí tư vấn — không chỉ một khoản riêng lẻ",
      "distractors": [
        "Sharpe Ratio: lợi nhuận thặng dư trên mỗi đơn vị rủi ro",
        "Sau track 'personal', track 'professional' là bước tiếp theo cho ai muốn học sâu hơn về phân tích và định giá doanh nghiệp"
      ]
    },
    {
      "fromDay": 238,
      "fromTitle": "Các loại trái phiếu khác: bảo hiểm, tiết kiệm",
      "text": "Chứng chỉ tiền gửi (CD) là giấy tờ có giá do ngân hàng phát hành, gần giống tiết kiệm có kỳ hạn nhưng có thể chuyển nhượng và thường lãi suất nhỉnh hơn",
      "distractors": [
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường",
        "P/E: giá phải trả cho mỗi đồng lợi nhuận — thấp hơn nghĩa là rẻ hơn tương đối, nhưng cần so cùng ngành"
      ]
    }
  ],
  "251": [
    {
      "fromDay": 246,
      "fromTitle": "Tài khoản hưu trí: BHXH và các lựa chọn tự nguyện tại Việt Nam",
      "text": "BHXH bắt buộc là trụ cột chính cho lương hưu tại Việt Nam, do người lao động và doanh nghiệp cùng đóng góp",
      "distractors": [
        "Tracking Error: đo mức độ lệch giữa lợi suất quỹ và benchmark nó theo dõi",
        "Beta > 1: rủi ro cao hơn; Beta < 1: ổn định hơn"
      ]
    },
    {
      "fromDay": 239,
      "fromTitle": "Phân tích danh mục trái phiếu đơn giản",
      "text": "Trước khi phân bổ vốn vào trái phiếu, cần xác định rõ mục tiêu sử dụng tiền, thời điểm cần dùng, và mức độ chấp nhận rủi ro",
      "distractors": [
        "Không bao giờ cung cấp mã OTP ngân hàng cho bất kỳ ai qua điện thoại, kể cả người tự xưng là nhân viên ngân hàng",
        "WACC cao → NPV giảm → ít dự án được chấp thuận hơn"
      ]
    }
  ],
  "252": [
    {
      "fromDay": 247,
      "fromTitle": "Lợi thế thuế của tài khoản hưu trí",
      "text": "Đóng góp vào quỹ hưu trí bổ sung tự nguyện (Nghị định 88/2016/NĐ-CP) được giảm trừ thuế TNCN trong hạn mức quy định",
      "distractors": [
        "Inventory Turnover = COGS / Average Inventory",
        "Trái phiếu cũng phù hợp làm phần 'giảm xóc' trong danh mục đa dạng, giúp giảm biến động tổng thể khi kết hợp với cổ phiếu"
      ]
    },
    {
      "fromDay": 240,
      "fromTitle": "Tổng ôn chặng 3: trái phiếu cho người bảo thủ",
      "text": "Nhóm kiến thức nền tảng (Day 221-224): trái phiếu là gì, ai phát hành, mối quan hệ lãi suất-giá, rủi ro tín dụng và xếp hạng tín nhiệm",
      "distractors": [
        "Cao hơn = tạo doanh thu hiệu quả hơn từ tài sản",
        "Tăng lãi: thắt chặt; Giảm lãi: nới lỏng"
      ]
    }
  ],
  "253": [
    {
      "fromDay": 248,
      "fromTitle": "Bao nhiêu tiền để hưu trí thoải mái",
      "text": "Ước lượng nhanh: mục tiêu tích lũy tham khảo = (chi tiêu hàng năm dự kiến khi hưu trí - lương hưu BHXH ước tính) x 25",
      "distractors": [
        "ETF theo dõi chỉ số rộng (như VN30) thường phù hợp làm nền tảng danh mục cho người mới hơn là ETF chuyên biệt theo một ngành hẹp",
        "Đa dạng hóa qua nhiều loại tài sản, ngành, và loại hình đầu tư giúp giảm biến động của tài sản tổng thể"
      ]
    },
    {
      "fromDay": 241,
      "fromTitle": "Danh mục là gì? Tại sao không nên bỏ tất cả vào 1 rổ",
      "text": "Danh mục là tập hợp các khoản đầu tư được quản lý như một thể thống nhất, không phải từng khoản riêng lẻ",
      "distractors": [
        "Danh mục phù hợp là danh mục bạn có thể kiên trì nắm giữ qua các giai đoạn giảm điểm, không phải danh mục có lợi nhuận kỳ vọng cao nhất trên giấy",
        "EBIT − Interest = EBT; EBT × (1−Tax) = Net Income"
      ]
    }
  ],
  "254": [
    {
      "fromDay": 249,
      "fromTitle": "Quy tắc 4%: có thể rút bao nhiêu từ hưu trí",
      "text": "Quy tắc 4%: rút 4% giá trị danh mục năm đầu tiên nghỉ hưu, các năm sau điều chỉnh số tiền đó theo lạm phát",
      "distractors": [
        "CAGR (tốc độ tăng trưởng kép bình quân) phản ánh hiệu suất thực tế chính xác hơn việc chỉ nhìn vào năm tốt nhất",
        "Đổi lại vốn huy động được, công ty đại chúng phải minh bạch thông tin tài chính định kỳ cho nhà đầu tư"
      ]
    },
    {
      "fromDay": 242,
      "fromTitle": "Cân bằng cổ phiếu-trái phiếu theo tuổi",
      "text": "Tỷ trọng cổ phiếu nên giảm dần khi tuổi tăng, vì thời gian phục hồi sau biến động ngắn lại",
      "distractors": [
        "Nhóm chiến lược và ứng dụng thực tế (Day 236-239): chiến lược ladder, khi nào nên ưu tiên trái phiếu, các sản phẩm liên quan (CD, bảo hiểm liên kết đầu tư), và case phân bổ danh mục cụ thể",
        "Intrinsic Value: giá trị nếu thực hiện quyền ngay lập tức (tối thiểu là 0)"
      ]
    }
  ],
  "255": [
    {
      "fromDay": 250,
      "fromTitle": "Lạm phát và hưu trí: vì sao cần đầu tư",
      "text": "Lạm phát âm thầm bào mòn sức mua của tiền theo thời gian, kể cả khi số dư danh nghĩa không giảm",
      "distractors": [
        "Nợ ≤ 12 tháng = current; > 12 tháng = long-term",
        "Tracking Error: đo mức độ lệch giữa lợi suất quỹ và benchmark nó theo dõi"
      ]
    },
    {
      "fromDay": 243,
      "fromTitle": "Đặc tính cá nhân: cẩn thận hay mạo hiểm",
      "text": "Khả năng chịu rủi ro gồm hai phần: khả năng tài chính khách quan và thái độ tâm lý chủ quan với biến động",
      "distractors": [
        "Lãi suất là giá của tiền: tăng thì vay đắt hơn, tiết kiệm hấp dẫn hơn",
        "Phần lớn quỹ chủ động không vượt trội hơn chỉ số tham chiếu sau khi trừ phí trong dài hạn — cần cân nhắc kỹ trước khi chọn"
      ]
    }
  ],
  "256": [
    {
      "fromDay": 251,
      "fromTitle": "Hưu trí sớm: bao nhiêu tiền cần",
      "text": "Số tiền cần để nghỉ hưu ≈ chi tiêu hàng năm × 25 (quy tắc rút 4%/năm)",
      "distractors": [
        "Amazon là ví dụ kinh điển: lỗ kế toán nhưng OCF mạnh",
        "P/E cao hơn trung bình ngành không tự động là xấu — cần xem xét cùng tốc độ tăng trưởng lợi nhuận kỳ vọng"
      ]
    },
    {
      "fromDay": 244,
      "fromTitle": "Tái cân bằng danh mục hàng năm",
      "text": "Tái cân bằng là đưa danh mục về đúng tỷ trọng mục tiêu ban đầu sau khi thị trường làm lệch tỷ lệ",
      "distractors": [
        "Trái phiếu mang lại lợi suất thấp hơn nhưng ổn định và dự đoán được hơn nhiều — đây là lý do cả hai đều có vai trò riêng trong một danh mục đầu tư",
        "Nghỉ hưu càng sớm, thời gian sống dựa vào danh mục càng dài, nên cần biên an toàn lớn hơn (rút 3-3,5% thay vì 4%)"
      ]
    }
  ],
  "257": [
    {
      "fromDay": 252,
      "fromTitle": "Bảo hiểm: bảo vệ danh mục từ rủi ro",
      "text": "Bảo hiểm nên được hiểu là công cụ CHUYỂN GIAO RỦI RO, không phải công cụ đầu tư sinh lời",
      "distractors": [
        "Debt rẻ hơn equity vì tax shield",
        "Đổi lại vốn huy động được, công ty đại chúng phải minh bạch thông tin tài chính định kỳ cho nhà đầu tư"
      ]
    },
    {
      "fromDay": 245,
      "fromTitle": "Phí quản lý: chi phí của danh mục",
      "text": "Chi phí danh mục là tổng của nhiều loại phí: phí quỹ (expense ratio), phí giao dịch, phí lưu ký, phí tư vấn — không chỉ một khoản riêng lẻ",
      "distractors": [
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk",
        "Cân bằng: trả chậm tốt nhưng không được mất quan hệ NCC"
      ]
    }
  ],
  "258": [
    {
      "fromDay": 253,
      "fromTitle": "Anh em, bạn bè, gia đình: vay tiền như thế nào",
      "text": "Lập giấy vay nợ rõ ràng (số tiền, lãi suất nếu có, lịch trả, chữ ký hai bên) là cách bảo vệ quan hệ, không phải thiếu tin tưởng",
      "distractors": [
        "IPO = lần đầu bán cổ phiếu ra công chúng",
        "ETF: quỹ chứa rổ tài sản nhưng giao dịch linh hoạt như một cổ phiếu"
      ]
    },
    {
      "fromDay": 246,
      "fromTitle": "Tài khoản hưu trí: BHXH và các lựa chọn tự nguyện tại Việt Nam",
      "text": "BHXH bắt buộc là trụ cột chính cho lương hưu tại Việt Nam, do người lao động và doanh nghiệp cùng đóng góp",
      "distractors": [
        "DuPont phân tích: Margin × Turnover × Leverage",
        "Mục tiêu: tối đa hóa giá trị doanh nghiệp"
      ]
    }
  ],
  "259": [
    {
      "fromDay": 254,
      "fromTitle": "Kế hoạch thừa kế: để lại gì cho con em",
      "text": "Không có di chúc, tài sản chia theo pháp luật (hàng thừa kế thứ nhất: vợ/chồng, cha mẹ, con) — không nhất thiết theo mong muốn thực sự của người mất",
      "distractors": [
        "Trong DCF: thường dùng WACC làm discount rate",
        "Đây là nền tảng của double-entry bookkeeping"
      ]
    },
    {
      "fromDay": 247,
      "fromTitle": "Lợi thế thuế của tài khoản hưu trí",
      "text": "Đóng góp vào quỹ hưu trí bổ sung tự nguyện (Nghị định 88/2016/NĐ-CP) được giảm trừ thuế TNCN trong hạn mức quy định",
      "distractors": [
        "Mục đích là an toàn và thanh khoản, không phải sinh lời cao — không nên đầu tư quỹ này vào cổ phiếu",
        "Trái phiếu phù hợp khi mục tiêu là bảo toàn vốn, có dòng tiền lãi ổn định, hoặc khi bạn sắp cần dùng đến khoản tiền đó trong thời gian gần (vài năm tới)"
      ]
    }
  ],
  "260": [
    {
      "fromDay": 255,
      "fromTitle": "Bảo mật tài chính: bảo vệ tiền khỏi lừa đảo",
      "text": "Deepfake AI giả mạo hình ảnh/giọng nói là hình thức lừa đảo mới đang gia tăng — luôn xác minh qua kênh độc lập trước khi chuyển tiền theo yêu cầu khẩn cấp",
      "distractors": [
        "Nợ phải trả = nghĩa vụ phải thanh toán trong tương lai",
        "Chi phí: phí underwriter, compliance, mất quyền riêng tư"
      ]
    },
    {
      "fromDay": 248,
      "fromTitle": "Bao nhiêu tiền để hưu trí thoải mái",
      "text": "Ước lượng nhanh: mục tiêu tích lũy tham khảo = (chi tiêu hàng năm dự kiến khi hưu trí - lương hưu BHXH ước tính) x 25",
      "distractors": [
        "Lựa chọn Beta phù hợp nên dựa trên chân trời đầu tư và khẩu vị rủi ro của từng nhà đầu tư",
        "Độ chính xác phụ thuộc rất nhiều vào chất lượng giả định dự báo dòng tiền và tỷ lệ chiết khấu"
      ]
    }
  ],
  "261": [
    {
      "fromDay": 256,
      "fromTitle": "Theo dõi danh mục: cần kiểm tra bao lâu",
      "text": "Kiểm tra danh mục quá thường xuyên không cải thiện hiệu suất mà còn dễ gây quyết định cảm tính, có hại cho chiến lược dài hạn",
      "distractors": [
        "Đòn bẩy cao + biến động thị trường = rủi ro phá sản",
        "Nên cập nhật định kỳ theo các thay đổi lớn trong cuộc sống, không lập một lần rồi bỏ quên"
      ]
    },
    {
      "fromDay": 249,
      "fromTitle": "Quy tắc 4%: có thể rút bao nhiêu từ hưu trí",
      "text": "Quy tắc 4%: rút 4% giá trị danh mục năm đầu tiên nghỉ hưu, các năm sau điều chỉnh số tiền đó theo lạm phát",
      "distractors": [
        "Interest Coverage = EBIT / Interest Expense",
        "Optimal leverage tồn tại — leverage quá cao làm Ke và Kd tăng"
      ]
    }
  ],
  "262": [
    {
      "fromDay": 257,
      "fromTitle": "Khi nào cần tư vấn tài chính chuyên nghiệp",
      "text": "Không phải ai cũng cần tư vấn tài chính chuyên nghiệp — với nhu cầu đơn giản, tự học và tự quản lý là đủ",
      "distractors": [
        "Quyết định bán nên dựa trên việc luận điểm đầu tư ban đầu (nền tảng cơ bản doanh nghiệp) có còn đúng hay không, không nên chỉ dựa vào biến động giá ngắn hạn",
        "Lợi ích: huy động vốn lớn, exit cho founders/VC"
      ]
    },
    {
      "fromDay": 250,
      "fromTitle": "Lạm phát và hưu trí: vì sao cần đầu tư",
      "text": "Lạm phát âm thầm bào mòn sức mua của tiền theo thời gian, kể cả khi số dư danh nghĩa không giảm",
      "distractors": [
        "Đo hiệu quả sinh lời trên mỗi đơn vị rủi ro, không chỉ lợi nhuận tuyệt đối",
        "< 1.5: nguy hiểm; 2-3x: chấp nhận được; > 5x: an toàn"
      ]
    }
  ],
  "268": [
    {
      "fromDay": 263,
      "fromTitle": "Audit tài chính cá nhân: Bạn đang đứng ở đâu?",
      "text": "Tài sản ròng = Tổng tài sản − Tổng nợ; phải liệt kê ĐẦY ĐỦ cả hai vế, kể cả nợ 'mềm' (thẻ tín dụng, vay người thân, trả góp)",
      "distractors": [
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị",
        "Kết hợp nhiều ratios — một ratios không đủ để ra quyết định"
      ]
    }
  ],
  "1101": [
    {
      "fromDay": 196,
      "fromTitle": "nhỏ — Hãng hàng không phòng hộ giá dầu",
      "text": "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
      "distractors": [
        "Chấp nhận đánh đổi cơ hội tiềm năng để đổi lấy sự chắc chắn là bản chất của hedging",
        "Spread = Yield rủi ro − Yield phi rủi ro cùng kỳ hạn"
      ]
    },
    {
      "fromDay": 189,
      "fromTitle": "Hedging là gì?",
      "text": "Hedging: giảm rủi ro đã có sẵn, không tạo thêm rủi ro mới",
      "distractors": [
        "Chi phí: phí underwriter, compliance, mất quyền riêng tư",
        "Ba yếu tố cốt lõi của mọi trái phiếu: mệnh giá (số tiền gốc), lãi suất coupon (tỷ lệ lãi trả định kỳ), và kỳ hạn (thời gian đến khi đáo hạn)"
      ]
    }
  ],
  "1102": [
    {
      "fromDay": 197,
      "fromTitle": "nhỏ — Doanh nghiệp xuất khẩu phòng hộ tỷ giá",
      "text": "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu",
      "distractors": [
        "Luôn kiểm tra cơ chế trả phí của tư vấn viên để nhận diện xung đột lợi ích tiềm ẩn",
        "Là chỉ số chuẩn để so sánh hiệu suất giữa các quỹ đầu tư khác nhau"
      ]
    },
    {
      "fromDay": 190,
      "fromTitle": "Speculation là gì?",
      "text": "Speculation: đặt cược vào hướng giá để kiếm lời, không có rủi ro nền tảng cần bảo vệ",
      "distractors": [
        "Đây là con số tham khảo ban đầu, nên rà soát và điều chỉnh định kỳ theo thay đổi thu nhập, chi tiêu và mục tiêu sống thực tế",
        "Lãi suất thực âm: gửi ngân hàng mất sức mua"
      ]
    }
  ],
  "1103": [
    {
      "fromDay": 198,
      "fromTitle": "Tổng ôn công cụ phái sinh",
      "text": "Bốn công cụ phái sinh chính đều xoay quanh việc chuyển giao rủi ro có cấu trúc",
      "distractors": [
        "MM (no tax): cơ cấu vốn không quan trọng trong thị trường hoàn hảo",
        "Duration: đo độ nhạy giá với lãi suất"
      ]
    },
    {
      "fromDay": 191,
      "fromTitle": "Swap là gì?",
      "text": "Swap: hoán đổi dòng tiền tương lai theo công thức đã thỏa thuận",
      "distractors": [
        "D/E cao: rủi ro cao hơn nhưng khuếch đại lợi nhuận",
        "'Thua' so với giá thị trường sau hedge không đồng nghĩa hedging thất bại"
      ]
    }
  ],
  "1104": [
    {
      "fromDay": 199,
      "fromTitle": "Kết nối tất cả — Báo cáo tài chính, Định giá, Rủi ro, Thị trường",
      "text": "Phân tích tài chính toàn diện kết nối bốn lớp: kế toán, định giá, rủi ro, thị trường",
      "distractors": [
        "ROIC > Kd: đòn bẩy tốt; ROIC < Kd: đòn bẩy phá hủy giá trị",
        "Khoảng cách quan trọng nhất là từ HIỂU đến LÀM — kiến thức chỉ tạo ra khác biệt khi trở thành thói quen thực hành đều đặn"
      ]
    },
    {
      "fromDay": 192,
      "fromTitle": "Interest Rate Swap",
      "text": "IRS: hoán đổi dòng lãi suất cố định và thả nổi giữa hai bên",
      "distractors": [
        "Thường có ưu đãi thuế, hấp dẫn nhà đầu tư cá nhân",
        "Tương quan (correlation) với các tài sản khác quan trọng hơn độ biến động riêng lẻ"
      ]
    }
  ],
  "1105": [
    {
      "fromDay": 200,
      "fromTitle": "Bài cuối — Tự phân tích một doanh nghiệp hoàn chỉnh từ A đến Z",
      "text": "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
      "distractors": [
        "Lợi nhuận là con số kế toán; dòng tiền là tiền thực trong tài khoản",
        "Mục tiêu: tối đa hóa giá trị dài hạn cho cổ đông"
      ]
    },
    {
      "fromDay": 193,
      "fromTitle": "Currency Swap",
      "text": "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau",
      "distractors": [
        "Chi phí quản lý quỹ chủ động cao hơn đáng kể do cần đội ngũ nghiên cứu chuyên nghiệp",
        "Trái phiếu mang lại lợi suất thấp hơn nhưng ổn định và dự đoán được hơn nhiều — đây là lý do cả hai đều có vai trò riêng trong một danh mục đầu tư"
      ]
    }
  ],
  "1106": [
    {
      "fromDay": 1101,
      "fromTitle": "Chất lượng lợi nhuận: đọc vị judgment kế toán",
      "text": "So sánh Net Income với Operating Cash Flow là bước kiểm tra chất lượng lợi nhuận đầu tiên và quan trọng nhất",
      "distractors": [
        "Đây là công cụ chính sách phổ biến trên thế giới (như 401k ở Mỹ) để khuyến khích tiết kiệm hưu trí dài hạn, không phải đặc thù riêng của Việt Nam",
        "Trái phiếu vận hành trên hai trục: giá trị thời gian của tiền và niềm tin tín dụng"
      ]
    },
    {
      "fromDay": 194,
      "fromTitle": "Vì sao doanh nghiệp dùng phái sinh để phòng hộ?",
      "text": "Mục tiêu hedging: giảm bất định, không phải tối đa hóa lợi nhuận",
      "distractors": [
        "P/E: giá phải trả cho mỗi đồng lợi nhuận — thấp hơn nghĩa là rẻ hơn tương đối, nhưng cần so cùng ngành",
        "Non-cash expense: không ảnh hưởng trực tiếp đến dòng tiền"
      ]
    }
  ],
  "1107": [
    {
      "fromDay": 1102,
      "fromTitle": "Comps: Chọn peer group và điều chỉnh định giá tương đối",
      "text": "Một chỉ số định giá tương đối chỉ có ý nghĩa khi peer group thực sự tương đồng về kinh tế cơ bản, không chỉ cùng ngành theo tên gọi",
      "distractors": [
        "Correlation càng thấp hoặc âm, hiệu quả đa dạng hóa càng mạnh",
        "NPV đo giá trị tổng thể, có tính thời gian"
      ]
    },
    {
      "fromDay": 195,
      "fromTitle": "Vì sao phái sinh có thể rất nguy hiểm?",
      "text": "Đòn bẩy cao khuếch đại cả lãi và lỗ trên vốn bỏ ra",
      "distractors": [
        "Trả cổ tức khi cơ hội đầu tư cạn kiệt",
        "Có tiền tiết kiệm không đồng nghĩa với giàu lên nếu nợ tăng nhanh hơn"
      ]
    }
  ],
  "1108": [
    {
      "fromDay": 1103,
      "fromTitle": "Phân tích tín dụng: Covenant và thứ tự ưu tiên phá sản",
      "text": "Covenant là ràng buộc pháp lý — vi phạm là 'technical default' dù vẫn đang trả lãi đúng hạn",
      "distractors": [
        "Không có lãi suất cụ thể — đây là chi phí cơ hội của cổ đông",
        "Kiến thức tài chính chỉ có giá trị khi được áp dụng liên tục và cập nhật theo từng giai đoạn cuộc đời — đây là hành trình dài hạn, không phải đích đến một lần rồi thôi"
      ]
    },
    {
      "fromDay": 196,
      "fromTitle": "nhỏ — Hãng hàng không phòng hộ giá dầu",
      "text": "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
      "distractors": [
        "Chênh lệch lớn giữa các phương pháp là tín hiệu cần phân tích sâu hơn, không phải để bỏ qua",
        "Efficient Frontier: tập hợp các danh mục tối ưu cho mỗi mức rủi ro"
      ]
    }
  ],
  "1109": [
    {
      "fromDay": 1104,
      "fromTitle": "Xây dựng mô hình 3 báo cáo tài chính liên kết",
      "text": "Ba báo cáo tài chính liên kết qua các cầu nối cụ thể: Net Income → Retained Earnings và Cash Flow; Depreciation → cả ba báo cáo với vai trò khác nhau",
      "distractors": [
        "Inventory turnover = COGS / Average Inventory",
        "Luôn đọc kỹ bảng minh họa quyền lợi và phí trước khi ký hợp đồng bảo hiểm dài hạn — đừng chỉ nghe tư vấn viên trình bày"
      ]
    },
    {
      "fromDay": 197,
      "fromTitle": "nhỏ — Doanh nghiệp xuất khẩu phòng hộ tỷ giá",
      "text": "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu",
      "distractors": [
        "Đây là nền tảng bắt buộc trước khi học đầu tư — bỏ qua Chặng 0 khiến các quyết định ở chặng sau thiếu cơ sở thực tế",
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị"
      ]
    }
  ],
  "1110": [
    {
      "fromDay": 1105,
      "fromTitle": "Xây dựng mô hình DCF vận hành đầy đủ",
      "text": "DCF thực chiến chủ yếu là công việc xây dựng operating model (revenue build-up, chi phí, capex, working capital), không chỉ là công thức chiết khấu",
      "distractors": [
        "Đa dạng hóa thực sự dựa trên mức TƯƠNG QUAN thấp giữa các tài sản, không chỉ số lượng mã cổ phiếu",
        "NPV = tiêu chí quyết định đầu tư tốt nhất"
      ]
    },
    {
      "fromDay": 198,
      "fromTitle": "Tổng ôn công cụ phái sinh",
      "text": "Bốn công cụ phái sinh chính đều xoay quanh việc chuyển giao rủi ro có cấu trúc",
      "distractors": [
        "FOMO khiến nhà đầu tư mua theo đám đông ở gần đỉnh giá vì sợ bỏ lỡ, không dựa trên phân tích giá trị",
        "Đầu tư trái phiếu bằng ngoại tệ chịu thêm một lớp rủi ro nữa ngoài rủi ro tín dụng và rủi ro lãi suất: rủi ro tỷ giá hối đoái"
      ]
    }
  ]
};
