import { KanbanColumn } from "@/components/admin/KanbanColumn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DEAL_STATUSES } from "@/lib/constants";

type DealCard = {
  dealNumber: string;
  borrowerName: string;
  amountCents: number;
  propertyType: string;
  status: (typeof DEAL_STATUSES)[number];
};

export function KanbanBoard({ deals }: { deals: DealCard[] }) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-4 pb-4">
        {DEAL_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            title={status.replaceAll("_", " ")}
            items={deals.filter((deal) => deal.status === status)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
