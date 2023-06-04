function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import flow from "lodash/flow";
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../styles/ComponentsStyle";
import SectionLabel from "../../UI/SectionLabel/SectionLabel";
import { fieldSource } from "../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../SpecificationMethods/Target/fieldTarget";
import { style } from "../Style/Style";
import ToolBarDesigner from "../Toolbar/Toolbar";

class AddSectionContainerDndComponent extends Component {
  render() {
    const dndStyle = style(false, this.props.isDragging, this.props.isOver, this.props.canDrop, true, this.props.isAny, this.props.showLabel, this.context.order, this.props.path, this.props.getItem);
    return this.props.connectDragSource && this.props.connectDropTarget && this.props.connectDragSource(this.props.connectDropTarget( /*#__PURE__*/React.createElement("div", {
      style: {
        order: this.props.order,
        opacity: dndStyle.opacity,
        boxShadow: dndStyle.boxShadow,
        borderWidth: dndStyle.borderWidth,
        borderStyle: dndStyle.borderStyle,
        backgroundColor: this.context.composition.openCompositionPlanningPath === this.props.path ? this.context.theme.themePalette.$100 : dndStyle.backgroundColor,
        marginTop: dndStyle.marginTop,
        padding: dndStyle.padding,
        marginBottom: dndStyle.marginBottom,
        borderColor: this.context.composition.openCompositionPlanningPath === this.props.path ? this.context.theme.themePalette.$300 : dndStyle.borderColor,
        width: this.context.sizes.sizes[this.props.path] ? this.context.sizes.sizes[this.props.path] : "100%"
      },
      className: ComponentsStyle.defaultSectionContainerRoot
    }, /*#__PURE__*/React.createElement("div", {
      className: "px-2"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderColor: "#e2e8f0",
        paddingTop: ComponentsStyle.defaultSectionContainerYPadding,
        paddingBottom: ComponentsStyle.defaultSectionContainerYPadding
      },
      className: `flex flex-row ${this.context.font.fontAlignment.sectionTitle} ${ComponentsStyle.addSectionContainer}`
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      isMandatory: false,
      label: this.props.label,
      color: "text-gray-600"
    }), /*#__PURE__*/React.createElement(ToolBarDesigner, {
      isAddSection: true,
      isSection: false,
      path: this.props.path,
      showDatatype: false
    }))))));
  }

}

_defineProperty(AddSectionContainerDndComponent, "contextType", CombinedContext);

class AddSectionContainerDnd extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(AddSectionContainerDndComponent, this.props));
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
})))(AddSectionContainerDnd);