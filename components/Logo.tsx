import Image from "next/image";

// Shared site mark (blue flame over an open book, transparent background) — same file also used
// as app/icon.png (the favicon), so the mark is consistent everywhere.
export default function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.png"
      /* i18n-ignore-start: product name, a proper noun invariant across locales */
      alt="Tự Học Công Nghệ"
      /* i18n-ignore-end */
      width={size}
      height={size}
      className={`object-contain flex-shrink-0 ${className}`}
    />
  );
}
