import React from "react";
import { ReactComponent as MoonIcon } from "../styles/icons/MoonIcon.svg";
import { ReactComponent as SunIcon } from "../styles/icons/sunIcon.svg";
import { ReactComponent as ActiveCases } from "../styles/icons/activeCases.svg";
import { ReactComponent as Tests } from "../styles/icons/tests.svg";
import { ReactComponent as Recovred } from "../styles/icons/recovred.svg";
import { ReactComponent as Critical } from "../styles/icons/critical.svg";
import { ReactComponent as Deaths } from "../styles/icons/deaths.svg";

const Icon = ({ shape }) => {
  const icons = {
    activeCases: <ActiveCases />,
    recovered: <Recovred />,
    sun: <SunIcon />,
    moon: <MoonIcon />,
    tests: <Tests />,
    critical: <Critical />,
    deaths: <Deaths />,
  };
  const IconShape = icons[shape];
  return IconShape;
};

export default Icon;
