import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParticipantRoom, getRoomParticipants } from '../api/participant';
import ParticipantList from '../components/ParticipantList';
import { getQuizzes } from '../api/quizzes'; // Переиспользуем API для получения квизов

function ParticipantRoomPage({ participantToken, currentRoom, participantName, setCurrentRoom }) {
  const navigate = useNavigate();
  const [room, setRoom] = useState(currentRoom);
  const [participants, setParticipants] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [startingQuiz, setStartingQuiz] = useState(false);

  if (!participantToken) {
    navigate('/join');
    return null;
  }

  useEffect(() => {
    loadRoomData();
  }, [participantToken, currentRoom?.id]);

  const loadRoomData = async () => {
    setLoading(true);
    setError('');

    // Если у нас нет ID комнаты, пытаемся получить его из currentRoom
    const roomId = currentRoom?.id;
    if (!roomId) {
      setError('ID комнаты не найден');
      setLoading(false);
      return;
    }

    // Загружаем информацию о комнате
    const roomResult = await getParticipantRoom(roomId);
    if (roomResult.success) {
      setRoom(roomResult.data);
      setCurrentRoom(roomResult.data);
    } else {
      setError('Не удалось загрузить информацию о комнате');
    }

    // Загружаем список участников (через leaderboard)
    const participantsResult = await getRoomParticipants(roomId);
    if (participantsResult.success) {
      setParticipants(participantsResult.data);
    }

    // Загружаем список квизов для прохождения
    const quizzesResult = await getQuizzes(roomId);
    if (quizzesResult.success) {
      setQuizzes(quizzesResult.data);
    }

    setLoading(false);
  };

  const handleStartQuiz = () => {
    if (!quizzes || quizzes.length === 0) {
      setError('В этой комнате пока нет вопросов');
      return;
    }
    
    setStartingQuiz(true);
    // Переходим к первому вопросу
    navigate(`/participant/quiz/${quizzes[0].id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Загрузка комнаты...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {room?.name || `Комната #${currentRoom?.id}`}
        </h1>
        <p className="text-gray-500">
          Добро пожаловать, <span className="font-semibold text-purple-600">{participantName}</span>!
        </p>
      </div>

      {/* Ошибка */}
      {error && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg text-sm">
          {error}
          <button
            onClick={loadRoomData}
            className="ml-3 text-yellow-700 underline"
          >
            Обновить
          </button>
        </div>
      )}

      {/* Статистика */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{quizzes.length}</div>
          <div className="text-sm opacity-90">Всего вопросов</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{participants.length}</div>
          <div className="text-sm opacity-90">Участников</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">
            {quizzes.filter(q => q.userAnswered).length || 0}
          </div>
          <div className="text-sm opacity-90">Пройдено вопросов</div>
        </div>
      </div>

      {/* Кнопка начала квиза */}
      <div className="mb-8">
        <button
          onClick={handleStartQuiz}
          disabled={startingQuiz || quizzes.length === 0}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {startingQuiz ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Запуск...
            </span>
          ) : quizzes.length === 0 ? (
            '❌ Нет доступных вопросов'
          ) : (
            '🎯 Начать прохождение квиза'
          )}
        </button>
      </div>

      {/* Список участников */}
      <div className="mb-8">
        <ParticipantList participants={participants} title="Участники комнаты" />
      </div>

      {/* Список вопросов */}
      {quizzes.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 text-lg mb-4">
            📝 Вопросы ({quizzes.length})
          </h3>
          <div className="space-y-2">
            {quizzes.map((quiz, index) => (
              <div key={quiz.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="flex-1 text-gray-700">{quiz.question}</span>
                {quiz.timeLimit && (
                  <span className="text-xs text-gray-400">⏱️ {quiz.timeLimit} сек</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ParticipantRoomPage;