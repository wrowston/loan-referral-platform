import { CommissionForm } from "@/components/admin/CommissionForm";
import { CommissionTable } from "@/components/admin/CommissionTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminCommissionsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Commission Management</CardTitle>
        <CommissionForm />
      </CardHeader>
      <CardContent>
        <CommissionTable rows={[]} />
      </CardContent>
    </Card>
  );
}
