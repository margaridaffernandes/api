import React, { useContext, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import themeColors from "../../../../../assets/colors/ThemeColors";
import ProviderCombinedContext from "../../../../../contexts/ProviderCombinedContext";
import CombinedContext from "../../../../../contexts/CombinedContext";

const ThemeColor = props => {
  const context = useContext(CombinedContext);
  const [hovered, setHovered] = useState(false);

  const handleColorChange = () => {
    context.theme.handleThemeColor(props.colorName);
    context.theme.handleThemePalette(props.colorName, {});
  };

  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => handleColorChange(),
    title: props.colorName,
    style: {
      margin: "2.3px 2.3px",
      backgroundColor: hovered ? themeColors[props.colorName].$500 : themeColors[props.colorName].$400,
      borderColor: themeColors[props.colorName].$500
    },
    className: "transform hover:scale-110 duration-500 h-5 w-5 xxxl:h-6 xxxl:w-6 xxxxl:h-7 xxxxl:w-7 xxxxxl:h-8 xxxxxl:w-8 flex text-white cursor-pointer rounded-lg justify-center items-center"
  }, props.selected && /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "xs",
    icon: faCheck
  })));
};

export default ThemeColor;