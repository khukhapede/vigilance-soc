import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Shield } from "lucide-react";
import { login } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { accessToken } = await login({ username, password });
      setToken(accessToken);
      navigate("/");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-bg-page px-4">
      <div className="flex w-full max-w-[400px] flex-col gap-6 rounded border border-border bg-bg-surface p-[25px]">
        <div className="flex flex-col items-center gap-2 pb-2">
          <div className="flex size-12 shrink-0 items-center justify-center rounded bg-accent">
            <Shield className="size-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading text-[20px] font-bold leading-7 tracking-[-0.5px] text-accent-bright">
              Vigilance SOC
            </span>
            <span className="font-mono text-xs text-text-secondary">
              Precision Monitoring
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-mono text-xs-label font-bold uppercase tracking-label text-text-secondary">
              Email or Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="operator@vigilance.soc"
              required
              className="rounded border border-border bg-bg-input px-[17px] py-[11px] font-mono text-[13px] text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-1 focus:ring-accent-bright"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-mono text-xs-label font-bold uppercase tracking-label text-text-secondary">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full rounded border border-border bg-bg-input py-[11px] pl-[17px] pr-[49px] font-mono text-[13px] text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-1 focus:ring-accent-bright"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="size-4 rounded border border-border bg-bg-input accent-accent"
              />
              <span className="font-mono text-xs text-text-secondary">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="font-mono text-xs text-accent-bright hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {error && <p className="font-mono text-xs text-critical">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 rounded bg-accent py-3 font-heading text-lg font-semibold text-text-primary disabled:opacity-60"
          >
            <LogIn className="size-[15px]" />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      <p className="font-mono text-xs text-text-secondary/70">
        Vigilance SOC v1.0 — Authorized personnel only
      </p>
    </div>
  );
}
