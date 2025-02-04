import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  ZoomControl,
  useMapEvents,
  
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getStations } from "../../../axios/axios";

// const LocateUser = () => {
//   const map = useMap();


//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           map.setView([latitude, longitude], 13);
//         },
//         () => {
//           console.error("Не удалось получить местоположение");
//         }
//       );
//     }
//   }, [map]);

//   return null;
// };

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const MapComponent = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    getStations().then(setStations).catch(console.error);
  });
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={20}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />

      {stations.map((station) => (
        <Marker key={station.id} position={[station.location.lat, station.location.lng]}>
          <Popup>
            <b>{station.name}</b> <br/>
            Топливо: {station.services}
          </Popup>
        </Marker>
      ))}

      <ZoomControl position="bottomright" />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;
