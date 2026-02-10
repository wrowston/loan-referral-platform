import { Badge } from "@/components/ui/badge";
import type { DealStatus } from "@/lib/constants";

const variantByStatus: Record<DealStatus, "default" | "secondary" | "destructive" | "outline"> = {
  submitted: "outline",
  in_review: "secondary",
  accepted: "default",
  in_progress: "default",
  closing: "secondary",
  closed: "default",
  declined: "destructive",
};

export function StatusBadge({ status }: { status: DealStatus }) {
  return (
    <Badge variant={variantByStatus[status]} className="capitalize">
      {status.replaceAll("_", " ")}
    </Badge>
  );
}
