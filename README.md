# tu-hoc-cong-nghe

**Tự Học Công Nghệ** — lộ trình tự học công nghệ bằng tiếng Việt, từ dòng lệnh đầu tiên tới thiết kế hệ thống.

## Cấu trúc

### Track 1: Nền tảng công nghệ
Dành cho người muốn hiểu máy tính, viết được chương trình đầu tiên và dựng một sản phẩm chạy thật — không cần kiến thức ngành.

- **Chặng 1**: Máy tính, hệ điều hành, dòng lệnh
- **Chặng 2**: Git và làm việc trên kho mã chung
- **Chặng 3**: Tư duy lập trình và ngôn ngữ đầu tiên
- **Chặng 4**: HTML, CSS và trang web đầu tiên
- **Chặng 5-21**: JavaScript, cấu trúc dữ liệu, API, cơ sở dữ liệu, triển khai, Linux, đám mây, bảo mật

### Track 2: Công nghệ chuyên sâu
Dành cho người đã biết lập trình cơ bản — kiến trúc hệ thống, cơ sở dữ liệu ở quy mô lớn, hạ tầng, dữ liệu và AI trong sản phẩm thật.

### Track 3: Chứng chỉ công nghệ
Ánh xạ các bài đã có sang bốn miền thi của AWS Solutions Architect (Associate).

## Đặc điểm

- ✓ **Miễn phí mãi mãi** — không cần thẻ tín dụng
- ✓ **Tự học theo tốc độ của bạn** — 5-10 phút mỗi bài
- ✓ **Giải thích bản chất** — vì sao, chứ không chỉ công thức
- ✓ **Spaced Repetition** — câu hỏi ôn quay lại đúng lúc sắp quên
- ✓ **Theo dõi tiến độ** — biết đã học được gì, cần học gì tiếp

## Công nghệ

- **Frontend**: Next.js 16 (App Router, Turbopack), React 19, TailwindCSS
- **Backend**: Supabase (auth, progress, bảng xếp hạng)
- **i18n**: từ điển tiếng Việt/tiếng Anh, có bộ kiểm đối chiếu hai chiều
- **Kiểm thử**: Vitest (bộ kiểm nội dung, i18n và widget), Playwright cho e2e

## Cấu trúc thư mục

```
/app
  /bai-hoc/[slug]/page.tsx      # Trang bài học
  /(app)/dashboard/page.tsx     # Dashboard
  /login/page.tsx               # Đăng nhập
/components
  /home/HomePage.tsx            # Landing page
  /Interactive*.tsx             # Widget tương tác trong bài
/lib
  /lessons.ts                   # Nội dung bài học và quiz
  /lessons-data/                # Dữ liệu bài đã sinh (prebuild)
  /i18n/dictionaries/           # Chữ hiển thị, vi + en
  /track-stages.ts              # Chặng của từng lộ trình
```

## Chạy locally

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Kiểm tra

```bash
npx tsc --noEmit
npx vitest run
npm run audit:lessons
```

---

License: MIT
