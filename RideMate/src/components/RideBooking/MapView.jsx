import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

const MapUpdater = () => {
    const map = useMap();
    React.useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 500); // Ensure map resizes properly after rendering
    }, [map]);
    return null;
  };
  

const MapView = ({ pickupCoords, dropoffCoords, route }) => {
  return (
    <div className="w-full md:w-3/5 md:ml-6 min-h-[400px] h-[500px]">
      <MapContainer
        center={[51.4416, 5.4697]}
        zoom={13}
        className="h-full w-full rounded-lg"
      >
        <MapUpdater />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {pickupCoords && (
          <Marker position={pickupCoords}>
            <Popup>Pickup</Popup>
          </Marker>
        )}
        {dropoffCoords && (
          <Marker position={dropoffCoords}>
            <Popup>Drop-off</Popup>
          </Marker>
        )}
        {route && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default MapView;
