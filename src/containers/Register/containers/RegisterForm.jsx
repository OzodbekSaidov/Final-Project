import React, { useState } from "react";
import axios from "axios";
import {api} from "../../../axios/axios.js"

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', {
        name,
        phone,
        password,
        role,
      });
      console.log("User registered", response.data);
      // Можете перенаправить пользователя на другую страницу или показать сообщение о успешной регистрации
    } catch (err) {
      setError(err.response ? err.response.data.message : "Ошибка регистрации");
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Телефон</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Роль</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Пользователь</option>
            <option value="admin">Админ</option>
          </select>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
