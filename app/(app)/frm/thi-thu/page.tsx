import type { Metadata } from "next";
import FrmMockExamClient from "@/components/FrmMockExamClient";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return {
    title: t.finalTwo.frmThiThuPage.metaTitle,
    description: t.finalTwo.frmThiThuPage.metaDescription,
  };
}

export default function FrmMockExamPage() {
  return <FrmMockExamClient />;
}
