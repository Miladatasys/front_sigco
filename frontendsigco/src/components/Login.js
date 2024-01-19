// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa'; 
import '../index.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      if (!credentials.username || !credentials.password) {
        toast.error('Por favor, completa todos los campos.');
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contacts/login`, credentials);

      localStorage.setItem('token', response.data);

      toast.success('Inicio de sesión exitoso');

      // se supone que redirige a la página principal o a donde desees después del inicio de sesión
      navigate('/');
    } catch (error) {
      toast.error('Error durante el inicio de sesión. Verifica tus credenciales.');

      console.error('Error durante el inicio de sesión:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Inicio de sesión</h2>
      <form>
        <div className="input-group">
          <label htmlFor="username">
            <FaUser /> Usuario:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">
            <FaLock /> Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleLogin} className="login-button">
          Iniciar Sesión
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Login;
