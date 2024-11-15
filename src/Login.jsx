import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import "./assets/loginandreigster.css";

function Login() {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const [massage, setMessage] = useState('');

  const goRegister = (e) => {
    navigate("/register");
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const expiryTime = new Date().getTime() + 1000*60*30 - 5000;
    localStorage.setItem('tokenExpiry', expiryTime);  

    const form = e.target;
    const formData = new FormData(form);

    const formToJson = (formData) => {
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      return jsonData;
    };

    const loginData = formToJson(formData);

    const userLogin = async() => {
      try {
        const response = await fetch(`${baseURL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
        if (response.status==200) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          localStorage.setItem('uid', data.uid);
          setMessage('');
          window.location.reload();
        } else {
          setMessage('Invalid username or password');
        }
      } catch (error) {
        setMessage('Login failed!');
      }
    }
    userLogin();
    
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" autoComplete="username" required />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" required />
          <br/>
        <button type="submit">Login</button>
        <h3>{massage}</h3>
      </form>
      <a onClick={goRegister}>Create a account</a>
    </div>
  );
}

export default Login;
