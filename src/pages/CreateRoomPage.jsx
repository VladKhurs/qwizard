import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../api/rooms";
import Button from "../components/Button";

function CreateRoomPage({ orgToken, setCurrentRoom }) {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await createRoom(roomName.trim() || undefined);

    if (result.success) {
      setCurrentRoom(result.data);
      navigate(`/rooms/${result.data.id}/quizzes`);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-lg">
        {/* Назад */}
        <button
          onClick={() => navigate("/rooms")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад к списку комнат
        </button>

        {/* Карточка */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Создание комнаты
            </h1>
            <p className="text-gray-500 text-sm">
              Комната — это пространство, где будут храниться ваши квизы и участники
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название комнаты
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="Например: Викторина по фильмам"
                disabled={loading}
              />
              <p className="mt-1.5 text-xs text-gray-400">
                Название опционально. Если не указать, будет присвоен ID комнаты
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-[100%]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Создание...
                </span>
              ) : (
                "Создать комнату"
              )}
            </Button>
          </form>

          {/* Подсказка */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 leading-relaxed">
              После создания вы получите invite-токен. По этому токену участники смогут присоединиться. Добавляйте вопросы и настраивайте квизы в комнате.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomPage;