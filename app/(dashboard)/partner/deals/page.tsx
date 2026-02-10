import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PartnerDealsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Deals</CardTitle>
        <Button asChild size="sm">
          <Link href="/partner/deals/new">Submit Deal</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No deals yet. Submit your first deal to begin.</p>
      </CardContent>
    </Card>
  );
}
