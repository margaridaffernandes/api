import React from "react";
import FontSizesContext from "../../../contexts/FontContext";

const SubmitButton = props => /*#__PURE__*/React.createElement(FontSizesContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
  className: "my-5"
}, /*#__PURE__*/React.createElement("button", {
  style: {
    outline: 0,
    fontSize: value.fontSize.button
  },
  onClick: props.clicked,
  className: `appearance-none outline-none text-white tracking-wide bg-blue-400 rounded-sm shadow py-2 px-2 
          ${value.fontStyle.button.toString().replaceAll(",", " ")} ${value.fontLetters.button}
          ${props.disabled ? `opacity-50 cursor-not-allowed` : `duration-500 hover:bg-blue-500`}`,
  type: "button",
  disabled: props.disabled
}, props.label)));

export default SubmitButton;