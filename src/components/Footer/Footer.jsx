import React from "react";
import styled from "styled-components";

const FuelButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem; /* Slightly above the bottom */
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  display: flex;
  justify-content: space-between;
  z-index: 800;
`;

const FuelButton = styled.button`
  background-color: ${(props) => (props.active ? "#007bff" : "#f1f1f1")};
  color: ${(props) => (props.active ? "#ffffff" : "#007bff")};
  padding: 0.75rem 1.5rem;
  border: 1px solid #007bff;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  margin: 0 0.5rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #007bff;
    color: #ffffff;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Footer = ({ selectedFuel, onFuelSelect }) => {
  return (
    <FuelButtonContainer>
      <FuelButton
        active={selectedFuel === "Methane"}
        onClick={() => onFuelSelect("Methane")}
      >
        Methane
      </FuelButton>
      <FuelButton
        active={selectedFuel === "Fuel"}
        onClick={() => onFuelSelect("Fuel")}
      >
        Fuel
      </FuelButton>
      <FuelButton
        active={selectedFuel === "Propane"}
        onClick={() => onFuelSelect("Propane")}
      >
        Propane
      </FuelButton>
      <FuelButton
        active={selectedFuel === "Electric"}
        onClick={() => onFuelSelect("Electric")}
      >
        Electric
      </FuelButton>
    </FuelButtonContainer>
  );
};

export default Footer;