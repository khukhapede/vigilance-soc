interface TacticBarProps {
  code: string;
  label: string;
  count: number;
  maxCount: number;
}

export function TacticBar({ code, label, count, maxCount }: TacticBarProps) {
  const widthPct = Math.min(100, (count / maxCount) * 100);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-text-primary">
          {code} - {label}
        </span>
        <span className="font-mono text-xs text-text-secondary">
          {count.toLocaleString()}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded bg-bg-input">
        <div
          className="h-full rounded bg-accent-bright"
          style={{ width: `${widthPct}%` }}
        />
      </div>
    </div>
  );
}
