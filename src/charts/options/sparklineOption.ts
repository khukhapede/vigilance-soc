import type { EChartsOption } from 'echarts';
import { chartColors } from '../colors';

export function sparklineOption(data: number[]): EChartsOption {
    return {
        grid: { left: 0, right: 0, top: 4, bottom: 0 },
        xAxis: { type: 'category', show: false, data: data.map((_, i) => i) },
        yAxis: { type: 'value', show: false },
        series: [
            {
                type: 'line',
                data,
                smooth: true,
                symbol: 'none',
                lineStyle: { color: chartColors.critical, width: 1.5 },
                areaStyle: { color: 'rgba(248, 81, 73, 0.15)' },
            },
        ],
    };
}