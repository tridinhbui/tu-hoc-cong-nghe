import Image from "next/image";

// Shared site mark (open book + flame + growth bars) — same file also used
// as app/icon.png (the favicon), so the mark is consistent everywhere.
export default function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.png"
      /* i18n-ignore-start: product name, a proper noun invariant across locales */
      alt="Tự Học Tài Chính"
      /* i18n-ignore-end */
      width={size}
      height={size}
      className={`rounded-lg flex-shrink-0 ${className}`}
    />
  );
}
