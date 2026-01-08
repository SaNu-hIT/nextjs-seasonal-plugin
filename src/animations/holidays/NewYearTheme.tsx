import React, { useMemo, useEffect, useState } from 'react';
import { AnimationProps } from '../../types';
import { random, randomInt } from '../../utils/seasonDetector';
import '../../styles/animations.css';

interface Confetti {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
    rotation: number;
    color: string;
    shape: string;
}

interface Firework {
    id: number;
    left: number;
    top: number;
    color: string;
}

const confettiColors = ['#FF6347', '#FFD700', '#00CED1', '#FF1493', '#9370DB', '#00FF00'];
const confettiShapes = ['🎊', '🎉', '⭐', '✨'];

export const NewYearTheme: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const confetti = useMemo<Confetti[]>(() => {
        const confettiArray: Confetti[] = [];
        const count = Math.floor(particleCount * (intensity / 100));

        for (let i = 0; i < count; i++) {
            confettiArray.push({
                id: i,
                left: random(0, 100),
                size: random(12, 25),
                duration: random(3, 8),
                delay: random(0, 3),
                drift: random(-100, 100),
                rotation: random(360, 1440),
                color: colors?.[randomInt(0, colors.length - 1)] || confettiColors[randomInt(0, confettiColors.length - 1)],
                shape: confettiShapes[randomInt(0, confettiShapes.length - 1)],
            });
        }

        return confettiArray;
    }, [particleCount, intensity, colors]);

    const [fireworks, setFireworks] = useState<Firework[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newFirework: Firework = {
                id: Date.now(),
                left: random(20, 80),
                top: random(10, 50),
                color: confettiColors[randomInt(0, confettiColors.length - 1)],
            };

            setFireworks(prev => [...prev, newFirework]);

            setTimeout(() => {
                setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
            }, 2000);
        }, 2000 / (intensity / 50));

        return () => clearInterval(interval);
    }, [intensity]);

    return (
        <>
            {/* Falling confetti */}
            {confetti.map((piece) => (
                <div
                    key={`confetti-${piece.id}`}
                    style={{
                        position: 'absolute',
                        left: `${piece.left}%`,
                        top: '-30px',
                        fontSize: `${piece.size}px`,
                        opacity: opacity,
                        animation: `confettiFall ${piece.duration}s linear ${piece.delay}s infinite`,
                        // @ts-ignore
                        '--drift': `${piece.drift}px`,
                        '--rotation': `${piece.rotation}deg`,
                        pointerEvents: 'none',
                    }}
                >
                    {piece.shape}
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
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: `4px solid ${firework.color}`,
                        opacity: opacity,
                        animation: 'fireworkBurst 2s ease-out forwards',
                        pointerEvents: 'none',
                        boxShadow: `0 0 30px ${firework.color}, inset 0 0 30px ${firework.color}`,
                    }}
                >
                    {/* Inner burst */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '40px',
                            animation: 'fireworkBurst 2s ease-out forwards',
                        }}
                    >
                        🎆
                    </div>
                </div>
            ))}

            {/* Champagne bubbles */}
            {Array.from({ length: Math.floor(particleCount * 0.1) }).map((_, i) => (
                <div
                    key={`bubble-${i}`}
                    style={{
                        position: 'absolute',
                        left: `${random(0, 100)}%`,
                        bottom: '-10px',
                        width: `${random(3, 8)}px`,
                        height: `${random(3, 8)}px`,
                        backgroundColor: '#FFD700',
                        borderRadius: '50%',
                        opacity: opacity * 0.6,
                        animation: `floatUp ${random(5, 10)}s linear ${random(0, 3)}s infinite`,
                        pointerEvents: 'none',
                        boxShadow: '0 0 5px #FFD700',
                    }}
                />
            ))}
        </>
    );
};
