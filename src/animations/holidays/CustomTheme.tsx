import React, { useMemo } from 'react';
import { AnimationProps } from '../../types';
import { random, randomInt } from '../../utils/seasonDetector';
import '../../styles/animations.css';

interface CustomParticleInstance {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
    rotation: number;
    element: string | React.ReactNode;
}

export const CustomTheme: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    customParticles,
    opacity
}) => {
    const particles = useMemo<CustomParticleInstance[]>(() => {
        if (!customParticles || customParticles.length === 0) {
            return [];
        }

        const particleArray: CustomParticleInstance[] = [];
        const count = Math.floor(particleCount * (intensity / 100));

        for (let i = 0; i < count; i++) {
            const particleConfig = customParticles[randomInt(0, customParticles.length - 1)];
            const minSize = particleConfig.size?.min || 15;
            const maxSize = particleConfig.size?.max || 30;
            const minSpeed = particleConfig.speed?.min || 8;
            const maxSpeed = particleConfig.speed?.max || 15;

            particleArray.push({
                id: i,
                left: random(0, 100),
                size: random(minSize, maxSize),
                duration: random(minSpeed, maxSpeed),
                delay: random(0, 5),
                drift: random(-80, 80),
                rotation: particleConfig.rotation ? random(-360, 360) : 0,
                element: particleConfig.element,
            });
        }

        return particleArray;
    }, [particleCount, intensity, customParticles]);

    if (!customParticles || customParticles.length === 0) {
        return null;
    }

    return (
        <>
            {particles.map((particle) => (
                <div
                    key={`custom-${particle.id}`}
                    style={{
                        position: 'absolute',
                        left: `${particle.left}%`,
                        top: '-50px',
                        fontSize: typeof particle.element === 'string' ? `${particle.size}px` : undefined,
                        width: typeof particle.element !== 'string' ? `${particle.size}px` : undefined,
                        height: typeof particle.element !== 'string' ? `${particle.size}px` : undefined,
                        opacity: opacity,
                        animation: `confettiFall ${particle.duration}s linear ${particle.delay}s infinite`,
                        // @ts-ignore
                        '--drift': `${particle.drift}px`,
                        '--rotation': `${particle.rotation}deg`,
                        pointerEvents: 'none',
                    }}
                >
                    {particle.element}
                </div>
            ))}
        </>
    );
};
