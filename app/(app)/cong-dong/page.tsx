import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CommunityFeedPage() {
  redirect("/nhom-hoc/bang-tin");
}
