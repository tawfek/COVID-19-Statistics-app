import React from "react";
import * as MarkerDB from "./countries.json";
import { Helmet } from "react-helmet";
import {Row,Col,Tabs,Button,Skeleton,Dropdown,Typography,} from "antd";
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
import {
  LoadingOutlined,
  AreaChartOutlined,
  PercentageOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import Cookies from "universal-cookie";
import i18n from "./localization/i18n";
import Lang2set from "./lang2set";
import { SettingFilled } from "@ant-design/icons";
import __ from "./localization/tr";
import Flag from "react-flags";
import { connect } from "react-redux";
import { setCountry,GetDays} from "./components/helpers"
import { setDarkMode,setCountryStatistics,setPageTitle,setPageDescription, setCurrentCountryData,setLanguage } from "./store/actions";
import PercentChart from "./components/charts/percentChart";
import DaysCollapseChart from "./components/charts/daysCollapseChart";  
import LiquidChart from "./components/charts/liquidChart";
const { TabPane } = Tabs;
const { Title } = Typography;


function mapStateToProps(state) {
  return { user: state.user,country:state.country,page:state.page };
}
function mapDispatchToProps(dispatch) {
  return {
    setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
    setLanguage: (language) => dispatch(setLanguage(language)),
    setPageTitle:(title) => dispatch(setPageTitle(title)),
    setPageDescription:(description)=> dispatch(setPageDescription(description)),
    setCurrentCountryData:(data) => dispatch(setCurrentCountryData(data)),
    setCountryStatistics:(statistics) => dispatch(setCountryStatistics(statistics))
  };
}
const API_LINK = "https://middlecovid.herokuapp.com/cov.php?";
const cookies = new Cookies();
class StatusComponent extends React.Component {

 

  state = {
    activekey: "Bahrain",
    Data: [],
    Alldates: [],
    fullMiddleEast: [],
    match: "",
    darkThemeChecked: false,
    pageTitle: __(this.props.page.title) ,
    pageDesc: __(this.props.page.description),
  };


  AllCountries = [];
  
  GetStatus = (Date) => {
    let countries = []
    MarkerDB.countries.map((country) =>{
      countries.push({
        name:country.country.search, 
        data : []
      })
      return true;
    } )
    Date.map((Date) => {
      fetch(API_LINK + "d=" + Date)
        .then((res) => res.json())
        .then((result) => {
          result.map((country) => {
            let response = country.response[0]; 
            let {day,cases,deaths,tests} = response
           countries.map((country,key) => {
            if(response.country == country.name ){
           
              countries[key].data.push({
               day, cases,deaths,tests
              })
            }  
            return true;
          })
          this.props.setCountryStatistics(countries)


            return true;
          });


          // const state_data = this.state.Data;
          // if (state_data.length > 0) {

          //   state_data.map((country) => {
          //     const country_name = country.country;
          //     result.map((result_country) => {
          //       if (result_country["parameters"].country === country_name) {
          //         const response =
          //           result_country["response"][
          //             result_country["response"].length - 1
          //           ];
          //         if (response !== undefined) {
  
             
          //           if(this.props.country.currentCountry == country_name) {
          //             this.props.setCurrentCountryData(response);
          //           }
          //         }
          //       }
          //       return true;
          //     });
          //     return true;
          //   });
          // }
        })
        .catch((error) => {
          console.log(error);
        });
      return "";
    });
  };


  
  setActiveKey = (e) => {
  

    MarkerDB.countries.map((country, key) => {
      country = country.country
      if (country.iso.toLowerCase() == e.toLowerCase()) {
        const country_name = __(country.name)
        this.props.setPageTitle(`${country_name} | ${__('header title')} ${country_name} `)   
        this.props.setPageDescription(`${__("header info")} ${country_name} ${__("with charts")}`)
        setCountry(country.iso)
      }
      return true;
    });

  };



 
  componentDidMount() {
    this.GetStatus(GetDays(7, true));
  
    if (this.props.location !== undefined) {
      const locationprops = this.props.location.pathname;
      if (
        locationprops.toLowerCase().indexOf("/ar") !== -1 &&
        locationprops.toLowerCase().indexOf("/en") == -1
      ) {
        this.ChangeSiteLang("ar", false);
      }
      if (
        locationprops.toLowerCase().indexOf("/en") !== -1 &&
        locationprops.toLowerCase().indexOf("/ar") == -1
      ) {
        this.ChangeSiteLang("en", false);
      }
      var current_country_is = this.props.country.currentKey;

      fetch("https://ipinfo.io/?token=d209fb8c2cf4a2")
        .then((response) => response.json())
        .then((data) => {
          MarkerDB.countries.map((country, key) => {
            country = country.country
            if (
              country.iso.toLowerCase() == data.country.toLowerCase()
            ) {
              current_country_is = country.search;
            }
            if (
              locationprops
                .toLowerCase()
                .indexOf(country.search.toLowerCase()) !== -1
            ) {
              setCountry(country.iso) 
              const country_name_title =
                Lang2set() == "ar"
                  ? country.name_ar
                  : country.name;
              const _title =
                country.iso == "IL"
                  ? "header title noncountry"
                  : "header title";
              this.setState({
                pageTitle:
                  country_name_title +
                  " | " +
                  __(_title) +
                  " " +
                  country_name_title,
                pageDesc:
                  __("header info") +
                  " " +
                  country_name_title +
                  " " +
                  __("with charts"),
              });
            } else {
            }
            return true;
          });

          if (
            locationprops.toLowerCase().indexOf("/en") == -1 &&
            locationprops.toLowerCase().indexOf("/ar") == -1
          ) {
            this.ChangeSiteLang(Lang2set(), true, true, [], current_country_is);
          }
        }).catch((error)=>console.log(error));
    }
  }
  ChangeSiteLang = (
    lang = "en",
    isMount = true,
    isarray = false,
    history = [],
    country = ""
  ) => {
    if (isarray) {
      if (isMount) {
        if (country !== "") {
          window.location = `/${lang}/${country}`;
        }
      }
    }
    this.props.setLanguage(lang);
    i18n.changeLanguage(lang);
    cookies.set("language", lang);
  };

  Loading = (
    <div key={2} dir={__("dir")}>
      <LoadingOutlined key={0} /> {__("data loading")}{" "}
      <Skeleton key={1} active />
    </div>
  );

  render() {
    if (this.props.user.darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    const children = false;
    if (children) {
      MarkerDB.countries.forEach((country) => {
        country = country.country
        if (country.iso === children) {
        }
      });
    }

    return (
      <Router>
        <Row>
          <Helmet>
            <title>{this.props.page.title}</title>
            <meta name="description" content={this.props.page.description} />
            <meta property="og:title" content={this.props.page.title} />
            <meta property="og:description" content={this.props.page.description} />
            <meta property="twitter:title" content={this.props.page.title} />
            <meta
              property="twitter:description"
              content={this.props.page.title}
            />
          </Helmet>
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
                        onChange={(key) => {
                          this.setActiveKey(key);
                        }}
                        animated={false}
                        defaultActiveKey={match.params.country}
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
                                  href={`/${this.props.user.language}/${country.search}`}
                                >
                                  <div>
                                    {country_name}
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
                                  <div className="header-info">
                                    <Title>
                                      {__("header title")}{" "}
                                      {country_name}
                                      <img
                                        className="flag-popover"
                                        alt={country_name}
                                        src={`../flags-iso/flat/24/${Country.iso}.png`}
                                      />{" "}
                                    </Title>
                                    <p>{this.props.page.description}</p>
                                    <DefaultStatistics/>
                                  </div>
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
                                      <span
                                        style={{ textAlign: __("text-align") }}
                                      >
                                        <Title level={2}>
                                          {" "}
                                          <AreaChartOutlined />{" "}
                                          {__("chart-title")}
                                        </Title>
                                        <p>{__("chart-info")}</p>
                                      </span>
                                   <LineChart/>
                                    </Col>

                                    <Col
                                      span={24}
                                      style={{ marginTop: 10 }}
                                      className="bshadow"
                                    >
                            
                                      <span
                                        style={{ textAlign: __("text-align") }}
                                      >
                                        <Title level={2}>
                                          <PercentageOutlined />{" "}
                                          {__("percent-title")}
                                        </Title>
                                        <p>{__("percent-info")}</p>
                                      </span>                 
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
                                      <span
                                        style={{ textAlign: __("text-align") }}
                                      >
                                        <Title level={2}>
                                          {" "}
                                          <TrophyOutlined /> {__("cure")}
                                        </Title>
                                        <p>{__("cure desc")}</p>
                                      </span>
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

const Status = connect(mapStateToProps,mapDispatchToProps)(StatusComponent);
export default withRouter(Status);
