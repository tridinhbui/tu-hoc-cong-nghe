import CfaModulePageClient from "@/components/CfaModulePageClient";


export default async function CfaModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <CfaModulePageClient moduleId={moduleId} />;
}
