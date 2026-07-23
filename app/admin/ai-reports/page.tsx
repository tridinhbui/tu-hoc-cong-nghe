import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AiReportsRedirectPage() {
  redirect("/admin/appeals?tab=ai-reports");
}
