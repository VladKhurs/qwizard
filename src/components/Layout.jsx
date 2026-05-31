import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function Layout({ children, globalProps }) {
  const navigate = useNavigate();
  const {
    orgToken,
    participantToken,
    participantName,
    onOrgLogout,
    onParticipantLogout,
  } = globalProps;

  const isAuthenticated = orgToken || participantToken;
  const isOrg = !!orgToken;
  const userName = isOrg ? "Организатор" : participantName;

  const handleLogout = () => {
    if (isOrg) {
      onOrgLogout();
    } else {
      onParticipantLogout();
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src="./logo.png" alt="" className="max-w-50"/>
              {/*  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-700 transition">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
                QuizRoom
              </span> */}
            </Link>

            {/* Кнопки входа/выхода */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">{userName}</span>
                  <Button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition text-sm font-medium"
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                Quizard — создавай и проходи квизы с друзьями
              </span>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Все права защищены
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
