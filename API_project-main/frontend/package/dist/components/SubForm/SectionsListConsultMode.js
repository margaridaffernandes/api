function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import FontSizesContext from "../../contexts/FontContext";
import FieldContainer from "../UI/FieldContainer/FieldContainer"; // PARTE DOS PARTICIPANTES A RETIRAR UM DIA => FUI OBRIGADA A PÔR A LA PATA

const heights = {
  1: "h-12",
  2: "h-24",
  3: "h-32"
};

class SectionsListConsultMode extends Component {
  render() {
    return /*#__PURE__*/React.createElement(FieldContainer, null, /*#__PURE__*/React.createElement("div", {
      className: "flex w-full flex-col"
    }, this.props.sections ? this.props.sections.length !== 0 ? /*#__PURE__*/React.createElement("div", {
      className: heights[this.props.sections.length] ? heights[this.props.sections.length] + " overflow-y-auto" : "h-40 overflow-y-auto"
    }, this.props.sections.map((section, index) => {
      let label = "";

      if (this.props.jdt.node.text === "Participantes") {
        try {
          if (section.values["items.0.0.items.12.items.0.items.0.items.0.value"].text !== undefined) {
            label = section.values["items.0.0.items.12.items.0.items.0.items.0.value"].text;
          } else {
            label = this.props.jdt.node.text + " " + section.id;
          }
        } catch (e) {
          label = this.props.jdt.node.text + " " + section.id;
        }
      } else {
        label = this.props.jdt.node.text + " " + section.id;
      }

      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: index + 1 === this.props.sections.length ? "duration-500 flex w-full content-between cursor-default flex-row items-center rounded-sm bg-gray-200 h-12 border border-gray-400 hover:shadow" : "duration-500 flex w-full content-between cursor-default flex-row items-center rounded-sm bg-gray-200 h-12 border border-gray-400 hover:shadow mb-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex pl-4 flex-col"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-gray-700 leading-tight"
      }, label)), /*#__PURE__*/React.createElement("div", {
        className: "flex px-4 ml-auto"
      }, /*#__PURE__*/React.createElement("div", {
        onClick: () => this.props.onConsultSection(this.props.jdt, section.values, this.props.sectionPath),
        title: "Consultar",
        className: "duration-500 cursor-pointer text-gray-400 hover:text-blue-400 pr-4"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "1x",
        icon: faEye
      }))));
    })) : /*#__PURE__*/React.createElement("div", {
      className: "text-gray-700 leading-tight text-center"
    }, "N\xE3o existem itens nesta sec\xE7\xE3o...") : /*#__PURE__*/React.createElement("div", {
      className: "text-gray-700 leading-tight text-center"
    }, "N\xE3o existem itens nesta sec\xE7\xE3o...")));
  }

}

_defineProperty(SectionsListConsultMode, "contextType", FontSizesContext);

export default SectionsListConsultMode;