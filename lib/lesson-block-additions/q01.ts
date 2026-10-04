import type { LessonSectionBlock } from "../lesson-types";

// Khối `sim` đợt hai - nhiệm vụ mới của trình mô phỏng terminal. Một người viết cho một tệp.
export const Q01_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "nguoi-dung-va-quyen-truy-cap-tep": [
    {
      type: "sim",
      tool: "terminal",
      mission: "chmod-exec",
      title: "Cho một script quyền chạy",
      task: "Bài vừa cho thấy tệp trien-khai.sh chỉ chạy được khi chủ sở hữu có quyền x. Trong terminal, tạo một tệp .sh có nội dung bằng echo và chuyển hướng, chạy thẳng bằng ./ để thấy Permission denied, rồi chmod +x và chạy lại. Hãy đọc kết quả ls -l trước và sau khi đổi quyền.",
    },
  ],
  "shell-script-gom-viec-lap-lai": [
    {
      type: "sim",
      tool: "terminal",
      mission: "chmod-exec",
      title: "Viết script đầu tiên và cho phép chạy",
      task: "Một script chỉ là tệp văn bản cho tới khi hệ điều hành cho phép thực thi nó. Hãy ghi một lệnh echo vào tệp .sh, thử chạy bằng ./tên-tệp để gặp lỗi quyền, cấp quyền chạy bằng chmod +x rồi chạy lại cho thành công. Đừng dùng bash tên-tệp, vì như vậy quyền không được kiểm tra.",
    },
  ],
  "ssh-dang-nhap-bang-khoa": [
    {
      type: "sim",
      tool: "terminal",
      mission: "chmod-key",
      title: "Siết quyền khoá riêng SSH",
      task: "Khoá riêng là chìa của bạn, nên máy chủ từ chối dùng nó nếu người khác đọc được. Trong terminal, xem quyền của thư mục ~/.ssh và tệp id_ed25519 bằng ls -l, rồi đặt khoá về 600 và thư mục về 700 bằng chmod. Sau đó xem lại ls -l để chắc chỉ chủ sở hữu còn quyền.",
    },
  ],
  "tap-tin-thu-muc-va-quyen-truy-cap": [
    {
      type: "sim",
      tool: "terminal",
      mission: "chmod-key",
      title: "Đọc chín ký tự quyền và sửa khoá SSH",
      task: "Bài nói chín ký tự rwx chia cho chủ sở hữu, nhóm và người khác. Hãy xem quyền khoá riêng ~/.ssh/id_ed25519 bằng ls -la, nhận ra nhóm và người khác đang được đọc, rồi dùng chmod với dạng số để chỉ chủ sở hữu còn quyền trên khoá và trên thư mục ~/.ssh.",
    },
  ],
  "tu-may-cua-ban-toi-may-chu": [
    {
      type: "sim",
      tool: "terminal",
      mission: "env-export",
      title: "Cấu hình bằng biến môi trường",
      task: "Bài nói cùng một bản dựng đọc cấu hình từ biến môi trường để chạy ở mọi nơi. Trong terminal, export APP_ENV=production và PORT=8080 để chương trình con cũng nhìn thấy, rồi xác nhận bằng printenv hoặc env. Thử so sánh với việc gán biến mà không có export.",
    },
  ],
  "cau-hinh-va-moi-truong": [
    {
      type: "sim",
      tool: "terminal",
      mission: "env-export",
      title: "Đổi môi trường bằng biến, không sửa mã",
      task: "Bài tách cấu hình khỏi mã: giá trị nào khác nhau giữa các môi trường thì truyền từ bên ngoài, và biến môi trường là cách truyền phổ biến nhất. Hãy thử trong terminal: export APP_ENV=production và PORT=8080, rồi kiểm tra bằng printenv để thấy phiên làm việc mang đúng cấu hình của môi trường chạy thật.",
    },
  ],
  "bi-mat-va-khoa-truy-cap": [
    {
      type: "sim",
      tool: "terminal",
      mission: "env-secret",
      title: "Giữ khoá API ngoài kho mã",
      task: "Bài nhắc rằng một khoá lọt vào commit là coi như đã lộ. Trong terminal, tạo tệp .env chứa dòng API_KEY=abc123 trong thư mục du-an, khai báo .env trong .gitignore, rồi git init, git add và commit. Kết thúc bằng git status để thấy .env không còn nằm trong danh sách.",
    },
  ],
  "cau-hinh-va-quan-ly-bi-mat": [
    {
      type: "sim",
      tool: "terminal",
      mission: "env-secret",
      title: "Tách bí mật khỏi mã nguồn",
      task: "Bài vẽ ranh giới giữa mã và cấu hình, và khoá truy cập là loại cấu hình nhạy cảm nhất nên phải nằm ngoài mã. Trong terminal, tạo tệp .env có dòng API_KEY=abc123 trong du-an, cho .gitignore bỏ qua nó, rồi khởi tạo Git và commit phần còn lại. Dùng git status để chứng minh .env không đi vào lịch sử.",
    },
  ],
  "doc-nhat-ky-loi-cua-san-pham-dang-chay": [
    {
      type: "sim",
      tool: "terminal",
      mission: "log-errors",
      title: "Lọc dòng ERROR để gửi người kỹ thuật",
      task: "Bài dạy tìm vài dòng đáng chú ý giữa hàng trăm dòng nhật ký. Trong terminal, nhật ký ứng dụng nằm ở /var/log/myapp/app.log. Dùng grep ERROR rồi chuyển hướng kết quả vào một tệp như loi.txt, và cat tệp đó để kiểm tra rằng chỉ còn các dòng lỗi.",
    },
  ],
  "case-doc-sau-nhat-ky": [
    {
      type: "sim",
      tool: "terminal",
      mission: "log-rank",
      title: "Đếm và xếp hạng loại lỗi",
      task: "Bài nói phép đếm cho biết phạm vi, còn nguyên nhân phải đọc từng yêu cầu. Hãy làm phần đếm trong terminal: lọc dòng ERROR của /var/log/myapp/app.log, cắt cột tên lỗi, đếm bằng sort và uniq -c, xếp giảm dần rồi lưu vào top-loi.txt. Sau đó tự hỏi bảng này chỉ cho thấy triệu chứng nào.",
    },
  ],
  "nhat-ky-va-dau-vet-he-thong": [
    {
      type: "sim",
      tool: "terminal",
      mission: "log-rank",
      title: "Đếm lỗi theo loại từ nhật ký",
      task: "Khi nhật ký có trường rõ ràng thì đếm theo loại lỗi là việc đơn giản. Với nhật ký dạng văn bản trong /var/log/myapp/app.log, hãy dùng grep, cut, sort và uniq -c nối bằng đường ống để ra bảng loại lỗi xếp giảm dần, rồi lưu vào top-loi.txt.",
    },
  ],
  "dns-tu-ten-mien-toi-dia-chi-ip": [
    {
      type: "sim",
      tool: "terminal",
      mission: "dns-lookup",
      title: "Tra tên miền ra địa chỉ IP",
      task: "Bài giải thích một cái tên được đổi thành địa chỉ qua nhiều tầng. Trong terminal, tra vi-du.vn bằng dig hoặc nslookup, đọc bản ghi A trả về, rồi ghi địa chỉ IP vào tệp ip-may-chu.txt trong thư mục nhà.",
    },
  ],
  "ten-mien-va-he-thong-ten-mien": [
    {
      type: "sim",
      tool: "terminal",
      mission: "dns-lookup",
      title: "Xem bản ghi A của một tên miền",
      task: "Bản ghi A nối một tên miền với một địa chỉ mạng cụ thể. Hãy tra vi-du.vn bằng dig +short hoặc nslookup trong terminal để thấy địa chỉ đó, rồi lưu vào ip-may-chu.txt như thể bạn đang chuẩn bị đính vào một ticket.",
    },
  ],
  "cau-hinh-sai-tro-tenmien-ve-noi-khac": [
    {
      type: "sim",
      tool: "terminal",
      mission: "dns-lookup",
      title: "Kiểm tra tên miền đang trỏ về đâu",
      task: "Khi trang không mở được, câu hỏi đầu tiên là tên miền đang trỏ về địa chỉ nào. Trong terminal, tra vi-du.vn bằng dig hoặc nslookup và ghi IP nhận được vào ip-may-chu.txt, để có thứ đối chiếu với nơi trang thật sự đặt.",
    },
  ],
  "xoay-vong-log-va-chi-phi-luu-tru": [
    {
      type: "sim",
      tool: "terminal",
      mission: "find-old-logs",
      title: "Dọn nhật ký quá hạn 14 ngày",
      task: "Bài nói giữ log bao lâu phải là chính sách chứ không phải đoán. Giả sử chính sách là 14 ngày: trong terminal, xem /var/log/myapp bằng ls -l, dùng find với -mtime +14 để xem trước các tệp quá hạn, rồi xoá đúng chúng và giữ lại app.log, error.log đang được ghi.",
    },
  ],
  "tien-trinh-chuong-trinh-dang-chay": [
    {
      type: "sim",
      tool: "terminal",
      mission: "ps-kill",
      title: "Tìm và dừng tiến trình ngốn CPU",
      task: "Bài đã chỉ cách đọc ps rồi gửi tín hiệu dừng. Hãy làm thật trong terminal: xem bảng tiến trình bằng ps aux, tìm hai tiến trình dùng CPU nhiều nhất, dùng kill với PID của chúng, và chỉ dùng kill -9 nếu tiến trình còn sống. Giữ nguyên worker.py và sshd.",
    },
  ],
  "doc-lich-su-va-quay-lai-moc-cu": [
    {
      type: "sim",
      tool: "terminal",
      mission: "git-revert",
      title: "Hoàn tác một commit bằng revert",
      task: "Bài phân biệt quay lại mốc cũ với hoàn tác bằng một mốc mới. Trong kho /srv/cua-hang, đọc git log --oneline để tìm commit đổi quy tắc phí ship, rồi git revert đúng commit đó, không dùng reset --hard. Commit sửa banner phải còn nguyên.",
    },
  ],
  "git-bisect-tim-commit-gay-loi": [
    {
      type: "sim",
      tool: "terminal",
      mission: "git-revert",
      title: "Gỡ commit gây lỗi mà không viết lại lịch sử",
      task: "Bài dừng ở chỗ tìm ra commit gây lỗi; việc kế tiếp là gỡ nó mà không viết lại lịch sử chung. Trong kho /srv/cua-hang, xem lịch sử để nhận ra commit đổi quy tắc phí ship, rồi hoàn tác đúng commit ấy bằng git revert (lệnh này không nằm trong bài, bảng tra nhanh của terminal có sẵn). Sau đó cat ship.txt để chắc phí đã trở lại 30000.",
    },
  ],
  "volume-bien-moi-truong-va-container-phu-du": [
    {
      type: "sim",
      tool: "terminal",
      mission: "docker-volume",
      title: "Cho dữ liệu Postgres sống qua việc thay container",
      task: "Bài nói dữ liệu để trong container sẽ mất theo nó. Hãy kiểm chứng: tạo volume pgdata, chạy Postgres với -e POSTGRES_PASSWORD và -v pgdata:/var/lib/postgresql/data, xoá container bằng docker rm -f, rồi chạy container mới gắn lại đúng volume để thấy nó khởi động mà không khởi tạo lại.",
    },
  ],
  "dockerfile-va-bo-nho-dem-tung-lop": [
    {
      type: "sim",
      tool: "terminal",
      mission: "docker-build",
      title: "Sắp lại Dockerfile để dựng nhanh",
      task: "Bài giải thích thứ tự lớp quyết định việc cài lại thư viện. Trong /srv/api, đọc Dockerfile hiện tại, ghi lại bằng printf sao cho package.json và package-lock.json được chép trước npm ci, mã nguồn chép sau, rồi build image tên api:1.0.",
    },
  ],
  "du-an-dong-goi-mot-ung-dung": [
    {
      type: "sim",
      tool: "terminal",
      mission: "docker-build",
      title: "Dựng image api đúng thứ tự lớp",
      task: "Trước khi đẩy image, Dockerfile phải dựng lại nhanh khi chỉ đổi mã. Trong /srv/api, sửa Dockerfile để cài thư viện trước khi chép mã nguồn, ghi lại bằng printf, rồi chạy docker build -t api:1.0 . để có image gắn thẻ.",
    },
  ],
  "merge-va-xu-ly-xung-dot": [
    {
      type: "sim",
      tool: "terminal",
      mission: "git-conflict",
      title: "Gộp nhánh và gỡ xung đột ở index.html",
      task: "Hãy trải qua đúng quy trình trong bài. Trong kho /srv/trang-chu, đứng trên main và git merge sua-tieu-de, đọc index.html để thấy các dấu xung đột ở dòng h1, ghi lại tệp với một tiêu đề duy nhất, git add rồi git commit để đóng lần gộp.",
    },
  ],
  "kho-tu-xa-push-pull-clone": [
    {
      type: "sim",
      tool: "terminal",
      mission: "git-push-rejected",
      title: "Push bị từ chối: pull rồi push lại",
      task: "Bài giải thích push bị từ chối là lớp bảo vệ chứ không phải lỗi. Trong kho /srv/blog, chạy git push để đọc thông báo, git pull để lấy bài của đồng nghiệp, xem git log --oneline rồi push lại. Không dùng --force.",
    },
  ],
};
