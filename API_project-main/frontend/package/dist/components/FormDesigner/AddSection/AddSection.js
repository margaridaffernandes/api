function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import Modal from "../UI/Modal/Modal";

class AddSectionComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      sectionName: "",
      status: "add"
    });

    _defineProperty(this, "handleChange", e => {
      this.setState({
        sectionName: e.target.value
      });
    });

    _defineProperty(this, "handleRemove", () => {
      this.context.sectionArchetype.handleRemoveSectionArchetype(this.context.sectionArchetype.openSectionArchetypeData.path);
    });

    _defineProperty(this, "handleSubmit", () => {
      if (this.state.status === "add") {
        this.context.sectionArchetype.handleSectionArchetype(this.state.sectionName, this.context.sectionArchetype.openSectionArchetypeData.parentName, this.context.sectionArchetype.openSectionArchetypeData.parentPath, this.context.sectionArchetype.openSectionArchetypeData.parentOrder);
      } else if (this.state.status === "edit") {
        this.context.sectionArchetype.handleEditSectionArchetype("edit", this.context.sectionArchetype.openSectionArchetypeData.path, this.state.sectionName);
      }
    });
  }

  componentDidMount() {
    // Se não há path é porque estamos a criar uma nova section, senão estamos a editar
    if (this.context.sectionArchetype.openSectionArchetypeData.path) {
      this.setState({
        sectionName: this.context.sectionArchetype.sectionArchetype[this.context.sectionArchetype.openSectionArchetypeData.path].sectionName,
        status: "edit"
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(Modal, {
      title: "Seccionar o Arqu\xE9tipo",
      padding: "px-4 py-4",
      bottom: null,
      hasButtonRemove: this.state.status === "edit" ? true : false,
      onRemove: () => this.handleRemove(),
      onCancelChanges: () => this.context.sectionArchetype.handleOpenSectionArchetype(),
      disabled: this.state.sectionName === "" ? true : false,
      onClosed: () => this.handleSubmit()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "400px"
      },
      className: "flex flex-col items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex w-full flex-row mb-4"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-11 xxl:text-xs font-bold text-gray-700 leading-tight"
    }, "Nome do Arqu\xE9tipo:"), /*#__PURE__*/React.createElement("p", {
      className: "ml-1 text-11 xxl:text-xs text-gray-700 leading-tight"
    }, this.context.sectionArchetype.openSectionArchetypeData.parentName)), /*#__PURE__*/React.createElement("div", {
      className: "flex w-full flex-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex w-full flex-row mb-2 items-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-11 xxl:text-xs font-bold text-gray-700 leading-tight"
    }, "Nome do Seccionamento"), /*#__PURE__*/React.createElement("p", {
      className: "font-bold text-red-500 text-xs ml-1"
    }, "*")), /*#__PURE__*/React.createElement("input", {
      className: "w-full py-2 px-2 flex text-gray-700 leading-tight text-11 xxl:text-xs outline-none bg-gray-200 border border-gray-200 focus:bg-white focus:border-gray-300",
      value: this.state.sectionName,
      placeholder: "Insira um nome...",
      onChange: e => this.handleChange(e)
    }))));
  }

}

_defineProperty(AddSectionComponent, "contextType", CombinedContext);

const AddSection = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(AddSectionComponent, props));
};

export default AddSection;