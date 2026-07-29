import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getUnreadMessageCount } from "@/lib/admin/messages";
import { getUnreadChatCount } from "@/lib/admin/chat";
import { getPendingUnlockCount } from "@/lib/admin/unlock-requests";
import { getPendingDocumentCount } from "@/lib/admin/documents";
import { getPendingAppealCount } from "@/lib/admin/appeals";
import { getOpenBugReportCount } from "@/lib/admin/bugs";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side gate: this runs on every request to any /admin/* route.
  // A client-side check alone would let a non-admin briefly see the page
  // (or bypass it entirely with JS disabled / a direct API call), so the
  // redirect must happen here, before any admin markup is ever sent.
  const session = await getAdminSession();

  if (!session) {
    redirect("/dashboard");
  }

  // Same counts the overview's NeedsActionPanel shows, fetched here too so
  // the sidebar badges can never drift from it - one set of helpers, two
  // views. Fetched in the layout (not the sidebar itself, a client
  // component) so there's no second round-trip or badge pop-in after load.
  const [unreadMessages, unreadChat, pendingUnlocks, pendingDocuments, pendingAppeals, openBugReports] =
    await Promise.all([
      getUnreadMessageCount().catch(() => 0),
      getUnreadChatCount().catch(() => 0),
      getPendingUnlockCount().catch(() => 0),
      getPendingDocumentCount().catch(() => 0),
      getPendingAppealCount().catch(() => 0),
      getOpenBugReportCount().catch(() => 0),
    ]);

  const badgeCounts = {
    messages: unreadMessages + unreadChat,
    unlocks: pendingUnlocks,
    documents: pendingDocuments,
    appeals: pendingAppeals + openBugReports,
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex">
      <AdminSidebar adminEmail={session.email} badgeCounts={badgeCounts} />
      <main className="flex-1 min-w-0 lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
