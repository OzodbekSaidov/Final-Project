import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 23rem;
  width: 100%;
  z-index: 1000;
  color: #ffffff;
  background-color: blue;
`;

const Footer = ({ theme }) => {
  return (
    <FooterContainer>
      
    </FooterContainer>
  );
};

export default Footer;