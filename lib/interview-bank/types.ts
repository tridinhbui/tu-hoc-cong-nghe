/**
 * Kho câu hỏi phỏng vấn kỹ thuật cho nghề công nghệ - thay cho kho IB của bản
 * tài chính (lib/ib-question-bank.ts ở repo đó, đã gỡ khỏi repo này ở d092dd4).
 *
 * Câu hỏi KỸ THUẬT có chấm điểm: chúng đi qua /api/knowledge-challenge (track
 * "ib" / "mock-interview"), được ký token, và XP ghi vào user_quiz_sessions.
 * Vì vậy mọi quy tắc viết quiz trong AGENTS.md áp dụng nguyên - đặc biệt mẹo
 * độ dài, được đo bởi scripts/audit-interview-bank.mjs.
 *
 * Câu hỏi HÀNH VI ("kể về một lần bạn...") không có đáp án đúng duy nhất, nên
 * KHÔNG ép thành trắc nghiệm: chúng là thẻ chuẩn bị không chấm điểm, gồm câu
 * hỏi và khung trả lời. Lý do y hệt bản tài chính: bịa ra ba cách "sai" để kể
 * về sự nghiệp của chính người học là làm bài tập không trung thực.
 */

export type InterviewDifficulty = "de" | "trung-binh" | "kho";

export interface InterviewQuestion {
  /** Duy nhất trên toàn kho. Ghi xuống user_ib_question_attempts.question_id,
   *  nên KHÔNG đổi id của câu đã phát hành - đổi là mất lịch sử của người học. */
  id: number;
  /** Id nghề trong TECH_CAREERS. */
  career: string;
  /** Chủ đề trong nghề, hiện thành chip lọc và dùng cho "chủ đề yếu". */
  category: string;
  difficulty: InterviewDifficulty;
  question: string;
  /** Bốn phương án. Viết đáp án đúng ở vị trí `correct`; server xáo lúc phát đề. */
  options: string[];
  correct: number;
  explanation: string;
}

export interface BehavioralCard {
  id: number;
  category: string;
  question: string;
  /** Người phỏng vấn thật sự muốn nghe gì. */
  whatTheyWant: string;
  /** Khung trả lời, từng bước. */
  framework: string[];
  /** Một lỗi hay gặp khi trả lời câu này. */
  pitfall: string;
}

export interface TechCareer {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
}
