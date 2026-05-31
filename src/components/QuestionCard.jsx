import React, { useState } from 'react';
import Timer from './Timer';

function QuestionCard({ question, questionNumber, totalQuestions, onSubmit, isSubmitting }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const handleAnswerSelect = (answerId) => {
    if (answerSubmitted) return;
    
    setSelectedAnswers(prev => {
      // Поддерживаем множественный выбор (если нужно)
      if (prev.includes(answerId)) {
        return prev.filter(id => id !== answerId);
      } else {
        return [...prev, answerId];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) {
      alert('Пожалуйста, выберите хотя бы один вариант ответа');
      return;
    }
    
    setAnswerSubmitted(true);
    onSubmit(selectedAnswers);
  };

  const handleTimeOut = () => {
    if (!answerSubmitted && selectedAnswers.length > 0) {
      // Если время вышло, отправляем выбранные ответы
      handleSubmit();
    } else if (!answerSubmitted) {
      // Если не выбрано ни одного ответа, отправляем пустой массив
      setAnswerSubmitted(true);
      onSubmit([]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header с прогрессом */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <div className="flex justify-between items-center text-white">
          <div className="text-sm font-medium">
            Вопрос {questionNumber} из {totalQuestions}
          </div>
          {question.timeLimit > 0 && (
            <Timer 
              initialTime={question.timeLimit} 
              onTimeOut={handleTimeOut}
              isActive={!answerSubmitted && !isSubmitting}
            />
          )}
        </div>
      </div>

      {/* Body с вопросом */}
      <div className="p-6">
        {/* Текст вопроса */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {question.question}
        </h2>

        {/* Картинка (если есть) */}
        {question.imageUrl && (
          <div className="mb-6">
            <img 
              src={question.imageUrl} 
              alt="Question illustration" 
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              style={{ maxHeight: '300px' }}
            />
          </div>
        )}

        {/* Варианты ответов */}
        <div className="space-y-3 mb-6">
          {question.answers.map((answer) => (
            <label
              key={answer.id}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                ${answerSubmitted 
                  ? 'border-gray-200 bg-gray-50 cursor-default' 
                  : selectedAnswers.includes(answer.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
            >
              <input
                type="checkbox"
                checked={selectedAnswers.includes(answer.id)}
                onChange={() => handleAnswerSelect(answer.id)}
                disabled={answerSubmitted || isSubmitting}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 mr-3"
              />
              <span className="text-gray-700 flex-1">{answer.text}</span>
            </label>
          ))}
        </div>

        {/* Кнопка отправки */}
        {!answerSubmitted && (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
              </span>
            ) : (
              'Далее →'
            )}
          </button>
        )}

        {/* Сообщение об отправке */}
        {answerSubmitted && !isSubmitting && (
          <div className="text-center text-green-600 font-medium">
            ✓ Ответ сохранен
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;