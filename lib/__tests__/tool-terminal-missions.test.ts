import { describe, expect, it } from "vitest";
import { createInitialState } from "../tools/terminal/seed";
import { migrateState } from "../tools/terminal/labs";
import { runLine } from "../tools/terminal/shell";
import { TERMINAL_MISSIONS, completedMissionIds } from "../tools/terminal/missions";
import { toolTerminalVi, toolTerminalEn } from "../i18n/dictionaries/sections/tool-terminal";
import type { TermState } from "../tools/terminal/types";

const NOW = Date.UTC(2026, 9, 4, 3, 0, 0);

function sh(state: TermState, ...lines: string[]) {
  let s = state;
  let text = "";
  let code = 0;
  lines.forEach((line, i) => {
    const r = runLine(s, line, NOW + (s.seq + i + 1) * 1000);
    s = r.state;
    text = r.result.lines.map((l) => l.spans.map((x) => x.t).join("")).join("\n");
    code = r.result.code;
  });
  return { s, text, code };
}

const fresh = () => createInitialState(NOW);
const done = (s: TermState, id: string) => completedMissionIds(s).includes(id);

/** Chuỗi lệnh đúng cho từng nhiệm vụ mới, và vài cách làm sai / thiếu giữ nó đỏ. */
const CASES: Record<string, { good: string[]; bad: string[][] }> = {
  "chmod-exec": {
    good: ['echo "echo Xin chao" > chao.sh', "./chao.sh", "chmod +x chao.sh", "./chao.sh"],
    bad: [
      ['echo "echo Xin chao" > chao.sh', "./chao.sh"], // Permission denied
      ['echo "echo Xin chao" > chao.sh', "bash chao.sh", "chmod +x chao.sh"], // chưa chạy bằng ./
      ["touch rong.sh", "chmod +x rong.sh", "./rong.sh"], // tệp rỗng
    ],
  },
  "chmod-key": {
    good: ["ls -la", "chmod 600 ~/.ssh/id_ed25519", "chmod 700 ~/.ssh"],
    bad: [["chmod 600 ~/.ssh/id_ed25519"], ["chmod 700 ~/.ssh"], ["chmod 644 ~/.ssh/id_ed25519", "chmod 700 ~/.ssh"]],
  },
  "env-export": {
    good: ["export APP_ENV=production", "export PORT=8080", "printenv APP_ENV"],
    bad: [
      ["APP_ENV=production", "PORT=8080", "printenv APP_ENV"], // không export
      ["export APP_ENV=production", "printenv APP_ENV"], // thiếu PORT
      ["export APP_ENV=production", "export PORT=8080"], // chưa kiểm tra
      ["export APP_ENV=staging", "export PORT=8080", "env"],
    ],
  },
  "log-errors": {
    good: ["grep ERROR /var/log/myapp/app.log > loi.txt"],
    bad: [
      ["grep ERROR /var/log/myapp/app.log"], // không lưu
      ["grep WARN /var/log/myapp/app.log > loi.txt"], // sai mức
      ["grep -i error /var/log/myapp/app.log | head -3 > loi.txt"], // thiếu dòng
      ["cp /var/log/myapp/app.log loi.txt"], // cả tệp
    ],
  },
  "dns-lookup": {
    good: ["dig +short vi-du.vn > ip-may-chu.txt"],
    bad: [["echo 203.0.113.10 > ip.txt"], ["dig +short vi-du.vn"], ["dig +short example.com > ip.txt"]],
  },
  "docker-logs": {
    good: ["docker run -d -p 8081:80 --name web81 nginx", "curl localhost:8081", "docker logs web81"],
    bad: [
      ["docker run -d -p 8081:80 --name web81 nginx", "docker logs web81"], // chưa có yêu cầu
      ["docker run -d -p 8081:80 --name web81 nginx", "docker logs web81", "curl localhost:8081"], // đọc trước khi gọi
      ["docker run -d -p 8080:80 --name web nginx", "curl localhost:8080", "docker logs web"], // sai cổng
    ],
  },
  "log-rank": {
    good: ["grep ERROR /var/log/myapp/app.log | cut -d' ' -f4 | sort | uniq -c | sort -rn > top-loi.txt"],
    bad: [
      ["grep ERROR /var/log/myapp/app.log | cut -d' ' -f4 | sort | uniq -c > top-loi.txt"], // chưa xếp theo số lần
      ["grep ERROR /var/log/myapp/app.log | cut -d' ' -f4 | sort | uniq > top-loi.txt"], // không đếm
      ["grep ERROR /var/log/myapp/app.log | cut -d' ' -f4 | sort | uniq -c | sort -n > top-loi.txt"], // ngược
    ],
  },
  "find-old-logs": {
    good: ["ls -l /var/log/myapp", "find /var/log/myapp -type f -mtime +14", "find /var/log/myapp -type f -mtime +14 -delete"],
    bad: [
      ["find /var/log/myapp -type f -mtime +14"], // chỉ xem
      ["rm -r /var/log/myapp/*"], // xoá luôn tệp mới
      ["find /var/log/myapp -type f -mtime +3 -delete"], // quá tay
      ["find /var/log/myapp -type f -mtime +40 -delete"], // chưa đủ
    ],
  },
  "ps-kill": {
    good: ["ps aux --sort=-%cpu", "kill 4121", "kill 6120", "ps aux", "kill -9 6120"],
    bad: [
      ["ps aux", "kill 4121"], // java còn
      ["ps aux", "kill 4121", "kill 6120"], // java lờ SIGTERM
      ["ps aux", "kill -9 4121", "kill -9 6120", "kill -9 903"], // giết nhầm worker
      ["kill -9 4121", "kill -9 6120"], // chưa nhìn ps, nhưng cả hai dừng -> vẫn phải ĐỎ ở tiêu chí looked, final lại xanh
    ],
  },
  "git-revert": {
    good: ["cd /srv/cua-hang", "git log --oneline", "REVERT"],
    bad: [
      ["cd /srv/cua-hang", "git log --oneline", "git reset --hard HEAD~2"], // viết lại lịch sử
      ["cd /srv/cua-hang", "git revert HEAD"], // hoàn tác nhầm commit (banner)
      ["cd /srv/cua-hang", "echo 'shipping-fee: 30000' > ship.txt"], // sửa tay, chưa commit
    ],
  },
  "git-tag": {
    good: ["cd /srv/phat-hanh", "git log --oneline", "TAG"],
    bad: [["cd /srv/phat-hanh", "git tag v1.0.0"], ["cd /srv/phat-hanh", "git tag v1"], ["cd /srv/phat-hanh", "git tag -d v1.0.0"]],
  },
  "docker-volume": {
    good: [
      "docker volume create pgdata",
      "docker run -d --name db -e POSTGRES_PASSWORD=bimat -v pgdata:/var/lib/postgresql/data postgres",
      "docker rm -f db",
      "docker run -d --name db2 -e POSTGRES_PASSWORD=bimat -v pgdata:/var/lib/postgresql/data postgres",
    ],
    bad: [
      ["docker run -d --name db -e POSTGRES_PASSWORD=bimat -v pgdata:/var/lib/postgresql/data postgres"], // chưa xoá và chạy lại
      ["docker run -d --name db -e POSTGRES_PASSWORD=bimat postgres", "docker rm -f db", "docker run -d --name db2 -e POSTGRES_PASSWORD=bimat postgres"], // không volume
      ["docker run -d --name db -v pgdata:/var/lib/postgresql/data postgres"], // thiếu mật khẩu: container thoát mã 1
      ["docker run -d --name db -e POSTGRES_PASSWORD=x -v pgdata:/var/lib/postgresql/data postgres", "docker run -d --name db2 -p 5433:5432 -e POSTGRES_PASSWORD=x -v pgdata:/var/lib/postgresql/data postgres"], // container cũ còn
    ],
  },
  "docker-build": {
    good: ["cd /srv/api", "DOCKERFILE", "docker build -t api:1.0 ."],
    bad: [
      ["cd /srv/api", "docker build -t api:1.0 ."], // Dockerfile cũ: không thân thiện bộ nhớ đệm
      ["cd /srv/api", "DOCKERFILE"], // sửa mà chưa build
      ["cd /srv/api", "DOCKERFILE", "docker build -t api:2.0 ."], // sai thẻ
      ["cd /srv/api", "printf 'FROM node:22-slim\\nCOPY . .\\nRUN npm ci\\n' > Dockerfile"], // thiếu lớp, npm ci hỏng
    ],
  },
  "git-conflict": {
    good: ["cd /srv/trang-chu", "git merge sua-tieu-de", "INDEX", "git add index.html", "git commit -m 'Gop nhanh'"],
    bad: [
      ["cd /srv/trang-chu", "git merge sua-tieu-de"], // dừng ở xung đột
      ["cd /srv/trang-chu", "git merge sua-tieu-de", "git add index.html", "git commit -m x"], // add khi còn dấu
      ["cd /srv/trang-chu", "git merge sua-tieu-de", "git merge --abort"],
      ["cd /srv/trang-chu", "git merge sua-tieu-de", "INDEX"], // sửa nhưng chưa commit
    ],
  },
  "git-push-rejected": {
    good: ["cd /srv/blog", "git push", "git pull", "git push"],
    bad: [
      ["cd /srv/blog", "git push"], // bị từ chối
      ["cd /srv/blog", "git push --force"], // đè lên bài của đồng nghiệp
      ["cd /srv/blog", "git fetch"], // lấy về mà chưa gộp
      ["cd /srv/blog", "git pull"], // gộp mà chưa đẩy
    ],
  },
  "env-secret": {
    good: ["cd du-an", "echo API_KEY=abc123 > .env", "echo .env >> .gitignore", "git init", "git add .", "git commit -m 'Khoi tao'", "git status"],
    bad: [
      ["cd du-an", "echo API_KEY=abc123 > .env", "git init", "git add .", "git commit -m 'Khoi tao'"], // đã commit .env
      ["cd du-an", "echo API_KEY=abc123 > .env", "echo .env >> .gitignore"], // chưa commit
      ["cd du-an", "echo .env >> .gitignore", "git init", "git add .", "git commit -m x"], // chưa có .env
    ],
  },
};

const REVERT_SCRIPT = (s: TermState) => {
  const id = Object.values(s.git["/srv/cua-hang"].commits).find((c) => c.message === "Change shipping fee rule")!.id;
  return `git revert ${id.slice(0, 7)}`;
};

/** Chuỗi lệnh có phụ thuộc vào trạng thái (mã commit, nội dung vừa in). */
function expand(s: TermState, lines: string[]): string[] {
  return lines.flatMap((l) => {
    if (l === "REVERT") return [REVERT_SCRIPT(s)];
    if (l === "TAG") {
      const r = s.git["/srv/phat-hanh"];
      const id = Object.values(r.commits).find((c) => c.message === "Release 1.0: freeze packaging")!.id;
      return [`git tag v1.0.0 ${id.slice(0, 7)}`];
    }
    if (l === "DOCKERFILE")
      return ["printf 'FROM node:22-slim\\nWORKDIR /app\\nCOPY package*.json ./\\nRUN npm ci --omit=dev\\nCOPY . .\\nEXPOSE 3000\\nCMD [\"node\", \"server.js\"]\\n' > Dockerfile"];
    if (l === "INDEX")
      return ["printf '<html>\\n<body>\\n<h1>Hoc cong nghe moi ngay</h1>\\n<p>Welcome</p>\\n</body>\\n</html>\\n' > index.html"];
    return [l];
  });
}

function play(lines: string[], from: TermState = fresh()): TermState {
  let s = from;
  for (const raw of lines) {
    for (const l of expand(s, [raw])) s = sh(s, l).s;
  }
  return s;
}

const NEW_IDS = Object.keys(CASES);

describe("terminal missions (mở rộng)", () => {
  it("every new mission has vi and en copy and criteria labels", () => {
    for (const id of NEW_IDS) {
      const m = TERMINAL_MISSIONS.find((x) => x.id === id);
      expect(m, id).toBeTruthy();
      const vi = toolTerminalVi.toolTerminal.missions[id as keyof typeof toolTerminalVi.toolTerminal.missions];
      const en = toolTerminalEn.toolTerminal.missions[id as keyof typeof toolTerminalEn.toolTerminal.missions];
      for (const c of [vi, en]) {
        expect(c.title && c.hint && c.brief && c.from, id).toBeTruthy();
        const labels = c.criteria as Record<string, string>;
        for (const cr of (m as (typeof TERMINAL_MISSIONS)[number]).criteria) expect(labels[cr.id], `${id}.${cr.id}`).toBeTruthy();
      }
      expect(JSON.stringify(en), id).not.toMatch(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i);
    }
  });

  it("covers every mission in the registry, 8 old + the new ones", () => {
    expect(TERMINAL_MISSIONS.length).toBe(8 + NEW_IDS.length);
    expect(new Set(TERMINAL_MISSIONS.map((m) => m.id)).size).toBe(TERMINAL_MISSIONS.length);
  });

  it("every mission is red on a fresh machine and on a migrated old save", () => {
    expect(completedMissionIds(fresh())).toEqual([]);
    const old = fresh();
    // lưu cũ: chưa có dữ liệu mẫu nâng cao
    delete old.seedVersion;
    delete old.procs;
    delete old.root.children["srv"];
    delete old.root.children["var"];
    delete old.git["/srv/cua-hang"];
    expect(completedMissionIds(migrateState(old, NOW))).toEqual([]);
    expect(migrateState(old, NOW).seedVersion).toBeGreaterThan(0);
  });

  it("final criterion is the mission check, criteria go weak to strong", () => {
    for (const id of NEW_IDS) {
      const m = TERMINAL_MISSIONS.find((x) => x.id === id)!;
      expect(m.check).toBe(m.criteria[m.criteria.length - 1].check);
      const s = play(CASES[id].good);
      // tiêu chí đạt rồi thì các tiêu chí yếu hơn phía trước không thể đỏ
      m.criteria.forEach((cr) => expect(cr.check(s), `${id}.${cr.id}`).toBe(true));
    }
  });

  for (const id of NEW_IDS) {
    it(`${id}: green with the reference steps, red otherwise`, () => {
      const m = TERMINAL_MISSIONS.find((x) => x.id === id)!;
      expect(m.check(fresh())).toBe(false);
      expect(m.check(play(CASES[id].good))).toBe(true);
      CASES[id].bad.forEach((steps, i) => {
        const s = play(steps);
        const expected = id === "ps-kill" && i === 3; // cả hai tiến trình dừng thật: đạt dù chưa gõ ps
        expect(m.check(s), `${id} wrong way #${i + 1}: ${steps.join(" ; ")}`).toBe(expected);
      });
    });
  }

  it("old missions stay red when only the new labs are touched", () => {
    const s = play(["cd /srv/cua-hang", "git switch -c nhanh-moi", "git status", "cd /srv/trang-chu", "git log --oneline"]);
    expect(done(s, "git-commit")).toBe(false);
    expect(done(s, "git-branch")).toBe(false);
  });
});

describe("terminal engine (phần mở rộng)", () => {
  it("variables: export is visible to scripts, a plain assignment is not", () => {
    let r = sh(fresh(), 'echo \'echo "env=$APP_ENV"\' > show.sh', "chmod +x show.sh", "APP_ENV=dev", "./show.sh");
    expect(r.text).toBe("env=");
    r = sh(r.s, "export APP_ENV=prod", "./show.sh");
    expect(r.text).toBe("env=prod");
    expect(sh(r.s, "export A=1 && echo $A").text).toBe("1");
    expect(sh(r.s, "printenv APP_ENV").text).toBe("prod");
    expect(sh(r.s, "printenv NOPE").code).toBe(1);
    expect(sh(r.s, "export 1bad=x").text).toContain("not a valid identifier");
    expect(sh(r.s, "unset APP_ENV", "printenv APP_ENV").code).toBe(1);
    expect(sh(r.s, "env").text).toContain("APP_ENV=prod");
  });

  it("sort, uniq, cut and printf behave like coreutils", () => {
    const r = sh(fresh(), "printf 'b 2\\na 10\\nb 2\\nc 1\\n' > f.txt");
    expect(sh(r.s, "sort f.txt").text).toBe("a 10\nb 2\nb 2\nc 1");
    expect(sh(r.s, "sort -r f.txt | head -n 1").text).toBe("c 1");
    expect(sh(r.s, "cut -d' ' -f2 f.txt | sort -n | uniq -c").text).toBe("      1 1\n      2 2\n      1 10");
    expect(sh(r.s, "cut -d' ' -f1 f.txt | sort | uniq -c | sort -rn").text).toBe("      2 b\n      1 c\n      1 a");
    expect(sh(r.s, "sort -u f.txt | wc -l").text).toBe("3");
    expect(sh(r.s, "cut f.txt").code).toBe(1);
  });

  it("ps and kill: SIGTERM, SIGKILL, permissions", () => {
    let r = sh(fresh(), "ps aux --sort=-%cpu");
    expect(r.text.split("\n")[1]).toContain("node server.js");
    expect(sh(fresh(), "ps").text).toContain("bash");
    r = sh(fresh(), "kill 6120");
    expect(r.code).toBe(0);
    expect(sh(r.s, "ps aux").text).toContain("report-gen.jar");
    expect(sh(r.s, "kill -9 6120", "ps aux").text).not.toContain("report-gen.jar");
    expect(sh(fresh(), "kill 1").text).toBe("bash: kill: (1) - Operation not permitted");
    expect(sh(fresh(), "kill 99999").text).toBe("bash: kill: (99999) - No such process");
    expect(sh(fresh(), "kill").code).toBe(2);
  });

  it("dig, nslookup, host and ping use a small fixed zone", () => {
    expect(sh(fresh(), "dig +short vi-du.vn").text).toBe("203.0.113.10");
    expect(sh(fresh(), "dig +short www.vi-du.vn").text).toBe("vi-du.vn.\n203.0.113.10");
    expect(sh(fresh(), "dig vi-du.vn").text).toContain("status: NOERROR");
    expect(sh(fresh(), "dig khong-co.vn").text).toContain("status: NXDOMAIN");
    expect(sh(fresh(), "nslookup vi-du.vn").text).toContain("Address: 203.0.113.10");
    expect(sh(fresh(), "nslookup khong-co.vn").code).toBe(1);
    expect(sh(fresh(), "host vi-du.vn").text).toBe("vi-du.vn has address 203.0.113.10");
    expect(sh(fresh(), "ping -c 2 vi-du.vn").text).toContain("2 packets transmitted, 2 received");
    expect(sh(fresh(), "ping nope.vn").text).toBe("ping: nope.vn: Name or service not known");
  });

  it("find: -mtime, -delete and ls -l dates", () => {
    const r = sh(fresh(), "find /var/log/myapp -type f -mtime +14");
    expect(r.text.split("\n")).toEqual(["/var/log/myapp/access.log.2.gz", "/var/log/myapp/app.log.3.gz", "/var/log/myapp/app.log.4.gz", "/var/log/myapp/archive/2026-06.gz"]);
    expect(sh(fresh(), "find /var/log/myapp -type f -mtime -2").text).toBe("/var/log/myapp/access.log\n/var/log/myapp/app.log\n/var/log/myapp/error.log");
    expect(sh(r.s, "find /var/log/myapp -type f -mtime +14 -delete", "ls /var/log/myapp").text).toBe("access.log  app.log  app.log.1  app.log.2.gz  archive  error.log");
  });

  it("docker: volumes, env, exec, logs --tail, postgres rules", () => {
    let r = sh(fresh(), "docker run -d --name db postgres");
    r = sh(r.s, "docker ps -a");
    expect(r.text).toContain("Exited (1)");
    expect(sh(r.s, "docker logs db").text).toContain("POSTGRES_PASSWORD");
    r = sh(fresh(), "docker volume create v", "docker run -d --name db -e POSTGRES_PASSWORD=x -v v:/var/lib/postgresql/data postgres", "docker volume ls");
    expect(r.text).toMatch(/local\s+v/);
    expect(sh(r.s, "docker volume rm v").text).toContain("volume is in use");
    expect(sh(r.s, "docker exec db printenv POSTGRES_PASSWORD").text).toBe("x");
    expect(sh(r.s, "docker logs --tail 1 db").text).toContain("ready to accept connections");
    r = sh(r.s, "docker rm -f db", "docker run -d --name db2 -v v:/var/lib/postgresql/data postgres", "docker logs db2");
    expect(r.text).toContain("Skipping initialization");
    expect(sh(r.s, "docker exec ghost ls").text).toContain("No such container");
  });

  it("docker build: cache hits, errors, run of a built image", () => {
    const base = sh(fresh(), "cd /srv/api").s;
    let r = sh(base, "docker build -t api:1.0 .");
    expect(r.code).toBe(0);
    expect(r.text).toContain("naming to docker.io/library/api:1.0");
    expect(sh(r.s, "docker images").text).toMatch(/api\s+1\.0/);
    r = sh(r.s, "docker build -t api:1.1 .");
    expect(r.text).toContain("CACHED [1/6] FROM node:22-slim");
    r = sh(r.s, "echo '// edit' >> server.js", "docker build -t api:1.2 .");
    expect(r.text).toMatch(/CACHED \[2\/6\] WORKDIR/);
    expect(r.text).not.toMatch(/CACHED \[4\/6\] RUN npm ci/);
    expect(sh(r.s, "docker run -d -p 3000:3000 --name api api:1.0", "docker logs api").text).toContain("Server listening on port 3000");
    expect(sh(base, "docker build .").code).toBe(0);
    expect(sh(sh(base, "cd /home/ban").s, "docker build .").text).toContain('"." not found'.replace('"." not found', "Dockerfile")); // không có Dockerfile ở thư mục nhà
    expect(sh(base, "echo 'FROM nope/x' > Dockerfile", "docker build .").text).toContain("pull access denied");
    expect(sh(base, "echo 'BAD' > Dockerfile", "docker build .").text).toContain("unknown instruction");
    expect(sh(base, "printf 'FROM node:22-slim\\nRUN npm ci\\n' > Dockerfile", "docker build .").text).toContain("exit code: 254");
  });

  it("git: revert, reset, tag, show, stash, rm --cached", () => {
    const base = sh(fresh(), "cd /srv/cua-hang").s;
    expect(sh(base, "git log --oneline").text.split("\n")).toHaveLength(4);
    expect(sh(base, "git show HEAD~1 --stat").text).toContain("ship.txt");
    let r = sh(base, "git reset --soft HEAD~1", "git status");
    expect(r.text).toContain("Changes to be committed");
    r = sh(base, "git reset --hard HEAD~2", "cat ship.txt");
    expect(r.text).toBe("shipping-fee: 30000");
    r = sh(base, "git reset HEAD~1", "git status");
    expect(r.text).toContain("Changes not staged");
    r = sh(base, "echo extra >> cart.txt", "git stash", "git status");
    expect(r.text).toContain("working tree clean");
    expect(sh(r.s, "git stash list").text).toContain("stash@{0}: WIP on main");
    expect(sh(r.s, "git stash pop", "cat cart.txt").text).toContain("extra");
    expect(sh(base, "git tag v0 HEAD~2", "git tag", "git log --oneline").text).toContain("tag: v0");
    expect(sh(base, "git tag v0", "git tag v0").text).toContain("already exists");
    r = sh(base, "git rm --cached banner.txt", "git status");
    expect(r.text).toContain("deleted:    banner.txt");
    expect(sh(base, "git revert nope").text).toContain("unknown revision");
  });

  it("git: conflict markers, abort, resolve and merge commit", () => {
    const base = sh(fresh(), "cd /srv/trang-chu").s;
    let r = sh(base, "git merge sua-tieu-de");
    expect(r.text).toContain("CONFLICT (content): Merge conflict in index.html");
    expect(sh(r.s, "cat index.html").text).toBe(
      "<html>\n<body>\n<<<<<<< HEAD\n<h1>Study every day</h1>\n=======\n<h1>Learn technology every day</h1>\n>>>>>>> sua-tieu-de\n<p>Welcome</p>\n</body>\n</html>"
    );
    expect(sh(r.s, "git status").text).toContain("both modified:   index.html");
    expect(sh(r.s, "git commit -m x").text).toContain("unmerged files");
    expect(sh(r.s, "git merge --abort", "cat index.html").text).toContain("Study every day");
    expect(sh(r.s, "git merge --abort", "git status").text).toContain("nothing to commit");
    r = sh(r.s, "git add index.html", "git status");
    expect(r.text).toContain("All conflicts fixed but you are still merging.");
    r = sh(r.s, "git commit -m 'Gop'", "git log --oneline");
    expect(r.text.split("\n")[0]).toMatch(/\(HEAD -> main\) Gop$/);
    expect(r.text).toContain("Retitle homepage");
    expect(sh(r.s, "git log").text).toContain("Merge: ");
  });

  it("git: remotes - push rejected, fetch, pull, pull --rebase, force", () => {
    const base = sh(fresh(), "cd /srv/blog").s;
    expect(sh(base, "git status").text).toContain("Your branch is ahead of 'origin/main' by 1 commit.");
    const rej = sh(base, "git push");
    expect(rej.code).toBe(1);
    expect(rej.text).toContain("! [rejected]        main -> main (fetch first)");
    let r = sh(base, "git fetch");
    expect(r.text).toContain("main       -> origin/main");
    expect(sh(r.s, "git status").text).toContain("have diverged");
    expect(sh(r.s, "git push").text).toContain("(non-fast-forward)");
    r = sh(r.s, "git pull");
    expect(r.text).toContain("Merge made by the 'ort' strategy.");
    r = sh(r.s, "git push", "git status");
    expect(r.text).toContain("up to date with 'origin/main'");
    // rebase: lịch sử thẳng
    let rb = sh(base, "git pull --rebase");
    expect(rb.text).toContain("Successfully rebased");
    rb = sh(rb.s, "git log --oneline");
    expect(rb.text.split("\n").map((l) => l.replace(/^\w+ (\(.*?\) )?/, ""))).toEqual(["Update table of contents", "Colleague adds post 2", "Write first post", "Start blog"]);
    // force: ghi đè
    const forced = sh(base, "git push --force");
    expect(forced.text).toContain("(forced update)");
    // remote mới
    const fresh2 = sh(fresh(), "cd du-an", "git init", "git add .", "git commit -m a", "git push");
    expect(fresh2.text).toContain("No configured push destination.");
    const added = sh(fresh2.s, "git remote add origin git@github.com:ban/x.git", "git remote -v", "git push -u origin main");
    expect(added.text).toContain("branch 'main' set up to track 'origin/main'.");
    expect(sh(added.s, "git remote -v").text).toContain("origin\tgit@github.com:ban/x.git (push)");
    expect(sh(added.s, "git push").text).toBe("Everything up-to-date");
  });
});
