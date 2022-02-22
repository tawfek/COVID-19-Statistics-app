import React from "react";
import * as MarkerDB from "./countries.json";
import {Row,Col,Tabs,Button,Dropdown} from "antd";
import DefaultStatistics from "./components/charts/default"
import LineChart from "./components/charts/lineChart"
import SettingsMenu from "./components/settingMenu"
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { SettingFilled } from "@ant-design/icons";
import __ from "./localization/tr";
import Flag from "react-flags";
import { connect } from "react-redux";
import { setCountry} from "./components/helpers"
import { setPageTitle,setPageDescription } from "./store/actions";
import PercentChart from "./components/charts/percentChart";
import DaysCollapseChart from "./components/charts/daysCollapseChart";  
import LiquidChart from "./components/charts/liquidChart";
const { TabPane } = Tabs;


function mapStateToProps(state) {
  return { user: state.user,country:state.country,page:state.page };
}
function mapDispatchToProps(dispatch) {
  return {
    setPageTitle:(title) => dispatch(setPageTitle(title)),
    setPageDescription:(description)=> dispatch(setPageDescription(description)),
  };
}

class Layout extends React.Component {


  render() {
 

  
    return (
      <Router>
        <Row>
  
          <Col dir="ltr" sm={24} md={24}>
            <Switch>
              <Redirect exact from="/" to={"/" + this.props.user.language + "/Bahrain"} />
              <Redirect exact from="/ar" to={"/" + this.props.user.language + "/Bahrain"} />
              <Redirect exact from="/en" to={"/" + this.props.user.language + "/Bahrain"} />
              <Route
                path="/:lang/:country?"
                render={({ match, history }) => {
                  return (
                    <Switch>
                      <Tabs
                        theme="dark"
                        dir="ltr"
                        onChange={(countryIso) => {
                          setCountry(countryIso)
                        }}
                        animated={false}
                        defaultActiveKey={this.props.country.currentKey}
                        activeKey={this.props.country.currentKey}
                        tabPosition="top"
                        style={{ height: "auto" }}
                        tabBarExtraContent={
                          <Dropdown
                            trigger={["click"]}
                            overlay={<SettingsMenu/>}
                          >
                            <Button
                              type="primary"
                              ghost
                              shape="round"
                              block
                              className="settingbar"
                              icon={<SettingFilled />}
                            >
                              {" "}
                              {__("Settings")}{" "}
                            </Button>
                          </Dropdown>
                        }
                      >
                        
                        {MarkerDB.countries.map((country, key) => {
                          const Country = country.country 
                          const country_name = __(Country.name)
                          return (
                            <TabPane
                              tab={
                                <Route
                                  href={`/${this.props.user.language}/${Country.search}`}
                                >
                                  <div className="country-tab" dir={[__("dir")]}>
                                    <span>
                                    {country_name}
                                    </span>
                                    <Flag
                                      name={Country.iso}
                                      format="png"
                                      pngSize={24}
                                      basePath=""
                                      style={{ borderRadius: "10px" }}
                                      className="flag-popover"
                                    />
                                  </div>
                                </Route>
                              }
                              key={Country.iso}
                            >
                              <Row>
                                <Col
                                  dir={__("dir")}
                                  span={24}
                                  className="bshadow header"
                                >
                                    <DefaultStatistics/>
                                </Col>
                                <Col
                                  className="bshadow"
                                  style={{ background: "rgba(0,0,0,0)" }}
                                  xs={24}
                                  sm={24}
                                  md={24}
                                  lg={16}
                                  xl={16}
                                  xxl={16}
                                >
                                  <Row>
                                    <Col span={24} className="bshadow">
                                   
                                   <LineChart/>
                                    </Col>

                                    <Col
                                      span={24}
                                      style={{ marginTop: 10 }}
                                      className="bshadow"
                                    >
                                               
                                            <PercentChart/>                            
                                    </Col>
                                  </Row>
                                </Col>

                                <Col
                                  style={{ marginTop: 10 }}
                                  xs={24}
                                  sm={24}
                                  md={24}
                                  lg={8}
                                  xl={8}
                                  xxl={8}
                                >
                                  <Row>
                                    <Col span={24} className="bshadow">
                                                      <DaysCollapseChart/>
                                    </Col>

                                    <Col
                                      span={24}
                                      style={{ marginTop: 10 }}
                                      className="bshadow"
                                    >
                                    
                                   <LiquidChart/>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </TabPane>
                          );
                        })}
                      </Tabs>
                    </Switch>
                  );
                }}
              ></Route>
            </Switch>
          </Col>
        </Row>
      </Router>
    );
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Layout));
