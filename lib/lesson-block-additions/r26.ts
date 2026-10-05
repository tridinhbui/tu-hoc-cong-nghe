import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r26. Một người viết cho một tệp.
export const R26_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "chuong-trinh-la-gi": [
    {
      "type": "scenario",
      "title": "Hai dòng báo lỗi, hai kiểu sai",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn viết script tính tiền sau giảm giá. Vừa bấm chạy, màn hình báo lỗi cú pháp ở dòng 12 và không in thêm gì. Bạn làm gì trước?",
          "choices": [
            {
              "label": "Chạy lại vài lần xem lỗi có tự hết không",
              "next": "a"
            },
            {
              "label": "Đọc dòng 12 và dòng ngay phía trên nó",
              "next": "b"
            },
            {
              "label": "Xoá file rồi viết lại từ đầu cho chắc",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Lỗi cú pháp là lỗi hình thức, không phụ thuộc may rủi: chạy bao nhiêu lần máy cũng dừng đúng chỗ đó. Bạn mất mười phút để nhận lại đúng thông báo cũ.",
          "ending": "bad"
        },
        "c": {
          "text": "Bản viết lại vẫn quên một dấu ngoặc ở chỗ khác, vì bạn chưa hiểu lỗi cũ nằm ở đâu. Cả buổi chiều mất đi mà lỗi gốc còn nguyên.",
          "ending": "bad"
        },
        "b": {
          "text": "Dòng 11 thiếu một dấu ngoặc đóng, và máy chỉ phát hiện ra khi đọc tới dòng 12. Bạn thêm dấu ngoặc, chạy lại, và chương trình in kết quả: đơn 100 giảm 10% cho ra 90 thay vì 10 như bạn định tính tiền giảm. Không có thông báo lỗi nào. Bạn kết luận gì?",
          "choices": [
            {
              "label": "Không có lỗi hiện ra thì chương trình đúng, gửi cho khách",
              "next": "d"
            },
            {
              "label": "Máy cộng sai, thử lại trên một máy khác",
              "next": "e"
            },
            {
              "label": "Máy làm đúng điều tôi viết, nên tôi phải đọc lại công thức",
              "next": "g"
            }
          ]
        },
        "d": {
          "text": "Khách nhận bảng tiền giảm sai ở mọi đơn. Lỗi logic không bao giờ tự báo, nên nó nằm im cho tới khi một người đọc kết quả và thấy lạ.",
          "ending": "bad"
        },
        "e": {
          "text": "Máy khác in ra đúng con số cũ, vì cả hai đều làm đúng từng chữ bạn viết. Bạn nghi ngờ phần cứng trong khi lỗi nằm ở công thức.",
          "ending": "bad"
        },
        "g": {
          "text": "Bạn thấy công thức trừ phần giảm đi chứ không trả về phần giảm. Sửa một dòng, chạy lại, ra 10. Bạn cũng ghi nhớ: lỗi cú pháp thì máy chỉ ra, lỗi logic thì chỉ mình bạn thấy.",
          "ending": "good"
        }
      }
    }
  ],

  "bien-va-phep-gan": [
    {
      "type": "scenario",
      "title": "Danh sách giá bị đổi khi bạn không đụng tới",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn gán gia_goc = 100, rồi viết gia_giam = gia_goc, sau đó cộng gia_goc thêm 50 cho đợt tăng giá. Khi in ra, gia_giam là bao nhiêu và bạn nên nghĩ thế nào?",
          "choices": [
            {
              "label": "150, vì gia_giam đi theo gia_goc như công thức trong bảng tính",
              "next": "a"
            },
            {
              "label": "100, vì phép gán chép giá trị tại đúng dòng đó, một lần",
              "next": "b"
            },
            {
              "label": "Báo lỗi, vì hai biến không được trỏ cùng một giá trị",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Bạn viết tiếp mã dựa vào ý nghĩ đó và báo giá giảm 150 cho khách. Gán không phải liên kết sống: gia_giam đã nhận 100 từ dòng gán và đứng yên ở đó.",
          "ending": "bad"
        },
        "c": {
          "text": "Chương trình không báo lỗi nào cả, vì nhiều tên cùng trỏ vào một giá trị là chuyện bình thường. Bạn tìm một lỗi không tồn tại và bỏ sót lỗi thật là con số sai.",
          "ending": "bad"
        },
        "b": {
          "text": "Đúng, gia_giam vẫn là 100. Giờ bạn cần gia_giam bằng 90% của gia_goc mới, sau đợt tăng giá. Bạn làm gì?",
          "choices": [
            {
              "label": "Gán lại gia_giam = gia_goc * 0.9 sau khi gia_goc đổi",
              "next": "d"
            },
            {
              "label": "Chỉ sửa gia_goc, vì gia_giam sẽ tự cập nhật theo nó",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Bạn tính lại tại đúng thời điểm cần: gia_giam ra 135 và khớp với giá mới 150. Mỗi lần giá gốc đổi, bạn biết phải gán lại một dòng.",
          "ending": "good"
        },
        "e": {
          "text": "gia_giam vẫn là giá cũ nên bảng giá cuối tháng lệch ở mọi mặt hàng. Bạn đang chờ một sự cập nhật mà phép gán không bao giờ làm.",
          "ending": "bad"
        }
      }
    }
  ],

  "kieu-du-lieu-co-ban": [
    {
      "type": "aiLab",
      "mode": "spotError",
      "title": "Bản nháp giải thích kiểu dữ liệu của một công cụ AI",
      "task": "Một công cụ AI soạn đoạn ghi chú cho người mới về kiểu dữ liệu. Bấm vào những câu sai theo đúng điều bài vừa dạy rồi nộp.",
      "segments": [
        {
          "text": "Dữ liệu đọc từ ô nhập liệu hay từ tệp văn bản luôn đến dưới dạng chuỗi."
        },
        {
          "text": "Vì vậy \"25\" + \"1\" cho ra 26, giống như cộng hai số.",
          "error": "Trên chuỗi, dấu cộng là nối chữ nên \"25\" + \"1\" ra \"251\". Muốn cộng số phải đổi kiểu trước, ví dụ int(\"25\") + 1."
        },
        {
          "text": "Số nguyên chính xác tuyệt đối nên phù hợp để đếm và để lưu tiền."
        },
        {
          "text": "Số thực cũng chính xác tuyệt đối nên 0.1 + 0.2 luôn bằng đúng 0.3.",
          "error": "Số thực được lưu ở hệ nhị phân dưới dạng xấp xỉ, nên 0.1 + 0.2 ra 0.30000000000000004. Đừng so số thực bằng dấu bằng; hãy xét chênh lệch có nhỏ hơn một ngưỡng không."
        },
        {
          "text": "Chuyển kiểu tường minh tốt hơn để ngôn ngữ tự đoán, vì tự đoán có thể sai mà không báo."
        }
      ]
    }
  ],

  "chuoi-va-thao-tac-van-ban": [
    {
      "type": "scenario",
      "title": "Khách đăng nhập đúng tên mà vẫn không thấy tài khoản",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Một khách gõ tên \"  Nguyễn Văn An \" ở ô tìm kiếm, còn hệ thống lưu \"nguyễn văn an\". Phép so sánh == cho False và khách báo không tìm thấy tài khoản. Bạn sửa ở đâu?",
          "choices": [
            {
              "label": "Cắt khoảng trắng và đổi chữ thường cả hai vế trước khi so",
              "next": "a"
            },
            {
              "label": "Báo khách gõ lại cho đúng, vì tên phải khớp từng ký tự",
              "next": "b"
            },
            {
              "label": "Lưu thêm một bản tên viết hoa kiểu của khách vào cơ sở dữ liệu",
              "next": "c"
            }
          ]
        },
        "b": {
          "text": "Khách bỏ cuộc sau lần gõ lại thứ hai, vì họ không thấy gì khác giữa hai chuỗi trên màn hình. Lỗi nằm ở dấu cách thừa mà mắt không nhìn ra.",
          "ending": "bad"
        },
        "c": {
          "text": "Mỗi kiểu gõ của mỗi khách lại thêm một bản ghi. Sau một tháng bảng khách có nhiều dòng trùng và vẫn còn người không tìm được.",
          "ending": "bad"
        },
        "a": {
          "text": "Tìm kiếm chạy ngay. Bạn viết một hàm chuẩn hoá và dùng ở mọi ô tìm kiếm. Giờ có thêm một chỗ: mã khuyến mãi dài 8 ký tự, bạn cắt chuỗi lấy 8 ký tự đầu. Tên kiểu \"Đặng\" bị lỗi hiển thị lạ khi cắt. Bạn xử lý thế nào?",
          "choices": [
            {
              "label": "Cắt theo ký tự chứ không theo byte, rồi thử tên có dấu",
              "next": "d"
            },
            {
              "label": "Bỏ dấu khỏi mọi tên trước khi lưu, để sau này khỏi gặp lỗi hiển thị",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Cắt theo ký tự giữ nguyên chữ có dấu, và cả hai chỗ đều chạy đúng. Bạn thêm vào bộ kiểm thử vài tên có dấu để lần sau lỗi tự lộ ra.",
          "ending": "good"
        },
        "e": {
          "text": "Tên khách mất dấu trên hoá đơn và hai người khác nhau trở thành cùng một tên. Bạn sửa triệu chứng bằng cách làm hỏng dữ liệu gốc.",
          "ending": "bad"
        }
      }
    }
  ],

  "phep-toan-va-bieu-thuc-luan-ly": [
    {
      "type": "scenario",
      "title": "Điều kiện giảm giá cho thành viên",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Luật là: giảm giá nếu khách là thành viên VÀ đơn từ 500 nghìn, HOẶC nếu là ngày khuyến mãi. Đồng nghiệp viết: la_thanh_vien or don >= 500 and la_ngay_km. Khách không phải thành viên, đơn 600 nghìn, hôm nay không khuyến mãi. Điều gì xảy ra?",
          "choices": [
            {
              "label": "Không giảm, đúng luật",
              "next": "a"
            },
            {
              "label": "Không giảm, nhưng chỉ do ngẫu nhiên: biểu thức viết sai",
              "next": "b"
            },
            {
              "label": "Giảm, vì đơn lớn hơn 500 nghìn nên điều kiện thứ hai đã thoả",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Bạn gật đầu vì ví dụ này khớp, rồi đẩy mã lên. Hôm sau một thành viên mua 100 nghìn vào ngày khuyến mãi, và biểu thức vẫn cho kết quả sai ở một ca khác. Một ví dụ khớp không chứng minh biểu thức đúng.",
          "ending": "bad"
        },
        "c": {
          "text": "Với dữ liệu này, phép and được tính trước: don >= 500 and la_ngay_km sai, la_thanh_vien sai, kết quả là sai. Bạn đoán sai kết quả, nên không thấy biểu thức đang lệch khỏi luật.",
          "ending": "bad"
        },
        "b": {
          "text": "Đúng. and được tính trước or, nên biểu thức đọc thành: là thành viên, HOẶC (đơn từ 500 và là ngày khuyến mãi). Bạn muốn sửa cho khớp luật. Bạn làm gì?",
          "choices": [
            {
              "label": "Đặt ngoặc rõ ràng và tách các vế thành biến có tên",
              "next": "d"
            },
            {
              "label": "Đảo thứ tự các vế cho tới khi một ví dụ chạy ra đúng",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Bạn viết du_dieu_kien_thanh_vien = la_thanh_vien and don >= 500, rồi giam = du_dieu_kien_thanh_vien or la_ngay_km. Người đọc sau này hiểu ngay, và bạn thử cả bốn tổ hợp để chắc.",
          "ending": "good"
        },
        "e": {
          "text": "Một ví dụ ra đúng nhưng độ ưu tiên vẫn lệch, nên ca thành viên đơn nhỏ vào ngày thường lại sai. Bạn sửa theo ví dụ chứ không theo luật.",
          "ending": "bad"
        }
      }
    }
  ],

  "cau-dieu-kien-if-else": [
    {
      "type": "scenario",
      "title": "Phân loại điểm: lồng sâu hay trả về sớm",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn nhận một hàm xử lý đơn hàng: if hợp lệ, trong đó if đủ quyền, trong đó if còn hàng, rồi mới tới phần xử lý chính thụt vào ba tầng. Cần thêm một điều kiện kiểm tra địa chỉ. Bạn làm gì?",
          "choices": [
            {
              "label": "Thêm tầng if thứ tư cho kiểm tra địa chỉ, ngay trong tầng thứ ba",
              "next": "a"
            },
            {
              "label": "Tách thành kiểm tra riêng ở đầu hàm, trả về sớm",
              "next": "b"
            },
            {
              "label": "Gộp mọi điều kiện vào một dòng and rất dài và khó đọc",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Bốn tầng nghĩa là mười sáu đường chạy, và không ai nghĩ hết. Tuần sau có đơn hết hàng nhưng vẫn được xử lý, vì một nhánh else bị đặt nhầm tầng.",
          "ending": "bad"
        },
        "c": {
          "text": "Dòng and dài ra đúng nhưng khi đơn bị từ chối, bạn không biết điều kiện nào gây ra. Nhật ký chỉ ghi chung chung là không hợp lệ.",
          "ending": "bad"
        },
        "b": {
          "text": "Mỗi kiểm tra là một dòng ngắn và phần xử lý chính nằm sát lề. Giờ bạn kiểm tra hàm với giá trị biên: số lượng đặt đúng bằng số lượng còn trong kho. Điều kiện nào là đúng?",
          "choices": [
            {
              "label": "Từ chối nếu so_luong >= ton_kho",
              "next": "d"
            },
            {
              "label": "Từ chối nếu so_luong > ton_kho",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Khách đặt đúng bằng số hàng còn lại bị từ chối oan, và kho vẫn còn hàng nằm đó. Biên là nơi dấu lớn hơn và lớn hơn hoặc bằng khác nhau.",
          "ending": "bad"
        },
        "e": {
          "text": "Đơn đúng bằng tồn kho được chấp nhận và đơn thừa một món bị từ chối. Bạn thêm cả hai ca biên vào kiểm thử để dấu so sánh không bị đổi nhầm sau này.",
          "ending": "good"
        }
      }
    }
  ],

  "vong-lap-for-va-while": [
    {
      "type": "scenario",
      "title": "Vòng lặp chạy mãi trong buổi chiều thứ sáu",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Script gửi nhắc nhở dùng vòng while con_lai > 0 để gửi từng thư, nhưng sau khi gửi bạn quên giảm con_lai. Máy quạt rú lên và hộp thư khách nhận hàng trăm thư giống nhau. Việc đầu tiên bạn làm?",
          "choices": [
            {
              "label": "Dừng tiến trình, rồi tìm dòng đưa điều kiện tới điểm dừng",
              "next": "a"
            },
            {
              "label": "Để nó chạy, chắc sớm muộn nó cũng tự xong khi hết việc",
              "next": "b"
            },
            {
              "label": "Thêm lệnh nghỉ một giây giữa các lần gửi cho đỡ nặng máy",
              "next": "c"
            }
          ]
        },
        "b": {
          "text": "Vòng while không có điều kiện dừng sẽ không bao giờ xong. Tới tối, hàng nghìn thư đã gửi và nhà cung cấp khoá tài khoản gửi mail của bạn.",
          "ending": "bad"
        },
        "c": {
          "text": "Máy đỡ nóng nhưng khách vẫn nhận thư lặp, chỉ chậm hơn. Bạn chữa triệu chứng về tải mà không chạm tới lỗi vô hạn.",
          "ending": "bad"
        },
        "a": {
          "text": "Bạn thêm con_lai = con_lai - 1 sau mỗi lần gửi. Rồi bạn nghĩ tới cách tránh hẳn nhóm lỗi này: danh sách người nhận đã có sẵn, nên bạn có thể duyệt từng phần tử. Bạn chọn gì?",
          "choices": [
            {
              "label": "Chuyển sang for nguoi in danh_sach_nguoi_nhan",
              "next": "d"
            },
            {
              "label": "Giữ while nhưng tự đếm chỉ số và dừng khi chỉ số bằng độ dài",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Số lần lặp được xác định ngay từ lúc bắt đầu, nên vòng lặp không thể chạy vô hạn và không còn chỗ cho lỗi lệch một đơn vị.",
          "ending": "good"
        },
        "e": {
          "text": "Chỉ số được cộng sau một lệnh continue nên có nhánh không bao giờ cộng, và vòng lặp lại treo. Bạn tự mở lại đúng cánh cửa của lỗi vô hạn và lỗi lệch một đơn vị.",
          "ending": "bad"
        }
      }
    }
  ],

  "danh-sach-cau-truc-du-lieu-dau-tien": [
    {
      "type": "scenario",
      "title": "Hai giỏ hàng, một danh sách",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn viết gio_a = [\"bút\", \"vở\"], rồi gio_b = gio_a để làm giỏ cho khách thứ hai, rồi thêm \"thước\" vào gio_b. Khách thứ nhất phàn nàn trong giỏ có món mình không chọn. Nguyên nhân?",
          "choices": [
            {
              "label": "Hai tên cùng trỏ vào một danh sách, sửa qua tên nào cũng đổi cả hai",
              "next": "a"
            },
            {
              "label": "Danh sách tự đồng bộ với mọi biến khác có cùng giá trị trong chương trình",
              "next": "b"
            },
            {
              "label": "Máy chủ trộn nhầm dữ liệu của hai khách khi xử lý song song",
              "next": "c"
            }
          ]
        },
        "b": {
          "text": "Danh sách không có cơ chế đồng bộ nào; bạn viết thêm mã để ngăn một thứ không tồn tại. Lỗi vẫn còn vì nguyên nhân thật là một danh sách, hai tên.",
          "ending": "bad"
        },
        "c": {
          "text": "Bạn mở ticket cho đội hạ tầng và mất một ngày. Họ trả lời dữ liệu không bị trộn: lỗi nằm ngay trong dòng gán của bạn.",
          "ending": "bad"
        },
        "a": {
          "text": "Đúng. Với dữ liệu phức hợp, phép gán chép chỗ trỏ tới dữ liệu chứ không chép dữ liệu. Bạn cần giỏ riêng cho mỗi khách. Giỏ có thêm một danh sách con là ghi chú của từng món. Bạn dùng loại sao chép nào?",
          "choices": [
            {
              "label": "Sao chép nông bằng .copy(), vì danh sách ngoài đã là một bản mới rồi",
              "next": "d"
            },
            {
              "label": "Sao chép sâu, để các ghi chú bên trong cũng độc lập",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Danh sách ngoài là mới, nhưng các danh sách ghi chú bên trong vẫn là một. Khách thứ hai sửa ghi chú, và ghi chú của khách thứ nhất đổi theo.",
          "ending": "bad"
        },
        "e": {
          "text": "Mỗi giỏ độc lập hoàn toàn, kể cả phần bên trong. Bạn chấp nhận chi phí sao chép thêm vì tính đúng đắn quan trọng hơn vài micro giây.",
          "ending": "good"
        }
      }
    }
  ],

  "tai-nguyen-tinh-toan-khan-hiem": [
    {
      "type": "scenario",
      "title": "Đợt khan hiếm máy chuyên dụng",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Đội giữ 8 máy chuyên dụng, nhưng đợt khan hiếm khiến nhà cung cấp không còn máy nào trống. Lịch chạy huấn luyện của đội trễ. Quản lý hỏi: ta làm gì trong tuần này?",
          "choices": [
            {
              "label": "Trả giá cao gấp đôi để chen lên đầu hàng chờ của nhà cung cấp",
              "next": "a"
            },
            {
              "label": "Đo mức sử dụng thật của 8 máy rồi xếp lại hàng công việc",
              "next": "b"
            },
            {
              "label": "Ký hợp đồng ba năm với nhà cung cấp để được ưu tiên máy",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Nguồn cung cố định, nên giá cao chỉ quyết định ai được phần đang có. Nhà cung cấp vẫn không có máy, và đội mất thêm một tuần chờ rồi tính lại.",
          "ending": "bad"
        },
        "c": {
          "text": "Hợp đồng dài tính bằng tuần để đàm phán và phụ thuộc người khác. Máy vẫn không xuất hiện trong tháng này, còn đội bị buộc một khoản dài hạn.",
          "ending": "bad"
        },
        "b": {
          "text": "Số đo cho thấy 8 máy chỉ bận khoảng 40% thời gian, vì chúng nằm chờ dữ liệu giữa các lần chạy. Bạn có ba hướng cùng nằm trong tay đội. Bạn làm trước hướng nào?",
          "choices": [
            {
              "label": "Xếp hàng cho máy luôn có việc, và bỏ lần chạy không ai đọc",
              "next": "d"
            },
            {
              "label": "Thuê thêm máy loại phổ thông để chạy cùng khối lượng việc",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Mức sử dụng tăng, nhu cầu giảm, và cả hai làm được ngay trong vài ngày mà không chờ ai. Đội chạy đủ việc trên chính số máy đang giữ.",
          "ending": "good"
        },
        "e": {
          "text": "Máy phổ thông chạy chậm hơn nhiều với tải này và vẫn không thay được máy chuyên dụng. Bạn tốn tiền mà tiến độ không nhích.",
          "ending": "bad"
        }
      }
    }
  ],

  "chi-phi-co-dinh-va-theo-luong-dung": [
    {
      "type": "scenario",
      "title": "Gói giá cố định, chi phí theo lần gọi",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Sản phẩm bán gói 200 nghìn mỗi người mỗi tháng, cố định. Mỗi người dùng nhiều thì gọi dịch vụ ngoài tính theo lần và tốn nhiều hơn. Số người dùng nặng đang tăng. Bạn xem gì trước?",
          "choices": [
            {
              "label": "Tổng doanh thu, vì nó vẫn tăng theo số người dùng",
              "next": "a"
            },
            {
              "label": "Chi phí và doanh thu của từng nhóm người dùng nặng, nhẹ",
              "next": "b"
            },
            {
              "label": "Số lượt cài đặt mới trong tuần",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Tổng doanh thu đẹp che mất việc mỗi người dùng nặng thêm một lần là lỗ thêm một chút. Quý sau chi phí gọi dịch vụ ngoài vượt doanh thu mà báo cáo vẫn xanh.",
          "ending": "bad"
        },
        "c": {
          "text": "Cài đặt tăng là tin vui bề mặt, và với gói cố định mỗi người nặng mới làm tình hình xấu đi. Bạn ăn mừng một con số không nói gì về lãi lỗ.",
          "ending": "bad"
        },
        "b": {
          "text": "Nhóm nặng tốn trung bình 260 nghìn chi phí gọi dịch vụ cho mỗi người (số minh hoạ), cao hơn giá gói. Quy mô không còn là lợi thế vì chi phí tăng theo lượng dùng. Bạn đề xuất gì?",
          "choices": [
            {
              "label": "Thêm hạn mức theo lượt gọi vào gói, vượt thì trả thêm",
              "next": "d"
            },
            {
              "label": "Tăng giá cố định lên cho mọi người dùng, kể cả nhóm nhẹ",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Doanh thu của người nặng bắt đầu đi cùng chi phí của họ, và nhóm nhẹ giữ nguyên giá. Hai vế cùng đi theo lượng dùng nên quy mô trung tính trở lại.",
          "ending": "good"
        },
        "e": {
          "text": "Nhóm nhẹ bỏ đi vì giá cao, trong khi nhóm nặng ở lại và vẫn gây lỗ. Bạn đẩy đi chính nhóm đang có lãi.",
          "ending": "bad"
        }
      }
    }
  ],

  "phan-loai-rui-ro-ky-thuat": [
    {
      "type": "scenario",
      "title": "Lỗi ngày tháng lặp lại lần thứ tư",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bốn lần trong sáu tháng mã của bạn vỡ khi gặp ngày tháng lạ từ một dịch vụ đối tác. Lần nào bạn cũng sửa đúng dòng gây lỗi. Lần thứ năm sắp tới. Bạn nên xếp rủi ro này vào nhóm nào?",
          "choices": [
            {
              "label": "Rủi ro mã nguồn, vì chỗ vỡ nằm ngay trong mã của mình",
              "next": "a"
            },
            {
              "label": "Rủi ro phụ thuộc, vì nguồn gây lỗi nằm ngoài đội",
              "next": "b"
            },
            {
              "label": "Rủi ro vận hành, vì lỗi hiện ra lúc đang chạy thật trên máy",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Bạn thêm một kiểm tra nữa vào đúng chỗ vỡ. Sáu tuần sau đối tác đổi định dạng sang kiểu khác và lỗi nảy ra ở một chỗ khác. Sửa theo triệu chứng không đổi xác suất nó lặp lại.",
          "ending": "bad"
        },
        "c": {
          "text": "Bạn tăng cảnh báo và thêm người trực. Sự cố vẫn xảy ra y như cũ, chỉ là có người biết sớm hơn một chút.",
          "ending": "bad"
        },
        "b": {
          "text": "Câu hỏi tách nhóm: nếu mọi thứ bên ngoài đứng yên thì sự cố này còn không? Không còn, nên đây là rủi ro phụ thuộc. Công cụ của nhóm này là gì?",
          "choices": [
            {
              "label": "Ghim định dạng, kiểm hợp đồng dữ liệu ở biên, có phương án dự phòng",
              "next": "d"
            },
            {
              "label": "Viết thêm kiểm thử đơn vị cho hàm xử lý ngày, gồm cả định dạng lạ",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Dữ liệu lạ bị chặn ngay ở biên và có cảnh báo rõ nguồn gốc. Đổi từ phía đối tác không còn len được vào mã, và xác suất lặp lại đã thực sự giảm.",
          "ending": "good"
        },
        "e": {
          "text": "Kiểm thử chỉ bảo vệ những định dạng bạn đã biết. Đối tác đổi sang kiểu mới và các bài kiểm thử vẫn xanh trong khi sản xuất lại vỡ.",
          "ending": "bad"
        }
      }
    }
  ],

  "wealth-management": [
    {
      "type": "scenario",
      "title": "Nền tảng nội bộ có 100% đội dùng, mà không ai khen",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Tám đội, năm đội bị yêu cầu bắt buộc dùng nền tảng nội bộ của bạn nên tỷ lệ dùng là 100%. Phản hồi toàn là phàn nàn riêng lẻ, không ai nói thẳng. Sếp hỏi bạn đo thành công thế nào?",
          "choices": [
            {
              "label": "Báo tỷ lệ dùng 100% và xin thêm người để xây thêm tính năng",
              "next": "a"
            },
            {
              "label": "Xem ba đội không bị bắt buộc: họ có tự tìm tới và ở lại không",
              "next": "b"
            },
            {
              "label": "Gửi khảo sát hài lòng cho cả tám đội, kể cả đội bị bắt buộc",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Con số 100% che mất tín hiệu duy nhất cho biết nền tảng có ích hay không. Sáu tháng sau hai đội ngầm dựng giải pháp riêng và bạn mới biết khi họ xin tách ra.",
          "ending": "bad"
        },
        "c": {
          "text": "Năm đội bị bắt buộc trả lời cho an toàn, vì phản hồi tiêu cực có thể bị đáp lại. Điểm hài lòng cao giả tạo và bạn không biết phải sửa gì.",
          "ending": "bad"
        },
        "b": {
          "text": "Trong ba đội tự chọn, một đội đã dùng thử rồi rút vì thiết lập mất ba ngày. Đây là phản hồi cụ thể, vì họ có lý do để nó tốt lên. Bạn ưu tiên việc gì tiếp theo?",
          "choices": [
            {
              "label": "Rút ngắn thời gian từ lúc thử tới lần chạy đầu, và cho thoát dễ",
              "next": "d"
            },
            {
              "label": "Mở rộng thêm tính năng để đội không còn lý do nào để rời đi cả",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Thời gian thiết lập giảm còn nửa ngày, và vì thoát dễ nên đội khác dám thử. Hai đội tự tìm tới trong quý sau.",
          "ending": "good"
        },
        "e": {
          "text": "Tính năng mới không giải quyết ba ngày thiết lập. Đội đã rút vẫn không quay lại, còn nền tảng nặng thêm và khó bảo trì.",
          "ending": "bad"
        }
      }
    }
  ],

  "nhieu-dich-vu-nho-hay-mot-dich-vu-lon": [
    {
      "type": "scenario",
      "title": "Mười hai dịch vụ cùng ngừng trong một đêm",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Công ty tách hệ thống thành mười hai dịch vụ để chúng hỏng độc lập. Đêm qua mười một dịch vụ cùng ngừng, vì dịch vụ cấp danh tính mà mọi phần đều gọi bị chậm. Bạn xem lại thiết kế từ đâu?",
          "choices": [
            {
              "label": "Liệt kê những thứ chung: dịch vụ nền, hạ tầng, thư viện, người trực",
              "next": "a"
            },
            {
              "label": "Gộp cả mười hai dịch vụ lại thành một khối duy nhất cho đơn giản và dễ quản lý",
              "next": "b"
            },
            {
              "label": "Thêm máy cho dịch vụ danh tính là đủ để nó hết chậm",
              "next": "c"
            }
          ]
        },
        "b": {
          "text": "Một khối lớn thì mọi thứ vẫn chung và giờ cả việc phát hành cũng chung. Bạn mất thêm lợi ích của việc triển khai riêng lẻ mà không giảm nguồn phụ thuộc nào.",
          "ending": "bad"
        },
        "c": {
          "text": "Dịch vụ danh tính chịu được tải hơn, nhưng lần tới nó chậm vì một lỗi khác là mười một dịch vụ lại ngừng. Bạn xử lý một nguyên nhân mà không chạm tới sự phụ thuộc.",
          "ending": "bad"
        },
        "a": {
          "text": "Danh sách cho thấy mười hai dịch vụ cùng gọi một dịch vụ danh tính, cùng một vùng, và chỉ có ba người trực. Độc lập chỉ là điều kiện trên sơ đồ. Bạn xử lý nguồn nào trước?",
          "choices": [
            {
              "label": "Cho mỗi dịch vụ giữ bản lưu tạm để chạy tiếp khi danh tính chậm",
              "next": "d"
            },
            {
              "label": "Viết thêm tài liệu về cách gọi dịch vụ danh tính cho các đội khác",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Khi dịch vụ danh tính chậm, mỗi dịch vụ vẫn phục vụ người đã đăng nhập. Chia nhỏ giờ thực sự cô lập được một sự cố chung.",
          "ending": "good"
        },
        "e": {
          "text": "Tài liệu rõ hơn không làm dịch vụ danh tính bớt chung. Lần chậm sau, mười một dịch vụ vẫn dừng, chỉ là mọi người hiểu rõ hơn vì sao.",
          "ending": "bad"
        }
      }
    }
  ],

  "on-tap-quy-loi-ich-tuong-lai-ve-hien-tai": [
    {
      "type": "scenario",
      "title": "Hai đề xuất cùng ghi tiết kiệm 40%",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Hai đề xuất đều ghi tiết kiệm 40% chi phí hạ tầng. Một cái tối ưu lớp lưu trữ nền, cái kia tối ưu một tính năng của sản phẩm mới ra mắt. Cả hai trả lợi ích vào quý thứ tám. Bạn hỏi gì trước?",
          "choices": [
            {
              "label": "Cái nào có con số tiết kiệm lớn hơn trong bản trình bày",
              "next": "a"
            },
            {
              "label": "Mỗi quý lợi ích ấy có nguy cơ biến mất bao nhiêu, và vì sao",
              "next": "b"
            },
            {
              "label": "Cái nào dễ làm hơn để xong nhanh",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Hai con số bằng nhau nên bạn bốc thăm, và chọn đề xuất trên sản phẩm mới. Sau hai quý sản phẩm đổi hướng và khoản tiết kiệm biến mất cùng phần tối ưu.",
          "ending": "bad"
        },
        "c": {
          "text": "Dễ làm không nói gì về việc lợi ích có còn nguyên vẹn ở quý thứ tám. Bạn chọn theo công sức bỏ ra chứ không theo giá trị nhận lại.",
          "ending": "bad"
        },
        "b": {
          "text": "Lớp lưu trữ nền ổn định nên bạn chọn mức chiết khấu khoảng 5% mỗi quý; sản phẩm mới còn dò đường nên khoảng 20% mỗi quý. Hệ số quy đổi ở quý thứ tám là bao nhiêu, xấp xỉ?",
          "choices": [
            {
              "label": "Khoảng 0,68 cho lớp nền và 0,23 cho sản phẩm mới",
              "next": "d"
            },
            {
              "label": "Khoảng 0,60 cho lớp nền và 0,60 cho sản phẩm mới, vì cùng tiết kiệm 40%",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Lợi ích ở lớp nền vẫn còn hơn hai phần ba, còn ở sản phẩm mới chỉ còn gần một phần tư. Bạn chọn lớp nền và ghi rõ mức chiết khấu như một tuyên bố cần được bảo vệ.",
          "ending": "good"
        },
        "e": {
          "text": "Hai đề xuất được coi như nhau và bạn chọn theo cảm tính. Trong khi giá trị kỳ vọng của một bên cao gấp ba bên kia.",
          "ending": "bad"
        }
      }
    }
  ],

  "cong-suc-tieu-di-va-tich-lai": [
    {
      "type": "scenario",
      "title": "Sửa tay lần thứ hai mươi mốt",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Mỗi tháng bạn dựng lại môi trường thử bằng tay, mất 10 phút, và 20 lần mỗi tháng như vậy. Một đồng nghiệp đề nghị viết công cụ, tốn khoảng 8 giờ. Bạn nghĩ gì?",
          "choices": [
            {
              "label": "Cứ làm tay, mỗi lần chỉ có 10 phút thôi mà",
              "next": "a"
            },
            {
              "label": "Tính điểm hoà vốn, kể cả sự chú ý bị cắt vụn mỗi lần làm tay",
              "next": "b"
            },
            {
              "label": "Viết ngay công cụ cho mọi việc lặp lại trong đội, việc nào cũng viết",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Mười phút nhân hai mươi lần là hơn ba giờ mỗi tháng, năm này qua năm khác. Việc làm tay không để lại gì, nên quý nào cũng tiêu tiếp chừng ấy.",
          "ending": "bad"
        },
        "c": {
          "text": "Có việc chỉ tồn tại tới hết quý này, và công cụ cho nó thành một khoản tích luỹ cho tương lai không đến. Bạn tiêu thêm công sức vào thứ sẽ bị bỏ.",
          "ending": "bad"
        },
        "b": {
          "text": "Ba giờ hai mươi phút mỗi tháng so với tám giờ: công cụ hoà vốn sau khoảng ba tháng, chưa tính chú ý bị cắt. Việc này còn chạy ít nhất một năm nữa. Bạn viết công cụ, và tiếp theo thì sao?",
          "choices": [
            {
              "label": "Ghi một dòng vì sao dựng vậy, và thêm kiểm thử bảo vệ nó",
              "next": "d"
            },
            {
              "label": "Giữ nó trong đầu mình, ai cần thì hỏi mình là biết ngay",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Thứ tích lại có ba lớp: công cụ, kiểm thử, và lý do. Khi bạn nghỉ phép, đồng nghiệp chạy lệnh và biết vì sao nó thế, và quý sau không ai phải làm tay.",
          "ending": "good"
        },
        "e": {
          "text": "Bạn nghỉ phép và công cụ hỏng sau một lần nâng cấp. Không ai biết vì sao nó được dựng như vậy nên mọi người quay về làm tay.",
          "ending": "bad"
        }
      }
    }
  ],

  "he-thong-dang-co-gi": [
    {
      "type": "scenario",
      "title": "Phần dung lượng đi mượn",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Hệ thống phục vụ 4000 yêu cầu mỗi giây vào giờ cao điểm: 1500 chạy trên máy đội tự sở hữu, 2500 trên dung lượng co giãn thuê ngoài. Sếp hỏi: ta có an toàn không? Bạn hỏi gì trước?",
          "choices": [
            {
              "label": "Hệ thống hôm nay có chậm không, nếu không thì coi như an toàn",
              "next": "a"
            },
            {
              "label": "Nếu phần thuê ngoài biến mất, hệ thống còn phục vụ được bao nhiêu",
              "next": "b"
            },
            {
              "label": "Phần thuê ngoài rẻ hơn phần tự sở hữu bao nhiêu phần trăm mỗi tháng",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Hôm nay không chậm vì chưa ai chạm hạn mức. Tuần sau một đợt tăng tải đụng hạn mức tài khoản mặc định, hệ thống không chậm dần mà bị chặn dứt khoát.",
          "ending": "bad"
        },
        "c": {
          "text": "Chi phí là câu hỏi hợp lý nhưng không trả lời câu hỏi an toàn. Bạn có một bảng so giá đẹp mà không biết mất phần mượn thì còn lại bao nhiêu.",
          "ending": "bad"
        },
        "b": {
          "text": "1500 trên 4000 nghĩa là còn khoảng 38% khi mất phần mượn. Con số hoá mối lo mơ hồ. Bạn cũng thấy hạn mức tài khoản đang đặt ở mức mặc định. Bạn làm gì?",
          "choices": [
            {
              "label": "Liệt kê mọi hạn mức, nâng những cái gần đỉnh, thêm cảnh báo",
              "next": "d"
            },
            {
              "label": "Mua thêm máy tự sở hữu cho đủ 4000 yêu cầu ngay lập tức",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Hạn mức là loại giới hạn tệ nhất vì nó chặn dứt khoát ở một con số mặc định. Khi hạn mức được nâng và có cảnh báo, rủi ro lớn nhất đã được chặn với chi phí nhỏ.",
          "ending": "good"
        },
        "e": {
          "text": "Mua đủ cho 4000 là mất lợi ích của co giãn, và vẫn không biết hạn mức nào đang chờ chạm. Bạn trả giá lớn cho một nửa lời giải.",
          "ending": "bad"
        }
      }
    }
  ],

  "xay-dung-ngan-sach-doanh-nghiep": [
    {
      "type": "scenario",
      "title": "Dòng lưu trữ trong ngân sách năm",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Tháng này chi phí lưu trữ là 4 triệu. Đồng nghiệp lập ngân sách năm bằng 4 triệu nhân 12. Mỗi tháng đội thêm 200 GB dữ liệu và dữ liệu không bao giờ tự giảm. Bạn nhận xét gì?",
          "choices": [
            {
              "label": "Chấp nhận, vì lưu trữ là khoản nhỏ so với tính toán và nhân sự",
              "next": "a"
            },
            {
              "label": "Dòng này tích luỹ: cộng dồn lượng mỗi tháng rồi nhân đơn giá",
              "next": "b"
            },
            {
              "label": "Nhân thêm 10% cho chắc ăn, phòng khi dữ liệu tăng nhanh hơn",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Cuối năm lưu trữ chạm gần gấp đôi dự trù vì dữ liệu chồng lên nhau. Khoản nhỏ thành khoản bị hụt, và đội phải xin bổ sung giữa năm.",
          "ending": "bad"
        },
        "c": {
          "text": "10% cộng thêm vẫn dựa trên giả định dữ liệu đứng yên. Hụt vẫn xảy ra, chỉ là muộn hơn vài tháng.",
          "ending": "bad"
        },
        "b": {
          "text": "Bạn lập thành ba kịch bản theo tốc độ thêm dữ liệu, mỗi cái kèm điều kiện kích hoạt. Rồi trưởng nhóm tính: ngân sách chặt ở lưu trữ nhưng rộng ở tính toán. Bạn lo điều gì?",
          "choices": [
            {
              "label": "Đội sẽ đổ việc sang phần tính toán vì ở đó còn dư",
              "next": "d"
            },
            {
              "label": "Không gì cả, tổng ngân sách vẫn khớp nên coi như ổn rồi",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Ngân sách là một quyết định kiến trúc: nó thưởng cho cách dựng tốn tính toán, kể cả khi lưu trữ rẻ hơn mới là cách đúng. Bạn cân lại hai dòng cho khớp với thiết kế mong muốn.",
          "ending": "good"
        },
        "e": {
          "text": "Tổng khớp nhưng hai dòng lệch chiều nhau, nên đội dựng thêm việc tính toán đắt để tránh lưu trữ. Cuối năm chi phí tổng vượt dù từng dòng nhìn có vẻ ổn.",
          "ending": "bad"
        }
      }
    }
  ],

  "du-bao-lan": [
    {
      "type": "scenario",
      "title": "Kế hoạch đã sai từ tháng ba",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Đầu năm đội lập ngân sách cứng. Đến tháng ba, lượng dùng vọt lên so với giả định. Trưởng nhóm tài chính nói giữ nguyên kế hoạch cho dễ so sánh. Bạn đề xuất gì?",
          "choices": [
            {
              "label": "Giữ nguyên kế hoạch, rồi cắt dự phòng và giảm sao lưu để về đúng con số cam kết",
              "next": "a"
            },
            {
              "label": "Cập nhật giả định bằng số thật, dự báo lại phần còn lại, ghi giả định đã đổi",
              "next": "b"
            },
            {
              "label": "Hạ mục tiêu xuống để lệch ít hơn, cho báo cáo cuối quý đẹp",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Con số cam kết cạnh tranh với mọi mục tiêu khác và thắng. Dung lượng dự phòng và tần suất sao lưu bị cắt vì không ai đo chúng, rồi một sự cố tháng mười một lộ ra hậu quả.",
          "ending": "bad"
        },
        "c": {
          "text": "Mục tiêu thấp hơn che chênh lệch nhưng không giải thích vì sao lượng dùng vượt giả định. Quý sau bạn lại bị bất ngờ bởi đúng nguyên nhân ấy.",
          "ending": "bad"
        },
        "b": {
          "text": "Dự báo mới cho thấy cả năm sẽ vượt khoảng 12% và danh sách giả định đã đổi cho thấy đội hay đánh giá thấp tốc độ tăng. Giám đốc hỏi vì sao lại lệch. Bạn trả lời thế nào?",
          "choices": [
            {
              "label": "Chênh lệch là thông tin: giả định nào sai, ta điều chỉnh thế nào",
              "next": "d"
            },
            {
              "label": "Xin lỗi, lần sau sẽ dự báo chính xác hơn và không để lệch nữa",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Chênh lệch không bị coi là sai phạm nên người lập dự báo tiếp tục nói thật. Sau sáu tháng, danh sách giả định đã đổi cho biết đội sai ở đâu, và đó là thứ kế hoạch cứng không cho bạn.",
          "ending": "good"
        },
        "e": {
          "text": "Lời xin lỗi dạy mọi người rằng lệch là có lỗi. Lần sau người lập dự báo giấu chênh lệch hoặc đặt số rộng để an toàn, và dự báo mất hết giá trị.",
          "ending": "bad"
        }
      }
    }
  ],

  "value-at-risk-var-stress-testing": [
    {
      "type": "scenario",
      "title": "Phép thử nhân tải năm lần đã qua",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Đội chạy thử nhân tải bình thường lên năm lần và hệ thống chịu được, nên tuyên bố an toàn. Ba tuần sau một dịch vụ đối tác chậm lại nhưng không chết và toàn hệ thống sập. Bạn bổ sung gì cho phép thử?",
          "choices": [
            {
              "label": "Chạy lại phép thử với tải gấp mười lần thay vì gấp năm lần như trước đây",
              "next": "a"
            },
            {
              "label": "Kịch bản phụ thuộc chậm lại nhưng không chết, kèm đo thời gian trở lại",
              "next": "b"
            },
            {
              "label": "Thôi không thử nữa vì thử không bao giờ lường được sự cố thật",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Tải mười lần vẫn là phép nhân, và vẫn không có phụ thuộc chậm. Hệ thống vượt qua ngoạn mục và sập đúng như cũ khi đối tác chậm lại.",
          "ending": "bad"
        },
        "c": {
          "text": "Không thử là chắc chắn sẽ gặp lại kiểu sự cố đó mà chưa biết cách xử lý. Bạn đổi một phép thử chưa đủ lấy không có phép thử nào.",
          "ending": "bad"
        },
        "b": {
          "text": "Phép thử mới làm lộ chuyện mọi yêu cầu đều chờ phụ thuộc chậm, luồng bị giữ cho tới khi cạn. Hệ thống không tự trở lại khi phụ thuộc hồi phục. Bạn ưu tiên sửa gì?",
          "choices": [
            {
              "label": "Đặt thời gian chờ ngắn, ngắt mạch phụ thuộc, kiểm tra tự trở lại",
              "next": "d"
            },
            {
              "label": "Tăng số luồng xử lý cho tới khi phép thử chạy qua được mà không lỗi",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Phụ thuộc chậm giờ chỉ làm một tính năng suy giảm, còn hệ thống tự phục vụ lại khi nó hồi phục. Bạn đưa phép thử vào chạy mỗi tuần vì hình dạng hệ thống đổi theo từng bản phát hành.",
          "ending": "good"
        },
        "e": {
          "text": "Thêm luồng chỉ kéo dài thời gian trước khi cạn. Lần sau phụ thuộc chậm lâu hơn một chút và hệ thống vẫn sập, vừa tốn thêm bộ nhớ.",
          "ending": "bad"
        }
      }
    }
  ],

  "chi-so-phi-chuc-nang-la-gi": [
    {
      "type": "scenario",
      "title": "Hệ thống phải nhanh",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Đặc tả có dòng: hệ thống phải nhanh. Độ trễ trung bình đo được là 1 giây và mọi bài kiểm thử đều qua. Nhưng tỷ lệ người dùng bỏ giữa chừng tăng gấp ba. Bạn xem gì trước?",
          "choices": [
            {
              "label": "Độ trễ ở phân vị cao, vì trung bình có thể che nhóm chờ rất lâu",
              "next": "a"
            },
            {
              "label": "Thêm kiểm thử chức năng, vì chắc còn tính năng chưa được kiểm",
              "next": "b"
            },
            {
              "label": "Chạy lại đo trung bình cho chắc",
              "next": "c"
            }
          ]
        },
        "b": {
          "text": "Mọi kiểm thử chức năng đều đã qua và thêm kiểm thử không đổi gì. Tính năng đúng nhưng chậm với một phần người dùng vẫn bị bỏ giữa chừng.",
          "ending": "bad"
        },
        "c": {
          "text": "Lần đo thứ hai cho đúng con số cũ: 1 giây. Trung bình không thay đổi vì nó vẫn che nhóm chậm, và bạn vẫn chưa hiểu người dùng đang bỏ đi vì gì.",
          "ending": "bad"
        },
        "a": {
          "text": "Phân vị 95 là bảy giây: khoảng một phần mười người dùng chờ bảy giây trong khi phần còn lại chờ ba trăm mili giây. Bạn muốn viết lại yêu cầu cho có thể kiểm chứng. Viết thế nào?",
          "choices": [
            {
              "label": "Tìm kiếm hiện kết quả trong 800 ms ở phân vị 95, có người phụ trách",
              "next": "d"
            },
            {
              "label": "Hệ thống phải rất nhanh, nhanh hơn bản trước và nhanh hơn đối thủ",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Yêu cầu giờ là một con số có ngưỡng và một người chịu trách nhiệm, nên nó thành phiếu công việc thật. Cảnh báo bật khi phân vị 95 vượt 800 ms.",
          "ending": "good"
        },
        "e": {
          "text": "Nhanh hơn trước vẫn không có ngưỡng, nên không ai biết khi nào là xong hay là hỏng. Yêu cầu tiếp tục nằm ngoài danh sách việc.",
          "ending": "bad"
        }
      }
    }
  ],

  "danh-gia-ba-tru-cot-cua-mot-dich-vu": [
    {
      "type": "scenario",
      "title": "Chấm điểm dịch vụ gửi email hoá đơn",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn được giao đánh giá dịch vụ gửi email hoá đơn. Dữ liệu có sẵn: tổng chi phí hạ tầng mỗi tháng, độ trễ đo trong trung tâm dữ liệu, và số sự cố. Bước đầu tiên của bạn?",
          "choices": [
            {
              "label": "Vẽ biểu đồ ba con số đó theo tháng và so với dịch vụ thanh toán",
              "next": "a"
            },
            {
              "label": "Chọn đơn vị việc, ví dụ mỗi nghìn email, rồi chia chi phí cho nó",
              "next": "b"
            },
            {
              "label": "Cộng ba con số thành một điểm tổng cho gọn",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "So hai dịch vụ làm hai loại việc khác nhau gần như luôn vô nghĩa, còn tổng chi phí tăng chỉ vì số email tăng. Bạn kết luận sai về cả hai dịch vụ.",
          "ending": "bad"
        },
        "c": {
          "text": "Điểm tổng 74 không cho biết nó đến từ đâu nên không ai biết phải sửa gì. Bạn mất dấu vết ngay từ lúc gộp.",
          "ending": "bad"
        },
        "b": {
          "text": "Chi phí mỗi nghìn email giảm 8% trong ba tháng, trong khi tổng chi phí tăng. Giờ bạn đo độ trễ. Đo ở đâu thì đúng?",
          "choices": [
            {
              "label": "Ở thiết bị của người nhận hoặc điểm gần nhất người dùng đứng",
              "next": "d"
            },
            {
              "label": "Ngay trong trung tâm dữ liệu, vì ở đó số liệu sạch và ổn định nhất",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Con số xấu đi so với phép đo trong trung tâm dữ liệu, và đó là dấu hiệu nó đúng: nó gồm cả mạng đứt và yêu cầu không bao giờ tới nơi. Bạn bắt đầu ghi chuỗi số liệu ngay hôm nay dù phép đo chưa hoàn hảo.",
          "ending": "good"
        },
        "e": {
          "text": "Số liệu đẹp vì chúng bỏ qua mọi thứ người dùng thật gặp. Báo cáo xanh trong khi khách vẫn phàn nàn email đến chậm.",
          "ending": "bad"
        }
      }
    }
  ],

  "du-phong-dung-chung-giua-cac-doi": [
    {
      "type": "scenario",
      "title": "Mười hai dịch vụ cùng chạm đỉnh lúc nửa đêm",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Đội gom dự phòng của mười hai dịch vụ về một kho chung, nhỏ hơn tổng dự phòng riêng. Nửa đêm mọi công việc định kỳ cùng chạy, mười hai dịch vụ chạm đỉnh một lúc và kho cạn. Bạn làm gì?",
          "choices": [
            {
              "label": "Cấp lại dự phòng riêng cho từng dịch vụ như trước khi gom chung",
              "next": "a"
            },
            {
              "label": "Rải giờ chạy các công việc định kỳ ra, thay vì đồng loạt nửa đêm",
              "next": "b"
            },
            {
              "label": "Mua thêm dung lượng chung để khớp bằng tổng các đỉnh cộng lại",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Mỗi dịch vụ lại giữ đủ cho đỉnh của chính nó, và phần ấy nằm rảnh gần cả ngày. Bạn bỏ mất khoản tiết kiệm đáng kể chỉ vì một nguyên nhân sửa được.",
          "ending": "bad"
        },
        "c": {
          "text": "Mua đủ cho tổng đỉnh xoá sạch lợi ích của việc gom chung. Tiết kiệm biến mất trong khi nguyên nhân là một giờ chạy mặc định.",
          "ending": "bad"
        },
        "b": {
          "text": "Các công việc chạy xen nhau từ 0 giờ đến 3 giờ, đỉnh giảm mạnh và kho chung đủ. Rồi bạn thấy một đợt gửi thông báo cũng làm mười hai dịch vụ cùng tăng. Bạn chuẩn bị gì cho lần kho cạn?",
          "choices": [
            {
              "label": "Một quy tắc ưu tiên viết sẵn: dịch vụ nào lấy trước khi kho cạn",
              "next": "d"
            },
            {
              "label": "Để các dịch vụ tự giành nhau, dịch vụ nào nhanh hơn thì được",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Thứ tự ưu tiên được quyết trước khi cạn, lúc còn bình tĩnh, nên khi đợt thông báo tới thì thanh toán được giữ còn báo cáo nền chờ. Tiết kiệm của việc gom chung vẫn còn.",
          "ending": "good"
        },
        "e": {
          "text": "Dịch vụ thanh toán chậm cùng lúc với báo cáo nền vì đều tranh một kho. Quyết định lẽ ra phải có từ trước lại được đưa ra giữa sự cố.",
          "ending": "bad"
        }
      }
    }
  ],

  "doc-hieu-chi-bao-kinh-te-vi-mo": [
    {
      "type": "scenario",
      "title": "Cảnh báo 80% dung lượng và tốc độ tăng",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bảng theo dõi của đội chỉ có số sự cố, chi phí tháng trước và tỷ lệ lỗi đã ghi nhận. Ổ lưu trữ đang ở 62% và bạn muốn thêm cảnh báo. Bạn đặt nó ở đâu?",
          "choices": [
            {
              "label": "Cảnh báo khi đạt 80% dung lượng, như mọi đội khác",
              "next": "a"
            },
            {
              "label": "Cảnh báo theo tốc độ tăng, kèm ngày dự kiến đầy",
              "next": "b"
            },
            {
              "label": "Không thêm, vì bảng đã đủ chỉ báo rồi",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Khoảng thời gian từ 80% tới đầy phụ thuộc hoàn toàn vào tốc độ tăng: có thể ba tháng, có thể hai ngày. Cảnh báo bật nhưng bạn không biết mình có đủ thời gian hay không.",
          "ending": "bad"
        },
        "c": {
          "text": "Cả ba chỉ báo đều là chỉ báo trễ: chúng chỉ xanh hoặc đỏ sau khi sự việc đã xảy ra. Ổ đầy vào một đêm cuối tháng, và số sự cố tháng sau mới ghi lại điều đó.",
          "ending": "bad"
        },
        "b": {
          "text": "Cảnh báo cho thấy mức tăng 4 điểm phần trăm mỗi tuần, tức khoảng chín tuần nữa đầy. Nhưng nó từng bật hai lần trước mà không có gì xảy ra, và có người hỏi sao đội cứ báo động giả. Bạn xử lý thế nào?",
          "choices": [
            {
              "label": "Dùng chỉ báo dẫn dắt để hành động, chỉ báo trễ để kiểm hành động",
              "next": "d"
            },
            {
              "label": "Tắt cảnh báo dẫn dắt và quay về chỉ báo trễ cho yên tâm, đỡ bị hỏi",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Đội dọn dữ liệu cũ sớm vì quỹ đạo, và tỷ lệ lỗi trễ trong quý sau xác nhận hành động đã có tác dụng. Hai loại chỉ báo bổ sung nhau thay vì thay thế nhau.",
          "ending": "good"
        },
        "e": {
          "text": "Không ai bị hỏi vì báo động giả nữa, và cũng không ai thấy ổ đầy tới khi nó đầy. Đội được yên ổn đúng cho tới ngày sự cố.",
          "ending": "bad"
        }
      }
    }
  ],

  "chuan-bao-cao-chi-so-va-cach-chon": [
    {
      "type": "scenario",
      "title": "Hai con số khả dụng cho cùng một tháng",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Hợp đồng nói tháng này khả dụng 99,95%, còn bảng của đội sản phẩm ghi 99,5%. Khách hàng gọi hỏi con số nào đúng. Bạn kiểm tra gì trước?",
          "choices": [
            {
              "label": "Công thức tính, xem có ai chia nhầm tử số cho mẫu số ở đâu đó không",
              "next": "a"
            },
            {
              "label": "Định nghĩa hỏng, điểm đo, tần suất đo, và khoảng bảo trì được loại",
              "next": "b"
            },
            {
              "label": "Số nào đẹp hơn thì báo cho khách số đó, cho hợp đồng khỏi rắc rối",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Hai công thức đều đúng và cho cùng một phép tính trên cùng một số liệu. Bạn mất hai giờ kiểm một thứ không sai, trong khi chênh lệch đến từ chỗ khác.",
          "ending": "bad"
        },
        "c": {
          "text": "Khách thấy bảng nội bộ xấu hơn và đòi giải thích. Bạn không giải thích được vì chưa biết hai con số khác nhau ở đâu.",
          "ending": "bad"
        },
        "b": {
          "text": "Chuẩn hợp đồng chỉ tính hỏng hẳn, đo từ bên ngoài mỗi phút, và loại bảo trì đã báo trước; bảng sản phẩm tính cả chậm và đo từ phía người dùng. Cả hai đúng, trả lời cho hai người đọc khác nhau. Bạn trả lời khách thế nào?",
          "choices": [
            {
              "label": "Gửi cả hai con số kèm định nghĩa, điểm đo và khoảng loại trừ",
              "next": "d"
            },
            {
              "label": "Đổi định nghĩa trên bảng sản phẩm cho khớp hợp đồng rồi công bố số mới cạnh lịch sử cũ",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Khách hiểu vì sao hai con số khác nhau và biết số nào ràng buộc hợp đồng. Mỗi con số đi kèm điều nó đo nên không ai bị hiểu nhầm.",
          "ending": "good"
        },
        "e": {
          "text": "Con số mới đẹp hơn nhưng không so được với lịch sử, nên biểu đồ như thể chất lượng bỗng tốt lên. Đội vận hành mất công cụ thấy bất thường mà chuẩn hợp đồng mù.",
          "ending": "bad"
        }
      }
    }
  ],

  "rui-ro-vat-ly-va-dia-ly-ha-tang": [
    {
      "type": "scenario",
      "title": "Ba vùng khả dụng trong cùng một thành phố",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Hệ thống chạy ở ba vùng khả dụng và đội tự tin là chịu được hai vùng hỏng. Cả ba cùng nằm trong một thành phố, nhận điện từ một trạm biến áp khu vực. Một đợt nắng nóng kéo dài sắp tới. Bạn hỏi gì?",
          "choices": [
            {
              "label": "Có bao nhiêu vùng, vì ba vùng thường được coi là đủ an toàn",
              "next": "a"
            },
            {
              "label": "Một sự kiện trong bán kính 50 km làm ngừng bao nhiêu phần",
              "next": "b"
            },
            {
              "label": "Tải mỗi vùng bao nhiêu phần trăm, có đều giữa ba vùng không",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Ba vùng cô lập được sự cố của một toà nhà, không cô lập được điện và nắng nóng cho cả thành phố. Cả ba vùng suy giảm cùng lúc và thiết kế chịu hai lỗi không được dùng tới.",
          "ending": "bad"
        },
        "c": {
          "text": "Tải đều là một thông tin tốt, nhưng nó không nói gì về chuyện cả ba vùng dùng chung một nguồn điện. Bạn có một con số đẹp cho một câu hỏi chưa được hỏi.",
          "ending": "bad"
        },
        "b": {
          "text": "Câu trả lời là cả ba: không có vùng nào ngoài bán kính ấy. Sự cố vật lý không có nút quay lại; phải chờ điện có lại. Bạn đề xuất gì?",
          "choices": [
            {
              "label": "Đặt bản sao ở lưới điện và hành lang cáp khác, đủ xa",
              "next": "d"
            },
            {
              "label": "Thêm vùng thứ tư trong cùng thành phố, cho dự phòng dày hơn nữa",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Dự phòng thật ở đây khác dự phòng trên sơ đồ: một sự kiện thời tiết không còn làm ngừng cả hệ thống. Đội cũng ghi thời gian khôi phục của kịch bản vật lý vào kế hoạch.",
          "ending": "good"
        },
        "e": {
          "text": "Vùng thứ tư dùng chung đúng trạm biến áp. Khi nắng nóng làm mất điện khu vực, bốn vùng cùng ngừng và chi phí tăng mà rủi ro không giảm.",
          "ending": "bad"
        }
      }
    }
  ],

  "chi-so-phi-chuc-nang-khi-danh-gia-dich-vu": [
    {
      "type": "scenario",
      "title": "Dịch vụ điểm 82 vừa gây sự cố bốn giờ",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bảng sức khoẻ cho dịch vụ lưu trữ ảnh điểm tổng 82, nằm trong nhóm tốt nhất. Sáng nay nó gây sự cố bốn giờ. Sếp hỏi vì sao điểm cao thế mà vẫn hỏng. Bạn xem gì trước?",
          "choices": [
            {
              "label": "Điểm 82 đến từ đâu: từng trụ cột và trọng số",
              "next": "a"
            },
            {
              "label": "Hạ điểm dịch vụ xuống cho khớp với sự cố vừa xảy ra",
              "next": "b"
            },
            {
              "label": "Tin điểm tổng, coi sự cố là một ngoại lệ hiếm gặp",
              "next": "c"
            }
          ]
        },
        "b": {
          "text": "Một khoản trừ tuỳ tiện dựa trên cảm nhận không đi qua biến nào đo được. Lần sau bạn không giải thích được vì sao trừ đúng bấy nhiêu điểm, và đội phản đối.",
          "ending": "bad"
        },
        "c": {
          "text": "Điểm tổng tiếp tục báo xanh cho tới sự cố sau. Bạn dùng một con số làm câu trả lời trong khi nó đã giấu đi thứ nó gộp.",
          "ending": "bad"
        },
        "a": {
          "text": "Dịch vụ điểm cao ở hiệu quả tài nguyên và trải nghiệm, nhưng độ phủ kiểm thử rất thấp, nên trọng số nghiêng về tiết kiệm đã đẩy nó lên đầu bảng. Đổi trọng số nghiêng về vận hành thì đúng dịch vụ này rơi xuống chót. Bạn làm gì?",
          "choices": [
            {
              "label": "Hiện cả ba trụ cột, ghi rõ trọng số, điều chỉnh qua biến đo được",
              "next": "d"
            },
            {
              "label": "Giữ duy nhất một ô điểm tổng cho gọn và bỏ chi tiết từng trụ cột đi",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Nhìn vào bảng, ai cũng thấy độ phủ kiểm thử là chỗ kéo điểm, và đội biết phải sửa gì để cải thiện. Điểm tổng hợp trở thành điểm khởi đầu của câu hỏi thay vì câu trả lời.",
          "ending": "good"
        },
        "e": {
          "text": "Ô điểm gọn nhưng không dấu vết: nhìn vào 82 không biết sửa gì. Lần sau lại có một dịch vụ đẹp trên bảng mà hỏng ngoài đời.",
          "ending": "bad"
        }
      }
    }
  ],

  "ma-cau-truc-earnout": [
    {
      "type": "scenario",
      "title": "Bàn giao sau ba tháng hay sau ba sự cố",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Đội cũ chuyển một dịch vụ cho đội mới. Biên bản nháp ghi: đội cũ hỗ trợ ba tháng. Dịch vụ có chu kỳ chạy theo quý. Bạn đề xuất sửa gì?",
          "choices": [
            {
              "label": "Giữ ba tháng, vì dễ viết vào biên bản và dễ kiểm tra khi hết hạn",
              "next": "a"
            },
            {
              "label": "Thay thời gian bằng mốc đo được: đội mới tự xử lý ba sự cố liên tiếp",
              "next": "b"
            },
            {
              "label": "Kéo dài lên sáu tháng cho an toàn, vì ba tháng có vẻ hơi ngắn",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Ba tháng hết đúng trước kỳ chạy quý đầu tiên. Công việc chạy theo quý bộc lộ một phụ thuộc chưa ai biết, và đội cũ đã rời đi.",
          "ending": "bad"
        },
        "c": {
          "text": "Sáu tháng chỉ là một mốc thời gian khác. Đội mới ngừng hỏi từ tháng thứ ba vì thấy bất tiện, và biên bản vẫn nói đã sẵn sàng khi chưa ai chứng minh điều đó.",
          "ending": "bad"
        },
        "b": {
          "text": "Mốc đo cái đội mới làm được chứ không đo cái đội cũ đã nói. Hai giờ sáng có sự cố, người đội cũ biết sửa trong ba phút còn đội mới cần hai mươi. Ai nên sửa?",
          "choices": [
            {
              "label": "Người đội cũ sửa thay cho nhanh, vì họ sửa trong ba phút",
              "next": "d"
            },
            {
              "label": "Đội mới sửa, người đội cũ chỉ trả lời khi được hỏi",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Sự cố qua nhanh nhưng đội mới chưa tự xử lý lần nào, nên mốc ba sự cố liên tiếp không bao giờ đạt. Bàn giao kéo dài mãi và đội cũ không bao giờ rời đi.",
          "ending": "bad"
        },
        "e": {
          "text": "Mất hai mươi phút thay vì ba, nhưng đây là một sự cố đội mới tự xử lý. Ba lần liên tiếp như vậy thì mốc đạt và hệ thống thật sự đã đổi chủ.",
          "ending": "good"
        }
      }
    }
  ],

  "ma-xuyen-bien-gioi": [
    {
      "type": "scenario",
      "title": "Nhận hệ thống từ một tổ chức khác",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Công ty bạn nhận lại một hệ thống từ tổ chức khác. Người cuối cùng biết rõ nó sẽ nghỉ trong sáu tuần. Kế hoạch tiếp nhận đang tập trung vào ngôn ngữ lạ và kiến trúc khác. Bạn làm gì trước?",
          "choices": [
            {
              "label": "Đọc hết toàn bộ mã nguồn cho quen thuộc, rồi mới bắt đầu đặt câu hỏi cho người cũ",
              "next": "a"
            },
            {
              "label": "Dựng lại từ máy trắng bằng tay, lập danh sách mọi thứ nó gọi ra ngoài",
              "next": "b"
            },
            {
              "label": "Bắt đầu viết lại theo cách đội mình quen dùng và dễ bảo trì hơn",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Mã đọc xong, nhưng những thứ nằm ngoài mã như quy ước ngầm và phụ thuộc không ghi ở đâu thì không có trong đó. Người biết chuyện nghỉ việc với những câu hỏi chưa được hỏi.",
          "ending": "bad"
        },
        "c": {
          "text": "Phản xạ viết lại phá hỏng những chỗ trông kỳ quặc nhưng có lý do. Hệ thống chạy được ở bản cũ không còn chạy ở bản mới, và bạn mất cả hai.",
          "ending": "bad"
        },
        "b": {
          "text": "Dựng từ máy trắng lộ ra ba bước cấu hình không ghi ở đâu, và danh sách cho thấy một công việc chạy cuối quý gọi một dịch vụ cũ. Rồi bạn muốn bật hệ thống mới. Bước nào hợp lý?",
          "choices": [
            {
              "label": "Chạy song song bản cũ và bản dựng lại, so kết quả từng ngày",
              "next": "d"
            },
            {
              "label": "Tắt bản cũ ngay hôm nay vì bản dựng lại đã chạy ổn trong thử nghiệm",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Chạy song song lộ ra khác biệt về cấu hình và dữ liệu mà không buổi bàn giao nào phát hiện được, kể cả việc cuối quý. Bạn chỉ nhận lại khi hai bản khớp nhau qua một chu kỳ.",
          "ending": "good"
        },
        "e": {
          "text": "Việc cuối quý chạy vào cuối tháng sau và tìm một dịch vụ cũ đã tắt. Báo cáo quý trống rỗng, và người duy nhất biết cách sửa đã rời đi.",
          "ending": "bad"
        }
      }
    }
  ],

  "mo-hinh-tc-nganh-dac-thu": [
    {
      "type": "scenario",
      "title": "Đợt bán vé mở lúc 10 giờ",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Hệ thống bán vé nhận trung bình 20 yêu cầu mỗi phút, nhưng 90% tải dồn vào hai phút đầu khi mở bán. Bạn tính số máy cần như mọi dịch vụ nội bộ khác. Bạn dùng số nào?",
          "choices": [
            {
              "label": "Mức trung bình mỗi phút trong ngày",
              "next": "a"
            },
            {
              "label": "Mức yêu cầu mỗi giây ở hai phút đỉnh",
              "next": "b"
            },
            {
              "label": "Mức trung bình nhân đôi cho dư dả",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Trung bình vô nghĩa vì cả tải nằm trong vài phút. Máy đủ cho cả ngày và sập đúng 10 giờ, khi mọi người bấm cùng lúc.",
          "ending": "bad"
        },
        "c": {
          "text": "Gấp đôi một con số sai vẫn là con số sai. Đỉnh thật cao gấp hàng trăm lần trung bình nên hệ thống vẫn sập, chỉ là tốn thêm tiền.",
          "ending": "bad"
        },
        "b": {
          "text": "Đỉnh là khoảng 150 yêu cầu mỗi giây. Bạn thêm máy phục vụ và thử, nhưng dung lượng không tăng: mọi máy đều ghi vào một cơ sở dữ liệu duy nhất. Nguyên nhân gần nhất là gì?",
          "choices": [
            {
              "label": "Cơ sở dữ liệu ghi là nút thắt dùng chung; thêm máy làm nó nghẽn hơn",
              "next": "d"
            },
            {
              "label": "Máy mới thuộc một lô bị lỗi phần cứng nên không chạy nổi như máy cũ",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Bạn đưa việc ghi qua hàng đợi và gom ghi theo lô, nên cơ sở dữ liệu nhận đều hơn trong đỉnh. Dung lượng tăng vì nút thắt đã được xử lý, không phải vì thêm máy.",
          "ending": "good"
        },
        "e": {
          "text": "Bạn đổi cả lô máy mới mà dung lượng vẫn không nhúc nhích. Nút thắt vẫn nguyên, và hoá đơn đã tăng gấp đôi.",
          "ending": "bad"
        }
      }
    }
  ],

  "do-thoi-gian-truoc-khi-lap-ke-hoach-hoc": [
    {
      "type": "scenario",
      "title": "Kế hoạch học mười lăm giờ mỗi tuần",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn đếm trên lịch thấy mỗi tuần có khoảng 15 giờ trống và định chia thành kế hoạch học 15 giờ. Đồng nghiệp học cùng bảo nên đo trước. Bạn làm gì?",
          "choices": [
            {
              "label": "Vẫn lập kế hoạch 15 giờ, vì lịch đã nói rõ có chừng ấy giờ trống",
              "next": "a"
            },
            {
              "label": "Ghi mỗi tối một dòng: liền mạch bao lâu, giờ nào, ai ngắt, hai tuần",
              "next": "b"
            },
            {
              "label": "Dựng bảng theo dõi chi tiết từng ba mươi phút cho cả tuần",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Tuần đầu bạn học được 6 giờ, tuần hai 5 giờ. Bạn kết luận mình lười, trong khi con số 15 chưa bao giờ có thật.",
          "ending": "bad"
        },
        "c": {
          "text": "Bảng chi tiết quá nặng, bạn bỏ nó sau ba ngày và dữ liệu ba ngày không dùng được vào việc gì. Đo thô mà làm xong hơn đo kỹ mà bỏ dở.",
          "ending": "bad"
        },
        "b": {
          "text": "Sau hai tuần nhật ký cho thấy chỉ khoảng 7 giờ là dùng được: tối thứ hai đến thứ năm có khoảng 60 phút liền mạch, còn cuối tuần bị việc gấp lấy mất. Bạn làm gì tiếp?",
          "choices": [
            {
              "label": "Lập kế hoạch 7 giờ, xếp việc cần vào mạch vào khoảng dài nhất",
              "next": "d"
            },
            {
              "label": "Cố lấp cho đủ 15 giờ bằng cách học vào mọi khoảng trống trong ngày",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Kế hoạch dựng trên giờ dùng được nên bạn hoàn thành nó, và sau vài tuần bạn có đủ dữ liệu để thử nới ra. Bạn bắt đầu từ con số thật.",
          "ending": "good"
        },
        "e": {
          "text": "Những khoảng mười lăm phút không đủ để vào mạch với việc cần tập trung. Bạn ngồi nhiều giờ hơn và tiến bộ ít hơn, rồi bỏ kế hoạch.",
          "ending": "bad"
        }
      }
    }
  ],

  "chong-quen-giu-lai-thu-da-hoc": [
    {
      "type": "scenario",
      "title": "Ba tháng sau khoá học mà không nhớ gì",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn vừa hoàn thành một phần về mạng và muốn nhớ lâu. Bạn có hai tiếng cuối tuần để ôn. Bạn dùng thế nào?",
          "choices": [
            {
              "label": "Đọc lại ghi chú và xem lại video, tô đậm thêm vài đoạn quan trọng",
              "next": "a"
            },
            {
              "label": "Đóng hết tài liệu, viết ra điều nhớ được, rồi dựng lại một thứ nhỏ",
              "next": "b"
            },
            {
              "label": "Ôn dồn cả hai tiếng ngay đêm nay khi mọi thứ còn nguyên trong đầu",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Mọi thứ trông quen nên bạn cảm thấy mình đã hiểu. Hai tuần sau nhìn trang trắng, bạn không viết nổi lệnh nào, vì đọc lại chỉ luyện khả năng nhận ra.",
          "ending": "bad"
        },
        "c": {
          "text": "Ôn dồn ngay sau khi học thì thứ gì cũng còn nguyên, nên lần nào lấy ra cũng dễ. Bạn có cảm giác tốt và trí nhớ ngắn, rồi quên trong tuần sau.",
          "ending": "bad"
        },
        "b": {
          "text": "Buổi nhớ lại khó chịu và chậm, và bạn nhận ra mình quên cách chia mạng con. Bạn ghi những chỗ hổng ra rồi sắp lịch ôn lại. Lịch nào hợp lý?",
          "choices": [
            {
              "label": "Ôn sau hai ngày, rồi một tuần, rồi một tháng, giãn dần",
              "next": "d"
            },
            {
              "label": "Ôn lại mỗi ngày trong tuần đầu cho chắc, rồi thôi không ôn nữa",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Mỗi lần lấy lại hơi khó vì bạn đã bắt đầu quên, và chính khó khăn ấy làm trí nhớ bền hơn. Sau ba tháng, bạn dựng lại được mạng con mà không mở tài liệu.",
          "ending": "good"
        },
        "e": {
          "text": "Một tuần dồn dập thì lần nào cũng dễ và không để lại gì lâu. Sang tháng sau phần lớn đã quên, và bạn không còn lịch để ôn.",
          "ending": "bad"
        }
      }
    }
  ],

  "mau-sai-so-chuan-va-khoang-tin-cay": [
    {
      "type": "scenario",
      "title": "Ba tuần số liệu và quyết định giữ hay gỡ",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Một tính năng mới ra mắt ba tuần. Độ trễ trung bình tăng 4% so với trước, và có người đề nghị gỡ. Độ lệch giữa các tuần khá lớn. Bạn hỏi gì trước khi quyết?",
          "choices": [
            {
              "label": "Gỡ ngay, vì 4% là mức tăng thật và người dùng chắc chắn sẽ thấy",
              "next": "a"
            },
            {
              "label": "Khoảng tin cậy của mức tăng là bao nhiêu, có chứa số không không",
              "next": "b"
            },
            {
              "label": "Đo mỗi phút thay vì mỗi ngày để có nhiều dữ liệu hơn",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Với ba tuần và độ lệch lớn, khoảng tin cậy trải từ giảm 6% đến tăng 14%. Bạn gỡ một tính năng tốt vì nhiễu.",
          "ending": "bad"
        },
        "c": {
          "text": "Đo dày hơn giúp hiểu độ dao động trong ngày, nhưng không làm xu hướng trung bình chính xác hơn, vì số quan sát độc lập thực sự vẫn là ba tuần. Bạn có thêm nhiều dòng mà không thêm hiểu biết.",
          "ending": "bad"
        },
        "b": {
          "text": "Khoảng tin cậy 95% là từ -6% tới +14%, nên số 4% không phân biệt được với may rủi. Bạn muốn khoảng hẹp bằng một nửa. Cần bao nhiêu dữ liệu?",
          "choices": [
            {
              "label": "Gấp bốn lần dữ liệu, vì sai số chuẩn giảm theo căn bậc hai",
              "next": "d"
            },
            {
              "label": "Gấp đôi dữ liệu, vì dữ liệu gấp đôi thì sai số giảm một nửa",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Bạn giữ tính năng thêm hai tháng và đo lại, thay vì hành động dựa trên nhiễu. Sau đó khoảng tin cậy hẹp lại và quyết định dựa trên một con số kèm độ chính xác của nó.",
          "ending": "good"
        },
        "e": {
          "text": "Gấp đôi chỉ giảm sai số khoảng 30%, nên khoảng vẫn đủ rộng để chứa số không. Sau hai tháng bạn lại đứng ở câu hỏi cũ.",
          "ending": "bad"
        }
      }
    }
  ],

  "phim-tat-excel-va-ky-luat-ban-phim": [
    {
      "type": "scenario",
      "title": "Bài kiểm tra dữ liệu 20 phút, không được dùng chuột",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn được phát một bảng lạ 5000 dòng và có 20 phút để soát, tìm lỗi rồi dựng bảng tóm tắt. Chuột bị khoá. Việc đầu tiên bạn làm?",
          "choices": [
            {
              "label": "Cuộn từ trên xuống bằng phím mũi tên để đọc lần lượt từng dòng một",
              "next": "a"
            },
            {
              "label": "Về ô đầu, chọn vùng bằng Ctrl + Shift + mũi tên, nhìn rìa bảng",
              "next": "b"
            },
            {
              "label": "Trộn các ô tiêu đề lại cho dễ nhìn hơn nữa",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Năm nghìn dòng bằng mũi tên đơn lẻ tốn gần hết thời gian, và bạn đọc mà không biết chỗ nào đáng nghi. Còn 5 phút khi bạn bắt đầu dựng bảng tóm tắt.",
          "ending": "bad"
        },
        "c": {
          "text": "Ô trộn làm vùng chọn, sắp xếp và công thức kéo bị vỡ. Bạn mất thêm thời gian gỡ ra trong khi đồng hồ vẫn chạy.",
          "ending": "bad"
        },
        "b": {
          "text": "Trong vài giây bạn thấy bảng có hai cột trống ở giữa và một cột bị lệch hàng. Giờ bạn kiểm một công thức, nhấn F2 để vào ô. Rồi cần kéo cùng công thức xuống, khoá cột đơn giá. Bạn dùng gì?",
          "choices": [
            {
              "label": "F4 để chuyển kiểu tham chiếu khi đang soạn công thức",
              "next": "d"
            },
            {
              "label": "Gõ dấu đô la bằng tay vào từng ô trong hai nghìn dòng của bảng",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Một công thức được viết và kéo cho cả cột, mỗi dòng chỉ chứa một loại logic nên không vỡ. Bạn xong sớm và còn thời gian xem lại.",
          "ending": "good"
        },
        "e": {
          "text": "Gõ tay hai nghìn ô vừa chậm vừa dễ sót, và một ô sót khoá cột sai làm cả bảng tóm tắt sai. Tốc độ thao tác chính là thứ bài kiểm tra này đang chấm.",
          "ending": "bad"
        }
      }
    }
  ],

  "power-query-lam-sach-du-lieu": [
    {
      "type": "scenario",
      "title": "Báo cáo hàng tháng làm sạch bằng tay",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Mỗi tháng một file xuất từ hệ thống về, bạn xoá bốn dòng đầu, tách cột họ tên, đổi định dạng ngày, lọc dòng tổng cộng. Đã là lần thứ tư, và đồng nghiệp cũng phải làm. Bạn làm gì?",
          "choices": [
            {
              "label": "Tiếp tục làm tay vì mỗi lần chỉ mất 20 phút thôi, không đáng kể",
              "next": "a"
            },
            {
              "label": "Dựng các bước thành truy vấn lưu lại, tháng sau chỉ làm mới",
              "next": "b"
            },
            {
              "label": "Viết lời hướng dẫn dài từng bước cho đồng nghiệp làm theo",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Mỗi tháng sai một chỗ khác nhau vì thao tác không để lại dấu vết. Tháng này bạn quên lọc dòng tổng cộng và con số cuối gấp đôi.",
          "ending": "bad"
        },
        "c": {
          "text": "Hướng dẫn không chạy được, nên mỗi người vẫn tự làm bằng tay và vẫn sai khác nhau. Tài liệu chỉ mô tả thao tác, không thay thế được nó.",
          "ending": "bad"
        },
        "b": {
          "text": "Tháng sau file mới về, bạn bấm làm mới và xong trong một phút. Con số cuối trông lạ, và bạn muốn biết vì sao. Quy trình giúp gì?",
          "choices": [
            {
              "label": "Mở danh sách bước đã ghi, truy ngược từng bước tới chỗ lệch",
              "next": "d"
            },
            {
              "label": "Làm lại từ đầu bằng tay rồi so hai con số với nhau xem sao",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Bước đổi kiểu cột thứ ba biến một dòng chữ thành lỗi. Bạn sửa đúng bước đó và mọi tháng sau đều đúng, không ai khác phải nhớ gì.",
          "ending": "good"
        },
        "e": {
          "text": "Làm lại bằng tay cho một con số khác và bạn không biết con số nào đúng. Không có dấu vết thì không có cách truy ngược.",
          "ending": "bad"
        }
      }
    }
  ],

  "chuan-bi-modeling-test-va-case-interview": [
    {
      "type": "scenario",
      "title": "Phút thứ 45 của bài kiểm tra 90 phút",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn đang làm bài kiểm tra lập trình 90 phút. Phần đọc dữ liệu và phần xử lý chính đã chạy được, còn lại 45 phút. Đề thiếu một thông tin về cách tính phí. Bạn làm gì?",
          "choices": [
            {
              "label": "Dừng hẳn mọi thứ tới khi hỏi được người coi thi",
              "next": "a"
            },
            {
              "label": "Ghi giả định rõ ràng, nói ra miệng, rồi đi tiếp",
              "next": "b"
            },
            {
              "label": "Đoán thầm rồi viết luôn, không nói gì với người chấm",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Người coi thi chỉ nhắc đề và bạn mất mười phút. Phần ghép các khối và kiểm tra cuối không còn thời gian, nên chương trình không chạy hết.",
          "ending": "bad"
        },
        "c": {
          "text": "Người chấm nhìn kết quả và không biết bạn đã chọn giả định nào hay vì sao. Một lựa chọn hợp lý trở thành một cú đoán không giải thích được.",
          "ending": "bad"
        },
        "b": {
          "text": "Người chấm gật đầu vì thấy bạn nói rõ giả định. Còn 20 phút, bạn có hai việc: thêm xử lý một trường hợp lỗi hiếm, hoặc bảo đảm chương trình chạy từ đầu tới cuối và dọn lại tên biến. Chọn gì?",
          "choices": [
            {
              "label": "Cho chạy từ đầu tới cuối, dọn tên, để 10 phút cuối soát lại",
              "next": "d"
            },
            {
              "label": "Xử lý trường hợp lỗi hiếm cho tới phút cuối cùng của bài thi",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Bạn nộp một chương trình chạy được, cấu trúc sạch, giả định ghi rõ. Nhà tuyển dụng chấp nhận lời giải thô nhưng chạy được hơn lời giải tinh xảo mà dở dang.",
          "ending": "good"
        },
        "e": {
          "text": "Bạn xử lý xong ca hiếm nhưng hai phần chưa ghép đúng và còn lỗi ở bước in kết quả. Điều bị chấm là cấu trúc và việc ghép, không phải ca hiếm.",
          "ending": "bad"
        }
      }
    }
  ],

  "khi-nao-excel-het-du-va-chuyen-sang-python": [
    {
      "type": "scenario",
      "title": "Bảng ba trăm nghìn dòng, dùng một lần",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Sếp đưa bảng ba trăm nghìn dòng và hỏi một câu duy nhất cần trả lời hôm nay. Sau đó bảng sẽ bị bỏ. Bạn dùng gì?",
          "choices": [
            {
              "label": "Viết ngay script Python vì bảng lớn",
              "next": "a"
            },
            {
              "label": "Dùng bảng tính, vì làm một lần và cần nhìn thấy từng ô",
              "next": "b"
            },
            {
              "label": "Xin thêm một tuần để dựng quy trình tự động",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Script chạy được nhưng bạn tốn hai giờ cho một câu hỏi dùng một lần, và sếp không đọc được code để kiểm lại con số.",
          "ending": "bad"
        },
        "c": {
          "text": "Quy trình tự động cho một việc không lặp lại là công sức tích luỹ cho tương lai không đến. Sếp cần câu trả lời hôm nay, không phải tuần sau.",
          "ending": "bad"
        },
        "b": {
          "text": "Bạn trả lời trong một buổi. Hai tuần sau sếp nói: làm lại mỗi tháng, từ ba nguồn có định dạng ngày khác nhau. Giờ bạn nghĩ gì?",
          "choices": [
            {
              "label": "Tiếp tục dán tay mỗi tháng, vì Excel vẫn mở được cả ba bảng và ai cũng quen tay",
              "next": "d"
            },
            {
              "label": "Việc lặp lại là tiêu chí chính: script lo dữ liệu, bảng tính lo mô hình",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Mỗi tháng một chuỗi thao tác thủ công, không ai chạy lại được và không ai biết ai đã đổi gì. Tháng thứ tư một định dạng ngày bị đọc ngược và báo cáo sai.",
          "ending": "bad"
        },
        "e": {
          "text": "Script chạy lại được và để lại dấu vết; bảng tính vẫn là chỗ mọi người xem và sửa mô hình. Câu hỏi đúng không phải Excel hay Python, mà là việc này còn lặp bao nhiêu lần.",
          "ending": "good"
        }
      }
    }
  ],

  "dataframe-bang-du-lieu-trong-code": [
    {
      "type": "scenario",
      "title": "Tổng doanh thu lệch sau khi gom nhóm",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Bạn đọc bảng đơn hàng vào DataFrame, gom theo thành phố và tính tổng tiền. Con số lớn hơn báo cáo của kế toán. Bảng có cả đơn paid lẫn đơn refunded. Bạn xem gì?",
          "choices": [
            {
              "label": "Thứ tự các thao tác: lọc paid trước, gom nhóm sau",
              "next": "a"
            },
            {
              "label": "Bỏ cột trạng thái đi cho bảng gọn, vì đơn nào cũng như nhau",
              "next": "b"
            },
            {
              "label": "Đọc lại hết bằng bảng tính để đối chiếu với báo cáo của kế toán",
              "next": "c"
            }
          ]
        },
        "b": {
          "text": "Bảng gọn nhưng không còn cách phân biệt đơn hoàn tiền với đơn đã thanh toán, nên con số cuối vẫn lệch và lần này không còn manh mối.",
          "ending": "bad"
        },
        "c": {
          "text": "Bảng tính mở được ba trăm nghìn dòng nhưng chậm, và bạn vẫn phải lọc bằng tay, không ai chạy lại được lần sau. Bạn bỏ quên chính điểm mạnh của DataFrame.",
          "ending": "bad"
        },
        "a": {
          "text": "Lọc paid trước rồi gom nhóm cho đúng con số của kế toán. Rồi bạn ghép bảng đơn hàng với bảng khách hàng theo mã, và số dòng tăng từ 40000 lên 52000. Điều gì xảy ra?",
          "choices": [
            {
              "label": "Mã khách bị trùng ở bảng kia, nên mỗi đơn nhân thành nhiều dòng",
              "next": "d"
            },
            {
              "label": "DataFrame tự thêm dòng cho đủ khi hai bảng có số dòng khác nhau",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Phép ghép nhân bản im lặng, và bảng tính không cảnh báo điều đó. Bạn kiểm tính duy nhất của khoá trước khi ghép và số dòng giữ ở 40000.",
          "ending": "good"
        },
        "e": {
          "text": "DataFrame không tự thêm gì cả. Bạn đổ lỗi cho công cụ trong khi phép ghép đang nhân tổng tiền lên, và báo cáo gửi đi cao hơn thực tế 30%.",
          "ending": "bad"
        }
      }
    }
  ],

  "lam-sach-du-lieu-va-cai-gia-cua-du-lieu-ban": [
    {
      "type": "aiLab",
      "mode": "spotError",
      "title": "Bản nháp ghi chú làm sạch dữ liệu khảo sát",
      "task": "Một công cụ AI soạn ghi chú về cách làm sạch bộ khảo sát có 20% dòng thiếu thu nhập. Bấm vào những câu sai theo đúng điều bài vừa dạy rồi nộp.",
      "segments": [
        {
          "text": "Trước khi xử lý dòng thiếu, hãy hỏi thiếu ngẫu nhiên hay thiếu có hệ thống."
        },
        {
          "text": "Xoá hết các dòng thiếu thu nhập là cách an toàn nhất vì không làm lệch dữ liệu.",
          "error": "Xoá dòng chỉ đúng khi thiếu hoàn toàn ngẫu nhiên. Người bỏ trống ô thu nhập hiếm khi ngẫu nhiên, nên xoá có thể loại mất cả một nhóm."
        },
        {
          "text": "Điền giá trị trung bình vào ô thiếu làm giảm độ phân tán và giả định thiếu là ngẫu nhiên."
        },
        {
          "text": "Một cột trộn lẫn tỷ lệ dạng 0,15 và 15 sẽ bị bộ kiểm tra kiểu dữ liệu bắt ngay vì hai dạng khác nhau.",
          "error": "Cả hai đều là số hợp lệ nên vượt qua mọi kiểm tra kiểu. Cách phát hiện duy nhất là nhìn phân bố và xét xem các giá trị có hợp lý về đơn vị không."
        },
        {
          "text": "Ghi lại từng bước làm sạch thay vì sửa trực tiếp vào dữ liệu gốc, để kết quả kiểm tra lại được."
        }
      ]
    }
  ],

  "chon-chi-so-do-luong-va-vanity-metric": [
    {
      "type": "scenario",
      "title": "Slide báo cáo một triệu người dùng",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Slide quý này ghi: tổng số người đăng ký đạt một triệu, tăng đều. Trong đó chỉ khoảng 90000 người mở ứng dụng trong tháng qua. Sếp muốn dùng slide này. Bạn đề xuất gì?",
          "choices": [
            {
              "label": "Giữ tổng đăng ký làm chỉ số chính vì nó luôn tăng đều mỗi tuần",
              "next": "a"
            },
            {
              "label": "Thêm tỷ lệ người dùng hoạt động và doanh thu trên mỗi người thật",
              "next": "b"
            },
            {
              "label": "Bỏ chỉ số đi để khỏi gây tranh cãi trong buổi họp quý này",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Tổng tích luỹ không thể giảm và không ai đổi hành vi khi nhìn nó. Quý sau tỷ lệ hoạt động tụt xuống 7% mà slide vẫn xanh.",
          "ending": "bad"
        },
        "c": {
          "text": "Không có chỉ số thì không ai biết sản phẩm đang tốt lên hay xấu đi. Quyết định chuyển sang cảm nhận, và tranh cãi quay lại dữ dội hơn.",
          "ending": "bad"
        },
        "b": {
          "text": "Tỷ lệ hoạt động là 9%, doanh thu trên mỗi người thực sự dùng là con số gắn với tiền. Nhóm tăng trưởng bắt đầu đẩy chỉ số này bằng thông báo ép người dùng mở app. Chuyện gì sắp xảy ra?",
          "choices": [
            {
              "label": "Goodhart: chỉ số thành mục tiêu thì bị lách, nên ghép thêm chỉ số đối trọng",
              "next": "d"
            },
            {
              "label": "Không có gì, vì số người mở app tăng nghĩa là sản phẩm đang tốt lên rõ rệt",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Tỷ lệ gỡ app tăng ngay khi thông báo dày lên, và đội điều chỉnh. Cặp chỉ số đi cùng nhau chặn việc đẩy một con số trong khi hại cái khác.",
          "ending": "good"
        },
        "e": {
          "text": "Số người mở app tăng, doanh thu trên mỗi người giảm, và người dùng thật bỏ đi vì bị làm phiền. Một chỉ số đơn lẻ đã bị lách đúng như mọi chỉ số đơn lẻ.",
          "ending": "bad"
        }
      }
    }
  ],

  "phan-tich-cohort-va-cai-bay-trung-binh": [
    {
      "type": "scenario",
      "title": "Mọi kênh đều tốt lên mà tổng thể xấu đi",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Năm ngoái giữ chân chung là 35%: giới thiệu 50%, quảng cáo 20%, mỗi kênh 100 người. Năm nay giới thiệu lên 55% với 20 người, quảng cáo lên 25% với 180 người, và tỷ lệ chung còn 27%. Sếp hỏi sản phẩm xấu đi à? Bạn trả lời gì?",
          "choices": [
            {
              "label": "Có, con số chung giảm nên sản phẩm giữ chân kém đi so với năm ngoái",
              "next": "a"
            },
            {
              "label": "Không: cả hai nhóm đều tốt lên, tỷ trọng đã đổi sang nhóm thấp hơn",
              "next": "b"
            },
            {
              "label": "Không đủ dữ liệu để nói gì về sản phẩm trong hai năm này",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Bạn dừng một kênh giới thiệu đang tốt để chữa một vấn đề không có. Trung bình đã che đi sự thật rằng mọi nhóm con đều cải thiện.",
          "ending": "bad"
        },
        "c": {
          "text": "Dữ liệu đủ để nói: bảng có sẵn hai nhóm và hai năm. Bạn trốn việc phân tích sau lý do thiếu dữ liệu.",
          "ending": "bad"
        },
        "b": {
          "text": "Đây là nghịch lý Simpson: không có phép tính sai, chỉ có câu hỏi sai. Con số chung trả lời khách hàng năm nay ở lại bao nhiêu, không trả lời sản phẩm có giữ chân tốt hơn không. Bạn trình bày thế nào?",
          "choices": [
            {
              "label": "Bảng cohort theo kênh và tháng, cùng độ tuổi, kèm tỷ trọng",
              "next": "d"
            },
            {
              "label": "Một con số trung bình có trọng số duy nhất cho cả hai năm",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Sếp thấy ngay hai kênh đều lên và vì sao con số chung xuống, rồi hỏi nên đổ ngân sách sang kênh nào. Bảng đưa ra một cuộc thảo luận đúng thay vì một nỗi lo sai.",
          "ending": "good"
        },
        "e": {
          "text": "Một con số duy nhất lại gộp mọi thứ và mất đúng thông tin vừa tìm ra. Quý sau có người hỏi lại câu cũ.",
          "ending": "bad"
        }
      }
    }
  ],

  "dao-duc-du-lieu-va-thien-lech-thuat-toan": [
    {
      "type": "aiLab",
      "mode": "spotError",
      "title": "Bản nháp đánh giá mô hình duyệt hồ sơ vay",
      "task": "Một công cụ AI soạn nhận xét về mô hình duyệt hồ sơ vay đã bỏ cột dân tộc. Bấm vào những câu sai theo đúng điều bài vừa dạy rồi nộp.",
      "segments": [
        {
          "text": "Mô hình đạt độ chính xác chung 92% trên toàn bộ hồ sơ thử."
        },
        {
          "text": "Vì cột dân tộc đã bị bỏ nên mô hình chắc chắn không thiên lệch theo dân tộc.",
          "error": "Biến thay thế như mã bưu chính, tên trường hay thời gian gián đoạn công việc vẫn mang ranh giới dân tộc, nên bỏ biến nhạy cảm chưa đủ."
        },
        {
          "text": "Cần tách độ chính xác theo nhóm, vì con số chung có thể che một nhóm bị từ chối nhiều hơn hẳn."
        },
        {
          "text": "Mô hình học từ dữ liệu cho vay quá khứ sẽ tự trung lập, vì dữ liệu chỉ phản ánh sự thật khách quan.",
          "error": "Dữ liệu mang theo cách thu thập, cách chọn mẫu và các quyết định trong quá khứ, nên mô hình có thể tái tạo lại đúng sự bất công cũ."
        },
        {
          "text": "Hệ thống ra quyết định tự động cần giải thích được vì sao một hồ sơ bị từ chối."
        }
      ]
    }
  ],

  "lap-ke-hoach-theo-yeu-to-dan-dat": [
    {
      "type": "scenario",
      "title": "Doanh thu gia hạn lệch kế hoạch cuối quý",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Doanh thu gia hạn = số người dùng trả phí × giá gói × tỷ lệ gia hạn. Cuối quý thực tế thấp hơn kế hoạch 6%. Kế hoạch năm ngoái được lập bằng doanh thu cũ nhân 1,1. Bạn phân tích thế nào?",
          "choices": [
            {
              "label": "Chỉ nói rằng doanh thu lệch 6% và đề nghị cộng 12% cho năm sau",
              "next": "a"
            },
            {
              "label": "Tách theo ba yếu tố, xem yếu tố nào lệch so với kế hoạch",
              "next": "b"
            },
            {
              "label": "Thêm mười hai yếu tố nữa để mô hình chi tiết hơn",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Con số một cục chỉ cho biết đã lệch, không cho biết vì sao. Năm sau bạn lệch lần nữa vì nguyên nhân thật chưa được chạm tới.",
          "ending": "bad"
        },
        "c": {
          "text": "Mười lăm yếu tố trông nghiêm túc nhưng mỗi yếu tố là một giả định có thể sai. Khi kết quả lệch bạn lại không chỉ ra được cái nào đáng nghi.",
          "ending": "bad"
        },
        "b": {
          "text": "Người dùng trả phí đúng kế hoạch, giá gói đúng, nhưng tỷ lệ gia hạn thấp hơn 6 điểm. Bạn chọn yếu tố dẫn dắt để theo dõi. Cái nào hợp?",
          "choices": [
            {
              "label": "Tỷ lệ gia hạn, vì đội tác động được và đo được hằng tháng",
              "next": "d"
            },
            {
              "label": "Giá của đối thủ, vì nó ảnh hưởng nhiều nhất tới tỷ lệ gia hạn",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Yếu tố có người sở hữu và đo được, nên tháng sau bạn thấy sớm nếu nó lệch. Phân tích variance giờ chỉ ra đúng chỗ thay vì bắt đầu bằng phỏng đoán.",
          "ending": "good"
        },
        "e": {
          "text": "Giá đối thủ không ai trong tổ chức thay đổi được, nên không có hành động nào gắn với nó. Mô hình có thêm một số liệu đẹp mà không giúp ai làm gì.",
          "ending": "bad"
        }
      }
    }
  ],

  "kich-ban-va-do-nhay-trong-ke-hoach": [
    {
      "type": "scenario",
      "title": "Một con số duy nhất cho kế hoạch dung lượng",
      "start": "s",
      "nodes": {
        "s": {
          "text": "Kế hoạch dung lượng ghi đúng một con số: cần 10 máy. Một máy chủ đang bận 80% thời gian. Sếp hỏi nếu tải tăng 20% thì sao. Bạn trả lời thế nào?",
          "choices": [
            {
              "label": "Tăng 20% tải thì thời gian chờ cũng tăng 20%, tuyến tính theo tải",
              "next": "a"
            },
            {
              "label": "Mức bận lên 96%, thời gian chờ gấp khoảng năm lần chứ không tuyến tính",
              "next": "b"
            },
            {
              "label": "Không ảnh hưởng gì, vì máy vẫn còn 4% công suất trống để xử lý thêm",
              "next": "c"
            }
          ]
        },
        "a": {
          "text": "Mô hình hàng đợi không tuyến tính. Bạn hứa một độ trễ không thể giữ, và đợt tải tăng sau đó làm hệ thống chậm gấp nhiều lần.",
          "ending": "bad"
        },
        "c": {
          "text": "Còn 4% trống nghĩa là hàng đợi dài vô hạn trong thực tế. Người dùng chờ hàng chục giây và bạn không có kế hoạch nào cho ca đó.",
          "ending": "bad"
        },
        "b": {
          "text": "Thời gian chờ tỉ lệ với 1 chia cho (1 trừ mức bận): từ 5 lên 25 lần thời gian xử lý, tức gấp năm. Sếp muốn một kịch bản xấu. Bạn dựng thế nào?",
          "choices": [
            {
              "label": "Đổi nhiều biến liên quan cùng lúc: lưu lượng, cache, số lần gửi lại",
              "next": "d"
            },
            {
              "label": "Chỉ nhân lưu lượng lên 20% và giữ nguyên mọi thứ còn lại của hệ thống",
              "next": "e"
            }
          ]
        },
        "d": {
          "text": "Kịch bản nhất quán bên trong, nên bạn tìm ra điểm ngưỡng: tải vượt khoảng 85% thì cần thêm máy. Ban lãnh đạo nhận hai hay ba kịch bản, không phải mười, kèm điều kiện kích hoạt từng cái.",
          "ending": "good"
        },
        "e": {
          "text": "Kịch bản xấu chỉ là một bản tăng tải, không phải một thế giới có thể xảy ra. Sự kiện thật làm cả cache và số lần gửi lại xấu đi cùng lúc nên kế hoạch vẫn thiếu máy.",
          "ending": "bad"
        }
      }
    }
  ],

};
