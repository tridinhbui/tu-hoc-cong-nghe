import { redirect } from "next/navigation";


export default function AnnouncementsRedirectPage() {
  redirect("/admin/messages?tab=announcements");
}
