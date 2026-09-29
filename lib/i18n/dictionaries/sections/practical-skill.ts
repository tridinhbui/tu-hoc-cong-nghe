// Chữ cho đợt revamp BUILD → RUN → DEBUG → LEVEL UP (KE-HOACH-BUILD-RUN-DEBUG.md).
// Bảng "Năng lực thực hành" (components/PracticalSkillPanel.tsx, lib/practical-skill.ts).
export const practicalSkillVi = {
  practicalSkill: {
    title: "Năng lực thực hành",
    subtitle: "Chỉ tăng khi bạn làm được việc - đọc bài không tính.",
    loading: "Đang tính năng lực",
    error: "Chưa tải được năng lực thực hành.",
    retry: "Thử lại",
    evidenceCount: "{count} bằng chứng",
    areas: {
      code: "Lập trình",
      frontend: "Frontend",
      backend: "Backend",
      data: "Data",
      ai: "AI",
      cloud: "Cloud",
      security: "Security",
    },
    sources: {
      exercise: "bài tập code",
      tool: "nhiệm vụ công cụ",
      interview: "câu phỏng vấn",
      cert: "câu chứng chỉ",
      stage_exam: "thi vượt chặng",
    },
    /** Dòng chú thích dưới mỗi thanh: "3 bài tập code · 5 nhiệm vụ công cụ". */
    sourceCount: "{count} {source}",
    howTitle: "Tăng bằng cách nào",
    how: {
      exercise: "Chạy đúng một bài tập code trong bài học",
      tool: "Hoàn thành nhiệm vụ trong công cụ mô phỏng",
      interview: "Trả lời đúng câu phỏng vấn kỹ thuật",
      cert: "Luyện đúng một miền chứng chỉ",
      stage_exam: "Đạt bài thi vượt chặng",
    },
    links: {
      tools: "Mở công cụ",
      interview: "Luyện phỏng vấn",
      certs: "Luyện chứng chỉ",
      stageExam: "Thi vượt chặng",
    },
    capNote: "Mỗi loại bằng chứng có trần riêng trong một lĩnh vực - muốn lên cao phải làm được nhiều kiểu việc, không chỉ trả lời trắc nghiệm.",
    emptyLines: [
      "Thanh nào cũng đang ở 0 - vì tớ chỉ đếm thứ bạn làm được, không đếm thứ bạn đã đọc. Mở một công cụ và làm nhiệm vụ đầu tiên nhé.",
      "Chưa có bằng chứng nào. Chạy đúng một bài tập code hoặc làm xong một nhiệm vụ SQL là thanh bắt đầu nhích.",
      "Đọc bài thì biết, làm được mới tính. Thử trả lời vài câu phỏng vấn kỹ thuật xem thanh nào lên trước.",
    ],
  },
};

export const practicalSkillEn: typeof practicalSkillVi = {
  practicalSkill: {
    title: "Practical skill",
    subtitle: "Only goes up when you get something working - reading lessons does not count.",
    loading: "Calculating skill",
    error: "Could not load practical skill.",
    retry: "Retry",
    evidenceCount: "{count} pieces of evidence",
    areas: {
      code: "Programming",
      frontend: "Frontend",
      backend: "Backend",
      data: "Data",
      ai: "AI",
      cloud: "Cloud",
      security: "Security",
    },
    sources: {
      exercise: "code exercises",
      tool: "tool missions",
      interview: "interview answers",
      cert: "cert answers",
      stage_exam: "stage exams",
    },
    sourceCount: "{count} {source}",
    howTitle: "How it goes up",
    how: {
      exercise: "Get a code exercise in a lesson to print the right output",
      tool: "Complete a mission in a tool simulator",
      interview: "Answer a technical interview question correctly",
      cert: "Answer questions in a certification domain correctly",
      stage_exam: "Pass a stage exam",
    },
    links: {
      tools: "Open tools",
      interview: "Interview drill",
      certs: "Cert practice",
      stageExam: "Stage exam",
    },
    capNote: "Each kind of evidence has its own ceiling within an area - to go high you have to do several kinds of work, not just answer multiple choice.",
    emptyLines: [
      "Every bar is at 0 - I only count what you can do, not what you have read. Open a tool and finish the first mission.",
      "No evidence yet. Get one code exercise to run correctly, or finish one SQL mission, and a bar starts moving.",
      "Reading tells you how; doing is what counts here. Try a few technical interview questions and see which bar moves first.",
    ],
  },
};
