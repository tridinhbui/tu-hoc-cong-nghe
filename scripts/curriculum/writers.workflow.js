// Workflow: 148 agent viết 740 bài (37 chặng x 4 tệp x 5 bài). Chạy bằng tool Workflow
// với scriptPath trỏ tới tệp này; args = { stages: [30, 31, ...] } (mặc định cả 37).
export const meta = {
  name: 'write-ai-work-lessons',
  description: 'Write lessons 2000-2739, one agent per 5-lesson file, worker pool of 10',
  phases: [{ title: 'Write' }],
}

const STAGES = (args && args.stages) || Array.from({ length: 37 }, (_, i) => 30 + i)
const POOL = (args && args.pool) || 10

const BRIEF = (n, chunk) => {
  const c = 'abcd'[chunk]
  const from = chunk * 5 + 1
  return `
Repo /Users/buidinhtri/Desktop/TuHocCongNghe (Vietnamese learn-tech site). READ FIRST, fully: AGENTS.md ("Writing quiz questions" rules 1-6 incl. the paragraphs on the length tell in BOTH directions; "Interactive blocks"), KE-HOACH-1500-BAI.md section 4, lib/lesson-types.ts (block types and their comments), and lib/work-ai-daily-lessons.ts ids 1810 and 1816 (fully working examples of every block type: feynman, chart, flow, aiLab prompt, aiLab spotError, scenario). Then read scripts/curriculum/stage-${n}.json: it is the design of your stage.

YOUR JOB: write lessons #${from}-#${from + 4} of Chặng ${n} = the 5 manifest lessons at array positions ${chunk * 5}..${chunk * 5 + 4} (ids listed there), and put them into the array of the ONE file you own:
  lib/ai-work-lessons/s${n}-${c}.ts   (currently \`export const S${n}_${c.toUpperCase()}_LESSONS: Lesson[] = [];\` — fill that array, keep the export name)
You may edit ONLY that file. ~148 other agents edit other files at the same time; do NOT commit, do NOT run git checkout/stash/reset, do NOT run npm run audit:lessons, generate-lesson-data or any --write-baseline/--seed flag (those clobber shared generated data). Your verification tool is: node scripts/check-lesson-batch.mjs lib/ai-work-lessons/s${n}-${c}.ts (reads only your file; iterate until it prints OK) and, at the very end, once, npx tsc --noEmit -p . filtered to your file.

EACH LESSON has exactly the fields of the reference lessons: id, slug, title = "Chặng ${n}, Bài K: <title from manifest>" (K = its number 1..20 in the stage), subtitle, duration ("8 phút" or "10 phút"), difficulty ("Dễ" for the first ~10 lessons of the stage, "Trung bình" after), emoji, track "personal", isFundamental false, whyItMatters, openingQuestion + openingOptions (exactly 4) + correctOption + explanation (>= 250 chars), diagram (>= 3 nodes), realWorldExample, quiz (>= 5 questions x exactly 4 options, each with correct + explanation), keyTakeaways, practicePrompt, summary, application {title, message, secondary}, sections. Use the manifest's "slug", "id", "brief", "practice", "visual" — the manifest's title/slug/id are fixed; the brief tells you the moment and outcome.
- sections >= 9 blocks: block 0 = lead; block 1 = feynman ("... đơn giản hơn bạn nghĩ", an everyday analogy that is ACCURATE for what the lesson teaches); heading/paragraph/list/comparison/callout as needed; the practice block named in the manifest (aiLab prompt | aiLab spotError | scenario | sim) and, if it is not a scenario, ALSO add a scenario or second aiLab so each lesson has real practice; the visual named in the manifest (flow, or chart only if the manifest says chart:<quantity>); last block = closing.
- Practice blocks: NO real AI, everything hardcoded. aiLab prompt: parts with EXACTLY ONE good option each, feedback that names the concrete consequence, simulated replies that visibly differ (good prompt -> good reply; vague prompt -> invented details). spotError: >= 4 segments, >= 1 fabricated segment with the reason. scenario: every branch reaches an ending, >= 1 good and >= 1 bad, no loops, every decision has >= 2 choices. sim: {type:"sim", tool, mission, title, task} with a real mission id from lib/tools/mission-ids.json. chart: "series" (x range + params sliders + expr, grammar in lib/lesson-blocks/expr.js: numbers, + - * / ^, parentheses, x, param ids, min/max/round/abs) or "data"; caption must say "số liệu minh hoạ" when numbers are illustrative; expr must stay finite at both ends of every slider.
- Voice: a Vietnamese working adult who knows NOTHING about tech. Everyday object first, then the term; <= 2 new terms per section; open with a concrete moment of their work week, never a definition. Plain Vietnamese with correct diacritics.
- application: a concrete task doable in <= 20 minutes on the learner's OWN documents; the dashboard asks about it the next day, so make it specific.
- Facts: no invented statistics, no invented companies. realWorldExample = a real case you are CERTAIN of, or company: "Tình huống minh hoạ" (explicitly hypothetical). Illustrative numbers are labelled as such. No medical/legal/tax/investment advice and no law article numbers: say "hỏi bộ phận pháp chế / kế toán trưởng / chuyên gia".
- Tools (ChatGPT, Claude, Gemini, Copilot, NotebookLM, Canva, Zapier, Make, n8n, Power Automate, Apps Script...): teach DURABLE concepts and how to give work and check results; NO button paths, menu names, prices or version-specific claims. If a lesson rests on a specific tool capability, verify it in the official documentation (WebSearch/WebFetch, if you have those tools) and put the source URL and date in a // comment above the lesson object; if you cannot verify, do not state it.
- Do not repeat or contradict other lessons: grep the titles of the existing lessons in scripts/curriculum/stage-*.json and lib/lessons-data/_index.json before writing claims that could clash.
- QUIZ (measured by the checker on YOUR 25 questions; also by the global audit): the correct option states only the claim; every distractor is a mistake a real learner makes (numeric ones carry the arithmetic that produces them); no hollow options ("Luôn đúng", "Không ảnh hưởng"); the four options within ±20% length; explanations >= 120 chars saying why the OTHER options are wrong. LENGTH DISTRIBUTION is the trap that cost a whole batch: aim for roughly 6 questions where the correct option is uniquely the LONGEST, roughly 6 where it is uniquely the SHORTEST, the rest in the middle or tied — write distractors of deliberately varied length to achieve it. Never pad or trim the correct option to fix a tell: rewrite a distractor. Put the correct answer at any index (positions are rebalanced at build time).
Finish only when the checker prints OK for your file and tsc shows no error in it. FINAL ANSWER: ONE line: "s${n}-${c}: OK, <5 slugs>" or the unresolved problem. Nothing else.
`
}

const jobs = []
for (const n of STAGES) for (let k = 0; k < 4; k++) jobs.push({ n, k })
let next = 0
const results = []
async function worker() {
  while (next < jobs.length) {
    const j = jobs[next++]
    const r = await agent(BRIEF(j.n, j.k), { label: `s${j.n}-${'abcd'[j.k]}`, phase: 'Write' })
    results.push(String(r).slice(0, 160))
  }
}
await parallel(Array.from({ length: POOL }, () => () => worker()))
return { done: results.length, notOk: results.filter(r => !/: OK/.test(r)) }
