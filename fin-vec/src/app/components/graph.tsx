import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';

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

Chart.register(zoomPlugin);
const colors = ['black', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'gray', 'brown', 'cyan'];

export default function MyChart({ data }: { data: Record<string, DataPoint[]> }) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef<Chart<"line", { x: Date; y: number; }[], unknown> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            // If there's an old chart instance, destroy it
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

            // Create a new chart instance and store it in the ref
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
                        }
                    }
                }
            });
        }
    }, [data]);

    return <canvas ref={chartRef} />;
}