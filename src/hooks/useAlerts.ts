import { useQuery } from '@tanstack/react-query';
import { fetchAlerts, fetchAlertById } from '../api/alertsApi';
import type { AlertsQueryParams } from '../types/alert';

export function useAlerts(params: AlertsQueryParams) {
    return useQuery({
        queryKey: ['alerts', params],
        queryFn: () => fetchAlerts(params),
        placeholderData: (previousData) => previousData, // keeps old page visible while fetching the next
    });
}

export function useAlert(id: string | null) {
    return useQuery({
        queryKey: ['alert', id],
        queryFn: () => fetchAlertById(id as string),
        enabled: !!id,
    });
}