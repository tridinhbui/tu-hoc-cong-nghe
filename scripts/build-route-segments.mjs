// Sinh danh sách đoạn đường dẫn cấp một CÓ THẬT trong app/, để proxy phân biệt
// "trang riêng tư, phải đăng nhập" với "đường dẫn không tồn tại".
//
// Trước đây proxy chặn theo nguyên tắc mặc-định-từ-chối và không có cách nào
// biết route có tồn tại hay không, nên khách vãng lai gõ nhầm một URL sẽ bị đá
// về /login?next=/url-go-nham, đăng nhập xong mới thấy 404. Danh sách này chỉ
// dùng đúng cho phép phân biệt đó - nó KHÔNG cấp quyền vào bất cứ trang nào.
//
// Sinh từ hệ tệp chứ không gõ tay, và có lib/__tests__/route-segments.test.ts
// sinh lại rồi so sánh, vì file này lệch khỏi thư mục app/ thì hỏng theo kiểu
// im lặng. Một bảng slug gõ tay trong chính proxy.ts đã lệch 767 commit mà
// không ai thấy - xem ghi chú ở đầu proxy.ts.
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = "app";

export function collectRouteSegments(appDir = APP_DIR) {
  const segments = new Set();

  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const name = entry.name;
      // Thư mục gạch dưới là private folder của App Router, không thành route.
      if (name.startsWith("_")) continue;
      // Route group (thư mục trong ngoặc) không tạo ra đoạn đường dẫn nào -
      // con của nó mới là đoạn cấp một, nên đi xuyên qua.
      if (name.startsWith("(") && name.endsWith(")")) {
        walk(join(dir, name));
        continue;
      }
      // Đoạn động ở cấp một sẽ khớp mọi thứ; hiện không có, và nếu sau này có
      // thì phép kiểm dưới đây phải bỏ hẳn chứ không phải liệt kê nó vào.
      if (name.startsWith("[")) {
        throw new Error(
          `Đoạn động ở cấp một (${name}) làm danh sách này vô nghĩa - xem ghi chú trong proxy.ts`
        );
      }
      segments.add(name);
    }
  };

  walk(appDir);
  return [...segments].sort();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const segments = collectRouteSegments();
  writeFileSync(
    "lib/route-segments.json",
    `${JSON.stringify(segments, null, 2)}\n`
  );
  console.log(`lib/route-segments.json: ${segments.length} đoạn cấp một`);
}
