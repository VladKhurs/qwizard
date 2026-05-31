import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../api/rooms";
import RoomCard from "../components/RoomCard";
import Button from "../components/Button";

function RoomListPage({ orgToken }) {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setLoading(true);
    setError("");

    const result = await getRooms();

    if (result.success) {
      setRooms(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleCopyToken = (token) => {
    setCopySuccess(`Токен ${token} скопирован`);
    setTimeout(() => setCopySuccess(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-gray-900 mx-auto mb-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-400 text-sm">Загрузка комнат...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Мои комнаты
          </h1>
          <p className="text-sm text-gray-400">
            Управляйте созданными комнатами и квизами
          </p>
        </div>
        <div className="max-w-200">
          <Button
            onClick={() => navigate("/rooms/create")}
            className="px-5 py-2 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Создать комнату
          </Button>
        </div>
      </div>

      {/* Success message */}
      {copySuccess && (
        <div className="mb-6 flex items-center gap-2.5 bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-lg text-sm">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{copySuccess}</span>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-6 flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
          <svg
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="flex-1">{error}</span>
          <button
            onClick={loadRooms}
            className="text-red-700 underline text-sm font-medium hover:no-underline"
          >
            Повторить
          </button>
        </div>
      )}

      {/* Rooms list */}
      {rooms.length === 0 && !error ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            У вас пока нет комнат
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Создайте первую комнату, чтобы начать создавать квизы
          </p>
          <Button
            onClick={() => navigate("/rooms/create")}
            className="max-w-50 px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Создать комнату
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onCopyToken={handleCopyToken} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomListPage;
