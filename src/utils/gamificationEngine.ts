import type { ProgressStats, ParsedProgressReport } from './browserProgressReader';
import type { Badge } from '../components/dashboard/BadgeShowcase';

export interface UserLevel {
    currentLevel: number;
    currentXP: number;
    nextLevelXP: number;
    levelName: string;
}

const LEVELS = [
    { level: 1, xp: 0, name: "Beginner" },
    { level: 2, xp: 100, name: "Novice" },
    { level: 3, xp: 300, name: "Apprentice" },
    { level: 4, xp: 600, name: "Skilled" },
    { level: 5, xp: 1000, name: "Expert" },
    { level: 6, xp: 1500, name: "Master" },
    { level: 7, xp: 2200, name: "Legend" },
];

export const BADGE_DEFINITIONS: Badge[] = [
    { id: 'first_streak', name: 'Momentum', description: 'Hit a 3-day streak', icon: 'fire', rarity: 'common', isUnlocked: false },
    { id: 'week_warrior', name: 'Week Warrior', description: 'Hit a 7-day streak', icon: 'fire', rarity: 'rare', isUnlocked: false },
    { id: 'perfect_10', name: 'Perfectionist', description: 'Score a perfect 10/10', icon: 'star', rarity: 'epic', isUnlocked: false },
    { id: 'early_bird', name: 'Early Bird', description: 'Log an entry before 10 AM', icon: 'sun', rarity: 'common', isUnlocked: false },
    { id: 'night_owl', name: 'Night Owl', description: 'Log an entry after 10 PM', icon: 'moon', rarity: 'common', isUnlocked: false },
    { id: 'scholar', name: 'Scholar', description: 'Log 10 learning entries', icon: 'grad', rarity: 'rare', isUnlocked: false },
];

export class GamificationEngine {
    static calculateXP(reports: ParsedProgressReport[]): number {
        let xp = 0;

        // 1. Base XP per entry
        xp += reports.length * 10;

        // 2. High Score Bonuses
        reports.forEach(r => {
            if ((r.productivityScore || 0) >= 8) xp += 5;
            if ((r.productivityScore || 0) === 10) xp += 10; // Extra bonus for perfect score
        });

        // 3. Streak Bonus (Simplified: 1 XP per day of max streak)
        // Note: In real app, we'd calculate streaks historically.
        // For now, we'll use a simplified approximation or pass in stats.

        return xp;
    }

    static getLevel(xp: number): UserLevel {
        let currentLevel = LEVELS[0];
        let nextLevel = LEVELS[1];

        for (let i = 0; i < LEVELS.length; i++) {
            if (xp >= LEVELS[i].xp) {
                currentLevel = LEVELS[i];
                nextLevel = LEVELS[i + 1] || { ...LEVELS[i], xp: Infinity }; // Max level cap
            }
        }

        return {
            currentLevel: currentLevel.level,
            currentXP: xp,
            nextLevelXP: nextLevel.xp,
            levelName: currentLevel.name
        };
    }

    static checkBadges(stats: ProgressStats, reports: ParsedProgressReport[]): Badge[] {
        // Clone definitions to avoid mutating source
        const badges = JSON.parse(JSON.stringify(BADGE_DEFINITIONS));

        return badges.map((badge: Badge) => {
            let unlocked = false;

            switch (badge.id) {
                case 'first_streak':
                    unlocked = stats.currentStreak >= 3 || (stats.longestStreak || 0) >= 3;
                    break;
                case 'week_warrior':
                    unlocked = stats.currentStreak >= 7 || (stats.longestStreak || 0) >= 7;
                    break;
                case 'perfect_10':
                    unlocked = reports.some(r => r.productivityScore === 10);
                    break;
                case 'scholar':
                    unlocked = reports.length >= 10; // Placeholder logic
                    break;
                // Add more complex logic (e.g., time-based) here if metadata allows
            }

            badge.isUnlocked = unlocked;
            return badge;
        });
    }
}
