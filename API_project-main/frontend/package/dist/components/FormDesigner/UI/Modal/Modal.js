import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = props => /*#__PURE__*/React.createElement("div", {
  style: {
    backdropFilter: 'blur(4px)',
    backgroundColor: "rgba(0,0,0,.7)"
  },
  className: "fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
}, /*#__PURE__*/React.createElement("div", {
  className: "flex justify-center absolute w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/2 xl:w-1/3 right-0 left-0 mr-auto ml-auto"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    top: "25%",
    bottom: props.bottom !== undefined ? props.bottom : "25%",
    zIndex: 9999999999
  },
  className: "flex fixed bg-white rounded-lg flex-col shadow"
}, /*#__PURE__*/React.createElement("div", {
  className: "flex flex-row items-center justify-between py-2 border-b border-gray-200"
}, /*#__PURE__*/React.createElement("p", {
  className: "text-13 xxl:text-sm text-left text-gray-600 leading-tight px-4 cursor-default"
}, props.title), /*#__PURE__*/React.createElement("div", {
  onClick: props.onCancelChanges,
  className: "duration-500 text-gray-400 cursor-pointer px-4 hover:text-gray-700"
}, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
  size: "xs",
  icon: faTimes
}))), /*#__PURE__*/React.createElement("div", {
  className: "flex overflow-y-auto flex-col"
}, /*#__PURE__*/React.createElement("div", {
  className: "justify-center " + props.padding
}, props.children)), /*#__PURE__*/React.createElement("div", {
  className: "flex flex-row justify-end border-t border-gray-200 py-2"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
  type: "button",
  onClick: props.onCancelChanges,
  style: {
    height: "30px",
    outline: 0
  },
  className: "duration-500 px-2 mr-2 text-11 xxl:text-sm text-gray-600 tracking-wide"
}, "Cancelar"), props.disabled ? /*#__PURE__*/React.createElement("button", {
  type: "button",
  disabled: true,
  onClick: props.onClosed,
  style: {
    height: "30px",
    outline: 0
  },
  className: "duration-500 px-2 mr-2 text-11 xxl:text-sm text-white tracking-wide rounded-sm bg-blue-400 shadow opacity-50 cursor-not-allowed"
}, "Confirmar") : /*#__PURE__*/React.createElement("button", {
  type: "button",
  onClick: props.onClosed,
  style: {
    height: "30px",
    outline: 0
  },
  className: "duration-500 px-2 mr-2 text-11 xxl:text-sm text-white tracking-wide rounded-sm bg-blue-400 shadow hover:bg-blue-500"
}, "Confirmar"), props.hasButtonRemove && /*#__PURE__*/React.createElement("button", {
  type: "button",
  onClick: props.onRemove,
  style: {
    height: "30px",
    outline: 0
  },
  className: "duration-500 px-2 mr-2 text-11 xxl:text-sm text-white tracking-wide rounded-sm bg-red-500 shadow hover:bg-red-600"
}, "Remover"))))));

export default Modal;