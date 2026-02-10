import Link from "next/link";
import { LenderTable } from "@/components/admin/LenderTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLendersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Lenders</CardTitle>
        <Button asChild size="sm">
          <Link href="/admin/lenders/import">Import CSV</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <LenderTable rows={[]} />
      </CardContent>
    </Card>
  );
}
