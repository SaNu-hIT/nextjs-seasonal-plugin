import React, { useMemo } from 'react';
import { AnimationProps } from '../../types';
import { random, randomInt } from '../../utils/seasonDetector';
import '../../styles/animations.css';

interface Snowflake {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
}

interface Ornament {
    id: number;
    left: number;
    top: number;
    size: number;
    color: string;
    delay: number;
}

interface Light {
    id: number;
    left: number;
    top: number;
    color: string;
    delay: number;
}

const ornamentColors = ['#FF0000', '#00FF00', '#FFD700', '#0000FF', '#FF69B4'];
const lightColors = ['#FFFF00', '#FF0000', '#00FF00', '#0000FF', '#FF69B4', '#FFA500'];

export const ChristmasTheme: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const snowflakes = useMemo<Snowflake[]>(() => {
        const flakes: Snowflake[] = [];
        const count = Math.floor(particleCount * (intensity / 100) * 0.6);

        for (let i = 0; i < count; i++) {
            flakes.push({
                id: i,
                left: random(0, 100),
                size: random(2, 6),
                duration: random(8, 15),
                delay: random(0, 5),
                drift: random(-50, 50),
            });
        }

        return flakes;
    }, [particleCount, intensity]);

    const ornaments = useMemo<Ornament[]>(() => {
        const orns: Ornament[] = [];
        const count = Math.floor((particleCount * (intensity / 100)) * 0.15);

        for (let i = 0; i < count; i++) {
            orns.push({
                id: i,
                left: random(5, 95),
                top: random(10, 90),
                size: random(20, 35),
                color: colors?.[randomInt(0, colors.length - 1)] || ornamentColors[randomInt(0, ornamentColors.length - 1)],
                delay: random(0, 3),
            });
        }

        return orns;
    }, [particleCount, intensity, colors]);

    const lights = useMemo<Light[]>(() => {
        const lightArray: Light[] = [];
        const count = Math.floor((particleCount * (intensity / 100)) * 0.2);

        for (let i = 0; i < count; i++) {
            lightArray.push({
                id: i,
                left: random(0, 100),
                top: random(0, 100),
                color: lightColors[randomInt(0, lightColors.length - 1)],
                delay: random(0, 2),
            });
        }

        return lightArray;
    }, [particleCount, intensity]);

    return (
        <>
            {/* Snowflakes */}
            {snowflakes.map((flake) => (
                <div
                    key={`snow-${flake.id}`}
                    style={{
                        position: 'absolute',
                        left: `${flake.left}%`,
                        top: '-10px',
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        opacity: opacity * 0.8,
                        animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
                        // @ts-ignore
                        '--drift': `${flake.drift}px`,
                        pointerEvents: 'none',
                        boxShadow: '0 0 4px #ffffff',
                    }}
                />
            ))}

            {/* Christmas ornaments */}
            {ornaments.map((orn) => (
                <div
                    key={`ornament-${orn.id}`}
                    style={{
                        position: 'absolute',
                        left: `${orn.left}%`,
                        top: `${orn.top}%`,
                        fontSize: `${orn.size}px`,
                        opacity: opacity * 0.7,
                        animation: `ornamentSwing 3s ease-in-out ${orn.delay}s infinite`,
                        pointerEvents: 'none',
                        filter: `drop-shadow(0 0 5px ${orn.color})`,
                    }}
                >
                    🎄
                </div>
            ))}

            {/* Twinkling lights */}
            {lights.map((light) => (
                <div
                    key={`light-${light.id}`}
                    style={{
                        position: 'absolute',
                        left: `${light.left}%`,
                        top: `${light.top}%`,
                        width: '8px',
                        height: '8px',
                        backgroundColor: light.color,
                        borderRadius: '50%',
                        opacity: opacity,
                        animation: `twinkle 2s ease-in-out ${light.delay}s infinite`,
                        pointerEvents: 'none',
                        boxShadow: `0 0 10px ${light.color}`,
                    }}
                />
            ))}
        </>
    );
};
