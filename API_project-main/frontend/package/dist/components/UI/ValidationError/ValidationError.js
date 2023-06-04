import React from "react";
import FontSizesContext from "../../../contexts/FontContext";

const validationError = props => /*#__PURE__*/React.createElement(FontSizesContext.Consumer, null, value => /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: value.fontSize.field
  },
  className: "text-red-500 italic pt-2 leading-tight cursor-default"
}, props.errorMessage));

export default validationError;