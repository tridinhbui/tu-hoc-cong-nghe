import { createClient } from "@/lib/supabase";

// Fire-and-forget feature-click tracking - see
// supabase/migrations/20260719_feature_click_events.sql for the table/RLS
// and lib/admin/feature-events.ts for how the admin dashboard aggregates
// this. Never throws and never awaited by call sites on purpose: tracking
// must not be able to slow down or break the actual feature being tracked.
//
// Convention: always pass a `label` in metadata identifying the specific
// thing clicked (a game id, a nav href, a career id) - the admin dashboard
// groups by (eventName, metadata.label).
export function trackFeatureClick(eventName: string, metadata: Record<string, unknown> = {}): void {
  try {
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      void supabase
        .from("feature_click_events")
        .insert({ user_id: data.user?.id ?? null, event_name: eventName, metadata })
        .then(() => {}, () => {});
    });
  } catch {
    // Tracking must never break the feature it's attached to.
  }
}
