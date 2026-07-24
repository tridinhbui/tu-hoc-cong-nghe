import StudyGroupsClient from "@/components/StudyGroupsClient";

export const dynamic = "force-dynamic";

export default function StudyGroupsPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-stone-50/60 dark:bg-stone-950 overflow-hidden flex flex-col p-3 sm:p-5">
      <StudyGroupsClient embedded />
    </div>
  );
}
