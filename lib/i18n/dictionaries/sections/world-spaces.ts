/** Chuỗi hiển thị cho ba module dữ liệu không gian 3D:
 *  components/career-district/district-space.ts,
 *  components/lobby/stations.ts, và app/api/world-boss/route.ts.
 *
 *  Cấu trúc (id, toạ độ, kích thước, HP, phần thưởng) vẫn nằm nguyên ở ba nơi
 *  đó; file này chỉ mang chữ. Xem AGENTS.md, mục "Translating the UI".
 *
 *  QUAN TRỌNG: `t.worldSpaces` chưa được nối vào cây Dictionary chính - việc
 *  đó do một tác vụ khác làm ở lib/i18n/dictionaries/sections/index.ts. Đợi
 *  tsc báo lỗi "Property 'worldSpaces' does not exist" là đúng, không phải
 *  lỗi cần sửa ở đây. */

export const worldSpacesVi = {
  worldSpaces: {
    district: {
      exitToStreet: "Ra phố",
      towerLobby: "Tháp Tự Học",
      stageFloor: "Sảnh chặng học",
      towerStopStreet: "Sảnh · ra phố",
      towerStopStage: "Chặng học công nghệ",
      gameSquare: "Quảng trường Game Công nghệ",
      gameSquareShort: "Quảng trường Game",
      park: "Công viên Bến Nghé",
      parkShort: "Công viên",
      center: "Quảng trường Trung tâm",
      cafe: "Cà phê Số & Sách",
      street: "Phố nghề Sài Gòn",
      /** format({ level }) - nối sau subtitle của một địa điểm trong Quảng
       *  trường Game, ví dụ "Định giá & Câu hỏi mưu lược · cần cấp 5". */
      levelRequirement: "cần cấp {level}",
      library: {
        label: "Thư viện Sài Gòn",
        blurb: "Phòng đọc chung, gặp người khác đang học",
      },
      studyGroup: {
        label: "Phòng học nhóm",
        blurb: "Bàn tám ghế, phiên học 25 phút cùng nhóm",
      },
      civic: {
        baBaoCao: {
          label: "Phòng Ba Báo Cáo",
          blurb: "Chạm một khoản, nhìn nó chạy qua cả ba bảng",
        },
        thapLaiKep: {
          label: "Tháp Lãi Kép",
          blurb: "Mỗi tầng một năm - leo để thấy lãi kép",
        },
        phongLbo: {
          label: "Phòng Tầng Vốn",
          blurb: "Nợ ưu tiên dưới, vốn chủ trên - ai mất trước",
        },
        cuaHang: {
          label: "Cửa hàng & Gương thử đồ",
          blurb: "Thử đồ lên người trước khi mua",
        },
        bangVang: {
          label: "Sảnh Bảng vàng",
          blurb: "Ai đang dẫn đầu từng năng lực",
        },
        phongThi: {
          label: "Phòng thi",
          blurb: "Đề thi thử chứng chỉ và kiểm tra chặng",
        },
        canHo: {
          label: "Căn hộ của bạn",
          blurb: "Chuỗi ngày, cúp và mục tiêu nghề của riêng bạn",
        },
        baoTang: {
          label: "Bảo tàng Công nghệ",
          blurb: "Y2K, Morris Worm, sự cố hạ tầng - và bài học đằng sau",
        },
        nhaBanBe: {
          label: "Khu nhà bạn bè",
          blurb: "Ghé thăm chuỗi ngày và tủ cúp của bạn bè",
        },
        vongQuayTien: {
          label: "Phòng Vòng Quay Tiền",
          blurb: "Tiền về trước hay tiền đi trước - và ai đang tài trợ cho ai",
        },
        phanBoRuiRo: {
          label: "Phòng Rủi Ro & Phân Bổ",
          blurb: "Vì sao trộn hai thứ lại ít rủi ro hơn trung bình của chúng",
        },
        banTron: {
          label: "Bàn Tròn Giảng Lại",
          blurb: "Giải thích bằng lời của bạn - chỗ duy nhất biết bạn có thật sự hiểu",
        },
      },
    },
    lobbyStations: {
      hocBai: {
        room: "Phòng học hôm nay",
        blurb: "Bài kế tiếp trong lộ trình của bạn",
        formula: "T(n) = O(n log n)",
        note: "Độ phức tạp - nền của mọi thứ còn lại trong hiệu năng",
      },
      kiemTra: {
        room: "Phòng luyện đề",
        blurb: "Kiểm tra theo chặng, chấm điểm ngay",
        formula: "Độ phủ = Dòng chạy bởi test / Tổng số dòng",
        note: "Bản vá đáng tin khi có test chạy qua nó",
      },
      onTap: {
        room: "Phòng ôn câu sai",
        blurb: "Những câu bạn đã trả lời sai, quay lại đúng lúc",
        formula: "R(t) ≈ e^(−t / S)",
        note: "Đường cong quên: không ôn lại thì trí nhớ rơi theo hàm mũ",
      },
      congCu: {
        room: "Phòng công cụ",
        blurb: "Máy tính độ trễ, dung lượng, chi phí hạ tầng",
        formula: "Little's Law: L = λ × W",
        note: "Số việc trong hệ thống = tốc độ đến × thời gian ở lại",
      },
      cfa: {
        room: "Phòng chứng chỉ",
        blurb: "Bốn miền thi, theo đề cương chính thức",
        formula: "Uptime = Thời gian hoạt động / Tổng thời gian",
        note: "99,9% một tháng là được phép hỏng 43 phút",
      },
      frm: {
        room: "Phòng độ tin cậy",
        blurb: "Quản trị rủi ro vận hành",
        formula: "Ngân sách lỗi = 1 − SLO",
        note: "Phần được phép hỏng trước khi phải dừng phát hành",
      },
      phongVan: {
        room: "Phòng phỏng vấn",
        blurb: "Câu hỏi kỹ thuật, trả lời có chấm",
        formula: "EV = Vốn hoá + Nợ − Tiền mặt",
        note: "Giá trị doanh nghiệp - câu hỏi mở màn của mọi buổi phỏng vấn IB",
      },
      suNghiep: {
        room: "Phòng nghề nghiệp",
        blurb: "Bạn đang cách nghề mình muốn bao xa",
        formula: "ROE = Biên LN × Vòng quay TS × Đòn bẩy",
        note: "Phân rã DuPont: ba nguồn duy nhất tạo ra ROE",
      },
    },
    worldBoss: {
      fallbackName: "Bạo Chúa Sự Cố Hệ Thống (Outage Titan)",
      fallbackDescription:
        "Trùm World Boss Server hàng tuần cực mạnh sở hữu 1.000.000 HP. Toàn bộ người học trên server cùng nhau gây sát thương để giải cứu thị trường!",
      defaultLeaderboardNames: ["Sói Già Silicon Valley", "Thầy Giáo Kiến Trúc", "Chiến Thần Thuật Toán"],
      defaultWarriorName: "Chiến binh Server",
      questions: [
        {
          prompt:
            "Nguyên nhân chính của sự cố sập diện rộng khi một dịch vụ phụ thuộc chậm đi là gì?",
          options: [
            "Các lệnh gọi chờ nhau dồn ứ cho tới khi cạn kết nối và lan sang dịch vụ khác",
            "Máy chủ hết dung lượng ổ đĩa nên không ghi được log",
            "Tên miền hết hạn nên trình duyệt không phân giải được",
          ],
        },
        {
          prompt:
            "Khi tải tăng gấp đôi mà độ trễ tăng gấp mười, nguyên nhân thường gặp nhất là gì?",
          options: [
            "Một điểm nghẽn đã bão hoà nên hàng đợi trước nó dài ra rất nhanh",
            "Trình duyệt người dùng chạy chậm hơn khi có nhiều người cùng vào",
            "Mã nguồn tự động chạy chậm lại để bảo vệ máy chủ",
          ],
        },
        {
          prompt:
            "Chỉ số p99 của độ trễ nói lên điều gì?",
          options: [
            "99% request nhanh hơn mức đó, và 1% chậm nhất mới là phần người dùng nhớ",
            "Độ trễ trung bình của 99% máy chủ trong cụm",
            "Tỷ lệ 99% request thành công không tính lỗi",
          ],
        },
        {
          prompt:
            "Trong một hệ phân tán, thêm bản sao chỉ đọc giải quyết được vấn đề nào?",
          options: [
            "Chia tải đọc, nhưng ghi vẫn dồn về một chỗ và có độ trễ đồng bộ",
            "Chia đều cả tải đọc lẫn tải ghi cho mọi bản sao",
            "Xoá bỏ nhu cầu sao lưu vì dữ liệu đã có nhiều bản",
          ],
        },
        {
          prompt:
            "Đặt chỉ mục lên một cột giúp gì và trả giá bằng gì?",
          options: [
            "Tra thẳng tới dòng cần thay vì quét bảng, đổi lại mỗi lần ghi phải cập nhật thêm",
            "Làm dữ liệu chiếm ít dung lượng hơn và ghi cũng nhanh hơn",
            "Tăng tốc mọi truy vấn, kể cả truy vấn không dùng cột đó",
          ],
        },
        {
          prompt:
            "Vì sao một thao tác nên idempotent khi client có thể thử lại?",
          options: [
            "Vì gói tin có thể tới hai lần, và lần thứ hai không được tạo thêm bản ghi",
            "Vì nó làm request chạy nhanh hơn lần gọi đầu tiên",
            "Vì máy chủ sẽ tự động bỏ qua mọi request trùng lặp",
          ],
        },
        {
          prompt:
            "Cache đặt sai chỗ gây ra hậu quả điển hình nào?",
          options: [
            "Người dùng đọc phải dữ liệu cũ mà không có gì báo là nó cũ",
            "Máy chủ tốn thêm CPU nhưng dữ liệu luôn mới nhất",
            "Truy vấn tới cơ sở dữ liệu tăng lên gấp đôi",
          ],
        },
        {
          prompt:
            "Ngân sách lỗi (error budget) dùng để làm gì?",
          options: [
            "Định lượng phần được phép hỏng, và dừng phát hành khi đã tiêu hết",
            "Ghi nhận chi phí phải bồi thường cho khách khi có sự cố",
            "Đặt hạn mức số lỗi mà mỗi lập trình viên được tạo ra",
          ],
        },
        {
          prompt:
            "Vì sao khoá phiên bản thư viện (lockfile) lại quan trọng?",
          options: [
            "Vì cùng một mã nguồn phải dựng ra cùng một kết quả trên mọi máy",
            "Vì nó ngăn thư viện được cập nhật lên bản vá bảo mật",
            "Vì nó làm quá trình cài đặt gói tốn ít băng thông hơn",
          ],
        },
        {
          prompt:
            "Deadlock xảy ra khi nào?",
          options: [
            "Hai tiến trình giữ tài nguyên của nhau và cùng chờ, không ai nhả ra trước",
            "Một tiến trình chạy quá lâu nên hệ điều hành buộc phải dừng nó",
            "Bộ nhớ đầy nên tiến trình không cấp phát thêm được",
          ],
        },
        {
          prompt:
            "Vì sao mật khẩu phải băm kèm salt chứ không băm trơn?",
          options: [
            "Vì không có salt thì hai mật khẩu giống nhau ra cùng chuỗi băm, tra bảng là lộ",
            "Vì salt làm chuỗi băm ngắn lại nên lưu trữ tiết kiệm hơn",
            "Vì salt cho phép giải mã ngược lại ra mật khẩu gốc khi cần",
          ],
        },
        {
          prompt:
            "Phát hành dần theo tỷ lệ (canary) cho bạn điều gì mà phát hành toàn bộ không có?",
          options: [
            "Một nhóm nhỏ chạm lỗi trước, đủ để quay lui trước khi mọi người dính",
            "Bản mới chạy nhanh hơn vì chỉ phục vụ ít người dùng",
            "Khả năng bỏ qua hoàn toàn bước kiểm thử trước khi phát hành",
          ],
        },
        {
          prompt:
            "Vì sao đo trước khi tối ưu lại là quy tắc?",
          options: [
            "Vì chỗ ta đoán là chậm thường không phải chỗ thật sự tốn thời gian",
            "Vì trình biên dịch chỉ tối ưu được phần mã đã có kết quả đo",
            "Vì tối ưu sớm luôn làm chương trình chạy chậm đi",
          ],
        },
        {
          prompt:
            "Một API trả 401 và một API trả 403 khác nhau ở đâu?",
          options: [
            "401 là chưa biết bạn là ai, 403 là biết rồi và vẫn không cho phép",
            "401 là lỗi phía máy chủ, còn 403 là lỗi phía client",
            "401 là hết hạn phiên, còn 403 là sai địa chỉ endpoint",
          ],
        },
        {
          prompt:
            "Vì sao sao lưu chưa từng khôi phục thử thì chưa tính là sao lưu?",
          options: [
            "Vì chỉ lúc khôi phục mới biết bản sao có đọc được và có đủ dữ liệu không",
            "Vì bản sao sẽ tự hỏng nếu để lâu mà không mở ra",
            "Vì nhà cung cấp chỉ giữ bản sao trong vòng ba mươi ngày",
          ],
        },
      ],
    },
  },
};

export const worldSpacesEn: typeof worldSpacesVi = {
  worldSpaces: {
    district: {
      exitToStreet: "Back to the street",
      towerLobby: "Self-Study Tower",
      stageFloor: "Stage lobby",
      towerStopStreet: "Lobby · back to the street",
      towerStopStage: "Technology learning stages",
      gameSquare: "Technology Game Square",
      gameSquareShort: "Game Square",
      park: "Ben Nghe Park",
      parkShort: "Park",
      center: "Central Plaza",
      cafe: "Digits & Books Cafe",
      street: "Saigon Career Street",
      levelRequirement: "requires level {level}",
      library: {
        label: "Saigon Library",
        blurb: "A shared reading room - meet others who are studying",
      },
      studyGroup: {
        label: "Group study room",
        blurb: "An eight-seat table, 25-minute sessions with your group",
      },
      civic: {
        baBaoCao: {
          label: "Three Statements Room",
          blurb: "Touch one line item and watch it flow through all three statements",
        },
        thapLaiKep: {
          label: "Compound Interest Tower",
          blurb: "One floor per year - climb it to see compounding at work",
        },
        phongLbo: {
          label: "Capital Stack Room",
          blurb: "Senior debt at the bottom, equity on top - who loses first",
        },
        cuaHang: {
          label: "Shop & Fitting Mirror",
          blurb: "Try gear on before you buy it",
        },
        bangVang: {
          label: "Hall of Fame",
          blurb: "Who's leading in each competency",
        },
        phongThi: {
          label: "Exam room",
          blurb: "Certification mock exams, plus stage checkpoints",
        },
        canHo: {
          label: "Your apartment",
          blurb: "Your streak, trophies, and career goals",
        },
        baoTang: {
          label: "Museum of Technology",
          blurb: "Y2K, the Morris worm, the big outages - and the lesson behind each one",
        },
        nhaBanBe: {
          label: "Friends' block",
          blurb: "Visit your friends' streaks and trophy cases",
        },
        vongQuayTien: {
          label: "Cash Cycle Room",
          blurb: "Does cash arrive before it goes out - and who depends on whom",
        },
        phanBoRuiRo: {
          label: "Risk & Allocation Room",
          blurb: "Why mixing two assets can be less risky than either one's average",
        },
        banTron: {
          label: "Teach-Back Round Table",
          blurb: "Explain it in your own words - the only place that knows if you truly understood",
        },
      },
    },
    lobbyStations: {
      hocBai: {
        room: "Today's lesson room",
        blurb: "The next lesson in your path",
        formula: "T(n) = O(n log n)",
        note: "Complexity - the foundation everything else in performance builds on",
      },
      kiemTra: {
        room: "Practice test room",
        blurb: "Stage-by-stage tests, scored instantly",
        formula: "Coverage = Lines run by tests / Total lines",
        note: "A patch is trustworthy when a test actually runs through it",
      },
      onTap: {
        room: "Wrong-answer review room",
        blurb: "The questions you got wrong, resurfaced at the right time",
        formula: "R(t) ≈ e^(−t / S)",
        note: "The forgetting curve: without review, memory decays exponentially",
      },
      congCu: {
        room: "Tools room",
        blurb: "Latency, capacity and infrastructure-cost calculators",
        formula: "Little's Law: L = λ × W",
        note: "Work in the system = arrival rate × time spent in it",
      },
      cfa: {
        room: "Certification room",
        blurb: "All four domains, following the official syllabus",
        formula: "Uptime = Time up / Total time",
        note: "99.9% over a month allows 43 minutes of downtime",
      },
      frm: {
        room: "Reliability room",
        blurb: "Operational risk management",
        formula: "Error budget = 1 − SLO",
        note: "How much may break before releases have to stop",
      },
      phongVan: {
        room: "Interview room",
        blurb: "Technical questions, scored as you answer",
        formula: "EV = Market cap + Debt − Cash",
        note: "Enterprise value - the opening question of every IB interview",
      },
      suNghiep: {
        room: "Career room",
        blurb: "How far you are from the career you want",
        formula: "ROE = Net margin × Asset turnover × Leverage",
        note: "The DuPont breakdown: the only three sources of ROE",
      },
    },
    worldBoss: {
      fallbackName: "Outage Titan",
      fallbackDescription:
        "A massive weekly Server World Boss with 1,000,000 HP. Every learner on the server deals damage together to rescue the market!",
      defaultLeaderboardNames: ["Silicon Valley Old Wolf", "The Architecture Teacher", "Algorithm War God"],
      defaultWarriorName: "Server Warrior",
      questions: [
        {
          prompt:
            "What is the usual origin of a wide outage when one dependency slows down?",
          options: [
            "Calls pile up waiting on each other until connections run out and it spreads",
            "The server runs out of disk space and cannot write logs",
            "The domain expires so browsers can no longer resolve it",
          ],
        },
        {
          prompt:
            "When load doubles but latency grows tenfold, what is most often happening?",
          options: [
            "A bottleneck has saturated, so the queue in front of it grows very fast",
            "Users' browsers slow down when more people are online at once",
            "The code deliberately slows itself down to protect the server",
          ],
        },
        {
          prompt:
            "What does a p99 latency figure tell you?",
          options: [
            "99% of requests are faster than that, and the slowest 1% is what users remember",
            "The average latency across 99% of the servers in the pool",
            "That 99% of requests succeed, errors excluded",
          ],
        },
        {
          prompt:
            "In a distributed system, what does adding a read replica actually solve?",
          options: [
            "It spreads read load, but writes still funnel to one place and lag behind",
            "It spreads read and write load evenly across every replica",
            "It removes the need for backups because the data now exists twice",
          ],
        },
        {
          prompt:
            "What does an index on a column buy you, and what does it cost?",
          options: [
            "Direct lookups instead of a table scan, paid for on every write that updates it",
            "Less storage used, and faster writes as well",
            "Faster queries across the board, including ones that never touch that column",
          ],
        },
        {
          prompt:
            "Why should an operation be idempotent when the client may retry?",
          options: [
            "Because the packet can arrive twice, and the second one must not create a second record",
            "Because it makes the request run faster than the first call did",
            "Because the server automatically discards every duplicate request",
          ],
        },
        {
          prompt:
            "What is the classic consequence of caching in the wrong place?",
          options: [
            "Users read stale data with nothing to tell them it is stale",
            "The server burns more CPU but the data is always current",
            "Queries against the database double in number",
          ],
        },
        {
          prompt:
            "What is an error budget for?",
          options: [
            "Quantifying how much may break, and stopping releases once it is spent",
            "Recording the compensation owed to customers after an incident",
            "Capping how many bugs each developer is allowed to write",
          ],
        },
        {
          prompt:
            "Why does a dependency lockfile matter?",
          options: [
            "Because the same source must build into the same result on every machine",
            "Because it stops libraries from ever receiving security patches",
            "Because it makes installing packages use less bandwidth",
          ],
        },
        {
          prompt:
            "When does a deadlock happen?",
          options: [
            "Two processes each hold what the other needs and both wait, neither yielding",
            "A process runs so long that the operating system has to kill it",
            "Memory fills up so a process can no longer allocate",
          ],
        },
        {
          prompt:
            "Why must passwords be hashed with a salt rather than hashed plain?",
          options: [
            "Without a salt, identical passwords hash identically and a lookup table exposes them",
            "Because a salt shortens the hash so it takes less space to store",
            "Because a salt lets you reverse the hash back to the original password",
          ],
        },
        {
          prompt:
            "What does a canary release give you that a full rollout does not?",
          options: [
            "A small group hits the fault first, early enough to roll back before everyone does",
            "A faster release because it serves fewer users",
            "Permission to skip testing entirely before shipping",
          ],
        },
        {
          prompt:
            "Why is measuring before optimising the rule?",
          options: [
            "Because the part you assume is slow is usually not where the time actually goes",
            "Because the compiler can only optimise code that has been profiled",
            "Because optimising early always makes the program slower",
          ],
        },
        {
          prompt:
            "How do a 401 and a 403 from an API differ?",
          options: [
            "401 means we don't know who you are; 403 means we do, and the answer is still no",
            "401 is a server-side error while 403 is a client-side one",
            "401 means the session expired while 403 means the endpoint address is wrong",
          ],
        },
        {
          prompt:
            "Why is a backup you have never restored not yet a backup?",
          options: [
            "Because only a restore proves the copy is readable and actually complete",
            "Because a copy corrupts itself if left unopened for too long",
            "Because providers only retain copies for thirty days",
          ],
        },
      ],
    },
  },
};
