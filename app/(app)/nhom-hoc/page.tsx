import StudyGroupsClient from "@/components/StudyGroupsClient";

export const dynamic = "force-dynamic";

export default function StudyGroupsPage() {
  return (
    // Same one-screen contract as /kiem-tra - see APP_MOBILE_HEADER_H there.
    // Also h-dvh rather than h-screen: on mobile browsers 100vh includes the
    // retracting URL bar, so h-screen overflows by that much again on top of
    // the header.
    <div className="h-[calc(100dvh-3.5rem)] lg:h-dvh w-full bg-stone-50/60 dark:bg-stone-950 overflow-hidden flex flex-col p-2 sm:p-3 lg:p-3 font-sans">
      <StudyGroupsClient embedded />
    </div>
  );
}
