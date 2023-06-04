import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"; // Já não é usado este componente mas deixei na mesma caso se voltar a usar

const subFormTag = props => /*#__PURE__*/React.createElement("div", {
  className: "w-full px-5 flex flex-row items-center justify-start"
}, /*#__PURE__*/React.createElement("div", {
  className: "text-red-500 pr-2"
}, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
  size: "sm",
  icon: faExclamationTriangle
})), props.label > 1 ? /*#__PURE__*/React.createElement("p", {
  className: "text-red-500 text-xs leading-tight cursor-default"
}, "Deve adicionar pelos menos ", props.label, " elementos") : /*#__PURE__*/React.createElement("p", {
  className: "text-red-500 text-xs leading-tight cursor-default"
}, "Deve adicionar pelos menos ", props.label, " elemento"));

export default subFormTag;