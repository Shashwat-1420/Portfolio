import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFire,
    faChartLine,
    faTrophy,
    faGraduationCap,
    faArrowTrendUp,
    faArrowTrendDown,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

interface DashboardKPIsProps {
    stats: any; // We can use a more specific type if available, e.g., ProgressStats
    productivityTrend: 'up' | 'down' | 'stable';
    streak: number;
    longestStreak: number;
    achievementVelocity: string;
}

export const DashboardKPIs: React.FC<DashboardKPIsProps> = ({
    stats,
    productivityTrend,
    streak,
    longestStreak,
    achievementVelocity
}) => {
    const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up': return <FontAwesomeIcon icon={faArrowTrendUp} />;
            case 'down': return <FontAwesomeIcon icon={faArrowTrendDown} />;
            case 'stable': return <FontAwesomeIcon icon={faArrowRight} />;
        }
    };

    const getTrendColor = (trend: 'up' | 'down' | 'stable'): string => {
        switch (trend) {
            case 'up': return '#00cc66'; // Darker green
            case 'down': return '#cc4444'; // Darker red
            case 'stable': return '#ccaa00'; // Darker yellow
        }
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem auto'
        }}>
            {/* Smart Streak Card */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(40,40,40,0.9) 0%, rgba(50,50,50,0.9) 100%)',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid rgba(255,179,71,0.3)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '15px',
                    fontSize: '1.5rem'
                }}>
                    {getTrendIcon(productivityTrend)}
                </div>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}><FontAwesomeIcon icon={faFire} /></div>
                <h3 style={{
                    color: 'var(--color-primary)',
                    margin: '0 0 0.5rem 0',
                    fontSize: '2.2rem',
                    fontWeight: 700
                }}>
                    {streak}
                </h3>
                <p style={{
                    color: 'var(--color-secondary)',
                    margin: '0 0 1rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                }}>
                    Day Streak
                </p>
                <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-muted)',
                    fontFamily: 'monospace'
                }}>
                    Longest: {longestStreak} days
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: `linear-gradient(90deg, 
            transparent 0%, 
            ${getTrendColor(productivityTrend)} ${(streak / (longestStreak || 1)) * 100}%, 
            transparent 100%)`
                }} />
            </div>

            {/* Enhanced Productivity Score */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(40,40,40,0.9) 0%, rgba(50,50,50,0.9) 100%)',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid rgba(255,179,71,0.3)',
                position: 'relative'
            }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}><FontAwesomeIcon icon={faChartLine} /></div>
                <h3 style={{
                    color: 'var(--color-primary)',
                    margin: '0 0 0.5rem 0',
                    fontSize: '2.2rem',
                    fontWeight: 700
                }}>
                    {stats?.averageProductivity || 0}
                    <span style={{ fontSize: '1.2rem', color: 'var(--color-muted)' }}>/10</span>
                </h3>
                <p style={{
                    color: 'var(--color-secondary)',
                    margin: '0 0 1rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                }}>
                    Avg Productivity
                </p>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: getTrendColor(productivityTrend),
                    fontFamily: 'monospace'
                }}>
                    {getTrendIcon(productivityTrend)}
                    <span>
                        {productivityTrend === 'up' ? 'Improving' :
                            productivityTrend === 'down' ? 'Declining' : 'Stable'}
                    </span>
                </div>
            </div>

            {/* Achievement Velocity */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(40,40,40,0.9) 0%, rgba(50,50,50,0.9) 100%)',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid rgba(255,179,71,0.3)'
            }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}><FontAwesomeIcon icon={faTrophy} /></div>
                <h3 style={{
                    color: 'var(--color-primary)',
                    margin: '0 0 0.5rem 0',
                    fontSize: '2.2rem',
                    fontWeight: 700
                }}>
                    {stats?.totalAchievements || 0}
                </h3>
                <p style={{
                    color: 'var(--color-secondary)',
                    margin: '0 0 1rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                }}>
                    Total Achievements
                </p>
                <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-muted)',
                    fontFamily: 'monospace'
                }}>
                    Velocity: {achievementVelocity}/day
                </div>
            </div>

            {/* Learning Progress */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(40,40,40,0.9) 0%, rgba(50,50,50,0.9) 100%)',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid rgba(255,179,71,0.3)'
            }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}><FontAwesomeIcon icon={faGraduationCap} /></div>
                <h3 style={{
                    color: 'var(--color-primary)',
                    margin: '0 0 0.5rem 0',
                    fontSize: '2.2rem',
                    fontWeight: 700
                }}>
                    {stats?.totalDays || 0}
                </h3>
                <p style={{
                    color: 'var(--color-secondary)',
                    margin: '0 0 1rem 0',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                }}>
                    Learning Days
                </p>
                <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-muted)',
                    fontFamily: 'monospace'
                }}>
                    Consistency: {Math.round((streak / (stats?.totalDays || 1)) * 100)}%
                </div>
            </div>
        </div>
    );
};
