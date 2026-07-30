import { Suspense } from "react";
import CommunityFeedClient from "@/components/CommunityFeedClient";

export const dynamic = "force-dynamic";

export default function FinSocialPage() {
  // CommunityFeedClient reads useSearchParams() (for ?post=<id> deep links
  // from NotificationBell), which Next.js requires a Suspense boundary
  // around - without one, `next build` fails even though `dynamic =
  // "force-dynamic"` already opts this route out of static generation.
  return (
    <Suspense fallback={null}>
      <CommunityFeedClient />
    </Suspense>
  );
}
