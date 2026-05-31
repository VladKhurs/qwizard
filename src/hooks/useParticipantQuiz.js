import { useState, useEffect } from 'react';
import { getParticipantQuizzes, submitAnswer } from '../api/participantQuiz';

export const useParticipantQuiz = (roomId) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  const loadQuizzes = async () => {
    setLoading(true);
    const result = await getParticipantQuizzes(roomId);
    if (result.success) {
      setQuizzes(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const submitCurrentAnswer = async (selectedAnswerIds) => {
    const currentQuiz = quizzes[currentIndex];
    if (!currentQuiz) return { success: false };

    const result = await submitAnswer(roomId, currentQuiz.id, selectedAnswerIds);
    
    if (result.success) {
      setAnswers(prev => ({ ...prev, [currentQuiz.id]: selectedAnswerIds }));
      setScores(prev => ({ ...prev, [currentQuiz.id]: result.data.score }));
      
      const isLast = currentIndex + 1 >= quizzes.length;
      if (!isLast) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCompleted(true);
      }
      
      return { success: true, isLast, totalScore: result.data.totalScore };
    }
    
    return { success: false, error: result.error };
  };

  useEffect(() => {
    if (roomId) {
      loadQuizzes();
    }
  }, [roomId]);

  return {
    quizzes,
    currentQuiz: quizzes[currentIndex],
    currentIndex,
    totalQuizzes: quizzes.length,
    answers,
    scores,
    loading,
    error,
    completed,
    submitAnswer: submitCurrentAnswer,
    goToQuestion: setCurrentIndex
  };
};