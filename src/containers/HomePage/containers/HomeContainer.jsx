import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { cookieData } from "../../../utils/cookies";
import { toast } from "react-toastify"; 
import { LOGIN_PAGE } from "../../../constants/routes";

const Container = styled("div")`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color: ${({ theme }) => theme.secondary};
`;

const HomeContainer = ({ theme }) => {
  const navigate = useNavigate();

  if (cookieData("username").getValue() === "") {
    navigate(LOGIN_PAGE);
    toast.error("Please login to access the home page");
  }
  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
};

export default HomeContainer;
