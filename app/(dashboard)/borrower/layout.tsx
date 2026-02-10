import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";

const borrowerNav = [
  { href: "/borrower", label: "My Applications", iconName: "ClipboardList" },
];

export default function BorrowerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Borrower Portal" items={borrowerNav} />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar title="Borrower Portal" description="Track your loan applications" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
