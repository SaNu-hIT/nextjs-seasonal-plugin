import React, { useMemo } from 'react';
import { AnimationProps } from '../types';
import { random, randomInt } from '../utils/seasonDetector';
import '../styles/animations.css';

interface Leaf {
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

const leafShapes = ['🍂', '🍁'];
const leafColors = ['#D2691E', '#FF6347', '#FF8C00', '#CD853F', '#8B4513'];

export const AutumnLeaves: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const leaves = useMemo<Leaf[]>(() => {
        const leafArray: Leaf[] = [];
        const count = Math.floor(particleCount * (intensity / 100));

        for (let i = 0; i < count; i++) {
            leafArray.push({
                id: i,
                left: random(0, 100),
                size: random(15, 30),
                duration: random(8, 15),
                delay: random(0, 5),
                drift: random(-100, 100),
                rotation: random(360, 1080),
                color: colors?.[randomInt(0, colors.length - 1)] || leafColors[randomInt(0, leafColors.length - 1)],
                shape: leafShapes[randomInt(0, leafShapes.length - 1)],
            });
        }

        return leafArray;
    }, [particleCount, intensity, colors]);

    return (
        <>
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    style={{
                        position: 'absolute',
                        left: `${leaf.left}%`,
                        top: '-30px',
                        fontSize: `${leaf.size}px`,
                        opacity: opacity,
                        animation: `leafFall ${leaf.duration}s ease-in-out ${leaf.delay}s infinite, leafSway 3s ease-in-out infinite`,
                        // @ts-ignore
                        '--drift': `${leaf.drift}px`,
                        '--rotation': `${leaf.rotation}deg`,
                        pointerEvents: 'none',
                        filter: `hue-rotate(${random(-20, 20)}deg)`,
                    }}
                >
                    {leaf.shape}
                </div>
            ))}
        </>
    );
};
