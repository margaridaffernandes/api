import React from "react";
import FontSizesContext from "../../../contexts/FontContext";

const CancelButton = props => /*#__PURE__*/React.createElement(FontSizesContext.Consumer, null, value => /*#__PURE__*/React.createElement("div", {
  className: "my-5 px-1"
}, /*#__PURE__*/React.createElement("button", {
  style: {
    outline: 0,
    fontSize: value.fontSize.button
  },
  onClick: props.clicked,
  className: `duration-500 ease-out py-2 appearance-none outline-none px-2 shadow rounded-sm text-white tracking-wide bg-red-500 
          hover:bg-red-600 ${value.fontStyle.button.toString().replaceAll(",", " ")} ${value.fontLetters.button}`,
  type: "button"
}, "Cancelar")));

export default CancelButton;