// PrivateRoute.jsx
import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    alert('Please log in to access this page.');

    return <Navigate to="/admin-login" />;
  }

  // If the user is authenticated, render the protected content
  return element;
};

export default PrivateRoute;
