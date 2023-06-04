function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import axios from "axios";
import React, { Component } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import "../../../styles/custom.module.css";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";

class RadioBoxMultipleComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      items: []
    });

    _defineProperty(this, "handleChange", obj => {
      this.context.fields.updateValue(this.props.pathLabel);
      this.handleTouch();

      if (this.props.value.indexOf(obj) > -1) {
        // Remover
        let value = [...this.props.value].filter(option => option.code !== obj.code);
        this.props.onRadioMultipleChange(this.props.pathLabel, value);
      } else {
        // Adicionar
        let value = [...this.props.value];
        this.props.onRadioMultipleChange(this.props.pathLabel, [...value, obj]);
      }
    });

    _defineProperty(this, "handleTouch", () => {
      this.props.onTouch(this.props.pathLabel);
    });
  }

  async componentDidMount() {
    // Se houver um link no Refset, vai buscar os items ao serviço
    if (Array.isArray(this.props.refset) && this.props.refset.length > 0) {
      await axios({
        method: "get",
        url: this.props.refset[0],
        headers: {
          Authorization: `Bearer ${this.context.token}`
        }
      }).then(res => {
        if (res.data.success === true || res.data.success === "true") {
          this.setState({
            items: res.data.concepts
          });
        } else {
          this.setState({
            items: this.props.items
          });
        }
      }).catch(err => {
        this.setState({
          items: this.props.items
        });
      });
    } else {
      this.setState({
        items: this.props.items
      });
    }
  }

  render() {
    let radio = /*#__PURE__*/React.createElement("div", {
      title: this.props.description,
      className: "flex w-full flex-wrap justify-center items-center"
    }, this.state.items.map((elemento, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "flex items-center my-2 mx-2"
      }, /*#__PURE__*/React.createElement("input", {
        onClick: () => this.handleChange(elemento),
        id: this.props.pathLabel + elemento.code,
        type: "radio",
        className: "hidden"
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: this.props.pathLabel + elemento.code,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "flex items-center text-gray-700 leading-tight cursor-pointer"
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          backgroundColor: this.props.value.filter(obj => obj.code === elemento.code).length > 0 ? Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400 : "transparent",
          boxShadow: this.props.value.filter(obj => obj.code === elemento.code).length > 0 ? "0px 0px 0px 2px white inset" : null
        },
        className: "transform duration-300 w-4 h-4 inline-block mr-1 rounded-full border border-gray-400 hover:scale-110"
      }), elemento.text));
    }));
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
    }), radio, this.props.error && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.error
    })));
  }

}

_defineProperty(RadioBoxMultipleComponent, "contextType", CombinedContext);

const RadioBoxMultiple = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(RadioBoxMultipleComponent, props));
};

export default RadioBoxMultiple;