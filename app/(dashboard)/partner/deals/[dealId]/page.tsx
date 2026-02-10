import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PartnerDealDetailPage({
  params,
}: {
  params: Promise<{ dealId: string }>;
}) {
  const { dealId } = await params;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deal {dealId}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <StatusBadge status="submitted" />
        <p className="text-sm text-muted-foreground">
          Deal details, file attachments, and status timeline will render here.
        </p>
      </CardContent>
    </Card>
  );
}
