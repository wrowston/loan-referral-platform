import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PartnerDashboardPage() {
  const cards = [
    { label: "Active Deals", value: "0" },
    { label: "Deals This Month", value: "0" },
    { label: "Pending Commission", value: "$0.00" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((item) => (
        <Card key={item.label}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{item.value}</CardContent>
        </Card>
      ))}
    </div>
  );
}
