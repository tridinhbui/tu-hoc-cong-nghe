/**
 * Gộp các cặp `X dark:Y` viết thẳng trong JSX thành một class token.
 *
 * CHỈ ánh xạ những cặp KHỚP CHÍNH XÁC định nghĩa token trong app/globals.css.
 * Cặp lệch một bậc sắc độ (ví dụ `text-stone-600 dark:text-stone-400`, mà
 * token `ink-muted` là 500→400) được BỎ QUA có chủ ý: gộp chúng là một thay
 * đổi thị giác, và trộn "đổi giao diện" vào "đổi cách viết" thì lúc có hồi quy
 * sẽ không phân biệt được cái nào gây ra.
 *
 * Chạy: node scripts/tokenize-ui.mjs [--apply]
 * Không có --apply thì chỉ đếm, không ghi gì.
 */
import fs from "fs";
import path from "path";

// Cặp → token. Mỗi dòng đã đối chiếu với giá trị trong `:root` và `.dark`.
const EXACT = {
  ink:              ["stone-900", "stone-100"],
  "ink-body":       ["stone-700", "stone-300"],
  "ink-muted":      ["stone-500", "stone-400"],
  "ink-faint":      ["stone-400", "stone-500"],
  surface:          ["stone-50",  "stone-900"],
  "surface-raised": ["stone-100", "stone-800"],
  "surface-invert": ["stone-900", "stone-100"],
  line:             ["stone-200", "stone-800"],
  "line-soft":      ["stone-100", "stone-800"],
  "line-strong":    ["stone-300", "stone-700"],
  accent:           ["emerald-600", "emerald-400"],
  "accent-soft":    ["emerald-50",  "emerald-950"],
  "accent-line":    ["emerald-200", "emerald-900"],
  warn:             ["amber-600", "amber-400"],
  "warn-soft":      ["amber-50",  "amber-950"],
  danger:           ["red-700", "red-400"],
  "danger-soft":    ["red-50",  "red-950"],
  "danger-line":    ["red-200", "red-900"],
  "surface-sunken": ["stone-200", "stone-800"],
  "ink-soft":       ["stone-600", "stone-400"],
  "ink-heading":    ["stone-800", "stone-200"],
  /* Vế sáng là `white` chứ không phải một sắc độ stone - đây là chữ nằm trên
     nút nền đảo, và 78 chỗ thật viết đúng `text-white`. Xem ghi chú ở
     app/globals.css về việc đặt token theo call site. */
  "ink-invert":     ["white", "stone-900"],

  /* Đợt hai. `alert` (rose) tách khỏi `danger` (red) có chủ ý - xem ghi chú
     trong app/globals.css. */
  "alert":            ["rose-600", "rose-400"],
  "alert-strong":     ["rose-700", "rose-400"],
  "alert-deep":       ["rose-800", "rose-400"],
  "alert-ink":        ["rose-900", "rose-200"],
  "alert-line":       ["rose-200", "rose-900"],
  "info":             ["sky-600", "sky-400"],
  "info-line":        ["sky-300", "sky-800"],
  "accent-ink":       ["emerald-800", "emerald-300"],
  "accent-ink-strong":["emerald-900", "emerald-400"],
  "accent-line-mid":  ["emerald-300", "emerald-800"],
  "warn-ink":         ["amber-800", "amber-300"],
  "warn-line-mid":    ["amber-300", "amber-800"],
  "line-firm":        ["stone-400", "stone-600"],
  "surface-deep":     ["stone-300", "stone-700"],
  "line-invert":      ["stone-900", "stone-100"],
  "ink-max":          ["stone-950", "stone-50"],
  "line-mid":       ["stone-200", "stone-700"],
  "accent-strong":  ["emerald-700", "emerald-400"],
  "warn-strong":    ["amber-700", "amber-400"],
  "warn-line":      ["amber-200", "amber-900"],
};

// Thuộc tính nào hợp với token nào. `bg-line` hay `text-surface` là vô nghĩa,
// và cho phép chúng là mời gọi dùng sai vai trò.
const PROPS = {
  ink: ["text"], "ink-body": ["text"], "ink-muted": ["text"], "ink-faint": ["text"],
  surface: ["bg"], "surface-raised": ["bg"], "surface-invert": ["bg"],
  line: ["border"], "line-soft": ["border"], "line-strong": ["border"],
  accent: ["text"], "accent-soft": ["bg"], "accent-line": ["border"],
  warn: ["text"], "warn-soft": ["bg"],
  danger: ["text"], "danger-soft": ["bg"], "danger-line": ["border"],
  // `surface-sunken` có token từ đợt một nhưng BỊ QUÊN ở bảng này, nên 50 cặp
  // `bg-stone-200 dark:bg-stone-800` không được gộp. Bảng RULES sinh từ đây,
  // nên thiếu một dòng ở đây là im lặng bỏ sót, không có lỗi nào.
  "surface-sunken": ["bg"],
  "ink-soft": ["text"], "ink-heading": ["text"], "line-mid": ["border"],
  "ink-invert": ["text"],
  "alert": ["text"], "alert-strong": ["text"], "alert-deep": ["text"],
  "alert-ink": ["text"], "alert-line": ["border"],
  "info": ["text"], "info-line": ["border"],
  "accent-ink": ["text"], "accent-ink-strong": ["text"],
  "accent-line-mid": ["border"],
  "warn-ink": ["text"], "warn-line-mid": ["border"],
  "line-firm": ["border"], "surface-deep": ["bg"],
  "line-invert": ["border"], "ink-max": ["text"],
  "accent-strong": ["text"], "warn-strong": ["text"], "warn-line": ["border"],
};

/* Tiền tố biến thể cũng phải gộp. `hover:bg-stone-100 dark:hover:bg-stone-800`
   là CÙNG MỘT cặp với bản không tiền tố, chỉ khác trạng thái áp dụng - bỏ qua
   chúng là để lại 297 cặp mà lý do duy nhất khiến chúng khác biệt là hai chữ
   `hover:`. Chỉ liệt kê những biến thể thật sự xuất hiện trong repo. */
const BIEN_THE = ["", "hover:", "focus:", "group-hover:", "active:", "focus-visible:"];

const RULES = [];
for (const [tok, [sang, toi]] of Object.entries(EXACT)) {
  for (const prop of PROPS[tok] ?? []) {
    for (const v of BIEN_THE) {
      RULES.push([`${v}${prop}-${sang} dark:${v}${prop}-${toi}`, `${v}${prop}-${tok}`]);
    }
  }
}
// Khớp chuỗi DÀI trước: `hover:bg-x dark:hover:bg-y` phải được thử trước
// `bg-x dark:bg-y`, nếu không phần đuôi của nó bị rule ngắn nuốt mất.
RULES.sort((a, b) => b[0].length - a[0].length);

const files = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".tsx")) files.push(p);
  }
};
walk("app");
walk("components");

const apply = process.argv.includes("--apply");
let tong = 0;
const theoRule = {};
let soTep = 0;

for (const f of files) {
  const truoc = fs.readFileSync(f, "utf8");
  let s = truoc;
  for (const [from, to] of RULES) {
    // Ranh giới cuối BẮT BUỘC. Không có nó, một lớp như
    // `bg-emerald-50 dark:bg-emerald-950/50` (độ mờ CHỈ ở chế độ tối) vẫn khớp
    // phần đầu, `/50` bị bỏ lại lơ lửng và thành `bg-accent-soft/50` - tức là
    // độ mờ giờ áp cho CẢ HAI chế độ. Lần chạy đầu tiên của script này đã làm
    // đúng như vậy ở 186 chỗ trước khi được phát hiện.
    // Ranh giới HAI ĐẦU. Thiếu ranh giới cuối thì `dark:bg-x/50` mất bổ ngữ
    // độ mờ (186 chỗ). Thiếu ranh giới ĐẦU thì
    // `hover:bg-stone-200 dark:bg-stone-800` khớp từ giữa và thành
    // `hover:bg-surface-sunken` - nuốt mất màu nền chế độ tối của trạng thái
    // thường (14 chỗ). Cả hai lỗi đều im lặng: CSS vẫn hợp lệ, chỉ sai màu.
    const re = new RegExp("(?<![\\w/:-])" + from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\w/-])", "g");
    const n = (s.match(re) ?? []).length;
    if (!n) continue;
    s = s.replace(re, to);
    tong += n;
    theoRule[from] = (theoRule[from] ?? 0) + n;
  }
  if (s !== truoc) {
    soTep++;
    if (apply) fs.writeFileSync(f, s);
  }
}

console.log(`${apply ? "ĐÃ GỘP" : "sẽ gộp"} ${tong} cặp trong ${soTep}/${files.length} tệp`);
for (const [k, v] of Object.entries(theoRule).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(String(v).padStart(5), k);
}
