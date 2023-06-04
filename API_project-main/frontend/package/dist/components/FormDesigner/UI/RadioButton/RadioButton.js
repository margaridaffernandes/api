import React, { useContext } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";

const RadioButton = props => {
  const context = useContext(CombinedContext);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: "20px"
    },
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("input", {
    onClick: props.handleSelect,
    id: props.id,
    type: "radio",
    className: "hidden"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: props.id,
    className: "flex text-11 xxxl:text-xs xxxxl:text-13 items-center text-gray-700 leading-tight cursor-pointer"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      boxShadow: props.isSelected && "0px 0px 0px 2px white inset",
      backgroundColor: props.isSelected && context.theme.themePalette.$400
    },
    className: `transform duration-300 w-4 h-4 inline-block mr-1 rounded-full border border-gray-400 hover:scale-110
                        ${props.isSelected ? "bg-blue-500" : "bg-transparent"}`
  }), props.title));
};

export default RadioButton;