// One sub-object per file finished in this migration batch, all under the
// single top-level key `finalOne`. This file is not wired into
// `sections/index.ts` here - see AGENTS.md "Translating the UI" for why a
// section lives in its own file, and the caller's task notes for who wires
// this one in. Until it is wired, `finalOne` does not exist on `Dictionary`,
// so every reference to it elsewhere in the codebase is an expected,
// individually-confirmed compile error.

export const finalOneVi = {
  finalOne: {
    // components/games/DcfValuationGame.tsx - industry copy for the seven
    // fictional deals in DEAL_SHAPE, keyed by deal id. Company names stay in
    // the module (proper nouns, identical in both languages).
    dcfGame: {
      industries: {
        "tech-titan": "SaaS & AI Software",
        "consumer-staple": "FMCG & Thực phẩm",
        "green-energy": "Năng lượng tái tạo",
        "retail-chain": "Bán lẻ đa kênh",
        "biotech-pharma": "Dược phẩm & Sinh học",
        "fintech-disruptor": "Fintech & Digital Payments",
        "real-estate-reit": "Bất động sản & REIT",
      },
    },
    // app/(app)/tai-lieu/page.tsx
    taiLieuPage: {
      backHome: "Về trang chủ",
      title: "Kho Tài liệu Miễn phí",
      freeBadge: "Miễn phí 100% 🎁",
      subtitle:
        "Mẫu biểu, ebook, checklist và công cụ hỗ trợ hành trình học tài chính của bạn - tải về hoàn toàn miễn phí không giới hạn. Đóng góp tài liệu của riêng bạn để chia sẻ cho cộng đồng nhé!",
      giftTitle: "Món quà tri thức từ cộng đồng",
      giftBody:
        "Tất cả tài liệu, ebook, biểu mẫu Excel và checklist tại đây đều được chia sẻ hoàn toàn miễn phí để phục vụ mục đích học tập cá nhân.",
    },
    // components/DashboardClient.tsx
    dashboardClient: {
      soloLabel: "🧠 Solo",
      xpValue: "{xp} XP",
      // Cấp có thêm cổng CFA (hiện chỉ L9) phải nói ra điều đó ngay trên thẻ:
      // thẻ chỉ ghi ngưỡng XP là lý do người học 5.036 XP tưởng mình đang bị
      // xếp sai cấp.
      levelCfaGate: "+ {count} mô-đun CFA",
      milestoneBonusXp: "+50 XP",
      bonusLabel: "Bonus",
      bossDefeatedToast: "🎉 Hạ gục Boss thành công! Nhận +{xp} XP & 🪙 +{coins} Coins!",
    },
    // components/MidpointInteractive.tsx
    midpointInteractive: {
      stopAndCheck: "Dừng & Kiểm tra",
      midpointBadge: "Điểm giữa bài",
      checkButton: "Kiểm tra",
      correct: "Chính xác!",
      incorrect: "Chưa đúng - xem giải thích",
      continueReading: "Tiếp tục đọc →",
    },
    // app/api/guilds/route.ts - fallback guild names, keyed by id. `tag` stays
    // in the route module (short acronym badge, identical in both languages).
    guildsRoute: {
      fallbackNames: {
        "guild-wallstreet": "Liên Minh Silicon Valley",
        "guild-tichsan": "Hội Đầu Tư Tích Sản",
        "guild-pe": "Private Equity Syndicate",
      },
    },
    // components/home/HomePage.tsx - short labels in the hero preview cards.
    // All under 16 chars, so identical-value parity is expected, not a
    // copy-paste mistake (see lib/__tests__/dictionary-parity.test.ts).
    homePage: {
      bigOBadge: "Big-O",
      stepsLabel: "Số bước",
      quizLabel: "Quiz",
      flashcardLabel: "Flashcard",
    },
  },
};

export const finalOneEn: typeof finalOneVi = {
  finalOne: {
    dcfGame: {
      industries: {
        "tech-titan": "SaaS & AI Software",
        "consumer-staple": "FMCG & Food",
        "green-energy": "Renewable Energy",
        "retail-chain": "Multi-channel Retail",
        "biotech-pharma": "Pharma & Biotech",
        "fintech-disruptor": "Fintech & Digital Payments",
        "real-estate-reit": "Real Estate & REIT",
      },
    },
    taiLieuPage: {
      backHome: "Back to dashboard",
      title: "Free Document Library",
      freeBadge: "100% Free 🎁",
      subtitle:
        "Templates, ebooks, checklists and tools to support your finance learning journey - download for free with no limits. Contribute your own documents to share with the community!",
      giftTitle: "A gift of knowledge from the community",
      giftBody:
        "All documents, ebooks, Excel templates and checklists here are shared completely free for personal learning purposes.",
    },
    dashboardClient: {
      soloLabel: "🧠 Solo",
      xpValue: "{xp} XP",
      levelCfaGate: "+ {count} CFA modules",
      milestoneBonusXp: "+50 XP",
      bonusLabel: "Bonus",
      bossDefeatedToast: "🎉 Boss defeated! Earned +{xp} XP & 🪙 +{coins} Coins!",
    },
    midpointInteractive: {
      stopAndCheck: "Stop & Check",
      midpointBadge: "Midpoint check",
      checkButton: "Check",
      correct: "Correct!",
      incorrect: "Not quite - see the explanation",
      continueReading: "Continue reading →",
    },
    guildsRoute: {
      fallbackNames: {
        "guild-wallstreet": "Silicon Valley Alliance",
        "guild-tichsan": "FIRE Investors Guild",
        "guild-pe": "Private Equity Syndicate",
      },
    },
    homePage: {
      bigOBadge: "Big-O",
      stepsLabel: "Steps",
      quizLabel: "Quiz",
      flashcardLabel: "Flashcard",
    },
  },
};
