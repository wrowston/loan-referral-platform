import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";

const partnerNav = [
  { href: "/partner", label: "Dashboard", iconName: "LayoutDashboard" },
  { href: "/partner/deals", label: "Deals", iconName: "FileText" },
  { href: "/partner/deals/new", label: "Submit Deal", iconName: "PlusCircle" },
  { href: "/partner/commissions", label: "Commissions", iconName: "DollarSign" },
  { href: "/partner/resources", label: "Resources", iconName: "BookOpen" },
  { href: "/partner/profile", label: "Profile", iconName: "UserCircle" },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Partner Portal" items={partnerNav} />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar title="Partner Portal" description="Submit deals and track commissions" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
