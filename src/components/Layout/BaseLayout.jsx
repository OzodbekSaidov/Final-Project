import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import MapComponent from "../../containers/HomePage/containers/MapComponent";

const Container = styled("div")`
  height: 100vh;
  background-color: ${({ theme }) => theme.primary};
`;

const ChildrenComponent = styled("div")`
  width: 100%;
  height: 80%;
  background-color: ${({ theme }) => theme.primary};
`;

const BaseLayout = ({ children, theme, toggleTheme }) => {
  return (
    <Container>
      <ChildrenComponent>{children}</ChildrenComponent>
    </Container>
  );
};

export default BaseLayout;