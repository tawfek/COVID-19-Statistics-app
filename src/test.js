import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {GeolocateControl} from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGF3ZmVrIiwiYSI6ImNqMG14bjFrYTAwMW8yd251cm14dnNiaGwifQ.HBES0LqkE-Jcxs24amwGuw'; // Set your mapbox token here

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10,
  width:"100vw",
  height:"100vh"
};

export default class Test extends Component {
  state = {
    viewport: {
      latitude: 37.8,
      longitude: 96,
      zoom: 3,
      bearing: 0,
      pitch: 0
    }
  };

  _onViewportChange = viewport => this.setState({viewport});

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/tawfek/ck8wzbpb62xuh1ipbhqg8ef7p"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </MapGL>
    );
  }
}

 