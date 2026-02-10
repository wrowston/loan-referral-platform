"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Row = Record<string, string>;

export function CsvImport() {
  const [rows, setRows] = useState<Row[]>([]);

  const preview = useMemo(() => rows.slice(0, 5), [rows]);

  return (
    <div className="space-y-3">
      <Input
        type="file"
        accept=".csv"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          Papa.parse<Row>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              setRows(result.data);
            },
          });
        }}
      />
      <p className="text-sm text-muted-foreground">Rows parsed: {rows.length}</p>
      <div className="rounded border p-3 text-xs">
        {preview.length === 0 ? (
          <p>No preview yet</p>
        ) : (
          preview.map((row, index) => <pre key={index}>{JSON.stringify(row, null, 2)}</pre>)
        )}
      </div>
      <Button type="button">Import CSV</Button>
    </div>
  );
}
