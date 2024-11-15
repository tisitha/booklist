import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import "./assets/loginandreigster.css";

function Register() {

  const baseURL = "http://localhost:8080/";

  const navigate = useNavigate();
  const [massage, setMessage] = useState('');

  const goLogin = (e) => {
    navigate("/login");
  }

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formToJson = (formData) => {
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      return jsonData;
    };

    const userData = formToJson(formData);

    const registerUser = async () => {
        try {
            const response = await fetch(`${baseURL}/api/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(userData),
          });
          if(response.status==201){
            setMessage('');
            navigate('/login');
          }
          else if(response.status==406){
            setMessage('username is already taken');
          }
        } catch (error) {
          console.error(error);
        }
        
      };

    registerUser();
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" autoComplete="username" required />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" required />
          <br/>
        <button type="submit">Register</button>
        <h3>{massage}</h3>
      </form>
      <a onClick={goLogin}>Has a account</a>
    </div>
  );
}

export default Register;
