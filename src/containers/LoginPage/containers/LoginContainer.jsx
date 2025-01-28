import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.primary};
`;
const Logincontainer = styled("div")``;

const LoginContainer = ({ theme }) => {
  return (
    <Container>
      <Logincontainer>
        <LoginForm />
      </Logincontainer>
    </Container>
  );
};

export default LoginContainer;
