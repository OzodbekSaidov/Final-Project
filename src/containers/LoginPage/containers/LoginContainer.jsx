import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logincontainer = styled("div")``;

const LoginContainer = ({ theme }) => {
  return (
    <Container>
        <LoginForm />
    </Container>
  );
};

export default LoginContainer;
