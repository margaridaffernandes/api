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

class CountComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", type => {
      if (type === "add") {
        let value = this.props.value === "" ? 0 : Number(this.props.value) + 1;
        this.props.onCountChange(this.props.pathLabel, value.toString());
      } else if (type === "subtract") {
        let value = Number(this.props.value) - 1 < 0 ? "" : Number(this.props.value) - 1;
        this.props.onCountChange(this.props.pathLabel, value.toString());
      }
    });
  }

  render() {
    let count = null;
    count = /*#__PURE__*/React.createElement("div", {
      className: "w-1/3"
    }, /*#__PURE__*/React.createElement("div", {
      title: this.props.description,
      className: "w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 h-8 rounded-sm bg-white inline-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: this.handleChange.bind(this, "subtract"),
      style: {
        backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
      },
      className: this.props.value === "" ? "duration-500 flex cursor-not-allowed items-center justify-center w-3/12 h-8 rounded-sm opacity-50" : "duration-500 flex items-center cursor-pointer justify-center w-3/12 h-8 rounded-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-bold text-sm text-white mb-1"
    }, "-")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center w-6/12 h-8 cursor-default rounded-sm border-t border-b border-gray-200"
    }, this.props.value !== "" ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "tracking-wide text-gray-700"
    }, this.props.value) : /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "tracking-wide font-bold text-gray-500"
    }, "---")), /*#__PURE__*/React.createElement("div", {
      onClick: this.handleChange.bind(this, "add"),
      style: {
        backgroundColor: Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400
      },
      className: "duration-500 flex items-center cursor-pointer justify-center w-3/12 h-8 rounded-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-bold text-white text-sm mb-1"
    }, "+")))));
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
      datatype: "DV_COUNT",
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
    }), count))));
  }

}

_defineProperty(CountComponent, "contextType", CombinedContext);

class Count extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(CountComponent, this.props));
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
})))(Count);