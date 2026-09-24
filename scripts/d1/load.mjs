#!/usr/bin/env node
// Đổi JSONL đã xuất thành SQL cho D1.
//
// Postgres trả JSON có kiểu thật: true/false là boolean, jsonb là object, text[]
// là mảng. SQLite không có kiểu nào trong ba cái đó, nên mỗi cái phải được đổi
// một cách CÓ CHỦ Ý - và quan trọng hơn, đổi đúng cách mà lớp đọc sau này sẽ
// đọc ngược lại. Chỗ này sai thì không có gì báo: dữ liệu vẫn ghi được, chỉ là
// đọc ra sai kiểu.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";

const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));
const DIR = "scripts/d1/data";
const OUT = "scripts/d1/sql";
mkdirSync(OUT, { recursive: true });

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;

// Mọi nhánh dưới đây đều CHẶN thay vì đoán khi gặp giá trị không đúng hình dạng.
//
// Lý do: cả bốn cách hỏng ở đây đều im lặng. Một object rơi vào nhánh mặc định
// thành chuỗi '[object Object]' - ghi được, không lỗi, và chỉ lộ ra nếu hàng đó
// rơi đúng vào phần trăm nhỏ mà bộ đối chiếu lấy mẫu. Dừng bộ nạp thì xấu xí
// nhưng nó xảy ra ngay, ở đúng hàng gây lỗi, với tên bảng và cột trong thông báo.
//
// Dữ liệu hôm nay đi qua sạch cả bốn chốt - chúng không sửa lỗi nào đang có, mà
// để lần sau lược đồ hoặc dữ liệu đổi hình dạng thì có người biết.
function lit(value, format, where = "") {
  if (value === null || value === undefined) return "NULL";
  const bad = (msg) => { throw new Error(`${where}: ${msg} - giá trị ${JSON.stringify(value).slice(0, 120)}`); };
  switch (format) {
    case "boolean":
      // true/false -> 1/0. Lớp đọc PHẢI đổi ngược, vì trong JS số 0 là falsy
      // nhưng chuỗi "0" thì truthy - đọc nhầm một lần là đảo hết logic.
      return value ? "1" : "0";
    case "jsonb":
    case "json":
    case "text[]":
      // Lưu nguyên văn JSON. text[] của Postgres về JS là mảng, nên nó thành
      // ["a","b"] chứ không phải cú pháp {a,b} của Postgres - cố ý, vì JSON.parse
      // đọc lại được còn cú pháp kia thì phải tự viết bộ phân tích.
      return q(JSON.stringify(value));
    case "integer": case "bigint": case "smallint":
    case "numeric": case "double precision": case "real":
      // Không quote, nên bất cứ thứ gì không phải chữ số sẽ thành SQL hỏng hoặc,
      // tệ hơn, thành một biểu thức chạy được mà sai. Postgres trả `numeric` và
      // `bigint` dưới dạng CHUỖI để giữ độ chính xác, nên chuỗi là hợp lệ ở đây -
      // miễn là nó thật sự là một con số.
      if (typeof value === "number") {
        if (!Number.isFinite(value)) bad("số không hữu hạn");
        if (Number.isInteger(value) && !Number.isSafeInteger(value)) bad("số nguyên vượt ngưỡng an toàn của JS, đã mất chính xác khi JSON.parse");
        return String(value);
      }
      if (typeof value === "string" && /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(value)) return value;
      bad(`cột kiểu ${format} nhận giá trị không phải số`);
      break;
    default:
      // Nhánh này quote mọi thứ thành chuỗi. Một object lọt tới đây sẽ thành
      // '[object Object]' và không ai biết, nên chặn ở đúng chỗ đó.
      if (typeof value === "object") bad(`object rơi vào nhánh text (kiểu ${format}) - lược đồ khai sai kiểu, hoặc thiếu một nhánh JSON`);
      return q(value);
  }
}

const only = process.argv.slice(2);
const files = (only.length ? only.map((t) => `${t}.jsonl`) : readdirSync(DIR)).filter((f) => f.endsWith(".jsonl"));

for (const file of files) {
  const table = file.replace(/\.jsonl$/, "");
  const cols = snap.tables[table].columns;
  const fmt = Object.fromEntries(cols.map((c) => [c.name, c.format]));
  const names = cols.map((c) => c.name);

  const rows = readFileSync(`${DIR}/${file}`, "utf8").split("\n").filter(Boolean).map(JSON.parse);
  if (!rows.length) { console.log(`      0  ${table} (bỏ qua, rỗng)`); continue; }

  const header = `INSERT INTO "${table}" (${names.map((n) => `"${n}"`).join(", ")}) VALUES`;
  const out = [];
  // Gộp theo SỐ BYTE, không theo số hàng và không theo số ký tự.
  //
  // Gộp 500 hàng một lệnh thì user_profiles vượt SQLITE_TOOBIG ngay, vì hàng của
  // nó rộng gấp nhiều lần hàng user_progress. Đổi sang đo độ dài chuỗi thì vẫn
  // hỏng, và đó là cái bẫy thật: `.length` của JS đếm đơn vị mã UTF-16, còn giới
  // hạn của SQLite tính bằng byte. Nội dung ở đây là tiếng Việt, mỗi chữ có dấu
  // tốn 2-3 byte, nên một lô "80 KB" theo ký tự có thể là hơn 150 KB thật.
  // `header` được ghép vào MỖI câu lệnh lúc flush, nên byte của nó phải nằm
  // trong ngân sách chứ không đứng ngoài. Nó lên tới 426 byte ở bảng rộng nhất -
  // nhỏ so với MAX, nhưng nó là số hạng duy nhất trước đây không ai đếm, và hai
  // lần TOOBIG trước đều đến từ một số hạng không ai đếm.
  // `size` là kích thước THẬT của câu lệnh sẽ phát ra, tính đủ mọi ký tự:
  // header + xuống dòng + các tuple + dấu phân cách ",\n" giữa chúng + dấu chấm
  // phẩy cuối. Bản trước cộng "+2" cho dấu phân cách SAU phép kiểm, nên câu lệnh
  // dài nhất ra 40.001 byte - lệch đúng phần cộng sau. Nhỏ tới mức vô hại ở đây,
  // nhưng cả mục sửa này tồn tại để phép đếm khớp thực tế, nên nó phải khớp thật.
  const MAX = 40_000;
  const HEAD = Buffer.byteLength(header, "utf8");
  const stmtBytes = (tupleBytes) => HEAD + 1 + tupleBytes.reduce((a, b) => a + b, 0) + 2 * (tupleBytes.length - 1) + 1;
  let buf = [], sizes = [];
  const flush = () => { if (buf.length) { out.push(`${header}\n${buf.join(",\n")};`); buf = []; sizes = []; } };
  for (const [i, r] of rows.entries()) {
    const tuple = `(${names.map((n) => lit(r[n], fmt[n], `${table}.${n} (hàng ${i + 1})`)).join(", ")})`;
    const bytes = Buffer.byteLength(tuple, "utf8");
    // Một hàng đơn lẻ lớn hơn ngân sách thì gộp lô không cứu được: nó vẫn ra một
    // câu lệnh quá khổ, chỉ khác là không ai biết cho tới lúc D1 từ chối. Dừng ở
    // đây và nói rõ hàng nào, để người sửa biết phải nâng MAX hay tách cột.
    if (stmtBytes([bytes]) > MAX) {
      throw new Error(`${table} hàng ${i + 1}: một hàng chiếm ${bytes} byte, câu lệnh chứa riêng nó đã là ${stmtBytes([bytes])} byte, vượt trần ${MAX}. Nâng MAX hoặc tách cột lớn ra bảng riêng.`);
    }
    if (stmtBytes([...sizes, bytes]) > MAX) flush();
    buf.push(tuple); sizes.push(bytes);
  }
  flush();
  writeFileSync(`${OUT}/${table}.sql`, out.join("\n") + "\n");
  console.log(`${String(rows.length).padStart(7)}  ${table}`);
}
