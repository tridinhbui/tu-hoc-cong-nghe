import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r07. Một người viết cho một tệp.
export const R07_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "su-kien-chua-du-lieu-hay-tham-chieu": [
    {
      type: "scenario",
      title: "Sự kiện đơn đã thanh toán nên mang gì",
      start: "start",
      nodes: {
        start: {
          text: "Dịch vụ đơn hàng phát sự kiện DonDaThanhToan để kho và kế toán cùng nghe. Bạn đang chốt nội dung của sự kiện này. Bạn chọn cách nào?",
          choices: [
            { label: "Chỉ gửi mã đơn, người nghe tự gọi lại để lấy chi tiết", next: "idonly" },
            { label: "Gửi các trường người nghe cần, đúng như lúc đơn thanh toán", next: "snapshot" },
            { label: "Gửi nguyên bản ghi đơn, kèm mọi cột trong bảng đơn hàng", next: "everything" },
          ],
        },
        idonly: {
          text: "Kho nhận sự kiện chậm vài phút vì hàng đợi đông. Trong lúc đó khách đã huỷ và được hoàn tiền, nên khi kho gọi lại thì đọc ra đơn ở trạng thái đã hoàn. Kho không thấy lỗi nào, chỉ lặng lẽ bỏ qua đơn, còn kế toán ghi nhận một khoản thu đã không còn tồn tại.",
          ending: "bad",
        },
        everything: {
          text: "Ba dịch vụ bắt đầu đọc các cột nội bộ như ghi_chu_noi_bo và ma_khuyen_mai_cu. Vài tháng sau đội đơn hàng đổi tên một cột để dọn dẹp, và cả ba dịch vụ hỏng cùng lúc dù không ai nhắc tới chúng trong thay đổi đó. Bạn đã vô tình cam kết cả bảng làm hợp đồng.",
          ending: "bad",
        },
        snapshot: {
          text: "Mỗi người nghe nhận đúng những gì nó cần, và các giá trị là của thời điểm đơn được thanh toán nên không ai bị lệch. Giờ có thêm yêu cầu: kế toán muốn đính kèm tệp hoá đơn PDF dung lượng vài chục megabyte. Bạn xử lý thế nào?",
          choices: [
            { label: "Nhét nội dung tệp PDF thẳng vào thân sự kiện", next: "bigbody" },
            { label: "Đặt tệp ở kho lưu trữ, sự kiện chỉ mang đường dẫn tới nó", next: "pointer" },
          ],
        },
        bigbody: {
          text: "Hệ thống tin nhắn có giới hạn kích thước, và sự kiện này vượt xa giới hạn đó nên bị từ chối ngay khi gửi. Đơn đã thanh toán nhưng sự kiện không đi được, kho không bao giờ biết có đơn cần soạn hàng.",
          ending: "bad",
        },
        pointer: {
          text: "Sự kiện vẫn nhỏ và đủ dữ liệu, riêng phần quá lớn thì đi bằng tham chiếu. Đây đúng là chỗ tham chiếu hợp lý: dữ liệu to đến mức không đưa vào tin nhắn được, còn mọi thứ người nghe cần để hành động đã nằm sẵn trong sự kiện.",
          ending: "good",
        },
      },
    },
  ],

  "theo-doi-he-thong-bat-dong-bo": [
    {
      type: "scenario",
      title: "Bảng theo dõi xanh mà khách vẫn báo mất đơn",
      start: "start",
      nodes: {
        start: {
          text: "Sáng thứ hai, bộ phận hỗ trợ báo nhiều khách đặt hàng nhưng chưa nhận được email xác nhận. Bảng theo dõi hạ tầng hiện toàn màu xanh: hàng đợi không lỗi, máy chủ không quá tải. Bạn làm gì trước?",
          choices: [
            { label: "Kết luận hệ thống ổn và nhờ hỗ trợ kiểm tra lại từng khách", next: "dismiss" },
            { label: "Lấy một đơn cụ thể và lần theo mã định danh của nó qua từng chặng", next: "trace" },
            { label: "Thêm máy chủ xử lý cho mọi hàng đợi để chắc chắn", next: "scale" },
          ],
        },
        dismiss: {
          text: "Hạ tầng xanh chỉ cho biết máy móc đang chạy, không cho biết đơn có đi đến nơi hay không. Hỗ trợ kiểm tra từng khách mất cả buổi, và đến chiều con số đơn chưa xác nhận đã gấp ba. Bạn mất cả buổi mà không biết đứt ở đâu.",
          ending: "bad",
        },
        scale: {
          text: "Thêm máy tốn tiền mà không đổi gì, vì nghẽn không nằm ở chỗ bạn thêm. Bạn không có dữ liệu nào cho thấy chỗ đứt nên mọi thay đổi chỉ là đoán, và các đơn kẹt vẫn nằm đó.",
          ending: "bad",
        },
        trace: {
          text: "Mã định danh cho thấy đơn đã vào hàng đợi thanh toán, qua dịch vụ kho, rồi dừng ở hàng đợi gửi email, nơi nó nằm chờ hơn bốn mươi phút. Giờ bạn biết chỗ đứt. Để lần sau không phải lần theo bằng tay, bạn thêm cảnh báo nào?",
          choices: [
            { label: "Báo khi một hàng đợi có thêm một lỗi xử lý bất kỳ", next: "errors" },
            { label: "Báo khi số đơn chưa xác nhận sau ba mươi phút vượt ngưỡng", next: "business" },
          ],
        },
        errors: {
          text: "Lần này việc không lỗi, nó chỉ chờ rất lâu. Cảnh báo theo lỗi im lặng suốt sự cố, và lần sau khách vẫn là người báo cho bạn biết trước.",
          ending: "bad",
        },
        business: {
          text: "Cảnh báo này nhìn từ phía nghiệp vụ nên bắt được mọi kiểu đứt, kể cả kiểu không sinh ra lỗi nào. Cùng với mã định danh đi xuyên mọi hàng đợi, bạn trả lời được ngay ba câu: việc đang ở đâu, chờ bao lâu, và hỏng ở chặng nào.",
          ending: "good",
        },
      },
    },
  ],

  "bat-bien-khi-lap-lai-dieu-kien-bat-buoc": [
    {
      type: "scenario",
      title: "Người nghe nhận cùng một tin hai lần",
      start: "start",
      nodes: {
        start: {
          text: "Hệ thống tin nhắn của bạn giao tin ít nhất một lần, nghĩa là thỉnh thoảng một tin đến hai lần, nhất là sau mỗi lần triển khai. Bạn đang viết người nghe cho tin ThuNhapDonHang, xử lý bằng cách cộng 1 vào tổng số đơn của ngày. Bạn làm gì?",
          choices: [
            { label: "Giữ nguyên, vì tin trùng hiếm khi xảy ra", next: "ignore" },
            { label: "Viết lại thao tác thành đặt tổng số đơn bằng số đếm lại từ bảng đơn", next: "rewrite" },
            { label: "Bọc cả việc xử lý trong một giao dịch cơ sở dữ liệu", next: "tx" },
          ],
        },
        ignore: {
          text: "Đến lần triển khai tiếp theo, hàng trăm tin được giao lại và tổng số đơn trong ngày bị đếm gấp đôi. Báo cáo doanh thu sai suốt ngày hôm đó, và không dòng nhật ký nào báo lỗi vì mỗi lần xử lý đều thành công.",
          ending: "bad",
        },
        tx: {
          text: "Giao dịch bảo đảm một lần chạy hoặc xong hết hoặc không gì cả, nhưng nó không nói gì về việc chạy hai lần. Tin trùng vẫn cộng thêm 1 lần nữa, và tổng vẫn lệch. Giao dịch và tính bất biến giải hai vấn đề khác nhau.",
          ending: "bad",
        },
        rewrite: {
          text: "Đặt giá trị thì chạy bao nhiêu lần cũng ra cùng kết quả, nên tin trùng vô hại và bạn không cần dựng thêm cơ chế nào. Sang việc thứ hai của cùng tin này: gửi email cảm ơn khách. Bạn làm gì?",
          choices: [
            { label: "Gửi email rồi mới ghi lại là đã gửi", next: "sendfirst" },
            { label: "Ghi lại đã gửi trước, rồi mới gửi email", next: "recordfirst" },
          ],
        },
        sendfirst: {
          text: "Nếu tiến trình chết ngay sau khi gửi, tin được giao lại, bản ghi vẫn trống và khách nhận email lần thứ hai. Email đã đi ra ngoài thì không thu hồi được, nên thứ tự này để lộ đúng khe hở bạn định đóng.",
          ending: "bad",
        },
        recordfirst: {
          text: "Khi tin được giao lại, người nghe thấy bản ghi đã có và bỏ qua phần gửi. Hành động ra bên ngoài không thu hồi được nên phải ghi trước khi làm, và với cách này mỗi khách chỉ nhận một email dù tin đến bao nhiêu lần.",
          ending: "good",
        },
      },
    },
  ],

  "khoa-chong-trung": [
    {
      type: "scenario",
      title: "Khách bấm thanh toán, mạng chập chờn",
      start: "start",
      nodes: {
        start: {
          text: "Ứng dụng gọi dịch vụ thanh toán để trừ tiền. Mạng yếu nên yêu cầu hết thời gian chờ, và ứng dụng không biết tiền đã bị trừ hay chưa. Ứng dụng sẽ thử lại, vậy khoá chống trùng nên đến từ đâu?",
          choices: [
            { label: "Mỗi lần thử lại sinh một khoá ngẫu nhiên mới", next: "fresh" },
            { label: "Bên gọi sinh một khoá cho ý định này và gửi lại đúng khoá đó", next: "caller" },
            { label: "Máy chủ sinh khoá từ giờ nhận yêu cầu, tới từng mili giây", next: "server" },
          ],
        },
        fresh: {
          text: "Với máy chủ, mỗi lần thử lại là một yêu cầu hoàn toàn mới. Nếu lần đầu thực ra đã thành công, khách bị trừ tiền hai lần và khoá chống trùng không chống được gì.",
          ending: "bad",
        },
        server: {
          text: "Hai lần thử của cùng một ý định đến vào hai thời điểm khác nhau nên cho hai khoá khác nhau. Khoá sinh theo dấu thời gian không nhận ra đây là cùng một việc, và khách vẫn bị trừ hai lần.",
          ending: "bad",
        },
        caller: {
          text: "Lần thử lại mang cùng khoá, nên máy chủ nhận ra và không trừ tiền thêm. Bây giờ chọn cách máy chủ phản hồi khi gặp một khoá đã xử lý rồi.",
          choices: [
            { label: "Trả lỗi 409 vì khoá đã tồn tại, bên gọi tự xử lý", next: "conflict" },
            { label: "Trả lại đúng kết quả của lần đầu, như thể vừa xử lý xong", next: "replay" },
          ],
        },
        conflict: {
          text: "Ứng dụng đang cần biết lần đầu thành công hay thất bại, mà lỗi trùng không nói điều đó. Nó hoặc hiện lỗi cho khách đã bị trừ tiền, hoặc phải gọi thêm một yêu cầu tra cứu, và khách có thể bấm thanh toán lần nữa.",
          ending: "bad",
        },
        replay: {
          text: "Ứng dụng nhận lại đúng kết quả đã thành công và hiện biên lai. Bạn còn một việc cuối: ghi khoá và trừ tiền trong cùng một giao dịch, và giữ khoá lâu hơn cửa sổ thử lại. Với hai điều đó, thử lại bao nhiêu lần cũng chỉ trừ tiền một lần.",
          ending: "good",
        },
      },
    },
  ],

  "mau-hop-thu-di": [
    {
      type: "scenario",
      title: "Đơn đã lưu nhưng tin nhắn không bao giờ đi",
      start: "start",
      nodes: {
        start: {
          text: "Dịch vụ đơn hàng lưu đơn vào cơ sở dữ liệu rồi gửi tin nhắn cho kho. Có ngày máy chủ khởi động lại đúng giữa hai việc đó: đơn đã lưu, tin chưa gửi, và kho không biết có đơn. Bạn sửa thế nào?",
          choices: [
            { label: "Đổi thứ tự: gửi tin nhắn trước, rồi mới lưu đơn", next: "swap" },
            { label: "Bọc việc lưu và việc gửi trong một khối thử lại ba lần", next: "retry" },
            { label: "Ghi đơn và một dòng tin chờ gửi trong cùng một giao dịch", next: "outbox" },
          ],
        },
        swap: {
          text: "Giờ khe hở đổi chiều: tin đã đến kho nhưng lưu đơn thất bại. Kho soạn hàng cho một đơn không tồn tại. Hai thao tác vẫn là hai thao tác, bạn chỉ chuyển lỗi sang phía còn lại.",
          ending: "bad",
        },
        retry: {
          text: "Thử lại giúp khi lỗi chỉ thoáng qua, nhưng khi cả tiến trình chết thì khối thử lại chết theo và không còn gì để thử. Khe hở vẫn nằm đó, chỉ hẹp hơn một chút.",
          ending: "bad",
        },
        outbox: {
          text: "Đơn và dòng tin cùng được lưu hoặc cùng không, nên không còn chuyện chỉ có một nửa. Một tiến trình riêng sẽ đọc bảng hộp thư đi và gửi tin. Nhưng tiến trình gửi xong rồi chết trước khi đánh dấu đã gửi, nên lần quét sau sẽ gửi lại. Kho xử lý ra sao?",
          choices: [
            { label: "Kho bất biến: nhận hai lần cũng chỉ soạn hàng một lần", next: "idem" },
            { label: "Kho cứ soạn hàng mỗi khi nhận được một tin", next: "naive" },
          ],
        },
        naive: {
          text: "Mẫu hộp thư đi đổi việc mất tin lấy việc gửi trùng. Kho không chịu được tin trùng nên soạn hai phần hàng cho một đơn, và bạn đã thay một lỗi lặng lẽ bằng một lỗi khác.",
          ending: "bad",
        },
        idem: {
          text: "Tin trùng đến kho và bị bỏ qua vì đơn đó đã được soạn. Bạn đã đổi nguy cơ mất tin lấy nguy cơ gửi trùng, và gửi trùng thì bên nhận chịu được. Nhớ thêm lịch xoá những dòng đã gửi, nếu không bảng hộp thư đi sẽ phình ra và tiến trình quét chậm dần.",
          ending: "good",
        },
      },
    },
  ],

  "bu-tru-loi-thay-vi-giao-dich-phan-tan": [
    {
      type: "scenario",
      title: "Bước thứ ba của đơn hàng thất bại",
      start: "start",
      nodes: {
        start: {
          text: "Đơn hàng đi qua ba dịch vụ độc lập: giữ hàng ở kho, trừ tiền, rồi tạo vận đơn. Bước tạo vận đơn báo lỗi, trong khi hàng đã giữ và tiền đã trừ. Bạn xử lý thế nào?",
          choices: [
            { label: "Để nguyên và chờ ai đó dọn thủ công vào cuối tuần", next: "leave" },
            { label: "Chạy hành động ngược cho từng bước đã xong, theo thứ tự ngược lại", next: "compensate" },
            { label: "Tìm cách cuộn một giao dịch bao cả ba dịch vụ về như cũ", next: "rollback" },
          ],
        },
        leave: {
          text: "Khách bị trừ tiền cho một đơn không bao giờ được giao, và hàng bị giữ khỏi người khác mua suốt nhiều ngày. Đến lúc có người dọn thì khách đã gọi hỗ trợ và để lại đánh giá xấu.",
          ending: "bad",
        },
        rollback: {
          text: "Ba dịch vụ thuộc ba đội, mỗi bên có cơ sở dữ liệu riêng, và không giao dịch nào bao được cả ba. Bạn mất nhiều tuần tìm cách mà không có kết quả, trong khi đơn lỗi vẫn kẹt.",
          ending: "bad",
        },
        compensate: {
          text: "Hành động ngược đã được định nghĩa từ trước cho mỗi bước. Bạn chạy từ bước sau về bước trước: trả tiền rồi nhả hàng. Khi hoàn tiền, bạn xử lý bản ghi thanh toán cũ thế nào?",
          choices: [
            { label: "Xoá bản ghi thanh toán đi cho sạch số liệu", next: "delete" },
            { label: "Thêm bản ghi hoàn tiền mới, giữ nguyên bản ghi cũ", next: "append" },
          ],
        },
        delete: {
          text: "Kế toán đối chiếu sao kê ngân hàng thấy một khoản tiền đã trừ mà không còn dòng nào trong hệ thống để giải thích. Lịch sử là thứ cần giữ, và bản ghi đã xoá không thể khôi phục.",
          ending: "bad",
        },
        append: {
          text: "Lịch sử còn nguyên: một dòng trừ tiền, một dòng hoàn tiền. Nếu hàng đợi giao lệnh hoàn tiền hai lần thì bản ghi hoàn tiền kiểm tra khoá của đơn và chỉ tạo một lần. Hành động ngược cũng phải bất biến, và chỗ này hay bị quên nhất.",
          ending: "good",
        },
      },
    },
  ],

  "case-mot-hang-doi-bi-ton-dong": [
    {
      type: "scenario",
      title: "Hàng đợi gửi email phình lên",
      start: "start",
      nodes: {
        start: {
          text: "Cảnh báo kêu lúc 14 giờ: hàng đợi gửi email có hàng chục nghìn tin chờ. Bạn mở biểu đồ và vẽ tốc độ tin vào cùng tốc độ tin ra. Tốc độ vào phẳng như mọi ngày, tốc độ ra tụt xuống gần bằng không. Bạn hiểu điều gì?",
          choices: [
            { label: "Lượng đặt hàng tăng đột biến nên cần thêm người tiêu thụ", next: "traffic" },
            { label: "Phía xử lý ở dưới đang hỏng, cần tìm nguyên nhân ở đó", next: "downstream" },
          ],
        },
        traffic: {
          text: "Biểu đồ nói ngược lại: lượng vào không tăng. Bạn tăng số người tiêu thụ lên gấp ba, tất cả cùng gọi nhà cung cấp email đang lỗi, tỉ lệ lỗi tăng, nhà cung cấp chặn luôn địa chỉ của bạn. Thêm người tiêu thụ khi phía dưới đang hỏng chỉ làm nặng thêm.",
          ending: "bad",
        },
        downstream: {
          text: "Nhà cung cấp email đang trả lỗi liên tục, và người tiêu thụ cứ thử lại mãi. Bây giờ bạn có hai việc: giảm tải cho chỗ yếu, và tăng tốc xử lý đống tin đã dồn. Bạn làm việc nào trước?",
          choices: [
            { label: "Tăng thông lượng trước để đống tin vơi nhanh", next: "speedup" },
            { label: "Giảm tải cho chỗ yếu trước, rồi mới tăng thông lượng", next: "relief" },
          ],
        },
        speedup: {
          text: "Bạn đẩy nhiều yêu cầu hơn vào nhà cung cấp đang yếu, nó càng lỗi và càng chậm. Dưới áp lực rất dễ làm ngược thứ tự này, và đống tin dày thêm thay vì vơi đi.",
          ending: "bad",
        },
        relief: {
          text: "Bạn tạm dừng việc gửi, để nhà cung cấp hồi phục, rồi mở lại từ từ và tăng dần thông lượng. Đống tin vơi dần mà không ai bị gửi trùng. Trước khi đóng sự cố, bạn đổi cảnh báo sang tuổi tin cũ nhất và tốc độ tăng, vì cảnh báo cũ để hàng chục nghìn tin tích lại mới kêu.",
          ending: "good",
        },
      },
    },
  ],

  "mot-luong-dat-hang-bat-dong-bo": [
    {
      type: "scenario",
      title: "Cắt luồng đặt hàng thành đồng bộ và bất đồng bộ",
      start: "start",
      nodes: {
        start: {
          text: "Luồng đặt hàng gồm năm việc: kiểm tra tồn kho, trừ tiền, lưu đơn, gửi email, cập nhật báo cáo. Bạn cần quyết định việc nào làm ngay trong lúc khách chờ. Tiêu chí của bạn là gì?",
          choices: [
            { label: "Mọi việc quan trọng đều làm ngay, việc phụ để sau", next: "importance" },
            { label: "Làm ngay những việc quyết định câu trả lời cho khách", next: "answer" },
            { label: "Làm ngay mọi việc để dễ theo dõi, chỉ báo cáo để sau", next: "everything" },
          ],
        },
        importance: {
          text: "Báo cáo doanh thu rất quan trọng với ban giám đốc nên bạn xếp nó vào phần làm ngay. Khi hệ thống báo cáo chậm, khách đứng chờ ở màn hình thanh toán dù chuyện đó không đổi gì ở câu trả lời họ cần. Quan trọng không phải là tiêu chí cắt.",
          ending: "bad",
        },
        everything: {
          text: "Gửi email và trừ tiền nằm cùng một yêu cầu đồng bộ. Nhà cung cấp email chậm vài giây là cả luồng chậm theo, và có ngày nó lỗi làm khách thấy thất bại dù tiền đã trừ.",
          ending: "bad",
        },
        answer: {
          text: "Kiểm tra kho, trừ tiền và lưu đơn quyết định khách được xác nhận hay bị từ chối nên làm ngay. Email và báo cáo đi sau qua hàng đợi. Giờ bạn nối việc lưu đơn với việc phát sự kiện. Bạn làm thế nào?",
          choices: [
            { label: "Lưu đơn xong thì phát sự kiện, hai việc nối tiếp nhau", next: "twostep" },
            { label: "Ghi đơn và dòng hộp thư đi trong cùng một giao dịch", next: "outbox" },
          ],
        },
        twostep: {
          text: "Một lần máy chủ khởi động lại giữa hai việc, đơn được lưu mà sự kiện không đi. Khách có đơn nhưng không nhận email, kho không biết có hàng cần soạn, và không dòng nhật ký nào báo lỗi.",
          ending: "bad",
        },
        outbox: {
          text: "Đơn và sự kiện cùng thành công hoặc cùng không. Luồng năm bước giờ có năm chỗ có thể bị lặp lại nên mỗi người tiêu thụ phải bất biến. Bạn còn thêm trạng thái nhìn thấy được cho từng đơn để hỗ trợ trả lời được khách đang hỏi, và đối chiếu hằng đêm giữa đơn và email đã gửi để bắt những gì chuỗi sự kiện bỏ sót.",
          ending: "good",
        },
      },
    },
  ],

  "mo-hinh-hop-le-vien-dem": [
    {
      type: "scenario",
      title: "Hai cột 50% mà lại xuống dòng",
      start: "start",
      nodes: {
        start: {
          text: "Bạn làm hai cột, mỗi cột rộng 50% và có đệm 20 pixel với viền 1 pixel. Mở trang, cột thứ hai bị đẩy xuống dòng dưới dù tổng chỉ là 100%. Bạn làm gì?",
          choices: [
            { label: "Giảm chiều rộng mỗi cột xuống 45% cho vừa mắt", next: "shrink" },
            { label: "Đặt cách tính kích thước bao gồm đệm và viền cho mọi phần tử", next: "boxsizing" },
            { label: "Đặt chiều cao cố định cho cột để chúng thẳng hàng", next: "height" },
          ],
        },
        shrink: {
          text: "Trang trông vừa vặn ở màn hình của bạn. Nhưng bạn chưa hiểu vì sao, và con số 45% chỉ đúng với đệm và viền hiện tại. Đổi đệm sang 30 pixel là cột lại xuống dòng, và bạn lại chỉnh bằng tay.",
          ending: "bad",
        },
        height: {
          text: "Chiều cao không liên quan tới chuyện xuống dòng, nên cột vẫn xuống dòng. Hơn nữa một cột chứa chữ dài hơn chiều cao cố định sẽ làm chữ tràn ra ngoài hộp, đè lên phần tử bên dưới.",
          ending: "bad",
        },
        boxsizing: {
          text: "Giờ 50% nghĩa là chiếm đúng 50%, đệm và viền ăn vào bên trong, nên hai cột vừa khít một hàng. Tiếp theo, bạn muốn tách hai khối có màu nền ra xa nhau 24 pixel. Bạn chọn gì?",
          choices: [
            { label: "Tăng đệm của hai khối", next: "padding" },
            { label: "Đặt lề giữa hai khối", next: "margin" },
          ],
        },
        padding: {
          text: "Màu nền phủ tới hết phần đệm, nên khối chỉ to ra và khoảng trắng giữa chúng không đổi. Đệm nới chỗ bên trong một hộp, còn tách hai hộp thì phải dùng lề.",
          ending: "bad",
        },
        margin: {
          text: "Lề nằm ngoài viền và trong suốt, nên hai khối cách nhau đúng khoảng bạn muốn mà nền không bị kéo dãn. Nhớ rằng theo chiều dọc lề chồng nhau: lề dưới 30 và lề trên 20 cho khoảng cách 30 chứ không phải 50.",
          ending: "good",
        },
      },
    },
  ],

  "mau-phong-chu-va-he-thong": [
    {
      type: "scenario",
      title: "Trang trông nghiệp dư dù từng màu đều đẹp",
      start: "start",
      nodes: {
        start: {
          text: "Một bạn gửi cho bạn trang của mình và hỏi vì sao nó trông lộn xộn dù màu nào cũng đẹp. Bạn đo thử: mười hai cỡ chữ khác nhau, khoảng cách mỗi chỗ một con số, năm sắc xám gần giống nhau. Lời khuyên của bạn là gì?",
          choices: [
            { label: "Chọn một bảng màu cao cấp hơn, vì đây là chuyện gu thẩm mỹ", next: "taste" },
            { label: "Giảm số lựa chọn: vài cỡ chữ, khoảng cách theo bội số, ít màu", next: "constraints" },
            { label: "Thêm một phông chữ nữa để các tiêu đề nổi bật hơn", next: "fonts" },
          ],
        },
        taste: {
          text: "Bảng màu mới thay vào, trang vẫn lộn xộn. Từng lựa chọn không sai, chỉ là mắt không tìm được quy luật nào. Vấn đề là thiếu nhất quán chứ không phải màu xấu, nên đổi màu không đụng tới nguyên nhân.",
          ending: "bad",
        },
        fonts: {
          text: "Phông thứ hai là thêm tệp phải tải, nên chữ nhảy lúc phông thay thế phông dự phòng, và trang trông kém thống nhất hơn. Một phông với vài độ đậm gần như luôn đủ.",
          ending: "bad",
        },
        constraints: {
          text: "Bạn định năm cỡ chữ và chọn một con số gốc cho khoảng cách. Trang bắt đầu có nhịp điệu. Giờ cần chốt màu chữ phụ. Bạn thấy một màu xám nhạt trông rất tinh tế trên màn hình của mình. Bạn làm gì?",
          choices: [
            { label: "Giữ nó vì trông đẹp, quyết định này thuộc về thẩm mỹ", next: "keepgrey" },
            { label: "Kiểm tra độ tương phản bằng công cụ trước khi giữ", next: "contrast" },
          ],
        },
        keepgrey: {
          text: "Chữ xám nhạt trên nền trắng trông tinh tế trong phòng tối trên màn hình tốt, và không đọc nổi trên điện thoại giữa trời nắng. Không ai báo lỗi, họ chỉ đóng trang. Độ tương phản là thứ hiếm hoi đo được bằng con số.",
          ending: "bad",
        },
        contrast: {
          text: "Công cụ cho thấy màu xám đó dưới ngưỡng của chuẩn truy cập nên bạn làm đậm nó lên. Bạn đặt các giá trị này vào biến CSS ở một chỗ, nhờ đó sửa một nơi là cả trang đổi theo, và làm chế độ tối sau này cũng dễ.",
          ending: "good",
        },
      },
    },
  ],

  "don-vi-do-trong-css": [
    {
      type: "scenario",
      title: "Danh sách lồng nhau có chữ bé dần",
      start: "start",
      nodes: {
        start: {
          text: "Bạn đặt cỡ chữ toàn trang bằng pixel cho chắc. Một người dùng lớn tuổi nhờ con báo rằng chữ nhỏ quá dù đã tăng cỡ chữ trong trình duyệt. Bạn xử lý thế nào?",
          choices: [
            { label: "Đổi cỡ chữ sang đơn vị tính theo cỡ chữ gốc của trình duyệt", next: "root" },
            { label: "Tăng tất cả cỡ pixel thêm hai đơn vị cho dễ đọc", next: "bigger" },
            { label: "Khoá phóng to trang để mọi người thấy cùng một bố cục", next: "lock" },
          ],
        },
        bigger: {
          text: "Chữ to hơn cho mọi người, nhưng cài đặt trong trình duyệt vẫn bị bỏ qua. Người cần chữ rất lớn vẫn không điều chỉnh được, và bạn lại phải đoán con số đủ lớn cho mọi người.",
          ending: "bad",
        },
        lock: {
          text: "Người thị lực kém mất đúng công cụ họ dùng để đọc trang. Không ai gửi báo cáo, họ chỉ thấy khó đọc rồi đóng lại, và bạn không bao giờ biết đã mất bao nhiêu người.",
          ending: "bad",
        },
        root: {
          text: "Chữ giờ lớn theo cài đặt của người dùng. Tiếp đến bạn viết danh sách lồng ba tầng và muốn mỗi tầng nhỏ hơn một chút. Bạn đặt cỡ chữ mỗi tầng thế nào?",
          choices: [
            { label: "Mỗi tầng 0,9 lần cỡ chữ của phần tử cha", next: "parent" },
            { label: "Mỗi tầng một giá trị tính từ cỡ chữ gốc", next: "fromroot" },
          ],
        },
        parent: {
          text: "Các hệ số nhân dồn lại: tầng trong cùng chỉ còn khoảng 73 phần trăm cỡ gốc. Chữ ở đó nhỏ tới mức khó đọc và bạn không hiểu vì sao, vì đơn vị theo cha cộng dồn khi lồng.",
          ending: "bad",
        },
        fromroot: {
          text: "Mỗi tầng tính từ một mốc duy nhất nên bạn biết chính xác cỡ chữ ở mọi tầng. Bạn vẫn giữ pixel cho viền và bán kính bo góc, thứ không nên co giãn theo chữ, và đặt chiều rộng tối đa cho đoạn văn dài để dòng không vượt quá khoảng bảy mươi lăm ký tự.",
          ending: "good",
        },
      },
    },
  ],

  "ba-loi-bo-cuc-hay-gap": [
    {
      type: "scenario",
      title: "Ba lỗi bố cục trong một buổi chiều",
      start: "start",
      nodes: {
        start: {
          text: "Bạn mở trang trên điện thoại và thấy nó cuộn ngang được dù không cố làm gì rộng. Bạn nhớ có một cách nhanh là ẩn tràn ngang cho toàn trang. Bạn làm gì?",
          choices: [
            { label: "Ẩn tràn ngang cho toàn trang, thanh cuộn mất là xong", next: "hide" },
            { label: "Tìm phần tử rộng hơn khung nhìn rồi sửa chính nó", next: "find" },
          ],
        },
        hide: {
          text: "Thanh cuộn biến mất, nhưng phần nội dung bị đẩy ra ngoài vẫn không ai xem được, nút nằm trong đó không bấm tới. Bạn cũng mất cơ hội phát hiện lỗi lần sau vì nó đã bị giấu đi.",
          ending: "bad",
        },
        find: {
          text: "Thủ phạm là một bức ảnh có chiều rộng cố định lớn hơn màn hình. Bạn đặt chiều rộng tối đa 100% cho mọi ảnh ngay đầu tệp CSS. Kế đến, một vùng chứa các thẻ dùng thuộc tính nổi bị sập chiều cao về không dù bên trong đầy nội dung. Bạn sửa thế nào?",
          choices: [
            { label: "Thêm một phần tử rỗng dọn dẹp dưới các thẻ nổi", next: "clearfix" },
            { label: "Bỏ thuộc tính nổi, dùng flexbox cho vùng chứa", next: "flex" },
          ],
        },
        clearfix: {
          text: "Nó chạy được, nhưng bạn đang dùng một mẹo cũ để vá hậu quả của việc dùng sai công cụ. Mỗi vùng chứa mới lại cần thêm mẹo này, và người đọc mã sau không hiểu phần tử rỗng kia để làm gì.",
          ending: "bad",
        },
        flex: {
          text: "Flexbox tính chiều cao theo phần tử con một cách bình thường nên vấn đề biến mất. Cuối cùng, hộp thoại bị che bởi thanh điều hướng dù bạn đặt thứ tự chồng lớp 9999. Hộp thoại nằm trong một ngữ cảnh chồng lớp bị nhốt. Bạn làm gì?",
          choices: [
            { label: "Tăng thứ tự chồng lớp lên thêm vài bậc", next: "zindex" },
            { label: "Đưa hộp thoại ra làm con trực tiếp của thẻ thân trang", next: "portal" },
          ],
        },
        zindex: {
          text: "Giá trị lớn tới đâu cũng không vượt ra khỏi ngữ cảnh đang nhốt phần tử, nên hộp thoại vẫn bị che. Bạn chỉ làm các giá trị z-index trong dự án thêm lộn xộn.",
          ending: "bad",
        },
        portal: {
          text: "Hộp thoại thoát khỏi ngữ cảnh đang nhốt nó nên giờ thứ tự chồng lớp mới có tác dụng. Một nguyên nhân cụ thể, một cách sửa ngắn, và bạn không phải thử ngẫu nhiên.",
          ending: "good",
        },
      },
    },
  ],

  "javascript-chay-o-dau": [
    {
      type: "scenario",
      title: "Mã chạy ở máy chủ mà không chạy ở trình duyệt",
      start: "start",
      nodes: {
        start: {
          text: "Đồng nghiệp chép một đoạn mã đọc tệp cấu hình bằng hàm của môi trường máy chủ vào trang web. Mở trang lên, console báo hàm đó không tồn tại. Bạn hỏi đầu tiên điều gì?",
          choices: [
            { label: "Cú pháp có sai chỗ nào không, thử gõ lại từng dòng", next: "syntax" },
            { label: "Đoạn này đang chạy ở đâu và môi trường đó có hàm này không", next: "where" },
          ],
        },
        syntax: {
          text: "Cú pháp hoàn toàn đúng, và bạn mất nửa giờ gõ lại những dòng không sai. JavaScript là ngôn ngữ, còn việc làm được gì thì do môi trường quyết định, nên lỗi này nằm ở chỗ chạy chứ không ở chữ viết.",
          ending: "bad",
        },
        where: {
          text: "Hàm đọc tệp chỉ có ở máy chủ, vì mã trang web chạy trong hộp cách ly và không đọc được ổ đĩa. Bạn chuyển việc đọc cấu hình sang một API ở máy chủ. Tiếp theo, một đoạn mã trên trang cần xử lý hai nghìn dòng dữ liệu. Bạn viết thế nào?",
          choices: [
            { label: "Một vòng lặp lớn xử lý hết trong một lần chạy", next: "bigloop" },
            { label: "Chia dữ liệu thành từng đợt nhỏ, nhường luồng giữa các đợt", next: "chunks" },
          ],
        },
        bigloop: {
          text: "JavaScript trong trình duyệt chạy đơn luồng, và luồng đó cũng lo việc vẽ lại giao diện. Vòng lặp chạy ba giây làm trang đơ hoàn toàn trong ba giây: không cuộn được, không bấm được. Khách tưởng trang bị treo và rời đi.",
          ending: "bad",
        },
        chunks: {
          text: "Giữa các đợt, trình duyệt có lúc vẽ lại và nhận thao tác của người dùng nên trang không đơ. Về cuối, bạn thử gọi dữ liệu từ một tên miền khác và bị chặn. Đó là chính sách cùng nguồn gốc đang bảo vệ người dùng, và cách xử lý đúng là cho phép từ phía máy chủ đó chứ không phải tìm cách lách nó.",
          ending: "good",
        },
      },
    },
  ],

  "bien-kieu-va-ep-kieu-ngam-dinh": [
    {
      type: "scenario",
      title: "Số lượng 0 bị đổi thành 10",
      start: "start",
      nodes: {
        start: {
          text: "Một ô nhập số lượng cho phép nhập 0 để bỏ món khỏi giỏ. Mã của đồng nghiệp viết const soLuong = nhap || 10 để có mặc định, và khách nhập 0 lại thấy giỏ có 10 món. Bạn sửa thế nào?",
          choices: [
            { label: "Thêm một nhánh if riêng chỉ để bắt trường hợp 0", next: "special" },
            { label: "Đổi sang toán tử hợp nhất rỗng, chỉ thay khi rỗng hoặc chưa định nghĩa", next: "nullish" },
            { label: "Đổi hai dấu bằng thành ba dấu bằng ở chỗ so sánh", next: "triple" },
          ],
        },
        special: {
          text: "Bạn vá đúng số 0, nhưng chuỗi rỗng và các giá trị bị coi là sai khác vẫn rơi vào cùng cái bẫy ở chỗ khác trong dự án. Gốc rễ là toán tử hoặc coi 0 là sai, và bạn chỉ che một triệu chứng.",
          ending: "bad",
        },
        triple: {
          text: "Dòng này không có phép so sánh nào để đổi. Toán tử hoặc dựa trên việc giá trị có bị coi là sai hay không, nên đổi dấu bằng ở nơi khác không ảnh hưởng gì, và khách nhập 0 vẫn thấy 10.",
          ending: "bad",
        },
        nullish: {
          text: "Số 0 được giữ nguyên, mặc định chỉ dùng khi ô thật sự trống. Sau đó bạn review một đoạn khác có điều kiện if (tuoi == 0) và dữ liệu đôi khi là chuỗi rỗng. Bạn đề xuất gì?",
          choices: [
            { label: "Giữ hai dấu bằng, vì nó cũng bắt được chuỗi rỗng", next: "loose" },
            { label: "Dùng ba dấu bằng, và xử lý chuỗi rỗng bằng điều kiện riêng", next: "strict" },
          ],
        },
        loose: {
          text: "Hai dấu bằng ép kiểu nên 0 bằng chuỗi rỗng và cả hai cùng qua điều kiện. Lỗi này không báo gì, một người dùng chưa nhập tuổi bị xử lý như trẻ sơ sinh, và bảng quy tắc ép kiểu dài tới mức không ai đoán nổi.",
          ending: "bad",
        },
        strict: {
          text: "Ba dấu bằng so sánh cả kiểu lẫn giá trị, nên mỗi trường hợp được xử lý có chủ ý. Gần như mọi nhóm đều bật quy tắc cấm hai dấu bằng trong công cụ kiểm tra mã, và đây là lý do.",
          ending: "good",
        },
      },
    },
  ],

  "ham-trong-javascript": [
    {
      type: "scenario",
      title: "Hàm gọi lại chạy ngay, hay không bao giờ chạy",
      start: "start",
      nodes: {
        start: {
          text: "Bạn gắn xử lý cho nút bấm bằng nut.addEventListener(\"click\", hienThongBao()). Vừa mở trang, thông báo hiện ra ngay và bấm nút chẳng thấy gì. Nguyên nhân là gì?",
          choices: [
            { label: "Sự kiện click bị trình duyệt chặn nên không bao giờ chạy", next: "blocked" },
            { label: "Cặp ngoặc đã gọi hàm ngay, trong khi cần trao chính hàm đi", next: "call" },
          ],
        },
        blocked: {
          text: "Bạn tìm cách mở khoá một sự kiện chưa hề bị chặn, trong khi thông báo đã hiện lúc tải trang là bằng chứng hàm đã chạy sớm. Dấu hiệu rõ nhất bị bỏ qua là hàm chạy ở sai thời điểm.",
          ending: "bad",
        },
        call: {
          text: "Có dấu ngoặc thì hàm được gọi ngay và kết quả của nó mới được trao đi, còn hàm gọi lại là hàm bạn đưa cho bên khác gọi khi tới lúc. Bạn sửa lại và nó chạy đúng. Rồi bạn cần một xử lý nhận thêm tham số tên người dùng. Bạn viết thế nào?",
          choices: [
            { label: "Gọi hienThongBao(ten) ngay trong chỗ truyền", next: "again" },
            { label: "Trả về một hàm mới từ hàm nhận ten", next: "closure" },
          ],
        },
        again: {
          text: "Lỗi cũ quay lại: hàm được gọi ngay lúc đăng ký và thông báo hiện khi tải trang. Việc truyền tham số không đổi quy tắc rằng có ngoặc là gọi ngay.",
          ending: "bad",
        },
        closure: {
          text: "Hàm trả về nhớ được biến ten ở nơi nó sinh ra, nên mỗi nút có xử lý riêng với tên riêng. Đó chính là closure. Bên trong hàm này, bạn dùng hàm mũi tên thay hàm thông thường để ngữ cảnh lấy từ nơi viết ra, tránh bất ngờ về ngữ cảnh lúc gọi.",
          ending: "good",
        },
      },
    },
  ],
};
