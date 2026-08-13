import { useState } from "react";
import { FilterBar } from "../components/alerts/FilterBar";
import { AlertTable } from "../components/alerts/AlertTable";
import { AlertDetailPanel } from "../components/alerts/AlertDetailPanel";
import { useAlerts, useAlert } from "../hooks/useAlerts";

export function AlertsPage() {
  const [page, setPage] = useState(1);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const limit = 20;

  const { data, isLoading, isError } = useAlerts({
    page,
    limit,
    timeSort: "DESC",
  });
  const { data: selectedAlert } = useAlert(selectedAlertId);

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <div className="flex h-full min-h-0 overflow-hidden rounded border border-border">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <FilterBar activeFilters={[]} onRemoveFilter={() => {}} />

        <div className="min-h-0 flex-1 overflow-auto px-4">
          {isLoading && (
            <div className="flex h-full items-center justify-center font-mono text-sm text-text-secondary">
              Loading alerts...
            </div>
          )}
          {isError && (
            <div className="flex h-full items-center justify-center font-mono text-sm text-critical">
              Failed to load alerts.
            </div>
          )}
          {data && (
            <AlertTable
              alerts={data.data}
              selectedId={selectedAlertId}
              onSelect={(alert) => setSelectedAlertId(alert.id)}
            />
          )}
        </div>

        {data && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3 font-mono text-xs text-text-secondary">
            <span>
              Page {data.page} of {totalPages} ({data.total} alerts)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded border border-border px-2 py-1 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded border border-border px-2 py-1 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedAlert && (
        <AlertDetailPanel
          alert={selectedAlert}
          onClose={() => setSelectedAlertId(null)}
        />
      )}
    </div>
  );
}
