import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../../axios/axios.js";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../../constants/routes.js";
import cookie from "js-cookie"

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 320px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        name,
        phone,
        password,
        role,
      });
      console.log("User registered", response.data);
      cookie.set("user", JSON.stringify(response.data), { expires: 7})
      navigate(HOME_PAGE)
    } catch (err) {
      setError(err.response ? err.response.data.message : "Ошибка регистрации");
    }
  };

  return (
    <RegisterContainer>
      <FormWrapper>
        <Title>Регистрация</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Пользователь</option>
            <option value="admin">Админ</option>
          </Select>
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">Зарегистрироваться</Button>
        </form>
      </FormWrapper>
    </RegisterContainer>
  );
};

export default Register;
