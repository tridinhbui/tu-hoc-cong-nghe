import { redirect } from "next/navigation";

// KHÔNG `force-static`: layout (app) gọi requireUser() đọc phiên D1 cho mỗi
// lượt xem. Ép tĩnh thì build vỡ (getCloudflareContext lúc prerender), và nếu
// có dựng được thì cổng đăng nhập cũng chỉ chạy một lần lúc build.



export default function StudyGroupCommunityFeedPage() {
  redirect("/bang-tin");
}
