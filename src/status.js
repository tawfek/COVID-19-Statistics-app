import React from "react";
import * as MarkerDB from "./countries.json";
import { Helmet } from "react-helmet";
import {Row,Col,Tabs,Button,Skeleton,Dropdown,Menu,Collapse,Badge,Statistic,Result,Typography,} from "antd";
import moment from "moment";
import SettingsMenu from "./components/settingMenu"
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import {
  TeamOutlined,
  LoadingOutlined,
  AreaChartOutlined,
  HistoryOutlined,
  PercentageOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Cookies from "universal-cookie";
import i18n from "./localization/i18n";
import { Liquid } from "@antv/g2plot";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ar from "javascript-time-ago/locale/ar";
import ReactG2Plot from "react-g2plot";
import Chart from "react-apexcharts";
import Lang2set from "./lang2set";
import { SettingFilled } from "@ant-design/icons";
import __ from "./localization/tr";
import Flag from "react-flags";
import { connect } from "react-redux";
import { setDarkMode,setCurrentCountry,setPageTitle,setPageDescription, setLanguage } from "./store/actions";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Title } = Typography;

TimeAgo.addLocale(en);
TimeAgo.addLocale(ar);

function mapStateToProps(state) {
  return { user: state.user,country:state.country,page:state.page };
}
function mapDispatchToProps(dispatch) {
  return {
    setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
    setLanguage: (language) => dispatch(setLanguage(language)),
    setCurrentCountry: (country) => dispatch(setCurrentCountry(country)),
    setPageTitle:(title) => dispatch(setPageTitle(title)),
    setPageDescription:(description)=> dispatch(setPageDescription(description)),

  };
}
const API_LINK = "https://middlecovid.herokuapp.com/cov.php?";
const cookies = new Cookies();
class StatusComponent extends React.Component {
  componentDidUpdate() {
    console.log(this.props);
  }
  constructor(props) {
    super(props);
    this.ChangeSiteTheme = this.ChangeSiteTheme.bind(this);
  }

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
  GetDayFromDate = (date) => {
    return /[^-]*$/.exec(date)[0];
  };
  GetYesterday = (justday = false) => {
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var month = today.getMonth() + 1;
    var yesterdayzero =
      yesterday.getDate() < 10
        ? "0" + yesterday.getDate()
        : yesterday.getDate();
    month = month < 10 ? "0" + month : month;
    yesterday = yesterday.getFullYear() + "-" + month + "-" + yesterdayzero;
    if (!justday) {
      return yesterday;
    } else {
      return yesterdayzero;
    }
  };
  GetToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };
  GetDays = (d, Mention_today = false) => {
    var DateArray = [];
    var days = d;
    for (var i = 0; i < days; i++) {
      if (!Mention_today && i === 0) {
        i = 1;
        days += 1;
      }
      var date = new Date();
      var last = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
      var day = "" + last.getDate();
      var month = "" + (last.getMonth() + 1);
      var year = last.getFullYear();
      if (month.length < 2) {
        month = "0" + month;
      }
      if (day.length < 2) {
        day = "0" + day;
      }
      const fulld = Number(year) + "-" + month + "-" + day;
      DateArray.push(fulld);
    }
    return DateArray;
  };
  AllCountries = [];
  GetStatus = (Date) => {
    MarkerDB.countries.map((country) => {
      this.AllCountries.push({
        country: country.country.search,
        data: [],
        dates: [],
      });
      this.setState({
        Data: this.AllCountries,
      });
      return true;
    });

    Date.map((Date) => {
      const tempmData = this.state.fullMiddleEast;
      fetch(API_LINK + "d=" + Date)
        .then((res) => res.json())
        .then((result) => {
          const state_data = this.state.Data;
          if (state_data.length > 0) {
            const middleeastdata = { date: Date, data: result };
            tempmData.push(middleeastdata);
            this.setState({ fullMiddleEast: tempmData });
            state_data.map((country) => {
              const country_name = country.country;
              const country_data = country.data;
              const country_dates = this.state.Alldates;
              result.map((result_country) => {
                if (result_country["parameters"].country === country_name) {
                  const response =
                    result_country["response"][
                      result_country["response"].length - 1
                    ];
                  if (response !== undefined) {
                    const dead = response.deaths.total;
                    const cases = response.cases.total;
                    const critical = response.cases.critical;
                    const recovered = response.recovered;
                    const all_response = {
                      day: Date,
                      country: country_name,
                      deaths: dead,
                      cases: cases,
                      critical: critical,
                      recovered: recovered,
                    };
                    country_data.push(response);
                    country_dates.push(all_response);
                  }
                }
                return true;
              });
              return true;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      return "";
    });
  };

  ReactTimeago = (datee) => {
    const timeAgo = new TimeAgo(Lang2set());

    return timeAgo.format(datee);
  };

  setActiveKey = (e, history, isarray = false) => {
    this.setState({ activekey: e });
    this.props.setCurrentCountry({ currentKey: e, currentCountry: e });
    MarkerDB.countries.map((country, key) => {
      if (country.country.search.toLowerCase() === e.toLowerCase()) {
        const country_name = __(country.country.name)
        this.props.setPageTitle(`${country_name} | ${__('header title')} ${country_name} `)   
        this.props.setPageDescription(`${__("header info")} ${country_name} ${__("with charts")}`)
      }
      return true;
    });
    // if (isarray) {
    //   history.replace(`/${this.props.user.language}/${e}`);
    // }
  };

  ChangeSiteTheme = () => {
    this.props.setDarkMode(!this.props.user.darkMode);
    this.props.MapStyleChanger(!this.props.user.darkMode);
  };

  ChangeMapTheme = (time = 0) => {
    setTimeout(() => {
      this.props.MapStyleChanger(this.props.user.darkMode);
    }, time);
  };
  componentDidMount() {
    this.GetStatus(this.GetDays(7, true));
    this.ChangeMapTheme(3000);

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
            if (
              country.country.iso.toLowerCase() == data.country.toLowerCase()
            ) {
              current_country_is = country.country.search;
            }
            if (
              locationprops
                .toLowerCase()
                .indexOf(country.country.search.toLowerCase()) !== -1
            ) {
              this.props.setCurrentCountry({ currentKey:country.country.search,currentCountry:country.country.search})

              const country_name_title =
                Lang2set() == "ar"
                  ? country.country.name_ar
                  : country.country.name;
              const _title =
                country.country.iso == "IL"
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
        });
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
          //history.replace(`${lang}/${this.state.activekey}`)
          window.location = `/${lang}/${country}`;
          //window.location.reload();
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
        if (country.country.iso === children) {
          this.setCurrentCountry({ currentCountry:country.country.iso,currentKey:country.country.ison})
        }
      });
    }

    const { Data } = this.state;

    if (this.props.keyChanged === true) {
      setTimeout(() => {
        this.setCurrentCountry({currentKey:this.props.activekey,currentCountry:this.props.activekey})
      }, 100);
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
                          this.setActiveKey(key, history, true);
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
                                  href={`/${this.props.user.language}/${country.country.search}`}
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
                              key={Country.search}
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
                                        src={`/flags-iso/flat/24/${Country.ison}.png`}
                                      />{" "}
                                    </Title>
                                    <p>{this.props.page.description}</p>
                                    {Data.map((state_country, key) => {
                                      var current_dates = [];
                                      var today_avail = 1;
                                      if (
                                        state_country.country ==
                                        country.country.search
                                      ) {
                                        state_country.data.map(
                                          (country, key) => {
                                            if (
                                              country.day == this.GetToday()
                                            ) {
                                              current_dates.push(country);
                                            } else {
                                              if (current_dates.length < 1) {
                                                if (
                                                  this.GetDayFromDate(
                                                    country.day
                                                  ) == this.GetYesterday(true)
                                                ) {
                                                  current_dates.push(country);
                                                } else {
                                                  if (
                                                    state_country.data.length -
                                                      1 ==
                                                    key
                                                  ) {
                                                    today_avail = 0;
                                                  }
                                                }
                                              }
                                            }
                                            return true;
                                          }
                                        );
                                        if (today_avail === 1) {
                                          if (current_dates.length > 0) {
                                            const Render_status =
                                              current_dates[0];
                                         
                                            const final_seriess = [
                                              Render_status.deaths.total,
                                              Render_status.cases.recovered,
                                              Render_status.cases.active,
                                            ];
                                            return (
                                           "######default######s"
                                            );
                                          } else {
                                            return this.Loading;
                                          }
                                        } else {
                                          return (
                                            <Result
                                              key={key}
                                              status="404"
                                              title="404"
                                              subTitle="Sorry, I could not found Data for this day"
                                            />
                                          );
                                        }
                                      }
                                      return true;
                                    })}
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
                                      {Data.map((state_country, key) => {
                                        var current_dates = [];
                                        var just_dates = [];
                                        var cases = [];
                                        var recovered = [];
                                        var deaths = [];
                                        const options = {
                                          chart: {
                                            id: "basic-bar",
                                          },
                                          xaxis: {
                                            categories: just_dates,
                                            type: "datetime",
                                            tickAmount: 6,
                                            labels: {
                                              formatter: function (
                                                val,
                                                timestamp
                                              ) {
                                                return moment(
                                                  new Date(timestamp)
                                                ).format("DD-MM-YYYY");
                                              },
                                            },
                                          },
                                          colors: [
                                            "#FF3B3B",
                                            "#05C270",
                                            "#0063F8",
                                          ],
                                          dataLabels: {
                                            enabled: false,
                                          },
                                          zoom: {
                                            autoScaleYaxis: true,
                                          },
                                          fill: {
                                            type: "gradient",
                                            gradient: {
                                              shadeIntensity: 0.1,
                                              opacityFrom: 0.7,
                                              opacityTo: 0.9,
                                              stops: [0, 100],
                                            },
                                          },
                                        };
                                        const series = [
                                          {
                                            name: __("Deaths"),
                                            data: deaths,
                                          },
                                          {
                                            name: __("Recovred"),
                                            data: recovered,
                                          },

                                          {
                                            name: __("active cases"),
                                            data: cases,
                                          },
                                        ];
                                        if (
                                          state_country.country ===
                                          country.country.search
                                        ) {
                                          state_country.data.map(
                                            (country, key) => {
                                              const data_by_day = {
                                                day: country.day,
                                                data_count:
                                                  country.cases.active,
                                                recovered:
                                                  country.cases.recovered,
                                                deaths: country.deaths.total,
                                              };
                                              current_dates.sort(function (
                                                a,
                                                b
                                              ) {
                                                var c = new Date(a.day);
                                                var d = new Date(b.day);
                                                return c - d;
                                              });
                                              current_dates.push(data_by_day);
                                              just_dates.push(country.day);
                                              just_dates.sort(function (a, b) {
                                                var c = new Date(a);
                                                var d = new Date(b);
                                                return c - d;
                                              });
                                              return true;
                                            }
                                          );
                                          current_dates.map((c, key) => {
                                            current_dates.sort(function (a, b) {
                                              var c = new Date(a.day);
                                              var d = new Date(b.day);
                                              return c - d;
                                            });
                                            cases.push(c.data_count);
                                            recovered.push(c.recovered);
                                            deaths.push(c.deaths);
                                            return true;
                                          });

                                          if (cases.length > 0) {
                                            return (
                                              <Chart
                                                key={key}
                                                options={options}
                                                series={series}
                                                type="area"
                                                height={300}
                                              />
                                            );
                                          } else {
                                            return this.Loading;
                                          }
                                        }
                                        return true;
                                      })}
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
                                      {Data.map((state_country, key) => {
                                        var current_dates = [];
                                        var just_dates = [];
                                        var cases = [];
                                        var recovered = [];
                                        var deaths = [];
                                        const optionsbar = {
                                          chart: {
                                            type: "bar",
                                            id: "basic-bar",
                                            height: 350,
                                            stacked: true,
                                            stackType: "100%",
                                          },
                                          plotOptions: {
                                            bar: {
                                              horizontal: true,
                                            },
                                          },
                                          stroke: {
                                            show: true,
                                            width: 1,
                                            colors: ["transparent"],
                                          },
                                          fill: {
                                            opacity: 1,
                                          },
                                          xaxis: {
                                            categories: just_dates,
                                          },
                                          colors: [
                                            "#FF3B3B",
                                            "#05C270",
                                            "#0063F8",
                                          ],
                                        };
                                        const seriesbar = [
                                          {
                                            name: __("Deaths"),
                                            data: deaths,
                                          },
                                          {
                                            name: __("Recovred"),
                                            data: recovered,
                                          },

                                          {
                                            name: __("active cases"),
                                            data: cases,
                                          },
                                        ];
                                        if (
                                          state_country.country ===
                                          country.country.search
                                        ) {
                                          state_country.data.map(
                                            (country, key) => {
                                              const data_by_day = {
                                                day: country.day,
                                                data_count:
                                                  country.cases.active,
                                                recovered:
                                                  country.cases.recovered,
                                                deaths: country.deaths.total,
                                              };
                                              current_dates.sort(function (
                                                a,
                                                b
                                              ) {
                                                var c = new Date(a.day);
                                                var d = new Date(b.day);
                                                return c - d;
                                              });
                                              current_dates.push(data_by_day);
                                              just_dates.push(country.day);
                                              just_dates.sort(function (a, b) {
                                                var c = new Date(a);
                                                var d = new Date(b);
                                                return c - d;
                                              });
                                              return true;
                                            }
                                          );
                                          current_dates.map((c, key) => {
                                            current_dates.sort(function (a, b) {
                                              var c = new Date(a.day);
                                              var d = new Date(b.day);
                                              return c - d;
                                            });
                                            cases.push(c.data_count);
                                            recovered.push(c.recovered);
                                            deaths.push(c.deaths);
                                            return true;
                                          });

                                          if (cases.length > 0) {
                                            return (
                                              <Chart
                                                key={key}
                                                options={optionsbar}
                                                series={seriesbar}
                                                type="bar"
                                                height={300}
                                              />
                                            );
                                          } else {
                                            return this.Loading;
                                          }
                                        }

                                        return true;
                                      })}
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
                                      <span
                                        style={{ textAlign: __("text-align") }}
                                      >
                                        <Title level={2}>
                                          <HistoryOutlined />{" "}
                                          {__("history-title")}
                                        </Title>
                                        <p>{__("history-info")}</p>
                                      </span>
                                      <Collapse
                                        accordion
                                        bordered={false}
                                        className="collapse-custom-collapse"
                                      >
                                        {Data.map((state_country, key) => {
                                          var Panel_result = [];
                                          if (
                                            state_country.country ===
                                            country.country.search
                                          ) {
                                            state_country.data.sort(function (
                                              a,
                                              b
                                            ) {
                                              var c = new Date(a.day);
                                              var d = new Date(b.day);
                                              return d - c;
                                            });

                                            state_country.data.map(
                                              (date, key) => {
                                                if (date !== undefined) {
                                                  var Render_status = date;
                                                  const optionsddd = {
                                                    chart: {
                                                      type: "donut",
                                                      width: "100%",
                                                    },
                                                    title: {
                                                      text: Render_status.day,
                                                    },
                                                    legend: {
                                                      show: false,
                                                    },
                                                    labels: [
                                                      __("Deaths"),
                                                      __("Recovred"),
                                                      __("active cases"),
                                                    ],
                                                    // xaxis: {
                                                    //   categories:  just_dates
                                                    // },
                                                    colors: [
                                                      "#FF3B3B",
                                                      "#05C270",
                                                      "#0063F8",
                                                    ],
                                                    dataLabels: {
                                                      enabled: false,
                                                    },
                                                  };
                                                  const final_seriess = [
                                                    Render_status.deaths.total,
                                                    Render_status.cases
                                                      .recovered,
                                                    Render_status.cases.active,
                                                  ];
                                                  const StatusPopover = (
                                                    <Row>
                                                      <Col
                                                        xs={12}
                                                        sm={24}
                                                        md={24}
                                                        lg={12}
                                                        xl={12}
                                                        xxl={12}
                                                      >
                                                        <Statistic
                                                          title={__(
                                                            "Total Cases"
                                                          )}
                                                          value={
                                                            Render_status.cases
                                                              .total
                                                          }
                                                          prefix={
                                                            <TeamOutlined />
                                                          }
                                                          suffix={
                                                            <Badge
                                                              dir="ltr"
                                                              count={
                                                                Render_status
                                                                  .cases.new ===
                                                                null
                                                                  ? 0
                                                                  : Render_status
                                                                      .cases.new
                                                              }
                                                            ></Badge>
                                                          }
                                                        />
                                                      </Col>

                                                      <Col
                                                        xs={12}
                                                        sm={24}
                                                        md={24}
                                                        lg={12}
                                                        xl={12}
                                                        xxl={12}
                                                      >
                                                        <Statistic
                                                          title={__(
                                                            "active cases"
                                                          )}
                                                          value={
                                                            Render_status.cases
                                                              .active
                                                          }
                                                          prefix={
                                                            <svg
                                                              t="1587045672517"
                                                              className="icon"
                                                              viewBox="0 0 1024 1024"
                                                              version="1.1"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              p-id="3309"
                                                              width="24"
                                                              height="24"
                                                            >
                                                              <path
                                                                d="M1024 293.2c0-74.88-27.04-110.96-49.76-128a86.08 86.08 0 0 0-74.64-15.36c-48 13.68-78.16 72-90.72 101.68-2.16-0.8-4.24-1.52-6.48-2.16-26.4-7.52-55.52-18.88-86.4-30.88-64-24.96-136.88-53.2-204.24-53.2-74.4 0-160.64 33.92-229.92 61.12-22.48 8.88-43.76 17.28-61.52 23.2-1.68 0.56-3.44 1.36-5.12 2.08-12.56-29.52-42.88-88-90.8-101.84a86 86 0 0 0-74.64 15.36C27.04 182.24 0 218.32 0 293.2 0 408.48 142.08 632 148.16 641.76c20.24 59.76 42 111.04 53.6 122.88 65.12 66.08 215.44 112 309.68 112s245.12-46.08 309.68-112c11.6-11.84 34.32-64.4 55.28-124.56 13.68-20.8 147.6-234.96 147.6-346.88z m-115.6-112.64a53.76 53.76 0 0 1 46.56 10.08c24 18 37.04 54.4 37.04 102.56 0 56-39.52 144.56-77.04 216a308.48 308.48 0 0 0 8-55.44c1.36-62.56-35.76-147.52-86.24-186.4 11.28-28.08 37.6-77.04 71.68-86.8zM32 293.2c0-48 13.12-84.56 37.04-102.56a53.68 53.68 0 0 1 46.56-10.08c34 9.68 60.24 58.88 72 87.04-47.52 36.08-85.2 109.92-85.2 176a367.28 367.28 0 0 0 10.32 72C73.84 443.04 32 350.8 32 293.2z m766.56 449.44C747.04 795.36 608 845.2 512 845.2c-97.2 0-233.92-48.96-286.88-102.64-16-16.88-90.88-224-90.88-298.96 0-66.4 48-147.52 96.48-163.76 18.48-6.16 40-14.64 63.12-24C360 229.84 443.44 197.2 512 197.2c61.36 0 128 25.92 192.64 51.04 32 12.24 61.36 24 89.28 32a65.92 65.92 0 0 1 14.88 6.72 18.08 18.08 0 0 0 2.08 1.28c42.24 26.88 81.76 104.4 80 165.04-1.44 72.88-76.96 273.28-92.32 289.36z"
                                                                p-id="3310"
                                                                fill="#2c2c2c"
                                                              ></path>
                                                              <path
                                                                d="M685.12 578.4c-1.2 0-120 21.76-173.12 21.76s-171.92-21.52-173.12-21.76a16 16 0 0 0-5.76 31.52C338.16 610.8 456 632 512 632s173.84-21.36 178.88-22.24a16 16 0 0 0-5.76-31.52zM685.12 474.4c-1.2 0-120 21.76-173.12 21.76s-171.92-21.52-173.12-21.76a16 16 0 1 0-5.76 31.52C338.16 506.8 456 528 512 528s173.84-21.36 178.88-22.24a16 16 0 0 0-5.76-31.52zM685.12 370.4c-1.2 0-120 21.76-173.12 21.76s-171.92-21.52-173.12-21.76a16 16 0 1 0-5.76 31.52C338.16 402.8 456 424 512 424s173.84-21.36 178.88-22.24a16 16 0 0 0-5.76-31.52z"
                                                                p-id="3311"
                                                                fill="#2c2c2c"
                                                              ></path>
                                                            </svg>
                                                          }
                                                        />
                                                      </Col>
                                                      <Col
                                                        xs={12}
                                                        sm={24}
                                                        md={24}
                                                        lg={12}
                                                        xl={12}
                                                        xxl={12}
                                                      >
                                                        <Statistic
                                                          title={__(
                                                            "Recovered Cases"
                                                          )}
                                                          valueStyle={{
                                                            color: "#3f8600",
                                                          }}
                                                          value={
                                                            Render_status.cases
                                                              .recovered
                                                          }
                                                          prefix={
                                                            <svg
                                                              t="1587039986744"
                                                              className="icon"
                                                              viewBox="0 0 1024 1024"
                                                              version="1.1"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              p-id="2923"
                                                              width="24"
                                                              height="24"
                                                            >
                                                              <path
                                                                d="M864 919.984v-32h-68.528a47.872 47.872 0 0 0-2.176-3.472l41.856-8.864-6.624-31.312-67.808 14.352a182.368 182.368 0 0 0-21.376-8.992l13.232-8.4-17.152-27.008-38.224 24.272c-13.248-2.48-27.36-4.32-42.128-5.392l0.928-0.224-64-192-160-32v-144.96h112l112-112-32-32v-119.264L784 128 624 55.264v-7.28h-32v272l-80 80h-159.728a79.936 79.936 0 0 0 33.664-7.504A63.792 63.792 0 0 1 352 336h32c0 17.6 14.4 32 32 32 10.08-13.28 16-29.92 16-48 0-44.16-35.84-80-80-80s-80 35.84-80 80a80.016 80.016 0 0 0 79.856 79.984H240l-85.296 98.208a63.952 63.952 0 0 0-10.16 67.952L192 672.944l64-32-48-96 64-64v176l-16 319.04h80l32-287.04 176 32 42.288 112.752a370.56 370.56 0 0 0-35.472 4.88l-38.24-24.272-17.152 27.008 13.216 8.4c-7.728 2.752-14.912 5.744-21.36 8.992l-67.808-14.352-6.624 31.312 41.856 8.864a42.896 42.896 0 0 0-2.176 3.472H384v32h68.512c0.656 1.184 1.408 2.336 2.192 3.488l-41.856 8.848 6.624 31.312 67.824-14.336c6.448 3.248 13.632 6.24 21.344 8.976l-13.232 8.384 17.152 27.024 38.272-24.288a388.32 388.32 0 0 0 57.168 6.24V992h32v-16.336a390.256 390.256 0 0 0 57.152-6.24l38.272 24.288 17.152-27.024-13.216-8.384a185.76 185.76 0 0 0 21.344-8.992l67.824 14.352 6.624-31.312-41.856-8.848c0.784-1.152 1.536-2.32 2.192-3.488H864z"
                                                                fill="#3f8600"
                                                                p-id="2924"
                                                              ></path>
                                                            </svg>
                                                          }
                                                        />
                                                      </Col>
                                                      <Col
                                                        xs={12}
                                                        sm={24}
                                                        md={24}
                                                        lg={12}
                                                        xl={12}
                                                        xxl={12}
                                                      >
                                                        <Statistic
                                                          title={__("Tests")}
                                                          valueStyle={{
                                                            color: "#3f8600",
                                                          }}
                                                          value={
                                                            Render_status.tests
                                                              .total == null
                                                              ? 0
                                                              : Render_status
                                                                  .tests.total
                                                          }
                                                          prefix={
                                                            <svg
                                                              t="1587041970574"
                                                              className="icon"
                                                              viewBox="0 0 1024 1024"
                                                              version="1.1"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              p-id="5447"
                                                              width="24"
                                                              height="24"
                                                            >
                                                              <path
                                                                d="M488.107 785.536c-31.19-15.488-53.206-31.147-67.115-46.89-13.952-15.745-21.973-32.342-22.656-49.025-1.792-45.354 41.173-74.794 84.267-96.213l-3.072-107.392c-74.582-41.557-112.683-89.941-112.683-155.05 0-59.35 41.515-108.075 105.045-112.769L469.291 128c-0.555-23.552 19.114-42.667 42.709-42.667 23.595 0 43.35 19.158 42.71 42.667l-3.073 106.496c25.046 14.08 35.84 34.603 32.598 52.053-4.907 26.283-39.766 16.982-81.878 9.686-50.346-8.79-71.85 13.354-71.765 40.618 0.085 25.472 15.915 54.187 45.27 74.667l1.578 1.11-2.39-83.84c8.022-0.726 18.475 0.554 21.462 1.066 15.616 2.688 34.133 6.997 52.181 8.021l-6.528 228.31c7.894-3.798 14.422-7.339 18.859-10.752 13.867-9.259 16.81-30.166 18.688-84.182 11.179 7.467 21.59 15.659 30.592 25.216 25.344 26.838 31.275 74.752-8.875 106.71-30.378 24.149-149.845 56.533-149.12 87.424 0.171 5.802 1.622 8.277 6.912 14.25 6.102 6.912 15.104 14.123 27.179 21.632l-0.768-27.776 10.283-6.826c13.397-7.723 33.237-16.384 43.264-20.736l-5.803 228.096c14.421-9.814 52.65-45.952 35.37-64.982l1.878-61.226c31.659 22.656 46.421 46.421 44.8 71.168-1.493 22.784-20.523 67.498-89.173 90.965-4.267 1.45-9.643 3.499-14.251 3.499a21.504 21.504 0 0 1-21.333-21.334l-2.56-131.797zM375.38 0v227.797a138.667 138.667 0 0 0-24.661 33.494L136.619 137.77 0 374.229 238.763 512 0 649.77l136.619 236.46L375.38 748.5V1024H648.62V748.501L887.38 886.23 1024 649.771 785.237 512 1024 374.23 887.381 137.77 648.62 275.542V0H375.38z"
                                                                p-id="5448"
                                                                fill="#3f8600"
                                                              ></path>
                                                            </svg>
                                                          }
                                                        />
                                                      </Col>
                                                      <Col
                                                        xs={12}
                                                        sm={24}
                                                        md={24}
                                                        lg={12}
                                                        xl={12}
                                                        xxl={12}
                                                      >
                                                        <Statistic
                                                          title={__(
                                                            "Critical Cases"
                                                          )}
                                                          valueStyle={{
                                                            color: "#cf1322",
                                                          }}
                                                          value={
                                                            Render_status.cases
                                                              .critical
                                                          }
                                                          prefix={
                                                            <svg
                                                              t="1587039814343"
                                                              className="icon"
                                                              viewBox="0 0 1024 1024"
                                                              version="1.1"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              p-id="1673"
                                                              width="24"
                                                              height="24"
                                                            >
                                                              <path
                                                                d="M306.72 466.72a64 64 0 1 0 90.56 0 64 64 0 0 0-90.56 0z m67.92 67.92a32 32 0 1 1 0-45.28 32 32 0 0 1 0 45.28zM466.72 306.72a64 64 0 1 0 90.56 0 64 64 0 0 0-90.56 0z m67.92 67.92a32 32 0 1 1 0-45.28 32 32 0 0 1 0 45.28zM626.72 466.72a64 64 0 1 0 90.56 0 64 64 0 0 0-90.56 0z m67.92 67.92a32 32 0 1 1 0-45.28 32 32 0 0 1 0 45.28zM466.72 626.72a64 64 0 1 0 90.56 0 64 64 0 0 0-90.56 0z m67.92 67.92a32 32 0 1 1 0-45.28 32 32 0 0 1 0 45.28z"
                                                                p-id="1674"
                                                                fill="#cf1322"
                                                              ></path>
                                                              <path
                                                                d="M1008 432a16 16 0 0 0-16 16v48h-74.08a150.96 150.96 0 0 0-24-47.12 130.16 130.16 0 0 1-18.56-34.24 133.84 133.84 0 0 1-1.2-40.56c1.44-22.64 2.96-46-8.72-66.16s-32.96-30.8-53.44-40.88c-7.52-3.76-14.72-7.36-21.12-11.28l72-72 33.92 33.92a16 16 0 0 0 11.36 4.72 16 16 0 0 0 11.28-27.36l-45.2-45.2-45.2-45.2a16 16 0 0 0-22.64 22.64l33.6 34-72 72c-3.92-6.4-7.52-13.6-11.2-21.04-10.16-20.56-20.56-41.76-40.96-53.52s-43.52-10.16-66.16-8.72a134 134 0 0 1-40.56-1.2 130.16 130.16 0 0 1-34.24-18.56 150.96 150.96 0 0 0-47.12-24V32h48a16 16 0 0 0 0-32H448a16 16 0 0 0 0 32h48v74.08a150.96 150.96 0 0 0-47.12 24 130.16 130.16 0 0 1-34.24 18.56 133.84 133.84 0 0 1-40.56 1.2c-22.64-1.44-46-2.96-66.16 8.72s-30.8 33.44-40.88 53.52c-3.76 7.52-7.36 14.72-11.28 21.12l-72-72 33.92-33.92a16 16 0 0 0-22.64-22.64l-45.2 45.2-45.12 45.36a16 16 0 1 0 22.64 22.64L161.28 184l72 72c-6.4 3.92-13.6 7.52-21.04 11.2-20.56 10.16-41.76 20.56-53.52 40.96s-10.16 43.52-8.72 66.16a133.92 133.92 0 0 1-1.2 40.56 130.16 130.16 0 0 1-18.56 34.24 150.96 150.96 0 0 0-24 47.12H32V448a16 16 0 0 0-32 0v128a16 16 0 0 0 32 0v-48h74.08a150.96 150.96 0 0 0 24 47.12 130.16 130.16 0 0 1 18.56 34.24 133.84 133.84 0 0 1 1.2 40.56c-1.44 22.64-2.96 46 8.72 66.16s32.96 30.8 53.44 40.96c7.52 3.68 14.72 7.28 21.12 11.2l-72 72-33.92-33.92a16 16 0 0 0-22.64 22.64l45.2 45.2 45.2 45.2a16 16 0 1 0 22.64-22.64l-33.6-34 72-72c3.92 6.4 7.52 13.6 11.2 21.04 10.16 20.56 20.56 41.76 40.96 53.52s43.52 10.16 66.16 8.72a133.84 133.84 0 0 1 40.56 1.2 130.16 130.16 0 0 1 34.24 18.56 150.96 150.96 0 0 0 47.12 24V992H448a16 16 0 0 0 0 32h128a16 16 0 0 0 0-32h-48v-74.08a150.96 150.96 0 0 0 47.12-24 130.16 130.16 0 0 1 34.24-18.56 134 134 0 0 1 40.56-1.2c22.64 1.44 46 2.96 66.16-8.72s30.8-32.96 40.96-53.44c3.68-7.52 7.28-14.72 11.2-21.12l72 72-33.92 33.92a16 16 0 1 0 22.64 22.64l45.2-45.2 45.2-45.2a16 16 0 0 0-22.64-22.64l-34 33.6-72-72c6.4-3.92 13.6-7.52 21.04-11.2 20.56-10.16 41.76-20.56 53.52-40.96s10.16-43.52 8.72-66.16a133.92 133.92 0 0 1 1.2-40.56 130.16 130.16 0 0 1 18.56-34.24 150.96 150.96 0 0 0 24-47.12H992v48a16 16 0 0 0 32 0V448a16 16 0 0 0-16-16z m-140.72 125.36a149.68 149.68 0 0 0-22.88 43.76 154.64 154.64 0 0 0-2.24 50.8c1.2 18.72 2.32 36.4-4.48 48s-22.96 19.92-40 28.32a151.52 151.52 0 0 0-42.48 26.96 152.64 152.64 0 0 0-27.2 42.56c-8.4 16.96-16 32.96-28.32 40s-29.36 5.68-48 4.48a154.56 154.56 0 0 0-50.8 2.24 149.68 149.68 0 0 0-43.76 22.88c-16 10.64-30.96 20.72-45.36 20.72s-29.44-10.08-45.36-20.72a149.68 149.68 0 0 0-43.76-22.88 105.36 105.36 0 0 0-27.92-3.2c-8 0-15.36 0.48-22.88 0.96-18.72 1.2-36.4 2.32-48-4.48s-19.92-22.96-28.32-40a151.52 151.52 0 0 0-26.96-42.48A152.64 152.64 0 0 0 226.24 728c-16.96-8.4-32.96-16-40-28.32s-5.68-29.36-4.48-48a154.64 154.64 0 0 0-2.24-50.8 149.68 149.68 0 0 0-22.88-43.76C146.08 541.44 136 526.4 136 512s10.08-29.44 20.72-45.36a149.68 149.68 0 0 0 22.88-43.76 154.64 154.64 0 0 0 2.24-50.8c-1.2-18.72-2.32-36.4 4.48-48s22.96-19.92 40-28.32a151.52 151.52 0 0 0 42.48-26.96 152.64 152.64 0 0 0 27.2-42.56c8-16.96 16-32.96 28.32-40s29.36-5.68 48-4.48a154.56 154.56 0 0 0 50.8-2.24 149.68 149.68 0 0 0 43.76-22.88C482.56 146.08 497.6 136 512 136s29.44 10.08 45.36 20.72a149.68 149.68 0 0 0 43.76 22.88 154.64 154.64 0 0 0 50.8 2.24c18.72-1.2 36.4-2.32 48 4.48s19.92 22.96 28.32 40a151.52 151.52 0 0 0 26.96 42.48 152.64 152.64 0 0 0 42.56 27.2c16.96 8 32.96 16 40 28.32s5.68 29.36 4.48 48a154.64 154.64 0 0 0 2.24 50.8 149.68 149.68 0 0 0 22.88 43.76c10.64 16 20.72 30.96 20.72 45.36s-10.16 29.2-20.8 45.12z"
                                                                p-id="1675"
                                                                fill="#cf1322"
                                                              ></path>
                                                            </svg>
                                                          }
                                                        />
                                                      </Col>
                                                      <Col
                                                        xs={12}
                                                        sm={24}
                                                        md={24}
                                                        lg={12}
                                                        xl={12}
                                                        xxl={12}
                                                      >
                                                        <Statistic
                                                          title={__("Deaths")}
                                                          valueStyle={{
                                                            color: "#cf1322",
                                                          }}
                                                          suffix={
                                                            <Badge
                                                              dir="ltr"
                                                              count={
                                                                Render_status
                                                                  .deaths
                                                                  .new === null
                                                                  ? 0
                                                                  : Render_status
                                                                      .deaths
                                                                      .new
                                                              }
                                                            ></Badge>
                                                          }
                                                          value={
                                                            Render_status.deaths
                                                              .total == null
                                                              ? 0
                                                              : Render_status
                                                                  .deaths.total
                                                          }
                                                          prefix={
                                                            <svg
                                                              t="1587040716200"
                                                              className="icon"
                                                              viewBox="0 0 1024 1024"
                                                              version="1.1"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              p-id="4624"
                                                              width="24"
                                                              height="24"
                                                            >
                                                              <path
                                                                d="M233.003886 252.576914c5.7344-8.133486 8.6016-11.000686 21.065143-11.000685 0-121.943771 69.339429-228.615314 213.752685-228.615315V12.4928c143.945143 0 213.284571 106.642286 213.284572 228.586057 12.931657 0 15.301486 2.896457 21.065143 11.000686 5.7344 8.133486 2.8672 81.802971-33.967543 105.237943-9.069714 4.768914-19.602286 3.335314-21.533257 2.8672-2.8672 5.266286-6.670629 20.0704-13.370515 39.672685a366.884571 366.884571 0 0 0-177.912685 135.343543c-132.944457-9.069714-157.813029-156.379429-167.380115-175.016228a39.555657 39.555657 0 0 1-21.533257-2.8672c-36.337371-22.966857-39.204571-96.607086-33.470171-104.740572z m156.8768 487.306972L288.475429 572.562286c-138.210743 41.5744-221.886171 88.941714-238.650515 112.347428-22.469486 23.464229-26.770286 73.669486-26.770285 73.669486v207.082057c0 8.133486 7.168 41.603657 45.436342 41.603657h431.835429a365.831314 365.831314 0 0 1-110.445714-262.085485v-5.266286z m627.9168 23.932343c0 70.304914-42.071771 115.273143-128.146286 136.777142a11.761371 11.761371 0 0 0-8.630857 11.000686v68.373943c0 3.364571-11.966171 12.434286-33.938286 12.434286-8.133486 0-16.266971-1.4336-23.434971-4.3008a11.234743 11.234743 0 0 0-11.498057 1.930971 84.260571 84.260571 0 0 1-55.939658 15.7696 86.952229 86.952229 0 0 1-55.968914-16.735086 10.8544 10.8544 0 0 0-7.636114-2.8672 6.641371 6.641371 0 0 0-4.3008 0 67.584 67.584 0 0 1-23.434972 4.3008c-22.498743 0-33.967543-9.069714-33.967542-12.434285v-68.4032c0-5.266286-3.335314-10.0352-8.6016-11.000686-84.1728-20.0704-125.805714-63.605029-127.707429-131.978971v-4.798172c0-11.936914 0.965486-24.3712 2.8672-37.302857 0-0.936229 0-2.369829 0.497371-3.335314 1.901714-12.434286 4.768914-25.336686 8.133486-38.268343 0.468114-0.936229 0.468114-2.369829 0.936229-3.335314 3.364571-11.000686 6.729143-22.001371 11.498057-33.470172 0.468114-1.462857 1.4336-2.8672 1.901714-4.3008 3.335314-7.665371 6.699886-15.330743 10.532572-22.498743 1.4336-2.8672 2.8672-5.7344 4.3008-8.133485 4.3008-7.168 8.6016-14.804114 13.370514-21.504 1.462857-1.930971 2.399086-3.832686 3.832686-5.266286a246.345143 246.345143 0 0 1 20.567771-24.868572l5.7344-5.7344c5.7344-6.231771 12.434286-11.4688 18.666057-17.232457 2.399086-1.901714 5.266286-4.3008 7.636114-6.202514 7.665371-5.7344 15.798857-11.000686 24.868572-16.266971 1.462857-0.965486 2.399086-1.901714 3.832686-2.399086 10.0352-5.266286 21.065143-10.0352 32.036571-13.867886 2.8672-0.936229 6.231771-1.901714 9.567086-2.8672 9.069714-2.8672 18.168686-5.266286 27.735771-6.699886 3.832686-0.468114 7.168-1.4336 11.000686-1.901714a286.368914 286.368914 0 0 1 41.135543-3.335314h3.335314c203.746743 2.369829 258.750171 176.9472 259.218286 280.722286z m-298.422857-77.472915c0-37.302857-29.169371-67.437714-65.536-67.437714-36.337371 0-65.506743 30.134857-65.506743 67.437714 0 37.302857 29.169371 67.437714 65.536 67.437715 36.337371 0 65.536-30.134857 65.536-67.437715z m82.7392 180.779886c-0.965486-26.799543-20.567771-48.800914-45.933715-52.6336-25.8048 3.832686-44.938971 26.331429-45.904457 52.6336 0 26.770286 25.834057 26.770286 45.933714 26.770286 19.602286 0 45.904457 0 45.904458-26.770286z m117.642971-180.809143c0-37.2736-29.169371-67.408457-65.536-67.408457-36.337371 0-65.506743 30.134857-65.506743 67.437714 0 37.302857 29.169371 67.437714 65.536 67.437715 36.337371 0 65.536-30.134857 65.536-67.437715z"
                                                                p-id="4625"
                                                                fill="#cf1322"
                                                              ></path>
                                                            </svg>
                                                          }
                                                        />
                                                      </Col>

                                                      <Col
                                                        xs={24}
                                                        sm={24}
                                                        md={24}
                                                        lg={24}
                                                        xl={24}
                                                        xxl={24}
                                                      >
                                                        <Chart
                                                          options={optionsddd}
                                                          series={final_seriess}
                                                          key={key}
                                                          type="donut"
                                                        />
                                                      </Col>
                                                    </Row>
                                                  );
                                                  Panel_result.push(
                                                    <Panel
                                                      className="collapse-custom-panel"
                                                      header={
                                                        <span>
                                                          <ClockCircleOutlined />{" "}
                                                          {date.day}{" "}
                                                          <Badge
                                                            dir="ltr"
                                                            count={
                                                              Render_status
                                                                .cases.new ===
                                                              null
                                                                ? 0
                                                                : Render_status
                                                                    .cases.new
                                                            }
                                                          ></Badge>
                                                        </span>
                                                      }
                                                      key={key}
                                                    >
                                                      {StatusPopover}
                                                    </Panel>
                                                  );
                                                }

                                                return true;
                                              }
                                            );
                                            if (Panel_result.length > 0) {
                                              return Panel_result;
                                            } else {
                                              return this.Loading;
                                            }
                                          }
                                          return true;
                                        })}
                                      </Collapse>
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
                                      {Data.map((state_country, key) => {
                                        var current_dates = [];
                                        var just_dates = [];
                                        var cases = [];
                                        var recovered = [];
                                        var deaths = [];

                                        if (
                                          state_country.country ===
                                          country.country.search
                                        ) {
                                          state_country.data.map(
                                            (country, key) => {
                                              const data_by_day = {
                                                day: country.day,
                                                data_count:
                                                  country.cases.active,
                                                recovered:
                                                  country.cases.recovered,
                                                deaths: country.deaths.total,
                                              };
                                              current_dates.sort(function (
                                                a,
                                                b
                                              ) {
                                                var c = new Date(a.day);
                                                var d = new Date(b.day);
                                                return c - d;
                                              });
                                              current_dates.push(data_by_day);
                                              just_dates.push(country.day);
                                              just_dates.sort(function (a, b) {
                                                var c = new Date(a);
                                                var d = new Date(b);
                                                return c - d;
                                              });
                                              return true;
                                            }
                                          );
                                          current_dates.map((c, key) => {
                                            current_dates.sort(function (a, b) {
                                              var c = new Date(a.day);
                                              var d = new Date(b.day);
                                              return c - d;
                                            });
                                            cases.push(c.data_count);
                                            recovered.push(c.recovered);
                                            deaths.push(c.deaths);
                                            return true;
                                          });
                                          const last_cases =
                                            cases[cases.length - 1];
                                          const last_recov =
                                            recovered[recovered.length - 1];
                                          const rec_precent = last_recov;
                                          var max_liq = 0;
                                          var rec_precent_last = Number(0);
                                          if (last_cases !== undefined) {
                                            max_liq = last_cases + rec_precent;
                                            rec_precent_last = rec_precent;
                                          }
                                          const liquidconfig = {
                                            color: "#05C270",

                                            min: 0,
                                            max: max_liq,
                                            value: rec_precent_last,
                                            statistic: {
                                              formatter: (value) =>
                                                (
                                                  (100 * value) /
                                                  max_liq
                                                ).toFixed(1) + "%",
                                            },
                                          };

                                          if (last_cases !== undefined) {
                                            return (
                                              <ReactG2Plot
                                                key={key}
                                                dir={__("dir")}
                                                className="g2plot-for-react"
                                                Ctor={Liquid}
                                                config={liquidconfig}
                                              />
                                            );
                                          } else {
                                            return this.Loading;
                                          }
                                        }

                                        return true;
                                      })}
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
