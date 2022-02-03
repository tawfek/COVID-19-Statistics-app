import React from "react";
import { connect } from "react-redux";
import { setDarkMode, setLanguage } from "../store/actions";
import { Menu, Switch, Radio } from "antd";
import { Languages } from "../localization/languages";
import i18n from "../localization/i18n"
function mapStateToProps(state) {
  return { user: state.user, country: state.country };
}
function mapDispatchToProps(dispatch) {
  return {
    setLanguage: (language) => dispatch(setLanguage(language)),
    setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
  };
}
const MoonIcon = (
  <svg
    t="1588412650090"
    className="icon icon-checkbox"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2129"
    width="18"
    height="18"
  >
    <path
      d="M566.422 1024c157.924 0 302.158-71.85 397.714-189.584 14.136-17.416-1.278-42.86-23.124-38.7-248.406 47.308-476.524-143.152-476.524-393.908 0-144.444 77.324-277.27 202.996-348.788 19.372-11.024 14.5-40.394-7.512-44.46A516.312 516.312 0 0 0 566.422 0c-282.618 0-512 229.022-512 512 0 282.618 229.022 512 512 512z"
      p-id="2130"
      fill="#fff"
    ></path>
  </svg>
);
const SunIcon = (
  <svg
    t="1588403345964"
    className="icon icon-checkbox"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2539"
    width="018"
    height="018"
  >
    <path
      d="M844.8 134.4c12.8 0 19.2 6.4 32 12.8 6.4 6.4 12.8 19.2 12.8 32s-6.4 19.2-12.8 32l-57.6 57.6c-6.4 6.4-19.2 12.8-32 12.8s-19.2-6.4-32-12.8c-6.4-6.4-12.8-19.2-12.8-32s6.4-19.2 12.8-32l57.6-57.6c6.4-6.4 19.2-12.8 32-12.8z m51.2 332.8h83.2c12.8 0 19.2 6.4 32 12.8 6.4 12.8 12.8 19.2 12.8 32s-6.4 19.2-12.8 32c-6.4 6.4-19.2 12.8-32 12.8H896c-12.8 0-19.2-6.4-32-12.8-6.4-6.4-12.8-19.2-12.8-32s6.4-19.2 12.8-32c12.8-6.4 19.2-12.8 32-12.8zM512 0c12.8 0 19.2 6.4 32 12.8 6.4 6.4 12.8 19.2 12.8 32V128c0 12.8-6.4 19.2-12.8 32-12.8 6.4-19.2 12.8-32 12.8s-19.2-6.4-32-12.8c-6.4-12.8-12.8-19.2-12.8-32V44.8c0-12.8 6.4-19.2 12.8-32 12.8-6.4 19.2-12.8 32-12.8zM179.2 134.4c12.8 0 19.2 6.4 32 12.8l57.6 57.6c6.4 6.4 12.8 19.2 12.8 32s-6.4 19.2-12.8 32-19.2 12.8-25.6 12.8c-12.8 0-19.2-6.4-32-12.8l-64-57.6c-6.4-6.4-6.4-19.2-6.4-32s6.4-19.2 12.8-32c6.4-6.4 12.8-12.8 25.6-12.8z m601.6 608c12.8 0 19.2 6.4 32 12.8l57.6 57.6c6.4 6.4 12.8 19.2 12.8 32s-6.4 19.2-12.8 32c-6.4 6.4-19.2 12.8-32 12.8s-19.2-6.4-32-12.8l-57.6-57.6c-6.4-6.4-12.8-19.2-12.8-32s6.4-19.2 12.8-32c12.8-12.8 25.6-12.8 32-12.8zM512 339.2A174.848 174.848 0 0 0 339.2 512c0 44.8 19.2 89.6 51.2 121.6s70.4 51.2 121.6 51.2A174.848 174.848 0 0 0 684.8 512 174.848 174.848 0 0 0 512 339.2z m-467.2 128H128c12.8 0 19.2 6.4 32 12.8 6.4 12.8 12.8 19.2 12.8 32s-6.4 19.2-12.8 32c-12.8 6.4-19.2 12.8-32 12.8H44.8c-12.8 0-19.2-6.4-32-12.8C6.4 531.2 0 524.8 0 512s6.4-19.2 12.8-32c6.4-6.4 19.2-12.8 32-12.8z m467.2 384c12.8 0 19.2 6.4 32 12.8 6.4 6.4 12.8 19.2 12.8 32v83.2c0 12.8-6.4 19.2-12.8 32-12.8 6.4-19.2 12.8-32 12.8s-19.2-6.4-32-12.8c-6.4-6.4-12.8-19.2-12.8-32V896c0-12.8 6.4-19.2 12.8-32 12.8-6.4 19.2-12.8 32-12.8z m-268.8-108.8c12.8 0 19.2 6.4 32 12.8 6.4 6.4 12.8 19.2 12.8 32s-6.4 19.2-12.8 32l-57.6 57.6c-6.4 6.4-19.2 12.8-32 12.8s-19.2-6.4-32-12.8c-6.4-6.4-12.8-19.2-12.8-32s6.4-19.2 12.8-32l57.6-57.6c6.4-12.8 19.2-12.8 32-12.8zM512 256c44.8 0 89.6 12.8 128 32 38.4 25.6 70.4 51.2 96 96 19.2 38.4 32 83.2 32 128s-12.8 89.6-32 128c-25.6 38.4-51.2 70.4-96 96-38.4 19.2-83.2 32-128 32s-89.6-12.8-128-32c-38.4-25.6-70.4-51.2-96-96-19.2-38.4-32-83.2-32-128s12.8-89.6 32-128c25.6-38.4 57.6-70.4 96-96 38.4-19.2 83.2-32 128-32z"
      p-id="2540"
      fill="#fff"
    ></path>
  </svg>
);
const settings = ({ user, setLanguage, setDarkMode }) => {
  return (
    <Menu>
      <Menu.Item key="0">
        <Radio.Group
          defaultValue={user.language}
          buttonStyle="solid"
          size="large"
        >
          {Languages.map((language) => {
            return (
              <Radio.Button
                key={language.key}
                onClick={() => { setLanguage(language.key) ; i18n.changeLanguage(language.key);}}
                value={language.key}
              >
                {language.name}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="3">
        Dark Mode :{" "}
        <Switch
          onChange={() => setDarkMode(!user.darkMode)}
          defaultChecked={user.darkMode}
          checkedChildren={SunIcon}
          unCheckedChildren={MoonIcon}
        />
      </Menu.Item>
    </Menu>
  );
};

const SettingsMenu = connect(mapStateToProps, mapDispatchToProps)(settings);
export default SettingsMenu;
