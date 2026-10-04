import { describe, it, expect } from "vitest";
import {
  BUDGET_LIMIT,
  DB_CREATING_SECONDS,
  PENDING_SECONDS,
  STOPPING_SECONDS,
  TERMINATED_VISIBLE_SECONDS,
  addRule,
  costByService,
  cpuSeries,
  createBucket,
  createDatabase,
  dbEndpoint,
  deleteBucket,
  deleteDatabase,
  deleteObject,
  diskMonthly,
  initialState,
  launchVm,
  monthlyTotal,
  parseState,
  removeRule,
  setBucketPublic,
  setBucketWebsite,
  setRegion,
  startVm,
  stopVm,
  terminateVm,
  tick,
  uploadObject,
  validateBucketName,
  vmMonthly,
  warnings,
  websiteResponse,
  type CloudState,
  type LaunchVmInput,
  type Result,
} from "../tools/cloud/engine";
import { CLOUD_MISSIONS, mergeCompleted } from "../tools/cloud/missions";
import { toolCloudVi, toolCloudEn } from "../i18n/dictionaries/sections/tool-cloud";

function must(r: Result): CloudState {
  if (!r.ok) throw new Error(`expected ok, got ${r.error}`);
  return r.state;
}

const smallUbuntu: LaunchVmInput = {
  name: "web-01",
  image: "ubuntu",
  size: "small",
  keyPair: "my-key",
  ports: [22],
  sshSource: "anywhere",
};

const passed = (s: CloudState) => CLOUD_MISSIONS.filter((m) => m.check(s)).map((m) => m.id);

describe("cloud engine: compute", () => {
  it("launches pending, becomes running after the wait, and registers the key pair", () => {
    let s = must(launchVm(initialState(), smallUbuntu));
    expect(s.vms[0].state).toBe("pending");
    expect(s.keyPairs).toEqual(["my-key"]);
    s = tick(s, PENDING_SECONDS - 1);
    expect(s.vms[0].state).toBe("pending");
    s = tick(s, 1);
    expect(s.vms[0].state).toBe("running");
    expect(s.vms[0].publicIp).toMatch(/^203\.0\.113\.\d+$/);
  });

  it("validates names", () => {
    expect(launchVm(initialState(), { ...smallUbuntu, name: "" })).toEqual({ ok: false, error: "nameRequired" });
    expect(launchVm(initialState(), { ...smallUbuntu, name: "Web 01" })).toEqual({ ok: false, error: "nameFormat" });
    const s = must(launchVm(initialState(), smallUbuntu));
    expect(launchVm(s, smallUbuntu)).toEqual({ ok: false, error: "nameDuplicate" });
  });

  it("stopping drops compute cost but keeps disk cost; restart changes the IP", () => {
    let s = tick(must(launchVm(initialState(), smallUbuntu)), PENDING_SECONDS);
    const ip = s.vms[0].publicIp;
    expect(monthlyTotal(s)).toBe(vmMonthly("small", "hcm") + diskMonthly("hcm"));
    s = must(stopVm(s, s.vms[0].id));
    expect(monthlyTotal(s)).toBe(diskMonthly("hcm"));
    s = tick(s, STOPPING_SECONDS);
    expect(s.vms[0].state).toBe("stopped");
    expect(s.vms[0].publicIp).toBeNull();
    expect(stopVm(s, s.vms[0].id)).toEqual({ ok: false, error: "vmNotRunning" });
    s = tick(must(startVm(s, s.vms[0].id)), PENDING_SECONDS);
    expect(s.vms[0].state).toBe("running");
    expect(s.vms[0].publicIp).not.toBe(ip);
  });

  it("terminate costs nothing and the row disappears after a while", () => {
    let s = tick(must(launchVm(initialState(), smallUbuntu)), PENDING_SECONDS);
    s = must(terminateVm(s, s.vms[0].id));
    expect(monthlyTotal(s)).toBe(0);
    expect(startVm(s, s.vms[0].id)).toEqual({ ok: false, error: "vmTerminated" });
    s = tick(s, TERMINATED_VISIBLE_SECONDS + 1);
    expect(s.vms).toHaveLength(0);
  });

  it("region changes price", () => {
    const hanoi = setRegion(initialState(), "hanoi");
    const sg = setRegion(initialState(), "singapore");
    expect(monthlyTotal(must(launchVm(hanoi, smallUbuntu)))).toBeGreaterThan(monthlyTotal(must(launchVm(sg, smallUbuntu))));
  });

  it("firewall rules: add, reject duplicates, remove, warn on open SSH", () => {
    let s = must(launchVm(initialState(), smallUbuntu));
    const id = s.vms[0].id;
    expect(warnings(s).some((w) => w.kind === "sshOpenWorld")).toBe(true);
    s = must(addRule(s, id, 80, "anywhere"));
    expect(addRule(s, id, 80, "anywhere")).toEqual({ ok: false, error: "ruleExists" });
    const ssh = s.vms[0].rules.find((r) => r.port === 22)!;
    s = must(removeRule(s, id, ssh.id));
    expect(warnings(s).some((w) => w.kind === "sshOpenWorld")).toBe(false);
  });

  it("cpu series is deterministic, bounded and blank before boot", () => {
    const s = tick(must(launchVm(initialState(), smallUbuntu)), PENDING_SECONDS + 10);
    const a = cpuSeries(s.vms[0], s.clock, 30);
    expect(a).toEqual(cpuSeries(s.vms[0], s.clock, 30));
    expect(a[0]).toBeNull();
    const known = a.filter((v): v is number => v !== null);
    expect(known.length).toBe(11);
    expect(known.every((v) => v >= 1 && v <= 100)).toBe(true);
  });
});

describe("cloud engine: storage", () => {
  it("validates bucket names, including global uniqueness", () => {
    const s = initialState();
    expect(validateBucketName("ab", s)).toBe("bucketLength");
    expect(validateBucketName("My Site", s)).toBe("bucketChars");
    expect(validateBucketName("-site-", s)).toBe("bucketEdge");
    expect(validateBucketName("my-website", s)).toBe("bucketTaken");
    expect(validateBucketName("lan-portfolio-2026", s)).toBeNull();
    const s2 = must(createBucket(s, "lan-portfolio-2026"));
    expect(createBucket(s2, "lan-portfolio-2026")).toEqual({ ok: false, error: "bucketTaken" });
  });

  it("website responds 403 → 404 → 200 as it is configured, and bucket must be empty to delete", () => {
    let s = must(createBucket(initialState(), "lan-site"));
    s = must(setBucketWebsite(s, "lan-site", true));
    expect(websiteResponse(s.buckets[0])).toBe(403);
    s = must(setBucketPublic(s, "lan-site", true));
    expect(websiteResponse(s.buckets[0])).toBe(404);
    s = must(uploadObject(s, "lan-site", "index.html"));
    expect(websiteResponse(s.buckets[0])).toBe(200);
    expect(costByService(s).network).toBeGreaterThan(0);
    expect(deleteBucket(s, "lan-site")).toEqual({ ok: false, error: "bucketNotEmpty" });
    s = must(deleteObject(s, "lan-site", "index.html"));
    s = must(deleteBucket(s, "lan-site"));
    expect(s.buckets).toHaveLength(0);
  });
});

describe("cloud engine: database", () => {
  it("creates, becomes available, exposes an endpoint and warns when public", () => {
    let s = must(
      createDatabase(initialState(), { name: "app-db", engine: "postgres", size: "micro", backups: false, publiclyAccessible: true })
    );
    expect(s.databases[0].status).toBe("creating");
    s = tick(s, DB_CREATING_SECONDS);
    expect(s.databases[0].status).toBe("available");
    expect(dbEndpoint(s.databases[0])).toMatch(/:5432$/);
    const kinds = warnings(s).map((w) => w.kind);
    expect(kinds).toContain("dbPublic");
    expect(kinds).toContain("dbNoBackups");
  });
});

describe("cloud missions", () => {
  it("every mission has vi and en copy", () => {
    for (const m of CLOUD_MISSIONS) {
      const vi = toolCloudVi.toolCloud.missions[m.id as keyof typeof toolCloudVi.toolCloud.missions];
      const en = toolCloudEn.toolCloud.missions[m.id as keyof typeof toolCloudEn.toolCloud.missions];
      expect(vi?.title, m.id).toBeTruthy();
      expect(vi?.hint, m.id).toBeTruthy();
      expect(en?.title, m.id).toBeTruthy();
      expect(en?.hint, m.id).toBeTruthy();
    }
    expect(CLOUD_MISSIONS.length).toBeGreaterThanOrEqual(6);
    // 8 nhiệm vụ gốc + 12 nhiệm vụ mở rộng (chi tiết ở tool-cloud-missions.test.ts).
    expect(CLOUD_MISSIONS.length).toBeLessThanOrEqual(20);
  });

  it("every error code has vi and en copy", () => {
    expect(Object.keys(toolCloudEn.toolCloud.errors).sort()).toEqual(Object.keys(toolCloudVi.toolCloud.errors).sort());
  });

  it("nothing is done on an empty account", () => {
    expect(passed(initialState())).toEqual([]);
  });

  it("a scripted session completes every mission in order", () => {
    let done: string[] = [];
    let s = initialState();
    const step = (next: CloudState) => {
      s = next;
      done = mergeCompleted(done, s);
    };

    step(tick(must(launchVm(s, smallUbuntu)), PENDING_SECONDS));
    expect(done).toContain("launch-vm");
    const web = s.vms[0].id;

    step(must(addRule(s, web, 80, "anywhere")));
    expect(done).toContain("open-http");

    step(must(addRule(s, web, 22, "myIp")));
    expect(done).not.toContain("ssh-my-ip");
    step(must(removeRule(s, web, s.vms[0].rules.find((r) => r.port === 22 && r.source === "anywhere")!.id)));
    expect(done).toContain("ssh-my-ip");

    step(must(createBucket(s, "lan-portfolio-2026")));
    step(must(uploadObject(s, "lan-portfolio-2026", "index.html")));
    step(must(setBucketWebsite(s, "lan-portfolio-2026", true)));
    expect(done).not.toContain("static-website");
    step(must(setBucketPublic(s, "lan-portfolio-2026", true)));
    expect(done).toContain("static-website");

    step(must(createDatabase(s, { name: "app-db", engine: "postgres", size: "micro", backups: true, publiclyAccessible: false })));
    expect(done).not.toContain("safe-database");
    step(tick(s, DB_CREATING_SECONDS));
    expect(done).toContain("safe-database");

    step(tick(must(launchVm(s, { ...smallUbuntu, name: "test-01", size: "nano" })), PENDING_SECONDS));
    expect(monthlyTotal(s)).toBeGreaterThan(BUDGET_LIMIT);
    expect(done).not.toContain("budget");
    step(tick(must(stopVm(s, s.vms[1].id)), STOPPING_SECONDS));
    expect(done).toContain("stop-vm");

    step(must(deleteDatabase(s, s.databases[0].id)));
    step(must(terminateVm(s, s.vms[1].id)));
    expect(monthlyTotal(s)).toBeLessThan(BUDGET_LIMIT);
    expect(done).toContain("budget");

    step(must(terminateVm(s, web)));
    step(must(deleteObject(s, "lan-portfolio-2026", "index.html")));
    step(must(deleteBucket(s, "lan-portfolio-2026")));
    expect(monthlyTotal(s)).toBe(0);
    // Chuỗi này chỉ làm tám nhiệm vụ gốc; 12 nhiệm vụ mở rộng có kịch bản riêng.
    expect(done).toEqual(CLOUD_MISSIONS.slice(0, 8).map((m) => m.id));
  });

  it("round-trips through JSON for localStorage", () => {
    const s = tick(must(launchVm(initialState(), smallUbuntu)), 3);
    expect(parseState(JSON.parse(JSON.stringify(s)))).toEqual(s);
    expect(parseState({ clock: 1 })).toBeNull();
  });
});
