import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import CombinedContext from "../../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../../contexts/ProviderCombinedContext";

const FontButton = props => {
  const context = useContext(CombinedContext);
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
    className: "px-2 xxl:px-3 xxxl:px-4 xxxxl:px-5 bg-gray-200 rounded-sm m-1 hover:scale-110 transform duration-500",
    style: {
      color: props.isActive && context.theme.themePalette.$600,
      backgroundColor: props.isActive && context.theme.themePalette.$300
    },
    onClick: () => props.onClick(props.keyProp, props.data.type)
  }, props.isSVG ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1396 ? "14px" : "16px",
      height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1396 ? "24px" : "26px"
    }
  }, props.data.icon) : /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: props.data.icon,
    style: {
      width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1396 ? "14px" : "16px",
      height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1396 ? "14px" : "16px"
    }
  })));
};

export default FontButton;