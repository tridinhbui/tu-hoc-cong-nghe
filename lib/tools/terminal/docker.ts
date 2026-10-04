/** Docker mô phỏng: kéo image, chạy/dừng/xoá container, xem nhật ký. Không có
 *  container thật nào chạy - chỉ có bảng trạng thái và nhật ký giả lập. */
/* i18n-ignore-start: đầu ra của chính Docker CLI và nhật ký nginx/node/postgres
   giả lập - người đi làm đọc chúng bằng tiếng Anh đúng như vậy trên máy thật */
import { getDir, getNode, globToRegExp, resolvePath, walkFiles } from "./fs";
import type { CmdResult, Ctx, DirNode, DockerContainer, DockerImage, DockerVolume, PortMap } from "./types";
import { fakeHash, formatLogDate, splitLines, table, timeAgo } from "./util";

interface ImageSpec {
  size: string;
  created: string;
  command: string;
  version: string;
  /** Container chạy mãi (máy chủ) hay in xong rồi thoát. */
  daemon: boolean;
  logs: (ts: string) => string[];
}

const CATALOG: Record<string, ImageSpec> = {
  nginx: {
    size: "192MB",
    created: "2 weeks ago",
    command: '"/docker-entrypoint.…"',
    version: "1.27.1",
    daemon: true,
    logs: (ts) => [
      "/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration",
      "/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/",
      "/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh",
      "10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf",
      "/docker-entrypoint.sh: Configuration complete; ready for start up",
      `${ts} [notice] 1#1: using the "epoll" event method`,
      `${ts} [notice] 1#1: nginx/1.27.1`,
      `${ts} [notice] 1#1: built by gcc 12.2.0 (Debian 12.2.0-14)`,
      `${ts} [notice] 1#1: OS: Linux 6.8.0-45-generic`,
      `${ts} [notice] 1#1: start worker processes`,
      `${ts} [notice] 1#1: start worker process 29`,
      `${ts} [notice] 1#1: start worker process 30`,
    ],
  },
  node: {
    size: "1.12GB",
    created: "3 weeks ago",
    command: '"docker-entrypoint.s…"',
    version: "22.9.0",
    daemon: false,
    logs: () => ["Welcome to Node.js v22.9.0.", 'Type ".help" for more information.', "> "],
  },
  postgres: {
    size: "435MB",
    created: "2 weeks ago",
    command: '"docker-entrypoint.s…"',
    version: "17.0",
    daemon: true,
    logs: (ts) => [
      "PostgreSQL Database directory appears to contain a database; Skipping initialization",
      `${ts}.123 UTC [1] LOG:  starting PostgreSQL 17.0 (Debian 17.0-1.pgdg120+1) on x86_64-pc-linux-gnu`,
      `${ts}.124 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432`,
      `${ts}.130 UTC [1] LOG:  database system is ready to accept connections`,
    ],
  },
  redis: {
    size: "117MB",
    created: "4 weeks ago",
    command: '"docker-entrypoint.s…"',
    version: "7.4.0",
    daemon: true,
    logs: () => [
      "1:C * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo",
      "1:C * Redis version=7.4.0, bits=64, commit=00000000, modified=0, pid=1, just started",
      "1:M * Server initialized",
      "1:M * Ready to accept connections tcp",
    ],
  },
  "hello-world": {
    size: "13.3kB",
    created: "16 months ago",
    command: '"/hello"',
    version: "latest",
    daemon: false,
    logs: () => [
      "",
      "Hello from Docker!",
      "This message shows that your installation appears to be working correctly.",
      "",
      "To generate this message, Docker took the following steps:",
      " 1. The Docker client contacted the Docker daemon.",
      ' 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.',
      " 3. The Docker daemon created a new container from that image which runs the",
      "    executable that produces the output you are currently reading.",
      " 4. The Docker daemon streamed that output to the Docker client, which sent it",
      "    to your terminal.",
      "",
    ],
  },
  alpine: {
    size: "7.8MB",
    created: "2 months ago",
    command: '"/bin/sh"',
    version: "3.20",
    daemon: false,
    logs: () => [],
  },
  ubuntu: {
    size: "78.1MB",
    created: "5 weeks ago",
    command: '"/bin/bash"',
    version: "24.04",
    daemon: false,
    logs: () => [],
  },
  python: {
    size: "1.02GB",
    created: "3 weeks ago",
    command: '"python3"',
    version: "3.12.6",
    daemon: false,
    logs: () => ["Python 3.12.6 (main, Sep 12 2026, 22:40:37) [GCC 12.2.0] on linux", 'Type "help", "copyright", "credits" or "license" for more information.', ">>> "],
  },
};

const ADJECTIVES = ["admiring", "brave", "clever", "eager", "focused", "gifted", "happy", "jolly", "keen", "quirky"];
const SCIENTISTS = ["turing", "hopper", "lovelace", "torvalds", "knuth", "ritchie", "hamilton", "dijkstra", "curie", "tesla"];

const ok = (out: string[] = []): CmdResult => ({ out, err: [], code: 0 });
const fail = (err: string[] | string, code = 1): CmdResult => ({ out: [], err: Array.isArray(err) ? err : [err], code });

function parseRef(ref: string): { repo: string; tag: string } {
  const i = ref.lastIndexOf(":");
  return i > 0 ? { repo: ref.slice(0, i), tag: ref.slice(i + 1) } : { repo: ref, tag: "latest" };
}

function pullLines(ctx: Ctx, repo: string, tag: string): CmdResult {
  const spec = CATALOG[repo];
  if (!spec) {
    return fail(`Error response from daemon: pull access denied for ${repo}, repository does not exist or may require 'docker login': denied: requested access to the resource is denied`);
  }
  const images = ctx.state.docker.images;
  const exists = images.some((im) => im.repo === repo && im.tag === tag);
  const digest = fakeHash(`${repo}:${tag}:digest`, 64);
  if (exists) {
    return ok([`${tag}: Pulling from library/${repo}`, `Digest: sha256:${digest}`, `Status: Image is up to date for ${repo}:${tag}`, `docker.io/library/${repo}:${tag}`]);
  }
  const layers = [0, 1, 2, 3].map((i) => `${fakeHash(`${repo}:${tag}:layer${i}`, 12)}: Pull complete`);
  const scale = /slim/.test(tag) ? 0.18 : /alpine/.test(tag) ? 0.06 : 1;
  const mb = sizeMb(spec.size) * scale;
  const size = scale === 1 ? spec.size : mb >= 1000 ? `${(mb / 1000).toFixed(2)}GB` : `${Math.round(mb)}MB`;
  images.unshift({ repo, tag, id: fakeHash(`${repo}:${tag}:image`, 12), size, created: spec.created });
  return ok([`${tag}: Pulling from library/${repo}`, ...layers, `Digest: sha256:${digest}`, `Status: Downloaded newer image for ${repo}:${tag}`, `docker.io/library/${repo}:${tag}`]);
}

function findContainer(ctx: Ctx, key: string): DockerContainer | undefined {
  return ctx.state.docker.containers.find((c) => c.name === key || (key.length >= 3 && c.id.startsWith(key)));
}

function portText(ports: PortMap[]): string {
  return ports.map((p) => `0.0.0.0:${p.host}->${p.container}/tcp, [::]:${p.host}->${p.container}/tcp`).join(", ");
}

/** Flag của `docker run` nhận một giá trị đi kèm mà mô phỏng chỉ cần bỏ qua. */
const VALUE_FLAGS = ["--restart", "--network", "--net", "-w", "--workdir", "-u", "--user", "-m", "--memory", "--cpus", "--hostname", "-h", "--entrypoint", "--env-file", "-l", "--label", "--platform"];

/** Spec của image: danh mục có sẵn, hoặc image tự build trên máy này. */
function specFor(ctx: Ctx, imageName: string): ImageSpec | undefined {
  const { repo, tag } = parseRef(imageName);
  if (CATALOG[repo]) return CATALOG[repo];
  const built = ctx.state.docker.images.find((im) => im.repo === repo && im.tag === tag)?.built;
  if (!built) return undefined;
  const port = built.expose[0] ?? 3000;
  return {
    size: "0MB",
    created: "now",
    command: `"${built.cmd.length > 18 ? built.cmd.slice(0, 17) + "…" : built.cmd}"`,
    version: tag,
    daemon: true,
    logs: () => [`> ${repo}@1.0.0 start`, `> ${built.cmd}`, "", `Server listening on port ${port}`],
  };
}

const POSTGRES_NO_PASSWORD = [
  "Error: Database is uninitialized and superuser password is not specified.",
  "       You must specify POSTGRES_PASSWORD to a non-empty value for the",
  '       superuser. For example, "-e POSTGRES_PASSWORD=password" on "docker run".',
  "",
  '       You may also use "POSTGRES_HOST_AUTH_METHOD=trust" to allow all',
  "       connections without a password. This is *not* recommended.",
  "",
  '       See PostgreSQL documentation about "trust":',
  "       https://www.postgresql.org/docs/current/auth-trust.html",
];

const POSTGRES_INIT = (ts: string) => [
  "The files belonging to this database system will be owned by user \"postgres\".",
  "This user must also own the server process.",
  "",
  "initdb: warning: enabling \"trust\" authentication for local connections",
  "creating subdirectories ... ok",
  "selecting default time zone ... Etc/UTC",
  "",
  "PostgreSQL init process complete; ready for start up.",
  `${ts}.123 UTC [1] LOG:  starting PostgreSQL 17.0 (Debian 17.0-1.pgdg120+1) on x86_64-pc-linux-gnu`,
  `${ts}.124 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432`,
  `${ts}.130 UTC [1] LOG:  database system is ready to accept connections`,
];

function ensureVolume(d: Ctx["state"]["docker"], name: string): DockerVolume {
  d.volumes ??= [];
  let v = d.volumes.find((x) => x.name === name);
  if (!v) {
    v = { name, attachments: 0, initialized: false };
    d.volumes.push(v);
  }
  return v;
}

function run(ctx: Ctx, args: string[]): CmdResult {
  let detach = false;
  let name: string | undefined;
  const ports: PortMap[] = [];
  const env: Record<string, string> = {};
  const mounts: NonNullable<DockerContainer["mounts"]> = [];
  let image: string | undefined;
  let rm = false;
  let command: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (image) {
      command = args.slice(i);
      break;
    }
    if (a === "-d" || a === "--detach") detach = true;
    else if (a === "--rm") rm = true;
    else if (a === "-it" || a === "-i" || a === "-t" || a === "-dit") detach = detach || a === "-dit";
    else if (a === "--name") name = args[++i];
    else if (a.startsWith("--name=")) name = a.slice(7);
    else if (a === "-e" || a === "--env") {
      const v = args[++i] ?? "";
      const eq = v.indexOf("=");
      env[eq >= 0 ? v.slice(0, eq) : v] = eq >= 0 ? v.slice(eq + 1) : "";
    } else if (a === "-v" || a === "--volume") {
      const [source, target] = (args[++i] ?? "").split(":");
      if (source && target) mounts.push({ source, target, named: !/^[/.~]/.test(source) });
    } else if (VALUE_FLAGS.includes(a)) i++;
    else if (a === "-p" || a === "--publish" || /^-p\d/.test(a)) {
      const v = a === "-p" || a === "--publish" ? args[++i] : a.slice(2);
      const m = /^(?:[\d.]+:)?(\d+):(\d+)(?:\/tcp)?$/.exec(v ?? "");
      if (!m) return fail(`docker: invalid publish opts format (should be name=value but no = found): ${v ?? ""}`, 125);
      ports.push({ host: Number(m[1]), container: Number(m[2]) });
    } else if (a.startsWith("-")) return fail([`unknown shorthand flag: '${a.replace(/^-+/, "")[0]}' in ${a}`, "See 'docker run --help'."], 125);
    else {
      image = a;
    }
  }
  if (!image) return fail(['"docker run" requires at least 1 argument.', "See 'docker run --help'.", "", "Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]"], 125);
  void command;
  const { repo, tag } = parseRef(image);
  const out: string[] = [];
  const d = ctx.state.docker;
  if (!d.images.some((im) => im.repo === repo && im.tag === tag)) {
    const pulled = pullLines(ctx, repo, tag);
    if (pulled.code) return { out: [], err: [`Unable to find image '${repo}:${tag}' locally`, ...pulled.err.map((e) => `docker: ${e}`), "See 'docker run --help'."], code: 125 };
    out.push(`Unable to find image '${repo}:${tag}' locally`, ...pulled.out.slice(0, -1));
  }
  if (name !== undefined) {
    const clash = d.containers.find((c) => c.name === name);
    if (clash) {
      return { out, err: [`docker: Error response from daemon: Conflict. The container name "/${name}" is already in use by container "${clash.id}". You have to remove (or rename) that container to be able to reuse that name.`, "See 'docker run --help'."], code: 125 };
    }
  }
  for (const p of ports) {
    if (d.containers.some((c) => c.status === "running" && c.ports.some((q) => q.host === p.host))) {
      return { out, err: [`docker: Error response from daemon: driver failed programming external connectivity on endpoint: Bind for 0.0.0.0:${p.host} failed: port is already allocated.`], code: 125 };
    }
  }
  const spec = specFor(ctx, image) as ImageSpec;
  d.counter++;
  const id = fakeHash(`container:${d.counter}:${repo}:${ctx.now}`, 64);
  const ts = formatLogDate(ctx.now);
  let logs = spec.logs(ts);
  let status: DockerContainer["status"] = spec.daemon ? "running" : "exited";
  let exitCode = 0;
  const dataVolume = mounts.find((m) => m.named && m.target === "/var/lib/postgresql/data");
  const vol = dataVolume ? ensureVolume(d, dataVolume.source) : undefined;
  for (const m of mounts) if (m.named) ensureVolume(d, m.source).attachments++;
  if (repo === "postgres") {
    const hasData = !!vol?.initialized;
    if (!hasData && !env.POSTGRES_PASSWORD && env.POSTGRES_HOST_AUTH_METHOD !== "trust") {
      logs = POSTGRES_NO_PASSWORD;
      status = "exited";
      exitCode = 1;
    } else if (!hasData) {
      logs = POSTGRES_INIT(ts);
      if (vol) vol.initialized = true;
    }
  }
  const container: DockerContainer = {
    id,
    name: name ?? `${ADJECTIVES[d.counter % ADJECTIVES.length]}_${SCIENTISTS[(d.counter * 3) % SCIENTISTS.length]}`,
    image: tag === "latest" ? repo : `${repo}:${tag}`,
    command: spec.command,
    status,
    exitCode,
    ports: status === "running" ? ports : [],
    created: ctx.now,
    createdSeq: ctx.state.seq,
    logs,
    env,
    mounts,
  };
  if (!(rm && !spec.daemon)) d.containers.unshift(container);
  if (detach) return ok([...out, id]);
  const res = ok([...out, ...logs]);
  if (exitCode) res.code = exitCode;
  if (spec.daemon && !exitCode) res.notices = ["foreground"];
  return res;
}

function ps(ctx: Ctx, args: string[]): CmdResult {
  const flags = args.filter((a) => /^-[a-z]+$/.test(a)).join("");
  const all = flags.includes("a") || args.includes("--all");
  const quiet = flags.includes("q") || args.includes("--quiet");
  const list = ctx.state.docker.containers.filter((c) => all || c.status === "running");
  if (quiet) return ok(list.map((c) => c.id.slice(0, 12)));
  const rows = [["CONTAINER ID", "IMAGE", "COMMAND", "CREATED", "STATUS", "PORTS", "NAMES"]];
  for (const c of list) {
    const status = c.status === "running" ? `Up ${timeAgo(c.created, ctx.now).replace(/ ago$/, "")}` : `Exited (${c.exitCode}) ${timeAgo(c.created, ctx.now)}`;
    rows.push([c.id.slice(0, 12), c.image, c.command, timeAgo(c.created, ctx.now), status, portText(c.ports), c.name]);
  }
  return ok(table(rows));
}

function stopOrStart(ctx: Ctx, args: string[], action: "stop" | "start" | "restart"): CmdResult {
  const keys = args.filter((a) => !a.startsWith("-"));
  if (!keys.length) return fail([`"docker ${action}" requires at least 1 argument.`, `See 'docker ${action} --help'.`]);
  const out: string[] = [];
  const err: string[] = [];
  for (const k of keys) {
    const c = findContainer(ctx, k);
    if (!c) {
      err.push(`Error response from daemon: No such container: ${k}`);
      continue;
    }
    if (action === "stop") {
      if (c.status === "running") {
        c.status = "exited";
        c.exitCode = 0;
        if (c.image.startsWith("nginx")) {
          const ts = formatLogDate(ctx.now);
          c.logs.push(`${ts} [notice] 1#1: signal 3 (SIGQUIT) received, shutting down`, `${ts} [notice] 1#1: exit`);
        }
      }
    } else {
      const spec = specFor(ctx, c.image);
      if (spec?.daemon && !(c.image.startsWith("postgres") && c.exitCode !== 0 && c.status === "exited" && !c.env?.POSTGRES_PASSWORD)) {
        const clash = c.ports.find((p) => ctx.state.docker.containers.some((o) => o !== c && o.status === "running" && o.ports.some((q) => q.host === p.host)));
        if (clash) {
          err.push(`Error response from daemon: driver failed programming external connectivity on endpoint ${c.name}: Bind for 0.0.0.0:${clash.host} failed: port is already allocated`);
          continue;
        }
        c.status = "running";
        c.created = Math.min(c.created, ctx.now);
      }
    }
    out.push(k);
  }
  return { out, err, code: err.length ? 1 : 0 };
}

function rmContainers(ctx: Ctx, args: string[]): CmdResult {
  const force = args.includes("-f") || args.includes("--force");
  const keys = args.filter((a) => !a.startsWith("-"));
  if (!keys.length) return fail(['"docker rm" requires at least 1 argument.', "See 'docker rm --help'."]);
  const out: string[] = [];
  const err: string[] = [];
  const d = ctx.state.docker;
  for (const k of keys) {
    const c = findContainer(ctx, k);
    if (!c) {
      err.push(`Error response from daemon: No such container: ${k}`);
      continue;
    }
    if (c.status === "running" && !force) {
      err.push(`Error response from daemon: cannot remove container "/${c.name}": container is running: stop the container before removing or force remove`);
      continue;
    }
    d.containers = d.containers.filter((x) => x !== c);
    out.push(k);
  }
  return { out, err, code: err.length ? 1 : 0 };
}

function rmi(ctx: Ctx, args: string[]): CmdResult {
  const keys = args.filter((a) => !a.startsWith("-"));
  const d = ctx.state.docker;
  const out: string[] = [];
  const err: string[] = [];
  for (const k of keys) {
    const { repo, tag } = parseRef(k);
    const im = d.images.find((i) => (i.repo === repo && i.tag === tag) || i.id.startsWith(k));
    if (!im) {
      err.push(`Error response from daemon: No such image: ${k}`);
      continue;
    }
    const user = d.containers.find((c) => c.image.split(":")[0] === im.repo);
    if (user) {
      err.push(`Error response from daemon: conflict: unable to remove repository reference "${k}" (must force) - container ${user.id.slice(0, 12)} is using its referenced image ${im.id}`);
      continue;
    }
    d.images = d.images.filter((i) => i !== im);
    out.push(`Untagged: ${im.repo}:${im.tag}`, `Deleted: sha256:${fakeHash(im.id, 64)}`);
  }
  return { out, err, code: err.length ? 1 : 0 };
}

// ------------------------------------------------ volume

function volumeCmd(ctx: Ctx, args: string[]): CmdResult {
  const d = ctx.state.docker;
  d.volumes ??= [];
  const [sub, ...rest] = args;
  const names = rest.filter((a) => !a.startsWith("-"));
  switch (sub) {
    case "create": {
      const name = names[0] ?? fakeHash(`vol:${ctx.now}:${d.volumes.length}`, 64);
      if (!d.volumes.some((v) => v.name === name)) d.volumes.push({ name, attachments: 0, initialized: false });
      return ok([name]);
    }
    case "ls":
    case "list": {
      const rows = [["DRIVER", "VOLUME NAME"], ...d.volumes.map((v) => ["local", v.name])];
      return ok(table(rows));
    }
    case "rm":
    case "remove": {
      if (!names.length) return fail(['"docker volume rm" requires at least 1 argument.', "See 'docker volume rm --help'."]);
      const out: string[] = [];
      const err: string[] = [];
      for (const n of names) {
        const v = d.volumes.find((x) => x.name === n);
        if (!v) {
          err.push(`Error response from daemon: get ${n}: no such volume`);
          continue;
        }
        const user = d.containers.find((c) => c.mounts?.some((m) => m.named && m.source === n));
        if (user) {
          err.push(`Error response from daemon: remove ${n}: volume is in use - [${user.id}]`);
          continue;
        }
        d.volumes = d.volumes.filter((x) => x !== v);
        out.push(n);
      }
      return { out, err, code: err.length ? 1 : 0 };
    }
    case "inspect": {
      const v = d.volumes.find((x) => x.name === names[0]);
      if (!v) return fail(`Error response from daemon: get ${names[0] ?? ""}: no such volume`);
      return ok(["[", "    {", `        "Driver": "local",`, `        "Mountpoint": "/var/lib/docker/volumes/${v.name}/_data",`, `        "Name": "${v.name}"`, "    }", "]"]);
    }
    default:
      return fail(["", "Usage:  docker volume COMMAND", "", "Commands:", "  create      Create a volume", "  inspect     Display detailed information on one or more volumes", "  ls          List volumes", "  rm          Remove one or more volumes"]);
  }
}

// ------------------------------------------------ exec

function execCmd(ctx: Ctx, args: string[]): CmdResult {
  const rest = args.filter((a, i) => !(a.startsWith("-") && i < args.findIndex((x) => !x.startsWith("-"))));
  const [key, ...cmd] = rest;
  if (!key) return fail(['"docker exec" requires at least 2 arguments.', "See 'docker exec --help'.", "", "Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]"], 1);
  const c = findContainer(ctx, key);
  if (!c) return fail(`Error response from daemon: No such container: ${key}`, 1);
  if (c.status !== "running") return fail(`Error response from daemon: container ${c.id} is not running`, 1);
  if (!cmd.length) return fail(['"docker exec" requires at least 2 arguments.', "See 'docker exec --help'."], 1);
  const [prog, ...a] = cmd;
  const image = c.image.split(":")[0];
  switch (prog) {
    case "sh":
    case "bash":
      return fail("(simulator) interactive shells are not available here - run one command at a time, for example: docker exec " + c.name + " ls /");
    case "whoami":
      return ok(["root"]);
    case "hostname":
      return ok([c.id.slice(0, 12)]);
    case "pwd":
      return ok(["/"]);
    case "echo":
      return ok([a.join(" ")]);
    case "env":
    case "printenv": {
      const base = ["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin", `HOSTNAME=${c.id.slice(0, 12)}`];
      const mine = Object.entries(c.env ?? {}).map(([k, v]) => `${k}=${v}`);
      const all = [...base, ...mine, "HOME=/root"];
      if (prog === "printenv" && a[0]) {
        const hit = all.find((l) => l.startsWith(a[0] + "="));
        return hit ? ok([hit.slice(a[0].length + 1)]) : fail([], 1);
      }
      return ok(all);
    }
    case "ls": {
      const p = a.find((x) => !x.startsWith("-")) ?? "/";
      const files: Record<string, string[]> = {
        "/": ["bin", "dev", "etc", "home", "lib", "proc", "root", "tmp", "usr", "var"],
        "/usr/share/nginx/html": ["50x.html", "index.html"],
        "/etc/nginx": ["conf.d", "nginx.conf"],
        "/var/lib/postgresql/data": ["PG_VERSION", "base", "global", "pg_wal", "postgresql.conf"],
      };
      const hit = files[p.replace(/\/$/, "") || "/"];
      return hit ? ok(hit) : fail(`ls: cannot access '${p}': No such file or directory`, 2);
    }
    case "cat": {
      const p = a[0];
      if (image === "nginx" && p === "/usr/share/nginx/html/index.html") return ok(["<!DOCTYPE html>", "<html>", "<head>", "<title>Welcome to nginx!</title>", "</head>", "<body>", "<h1>Welcome to nginx!</h1>", "</body>", "</html>"]);
      if (p === "/etc/hostname") return ok([c.id.slice(0, 12)]);
      return fail(`cat: ${p ?? ""}: No such file or directory`, 1);
    }
    case "nginx":
      return image === "nginx" ? fail("nginx version: nginx/1.27.1", 0) : fail(`OCI runtime exec failed: exec failed: unable to start container process: exec: "nginx": executable file not found in $PATH: unknown`, 126);
    default:
      return fail(`OCI runtime exec failed: exec failed: unable to start container process: exec: "${prog}": executable file not found in $PATH: unknown`, 126);
  }
}

// ------------------------------------------------ build

interface Instruction {
  line: number;
  op: string;
  arg: string;
  /** Nguyên văn dòng lệnh, dùng để in và để tính khoá bộ nhớ đệm. */
  text: string;
}

const OPS = ["FROM", "RUN", "CMD", "LABEL", "EXPOSE", "ENV", "ADD", "COPY", "ENTRYPOINT", "VOLUME", "USER", "WORKDIR", "ARG", "ONBUILD", "STOPSIGNAL", "HEALTHCHECK", "SHELL", "MAINTAINER"];

function parseDockerfile(text: string): Instruction[] | string {
  const out: Instruction[] = [];
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let raw = lines[i].trim();
    if (!raw || raw.startsWith("#")) continue;
    const start = i + 1;
    while (raw.endsWith("\\") && i + 1 < lines.length) raw = raw.slice(0, -1).trimEnd() + " " + lines[++i].trim();
    const m = /^(\S+)\s*(.*)$/.exec(raw) as RegExpExecArray;
    const op = m[1].toUpperCase();
    if (!OPS.includes(op)) return `dockerfile parse error on line ${start}: unknown instruction: ${m[1]}`;
    out.push({ line: start, op, arg: m[2], text: `${op} ${m[2]}`.trim() });
  }
  if (!out.length) return "the Dockerfile cannot be empty";
  return out;
}

function ignoredBy(patterns: string[], rel: string): boolean {
  return patterns.some((p) => {
    const clean = p.replace(/^\.?\//, "").replace(/\/$/, "");
    return rel === clean || rel.startsWith(clean + "/") || (clean.includes("*") && globToRegExp(clean).test(rel));
  });
}

function contextFiles(ctxDir: DirNode): Record<string, string> {
  const ig = ctxDir.children[".dockerignore"];
  const patterns = ig && ig.type === "file" ? splitLines(ig.content).map((l) => l.trim()).filter((l) => l && !l.startsWith("#")) : [];
  const files: Record<string, string> = {};
  for (const rel of walkFiles(ctxDir)) {
    if (ignoredBy(patterns, rel)) continue;
    const parts = rel.split("/");
    let node: DirNode | undefined = ctxDir;
    for (const part of parts.slice(0, -1)) node = node?.children[part] as DirNode | undefined;
    const f = node?.children[parts[parts.length - 1]];
    if (f && f.type === "file") files[rel] = f.content;
  }
  return files;
}

function copySources(arg: string, files: Record<string, string>): { names: string[]; missing?: string } {
  const toks = arg.split(/\s+/).filter((t) => t && !t.startsWith("--"));
  const srcs = toks.slice(0, -1);
  const names = new Set<string>();
  for (const src of srcs) {
    const clean = src.replace(/^\.\//, "");
    if (clean === "." || clean === "") {
      Object.keys(files).forEach((f) => names.add(f));
      continue;
    }
    const re = globToRegExp(clean.replace(/\/$/, ""));
    const hits = Object.keys(files).filter((f) => re.test(f) || f.startsWith(clean.replace(/\/$/, "") + "/"));
    if (!hits.length) return { names: [], missing: src };
    hits.forEach((f) => names.add(f));
  }
  return { names: [...names].sort() };
}

interface Layer {
  inst: Instruction;
  key: string;
}

/** Khoá bộ nhớ đệm từng lớp (như BuildKit): đổi một lớp thì mọi lớp sau đổi theo. */
function layerKeys(insts: Instruction[], files: Record<string, string>): { layers: Layer[]; error?: string } {
  const layers: Layer[] = [];
  let prev = "";
  const have = new Set<string>();
  for (const inst of insts) {
    let extra = "";
    if (inst.op === "FROM") {
      prev = "";
      have.clear();
    } else if (inst.op === "COPY" || inst.op === "ADD") {
      if (!/--from=/.test(inst.arg)) {
        const { names, missing } = copySources(inst.arg, files);
        if (missing) return { layers, error: `failed to compute cache key: failed to calculate checksum of ref: "/${missing}": not found` };
        extra = names.map((n) => `${n}:${fakeHash(files[n], 16)}`).join("|");
        names.forEach((n) => have.add(n.split("/").pop() as string));
      }
    } else if (inst.op === "RUN" && /npm (ci|install)/.test(inst.arg)) {
      if (!have.has("package.json")) {
        return { layers, error: `process "/bin/sh -c ${inst.arg}" did not complete successfully: exit code: 254\n npm error code ENOENT\n npm error Could not read package.json: no such file or directory, open '/app/package.json'` };
      }
      if (/npm ci/.test(inst.arg) && !have.has("package-lock.json")) {
        return { layers, error: `process "/bin/sh -c ${inst.arg}" did not complete successfully: exit code: 1\n npm error The \`npm ci\` command can only install with an existing package-lock.json` };
      }
    }
    prev = fakeHash(`${prev}|${inst.text}|${extra}`, 16);
    layers.push({ inst, key: prev });
  }
  return { layers };
}

/** Lớp cài thư viện (`npm ci` / `npm install`) có giữ nguyên khoá khi chỉ sửa mã nguồn không?
 *  Đây là thứ làm rebuild nhanh: dùng cho nhiệm vụ "Dockerfile thân thiện bộ nhớ đệm". */
export function depsLayerStable(ctxDir: DirNode, dockerfile: string): boolean {
  const insts = parseDockerfile(dockerfile);
  if (typeof insts === "string") return false;
  const before = contextFiles(ctxDir);
  const after: Record<string, string> = {};
  for (const [k, v] of Object.entries(before)) after[k] = /^package(-lock)?\.json$/.test(k) ? v : v + "\n// edited\n";
  const a = layerKeys(insts, before);
  const b = layerKeys(insts, after);
  if (a.error || b.error) return false;
  const idx = insts.findIndex((i) => i.op === "RUN" && /npm (ci|install)/.test(i.arg));
  if (idx < 0) return false;
  return a.layers[idx].key === b.layers[idx].key;
}

export function dockerfileKey(text: string): string {
  return fakeHash(text, 16);
}

function sizeMb(size: string): number {
  const m = /^([\d.]+)\s*(kB|MB|GB)$/.exec(size);
  if (!m) return 100;
  const n = Number(m[1]);
  return m[2] === "GB" ? n * 1000 : m[2] === "kB" ? n / 1000 : n;
}

function build(ctx: Ctx, args: string[]): CmdResult {
  const tags: string[] = [];
  let file: string | undefined;
  const positional: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "-t" || a === "--tag") tags.push(args[++i] ?? "");
    else if (a.startsWith("--tag=")) tags.push(a.slice(6));
    else if (a === "-f" || a === "--file") file = args[++i];
    else if (a === "--build-arg" || a === "--platform" || a === "--target") i++;
    else if (!a.startsWith("-")) positional.push(a);
  }
  if (positional.length !== 1) return fail(['ERROR: "docker buildx build" requires exactly 1 argument.', "", "Usage:  docker buildx build [OPTIONS] PATH | URL | -"], 1);
  const ctxPath = resolvePath(ctx.state.cwd, positional[0]);
  const ctxDir = getDir(ctx.state.root, ctxPath);
  if (!ctxDir) return fail(`ERROR: unable to prepare context: path "${positional[0]}" not found`, 1);
  const dfPath = file ? resolvePath(ctx.state.cwd, file) : `${ctxPath}/Dockerfile`;
  const dfNode = getNode(ctx.state.root, dfPath);
  if (!dfNode || dfNode.type !== "file") {
    return fail(`ERROR: failed to solve: failed to read dockerfile: open ${file ?? "Dockerfile"}: no such file or directory`, 1);
  }
  const insts = parseDockerfile(dfNode.content);
  if (typeof insts === "string") return fail(`ERROR: failed to solve: ${insts}`, 1);
  if (insts[0].op !== "FROM" && !(insts[0].op === "ARG" && insts.some((i) => i.op === "FROM"))) {
    return fail("ERROR: failed to solve: no build stage in current context", 1);
  }
  const from = insts.find((i) => i.op === "FROM") as Instruction;
  const baseRef = from.arg.split(/\s+/)[0];
  const { repo: baseRepo, tag: baseTag } = parseRef(baseRef);
  const spec = CATALOG[baseRepo];
  if (!spec && baseRepo !== "scratch") {
    return fail(`ERROR: failed to solve: ${baseRef}: failed to resolve source metadata for docker.io/library/${baseRef}: pull access denied, repository does not exist or may require authorization: server message: insufficient_scope: authorization failed`, 1);
  }
  const d = ctx.state.docker;
  const files = contextFiles(ctxDir);
  const keyed = layerKeys(insts, files);
  if (keyed.error) return fail(`ERROR: failed to solve: ${keyed.error}`, 1);
  if (spec && !d.images.some((im) => im.repo === baseRepo && im.tag === baseTag)) {
    pullLines(ctx, baseRepo, baseTag);
  }
  d.buildCache ??= [];
  const cache = new Set(d.buildCache);
  const total = keyed.layers.length;
  const lines: string[] = [];
  const w = (label: string, t: string) => ` => ${label}`.padEnd(70) + t.padStart(6);
  lines.push(w("[internal] load build definition from Dockerfile", "0.0s"), w(`[internal] load metadata for docker.io/library/${baseRef}`, "0.3s"), w("[internal] load .dockerignore", "0.0s"));
  let cachedCount = 0;
  let n = 0;
  for (const layer of keyed.layers) {
    n++;
    const cached = cache.has(layer.key);
    if (cached) cachedCount++;
    const label = `[${n}/${total}] ${layer.inst.text}`;
    const time = layer.inst.op === "RUN" && !cached ? "8.2s" : layer.inst.op === "COPY" && !cached ? "0.1s" : "0.0s";
    lines.push(w(`${cached ? "CACHED " : ""}${label}`, cached ? "0.0s" : time));
    cache.add(layer.key);
  }
  d.buildCache = [...cache].slice(-300);
  const idHash = fakeHash(`${ctxPath}:${layer(keyed.layers)}:${ctx.now}`, 64);
  const names = tags.length ? tags : ["<none>:<none>"];
  const extra = keyed.layers.filter((l) => l.inst.op === "RUN").length * 40 + Object.keys(files).length * 0.01;
  const base = spec ? sizeMb(spec.size) * (/slim/.test(baseTag) ? 0.18 : /alpine/.test(baseTag) ? 0.06 : 1) : 0;
  const sizeText = base + extra >= 1000 ? `${((base + extra) / 1000).toFixed(2)}GB` : `${Math.max(1, Math.round(base + extra))}MB`;
  const expose = insts.filter((i) => i.op === "EXPOSE").flatMap((i) => i.arg.split(/\s+/).map((x) => parseInt(x, 10)).filter(Number.isFinite));
  const cmdInst = [...insts].reverse().find((i) => i.op === "CMD" || i.op === "ENTRYPOINT");
  const built: NonNullable<DockerImage["built"]> = {
    context: ctxPath,
    dockerfileKey: dockerfileKey(dfNode.content),
    expose,
    cmd: cmdInst ? cmdInst.arg.replace(/[\[\]"]/g, "").replace(/,\s*/g, " ") : "",
  };
  for (const nm of names) {
    const { repo, tag } = nm === "<none>:<none>" ? { repo: "<none>", tag: "<none>" } : parseRef(nm);
    d.images = d.images.filter((im) => !(im.repo === repo && im.tag === tag));
    d.images.unshift({ repo, tag, id: idHash.slice(0, 12), size: sizeText, created: "Less than a second ago", built });
  }
  lines.push(w("exporting to image", "0.2s"), w(" => exporting layers", "0.1s").replace(" =>  =>", " => =>"), w(` => writing image sha256:${idHash}`, "0.0s").replace(" =>  =>", " => =>"));
  for (const nm of names) if (nm !== "<none>:<none>") lines.push(w(` => naming to docker.io/library/${nm}`, "0.0s").replace(" =>  =>", " => =>"));
  const secs = (0.6 + (total - cachedCount) * 1.7).toFixed(1);
  return ok([`[+] Building ${secs}s (${total + 4}/${total + 4}) FINISHED`, ...lines]);
}

function layer(layers: Layer[]): string {
  return layers.map((l) => l.key).join("");
}

const DOCKER_USAGE = [
  "",
  "Usage:  docker [OPTIONS] COMMAND",
  "",
  "A self-sufficient runtime for containers",
  "",
  "Common Commands:",
  "  run         Create and run a new container from an image",
  "  ps          List containers",
  "  pull        Download an image from a registry",
  "  images      List images",
  "  logs        Fetch the logs of a container",
  "  stop        Stop one or more running containers",
  "  start       Start one or more stopped containers",
  "  rm          Remove one or more containers",
  "  rmi         Remove one or more images",
  "  version     Show the Docker version information",
];

export const DOCKER_SUBCOMMANDS = ["run", "ps", "pull", "images", "logs", "stop", "start", "restart", "rm", "rmi", "version", "build", "exec", "volume"];

export function docker(ctx: Ctx, args: string[]): CmdResult {
  const [sub, ...rest] = args;
  if (!sub || sub === "--help" || sub === "help") return ok(DOCKER_USAGE);
  switch (sub) {
    case "--version":
    case "-v":
      return ok(["Docker version 27.3.1, build ce12230"]);
    case "version":
      return ok(["Client: Docker Engine - Community", " Version:           27.3.1", " API version:       1.47", "", "Server: Docker Engine - Community", " Engine:", "  Version:          27.3.1"]);
    case "pull": {
      const ref = rest.find((a) => !a.startsWith("-"));
      if (!ref) return fail(['"docker pull" requires exactly 1 argument.', "See 'docker pull --help'."]);
      const { repo, tag } = parseRef(ref);
      const res = pullLines(ctx, repo, tag);
      if (tag === "latest" && !ref.includes(":") && !res.code) res.out.unshift("Using default tag: latest");
      return res;
    }
    case "build":
      return build(ctx, rest);
    case "exec":
      return execCmd(ctx, rest);
    case "volume":
      return volumeCmd(ctx, rest);
    case "image":
      if (rest[0] === "ls" || rest[0] === "list") return docker(ctx, ["images", ...rest.slice(1)]);
      return fail(`docker: 'image ${rest[0] ?? ""}' is not a docker command.`);
    case "images": {
      const rows = [["REPOSITORY", "TAG", "IMAGE ID", "CREATED", "SIZE"]];
      const only = rest.find((a) => !a.startsWith("-"));
      if (only) {
        const { repo: r, tag: t } = parseRef(only);
        const hit = ctx.state.docker.images.filter((im) => im.repo === r && (only.includes(":") ? im.tag === t : true));
        for (const im of hit) rows.push([im.repo, im.tag, im.id, im.created, im.size]);
        return ok(table(rows));
      }
      for (const im of ctx.state.docker.images) rows.push([im.repo, im.tag, im.id, im.created, im.size]);
      return ok(table(rows));
    }
    case "run":
      return run(ctx, rest);
    case "ps":
      return ps(ctx, rest);
    case "container":
      if (rest[0] === "ls") return ps(ctx, rest.slice(1));
      return fail(`docker: 'container ${rest[0] ?? ""}' is not a docker command.`);
    case "stop":
    case "start":
    case "restart":
      return stopOrStart(ctx, rest, sub);
    case "rm":
      return rmContainers(ctx, rest);
    case "rmi":
      return rmi(ctx, rest);
    case "logs": {
      let tail = Infinity;
      const pos: string[] = [];
      for (let i = 0; i < rest.length; i++) {
        if (rest[i] === "--tail" || rest[i] === "-n") tail = Number(rest[++i]) || tail;
        else if (rest[i].startsWith("--tail=")) tail = Number(rest[i].slice(7)) || tail;
        else if (!rest[i].startsWith("-")) pos.push(rest[i]);
      }
      const key = pos[0];
      if (!key) return fail(['"docker logs" requires exactly 1 argument.', "See 'docker logs --help'."]);
      const c = findContainer(ctx, key);
      if (!c) return fail(`Error response from daemon: No such container: ${key}`);
      return ok(Number.isFinite(tail) ? c.logs.slice(-tail) : [...c.logs]);
    }
    default:
      return fail([`docker: '${sub}' is not a docker command.`, "See 'docker --help'"]);
  }
}

/** `curl localhost:<cổng>` - trả trang chào của nginx nếu có container đang mở cổng đó. */
export function curl(ctx: Ctx, args: string[]): CmdResult {
  const url = args.find((a) => !a.startsWith("-"));
  if (!url) return fail(["curl: try 'curl --help' or 'curl --manual' for more information"], 2);
  const m = /^(?:https?:\/\/)?(localhost|127\.0\.0\.1|0\.0\.0\.0)(?::(\d+))?(\/.*)?$/.exec(url);
  if (!m) return fail(`curl: (6) Could not resolve host: ${url.replace(/^https?:\/\//, "").split("/")[0]}`, 6);
  const port = Number(m[2] ?? 80);
  const c = ctx.state.docker.containers.find((x) => x.status === "running" && x.ports.some((p) => p.host === port));
  if (!c) return fail(`curl: (7) Failed to connect to ${m[1]} port ${port} after 0 ms: Couldn't connect to server`, 7);
  if (!c.image.startsWith("nginx")) return fail(`curl: (52) Empty reply from server`, 52);
  c.logs.push(`172.17.0.1 - - [${formatLogDate(ctx.now)}] "GET ${m[3] ?? "/"} HTTP/1.1" 200 615 "-" "curl/8.5.0" "-"`);
  return ok([
    "<!DOCTYPE html>",
    "<html>",
    "<head>",
    "<title>Welcome to nginx!</title>",
    "</head>",
    "<body>",
    "<h1>Welcome to nginx!</h1>",
    "<p>If you see this page, the nginx web server is successfully installed and",
    "working. Further configuration is required.</p>",
    "<p><em>Thank you for using nginx.</em></p>",
    "</body>",
    "</html>",
  ]);
}
/* i18n-ignore-end */
