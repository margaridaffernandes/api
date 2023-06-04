import { faItalic, faBold, faUnderline } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import CombinedContext from "../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../contexts/ProviderCombinedContext";
import FontButtonMultiple from "./FontButton/FontButtonMultiple";

const FontStyle = props => {
  const context = useContext(CombinedContext);
  const data = [{
    type: "font-bold",
    icon: faBold
  }, {
    type: "italic",
    icon: faItalic
  }, {
    type: "underline",
    icon: faUnderline
  }];

  const handleChange = style => {
    let values;
    values = context.font.fontStyle[props.identifier].slice();

    if (context.font.fontStyle[props.identifier].indexOf(style) >= 0) {
      values.splice(context.font.fontStyle[props.identifier].indexOf(style), 1);
    } else {
      values.push(style);
    }

    context.font.handleFontStyle(props.identifier, values);
  };

  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row justify-between items-center py-1 px-1 xxl:py-2 xxl:px-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-10 xxl:text-11 xxxl:text-xs font-bold text-gray-700 leading-tight mr-1 xxl:mr-2 xxxl:mr-4"
  }, props.title), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center"
  }, data.map((data, index) => /*#__PURE__*/React.createElement(FontButtonMultiple, {
    key: index,
    identifier: props.identifier,
    data: data,
    onClick: handleChange
  })))));
};

export default FontStyle;