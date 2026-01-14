export type Season = 'winter' | 'summer' | 'autumn' | 'spring';

export type Holiday = 'christmas' | 'onam' | 'diwali' | 'newyear' | 'halloween';

export type Theme = Season | Holiday | 'custom';

export type Hemisphere = 'northern' | 'southern';

export interface DateRange {
    start: { month: number; day: number };
    end: { month: number; day: number };
}

export interface CustomParticle {
    element: string | React.ReactNode;
    size?: { min: number; max: number };
    speed?: { min: number; max: number };
    rotation?: boolean;
}

export interface ThemeConfig {
    theme: Theme;
    range: DateRange;
    priority?: number;
}

export interface SeasonalBackgroundProps {
    theme?: Theme;
    hemisphere?: Hemisphere;
    dateRanges?: ThemeConfig[];
    intensity?: number;
    particleCount?: number;
    enabled?: boolean;
    colors?: string[];
    customParticles?: CustomParticle[];
    zIndex?: number;
    opacity?: number;
    className?: string;
    disableAutoDetect?: boolean;
    weather?: 'rain' | 'cloudy' | 'snow' | 'none' | null;
}

export interface AnimationProps {
    intensity: number;
    particleCount: number;
    colors?: string[];
    opacity: number;
    customParticles?: CustomParticle[];
}
