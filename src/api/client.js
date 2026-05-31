import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const API_BASE_URL = "http://77.42.43.16/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 5000,
});

// Интерсептор для добавления токена
apiClient.interceptors.request.use(
  (config) => {
    // Если явно указано, что аутентификация не нужна - пропускаем
    if (config.requiresAuth === false) {
      return config;
    }

    // Проверяем оба типа токенов
    const orgToken = localStorage.getItem("orgToken");
    const participantToken = localStorage.getItem("participantToken");

    if (orgToken && config.requiresOrgAuth !== false) {
      config.headers.Authorization = `Bearer ${orgToken}`;
    } else if (participantToken && config.requiresParticipantAuth) {
      config.headers.Authorization = `Bearer ${participantToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Интерсептор для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Очищаем токены при 401 ошибке
      localStorage.removeItem("orgToken");
      localStorage.removeItem("participantToken");
      localStorage.removeItem("participantName");

      // Перенаправляем только если это не запрос на логин/регистрацию
      if (!error.config.url.includes("/auth/")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
