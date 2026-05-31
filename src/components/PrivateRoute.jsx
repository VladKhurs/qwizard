/*import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated, redirectTo = '/login' }) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}

export default PrivateRoute;
*/

import React from 'react';
import { Navigate } from 'react-router-dom';
const DEV_MODE = true; 
function PrivateRoute({ 
  children, 
  isAuthenticated, 
  redirectTo = '/login',
  requiredRole = 'any' // 'org', 'participant', 'any'
}) {
  // В режиме разработки пропускаем всех
  if (DEV_MODE) {
    return children;
  }
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
}

export default PrivateRoute;