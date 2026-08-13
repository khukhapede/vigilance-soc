export interface AlertsPerDayPoint {
    date: string;
    count: number;
}

export interface TopTechnique {
    techniqueId: string;
    name: string;
    count: number;
}

export interface SeverityBucket {
    name: string;
    count: number;
}

export interface TopTactic {
    tactic: string;
    count: number;
}

export interface DashboardMetrics {
    totalAlerts: number;
    triagedCount: number;
    openCount: number;
    topTechnique: TopTechnique | null;
    alertsPerDay: AlertsPerDayPoint[];
    topTechniques: TopTechnique[];
    severityBreakdown: SeverityBucket[];
    topTactics: TopTactic[];
}