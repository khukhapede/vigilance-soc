import { Filter, Download, X } from "lucide-react";

interface FilterBarProps {
  activeFilters: { label: string }[];
  onRemoveFilter: (label: string) => void;
}

export function FilterBar({ activeFilters, onRemoveFilter }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-border p-4">
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-text-primary">
          <Filter className="size-3.5" />
          Filter
        </button>
        <div className="h-4 w-px bg-border" />
        {activeFilters.map((f) => (
          <span
            key={f.label}
            className="flex items-center gap-1.5 rounded border border-border bg-bg-input px-2.5 py-1 font-mono text-xs text-text-primary"
          >
            {f.label}
            <button onClick={() => onRemoveFilter(f.label)}>
              <X className="size-3 text-text-secondary hover:text-text-primary" />
            </button>
          </span>
        ))}
      </div>
      <button className="flex items-center gap-1.5 rounded bg-accent px-3 py-1.5 font-heading text-xs font-semibold text-white">
        <Download className="size-3.5" />
        Export CSV
      </button>
    </div>
  );
}
