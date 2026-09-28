import type { BehavioralCard, InterviewQuestion } from "./types";
import { TECH_CAREERS } from "./careers";
import { FRONTEND_QUESTIONS } from "./frontend";
import { BACKEND_QUESTIONS } from "./backend";
import { DATA_QUESTIONS } from "./data";
import { DEVOPS_QUESTIONS } from "./devops";
import { AI_ENGINEER_QUESTIONS } from "./ai-engineer";
import { QA_QUESTIONS } from "./qa";
import { MOBILE_QUESTIONS } from "./mobile";
import { BEHAVIORAL_CARDS } from "./behavioral";

export type { BehavioralCard, InterviewQuestion, InterviewDifficulty, TechCareer } from "./types";
export { TECH_CAREERS };

/** Mọi câu kỹ thuật có chấm điểm, theo thứ tự nghề trong TECH_CAREERS. */
export const TECH_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  ...FRONTEND_QUESTIONS,
  ...BACKEND_QUESTIONS,
  ...DATA_QUESTIONS,
  ...DEVOPS_QUESTIONS,
  ...AI_ENGINEER_QUESTIONS,
  ...QA_QUESTIONS,
  ...MOBILE_QUESTIONS,
];

export const TECH_BEHAVIORAL_CARDS: BehavioralCard[] = BEHAVIORAL_CARDS;

export function getTechnicalQuestionsForCareer(careerId: string): InterviewQuestion[] {
  return TECH_INTERVIEW_QUESTIONS.filter((q) => q.career === careerId);
}

export function bankCoversCareer(careerId: string): boolean {
  return TECH_INTERVIEW_QUESTIONS.some((q) => q.career === careerId);
}

/** Nghề có ít nhất một câu - chỉ những nghề này hiện trong bộ chọn vai trò. */
export function getCareersCoveredByBank() {
  return TECH_CAREERS.filter((c) => bankCoversCareer(c.id));
}

export function getInterviewQuestionById(id: number): InterviewQuestion | undefined {
  return TECH_INTERVIEW_QUESTIONS.find((q) => q.id === id);
}

/** Nhãn hiển thị của một chủ đề. Chủ đề trong kho công nghệ đã viết sẵn ở
 *  dạng hiển thị; hàm này giữ đúng chữ ký của bản tài chính (nơi có nhãn mang
 *  dấu ngoặc kép cần gỡ) để các màn chép sang dùng được nguyên. */
export function formatCategoryLabel(category: string): string {
  return category.replace(/["“”]/g, "").trim();
}
