import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, X } from "lucide-react";
import type { Alert, DispositionStatus } from "../../types/alert";
import { getDispositionStatus } from "../../types/alert";
import { updateDisposition } from "../../api/alertsApi";

const statusOptions: DispositionStatus[] = [
  "open",
  "reviewed",
  "false_positive",
  "escalated",
];

interface AlertDetailPanelProps {
  alert: Alert;
  onClose: () => void;
}

export function AlertDetailPanel({ alert, onClose }: AlertDetailPanelProps) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<DispositionStatus>(
    getDispositionStatus(alert.disposition),
  );
  const [notes, setNotes] = useState(alert.disposition?.notes ?? "");

  // Re-sync local state whenever a different alert is selected
  useEffect(() => {
    setStatus(getDispositionStatus(alert.disposition));
    setNotes(alert.disposition?.notes ?? "");
  }, [alert.id, alert.disposition]);

  const mutation = useMutation({
    mutationFn: () => updateDisposition(alert.id, { status, notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      queryClient.invalidateQueries({ queryKey: ["alert", alert.id] });
    },
  });

  return (
    <div className="flex h-full min-h-0 w-[400px] shrink-0 flex-col gap-4 overflow-y-auto overflow-x-hidden border-l border-border p-4">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-heading text-lg-heading font-bold text-text-primary">
          {alert.ruleDescription ?? "Untitled Alert"}
        </h2>
        <button
          onClick={onClose}
          className="shrink-0 rounded p-1 text-text-secondary hover:bg-bg-input hover:text-text-primary"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="shrink-0 rounded border border-border bg-bg-surface p-4">
        <span className="font-mono text-xs-label uppercase tracking-label-tight text-text-secondary">
          Risk Score Breakdown
        </span>
        <div className="mt-2 flex items-center gap-4">
          <span className="font-mono text-2xl-kpi font-bold text-critical">
            {Math.round(alert.score.finalScore * 100)}
          </span>
          <div className="flex flex-1 flex-col gap-1 font-mono text-xs text-text-secondary">
            <div className="flex justify-between">
              <span>Severity Base:</span>
              <span>{alert.score.severityScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Technique Multiplier:</span>
              <span>+{alert.score.techniqueScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Frequency/Anomaly:</span>
              <span>+{alert.score.frequencyScore}</span>
            </div>
          </div>
        </div>
      </div>

      {alert.alertTechniques && alert.alertTechniques.length > 0 && (
        <div className="flex shrink-0 flex-wrap gap-1">
          {alert.alertTechniques.map(({ technique }) => (
            <span
              key={technique.techniqueId}
              className="rounded border border-border px-1.5 py-0.5 font-mono text-xs text-text-secondary"
            >
              {technique.techniqueId} — {technique.name}
            </span>
          ))}
        </div>
      )}

      <div className="grid shrink-0 grid-cols-2 gap-3">
        <div className="rounded border border-border bg-bg-surface p-3">
          <span className="font-mono text-xs text-text-secondary">
            Agent / Source
          </span>
          <p className="font-mono text-sm text-text-primary">
            {alert.agentName ?? "—"}
          </p>
        </div>
        <div className="rounded border border-border bg-bg-surface p-3">
          <span className="font-mono text-xs text-text-secondary">
            Timestamp
          </span>
          <p className="font-mono text-sm text-text-primary">
            {alert.alertTime ?? "—"}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs-label uppercase tracking-label-tight text-text-secondary">
            Raw Decoded Payload
          </span>
          <button className="flex items-center gap-1 font-mono text-xs text-accent-bright">
            <Copy className="size-3" /> Copy
          </button>
        </div>
        <pre className="shrink-0 whitespace-pre-wrap break-all rounded border border-border bg-bg-input p-3 font-mono text-xs text-text-secondary">
          {JSON.stringify(alert.rawPayload, null, 2)}
        </pre>
      </div>

      <div className="shrink-0">
        <label className="font-mono text-xs-label font-bold uppercase tracking-label-tight text-text-secondary">
          Disposition Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as DispositionStatus)}
          className="mt-1 w-full rounded border border-border bg-bg-input px-3 py-2 font-mono text-sm text-text-primary"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Add investigation notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="h-24 w-full shrink-0 resize-none rounded border border-border bg-bg-input p-3 font-mono text-sm text-text-primary placeholder:text-text-placeholder"
      />

      {mutation.isError && (
        <p className="shrink-0 font-mono text-xs text-critical">
          Failed to update. Please try again.
        </p>
      )}

      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        className="shrink-0 rounded bg-accent py-2.5 font-heading text-sm font-semibold text-white disabled:opacity-60"
      >
        {mutation.isPending ? "Updating..." : "Update Alert"}
      </button>
    </div>
  );
}
