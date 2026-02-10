"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Landmark,
  Menu,
  LayoutDashboard,
  Columns3,
  FileText,
  Users,
  Building2,
  DollarSign,
  BookOpen,
  Download,
  PlusCircle,
  UserCircle,
  ClipboardList,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Columns3,
  FileText,
  Users,
  Building2,
  DollarSign,
  BookOpen,
  Download,
  PlusCircle,
  UserCircle,
  ClipboardList,
};

export type SidebarItem = {
  href: string;
  label: string;
  iconName?: string;
};

type SidebarProps = {
  title: string;
  items: SidebarItem[];
};

function NavItems({ items, pathname }: { items: SidebarItem[]; pathname: string }) {
  return (
    <>
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.iconName ? iconMap[item.iconName] : undefined;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
              active && "border-l-2 border-primary bg-accent font-medium text-foreground",
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function Sidebar({ title, items }: SidebarProps) {
  const pathname = usePathname();
  return (
    <>
      {/* Mobile trigger */}
      <div className="fixed top-3 left-3 z-40 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Open navigation">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0">
            <SheetHeader className="border-b p-0">
              <SheetTitle className="flex h-16 items-center gap-2.5 px-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Landmark className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-bold tracking-tight">LoanRef</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="space-y-1 p-3">
              <NavItems items={items} pathname={pathname} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden h-full w-60 flex-col border-r bg-card md:flex">
        <div className="flex h-16 items-center gap-2.5 border-b px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Landmark className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold tracking-tight">LoanRef</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          <NavItems items={items} pathname={pathname} />
        </nav>
      </aside>
    </>
  );
}
