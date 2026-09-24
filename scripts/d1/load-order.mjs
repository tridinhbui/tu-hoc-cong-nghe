#!/usr/bin/env node
// In thứ tự nạp bảng sao cho cha luôn đứng trước con.
//
// Nạp theo thứ tự chữ cái thì 39/71 bảng hỏng vì khoá ngoại - `chat_messages`
// đứng trước `study_rooms`, `user_badges` trước `user_profiles`. Cách chữa dễ
// nhất là tắt kiểm khoá ngoại lúc nạp, và đó là cách sai: nó nạp được cả những
// hàng mồ côi mà sau này không lệnh nào phát hiện. Sắp thứ tự thì việc nạp tự
// nó trở thành phép kiểm toàn vẹn.
import { readFileSync } from "node:fs";

const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));
const deps = {};
for (const [t, d] of Object.entries(snap.tables)) {
  deps[t] = new Set();
  for (const c of d.columns)
    if (c.foreignKey && c.foreignKey.table !== t) deps[t].add(c.foreignKey.table);
}

const order = [], done = new Set(), stack = new Set(), cycles = [];
function visit(t) {
  if (done.has(t)) return;
  if (stack.has(t)) { cycles.push(t); return; }   // vòng lặp: ghi lại, đừng treo
  stack.add(t);
  for (const d of deps[t] ?? []) visit(d);
  stack.delete(t);
  done.add(t); order.push(t);
}
Object.keys(deps).sort().forEach(visit);

if (cycles.length) console.error(`# phụ thuộc vòng, phải nạp tay: ${[...new Set(cycles)].join(", ")}`);
console.log(order.join("\n"));
