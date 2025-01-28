import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HOME_PAGE, LOGIN_PAGE } from "../../constants/routes";
import { cookieData } from "../../utils/cookies";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  z-index: 100;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.primary};
  box-shadow: 6px 0px 11px 0px ${({ theme }) => theme.shadow};
  -webkit-box-shadow: 6px 0px 11px 0px ${({ theme }) => theme.shadow};
`;

const Nvabar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      
    </NavContainer>
  );
};

export default Nvabar;
