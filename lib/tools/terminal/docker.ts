/** Docker mô phỏng: kéo image, chạy/dừng/xoá container, xem nhật ký. Không có
 *  container thật nào chạy - chỉ có bảng trạng thái và nhật ký giả lập. */
/* i18n-ignore-start: đầu ra của chính Docker CLI và nhật ký nginx/node/postgres
   giả lập - người đi làm đọc chúng bằng tiếng Anh đúng như vậy trên máy thật */
import type { CmdResult, Ctx, DockerContainer, PortMap } from "./types";
import { fakeHash, formatLogDate, table, timeAgo } from "./util";

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
  images.unshift({ repo, tag, id: fakeHash(`${repo}:${tag}:image`, 12), size: spec.size, created: spec.created });
  return ok([`${tag}: Pulling from library/${repo}`, ...layers, `Digest: sha256:${digest}`, `Status: Downloaded newer image for ${repo}:${tag}`, `docker.io/library/${repo}:${tag}`]);
}

function findContainer(ctx: Ctx, key: string): DockerContainer | undefined {
  return ctx.state.docker.containers.find((c) => c.name === key || (key.length >= 3 && c.id.startsWith(key)));
}

function portText(ports: PortMap[]): string {
  return ports.map((p) => `0.0.0.0:${p.host}->${p.container}/tcp, [::]:${p.host}->${p.container}/tcp`).join(", ");
}

function run(ctx: Ctx, args: string[]): CmdResult {
  let detach = false;
  let name: string | undefined;
  const ports: PortMap[] = [];
  let image: string | undefined;
  let rm = false;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (image) break;
    if (a === "-d" || a === "--detach") detach = true;
    else if (a === "--rm") rm = true;
    else if (a === "-it" || a === "-i" || a === "-t" || a === "-dit") detach = detach || a === "-dit";
    else if (a === "--name") name = args[++i];
    else if (a.startsWith("--name=")) name = a.slice(7);
    else if (a === "-e" || a === "--env" || a === "-v" || a === "--volume") i++;
    else if (a === "-p" || a === "--publish" || a.startsWith("-p")) {
      const v = a === "-p" || a === "--publish" ? args[++i] : a.slice(2);
      const m = /^(?:[\d.]+:)?(\d+):(\d+)(?:\/tcp)?$/.exec(v ?? "");
      if (!m) return fail(`docker: invalid publish opts format (should be name=value but no = found): ${v ?? ""}`, 125);
      ports.push({ host: Number(m[1]), container: Number(m[2]) });
    } else if (a.startsWith("-")) return fail([`unknown shorthand flag: '${a.replace(/^-+/, "")[0]}' in ${a}`, "See 'docker run --help'."], 125);
    else image = a;
  }
  if (!image) return fail(['"docker run" requires at least 1 argument.', "See 'docker run --help'.", "", "Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]"], 125);
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
  const spec = CATALOG[repo];
  d.counter++;
  const id = fakeHash(`container:${d.counter}:${repo}:${ctx.now}`, 64);
  const logs = spec.logs(formatLogDate(ctx.now));
  const container: DockerContainer = {
    id,
    name: name ?? `${ADJECTIVES[d.counter % ADJECTIVES.length]}_${SCIENTISTS[(d.counter * 3) % SCIENTISTS.length]}`,
    image: tag === "latest" ? repo : `${repo}:${tag}`,
    command: spec.command,
    status: spec.daemon ? "running" : "exited",
    exitCode: 0,
    ports: spec.daemon ? ports : [],
    created: ctx.now,
    createdSeq: ctx.state.seq,
    logs,
  };
  if (!(rm && !spec.daemon)) d.containers.unshift(container);
  if (detach) return ok([...out, id]);
  const res = ok([...out, ...logs]);
  if (spec.daemon) res.notices = ["foreground"];
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
      const spec = CATALOG[c.image.split(":")[0]];
      if (spec?.daemon) {
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

export const DOCKER_SUBCOMMANDS = ["run", "ps", "pull", "images", "logs", "stop", "start", "restart", "rm", "rmi", "version"];

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
    case "images": {
      const rows = [["REPOSITORY", "TAG", "IMAGE ID", "CREATED", "SIZE"]];
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
      const key = rest.find((a) => !a.startsWith("-"));
      if (!key) return fail(['"docker logs" requires exactly 1 argument.', "See 'docker logs --help'."]);
      const c = findContainer(ctx, key);
      if (!c) return fail(`Error response from daemon: No such container: ${key}`);
      return ok([...c.logs]);
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
