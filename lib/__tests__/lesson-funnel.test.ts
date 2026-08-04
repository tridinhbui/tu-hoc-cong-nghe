import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** Phễu bài học.
 *
 *  Không dựng Supabase lên: thứ có thể sai ở đây không phải truy vấn mà là
 *  CÁCH ĐẾM, và cách đếm đọc được thẳng từ mã nguồn. Ba thứ được canh, cả ba
 *  đều là loại sai âm thầm - bảng vẫn hiện số, chỉ là số sai.
 *
 *  Bài này cũng canh đúng cái nó phải canh cho chính giai đoạn 1 của kế hoạch:
 *  bảng dùng để quyết có viết lại 396 bài hay không, nên một cách đếm lệch ở
 *  đây sẽ đổi hẳn một quyết định hàng tuần công. */

const src = readFileSync("lib/admin/lesson-funnel.ts", "utf8");

describe("cách đếm", () => {
  it("đếm theo (bài, người), không theo số dòng", () => {
    // Đếm dòng thì một người đọc lại cùng một bài năm lần thành năm người học,
    // và mọi tỉ lệ đều bị người đọc đi đọc lại kéo lệch - lệch mạnh nhất đúng
    // ở những bài hay nhất, tức là kết luận ngược.
    expect(src).toContain("Set<string>");
    expect(src, "phải gom theo user_id").toMatch(/set\.add\(row\.user_id/);
  });

  it("lượt chưa đăng nhập không bị gộp thành một người", () => {
    // Gộp mọi lượt ẩn danh vào một khoá duy nhất sẽ biến hàng trăm khách vãng
    // lai thành đúng một "người học", và mọi bài công khai tụt tỉ lệ.
    expect(src).toMatch(/anon:/);
  });

  it("mốc đọc-hết gồm cả lượt BẤM BỎ QUA", () => {
    // Cổng nhớ lại nằm sau toàn bộ thân bài, nên chạm tới nó nghĩa là đã đọc
    // hết - kể cả khi người học bấm bỏ qua bài tập. Bỏ sự kiện `skip` ra khỏi
    // phép đếm sẽ biến "không muốn làm bài tập" thành "bỏ dở bài học".
    expect(src).toContain("lesson_free_recall_skip");
    expect(src).toContain("lesson_free_recall_start");
    expect(src).toContain("lesson_free_recall_done");
  });
});

describe("phần so sánh whyItMatters", () => {
  it("có ngưỡng số lượt mở tối thiểu", () => {
    // Không có ngưỡng thì một bài hai lượt mở, một lượt bỏ dở, ra 50% - và 50%
    // đó lọt thẳng vào con số dùng để quyết.
    expect(src).toMatch(/MIN_OPENS\s*=\s*\d+/);
    expect(src).toMatch(/opens >= MIN_OPENS/);
  });

  it("nói rõ đây không phải bằng chứng nhân quả", () => {
    // Con số này sẽ được đọc để quyết một việc lớn. Nếu chỗ nào đó trong mã
    // hay giao diện không nói rõ giới hạn của nó, người đọc sẽ mặc định là nó
    // chứng minh nhiều hơn thực tế.
    const panel = readFileSync("components/admin/LessonFunnelPanel.tsx", "utf8");
    expect(src + panel).toMatch(/không phải bằng chứng nhân quả|KHÔNG phải bằng chứng nhân quả/);
  });
});

describe("khi chưa có dữ liệu", () => {
  it("nói rõ lý do thay vì bày bảng rỗng", () => {
    // `lesson_open` là sự kiện mới: trước ngày nó lên production sẽ không có
    // một dòng nào. Một bảng rỗng ở đó đọc thành "không ai bỏ bài nào" - kết
    // luận sai nguy hiểm nhất có thể rút ra từ chỗ này.
    expect(src).toMatch(/Chưa có lượt `lesson_open` nào/);
    const panel = readFileSync("components/admin/LessonFunnelPanel.tsx", "utf8");
    expect(panel).toMatch(/funnel\.reason/);
  });
});

describe("đầu phễu thật sự được ghi", () => {
  it("trang bài học phát sự kiện lesson_open theo slug", () => {
    const page = readFileSync("components/LessonPageClient.tsx", "utf8");
    expect(page).toMatch(/trackFeatureClick\("lesson_open", \{ label: lesson\.slug \}\)/);
  });

  it("và phụ thuộc theo slug, không phải mảng rỗng", () => {
    // Đi từ bài này sang bài kế tiếp KHÔNG unmount component, nên mảng rỗng sẽ
    // chỉ đếm đúng bài đầu tiên của cả phiên đọc - và mọi bài "tiếp theo" trông
    // như không ai mở.
    const page = readFileSync("components/LessonPageClient.tsx", "utf8");
    const at = page.indexOf('trackFeatureClick("lesson_open"');
    expect(page.slice(at, at + 160)).toContain("[lesson.slug]");
  });
});
