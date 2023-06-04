function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";

class SaveButtonComponent extends Component {
  render() {
    let saveButton;

    if (this.props.canSubmit) {
      saveButton = /*#__PURE__*/React.createElement("button", {
        onClick: this.props.clicked,
        style: {
          outline: 0,
          fontSize: this.context.font.fontSize.button
        },
        className: `${this.context.font.fontStyle.button.toString().replaceAll(",", " ")} ${this.context.font.fontLetters.button}
          ${this.props.disabled ? `text-gray-600 bg-transparent tracking-wide py-2 px-2 opacity-50 cursor-not-allowed` : `duration-500 py-2 px-2 rounded-sm text-gray-600 tracking-wide hover:bg-gray-100`}`,
        type: "button",
        disabled: this.props.disabled
      }, this.props.label);
    } else {
      saveButton = /*#__PURE__*/React.createElement("button", {
        onClick: this.props.clicked,
        style: {
          fontSize: this.context.font.fontSize.button
        },
        className: `${this.context.font.fontStyle.button.toString().replaceAll(",", " ")} ${this.context.font.fontLetters.button}
          ${this.props.disabled ? `appearance-none outline-none text-white bg-blue-400 tracking-wide py-2 px-2 rounded-sm opacity-50 cursor-not-allowed shadow` : `duration-500 appearance-none outline-none py-2 px-2 bg-blue-400 rounded-sm shadow text-white tracking-wide hover:bg-blue-500`}`,
        type: "button",
        disabled: this.props.disabled
      }, this.props.label);
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "my-5 px-1"
    }, saveButton);
  }

}

_defineProperty(SaveButtonComponent, "contextType", CombinedContext);

const SaveButton = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(SaveButtonComponent, props));
};

export default SaveButton;