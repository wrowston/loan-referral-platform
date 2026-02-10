import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";

const adminNav = [
  { href: "/admin", label: "Dashboard", iconName: "LayoutDashboard" },
  { href: "/admin/pipeline", label: "Pipeline", iconName: "Columns3" },
  { href: "/admin/deals", label: "Deals", iconName: "FileText" },
  { href: "/admin/partners", label: "Partners", iconName: "Users" },
  { href: "/admin/lenders", label: "Lenders", iconName: "Building2" },
  { href: "/admin/commissions", label: "Commissions", iconName: "DollarSign" },
  { href: "/admin/resources", label: "Resources", iconName: "BookOpen" },
  { href: "/admin/export", label: "Export", iconName: "Download" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Admin" items={adminNav} />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar title="Admin Dashboard" description="Manage deals, partners, and commissions" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
