import { Skeleton } from "@/components/ui/skeleton";

export default function BorrowerLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-64 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-40 rounded-xl" />
    </div>
  );
}
