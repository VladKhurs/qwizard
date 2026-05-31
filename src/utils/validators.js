// Валидация email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Валидация пароля
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Валидация имени участника
export const validateParticipantName = (name) => {
  return name && name.length >= 2 && name.length <= 20 && /^[a-zA-Zа-яА-Я0-9\s]+$/.test(name);
};

// Валидация названия комнаты
export const validateRoomName = (name) => {
  if (!name) return true; // опционально
  return name.length <= 100;
};

// Валидация вопроса
export const validateQuestion = (question) => {
  return question && question.trim().length >= 1 && question.trim().length <= 500;
};

// Валидация ответа
export const validateAnswer = (answer) => {
  return answer && answer.text && answer.text.trim().length >= 1 && answer.text.trim().length <= 200;
};

// Валидация веса баллов
export const validateScoreWeight = (weight) => {
  return typeof weight === 'number' && weight >= 0 && weight <= 1000;
};