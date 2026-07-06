import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

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

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex">
      <AdminSidebar adminEmail={session.email} />
      <main className="flex-1 min-w-0 lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
