// Loginpage.jsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Loginpage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginError, setLoginError] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { username, password } = data;

    // Call the login function from AuthContext
    const isAuthenticated = login(username, password);

    if (isAuthenticated) {
      // Redirect to the dashboard upon successful login
      navigate('/admin-login/dashboard');
    } else {
      // Display an error message for unsuccessful login
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  return (
    <Container className="Total">
      <Container className="Box">
        <Container className="Regpage">
          <h1 className="Login">LOGIN</h1>
          <p className="Info">Please enter your UserName and Password!</p>
          <Container className="Details">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                id="Username"
                placeholder="Enter UserName"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p>{errors.username.message}</p>}

              <input
                id="Password"
                type="password"
                placeholder="Enter Password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p>{errors.password.message}</p>}

              {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

              <Button className="Button" type="submit">
                LOGIN
              </Button>
            </form>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
