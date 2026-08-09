import { redirect } from "next/navigation";


export default function AiReportsRedirectPage() {
  redirect("/admin/appeals?tab=ai-reports");
}
