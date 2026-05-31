import React from 'react';

function ResultCard({ totalScore, participantName, totalQuestions, answeredQuestions }) {
  const percentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  
  // Определяем поздравление в зависимости от результата
  const getCongratulation = () => {
    if (percentage === 100) return "🎉 Идеально! Ты ответил на все вопросы!";
    if (percentage >= 80) return "🌟 Отличный результат! Ты справился на отлично!";
    if (percentage >= 60) return "👍 Хорошая работа! Так держать!";
    if (percentage >= 40) return "💪 Неплохо! В следующий раз будет еще лучше!";
    return "📚 Спасибо за участие! Практикуйся и побеждай!";
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Заголовок с градиентом */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-center text-white">
        <div className="text-6xl mb-3">🏆</div>
        <h2 className="text-2xl font-bold mb-2">Поздравляем, {participantName}!</h2>
        <p className="text-emerald-100">Вы успешно завершили квиз</p>
      </div>

      {/* Результаты */}
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-6 mb-4">
            <div className="text-4xl font-bold text-white">{totalScore}</div>
            <div className="text-sm text-white/90">баллов</div>
          </div>
          <p className="text-gray-600">
            Вы ответили на {answeredQuestions} из {totalQuestions} вопросов
          </p>
        </div>

        {/* Прогресс-бар */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Пройдено вопросов</span>
            <span className="font-semibold text-green-600">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Поздравление */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800">{getCongratulation()}</p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;