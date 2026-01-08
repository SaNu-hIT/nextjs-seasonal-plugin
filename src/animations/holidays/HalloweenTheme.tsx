import React, { useMemo } from 'react';
import { AnimationProps } from '../../types';
import { random, randomInt } from '../../utils/seasonDetector';
import '../../styles/animations.css';

interface Bat {
    id: number;
    startY: number;
    size: number;
    duration: number;
    delay: number;
}

interface Ghost {
    id: number;
    left: number;
    top: number;
    size: number;
    duration: number;
    delay: number;
}

interface Pumpkin {
    id: number;
    left: number;
    bottom: number;
    size: number;
    delay: number;
}

export const HalloweenTheme: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const bats = useMemo<Bat[]>(() => {
        const batArray: Bat[] = [];
        const count = Math.floor((particleCount * (intensity / 100)) * 0.3);

        for (let i = 0; i < count; i++) {
            batArray.push({
                id: i,
                startY: random(10, 80),
                size: random(20, 35),
                duration: random(8, 15),
                delay: random(0, 8),
            });
        }

        return batArray;
    }, [particleCount, intensity]);

    const ghosts = useMemo<Ghost[]>(() => {
        const ghostArray: Ghost[] = [];
        const count = Math.floor((particleCount * (intensity / 100)) * 0.2);

        for (let i = 0; i < count; i++) {
            ghostArray.push({
                id: i,
                left: random(5, 95),
                top: random(10, 70),
                size: random(30, 50),
                duration: random(4, 8),
                delay: random(0, 4),
            });
        }

        return ghostArray;
    }, [particleCount, intensity]);

    const pumpkins = useMemo<Pumpkin[]>(() => {
        const pumpkinArray: Pumpkin[] = [];
        const count = Math.floor((particleCount * (intensity / 100)) * 0.15);

        for (let i = 0; i < count; i++) {
            pumpkinArray.push({
                id: i,
                left: random(5, 95),
                bottom: random(5, 25),
                size: random(25, 40),
                delay: random(0, 3),
            });
        }

        return pumpkinArray;
    }, [particleCount, intensity]);

    return (
        <>
            {/* Flying bats */}
            {bats.map((bat) => (
                <div
                    key={`bat-${bat.id}`}
                    style={{
                        position: 'absolute',
                        left: '-50px',
                        top: '0',
                        fontSize: `${bat.size}px`,
                        opacity: opacity * 0.8,
                        animation: `batFly ${bat.duration}s linear ${bat.delay}s infinite`,
                        // @ts-ignore
                        '--start-y': `${bat.startY}vh`,
                        pointerEvents: 'none',
                    }}
                >
                    🦇
                </div>
            ))}

            {/* Floating ghosts */}
            {ghosts.map((ghost) => (
                <div
                    key={`ghost-${ghost.id}`}
                    style={{
                        position: 'absolute',
                        left: `${ghost.left}%`,
                        top: `${ghost.top}%`,
                        fontSize: `${ghost.size}px`,
                        opacity: opacity * 0.7,
                        animation: `ghostFloat ${ghost.duration}s ease-in-out ${ghost.delay}s infinite`,
                        pointerEvents: 'none',
                        filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
                    }}
                >
                    👻
                </div>
            ))}

            {/* Pumpkins */}
            {pumpkins.map((pumpkin) => (
                <div
                    key={`pumpkin-${pumpkin.id}`}
                    style={{
                        position: 'absolute',
                        left: `${pumpkin.left}%`,
                        bottom: `${pumpkin.bottom}px`,
                        fontSize: `${pumpkin.size}px`,
                        opacity: opacity,
                        animation: `twinkle 3s ease-in-out ${pumpkin.delay}s infinite`,
                        pointerEvents: 'none',
                        filter: 'drop-shadow(0 0 8px #FF6347)',
                    }}
                >
                    🎃
                </div>
            ))}

            {/* Spooky atmosphere overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(75, 0, 130, 0.1) 100%)',
                    opacity: opacity * 0.5,
                    pointerEvents: 'none',
                }}
            />
        </>
    );
};
