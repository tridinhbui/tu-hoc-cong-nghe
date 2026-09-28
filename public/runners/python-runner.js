// Chạy mã Python của người học bằng Pyodide (CPython biên dịch sang
// WebAssembly), trong một Web Worker.
//
// Pyodide nặng cỡ 10 MB, nên nó chỉ được tải khi người học bấm "Chạy" lần đầu,
// không phải khi mở bài. Sau đó worker được giữ lại và mỗi lần chạy dùng một
// namespace mới, để biến của lần trước không rò sang lần sau.
//
// Phiên bản được ghim: cập nhật thì đổi cả chỗ này lẫn CSP trong
// next.config.ts và public/_headers (đường dẫn /pyodide/ ở đó không ghim phiên
// bản, nên thường chỉ phải đổi chỗ này).

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/";

let booting = null;

function boot() {
  if (!booting) {
    booting = (async () => {
      importScripts(PYODIDE_URL + "pyodide.js");
      const py = await loadPyodide({ indexURL: PYODIDE_URL });
      // input() không có bàn phím để đọc trong worker. Thay nó bằng một hàm
      // ném một MÃ, không ném câu chữ: worker không biết ngôn ngữ của trang,
      // lib/code-runner/run.ts đổi mã này thành cờ `inputUnsupported` và giao
      // diện tự dịch. (Chặn ở stdin thì Pyodide biến nó thành một OSError
      // chung chung, mất luôn cái mã.)
      py.runPython(
        "import builtins\n" +
          "def _input_unsupported(*args, **kwargs):\n" +
          "    raise RuntimeError('INPUT_UNSUPPORTED')\n" +
          "builtins.input = _input_unsupported\n",
      );
      return py;
    })();
    booting.catch(() => {
      booting = null;
    });
  }
  return booting;
}

// Traceback của Pyodide có cả khung của chính Pyodide. Người học chỉ cần dòng
// cuối (loại lỗi + thông điệp) và số dòng trong mã của họ.
function summarize(message) {
  const lines = String(message).trim().split("\n");
  let line;
  const re = /File "<exec>", line (\d+)/g;
  let m;
  while ((m = re.exec(message))) line = Number(m[1]);
  return { error: lines[lines.length - 1], line };
}

self.onmessage = async (event) => {
  const { id, type, code } = event.data || {};

  let py;
  try {
    py = await boot();
  } catch (err) {
    self.postMessage({ id, ok: false, loadFailed: true, stdout: "", error: String(err && err.message ? err.message : err) });
    return;
  }

  if (type === "warm") {
    self.postMessage({ id, ok: true, ready: true, stdout: "" });
    return;
  }

  const out = [];
  py.setStdout({ batched: (s) => out.push(s) });
  py.setStderr({ batched: (s) => out.push(s) });

  const globals = py.globals.get("dict")();
  try {
    await py.runPythonAsync(code, { globals });
    self.postMessage({ id, ok: true, stdout: out.join("\n") });
  } catch (err) {
    const { error, line } = summarize(err && err.message ? err.message : err);
    self.postMessage({ id, ok: false, stdout: out.join("\n"), error, line });
  } finally {
    globals.destroy();
  }
};
