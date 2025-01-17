import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    // Se o token não existir, redireciona para a página de login
    return <Navigate to="/" />;
  }
  // Se o token existir, permite o acesso ao componente filho
  return children;
}

export default PrivateRoute;
