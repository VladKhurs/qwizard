import apiClient from "./client";

// Регистрация организатора
export const register = async (email, password) => {
  try {
    const response = await apiClient.post(
      "/auth/register",
      {
        email,
        password,
      },
      {
        requiresOrgAuth: false, // Не требует токена
      },
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Ошибка регистрации",
      status: error.response?.status,
    };
  }
};

// Вход организатора
export const login = async (email, password) => {
  try {
    const response = await apiClient.post(
      "/auth/login",
      {
        email,
        password,
      },
      {
        requiresOrgAuth: false, // Не требует токена
      },
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Ошибка входа",
      status: error.response?.status,
    };
  }
};

// Проверка валидности токена (опционально)
export const validateToken = async (token) => {
  try {
    const response = await apiClient.get("/auth/validate", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
};
