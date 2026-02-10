import { Skeleton } from "@/components/ui/skeleton";

export default function BorrowerLoading() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-8 w-52" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
