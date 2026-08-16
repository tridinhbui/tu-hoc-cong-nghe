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
      description: "Kéo từng tỷ số vào đúng nhóm: Thanh khoản / Sinh lời / Đòn bẩy / Hiệu quả hoạt động.",
    },
    "term-definition": {
      title: "Thuật ngữ & Định nghĩa",
      description: "Ghép mỗi thuật ngữ công nghệ với định nghĩa ngắn gọn đúng của nó.",
    },
    "formula-match": {
      title: "Tên & Công thức",
      description: "Ghép tên chỉ số với đúng công thức tính của nó (ROE, P/E, Current Ratio...).",
    },
    "risk-category": {
      title: "Phân loại rủi ro thay đổi",
      description: "Kéo từng loại tài sản vào đúng nhóm rủi ro: Thấp / Trung bình / Cao.",
    },
    "ticker-match": {
      title: "Mã chứng khoán",
      description: "Ghép tên công ty công nghệ với đúng công nghệ họ tạo ra.",
    },
    "cost-category": {
      title: "Phân loại chi phí",
      description: "Kéo từng khoản chi phí vào đúng nhóm: Cố định (Fixed) hay Biến đổi (Variable).",
    },
    "wall-street-millionaire": {
      title: "Ai Là Triệu Phú Silicon Valley",
      description: "15 câu hỏi tài chính cấp độ cao kết hợp với cơ chế trợ giúp kiểu game show.",
    },
    "dcf-mastermind": {
      title: "Đấu Trường Định Giá DCF & M&A",
      description:
        "Phân tích 5 thương vụ M&A, xác định giá trị nội tại (Target Price) và phán quyết mua/né.",
    },
    "snowball-racer": {
      title: "Đua Xe Lãi Kép & Hòn Tuyết Lăn",
      description:
        "Lựa chọn chiến lược đầu tư qua 20 năm để đạt mục tiêu $1,000,000 thông qua sức mạnh lãi kép.",
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
        "Match each finance term to its Vietnamese counterpart, taken from the lessons you have studied.",
    },
    "ratio-category": {
      title: "Sorting financial ratios",
      description: "Drag each ratio into the right family: Liquidity / Profitability / Leverage / Efficiency.",
    },
    "term-definition": {
      title: "Terms & definitions",
      description: "Match each finance term with the short definition that actually fits it.",
    },
    "formula-match": {
      title: "Names & formulas",
      description: "Match each ratio's name to the formula that computes it (ROE, P/E, Current Ratio...).",
    },
    "risk-category": {
      title: "Sorting investment risk",
      description: "Drag each asset type into the right risk band: Low / Medium / High.",
    },
    "ticker-match": {
      title: "Ticker symbols",
      description: "Match each listed company to its ticker on the exchange.",
    },
    "cost-category": {
      title: "Sorting costs",
      description: "Drag each cost into the right group: Fixed or Variable.",
    },
    "wall-street-millionaire": {
      title: "Who Wants to Be a Silicon Valley Millionaire",
      description: "Fifteen advanced finance questions, with game-show lifelines to help you through.",
    },
    "dcf-mastermind": {
      title: "The DCF & M&A Valuation Arena",
      description:
        "Work through five M&A deals, put a target price on each, and call it: buy or walk away.",
    },
    "snowball-racer": {
      title: "The Compounding Snowball Race",
      description:
        "Pick an investment strategy and run it across 20 years, chasing $1,000,000 on the strength of compounding alone.",
    },
  },
};
