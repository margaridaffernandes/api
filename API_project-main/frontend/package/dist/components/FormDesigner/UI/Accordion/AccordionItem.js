import React from 'react';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccordionItem = props => {
  const {
    title,
    content
  } = props.data;
  return /*#__PURE__*/React.createElement("li", {
    className: "my-2"
  }, /*#__PURE__*/React.createElement("h2", {
    onClick: props.onClick,
    className: "flex flex-row items-center uppercase font-bold cursor-pointer text-gray-600 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center transform transition-transform duration-500 " ${props.active && 'rotate-180'}`
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    style: {
      width: "17px",
      height: "17px"
    },
    icon: faCaretDown
  })), /*#__PURE__*/React.createElement("span", {
    className: "pl-2 text-11 xl:text-xs xxl:text-13 xxxl:text-13-5 xxxxl:text-14 xxxxxl:text-15"
  }, title)), props.active && /*#__PURE__*/React.createElement("div", {
    className: "pt-1 duration-500 transition-all"
  }, content));
};

export default AccordionItem;