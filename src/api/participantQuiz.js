import apiClient from './client';

// Получить квизы для прохождения (без правильных ответов)
export const getParticipantQuizzes = async (roomId) => {
  try {
    const response = await apiClient.get(`/participant/rooms/${roomId}/quizzes`, {
      requiresParticipantAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка получения вопросов',
      status: error.response?.status
    };
  }
};

// Отправить ответ на квиз
export const submitAnswer = async (roomId, quizId, selectedAnswerIds) => {
  try {
    const response = await apiClient.post(`/participant/rooms/${roomId}/quizzes/${quizId}/submit`, {
      selectedAnswerIds
    }, {
      requiresParticipantAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка отправки ответа',
      status: error.response?.status
    };
  }
};

// Получить конкретный квиз для участника
export const getParticipantQuizById = async (roomId, quizId) => {
  try {
    // Используем тот же эндпоинт, но фильтруем по ID
    const response = await apiClient.get(`/participant/rooms/${roomId}/quizzes`, {
      requiresParticipantAuth: true
    });
    const quiz = response.data.find(q => q.id === parseInt(quizId));
    if (!quiz) {
      return { success: false, error: 'Вопрос не найден' };
    }
    return { success: true, data: quiz };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка получения вопроса',
      status: error.response?.status
    };
  }
};