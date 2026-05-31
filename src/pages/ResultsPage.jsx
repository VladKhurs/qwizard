import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import LeaderboardTable from '../components/LeaderboardTable';
import ShareResults from '../components/ShareResults';
import { getLeaderboard } from '../api/leaderboard';
import { getParticipantRoom } from '../api/participant';

function ResultsPage({ participantToken, participantName, currentRoom }) {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [room, setRoom] = useState(currentRoom);

  if (!participantToken) {
    navigate('/join');
    return null;
  }

  useEffect(() => {
    loadResults();
  }, [currentRoom?.id]);

  const loadResults = async () => {
    setLoading(true);
    
    // Получаем сохраненный счет из localStorage
    const savedScore = localStorage.getItem('quizTotalScore');
    const savedRoomId = localStorage.getItem('quizRoomId');
    
    if (savedScore) {
      setTotalScore(parseInt(savedScore));
    }
    
    const roomId = currentRoom?.id || savedRoomId;
    
    if (!roomId) {
      setError('Не удалось определить комнату');
      setLoading(false);
      return;
    }
    
    // Загружаем информацию о комнате
    const roomResult = await getParticipantRoom(roomId);
    if (roomResult.success) {
      setRoom(roomResult.data);
    }
    
    // Загружаем таблицу лидеров
    const leaderboardResult = await getLeaderboard(roomId);
    if (leaderboardResult.success) {
      setLeaderboard(leaderboardResult.data);
      
      // Находим свое место
      const myEntry = leaderboardResult.data.find(
        entry => entry.participantName === participantName
      );
      if (myEntry && !savedScore) {
        setTotalScore(myEntry.totalScore);
      }
    } else {
      setError(leaderboardResult.error);
    }
    
    // Очищаем localStorage после загрузки
    localStorage.removeItem('quizTotalScore');
    localStorage.removeItem('quizRoomId');
    
    setLoading(false);
  };

  // Находим место участника в таблице
  const getRank = () => {
    const index = leaderboard.findIndex(entry => entry.participantName === participantName);
    return index !== -1 ? index + 1 : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Загрузка результатов...</p>
        </div>
      </div>
    );
  }

  const rank = getRank();
  const totalParticipants = leaderboard.length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Основные результаты */}
      <div className="mb-8">
        <ResultCard
          totalScore={totalScore}
          participantName={participantName}
          totalQuestions={totalQuestions}
          answeredQuestions={answeredQuestions}
        />
      </div>

      {/* Информация о месте */}
      {rank && (
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-purple-800 mb-2">
            Ваше место: {rank} из {totalParticipants}
          </div>
          <div className="text-purple-600">
            {rank === 1 && "👑 Вы лидер! Отличная работа!"}
            {rank === 2 && "🥈 Вы на втором месте! Еще немного до победы!"}
            {rank === 3 && "🥉 Вы в топ-3! Так держать!"}
            {rank > 3 && "💪 Вы можете подняться выше в следующий раз!"}
          </div>
        </div>
      )}

      {/* Кнопки навигации */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => navigate('/participant/room')}
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          🎮 Вернуться в комнату
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
        >
          🏠 На главную
        </button>
      </div>

      {/* Таблица лидеров */}
      <div className="mb-8">
        <LeaderboardTable 
          leaderboard={leaderboard} 
          title="Общий рейтинг комнаты"
        />
      </div>

      {/* Шеринг результатов */}
      <ShareResults
        participantName={participantName}
        score={totalScore}
        totalQuestions={totalQuestions}
        roomName={room?.name || `Комната #${currentRoom?.id}`}
      />

      {/* Ошибка */}
      {error && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

export default ResultsPage;