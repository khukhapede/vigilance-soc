import type { DispositionStatus } from "../../types/alert";

const config: Record<DispositionStatus, { label: string; className: string }> =
  {
    open: { label: "Open", className: "bg-info/15 text-info" },
    reviewed: {
      label: "Reviewed",
      className: "bg-accent-bright/15 text-accent-bright",
    },
    false_positive: {
      label: "False Positive",
      className: "bg-text-secondary/15 text-text-secondary",
    },
    escalated: {
      label: "Escalated",
      className: "bg-critical/15 text-critical",
    },
  };

export function StatusBadge({ status }: { status: DispositionStatus }) {
  const { label, className } = config[status];
  return (
    <span
      className={`rounded px-2 py-0.5 font-mono text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
