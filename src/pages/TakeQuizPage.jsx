import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import QuizProgress from '../components/QuizProgress';
import { getParticipantQuizzes, submitAnswer } from '../api/participantQuiz';

function TakeQuizPage({ participantToken, currentRoom, participantName }) {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  if (!participantToken) {
    navigate('/join');
    return null;
  }

  useEffect(() => {
    loadQuizzes();
  }, [currentRoom?.id]);

  const loadQuizzes = async () => {
    if (!currentRoom?.id) {
      setError('Комната не найдена');
      setLoading(false);
      return;
    }

    setLoading(true);
    const result = await getParticipantQuizzes(currentRoom.id);
    
    if (result.success) {
      setQuizzes(result.data);
      // Находим индекс текущего вопроса, если передан quizId
      if (quizId) {
        const index = result.data.findIndex(q => q.id === parseInt(quizId));
        if (index !== -1) {
          setCurrentIndex(index);
        }
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleAnswer = async (selectedAnswerIds) => {
    const currentQuiz = quizzes[currentIndex];
    if (!currentQuiz) return;

    setSubmitting(true);
    
    const result = await submitAnswer(
      currentRoom.id,
      currentQuiz.id,
      selectedAnswerIds
    );
    
    if (result.success) {
      // Сохраняем результат
      setAnswers({
        ...answers,
        [currentQuiz.id]: selectedAnswerIds
      });
      setScores({
        ...scores,
        [currentQuiz.id]: result.data.score
      });
      
      // Переходим к следующему вопросу или завершаем
      if (currentIndex + 1 < quizzes.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Квиз завершен
        setCompleted(true);
        // Сохраняем общий счет в localStorage для отображения на странице результатов
        localStorage.setItem('quizTotalScore', result.data.totalScore);
        localStorage.setItem('quizRoomId', currentRoom.id);
        // Переходим на страницу результатов
        navigate('/results');
      }
    } else {
      setError(result.error);
    }
    
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Загрузка вопросов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate('/participant/room')}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Вернуться в комнату
        </button>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-4">
          В этой комнате пока нет вопросов
        </div>
        <button
          onClick={() => navigate('/participant/room')}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Вернуться в комнату
        </button>
      </div>
    );
  }

  const currentQuiz = quizzes[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const currentTotalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Прохождение квиза
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Участник: {participantName}
        </p>
      </div>

      {/* Прогресс */}
      <QuizProgress 
        current={currentIndex + 1}
        total={quizzes.length}
        completed={answeredCount}
        currentScore={currentTotalScore}
      />

      {/* Карточка вопроса */}
      <QuestionCard
        question={currentQuiz}
        questionNumber={currentIndex + 1}
        totalQuestions={quizzes.length}
        onSubmit={handleAnswer}
        isSubmitting={submitting}
      />

      {/* Навигация (опционально) */}
      <div className="mt-6 flex justify-between text-sm text-gray-500">
        <div>
          Вопрос {currentIndex + 1} из {quizzes.length}
        </div>
        <div>
          Пройдено: {answeredCount} / {quizzes.length}
        </div>
      </div>
    </div>
  );
}

export default TakeQuizPage;