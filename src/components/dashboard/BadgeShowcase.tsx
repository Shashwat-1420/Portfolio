import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTrophy, faFire, faStar, faSun, faMoon, faGraduationCap, faMedal } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    isUnlocked: boolean;
    unlockedAt?: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeShowcaseProps {
    badges: Badge[];
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'fire': return faFire;
        case 'star': return faStar;
        case 'sun': return faSun;
        case 'moon': return faMoon;
        case 'grad': return faGraduationCap;
        case 'medal': return faMedal;
        default: return faTrophy;
    }
};

const getRarityColor = (rarity: string) => {
    switch (rarity) {
        case 'legendary': return 'linear-gradient(45deg, #FFD700, #FFA500)';
        case 'epic': return 'linear-gradient(45deg, #C972FF, #9D50BB)';
        case 'rare': return 'linear-gradient(45deg, #00BFFF, #1E90FF)';
        default: return 'linear-gradient(45deg, #A8A8A8, #808080)'; // common
    }
};

export const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({ badges }) => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#ffbd5e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FontAwesomeIcon icon={faTrophy} /> Achievements
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '1.5rem',
                justifyItems: 'center'
            }}>
                {badges.map((badge) => (
                    <div
                        key={badge.id}
                        className="badge-card"
                        style={{
                            width: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            opacity: badge.isUnlocked ? 1 : 0.5,
                            filter: badge.isUnlocked ? 'none' : 'grayscale(100%)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: badge.isUnlocked ? getRarityColor(badge.rarity) : 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.8rem',
                            border: `2px solid ${badge.isUnlocked ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.05)'}`,
                            boxShadow: badge.isUnlocked ? '0 0 15px rgba(255,255,255,0.1)' : 'none',
                            position: 'relative'
                        }}>
                            <FontAwesomeIcon
                                icon={badge.isUnlocked ? getIcon(badge.icon) : faLock}
                                style={{ fontSize: '1.5rem', color: badge.isUnlocked ? '#fff' : '#ffffff40' }}
                            />
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e0e0e0', lineHeight: 1.2 }}>
                            {badge.name}
                        </div>

                        {/* Tooltip on Hover (CSS implementation would be cleaner, inline for now) */}
                        <div className="badge-tooltip" style={{
                            fontSize: '0.75rem',
                            color: '#aaa',
                            marginTop: '0.3rem'
                        }}>
                            {badge.isUnlocked ? 'Unlocked!' : 'Locked'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
