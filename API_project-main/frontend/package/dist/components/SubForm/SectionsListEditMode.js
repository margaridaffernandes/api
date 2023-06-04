function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import FontSizesContext from "../../contexts/FontContext";
import FieldContainer from "../UI/FieldContainer/FieldContainer";
import ValidationError from "../UI/ValidationError/ValidationError"; // PARTE DOS PARTICIPANTES A RETIRAR UM DIA SE CALHAR => FOI SOLICITADO PARA PÔR A LA PATA

const heights = {
  1: "h-12",
  2: "h-24",
  3: "h-32"
};

class SectionsListEditMode extends Component {
  render() {
    return /*#__PURE__*/React.createElement(FieldContainer, null, /*#__PURE__*/React.createElement("div", {
      className: "flex w-full flex-col"
    }, this.props.sections.occurrences ? /*#__PURE__*/React.createElement("div", {
      className: heights[this.props.sections.occurrences] ? heights[this.props.sections.occurrences] + " overflow-y-auto" : "h-40 overflow-y-auto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full flex flex-col"
    }, this.props.sections.occurrences !== 0 && this.props.sections.values.map((section, index) => {
      let label = "";

      if (this.props.sections.jdt.node.text === "Participantes") {
        try {
          if (section.values["items.0.0.items.12.items.0.items.0.items.0.value"].text !== undefined) {
            label = section.values["items.0.0.items.12.items.0.items.0.items.0.value"].text;
          } else {
            label = this.props.sections.jdt.node.text + " " + section.id;
          }
        } catch (e) {
          label = this.props.sections.jdt.node.text + " " + section.id;
        }
      } else {
        label = this.props.sections.jdt.node.text + " " + section.id;
      }

      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: index + 1 === this.props.sections.values.length ? "duration-500 flex w-full content-between cursor-default flex-row items-center rounded-sm bg-gray-200 h-12 border border-gray-400 hover:shadow" : "duration-500 flex w-full content-between cursor-default flex-row items-center rounded-sm bg-gray-200 h-12 border border-gray-400 mb-4 hover:shadow"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex pl-4 flex-col"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.fontSize.field
        },
        className: "text-gray-700 leading-tight"
      }, label)), /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row ml-auto pr-4"
      }, /*#__PURE__*/React.createElement("div", {
        onClick: () => this.props.onEditSection(this.props.sections.path, section.id),
        title: "Editar",
        className: "duration-500 cursor-pointer text-gray-400 hover:text-blue-400 pr-4"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "1x",
        icon: faEdit
      })), /*#__PURE__*/React.createElement("div", {
        onClick: () => this.props.onRemoveSection(this.props.sections.path, section.id),
        title: "Remover",
        className: "duration-500 cursor-pointer text-gray-400 hover:text-red-500"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "1x",
        icon: faTrashAlt
      }))));
    }))) : /*#__PURE__*/React.createElement("div", {
      className: "h-0"
    }), this.props.error && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.error
    })));
  }

}

_defineProperty(SectionsListEditMode, "contextType", FontSizesContext);

export default SectionsListEditMode;