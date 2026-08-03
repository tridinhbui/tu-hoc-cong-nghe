import { shuffle } from "./market-sim";

// Xáo câu hỏi và xáo cả thứ tự đáp án bên trong mỗi câu.
//
// Phần dễ sai nằm ở chỗ thứ hai: xáo đáp án mà quên dời chỉ số `correct` là
// tạo ra một bài kiểm tra chấm sai mọi câu, và không có gì báo lỗi - người
// học chỉ thấy mình trả lời đúng mà bị tính sai. Nên hàm này trả về `correct`
// đã ánh xạ sang vị trí mới, và có test giữ đúng điều đó.
//
// Nằm ngoài component vì `Math.random()` trong thân component bị React
// Compiler chặn: nó không phân biệt được hàm chỉ chạy từ sự kiện với hàm chạy
// lúc render, mà random lúc render thì server và client dựng ra hai thứ tự
// khác nhau.

export type ShufflableQuestion = { options: string[]; correct: number };

export function shuffleQuestion<Q extends ShufflableQuestion>(question: Q, rand: () => number = Math.random): Q {
  const order = shuffle(
    question.options.map((_, i) => i),
    rand,
  );
  return {
    ...question,
    options: order.map((i) => question.options[i]),
    correct: order.indexOf(question.correct),
  };
}

export function shuffleQuiz<Q extends ShufflableQuestion>(questions: readonly Q[], rand: () => number = Math.random): Q[] {
  return shuffle(
    questions.map((q) => shuffleQuestion(q, rand)),
    rand,
  );
}
