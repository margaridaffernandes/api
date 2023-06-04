import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HeaderOption = props => /*#__PURE__*/React.createElement("div", {
  onClick: e => props.handleSubMenu(e),
  className: "flex flex-row border-b border-t shadow-xs bg-gray-200 flex items-center justify-between cursor-pointer px-2"
}, /*#__PURE__*/React.createElement("p", {
  className: "text-xs text-gray-700 leading-tight"
}, props.title), /*#__PURE__*/React.createElement("div", {
  className: "text-gray-700"
}, props.isOpened === true ? /*#__PURE__*/React.createElement(FontAwesomeIcon, {
  icon: faAngleDown,
  size: "xs"
}) : /*#__PURE__*/React.createElement(FontAwesomeIcon, {
  icon: faAngleRight,
  size: "xs"
})));

export default HeaderOption;