function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";

class ProportionComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", (event, type) => {
      this.context.fields.updateValue(this.props.pathLabel);

      if (type === "Percent") {
        const value = event.target.value === "" ? event.target.value : event.target.value + "%";
        this.props.onProportionChange(this.props.pathLabel, value);
      } else if (type === "Unitary") {
        this.props.onProportionChange(this.props.pathLabel, event.target.value);
      }
    });

    _defineProperty(this, "handleTouch", () => {
      this.props.onTouch(this.props.pathLabel);
    });
  }

  render() {
    let proportion = null;

    if (this.props.editMode) {
      switch (this.props.type) {
        case "Unitary":
          proportion = /*#__PURE__*/React.createElement("input", {
            title: this.props.description,
            placeholder: "Insira um valor...",
            onBlur: this.handleTouch.bind(this),
            value: this.props.value,
            onChange: event => this.handleChange(event, "Unitary"),
            style: {
              fontSize: this.context.font.fontSize.field
            },
            className: this.props.error ? this.props.value !== "" ? "block h-10 items-center flex appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "block h-10 items-center flex appearance-none w-full bg-gray-200 border border-red-500 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : this.props.value !== "" ? "block h-10 items-center flex appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 items-center flex appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
          });
          break;

        case "Percent":
          proportion = /*#__PURE__*/React.createElement("div", {
            className: "flex w-full flex-row items-center"
          }, /*#__PURE__*/React.createElement("input", {
            title: this.props.description,
            placeholder: "Insira um valor...",
            onBlur: this.handleTouch.bind(this),
            value: this.props.value.replace("%", ""),
            onChange: event => this.handleChange(event, "Percent"),
            style: {
              width: "12rem",
              fontSize: this.context.font.fontSize.field
            },
            className: this.props.error ? this.props.value !== "" ? "block h-10 items-center flex appearance-none bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "block h-10 items-center flex appearance-none bg-gray-200 border border-red-500 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : this.props.value !== "" ? "block h-10 items-center flex appearance-none bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 items-center flex appearance-none bg-gray-200 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
          }), /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: this.context.font.fontSize.field
            },
            className: "text-gray-700 leading-tight pl-2"
          }, "%"));
          break;

        default:
          proportion = null;
      }
    } else if (!this.props.editMode) {
      proportion = /*#__PURE__*/React.createElement("input", {
        disabled: true,
        value: this.props.value,
        title: this.props.description,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block h-10 appearance-none items-center flex w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
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
    }), proportion, this.props.error && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.error
    })));
  }

}

_defineProperty(ProportionComponent, "contextType", CombinedContext);

const Proportion = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(ProportionComponent, props));
};

export default Proportion;