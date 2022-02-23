import React from "react";
import { Marker } from "react-map-gl";
import { Tooltip, Popover } from "antd";
import Flag from "react-flags";
import __ from "../../localization/tr";
import { connect } from "react-redux";
import * as countries from "../../countries.json";
import { FlyMe } from "../helpers";
import MarkerPopover from "./markerPopover";
import ReactTimeAgo from "react-time-ago";

function mapStateToProps(state) {
  return {
    user: state.root.user,
    country: state.root.country,
    MapConfig: state.root.MapConfig,
    data: state.root.data,
  };
}

class Markers extends React.Component {
  render() {
    const { user, country } = this.props;
    const { currentCountryData } = country;
    return (
      <React.Fragment>
        {countries.countries.map((country) => {
          const { search, name, iso, coordinates, name_ar } = country.country;
          const { lng, lat } = coordinates;

          const country_name_lan = user.language === "en" ? name : name_ar;

          let dataUpdatedTime =
            currentCountryData !== null &&
            currentCountryData.time !== undefined ? (
              <Tooltip title={currentCountryData.time}>
                {" - " + __("last update") + " "}
                <ReactTimeAgo
                  date={Date.parse(currentCountryData.time)}
                  locale={user.language}
                />
              </Tooltip>
            ) : (
              ""
            );

          return (
            <Marker key={iso} latitude={Number(lat)} longitude={Number(lng)}>
              <Popover
                content={<MarkerPopover />}
                title={
                  <span>
                    <Flag
                      name={iso}
                      format="png"
                      pngSize={24}
                      basePath=""
                      style={{ borderRadius: "10px" }}
                      className="flag-popover"
                    />
                    {country_name_lan} {dataUpdatedTime}
                  </span>
                }
                trigger="focus"
              >
                <button
                  onClick={() =>
                    FlyMe(
                      lat,
                      lng,
                      6,
                      {
                        currentKey: iso,
                        currentCountry: search,
                      },
                      false
                    )
                  }
                  className="request-loader Flags"
                  style={{
                    background: `url(/flags-iso/flat/svg/${iso}.svg)`,
                  }}
                ></button>
              </Popover>
            </Marker>
          );
        })}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Markers);
