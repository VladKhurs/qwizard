import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import SuccessAlert from './components/SuccessAlert';
import PrivateRoute from './components/PrivateRoute';

// ... остальные импорты страниц

function App() {
  const [orgToken, setOrgToken] = useState(localStorage.getItem('orgToken') || null);
  const [participantToken, setParticipantToken] = useState(localStorage.getItem('participantToken') || null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [participantName, setParticipantName] = useState(localStorage.getItem('participantName') || null);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [globalSuccess, setGlobalSuccess] = useState(null);

  // ... методы аутентификации (как в Запросе #1)

  const showError = (message) => {
    setGlobalError(message);
    setTimeout(() => setGlobalError(null), 5000);
  };

  const showSuccess = (message) => {
    setGlobalSuccess(message);
    setTimeout(() => setGlobalSuccess(null), 3000);
  };

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
    showSuccess
  };

  return (
    <BrowserRouter>
      <Layout globalProps={globalProps}>
        {/* Глобальные уведомления */}
        {loading && <LoadingSpinner fullScreen text="Загрузка..." />}
        <div className="fixed top-20 right-4 z-50 w-96">
          {globalError && <ErrorAlert error={globalError} onDismiss={() => setGlobalError(null)} />}
          {globalSuccess && <SuccessAlert message={globalSuccess} onClose={() => setGlobalSuccess(null)} />}
        </div>

        <Routes>
          <Route path="/" element={<HomePage {...globalProps} />} />
          <Route path="/register" element={<RegisterPage {...globalProps} />} />
          <Route path="/login" element={<LoginPage {...globalProps} />} />
          <Route path="/join" element={<JoinRoomPage {...globalProps} />} />
          
          {/* Защищенные маршруты организатора */}
          <Route path="/rooms/create" element={
            <PrivateRoute isAuthenticated={!!orgToken} redirectTo="/login">
              <CreateRoomPage {...globalProps} />
            </PrivateRoute>
          } />
          <Route path="/rooms" element={
            <PrivateRoute isAuthenticated={!!orgToken} redirectTo="/login">
              <RoomListPage {...globalProps} />
            </PrivateRoute>
          } />
          <Route path="/rooms/:roomId/quizzes" element={
            <PrivateRoute isAuthenticated={!!orgToken} redirectTo="/login">
              <QuizManagementPage {...globalProps} />
            </PrivateRoute>
          } />
          
          {/* Защищенные маршруты участника */}
          <Route path="/participant/room" element={
            <PrivateRoute isAuthenticated={!!participantToken} redirectTo="/join">
              <ParticipantRoomPage {...globalProps} />
            </PrivateRoute>
          } />
          <Route path="/participant/quiz/:quizId" element={
            <PrivateRoute isAuthenticated={!!participantToken} redirectTo="/join">
              <TakeQuizPage {...globalProps} />
            </PrivateRoute>
          } />
          <Route path="/results" element={
            <PrivateRoute isAuthenticated={!!participantToken} redirectTo="/join">
              <ResultsPage {...globalProps} />
            </PrivateRoute>
          } />
          
          {/* Публичные маршруты */}
          <Route path="/leaderboard/:roomId" element={<LeaderboardPage {...globalProps} />} />
          <Route path="*" element={<div className="p-8 text-center">404 - Страница не найдена</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;