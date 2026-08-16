// Phần chữ cuối cùng còn nằm rải trong lib/: thông báo lỗi tải tệp, nhắc học,
// nhãn đèn, ghép thời lượng, chủ đề phòng học, nhãn bài, và hai biểu thuế.
//
// Tám tệp, không tệp nào quá bốn chuỗi - gom một chỗ vì tách ra thành tám
// section thì phần chú thích dài hơn phần nội dung.
//
// MẪU CÓ THAM SỐ dùng `format()`, không dùng template literal: một placeholder
// lạ được để nguyên hình thay vì thành `undefined`, nên lỗi đánh máy lộ ra chứ
// không lặng lẽ.
//
// `streakPush` chứ không phải `streakReminder`: khoá sau đã có chủ trong vi.ts
// (phần chữ của hộp xin quyền thông báo). Hai khoá trùng tên trong cùng một
// spread thì một cái bị nuốt im lặng - `tsc` không thấy, chỉ màn hình thấy.
//
// Hình dạng của `streakPush` khớp ĐÚNG `ReminderStrings` trong
// lib/streak-reminders.ts, kể cả cặp `recallBodyOne`/`recallBodyMany` tách
// riêng: phiên chạy song song đã đổi `buildStreakReminder` để nhận bảng chữ
// nhưng chưa có khoá nào cấp cho nó. Tách một/nhiều là của họ và nó đúng -
// tiếng Anh cần "1 review" chứ không phải "1 reviews".
//
// Thông báo lỗi tải tệp KHÔNG ở đây dù ban đầu định đưa vào: phiên chạy song
// song đã làm xong với một thiết kế khác và tốt hơn - `isAllowedChatImage` trả
// về MÃ (`"imageType"`, `"fileTooLarge"`) thay vì câu, và bốn component tra
// `t.libData.chatUpload[mã]`. Trả mã thì hàm thuần không cần biết ngôn ngữ nào
// cả.
//
// Xem AGENTS.md, mục "Translating the UI".

export const libStringsVi = {
  // Phần thưởng rương. Khoá theo `value` - chính chuỗi tiếng Việt - vì `value`
  // được GHI XUỐNG cột `reward_value` của bảng `user_chests`: dịch nó làm mồ
  // côi danh hiệu người chơi đã mở được. Ở đây nó là khoá, không phải chữ.
  //
  // Lần thứ hai tôi kết luận nhầm rằng bộ này không được vẽ ra. `reward.desc`
  // và `reward.value` đều hiện ở modal mở rương
  // (components/CombinedRewardsWidget.tsx, quanh dòng 472-475).
  // Năm khoá ĐẦU là danh hiệu công nghệ hiện hành; năm khoá sau là danh hiệu
  // tài chính cũ, GIỮ LẠI có chủ ý. `lib/chests.ts` ghi `reward_value` - chính
  // chuỗi tiếng Việt này - vào Supabase, nên mọi danh hiệu đã trao trước lần
  // đổi này còn nằm nguyên trong bảng. Xoá khoá cũ thì hồ sơ của họ hiện ra
  // một chuỗi không tra được, và không có cách nào lấy lại. Chỉ được xoá sau
  // khi có một migration đổi giá trị đã lưu.
  chestTitles: {
    "Chiến thần commit": "Chiến thần commit",
    "Kẻ hủy diệt nợ kỹ thuật": "Kẻ hủy diệt nợ kỹ thuật",
    "Sói già Silicon Valley": "Sói già Silicon Valley",
    "Đại gia thông lượng": "Đại gia thông lượng",
    "Bậc thầy gỡ lỗi": "Bậc thầy gỡ lỗi",
    "Chiến thần tích lũy": "Chiến thần tích lũy",
    "Kẻ hủy diệt nợ nần": "Kẻ hủy diệt nợ nần",
    "Sói già phố Wall": "Sói già phố Wall",
    "Đại gia lãi kép": "Đại gia lãi kép",
    "Bậc thầy định giá": "Bậc thầy định giá",
  } as Record<string, string>,
  chestDescriptions: {
    "Danh hiệu tôn vinh kỷ luật đẩy mã mỗi ngày": "Danh hiệu tôn vinh kỷ luật đẩy mã mỗi ngày",
    "Danh hiệu dành cho người dọn sạch mã cũ": "Danh hiệu dành cho người dọn sạch mã cũ",
    "Danh hiệu của bậc thầy thiết kế hệ thống": "Danh hiệu của bậc thầy thiết kế hệ thống",
    "Danh hiệu dành cho tín đồ tối ưu hiệu năng": "Danh hiệu dành cho tín đồ tối ưu hiệu năng",
    "Danh hiệu của chuyên gia đọc nhật ký hệ thống": "Danh hiệu của chuyên gia đọc nhật ký hệ thống",
    "Danh hiệu tôn vinh kỷ luật tích sản": "Danh hiệu tôn vinh kỷ luật tích sản",
    "Danh hiệu dành cho người làm chủ tài chính": "Danh hiệu dành cho người làm chủ tài chính",
    "Danh hiệu của bậc thầy phân tích thị trường": "Danh hiệu của bậc thầy phân tích thị trường",
    "Danh hiệu dành cho tín đồ dòng tiền dài hạn": "Danh hiệu dành cho tín đồ dòng tiền dài hạn",
    "Danh hiệu của chuyên gia đọc báo cáo tài chính": "Danh hiệu của chuyên gia đọc báo cáo tài chính",
    "Cộng nhẹ +10 XP vào tổng điểm tích lũy": "Cộng nhẹ +10 XP vào tổng điểm tích lũy",
    "Cộng nhẹ +15 XP vào tổng điểm tích lũy": "Cộng nhẹ +15 XP vào tổng điểm tích lũy",
    "Mở khóa Giao diện Hoàng Kim quý tộc": "Mở khóa Giao diện Hoàng Kim quý tộc",
    "Mở khóa Giao diện Ngọc Lục Bảo đặc biệt": "Mở khóa Giao diện Ngọc Lục Bảo đặc biệt",
  } as Record<string, string>,
  // Mười ba vật phẩm RPG. Khoá theo id vật phẩm - vốn nằm trong kho đồ đã lưu
  // của người chơi, nên nó là khoá chứ không phải chữ.
  //
  // Tôi từng kết luận nhầm rằng `.name` không được vẽ ra: hai chỗ đọc
  // `ITEM_DESCRIPTIONS` mà tôi kiểm (FinanceCharacterAvatar, CosmeticStore)
  // chỉ lấy `.icon`. Chỗ thứ ba - cửa hàng trong quận 3D
  // (components/career-district/CivicPanel.tsx) - vẽ thẳng `{item.name}`.
  rpgItems: {
    weapon_valuation_pen: "Bàn Phím Cơ Thần Tốc",
    weapon_lbo_sword: "Kiếm Tái Cấu Trúc Mã",
    weapon_bell: "Chuông Báo Sự Cố",
    armor_risk_shield: "Khiên Kiểm Thử Tự Động",
    armor_savings_vest: "Áo Giáp Sao Lưu",
    acc_glasses: "Kính Soi Nhật Ký Hệ Thống",
    acc_crown: "Vương Miện CTO",
    pet_bull: "Linh vật Cá Heo Deploy",
    pet_bear: "Gấu Trúc Sao Lưu",
    booster_xp_24h: "Thẻ X2 XP Booster (24h)",
    title_vip_diamond: "Huy Hiệu VIP Kim Cương",
    chat_effect_dragon_fire: "Khung Chat Rồng Lửa",
    chat_effect_diamond_glow: "Khung Chat Kim Cương",
  } as Record<string, string>,
  streakPush: {
    streakTitle: "Sắp hết ngày rồi!",
    streakBody: "Học 1 bài để giữ streak {days} ngày của bạn nhé.",
    recallTitle: "Có bài ôn tập đến hạn",
    recallBodyOne: "Bạn có 1 bài ôn tập đến hạn hôm nay.",
    recallBodyMany: "Bạn có {count} bài ôn tập đến hạn hôm nay.",
  },
  lampSizes: ["Đèn đọc", "Đèn bàn", "Đèn phòng"],
  cooldown: {
    minutes: "{n} phút",
    hours: "{n} giờ",
    hoursMinutes: "{h} giờ {m} phút",
  },
  studyRoomTopics: {
    personal: "Nền tảng công nghệ",
    professional: "Công nghệ chuyên sâu",
    cfa: "CFA Level I",
  } as Record<string, string>,
  lessonLabel: {
    /** "Chặng 3 · Bài 12" - phần sau dấu chấm giữa. */
    stageAndNumber: "{stage} · Bài {number}",
    bonusCase: "Case chuyên sâu",
  },
  taxSchedules: {
    pre2026: "7 bậc (trước 2026)",
    from2026: "5 bậc (hiện hành)",
  } as Record<string, string>,
};

export const libStringsEn: typeof libStringsVi = {
  chestTitles: {
    "Chiến thần commit": "God of the Commit Log",
    "Kẻ hủy diệt nợ kỹ thuật": "Technical-Debt Destroyer",
    "Sói già Silicon Valley": "Wolf of Silicon Valley",
    "Đại gia thông lượng": "Throughput Magnate",
    "Bậc thầy gỡ lỗi": "Master of Debugging",
    "Chiến thần tích lũy": "God of Accumulation",
    "Kẻ hủy diệt nợ nần": "Debt Destroyer",
    "Sói già phố Wall": "Wolf of Silicon Valley",
    "Đại gia lãi kép": "Compounding Magnate",
    "Bậc thầy định giá": "Master of Valuation",
  },
  chestDescriptions: {
    "Danh hiệu tôn vinh kỷ luật đẩy mã mỗi ngày": "A title honouring the discipline of shipping every day",
    "Danh hiệu dành cho người dọn sạch mã cũ": "A title for whoever clears out the old code",
    "Danh hiệu của bậc thầy thiết kế hệ thống": "The title of a master system designer",
    "Danh hiệu dành cho tín đồ tối ưu hiệu năng": "A title for the devotee of performance tuning",
    "Danh hiệu của chuyên gia đọc nhật ký hệ thống": "The title of an expert reader of system logs",
    "Danh hiệu tôn vinh kỷ luật tích sản": "A title honouring the discipline of building assets",
    "Danh hiệu dành cho người làm chủ tài chính": "A title for whoever has their finances in hand",
    "Danh hiệu của bậc thầy phân tích thị trường": "The title of a master market analyst",
    "Danh hiệu dành cho tín đồ dòng tiền dài hạn": "A title for the devotee of long-run cash flow",
    "Danh hiệu của chuyên gia đọc báo cáo tài chính": "The title of an expert reader of financial statements",
    "Cộng nhẹ +10 XP vào tổng điểm tích lũy": "A small +10 XP added to your total",
    "Cộng nhẹ +15 XP vào tổng điểm tích lũy": "A small +15 XP added to your total",
    "Mở khóa Giao diện Hoàng Kim quý tộc": "Unlocks the noble Gold theme",
    "Mở khóa Giao diện Ngọc Lục Bảo đặc biệt": "Unlocks the special Emerald theme",
  },
  rpgItems: {
    weapon_valuation_pen: "The Lightning Mechanical Keyboard",
    weapon_lbo_sword: "The Refactoring Blade",
    weapon_bell: "The Incident Bell",
    armor_risk_shield: "The Automated Test Shield",
    armor_savings_vest: "The Backup Vest",
    acc_glasses: "Log Inspector Glasses",
    acc_crown: "The CTO Crown",
    pet_bull: "The Deploy Dolphin",
    pet_bear: "The Backup Panda",
    booster_xp_24h: "2x XP Booster (24h)",
    title_vip_diamond: "Diamond VIP Badge",
    chat_effect_dragon_fire: "Dragon Fire Chat Frame",
    chat_effect_diamond_glow: "Diamond Glow Chat Frame",
  },
  streakPush: {
    streakTitle: "The day is nearly over",
    streakBody: "One lesson keeps your {days}-day streak alive.",
    recallTitle: "You have reviews due",
    recallBodyOne: "You have 1 lesson review due today.",
    recallBodyMany: "You have {count} lesson reviews due today.",
  },
  lampSizes: ["Reading lamp", "Desk lamp", "Room lamp"],
  cooldown: {
    minutes: "{n} min",
    hours: "{n} hr",
    hoursMinutes: "{h} hr {m} min",
  },
  studyRoomTopics: {
    personal: "Tech Foundations",
    professional: "Advanced Technology",
    cfa: "CFA Level I",
  },
  lessonLabel: {
    stageAndNumber: "{stage} · Lesson {number}",
    bonusCase: "Deep-dive case",
  },
  taxSchedules: {
    pre2026: "7 brackets (before 2026)",
    from2026: "5 brackets (current)",
  },
};
