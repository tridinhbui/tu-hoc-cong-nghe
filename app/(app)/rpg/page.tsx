import { redirect } from "next/navigation";

// Vỏ tĩnh: trang này không đọc gì ở phía server - mọi dữ liệu do client
// component bên trong tự lấy từ Supabase sau khi tải. Không có `force-static`
// thì nó bị dựng lại ở server cho MỖI lượt xem, để trả về đúng một khung HTML
// không đổi.
//
// Vẫn được proxy chặn trước khi tới đây, nên tĩnh không có nghĩa là công khai.
export const dynamic = "force-static";



export default function RpgPage() {
  redirect("/game?building=shop");
}
