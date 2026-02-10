import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusControl } from "@/components/admin/StatusControl";
import { InternalNotes } from "@/components/admin/InternalNotes";

export function DealDetailPanel({ dealId }: { dealId: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Deal Detail: {dealId}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <StatusControl status="submitted" />
          <p className="text-sm text-muted-foreground">
            Lender assignment, attachments, and timeline render here.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Admin Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <InternalNotes />
        </CardContent>
      </Card>
    </div>
  );
}
