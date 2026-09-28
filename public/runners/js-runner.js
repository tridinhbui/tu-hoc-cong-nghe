// Chạy mã JavaScript của người học trong một Web Worker.
//
// Vì sao Worker chứ không phải <iframe sandbox>: một vòng lặp vô hạn trong
// iframe có thể chạy chung luồng với trang và treo cả bài học. Worker thì
// trang cha gọi terminate() được khi quá giờ - xem lib/code-runner/run.ts.
//
// Worker không có DOM, không đọc được cookie hay localStorage của trang, nên
// mã của người học chỉ chạm được vào `console` mà ta đưa cho nó.

function fmt(v) {
  if (typeof v === "string") return v;
  if (v instanceof Error) return v.name + ": " + v.message;
  if (typeof v === "function") return String(v);
  if (v === undefined) return "undefined";
  try {
    const s = JSON.stringify(v);
    return s === undefined ? String(v) : s;
  } catch {
    return String(v);
  }
}

// `new AsyncFunction` bọc mã trong hai dòng tiêu đề; trừ đi để số dòng báo lỗi
// khớp với số dòng người học nhìn thấy.
const HEADER_LINES = 2;
const AsyncFunction = (async function () {}).constructor;

function errorLine(err) {
  const m = /<anonymous>:(\d+):\d+/.exec((err && err.stack) || "");
  return m ? Number(m[1]) - HEADER_LINES : undefined;
}

self.onmessage = async (event) => {
  const { id, code } = event.data || {};
  const out = [];
  const write = (...args) => out.push(args.map(fmt).join(" "));
  const sandboxConsole = { log: write, info: write, warn: write, error: write, debug: write };
  try {
    await new AsyncFunction("console", code)(sandboxConsole);
    self.postMessage({ id, ok: true, stdout: out.join("\n") });
  } catch (err) {
    const message = err && err.name ? err.name + ": " + err.message : String(err);
    self.postMessage({ id, ok: false, stdout: out.join("\n"), error: message, line: errorLine(err) });
  }
};
