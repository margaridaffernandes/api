function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CombinedContext from "../../../../contexts/CombinedContext";
import { DragSource, DropTarget } from "react-dnd";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import flow from "lodash/flow";
import { DVDATEIcon, DVTIMEIcon, DVTEXTIcon, DVDATETIMEIcon, DVCODEDTEXTIcon } from "../../../../assets/icons/svg_icons";

class DraggableItemComponent extends Component {
  render() {
    const {
      internalPath,
      dataType,
      itemName
    } = this.props.data;
    let icon;

    switch (dataType) {
      case "DV_TEXT":
        icon = /*#__PURE__*/React.createElement(DVTEXTIcon, null);
        break;

      case "DV_CODED_TEXT":
        icon = /*#__PURE__*/React.createElement(DVCODEDTEXTIcon, null);
        break;

      case "DV_DATE":
        icon = /*#__PURE__*/React.createElement(DVDATEIcon, null);
        break;

      case "DV_DATE_TIME":
      case "DV_INTERVAL<DV_DATE_TIME>":
        icon = /*#__PURE__*/React.createElement(DVDATETIMEIcon, null);
        break;

      case "DV_TIME":
        icon = /*#__PURE__*/React.createElement(DVTIMEIcon, null);
        break;

      default:
        icon = /*#__PURE__*/React.createElement(DVTEXTIcon, null);
        break;
    }

    document.documentElement.style.setProperty('--icon-hover', this.context.theme.themePalette.$200);
    document.documentElement.style.setProperty('--component-border-hover', this.context.theme.themePalette.$200);
    return this.props.connectDragSource && this.props.connectDropTarget && this.props.connectDragSource(this.props.connectDropTarget( /*#__PURE__*/React.createElement("div", {
      id: "dragItem",
      "data-title": internalPath,
      style: {
        backgroundColor: this.props.isDragging && this.context.theme.themePalette.$100 + "52"
      },
      className: "componentBorder my-2 bg-gray-100 rounded-sm border border-transparent p-2 cursor-pointer flex flex-row items-center hover:bg-white"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex w-5 h-5 pr-1 mr-2",
      style: {
        fill: '#718096'
      }
    }, icon), /*#__PURE__*/React.createElement("span", {
      className: "uppercase font-bold text-gray-600 text-11 xl:text-xs xxl:text-13 xxxl:text-13-5 xxxxl:text-14 xxxxxl:text-15"
    }, itemName), /*#__PURE__*/React.createElement("div", {
      className: "flex ml-auto right-0"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      id: "iconFa",
      style: {
        width: "17px",
        height: "17px"
      },
      icon: faGripVertical
    })))));
  }

}

_defineProperty(DraggableItemComponent, "contextType", CombinedContext);

class DraggableItem extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(DraggableItemComponent, this.props));
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
})))(DraggableItem);