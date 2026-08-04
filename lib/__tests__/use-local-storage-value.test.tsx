// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { notifyLocalStorageChanged, useLocalStorageValue } from "../use-local-storage-value";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const EVENT = "test_key_changed";

function Reader({ storageKey = "k" }: { storageKey?: string }) {
  const value = useLocalStorageValue(storageKey, EVENT);
  return <span data-testid="v">{value ?? "(trống)"}</span>;
}

describe("đọc localStorage như nguồn ngoài", () => {
  it("có giá trị ngay ở lần render đầu, không chớp qua trạng thái rỗng", () => {
    window.localStorage.setItem("k", "ib");
    render(<Reader />);
    expect(screen.getByTestId("v").textContent).toBe("ib");
  });

  it("chưa có gì thì trả null", () => {
    render(<Reader />);
    expect(screen.getByTestId("v").textContent).toBe("(trống)");
  });

  it("cập nhật khi cùng tab ghi rồi báo", () => {
    render(<Reader />);
    act(() => {
      window.localStorage.setItem("k", "cfa");
      notifyLocalStorageChanged(EVENT);
    });
    expect(screen.getByTestId("v").textContent).toBe("cfa");
  });

  it("cập nhật khi tab khác ghi - sự kiện storage", () => {
    render(<Reader />);
    act(() => {
      window.localStorage.setItem("k", "frm");
      window.dispatchEvent(new Event("storage"));
    });
    expect(screen.getByTestId("v").textContent).toBe("frm");
  });

  it("hai nơi cùng đọc một khoá thấy cùng một giá trị sau một lần ghi", () => {
    render(
      <>
        <Reader />
        <Reader />
      </>,
    );
    act(() => {
      window.localStorage.setItem("k", "quant");
      notifyLocalStorageChanged(EVENT);
    });
    for (const node of screen.getAllByTestId("v")) expect(node.textContent).toBe("quant");
  });

  it("mỗi khoá đọc giá trị của riêng nó", () => {
    window.localStorage.setItem("a", "1");
    window.localStorage.setItem("b", "2");
    render(
      <>
        <Reader storageKey="a" />
        <Reader storageKey="b" />
      </>,
    );
    expect(screen.getAllByTestId("v").map((n) => n.textContent)).toEqual(["1", "2"]);
  });
});
