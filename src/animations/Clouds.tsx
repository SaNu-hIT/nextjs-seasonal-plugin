import React, { useMemo } from 'react';
import { AnimationProps } from '../types';
import { random } from '../utils/seasonDetector';
import '../styles/animations.css';

interface Cloud {
    id: number;
    top: number;
    delay: number;
    duration: number;
    scale: number;
    opacity: number;
}

// Base64 Cloud Image
const CLOUD_IMG = "data:image/png;base64,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";

export const Clouds: React.FC<AnimationProps> = ({
    intensity,
    particleCount,
    colors,
    opacity
}) => {
    const clouds = useMemo<Cloud[]>(() => {
        const items: Cloud[] = [];
        // Fewer clouds than particles usually - adjust count based on intensity
        const count = Math.max(2, Math.floor(particleCount * 0.15 * (intensity / 100)));

        for (let i = 0; i < count; i++) {
            items.push({
                id: i,
                top: random(5, 60), // Top part of screen to mid
                scale: random(0.6, 1.5), // Varied sizes
                duration: random(25, 60), // Slow movement
                delay: random(0, 20), // Staggered starts
                opacity: random(0.6, 0.9),
            });
        }

        return items;
    }, [particleCount, intensity]);

    return (
        <div className="clouds-container" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
        }}>
            {clouds.map((cloud) => (
                <img
                    key={cloud.id}
                    src={CLOUD_IMG}
                    alt="cloud"
                    className="cloud"
                    style={{
                        position: 'absolute',
                        left: -300, // Start off-screen
                        top: `${cloud.top}%`,
                        width: '300px', // Base size
                        height: 'auto',
                        opacity: opacity * cloud.opacity,
                        transform: `scale(${cloud.scale})`,
                        animation: `cloudMove ${cloud.duration}s linear ${cloud.delay}s infinite`,
                    }}
                />
            ))}
        </div>
    );
};
