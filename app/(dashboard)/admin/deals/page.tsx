import { DealsTable } from "@/components/admin/DealsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDealsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deals Table</CardTitle>
      </CardHeader>
      <CardContent>
        <DealsTable rows={[]} />
      </CardContent>
    </Card>
  );
}
