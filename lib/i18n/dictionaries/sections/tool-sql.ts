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
        from: "Trưởng nhóm CSKH",
        title: "Xuất danh sách tên khách hàng",
        brief: "Cuối tuần team CSKH gọi điện cảm ơn khách. Cần tên của toàn bộ khách hàng đang có trong hệ thống.",
        hint: "Bấm bảng customers bên trái, hoặc gõ SELECT * FROM customers",
        criteria: { match: "Có cột tên của đủ mọi khách hàng" },
      },
      "where-city": {
        from: "Quản lý chi nhánh Hà Nội",
        title: "Danh sách khách ở Hà Nội",
        brief: "Chi nhánh sắp mở cửa hàng trải nghiệm và muốn gửi thư mời. Cần đúng những khách có thành phố là Hà Nội, không lẫn tỉnh khác.",
        hint: "Thêm WHERE city = '...' - chữ nằm trong nháy đơn, có dấu.",
        criteria: { match: "Chỉ khách ở Hà Nội, không sót ai" },
      },
      "order-limit": {
        from: "Trưởng nhóm Marketing",
        title: "5 sản phẩm đắt nhất cho banner cao cấp",
        brief: "Banner \"Hàng cao cấp\" lên trang chủ chiều nay. Cần đúng 5 sản phẩm giá cao nhất, xếp từ đắt xuống rẻ.",
        hint: "ORDER BY price DESC rồi LIMIT 5",
        criteria: { match: "Đúng 5 sản phẩm đắt nhất, giá giảm dần" },
      },
      "group-count": {
        from: "Trưởng bộ phận Vận hành",
        title: "Số đơn theo từng trạng thái",
        brief: "Họp vận hành 9 giờ sáng: mỗi trạng thái đơn (pending, shipping, delivered, cancelled) đang có bao nhiêu đơn? Một dòng cho mỗi trạng thái.",
        hint: "Dùng COUNT(*) kèm GROUP BY status",
        criteria: { match: "Mỗi trạng thái một dòng, số đơn khớp dữ liệu" },
      },
      "having-avg": {
        from: "Giám đốc Kinh doanh",
        title: "Danh mục có giá trung bình trên 5 triệu",
        brief: "Đang tính mở trả góp 0% cho nhóm hàng đắt. Cần những danh mục có giá trung bình sản phẩm trên 5.000.000 đ.",
        hint: "GROUP BY category, lọc nhóm bằng HAVING AVG(price) > ... (WHERE không lọc được nhóm)",
        criteria: { match: "Chỉ các danh mục có giá trung bình > 5.000.000" },
      },
      "left-join-null": {
        from: "Trưởng nhóm CRM",
        title: "Khách đã đăng ký nhưng chưa mua lần nào",
        brief: "CRM muốn gửi mã giảm giá kéo khách mua đơn đầu tiên. Cần danh sách khách chưa có đơn hàng nào.",
        hint: "customers LEFT JOIN orders ON ..., rồi WHERE cột của orders IS NULL",
        criteria: { match: "Đúng những khách chưa có đơn nào" },
      },
      "best-sellers": {
        from: "Trưởng nhóm Kho",
        title: "Top 3 sản phẩm bán chạy để nhập thêm hàng",
        brief: "Kho chốt đơn nhập trước đợt sale. Cần 3 sản phẩm bán ra nhiều cái nhất (tổng số lượng trong order_items), kèm số lượng, nhiều nhất đứng đầu.",
        hint: "JOIN order_items với products, SUM(quantity) theo sản phẩm, sắp giảm dần, LIMIT 3",
        criteria: { match: "Tên + tổng số lượng, xếp giảm dần" },
      },
      "revenue-per-customer": {
        from: "CEO",
        title: "10 khách hàng tạo doanh thu cao nhất",
        brief: "CEO muốn biết 10 khách hàng tạo doanh thu cao nhất để mời vào chương trình khách thân thiết. Doanh thu của một khách = tổng số lượng × giá trên mọi đơn của họ. Cần tên và doanh thu, cao nhất đứng đầu.",
        hint: "Nối customers → orders → order_items → products, SUM(quantity * price) GROUP BY khách, ORDER BY ... DESC, LIMIT 10",
        criteria: { match: "Tên + doanh thu, xếp từ cao xuống thấp" },
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
        from: "Customer support lead",
        title: "Export the customer name list",
        brief: "Support is calling customers this weekend to say thanks. They need the name of every customer in the system.",
        hint: "Click the customers table on the left, or type SELECT * FROM customers",
        criteria: { match: "A name column covering every customer" },
      },
      "where-city": {
        from: "Hanoi branch manager",
        title: "Customers in Hanoi",
        brief: "The branch is opening a showroom and wants to send invitations. They need exactly the customers whose city is Hanoi, no other provinces.",
        hint: "Add WHERE city = '...' - the text goes in single quotes, spelled as stored in the data (with Vietnamese accents).",
        criteria: { match: "Only Hanoi customers, none missing" },
      },
      "order-limit": {
        from: "Marketing lead",
        title: "Top 5 priciest products for the premium banner",
        brief: "The \"Premium picks\" banner goes on the home page this afternoon. It needs exactly the 5 most expensive products, priciest first.",
        hint: "ORDER BY price DESC, then LIMIT 5",
        criteria: { match: "The 5 priciest products, price descending" },
      },
      "group-count": {
        from: "Head of operations",
        title: "Order count per status",
        brief: "Ops meeting at 9am: how many orders are in each status (pending, shipping, delivered, cancelled)? One row per status.",
        hint: "Use COUNT(*) with GROUP BY status",
        criteria: { match: "One row per status, counts match the data" },
      },
      "having-avg": {
        from: "Sales director",
        title: "Categories averaging over 5 million",
        brief: "We are considering 0% instalments for expensive ranges. List the categories whose average product price is above 5,000,000 VND.",
        hint: "GROUP BY category, filter groups with HAVING AVG(price) > ... (WHERE cannot filter groups)",
        criteria: { match: "Only categories averaging > 5,000,000" },
      },
      "left-join-null": {
        from: "CRM lead",
        title: "Signed up but never bought",
        brief: "CRM wants to send a discount code to nudge a first purchase. List the customers who have no orders at all.",
        hint: "customers LEFT JOIN orders ON ..., then WHERE an orders column IS NULL",
        criteria: { match: "Exactly the customers with no orders" },
      },
      "best-sellers": {
        from: "Warehouse lead",
        title: "Top 3 best sellers to restock",
        brief: "The warehouse locks its purchase order before the sale. Give the 3 products with the most units sold (total quantity in order_items), with the quantity, highest first.",
        hint: "JOIN order_items with products, SUM(quantity) per product, sort descending, LIMIT 3",
        criteria: { match: "Name + total units, sorted descending" },
      },
      "revenue-per-customer": {
        from: "CEO",
        title: "Top 10 customers by revenue",
        brief: "The CEO wants the 10 customers who generate the most revenue, to invite them to the loyalty programme. A customer's revenue = quantity × price summed over all their orders. Name and revenue, highest first.",
        hint: "Join customers → orders → order_items → products, SUM(quantity * price) GROUP BY customer, ORDER BY ... DESC, LIMIT 10",
        criteria: { match: "Name + revenue, highest to lowest" },
      },
    },
  },
};
