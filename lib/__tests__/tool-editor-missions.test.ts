import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import {
  appendConsole,
  createInitialState,
  editFile,
  getFile,
  renamePath,
  saveAll,
  startRun,
  type EditorState,
} from "../tools/editor/engine";
import { applyShimMessage, buildSrcDoc, isShimMessage, missingFileMessage } from "../tools/editor/srcdoc";
import { EDITOR_MISSIONS } from "../tools/editor/missions";
import { toolEditorEn, toolEditorVi } from "../i18n/dictionaries/sections/tool-editor";

/**
 * Các nhiệm vụ mới của trình soạn mã chấm KẾT QUẢ CHẠY THẬT: bản chụp lúc bấm
 * Chạy, console, và DOM mà trang tự báo về. Nên bộ kiểm này chạy đúng tài liệu
 * mà khung xem trước sẽ nhận (buildSrcDoc) trong jsdom, bấm nút bằng sự kiện
 * click thật, rồi đưa tin nhắn của trang qua đúng hàm mà giao diện dùng
 * (applyShimMessage). Không có chuỗi "trạng thái giả" nào ở đây.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { JSDOM } = createRequire(import.meta.url)("jsdom") as { JSDOM: any };

const NEW_IDS = [
  "flex-center",
  "viewport-media",
  "semantic-tags",
  "img-alt-lazy",
  "labeled-form",
  "css-grid-cards",
  "dom-add-item",
  "event-delegation",
  "form-validate",
  "defer-script",
  "move-files",
  "local-storage",
  "fetch-error",
];

const fresh = () => createInitialState(toolEditorEn.toolEditor.starter);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const passes = (s: EditorState, id: string) => EDITOR_MISSIONS.find((m) => m.id === id)!.check(s);
const criteriaOf = (s: EditorState, id: string) =>
  Object.fromEntries(EDITOR_MISSIONS.find((m) => m.id === id)!.criteria.map((c) => [c.id, c.check(s)]));

function write(s: EditorState, files: Record<string, string>): EditorState {
  let next = s;
  for (const [path, content] of Object.entries(files)) {
    if (!getFile(next, path)) next = { ...next, files: [...next.files, { path, content: "", saved: "" }] };
    next = editFile(next, path, content);
  }
  return next;
}

function page(body: string, head = "", scriptTag = '<script src="script.js"></script>'): string {
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>Shop</title>\n<link rel="stylesheet" href="style.css">\n${head}\n</head>\n<body>\n${body}\n${scriptTag}\n</body>\n</html>\n`;
}

const STYLE = getFile(fresh(), "style.css")!.content;
const OK_SCRIPT = 'console.log("Page loaded");\n';

interface RunOptions {
  entry?: string;
  /** Chạy trong cửa sổ trang, sau khi trang dựng xong. */
  interact?: (win: any) => void | Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
  settle?: number;
}

/** Bấm Chạy: dựng tài liệu như khung xem trước, chạy nó trong jsdom, gom tin
 *  nhắn của trang vào state. */
async function runPage(state: EditorState, opts: RunOptions = {}): Promise<EditorState> {
  const entry = opts.entry ?? "index.html";
  let next = startRun(state, entry);
  const runId = next.lastRun!.id;
  const token = `t-${runId}`;
  const built = buildSrcDoc(next.files, entry, token, next.storage ?? {});
  for (const miss of built.missing) {
    next = appendConsole(next, runId, { level: "error", source: "runtime", text: missingFileMessage(miss) });
  }
  const dom = new JSDOM(built.html, { runScripts: "dangerously", pretendToBeVisual: true });
  const win = dom.window;
  win.addEventListener("message", (e: { data: unknown }) => {
    if (isShimMessage(e.data, token)) next = applyShimMessage(next, runId, e.data);
  });
  await sleep(opts.settle ?? 450);
  if (opts.interact) {
    await opts.interact(win);
    await sleep(opts.settle ?? 450);
  }
  win.close();
  return next;
}

const click = (sel: string) => (win: any) => win.document.querySelector(sel).click(); // eslint-disable-line @typescript-eslint/no-explicit-any

// --------------------------------------------------------------------------

describe("editor: nhiệm vụ mới - bản dịch và trạng thái đầu", () => {
  it("có đủ chữ vi và en, en không có dấu tiếng Việt", () => {
    const diacritics = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
    for (const id of NEW_IDS) {
      expect(EDITOR_MISSIONS.some((m) => m.id === id), id).toBe(true);
      const vi = toolEditorVi.toolEditor.missions[id as keyof typeof toolEditorVi.toolEditor.missions];
      const en = toolEditorEn.toolEditor.missions[id as keyof typeof toolEditorEn.toolEditor.missions];
      expect(vi?.brief && vi.hint && vi.title && vi.from, id).toBeTruthy();
      expect(JSON.stringify(en), id).not.toMatch(diacritics);
      expect(Object.keys(en.criteria).sort(), id).toEqual(Object.keys(vi.criteria).sort());
      const mission = EDITOR_MISSIONS.find((m) => m.id === id)!;
      expect(Object.keys(en.criteria).sort(), id).toEqual(mission.criteria.map((c) => c.id).sort());
    }
  });

  it("đỏ ở dự án mẫu, cả khi chưa chạy lẫn khi đã chạy trang mẫu", async () => {
    const s0 = fresh();
    for (const id of NEW_IDS) expect(passes(s0, id), id).toBe(false);
    const ran = await runPage(s0, { interact: click("body") });
    for (const id of NEW_IDS) expect(passes(ran, id), `${id} after starter run`).toBe(false);
  });

  it("các nhiệm vụ cũ vẫn đỏ ở dự án mẫu sau khi trang mẫu chạy trong jsdom", async () => {
    const ran = await runPage(fresh());
    // trang mẫu có lỗi gõ cố ý: console phải có lỗi, nhiệm vụ fix-bug chưa qua
    expect(ran.lastRun!.console.some((e) => e.level === "error")).toBe(true);
    expect(passes(ran, "fix-bug")).toBe(false);
  });

  it("xếp từ dễ tới khó: nhiệm vụ cuối đòi nhiều tiêu chí hơn nhiệm vụ đầu", () => {
    const fresh8 = EDITOR_MISSIONS.slice(8);
    expect(fresh8.map((m) => m.id)).toEqual(NEW_IDS);
    expect(EDITOR_MISSIONS.length).toBe(21);
  });
});

describe("flex-center", () => {
  const css = `${STYLE}\nbody {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n`;
  it("xanh khi căn giữa hai chiều và đã chạy", async () => {
    const s = await runPage(write(fresh(), { "style.css": css }));
    expect(criteriaOf(s, "flex-center")).toEqual({ flex: true, centered: true, ran: true });
    expect(passes(s, "flex-center")).toBe(true);
  });
  it("đỏ: mới có flex, chưa căn giữa", async () => {
    const s = await runPage(write(fresh(), { "style.css": `${STYLE}\nbody { display: flex; }\n` }));
    expect(criteriaOf(s, "flex-center")).toEqual({ flex: true, centered: false, ran: false });
  });
  it("đỏ: căn một chiều", async () => {
    const s = await runPage(write(fresh(), { "style.css": `${STYLE}\nbody { display: flex; justify-content: center; }\n` }));
    expect(passes(s, "flex-center")).toBe(false);
  });
  it("đỏ: viết trong @media thì không tính", async () => {
    const wrapped = `${STYLE}\n@media (max-width: 500px) {\n body { display: flex; justify-content: center; align-items: center; }\n}\n`;
    expect(passes(await runPage(write(fresh(), { "style.css": wrapped })), "flex-center")).toBe(false);
  });
  it("đỏ: sửa xong mà chưa bấm Chạy", () => {
    const s = write(fresh(), { "style.css": css });
    expect(criteriaOf(s, "flex-center")).toEqual({ flex: true, centered: true, ran: false });
  });
  it("đỏ: quy tắc áp vào lớp không có trong trang", async () => {
    const s = await runPage(
      write(fresh(), { "style.css": `${STYLE}\n.ghost { display: flex; justify-content: center; align-items: center; }\n` }),
    );
    expect(passes(s, "flex-center")).toBe(false);
  });
});

describe("viewport-media", () => {
  const head = '<meta name="viewport" content="width=device-width, initial-scale=1>';
  const goodHead = '<meta name="viewport" content="width=device-width, initial-scale=1">';
  const css = `${STYLE}\n@media (max-width: 600px) {\n  body { font-size: 14px; }\n}\n`;
  const base = () => getFile(fresh(), "index.html")!.content;
  const withHead = (h: string) => base().replace("</head>", `${h}\n</head>`);
  it("xanh", async () => {
    const s = await runPage(write(fresh(), { "index.html": withHead(goodHead), "style.css": css }));
    expect(passes(s, "viewport-media")).toBe(true);
  });
  it("đỏ: chỉ có viewport", async () => {
    const s = await runPage(write(fresh(), { "index.html": withHead(goodHead) }));
    expect(criteriaOf(s, "viewport-media")).toMatchObject({ viewport: true, query: false, ran: false });
  });
  it("đỏ: chỉ có @media", async () => {
    const s = await runPage(write(fresh(), { "style.css": css }));
    expect(passes(s, "viewport-media")).toBe(false);
  });
  it("đỏ: @media trỏ vào phần tử không tồn tại, hoặc rỗng", async () => {
    const ghost = `${STYLE}\n@media (max-width: 600px) { .ghost { color: red; } }\n`;
    expect(passes(await runPage(write(fresh(), { "index.html": withHead(goodHead), "style.css": ghost })), "viewport-media")).toBe(false);
    const empty = `${STYLE}\n@media (max-width: 600px) { body { } }\n`;
    expect(passes(await runPage(write(fresh(), { "index.html": withHead(goodHead), "style.css": empty })), "viewport-media")).toBe(false);
  });
  it("đỏ: meta viewport viết sai nội dung", async () => {
    const s = await runPage(write(fresh(), { "index.html": withHead('<meta name="viewport" content="initial-scale=1">'), "style.css": css }));
    expect(passes(s, "viewport-media")).toBe(false);
    expect(head).toBeTruthy();
  });
});

describe("semantic-tags", () => {
  const good = page('<header><a href="#">Shop</a></header>\n<main><h1>Hello</h1><p>Text</p></main>\n<footer>(c) 2026</footer>');
  it("xanh", async () => {
    const s = await runPage(write(fresh(), { "index.html": good }));
    expect(criteriaOf(s, "semantic-tags")).toEqual({ main: true, landmarks: true, ran: true });
  });
  it("đỏ: toàn div", async () => {
    const s = await runPage(write(fresh(), { "index.html": page('<div class="header">x</div><div class="main"><h1>Hello</h1></div><div class="footer">y</div>') }));
    expect(passes(s, "semantic-tags")).toBe(false);
  });
  it("đỏ: main không chứa h1", async () => {
    const s = await runPage(write(fresh(), { "index.html": page("<header>x</header><h1>Hello</h1><main><p>t</p></main><footer>y</footer>") }));
    expect(criteriaOf(s, "semantic-tags").main).toBe(false);
  });
  it("đỏ: header nằm trong main, hoặc footer rỗng", async () => {
    const a = page("<main><header>x</header><h1>Hello</h1></main><footer>y</footer>");
    expect(passes(await runPage(write(fresh(), { "index.html": a })), "semantic-tags")).toBe(false);
    const b = page("<header>x</header><main><h1>Hello</h1></main><footer></footer>");
    expect(passes(await runPage(write(fresh(), { "index.html": b })), "semantic-tags")).toBe(false);
  });
  it("đỏ: chưa chạy", () => {
    expect(criteriaOf(write(fresh(), { "index.html": good }), "semantic-tags")).toEqual({ main: true, landmarks: true, ran: false });
  });
});

describe("img-alt-lazy", () => {
  const img = (attrs: string) => page(`<h1>Hi</h1><img ${attrs}>`);
  const full = 'src="https://example.com/mug.jpg" alt="Blue mug on a table" width="320" height="200" loading="lazy"';
  it("xanh", async () => {
    const s = await runPage(write(fresh(), { "index.html": img(full) }));
    expect(criteriaOf(s, "img-alt-lazy")).toEqual({ img: true, alt: true, lazy: true, ran: true });
  });
  it("đỏ ở từng thiếu sót", async () => {
    const cases: Record<string, string> = {
      noAlt: 'src="https://example.com/a.jpg" width="320" height="200" loading="lazy"',
      emptyAlt: 'src="https://example.com/a.jpg" alt="" width="320" height="200" loading="lazy"',
      noLazy: 'src="https://example.com/a.jpg" alt="x y" width="320" height="200"',
      noSize: 'src="https://example.com/a.jpg" alt="x y" loading="lazy"',
      missingFile: 'src="photos/mug.jpg" alt="x y" width="320" height="200" loading="lazy"',
    };
    for (const [name, attrs] of Object.entries(cases)) {
      const s = await runPage(write(fresh(), { "index.html": img(attrs) }));
      expect(passes(s, "img-alt-lazy"), name).toBe(false);
    }
  });
  it("data URI cũng được", async () => {
    const s = await runPage(write(fresh(), { "index.html": img('src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="dot" width="1" height="1" loading="lazy"') }));
    expect(passes(s, "img-alt-lazy")).toBe(true);
  });
  it("ảnh trỏ tới tệp có trong dự án thì được", async () => {
    const s = await runPage(write(fresh(), { "index.html": img('src="mug.svg" alt="mug" width="10" height="10" loading="lazy"'), "mug.svg": "<svg/>" }));
    expect(passes(s, "img-alt-lazy")).toBe(true);
  });
});

describe("labeled-form", () => {
  const form = (inner: string) => page(`<h1>Hi</h1><form>${inner}</form>`);
  const good = form('<label for="email">Email</label><input id="email" name="email" type="email"><button type="submit">Send</button>');
  it("xanh", async () => {
    expect(criteriaOf(await runPage(write(fresh(), { "index.html": good })), "labeled-form")).toEqual({
      form: true,
      label: true,
      submit: true,
      ran: true,
    });
  });
  it("xanh: nhãn bọc ngoài ô, nút không khai type", async () => {
    const s = await runPage(write(fresh(), { "index.html": form("<label>Email <input name=email type=email></label><button>Send</button>") }));
    expect(passes(s, "labeled-form")).toBe(true);
  });
  it("đỏ: label for lệch id", async () => {
    const s = await runPage(write(fresh(), { "index.html": form('<label for="mail">Email</label><input id="email" type="email"><button>Send</button>') }));
    expect(criteriaOf(s, "labeled-form")).toMatchObject({ form: true, label: false, submit: true, ran: false });
  });
  it("đỏ: ô không nhãn, chỉ placeholder", async () => {
    const s = await runPage(write(fresh(), { "index.html": form('<input type="email" placeholder="Email"><button>Send</button>') }));
    expect(passes(s, "labeled-form")).toBe(false);
  });
  it("đỏ: không có nút gửi", async () => {
    const s = await runPage(write(fresh(), { "index.html": form('<label for="e">Email</label><input id="e" type="email">') }));
    expect(criteriaOf(s, "labeled-form")).toMatchObject({ label: true, submit: false, ran: false });
  });
  it("đỏ: một trong hai ô thiếu nhãn", async () => {
    const s = await runPage(
      write(fresh(), { "index.html": form('<label for="a">A</label><input id="a"><input id="b"><button>Send</button>') }),
    );
    expect(passes(s, "labeled-form")).toBe(false);
  });
});

describe("css-grid-cards", () => {
  const cards = (n: number) => page(`<h1>Hi</h1><div class="cards">${Array.from({ length: n }, (_, i) => `<div class="card">${i}</div>`).join("")}</div>`);
  const css = (rule: string) => `${STYLE}\n.cards { ${rule} }\n`;
  const good = "display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;";
  it("xanh", async () => {
    const s = await runPage(write(fresh(), { "index.html": cards(3), "style.css": css(good) }));
    expect(criteriaOf(s, "css-grid-cards")).toEqual({ grid: true, gap: true, cards: true, ran: true });
  });
  it("xanh: auto-fit và hai cột liệt kê", async () => {
    for (const rule of [
      "display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px;",
      "display: grid; grid-template-columns: 1fr 2fr; column-gap: 8px;",
    ]) {
      const s = await runPage(write(fresh(), { "index.html": cards(4), "style.css": css(rule) }));
      expect(passes(s, "css-grid-cards"), rule).toBe(true);
    }
  });
  it("đỏ: một cột, không gap, hoặc chỉ 2 thẻ", async () => {
    const bad: [string, number][] = [
      ["display: grid; grid-template-columns: 1fr; gap: 8px;", 3],
      ["display: grid; grid-template-columns: repeat(3, 1fr);", 3],
      [good, 2],
      ["display: flex; gap: 8px;", 3],
    ];
    for (const [rule, n] of bad) {
      const s = await runPage(write(fresh(), { "index.html": cards(n), "style.css": css(rule) }));
      expect(passes(s, "css-grid-cards"), `${rule} / ${n}`).toBe(false);
    }
  });
  it("đỏ: lưới nằm trong @media thôi", async () => {
    const s = await runPage(write(fresh(), { "index.html": cards(3), "style.css": `${STYLE}\n@media (min-width: 1px) { .cards { ${good} } }\n` }));
    expect(passes(s, "css-grid-cards")).toBe(false);
  });
});

describe("dom-add-item", () => {
  const html = page('<h1>List</h1><ul id="list"></ul><button id="add">Add</button>');
  const good =
    'const list = document.getElementById("list");\ndocument.getElementById("add").addEventListener("click", () => {\n  const li = document.createElement("li");\n  li.textContent = "Item";\n  list.appendChild(li);\n});\n';
  it("xanh khi chạy rồi bấm nút", async () => {
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": good }), { interact: click("#add") });
    expect(criteriaOf(s, "dom-add-item")).toEqual({ markup: true, script: true, added: true });
  });
  it("đỏ: viết đúng nhưng chưa bấm nút trên trang", async () => {
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": good }));
    expect(criteriaOf(s, "dom-add-item")).toEqual({ markup: true, script: true, added: false });
  });
  it("đỏ: còn dòng consle cũ làm dừng script", async () => {
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": `consle.log("x");\n${good}` }), { interact: click("#add") });
    expect(passes(s, "dom-add-item")).toBe(false);
  });
  it("đỏ: bấm chỉ ghi console, không thêm mục", async () => {
    const js = 'document.getElementById("add").addEventListener("click", () => console.log("click"));\n';
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": js }), { interact: click("#add") });
    expect(passes(s, "dom-add-item")).toBe(false);
  });
  it("đỏ: mục có sẵn trong HTML không tính là thêm", async () => {
    const s = await runPage(write(fresh(), { "index.html": page('<ul id="list"><li>a</li></ul><button id="add">Add</button>'), "script.js": OK_SCRIPT }), {
      interact: click("#add"),
    });
    expect(passes(s, "dom-add-item")).toBe(false);
  });
});

describe("event-delegation", () => {
  const html = page('<h1>Shopping</h1><ul id="list"><li>Milk</li><li>Eggs</li><li>Bread</li></ul>');
  const good =
    'const list = document.getElementById("list");\nlist.addEventListener("click", (e) => {\n  const li = e.target.closest("li");\n  if (li) li.classList.toggle("done");\n});\n';
  const clickSecond = (win: any) => win.document.querySelectorAll("li")[1].click(); // eslint-disable-line @typescript-eslint/no-explicit-any
  it("xanh", async () => {
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": good }), { interact: clickSecond });
    expect(criteriaOf(s, "event-delegation")).toEqual({ list: true, single: true, works: true });
  });
  it("đỏ: gắn sự kiện cho từng mục", async () => {
    const js = 'document.querySelectorAll("li").forEach((li) => {\n  li.addEventListener("click", (e) => e.target.classList.toggle("done"));\n});\n';
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": js }), { interact: clickSecond });
    expect(criteriaOf(s, "event-delegation")).toMatchObject({ single: false, works: false });
  });
  it("đỏ: for-vòng lặp gắn từng mục", async () => {
    const js = 'const items = document.querySelectorAll("li");\nfor (let i = 0; i < items.length; i++) {\n  items[i].addEventListener("click", (e) => e.target.classList.toggle("done"));\n}\n';
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": js }), { interact: clickSecond });
    expect(passes(s, "event-delegation")).toBe(false);
  });
  it("đỏ: ủy quyền đúng nhưng chưa bấm", async () => {
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": good }));
    expect(criteriaOf(s, "event-delegation")).toEqual({ list: true, single: true, works: false });
  });
  it("đỏ: nghe một lần nhưng không đổi gì", async () => {
    const js = 'document.getElementById("list").addEventListener("click", (e) => console.log(e.target.textContent));\n';
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": js }), { interact: clickSecond });
    expect(passes(s, "event-delegation")).toBe(false);
  });
  it("đỏ: danh sách chỉ 2 mục", async () => {
    const s = await runPage(write(fresh(), { "index.html": page('<ul id="list"><li>a</li><li>b</li></ul>'), "script.js": good }), { interact: clickSecond });
    expect(criteriaOf(s, "event-delegation").list).toBe(false);
  });
  it("xanh: có vòng lặp dựng danh sách nhưng chỉ một listener ủy quyền", async () => {
    const js = `const list = document.getElementById("list");\n["a","b","c"].forEach((t) => {\n  const li = document.createElement("li");\n  li.textContent = t;\n  list.append(li);\n});\nlist.addEventListener("click", (e) => {\n  const li = e.target.closest("li");\n  if (li) li.classList.toggle("done");\n});\n`;
    const s = await runPage(write(fresh(), { "index.html": page('<ul id="list"><li>x</li><li>y</li><li>z</li></ul>'), "script.js": js }), {
      interact: clickSecond,
    });
    expect(passes(s, "event-delegation")).toBe(true);
  });
});

describe("form-validate", () => {
  const html = (extra = "") =>
    page(`<h1>Contact</h1><form id="f" ${extra}><label for="email">Email</label><input id="email" name="email" type="email" ${extra.includes("novalidate") ? "" : ""}><button type="submit">Send</button></form><p id="error"></p>`);
  const good =
    'const f = document.getElementById("f");\nconst error = document.getElementById("error");\nf.addEventListener("submit", (e) => {\n  e.preventDefault();\n  if (!document.getElementById("email").value) error.textContent = "Please enter your email";\n});\n';
  it("xanh khi bấm Gửi với ô trống", async () => {
    const s = await runPage(write(fresh(), { "index.html": html(), "script.js": good }), { interact: click("button") });
    expect(criteriaOf(s, "form-validate")).toEqual({ form: true, handler: true, shows: true });
  });
  it("đỏ: chưa bấm Gửi", async () => {
    const s = await runPage(write(fresh(), { "index.html": html(), "script.js": good }));
    expect(criteriaOf(s, "form-validate")).toEqual({ form: true, handler: true, shows: false });
  });
  it("đỏ: thiếu preventDefault", async () => {
    const js = good.replace("e.preventDefault();", "");
    const s = await runPage(write(fresh(), { "index.html": html(), "script.js": js }), { interact: click("button") });
    expect(criteriaOf(s, "form-validate")).toMatchObject({ handler: false, shows: false });
  });
  it("đỏ: thuộc tính required chặn sự kiện submit nên không có thông báo", async () => {
    const withRequired = html().replace('type="email"', 'type="email" required');
    const s = await runPage(write(fresh(), { "index.html": withRequired, "script.js": good }), { interact: click("button") });
    expect(passes(s, "form-validate")).toBe(false);
  });
  it("đỏ: thông báo gõ sẵn trong HTML", async () => {
    const pre = html().replace('<p id="error"></p>', '<p id="error">Please enter your email</p>');
    const s = await runPage(write(fresh(), { "index.html": pre, "script.js": good }), { interact: click("button") });
    expect(passes(s, "form-validate")).toBe(false);
  });
  it("đỏ: không có ô thông báo", async () => {
    const none = html().replace('<p id="error"></p>', "");
    const s = await runPage(write(fresh(), { "index.html": none, "script.js": good }), { interact: click("button") });
    expect(criteriaOf(s, "form-validate").form).toBe(false);
  });
});

describe("defer-script", () => {
  const headTag = '<script src="script.js" defer></script>';
  const body = "<h1>Hello</h1><p>Text</p>";
  const fixedJs = getFile(fresh(), "script.js")!.content.replace("consle", "console");
  const toHead = (tag: string) => page(body, tag, "");
  it("xanh: defer trong head và script đã sửa", async () => {
    const s = await runPage(write(fresh(), { "index.html": toHead(headTag), "script.js": fixedJs }));
    expect(criteriaOf(s, "defer-script")).toEqual({ head: true, fixed: true, ran: true });
  });
  it("đỏ: vào head mà thiếu defer - script chạy trước khi có <h1>", async () => {
    const s = await runPage(write(fresh(), { "index.html": toHead('<script src="script.js"></script>'), "script.js": fixedJs }));
    expect(s.lastRun!.console.some((e) => e.level === "error")).toBe(true);
    expect(criteriaOf(s, "defer-script")).toEqual({ head: false, fixed: true, ran: false });
  });
  it("đỏ: có defer nhưng còn lỗi gõ cũ", async () => {
    const s = await runPage(write(fresh(), { "index.html": toHead(headTag) }));
    expect(criteriaOf(s, "defer-script")).toMatchObject({ head: true, fixed: false, ran: false });
  });
  it("đỏ: sửa lỗi nhưng script vẫn ở cuối body", async () => {
    const s = await runPage(write(fresh(), { "script.js": fixedJs }));
    expect(criteriaOf(s, "defer-script")).toMatchObject({ head: false, fixed: true, ran: false });
  });
  it("đỏ: để cả hai nơi", async () => {
    const both = page(body, headTag);
    const s = await runPage(write(fresh(), { "index.html": both, "script.js": fixedJs }));
    expect(passes(s, "defer-script")).toBe(false);
  });
});

describe("move-files", () => {
  const index = (css: string, js: string) =>
    getFile(fresh(), "index.html")!.content.replace('href="style.css"', `href="${css}"`).replace('src="script.js"', `src="${js}"`);
  function moved(s: EditorState): EditorState {
    let n = renamePath(s, "style.css", "css/main.css").state;
    n = renamePath(n, "script.js", "js/app.js").state;
    return n;
  }
  it("xanh: đổi tên và sửa đường dẫn", async () => {
    let s = moved(fresh());
    s = write(s, { "index.html": index("css/main.css", "js/app.js") });
    s = await runPage(s);
    expect(criteriaOf(s, "move-files")).toEqual({ moved: true, linked: true, ran: true });
  });
  it("đỏ: đổi tên nhưng quên sửa index.html - console báo thiếu tệp", async () => {
    const s = await runPage(moved(fresh()));
    expect(criteriaOf(s, "move-files")).toEqual({ moved: true, linked: false, ran: false });
    expect(s.lastRun!.console.some((e) => /ERR_FILE_NOT_FOUND/.test(e.text))).toBe(true);
  });
  it("đỏ: sửa index.html trước mà chưa chuyển tệp", async () => {
    const s = await runPage(write(fresh(), { "index.html": index("css/main.css", "js/app.js") }));
    expect(criteriaOf(s, "move-files")).toEqual({ moved: false, linked: false, ran: false });
  });
  it("đỏ: chỉ chuyển CSS, script vẫn ở gốc", async () => {
    let s = renamePath(fresh(), "style.css", "css/main.css").state;
    s = await runPage(write(s, { "index.html": index("css/main.css", "script.js") }));
    expect(passes(s, "move-files")).toBe(false);
  });
  it("đỏ: sao chép sang thư mục mới nhưng để bản cũ ở gốc", async () => {
    let s = write(fresh(), { "css/main.css": STYLE, "js/app.js": OK_SCRIPT + "// copy\n", "index.html": index("css/main.css", "js/app.js") });
    s = await runPage(s);
    expect(criteriaOf(s, "move-files")).toMatchObject({ moved: false, ran: false });
  });
  it("đỏ: sửa index.html trỏ vào tệp không tồn tại", async () => {
    let s = moved(fresh());
    s = await runPage(write(s, { "index.html": index("css/site.css", "js/app.js") }));
    expect(passes(s, "move-files")).toBe(false);
  });
});

describe("local-storage", () => {
  const html = page('<h1>Welcome</h1><input id="name"><button id="save">Save</button><p id="hello"></p>');
  const good =
    'const input = document.getElementById("name");\nconst hello = document.getElementById("hello");\ndocument.getElementById("save").addEventListener("click", () => {\n  localStorage.setItem("name", input.value);\n});\nconst saved = localStorage.getItem("name");\nif (saved) hello.textContent = "Hello, " + saved;\n';
  const typeAndSave = (win: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    win.document.getElementById("name").value = "Lan Anh";
    win.document.getElementById("save").click();
  };
  it("xanh: lưu ở lần chạy 1, lần chạy 2 hiện lại tên", async () => {
    let s = write(fresh(), { "index.html": html, "script.js": good });
    s = await runPage(s, { interact: typeAndSave });
    expect(s.storage).toEqual({ name: "Lan Anh" });
    expect(criteriaOf(s, "local-storage")).toEqual({ markup: true, code: true, saved: true, restored: false });
    s = await runPage(s);
    expect(criteriaOf(s, "local-storage")).toEqual({ markup: true, code: true, saved: true, restored: true });
  });
  it("đỏ: chưa lưu gì thì chạy lại cũng không có gì để hiện", async () => {
    let s = write(fresh(), { "index.html": html, "script.js": good });
    s = await runPage(s);
    s = await runPage(s);
    expect(passes(s, "local-storage")).toBe(false);
  });
  it("đỏ: lưu nhưng không đọc lại khi tải", async () => {
    const js = good.split("const saved")[0];
    let s = write(fresh(), { "index.html": html, "script.js": js });
    s = await runPage(s, { interact: typeAndSave });
    s = await runPage(s);
    expect(criteriaOf(s, "local-storage")).toMatchObject({ saved: true, code: false, restored: false });
  });
  it("đỏ: lời chào gõ sẵn tên trong mã", async () => {
    const js = `${good}\nhello.textContent = "Hello, Lan Anh";\n`;
    let s = write(fresh(), { "index.html": html, "script.js": js });
    s = await runPage(s, { interact: typeAndSave });
    s = await runPage(s);
    expect(passes(s, "local-storage")).toBe(false);
  });
  it("đỏ: chỉ gán value của ô nhập (không phải chữ trên trang)", async () => {
    const js = good.replace('if (saved) hello.textContent = "Hello, " + saved;', 'if (saved) input.value = saved;');
    let s = write(fresh(), { "index.html": html, "script.js": js });
    s = await runPage(s, { interact: typeAndSave });
    s = await runPage(s);
    expect(passes(s, "local-storage")).toBe(false);
  });
  it("lưu qua nhiều lần chạy nhưng bắt đầu lại thì mất", async () => {
    let s = write(fresh(), { "index.html": html, "script.js": good });
    s = await runPage(s, { interact: typeAndSave });
    expect(s.storage).toBeTruthy();
    const reset = write(fresh(), { "index.html": html, "script.js": good });
    expect(reset.storage).toBeUndefined();
  });
});

describe("fetch-error", () => {
  const html = page('<h1>Shop</h1><ul id="list"></ul><p id="notice"></p>');
  const good = [
    'const list = document.getElementById("list");',
    'const notice = document.getElementById("notice");',
    'fetch("https://api.example.com/products")',
    "  .then((res) => res.json())",
    "  .then((items) => items.forEach((p) => {",
    '    const li = document.createElement("li");',
    "    li.textContent = p.name;",
    "    list.appendChild(li);",
    "  }))",
    '  .catch((err) => { notice.textContent = "Products failed: " + err.message; });',
    'fetch("https://api.example.com/orders")',
    '  .then((res) => { if (!res.ok) throw new Error("Orders failed (" + res.status + ")"); return res.json(); })',
    "  .catch((err) => { notice.textContent = err.message; });",
    "",
  ].join("\n");
  it("xanh", async () => {
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": good }), { settle: 700 });
    expect(criteriaOf(s, "fetch-error")).toEqual({ call: true, list: true, status: true, clean: true });
    expect(s.lastRun!.console.filter((e) => e.level === "error")).toEqual([]);
  });
  it("xanh: bản async/await với try/catch", async () => {
    const js = [
      'const list = document.getElementById("list");',
      'const notice = document.getElementById("notice");',
      "async function load() {",
      "  try {",
      '    const res = await fetch("https://api.example.com/products");',
      "    for (const p of await res.json()) {",
      '      const li = document.createElement("li");',
      "      li.textContent = p.name;",
      "      list.append(li);",
      "    }",
      '    const orders = await fetch("https://api.example.com/orders");',
      '    if (!orders.ok) notice.textContent = "Orders unavailable: " + orders.status;',
      "  } catch (err) {",
      '    notice.textContent = "Network error";',
      "  }",
      "}",
      "load();",
      "",
    ].join("\n");
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": js }), { settle: 700 });
    expect(passes(s, "fetch-error")).toBe(true);
  });
  it("đỏ: không kiểm tra res.ok - 500 đi thẳng vào .json() và không có thông báo", async () => {
    const js = good.replace(/if \(!res\.ok\) throw new Error\([^;]*;/, "");
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": js.replace(/\n  \.catch\(\(err\) => \{ notice\.textContent = err\.message; \}\);/, ";")}), { settle: 700 });
    expect(passes(s, "fetch-error")).toBe(false);
  });
  it("đỏ: gõ sẵn tên sản phẩm thay vì lấy từ dữ liệu", async () => {
    const hard = html.replace('<ul id="list"></ul>', '<ul id="list"><li>Notebook</li><li>Desk lamp</li><li>Backpack</li></ul>');
    const js = good.replace('fetch("https://api.example.com/products")', 'Promise.resolve([])').replace(".then((res) => res.json())", "");
    const s = await runPage(write(fresh(), { "index.html": hard, "script.js": js }), { settle: 700 });
    expect(criteriaOf(s, "fetch-error").clean).toBe(false);
  });
  it("đỏ: lỗi runtime sau khi fetch xong - console có dòng đỏ", async () => {
    const js = `${good}\nsetTimeout(() => { missingFunction(); }, 300);\n`;
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": js }), { settle: 700 });
    expect(s.lastRun!.console.some((e) => e.level === "error" && /missingFunction/.test(e.text))).toBe(true);
    expect(criteriaOf(s, "fetch-error")).toMatchObject({ call: true, list: true, clean: false });
  });
  it("đỏ: đủ danh sách nhưng /orders không được xử lý", async () => {
    const js = good.split('fetch("https://api.example.com/orders")')[0];
    const s = await runPage(write(fresh(), { "index.html": html, "script.js": js }), { settle: 700 });
    expect(criteriaOf(s, "fetch-error")).toMatchObject({ call: true, list: true, status: false, clean: false });
  });
});

describe("hạ tầng chạy thật", () => {
  it("defer: script nhúng được dời xuống cuối body, giữ thứ tự", () => {
    const files = [
      { path: "index.html", content: '<html><head><script src="a.js" defer></script></head><body><h1>x</h1><script src="b.js"></script></body></html>', saved: "" },
      { path: "a.js", content: "var A=1;", saved: "" },
      { path: "b.js", content: "var B=1;", saved: "" },
    ];
    const { html } = buildSrcDoc(files, "index.html", "t");
    expect(html.indexOf("var B=1;")).toBeLessThan(html.indexOf("var A=1;"));
    expect(html.indexOf("var A=1;")).toBeLessThan(html.indexOf("</body>"));
    expect(html.indexOf("var A=1;")).toBeGreaterThan(html.indexOf("<h1>"));
  });
  it("fetch tới địa chỉ lạ bị từ chối như khi mất mạng", async () => {
    const js = 'fetch("https://example.org/x").catch((e) => console.log("caught:" + e.name + ":" + e.message));\n';
    const s = await runPage(write(fresh(), { "script.js": js }), { settle: 500 });
    expect(s.lastRun!.console.map((e) => e.text)).toContain("caught:TypeError:Failed to fetch");
  });
  it("lưu hết vẫn không đụng tới nhiệm vụ mới", () => {
    const s = saveAll(write(fresh(), { "index.html": page("<main><h1>x</h1></main>") }));
    expect(passes(s, "semantic-tags")).toBe(false);
  });
});
