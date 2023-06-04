import React from "react";

const option = props => /*#__PURE__*/React.createElement("div", {
  onClick: e => props.handleClick(e),
  style: {
    paddingTop: "0.35rem",
    paddingBottom: "0.35rem"
  },
  className: "duration-300 text-xs flex text-gray-700 leading-tight items-center cursor-pointer px-2 hover:bg-blue-100 " + props.optionStyle
}, props.text);

export default option;