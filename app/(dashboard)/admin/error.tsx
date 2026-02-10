"use client";

import { Button } from "@/components/ui/button";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-destructive">Failed to load admin dashboard.</p>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
}
