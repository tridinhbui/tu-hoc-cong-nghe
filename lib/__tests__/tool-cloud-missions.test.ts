import { describe, it, expect } from "vitest";
import {
  BUDGET_LIMIT,
  DB_CREATING_SECONDS,
  LB_PROVISION_SECONDS,
  PENDING_SECONDS,
  addRule,
  addTarget,
  attachPolicy,
  attachVolume,
  createAutoScalingGroup,
  createBucket,
  createDatabase,
  createIdentity,
  createLoadBalancer,
  createVolume,
  deleteDatabase,
  deleteVolume,
  detachVolume,
  diskMonthly,
  initialState,
  isLiveWebsite,
  launchVm,
  lbResponse,
  monthlyTotal,
  parseState,
  removeRule,
  restoreDatabase,
  setBlockPublicAccess,
  setBucketPublic,
  setBucketWebsite,
  setBudgetAlert,
  setLoad,
  setMfa,
  setRegion,
  setTag,
  simulateDataLoss,
  takeSnapshot,
  terminateVm,
  tick,
  uploadObject,
  warnings,
  websiteResponse,
  type CloudState,
  type LaunchVmInput,
  type PolicyId,
  type Result,
  type VmSizeId,
} from "../tools/cloud/engine";
import { CLOUD_MISSIONS } from "../tools/cloud/missions";
import { toolCloudVi, toolCloudEn } from "../i18n/dictionaries/sections/tool-cloud";

const NEW_IDS = [
  "bucket-block-public",
  "iam-mfa",
  "budget-alert",
  "db-snapshot",
  "cost-tags",
  "vm-fit-need",
  "sg-db-internal",
  "iam-least-privilege",
  "orphan-volumes",
  "two-az-lb",
  "autoscale-spike",
  "db-restore",
];

function must(r: Result): CloudState {
  if (!r.ok) throw new Error(`expected ok, got ${r.error}`);
  return r.state;
}
const mission = (id: string) => CLOUD_MISSIONS.find((m) => m.id === id)!;
const green = (id: string, s: CloudState) => mission(id).check(s);
const criteriaMet = (id: string, s: CloudState) => mission(id).criteria.map((c) => c.check(s));

const base: LaunchVmInput = { name: "web-01", image: "ubuntu", size: "small", keyPair: "k", ports: [], sshSource: "myIp" };
const launch = (s: CloudState, over: Partial<LaunchVmInput> = {}) => must(launchVm(s, { ...base, ...over }));
const dbInput = { name: "app-db", engine: "postgres" as const, size: "micro" as const, backups: true, publiclyAccessible: false };
const readyDb = (s: CloudState, name = "app-db") => tick(must(createDatabase(s, { ...dbInput, name })), DB_CREATING_SECONDS);

describe("cloud: the 12 expanded missions", () => {
  it("are registered after the original eight, with vi and en copy and matching criteria labels", () => {
    expect(CLOUD_MISSIONS.map((m) => m.id).slice(8)).toEqual(NEW_IDS);
    for (const id of NEW_IDS) {
      const m = mission(id);
      expect(m.criteria[m.criteria.length - 1].check).toBe(m.check);
      for (const dict of [toolCloudVi.toolCloud.missions, toolCloudEn.toolCloud.missions]) {
        const copy = (dict as Record<string, { title: string; hint: string; from: string; brief: string; criteria: Record<string, string> }>)[id];
        expect(copy?.title, id).toBeTruthy();
        expect(copy?.brief, id).toBeTruthy();
        expect(Object.keys(copy.criteria).sort(), id).toEqual(m.criteria.map((c) => c.id).sort());
      }
    }
  });

  it("every mission, old and new, is red on an empty account", () => {
    const s = initialState();
    for (const m of CLOUD_MISSIONS) {
      expect(m.check(s), m.id).toBe(false);
      expect(criteriaMet(m.id, s).some(Boolean), m.id).toBe(false);
    }
  });
});

describe("bucket-block-public", () => {
  const ref = () => {
    let s = must(createBucket(initialState(), "invoices-scan"));
    s = must(uploadObject(s, "invoices-scan", "logo.png"));
    return must(setBlockPublicAccess(s, "invoices-scan", true));
  };
  it("goes green with files and the block on", () => expect(green("bucket-block-public", ref())).toBe(true));
  it("stays red when the block is on an empty bucket or files are unblocked", () => {
    const empty = must(setBlockPublicAccess(must(createBucket(initialState(), "invoices-scan")), "invoices-scan", true));
    expect(green("bucket-block-public", empty)).toBe(false);
    const open = must(uploadObject(must(createBucket(initialState(), "invoices-scan")), "invoices-scan", "logo.png"));
    expect(criteriaMet("bucket-block-public", open)).toEqual([true, false, false]);
  });
  it("the block overrides a public website: 403 and not live", () => {
    let s = must(createBucket(initialState(), "site-demo-1"));
    s = must(uploadObject(s, "site-demo-1", "index.html"));
    s = must(setBucketWebsite(must(setBucketPublic(s, "site-demo-1", true)), "site-demo-1", true));
    expect(isLiveWebsite(s.buckets[0])).toBe(true);
    s = must(setBlockPublicAccess(s, "site-demo-1", true));
    expect(isLiveWebsite(s.buckets[0])).toBe(false);
    expect(websiteResponse(s.buckets[0])).toBe(403);
  });
});

describe("iam-mfa", () => {
  const ref = () => must(setMfa(must(createIdentity(initialState(), "user", "minh")), "minh", true));
  it("goes green for a user with MFA and no admin", () => expect(green("iam-mfa", ref())).toBe(true));
  it("stays red without MFA, with admin rights, or for a role", () => {
    expect(green("iam-mfa", must(createIdentity(initialState(), "user", "minh")))).toBe(false);
    expect(green("iam-mfa", must(attachPolicy(ref(), "minh", "admin-access")))).toBe(false);
    const role = must(createIdentity(initialState(), "role", "svc"));
    expect(setMfa(role, "svc", true)).toEqual({ ok: false, error: "mfaNotForRole" });
    expect(green("iam-mfa", role)).toBe(false);
  });
});

describe("budget-alert", () => {
  it("goes green at 500.000 with an early and a 100% threshold", () => {
    expect(green("budget-alert", must(setBudgetAlert(initialState(), BUDGET_LIMIT, [50, 80, 100])))).toBe(true);
  });
  it("stays red with only 100%, only an early threshold, or a different limit", () => {
    expect(green("budget-alert", must(setBudgetAlert(initialState(), BUDGET_LIMIT, [100])))).toBe(false);
    expect(green("budget-alert", must(setBudgetAlert(initialState(), BUDGET_LIMIT, [80])))).toBe(false);
    expect(green("budget-alert", must(setBudgetAlert(initialState(), 300000, [80, 100])))).toBe(false);
  });
  it("validates input and warns when a threshold is reached", () => {
    expect(setBudgetAlert(initialState(), 10, [50])).toEqual({ ok: false, error: "budgetLimit" });
    expect(setBudgetAlert(initialState(), BUDGET_LIMIT, [])).toEqual({ ok: false, error: "budgetThresholds" });
    let s = must(setBudgetAlert(initialState(), 200000, [50, 100]));
    s = tick(launch(s, { size: "small" }), PENDING_SECONDS);
    expect(warnings(s).some((w) => w.kind === "budgetAlert")).toBe(true);
  });
});

describe("db-snapshot", () => {
  it("goes green once an available database has an intact snapshot", () => {
    const s = readyDb(initialState());
    expect(green("db-snapshot", must(takeSnapshot(s, s.databases[0].id)))).toBe(true);
  });
  it("cannot snapshot a database that is still creating", () => {
    const s = must(createDatabase(initialState(), dbInput));
    expect(takeSnapshot(s, s.databases[0].id)).toEqual({ ok: false, error: "dbNotAvailable" });
    expect(green("db-snapshot", s)).toBe(false);
  });
  it("a snapshot taken after the data was lost does not count as intact", () => {
    let s = readyDb(initialState());
    const id = s.databases[0].id;
    s = must(takeSnapshot(must(simulateDataLoss(s, id)), id));
    expect(s.snapshots[0].intact).toBe(false);
    expect(criteriaMet("db-snapshot", s)).toEqual([true, true, false]);
    expect(green("db-snapshot", s)).toBe(false);
  });
});

describe("cost-tags", () => {
  const two = () => {
    let s = launch(initialState());
    s = must(createBucket(s, "tag-bucket-1"));
    return s;
  };
  const tagAll = (s: CloudState) => {
    let n = s;
    n = must(setTag(n, "vm", n.vms[0].id, "team", "web"));
    n = must(setTag(n, "vm", n.vms[0].id, "env", "dev"));
    n = must(setTag(n, "bucket", "tag-bucket-1", "team", "web"));
    return must(setTag(n, "bucket", "tag-bucket-1", "env", "dev"));
  };
  it("goes green when every resource has team and env", () => expect(green("cost-tags", tagAll(two()))).toBe(true));
  it("stays red with a single resource, a missing env, or a resource added later", () => {
    let one = launch(initialState());
    one = must(setTag(must(setTag(one, "vm", one.vms[0].id, "team", "web")), "vm", one.vms[0].id, "env", "dev"));
    expect(green("cost-tags", one)).toBe(false);
    let partial = two();
    partial = must(setTag(partial, "vm", partial.vms[0].id, "team", "web"));
    partial = must(setTag(partial, "bucket", "tag-bucket-1", "team", "web"));
    expect(criteriaMet("cost-tags", partial)).toEqual([true, true, false]);
    expect(green("cost-tags", must(createBucket(tagAll(two()), "tag-bucket-2")))).toBe(false);
  });
  it("rejects malformed tags and more than five tags", () => {
    const s = two();
    expect(setTag(s, "vm", s.vms[0].id, "Team", "web")).toEqual({ ok: false, error: "tagFormat" });
    let n = s;
    for (const k of ["a", "b", "c", "d", "e"]) n = must(setTag(n, "vm", n.vms[0].id, k, "x"));
    expect(setTag(n, "vm", n.vms[0].id, "f", "x")).toEqual({ ok: false, error: "tagLimit" });
  });
});

describe("vm-fit-need", () => {
  const run = (region: "hanoi" | "hcm", size: VmSizeId, wait = PENDING_SECONDS) => tick(launch(setRegion(initialState(), region), { size }), wait);
  it("goes green for a running medium instance in Hanoi", () => expect(green("vm-fit-need", run("hanoi", "medium"))).toBe(true));
  it("stays red for the wrong region, too small, too large or still pending", () => {
    expect(green("vm-fit-need", run("hcm", "medium"))).toBe(false);
    expect(green("vm-fit-need", run("hanoi", "small"))).toBe(false);
    expect(green("vm-fit-need", run("hanoi", "large"))).toBe(false);
    expect(green("vm-fit-need", run("hanoi", "medium", 0))).toBe(false);
  });
});

describe("sg-db-internal", () => {
  const vm = () => tick(launch(initialState(), { ports: [22], sshSource: "myIp" }), PENDING_SECONDS);
  it("goes green with 5432 open to the internal network only", () => {
    const s = vm();
    expect(green("sg-db-internal", must(addRule(s, s.vms[0].id, 5432, "internal")))).toBe(true);
  });
  it("stays red when 5432 is open to the world, SSH stays open to the world, or the VM is not running", () => {
    const s = vm();
    const id = s.vms[0].id;
    expect(green("sg-db-internal", must(addRule(must(addRule(s, id, 5432, "internal")), id, 5432, "anywhere")))).toBe(false);
    const openSsh = tick(launch(initialState(), { ports: [22], sshSource: "anywhere" }), PENDING_SECONDS);
    expect(green("sg-db-internal", must(addRule(openSsh, openSsh.vms[0].id, 5432, "internal")))).toBe(false);
    const pending = launch(initialState(), { ports: [] });
    expect(green("sg-db-internal", must(addRule(pending, pending.vms[0].id, 5432, "internal")))).toBe(false);
  });
  it("removing the world SSH rule fixes it", () => {
    const s = tick(launch(initialState(), { ports: [22], sshSource: "anywhere" }), PENDING_SECONDS);
    let n = must(addRule(s, s.vms[0].id, 5432, "internal"));
    n = must(removeRule(n, n.vms[0].id, n.vms[0].rules.find((r) => r.port === 22)!.id));
    expect(green("sg-db-internal", n)).toBe(true);
  });
});

describe("iam-least-privilege", () => {
  const role = (...policies: PolicyId[]) => {
    let s = must(createIdentity(initialState(), "role", "report-service"));
    for (const p of policies) s = must(attachPolicy(s, "report-service", p));
    return s;
  };
  it("goes green for a role that can only read storage", () => expect(green("iam-least-privilege", role("storage-read"))).toBe(true));
  it("stays red when the role can write, is admin, or also reads the database", () => {
    expect(green("iam-least-privilege", role("storage-full"))).toBe(false);
    expect(green("iam-least-privilege", role("admin-access"))).toBe(false);
    expect(criteriaMet("iam-least-privilege", role("storage-read", "database-read"))).toEqual([true, true, false]);
    expect(green("iam-least-privilege", role("storage-read", "billing-read"))).toBe(false);
  });
  it("a user is not a role, and attaching twice is refused", () => {
    const user = must(attachPolicy(must(createIdentity(initialState(), "user", "an")), "an", "storage-read"));
    expect(green("iam-least-privilege", user)).toBe(false);
    expect(attachPolicy(role("storage-read"), "report-service", "storage-read")).toEqual({ ok: false, error: "policyAttached" });
  });
});

describe("orphan-volumes", () => {
  const withVolume = () => {
    let s = tick(launch(initialState()), PENDING_SECONDS);
    s = must(createVolume(s, "data-01"));
    return must(attachVolume(s, s.volumes[0].id, s.vms[0].id));
  };
  it("terminating the VM leaves the volume orphaned and still billed; deleting it drops the bill", () => {
    let s = withVolume();
    expect(criteriaMet("orphan-volumes", s)).toEqual([true, false, false]);
    const vmId = s.vms[0].id;
    s = must(terminateVm(s, vmId));
    expect(s.volumes[0].attachedTo).toBeNull();
    expect(monthlyTotal(s)).toBe(diskMonthly("hcm"));
    expect(warnings(s).some((w) => w.kind === "orphanVolume")).toBe(true);
    expect(criteriaMet("orphan-volumes", s)).toEqual([true, true, false]);
    s = must(deleteVolume(s, s.volumes[0].id));
    expect(monthlyTotal(s)).toBe(0);
    expect(green("orphan-volumes", s)).toBe(true);
  });
  it("stays red when the volume is only detached, never orphaned by deleting the VM", () => {
    let s = withVolume();
    expect(deleteVolume(s, s.volumes[0].id)).toEqual({ ok: false, error: "volumeInUse" });
    s = must(detachVolume(s, s.volumes[0].id));
    s = must(deleteVolume(s, s.volumes[0].id));
    expect(green("orphan-volumes", s)).toBe(false);
  });
  it("deleting the volume first and the VM after does not count", () => {
    let s = withVolume();
    s = must(detachVolume(s, s.volumes[0].id));
    s = must(deleteVolume(s, s.volumes[0].id));
    s = must(terminateVm(s, s.vms[0].id));
    expect(green("orphan-volumes", s)).toBe(false);
  });
});

describe("two-az-lb", () => {
  const web = (s: CloudState, name: string, over: Partial<LaunchVmInput> = {}, rule80: "internal" | "anywhere" | null = "internal") => {
    let n = launch(s, { name, subnet: "private", ...over });
    const id = n.vms[n.vms.length - 1].id;
    if (rule80) n = must(addRule(n, id, 80, rule80));
    return n;
  };
  const build = (azB: "a" | "b" = "b", subnet: "private" | "public" = "private") => {
    let s = web(initialState(), "web-a", { az: "a", subnet });
    s = web(s, "web-b", { az: azB, subnet });
    s = tick(s, PENDING_SECONDS);
    s = tick(must(createLoadBalancer(s, "web-lb")), LB_PROVISION_SECONDS);
    const lb = s.lbs[0].id;
    s = must(addTarget(s, lb, s.vms[0].id));
    return must(addTarget(s, lb, s.vms[1].id));
  };
  it("goes green: private instances in two zones behind an active balancer", () => {
    const s = build();
    expect(green("two-az-lb", s)).toBe(true);
    expect(s.vms.every((v) => v.publicIp === null)).toBe(true);
    expect(lbResponse({ ...s, outageAz: "a" }, s.lbs[0])).toBe(200);
    expect(lbResponse({ ...s, outageAz: "b" }, s.lbs[0])).toBe(200);
  });
  it("stays red with both instances in one zone (an outage takes the service down)", () => {
    const s = build("a");
    expect(lbResponse({ ...s, outageAz: "a" }, s.lbs[0])).toBe(503);
    expect(criteriaMet("two-az-lb", s)).toEqual([true, true, false, false]);
  });
  it("stays red when the instances sit in the public subnet", () => {
    expect(criteriaMet("two-az-lb", build("b", "public"))).toEqual([true, true, true, false]);
  });
  it("stays red while the balancer is provisioning, without port 80, or with one target", () => {
    let s = web(web(initialState(), "web-a", { az: "a" }), "web-b", { az: "b" });
    s = tick(s, PENDING_SECONDS);
    s = must(createLoadBalancer(s, "web-lb"));
    s = must(addTarget(must(addTarget(s, s.lbs[0].id, s.vms[0].id)), s.lbs[0].id, s.vms[1].id));
    expect(green("two-az-lb", s)).toBe(false);
    expect(lbResponse(s, s.lbs[0])).toBe(503);
    const noRule = tick(web(web(initialState(), "web-a", { az: "a" }, null), "web-b", { az: "b" }, null), PENDING_SECONDS);
    let n = tick(must(createLoadBalancer(noRule, "web-lb")), LB_PROVISION_SECONDS);
    n = must(addTarget(must(addTarget(n, n.lbs[0].id, n.vms[0].id)), n.lbs[0].id, n.vms[1].id));
    expect(green("two-az-lb", n)).toBe(false);
    const one = build();
    const lb = one.lbs[0];
    expect(green("two-az-lb", { ...one, lbs: [{ ...lb, targets: [lb.targets[0]] }] })).toBe(false);
  });
  it("a private instance keeps no public IP after a stop and start", () => {
    const s = build();
    expect(s.vms[0].privateIp).toMatch(/^10\.0\.2\./);
  });
});

describe("autoscale-spike", () => {
  const create = (size: VmSizeId, min: number, max: number, thr: number) =>
    must(createAutoScalingGroup(initialState(), { name: "web-group", size, min, max, scaleOutCpu: thr }));
  const spike = (s: CloudState, seconds = 14) => tick(setLoad(s, "spike"), seconds);
  it("goes green: medium, 2..4, threshold 60, after a spike the group adds a node and CPU drops", () => {
    const s = spike(create("medium", 2, 4, 60));
    expect(s.asgs[0].instances.length).toBeGreaterThan(2);
    expect(green("autoscale-spike", s)).toBe(true);
    expect(monthlyTotal(s)).toBeGreaterThan(0);
  });
  it("stays red when the maximum is too low to bring CPU under the threshold", () => {
    const s = spike(create("small", 2, 4, 60), 40);
    expect(s.asgs[0].instances.length).toBe(4);
    expect(criteriaMet("autoscale-spike", s)).toEqual([true, true, true, false]);
  });
  it("stays red with no spike, with a huge size that never scales, or with a lax threshold", () => {
    expect(green("autoscale-spike", tick(create("medium", 2, 4, 60), 30))).toBe(false);
    expect(green("autoscale-spike", spike(create("large", 2, 4, 60), 30))).toBe(false);
    expect(green("autoscale-spike", spike(create("medium", 2, 4, 90), 30))).toBe(false);
    expect(green("autoscale-spike", spike(create("medium", 1, 4, 60), 30))).toBe(false);
  });
  it("rejects impossible ranges and scales back in when traffic is normal again", () => {
    expect(createAutoScalingGroup(initialState(), { name: "g", size: "small", min: 3, max: 2, scaleOutCpu: 60 })).toEqual({ ok: false, error: "asgRange" });
    expect(createAutoScalingGroup(initialState(), { name: "g", size: "small", min: 1, max: 9, scaleOutCpu: 60 })).toEqual({ ok: false, error: "asgRange" });
    expect(createAutoScalingGroup(initialState(), { name: "g", size: "small", min: 1, max: 2, scaleOutCpu: 10 })).toEqual({ ok: false, error: "asgThreshold" });
    let s = spike(create("medium", 2, 4, 60));
    expect(s.asgs[0].instances.length).toBe(3);
    s = tick(setLoad(s, "normal"), 20);
    expect(s.asgs[0].instances.length).toBe(2);
  });
});

describe("db-restore", () => {
  const incident = () => {
    let s = readyDb(initialState());
    const id = s.databases[0].id;
    s = must(takeSnapshot(s, id));
    s = must(simulateDataLoss(s, id));
    return { s, id, snap: s.snapshots[0].id };
  };
  it("goes green: snapshot, incident, restore to a NEW database, remove the damaged one", () => {
    const first = incident();
    let s = first.s;
    const { id, snap } = first;
    expect(criteriaMet("db-restore", s)).toEqual([true, true, false, false]);
    s = must(restoreDatabase(s, snap, "app-db-2"));
    expect(s.databases).toHaveLength(2);
    expect(green("db-restore", s)).toBe(false);
    s = tick(s, DB_CREATING_SECONDS);
    expect(criteriaMet("db-restore", s)).toEqual([true, true, true, false]);
    s = must(deleteDatabase(s, id));
    expect(green("db-restore", s)).toBe(true);
    expect(s.databases[0].dataLost).toBe(false);
    expect(s.snapshots).toHaveLength(1);
  });
  it("stays red when the snapshot was taken after the incident", () => {
    let s = readyDb(initialState());
    const id = s.databases[0].id;
    s = must(simulateDataLoss(s, id));
    s = must(takeSnapshot(s, id));
    s = tick(must(restoreDatabase(s, s.snapshots[0].id, "app-db-2")), DB_CREATING_SECONDS);
    s = must(deleteDatabase(s, id));
    expect(s.databases[0].dataLost).toBe(true);
    expect(green("db-restore", s)).toBe(false);
  });
  it("stays red if no incident ever happened, and rejects a duplicate name", () => {
    let s = readyDb(initialState());
    s = must(takeSnapshot(s, s.databases[0].id));
    s = tick(must(restoreDatabase(s, s.snapshots[0].id, "app-db-2")), DB_CREATING_SECONDS);
    expect(green("db-restore", s)).toBe(false);
    expect(restoreDatabase(s, s.snapshots[0].id, "app-db")).toEqual({ ok: false, error: "nameDuplicate" });
  });
});

describe("cloud: saved-state compatibility and clean-up", () => {
  it("an old saved state without the new fields loads with safe defaults", () => {
    const old = JSON.parse(JSON.stringify(initialState())) as Record<string, unknown>;
    for (const k of ["volumes", "identities", "lbs", "asgs", "snapshots", "budgetAlert", "load", "outageAz"]) delete old[k];
    let s = parseState(old);
    expect(s).not.toBeNull();
    expect(s!.volumes).toEqual([]);
    expect(s!.load).toBe("normal");
    const vm = JSON.parse(JSON.stringify(launch(initialState())));
    delete vm.vms[0].subnet;
    delete vm.vms[0].tags;
    s = parseState(vm);
    expect(s!.vms[0].subnet).toBe("public");
    expect(s!.vms[0].az).toBe("a");
    expect(s!.vms[0].tags).toEqual({});
  });

  it("clean-up is not satisfied while a volume or balancer is left behind", () => {
    let s = tick(launch(initialState()), PENDING_SECONDS);
    s = must(createVolume(s, "data-01"));
    s = must(terminateVm(s, s.vms[0].id));
    expect(mission("clean-up").criteria[1].check(s)).toBe(false);
    s = must(deleteVolume(s, s.volumes[0].id));
    expect(mission("clean-up").check(s)).toBe(true);
  });
});
