import { TrendingUp, AtSign, Timer, Flame } from "lucide-react";
import ReactECharts from "echarts-for-react";
import { KpiCard } from "../components/dashboard/KpiCard";
import { ChartCard } from "../components/dashboard/ChartCard";
import { TacticBar } from "../components/dashboard/TacticBar";
import { chartColors, severityColors } from "../charts/colors";
import {
  alertVolumeOption,
  type AlertVolumePoint,
} from "../charts/options/alertVolumeOption";
import {
  severityDonutOption,
  type SeverityDatum,
} from "../charts/options/severityDonutOption";
import { sparklineOption } from "../charts/options/sparklineOption";

// Placeholder data — replace with real API data in Chapter 7
const alertVolumeData: AlertVolumePoint[] = [
  { time: "00:00", count: 200 },
  { time: "04:00", count: 340 },
  { time: "08:00", count: 600 },
  { time: "12:00", count: 460 },
  { time: "16:00", count: 810 },
  { time: "20:00", count: 430 },
  { time: "24:00", count: 700 },
];

const severityData: SeverityDatum[] = [
  { name: "Critical", value: 10 },
  { name: "High", value: 20 },
  { name: "Medium", value: 30 },
  { name: "Info", value: 40 },
];

const sparklineData = [200, 250, 180, 340, 300, 420, 380, 460];

const tacticData = [
  { code: "TA0001", label: "Initial Access", count: 3492 },
  { code: "TA0002", label: "Execution", count: 2814 },
  { code: "TA0005", label: "Defense Evasion", count: 2105 },
  { code: "TA0008", label: "Lateral Movement", count: 1532 },
  { code: "TA0040", label: "Impact", count: 943 },
  { code: "TA0011", label: "Command and Control", count: 612 },
];
const maxTacticCount = Math.max(...tacticData.map((t) => t.count));

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
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
            Last 24 Hours
          </button>
          <button className="rounded bg-accent px-4 py-[9px] font-heading text-sm font-semibold text-white">
            Export
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3">
          <KpiCard
            label="Total Alerts"
            value="14,289"
            icon={TrendingUp}
            trend="+12.4% vs prev"
            trendDirection="up"
            trendSentiment="bad"
          >
            <ReactECharts
              option={sparklineOption(sparklineData)}
              style={{ height: 48 }}
              opts={{ renderer: "svg" }}
            />
          </KpiCard>
        </div>
        <div className="col-span-3">
          <KpiCard
            label="Critical / High"
            value="342"
            icon={Flame}
            trend="-5.2% vs prev"
            trendDirection="down"
            trendSentiment="good"
            accentColor={chartColors.critical}
          />
        </div>
        <div className="col-span-3">
          <KpiCard
            label="Open Invst."
            value="89"
            icon={AtSign}
            trend="— No change"
            trendSentiment="neutral"
          />
        </div>
        <div className="col-span-3">
          <KpiCard
            label="MTTD"
            value="18m 42s"
            icon={Timer}
            trend="-2m 10s vs avg"
            trendDirection="down"
            trendSentiment="good"
          />
        </div>
      </div>

      {/* Charts row */}
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
              option={severityDonutOption(severityData)}
              style={{ height: 240 }}
            />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {severityData.map((d, i) => (
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
                    {d.value}%
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Top MITRE Tactics */}
      <ChartCard
        title="Top MITRE Tactics Triggered"
        headerRight={
          <button className="font-mono text-xs-label uppercase tracking-label-tight text-accent-bright">
            View Matrix →
          </button>
        }
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {tacticData.map((t) => (
            <TacticBar
              key={t.code}
              code={t.code}
              label={t.label}
              count={t.count}
              maxCount={maxTacticCount}
            />
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
