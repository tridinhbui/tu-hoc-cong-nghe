import StudyGroupsClient from "@/components/StudyGroupsClient";

// Vỏ tĩnh: trang này không đọc gì ở phía server - mọi dữ liệu do client
// component bên trong tự lấy từ Supabase sau khi tải. Không có `force-static`
// thì nó bị dựng lại ở server cho MỖI lượt xem, để trả về đúng một khung HTML
// không đổi.
//
// Vẫn được proxy chặn trước khi tới đây, nên tĩnh không có nghĩa là công khai.
export const dynamic = "force-static";



export default function StudyGroupsPage() {
  return (
    // Hợp đồng "một màn hình" giống /kiem-tra - nhưng CHỈ từ lg trở lên.
    //
    // Trên điện thoại nó không giữ được, và giữ bằng mọi giá thì hỏng im lặng:
    // riêng phần nhiệm vụ (banner điểm danh + ba thẻ) đã chiếm gần hết màn,
    // trong khi thẻ sân khấu 3D đòi min-h-[440px]. Hai luật mâu thuẫn, và
    // `overflow-hidden` xử bằng cách CẮT CỤT thẻ 3D - người dùng thấy nửa cái
    // phòng rồi một khoảng trắng, không thấy nút nào báo là còn nữa.
    //
    // Từ lg trở lên hai cột nằm vừa một màn nên hợp đồng đó vẫn đúng và vẫn
    // giữ. Dưới lg thì để trang cuộn.
    //
    // h-dvh chứ không phải h-screen: trên trình duyệt di động 100vh tính cả
    // thanh địa chỉ đang thu lại, nên h-screen tràn thêm đúng bằng ngần ấy.
    <div className="min-h-[calc(100dvh-3.5rem)] lg:h-dvh w-full bg-stone-50/60 dark:bg-stone-950 lg:overflow-hidden flex flex-col p-2 sm:p-3 lg:p-3 font-sans">
      <StudyGroupsClient embedded />
    </div>
  );
}
