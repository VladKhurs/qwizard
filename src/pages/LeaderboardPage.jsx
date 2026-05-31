import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeaderboardTable from "../components/LeaderboardTable";
import { getLeaderboard } from "../api/leaderboard";
import { getRoomById } from "../api/rooms";
import { getParticipantRoom } from "../api/participant";

function LeaderboardPage({ orgToken, participantToken }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    loadLeaderboard();

    // Автообновление каждые 10 секунд
    let interval;
    if (autoRefresh) {
      interval = setInterval(loadLeaderboard, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [roomId, autoRefresh]);

  const loadLeaderboard = async () => {
    setLoading(true);

    // Загружаем информацию о комнате
    let roomResult;
    if (orgToken) {
      roomResult = await getRoomById(roomId);
    } else if (participantToken) {
      roomResult = await getParticipantRoom(roomId);
    }

    if (roomResult && roomResult.success) {
      setRoom(roomResult.data);
    }

    // Загружаем таблицу лидеров
    const result = await getLeaderboard(roomId);

    if (result.success) {
      setLeaderboard(result.data);
      setError("");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Загрузка таблицы лидеров...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Заголовок */}
      <div className="mb-8">
        <button
          onClick={() => navigate(orgToken ? "/rooms" : "/participant/room")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {room?.name || `Комната #${roomId}`}
        </h1>
        <p className="text-gray-500">Рейтинг участников квиза</p>
      </div>

      {/* Управление */}
      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Обновлено: {new Date().toLocaleTimeString()}
        </div>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            autoRefresh
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {autoRefresh
            ? "🔴 Автообновление включено"
            : "🟢 Включить автообновление"}
        </button>
      </div>

      {/* Ошибка */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
          <button
            onClick={loadLeaderboard}
            className="ml-3 text-red-700 underline"
          >
            Повторить
          </button>
        </div>
      )}

      {/* Таблица лидеров */}
      <LeaderboardTable leaderboard={leaderboard} />

      {/* Информация о комнате */}
      {room && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p>
            Invite-токен:{" "}
            <code className="bg-gray-200 px-2 py-1 rounded">
              {room.inviteToken}
            </code>
          </p>
          <p className="mt-1">
            Создана: {new Date(room.createdAt).toLocaleDateString()} {}
          </p>
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
