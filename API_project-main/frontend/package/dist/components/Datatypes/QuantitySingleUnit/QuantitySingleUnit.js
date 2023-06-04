function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";

class QuantitySingleUnitComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", event => {
      if (event.target.value !== "") {
        this.context.fields.updateValue(this.props.pathLabelQuantity);
        this.context.fields.updateValue(this.props.pathLabelUnit);
        this.props.onQuantityChange(this.props.pathLabelQuantity, event.target.value);
        this.props.onQuantityChange(this.props.pathLabelUnit, this.props.unitsList[0]);
      } else {
        this.context.fields.updateValue(this.props.pathLabelQuantity);
        this.context.fields.updateValue(this.props.pathLabelUnit);
        this.props.onQuantityChange(this.props.pathLabelQuantity, "");
        this.props.onQuantityChange(this.props.pathLabelUnit, "");
      }
    });

    _defineProperty(this, "handleTouch", () => {
      this.props.onTouch(this.props.pathLabelQuantity);
    });
  }

  render() {
    let quantity = /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-center"
    }, /*#__PURE__*/React.createElement("input", {
      title: this.props.description,
      placeholder: "Insira um valor...",
      onBlur: this.handleTouch.bind(this),
      value: this.props.valueQuantity,
      onChange: event => this.handleChange(event),
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: this.props.errorQuantity ? "block h-10 items-center flex appearance-none w-1/2 bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "block h-10 items-center flex appearance-none w-1/2 bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "text-gray-700 leading-tight pl-2"
    }, this.props.unitsList[0]));
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
    }), quantity, this.props.errorQuantity && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.errorQuantity
    })));
  }

}

_defineProperty(QuantitySingleUnitComponent, "contextType", CombinedContext);

const QuantitySingleUnit = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(QuantitySingleUnitComponent, props));
};

export default QuantitySingleUnit;