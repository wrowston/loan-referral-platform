import { PartnerTable } from "@/components/admin/PartnerTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPartnersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Partners</CardTitle>
      </CardHeader>
      <CardContent>
        <PartnerTable rows={[]} />
      </CardContent>
    </Card>
  );
}
