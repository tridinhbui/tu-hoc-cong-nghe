import CfaModulePageClient from "@/components/CfaModulePageClient";

export const dynamic = "force-dynamic";

export default async function CfaModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <CfaModulePageClient moduleId={moduleId} />;
}
