import React from "react";
import ThemeContext from "../../../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const addSectionButton = props => /*#__PURE__*/React.createElement(ThemeContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
  className: "flex w-full mt-2 justify-end"
}, /*#__PURE__*/React.createElement("button", {
  onClick: props.handleAddSection,
  disabled: props.disabled,
  type: "button",
  style: {
    outline: 0,
    borderColor: props.error ? null : Array.isArray(value) ? value[1] : value.themePalette.$400
  },
  className: props.disabled ? "flex w-6 items-center text-gray-700 justify-center border-dashed bg-white border rounded-sm h-6 opacity-50 cursor-not-allowed" : props.error ? "duration-500 flex w-6 items-center text-gray-700 justify-center border-dashed border-red-500 bg-white border rounded-sm h-6 hover:bg-gray-100 hover:shadow cursor-pointer" : "duration-500 flex w-6 items-center text-gray-700 justify-center border-dashed bg-white border rounded-sm h-6 hover:bg-gray-100 hover:shadow cursor-pointer"
}, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
  size: "xs",
  icon: faPlus
}))));

export default addSectionButton;