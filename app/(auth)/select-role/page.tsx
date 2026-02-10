"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setUserRole } from "./actions";

const roles = [
  {
    value: "partner" as const,
    title: "Partner",
    description: "Submit referral deals, track statuses, and earn commissions.",
  },
  {
    value: "borrower" as const,
    title: "Borrower",
    description: "Track your loan applications and view timeline updates.",
  },
];

export default function SelectRolePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<"partner" | "borrower" | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!selected) return;
    setLoading(true);
    try {
      await setUserRole(selected);
      router.push(selected === "partner" ? "/partner" : "/borrower");
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold">Choose your role</h1>
        <p className="text-sm text-muted-foreground">Select how you&apos;ll use the platform.</p>
      </div>

      <div className="grid gap-3">
        {roles.map((role) => (
          <Card
            key={role.value}
            className={`cursor-pointer transition-colors ${
              selected === role.value
                ? "border-primary ring-2 ring-primary/20"
                : "hover:border-foreground/20"
            }`}
            onClick={() => setSelected(role.value)}
          >
            <CardHeader className="pb-1">
              <CardTitle className="text-base">{role.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full" disabled={!selected || loading} onClick={handleContinue}>
        {loading ? "Setting up..." : "Continue"}
      </Button>
    </div>
  );
}
