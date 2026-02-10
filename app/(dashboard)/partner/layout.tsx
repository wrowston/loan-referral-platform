import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";

const partnerNav = [
  { href: "/partner", label: "Dashboard" },
  { href: "/partner/deals", label: "Deals" },
  { href: "/partner/deals/new", label: "Submit Deal" },
  { href: "/partner/commissions", label: "Commissions" },
  { href: "/partner/resources", label: "Resources" },
  { href: "/partner/profile", label: "Profile" },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Partner Portal" items={partnerNav} />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar title="Partner Portal" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
