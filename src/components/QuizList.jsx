import React from 'react';

function QuizList({ quizzes, onEdit, onDelete }) {
  if (quizzes.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-base font-medium text-gray-900 mb-2">
          Нет вопросов
        </h3>
        <p className="text-sm text-gray-400">
          Нажмите "Добавить вопрос", чтобы начать
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {quizzes.map((quiz, index) => (
        <div key={quiz.id} className="bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono">
                  Вопрос #{index + 1}
                </span>
                {quiz.timeLimit && (
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {quiz.timeLimit} сек
                  </span>
                )}
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {quiz.answers?.length || 0} ответов
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(quiz)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Редактировать"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(quiz.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                  title="Удалить"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <h3 className="text-base font-medium text-gray-900 mb-2">
              {quiz.question}
            </h3>
            
            {quiz.imageUrl && (
              <img src={quiz.imageUrl} alt="Question" className="h-20 object-cover rounded-lg mb-3" />
            )}
            
            <div className="text-xs text-gray-400">
              Правильных ответов: {quiz.answers?.filter(a => a.isCorrect).length}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizList;