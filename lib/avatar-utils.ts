// Shared guard for avatar_url values before handing them to next/image.
// Real-world data has produced the literal string "null" (not JS null - a
// string), empty strings, and other garbage in this column (from OAuth
// providers omitting it, manual DB edits, etc). next/image doesn't
// gracefully fall back on a bad src - it just renders a broken image - so
// every leaderboard/avatar list must check this before rendering an <Image>
// and fall back to initials otherwise.
export function isValidAvatar(url: string | null | undefined): url is string {
  return !!(url && url !== "null" && url.trim() !== "" && (url.startsWith("http") || url.startsWith("/") || url.startsWith("blob:")));
}
