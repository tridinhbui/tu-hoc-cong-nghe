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
