import { MapContainer, TileLayer, useMapEvent, ZoomControl, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

const MapPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  
  const MapClickHandler = () => {
    useMapEvent("click", (e) => {
      const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        onLocationSelect({ lat, lng });
    });
    return null;
  };

  return (
    <MapContainer
      center={[41.2139482774554, 69.2136831665452]}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler /> 
      {position && (
        <Marker position={[position.lat, position.lng]}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default MapPicker;
