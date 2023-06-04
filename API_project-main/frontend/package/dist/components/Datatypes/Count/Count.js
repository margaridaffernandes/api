function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";

class CountComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", type => {
      this.context.fields.updateValue(this.props.pathLabel);
      this.handleTouch();

      if (type === "add") {
        let value = this.props.value === "" ? 0 : Number(this.props.value) + 1;
        this.props.onCountChange(this.props.pathLabel, value.toString());
      } else if (type === "subtract") {
        let value = Number(this.props.value) - 1 < 0 ? "" : Number(this.props.value) - 1;
        this.props.onCountChange(this.props.pathLabel, value.toString());
      }
    });

    _defineProperty(this, "handleTouch", () => {
      this.props.onTouch(this.props.pathLabel);
    });
  }

  render() {
    let count = null;

    if (this.props.editMode) {
      count = /*#__PURE__*/React.createElement("div", {
        className: "w-1/3"
      }, /*#__PURE__*/React.createElement("div", {
        title: this.props.description,
        className: "w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 h-8 rounded-sm bg-white inline-block"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row"
      }, /*#__PURE__*/React.createElement("div", {
        onClick: this.handleChange.bind(this, "subtract"),
        style: {
          backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
        },
        className: this.props.value === "" ? "duration-500 flex cursor-not-allowed items-center justify-center w-3/12 h-8 rounded-sm opacity-50" : "duration-500 flex items-center cursor-pointer justify-center w-3/12 h-8 rounded-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-bold text-sm text-white mb-1"
      }, "-")), /*#__PURE__*/React.createElement("div", {
        className: this.props.error ? "flex items-center justify-center w-6/12 h-8 cursor-default border border-red-500 rounded-sm" : "flex items-center justify-center w-6/12 h-8 cursor-default rounded-sm border-t border-b border-gray-200"
      }, this.props.value !== "" ? /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "tracking-wide text-gray-700"
      }, this.props.value) : /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "tracking-wide font-bold text-gray-500"
      }, "---")), /*#__PURE__*/React.createElement("div", {
        onClick: this.handleChange.bind(this, "add"),
        style: {
          backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
        },
        className: "duration-500 flex items-center cursor-pointer justify-center w-3/12 h-8 rounded-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-bold text-sm text-white mb-1"
      }, "+")))));
    } else {
      count = /*#__PURE__*/React.createElement("input", {
        disabled: true,
        value: this.props.value,
        title: this.props.description,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      style: {
        order: this.props.order,
        width: this.context.sizes.sizes[this.props.path] ? this.context.sizes.sizes[this.props.path] : "100%"
      },
      className: "flex"
    }, /*#__PURE__*/React.createElement(FieldContainer, null, /*#__PURE__*/React.createElement(Label, {
      label: this.props.label,
      editMode: this.props.editMode,
      optional: this.props.optional,
      showLabel: this.props.showLabel,
      optionalMandatory: this.props.optionalMandatory,
      sectionOccurrence: this.props.sectionOccurrence
    }), count, this.props.error && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.error
    })));
  }

}

_defineProperty(CountComponent, "contextType", CombinedContext);

const Count = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(CountComponent, props));
};

export default Count;