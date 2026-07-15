"use client";

interface ShareCompletionButtonProps {
  lessonSlug: string;
  lessonTitle: string;
  className?: string;
}

// Facebook's Share Dialog only ever needs a URL - no app registration or
// login required, unlike the Graph API. It largely ignores a prefilled
// `quote` today (privacy policy change a few years back), so the caption
// content comes entirely from this page's own Open Graph tags rendering as
// the link preview card in the composer, not from anything passed here.
export default function ShareCompletionButton({ lessonSlug, lessonTitle, className }: ShareCompletionButtonProps) {
  function handleShare() {
    const url = `${window.location.origin}/bai-hoc/${lessonSlug}`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "width=600,height=520,noopener,noreferrer");
  }

  return (
    <button
      onClick={handleShare}
      title={`Chia sẻ "${lessonTitle}" lên Facebook`}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold transition-colors cursor-pointer"
      }
      style={{ backgroundColor: "#1877F2" }}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
      </svg>
      Chia sẻ lên Facebook
    </button>
  );
}
