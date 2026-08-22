// `node:sqlite` có từ Node 22 và máy chạy Node 24, nhưng repo ghim @types/node
// ở ^20 nên tsc không biết module này.
//
// Khai ở đây thay vì nâng @types/node: nâng là đổi kiểu cho mọi tệp dùng API
// Node trong repo, quá rộng cho một tệp trợ giúp chỉ chạy trong bộ kiểm. Và
// phải là tệp .d.ts riêng chứ không phải `declare module` bên trong d1-shim.ts -
// khai bổ sung (augmentation) đòi module phải tồn tại sẵn, còn ở đây thì không.
//
// Chỉ khai đúng phần đang dùng. Khai rộng hơn là hứa những thứ chưa ai kiểm.
declare module "node:sqlite" {
  export class DatabaseSync {
    constructor(path: string, options?: { readOnly?: boolean });
    prepare(sql: string): { all(...params: unknown[]): Record<string, unknown>[] };
  }
}
