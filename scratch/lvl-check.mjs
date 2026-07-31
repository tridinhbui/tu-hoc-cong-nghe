// Ad-hoc: đo tell (đáp án đúng dài nhất / ngắn nhất) trong ngân hàng thi level.
import ts from "typescript"; import { readFileSync } from "fs";
const s=readFileSync("lib/level-exams.ts","utf8");
const js=ts.transpileModule(s.replace(/^import .*$/gm,"").replace(/export /g,""),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const m={}; new Function("exports",js+";exports.E=LEVEL_EXAMS;")(m);
const only=process.argv[2]?process.argv[2].split(",").map(Number):null;
let TL=0,TS=0,TN=0;
for(const k of Object.keys(m.E)){ if(only&&!only.includes(+k))continue;
 const c=m.E[k]; let lg=0,sh=0; const bad=[];
 c.questions.forEach((q,i)=>{const L=q.options.map(o=>o.length);const isL=L[q.correctIndex]===Math.max(...L),isS=L[q.correctIndex]===Math.min(...L);
  if(isL)lg++; if(isS){sh++;bad.push("q"+(i+1)+"="+L[q.correctIndex]+"/max"+Math.max(...L));}});
 TL+=lg;TS+=sh;TN+=c.questions.length;
 console.log(("L"+k).padEnd(4),String(c.questions.length).padStart(3)+"c",
   "| dài "+String(lg).padStart(2)+" ("+Math.round(lg/c.questions.length*100)+"%)",
   "| ngắn "+String(sh).padStart(2)+" ("+Math.round(sh/c.questions.length*100)+"%)",
   only?" ngắn: "+bad.join(" "):"");}
console.log("TỔNG",TN,"câu | dài",TL,"("+Math.round(TL/TN*100)+"%) | ngắn",TS,"("+Math.round(TS/TN*100)+"%)");
