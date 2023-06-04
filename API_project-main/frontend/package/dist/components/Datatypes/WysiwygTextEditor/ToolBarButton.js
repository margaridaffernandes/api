import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItalic, faBold, faUnderline, faListUl, faListOl, faStrikethrough, faPalette, faHighlighter } from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "./ColorPicker";

const ToolBarButton = props => {
  let styleButton = null;

  switch (props.type) {
    case "ITALIC":
      styleButton = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faItalic
      });
      break;

    case "BOLD":
      styleButton = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faBold
      });
      break;

    case "UNDERLINE":
      styleButton = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faUnderline
      });
      break;

    case "UL":
      styleButton = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faListUl
      });
      break;

    case "OL":
      styleButton = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faListOl
      });
      break;

    case "STRIKETHROUGH":
      styleButton = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faStrikethrough
      });
      break;

    case "TEXTCOLOR":
      styleButton = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faPalette
      });
      break;

    case "HIGHLIGHT":
      styleButton = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "sm",
        icon: faHighlighter
      });
      break;

    default:
      break;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "w-1/12 self-center relative"
  }, /*#__PURE__*/React.createElement("div", {
    onMouseDown: props.focused ? props.onMouseDown : null,
    className: props.focused ? props.isActive || props.displayColorPicker ? "duration-500 m-1 rounded-sm cursor-pointer text-center text-gray-800 bg-gray-200" : "duration-500 m-1 rounded-sm cursor-pointer text-gray-700 text-center hover:text-gray-800 hover:bg-gray-100" : "duration-500 m-1 cursor-default text-gray-700 text-center"
  }, styleButton), props.displayColorPicker && /*#__PURE__*/React.createElement("div", {
    onMouseDown: event => event.preventDefault()
  }, /*#__PURE__*/React.createElement(ColorPicker, {
    onChangeColor: props.onChangeColor
  })));
};

export default ToolBarButton;