import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CuaHangPage() {
  redirect("/game?building=shop");
}
