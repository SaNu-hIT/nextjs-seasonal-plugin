import React, { useMemo } from 'react';
import { AnimationProps } from '../types';
import { random, randomInt } from '../utils/seasonDetector';
import '../styles/animations.css';

interface Petal {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
    rotation: number;
    shape: string;
}

interface Butterfly {
    id: number;
    duration: number;
    delay: number;
    size: number;
}

const petalShapes = ['🌸', '🌺', '🌼', '🌻', '🏵️'];
const butterflyShapes = ['🦋', '🦋'];

export const SpringFlowers: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const petals = useMemo<Petal[]>(() => {
        const petalArray: Petal[] = [];
        const count = Math.floor(particleCount * (intensity / 100));

        for (let i = 0; i < count; i++) {
            petalArray.push({
                id: i,
                left: random(0, 100),
                size: random(15, 25),
                duration: random(10, 20),
                delay: random(0, 5),
                drift: random(-80, 80),
                rotation: random(-360, 360),
                shape: petalShapes[randomInt(0, petalShapes.length - 1)],
            });
        }

        return petalArray;
    }, [particleCount, intensity]);

    const butterflies = useMemo<Butterfly[]>(() => {
        const butterflyArray: Butterfly[] = [];
        const count = Math.floor((particleCount * (intensity / 100)) * 0.1); // Fewer butterflies

        for (let i = 0; i < count; i++) {
            butterflyArray.push({
                id: i,
                duration: random(8, 15),
                delay: random(0, 8),
                size: random(20, 30),
            });
        }

        return butterflyArray;
    }, [particleCount, intensity]);

    return (
        <>
            {/* Floating petals */}
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
                    {petal.shape}
                </div>
            ))}

            {/* Butterflies */}
            {butterflies.map((butterfly) => (
                <div
                    key={`butterfly-${butterfly.id}`}
                    style={{
                        position: 'absolute',
                        left: `${random(0, 100)}%`,
                        bottom: '-30px',
                        fontSize: `${butterfly.size}px`,
                        opacity: opacity * 0.9,
                        animation: `butterflyFly ${butterfly.duration}s ease-in-out ${butterfly.delay}s infinite`,
                        pointerEvents: 'none',
                    }}
                >
                    🦋
                </div>
            ))}
        </>
    );
};
