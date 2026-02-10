import { TierSelector } from "@/components/admin/TierSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPartnerDetailPage({
  params,
}: {
  params: Promise<{ partnerId: string }>;
}) {
  const { partnerId } = await params;
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Partner {partnerId}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TierSelector value="bronze" />
      </CardContent>
    </Card>
  );
}
