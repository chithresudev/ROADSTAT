import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import truckIcon from '/images/truckloc.png';
import truckIcon2 from '/images/truckloc2.png';
import dotenv from 'dotenv';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 43.6777,
  lng: -79.6248
};

const google_map_api = process.env.GOOGLE_MAP_API;


function MapComponent({ truckLocations, selectedTruckNo }) {
    
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAiCj4d2M6PAX7OZ1c0cSSQCdT7RXmhwA0"
  });

  const [map, setMap] = React.useState(null);
  const [zoom, setZoom] = React.useState(9); 

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {map && truckLocations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.latitude, lng: location.longitude }}
          icon={{
            url: selectedTruckNo === location.truckId ? truckIcon2 : truckIcon,
            scaledSize: new window.google.maps.Size(30, 30),
        }}
        />
      ))}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MapComponent);
