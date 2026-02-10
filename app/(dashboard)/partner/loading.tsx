import { Skeleton } from "@/components/ui/skeleton";

export default function PartnerLoading() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
