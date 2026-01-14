import React, { useMemo } from 'react';
import { AnimationProps } from '../types';
import { random } from '../utils/seasonDetector';
import '../styles/animations.css';

interface Raindrop {
    id: number;
    left: number;
    height: number;
    duration: number;
    delay: number;
}

export const Rain: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const drops = useMemo<Raindrop[]>(() => {
        const items: Raindrop[] = [];
        // Rain needs more particles to look good, so we multiply count
        const count = Math.floor(particleCount * 2 * (intensity / 100));

        for (let i = 0; i < count; i++) {
            items.push({
                id: i,
                left: random(0, 100),
                height: random(10, 20),
                duration: random(0.5, 1.0), // Fast falling
                delay: random(0, 2),
            });
        }

        return items;
    }, [particleCount, intensity]);

    const defaultColor = colors?.[0] || '#a4c5e3'; // Light blue rain

    return (
        <>
            {drops.map((drop) => (
                <div
                    key={drop.id}
                    className="rain-drop"
                    style={{
                        position: 'absolute',
                        left: `${drop.left}%`,
                        top: '-20px',
                        width: '1px',
                        height: `${drop.height}px`,
                        backgroundColor: defaultColor,
                        opacity: opacity * 0.6,
                        animation: `rainfall ${drop.duration}s linear ${drop.delay}s infinite`,
                        // @ts-ignore
                        '--fall-duration': `${drop.duration}s`,
                    }}
                />
            ))}
        </>
    );
};
