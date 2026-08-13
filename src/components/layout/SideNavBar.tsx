import {
  LayoutGrid,
  TriangleAlert,
  Shield,
  CircleCheck,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/alerts", label: "Alerts", icon: TriangleAlert },
  { to: "/mitre-coverage", label: "MITRE Coverage", icon: Shield },
  { to: "/dispositions", label: "Dispositions", icon: CircleCheck },
];

interface SideNavBarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function SideNavBar({ collapsed, onToggle }: SideNavBarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 rounded border-l-2 py-2 font-mono text-sm transition-colors ${
      collapsed ? "justify-center px-0" : "pl-[18px] pr-4"
    } ${
      isActive
        ? "border-accent-bright bg-[#212a39] font-bold text-accent-bright"
        : "border-transparent text-text-secondary hover:text-text-primary"
    }`;

  return (
    <aside
      className={`flex h-screen flex-col border-r border-border bg-bg-surface py-4 transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Header / logo */}
      <div
        className={`flex items-center gap-2 pb-6 ${collapsed ? "justify-center px-0" : "px-4"}`}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded bg-accent">
          <Shield className="size-4 text-white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="whitespace-nowrap font-heading text-[20px] font-bold leading-7 tracking-[-0.5px] text-accent-bright">
              Vigilance SOC
            </span>
            <span className="whitespace-nowrap font-mono text-xs text-text-secondary">
              Precision Monitoring
            </span>
          </div>
        )}
      </div>

      {/* Collapse/expand toggle */}
      <div className={`mb-2 ${collapsed ? "px-0 text-center" : "px-2"}`}>
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 rounded py-2 font-mono text-xs text-text-secondary hover:bg-bg-input hover:text-text-primary ${
            collapsed ? "w-full justify-center" : "w-full px-2"
          }`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
          {!collapsed && "Collapse"}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-1 px-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={linkClass}
            title={collapsed ? label : undefined}
          >
            <Icon className="size-[18px] shrink-0" strokeWidth={2} />
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
        ))}

        {/* Settings pinned to bottom */}
        <div className="mt-auto">
          <NavLink
            to="/settings"
            className={linkClass}
            title={collapsed ? "Settings" : undefined}
          >
            <Settings className="size-[18px] shrink-0" strokeWidth={2} />
            {!collapsed && <span className="whitespace-nowrap">Settings</span>}
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
