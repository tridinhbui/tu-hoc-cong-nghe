import { describe, expect, it } from "vitest";
import {
  BASE_DRIVERS,
  IMPACTS,
  buildStatements,
  driversAfter,
} from "@/lib/three-statement-model";

/** Mô hình ba báo cáo của Phòng Ba Báo Cáo.
 *
 *  Đây là chỗ duy nhất trong cả thế giới 3D có thể SAI VỀ KIẾN THỨC chứ không
 *  chỉ sai về hình. Một căn phòng dạy sai kế toán còn tệ hơn không có căn phòng
 *  nào, nên mọi con số mà nó khoe với người học đều được kiểm ở đây.
 *
 *  Bản đầu tiên của mô hình cho phép cú tác động sửa thẳng tiền mặt và vốn chủ,
 *  và bảng cân đối lệch ngay ở kịch bản đầu tiên. Bài "bảng cân đối luôn cân"
 *  bên dưới chính là bài đã bắt được điều đó. */

describe("bảng cân đối", () => {
  it("luôn cân, ở trạng thái gốc và sau mọi cú tác động", () => {
    expect(buildStatements(BASE_DRIVERS).balanceCheck).toBe(0);
    for (const impact of IMPACTS) {
      const s = buildStatements(driversAfter(impact.id));
      expect(s.balanceCheck, `${impact.id}: hai vế lệch nhau`).toBe(0);
    }
  });
});

describe("bốn mối nối kinh điển", () => {
  const base = buildStatements(BASE_DRIVERS);

  it("khấu hao tăng thì tiền mặt TĂNG, không giảm", () => {
    const after = buildStatements(driversAfter("depreciation"));
    // Đây là câu chốt của kịch bản; nếu nó sai thì căn phòng dạy ngược.
    expect(after.incomeStatement.netIncome).toBe(base.incomeStatement.netIncome - 80);
    expect(after.balanceSheet.cash - base.balanceSheet.cash).toBe(20);
    expect(after.balanceSheet.ppe).toBe(base.balanceSheet.ppe - 100);
  });

  it("bán chịu thì lãi tăng mà tiền giảm", () => {
    const after = buildStatements(driversAfter("revenue-credit"));
    expect(after.incomeStatement.netIncome).toBe(base.incomeStatement.netIncome + 160);
    expect(after.balanceSheet.cash).toBeLessThan(base.balanceSheet.cash);
    expect(after.balanceSheet.cash - base.balanceSheet.cash).toBe(-40);
  });

  it("mua tài sản không đụng tới lợi nhuận nhưng lấy đi đủ tiền", () => {
    const after = buildStatements(driversAfter("buy-ppe"));
    expect(after.incomeStatement.netIncome).toBe(base.incomeStatement.netIncome);
    expect(after.balanceSheet.cash - base.balanceSheet.cash).toBe(-300);
    expect(after.balanceSheet.totalAssets).toBe(base.balanceSheet.totalAssets);
  });

  it("vay tiền không làm vốn chủ tăng", () => {
    const after = buildStatements(driversAfter("take-debt"));
    expect(after.balanceSheet.equity).toBe(base.balanceSheet.equity);
    expect(after.balanceSheet.cash - base.balanceSheet.cash).toBe(400);
    expect(after.balanceSheet.debt - base.balanceSheet.debt).toBe(400);
  });
});

describe("lưu chuyển tiền tệ", () => {
  it("nối đúng với thay đổi tiền trên bảng cân đối", () => {
    // Bài kiểm mối nối quan trọng nhất: dòng cuối của LCTT phải bằng đúng chênh
    // lệch tiền mặt đầu kỳ và cuối kỳ. Lệch nhau là dấu hiệu một khoản tiền đã
    // được tính hai lần hoặc bỏ quên.
    for (const id of [null, ...IMPACTS.map((i) => i.id)]) {
      const s = buildStatements(driversAfter(id));
      expect(s.balanceSheet.cash, `${id ?? "gốc"}`).toBe(300 + s.cashFlow.netChange);
    }
  });

  it("mỗi kịch bản đều có đủ bốn lời giải thích", () => {
    for (const impact of IMPACTS) {
      for (const key of ["income", "balance", "cashflow", "punchline"] as const) {
        expect(impact.explain[key].length, `${impact.id}.${key}`).toBeGreaterThan(20);
      }
    }
  });
});

/** Hai phòng học còn lại có phần tính toán nằm trong chính component, nhưng
 *  luật của chúng thì kiểm được ở đây bằng cách viết lại đúng công thức - và
 *  nếu công thức trong component đổi mà bài này không đổi theo thì đó chính là
 *  tín hiệu cần đọc lại cả hai. */
describe("thứ tự ưu tiên thanh toán (Phòng Tầng Vốn)", () => {
  const STACK = [
    { id: "senior", amount: 500 },
    { id: "mezz", amount: 200 },
    { id: "equity", amount: 300 },
  ];
  const waterfall = (proceeds: number) => {
    let left = proceeds;
    const paid: Record<string, number> = {};
    for (const t of STACK) {
      const p = Math.min(left, t.amount);
      paid[t.id] = p;
      left -= p;
    }
    return paid;
  };

  it("vốn chủ mất trắng trước khi nợ ưu tiên mất đồng nào", () => {
    // Bán được 600/1000: đủ trả senior (500) và một phần mezz, vốn chủ = 0.
    const p = waterfall(600);
    expect(p.senior).toBe(500);
    expect(p.mezz).toBe(100);
    expect(p.equity).toBe(0);
  });

  it("bán đủ giá thì ai cũng nhận đủ", () => {
    const p = waterfall(1000);
    expect(p).toEqual({ senior: 500, mezz: 200, equity: 300 });
  });

  it("không bao giờ trả quá phần của một tầng", () => {
    for (let proceeds = 0; proceeds <= 1000; proceeds += 50) {
      const p = waterfall(proceeds);
      for (const t of STACK) expect(p[t.id]).toBeLessThanOrEqual(t.amount);
      expect(Object.values(p).reduce((a, b) => a + b, 0)).toBe(Math.min(proceeds, 1000));
    }
  });
});

describe("lãi kép (Tháp Lãi Kép)", () => {
  const fv = (p: number, r: number, y: number) => p * Math.pow(1 + r, y);

  it("mười triệu ở 10% trong 40 năm vượt 450 triệu", () => {
    // 452.59 - tôi ghi 452 ở bản đầu và bài này bắt được. Con số này xuất hiện
    // trong lời quảng cáo tính năng, nên nó phải đúng.
    expect(Math.round(fv(10, 0.1, 40))).toBe(453);
  });

  it("phần lãi vượt phần gốc rất sớm, và chiếm gần hết ở cuối", () => {
    const final = fv(10, 0.1, 40);
    // Sau 40 năm, hơn 97% số tiền là thứ người học không bỏ ra.
    expect((final - 10) / final).toBeGreaterThan(0.97);
  });
});
