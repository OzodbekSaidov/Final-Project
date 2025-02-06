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
    // Only set the fuel type if the input is empty
    if (fuelSearchValue === "") {
      setSelectedFuel(fuelType);
      setFuelSearchValue(fuelType); // Set the input to the selected fuel type
    } else {
      setSelectedFuel(fuelType); // Update selected fuel without affecting the input if not empty
    }
  };

  const handleSearchInputChange = (e) => {
    setFuelSearchValue(e.target.value); // Allow the user to modify the input
  };

  // const navigate = useNavigate();

  // if (cookieData("username").getValue() === "") {
  //   navigate(LOGIN_PAGE);
  //   toast.error("Please login to access the home page");
  // }
  return (
    <Container>
      <Navbar
        isOpen={isOpen}
        fuelSearchValue={fuelSearchValue}
        onSearchInputChange={handleSearchInputChange}
      />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MapComponent />
      <Footer
        selectedFuel={selectedFuel}
        onFuelSelect={handleFuelSelect}
      />
    </Container>
  );
};

export default HomeContainer;
