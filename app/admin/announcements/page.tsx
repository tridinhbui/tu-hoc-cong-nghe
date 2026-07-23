import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AnnouncementsRedirectPage() {
  redirect("/admin/messages?tab=announcements");
}
