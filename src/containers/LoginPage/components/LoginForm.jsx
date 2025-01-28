import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cookieData } from "../../../utils/cookies";
import * as ROUTES from "../../../constants/routes";
import { parol } from "./emails";

// Styled Components
const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 30px;
  width: 25vw;
  height: 35vh;
  color: ${({ theme }) => theme.color};
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.primary};
  box-shadow: 60px -16px rgba(149, 185, 228, 0.8);
`;
const Login = styled.div``;
const LoginFormTitle = styled.h2`
  margin-bottom: 20px;
  margin-left: 2.6rem;
`;
const LoginFormInput = styled.input`
  padding: 10px;
  border-radius: 2rem;
  margin-left: 10%;
  margin-bottom: 20px;
  width: 70%;
  font-size: 16px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.primary};
  box-shadow: 14px -9px teal;
`;
const LoginFormButton = styled.button`
  cursor: pointer;
  margin-left: 10%;
  width: 6rem;
  height: 2.5rem;
  border: none;
  border-radius: 2rem;
  color: white;
  background-color: rgb(76, 175, 80);
  box-shadow: 14px -9px teal;
  &:hover {
    transition: 0.3s;
    background-color: rgb(62, 142, 65);
  }
`;
const PhoneNum = styled.h4`
  cursor: pointer;
  &&:hover {
    text-decoration: underline;
  }
`;
const RegisterType = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Number = styled("h1")`
  position: relative;
  bottom: 46%;
`;
const PhoneInput = styled.input`
  position: relative;
  top: 10%;
  left: 10%;
  padding: 10px;
  border-radius: 2rem;
  margin-left: 10%;
  margin-bottom: 20px;
  width: 65%;
  font-size: 20px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.primary};
  box-shadow: 14px -9px teal;
`;
const LoginPhone = styled.div``;
const LoginPhoneButton = styled.button`
  position: relative;
  top: 3rem;
  left: 2.5rem;
  cursor: pointer;
  width: 6rem;
  height: 2.5rem;
  border: none;
  border-radius: 2rem;
  color: white;
  background-color: rgb(76, 175, 80);
  box-shadow: 14px -9px teal;
  &:hover {
    transition: 0.3s;
    background-color: rgb(62, 142, 65);
  }
`;
const Email = styled.h4`
  position: relative;
  left: 12rem;
  cursor: pointer;
  &&:hover {
    text-decoration: underline;
  }
`;

// Main Component
const LoginForm = () => {
  const [formState, setFormState] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const FormChange = () => {
    setFormState((prevState) => (prevState === 0 ? 1 : 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = parol.find(
      (user) => (user.login === email && user.pwd === password) || user.PhoneNumber === PhoneNumber
    );

    if (user) {
      cookieData("token").setValue("some-auth-token");
      cookieData("email").setValue(user.login)
      cookieData("username").setValue(user.username);
      cookieData("password").setValue(user.pwd);
      cookieData("PhoneNumber").setValue(user.PhoneNumber);
      navigate(ROUTES.HOME_PAGE);
      window.location.reload();
      toast.success("Successfully logged in");
    } else {
      toast.error("Please enter a valid email and password");
    }
  };
  // Function to use CookieData

  // const [email, setEmail] = useState('');

  // const [username, setUsername] = useState('')

  // const [lastName, setLastName] = useState('');
  
  // const [phoneNumber, setPhoneNumber] = useState('')
  
  // const [password, setPassword] = useState('')

  // useEffect(() => {
  //   const storedEmail = cookieData("email").getValue();  
  //   const storedUsername = cookieData("username").getValue();
  //   const storedlastName = cookieData("lastName").getValue();
  //   const storedPassword = cookieData("password").getValue();
  //   const storedPhoneNumber = cookieData("PhoneNumber").getValue();
  //   if (storedEmail && storedUsername && storedlastName && storedPassword && storedPhoneNumber) {
  //     setEmail(storedEmail);
  //     setUsername(storedUsername);
  //     setLastName(storedlastName);
  //     setPassword(storedPassword);
  //     setPhoneNumber(storedPhoneNumber);
  //   }
  // }, []);

  return (
    <LoginFormContainer>
      {formState === 0 ? (
        <Login>
          <LoginFormTitle>Login</LoginFormTitle>
          <form onSubmit={handleSubmit}>
            <LoginFormInput
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoginFormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <RegisterType>
              <LoginFormButton type="submit">Login</LoginFormButton>
              <PhoneNum onClick={FormChange}>Continue with ph. number</PhoneNum>
            </RegisterType>
          </form>
        </Login>
      ) : (
        <LoginPhone>
            <LoginFormTitle>Login</LoginFormTitle>
          <PhoneInput
            value={PhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            type="text"
            />
          <LoginPhoneButton type="submit" onClick={handleSubmit}>Login</LoginPhoneButton>
          <Email onClick={FormChange}>Continue with email</Email>
          <Number>+998</Number>
        </LoginPhone>
      )}
    </LoginFormContainer>
  );
};

export default LoginForm;
