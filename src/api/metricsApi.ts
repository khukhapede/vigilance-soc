import { apiClient } from '../lib/apiClient';
import type { DashboardMetrics } from '../types/metrics';

export async function fetchMetrics(days: number = 7): Promise<DashboardMetrics> {
    const { data } = await apiClient.get<DashboardMetrics>('/metrics', {
        params: { days },
    });
    return data;
}