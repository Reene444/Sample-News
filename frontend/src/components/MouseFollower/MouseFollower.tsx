import * as React from 'react';
import { useTrail, animated } from '@react-spring/web';

import styles from './MouseFollower.module.css';

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x: number, y: number) =>
    `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

interface MouseFollowerProps {
    trailCount?: number;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({ trailCount = 3 }) => {
    const [trail, api] = useTrail(trailCount, (i) => ({
        xy: [0, 0],
        config: i === 0 ? fast : slow,
    }));

    // Update the position based on global mouse move events
    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            api.start({ xy: [e.clientX, e.clientY] });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [api]);

    return (
        <div className={styles.fixedContainer}>
            {/* SVG filter for gooey effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
                    <feColorMatrix
                        in="blur"
                        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
                    />
                </filter>
            </svg>

            {/* Main container to hold the animated trail */}
            <div className={styles.hooksMain}>
                {trail.map((props, index) => (
                    <animated.div
                        key={index}
                        className={styles.trail}
                        style={{ transform: props.xy.to(trans) }}
                    />
                ))}
            </div>
        </div>
    );
};

export default MouseFollower;
