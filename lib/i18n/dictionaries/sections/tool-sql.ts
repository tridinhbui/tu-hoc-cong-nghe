// Chữ của công cụ mô phỏng SQL Console (/cong-cu/sql).
//
// Thông điệp lỗi nguyên văn của bộ máy (lib/mini-sql.ts) được hiện kèm, nhưng
// phần người học đọc để sửa - tiêu đề lỗi, gợi ý, cảnh báo - nằm ở đây.
export const toolSqlVi = {
  toolSql: {
    dbName: "shop.db",
    dbLabel: "Cửa hàng online (mẫu)",
    explorer: "Bảng",
    explorerHint: "Bấm tên bảng để xem 10 dòng đầu. Bấm tên cột để chèn vào câu lệnh.",
    rowsInTable: "{count} dòng",
    primaryKey: "Khoá chính",
    foreignKey: "Khoá ngoại → {table}",
    editorLabel: "Câu lệnh SQL",
    placeholder: "Gõ câu SQL ở đây, ví dụ: SELECT * FROM customers LIMIT 10;",
    run: "Chạy",
    runShortcut: "Ctrl/⌘ + Enter",
    clear: "Xoá câu lệnh",
    tabResults: "Kết quả",
    tabHistory: "Lịch sử",
    rowCount: "{count} dòng",
    elapsed: "{ms} ms",
    nullValue: "NULL",
    rowNumber: "#",
    notRunYet: "Chưa chạy câu lệnh nào. Viết một câu SELECT rồi bấm Chạy, hoặc bấm một bảng ở bên trái.",
    emptyResult: "Câu lệnh chạy đúng nhưng không có dòng nào khớp điều kiện.",
    errorTitle: "Câu lệnh bị lỗi",
    engineSays: "Bộ máy báo",
    suggestion: "Có phải ý bạn là {name}?",
    errorHints: {
      missingSelect: "Câu truy vấn đọc dữ liệu luôn bắt đầu bằng SELECT. Kiểm tra xem có gõ nhầm (SELEC, SLECT) không.",
      missingFrom:
        "Thiếu FROM, hoặc thiếu dấu phẩy giữa hai cột. Sau danh sách cột phải là FROM tên_bảng, và các cột cách nhau bằng dấu phẩy: SELECT name, city FROM customers.",
      missingBy: "GROUP và ORDER luôn đi kèm BY: viết GROUP BY status, ORDER BY price.",
      unknownTable: "Không có bảng tên {name}. Xem danh sách bảng ở cột bên trái - tên bảng phải gõ đúng từng chữ, kể cả hoa thường.",
      unknownColumn:
        "Không có cột {name}. Xem tên cột ở cột bên trái. Nếu bạn đang so sánh với một chữ (như Hà Nội), chữ đó phải nằm trong dấu nháy đơn: 'Hà Nội'.",
      unclosedString: "Có một dấu nháy mở mà chưa đóng. Chuỗi chữ phải nằm gọn trong một cặp nháy: 'delivered'.",
      joinSyntax:
        "JOIN cần đủ ba phần: JOIN tên_bảng ON cột_bảng_này = cột_bảng_kia. Ví dụ: JOIN orders o ON o.customer_id = c.id.",
      trailing:
        "Bộ máy đọc được câu lệnh tới giữa chừng rồi gặp {name}. Hay gặp nhất: quên dấu nháy quanh một chữ, hoặc viết sai thứ tự mệnh đề. Thứ tự đúng: SELECT → FROM → JOIN → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT.",
      incomplete: "Câu lệnh dừng giữa chừng - có thể thiếu tên bảng sau FROM/JOIN, hoặc thiếu vế sau dấu so sánh.",
      other: "Đọc kỹ thông điệp của bộ máy, rồi sửa từng mệnh đề một, chạy lại sau mỗi lần sửa.",
    },
    warningTitle: "Chạy được, nhưng nên xem lại",
    warnings: {
      aggregateWithoutGroupBy:
        "Bạn trộn cột thường với hàm tổng hợp (COUNT, SUM, AVG...) mà không có GROUP BY, nên chỉ nhận về một dòng và giá trị cột thường là lấy đại. Muốn tính theo từng nhóm, thêm GROUP BY với đúng các cột thường đó.",
      equalsNull:
        "So sánh = NULL không bao giờ đúng, kể cả với ô trống, nên kết quả luôn rỗng. Dùng IS NULL hoặc IS NOT NULL.",
    },
    historyEmpty: "Các câu lệnh bạn chạy sẽ hiện ở đây. Bấm một dòng để mở lại.",
    historyError: "Lỗi",
    clearHistory: "Xoá lịch sử",
    missionDone: "Xong nhiệm vụ: {title}",
    missions: {
      "select-all": {
        title: "Xem toàn bộ khách hàng",
        hint: "Bấm bảng customers bên trái, hoặc gõ SELECT * FROM customers",
      },
      "where-city": {
        title: "Chỉ lấy khách ở Hà Nội",
        hint: "Thêm WHERE city = '...' - chữ nằm trong nháy đơn, có dấu.",
      },
      "order-limit": {
        title: "5 sản phẩm đắt nhất, đắt trước",
        hint: "ORDER BY price DESC rồi LIMIT 5",
      },
      "group-count": {
        title: "Đếm số đơn theo từng trạng thái",
        hint: "Dùng COUNT(*) kèm GROUP BY status",
      },
      "having-avg": {
        title: "Danh mục có giá trung bình trên 5.000.000",
        hint: "GROUP BY category, lọc nhóm bằng HAVING AVG(price) > ... (WHERE không lọc được nhóm)",
      },
      "left-join-null": {
        title: "Tìm khách chưa đặt đơn nào",
        hint: "customers LEFT JOIN orders ON ..., rồi WHERE cột của orders IS NULL",
      },
      "best-sellers": {
        title: "Top 3 sản phẩm bán được nhiều cái nhất",
        hint: "JOIN order_items với products, SUM(quantity) theo sản phẩm, sắp giảm dần, LIMIT 3",
      },
      "revenue-per-customer": {
        title: "Tổng tiền mua của từng khách",
        hint: "Nối customers → orders → order_items → products, rồi SUM(quantity * price) GROUP BY khách",
      },
    },
  },
};

export const toolSqlEn: typeof toolSqlVi = {
  toolSql: {
    dbName: "shop.db",
    dbLabel: "Online shop (sample)",
    explorer: "Tables",
    explorerHint: "Click a table name to preview its first 10 rows. Click a column name to insert it into the query.",
    rowsInTable: "{count} rows",
    primaryKey: "Primary key",
    foreignKey: "Foreign key → {table}",
    editorLabel: "SQL query",
    placeholder: "Type SQL here, for example: SELECT * FROM customers LIMIT 10;",
    run: "Run",
    runShortcut: "Ctrl/⌘ + Enter",
    clear: "Clear query",
    tabResults: "Results",
    tabHistory: "History",
    rowCount: "{count} rows",
    elapsed: "{ms} ms",
    nullValue: "NULL",
    rowNumber: "#",
    notRunYet: "No query run yet. Write a SELECT and press Run, or click a table on the left.",
    emptyResult: "The query ran fine, but no rows matched the conditions.",
    errorTitle: "The query has an error",
    engineSays: "Engine message",
    suggestion: "Did you mean {name}?",
    errorHints: {
      missingSelect: "A query that reads data always starts with SELECT. Check for a typo (SELEC, SLECT).",
      missingFrom:
        "FROM is missing, or a comma between two columns is. The column list must be followed by FROM table_name, and columns are separated by commas: SELECT name, city FROM customers.",
      missingBy: "GROUP and ORDER always take BY: write GROUP BY status, ORDER BY price.",
      unknownTable: "There is no table called {name}. Check the table list on the left - names must match exactly, including case.",
      unknownColumn:
        "There is no column called {name}. Check the column names on the left. If you are comparing against text (a city name, a status), that text must be in single quotes: 'delivered'.",
      unclosedString: "A quote was opened and never closed. Text values must sit inside a pair of quotes: 'delivered'.",
      joinSyntax:
        "A JOIN needs three parts: JOIN table_name ON this_table_column = other_table_column. For example: JOIN orders o ON o.customer_id = c.id.",
      trailing:
        "The engine read part of the query and then hit {name}. The usual causes: missing quotes around text, or clauses in the wrong order. The right order is SELECT → FROM → JOIN → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT.",
      incomplete: "The query stops halfway - perhaps a table name is missing after FROM/JOIN, or one side of a comparison is.",
      other: "Read the engine message carefully, then fix one clause at a time and run again after each change.",
    },
    warningTitle: "It ran, but take another look",
    warnings: {
      aggregateWithoutGroupBy:
        "You mixed plain columns with an aggregate (COUNT, SUM, AVG...) without GROUP BY, so you get a single row and the plain column's value is arbitrary. To compute per group, add GROUP BY with those plain columns.",
      equalsNull:
        "Comparing = NULL is never true, not even for an empty cell, so the result is always empty. Use IS NULL or IS NOT NULL.",
    },
    historyEmpty: "Queries you run will appear here. Click one to reopen it.",
    historyError: "Error",
    clearHistory: "Clear history",
    missionDone: "Mission complete: {title}",
    missions: {
      "select-all": {
        title: "View every customer",
        hint: "Click the customers table on the left, or type SELECT * FROM customers",
      },
      "where-city": {
        title: "Only customers in Hanoi",
        hint: "Add WHERE city = '...' - text goes in single quotes, spelled exactly as stored (preview the table to see it).",
      },
      "order-limit": {
        title: "The 5 most expensive products, priciest first",
        hint: "ORDER BY price DESC, then LIMIT 5",
      },
      "group-count": {
        title: "Count orders by status",
        hint: "Use COUNT(*) together with GROUP BY status",
      },
      "having-avg": {
        title: "Categories with an average price above 5,000,000",
        hint: "GROUP BY category, filter groups with HAVING AVG(price) > ... (WHERE cannot filter groups)",
      },
      "left-join-null": {
        title: "Find customers who never ordered",
        hint: "customers LEFT JOIN orders ON ..., then WHERE an orders column IS NULL",
      },
      "best-sellers": {
        title: "Top 3 products by units sold",
        hint: "JOIN order_items to products, SUM(quantity) per product, sort descending, LIMIT 3",
      },
      "revenue-per-customer": {
        title: "Total spend per customer",
        hint: "Chain customers → orders → order_items → products, then SUM(quantity * price) GROUP BY customer",
      },
    },
  },
};
