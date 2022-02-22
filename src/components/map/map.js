import React from "react";
import { setMapLoaded, setViewport } from "../../store/actions";
import store from "../../store";
import Markers from "./markers";
import { FlyMe } from "../helpers";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import { Button } from "antd";
import "mapbox-gl/src/css/mapbox-gl.css";

import { setRTLTextPlugin } from "mapbox-gl";
import { ReloadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true
);

function mapStateToProps(state) {
  return {
    user: state.user,
    country: state.country,
    MapConfig: state.MapConfig,
    data: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMapLoaded: (isLoaded) => dispatch(setMapLoaded(isLoaded)),
    setViewport: (viewport) => dispatch(setViewport(viewport)),
  };
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    store.subscribe(() => {
      let language = store.getState().user.language;
      if (this.mapRef !== null && store.getState().MapConfig.loaded) {
        if (language === "ar") {
          this.mapRef
            .getMap()
            .setLayoutProperty("place-label", "text-field", ["get", "name_ar"]);
        } else {
          this.mapRef
            .getMap()
            .setLayoutProperty("place-label", "text-field", ["get", "name_en"]);
        }
      }
    });
  }

  _onViewportChange = (viewport) => this.props.setViewport(viewport);

  render() {
    const { user, MapConfig, setMapLoaded } = this.props;
    const { viewport, darkMode } = user;
    const { mapboxApiAccessToken, styles } = MapConfig;
    const { latitude, longitude, zoom } = viewport;
    let mapStyle = darkMode ? styles.dark : styles.light;

    const defaultViewPort = {
      latitude: 26.96,
      longitude: 50.06,
      zoom: 3,
    };

    const ReloadButton = () => {
      if (
        Number(latitude).toFixed(2) !==
        Number(defaultViewPort.latitude).toFixed(2) ||
        Number(longitude).toFixed(2) !==
        Number(defaultViewPort.longitude).toFixed(2) ||
        Number(zoom).toFixed(2) !== Number(defaultViewPort.zoom).toFixed(2)
      ) {
        return (
          <Button
            className="reload-viewport"
            shape="circle"
            onClick={() => FlyMe()}
            icon={<ReloadOutlined />}
          ></Button>
        );
      } else {
        return "";
      }
    };

    return (
      <ReactMapGL
        onLoad={() => {
          setMapLoaded(true);
        }}
        {...viewport}
        ref={(map) => (this.mapRef = map)}
        mapStyle={mapStyle}
        width="100vw"
        height="40vh"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={mapboxApiAccessToken}
      >
        <Markers />
        <div className="map-tools">
          <NavigationControl showCompass={false} />
          {Number(latitude).toFixed(2) !==
            Number(defaultViewPort.latitude).toFixed(2) ||
            Number(longitude).toFixed(2) !==
            Number(defaultViewPort.longitude).toFixed(2) ||
            Number(zoom).toFixed(2) !==
            Number(defaultViewPort.zoom).toFixed(2) ? (
            <ReloadButton />
          ) : (
            ""
          )}
        </div>
      </ReactMapGL>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
