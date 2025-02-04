import styled from "styled-components";
import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const StationPage = ({ stationId }) => {
  const [peopleCount, setPeopleCount] = useState(0);
  const [isAtStation, setIsAtStation] = useState(false);
  const deviceId = localStorage.getItem("deviceId") || crypto.randomUUID();

  const handleArrived = () => {
    socket.emit("userArrived", { deviceId, stationId });
    setIsAtStation(true);
  };

  const handleLeft = () => {
    socket.emit("userLeft", { deviceId });
    setIsAtStation(false);
  };

  socket.on("updateStationTraffic", (data) => {
    setPeopleCount(data[stationId] || 0);
  });

  return (
    <div>
      <h2>Заправка #{stationId}</h2>
      <p>Примерно {peopleCount} человек</p>
      {isAtStation ? (
        <button onClick={handleLeft}>🚗 Уехал</button>
      ) : (
        <button onClick={handleArrived}>🚗 Подъехал</button>
      )}
    </div>
  );
}

export default StationPage;