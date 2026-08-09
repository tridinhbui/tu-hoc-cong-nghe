import AppNavbar from "@/components/AppNavbar";
import WarmLamps from "@/components/WarmLamps";
import XpFloatingPopup from "@/components/XpFloatingPopup";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 lg:pl-64 overflow-x-hidden">
      <AppNavbar />
      <XpFloatingPopup />
      {children}
      {/* Renders nothing outside dark mode, and nothing at all until the
          learner turns a lamp on. Last in the tree so its fixed layers sit
          above page content without needing a larger z-index than the navbar. */}
      <WarmLamps />
    </div>
  );
}
