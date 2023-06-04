function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faCaretDown, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

class QuantityComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      showDropdown: false
    });

    _defineProperty(this, "handleChange", (event, type) => {
      if (type === "unit") {
        this.props.onQuantityChange(this.props.pathLabelUnit, event);
        this.setState({
          showDropdown: false
        });
      } else if (type === "quantity") {
        this.props.onQuantityChange(this.props.pathLabelQuantity, event.target.value);
      }
    });

    _defineProperty(this, "handleOpenDropList", () => {
      this.setState({
        showDropdown: true
      });
    });

    _defineProperty(this, "handleClearSelectedUnit", () => {
      this.props.onQuantityChange(this.props.pathLabelUnit, "");
    });

    _defineProperty(this, "handleClickOutside", event => {
      if (this.dropContainer.current && !this.dropContainer.current.contains(event.target)) {
        this.setState({
          showDropdown: false
        });
      }
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    let quantity = null;
    document.documentElement.style.setProperty('--drop-item-color', this.context.theme.themePalette.$100);
    let dropListHeigth = {
      1: "h-8",
      2: "h-16",
      3: "h-24"
    };
    let dropList = /*#__PURE__*/React.createElement("div", {
      ref: this.dropContainer,
      style: {
        zIndex: 99999999
      },
      className: dropListHeigth[this.props.unitsList.length] ? dropListHeigth[this.props.unitsList.length] + " w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
    }, this.props.unitsList.map((item, index) => {
      return /*#__PURE__*/React.createElement("div", {
        id: "DropItem",
        onClick: () => this.handleChange(item, "unit"),
        key: index,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.valueUnit === item ? "duration-300 relative flex items-center bg-blue-100 text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100" : "duration-300 relative flex items-center bg-white text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100"
      }, item, this.props.valueUnit === item && /*#__PURE__*/React.createElement("div", {
        className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faCheck
      })));
    }));
    quantity = /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-end"
    }, /*#__PURE__*/React.createElement("input", {
      title: this.props.description,
      placeholder: "Insira um valor...",
      value: this.props.valueQuantity,
      onChange: event => this.handleChange(event, "quantity"),
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "block h-10 items-center flex appearance-none w-1/2 bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative ml-2 w-1/2"
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: "1",
      className: "outline-none",
      onClick: () => this.handleOpenDropList()
    }, /*#__PURE__*/React.createElement("div", {
      disabled: true,
      title: this.props.description,
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: this.props.valueUnit !== "" ? "cursor-pointer items-center flex block h-10 appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "cursor-pointer items-center flex block h-10 appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }, this.props.valueUnit === "" ? "Selecione uma opção..." : this.props.valueUnit)), this.state.showDropdown && dropList, /*#__PURE__*/React.createElement("div", {
      className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faCaretDown
    })), this.props.valueUnit !== "" && /*#__PURE__*/React.createElement("div", {
      onClick: () => this.handleClearSelectedUnit(),
      className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center px-10 text-gray-400 hover:text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faTimes
    }))));
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
      label: this.props.label,
      editMode: true,
      optional: this.props.optional,
      showLabel: this.props.showLabel,
      sectionOccurrence: this.props.sectionOccurrence
    }), quantity))));
  }

}

_defineProperty(QuantityComponent, "contextType", CombinedContext);

class Quantity extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(QuantityComponent, this.props));
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
})))(Quantity);