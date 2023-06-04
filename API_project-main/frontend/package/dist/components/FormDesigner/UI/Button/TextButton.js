import React from "react";

const TextButton = props => {
  return /*#__PURE__*/React.createElement("div", {
    onClick: props.handleClick,
    className: `cursor-pointer pt-1 flex mb-4`
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: props.color
    },
    className: `${props.hover} text-10 xxl:text-xs leading-tight`
  }, props.title));
};

export default TextButton;