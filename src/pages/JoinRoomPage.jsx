import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { joinRoom } from "../api/participant";

function JoinRoomPage({ onParticipantJoin, participantToken }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    inviteToken: searchParams.get("token") || "",
    participantName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (participantToken) {
    navigate("/participant/room");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.inviteToken.trim()) {
      setError("Введите invite-токен комнаты");
      setLoading(false);
      return;
    }

    if (!formData.participantName.trim()) {
      setError("Введите ваше имя");
      setLoading(false);
      return;
    }

    if (formData.participantName.length < 2) {
      setError("Имя должно содержать минимум 2 символа");
      setLoading(false);
      return;
    }

    if (formData.participantName.length > 20) {
      setError("Имя не должно превышать 20 символов");
      setLoading(false);
      return;
    }

    const result = await joinRoom(
      formData.inviteToken.trim(),
      formData.participantName.trim(),
    );

    if (result.success) {
      onParticipantJoin(
        result.data.participantToken,
        result.data.participantName,
        { id: result.data.roomId },
      );
      navigate("/participant/room");
    } else {
      if (result.status === 400) {
        setError("Неверный токен или имя уже занято в этой комнате");
      } else if (result.status === 404) {
        setError("Комната с таким invite-токеном не найдена");
      } else {
        setError(result.error);
      }
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Заголовок */}

        {/* Карточка формы */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            {/* <div className="inline-flex items-center justify-center w-14 h-14 bg-violet-600 rounded-xl mb-4">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div> */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Вступить в квиз
            </h1>
            <p className="text-gray-500 text-sm">
              Введите invite-токен и ваше уникальное имя
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Invite токен */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invite-токен комнаты
              </label>
              <input
                type="text"
                name="inviteToken"
                value={formData.inviteToken}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono text-sm outline-none"
                placeholder="abc123def456"
                disabled={loading}
                autoComplete="off"
              />
              <p className="mt-1 text-sm text-gray-500">
                Получите токен от организатора квиза
              </p>
            </div>

            {/* Имя участника */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                name="participantName"
                value={formData.participantName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                placeholder="Ваше уникальное имя"
                disabled={loading}
                maxLength="20"
              />
              <p className="mt-1 text-sm text-gray-500">
                2–20 символов, уникальное в комнате
              </p>
            </div>

            {/* Ошибка */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Кнопка */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 text-white py-2.5 rounded-lg hover:bg-violet-700 transition font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Присоединение...
                </span>
              ) : (
                "Вступить в квиз"
              )}
            </button>
          </form>

          {/* Инструкция */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Как это работает?
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Получите invite-токен от организатора комнаты</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Введите токен и ваше уникальное имя</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>
                  После вступления вы сможете пройти все квизы комнаты
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinRoomPage;
