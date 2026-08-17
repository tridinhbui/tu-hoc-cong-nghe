// AUTO-GENERATED from lib/lessons.ts keyTakeaways + the dashboard's stage/part
// order - do not hand-edit. Regenerate via the recall-schedule generation
// script if either file changes. Powers the spaced-repetition "Nhớ lại" card:
// for each lesson it surfaces keyTakeaways from lessons ~5 and ~12 positions
// earlier IN THE ACTUAL LEARNING SEQUENCE (respecting the reordered
// curriculum), so a recall card never references material the learner has
// not yet reached.
//
// `distractors` turns the card into a real multiple-choice retrieval check
// (pick the correct takeaway among 3) instead of a self-reported "did you
// remember?"- self-report doesn't actually test recall, an MCQ does.
//
// ~5000 lines - "server-only" makes any accidental client-component import
// fail the build loudly instead of silently shipping this whole dataset to
// the browser on every lesson page. Client code must go through
// lib/recall-actions.ts's Server Actions instead.
import "server-only";

export interface RecallItem {
  fromDay: number;
  fromTitle: string;
  text: string;
  distractors: string[];
}

export const RECALL_SCHEDULE: Record<number, RecallItem[]> = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [
    {
      "fromDay": 1,
      "fromTitle": "Bài 1: Chương trình là gì",
      "text": "Bộ xử lý chỉ hiểu lệnh máy; mã nguồn là văn bản dành cho con người.",
      "distractors": [
        "Lạm phát âm thầm bào mòn sức mua của tiền theo thời gian, kể cả khi số dư danh nghĩa không giảm",
        "Là cơ sở tính toán trong hầu hết các thương vụ M&A thực tế"
      ]
    }
  ],
  "7": [
    {
      "fromDay": 2,
      "fromTitle": "Bài 2: Biến và phép gán",
      "text": "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
      "distractors": [
        "Nhạy cảm với discount rate và dự báo FCF",
        "SG&A = chi phí vận hành gián tiếp (bán hàng + quản lý)"
      ]
    }
  ],
  "8": [
    {
      "fromDay": 3,
      "fromTitle": "Bài 3: Kiểu dữ liệu cơ bản",
      "text": "Bốn nhóm cơ bản: số, chuỗi, luận lý, và giá trị rỗng.",
      "distractors": [
        "Revenue → Gross Profit → EBITDA → EBIT → Net Income → OCF → FCF là một chuỗi liên thông, không phải bảy công thức rời rạc.",
        "Theo dõi OCF, không chỉ Net Income"
      ]
    }
  ],
  "9": [
    {
      "fromDay": 4,
      "fromTitle": "Bài 4: Chuỗi và thao tác văn bản",
      "text": "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một.",
      "distractors": [
        "Là tỷ lệ chiết khấu chuẩn trong DCF",
        "Correlation không cố định - có thể thay đổi bất lợi đúng vào giai đoạn khủng hoảng, đây là giới hạn thực tế cần lưu ý"
      ]
    }
  ],
  "10": [
    {
      "fromDay": 5,
      "fromTitle": "Bài 5: Phép toán và biểu thức luận lý",
      "text": "Mọi phép so sánh cho ra một giá trị luận lý - đúng hoặc sai.",
      "distractors": [
        "Quick Ratio loại hàng tồn kho khỏi tài sản ngắn hạn",
        "Là cơ sở tính toán trong hầu hết các thương vụ M&A thực tế"
      ]
    }
  ],
  "11": [
    {
      "fromDay": 6,
      "fromTitle": "Bài 6: Câu điều kiện - chương trình rẽ nhánh",
      "text": "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Revenue → Gross Profit → EBITDA → EBIT → Net Income → OCF → FCF là một chuỗi liên thông, không phải bảy công thức rời rạc."
      ]
    }
  ],
  "12": [
    {
      "fromDay": 7,
      "fromTitle": "Bài 7: Vòng lặp",
      "text": "for khi biết trước tập cần duyệt; while khi chỉ có một điều kiện dừng.",
      "distractors": [
        "Danh mục phù hợp là danh mục bạn có thể kiên trì nắm giữ qua các giai đoạn giảm điểm, không phải danh mục có lợi nhuận kỳ vọng cao nhất trên giấy",
        "Là phương pháp định giá tuyệt đối, độc lập với định giá thị trường của công ty khác"
      ]
    }
  ],
  "13": [
    {
      "fromDay": 8,
      "fromTitle": "Bài 8: Danh sách - cấu trúc dữ liệu đầu tiên",
      "text": "Chỉ số là độ dời từ đầu, nên bắt đầu từ 0 và phần tử cuối ở vị trí n trừ một.",
      "distractors": [
        "Rule of 72: số năm nhân đôi ≈ 72 / lãi suất",
        "Tỷ trọng cổ phiếu nên giảm dần khi tuổi tăng, vì thời gian phục hồi sau biến động ngắn lại"
      ]
    },
    {
      "fromDay": 1,
      "fromTitle": "Bài 1: Chương trình là gì",
      "text": "Bộ xử lý chỉ hiểu lệnh máy; mã nguồn là văn bản dành cho con người.",
      "distractors": [
        "Trì hoãn đầu tư hưu trí là chi phí cơ hội không thể bù đắp lại bằng tiền bạc sau này",
        "Tài sản dài hạn: mang lại lợi ích nhiều năm, thường khấu hao dần"
      ]
    }
  ],
  "14": [
    {
      "fromDay": 9,
      "fromTitle": "Bài 9: Từ điển - tra bằng tên thay vì bằng vị trí",
      "text": "Từ điển gồm các cặp khoá và giá trị; khoá là duy nhất trong một từ điển.",
      "distractors": [
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị",
        "Khắt khe và thực tế hơn Current Ratio"
      ]
    },
    {
      "fromDay": 2,
      "fromTitle": "Bài 2: Biến và phép gán",
      "text": "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
      "distractors": [
        "Lãi suất thực ≈ Lãi suất danh nghĩa − Lạm phát",
        "EV = Market Cap + Nợ − Tiền mặt: nợ cộng vào vì người mua gánh nó, tiền trừ ra vì người mua được dùng nó."
      ]
    }
  ],
  "15": [
    {
      "fromDay": 10,
      "fromTitle": "Bài 10: Ghép lại thành chương trình chạy được",
      "text": "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
      "distractors": [
        "EV/EBITDA trung lập với đòn bẩy và khấu hao, nên nó là bội số để so hai doanh nghiệp vay nợ khác nhau.",
        "CapEx: tài sản dài hạn, khấu hao dần"
      ]
    },
    {
      "fromDay": 3,
      "fromTitle": "Bài 3: Kiểu dữ liệu cơ bản",
      "text": "Bốn nhóm cơ bản: số, chuỗi, luận lý, và giá trị rỗng.",
      "distractors": [
        "FCF là cơ sở của mọi mô hình DCF - nhớ nó trước khi nhớ bất kỳ bội số nào.",
        "Expected Loss = PD × LGD"
      ]
    }
  ],
  "16": [
    {
      "fromDay": 11,
      "fromTitle": "Bài 11: Hàm - đóng gói một việc",
      "text": "Chép mã bốn chỗ nghĩa là phải giữ bốn bản đồng bộ bằng trí nhớ - trí nhớ luôn thua.",
      "distractors": [
        "Nợ dài hạn: thời gian trả dài hơn, thường lãi cao hơn",
        "Tư duy portfolio là nền tảng của toàn bộ lý thuyết đầu tư hiện đại"
      ]
    },
    {
      "fromDay": 4,
      "fromTitle": "Bài 4: Chuỗi và thao tác văn bản",
      "text": "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một.",
      "distractors": [
        "Nhóm đối chứng là thứ tách ảnh hưởng của thay đổi khỏi mọi biến động khác cùng thời điểm",
        "Cổ đông có quyền nhận cổ tức, biểu quyết, và phần tài sản còn lại khi giải thể"
      ]
    }
  ],
  "17": [
    {
      "fromDay": 12,
      "fromTitle": "Bài 12: Tham số, giá trị trả về và phạm vi",
      "text": "Dữ liệu đơn được sao chép khi truyền vào hàm; dữ liệu phức hợp truyền chỗ trỏ.",
      "distractors": [
        "Phản ánh chi phí thực sự để mua đứt toàn bộ hoạt động kinh doanh của công ty",
        "Đo hiệu quả sinh lời trên mỗi đơn vị rủi ro, không chỉ lợi nhuận tuyệt đối"
      ]
    },
    {
      "fromDay": 5,
      "fromTitle": "Bài 5: Phép toán và biểu thức luận lý",
      "text": "Mọi phép so sánh cho ra một giá trị luận lý - đúng hoặc sai.",
      "distractors": [
        "Rủi ro tối đa của người mua call = premium đã trả, không hơn",
        "Tính cỡ mẫu trước khi chạy, và coi điểm dừng là cam kết chứ không phải lựa chọn"
      ]
    }
  ],
  "18": [
    {
      "fromDay": 13,
      "fromTitle": "Bài 13: Chương trình trong bộ nhớ",
      "text": "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
      "distractors": [
        "EV = Market Cap + Nợ − Tiền mặt: nợ cộng vào vì người mua gánh nó, tiền trừ ra vì người mua được dùng nó.",
        "Non-cash expense: không ảnh hưởng trực tiếp đến dòng tiền"
      ]
    },
    {
      "fromDay": 6,
      "fromTitle": "Bài 6: Câu điều kiện - chương trình rẽ nhánh",
      "text": "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
      "distractors": [
        "Lựa chọn Beta phù hợp nên dựa trên chân trời đầu tư và khẩu vị rủi ro của từng nhà đầu tư",
        "Retained earnings âm = accumulated deficit - lỗ tích lũy"
      ]
    }
  ],
  "19": [
    {
      "fromDay": 14,
      "fromTitle": "Bài 14: Lỗi và ngoại lệ",
      "text": "Bắt lỗi rồi không làm gì là cách tệ nhất - tệ hơn cả để chương trình dừng hẳn.",
      "distractors": [
        "Expected Return của danh mục = trung bình có trọng số theo tỷ trọng từng tài sản",
        "ETF: quỹ chứa rổ tài sản nhưng giao dịch linh hoạt như một cổ phiếu"
      ]
    },
    {
      "fromDay": 7,
      "fromTitle": "Bài 7: Vòng lặp",
      "text": "for khi biết trước tập cần duyệt; while khi chỉ có một điều kiện dừng.",
      "distractors": [
        "Giá rẻ không tự động là cơ hội tốt - cần phân biệt 'rẻ vì bị bỏ quên' với 'rẻ vì thực sự có vấn đề'",
        "FIRE không nhất thiết là ngừng làm việc hoàn toàn - nhiều người chọn 'Barista FIRE' (làm việc bán thời gian) để giảm áp lực rút vốn"
      ]
    }
  ],
  "20": [
    {
      "fromDay": 15,
      "fromTitle": "Bài 15: Gỡ lỗi có phương pháp",
      "text": "Bước đầu tiên luôn là tái hiện lỗi ổn định - không có nó thì không biết đã sửa xong chưa.",
      "distractors": [
        "VC: đầu tư mạo hiểm, chấp nhận rủi ro cao",
        "Tắt thông báo biến động giá hàng ngày trên app đầu tư là cách đơn giản để giảm cám dỗ kiểm tra liên tục"
      ]
    },
    {
      "fromDay": 8,
      "fromTitle": "Bài 8: Danh sách - cấu trúc dữ liệu đầu tiên",
      "text": "Chỉ số là độ dời từ đầu, nên bắt đầu từ 0 và phần tử cuối ở vị trí n trừ một.",
      "distractors": [
        "Trái phiếu = cho vay, nhận coupon + hoàn vốn khi đáo hạn",
        "EV/EBITDA trung lập với đòn bẩy và khấu hao, nên nó là bội số để so hai doanh nghiệp vay nợ khác nhau."
      ]
    }
  ],
  "26": [
    {
      "fromDay": 21,
      "fromTitle": "Kế toán là ngôn ngữ của kinh doanh",
      "text": "Kế toán là ngôn ngữ của kinh doanh - ai cũng cần biết đọc",
      "distractors": [
        "Yield curve bình thường: dốc lên, kỳ hạn dài lợi suất cao hơn",
        "Lãi kép: lãi trên lãi - sức mạnh thời gian"
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
        "Nhìn kết quả giữa chừng rồi dừng khi đẹp có thể đẩy tỷ lệ sai từ 5% lên trên 30%",
        "Trung lập với cơ cấu vốn và chính sách khấu hao - phù hợp so sánh công ty có đòn bẩy khác nhau"
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
        "Giá trị p nói về xác suất của dữ liệu, không phải xác suất giả thuyết đúng",
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
      "text": "Assets = Liabilities + Equity - luôn luôn cân bằng",
      "distractors": [
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
        "Thay đổi WC ảnh hưởng trực tiếp đến OCF"
      ]
    },
    {
      "fromDay": 21,
      "fromTitle": "Kế toán là ngôn ngữ của kinh doanh",
      "text": "Kế toán là ngôn ngữ của kinh doanh - ai cũng cần biết đọc",
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
        "FCF là cơ sở của mọi mô hình DCF - nhớ nó trước khi nhớ bất kỳ bội số nào."
      ]
    },
    {
      "fromDay": 23,
      "fromTitle": "Chi phí khác dòng tiền ra thế nào?",
      "text": "Chi phí kế toán ≠ dòng tiền ra trong cùng kỳ",
      "distractors": [
        "Nhóm đối chứng là thứ tách ảnh hưởng của thay đổi khỏi mọi biến động khác cùng thời điểm",
        "Ba quyết định: Đầu tư, Tài trợ, Phân phối"
      ]
    }
  ],
  "36": [
    {
      "fromDay": 31,
      "fromTitle": "Hàng tồn kho là gì?",
      "text": "Hàng tồn kho là vốn bị kẹt - cần quản lý chặt",
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
      "text": "AR là tiền khách nợ - chưa chắc đã thu được",
      "distractors": [
        "Beta = độ biến động tương đối so với thị trường",
        "Càng so sánh nhiều lần càng dễ bắt được một kết quả đẹp thuần túy do ngẫu nhiên"
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
        "Ác cảm mất mát (loss aversion): não bộ cảm nhận nỗi đau mất tiền mạnh gấp 2-2.5 lần niềm vui được cùng khoản tiền đó"
      ]
    }
  ],
  "39": [
    {
      "fromDay": 34,
      "fromTitle": "Tiền mặt trên báo cáo tài chính",
      "text": "Cash = tài sản thanh khoản nhất, rủi ro thấp nhất",
      "distractors": [
        "Disposition effect: xu hướng bán cổ phiếu lãi quá sớm, giữ cổ phiếu lỗ quá lâu - hệ quả trực tiếp của ác cảm mất mát",
        "Expiration date xa hơn → premium cao hơn (nhiều thời gian biến động hơn)"
      ]
    },
    {
      "fromDay": 27,
      "fromTitle": "Vốn chủ sở hữu là gì?",
      "text": "Equity = Tài sản − Nợ phải trả",
      "distractors": [
        "Alpha dương phản ánh kỹ năng thực sự của nhà quản lý quỹ, không phải may mắn ngắn hạn",
        "Tính cỡ mẫu trước khi chạy, và coi điểm dừng là cam kết chứ không phải lựa chọn"
      ]
    }
  ],
  "40": [
    {
      "fromDay": 35,
      "fromTitle": "Nợ ngắn hạn và nợ dài hạn",
      "text": "Nợ ngắn hạn: đáo hạn ≤ 12 tháng - rủi ro thanh khoản cao hơn",
      "distractors": [
        "Nhìn kết quả giữa chừng rồi dừng khi đẹp có thể đẩy tỷ lệ sai từ 5% lên trên 30%",
        "Duration: đo độ nhạy giá với lãi suất"
      ]
    },
    {
      "fromDay": 28,
      "fromTitle": "Tài sản = Nợ + Vốn chủ",
      "text": "Assets = Liabilities + Equity - luôn luôn cân bằng",
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
        "Chặng 6 xây hai lớp: BẢO VỆ (quỹ khẩn cấp, bảo hiểm, bảo mật trước lừa đảo) và TỔ CHỨC (ngân sách, tờ khai tài chính, thừa kế, biết khi nào cần tư vấn chuyên nghiệp)",
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
      "text": "CCC = DIO + DSO − DPO - đo hiệu quả quản lý vốn lưu động",
      "distractors": [
        "Nợ dài hạn: thời gian trả dài hơn, thường lãi cao hơn",
        "Ác cảm mất mát khiến nhiều người giữ quá nhiều tiền mặt, sợ rủi ro nhìn thấy được hơn là rủi ro vô hình như lạm phát"
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
        "Giá trị p nói về xác suất của dữ liệu, không phải xác suất giả thuyết đúng",
        "Càng so sánh nhiều lần càng dễ bắt được một kết quả đẹp thuần túy do ngẫu nhiên"
      ]
    },
    {
      "fromDay": 31,
      "fromTitle": "Hàng tồn kho là gì?",
      "text": "Hàng tồn kho là vốn bị kẹt - cần quản lý chặt",
      "distractors": [
        "Đặt quy tắc đầu tư rõ ràng trước khi thị trường biến động là cách hiệu quả nhất để trung hòa ảnh hưởng của thiên kiến này",
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
        "Ác cảm mất mát (loss aversion): não bộ cảm nhận nỗi đau mất tiền mạnh gấp 2-2.5 lần niềm vui được cùng khoản tiền đó",
        "Dùng YTM của trái phiếu hiện tại, không dùng lãi suất hợp đồng cũ"
      ]
    },
    {
      "fromDay": 32,
      "fromTitle": "Khoản phải thu là gì?",
      "text": "AR là tiền khách nợ - chưa chắc đã thu được",
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
      "text": "Assets = Liabilities + Equity - luôn cân",
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
        "Accrual: ghi nhận theo nghĩa vụ kinh tế, không theo tiền mặt"
      ]
    },
    {
      "fromDay": 34,
      "fromTitle": "Tiền mặt trên báo cáo tài chính",
      "text": "Cash = tài sản thanh khoản nhất, rủi ro thấp nhất",
      "distractors": [
        "Nhà đang ở là khoản chi tiêu cho nhu cầu ở, không phải khoản đầu tư tạo dòng tiền - dù giá trị có thể tăng theo thời gian",
        "Matching principle: doanh thu và chi phí khớp cùng kỳ"
      ]
    }
  ],
  "47": [
    {
      "fromDay": 42,
      "fromTitle": "Income Statement: Báo cáo kết quả kinh doanh",
      "text": "P&L đi từ Revenue xuống Net Income",
      "distractors": [
        "Hầu hết doanh nghiệp lớn bắt buộc dùng accrual",
        "Là một trong những đầu vào quan trọng nhất của mọi mô hình quản trị rủi ro danh mục"
      ]
    },
    {
      "fromDay": 35,
      "fromTitle": "Nợ ngắn hạn và nợ dài hạn",
      "text": "Nợ ngắn hạn: đáo hạn ≤ 12 tháng - rủi ro thanh khoản cao hơn",
      "distractors": [
        "IRR là discount rate làm NPV = 0",
        "Lãi kép: lãi trên lãi - sức mạnh thời gian"
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
        "Không có lãi suất cụ thể - đây là chi phí cơ hội của cổ đông",
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
      "text": "CCC = DIO + DSO − DPO - đo hiệu quả quản lý vốn lưu động",
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
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn"
      ]
    }
  ],
  "52": [
    {
      "fromDay": 47,
      "fromTitle": "Net Income: ý nghĩa và giới hạn",
      "text": "Net Income là bottom line - nhưng chỉ là con số kế toán",
      "distractors": [
        "Commodity = hàng hóa chuẩn hóa, price taker",
        "Market Risk Premium = Rm − Rf ≈ 5-7% lịch sử"
      ]
    },
    {
      "fromDay": 40,
      "fromTitle": "Ôn tập: Đọc ngôn ngữ kế toán",
      "text": "Assets = Liabilities + Equity - luôn cân",
      "distractors": [
        "Volatility cao không xấu về bản chất - cần cân nhắc cùng lợi nhuận kỳ vọng và khẩu vị rủi ro",
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
      "text": "Current assets: tiền mặt, AR, hàng tồn kho - thanh khoản trong 1 năm",
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
        "ROE: hiệu quả dùng vốn cổ đông để tạo lợi nhuận - càng cao càng tốt trong cùng ngành",
        "Passive investing: mô phỏng chỉ số, chi phí thấp hơn nhiều"
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
        "Lỗ kế toán ≠ hết tiền - D&A và WC tạo ra sự khác biệt",
        "Dữ liệu dài hạn cho thấy đa số quỹ chủ động khó vượt qua benchmark sau khi trừ phí"
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
        "Bảng tử suất (mortality table) cho biết xác suất tử vong theo tuổi - dựa trên dữ liệu thống kê lịch sử lớn, không phải dự đoán cho từng cá nhân cụ thể"
      ]
    },
    {
      "fromDay": 44,
      "fromTitle": "Operating Expense: SG&A, R&D",
      "text": "SG&A = chi phí vận hành gián tiếp (bán hàng + quản lý)",
      "distractors": [
        "YTM là tiêu chí so sánh trái phiếu, không phải coupon rate",
        "Actuary kết hợp xác suất VÀ giá trị thời gian của tiền để tính 'giá trị hiện tại kỳ vọng' của nghĩa vụ chi trả - nền tảng khoa học của việc định phí bảo hiểm"
      ]
    }
  ],
  "57": [
    {
      "fromDay": 52,
      "fromTitle": "Cash Flow Statement là gì?",
      "text": "3 phần: Operating, Investing, Financing",
      "distractors": [
        "Hữu ích nhất với ngân hàng, bảo hiểm, bất động sản - nơi sổ sách phản ánh sát giá trị thực",
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
        "Disposition effect: xu hướng bán cổ phiếu lãi quá sớm, giữ cổ phiếu lỗ quá lâu - hệ quả trực tiếp của ác cảm mất mát"
      ]
    },
    {
      "fromDay": 47,
      "fromTitle": "Net Income: ý nghĩa và giới hạn",
      "text": "Net Income là bottom line - nhưng chỉ là con số kế toán",
      "distractors": [
        "Life actuary (bảng tử suất, hợp đồng dài hạn) và Non-life/P&C actuary (tần suất-mức độ tổn thất, catastrophe modeling) có phương pháp luận khác nhau",
        "Bảng sống sót quan trọng cho sản phẩm niên kim/hưu trí - nơi rủi ro của công ty bảo hiểm là người mua sống THỌ HƠN dự kiến, ngược với bảo hiểm tử vong thông thường"
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
        "Giao cho AI những việc xử lý ngôn ngữ; giữ lại cho mình những việc gắn với trách nhiệm và bối cảnh riêng.",
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
        "Ác cảm mất mát khiến nhiều người giữ quá nhiều tiền mặt, sợ rủi ro nhìn thấy được hơn là rủi ro vô hình như lạm phát",
        "Financial model: dự báo tài chính theo giả định"
      ]
    },
    {
      "fromDay": 49,
      "fromTitle": "Current Assets và Non-current Assets",
      "text": "Current assets: tiền mặt, AR, hàng tồn kho - thanh khoản trong 1 năm",
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
      "text": "Lỗ kế toán ≠ hết tiền - D&A và WC tạo ra sự khác biệt",
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
        "Đặt quy tắc đầu tư rõ ràng trước khi thị trường biến động là cách hiệu quả nhất để trung hòa ảnh hưởng của thiên kiến này",
        "Một cảnh báo hay kết luận từ AI chỉ có giá trị khi kèm bằng chứng số liệu và nguồn."
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
        "Đừng đưa dữ liệu nội bộ hoặc dữ liệu mật lên công cụ AI nếu chưa được phép."
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
        "Quyết định cuối cùng - và trách nhiệm cho quyết định đó - luôn thuộc về bạn.",
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
        "AI là trợ lý đọc - viết rất nhanh, không phải người chịu trách nhiệm cho kết luận tài chính của bạn.",
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
        "Giá trị lớn nhất của AI với người mới là rút ngắn thời gian tiếp cận tài liệu dài, không phải đưa ra khuyến nghị mua bán.",
        "Mọi con số AI đưa ra chỉ đáng tin khi kèm nguồn: tài liệu nào, trang nào, đơn vị gì, kỳ nào."
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
      "text": "Lỗ kế toán ≠ hết tiền - D&A và WC tạo ra sự khác biệt",
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
      "text": "ROE = Net Income / Equity - quan trọng nhất với cổ đông",
      "distractors": [
        "Bắt đầu từ tác vụ nhỏ và dễ kiểm tra, rồi mới tăng độ khó - đó là cách học an toàn nhất.",
        "Thường có phí quản lý cao hơn nếu là quỹ chủ động, do chi phí nghiên cứu và vận hành"
      ]
    },
    {
      "fromDay": 59,
      "fromTitle": "Đọc báo cáo tài chính Apple/Vinamilk",
      "text": "Apple: OCF mạnh, FCF gần bằng OCF, buyback liên tục",
      "distractors": [
        "Trung lập với cơ cấu vốn và chính sách khấu hao - phù hợp so sánh công ty có đòn bẩy khác nhau",
        "Accrual: ghi nhận theo nghĩa vụ kinh tế, không theo tiền mặt"
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
        "Matching principle: doanh thu và chi phí khớp cùng kỳ"
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
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 61,
      "fromTitle": "Financial Ratios là gì?",
      "text": "Ratios chuẩn hóa số liệu để so sánh công bằng",
      "distractors": [
        "Alpha dương phản ánh kỹ năng thực sự của nhà quản lý quỹ, không phải may mắn ngắn hạn",
        "Rất khó tạo ra Alpha dương bền vững trong thị trường hiệu quả - lý do quỹ index thụ động ngày càng phổ biến"
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
        "Lịch sử khách hàng tốt làm tăng độ tin cậy nhưng không thay thế nghĩa vụ xác minh - tội phạm tìm đến tài khoản sạch chính vì lý do đó."
      ]
    }
  ],
  "75": [
    {
      "fromDay": 70,
      "fromTitle": "Debt-to-Equity: Nợ trên vốn chủ",
      "text": "D/E = Total Debt / Equity - đo đòn bẩy tài chính",
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
        "Payback: đơn giản, đo thanh khoản - dùng như metric phụ"
      ]
    }
  ],
  "77": [
    {
      "fromDay": 72,
      "fromTitle": "Asset Turnover: Hiệu quả sử dụng tài sản",
      "text": "Asset Turnover = Revenue / Total Assets",
      "distractors": [
        "Lời giải thích bằng miệng chỉ có giá trị khi kèm tài liệu chứng minh khớp với nội dung giải thích.",
        "Tài khoản trung gian có mẫu hình khá đặc trưng: ngủ đông rồi bùng nổ, tiền vào ra trong ngày, số dư cuối ngày xấp xỉ bằng không."
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
        "Chức năng tuân thủ phải độc lập với kinh doanh; áp lực bỏ qua bước xác minh cần được ghi nhận và báo cáo theo đường riêng."
      ]
    },
    {
      "fromDay": 66,
      "fromTitle": "ROE: Lợi nhuận trên vốn chủ",
      "text": "ROE = Net Income / Equity - quan trọng nhất với cổ đông",
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
        "KYC là nền móng của AML: không biết rõ khách hàng thì không có cơ sở nào để nói một giao dịch là bất thường.",
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
        "Rửa tiền diễn ra theo ba giai đoạn - sắp xếp, phân tán, hợp nhất - và mỗi giai đoạn để lại loại dấu vết khác nhau."
      ]
    }
  ],
  "82": [
    {
      "fromDay": 77,
      "fromTitle": "P/E Ratio là gì?",
      "text": "P/E = Price / EPS - trả bao nhiêu lần lợi nhuận",
      "distractors": [
        "Strike price gần giá thị trường hơn → premium cao hơn (với option có lợi)",
        "Mọi nguồn vốn đều có chi phí cơ hội"
      ]
    },
    {
      "fromDay": 70,
      "fromTitle": "Debt-to-Equity: Nợ trên vốn chủ",
      "text": "D/E = Total Debt / Equity - đo đòn bẩy tài chính",
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
        "CCC = DIO + DSO − DPO - đo hiệu quả quản lý vốn lưu động"
      ]
    },
    {
      "fromDay": 71,
      "fromTitle": "Interest Coverage: Khả năng trả lãi vay",
      "text": "Interest Coverage = EBIT / Interest Expense",
      "distractors": [
        "Không có di chúc, tài sản chia theo pháp luật (hàng thừa kế thứ nhất: vợ/chồng, cha mẹ, con) - không nhất thiết theo mong muốn thực sự của người mất",
        "Hầu hết doanh nghiệp lớn bắt buộc dùng accrual"
      ]
    }
  ],
  "84": [
    {
      "fromDay": 79,
      "fromTitle": "EV/EBITDA là gì?",
      "text": "EV/EBITDA trung lập với cơ cấu vốn và khấu hao",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị"
      ]
    },
    {
      "fromDay": 72,
      "fromTitle": "Asset Turnover: Hiệu quả sử dụng tài sản",
      "text": "Asset Turnover = Revenue / Total Assets",
      "distractors": [
        "Passive investing: mô phỏng chỉ số, chi phí thấp hơn nhiều",
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
        "Dữ liệu dài hạn cho thấy đa số quỹ chủ động khó vượt qua benchmark sau khi trừ phí"
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
        "D/E = Total Debt / Equity - đo đòn bẩy tài chính",
        "Chân dung khách hàng phải được cập nhật liên tục, không đóng băng ở thời điểm mở tài khoản."
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
        "Bảng tử suất (mortality table) cho biết xác suất tử vong theo tuổi - dựa trên dữ liệu thống kê lịch sử lớn, không phải dự đoán cho từng cá nhân cụ thể"
      ]
    },
    {
      "fromDay": 75,
      "fromTitle": "Cash Conversion Cycle",
      "text": "CCC = DIO + DSO − DPO",
      "distractors": [
        "Quy trình phân tích hoàn chỉnh: đọc báo cáo → tính chỉ số → định giá → đánh giá rủi ro → đối chiếu thị trường",
        "Actuary kết hợp xác suất VÀ giá trị thời gian của tiền để tính 'giá trị hiện tại kỳ vọng' của nghĩa vụ chi trả - nền tảng khoa học của việc định phí bảo hiểm"
      ]
    }
  ],
  "88": [
    {
      "fromDay": 83,
      "fromTitle": "Discount Rate: Tỷ lệ chiết khấu",
      "text": "Discount rate = chi phí cơ hội + phần bù rủi ro",
      "distractors": [
        "Xếp loại rủi ro dựa trên khả năng bị lạm dụng, không dựa trên quy mô số dư của khách hàng.",
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
      "text": "Compounding: lãi trên lãi trên lãi - hàm mũ",
      "distractors": [
        "Ratios chuẩn hóa số liệu để so sánh công bằng",
        "Standard deviation: công cụ toán học chính xác đo mức độ phân tán của lợi suất"
      ]
    },
    {
      "fromDay": 77,
      "fromTitle": "P/E Ratio là gì?",
      "text": "P/E = Price / EPS - trả bao nhiêu lần lợi nhuận",
      "distractors": [
        "Thời gian đầu tư quan trọng hơn số tiền đóng góp trong lãi kép dài hạn",
        "Quy trình chuẩn gồm năm khâu: nhận biết khách hàng, sàng lọc danh sách, giám sát giao dịch, rà soát cảnh báo, và báo cáo khi đủ cơ sở."
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
        "Báo cáo giao dịch đáng ngờ dựa trên phân tích dấu hiệu, không phụ thuộc vào việc giao dịch có vượt ngưỡng số tiền hay không."
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
        "P/B thấp không tự động nghĩa là 'rẻ'- cần phân tích chất lượng tài sản và ROE đi kèm",
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
        "Life actuary (bảng tử suất, hợp đồng dài hạn) và Non-life/P&C actuary (tần suất-mức độ tổn thất, catastrophe modeling) có phương pháp luận khác nhau",
        "WACC = discount rate, DCF = định giá bằng dòng tiền"
      ]
    },
    {
      "fromDay": 80,
      "fromTitle": "Ôn tập: Dùng chỉ số để so sánh doanh nghiệp",
      "text": "4 nhóm ratios: Profitability, Liquidity, Leverage, Valuation",
      "distractors": [
        "Giảm CCC = giải phóng vốn, cải thiện FCF",
        "Bảng sống sót quan trọng cho sản phẩm niên kim/hưu trí - nơi rủi ro của công ty bảo hiểm là người mua sống THỌ HƠN dự kiến, ngược với bảo hiểm tử vong thông thường"
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
        "Lợi nhuận cao + cam kết 'không rủi ro' là dấu hiệu cảnh báo lừa đảo rõ ràng nhất - nguyên tắc rủi ro-lợi nhuận không có ngoại lệ"
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
        "Cấm tiết lộ là ranh giới pháp lý tuyệt đối: không được để đối tượng biết mình đang bị báo cáo."
      ]
    },
    {
      "fromDay": 83,
      "fromTitle": "Discount Rate: Tỷ lệ chiết khấu",
      "text": "Discount rate = chi phí cơ hội + phần bù rủi ro",
      "distractors": [
        "Giao cho AI những việc xử lý ngôn ngữ; giữ lại cho mình những việc gắn với trách nhiệm và bối cảnh riêng.",
        "Ngưỡng cảnh báo quá nhạy làm hệ thống yếu đi vì cảnh báo thật bị chôn giữa dương tính giả."
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
        "Một cảnh báo hay kết luận từ AI chỉ có giá trị khi kèm bằng chứng số liệu và nguồn."
      ]
    },
    {
      "fromDay": 84,
      "fromTitle": "Compounding: Lãi kép trong đầu tư",
      "text": "Compounding: lãi trên lãi trên lãi - hàm mũ",
      "distractors": [
        "Duration cao hơn khuếch đại cả lãi và lỗ khi lãi suất biến động",
        "Annuity = chuỗi thanh toán đều trong thời gian cố định"
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
        "Đừng đưa dữ liệu nội bộ hoặc dữ liệu mật lên công cụ AI nếu chưa được phép."
      ]
    }
  ],
  "98": [
    {
      "fromDay": 93,
      "fromTitle": "WACC là gì?",
      "text": "WACC = Ke×(E/V) + Kd×(1−T)×(D/V)",
      "distractors": [
        "P/E: giá phải trả cho mỗi đồng lợi nhuận - thấp hơn nghĩa là rẻ hơn tương đối, nhưng cần so cùng ngành",
        "**Ứng dụng:** trả góp, bảo hiểm, trái phiếu coupon"
      ]
    },
    {
      "fromDay": 86,
      "fromTitle": "Annuity: Dòng tiền đều",
      "text": "Annuity = chuỗi thanh toán đều trong thời gian cố định",
      "distractors": [
        "Nợ trả từ FCF của công ty mục tiêu",
        "Hàng tồn kho là vốn bị kẹt - cần quản lý chặt"
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
        "Quyết định cuối cùng - và trách nhiệm cho quyết định đó - luôn thuộc về bạn."
      ]
    }
  ],
  "100": [
    {
      "fromDay": 95,
      "fromTitle": "Cost of Equity: Chi phí vốn chủ",
      "text": "Cost of Equity > Cost of Debt - cổ đông chịu rủi ro cao hơn",
      "distractors": [
        "PV Annuity = PMT × [(1−(1+r)^−n)/r]",
        "Cần tính chi tiêu theo giá trị hiện tại, sau đó điều chỉnh theo lạm phát dự kiến đến năm nghỉ hưu"
      ]
    },
    {
      "fromDay": 88,
      "fromTitle": "NPV: Giá trị hiện tại ròng",
      "text": "NPV > 0: tạo giá trị; NPV < 0: phá hủy giá trị",
      "distractors": [
        "Asset Turnover = Revenue / Total Assets",
        "AI là trợ lý đọc - viết rất nhanh, không phải người chịu trách nhiệm cho kết luận tài chính của bạn."
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
        "Giá trị lớn nhất của AI với người mới là rút ngắn thời gian tiếp cận tài liệu dài, không phải đưa ra khuyến nghị mua bán."
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
        "Khác ETF ở cơ chế giao dịch - không mua bán liên tục trong phiên",
        "Cao hơn = tạo doanh thu hiệu quả hơn từ tài sản"
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
        "Retained earnings âm = accumulated deficit - lỗ tích lũy"
      ]
    },
    {
      "fromDay": 92,
      "fromTitle": "Cost of Capital: Chi phí vốn",
      "text": "Mọi nguồn vốn đều có chi phí cơ hội",
      "distractors": [
        "Đòn bẩy cao khiến speculation bằng phái sinh rủi ro hơn nhiều so với giao dịch tài sản cơ sở trực tiếp",
        "Asset-light: turnover cao; Asset-heavy: turnover thấp"
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
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi."
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
      "text": "Cost of Equity > Cost of Debt - cổ đông chịu rủi ro cao hơn",
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
        "Đặt chiều rộng tối đa cho mọi ảnh ngay từ đầu tệp CSS.",
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
        "Chiều cao sập là bệnh của thuộc tính nổi; flexbox và lưới không có vấn đề đó."
      ]
    }
  ],
  "110": [
    {
      "fromDay": 105,
      "fromTitle": "Lý thuyết Modigliani-Miller",
      "text": "MM (no tax): cơ cấu vốn không quan trọng trong thị trường hoàn hảo",
      "distractors": [
        "Nhà đang ở là khoản chi tiêu cho nhu cầu ở, không phải khoản đầu tư tạo dòng tiền - dù giá trị có thể tăng theo thời gian",
        "Assets = Liabilities + Equity - luôn luôn cân bằng"
      ]
    },
    {
      "fromDay": 98,
      "fromTitle": "Risk-Free Rate và Market Risk Premium",
      "text": "Risk-free rate = T-bill Mỹ hoặc trái phiếu chính phủ dài hạn",
      "distractors": [
        "Hạn chế: kế thừa sai lệch nếu cả ngành/thị trường đang bị định giá sai một cách hệ thống",
        "Mọi con số AI đưa ra chỉ đáng tin khi kèm nguồn: tài liệu nào, trang nào, đơn vị gì, kỳ nào."
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
        "Bắt đầu từ tác vụ nhỏ và dễ kiểm tra, rồi mới tăng độ khó - đó là cách học an toàn nhất."
      ]
    },
    {
      "fromDay": 99,
      "fromTitle": "Tính NPV một dự án đơn giản",
      "text": "NPV = PV(dòng tiền) − Đầu tư ban đầu",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
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
        "Thứ tự chồng lớp chỉ có tác dụng khi phần tử đã rời khỏi kiểu định vị tĩnh.",
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
        "Ngữ cảnh chồng lớp nhốt con lại - giá trị lớn tới đâu cũng không vượt ra ngoài được.",
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
        "Alpha dương phản ánh kỹ năng thực sự của nhà quản lý quỹ, không phải may mắn ngắn hạn",
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
        "Rất khó tạo ra Alpha dương bền vững trong thị trường hiệu quả - lý do quỹ index thụ động ngày càng phổ biến",
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
        "Bậc thang = nhiều sổ kỳ hạn dài, ngày đáo hạn lệch nhau đều đặn",
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
        "Lịch sử khách hàng tốt làm tăng độ tin cậy nhưng không thay thế nghĩa vụ xác minh - tội phạm tìm đến tài khoản sạch chính vì lý do đó."
      ]
    },
    {
      "fromDay": 107,
      "fromTitle": "Mua lại cổ phiếu (Share Buyback)",
      "text": "Buyback = giảm shares outstanding → EPS tăng",
      "distractors": [
        "Lời giải thích bằng miệng chỉ có giá trị khi kèm tài liệu chứng minh khớp với nội dung giải thích.",
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
        "Kết quả: hưởng lãi kỳ hạn dài mà vẫn có tiền về định kỳ, không phải phá sổ",
        "Khoảng cách giữa các lần đáo hạn đúng bằng khoảng cách giữa các lần mở sổ"
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
        "DIO = 365 / Turnover - số ngày trung bình để bán hết hàng"
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
        "Cái giá là công theo dõi nhiều ngày đáo hạn, không phải tiền",
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
        "Tài khoản trung gian có mẫu hình khá đặc trưng: ngủ đông rồi bùng nổ, tiền vào ra trong ngày, số dư cuối ngày xấp xỉ bằng không.",
        "Chi phí y tế có xu hướng tăng theo tuổi tác, nên cộng thêm một khoản dự phòng riêng cho y tế"
      ]
    },
    {
      "fromDay": 114,
      "fromTitle": "CapEx vs OpEx",
      "text": "CapEx: tài sản dài hạn, khấu hao dần",
      "distractors": [
        "DuPont phân tích: Margin × Turnover × Leverage",
        "Chức năng tuân thủ phải độc lập với kinh doanh; áp lực bỏ qua bước xác minh cần được ghi nhận và báo cáo theo đường riêng."
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
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc"
      ]
    },
    {
      "fromDay": 115,
      "fromTitle": "Burn Rate và Runway",
      "text": "Runway = Cash ÷ Net Burn Rate",
      "distractors": [
        "KYC là nền móng của AML: không biết rõ khách hàng thì không có cơ sở nào để nói một giao dịch là bất thường.",
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
        "Kết hợp nhiều ratios - một ratios không đủ để ra quyết định",
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
        "Rửa tiền diễn ra theo ba giai đoạn - sắp xếp, phân tán, hợp nhất - và mỗi giai đoạn để lại loại dấu vết khác nhau.",
        "FV = PV × (1+r)^n"
      ]
    },
    {
      "fromDay": 117,
      "fromTitle": "LBO là gì?",
      "text": "LBO: mua công ty với 60-80% nợ",
      "distractors": [
        "ROE: hiệu quả dùng vốn cổ đông để tạo lợi nhuận - càng cao càng tốt trong cùng ngành",
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
        "Dùng cho Terminal Value trong DCF - nhạy cảm với giả định g",
        "Option hoạt động như một dạng bảo hiểm tài chính có thể định giá được"
      ]
    },
    {
      "fromDay": 118,
      "fromTitle": "Venture Capital là gì?",
      "text": "VC: đầu tư mạo hiểm, chấp nhận rủi ro cao",
      "distractors": [
        "Chân dung khách hàng phải được cập nhật liên tục, không đóng băng ở thời điểm mở tài khoản.",
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
        "Xếp loại rủi ro dựa trên khả năng bị lạm dụng, không dựa trên quy mô số dư của khách hàng."
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
        "Quy trình chuẩn gồm năm khâu: nhận biết khách hàng, sàng lọc danh sách, giám sát giao dịch, rà soát cảnh báo, và báo cáo khi đủ cơ sở.",
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
        "Quy trình phân tích hoàn chỉnh: đọc báo cáo → tính chỉ số → định giá → đánh giá rủi ro → đối chiếu thị trường",
        "200 ngày xây dựng tư duy phân tích, không phải một danh sách công thức để học thuộc - đây là nền tảng để tự phân tích bất kỳ doanh nghiệp nào"
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
        "Đọc BS: tài sản ngắn hạn vs nợ ngắn hạn trước",
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
        "Báo cáo giao dịch đáng ngờ dựa trên phân tích dấu hiệu, không phụ thuộc vào việc giao dịch có vượt ngưỡng số tiền hay không.",
        "Book Value = Total Equity - nền tảng tính P/B"
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
        "Debt/Equity ratio từ BS cho biết đòn bẩy tài chính"
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
        "Bảo hiểm xử lý rủi ro đuôi (tail risk) - xác suất thấp nhưng thiệt hại cực lớn mà đầu tư không thể phòng ngừa"
      ]
    },
    {
      "fromDay": 126,
      "fromTitle": "Equity Value vs Enterprise Value",
      "text": "Equity Value: giá trị dành cho cổ đông; Enterprise Value: giá trị toàn bộ doanh nghiệp",
      "distractors": [
        "Software/SaaS có operating margin cao nhất do scalability",
        "Cấm tiết lộ là ranh giới pháp lý tuyệt đối: không được để đối tượng biết mình đang bị báo cáo."
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
        "Bán chéo chuyên nghiệp (needs-based selling) khác biệt hoàn toàn với 'nhồi nhét sản phẩm' - bắt đầu từ việc hiểu nhu cầu thực sự qua fact-finding, không phải từ sản phẩm cần đẩy doanh số"
      ]
    }
  ],
  "140": [
    {
      "fromDay": 135,
      "fromTitle": "FCFE là gì?",
      "text": "FCFE: dòng tiền tự do còn lại chỉ thuộc về cổ đông, sau nghĩa vụ nợ",
      "distractors": [
        "Chặng 6 xây hai lớp: BẢO VỆ (quỹ khẩn cấp, bảo hiểm, bảo mật trước lừa đảo) và TỔ CHỨC (ngân sách, tờ khai tài chính, thừa kế, biết khi nào cần tư vấn chuyên nghiệp)",
        "Market Risk Premium = Rm − Rf ≈ 5-7% lịch sử"
      ]
    },
    {
      "fromDay": 128,
      "fromTitle": "P/B dùng khi nào?",
      "text": "P/B = Giá cổ phiếu / Book Value per Share",
      "distractors": [
        "ROA = Net Income / Total Assets",
        "Ngưỡng cảnh báo quá nhạy làm hệ thống yếu đi vì cảnh báo thật bị chôn giữa dương tính giả."
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
        "Annuity = chuỗi thanh toán đều trong thời gian cố định",
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
        "Customer Lifetime Value (giá trị vòng đời khách hàng) thường lớn hơn nhiều so với lợi ích một giao dịch bán chéo ép buộc - tư vấn đúng xây dựng niềm tin và referral dài hạn",
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
        "Vụ bê bối Wells Fargo minh họa hậu quả nghiêm trọng khi hệ thống KPI/incentive được thiết kế sai, khuyến khích hành vi mis-selling",
        "Fact-finding toàn diện (mục tiêu, thu nhập, nợ, khẩu vị rủi ro, hoàn cảnh gia đình) là nền tảng bắt buộc trước khi đề xuất bất kỳ sản phẩm tài chính nào"
      ]
    },
    {
      "fromDay": 132,
      "fromTitle": "Precedent Transaction là gì?",
      "text": "Precedent Transaction: dùng giá thực tế từ các thương vụ M&A đã hoàn tất",
      "distractors": [
        "Lãi kép: lãi trên lãi - sức mạnh thời gian",
        "Bondholders ưu tiên trước stockholders trong phá sản"
      ]
    }
  ],
  "145": [
    {
      "fromDay": 140,
      "fromTitle": "nhỏ - Định giá một công ty bằng P/E và DCF đơn giản",
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
        "Volatility cao không xấu về bản chất - cần cân nhắc cùng lợi nhuận kỳ vọng và khẩu vị rủi ro"
      ]
    },
    {
      "fromDay": 135,
      "fromTitle": "FCFE là gì?",
      "text": "FCFE: dòng tiền tự do còn lại chỉ thuộc về cổ đông, sau nghĩa vụ nợ",
      "distractors": [
        "Hai loại phổ biến nhất: Interest Rate Swap và Currency Swap",
        "ROE = Net Income / Equity - quan trọng nhất với cổ đông"
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
        "Notional principal thường không đổi tay - chỉ phần chênh lệch (net) được thanh toán",
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
        "Từng khoản đều xử lý được; sự chồng lấn mới là thứ làm kế hoạch vỡ",
        "Tăng tỷ trọng tài sản lợi nhuận cao hơn sẽ kéo expected return tổng thể lên, kèm rủi ro tăng theo"
      ]
    },
    {
      "fromDay": 137,
      "fromTitle": "Gordon Growth Method",
      "text": "Gordon Growth Method: Terminal Value = FCF cuối × (1+g) / (WACC − g)",
      "distractors": [
        "3-statement model: P&L → BS → CFS liên kết",
        "Giai đoạn lập gia đình thường có nhiều khoản chồng nhau nhất, đúng lúc thu nhập chưa đạt đỉnh"
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
        "Biết trước cho bạn ba cách xử lý rẻ: dời, giãn, hoặc bắt đầu sớm hơn",
        "Xác định trước khoản nào sẽ giảm quy mô, thay vì quyết định điều đó dưới áp lực"
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
        "**Ứng dụng:** trả góp, bảo hiểm, trái phiếu coupon"
      ]
    },
    {
      "fromDay": 140,
      "fromTitle": "nhỏ - Định giá một công ty bằng P/E và DCF đơn giản",
      "text": "Thực hành định giá chuyên nghiệp luôn kết hợp nhiều phương pháp, không chỉ dựa vào một con số",
      "distractors": [
        "PV Annuity = PMT × [(1−(1+r)^−n)/r]",
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
        "Đàm phán ở việc chính có tỷ suất cao nhất trên thời gian, nên nó đứng trước nghề tay trái"
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
        "Asset Turnover = Revenue / Total Assets",
        "Cao hơn = tạo doanh thu hiệu quả hơn từ tài sản"
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
        "Hai tháng đầu chỉ cần hai việc rẻ: đo dải thị trường và mở sổ ghi kết quả",
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
        "Hữu ích nhất với ngân hàng, bảo hiểm, bất động sản - nơi sổ sách phản ánh sát giá trị thực",
        "Ngân sách chạy song song suốt năm, nếu không phần tăng thêm sẽ biến mất"
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
        "Asset-light: turnover cao; Asset-heavy: turnover thấp"
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
        "Làm cả bốn nhánh cùng lúc là cách chắc chắn để không nhánh nào đủ sâu",
        "Nhược: không matching, dễ bóp méo lợi nhuận"
      ]
    },
    {
      "fromDay": 148,
      "fromTitle": "Lạm phát và tác động đến đầu tư",
      "text": "Lãi suất thực âm = tích lũy tiền mặt mất sức mua",
      "distractors": [
        "Bậc thang = nhiều sổ kỳ hạn dài, ngày đáo hạn lệch nhau đều đặn",
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
        "Bảng cân đối không cân = lỗi hoặc gian lận"
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
        "Double-entry: mỗi giao dịch ghi hai chiều",
        "Risk-free rate là nền tảng của mọi mô hình định giá tài chính"
      ]
    }
  ],
  "164": [
    {
      "fromDay": 159,
      "fromTitle": "nhỏ - Đọc đường cong lợi suất",
      "text": "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
      "distractors": [
        "Nguyên tắc này tự động phát hiện nhiều loại sai sót",
        "Merger: hợp nhất bình đẳng; Acquisition: mua và kiểm soát"
      ]
    },
    {
      "fromDay": 152,
      "fromTitle": "Ôn tập: Trái phiếu & Lãi suất",
      "text": "Lãi suất: công cụ điều hành kinh tế mạnh nhất",
      "distractors": [
        "Kết quả: hưởng lãi kỳ hạn dài mà vẫn có tiền về định kỳ, không phải phá sổ",
        "Equity Value: giá trị dành cho cổ đông; Enterprise Value: giá trị toàn bộ doanh nghiệp"
      ]
    }
  ],
  "165": [
    {
      "fromDay": 160,
      "fromTitle": "Tổng ôn Chặng 8 - Trái phiếu là thế giới của lãi suất và niềm tin",
      "text": "Trái phiếu vận hành trên hai trục: giá trị thời gian của tiền và niềm tin tín dụng",
      "distractors": [
        "Khoảng cách giữa các lần đáo hạn đúng bằng khoảng cách giữa các lần mở sổ",
        "Tài sản = Nợ phải trả + Vốn chủ sở hữu, và nó luôn cân: hai cột là cùng một số tiền nhìn từ hai phía."
      ]
    },
    {
      "fromDay": 153,
      "fromTitle": "Default là gì?",
      "text": "Default: vi phạm nghĩa vụ trả nợ, không nhất thiết là phá sản",
      "distractors": [
        "Gordon Growth Method: Terminal Value = FCF cuối × (1+g) / (WACC − g)",
        "Cái giá là công theo dõi nhiều ngày đáo hạn, không phải tiền"
      ]
    }
  ],
  "166": [
    {
      "fromDay": 161,
      "fromTitle": "Portfolio là gì?",
      "text": "Portfolio: tập hợp tài sản được quản lý như một thể thống nhất",
      "distractors": [
        "Non-current: PP&E, intangibles, goodwill - dài hạn",
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
      "fromTitle": "Diversification - Đa dạng hóa",
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
      "fromTitle": "Correlation - Tương quan giữa các tài sản",
      "text": "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)",
      "distractors": [
        "EPS = Net Income / Diluted Shares - dùng cho P/E",
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc"
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
      "fromTitle": "Volatility - Biến động",
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
        "Tài sản ngắn hạn là những gì thành tiền trong 12 tháng - nhà xưởng và goodwill không nằm trong đó.",
        "PV Annuity = PMT × [(1−(1+r)^−n)/r]"
      ]
    },
    {
      "fromDay": 159,
      "fromTitle": "nhỏ - Đọc đường cong lợi suất",
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
      "fromTitle": "Tổng ôn Chặng 8 - Trái phiếu là thế giới của lãi suất và niềm tin",
      "text": "Trái phiếu vận hành trên hai trục: giá trị thời gian của tiền và niềm tin tín dụng",
      "distractors": [
        "Current Ratio trên 1,5 và D/E dưới 2,0 là hai ngưỡng đọc đầu tiên, không phải kết luận cuối cùng.",
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
        "'Valuation football field'- dải giá trị từ nhiều phương pháp - là công cụ chuẩn trong thực hành định giá chuyên nghiệp"
      ]
    },
    {
      "fromDay": 161,
      "fromTitle": "Portfolio là gì?",
      "text": "Portfolio: tập hợp tài sản được quản lý như một thể thống nhất",
      "distractors": [
        "Net Change in Cash = OCF + ICF + FCF",
        "Goodwill chỉ sinh ra từ M&A. Thương hiệu tự xây không được ghi nhận, còn goodwill lớn là rủi ro ghi giảm."
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
        "Hai trục quyết định độ tin cậy: nguồn bên ngoài hay nội bộ, và kiểm toán viên tự lấy hay nhận lại",
        "Quy trình phân tích hoàn chỉnh: đọc báo cáo → tính chỉ số → định giá → đánh giá rủi ro → đối chiếu thị trường"
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
      "fromTitle": "Diversification - Đa dạng hóa",
      "text": "Đa dạng hóa: phân bổ vốn vào nhiều tài sản để giảm rủi ro không hệ thống",
      "distractors": [
        "Chi phí danh mục là tổng của nhiều loại phí: phí quỹ (expense ratio), phí giao dịch, phí lưu ký, phí tư vấn - không chỉ một khoản riêng lẻ",
        "200 ngày xây dựng tư duy phân tích, không phải một danh sách công thức để học thuộc - đây là nền tảng để tự phân tích bất kỳ doanh nghiệp nào"
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
        "Thư xác nhận phải gửi thẳng về kiểm toán viên, đi qua doanh nghiệp là mất giá trị"
      ]
    },
    {
      "fromDay": 164,
      "fromTitle": "Correlation - Tương quan giữa các tài sản",
      "text": "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)",
      "distractors": [
        "Đo hiệu quả vận hành sau SG&A và R&D",
        "Thử nghiệm kiểm soát xem quy trình chạy tốt không; thử nghiệm cơ bản kiểm tra chính con số"
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
      "fromTitle": "Volatility - Biến động",
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
        "Kiểm soát tốt thì giảm được thử nghiệm cơ bản - đây là lý do phí kiểm toán khác nhau",
        "Kiến thức tự học (như các bài học trong track này) giúp bạn đặt câu hỏi thông minh hơn và đánh giá được chất lượng lời khuyên từ chuyên gia"
      ]
    },
    {
      "fromDay": 166,
      "fromTitle": "Standard Deviation trong đầu tư",
      "text": "Standard deviation: công cụ toán học chính xác đo mức độ phân tán của lợi suất",
      "distractors": [
        "Trung lập với cơ cấu vốn và chính sách khấu hao - phù hợp so sánh công ty có đòn bẩy khác nhau",
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
        "Giải trình của ban giám đốc bổ sung chứ không thay thế bằng chứng độc lập",
        "Nhược: không matching, dễ bóp méo lợi nhuận"
      ]
    },
    {
      "fromDay": 167,
      "fromTitle": "Expected Return của danh mục",
      "text": "Expected Return của danh mục = trung bình có trọng số theo tỷ trọng từng tài sản",
      "distractors": [
        "Không cần toàn bộ danh mục ở nước ngoài - một tỷ trọng vừa phải (ví dụ 20-30%) đã đủ để giảm rủi ro tập trung đáng kể",
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
        "Đọc BS: tài sản ngắn hạn vs nợ ngắn hạn trước"
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
        "Book Value = Total Equity - nền tảng tính P/B"
      ]
    }
  ],
  "182": [
    {
      "fromDay": 177,
      "fromTitle": "Mutual Fund là gì?",
      "text": "Mutual Fund: quỹ tương hỗ, định giá và giao dịch một lần mỗi ngày theo NAV",
      "distractors": [
        "Khoảng cách quan trọng nhất là từ HIỂU đến LÀM - kiến thức chỉ tạo ra khác biệt khi trở thành thói quen thực hành đều đặn",
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
      "fromTitle": "nhỏ - Xây danh mục 3 tài sản",
      "text": "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản",
      "distractors": [
        "Debt/Equity ratio từ BS cho biết đòn bẩy tài chính",
        "Bảng khấu hao: số dư đầu kỳ + CapEx − khấu hao = số dư cuối kỳ"
      ]
    },
    {
      "fromDay": 172,
      "fromTitle": "Alpha là gì?",
      "text": "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
      "distractors": [
        "ROE: hiệu quả dùng vốn cổ đông để tạo lợi nhuận - càng cao càng tốt trong cùng ngành",
        "Bán chéo chuyên nghiệp (needs-based selling) khác biệt hoàn toàn với 'nhồi nhét sản phẩm' - bắt đầu từ việc hiểu nhu cầu thực sự qua fact-finding, không phải từ sản phẩm cần đẩy doanh số"
      ]
    }
  ],
  "185": [
    {
      "fromDay": 180,
      "fromTitle": "Tổng ôn Chặng 9 - Đầu tư là quản lý rủi ro, không chỉ săn lợi nhuận",
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
        "Vốn lưu động dự phóng theo số ngày luân chuyển DIO/DSO/DPO, tự co giãn theo quy mô",
        "Customer Lifetime Value (giá trị vòng đời khách hàng) thường lớn hơn nhiều so với lợi ích một giao dịch bán chéo ép buộc - tư vấn đúng xây dựng niềm tin và referral dài hạn"
      ]
    },
    {
      "fromDay": 174,
      "fromTitle": "Tracking Error là gì?",
      "text": "Tracking Error: đo mức độ lệch giữa lợi suất quỹ và benchmark nó theo dõi",
      "distractors": [
        "Một chỉ số đơn lẻ (như P/E) không bao giờ đủ để ra quyết định đầu tư",
        "Current assets: tiền mặt, AR, hàng tồn kho - thanh khoản trong 1 năm"
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
        "Vụ bê bối Wells Fargo minh họa hậu quả nghiêm trọng khi hệ thống KPI/incentive được thiết kế sai, khuyến khích hành vi mis-selling"
      ]
    },
    {
      "fromDay": 175,
      "fromTitle": "Active vs Passive Investing",
      "text": "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
      "distractors": [
        "Fact-finding toàn diện (mục tiêu, thu nhập, nợ, khẩu vị rủi ro, hoàn cảnh gia đình) là nền tảng bắt buộc trước khi đề xuất bất kỳ sản phẩm tài chính nào",
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
        "Chỉ THAY ĐỔI vốn lưu động giữa hai kỳ mới chảy vào dòng tiền, không phải số dư",
        "Từng khoản đều xử lý được; sự chồng lấn mới là thứ làm kế hoạch vỡ"
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
        "Giai đoạn lập gia đình thường có nhiều khoản chồng nhau nhất, đúng lúc thu nhập chưa đạt đỉnh",
        "Cash accounting: ghi nhận khi thực sự nhận tiền"
      ]
    },
    {
      "fromDay": 179,
      "fromTitle": "nhỏ - Xây danh mục 3 tài sản",
      "text": "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản",
      "distractors": [
        "SG&A = chi phí vận hành gián tiếp (bán hàng + quản lý)",
        "Biết trước cho bạn ba cách xử lý rẻ: dời, giãn, hoặc bắt đầu sớm hơn"
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
      "fromTitle": "Tổng ôn Chặng 9 - Đầu tư là quản lý rủi ro, không chỉ săn lợi nhuận",
      "text": "Đầu tư thành công là quản lý rủi ro có hệ thống, không chỉ săn lợi nhuận cao nhất",
      "distractors": [
        "Giữ vốn lưu động cố định khi doanh thu tăng mạnh sẽ cho dòng tiền dự phóng phi thực tế",
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
        "Deepfake AI giả mạo hình ảnh/giọng nói là hình thức lừa đảo mới đang gia tăng - luôn xác minh qua kênh độc lập trước khi chuyển tiền theo yêu cầu khẩn cấp",
        "Hầu hết doanh nghiệp lớn bắt buộc dùng accrual"
      ]
    },
    {
      "fromDay": 181,
      "fromTitle": "Derivatives là gì?",
      "text": "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác",
      "distractors": [
        "Phí thuần = xác suất xảy ra × số tiền bảo hiểm, chiết khấu về hiện tại.",
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
        "Xác định trước khoản nào sẽ giảm quy mô, thay vì quyết định điều đó dưới áp lực"
      ]
    }
  ],
  "195": [
    {
      "fromDay": 190,
      "fromTitle": "Speculation là gì?",
      "text": "Speculation: đặt cược vào hướng giá để kiếm lời, không có rủi ro nền tảng cần bảo vệ",
      "distractors": [
        "Đàm phán ở việc chính có tỷ suất cao nhất trên thời gian, nên nó đứng trước nghề tay trái",
        "Phí gộp = phí thuần + chi phí quản lý + hoa hồng + biên an toàn."
      ]
    },
    {
      "fromDay": 183,
      "fromTitle": "Futures Contract là gì?",
      "text": "Futures: chuẩn hóa, giao dịch qua sàn, có clearing house đảm bảo",
      "distractors": [
        "Luật số lớn là nền của cả mô hình - nó đòi hỏi các rủi ro độc lập với nhau.",
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
        "Tập khách hàng bảo hiểm khoẻ hơn dân số chung, nên bảng tử vong phải điều chỉnh."
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
        "Khấu hao cộng vào làm dòng tiền cao hơn lợi nhuận; vốn lưu động là thứ kéo nó xuống",
        "Buyback giảm equity - companies với buyback lớn có thể có equity âm"
      ]
    },
    {
      "fromDay": 186,
      "fromTitle": "Put Option là gì?",
      "text": "Put option: quyền bán ở strike price, có lợi khi giá giảm",
      "distractors": [
        "MPT: nền tảng toán học để xây dựng danh mục tối ưu dựa trên return, risk, correlation",
        "Người bán option có nghĩa vụ, người mua chỉ có quyền - rủi ro bất đối xứng"
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
        "Hai tháng đầu chỉ cần hai việc rẻ: đo dải thị trường và mở sổ ghi kết quả"
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
        "D/E = Total Debt / Equity - đo đòn bẩy tài chính"
      ]
    },
    {
      "fromDay": 188,
      "fromTitle": "Intrinsic Value và Time Value",
      "text": "Option Price = Intrinsic Value + Time Value",
      "distractors": [
        "Phải thu và tồn kho tăng thì trừ ra; phải trả tăng thì cộng vào",
        "Diversification, correlation và các thước đo risk-adjusted return là bộ công cụ cốt lõi"
      ]
    }
  ],
  "201": [
    {
      "fromDay": 19,
      "fromTitle": "Bài 19: Kiểm thử - chứng minh mã làm đúng",
      "text": "Bộ kiểm thử xanh chỉ chứng minh các trường hợp đã viết ra là đúng, không hơn.",
      "distractors": [
        "So sánh trong ngành - mỗi ngành có benchmark khác nhau",
        "Nợ dài hạn: thời gian trả dài hơn, thường lãi cao hơn"
      ]
    },
    {
      "fromDay": 12,
      "fromTitle": "Bài 12: Tham số, giá trị trả về và phạm vi",
      "text": "Dữ liệu đơn được sao chép khi truyền vào hàm; dữ liệu phức hợp truyền chỗ trỏ.",
      "distractors": [
        "Bất động sản đầu tư (mua để cho thuê) khác hẳn về bản chất tài chính: có dòng tiền thực sự từ tiền thuê",
        "Ngân sách chạy song song suốt năm, nếu không phần tăng thêm sẽ biến mất"
      ]
    }
  ],
  "202": [
    {
      "fromDay": 20,
      "fromTitle": "Bài 20: Tổng ôn chặng lập trình",
      "text": "Bốn nhóm: giữ dữ liệu, điều khiển luồng, xử lý khi hỏng, viết cho người khác đọc.",
      "distractors": [
        "Market Risk Premium = Rm − Rf (~5-7% lịch sử Mỹ)",
        "Tỷ lệ dòng tiền kinh doanh trên lợi nhuận ròng dưới 0,5 lần là mức phải đi tìm lý do"
      ]
    },
    {
      "fromDay": 13,
      "fromTitle": "Bài 13: Chương trình trong bộ nhớ",
      "text": "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
      "distractors": [
        "Ba quyết định: Đầu tư, Tài trợ, Phân phối",
        "Ngưỡng tỷ lệ phụ thuộc ngành: nhận thanh toán theo tiến độ khác hẳn thu tiền ngay"
      ]
    }
  ],
  "203": [
    {
      "fromDay": 14,
      "fromTitle": "Bài 14: Lỗi và ngoại lệ",
      "text": "Bắt lỗi rồi không làm gì là cách tệ nhất - tệ hơn cả để chương trình dừng hẳn.",
      "distractors": [
        "Time Value giảm dần về 0 khi tiến gần ngày đáo hạn (time decay)",
        "QE: bơm tiền khi lãi suất đã về 0"
      ]
    }
  ],
  "204": [
    {
      "fromDay": 15,
      "fromTitle": "Bài 15: Gỡ lỗi có phương pháp",
      "text": "Bước đầu tiên luôn là tái hiện lỗi ổn định - không có nó thì không biết đã sửa xong chưa.",
      "distractors": [
        "Bảo hiểm xử lý rủi ro đuôi (tail risk) - xác suất thấp nhưng thiệt hại cực lớn mà đầu tư không thể phòng ngừa",
        "Speculation: đặt cược vào hướng giá để kiếm lời, không có rủi ro nền tảng cần bảo vệ"
      ]
    }
  ],
  "205": [
    {
      "fromDay": 16,
      "fromTitle": "Bài 16: Mô-đun và thư viện",
      "text": "Mô-đun là tệp công khai phần cần dùng và giữ phần còn lại cho riêng mình.",
      "distractors": [
        "Làm cả bốn nhánh cùng lúc là cách chắc chắn để không nhánh nào đủ sâu",
        "Bị ảnh hưởng bởi chính sách vay/trả nợ của công ty trong từng kỳ, cần thận trọng khi diễn giải"
      ]
    }
  ],
  "206": [
    {
      "fromDay": 201,
      "fromTitle": "Bài 201: Web hoạt động thế nào",
      "text": "Trình duyệt tải HTML trước, rồi mới biết cần tải thêm CSS, ảnh, phông chữ.",
      "distractors": [
        "Khắt khe và thực tế hơn Current Ratio",
        "Không xấu về bản chất - cung cấp thanh khoản cho thị trường phái sinh"
      ]
    },
    {
      "fromDay": 17,
      "fromTitle": "Bài 17: Đọc tài liệu và thông báo lỗi",
      "text": "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả.",
      "distractors": [
        "Hiểu bản chất chuyển giao rủi ro giúp đánh giá đúng bất kỳ sản phẩm phái sinh mới nào trong tương lai",
        "Tái cân bằng vô tình tạo kỷ luật 'bán cao, mua thấp' một cách tự động, không cần dự đoán thị trường"
      ]
    }
  ],
  "207": [
    {
      "fromDay": 202,
      "fromTitle": "Bài 202: HTML - cấu trúc của một trang",
      "text": "HTML mô tả nội dung LÀ gì, không mô tả nó TRÔNG thế nào.",
      "distractors": [
        "Municipal bond: tài trợ hạ tầng công cộng ở cấp địa phương",
        "Gross Profit đo hiệu quả sản xuất/kinh doanh cốt lõi"
      ]
    },
    {
      "fromDay": 18,
      "fromTitle": "Bài 18: Viết mã người khác đọc được",
      "text": "Mã được đọc nhiều lần hơn số lần được viết, nên tối ưu cho người đọc gần như luôn đúng.",
      "distractors": [
        "Bảo hiểm nhân thọ bảo vệ người PHỤ THUỘC vào thu nhập của bạn, không phải bản thân bạn",
        "Bảng cân đối không cân = lỗi hoặc gian lận"
      ]
    }
  ],
  "208": [
    {
      "fromDay": 203,
      "fromTitle": "Bài 203: Thẻ ngữ nghĩa và cây tài liệu",
      "text": "Thẻ ngữ nghĩa không đổi giao diện - đó là lý do chúng dễ bị bỏ qua.",
      "distractors": [
        "Double-entry: mỗi giao dịch ghi hai chiều",
        "Là chỉ số chuẩn để so sánh hiệu suất giữa các quỹ đầu tư khác nhau"
      ]
    },
    {
      "fromDay": 19,
      "fromTitle": "Bài 19: Kiểm thử - chứng minh mã làm đúng",
      "text": "Bộ kiểm thử xanh chỉ chứng minh các trường hợp đã viết ra là đúng, không hơn.",
      "distractors": [
        "Deepfake AI giả mạo hình ảnh/giọng nói là hình thức lừa đảo mới đang gia tăng - luôn xác minh qua kênh độc lập trước khi chuyển tiền theo yêu cầu khẩn cấp",
        "Thứ tự ưu tiên hợp lý: bảo hiểm cơ bản và quỹ khẩn cấp trước, tối ưu hóa đầu tư sau"
      ]
    }
  ],
  "209": [
    {
      "fromDay": 204,
      "fromTitle": "Bài 204: Liên kết, ảnh và biểu mẫu",
      "text": "Chữ trong liên kết phải tự đủ nghĩa khi đọc tách khỏi câu văn quanh nó.",
      "distractors": [
        "Tái cân bằng về bản chất là 'bán cao, mua thấp' có kỷ luật, ngược với bản năng tâm lý tự nhiên",
        "Quỹ khẩn cấp lo rủi ro nhỏ và thường gặp; bảo hiểm lo rủi ro hiếm nhưng không có trần tổn thất"
      ]
    },
    {
      "fromDay": 20,
      "fromTitle": "Bài 20: Tổng ôn chặng lập trình",
      "text": "Bốn nhóm: giữ dữ liệu, điều khiển luồng, xử lý khi hỏng, viết cho người khác đọc.",
      "distractors": [
        "P/E = Price / EPS - trả bao nhiêu lần lợi nhuận",
        "Mua bảo hiểm cho rủi ro nhỏ là trả phí đắt cho thứ mình tự gánh được"
      ]
    }
  ],
  "210": [
    {
      "fromDay": 205,
      "fromTitle": "Bài 205: CSS - chọn phần tử và đặt kiểu",
      "text": "Độ cụ thể quyết định trước, thứ tự chỉ quyết định khi độ cụ thể bằng nhau.",
      "distractors": [
        "Nguyên tắc này tự động phát hiện nhiều loại sai sót",
        "Tài sản = Nợ phải trả + Vốn chủ sở hữu, và nó luôn cân: hai cột là cùng một số tiền nhìn từ hai phía."
      ]
    }
  ],
  "211": [
    {
      "fromDay": 206,
      "fromTitle": "Bài 206: Mô hình hộp - lề, viền và đệm",
      "text": "Mặc định, chiều rộng chỉ tính nội dung - đệm và viền cộng thêm ra ngoài.",
      "distractors": [
        "WC = Tài sản ngắn hạn − Nợ ngắn hạn",
        "Tài sản ngắn hạn là những gì thành tiền trong 12 tháng - nhà xưởng và goodwill không nằm trong đó."
      ]
    }
  ],
  "212": [
    {
      "fromDay": 16,
      "fromTitle": "Bài 16: Mô-đun và thư viện",
      "text": "Mô-đun là tệp công khai phần cần dùng và giữ phần còn lại cho riêng mình.",
      "distractors": [
        "P/E cao hơn thường phản ánh kỳ vọng tăng trưởng cao hơn, không hẳn là 'đắt' một cách tuyệt đối",
        "Chặng 6 xây hai lớp: BẢO VỆ (quỹ khẩn cấp, bảo hiểm, bảo mật trước lừa đảo) và TỔ CHỨC (ngân sách, tờ khai tài chính, thừa kế, biết khi nào cần tư vấn chuyên nghiệp)"
      ]
    },
    {
      "fromDay": 9,
      "fromTitle": "Bài 9: Từ điển - tra bằng tên thay vì bằng vị trí",
      "text": "Từ điển gồm các cặp khoá và giá trị; khoá là duy nhất trong một từ điển.",
      "distractors": [
        "Nhu cầu bảo hiểm nhân thọ xuất hiện khi có người phụ thuộc, không phải theo tuổi",
        "Phần loại trừ là nơi quyết định hợp đồng có chi trả hay không - đọc trước khi ký, không phải sau"
      ]
    }
  ],
  "213": [
    {
      "fromDay": 17,
      "fromTitle": "Bài 17: Đọc tài liệu và thông báo lỗi",
      "text": "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả.",
      "distractors": [
        "Lập giấy vay nợ rõ ràng (số tiền, lãi suất nếu có, lịch trả, chữ ký hai bên) là cách bảo vệ quan hệ, không phải thiếu tin tưởng",
        "WC = Tài sản ngắn hạn − Nợ ngắn hạn"
      ]
    },
    {
      "fromDay": 10,
      "fromTitle": "Bài 10: Ghép lại thành chương trình chạy được",
      "text": "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
      "distractors": [
        "Speculation: đặt cược vào hướng giá để kiếm lời, không có rủi ro nền tảng cần bảo vệ",
        "Cao hơn = tạo doanh thu hiệu quả hơn từ tài sản"
      ]
    }
  ],
  "214": [
    {
      "fromDay": 18,
      "fromTitle": "Bài 18: Viết mã người khác đọc được",
      "text": "Mã được đọc nhiều lần hơn số lần được viết, nên tối ưu cho người đọc gần như luôn đúng.",
      "distractors": [
        "Giá cổ phiếu chỉ là biểu hiện thị trường của quyền lợi kinh tế thực sự bên dưới",
        "DCA có giá trị tâm lý thực sự: giảm cảm giác hối tiếc nếu mua đúng đỉnh, phù hợp với dòng tiền lương hàng tháng"
      ]
    },
    {
      "fromDay": 11,
      "fromTitle": "Bài 11: Hàm - đóng gói một việc",
      "text": "Chép mã bốn chỗ nghĩa là phải giữ bốn bản đồng bộ bằng trí nhớ - trí nhớ luôn thua.",
      "distractors": [
        "Giá trị nội tại (value): ước tính dựa trên phân tích cơ bản dài hạn",
        "Market Cap = Giá cổ phiếu × Số lượng cổ phiếu đang lưu hành"
      ]
    }
  ],
  "215": [
    {
      "fromDay": 207,
      "fromTitle": "Bài 207: Bố cục với Flexbox",
      "text": "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc.",
      "distractors": [
        "Swap dealer (ngân hàng đầu tư) đóng vai trò trung gian, market maker cho thị trường",
        "EBIT đo hiệu quả hoạt động, độc lập với cơ cấu vốn"
      ]
    },
    {
      "fromDay": 214,
      "fromTitle": "Bài 214: Công cụ dành cho nhà phát triển",
      "text": "Thẻ phần tử trả lời trực tiếp quy tắc nào đang áp dụng và cái nào đã thua.",
      "distractors": [
        "Current Ratio trên 1,5 và D/E dưới 2,0 là hai ngưỡng đọc đầu tiên, không phải kết luận cuối cùng.",
        "Operating Income = Gross Profit − SG&A − R&D"
      ]
    }
  ],
  "216": [
    {
      "fromDay": 208,
      "fromTitle": "Bài 208: Bố cục với lưới CSS",
      "text": "Lưới định nghĩa cột một lần ở vùng chứa, nên mọi hàng tự thẳng cột nhau.",
      "distractors": [
        "Mỗi tầng phản ánh hiệu quả hoạt động khác nhau",
        "Lãi cao = rủi ro cao - không phải 'lợi suất tốt hơn tiền gửi'"
      ]
    },
    {
      "fromDay": 201,
      "fromTitle": "Bài 201: Web hoạt động thế nào",
      "text": "Trình duyệt tải HTML trước, rồi mới biết cần tải thêm CSS, ảnh, phông chữ.",
      "distractors": [
        "Bảo hiểm hoạt động dựa trên nguyên lý risk pooling (chia sẻ rủi ro) - rủi ro không chắc chắn ở cấp độ cá nhân nhưng dự đoán được ở cấp độ tập thể lớn nhờ Luật số lớn",
        "Năng lực thực sự là khả năng nhìn thấy mối liên kết giữa các lớp, không chỉ thuộc từng công thức riêng lẻ"
      ]
    }
  ],
  "217": [
    {
      "fromDay": 209,
      "fromTitle": "Bài 209: Màu, phông chữ và hệ thống thiết kế",
      "text": "Cảm giác lộn xộn đến từ thiếu nhất quán, không từ lựa chọn xấu.",
      "distractors": [
        "Chi tiêu hàng năm càng thấp, số tiền cần tích lũy càng ít - kiểm soát chi tiêu quan trọng ngang tích lũy tài sản",
        "Nguyên tắc này tự động phát hiện nhiều loại sai sót"
      ]
    },
    {
      "fromDay": 202,
      "fromTitle": "Bài 202: HTML - cấu trúc của một trang",
      "text": "HTML mô tả nội dung LÀ gì, không mô tả nó TRÔNG thế nào.",
      "distractors": [
        "Payback: đơn giản, đo thanh khoản - dùng như metric phụ",
        "Tăng tỷ trọng tài sản lợi nhuận cao hơn sẽ kéo expected return tổng thể lên, kèm rủi ro tăng theo"
      ]
    }
  ],
  "218": [
    {
      "fromDay": 210,
      "fromTitle": "Bài 210: Đơn vị đo trong CSS",
      "text": "Cỡ chữ bằng pixel không nghe cài đặt của người dùng - đây là lỗi khả năng truy cập.",
      "distractors": [
        "Goodwill chỉ sinh ra từ M&A. Thương hiệu tự xây không được ghi nhận, còn goodwill lớn là rủi ro ghi giảm.",
        "NI dương + FCF âm = cần điều tra sâu hơn"
      ]
    },
    {
      "fromDay": 203,
      "fromTitle": "Bài 203: Thẻ ngữ nghĩa và cây tài liệu",
      "text": "Thẻ ngữ nghĩa không đổi giao diện - đó là lý do chúng dễ bị bỏ qua.",
      "distractors": [
        "Hai trục quyết định độ tin cậy: nguồn bên ngoài hay nội bộ, và kiểm toán viên tự lấy hay nhận lại",
        "Dự phòng nghiệp vụ (technical reserves) là yếu tố sống còn - đảm bảo công ty có đủ nguồn lực chi trả nghĩa vụ tương lai, trích lập thiếu là nguyên nhân phá sản phổ biến"
      ]
    }
  ],
  "219": [
    {
      "fromDay": 211,
      "fromTitle": "Bài 211: Dựng một trang tĩnh hoàn chỉnh",
      "text": "Viết trọn HTML có nghĩa trước, rồi mới đụng tới CSS.",
      "distractors": [
        "Chặng 7 là nền tảng chiến lược đầu tư - Chặng 8 sẽ mở rộng sang quản lý tài sản dài hạn và hưu trí",
        "Khẩu vị rủi ro có thể thay đổi theo thời gian, hoàn cảnh sống và kinh nghiệm đầu tư - nên đánh giá lại định kỳ"
      ]
    },
    {
      "fromDay": 204,
      "fromTitle": "Bài 204: Liên kết, ảnh và biểu mẫu",
      "text": "Chữ trong liên kết phải tự đủ nghĩa khi đọc tách khỏi câu văn quanh nó.",
      "distractors": [
        "NPV > 0: tạo giá trị; NPV < 0: phá hủy giá trị",
        "Ba luồng OCF + ICF + FCF = Net Change in Cash"
      ]
    }
  ],
  "220": [
    {
      "fromDay": 215,
      "fromTitle": "Bài 215: Khả năng truy cập cơ bản",
      "text": "Đừng xoá viền tiêu điểm - nếu thấy xấu thì thay bằng kiểu khác.",
      "distractors": [
        "Khắt khe và thực tế hơn Current Ratio",
        "Tài sản có correlation âm/thấp với phần còn lại có giá trị bảo vệ danh mục cao"
      ]
    },
    {
      "fromDay": 205,
      "fromTitle": "Bài 205: CSS - chọn phần tử và đặt kiểu",
      "text": "Độ cụ thể quyết định trước, thứ tự chỉ quyết định khi độ cụ thể bằng nhau.",
      "distractors": [
        "Thư xác nhận phải gửi thẳng về kiểm toán viên, đi qua doanh nghiệp là mất giá trị",
        "Hedging: giảm rủi ro đã có sẵn, không tạo thêm rủi ro mới"
      ]
    }
  ],
  "221": [
    {
      "fromDay": 216,
      "fromTitle": "Bài 216: Một trang cho mọi kích thước màn hình",
      "text": "Thẻ khung nhìn là một dòng bắt buộc; thiếu nó thì mọi ngưỡng màn hình vô tác dụng.",
      "distractors": [
        "Đóng góp vào quỹ hưu trí bổ sung tự nguyện (Nghị định 88/2016/NĐ-CP) được giảm trừ thuế TNCN trong hạn mức quy định",
        "Deferred Revenue là liability - quan trọng với SaaS, subscription"
      ]
    },
    {
      "fromDay": 206,
      "fromTitle": "Bài 206: Mô hình hộp - lề, viền và đệm",
      "text": "Mặc định, chiều rộng chỉ tính nội dung - đệm và viền cộng thêm ra ngoài.",
      "distractors": [
        "Case study giúp áp dụng lý thuyết vào thực tế",
        "Bắt đầu sớm 10 năm có thể tạo kết quả tương đương hoặc vượt trội so với đóng nhiều tiền hơn nhưng bắt đầu muộn"
      ]
    }
  ],
  "222": [
    {
      "fromDay": 217,
      "fromTitle": "Bài 217: Tốc độ tải trang",
      "text": "Đo trước rồi hãy tối ưu - trực giác về hiệu năng gần như luôn sai.",
      "distractors": [
        "Adverse selection: người rủi ro cao có xu hướng mua bảo hiểm nhiều hơn (vấn đề TRƯỚC khi mua) - công ty kiểm soát bằng underwriting",
        "Moral hazard: người có bảo hiểm hành xử rủi ro hơn (vấn đề SAU khi mua) - công ty kiểm soát bằng đồng chi trả/miễn thường"
      ]
    },
    {
      "fromDay": 207,
      "fromTitle": "Bài 207: Bố cục với Flexbox",
      "text": "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc.",
      "distractors": [
        "Thử nghiệm kiểm soát xem quy trình chạy tốt không; thử nghiệm cơ bản kiểm tra chính con số",
        "WACC cao → NPV giảm → ít dự án được chấp thuận hơn"
      ]
    }
  ],
  "223": [
    {
      "fromDay": 218,
      "fromTitle": "Bài 218: Biểu mẫu dùng được",
      "text": "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại.",
      "distractors": [
        "Phí đóng vào không bằng tiền được đầu tư - phí ban đầu bị trừ trước",
        "LTV/CAC ≥ 3: mô hình kinh doanh khả thi"
      ]
    },
    {
      "fromDay": 208,
      "fromTitle": "Bài 208: Bố cục với lưới CSS",
      "text": "Lưới định nghĩa cột một lần ở vùng chứa, nên mọi hàng tự thẳng cột nhau.",
      "distractors": [
        "ICF dương = bán tài sản hoặc thu hồi đầu tư",
        "Hurdle rate = mức sinh lời tối thiểu cần đạt"
      ]
    }
  ],
  "224": [
    {
      "fromDay": 219,
      "fromTitle": "Bài 219: Đưa trang lên mạng",
      "text": "Trang tĩnh gửi tệp có sẵn; rẻ, nhanh, khó hỏng và đủ cho phần lớn trang cá nhân.",
      "distractors": [
        "Phí ban đầu lớn nhất ở các năm đầu, nên giá trị hoàn lại năm 1 gần bằng 0",
        "Cả cột lãi suất cao lẫn thấp đều là giả định, không phải cam kết"
      ]
    },
    {
      "fromDay": 209,
      "fromTitle": "Bài 209: Màu, phông chữ và hệ thống thiết kế",
      "text": "Cảm giác lộn xộn đến từ thiếu nhất quán, không từ lựa chọn xấu.",
      "distractors": [
        "Phí rủi ro bảo hiểm trừ từ tài khoản đầu tư và tăng theo tuổi",
        "Điều kiện: phải có underlying exposure thực tế cần bảo vệ"
      ]
    }
  ],
  "225": [
    {
      "fromDay": 220,
      "fromTitle": "Bài 220: Tổng ôn chặng web",
      "text": "Sợi chỉ xuyên suốt: tách nội dung khỏi hình thức, và tôn trọng lựa chọn người dùng.",
      "distractors": [
        "Lập di chúc hợp lệ (đúng hình thức pháp luật) giúp thể hiện rõ ý nguyện và giảm nguy cơ tranh chấp gia đình",
        "WACC = Ke×(E/V) + Kd×(1−T)×(D/V)"
      ]
    },
    {
      "fromDay": 210,
      "fromTitle": "Bài 210: Đơn vị đo trong CSS",
      "text": "Cỡ chữ bằng pixel không nghe cài đặt của người dùng - đây là lỗi khả năng truy cập.",
      "distractors": [
        "Yield curve đảo ngược: tín hiệu cảnh báo suy thoái kinh tế mạnh",
        "DSO cao = tiền kẹt lâu trong khoản phải thu"
      ]
    }
  ],
  "226": [
    {
      "fromDay": 221,
      "fromTitle": "Bài 221: JavaScript chạy ở đâu và chạy thế nào",
      "text": "JavaScript là ngôn ngữ; những gì làm được thì do môi trường quyết định.",
      "distractors": [
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)",
        "Tài sản ngắn hạn: chuyển thành tiền trong 12 tháng"
      ]
    },
    {
      "fromDay": 211,
      "fromTitle": "Bài 211: Dựng một trang tĩnh hoàn chỉnh",
      "text": "Viết trọn HTML có nghĩa trước, rồi mới đụng tới CSS.",
      "distractors": [
        "Thực hành định giá chuyên nghiệp luôn kết hợp nhiều phương pháp, không chỉ dựa vào một con số",
        "Phép so đúng là term life cùng mức bảo vệ cộng tự đầu tư phần chênh"
      ]
    }
  ],
  "227": [
    {
      "fromDay": 222,
      "fromTitle": "Bài 222: Biến, kiểu và ép kiểu ngầm định",
      "text": "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
      "distractors": [
        "Term life: phí thấp, bảo vệ có thời hạn, thuần túy bảo vệ - phù hợp giai đoạn cần bảo vệ cao nhưng ngân sách hạn chế",
        "Kiểm soát tốt thì giảm được thử nghiệm cơ bản - đây là lý do phí kiểm toán khác nhau"
      ]
    },
    {
      "fromDay": 215,
      "fromTitle": "Bài 215: Khả năng truy cập cơ bản",
      "text": "Đừng xoá viền tiêu điểm - nếu thấy xấu thì thay bằng kiểu khác.",
      "distractors": [
        "Tài sản = những gì doanh nghiệp sở hữu và kiểm soát",
        "Nền tảng lý thuyết cho hầu hết các mô hình quản lý danh mục hiện đại"
      ]
    }
  ],
  "228": [
    {
      "fromDay": 223,
      "fromTitle": "Bài 223: Hàm trong JavaScript",
      "text": "Hàm là giá trị hạng nhất: gán, truyền, trả về, cất vào mảng đều được.",
      "distractors": [
        "Lãi suất: công cụ điều hành kinh tế mạnh nhất",
        "YTM là tiêu chí so sánh trái phiếu, không phải coupon rate"
      ]
    },
    {
      "fromDay": 216,
      "fromTitle": "Bài 216: Một trang cho mọi kích thước màn hình",
      "text": "Thẻ khung nhìn là một dòng bắt buộc; thiếu nó thì mọi ngưỡng màn hình vô tác dụng.",
      "distractors": [
        "Đầu tư quốc tế giảm rủi ro tập trung vào một nền kinh tế/đồng tiền duy nhất",
        "WC = Tài sản ngắn hạn − Nợ ngắn hạn"
      ]
    }
  ],
  "229": [
    {
      "fromDay": 224,
      "fromTitle": "Bài 224: Mảng và các phương thức duyệt",
      "text": "Lọc, ánh xạ, gom trả mảng mới - phải hứng kết quả, mảng gốc không đổi.",
      "distractors": [
        "'Valuation football field'- dải giá trị từ nhiều phương pháp - là công cụ chuẩn trong thực hành định giá chuyên nghiệp",
        "Phổ biến trong định giá startup công nghệ giai đoạn tăng trưởng sớm"
      ]
    },
    {
      "fromDay": 217,
      "fromTitle": "Bài 217: Tốc độ tải trang",
      "text": "Đo trước rồi hãy tối ưu - trực giác về hiệu năng gần như luôn sai.",
      "distractors": [
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị",
        "Lãi kép: lãi trên lãi - sức mạnh thời gian"
      ]
    }
  ],
  "230": [
    {
      "fromDay": 225,
      "fromTitle": "Bài 225: Đối tượng và JSON",
      "text": "JSON là văn bản; đối tượng là cấu trúc trong bộ nhớ - phải phân tích qua lại.",
      "distractors": [
        "Lỗ kế toán ≠ hết tiền - D&A và WC tạo ra sự khác biệt",
        "Giảm phí không cần thiết (giao dịch quá thường xuyên, quỹ phí cao không tương xứng hiệu suất) là cách cải thiện lợi nhuận ròng dễ kiểm soát nhất"
      ]
    },
    {
      "fromDay": 218,
      "fromTitle": "Bài 218: Biểu mẫu dùng được",
      "text": "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại.",
      "distractors": [
        "Mô hình Ponzi trả lãi người trước bằng tiền người sau, sụp đổ khi dòng tiền mới không đủ",
        "Power law: 1-2 unicorn bù cả danh mục"
      ]
    }
  ],
  "231": [
    {
      "fromDay": 226,
      "fromTitle": "Bài 226: Phạm vi, closure và ngữ cảnh",
      "text": "Phạm vi quyết định lúc viết; ngữ cảnh của hàm thông thường quyết định lúc gọi.",
      "distractors": [
        "Đừng gián đoạn - liên tục là chìa khóa của compounding",
        "Giải trình của ban giám đốc bổ sung chứ không thay thế bằng chứng độc lập"
      ]
    },
    {
      "fromDay": 219,
      "fromTitle": "Bài 219: Đưa trang lên mạng",
      "text": "Trang tĩnh gửi tệp có sẵn; rẻ, nhanh, khó hỏng và đủ cho phần lớn trang cá nhân.",
      "distractors": [
        "Bảng khấu hao: số dư đầu kỳ + CapEx − khấu hao = số dư cuối kỳ",
        "ETF: quỹ chứa rổ tài sản nhưng giao dịch linh hoạt như một cổ phiếu"
      ]
    }
  ],
  "232": [
    {
      "fromDay": 227,
      "fromTitle": "Bài 227: Những cái bẫy của JavaScript",
      "text": "Sắp xếp mặc định so sánh dạng chuỗi - luôn truyền hàm so sánh khi sắp xếp số.",
      "distractors": [
        "Vốn lưu động dự phóng theo số ngày luân chuyển DIO/DSO/DPO, tự co giãn theo quy mô",
        "Apple: OCF mạnh, FCF gần bằng OCF, buyback liên tục"
      ]
    },
    {
      "fromDay": 220,
      "fromTitle": "Bài 220: Tổng ôn chặng web",
      "text": "Sợi chỉ xuyên suốt: tách nội dung khỏi hình thức, và tôn trọng lựa chọn người dùng.",
      "distractors": [
        "Mục tiêu hedging: giảm bất định, không phải tối đa hóa lợi nhuận",
        "Discount rate = chi phí cơ hội + phần bù rủi ro"
      ]
    }
  ],
  "233": [
    {
      "fromDay": 228,
      "fromTitle": "Bài 228: Lỗi và ngoại lệ trong JavaScript",
      "text": "Lỗi trong trình duyệt im lặng với người dùng - họ chỉ thấy chức năng không hoạt động.",
      "distractors": [
        "Whole life: phí cao hơn nhiều, bảo vệ trọn đời, có giá trị tích lũy nhưng chi phí ẩn thường làm giảm hiệu quả đầu tư",
        "P/E cao không tự động là 'đắt' nếu tăng trưởng đủ nhanh và bền vững"
      ]
    },
    {
      "fromDay": 221,
      "fromTitle": "Bài 221: JavaScript chạy ở đâu và chạy thế nào",
      "text": "JavaScript là ngôn ngữ; những gì làm được thì do môi trường quyết định.",
      "distractors": [
        "Volatility cao không xấu về bản chất - cần cân nhắc cùng lợi nhuận kỳ vọng và khẩu vị rủi ro",
        "FCFE: dòng tiền tự do còn lại chỉ thuộc về cổ đông, sau nghĩa vụ nợ"
      ]
    }
  ],
  "234": [
    {
      "fromDay": 229,
      "fromTitle": "Bài 229: Vì sao trình duyệt không đứng chờ",
      "text": "Một luồng chạy mã, nhưng việc mất thời gian do trình duyệt lo ở bên ngoài.",
      "distractors": [
        "Chỉ THAY ĐỔI vốn lưu động giữa hai kỳ mới chảy vào dòng tiền, không phải số dư",
        "Cách khắc phục thực tế: chủ động tìm kiếm quan điểm trái chiều trước khi ra quyết định, không chỉ tin vào điều mình muốn tin"
      ]
    },
    {
      "fromDay": 222,
      "fromTitle": "Bài 222: Biến, kiểu và ép kiểu ngầm định",
      "text": "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
      "distractors": [
        "PE: mua công ty trưởng thành, tái cơ cấu, exit sau 5-7 năm",
        "PV = FV / (1+r)^n"
      ]
    }
  ],
  "235": [
    {
      "fromDay": 230,
      "fromTitle": "Bài 230: Promise và cú pháp chờ",
      "text": "Promise có ba trạng thái và chuyển đúng một lần rồi cố định vĩnh viễn.",
      "distractors": [
        "Nghỉ hưu càng sớm, thời gian sống dựa vào danh mục càng dài, nên cần biên an toàn lớn hơn (rút 3-3,5% thay vì 4%)",
        "Chiến lược phổ biến: mua term đủ mức cần thiết, tự đầu tư phần chênh lệch phí"
      ]
    },
    {
      "fromDay": 223,
      "fromTitle": "Bài 223: Hàm trong JavaScript",
      "text": "Hàm là giá trị hạng nhất: gán, truyền, trả về, cất vào mảng đều được.",
      "distractors": [
        "DIO = 365 / Turnover - số ngày trung bình để bán hết hàng",
        "Lợi nhuận kế toán ≠ tiền thực trong tay"
      ]
    }
  ],
  "236": [
    {
      "fromDay": 231,
      "fromTitle": "Bài 231: Cây tài liệu - tìm và đọc phần tử",
      "text": "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ.",
      "distractors": [
        "Dựa trên dữ liệu lịch sử (Trinity Study), có xác suất thành công cao nhưng không phải đảm bảo tuyệt đối",
        "Nhạy cảm với discount rate và dự báo FCF"
      ]
    },
    {
      "fromDay": 224,
      "fromTitle": "Bài 224: Mảng và các phương thức duyệt",
      "text": "Lọc, ánh xạ, gom trả mảng mới - phải hứng kết quả, mảng gốc không đổi.",
      "distractors": [
        "Mục tiêu: runway ≥ 18 tháng trước khi gọi vốn tiếp",
        "PE: mua công ty trưởng thành, tái cơ cấu, exit sau 5-7 năm"
      ]
    }
  ],
  "237": [
    {
      "fromDay": 232,
      "fromTitle": "Bài 232: Sự kiện và cách chúng lan truyền",
      "text": "Sự kiện nổi từ phần tử đích lên từng tầng cha, và mọi hàm trên đường đều chạy.",
      "distractors": [
        "Volatility cao không xấu về bản chất - cần cân nhắc cùng lợi nhuận kỳ vọng và khẩu vị rủi ro",
        "Hạn mức tính cho mỗi người gửi tại mỗi tổ chức, và bao gồm cả gốc lẫn lãi"
      ]
    },
    {
      "fromDay": 225,
      "fromTitle": "Bài 225: Đối tượng và JSON",
      "text": "JSON là văn bản; đối tượng là cấu trúc trong bộ nhớ - phải phân tích qua lại.",
      "distractors": [
        "Nguyên tắc này tự động phát hiện nhiều loại sai sót",
        "Buyback giảm equity - companies với buyback lớn có thể có equity âm"
      ]
    }
  ],
  "238": [
    {
      "fromDay": 233,
      "fromTitle": "Bài 233: Biểu mẫu và dữ liệu người dùng",
      "text": "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
      "distractors": [
        "Nhiều sổ tại cùng một ngân hàng được cộng gộp - chia sổ không tăng mức bảo vệ",
        "Muốn tăng phần được bảo vệ thì phải tăng số tổ chức, không phải số sổ"
      ]
    },
    {
      "fromDay": 226,
      "fromTitle": "Bài 226: Phạm vi, closure và ngữ cảnh",
      "text": "Phạm vi quyết định lúc viết; ngữ cảnh của hàm thông thường quyết định lúc gọi.",
      "distractors": [
        "P&L: lợi nhuận qua thời gian",
        "Với số dư dưới hạn mức thì đây không phải chuyện đáng bận tâm"
      ]
    }
  ],
  "239": [
    {
      "fromDay": 234,
      "fromTitle": "Bài 234: Gọi dịch vụ trên mạng",
      "text": "Hàm gọi mạng không ném lỗi với 404 hay 500 - phải tự kiểm tra mã trạng thái.",
      "distractors": [
        "Kết hợp nhiều ratios - một ratios không đủ để ra quyết định",
        "Đây chỉ là điểm khởi đầu tham khảo, cần điều chỉnh theo khả năng chịu rủi ro và mục tiêu cá nhân"
      ]
    },
    {
      "fromDay": 227,
      "fromTitle": "Bài 227: Những cái bẫy của JavaScript",
      "text": "Sắp xếp mặc định so sánh dạng chuỗi - luôn truyền hàm so sánh khi sắp xếp số.",
      "distractors": [
        "Giữ vốn lưu động cố định khi doanh thu tăng mạnh sẽ cho dòng tiền dự phóng phi thực tế",
        "Bảo hiểm nên được hiểu là công cụ CHUYỂN GIAO RỦI RO, không phải công cụ đầu tư sinh lời"
      ]
    }
  ],
  "240": [
    {
      "fromDay": 235,
      "fromTitle": "Bài 235: Lưu dữ liệu trên trình duyệt",
      "text": "Bộ nhớ cục bộ ở lại lâu dài; bộ nhớ phiên mất khi đóng thẻ.",
      "distractors": [
        "Phí thuần = xác suất xảy ra × số tiền bảo hiểm, chiết khấu về hiện tại.",
        "Bảo hiểm tử kỳ (term life) thuần túy thường rẻ hơn nhiều và minh bạch hơn bảo hiểm liên kết đầu tư cho cùng mức bảo vệ"
      ]
    },
    {
      "fromDay": 228,
      "fromTitle": "Bài 228: Lỗi và ngoại lệ trong JavaScript",
      "text": "Lỗi trong trình duyệt im lặng với người dùng - họ chỉ thấy chức năng không hoạt động.",
      "distractors": [
        "Beta = độ biến động tương đối so với thị trường",
        "Discount rate = chi phí cơ hội + phần bù rủi ro"
      ]
    }
  ],
  "241": [
    {
      "fromDay": 236,
      "fromTitle": "Bài 236: Hiệu năng và bảo mật phía trình duyệt",
      "text": "Gộp nhiều thay đổi cây tài liệu thành một lượt thay vì chèn từng phần tử.",
      "distractors": [
        "Compounding: lãi trên lãi trên lãi - hàm mũ",
        "HY spreads: chỉ báo sớm suy thoái"
      ]
    },
    {
      "fromDay": 229,
      "fromTitle": "Bài 229: Vì sao trình duyệt không đứng chờ",
      "text": "Một luồng chạy mã, nhưng việc mất thời gian do trình duyệt lo ở bên ngoài.",
      "distractors": [
        "Tính trước chi phí lãi vay, chiết khấu bằng WACC",
        "FCFF: dòng tiền tự do thuộc về toàn bộ nhà cung cấp vốn (cổ đông và chủ nợ)"
      ]
    }
  ],
  "242": [
    {
      "fromDay": 237,
      "fromTitle": "Bài 237: Tổ chức mã và mô-đun",
      "text": "Chia theo trách nhiệm: lấy dữ liệu, xử lý, vẽ giao diện - không chia theo số dòng.",
      "distractors": [
        "Giá trị nội tại (value): ước tính dựa trên phân tích cơ bản dài hạn",
        "Đây là nguyên tắc nền tảng chi phối mọi quyết định phân bổ tài sản"
      ]
    },
    {
      "fromDay": 230,
      "fromTitle": "Bài 230: Promise và cú pháp chờ",
      "text": "Promise có ba trạng thái và chuyển đúng một lần rồi cố định vĩnh viễn.",
      "distractors": [
        "Người có người phụ thuộc (con nhỏ, cha mẹ già) và là trụ cột thu nhập là đối tượng cần bảo hiểm nhân thọ nhất",
        "Chi phí y tế có xu hướng tăng theo tuổi tác, nên cộng thêm một khoản dự phòng riêng cho y tế"
      ]
    }
  ],
  "243": [
    {
      "fromDay": 238,
      "fromTitle": "Bài 238: Dựng một ứng dụng nhỏ",
      "text": "Chọn một nguồn sự thật duy nhất: một đối tượng trạng thái, giao diện chỉ là kết quả.",
      "distractors": [
        "Case study giúp áp dụng lý thuyết vào thực tế",
        "Lãi cao = rủi ro cao - không phải 'lợi suất tốt hơn tiền gửi'"
      ]
    },
    {
      "fromDay": 231,
      "fromTitle": "Bài 231: Cây tài liệu - tìm và đọc phần tử",
      "text": "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ.",
      "distractors": [
        "Luôn đọc kỹ bảng minh họa quyền lợi và phí trước khi ký hợp đồng bảo hiểm dài hạn - đừng chỉ nghe tư vấn viên trình bày",
        "D/E: mức độ dùng nợ - phải đánh giá theo đặc thù ngành, không có ngưỡng chung cho mọi công ty"
      ]
    }
  ],
  "244": [
    {
      "fromDay": 239,
      "fromTitle": "Bài 239: Công cụ và thói quen làm việc",
      "text": "Kiểm tra tĩnh bắt lối viết dễ lỗi kể cả ở nhánh mã chưa ai chạy tới.",
      "distractors": [
        "Deepfake AI giả mạo hình ảnh/giọng nói là hình thức lừa đảo mới đang gia tăng - luôn xác minh qua kênh độc lập trước khi chuyển tiền theo yêu cầu khẩn cấp",
        "Net Change in Cash = OCF + ICF + FCF"
      ]
    },
    {
      "fromDay": 232,
      "fromTitle": "Bài 232: Sự kiện và cách chúng lan truyền",
      "text": "Sự kiện nổi từ phần tử đích lên từng tầng cha, và mọi hàm trên đường đều chạy.",
      "distractors": [
        "Ước tính nhanh: tài sản cần có ≈ 25 × chi phí sinh hoạt hàng năm (dựa trên quy tắc rút 4%)",
        "Gordon Growth Method: Terminal Value = FCF cuối × (1+g) / (WACC − g)"
      ]
    }
  ],
  "245": [
    {
      "fromDay": 240,
      "fromTitle": "Bài 240: Tổng ôn chặng JavaScript",
      "text": "Sợi chỉ xuyên suốt: mã chạy trên máy người khác, trong môi trường bạn không kiểm soát.",
      "distractors": [
        "Phòng hộ lãi suất thả nổi: nhận thả nổi, trả cố định qua hợp đồng IRS",
        "DCA có giá trị tâm lý thực sự: giảm cảm giác hối tiếc nếu mua đúng đỉnh, phù hợp với dòng tiền lương hàng tháng"
      ]
    },
    {
      "fromDay": 233,
      "fromTitle": "Bài 233: Biểu mẫu và dữ liệu người dùng",
      "text": "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
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
      "fromTitle": "Bài 234: Gọi dịch vụ trên mạng",
      "text": "Hàm gọi mạng không ném lỗi với 404 hay 500 - phải tự kiểm tra mã trạng thái.",
      "distractors": [
        "Không bao giờ cung cấp mã OTP ngân hàng cho bất kỳ ai qua điện thoại, kể cả người tự xưng là nhân viên ngân hàng",
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
        "Phí gộp = phí thuần + chi phí quản lý + hoa hồng + biên an toàn."
      ]
    },
    {
      "fromDay": 235,
      "fromTitle": "Bài 235: Lưu dữ liệu trên trình duyệt",
      "text": "Bộ nhớ cục bộ ở lại lâu dài; bộ nhớ phiên mất khi đóng thẻ.",
      "distractors": [
        "Ba luồng OCF + ICF + FCF = Net Change in Cash",
        "P/E = Price / EPS - trả bao nhiêu lần lợi nhuận"
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
      "fromTitle": "Bài 236: Hiệu năng và bảo mật phía trình duyệt",
      "text": "Gộp nhiều thay đổi cây tài liệu thành một lượt thay vì chèn từng phần tử.",
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
        "Lợi nhuận cao bất thường, ổn định, không rủi ro là dấu hiệu cảnh báo mô hình lừa đảo đa cấp/Ponzi",
        "Hai loại chính: General Obligation (thuế chung) và Revenue bond (doanh thu dự án)"
      ]
    },
    {
      "fromDay": 237,
      "fromTitle": "Bài 237: Tổ chức mã và mô-đun",
      "text": "Chia theo trách nhiệm: lấy dữ liệu, xử lý, vẽ giao diện - không chia theo số dòng.",
      "distractors": [
        "Theo dõi OCF, không chỉ Net Income",
        "Nguyên tắc chung: chậm lại, xác minh qua kênh khác, không hành động dưới áp lực thời gian khi liên quan đến tiền bạc"
      ]
    }
  ],
  "250": [
    {
      "fromDay": 245,
      "fromTitle": "Phí quản lý: chi phí của danh mục",
      "text": "Chi phí danh mục là tổng của nhiều loại phí: phí quỹ (expense ratio), phí giao dịch, phí lưu ký, phí tư vấn - không chỉ một khoản riêng lẻ",
      "distractors": [
        "Luật số lớn là nền của cả mô hình - nó đòi hỏi các rủi ro độc lập với nhau.",
        "Sau track 'personal', track 'professional' là bước tiếp theo cho ai muốn học sâu hơn về phân tích và định giá doanh nghiệp"
      ]
    },
    {
      "fromDay": 238,
      "fromTitle": "Bài 238: Dựng một ứng dụng nhỏ",
      "text": "Chọn một nguồn sự thật duy nhất: một đối tượng trạng thái, giao diện chỉ là kết quả.",
      "distractors": [
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường",
        "P/E: giá phải trả cho mỗi đồng lợi nhuận - thấp hơn nghĩa là rẻ hơn tương đối, nhưng cần so cùng ngành"
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
      "fromTitle": "Bài 239: Công cụ và thói quen làm việc",
      "text": "Kiểm tra tĩnh bắt lối viết dễ lỗi kể cả ở nhánh mã chưa ai chạy tới.",
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
        "Xác thực hai lớp là biện pháp hiệu quả nhất - nhưng chỉ khi bạn không đọc mã cho ai"
      ]
    },
    {
      "fromDay": 240,
      "fromTitle": "Bài 240: Tổng ôn chặng JavaScript",
      "text": "Sợi chỉ xuyên suốt: mã chạy trên máy người khác, trong môi trường bạn không kiểm soát.",
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
        "Email cần lớp bảo vệ mạnh nhất vì nó đặt lại được mật khẩu mọi tài khoản khác",
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
        "Mật khẩu riêng cho tài khoản tiền và email, không dùng lại ở bất cứ đâu",
        "Khóa đổi sim tại nhà mạng bịt được lỗ hổng mà rất ít người biết"
      ]
    },
    {
      "fromDay": 242,
      "fromTitle": "Cân bằng cổ phiếu-trái phiếu theo tuổi",
      "text": "Tỷ trọng cổ phiếu nên giảm dần khi tuổi tăng, vì thời gian phục hồi sau biến động ngắn lại",
      "distractors": [
        "Lạm phát bào mòn sức mua của tiền mặt thuần túy theo thời gian - càng giữ lâu càng mất giá trị thực",
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
        "Tập khách hàng bảo hiểm khoẻ hơn dân số chung, nên bảng tử vong phải điều chỉnh.",
        "Cổ phiếu, bất động sản và một số công cụ chuyên biệt có khả năng tăng trưởng theo hoặc vượt lạm phát trong dài hạn"
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
        "Người nghỉ hưu đặc biệt dễ tổn thương trước lạm phát vì không còn thu nhập lương để bù đắp"
      ]
    },
    {
      "fromDay": 244,
      "fromTitle": "Tái cân bằng danh mục hàng năm",
      "text": "Tái cân bằng là đưa danh mục về đúng tỷ trọng mục tiêu ban đầu sau khi thị trường làm lệch tỷ lệ",
      "distractors": [
        "Lợi nhuận cao + cam kết 'không rủi ro' là dấu hiệu cảnh báo lừa đảo rõ ràng nhất - nguyên tắc rủi ro-lợi nhuận không có ngoại lệ",
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
        "Khấu hao cộng vào làm dòng tiền cao hơn lợi nhuận; vốn lưu động là thứ kéo nó xuống",
        "Mô hình Ponzi trả lãi người trước bằng tiền người sau, sụp đổ khi dòng tiền mới không đủ"
      ]
    },
    {
      "fromDay": 245,
      "fromTitle": "Phí quản lý: chi phí của danh mục",
      "text": "Chi phí danh mục là tổng của nhiều loại phí: phí quỹ (expense ratio), phí giao dịch, phí lưu ký, phí tư vấn - không chỉ một khoản riêng lẻ",
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
      "text": "Không có di chúc, tài sản chia theo pháp luật (hàng thừa kế thứ nhất: vợ/chồng, cha mẹ, con) - không nhất thiết theo mong muốn thực sự của người mất",
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
        "Phải thu và tồn kho tăng thì trừ ra; phải trả tăng thì cộng vào",
        "Cơ chế khuyến khích rủ thêm người tham gia để nhận hoa hồng là đặc điểm cảnh báo cần đặc biệt cẩn trọng"
      ]
    }
  ],
  "260": [
    {
      "fromDay": 255,
      "fromTitle": "Bảo mật tài chính: bảo vệ tiền khỏi lừa đảo",
      "text": "Deepfake AI giả mạo hình ảnh/giọng nói là hình thức lừa đảo mới đang gia tăng - luôn xác minh qua kênh độc lập trước khi chuyển tiền theo yêu cầu khẩn cấp",
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
        "Tỷ lệ dòng tiền kinh doanh trên lợi nhuận ròng dưới 0,5 lần là mức phải đi tìm lý do",
        "Nên cập nhật định kỳ theo các thay đổi lớn trong cuộc sống, không lập một lần rồi bỏ quên"
      ]
    },
    {
      "fromDay": 249,
      "fromTitle": "Quy tắc 4%: có thể rút bao nhiêu từ hưu trí",
      "text": "Quy tắc 4%: rút 4% giá trị danh mục năm đầu tiên nghỉ hưu, các năm sau điều chỉnh số tiền đó theo lạm phát",
      "distractors": [
        "Interest Coverage = EBIT / Interest Expense",
        "Ngưỡng tỷ lệ phụ thuộc ngành: nhận thanh toán theo tiến độ khác hẳn thu tiền ngay"
      ]
    }
  ],
  "262": [
    {
      "fromDay": 257,
      "fromTitle": "Khi nào cần tư vấn tài chính chuyên nghiệp",
      "text": "Không phải ai cũng cần tư vấn tài chính chuyên nghiệp - với nhu cầu đơn giản, tự học và tự quản lý là đủ",
      "distractors": [
        "Với người còn nhiều năm làm việc, khả năng lao động thường là tài sản lớn nhất",
        "Bảo hiểm xử lý rủi ro đuôi (tail risk) - xác suất thấp nhưng thiệt hại cực lớn mà đầu tư không thể phòng ngừa"
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
      "fromTitle": "Chặng 1, Bài 2: Hệ điều hành làm gì khi bạn không nhìn",
      "text": "Hệ điều hành là lớp trung gian giữa chương trình bạn viết và phần cứng thật.",
      "distractors": [
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị",
        "Kết hợp nhiều ratios - một ratios không đủ để ra quyết định"
      ]
    }
  ],
  "1101": [
    {
      "fromDay": 196,
      "fromTitle": "nhỏ - Hãng hàng không phòng hộ giá dầu",
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
        "Nó vô hình nên ít ai nghĩ tới bảo vệ, trong khi xe và nhà thì được bảo hiểm ngay"
      ]
    }
  ],
  "1102": [
    {
      "fromDay": 197,
      "fromTitle": "nhỏ - Doanh nghiệp xuất khẩu phòng hộ tỷ giá",
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
      "fromTitle": "Kết nối tất cả - Báo cáo tài chính, Định giá, Rủi ro, Thị trường",
      "text": "Phân tích tài chính toàn diện kết nối bốn lớp: kế toán, định giá, rủi ro, thị trường",
      "distractors": [
        "ROIC > Kd: đòn bẩy tốt; ROIC < Kd: đòn bẩy phá hủy giá trị",
        "Khoảng cách quan trọng nhất là từ HIỂU đến LÀM - kiến thức chỉ tạo ra khác biệt khi trở thành thói quen thực hành đều đặn"
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
      "fromTitle": "Bài cuối - Tự phân tích một doanh nghiệp hoàn chỉnh từ A đến Z",
      "text": "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
      "distractors": [
        "Bảo hiểm nhân thọ bảo vệ người PHỤ THUỘC vào thu nhập của bạn, không phải bản thân bạn",
        "Mục tiêu: tối đa hóa giá trị dài hạn cho cổ đông"
      ]
    },
    {
      "fromDay": 193,
      "fromTitle": "Currency Swap",
      "text": "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau",
      "distractors": [
        "Nghĩa vụ nợ và chi phí sinh hoạt không giảm theo khi thu nhập mất đi",
        "Quỹ khẩn cấp bao vài tháng; mất khả năng lao động có thể kéo dài nhiều năm"
      ]
    }
  ],
  "1106": [
    {
      "fromDay": 1101,
      "fromTitle": "IB & Phân tích, Bài 1: Quality of Earnings - đọc lợi nhuận như nhà phân tích thực thụ",
      "text": "Quality of Earnings đánh giá lợi nhuận đến từ hoạt động lõi bền vững hay các khoản một lần không lặp lại",
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
        "P/E: giá phải trả cho mỗi đồng lợi nhuận - thấp hơn nghĩa là rẻ hơn tương đối, nhưng cần so cùng ngành",
        "Non-cash expense: không ảnh hưởng trực tiếp đến dòng tiền"
      ]
    }
  ],
  "1107": [
    {
      "fromDay": 1102,
      "fromTitle": "IB & Phân tích, Bài 2: Comps thực chiến - chọn công ty so sánh đúng cách",
      "text": "Comps thực chiến cần tinh chỉnh sâu hơn mã ngành: quy mô, tăng trưởng, biên lợi nhuận, mô hình kinh doanh tương đồng",
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
        "Thứ tự ưu tiên hợp lý: bảo hiểm cơ bản và quỹ khẩn cấp trước, tối ưu hóa đầu tư sau"
      ]
    }
  ],
  "1108": [
    {
      "fromDay": 1103,
      "fromTitle": "IB & Phân tích, Bài 3: Precedent Transactions - định giá qua thương vụ M&A quá khứ",
      "text": "Precedent Transactions thường có bội số cao hơn Comps vì bao gồm control premium",
      "distractors": [
        "Không có lãi suất cụ thể - đây là chi phí cơ hội của cổ đông",
        "Kiến thức tài chính chỉ có giá trị khi được áp dụng liên tục và cập nhật theo từng giai đoạn cuộc đời - đây là hành trình dài hạn, không phải đích đến một lần rồi thôi"
      ]
    },
    {
      "fromDay": 196,
      "fromTitle": "nhỏ - Hãng hàng không phòng hộ giá dầu",
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
      "fromTitle": "IB & Phân tích, Bài 4: Credit Analysis cơ bản cho nhà phân tích tín dụng",
      "text": "Equity analyst quan tâm upside tăng trưởng; credit analyst quan tâm downside protection - khả năng trả nợ đúng hạn",
      "distractors": [
        "Inventory turnover = COGS / Average Inventory",
        "Luôn đọc kỹ bảng minh họa quyền lợi và phí trước khi ký hợp đồng bảo hiểm dài hạn - đừng chỉ nghe tư vấn viên trình bày"
      ]
    },
    {
      "fromDay": 197,
      "fromTitle": "nhỏ - Doanh nghiệp xuất khẩu phòng hộ tỷ giá",
      "text": "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu",
      "distractors": [
        "Quỹ khẩn cấp lo rủi ro nhỏ và thường gặp; bảo hiểm lo rủi ro hiếm nhưng không có trần tổn thất",
        "ROIC > WACC = tạo giá trị; ROIC < WACC = phá hủy giá trị"
      ]
    }
  ],
  "1110": [
    {
      "fromDay": 1105,
      "fromTitle": "IB & Phân tích, Bài 5: Case tổng hợp - định giá một công ty bằng nhiều phương pháp",
      "text": "Nên trình bày một vùng định giá tổng hợp từ nhiều phương pháp (football field chart), không chốt một con số tuyệt đối",
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
        "Basel III là bộ quy chuẩn quốc tế sinh ra sau khủng hoảng 2008 để tăng cường sức khỏe hệ thống ngân hàng"
      ]
    }
  ]
};
