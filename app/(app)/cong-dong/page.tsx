import type { Metadata } from "next";
import LobbyClient from "@/components/lobby/LobbyClient";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

// Trước đây route này chỉ redirect sang /finsocial. Giờ nó là một thư viện 3D -
// phòng đọc mở ra phố Sài Gòn, nơi mọi người đang online cùng hiện diện, mỗi
// người một nhân vật đi lại được bằng phím.
//
// Auth check nằm ở client (LobbyClient tự redirect về /login): cảnh 3D dù gì
// cũng chỉ dựng được phía trình duyệt, nên một vòng server chỉ để hỏi user
// không mua thêm được gì ngoài một lần chờ nữa.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.finalTwo.congDongPage.metaTitle,
    description: t.finalTwo.congDongPage.metaDescription,
  };
}

export default function CommunityLobbyPage() {
  return <LobbyClient />;
}
