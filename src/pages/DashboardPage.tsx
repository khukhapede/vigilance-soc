import { TrendingUp, AtSign, Flame } from "lucide-react";
import ReactECharts from "echarts-for-react";
import { KpiCard } from "../components/dashboard/KpiCard";
import { ChartCard } from "../components/dashboard/ChartCard";
import { TacticBar } from "../components/dashboard/TacticBar";
import { chartColors, severityColors } from "../charts/colors";
import { alertVolumeOption } from "../charts/options/alertVolumeOption";
import { severityDonutOption } from "../charts/options/severityDonutOption";
import { useMetrics } from "../hooks/useMetrics";

const SEVERITY_ORDER = ["Critical", "High", "Medium", "Low"];

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

export function DashboardPage() {
  const { data: metrics, isLoading, isError } = useMetrics(7);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center font-mono text-sm text-text-secondary">
        Loading dashboard...
      </div>
    );
  }

  if (isError || !metrics) {
    return (
      <div className="flex h-full items-center justify-center font-mono text-sm text-critical">
        Failed to load dashboard metrics.
      </div>
    );
  }

  const criticalHighCount = metrics.severityBreakdown
    .filter((b) => b.name === "Critical" || b.name === "High")
    .reduce((sum, b) => sum + b.count, 0);

  const alertVolumeData = metrics.alertsPerDay.map((d) => ({
    time: formatDateLabel(d.date),
    count: d.count,
  }));

  const orderedSeverity = SEVERITY_ORDER.map((name) => ({
    name,
    value: metrics.severityBreakdown.find((b) => b.name === name)?.count ?? 0,
  }));

  const maxTacticCount = Math.max(...metrics.topTactics.map((t) => t.count), 1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-[32px] font-bold leading-10 tracking-[-0.64px] text-text-primary">
            Overview
          </h2>
          <span className="font-mono text-xs-label uppercase tracking-label-tight text-text-secondary">
            Global Operations Context
          </span>
        </div>
        <div className="flex gap-2">
          <button className="rounded border border-border px-[17px] py-[9px] font-heading text-sm font-semibold text-accent-bright">
            Last 7 Days
          </button>
          <button className="rounded bg-accent px-4 py-[9px] font-heading text-sm font-semibold text-white">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-4">
          <KpiCard
            label="Total Alerts"
            value={metrics.totalAlerts.toLocaleString()}
            icon={TrendingUp}
          />
        </div>
        <div className="col-span-4">
          <KpiCard
            label="Critical / High"
            value={criticalHighCount.toLocaleString()}
            icon={Flame}
            accentColor={chartColors.critical}
          />
        </div>
        <div className="col-span-4">
          <KpiCard
            label="Open Invst."
            value={metrics.openCount.toLocaleString()}
            icon={AtSign}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8">
          <ChartCard title="Alert Volume Over Time">
            <ReactECharts
              option={alertVolumeOption(alertVolumeData)}
              style={{ height: "100%" }}
            />
          </ChartCard>
        </div>
        <div className="col-span-4">
          <ChartCard title="Severity Distribution">
            <ReactECharts
              option={severityDonutOption(orderedSeverity)}
              style={{ height: 240 }}
            />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {orderedSeverity.map((d, i) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between rounded border border-border bg-bg-input px-2 py-1"
                >
                  <div className="flex items-center gap-1">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: severityColors[i] }}
                    />
                    <span className="font-mono text-xs text-text-primary">
                      {d.name}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-text-secondary">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <ChartCard title="Top MITRE Tactics Triggered">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {metrics.topTactics.map((t) => (
            <TacticBar
              key={t.tactic}
              label={t.tactic}
              count={t.count}
              maxCount={maxTacticCount}
            />
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
