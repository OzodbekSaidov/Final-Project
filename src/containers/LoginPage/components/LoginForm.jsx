import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../../axios/axios.js";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../../constants/routes.js";
import cookie from "js-cookie";
import { FiMapPin } from "react-icons/fi";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
`;

const BackgroundIcon = styled(FiMapPin)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  font-size: 150px;
  color: rgba(230, 57, 70, 0.2);
`;

const FormWrapper = styled.div`
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 100px 4px 25px rgba(0, 0, 0, 0.1);
  width: 320px;
  height: 45%;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  margin-top: 1rem;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const Button = styled.button`
  margin-top: 2rem;
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

const Divvv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;


 `
 const P = styled.p`
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color:#0056b3 ;
    }
 `

const Register = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        phone,
        password,
      });
      console.log("User registered", response.data);
      localStorage.setItem("user", JSON.stringify(response.data?.user));
      localStorage.setItem("token", JSON.stringify(response.data?.token));
      navigate(HOME_PAGE);
      console.log(response.data);
      
    } catch (err) {
      setError(err.response ? err.response.data.message : "Ошибка logina");
    }
  };

  return (
    <RegisterContainer>
      <FormWrapper>
        <Title>Войти</Title>
        <form onSubmit={handleSubmit}>
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
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">Войти</Button>
        </form>

        <Divvv>
          <p>У вас нет учетной записи?</p>
          <P onClick={() => navigate("/register")}>Регистрация</P>
        </Divvv>
      </FormWrapper>
    </RegisterContainer>
  );
};

export default Register;
