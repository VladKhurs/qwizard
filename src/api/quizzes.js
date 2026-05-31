import apiClient from './client';

// Получить все квизы комнаты
export const getQuizzes = async (roomId) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/quizzes`, {
      requiresOrgAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка получения квизов',
      status: error.response?.status
    };
  }
};

// Получить конкретный квиз
export const getQuizById = async (roomId, quizId) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/quizzes/${quizId}`, {
      requiresOrgAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка получения квиза',
      status: error.response?.status
    };
  }
};

// Создать квиз
export const createQuiz = async (roomId, quizData) => {
  try {
    const response = await apiClient.post(`/rooms/${roomId}/quizzes`, quizData, {
      requiresOrgAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка создания квиза',
      status: error.response?.status
    };
  }
};

// Обновить квиз
export const updateQuiz = async (roomId, quizId, quizData) => {
  try {
    const response = await apiClient.put(`/rooms/${roomId}/quizzes/${quizId}`, quizData, {
      requiresOrgAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка обновления квиза',
      status: error.response?.status
    };
  }
};

// Удалить квиз
export const deleteQuiz = async (roomId, quizId) => {
  try {
    await apiClient.delete(`/rooms/${roomId}/quizzes/${quizId}`, {
      requiresOrgAuth: true
    });
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка удаления квиза',
      status: error.response?.status
    };
  }
};