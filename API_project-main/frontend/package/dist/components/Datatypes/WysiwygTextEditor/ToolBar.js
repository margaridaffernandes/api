import React from "react";

const ToolBar = props => /*#__PURE__*/React.createElement("div", {
  style: {
    height: "1.7rem"
  },
  className: "block shadow w-full bg-white border border-gray-300 flex flex-row content-center"
}, props.children);

export default ToolBar;