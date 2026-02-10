import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  FileText,
  TrendingUp,
  Clock,
  DollarSign,
  PlusCircle,
} from "lucide-react";
import type { DealStatus } from "@/lib/constants";

const metrics = [
  {
    label: "Active Deals",
    value: "5",
    trend: "2 in progress",
    trendUp: null,
    icon: FileText,
  },
  {
    label: "Deals This Month",
    value: "3",
    trend: "+50% from last month",
    trendUp: true,
    icon: TrendingUp,
  },
  {
    label: "Pending Commission",
    value: "$12,500",
    trend: "3 deals awaiting close",
    trendUp: null,
    icon: Clock,
  },
  {
    label: "Total Earned",
    value: "$45,200",
    trend: "Lifetime earnings",
    trendUp: null,
    icon: DollarSign,
  },
];

const recentDeals: {
  id: number;
  dealNumber: string;
  address: string;
  amount: string;
  status: DealStatus;
}[] = [
  { id: 1, dealNumber: "DL-20260115-0024", address: "123 Main St, New York", amount: "$2.5M", status: "in_progress" },
  { id: 2, dealNumber: "DL-20260112-0020", address: "456 Oak Ave, Chicago", amount: "$1.8M", status: "closing" },
  { id: 3, dealNumber: "DL-20260108-0018", address: "789 Pine Rd, Miami", amount: "$3.2M", status: "submitted" },
  { id: 4, dealNumber: "DL-20251220-0015", address: "321 Elm Blvd, Denver", amount: "$950K", status: "closed" },
];

const commissionBreakdown = [
  { label: "Pending", amount: "$12,500", color: "bg-amber-500", pct: 28 },
  { label: "Earned", amount: "$8,200", color: "bg-blue-500", pct: 18 },
  { label: "Paid", amount: "$24,500", color: "bg-emerald-500", pct: 54 },
];

export default function PartnerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Greeting + CTA */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, Partner</h2>
          <p className="text-sm text-muted-foreground">
            Here is an overview of your referral activity.
          </p>
        </div>
        <Button asChild>
          <Link href="/partner/deals/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Submit New Deal
          </Link>
        </Button>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {metric.trendUp ? (
                  <span className="text-emerald-600">{metric.trend}</span>
                ) : (
                  metric.trend
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom two-column */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Deals */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Deals</CardTitle>
              <CardDescription>Your latest deal submissions</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/partner/deals">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDeals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{deal.dealNumber}</p>
                    <p className="text-xs text-muted-foreground">{deal.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{deal.amount}</span>
                    <StatusBadge status={deal.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Commission Summary */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Commission Summary</CardTitle>
            <CardDescription>Earnings breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <div className="text-3xl font-bold">$45,200</div>
              <p className="mt-1 text-xs text-muted-foreground">Total Lifetime Earnings</p>
            </div>
            <div className="space-y-3">
              {commissionBreakdown.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium">{item.amount}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="flex h-2 overflow-hidden rounded-full">
                {commissionBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className={item.color}
                    style={{ width: `${item.pct}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Paid</span>
                <span>Earned</span>
                <span>Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
