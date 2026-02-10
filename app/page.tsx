import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const { sessionClaims, userId } = await auth();
  const role = (sessionClaims?.metadata as { role?: "partner" | "borrower" | "admin" } | undefined)
    ?.role;

  const destination = role === "admin"
    ? "/admin"
    : role === "borrower"
      ? "/borrower"
      : role === "partner"
        ? "/partner"
        : userId
          ? "/select-role"
          : "/sign-in";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Commercial Loan Referral Platform</h1>
        <p className="max-w-2xl text-muted-foreground">
          Submit referral deals in under a minute, track every milestone in real time, and manage your
          lending pipeline end to end.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={destination}>{userId ? "Open Dashboard" : "Sign In"}</Link>
        </Button>
        {!userId ? (
          <Button asChild variant="outline">
            <Link href="/sign-up">Create Account</Link>
          </Button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Partners</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Fast deal submission, live statuses, and commission visibility.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Borrowers</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Read-only application tracking with clear timeline updates.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admins</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Real-time Kanban pipeline, notes, lender assignments, and reporting.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
