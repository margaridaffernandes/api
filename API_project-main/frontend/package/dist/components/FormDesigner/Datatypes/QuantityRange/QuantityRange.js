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

class QuantityRangeComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      showDropdown: false
    });

    _defineProperty(this, "handleChange", (event, dataType) => {
      if (dataType === "startValue") {
        this.props.onQuantityRangeChange(this.props.pathLabelStart, event.target.value);
      } else if (dataType === "endValue") {
        this.props.onQuantityRangeChange(this.props.pathLabelEnd, event.target.value);
      } else if (dataType === "unitValue") {
        this.setState({
          showDropdown: false
        });
        this.props.onQuantityRangeChange(this.props.pathLabelUnit, event);
      }
    });

    _defineProperty(this, "handleOpenDropList", () => {
      this.setState({
        showDropdown: true
      });
    });

    _defineProperty(this, "handleClearSelectedUnit", () => {
      this.props.onQuantityRangeChange(this.props.pathLabelUnit, "");
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
    let quantityRange = null;
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
        onClick: () => this.handleChange(item, "unitValue"),
        key: index,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.unitValue === item ? "duration-300 relative flex items-center bg-blue-100 text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100" : "duration-300 relative flex items-center bg-white text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100"
      }, item, this.props.unitValue === item && /*#__PURE__*/React.createElement("div", {
        className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faCheck
      })));
    }));
    quantityRange = /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-end"
    }, /*#__PURE__*/React.createElement("div", {
      title: this.props.description,
      className: "w-2/6 flex flex-col mr-2"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
    }, "Valor M\xEDnimo"), /*#__PURE__*/React.createElement("input", {
      title: this.props.description,
      placeholder: "Insira um valor...",
      value: this.props.startValue,
      onChange: event => this.handleChange(event, "startValue"),
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "block h-10 items-center flex appearance-none bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    })), /*#__PURE__*/React.createElement("div", {
      title: this.props.description,
      className: "w-2/6 flex flex-col mr-2"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "block text-left appearance-none bg-transparent text-gray-700 py-2 pr-4 leading-tight"
    }, "Valor M\xE1ximo"), /*#__PURE__*/React.createElement("input", {
      title: this.props.description,
      placeholder: "Insira um valor...",
      value: this.props.endValue,
      onChange: event => this.handleChange(event, "endValue"),
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: "block h-10 items-center flex appearance-none bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    })), /*#__PURE__*/React.createElement("div", {
      title: this.props.description,
      className: "w-2/6 relative"
    }, /*#__PURE__*/React.createElement("div", {
      tabIndex: "1",
      className: "outline-none w-full",
      onClick: () => this.handleOpenDropList()
    }, /*#__PURE__*/React.createElement("div", {
      disabled: true,
      title: this.props.description,
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: this.props.unitValue !== "" ? "truncate items-center flex cursor-pointer block h-10 appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "truncate items-center flex cursor-pointer block h-10 appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }, this.props.unitValue === "" ? "Selecione uma opção..." : this.props.unitValue)), this.state.showDropdown && dropList, /*#__PURE__*/React.createElement("div", {
      className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faCaretDown
    })), this.props.unitValue !== "" && /*#__PURE__*/React.createElement("div", {
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
      datatype: "DV_INTERVAL<DV_QUANTITY>",
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
    }), quantityRange))));
  }

}

_defineProperty(QuantityRangeComponent, "contextType", CombinedContext);

class QuantityRange extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(QuantityRangeComponent, this.props));
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
})))(QuantityRange);