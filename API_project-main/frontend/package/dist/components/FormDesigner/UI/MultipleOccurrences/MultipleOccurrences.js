import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const MultipleOccurrences = () => /*#__PURE__*/React.createElement("div", {
  className: "flex flex-row items-center pt-1"
}, /*#__PURE__*/React.createElement("div", {
  className: "flex items-center text-red-500"
}, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
  icon: faInfoCircle,
  size: "xs"
})), /*#__PURE__*/React.createElement("p", {
  className: "text-xs tracking-wide italic pl-1 text-red-500"
}, "Sec\xE7\xE3o de m\xFAltiplas ocorr\xEAncias"));

export default MultipleOccurrences;