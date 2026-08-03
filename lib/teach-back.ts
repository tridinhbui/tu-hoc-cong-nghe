/** Bàn tròn giảng lại: người học tự diễn đạt một khái niệm, rồi xem mình
 *  thiếu ý nào.
 *
 *  Đây là thứ quiz bốn lựa chọn không làm được. Chọn được đáp án đúng và giải
 *  thích được cho người khác là hai năng lực khác nhau, và khoảng cách giữa
 *  chúng chính là chỗ người học tưởng mình hiểu.
 *
 *  ĐIỂM Ở ĐÂY KHÔNG ĐI VÀO ĐÂU CẢ, và đó là quyết định có chủ ý. Điểm quiz
 *  trong repo này là số chịu tải: nó nuôi `avg_quiz_score`, cổng mở khoá bài,
 *  và phần trăm năng lực ở /su-nghiep. Cách chấm dưới đây là dò từ khoá, tức
 *  là nó SẼ cho điểm nhầm - viết đúng chữ mà sai ý vẫn qua. Đưa một thước đo
 *  lỏng như vậy vào các con số đó là làm hỏng chúng, đúng kiểu mà AGENTS.md
 *  cảnh báo. Nên bàn tròn chỉ nói "bạn thiếu ý này", không chấm điểm ai.
 *
 *  Vì cùng lý do đó, phản hồi được viết như một tấm gương chứ không như một
 *  giám khảo: nó bày ra ý còn thiếu để người học tự đọc lại, chứ không tuyên
 *  bố bài giảng đúng hay sai. */

export interface KeyPoint {
  id: string;
  /** Ý phải nói tới, viết như người ta sẽ nói. */
  label: string;
  /** Những cách diễn đạt được tính là đã chạm tới ý này.
   *
   *  Viết rộng có chủ ý: mục tiêu là đừng bỏ sót người diễn đạt đúng bằng chữ
   *  khác, chứ không phải bắt cho bằng được người viết bừa. Nhầm theo hướng
   *  khoan dung thì hậu quả là một lời nhắc thừa; nhầm theo hướng khắt khe thì
   *  hậu quả là bảo một người đã hiểu rằng họ chưa hiểu. */
  markers: string[];
}

export interface TeachBackTopic {
  id: string;
  label: string;
  /** Đề bài, viết như người ngồi đối diện đang hỏi. */
  prompt: string;
  /** Người nghe tưởng tượng - đổi giọng người nghe là đổi cả bài giảng. */
  audience: string;
  points: KeyPoint[];
}

/** Bỏ dấu và hạ chữ thường, để "dòng tiền" khớp với "DÒNG TIỀN" và "dong tien".
 *
 *  Người gõ nhanh thường bỏ dấu, và bắt lỗi chính tả không phải việc của căn
 *  phòng này. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ")
    .trim();
}

export interface TeachBackResult {
  /** Id các ý đã chạm tới. */
  hit: string[];
  /** Id các ý còn thiếu - đây mới là phần đáng đọc. */
  missed: string[];
  /** Số từ, để nhắc người viết ba chữ rằng đó chưa phải một lời giải thích. */
  words: number;
  /** Đủ dài để coi là một lời giảng chưa. */
  tooShort: boolean;
}

/** Số từ tối thiểu trước khi phản hồi có nghĩa.
 *
 *  Dưới mức này thì dò từ khoá chỉ đang phản chiếu lại chính đề bài: dán mấy
 *  chữ trong câu hỏi là chạm được vài ý mà chưa giải thích gì. */
export const MIN_WORDS = 25;

export function evaluate(topic: TeachBackTopic, answer: string): TeachBackResult {
  const text = normalize(answer);
  const words = text ? text.split(" ").length : 0;
  const hit: string[] = [];
  const missed: string[] = [];
  for (const p of topic.points) {
    (p.markers.some((m) => text.includes(normalize(m))) ? hit : missed).push(p.id);
  }
  return { hit, missed, words, tooShort: words < MIN_WORDS };
}

export const TOPICS: TeachBackTopic[] = [
  {
    id: "loi-nhuan-vs-tien",
    label: "Lãi mà vẫn chết vì hết tiền",
    audience: "một người bạn mở quán ăn, chưa học tài chính bao giờ",
    prompt:
      "Bạn của bạn nói: 'Quán tôi tháng nào cũng lãi, sao tài khoản cứ cạn?' Giải thích cho họ.",
    points: [
      {
        id: "ghi-nhan",
        label: "Doanh thu được ghi khi bán, không phải khi tiền về",
        markers: ["ghi nhận", "ghi nhan", "bán chịu", "ban chiu", "công nợ", "cong no", "chưa thu", "chua thu", "phải thu", "phai thu"],
      },
      {
        id: "von-luu-dong",
        label: "Tiền kẹt trong hàng tồn và khoản phải thu",
        markers: ["tồn kho", "ton kho", "hàng tồn", "hang ton", "vốn lưu động", "von luu dong", "nhập hàng", "nhap hang"],
      },
      {
        id: "chi-khong-vao-lai",
        label: "Có khoản chi tiền mà không nằm trong lãi lỗ",
        markers: ["trả nợ", "tra no", "mua máy", "mua may", "đầu tư", "dau tu", "tài sản cố định", "tai san co dinh", "gốc vay", "goc vay"],
      },
      {
        id: "khau-hao",
        label: "Ngược lại, có chi phí không hề chi tiền",
        markers: ["khấu hao", "khau hao", "không chi tiền", "khong chi tien", "không ra khỏi két", "khong ra khoi ket"],
      },
    ],
  },
  {
    id: "lai-kep",
    label: "Vì sao lãi kép mạnh muộn chứ không mạnh sớm",
    audience: "em họ 18 tuổi vừa đi làm thêm",
    prompt:
      "Em họ hỏi: 'Gửi 1 triệu mỗi tháng thì bao giờ mới thành nhiều?' Giải thích vì sao thời gian quan trọng hơn số tiền.",
    points: [
      {
        id: "lai-tren-lai",
        label: "Lãi sinh ra lãi, chứ không chỉ vốn sinh ra lãi",
        markers: ["lãi trên lãi", "lai tren lai", "lãi mẹ", "lai me", "lãi chồng lãi", "lai chong lai", "tái đầu tư", "tai dau tu", "cộng dồn", "cong don"],
      },
      {
        id: "phi-tuyen",
        label: "Đường đi cong lên, không phải đường thẳng",
        markers: ["cấp số nhân", "cap so nhan", "hàm mũ", "ham mu", "đường cong", "duong cong", "không tuyến tính", "khong tuyen tinh", "gấp đôi", "gap doi"],
      },
      {
        id: "phan-lon-o-cuoi",
        label: "Phần lớn số tiền đến ở những năm cuối",
        markers: ["năm cuối", "nam cuoi", "về sau", "ve sau", "cuối chặng", "cuoi chang", "10 năm cuối", "10 nam cuoi", "giai đoạn sau", "giai doan sau"],
      },
      {
        id: "bat-dau-som",
        label: "Nên bắt đầu sớm quan trọng hơn bắt đầu nhiều",
        markers: ["bắt đầu sớm", "bat dau som", "càng sớm", "cang som", "thời gian", "thoi gian", "tuổi", "tuoi"],
      },
    ],
  },
  {
    id: "da-dang-hoa",
    label: "Vì sao trộn hai thứ lại ít rủi ro hơn",
    audience: "một đồng nghiệp đang định dồn hết tiền vào một cổ phiếu",
    prompt:
      "Đồng nghiệp nói: 'Chia tiền ra làm gì, tôi chọn đúng một mã là được.' Bạn nói lại thế nào để họ thấy trộn lại an toàn hơn mà không mất lợi nhuận?",
    points: [
      {
        id: "khong-cung-xuong",
        label: "Hai tài sản không cùng xuống một lúc",
        markers: ["tương quan", "tuong quan", "cùng lúc", "cung luc", "ngược chiều", "nguoc chieu", "bù nhau", "bu nhau", "không cùng", "khong cung"],
      },
      {
        id: "duoi-trung-binh",
        label: "Rủi ro danh mục nằm dưới trung bình rủi ro hai phần",
        markers: ["dưới trung bình", "duoi trung binh", "thấp hơn trung bình", "thap hon trung binh", "ít hơn trung bình", "it hon trung binh"],
      },
      {
        id: "loi-nhuan-khong-mat",
        label: "Mà lợi nhuận kỳ vọng thì không mất đi",
        markers: ["lợi nhuận vẫn", "loi nhuan van", "không mất", "khong mat", "giữ nguyên", "giu nguyen", "vẫn bằng", "van bang", "trung bình có trọng số", "trung binh co trong so"],
      },
      {
        id: "gioi-han",
        label: "Nhưng nếu chúng đi khít nhau thì không được gì",
        markers: ["cùng ngành", "cung nganh", "giống nhau", "giong nhau", "khít", "khit", "cùng chiều", "cung chieu", "không được gì", "khong duoc gi"],
      },
    ],
  },
];
