import React, { useMemo } from 'react';
import { AnimationProps } from '../../types';
import { random, randomInt } from '../../utils/seasonDetector';
import '../../styles/animations.css';

interface FlowerPetal {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
    rotation: number;
    color: string;
}

interface RangoliPattern {
    id: number;
    left: number;
    top: number;
    size: number;
    rotation: number;
    delay: number;
}

// Traditional Onam pookalam colors
const pookalamColors = ['#FF1493', '#FFD700', '#FF6347', '#9370DB', '#00CED1', '#FF69B4', '#FFA500'];
const flowerEmojis = ['🌺', '🌸', '🌼', '🌻', '🏵️'];

export const OnamTheme: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const petals = useMemo<FlowerPetal[]>(() => {
        const petalArray: FlowerPetal[] = [];
        const count = Math.floor(particleCount * (intensity / 100));

        for (let i = 0; i < count; i++) {
            petalArray.push({
                id: i,
                left: random(0, 100),
                size: random(15, 30),
                duration: random(10, 20),
                delay: random(0, 5),
                drift: random(-60, 60),
                rotation: random(-360, 360),
                color: colors?.[randomInt(0, colors.length - 1)] || pookalamColors[randomInt(0, pookalamColors.length - 1)],
            });
        }

        return petalArray;
    }, [particleCount, intensity, colors]);

    const rangoliPatterns = useMemo<RangoliPattern[]>(() => {
        const patterns: RangoliPattern[] = [];
        const count = Math.floor((particleCount * (intensity / 100)) * 0.1);

        for (let i = 0; i < count; i++) {
            patterns.push({
                id: i,
                left: random(10, 90),
                top: random(10, 90),
                size: random(40, 80),
                rotation: random(0, 360),
                delay: random(0, 3),
            });
        }

        return patterns;
    }, [particleCount, intensity]);

    return (
        <>
            {/* Floating flower petals */}
            {petals.map((petal) => (
                <div
                    key={`petal-${petal.id}`}
                    style={{
                        position: 'absolute',
                        left: `${petal.left}%`,
                        bottom: '-30px',
                        fontSize: `${petal.size}px`,
                        opacity: opacity,
                        animation: `petalFloat ${petal.duration}s ease-in-out ${petal.delay}s infinite`,
                        // @ts-ignore
                        '--drift': `${petal.drift}px`,
                        '--rotation': `${petal.rotation}deg`,
                        pointerEvents: 'none',
                    }}
                >
                    {flowerEmojis[randomInt(0, flowerEmojis.length - 1)]}
                </div>
            ))}

            {/* Pookalam patterns */}
            {rangoliPatterns.map((pattern) => (
                <div
                    key={`rangoli-${pattern.id}`}
                    style={{
                        position: 'absolute',
                        left: `${pattern.left}%`,
                        top: `${pattern.top}%`,
                        fontSize: `${pattern.size}px`,
                        opacity: opacity * 0.6,
                        animation: `petalPulse 4s ease-in-out ${pattern.delay}s infinite`,
                        transform: `rotate(${pattern.rotation}deg)`,
                        pointerEvents: 'none',
                    }}
                >
                    🌺
                </div>
            ))}
        </>
    );
};
