import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const metrics = [
    { label: "Deals in Pipeline", value: "0" },
    { label: "Partners", value: "0" },
    { label: "Pending Commissions", value: "$0.00" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{metric.value}</CardContent>
        </Card>
      ))}
    </div>
  );
}
