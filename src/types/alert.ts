export type DispositionStatus = 'open' | 'reviewed' | 'false_positive' | 'escalated';

export interface MitreTechnique {
  techniqueId: string;
  tactic: string;
  name: string;
  description: string | null;
}

export interface AlertTechnique {
  technique: MitreTechnique;
}

export interface AlertScore {
  severityScore: number;
  techniqueScore: number;
  frequencyScore: number;
  finalScore: number;
}

export interface AlertDisposition {
  status: DispositionStatus;
  analyst: string | null;
  notes: string | null;
  updatedAt: string;
}

export interface Alert {
  id: string;
  ruleId: number;
  ruleLevel: number;
  ruleDescription: string | null;
  rawPayload: Record<string, unknown>;
  agentName: string | null;
  alertTime: string | null;
  createdAt: string;
  score: AlertScore;
  disposition: AlertDisposition | null; // no disposition row exists until an analyst triages it
  alertTechniques?: AlertTechnique[];
}

export interface PaginatedAlerts {
  data: Alert[];
  total: number;
  page: number;
  limit: number;
}

export interface AlertsQueryParams {
  page?: number;
  limit?: number;
  status?: DispositionStatus | 'open';
  minScore?: number;
  startDate?: string;
  endDate?: string;
  timeSort?: 'ASC' | 'DESC';
}

// Recalibrated against real score distribution (observed range ~0.15–0.66).
// Still placeholder — revisit once more alert volume/variety is available.
export type Severity = 'critical' | 'high' | 'medium' | 'info';

export function deriveSeverity(finalScore: number): Severity {
  if (finalScore >= 0.6) return 'critical';
  if (finalScore >= 0.4) return 'high';
  if (finalScore >= 0.25) return 'medium';
  return 'info';
}

// Treat "no disposition row yet" the same as an explicit 'open' status
export function getDispositionStatus(disposition: AlertDisposition | null): DispositionStatus {
  return disposition?.status ?? 'open';
}