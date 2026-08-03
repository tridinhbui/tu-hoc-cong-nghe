// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ExcelPractice from "@/components/ExcelPractice";

afterEach(cleanup);

function formulaBar() {
  return screen.getByPlaceholderText("Gõ công thức, bắt đầu bằng dấu =");
}

function type(text: string) {
  fireEvent.change(formulaBar(), { target: { value: text } });
  fireEvent.click(screen.getByRole("button", { name: "Kiểm tra" }));
}

describe("ExcelPractice - lưới", () => {
  it("nhận công thức đúng và hiện lời giải thích", () => {
    render(<ExcelPractice setKey="excel-shortcuts" />);
    type("=SUM(B2:B13)");
    expect(screen.getByText(/Đúng\./)).toBeTruthy();
    expect(screen.getAllByText(/Ctrl \+ Shift/).length).toBeGreaterThan(0);
  });

  it("nhận cả cách viết khác cho cùng kết quả", () => {
    render(<ExcelPractice setKey="excel-shortcuts" />);
    type("=SUM(B2:B7)+SUM(B8:B13)");
    expect(screen.queryByText(/Đúng\./)).toBeTruthy();
  });

  it("từ chối công thức sai và nói ô đó đang ra bao nhiêu", () => {
    render(<ExcelPractice setKey="excel-shortcuts" />);
    type("=SUM(B2:B12)");
    expect(screen.getByText(/chưa phải kết quả cần tìm/)).toBeTruthy();
  });

  it("ô trống thì nói là trống, không nói là sai", () => {
    render(<ExcelPractice setKey="excel-shortcuts" />);
    fireEvent.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/còn trống/)).toBeTruthy();
  });

  it("ràng buộc về cách viết được nêu kèm lý do, không chỉ báo sai", () => {
    render(<ExcelPractice setKey="excel-shortcuts" />);
    // Nhiệm vụ 3 cấm số cứng và bắt khoá tham chiếu.
    fireEvent.click(screen.getByRole("button", { name: "Nhiệm vụ 3" }));
    type("=B2*1.08");
    expect(screen.getByText(/Bỏ 1.08 ra khỏi công thức/)).toBeTruthy();

    type("=B2*(1+F2)");
    expect(screen.getByText(/cần dùng \$F\$2/)).toBeTruthy();
    expect(screen.getByText(/trôi sang F3/)).toBeTruthy();

    type("=B2*(1+$F$2)");
    expect(screen.getByText(/Đúng\./)).toBeTruthy();
  });

  it("lỗi Excel hiện nguyên mã lỗi thay vì bị nuốt", () => {
    render(<ExcelPractice setKey="excel-lookup" />);
    type('=INDEX(C2:C6, MATCH("KHONGCO", A2:A6, 0))');
    expect(screen.getAllByText(/#N\/A/).length).toBeGreaterThan(0);
  });

  it("bài tìm lỗi dữ liệu: sửa ô nguồn xong thì công thức mới đúng", () => {
    render(<ExcelPractice setKey="excel-lookup" />);
    fireEvent.click(screen.getByRole("button", { name: "Nhiệm vụ 2" }));
    type("=INDEX(C2:C6, MATCH(E4, A2:A6, 0))");
    expect(screen.getAllByText(/#N\/A/).length).toBeGreaterThan(0);

    // Sửa khoảng trắng thừa trong ô A3 rồi kiểm lại - không cần sửa công thức.
    fireEvent.click(screen.getAllByText("HPG")[0]);
    fireEvent.change(formulaBar(), { target: { value: "HPG" } });
    fireEvent.click(screen.getByRole("button", { name: "Nhiệm vụ 2" }));
    fireEvent.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Đúng\./)).toBeTruthy();
  });

  it("tham chiếu vòng được gọi tên kèm chuỗi ô, không treo", () => {
    render(<ExcelPractice setKey="excel-three-statement" />);
    type("=B5");
    expect(screen.getAllByText(/#CIRC!/).length).toBeGreaterThan(0);
    expect(screen.getByText(/B5 → B5/)).toBeTruthy();
  });

  it("gợi ý ẩn cho tới khi được yêu cầu", () => {
    render(<ExcelPractice setKey="excel-audit" />);
    expect(screen.queryByText("=SUM(B2:B4)")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Gợi ý" }));
    expect(screen.getByText("=SUM(B2:B4)")).toBeTruthy();
  });
});

describe("ExcelPractice - xếp bước", () => {
  it("thứ tự ban đầu không phải đáp án", () => {
    render(<ExcelPractice setKey="excel-power-query" />);
    fireEvent.click(screen.getByRole("button", { name: "Kiểm tra thứ tự" }));
    expect(screen.getByText(/đang sai chỗ/)).toBeTruthy();
  });
});

describe("ExcelPractice - SQL", () => {
  function runSql(sql: string) {
    fireEvent.change(screen.getByPlaceholderText("SELECT ..."), { target: { value: sql } });
    fireEvent.click(screen.getByRole("button", { name: "Chạy truy vấn" }));
  }

  it("chạy truy vấn đúng và hiện bảng kết quả", () => {
    render(<ExcelPractice setKey="excel-sql" />);
    runSql("SELECT ma, so_luong FROM danh_muc WHERE so_luong >= 1000");
    expect(screen.getByText(/Đúng\./)).toBeTruthy();
    expect(screen.getByText("3 dòng")).toBeTruthy();
  });

  it("truy vấn sai vẫn hiện bảng để nhìn ra mình đã lấy về cái gì", () => {
    render(<ExcelPractice setKey="excel-sql" />);
    runSql("SELECT ma, so_luong FROM danh_muc");
    expect(screen.getByText("6 dòng")).toBeTruthy();
    expect(screen.queryByText(/Đúng\./)).toBeNull();
  });

  it("lỗi cú pháp báo bằng lời chứ không làm sập widget", () => {
    render(<ExcelPractice setKey="excel-sql" />);
    runSql("SELECT ma FROM bang_khong_ton_tai");
    expect(screen.getByText(/Không có bảng/)).toBeTruthy();
  });

  it("NULL trong kết quả hiện rõ chứ không hiện thành ô trống", () => {
    render(<ExcelPractice setKey="excel-sql" />);
    runSql("SELECT d.ma, g.gia FROM danh_muc d LEFT JOIN gia g ON d.ma = g.ma");
    expect(screen.getAllByText("NULL").length).toBeGreaterThan(0);
  });
});
