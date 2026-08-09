// The route gate (proxy.ts) appends ?next=<original path> when it redirects a
// signed-out visitor to /login, so they land back where they meant to go
// instead of always on /dashboard. Only accept a same-site relative path - a
// bare "/x" is safe, but "//evil.com" or "https://evil.com" would have the
// browser treat it as protocol-relative/absolute and navigate off this site,
// so anything not starting with exactly one "/" is rejected.
//
// Shared by app/login/page.tsx and app/auth/callback/route.ts rather than
// living in the page: the OAuth round trip carries `next` out to Google and
// back into the callback, and the callback is a server route that cannot
// import a "use client" module. Two copies of a security check is how one of
// them ends up being the lenient one.
export function safeNextPath(raw: string | null): string {
  if (!raw) return "/dashboard";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
  return raw;
}
