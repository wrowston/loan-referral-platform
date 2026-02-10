import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PartnerResourcesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Published training guides and resources will be listed by category.
        </p>
      </CardContent>
    </Card>
  );
}
