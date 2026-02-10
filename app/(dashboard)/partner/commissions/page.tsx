import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PartnerCommissionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commissions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Commission lifecycle will appear here (pending, earned, paid).
        </p>
      </CardContent>
    </Card>
  );
}
