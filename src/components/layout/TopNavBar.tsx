import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Radio, CircleUserRound, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

interface TopNavBarProps {
  title: string;
}

export function TopNavBar({ title }: TopNavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  // Close the dropdown when clicking outside it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-bg-page px-6">
      <h1 className="font-heading text-lg-heading font-bold leading-7 text-accent-bright">
        {title}
      </h1>

      <div className="relative max-w-[448px] flex-1">
        <Search className="absolute left-2 top-1/2 size-[13.5px] -translate-y-1/2 text-text-placeholder" />
        <input
          type="text"
          placeholder="Search alerts, rules, hosts, IP, hash..."
          className="w-full rounded border border-border bg-bg-input py-[7px] pl-8 pr-3 font-mono text-[11px] text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-1 focus:ring-accent-bright"
        />
      </div>

      <div className="flex items-center gap-1">
        <button className="flex size-8 items-center justify-center rounded hover:bg-bg-surface">
          <Bell className="size-4 text-text-secondary" />
        </button>
        <button className="flex size-8 items-center justify-center rounded hover:bg-bg-surface">
          <Radio className="size-[19px] text-text-secondary" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex size-8 items-center justify-center rounded hover:bg-bg-surface"
          >
            <CircleUserRound className="size-5 text-text-secondary" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-10 w-48 rounded border border-border bg-bg-surface py-1 shadow-lg">
              {username && (
                <div className="border-b border-border px-3 py-2">
                  <span className="font-mono text-xs text-text-secondary">
                    Signed in as
                  </span>
                  <p className="truncate font-mono text-sm font-medium text-text-primary">
                    {username}
                  </p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 font-mono text-sm text-critical hover:bg-bg-input"
              >
                <LogOut className="size-3.5" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
