"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export type SidebarItem = {
  href: string;
  label: string;
};

type SidebarProps = {
  title: string;
  items: SidebarItem[];
};

export function Sidebar({ title, items }: SidebarProps) {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed top-3 left-3 z-40 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Open navigation">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-1">
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                      active && "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <aside className="hidden h-full w-64 border-r bg-card md:block">
        <div className="border-b p-4 text-sm font-semibold">{title}</div>
        <nav className="space-y-1 p-2">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                  active && "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
