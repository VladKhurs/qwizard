import React from 'react';

function QuizProgress({ current, total, completed, currentScore, totalScore }) {
  const percentage = (current / total) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium text-gray-600">
          Прогресс прохождения
        </div>
        <div className="text-sm font-semibold text-purple-600">
          {current} из {total} вопросов
        </div>
      </div>
      
      {/* Прогресс-бар */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <div className="text-gray-600">
          ✅ Пройдено: {completed}
        </div>
        <div className="text-gray-600">
          💯 Текущий счет: {currentScore} / {totalScore || '?'}
        </div>
      </div>
    </div>
  );
}

export default QuizProgress;