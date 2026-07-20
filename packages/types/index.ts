export type TrackId = "personal" | "cfa" | "professional";

export interface Track {
  id: TrackId;
  name: string;
  description: string;
  color: string;
  icon: string;
}

// Lesson/UserProfile types live in @thtcdn/api (they mirror actual Supabase
// query shapes and previously drifted out of sync when duplicated here).

export interface Session {
  user: {
    id: string;
    email: string;
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
