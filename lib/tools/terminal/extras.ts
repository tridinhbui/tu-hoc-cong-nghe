/** Lệnh Linux bổ sung cho Terminal: lọc văn bản (sort, uniq, cut, printf),
 *  biến môi trường (export, env, printenv, unset), tiến trình (ps, kill) và
 *  mạng cơ bản (dig, nslookup, host, ping) trên một bảng DNS nhỏ cố định. */
/* i18n-ignore-start: đầu ra của chính coreutils, procps và bind-utils - người
   đi làm đọc đúng những dòng tiếng Anh này trên máy thật */
import { HOME, HOST, USER } from "./fs";
import type { CmdResult, Ctx, Proc, TermState } from "./types";
import { formatUnixDate, splitLines } from "./util";

const ok = (out: string[] = []): CmdResult => ({ out, err: [], code: 0 });
const fail = (err: string[] | string, code = 1, out: string[] = []): CmdResult => ({
  out,
  err: Array.isArray(err) ? err : [err],
  code,
});

function readFiles(ctx: Ctx, cmd: string, files: string[], stdin: string | undefined, resolve: (p: string) => string): { lines: string[]; err: string[] } {
  if (!files.length) return { lines: splitLines(stdin ?? ""), err: [] };
  const lines: string[] = [];
  const err: string[] = [];
  for (const f of files) {
    // đọc tệp qua hệ thống tệp trong bộ nhớ
    const parts = resolve(f).split("/").filter(Boolean);
    let node: { type: string; children?: Record<string, unknown>; content?: string } | undefined = ctx.state.root;
    for (const part of parts) node = node?.type === "dir" ? (node.children?.[part] as typeof node) : undefined;
    if (!node) err.push(`${cmd}: ${f}: No such file or directory`);
    else if (node.type === "dir") err.push(`${cmd}: ${f}: Is a directory`);
    else lines.push(...splitLines(node.content ?? ""));
  }
  return { lines, err };
}

// ------------------------------------------------------------- văn bản

export function cmdSort(ctx: Ctx, args: string[], stdin: string | undefined, resolve: (p: string) => string): CmdResult {
  let reverse = false;
  let numeric = false;
  let unique = false;
  const files: string[] = [];
  for (const a of args) {
    if (a.startsWith("-") && a.length > 1 && !a.startsWith("--")) {
      for (const ch of a.slice(1)) {
        if (ch === "r") reverse = true;
        else if (ch === "n") numeric = true;
        else if (ch === "u") unique = true;
        else if (ch !== "h" && ch !== "f") return fail([`sort: invalid option -- '${ch}'`, "Try 'sort --help' for more information."], 2);
      }
    } else files.push(a);
  }
  const { lines, err } = readFiles(ctx, "sort", files, stdin, resolve);
  const num = (l: string) => {
    const m = /^\s*(-?\d+(?:\.\d+)?)/.exec(l);
    return m ? Number(m[1]) : 0;
  };
  const cmp = (a: string, b: string) => (numeric ? num(a) - num(b) || (a < b ? -1 : a > b ? 1 : 0) : a < b ? -1 : a > b ? 1 : 0);
  let sorted = [...lines].sort(cmp);
  if (unique) sorted = sorted.filter((l, i) => i === 0 || cmp(sorted[i - 1], l) !== 0);
  if (reverse) sorted.reverse();
  return { out: sorted, err, code: err.length ? 2 : 0 };
}

export function cmdUniq(ctx: Ctx, args: string[], stdin: string | undefined, resolve: (p: string) => string): CmdResult {
  const flags = new Set<string>();
  const files: string[] = [];
  for (const a of args) {
    if (a.startsWith("-") && a.length > 1) for (const ch of a.slice(1)) flags.add(ch);
    else files.push(a);
  }
  const { lines, err } = readFiles(ctx, "uniq", files.slice(0, 1), stdin, resolve);
  const groups: { line: string; n: number }[] = [];
  for (const l of lines) {
    const last = groups[groups.length - 1];
    if (last && last.line === l) last.n++;
    else groups.push({ line: l, n: 1 });
  }
  const shown = groups.filter((g) => (flags.has("d") ? g.n > 1 : flags.has("u") ? g.n === 1 : true));
  return { out: shown.map((g) => (flags.has("c") ? `${String(g.n).padStart(7)} ${g.line}` : g.line)), err, code: err.length ? 1 : 0 };
}

function parseFieldList(spec: string): number[] | null {
  const out: number[] = [];
  for (const part of spec.split(",")) {
    const m = /^(\d+)(?:-(\d+))?$/.exec(part);
    if (!m) return null;
    const a = Number(m[1]);
    const b = m[2] ? Number(m[2]) : a;
    for (let i = a; i <= b; i++) out.push(i);
  }
  return out.length ? out : null;
}

export function cmdCut(ctx: Ctx, args: string[], stdin: string | undefined, resolve: (p: string) => string): CmdResult {
  let delim = "\t";
  let fields: number[] | null = null;
  let chars: number[] | null = null;
  const files: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "-d") delim = args[++i] ?? delim;
    else if (a.startsWith("-d")) delim = a.slice(2);
    else if (a === "-f") fields = parseFieldList(args[++i] ?? "");
    else if (a.startsWith("-f")) fields = parseFieldList(a.slice(2));
    else if (a === "-c") chars = parseFieldList(args[++i] ?? "");
    else if (a.startsWith("-c")) chars = parseFieldList(a.slice(2));
    else files.push(a);
  }
  if (!fields && !chars) return fail(["cut: you must specify a list of bytes, characters, or fields", "Try 'cut --help' for more information."]);
  const { lines, err } = readFiles(ctx, "cut", files, stdin, resolve);
  const out = lines.map((l) => {
    if (chars) return chars.map((c) => l[c - 1] ?? "").join("");
    if (!l.includes(delim)) return l;
    const parts = l.split(delim);
    return (fields as number[]).filter((f) => f <= parts.length).map((f) => parts[f - 1]).join(delim);
  });
  return { out, err, code: err.length ? 1 : 0 };
}

export function cmdPrintf(args: string[]): CmdResult {
  const [fmt, ...rest] = args;
  if (fmt === undefined) return fail(["printf: usage: printf [-v var] format [arguments]"], 2);
  const unescape = (t: string) => t.replace(/\\([nt\\"'])/g, (_, c: string) => (c === "n" ? "\n" : c === "t" ? "\t" : c));
  const hasSpec = /%[sdi]/.test(fmt);
  let text = "";
  let used = 0;
  do {
    text += unescape(fmt).replace(/%([sdi%])/g, (_m, c: string) => {
      if (c === "%") return "%";
      const v = rest[used++] ?? (c === "s" ? "" : "0");
      return c === "s" ? v : String(parseInt(v, 10) || 0);
    });
  } while (hasSpec && used < rest.length);
  const lines = text.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  return ok(lines);
}

// ------------------------------------------------------------- môi trường

const DEFAULT_ENV: [string, (s: TermState) => string][] = [
  ["SHELL", () => "/bin/bash"],
  ["PWD", (s) => s.cwd],
  ["LOGNAME", () => USER],
  ["HOME", () => HOME],
  ["LANG", () => "en_US.UTF-8"],
  ["USER", () => USER],
  ["EDITOR", () => "nano"],
  ["PATH", () => "/usr/local/bin:/usr/bin:/bin"],
];

/** Giá trị của `$NAME`: biến shell, rồi biến đã export, rồi biến sẵn có. */
export function lookupVar(state: TermState, name: string): string {
  if (state.vars && name in state.vars) return state.vars[name];
  if (state.env && name in state.env) return state.env[name];
  if (name === "OLDPWD") return state.oldCwd;
  if (name === "HOSTNAME") return HOST;
  return DEFAULT_ENV.find(([k]) => k === name)?.[1](state) ?? "";
}

function exportedEnv(state: TermState): [string, string][] {
  const base = DEFAULT_ENV.map(([k, f]) => [k, f(state)] as [string, string]);
  const custom = Object.entries(state.env ?? {});
  const names = new Set(custom.map(([k]) => k));
  return [...base.filter(([k]) => !names.has(k)), ...custom];
}

const IDENT = /^[A-Za-z_][A-Za-z0-9_]*$/;

export function cmdExport(ctx: Ctx, args: string[]): CmdResult {
  const s = ctx.state;
  s.env ??= {};
  s.vars ??= {};
  if (!args.length || (args.length === 1 && args[0] === "-p")) {
    return ok(exportedEnv(s).sort(([a], [b]) => (a < b ? -1 : 1)).map(([k, v]) => `declare -x ${k}="${v}"`));
  }
  const err: string[] = [];
  for (const a of args) {
    if (a.startsWith("-")) continue;
    const eq = a.indexOf("=");
    const name = eq >= 0 ? a.slice(0, eq) : a;
    if (!IDENT.test(name)) {
      err.push(`bash: export: \`${a}': not a valid identifier`);
      continue;
    }
    if (eq >= 0) {
      s.env[name] = a.slice(eq + 1);
      delete s.vars[name];
    } else if (name in s.vars) {
      s.env[name] = s.vars[name];
      delete s.vars[name];
    } else if (!(name in s.env)) s.env[name] = "";
  }
  return { out: [], err, code: err.length ? 1 : 0 };
}

/** `NAME=giá trị` đứng một mình: biến của shell, chương trình con không thấy. */
export function cmdAssign(ctx: Ctx, words: string[]): CmdResult {
  const s = ctx.state;
  s.vars ??= {};
  for (const w of words) {
    const eq = w.indexOf("=");
    const name = w.slice(0, eq);
    if (s.env && name in s.env) s.env[name] = w.slice(eq + 1);
    else s.vars[name] = w.slice(eq + 1);
  }
  return ok();
}

export function isAssignment(word: string): boolean {
  const eq = word.indexOf("=");
  return eq > 0 && IDENT.test(word.slice(0, eq));
}

export function cmdUnset(ctx: Ctx, args: string[]): CmdResult {
  for (const a of args) {
    if (a.startsWith("-")) continue;
    if (ctx.state.vars) delete ctx.state.vars[a];
    if (ctx.state.env) delete ctx.state.env[a];
  }
  return ok();
}

export function cmdEnv(ctx: Ctx): CmdResult {
  return ok(exportedEnv(ctx.state).map(([k, v]) => `${k}=${v}`));
}

export function cmdPrintenv(ctx: Ctx, args: string[]): CmdResult {
  if (!args.length) return cmdEnv(ctx);
  const env = new Map(exportedEnv(ctx.state));
  const out = args.filter((a) => env.has(a)).map((a) => env.get(a) as string);
  return { out, err: [], code: out.length === args.length ? 0 : 1 };
}

// ------------------------------------------------------------- tiến trình

const NAMED_SIGNALS: Record<string, number> = { HUP: 1, INT: 2, QUIT: 3, KILL: 9, TERM: 15, STOP: 19, CONT: 18, USR1: 10, USR2: 12 };

export const SEED_PROCS: Proc[] = [
  { pid: 1, user: "root", cpu: 0, mem: 0.1, command: "/sbin/init" },
  { pid: 412, user: "root", cpu: 0, mem: 0.2, command: "/usr/sbin/sshd -D" },
  { pid: 903, user: USER, cpu: 1.2, mem: 0.8, command: "/usr/bin/python3 worker.py" },
  { pid: 4121, user: USER, cpu: 98, mem: 2.1, command: "node server.js" },
  { pid: 6120, user: USER, cpu: 74.5, mem: 4.6, command: "java -jar report-gen.jar", ignoresTerm: true },
];

export function ensureProcs(state: TermState): Proc[] {
  state.procs ??= SEED_PROCS.map((p) => ({ ...p }));
  return state.procs;
}

export function cmdPs(ctx: Ctx, args: string[]): CmdResult {
  const procs = ensureProcs(ctx.state);
  const joined = args.join(" ");
  const full = /(^|\s)-?(aux|auxww|ax|ef|e|A)(\s|$)/.test(joined);
  if (!full) {
    return ok(["    PID TTY          TIME CMD", "   2201 pts/0    00:00:00 bash", "   2309 pts/0    00:00:00 ps"]);
  }
  const list = [...procs];
  const sort = /--sort=(-?)(%?cpu|%?mem|pid)/.exec(joined);
  if (sort) {
    const key = sort[2].replace("%", "") as "cpu" | "mem" | "pid";
    list.sort((a, b) => (sort[1] ? b[key] - a[key] : a[key] - b[key]));
  }
  if (/(^|\s)-?ef(\s|$)/.test(joined)) {
    const out = ["UID          PID    PPID  C STIME TTY          TIME CMD"];
    for (const p of list) out.push(`${p.user.padEnd(8)} ${String(p.pid).padStart(7)} ${String(p.pid === 1 ? 0 : 1).padStart(7)} ${String(Math.round(p.cpu)).padStart(2)} 08:00 ?        00:00:00 ${p.command}`);
    return ok(out);
  }
  const out = ["USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];
  for (const p of list) {
    const vsz = 20000 + ((p.pid * 37) % 90000) + Math.round(p.mem * 10000);
    const rss = Math.round(vsz * (p.mem / 10 + 0.05));
    out.push(
      `${p.user.padEnd(8)} ${String(p.pid).padStart(7)} ${p.cpu.toFixed(1).padStart(4)} ${p.mem.toFixed(1).padStart(4)} ${String(vsz).padStart(6)} ${String(rss).padStart(5)} ?        ${p.cpu > 50 ? "R" : "Ss"}${p.cpu > 50 ? " " : ""}   08:00   ${p.cpu > 50 ? "42:17" : " 0:02"} ${p.command}`
    );
  }
  return ok(out);
}

export function cmdKill(ctx: Ctx, args: string[]): CmdResult {
  const procs = ensureProcs(ctx.state);
  if (args[0] === "-l") return ok(Object.entries(NAMED_SIGNALS).map(([n, v]) => `${v}) SIG${n}`));
  let signal = 15;
  const pids: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "-s" || a === "-n") {
      const v = args[++i] ?? "";
      const n = /^\d+$/.test(v) ? Number(v) : NAMED_SIGNALS[v.replace(/^SIG/, "")];
      if (n === undefined) return fail(`bash: kill: ${v}: invalid signal specification`);
      signal = n;
    } else if (/^-\d+$/.test(a)) signal = Number(a.slice(1));
    else if (/^-[A-Za-z0-9]+$/.test(a)) {
      const n = NAMED_SIGNALS[a.slice(1).replace(/^SIG/, "")];
      if (n === undefined) return fail(`bash: kill: ${a.slice(1)}: invalid signal specification`);
      signal = n;
    } else pids.push(a);
  }
  if (!pids.length) return fail(["kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]"], 2);
  const err: string[] = [];
  for (const raw of pids) {
    if (!/^\d+$/.test(raw)) {
      err.push(`bash: kill: ${raw}: arguments must be process or job IDs`);
      continue;
    }
    const pid = Number(raw);
    const p = procs.find((x) => x.pid === pid);
    if (!p) {
      err.push(`bash: kill: (${pid}) - No such process`);
      continue;
    }
    if (p.user !== USER) {
      err.push(`bash: kill: (${pid}) - Operation not permitted`);
      continue;
    }
    if (signal === 0 || signal === 18 || signal === 19) continue;
    if (p.ignoresTerm && signal !== 9) continue;
    ctx.state.procs = procs.filter((x) => x !== p);
  }
  return { out: [], err, code: err.length ? 1 : 0 };
}

// ------------------------------------------------------------- mạng

interface DnsRecord {
  a?: string;
  cname?: string;
  ttl: number;
}

const DNS: Record<string, DnsRecord> = {
  "vi-du.vn": { a: "203.0.113.10", ttl: 287 },
  "www.vi-du.vn": { cname: "vi-du.vn", ttl: 300 },
  "api.vi-du.vn": { a: "203.0.113.20", ttl: 60 },
  "mail.vi-du.vn": { a: "203.0.113.25", ttl: 3600 },
  "example.com": { a: "93.184.216.34", ttl: 3600 },
  localhost: { a: "127.0.0.1", ttl: 0 },
};

function resolveName(name: string): { chain: { name: string; target: string; kind: "CNAME" | "A"; ttl: number }[]; ip?: string } {
  const chain: { name: string; target: string; kind: "CNAME" | "A"; ttl: number }[] = [];
  let cur = name.replace(/\.$/, "").toLowerCase();
  for (let i = 0; i < 5; i++) {
    const rec = DNS[cur];
    if (!rec) return { chain };
    if (rec.cname) {
      chain.push({ name: cur, target: rec.cname, kind: "CNAME", ttl: rec.ttl });
      cur = rec.cname;
      continue;
    }
    chain.push({ name: cur, target: rec.a as string, kind: "A", ttl: rec.ttl });
    return { chain, ip: rec.a };
  }
  return { chain };
}

export function cmdDig(ctx: Ctx, args: string[]): CmdResult {
  const name = args.find((a) => !a.startsWith("+") && !a.startsWith("-") && !/^(A|AAAA|MX|NS|TXT|CNAME)$/.test(a));
  if (!name) return ok([";; global options: +cmd", ";; Got answer:"]);
  const short = args.includes("+short");
  const answerOnly = args.includes("+noall") && args.includes("+answer");
  const r = resolveName(name);
  if (short) return ok(r.chain.map((c) => (c.kind === "CNAME" ? `${c.target}.` : c.target)));
  const answers = r.chain.map((c) => `${c.name}.`.padEnd(24, " ").replace(/ {2,}$/, "\t\t") + `${c.ttl}\tIN\t${c.kind}\t${c.kind === "CNAME" ? c.target + "." : c.target}`);
  if (answerOnly) return ok(answers);
  const status = r.ip ? "NOERROR" : "NXDOMAIN";
  return ok([
    "",
    "; <<>> DiG 9.18.28-0ubuntu0.24.04.1-Ubuntu <<>> " + name,
    ";; global options: +cmd",
    ";; Got answer:",
    `;; ->>HEADER<<- opcode: QUERY, status: ${status}, id: 41231`,
    `;; flags: qr rd ra; QUERY: 1, ANSWER: ${r.chain.length}, AUTHORITY: 0, ADDITIONAL: 1`,
    "",
    ";; QUESTION SECTION:",
    `;${name.replace(/\.$/, "")}.\t\t\tIN\tA`,
    ...(answers.length ? ["", ";; ANSWER SECTION:", ...answers] : []),
    "",
    ";; Query time: 23 msec",
    ";; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)",
    `;; WHEN: ${formatUnixDate(ctx.now)}`,
    ";; MSG SIZE  rcvd: 52",
  ]);
}

export function cmdNslookup(args: string[]): CmdResult {
  const name = args.find((a) => !a.startsWith("-"));
  if (!name) return ok(["> "]);
  const r = resolveName(name);
  const head = ["Server:\t\t127.0.0.53", "Address:\t127.0.0.53#53", ""];
  if (!r.ip) return { out: [...head], err: [`** server can't find ${name}: NXDOMAIN`], code: 1 };
  const canon = r.chain.filter((c) => c.kind === "CNAME").map((c) => `${c.name}\tcanonical name = ${c.target}.`);
  return ok([...head, "Non-authoritative answer:", ...canon, `Name:\t${r.chain[r.chain.length - 1].name}`, `Address: ${r.ip}`, ""]);
}

export function cmdHost(args: string[]): CmdResult {
  const name = args.find((a) => !a.startsWith("-"));
  if (!name) return fail(["Usage: host [-aCdilrTvVw] [-c class] [-N ndots] [-t type] [-W time]", "            [-R number] [-m flag] hostname [server]"], 1);
  const r = resolveName(name);
  if (!r.ip) return fail(`Host ${name} not found: 3(NXDOMAIN)`, 1);
  const out = r.chain.map((c) => (c.kind === "CNAME" ? `${c.name} is an alias for ${c.target}.` : `${c.name} has address ${c.target}`));
  return ok(out);
}

export function cmdPing(args: string[]): CmdResult {
  let count = 4;
  let host: string | undefined;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-c") count = Math.max(1, Math.min(10, Number(args[++i]) || 4));
    else if (!args[i].startsWith("-")) host = args[i];
  }
  if (!host) return fail(["ping: usage error: Destination address required"], 2);
  const r = /^\d+\.\d+\.\d+\.\d+$/.test(host) ? { ip: host } : resolveName(host);
  if (!r.ip) return fail(`ping: ${host}: Name or service not known`, 2);
  const out = [`PING ${host} (${r.ip}) 56(84) bytes of data.`];
  for (let i = 1; i <= count; i++) out.push(`64 bytes from ${r.ip}: icmp_seq=${i} ttl=57 time=${(20 + ((i * 7) % 9) / 3).toFixed(1)} ms`);
  out.push("", `--- ${host} ping statistics ---`, `${count} packets transmitted, ${count} received, 0% packet loss, time ${(count - 1) * 1001}ms`, "rtt min/avg/max/mdev = 20.3/21.4/22.5/0.9 ms");
  return ok(out);
}

export const EXTRA_COMMANDS = ["sort", "uniq", "cut", "printf", "env", "printenv", "ps", "kill", "dig", "nslookup", "host", "ping"];
/* i18n-ignore-end */
