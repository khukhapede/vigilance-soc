import { apiClient } from '../lib/apiClient';
import type { Alert, AlertsQueryParams, PaginatedAlerts } from '../types/alert';

export async function fetchAlerts(params: AlertsQueryParams): Promise<PaginatedAlerts> {
    const { data } = await apiClient.get<PaginatedAlerts>('/alerts', { params });
    return {
        ...data,
        page: Number(data.page),
        limit: Number(data.limit),
    };
}

export async function fetchAlertById(id: string): Promise<Alert> {
    const { data } = await apiClient.get<Alert>(`/alerts/${id}`);
    return data;
}