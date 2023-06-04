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

class QuantitySingleUnitComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", event => {
      if (event.target.value !== "") {
        this.props.onQuantityChange(this.props.pathLabelQuantity, event.target.value);
        this.props.onQuantityChange(this.props.pathLabelUnit, this.props.unitsList[0]);
      } else {
        this.props.onQuantityChange(this.props.pathLabelQuantity, "");
        this.props.onQuantityChange(this.props.pathLabelUnit, "");
      }
    });
  }

  render() {
    let quantity = /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-center"
    }, /*#__PURE__*/React.createElement("input", {
      title: this.props.description,
      placeholder: "Insira um valor...",
      value: this.props.valueQuantity,
      onChange: event => this.handleChange(event),
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "block h-10 items-center flex appearance-none w-1/2 bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "text-gray-700 leading-tight pl-2"
    }, this.props.unitsList[0]));
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
      datatype: "DV_QUANTITY",
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
    }), quantity))));
  }

}

_defineProperty(QuantitySingleUnitComponent, "contextType", CombinedContext);

class QuantitySingleUnit extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(QuantitySingleUnitComponent, this.props));
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
})))(QuantitySingleUnit);