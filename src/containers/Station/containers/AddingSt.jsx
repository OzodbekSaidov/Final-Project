import { useState } from "react";
import { api } from "../../../axios/axios.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../../constants/routes.js";
import MapPicker from "./MapPicker"; // Import the MapPicker component

const Card = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const fuelTypes = ["AI-80", "AI-91", "AI-92", "AI-95", "AI-98", "AI-100"];
const otherFuels = ["diesel", "propane", "methane", "electric"];

const StationAdd = () => {
  const [station, setStation] = useState({
    name: "",
    city: "",
    lat: "",
    lng: "",
    services: [],
    prices: { gasoline: {} },
    status: true,
  });
  const [selectedFuel, setSelectedFuel] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStation((prev) => ({ ...prev, [name]: value }));
  };

  const handleGasolineChange = (type, value) => {
    setStation((prev) => ({
      ...prev,
      services: prev.services.includes("fuel") ? prev.services : ["fuel", ...prev.services],
      prices: {
        ...prev.prices,
        gasoline: {
          ...prev.prices.gasoline,
          [type]: value ? parseInt(value, 10) : 0,
        },
      },
    }));
  };

  const handleOtherFuelChange = (type, value) => {
    setStation((prev) => ({
      ...prev,
      services: prev.services.includes(type) ? prev.services : [...prev.services, type],
      prices: { ...prev.prices, [type]: value ? parseInt(value, 10) : 0 },
    }));
  };

  const handleLocationSelect = ({ lat, lng }) => {
    setStation((prev) => ({
      ...prev,
      lat: lat.toString(),
      lng: lng.toString(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ...station,
      location: { lat: parseFloat(station.lat), lng: parseFloat(station.lng) },
    };

    try {
      const token = localStorage.getItem("token");
      await api.post("/stations", requestData, {
        headers: { Authorization: `Bearer ${JSON.parse(token) || "null"}` },
      });
      alert("Станция добавлена!");
      navigate(HOME_PAGE);
    } catch (error) {
      console.error("Ошибка при добавлении станции:", error);
      alert("Ошибка при добавлении!");
    }
  };

  return (
    <Card>
      <h2>Добавить заправку</h2>
      <form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Название" onChange={handleChange} required />
        <Input name="city" placeholder="Город" onChange={handleChange} required />

        <h3>Выберите местоположение на карте:</h3>
        <MapPicker onLocationSelect={handleLocationSelect} />

        <h3>Бензин:</h3>
        {fuelTypes.map((type) => (
          <Label key={type}>
            {type}
            <Input
              type="number"
              placeholder="Цена"
              onChange={(e) => handleGasolineChange(type, e.target.value)}
            />
          </Label>
        ))}

        <h3>Другие виды топлива:</h3>
        {otherFuels.map((type) => (
          <Label key={type}>
            <input
              type="checkbox"
              checked={station.services.includes(type)}
              onChange={() => handleOtherFuelChange(type, station.prices[type] || 0)}
            />
            {type}
            {station.services.includes(type) && (
              <Input
                type="number"
                placeholder="Цена"
                onChange={(e) => handleOtherFuelChange(type, e.target.value)}
              />
            )}
          </Label>
        ))}

        <Label>
          <span>Станция активна</span>
          <input
            type="checkbox"
            checked={station.status}
            onChange={() => setStation((prev) => ({ ...prev, status: !prev.status }))}
          />
        </Label>
        <Button type="submit">Добавить</Button>
      </form>
    </Card>
  );
};

export default StationAdd;