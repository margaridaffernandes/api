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

class BooleanComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", value => {
      this.props.onBooleanChange(this.props.pathLabel, value);
    });
  }

  render() {
    let boolean = null;
    boolean = /*#__PURE__*/React.createElement("div", {
      title: this.props.description,
      className: "w-40 cursor-pointer h-8 rounded-sm bg-gray-100 inline-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row"
    }, this.props.value === "Sim" ? /*#__PURE__*/React.createElement("div", {
      onClick: this.handleChange.bind(this, ""),
      tabIndex: "1",
      style: {
        backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
      },
      className: "duration-500 flex items-center justify-center w-1/2 h-8 rounded-sm focus:outline-none break-all"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "tracking-wide text-white"
    }, "Sim")) : /*#__PURE__*/React.createElement("div", {
      onClick: this.handleChange.bind(this, "Sim"),
      tabIndex: "1",
      className: "flex items-center justify-center w-1/2 h-8 border-r border-gray-300 rounded-sm focus:outline-none break-all"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "tracking-wide text-gray-500"
    }, "Sim")), this.props.value === "Não" ? /*#__PURE__*/React.createElement("div", {
      onClick: this.handleChange.bind(this, ""),
      tabIndex: "1",
      style: {
        backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
      },
      className: "duration-500 flex items-center justify-center w-1/2 h-8 rounded-sm focus:outline-none break-all"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "tracking-wide text-white"
    }, "N\xE3o")) : /*#__PURE__*/React.createElement("div", {
      onClick: this.handleChange.bind(this, "Não"),
      tabIndex: "1",
      className: "flex items-center justify-center w-1/2 h-8 border-l border-gray-300 rounded-sm focus:outline-none break-all"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "tracking-wide text-gray-500"
    }, "N\xE3o"))));
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
      datatype: "DV_BOOLEAN",
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
    }), boolean))));
  }

}

_defineProperty(BooleanComponent, "contextType", CombinedContext);

class Boolean extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(BooleanComponent, this.props));
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
})))(Boolean);