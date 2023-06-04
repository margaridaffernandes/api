function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";

class ToolButtonComponent extends Component {
  render() {
    document.documentElement.style.setProperty('--tool-icon-hover', this.context.theme.themePalette.$200);
    return /*#__PURE__*/React.createElement("button", {
      className: `flex items-center w-35px h-35px xxl:w-40px xxl:h-40px justify-center mt-3 rounded-lg transition duration-500 focus:text-white focus:outline-none 
                ${this.props.isEnabled ? "cursor-pointer" : "cursor-not-allowed"}`,
      onClick: this.props.isEnabled ? this.props.handleToolButtonClick : undefined,
      style: {
        color: this.props.isActive ? this.context.theme.themePalette.$100 : this.context.theme.themePalette.$600,
        backgroundColor: this.props.isActive && this.context.theme.themePalette.$400
      }
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      id: this.props.isEnabled ? "toolIcon" : "iconbutton",
      style: {
        width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1469 ? "22px" : "27px",
        height: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1469 ? "22px" : "27px"
      },
      icon: this.props.icon
    }));
  }

}

_defineProperty(ToolButtonComponent, "contextType", CombinedContext);

const ToolboxItem = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(ToolButtonComponent, props));
};

export default ToolboxItem;