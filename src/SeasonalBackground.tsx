'use client';

import React from 'react';
import { SeasonalBackgroundProps } from './types';
import { detectTheme } from './utils/seasonDetector';
import { WinterSnow } from './animations/WinterSnow';
import { SummerSun } from './animations/SummerSun';
import { AutumnLeaves } from './animations/AutumnLeaves';
import { SpringFlowers } from './animations/SpringFlowers';
import { ChristmasTheme } from './animations/holidays/ChristmasTheme';
import { OnamTheme } from './animations/holidays/OnamTheme';
import { DiwaliTheme } from './animations/holidays/DiwaliTheme';
import { NewYearTheme } from './animations/holidays/NewYearTheme';
import { HalloweenTheme } from './animations/holidays/HalloweenTheme';
import { CustomTheme } from './animations/holidays/CustomTheme';
import './styles/animations.css';

export const SeasonalBackground: React.FC<SeasonalBackgroundProps> = ({
    theme,
    hemisphere = 'northern',
    dateRanges,
    intensity = 70,
    particleCount = 50,
    enabled = true,
    colors,
    customParticles,
    zIndex = -1,
    opacity = 1,
    className = '',
    disableAutoDetect = false,
}) => {
    // Don't render if disabled
    if (!enabled) {
        return null;
    }

    // Determine which theme to use
    const activeTheme = disableAutoDetect
        ? theme || 'winter'
        : theme || detectTheme(dateRanges, hemisphere);

    // Common props for all animations
    const animationProps = {
        intensity,
        particleCount,
        colors,
        opacity,
        customParticles,
    };

    // Render the appropriate animation component
    const renderAnimation = () => {
        switch (activeTheme) {
            case 'winter':
                return <WinterSnow {...animationProps} />;
            case 'summer':
                return <SummerSun {...animationProps} />;
            case 'autumn':
                return <AutumnLeaves {...animationProps} />;
            case 'spring':
                return <SpringFlowers {...animationProps} />;
            case 'christmas':
                return <ChristmasTheme {...animationProps} />;
            case 'onam':
                return <OnamTheme {...animationProps} />;
            case 'diwali':
                return <DiwaliTheme {...animationProps} />;
            case 'newyear':
                return <NewYearTheme {...animationProps} />;
            case 'halloween':
                return <HalloweenTheme {...animationProps} />;
            case 'custom':
                return <CustomTheme {...animationProps} />;
            default:
                return <WinterSnow {...animationProps} />;
        }
    };

    return (
        <div
            className={`seasonal-background ${className}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex,
                pointerEvents: 'none',
            }}
            aria-hidden="true"
        >
            {renderAnimation()}
        </div>
    );
};

export default SeasonalBackground;
