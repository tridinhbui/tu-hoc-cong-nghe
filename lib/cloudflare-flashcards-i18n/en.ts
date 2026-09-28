import type { GlossaryTranslation } from "./index";

/**
 * Bản tiếng Anh của 8 thẻ mặc định, khoá theo tên tiếng Việt gốc.
 *
 * Tên gốc đã kèm tiếng Anh trong ngoặc, nên bản tiếng Anh CHÍNH LÀ phần trong
 * ngoặc - "Độ trễ (Latency)" thành "Latency". Dịch lại từ đầu sẽ ra
 * một cách gọi khác với chính chữ người học vừa thấy ở bản tiếng Việt.
 *
 * Hai thẻ vốn đã là tiếng Anh (API, SQL) thì tên
 * giữ nguyên; chỉ định nghĩa được dịch.
 */
export const defaultGlossaryEn: GlossaryTranslation = {
  "Bộ nhớ đệm (Cache)": {
    term: "Cache",
    definition:
      "A place that temporarily keeps a computed or fetched result, so the next request gets it quickly without redoing the work.",
  },
  "Độ trễ (Latency)": {
    term: "Latency",
    definition:
      "The time from sending a request to receiving the first byte of its response.",
  },
  "Thông lượng (Throughput)": {
    term: "Throughput",
    definition:
      "How much work a system gets through per unit of time, such as requests per second.",
  },
  "API (Application Programming Interface)": {
    term: "API (Application Programming Interface)",
    definition:
      "The interface that defines how two programs call each other: what to send, what comes back, and how errors are returned.",
  },
  "SQL (Structured Query Language)": {
    term: "SQL (Structured Query Language)",
    definition:
      "The query language used to read, write and aggregate data in a relational database.",
  },
  "Kiểm thử (Testing)": {
    term: "Testing",
    definition:
      "Running code on known inputs to check that the results are what you expect.",
  },
  "Triển khai (Deployment)": {
    term: "Deployment",
    definition:
      "Putting a new version of the code into the live environment for users to use.",
  },
  "Kiểm soát phiên bản (Version Control)": {
    term: "Version control",
    definition:
      "A system that records the history of every change to the code, so you can roll back and work in parallel (Git, for example).",
  },
};
