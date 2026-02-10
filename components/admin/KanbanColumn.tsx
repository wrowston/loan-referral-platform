import { KanbanCard } from "@/components/admin/KanbanCard";
import type { DealStatus } from "@/lib/constants";

type Item = {
  dealNumber: string;
  borrowerName: string;
  amountCents: number;
  propertyType: string;
  status: DealStatus;
};

type KanbanColumnProps = {
  title: string;
  items: Item[];
};

export function KanbanColumn({ title, items }: KanbanColumnProps) {
  return (
    <section className="w-72 space-y-3 rounded-lg border bg-muted/30 p-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground">No deals</p>
        ) : (
          items.map((item) => <KanbanCard key={item.dealNumber} {...item} />)
        )}
      </div>
    </section>
  );
}
