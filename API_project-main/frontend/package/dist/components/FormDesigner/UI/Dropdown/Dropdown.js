import { faCaretDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";

const Dropdown = props => {
  const context = useContext(CombinedContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative mb-2 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => props.handleOpen()
  }, /*#__PURE__*/React.createElement("div", {
    className: "truncate flex items-center cursor-pointer appearance-none w-full bg-gray-100 border border-gray-200 px-4 py-2 rounded-sm focus:outline-none",
    style: {
      border: props.isDropSelected && '2px solid ' + context.theme.themePalette.$200,
      backgroundColor: props.isDropSelected && 'white'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: props.value !== null ? "text-gray-700 text-10 xxxl:text-xs leading-tight" : "text-gray-500 text-10 xxxl:text-xs leading-tight"
  }, props.value === null ? props.placeholder : props.value))), props.children, /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "xs",
    icon: faCaretDown
  })), props.value !== null && /*#__PURE__*/React.createElement("div", {
    onClick: () => props.handleClear(),
    className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center px-10 text-gray-400 hover:text-red-500"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faTimes,
    style: {
      width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "10px" : "12px",
      height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "10px" : "12px"
    }
  })));
};

export default Dropdown;