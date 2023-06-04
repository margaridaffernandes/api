import React from "react";

const DesignerFormContainer = props => /*#__PURE__*/React.createElement("div", {
  style: {
    flexFlow: "wrap"
  },
  className: props.menuOpened ? "flex justify-center w-1/2 sm:w-7/12 md:w-4/6 lg:w-3/4 xl:w-3/4" : "flex justify-center w-full"
}, props.children);

export default DesignerFormContainer;