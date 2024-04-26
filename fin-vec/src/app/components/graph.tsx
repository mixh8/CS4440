import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

let zoomPlugin: any;
let annotationPlugin: any;

const loadPlugins = async () => {
    if (typeof window !== 'undefined') {
        zoomPlugin = (await import('chartjs-plugin-zoom')).default;
        annotationPlugin = (await import('chartjs-plugin-annotation')).default;
        Chart.register(zoomPlugin, annotationPlugin);
    }
};

interface DataPoint {
    price: {
        S: string
    };
    unix_time: {
        N: number
    };
    industry: {
        S: string
    };
}

loadPlugins();
const colors = ['black', 'DarkBlue', 'MediumBlue', 'DodgerBlue', 'LightSkyBlue', 'PaleTurquoise'];

export default function MyChart({ data, lineDate }: { data: Record<string, DataPoint[]>, lineDate: string }) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef<Chart<"line", { x: Date; y: number; }[], unknown> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
            console.log(Object.keys(data))
            const datasets = Object.keys(data).map((ticker, index) => ({
                label: ticker,
                data: data[ticker].map(item => ({ x: new Date(item.unix_time.N * 1000), y: Number(item.price.S) })),
                fill: false,
                borderColor: colors[index % colors.length],
                tension: 0.1,
                pointRadius: 0,
            }));
            
            chartInstanceRef.current = new Chart(chartRef.current, {
                type: 'line',
                data: { datasets },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    day: 'MMM d, yyyy'
                                }
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'xy'
                            },
                            zoom: {
                                wheel: {
                                    enabled: true
                                },
                                mode: 'x'
                            }
                        },
                        annotation: {
                            annotations: {
                                verticalLine: {
                                    type: 'line',
                                    xMin: lineDate,
                                    xMax: lineDate,
                                    borderColor: 'red',
                                    borderWidth: 2,
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [data, lineDate]);

    return <canvas ref={chartRef} />;
}