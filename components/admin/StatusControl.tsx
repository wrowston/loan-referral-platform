"use client";

import { DEAL_STATUSES } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type StatusControlProps = {
  status: string;
  onStatusChange?: (status: string) => void;
};

export function StatusControl({ status, onStatusChange }: StatusControlProps) {
  return (
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger className="w-60">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {DEAL_STATUSES.map((item) => (
          <SelectItem key={item} value={item}>
            {item.replaceAll("_", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
