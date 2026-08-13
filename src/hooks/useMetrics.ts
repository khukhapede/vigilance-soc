import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '../api/metricsApi';

export function useMetrics(days: number = 7) {
    return useQuery({
        queryKey: ['metrics', days],
        queryFn: () => fetchMetrics(days),
    });
}