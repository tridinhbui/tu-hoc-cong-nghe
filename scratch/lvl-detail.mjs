import ts from "typescript"; import { readFileSync } from "fs";
const s=readFileSync("lib/level-exams.ts","utf8");
const js=ts.transpileModule(s.replace(/^import .*$/gm,"").replace(/export /g,""),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const m={}; new Function("exports",js+";exports.E=LEVEL_EXAMS;")(m);
for(const k of process.argv[2].split(",").map(Number)){
 const c=m.E[k];
 c.questions.forEach((q,i)=>{
  const L=q.options.map(o=>o.length); const mx=Math.max(...L), mn=Math.min(...L);
  const cl=L[q.correctIndex];
  if(cl===mx||cl===mn){
   const tag = cl===mx?"DÀI ":"NGẮN";
   const others=L.filter((_,j)=>j!==q.correctIndex);
   console.log(`L${k} q${i+1} ${tag} correct=${cl} others=${others.join(",")}`);
   console.log(`     "${q.options[q.correctIndex].slice(0,72)}"`);
  }});
}
