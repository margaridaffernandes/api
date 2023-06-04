function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import { handleInternalFunctions } from "../../../assets/functions/InternalFuntions/handleInternalFunctions";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";

class IdentifierComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", async (event, identifierId = -1) => {
      let value = event.target.value;
      let val = {};

      if (this.props.value.constructor === Object && Object.keys(this.props.value).length > 0) {
        val.id = event.target.value;
        val.issuer = this.props.value.issuer;
        val.type = this.props.value.type;
      }

      await this.context.fields.updateValue(this.props.pathLabel);

      if (identifierId > -1) {
        let fields = [...this.props.value];
        fields.forEach(function (field) {
          if (field.identifierId === identifierId) {
            field.value = value;
          }
        });
        await this.props.onIdentifierChange(this.props.pathLabel, fields);
      } else {
        this.props.value.constructor === Object && Object.keys(this.props.value).length > 0 ? await this.props.onIdentifierChange(this.props.pathLabel, val) : await this.props.onIdentifierChange(this.props.pathLabel, value);
      } // Ver se internal functions para processar


      if (Array.isArray(this.props.internalFunctions) && this.props.internalFunctions.length > 0) {
        await handleInternalFunctions(this.props.internalFunctions, this.props.onIdentifierChange, this.context.token, this.props.values, this.context.fields);
      }
    });

    _defineProperty(this, "handleTouch", () => {
      this.props.onTouch(this.props.pathLabel);
    });

    _defineProperty(this, "removeField", identifierId => {
      let fields = this.props.value.filter(field => field.identifierId !== identifierId);
      this.props.onIdentifierChange(this.props.pathLabel, fields);
    });

    _defineProperty(this, "addField", () => {
      let maxId = 0;
      this.props.value.forEach(function (field) {
        if (field.identifierId > maxId) {
          maxId = field.identifierId;
        }
      });
      let newField = {
        identifierId: maxId + 1,
        value: ""
      };
      let fields = [...this.props.value];
      this.props.onIdentifierChange(this.props.pathLabel, [...fields, newField]);
    });
  }

  render() {
    let identifier = null; // MODO DE EDIÇÃO

    if (this.props.editMode) {
      if (this.props.value.constructor === Object && Object.keys(this.props.value).length > 0) {
        identifier = /*#__PURE__*/React.createElement("div", {
          className: "flex flex-row justify-between items-end"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-3/4 flex flex-col mr-2"
        }, /*#__PURE__*/React.createElement("input", {
          title: this.props.description,
          placeholder: "Insira um valor para o ID...",
          onBlur: this.handleTouch.bind(this),
          value: this.props.value.id,
          onChange: event => this.handleChange(event),
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.error ? this.props.value.id !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-red-500 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : this.props.value.id !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
        })), /*#__PURE__*/React.createElement("div", {
          title: "Informa\xE7\xE3o complementar do identificador",
          className: "w-1/4 h-10 flex flex-col bg-gray-200 border border-gray-200"
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex flex-row items-center px-4"
        }, /*#__PURE__*/React.createElement("span", {
          className: "text-xs font-bold text-gray-600 pr-2"
        }, "Issuer:"), /*#__PURE__*/React.createElement("span", {
          className: "text-xs text-gray-700 rounded-sm leading-tight"
        }, this.props.value.issuer !== "" && this.props.value.issuer !== null ? this.props.value.issuer : "Sem informação")), /*#__PURE__*/React.createElement("div", {
          className: "flex flex-row items-center px-4"
        }, /*#__PURE__*/React.createElement("span", {
          className: "text-xs font-bold text-gray-600 pr-4"
        }, "Type:"), /*#__PURE__*/React.createElement("span", {
          className: "text-xs text-gray-700 rounded-sm leading-tight"
        }, this.props.value.type !== "" && this.props.value.type !== null ? this.props.value.type : "Sem informação"))));
      } else if (!Array.isArray(this.props.value)) {
        identifier = /*#__PURE__*/React.createElement("input", {
          title: this.props.description,
          placeholder: "Insira um valor...",
          onBlur: this.handleTouch.bind(this),
          value: this.props.value,
          onChange: event => this.handleChange(event),
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.error ? this.props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-red-500 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : this.props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
        });
      } else if (Array.isArray(this.props.value)) {
        identifier = this.props.value.map((value, index) => /*#__PURE__*/React.createElement("div", {
          key: index
        }, /*#__PURE__*/React.createElement("input", {
          title: this.props.description,
          placeholder: "Insira um valor...",
          onBlur: this.handleTouch.bind(this),
          value: value.value,
          onChange: event => this.handleChange(event, value.identifierId),
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.error ? value.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-red-500 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : value.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
        }), /*#__PURE__*/React.createElement("div", {
          className: index === this.props.value.length - 1 ? "flex flex-row justify-between" : "flex flex-row justify-end"
        }, index === this.props.value.length - 1 && /*#__PURE__*/React.createElement("label", {
          onClick: () => this.addField(),
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: "duration-500 block tracking-wide mb-2 pt-2 text-blue-400 cursor-pointer hover:text-blue-500"
        }, "Adicionar"), this.props.value.length > 1 && /*#__PURE__*/React.createElement("label", {
          onClick: () => this.removeField(value.identifierId),
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: "duration-500 block tracking-wide mb-2 pt-2 text-red-500 cursor-pointer hover:text-red-600"
        }, "Remover"))));
      }
    } // MODO DE CONSULTA
    else {
        if (this.props.value.constructor === Object && Object.keys(this.props.value).length > 0) {
          identifier = /*#__PURE__*/React.createElement("div", {
            className: "flex flex-row justify-between items-end"
          }, /*#__PURE__*/React.createElement("div", {
            className: "w-3/4 flex flex-col mr-2"
          }, /*#__PURE__*/React.createElement("input", {
            disabled: true,
            title: this.props.description,
            value: this.props.value.id,
            style: {
              fontSize: this.context.font.fontSize.field
            },
            className: "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
          })), /*#__PURE__*/React.createElement("div", {
            title: "Informa\xE7\xE3o complementar do identificador",
            className: "w-1/4 h-10 flex flex-col bg-white border border-gray-400"
          }, /*#__PURE__*/React.createElement("div", {
            className: "flex flex-row items-center px-4"
          }, /*#__PURE__*/React.createElement("span", {
            className: "text-xs font-bold text-gray-600 pr-2"
          }, "Issuer:"), /*#__PURE__*/React.createElement("span", {
            className: "text-xs text-gray-700 rounded-sm leading-tight"
          }, this.props.value.issuer !== "" && this.props.value.issuer !== null ? this.props.value.issuer : "Sem informação")), /*#__PURE__*/React.createElement("div", {
            className: "flex flex-row items-center px-4"
          }, /*#__PURE__*/React.createElement("span", {
            className: "text-xs font-bold text-gray-600 pr-4"
          }, "Type:"), /*#__PURE__*/React.createElement("span", {
            className: "text-xs text-gray-700 rounded-sm leading-tight"
          }, this.props.value.type !== "" && this.props.value.type !== null ? this.props.value.type : "Sem informação"))));
        } else if (Array.isArray(this.props.value)) {
          identifier = this.props.value.map((value, index) => /*#__PURE__*/React.createElement("input", {
            disabled: true,
            key: index,
            title: this.props.description,
            value: value.value,
            style: {
              fontSize: this.context.font.fontSize.field
            },
            className: index === this.props.value.length - 1 ? "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight" : "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight mb-4"
          }));
        } else if (!Array.isArray(this.props.value)) {
          identifier = /*#__PURE__*/React.createElement("input", {
            disabled: true,
            title: this.props.description,
            value: this.props.value,
            style: {
              fontSize: this.context.font.fontSize.field
            },
            className: "block h-10 flex items-center appearance-none w-full bg-white border border-gray-400 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight"
          });
        }
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
    }), identifier, this.props.error && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.error
    })));
  }

}

_defineProperty(IdentifierComponent, "contextType", CombinedContext);

const Identifier = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(IdentifierComponent, props));
};

export default Identifier;