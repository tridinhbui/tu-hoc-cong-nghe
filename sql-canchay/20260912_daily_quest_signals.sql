-- Hai tín hiệu cho ba nhiệm vụ hàng ngày mới (daily_street, daily_room_quiz).
--
-- Cả hai đều CỘNG THÊM, không sửa và không xoá gì đang có. Chạy lại được nhiều
-- lần. Không đụng tới bảng nào mà nhiệm vụ cũ đang đọc.
--
-- lock_timeout: cả hai lệnh dưới đây đều cần AccessExclusiveLock trên bảng
-- trong khi app đang đọc bảng đó. Có timeout thì lệnh bỏ cuộc thay vì nằm chờ
-- và khép thành vòng deadlock. Báo "canceling statement due to lock timeout"
-- thì chỉ cần chạy lại.
set lock_timeout = '5s';

-- 1. NƠI làm bài, để tách thử thách cột trụ ở Phố Nghề khỏi thử thách kiến
--    thức làm ở nhà.
--
-- PillarQuiz gửi track='personal', difficulty='tat-ca' - hệt một lượt
-- /kiem-tra bình thường - nên nếu không có cột này thì nhiệm vụ "xuống Phố
-- Nghề" hoàn thành được mà không cần ra phố.
--
-- Nullable, không default: mọi dòng đã có từ trước là null, đúng nghĩa "không
-- biết làm ở đâu", chứ không phải bị gán nhầm vào một nơi cụ thể. Cột nullable
-- không default nên đây là thay đổi catalog, không viết lại bảng.
--
-- Không đặt CHECK constraint: danh sách giá trị hợp lệ nằm ở VALID_SOURCES
-- trong app/api/knowledge-challenge/submit/route.ts, và route đó là đường ghi
-- DUY NHẤT (quyền insert của `authenticated` đã bị thu hồi ở
-- 20260714_harden_quiz_writes.sql). Thêm một danh sách thứ hai trong SQL nghĩa
-- là mỗi lần thêm một nơi làm bài phải nhớ sửa hai chỗ, và quên thì lỗi hiện ra
-- dưới dạng insert hỏng giữa lúc người học đang làm bài.
alter table public.user_quiz_sessions
  add column if not exists source text;

-- 2. Cho người học đọc chính lượt quiz nhóm của mình, kể cả khi đã rời phòng.
--
-- Policy đang có ("Members can read study room quiz attempts", đặt ở
-- 20260729_study_group_missions_v1.sql) đòi còn là thành viên phòng
-- (m.left_at is null). Nhiệm vụ daily_room_quiz đọc bảng này từ trình duyệt để
-- đếm, nên với policy đó, một người làm quiz xong rồi rời phòng sẽ thấy nhiệm
-- vụ TỤT NGƯỢC từ 1/1 về 0/1 - việc đã làm thật mà biến mất, không lý do nào
-- hiện ra.
--
-- Policy mới nằm CẠNH policy cũ chứ không thay thế: nhiều policy PERMISSIVE
-- trên cùng một lệnh là phép HOẶC, nên quyền đọc chéo trong phòng của thành
-- viên giữ nguyên, chỉ thêm đúng một đường - dòng của chính mình.
drop policy if exists "Users can read own room quiz attempts" on public.study_room_quiz_attempts;
create policy "Users can read own room quiz attempts"
  on public.study_room_quiz_attempts for select
  to authenticated
  using (user_id = auth.uid());
