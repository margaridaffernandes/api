import React from "react";
import BackgroundContext from "../../../contexts/BackgroundContext";

const PageContainer = props => /*#__PURE__*/React.createElement(BackgroundContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
  style: {
    backgroundColor: value
  },
  className: "w-full relative overflow-y"
}, props.children));

export default PageContainer;