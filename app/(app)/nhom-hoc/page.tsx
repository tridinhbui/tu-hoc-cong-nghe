import StudyGroupsClient from "@/components/StudyGroupsClient";

export const dynamic = "force-dynamic";

export default function StudyGroupsPage() {
  return (
    <div className="h-screen max-h-screen w-full bg-stone-50/60 dark:bg-stone-950 overflow-hidden flex flex-col p-2 sm:p-3 lg:p-3 font-sans">
      <StudyGroupsClient embedded />
    </div>
  );
}
