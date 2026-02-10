import { CsvImport } from "@/components/admin/CsvImport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLenderImportPage() {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Import Lenders CSV</CardTitle>
      </CardHeader>
      <CardContent>
        <CsvImport />
      </CardContent>
    </Card>
  );
}
