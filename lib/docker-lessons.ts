import type { Lesson } from "./lesson-types";

// Chặng 39 "Docker và container" (ids 1920-1925, professional track).
//
// Đứng sau chặng triển khai và phát hành: người học đã biết đưa một ứng dụng lên
// máy chủ, chặng này đóng gói nó để "chạy trên máy tôi" và "chạy trên máy chủ"
// là cùng một thứ. Không gắn với nhà cung cấp registry hay nền tảng điều phối nào.
// Lệnh docker không chạy được trong trình duyệt: khối bash là để đọc, bài tập
// mô phỏng cơ chế (lớp và bộ nhớ đệm, volume, thứ tự khởi động) bằng JavaScript.

export const DOCKER_LESSONS: Lesson[] = [
  {
    "id": 1920,
    "slug": "container-la-gi-va-khong-phai-la-gi",
    "title": "Docker, Bài 1: Container là gì - và không phải là gì",
    "subtitle": "Không phải một máy ảo nhỏ, mà là một tiến trình bình thường được rào lại.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📦",
    "track": "professional",
    "whyItMatters": "\"Chạy trên máy tôi mà\" là câu mở đầu của rất nhiều sự cố: khác phiên bản ngôn ngữ, thiếu một thư viện hệ thống, biến môi trường khác. Container gói ứng dụng cùng mọi thứ nó cần thành một khối chạy giống nhau ở mọi nơi. Hiểu nó thật ra là gì giúp bạn tránh hai sai lầm ngược nhau: coi nó như máy ảo an toàn tuyệt đối, hoặc coi nó như phép màu làm mọi thứ tự chạy.",
    "openingQuestion": "Trên một máy Linux đang chạy ba container, lệnh ps ở máy chủ sẽ thấy tiến trình bên trong các container không?",
    "openingOptions": [
      "Có, vì container là tiến trình của chính máy đó, chỉ bị giới hạn tầm nhìn",
      "Không, vì mỗi container chạy trên một nhân hệ điều hành riêng tách biệt hẳn",
      "Không, vì Docker mã hoá bộ nhớ của container nên máy chủ không đọc được",
      "Chỉ thấy nếu container được chạy với quyền root trên máy chủ đó mà thôi"
    ],
    "correctOption": 0,
    "explanation": "Container dùng chung nhân hệ điều hành với máy chủ. Nó là một tiến trình bình thường, được nhân Linux rào lại bằng namespace (chỉ nhìn thấy tiến trình, mạng, hệ thống tệp của riêng nó) và cgroup (giới hạn CPU, bộ nhớ). Từ bên trong, nó tưởng mình là cả một máy; từ bên ngoài, ps thấy nó như mọi tiến trình khác. Máy ảo thì khác: nó có nhân riêng chạy trên phần cứng giả lập, nặng hơn nhiều nhưng cách ly mạnh hơn.",
    "diagram": [
      {
        "label": "Image: bản đóng gói chỉ đọc, gồm nhiều lớp",
        "arrow": true
      },
      {
        "label": "docker run: tạo container từ image",
        "arrow": true
      },
      {
        "label": "Tiến trình trên nhân máy chủ, rào bằng namespace và cgroup",
        "arrow": true
      },
      {
        "label": "Lớp ghi tạm của container, mất khi xoá container"
      }
    ],
    "realWorldExample": {
      "company": "Một nhóm năm người làm ứng dụng web (tình huống minh hoạ)",
      "description": "Người mới vào nhóm mất hai ngày cài đúng phiên bản Node, Postgres và một thư viện xử lý ảnh. Sau khi nhóm đóng gói môi trường bằng container, người mới tiếp theo chỉ chạy một lệnh và có đủ mọi thứ trong mười phút - cùng phiên bản với máy chủ thật."
    },
    "quiz": [
      {
        "question": "Image và container khác nhau thế nào?",
        "options": [
          "Image là bản đóng gói chỉ đọc; container là một lần chạy của image đó",
          "Image chạy trên máy chủ thật, còn container chỉ chạy trên máy cá nhân của lập trình viên",
          "Image chứa mã nguồn, còn container chứa bản đã được biên dịch sẵn của mã đó",
          "Hai tên gọi chỉ cùng một thứ, khác nhau theo cách gọi của từng công cụ"
        ],
        "correct": 0,
        "explanation": "Giống quan hệ giữa chương trình và tiến trình: image là thứ nằm yên, đóng gói sẵn và không đổi; container là một lần chạy image đó, có trạng thái riêng. Từ một image bạn chạy được mười container giống hệt nhau. Mọi thay đổi trong lúc chạy nằm ở lớp ghi của container, không chạm vào image."
      },
      {
        "question": "Vì sao container khởi động nhanh hơn máy ảo nhiều lần?",
        "options": [
          "Vì container được nén nhỏ hơn nhiều lần nên tải từ ổ đĩa lên bộ nhớ nhanh hơn hẳn",
          "Vì nó không phải khởi động một hệ điều hành, chỉ khởi động một tiến trình",
          "Vì container bỏ qua bước kiểm tra bảo mật mà máy ảo luôn phải thực hiện",
          "Vì Docker giữ sẵn mọi container ở trạng thái chạy nền để dùng lại ngay"
        ],
        "correct": 1,
        "explanation": "Máy ảo phải khởi động cả một nhân hệ điều hành trên phần cứng giả lập, việc tính bằng chục giây. Container dùng nhân đã chạy sẵn của máy chủ, nên khởi động container gần như chỉ là khởi động tiến trình của ứng dụng - thường dưới một giây."
      },
      {
        "question": "Một image dựng trên máy Mac chip ARM được chạy trên máy chủ x86. Chuyện gì dễ xảy ra?",
        "options": [
          "Chạy bình thường, vì container không phụ thuộc vào loại bộ xử lý nào cả",
          "Chạy được nhưng chậm hơn một chút do Docker tự động dịch lại toàn bộ mã",
          "Báo lỗi định dạng tệp thực thi, vì mã máy trong image dành cho ARM",
          "Docker tự tải image phù hợp từ Internet nên không bao giờ có vấn đề gì"
        ],
        "correct": 2,
        "explanation": "Container dùng chung nhân và bộ xử lý của máy chủ, nên mã máy trong image phải đúng kiến trúc. Image dựng trên ARM chứa tệp thực thi ARM, và máy x86 báo \"exec format error\". Cách xử lý là dựng image đa kiến trúc hoặc dựng đúng cho nền tảng đích bằng tuỳ chọn --platform."
      },
      {
        "question": "Khi nào máy ảo vẫn là lựa chọn đúng hơn container?",
        "options": [
          "Khi ứng dụng cần khởi động nhanh và chạy nhiều bản song song cùng lúc",
          "Khi cần chạy mã không tin cậy của người khác với ranh giới cách ly mạnh",
          "Khi ứng dụng viết bằng ngôn ngữ thông dịch như Python hoặc JavaScript",
          "Khi đội muốn mọi người có cùng một môi trường phát triển trên máy mình"
        ],
        "correct": 1,
        "explanation": "Container chia chung nhân với máy chủ, nên một lỗ hổng ở nhân có thể cho mã bên trong thoát ra ngoài. Với mã không tin cậy - bài nộp của người dùng, mã của khách hàng khác - ranh giới của máy ảo (nhân riêng) mạnh hơn nhiều. Các nền tảng chạy mã người dùng thường đặt container bên trong máy ảo nhỏ vì lý do này."
      },
      {
        "question": "Container bị xoá rồi chạy lại từ cùng image. Tệp ứng dụng đã ghi vào /tmp trong lần trước còn không?",
        "options": [
          "Còn, vì Docker tự lưu mọi thay đổi vào image mỗi khi container dừng lại",
          "Còn, nếu tệp đó nhỏ hơn giới hạn dung lượng mặc định của lớp ghi tạm",
          "Chỉ còn nếu container trước đó được dừng đúng cách bằng lệnh docker stop",
          "Không còn, vì lớp ghi thuộc về container cũ và đã bị xoá theo nó"
        ],
        "correct": 3,
        "explanation": "Mỗi container có một lớp ghi riêng nằm trên các lớp chỉ đọc của image. Xoá container là xoá lớp đó. Dữ liệu cần sống qua lần xoá - cơ sở dữ liệu, tệp người dùng tải lên - phải nằm trong volume, là chủ đề của Bài 4."
      }
    ],
    "keyTakeaways": [
      "Container là tiến trình trên nhân máy chủ, được rào bằng namespace và giới hạn bằng cgroup.",
      "Image là bản đóng gói chỉ đọc; container là một lần chạy của nó, có lớp ghi riêng.",
      "Khởi động nhanh vì không phải khởi động hệ điều hành.",
      "Cùng nhân, cùng kiến trúc bộ xử lý: image ARM không chạy trên máy x86.",
      "Cách ly yếu hơn máy ảo: mã không tin cậy cần ranh giới mạnh hơn."
    ],
    "practicePrompt": {
      "question": "Đồng nghiệp đề xuất chạy mã do người dùng tải lên trong container để \"an toàn tuyệt đối\". Phản hồi hợp lý nhất?",
      "options": [
        "Đồng ý, vì container được thiết kế riêng để chạy mã không đáng tin cậy của người khác",
        "Đồng ý, miễn là container được giới hạn CPU và bộ nhớ bằng cgroup",
        "Không đủ: container chia nhân với máy chủ, cần thêm lớp cách ly mạnh hơn",
        "Không nên, vì container không chạy được mã do người dùng tự tải lên"
      ],
      "correct": 2,
      "explanation": "Giới hạn tài nguyên chỉ chống việc ăn hết CPU, không chống thoát ra ngoài. Vì mọi container chia chung một nhân, một lỗ hổng ở nhân là đường ra cho mã độc. Chạy mã không tin cậy cần thêm ranh giới: máy ảo nhỏ, sandbox ở mức nhân, không quyền root, không mạng ra ngoài."
    },
    "summary": {
      "keyIdea": "Container là một tiến trình được rào lại, không phải một máy ảo thu nhỏ.",
      "formula": "Container = image chỉ đọc + lớp ghi tạm + namespace + cgroup, trên nhân của máy chủ.",
      "commonMistake": "Coi container là ranh giới bảo mật tuyệt đối, hoặc lưu dữ liệu quan trọng trong lớp ghi tạm.",
      "action": "Chạy một container, rồi dùng ps trên máy chủ để tìm chính tiến trình của nó."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy docker run --rm -it alpine sh, gõ ps và hostname bên trong. Mở một cửa sổ khác và gõ ps aux | grep sh trên máy chủ: bạn sẽ thấy cùng tiến trình đó từ bên ngoài, với một số hiệu khác.",
      "secondary": "Bài sau: viết Dockerfile, và vì sao thứ tự các dòng quyết định bạn chờ 5 giây hay 5 phút."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trước khi viết Dockerfile đầu tiên, cần một hình dung đúng về thứ mình đang làm. Phần lớn nhầm lẫn về Docker đến từ một hình ảnh sai: container là một máy ảo nhỏ. Nó không phải vậy, và sự khác biệt đó giải thích gần hết hành vi của nó."
      },
      {
        "type": "feynman",
        "title": "Container giải thích bằng một toà chung cư",
        "intro": "Hình dung máy chủ là một toà nhà, và các ứng dụng là người thuê.",
        "columns": [
          "Khái niệm",
          "Toà nhà",
          "Máy chủ"
        ],
        "rows": [
          [
            "Máy ảo",
            "Mỗi người thuê xây nguyên một căn nhà riêng trong khuôn viên",
            "Mỗi ứng dụng có nhân hệ điều hành riêng"
          ],
          [
            "Container",
            "Căn hộ trong cùng toà nhà, chung móng, chung đường ống",
            "Chung nhân, riêng hệ thống tệp và mạng"
          ],
          [
            "Namespace",
            "Tường ngăn: không nhìn thấy nhà hàng xóm",
            "Chỉ thấy tiến trình, mạng, tệp của mình"
          ],
          [
            "cgroup",
            "Công tơ điện nước có giới hạn",
            "Giới hạn CPU và bộ nhớ"
          ]
        ],
        "oneLiner": "Chung móng nên xây nhanh và rẻ - và cũng vì chung móng nên tường ngăn không dày bằng hai căn nhà riêng."
      },
      {
        "type": "heading",
        "text": "Image, container, registry"
      },
      {
        "type": "conceptTable",
        "title": "Ba danh từ cần phân biệt",
        "concepts": [
          {
            "vi": "Image",
            "en": "Image",
            "def": "Bản đóng gói chỉ đọc: hệ thống tệp của ứng dụng cùng lệnh khởi động, xếp thành nhiều lớp."
          },
          {
            "vi": "Container",
            "en": "Container",
            "def": "Một lần chạy image, có thêm lớp ghi riêng và mất theo khi bị xoá."
          },
          {
            "vi": "Kho image",
            "en": "Registry",
            "def": "Nơi lưu và phân phối image, như kho mã từ xa của Git."
          },
          {
            "vi": "Thẻ",
            "en": "Tag",
            "def": "Nhãn phiên bản của image, ví dụ node:22-slim. Có thể bị gán lại, nên không bất biến."
          }
        ]
      },
      {
        "type": "code",
        "language": "bash",
        "caption": "Năm lệnh đầu tiên",
        "code": "$ docker run --rm -it alpine sh     # chạy một container, xoá khi thoát\n/ # ps\nPID   USER     COMMAND\n    1 root     sh                    # bên trong: tưởng mình là tiến trình số 1\n$ docker ps                          # các container đang chạy (từ cửa sổ khác)\n$ docker images                      # các image đã tải về\n$ docker run -d -p 8080:80 nginx     # chạy nền, nối cổng 8080 máy chủ vào cổng 80 container\n$ docker logs -f <id>                # xem đầu ra của container\n$ docker exec -it <id> sh            # mở một shell bên trong container đang chạy"
      },
      {
        "type": "callout",
        "label": "Cách ly có giới hạn",
        "text": "Chạy tiến trình trong container với quyền root thì root đó, về mặt nhân, vẫn là root. Mặc định Docker bỏ bớt nhiều quyền nguy hiểm, nhưng thói quen đúng là chạy ứng dụng bằng người dùng thường bên trong container - Bài 3 sẽ làm việc đó."
      },
      {
        "type": "closing",
        "lines": [
          "Container là tiến trình được rào lại: chung nhân nên nhẹ và nhanh, và cũng vì chung nhân nên cần cẩn thận.",
          "Bài sau viết Dockerfile đầu tiên."
        ]
      }
    ]
  },
  {
    "id": 1921,
    "slug": "dockerfile-va-bo-nho-dem-tung-lop",
    "title": "Docker, Bài 2: Dockerfile và bộ nhớ đệm từng lớp",
    "subtitle": "Đổi một dòng mã mà phải cài lại toàn bộ thư viện là dấu hiệu thứ tự các bước đang sai.",
    "duration": "12 phút",
    "difficulty": "Trung bình",
    "emoji": "🧱",
    "track": "professional",
    "whyItMatters": "Mỗi dòng trong Dockerfile tạo một lớp, và Docker dùng lại lớp cũ cho tới dòng đầu tiên có đầu vào thay đổi. Viết đúng thứ tự thì sửa một dòng mã chỉ dựng lại vài giây; viết sai thì mỗi lần sửa là một lần cài lại toàn bộ thư viện. Trên CI, khác biệt đó nhân với mọi lần đẩy mã của cả đội.",
    "openingQuestion": "Dockerfile chép toàn bộ mã nguồn vào trước, rồi mới chạy npm install. Bạn sửa một dòng CSS. Lần dựng tiếp theo chạy lại những bước nào?",
    "openingOptions": [
      "Chỉ bước chép mã, vì Docker biết npm install không phụ thuộc vào tệp CSS",
      "Bước chép mã và mọi bước sau nó, gồm cả npm install tốn vài phút",
      "Không bước nào, vì Docker chỉ dựng lại khi tệp Dockerfile thay đổi",
      "Toàn bộ các bước từ đầu, kể cả bước tải lại image nền ở dòng FROM"
    ],
    "correctOption": 1,
    "explanation": "Docker so đầu vào của từng bước với lần dựng trước: với COPY là nội dung các tệp được chép, với RUN là chính dòng lệnh. Bước đầu tiên có đầu vào khác bị dựng lại, và mọi bước sau nó cũng vậy vì chúng nằm trên một lớp đã đổi. Chép toàn bộ mã lên trước nghĩa là mọi thay đổi mã đều làm hỏng bộ nhớ đệm của npm install. Cách sửa là chép riêng tệp khai báo thư viện, cài thư viện, rồi mới chép phần mã còn lại.",
    "diagram": [
      {
        "label": "FROM: image nền",
        "arrow": true
      },
      {
        "label": "COPY tệp khai báo thư viện, rồi RUN cài thư viện",
        "arrow": true
      },
      {
        "label": "COPY phần mã còn lại",
        "arrow": true
      },
      {
        "label": "CMD: lệnh khởi động"
      }
    ],
    "realWorldExample": {
      "company": "Pipeline CI của một ứng dụng Node (tình huống minh hoạ)",
      "description": "Mỗi lần dựng image mất sáu phút, phần lớn cho npm install. Đổi hai dòng trong Dockerfile - chép package.json và package-lock.json trước, cài thư viện, rồi mới chép mã - đưa lần dựng thường ngày xuống khoảng hai mươi giây, vì thư viện hiếm khi đổi còn mã thì đổi liên tục."
    },
    "quiz": [
      {
        "question": "Docker quyết định dùng lại lớp của một bước COPY dựa vào đâu?",
        "options": [
          "Thời điểm sửa đổi cuối cùng của thư mục chứa các tệp được chép vào",
          "Nội dung của các tệp được chép, so với lần dựng trước đó",
          "Tên các tệp được chép, bất kể nội dung bên trong có đổi hay không",
          "Dung lượng tổng của các tệp, so với dung lượng ở lần dựng trước"
        ],
        "correct": 1,
        "explanation": "Với COPY và ADD, Docker tính giá trị băm từ nội dung (và siêu dữ liệu) của tệp. Sửa một ký tự là đổi giá trị băm, lớp bị dựng lại. Chỉ đổi thời gian sửa mà nội dung giữ nguyên thì vẫn dùng lại được."
      },
      {
        "question": "Vì sao RUN apt-get update đứng riêng một dòng, tách khỏi apt-get install, lại gây lỗi khó hiểu?",
        "options": [
          "Vì apt-get update không chạy được nếu không đi kèm lệnh cài đặt nào",
          "Vì hai dòng riêng tạo hai lớp làm image to gấp đôi so với một dòng",
          "Vì lớp update được dùng lại mãi, còn install thêm gói mới thì đọc danh sách cũ",
          "Vì Docker chạy các dòng RUN song song nên update có thể xong sau install"
        ],
        "correct": 2,
        "explanation": "Dòng RUN apt-get update không đổi chữ nào, nên Docker dùng lại lớp của nó từ nhiều tháng trước. Khi bạn thêm một gói vào dòng install, dòng đó được dựng lại nhưng đọc danh sách gói cũ, và có thể không tìm thấy phiên bản cần. Gộp hai lệnh vào một dòng RUN để chúng luôn được dựng lại cùng nhau."
      },
      {
        "question": "Tệp .dockerignore có tác dụng gì?",
        "options": [
          "Loại tệp khỏi ngữ cảnh dựng, nên chúng không lọt vào image và không làm hỏng bộ nhớ đệm",
          "Liệt kê những dòng trong Dockerfile sẽ được bỏ qua khi dựng image trên máy chủ CI của cả đội",
          "Khai báo những image nền không được phép dùng trong kho mã của dự án",
          "Chặn container đọc các tệp tương ứng trên máy chủ trong lúc đang chạy"
        ],
        "correct": 0,
        "explanation": "Khi dựng, Docker gửi cả thư mục (ngữ cảnh dựng) cho bộ dựng. Không loại node_modules, .git, tệp nhật ký thì mỗi thay đổi ở đó làm hỏng bộ nhớ đệm của COPY . . và ngữ cảnh tải lên chậm. Tệp .env mà lọt vào image thì bí mật đi theo image tới mọi nơi nó được đẩy lên."
      },
      {
        "question": "CMD và ENTRYPOINT khác nhau ở đâu?",
        "options": [
          "CMD chạy lúc dựng image, còn ENTRYPOINT chạy lúc container khởi động",
          "ENTRYPOINT là lệnh cố định; CMD là tham số mặc định, ghi đè được khi chạy",
          "CMD chỉ dùng được cho ứng dụng web, còn ENTRYPOINT dùng cho mọi loại",
          "Hai lệnh giống nhau, chỉ khác tên gọi giữa các phiên bản của Docker"
        ],
        "correct": 1,
        "explanation": "ENTRYPOINT [\"node\"] và CMD [\"server.js\"] nghĩa là mặc định chạy node server.js, còn docker run image migrate.js thì chạy node migrate.js. Cả hai đều chạy lúc container khởi động; thứ chạy lúc dựng là RUN."
      },
      {
        "question": "Viết CMD dạng mảng [\"node\", \"server.js\"] thay vì dạng chuỗi node server.js có lợi gì?",
        "options": [
          "Dạng mảng làm image nhỏ hơn vì không phải chép thêm chương trình shell vào",
          "Dạng mảng chạy nhanh hơn vì Docker biên dịch trước câu lệnh ngay lúc dựng image",
          "Ứng dụng là tiến trình số 1 và nhận được tín hiệu dừng, nên tắt êm được",
          "Dạng mảng là bắt buộc với mọi image dựa trên hệ điều hành Linux hiện nay"
        ],
        "correct": 2,
        "explanation": "Dạng chuỗi chạy qua /bin/sh -c, nên tiến trình số 1 là shell và nó không chuyển tín hiệu SIGTERM cho ứng dụng. docker stop chờ mười giây rồi giết cứng, ứng dụng không kịp đóng kết nối. Dạng mảng chạy thẳng ứng dụng, tín hiệu tới đúng nơi."
      }
    ],
    "keyTakeaways": [
      "Mỗi dòng là một lớp; bước đầu tiên có đầu vào đổi sẽ dựng lại nó và mọi bước sau.",
      "Chép tệp khai báo thư viện và cài thư viện trước, chép mã sau.",
      "Gộp apt-get update với install trong cùng một dòng RUN.",
      ".dockerignore loại node_modules, .git, .env khỏi ngữ cảnh dựng.",
      "CMD dạng mảng để ứng dụng nhận được tín hiệu dừng."
    ],
    "practicePrompt": {
      "question": "Thêm một thư viện vào package.json. Với Dockerfile đã sắp đúng thứ tự, những bước nào chạy lại?",
      "options": [
        "Chỉ bước chép mã nguồn, vì bước cài thư viện đã có sẵn trong bộ nhớ đệm",
        "Bước chép package.json, cài thư viện, và chép mã - mọi bước từ chỗ đổi trở đi",
        "Chỉ bước cài thư viện, vì Docker nhận ra chỉ có một thư viện mới được thêm",
        "Toàn bộ các bước, kể cả dòng FROM, vì tệp khai báo thư viện là tệp đặc biệt với Docker"
      ],
      "correct": 1,
      "explanation": "package.json đổi nên bước COPY chép nó bị dựng lại, kéo theo bước cài thư viện và mọi bước sau. Đó là đúng như mong muốn: thư viện đổi thì phải cài lại. Điều thứ tự tốt mang lại là những lần chỉ sửa mã - phần lớn các lần - không phải trả giá đó."
    },
    "summary": {
      "keyIdea": "Xếp các bước từ ít đổi tới hay đổi, để bộ nhớ đệm làm việc cho bạn.",
      "formula": "FROM → cài hệ thống → chép khai báo thư viện → cài thư viện → chép mã → CMD.",
      "commonMistake": "COPY . . ở đầu, khiến mỗi lần sửa mã là một lần cài lại toàn bộ thư viện.",
      "action": "Mở Dockerfile của bạn, tìm dòng COPY đầu tiên và hỏi: dòng này có chép mã nguồn không?"
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Dựng image hai lần liên tiếp và ghi thời gian. Sửa một dòng mã, dựng lại và xem những bước nào in CACHED. Nếu bước cài thư viện không nằm trong số đó, đổi thứ tự rồi đo lại.",
      "secondary": "Bài sau: làm image nhỏ và an toàn hơn bằng dựng nhiều giai đoạn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một Dockerfile đúng chạy được. Một Dockerfile tốt chạy được và dựng lại trong vài giây khi bạn sửa mã. Khác biệt nằm gần như trọn ở thứ tự các dòng."
      },
      {
        "type": "code",
        "language": "text",
        "caption": "Dockerfile cho một ứng dụng Node, sắp theo độ hay đổi",
        "code": "FROM node:22-slim\nWORKDIR /app\n\n# Ít đổi: chỉ đổi khi thêm hoặc nâng thư viện\nCOPY package.json package-lock.json ./\nRUN npm ci --omit=dev\n\n# Hay đổi: mọi lần sửa mã\nCOPY . .\n\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]"
      },
      {
        "type": "heading",
        "text": "Bộ nhớ đệm hoạt động thế nào"
      },
      {
        "type": "paragraph",
        "text": "Docker đi từ trên xuống, so đầu vào của từng bước với lần dựng trước. Đầu vào của RUN là chính dòng lệnh; của COPY là nội dung các tệp được chép. Gặp bước đầu tiên có đầu vào khác, nó dựng lại bước đó - và vì mọi bước sau nằm chồng lên lớp vừa đổi, chúng cũng phải dựng lại, dù bản thân không đổi gì."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thứ tự sai",
          "text": "COPY . . rồi RUN npm ci. Sửa một dòng CSS: nội dung được chép đổi, npm ci chạy lại. Mỗi lần sửa mã tốn vài phút."
        },
        "right": {
          "label": "Thứ tự đúng",
          "text": "COPY tệp khai báo, RUN npm ci, rồi COPY . . Sửa CSS: chỉ bước cuối dựng lại. Thư viện chỉ cài lại khi tệp khai báo đổi."
        }
      },
      {
        "type": "list",
        "items": [
          "Gộp apt-get update && apt-get install -y ... trong một dòng RUN, kèm dọn danh sách gói ở cuối.",
          "npm ci thay cho npm install: cài đúng theo tệp khoá, và báo lỗi nếu tệp khoá lệch với package.json.",
          ".dockerignore tối thiểu: node_modules, .git, .env, các tệp nhật ký và thư mục bản dựng."
        ]
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Bước nào sẽ dựng lại",
        "task": "Mỗi bước có tên và danh sách tệp đầu vào. canDungLai(buoc, tepDoi) trả về tên các bước phải dựng lại khi những tệp trong tepDoi thay đổi: bước đầu tiên dùng một tệp đã đổi, và mọi bước sau nó. Sau khi hàm đúng, sắp lại mảng buocTot để sửa server.js chỉ dựng lại 2 bước (chép mã và CMD) thay vì 3 như bản xấu - tức bước cài thư viện không còn bị kéo theo.",
        "starter": "const buocXau = [\n  { ten: \"FROM node:22-slim\", vao: [] },\n  { ten: \"COPY . .\", vao: [\"package.json\", \"server.js\", \"style.css\"] },\n  { ten: \"RUN npm ci\", vao: [] },\n  { ten: \"CMD node server.js\", vao: [] },\n];\nconst buocTot = [\n  { ten: \"FROM node:22-slim\", vao: [] },\n  { ten: \"COPY . .\", vao: [\"package.json\", \"server.js\", \"style.css\"] },\n  { ten: \"RUN npm ci\", vao: [] },\n  { ten: \"COPY package.json\", vao: [\"package.json\"] },\n  { ten: \"CMD node server.js\", vao: [] },\n];\n\nfunction canDungLai(buoc, tepDoi) {\n  return buoc.filter((b) => b.vao.some((t) => tepDoi.includes(t))).map((b) => b.ten);\n}\n\nfor (const [ten, ds] of [[\"xấu\", buocXau], [\"tốt\", buocTot]]) {\n  console.log(ten + \" | sửa server.js: \" + canDungLai(ds, [\"server.js\"]).length + \" bước | thêm thư viện: \" + canDungLai(ds, [\"package.json\"]).length + \" bước\");\n}",
        "solution": "const buocXau = [\n  { ten: \"FROM node:22-slim\", vao: [] },\n  { ten: \"COPY . .\", vao: [\"package.json\", \"server.js\", \"style.css\"] },\n  { ten: \"RUN npm ci\", vao: [] },\n  { ten: \"CMD node server.js\", vao: [] },\n];\nconst buocTot = [\n  { ten: \"FROM node:22-slim\", vao: [] },\n  { ten: \"COPY package.json\", vao: [\"package.json\"] },\n  { ten: \"RUN npm ci\", vao: [] },\n  { ten: \"COPY . .\", vao: [\"package.json\", \"server.js\", \"style.css\"] },\n  { ten: \"CMD node server.js\", vao: [] },\n];\n\nfunction canDungLai(buoc, tepDoi) {\n  const i = buoc.findIndex((b) => b.vao.some((t) => tepDoi.includes(t)));\n  return i < 0 ? [] : buoc.slice(i).map((b) => b.ten);\n}\n\nfor (const [ten, ds] of [[\"xấu\", buocXau], [\"tốt\", buocTot]]) {\n  console.log(ten + \" | sửa server.js: \" + canDungLai(ds, [\"server.js\"]).length + \" bước | thêm thư viện: \" + canDungLai(ds, [\"package.json\"]).length + \" bước\");\n}",
        "hints": [
          "Một bước bị dựng lại thì MỌI bước sau nó cũng vậy, kể cả những bước không dùng tệp nào - tìm chỉ số đầu tiên rồi slice.",
          "Trong buocTot, đưa COPY package.json và RUN npm ci lên trước COPY . ."
        ],
        "expectedOutput": "xấu | sửa server.js: 3 bước | thêm thư viện: 3 bước\ntốt | sửa server.js: 2 bước | thêm thư viện: 4 bước"
      },
      {
        "type": "closing",
        "lines": [
          "Thứ tự các dòng là quyết định hiệu năng lớn nhất trong một Dockerfile.",
          "Bài sau làm image nhỏ và an toàn hơn."
        ]
      }
    ]
  },
  {
    "id": 1922,
    "slug": "image-nho-va-an-toan",
    "title": "Docker, Bài 3: Image nhỏ và an toàn",
    "subtitle": "Trình biên dịch, bí mật và quyền root không có lý do gì để đi theo image lên máy chủ.",
    "duration": "12 phút",
    "difficulty": "Trung bình",
    "emoji": "🛡️",
    "track": "professional",
    "whyItMatters": "Image là thứ bạn đẩy lên kho và chạy trên máy chủ. Mọi thứ nằm trong nó - trình biên dịch, công cụ gỡ lỗi, tệp .env vô tình chép vào - đều đi cùng tới đó, làm image nặng, kéo chậm, và cho kẻ tấn công thêm công cụ. Dựng nhiều giai đoạn, chạy bằng người dùng thường và ghim phiên bản là ba thói quen rẻ chặn được phần lớn rủi ro.",
    "openingQuestion": "Một bước RUN ghi khoá API vào tệp, bước RUN sau xoá tệp đó. Khoá còn nằm trong image không?",
    "openingOptions": [
      "Không, vì tệp đã bị xoá trước khi image được dựng xong hoàn toàn",
      "Không, nếu image được dựng với tuỳ chọn không dùng bộ nhớ đệm",
      "Chỉ còn trong bộ nhớ đệm trên máy dựng, không đi theo image được đẩy lên",
      "Có, vì lớp của bước đầu vẫn chứa tệp, lớp sau chỉ đánh dấu nó đã xoá"
    ],
    "correctOption": 3,
    "explanation": "Mỗi lớp là một bản ghi thay đổi, và các lớp chỉ được chồng lên chứ không bị sửa. Xoá tệp ở bước sau chỉ thêm một dấu \"đã xoá\" ở lớp mới; lớp cũ vẫn nằm nguyên trong image và ai tải image về cũng giải nén được nó. Cách đúng là không bao giờ ghi bí mật vào lớp: dùng bí mật khi dựng (build secret) được gắn tạm, hoặc truyền lúc chạy qua biến môi trường.",
    "diagram": [
      {
        "label": "Giai đoạn dựng: đủ công cụ biên dịch",
        "arrow": true
      },
      {
        "label": "Chỉ chép thành phẩm sang giai đoạn chạy",
        "arrow": true
      },
      {
        "label": "Image nền tối giản, ghim phiên bản",
        "arrow": true
      },
      {
        "label": "Chạy bằng người dùng thường, không có bí mật bên trong"
      }
    ],
    "realWorldExample": {
      "company": "Kho image công khai (tình huống minh hoạ)",
      "description": "Một nhóm đẩy image lên kho công khai để khách hàng tự triển khai. Vài tuần sau, khoá truy cập dịch vụ đám mây của họ bị dùng để chạy máy đào tiền mã hoá. Khoá nằm trong một lớp giữa của image: được chép vào để cài một gói riêng, rồi \"xoá\" ở dòng sau."
    },
    "quiz": [
      {
        "question": "Dựng nhiều giai đoạn (multi-stage build) giải quyết vấn đề gì?",
        "options": [
          "Cho phép chạy nhiều ứng dụng khác nhau bên trong cùng một container",
          "Giữ công cụ dựng ở giai đoạn đầu và chỉ chép thành phẩm vào image chạy",
          "Chia image thành nhiều phần nhỏ để tải song song cho nhanh hơn",
          "Cho phép dựng image trên nhiều máy cùng lúc để giảm thời gian chờ"
        ],
        "correct": 1,
        "explanation": "Giai đoạn đầu có đủ trình biên dịch, thư viện phát triển, bộ đóng gói; giai đoạn cuối bắt đầu lại từ một image nền nhỏ và chỉ COPY --from thành phẩm. Image chạy không còn công cụ dựng: nhỏ hơn nhiều lần và ít thứ để khai thác hơn."
      },
      {
        "question": "Vì sao nên chạy ứng dụng trong container bằng người dùng thường thay vì root?",
        "options": [
          "Vì người dùng thường được cấp nhiều bộ nhớ hơn theo mặc định của Docker",
          "Vì Docker từ chối chạy image có quyền root trên các máy chủ Linux hiện đại",
          "Kẻ chiếm được ứng dụng sẽ có ít quyền hơn nếu tìm được đường thoát ra",
          "Vì ứng dụng chạy bằng root không mở được cổng mạng bên trong container"
        ],
        "correct": 2,
        "explanation": "Container chia nhân với máy chủ. Nếu ứng dụng bị chiếm và có lỗ hổng cho phép thoát ra, root trong container nhiều khả năng thành root trên máy chủ. Thêm USER app trong Dockerfile là một dòng, và nó thu hẹp đáng kể thiệt hại của một lần bị chiếm."
      },
      {
        "question": "FROM node:latest có vấn đề gì trong image chạy thật?",
        "options": [
          "Thẻ latest luôn là bản thử nghiệm chưa ổn định nên không dùng được",
          "latest chỉ tồn tại trên máy cá nhân, không kéo được từ kho image",
          "Image dựng từ latest không được phép đẩy lên kho image riêng của công ty",
          "Mỗi lần dựng có thể lấy một phiên bản khác, nên hai lần dựng không giống nhau"
        ],
        "correct": 3,
        "explanation": "latest chỉ là một thẻ trỏ vào bản mới nhất lúc bạn kéo. Hôm nay là Node 22, tháng sau có thể là 24 với thay đổi không tương thích. Ghim phiên bản cụ thể (node:22.9-slim), và với mức chắc chắn cao nhất thì ghim theo mã băm @sha256."
      },
      {
        "question": "Bí mật cần cho lúc CHẠY, như chuỗi kết nối cơ sở dữ liệu, nên đưa vào container thế nào?",
        "options": [
          "Truyền lúc chạy qua biến môi trường hoặc tệp gắn vào, không nằm trong image",
          "Ghi vào Dockerfile bằng lệnh ENV để mọi container dựng từ image đều có sẵn giá trị đó",
          "Chép tệp .env vào image rồi đặt quyền chỉ đọc cho người dùng ứng dụng",
          "Mã hoá bằng base64 rồi ghi vào image để người khác không đọc được"
        ],
        "correct": 0,
        "explanation": "Một image dùng cho mọi môi trường (Bài 292 ở chặng triển khai): cấu hình và bí mật đến từ bên ngoài lúc chạy. ENV trong Dockerfile và tệp chép vào đều thành một phần của image. base64 là mã hoá, không phải mật mã - ai cũng giải được."
      },
      {
        "question": "Image nền kiểu slim hay distroless đổi lại điều gì so với image đầy đủ?",
        "options": [
          "Không đổi lại gì cả, chúng tốt hơn image đầy đủ ở mọi khía cạnh có thể",
          "Nhỏ và ít lỗ hổng hơn, nhưng thiếu shell và công cụ khi cần gỡ lỗi",
          "Chạy nhanh hơn nhưng chỉ hỗ trợ ứng dụng viết bằng ngôn ngữ biên dịch",
          "Nhỏ hơn nhưng không được cập nhật bản vá bảo mật thường xuyên như bản đầy đủ"
        ],
        "correct": 1,
        "explanation": "Ít gói hơn nghĩa là ít lỗ hổng phải vá và ít công cụ cho kẻ tấn công. Cái giá là khi cần vào container gỡ lỗi thì không có shell, không có curl. Cách làm phổ biến: image chạy tối giản, và gỡ lỗi bằng một container phụ gắn vào cùng không gian tiến trình."
      }
    ],
    "keyTakeaways": [
      "Lớp chỉ chồng lên, không bị sửa: bí mật đã vào một lớp thì nằm trong image mãi.",
      "Dựng nhiều giai đoạn: công cụ dựng ở lại, chỉ thành phẩm đi tiếp.",
      "USER để chạy ứng dụng bằng người dùng thường.",
      "Ghim phiên bản image nền; latest làm hai lần dựng khác nhau.",
      "Bí mật lúc chạy đến từ bên ngoài, không nằm trong image."
    ],
    "practicePrompt": {
      "question": "Image của bạn nặng 1,2 GB, gồm cả trình biên dịch và mã nguồn TypeScript. Ứng dụng chỉ cần thư mục dist đã biên dịch. Bước đầu tiên nên làm?",
      "options": [
        "Nén image bằng công cụ bên ngoài trước khi đẩy lên kho image",
        "Tách thành hai giai đoạn: biên dịch ở giai đoạn đầu, chỉ chép dist sang giai đoạn chạy",
        "Xoá trình biên dịch và mã TypeScript bằng một dòng RUN ở cuối Dockerfile hiện tại cho gọn",
        "Chuyển sang image nền latest vì các phiên bản mới thường nhẹ hơn"
      ],
      "correct": 1,
      "explanation": "Xoá ở dòng cuối không làm image nhỏ đi: lớp chứa trình biên dịch vẫn nằm đó. Dựng nhiều giai đoạn thì giai đoạn chạy không bao giờ chứa trình biên dịch ngay từ đầu. Thường giảm từ hơn một GB xuống vài trăm MB."
    },
    "summary": {
      "keyIdea": "Image chạy chỉ nên chứa đúng thứ cần để chạy, không hơn.",
      "formula": "Image tốt = nhiều giai đoạn + nền tối giản đã ghim + USER thường + không bí mật + .dockerignore.",
      "commonMistake": "\"Xoá\" tệp nhạy cảm ở dòng sau và tưởng nó đã biến mất khỏi image.",
      "action": "Chạy docker history trên image của bạn và tìm lớp lớn nhất."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy docker history --no-trunc <image> và đọc từng lớp: lớp nào lớn bất thường, lớp nào chép tệp mà bạn không muốn đi theo image? Rồi thêm USER vào Dockerfile và kiểm lại bằng docker run <image> whoami.",
      "secondary": "Bài sau: dữ liệu và cấu hình - thứ không được nằm trong image."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Image chạy được mới là nửa đường. Nửa còn lại là nó mang theo những gì: một image 1 GB chứa trình biên dịch, shell, và đôi khi cả tệp .env, là một image vừa chậm vừa nguy hiểm."
      },
      {
        "type": "code",
        "language": "text",
        "caption": "Dựng hai giai đoạn: công cụ ở lại, thành phẩm đi tiếp",
        "code": "# Giai đoạn 1: đủ công cụ để biên dịch\nFROM node:22.9-slim AS dung\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build && npm prune --omit=dev\n\n# Giai đoạn 2: chỉ thứ cần để chạy\nFROM node:22.9-slim\nWORKDIR /app\nCOPY --from=dung /app/node_modules ./node_modules\nCOPY --from=dung /app/dist ./dist\nUSER node\nCMD [\"node\", \"dist/server.js\"]"
      },
      {
        "type": "heading",
        "text": "Năm thói quen"
      },
      {
        "type": "list",
        "items": [
          "Nhiều giai đoạn: giai đoạn chạy bắt đầu lại từ nền sạch và chỉ COPY --from thành phẩm.",
          "Ghim phiên bản image nền; cập nhật có chủ đích thay vì để latest tự đổi.",
          "USER: chạy bằng người dùng thường. Nhiều image nền đã có sẵn một người dùng như node.",
          "Không bí mật trong lớp nào: dùng bí mật khi dựng được gắn tạm, và biến môi trường lúc chạy.",
          ".dockerignore chặn .env, .git và thư mục khoá ngay từ ngữ cảnh dựng."
        ]
      },
      {
        "type": "callout",
        "label": "Quét lỗ hổng",
        "text": "Công cụ quét image đối chiếu các gói trong image với cơ sở dữ liệu lỗ hổng đã công bố. Chạy nó trong CI (chặng sau) để một gói có lỗ hổng nghiêm trọng chặn việc phát hành, thay vì được phát hiện sau khi đã chạy trên máy chủ nhiều tháng."
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Rà một Dockerfile tìm năm lỗi thường gặp",
        "task": "Viết kiemTra(dockerfile, dockerignore) trả về danh sách cảnh báo theo thứ tự: \"latest\" (FROM dùng thẻ latest hoặc không ghi thẻ), \"bí mật trong ENV\" (dòng ENV có tên chứa KEY, SECRET, TOKEN hoặc PASSWORD), \"chạy bằng root\" (không có dòng USER nào sau dòng FROM cuối cùng), \"COPY . . thiếu .dockerignore cho .env\", \"CMD dạng chuỗi\". Mã hiện chỉ kiểm được thẻ latest, và kiểm sai cả nó.",
        "starter": "const dfXau = `FROM node\nWORKDIR /app\nCOPY . .\nENV API_KEY=sk_live_123\nRUN npm ci\nCMD node server.js`;\nconst dfTot = `FROM node:22.9-slim AS dung\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\nFROM node:22.9-slim\nCOPY --from=dung /app/dist ./dist\nENV NODE_ENV=production\nUSER node\nCMD [\"node\", \"dist/server.js\"]`;\n\nfunction kiemTra(df, ignore) {\n  const canh = [];\n  if (df.includes(\":latest\")) canh.push(\"latest\");\n  return canh;\n}\n\nconsole.log(\"xấu: \" + (kiemTra(dfXau, [\"node_modules\"]).join(\" | \") || \"không có cảnh báo\"));\nconsole.log(\"tốt: \" + (kiemTra(dfTot, [\"node_modules\", \".env\", \".git\"]).join(\" | \") || \"không có cảnh báo\"));",
        "solution": "const dfXau = `FROM node\nWORKDIR /app\nCOPY . .\nENV API_KEY=sk_live_123\nRUN npm ci\nCMD node server.js`;\nconst dfTot = `FROM node:22.9-slim AS dung\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\nFROM node:22.9-slim\nCOPY --from=dung /app/dist ./dist\nENV NODE_ENV=production\nUSER node\nCMD [\"node\", \"dist/server.js\"]`;\n\nfunction kiemTra(df, ignore) {\n  const dong = df.split(\"\\n\").map((d) => d.trim());\n  const canh = [];\n  const from = dong.filter((d) => d.startsWith(\"FROM \"));\n  if (from.some((d) => { const img = d.split(/\\s+/)[1]; return !img.includes(\":\") || img.endsWith(\":latest\"); })) canh.push(\"latest\");\n  if (dong.some((d) => d.startsWith(\"ENV \") && /KEY|SECRET|TOKEN|PASSWORD/.test(d.split(\"=\")[0]))) canh.push(\"bí mật trong ENV\");\n  const cuoiFrom = dong.map((d) => d.startsWith(\"FROM \")).lastIndexOf(true);\n  if (!dong.slice(cuoiFrom).some((d) => d.startsWith(\"USER \"))) canh.push(\"chạy bằng root\");\n  if (dong.includes(\"COPY . .\") && !ignore.includes(\".env\")) canh.push(\"COPY . . thiếu .dockerignore cho .env\");\n  if (dong.some((d) => d.startsWith(\"CMD \") && !d.slice(4).trim().startsWith(\"[\"))) canh.push(\"CMD dạng chuỗi\");\n  return canh;\n}\n\nconsole.log(\"xấu: \" + (kiemTra(dfXau, [\"node_modules\"]).join(\" | \") || \"không có cảnh báo\"));\nconsole.log(\"tốt: \" + (kiemTra(dfTot, [\"node_modules\", \".env\", \".git\"]).join(\" | \") || \"không có cảnh báo\"));",
        "hints": [
          "\"FROM node\" không ghi thẻ nào cũng là latest: tách tên image và kiểm có dấu hai chấm không.",
          "USER chỉ tính nếu nằm sau dòng FROM CUỐI: USER ở giai đoạn dựng không theo sang giai đoạn chạy."
        ],
        "expectedOutput": "xấu: latest | bí mật trong ENV | chạy bằng root | COPY . . thiếu .dockerignore cho .env | CMD dạng chuỗi\ntốt: không có cảnh báo"
      },
      {
        "type": "closing",
        "lines": [
          "Nhỏ hơn, ít quyền hơn, không bí mật: ba đặc tính này rẻ để có từ đầu và đắt để thêm sau.",
          "Bài sau đưa dữ liệu và cấu hình ra khỏi image."
        ]
      }
    ]
  },
  {
    "id": 1923,
    "slug": "volume-bien-moi-truong-va-container-phu-du",
    "title": "Docker, Bài 4: Volume, biến môi trường và container phù du",
    "subtitle": "Container nên dùng xong là vứt được - nên dữ liệu và cấu hình phải sống ở chỗ khác.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "emoji": "💾",
    "track": "professional",
    "whyItMatters": "Sức mạnh của container là thay thế được bất cứ lúc nào: nâng phiên bản, dời sang máy khác, chạy thêm bản sao. Điều đó chỉ đúng khi container không giữ thứ gì không thể mất. Người mới thường mất dữ liệu lần đầu tiên chạy cơ sở dữ liệu trong container, chính vì chưa phân biệt được lớp ghi tạm với volume.",
    "openingQuestion": "Bạn chạy Postgres trong container không gắn volume, nhập dữ liệu, rồi nâng image lên phiên bản mới bằng cách xoá container cũ và chạy container mới. Dữ liệu ở đâu?",
    "openingOptions": [
      "Đã chuyển sang container mới, vì Docker tự chép dữ liệu khi cùng tên",
      "Vẫn còn trong image cũ, và có thể khôi phục bằng lệnh docker commit",
      "Đã mất, vì nó nằm trong lớp ghi của container cũ vừa bị xoá",
      "Nằm trong thư mục tạm của máy chủ và tự xoá sau hai mươi bốn giờ"
    ],
    "correctOption": 2,
    "explanation": "Không có volume, Postgres ghi vào lớp ghi của container. Xoá container là xoá lớp đó cùng toàn bộ dữ liệu. Volume là vùng lưu trữ nằm ngoài vòng đời container, được gắn vào một đường dẫn bên trong. Gắn volume vào thư mục dữ liệu của Postgres thì container mới gắn cùng volume sẽ thấy nguyên dữ liệu cũ.",
    "diagram": [
      {
        "label": "Image: mã và thư viện, giống nhau ở mọi môi trường",
        "arrow": true
      },
      {
        "label": "Biến môi trường: cấu hình và bí mật của từng môi trường",
        "arrow": true
      },
      {
        "label": "Volume: dữ liệu sống qua mọi lần thay container",
        "arrow": true
      },
      {
        "label": "Container: thay được bất cứ lúc nào"
      }
    ],
    "realWorldExample": {
      "company": "Môi trường thử nghiệm của một nhóm nhỏ (tình huống minh hoạ)",
      "description": "Máy chủ thử nghiệm chạy cơ sở dữ liệu trong container suốt ba tháng, không ai để ý là không có volume. Một lần dọn dẹp bằng docker system prune xoá các container đã dừng, trong đó có container cơ sở dữ liệu vừa được khởi động lại. Ba tháng dữ liệu kiểm thử biến mất."
    },
    "quiz": [
      {
        "question": "Named volume và bind mount khác nhau ở điểm nào?",
        "options": [
          "Named volume do Docker quản lý vị trí; bind mount gắn một thư mục cụ thể của máy chủ",
          "Named volume chỉ đọc được, còn bind mount cho phép cả đọc lẫn ghi dữ liệu",
          "Bind mount chỉ dùng được trên Linux, còn named volume dùng được ở mọi nơi",
          "Named volume mất theo khi container bị xoá, còn bind mount thì vẫn được giữ lại trên máy chủ"
        ],
        "correct": 0,
        "explanation": "Named volume (-v du_lieu:/var/lib/postgresql/data) để Docker lo nơi lưu, hợp cho dữ liệu của dịch vụ. Bind mount (-v ./src:/app/src) gắn đúng thư mục bạn chỉ định, hợp cho lúc phát triển: sửa mã trên máy, container thấy ngay. Cả hai đều sống qua lần xoá container."
      },
      {
        "question": "Vì sao một image nên dùng cho mọi môi trường, còn khác biệt đi qua biến môi trường?",
        "options": [
          "Vì biến môi trường được mã hoá nên an toàn hơn so với ghi vào image",
          "Vì bản đã kiểm thử ở môi trường thử chính là bản chạy ở môi trường thật",
          "Vì Docker giới hạn mỗi dự án chỉ được lưu một image trên kho",
          "Vì dựng image riêng cho từng môi trường làm lãng phí dung lượng ổ đĩa"
        ],
        "correct": 1,
        "explanation": "Dựng lại image cho môi trường thật nghĩa là thứ lên production chưa từng được kiểm thử - có thể khác thư viện, khác bản vá. Một image, nhiều bộ cấu hình, thì thứ bạn đã thử đúng là thứ bạn chạy. Đây là cùng nguyên tắc ở bài cấu hình và bí mật của chặng triển khai."
      },
      {
        "question": "Ứng dụng trong container ghi nhật ký ra tệp /app/app.log. Có vấn đề gì?",
        "options": [
          "Không có vấn đề gì nếu tệp nhật ký được xoay vòng mỗi ngày bằng một công cụ chạy định kỳ",
          "Container không được phép ghi tệp vào thư mục của chính ứng dụng",
          "Nhật ký làm lớp ghi phình to và mất khi thay container; nên ghi ra đầu ra chuẩn",
          "Tệp nhật ký sẽ bị chép vào image ở lần dựng tiếp theo của Dockerfile"
        ],
        "correct": 2,
        "explanation": "Quy ước của container là ghi nhật ký ra stdout và stderr. Docker hay nền tảng điều phối thu gom đầu ra đó, xoay vòng và chuyển tới hệ thống nhật ký. Ghi ra tệp bên trong thì docker logs không thấy, lớp ghi phình dần, và nhật ký biến mất đúng lúc cần xem - khi container vừa chết và bị thay."
      },
      {
        "question": "Chạy lúc phát triển với bind mount -v .:/app, thư mục node_modules trên máy chủ lại ghi đè node_modules đã cài trong image. Cách khắc phục phổ biến?",
        "options": [
          "Xoá node_modules trên máy chủ rồi cài lại toàn bộ bằng quyền quản trị cao nhất",
          "Bỏ hẳn bind mount và dựng lại image sau mỗi lần sửa một dòng mã",
          "Chuyển toàn bộ dự án sang dùng một trình quản lý gói khác",
          "Gắn thêm một volume riêng vào /app/node_modules để che thư mục của máy chủ"
        ],
        "correct": 3,
        "explanation": "Bind mount che toàn bộ /app bằng thư mục của máy chủ, kể cả node_modules. Nếu máy bạn là Mac còn container là Linux, thư viện có phần biên dịch sẽ không chạy. Gắn một volume vô danh vào /app/node_modules thì đường dẫn đó dùng bản trong container, còn phần còn lại vẫn là mã trên máy bạn."
      },
      {
        "question": "Thế nào là container \"phù du\" (ephemeral) đúng nghĩa?",
        "options": [
          "Container chỉ chạy tối đa vài phút rồi tự động dừng lại",
          "Xoá đi thay bằng bản mới bất cứ lúc nào mà không mất gì quan trọng",
          "Container không có kết nối mạng ra bên ngoài máy chủ đang chạy nó",
          "Container được tạo lại từ đầu mỗi khi có một yêu cầu mới đến"
        ],
        "correct": 1,
        "explanation": "Phù du là về thứ container giữ, không phải thời gian nó chạy. Một container chạy nhiều tháng vẫn là phù du nếu mọi thứ đáng giữ nằm ngoài nó: dữ liệu trong volume hoặc dịch vụ quản lý, cấu hình trong biến môi trường, nhật ký ở đầu ra chuẩn. Đó là điều kiện để nâng cấp, dời máy và chạy thêm bản sao trở thành việc bình thường."
      }
    ],
    "keyTakeaways": [
      "Lớp ghi mất theo container; dữ liệu phải ở volume.",
      "Named volume cho dữ liệu dịch vụ, bind mount cho mã lúc phát triển.",
      "Một image, nhiều bộ cấu hình qua biến môi trường.",
      "Nhật ký ra stdout và stderr, không ra tệp bên trong.",
      "Phù du nghĩa là xoá được bất cứ lúc nào mà không mất gì."
    ],
    "practicePrompt": {
      "question": "Ứng dụng lưu ảnh người dùng tải lên vào /app/uploads trong container. Bạn sắp chạy ba bản sao sau bộ cân bằng tải. Rủi ro là gì?",
      "options": [
        "Ảnh nằm ở container nào nhận yêu cầu tải lên, hai bản kia không thấy, và mất khi thay",
        "Ba bản sao sẽ cùng ghi một ảnh ba lần làm tốn gấp ba dung lượng ổ đĩa",
        "Bộ cân bằng tải không chuyển được những yêu cầu có tệp đính kèm lớn tới đúng container phía sau",
        "Không có rủi ro nào nếu cả ba container dùng chung cùng một image"
      ],
      "correct": 0,
      "explanation": "Lớp ghi là riêng của từng container. Ảnh tải lên bản sao A thì yêu cầu xem ảnh rơi vào B sẽ báo không tìm thấy, và mọi ảnh biến mất ở lần triển khai kế tiếp. Tệp người dùng thuộc về một kho lưu trữ đối tượng dùng chung, hoặc ít nhất một volume dùng chung."
    },
    "summary": {
      "keyIdea": "Tách ba thứ: mã trong image, cấu hình trong biến môi trường, dữ liệu trong volume.",
      "formula": "Container phù du = image bất biến + cấu hình từ ngoài + dữ liệu ngoài vòng đời container.",
      "commonMistake": "Chạy cơ sở dữ liệu trong container mà không gắn volume vào thư mục dữ liệu.",
      "action": "Liệt kê mọi đường dẫn mà ứng dụng của bạn ghi vào, và kiểm từng đường dẫn nằm ở đâu."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy docker inspect <container> --format '{{json .Mounts}}' cho từng container đang chạy dữ liệu. Container nào có cơ sở dữ liệu mà danh sách Mounts rỗng là container đang giữ dữ liệu trong lớp ghi tạm.",
      "secondary": "Bài sau: chạy nhiều dịch vụ cùng nhau bằng Compose."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Container được thiết kế để thay được. Đó vừa là điểm mạnh vừa là cái bẫy: thứ gì bạn để trong container thì cũng bị thay theo nó."
      },
      {
        "type": "conceptTable",
        "title": "Ba chỗ để đặt mọi thứ",
        "concepts": [
          {
            "vi": "Image",
            "en": "Image",
            "def": "Mã, thư viện, tệp tĩnh. Giống nhau ở mọi môi trường, dựng một lần."
          },
          {
            "vi": "Biến môi trường",
            "en": "Environment",
            "def": "Cấu hình và bí mật của từng môi trường, đưa vào lúc chạy."
          },
          {
            "vi": "Volume",
            "en": "Volume",
            "def": "Dữ liệu phải sống qua lần xoá container: cơ sở dữ liệu, tệp tải lên."
          },
          {
            "vi": "Đầu ra chuẩn",
            "en": "stdout / stderr",
            "def": "Nhật ký. Nền tảng thu gom, không ghi ra tệp bên trong."
          }
        ]
      },
      {
        "type": "code",
        "language": "bash",
        "caption": "Volume và biến môi trường khi chạy",
        "code": "$ docker volume create du_lieu_pg\n$ docker run -d --name pg \\\n    -e POSTGRES_PASSWORD=\"$PG_MAT_KHAU\" \\\n    -v du_lieu_pg:/var/lib/postgresql/data \\\n    postgres:16.4\n$ docker rm -f pg                       # xoá container\n$ docker run -d --name pg -e POSTGRES_PASSWORD=\"$PG_MAT_KHAU\" \\\n    -v du_lieu_pg:/var/lib/postgresql/data postgres:16.4   # dữ liệu vẫn còn\n\n# Lúc phát triển: bind mount mã nguồn, che node_modules bằng volume riêng\n$ docker run -v \"$PWD\":/app -v /app/node_modules -p 3000:3000 app-dev"
      },
      {
        "type": "callout",
        "label": "Lệnh dọn dẹp nguy hiểm nhất",
        "text": "docker system prune xoá container đã dừng, mạng không dùng và image treo; thêm --volumes thì xoá cả volume không gắn vào container nào đang chạy. Nếu cơ sở dữ liệu của bạn đang dừng đúng lúc đó, volume của nó bị coi là không dùng."
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Dữ liệu nào sống qua một lần thay container",
        "task": "Mô phỏng: container có lớp ghi riêng (một Map), volume gắn vào các đường dẫn. ghi(c, duong, noiDung) phải ghi vào volume nếu duong nằm dưới một điểm gắn, ngược lại vào lớp ghi. thayContainer tạo container mới cùng điểm gắn (lớp ghi mới rỗng). Sửa hàm ghi và hàm doc, rồi thêm điểm gắn cần thiết vào cauHinh để cơ sở dữ liệu và ảnh tải lên sống sót, còn tệp tạm thì không cần.",
        "starter": "const volume = { du_lieu_pg: new Map(), anh: new Map() };\nconst cauHinh = { gan: { \"/var/lib/postgresql/data\": \"du_lieu_pg\" } };\n\nconst taoContainer = () => ({ lopGhi: new Map(), gan: cauHinh.gan });\nfunction ghi(c, duong, nd) { c.lopGhi.set(duong, nd); }\nfunction doc(c, duong) { return c.lopGhi.get(duong) ?? \"(mất)\"; }\n\nlet c = taoContainer();\nghi(c, \"/var/lib/postgresql/data/bang_don\", \"120 đơn\");\nghi(c, \"/app/uploads/anh1.png\", \"ảnh\");\nghi(c, \"/tmp/cache\", \"tạm\");\nc = taoContainer();\nfor (const d of [\"/var/lib/postgresql/data/bang_don\", \"/app/uploads/anh1.png\", \"/tmp/cache\"]) console.log(d + \": \" + doc(c, d));",
        "solution": "const volume = { du_lieu_pg: new Map(), anh: new Map() };\nconst cauHinh = { gan: { \"/var/lib/postgresql/data\": \"du_lieu_pg\", \"/app/uploads\": \"anh\" } };\n\nconst taoContainer = () => ({ lopGhi: new Map(), gan: cauHinh.gan });\nconst noiLuu = (c, duong) => {\n  const diem = Object.keys(c.gan).find((g) => duong === g || duong.startsWith(g + \"/\"));\n  return diem ? volume[c.gan[diem]] : c.lopGhi;\n};\nfunction ghi(c, duong, nd) { noiLuu(c, duong).set(duong, nd); }\nfunction doc(c, duong) { return noiLuu(c, duong).get(duong) ?? \"(mất)\"; }\n\nlet c = taoContainer();\nghi(c, \"/var/lib/postgresql/data/bang_don\", \"120 đơn\");\nghi(c, \"/app/uploads/anh1.png\", \"ảnh\");\nghi(c, \"/tmp/cache\", \"tạm\");\nc = taoContainer();\nfor (const d of [\"/var/lib/postgresql/data/bang_don\", \"/app/uploads/anh1.png\", \"/tmp/cache\"]) console.log(d + \": \" + doc(c, d));",
        "hints": [
          "Tìm điểm gắn mà đường dẫn nằm dưới nó (bằng đúng điểm gắn, hoặc bắt đầu bằng điểm gắn cộng dấu /); có thì dùng volume, không thì dùng lớp ghi.",
          "Ảnh tải lên cần một điểm gắn cho /app/uploads."
        ],
        "expectedOutput": "/var/lib/postgresql/data/bang_don: 120 đơn\n/app/uploads/anh1.png: ảnh\n/tmp/cache: (mất)"
      },
      {
        "type": "closing",
        "lines": [
          "Image cho mã, biến môi trường cho cấu hình, volume cho dữ liệu, đầu ra chuẩn cho nhật ký.",
          "Bài sau ghép nhiều container thành một hệ thống bằng Compose."
        ]
      }
    ]
  },
  {
    "id": 1924,
    "slug": "nhieu-dich-vu-voi-compose",
    "title": "Docker, Bài 5: Nhiều dịch vụ với Compose",
    "subtitle": "Ứng dụng, cơ sở dữ liệu, bộ đệm: một tệp mô tả, một lệnh dựng cả hệ thống.",
    "duration": "12 phút",
    "difficulty": "Trung bình",
    "emoji": "🧩",
    "track": "professional",
    "whyItMatters": "Ứng dụng thật hiếm khi là một container: có cơ sở dữ liệu, bộ đệm, hàng đợi, tiến trình chạy nền. Compose mô tả cả hệ thống trong một tệp để ai cũng dựng được bằng một lệnh. Hai lỗi kinh điển của người mới - kết nối tới localhost và ứng dụng khởi động trước cơ sở dữ liệu - đều đến từ việc chưa hiểu mạng và thứ tự khởi động của nó.",
    "openingQuestion": "Trong Compose, container app kết nối cơ sở dữ liệu bằng chuỗi postgres://localhost:5432. Chuyện gì xảy ra?",
    "openingOptions": [
      "Kết nối thành công, vì mọi container trong Compose đều chung địa chỉ localhost",
      "Kết nối thành công nếu cổng 5432 đã được mở ra máy chủ bằng mục ports",
      "Báo lỗi xác thực, vì localhost không được phép đăng nhập vào Postgres",
      "Kết nối bị từ chối, vì localhost trong container app là chính container app"
    ],
    "correctOption": 3,
    "explanation": "Mỗi container có không gian mạng riêng, nên localhost bên trong app là chính app - nơi không có Postgres nào đang nghe. Compose tạo một mạng chung và cho mỗi dịch vụ một tên DNS bằng đúng tên dịch vụ: app kết nối tới postgres://db:5432. Mục ports chỉ mở cổng ra máy chủ cho bạn truy cập từ bên ngoài; giữa các container thì không cần.",
    "diagram": [
      {
        "label": "compose.yaml mô tả các dịch vụ",
        "arrow": true
      },
      {
        "label": "Compose tạo một mạng chung",
        "arrow": true
      },
      {
        "label": "Mỗi dịch vụ gọi nhau bằng tên dịch vụ",
        "arrow": true
      },
      {
        "label": "depends_on và healthcheck quyết định thứ tự sẵn sàng"
      }
    ],
    "realWorldExample": {
      "company": "Kho mã của một dự án mã nguồn mở (tình huống minh hoạ)",
      "description": "Hướng dẫn đóng góp từng dài ba trang: cài Postgres, cài Redis, tạo người dùng, chạy migration. Sau khi thêm compose.yaml, hướng dẫn còn hai dòng: docker compose up, rồi mở trình duyệt. Số người đóng góp lần đầu bỏ cuộc giữa chừng giảm hẳn."
    },
    "quiz": [
      {
        "question": "depends_on: [db] đảm bảo điều gì?",
        "options": [
          "Container db được khởi động trước, nhưng không đảm bảo Postgres đã sẵn sàng nhận kết nối",
          "Ứng dụng chỉ được khởi động sau khi cơ sở dữ liệu đã chạy xong toàn bộ các migration đang chờ",
          "Nếu db dừng thì Compose tự dừng luôn ứng dụng để tránh lỗi dây chuyền",
          "Ứng dụng và cơ sở dữ liệu luôn được đặt trên cùng một máy chủ vật lý"
        ],
        "correct": 0,
        "explanation": "Container đã chạy khác với dịch vụ đã sẵn sàng: Postgres cần vài giây để khởi tạo trước khi nhận kết nối. depends_on dạng ngắn chỉ chờ container được khởi động. Muốn chờ sẵn sàng thì cần healthcheck cho db và depends_on với condition: service_healthy."
      },
      {
        "question": "Mục ports: [\"5432:5432\"] trên dịch vụ db để làm gì?",
        "options": [
          "Để container app trong cùng Compose kết nối được tới cơ sở dữ liệu",
          "Để máy chủ và mọi thứ ngoài mạng Compose truy cập được cổng đó",
          "Để Postgres biết phải lắng nghe trên cổng nào bên trong container",
          "Để giới hạn chỉ cho phép đúng một kết nối cùng lúc tới cơ sở dữ liệu"
        ],
        "correct": 1,
        "explanation": "Giữa các container cùng mạng Compose, app gọi db:5432 mà không cần ports. ports mở cổng ra máy chủ - tiện khi bạn muốn dùng công cụ quản trị trên máy mình, nhưng trên máy chủ thật nó có thể mở cơ sở dữ liệu ra Internet. Chỉ mở những cổng cần truy cập từ ngoài."
      },
      {
        "question": "Ứng dụng khởi động lúc db chưa sẵn sàng và thoát với lỗi kết nối. Ngoài healthcheck, ứng dụng nên tự làm gì?",
        "options": [
          "Không làm gì, vì việc chờ đợi hoàn toàn là trách nhiệm của Compose",
          "Tăng thời gian chờ kết nối lên vài phút cho mỗi lần thử duy nhất",
          "Thử kết nối lại có lùi dần trong một khoảng, rồi mới báo lỗi và thoát",
          "Khởi động mà không cần cơ sở dữ liệu và bỏ qua mọi lỗi kết nối"
        ],
        "correct": 2,
        "explanation": "Trên máy chủ thật, cơ sở dữ liệu có thể khởi động lại bất cứ lúc nào, không chỉ lúc đầu. Ứng dụng tự thử lại có lùi dần (bài giới hạn tần suất ở chặng API) thì chịu được cả hai trường hợp. healthcheck giúp lúc khởi động, thử lại giúp suốt đời chạy."
      },
      {
        "question": "Vì sao không nên ghi mật khẩu cơ sở dữ liệu trực tiếp trong compose.yaml được commit?",
        "options": [
          "Vì Compose không đọc được giá trị có ký tự đặc biệt trong tệp yaml",
          "Vì mật khẩu trong yaml làm các container khởi động chậm hơn đáng kể",
          "Vì Compose chỉ nhận mật khẩu từ một tệp riêng có tên là password.txt",
          "Vì tệp đó nằm trong lịch sử Git, ai có quyền đọc kho mã cũng thấy"
        ],
        "correct": 3,
        "explanation": "Compose đọc biến từ tệp .env cạnh compose.yaml, nên viết POSTGRES_PASSWORD: ${PG_MAT_KHAU} và để .env ngoài Git. Mật khẩu đã commit thì xoá ở commit sau vẫn còn trong lịch sử - phải đổi mật khẩu, không chỉ xoá dòng."
      },
      {
        "question": "Compose hợp với việc gì nhất?",
        "options": [
          "Môi trường phát triển và máy chủ đơn lẻ; nhiều máy thì cần công cụ điều phối",
          "Chạy hệ thống trên hàng trăm máy chủ cùng lúc, với tự động mở rộng số bản sao theo tải",
          "Thay thế hoàn toàn cho CI trong việc chạy kiểm thử tự động",
          "Chỉ dùng cho ứng dụng không có cơ sở dữ liệu hay trạng thái nào"
        ],
        "correct": 0,
        "explanation": "Compose mô tả nhiều container trên một máy rất gọn. Khi cần nhiều máy, tự thay container chết, triển khai dần và mở rộng theo tải, đó là việc của nền tảng điều phối. Nhiều nhóm dùng Compose cho máy phát triển và CI, và một nền tảng khác cho production."
      }
    ],
    "keyTakeaways": [
      "Mỗi dịch vụ gọi nhau bằng tên dịch vụ trên mạng chung; localhost là chính container đó.",
      "ports mở ra máy chủ; giữa các container không cần.",
      "depends_on chỉ chờ khởi động; chờ sẵn sàng cần healthcheck và service_healthy.",
      "Ứng dụng vẫn nên tự thử lại kết nối có lùi dần.",
      "Bí mật qua biến từ .env, không ghi thẳng vào compose.yaml."
    ],
    "practicePrompt": {
      "question": "docker compose up chạy tốt trên máy bạn nhưng trên máy đồng nghiệp app báo \"connection refused\" ngay lần đầu, chạy lại thì được. Nguyên nhân khả dĩ nhất?",
      "options": [
        "Máy đồng nghiệp thiếu bộ nhớ nên Compose từ chối khởi động cơ sở dữ liệu",
        "App khởi động trước khi db sẵn sàng; máy bạn nhanh nên tình cờ kịp",
        "Hai phiên bản Compose khác nhau đọc cùng tệp yaml theo hai cách khác nhau",
        "Tường lửa trên máy đồng nghiệp chặn kết nối nội bộ giữa các container"
      ],
      "correct": 1,
      "explanation": "Lỗi chỉ ở lần đầu và biến mất khi chạy lại là dấu hiệu tranh chấp về thời gian: lần hai db đã khởi tạo xong. Máy nhanh che lỗi này đi. Sửa bằng healthcheck cho db, depends_on với service_healthy, và thử lại có lùi dần trong ứng dụng."
    },
    "summary": {
      "keyIdea": "Compose biến \"cài năm thứ theo hướng dẫn ba trang\" thành một tệp và một lệnh.",
      "formula": "Gọi nhau bằng tên dịch vụ + healthcheck + depends_on service_healthy + bí mật từ .env.",
      "commonMistake": "Kết nối tới localhost giữa hai container, hoặc tin depends_on nghĩa là đã sẵn sàng.",
      "action": "Viết compose.yaml cho dự án của bạn và thử dựng nó trên một máy sạch."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy docker compose down -v rồi docker compose up trên dự án của bạn - dựng từ số không, như một người mới. Nếu cần bất kỳ bước tay nào ngoài hai lệnh đó, ghi nó vào compose.yaml hoặc vào tập lệnh khởi tạo.",
      "secondary": "Bài sau: dự án đóng gói trọn một ứng dụng."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một container là một dịch vụ. Ứng dụng thật thì cần vài dịch vụ nói chuyện với nhau, khởi động đúng thứ tự, và dựng lại được trên máy bất kỳ."
      },
      {
        "type": "code",
        "language": "text",
        "caption": "compose.yaml cho ứng dụng, cơ sở dữ liệu và bộ đệm",
        "code": "services:\n  app:\n    build: .\n    ports: [\"3000:3000\"]\n    environment:\n      DATABASE_URL: postgres://app:${PG_MAT_KHAU}@db:5432/app   # \"db\", không phải localhost\n      REDIS_URL: redis://cache:6379\n    depends_on:\n      db: { condition: service_healthy }\n      cache: { condition: service_started }\n  db:\n    image: postgres:16.4\n    environment:\n      POSTGRES_USER: app\n      POSTGRES_PASSWORD: ${PG_MAT_KHAU}                          # đọc từ tệp .env\n    volumes: [\"du_lieu_pg:/var/lib/postgresql/data\"]\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U app\"]\n      interval: 2s\n      retries: 15\n  cache:\n    image: redis:7.4\nvolumes:\n  du_lieu_pg:"
      },
      {
        "type": "heading",
        "text": "Mạng và tên"
      },
      {
        "type": "paragraph",
        "text": "Compose tạo một mạng riêng cho dự án và đăng ký mỗi dịch vụ bằng tên của nó. Trong app, db là một tên miền trỏ tới container cơ sở dữ liệu. Vì vậy chuỗi kết nối viết db:5432, và nó đúng trên mọi máy - không phụ thuộc địa chỉ IP nào."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đã khởi động",
          "text": "Container đã được tạo và tiến trình đã bắt đầu. Đây là thứ depends_on dạng ngắn chờ."
        },
        "right": {
          "label": "Đã sẵn sàng",
          "text": "Dịch vụ nhận và xử lý được yêu cầu. Cần healthcheck để biết, và condition: service_healthy để chờ."
        }
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Thứ tự khởi động và thời điểm sẵn sàng",
        "task": "Mỗi dịch vụ có thời gian khởi động (giây), phụ thuộc, và kiểu chờ: \"khoi_dong\" (chỉ chờ dịch vụ kia bắt đầu) hoặc \"san_sang\" (chờ nó khởi động xong). Viết tinh(dv) trả về mốc bắt đầu và mốc sẵn sàng của từng dịch vụ. Rồi đổi kiểu chờ trong cauHinh để app không bao giờ bắt đầu trước khi db sẵn sàng. Mã hiện cho mọi dịch vụ bắt đầu ở giây 0.",
        "starter": "const cauHinh = {\n  db: { khoiDong: 6, phuThuoc: {} },\n  cache: { khoiDong: 1, phuThuoc: {} },\n  migrate: { khoiDong: 2, phuThuoc: { db: \"khoi_dong\" } },\n  app: { khoiDong: 2, phuThuoc: { db: \"khoi_dong\", cache: \"khoi_dong\", migrate: \"san_sang\" } },\n};\n\nfunction tinh(dv) {\n  const kq = {};\n  for (const ten of Object.keys(dv)) kq[ten] = { batDau: 0, sanSang: dv[ten].khoiDong };\n  return kq;\n}\n\nconst kq = tinh(cauHinh);\nfor (const [ten, t] of Object.entries(kq)) console.log(ten + \": bắt đầu \" + t.batDau + \"s, sẵn sàng \" + t.sanSang + \"s\");\nconsole.log(\"app bắt đầu trước khi db sẵn sàng: \" + (kq.app.batDau < kq.db.sanSang));\nconsole.log(\"migrate bắt đầu trước khi db sẵn sàng: \" + (kq.migrate.batDau < kq.db.sanSang));",
        "solution": "const cauHinh = {\n  db: { khoiDong: 6, phuThuoc: {} },\n  cache: { khoiDong: 1, phuThuoc: {} },\n  migrate: { khoiDong: 2, phuThuoc: { db: \"san_sang\" } },\n  app: { khoiDong: 2, phuThuoc: { db: \"san_sang\", cache: \"khoi_dong\", migrate: \"san_sang\" } },\n};\n\nfunction tinh(dv) {\n  const kq = {};\n  const giai = (ten) => {\n    if (kq[ten]) return kq[ten];\n    let batDau = 0;\n    for (const [pt, kieu] of Object.entries(dv[ten].phuThuoc)) {\n      const t = giai(pt);\n      batDau = Math.max(batDau, kieu === \"san_sang\" ? t.sanSang : t.batDau);\n    }\n    return (kq[ten] = { batDau, sanSang: batDau + dv[ten].khoiDong });\n  };\n  for (const ten of Object.keys(dv)) giai(ten);\n  return kq;\n}\n\nconst kq = tinh(cauHinh);\nfor (const [ten, t] of Object.entries(kq)) console.log(ten + \": bắt đầu \" + t.batDau + \"s, sẵn sàng \" + t.sanSang + \"s\");\nconsole.log(\"app bắt đầu trước khi db sẵn sàng: \" + (kq.app.batDau < kq.db.sanSang));\nconsole.log(\"migrate bắt đầu trước khi db sẵn sàng: \" + (kq.migrate.batDau < kq.db.sanSang));",
        "hints": [
          "Mốc bắt đầu của một dịch vụ = lớn nhất trong các mốc nó phải chờ: mốc bắt đầu (chờ khởi động) hoặc mốc sẵn sàng (chờ sẵn sàng) của từng phụ thuộc. Tính đệ quy.",
          "migrate chạy lệnh vào db nên cũng phải chờ db sẵn sàng, không chỉ app."
        ],
        "expectedOutput": "db: bắt đầu 0s, sẵn sàng 6s\ncache: bắt đầu 0s, sẵn sàng 1s\nmigrate: bắt đầu 6s, sẵn sàng 8s\napp: bắt đầu 8s, sẵn sàng 10s\napp bắt đầu trước khi db sẵn sàng: false\nmigrate bắt đầu trước khi db sẵn sàng: false"
      },
      {
        "type": "closing",
        "lines": [
          "Gọi nhau bằng tên dịch vụ, chờ sẵn sàng chứ không chỉ chờ khởi động.",
          "Bài sau gom cả chặng vào một dự án."
        ]
      }
    ]
  },
  {
    "id": 1925,
    "slug": "du-an-dong-goi-mot-ung-dung",
    "title": "Docker, Bài 6: Dự án - đóng gói trọn một ứng dụng",
    "subtitle": "Từ \"chạy trên máy tôi\" tới một image nhỏ, an toàn, dựng lại trong vài giây.",
    "duration": "15 phút",
    "difficulty": "Khó",
    "emoji": "🚢",
    "track": "professional",
    "whyItMatters": "Từng kỹ thuật trong chặng này dễ hiểu riêng lẻ; khó là giữ tất cả cùng lúc trong một dự án thật. Bài này đi trọn một vòng: Dockerfile nhiều giai đoạn, .dockerignore, volume, Compose, và một danh sách kiểm trước khi đẩy image lên kho - thứ bạn sẽ dùng lại ở chặng CI/CD ngay sau.",
    "openingQuestion": "Image dựng xong, chạy được trên máy bạn. Việc nào nên làm trước khi đẩy lên kho image?",
    "openingOptions": [
      "Chạy thử image ở trạng thái sạch, không bind mount và không biến môi trường từ máy bạn",
      "Nén image lại bằng một công cụ nén bên ngoài để tải lên nhanh hơn",
      "Gắn thẻ latest để mọi môi trường tự động kéo về và dùng đúng bản mới nhất vừa dựng xong",
      "Chạy docker system prune để dọn bộ nhớ đệm trước khi đẩy image đi"
    ],
    "correctOption": 0,
    "explanation": "Trên máy bạn, bind mount có thể che đi việc image thiếu tệp, và biến môi trường của shell có thể che đi việc image thiếu cấu hình mặc định. Chạy image đúng như máy chủ sẽ chạy - không gắn gì từ máy bạn, chỉ các biến môi trường được khai báo - là cách rẻ nhất để bắt lỗi \"chạy trên máy tôi\" trước khi nó lên production. Thẻ latest làm mất dấu phiên bản, và nén thêm không có tác dụng vì các lớp đã được nén.",
    "diagram": [
      {
        "label": "Dockerfile nhiều giai đoạn và .dockerignore",
        "arrow": true
      },
      {
        "label": "Dựng, rồi chạy thử ở trạng thái sạch",
        "arrow": true
      },
      {
        "label": "Kiểm kích thước, người dùng, bí mật, lỗ hổng",
        "arrow": true
      },
      {
        "label": "Gắn thẻ theo phiên bản và đẩy lên kho"
      }
    ],
    "realWorldExample": {
      "company": "Dịch vụ API nhỏ của một công ty khởi nghiệp (tình huống minh hoạ)",
      "description": "Sau khi đi qua danh sách kiểm trong bài, image giảm từ 1,4 GB xuống 180 MB, thời gian dựng thường ngày từ bốn phút xuống mười lăm giây, và công cụ quét lỗ hổng từ 212 cảnh báo xuống còn 9 - phần lớn nhờ bỏ công cụ dựng và đổi sang image nền tối giản."
    },
    "quiz": [
      {
        "question": "Nên gắn thẻ image thế nào để biết chính xác thứ đang chạy trên máy chủ?",
        "options": [
          "Luôn gắn thẻ latest để các máy chủ tự kéo phiên bản mới nhất",
          "Gắn thẻ theo mã commit Git (và số phiên bản nếu có), không ghi đè thẻ cũ",
          "Gắn thẻ theo ngày dựng, ví dụ 2026-09-29, để dễ sắp xếp theo thời gian",
          "Không cần gắn thẻ, vì kho image tự đánh số cho mỗi lần đẩy lên"
        ],
        "correct": 1,
        "explanation": "Thẻ theo mã commit nối thẳng image với mã nguồn tạo ra nó: thấy lỗi trên máy chủ là biết ngay commit nào. Thẻ ngày có thể trùng khi dựng hai lần một ngày, và latest thì đổi nghĩa sau mỗi lần đẩy. Đây là điều kiện để quay lại phiên bản trước một cách chắc chắn ở chặng CI/CD."
      },
      {
        "question": "Kiểm tra sức khoẻ (HEALTHCHECK) trong Dockerfile nên kiểm cái gì?",
        "options": [
          "Tiến trình ứng dụng có còn đang tồn tại trong danh sách tiến trình của container hay không",
          "Dung lượng ổ đĩa còn trống của máy chủ đang chạy container đó",
          "Ứng dụng trả lời được một yêu cầu thật, như gọi tới đường dẫn kiểm tra sức khoẻ",
          "Số lượng người dùng đang truy cập vào ứng dụng tại thời điểm hiện tại"
        ],
        "correct": 2,
        "explanation": "Tiến trình còn sống không có nghĩa là nó còn phục vụ được: có thể đang treo, hoặc mất kết nối cơ sở dữ liệu. Gọi thẳng tới /health (bài kiểm tra sức khoẻ ở chặng triển khai) mới kiểm đúng thứ người dùng cần."
      },
      {
        "question": "Ứng dụng cần một thư mục tạm để ghi tệp trong lúc xử lý. Image chạy bằng người dùng thường. Cách hợp lý?",
        "options": [
          "Chuyển về chạy bằng root như mặc định để có quyền ghi vào mọi thư mục mà ứng dụng cần tới",
          "Đặt quyền 777 cho toàn bộ thư mục /app để ai cũng ghi được",
          "Tắt tính năng ghi tệp tạm và giữ mọi thứ trong bộ nhớ của ứng dụng",
          "Tạo riêng thư mục đó trong Dockerfile và giao quyền sở hữu cho người dùng ứng dụng"
        ],
        "correct": 3,
        "explanation": "Cấp đúng quyền cho đúng thư mục: RUN mkdir -p /app/tmp && chown node:node /app/tmp. Quay về root bỏ mất lớp bảo vệ của Bài 3, còn 777 cho cả /app cho phép kẻ chiếm được ứng dụng sửa luôn mã của nó."
      },
      {
        "question": "Kích thước image giảm từ 1,4 GB xuống 180 MB mang lại lợi ích thực tế nào lớn nhất?",
        "options": [
          "Kéo image lên máy mới nhanh hơn, nên mở rộng và khôi phục sau sự cố nhanh hơn",
          "Ứng dụng chạy nhanh hơn hẳn vì bộ xử lý phải đọc ít dữ liệu hơn mỗi lần thực thi yêu cầu",
          "Giảm hẳn số lượng người dùng đồng thời mà ứng dụng phải phục vụ",
          "Không còn cần tới bộ nhớ đệm từng lớp khi dựng lại image"
        ],
        "correct": 0,
        "explanation": "Khi một máy chết hay tải tăng đột ngột, máy mới phải kéo image về trước khi chạy được. 180 MB là vài giây, 1,4 GB có thể là vài phút - đúng những phút bạn đang có sự cố. Tốc độ chạy của ứng dụng gần như không đổi."
      },
      {
        "question": "Công cụ quét báo một lỗ hổng nghiêm trọng trong gói của image nền. Bước đầu tiên nên làm?",
        "options": [
          "Bỏ qua cảnh báo, vì lỗ hổng trong image nền không phải trách nhiệm của đội",
          "Kiểm image nền đã có bản vá chưa và nâng phiên bản đã ghim lên bản đó",
          "Xoá gói đó bằng một dòng RUN ở cuối Dockerfile để công cụ quét ngừng báo",
          "Chuyển sang dùng thẻ latest để luôn có bản vá mới nhất một cách tự động"
        ],
        "correct": 1,
        "explanation": "Image nền được vá thường xuyên; ghim phiên bản nghĩa là bạn chủ động nâng khi có bản vá, rồi dựng và kiểm thử lại. Xoá ở dòng cuối không bỏ được gói khỏi lớp cũ, và latest đổi lấy tính tái lập để được vá tự động - hai điều bạn đều cần."
      }
    ],
    "keyTakeaways": [
      "Chạy thử image ở trạng thái sạch trước khi đẩy lên kho.",
      "Gắn thẻ theo mã commit, không ghi đè thẻ cũ.",
      "HEALTHCHECK gọi yêu cầu thật, không chỉ kiểm tiến trình còn sống.",
      "Cấp quyền đúng thư mục cho người dùng thường, không quay về root.",
      "Ghim image nền và nâng có chủ đích khi có bản vá."
    ],
    "practicePrompt": {
      "question": "Image chạy tốt khi bạn chạy thử, nhưng trên máy chủ báo không tìm thấy tệp cấu hình mặc định. Nguyên nhân khả dĩ nhất?",
      "options": [
        "Máy chủ dùng phiên bản Docker cũ hơn nên không đọc được tệp cấu hình",
        "Khi chạy thử bạn có bind mount thư mục dự án, che đi việc image thiếu tệp đó",
        "Tệp cấu hình quá lớn nên bị kho image tự động loại bỏ khi đẩy lên",
        "Người dùng thường trong container không được phép đọc tệp cấu hình"
      ],
      "correct": 1,
      "explanation": "Bind mount thư mục dự án đặt mọi tệp trên máy bạn vào container, nên image thiếu tệp vẫn chạy được. Thường tệp bị loại bởi .dockerignore hoặc bị bỏ sót ở bước COPY --from. Đó chính là lý do chạy thử ở trạng thái sạch trước khi đẩy."
    },
    "summary": {
      "keyIdea": "Image sẵn sàng đẩy lên là image đã chạy thử sạch, nhỏ, không root, không bí mật, có thẻ truy được về commit.",
      "formula": "Sẵn sàng = dựng nhiều giai đoạn + chạy sạch + healthcheck + USER + quét lỗ hổng + thẻ theo commit.",
      "commonMistake": "Chỉ chạy thử với bind mount, rồi phát hiện image thiếu tệp khi đã lên máy chủ.",
      "action": "Đi qua danh sách kiểm trong bài với image của dự án bạn đang làm."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy image của bạn bằng docker run --rm -e CHỈ_CÁC_BIẾN_CẦN_THIẾT <image>, không có -v nào. Rồi docker run --rm <image> whoami và docker image ls để ghi lại người dùng và kích thước. Đó là điểm xuất phát để đo cải thiện.",
      "secondary": "Chặng sau: đưa toàn bộ việc dựng, kiểm và đẩy image này vào CI/CD."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài này ghép mọi thứ của chặng lại: một ứng dụng Node có cơ sở dữ liệu, được đóng gói thành image sẵn sàng đưa lên máy chủ, và một danh sách kiểm để biết khi nào là \"sẵn sàng\"."
      },
      {
        "type": "code",
        "language": "text",
        "caption": "Dockerfile hoàn chỉnh",
        "code": "# syntax=docker/dockerfile:1\nFROM node:22.9-slim AS dung\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build && npm prune --omit=dev\n\nFROM node:22.9-slim\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=dung --chown=node:node /app/node_modules ./node_modules\nCOPY --from=dung --chown=node:node /app/dist ./dist\nRUN mkdir -p /app/tmp && chown node:node /app/tmp\nUSER node\nEXPOSE 3000\nHEALTHCHECK --interval=10s --timeout=3s CMD node dist/healthcheck.js\nCMD [\"node\", \"dist/server.js\"]"
      },
      {
        "type": "code",
        "language": "bash",
        "caption": "Dựng, chạy sạch, gắn thẻ và đẩy",
        "code": "$ docker build -t api:$(git rev-parse --short HEAD) .\n$ docker run --rm -e DATABASE_URL=postgres://... -p 3000:3000 api:3f2a1c9   # không -v\n$ docker run --rm api:3f2a1c9 whoami\nnode\n$ docker image ls api\napi   3f2a1c9   180MB\n$ docker tag api:3f2a1c9 registry.vi-du.vn/api:3f2a1c9\n$ docker push registry.vi-du.vn/api:3f2a1c9"
      },
      {
        "type": "heading",
        "text": "Danh sách kiểm trước khi đẩy"
      },
      {
        "type": "list",
        "items": [
          "Dựng nhiều giai đoạn; image chạy không có trình biên dịch hay mã nguồn chưa biên dịch.",
          ".dockerignore có node_modules, .git, .env, thư mục bản dựng cục bộ.",
          "Chạy được ở trạng thái sạch, chỉ với các biến môi trường đã khai báo.",
          "USER khác root; thư mục cần ghi được cấp quyền riêng.",
          "HEALTHCHECK gọi yêu cầu thật; CMD dạng mảng.",
          "Không bí mật trong bất kỳ lớp nào (kiểm bằng docker history).",
          "Thẻ theo mã commit; image nền được ghim và đã quét lỗ hổng."
        ]
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Tính kích thước image cuối cùng",
        "task": "Mỗi lớp có giai đoạn, lệnh và kích thước (MB). Image cuối chỉ gồm các lớp của giai đoạn CUỐI CÙNG; lệnh COPY --from=X mang theo kích thước của đường dẫn được chép (tra trong bảng thanhPham). Mã hiện cộng mọi lớp của mọi giai đoạn, như thể dựng một giai đoạn. In kích thước image cuối và phần trăm tiết kiệm so với cộng tất cả, làm tròn tới số nguyên.",
        "starter": "const lop = [\n  { gd: \"dung\", lenh: \"FROM node:22.9\", mb: 1100 },\n  { gd: \"dung\", lenh: \"RUN npm ci\", mb: 420 },\n  { gd: \"dung\", lenh: \"RUN npm run build\", mb: 35 },\n  { gd: \"chay\", lenh: \"FROM node:22.9-slim\", mb: 150 },\n  { gd: \"chay\", lenh: \"COPY --from=dung /app/node_modules\", mb: 0 },\n  { gd: \"chay\", lenh: \"COPY --from=dung /app/dist\", mb: 0 },\n];\nconst thanhPham = { \"/app/node_modules\": 24, \"/app/dist\": 6 };\n\nfunction kichThuoc(lop) {\n  return lop.reduce((s, l) => s + l.mb, 0);\n}\n\nconst tatCa = lop.reduce((s, l) => s + l.mb, 0);\nconst cuoi = kichThuoc(lop);\nconsole.log(\"Image cuối: \" + cuoi + \" MB\");\nconsole.log(\"Tiết kiệm: \" + Math.round((1 - cuoi / tatCa) * 100) + \"%\");",
        "solution": "const lop = [\n  { gd: \"dung\", lenh: \"FROM node:22.9\", mb: 1100 },\n  { gd: \"dung\", lenh: \"RUN npm ci\", mb: 420 },\n  { gd: \"dung\", lenh: \"RUN npm run build\", mb: 35 },\n  { gd: \"chay\", lenh: \"FROM node:22.9-slim\", mb: 150 },\n  { gd: \"chay\", lenh: \"COPY --from=dung /app/node_modules\", mb: 0 },\n  { gd: \"chay\", lenh: \"COPY --from=dung /app/dist\", mb: 0 },\n];\nconst thanhPham = { \"/app/node_modules\": 24, \"/app/dist\": 6 };\n\nfunction kichThuoc(lop) {\n  const gdCuoi = lop[lop.length - 1].gd;\n  return lop\n    .filter((l) => l.gd === gdCuoi)\n    .reduce((s, l) => {\n      const m = l.lenh.match(/^COPY --from=\\S+ (\\S+)/);\n      return s + (m ? thanhPham[m[1]] : l.mb);\n    }, 0);\n}\n\nconst tatCa = lop.reduce((s, l) => s + l.mb, 0);\nconst cuoi = kichThuoc(lop);\nconsole.log(\"Image cuối: \" + cuoi + \" MB\");\nconsole.log(\"Tiết kiệm: \" + Math.round((1 - cuoi / tatCa) * 100) + \"%\");",
        "hints": [
          "Chỉ giữ các lớp có gd bằng giai đoạn của lớp cuối cùng.",
          "Lớp COPY --from có mb bằng 0 trong bảng: tra kích thước thật của đường dẫn trong thanhPham."
        ],
        "expectedOutput": "Image cuối: 180 MB\nTiết kiệm: 89%"
      },
      {
        "type": "closing",
        "lines": [
          "Một image sẵn sàng là image bạn tin được: nhỏ, không root, không bí mật, truy được về đúng commit.",
          "Chặng sau đưa toàn bộ quy trình này vào CI/CD, để không ai phải nhớ làm tay."
        ]
      }
    ]
  }
];
