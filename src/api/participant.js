import apiClient from './client';

// Присоединиться к комнате по invite-токену
export const joinRoom = async (inviteToken, participantName) => {
  try {
    const response = await apiClient.post('/rooms/join', {
      inviteToken,
      participantName
    }, {
      requiresOrgAuth: false // Не требует токена организатора
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка присоединения к комнате',
      status: error.response?.status
    };
  }
};

// Получить информацию о комнате для участника
export const getParticipantRoom = async (roomId) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}`, {
      requiresParticipantAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка получения комнаты',
      status: error.response?.status
    };
  }
};

// Получить список участников комнаты (если есть эндпоинт)
// На основе Swagger, такого эндпоинта нет, но мы можем получить через leaderboard
export const getRoomParticipants = async (roomId) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/leaderboard`, {
      requiresParticipantAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка получения участников',
      status: error.response?.status
    };
  }
};