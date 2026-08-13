import type { EChartsOption } from 'echarts';
import { chartColors } from '../colors';

export interface AlertVolumePoint {
    time: string; // e.g. "00:00", "04:00"
    count: number;
}

export function alertVolumeOption(data: AlertVolumePoint[]): EChartsOption {
    return {
        grid: {
            left: 8,
            right: 8,
            top: 16,
            bottom: 24,
            containLabel: true,
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: chartColors.input,
            borderColor: chartColors.border,
            textStyle: { color: chartColors.textPrimary, fontFamily: 'JetBrains Mono' },
        },
        xAxis: {
            type: 'category',
            data: data?.map((d) => d.time),
            axisLine: { lineStyle: { color: chartColors.border } },
            axisLabel: { color: chartColors.textSecondary, fontFamily: 'JetBrains Mono', fontSize: 11 },
            axisTick: { show: false },
        },
        yAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: chartColors.border, type: 'dashed' } },
            axisLabel: { color: chartColors.textSecondary, fontFamily: 'JetBrains Mono', fontSize: 11 },
        },
        series: [
            {
                name: 'Total Alerts',
                type: 'line',
                data: data.map((d) => d.count),
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,
                showSymbol: false,
                lineStyle: { color: chartColors.accentBright, width: 2 },
                itemStyle: { color: chartColors.accentBright },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(117, 216, 196, 0.25)' },
                            { offset: 1, color: 'rgba(117, 216, 196, 0)' },
                        ],
                    },
                },
            },
        ],
    };
}