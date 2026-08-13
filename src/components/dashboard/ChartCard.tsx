import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  headerRight,
  children,
  className = "",
}: ChartCardProps) {
  return (
    <div
      className={`flex h-full flex-col rounded border border-border bg-bg-surface ${className}`}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <h3 className="font-heading text-lg-heading font-semibold text-text-primary">
          {title}
        </h3>
        {headerRight}
      </div>
      <div className="flex flex-1 flex-col p-4">{children}</div>
    </div>
  );
}
