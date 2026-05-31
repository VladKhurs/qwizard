import apiClient from './client';

// Получить таблицу лидеров комнаты
export const getLeaderboard = async (roomId) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/leaderboard`, {
      // Не требует аутентификации (согласно Swagger)
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка получения таблицы лидеров',
      status: error.response?.status
    };
  }
};

// Получить таблицу лидеров с аутентификацией (для участников)
export const getLeaderboardAuth = async (roomId) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/leaderboard`, {
      requiresParticipantAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка получения таблицы лидеров',
      status: error.response?.status
    };
  }
};