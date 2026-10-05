import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r08. Một người viết cho một tệp.
export const R08_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "mang-va-cac-phuong-thuc-duyet": [
    {
      type: "scenario",
      title: "Danh sách giá bỗng đổi thứ tự",
      start: "bug",
      nodes: {
        bug: {
          text: "Trang giỏ hàng hiển thị đơn sắp theo giá, nhưng ở một góc khác của trang, mục \"đơn mới nhất\" bỗng hiện sai đơn. Bạn mở mã thì thấy hàm hiển thị gọi orders.sort((a, b) => a.price - b.price) trên mảng dùng chung. Bạn xử lý thế nào?",
          choices: [
            { label: "Sắp xếp một bản sao: [...orders].sort(...)", next: "copy" },
            { label: "Giữ nguyên sort, thêm một dòng đảo mảng lại sau đó", next: "reverse" },
            { label: "Bỏ sắp xếp, nhờ phía máy chủ trả sẵn theo giá", next: "server" },
          ],
        },
        copy: {
          text: "Mục \"đơn mới nhất\" đúng trở lại vì mảng gốc không bị đụng tới. Tuần sau đồng đội thêm một bước lọc rồi ánh xạ vào chuỗi, và bạn cần quyết định cách nối chúng.",
          choices: [
            { label: "Nối filter rồi map rồi sort trên bản sao đã lọc", next: "chain" },
            { label: "Dùng forEach và đẩy kết quả vào mảng ngoài", next: "foreach" },
          ],
        },
        reverse: {
          text: "Đảo lại không khôi phục được thứ tự ban đầu, vì thứ tự theo thời gian đã mất ngay lúc sort chạy. Mục \"đơn mới nhất\" vẫn hiện sai, chỉ sai theo kiểu khác, và bạn mất thêm một buổi dò lỗi.",
          ending: "bad",
        },
        server: {
          text: "Máy chủ trả sẵn theo giá thì mục kia lại cần thứ tự thời gian, nên phải gọi mạng hai lần cho cùng một dữ liệu. Trang chậm hơn mà lỗi gốc, sort vào mảng dùng chung, vẫn còn trong mã chỗ khác.",
          ending: "bad",
        },
        chain: {
          text: "Chuỗi đọc gần như một câu: lấy đơn thoả điều kiện, lấy giá, sắp lại. Mảng gốc vẫn nguyên, mã dễ đọc, và với vài trăm đơn thì ba lượt duyệt không đáng kể.",
          ending: "good",
        },
        foreach: {
          text: "Mã chạy đúng nhưng phải theo dõi một mảng ngoài được sửa từ bên trong hàm gọi lại. Một lần review sau, có người thêm return sớm vào giữa và kết quả mất lặng lẽ vài phần tử mà không ai báo lỗi.",
          ending: "bad",
        },
      },
    },
  ],
  "doi-tuong-va-json": [
    {
      type: "scenario",
      title: "Phản hồi từ máy chủ thiếu một tầng",
      start: "crash",
      nodes: {
        crash: {
          text: "Trang hồ sơ báo lỗi \"Cannot read properties of undefined\" với một số khách. Mã đọc user.address.city, mà khách mới chưa nhập địa chỉ nên address không tồn tại. Bạn sửa ra sao?",
          choices: [
            { label: "Đọc bằng user.address?.city và đặt giá trị mặc định", next: "optional" },
            { label: "Bọc cả hàm trong try/catch và bỏ qua lỗi", next: "trycatch" },
            { label: "Gán địa chỉ rỗng cho mọi khách ngay lúc đăng ký", next: "fill" },
          ],
        },
        optional: {
          text: "Trang hiển thị \"Chưa có thành phố\" thay vì đổ vỡ. Sau đó bạn cần lưu bản sao cài đặt của khách để so sánh trước và sau khi chỉnh sửa. Cài đặt có một đối tượng lồng bên trong.",
          choices: [
            { label: "Sao chép bằng {...settings} rồi sửa tầng trong", next: "shallow" },
            { label: "Sao chép sâu bằng structuredClone(settings)", next: "deep" },
          ],
        },
        trycatch: {
          text: "Lỗi biến mất khỏi bảng điều khiển nhưng trang hồ sơ cũng trắng trơn: cả khối bị nuốt, kể cả tên và ảnh đại diện vốn có đủ. Khách vẫn phải báo lại, chỉ là giờ bạn không còn dấu vết nào để dò.",
          ending: "bad",
        },
        fill: {
          text: "Khách cũ đã nằm sẵn trong cơ sở dữ liệu không có địa chỉ nên lỗi vẫn xảy ra với họ. Một dịch vụ khác lại coi chuỗi rỗng là \"đã nhập\" và gửi hàng tới một địa chỉ trống.",
          ending: "bad",
        },
        shallow: {
          text: "Bạn sửa settings2.theme.color, và bản gốc cũng đổi theo vì tầng theme vẫn là cùng một đối tượng. So sánh trước và sau luôn cho kết quả \"không có gì thay đổi\", và nút hoàn tác không bao giờ bật.",
          ending: "bad",
        },
        deep: {
          text: "Bản sao độc lập hoàn toàn, nên sửa tầng trong không chạm bản gốc. So sánh và nút hoàn tác chạy đúng. Bạn nhớ ghi chú rằng hàm và một số kiểu đặc biệt không sao chép sâu được.",
          ending: "good",
        },
      },
    },
  ],
  "pham-vi-closure-va-ngu-canh": [
    {
      type: "scenario",
      title: "Ba nút, cùng một số thứ tự",
      start: "report",
      nodes: {
        report: {
          text: "Đồng đội báo: trang có ba nút, nhưng bấm nút nào cũng hiện \"Nút số 3\". Mã dùng for (var i = 1; i <= 3; i++) và gắn hàm bấm bên trong vòng lặp. Bạn nghĩ nguyên nhân là gì?",
          choices: [
            { label: "var có phạm vi theo hàm, cả ba hàm chia sẻ một i", next: "diagnosed" },
            { label: "Sự kiện bấm bị gắn trùng ba lần lên cùng một nút", next: "wrongdup" },
            { label: "Trình duyệt chạy vòng lặp chậm nên i chưa kịp đổi", next: "wrongslow" },
          ],
        },
        diagnosed: {
          text: "Đúng hướng: vòng lặp chạy xong trước khi ai bấm, nên i đã bằng 4 và cả ba closure cùng nhìn vào biến đó. Giờ chọn cách sửa.",
          choices: [
            { label: "Đổi sang let để mỗi vòng có một i riêng", next: "good" },
            { label: "Giữ var và gán biến toàn cục count trong mỗi hàm", next: "global" },
          ],
        },
        wrongdup: {
          text: "Bạn thêm dòng gỡ gắn sự kiện cũ trước mỗi lần gắn. Ba nút vẫn đều hiện số 3, vì sự kiện chưa bao giờ bị gắn trùng. Một buổi chiều trôi qua mà lỗi chẳng nhúc nhích.",
          ending: "bad",
        },
        wrongslow: {
          text: "Bạn bọc vòng lặp vào setTimeout cho \"đợi i kịp đổi\". Con số hiện ra lúc nhảy lúc không tuỳ máy, vì lỗi nằm ở chỗ ba hàm dùng chung một biến chứ không ở thời gian.",
          ending: "bad",
        },
        good: {
          text: "Mỗi vòng lặp tạo một phạm vi khối riêng, và mỗi closure giữ đúng i của vòng đó. Ba nút hiện 1, 2, 3 đúng thứ tự, và bạn thêm một dòng giải thích vào phần review để lần sau không ai quay lại dùng var.",
          ending: "good",
        },
        global: {
          text: "Biến count toàn cục bị mọi nút ghi đè, nên kết quả lại là một số chung. Thêm vào đó một đoạn mã khác trên trang cũng dùng count, và hai phần của trang bắt đầu làm hỏng số liệu của nhau.",
          ending: "bad",
        },
      },
    },
  ],
  "nhung-cai-bay-cua-javascript": [
    {
      type: "scenario",
      title: "Bảng xếp hạng đúng ở máy bạn",
      start: "ticket",
      nodes: {
        ticket: {
          text: "Khách phàn nàn bảng xếp hạng đặt hạng 100 điểm dưới hạng 9 điểm. Mã đang dùng scores.sort(). Trên máy bạn, với dữ liệu thử gồm toàn số từ 1 đến 9, mọi thứ vẫn đúng. Bước đầu bạn làm gì?",
          choices: [
            { label: "Thử lại với dữ liệu có cả 9, 10 và 100", next: "repro" },
            { label: "Báo khách xoá bộ nhớ đệm của trình duyệt", next: "cache" },
            { label: "Đổi sang scores.reverse() để thử vận may", next: "reverse" },
          ],
        },
        repro: {
          text: "Mảng [10, 9, 1, 100] ra [1, 10, 100, 9]: sort mặc định so sánh như chuỗi. Giờ chọn cách sửa.",
          choices: [
            { label: "Truyền hàm so sánh: scores.sort((a, b) => b - a)", next: "comparator" },
            { label: "Đổi từng điểm thành chuỗi có độn số 0 ở đầu", next: "pad" },
          ],
        },
        cache: {
          text: "Khách xoá bộ nhớ đệm và bảng vẫn sai, vì lỗi nằm trong cách so sánh chứ không trong tệp cũ. Bạn mất thêm một ngày và để khách chờ, trong khi chưa hề tái hiện được lỗi.",
          ending: "bad",
        },
        reverse: {
          text: "Với dữ liệu thử thì kết quả đảo trông \"gần đúng\", nên bạn gửi bản vá. Ngay khi điểm vượt mốc hàng chục, thứ tự lại sai theo kiểu mới, và bây giờ lỗi còn khó nhận ra hơn.",
          ending: "bad",
        },
        comparator: {
          text: "Hàm so sánh trừ hai số cho thứ tự đúng ở mọi kích cỡ. Bạn thêm một ca thử có số 100 và bật quy tắc kiểm tra mã tĩnh để mọi sort trần từ nay đều bị cảnh báo.",
          ending: "good",
        },
        pad: {
          text: "Cách này chạy được cho tới khi có điểm 1000 và chuỗi độn dài hơn dự tính. Mã giờ có thêm bước chuyển đổi đi và về, và hai bước đó lại sinh lỗi làm tròn ở nơi không ai ngờ.",
          ending: "bad",
        },
      },
    },
  ],
  "loi-va-ngoai-le-trong-javascript": [
    {
      type: "scenario",
      title: "Một dòng hỏng làm cả lô đứng im",
      start: "import",
      nodes: {
        import: {
          text: "Chức năng nhập danh sách khách từ tệp CSV bị dừng giữa chừng: dòng thứ 41 có định dạng sai, hàm ném lỗi và 40 dòng đã xử lý không được lưu. Khách không thấy thông báo nào. Bạn sửa gì trước?",
          choices: [
            { label: "Bắt lỗi từng dòng, ghi lại dòng hỏng, xử lý tiếp", next: "perrow" },
            { label: "Bọc cả vòng lặp trong một try/catch lớn", next: "wholeloop" },
            { label: "Đổi hàm ném lỗi thành trả về giá trị rỗng im lặng", next: "silent" },
          ],
        },
        perrow: {
          text: "Các dòng tốt được lưu, dòng hỏng vào danh sách lỗi. Giờ cần quyết định điều gì xảy ra với danh sách đó.",
          choices: [
            { label: "Hiện cho khách xem số dòng và lý do từng dòng hỏng", next: "show" },
            { label: "Chỉ ghi vào bảng điều khiển của trình duyệt", next: "console" },
          ],
        },
        wholeloop: {
          text: "Lỗi được bắt nhưng vòng lặp vẫn dừng ở dòng 41, vì catch nằm ngoài vòng lặp. Bạn thấy thông báo thân thiện, trong khi từ dòng 42 trở đi vẫn không được nhập và chẳng ai biết.",
          ending: "bad",
        },
        silent: {
          text: "Dòng hỏng biến mất lặng lẽ. Vài tuần sau bộ phận chăm sóc khách phát hiện hơn một trăm khách bị thiếu trong hệ thống, và không còn dấu vết nào cho biết họ mất ở dòng nào của tệp nào.",
          ending: "bad",
        },
        show: {
          text: "Khách thấy \"đã nhập 40 dòng, 1 dòng lỗi: dòng 41 thiếu địa chỉ email\" và tự sửa tệp. Bạn cũng gắn dịch vụ thu thập lỗi để biết những lỗi xảy ra trên máy người dùng mà bạn không bao giờ thấy.",
          ending: "good",
        },
        console: {
          text: "Lỗi nằm trong bảng điều khiển trên máy khách, nơi chỉ lập trình viên mới mở. Khách tưởng nhập xong hết, đội phát triển không nhận được báo cáo nào, và vấn đề lặp lại vào tuần sau.",
          ending: "bad",
        },
      },
    },
  ],
  "vi-sao-trinh-duyet-khong-dung-cho": [
    {
      type: "scenario",
      title: "Trang đơ khi tính báo cáo",
      start: "freeze",
      nodes: {
        freeze: {
          text: "Nút \"Tạo báo cáo\" chạy một vòng lặp tính toán mất ba giây. Trong lúc đó trang đơ, nút khác không bấm được, hoạt ảnh đứng hình. Đồng đội đề nghị sửa nhanh. Bạn chọn gì?",
          choices: [
            { label: "Bọc vòng lặp vào hàm async và gọi bằng await", next: "async" },
            { label: "Chia việc thành nhiều lô nhỏ, nhường luồng giữa các lô", next: "chunk" },
            { label: "Thêm hiệu ứng quay tròn để khách biết đang chờ", next: "spinner" },
          ],
        },
        async: {
          text: "Trang vẫn đơ đúng ba giây. Hàm async vẫn chạy trên cùng luồng chính, nên vòng lặp nặng chiếm luồng y như trước. Đồng đội nghĩ \"đã bất đồng bộ rồi\" và chuyển sang việc khác, còn khách vẫn kêu.",
          ending: "bad",
        },
        spinner: {
          text: "Hiệu ứng quay tròn cũng đứng hình theo, vì luồng vẽ bị vòng lặp chiếm mất. Khách thấy một hình tĩnh trông như trang bị treo và đóng thẻ trình duyệt trước khi báo cáo xong.",
          ending: "bad",
        },
        chunk: {
          text: "Mỗi lô chạy vài chục mili-giây rồi nhường luồng bằng setTimeout, nên trình duyệt kịp vẽ lại và nhận thao tác bấm. Bạn cần quyết định thứ tự của phần kết quả hiển thị.",
          choices: [
            { label: "Cập nhật thanh tiến độ sau mỗi lô", next: "progress" },
            { label: "Chỉ hiện kết quả một lần khi mọi lô xong", next: "once" },
          ],
        },
        progress: {
          text: "Thanh chạy đều, nút Huỷ bấm được giữa chừng, và trang không bao giờ đơ. Với bài toán nặng hơn nữa, bạn ghi chú rằng việc có thể chuyển hẳn sang Web Worker.",
          ending: "good",
        },
        once: {
          text: "Trang không đơ, nhưng khách nhìn một ô trống mười giây và không biết có chạy hay không. Nhiều người bấm nút lần nữa, và giờ có hai tiến trình tính cùng lúc ghi đè lên kết quả của nhau.",
          ending: "bad",
        },
      },
    },
  ],
  "promise-va-cu-phap-cho": [
    {
      type: "scenario",
      title: "Lấy hồ sơ rồi lấy đơn hàng",
      start: "code",
      nodes: {
        code: {
          text: "Bạn viết hàm tải hồ sơ khách rồi tải đơn hàng của khách đó. Mã mới chạy lên báo \"Promise { <pending> }\" thay vì dữ liệu, và có lúc lỗi mạng làm trang trắng. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Thêm await trước lời gọi hàm tải", next: "await" },
            { label: "Lồng hàm gọi lại bên trong hàm gọi lại", next: "callback" },
            { label: "Đọc luôn kết quả ngay dòng sau, chờ vài giây", next: "sleep" },
          ],
        },
        await: {
          text: "Dữ liệu ra đúng và mã đọc từ trên xuống dưới. Giờ xử lý lỗi mạng: bạn nhớ rằng hàm async luôn trả promise và lỗi bên trong nó cần một chỗ bắt.",
          choices: [
            { label: "Bọc các lời gọi await trong try/catch", next: "trycatch" },
            { label: "Để lỗi tự nổi lên, hy vọng trình duyệt báo hộ", next: "nocatch" },
          ],
        },
        callback: {
          text: "Với hai việc thì còn đọc được, nhưng sếp yêu cầu thêm bước tải khuyến mãi và địa chỉ giao hàng. Mã trôi dần sang phải thành năm tầng lồng nhau, và lỗi ở tầng nào cũng phải bắt riêng, nên hai chỗ bị quên.",
          ending: "bad",
        },
        sleep: {
          text: "Mạng chậm hơn dự tính thì dòng đọc chạy trước khi dữ liệu về và vẫn ra rỗng. Trên máy nhanh mọi thứ trông ổn, còn trên điện thoại của khách thì trang lúc đúng lúc sai.",
          ending: "bad",
        },
        trycatch: {
          text: "Lỗi mạng giờ hiện thông báo \"Không tải được đơn hàng, thử lại\" thay vì làm trang trắng. Hai lời gọi độc lập bạn còn gom bằng Promise.all để chạy song song và tiết kiệm thời gian chờ.",
          ending: "good",
        },
        nocatch: {
          text: "Promise bị từ chối mà không ai bắt, nên chỉ có dòng cảnh báo trong bảng điều khiển. Khách nhìn một vòng quay mãi không dứt, vì mã hiển thị chỉ biết chờ chứ không bao giờ nhận được tín hiệu thất bại.",
          ending: "bad",
        },
      },
    },
  ],
  "hieu-nang-va-bao-mat-phia-trinh-duyet": [
    {
      type: "scenario",
      title: "Ô tìm kiếm làm đơ trang",
      start: "slow",
      nodes: {
        slow: {
          text: "Ô tìm kiếm gửi yêu cầu mạng ở mỗi phím bấm và hiện kết quả bằng cách gán innerHTML từ chuỗi người dùng nhập. Trang chậm dần khi gõ nhanh. Bạn xử lý điều gì đầu tiên?",
          choices: [
            { label: "Giới hạn tần suất: chờ khách ngừng gõ rồi mới gửi", next: "debounce" },
            { label: "Tải thư viện lớn hơn để gộp thao tác vẽ giúp", next: "lib" },
            { label: "Giữ nguyên, chỉ làm máy chủ trả lời nhanh hơn", next: "server" },
          ],
        },
        debounce: {
          text: "Mỗi lần gõ nhanh giờ chỉ sinh một yêu cầu. Bạn nhìn lại phần hiển thị: tên sản phẩm từ khách nhập vào được ghép thẳng vào chuỗi HTML.",
          choices: [
            { label: "Dùng textContent để hiện văn bản người dùng nhập", next: "safe" },
            { label: "Giữ innerHTML và xoá thẻ script bằng biểu thức chính quy", next: "regex" },
          ],
        },
        lib: {
          text: "Thư viện nặng thêm vài trăm kilobyte, lại là một phụ thuộc mới. Máy chủ vẫn nhận mỗi phím một yêu cầu, nên vấn đề gốc vẫn còn. Trang trên điện thoại cũ còn chậm hơn trước vì phải tải thêm.",
          ending: "bad",
        },
        server: {
          text: "Máy chủ nhanh hơn một chút nhưng mỗi phím vẫn kéo theo một lần tính lại bố cục trên trang. Khi lượng người dùng tăng, hàng loạt yêu cầu dồn về và chi phí máy chủ tăng theo mà trang vẫn giật.",
          ending: "bad",
        },
        safe: {
          text: "Một khách gõ thử <img src=x onerror=...> và chuỗi hiện nguyên văn như chữ thường, không chạy mã. Bạn thêm chính sách bảo mật nội dung làm lớp phòng thủ thứ hai, phòng khi lọt chỗ khác.",
          ending: "good",
        },
        regex: {
          text: "Bộ lọc chặn thẻ script nhưng bỏ sót thuộc tính onerror trên thẻ ảnh. Một kẻ tấn công gửi liên kết chứa chuỗi đó, và mã chạy trên trang của khách thật, lấy mã đăng nhập đang lưu của họ.",
          ending: "bad",
        },
      },
    },
  ],
  "to-chuc-ma-va-mo-dun": [
    {
      type: "scenario",
      title: "Tệp 800 dòng và một lỗi mà không ai dám sửa",
      start: "monolith",
      nodes: {
        monolith: {
          text: "Tệp main.js có 800 dòng trộn lấy dữ liệu, tính tổng tiền và vẽ lên trang. Một lỗi làm tròn tổng tiền cần sửa, nhưng mỗi lần thử bạn phải mở trình duyệt, đăng nhập, bấm qua ba màn hình. Bạn làm gì?",
          choices: [
            { label: "Tách hàm tính tiền thành mô-đun riêng, viết thử trực tiếp", next: "extract" },
            { label: "Sửa tại chỗ rồi bấm tay kiểm tra như mọi lần", next: "manual" },
            { label: "Chép cả tệp ra và viết lại toàn bộ từ đầu", next: "rewrite" },
          ],
        },
        extract: {
          text: "Hàm tính tiền nhận số vào và trả số ra, không đụng vào cây tài liệu, nên gọi thẳng được trong vài giây. Bạn tìm ra lỗi làm tròn ngay. Giờ chọn cách chia phần còn lại.",
          choices: [
            { label: "Chia theo việc: lấy dữ liệu, xử lý, hiển thị", next: "layers" },
            { label: "Chia theo số dòng: mỗi tệp một trăm dòng", next: "bylines" },
          ],
        },
        manual: {
          text: "Bạn sửa và bấm thử với đơn nhỏ thì đúng. Đơn lớn của khách thật vẫn sai ở số lẻ, vì bạn chưa bao giờ thử được nhiều trường hợp trong cùng một lần. Lỗi quay lại sau hai tuần.",
          ending: "bad",
        },
        rewrite: {
          text: "Viết lại mất ba tuần, trong lúc đó tính năng mới bị đóng băng. Bản mới mất vài hành vi nhỏ mà bản cũ có và không ai ghi lại, nên khách phát hiện chúng dần qua các phiếu hỗ trợ.",
          ending: "bad",
        },
        layers: {
          text: "Phần xử lý kiểm thử được mà không cần trình duyệt. Khi giao diện đổi, chỉ tầng hiển thị phải sửa, còn tầng tính tiền không bị chạm tới. Đội thêm ba ca thử cho đơn lớn và lỗi không quay lại.",
          ending: "good",
        },
        bylines: {
          text: "Mỗi tệp cắt ngang giữa một việc, nên sửa một tính năng phải mở bốn tệp cùng lúc. Hàm tính tiền vẫn dính với hiển thị, và số tệp nhiều lên nhưng gỡ lỗi chẳng dễ hơn.",
          ending: "bad",
        },
      },
    },
  ],
  "cong-cu-va-thoi-quen-lam-viec": [
    {
      type: "scenario",
      title: "Lỗi lọt qua ba lớp kiểm tra",
      start: "prod",
      nodes: {
        prod: {
          text: "Sau khi đẩy mã, trang thanh toán báo lỗi với một nhóm khách. Mã chạy tốt trên máy bạn. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Tái hiện lỗi với đúng dữ liệu của khách rồi đặt điểm dừng", next: "repro" },
            { label: "Thêm hàng loạt dòng in ra khắp nơi rồi đẩy lên lại", next: "prints" },
            { label: "Quay lại bản trước và hy vọng lỗi tự biến mất", next: "rollback" },
          ],
        },
        repro: {
          text: "Điểm dừng cho thấy một biến là chuỗi \"12\" thay vì số 12 và phép cộng thành ghép chuỗi. Lỗi đã qua kiểm thử vì dữ liệu thử luôn là số. Giờ bạn quyết định cách ngăn lần sau.",
          choices: [
            { label: "Thêm ca thử cho dữ liệu chuỗi và bật kiểm tra kiểu trong cổng CI", next: "gate" },
            { label: "Nhắc cả đội cẩn thận hơn khi review lần tới", next: "remind" },
          ],
        },
        prints: {
          text: "Dòng in lên trang thật làm lộ dữ liệu khách trong bảng điều khiển và vẫn không cho thấy kiểu dữ liệu. Bạn đẩy ba lần, mỗi lần chờ nửa giờ, và khách bị lỗi suốt buổi chiều.",
          ending: "bad",
        },
        rollback: {
          text: "Lỗi tạm hết nhưng bản cũ cũng có lỗi bảo mật đã được sửa ở bản mới. Bạn chưa hiểu nguyên nhân, nên lần đẩy mã tiếp theo gặp đúng lỗi ấy, và đội mất thêm một ngày.",
          ending: "bad",
        },
        gate: {
          text: "Từ nay một giá trị sai kiểu làm bộ kiểm đỏ ngay trên máy chủ CI trước khi tới khách, không phụ thuộc ai nhớ chạy. Lỗi cùng loại ở các trang khác cũng bị bắt trong cùng tuần.",
          ending: "good",
        },
        remind: {
          text: "Lời nhắc có tác dụng một tuần. Tháng sau một người khác mang vào đúng kiểu lỗi ấy vì không có gì chặn nó trong quy trình, và khách lại gặp sự cố tương tự.",
          ending: "bad",
        },
      },
    },
  ],
  "tong-on-chang-javascript": [
    {
      type: "scenario",
      title: "Bảng điều khiển bán hàng mới ra mắt",
      start: "launch",
      nodes: {
        launch: {
          text: "Bạn dựng xong bảng điều khiển hiện doanh số từ một API. Hôm ra mắt, ba lỗi cùng xuất hiện: có khách thấy trang trắng, danh sách lúc đúng lúc sai thứ tự, và tải trang chậm. Bạn xử lý theo thứ tự nào?",
          choices: [
            { label: "Trang trắng trước, vì nó chặn mọi thứ khác", next: "blank" },
            { label: "Tải chậm trước, vì nó ảnh hưởng nhiều người nhất", next: "slow" },
            { label: "Thứ tự danh sách trước, vì nhìn là thấy ngay", next: "sort" },
          ],
        },
        blank: {
          text: "Bạn thấy lỗi xảy ra khi API trả thiếu trường phí vận chuyển và mã đọc order.shipping.fee. Bạn sửa để không đổ vỡ khi thiếu dữ liệu.",
          choices: [
            { label: "Đọc bằng ?. và hiện \"chưa có\", kèm thu thập lỗi", next: "ok" },
            { label: "Bọc try/catch và hiện trang trống khi lỗi", next: "emptyfix" },
          ],
        },
        slow: {
          text: "Bạn nén ảnh và tách mã thành các mô-đun tải sau. Trang nhanh hơn, nhưng khách vẫn thấy trang trắng và thứ tự sai suốt buổi sáng. Sếp hỏi sao lỗi nặng nhất chưa được sửa, và bạn không có câu trả lời tốt.",
          ending: "bad",
        },
        sort: {
          text: "Bạn đổi sang sort có hàm so sánh. Thứ tự đúng, nhưng trong lúc đó khách mất dữ liệu vẫn nhìn trang trắng, và vì không có dịch vụ thu thập lỗi nên bạn không biết bao nhiêu người bị ảnh hưởng.",
          ending: "bad",
        },
        ok: {
          text: "Các đơn thiếu trường hiện \"chưa có\" thay vì làm hỏng cả trang, và đội nhận được báo cáo đơn nào thiếu dữ liệu để phản hồi bên API. Sau đó bạn mới sửa thứ tự rồi tối ưu tải trang.",
          ending: "good",
        },
        emptyfix: {
          text: "Trang không trắng nữa mà trống trơn, nên khách hiểu là mình chưa có doanh số. Một cửa hàng cắt ngân sách quảng cáo vì tin con số trống đó, trong khi dữ liệu thật vẫn nằm ở máy chủ.",
          ending: "bad",
        },
      },
    },
  ],
  "vi-sao-can-cau-truc-du-lieu": [
    {
      type: "scenario",
      title: "Tìm khách VIP trong trăm nghìn đơn",
      start: "slowlookup",
      nodes: {
        slowlookup: {
          text: "Hàm kiểm tra khách VIP duyệt cả danh sách VIP cho mỗi đơn hàng. Với 200 đơn thử thì tức thì, nhưng với 100.000 đơn thật thì mất nhiều phút. Chương trình vẫn cho kết quả đúng. Bạn làm gì?",
          choices: [
            { label: "Đổi danh sách VIP sang tập hợp để tra theo khoá", next: "set" },
            { label: "Thêm máy chủ mạnh hơn để chạy nhanh lên", next: "hardware" },
            { label: "Giữ mảng, nhưng sắp xếp và duyệt từ giữa", next: "midsort" },
          ],
        },
        set: {
          text: "Mỗi lần tra chỉ còn một bước thay vì duyệt cả danh sách, và thời gian không còn tăng theo số đơn. Giờ có thêm yêu cầu: giữ nguyên thứ tự khách đăng ký VIP để hiển thị.",
          choices: [
            { label: "Giữ cả mảng để hiển thị và tập hợp để tra cứu", next: "both" },
            { label: "Chỉ giữ tập hợp, bỏ thứ tự đăng ký", next: "noorder" },
          ],
        },
        hardware: {
          text: "Máy chủ mạnh gấp đôi chạy nhanh gấp đôi, trong khi dữ liệu mỗi quý tăng gấp ba. Hai quý sau bạn lại ở tình trạng cũ với hoá đơn máy chủ lớn hơn nhiều, còn chi phí gốc của phép tra vẫn không đổi.",
          ending: "bad",
        },
        midsort: {
          text: "Mảng đã sắp xếp cho phép tìm bằng chia đôi nhanh hơn nhiều, nhưng mỗi khi có khách VIP mới phải chèn vào đúng vị trí và dịch hàng nghìn phần tử. Việc đăng ký VIP giờ thành điểm nghẽn mới vào ngày khuyến mãi.",
          ending: "bad",
        },
        both: {
          text: "Tra cứu tức thì, hiển thị đúng thứ tự, và bạn ghi chú rõ rằng hai cấu trúc phải cập nhật cùng nhau để không lệch. Một ca thử kiểm tra việc thêm và xoá khớp ở cả hai.",
          ending: "good",
        },
        noorder: {
          text: "Tra cứu nhanh nhưng màn hình \"VIP mới nhất\" mất thứ tự. Đồng đội phải thêm một cột ngày rồi sắp xếp mỗi lần mở trang, và phần lớn thời gian vừa tiết kiệm được lại mất ở chỗ khác.",
          ending: "bad",
        },
      },
    },
  ],
  "mang-va-bo-nho-lien-khoi": [
    {
      type: "scenario",
      title: "Hàng đợi tin nhắn chậm dần",
      start: "queue",
      nodes: {
        queue: {
          text: "Hệ thống thông báo lưu hàng đợi trong một mảng, xử lý bằng queue.shift() lấy phần tử đầu rồi queue.push() thêm vào cuối. Khi hàng đợi lên tới vài trăm nghìn tin thì xử lý chậm hẳn dù mỗi tin rất nhẹ. Bạn nghi điều gì?",
          choices: [
            { label: "shift() phải dịch mọi phần tử còn lại lên một ô", next: "shift" },
            { label: "push() chậm vì mỗi lần phải cấp lại cả mảng", next: "pushslow" },
            { label: "Truy cập theo chỉ số trong mảng lớn thì chậm", next: "index" },
          ],
        },
        shift: {
          text: "Đúng: lấy ở đầu mảng đắt tỉ lệ với độ dài mảng vì các phần tử nằm liền khối. Bạn cân nhắc cách sửa.",
          choices: [
            { label: "Giữ một con trỏ đầu hàng, không dịch phần tử", next: "pointer" },
            { label: "Đổi sang chèn vào đầu mảng cho mọi tin mới", next: "unshift" },
          ],
        },
        pushslow: {
          text: "Bạn đo thấy thêm vào cuối vẫn gần như không đổi, vì mảng động nhân đôi dung lượng nên chi phí chép được chia đều cho nhiều lần thêm. Bạn tối ưu nhầm chỗ và hàng đợi vẫn chậm như cũ.",
          ending: "bad",
        },
        index: {
          text: "Đọc theo chỉ số trong mảng là tức thì vì địa chỉ tính được bằng một phép nhân, dù mảng dài bao nhiêu. Bạn đổi cấu trúc dựa trên một giả định sai và tạo thêm lỗi mà vẫn không giải quyết được độ chậm.",
          ending: "bad",
        },
        pointer: {
          text: "Lấy tin chỉ là tăng con trỏ nên tức thì, thêm vào cuối vẫn rẻ. Định kỳ bạn cắt phần đã xử lý để mảng không lớn mãi. Hàng đợi vài trăm nghìn tin chạy mượt trở lại.",
          ending: "good",
        },
        unshift: {
          text: "Chèn vào đầu cũng phải dịch mọi phần tử như shift, nên bạn chỉ chuyển chi phí từ chỗ này sang chỗ khác. Hàng đợi chậm theo kiểu mới, và còn khiến thứ tự xử lý bị đảo ngược.",
          ending: "bad",
        },
      },
    },
  ],
  "danh-sach-lien-ket": [
    {
      type: "scenario",
      title: "Bộ đệm mục dùng gần đây",
      start: "cache",
      nodes: {
        cache: {
          text: "Bạn xây bộ đệm giữ 1.000 mục dùng gần đây nhất: mỗi lần một mục được dùng, nó phải lên đầu danh sách; khi đầy thì bỏ mục ở cuối. Bạn chọn cấu trúc nào?",
          choices: [
            { label: "Danh sách liên kết đôi cùng bảng băm trỏ tới từng nút", next: "linked" },
            { label: "Một mảng, mỗi lần dùng thì chuyển phần tử lên đầu", next: "array" },
            { label: "Danh sách liên kết đơn, tìm mục bằng cách duyệt từ đầu", next: "single" },
          ],
        },
        linked: {
          text: "Nhờ bảng băm bạn đã có sẵn tham chiếu tới nút cần di chuyển, nên không phải duyệt. Giờ chọn cách bỏ mục cũ nhất khi đầy.",
          choices: [
            { label: "Dùng con trỏ đuôi của danh sách liên kết đôi để xoá", next: "tail" },
            { label: "Duyệt cả danh sách tìm mục cũ nhất để xoá", next: "scan" },
          ],
        },
        array: {
          text: "Mỗi lần dùng một mục phải dịch tới 1.000 phần tử trong mảng. Với số mục nhỏ thì ổn, nhưng khi bộ đệm lớn lên 100.000 mục, chính thao tác đưa lên đầu thành điểm nghẽn tốn nhiều thời gian hơn cả việc đọc dữ liệu.",
          ending: "bad",
        },
        single: {
          text: "Không có bảng băm, mỗi lần dùng phải duyệt từ đầu để tìm nút, và đây là các bước nhảy ngẫu nhiên giữa các địa chỉ nhớ. Bộ đệm chậm hơn cả việc đọc thẳng từ đĩa ở vài trường hợp.",
          ending: "bad",
        },
        tail: {
          text: "Danh sách đôi cho biết nút kế cuối ngay lập tức, nên xoá chỉ cần đổi vài con trỏ. Bạn cũng xoá mục khỏi bảng băm, và một ca thử đảm bảo hai nơi luôn khớp nhau.",
          ending: "good",
        },
        scan: {
          text: "Duyệt 1.000 nút để tìm nút cuối là việc thừa, vì con trỏ đuôi có sẵn. Mỗi lần bộ đệm đầy bạn trả giá một vòng duyệt, và bộ đệm vốn sinh ra để nhanh lại trở nên chậm dần.",
          ending: "bad",
        },
      },
    },
  ],
  "ngan-xep-va-hang-doi": [
    {
      type: "scenario",
      title: "Nút quay lại và hàng việc nền",
      start: "pick",
      nodes: {
        pick: {
          text: "Bạn làm hai tính năng trong cùng một ứng dụng: nút Quay lại cho trình soạn thảo (hoàn tác thao tác gần nhất) và hàng việc gửi email nền (việc nào đến trước gửi trước). Bạn chọn cấu trúc nào cho hai tính năng?",
          choices: [
            { label: "Ngăn xếp cho Quay lại, hàng đợi cho email", next: "right" },
            { label: "Hàng đợi cho Quay lại, ngăn xếp cho email", next: "swapped" },
            { label: "Một mảng chung, tự rút phần tử đâu cũng được", next: "free" },
          ],
        },
        right: {
          text: "Quay lại lấy thao tác vào sau cùng, email gửi theo thứ tự đến. Giờ bạn viết thêm tính năng kiểm tra mã: mỗi dấu mở ngoặc cần một dấu đóng đúng cặp.",
          choices: [
            { label: "Đẩy dấu mở vào ngăn xếp, gặp dấu đóng thì lấy ra so", next: "bracket" },
            { label: "Chỉ đếm số dấu mở và đóng có bằng nhau không", next: "count" },
          ],
        },
        swapped: {
          text: "Quay lại giờ hoàn tác thao tác cũ nhất thay vì mới nhất, nên khách bấm một lần mà mất sạch những gì mình vừa viết. Còn email gửi theo thứ tự đảo, người đăng ký gần nhất nhận thư đầu tiên và khách cũ đợi cuối.",
          ending: "bad",
        },
        free: {
          text: "Mảng làm được cả hai, nhưng mỗi nơi trong mã có thể rút phần tử ở giữa. Một lần sửa nhanh làm hỏng thứ tự email mà không ai biết nơi nào gây ra, vì không có hợp đồng nào ràng buộc cách dùng.",
          ending: "bad",
        },
        bracket: {
          text: "Chuỗi \"([)]\" bị phát hiện sai ngay vì dấu đóng không khớp dấu mở gần nhất trên ngăn xếp. Tính năng bắt được lỗi lồng nhau mà chỉ duyệt chuỗi đúng một lần.",
          ending: "good",
        },
        count: {
          text: "Chuỗi \"([)]\" có hai cặp, bằng nhau về số lượng nên bị coi là hợp lệ. Mã sai lọt qua kiểm tra và chỉ lộ ra khi trình biên dịch của khách báo lỗi khó hiểu về một dòng không liên quan.",
          ending: "bad",
        },
      },
    },
  ],
};
