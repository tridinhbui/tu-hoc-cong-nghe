// Phần chữ của màn hình chọn game: 9 mini game ghép/kéo-thả, 3 game đặc biệt,
// 3 mức độ khó, và tên ba báo cáo dùng làm nhãn ô trong game "Báo cáo tài chính".
//
// Khoá theo `id` của game - cũng là khoá được ghi xuống Supabase trong bảng
// điểm, nên nó ổn định.
//
// PHẠM VI, và đây là chỗ dễ tưởng nhầm đã xong: NỘI DUNG trong từng ván chưa
// dịch. `STATEMENT_ITEMS` (47 khoản mục kiểu "Tiền mặt & Tương đương tiền"),
// `GAME_RELATED_LESSONS` và các bộ thẻ khác trong lib/games.ts vẫn là tiếng
// Việt - người đọc tiếng Anh chọn được game và hiểu luật chơi, rồi gặp thẻ bài
// tiếng Việt. Vì thế lib/games.ts KHÔNG được đánh `i18n-ignore`: 176 chuỗi còn
// lại ở đó phải tiếp tục bị đếm.
//
// `GAME_RELATED_LESSONS` là trường hợp riêng và không nên dịch tại đây: `title`
// của chúng chép lại tiêu đề bài học ("Day 4: Dòng tiền là gì?"), vốn đã có
// đường dịch riêng trong lib/lessons-i18n/. Chép sang từ điển là tạo nguồn thứ
// hai cho cùng một chuỗi, và hai nguồn đó sẽ lệch nhau. Cách sửa đúng là đọc
// tiêu đề từ bài học theo `slug`, không phải dịch lại - việc đó thay đổi hình
// dạng dữ liệu nên để riêng.
//
// Xem AGENTS.md, mục "Translating the UI".

export const gamesMetaVi = {
  gameDifficulties: {
    de: { label: "Dễ", hint: "Ít thẻ hơn, không giới hạn thời gian" },
    "trung-binh": { label: "Trung bình", hint: "Số thẻ mặc định, không giới hạn thời gian" },
    kho: { label: "Khó", hint: "Nhiều thẻ hơn + giới hạn 60 giây" },
  } as Record<string, { label: string; hint: string }>,
  statementBuckets: {
    frontend: "Tầng giao diện (client)",
    backend: "Tầng dịch vụ (server)",
    data: "Tầng dữ liệu & hạ tầng",
  } as Record<string, string>,
  gameMeta: {
    "random-mix": {
      title: "🎲 Trộn ngẫu nhiên tất cả chủ đề",
      description:
        "Thách thức tổng hợp: Trộn ngẫu nhiên kiến thức từ Tầng hệ thống, Thuật ngữ, Chỉ số, Công thức và Rủi ro!",
    },
    "financial-statement-match": {
      title: "Tầng của hệ thống",
      description:
        "Kéo từng thành phần vào đúng tầng (Giao diện / Dịch vụ / Dữ liệu & hạ tầng).",
    },
    "en-vi-terms": {
      title: "Thuật ngữ Anh - Việt",
      description:
        "Ghép đúng cặp thuật ngữ công nghệ English ↔ Tiếng Việt, lấy từ chính các bài bạn đã học.",
    },
    "ratio-category": {
      title: "Phân loại chỉ số hệ thống",
      description: "Kéo từng chỉ số vào đúng nhóm: Độ trễ / Thông lượng / Độ tin cậy / Chi phí.",
    },
    "term-definition": {
      title: "Thuật ngữ & Định nghĩa",
      description: "Ghép mỗi thuật ngữ công nghệ với định nghĩa ngắn gọn đúng của nó.",
    },
    "formula-match": {
      title: "Tên & Công thức",
      description: "Ghép tên chỉ số với đúng công thức tính của nó (uptime, tỷ lệ lỗi, MTTR...).",
    },
    "risk-category": {
      title: "Phân loại rủi ro thay đổi",
      description: "Kéo từng thay đổi mã vào đúng mức rủi ro: Thấp / Trung bình / Cao.",
    },
    "ticker-match": {
      title: "Công ty & Công nghệ",
      description: "Ghép tên công ty với đúng công nghệ do họ tạo ra.",
    },
    "cost-category": {
      title: "Phân loại chi phí",
      description: "Kéo từng khoản chi phí hạ tầng vào đúng nhóm: Cố định (Fixed) hay Biến đổi (Variable).",
    },
  } as Record<string, { title: string; description: string }>,
};

export const gamesMetaEn: typeof gamesMetaVi = {
  gameDifficulties: {
    de: { label: "Easy", hint: "Fewer cards, no time limit" },
    "trung-binh": { label: "Medium", hint: "Default number of cards, no time limit" },
    kho: { label: "Hard", hint: "More cards, plus a 60-second limit" },
  },
  statementBuckets: {
    frontend: "Client tier",
    backend: "Service tier",
    data: "Data & infrastructure tier",
  },
  gameMeta: {
    "random-mix": {
      title: "🎲 Everything, shuffled",
      description:
        "The all-in challenge: system tiers, terminology, metrics, formulas and risk, drawn at random.",
    },
    "financial-statement-match": {
      title: "Financial statements",
      description:
        "Drag each component onto the tier it belongs to (Client / Service / Data & infrastructure).",
    },
    "en-vi-terms": {
      title: "English - Vietnamese terms",
      description:
        "Match each technology term to its Vietnamese counterpart, taken from the lessons you have studied.",
    },
    "ratio-category": {
      title: "Sorting system metrics",
      description: "Drag each metric into the right family: Latency / Throughput / Reliability / Cost.",
    },
    "term-definition": {
      title: "Terms & definitions",
      description: "Match each technology term with the short definition that actually fits it.",
    },
    "formula-match": {
      title: "Names & formulas",
      description: "Match each metric's name to the formula that computes it (uptime, error rate, MTTR...).",
    },
    "risk-category": {
      title: "Sorting change risk",
      description: "Drag each code change into the right risk band: Low / Medium / High.",
    },
    "ticker-match": {
      title: "Companies & technologies",
      description: "Match each company to the technology it created.",
    },
    "cost-category": {
      title: "Sorting costs",
      description: "Drag each infrastructure cost into the right group: Fixed or Variable.",
    },
  },
};
