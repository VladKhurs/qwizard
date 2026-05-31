import React, { useState } from 'react';

function LeaderboardTable({ leaderboard, title = "Таблица лидеров" }) {
  const [sortBy, setSortBy] = useState('score'); // 'score' or 'name'
  const [sortOrder, setSortOrder] = useState('desc');

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <div className="text-5xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Пока нет результатов</h3>
        <p className="text-gray-500">Будьте первым, кто пройдет квиз!</p>
      </div>
    );
  }

  // Сортировка данных
  const sortedData = [...leaderboard].sort((a, b) => {
    if (sortBy === 'score') {
      return sortOrder === 'desc' ? b.totalScore - a.totalScore : a.totalScore - b.totalScore;
    } else {
      return sortOrder === 'asc' 
        ? a.participantName.localeCompare(b.participantName)
        : b.participantName.localeCompare(a.participantName);
    }
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Определяем цвет медали для топ-3
  const getMedalColor = (index) => {
    switch(index) {
      case 0: return '🏆 bg-yellow-100 text-yellow-800';
      case 1: return '🥈 bg-gray-100 text-gray-700';
      case 2: return '🥉 bg-orange-100 text-orange-700';
      default: return '📊 bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Заголовок */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-bold text-xl">{title}</h3>
          <div className="text-white/80 text-sm">
            {leaderboard.length} участников
          </div>
        </div>
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => toggleSort('name')}
              >
                Участник
                {sortBy === 'name' && (
                  <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                )}
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => toggleSort('score')}
              >
                Баллы
                {sortBy === 'score' && (
                  <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedData.map((entry, index) => (
              <tr key={entry.participantName} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${getMedalColor(index)}`}>
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                      {entry.participantName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900">
                      {entry.participantName}
                    </span>
                    {index === 0 && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                        Лидер
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="font-bold text-blue-600 text-lg">
                    {entry.totalScore}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">баллов</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Футер с статистикой */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>🏆 Лучший результат: {Math.max(...leaderboard.map(l => l.totalScore))} баллов</span>
          <span>📊 Средний балл: {Math.round(leaderboard.reduce((sum, l) => sum + l.totalScore, 0) / leaderboard.length)}</span>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardTable;