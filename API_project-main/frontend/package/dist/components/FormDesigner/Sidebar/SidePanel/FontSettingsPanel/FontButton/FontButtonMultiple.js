import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import CombinedContext from "../../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../../contexts/ProviderCombinedContext";

const FontButtonMultiple = props => {
  const context = useContext(CombinedContext);
  const [isActive, setActive] = useState(false);
  const {
    icon,
    type
  } = props.data;
  useEffect(() => {
    if (context.font.fontStyle[props.identifier].length !== 0) {
      for (let i = 0; i < context.font.fontStyle[props.identifier].length; i++) {
        if (context.font.fontStyle[props.identifier][i] === type) {
          setActive(true);
        }
      }
    }
  }, [context.font.fontStyle, props.identifier, type]);
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
    className: "px-2 xxl:px-3 xxxl:px-4 xxxxl:px-5 bg-gray-200 rounded-sm m-1 hover:scale-110 transform duration-500",
    style: {
      color: isActive && context.theme.themePalette.$600,
      backgroundColor: isActive && context.theme.themePalette.$300
    },
    onClick: () => {
      setActive(!isActive);
      props.onClick(type);
    }
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: icon,
    style: {
      width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1396 ? "14px" : "16px",
      height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1396 ? "14px" : "16px"
    }
  })));
};

export default FontButtonMultiple;