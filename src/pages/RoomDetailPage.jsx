import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById } from '../api/rooms';
import RoomCard from '../components/RoomCard';

function RoomDetailPage({ orgToken }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  if (!orgToken) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    loadRoom();
  }, [roomId]);

  const loadRoom = async () => {
    setLoading(true);
    setError('');
    
    const result = await getRoomById(roomId);
    
    if (result.success) {
      setRoom(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Загрузка комнаты...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error || 'Комната не найдена'}
        </div>
        <button
          onClick={() => navigate('/rooms')}
          className="mt-4 text-indigo-600 hover:text-indigo-700"
        >
          ← Вернуться к списку комнат
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate('/rooms')}
          className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
        >
          ← Назад к списку комнат
        </button>
      </div>

      <RoomCard room={room} />
    </div>
  );
}

export default RoomDetailPage;