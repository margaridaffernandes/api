import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const DropItem = props => {
  const [active, setActive] = useState(true);
  const {
    title,
    content
  } = props.data;
  return /*#__PURE__*/React.createElement("li", {
    className: "my-1"
  }, /*#__PURE__*/React.createElement("h2", {
    onClick: () => setActive(!active),
    className: "flex flex-row items-center uppercase font-bold cursor-pointer text-gray-600 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center transform transition-transform duration-500 " ${active && 'rotate-180'}`
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    style: {
      width: "17px",
      height: "17px"
    },
    icon: faCaretDown
  })), /*#__PURE__*/React.createElement("span", {
    className: "pl-2 text-11 xl:text-xs xxl:text-13 xxxl:text-13-5 xxxxl:text-14 xxxxxl:text-15"
  }, title)), active && /*#__PURE__*/React.createElement("div", {
    className: "max-h-0 pt-1 duration-500 transition-all"
  }, content));
};

export default DropItem;