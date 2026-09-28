// Cơ sở dữ liệu mẫu của /cong-cu/sql: một cửa hàng đồ công nghệ bán online.
//
// Bốn bảng, đúng hình dạng người mới đi làm sẽ gặp đầu tiên: khách hàng, sản
// phẩm, đơn hàng và dòng chi tiết đơn. Dữ liệu được chọn có chủ đích:
// - hai khách chưa từng đặt đơn (id 11, 12), để INNER JOIN và LEFT JOIN cho hai
//   kết quả khác nhau - đúng cái bẫy mà người học cần thấy tận mắt;
// - giá sản phẩm không trùng nhau ở nhóm đầu, để "top 5 đắt nhất" có một đáp án
//   duy nhất;
// - tổng số lượng bán của ba sản phẩm đứng đầu là 7, 6, 5 - không hoà nhau, để
//   nhiệm vụ "bán chạy nhất" không phụ thuộc thứ tự ngẫu nhiên.
//
// Dữ liệu KHÔNG được dịch: nó là dữ liệu người học truy vấn, và đáp án của các
// nhiệm vụ được tính từ chính các giá trị này ('Hà Nội', 'delivered', ...).

import type { Database, Row, SqlValue } from "@/lib/mini-sql";

export type ColumnType = "INTEGER" | "TEXT" | "DATE";

export interface ColumnSchema {
  name: string;
  type: ColumnType;
  /** Khoá chính / khoá ngoại, để thanh bên hiện được quan hệ giữa các bảng. */
  key?: "pk" | "fk";
  /** Bảng mà khoá ngoại trỏ tới. */
  ref?: string;
}

export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
}

/* i18n-ignore-start: sample database schema and rows are data the learner queries by exact value; translating them would change query results and mission answers */
export const SAMPLE_SCHEMA: TableSchema[] = [
  {
    name: "customers",
    columns: [
      { name: "id", type: "INTEGER", key: "pk" },
      { name: "name", type: "TEXT" },
      { name: "city", type: "TEXT" },
      { name: "email", type: "TEXT" },
      { name: "joined_at", type: "DATE" },
    ],
  },
  {
    name: "products",
    columns: [
      { name: "id", type: "INTEGER", key: "pk" },
      { name: "name", type: "TEXT" },
      { name: "category", type: "TEXT" },
      { name: "price", type: "INTEGER" },
    ],
  },
  {
    name: "orders",
    columns: [
      { name: "id", type: "INTEGER", key: "pk" },
      { name: "customer_id", type: "INTEGER", key: "fk", ref: "customers" },
      { name: "order_date", type: "DATE" },
      { name: "status", type: "TEXT" },
    ],
  },
  {
    name: "order_items",
    columns: [
      { name: "id", type: "INTEGER", key: "pk" },
      { name: "order_id", type: "INTEGER", key: "fk", ref: "orders" },
      { name: "product_id", type: "INTEGER", key: "fk", ref: "products" },
      { name: "quantity", type: "INTEGER" },
    ],
  },
];

const CUSTOMERS: SqlValue[][] = [
  [1, "Nguyễn Văn An", "Hà Nội", "an.nguyen@mail.vn", "2025-11-02"],
  [2, "Trần Thị Bình", "Hồ Chí Minh", "binh.tran@mail.vn", "2025-11-15"],
  [3, "Lê Hoàng Cường", "Đà Nẵng", "cuong.le@mail.vn", "2025-12-01"],
  [4, "Phạm Thu Dung", "Hà Nội", "dung.pham@mail.vn", "2026-01-08"],
  [5, "Hoàng Minh Đức", "Hồ Chí Minh", "duc.hoang@mail.vn", "2026-01-20"],
  [6, "Vũ Ngọc Hà", "Hải Phòng", "ha.vu@mail.vn", "2026-02-03"],
  [7, "Đặng Quốc Huy", "Hà Nội", "huy.dang@mail.vn", "2026-02-14"],
  [8, "Bùi Thanh Lan", "Cần Thơ", "lan.bui@mail.vn", "2026-03-01"],
  [9, "Đỗ Gia Long", "Hồ Chí Minh", "long.do@mail.vn", "2026-03-19"],
  [10, "Ngô Bảo Ngọc", "Đà Nẵng", "ngoc.ngo@mail.vn", "2026-04-05"],
  [11, "Dương Khánh Linh", "Hà Nội", "linh.duong@mail.vn", "2026-05-12"],
  [12, "Lý Tuấn Kiệt", "Huế", "kiet.ly@mail.vn", "2026-06-30"],
];

const PRODUCTS: SqlValue[][] = [
  [1, "Laptop văn phòng 14 inch", "Laptop", 15990000],
  [2, "Laptop đồ hoạ 16 inch", "Laptop", 24490000],
  [3, "Chuột không dây", "Phụ kiện", 390000],
  [4, "Bàn phím cơ", "Phụ kiện", 1890000],
  [5, "Tai nghe Bluetooth", "Âm thanh", 1290000],
  [6, "Loa mini", "Âm thanh", 990000],
  [7, "Điện thoại tầm trung", "Điện thoại", 9490000],
  [8, "Điện thoại cao cấp", "Điện thoại", 19990000],
  [9, "Sạc nhanh 65W", "Phụ kiện", 590000],
  [10, "Màn hình 27 inch", "Màn hình", 5490000],
  [11, "Màn hình 24 inch", "Màn hình", 3290000],
  [12, "Ốp lưng điện thoại", "Phụ kiện", 150000],
];

const ORDERS: SqlValue[][] = [
  [1, 1, "2026-07-02", "delivered"],
  [2, 2, "2026-07-03", "delivered"],
  [3, 3, "2026-07-05", "cancelled"],
  [4, 1, "2026-07-10", "delivered"],
  [5, 4, "2026-07-12", "delivered"],
  [6, 5, "2026-07-15", "shipping"],
  [7, 6, "2026-07-18", "delivered"],
  [8, 2, "2026-07-20", "pending"],
  [9, 7, "2026-07-22", "delivered"],
  [10, 8, "2026-08-01", "delivered"],
  [11, 9, "2026-08-03", "shipping"],
  [12, 10, "2026-08-05", "delivered"],
  [13, 3, "2026-08-09", "delivered"],
  [14, 5, "2026-08-12", "pending"],
  [15, 7, "2026-08-15", "cancelled"],
  [16, 1, "2026-08-20", "shipping"],
];
/* i18n-ignore-end */

const ORDER_ITEMS: SqlValue[][] = [
  [1, 1, 1, 1],
  [2, 1, 3, 2],
  [3, 2, 8, 1],
  [4, 2, 12, 2],
  [5, 3, 5, 1],
  [6, 4, 9, 2],
  [7, 4, 3, 1],
  [8, 5, 10, 1],
  [9, 5, 4, 1],
  [10, 6, 7, 1],
  [11, 6, 12, 1],
  [12, 7, 6, 2],
  [13, 8, 2, 1],
  [14, 9, 3, 3],
  [15, 9, 11, 1],
  [16, 10, 5, 1],
  [17, 10, 12, 2],
  [18, 11, 9, 2],
  [19, 12, 8, 1],
  [20, 12, 12, 1],
  [21, 13, 4, 1],
  [22, 13, 3, 1],
  [23, 14, 6, 1],
  [24, 15, 1, 1],
  [25, 16, 9, 1],
  [26, 16, 5, 1],
];

function table(schema: TableSchema, data: SqlValue[][]) {
  const columns = schema.columns.map((c) => c.name);
  const rows: Row[] = data.map((values) => Object.fromEntries(columns.map((c, i) => [c, values[i] ?? null])));
  return { name: schema.name, columns, rows };
}

const DATA: Record<string, SqlValue[][]> = {
  customers: CUSTOMERS,
  products: PRODUCTS,
  orders: ORDERS,
  order_items: ORDER_ITEMS,
};

/** Tạo một bản cơ sở dữ liệu mới. Bộ máy chỉ đọc (không có INSERT/UPDATE), nhưng
 *  vẫn trả bản mới mỗi lần để không ai vô tình dùng chung một đối tượng bị sửa. */
export function createSampleDb(): Database {
  return Object.fromEntries(SAMPLE_SCHEMA.map((s) => [s.name, table(s, DATA[s.name])]));
}

export const SAMPLE_DB: Database = createSampleDb();
