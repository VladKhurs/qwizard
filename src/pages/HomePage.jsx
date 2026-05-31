import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function HomePage({ orgToken, participantToken }) {
  const navigate = useNavigate();
  const isOrgLoggedIn = !!orgToken;
  const isParticipantLoggedIn = !!participantToken;

  return (
    <div className="">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero секция */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Добро пожаловать в Quizard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Создавай квизы, приглашай друзей и проверяй свои знания в
            увлекательном формате
          </p>
        </div>

        {/* Карточки выбора */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Карточка организатора */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-xl mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Я организатор
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Создавай комнаты, добавляй вопросы, настраивай баллы и приглашай
                участников
              </p>
              {isOrgLoggedIn ? (
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate("/rooms")}
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    Мои комнаты
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/rooms/create")}
                    className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
                  >
                    Создать новую комнату
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate("/login")}
                    className="w-[100%]"
                    variant="primary"
                  >
                    Войти
                  </Button>

                  <Button
                    onClick={() => navigate("/register")}
                    className="w-[100%]"
                    variant="outline"
                  >
                    Зарегистрироваться
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Карточка участника */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-xl mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Я участник
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Вступай в квизы по приглашению, отвечай на вопросы и зарабатывай
                баллы
              </p>
              {isParticipantLoggedIn ? (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/participant/room")}
                    className="w-full px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-medium"
                  >
                    Перейти в комнату
                  </button>
                  <button
                    onClick={() => navigate("/leaderboard")}
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    Таблица лидеров
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => navigate("/join")}
                  className="w-[100%]"
                  variant="primary"
                >
                  Вступить в квиз
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Информационная секция */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-center text-gray-900 mb-8">
            Как это работает?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-full font-semibold text-gray-700 text-base mb-3">
                1
              </div>
              <p className="font-semibold text-gray-800 mb-1">
                Организатор создаёт комнату
              </p>
              <p className="text-sm text-gray-500">
                Настраивает вопросы и получает пригласительный токен
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-full font-semibold text-gray-700 text-base mb-3">
                2
              </div>
              <p className="font-semibold text-gray-800 mb-1">
                Участники вступают
              </p>
              <p className="text-sm text-gray-500">
                По токену и уникальному имени в комнате
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-full font-semibold text-gray-700 text-base mb-3">
                3
              </div>
              <p className="font-semibold text-gray-800 mb-1">Проходят квиз</p>
              <p className="text-sm text-gray-500">
                Отвечают на вопросы и получают баллы
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
