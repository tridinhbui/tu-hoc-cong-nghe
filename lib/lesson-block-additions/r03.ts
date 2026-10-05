import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r03. Một người viết cho một tệp.
export const R03_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "tich-hop-lien-tuc": [
    {
      type: "scenario",
      title: "Cổng đỏ lúc đang cần gộp gấp",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Kiểm tra tich_hop trong cổng đã đỏ ba ngày liền, cứ vài lần chạy lại thì xanh. Tối nay bạn cần gộp một bản sửa lỗi gấp. Bạn xem nhật ký: lỗi nằm ở bước gọi dịch vụ thanh toán thử, không dính tới mã bạn vừa sửa. Bạn làm gì?",
          choices: [
            { label: "Bấm chạy lại tới khi xanh rồi gộp như mọi lần", next: "chay_lai" },
            { label: "Gỡ kiểm tra đó khỏi danh sách bắt buộc, gộp xong tính sau", next: "go_bo" },
            { label: "Xác nhận lỗi không do mã của bạn, ghi lại và mở việc sửa gốc", next: "khoanh_vung" },
          ],
        },
        chay_lai: {
          text: "Bản sửa lỗi vào được, nhưng cả đội học được rằng đỏ thì cứ chạy lại. Hai tuần sau một lỗi thật làm kiểm tra đó đỏ, ba người chạy lại cho tới khi may mắn xanh, và lỗi lên môi trường thật.",
          ending: "bad",
        },
        go_bo: {
          text: "Cổng xanh ngay, bản sửa lỗi vào. Nhưng không ai nhớ mở lại việc đó: kiểm tra tích hợp nằm ngoài cổng từ đó, và một tháng sau một thay đổi làm gãy luồng thanh toán mà không máy nào chặn.",
          ending: "bad",
        },
        khoanh_vung: {
          text: "Bạn gộp bản sửa lỗi với lý do được ghi rõ, rồi xem lại nguyên nhân: kiểm tra tich_hop gọi dịch vụ thanh toán thử qua mạng, mà dịch vụ này lúc nhanh lúc chậm. Sửa gốc thế nào?",
          choices: [
            { label: "Thêm tự động thử lại năm lần trong cổng cho kiểm tra đó", next: "thu_lai" },
            { label: "Thay dịch vụ ngoài bằng bản giả trong kiểm thử, vẫn bắt buộc", next: "ban_gia" },
            { label: "Chuyển kiểm tra đó sang chạy hàng đêm, ngoài cổng", next: "hang_dem" },
          ],
        },
        thu_lai: {
          text: "Cổng xanh trở lại, nhưng thời gian chờ tăng gần gấp đôi và lỗi chập chờn vẫn còn, chỉ bị che đi. Người ta bắt đầu dồn thay đổi thành lô lớn cho đỡ chờ.",
          ending: "bad",
        },
        hang_dem: {
          text: "Cổng nhanh và xanh, nhưng kết quả hàng đêm đỏ thì sáng hôm sau chẳng ai nhìn. Thứ nằm ngoài cổng dần bị bỏ qua, đúng như mọi lần.",
          ending: "bad",
        },
        ban_gia: {
          text: "Kiểm tra giờ chạy ổn định trong vài giây, vẫn là điều kiện bắt buộc. Đỏ trở lại nghĩa là có chuyện thật, nên cả đội đọc kết quả nghiêm túc hơn.",
          ending: "good",
        },
      },
    },
  ],

  "ra-soat-ma": [
    {
      type: "scenario",
      title: "Yêu cầu gộp 900 dòng cần duyệt trước trưa",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Đồng nghiệp gửi yêu cầu gộp gần 900 dòng, đụng tới ba chỗ khác nhau của hệ thống, và nhờ bạn duyệt trước trưa. Cổng tự động đã xanh. Bạn xử lý thế nào?",
          choices: [
            { label: "Đọc lướt, để vài bình luận về đặt tên rồi duyệt", next: "luot" },
            { label: "Nhờ tách thành các phần nhỏ, mỗi phần một mục đích", next: "tach" },
            { label: "Từ chối: quá lớn, làm lại rồi gửi lại cho tôi", next: "tu_choi" },
          ],
        },
        luot: {
          text: "Bạn duyệt trong mười lăm phút. Một đoạn xử lý danh sách rỗng bị bỏ sót vì nằm giữa hàng trăm dòng; nó nổ trên môi trường thật vào tuần sau.",
          ending: "bad",
        },
        tu_choi: {
          text: "Đồng nghiệp mất cả buổi làm lại mà không biết nên chia từ đâu, rồi gửi một bản còn lớn hơn. Hai người cùng bực, và lần sau họ ngại đưa mã ra rà soát.",
          ending: "bad",
        },
        tach: {
          text: "Đồng nghiệp tách thành ba yêu cầu nhỏ. Ở yêu cầu đầu, bạn thấy hai điều: một vòng lặp không kiểm tra khi danh sách rỗng, và một tên biến viết sai chính tả. Bạn viết bình luận thế nào?",
          choices: [
            { label: "Gộp cả hai vào một danh sách, không đánh dấu gì", next: "khong_danh_dau" },
            { label: "Ghi cả hai là SỬA GẤP để chắc chắn được xử lý", next: "gap_het" },
            { label: "Đánh dấu chặn cho danh sách rỗng, ghi chú cho tên biến", next: "co_muc_do" },
          ],
        },
        khong_danh_dau: {
          text: "Tác giả mất nửa buổi sửa mọi thứ cho an toàn và hỏi lại ba lần cái nào quan trọng. Vòng trao đổi dài khiến yêu cầu trễ sang hôm sau.",
          ending: "bad",
        },
        gap_het: {
          text: "Tác giả nghĩ lỗi chính tả cũng chặn việc gộp nên dừng mọi thứ để sửa. Đến lần sau, họ không còn phân biệt được bình luận nào thật sự quan trọng.",
          ending: "bad",
        },
        co_muc_do: {
          text: "Tác giả sửa ngay chỗ danh sách rỗng, để tên biến xử lý sau nếu rảnh. Yêu cầu được duyệt trong buổi chiều, và hai yêu cầu còn lại cũng đi nhanh vì đủ nhỏ để đọc hết.",
          ending: "good",
        },
      },
    },
  ],

  "co-tinh-nang": [
    {
      type: "scenario",
      title: "Phát hành tính năng thanh toán mới sau một lá cờ",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Tính năng thanh toán nhanh đã viết xong và đã qua kiểm thử. Sản phẩm muốn người dùng thấy vào thứ Sáu. Mã đã nằm trong nhánh chính, sau một cờ đang tắt. Bạn lên kế hoạch ra sao?",
          choices: [
            { label: "Bật cờ cho toàn bộ người dùng ngay khi triển khai", next: "bat_het" },
            { label: "Giữ mã trên nhánh riêng thêm một tuần cho chắc", next: "nhanh_dai" },
            { label: "Bật cho nội bộ, rồi tăng dần từ 5% người dùng", next: "bat_dan" },
          ],
        },
        bat_het: {
          text: "Ngay phút đầu tỷ lệ thanh toán lỗi tăng. Để tắt tính năng bạn phải quay lui cả bản, kéo theo ba sửa lỗi khác đã chạy tốt, và mọi người dùng đều đã gặp sự cố.",
          ending: "bad",
        },
        nhanh_dai: {
          text: "Một tuần sau nhánh riêng lệch xa nhánh chính, việc gộp phát sinh xung đột ở bảy tệp, và bạn lại phải kiểm thử từ đầu. Hạn thứ Sáu trôi qua.",
          ending: "bad",
        },
        bat_dan: {
          text: "Ở mức 5%, tỷ lệ thanh toán lỗi của nhóm có cờ cao hơn rõ rệt so với nhóm không có cờ. Bạn xử lý thế nào?",
          choices: [
            { label: "Tắt cờ, điều tra nguyên nhân trên dữ liệu nhóm bị ảnh hưởng", next: "tat_co" },
            { label: "Quay lui cả bản triển khai về phiên bản hôm qua", next: "quay_lui" },
            { label: "Chờ thêm một ngày xem có tự hết không", next: "cho_them" },
          ],
        },
        quay_lui: {
          text: "Bản cũ trở lại, nhưng ba sửa lỗi không liên quan cũng bị rút đi, và hai đội khác phải xin lỗi khách vì lỗi cũ quay lại.",
          ending: "bad",
        },
        cho_them: {
          text: "Một ngày nữa trôi qua, nhóm 5% tiếp tục thanh toán lỗi. Vài trăm khách hàng thật gặp sự cố mà chẳng có ai chủ động báo trước.",
          ending: "bad",
        },
        tat_co: {
          text: "Tắt cờ mất vài giây, chỉ nhóm 5% bị ảnh hưởng và bản triển khai giữ nguyên. Bạn sửa nguyên nhân, bật lại dần tới 100%. Giờ lá cờ vẫn còn trong mã, kèm ngày xoá đã ghi từ đầu. Làm gì?",
          choices: [
            { label: "Để lại cờ, phòng khi cần tắt nhanh vào lúc khác", next: "de_lai" },
            { label: "Xoá cờ và nhánh mã cũ đúng theo ngày đã ghi", next: "xoa_co" },
            { label: "Thêm cờ con cho từng biến thể nhỏ của tính năng", next: "co_con" },
          ],
        },
        de_lai: {
          text: "Cờ nằm đó thêm nửa năm. Đến khi người mới sửa mã quanh nó, không ai chắc đường đi nào còn dùng, và mỗi lá cờ thừa nhân đôi số trạng thái cần kiểm thử.",
          ending: "bad",
        },
        co_con: {
          text: "Số tổ hợp trạng thái nhân lên, kiểm thử không phủ nổi, và có lần hai cờ bật cùng lúc cho ra hành vi chưa ai thử.",
          ending: "bad",
        },
        xoa_co: {
          text: "Mã gọn lại một đường đi, kiểm thử đơn giản hơn. Lần phát hành sau bạn vẫn dùng cách này, vì cờ sống ngắn và có ngày dọn.",
          ending: "good",
        },
      },
    },
  ],

  "trien-khai-khong-gian-doan": [
    {
      type: "scenario",
      title: "Bản mới nhận 10% lưu lượng và số liệu xấu đi",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn vừa chuyển 10% lưu lượng sang bản mới. Năm phút sau, bảng theo dõi (số minh hoạ) cho thấy tỷ lệ lỗi bản mới 3%, bản cũ 0,5%. Chưa có ai phàn nàn. Bạn làm gì?",
          choices: [
            { label: "Chờ thêm xem người dùng có phàn nàn gì không", next: "cho_phan_nan" },
            { label: "Tăng lên 50% vì 97% yêu cầu vẫn chạy bình thường", next: "tang_50" },
            { label: "Chuyển lưu lượng về bản cũ trước, rồi mới điều tra", next: "quay_ve" },
          ],
        },
        cho_phan_nan: {
          text: "Tín hiệu dừng của bạn lại là tiếng phàn nàn thay vì số liệu. Nửa giờ sau mới có phiếu hỗ trợ đầu tiên, và hàng nghìn yêu cầu đã hỏng.",
          ending: "bad",
        },
        tang_50: {
          text: "Lỗi nhân lên theo lưu lượng. Chuyển sang một nửa người dùng nghĩa là thiệt hại tăng gấp năm lần, trong lúc bạn vẫn chưa biết nguyên nhân.",
          ending: "bad",
        },
        quay_ve: {
          text: "Bạn chuyển về mất hai phút, tỷ lệ lỗi trở lại 0,5%. Thiệt hại dừng ở nhóm nhỏ ban đầu. Trong buổi họp sau, đội hỏi nên làm gì để lần sau quyết định này khỏi phụ thuộc vào ai đang trực.",
          choices: [
            { label: "Ghi vào biên bản: lần sau cần cẩn thận hơn khi triển khai", next: "can_than" },
            { label: "Đặt điều kiện dừng tự động theo tỷ lệ lỗi, thử quay lui định kỳ", next: "tu_dong" },
            { label: "Bỏ triển khai từng phần, thay toàn bộ máy một lần cho đơn giản", next: "thay_het" },
          ],
        },
        can_than: {
          text: "Lời nhắc không đổi xác suất nào. Ba tháng sau một người khác trực, thấy số liệu hơi xấu, và chần chừ đúng như bạn từng chần chừ.",
          ending: "bad",
        },
        thay_het: {
          text: "Quy trình đơn giản hơn, nhưng lần sau bản hỏng chạm tới toàn bộ người dùng cùng lúc, và không còn nhóm cũ nào để so sánh.",
          ending: "bad",
        },
        tu_dong: {
          text: "Từ đó, nếu tỷ lệ lỗi bản mới vượt ngưỡng đã thoả thuận thì lưu lượng tự quay về, và đội đo thời gian quay lui thật mỗi quý. Đường lui trở thành thứ đã được kiểm chứng.",
          ending: "good",
        },
      },
    },
  ],

  "di-tru-du-lieu-khi-trien-khai": [
    {
      type: "scenario",
      title: "Đổi tên cột mà không làm mất đường lui",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bảng khách hàng có cột ten, bạn cần tách thành ho_ten để lưu đầy đủ họ và tên. Hệ thống đang chạy, có nhiều máy, và việc thay từng máy mất vài phút. Bạn bắt đầu thế nào?",
          choices: [
            { label: "Đổi tên cột ngay trong cùng lần triển khai với mã mới", next: "doi_ngay" },
            { label: "Thêm cột ho_ten bên cạnh, mã mới ghi cả hai cột", next: "them_ben_canh" },
            { label: "Tạo cột mới, sao chép dữ liệu qua đêm, xoá cột cũ luôn", next: "xoa_som" },
          ],
        },
        doi_ngay: {
          text: "Trong lúc thay máy, các máy chạy mã cũ vẫn tìm cột ten và báo lỗi. Quay lui mã không đưa tên cột về lại, nên cả bản cũ lẫn bản mới đều hỏng một lúc.",
          ending: "bad",
        },
        xoa_som: {
          text: "Sao chép xong, cột cũ bị xoá. Sáng hôm sau phát hiện một nửa bản ghi bị cắt họ khi sao chép. Dữ liệu gốc đã mất, không còn gì để so lại.",
          ending: "bad",
        },
        them_ben_canh: {
          text: "Cả mã cũ lẫn mã mới đều đọc được thứ chúng cần, và bạn sao chép dữ liệu cũ sang cột mới. Mọi thứ vẫn lui được. Bước tiếp theo?",
          choices: [
            { label: "Xoá cột ten ngay vì dữ liệu đã được sao chép đủ", next: "xoa_cot" },
            { label: "Chuyển đường đọc sang cột mới và theo dõi một thời gian", next: "chuyen_doc" },
            { label: "Chuyển đường đọc và ngừng ghi cột cũ trong cùng lần", next: "gop_buoc" },
          ],
        },
        xoa_cot: {
          text: "Một dịch vụ báo cáo vẫn đọc cột ten và hỏng trong đêm. Cột đã mất, nên lui về bản trước cũng không cứu được.",
          ending: "bad",
        },
        gop_buoc: {
          text: "Cột mới có lỗi nhỏ, bạn quay lui mã. Mã cũ đọc lại cột ten, nhưng cột này không còn nhận dữ liệu mới từ lúc ngừng ghi, nên khách thấy thông tin cũ.",
          ending: "bad",
        },
        chuyen_doc: {
          text: "Sau một tuần theo dõi, mọi nơi đọc đều ổn. Giờ chỉ còn cột ten là thừa. Bạn xử lý cột đó thế nào?",
          choices: [
            { label: "Ngừng ghi cột cũ ở một lần, xoá cột ở lần triển khai riêng", next: "tach_hai_lan" },
            { label: "Ngừng ghi và xoá cột trong cùng một lần cho gọn", next: "gop_xoa" },
            { label: "Giữ cột cũ mãi, ghi cả hai nơi cho đỡ rủi ro", next: "giu_mai" },
          ],
        },
        gop_xoa: {
          text: "Lần triển khai hỏng ở khâu khác, bạn cần quay lui, nhưng cột ten đã biến mất cùng với nó. Một bước tưởng gọn lại thành bước không có đường lui.",
          ending: "bad",
        },
        giu_mai: {
          text: "Hai cột dần lệch nhau vì có chỗ chỉ ghi một nơi, và không ai biết cái nào đúng. Nợ kỹ thuật nằm yên cho tới khi gây ra một lỗi khó hiểu.",
          ending: "bad",
        },
        tach_hai_lan: {
          text: "Mỗi lần triển khai đều tự đứng được và lui được. Sau khi chắc chắn không còn nơi nào dùng cột cũ, nó được xoá ở lần riêng, và lịch sử thay đổi đọc rất dễ.",
          ending: "good",
        },
      },
    },
  ],

  "quan-sat-he-thong-dang-chay": [
    {
      type: "scenario",
      title: "Khách báo không đặt được đơn, bảng theo dõi vẫn xanh",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Ba khách nhắn rằng không đặt được đơn. Bảng theo dõi của bạn đang đẹp: bộ xử lý 30%, bộ nhớ ổn định, không máy nào sập. Bạn làm gì đầu tiên?",
          choices: [
            { label: "Trả lời khách là hệ thống ổn, hỏi lại trình duyệt của họ", next: "do_khach" },
            { label: "Khởi động lại các máy chủ cho chắc", next: "khoi_dong" },
            { label: "Xem số đơn thành công mỗi phút và độ trễ luồng đặt đơn", next: "xem_don" },
          ],
        },
        do_khach: {
          text: "Tài nguyên đẹp chứng minh máy khoẻ, chứ không chứng minh người dùng làm được việc của họ. Nửa giờ sau số khách báo lỗi đã gấp mười.",
          ending: "bad",
        },
        khoi_dong: {
          text: "Các máy khởi động lại, mọi người đứng chờ, và không gì thay đổi vì máy vốn không có vấn đề. Bạn mất mười phút và xoá mất trạng thái đang có để điều tra.",
          ending: "bad",
        },
        xem_don: {
          text: "Số đơn thành công tụt từ khoảng 40 xuống 6 mỗi phút (số minh hoạ) từ 14:05, độ trễ bước thanh toán tăng vọt. Bộ xử lý thấp vì phần lớn yêu cầu đang chờ rồi hết hạn. Tìm nguyên nhân bằng cách nào?",
          choices: [
            { label: "Đọc toàn bộ nhật ký từ sáng tới giờ", next: "doc_het" },
            { label: "Xem thay đổi nào đã vào hệ thống quanh 14:05", next: "xem_thay_doi" },
            { label: "Thêm máy chủ để tăng khả năng xử lý", next: "them_may" },
          ],
        },
        doc_het: {
          text: "Hàng chục nghìn dòng nhật ký, không điểm neo thời gian. Bạn lạc trong đó, và đến khi tìm ra thì tụt đơn đã kéo dài gần một tiếng.",
          ending: "bad",
        },
        them_may: {
          text: "Máy chủ mới lên, nhưng bộ xử lý vốn đang thấp nên thêm máy không giúp gì. Chi phí tăng, đơn vẫn không lên.",
          ending: "bad",
        },
        xem_thay_doi: {
          text: "Một cờ tính năng cho bước thanh toán được bật lúc 14:04. Bạn tắt cờ, số đơn quay lại 40 mỗi phút trong hai phút. Cái cứu bạn là chỉ số mô tả việc người dùng làm được, không phải mức dùng tài nguyên.",
          ending: "good",
        },
      },
    },
  ],

  "hau-su-co-khong-do-loi": [
    {
      type: "scenario",
      title: "Buổi họp sau sự cố xoá nhầm dữ liệu",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Tuần trước, một kỹ sư chạy lệnh xoá trên cửa sổ dòng lệnh của môi trường thật vì tưởng đang ở môi trường thử. Dịch vụ phải khôi phục mất hai giờ. Bạn chủ trì buổi họp. Câu mở đầu của bạn là gì?",
          choices: [
            { label: "Ai là người đã chạy lệnh đó vào hôm thứ Ba?", next: "hoi_ai" },
            { label: "Cần cẩn thận hơn nhé, ghi vậy rồi đóng buổi họp", next: "nhac_nho" },
            { label: "Điều gì cho phép lệnh đó chạy được trên môi trường thật?", next: "hoi_vi_sao" },
          ],
        },
        hoi_ai: {
          text: "Tên người đó vào biên bản và cả phòng im lặng. Lần sau một thao tác nhầm khác xảy ra, người ta sẽ chọn cách giấu nó đi thay vì báo sớm.",
          ending: "bad",
        },
        nhac_nho: {
          text: "Biên bản gọn, mọi người rời đi nhẹ nhõm. Nhưng không có gì trong hệ thống thay đổi, và ba tháng sau một người khác gõ nhầm đúng cách đó.",
          ending: "bad",
        },
        hoi_vi_sao: {
          text: "Cuộc trao đổi cho thấy cửa sổ môi trường thật và môi trường thử trông giống hệt nhau, và lệnh xoá chạy ngay không hỏi lại. Bạn cần rút ra hành động. Chọn cách nào?",
          choices: [
            { label: "Giao cả đội rà lại quy trình vận hành trong quý này", next: "chung_chung" },
            { label: "Cấm mọi người dùng dòng lệnh trên môi trường thật", next: "cam_het" },
            { label: "Giao một người thêm bước xác nhận cho lệnh xoá, hạn thứ Sáu", next: "co_chu" },
          ],
        },
        chung_chung: {
          text: "Việc thuộc về mọi người nên không ai làm. Tháng sau không còn ai nhớ buổi họp, và tỷ lệ hành động hoàn thành là con số không.",
          ending: "bad",
        },
        cam_het: {
          text: "Mọi thao tác khẩn cấp giờ phải chờ một người có quyền, nên lần sự cố sau việc khôi phục chậm hẳn đi. Rủi ro chỉ đổi chỗ chứ chưa mất.",
          ending: "bad",
        },
        co_chu: {
          text: "Có tên người, có hạn, và nó sửa đúng chỗ hệ thống cho phép sai: lệnh xoá trên môi trường thật giờ bắt gõ lại tên môi trường. Tuần sau bạn kiểm tra việc đã xong chưa.",
          ending: "good",
        },
      },
    },
  ],

  "chi-so-phu-phiem": [
    {
      type: "scenario",
      title: "Báo cáo thành công của đợt ra mắt",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Sếp muốn một trang cho thấy đợt ra mắt đã thành công. Tổng số đăng ký đạt 120.000 (số minh hoạ) và tăng đều mỗi tháng. Bạn đưa vào báo cáo con số nào?",
          choices: [
            { label: "Tổng số đăng ký đặt lên đầu, vì nó tăng đều", next: "tong_dang_ky" },
            { label: "Doanh thu trung bình mỗi người dùng, đang tăng", next: "trung_binh" },
            { label: "Thêm tỷ lệ người quay lại sau 7 ngày, theo từng tháng", next: "quay_lai" },
          ],
        },
        tong_dang_ky: {
          text: "Đường biểu đồ đẹp, và sếp hài lòng. Nhưng một con số không bao giờ giảm không phân biệt được tháng tốt với tháng tệ; sản phẩm mất người dùng mà báo cáo vẫn lên.",
          ending: "bad",
        },
        trung_binh: {
          text: "Trung bình tăng nhờ một khách hàng lớn mới, trong khi những người còn lại tiêu ít đi. Báo cáo kể một câu chuyện đẹp về điều ngược lại với thực tế.",
          ending: "bad",
        },
        quay_lai: {
          text: "Tỷ lệ quay lại sau 7 ngày giảm từ 38% xuống 29% (số minh hoạ) qua các tháng, dù tổng đăng ký vẫn tăng. Sếp hỏi: vậy kết luận của bạn là gì?",
          choices: [
            { label: "Vẫn nhấn vào tổng đăng ký, nhắc thêm tỷ lệ quay lại ở cuối", next: "nhan_tong" },
            { label: "Lấy tỷ lệ quay lại làm số chính, kèm tổng đăng ký làm bối cảnh", next: "so_chinh" },
            { label: "Bỏ cả hai con số và kết luận là chưa đủ dữ liệu", next: "bo_het" },
          ],
        },
        nhan_tong: {
          text: "Ý chính vẫn là tin tốt, còn con số đáng lo nằm ở dòng cuối ít người đọc. Quý sau tổng đăng ký chững lại và không ai đã được cảnh báo.",
          ending: "bad",
        },
        bo_het: {
          text: "Báo cáo trống rỗng và sếp không có gì để hành động. Dữ liệu thì có đủ, bạn chỉ chưa chịu nói điều nó đang nói.",
          ending: "bad",
        },
        so_chinh: {
          text: "Báo cáo nêu thẳng rằng người đăng ký nhiều hơn nhưng ở lại ít hơn, và đề xuất tìm lý do. Con số này có thể giảm, nên nó mới dẫn tới hành động.",
          ending: "good",
        },
      },
    },
  ],

  "phan-tich-theo-nhom-cohort": [
    {
      type: "scenario",
      title: "Chi thêm quảng cáo, người dùng hoạt động tăng 20%",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Sau khi tăng ngân sách quảng cáo, số người dùng hoạt động hằng tháng tăng 20% (số minh hoạ). Bạn nghi ngờ sản phẩm đang giữ chân người dùng kém đi nhưng tổng số che mất. Bạn kiểm tra bằng cách nào?",
          choices: [
            { label: "Mừng vì tổng tăng, vì đó là mục tiêu của quý", next: "mung_tong" },
            { label: "So tỷ lệ còn hoạt động hôm nay của nhóm tháng 1 và tháng 6", next: "so_hom_nay" },
            { label: "Chia theo tháng đăng ký, so tỷ lệ còn hoạt động sau 30 ngày", next: "cung_tuoi" },
          ],
        },
        mung_tong: {
          text: "Dòng người vào lớn hơn nên tổng tăng, kể cả khi tỷ lệ bỏ đi xấu dần. Hai xu hướng triệt tiêu nhau trong một con số và bạn không thấy được cái nào đang xảy ra.",
          ending: "bad",
        },
        so_hom_nay: {
          text: "Nhóm tháng 6 trông tốt hơn hẳn vì họ mới bắt đầu, còn nhóm tháng 1 đã có thời gian rơi rụng. Hai nhóm không cùng độ tuổi nên phép so này kết luận sai.",
          ending: "bad",
        },
        cung_tuoi: {
          text: "Ở mốc 30 ngày, nhóm tháng 1 còn 42% hoạt động, nhóm tháng 6 chỉ 31% (số minh hoạ). Giữ chân đang xấu đi, trùng với đợt tăng quảng cáo. Để hiểu vì sao, bạn làm gì tiếp?",
          choices: [
            { label: "Chia nhóm tháng 6 theo kênh đăng ký lúc bắt đầu", next: "theo_kenh" },
            { label: "Chia theo người dùng hoạt động nhiều và hoạt động ít", next: "theo_hanh_vi" },
            { label: "Tăng thêm quảng cáo để tổng tiếp tục đi lên", next: "them_quang_cao" },
          ],
        },
        theo_hanh_vi: {
          text: "Nhóm hoạt động nhiều tất nhiên giữ chân tốt hơn, vì bạn đã chọn họ theo kết quả. Phép chia này luôn cho ra điều bạn đã biết và không chỉ ra nguyên nhân.",
          ending: "bad",
        },
        them_quang_cao: {
          text: "Tổng tiếp tục tăng, chi phí cũng vậy, còn giữ chân vẫn trượt. Bạn đang trả tiền để lấp một cái xô thủng.",
          ending: "bad",
        },
        theo_kenh: {
          text: "Thuộc tính có sẵn lúc đăng ký cho thấy kênh quảng cáo mới kéo về nhiều người ít phù hợp, giữ chân thấp hơn hẳn các kênh cũ. Bạn đề xuất đổi cách phân bổ ngân sách, dựa trên một xu hướng mà tổng số đã che khuất.",
          ending: "good",
        },
      },
    },
  ],

  "pheu-va-cho-roi": [
    {
      type: "scenario",
      title: "Chỉ 20% người dùng hoàn tất đăng ký",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Luồng đăng ký có năm bước và chỉ 20% người bắt đầu đi hết (số minh hoạ). Sếp muốn cải thiện. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Thiết kế lại toàn bộ giao diện đăng ký cho hấp dẫn hơn", next: "thiet_ke_lai" },
            { label: "Chia thành mười bước nhỏ để thấy rõ hơn từng chút", next: "chia_nho" },
            { label: "Đo từng bước, tách theo thiết bị rồi tìm chỗ rơi lớn", next: "do_tung_buoc" },
          ],
        },
        thiet_ke_lai: {
          text: "Hai tháng sau giao diện đẹp hơn, tỷ lệ hoàn tất vẫn 21%. Bạn chưa từng biết người dùng rơi ra ở đâu, nên bản thiết kế mới chỉ là phỏng đoán đắt tiền.",
          ending: "bad",
        },
        chia_nho: {
          text: "Mỗi bước rơi vài phần trăm và biểu đồ phẳng. Phễu mười bước không chỉ ra việc cụ thể nào để giao cho ai.",
          ending: "bad",
        },
        do_tung_buoc: {
          text: "Ở bước 3 (nhập số điện thoại), trên điện thoại số người đi tiếp giảm từ 70 xuống 25, còn trên máy tính vẫn ổn (số minh hoạ). Cú rơi này có địa chỉ cụ thể. Bạn làm gì tiếp?",
          choices: [
            { label: "Xem bản ghi phiên hoặc hỏi vài người dùng điện thoại vì sao", next: "tim_ly_do" },
            { label: "Coi là thiếu động lực rồi gửi thư nhắc cho người bỏ dở", next: "gui_thu" },
            { label: "Bỏ bước 3 cho mọi thiết bị để đi cho nhanh", next: "bo_buoc" },
          ],
        },
        gui_thu: {
          text: "Thư nhắc kéo về ít người, và họ lại rơi đúng chỗ đó. Vấn đề là rào cản trên màn hình nhỏ, không phải động lực.",
          ending: "bad",
        },
        bo_buoc: {
          text: "Bạn chưa biết nguyên nhân nên bỏ nhầm cả phần cần thiết cho người dùng máy tính, trong khi lỗi thật chỉ nằm ở điện thoại. Chất lượng hồ sơ giảm mà vấn đề gốc còn nguyên.",
          ending: "bad",
        },
        tim_ly_do: {
          text: "Bản ghi cho thấy bàn phím số che mất nút Tiếp tục trên màn hình nhỏ. Sửa mất nửa ngày; tỷ lệ qua bước 3 trên điện thoại gần bằng máy tính. Bạn đã sửa đúng chỗ rơi thay vì cả luồng.",
          ending: "good",
        },
      },
    },
  ],

  "thu-nghiem-a-b": [
    {
      type: "scenario",
      title: "Nút Mua ngay mới và con số tăng 8%",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Tuần này bạn đổi nút Mua ngay sang kiểu mới, và đơn hàng tăng 8% so với tuần trước. Tuần này có thêm một chiến dịch quảng cáo. Đội thiết kế muốn công bố nút mới thắng. Bạn làm gì?",
          choices: [
            { label: "Công bố nút mới thắng vì số liệu tăng rõ", next: "cong_bo_som" },
            { label: "Trừ phần ngày lễ và quảng cáo rồi so lại với tuần trước", next: "so_tuan_truoc" },
            { label: "Chạy A/B song song, chia ngẫu nhiên, chọn chỉ số chính trước", next: "chay_ab" },
          ],
        },
        cong_bo_som: {
          text: "Đội quảng cáo cũng nhận công và có số liệu ủng hộ. Không ai tách được phần nào do nút, và quyết định giữ nút được đưa ra bằng may rủi.",
          ending: "bad",
        },
        so_tuan_truoc: {
          text: "Bạn ước lượng ảnh hưởng của quảng cáo bằng cảm tính rồi trừ đi. Hai tuần khác nhau còn nhiều thứ khác nữa, nên con số cuối là phỏng đoán có vẻ chính xác.",
          ending: "bad",
        },
        chay_ab: {
          text: "Hai nhóm chạy cùng thời điểm, nên quảng cáo và ngày lễ chạm cả hai như nhau. Sau 3 ngày, nhóm B hơn nhóm A khoảng 5% (số minh hoạ). Đội muốn có kết luận ngay. Bạn xử lý thế nào?",
          choices: [
            { label: "Dừng sớm và công bố vì con số đang đẹp", next: "dung_som" },
            { label: "Đổi chỉ số chính sang số lượt nhấp nút vì nó cao hơn", next: "doi_chi_so" },
            { label: "Chạy tới cỡ mẫu đã định rồi mới đọc kết quả", next: "du_mau" },
          ],
        },
        dung_som: {
          text: "Nhìn sớm khi mẫu còn nhỏ thì con số dao động rất mạnh. Một tuần sau khoảng cách thu hẹp về gần không, và bạn đã phát hành vì một lần may.",
          ending: "bad",
        },
        doi_chi_so: {
          text: "Lượt nhấp tăng nhưng đơn thì không. Đổi chỉ số giữa chừng để tìm con số đẹp là cách chắc chắn nhất để tự lừa mình.",
          ending: "bad",
        },
        du_mau: {
          text: "Ở cỡ mẫu đã định, khác biệt còn 1,5% và vượt ngưỡng đáng phát hành mà đội đặt từ đầu. Bạn phát hành với bằng chứng cả hai phía đều tin được.",
          ending: "good",
        },
      },
    },
  ],

  "chi-so-dan-dat": [
    {
      type: "scenario",
      title: "Rút gọn biểu mẫu: hai mươi chỉ số, không ai thắng",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Đội muốn rút gọn biểu mẫu đăng ký. Phương án này tăng số đăng ký nhưng giảm chất lượng hồ sơ. Bảng theo dõi có hai mươi chỉ số ngang hàng, và mỗi người trong phòng họp chỉ vào con số ủng hộ phương án của mình. Bạn xử lý thế nào?",
          choices: [
            { label: "Chọn bên nào có nhiều chỉ số ủng hộ hơn", next: "dem_so" },
            { label: "Gộp hai mươi chỉ số thành một điểm tổng trung bình", next: "diem_tong" },
            { label: "Chốt một chỉ số dẫn dắt, kèm vài ràng buộc không được xấu đi", next: "chot_mot" },
          ],
        },
        dem_so: {
          text: "Mỗi bên chỉ cần thêm một chỉ số nữa là thắng. Cuộc thảo luận chuyển thành cuộc chọn chỉ số, và quyết định phụ thuộc vào ai nói to hơn.",
          ending: "bad",
        },
        diem_tong: {
          text: "Điểm tổng nhích lên và nhích xuống rất ít, nên mọi phương án đều trông như nhau. Bạn có một con số nhưng không ai biết nó đo cái gì.",
          ending: "bad",
        },
        chot_mot: {
          text: "Cả phòng chọn tỷ lệ hồ sơ đủ điều kiện sau 14 ngày làm chỉ số dẫn dắt, kèm hai ràng buộc: tỷ lệ lỗi và thời gian hỗ trợ. Giám đốc đề nghị gắn chỉ số này vào thưởng cá nhân từng người. Bạn trả lời thế nào?",
          choices: [
            { label: "Đồng ý, có thưởng thì ai cũng cố gắng hơn", next: "gan_thuong" },
            { label: "Dùng nó để chọn hướng đi, không dùng chấm điểm từng người", next: "chon_huong" },
            { label: "Thêm năm chỉ số nữa vào thưởng để chấm công bằng hơn", next: "them_chi_so" },
          ],
        },
        gan_thuong: {
          text: "Một tháng sau tỷ lệ này tăng vọt vì người ta bắt đầu nới điều kiện đủ điều kiện và loại hồ sơ khó. Khi con số trở thành mục tiêu, cách đạt rẻ nhất sẽ thắng.",
          ending: "bad",
        },
        them_chi_so: {
          text: "Danh sách thưởng thành mười hai tiêu chí, ai cũng tìm được một tiêu chí để tự chấm mình đạt. Đội lại mất đúng điều bạn vừa cố giành: một thước chung.",
          ending: "bad",
        },
        chon_huong: {
          text: "Chỉ số vẫn quyết định phương án nào thắng, còn con người không bị chấm bằng nó. Phương án nào làm xấu ràng buộc thì bị loại, dù tăng đăng ký.",
          ending: "good",
        },
      },
    },
  ],

  "uoc-luong-va-vi-sao-no-sai": [
    {
      type: "scenario",
      title: "Người quản lý hỏi: tính năng báo cáo xong sau bao lâu?",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Tính năng báo cáo gồm lọc dữ liệu, bảng tổng hợp và xuất PDF. Đội chưa từng xuất PDF. Người quản lý hỏi bao lâu thì xong và cần trả lời hôm nay. Bạn nói gì?",
          choices: [
            { label: "Hai tuần, cộng nhanh các bước đang thấy rõ", next: "cong_nhanh" },
            { label: "Chia việc theo phần đội từng làm, nói theo khoảng", next: "theo_khoang" },
            { label: "Ba tuần, thêm đúng 20% cho an toàn", next: "them_20" },
          ],
        },
        cong_nhanh: {
          text: "Bạn chỉ cộng các bước đã nhìn thấy. Thư viện xuất PDF không tương thích với phiên bản hiện tại làm mất thêm bốn ngày, và hạn đã được báo cho khách.",
          ending: "bad",
        },
        them_20: {
          text: "Con số nghe có vẻ cẩn thận nhưng không dựa trên dữ liệu nào. Phần chưa biết vẫn không nằm trong đó, và vẫn chỉ có một con số để người ta bấu vào.",
          ending: "bad",
        },
        theo_khoang: {
          text: "Bạn nói 3 đến 5 tuần: lọc và bảng tổng hợp giống việc đã làm nên khá chắc, xuất PDF thì rủi ro vì chưa ai thử. Người quản lý nói cần đúng một con số để báo khách. Bạn đáp thế nào?",
          choices: [
            { label: "Đưa 3 tuần, là cận dưới để có đà", next: "can_duoi" },
            { label: "Đưa 5 tuần, nêu rõ rủi ro PDF và hẹn ước lượng lại", next: "co_rui_ro" },
            { label: "Từ chối, vì không ai ước lượng được phần chưa biết", next: "tu_choi" },
          ],
        },
        can_duoi: {
          text: "Bất ngờ chỉ làm việc lâu thêm chứ không bao giờ ngắn đi, nên cận dưới gần như chắc chắn bị vượt. Bạn trễ ngay lần đầu và uy tín của mọi ước lượng sau đó giảm.",
          ending: "bad",
        },
        tu_choi: {
          text: "Người quản lý vẫn cần một con số, nên sẽ tự chọn một, thường là con số lạc quan nhất. Bạn mất cơ hội dẫn dắt cuộc trao đổi.",
          ending: "bad",
        },
        co_rui_ro: {
          text: "Bạn dành một ngày thử xuất PDF thật nhanh để giảm phần chưa biết, rồi ước lượng lại còn 4 tuần. Người quản lý biết con số này chắc đến đâu, và báo khách có chừa chỗ.",
          ending: "good",
        },
      },
    },
  ],

  "pham-vi-va-danh-doi": [
    {
      type: "scenario",
      title: "Còn hai tuần, mới xong khoảng 60%",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Còn hai tuần tới hạn và công việc mới xong khoảng 60%. Phần còn lại gồm tính năng A (khách cần để ký hợp đồng), B (làm đẹp giao diện), C (xuất báo cáo, vài khách xin) và kiểm thử. Bạn làm gì?",
          choices: [
            { label: "Bỏ bớt kiểm thử cho kịp, không cần báo ai", next: "bo_kiem_thu" },
            { label: "Chủ động cắt phạm vi và báo người quản lý ngay hôm nay", next: "chu_dong" },
            { label: "Giữ nguyên mọi thứ, tăng ca và báo nếu sát hạn", next: "tang_ca" },
          ],
        },
        bo_kiem_thu: {
          text: "Bản giao đúng hạn, nhưng một lỗi ở tính năng A đến tay khách ngay ngày đầu. Việc bỏ kiểm thử không cần nói với ai nên cũng không ai biết đã chọn nhường nó.",
          ending: "bad",
        },
        tang_ca: {
          text: "Đội kiệt sức, chất lượng giảm dần, và đến hôm trước hạn hai ngày bạn mới báo trễ. Lúc đó mọi phương án của người quản lý đã bị lấy mất.",
          ending: "bad",
        },
        chu_dong: {
          text: "Người quản lý cảm ơn vì báo sớm và hỏi nên cắt gì. Bạn đề xuất phương án nào?",
          choices: [
            { label: "Cắt một nửa mỗi tính năng cho công bằng", next: "cat_deu" },
            { label: "Cắt B, hoãn C sang đợt sau, giữ A và kiểm thử", next: "cat_dung" },
            { label: "Cắt A vì đây là phần khó nhất còn lại", next: "cat_a" },
          ],
        },
        cat_deu: {
          text: "Cả ba tính năng đều dở dang, không cái nào đủ dùng, và khách ký hợp đồng cần A thì không có A hoàn chỉnh.",
          ending: "bad",
        },
        cat_a: {
          text: "Khó làm không có nghĩa là ít quan trọng. Khách cần A để ký hợp đồng nên dự án giao đúng hạn mà không đạt mục tiêu nào.",
          ending: "bad",
        },
        cat_dung: {
          text: "A giao đủ và đã kiểm thử, B và C có ngày cụ thể ở đợt sau. Người quản lý báo trước cho khách xin C, nên không ai bất ngờ. Bạn chọn nhường chứ không để nó tự bị nhường.",
          ending: "good",
        },
      },
    },
  ],

  "uu-tien-va-chi-phi-tri-hoan": [
    {
      type: "scenario",
      title: "Bốn việc, một đội, thời gian không đủ",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Đội có bốn việc (số minh hoạ): A chuyển thanh toán trước mốc cố định còn 30 ngày, cần 10 ngày; B sửa lỗi đang chặn ba đội khác, cần 2 ngày; C làm mới giao diện, 15 ngày, làm lúc nào giá trị cũng như nhau; D tối ưu truy vấn, 5 ngày. Bạn xếp thứ tự thế nào?",
          choices: [
            { label: "Việc nào người ta đòi to nhất thì làm trước", next: "dua_tieng_noi" },
            { label: "Việc to nhất làm trước vì giá trị cao nhất", next: "viec_to" },
            { label: "Xếp theo chi phí trì hoãn chia cho công sức", next: "theo_ty_le" },
          ],
        },
        dua_tieng_noi: {
          text: "Đội làm giao diện vì người phụ trách nó nói nhiều nhất. Ba đội vẫn chờ lỗi B, và mốc cố định của A dần sát lại.",
          ending: "bad",
        },
        viec_to: {
          text: "Bạn dồn cả đội vào C trong ba tuần vì nó lớn nhất. Ba đội chờ B thêm nhiều ngày, và C vốn làm tuần nào cũng như nhau nên chẳng có gì mất khi hoãn.",
          ending: "bad",
        },
        theo_ty_le: {
          text: "Việc B hai ngày mà gỡ ba đội đang đứng chờ nhảy lên đầu danh sách. Bạn làm B xong, ba đội chạy lại. Tiếp theo bạn chọn gì?",
          choices: [
            { label: "Làm C trước vì nó dễ thấy nhất với lãnh đạo", next: "lam_c" },
            { label: "Làm A, mốc cố định còn 28 ngày mà việc cần 10", next: "lam_a" },
            { label: "Chia đội làm đồng thời A và C cho đều", next: "chia_doi" },
          ],
        },
        lam_c: {
          text: "C mất 15 ngày, A còn lại 13 ngày để làm việc cần 10 và không còn chỗ cho bất ngờ. Việc có chi phí trì hoãn thấp đã lấy chỗ của việc có mốc cố định.",
          ending: "bad",
        },
        chia_doi: {
          text: "Mỗi việc chỉ có nửa đội nên cả hai đều chậm gần gấp đôi, và A vẫn đụng mốc cố định mà C chưa xong để đáng có. Chia đều nghe công bằng nhưng không phục vụ ưu tiên nào.",
          ending: "bad",
        },
        lam_a: {
          text: "A xong sớm, còn dư thời gian cho bất ngờ. C và D vào hàng đợi, vì hoãn chúng gần như không mất gì. Danh sách vẫn dài, nhưng thứ tự đã có lý do.",
          ending: "good",
        },
      },
    },
  ],
};
