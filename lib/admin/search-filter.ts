/**
 * Shared helper for admin list search boxes (messages, lessons, users), all
 * of which build a Supabase `.or()` filter from raw user input. `,` `(` `)`
 * are syntax characters in PostgREST's filter DSL - left unescaped in a
 * plain template string, a search term containing them can break or
 * manipulate the query. This was fixed independently in three files before
 * being extracted here; keep future search boxes going through this instead
 * of re-deriving the same fix a fourth time.
 */
export function sanitizeSearchTerm(term: string): string {
  return term.trim().replace(/[,()]/g, "");
}

/**
 * Builds a Supabase `.or()` filter string matching `term` against each of
 * `fields` with `ilike`, e.g. buildOrIlikeFilter(["name", "email"], "an") =>
 * "name.ilike.%an%,email.ilike.%an%". Returns null when there's nothing to
 * filter on (empty term), so callers can skip applying `.or()` entirely.
 */
export function buildOrIlikeFilter(fields: string[], term: string): string | null {
  const sanitized = sanitizeSearchTerm(term);
  if (!sanitized) return null;
  return fields.map((field) => `${field}.ilike.%${sanitized}%`).join(",");
}
