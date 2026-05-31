import React, { useState } from 'react';
import AnswerInput from './AnswerInput';

function QuizForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    question: initialData?.question || '',
    imageUrl: initialData?.imageUrl || '',
    timeLimit: initialData?.timeLimit || 30,
    answers: initialData?.answers || [
      { text: '', isCorrect: false, scoreWeight: 10 },
      { text: '', isCorrect: false, scoreWeight: 0 }
    ]
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.question.trim()) {
      newErrors.question = 'Введите текст вопроса';
    }
    
    if (formData.answers.length < 2) {
      newErrors.answers = 'Должно быть минимум 2 варианта ответа';
    }
    
    const hasEmptyAnswer = formData.answers.some(a => !a.text.trim());
    if (hasEmptyAnswer) {
      newErrors.answers = 'Заполните все варианты ответов';
    }
    
    const hasCorrect = formData.answers.some(a => a.isCorrect);
    if (!hasCorrect) {
      newErrors.answers = 'Должен быть хотя бы один правильный ответ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const addAnswer = () => {
    setFormData({
      ...formData,
      answers: [
        ...formData.answers,
        { text: '', isCorrect: false, scoreWeight: 0 }
      ]
    });
  };

  const updateAnswer = (index, updatedAnswer) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = updatedAnswer;
    setFormData({ ...formData, answers: newAnswers });
  };

  const deleteAnswer = (index) => {
    if (formData.answers.length <= 2) {
      setErrors({ ...errors, answers: 'Минимум 2 варианта ответа' });
      return;
    }
    const newAnswers = formData.answers.filter((_, i) => i !== index);
    setFormData({ ...formData, answers: newAnswers });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Вопрос */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Текст вопроса *
        </label>
        <textarea
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          rows="3"
          placeholder="Введите вопрос..."
          disabled={loading}
        />
        {errors.question && (
          <p className="mt-1 text-sm text-red-500">{errors.question}</p>
        )}
      </div>

      {/* URL картинки (опционально) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL картинки (опционально)
        </label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="https://example.com/image.jpg"
          disabled={loading}
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <img src={formData.imageUrl} alt="Preview" className="h-32 object-cover rounded-lg" />
          </div>
        )}
      </div>

      {/* Время на вопрос */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Время на вопрос (секунды) - опционально
        </label>
        <input
          type="number"
          value={formData.timeLimit}
          onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) || 0 })}
          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          min="5"
          max="300"
          step="5"
          disabled={loading}
        />
        <p className="mt-1 text-sm text-gray-500">
          По умолчанию: 30 секунд. 0 = без ограничения
        </p>
      </div>

      {/* Варианты ответов */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Варианты ответов *
          </label>
          <button
            type="button"
            onClick={addAnswer}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            disabled={loading}
          >
            + Добавить вариант
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.answers.map((answer, idx) => (
            <AnswerInput
              key={idx}
              answer={answer}
              index={idx}
              onChange={updateAnswer}
              onDelete={deleteAnswer}
              isEditing={loading}
            />
          ))}
        </div>
        
        {errors.answers && (
          <p className="mt-2 text-sm text-red-500">{errors.answers}</p>
        )}
      </div>

      {/* Кнопки */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? 'Сохранение...' : (initialData ? 'Обновить квиз' : 'Создать квиз')}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            disabled={loading}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default QuizForm;