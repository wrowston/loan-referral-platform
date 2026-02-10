import { ApplicationStatus } from "@/components/borrower/ApplicationStatus";
import { StatusTimeline } from "@/components/borrower/StatusTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BorrowerDealPage({
  params,
}: {
  params: Promise<{ dealId: string }>;
}) {
  const { dealId } = await params;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Application {dealId}</CardTitle>
        </CardHeader>
        <CardContent>
          <ApplicationStatus status="in_review" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusTimeline
            items={[
              { label: "Submitted", date: "Jan 1, 2026" },
              { label: "In review", date: "Jan 2, 2026" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
