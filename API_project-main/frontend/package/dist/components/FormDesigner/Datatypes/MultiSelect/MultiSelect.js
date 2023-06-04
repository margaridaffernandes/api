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

class MultiSelectComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "inputContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      showDropdown: false,
      height: null
    });

    _defineProperty(this, "handleOpenDropList", () => {
      this.setState({
        showDropdown: true
      });
    });

    _defineProperty(this, "handleClickOutside", event => {
      if (this.dropContainer.current && !this.dropContainer.current.contains(event.target)) {
        this.setState({
          showDropdown: false
        });
      }
    });

    _defineProperty(this, "handleChange", item => {
      if (this.props.value.indexOf(item) > -1) {
        // Remover
        let value = [...this.props.value].filter(option => option.code !== item.code);
        this.props.onMultiselectChange(this.props.pathLabel, value);
      } else {
        // Adicionar
        let value = [...this.props.value];
        this.props.onMultiselectChange(this.props.pathLabel, [...value, item]);
      }
    });

    _defineProperty(this, "handleRemoveItem", (event, obj) => {
      event.stopPropagation();
      let value = [...this.props.value].filter(option => option.code !== obj.code);
      this.props.onMultiselectChange(this.props.pathLabel, value);
    });

    _defineProperty(this, "handleClearAll", () => {
      this.props.onMultiselectChange(this.props.pathLabel, []);
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      height: this.inputContainer.current.offsetHeight
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate() {
    if (this.state.height !== this.inputContainer.current.offsetHeight) {
      this.setState({
        height: this.inputContainer.current.offsetHeight
      });
    }
  }

  render() {
    let multiselect = null;
    let dropListHeigth = {
      1: "h-8",
      2: "h-16",
      3: "h-24"
    };
    const focusedStyle = this.state.showDropdown ? "bg-white border-gray-300" : "bg-gray-200 border-gray-200";
    const itemStyle = this.state.showDropdown ? "bg-gray-200 border-gray-300" : "bg-white border-gray-300";
    let dropList = /*#__PURE__*/React.createElement("div", {
      style: {
        zIndex: 99999999,
        marginTop: this.state.height
      },
      ref: this.dropContainer,
      className: dropListHeigth[this.props.items.length] ? dropListHeigth[this.props.items.length] + " w-full absolute inset-y-0 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
    }, this.props.items.map((elemento, index) => {
      return /*#__PURE__*/React.createElement("div", {
        onClick: () => this.handleChange(elemento),
        key: index,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.value.filter(obj => obj.code === elemento.code).length > 0 ? "duration-300 bg-blue-100 hover:bg-blue-100 relative flex items-center text-gray-700 leading-tight h-8 px-4 hover:outline" : "duration-300 bg-white hover:bg-blue-100 flex items-center text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-gray-200"
      }, elemento.text, this.props.value.filter(obj => obj.code === elemento.code).length > 0 && /*#__PURE__*/React.createElement("div", {
        className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faCheck
      })));
    }));
    multiselect = /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: "1",
      className: "outline-none",
      ref: this.inputContainer,
      onClick: () => this.handleOpenDropList()
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: "1",
      disabled: true,
      title: this.props.description,
      style: {
        minHeight: "2.5rem",
        fontSize: this.context.font.fontSize.field
      },
      className: this.props.value.length !== 0 ? "flex flex-row flex-wrap items-center cursor-pointer block appearance-none w-full border text-gray-700 px-1 rounded-sm leading-tight focus:outline-none " + focusedStyle : "flex flex-row flex-wrap items-center cursor-pointer block appearance-none w-full border text-gray-500 px-4 rounded-sm leading-tight focus:outline-none " + focusedStyle
    }, this.props.value.length === 0 ? "Selecione opções..." : this.props.value.map((obj, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: index === this.props.value.length - 1 ? "mr-12 my-1 flex flex-row items-center rounded-sm shadow-xs py-1 px-1 border " + itemStyle : "mr-1 my-1 flex flex-row items-center rounded-sm shadow-xs py-1 px-1 border " + itemStyle
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "text-gray-700"
      }, obj.text), /*#__PURE__*/React.createElement("div", {
        onClick: event => this.handleRemoveItem(event, obj),
        className: "duration-500 flex items-center cursor-pointer ml-2 mr-1 text-gray-400 hover:text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faTimes
      })));
    }))), this.state.showDropdown && dropList, /*#__PURE__*/React.createElement("div", {
      className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faCaretDown
    })), this.props.value.length > 0 && /*#__PURE__*/React.createElement("div", {
      onClick: () => this.handleClearAll(),
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
      showLabel: this.props.showLabel,
      label: this.props.label,
      editMode: true,
      optional: this.props.optional,
      sectionOccurrence: this.props.sectionOccurrence
    }), multiselect))));
  }

}

_defineProperty(MultiSelectComponent, "contextType", CombinedContext);

class MultiSelect extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(MultiSelectComponent, this.props));
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
})))(MultiSelect);