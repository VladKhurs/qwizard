import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function RoomCard({ room, onCopyToken }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  const handleCopy = () => {
    const link = `${window.location.origin}/join?token=${room.inviteToken}`;
    navigator.clipboard.writeText(link);
    onCopyToken?.(room.inviteToken);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-gray-900">
            {room.name || `Комната #${room.id}`}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Создана {formatDate(room.createdAt)} • ID {room.id}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-gray-600"
          title="Скопировать ссылку"
        >
          Копировать ссылку
        </button>
      </div>

      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        <Button onClick={() => navigate(`/rooms/${room.id}/quizzes`)}>
          Вопросы
        </Button>
        <Button onClick={() => navigate(`/leaderboard/${room.id}`)} variant="secondary">
          Лидеры
        </Button>
      </div>
    </div>
  );
}

export default RoomCard;
