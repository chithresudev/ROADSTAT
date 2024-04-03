import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import truckIcon from '/images/truck.png';
import truckDest from '/images/truckloc.png';
import dotenv from 'dotenv';

const containerStyle = {
  width: '100%',
  height: '175px'
};


// const google_map_api = process.env.GOOGLE_MAP_API;
const google_map_api = import.meta.env.VITE_GOOGLE_MAP_API;

function DMapComponent({ truckLocations, truckDestinations }) {

    console.log("truckLocations:", truckLocations);
    console.log("truckDestinations:", truckDestinations);
    

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAiCj4d2M6PAX7OZ1c0cSSQCdT7RXmhwA0"
  });

  const center = {
    lat: truckLocations.latitude,
    lng: truckLocations.longitude
};

  const [map, setMap] = React.useState(null);
  const [directions, setDirections] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const directionsCallback = (response) => {
    if (response !== null && directions === null) {
      setDirections(response);
    }
  };

  React.useEffect(() => {
    setDirections(null);
  }, [truckLocations, truckDestinations]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {map && (
        <>
          <Marker
            position={{ lat: truckLocations.latitude, lng: truckLocations.longitude }}
            icon={{
              url: truckIcon,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          <Marker
            position={{ lat: truckDestinations.latitude, lng: truckDestinations.longitude }}
            icon={{
              url: truckDest,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          {directions && <DirectionsRenderer directions={directions} />}
          <DirectionsService
            options={{
              origin: { lat: truckLocations.latitude, lng: truckLocations.longitude },
              destination: { lat: truckDestinations.latitude, lng: truckDestinations.longitude },
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />
        </>
      )}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(DMapComponent);
