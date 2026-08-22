/** Chữ cho khối đầu trang /hoc-bai (components/LearningProgressHeader.tsx).
 *
 *  NGUYÊN TẮC VIẾT, vì đây là chữ của một lớp trò chơi đặt lên nội dung tài
 *  chính nghiêm túc:
 *
 *  1. Nói ĐÚNG thứ tính được. "+10 XP" là con số thật (XP_PER_LESSON), "còn 3
 *     bài nữa" đếm từ tiến độ thật. Không có câu nào hứa một phần thưởng mà hệ
 *     thống không trao.
 *  2. Không giọng game hoá trẻ con. "Nhiệm vụ tiếp theo" chứ không "Nhiệm vụ
 *     của nhà vô địch"; "Mở khoá" chứ không "Chinh phục vinh quang". Người học
 *     ở đây để đọc báo cáo tài chính, không để nghe cổ vũ.
 *  3. Câu mốc phải nói RA cái mở khoá được, không nói chung chung. "Xong Chặng
 *     3 → mở bài kiểm tra chặng" là một lời hứa kiểm chứng được; "học tiếp để
 *     nhận thưởng" thì không.
 */
export const progressHeaderVi = {
  progressHeader: {
    levelLabel: "Cấp {level}",
    xpToNext: "Còn {xp} XP nữa lên {level}",
    maxLevel: "Đã đạt cấp cao nhất",
    nextMission: "Nhiệm vụ tiếp theo",
    cta: "Tiếp tục học ngay",
    reward: "Xong bài này +{xp} XP",
    stageRemaining: "còn {count} bài nữa hết {stage}",
    milestoneLocked: "Học hết {stage} để mở bài kiểm tra chặng",
    milestoneReady: "Đã xong {stage} - bài kiểm tra chặng đã mở",
    allDone: "Bạn đã học hết lộ trình này.",

    // Trạng thái của một chặng. Bốn chữ này thay cho con số trần "1/20": một
    // trạng thái nói được người học ĐANG Ở ĐÂU, con số thì bắt họ tự chia rồi
    // tự kết luận.
    stageDone: "Đã xong",
    stageCurrent: "Đang học",
    stageOpen: "Chưa bắt đầu",
  },
};

export const progressHeaderEn: typeof progressHeaderVi = {
  progressHeader: {
    levelLabel: "Level {level}",
    xpToNext: "{xp} XP to reach {level}",
    maxLevel: "Highest level reached",
    nextMission: "Next mission",
    cta: "Continue learning",
    reward: "Finish this lesson for +{xp} XP",
    stageRemaining: "{count} lessons left in {stage}",
    milestoneLocked: "Finish {stage} to unlock its stage exam",
    milestoneReady: "{stage} complete - the stage exam is open",
    allDone: "You have finished this whole path.",

    stageDone: "Complete",
    stageCurrent: "In progress",
    stageOpen: "Not started",
  },
};
