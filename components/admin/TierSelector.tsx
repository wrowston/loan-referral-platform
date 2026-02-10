"use client";

import { PARTNER_TIERS } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TierSelector({ value, onChange }: { value: string; onChange?: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {PARTNER_TIERS.map((tier) => (
          <SelectItem key={tier} value={tier}>
            {tier}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
