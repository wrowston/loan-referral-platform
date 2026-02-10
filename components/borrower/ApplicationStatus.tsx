import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { DealStatus } from "@/lib/constants";

const progressMap: Record<DealStatus, number> = {
  submitted: 10,
  in_review: 30,
  accepted: 50,
  in_progress: 70,
  closing: 90,
  closed: 100,
  declined: 100,
};

export function ApplicationStatus({ status }: { status: DealStatus }) {
  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Application Status</h3>
        <StatusBadge status={status} />
      </div>
      <Progress value={progressMap[status]} />
    </div>
  );
}
