import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  DollarSign,
  CircleCheck,
  PlusCircle,
  UserPlus,
  Building2,
  Download,
  ArrowUpRight,
} from "lucide-react";

const metrics = [
  {
    label: "Deals in Pipeline",
    value: "24",
    trend: "+12% from last month",
    trendUp: true,
    icon: FileText,
  },
  {
    label: "Active Partners",
    value: "18",
    trend: "+3 new this month",
    trendUp: true,
    icon: Users,
  },
  {
    label: "Pending Commissions",
    value: "$48,250",
    trend: "5 awaiting payment",
    trendUp: null,
    icon: DollarSign,
  },
  {
    label: "Deals Closed (MTD)",
    value: "7",
    trend: "+28% from last month",
    trendUp: true,
    icon: CircleCheck,
  },
];

const quickActions = [
  { label: "New Deal", href: "/admin/deals", icon: PlusCircle },
  { label: "Add Partner", href: "/admin/partners", icon: UserPlus },
  { label: "Add Lender", href: "/admin/lenders", icon: Building2 },
  { label: "Export Report", href: "/admin/export", icon: Download },
];

const recentActivity = [
  { id: 1, icon: PlusCircle, title: "New deal submitted", description: "Deal #1024 - 123 Main St, Office", time: "2 min ago" },
  { id: 2, icon: ArrowUpRight, title: "Deal moved to Closing", description: "Deal #1018 - 456 Oak Ave, Multifamily", time: "1 hour ago" },
  { id: 3, icon: UserPlus, title: "New partner registered", description: "Acme Realty joined as Bronze tier", time: "3 hours ago" },
  { id: 4, icon: CircleCheck, title: "Deal closed", description: "Deal #1015 - 789 Pine Rd, Industrial", time: "Yesterday" },
  { id: 5, icon: DollarSign, title: "Commission paid", description: "$2,450 to Acme Realty for Deal #1012", time: "Yesterday" },
];

const pipelineStages = [
  { label: "Submitted", count: 5 },
  { label: "In Review", count: 8 },
  { label: "Accepted", count: 4 },
  { label: "In Progress", count: 3 },
  { label: "Closing", count: 2 },
  { label: "Closed", count: 2 },
];

export default function AdminDashboardPage() {
  const maxCount = Math.max(...pipelineStages.map((s) => s.count));

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Here is what is happening with your pipeline today, {format(new Date(), "EEEE, MMMM d")}.
        </p>
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
                {metric.trendUp !== null ? (
                  <span className="text-emerald-600">{metric.trend}</span>
                ) : (
                  metric.trend
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        {quickActions.map((action) => (
          <Button key={action.label} size="sm" variant="outline" asChild>
            <Link href={action.href}>
              <action.icon className="mr-1 h-4 w-4" />
              {action.label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Bottom two-column */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest deal submissions and status changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="shrink-0 text-xs text-muted-foreground">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Overview */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
            <CardDescription>Deals by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pipelineStages.map((stage) => (
                <div key={stage.label} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-xs text-muted-foreground">{stage.label}</span>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${(stage.count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-6 text-right text-xs font-medium">{stage.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
