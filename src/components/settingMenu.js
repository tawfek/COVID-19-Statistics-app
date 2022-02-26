import React from "react";
import { connect } from "react-redux";
import { setDarkMode } from "../store/actions";
import { Menu, Switch, Radio } from "antd";
import { SaveToLocalStorage } from "./helpers";
import { Languages } from "../localization/languages";
import Icon from "./icon";
import { changeLanguage } from "./helpers";
function mapStateToProps(state) {
  return { user: state.root.user };
}
function mapDispatchToProps(dispatch) {
  return {
    setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
  };
}

const settings = ({ user, setDarkMode }) => {
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
          onChange={() => {
            setDarkMode(!user.darkMode);
            SaveToLocalStorage("darkMode", Boolean(!user.darkMode));
          }}
          defaultChecked={Boolean(user.darkMode)}
          checkedChildren={<Icon shape="sun" />}
          unCheckedChildren={<Icon shape="moon" />}
        />
      </Menu.Item>
    </Menu>
  );
};

const SettingsMenu = connect(mapStateToProps, mapDispatchToProps)(settings);
export default SettingsMenu;
