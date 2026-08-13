import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  /** 'bad' = red text even though value went up (e.g. more alerts is bad) */
  trendSentiment?: "good" | "bad" | "neutral";
  /** Colored left border, used only on the Critical/High card */
  accentColor?: string;
  /** Optional slot for a sparkline chart at the bottom of the card */
  children?: ReactNode;
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  trendDirection = "neutral",
  trendSentiment = "neutral",
  accentColor,
  children,
}: KpiCardProps) {
  const trendColor =
    trendSentiment === "good"
      ? "text-accent-bright"
      : trendSentiment === "bad"
        ? "text-critical-light"
        : "text-text-secondary";

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded border border-border bg-bg-surface p-4">
      {accentColor && (
        <div
          className="absolute bottom-0 left-0 top-0 w-[3px]"
          style={{ backgroundColor: accentColor }}
        />
      )}

      <div className="flex items-start justify-between pb-4">
        <span className="font-mono text-xs-label uppercase tracking-label text-text-secondary">
          {label}
        </span>
        <Icon className="size-[15px] text-text-secondary" strokeWidth={2} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-mono text-2xl-kpi font-bold leading-10 tracking-[-0.64px] text-text-primary">
          {value}
        </span>
        {trend && (
          <div className="flex items-center gap-1">
            {trendDirection === "up" && (
              <span className="text-[10px] leading-none">▲</span>
            )}
            {trendDirection === "down" && (
              <span className="text-[10px] leading-none">▼</span>
            )}
            <span className={`font-mono text-xs-label ${trendColor}`}>
              {trend}
            </span>
          </div>
        )}
      </div>

      {children && (
        <div className="absolute inset-x-0 bottom-0 h-12">{children}</div>
      )}
    </div>
  );
}
