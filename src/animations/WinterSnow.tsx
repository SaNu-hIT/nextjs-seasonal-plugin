import React, { useMemo } from 'react';
import { AnimationProps } from '../types';
import { random, randomInt } from '../utils/seasonDetector';
import '../styles/animations.css';

interface Snowflake {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
}

export const WinterSnow: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const snowflakes = useMemo<Snowflake[]>(() => {
        const flakes: Snowflake[] = [];
        const count = Math.floor(particleCount * (intensity / 100));

        for (let i = 0; i < count; i++) {
            flakes.push({
                id: i,
                left: random(0, 100),
                size: random(2, 8),
                duration: random(8, 15),
                delay: random(0, 5),
                drift: random(-50, 50),
            });
        }

        return flakes;
    }, [particleCount, intensity]);

    const defaultColor = colors?.[0] || '#ffffff';

    return (
        <>
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    style={{
                        position: 'absolute',
                        left: `${flake.left}%`,
                        top: '-10px',
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        backgroundColor: defaultColor,
                        borderRadius: '50%',
                        opacity: opacity * 0.8,
                        animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
                        // @ts-ignore - CSS custom properties
                        '--drift': `${flake.drift}px`,
                        pointerEvents: 'none',
                        boxShadow: `0 0 2px rgba(0,0,0,0.1), 0 0 ${flake.size}px ${defaultColor}`,
                    }}
                />
            ))}
        </>
    );
};
