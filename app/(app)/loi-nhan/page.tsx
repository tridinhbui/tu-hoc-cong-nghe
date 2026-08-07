import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import QuietCornerClient from "@/components/QuietCornerClient";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

// Auth-gated và đọc biến môi trường Supabase lúc render - không bao giờ
// prerender tĩnh. Giống app/(app)/ghi-chu/page.tsx.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.finalTwo.loiNhanPage.metaTitle,
    description: t.finalTwo.loiNhanPage.metaDescription,
  };
}

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
