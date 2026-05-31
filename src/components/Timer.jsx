import React, { useState, useEffect } from 'react';

function Timer({ initialTime, onTimeOut, isActive = true }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!isActive || initialTime <= 0) return;

    if (timeLeft <= 0) {
      if (onTimeOut) onTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        // Активируем предупреждение за 5 секунд
        if (newTime <= 5 && newTime > 0) {
          setIsWarning(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeOut, initialTime]);

  // Форматирование времени
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return `${secs} сек`;
  };

  // Определяем цвет в зависимости от времени
  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-red-600';
    if (timeLeft <= 10) return 'text-orange-500';
    return 'text-gray-700';
  };

  // Процент времени для прогресс-бара
  const percentage = (timeLeft / initialTime) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        {/* Круговой прогресс */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke={timeLeft <= 5 ? '#dc2626' : timeLeft <= 10 ? '#f97316' : '#8b5cf6'}
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - percentage / 100)}`}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-bold ${getTimerColor()}`}>
            {formatTime(timeLeft)}
          </span>
          {isWarning && timeLeft <= 5 && (
            <span className="text-xs text-red-500 animate-pulse">⏰</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timer;