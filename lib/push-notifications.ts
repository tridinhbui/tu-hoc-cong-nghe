import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export function isPushSupported(): boolean {
  return typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window;
}

// PushManager wants the VAPID public key as a BufferSource, not the
// base64url string it's distributed as. TS's lib.dom PushSubscriptionOptionsInit
// types applicationServerKey narrower than the Uint8Array<ArrayBufferLike>
// Uint8Array.from(...) actually returns - cast through the plain ArrayBuffer.
function urlBase64ToUint8Array(base64String: string): BufferSource {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const bytes = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) bytes[i] = rawData.charCodeAt(i);
  return bytes.buffer;
}

export async function subscribeToPush(userId: string): Promise<void> {
  if (!isPushSupported()) throw new Error("Trình duyệt này không hỗ trợ thông báo đẩy.");

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidPublicKey) throw new Error("Thông báo đẩy chưa được cấu hình.");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error("Bạn đã từ chối quyền thông báo.");

  const registration = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;

  const existing = await registration.pushManager.getSubscription();
  const subscription =
    existing ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    }));

  const json = subscription.toJSON();
  if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
    throw new Error("Không lấy được thông tin đăng ký thông báo.");
  }

  const supabase = createClient();
  const { error } = await supabase.from("push_subscriptions").upsert(
    {
      user_id: userId,
      endpoint: json.endpoint,
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
    },
    { onConflict: "endpoint" }
  );

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}

export async function unsubscribeFromPush(userId: string): Promise<void> {
  if (!isPushSupported()) return;

  const registration = await navigator.serviceWorker.getRegistration("/sw.js");
  const subscription = await registration?.pushManager.getSubscription();
  const endpoint = subscription?.endpoint;

  if (subscription) await subscription.unsubscribe();

  if (!endpoint) return;
  const supabase = createClient();
  const { error } = await supabase
    .from("push_subscriptions")
    .delete()
    .eq("user_id", userId)
    .eq("endpoint", endpoint);

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}
