// Форматирование даты
export const formatDate = (dateString, locale = 'ru-RU') => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Форматирование времени (секунды -> MM:SS)
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  return `${secs} сек`;
};

// Сокращение длинного текста
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Форматирование числа с разделителями тысяч
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Получение цвета для процентов
export const getScoreColor = (percentage) => {
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 60) return 'text-blue-600';
  if (percentage >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

// Получение эмодзи для рейтинга
export const getRankEmoji = (rank) => {
  switch(rank) {
    case 1: return '👑';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '📊';
  }
};