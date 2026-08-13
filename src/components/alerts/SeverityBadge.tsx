import { Flame, TriangleAlert, CircleAlert, Info } from "lucide-react";
import type { Severity } from "../../types/alert";
import { chartColors } from "../../charts/colors";

const config: Record<Severity, { icon: typeof Flame; color: string }> = {
  critical: { icon: Flame, color: chartColors.critical },
  high: { icon: TriangleAlert, color: chartColors.high },
  medium: { icon: CircleAlert, color: chartColors.medium },
  info: { icon: Info, color: chartColors.info },
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  const { icon: Icon, color } = config[severity];
  return (
    <div
      className="flex size-6 items-center justify-center rounded-full"
      style={{ backgroundColor: `${color}26`, color }}
    >
      <Icon className="size-3.5" strokeWidth={2.5} />
    </div>
  );
}
