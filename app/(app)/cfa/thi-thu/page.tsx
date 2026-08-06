import type { Metadata } from "next";
import CfaMockExamClient from "@/components/CfaMockExamClient";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.finalTwo.cfaThiThuPage.metaTitle,
    description: t.finalTwo.cfaThiThuPage.metaDescription,
  };
}

export default function CfaMockExamPage() {
  return <CfaMockExamClient />;
}
