import React from 'react';
import DropItem from "./DropItem";

const Dropdown = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full px-3 py-2"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "w-full flex flex-col"
  }, props.dropData.map((data, index) => /*#__PURE__*/React.createElement(DropItem, {
    key: index,
    data: data
  }))));
};

export default Dropdown;