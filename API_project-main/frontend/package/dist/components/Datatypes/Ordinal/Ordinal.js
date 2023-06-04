function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import { processInternalFunctions } from "../../../assets/functions/InternalFuntions/processInternalFunctions";

class OrdinalComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      showDropdown: false,
      affectedFields: [],
      oldValue: ""
    });

    _defineProperty(this, "handleClickOutside", event => {
      if (this.dropContainer.current && !this.dropContainer.current.contains(event.target)) {
        this.setState({
          showDropdown: false
        });
      }
    });

    _defineProperty(this, "handleOpenDropList", () => {
      this.setState({
        showDropdown: true
      });
    });

    _defineProperty(this, "handleChange", item => {
      this.context.fields.updateValue(this.props.pathLabel);
      this.setState({
        showDropdown: false
      });
      this.props.onOrdinalChange(this.props.pathLabel, item);
      this.handleInternalFunctions(item.value); // Atualizar o oldValue

      this.setState({
        oldValue: item
      });
    });

    _defineProperty(this, "handleClearSelectedValue", () => {
      this.context.fields.updateValue(this.props.pathLabel);
      this.props.onOrdinalChange(this.props.pathLabel, "");
      this.handleInternalFunctions(""); // Atualizar o oldValue

      this.setState({
        oldValue: ""
      });
    });

    _defineProperty(this, "handleInternalFunctions", currentValue => {
      // VER SE É NECESSÁRIO ATUALIZAR OUTROS CAMPOS
      if (this.state.affectedFields.length > 0) {
        this.state.affectedFields.forEach(obj => {
          const data = {
            [obj.functionName]: {}
          };
          Object.keys(obj.parameters).forEach(param => {
            if (obj.parameters[param] === null) {
              if (param === "newValue") {
                data[obj.functionName][param] = currentValue;
              } else if (param === "oldValue") {
                if (this.state.oldValue !== undefined || this.state.oldValue !== "") {
                  data[obj.functionName][param] = this.state.oldValue.value;
                } else {
                  data[obj.functionName][param] = "";
                }
              }
            } else {
              const path = obj.parameters[param].split(".").join("-");
              data[obj.functionName][param] = this.props.values[path];
            }
          });
          const newValue = processInternalFunctions(obj.functionName, data);
          Object.keys(obj.affectedFields).forEach(path => {
            const newPath = path.split(".").join("-");

            if (obj.affectedFields[path].datatype === "DV_COUNT" && obj.affectedFields[path].upperOccurrences === 1) {
              this.props.onOrdinalChange(newPath, newValue.toString());
              this.context.fields.updateValue(newPath);
            }
          });
        });
      }
    });

    _defineProperty(this, "handleTouch", () => {
      this.props.onTouch(this.props.pathLabel);
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside); // A definir o oldValue logo no início

    this.setState({
      oldValue: this.props.value
    }); // A processar se ser internal functions em que o campo vai afetar os campos

    if (Array.isArray(this.props.internalFunctions)) {
      if (this.props.internalFunctions.length > 0) {
        this.props.internalFunctions.forEach(obj => {
          // VER SE HÁ CAMPOS QUE DEPENDEM DO VALOR DESTE
          if (obj.affectedFields) {
            this.setState(prevState => ({
              affectedFields: [obj, ...prevState.affectedFields]
            }));
          }
        });
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    let ordinal = null;
    let dropListHeigth = {
      1: "h-8",
      2: "h-16",
      3: "h-24"
    };
    let dropList;

    if (this.props.editMode) {
      dropList = /*#__PURE__*/React.createElement("div", {
        ref: this.dropContainer,
        style: {
          zIndex: 99999999
        },
        className: dropListHeigth[this.props.items.length] ? dropListHeigth[this.props.items.length] + " w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
      }, this.props.items.map((elemento, index) => {
        return /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(elemento),
          key: index,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.value.code === elemento.code ? "duration-300 relative flex items-center bg-blue-100 text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100" : "duration-300 relative flex items-center bg-white text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100"
        }, elemento.text, this.props.value.code === elemento.code && /*#__PURE__*/React.createElement("div", {
          className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faCheck
        })));
      }));
    }

    if (this.props.editMode) {
      ordinal = /*#__PURE__*/React.createElement("div", {
        className: "w-full relative"
      }, /*#__PURE__*/React.createElement("div", {
        className: "relative"
      }, /*#__PURE__*/React.createElement("div", {
        tabIndex: "1",
        className: "outline-none",
        onBlur: this.handleTouch.bind(this),
        onClick: () => this.handleOpenDropList()
      }, /*#__PURE__*/React.createElement("div", {
        disabled: true,
        title: this.props.description,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.error ? this.props.value !== "" ? "cursor-pointer flex items-center block h-10 appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "cursor-pointer flex items-center block h-10 appearance-none w-full bg-gray-200 border border-red-500 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : this.props.value !== "" ? "cursor-pointer flex items-center block h-10 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "cursor-pointer flex items-center block h-10 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
      }, this.props.value === "" ? "Selecione uma opção..." : this.props.value.text)), this.state.showDropdown && dropList), /*#__PURE__*/React.createElement("div", {
        className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faCaretDown
      })), this.props.value !== "" && /*#__PURE__*/React.createElement("div", {
        onClick: () => this.handleClearSelectedValue(),
        className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center px-10 text-gray-400 hover:text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faTimes
      })));
    } else {
      ordinal = /*#__PURE__*/React.createElement("div", {
        title: this.props.description,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block h-10 flex items-center overflow-auto appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
      }, this.props.value);
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
    }), ordinal, this.props.error && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.error
    })));
  }

}

_defineProperty(OrdinalComponent, "contextType", CombinedContext);

const Ordinal = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(OrdinalComponent, props));
};

export default Ordinal;