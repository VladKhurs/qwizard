// Конфигурация API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000
};

// Константы валидации
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_PARTICIPANT_NAME_LENGTH: 2,
  MAX_PARTICIPANT_NAME_LENGTH: 20,
  MAX_ROOM_NAME_LENGTH: 100,
  MAX_QUESTION_LENGTH: 500,
  MAX_ANSWER_LENGTH: 200,
  MIN_ANSWERS_COUNT: 2,
  MAX_ANSWERS_COUNT: 10,
  MIN_SCORE_WEIGHT: 0,
  MAX_SCORE_WEIGHT: 1000,
  MIN_TIME_LIMIT: 5,
  MAX_TIME_LIMIT: 300
};

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Ошибка соединения. Проверьте интернет-соединение.',
  UNAUTHORIZED: 'Сессия истекла. Пожалуйста, войдите снова.',
  NOT_FOUND: 'Запрашиваемый ресурс не найден.',
  SERVER_ERROR: 'Внутренняя ошибка сервера. Попробуйте позже.',
  INVALID_EMAIL: 'Введите корректный email адрес.',
  INVALID_PASSWORD: 'Пароль должен содержать минимум 6 символов.',
  PASSWORDS_MISMATCH: 'Пароли не совпадают.',
  EMPTY_FIELD: 'Это поле обязательно для заполнения.'
};

// Тайминги
export const TIMINGS = {
  TOAST_DURATION: 3000,
  AUTO_REFRESH_INTERVAL: 10000,
  DEBOUNCE_DELAY: 500,
  COUNTDOWN_WARNING: 5
};