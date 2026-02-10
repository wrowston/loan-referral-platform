import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-4 p-6">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </main>
  );
}
