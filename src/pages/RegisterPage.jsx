import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";

function RegisterPage({ onOrgLogin, orgToken }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Если уже авторизован, перенаправляем на страницу комнат
  if (orgToken) {
    navigate("/rooms");
    return null;
  }

  const handleRegister = async (email, password) => {
    setLoading(true);
    setError("");

    const result = await register(email, password);

    if (result.success) {
      // После успешной регистрации сразу логиним пользователя
      onOrgLogin(result.data.token);
      navigate("/rooms");
    } else {
      // Обработка разных ошибок
      if (result.status === 400) {
        setError("Email уже занят или данные некорректны");
      } else {
        setError(result.error || "Ошибка регистрации. Попробуйте позже.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <AuthForm
          type="register"
          onSubmit={handleRegister}
          loading={loading}
          error={error}
        />

        {/* Информационная карточка */}
        {/* <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <span className="font-semibold">Тестовые данные:</span>
            <br />
            Email: organizer@example.com
            <br />
            Пароль: 123456
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default RegisterPage;
