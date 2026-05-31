import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../api/auth";

function LoginPage({ onOrgLogin, orgToken }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Если уже авторизован, перенаправляем на страницу комнат
  if (orgToken) {
    navigate("/rooms");
    return null;
  }

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      onOrgLogin(result.data.token);
      navigate("/rooms");
    } else {
      if (result.status === 401) {
        setError("Неверный email или пароль");
      } else {
        setError(result.error || "Ошибка входа. Попробуйте позже.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          loading={loading}
          error={error}
        />

        {/* Тестовые данные */}
        {/* <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            🔑 <span className="font-semibold">Тестовый аккаунт:</span>
            <br />
            Email: demo@quizroom.com
            <br />
            Пароль: 123456
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default LoginPage;
