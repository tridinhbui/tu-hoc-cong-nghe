import AppNavbar from "@/components/AppNavbar";
import XpFloatingPopup from "@/components/XpFloatingPopup";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 lg:pl-64 overflow-x-hidden">
      <AppNavbar />
      <XpFloatingPopup />
      {children}
    </div>
  );
}
