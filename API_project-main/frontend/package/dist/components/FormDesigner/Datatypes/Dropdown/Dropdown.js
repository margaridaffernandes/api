function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faCaretDown, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

class DropdownComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      width: 0,
      showDropdown: false
    });

    _defineProperty(this, "handleClickOutside", event => {
      if (this.dropContainer.current && !this.dropContainer.current.contains(event.target)) {
        this.setState({
          showDropdown: false
        });
      }
    });

    _defineProperty(this, "handleOpenDropList", () => {
      this.setState({
        showDropdown: true
      });
    });

    _defineProperty(this, "handleChange", obj => {
      this.setState({
        showDropdown: false
      });
      this.props.onDropdownChange(this.props.pathLabel, obj);
    });

    _defineProperty(this, "handleClearSelectedValue", () => {
      this.props.onDropdownChange(this.props.pathLabel, "");
    });

    _defineProperty(this, "handleResize", event => {
      const width = this.divElement.clientWidth;
      this.setState({
        width
      });
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    document.documentElement.style.setProperty('--drop-item-color', this.context.theme.themePalette.$100);
    let dropdown = null;
    let dropListHeigth = {
      1: "h-8",
      2: "h-16",
      3: "h-24"
    };
    let dropList;
    dropList = /*#__PURE__*/React.createElement("div", {
      ref: this.dropContainer,
      style: {
        zIndex: 99999999
      },
      className: dropListHeigth[this.props.items.length] ? dropListHeigth[this.props.items.length] + " w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
    }, this.props.items.map((elemento, index) => {
      return /*#__PURE__*/React.createElement("div", {
        id: "DropItem",
        onClick: () => this.handleChange(elemento),
        key: index,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.value.code === elemento.code ? "duration-300 relative flex items-center bg-blue-100 text-gray-700 leading-tight h-8 px-4 hover:outline" : "duration-300 relative flex items-center bg-white text-gray-700 leading-tight h-8 px-4 hover:outline"
      }, elemento.text, this.props.value.code === elemento.code && /*#__PURE__*/React.createElement("div", {
        className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faCheck
      })));
    }));
    dropdown = /*#__PURE__*/React.createElement("div", {
      className: "relative w-full"
    }, this.props.items.length > 0 ?
    /*#__PURE__*/
    // REMOVER O SEGUNDO SELECT QUANDO NÃO HOUVER POSSIBILIDADE DO ITEMSLIST ESTAR VAZIO
    React.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: "1",
      className: "outline-none",
      onClick: () => this.handleOpenDropList()
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: "1",
      disabled: true,
      title: this.props.description,
      className: "truncate flex items-center cursor-pointer block h-10 appearance-none w-full bg-gray-100 border border-gray-200 px-4 py-2 rounded-sm focus:outline-none focus:bg-white focus:border-gray-300"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: this.props.value !== "" ? "text-gray-700 leading-tight" : "text-gray-500 leading-tight"
    }, this.props.value === "" ? "Selecione uma opção..." : this.props.value.text))), this.state.showDropdown && dropList) : /*#__PURE__*/React.createElement("select", {
      title: this.props.description,
      value: this.props.value,
      onChange: this.handleChange,
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "truncate flex items-center cursor-pointer block h-10 appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }, /*#__PURE__*/React.createElement("option", {
      value: "",
      disabled: true,
      defaultValue: true,
      hidden: true
    }, "Selecione uma op\xE7\xE3o...")), /*#__PURE__*/React.createElement("div", {
      className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faCaretDown
    })), this.props.value !== "" && /*#__PURE__*/React.createElement("div", {
      onClick: () => this.handleClearSelectedValue(),
      className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center px-10 text-gray-400 hover:text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faTimes
    })));
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
      isRM: this.props.isRM,
      showLabel: this.props.showLabel,
      label: this.props.label,
      editMode: true,
      optional: this.props.optional,
      sectionOccurrence: this.props.sectionOccurrence
    }), dropdown))));
  }

}

_defineProperty(DropdownComponent, "contextType", CombinedContext);

class Dropdown extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(DropdownComponent, this.props));
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
})))(Dropdown);