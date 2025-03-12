import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapUpdater = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300); // Ensures map resizes properly after rendering
  }, [map]);
  return null;
};

const MapView = ({ pickupCoords, dropoffCoords, route }) => {
  const defaultCenter = pickupCoords || dropoffCoords || [51.4416, 5.4697];

  return (
    <div className="w-full max-w-3xl mx-auto h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        <MapUpdater />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {pickupCoords && (
          <Marker position={pickupCoords}>
            <Popup>Pickup Location</Popup>
          </Marker>
        )}
        {dropoffCoords && (
          <Marker position={dropoffCoords}>
            <Popup>Drop-off Location</Popup>
          </Marker>
        )}
        {route && route.length > 1 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default MapView;
