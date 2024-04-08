
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './MapComponent.css'; // Import the external CSS file

const google_map_api = import.meta.env.VITE_GOOGLE_MAP_API;

class MapComponent extends Component {
  render() {
    return (
      <div className='map-container'>
        <div className='map'>
          <Map
            google={this.props.google}
            zoom={14}
            style={{ width: '40%', height: '50%' }}
            initialCenter={{ lat: 37.7749, lng: -122.4194 }}
          >
            <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
          </Map>
        </div>
        <button className='map-button'>Open with Maps</button>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: google_map_api,
})(MapComponent);
