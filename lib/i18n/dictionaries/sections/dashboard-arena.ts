// Thẻ "Thử sức" ở cột phải dashboard, ngay dưới băng chuyền người đang học.
//
// Ba lối vào từng tồn tại rồi biến mất theo ba cách khác nhau: quiz ngẫu nhiên
// chỉ tới được qua thanh điều hướng, còn đánh boss và solo thì modal vẫn được
// dựng trong DashboardClient mà KHÔNG còn nút nào gọi - chúng chết lặng lẽ khi
// thẻ mini-game bị gỡ khỏi dashboard.
//
// Section riêng thay vì thêm vào `dashboard` trong vi.ts: khối đó đang được một
// phiên khác sửa, và hai lần commit gần nhất đã bị cuốn vào nhau vì cùng chạm
// một tệp.
//
// Xem AGENTS.md, mục "Translating the UI".

export const dashboardArenaVi = {
  dashboardArena: {
    title: "Thử sức",
    subtitle: "Ba cách kiểm tra xem mình nhớ được bao nhiêu",
    quizTitle: "Quiz ngẫu nhiên",
    quizSub: "Câu hỏi rút từ những bài bạn đã học",
    bossTitle: "Đánh boss",
    bossSub: "Ba câu, thắng thì được XP và xu",
    soloTitle: "Đấu solo",
    soloSub: "So điểm với người học khác",
  },
};

export const dashboardArenaEn: typeof dashboardArenaVi = {
  dashboardArena: {
    title: "Test yourself",
    subtitle: "Three ways to check what stuck",
    quizTitle: "Random quiz",
    quizSub: "Questions drawn from lessons you've done",
    bossTitle: "Boss battle",
    bossSub: "Three questions, win for XP and coins",
    soloTitle: "Solo duel",
    soloSub: "Compare scores with other learners",
  },
};
