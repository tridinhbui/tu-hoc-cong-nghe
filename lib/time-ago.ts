/** "5 phút trước" / "2 giờ trước" / "3 ngày trước" style relative time.
 *
 *  Extracted from components/CommunityFeedClient.tsx's local `timeAgo` so
 *  components/NotificationBell.tsx can use the exact same wording instead of
 *  writing a second copy. (Not the only copy in the codebase -
 *  LessonPageClient.tsx and CfaModulePageClient.tsx have their own local
 *  versions too, but consolidating those is a separate, unrelated cleanup.) */
export function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}
