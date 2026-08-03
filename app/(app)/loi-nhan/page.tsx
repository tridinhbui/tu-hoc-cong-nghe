import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import QuietCornerClient from "@/components/QuietCornerClient";

// Auth-gated và đọc biến môi trường Supabase lúc render - không bao giờ
// prerender tĩnh. Giống app/(app)/ghi-chu/page.tsx.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Góc yên tĩnh",
  description:
    "Lời nhắn hôm nay, một phút thở, và một góc nhìn khác cho những nỗi lo về tiền.",
};

export default async function LoiNhanPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <QuietCornerClient userId={user.id} />;
}
