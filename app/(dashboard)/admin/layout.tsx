import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pipeline", label: "Pipeline" },
  { href: "/admin/deals", label: "Deals" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/lenders", label: "Lenders" },
  { href: "/admin/commissions", label: "Commissions" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/export", label: "Export" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Admin Dashboard" items={adminNav} />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar title="Admin Dashboard" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
