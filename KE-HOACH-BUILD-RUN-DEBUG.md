# BUILD → RUN → DEBUG → LEVEL UP

Tinh thần chung (28/09/2026): dùng công nghệ để làm ra thứ thật. **Sửa giao
diện đang có, không dựng lại kiến trúc**: giữ route, điều hướng, logic D1 và
mọi tính năng.

## Luật màu (áp cho mọi trang)

| nghĩa | màu |
| --- | --- |
| đang làm / hành động | brand (xanh) |
| thông tin kỹ thuật cốt lõi | gần đen (`text-ink-max`) |
| tiến độ / đã xong | cyan |
| XP / phần thưởng | amber |
| chưa mở / đã khoá | xám |

Không gradient, không glassmorphism, không bo góc thừa, không ảnh minh hoạ
ngẫu nhiên. Bớt khung viền lặp lại.

## Theo từng trang

| # | trang | việc | trạng thái |
| --- | --- | --- | --- |
| 1 | Dashboard | dải 15 cấp thành hành trình: LV01…LV15, "BẠN Ở ĐÂY", XP mỗi đoạn, một yêu cầu cho cấp kế | xong |
| 1b | Dashboard | "Hôm nay làm gì?" thành hành động chính dưới dải cấp; hạ nhấn BXH và số liệu phụ | xong |
| 2 | Bắt đầu từ đầu (`/lo-trinh`, `/hoc-theo-nhu-cau`) | thẻ = năng lực: `18 bài · ~2 giờ`, OUTPUT, `Bắt đầu →`; sau khi chọn nói rõ thứ đầu tiên sẽ làm ra | xong |
| 3 | Học bài | cây kỹ năng: `CHẶNG 2 · GIT`, `0/8`, "Sau chặng này bạn có thể: …"; bốn trạng thái chưa bắt đầu / đang học / thành thạo / khoá | xong |
| 4 | Kiểm tra | trái `DAILY SIGNAL · dd.mm.yy`, phải Training Lab; phản hồi dạy lý do | xong |
| 5 | Phỏng vấn kỹ thuật | ROLE → DIFFICULTY → FOCUS → INTERVIEW là tiến độ thật; kết quả theo 4 trục + một kỹ năng ưu tiên | xong |
| 6 | Mô phỏng công cụ | mỗi mô phỏng = một nhiệm vụ có đề bài nghề nghiệp ("CEO muốn 10 khách hàng doanh thu cao nhất"), tiêu chí đạt, gợi ý khi cần | xong |
| 7 | Game Kingdom | ẩn dụ SYSTEM MAP: HTML → node online … → SYSTEM ONLINE | xong |

## Chỉ số mới: NĂNG LỰC THỰC HÀNH

Frontend / Data / AI / Cloud, **không tính từ đọc bài**. Chỉ tăng khi: bài
tập code chạy đúng, mô phỏng công cụ đạt, phỏng vấn kỹ thuật đạt, thi vượt
chặng đạt, luyện miền chứng chỉ đạt. Đã làm: `migrations-d1/0010_skill_evidence.sql`, `lib/practical-skill.ts`,
`app/api/skill-evidence`, `components/PracticalSkillPanel.tsx` (đang ở Dashboard).
Migration cần chạy remote trước khi ghi được bằng chứng.

## Kiểm cuối

Mọi trang trả lời được: mục tiêu hiện tại, năng lực thực hành, tiến độ, phản
hồi, bước tiếp theo. Chuẩn hoá trạng thái đang làm / xong / khoá / thưởng /
thành thạo trên toàn app.
