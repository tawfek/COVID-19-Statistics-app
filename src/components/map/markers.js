import React from "react";
import { Marker } from "react-map-gl";
import { Tooltip, Popover } from "antd";
import Flag from "react-flags";
import __ from "../../localization/tr";
import { connect } from "react-redux";
import * as countries from "../../countries.json";
import { FlyMe } from "../helpers";
import MarkerPopover from "./markerPopover";
import TimeAgo from "react-timeago";
import { Languages } from "../../localization/languages";

function mapStateToProps(state) {
  return {
    user: state.root.user,
    country: state.root.country,
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
          const { search, name, iso, coordinates } = country.country;
          const { lng, lat } = coordinates;

          let dataUpdatedTime =
            currentCountryData !== null &&
            currentCountryData.time !== undefined ? (
              <Tooltip title={currentCountryData.time}>
                {` - ${__("last update")} `}
                {Languages.map((language) => {
                  if (language.key === user.language) {
                    return (
                      <TimeAgo
                        key={language.key}
                        date={Date.parse(currentCountryData.time)}
                        formatter={language.formater}
                      />
                    );
                  }
                  return "";
                })}
              </Tooltip>
            ) : (
              <></>
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
                    {__(name)} {dataUpdatedTime}
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
