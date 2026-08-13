import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AlertsPage } from "./pages/AlertsPage";

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex h-full items-center justify-center rounded border border-dashed border-border font-mono text-text-secondary">
      {name} — coming in a later chapter
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell title="Alert Triage">
                <DashboardPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <AppShell title="Alert Triage">
                <AlertsPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mitre-coverage"
          element={
            <ProtectedRoute>
              <AppShell title="Alert Triage">
                <Placeholder name="MITRE Coverage" />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dispositions"
          element={
            <ProtectedRoute>
              <AppShell title="Alert Triage">
                <Placeholder name="Dispositions" />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppShell title="Alert Triage">
                <Placeholder name="Settings" />
              </AppShell>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
