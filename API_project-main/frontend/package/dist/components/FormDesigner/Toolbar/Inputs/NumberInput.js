import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NumberInput = props => {
  const width = props.unit ? "w-2/3" : "w-full";
  return /*#__PURE__*/React.createElement("div", {
    className: "flex py-1 px-1 w-full flex-col"
  }, /*#__PURE__*/React.createElement("p", {
    className: "pb-1 font-bold text-xs flex text-gray-700 leading-tight"
  }, props.label), /*#__PURE__*/React.createElement("div", {
    className: "flex w-full items-center flex-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: `relative ${width}`
  }, /*#__PURE__*/React.createElement("input", {
    draggable: true,
    onDragStart: e => e.preventDefault() && e.stopPropagation(),
    style: {
      paddingTop: "0.35rem",
      paddingBottom: "0.35rem"
    },
    className: "w-full pl-2 flex text-gray-700 leading-tight text-xs outline-none bg-gray-200 border border-gray-200 focus:bg-white focus:border-gray-300",
    type: "number",
    onChange: event => props.handleChange(event),
    value: props.value
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-y-0 right-0 flex items-center pr-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "duration-500 cursor-pointer text-gray-400 hover:text-gray-700",
    onClick: event => props.handleClear(event)
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "xs",
    icon: faTimes
  })))), props.unit && /*#__PURE__*/React.createElement("p", {
    className: "w-1/3 pl-2 pr-8 text-xs flex text-gray-700 leading-tight"
  }, props.unit)));
};

export default NumberInput;