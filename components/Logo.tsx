// Shared site mark — a simple ascending line (progress/growth) over a
// baseline, echoing "learning that moves you forward." Same shape as
// app/icon.svg (the favicon) so the mark is consistent everywhere it shows up.
export default function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Tự Học Tài Chính"
    >
      <rect width="64" height="64" rx="16" className="fill-stone-900 dark:fill-stone-100" />
      <path
        d="M14 40L25 29L33 37L50 20"
        className="stroke-emerald-400"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 20H50V30"
        className="stroke-emerald-400"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="14" y="44" width="36" height="4" rx="2" className="fill-stone-100 dark:fill-stone-900" />
    </svg>
  );
}
