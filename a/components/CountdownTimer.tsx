import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface CountdownTimerProps {
    expiryTimestamp: number;
    onComplete: () => void;
}

const calculateTimeLeft = (expiry: number) => {
    const difference = expiry - Date.now();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};


const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiryTimestamp, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryTimestamp));

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(expiryTimestamp);
            setTimeLeft(newTimeLeft);

            if (Object.values(newTimeLeft).every(val => val === 0)) {
                clearInterval(timer);
                onComplete();
            }
        }, 1000);
        
        return () => clearInterval(timer);
    }, [expiryTimestamp, onComplete]);

    const timerComponents = [
        { label: 'd', value: timeLeft.days },
        { label: 'h', value: timeLeft.hours },
        { label: 'm', value: timeLeft.minutes },
        { label: 's', value: timeLeft.seconds },
    ];

    return (
        <div className="bg-indigo-50 p-6 rounded-lg text-center shadow-inner">
            <h2 className="text-lg font-semibold text-indigo-800 flex items-center justify-center gap-2">
                 <Icon name="time-outline" />
                Time left to join:
            </h2>
            <div className="text-5xl font-bold text-indigo-600 mt-2 tracking-wider">
                {timerComponents.map(c => `${String(c.value).padStart(2, '0')}${c.label}`).join(' ')}
            </div>
        </div>
    );
};

export default CountdownTimer;