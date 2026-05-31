import apiClient from './client';

// Создание комнаты
export const createRoom = async (name) => {
  try {
    const response = await apiClient.post('/rooms', { 
      name: name || undefined  // если имя не указано, отправляем undefined
    }, {
      requiresOrgAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка создания комнаты',
      status: error.response?.status
    };
  }
};

// Получение списка комнат организатора
export const getRooms = async () => {
  try {
    const response = await apiClient.get('/rooms', {
      requiresOrgAuth: true
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Ошибка получения списка комнат',
      status: error.response?.status
    };
  }
};

// Получение информации о комнате по ID
export const getRoomById = async (roomId) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}`, {
      requiresOrgAuth: true
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