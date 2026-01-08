import { Season, Hemisphere, DateRange, Theme, ThemeConfig } from '../types';

/**
 * Determines if a date falls within a date range
 */
function isDateInRange(date: Date, range: DateRange): boolean {
    const month = date.getMonth() + 1; // 0-indexed to 1-indexed
    const day = date.getDate();

    const { start, end } = range;

    // Handle ranges that span across year boundary (e.g., Dec 20 - Jan 5)
    if (start.month > end.month) {
        return (
            (month === start.month && day >= start.day) ||
            (month > start.month) ||
            (month < end.month) ||
            (month === end.month && day <= end.day)
        );
    }

    // Normal range within same year
    if (month < start.month || month > end.month) {
        return false;
    }

    if (month === start.month && day < start.day) {
        return false;
    }

    if (month === end.month && day > end.day) {
        return false;
    }

    return true;
}

/**
 * Detects the current season based on hemisphere and date
 */
export function detectSeason(hemisphere: Hemisphere = 'northern', date: Date = new Date()): Season {
    const month = date.getMonth() + 1; // 0-indexed to 1-indexed
    const day = date.getDate();

    // Northern hemisphere seasons
    const northernSeasons: { season: Season; range: DateRange }[] = [
        { season: 'winter', range: { start: { month: 12, day: 21 }, end: { month: 3, day: 19 } } },
        { season: 'spring', range: { start: { month: 3, day: 20 }, end: { month: 6, day: 20 } } },
        { season: 'summer', range: { start: { month: 6, day: 21 }, end: { month: 9, day: 22 } } },
        { season: 'autumn', range: { start: { month: 9, day: 23 }, end: { month: 12, day: 20 } } },
    ];

    // Southern hemisphere seasons (opposite)
    const southernSeasons: { season: Season; range: DateRange }[] = [
        { season: 'summer', range: { start: { month: 12, day: 21 }, end: { month: 3, day: 19 } } },
        { season: 'autumn', range: { start: { month: 3, day: 20 }, end: { month: 6, day: 20 } } },
        { season: 'winter', range: { start: { month: 6, day: 21 }, end: { month: 9, day: 22 } } },
        { season: 'spring', range: { start: { month: 9, day: 23 }, end: { month: 12, day: 20 } } },
    ];

    const seasons = hemisphere === 'northern' ? northernSeasons : southernSeasons;

    for (const { season, range } of seasons) {
        if (isDateInRange(date, range)) {
            return season;
        }
    }

    // Fallback
    return 'spring';
}

/**
 * Detects the current theme based on date ranges and priorities
 */
export function detectTheme(
    dateRanges?: ThemeConfig[],
    hemisphere: Hemisphere = 'northern',
    date: Date = new Date()
): Theme {
    if (!dateRanges || dateRanges.length === 0) {
        return detectSeason(hemisphere, date);
    }

    // Find all matching date ranges
    const matches = dateRanges.filter(config =>
        isDateInRange(date, config.range)
    );

    if (matches.length === 0) {
        return detectSeason(hemisphere, date);
    }

    // Sort by priority (higher first)
    matches.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    return matches[0].theme;
}

/**
 * Generates a random number between min and max
 */
export function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Generates a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
    return Math.floor(random(min, max + 1));
}
