import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"; // Este componente já não está a ser usado. Deixei caso voltar a ser usado.
// Deve ser usado nos SectionContainer para dizer a cardinalidade da secção.

const cardinalityTag = props => /*#__PURE__*/React.createElement("div", {
  className: "w-full px-5 flex flex-row items-center pt-3 justify-start"
}, /*#__PURE__*/React.createElement("div", {
  className: "text-red-500 pr-2"
}, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
  size: "sm",
  icon: faExclamationTriangle
})), props.cardinality === 1 ? /*#__PURE__*/React.createElement("p", {
  className: "break-all text-red-500 text-xs leading-tight cursor-default"
}, "Preencha pelo menos ", props.cardinality, " campo da sec\xE7\xE3o", " ", /*#__PURE__*/React.createElement("i", null, props.label.toLowerCase())) : /*#__PURE__*/React.createElement("p", {
  className: "break-all text-red-500 text-xs leading-tight cursor-default"
}, "Preencha pelo menos ", props.cardinality, " campos da sec\xE7\xE3o", " ", /*#__PURE__*/React.createElement("i", null, props.label.toLowerCase())));

export default cardinalityTag;