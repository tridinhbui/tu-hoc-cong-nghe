import { Suspense } from "react";
import OnTapCauSaiClient from "./OnTapCauSaiClient";

export const dynamic = "force-dynamic";

export default function OnTapCauSaiPage() {
  // OnTapCauSaiClient reads `?phien=sang` (the deep link in the 7:30 review
  // push) via useSearchParams, which Next requires to sit under a Suspense
  // boundary.
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin" />
        </div>
      }
    >
      <OnTapCauSaiClient />
    </Suspense>
  );
}
