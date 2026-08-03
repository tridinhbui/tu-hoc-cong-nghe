import { WORRY_REFRAMES, type WorryReframe } from "@/lib/quiet-corner";

/**
 * Cho phép người đọc nói mình đang nặng ở đâu, rồi xếp lại danh sách nỗi lo
 * theo câu trả lời đó.
 *
 * Mười sáu nỗi lo hiện ra đúng một thứ tự, như nhau với mọi người và mọi
 * ngày. Người đang giấu một khoản nợ và người đang sợ mình bắt đầu quá muộn
 * đọc chung một danh sách, và cả hai đều phải lướt qua mười mấy dòng không
 * phải của mình trước khi gặp dòng của mình - đúng vào lúc kiên nhẫn ít nhất.
 *
 * XẾP LẠI chứ không LỌC. Lọc thì gọn hơn, nhưng nó lấy đi thứ người ta chưa
 * biết là mình cần: nỗi lo về tiền và nỗi lo về công việc thường là một, và
 * người bấm "công việc" vẫn nên gặp được dòng nói về số dư tài khoản. Chọn
 * một nhóm là được đưa lên trước, không phải được cắt bớt đi.
 *
 * Ánh xạ theo id nằm riêng khỏi lib/quiet-corner.ts để phần nội dung không
 * phải mang thêm một trục phân loại. Cái giá là hai file có thể lệch nhau,
 * nên có test buộc mọi id đều có nhóm và không nhóm nào trỏ vào id đã biến
 * mất.
 */

export interface WorryTheme {
  id: string;
  /** Nhãn trên chip. Viết như người ta tự nói, không phải như một danh mục. */
  label: string;
  worryIds: readonly string[];
}

export const WORRY_THEMES: readonly WorryTheme[] = [
  {
    id: "so-sanh",
    label: "So với người khác",
    worryIds: ["wr-01", "wr-02", "wr-11"],
  },
  {
    id: "con-so",
    label: "Nhìn vào con số",
    worryIds: ["wr-03", "wr-05", "wr-08"],
  },
  {
    id: "tu-trach",
    label: "Tự trách mình",
    worryIds: ["wr-04", "wr-06", "wr-07"],
  },
  {
    id: "nguoi-than",
    label: "Người thân",
    worryIds: ["wr-09", "wr-10", "wr-12"],
  },
  {
    id: "cong-viec",
    label: "Công việc và tương lai",
    worryIds: ["wr-13", "wr-14", "wr-15", "wr-16"],
  },
];

/**
 * Câu hỏi mở đầu. Không có "tối nay" trong đó: trang này đã biết đọc giờ
 * (getQuietGreeting) và người ta cũng mở nó lúc chín giờ sáng, nên một câu
 * hỏi tự nhận là buổi tối sẽ sai ngay ở lần đầu tiên có người mở nó ban ngày.
 */
export const WORRY_THEME_PROMPT = {
  question: "Lúc này chuyện gì đang nặng nhất?",
  note: "Chọn một nhóm thì những dòng gần bạn nhất được đưa lên trước. Không có dòng nào bị giấu đi.",
  clear: "Bỏ chọn",
  restHeading: "Những điều khác",
} as const;

export interface OrderedWorries {
  /** Nhóm được chọn, theo đúng thứ tự gốc trong WORRY_REFRAMES. */
  matched: readonly WorryReframe[];
  /** Tất cả phần còn lại, cũng theo thứ tự gốc. */
  rest: readonly WorryReframe[];
}

/**
 * Không chọn gì thì trả về đúng danh sách gốc, `matched` rỗng - trang giữ
 * nguyên hình dạng cũ cho tới khi người đọc thực sự nói điều gì đó.
 */
export function orderWorriesByTheme(
  theme: string | null,
  worries: readonly WorryReframe[] = WORRY_REFRAMES
): OrderedWorries {
  const selected = WORRY_THEMES.find((t) => t.id === theme);
  if (!selected) return { matched: [], rest: worries };

  const ids = new Set(selected.worryIds);
  return {
    matched: worries.filter((w) => ids.has(w.id)),
    rest: worries.filter((w) => !ids.has(w.id)),
  };
}
