import CongCuClient from "@/components/tools/CongCuClient";

// No server data fetching here - CongCuClient auth-gates and fetches
// everything client-side, so this shell has nothing that needs to be
// dynamic/uncached.
export default function CongCuPage() {
  return <CongCuClient />;
}
