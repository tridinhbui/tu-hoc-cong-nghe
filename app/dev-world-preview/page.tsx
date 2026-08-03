import { notFound } from "next/navigation";
import WorldPreview from "@/components/career-district/WorldPreview";

export const metadata = { title: "Xem cảnh 3D (dev)" };

/** Trang xem cảnh 3D không cần đăng nhập, chỉ chạy khi dev.
 *
 *  LÝ DO CÓ FILE NÀY: mọi cảnh 3D đều nằm sau `/pho-nghe`, tức là sau tường
 *  đăng nhập, và cứ mỗi lần muốn NHÌN một căn phòng - đo draw call, soát bố
 *  cục ở 375px, kiểm xem cái bàn có xuyên tường không - lại phải dựng tay một
 *  trang tạm rồi nhớ xoá nó đi. Việc đó đã làm ba lần, và lần nào cũng phải
 *  thêm một dòng `// TẠM` vào PUBLIC_PATHS. Một dòng "tạm" quên xoá là một
 *  route công khai trong production.
 *
 *  Nên nó ở đây hẳn, và tự chặn bằng NODE_ENV thay vì bằng trí nhớ. Ở
 *  production trang này là 404 thật - `notFound()` chạy trên server, không
 *  phải một cái ẩn bằng CSS.
 *
 *  Vẫn phải nằm trong PUBLIC_PATHS của proxy.ts: proxy chạy TRƯỚC trang, nên
 *  không có dòng đó thì trang bị đá về /login trước khi kịp 404.
 *
 *  Tên thư mục không mở đầu bằng "_": App Router coi thư mục gạch dưới là
 *  private folder và loại hẳn khỏi routing. Bản đầu đặt ở `app/_world_preview`
 *  và ra 404 kể cả khi dev, trông y hệt như trang bị proxy chặn. */

export default function WorldPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <WorldPreview />;
}
