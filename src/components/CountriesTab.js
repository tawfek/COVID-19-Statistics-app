import React from "react";
import { SettingFilled } from "@ant-design/icons";
import SettingsMenu from "./settingMenu";
import {  Tabs, Button, Dropdown } from "antd";
import Flag from "react-flags";
import { setCountry } from "./helpers";
import * as Countries from "../countries.json";
import __ from "../localization/tr";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import {history} from "../store"

const { TabPane } = Tabs;



function mapStateToProps(state) {
    return { user: state.root.user, country: state.root.country, page: state.root.page ,location:state.router.location,router:state.router,  pathname: state.router.location.pathname,
    };
  }


class CountryTabs extends React.Component {

  
    render() { 
      let SettingsMenuButton = (
      
      <Dropdown
      trigger={["click"]}
      overlay={<SettingsMenu />}
    >
      <div className="setting-button">
        <Button
          type="link"
          block
          className="settingbar"
          icon={<SettingFilled />}
        >
          {" "}
          {__("Settings")}{" "}
        </Button>
      </div>
    </Dropdown>
 
    )

        return (
          <ConnectedRouter path={`:lng/:country`} history={history}>

            <Tabs
              theme="dark"
              dir="ltr"
              onChange={(countryIso) => {
                setCountry(countryIso);
              }}
              animated={false}
              defaultActiveKey={this.props.country.currentKey}
              activeKey={this.props.country.currentKey}
              tabPosition="top"
              style={{ height: "auto" }}
              tabBarExtraContent={SettingsMenuButton}
            >
              {Countries.countries.map((country) => {
                const Country = country.country;
                const country_name = __(Country.name);
                return (
                  <TabPane
                    tab={
                      <Link  key={Country.iso} to={`/${this.props.user.language}/${Country.search}`}>
                      <div
                          className="country-tab"
                          dir={[__("dir")]}
                        >
                          <span>{country_name}</span>
                          <Flag
                            name={Country.iso}
                            format="png"
                            pngSize={24}
                            basePath=""
                            style={{ borderRadius: "10px" }}
                            className="flag-popover"
                          />
                        </div>
                    </Link >
                    }
                    key={Country.iso}
                    >
                    
                  </TabPane>
                );
              })}
            </Tabs>
         </ConnectedRouter>

        )
    }
}

export default (connect(mapStateToProps)(CountryTabs))