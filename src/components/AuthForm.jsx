import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function AuthForm({ type, onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [localErrors, setLocalErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Введите корректный email";
    }

    if (!formData.password) {
      errors.password = "Пароль обязателен";
    } else if (formData.password.length < 6 && type === "register") {
      errors.password = "Пароль должен быть минимум 6 символов";
    }

    if (type === "register" && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Пароли не совпадают";
    }

    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData.email, formData.password);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (localErrors[e.target.name]) {
      setLocalErrors({
        ...localErrors,
        [e.target.name]: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Заголовок */}

        {/* Карточка формы */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            {/* <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-xl mb-4">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {type === "register" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                )}
              </svg>
            </div> */}
            <h2 className="text-2xl font-bold text-gray-900">
              {type === "register"
                ? "Регистрация организатора"
                : "Вход в аккаунт"}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              {type === "register"
                ? "Создайте аккаунт для управления квизами"
                : "Войдите чтобы создавать комнаты и квизы"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email поле */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none
                  ${localErrors.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="example@mail.com"
                disabled={loading}
              />
              {localErrors.email && (
                <p className="mt-1 text-sm text-red-500">{localErrors.email}</p>
              )}
            </div>

            {/* Password поле */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none
                  ${localErrors.password ? "border-red-500" : "border-gray-300"}`}
                placeholder={
                  type === "register" ? "Минимум 6 символов" : "Введите пароль"
                }
                disabled={loading}
              />
              {localErrors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {localErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password поле */}
            {type === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Подтверждение пароля
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none
                    ${localErrors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Повторите пароль"
                  disabled={loading}
                />
                {localErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {localErrors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Общая ошибка */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit кнопка */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Загрузка...
                </span>
              ) : type === "register" ? (
                "Зарегистрироваться"
              ) : (
                "Войти"
              )}
            </Button>
          </form>

          {/* Ссылка для переключения */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm">
            {type === "register" ? (
              <p className="text-gray-600">
                Уже есть аккаунт?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Войти
                </Link>
              </p>
            ) : (
              <p className="text-gray-600">
                Нет аккаунта?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Зарегистрироваться
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
