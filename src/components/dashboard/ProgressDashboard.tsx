import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { DashboardKPIs } from './DashboardKPIs';
import { DashboardCharts } from './DashboardCharts';
import { ActivityHeatmap } from '../ActivityHeatmap';
import type { ParsedProgressReport, ProgressStats } from '../../utils/browserProgressReader';

interface ProgressDashboardProps {
    stats: ProgressStats | null;
    reports: ParsedProgressReport[];
    loading: boolean;
    onDateClick: (date: string) => void;
}

// Helper functions defined outside component to avoid dependency issues
const calculateTrend = (data: number[]): 'up' | 'down' | 'stable' => {
    if (data.length < 2) return 'stable';
    const recent = data.slice(-3);
    const avg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    const previous = data.slice(-6, -3);
    if (previous.length === 0) return 'stable';
    const prevAvg = previous.reduce((sum, val) => sum + val, 0) / previous.length;

    if (avg > prevAvg + 0.5) return 'up';
    if (avg < prevAvg - 0.5) return 'down';
    return 'stable';
};

const getMoodColorFromText = (moodText: string): string => {
    const mood = moodText.toLowerCase().replace(/[^a-z]/g, '');
    switch (mood) {
        case 'excellent': return '#00cc66';
        case 'good': return '#3e1919ff';
        case 'okay': return '#ccaa00';
        case 'challenging': return '#cc6600';
        case 'tough': return '#cc4444';
        default: return '#ff9500ff';
    }
};

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
    stats,
    reports,
    loading,
    onDateClick
}) => {
    // Memoized calculations
    const {
        productivityTrend,
        productivityTrendData,
        moodRadarData,
        moodChartData,
        heatmapData,
        achievementVelocity
    } = useMemo(() => {
        if (!stats || !reports) return {};

        const scores = reports.map(r => r.productivityScore || 0);
        const trend = calculateTrend(scores);

        const velocity = (stats.totalDays || 0) > 0
            ? ((stats.totalAchievements || 0) / (stats.totalDays || 1)).toFixed(1)
            : '0.0';

        // Trend Data
        const actualReports = reports
            .sort((a, b) => a.day - b.day)
            .map(report => ({
                date: new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                score: report.productivityScore || 0,
                mood: report.mood || 'good'
            }));

        const trendData = {
            labels: actualReports.map(d => d.date),
            datasets: [
                {
                    label: 'Productivity Score',
                    data: actualReports.map(d => d.score),
                    borderColor: '#cc8c37',
                    backgroundColor: 'rgba(204, 140, 55, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: actualReports.map(d => getMoodColorFromText(d.mood)),
                    pointBorderColor: '#cc8c37',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.4,
                }
            ]
        };

        // Mood Radar
        const moodLabels = ['Excellent', 'Good', 'Okay', 'Challenging', 'Tough'];
        const moodDist = stats.moodDistribution || {};
        const radarData = {
            labels: moodLabels,
            datasets: [
                {
                    label: 'Mood Distribution',
                    data: moodLabels.map(mood => moodDist[mood.toLowerCase()] || 0),
                    backgroundColor: 'rgba(204, 140, 55, 0.2)',
                    borderColor: '#cc8c37',
                    borderWidth: 2,
                    pointBackgroundColor: '#cc8c37',
                    pointBorderColor: '#ffffff',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#cc8c37'
                }
            ]
        };

        // Mood Doughnut
        const chartData = {
            labels: Object.keys(moodDist).map(mood =>
                mood.charAt(0).toUpperCase() + mood.slice(1)
            ),
            datasets: [{
                data: Object.values(moodDist),
                backgroundColor: [
                    '#00cc66', // excellent
                    '#cc8c37', // good
                    '#ccaa00', // okay
                    '#cc6600', // challenging
                    '#cc4444'  // tough
                ],
                borderWidth: 3,
                borderColor: '#181818',
                hoverBorderWidth: 4,
                hoverBorderColor: '#ffffff'
            }]
        };

        // Heatmap Data
        const heatmap = reports.map(report => ({
            date: report.date,
            score: report.productivityScore || 0,
            achievements: report.achievements?.length || 0,
            mood: report.mood || 'neutral'
        }));

        return {
            productivityTrend: trend,
            productivityTrendData: trendData,
            moodRadarData: radarData,
            moodChartData: chartData,
            heatmapData: heatmap,
            achievementVelocity: velocity
        };
    }, [stats, reports]);

    if (loading || !stats) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-secondary)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}><FontAwesomeIcon icon={faChartLine} /></div>
                <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Loading your analytics...</p>
                <div style={{
                    width: '60px',
                    height: '4px',
                    background: 'rgba(255,179,71,0.3)',
                    borderRadius: '2px',
                    margin: '0 auto',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: '30px',
                        height: '100%',
                        background: 'var(--color-primary)',
                        borderRadius: '2px',
                        animation: 'loading 1.5s infinite'
                    }} />
                </div>
                <style>
                    {`
            @keyframes loading {
              0% { transform: translateX(-30px); }
              100% { transform: translateX(60px); }
            }
          `}
                </style>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem 0', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <DashboardKPIs
                stats={stats}
                productivityTrend={productivityTrend as 'up' | 'down' | 'stable'}
                streak={stats.currentStreak}
                longestStreak={stats.currentStreak} // Update logic if longest streak available
                achievementVelocity={achievementVelocity as string}
            />

            <div style={{ marginBottom: '3rem' }}>
                <ActivityHeatmap
                    data={heatmapData || []}
                    onDateClick={onDateClick}
                />
            </div>

            <DashboardCharts
                productivityTrendData={productivityTrendData}
                moodRadarData={moodRadarData}
                moodChartData={moodChartData}
            />
        </div>
    );
};
