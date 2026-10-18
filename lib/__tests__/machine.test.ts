import { describe, expect, it } from "vitest";
import { MAX_STEPS, formatMachineError, parseProgram, runCpu, simulateDns, simulateHttp, simulateScheduler } from "../lesson-blocks/machine.js";
import { validateInteractiveBlock } from "../lesson-blocks/validate.js";
import { T06_ADDITIONS } from "../lesson-block-additions/t06";

describe("CPU đồ chơi", () => {
  it("chạy vòng lặp nhân bằng cộng", () => {
    const { final } = runCpu(["LOAD R0, 0", "LOAD R1, 4", "LOAD R2, 3", "LOAD R3, 1", "v:", "ADD R0, R2", "SUB R1, R3", "JNZ R1, v", "STM 0, R0", "HALT"], []);
    expect(final.halted).toBe(true);
    expect(final.mem[0]).toBe(12);
  });
  it("vòng lặp vô hạn dừng bằng lỗi, không treo", () => {
    const { final, trace } = runCpu(["v:", "JMP v"], []);
    expect(final.error?.code).toBe("tooManySteps");
    expect(trace.length).toBeLessThanOrEqual(MAX_STEPS + 2);
  });
  it("từ chối lệnh lạ, thanh ghi sai, địa chỉ ngoài bộ nhớ, nhãn thiếu", () => {
    const codes = (l: string[]) => parseProgram(l).errors.map((e: { code: string }) => e.code);
    expect(codes(["MUL R0, R1"])).toEqual(["badOp"]);
    expect(codes(["LOAD R9, 1"])).toEqual(["badReg"]);
    expect(codes(["STM 8, R0"])).toEqual(["badAddr"]);
    expect(codes(["JMP nowhere"])).toEqual(["noLabel"]);
    expect(codes(Array(41).fill("HALT"))).toContain("tooLong");
  });
  it("không có đường nào tới eval: văn bản lạ chỉ thành lỗi phân tích", () => {
    const { errors } = parseProgram(["process.exit(1)", "constructor.constructor('x')()"]);
    expect(errors.length).toBe(2);
  });
  it("thông báo lỗi có mẫu tiếng Việt mặc định", () => {
    expect(formatMachineError({ code: "badInt", line: 2, tok: "x" })).toContain("Dòng 2");
  });
});

describe("bộ lập lịch round-robin", () => {
  const procs = [
    { name: "A", arrival: 0, burst: 4 },
    { name: "B", arrival: 0, burst: 2 },
  ];
  it("quantum đủ lớn thì thành FCFS", () => {
    const r = simulateScheduler(procs, 10, 0);
    expect(r.per.map((p: { finish: number }) => p.finish)).toEqual([4, 6]);
    expect(r.switches).toBe(0);
  });
  it("tính thời gian chuyển ngữ cảnh vào tổng", () => {
    const r = simulateScheduler(procs, 2, 1);
    // A(0-2) chuyển(2-3) B(3-5) chuyển(5-6) A(6-8)
    expect(r.total).toBe(8);
    expect(r.switches).toBe(2);
  });
  it("CPU rảnh khi chưa có ai đến", () => {
    const r = simulateScheduler([{ name: "A", arrival: 3, burst: 2 }], 2, 0);
    expect(r.segments[0].kind).toBe("idle");
    expect(r.total).toBe(5);
  });
});

describe("khối machine trong t06", () => {
  it("mọi khối qua kiểm hợp lệ: lời giải đạt, mã khởi đầu không đạt sẵn", () => {
    for (const [slug, blocks] of Object.entries(T06_ADDITIONS)) {
      for (const b of blocks.filter((x) => x.type === "machine")) {
        expect(validateInteractiveBlock(b), slug).toEqual([]);
      }
    }
  });
});

describe("máy chủ HTTP giả", () => {
  const server = {
    routes: [
      { method: "GET", path: "/notes" },
      { method: "POST", path: "/notes", auth: true, fields: ["title"] },
    ],
  };
  const post = { method: "POST", path: "/notes", auth: "good", body: '{"title":"a"}' };
  it("trả mã theo đúng thứ tự tầng: đường dẫn, phương thức, danh tính, nội dung", () => {
    expect(simulateHttp(server, { ...post, path: "/note" }).status).toBe(404);
    expect(simulateHttp(server, { ...post, method: "PUT" })).toMatchObject({ status: 405, allow: "GET, POST" });
    expect(simulateHttp(server, { ...post, auth: "none" }).status).toBe(401);
    expect(simulateHttp(server, { ...post, auth: "bad" }).status).toBe(403);
    expect(simulateHttp(server, { ...post, body: "{" }).status).toBe(400);
    expect(simulateHttp(server, { ...post, body: "[1]" }).status).toBe(400);
    expect(simulateHttp(server, { ...post, body: "{}" })).toMatchObject({ status: 422, field: "title" });
    expect(simulateHttp(server, { ...post, body: '{"title":"  "}' }).status).toBe(422);
    expect(simulateHttp(server, post).status).toBe(201);
    expect(simulateHttp(server, { method: "GET", path: "/notes", auth: "none", body: "" }).status).toBe(200);
  });
});

describe("DNS và TTL", () => {
  const cfg = { oldIp: "a", newIp: "b", changeAt: 100, lookups: [0, 50, 100, 150, 200] };
  it("TTL dài giữ địa chỉ cũ sau khi đổi, TTL ngắn hỏi nhiều lần", () => {
    const long = simulateDns(cfg, 1000);
    expect(long.authQueries).toBe(1);
    expect(long.staleCount).toBe(3);
    const short = simulateDns(cfg, 1);
    expect(short.authQueries).toBe(5);
    expect(short.staleCount).toBe(0);
  });
});
