function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import FontSizesContext from "../../contexts/FontContext";

class SubFormContainerEditMode extends Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex absolute right-0 left-0 mr-auto ml-auto justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        top: "5%",
        bottom: "5%",
        zIndex: 999999 + this.props.level * 99
      },
      className: "modalsubform flex fixed z-10 justify-center w-11/12 bg-white border-transparent rounded-lg shadow flex-col"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "-webkit-fill-available"
      },
      className: "flex flex-col overflow-y-auto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center"
    }, this.props.children)), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row justify-end py-2 border-t border-gray-200"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: this.props.onCancel,
      style: {
        outline: 0
      },
      className: `duration-500 h-8 outline-none px-2 mr-2 text-gray-600 tracking-wide hover:bg-gray-100`
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      onClick: this.props.onHandleSubmit,
      disabled: this.props.onDisabled,
      style: {
        outline: 0
      },
      className: `${this.props.onDisabled ? `h-8 bg-blue-400 outline-none px-2 mr-2 text-white tracking-wide rounded-sm shadow opacity-50 cursor-not-allowed` : `duration-500 h-8 bg-blue-400 hover:bg-blue-500 outline-none px-2 mr-2 text-white tracking-wide rounded-sm shadow`}
                            `
    }, "Confirmar"))));
  }

}

_defineProperty(SubFormContainerEditMode, "contextType", FontSizesContext);

export default SubFormContainerEditMode;