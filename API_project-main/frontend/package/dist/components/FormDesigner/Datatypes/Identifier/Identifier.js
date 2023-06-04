function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import flow from "lodash/flow";
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";

class IdentifierComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", (event, identifierId = -1) => {
      let value = event.target.value;
      let val = {};

      if (this.props.value.constructor === Object && Object.keys(this.props.value).length > 0) {
        val.id = event.target.value;
        val.issuer = this.props.value.issuer;
        val.type = this.props.value.type;
      }

      if (identifierId > -1) {
        let fields = [...this.props.value];
        fields.forEach(function (field) {
          if (field.identifierId === identifierId) {
            field.value = event.target.value;
          }
        });
        this.props.onIdentifierChange(this.props.pathLabel, fields);
      } else {
        this.props.value.constructor === Object && Object.keys(this.props.value).length > 0 ? this.props.onIdentifierChange(this.props.pathLabel, val) : this.props.onIdentifierChange(this.props.pathLabel, value);
      }
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
    let identifier = null;

    if (this.props.value.constructor === Object && Object.keys(this.props.value).length > 0) {
      identifier = /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row justify-between items-end"
      }, /*#__PURE__*/React.createElement("div", {
        className: "w-3/4 flex flex-col mr-2"
      }, /*#__PURE__*/React.createElement("input", {
        title: this.props.description,
        placeholder: "Insira um valor...",
        value: this.props.value.id,
        onChange: event => this.handleChange(event),
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 flex items-center appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
      })), /*#__PURE__*/React.createElement("div", {
        title: "Informa\xE7\xE3o complementar do identificador",
        className: "w-1/4 h-10 flex flex-col bg-gray-100 border border-gray-200"
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
        value: this.props.value,
        onChange: event => this.handleChange(event),
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 flex items-center appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
      });
    } else if (Array.isArray(this.props.value)) {
      identifier = this.props.value.map((value, index) => /*#__PURE__*/React.createElement("div", {
        key: index
      }, /*#__PURE__*/React.createElement("input", {
        title: this.props.description,
        placeholder: "Insira um valor...",
        value: value.value,
        onChange: event => this.handleChange(event, value.identifierId),
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: value.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 flex items-center appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
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

    const dndStyle = style(this.context.composition.openCompositionPlanningPath === this.props.path, this.props.isDragging, this.props.isOver, this.props.canDrop, true, this.props.isAny, this.props.showLabel, this.context.order, this.props.path, this.props.getItem);
    return this.props.connectDragSource && this.props.connectDropTarget && this.props.connectDragSource(this.props.connectDropTarget( /*#__PURE__*/React.createElement("div", {
      style: {
        order: this.props.order,
        opacity: dndStyle.opacity,
        boxShadow: dndStyle.boxShadow,
        borderWidth: dndStyle.borderWidth,
        borderStyle: dndStyle.borderStyle,
        backgroundColor: this.context.composition.openCompositionPlanningPath === this.props.path ? this.context.theme.themePalette.$100 : dndStyle.backgroundColor,
        marginTop: dndStyle.marginTop,
        marginBottom: dndStyle.marginBottom,
        borderColor: this.context.composition.openCompositionPlanningPath === this.props.path ? this.context.theme.themePalette.$300 : dndStyle.borderColor,
        width: this.context.sizes.sizes[this.props.path] ? this.context.sizes.sizes[this.props.path] : "100%"
      },
      className: ComponentsStyle.itemContainerRoot
    }, /*#__PURE__*/React.createElement(ToolBarDesigner, {
      path: this.props.path,
      datatype: "DV_IDENTIFIER",
      isRM: this.props.isRM,
      showDatatype: false
    }), /*#__PURE__*/React.createElement(FieldContainer, {
      path: this.props.path,
      datatype: this.props.item.dataType
    }, /*#__PURE__*/React.createElement(Label, {
      showLabel: this.props.showLabel,
      label: this.props.label,
      editMode: true,
      optional: this.props.optional,
      sectionOccurrence: this.props.sectionOccurrence
    }), identifier))));
  }

}

_defineProperty(IdentifierComponent, "contextType", CombinedContext);

class Identifier extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(IdentifierComponent, this.props));
  }

}

export default flow(DragSource("form", fieldSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  getItem: monitor.getItem()
})), DropTarget("form", fieldTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})))(Identifier);