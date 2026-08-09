export const miscUiVi = {
  miscUi: {
    defaultLearner: "Người học",
    announcementBanner: {
      closeLabel: "Đóng thông báo",
    },
    // "+{count} XP" trong cả hai ngôn ngữ - XP là từ mượn dùng nguyên.
    xpGain: "+{count} XP",
    // Chữ vẽ lên canvas trong phòng 3D. components/lobby/room-textures.ts là
    // module thuần, không gọi useI18n() được, nên nó nhận chữ qua tham số và
    // ba caller lấy từ đây. Không rule nào coi ctx.fillText là vị trí hiển thị
    // cho tới khi thêm rule canvas.
    canvasBoard: {
      empty: "Chưa có gì ở đây",
    },
    pomodoroCanvas: {
      done: "Xong phiên",
      studying: "{count} người đang học",
    },
    bookmarkButton: {
      remove: "Bỏ đánh dấu",
      add: "Đánh dấu bài học",
    },
    themeToggle: {
      toLight: "Chuyển sang chế độ sáng",
      toDark: "Chuyển sang chế độ tối",
    },
    scrollytelling: {
      goToTab: "Chuyển tới Tab {index}",
    },
    combinedRewardsWidget: {
      xpUnit: "XP",
    },
    dailyMotivationWidget: {
      openQuietCorner: "Mở góc yên tĩnh ›",
    },
    emojiPicker: {
      selectEmoji: "Chọn emoji",
    },
    financialRpgWorldMap: {
      levelLocked: "🔒 Công trình này yêu cầu Level {level}! Hãy hoàn thành thêm bài học để mở khóa.",
      regionDiscovered: "🕵️ ĐÃ GIẢI MÃ VÙNG ĐẤT BÍ ẨN! Thưởng thám hiểm +5 Coins!",
      underConstruction: '🏗️ Vùng đất "{name}" đang trong quá trình mở rộng & thi công! Yêu cầu Level {level} để khám phá.',
    },
    followButton: {
      follow: "Theo dõi",
      following: "Đang theo dõi",
      genericError: "Không thực hiện được. Vui lòng thử lại.",
    },
    formulaBreakdown: {
      formula: "Công thức",
      howThisIsCalculated: "Cách tính con số này",
      substitution: "Thay số",
    },
    jobSearchClient: {
      goalSetSuccess: "🎯 Đã đặt làm Mục tiêu Sự nghiệp mới!",
      quizRewardSuccess: "Chúc mừng! Bạn đã nhận được +{xp} XP cho Trắc nghiệm Hướng nghiệp! 🧭",
    },
    joystick: {
      ariaLabel: "Cần điều khiển: kéo để đi",
      dragToMove: "kéo để đi",
    },
    lessonHighlightsList: {
      deleteFailedError: "Không thể xoá. Vui lòng thử lại.",
      deleteHighlight: "Xoá đánh dấu",
      title: "Đoạn bạn đã đánh dấu trong bài này",
    },
    lessonPageLayout: {
      cardDropped: "📇 Rơi thẻ mới: {ticker} - {name}!",
      lessonCompletedLabel: "Hoàn thành bài học!",
      streakFreezeUsed: "🧊 Bạn đã lỡ mất 1 ngày, nhưng chuỗi {streak} ngày vẫn được giữ nguyên nhờ lượt bảo vệ chuỗi (còn {remaining} lượt).",
    },
    lessonRoomCard: {
      fallbackDistrictLabel: "Phố nghề",
      openRoom: "Mở phòng →",
      viewIn3d: "Đi xem trong không gian 3D · {label}",
    },
    lessonTableOfContents: {
      title: "Mục lục",
    },
    lessonVideoPlayer: {
      watchLessonVideo: "Xem video bài học",
    },
    messageUserButton: {
      acceptAndMessage: "Chấp nhận & nhắn tin",
      acceptedInviteToast: "Đã chấp nhận lời mời - vào chat ngay",
      becameFriendsToast: "Đã trở thành bạn bè - vào chat ngay",
      friendToMessage: "Kết bạn để nhắn tin",
      message: "Nhắn tin",
      requestSent: "Đã gửi lời mời",
      requestSentToast: "Đã gửi lời mời kết bạn, nhắn tin được ngay khi họ chấp nhận",
      startFailedError: "Không thể bắt đầu nhắn tin",
    },
    onlineUsersWidget: {
      communityLibrary: "Thư viện cộng đồng",
      emptyLobby: "Chưa có ai trong sảnh — vào trước đi →",
      peopleInLobby: "{count} người đang ở trong sảnh →",
    },
    quickShopModal: {
      closeShop: "Đóng cửa hàng",
    },
    quietForestScene: {
      dragHint: "Kéo để nhìn nghiêng · lướt nhanh ngang để thổi vào lửa",
      turnOffRain: "Tắt tiếng mưa",
      turnOnRain: "Bật tiếng mưa",
    },
    roomFixtures: {
      communityBoard: "Bảng tin cộng đồng",
      weeklyLeaderboard: "Bảng vàng tuần này",
    },
    scrollytellingPinnedSection: {
      exploreProduct: "Khám phá sản phẩm",
      stepLabel: "Bước {step}",
    },
    shareCompletionButton: {
      shareButton: "Chia sẻ lên Facebook",
      shareTitle: 'Chia sẻ "{title}" lên Facebook',
    },
    spotlightTour: {
      done: "Xong",
      next: "Tiếp →",
      skip: "Bỏ qua",
    },
    stageTipsBanner: {
      auto: "Tự động",
      autoTipSuffix: "· mẹo tự động cho bài này",
    },
    userStats: {
      xpUnit: "XP",
    },
    wisdomCardFlip: {
      flipAriaLabel: "Chạm để lật {label}",
      tones: {
        celebrate: {
          label: "Thẻ ghi nhận",
          prompt: "Chạm để nhận lời chúc mừng",
        },
        encourage: {
          label: "Thẻ tiếp sức",
          prompt: "Chạm để xem một lời nhắn",
        },
        steady: {
          label: "Thẻ kinh nghiệm tài chính",
          prompt: "Chạm để xem một câu kinh nghiệm tài chính",
        },
      },
      visitQuietCorner: "Ghé góc yên tĩnh một phút ›",
    },
    worldBossRaidWidget: {
      comboDamage: "💥 Nổ sát thương Combo: +{damage} DMG!",
      hitDamage: "💥 -{damage} DMG!",
      missCounterattack: "⚠️ MISS! BOSS PHẢN CÔNG",
      raidSummary: "🎉 Tổng sát thương trận này: {damage} DMG! +{xp} XP & +{coins} Coins",
      submitFailedError: "Không ghi được sát thương lên máy chủ.",
    },
    xpFloatingPopup: {
      defaultLabel: "Tích lũy điểm kinh nghiệm",
      xpUnit: "XP",
    },
  },
};

export const miscUiEn: typeof miscUiVi = {
  miscUi: {
    defaultLearner: "Learner",
    announcementBanner: {
      closeLabel: "Close notification",
    },
    // "+{count} XP" trong cả hai ngôn ngữ - XP là từ mượn dùng nguyên.
    xpGain: "+{count} XP",
    canvasBoard: {
      empty: "Nothing here yet",
    },
    pomodoroCanvas: {
      done: "Session over",
      studying: "{count} studying",
    },
    bookmarkButton: {
      remove: "Remove bookmark",
      add: "Bookmark this lesson",
    },
    themeToggle: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
    },
    scrollytelling: {
      goToTab: "Go to tab {index}",
    },
    combinedRewardsWidget: {
      xpUnit: "XP",
    },
    dailyMotivationWidget: {
      openQuietCorner: "Open the quiet corner ›",
    },
    emojiPicker: {
      selectEmoji: "Choose emoji",
    },
    financialRpgWorldMap: {
      levelLocked: "🔒 This building requires Level {level}! Finish more lessons to unlock it.",
      regionDiscovered: "🕵️ MYSTERY REGION UNCOVERED! Exploration bonus +5 Coins!",
      underConstruction: '🏗️ "{name}" is still under expansion & construction! Requires Level {level} to explore.',
    },
    followButton: {
      follow: "Follow",
      following: "Following",
      genericError: "Couldn't complete that. Please try again.",
    },
    formulaBreakdown: {
      formula: "Formula",
      howThisIsCalculated: "How this number is calculated",
      substitution: "Substituting the numbers",
    },
    jobSearchClient: {
      goalSetSuccess: "🎯 New career goal set!",
      quizRewardSuccess: "Congrats! You earned +{xp} XP for the Career Quiz! 🧭",
    },
    joystick: {
      ariaLabel: "Joystick: drag to move",
      dragToMove: "drag to move",
    },
    lessonHighlightsList: {
      deleteFailedError: "Couldn't delete. Please try again.",
      deleteHighlight: "Delete highlight",
      title: "Passages you've highlighted in this lesson",
    },
    lessonPageLayout: {
      cardDropped: "📇 New card dropped: {ticker} - {name}!",
      lessonCompletedLabel: "Lesson completed!",
      streakFreezeUsed: "🧊 You missed a day, but your {streak}-day streak was saved by a streak freeze ({remaining} left).",
    },
    lessonRoomCard: {
      fallbackDistrictLabel: "Phố nghề",
      openRoom: "Open room →",
      viewIn3d: "See it in 3D · {label}",
    },
    lessonTableOfContents: {
      title: "Contents",
    },
    lessonVideoPlayer: {
      watchLessonVideo: "Watch lesson video",
    },
    messageUserButton: {
      acceptAndMessage: "Accept & message",
      acceptedInviteToast: "Invite accepted - jumping to chat",
      becameFriendsToast: "You're now friends - jumping to chat",
      friendToMessage: "Add friend to message",
      message: "Message",
      requestSent: "Request sent",
      requestSentToast: "Friend request sent - you can message as soon as they accept",
      startFailedError: "Couldn't start messaging",
    },
    onlineUsersWidget: {
      communityLibrary: "Community library",
      emptyLobby: "Nobody in the lobby yet — be the first →",
      peopleInLobby: "{count} people in the lobby →",
    },
    quickShopModal: {
      closeShop: "Close shop",
    },
    quietForestScene: {
      dragHint: "Drag to look around · swipe sideways to blow the flame",
      turnOffRain: "Turn off rain sound",
      turnOnRain: "Turn on rain sound",
    },
    roomFixtures: {
      communityBoard: "Community board",
      weeklyLeaderboard: "This week's leaderboard",
    },
    scrollytellingPinnedSection: {
      exploreProduct: "Explore the product",
      stepLabel: "Step {step}",
    },
    shareCompletionButton: {
      shareButton: "Share on Facebook",
      shareTitle: 'Share "{title}" on Facebook',
    },
    spotlightTour: {
      done: "Done",
      next: "Next →",
      skip: "Skip",
    },
    stageTipsBanner: {
      auto: "Auto",
      autoTipSuffix: "· automatic tips for this lesson",
    },
    userStats: {
      xpUnit: "XP",
    },
    wisdomCardFlip: {
      flipAriaLabel: "Tap to flip {label}",
      tones: {
        celebrate: {
          label: "Recognition card",
          prompt: "Tap for a congratulations",
        },
        encourage: {
          label: "Encouragement card",
          prompt: "Tap to see a message",
        },
        steady: {
          label: "Finance wisdom card",
          prompt: "Tap to see a finance insight",
        },
      },
      visitQuietCorner: "Visit the quiet corner for a minute ›",
    },
    worldBossRaidWidget: {
      comboDamage: "💥 Combo damage: +{damage} DMG!",
      hitDamage: "💥 -{damage} DMG!",
      missCounterattack: "⚠️ MISS! BOSS COUNTERATTACKS",
      raidSummary: "🎉 Total damage this raid: {damage} DMG! +{xp} XP & +{coins} Coins",
      submitFailedError: "Couldn't record damage on the server.",
    },
    xpFloatingPopup: {
      defaultLabel: "Experience gained",
      xpUnit: "XP",
    },
  },
};
