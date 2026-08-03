import { describe, it, expect } from "vitest";
import { maxAnswersFor } from "@/app/api/knowledge-challenge/submit/route";
import { CFA_EXAM } from "@/lib/cfa-exam";

/** Trần số câu mỗi lần nộp là một hàng rào chống nhồi request. Bài thi thử CFA
 *  nộp 180 câu một lượt nên phải được nới, nhưng CHỈ nó - nới cho mọi track vì
 *  một màn hình cần nhiều hơn là gỡ hàng rào ở những nơi không cần.
 *
 *  Kiểm ở đây thay vì gọi thật qua HTTP: bước kiểm này nằm SAU bước xác thực,
 *  nên một request không đăng nhập luôn dừng ở 401 và không bao giờ chạm tới
 *  đoạn code cần kiểm. */

describe("trần số câu mỗi lần nộp", () => {
  it("bài thi thử CFA được nộp trọn 180 câu", () => {
    expect(maxAnswersFor({ mode: "cfa-mock", track: "cfa" })).toBe(CFA_EXAM.totalQuestions);
  });

  it("thiếu mode thì vẫn giữ trần cũ, kể cả track cfa", () => {
    expect(maxAnswersFor({ track: "cfa" })).toBe(50);
  });

  it("đúng mode nhưng track khác thì không được nới", () => {
    expect(maxAnswersFor({ mode: "cfa-mock", track: "personal" })).toBe(50);
  });

  it("body rỗng thì về trần mặc định thay vì ném lỗi", () => {
    expect(maxAnswersFor({})).toBe(50);
  });
});
