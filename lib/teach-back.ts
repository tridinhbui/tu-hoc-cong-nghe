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

import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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

/** Phần CẤU TRÚC của ba đề: id đề, id ý, và tập từ khoá dò cho TỪNG NGÔN NGỮ.
 *
 *  Markers là chuỗi hiển thị đặc thù ngôn ngữ - người học gõ câu trả lời bằng
 *  ngôn ngữ nào thì cần bộ từ khoá của ngôn ngữ đó, nên chúng sống trong
 *  district-content.ts như label/audience/prompt, không phải hằng số cấu trúc
 *  dùng chung. Bảng này chỉ giữ id, để `topicsOf` ghép với chữ hiển thị theo
 *  `t` hiện tại. */
const TOPIC_IDS = ["loi-nhuan-vs-tien", "lai-kep", "da-dang-hoa"] as const;
const POINT_IDS: Record<(typeof TOPIC_IDS)[number], string[]> = {
  "loi-nhuan-vs-tien": ["ghi-nhan", "von-luu-dong", "chi-khong-vao-lai", "khau-hao"],
  "lai-kep": ["lai-tren-lai", "phi-tuyen", "phan-lon-o-cuoi", "bat-dau-som"],
  "da-dang-hoa": ["khong-cung-xuong", "duoi-trung-binh", "loi-nhuan-khong-mat", "gioi-han"],
};

/** Chỉ id, dùng khi không cần chữ hiển thị. */
export const TOPIC_ID_LIST: string[] = [...TOPIC_IDS];

/** Ba đề bàn tròn, kèm chữ hiển thị và từ khoá dò theo ngôn ngữ hiện tại của
 *  `t.districtContent.teachBack.topics`. */
export function topicsOf(t: Dictionary): TeachBackTopic[] {
  const copy = t.districtContent.teachBack.topics;
  return TOPIC_IDS.map((topicId) => {
    const topicCopy = copy[topicId];
    return {
      id: topicId,
      label: topicCopy.label,
      audience: topicCopy.audience,
      prompt: topicCopy.prompt,
      // Each topic has its OWN point ids, so indexing across the three topic
      // shapes narrows to `never`. The ids in POINT_IDS are the same ids the
      // dictionary uses; one Record view of the point copy says that to tsc.
      points: POINT_IDS[topicId].map((pointId) => {
        const points = topicCopy.points as Record<
          string,
          { label: string; markers: readonly string[] }
        >;
        return {
          id: pointId,
          label: points[pointId].label,
          markers: [...points[pointId].markers],
        };
      }),
    };
  });
}
