"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CommissionForm() {
  const [amount, setAmount] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Set Commission</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Commission Amount</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          <Label>Amount (USD)</Label>
          <Input value={amount} onChange={(event) => setAmount(event.target.value)} />
        </div>
        <Button type="button">Save</Button>
      </DialogContent>
    </Dialog>
  );
}
