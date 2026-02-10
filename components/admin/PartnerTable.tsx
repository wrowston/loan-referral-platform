import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PartnerRow = {
  id: string;
  company: string;
  tier: string;
  totalDeals: number;
};

export function PartnerTable({ rows }: { rows: PartnerRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead>Total Deals</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Link className="underline" href={`/admin/partners/${row.id}`}>
                {row.company}
              </Link>
            </TableCell>
            <TableCell>{row.tier}</TableCell>
            <TableCell>{row.totalDeals}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
