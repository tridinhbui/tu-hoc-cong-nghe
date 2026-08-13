/** Khung chờ của trang bài học.
 *
 *  VÌ SAO CẦN. Route này kết xuất trên máy chủ theo từng request (`ƒ`, xem chú
 *  thích dài ở page.tsx). Trong App Router, bấm một `<Link>` sang route động mà
 *  KHÔNG có ranh giới chờ thì trình duyệt đứng nguyên ở trang cũ - vẫn đủ màu,
 *  vẫn bấm được - cho tới khi máy chủ dựng xong trang mới. Không con trỏ chờ,
 *  không thanh tiến trình, không gì cả. Người dùng bấm "Tiếp tục học ngay" rồi
 *  ngồi nhìn đúng cái nút vừa bấm, và kết luận là nút hỏng.
 *
 *  Tệp này biến khoảng lặng đó thành một khung xám hiện NGAY, và phần còn lại
 *  chảy về sau. Nó không làm máy chủ nhanh hơn một mili giây nào - nó chỉ thôi
 *  giấu việc đang chạy.
 *
 *  ĐÂY LÀ TRANG ĐƯỢC BẤM NHIỀU NHẤT trong ứng dụng, và trước tệp này cả repo có
 *  đúng MỘT `loading.tsx` (app/admin). Mọi route khác vẫn còn nguyên hành vi
 *  trên; đây là chỗ nó đau nhất nên sửa trước.
 *
 *  KHÔNG phải toàn bộ độ trễ. Mỗi lần điều hướng còn kèm một `getUser()` của
 *  proxy - một vòng mạng ra Supabase TRƯỚC khi trang bắt đầu dựng. Cái đó phải
 *  sửa ở proxy (`getClaims()` xác thực JWT tại chỗ), và nó cần dự án chuyển
 *  sang khoá ký bất đối xứng trước.
 *
 *  Khung bám theo hình dạng thật của LessonPageLayout - hero, thẻ "vì sao",
 *  thân bài - chứ không phải một ô xám chung chung: một khung chờ sai hình
 *  khiến nội dung thật nhảy chỗ lúc nó tới, và cú nhảy ấy đọc ra như một lỗi
 *  thứ hai. */
export default function LessonLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-white dark:bg-stone-950">
      {/* Hero */}
      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-6">
          <div className="h-4 w-32 rounded-md bg-stone-100 dark:bg-stone-800" />
          <div className="mt-3 h-8 w-4/5 rounded-lg bg-stone-200 dark:bg-stone-800" />
          <div className="mt-2.5 h-4 w-3/5 rounded-md bg-stone-100 dark:bg-stone-800" />
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-5 px-5 py-8 sm:px-6">
        {/* Thẻ "vì sao bài này đáng học" */}
        <div className="h-24 rounded-xl border-2 border-stone-100 bg-stone-50 dark:border-stone-800 dark:bg-stone-900" />

        {/* Thân bài: mấy khối chữ và một khối rộng cho sơ đồ hoặc công thức. */}
        <div className="space-y-2.5">
          <div className="h-4 w-full rounded-md bg-stone-100 dark:bg-stone-800" />
          <div className="h-4 w-11/12 rounded-md bg-stone-100 dark:bg-stone-800" />
          <div className="h-4 w-4/5 rounded-md bg-stone-100 dark:bg-stone-800" />
        </div>
        <div className="h-40 rounded-2xl bg-stone-100 dark:bg-stone-900" />
        <div className="space-y-2.5">
          <div className="h-4 w-full rounded-md bg-stone-100 dark:bg-stone-800" />
          <div className="h-4 w-10/12 rounded-md bg-stone-100 dark:bg-stone-800" />
        </div>
      </div>
    </div>
  );
}
