import { UserButton } from "@clerk/nextjs";

type TopBarProps = {
  title: string;
};

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-base font-semibold">{title}</h1>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}
