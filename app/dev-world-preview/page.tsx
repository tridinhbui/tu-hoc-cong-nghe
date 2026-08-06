import { notFound } from "next/navigation";
import WorldPreview from "@/components/career-district/WorldPreview";
import QuietForestScene from "@/components/QuietForestScene";
import TopicMasteryWidget from "@/components/TopicMasteryWidget";
import InteractiveBond from "@/components/InteractiveBond";
import { computeDomainCoverage } from "@/lib/career-competency";

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

/** `?scene=forest` mở cảnh đống lửa ở /loi-nhan; không có tham số thì vẫn là
 *  phố nghề như trước.
 *
 *  Có công tắc thay vì sửa tạm file này rồi nhớ revert - đúng cái vòng lặp mà
 *  chú thích ngay trên đã ghi là đã làm ba lần. Cảnh đống lửa nằm sau tường
 *  đăng nhập ở /loi-nhan, nên không có lối này thì không nhìn được nó bằng
 *  ảnh chụp trong lúc dựng. */
export default async function WorldPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ scene?: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { scene } = await searchParams;
  if (scene === "bond") {
    return (
      <div className="min-h-screen bg-stone-100 p-6">
        <div className="mx-auto max-w-xl">
          <InteractiveBond />
        </div>
      </div>
    );
  }
  if (scene === "mastery") {
    // Một tập bài "đã học" giả lập, chỉ để nhìn bố cục: lấy 40 bài đầu của
    // track cá nhân cộng vài bài định giá, đủ để bảng có cả mảng cao lẫn mảng
    // gần bằng 0 và kiểm được cả ba mức màu.
    const fake = [...Array.from({ length: 40 }, (_, i) => i + 1), 131, 133, 135];
    return (
      <div className="min-h-screen bg-stone-100 p-6 dark:bg-stone-950">
        <div className="mx-auto max-w-3xl">
          <TopicMasteryWidget coverage={computeDomainCoverage(fake)} />
        </div>
      </div>
    );
  }
  if (scene === "forest") {
    return (
      <div className="min-h-screen bg-stone-950 p-6">
        <div className="mx-auto h-[420px] max-w-2xl overflow-hidden rounded-2xl">
          <QuietForestScene intensity={0.85} />
        </div>
      </div>
    );
  }
  return <WorldPreview />;
}
