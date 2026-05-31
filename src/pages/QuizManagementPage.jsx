import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizForm from '../components/QuizForm';
import QuizList from '../components/QuizList';
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from '../api/quizzes';
import { getRoomById } from '../api/rooms';
import Button from '../components/Button';

function QuizManagementPage({ orgToken }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadRoomAndQuizzes();
  }, [roomId]);

  const loadRoomAndQuizzes = async () => {
    setLoading(true);
    setError('');
    
    const roomResult = await getRoomById(roomId);
    if (roomResult.success) {
      setRoom(roomResult.data);
    } else {
      setError('Не удалось загрузить комнату');
    }
    
    const quizzesResult = await getQuizzes(roomId);
    if (quizzesResult.success) {
      setQuizzes(quizzesResult.data);
    } else {
      setError(quizzesResult.error);
    }
    
    setLoading(false);
  };

  const handleCreateQuiz = async (quizData) => {
    setFormLoading(true);
    const result = await createQuiz(roomId, quizData);
    
    if (result.success) {
      await loadRoomAndQuizzes();
      setShowForm(false);
    } else {
      setError(result.error);
    }
    
    setFormLoading(false);
  };

  const handleUpdateQuiz = async (quizData) => {
    setFormLoading(true);
    const result = await updateQuiz(roomId, editingQuiz.id, quizData);
    
    if (result.success) {
      await loadRoomAndQuizzes();
      setEditingQuiz(null);
      setShowForm(false);
    } else {
      setError(result.error);
    }
    
    setFormLoading(false);
  };

  const handleDeleteQuiz = async (quizId) => {
    if (!confirm('Вы уверены, что хотите удалить этот вопрос?')) return;
    
    setLoading(true);
    const result = await deleteQuiz(roomId, quizId);
    
    if (result.success) {
      await loadRoomAndQuizzes();
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingQuiz(null);
  };

  if (loading && !room) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-gray-900 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-400 text-sm">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Navigation */}
      <button
        onClick={() => navigate('/rooms')}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Назад к комнатам
      </button>

      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {room?.name || `Комната #${roomId}`}
          </h1>
          <p className="text-sm text-gray-400">
            Управляйте вопросами квиза
          </p>
        </div>
        
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className=" max-w-50 px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Добавить вопрос
          </Button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="flex-1">{error}</span>
          <button
            onClick={loadRoomAndQuizzes}
            className="text-red-700 underline text-sm font-medium hover:no-underline"
          >
            Повторить
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-base font-medium text-gray-900">
              {editingQuiz ? 'Редактировать вопрос' : 'Новый вопрос'}
            </h2>
            <button
              onClick={handleCancelForm}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <QuizForm
            initialData={editingQuiz}
            onSubmit={editingQuiz ? handleUpdateQuiz : handleCreateQuiz}
            onCancel={handleCancelForm}
            loading={formLoading}
          />
        </div>
      )}

      {/* Quiz list */}
      {!showForm && (
        <QuizList
          quizzes={quizzes}
          onEdit={handleEdit}
          onDelete={handleDeleteQuiz}
        />
      )}

      {/* Room info */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-xs text-gray-400 leading-relaxed">
          ID комнаты: {roomId} • Пригласительный токен: <span className="font-mono text-gray-500">{room?.inviteToken}</span> • Всего вопросов: {quizzes.length}
        </p>
      </div>
    </div>
  );
}

export default QuizManagementPage;