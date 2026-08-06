import { describe, expect, it } from "vitest";
import { priceBond } from "../bond-pricing";

/**
 * Bai kiem nay ton tai vi widget trai phieu tung dinh gia bang C/r - cong thuc
 * cua trai phieu vinh vien - cho mot trai phieu dao han 10 nam, va in ra 83
 * trieu thay vi 92,6. Mot nguoi hoc nhan lai hoi "83tr tinh tren cong thuc
 * nao" moi lo ra.
 */
describe("priceBond", () => {
  it("coupon bang lai suat thi truong thi gia bang dung menh gia", () => {
    expect(priceBond(100, 5, 5, 10).price).toBeCloseTo(100, 10);
    expect(priceBond(100, 8, 8, 3).price).toBeCloseTo(100, 10);
  });

  it("coupon thap hon lai suat thi truong thi ban duoi menh gia, va nguoc lai", () => {
    expect(priceBond(100, 5, 6, 10).price).toBeLessThan(100);
    expect(priceBond(100, 5, 4, 10).price).toBeGreaterThan(100);
  });

  // Chinh la con so nguoi hoc hoi.
  it("cho ra 92,6 trieu voi menh gia 100, coupon 5%, thi truong 6%, 10 nam", () => {
    const p = priceBond(100, 5, 6, 10);
    expect(p.price).toBeCloseTo(92.64, 2);
    expect(p.pvCoupons).toBeCloseTo(36.8, 1);
    expect(p.pvFace).toBeCloseTo(55.84, 2);
    expect(p.annuityFactor).toBeCloseTo(7.3601, 4);
  });

  // Bai kiem quan trong nhat: C/r cung qua duoc hai bai tren, nhung no khong
  // he phu thuoc vao ky han. Gia tri hien tai cua mot trai phieu ban duoi menh
  // gia phai TIEN VE menh gia khi ngay dao han lai gan.
  it("gia tien ve menh gia khi ky han ngan lai - dieu C/r khong the hien", () => {
    const long = priceBond(100, 5, 6, 20).price;
    const mid = priceBond(100, 5, 6, 10).price;
    const short = priceBond(100, 5, 6, 2).price;
    expect(long).toBeLessThan(mid);
    expect(mid).toBeLessThan(short);
    expect(short).toBeLessThan(100);

    // C/r se tra ve dung 83,33 cho ca ba, bat ke ky han.
    const perpetuity = (100 * 5) / 6;
    expect(Math.abs(short - perpetuity)).toBeGreaterThan(5);
  });

  it("dao han cang xa thi cang tiem can gia tri cua trai phieu vinh vien", () => {
    const perpetuity = (100 * 5) / 6;
    expect(priceBond(100, 5, 6, 200).price).toBeCloseTo(perpetuity, 1);
  });

  it("cac phan cong lai dung bang gia", () => {
    const p = priceBond(250, 7, 9, 12);
    expect(p.pvCoupons + p.pvFace).toBeCloseTo(p.price, 10);
    expect(p.coupon).toBeCloseTo(17.5, 10);
  });

  // Thanh truot hien tai khong xuong duoc 0%, nhung mot hang so bi sua la du
  // de ca widget hien NaN.
  it("lai suat 0% khong lam vo phep tinh", () => {
    const p = priceBond(100, 5, 0, 10);
    expect(Number.isFinite(p.price)).toBe(true);
    expect(p.annuityFactor).toBe(10);
    expect(p.price).toBeCloseTo(150, 10);
  });
});
