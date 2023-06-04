function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faCaretDown, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";

class QuantityRangeComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      showDropdown: false
    });

    _defineProperty(this, "handleChange", (event, dataType) => {
      if (dataType === "startValue") {
        this.context.fields.updateValue(this.props.pathLabelStart);
        this.props.onQuantityRangeChange(this.props.pathLabelStart, event.target.value);
      } else if (dataType === "endValue") {
        this.context.fields.updateValue(this.props.pathLabelEnd);
        this.props.onQuantityRangeChange(this.props.pathLabelEnd, event.target.value);
      } else if (dataType === "unitValue") {
        this.setState({
          showDropdown: false
        });
        this.context.fields.updateValue(this.props.pathLabelUnit);
        this.props.onQuantityRangeChange(this.props.pathLabelUnit, event);
      }
    });

    _defineProperty(this, "handleOpenDropList", () => {
      this.setState({
        showDropdown: true
      });
    });

    _defineProperty(this, "handleClearSelectedUnit", () => {
      this.context.fields.updateValue(this.props.pathLabelUnit);
      this.props.onQuantityRangeChange(this.props.pathLabelUnit, "");
    });

    _defineProperty(this, "handleTouch", dataType => {
      if (dataType === "startValue") {
        this.props.onTouch(this.props.pathLabelStart);
      } else if (dataType === "endValue") {
        this.props.onTouch(this.props.pathLabelEnd);
      } else if (dataType === "unitValue") {
        this.props.onTouch(this.props.pathLabelUnit);
      }
    });

    _defineProperty(this, "handleClickOutside", event => {
      if (this.dropContainer.current && !this.dropContainer.current.contains(event.target)) {
        this.setState({
          showDropdown: false
        });
      }
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    let quantityRange = null;
    let dropList = null;
    let dropListHeigth = {
      1: "h-8",
      2: "h-16",
      3: "h-24"
    };

    if (this.props.editMode) {
      dropList = /*#__PURE__*/React.createElement("div", {
        ref: this.dropContainer,
        style: {
          zIndex: 99999999
        },
        className: dropListHeigth[this.props.unitsList.length] ? dropListHeigth[this.props.unitsList.length] + " w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
      }, this.props.unitsList.map((item, index) => {
        return /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(item, "unitValue"),
          key: index,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.unitValue === item ? "duration-300 relative flex items-center bg-blue-100 text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100" : "duration-300 relative flex items-center bg-white text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100"
        }, item, this.props.unitValue === item && /*#__PURE__*/React.createElement("div", {
          className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faCheck
        })));
      }));
    }

    if (this.props.editMode) {
      quantityRange = /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row items-end"
      }, /*#__PURE__*/React.createElement("div", {
        title: this.props.description,
        className: "w-2/6 flex flex-col mr-2"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
      }, "Valor M\xEDnimo"), /*#__PURE__*/React.createElement("input", {
        title: this.props.description,
        placeholder: "Insira um valor...",
        onBlur: this.handleTouch.bind(this, "startValue"),
        value: this.props.startValue,
        onChange: event => this.handleChange(event, "startValue"),
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.errorStart ? "block h-10 items-center flex appearance-none bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "block h-10 items-center flex appearance-none bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
      })), /*#__PURE__*/React.createElement("div", {
        title: this.props.description,
        className: "w-2/6 flex flex-col mr-2"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
      }, "Valor M\xE1ximo"), /*#__PURE__*/React.createElement("input", {
        title: this.props.description,
        placeholder: "Insira um valor...",
        onBlur: this.handleTouch.bind(this, "endValue"),
        value: this.props.endValue,
        onChange: event => this.handleChange(event, "endValue"),
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.errorEnd ? "block h-10 items-center flex appearance-none bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "block h-10 items-center flex appearance-none bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
      })), /*#__PURE__*/React.createElement("div", {
        title: this.props.description,
        className: "w-2/6 relative"
      }, /*#__PURE__*/React.createElement("div", {
        tabIndex: "1",
        className: "outline-none w-full",
        onBlur: this.handleTouch.bind(this, "unitValue"),
        onClick: () => this.handleOpenDropList()
      }, /*#__PURE__*/React.createElement("div", {
        disabled: true,
        title: this.props.description,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.errorUnit ? this.props.unitValue !== "" ? "truncate items-center flex cursor-pointer block h-10 appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "truncate items-center flex cursor-pointer block h-10 appearance-none w-full bg-gray-200 border border-red-500 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : this.props.unitValue !== "" ? "truncate items-center flex cursor-pointer block h-10 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "truncate items-center flex cursor-pointer block h-10 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
      }, this.props.unitValue === "" ? "Selecione uma opção..." : this.props.unitValue)), this.state.showDropdown && dropList, /*#__PURE__*/React.createElement("div", {
        className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faCaretDown
      })), this.props.unitValue !== "" && /*#__PURE__*/React.createElement("div", {
        onClick: () => this.handleClearSelectedUnit(),
        className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center px-10 text-gray-400 hover:text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faTimes
      }))));
    } else if (!this.props.editMode) {
      quantityRange = /*#__PURE__*/React.createElement("div", {
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
        className: "block items-center flex h-10 appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
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
        className: "block items-center flex h-10 appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
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
    }), quantityRange, (this.props.errorStart || this.props.errorEnd || this.props.errorUnit) && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.errorStart || this.props.errorEnd || this.props.errorUnit
    })));
  }

}

_defineProperty(QuantityRangeComponent, "contextType", CombinedContext);

const QuantityRange = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(QuantityRangeComponent, props));
};

export default QuantityRange;