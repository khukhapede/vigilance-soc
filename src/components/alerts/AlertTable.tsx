import type { Alert } from "../../types/alert";
import { deriveSeverity, getDispositionStatus } from "../../types/alert";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";

interface AlertTableProps {
  alerts: Alert[];
  selectedId: string | null;
  onSelect: (alert: Alert) => void;
}

export function AlertTable({ alerts, selectedId, onSelect }: AlertTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border font-mono text-xs-label uppercase tracking-label-tight text-text-secondary">
          <th className="w-12 py-3 text-left font-normal">Sev</th>
          <th className="w-16 py-3 text-left font-normal">Score</th>
          <th className="w-44 py-3 text-left font-normal">Timestamp (UTC)</th>
          <th className="w-32 py-3 text-left font-normal">Source/Agent</th>
          <th className="py-3 text-left font-normal">Rule Description</th>
          <th className="w-28 py-3 text-left font-normal">Status</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((alert) => (
          <tr
            key={alert.id}
            onClick={() => onSelect(alert)}
            className={`group cursor-pointer border-b border-border font-mono text-sm hover:bg-bg-input ${
              selectedId === alert.id ? "bg-bg-input" : ""
            }`}
          >
            <td className="py-3">
              <SeverityBadge
                severity={deriveSeverity(alert.score.finalScore)}
              />
            </td>
            <td className="py-3 font-bold text-text-primary">
              {Math.round(alert.score.finalScore * 100)}
            </td>
            <td className="py-3 text-text-secondary">
              {alert.alertTime ?? "—"}
            </td>
            <td className="py-3 text-text-primary">{alert.agentName ?? "—"}</td>
            <td className="py-3 text-text-primary">
              <span className="line-clamp-1">
                {alert.ruleDescription ?? "—"}
              </span>
            </td>
            <td className="py-3">
              <StatusBadge status={getDispositionStatus(alert.disposition)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
