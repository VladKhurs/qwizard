import React, { useState } from 'react';

function ShareResults({ participantName, score, totalQuestions, roomName }) {
  const [copied, setCopied] = useState(false);

  const shareMessage = `Я прошел квиз "${roomName}" и набрал ${score} баллов! 🎯 Присоединяйся ко мне в QuizRoom!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Мои результаты в QuizRoom',
          text: shareMessage,
        });
      } catch (err) {
        console.error('Ошибка шеринга:', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-semibold text-gray-800 text-lg mb-4 text-center">
        Поделиться результатами
      </h3>
      
      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition flex items-center justify-center gap-2"
        >
          📤 Поделиться
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
        >
          {copied ? '✅ Скопировано!' : '📋 Скопировать'}
        </button>
      </div>

      {copied && (
        <p className="text-center text-green-600 text-sm mt-2 animate-pulse">
          Результат скопирован в буфер обмена!
        </p>
      )}
    </div>
  );
}

export default ShareResults;