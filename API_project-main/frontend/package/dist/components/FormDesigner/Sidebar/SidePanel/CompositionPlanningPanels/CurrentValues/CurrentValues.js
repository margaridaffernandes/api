import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CurrentValues = props => {
  let currentValues = null;

  if (Array.isArray(props.value) && props.value.length > 0) {
    currentValues = /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: "20px"
      },
      className: "flex"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex w-full flex-col"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-gray-700 text-10 xxl:text-11 xxxl:text-xs leading-tight font-bold"
    }, props.jsonTitle), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: "2px"
      },
      className: "flex flex-col w-full flex-wrap"
    }, props.value.map((x, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "w-full flex items-center"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-gray-700 text-11 xxxl:text-xs leading-tight break-all pr-2"
      }, x.toString()), /*#__PURE__*/React.createElement("div", {
        onClick: () => props.handleRemoveItem(x),
        className: "flex items-center justify-center h-5 w-5 text-gray-400 hover:text-red-500 rounded-full cursor-pointer"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faTimes,
        style: {
          width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "10px" : "12px",
          height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1390 ? "10px" : "12px"
        }
      })));
    }))));
  }

  return currentValues;
};

export default CurrentValues;