/** `cacheControl` cho mọi lần tải lên Supabase Storage.
 *
 *  VÌ SAO CÓ TỆP NÀY. Không một lời gọi `.storage.upload()` nào trong kho từng
 *  đặt `cacheControl`, nên mọi object đều nhận mặc định của Supabase là một
 *  giờ. Ảnh đại diện, ảnh trong chat, ảnh bìa tài liệu - tất cả đều được tải
 *  lại từ Supabase mỗi giờ, cho từng trình duyệt, dù không byte nào trong
 *  chúng thay đổi.
 *
 *  ĐỊNH DẠNG. Đây là SỐ GIÂY, không phải một header. supabase-js tự bọc nó
 *  lại - trong storage-js 2.110.0, `uploadOrUpdate` làm đúng một trong hai
 *  việc tuỳ kiểu dữ liệu tải lên:
 *
 *      i.append("cacheControl", a.cacheControl)          // khi là Blob/File
 *      o["cache-control"] = `max-age=${a.cacheControl}`  // khi không phải
 *
 *  Nên truyền vào `"public, max-age=31536000, immutable"` sẽ sinh ra
 *  `max-age=public, max-age=31536000, immutable` - một header hỏng, và hỏng
 *  im lặng: lần tải lên vẫn thành công. Cũng vì vậy mà `immutable` không đặt
 *  được từ đây; muốn có nó thì phải sửa ở tầng bucket/CDN.
 *
 *  Một năm là con số đúng chứ không phải con số to cho oai: mọi đường dẫn
 *  storage trong kho này đều bất biến. Chúng được dựng từ `Date.now()` cộng
 *  một hậu tố ngẫu nhiên (`lib/admin/documents.ts`, `lib/supabase-chat.ts`)
 *  hoặc `<userId>-<timestamp>` (avatar trong `app/(app)/settings/page.tsx`),
 *  nên thay ảnh là sinh ra một URL mới. Không có URL nào đổi nội dung dưới
 *  chân người đang cache nó.
 *
 *  GIỚI HẠN, và nó quan trọng: cái này chỉ áp cho object TẢI LÊN TỪ NAY.
 *  Những gì đã nằm sẵn trong storage vẫn giữ header một giờ cũ. Thứ dọn phần
 *  đó là `minimumCacheTTL` trong `next.config.ts`, vì trình tối ưu ảnh lấy
 *  max(minimumCacheTTL, max-age của nguồn) - xem chú thích ở đó. Hai thay đổi
 *  bù cho nhau; thiếu một cái là còn nguyên một nửa vấn đề. */
export const STORAGE_CACHE_CONTROL = "31536000";
