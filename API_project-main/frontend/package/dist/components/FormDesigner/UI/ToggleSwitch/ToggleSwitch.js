import React, { useContext } from 'react';
import CombinedContext from "../../../../contexts/CombinedContext";

const ToggleSwitch = props => {
  const context = useContext(CombinedContext);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2.5px 2.5px",
      backgroundColor: !props.isOn ? null : Array.isArray(context.theme) ? context.theme[0] : context.theme.themePalette.$400
    },
    onClick: () => props.onClick(),
    className: "duration-500 w-7 rounded-full bg-gray-300 flex items-center cursor-pointer " + (!props.isOn ? "justify-start" : "justify-end")
  }, /*#__PURE__*/React.createElement("span", {
    className: "rounded-full w-3 h-3 border-gray-300 bg-white cursor-pointer",
    style: {
      borderWidth: "1px"
    }
  }));
};

export default ToggleSwitch;