import { faAlignCenter, faAlignLeft, faAlignRight } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import CombinedContext from "../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../contexts/ProviderCombinedContext";
import FontButton from "./FontButton/FontButton";
const data = [{
  type: "justify-left",
  icon: faAlignLeft
}, {
  type: "justify-center",
  icon: faAlignCenter
}, {
  type: "justify-right",
  icon: faAlignRight
}];

const FontAlignment = props => {
  const context = useContext(CombinedContext);
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    data.forEach((d, i) => {
      if (context.font.fontAlignment[props.identifier] === d.type) {
        setActiveIndex(i);
      }
    });
  }, [context.font.fontAlignment, props.identifier]);

  const handleChange = (i, position) => {
    if (activeIndex === i) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(i);
    }

    context.font.handleFontAlignment(props.identifier, position);
  };

  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row justify-between items-center py-1 px-1 xxl:py-2 xxl:px-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-10 xxl:text-11 xxxl:text-xs font-bold text-gray-700 leading-tight mr-1 xxl:mr-2 xxxl:mr-4"
  }, props.title), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center"
  }, data.map((data, index) => /*#__PURE__*/React.createElement(FontButton, {
    key: index,
    keyProp: index,
    identifier: props.identifier,
    data: data,
    isActive: activeIndex === index,
    isSVG: false,
    onClick: handleChange
  })))));
};

export default FontAlignment;