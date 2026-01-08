import React, { useMemo, useEffect, useState } from 'react';
import { AnimationProps } from '../../types';
import { random, randomInt } from '../../utils/seasonDetector';
import '../../styles/animations.css';

interface Diya {
    id: number;
    left: number;
    bottom: number;
    size: number;
    delay: number;
}

interface Firework {
    id: number;
    left: number;
    top: number;
    color: string;
    delay: number;
}

interface Sparkle {
    id: number;
    left: number;
    bottom: number;
    delay: number;
    duration: number;
}

const fireworkColors = ['#FFD700', '#FF6347', '#FF1493', '#00CED1', '#9370DB', '#FFA500'];

export const DiwaliTheme: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const diyas = useMemo<Diya[]>(() => {
        const diyaArray: Diya[] = [];
        const count = Math.floor((particleCount * (intensity / 100)) * 0.3);

        for (let i = 0; i < count; i++) {
            diyaArray.push({
                id: i,
                left: random(5, 95),
                bottom: random(5, 30),
                size: random(20, 35),
                delay: random(0, 2),
            });
        }

        return diyaArray;
    }, [particleCount, intensity]);

    const [fireworks, setFireworks] = useState<Firework[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newFirework: Firework = {
                id: Date.now(),
                left: random(20, 80),
                top: random(20, 60),
                color: colors?.[randomInt(0, colors.length - 1)] || fireworkColors[randomInt(0, fireworkColors.length - 1)],
                delay: 0,
            };

            setFireworks(prev => [...prev, newFirework]);

            // Remove after animation completes
            setTimeout(() => {
                setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
            }, 2000);
        }, 3000 / (intensity / 50)); // More frequent at higher intensity

        return () => clearInterval(interval);
    }, [intensity, colors]);

    const sparkles = useMemo<Sparkle[]>(() => {
        const sparkleArray: Sparkle[] = [];
        const count = Math.floor(particleCount * (intensity / 100) * 0.4);

        for (let i = 0; i < count; i++) {
            sparkleArray.push({
                id: i,
                left: random(0, 100),
                bottom: random(0, 50),
                delay: random(0, 3),
                duration: random(1, 2),
            });
        }

        return sparkleArray;
    }, [particleCount, intensity]);

    return (
        <>
            {/* Diyas (oil lamps) */}
            {diyas.map((diya) => (
                <div
                    key={`diya-${diya.id}`}
                    style={{
                        position: 'absolute',
                        left: `${diya.left}%`,
                        bottom: `${diya.bottom}px`,
                        fontSize: `${diya.size}px`,
                        opacity: opacity,
                        animation: `diyaFlicker 2s ease-in-out ${diya.delay}s infinite`,
                        pointerEvents: 'none',
                        filter: 'drop-shadow(0 0 8px #FFA500)',
                    }}
                >
                    🪔
                </div>
            ))}

            {/* Firework bursts */}
            {fireworks.map((firework) => (
                <div
                    key={`firework-${firework.id}`}
                    style={{
                        position: 'absolute',
                        left: `${firework.left}%`,
                        top: `${firework.top}%`,
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: `3px solid ${firework.color}`,
                        opacity: opacity,
                        animation: 'fireworkBurst 2s ease-out forwards',
                        pointerEvents: 'none',
                        boxShadow: `0 0 20px ${firework.color}, inset 0 0 20px ${firework.color}`,
                    }}
                />
            ))}

            {/* Sparkles */}
            {sparkles.map((sparkle) => (
                <div
                    key={`sparkle-${sparkle.id}`}
                    style={{
                        position: 'absolute',
                        left: `${sparkle.left}%`,
                        bottom: `${sparkle.bottom}%`,
                        fontSize: '15px',
                        opacity: opacity,
                        animation: `sparkle ${sparkle.duration}s ease-out ${sparkle.delay}s infinite`,
                        pointerEvents: 'none',
                    }}
                >
                    ✨
                </div>
            ))}
        </>
    );
};
