import { timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

// Fail-closed: a missing CRON_SECRET used to make cron routes run wide open
// (anyone who found the URL could trigger them). Shared by every
// app/api/cron/* route instead of each one re-implementing this check.
export function isAuthorizedCronRequest(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[cron] CRON_SECRET is not set - refusing to run. Set it in the environment.");
    return false;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${cronSecret}`;
  const authBuf = Buffer.from(authHeader);
  const expectedBuf = Buffer.from(expected);
  if (authBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(authBuf, expectedBuf);
}
