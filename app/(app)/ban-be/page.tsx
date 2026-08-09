import { Suspense } from "react";
import FriendsClient from "@/components/FriendsClient";


export default function FriendsPage() {
    // Suspense chứ không phải force-dynamic.
  //
  // `FriendsClient` gọi useSearchParams(), và Next bắt buộc phải có ranh giới
  // Suspense quanh nó. `force-dynamic` trước đây làm im yêu cầu ấy bằng cách
  // bỏ hẳn trang khỏi dựng tĩnh - tức trả bằng một lần chạy function cho MỌI
  // lượt xem trang, để khỏi phải viết một dòng bọc.
return (
    <Suspense fallback={null}>
      <FriendsClient />
    </Suspense>
  );
}
