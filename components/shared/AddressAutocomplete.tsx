"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";

type AddressAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (payload: { address: string; lat?: number; lng?: number }) => void;
};

export function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelect,
}: AddressAutocompleteProps) {
  const apiLoaded = useMemo(() => Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY), []);

  return (
    <div className="space-y-2">
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="123 Main St, City, ST"
      />
      {apiLoaded ? (
        <p className="text-xs text-muted-foreground">
          Google Maps API key detected. Address autocomplete can be enhanced here.
        </p>
      ) : (
        <p className="text-xs text-amber-600">
          Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to enable full autocomplete behavior.
        </p>
      )}
      <button
        type="button"
        className="text-xs text-primary underline-offset-4 hover:underline"
        onClick={() => onPlaceSelect?.({ address: value })}
      >
        Use typed address
      </button>
    </div>
  );
}
