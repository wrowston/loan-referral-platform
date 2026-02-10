import { UserButton } from "@clerk/nextjs";

type TopBarProps = {
  title: string;
  description?: string;
};

export function TopBar({ title, description }: TopBarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-sm font-semibold leading-none">{title}</h1>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}
