import React from "react";
import Button from "./Button";

function AnswerInput({ answer, index, onChange, onDelete, isEditing }) {
  const handleChange = (field, value) => {
    onChange(index, { ...answer, [field]: value });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-gray-700">
          Вариант ответа {index + 1}
        </h4>
        {!isEditing && (
          <Button
            variant="danger"
            type="button"
            onClick={() => onDelete(index)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Удалить
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {/* Текст ответа */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Текст ответа *
          </label>
          <input
            type="text"
            value={answer.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Введите вариант ответа"
            disabled={isEditing}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Вес баллов */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Вес в баллах *
            </label>
            <input
              type="number"
              value={answer.scoreWeight}
              onChange={(e) =>
                handleChange("scoreWeight", parseInt(e.target.value) || 0)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              step="1"
              disabled={isEditing}
            />
          </div>

          {/* Правильный ответ */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={(e) => handleChange("isCorrect", e.target.checked)}
                className="w-4 h-4 text-blue-600"
                disabled={isEditing}
              />
              <span className="text-sm font-medium text-gray-700">
                Правильный ответ
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerInput;
