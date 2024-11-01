import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from './ErrorMessage.module.css'; 

interface ErrorMessageProps {
    message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {

    const messageSpring = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { tension: 300, friction: 30 },
    });

    return (
        <div style={{ textAlign: 'center' }}>
            <animated.div
                style={{
                    ...messageSpring,
                    color: 'white',
                    padding: '15px',
                    border: '1px solid red',
                    borderRadius: '8px',
                    margin: '10px 0',
                    backgroundColor: 'rgba(255, 0, 0, 0.8)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                {message}
            </animated.div>

            {/* 添加多个动态元素 */}
            <div className={styles.dynamicElements}>
                <div className={styles.circle}></div>
                <div className={styles.square}></div>
                <div className={styles.triangle}></div>
            </div>
        </div>
    );
};

export default ErrorMessage;
