/** Tiện ích dùng chung: băm giả, định dạng ngày kiểu Unix, so khác từng dòng. */

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Băm FNV-1a 32 bit, nối nhiều vòng thành chuỗi hex dài tuỳ ý. Không phải
 *  SHA-1 thật - chỉ cần ổn định và trông như mã băm. */
export function fakeHash(input: string, length = 40): string {
  let out = "";
  let seed = 0x811c9dc5;
  let round = 0;
  while (out.length < length) {
    let h = seed ^ round;
    const s = `${round}:${input}`;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    out += (h >>> 0).toString(16).padStart(8, "0");
    seed = h;
    round++;
  }
  return out.slice(0, length);
}

function tzOffset(d: Date, colon = false): string {
  const off = -d.getTimezoneOffset();
  const sign = off >= 0 ? "+" : "-";
  const abs = Math.abs(off);
  return `${sign}${pad2(Math.floor(abs / 60))}${colon ? ":" : ""}${pad2(abs % 60)}`;
}

/** `date`: "Sat Sep 27 10:00:00 +07 2026". */
export function formatUnixDate(ms: number): string {
  const d = new Date(ms);
  const tz = tzOffset(d);
  const short = tz.endsWith("00") ? tz.slice(0, 3) : tz;
  return `${DAYS[d.getDay()]} ${MONTHS[d.getMonth()]} ${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())} ${short} ${d.getFullYear()}`;
}

/** `git log`: "Sat Sep 27 10:00:00 2026 +0700". */
export function formatGitDate(ms: number): string {
  const d = new Date(ms);
  return `${DAYS[d.getDay()]} ${MONTHS[d.getMonth()]} ${d.getDate()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())} ${d.getFullYear()} ${tzOffset(d)}`;
}

/** `ls -l`: "Sep 27 10:00". */
export function formatLsDate(ms: number): string {
  const d = new Date(ms);
  return `${MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2, " ")} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

/** Nhật ký nginx: "2026/09/27 10:00:00". */
export function formatLogDate(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}/${pad2(d.getMonth() + 1)}/${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

/* i18n-ignore-start: cột CREATED/STATUS của docker ps - đầu ra của chính Docker CLI, tiếng Anh như máy thật */
/** "About a minute ago", "5 minutes ago" như cột CREATED của `docker ps`. */
export function timeAgo(ms: number, now: number): string {
  const s = Math.max(0, Math.round((now - ms) / 1000));
  if (s < 60) return s <= 1 ? "Less than a second ago" : `${s} seconds ago`;
  const m = Math.round(s / 60);
  if (m === 1) return "About a minute ago";
  if (m < 60) return `${m} minutes ago`;
  const h = Math.round(m / 60);
  return h === 1 ? "About an hour ago" : `${h} hours ago`;
}
/* i18n-ignore-end */

export function splitLines(content: string): string[] {
  if (!content) return [];
  const lines = content.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  return lines;
}

export type DiffOp = { op: " " | "-" | "+"; line: string };

/** So khác từng dòng bằng LCS - tệp trong mô phỏng đều nhỏ nên O(n·m) là đủ. */
export function diffLines(a: string[], b: string[]): DiffOp[] {
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const ops: DiffOp[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ op: " ", line: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ op: "-", line: a[i++] });
    } else {
      ops.push({ op: "+", line: b[j++] });
    }
  }
  while (i < n) ops.push({ op: "-", line: a[i++] });
  while (j < m) ops.push({ op: "+", line: b[j++] });
  return ops;
}

/** Căn cột như bảng của `docker ps` / `docker images`: mỗi cột cách nhau 3 dấu cách. */
export function table(rows: string[][]): string[] {
  const widths: number[] = [];
  for (const row of rows) row.forEach((cell, i) => (widths[i] = Math.max(widths[i] ?? 0, cell.length)));
  return rows.map((row) =>
    row
      .map((cell, i) => (i === row.length - 1 ? cell : cell.padEnd(widths[i] + 3)))
      .join("")
      .trimEnd()
  );
}
