/**
 * Chạy mã của người học trong Web Worker và trả về đầu ra.
 *
 * Hai worker nằm ở public/runners/ (tệp tĩnh, cùng origin, nên CSP
 * `script-src 'self'` của trang cho phép tạo chúng). Mỗi ngôn ngữ giữ một
 * worker sống lâu: với Python đó là thứ giữ cho 10 MB Pyodide chỉ tải một lần.
 *
 * Quá giờ thì terminate() - cách duy nhất dừng một vòng lặp vô hạn - và lần
 * chạy sau tạo worker mới. Với Python nghĩa là tải lại Pyodide (từ cache của
 * trình duyệt, nên nhanh hơn lần đầu nhiều).
 */
import type { RunnableLanguage } from "@/lib/lesson-types";

export interface RunResult {
  ok: boolean;
  stdout: string;
  error?: string;
  /** Dòng lỗi trong mã của người học, đếm từ 1, nếu xác định được. */
  line?: number;
  timedOut?: boolean;
  /** Không tải được bộ chạy (thường là mất mạng khi tải Pyodide). */
  loadFailed?: boolean;
  /** Mã gọi input() - thứ bộ chạy trong trình duyệt không hỗ trợ. */
  inputUnsupported?: boolean;
}

const WORKER_URL: Record<RunnableLanguage, string> = {
  javascript: "/runners/js-runner.js",
  python: "/runners/python-runner.js",
};

/** Thời gian cho một lần chạy, KHÔNG tính thời gian tải bộ chạy. */
export const RUN_TIMEOUT_MS: Record<RunnableLanguage, number> = {
  javascript: 3000,
  python: 8000,
};
const LOAD_TIMEOUT_MS = 90_000;

const workers: Partial<Record<RunnableLanguage, Worker>> = {};
const ready: Partial<Record<RunnableLanguage, Promise<void>>> = {};
let nextId = 1;

function getWorker(language: RunnableLanguage): Worker {
  let w = workers[language];
  if (!w) {
    w = new Worker(WORKER_URL[language]);
    workers[language] = w;
  }
  return w;
}

function kill(language: RunnableLanguage) {
  workers[language]?.terminate();
  delete workers[language];
  delete ready[language];
}

function request(language: RunnableLanguage, payload: Record<string, unknown>, timeoutMs: number): Promise<RunResult> {
  const worker = getWorker(language);
  const id = nextId++;
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      worker.removeEventListener("message", onMessage);
      kill(language);
      resolve({ ok: false, stdout: "", timedOut: true });
    }, timeoutMs);
    function onMessage(e: MessageEvent) {
      if (!e.data || e.data.id !== id) return;
      clearTimeout(timer);
      worker.removeEventListener("message", onMessage);
      const data = e.data as RunResult;
      if (data.loadFailed) kill(language);
      resolve({
        ok: Boolean(data.ok),
        stdout: data.stdout ?? "",
        error: data.error,
        line: data.line,
        loadFailed: data.loadFailed,
        inputUnsupported: typeof data.error === "string" && data.error.includes("INPUT_UNSUPPORTED"),
      });
    }
    worker.addEventListener("message", onMessage);
    worker.postMessage({ id, ...payload });
  });
}

/** Bộ chạy của ngôn ngữ này đã sẵn sàng chưa - để giao diện biết có cần báo
 *  "đang tải Python" hay không. */
export function isRunnerWarm(language: RunnableLanguage): boolean {
  return language === "javascript" || ready[language] !== undefined;
}

async function ensureReady(language: RunnableLanguage): Promise<RunResult | null> {
  if (language === "javascript") return null;
  if (!ready[language]) {
    const pending = request(language, { type: "warm" }, LOAD_TIMEOUT_MS).then((r) => {
      if (!r.ok) throw r;
    });
    ready[language] = pending;
  }
  try {
    await ready[language];
    return null;
  } catch (failure) {
    kill(language);
    const r = failure as RunResult;
    return { ...r, ok: false, loadFailed: true, timedOut: false };
  }
}

export async function runCode(language: RunnableLanguage, code: string): Promise<RunResult> {
  const loadFailure = await ensureReady(language);
  if (loadFailure) return loadFailure;
  return request(language, { type: "run", code }, RUN_TIMEOUT_MS[language]);
}
