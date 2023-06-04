import React from "react";
import FontSizesContext from "../../../../contexts/FontContext";

const SaveButtonDnd = props => /*#__PURE__*/React.createElement(FontSizesContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
  className: "my-5 px-1"
}, /*#__PURE__*/React.createElement("button", {
  onClick: props.clicked,
  style: {
    fontSize: value.fontSize.button
  },
  className: `duration-500 text-sm appearance-none outline-none text-white tracking-wide py-2 px-2 rounded-sm shadow
            ${value.fontLetters.button} ${value.fontStyle.button.toString().replaceAll(",", " ")} 
            ${props.disabled ? `opacity-50 cursor-not-allowed ${props.bgColor}` : `${props.bgColor} ${props.hoverBgColor}`}`,
  type: "button",
  disabled: props.disabled
}, props.label)));

export default SaveButtonDnd;