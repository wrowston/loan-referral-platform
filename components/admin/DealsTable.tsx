import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DealRow = {
  id: string;
  dealNumber: string;
  borrower: string;
  amount: string;
  status: string;
};

export function DealsTable({ rows }: { rows: DealRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deal</TableHead>
          <TableHead>Borrower</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Link className="underline" href={`/admin/deals/${row.id}`}>
                {row.dealNumber}
              </Link>
            </TableCell>
            <TableCell>{row.borrower}</TableCell>
            <TableCell>{row.amount}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
