import type { InterviewQuestion } from "./types";

/**
 * Câu hỏi phỏng vấn kỹ thuật cho Lập trình viên Mobile (dải id 7001-7999).
 * Trộn Android (Kotlin/Compose), iOS (Swift/SwiftUI) và Flutter - đúng những gì
 * ứng viên junior/mid gặp ở vòng kỹ thuật. Lý do của đáp án đúng nằm trong
 * `explanation`, không nhét vào phương án.
 */
export const MOBILE_QUESTIONS: InterviewQuestion[] = [
  {
    id: 7001,
    career: "mobile",
    category: "Vòng đời ứng dụng",
    difficulty: "de",
    question: "Trên Android, khi người dùng xoay màn hình thì Activity mặc định xảy ra chuyện gì?",
    options: [
      "Activity chỉ gọi onPause rồi onResume, dữ liệu giữ nguyên",
      "Hệ thống kill cả tiến trình ứng dụng rồi khởi động lại",
      "Activity bị hủy và tạo lại, biến thường trong nó bị mất",
      "Chỉ layout được vẽ lại, còn đối tượng Activity giữ nguyên",
    ],
    correct: 2,
    explanation:
      "Xoay màn hình là một configuration change: mặc định Activity đi qua onDestroy rồi onCreate với một đối tượng mới, nên mọi biến thành viên mất theo. Tiến trình vẫn sống, vì vậy ViewModel sống sót được qua lần xoay này. Hiểu nhầm \"chỉ onPause/onResume\" là nhầm với lúc chuyển sang app khác rồi quay lại.",
  },
  {
    id: 7002,
    career: "mobile",
    category: "Vòng đời ứng dụng",
    difficulty: "trung-binh",
    question: "Trên iOS, nên lưu dữ liệu người dùng đang soạn dở vào lúc nào để không bị mất?",
    options: [
      "Trong applicationWillTerminate, vì hàm này luôn được gọi trước khi app tắt",
      "Khi app vào nền (sceneDidEnterBackground)",
      "Trong deinit của view controller, vì view nào cũng được giải phóng",
      "Chỉ khi nhận cảnh báo bộ nhớ didReceiveMemoryWarning từ hệ thống",
    ],
    correct: 1,
    explanation:
      "Khi app đã ở nền và bị treo (suspended), iOS có thể kết thúc nó để lấy bộ nhớ mà không gọi thêm hàm nào của app. applicationWillTerminate chỉ được gọi trong vài trường hợp hẹp, nên dựa vào nó là mất dữ liệu. Vào nền là thời điểm cuối cùng chắc chắn app còn được chạy code, nên phải lưu ở đó.",
  },
  {
    id: 7003,
    career: "mobile",
    category: "Vòng đời ứng dụng",
    difficulty: "kho",
    question:
      "App Android ở nền lâu, hệ thống kill tiến trình để lấy bộ nhớ, rồi người dùng quay lại. State trong ViewModel thì sao?",
    options: [
      "Vẫn còn, vì ViewModel được thiết kế để sống lâu hơn Activity",
      "Mất, nhưng Android tự khôi phục mọi biến có kiểu Parcelable",
      "Vẫn còn nếu ViewModel được tạo bằng by viewModels()",
      "Mất; cần SavedStateHandle hoặc lưu bền để khôi phục",
    ],
    correct: 3,
    explanation:
      "ViewModel sống trong bộ nhớ của tiến trình: nó qua được xoay màn hình nhưng không qua được process death. Hệ thống chỉ khôi phục Bundle đã lưu, nên state cần giữ phải đi qua SavedStateHandle (hoặc rememberSaveable trong Compose) hay cơ sở dữ liệu. Parcelable chỉ là định dạng có thể đưa vào Bundle, không tự được lưu.",
  },
  {
    id: 7004,
    career: "mobile",
    category: "Quản lý trạng thái",
    difficulty: "trung-binh",
    question: "Trong Jetpack Compose, khác biệt giữa remember và rememberSaveable là gì?",
    options: [
      "remember giữ giá trị qua mọi lần recomposition và cả khi xoay màn hình",
      "rememberSaveable lưu giá trị xuống đĩa để còn sau khi gỡ cài ứng dụng",
      "rememberSaveable còn giữ được qua xoay màn hình và process death",
      "remember chỉ dùng cho kiểu nguyên thủy, rememberSaveable cho object",
    ],
    correct: 2,
    explanation:
      "remember giữ giá trị qua các lần recomposition nhưng mất khi Activity bị tạo lại. rememberSaveable ghi giá trị vào cơ chế saved instance state, nên sống sót cả xoay màn hình lẫn process death. Nó không ghi xuống đĩa lâu dài: đóng app bằng cách vuốt khỏi danh sách gần đây hay gỡ cài là mất.",
  },
  {
    id: 7005,
    career: "mobile",
    category: "Quản lý trạng thái",
    difficulty: "de",
    question: "Trong SwiftUI, khi nào dùng @Binding thay vì @State?",
    options: [
      "Khi view con cần đọc và sửa state do view cha sở hữu",
      "Khi state cần được lưu lại sau lúc tắt và mở lại app",
      "Khi giá trị là object tham chiếu thay vì struct",
      "Khi muốn state cập nhật nhanh hơn, tránh vẽ lại view",
    ],
    correct: 0,
    explanation:
      "@State khai báo nguồn sự thật do chính view sở hữu; @Binding là tham chiếu hai chiều tới state của ai đó khác, thường là view cha truyền xuống bằng $tenBien. Lưu bền qua lần mở app là việc của @AppStorage hay SwiftData. Object tham chiếu quan sát được thì dùng @Observable, không phải @Binding.",
  },
  {
    id: 7006,
    career: "mobile",
    category: "Quản lý trạng thái",
    difficulty: "trung-binh",
    question:
      "Flutter báo lỗi \"setState() called after dispose()\" sau khi gọi API. Cách xử lý đúng là gì?",
    options: [
      "Kiểm tra mounted sau await, trước khi gọi setState",
      "Bọc setState trong try/catch để nuốt lỗi",
      "Gọi API trong build() để luôn có context hợp lệ",
      "Đổi StatefulWidget thành StatelessWidget",
    ],
    correct: 0,
    explanation:
      "Người dùng rời màn hình trong lúc request đang chạy, widget bị dispose, rồi future hoàn tất và gọi setState trên một State đã chết. Kiểm tra if (!mounted) return; ngay sau await chặn đúng trường hợp đó. try/catch che triệu chứng mà không hủy công việc thừa, còn gọi API trong build() làm request chạy lại ở mỗi lần build.",
  },
  {
    id: 7007,
    career: "mobile",
    category: "Mạng & ngoại tuyến",
    difficulty: "trung-binh",
    question:
      "API kiểm tra kết nối báo thiết bị đang có Wi-Fi. Có thể bỏ qua xử lý lỗi mạng cho request tiếp theo không?",
    options: [
      "Được, vì có Wi-Fi nghĩa là đã có Internet",
      "Được, nếu kiểm tra kết nối ngay trước khi gửi",
      "Không, có Wi-Fi chưa chắc tới được máy chủ",
      "Không, nhưng chỉ cần xử lý lỗi khi dùng 4G",
    ],
    correct: 2,
    explanation:
      "API kết nối chỉ cho biết có giao diện mạng, không cho biết request có tới được máy chủ: Wi-Fi quán cà phê chưa đăng nhập, mạng chặn domain, máy chủ sập đều trả về \"có Wi-Fi\". Kiểm tra ngay trước khi gửi cũng không đủ vì mạng có thể rớt giữa chừng. Nguồn sự thật duy nhất là kết quả của chính request.",
  },
  {
    id: 7008,
    career: "mobile",
    category: "Mạng & ngoại tuyến",
    difficulty: "trung-binh",
    question: "Trong kiến trúc offline-first, giao diện nên đọc dữ liệu từ đâu?",
    options: [
      "Từ API trước, cơ sở dữ liệu cục bộ chỉ dùng khi mất mạng",
      "Từ API, nhưng giữ bản sao trong biến toàn cục để dùng lại",
      "Từ bộ nhớ đệm HTTP của thư viện mạng, không cần cơ sở dữ liệu",
      "Từ cơ sở dữ liệu cục bộ; đồng bộ với server chạy ở nền",
    ],
    correct: 3,
    explanation:
      "Offline-first coi cơ sở dữ liệu cục bộ (Room, Core Data, SwiftData, Drift...) là nguồn sự thật duy nhất cho UI; lớp đồng bộ kéo dữ liệu mới từ server về ghi vào đó, và UI tự cập nhật qua Flow hay observer. \"API trước, cục bộ khi mất mạng\" là hai nguồn sự thật, dễ lệch nhau và giật khi mạng chập chờn.",
  },
  {
    id: 7009,
    career: "mobile",
    category: "Mạng & ngoại tuyến",
    difficulty: "kho",
    question:
      "Request POST thanh toán bị timeout, app không biết server đã xử lý chưa. Làm sao để thử lại an toàn?",
    options: [
      "Không thử lại, báo người dùng tự kiểm tra rồi bấm lại",
      "Đổi sang PUT vì PUT luôn idempotent nên an toàn",
      "Gửi lại kèm cùng một idempotency key cho giao dịch",
      "Tăng timeout lên 60 giây để request không bị ngắt",
    ],
    correct: 2,
    explanation:
      "Timeout không cho biết request có tới server hay không. Idempotency key sinh một lần cho giao dịch và gửi lại y nguyên ở mỗi lần thử, để server nhận ra lần lặp và trả kết quả cũ thay vì trừ tiền hai lần. Đổi động từ HTTP không làm server idempotent; đó là hành vi server phải cài đặt. Bảo người dùng bấm lại chính là cách gây trừ tiền hai lần.",
  },
  {
    id: 7010,
    career: "mobile",
    category: "Hiệu năng & pin",
    difficulty: "de",
    question: "Đọc một tệp JSON lớn ngay trên luồng chính (main thread) gây ra hậu quả gì?",
    options: [
      "Không sao nếu tệp nằm trong bộ nhớ trong của máy",
      "Giao diện giật, lâu quá thì Android báo ANR",
      "Chỉ tốn pin hơn, giao diện vẫn mượt",
      "App bị kill ngay lập tức vì vi phạm quyền",
    ],
    correct: 1,
    explanation:
      "Luồng chính vừa vẽ giao diện vừa xử lý chạm; khi nó bận đọc và parse tệp, khung hình bị trễ (giật), và nếu chặn đủ lâu Android hiện hộp thoại ANR. Bộ nhớ trong nhanh hơn nhưng vẫn là I/O đồng bộ. Cách đúng là đưa sang luồng nền, ví dụ withContext(Dispatchers.IO) hay Task trong Swift.",
  },
  {
    id: 7011,
    career: "mobile",
    category: "Hiệu năng & pin",
    difficulty: "de",
    question: "Hiển thị danh sách 5.000 dòng, vì sao nên dùng LazyColumn / FlatList thay cho Column trong ScrollView?",
    options: [
      "Chỉ tạo view cho các dòng đang hiện trên màn hình",
      "Tải dữ liệu từ server theo trang một cách tự động",
      "Nén ảnh trong danh sách xuống cho nhẹ bộ nhớ",
      "Chạy việc vẽ danh sách trên một luồng riêng",
    ],
    correct: 0,
    explanation:
      "Column trong ScrollView tạo và đo cả 5.000 dòng ngay từ đầu, tốn bộ nhớ và làm màn hình mở chậm. Danh sách lười chỉ dựng những dòng đang hiện cộng một ít đệm, và tái sử dụng khi cuộn. Nó không tự phân trang dữ liệu từ server - việc đó phải tự làm (Paging 3, onEndReached) - và vẫn vẽ trên luồng chính.",
  },
  {
    id: 7012,
    career: "mobile",
    category: "Hiệu năng & pin",
    difficulty: "kho",
    question: "Cần đồng bộ dữ liệu định kỳ mỗi vài giờ trên Android, kể cả khi app đã đóng. Nên dùng gì?",
    options: [
      "Một Service chạy nền vô hạn với vòng lặp sleep",
      "WorkManager với PeriodicWorkRequest và constraint mạng",
      "AlarmManager.setExact mỗi giờ để chạy thật đúng giờ",
      "Coroutine trong viewModelScope với delay nhiều giờ",
    ],
    correct: 1,
    explanation:
      "WorkManager là API khuyến nghị cho việc nền cần đảm bảo chạy: nó sống qua khởi động lại máy, tôn trọng Doze và cho khai báo điều kiện như có mạng, đang sạc. Service chạy vô hạn bị hệ thống giới hạn từ Android 8 và hao pin. viewModelScope bị hủy cùng ViewModel khi đóng màn hình, nên delay nhiều giờ không bao giờ tới.",
  },
  {
    id: 7013,
    career: "mobile",
    category: "Phát hành & kho ứng dụng",
    difficulty: "de",
    question: "Tải bản mới lên Google Play thì bị từ chối vì \"version code đã được dùng\". Cần sửa gì?",
    options: [
      "Tăng versionCode lên số lớn hơn mọi bản đã tải lên",
      "Tăng versionName, ví dụ từ 1.2.0 lên 1.2.1",
      "Đổi applicationId để Play coi đó là bản mới",
      "Ký lại bản build bằng một keystore khác",
    ],
    correct: 0,
    explanation:
      "Play phân biệt các bản bằng versionCode, một số nguyên phải tăng dần ở mỗi lần tải lên. versionName chỉ là chuỗi hiển thị cho người dùng, đổi nó mà giữ versionCode thì vẫn bị từ chối. Đổi applicationId tạo ra một ứng dụng hoàn toàn khác, còn đổi khóa ký làm bản cập nhật không cài đè được bản cũ.",
  },
  {
    id: 7014,
    career: "mobile",
    category: "Phát hành & kho ứng dụng",
    difficulty: "trung-binh",
    question: "Vì sao Google Play yêu cầu app mới tải lên dạng Android App Bundle (.aab) thay cho APK?",
    options: [
      "AAB được mã hóa nên không thể dịch ngược mã nguồn",
      "AAB chạy nhanh hơn APK vì được biên dịch trước",
      "Play tạo APK tối ưu cho từng thiết bị, giảm dung lượng tải",
      "AAB cho phép cập nhật mã Kotlin mà không qua xét duyệt",
    ],
    correct: 2,
    explanation:
      "AAB chứa mã và tài nguyên cho mọi cấu hình; Play dùng nó sinh ra các split APK chỉ gồm đúng mật độ màn hình, kiến trúc CPU và ngôn ngữ của từng máy, nên người dùng tải ít hơn. AAB không mã hóa hay làm rối mã - việc đó là của R8. Trên máy người dùng thứ được cài vẫn là APK, nên tốc độ chạy không đổi.",
  },
  {
    id: 7015,
    career: "mobile",
    category: "Phát hành & kho ứng dụng",
    difficulty: "trung-binh",
    question: "Trên TestFlight, bản build gửi cho người kiểm thử bên ngoài (external) khác bản nội bộ ở điểm nào?",
    options: [
      "Bản external không cần xét duyệt, bản internal thì cần",
      "Bản external chỉ cài được trên máy đã đăng ký UDID",
      "Bản external phải là bản đã phát hành trên App Store",
      "Bản external phải qua Beta App Review trước khi phát",
    ],
    correct: 3,
    explanation:
      "Người kiểm thử nội bộ (thành viên App Store Connect) nhận build ngay khi xử lý xong. Nhóm external, tới 10.000 người qua email hay link công khai, chỉ nhận được bản đầu tiên của mỗi phiên bản sau khi Apple duyệt Beta App Review. Đăng ký UDID là cách phân phối ad hoc cũ, TestFlight không cần.",
  },
  {
    id: 7016,
    career: "mobile",
    category: "Phát hành & kho ứng dụng",
    difficulty: "kho",
    question: "Bản 2.3 đang staged rollout 10% trên Play thì crash tăng vọt. Bước xử lý đúng là gì?",
    options: [
      "Rollback về bản 2.2 ngay trên Play Console cho người đã cập nhật",
      "Gỡ ứng dụng khỏi Play để chặn người dùng cài bản lỗi",
      "Tăng rollout lên 100% để thu đủ báo cáo crash rồi mới sửa",
      "Tạm dừng rollout, sửa lỗi, phát bản mới versionCode cao hơn",
    ],
    correct: 3,
    explanation:
      "Halt rollout ngăn thêm người nhận bản 2.3, nhưng 10% đã cập nhật vẫn giữ bản đó: Play không hạ cấp được ứng dụng. Cách thoát duy nhất cho họ là bản sửa lỗi có versionCode cao hơn (hoặc tải lại mã 2.2 dưới versionCode mới). Tăng lên 100% chỉ nhân số người gặp lỗi, còn gỡ khỏi Play không đụng tới máy đã cài.",
  },
];
