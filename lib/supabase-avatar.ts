import { createClient } from "@/lib/supabase";
import { DEFAULT_AVATAR_CONFIG, type AvatarConfig } from "@/lib/avatar-customizer-types";

const LOCAL_STORAGE_AVATAR_KEY = "thtcdn_avatar_config";

export function getLocalAvatarConfig(): AvatarConfig {
  if (typeof window === "undefined") return DEFAULT_AVATAR_CONFIG;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_AVATAR_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_AVATAR_CONFIG, ...parsed };
    }
  } catch (e) {
    console.warn("Failed to load local avatar config:", e);
  }
  return DEFAULT_AVATAR_CONFIG;
}

export function saveLocalAvatarConfig(config: AvatarConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_AVATAR_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent("thtcdn:avatar-updated", { detail: { config } }));
  } catch (e) {
    console.warn("Failed to save local avatar config:", e);
  }
}

export async function fetchUserAvatarConfig(userId?: string): Promise<AvatarConfig> {
  const localConfig = getLocalAvatarConfig();
  if (!userId) return localConfig;

  try {
    const supabase = createClient();
    const { data: profile, error } = await supabase
      .from("user_profiles")
      .select("avatar_config")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.warn("Notice reading user avatar_config from DB:", error.message);
      return localConfig;
    }

    if (profile && profile.avatar_config) {
      const dbConfig = typeof profile.avatar_config === "string" 
        ? JSON.parse(profile.avatar_config) 
        : profile.avatar_config;
      const merged = { ...DEFAULT_AVATAR_CONFIG, ...dbConfig };
      saveLocalAvatarConfig(merged);
      return merged;
    }
  } catch (err) {
    console.warn("Error fetching user avatar config:", err);
  }

  return localConfig;
}

export async function saveUserAvatarConfig(userId: string | undefined, config: AvatarConfig): Promise<boolean> {
  // Always save locally first for instant reactive update
  saveLocalAvatarConfig(config);

  if (!userId) return true;

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("user_profiles")
      .update({
        avatar_config: config,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.warn("Failed to update avatar_config column in user_profiles:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error saving avatar_config to Supabase:", err);
    return false;
  }
}
