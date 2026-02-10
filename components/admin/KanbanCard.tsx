import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency } from "@/lib/formatters";
import type { DealStatus } from "@/lib/constants";

type KanbanCardProps = {
  dealNumber: string;
  borrowerName: string;
  amountCents: number;
  propertyType: string;
  status: DealStatus;
};

export function KanbanCard({
  dealNumber,
  borrowerName,
  amountCents,
  propertyType,
  status,
}: KanbanCardProps) {
  return (
    <Card>
      <CardContent className="space-y-2 p-3 text-sm">
        <div className="font-medium">{dealNumber}</div>
        <div>{borrowerName}</div>
        <div className="text-muted-foreground">{propertyType}</div>
        <div>{formatCurrency(amountCents)}</div>
        <StatusBadge status={status} />
      </CardContent>
    </Card>
  );
}
