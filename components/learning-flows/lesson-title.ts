/** Tiêu đề bài trong kho mang tiền tố vị trí - "Bài 201: ", "AI trong sản
 *  phẩm, Bài 3: ". Ở lộ trình đánh số thì nó định vị; trong một hành trình
 *  theo nhu cầu thì nó là con số lạ khiến người mới tưởng mình đã bỏ lỡ 200
 *  bài trước đó. */
export function cleanLessonTitle(title: string): string {
  return title.replace(/^[^:]{0,48}\b(Bài|Lesson) \d+:\s*/i, "");
}
