"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function InternalNotes() {
  const [notes, setNotes] = useState<string[]>([]);
  const [value, setValue] = useState("");

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold">Internal Notes</h3>
      <Textarea value={value} onChange={(event) => setValue(event.target.value)} />
      <Button
        type="button"
        onClick={() => {
          if (!value.trim()) return;
          setNotes((prev) => [value, ...prev]);
          setValue("");
        }}
      >
        Add Note
      </Button>
      <ul className="space-y-2 text-sm">
        {notes.map((note, idx) => (
          <li key={`${note}-${idx}`} className="rounded border p-2">
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}
