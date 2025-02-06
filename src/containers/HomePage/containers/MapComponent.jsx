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

// Кастомный маркер
const MarkerIcon = L.divIcon({
  html: `<div style="
    width: 30px; 
    height: 30px; 
    background: red; 
    border-radius: 50%; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    color: white;
    font-size: 18px;">
    🚀
  </div>`,
  className: "custom-marker",
  iconSize: [30, 30],
});

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
  const [filteredStations, setFilteredStations] = useState([]);
  const [search, setSearch] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [userPosition, setUserPosition] = useState(
    JSON.parse(localStorage.getItem("userPosition")) || null
  );

  useEffect(() => {
    getStations().then(setStations).catch(console.error);
  }, []);

  useEffect(() => {
    const filtered = stations.filter((station) => {
      const matchesName = station.name.toLowerCase().includes(search.toLowerCase());
      const matchesFuel = fuelType ? station.fuelType === fuelType : true;
      return matchesName && matchesFuel;
    });

    setFilteredStations(filtered);
  }, [search, fuelType, stations]);

  return (
    <MapContainer
      center={[41, 69]}
      zoom={17}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />

      {filteredStations.map((station) => (
        <Marker
          key={station.id}
          position={[station.location.lat, station.location.lng]}
          icon={MarkerIcon}
        >
          <Popup>
            <b>{station.name}</b> <br />
            Топливо: {station.services}
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
    </MapContainer>
  );
};

export default MapComponent;
