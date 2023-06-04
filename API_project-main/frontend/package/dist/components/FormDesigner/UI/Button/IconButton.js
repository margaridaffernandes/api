import React, { useContext } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = props => {
  const context = useContext(CombinedContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative cursor-pointer",
    onClick: () => props.handleClick()
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center justify-center ${props.type !== undefined ? "p-2" : "h-16 p-3"} rounded-lg`,
    style: {
      border: props.selected ? "0.05rem solid " + context.theme.themePalette.$300 : "0.03rem solid #ededed",
      backgroundColor: props.selected ? context.theme.themePalette.$100 + "52" : "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: props.type !== undefined ? "50px" : "33px",
      height: props.type !== undefined ? "50px" : "33px"
    }
  }, props.icon), /*#__PURE__*/React.createElement("span", {
    className: "text-11 xl:text-11-5 xxl:text-xs xxxl:text-13 xxxxl:text-13-5 text-gray-500 text-center"
  }, props.description)), props.selected && /*#__PURE__*/React.createElement("div", {
    className: "absolute -right-0-5 -top-1 rounded-full w-4 h-4 flex justify-center items-center",
    style: {
      marginLeft: "-8px",
      backgroundColor: context.theme.themePalette.$200
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-white text-9"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faCheck
  })))));
};

export default IconButton;