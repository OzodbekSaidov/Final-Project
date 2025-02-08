import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { cookieData } from "../../../utils/cookies";
import { toast } from "react-toastify";
import { LOGIN_PAGE } from "../../../constants/routes";
import MapComponent from "./MapComponent";
import Navbar from "../../../components/Navbar/Navbar.jsx";
import Sidebar from "../../../components/Navbar/MenuList.jsx";
import { useState } from "react";
import Footer from "../../../components/Footer/Footer.jsx";



const Container = styled("div")`
  height: 100vh;
  width: 100%;
`;

const HomeContainer = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState("");
  const [fuelSearchValue, setFuelSearchValue] = useState("");


  const handleFuelSelect = (fuelType) => {
    if (fuelSearchValue === "") {
      setSelectedFuel(fuelType);
      setFuelSearchValue(fuelType); 
    } else {
      setSelectedFuel(fuelType); 
    }
  };

  const handleSearchInputChange = (e) => {
    setFuelSearchValue(e.target.value); 
  };


  return (
    <Container>
      <Navbar
        isOpen={isOpen}
        fuelSearchValue={fuelSearchValue}
        onSearchInputChange={handleSearchInputChange}
      />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MapComponent />
    </Container>
  );
};

export default HomeContainer;
