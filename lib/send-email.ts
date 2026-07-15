import "server-only";

// Shared Resend sender for every transactional/digest email in this repo
// (daily streak reminders, weekly progress digest). Resend has a plain HTTP
// API, so this needs zero npm install - just RESEND_API_KEY in the
// environment. No-ops (logs only) until that's set, same as the original
// stub in app/api/cron/send-reminders/route.ts this was extracted from.
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`[send-email] Skipping email to ${to} - RESEND_API_KEY is not set.`);
    return { sent: false, reason: "no_api_key" };
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || "Tự Học Tài Chính <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[send-email] Resend API error ${res.status} sending to ${to}: ${body}`);
      return { sent: false, reason: `resend_error_${res.status}` };
    }
    return { sent: true };
  } catch (error) {
    console.error(`[send-email] Network error sending to ${to}:`, error);
    return { sent: false, reason: "network_error" };
  }
}
