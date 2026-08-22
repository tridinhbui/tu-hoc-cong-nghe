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
        "Bí mật nên đi qua kho quản lý riêng và được nạp lúc chạy."
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
        "Thêm một thư viện là thêm một thứ phải theo dõi lỗ hổng và bảo trì lâu dài.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
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
        "Đổi hành vi mặc định cũng là phá vỡ tương thích, dù giao diện không đổi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
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
        "Một sản phẩm dựng duy nhất đi qua mọi môi trường, chỉ đổi cấu hình.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
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
        "Bí mật đã vào kho mã thì coi như đã lộ, kể cả với kho riêng tư.",
        "Phủ nhánh chặt hơn phủ dòng vì nó đòi hỏi cả hai hướng của điều kiện được chạy."
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
        "Xoay vòng khoá định kỳ biến việc thay khoá thành thao tác quen thuộc thay vì tình huống khẩn cấp.",
        "Bình luận nên nói rõ đâu là điều kiện bắt buộc và đâu là gợi ý."
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
        "Bài đầu cuối đắt nhưng là thứ duy nhất chứng minh các mảnh ghép được với nhau.",
        "Xung đột là hàm của khoảng cách, và khoảng cách là hàm của thời gian."
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
      "text": "Mỗi phần mã nên có đúng một đội chịu trách nhiệm.",
      "distractors": [
        "Cổng tự động biến quy ước thành thứ không phụ thuộc trí nhớ hay áp lực.",
        "Nhánh dài còn giấu công việc khỏi đội, nên hai người dễ làm trùng nhau."
      ]
    },
    {
      "fromDay": 95,
      "fromTitle": "Nói không: mỗi lời đồng ý là một lời từ chối với việc khác",
      "text": "Nhận thêm mà không bỏ bớt chỉ là hoãn lời từ chối, không phải tránh được nó.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Xoay vòng khoá định kỳ biến việc thay khoá thành thao tác quen thuộc thay vì tình huống khẩn cấp."
      ]
    }
  ],
  "108": [
    {
      "fromDay": 103,
      "fromTitle": "Phụ thuộc chéo: khi ranh giới có lỗ",
      "text": "Chi phí bị chặn lớn hơn số ngày chờ, vì mất ngữ cảnh và phải quay lại.",
      "distractors": [
        "Độ phủ đo dòng được chạy qua, không đo điều được khẳng định.",
        "Cờ để lâu quá thành nợ: số tổ hợp trạng thái tăng theo cấp số nhân."
      ]
    },
    {
      "fromDay": 96,
      "fromTitle": "Kiểm chứng trước khi xây: mua thông tin với giá rẻ",
      "text": "Hành vi đã xảy ra là bằng chứng mạnh hơn nhiều so với ý kiến khi được hỏi.",
      "distractors": [
        "Số phiên bản mô tả rủi ro cho người nhận, không mô tả công sức của người phát hành.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "109": [
    {
      "fromDay": 104,
      "fromTitle": "Hợp đồng giữa các đội: lời hứa phải kiểm chứng được",
      "text": "Hợp đồng chỉ có giá trị khi được kiểm tự động ở cả hai phía.",
      "distractors": [
        "Phủ nhánh chặt hơn phủ dòng vì nó đòi hỏi cả hai hướng của điều kiện được chạy.",
        "Đường lui phải được kiểm chứng, không chỉ tồn tại trên giấy."
      ]
    },
    {
      "fromDay": 97,
      "fromTitle": "Thất bại phổ biến nhất: làm rất tốt một thứ không ai cần",
      "text": "Chất lượng kỹ thuật không bảo vệ được khỏi việc xây nhầm thứ.",
      "distractors": [
        "Ghi chú phát hành phải nói rõ cần sửa gì, không chỉ liệt kê thay đổi.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "110": [
    {
      "fromDay": 105,
      "fromTitle": "Kho mã chung hay tách: đánh đổi chứ không có đáp án đúng",
      "text": "Kho chung làm thay đổi xuyên ranh giới rẻ, đổi lại cần công cụ mạnh.",
      "distractors": [
        "Bình luận nên nói rõ đâu là điều kiện bắt buộc và đâu là gợi ý.",
        "Tách thành nhiều lần triển khai để mỗi bước luôn còn đường lui."
      ]
    },
    {
      "fromDay": 98,
      "fromTitle": "Giải thích đánh đổi cho người không viết mã",
      "text": "Diễn đạt đánh đổi kỹ thuật bằng thời gian, rủi ro hoặc tiền để nó so sánh được.",
      "distractors": [
        "Mã không nên biết nó đang chạy ở môi trường nào.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "111": [
    {
      "fromDay": 106,
      "fromTitle": "Chuẩn chung và tự chủ: chọn chỗ để thống nhất",
      "text": "Chuẩn hoá ở ranh giới thì lợi nhiều mất ít; chuẩn hoá bên trong thì ngược lại.",
      "distractors": [
        "Gộp thường xuyên giữ mỗi lần chỉ có một khoảng cách nhỏ phải giải.",
        "Chỉ số phát hiện bất thường, nhật ký giải thích một trường hợp, vết chỉ ra thời gian đi đâu."
      ]
    },
    {
      "fromDay": 99,
      "fromTitle": "Dự án: đi trọn một vòng từ ý tưởng tới con số",
      "text": "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả.",
      "distractors": [
        "Việc đầu tiên luôn là vô hiệu hoá khoá cũ, không phải dọn lịch sử.",
        "Để máy lo định dạng và quy ước, dành thời gian người cho thiết kế và ý nghĩa."
      ]
    }
  ],
  "112": [
    {
      "fromDay": 107,
      "fromTitle": "Nền tảng nội bộ: sản phẩm mà khách hàng là đồng nghiệp",
      "text": "Thước đo của nền tảng nội bộ là lựa chọn tự nguyện, không phải tỷ lệ sử dụng.",
      "distractors": [
        "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra.",
        "Đo cả những thứ không bao giờ được xảy ra, vì số không bất ngờ khác không là tín hiệu mạnh."
      ]
    },
    {
      "fromDay": 100,
      "fromTitle": "Ôn tập: đo cho đúng rồi chọn cho đúng",
      "text": "Chỉ số chỉ có nghĩa khi nói rõ nó thay mặt cho điều gì, và nó phải giảm được.",
      "distractors": [
        "Bài kiểm thử càng nhỏ càng nhanh và càng chỉ rõ chỗ hỏng.",
        "Rà soát cũng là cách lan truyền hiểu biết, nên đừng để một người gác mọi thứ."
      ]
    }
  ],
  "113": [
    {
      "fromDay": 108,
      "fromTitle": "Dùng chung hay nhân bản: một chút lặp rẻ hơn một ràng buộc sai",
      "text": "Giống nhau tình cờ và giống nhau vì cùng quy tắc là hai chuyện khác hẳn.",
      "distractors": [
        "Cờ để lâu quá thành nợ: số tổ hợp trạng thái tăng theo cấp số nhân.",
        "Cảnh báo giả nhiều lần sẽ huấn luyện đội bỏ qua cả cảnh báo thật."
      ]
    },
    {
      "fromDay": 101,
      "fromTitle": "Quy mô: vấn đề đổi chất chứ không chỉ đổi lượng",
      "text": "Lời giải cho quy mô là ranh giới rõ ràng, không phải quy trình dày hơn.",
      "distractors": [
        "Bài kiểm thử đỏ vặt còn hại hơn không có, vì nó dạy người ta bỏ qua tín hiệu.",
        "Gộp thường xuyên giữ mỗi lần chỉ có một khoảng cách nhỏ phải giải."
      ]
    }
  ],
  "114": [
    {
      "fromDay": 109,
      "fromTitle": "Dữ liệu dùng chung: ranh giới khó giữ nhất",
      "text": "Đọc thẳng dữ liệu của đội khác biến cấu trúc nội bộ thành hợp đồng ngầm.",
      "distractors": [
        "Đường lui phải được kiểm chứng, không chỉ tồn tại trên giấy.",
        "Quay lui về trạng thái đã biết là tốt luôn an toàn hơn sửa vội."
      ]
    },
    {
      "fromDay": 102,
      "fromTitle": "Ranh giới: mỗi phần có đúng một chủ",
      "text": "Ranh giới tốt là ranh giới mà thay đổi thông thường chỉ chạm một bên.",
      "distractors": [
        "Nó phải chạy trên môi trường sạch, nếu không sẽ lặp lại chuyện chạy được trên máy tôi.",
        "Triển khai là kỹ thuật; phát hành là quyết định kinh doanh - cờ tách hai việc ra."
      ]
    }
  ],
  "115": [
    {
      "fromDay": 110,
      "fromTitle": "Sự kiện nội bộ: kể chuyện đã xảy ra, đừng ra lệnh",
      "text": "Sự kiện mô tả việc đã xảy ra, ở thì quá khứ, không mang mệnh lệnh.",
      "distractors": [
        "Thêm cột cho phép rỗng là an toàn; xoá và đổi tên thì không.",
        "Đi tìm người chịu trách nhiệm dạy tổ chức cách giấu sự cố lần sau."
      ]
    },
    {
      "fromDay": 103,
      "fromTitle": "Phụ thuộc chéo: khi ranh giới có lỗ",
      "text": "Cho phép đóng góp có rà soát giữ được cả tốc độ lẫn quyền kiểm soát.",
      "distractors": [
        "Phủ thấp là tín hiệu đáng tin; phủ cao không bảo đảm gì.",
        "Triển khai từng phần biến lỗi toàn phần thành lỗi cục bộ trong thời gian ngắn."
      ]
    }
  ],
  "116": [
    {
      "fromDay": 111,
      "fromTitle": "Nhất quán cuối cùng: hai đội, hai câu trả lời, cùng một lúc",
      "text": "Nhất quán cuối cùng là cái giá của việc các đội độc lập, không phải lỗi.",
      "distractors": [
        "Kiểm thử phủ những gì bạn nghĩ tới; quan sát cho thấy những gì thật sự xảy ra.",
        "Nợ kỹ thuật là lựa chọn có ý thức kèm kế hoạch trả, không phải mọi đoạn mã xấu."
      ]
    },
    {
      "fromDay": 104,
      "fromTitle": "Hợp đồng giữa các đội: lời hứa phải kiểm chứng được",
      "text": "Bên tiêu thụ nên kiểm rằng mình chỉ dựa vào những gì được hứa.",
      "distractors": [
        "Để máy lo định dạng và quy ước, dành thời gian người cho thiết kế và ý nghĩa.",
        "Nỗi sợ triển khai là dấu hiệu của đường lui yếu, không phải của mã yếu."
      ]
    }
  ],
  "117": [
    {
      "fromDay": 112,
      "fromTitle": "Khi buộc phải triển khai cùng nhau",
      "text": "Phải triển khai đồng thời luôn là dấu hiệu của thay đổi phá vỡ tương thích chưa chia nhỏ.",
      "distractors": [
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên.",
        "Không đo được thì không quản được: cần dấu vết trong mã hoặc trong danh sách công việc."
      ]
    },
    {
      "fromDay": 105,
      "fromTitle": "Kho mã chung hay tách: đánh đổi chứ không có đáp án đúng",
      "text": "Kho tách cho tự chủ khi phát hành, đổi lại thay đổi xuyên ranh giới đắt.",
      "distractors": [
        "Rà soát cũng là cách lan truyền hiểu biết, nên đừng để một người gác mọi thứ.",
        "Thêm cột cho phép rỗng là an toàn; xoá và đổi tên thì không."
      ]
    }
  ],
  "118": [
    {
      "fromDay": 113,
      "fromTitle": "Đường găng: chuỗi dài nhất quyết định ngày xong",
      "text": "Công sức cộng lại được, thời gian thì phụ thuộc vào cấu trúc của chuỗi.",
      "distractors": [
        "Không có gì cần làm ngay thì để tới giờ hành chính, đừng đánh thức ai.",
        "Ghi lại cả những phương án đã bị loại và lý do loại."
      ]
    },
    {
      "fromDay": 106,
      "fromTitle": "Chuẩn chung và tự chủ: chọn chỗ để thống nhất",
      "text": "Mỗi chuẩn là thuế đánh vào tự chủ, nên phải trả lời được nó mua lại thứ gì.",
      "distractors": [
        "Thay đổi lớn nên chia thành nhiều bước gộp được, thay vì một nhánh dài.",
        "Kiểm thử phủ những gì bạn nghĩ tới; quan sát cho thấy những gì thật sự xảy ra."
      ]
    }
  ],
  "119": [
    {
      "fromDay": 114,
      "fromTitle": "Ghi lại quyết định: vì sao mọi thứ như hiện tại",
      "text": "Ghi lại các phương án đã loại và lý do, vì mã chỉ cho thấy phương án được chọn.",
      "distractors": [
        "Phải có một người điều phối, tách khỏi người đang gõ lệnh.",
        "Cổng tự động biến quy ước thành ràng buộc; rà soát mã lo phần máy không làm được."
      ]
    },
    {
      "fromDay": 107,
      "fromTitle": "Nền tảng nội bộ: sản phẩm mà khách hàng là đồng nghiệp",
      "text": "Nền tảng nên là thư viện và khuôn mẫu, không phải một hàng đợi yêu cầu.",
      "distractors": [
        "Tắt cờ mất vài giây, còn quay lui một lần triển khai mất nhiều phút.",
        "Cảnh báo phải gắn với triệu chứng người dùng cảm nhận, không với chỉ số tài nguyên."
      ]
    }
  ],
  "120": [
    {
      "fromDay": 115,
      "fromTitle": "Rà soát kiến trúc: cửa sổ hay cửa ải",
      "text": "Tiêu chí rà soát là chi phí sửa sai, không phải quy mô mã hay ngân sách.",
      "distractors": [
        "Đi tìm người chịu trách nhiệm dạy tổ chức cách giấu sự cố lần sau.",
        "Sau sự cố, sửa hệ thống chứ đừng sửa con người."
      ]
    },
    {
      "fromDay": 108,
      "fromTitle": "Dùng chung hay nhân bản: một chút lặp rẻ hơn một ràng buộc sai",
      "text": "Câu hỏi phân biệt: một bên đổi thì bên kia có bắt buộc đổi theo không.",
      "distractors": [
        "Triển khai từng phần biến lỗi toàn phần thành lỗi cục bộ trong thời gian ngắn.",
        "Không có gì cần làm ngay thì để tới giờ hành chính, đừng đánh thức ai."
      ]
    }
  ],
  "121": [
    {
      "fromDay": 116,
      "fromTitle": "Thay hệ thống cũ: bóp nghẹt dần thay vì viết lại",
      "text": "Bóp nghẹt dần: đặt lớp trung gian, chuyển từng phần, mỗi bước có giá trị riêng.",
      "distractors": [
        "Nợ kỹ thuật là lựa chọn có ý thức kèm kế hoạch trả, không phải mọi đoạn mã xấu.",
        "Cùng một con số có thể mang hai nghĩa trái ngược tuỳ mục đích sản phẩm."
      ]
    },
    {
      "fromDay": 109,
      "fromTitle": "Dữ liệu dùng chung: ranh giới khó giữ nhất",
      "text": "Cung cấp dữ liệu qua giao diện có phiên bản, hoặc qua bản sao dành cho đọc.",
      "distractors": [
        "Nỗi sợ triển khai là dấu hiệu của đường lui yếu, không phải của mã yếu.",
        "Phải có một người điều phối, tách khỏi người đang gõ lệnh."
      ]
    }
  ],
  "122": [
    {
      "fromDay": 117,
      "fromTitle": "Gỡ hệ thống cũ: phần không ai muốn làm",
      "text": "Cuộc di trú chỉ xong khi hệ thống cũ đã tắt, không phải khi bản mới chạy.",
      "distractors": [
        "Không đo được thì không quản được: cần dấu vết trong mã hoặc trong danh sách công việc.",
        "Chỉ số dùng được phải giảm được khi sản phẩm tệ đi."
      ]
    },
    {
      "fromDay": 110,
      "fromTitle": "Sự kiện nội bộ: kể chuyện đã xảy ra, đừng ra lệnh",
      "text": "Bên phát không cần biết ai đang nghe - đó là toàn bộ lợi ích của mô hình này.",
      "distractors": [
        "Di trú dữ liệu lớn nên chạy theo lô, không khoá bảng trong một giao dịch dài.",
        "Mỗi hành động rút ra phải có người phụ trách và thời hạn, nếu không nó không tồn tại."
      ]
    }
  ],
  "123": [
    {
      "fromDay": 118,
      "fromTitle": "Hệ thống có hình dạng của tổ chức làm ra nó",
      "text": "Ranh giới nằm trong nội bộ một đội có xu hướng bị bào mòn.",
      "distractors": [
        "Ghi lại cả những phương án đã bị loại và lý do loại.",
        "Nhóm theo thời điểm bắt đầu tách chất lượng sản phẩm khỏi quy mô, và đường cong giữ chân của từng nhóm là thứ đáng đọc."
      ]
    },
    {
      "fromDay": 111,
      "fromTitle": "Nhất quán cuối cùng: hai đội, hai câu trả lời, cùng một lúc",
      "text": "Phải quyết định giao diện nói gì trong khoảng chưa khớp.",
      "distractors": [
        "Chỉ số quan trọng nhất là chỉ số phản ánh trải nghiệm người dùng, không phải tài nguyên máy.",
        "Lãi của nó là thời gian tăng thêm cho mọi thay đổi đi qua vùng đó."
      ]
    }
  ],
  "124": [
    {
      "fromDay": 119,
      "fromTitle": "Khi nào tách dịch vụ, khi nào đừng",
      "text": "Tách dịch vụ mua sự độc lập vận hành, trả bằng độ phức tạp phân tán.",
      "distractors": [
        "Cổng tự động biến quy ước thành ràng buộc; rà soát mã lo phần máy không làm được.",
        "Nhóm cũng chia được theo kênh, theo thiết bị hay theo gói dịch vụ."
      ]
    },
    {
      "fromDay": 112,
      "fromTitle": "Khi buộc phải triển khai cùng nhau",
      "text": "Chia thành các bước tương thích hai chiều thì mỗi bên tự chọn lịch của mình.",
      "distractors": [
        "Mỗi cảnh báo phải kèm hành động cụ thể; không có hành động thì đó là bảng theo dõi.",
        "Mã và kiểm thử nói cái gì và như thế nào; chỉ tài liệu nói vì sao."
      ]
    }
  ],
  "125": [
    {
      "fromDay": 120,
      "fromTitle": "Ôn tập: mọi thứ đổi khác khi có nhiều đội",
      "text": "Chi phí phối hợp tăng theo bình phương số người; ranh giới là công cụ cắt nó.",
      "distractors": [
        "Sau sự cố, sửa hệ thống chứ đừng sửa con người.",
        "Phải định nghĩa rõ từng bước, nếu không hai người sẽ đọc ra hai kết quả."
      ]
    },
    {
      "fromDay": 113,
      "fromTitle": "Đường găng: chuỗi dài nhất quyết định ngày xong",
      "text": "Thêm người không rút ngắn được chuỗi nối tiếp.",
      "distractors": [
        "Khôi phục và điều tra là hai việc tách biệt; chỉ việc đầu là gấp.",
        "Tài liệu sai còn hại hơn không có, vì người đọc tin vào nó."
      ]
    }
  ],
  "126": [
    {
      "fromDay": 121,
      "fromTitle": "Mô hình mối đe doạ: ai muốn gì, và bạn mất gì",
      "text": "Phần lớn tấn công là cơ hội và tự động, không nhắm riêng vào bạn.",
      "distractors": [
        "Đo hành vi hoàn thành việc quan trọng hơn đo hoạt động bề mặt.",
        "Chạy tới đủ mẫu rồi mới đọc, đừng dừng ngay khi thấy con số đẹp."
      ]
    },
    {
      "fromDay": 114,
      "fromTitle": "Ghi lại quyết định: vì sao mọi thứ như hiện tại",
      "text": "Ghi cả điều kiện nào sẽ khiến quyết định này cần xem lại.",
      "distractors": [
        "Ghi lại dòng thời gian ngay trong lúc xử lý, vì sau đó không ai nhớ chính xác nữa.",
        "Cờ tính năng tách triển khai khỏi phát hành, biến việc tắt thành thao tác vài giây."
      ]
    }
  ],
  "127": [
    {
      "fromDay": 122,
      "fromTitle": "Mật khẩu: thứ yếu nhất mà ai cũng còn dùng",
      "text": "Rủi ro lớn nhất là dùng lại mật khẩu, không phải mật khẩu bị bẻ khoá.",
      "distractors": [
        "Chỉ số trung bình che mất phân bố, giống hệt vấn đề của độ trễ trung bình.",
        "Không đủ lưu lượng thì hãy thử những thay đổi lớn hơn, đừng thử tinh chỉnh nhỏ."
      ]
    },
    {
      "fromDay": 115,
      "fromTitle": "Rà soát kiến trúc: cửa sổ hay cửa ải",
      "text": "Rà soát nên là nơi lấy góc nhìn, không phải cửa xin phép.",
      "distractors": [
        "Mỗi hành động rút ra phải có người phụ trách và thời hạn, nếu không nó không tồn tại.",
        "Một chỉ số chỉ có nghĩa khi bạn nói rõ nó thay mặt cho điều gì."
      ]
    }
  ],
  "128": [
    {
      "fromDay": 123,
      "fromTitle": "Phiên đăng nhập: chìa khoá được cấp sau khi mở cửa",
      "text": "Mã phiên có quyền tương đương mật khẩu nhưng lộ ra ở nhiều chỗ hơn.",
      "distractors": [
        "Xu hướng giữa các nhóm quan trọng hơn con số tuyệt đối của một nhóm.",
        "Ngẫu nhiên hoá là thứ duy nhất cắt đứt được mối liên hệ sẵn có giữa hai nhóm."
      ]
    },
    {
      "fromDay": 116,
      "fromTitle": "Thay hệ thống cũ: bóp nghẹt dần thay vì viết lại",
      "text": "Chạy song song và so kết quả là cách rẻ nhất để tìm ra hành vi chưa biết.",
      "distractors": [
        "Lãi của nó là thời gian tăng thêm cho mọi thay đổi đi qua vùng đó.",
        "Đo hành vi hoàn thành việc quan trọng hơn đo hoạt động bề mặt."
      ]
    }
  ],
  "129": [
    {
      "fromDay": 124,
      "fromTitle": "Lưu mật khẩu: giả định cơ sở dữ liệu sẽ bị lấy",
      "text": "Thiết kế với giả định cơ sở dữ liệu sẽ bị lấy vào một ngày nào đó.",
      "distractors": [
        "Cú rơi lớn nhất là nơi đáng sửa trước, không phải bước có tỷ lệ thấp nhất trong tuyệt đối.",
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi."
      ]
    },
    {
      "fromDay": 117,
      "fromTitle": "Gỡ hệ thống cũ: phần không ai muốn làm",
      "text": "Chi phí giữ hệ thống cũ tăng theo thời gian vì hiểu biết về nó mất dần.",
      "distractors": [
        "Mã và kiểm thử nói cái gì và như thế nào; chỉ tài liệu nói vì sao.",
        "Tỷ lệ thường giàu thông tin hơn số tuyệt đối."
      ]
    }
  ],
  "130": [
    {
      "fromDay": 125,
      "fromTitle": "Phân quyền: theo vai trò là chưa đủ",
      "text": "Vai trò trả lời loại thao tác; quan hệ trả lời với dữ liệu nào.",
      "distractors": [
        "Chia ngẫu nhiên và chạy song song là thứ tách tác động của thay đổi khỏi nhiễu bên ngoài.",
        "Đặt chỉ tiêu cho một chỉ số sẽ làm nó bị tối ưu theo cách bạn không mong."
      ]
    },
    {
      "fromDay": 118,
      "fromTitle": "Hệ thống có hình dạng của tổ chức làm ra nó",
      "text": "Muốn đổi kiến trúc bền vững thì phải đổi cả cách tổ chức đội.",
      "distractors": [
        "Tài liệu sai còn hại hơn không có, vì người đọc tin vào nó.",
        "So các nhóm ở cùng độ tuổi, không so ở cùng thời điểm lịch."
      ]
    }
  ],
  "131": [
    {
      "fromDay": 126,
      "fromTitle": "Mã hoá dữ liệu nằm yên: bảo vệ trước ai",
      "text": "Mã hoá toàn ổ chỉ bảo vệ khi ổ ở trạng thái tắt và rời khỏi tầm kiểm soát.",
      "distractors": [
        "Không phải thay đổi nào cũng cần thử nghiệm - việc sửa lỗi rõ ràng thì cứ làm.",
        "Biến động đột ngột nên nghi đường dữ liệu trước khi nghi thế giới thật."
      ]
    },
    {
      "fromDay": 119,
      "fromTitle": "Khi nào tách dịch vụ, khi nào đừng",
      "text": "Nếu cùng một đội sở hữu cả hai phần thì lợi ích gần như bằng không.",
      "distractors": [
        "Cờ tính năng tách triển khai khỏi phát hành, biến việc tắt thành thao tác vài giây.",
        "Chia hành trình thành bước để biến một con số tổng thành một danh sách việc."
      ]
    }
  ],
  "132": [
    {
      "fromDay": 127,
      "fromTitle": "Quản lý khoá: chỗ mọi lớp mã hoá quy về",
      "text": "Khoá phải nằm ở nơi chịu kịch bản xâm nhập khác với dữ liệu.",
      "distractors": [
        "Không đủ lưu lượng thì hãy thử những thay đổi lớn hơn, đừng thử tinh chỉnh nhỏ.",
        "Hỏi về hành vi đã xảy ra, đừng hỏi người dùng dự đoán hành vi tương lai."
      ]
    },
    {
      "fromDay": 120,
      "fromTitle": "Ôn tập: mọi thứ đổi khác khi có nhiều đội",
      "text": "Phải triển khai đồng thời luôn là dấu hiệu của thay đổi chưa chia nhỏ.",
      "distractors": [
        "Một chỉ số chỉ có nghĩa khi bạn nói rõ nó thay mặt cho điều gì.",
        "Phễu cho biết chỗ rơi chứ không cho biết vì sao rơi - phần đó cần hỏi người dùng."
      ]
    }
  ],
  "133": [
    {
      "fromDay": 128,
      "fromTitle": "Tiêm lệnh: dữ liệu bị đọc thành câu lệnh",
      "text": "Nguyên nhân luôn là dữ liệu và câu lệnh bị trộn vào một chuỗi.",
      "distractors": [
        "Ngẫu nhiên hoá là thứ duy nhất cắt đứt được mối liên hệ sẵn có giữa hai nhóm.",
        "Sai lệch của ước lượng không đối xứng: nó lệch về phía lâu hơn."
      ]
    },
    {
      "fromDay": 121,
      "fromTitle": "Mô hình mối đe doạ: ai muốn gì, và bạn mất gì",
      "text": "Mọi biện pháp đều có giá, nên chúng phải được xếp thứ tự.",
      "distractors": [
        "Chỉ số cộng dồn chỉ tăng nên không phát hiện được vấn đề.",
        "Không phải thay đổi nào cũng cần thử nghiệm - việc sửa lỗi rõ ràng thì cứ làm."
      ]
    }
  ],
  "134": [
    {
      "fromDay": 129,
      "fromTitle": "Kịch bản chèn vào trang: nạn nhân là người dùng của bạn",
      "text": "Mã hoá theo ngữ cảnh lúc hiển thị, không lọc lúc nhận vào.",
      "distractors": [
        "Một chỉ số dẫn dắt để phân xử, các chỉ số khác thành ràng buộc không được xấu đi.",
        "Ước lượng theo khoảng và mức tin cậy trung thực hơn một con số duy nhất."
      ]
    },
    {
      "fromDay": 122,
      "fromTitle": "Mật khẩu: thứ yếu nhất mà ai cũng còn dùng",
      "text": "Yếu tố thứ hai là biện pháp có tỷ lệ lợi ích trên công sức cao nhất.",
      "distractors": [
        "Nhóm theo thời điểm bắt đầu tách chất lượng sản phẩm khỏi quy mô, và đường cong giữ chân của từng nhóm là thứ đáng đọc.",
        "Có ý nghĩa thống kê không đồng nghĩa với đáng làm về mặt kinh doanh."
      ]
    }
  ],
  "135": [
    {
      "fromDay": 130,
      "fromTitle": "Giả mạo yêu cầu: mượn phiên đăng nhập của nạn nhân",
      "text": "Cookie gắn theo tên miền nên đi kèm cả những yêu cầu do trang lạ kích hoạt.",
      "distractors": [
        "Đặt chỉ tiêu cho một chỉ số sẽ làm nó bị tối ưu theo cách bạn không mong.",
        "Mỗi phần giao được là một cơ hội phát hiện mình đang sai với giá rẻ."
      ]
    },
    {
      "fromDay": 123,
      "fromTitle": "Phiên đăng nhập: chìa khoá được cấp sau khi mở cửa",
      "text": "Phiên phải có hạn và phải huỷ được ngay lập tức khi cần.",
      "distractors": [
        "Nhóm cũng chia được theo kênh, theo thiết bị hay theo gói dịch vụ.",
        "Nhóm tự chọn luôn khác nhóm được chọn ngẫu nhiên ở nhiều thứ bạn không đo."
      ]
    }
  ],
  "136": [
    {
      "fromDay": 131,
      "fromTitle": "Tải tệp lên: nhận một tệp là nhận một rủi ro",
      "text": "Phần mở rộng và loại nội dung khai báo đều do người gửi đặt nên không tin được.",
      "distractors": [
        "Biến động đột ngột nên nghi đường dữ liệu trước khi nghi thế giới thật.",
        "Cắt chất lượng là khoản vay lãi suất cao, và nó bị vay trong im lặng."
      ]
    },
    {
      "fromDay": 124,
      "fromTitle": "Lưu mật khẩu: giả định cơ sở dữ liệu sẽ bị lấy",
      "text": "Dùng hàm băm chuyên cho mật khẩu, chậm có chủ đích, không dùng hàm băm nhanh.",
      "distractors": [
        "Phải định nghĩa rõ từng bước, nếu không hai người sẽ đọc ra hai kết quả.",
        "Chỉ số dẫn dắt phải là thứ đội thật sự tác động được, không phải doanh thu tổng."
      ]
    }
  ],
  "137": [
    {
      "fromDay": 132,
      "fromTitle": "Lỗ hổng trong thư viện: mã bạn không viết vẫn là mã của bạn",
      "text": "Cửa sổ nguy hiểm nhất bắt đầu ngay khi lỗ hổng được công bố.",
      "distractors": [
        "Hỏi về hành vi đã xảy ra, đừng hỏi người dùng dự đoán hành vi tương lai.",
        "Chi phí trì hoãn phân biệt được những việc mà lợi ích đơn thuần không phân biệt nổi."
      ]
    },
    {
      "fromDay": 125,
      "fromTitle": "Phân quyền: theo vai trò là chưa đủ",
      "text": "Kiểm quyền nên đặt ở tầng gần dữ liệu để mọi đường gọi đều đi qua.",
      "distractors": [
        "Phải quyết định chỉ số và cỡ mẫu trước khi bắt đầu, không phải sau khi nhìn kết quả.",
        "Mỗi chỉ số cần một định nghĩa viết ra, ở một chỗ duy nhất ai cũng tra được."
      ]
    }
  ],
  "138": [
    {
      "fromDay": 133,
      "fromTitle": "Lạm dụng: dùng đúng chức năng nhưng sai mục đích",
      "text": "Lạm dụng dùng đúng tính năng nên không lỗ hổng nào bị khai thác.",
      "distractors": [
        "Sai lệch của ước lượng không đối xứng: nó lệch về phía lâu hơn.",
        "Danh sách không có thứ tự nghĩa là thứ tự sẽ do người nói to nhất quyết định."
      ]
    },
    {
      "fromDay": 126,
      "fromTitle": "Mã hoá dữ liệu nằm yên: bảo vệ trước ai",
      "text": "Máy đang chạy thì ổ đã mở khoá, nên tiến trình có quyền đọc được hết.",
      "distractors": [
        "Cỡ mẫu cần thiết tăng theo bình phương khi hiệu ứng nhỏ đi.",
        "Số liệu quá khứ chỉ so sánh được nếu định nghĩa không đổi trong khoảng đó."
      ]
    }
  ],
  "139": [
    {
      "fromDay": 134,
      "fromTitle": "Dấu vết kiểm toán: ai đã làm gì, lúc nào",
      "text": "Dấu vết trả lời câu hỏi ai chạm vào dữ liệu nào, khác với nhật ký gỡ lỗi.",
      "distractors": [
        "Ước lượng theo khoảng và mức tin cậy trung thực hơn một con số duy nhất.",
        "Danh sách công khai biến việc từ chối thành một quyết định về thứ tự, không phải về con người."
      ]
    },
    {
      "fromDay": 127,
      "fromTitle": "Quản lý khoá: chỗ mọi lớp mã hoá quy về",
      "text": "Kho quản lý khoá chuyên dụng cho phép phân quyền và ghi lại ai đã đọc.",
      "distractors": [
        "Có ý nghĩa thống kê không đồng nghĩa với đáng làm về mặt kinh doanh.",
        "Một vài phiên quan sát đủ để loại phần lớn giả thuyết sai."
      ]
    }
  ],
  "140": [
    {
      "fromDay": 135,
      "fromTitle": "Quyền tối thiểu: mỗi phần chỉ được đúng thứ nó cần",
      "text": "Quyền tối thiểu không giảm xác suất sự cố; nó giới hạn phạm vi hậu quả.",
      "distractors": [
        "Mỗi phần giao được là một cơ hội phát hiện mình đang sai với giá rẻ.",
        "Cách kiểm chứng rẻ nhất thường không cần viết dòng mã nào."
      ]
    },
    {
      "fromDay": 128,
      "fromTitle": "Tiêm lệnh: dữ liệu bị đọc thành câu lệnh",
      "text": "Truyền tham số là cách chữa tận gốc; lọc ký tự thì luôn thiếu.",
      "distractors": [
        "Nhóm tự chọn luôn khác nhóm được chọn ngẫu nhiên ở nhiều thứ bạn không đo.",
        "Việc càng lớn thì ước lượng càng kém tin cậy, vì phần chưa biết càng nhiều."
      ]
    }
  ],
  "141": [
    {
      "fromDay": 136,
      "fromTitle": "Nhiều lớp: giả định mỗi lớp đều sẽ hỏng",
      "text": "Giả định mỗi lớp đều có xác suất hỏng, rồi thiết kế cho tình huống đó.",
      "distractors": [
        "Cắt chất lượng là khoản vay lãi suất cao, và nó bị vay trong im lặng.",
        "Chất lượng kỹ thuật không bảo vệ được khỏi việc xây nhầm thứ."
      ]
    },
    {
      "fromDay": 129,
      "fromTitle": "Kịch bản chèn vào trang: nạn nhân là người dùng của bạn",
      "text": "Cùng một chuỗi có mức nguy hiểm khác nhau tuỳ chỗ nó được chèn vào.",
      "distractors": [
        "Chỉ số dẫn dắt phải là thứ đội thật sự tác động được, không phải doanh thu tổng.",
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn."
      ]
    }
  ],
  "142": [
    {
      "fromDay": 137,
      "fromTitle": "Nhận báo cáo lỗ hổng: đường liên lạc bạn nên có sẵn",
      "text": "Rào cản lớn nhất là không biết gửi cho ai và sợ bị quy kết.",
      "distractors": [
        "Chi phí trì hoãn phân biệt được những việc mà lợi ích đơn thuần không phân biệt nổi.",
        "Mỗi tính năng giữ lại đều có chi phí bảo trì và làm sản phẩm khó hiểu thêm."
      ]
    },
    {
      "fromDay": 130,
      "fromTitle": "Giả mạo yêu cầu: mượn phiên đăng nhập của nạn nhân",
      "text": "Chỉ những thao tác thay đổi dữ liệu mới thật sự nguy hiểm với kiểu tấn công này.",
      "distractors": [
        "Mỗi chỉ số cần một định nghĩa viết ra, ở một chỗ duy nhất ai cũng tra được.",
        "Phần đầu tiên nên nhắm vào giả định rủi ro nhất, không nhắm vào phần dễ nhất."
      ]
    }
  ],
  "143": [
    {
      "fromDay": 138,
      "fromTitle": "Sự cố bảo mật: khác sự cố vận hành ở ba điểm",
      "text": "Trạng thái hiện tại là bằng chứng; giữ lại trước khi can thiệp.",
      "distractors": [
        "Danh sách không có thứ tự nghĩa là thứ tự sẽ do người nói to nhất quyết định.",
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk"
      ]
    },
    {
      "fromDay": 131,
      "fromTitle": "Tải tệp lên: nhận một tệp là nhận một rủi ro",
      "text": "Tên tệp cũng là dữ liệu người dùng; hệ thống nên tự sinh tên khi lưu.",
      "distractors": [
        "Số liệu quá khứ chỉ so sánh được nếu định nghĩa không đổi trong khoảng đó.",
        "Thêm người vào việc đang trễ thường làm nó trễ thêm."
      ]
    }
  ],
  "144": [
    {
      "fromDay": 139,
      "fromTitle": "Quyền riêng tư: nghĩa vụ đi kèm mỗi trường dữ liệu",
      "text": "Riêng tư hỏi có nên giữ; bảo mật hỏi ai chạm được vào thứ đã giữ.",
      "distractors": [
        "Danh sách công khai biến việc từ chối thành một quyết định về thứ tự, không phải về con người.",
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk"
      ]
    },
    {
      "fromDay": 132,
      "fromTitle": "Lỗ hổng trong thư viện: mã bạn không viết vẫn là mã của bạn",
      "text": "Quét phải phủ toàn bộ cây phụ thuộc, gồm cả phụ thuộc gián tiếp.",
      "distractors": [
        "Một vài phiên quan sát đủ để loại phần lớn giả thuyết sai.",
        "Việc chặn người khác có chi phí trì hoãn nhân lên theo số người bị chặn."
      ]
    }
  ],
  "145": [
    {
      "fromDay": 140,
      "fromTitle": "Ôn tập: bảo mật là chuỗi quyết định, không phải danh sách việc",
      "text": "Mọi lỗ hổng tiêm lệnh đều là dữ liệu bị trộn vào câu lệnh - chữa bằng cách tách chúng.",
      "distractors": [
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk",
        "Sau khi đo, ba lựa chọn đều hợp lệ: làm tiếp, đổi hướng, hoặc dừng."
      ]
    },
    {
      "fromDay": 133,
      "fromTitle": "Lạm dụng: dùng đúng chức năng nhưng sai mục đích",
      "text": "Thông báo khác nhau cho hai trường hợp thường là một kênh rò rỉ thông tin.",
      "distractors": [
        "Việc càng lớn thì ước lượng càng kém tin cậy, vì phần chưa biết càng nhiều.",
        "Nhận thêm mà không bỏ bớt chỉ là hoãn lời từ chối, không phải tránh được nó."
      ]
    }
  ],
  "146": [
    {
      "fromDay": 141,
      "fromTitle": "Trái phiếu là gì?",
      "text": "Trái phiếu = cho vay, nhận coupon + hoàn vốn khi đáo hạn",
      "distractors": [
        "Chất lượng kỹ thuật không bảo vệ được khỏi việc xây nhầm thứ.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    },
    {
      "fromDay": 134,
      "fromTitle": "Dấu vết kiểm toán: ai đã làm gì, lúc nào",
      "text": "Nó phải chống sửa đổi, kể cả bởi người có quyền quản trị.",
      "distractors": [
        "Cắt dọc: mỗi phần đi từ giao diện tới dữ liệu và làm được một việc trọn vẹn.",
        "Đồng ý với tất cả làm mọi bên cùng thất vọng, chỉ là muộn hơn."
      ]
    }
  ],
  "147": [
    {
      "fromDay": 142,
      "fromTitle": "Giá trái phiếu và lãi suất",
      "text": "Lãi suất tăng → giá trái phiếu giảm (và ngược lại)",
      "distractors": [
        "Diễn đạt đánh đổi kỹ thuật bằng thời gian, rủi ro hoặc tiền để nó so sánh được.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    },
    {
      "fromDay": 135,
      "fromTitle": "Quyền tối thiểu: mỗi phần chỉ được đúng thứ nó cần",
      "text": "Mỗi dịch vụ nên có danh tính riêng, không dùng chung một tài khoản quyền cao.",
      "distractors": [
        "Phần đầu tiên nên nhắm vào giả định rủi ro nhất, không nhắm vào phần dễ nhất.",
        "Người đã tự xoay xở là người chắc chắn có vấn đề thật."
      ]
    }
  ],
  "148": [
    {
      "fromDay": 143,
      "fromTitle": "Yield to Maturity (YTM)",
      "text": "YTM = lợi suất thực nếu giữ đến đáo hạn",
      "distractors": [
        "Viết vấn đề và chỉ số thành công trước khi có dữ liệu, để không chọn chỉ số theo kết quả.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    },
    {
      "fromDay": 136,
      "fromTitle": "Nhiều lớp: giả định mỗi lớp đều sẽ hỏng",
      "text": "Hai lớp chỉ có giá trị khi chúng hỏng vì những nguyên nhân khác nhau.",
      "distractors": [
        "Thêm người vào việc đang trễ thường làm nó trễ thêm.",
        "Giả thuyết vấn đề không đủ đau nên được kiểm trước vì nó rẻ nhất và khó chịu nhất."
      ]
    }
  ],
  "149": [
    {
      "fromDay": 144,
      "fromTitle": "Credit Rating (Xếp hạng tín dụng)",
      "text": "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk",
      "distractors": [
        "Chỉ số chỉ có nghĩa khi nói rõ nó thay mặt cho điều gì, và nó phải giảm được.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    },
    {
      "fromDay": 137,
      "fromTitle": "Nhận báo cáo lỗ hổng: đường liên lạc bạn nên có sẵn",
      "text": "Một địa chỉ liên hệ dễ tìm cộng cam kết không truy cứu là bước rẻ nhất.",
      "distractors": [
        "Việc chặn người khác có chi phí trì hoãn nhân lên theo số người bị chặn.",
        "Diễn đạt đánh đổi kỹ thuật bằng thời gian, rủi ro hoặc tiền để nó so sánh được."
      ]
    }
  ],
  "150": [
    {
      "fromDay": 145,
      "fromTitle": "Yield Curve",
      "text": "Yield curve: lợi suất trái phiếu theo kỳ hạn",
      "distractors": [
        "Ưu tiên là so sánh chi phí trì hoãn, và mỗi lời đồng ý là một lời từ chối.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    },
    {
      "fromDay": 138,
      "fromTitle": "Sự cố bảo mật: khác sự cố vận hành ở ba điểm",
      "text": "Có một bên đối kháng đang phản ứng, nên hành động lộ liễu có thể phản tác dụng.",
      "distractors": [
        "Nhận thêm mà không bỏ bớt chỉ là hoãn lời từ chối, không phải tránh được nó.",
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk"
      ]
    }
  ],
  "151": [
    {
      "fromDay": 146,
      "fromTitle": "Lãi suất thực vs Lãi suất danh nghĩa",
      "text": "Lãi suất thực ≈ Lãi suất danh nghĩa − Lạm phát",
      "distractors": [
        "Nhiều thực hành đúng ở quy mô nhỏ trở thành sai ở quy mô lớn, và ngược lại.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    },
    {
      "fromDay": 139,
      "fromTitle": "Quyền riêng tư: nghĩa vụ đi kèm mỗi trường dữ liệu",
      "text": "Mỗi trường dữ liệu cá nhân cần mục đích rõ ràng và một thời hạn.",
      "distractors": [
        "Đồng ý với tất cả làm mọi bên cùng thất vọng, chỉ là muộn hơn.",
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk"
      ]
    }
  ],
  "152": [
    {
      "fromDay": 147,
      "fromTitle": "Chính sách tiền tệ và lãi suất",
      "text": "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
      "distractors": [
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk",
        "Credit spread = yield corporate − yield risk-free"
      ]
    },
    {
      "fromDay": 140,
      "fromTitle": "Ôn tập: bảo mật là chuỗi quyết định, không phải danh sách việc",
      "text": "Phân quyền cần cả vai trò lẫn quan hệ với chính bản ghi đang được yêu cầu.",
      "distractors": [
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk",
        "Dừng lại vì đã học được điều gì đó không phải thất bại."
      ]
    }
  ],
  "153": [
    {
      "fromDay": 148,
      "fromTitle": "Lạm phát và tác động đến đầu tư",
      "text": "Lãi suất thực âm = tích lũy tiền mặt mất sức mua",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk"
      ]
    },
    {
      "fromDay": 141,
      "fromTitle": "Trái phiếu là gì?",
      "text": "Trái phiếu = cho vay, nhận coupon + hoàn vốn khi đáo hạn",
      "distractors": [
        "Giả thuyết vấn đề không đủ đau nên được kiểm trước vì nó rẻ nhất và khó chịu nhất.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    }
  ],
  "154": [
    {
      "fromDay": 149,
      "fromTitle": "Credit Spread",
      "text": "Credit spread = yield corporate − yield risk-free",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk"
      ]
    },
    {
      "fromDay": 142,
      "fromTitle": "Giá trái phiếu và lãi suất",
      "text": "Lãi suất tăng → giá trái phiếu giảm (và ngược lại)",
      "distractors": [
        "Đưa ra phương án kèm hệ quả, thay vì đưa ra kết luận đã chốt.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    }
  ],
  "155": [
    {
      "fromDay": 150,
      "fromTitle": "Trái phiếu doanh nghiệp Việt Nam",
      "text": "TPDN VN: phát triển nhanh nhưng thiếu minh bạch",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 143,
      "fromTitle": "Yield to Maturity (YTM)",
      "text": "YTM = lợi suất thực nếu giữ đến đáo hạn",
      "distractors": [
        "Lát cắt đầu tiên nhắm vào giả định rủi ro nhất.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    }
  ],
  "156": [
    {
      "fromDay": 151,
      "fromTitle": "Rủi ro vỡ nợ và Default Rate",
      "text": "Expected Loss = PD × LGD",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 144,
      "fromTitle": "Credit Rating (Xếp hạng tín dụng)",
      "text": "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk",
      "distractors": [
        "Chia theo nhóm và theo bước làm lộ ra thứ con số tổng che đi.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    }
  ],
  "157": [
    {
      "fromDay": 152,
      "fromTitle": "Ôn tập: Trái phiếu & Lãi suất",
      "text": "Lãi suất: công cụ điều hành kinh tế mạnh nhất",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 145,
      "fromTitle": "Yield Curve",
      "text": "Yield curve: lợi suất trái phiếu theo kỳ hạn",
      "distractors": [
        "Chi phí phối hợp tăng theo bình phương số người, năng lực chỉ tăng tuyến tính.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    }
  ],
  "158": [
    {
      "fromDay": 153,
      "fromTitle": "Default là gì?",
      "text": "Default: vi phạm nghĩa vụ trả nợ, không nhất thiết là phá sản",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    },
    {
      "fromDay": 146,
      "fromTitle": "Lãi suất thực vs Lãi suất danh nghĩa",
      "text": "Lãi suất thực ≈ Lãi suất danh nghĩa − Lạm phát",
      "distractors": [
        "Mỗi phần mã nên có đúng một đội chịu trách nhiệm.",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    }
  ],
  "159": [
    {
      "fromDay": 154,
      "fromTitle": "Spread là gì?",
      "text": "Spread = Yield rủi ro − Yield phi rủi ro cùng kỳ hạn",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 147,
      "fromTitle": "Chính sách tiền tệ và lãi suất",
      "text": "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
      "distractors": [
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk",
        "Credit spread = yield corporate − yield risk-free"
      ]
    }
  ],
  "160": [
    {
      "fromDay": 155,
      "fromTitle": "Treasury Bond là gì?",
      "text": "Treasury bond: chuẩn tham chiếu risk-free toàn cầu",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 148,
      "fromTitle": "Lạm phát và tác động đến đầu tư",
      "text": "Lãi suất thực âm = tích lũy tiền mặt mất sức mua",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk"
      ]
    }
  ],
  "161": [
    {
      "fromDay": 156,
      "fromTitle": "Corporate Bond là gì?",
      "text": "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Default: vi phạm nghĩa vụ trả nợ, không nhất thiết là phá sản"
      ]
    },
    {
      "fromDay": 149,
      "fromTitle": "Credit Spread",
      "text": "Credit spread = yield corporate − yield risk-free",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "AAA→BBB: Investment Grade; BB và thấp hơn: High-Yield/Junk"
      ]
    }
  ],
  "162": [
    {
      "fromDay": 157,
      "fromTitle": "Municipal Bond là gì?",
      "text": "Municipal bond: tài trợ hạ tầng công cộng ở cấp địa phương",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 150,
      "fromTitle": "Trái phiếu doanh nghiệp Việt Nam",
      "text": "TPDN VN: phát triển nhanh nhưng thiếu minh bạch",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "163": [
    {
      "fromDay": 158,
      "fromTitle": "Yield Curve là gì?",
      "text": "Yield curve bình thường: dốc lên, kỳ hạn dài lợi suất cao hơn",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 151,
      "fromTitle": "Rủi ro vỡ nợ và Default Rate",
      "text": "Expected Loss = PD × LGD",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "164": [
    {
      "fromDay": 159,
      "fromTitle": "Case nhỏ - Đọc đường cong lợi suất",
      "text": "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
      "distractors": [
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư",
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)"
      ]
    },
    {
      "fromDay": 152,
      "fromTitle": "Ôn tập: Trái phiếu & Lãi suất",
      "text": "Lãi suất: công cụ điều hành kinh tế mạnh nhất",
      "distractors": [
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "165": [
    {
      "fromDay": 160,
      "fromTitle": "Tổng ôn Chặng Trái phiếu, lãi suất và tín dụng - Trái phiếu là thế giới của lãi suất và niềm tin",
      "text": "Trái phiếu vận hành trên hai trục: giá trị thời gian của tiền và niềm tin tín dụng",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 153,
      "fromTitle": "Default là gì?",
      "text": "Default: vi phạm nghĩa vụ trả nợ, không nhất thiết là phá sản",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Lãi suất = công cụ chính sách tiền tệ chủ yếu"
      ]
    }
  ],
  "166": [
    {
      "fromDay": 161,
      "fromTitle": "Portfolio là gì?",
      "text": "Portfolio: tập hợp tài sản được quản lý như một thể thống nhất",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 154,
      "fromTitle": "Spread là gì?",
      "text": "Spread = Yield rủi ro − Yield phi rủi ro cùng kỳ hạn",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "167": [
    {
      "fromDay": 162,
      "fromTitle": "Vì sao không nên nhìn từng khoản đầu tư riêng lẻ?",
      "text": "Rủi ro của một tài sản riêng lẻ không phản ánh đúng đóng góp của nó vào rủi ro danh mục",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    },
    {
      "fromDay": 155,
      "fromTitle": "Treasury Bond là gì?",
      "text": "Treasury bond: chuẩn tham chiếu risk-free toàn cầu",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "168": [
    {
      "fromDay": 163,
      "fromTitle": "Diversification - Đa dạng hóa",
      "text": "Đa dạng hóa: phân bổ vốn vào nhiều tài sản để giảm rủi ro không hệ thống",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)"
      ]
    },
    {
      "fromDay": 156,
      "fromTitle": "Corporate Bond là gì?",
      "text": "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Default: vi phạm nghĩa vụ trả nợ, không nhất thiết là phá sản"
      ]
    }
  ],
  "169": [
    {
      "fromDay": 164,
      "fromTitle": "Correlation - Tương quan giữa các tài sản",
      "text": "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Đa dạng hóa: phân bổ vốn vào nhiều tài sản để giảm rủi ro không hệ thống"
      ]
    },
    {
      "fromDay": 157,
      "fromTitle": "Municipal Bond là gì?",
      "text": "Municipal bond: tài trợ hạ tầng công cộng ở cấp địa phương",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "170": [
    {
      "fromDay": 165,
      "fromTitle": "Volatility - Biến động",
      "text": "Volatility: thước đo mức độ dao động giá của một tài sản",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)"
      ]
    },
    {
      "fromDay": 158,
      "fromTitle": "Yield Curve là gì?",
      "text": "Yield curve bình thường: dốc lên, kỳ hạn dài lợi suất cao hơn",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "171": [
    {
      "fromDay": 166,
      "fromTitle": "Standard Deviation trong đầu tư",
      "text": "Standard deviation: công cụ toán học chính xác đo mức độ phân tán của lợi suất",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)"
      ]
    },
    {
      "fromDay": 159,
      "fromTitle": "Case nhỏ - Đọc đường cong lợi suất",
      "text": "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
      "distractors": [
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư",
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)"
      ]
    }
  ],
  "172": [
    {
      "fromDay": 167,
      "fromTitle": "Expected Return của danh mục",
      "text": "Expected Return của danh mục = trung bình có trọng số theo tỷ trọng từng tài sản",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    },
    {
      "fromDay": 160,
      "fromTitle": "Tổng ôn Chặng Trái phiếu, lãi suất và tín dụng - Trái phiếu là thế giới của lãi suất và niềm tin",
      "text": "Trái phiếu vận hành trên hai trục: giá trị thời gian của tiền và niềm tin tín dụng",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "173": [
    {
      "fromDay": 168,
      "fromTitle": "Risk-Return Tradeoff",
      "text": "Risk-return tradeoff: lợi nhuận kỳ vọng cao hơn luôn đi kèm rủi ro cao hơn",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    },
    {
      "fromDay": 161,
      "fromTitle": "Portfolio là gì?",
      "text": "Portfolio: tập hợp tài sản được quản lý như một thể thống nhất",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "174": [
    {
      "fromDay": 169,
      "fromTitle": "Modern Portfolio Theory là gì?",
      "text": "MPT: nền tảng toán học để xây dựng danh mục tối ưu dựa trên return, risk, correlation",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 162,
      "fromTitle": "Vì sao không nên nhìn từng khoản đầu tư riêng lẻ?",
      "text": "Rủi ro của một tài sản riêng lẻ không phản ánh đúng đóng góp của nó vào rủi ro danh mục",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Corporate bond: doanh nghiệp vay trực tiếp từ nhà đầu tư"
      ]
    }
  ],
  "175": [
    {
      "fromDay": 170,
      "fromTitle": "Efficient Frontier là gì?",
      "text": "Efficient Frontier: tập hợp các danh mục tối ưu cho mỗi mức rủi ro",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 163,
      "fromTitle": "Diversification - Đa dạng hóa",
      "text": "Đa dạng hóa: phân bổ vốn vào nhiều tài sản để giảm rủi ro không hệ thống",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)"
      ]
    }
  ],
  "176": [
    {
      "fromDay": 171,
      "fromTitle": "Sharpe Ratio là gì?",
      "text": "Sharpe Ratio = (Return − Risk-free rate) / Độ lệch chuẩn",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 164,
      "fromTitle": "Correlation - Tương quan giữa các tài sản",
      "text": "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Đa dạng hóa: phân bổ vốn vào nhiều tài sản để giảm rủi ro không hệ thống"
      ]
    }
  ],
  "177": [
    {
      "fromDay": 172,
      "fromTitle": "Alpha là gì?",
      "text": "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    },
    {
      "fromDay": 165,
      "fromTitle": "Volatility - Biến động",
      "text": "Volatility: thước đo mức độ dao động giá của một tài sản",
      "distractors": [
        "Đọc yield curve: so sánh lợi suất ngắn hạn và dài hạn để nhận diện xu hướng",
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)"
      ]
    }
  ],
  "178": [
    {
      "fromDay": 173,
      "fromTitle": "Beta trong danh mục",
      "text": "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 166,
      "fromTitle": "Standard Deviation trong đầu tư",
      "text": "Standard deviation: công cụ toán học chính xác đo mức độ phân tán của lợi suất",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
        "Correlation đo mức độ hai tài sản di chuyển cùng/ngược chiều (từ -1 đến +1)"
      ]
    }
  ],
  "179": [
    {
      "fromDay": 174,
      "fromTitle": "Tracking Error là gì?",
      "text": "Tracking Error: đo mức độ lệch giữa lợi suất quỹ và benchmark nó theo dõi",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 167,
      "fromTitle": "Expected Return của danh mục",
      "text": "Expected Return của danh mục = trung bình có trọng số theo tỷ trọng từng tài sản",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    }
  ],
  "180": [
    {
      "fromDay": 175,
      "fromTitle": "Active vs Passive Investing",
      "text": "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    },
    {
      "fromDay": 168,
      "fromTitle": "Risk-Return Tradeoff",
      "text": "Risk-return tradeoff: lợi nhuận kỳ vọng cao hơn luôn đi kèm rủi ro cao hơn",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    }
  ],
  "181": [
    {
      "fromDay": 176,
      "fromTitle": "ETF là gì?",
      "text": "ETF: quỹ chứa rổ tài sản nhưng giao dịch linh hoạt như một cổ phiếu",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 169,
      "fromTitle": "Modern Portfolio Theory là gì?",
      "text": "MPT: nền tảng toán học để xây dựng danh mục tối ưu dựa trên return, risk, correlation",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    }
  ],
  "182": [
    {
      "fromDay": 177,
      "fromTitle": "Mutual Fund là gì?",
      "text": "Mutual Fund: quỹ tương hỗ, định giá và giao dịch một lần mỗi ngày theo NAV",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 170,
      "fromTitle": "Efficient Frontier là gì?",
      "text": "Efficient Frontier: tập hợp các danh mục tối ưu cho mỗi mức rủi ro",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    }
  ],
  "183": [
    {
      "fromDay": 178,
      "fromTitle": "Hedge Fund là gì?",
      "text": "Hedge fund: quỹ tư nhân linh hoạt, ít bị ràng buộc quy định hơn mutual fund/ETF",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    },
    {
      "fromDay": 171,
      "fromTitle": "Sharpe Ratio là gì?",
      "text": "Sharpe Ratio = (Return − Risk-free rate) / Độ lệch chuẩn",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    }
  ],
  "184": [
    {
      "fromDay": 179,
      "fromTitle": "Case nhỏ - Xây danh mục 3 tài sản",
      "text": "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    },
    {
      "fromDay": 172,
      "fromTitle": "Alpha là gì?",
      "text": "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    }
  ],
  "185": [
    {
      "fromDay": 180,
      "fromTitle": "Tổng ôn Chặng Danh mục đầu tư và quản trị rủi ro - Đầu tư là quản lý rủi ro, không chỉ săn lợi nhuận",
      "text": "Đầu tư thành công là quản lý rủi ro có hệ thống, không chỉ săn lợi nhuận cao nhất",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Call option: quyền mua ở strike price, có lợi khi giá tăng"
      ]
    },
    {
      "fromDay": 173,
      "fromTitle": "Beta trong danh mục",
      "text": "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    }
  ],
  "186": [
    {
      "fromDay": 181,
      "fromTitle": "Derivatives là gì?",
      "text": "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Call option: quyền mua ở strike price, có lợi khi giá tăng"
      ]
    },
    {
      "fromDay": 174,
      "fromTitle": "Tracking Error là gì?",
      "text": "Tracking Error: đo mức độ lệch giữa lợi suất quỹ và benchmark nó theo dõi",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    }
  ],
  "187": [
    {
      "fromDay": 182,
      "fromTitle": "Forward Contract là gì?",
      "text": "Forward: hợp đồng riêng tư (OTC), khóa giá mua/bán trong tương lai",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản"
      ]
    },
    {
      "fromDay": 175,
      "fromTitle": "Active vs Passive Investing",
      "text": "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
      "distractors": [
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    }
  ],
  "188": [
    {
      "fromDay": 183,
      "fromTitle": "Futures Contract là gì?",
      "text": "Futures: chuẩn hóa, giao dịch qua sàn, có clearing house đảm bảo",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản"
      ]
    },
    {
      "fromDay": 176,
      "fromTitle": "ETF là gì?",
      "text": "ETF: quỹ chứa rổ tài sản nhưng giao dịch linh hoạt như một cổ phiếu",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    }
  ],
  "189": [
    {
      "fromDay": 184,
      "fromTitle": "Option là gì?",
      "text": "Option: quyền (không phải nghĩa vụ) mua/bán ở strike price",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản"
      ]
    },
    {
      "fromDay": 177,
      "fromTitle": "Mutual Fund là gì?",
      "text": "Mutual Fund: quỹ tương hỗ, định giá và giao dịch một lần mỗi ngày theo NAV",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    }
  ],
  "190": [
    {
      "fromDay": 185,
      "fromTitle": "Call Option là gì?",
      "text": "Call option: quyền mua ở strike price, có lợi khi giá tăng",
      "distractors": [
        "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản",
        "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác"
      ]
    },
    {
      "fromDay": 178,
      "fromTitle": "Hedge Fund là gì?",
      "text": "Hedge fund: quỹ tư nhân linh hoạt, ít bị ràng buộc quy định hơn mutual fund/ETF",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Alpha: lợi nhuận vượt trội so với benchmark sau khi điều chỉnh rủi ro"
      ]
    }
  ],
  "191": [
    {
      "fromDay": 186,
      "fromTitle": "Put Option là gì?",
      "text": "Put option: quyền bán ở strike price, có lợi khi giá giảm",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác"
      ]
    },
    {
      "fromDay": 179,
      "fromTitle": "Case nhỏ - Xây danh mục 3 tài sản",
      "text": "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Beta đo độ nhạy cảm của danh mục so với biến động chung của thị trường"
      ]
    }
  ],
  "192": [
    {
      "fromDay": 187,
      "fromTitle": "Strike Price và Expiration Date",
      "text": "Strike price gần giá thị trường hơn → premium cao hơn (với option có lợi)",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau"
      ]
    },
    {
      "fromDay": 180,
      "fromTitle": "Tổng ôn Chặng Danh mục đầu tư và quản trị rủi ro - Đầu tư là quản lý rủi ro, không chỉ săn lợi nhuận",
      "text": "Đầu tư thành công là quản lý rủi ro có hệ thống, không chỉ săn lợi nhuận cao nhất",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Call option: quyền mua ở strike price, có lợi khi giá tăng"
      ]
    }
  ],
  "193": [
    {
      "fromDay": 188,
      "fromTitle": "Intrinsic Value và Time Value",
      "text": "Option Price = Intrinsic Value + Time Value",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau"
      ]
    },
    {
      "fromDay": 181,
      "fromTitle": "Derivatives là gì?",
      "text": "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác",
      "distractors": [
        "Active investing: cố gắng vượt trội thị trường, chi phí cao hơn",
        "Call option: quyền mua ở strike price, có lợi khi giá tăng"
      ]
    }
  ],
  "194": [
    {
      "fromDay": 189,
      "fromTitle": "Hedging là gì?",
      "text": "Hedging: giảm rủi ro đã có sẵn, không tạo thêm rủi ro mới",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau"
      ]
    },
    {
      "fromDay": 182,
      "fromTitle": "Forward Contract là gì?",
      "text": "Forward: hợp đồng riêng tư (OTC), khóa giá mua/bán trong tương lai",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản"
      ]
    }
  ],
  "195": [
    {
      "fromDay": 190,
      "fromTitle": "Speculation là gì?",
      "text": "Speculation: đặt cược vào hướng giá để kiếm lời, không có rủi ro nền tảng cần bảo vệ",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    },
    {
      "fromDay": 183,
      "fromTitle": "Futures Contract là gì?",
      "text": "Futures: chuẩn hóa, giao dịch qua sàn, có clearing house đảm bảo",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản"
      ]
    }
  ],
  "196": [
    {
      "fromDay": 191,
      "fromTitle": "Swap là gì?",
      "text": "Swap: hoán đổi dòng tiền tương lai theo công thức đã thỏa thuận",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    },
    {
      "fromDay": 184,
      "fromTitle": "Option là gì?",
      "text": "Option: quyền (không phải nghĩa vụ) mua/bán ở strike price",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản"
      ]
    }
  ],
  "197": [
    {
      "fromDay": 192,
      "fromTitle": "Interest Rate Swap",
      "text": "IRS: hoán đổi dòng lãi suất cố định và thả nổi giữa hai bên",
      "distractors": [
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
        "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu"
      ]
    },
    {
      "fromDay": 185,
      "fromTitle": "Call Option là gì?",
      "text": "Call option: quyền mua ở strike price, có lợi khi giá tăng",
      "distractors": [
        "Xây dựng danh mục thực tế cần kết hợp expected return, volatility và correlation của từng cặp tài sản",
        "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác"
      ]
    }
  ],
  "198": [
    {
      "fromDay": 193,
      "fromTitle": "Currency Swap",
      "text": "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau",
      "distractors": [
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
        "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu"
      ]
    },
    {
      "fromDay": 186,
      "fromTitle": "Put Option là gì?",
      "text": "Put option: quyền bán ở strike price, có lợi khi giá giảm",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Derivatives: giá trị phụ thuộc vào một tài sản cơ sở khác"
      ]
    }
  ],
  "199": [
    {
      "fromDay": 194,
      "fromTitle": "Vì sao doanh nghiệp dùng phái sinh để phòng hộ?",
      "text": "Mục tiêu hedging: giảm bất định, không phải tối đa hóa lợi nhuận",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    },
    {
      "fromDay": 187,
      "fromTitle": "Strike Price và Expiration Date",
      "text": "Strike price gần giá thị trường hơn → premium cao hơn (với option có lợi)",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau"
      ]
    }
  ],
  "200": [
    {
      "fromDay": 195,
      "fromTitle": "Vì sao phái sinh có thể rất nguy hiểm?",
      "text": "Đòn bẩy cao khuếch đại cả lãi và lỗ trên vốn bỏ ra",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    },
    {
      "fromDay": 188,
      "fromTitle": "Intrinsic Value và Time Value",
      "text": "Option Price = Intrinsic Value + Time Value",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau"
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
      "fromTitle": "Case nhỏ - Hãng hàng không phòng hộ giá dầu",
      "text": "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu"
      ]
    },
    {
      "fromDay": 189,
      "fromTitle": "Hedging là gì?",
      "text": "Hedging: giảm rủi ro đã có sẵn, không tạo thêm rủi ro mới",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau"
      ]
    }
  ],
  "1102": [
    {
      "fromDay": 197,
      "fromTitle": "Case nhỏ - Doanh nghiệp xuất khẩu phòng hộ tỷ giá",
      "text": "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    },
    {
      "fromDay": 190,
      "fromTitle": "Speculation là gì?",
      "text": "Speculation: đặt cược vào hướng giá để kiếm lời, không có rủi ro nền tảng cần bảo vệ",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    }
  ],
  "1103": [
    {
      "fromDay": 198,
      "fromTitle": "Tổng ôn công cụ phái sinh",
      "text": "Bốn công cụ phái sinh chính đều xoay quanh việc chuyển giao rủi ro có cấu trúc",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    },
    {
      "fromDay": 191,
      "fromTitle": "Swap là gì?",
      "text": "Swap: hoán đổi dòng tiền tương lai theo công thức đã thỏa thuận",
      "distractors": [
        "Call option: quyền mua ở strike price, có lợi khi giá tăng",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    }
  ],
  "1104": [
    {
      "fromDay": 199,
      "fromTitle": "Kết nối tất cả - Báo cáo tài chính, Định giá, Rủi ro, Thị trường",
      "text": "Phân tích tài chính toàn diện kết nối bốn lớp: kế toán, định giá, rủi ro, thị trường",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    },
    {
      "fromDay": 192,
      "fromTitle": "Interest Rate Swap",
      "text": "IRS: hoán đổi dòng lãi suất cố định và thả nổi giữa hai bên",
      "distractors": [
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
        "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu"
      ]
    }
  ],
  "1105": [
    {
      "fromDay": 200,
      "fromTitle": "Bài cuối - Tự phân tích một doanh nghiệp hoàn chỉnh từ A đến Z",
      "text": "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
      "distractors": [
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
        "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu"
      ]
    },
    {
      "fromDay": 193,
      "fromTitle": "Currency Swap",
      "text": "Currency swap: hoán đổi dòng tiền và có thể cả notional bằng hai loại tiền tệ khác nhau",
      "distractors": [
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
        "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu"
      ]
    }
  ],
  "1106": [
    {
      "fromDay": 1101,
      "fromTitle": "IB & Phân tích, Bài 1: Quality of Earnings - đọc lợi nhuận như nhà phân tích thực thụ",
      "text": "Quality of Earnings đánh giá lợi nhuận đến từ hoạt động lõi bền vững hay các khoản một lần không lặp lại",
      "distractors": [
        "Nên trình bày một vùng định giá tổng hợp từ nhiều phương pháp (football field chart), không chốt một con số tuyệt đối",
        "Comps thực chiến cần tinh chỉnh sâu hơn mã ngành: quy mô, tăng trưởng, biên lợi nhuận, mô hình kinh doanh tương đồng"
      ]
    },
    {
      "fromDay": 194,
      "fromTitle": "Vì sao doanh nghiệp dùng phái sinh để phòng hộ?",
      "text": "Mục tiêu hedging: giảm bất định, không phải tối đa hóa lợi nhuận",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    }
  ],
  "1107": [
    {
      "fromDay": 1102,
      "fromTitle": "IB & Phân tích, Bài 2: Comps thực chiến - chọn công ty so sánh đúng cách",
      "text": "Comps thực chiến cần tinh chỉnh sâu hơn mã ngành: quy mô, tăng trưởng, biên lợi nhuận, mô hình kinh doanh tương đồng",
      "distractors": [
        "Nên trình bày một vùng định giá tổng hợp từ nhiều phương pháp (football field chart), không chốt một con số tuyệt đối",
        "Equity analyst quan tâm upside tăng trưởng; credit analyst quan tâm downside protection - khả năng trả nợ đúng hạn"
      ]
    },
    {
      "fromDay": 195,
      "fromTitle": "Vì sao phái sinh có thể rất nguy hiểm?",
      "text": "Đòn bẩy cao khuếch đại cả lãi và lỗ trên vốn bỏ ra",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    }
  ],
  "1108": [
    {
      "fromDay": 1103,
      "fromTitle": "IB & Phân tích, Bài 3: Precedent Transactions - định giá qua thương vụ M&A quá khứ",
      "text": "Precedent Transactions thường có bội số cao hơn Comps vì bao gồm control premium",
      "distractors": [
        "Nên trình bày một vùng định giá tổng hợp từ nhiều phương pháp (football field chart), không chốt một con số tuyệt đối",
        "Comps thực chiến cần tinh chỉnh sâu hơn mã ngành: quy mô, tăng trưởng, biên lợi nhuận, mô hình kinh doanh tương đồng"
      ]
    },
    {
      "fromDay": 196,
      "fromTitle": "Case nhỏ - Hãng hàng không phòng hộ giá dầu",
      "text": "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu"
      ]
    }
  ],
  "1109": [
    {
      "fromDay": 1104,
      "fromTitle": "IB & Phân tích, Bài 4: Credit Analysis cơ bản cho nhà phân tích tín dụng",
      "text": "Equity analyst quan tâm upside tăng trưởng; credit analyst quan tâm downside protection - khả năng trả nợ đúng hạn",
      "distractors": [
        "Nên trình bày một vùng định giá tổng hợp từ nhiều phương pháp (football field chart), không chốt một con số tuyệt đối",
        "Comps thực chiến cần tinh chỉnh sâu hơn mã ngành: quy mô, tăng trưởng, biên lợi nhuận, mô hình kinh doanh tương đồng"
      ]
    },
    {
      "fromDay": 197,
      "fromTitle": "Case nhỏ - Doanh nghiệp xuất khẩu phòng hộ tỷ giá",
      "text": "Forward tỷ giá: công cụ phổ biến nhất để hedging rủi ro tỷ giá xuất nhập khẩu",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    }
  ],
  "1110": [
    {
      "fromDay": 1105,
      "fromTitle": "IB & Phân tích, Bài 5: Case tổng hợp - định giá một công ty bằng nhiều phương pháp",
      "text": "Nên trình bày một vùng định giá tổng hợp từ nhiều phương pháp (football field chart), không chốt một con số tuyệt đối",
      "distractors": [
        "Comps thực chiến cần tinh chỉnh sâu hơn mã ngành: quy mô, tăng trưởng, biên lợi nhuận, mô hình kinh doanh tương đồng",
        "Equity analyst quan tâm upside tăng trưởng; credit analyst quan tâm downside protection - khả năng trả nợ đúng hạn"
      ]
    },
    {
      "fromDay": 198,
      "fromTitle": "Tổng ôn công cụ phái sinh",
      "text": "Bốn công cụ phái sinh chính đều xoay quanh việc chuyển giao rủi ro có cấu trúc",
      "distractors": [
        "Tài chính là hệ thống liên kết từ kế toán đến phái sinh, không phải các module rời rạc",
        "Hedging thực tế thường chỉ áp dụng cho một tỷ lệ nhu cầu, không phải 100%"
      ]
    }
  ]
};
