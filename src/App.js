import styled, { ThemeProvider } from "styled-components";
import RoutesContainer from "./components/routes";
import "leaflet/dist/leaflet.css";
import { LightMode, DarkMode } from "./constants/theme";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled("div")`
  background-color: ${({ theme }) => theme.secondary};
`;

const App = ({ routes }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? LightMode : DarkMode}>
      <Container>
        <RoutesContainer
          theme={theme}
          routes={routes}
          toggleTheme={toggleTheme}
        />
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
