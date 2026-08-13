import type { EChartsOption } from 'echarts';
import { chartColors, severityColors } from '../colors';

export interface SeverityDatum {
    name: string;
    value: number;
}

export function severityDonutOption(data: SeverityDatum[]): EChartsOption {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    return {
        tooltip: {
            trigger: 'item',
            backgroundColor: chartColors.input,
            borderColor: chartColors.border,
            textStyle: { color: chartColors.textPrimary, fontFamily: 'JetBrains Mono' },
        },
        series: [
            {
                type: 'pie',
                radius: ['65%', '85%'],
                avoidLabelOverlap: false,
                label: { show: false },
                labelLine: { show: false },
                color: severityColors,
                data: data.map((d) => ({ name: d.name, value: d.value })),
                emphasis: {
                    scale: true,
                    scaleSize: 4,
                },
            },
        ],
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: '42%',
                    style: {
                        text: total >= 1000 ? `${(total / 1000).toFixed(1)}k` : `${total}`,
                        fontSize: 28,
                        fontWeight: 'bold',
                        fill: chartColors.textPrimary,
                        fontFamily: 'JetBrains Mono',
                    },
                },
                {
                    type: 'text',
                    left: 'center',
                    top: '56%',
                    style: {
                        text: 'Total',
                        fontSize: 12,
                        fill: chartColors.textSecondary,
                        fontFamily: 'JetBrains Mono',
                    },
                },
            ],
        },
    };
}