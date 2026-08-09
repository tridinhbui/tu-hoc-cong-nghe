-- Neo mỗi hàng câu sai vào NỘI DUNG câu hỏi, không chỉ vào vị trí của nó.
--
-- quiz_mistakes khoá theo (user_id, lesson_id, question_index). Chỉ số đó ổn
-- định đúng chừng nào mảng quiz của bài không đổi - mà nó có đổi: chèn một câu,
-- xoá một câu, hoặc đảo thứ tự trong lib/lessons.ts là mọi hàng cũ của bài đó
-- trỏ sang một câu khác. Người học mở /on-tap-cau-sai và thấy một câu họ chưa
-- từng làm sai, kèm dòng "bạn đã sai 3 lần".
--
-- Lỗi này im lặng tuyệt đối: không có ngoại lệ, không có log, và cách duy nhất
-- để phát hiện là nhớ được mình đã sai câu nào. Nó cũng chắc chắn đã xảy ra -
-- 22 câu hỏi vừa được viết lại trong đợt dọn câu trùng, và mỗi câu viết lại là
-- một hàng cũ giờ trỏ vào nội dung khác.
--
-- Cách chữa rẻ nhất là lưu thêm một dấu vân tay của nội dung câu hỏi lúc GHI,
-- rồi lúc ĐỌC thì đối chiếu: lệch thì bỏ qua hàng đó, đúng như cách một câu bị
-- xoá hẳn đang được bỏ qua. Không sửa khoá chính, không phải chuyển dữ liệu.
--
-- Cột để NULL được, và hàng cũ sẽ mang NULL vĩnh viễn: dấu vân tay của nội dung
-- tại thời điểm người học trả lời sai không tồn tại ở đâu để tính lại. Đường
-- đọc vì thế phải coi NULL là "không biết, cứ hiển thị" - giữ nguyên hành vi cũ
-- cho dữ liệu cũ, và chặt chẽ dần theo các câu trả lời mới.

alter table public.quiz_mistakes
  add column if not exists question_hash text;

comment on column public.quiz_mistakes.question_hash is
  'Dấu vân tay nội dung câu hỏi lúc ghi (FNV-1a base36, xem lib/stable-hash.ts). NULL với hàng ghi trước 20260902.';

-- Phải DROP rồi CREATE chứ không CREATE OR REPLACE: thêm một tham số là tạo ra
-- một hàm khác chứ không thay hàm cũ, và khi đó lời gọi ba tham số khớp cả hai
-- -> Postgres báo "function is not unique" và MỌI lần ghi câu sai đều hỏng.
--
-- Tham số mới có giá trị mặc định để client bản cũ (đang mở trong tab của người
-- học lúc deploy) vẫn gọi được bằng ba tham số.
drop function if exists public.record_quiz_mistake(bigint, int, boolean);

create or replace function public.record_quiz_mistake(
  p_lesson_id bigint,
  p_question_index int,
  p_correct boolean,
  p_question_hash text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_correct then
    update public.quiz_mistakes
    set resolved = true, last_attempt_at = now()
    where user_id = auth.uid() and lesson_id = p_lesson_id and question_index = p_question_index;
  else
    insert into public.quiz_mistakes (user_id, lesson_id, question_index, wrong_count, resolved, first_wrong_at, last_attempt_at, question_hash)
    values (auth.uid(), p_lesson_id, p_question_index, 1, false, now(), now(), p_question_hash)
    on conflict (user_id, lesson_id, question_index)
    do update set
      wrong_count = quiz_mistakes.wrong_count + 1,
      resolved = false,
      last_attempt_at = now(),
      -- Ghi đè dấu vân tay: lần trả lời mới nhất mới là lần khớp với nội dung
      -- hiện tại. Giữ COALESCE theo chiều ngược lại thì một hàng cũ sẽ mãi mãi
      -- mang dấu vân tay của phiên bản câu hỏi đã bị thay.
      question_hash = coalesce(excluded.question_hash, quiz_mistakes.question_hash);
  end if;
end;
$$;

revoke all on function public.record_quiz_mistake(bigint, int, boolean, text) from public, anon;
grant execute on function public.record_quiz_mistake(bigint, int, boolean, text) to authenticated;
