import { DealDetailPanel } from "@/components/admin/DealDetailPanel";

export default async function AdminDealDetailPage({
  params,
}: {
  params: Promise<{ dealId: string }>;
}) {
  const { dealId } = await params;
  return <DealDetailPanel dealId={dealId} />;
}
