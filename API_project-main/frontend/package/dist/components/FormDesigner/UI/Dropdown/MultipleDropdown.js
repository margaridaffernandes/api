import { faTimes, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";

const MultipleDropdown = props => {
  const context = useContext(CombinedContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => props.handleOpen()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "33px",
      border: props.showDropdown && '2px solid ' + context.theme.themePalette.$200,
      backgroundColor: props.showDropdown && 'white'
    },
    className: `flex text-10 xxxl:text-xs cursor-pointer block appearance-none w-full border rounded-sm bg-gray-100 border border-gray-200 leading-tight focus:outline-none
          ${props.value.length !== 0 ? "text-gray-700 px-1" : "text-gray-500 px-4"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-12 flex w-full flex-row flex-wrap items-center"
  }, props.value.length === 0 ? props.placeholder : props.value.map((obj, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: `mr-1 my-1 flex flex-row items-center rounded-sm py-1 px-1 border border-gray-300 ${props.showDropdown ? "bg-gray-200" : "bg-white"}`
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-10 xxxl:text-xs text-gray-700"
    }, obj[props.idText]), /*#__PURE__*/React.createElement("div", {
      onClick: event => props.handleChange(event, obj),
      className: "duration-500 flex items-center cursor-pointer ml-2 mr-1 text-gray-400 hover:text-red-500"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faTimes
    })));
  })))), props.children, /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faCaretDown,
    style: {
      width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "10px" : "12px",
      height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "10px" : "12px"
    }
  })), props.value.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-y-0 right-0 flex items-center pr-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "duration-500 cursor-pointer text-gray-400 hover:text-red-500",
    onClick: () => props.handleClear()
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    size: "xs",
    icon: faTimes
  }))));
};

export default MultipleDropdown;