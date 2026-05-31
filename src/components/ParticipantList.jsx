import React from 'react';

function ParticipantList({ participants, title = "Участники комнаты" }) {
  if (!participants || participants.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">Пока нет участников</p>
        <p className="text-sm text-gray-400 mt-1">Поделитесь invite-ссылкой, чтобы пригласить друзей</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <h3 className="text-white font-semibold text-lg">
          {title} ({participants.length})
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {participants.map((participant, index) => (
          <div key={participant.participantName || index} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                {participant.participantName?.charAt(0).toUpperCase() || '?'}
              </div>
              <span className="font-medium text-gray-800">
                {participant.participantName}
              </span>
            </div>
            {participant.totalScore !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Баллы:</span>
                <span className="font-bold text-indigo-600">{participant.totalScore}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParticipantList;