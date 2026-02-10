type TimelineItem = {
  label: string;
  date: string;
};

export function StatusTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item) => (
        <li key={`${item.label}-${item.date}`} className="rounded border p-3">
          <div className="text-sm font-medium">{item.label}</div>
          <div className="text-xs text-muted-foreground">{item.date}</div>
        </li>
      ))}
    </ol>
  );
}
