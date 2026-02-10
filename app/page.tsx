import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboardPath } from "@/lib/roles";
import {
  Landmark,
  ArrowRight,
  Handshake,
  UserCheck,
  ShieldCheck,
  Send,
  GitPullRequestArrow,
  CircleDollarSign,
} from "lucide-react";

export default async function Home() {
  const { orgRole, orgId, userId } = await auth();

  const destination = orgId
    ? getDashboardPath(orgRole)
    : userId
      ? "/select-role"
      : "/sign-in";

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Landmark className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-tight">LoanRef</span>
          </div>
          <div className="flex items-center gap-3">
            {userId ? (
              <Button asChild>
                <Link href={destination}>
                  Open Dashboard
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Create Account</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-4">
              Streamlined Commercial Lending
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Submit, Track &amp; Close Loan{" "}
              <span className="bg-primary/10 rounded px-1">Referrals</span> in
              Minutes
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Submit referral deals in under a minute, track every milestone in
              real time, and manage your lending pipeline end to end.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={destination}>
                  {userId ? "Open Dashboard" : "Get Started"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              {!userId && (
                <Button asChild variant="outline" size="lg">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Decorative faux-dashboard */}
          <div className="hidden md:block">
            <div className="rounded-xl border bg-card p-5 shadow-lg">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-md bg-muted p-3">
                  <div>
                    <p className="text-xs font-medium">Deal #DL-20260115-0024</p>
                    <p className="text-xs text-muted-foreground">
                      123 Main St &middot; Office
                    </p>
                  </div>
                  <Badge>In Progress</Badge>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted p-3">
                  <div>
                    <p className="text-xs font-medium">Deal #DL-20260112-0023</p>
                    <p className="text-xs text-muted-foreground">
                      456 Oak Ave &middot; Multifamily
                    </p>
                  </div>
                  <Badge variant="secondary">Closing</Badge>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted p-3">
                  <div>
                    <p className="text-xs font-medium">Deal #DL-20260110-0022</p>
                    <p className="text-xs text-muted-foreground">
                      789 Pine Rd &middot; Industrial
                    </p>
                  </div>
                  <Badge variant="outline">Submitted</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y bg-muted/30 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
          {[
            { value: "500+", label: "Deals Processed" },
            { value: "150+", label: "Active Partners" },
            { value: "$2B+", label: "Loan Volume" },
            { value: "98%", label: "Partner Satisfaction" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Built for Every Role in the Pipeline
          </h2>
          <p className="mt-3 text-muted-foreground">
            Whether you are submitting deals, tracking applications, or managing
            the entire pipeline — LoanRef has you covered.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Handshake,
              title: "Referral Partners",
              description:
                "Submit deals in under 60 seconds, track status in real time, and see your commission earnings at a glance.",
            },
            {
              icon: UserCheck,
              title: "Borrowers",
              description:
                "Track your loan application with clear timeline updates and milestone notifications — all in read-only mode.",
            },
            {
              icon: ShieldCheck,
              title: "Administrators",
              description:
                "Manage the full pipeline with Kanban boards, lender matching, commission tracking, and real-time reporting.",
            },
          ].map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
            From submission to close, LoanRef keeps every stakeholder informed.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                step: 1,
                icon: Send,
                title: "Submit a Deal",
                description:
                  "Partners fill out a quick form with property and borrower details.",
              },
              {
                step: 2,
                icon: GitPullRequestArrow,
                title: "We Match & Process",
                description:
                  "Our team reviews, assigns lenders, and manages the pipeline.",
              },
              {
                step: 3,
                icon: CircleDollarSign,
                title: "Close & Earn",
                description:
                  "Deals close, commissions are tracked, and everyone stays informed.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to Streamline Your Lending Pipeline?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Join hundreds of partners and start submitting deals today.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href={destination}>
              {userId ? "Open Dashboard" : "Get Started Free"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-muted">
              <Landmark className="h-3 w-3" />
            </div>
            <span className="text-xs font-medium">LoanRef</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} LoanRef. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
