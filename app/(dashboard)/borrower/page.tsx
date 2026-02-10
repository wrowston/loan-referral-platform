import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BorrowerApplicationsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Applications</CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href="/">Back to Home</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your submitted applications will be listed here in read-only mode.
        </p>
      </CardContent>
    </Card>
  );
}
