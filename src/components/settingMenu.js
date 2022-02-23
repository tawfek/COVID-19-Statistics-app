import React from "react";
import { connect } from "react-redux";
import { setDarkMode, setLanguage } from "../store/actions";
import { Menu, Switch, Radio } from "antd";
import { Languages } from "../localization/languages";
import i18n from "../localization/i18n";
import Icon from "./icon";
function mapStateToProps(state) {
  return { user: state.root.user, country: state.root.country };
}
function mapDispatchToProps(dispatch) {
  return {
    setLanguage: (language) => dispatch(setLanguage(language)),
    setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
  };
}


const settings = ({ user, setLanguage, setDarkMode }) => {
  const changeLanguage = (language_key) => {
    setLanguage(language_key);
    i18n.changeLanguage(language_key);
  };

  return (
    <Menu className="setting-menu ">
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
                onClick={() => {
                  changeLanguage(language.key);
                }}
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
          checkedChildren={<Icon shape="sun"/>}
          unCheckedChildren={<Icon shape="moon"/>}
        />
      </Menu.Item>
    </Menu>
  );
};

const SettingsMenu = connect(mapStateToProps, mapDispatchToProps)(settings);
export default SettingsMenu;
