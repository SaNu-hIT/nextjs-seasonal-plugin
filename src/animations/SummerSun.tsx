import React, { useMemo } from 'react';
import { AnimationProps } from '../types';
import { random, randomInt } from '../utils/seasonDetector';
import '../styles/animations.css';

interface SunRay {
    id: number;
    rotation: number;
    width: number;
    length: number;
    duration: number;
    delay: number;
}

interface Particle {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
}

export const SummerSun: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const sunRays = useMemo<SunRay[]>(() => {
        const rays: SunRay[] = [];
        const rayCount = Math.floor(12 * (intensity / 100));

        for (let i = 0; i < rayCount; i++) {
            rays.push({
                id: i,
                rotation: (360 / rayCount) * i,
                width: random(2, 4),
                length: random(100, 200),
                duration: random(3, 6),
                delay: random(0, 2),
            });
        }

        return rays;
    }, [intensity]);

    const particles = useMemo<Particle[]>(() => {
        const parts: Particle[] = [];
        const count = Math.floor(particleCount * (intensity / 100) * 0.3);

        for (let i = 0; i < count; i++) {
            parts.push({
                id: i,
                left: random(0, 100),
                size: random(3, 8),
                duration: random(10, 20),
                delay: random(0, 5),
                drift: random(-30, 30),
            });
        }

        return parts;
    }, [particleCount, intensity]);

    const sunColor = colors?.[0] || '#FFD700';
    const particleColor = colors?.[1] || '#FFA500';

    return (
        <>
            {/* Sun rays from top-right corner */}
            <div
                style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    pointerEvents: 'none',
                }}
            >
                {sunRays.map((ray) => (
                    <div
                        key={ray.id}
                        style={{
                            position: 'absolute',
                            top: '100px',
                            left: '100px',
                            width: `${ray.width}px`,
                            height: `${ray.length}px`,
                            background: `linear-gradient(180deg, ${sunColor} 0%, transparent 100%)`,
                            transformOrigin: 'top center',
                            opacity: opacity * 0.4,
                            animation: `sunRay ${ray.duration}s ease-in-out ${ray.delay}s infinite`,
                            // @ts-ignore
                            '--rotation': `${ray.rotation}deg`,
                            pointerEvents: 'none',
                        }}
                    />
                ))}
            </div>

            {/* Floating light particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    style={{
                        position: 'absolute',
                        left: `${particle.left}%`,
                        bottom: '-10px',
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particleColor,
                        borderRadius: '50%',
                        opacity: opacity * 0.5,
                        animation: `floatUp ${particle.duration}s linear ${particle.delay}s infinite`,
                        // @ts-ignore
                        '--drift': `${particle.drift}px`,
                        pointerEvents: 'none',
                        boxShadow: `0 0 ${particle.size * 2}px ${particleColor}`,
                    }}
                />
            ))}

            {/* Heat shimmer effect */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at top right, ${sunColor}15 0%, transparent 50%)`,
                    opacity: opacity * 0.3,
                    animation: 'shimmer 4s ease-in-out infinite',
                    pointerEvents: 'none',
                }}
            />
        </>
    );
};
