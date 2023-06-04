function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import flow from "lodash/flow";
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import "../../../../styles/custom.module.css";
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";

class RadioBoxComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", obj => {
      if (obj.code === this.props.value.code) {
        this.props.onRadioChange(this.props.pathLabel, "");
      } else {
        this.props.onRadioChange(this.props.pathLabel, obj);
      }
    });
  }

  render() {
    let radio = null;
    radio = /*#__PURE__*/React.createElement("div", {
      title: this.props.description,
      className: "flex w-full flex-wrap justify-center items-center"
    }, this.props.items.map((elemento, index) => {
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
          backgroundColor: this.props.value.code === elemento.code ? Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400 : "transparent",
          boxShadow: this.props.value.code === elemento.code ? "0px 0px 0px 2px white inset" : null
        },
        className: "transform duration-300 w-4 h-4 inline-block mr-1 rounded-full border border-gray-400 hover:scale-110"
      }), elemento.text));
    }));
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
      datatype: "DV_CODED_TEXT",
      isRM: this.props.isRM,
      showDatatype: true
    }), /*#__PURE__*/React.createElement(FieldContainer, {
      path: this.props.path,
      datatype: this.props.item.dataType
    }, /*#__PURE__*/React.createElement(Label, {
      showLabel: this.props.showLabel,
      label: this.props.label,
      editMode: true,
      optional: this.props.optional,
      sectionOccurrence: this.props.sectionOccurrence
    }), radio))));
  }

}

_defineProperty(RadioBoxComponent, "contextType", CombinedContext);

class RadioBox extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(RadioBoxComponent, this.props));
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
})))(RadioBox);