"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { downloadCsv } from "@/lib/csv-export";

export default function AdminExportPage() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Data Export</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Export deals, commissions, partners, or lenders as CSV.
        </p>
        <Button
          onClick={() =>
            downloadCsv("deals.csv", [
              { dealNumber: "DL-20260101-0001", status: "submitted", amount: 2500000 },
            ])
          }
        >
          Export Sample Deals CSV
        </Button>
      </CardContent>
    </Card>
  );
}
