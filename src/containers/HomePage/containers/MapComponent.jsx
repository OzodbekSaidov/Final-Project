import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoMdLocate } from "react-icons/io";
import L from "leaflet";
import { useState, useEffect } from "react";
import { getStations } from "../../../axios/axios";
import styled from "styled-components";
import "leaflet-routing-machine"

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
// Кастомный маркер
const MarkerIcon = L.divIcon({
  html:`<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 0H8C5.17157 0 3.75736 0 2.87868 0.87868C2 1.75736 2 3.17157 2 6V19.25H1C0.585786 19.25 0.25 19.5858 0.25 20C0.25 20.4142 0.585786 20.75 1 20.75H16.25C16.6642 20.75 17 20.4142 17 20C17 19.5858 16.6642 19.25 16.25 19.25H15V15.75H16.5714C16.9462 15.75 17.25 16.0538 17.25 16.4286V16.5C17.25 17.7427 18.2574 18.75 19.5 18.75C20.7426 18.75 21.75 17.7427 21.75 16.5V5.60177C21.75 5.44511 21.75 5.33702 21.7441 5.23161C21.6884 4.24063 21.2422 3.31214 20.5031 2.64962C20.4245 2.57915 20.3401 2.51163 20.2178 2.41378L18.9685 1.41438C18.6451 1.15562 18.1731 1.20806 17.9143 1.53151C17.6556 1.85495 17.708 2.32692 18.0315 2.58568L19.2646 3.57215C19.4091 3.68774 19.4585 3.72768 19.5019 3.76653C19.9453 4.16405 20.2131 4.72114 20.2465 5.31573C20.2497 5.37384 20.25 5.43743 20.25 5.62247V6H19.5C18.6716 6 18 6.67157 18 7.5V9.91886C18 10.5645 18.4131 11.1377 19.0257 11.3419L20.25 11.75V16.5C20.25 16.9142 19.9142 17.25 19.5 17.25C19.0858 17.25 18.75 16.9142 18.75 16.5V16.4286C18.75 15.2254 17.7746 14.25 16.5714 14.25H15V6C15 3.17157 15 1.75736 14.1213 0.87868C13.2426 0 11.8284 0 9 0ZM8.88587 7.35688C9.24106 7.56999 9.35623 8.03069 9.14312 8.38587L8.32464 9.75H10C10.2702 9.75 10.5195 9.89534 10.6527 10.1305C10.7858 10.3656 10.7821 10.6542 10.6431 10.8859L9.14312 13.3859C8.93001 13.7411 8.46931 13.8562 8.11413 13.6431C7.75894 13.43 7.64377 12.9693 7.85688 12.6141L8.67536 11.25H7C6.7298 11.25 6.48048 11.1047 6.34735 10.8695C6.21422 10.6344 6.21786 10.3458 6.35688 10.1141L7.85688 7.61413C8.06999 7.25894 8.53069 7.14377 8.88587 7.35688Z" fill="#1C274C"/>
</svg>


`,className :""
 

});

const RoutingMachine = ({ userPosition, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!userPosition || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userPosition.lat, userPosition.lng),
        L.latLng(destination.lat, destination.lng)
      ],
      lineOptions: {
        styles: [{ color: "green", opacity: 0.8, weight: 5 }]
      },
      show: false,
      createMarker: () => null,
      addWaypoints: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, userPosition, destination]);


  return null;
};

// Компонент кнопки
const LocateButton = ({ setUserPosition }) => {
  const map = useMap();

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPosition(coords);
        localStorage.setItem("userPosition", JSON.stringify(coords));

        // Перемещаем карту после получения координат
        map.flyTo(coords, 15);
      },
      (err) => console.error("Ошибка определения местоположения:", err)
    );
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "absolute",
        bottom: "100px",
        right: "4px",
        padding: "8px 10px",
        background: "none",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        border: "grey 1px solid",
        borderRadius: "10px",
        cursor: "pointer",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s",
        zIndex: 1000,
      }}
      onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
      onMouseLeave={(e) => (e.target.style.background = "none")}
    >
      <IoMdLocate color="black" size={19}/> 
    </button>
  );
};

const MapComponent = () => {
  const [stations, setStations] = useState([]);
  const [userPosition, setUserPosition] = useState(
    JSON.parse(localStorage.getItem("userPosition")) || null
  );
  const [fuelSearchValue, setFuelSearchValue] = useState(null);
console.log(fuelSearchValue);
const [destination, setDestination] = useState(null);
  useEffect(() => {
    getStations(`${fuelSearchValue? `?s=${fuelSearchValue?.toLowerCase()}` : ``}`).then(setStations).catch(console.error);
  }, [fuelSearchValue]);

  // useEffect(() => {
  //   const filtered = stations.filter((station) => {
  //     const matchesName = station.name.toLowerCase().includes(search.toLowerCase());
  //     const matchesFuel = fuelType ? station.fuelType === fuelType : true;
  //     return matchesName && matchesFuel;
  //   });

  //   setFilteredStations(filtered);
  // }, [search, fuelType, stations]);
console.log(stations[3]?.status);

  return (
    <>
    <MapContainer
      center={[41.2139482774554,  69.2136831665452]}
      zoom={17}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />

      {stations.map((station) => (
        <Marker
          key={station._id}
          position={[station.location.lat, station.location.lng]}
          icon={MarkerIcon}
          eventHandlers={{
            click: () => setDestination(station.location)
          }}
        >
          <Popup>
            <b>{station.name}</b> <br />
            Топливо: {station.services.join(", ")}<br />
            Status: {station.status ? <h>Работает</h> : <h>Закрыто</h>}
            <button onClick={() => setDestination(station.location)}>
              В путь
            </button>
          </Popup>
        </Marker>
      ))}

      {userPosition && (
        <Marker position={[userPosition.lat, userPosition.lng]}>
          <Popup>Вы здесь!</Popup>
        </Marker>
      )}

      <ZoomControl position="bottomright" />
      <LocateButton setUserPosition={setUserPosition} />
      <RoutingMachine userPosition={userPosition} destination={destination} />

    </MapContainer>
    <FuelButtonContainer>
      <FuelButton
        active={fuelSearchValue === "Methane"}
        onClick={() => setFuelSearchValue("Methane")}
      >
        Methane
      </FuelButton>
      <FuelButton
        active={fuelSearchValue === "Fuel"}
        onClick={() => setFuelSearchValue("Fuel")}
      >
        Fuel
      </FuelButton>
      <FuelButton
        active={fuelSearchValue === "Propane"}
        onClick={() => setFuelSearchValue("Propane")}
      >
        Propane
      </FuelButton>
      <FuelButton
        active={fuelSearchValue === "Electric"}
        onClick={() => setFuelSearchValue("Electric")}
      >
        Electric
      </FuelButton>
    </FuelButtonContainer>
    </>
  );
};

export default MapComponent;
