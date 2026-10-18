// Đếm chữ giảng của một bài: chữ trong các khối KHÔNG tương tác của `sections`
// (đọc lib/lessons-data, nên chạy sau generate-lesson-data). In kèm danh sách
// vị trí:loại:số chữ - dùng để kiểm vị trí khối thực hành không bị dời khi
// viết ngắn bài (recordExercisePass khoá theo vị trí khối).
// node lesson-words.mjs <slug> [<slug> ...]
import { readFileSync } from "node:fs";
const INTER = new Set(["exercise","sim","aiLab","scenario","machine","chart","flow","feynman"]);
const words = (s) => (s||"").split(/\s+/).filter(Boolean).length;
const txt = (b) => { const o=[]; const walk=(v,k)=>{ if(typeof v==="string"){ if(!["type","language","good","next","start","expr","mission","ending","id"].includes(k)) o.push(v);} else if(Array.isArray(v)) v.forEach(x=>walk(x,k)); else if(v&&typeof v==="object") for(const [kk,vv] of Object.entries(v)) walk(vv,kk);}; walk(b); return o.join(" "); };
for (const s of process.argv.slice(2)) {
  const l = JSON.parse(readFileSync(`lib/lessons-data/${s}.json`,"utf8"));
  let teach=0, inter=0; const per=[];
  l.sections.forEach((b,i)=>{ const w=words(txt(b)); if(INTER.has(b.type)) inter+=w; else teach+=w; per.push(`${i}:${b.type}:${w}`); });
  console.log(s, "teach", teach, "inter", inter, "blocks", l.sections.length, "cp", l.checkpointIndex, "why", words(l.whyItMatters), "rw", words(l.realWorldExample?.description));
  console.log("   ", per.join(" "));
}
