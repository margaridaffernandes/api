function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";

class CountRangeComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", (dateType, type) => {
      this.handleTouch(dateType);

      if (dateType === "startValue") {
        this.context.fields.updateValue(this.props.pathLabelStart);

        if (type === "add") {
          let value = this.props.startValue === "" ? 0 : Number(this.props.startValue) + 1;
          this.props.onCountRangeChange(this.props.pathLabelStart, value.toString());
        } else if (type === "subtract") {
          let value = Number(this.props.startValue) - 1 < 0 ? "" : Number(this.props.startValue) - 1;
          this.props.onCountRangeChange(this.props.pathLabelStart, value.toString());
        }
      } else if (dateType === "endValue") {
        this.context.fields.updateValue(this.props.pathLabelEnd);

        if (type === "add") {
          let value = this.props.endValue === "" ? 0 : Number(this.props.endValue) + 1;
          this.props.onCountRangeChange(this.props.pathLabelEnd, value.toString());
        } else if (type === "subtract") {
          let value = Number(this.props.endValue) - 1 < 0 ? "" : Number(this.props.endValue) - 1;
          this.props.onCountRangeChange(this.props.pathLabelEnd, value.toString());
        }
      }
    });

    _defineProperty(this, "handleTouch", type => {
      if (type === "endValue") {
        this.props.onTouch(this.props.pathLabelEnd);
      } else if (type === "startValue") {
        this.props.onTouch(this.props.pathLabelStart);
      }
    });
  }

  render() {
    let countRange = null;

    if (this.props.editMode) {
      countRange = /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row justify-between items-end"
      }, /*#__PURE__*/React.createElement("div", {
        className: "w-1/3 flex flex-col mr-2"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
      }, "Valor M\xEDnimo"), /*#__PURE__*/React.createElement("div", {
        title: this.props.description,
        className: "w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 h-8 rounded-sm bg-white inline-block"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row"
      }, /*#__PURE__*/React.createElement("div", {
        onClick: this.handleChange.bind(this, "startValue", "subtract"),
        style: {
          backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
        },
        className: this.props.startValue === "" ? "duration-500 flex cursor-not-allowed items-center justify-center w-3/12 h-8 rounded-sm opacity-50" : "duration-500 flex items-center cursor-pointer justify-center w-3/12 h-8 rounded-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-bold text-white text-sm mb-1"
      }, "-")), /*#__PURE__*/React.createElement("div", {
        className: this.props.errorStart ? "flex items-center justify-center w-6/12 h-8 cursor-default border border-red-500 rounded-sm" : "flex items-center justify-center w-6/12 h-8 cursor-default rounded-sm border-b border-t border-gray-200"
      }, this.props.startValue !== "" ? /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "tracking-wide text-gray-700"
      }, this.props.startValue) : /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "tracking-wide font-bold text-gray-500"
      }, "---")), /*#__PURE__*/React.createElement("div", {
        onClick: this.handleChange.bind(this, "startValue", "add"),
        style: {
          backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
        },
        className: "duration-500 flex items-center cursor-pointer justify-center w-3/12 h-8 rounded-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-bold text-white text-sm mb-1"
      }, "+"))))), /*#__PURE__*/React.createElement("div", {
        className: "w-1/3 flex flex-col"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
      }, "Valor M\xE1ximo"), /*#__PURE__*/React.createElement("div", {
        title: this.props.description,
        className: "w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 h-8 rounded-sm bg-white inline-block"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row"
      }, /*#__PURE__*/React.createElement("div", {
        onClick: this.handleChange.bind(this, "endValue", "subtract"),
        style: {
          backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
        },
        className: this.props.endValue === "" ? "duration-500 flex cursor-not-allowed items-center justify-center w-3/12 h-8 rounded-sm  opacity-50" : "duration-500 flex items-center cursor-pointer justify-center w-3/12 h-8 rounded-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: "font-bold text-white text-sm mb-1"
      }, "-")), /*#__PURE__*/React.createElement("div", {
        className: this.props.errorEnd ? "flex items-center justify-center w-6/12 h-8 cursor-default border border-red-500 rounded-sm" : "flex items-center justify-center w-6/12 h-8 cursor-default rounded-sm border-b border-t border-gray-200"
      }, this.props.endValue !== "" ? /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "tracking-wide text-gray-700"
      }, this.props.endValue) : /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "tracking-wide font-bold text-gray-500"
      }, "---")), /*#__PURE__*/React.createElement("div", {
        onClick: this.handleChange.bind(this, "endValue", "add"),
        style: {
          backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
        },
        className: "flex items-center cursor-pointer justify-center w-3/12 h-8 rounded-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: "duration-500 font-bold text-white text-sm mb-1"
      }, "+"))))));
    } else {
      countRange = /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row justify-between items-end"
      }, /*#__PURE__*/React.createElement("div", {
        title: this.props.description,
        className: "w-1/2 flex flex-col mr-2"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
      }, "Valor M\xEDnimo"), /*#__PURE__*/React.createElement("input", {
        disabled: true,
        value: this.props.startValue,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block flex items-center h-10 appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
      })), /*#__PURE__*/React.createElement("div", {
        title: this.props.description,
        className: "w-1/2 flex flex-col"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
      }, "Valor M\xE1ximo"), /*#__PURE__*/React.createElement("input", {
        disabled: true,
        value: this.props.endValue,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block flex items-center h-10 appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
      })));
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
    }), countRange, (this.props.errorStart || this.props.errorEnd) && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.errorStart || this.props.errorEnd
    })));
  }

}

_defineProperty(CountRangeComponent, "contextType", CombinedContext);

const CountRange = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(CountRangeComponent, props));
};

export default CountRange;