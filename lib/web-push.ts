import "server-only";
import webpush from "web-push";

// Thin wrapper around the `web-push` npm package (VAPID) - no-ops (like
// lib/send-email.ts does for Resend) until keys are configured, so cron
// routes can call this unconditionally without extra guards.

let configured = false;

function ensureConfigured(): boolean {
  if (configured) return true;
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) return false;

  webpush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
  return true;
}

export interface PushSubscriptionRecord {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export type SendPushResult =
  | { sent: true }
  | { sent: false; reason: "no_vapid_keys" }
  | { sent: false; reason: "expired"; status: number }
  | { sent: false; reason: "error"; status?: number };

export async function sendPushNotification(
  subscription: PushSubscriptionRecord,
  payload: { title: string; body: string; url?: string }
): Promise<SendPushResult> {
  if (!ensureConfigured()) {
    return { sent: false, reason: "no_vapid_keys" };
  }

  try {
    await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.p256dh, auth: subscription.auth },
      },
      JSON.stringify(payload)
    );
    return { sent: true };
  } catch (error) {
    const statusCode = (error as { statusCode?: number })?.statusCode;
    // 404/410 mean the subscription is gone (browser unregistered it,
    // uninstalled, etc.) - the caller should delete the row so we stop
    // retrying it forever.
    if (statusCode === 404 || statusCode === 410) {
      return { sent: false, reason: "expired", status: statusCode };
    }
    console.error("Error sending push notification:", error);
    return { sent: false, reason: "error", status: statusCode };
  }
}
