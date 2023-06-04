import React from "react";

const Button = props => /*#__PURE__*/React.createElement("div", {
  style: {
    paddingTop: props.paddingTop
  },
  className: "flex outline-none flex-row " + props.justify
}, /*#__PURE__*/React.createElement("button", {
  type: "button",
  onClick: props.handleClick,
  style: {
    height: "25px"
  },
  className: "duration-500 px-2 text-xs text-white tracking-wide rounded-sm outline-none " + props.color
}, props.title));

export default Button;