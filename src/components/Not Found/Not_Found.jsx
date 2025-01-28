import styled from "styled-components";
import { CloudOff, Frown } from "react-feather";
import * as ROUTES from "../routes";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../constants/routes";
import Bear from "../../images/Bear.png"

const NotFoundContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #024059;
  background-color: white;
`;
const Error404 = styled.h1`
  font-size: 4rem;
  margin-top: -3rem;
`;
const Maninbutton = styled("button")`
  position: relative;
  cursor: pointer;
  width: 15vw;
  height: 9vh;
  font-size: 1rem;
  top: 5vh;
  border: none;
  border-radius: 1rem;
  color: white;
  background-color: rgb(76, 175, 80);
  &:hover {
    transition: 0.3s;
    background-color: rgb(62, 142, 65);
  }
`;

const BearImage = styled.img`
  width: 35vw;
  height: 50vh;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <BearImage src={Bear} />
      <Error404>404</Error404>
      <Error404 style={{margin: "1rem 0"}}>Page Not Found</Error404>
      <Maninbutton onClick={() => navigate(HOME_PAGE)}>Return to Main Page</Maninbutton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
