import React from "react";

const PrefixInput = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex text-11 pt-2",
    style: {
      borderBottom: "1px solid #e9e9e9"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600 font-semibold pr-2 py-1 whitespace-nowrap"
  }, props.prefix), /*#__PURE__*/React.createElement("input", {
    className: "pl-2 py-1 w-full focus:outline-none text-gray-600",
    type: props.type,
    onChange: props.onChange,
    value: props.value
  }));
};

export default PrefixInput;