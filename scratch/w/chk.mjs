import { lessons } from "../../lib/lessons.ts";
import { widgetMatchesTopic } from "../../lib/widget-topics.ts";
const want = [[1752,"chart"],[1735,"risk"],[1743,"risk"],[1745,"fee-drag"],[1731,"multiples"],[1020,"ethics-case"],[1763,"multiples"],[1734,"ratios"]];
for (const [id,t] of want) {
  const l = lessons.find(x => x.id===id);
  if (!l) { console.log(id, "KHÔNG THẤY"); continue; }
  console.log(String(id).padEnd(6)+t.padEnd(14)+(widgetMatchesTopic(t,l)?"khớp   ":"KHÔNG  ")+(l.interactiveType||"—").padEnd(10)+l.title.slice(0,52));
}
