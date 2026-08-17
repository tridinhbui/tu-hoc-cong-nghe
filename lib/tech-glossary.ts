// Curated Vietnamese -> English technology-term glossary, used to auto-highlight
// terms in lesson body text with an English translation on hover (see
// components/GlossaryTerm.tsx). Lý do có bảng này: người học đọc bài bằng
// tiếng Việt nhưng sẽ gặp thuật ngữ tiếng Anh khi đi làm, nên đặt hai vế cạnh
// nhau ngay trong câu tốt hơn bắt họ tra riêng.
//
// TÊN TỆP VÀ TÊN BIẾN vẫn là `tech-glossary` / `TECH_GLOSSARY` dù nội
// dung đã chuyển sang thuật ngữ công nghệ. Đổi tên đụng sáu tệp gồm cả
// lib/games-i18n và bộ kiểm của nó; để riêng thành một lần đổi tên thuần, chứ
// trộn vào lần thay nội dung này thì diff không còn đọc được là đã thay gì.
//
// Keys are lowercase Vietnamese phrases; matching is case-insensitive and
// only wraps the first occurrence of each term across a lesson (see
// highlightGlossaryTerms), so repeated use of a term in one lesson doesn't
// get noisy.
/* i18n-ignore-start: bảng này CHÍNH LÀ một bản dịch, không phải chuỗi chờ
   dịch. Khoá là cụm tiếng Việt xuất hiện trong bài học, giá trị là thuật ngữ
   tiếng Anh hiện ra khi rê chuột (components/GlossaryTerm.tsx). Dịch khoá sang
   tiếng Anh thì `highlightGlossaryTerms` không còn khớp chữ nào trong bài
   tiếng Việt, và tính năng biến mất - không lỗi, không cảnh báo.

   Cùng bảng này còn làm bể ghép cặp cho game `en-vi-terms`, nơi trò chơi chính
   là ghép hai cột với nhau; dịch cột trái là làm hai cột giống hệt nhau. */
export const TECH_GLOSSARY: Record<string, string> = {
  "mã nguồn": "Source Code",
  "kho mã": "Repository",
  "nhánh": "Branch",
  "hợp nhất nhánh": "Merge",
  "yêu cầu gộp mã": "Pull Request",
  "đánh giá mã": "Code Review",
  "tái cấu trúc mã": "Refactoring",
  "nợ kỹ thuật": "Technical Debt",
  "kiểm thử đơn vị": "Unit Test",
  "kiểm thử tích hợp": "Integration Test",
  "độ phủ kiểm thử": "Test Coverage",
  "tích hợp liên tục": "Continuous Integration (CI)",
  "triển khai liên tục": "Continuous Deployment (CD)",
  "quay lui bản phát hành": "Rollback",
  "biến môi trường": "Environment Variable",
  "cơ sở dữ liệu": "Database",
  "lược đồ dữ liệu": "Schema",
  "chỉ mục": "Index",
  "truy vấn": "Query",
  "giao dịch": "Transaction",
  "khoá chính": "Primary Key",
  "khoá ngoại": "Foreign Key",
  "chuẩn hoá dữ liệu": "Normalization",
  "di trú cơ sở dữ liệu": "Database Migration",
  "bộ nhớ đệm": "Cache",
  "tỷ lệ trúng bộ nhớ đệm": "Cache Hit Rate",
  "hàng đợi thông điệp": "Message Queue",
  "cân bằng tải": "Load Balancing",
  "mở rộng theo chiều ngang": "Horizontal Scaling",
  "mở rộng theo chiều dọc": "Vertical Scaling",
  "kiến trúc vi dịch vụ": "Microservices",
  "khối nguyên": "Monolith",
  "giao diện lập trình ứng dụng": "API",
  "điểm cuối": "Endpoint",
  "giới hạn tần suất": "Rate Limiting",
  "xác thực": "Authentication",
  "phân quyền": "Authorization",
  "mã hoá": "Encryption",
  "băm mật khẩu": "Password Hashing",
  "lỗ hổng bảo mật": "Security Vulnerability",
  "độ trễ": "Latency",
  "thông lượng": "Throughput",
  "thời gian hoạt động": "Uptime",
  "thời gian khôi phục trung bình": "Mean Time To Recovery (MTTR)",
  "tỷ lệ lỗi": "Error Rate",
  "ngân sách lỗi": "Error Budget",
  "giám sát": "Monitoring",
  "khả năng quan sát": "Observability",
  "nhật ký hệ thống": "Logging",
  "truy vết phân tán": "Distributed Tracing",
  "cảnh báo": "Alerting",
  "sự cố": "Incident",
  "điểm hỏng đơn lẻ": "Single Point of Failure",
  "dự phòng": "Redundancy",
  "chịu lỗi": "Fault Tolerance",
  "nhất quán cuối cùng": "Eventual Consistency",
  "bất biến": "Idempotent",
  "tranh chấp dữ liệu": "Race Condition",
  "khoá chết": "Deadlock",
  "đồng thời": "Concurrency",
  "bất đồng bộ": "Asynchronous",
  "độ phức tạp thuật toán": "Big-O Complexity",
  "cấu trúc dữ liệu": "Data Structure",
  "đệ quy": "Recursion",
  "container": "Container",
  "điều phối container": "Container Orchestration",
  "hạ tầng dưới dạng mã": "Infrastructure as Code",
  "máy chủ không trạng thái": "Stateless Server",
  "cờ tính năng": "Feature Flag",
};

const GLOSSARY_ENTRIES = Object.entries(TECH_GLOSSARY).sort(
  (a, b) => b[0].length - a[0].length
);

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface GlossaryMatch {
  start: number;
  end: number;
  term: string;
  en: string;
}

// Finds the first occurrence of each not-yet-seen glossary term in `text`,
// longest term first so e.g. "dòng tiền tự do" wins over "dòng tiền".
// `seen` is mutated so callers can share it across a whole lesson body and
// avoid highlighting the same term twice.
export function findGlossaryMatches(text: string, seen: Set<string>): GlossaryMatch[] {
  const matches: GlossaryMatch[] = [];
  for (const [term, en] of GLOSSARY_ENTRIES) {
    if (seen.has(term)) continue;
    const re = new RegExp(`(?<![\\p{L}\\p{N}])(${escapeRegExp(term)})(?![\\p{L}\\p{N}])`, "iu");
    const m = re.exec(text);
    if (m) {
      matches.push({ start: m.index, end: m.index + m[0].length, term, en });
    }
  }
  matches.sort((a, b) => a.start - b.start);

  // Drop overlaps (can happen since terms are matched independently).
  const filtered: GlossaryMatch[] = [];
  let lastEnd = -1;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }
  filtered.forEach((m) => seen.add(m.term));
  return filtered;
}

/* i18n-ignore-end */
