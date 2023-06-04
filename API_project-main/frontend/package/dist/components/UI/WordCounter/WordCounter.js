import React from "react";
import FontSizesContext from "../../../contexts/FontContext";

const WordCounter = props => /*#__PURE__*/React.createElement(FontSizesContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
  style: {
    paddingBottom: props.type === "textarea" ? "0.6rem" : "0.4rem",
    paddingRight: props.type === "textarea" ? "1.55rem" : "1.5rem",
    fontSize: value.fontSize.field
  },
  className: "absolute right-0 bottom-0"
}, /*#__PURE__*/React.createElement("p", {
  className: "text-gray-500 leading-tight"
}, Number(props.total) - Number(props.current))));

export default WordCounter;