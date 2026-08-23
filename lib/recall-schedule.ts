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
      "fromTitle": "Chương trình là gì",
      "text": "Bộ xử lý chỉ hiểu lệnh máy; mã nguồn là văn bản dành cho con người.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "7": [
    {
      "fromDay": 2,
      "fromTitle": "Biến và phép gán",
      "text": "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một."
      ]
    }
  ],
  "8": [
    {
      "fromDay": 3,
      "fromTitle": "Kiểu dữ liệu cơ bản",
      "text": "Bốn nhóm cơ bản: số, chuỗi, luận lý, và giá trị rỗng.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "9": [
    {
      "fromDay": 4,
      "fromTitle": "Chuỗi và thao tác văn bản",
      "text": "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "10": [
    {
      "fromDay": 5,
      "fromTitle": "Phép toán và biểu thức luận lý",
      "text": "Mọi phép so sánh cho ra một giá trị luận lý - đúng hoặc sai.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "11": [
    {
      "fromDay": 6,
      "fromTitle": "Câu điều kiện - chương trình rẽ nhánh",
      "text": "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một."
      ]
    }
  ],
  "12": [
    {
      "fromDay": 7,
      "fromTitle": "Vòng lặp",
      "text": "for khi biết trước tập cần duyệt; while khi chỉ có một điều kiện dừng.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "13": [
    {
      "fromDay": 8,
      "fromTitle": "Danh sách - cấu trúc dữ liệu đầu tiên",
      "text": "Chỉ số là độ dời từ đầu, nên bắt đầu từ 0 và phần tử cuối ở vị trí n trừ một.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    },
    {
      "fromDay": 1,
      "fromTitle": "Chương trình là gì",
      "text": "Bộ xử lý chỉ hiểu lệnh máy; mã nguồn là văn bản dành cho con người.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "14": [
    {
      "fromDay": 9,
      "fromTitle": "Từ điển - tra bằng tên thay vì bằng vị trí",
      "text": "Từ điển gồm các cặp khoá và giá trị; khoá là duy nhất trong một từ điển.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một."
      ]
    },
    {
      "fromDay": 2,
      "fromTitle": "Biến và phép gán",
      "text": "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một."
      ]
    }
  ],
  "15": [
    {
      "fromDay": 10,
      "fromTitle": "Ghép lại thành chương trình chạy được",
      "text": "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một."
      ]
    },
    {
      "fromDay": 3,
      "fromTitle": "Kiểu dữ liệu cơ bản",
      "text": "Bốn nhóm cơ bản: số, chuỗi, luận lý, và giá trị rỗng.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "16": [
    {
      "fromDay": 11,
      "fromTitle": "Hàm - đóng gói một việc",
      "text": "Chép mã bốn chỗ nghĩa là phải giữ bốn bản đồng bộ bằng trí nhớ - trí nhớ luôn thua.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào."
      ]
    },
    {
      "fromDay": 4,
      "fromTitle": "Chuỗi và thao tác văn bản",
      "text": "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "17": [
    {
      "fromDay": 12,
      "fromTitle": "Tham số, giá trị trả về và phạm vi",
      "text": "Dữ liệu đơn được sao chép khi truyền vào hàm; dữ liệu phức hợp truyền chỗ trỏ.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào."
      ]
    },
    {
      "fromDay": 5,
      "fromTitle": "Phép toán và biểu thức luận lý",
      "text": "Mọi phép so sánh cho ra một giá trị luận lý - đúng hoặc sai.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "18": [
    {
      "fromDay": 13,
      "fromTitle": "Chương trình trong bộ nhớ",
      "text": "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
      "distractors": [
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
        "Chỉ số là độ dời từ đầu, nên bắt đầu từ 0 và phần tử cuối ở vị trí n trừ một."
      ]
    },
    {
      "fromDay": 6,
      "fromTitle": "Câu điều kiện - chương trình rẽ nhánh",
      "text": "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một."
      ]
    }
  ],
  "19": [
    {
      "fromDay": 14,
      "fromTitle": "Lỗi và ngoại lệ",
      "text": "Bắt lỗi rồi không làm gì là cách tệ nhất - tệ hơn cả để chương trình dừng hẳn.",
      "distractors": [
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte."
      ]
    },
    {
      "fromDay": 7,
      "fromTitle": "Vòng lặp",
      "text": "for khi biết trước tập cần duyệt; while khi chỉ có một điều kiện dừng.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "20": [
    {
      "fromDay": 15,
      "fromTitle": "Gỡ lỗi có phương pháp",
      "text": "Bước đầu tiên luôn là tái hiện lỗi ổn định - không có nó thì không biết đã sửa xong chưa.",
      "distractors": [
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte."
      ]
    },
    {
      "fromDay": 8,
      "fromTitle": "Danh sách - cấu trúc dữ liệu đầu tiên",
      "text": "Chỉ số là độ dời từ đầu, nên bắt đầu từ 0 và phần tử cuối ở vị trí n trừ một.",
      "distractors": [
        "Dấu bằng là phép gán, không phải so sánh - hai dấu bằng mới là so sánh.",
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào."
      ]
    }
  ],
  "26": [
    {
      "fromDay": 21,
      "fromTitle": "Kiểu dữ liệu: vì sao máy phải biết trước",
      "text": "Bộ nhớ chỉ chứa bit; kiểu dữ liệu là cách diễn giải các bit đó.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    }
  ],
  "27": [
    {
      "fromDay": 22,
      "fromTitle": "Số nguyên: phạm vi hữu hạn và cái bẫy tràn số",
      "text": "Kiểu số nguyên có phạm vi hữu hạn, quyết định bởi số bit dành cho nó.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    }
  ],
  "28": [
    {
      "fromDay": 23,
      "fromTitle": "Số thực: vì sao 0,1 cộng 0,2 không ra 0,3",
      "text": "Số thực nhị phân không biểu diễn chính xác được phần lớn số thập phân.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau."
      ]
    }
  ],
  "29": [
    {
      "fromDay": 24,
      "fromTitle": "Văn bản: chuỗi này dài bao nhiêu ký tự?",
      "text": "Byte, đơn vị mã và ký tự người đọc là ba đơn vị đo khác nhau của văn bản.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau."
      ]
    }
  ],
  "30": [
    {
      "fromDay": 25,
      "fromTitle": "Giá trị rỗng: sai lầm tỉ đô",
      "text": "Rỗng nghĩa là không biết; số không và chuỗi trống là những câu trả lời cụ thể.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau."
      ]
    }
  ],
  "31": [
    {
      "fromDay": 26,
      "fromTitle": "Biến và tham chiếu: vì sao sửa cái này lại đổi cái kia",
      "text": "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau."
      ]
    }
  ],
  "32": [
    {
      "fromDay": 27,
      "fromTitle": "Bất biến: khi không sửa được lại là tính năng",
      "text": "Bất biến nghĩa là tạo giá trị mới thay vì sửa giá trị cũ.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    }
  ],
  "33": [
    {
      "fromDay": 28,
      "fromTitle": "Lược đồ dữ liệu: bản hợp đồng giữa hai hệ thống",
      "text": "Lược đồ là hợp đồng: bên đọc viết mã dựa vào nó và không hỏi lại bạn.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    },
    {
      "fromDay": 21,
      "fromTitle": "Kiểu dữ liệu: vì sao máy phải biết trước",
      "text": "Bộ nhớ chỉ chứa bit; kiểu dữ liệu là cách diễn giải các bit đó.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    }
  ],
  "34": [
    {
      "fromDay": 29,
      "fromTitle": "JSON, CSV và nhị phân: mỗi định dạng mất một thứ",
      "text": "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    },
    {
      "fromDay": 22,
      "fromTitle": "Số nguyên: phạm vi hữu hạn và cái bẫy tràn số",
      "text": "Kiểu số nguyên có phạm vi hữu hạn, quyết định bởi số bit dành cho nó.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    }
  ],
  "35": [
    {
      "fromDay": 30,
      "fromTitle": "Thời gian: mốc tuyệt đối và cách con người đọc nó",
      "text": "Lưu mốc tuyệt đối theo giờ chuẩn quốc tế, đổi sang giờ địa phương khi hiển thị.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    },
    {
      "fromDay": 23,
      "fromTitle": "Số thực: vì sao 0,1 cộng 0,2 không ra 0,3",
      "text": "Số thực nhị phân không biểu diễn chính xác được phần lớn số thập phân.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau."
      ]
    }
  ],
  "36": [
    {
      "fromDay": 31,
      "fromTitle": "Định danh: khoá tự tăng hay mã ngẫu nhiên",
      "text": "Khoá tự tăng gọn và sắp xếp tự nhiên, nhưng rò rỉ quy mô và cho phép đoán.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    },
    {
      "fromDay": 24,
      "fromTitle": "Văn bản: chuỗi này dài bao nhiêu ký tự?",
      "text": "Byte, đơn vị mã và ký tự người đọc là ba đơn vị đo khác nhau của văn bản.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau."
      ]
    }
  ],
  "37": [
    {
      "fromDay": 32,
      "fromTitle": "Quan hệ giữa các bảng: khoá ngoại giữ dữ liệu khỏi mồ côi",
      "text": "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    },
    {
      "fromDay": 25,
      "fromTitle": "Giá trị rỗng: sai lầm tỉ đô",
      "text": "Rỗng nghĩa là không biết; số không và chuỗi trống là những câu trả lời cụ thể.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau."
      ]
    }
  ],
  "38": [
    {
      "fromDay": 33,
      "fromTitle": "Chuẩn hoá: mỗi sự thật chỉ nên nằm ở một chỗ",
      "text": "Chuẩn hoá đưa mỗi sự thật về một chỗ duy nhất, các bảng khác trỏ tới bằng định danh.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    },
    {
      "fromDay": 26,
      "fromTitle": "Biến và tham chiếu: vì sao sửa cái này lại đổi cái kia",
      "text": "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau."
      ]
    }
  ],
  "39": [
    {
      "fromDay": 34,
      "fromTitle": "Chỉ mục: vì sao cùng một truy vấn lúc nhanh lúc chậm",
      "text": "Không có chỉ mục thì thời gian truy vấn tăng tỷ lệ với số dòng của bảng.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    },
    {
      "fromDay": 27,
      "fromTitle": "Bất biến: khi không sửa được lại là tính năng",
      "text": "Bất biến nghĩa là tạo giá trị mới thay vì sửa giá trị cũ.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    }
  ],
  "40": [
    {
      "fromDay": 28,
      "fromTitle": "Lược đồ dữ liệu: bản hợp đồng giữa hai hệ thống",
      "text": "Lược đồ là hợp đồng: bên đọc viết mã dựa vào nó và không hỏi lại bạn.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    }
  ],
  "41": [
    {
      "fromDay": 36,
      "fromTitle": "Chất lượng dữ liệu: đo trước khi tin vào con số",
      "text": "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Không có chỉ mục thì thời gian truy vấn tăng tỷ lệ với số dòng của bảng."
      ]
    },
    {
      "fromDay": 29,
      "fromTitle": "JSON, CSV và nhị phân: mỗi định dạng mất một thứ",
      "text": "CSV mất thông tin kiểu và không mô tả được dữ liệu lồng nhau.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    }
  ],
  "42": [
    {
      "fromDay": 37,
      "fromTitle": "Nhật ký: dữ liệu về chính hệ thống của bạn",
      "text": "Mã định danh yêu cầu là thứ nối các dòng nhật ký rời rạc thành một chuỗi.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    },
    {
      "fromDay": 30,
      "fromTitle": "Thời gian: mốc tuyệt đối và cách con người đọc nó",
      "text": "Lưu mốc tuyệt đối theo giờ chuẩn quốc tế, đổi sang giờ địa phương khi hiển thị.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    }
  ],
  "43": [
    {
      "fromDay": 38,
      "fromTitle": "Sao lưu: bản chưa khôi phục thử thì chưa phải bản sao lưu",
      "text": "Bản sao lưu chưa khôi phục thử chỉ là một giả định, không phải sự bảo đảm.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    },
    {
      "fromDay": 31,
      "fromTitle": "Định danh: khoá tự tăng hay mã ngẫu nhiên",
      "text": "Khoá tự tăng gọn và sắp xếp tự nhiên, nhưng rò rỉ quy mô và cho phép đoán.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu."
      ]
    }
  ],
  "44": [
    {
      "fromDay": 39,
      "fromTitle": "Dữ liệu cá nhân: thứ không thu thập thì không làm rò rỉ được",
      "text": "Thu thập tối thiểu: không lưu trường nào mà nghiệp vụ không thật sự cần.",
      "distractors": [
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ.",
        "Không có chỉ mục thì thời gian truy vấn tăng tỷ lệ với số dòng của bảng."
      ]
    },
    {
      "fromDay": 32,
      "fromTitle": "Quan hệ giữa các bảng: khoá ngoại giữ dữ liệu khỏi mồ côi",
      "text": "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    }
  ],
  "45": [
    {
      "fromDay": 40,
      "fromTitle": "Ôn tập: từ một dãy bit tới một hệ thống đáng tin",
      "text": "Kiểu dữ liệu quyết định cả giá trị lẫn phép toán hợp lệ trên một vùng bit.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    },
    {
      "fromDay": 33,
      "fromTitle": "Chuẩn hoá: mỗi sự thật chỉ nên nằm ở một chỗ",
      "text": "Chuẩn hoá đưa mỗi sự thật về một chỗ duy nhất, các bảng khác trỏ tới bằng định danh.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    }
  ],
  "46": [
    {
      "fromDay": 41,
      "fromTitle": "Mạng: dữ liệu đi thành từng gói, không thành dòng liền",
      "text": "Dữ liệu đi thành gói rời, mỗi gói tự tìm đường qua các thiết bị trung gian.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    },
    {
      "fromDay": 34,
      "fromTitle": "Chỉ mục: vì sao cùng một truy vấn lúc nhanh lúc chậm",
      "text": "Không có chỉ mục thì thời gian truy vấn tăng tỷ lệ với số dòng của bảng.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    }
  ],
  "47": [
    {
      "fromDay": 42,
      "fromTitle": "Địa chỉ và tên miền: bước đầu tiên của mọi lần gọi mạng",
      "text": "Tên miền phải được đổi thành địa chỉ trước khi bất kỳ gói tin nào được gửi.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    }
  ],
  "48": [
    {
      "fromDay": 43,
      "fromTitle": "Bảo đảm hay nhanh: hai cách gửi dữ liệu",
      "text": "Cách bảo đảm giữ đúng thứ tự và gửi lại gói mất, đổi lại có độ trễ và nghẽn dòng.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Tên miền phải được đổi thành địa chỉ trước khi bất kỳ gói tin nào được gửi."
      ]
    },
    {
      "fromDay": 36,
      "fromTitle": "Chất lượng dữ liệu: đo trước khi tin vào con số",
      "text": "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Không có chỉ mục thì thời gian truy vấn tăng tỷ lệ với số dòng của bảng."
      ]
    }
  ],
  "49": [
    {
      "fromDay": 44,
      "fromTitle": "Yêu cầu và phản hồi: hình dạng của một lần gọi",
      "text": "Một yêu cầu gồm phương thức, địa chỉ, tiêu đề và nội dung; phản hồi cũng có cấu trúc tương tự.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Tên miền phải được đổi thành địa chỉ trước khi bất kỳ gói tin nào được gửi."
      ]
    },
    {
      "fromDay": 37,
      "fromTitle": "Nhật ký: dữ liệu về chính hệ thống của bạn",
      "text": "Mã định danh yêu cầu là thứ nối các dòng nhật ký rời rạc thành một chuỗi.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    }
  ],
  "50": [
    {
      "fromDay": 45,
      "fromTitle": "Mã trạng thái: lỗi của ai, và có nên thử lại không",
      "text": "Nhóm lỗi người gọi nghĩa là sửa yêu cầu rồi hãy gọi lại.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    },
    {
      "fromDay": 38,
      "fromTitle": "Sao lưu: bản chưa khôi phục thử thì chưa phải bản sao lưu",
      "text": "Bản sao lưu chưa khôi phục thử chỉ là một giả định, không phải sự bảo đảm.",
      "distractors": [
        "Khoá ngoại bảo đảm cột tham chiếu luôn trỏ tới một dòng có thật.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    }
  ],
  "51": [
    {
      "fromDay": 46,
      "fromTitle": "API: bản hợp đồng giữa hai đội không ngồi cạnh nhau",
      "text": "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Tên miền phải được đổi thành địa chỉ trước khi bất kỳ gói tin nào được gửi."
      ]
    },
    {
      "fromDay": 39,
      "fromTitle": "Dữ liệu cá nhân: thứ không thu thập thì không làm rò rỉ được",
      "text": "Thu thập tối thiểu: không lưu trường nào mà nghiệp vụ không thật sự cần.",
      "distractors": [
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ.",
        "Không có chỉ mục thì thời gian truy vấn tăng tỷ lệ với số dòng của bảng."
      ]
    }
  ],
  "52": [
    {
      "fromDay": 47,
      "fromTitle": "Tài nguyên và phương thức: đặt tên cho thứ, không cho việc",
      "text": "Địa chỉ đặt tên cho tài nguyên; phương thức mang ý định thao tác.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    },
    {
      "fromDay": 40,
      "fromTitle": "Ôn tập: từ một dãy bit tới một hệ thống đáng tin",
      "text": "Kiểu dữ liệu quyết định cả giá trị lẫn phép toán hợp lệ trên một vùng bit.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    }
  ],
  "53": [
    {
      "fromDay": 48,
      "fromTitle": "Bạn là ai và bạn được phép làm gì",
      "text": "Xác thực trả lời bạn là ai; uỷ quyền trả lời bạn được làm gì với thứ này.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    },
    {
      "fromDay": 41,
      "fromTitle": "Mạng: dữ liệu đi thành từng gói, không thành dòng liền",
      "text": "Dữ liệu đi thành gói rời, mỗi gói tự tìm đường qua các thiết bị trung gian.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    }
  ],
  "54": [
    {
      "fromDay": 49,
      "fromTitle": "Mã hoá đường truyền: vì sao ổ khoá kia có ý nghĩa",
      "text": "Mã hoá đường truyền giải quyết ba việc: giấu nội dung, chống sửa đổi, và xác minh danh tính máy chủ.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    },
    {
      "fromDay": 42,
      "fromTitle": "Địa chỉ và tên miền: bước đầu tiên của mọi lần gọi mạng",
      "text": "Tên miền phải được đổi thành địa chỉ trước khi bất kỳ gói tin nào được gửi.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Dữ liệu hỏng không báo lỗi, nên phải kiểm tra chủ động và định kỳ."
      ]
    }
  ],
  "55": [
    {
      "fromDay": 50,
      "fromTitle": "Độ trễ và băng thông: hai thứ hoàn toàn khác nhau",
      "text": "Băng thông là lưu lượng mỗi giây; độ trễ là thời gian cho một vòng đi về.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    },
    {
      "fromDay": 43,
      "fromTitle": "Bảo đảm hay nhanh: hai cách gửi dữ liệu",
      "text": "Cách bảo đảm giữ đúng thứ tự và gửi lại gói mất, đổi lại có độ trễ và nghẽn dòng.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Tên miền phải được đổi thành địa chỉ trước khi bất kỳ gói tin nào được gửi."
      ]
    }
  ],
  "56": [
    {
      "fromDay": 51,
      "fromTitle": "Bộ nhớ đệm: lời gọi nhanh nhất là lời gọi không xảy ra",
      "text": "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Băng thông là lưu lượng mỗi giây; độ trễ là thời gian cho một vòng đi về."
      ]
    },
    {
      "fromDay": 44,
      "fromTitle": "Yêu cầu và phản hồi: hình dạng của một lần gọi",
      "text": "Một yêu cầu gồm phương thức, địa chỉ, tiêu đề và nội dung; phản hồi cũng có cấu trúc tương tự.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Tên miền phải được đổi thành địa chỉ trước khi bất kỳ gói tin nào được gửi."
      ]
    }
  ],
  "57": [
    {
      "fromDay": 52,
      "fromTitle": "Giới hạn tốc độ: từ chối bớt để còn phục vụ được ai đó",
      "text": "Giới hạn theo từng người gọi ngăn lỗi của một bên lan thành sự cố chung.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    },
    {
      "fromDay": 45,
      "fromTitle": "Mã trạng thái: lỗi của ai, và có nên thử lại không",
      "text": "Nhóm lỗi người gọi nghĩa là sửa yêu cầu rồi hãy gọi lại.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    }
  ],
  "58": [
    {
      "fromDay": 53,
      "fromTitle": "Gọi hai lần: thao tác nào lặp lại được mà không hại",
      "text": "Hết thời gian chờ không cho biết thao tác đã xảy ra hay chưa.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    },
    {
      "fromDay": 46,
      "fromTitle": "API: bản hợp đồng giữa hai đội không ngồi cạnh nhau",
      "text": "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Tên miền phải được đổi thành địa chỉ trước khi bất kỳ gói tin nào được gửi."
      ]
    }
  ],
  "59": [
    {
      "fromDay": 54,
      "fromTitle": "Khi một phụ thuộc chết: đừng chết theo nó",
      "text": "Mọi lời gọi ra ngoài phải có thời hạn chờ; không có thì mặc định là chờ mãi.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    },
    {
      "fromDay": 47,
      "fromTitle": "Tài nguyên và phương thức: đặt tên cho thứ, không cho việc",
      "text": "Địa chỉ đặt tên cho tài nguyên; phương thức mang ý định thao tác.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    }
  ],
  "60": [
    {
      "fromDay": 55,
      "fromTitle": "Hàng đợi: nhận việc trước, làm sau",
      "text": "Đưa vào hàng đợi những việc mà người dùng không cần kết quả ngay.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    },
    {
      "fromDay": 48,
      "fromTitle": "Bạn là ai và bạn được phép làm gì",
      "text": "Xác thực trả lời bạn là ai; uỷ quyền trả lời bạn được làm gì với thứ này.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    }
  ],
  "61": [
    {
      "fromDay": 56,
      "fromTitle": "Sự kiện: báo cho bên kia thay vì bắt họ hỏi liên tục",
      "text": "Báo khi có chuyện đúng lúc hơn và rẻ hơn việc hỏi liên tục.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    },
    {
      "fromDay": 49,
      "fromTitle": "Mã hoá đường truyền: vì sao ổ khoá kia có ý nghĩa",
      "text": "Mã hoá đường truyền giải quyết ba việc: giấu nội dung, chống sửa đổi, và xác minh danh tính máy chủ.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    }
  ],
  "62": [
    {
      "fromDay": 57,
      "fromTitle": "Phiên bản: sống chung với nhiều thế hệ máy khách",
      "text": "Chỉ ra phiên bản mới khi thay đổi phá vỡ tương thích, vì mỗi phiên bản là chi phí bảo trì.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    },
    {
      "fromDay": 50,
      "fromTitle": "Độ trễ và băng thông: hai thứ hoàn toàn khác nhau",
      "text": "Băng thông là lưu lượng mỗi giây; độ trễ là thời gian cho một vòng đi về.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    }
  ],
  "63": [
    {
      "fromDay": 58,
      "fromTitle": "Đo lường: vì sao giá trị trung bình nói dối",
      "text": "Trung bình che mất phần đuôi, nên đọc theo phân vị 95 và 99.",
      "distractors": [
        "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    },
    {
      "fromDay": 51,
      "fromTitle": "Bộ nhớ đệm: lời gọi nhanh nhất là lời gọi không xảy ra",
      "text": "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Băng thông là lưu lượng mỗi giây; độ trễ là thời gian cho một vòng đi về."
      ]
    }
  ],
  "64": [
    {
      "fromDay": 59,
      "fromTitle": "Mọi thứ gửi tới bạn đều có thể là dối trá",
      "text": "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã."
      ]
    },
    {
      "fromDay": 52,
      "fromTitle": "Giới hạn tốc độ: từ chối bớt để còn phục vụ được ai đó",
      "text": "Giới hạn theo từng người gọi ngăn lỗi của một bên lan thành sự cố chung.",
      "distractors": [
        "Hợp đồng là hành vi quan sát được, không chỉ là tài liệu đã viết.",
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng."
      ]
    }
  ],
  "65": [
    {
      "fromDay": 60,
      "fromTitle": "Ôn tập: đường đi của một lời gọi",
      "text": "Gói tin có thể mất, tới trùng và tới lệch thứ tự - mọi thứ khác là hệ quả.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 53,
      "fromTitle": "Gọi hai lần: thao tác nào lặp lại được mà không hại",
      "text": "Hết thời gian chờ không cho biết thao tác đã xảy ra hay chưa.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    }
  ],
  "66": [
    {
      "fromDay": 61,
      "fromTitle": "Dựng mã: từ văn bản tới thứ máy chạy được",
      "text": "Bước dựng biến mã nguồn thành sản phẩm chạy được, và nó phụ thuộc vào môi trường.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 54,
      "fromTitle": "Khi một phụ thuộc chết: đừng chết theo nó",
      "text": "Mọi lời gọi ra ngoài phải có thời hạn chờ; không có thì mặc định là chờ mãi.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    }
  ],
  "67": [
    {
      "fromDay": 62,
      "fromTitle": "Phụ thuộc: mã bạn không viết nhưng vẫn phải chịu trách nhiệm",
      "text": "Phần lớn mã chạy trong sản phẩm của bạn là mã bạn không viết.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 55,
      "fromTitle": "Hàng đợi: nhận việc trước, làm sau",
      "text": "Đưa vào hàng đợi những việc mà người dùng không cần kết quả ngay.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    }
  ],
  "68": [
    {
      "fromDay": 63,
      "fromTitle": "Số phiên bản: một lời hứa, không phải một cái nhãn",
      "text": "Số phiên bản mô tả rủi ro cho người nhận, không mô tả công sức của người phát hành.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 56,
      "fromTitle": "Sự kiện: báo cho bên kia thay vì bắt họ hỏi liên tục",
      "text": "Báo khi có chuyện đúng lúc hơn và rẻ hơn việc hỏi liên tục.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    }
  ],
  "69": [
    {
      "fromDay": 64,
      "fromTitle": "Cấu hình: thứ khác nhau giữa các môi trường",
      "text": "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 57,
      "fromTitle": "Phiên bản: sống chung với nhiều thế hệ máy khách",
      "text": "Chỉ ra phiên bản mới khi thay đổi phá vỡ tương thích, vì mỗi phiên bản là chi phí bảo trì.",
      "distractors": [
        "Bộ nhớ đệm tồn tại ở nhiều tầng cùng lúc, và mỗi tầng có vòng đời riêng.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    }
  ],
  "70": [
    {
      "fromDay": 65,
      "fromTitle": "Bí mật: thứ không bao giờ được vào kho mã",
      "text": "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
      "distractors": [
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng.",
        "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã."
      ]
    },
    {
      "fromDay": 58,
      "fromTitle": "Đo lường: vì sao giá trị trung bình nói dối",
      "text": "Trung bình che mất phần đuôi, nên đọc theo phân vị 95 và 99.",
      "distractors": [
        "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã.",
        "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào."
      ]
    }
  ],
  "71": [
    {
      "fromDay": 66,
      "fromTitle": "Kiểm thử: nhiều bài nhanh, ít bài chậm",
      "text": "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã."
      ]
    },
    {
      "fromDay": 59,
      "fromTitle": "Mọi thứ gửi tới bạn đều có thể là dối trá",
      "text": "Mọi kiểm tra ở phía máy khách chỉ để cải thiện trải nghiệm, không phải hàng rào.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã."
      ]
    }
  ],
  "72": [
    {
      "fromDay": 67,
      "fromTitle": "Tích hợp liên tục: máy chạy kiểm thử thay cho lời hứa",
      "text": "Cổng tự động biến quy ước thành thứ không phụ thuộc trí nhớ hay áp lực.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 60,
      "fromTitle": "Ôn tập: đường đi của một lời gọi",
      "text": "Gói tin có thể mất, tới trùng và tới lệch thứ tự - mọi thứ khác là hệ quả.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "73": [
    {
      "fromDay": 68,
      "fromTitle": "Độ phủ: con số dễ đạt và dễ hiểu sai",
      "text": "Độ phủ đo dòng được chạy qua, không đo điều được khẳng định.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 61,
      "fromTitle": "Dựng mã: từ văn bản tới thứ máy chạy được",
      "text": "Bước dựng biến mã nguồn thành sản phẩm chạy được, và nó phụ thuộc vào môi trường.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "74": [
    {
      "fromDay": 69,
      "fromTitle": "Rà soát mã: cái máy không bắt được",
      "text": "Để máy lo định dạng và quy ước, dành thời gian người cho thiết kế và ý nghĩa.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 62,
      "fromTitle": "Phụ thuộc: mã bạn không viết nhưng vẫn phải chịu trách nhiệm",
      "text": "Phần lớn mã chạy trong sản phẩm của bạn là mã bạn không viết.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "75": [
    {
      "fromDay": 70,
      "fromTitle": "Nhánh: càng sống lâu càng đắt",
      "text": "Xung đột là hàm của khoảng cách, và khoảng cách là hàm của thời gian.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 63,
      "fromTitle": "Số phiên bản: một lời hứa, không phải một cái nhãn",
      "text": "Số phiên bản mô tả rủi ro cho người nhận, không mô tả công sức của người phát hành.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "76": [
    {
      "fromDay": 71,
      "fromTitle": "Cờ tính năng: tách lúc triển khai khỏi lúc phát hành",
      "text": "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    },
    {
      "fromDay": 64,
      "fromTitle": "Cấu hình: thứ khác nhau giữa các môi trường",
      "text": "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "77": [
    {
      "fromDay": 72,
      "fromTitle": "Triển khai: thay máy đang chạy mà không ai nhận ra",
      "text": "Triển khai từng phần biến lỗi toàn phần thành lỗi cục bộ trong thời gian ngắn.",
      "distractors": [
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng.",
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên."
      ]
    },
    {
      "fromDay": 65,
      "fromTitle": "Bí mật: thứ không bao giờ được vào kho mã",
      "text": "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
      "distractors": [
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng.",
        "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã."
      ]
    }
  ],
  "78": [
    {
      "fromDay": 73,
      "fromTitle": "Đổi cấu trúc dữ liệu: phần không quay lui được",
      "text": "Thay đổi cấu trúc dữ liệu phải tương thích với cả bản mã cũ lẫn bản mới.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra."
      ]
    },
    {
      "fromDay": 66,
      "fromTitle": "Kiểm thử: nhiều bài nhanh, ít bài chậm",
      "text": "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Cấu hình là thứ khác nhau giữa các môi trường; mọi thứ khác thuộc về mã."
      ]
    }
  ],
  "79": [
    {
      "fromDay": 74,
      "fromTitle": "Quan sát được: biết hệ thống đang làm gì lúc này",
      "text": "Chỉ số phát hiện bất thường, nhật ký giải thích một trường hợp, vết chỉ ra thời gian đi đâu.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra."
      ]
    },
    {
      "fromDay": 67,
      "fromTitle": "Tích hợp liên tục: máy chạy kiểm thử thay cho lời hứa",
      "text": "Cổng tự động biến quy ước thành thứ không phụ thuộc trí nhớ hay áp lực.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "80": [
    {
      "fromDay": 75,
      "fromTitle": "Cảnh báo: đánh thức người đúng, vì việc đáng thức",
      "text": "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
      "distractors": [
        "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra.",
        "Thay đổi cấu trúc dữ liệu phải tương thích với cả bản mã cũ lẫn bản mới."
      ]
    },
    {
      "fromDay": 68,
      "fromTitle": "Độ phủ: con số dễ đạt và dễ hiểu sai",
      "text": "Độ phủ đo dòng được chạy qua, không đo điều được khẳng định.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "81": [
    {
      "fromDay": 76,
      "fromTitle": "Sự cố: khôi phục trước, hiểu nguyên nhân sau",
      "text": "Khôi phục và điều tra là hai việc tách biệt; chỉ việc đầu là gấp.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 69,
      "fromTitle": "Rà soát mã: cái máy không bắt được",
      "text": "Để máy lo định dạng và quy ước, dành thời gian người cho thiết kế và ý nghĩa.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "82": [
    {
      "fromDay": 77,
      "fromTitle": "Sau sự cố: tìm nguyên nhân, không tìm người",
      "text": "Con người mắc lỗi là hằng số; thứ thay đổi được là hệ thống quanh họ.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 70,
      "fromTitle": "Nhánh: càng sống lâu càng đắt",
      "text": "Xung đột là hàm của khoảng cách, và khoảng cách là hàm của thời gian.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "83": [
    {
      "fromDay": 78,
      "fromTitle": "Nợ kỹ thuật: khoản vay có lãi, không phải rác",
      "text": "Nợ kỹ thuật là lựa chọn có ý thức kèm kế hoạch trả, không phải mọi đoạn mã xấu.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 71,
      "fromTitle": "Cờ tính năng: tách lúc triển khai khỏi lúc phát hành",
      "text": "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra.",
      "distractors": [
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng."
      ]
    }
  ],
  "84": [
    {
      "fromDay": 79,
      "fromTitle": "Tài liệu: viết cho người sáu tháng sau, thường là chính bạn",
      "text": "Mã và kiểm thử nói cái gì và như thế nào; chỉ tài liệu nói vì sao.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 72,
      "fromTitle": "Triển khai: thay máy đang chạy mà không ai nhận ra",
      "text": "Triển khai từng phần biến lỗi toàn phần thành lỗi cục bộ trong thời gian ngắn.",
      "distractors": [
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng.",
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên."
      ]
    }
  ],
  "85": [
    {
      "fromDay": 80,
      "fromTitle": "Ôn tập: đường đi từ một dòng mã tới người dùng",
      "text": "Bước dựng phải lặp lại được, nếu không thì mọi kết luận từ kiểm thử đều yếu.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 73,
      "fromTitle": "Đổi cấu trúc dữ liệu: phần không quay lui được",
      "text": "Thay đổi cấu trúc dữ liệu phải tương thích với cả bản mã cũ lẫn bản mới.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra."
      ]
    }
  ],
  "86": [
    {
      "fromDay": 81,
      "fromTitle": "Đo cái gì: chỉ số nói lên điều bạn cần biết",
      "text": "Một chỉ số chỉ có nghĩa khi bạn nói rõ nó thay mặt cho điều gì.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 74,
      "fromTitle": "Quan sát được: biết hệ thống đang làm gì lúc này",
      "text": "Chỉ số phát hiện bất thường, nhật ký giải thích một trường hợp, vết chỉ ra thời gian đi đâu.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra."
      ]
    }
  ],
  "87": [
    {
      "fromDay": 82,
      "fromTitle": "Chỉ số phù phiếm: con số chỉ biết tăng",
      "text": "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cỡ mẫu cần thiết tăng theo bình phương khi hiệu ứng nhỏ đi."
      ]
    },
    {
      "fromDay": 75,
      "fromTitle": "Cảnh báo: đánh thức người đúng, vì việc đáng thức",
      "text": "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
      "distractors": [
        "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra.",
        "Thay đổi cấu trúc dữ liệu phải tương thích với cả bản mã cũ lẫn bản mới."
      ]
    }
  ],
  "88": [
    {
      "fromDay": 83,
      "fromTitle": "Nhóm theo thời điểm: tách chất lượng khỏi quy mô",
      "text": "Nhóm theo thời điểm bắt đầu tách chất lượng sản phẩm khỏi quy mô, và đường cong giữ chân của từng nhóm là thứ đáng đọc.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 76,
      "fromTitle": "Sự cố: khôi phục trước, hiểu nguyên nhân sau",
      "text": "Khôi phục và điều tra là hai việc tách biệt; chỉ việc đầu là gấp.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "89": [
    {
      "fromDay": 84,
      "fromTitle": "Phễu: tìm chỗ người dùng rơi ra",
      "text": "Chia hành trình thành bước để biến một con số tổng thành một danh sách việc.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 77,
      "fromTitle": "Sau sự cố: tìm nguyên nhân, không tìm người",
      "text": "Con người mắc lỗi là hằng số; thứ thay đổi được là hệ thống quanh họ.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "90": [
    {
      "fromDay": 85,
      "fromTitle": "Thử nghiệm A/B: so với chính mình, cùng thời điểm",
      "text": "Chia ngẫu nhiên và chạy song song là thứ tách tác động của thay đổi khỏi nhiễu bên ngoài.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 78,
      "fromTitle": "Nợ kỹ thuật: khoản vay có lãi, không phải rác",
      "text": "Nợ kỹ thuật là lựa chọn có ý thức kèm kế hoạch trả, không phải mọi đoạn mã xấu.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "91": [
    {
      "fromDay": 86,
      "fromTitle": "Cỡ mẫu: vì sao thử nghiệm cần lâu hơn bạn tưởng",
      "text": "Cỡ mẫu cần thiết tăng theo bình phương khi hiệu ứng nhỏ đi.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 79,
      "fromTitle": "Tài liệu: viết cho người sáu tháng sau, thường là chính bạn",
      "text": "Mã và kiểm thử nói cái gì và như thế nào; chỉ tài liệu nói vì sao.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "92": [
    {
      "fromDay": 87,
      "fromTitle": "Đi cùng nhau không có nghĩa là gây ra nhau",
      "text": "Hai đại lượng đi cùng nhau có thể do nhân quả ngược chiều hoặc do nguyên nhân thứ ba.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    },
    {
      "fromDay": 80,
      "fromTitle": "Ôn tập: đường đi từ một dòng mã tới người dùng",
      "text": "Bước dựng phải lặp lại được, nếu không thì mọi kết luận từ kiểm thử đều yếu.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "93": [
    {
      "fromDay": 88,
      "fromTitle": "Một chỉ số dẫn dắt: thứ cả đội cùng nhìn",
      "text": "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
      "distractors": [
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    },
    {
      "fromDay": 81,
      "fromTitle": "Đo cái gì: chỉ số nói lên điều bạn cần biết",
      "text": "Một chỉ số chỉ có nghĩa khi bạn nói rõ nó thay mặt cho điều gì.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "94": [
    {
      "fromDay": 89,
      "fromTitle": "Định nghĩa chỉ số: con số đổi vì cách tính đổi",
      "text": "Mỗi chỉ số cần một định nghĩa viết ra, ở một chỗ duy nhất ai cũng tra được.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    },
    {
      "fromDay": 82,
      "fromTitle": "Chỉ số phù phiếm: con số chỉ biết tăng",
      "text": "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cỡ mẫu cần thiết tăng theo bình phương khi hiệu ứng nhỏ đi."
      ]
    }
  ],
  "95": [
    {
      "fromDay": 90,
      "fromTitle": "Nói chuyện với người dùng: thứ số liệu không nói được",
      "text": "Số liệu trả lời cái gì và ở đâu; phản hồi định tính trả lời vì sao.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    },
    {
      "fromDay": 83,
      "fromTitle": "Nhóm theo thời điểm: tách chất lượng khỏi quy mô",
      "text": "Nhóm theo thời điểm bắt đầu tách chất lượng sản phẩm khỏi quy mô, và đường cong giữ chân của từng nhóm là thứ đáng đọc.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "96": [
    {
      "fromDay": 91,
      "fromTitle": "Ước lượng: vì sao nó luôn thấp hơn thực tế",
      "text": "Sai lệch của ước lượng không đối xứng: nó lệch về phía lâu hơn.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    },
    {
      "fromDay": 84,
      "fromTitle": "Phễu: tìm chỗ người dùng rơi ra",
      "text": "Chia hành trình thành bước để biến một con số tổng thành một danh sách việc.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "97": [
    {
      "fromDay": 92,
      "fromTitle": "Chia nhỏ: giao từng phần thay vì giao một lần",
      "text": "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cỡ mẫu cần thiết tăng theo bình phương khi hiệu ứng nhỏ đi."
      ]
    },
    {
      "fromDay": 85,
      "fromTitle": "Thử nghiệm A/B: so với chính mình, cùng thời điểm",
      "text": "Chia ngẫu nhiên và chạy song song là thứ tách tác động của thay đổi khỏi nhiễu bên ngoài.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "98": [
    {
      "fromDay": 93,
      "fromTitle": "Phạm vi, thời gian, chất lượng: chọn thứ để nhường",
      "text": "Cắt phạm vi là lựa chọn có hậu quả rõ ràng và ai cũng nhìn thấy.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    },
    {
      "fromDay": 86,
      "fromTitle": "Cỡ mẫu: vì sao thử nghiệm cần lâu hơn bạn tưởng",
      "text": "Cỡ mẫu cần thiết tăng theo bình phương khi hiệu ứng nhỏ đi.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "99": [
    {
      "fromDay": 94,
      "fromTitle": "Ưu tiên: danh sách luôn dài hơn thời gian",
      "text": "Chi phí trì hoãn phân biệt được những việc mà lợi ích đơn thuần không phân biệt nổi.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    },
    {
      "fromDay": 87,
      "fromTitle": "Đi cùng nhau không có nghĩa là gây ra nhau",
      "text": "Hai đại lượng đi cùng nhau có thể do nhân quả ngược chiều hoặc do nguyên nhân thứ ba.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề."
      ]
    }
  ],
  "100": [
    {
      "fromDay": 95,
      "fromTitle": "Nói không: mỗi lời đồng ý là một lời từ chối với việc khác",
      "text": "Nhận thêm mà không bỏ bớt chỉ là hoãn lời từ chối, không phải tránh được nó.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Mỗi chỉ số cần một định nghĩa viết ra, ở một chỗ duy nhất ai cũng tra được."
      ]
    },
    {
      "fromDay": 88,
      "fromTitle": "Một chỉ số dẫn dắt: thứ cả đội cùng nhìn",
      "text": "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
      "distractors": [
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "101": [
    {
      "fromDay": 96,
      "fromTitle": "Kiểm chứng trước khi xây: mua thông tin với giá rẻ",
      "text": "Hành vi đã xảy ra là bằng chứng mạnh hơn nhiều so với ý kiến khi được hỏi.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả."
      ]
    },
    {
      "fromDay": 89,
      "fromTitle": "Định nghĩa chỉ số: con số đổi vì cách tính đổi",
      "text": "Mỗi chỉ số cần một định nghĩa viết ra, ở một chỗ duy nhất ai cũng tra được.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "102": [
    {
      "fromDay": 97,
      "fromTitle": "Thất bại phổ biến nhất: làm rất tốt một thứ không ai cần",
      "text": "Chất lượng kỹ thuật không bảo vệ được khỏi việc xây nhầm thứ.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả."
      ]
    },
    {
      "fromDay": 90,
      "fromTitle": "Nói chuyện với người dùng: thứ số liệu không nói được",
      "text": "Số liệu trả lời cái gì và ở đâu; phản hồi định tính trả lời vì sao.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "103": [
    {
      "fromDay": 98,
      "fromTitle": "Giải thích đánh đổi cho người không viết mã",
      "text": "Diễn đạt đánh đổi kỹ thuật bằng thời gian, rủi ro hoặc tiền để nó so sánh được.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả."
      ]
    },
    {
      "fromDay": 91,
      "fromTitle": "Ước lượng: vì sao nó luôn thấp hơn thực tế",
      "text": "Sai lệch của ước lượng không đối xứng: nó lệch về phía lâu hơn.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "104": [
    {
      "fromDay": 99,
      "fromTitle": "Dự án: đi trọn một vòng từ ý tưởng tới con số",
      "text": "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả.",
      "distractors": [
        "Chi phí phối hợp tăng theo bình phương số người, năng lực chỉ tăng tuyến tính.",
        "Hợp đồng chỉ có giá trị khi được kiểm tự động ở cả hai phía."
      ]
    },
    {
      "fromDay": 92,
      "fromTitle": "Chia nhỏ: giao từng phần thay vì giao một lần",
      "text": "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cỡ mẫu cần thiết tăng theo bình phương khi hiệu ứng nhỏ đi."
      ]
    }
  ],
  "105": [
    {
      "fromDay": 100,
      "fromTitle": "Ôn tập: đo cho đúng rồi chọn cho đúng",
      "text": "Chỉ số chỉ có nghĩa khi nói rõ nó thay mặt cho điều gì, và nó phải giảm được.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả."
      ]
    },
    {
      "fromDay": 93,
      "fromTitle": "Phạm vi, thời gian, chất lượng: chọn thứ để nhường",
      "text": "Cắt phạm vi là lựa chọn có hậu quả rõ ràng và ai cũng nhìn thấy.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "106": [
    {
      "fromDay": 101,
      "fromTitle": "Quy mô: vấn đề đổi chất chứ không chỉ đổi lượng",
      "text": "Chi phí phối hợp tăng theo bình phương số người, năng lực chỉ tăng tuyến tính.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    },
    {
      "fromDay": 94,
      "fromTitle": "Ưu tiên: danh sách luôn dài hơn thời gian",
      "text": "Chi phí trì hoãn phân biệt được những việc mà lợi ích đơn thuần không phân biệt nổi.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "107": [
    {
      "fromDay": 102,
      "fromTitle": "Ranh giới: mỗi phần có đúng một chủ",
      "text": "Vẽ ranh giới theo lý do thay đổi, không theo tầng kỹ thuật.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    },
    {
      "fromDay": 95,
      "fromTitle": "Nói không: mỗi lời đồng ý là một lời từ chối với việc khác",
      "text": "Nhận thêm mà không bỏ bớt chỉ là hoãn lời từ chối, không phải tránh được nó.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Mỗi chỉ số cần một định nghĩa viết ra, ở một chỗ duy nhất ai cũng tra được."
      ]
    }
  ],
  "108": [
    {
      "fromDay": 103,
      "fromTitle": "Phụ thuộc chéo: khi ranh giới có lỗ",
      "text": "Chi phí bị chặn lớn hơn số ngày chờ, vì mất ngữ cảnh và phải quay lại.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    },
    {
      "fromDay": 96,
      "fromTitle": "Kiểm chứng trước khi xây: mua thông tin với giá rẻ",
      "text": "Hành vi đã xảy ra là bằng chứng mạnh hơn nhiều so với ý kiến khi được hỏi.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả."
      ]
    }
  ],
  "109": [
    {
      "fromDay": 104,
      "fromTitle": "Hợp đồng giữa các đội: lời hứa phải kiểm chứng được",
      "text": "Hợp đồng chỉ có giá trị khi được kiểm tự động ở cả hai phía.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    },
    {
      "fromDay": 97,
      "fromTitle": "Thất bại phổ biến nhất: làm rất tốt một thứ không ai cần",
      "text": "Chất lượng kỹ thuật không bảo vệ được khỏi việc xây nhầm thứ.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả."
      ]
    }
  ],
  "110": [
    {
      "fromDay": 105,
      "fromTitle": "Kho mã chung hay tách: đánh đổi chứ không có đáp án đúng",
      "text": "Kho chung làm thay đổi xuyên ranh giới rẻ, đổi lại cần công cụ mạnh.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    },
    {
      "fromDay": 98,
      "fromTitle": "Giải thích đánh đổi cho người không viết mã",
      "text": "Diễn đạt đánh đổi kỹ thuật bằng thời gian, rủi ro hoặc tiền để nó so sánh được.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả."
      ]
    }
  ],
  "111": [
    {
      "fromDay": 106,
      "fromTitle": "Chuẩn chung và tự chủ: chọn chỗ để thống nhất",
      "text": "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
      "distractors": [
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng.",
        "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm."
      ]
    },
    {
      "fromDay": 99,
      "fromTitle": "Dự án: đi trọn một vòng từ ý tưởng tới con số",
      "text": "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả.",
      "distractors": [
        "Chi phí phối hợp tăng theo bình phương số người, năng lực chỉ tăng tuyến tính.",
        "Hợp đồng chỉ có giá trị khi được kiểm tự động ở cả hai phía."
      ]
    }
  ],
  "112": [
    {
      "fromDay": 107,
      "fromTitle": "Nền tảng nội bộ: sản phẩm mà khách hàng là đồng nghiệp",
      "text": "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm."
      ]
    },
    {
      "fromDay": 100,
      "fromTitle": "Ôn tập: đo cho đúng rồi chọn cho đúng",
      "text": "Chỉ số chỉ có nghĩa khi nói rõ nó thay mặt cho điều gì, và nó phải giảm được.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả."
      ]
    }
  ],
  "113": [
    {
      "fromDay": 108,
      "fromTitle": "Dùng chung hay nhân bản: một chút lặp rẻ hơn một ràng buộc sai",
      "text": "Giống nhau tình cờ và giống nhau vì cùng quy tắc là hai chuyện khác hẳn.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    },
    {
      "fromDay": 101,
      "fromTitle": "Quy mô: vấn đề đổi chất chứ không chỉ đổi lượng",
      "text": "Chi phí phối hợp tăng theo bình phương số người, năng lực chỉ tăng tuyến tính.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    }
  ],
  "114": [
    {
      "fromDay": 109,
      "fromTitle": "Dữ liệu dùng chung: ranh giới khó giữ nhất",
      "text": "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    },
    {
      "fromDay": 102,
      "fromTitle": "Ranh giới: mỗi phần có đúng một chủ",
      "text": "Vẽ ranh giới theo lý do thay đổi, không theo tầng kỹ thuật.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    }
  ],
  "115": [
    {
      "fromDay": 110,
      "fromTitle": "Sự kiện nội bộ: kể chuyện đã xảy ra, đừng ra lệnh",
      "text": "Sự kiện mô tả việc đã xảy ra, ở thì quá khứ, không mang mệnh lệnh.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng."
      ]
    },
    {
      "fromDay": 103,
      "fromTitle": "Phụ thuộc chéo: khi ranh giới có lỗ",
      "text": "Chi phí bị chặn lớn hơn số ngày chờ, vì mất ngữ cảnh và phải quay lại.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    }
  ],
  "116": [
    {
      "fromDay": 111,
      "fromTitle": "Nhất quán cuối cùng: hai đội, hai câu trả lời, cùng một lúc",
      "text": "Nhất quán cuối cùng là cái giá của việc các đội độc lập, không phải lỗi.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng."
      ]
    },
    {
      "fromDay": 104,
      "fromTitle": "Hợp đồng giữa các đội: lời hứa phải kiểm chứng được",
      "text": "Hợp đồng chỉ có giá trị khi được kiểm tự động ở cả hai phía.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    }
  ],
  "117": [
    {
      "fromDay": 112,
      "fromTitle": "Khi buộc phải triển khai cùng nhau",
      "text": "Phải triển khai đồng thời luôn là dấu hiệu của thay đổi phá vỡ tương thích chưa chia nhỏ.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng."
      ]
    },
    {
      "fromDay": 105,
      "fromTitle": "Kho mã chung hay tách: đánh đổi chứ không có đáp án đúng",
      "text": "Kho chung làm thay đổi xuyên ranh giới rẻ, đổi lại cần công cụ mạnh.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    }
  ],
  "118": [
    {
      "fromDay": 113,
      "fromTitle": "Đường găng: chuỗi dài nhất quyết định ngày xong",
      "text": "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    },
    {
      "fromDay": 106,
      "fromTitle": "Chuẩn chung và tự chủ: chọn chỗ để thống nhất",
      "text": "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
      "distractors": [
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng.",
        "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm."
      ]
    }
  ],
  "119": [
    {
      "fromDay": 114,
      "fromTitle": "Ghi lại quyết định: vì sao mọi thứ như hiện tại",
      "text": "Ghi lại các phương án đã loại và lý do, vì mã chỉ cho thấy phương án được chọn.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm."
      ]
    },
    {
      "fromDay": 107,
      "fromTitle": "Nền tảng nội bộ: sản phẩm mà khách hàng là đồng nghiệp",
      "text": "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm."
      ]
    }
  ],
  "120": [
    {
      "fromDay": 115,
      "fromTitle": "Rà soát kiến trúc: cửa sổ hay cửa ải",
      "text": "Tiêu chí rà soát là chi phí sửa sai, không phải quy mô mã hay ngân sách.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm."
      ]
    },
    {
      "fromDay": 108,
      "fromTitle": "Dùng chung hay nhân bản: một chút lặp rẻ hơn một ràng buộc sai",
      "text": "Giống nhau tình cờ và giống nhau vì cùng quy tắc là hai chuyện khác hẳn.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    }
  ],
  "121": [
    {
      "fromDay": 116,
      "fromTitle": "Thay hệ thống cũ: bóp nghẹt dần thay vì viết lại",
      "text": "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
      "distractors": [
        "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi.",
        "Ghi lại các phương án đã loại và lý do, vì mã chỉ cho thấy phương án được chọn."
      ]
    },
    {
      "fromDay": 109,
      "fromTitle": "Dữ liệu dùng chung: ranh giới khó giữ nhất",
      "text": "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    }
  ],
  "122": [
    {
      "fromDay": 117,
      "fromTitle": "Gỡ hệ thống cũ: phần không ai muốn làm",
      "text": "Cuộc di trú chỉ xong khi hệ thống cũ đã tắt, không phải khi bản mới chạy.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi."
      ]
    },
    {
      "fromDay": 110,
      "fromTitle": "Sự kiện nội bộ: kể chuyện đã xảy ra, đừng ra lệnh",
      "text": "Sự kiện mô tả việc đã xảy ra, ở thì quá khứ, không mang mệnh lệnh.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng."
      ]
    }
  ],
  "123": [
    {
      "fromDay": 118,
      "fromTitle": "Hệ thống có hình dạng của tổ chức làm ra nó",
      "text": "Ranh giới nằm trong nội bộ một đội có xu hướng bị bào mòn.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi."
      ]
    },
    {
      "fromDay": 111,
      "fromTitle": "Nhất quán cuối cùng: hai đội, hai câu trả lời, cùng một lúc",
      "text": "Nhất quán cuối cùng là cái giá của việc các đội độc lập, không phải lỗi.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng."
      ]
    }
  ],
  "124": [
    {
      "fromDay": 119,
      "fromTitle": "Khi nào tách dịch vụ, khi nào đừng",
      "text": "Tách dịch vụ mua sự độc lập vận hành, trả bằng độ phức tạp phân tán.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi."
      ]
    },
    {
      "fromDay": 112,
      "fromTitle": "Khi buộc phải triển khai cùng nhau",
      "text": "Phải triển khai đồng thời luôn là dấu hiệu của thay đổi phá vỡ tương thích chưa chia nhỏ.",
      "distractors": [
        "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng."
      ]
    }
  ],
  "125": [
    {
      "fromDay": 120,
      "fromTitle": "Ôn tập: mọi thứ đổi khác khi có nhiều đội",
      "text": "Chi phí phối hợp tăng theo bình phương số người; ranh giới là công cụ cắt nó.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Ghi lại các phương án đã loại và lý do, vì mã chỉ cho thấy phương án được chọn."
      ]
    },
    {
      "fromDay": 113,
      "fromTitle": "Đường găng: chuỗi dài nhất quyết định ngày xong",
      "text": "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng."
      ]
    }
  ],
  "126": [
    {
      "fromDay": 121,
      "fromTitle": "Mô hình mối đe doạ: ai muốn gì, và bạn mất gì",
      "text": "Bắt đầu từ tài sản và kẻ tấn công, không từ danh sách biện pháp.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Cuộc di trú chỉ xong khi hệ thống cũ đã tắt, không phải khi bản mới chạy."
      ]
    },
    {
      "fromDay": 114,
      "fromTitle": "Ghi lại quyết định: vì sao mọi thứ như hiện tại",
      "text": "Ghi lại các phương án đã loại và lý do, vì mã chỉ cho thấy phương án được chọn.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm."
      ]
    }
  ],
  "127": [
    {
      "fromDay": 122,
      "fromTitle": "Mật khẩu: thứ yếu nhất mà ai cũng còn dùng",
      "text": "Rủi ro lớn nhất là dùng lại mật khẩu, không phải mật khẩu bị bẻ khoá.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Cuộc di trú chỉ xong khi hệ thống cũ đã tắt, không phải khi bản mới chạy."
      ]
    },
    {
      "fromDay": 115,
      "fromTitle": "Rà soát kiến trúc: cửa sổ hay cửa ải",
      "text": "Tiêu chí rà soát là chi phí sửa sai, không phải quy mô mã hay ngân sách.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm."
      ]
    }
  ],
  "128": [
    {
      "fromDay": 123,
      "fromTitle": "Phiên đăng nhập: chìa khoá được cấp sau khi mở cửa",
      "text": "Mã phiên có quyền tương đương mật khẩu nhưng lộ ra ở nhiều chỗ hơn.",
      "distractors": [
        "Cuộc di trú chỉ xong khi hệ thống cũ đã tắt, không phải khi bản mới chạy.",
        "Tách dịch vụ mua sự độc lập vận hành, trả bằng độ phức tạp phân tán."
      ]
    },
    {
      "fromDay": 116,
      "fromTitle": "Thay hệ thống cũ: bóp nghẹt dần thay vì viết lại",
      "text": "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
      "distractors": [
        "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi.",
        "Ghi lại các phương án đã loại và lý do, vì mã chỉ cho thấy phương án được chọn."
      ]
    }
  ],
  "129": [
    {
      "fromDay": 124,
      "fromTitle": "Lưu mật khẩu: giả định cơ sở dữ liệu sẽ bị lấy",
      "text": "Thiết kế với giả định cơ sở dữ liệu sẽ bị lấy vào một ngày nào đó.",
      "distractors": [
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt.",
        "Tách dịch vụ mua sự độc lập vận hành, trả bằng độ phức tạp phân tán."
      ]
    },
    {
      "fromDay": 117,
      "fromTitle": "Gỡ hệ thống cũ: phần không ai muốn làm",
      "text": "Cuộc di trú chỉ xong khi hệ thống cũ đã tắt, không phải khi bản mới chạy.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi."
      ]
    }
  ],
  "130": [
    {
      "fromDay": 125,
      "fromTitle": "Phân quyền: theo vai trò là chưa đủ",
      "text": "Vai trò trả lời loại thao tác; quan hệ trả lời với dữ liệu nào.",
      "distractors": [
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt.",
        "Tách dịch vụ mua sự độc lập vận hành, trả bằng độ phức tạp phân tán."
      ]
    },
    {
      "fromDay": 118,
      "fromTitle": "Hệ thống có hình dạng của tổ chức làm ra nó",
      "text": "Ranh giới nằm trong nội bộ một đội có xu hướng bị bào mòn.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi."
      ]
    }
  ],
  "131": [
    {
      "fromDay": 126,
      "fromTitle": "Mã hoá dữ liệu nằm yên: bảo vệ trước ai",
      "text": "Mã hoá toàn ổ chỉ bảo vệ khi ổ ở trạng thái tắt và rời khỏi tầm kiểm soát.",
      "distractors": [
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt.",
        "Mã hoá theo ngữ cảnh lúc hiển thị, không lọc lúc nhận vào."
      ]
    },
    {
      "fromDay": 119,
      "fromTitle": "Khi nào tách dịch vụ, khi nào đừng",
      "text": "Tách dịch vụ mua sự độc lập vận hành, trả bằng độ phức tạp phân tán.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi."
      ]
    }
  ],
  "132": [
    {
      "fromDay": 127,
      "fromTitle": "Quản lý khoá: chỗ mọi lớp mã hoá quy về",
      "text": "Khoá phải nằm ở nơi chịu kịch bản xâm nhập khác với dữ liệu.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt."
      ]
    },
    {
      "fromDay": 120,
      "fromTitle": "Ôn tập: mọi thứ đổi khác khi có nhiều đội",
      "text": "Chi phí phối hợp tăng theo bình phương số người; ranh giới là công cụ cắt nó.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Ghi lại các phương án đã loại và lý do, vì mã chỉ cho thấy phương án được chọn."
      ]
    }
  ],
  "133": [
    {
      "fromDay": 128,
      "fromTitle": "Tiêm lệnh: dữ liệu bị đọc thành câu lệnh",
      "text": "Nguyên nhân luôn là dữ liệu và câu lệnh bị trộn vào một chuỗi.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    },
    {
      "fromDay": 121,
      "fromTitle": "Mô hình mối đe doạ: ai muốn gì, và bạn mất gì",
      "text": "Bắt đầu từ tài sản và kẻ tấn công, không từ danh sách biện pháp.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Cuộc di trú chỉ xong khi hệ thống cũ đã tắt, không phải khi bản mới chạy."
      ]
    }
  ],
  "134": [
    {
      "fromDay": 129,
      "fromTitle": "Kịch bản chèn vào trang: nạn nhân là người dùng của bạn",
      "text": "Mã hoá theo ngữ cảnh lúc hiển thị, không lọc lúc nhận vào.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    },
    {
      "fromDay": 122,
      "fromTitle": "Mật khẩu: thứ yếu nhất mà ai cũng còn dùng",
      "text": "Rủi ro lớn nhất là dùng lại mật khẩu, không phải mật khẩu bị bẻ khoá.",
      "distractors": [
        "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
        "Cuộc di trú chỉ xong khi hệ thống cũ đã tắt, không phải khi bản mới chạy."
      ]
    }
  ],
  "135": [
    {
      "fromDay": 130,
      "fromTitle": "Giả mạo yêu cầu: mượn phiên đăng nhập của nạn nhân",
      "text": "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    },
    {
      "fromDay": 123,
      "fromTitle": "Phiên đăng nhập: chìa khoá được cấp sau khi mở cửa",
      "text": "Mã phiên có quyền tương đương mật khẩu nhưng lộ ra ở nhiều chỗ hơn.",
      "distractors": [
        "Cuộc di trú chỉ xong khi hệ thống cũ đã tắt, không phải khi bản mới chạy.",
        "Tách dịch vụ mua sự độc lập vận hành, trả bằng độ phức tạp phân tán."
      ]
    }
  ],
  "136": [
    {
      "fromDay": 131,
      "fromTitle": "Tải tệp lên: nhận một tệp là nhận một rủi ro",
      "text": "Phần mở rộng và loại nội dung khai báo đều do người gửi đặt nên không tin được.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    },
    {
      "fromDay": 124,
      "fromTitle": "Lưu mật khẩu: giả định cơ sở dữ liệu sẽ bị lấy",
      "text": "Thiết kế với giả định cơ sở dữ liệu sẽ bị lấy vào một ngày nào đó.",
      "distractors": [
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt.",
        "Tách dịch vụ mua sự độc lập vận hành, trả bằng độ phức tạp phân tán."
      ]
    }
  ],
  "137": [
    {
      "fromDay": 132,
      "fromTitle": "Lỗ hổng trong thư viện: mã bạn không viết vẫn là mã của bạn",
      "text": "Cửa sổ nguy hiểm nhất bắt đầu ngay khi lỗ hổng được công bố.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    },
    {
      "fromDay": 125,
      "fromTitle": "Phân quyền: theo vai trò là chưa đủ",
      "text": "Vai trò trả lời loại thao tác; quan hệ trả lời với dữ liệu nào.",
      "distractors": [
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt.",
        "Tách dịch vụ mua sự độc lập vận hành, trả bằng độ phức tạp phân tán."
      ]
    }
  ],
  "138": [
    {
      "fromDay": 133,
      "fromTitle": "Lạm dụng: dùng đúng chức năng nhưng sai mục đích",
      "text": "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
      "distractors": [
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi.",
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt."
      ]
    },
    {
      "fromDay": 126,
      "fromTitle": "Mã hoá dữ liệu nằm yên: bảo vệ trước ai",
      "text": "Mã hoá toàn ổ chỉ bảo vệ khi ổ ở trạng thái tắt và rời khỏi tầm kiểm soát.",
      "distractors": [
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt.",
        "Mã hoá theo ngữ cảnh lúc hiển thị, không lọc lúc nhận vào."
      ]
    }
  ],
  "139": [
    {
      "fromDay": 134,
      "fromTitle": "Nhật ký truy vết: ai đã làm gì, lúc nào",
      "text": "Tính chất quyết định: người thực hiện KHÔNG sửa được bản ghi về hành động của mình.",
      "distractors": [
        "Phần mở rộng và loại nội dung khai báo đều do người gửi đặt nên không tin được.",
        "Nguyên nhân luôn là dữ liệu và câu lệnh bị trộn vào một chuỗi."
      ]
    },
    {
      "fromDay": 127,
      "fromTitle": "Quản lý khoá: chỗ mọi lớp mã hoá quy về",
      "text": "Khoá phải nằm ở nơi chịu kịch bản xâm nhập khác với dữ liệu.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt."
      ]
    }
  ],
  "140": [
    {
      "fromDay": 135,
      "fromTitle": "Quyền tối thiểu: mỗi phần chỉ được đúng thứ nó cần",
      "text": "Quyền tối thiểu không giảm xác suất sự cố; nó giới hạn phạm vi hậu quả.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    },
    {
      "fromDay": 128,
      "fromTitle": "Tiêm lệnh: dữ liệu bị đọc thành câu lệnh",
      "text": "Nguyên nhân luôn là dữ liệu và câu lệnh bị trộn vào một chuỗi.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    }
  ],
  "141": [
    {
      "fromDay": 136,
      "fromTitle": "Nhiều lớp: giả định mỗi lớp đều sẽ hỏng",
      "text": "Giả định mỗi lớp đều có xác suất hỏng, rồi thiết kế cho tình huống đó.",
      "distractors": [
        "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua.",
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác."
      ]
    },
    {
      "fromDay": 129,
      "fromTitle": "Kịch bản chèn vào trang: nạn nhân là người dùng của bạn",
      "text": "Mã hoá theo ngữ cảnh lúc hiển thị, không lọc lúc nhận vào.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    }
  ],
  "142": [
    {
      "fromDay": 137,
      "fromTitle": "Nhận báo cáo lỗ hổng: đường liên lạc bạn nên có sẵn",
      "text": "Rào cản lớn nhất là không biết gửi cho ai và sợ bị quy kết.",
      "distractors": [
        "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua.",
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác."
      ]
    },
    {
      "fromDay": 130,
      "fromTitle": "Giả mạo yêu cầu: mượn phiên đăng nhập của nạn nhân",
      "text": "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    }
  ],
  "143": [
    {
      "fromDay": 138,
      "fromTitle": "Sự cố bảo mật: khác sự cố vận hành ở ba điểm",
      "text": "Trạng thái hiện tại là bằng chứng; giữ lại trước khi can thiệp.",
      "distractors": [
        "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua.",
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác."
      ]
    },
    {
      "fromDay": 131,
      "fromTitle": "Tải tệp lên: nhận một tệp là nhận một rủi ro",
      "text": "Phần mở rộng và loại nội dung khai báo đều do người gửi đặt nên không tin được.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    }
  ],
  "144": [
    {
      "fromDay": 139,
      "fromTitle": "Quyền riêng tư: nghĩa vụ đi kèm mỗi trường dữ liệu",
      "text": "Riêng tư hỏi có nên giữ; bảo mật hỏi ai chạm được vào thứ đã giữ.",
      "distractors": [
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc.",
        "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua."
      ]
    },
    {
      "fromDay": 132,
      "fromTitle": "Lỗ hổng trong thư viện: mã bạn không viết vẫn là mã của bạn",
      "text": "Cửa sổ nguy hiểm nhất bắt đầu ngay khi lỗ hổng được công bố.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    }
  ],
  "145": [
    {
      "fromDay": 140,
      "fromTitle": "Ôn tập: bảo mật là chuỗi quyết định, không phải danh sách việc",
      "text": "Bắt đầu từ tài sản và kẻ tấn công, không từ danh sách biện pháp.",
      "distractors": [
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục.",
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc."
      ]
    },
    {
      "fromDay": 133,
      "fromTitle": "Lạm dụng: dùng đúng chức năng nhưng sai mục đích",
      "text": "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
      "distractors": [
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi.",
        "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt."
      ]
    }
  ],
  "146": [
    {
      "fromDay": 141,
      "fromTitle": "Hiệu năng: đo trước, đoán sau",
      "text": "Trực giác về chỗ chậm sai thường xuyên, kể cả với người viết chính đoạn mã đó.",
      "distractors": [
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục.",
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc."
      ]
    },
    {
      "fromDay": 134,
      "fromTitle": "Nhật ký truy vết: ai đã làm gì, lúc nào",
      "text": "Tính chất quyết định: người thực hiện KHÔNG sửa được bản ghi về hành động của mình.",
      "distractors": [
        "Phần mở rộng và loại nội dung khai báo đều do người gửi đặt nên không tin được.",
        "Nguyên nhân luôn là dữ liệu và câu lệnh bị trộn vào một chuỗi."
      ]
    }
  ],
  "147": [
    {
      "fromDay": 142,
      "fromTitle": "Đo con số nào: thứ người dùng cảm nhận",
      "text": "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua.",
      "distractors": [
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục.",
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc."
      ]
    },
    {
      "fromDay": 135,
      "fromTitle": "Quyền tối thiểu: mỗi phần chỉ được đúng thứ nó cần",
      "text": "Quyền tối thiểu không giảm xác suất sự cố; nó giới hạn phạm vi hậu quả.",
      "distractors": [
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
        "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi."
      ]
    }
  ],
  "148": [
    {
      "fromDay": 143,
      "fromTitle": "Hồ sơ hiệu năng: thời gian đi đâu bên trong một thao tác",
      "text": "Đọc cả tỷ trọng lẫn số lần gọi, vì hai chẩn đoán khác nhau tuỳ tổ hợp.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    },
    {
      "fromDay": 136,
      "fromTitle": "Nhiều lớp: giả định mỗi lớp đều sẽ hỏng",
      "text": "Giả định mỗi lớp đều có xác suất hỏng, rồi thiết kế cho tình huống đó.",
      "distractors": [
        "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua.",
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác."
      ]
    }
  ],
  "149": [
    {
      "fromDay": 144,
      "fromTitle": "Trần của tối ưu: phần bạn không động vào quyết định tất cả",
      "text": "Trần cải thiện bằng đúng tỷ trọng của phần bạn động vào.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    },
    {
      "fromDay": 137,
      "fromTitle": "Nhận báo cáo lỗ hổng: đường liên lạc bạn nên có sẵn",
      "text": "Rào cản lớn nhất là không biết gửi cho ai và sợ bị quy kết.",
      "distractors": [
        "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua.",
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác."
      ]
    }
  ],
  "150": [
    {
      "fromDay": 145,
      "fromTitle": "Chi phí thật: mã nguồn khiến mọi dòng trông như nhau",
      "text": "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    },
    {
      "fromDay": 138,
      "fromTitle": "Sự cố bảo mật: khác sự cố vận hành ở ba điểm",
      "text": "Trạng thái hiện tại là bằng chứng; giữ lại trước khi can thiệp.",
      "distractors": [
        "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua.",
        "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác."
      ]
    }
  ],
  "151": [
    {
      "fromDay": 146,
      "fromTitle": "Bộ nhớ: cấp phát rẻ, dọn dẹp thì không",
      "text": "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc."
      ]
    },
    {
      "fromDay": 139,
      "fromTitle": "Quyền riêng tư: nghĩa vụ đi kèm mỗi trường dữ liệu",
      "text": "Riêng tư hỏi có nên giữ; bảo mật hỏi ai chạm được vào thứ đã giữ.",
      "distractors": [
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc.",
        "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua."
      ]
    }
  ],
  "152": [
    {
      "fromDay": 147,
      "fromTitle": "Dữ liệu nằm cạnh nhau chạy nhanh hơn dữ liệu nằm rải rác",
      "text": "Bộ xử lý đọc theo khối, nên dữ liệu liền kề gần như được đọc miễn phí.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    },
    {
      "fromDay": 140,
      "fromTitle": "Ôn tập: bảo mật là chuỗi quyết định, không phải danh sách việc",
      "text": "Bắt đầu từ tài sản và kẻ tấn công, không từ danh sách biện pháp.",
      "distractors": [
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục.",
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc."
      ]
    }
  ],
  "153": [
    {
      "fromDay": 148,
      "fromTitle": "Kế hoạch thực thi: cơ sở dữ liệu nói nó sẽ làm gì",
      "text": "Kế hoạch thực thi cho biết cơ sở dữ liệu sẽ tìm dữ liệu bằng cách nào.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    },
    {
      "fromDay": 141,
      "fromTitle": "Hiệu năng: đo trước, đoán sau",
      "text": "Trực giác về chỗ chậm sai thường xuyên, kể cả với người viết chính đoạn mã đó.",
      "distractors": [
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục.",
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc."
      ]
    }
  ],
  "154": [
    {
      "fromDay": 149,
      "fromTitle": "Bài toán N cộng một: một trăm truy vấn thay vì một",
      "text": "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    },
    {
      "fromDay": 142,
      "fromTitle": "Đo con số nào: thứ người dùng cảm nhận",
      "text": "Thời gian máy chủ chỉ là một đoạn trong hành trình người dùng trải qua.",
      "distractors": [
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục.",
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc."
      ]
    }
  ],
  "155": [
    {
      "fromDay": 150,
      "fromTitle": "Phân trang: đừng lấy về thứ bạn không hiển thị",
      "text": "Bỏ qua là đếm, không phải nhảy - chi phí tăng theo số trang.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    },
    {
      "fromDay": 143,
      "fromTitle": "Hồ sơ hiệu năng: thời gian đi đâu bên trong một thao tác",
      "text": "Đọc cả tỷ trọng lẫn số lần gọi, vì hai chẩn đoán khác nhau tuỳ tổ hợp.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    }
  ],
  "156": [
    {
      "fromDay": 151,
      "fromTitle": "Xử lý theo lô: trả chi phí cố định một lần",
      "text": "Mọi thao tác đều có phần chi phí cố định; gộp lô chia nó cho cả lô.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    },
    {
      "fromDay": 144,
      "fromTitle": "Trần của tối ưu: phần bạn không động vào quyết định tất cả",
      "text": "Trần cải thiện bằng đúng tỷ trọng của phần bạn động vào.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    }
  ],
  "157": [
    {
      "fromDay": 152,
      "fromTitle": "Song song và đồng thời: hai thứ khác nhau",
      "text": "Đồng thời là cách sắp xếp việc; song song là chạy thật sự cùng lúc.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    },
    {
      "fromDay": 145,
      "fromTitle": "Chi phí thật: mã nguồn khiến mọi dòng trông như nhau",
      "text": "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    }
  ],
  "158": [
    {
      "fromDay": 153,
      "fromTitle": "Tranh chấp: thêm người làm mà việc chậm đi",
      "text": "Thông lượng theo số luồng là đường cong có đỉnh, không phải đường thẳng.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    },
    {
      "fromDay": 146,
      "fromTitle": "Bộ nhớ: cấp phát rẻ, dọn dẹp thì không",
      "text": "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Chi phí các bậc lưu trữ chênh nhau khoảng một nghìn lần mỗi bậc."
      ]
    }
  ],
  "159": [
    {
      "fromDay": 154,
      "fromTitle": "Áp lực ngược: nói không thay vì gục ngã",
      "text": "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí."
      ]
    },
    {
      "fromDay": 147,
      "fromTitle": "Dữ liệu nằm cạnh nhau chạy nhanh hơn dữ liệu nằm rải rác",
      "text": "Bộ xử lý đọc theo khối, nên dữ liệu liền kề gần như được đọc miễn phí.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    }
  ],
  "160": [
    {
      "fromDay": 155,
      "fromTitle": "Kiểm thử tải: tìm giới hạn trước khi người dùng tìm hộ",
      "text": "Dữ liệu thử phải có quy mô và hình dạng giống dữ liệu thật.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    },
    {
      "fromDay": 148,
      "fromTitle": "Kế hoạch thực thi: cơ sở dữ liệu nói nó sẽ làm gì",
      "text": "Kế hoạch thực thi cho biết cơ sở dữ liệu sẽ tìm dữ liệu bằng cách nào.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    }
  ],
  "161": [
    {
      "fromDay": 156,
      "fromTitle": "Phía trình duyệt: một luồng duy nhất phải làm mọi thứ",
      "text": "Luồng chính lo cả chạy mã, nhận thao tác và vẽ màn hình.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí."
      ]
    },
    {
      "fromDay": 149,
      "fromTitle": "Bài toán N cộng một: một trăm truy vấn thay vì một",
      "text": "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Cấp phát rẻ, nhưng chi phí dọn được trả sau và trả một cục."
      ]
    }
  ],
  "162": [
    {
      "fromDay": 157,
      "fromTitle": "Kích thước gói: mã phải tải về, giải nén và phân tích",
      "text": "Chi phí lớn nhất là phân tích và chạy mã, không phải truyền dữ liệu.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí."
      ]
    },
    {
      "fromDay": 150,
      "fromTitle": "Phân trang: đừng lấy về thứ bạn không hiển thị",
      "text": "Bỏ qua là đếm, không phải nhảy - chi phí tăng theo số trang.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    }
  ],
  "163": [
    {
      "fromDay": 158,
      "fromTitle": "Khi nào nên dừng: tối ưu cũng có chi phí",
      "text": "Tính lợi ích bằng thời gian tuyệt đối nhân số lần, không bằng phần trăm.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    },
    {
      "fromDay": 151,
      "fromTitle": "Xử lý theo lô: trả chi phí cố định một lần",
      "text": "Mọi thao tác đều có phần chi phí cố định; gộp lô chia nó cho cả lô.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    }
  ],
  "164": [
    {
      "fromDay": 159,
      "fromTitle": "Tiền cũng là một chỉ số hiệu năng",
      "text": "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    },
    {
      "fromDay": 152,
      "fromTitle": "Song song và đồng thời: hai thứ khác nhau",
      "text": "Đồng thời là cách sắp xếp việc; song song là chạy thật sự cùng lúc.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    }
  ],
  "165": [
    {
      "fromDay": 160,
      "fromTitle": "Tổng ôn: đo, tìm, sửa, dừng",
      "text": "Đo trước, và đo từ phía người dùng chứ không ở ranh giới hệ thống.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    },
    {
      "fromDay": 153,
      "fromTitle": "Tranh chấp: thêm người làm mà việc chậm đi",
      "text": "Thông lượng theo số luồng là đường cong có đỉnh, không phải đường thẳng.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    }
  ],
  "166": [
    {
      "fromDay": 161,
      "fromTitle": "Độ tin cậy đo bằng gì",
      "text": "Tiến trình còn sống và người dùng làm được việc là hai chuyện khác nhau.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    },
    {
      "fromDay": 154,
      "fromTitle": "Áp lực ngược: nói không thay vì gục ngã",
      "text": "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
      "distractors": [
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn.",
        "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí."
      ]
    }
  ],
  "167": [
    {
      "fromDay": 162,
      "fromTitle": "SLI, SLO và SLA - ba thứ hay bị nhầm",
      "text": "SLI là phép đo - thường là tỷ lệ thành công hoặc độ trễ ở một phân vị cụ thể.",
      "distractors": [
        "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí.",
        "Luồng chính lo cả chạy mã, nhận thao tác và vẽ màn hình."
      ]
    },
    {
      "fromDay": 155,
      "fromTitle": "Kiểm thử tải: tìm giới hạn trước khi người dùng tìm hộ",
      "text": "Dữ liệu thử phải có quy mô và hình dạng giống dữ liệu thật.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Chi phí nằm ở số lần đi về, không ở độ nặng của từng truy vấn."
      ]
    }
  ],
  "168": [
    {
      "fromDay": 163,
      "fromTitle": "Ngân sách lỗi",
      "text": "Ngân sách lỗi là lượng lỗi bạn ĐƯỢC PHÉP có, không phải mức cần giữ ở không.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    },
    {
      "fromDay": 156,
      "fromTitle": "Phía trình duyệt: một luồng duy nhất phải làm mọi thứ",
      "text": "Luồng chính lo cả chạy mã, nhận thao tác và vẽ màn hình.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí."
      ]
    }
  ],
  "169": [
    {
      "fromDay": 164,
      "fromTitle": "Bốn chỉ số vàng",
      "text": "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Tiêu chí duy nhất: có ai phải làm gì NGAY không. Không thì đó là mục công việc."
      ]
    },
    {
      "fromDay": 157,
      "fromTitle": "Kích thước gói: mã phải tải về, giải nén và phân tích",
      "text": "Chi phí lớn nhất là phân tích và chạy mã, không phải truyền dữ liệu.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí."
      ]
    }
  ],
  "170": [
    {
      "fromDay": 165,
      "fromTitle": "Cảnh báo cái gì, và không cảnh báo cái gì",
      "text": "Tiêu chí duy nhất: có ai phải làm gì NGAY không. Không thì đó là mục công việc.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    },
    {
      "fromDay": 158,
      "fromTitle": "Khi nào nên dừng: tối ưu cũng có chi phí",
      "text": "Tính lợi ích bằng thời gian tuyệt đối nhân số lần, không bằng phần trăm.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    }
  ],
  "171": [
    {
      "fromDay": 166,
      "fromTitle": "Trong lúc có sự cố - vai trò và thứ tự",
      "text": "Khôi phục TRƯỚC, hiểu SAU - quay lại bản trước không cần biết nguyên nhân.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    },
    {
      "fromDay": 159,
      "fromTitle": "Tiền cũng là một chỉ số hiệu năng",
      "text": "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    }
  ],
  "172": [
    {
      "fromDay": 167,
      "fromTitle": "Biên bản sự cố không đổ lỗi",
      "text": "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
      "distractors": [
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    },
    {
      "fromDay": 160,
      "fromTitle": "Tổng ôn: đo, tìm, sửa, dừng",
      "text": "Đo trước, và đo từ phía người dùng chứ không ở ranh giới hệ thống.",
      "distractors": [
        "Hàng đợi không giới hạn biến quá tải thành độ trễ tăng vô hạn.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    }
  ],
  "173": [
    {
      "fromDay": 168,
      "fromTitle": "Trực - các mô hình và cái giá",
      "text": "Chi phí thật là số lần bị ĐÁNH THỨC, không phải số ngày trực.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    },
    {
      "fromDay": 161,
      "fromTitle": "Độ tin cậy đo bằng gì",
      "text": "Tiến trình còn sống và người dùng làm được việc là hai chuyện khác nhau.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    }
  ],
  "174": [
    {
      "fromDay": 169,
      "fromTitle": "Tự khôi phục và suy giảm nhẹ nhàng",
      "text": "Bốn cơ chế: thử lại có giãn cách, cầu dao, kiểm tra sức khoẻ, tự thay máy hỏng.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    },
    {
      "fromDay": 162,
      "fromTitle": "SLI, SLO và SLA - ba thứ hay bị nhầm",
      "text": "SLI là phép đo - thường là tỷ lệ thành công hoặc độ trễ ở một phân vị cụ thể.",
      "distractors": [
        "Theo dõi chi phí trên mỗi đơn vị công việc, không chỉ tổng chi phí.",
        "Luồng chính lo cả chạy mã, nhận thao tác và vẽ màn hình."
      ]
    }
  ],
  "175": [
    {
      "fromDay": 170,
      "fromTitle": "Chủ động gây lỗi để học",
      "text": "Cùng một lỗi, nhưng bạn chọn thời điểm - đó là toàn bộ ý tưởng.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    },
    {
      "fromDay": 163,
      "fromTitle": "Ngân sách lỗi",
      "text": "Ngân sách lỗi là lượng lỗi bạn ĐƯỢC PHÉP có, không phải mức cần giữ ở không.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    }
  ],
  "176": [
    {
      "fromDay": 171,
      "fromTitle": "Đo thời gian phát hiện và thời gian hồi phục",
      "text": "Đếm số sự cố khuyến khích gộp lại cho đẹp; hai con số thời gian thì đo bằng phân vị.",
      "distractors": [
        "Chi phí thật là số lần bị ĐÁNH THỨC, không phải số ngày trực.",
        "Tiêu chí duy nhất: có ai phải làm gì NGAY không. Không thì đó là mục công việc."
      ]
    },
    {
      "fromDay": 164,
      "fromTitle": "Bốn chỉ số vàng",
      "text": "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Tiêu chí duy nhất: có ai phải làm gì NGAY không. Không thì đó là mục công việc."
      ]
    }
  ],
  "177": [
    {
      "fromDay": 172,
      "fromTitle": "Bốn chỉ số về cách đội làm việc",
      "text": "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau."
      ]
    },
    {
      "fromDay": 165,
      "fromTitle": "Cảnh báo cái gì, và không cảnh báo cái gì",
      "text": "Tiêu chí duy nhất: có ai phải làm gì NGAY không. Không thì đó là mục công việc.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    }
  ],
  "178": [
    {
      "fromDay": 173,
      "fromTitle": "Lỗi lan truyền giữa các dịch vụ",
      "text": "Dịch vụ dưới chậm giữ luồng ở trên lâu hơn, và luồng cạn thì tầng trên chậm theo.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau."
      ]
    },
    {
      "fromDay": 166,
      "fromTitle": "Trong lúc có sự cố - vai trò và thứ tự",
      "text": "Khôi phục TRƯỚC, hiểu SAU - quay lại bản trước không cần biết nguyên nhân.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    }
  ],
  "179": [
    {
      "fromDay": 174,
      "fromTitle": "Kiểm thử tải và kế hoạch dung lượng",
      "text": "Hỏi CÁCH HỎNG trước, con số trần sau - con số lỗi thời sau mỗi lần phát hành.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    },
    {
      "fromDay": 167,
      "fromTitle": "Biên bản sự cố không đổ lỗi",
      "text": "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
      "distractors": [
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói.",
        "Bốn con số: lưu lượng, tỷ lệ lỗi, độ trễ, mức bão hoà."
      ]
    }
  ],
  "180": [
    {
      "fromDay": 175,
      "fromTitle": "Dự phòng - bao nhiêu là đủ",
      "text": "Mỗi lớp dự phòng thêm vào cũng là một thứ nữa có thể hỏng.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    },
    {
      "fromDay": 168,
      "fromTitle": "Trực - các mô hình và cái giá",
      "text": "Chi phí thật là số lần bị ĐÁNH THỨC, không phải số ngày trực.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    }
  ],
  "181": [
    {
      "fromDay": 176,
      "fromTitle": "Phụ thuộc bên ngoài và cam kết của họ",
      "text": "Cam kết của các phụ thuộc NHÂN với nhau, nên trần của bạn thấp hơn cái thấp nhất.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    },
    {
      "fromDay": 169,
      "fromTitle": "Tự khôi phục và suy giảm nhẹ nhàng",
      "text": "Bốn cơ chế: thử lại có giãn cách, cầu dao, kiểm tra sức khoẻ, tự thay máy hỏng.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    }
  ],
  "182": [
    {
      "fromDay": 177,
      "fromTitle": "Thay đổi là nguyên nhân phổ biến nhất",
      "text": "Hệ thống không tự nhiên hỏng - cái vừa đổi là ứng viên số một.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    },
    {
      "fromDay": 170,
      "fromTitle": "Chủ động gây lỗi để học",
      "text": "Cùng một lỗi, nhưng bạn chọn thời điểm - đó là toàn bộ ý tưởng.",
      "distractors": [
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    }
  ],
  "183": [
    {
      "fromDay": 178,
      "fromTitle": "Ba loại tín hiệu - số liệu, nhật ký và dấu vết",
      "text": "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
      "distractors": [
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói.",
        "Bảng xanh mà người dùng kêu: nghi PHÉP ĐO trước, không nghi hệ thống."
      ]
    },
    {
      "fromDay": 171,
      "fromTitle": "Đo thời gian phát hiện và thời gian hồi phục",
      "text": "Đếm số sự cố khuyến khích gộp lại cho đẹp; hai con số thời gian thì đo bằng phân vị.",
      "distractors": [
        "Chi phí thật là số lần bị ĐÁNH THỨC, không phải số ngày trực.",
        "Tiêu chí duy nhất: có ai phải làm gì NGAY không. Không thì đó là mục công việc."
      ]
    }
  ],
  "184": [
    {
      "fromDay": 179,
      "fromTitle": "Một sự cố thật, từ đầu tới cuối",
      "text": "Bảng xanh mà người dùng kêu: nghi PHÉP ĐO trước, không nghi hệ thống.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Call option: quyền mua ở strike price, có lợi khi giá tăng"
      ]
    },
    {
      "fromDay": 172,
      "fromTitle": "Bốn chỉ số về cách đội làm việc",
      "text": "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau."
      ]
    }
  ],
  "185": [
    {
      "fromDay": 180,
      "fromTitle": "Tổng ôn chặng - độ tin cậy và quản trị sự cố",
      "text": "Độ tin cậy là đánh đổi có giá - câu hỏi là mức nào đủ, không phải làm sao cao hơn.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Call option: quyền mua ở strike price, có lợi khi giá tăng"
      ]
    },
    {
      "fromDay": 173,
      "fromTitle": "Lỗi lan truyền giữa các dịch vụ",
      "text": "Dịch vụ dưới chậm giữ luồng ở trên lâu hơn, và luồng cạn thì tầng trên chậm theo.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Không đổ lỗi vì lý do THỰC DỤNG: người ta sẽ kể bớt ở lần sau."
      ]
    }
  ],
  "186": [
    {
      "fromDay": 181,
      "fromTitle": "Vì sao cần xử lý bất đồng bộ",
      "text": "Tiêu chí: người dùng có cần kết quả để đi tiếp không - không phải việc đó tốn bao lâu.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Mỗi lớp dự phòng thêm vào cũng là một thứ nữa có thể hỏng."
      ]
    },
    {
      "fromDay": 174,
      "fromTitle": "Kiểm thử tải và kế hoạch dung lượng",
      "text": "Hỏi CÁCH HỎNG trước, con số trần sau - con số lỗi thời sau mỗi lần phát hành.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    }
  ],
  "187": [
    {
      "fromDay": 182,
      "fromTitle": "Hàng đợi - ba phần và một hợp đồng",
      "text": "Hàng đợi giao tin nhắn nhưng CHƯA xoá; nó chỉ xoá khi nhận được xác nhận.",
      "distractors": [
        "Bảng xanh mà người dùng kêu: nghi PHÉP ĐO trước, không nghi hệ thống.",
        "Cam kết của các phụ thuộc NHÂN với nhau, nên trần của bạn thấp hơn cái thấp nhất."
      ]
    },
    {
      "fromDay": 175,
      "fromTitle": "Dự phòng - bao nhiêu là đủ",
      "text": "Mỗi lớp dự phòng thêm vào cũng là một thứ nữa có thể hỏng.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    }
  ],
  "188": [
    {
      "fromDay": 183,
      "fromTitle": "Hàng đợi so với xuất bản và đăng ký",
      "text": "Hàng đợi: một tin, một người làm. Xuất bản: một sự kiện, nhiều người nghe.",
      "distractors": [
        "Độ tin cậy là đánh đổi có giá - câu hỏi là mức nào đủ, không phải làm sao cao hơn.",
        "Hệ thống không tự nhiên hỏng - cái vừa đổi là ứng viên số một."
      ]
    },
    {
      "fromDay": 176,
      "fromTitle": "Phụ thuộc bên ngoài và cam kết của họ",
      "text": "Cam kết của các phụ thuộc NHÂN với nhau, nên trần của bạn thấp hơn cái thấp nhất.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    }
  ],
  "189": [
    {
      "fromDay": 184,
      "fromTitle": "Bảo đảm giao nhận - ba mức",
      "text": "Ít nhất một lần là mức thực tế: hệ quả trực tiếp của cơ chế xác nhận.",
      "distractors": [
        "Tiêu chí: người dùng có cần kết quả để đi tiếp không - không phải việc đó tốn bao lâu.",
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng."
      ]
    },
    {
      "fromDay": 177,
      "fromTitle": "Thay đổi là nguyên nhân phổ biến nhất",
      "text": "Hệ thống không tự nhiên hỏng - cái vừa đổi là ứng viên số một.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói."
      ]
    }
  ],
  "190": [
    {
      "fromDay": 185,
      "fromTitle": "Thứ tự tin nhắn",
      "text": "Thứ tự và xử lý song song xung khắc - hai người tiêu thụ hoàn thành theo thứ tự bất kỳ.",
      "distractors": [
        "Hàng đợi giao tin nhắn nhưng CHƯA xoá; nó chỉ xoá khi nhận được xác nhận.",
        "Bảng xanh mà người dùng kêu: nghi PHÉP ĐO trước, không nghi hệ thống."
      ]
    },
    {
      "fromDay": 178,
      "fromTitle": "Ba loại tín hiệu - số liệu, nhật ký và dấu vết",
      "text": "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
      "distractors": [
        "Hai nhóm - tốc độ và ổn định - KHÔNG đánh đổi nhau như trực giác nói.",
        "Bảng xanh mà người dùng kêu: nghi PHÉP ĐO trước, không nghi hệ thống."
      ]
    }
  ],
  "191": [
    {
      "fromDay": 186,
      "fromTitle": "Người tiêu thụ chậm và tồn đọng",
      "text": "Nhìn XU HƯỚNG, không nhìn số lượng - cùng con số, hai tình huống khác hẳn.",
      "distractors": [
        "Hàng đợi: một tin, một người làm. Xuất bản: một sự kiện, nhiều người nghe.",
        "Độ tin cậy là đánh đổi có giá - câu hỏi là mức nào đủ, không phải làm sao cao hơn."
      ]
    },
    {
      "fromDay": 179,
      "fromTitle": "Một sự cố thật, từ đầu tới cuối",
      "text": "Bảng xanh mà người dùng kêu: nghi PHÉP ĐO trước, không nghi hệ thống.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Call option: quyền mua ở strike price, có lợi khi giá tăng"
      ]
    }
  ],
  "192": [
    {
      "fromDay": 187,
      "fromTitle": "Hàng đợi thư chết",
      "text": "Xác nhận không phân biệt lỗi tạm thời với lỗi vĩnh viễn - cần cơ chế đếm và bỏ cuộc.",
      "distractors": [
        "Ít nhất một lần là mức thực tế: hệ quả trực tiếp của cơ chế xác nhận.",
        "Tiêu chí: người dùng có cần kết quả để đi tiếp không - không phải việc đó tốn bao lâu."
      ]
    },
    {
      "fromDay": 180,
      "fromTitle": "Tổng ôn chặng - độ tin cậy và quản trị sự cố",
      "text": "Độ tin cậy là đánh đổi có giá - câu hỏi là mức nào đủ, không phải làm sao cao hơn.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Call option: quyền mua ở strike price, có lợi khi giá tăng"
      ]
    }
  ],
  "193": [
    {
      "fromDay": 188,
      "fromTitle": "Sự kiện chứa dữ liệu hay chỉ chứa tham chiếu",
      "text": "Mặc định: chứa dữ liệu của THỜI ĐIỂM sự kiện xảy ra, không chỉ mã định danh.",
      "distractors": [
        "Thứ tự và xử lý song song xung khắc - hai người tiêu thụ hoàn thành theo thứ tự bất kỳ.",
        "Hàng đợi giao tin nhắn nhưng CHƯA xoá; nó chỉ xoá khi nhận được xác nhận."
      ]
    },
    {
      "fromDay": 181,
      "fromTitle": "Vì sao cần xử lý bất đồng bộ",
      "text": "Tiêu chí: người dùng có cần kết quả để đi tiếp không - không phải việc đó tốn bao lâu.",
      "distractors": [
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng.",
        "Mỗi lớp dự phòng thêm vào cũng là một thứ nữa có thể hỏng."
      ]
    }
  ],
  "194": [
    {
      "fromDay": 189,
      "fromTitle": "Gọi trực tiếp hay qua hàng đợi",
      "text": "Cần kết quả để đi tiếp → gọi trực tiếp, bất kể hệ thống lớn tới đâu.",
      "distractors": [
        "Nhìn XU HƯỚNG, không nhìn số lượng - cùng con số, hai tình huống khác hẳn.",
        "Hàng đợi: một tin, một người làm. Xuất bản: một sự kiện, nhiều người nghe."
      ]
    },
    {
      "fromDay": 182,
      "fromTitle": "Hàng đợi - ba phần và một hợp đồng",
      "text": "Hàng đợi giao tin nhắn nhưng CHƯA xoá; nó chỉ xoá khi nhận được xác nhận.",
      "distractors": [
        "Bảng xanh mà người dùng kêu: nghi PHÉP ĐO trước, không nghi hệ thống.",
        "Cam kết của các phụ thuộc NHÂN với nhau, nên trần của bạn thấp hơn cái thấp nhất."
      ]
    }
  ],
  "195": [
    {
      "fromDay": 190,
      "fromTitle": "Theo dõi một hệ thống bất đồng bộ",
      "text": "Mã định danh phải đi qua CẢ hàng đợi - đó là chỗ luồng đứt và khó nối nhất.",
      "distractors": [
        "Xác nhận không phân biệt lỗi tạm thời với lỗi vĩnh viễn - cần cơ chế đếm và bỏ cuộc.",
        "Ít nhất một lần là mức thực tế: hệ quả trực tiếp của cơ chế xác nhận."
      ]
    },
    {
      "fromDay": 183,
      "fromTitle": "Hàng đợi so với xuất bản và đăng ký",
      "text": "Hàng đợi: một tin, một người làm. Xuất bản: một sự kiện, nhiều người nghe.",
      "distractors": [
        "Độ tin cậy là đánh đổi có giá - câu hỏi là mức nào đủ, không phải làm sao cao hơn.",
        "Hệ thống không tự nhiên hỏng - cái vừa đổi là ứng viên số một."
      ]
    }
  ],
  "196": [
    {
      "fromDay": 191,
      "fromTitle": "Bất biến khi lặp lại - điều kiện bắt buộc",
      "text": "Đặt thành giá trị thì bất biến; cộng thêm, gửi thư, ghi thêm dòng thì không.",
      "distractors": [
        "Mặc định: chứa dữ liệu của THỜI ĐIỂM sự kiện xảy ra, không chỉ mã định danh.",
        "Thứ tự và xử lý song song xung khắc - hai người tiêu thụ hoàn thành theo thứ tự bất kỳ."
      ]
    },
    {
      "fromDay": 184,
      "fromTitle": "Bảo đảm giao nhận - ba mức",
      "text": "Ít nhất một lần là mức thực tế: hệ quả trực tiếp của cơ chế xác nhận.",
      "distractors": [
        "Tiêu chí: người dùng có cần kết quả để đi tiếp không - không phải việc đó tốn bao lâu.",
        "Số liệu: có chuyện gì không - rẻ vì đã tổng hợp, giữ được nhiều tháng."
      ]
    }
  ],
  "197": [
    {
      "fromDay": 192,
      "fromTitle": "Khoá chống trùng",
      "text": "BÊN GỌI sinh khoá, và giữ nguyên qua mọi lần thử lại của cùng một ý định.",
      "distractors": [
        "Cần kết quả để đi tiếp → gọi trực tiếp, bất kể hệ thống lớn tới đâu.",
        "Nhìn XU HƯỚNG, không nhìn số lượng - cùng con số, hai tình huống khác hẳn."
      ]
    },
    {
      "fromDay": 185,
      "fromTitle": "Thứ tự tin nhắn",
      "text": "Thứ tự và xử lý song song xung khắc - hai người tiêu thụ hoàn thành theo thứ tự bất kỳ.",
      "distractors": [
        "Hàng đợi giao tin nhắn nhưng CHƯA xoá; nó chỉ xoá khi nhận được xác nhận.",
        "Bảng xanh mà người dùng kêu: nghi PHÉP ĐO trước, không nghi hệ thống."
      ]
    }
  ],
  "198": [
    {
      "fromDay": 193,
      "fromTitle": "Mẫu hộp thư đi",
      "text": "Ghi dữ liệu rồi gửi tin nhắn là hai thao tác, và khe hở giữa chúng không ai phát hiện.",
      "distractors": [
        "Mã định danh phải đi qua CẢ hàng đợi - đó là chỗ luồng đứt và khó nối nhất.",
        "Xác nhận không phân biệt lỗi tạm thời với lỗi vĩnh viễn - cần cơ chế đếm và bỏ cuộc."
      ]
    },
    {
      "fromDay": 186,
      "fromTitle": "Người tiêu thụ chậm và tồn đọng",
      "text": "Nhìn XU HƯỚNG, không nhìn số lượng - cùng con số, hai tình huống khác hẳn.",
      "distractors": [
        "Hàng đợi: một tin, một người làm. Xuất bản: một sự kiện, nhiều người nghe.",
        "Độ tin cậy là đánh đổi có giá - câu hỏi là mức nào đủ, không phải làm sao cao hơn."
      ]
    }
  ],
  "199": [
    {
      "fromDay": 194,
      "fromTitle": "Bù trừ lỗi thay vì giao dịch phân tán",
      "text": "Không có giao dịch nào bao được nhiều dịch vụ độc lập - không quay lại được.",
      "distractors": [
        "Đặt thành giá trị thì bất biến; cộng thêm, gửi thư, ghi thêm dòng thì không.",
        "Mặc định: chứa dữ liệu của THỜI ĐIỂM sự kiện xảy ra, không chỉ mã định danh."
      ]
    },
    {
      "fromDay": 187,
      "fromTitle": "Hàng đợi thư chết",
      "text": "Xác nhận không phân biệt lỗi tạm thời với lỗi vĩnh viễn - cần cơ chế đếm và bỏ cuộc.",
      "distractors": [
        "Ít nhất một lần là mức thực tế: hệ quả trực tiếp của cơ chế xác nhận.",
        "Tiêu chí: người dùng có cần kết quả để đi tiếp không - không phải việc đó tốn bao lâu."
      ]
    }
  ],
  "200": [
    {
      "fromDay": 195,
      "fromTitle": "Chạy lại và phát lại",
      "text": "Rủi ro lớn nhất là hiệu ứng phụ chạy lại - chúng đi ra ngoài và không thu hồi được.",
      "distractors": [
        "BÊN GỌI sinh khoá, và giữ nguyên qua mọi lần thử lại của cùng một ý định.",
        "Cần kết quả để đi tiếp → gọi trực tiếp, bất kể hệ thống lớn tới đâu."
      ]
    },
    {
      "fromDay": 188,
      "fromTitle": "Sự kiện chứa dữ liệu hay chỉ chứa tham chiếu",
      "text": "Mặc định: chứa dữ liệu của THỜI ĐIỂM sự kiện xảy ra, không chỉ mã định danh.",
      "distractors": [
        "Thứ tự và xử lý song song xung khắc - hai người tiêu thụ hoàn thành theo thứ tự bất kỳ.",
        "Hàng đợi giao tin nhắn nhưng CHƯA xoá; nó chỉ xoá khi nhận được xác nhận."
      ]
    }
  ],
  "201": [
    {
      "fromDay": 19,
      "fromTitle": "Kiểm thử - chứng minh mã làm đúng",
      "text": "Bộ kiểm thử xanh chỉ chứng minh các trường hợp đã viết ra là đúng, không hơn.",
      "distractors": [
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    },
    {
      "fromDay": 12,
      "fromTitle": "Tham số, giá trị trả về và phạm vi",
      "text": "Dữ liệu đơn được sao chép khi truyền vào hàm; dữ liệu phức hợp truyền chỗ trỏ.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào."
      ]
    }
  ],
  "202": [
    {
      "fromDay": 20,
      "fromTitle": "Tổng ôn chặng lập trình",
      "text": "Bốn nhóm: giữ dữ liệu, điều khiển luồng, xử lý khi hỏng, viết cho người khác đọc.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    },
    {
      "fromDay": 13,
      "fromTitle": "Chương trình trong bộ nhớ",
      "text": "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
      "distractors": [
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
        "Chỉ số là độ dời từ đầu, nên bắt đầu từ 0 và phần tử cuối ở vị trí n trừ một."
      ]
    }
  ],
  "203": [
    {
      "fromDay": 14,
      "fromTitle": "Lỗi và ngoại lệ",
      "text": "Bắt lỗi rồi không làm gì là cách tệ nhất - tệ hơn cả để chương trình dừng hẳn.",
      "distractors": [
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte."
      ]
    }
  ],
  "204": [
    {
      "fromDay": 15,
      "fromTitle": "Gỡ lỗi có phương pháp",
      "text": "Bước đầu tiên luôn là tái hiện lỗi ổn định - không có nó thì không biết đã sửa xong chưa.",
      "distractors": [
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte."
      ]
    }
  ],
  "205": [
    {
      "fromDay": 16,
      "fromTitle": "Mô-đun và thư viện",
      "text": "Mô-đun là tệp công khai phần cần dùng và giữ phần còn lại cho riêng mình.",
      "distractors": [
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte."
      ]
    }
  ],
  "206": [
    {
      "fromDay": 201,
      "fromTitle": "Web hoạt động thế nào",
      "text": "Trình duyệt tải HTML trước, rồi mới biết cần tải thêm CSS, ảnh, phông chữ.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    },
    {
      "fromDay": 17,
      "fromTitle": "Đọc tài liệu và thông báo lỗi",
      "text": "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả.",
      "distractors": [
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
        "Bước đầu tiên luôn là tái hiện lỗi ổn định - không có nó thì không biết đã sửa xong chưa."
      ]
    }
  ],
  "207": [
    {
      "fromDay": 202,
      "fromTitle": "HTML - cấu trúc của một trang",
      "text": "HTML mô tả nội dung LÀ gì, không mô tả nó TRÔNG thế nào.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    },
    {
      "fromDay": 18,
      "fromTitle": "Viết mã người khác đọc được",
      "text": "Mã được đọc nhiều lần hơn số lần được viết, nên tối ưu cho người đọc gần như luôn đúng.",
      "distractors": [
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    }
  ],
  "208": [
    {
      "fromDay": 203,
      "fromTitle": "Thẻ ngữ nghĩa và cây tài liệu",
      "text": "Thẻ ngữ nghĩa không đổi giao diện - đó là lý do chúng dễ bị bỏ qua.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    },
    {
      "fromDay": 19,
      "fromTitle": "Kiểm thử - chứng minh mã làm đúng",
      "text": "Bộ kiểm thử xanh chỉ chứng minh các trường hợp đã viết ra là đúng, không hơn.",
      "distractors": [
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    }
  ],
  "209": [
    {
      "fromDay": 204,
      "fromTitle": "Liên kết, ảnh và biểu mẫu",
      "text": "Chữ trong liên kết phải tự đủ nghĩa khi đọc tách khỏi câu văn quanh nó.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    },
    {
      "fromDay": 20,
      "fromTitle": "Tổng ôn chặng lập trình",
      "text": "Bốn nhóm: giữ dữ liệu, điều khiển luồng, xử lý khi hỏng, viết cho người khác đọc.",
      "distractors": [
        "Kiểu tham chiếu lưu địa chỉ; phép gán sao chép địa chỉ chứ không sao chép dữ liệu.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    }
  ],
  "210": [
    {
      "fromDay": 205,
      "fromTitle": "CSS - chọn phần tử và đặt kiểu",
      "text": "Độ cụ thể quyết định trước, thứ tự chỉ quyết định khi độ cụ thể bằng nhau.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "211": [
    {
      "fromDay": 206,
      "fromTitle": "Mô hình hộp - lề, viền và đệm",
      "text": "Mặc định, chiều rộng chỉ tính nội dung - đệm và viền cộng thêm ra ngoài.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc"
      ]
    }
  ],
  "212": [
    {
      "fromDay": 16,
      "fromTitle": "Mô-đun và thư viện",
      "text": "Mô-đun là tệp công khai phần cần dùng và giữ phần còn lại cho riêng mình.",
      "distractors": [
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte."
      ]
    },
    {
      "fromDay": 9,
      "fromTitle": "Từ điển - tra bằng tên thay vì bằng vị trí",
      "text": "Từ điển gồm các cặp khoá và giá trị; khoá là duy nhất trong một từ điển.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một."
      ]
    }
  ],
  "213": [
    {
      "fromDay": 17,
      "fromTitle": "Đọc tài liệu và thông báo lỗi",
      "text": "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả.",
      "distractors": [
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
        "Bước đầu tiên luôn là tái hiện lỗi ổn định - không có nó thì không biết đã sửa xong chưa."
      ]
    },
    {
      "fromDay": 10,
      "fromTitle": "Ghép lại thành chương trình chạy được",
      "text": "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Ký tự được lưu bằng số theo bảng mã; chữ có dấu chiếm nhiều byte hơn một."
      ]
    }
  ],
  "214": [
    {
      "fromDay": 18,
      "fromTitle": "Viết mã người khác đọc được",
      "text": "Mã được đọc nhiều lần hơn số lần được viết, nên tối ưu cho người đọc gần như luôn đúng.",
      "distractors": [
        "Ngăn xếp giữ khung của từng lượt gọi hàm; nhanh nhưng nhỏ, thường vài megabyte.",
        "Đọc dòng cuối của thông báo lỗi trước - đó là loại lỗi và mô tả."
      ]
    },
    {
      "fromDay": 11,
      "fromTitle": "Hàm - đóng gói một việc",
      "text": "Chép mã bốn chỗ nghĩa là phải giữ bốn bản đồng bộ bằng trí nhớ - trí nhớ luôn thua.",
      "distractors": [
        "Đúng một nhánh được chạy - không bao giờ cả hai, không bao giờ không nhánh nào.",
        "Bắt đầu bằng cách viết ra dữ liệu vào là gì và kết quả ra trông thế nào."
      ]
    }
  ],
  "215": [
    {
      "fromDay": 207,
      "fromTitle": "Bố cục với Flexbox",
      "text": "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Lưới định nghĩa cột một lần ở vùng chứa, nên mọi hàng tự thẳng cột nhau."
      ]
    },
    {
      "fromDay": 214,
      "fromTitle": "Công cụ dành cho nhà phát triển",
      "text": "Thẻ phần tử trả lời trực tiếp quy tắc nào đang áp dụng và cái nào đã thua.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    }
  ],
  "216": [
    {
      "fromDay": 208,
      "fromTitle": "Bố cục với lưới CSS",
      "text": "Lưới định nghĩa cột một lần ở vùng chứa, nên mọi hàng tự thẳng cột nhau.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    },
    {
      "fromDay": 201,
      "fromTitle": "Web hoạt động thế nào",
      "text": "Trình duyệt tải HTML trước, rồi mới biết cần tải thêm CSS, ảnh, phông chữ.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "217": [
    {
      "fromDay": 209,
      "fromTitle": "Màu, phông chữ và hệ thống thiết kế",
      "text": "Cảm giác lộn xộn đến từ thiếu nhất quán, không từ lựa chọn xấu.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    },
    {
      "fromDay": 202,
      "fromTitle": "HTML - cấu trúc của một trang",
      "text": "HTML mô tả nội dung LÀ gì, không mô tả nó TRÔNG thế nào.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "218": [
    {
      "fromDay": 210,
      "fromTitle": "Đơn vị đo trong CSS",
      "text": "Cỡ chữ bằng pixel không nghe cài đặt của người dùng - đây là lỗi khả năng truy cập.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    },
    {
      "fromDay": 203,
      "fromTitle": "Thẻ ngữ nghĩa và cây tài liệu",
      "text": "Thẻ ngữ nghĩa không đổi giao diện - đó là lý do chúng dễ bị bỏ qua.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "219": [
    {
      "fromDay": 211,
      "fromTitle": "Dựng một trang tĩnh hoàn chỉnh",
      "text": "Viết trọn HTML có nghĩa trước, rồi mới đụng tới CSS.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    },
    {
      "fromDay": 204,
      "fromTitle": "Liên kết, ảnh và biểu mẫu",
      "text": "Chữ trong liên kết phải tự đủ nghĩa khi đọc tách khỏi câu văn quanh nó.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "220": [
    {
      "fromDay": 215,
      "fromTitle": "Khả năng truy cập cơ bản",
      "text": "Đừng xoá viền tiêu điểm - nếu thấy xấu thì thay bằng kiểu khác.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    },
    {
      "fromDay": 205,
      "fromTitle": "CSS - chọn phần tử và đặt kiểu",
      "text": "Độ cụ thể quyết định trước, thứ tự chỉ quyết định khi độ cụ thể bằng nhau.",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "221": [
    {
      "fromDay": 216,
      "fromTitle": "Một trang cho mọi kích thước màn hình",
      "text": "Thẻ khung nhìn là một dòng bắt buộc; thiếu nó thì mọi ngưỡng màn hình vô tác dụng.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết."
      ]
    },
    {
      "fromDay": 206,
      "fromTitle": "Mô hình hộp - lề, viền và đệm",
      "text": "Mặc định, chiều rộng chỉ tính nội dung - đệm và viền cộng thêm ra ngoài.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc"
      ]
    }
  ],
  "222": [
    {
      "fromDay": 217,
      "fromTitle": "Tốc độ tải trang",
      "text": "Đo trước rồi hãy tối ưu - trực giác về hiệu năng gần như luôn sai.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết."
      ]
    },
    {
      "fromDay": 207,
      "fromTitle": "Bố cục với Flexbox",
      "text": "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Lưới định nghĩa cột một lần ở vùng chứa, nên mọi hàng tự thẳng cột nhau."
      ]
    }
  ],
  "223": [
    {
      "fromDay": 218,
      "fromTitle": "Biểu mẫu dùng được",
      "text": "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết."
      ]
    },
    {
      "fromDay": 208,
      "fromTitle": "Bố cục với lưới CSS",
      "text": "Lưới định nghĩa cột một lần ở vùng chứa, nên mọi hàng tự thẳng cột nhau.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "224": [
    {
      "fromDay": 219,
      "fromTitle": "Đưa trang lên mạng",
      "text": "Trang tĩnh gửi tệp có sẵn; rẻ, nhanh, khó hỏng và đủ cho phần lớn trang cá nhân.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    },
    {
      "fromDay": 209,
      "fromTitle": "Màu, phông chữ và hệ thống thiết kế",
      "text": "Cảm giác lộn xộn đến từ thiếu nhất quán, không từ lựa chọn xấu.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "225": [
    {
      "fromDay": 220,
      "fromTitle": "Tổng ôn chặng web",
      "text": "Sợi chỉ xuyên suốt: tách nội dung khỏi hình thức, và tôn trọng lựa chọn người dùng.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    },
    {
      "fromDay": 210,
      "fromTitle": "Đơn vị đo trong CSS",
      "text": "Cỡ chữ bằng pixel không nghe cài đặt của người dùng - đây là lỗi khả năng truy cập.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "226": [
    {
      "fromDay": 221,
      "fromTitle": "JavaScript chạy ở đâu và chạy thế nào",
      "text": "JavaScript là ngôn ngữ; những gì làm được thì do môi trường quyết định.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    },
    {
      "fromDay": 211,
      "fromTitle": "Dựng một trang tĩnh hoàn chỉnh",
      "text": "Viết trọn HTML có nghĩa trước, rồi mới đụng tới CSS.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Flexbox xếp theo một chiều: chiều chính là chiều xếp, chiều phụ vuông góc."
      ]
    }
  ],
  "227": [
    {
      "fromDay": 222,
      "fromTitle": "Biến, kiểu và ép kiểu ngầm định",
      "text": "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
      "distractors": [
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại.",
        "JSON là văn bản; đối tượng là cấu trúc trong bộ nhớ - phải phân tích qua lại."
      ]
    },
    {
      "fromDay": 215,
      "fromTitle": "Khả năng truy cập cơ bản",
      "text": "Đừng xoá viền tiêu điểm - nếu thấy xấu thì thay bằng kiểu khác.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    }
  ],
  "228": [
    {
      "fromDay": 223,
      "fromTitle": "Hàm trong JavaScript",
      "text": "Hàm là giá trị hạng nhất: gán, truyền, trả về, cất vào mảng đều được.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    },
    {
      "fromDay": 216,
      "fromTitle": "Một trang cho mọi kích thước màn hình",
      "text": "Thẻ khung nhìn là một dòng bắt buộc; thiếu nó thì mọi ngưỡng màn hình vô tác dụng.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết."
      ]
    }
  ],
  "229": [
    {
      "fromDay": 224,
      "fromTitle": "Mảng và các phương thức duyệt",
      "text": "Lọc, ánh xạ, gom trả mảng mới - phải hứng kết quả, mảng gốc không đổi.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    },
    {
      "fromDay": 217,
      "fromTitle": "Tốc độ tải trang",
      "text": "Đo trước rồi hãy tối ưu - trực giác về hiệu năng gần như luôn sai.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết."
      ]
    }
  ],
  "230": [
    {
      "fromDay": 225,
      "fromTitle": "Đối tượng và JSON",
      "text": "JSON là văn bản; đối tượng là cấu trúc trong bộ nhớ - phải phân tích qua lại.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    },
    {
      "fromDay": 218,
      "fromTitle": "Biểu mẫu dùng được",
      "text": "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại.",
      "distractors": [
        "Cuộn ngang luôn do một phần tử cụ thể - hãy tìm nó, đừng ẩn thanh cuộn đi.",
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết."
      ]
    }
  ],
  "231": [
    {
      "fromDay": 226,
      "fromTitle": "Phạm vi, closure và ngữ cảnh",
      "text": "Phạm vi quyết định lúc viết; ngữ cảnh của hàm thông thường quyết định lúc gọi.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    },
    {
      "fromDay": 219,
      "fromTitle": "Đưa trang lên mạng",
      "text": "Trang tĩnh gửi tệp có sẵn; rẻ, nhanh, khó hỏng và đủ cho phần lớn trang cá nhân.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    }
  ],
  "232": [
    {
      "fromDay": 227,
      "fromTitle": "Những cái bẫy của JavaScript",
      "text": "Sắp xếp mặc định so sánh dạng chuỗi - luôn truyền hàm so sánh khi sắp xếp số.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật."
      ]
    },
    {
      "fromDay": 220,
      "fromTitle": "Tổng ôn chặng web",
      "text": "Sợi chỉ xuyên suốt: tách nội dung khỏi hình thức, và tôn trọng lựa chọn người dùng.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    }
  ],
  "233": [
    {
      "fromDay": 228,
      "fromTitle": "Lỗi và ngoại lệ trong JavaScript",
      "text": "Lỗi trong trình duyệt im lặng với người dùng - họ chỉ thấy chức năng không hoạt động.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật."
      ]
    },
    {
      "fromDay": 221,
      "fromTitle": "JavaScript chạy ở đâu và chạy thế nào",
      "text": "JavaScript là ngôn ngữ; những gì làm được thì do môi trường quyết định.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    }
  ],
  "234": [
    {
      "fromDay": 229,
      "fromTitle": "Vì sao trình duyệt không đứng chờ",
      "text": "Một luồng chạy mã, nhưng việc mất thời gian do trình duyệt lo ở bên ngoài.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    },
    {
      "fromDay": 222,
      "fromTitle": "Biến, kiểu và ép kiểu ngầm định",
      "text": "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
      "distractors": [
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại.",
        "JSON là văn bản; đối tượng là cấu trúc trong bộ nhớ - phải phân tích qua lại."
      ]
    }
  ],
  "235": [
    {
      "fromDay": 230,
      "fromTitle": "Promise và cú pháp chờ",
      "text": "Promise có ba trạng thái và chuyển đúng một lần rồi cố định vĩnh viễn.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    },
    {
      "fromDay": 223,
      "fromTitle": "Hàm trong JavaScript",
      "text": "Hàm là giá trị hạng nhất: gán, truyền, trả về, cất vào mảng đều được.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    }
  ],
  "236": [
    {
      "fromDay": 231,
      "fromTitle": "Cây tài liệu - tìm và đọc phần tử",
      "text": "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JSON là văn bản; đối tượng là cấu trúc trong bộ nhớ - phải phân tích qua lại."
      ]
    },
    {
      "fromDay": 224,
      "fromTitle": "Mảng và các phương thức duyệt",
      "text": "Lọc, ánh xạ, gom trả mảng mới - phải hứng kết quả, mảng gốc không đổi.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Hỏi ít nhất có thể - mỗi trường là một lý do để ai đó dừng lại."
      ]
    }
  ],
  "237": [
    {
      "fromDay": 232,
      "fromTitle": "Sự kiện và cách chúng lan truyền",
      "text": "Sự kiện nổi từ phần tử đích lên từng tầng cha, và mọi hàm trên đường đều chạy.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    },
    {
      "fromDay": 225,
      "fromTitle": "Đối tượng và JSON",
      "text": "JSON là văn bản; đối tượng là cấu trúc trong bộ nhớ - phải phân tích qua lại.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    }
  ],
  "238": [
    {
      "fromDay": 233,
      "fromTitle": "Biểu mẫu và dữ liệu người dùng",
      "text": "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
      "distractors": [
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ.",
        "Kiểm tra tĩnh bắt lối viết dễ lỗi kể cả ở nhánh mã chưa ai chạy tới."
      ]
    },
    {
      "fromDay": 226,
      "fromTitle": "Phạm vi, closure và ngữ cảnh",
      "text": "Phạm vi quyết định lúc viết; ngữ cảnh của hàm thông thường quyết định lúc gọi.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    }
  ],
  "239": [
    {
      "fromDay": 234,
      "fromTitle": "Gọi dịch vụ trên mạng",
      "text": "Hàm gọi mạng không ném lỗi với 404 hay 500 - phải tự kiểm tra mã trạng thái.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    },
    {
      "fromDay": 227,
      "fromTitle": "Những cái bẫy của JavaScript",
      "text": "Sắp xếp mặc định so sánh dạng chuỗi - luôn truyền hàm so sánh khi sắp xếp số.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật."
      ]
    }
  ],
  "240": [
    {
      "fromDay": 235,
      "fromTitle": "Lưu dữ liệu trên trình duyệt",
      "text": "Bộ nhớ cục bộ ở lại lâu dài; bộ nhớ phiên mất khi đóng thẻ.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    },
    {
      "fromDay": 228,
      "fromTitle": "Lỗi và ngoại lệ trong JavaScript",
      "text": "Lỗi trong trình duyệt im lặng với người dùng - họ chỉ thấy chức năng không hoạt động.",
      "distractors": [
        "Luôn dùng ba dấu bằng; hai dấu bằng ép kiểu và sinh ra một bảng quy tắc không ai nhớ hết.",
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật."
      ]
    }
  ],
  "241": [
    {
      "fromDay": 236,
      "fromTitle": "Hiệu năng và bảo mật phía trình duyệt",
      "text": "Gộp nhiều thay đổi cây tài liệu thành một lượt thay vì chèn từng phần tử.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    },
    {
      "fromDay": 229,
      "fromTitle": "Vì sao trình duyệt không đứng chờ",
      "text": "Một luồng chạy mã, nhưng việc mất thời gian do trình duyệt lo ở bên ngoài.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    }
  ],
  "242": [
    {
      "fromDay": 237,
      "fromTitle": "Tổ chức mã và mô-đun",
      "text": "Chia theo trách nhiệm: lấy dữ liệu, xử lý, vẽ giao diện - không chia theo số dòng.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    },
    {
      "fromDay": 230,
      "fromTitle": "Promise và cú pháp chờ",
      "text": "Promise có ba trạng thái và chuyển đúng một lần rồi cố định vĩnh viễn.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    }
  ],
  "243": [
    {
      "fromDay": 238,
      "fromTitle": "Dựng một ứng dụng nhỏ",
      "text": "Chọn một nguồn sự thật duy nhất: một đối tượng trạng thái, giao diện chỉ là kết quả.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "Kiểm tra tĩnh bắt lối viết dễ lỗi kể cả ở nhánh mã chưa ai chạy tới."
      ]
    },
    {
      "fromDay": 231,
      "fromTitle": "Cây tài liệu - tìm và đọc phần tử",
      "text": "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JSON là văn bản; đối tượng là cấu trúc trong bộ nhớ - phải phân tích qua lại."
      ]
    }
  ],
  "244": [
    {
      "fromDay": 239,
      "fromTitle": "Công cụ và thói quen làm việc",
      "text": "Kiểm tra tĩnh bắt lối viết dễ lỗi kể cả ở nhánh mã chưa ai chạy tới.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật."
      ]
    },
    {
      "fromDay": 232,
      "fromTitle": "Sự kiện và cách chúng lan truyền",
      "text": "Sự kiện nổi từ phần tử đích lên từng tầng cha, và mọi hàm trên đường đều chạy.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    }
  ],
  "245": [
    {
      "fromDay": 240,
      "fromTitle": "Tổng ôn chặng JavaScript",
      "text": "Sợi chỉ xuyên suốt: mã chạy trên máy người khác, trong môi trường bạn không kiểm soát.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 233,
      "fromTitle": "Biểu mẫu và dữ liệu người dùng",
      "text": "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
      "distractors": [
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ.",
        "Kiểm tra tĩnh bắt lối viết dễ lỗi kể cả ở nhánh mã chưa ai chạy tới."
      ]
    }
  ],
  "246": [
    {
      "fromDay": 241,
      "fromTitle": "Vì sao cần cấu trúc dữ liệu",
      "text": "Cấu trúc dữ liệu là cách tổ chức dữ liệu, kèm chi phí khác nhau cho từng thao tác.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 234,
      "fromTitle": "Gọi dịch vụ trên mạng",
      "text": "Hàm gọi mạng không ném lỗi với 404 hay 500 - phải tự kiểm tra mã trạng thái.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    }
  ],
  "247": [
    {
      "fromDay": 242,
      "fromTitle": "Mảng và bộ nhớ liền khối",
      "text": "Mảng nằm liền khối, nên địa chỉ phần tử n tính được bằng một phép nhân cộng.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 235,
      "fromTitle": "Lưu dữ liệu trên trình duyệt",
      "text": "Bộ nhớ cục bộ ở lại lâu dài; bộ nhớ phiên mất khi đóng thẻ.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    }
  ],
  "248": [
    {
      "fromDay": 243,
      "fromTitle": "Danh sách liên kết",
      "text": "Nút gồm dữ liệu và con trỏ; các nút nằm rải rác chứ không liền khối.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 236,
      "fromTitle": "Hiệu năng và bảo mật phía trình duyệt",
      "text": "Gộp nhiều thay đổi cây tài liệu thành một lượt thay vì chèn từng phần tử.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    }
  ],
  "249": [
    {
      "fromDay": 244,
      "fromTitle": "Ngăn xếp và hàng đợi",
      "text": "Ngăn xếp là vào sau ra trước; hàng đợi là vào trước ra trước.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 237,
      "fromTitle": "Tổ chức mã và mô-đun",
      "text": "Chia theo trách nhiệm: lấy dữ liệu, xử lý, vẽ giao diện - không chia theo số dòng.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "JavaScript sửa cây trong bộ nhớ, không sửa tệp HTML gốc trên máy chủ."
      ]
    }
  ],
  "250": [
    {
      "fromDay": 245,
      "fromTitle": "Bảng băm hoạt động thế nào",
      "text": "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
      "distractors": [
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh.",
        "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước."
      ]
    },
    {
      "fromDay": 238,
      "fromTitle": "Dựng một ứng dụng nhỏ",
      "text": "Chọn một nguồn sự thật duy nhất: một đối tượng trạng thái, giao diện chỉ là kết quả.",
      "distractors": [
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật.",
        "Kiểm tra tĩnh bắt lối viết dễ lỗi kể cả ở nhánh mã chưa ai chạy tới."
      ]
    }
  ],
  "251": [
    {
      "fromDay": 246,
      "fromTitle": "Cây và cây tìm kiếm nhị phân",
      "text": "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước."
      ]
    },
    {
      "fromDay": 239,
      "fromTitle": "Công cụ và thói quen làm việc",
      "text": "Kiểm tra tĩnh bắt lối viết dễ lỗi kể cả ở nhánh mã chưa ai chạy tới.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Kiểm tra ở trình duyệt là trải nghiệm; kiểm tra ở máy chủ mới là bảo mật."
      ]
    }
  ],
  "252": [
    {
      "fromDay": 247,
      "fromTitle": "Đống và hàng đợi ưu tiên",
      "text": "Đống chỉ bảo đảm gốc là phần tử cực trị, không nói gì về thứ tự phần còn lại.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 240,
      "fromTitle": "Tổng ôn chặng JavaScript",
      "text": "Sợi chỉ xuyên suốt: mã chạy trên máy người khác, trong môi trường bạn không kiểm soát.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    }
  ],
  "253": [
    {
      "fromDay": 248,
      "fromTitle": "Đồ thị và cách biểu diễn",
      "text": "Đỉnh là thực thể, cạnh là quan hệ - có hướng hoặc vô hướng, có trọng số hoặc không.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 241,
      "fromTitle": "Vì sao cần cấu trúc dữ liệu",
      "text": "Cấu trúc dữ liệu là cách tổ chức dữ liệu, kèm chi phí khác nhau cho từng thao tác.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    }
  ],
  "254": [
    {
      "fromDay": 249,
      "fromTitle": "Tập hợp và các phép trên tập hợp",
      "text": "Tập hợp không chứa trùng lặp và không bảo đảm thứ tự - hệ quả của việc dùng băm.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 242,
      "fromTitle": "Mảng và bộ nhớ liền khối",
      "text": "Mảng nằm liền khối, nên địa chỉ phần tử n tính được bằng một phép nhân cộng.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    }
  ],
  "255": [
    {
      "fromDay": 250,
      "fromTitle": "Chọn cấu trúc cho bài toán thật",
      "text": "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 243,
      "fromTitle": "Danh sách liên kết",
      "text": "Nút gồm dữ liệu và con trỏ; các nút nằm rải rác chứ không liền khối.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    }
  ],
  "256": [
    {
      "fromDay": 251,
      "fromTitle": "Độ phức tạp và ký hiệu O lớn",
      "text": "Đếm thao tác theo n, bỏ hằng số và số hạng bậc thấp - còn lại là hình dạng đường cong.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    },
    {
      "fromDay": 244,
      "fromTitle": "Ngăn xếp và hàng đợi",
      "text": "Ngăn xếp là vào sau ra trước; hàng đợi là vào trước ra trước.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    }
  ],
  "257": [
    {
      "fromDay": 252,
      "fromTitle": "Tìm kiếm tuyến tính và nhị phân",
      "text": "Tìm nhị phân đòi dữ liệu đã sắp xếp theo ĐÚNG tiêu chí bạn đang tìm.",
      "distractors": [
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh.",
        "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước."
      ]
    },
    {
      "fromDay": 245,
      "fromTitle": "Bảng băm hoạt động thế nào",
      "text": "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
      "distractors": [
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh.",
        "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước."
      ]
    }
  ],
  "258": [
    {
      "fromDay": 253,
      "fromTitle": "Sắp xếp cơ bản và vì sao chúng chậm",
      "text": "Ba thuật toán cơ bản đều bậc hai vì chúng không giữ lại thông tin từ phép so đã làm.",
      "distractors": [
        "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước.",
        "Ba phần: điều kiện dừng, bước làm bài toán nhỏ đi, và cách ghép kết quả."
      ]
    },
    {
      "fromDay": 246,
      "fromTitle": "Cây và cây tìm kiếm nhị phân",
      "text": "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước."
      ]
    }
  ],
  "259": [
    {
      "fromDay": 254,
      "fromTitle": "Sắp xếp trộn và sắp xếp nhanh",
      "text": "Chia để trị: chia nhỏ, giải từng phần, ghép lại - khuôn hình dùng lại được cho nhiều bài.",
      "distractors": [
        "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước.",
        "Ba phần: điều kiện dừng, bước làm bài toán nhỏ đi, và cách ghép kết quả."
      ]
    },
    {
      "fromDay": 247,
      "fromTitle": "Đống và hàng đợi ưu tiên",
      "text": "Đống chỉ bảo đảm gốc là phần tử cực trị, không nói gì về thứ tự phần còn lại.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    }
  ],
  "260": [
    {
      "fromDay": 255,
      "fromTitle": "Duyệt đồ thị - rộng trước và sâu trước",
      "text": "Hai cách duyệt chỉ khác nhau ở một chỗ: hàng đợi cho rộng trước, ngăn xếp cho sâu trước.",
      "distractors": [
        "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước.",
        "Câu hỏi đầu tiên luôn là: thao tác nào tôi sẽ làm nhiều nhất trên dữ liệu này?"
      ]
    },
    {
      "fromDay": 248,
      "fromTitle": "Đồ thị và cách biểu diễn",
      "text": "Đỉnh là thực thể, cạnh là quan hệ - có hướng hoặc vô hướng, có trọng số hoặc không.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    }
  ],
  "261": [
    {
      "fromDay": 256,
      "fromTitle": "Đệ quy và cách nghĩ đệ quy",
      "text": "Ba phần: điều kiện dừng, bước làm bài toán nhỏ đi, và cách ghép kết quả.",
      "distractors": [
        "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước.",
        "Câu hỏi đầu tiên luôn là: thao tác nào tôi sẽ làm nhiều nhất trên dữ liệu này?"
      ]
    },
    {
      "fromDay": 249,
      "fromTitle": "Tập hợp và các phép trên tập hợp",
      "text": "Tập hợp không chứa trùng lặp và không bảo đảm thứ tự - hệ quả của việc dùng băm.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    }
  ],
  "262": [
    {
      "fromDay": 257,
      "fromTitle": "Quy hoạch động và ghi nhớ kết quả",
      "text": "Hai điều kiện: bài toán chia được thành bài con, VÀ các bài con đó lặp lại.",
      "distractors": [
        "Câu hỏi đầu tiên luôn là: thao tác nào tôi sẽ làm nhiều nhất trên dữ liệu này?",
        "Ba phần: điều kiện dừng, bước làm bài toán nhỏ đi, và cách ghép kết quả."
      ]
    },
    {
      "fromDay": 250,
      "fromTitle": "Chọn cấu trúc cho bài toán thật",
      "text": "Tổng chi phí là chi phí mỗi thao tác nhân số lần làm - nên đếm tần suất trước.",
      "distractors": [
        "Bảng băm tính thẳng vị trí từ khoá, nên tra gần như không đổi theo kích thước.",
        "Cây tìm kiếm: trái nhỏ hơn, phải lớn hơn - và tính chất này áp cho mọi nhánh."
      ]
    }
  ],
  "268": [
    {
      "fromDay": 263,
      "fromTitle": "Chặng 1, Bài 2: Hệ điều hành làm gì khi bạn không nhìn",
      "text": "Hệ điều hành là lớp trung gian giữa chương trình bạn viết và phần cứng thật.",
      "distractors": [
        "API là hợp đồng: gửi gì, nhận lại gì - và nó cố tình không mô tả bên trong.",
        "Hệ thống tệp là một cây: một gốc duy nhất, các thư mục lồng nhau bên dưới."
      ]
    }
  ],
  "1101": [
    {
      "fromDay": 196,
      "fromTitle": "Hàng đợi ưu tiên và cách ly",
      "text": "Ưu tiên quyết định thứ tự LẤY tin nhắn - nó không giải phóng người tiêu thụ đang bận.",
      "distractors": [
        "Ghi dữ liệu rồi gửi tin nhắn là hai thao tác, và khe hở giữa chúng không ai phát hiện.",
        "Mã định danh phải đi qua CẢ hàng đợi - đó là chỗ luồng đứt và khó nối nhất."
      ]
    },
    {
      "fromDay": 189,
      "fromTitle": "Gọi trực tiếp hay qua hàng đợi",
      "text": "Cần kết quả để đi tiếp → gọi trực tiếp, bất kể hệ thống lớn tới đâu.",
      "distractors": [
        "Nhìn XU HƯỚNG, không nhìn số lượng - cùng con số, hai tình huống khác hẳn.",
        "Hàng đợi: một tin, một người làm. Xuất bản: một sự kiện, nhiều người nghe."
      ]
    }
  ],
  "1102": [
    {
      "fromDay": 197,
      "fromTitle": "Case - một hàng đợi bị tồn đọng",
      "text": "Vẽ tốc độ VÀO và tốc độ RA chồng lên nhau - nó trả lời câu vì đâu trong ba mươi giây.",
      "distractors": [
        "Không có giao dịch nào bao được nhiều dịch vụ độc lập - không quay lại được.",
        "Đặt thành giá trị thì bất biến; cộng thêm, gửi thư, ghi thêm dòng thì không."
      ]
    },
    {
      "fromDay": 190,
      "fromTitle": "Theo dõi một hệ thống bất đồng bộ",
      "text": "Mã định danh phải đi qua CẢ hàng đợi - đó là chỗ luồng đứt và khó nối nhất.",
      "distractors": [
        "Xác nhận không phân biệt lỗi tạm thời với lỗi vĩnh viễn - cần cơ chế đếm và bỏ cuộc.",
        "Ít nhất một lần là mức thực tế: hệ quả trực tiếp của cơ chế xác nhận."
      ]
    }
  ],
  "1103": [
    {
      "fromDay": 198,
      "fromTitle": "Công việc theo lịch so với sự kiện",
      "text": "Đối chiếu phải chạy KỂ CẢ khi không có sự kiện - vì cái nó tìm là sự kiện bị mất.",
      "distractors": [
        "Rủi ro lớn nhất là hiệu ứng phụ chạy lại - chúng đi ra ngoài và không thu hồi được.",
        "BÊN GỌI sinh khoá, và giữ nguyên qua mọi lần thử lại của cùng một ý định."
      ]
    },
    {
      "fromDay": 191,
      "fromTitle": "Bất biến khi lặp lại - điều kiện bắt buộc",
      "text": "Đặt thành giá trị thì bất biến; cộng thêm, gửi thư, ghi thêm dòng thì không.",
      "distractors": [
        "Mặc định: chứa dữ liệu của THỜI ĐIỂM sự kiện xảy ra, không chỉ mã định danh.",
        "Thứ tự và xử lý song song xung khắc - hai người tiêu thụ hoàn thành theo thứ tự bất kỳ."
      ]
    }
  ],
  "1104": [
    {
      "fromDay": 199,
      "fromTitle": "Một luồng đặt hàng bất đồng bộ từ đầu tới cuối",
      "text": "Đồng bộ chỉ những gì quyết định CÂU TRẢ LỜI cho người dùng - không theo tầm quan trọng.",
      "distractors": [
        "Ưu tiên quyết định thứ tự LẤY tin nhắn - nó không giải phóng người tiêu thụ đang bận.",
        "Ghi dữ liệu rồi gửi tin nhắn là hai thao tác, và khe hở giữa chúng không ai phát hiện."
      ]
    },
    {
      "fromDay": 192,
      "fromTitle": "Khoá chống trùng",
      "text": "BÊN GỌI sinh khoá, và giữ nguyên qua mọi lần thử lại của cùng một ý định.",
      "distractors": [
        "Cần kết quả để đi tiếp → gọi trực tiếp, bất kể hệ thống lớn tới đâu.",
        "Nhìn XU HƯỚNG, không nhìn số lượng - cùng con số, hai tình huống khác hẳn."
      ]
    }
  ],
  "1105": [
    {
      "fromDay": 200,
      "fromTitle": "Ôn tập - xử lý bất đồng bộ",
      "text": "Bất đồng bộ đổi độ trễ lấy khả năng chịu lỗi; cái giá là độ phức tạp khi quan sát.",
      "distractors": [
        "Vẽ tốc độ VÀO và tốc độ RA chồng lên nhau - nó trả lời câu vì đâu trong ba mươi giây.",
        "Không có giao dịch nào bao được nhiều dịch vụ độc lập - không quay lại được."
      ]
    },
    {
      "fromDay": 193,
      "fromTitle": "Mẫu hộp thư đi",
      "text": "Ghi dữ liệu rồi gửi tin nhắn là hai thao tác, và khe hở giữa chúng không ai phát hiện.",
      "distractors": [
        "Mã định danh phải đi qua CẢ hàng đợi - đó là chỗ luồng đứt và khó nối nhất.",
        "Xác nhận không phân biệt lỗi tạm thời với lỗi vĩnh viễn - cần cơ chế đếm và bỏ cuộc."
      ]
    }
  ],
  "1106": [
    {
      "fromDay": 1101,
      "fromTitle": "Nền tảng nâng cao, Bài 1: Chất lượng mã đo bằng gì",
      "text": "Chất lượng mã là chi phí thay đổi trong TƯƠNG LAI; mọi chỉ số đo hiện tại.",
      "distractors": [
        "Lịch sử kho mã là dấu vết hành vi thật, và gần như không ai viết lại nó để gây ấn tượng.",
        "Viết lại rồi chuyển một lần thất bại vì đích di chuyển: hệ thống cũ vẫn đổi tiếp."
      ]
    },
    {
      "fromDay": 194,
      "fromTitle": "Bù trừ lỗi thay vì giao dịch phân tán",
      "text": "Không có giao dịch nào bao được nhiều dịch vụ độc lập - không quay lại được.",
      "distractors": [
        "Đặt thành giá trị thì bất biến; cộng thêm, gửi thư, ghi thêm dòng thì không.",
        "Mặc định: chứa dữ liệu của THỜI ĐIỂM sự kiện xảy ra, không chỉ mã định danh."
      ]
    }
  ],
  "1107": [
    {
      "fromDay": 1102,
      "fromTitle": "Nền tảng nâng cao, Bài 2: Đối chuẩn hiệu năng - đo cho đúng",
      "text": "Trung bình giấu phần đuôi, mà phần đuôi mới là phần người dùng cảm nhận.",
      "distractors": [
        "Chất lượng mã là chi phí thay đổi trong TƯƠNG LAI; mọi chỉ số đo hiện tại.",
        "Lịch sử kho mã là dấu vết hành vi thật, và gần như không ai viết lại nó để gây ấn tượng."
      ]
    },
    {
      "fromDay": 195,
      "fromTitle": "Chạy lại và phát lại",
      "text": "Rủi ro lớn nhất là hiệu ứng phụ chạy lại - chúng đi ra ngoài và không thu hồi được.",
      "distractors": [
        "BÊN GỌI sinh khoá, và giữ nguyên qua mọi lần thử lại của cùng một ý định.",
        "Cần kết quả để đi tiếp → gọi trực tiếp, bất kể hệ thống lớn tới đâu."
      ]
    }
  ],
  "1108": [
    {
      "fromDay": 1103,
      "fromTitle": "Nền tảng nâng cao, Bài 3: Nợ kỹ thuật - quyết định trả cái nào",
      "text": "Nợ chỉ tính lãi khi bạn CHẠM vào nó - chỗ tệ nhất chưa chắc là chỗ đắt nhất.",
      "distractors": [
        "Chất lượng mã là chi phí thay đổi trong TƯƠNG LAI; mọi chỉ số đo hiện tại.",
        "Lịch sử kho mã là dấu vết hành vi thật, và gần như không ai viết lại nó để gây ấn tượng."
      ]
    },
    {
      "fromDay": 196,
      "fromTitle": "Hàng đợi ưu tiên và cách ly",
      "text": "Ưu tiên quyết định thứ tự LẤY tin nhắn - nó không giải phóng người tiêu thụ đang bận.",
      "distractors": [
        "Ghi dữ liệu rồi gửi tin nhắn là hai thao tác, và khe hở giữa chúng không ai phát hiện.",
        "Mã định danh phải đi qua CẢ hàng đợi - đó là chỗ luồng đứt và khó nối nhất."
      ]
    }
  ],
  "1109": [
    {
      "fromDay": 1104,
      "fromTitle": "Nền tảng nâng cao, Bài 4: Quy ước và kiểm tra tự động",
      "text": "Tiêu chí là có QUY TẮC RÕ hay không, không phải việc đó tốn bao nhiêu thời gian.",
      "distractors": [
        "Việc đầu tiên là định nghĩa xong và chọn con số đo - rẻ nhất, và quyết định mọi thứ sau.",
        "Chất lượng mã là chi phí thay đổi trong TƯƠNG LAI; mọi chỉ số đo hiện tại."
      ]
    },
    {
      "fromDay": 197,
      "fromTitle": "Case - một hàng đợi bị tồn đọng",
      "text": "Vẽ tốc độ VÀO và tốc độ RA chồng lên nhau - nó trả lời câu vì đâu trong ba mươi giây.",
      "distractors": [
        "Không có giao dịch nào bao được nhiều dịch vụ độc lập - không quay lại được.",
        "Đặt thành giá trị thì bất biến; cộng thêm, gửi thư, ghi thêm dòng thì không."
      ]
    }
  ],
  "1110": [
    {
      "fromDay": 1105,
      "fromTitle": "Nền tảng nâng cao, Bài 5: Đánh giá sức khoẻ một kho mã",
      "text": "Lịch sử kho mã là dấu vết hành vi thật, và gần như không ai viết lại nó để gây ấn tượng.",
      "distractors": [
        "Việc đầu tiên là định nghĩa xong và chọn con số đo - rẻ nhất, và quyết định mọi thứ sau.",
        "Chất lượng mã là chi phí thay đổi trong TƯƠNG LAI; mọi chỉ số đo hiện tại."
      ]
    },
    {
      "fromDay": 198,
      "fromTitle": "Công việc theo lịch so với sự kiện",
      "text": "Đối chiếu phải chạy KỂ CẢ khi không có sự kiện - vì cái nó tìm là sự kiện bị mất.",
      "distractors": [
        "Rủi ro lớn nhất là hiệu ứng phụ chạy lại - chúng đi ra ngoài và không thu hồi được.",
        "BÊN GỌI sinh khoá, và giữ nguyên qua mọi lần thử lại của cùng một ý định."
      ]
    }
  ]
};
