function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ChevronUp from "../../../UI/ChevronSection/ChevronUp";
import ChevronDown from "../../../UI/ChevronSection/ChevronDown";
import SectionLabel from "../../../UI/SectionLabel/SectionLabel";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import { getWidth } from "../../../../assets/functions/GetWidth/getWidth";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import MultipleOccurrences from "../MultipleOccurrences/MultipleOccurrences";
import { handleCompositionPlanning } from "../../../../assets/functions/handleCompositionPlanning/handleCompositionPlanning";

class SectionContainerDndComponent extends Component {
  render() {
    const dndStyle = style(this.context.composition.openCompositionPlanningPath === this.props.path, this.props.isDragging, this.props.isOver, this.props.canDrop, false);
    let componentStyle;
    let theme;
    let themeColor;
    let margin;

    switch (this.props.section) {
      case 1:
        componentStyle = "";
        theme = this.context.theme[1];
        themeColor = this.context.theme.themePalette.$400;
        break;

      case 2:
        componentStyle = ComponentsStyle.subSectionContainerXPadding;
        theme = this.context.theme[1];
        themeColor = this.context.theme.themePalette.$400;
        break;

      case 3:
        componentStyle = ComponentsStyle.subSubSectionContainerXPadding;
        theme = this.context.theme[2];
        themeColor = this.context.theme.themePalette.$300;
        break;

      case 4:
        componentStyle = ComponentsStyle.subSubSubSectionContainerXPadding;
        theme = this.context.theme[3];
        themeColor = this.context.theme.themePalette.$200;
        break;

      case 5:
        componentStyle = ComponentsStyle.subSubSubSubSectionContainerXPadding;
        theme = this.context.theme[3];
        themeColor = this.context.theme.themePalette.$200;
        break;

      case 6:
        componentStyle = ComponentsStyle.subSubSubSubSubSectionContainerXPadding;
        theme = this.context.theme[3];
        themeColor = this.context.theme.themePalette.$200;
        break;

      default:
        componentStyle = "";
        theme = this.context.theme[3];
        themeColor = this.context.theme.themePalette.$200;
        margin = 1.5 + 0.25 * (this.props.section - 6);
        break;
    }

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
        paddingLeft: this.props.section > 6 ? margin.toString() + "rem" : dndStyle.padding,
        paddingRight: this.props.section > 6 ? margin.toString() + "rem" : dndStyle.padding,
        width: this.context.sizes.sizes[this.props.path] ? this.props.section !== 1 ? this.context.sizes.sizes[this.props.path] : getWidth(this.context.sizes.sizes[this.props.path]) // Transformação do width para w-11/12
        : this.props.section !== 1 ? "100%" : "91.67%"
      },
      className: this.props.section === 1 ? ComponentsStyle.sectionContainerRoot : ComponentsStyle.defaultSectionContainerRoot
    }, /*#__PURE__*/React.createElement("div", {
      className: componentStyle
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => handleCompositionPlanning(e, this.context, this.props.path, "SECTION"),
      title: this.props.description,
      style: {
        borderColor: Array.isArray(this.context.theme) ? theme : themeColor,
        backgroundColor: this.props.section !== 1 ? null : Array.isArray(this.context.theme) ? this.context.theme[1] : this.context.theme.themePalette.$400,
        paddingTop: ComponentsStyle.defaultSectionContainerYPadding,
        paddingBottom: ComponentsStyle.defaultSectionContainerYPadding
      },
      className: `flex flex-row ${this.context.font.fontAlignment.sectionTitle}
                ${this.props.section === 1 ? ComponentsStyle.sectionContainer : ComponentsStyle.defaultSectionContainer}`
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      isMandatory: this.props.isMandatory,
      label: this.props.label,
      color: this.props.section === 1 ? "text-white pl-2" : "text-gray-600"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingLeft: "5.5rem"
      }
    }, /*#__PURE__*/React.createElement(ToolBarDesigner, {
      isSection: true,
      path: this.props.path,
      showDatatype: false
    }), !this.props.accordionOpen && /*#__PURE__*/React.createElement(ChevronDown, {
      onClick: this.props.handleAccordionMode,
      color: this.props.section === 1 ? "text-white" : "text-gray-600"
    }), this.props.accordionOpen && /*#__PURE__*/React.createElement(ChevronUp, {
      onClick: this.props.handleAccordionMode,
      color: this.props.section === 1 ? "text-white" : "text-gray-600"
    })))), this.props.accordionOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        flexFlow: "wrap",
        paddingLeft: this.props.section > 6 ? margin.toString() + "rem" : null,
        paddingRight: this.props.section > 6 ? margin.toString() + "rem" : null
      },
      className: "flex w-full " + componentStyle
    }, this.props.hasManyOccurrences && /*#__PURE__*/React.createElement(MultipleOccurrences, null), this.props.children))));
  }

}

_defineProperty(SectionContainerDndComponent, "contextType", CombinedContext);

class SectionContainerDnd extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(SectionContainerDndComponent, this.props));
  }

}

export default flow(DragSource("form", fieldSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})), DropTarget("form", fieldTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({
    shallow: true
  }),
  canDrop: monitor.canDrop()
})))(SectionContainerDnd);