import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrophy, faBolt } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'; // Ensure we have access to the glass utilities

interface LevelProgressProps {
    currentXP: number;
    nextLevelXP: number;
    currentLevel: number;
    levelName: string;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({ 
    currentXP, 
    nextLevelXP, 
    currentLevel, 
    levelName 
}) => {
    const [progress, setProgress] = useState(0);

    // Animate progress bar on mount
    useEffect(() => {
        const percentage = Math.min((currentXP / nextLevelXP) * 100, 100);
        // Small delay for visual effect
        const timer = setTimeout(() => setProgress(percentage), 300);
        return () => clearTimeout(timer);
    }, [currentXP, nextLevelXP]);

    return (
        <div className="glass-panel animate-fade-in-up" style={{
            padding: '1.5rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, rgba(255, 179, 71, 0.1) 0%, rgba(20, 20, 20, 0.4) 100%)',
            border: '1px solid rgba(255, 179, 71, 0.2)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #FFB347, #FFCC33)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#1a1a1a',
                        boxShadow: '0 0 15px rgba(255, 179, 71, 0.4)'
                    }}>
                        {currentLevel}
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fffbE6' }}>{levelName}</h3>
                        <div style={{ fontSize: '0.9rem', color: '#ffe29f' }}>
                            <FontAwesomeIcon icon={faBolt} style={{ marginRight: '0.4rem', color: '#FFD700' }} />
                            {currentXP} XP / {nextLevelXP} XP
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'right', display: 'none', flexDirection: 'column', gap: '0.2rem' }}>
                    
                </div>
            </div>

            {/* Progress Bar Container */}
            <div style={{
                height: '10px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '5px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Visual Progress Bar */}
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #FFB347, #FF8C00)',
                    borderRadius: '5px',
                    transition: 'width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    boxShadow: '0 0 10px rgba(255, 179, 71, 0.5)'
                }} />
            </div>
            
            <div style={{ marginTop: '0.5rem', textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                {Math.round(nextLevelXP - currentXP)} XP to next level
            </div>
        </div>
    );
};
