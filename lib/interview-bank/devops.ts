import type { InterviewQuestion } from "./types";

/**
 * Câu hỏi phỏng vấn kỹ thuật cho Kỹ sư DevOps / Cloud (id 4001-4999).
 * Chủ đề: Linux & mạng, container & Kubernetes, CI/CD, giám sát & sự cố,
 * hạ tầng đám mây. Có chấm điểm - xem quy tắc viết quiz trong AGENTS.md
 * trước khi sửa phương án.
 */
export const DEVOPS_QUESTIONS: InterviewQuestion[] = [
  {
    id: 4001,
    career: "devops",
    category: "Linux & mạng",
    difficulty: "de",
    question: "File có quyền 750 (chmod 750). Nhóm (group) của file được làm gì?",
    options: [
      "Đọc, ghi và thực thi",
      "Đọc và thực thi (r-x)",
      "Chỉ được đọc, không thực thi",
      "Không được đọc, ghi hay thực thi",
    ],
    correct: 1,
    explanation:
      "Ba chữ số lần lượt là owner, group, others; mỗi chữ số là tổng r=4, w=2, x=1. Chữ số giữa là 5 = 4 + 1, tức đọc và thực thi. 7 (rwx) là quyền của owner ở chữ số đầu - nhầm vị trí là lỗi hay gặp nhất; chữ số cuối 0 mới là 'không có quyền nào', dành cho others.",
  },
  {
    id: 4002,
    career: "devops",
    category: "Linux & mạng",
    difficulty: "de",
    question: "Lệnh nào cho biết tiến trình nào đang lắng nghe trên cổng 8080?",
    options: [
      "curl localhost:8080",
      "ping localhost 8080",
      "ss -ltnp | grep 8080",
      "top -p 8080",
    ],
    correct: 2,
    explanation:
      "ss -ltnp (hoặc netstat -ltnp, lsof -i :8080) liệt kê socket TCP đang listen kèm tiến trình sở hữu. ping dùng ICMP, không có khái niệm cổng nên không kiểm tra được dịch vụ trên 8080. curl chỉ cho biết có thứ gì trả lời trên cổng đó, không cho biết là tiến trình nào; còn top -p nhận PID chứ không nhận số cổng, nên 8080 bị hiểu thành mã tiến trình.",
  },
  {
    id: 4003,
    career: "devops",
    category: "Linux & mạng",
    difficulty: "trung-binh",
    question:
      "curl https://api.example.com báo 'Could not resolve host', nhưng curl thẳng vào IP của server thì chạy. Nên kiểm tra gì trước?",
    options: [
      "Chứng chỉ TLS của server đã hết hạn",
      "Firewall đang chặn cổng 443 phía server",
      "Cấu hình DNS: /etc/resolv.conf, dig tên miền",
      "Ứng dụng trên server bị treo, cần khởi động lại",
    ],
    correct: 2,
    explanation:
      "'Could not resolve host' nghĩa là bước phân giải tên miền thành IP đã thất bại, trước cả khi mở kết nối - nên kiểm tra DNS resolver và bản ghi bằng dig/nslookup. Việc gọi thẳng IP chạy được loại trừ firewall chặn 443 và ứng dụng treo. Lỗi chứng chỉ TLS cho thông báo khác hẳn (SSL certificate problem) và chỉ xảy ra sau khi đã kết nối được.",
  },
  {
    id: 4004,
    career: "devops",
    category: "Container & Kubernetes",
    difficulty: "de",
    question: "Điểm khác biệt cốt lõi giữa container và máy ảo (VM) là gì?",
    options: [
      "Container chạy chung kernel của máy chủ",
      "Container có hệ điều hành khách riêng như VM nhưng nhỏ hơn",
      "Container chỉ chạy được trên Linux, VM chạy được khắp nơi",
      "Container được cách ly mạnh hơn VM nhờ có hypervisor",
    ],
    correct: 0,
    explanation:
      "Container là tiến trình được cách ly bằng namespace và cgroup, dùng chung kernel của host; VM ảo hóa cả phần cứng và chạy một kernel khách riêng qua hypervisor. Vì dùng chung kernel, container khởi động nhanh và nhẹ hơn, nhưng cách ly yếu hơn VM chứ không mạnh hơn. Container Windows cũng tồn tại, nên 'chỉ chạy trên Linux' là sai.",
  },
  {
    id: 4005,
    career: "devops",
    category: "Container & Kubernetes",
    difficulty: "trung-binh",
    question:
      "Mỗi lần sửa một dòng code, docker build lại cài lại toàn bộ dependency rất lâu. Nguyên nhân thường gặp là gì?",
    options: [
      "Chưa bật BuildKit nên Docker không có cơ chế cache layer",
      "COPY toàn bộ mã nguồn trước bước cài dependency",
      "Dùng base image alpine nên phải biên dịch lại mọi gói",
      "Docker luôn build lại mọi layer khi thẻ image đổi",
    ],
    correct: 1,
    explanation:
      "Docker cache theo layer: khi một layer thay đổi, mọi layer phía sau phải build lại. COPY . . đặt trước RUN npm install nghĩa là sửa một dòng code cũng làm mất cache của bước cài đặt. Cách đúng là COPY package.json và lockfile trước, cài dependency, rồi mới COPY phần code còn lại. Cache layer có từ trước BuildKit, và thẻ image không ảnh hưởng tới cache.",
  },
  {
    id: 4006,
    career: "devops",
    category: "Container & Kubernetes",
    difficulty: "trung-binh",
    question: "Pod ở trạng thái CrashLoopBackOff. Bước điều tra đầu tiên hợp lý nhất là gì?",
    options: [
      "Tăng số replica để có pod khác thay thế",
      "Xóa node đang chạy pod rồi tạo node mới",
      "kubectl logs --previous và kubectl describe pod",
      "Đổi imagePullPolicy thành Always để kéo lại image",
    ],
    correct: 2,
    explanation:
      "CrashLoopBackOff nghĩa là container khởi động rồi thoát liên tục, Kubernetes giãn dần thời gian restart. Log của lần chạy trước (--previous) và phần Events/exit code trong describe thường chỉ thẳng nguyên nhân: thiếu biến môi trường, lỗi cấu hình, bị OOMKilled. Tăng replica chỉ tạo thêm pod crash giống hệt; lỗi kéo image thì hiện là ImagePullBackOff chứ không phải CrashLoopBackOff.",
  },
  {
    id: 4007,
    career: "devops",
    category: "Container & Kubernetes",
    difficulty: "kho",
    question: "Khác biệt giữa readinessProbe và livenessProbe trong Kubernetes là gì?",
    options: [
      "Readiness thất bại thì kubelet restart container ngay",
      "Liveness thất bại thì pod bị gỡ khỏi Service nhưng vẫn chạy",
      "Hai probe giống nhau, chỉ khác tần suất kiểm tra mặc định",
      "Readiness gỡ pod khỏi Service; liveness restart container",
    ],
    correct: 3,
    explanation:
      "Readiness probe quyết định pod có nhận traffic hay không: thất bại thì pod bị gỡ khỏi endpoint của Service nhưng container không bị restart. Liveness probe thất bại thì kubelet restart container. Hai phương án đầu là đúng hai hành vi đó nhưng gán ngược probe. Hệ quả thực tế: đặt liveness kiểm tra database sẽ khiến mọi pod bị restart hàng loạt khi database chập chờn.",
  },
  {
    id: 4008,
    career: "devops",
    category: "CI/CD",
    difficulty: "de",
    question: "Continuous Delivery khác Continuous Deployment ở điểm nào?",
    options: [
      "Deployment tự lên production, Delivery cần người duyệt",
      "Deployment chỉ dùng cho mobile, Delivery dùng cho web",
      "Delivery không chạy test tự động, Deployment thì có",
      "Delivery triển khai mỗi ngày, Deployment mỗi tuần",
    ],
    correct: 0,
    explanation:
      "Cả hai đều build và test tự động để mọi commit luôn ở trạng thái sẵn sàng phát hành. Continuous Delivery dừng ở bước cuối chờ một người bấm duyệt lên production; Continuous Deployment tự đẩy thẳng lên production khi pipeline xanh. Khác biệt không nằm ở việc có test hay không, cũng không ở tần suất cố định nào.",
  },
  {
    id: 4009,
    career: "devops",
    category: "CI/CD",
    difficulty: "trung-binh",
    question: "Cách xử lý secret (API key, mật khẩu DB) trong pipeline CI nào là đúng?",
    options: [
      "Commit vào repo private vì chỉ nhân viên xem được",
      "Truyền qua build arg để nhúng luôn vào Docker image",
      "Mã hóa Base64 rồi đặt thẳng trong file YAML của pipeline",
      "Lưu trong secret store của CI, inject qua biến môi trường",
    ],
    correct: 3,
    explanation:
      "Secret store của CI (GitHub Actions secrets, GitLab CI variables, Vault...) giữ secret ngoài mã nguồn, che chúng trong log và chỉ inject lúc chạy. Repo private vẫn bị clone, fork và giữ secret mãi trong lịch sử git. Base64 không phải mã hóa. Build arg bị ghi lại trong lịch sử layer của image, ai kéo được image là đọc được secret.",
  },
  {
    id: 4010,
    career: "devops",
    category: "CI/CD",
    difficulty: "kho",
    question:
      "Muốn phát hành phiên bản mới cho 5% người dùng, theo dõi chỉ số rồi mới tăng dần. Chiến lược này tên gì?",
    options: [
      "Blue-green deployment",
      "Rolling update",
      "Canary release",
      "Recreate deployment",
    ],
    correct: 2,
    explanation:
      "Canary chuyển một phần nhỏ traffic sang bản mới, so sánh tỉ lệ lỗi và độ trễ với bản cũ rồi mới tăng dần. Blue-green giữ hai môi trường đầy đủ và chuyển toàn bộ traffic trong một lần. Rolling update thay dần từng pod nhưng tỉ lệ traffic đi theo số pod, không chủ đích dừng ở 5% để quan sát. Recreate tắt hết bản cũ rồi mới bật bản mới, có downtime.",
  },
  {
    id: 4011,
    career: "devops",
    category: "Giám sát & sự cố",
    difficulty: "trung-binh",
    question:
      "Độ trễ trung bình (average) của API là 120 ms nhưng người dùng vẫn phàn nàn chậm. Nên xem chỉ số nào?",
    options: [
      "Số request mỗi giây của API",
      "Độ trễ nhỏ nhất (min)",
      "Mức CPU trung bình của server",
      "Độ trễ theo phân vị p95/p99",
    ],
    correct: 3,
    explanation:
      "Trung bình che mất đuôi phân phối: 95% request 50 ms và 5% request 2 giây vẫn cho trung bình thấp, trong khi người dùng gặp 2 giây là người phàn nàn. p95/p99 cho biết trải nghiệm của nhóm chậm nhất. CPU trung bình và số request mỗi giây là chỉ số tài nguyên, tải - không trả lời người dùng đang chờ bao lâu. Độ trễ nhỏ nhất thì chỉ cho thấy trường hợp tốt nhất.",
  },
  {
    id: 4012,
    career: "devops",
    category: "Giám sát & sự cố",
    difficulty: "trung-binh",
    question: "SLO 99,9% uptime theo tháng (30 ngày) cho phép khoảng bao nhiêu thời gian gián đoạn?",
    options: [
      "Khoảng 7,2 giờ (= 1% × 720 giờ)",
      "Khoảng 43 phút (= 0,1% × 30 ngày)",
      "Khoảng 8,8 giờ (con số của cả năm)",
      "Khoảng 4,3 phút (= 0,01% × 30 ngày)",
    ],
    correct: 1,
    explanation:
      "Error budget là 0,1% × 30 ngày × 24 giờ × 60 phút = 43,2 phút. 7,2 giờ là 1%, tức SLO 99% - lệch một số 9. 8,8 giờ là ngân sách của 99,9% tính cho cả năm (8.760 giờ × 0,1%), nhầm khung thời gian. 4,3 phút là 99,99% cho một tháng. Các con số này hay bị nhầm vì mỗi số 9 thêm vào chia ngân sách cho mười.",
  },
  {
    id: 4013,
    career: "devops",
    category: "Giám sát & sự cố",
    difficulty: "kho",
    question: "Mục tiêu chính của một buổi postmortem 'blameless' sau sự cố là gì?",
    options: [
      "Xác định người gây lỗi để đào tạo lại hoặc kỷ luật",
      "Ghi nhận sự cố để tính vào KPI của cả đội vận hành",
      "Chứng minh với khách hàng lỗi do bên thứ ba",
      "Tìm lỗ hổng trong hệ thống và quy trình để sửa",
    ],
    correct: 3,
    explanation:
      "Blameless postmortem giả định mọi người đã hành động hợp lý với thông tin họ có lúc đó, nên câu hỏi là 'hệ thống nào để một thao tác sai gây ra sự cố' - thiếu review, thiếu cảnh báo, runbook sai. Đổ lỗi cá nhân khiến mọi người giấu thông tin ở sự cố sau, và thay người thì lỗ hổng vẫn nằm đó chờ người tiếp theo. Kết quả đầu ra là các action item có người phụ trách.",
  },
  {
    id: 4014,
    career: "devops",
    category: "Hạ tầng đám mây",
    difficulty: "de",
    question: "Trong một VPC trên AWS, điều gì làm một subnet trở thành 'public subnet'?",
    options: [
      "Subnet có dải IP thuộc vùng địa chỉ công cộng",
      "Route table có tuyến 0.0.0.0/0 trỏ tới Internet Gateway",
      "Mọi instance trong subnet đều bật Security Group mở",
      "Route table có tuyến 0.0.0.0/0 trỏ tới NAT Gateway",
    ],
    correct: 1,
    explanation:
      "Một subnet là public khi route table gắn với nó có tuyến mặc định 0.0.0.0/0 đi ra Internet Gateway. Tuyến đi qua NAT Gateway là đặc trưng của private subnet: instance đi ra ngoài được nhưng không nhận kết nối từ ngoài vào. Dải IP của subnet thường là địa chỉ riêng (10.x, 172.16.x) cả với public subnet; Security Group là tường lửa của instance, không quyết định loại subnet.",
  },
  {
    id: 4015,
    career: "devops",
    category: "Hạ tầng đám mây",
    difficulty: "trung-binh",
    question: "Một người sửa tay tài nguyên trên console, lần terraform plan kế tiếp sẽ thế nào?",
    options: [
      "Plan phát hiện drift và đề xuất đưa về như code",
      "Terraform bỏ qua, vì nó chỉ quản lý thứ nó tạo",
      "Terraform tự cập nhật code .tf theo thay đổi thủ công",
      "Plan báo lỗi và khóa state cho tới khi sửa bằng tay",
    ],
    correct: 0,
    explanation:
      "terraform plan làm mới state từ API của nhà cung cấp, so sánh với cấu hình trong code và đề xuất thay đổi để đưa tài nguyên về đúng như code - tức là ghi đè thay đổi thủ công khi apply. Terraform không bao giờ tự viết lại file .tf. Tài nguyên đó vẫn do Terraform quản lý nên không bị bỏ qua, và drift không phải lỗi khóa state; state lock chỉ ngăn hai lần chạy đồng thời.",
  },
  {
    id: 4016,
    career: "devops",
    category: "Hạ tầng đám mây",
    difficulty: "kho",
    question: "Theo nguyên tắc least privilege, ứng dụng chạy trên EC2 nên lấy quyền gọi S3 thế nào?",
    options: [
      "Tạo IAM user riêng, lưu access key trong file .env",
      "Dùng access key của tài khoản root để tránh lỗi quyền",
      "Gắn IAM role chỉ có quyền trên bucket cần dùng",
      "Gắn policy AmazonS3FullAccess cho instance",
    ],
    correct: 2,
    explanation:
      "IAM role gắn vào instance cấp credential tạm thời tự xoay vòng qua metadata service, không có khóa dài hạn nào nằm trên đĩa. Least privilege còn đòi policy chỉ cho đúng hành động trên đúng bucket. AmazonS3FullAccess dùng role nhưng cho quyền trên mọi bucket - sai ở nửa sau. Access key trong .env là khóa dài hạn dễ lộ qua git, còn root key thì không bao giờ nên dùng cho ứng dụng.",
  },
];
