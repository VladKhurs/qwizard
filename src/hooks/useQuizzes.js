import { useState, useEffect } from 'react';
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from '../api/quizzes';

export const useQuizzes = (roomId) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadQuizzes = async () => {
    setLoading(true);
    const result = await getQuizzes(roomId);
    if (result.success) {
      setQuizzes(result.data);
      setError('');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const addQuiz = async (quizData) => {
    const result = await createQuiz(roomId, quizData);
    if (result.success) {
      await loadQuizzes();
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const editQuiz = async (quizId, quizData) => {
    const result = await updateQuiz(roomId, quizId, quizData);
    if (result.success) {
      await loadQuizzes();
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const removeQuiz = async (quizId) => {
    const result = await deleteQuiz(roomId, quizId);
    if (result.success) {
      await loadQuizzes();
      return { success: true };
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
    loading,
    error,
    loadQuizzes,
    addQuiz,
    editQuiz,
    removeQuiz
  };
};