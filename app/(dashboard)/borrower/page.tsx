import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import { Check, FileText, Info } from "lucide-react";
import type { DealStatus } from "@/lib/constants";

const statusSteps = [
  { number: 1, label: "Submitted", completed: true, current: false },
  { number: 2, label: "In Review", completed: true, current: false },
  { number: 3, label: "Accepted", completed: true, current: false },
  { number: 4, label: "In Progress", completed: false, current: true },
  { number: 5, label: "Closing", completed: false, current: false },
  { number: 6, label: "Closed", completed: false, current: false },
];

const applications: {
  id: number;
  dealNumber: string;
  address: string;
  amount: string;
  date: string;
  status: DealStatus;
}[] = [
  { id: 1, dealNumber: "DL-20260115-0024", address: "123 Main St, New York, NY", amount: "$2.5M", date: "Jan 15, 2026", status: "in_progress" },
  { id: 2, dealNumber: "DL-20251203-0019", address: "456 Market St, San Francisco, CA", amount: "$1.2M", date: "Dec 3, 2025", status: "closed" },
];

export default function BorrowerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Status overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Application</CardTitle>
          <CardDescription>Track the progress of your loan application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">DL-20260115-0024 - 123 Main St</p>
              <p className="text-xs text-muted-foreground">Submitted on Jan 15, 2026</p>
            </div>
            <Badge>In Progress</Badge>
          </div>

          <Progress value={58} />

          {/* Timeline steps */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {statusSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div
                  className={cn(
                    "mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                    step.completed && "bg-primary text-primary-foreground",
                    step.current && "border-2 border-primary text-primary",
                    !step.completed && !step.current && "bg-muted text-muted-foreground",
                  )}
                >
                  {step.completed ? <Check className="h-4 w-4" /> : step.number}
                </div>
                <span className="text-xs text-muted-foreground">{step.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Applications */}
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <CardDescription>Your submitted loan applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{app.dealNumber}</p>
                    <p className="text-xs text-muted-foreground">{app.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium">{app.amount}</p>
                    <p className="text-xs text-muted-foreground">{app.date}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What to Expect */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-muted-foreground" />
            What to Expect
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Review Period</h4>
              <p className="text-xs text-muted-foreground">
                Our team typically reviews new submissions within 1-2 business days.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Lender Matching</h4>
              <p className="text-xs text-muted-foreground">
                Once accepted, we match your deal with the best lender for your property type.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Closing Timeline</h4>
              <p className="text-xs text-muted-foreground">
                Most deals close within 30-60 days depending on complexity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
