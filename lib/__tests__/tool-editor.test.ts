import { describe, it, expect } from "vitest";
import {
  appendConsole,
  buildTree,
  closeTab,
  createFile,
  createFolder,
  createInitialState,
  cursorPosition,
  deletePath,
  dirtyFiles,
  editFile,
  getFile,
  markClick,
  normalizePath,
  openFile,
  recordSearch,
  relocalize,
  renamePath,
  resolvePath,
  saveAll,
  saveFile,
  searchFiles,
  startRun,
  type EditorState,
} from "../tools/editor/engine";
import { buildSrcDoc } from "../tools/editor/srcdoc";
import { validateProject } from "../tools/editor/validate";
import { highlight } from "../tools/editor/highlight";
import { EDITOR_MISSIONS, hasBodyBackground, headingOf, linksTo } from "../tools/editor/missions";
import { toolEditorEn, toolEditorVi } from "../i18n/dictionaries/sections/tool-editor";

const fresh = () => createInitialState(toolEditorEn.toolEditor.starter);
const content = (s: EditorState, p: string) => getFile(s, p)!.content;
const doneIds = (s: EditorState) => EDITOR_MISSIONS.filter((m) => m.check(s)).map((m) => m.id);

describe("editor engine: files", () => {
  it("starts with the four starter files, README open", () => {
    const s = fresh();
    expect(s.files.map((f) => f.path).sort()).toEqual(["README.md", "index.html", "script.js", "style.css"]);
    expect(s.active).toBe("README.md");
    expect(dirtyFiles(s)).toEqual([]);
  });

  it("marks a file dirty on edit and clean on save", () => {
    let s = openFile(fresh(), "style.css");
    s = editFile(s, "style.css", "body {}");
    expect(dirtyFiles(s).map((f) => f.path)).toEqual(["style.css"]);
    s = saveFile(s, "style.css");
    expect(dirtyFiles(s)).toEqual([]);
    expect(s.saveCount).toBe(1);
  });

  it("creates files and folders, rejecting duplicates and bad names", () => {
    let s = fresh();
    expect(createFile(s, "index.html").error).toBe("exists");
    expect(createFile(s, "  ").error).toBe("empty");
    expect(createFile(s, "../x.html").error).toBe("invalid");
    s = createFolder(s, "pages").state;
    s = createFile(s, "pages/contact.html", "<p>hi</p>").state;
    expect(s.active).toBe("pages/contact.html");
    const tree = buildTree(s);
    expect(tree[0]).toMatchObject({ kind: "folder", name: "pages" });
    expect(tree[0].children[0].name).toBe("contact.html");
  });

  it("renames a folder with everything inside and keeps tabs pointing at it", () => {
    let s = createFile(fresh(), "pages/a.html").state;
    s = renamePath(s, "pages", "site").state;
    expect(getFile(s, "site/a.html")).toBeDefined();
    expect(s.openTabs).toContain("site/a.html");
    expect(renamePath(s, "index.html", "script.js").error).toBe("exists");
  });

  it("deletes files and closes their tabs", () => {
    let s = openFile(fresh(), "script.js");
    s = deletePath(s, "script.js").state;
    expect(getFile(s, "script.js")).toBeUndefined();
    expect(s.openTabs).not.toContain("script.js");
    expect(s.active).toBe("README.md");
  });

  it("closes tabs and moves focus to a neighbour", () => {
    let s = openFile(openFile(fresh(), "index.html"), "style.css");
    s = closeTab(s, "style.css");
    expect(s.active).toBe("index.html");
  });

  it("swaps the starter project to another language only while it is untouched", () => {
    const vi = toolEditorVi.toolEditor.starter;
    const s = relocalize(fresh(), vi);
    expect(content(s, "index.html")).toContain(vi.heading);
    expect(s.starterHeading).toBe(vi.heading);
    const edited = saveFile(editFile(fresh(), "style.css", "body {}"), "style.css");
    expect(relocalize(edited, vi)).toBe(edited);
  });

  it("finds matches across files", () => {
    const hits = searchFiles(fresh().files, "todo");
    expect(new Set(hits.map((h) => h.path))).toEqual(new Set(["README.md", "script.js"]));
    expect(searchFiles(fresh().files, "todo", true)).toEqual([]);
  });

  it("reports cursor line and column", () => {
    expect(cursorPosition("ab\ncde", 5)).toEqual({ line: 2, col: 3 });
  });

  it("resolves relative paths", () => {
    expect(resolvePath("index.html", "./style.css")).toBe("style.css");
    expect(resolvePath("pages/a.html", "../style.css")).toBe("style.css");
    expect(resolvePath("index.html", "https://example.com")).toBeNull();
    expect(normalizePath("/a//b/").path).toBe("a/b");
  });
});

describe("editor engine: srcDoc and validation", () => {
  it("inlines style.css and script.js and injects a single-line shim", () => {
    const s = fresh();
    const { html, missing, scripts } = buildSrcDoc(s.files, "index.html", "tok");
    expect(missing).toEqual([]);
    expect(html).toContain("font-family: system-ui");
    expect(html).toContain("consle.log");
    expect(html).not.toMatch(/<link[^>]*style\.css/);
    expect(html).not.toMatch(/src="script\.js"/);
    expect(html).toContain('"tok"');
    // The mapped start line points at the first line of script.js.
    const docLines = html.split("\n");
    expect(docLines[scripts[0].start - 1]).toBe(content(s, "script.js").split("\n")[0]);
  });

  it("reports referenced files that do not exist", () => {
    const s = deletePath(fresh(), "style.css").state;
    expect(buildSrcDoc(s.files, "index.html", "t").missing).toEqual(["style.css"]);
    expect(validateProject(s.files).some((p) => p.code === "missingFile")).toBe(true);
  });

  it("flags the starter typo, unclosed tags and unbalanced braces", () => {
    const s = fresh();
    expect(validateProject(s.files)).toEqual([
      expect.objectContaining({ path: "script.js", code: "typo", params: { wrong: "consle", right: "console" } }),
    ]);
    const broken = editFile(editFile(s, "index.html", "<div><p>hi</div>"), "style.css", "body { color: red;");
    const codes = validateProject(broken.files).map((p) => p.code);
    expect(codes).toContain("unclosedTag");
    expect(codes).toContain("unbalancedOpen");
  });

  it("highlight tokens always reassemble to the source", () => {
    for (const f of fresh().files) {
      const lang = f.path.endsWith(".html") ? "html" : f.path.endsWith(".css") ? "css" : f.path.endsWith(".js") ? "javascript" : "markdown";
      expect(highlight(f.content, lang).map((t) => t.text).join("")).toBe(f.content);
    }
  });
});

describe("editor missions", () => {
  it("has vi and en copy for every mission", () => {
    expect(EDITOR_MISSIONS.length).toBeGreaterThanOrEqual(6);
    expect(EDITOR_MISSIONS.length).toBeLessThanOrEqual(8);
    for (const m of EDITOR_MISSIONS) {
      const vi = toolEditorVi.toolEditor.missions[m.id as keyof typeof toolEditorVi.toolEditor.missions];
      const en = toolEditorEn.toolEditor.missions[m.id as keyof typeof toolEditorEn.toolEditor.missions];
      expect(vi?.title && vi.hint && en?.title && en.hint).toBeTruthy();
    }
    expect(Object.keys(toolEditorVi.toolEditor.missions).sort()).toEqual(EDITOR_MISSIONS.map((m) => m.id).sort());
  });

  it("none is done at the start", () => {
    expect(doneIds(fresh())).toEqual([]);
  });

  it("helpers read HTML and CSS the way a learner writes them", () => {
    expect(headingOf("<h1 class='x'> Hi <em>you</em></h1>")).toBe("Hi you");
    expect(hasBodyBackground("body { color: red; background-color: #fff; }")).toBe(true);
    expect(hasBodyBackground("h1 { background: red }")).toBe(false);
    expect(linksTo('<a href="./about.html">About</a>', "about.html")).toBe(true);
  });

  it("every mission can be completed by a scripted session", () => {
    const done = new Set<string>();
    const note = (s: EditorState) => doneIds(s).forEach((id) => done.add(id));
    let s = fresh();

    // 1. open index.html
    s = openFile(s, "index.html");
    note(s);
    expect(done.has("open-index")).toBe(true);

    // 2. change heading and run
    s = editFile(s, "index.html", content(s, "index.html").replace("Hello, world", "Hello, Lan"));
    note(s);
    expect(done.has("change-heading")).toBe(false); // not until it is run
    s = startRun(s);
    note(s);
    expect(done.has("change-heading")).toBe(true);

    // 3. CSS background
    s = editFile(s, "style.css", content(s, "style.css").replace("color: #1f2937;", "color: #1f2937;\n  background-color: #fef3c7;"));
    s = startRun(s);
    note(s);
    expect(done.has("css-background")).toBe(true);

    // 4. search TODO
    s = recordSearch(s, "TODO", searchFiles(s.files, "TODO").length);
    note(s);
    expect(done.has("search-todo")).toBe(true);

    // 5. fix the bug: a run with the typo reports an error, the fixed run does not
    let run = startRun(s);
    run = appendConsole(run, run.lastRun!.id, { level: "error", source: "runtime", text: "Uncaught ReferenceError: consle is not defined" });
    expect(doneIds(run)).not.toContain("fix-bug");
    s = editFile(s, "script.js", content(s, "script.js").replace("consle.", "console."));
    s = startRun(s);
    s = appendConsole(s, s.lastRun!.id, { level: "log", source: "console", text: "Page loaded: Hello, Lan" });
    note(s);
    expect(done.has("fix-bug")).toBe(true);

    // 6. button that logs on click
    s = editFile(s, "index.html", content(s, "index.html").replace("<script", '<button id="btn">Click me</button>\n  <script'));
    s = editFile(
      s,
      "script.js",
      content(s, "script.js") + 'document.querySelector("#btn").addEventListener("click", () => console.log("clicked"));\n',
    );
    s = startRun(s);
    const id = s.lastRun!.id;
    s = appendConsole(s, id, { level: "log", source: "console", text: "Page loaded: Hello, Lan" });
    expect(doneIds(s)).not.toContain("button-log"); // a log before any click does not count
    s = markClick(s, id);
    s = appendConsole(s, id, { level: "log", source: "console", text: "clicked" });
    note(s);
    expect(done.has("button-log")).toBe(true);

    // 7. about.html + link
    s = createFile(s, "about.html").state;
    s = editFile(s, "about.html", "<h1>About</h1>");
    s = editFile(s, "index.html", content(s, "index.html").replace("</p>", '</p>\n  <a href="about.html">About</a>'));
    note(s);
    expect(done.has("about-page")).toBe(true);

    // 8. save everything
    expect(doneIds(s)).not.toContain("save-all");
    s = saveAll(s);
    note(s);
    expect(done.has("save-all")).toBe(true);

    expect([...done].sort()).toEqual(EDITOR_MISSIONS.map((m) => m.id).sort());
  });
});
