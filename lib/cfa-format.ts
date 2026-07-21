// The CFA library's Book/Reading/Module titles are stored ALL-CAPS in
// Supabase (imported from an external source outside this repo's
// migrations - see app/(app)/cfa/page.tsx's comments). Rather than mutate
// that data directly, titles are title-cased for display only wherever
// they're rendered.
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

// Extracts the video id from either youtu.be/<id> or youtube.com/watch?v=<id>
// (also handles /embed/<id> in case an already-embed URL is pasted), for
// rendering a YouTube iframe from a plain URL admins paste in.
export function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1) || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") return parsed.searchParams.get("v");
      if (parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/embed/")[1] || null;
    }
    return null;
  } catch {
    return null;
  }
}
