import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminResourcesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources Hub</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Create and publish resources for partners and borrowers.
        </p>
      </CardContent>
    </Card>
  );
}
