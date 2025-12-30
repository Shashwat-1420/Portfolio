import React from 'react';
import { Doughnut, Line, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faThermometerHalf, faSmile } from '@fortawesome/free-solid-svg-icons';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface DashboardChartsProps {
    productivityTrendData: any;
    moodRadarData: any;
    moodChartData: any;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
    productivityTrendData,
    moodRadarData,
    moodChartData
}) => {

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(24,24,24,0.95)',
                titleColor: '#ffb347',
                bodyColor: '#ffffff',
                borderColor: '#ffb347',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255,179,71,0.1)'
                },
                ticks: {
                    color: '#ffffff',
                    font: { family: 'monospace' }
                }
            },
            y: {
                min: 0,
                max: 10,
                grid: {
                    color: 'rgba(255,179,71,0.1)'
                },
                ticks: {
                    color: '#ffffff',
                    font: { family: 'monospace' }
                }
            }
        }
    };

    const radarChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255,179,71,0.2)'
                },
                pointLabels: {
                    color: '#ffffff',
                    font: { family: 'monospace', size: 12 }
                },
                ticks: {
                    color: 'rgba(255,179,71,0.6)',
                    font: { family: 'monospace' },
                    backdropColor: 'transparent'
                }
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    color: '#ffffff',
                    font: { family: 'monospace', size: 11 },
                    usePointStyle: true,
                    padding: 15
                }
            },
            tooltip: {
                backgroundColor: 'rgba(24,24,24,0.95)',
                titleColor: '#ffb347',
                bodyColor: '#ffffff',
                borderColor: '#ffb347',
                borderWidth: 1
            }
        },
        cutout: '60%'
    };

    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {/* Productivity Trend Line Chart */}
                {productivityTrendData && (
                    <div style={{
                        background: 'rgba(40,40,40,0.9)',
                        borderRadius: 20,
                        padding: '2rem',
                        border: '1px solid rgba(255,179,71,0.2)',
                        minHeight: '350px'
                    }}>
                        <h3 style={{
                            color: 'var(--color-primary)',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            fontSize: '1.3rem',
                            fontFamily: 'monospace'
                        }}>
                            <FontAwesomeIcon icon={faArrowTrendUp} style={{ marginRight: '0.5rem' }} /> Productivity Trend
                        </h3>
                        <div style={{ height: '280px', position: 'relative' }}>
                            <Line data={productivityTrendData} options={lineChartOptions} />
                        </div>
                    </div>
                )}

                {/* Mood Intelligence Radar */}
                {moodRadarData && (
                    <div style={{
                        background: 'rgba(40,40,40,0.9)',
                        borderRadius: 20,
                        padding: '2rem',
                        border: '1px solid rgba(255,179,71,0.2)',
                        minHeight: '350px'
                    }}>
                        <h3 style={{
                            color: 'var(--color-primary)',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            fontSize: '1.3rem',
                            fontFamily: 'monospace'
                        }}>
                            <FontAwesomeIcon icon={faThermometerHalf} style={{ marginRight: '0.5rem' }} /> Mood Intelligence
                        </h3>
                        <div style={{ height: '280px', position: 'relative' }}>
                            <Radar data={moodRadarData} options={radarChartOptions} />
                        </div>
                    </div>
                )}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {/* Enhanced Mood Distribution */}
                <div style={{
                    background: 'rgba(40,40,40,0.9)',
                    borderRadius: 20,
                    padding: '2rem',
                    border: '1px solid rgba(255,179,71,0.2)'
                }}>
                    <h3 style={{
                        color: 'var(--color-primary)',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        fontSize: '1.3rem',
                        fontFamily: 'monospace'
                    }}>
                        <FontAwesomeIcon icon={faSmile} style={{ marginRight: '0.5rem' }} /> Emotional Patterns
                    </h3>
                    <div style={{ height: '280px', position: 'relative' }}>
                        <Doughnut data={moodChartData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </>
    );
};
