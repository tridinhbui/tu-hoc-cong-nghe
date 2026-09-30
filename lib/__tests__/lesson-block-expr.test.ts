import { describe, expect, it } from "vitest";
import { evalExpr, parseExpr, xValues } from "@/lib/lesson-blocks/expr.js";

const calc = (src: string, vars: Record<string, number> = {}, names: string[] = Object.keys(vars)) =>
  evalExpr(parseExpr(src, names), { x: 0, ...vars });

describe("lesson-blocks/expr", () => {
  it("respects precedence and parentheses", () => {
    expect(calc("1 + 2 * 3")).toBe(7);
    expect(calc("(1 + 2) * 3")).toBe(9);
    expect(calc("10 - 4 - 3")).toBe(3);
    expect(calc("12 / 3 / 2")).toBe(2);
    expect(calc("2 * 3 ^ 2")).toBe(18);
  });

  it("makes ^ right-associative", () => {
    expect(calc("2 ^ 3 ^ 2")).toBe(512);
  });

  it("handles unary minus", () => {
    expect(calc("-3 + 5")).toBe(2);
    expect(calc("--2")).toBe(2);
    expect(calc("-2 ^ 2")).toBe(4); // unary binds tighter than ^ in this grammar
    expect(calc("4 - -1")).toBe(5);
  });

  it("evaluates x, params and whitelisted functions", () => {
    expect(calc("x * rate", { x: 4, rate: 2.5 }, ["rate"])).toBe(10);
    expect(calc("min(3, 1, 2) + max(1, 5)")).toBe(6);
    expect(calc("round(2.6) + abs(-1) + floor(1.9) + ceil(1.1)")).toBe(7);
  });

  it("rejects unknown names, functions and characters", () => {
    for (const bad of ["constructor", "window", "y + 1", "alert(1)", "x; 1", "x[0]", "x.y", "'a'", "Math.max(1)", "x =  1", "1 +"]) {
      expect(() => parseExpr(bad, []), bad).toThrow();
    }
  });

  it("caps xValues and handles bad ranges", () => {
    expect(xValues({ from: 0, to: 1, step: 0.25 })).toEqual([0, 0.25, 0.5, 0.75, 1]);
    expect(xValues({ from: 0, to: 1e9, step: 1 })).toHaveLength(200);
    expect(xValues({ from: 1, to: 0, step: 1 })).toEqual([]);
  });
});
