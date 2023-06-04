import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ChevronDown = props => /*#__PURE__*/React.createElement("div", {
  onClick: () => props.onClick !== undefined && props.onClick(),
  className: "cursor-pointer absolute inset-y-0 right-0 flex items-center px-2 " + props.color
}, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
  size: "xs",
  icon: faChevronDown
}));

export default ChevronDown;