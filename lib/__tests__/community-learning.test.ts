import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { shortLearnerName } from "@/lib/community-learning";

/** Dải "người thật đang học" ở cuối màn hình Học bài.
 *
 *  Việc nó thay thế là những con số bịa: `getIllustrativeCount()` băm slug bài
 *  học ra một số trong khoảng cho trước, nên "219 người đang học" không đo hoạt
 *  động nào. Cái đáng gác ở đây vì thế KHÔNG phải cách hiển thị, mà là hai điều
 *  dễ trôi mất trong lúc sửa sau này: đường đọc phải qua RPC, và con số hiện ra
 *  phải là số đếm được. */

/** Bỏ chú thích trước khi so khớp.
 *
 *  Ba trong số các phép kiểm dưới đây có dạng "chuỗi X không được xuất hiện", và
 *  cả ba đã đỏ ngay lần chạy đầu vì chúng bắt được đúng đoạn chú thích GIẢI
 *  THÍCH vì sao X không nên xuất hiện: `email` trong dòng "KHÔNG có email",
 *  `getIllustrativeCount` trong đoạn nói khối này thay thế cái gì.
 *
 *  Cách chữa sai sẽ là bỏ những chú thích ấy đi - chúng là phần đáng giữ nhất.
 *  Nên bộ kiểm đọc CODE, và ở đây "code" nghĩa là văn bản đã trừ chú thích.
 *  Hàm này thô: nó không hiểu chuỗi có chứa `//`. Không sao cho ba file này, và
 *  nếu sau này có một chuỗi như vậy thì phép kiểm sẽ đỏ chứ không âm thầm bỏ
 *  qua - hỏng theo chiều an toàn. */
function withoutComments(source: string, kind: "ts" | "sql"): string {
  const noBlock = kind === "ts" ? source.replace(/\/\*[\s\S]*?\*\//g, "") : source;
  const linePattern = kind === "ts" ? /^\s*\/\/.*$/gm : /^\s*--.*$/gm;
  return noBlock.replace(linePattern, "").replace(/\s*\/\/.*$/gm, "");
}

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf-8");

const SQL_RAW = read("../../supabase/migrations/20260903_community_learning_now.sql");
const LIB_RAW = read("../community-learning.ts");
const COMPONENT_RAW = read("../../components/CommunityLearningNow.tsx");

const SQL = withoutComments(SQL_RAW, "sql");
const LIB = withoutComments(LIB_RAW, "ts");
const COMPONENT = withoutComments(COMPONENT_RAW, "ts");

describe("shortLearnerName", () => {
  it("lấy từ ĐẦU, không lấy từ cuối", () => {
    // Quy ước tên người Việt là gọi bằng từ cuối, nhưng cột này có cả tên tiếng
    // Anh, biệt danh một từ và email bị dán vào - từ cuối của "Nguyễn Văn A" là
    // "A", đọc ra không phải một cái tên.
    expect(shortLearnerName("Nguyễn Văn An", "Người học")).toBe("Nguyễn");
    expect(shortLearnerName("Jules", "Người học")).toBe("Jules");
  });

  it("tên rỗng, chỉ khoảng trắng, hoặc null thì dùng chữ thay thế", () => {
    for (const empty of [null, "", "   ", "\n\t"]) {
      expect(shortLearnerName(empty, "Người học")).toBe("Người học");
    }
  });

  it("chữ thay thế đến từ THAM SỐ, không viết cứng trong tầng dữ liệu", () => {
    // Nếu "Người học" nằm trong lib thì người đọc tiếng Anh thấy tiếng Việt, và
    // dictionary-parity không bắt được vì nó chỉ đọc hai từ điển.
    expect(shortLearnerName(null, "A learner")).toBe("A learner");
    expect(LIB).not.toMatch(/Người học/);
  });

  it("tên dài bị cắt kèm dấu lược, không để tràn thẻ", () => {
    const long = shortLearnerName("Bùiiiiiiiiiiiiiiiiiiiiii", "x");
    expect(long).toHaveLength(14);
    expect(long.endsWith("…")).toBe(true);
  });
});

describe("đường đọc phải là RPC SECURITY DEFINER", () => {
  // Đây là cái bẫy đã sập một lần rồi, và ghi lại ở lib/supabase-user.ts: RLS
  // của user_profiles chỉ cho `auth.uid() = id`, còn embedded resource của
  // PostgREST là inner join - nên một câu select từ trình duyệt không trả về ít
  // dòng hơn, nó trả về ĐÚNG MỘT DÒNG của chính người đang đăng nhập, không kèm
  // lỗi nào. Bảng xếp hạng từng chỉ hiện một người vì thế.
  it("lib gọi rpc, không select trực tiếp user_profiles hay user_streaks", () => {
    expect(LIB).toContain('rpc("get_community_learning_now"');
    expect(LIB).not.toMatch(/from\(["']user_profiles["']\)/);
    expect(LIB).not.toMatch(/from\(["']user_streaks["']\)/);
  });

  it("hàm SQL là security definer và cố định search_path", () => {
    expect(SQL).toMatch(/security definer/i);
    expect(SQL).toMatch(/set search_path = public/i);
  });

  it("chỉ cấp execute cho authenticated, thu hồi khỏi public", () => {
    expect(SQL).toMatch(/revoke all on function public\.get_community_learning_now/i);
    expect(SQL).toMatch(/grant execute on function public\.get_community_learning_now\(int, int\) to authenticated/i);
  });

  it("KHÔNG trả về cột nhạy cảm nào", () => {
    // Một hàm security definer bỏ qua RLS, nên danh sách cột nó trả về CHÍNH LÀ
    // policy. Bốn cột dưới đây đều nằm trên user_profiles và đều đọc được từ
    // trong hàm; việc chúng không xuất hiện là một lựa chọn, không phải may.
    for (const secret of ["email", "bio", "total_xp", "avg_quiz_score"]) {
      expect(SQL).not.toContain(secret);
    }
  });

  it("kiểu cột trong returns table khớp schema thật", () => {
    // Đây là lỗi chỉ nổ LÚC GỌI, không phải lúc viết: khai lệch kiểu thì
    // Postgres báo "structure of query does not match function result type",
    // nên nó sống sót qua mọi lần đọc lại file và chỉ hiện ra sau khi ai đó đã
    // dán SQL vào SQL Editor. `user_progress.lesson_id` là bigint,
    // `user_streaks.current_streak` là integer - hai bảng, hai kiểu khác nhau.
    expect(SQL).toMatch(/lesson_id bigint/);
    expect(SQL).not.toMatch(/lesson_id int\b/);
    expect(SQL).toMatch(/current_streak int\b/);
  });

  it("chặn theo số ngày hoạt động, không chỉ theo current_streak", () => {
    // Không có vế này thì danh sách đầy người có chuỗi ngày cao nhưng đã nghỉ
    // hàng tháng, và "đang giữ chuỗi ngày" thành một câu sai theo cách tệ hơn cả
    // con số bịa - vì nó có người thật đứng tên.
    expect(SQL).toMatch(/last_activity_date >= \(current_date - p_days\)/);
  });

  it("loại người đã bị vô hiệu hoá, và so bằng is not true", () => {
    // `is_disabled = false` bỏ sót mọi hàng cũ có giá trị null.
    expect(SQL).toMatch(/is_disabled is not true/);
    expect(SQL).not.toMatch(/is_disabled = false/);
  });
});

describe("chỉ hiện con số đếm được", () => {
  it("khối tự ẩn khi không có ai, và phân biệt chưa-tải với không-có-ai", () => {
    // Gộp hai trạng thái thì lần dựng đầu nào cũng nháy một khối rỗng; mà tệ hơn
    // là nếu khối vẫn hiện lúc rỗng thì nó lại thành một lời hứa không có dữ
    // liệu - đúng thứ nó ra đời để thay.
    expect(COMPONENT).toContain("learners === null || learners.length === 0) return null");
  });

  it("số trong câu phụ là số người TRONG DẢI, không phải một ước lượng", () => {
    expect(COMPONENT).toContain("count: learners.length");
  });

  it("không dùng lại getIllustrativeCount ở đây", () => {
    expect(COMPONENT).not.toContain("getIllustrativeCount");
    expect(COMPONENT).not.toContain("Math.random");
  });

  it("7 ngày ở giao diện khớp p_days truyền vào RPC", () => {
    // Câu phụ nói "trong tuần này". Đổi một bên mà quên bên kia thì câu đó sai,
    // và không có gì khác bắt được vì cả hai đều hợp lệ.
    //
    // Chỉ khớp ĐỐI SỐ THỨ HAI. Bản đầu khớp cả chuỗi `(24, 7)`, nên nó cũng
    // khoá luôn cái trần số người - một con số chẳng liên quan gì tới chữ "tuần
    // này", và khi dải chuyển sang cuộn ngang thì nâng trần lên làm đỏ một bộ
    // kiểm nói về chuyện khác. Một bộ kiểm bắt đúng thứ nó nói mới ngăn được
    // người ta nới nó ra cho qua chuyện.
    expect(COMPONENT).toMatch(/getCommunityLearningNow\(\s*\d+\s*,\s*7\s*\)/);
    expect(SQL).toMatch(/p_days int default 7/);
  });
});
