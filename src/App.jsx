import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorAlert from "./components/ErrorAlert";
import SuccessAlert from "./components/SuccessAlert";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import RoomListPage from "./pages/RoomListPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import QuizManagementPage from "./pages/QuizManagementPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import ParticipantRoomPage from "./pages/ParticipantRoomPage";
import TakeQuizPage from "./pages/TakeQuizPage";
import ResultsPage from "./pages/ResultsPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  // Глобальное состояние
  const [orgToken, setOrgToken] = useState(
    localStorage.getItem("orgToken") || null,
  );
  const [participantToken, setParticipantToken] = useState(
    localStorage.getItem("participantToken") || null,
  );
  const [currentRoom, setCurrentRoom] = useState(null);
  const [participantName, setParticipantName] = useState(
    localStorage.getItem("participantName") || null,
  );
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [globalSuccess, setGlobalSuccess] = useState(null);

  // Синхронизация токенов с localStorage
  useEffect(() => {
    if (orgToken) {
      localStorage.setItem("orgToken", orgToken);
    } else {
      localStorage.removeItem("orgToken");
    }
  }, [orgToken]);

  useEffect(() => {
    if (participantToken) {
      localStorage.setItem("participantToken", participantToken);
    } else {
      localStorage.removeItem("participantToken");
    }
  }, [participantToken]);

  useEffect(() => {
    if (participantName) {
      localStorage.setItem("participantName", participantName);
    } else {
      localStorage.removeItem("participantName");
    }
  }, [participantName]);

  // Методы для работы с состоянием
  const handleOrgLogin = (token) => {
    setOrgToken(token);
    setParticipantToken(null);
    setParticipantName(null);
    showSuccess("Успешный вход в систему!");
  };

  const handleOrgLogout = () => {
    setOrgToken(null);
    setCurrentRoom(null);
    showSuccess("Вы вышли из аккаунта");
  };

  const handleParticipantJoin = (token, name, room) => {
    setParticipantToken(token);
    setParticipantName(name);
    setCurrentRoom(room);
    setOrgToken(null);
    showSuccess(`Добро пожаловать, ${name}!`);
  };

  const handleParticipantLogout = () => {
    setParticipantToken(null);
    setParticipantName(null);
    setCurrentRoom(null);
    showSuccess("Вы вышли из комнаты");
  };

  // Уведомления
  const showError = (message) => {
    setGlobalError(message);
    setTimeout(() => setGlobalError(null), 5000);
  };

  const showSuccess = (message) => {
    setGlobalSuccess(message);
    setTimeout(() => setGlobalSuccess(null), 3000);
  };

  // Пропсы для передачи в дочерние компоненты
  const globalProps = {
    orgToken,
    participantToken,
    currentRoom,
    participantName,
    loading,
    setLoading,
    onOrgLogin: handleOrgLogin,
    onOrgLogout: handleOrgLogout,
    onParticipantJoin: handleParticipantJoin,
    onParticipantLogout: handleParticipantLogout,
    setCurrentRoom,
    showError,
    showSuccess,
  };

  return (
    <BrowserRouter>
      <Layout globalProps={globalProps}>
        {/* Глобальный спиннер загрузки */}
        {loading && <LoadingSpinner fullScreen text="Загрузка..." />}

        {/* Глобальные уведомления */}
        <div className="fixed top-20 right-4 z-50 w-96 space-y-2">
          {globalError && (
            <ErrorAlert
              error={globalError}
              onDismiss={() => setGlobalError(null)}
            />
          )}
          {globalSuccess && (
            <SuccessAlert
              message={globalSuccess}
              onClose={() => setGlobalSuccess(null)}
            />
          )}
        </div>

        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<HomePage {...globalProps} />} />
          <Route path="/register" element={<RegisterPage {...globalProps} />} />
          <Route path="/login" element={<LoginPage {...globalProps} />} />
          <Route path="/join" element={<JoinRoomPage {...globalProps} />} />
          <Route
            path="/leaderboard/:roomId"
            element={<LeaderboardPage {...globalProps} />}
          />

          {/* Защищенные маршруты организатора */}
          <Route
            path="/rooms/create"
            element={
              <PrivateRoute isAuthenticated={!!orgToken} redirectTo="/login">
                <CreateRoomPage {...globalProps} />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <PrivateRoute isAuthenticated={!!orgToken} redirectTo="/login">
                <RoomListPage {...globalProps} />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms/:roomId"
            element={
              <PrivateRoute isAuthenticated={!!orgToken} redirectTo="/login">
                <RoomDetailPage {...globalProps} />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms/:roomId/quizzes"
            element={
              <PrivateRoute isAuthenticated={!!orgToken} redirectTo="/login">
                <QuizManagementPage {...globalProps} />
              </PrivateRoute>
            }
          />

          {/* Защищенные маршруты участника */}
          <Route
            path="/participant/room"
            element={
              <PrivateRoute
                isAuthenticated={!!participantToken}
                redirectTo="/join"
              >
                <ParticipantRoomPage {...globalProps} />
              </PrivateRoute>
            }
          />
          <Route
            path="/participant/quiz/:quizId"
            element={
              <PrivateRoute
                isAuthenticated={!!participantToken}
                redirectTo="/join"
              >
                <TakeQuizPage {...globalProps} />
              </PrivateRoute>
            }
          />
          <Route
            path="/results"
            element={
              <PrivateRoute
                isAuthenticated={!!participantToken}
                redirectTo="/join"
              >
                <ResultsPage {...globalProps} />
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    404 - Страница не найдена
                  </h2>
                  <p className="text-gray-500 mb-4">
                    Извините, запрашиваемая страница не существует
                  </p>
                  <a
                    href="/"
                    className="text-purple-600 hover:text-purple-700 underline"
                  >
                    Вернуться на главную
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
