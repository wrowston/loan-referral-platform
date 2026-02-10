"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Lender = { id: string; name: string };

export function LenderAssignment({
  lenders,
  value,
  onChange,
}: {
  lenders: Lender[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Assign lender" />
      </SelectTrigger>
      <SelectContent>
        {lenders.map((lender) => (
          <SelectItem key={lender.id} value={lender.id}>
            {lender.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
