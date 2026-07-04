# Tự Học Tài Chính

Lộ trình 200+ ngày học tài chính từ vỡ lòng đến phân tích doanh nghiệp.

## Cấu trúc

### Track 1: Tài chính cá nhân
Dành cho người muốn hiểu tiền bạc, quản lý chi tiêu, xây dựng tài sản và đầu tư thông minh — không cần kiến thức ngành.

- **Chặng 1**: Tư duy tiền bạc & tài chính cơ bản (20 bài)
- **Chặng 2-4**: Coming soon

### Track 2: Tài chính chuyên ngành
Dành cho người muốn xây nền tảng kỹ thuật bài bản — từ kế toán, phân tích báo cáo, định giá đến tài chính doanh nghiệp.

- **Chặng 1**: Kế toán nền tảng
- **Chặng 2**: Đọc 3 báo cáo tài chính
- **Chặng 3**: Chỉ số tài chính cơ bản
- **Chặng 4-9**: Tài chính doanh nghiệp, định giá, trái phiếu, danh mục, phái sinh

## Đặc điểm

- ✓ **Miễn phí mãi mãi** — Không cần thẻ tín dụng
- ✓ **Tự học theo tốc độ của bạn** — 5-10 phút mỗi bài
- ✓ **Không có biên chế hoặc công thức rồi** — Giải thích bản chất, tại sao, ứng dụng thực tế
- ✓ **Theo dõi tiến độ** — Biết mình đã học được gì, cần học gì tiếp

## Công nghệ

- **Frontend**: Next.js 15 (App Router), React, TailwindCSS
- **Styling**: Stone palette only, no icons/emojis
- **State**: Client-side progress tracking (localStorage)
- **Auth**: Simple email-based (no password required)

## Cấu trúc thư mục

```
/app
  /bai-hoc/[slug]/page.tsx     # Lesson pages
  /dashboard/page.tsx           # Dashboard (2-track system)
  /login/page.tsx               # Landing page
/components
  /LessonPageLayout.tsx         # Article layout với scroll progress
  /TaiTaiLesson.tsx             # AI chatbot component
  /FloatingChatbot.tsx          # Admin contact form
/lib
  /lessons.ts                   # Lesson metadata & quizzes
  /auth.ts                      # Session management
  /progress.ts                  # Progress tracking
```

## Chạy locally

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Bài học mẫu - Chặng 1 (Days 1-20)

| Day | Tiêu đề | Slug |
|-----|---------|------|
| 1 | Tài chính là gì? | `tai-chinh-la-gi` |
| 2 | Tiền là gì? | `tien-la-gi` |
| 3 | Thu nhập, chi phí, tiết kiệm | `thu-nhap-chi-phi-tiet-kiem` |
| 4 | Dòng tiền | `dong-tien` |
| 5 | Tài sản và tiêu sản | `tai-san-tieu-san` |
| 6 | Lãi suất | `lai-suat-la-gi` |
| 7 | Lãi đơn và lãi kép | `lai-don-lai-kep` |
| 8 | Sức mạnh của thời gian | `suc-manh-thoi-gian` |
| 9 | Lạm phát | `lam-phat-la-gi` |
| 10 | Giá trị thời gian của tiền | `gia-tri-thoi-gian-cua-tien` |
| 11 | Rủi ro | `rui-ro-la-gi` |
| 12 | Lợi nhuận kỳ vọng | `loi-nhuan-ky-vong` |
| 13 | Thanh khoản | `thanh-khoan-la-gi` |
| 14 | Nợ tốt và nợ xấu | `no-tot-no-xau` |
| 15 | Đòn bẩy tài chính | `don-bay-tai-chinh` |
| 16 | Vay tiền: giàu hay phá sản? | `vay-tien-giau-hay-pha-san` |
| 17 | Cá nhân, doanh nghiệp, chính phủ | `ca-nhan-doanh-nghiep-chinh-phu` |
| 18 | Hệ thống tài chính | `he-thong-tai-chinh` |
| 19 | Thị trường tài chính | `thi-truong-tai-chinh` |
| 20 | Ôn tập Chặng 1 | `on-tap-chang-1` |

## Tính năng

### Lesson Page
- **Quiz**: 3-5 câu hỏi cho mỗi bài, explanation chi tiết
- **Concepts**: 4-6 khái niệm cốt lõi (VI + EN + definition)
- **Key Takeaways**: 4 điều cốt lõi, ghi nhớ nhanh
- **Scroll Progress**: Thanh tiến độ % + thời gian đọc còn lại
- **TaiTai Chatbot**: Auto-typing summary của bài học

### Dashboard
- **2-track selector**: Chọn Track 1 (cá nhân) hoặc Track 2 (chuyên ngành)
- **Progress tracking**: Xem bài đã học, bài còn lại
- **Stage organization**: Bài học sắp xếp theo Chặng, hiển thị "coming soon" cho Chặng chưa mở

## Quality

TypeScript: **0 errors** ✓

---

Tạo bởi Claude Code | License: MIT
