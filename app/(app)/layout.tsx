import AppNavbar from "@/components/AppNavbar";

// Wraps every signed-in "app shell" page (dashboard, profile, game,
// analytics, ghi-chu, kiem-tra, ban-be, cong-cu, settings). Next.js keeps a
// layout mounted across client-side navigations between routes that share
// it, so AppNavbar renders exactly once and never remounts/flashes when
// switching between these pages - unlike before, when each page rendered
// its own independent header (or none at all).
export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 lg:pl-64">
      <AppNavbar />
      {children}
    </div>
  );
}
