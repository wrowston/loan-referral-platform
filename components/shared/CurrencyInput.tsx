"use client";

import { Input } from "@/components/ui/input";

type CurrencyInputProps = {
  valueCents: number;
  onChangeCents: (value: number) => void;
};

export function CurrencyInput({ valueCents, onChangeCents }: CurrencyInputProps) {
  return (
    <Input
      inputMode="decimal"
      value={(valueCents / 100).toFixed(2)}
      onChange={(event) => {
        const parsed = Number.parseFloat(event.target.value || "0");
        if (Number.isFinite(parsed)) {
          onChangeCents(Math.round(parsed * 100));
        }
      }}
      placeholder="0.00"
    />
  );
}
