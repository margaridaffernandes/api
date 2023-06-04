function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faCaretDown, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import flow from "lodash/flow";
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { processInternalFunctions } from "../../../../assets/functions/InternalFuntions/processInternalFunctions";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";

class OrdinalComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      showDropdown: false,
      affectedFields: [],
      oldValue: ""
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

    _defineProperty(this, "handleChange", item => {
      this.setState({
        showDropdown: false
      });
      this.props.onOrdinalChange(this.props.pathLabel, item);
      this.handleInternalFunctions(item.value); // Atualizar o oldValue

      this.setState({
        oldValue: item
      });
    });

    _defineProperty(this, "handleClearSelectedValue", () => {
      this.props.onOrdinalChange(this.props.pathLabel, "");
      this.handleInternalFunctions(""); // Atualizar o oldValue

      this.setState({
        oldValue: ""
      });
    });

    _defineProperty(this, "handleInternalFunctions", currentValue => {
      // VER SE É NECESSÁRIO ATUALIZAR OUTROS CAMPOS
      if (this.state.affectedFields.length > 0) {
        this.state.affectedFields.forEach(obj => {
          const data = {
            [obj.functionName]: {}
          };
          Object.keys(obj.parameters).forEach(param => {
            if (obj.parameters[param] === null) {
              if (param === "newValue") {
                data[obj.functionName][param] = currentValue;
              } else if (param === "oldValue") {
                if (this.state.oldValue !== undefined || this.state.oldValue !== "") {
                  data[obj.functionName][param] = this.state.oldValue.value;
                } else {
                  data[obj.functionName][param] = "";
                }
              }
            } else {
              const path = obj.parameters[param].split(".").join("-");
              data[obj.functionName][param] = this.props.values[path];
            }
          });
          const newValue = processInternalFunctions(obj.functionName, data);
          Object.keys(obj.affectedFields).forEach(path => {
            const newPath = path.split(".").join("-");

            if (obj.affectedFields[path].datatype === "DV_COUNT" && obj.affectedFields[path].upperOccurrences === 1) {
              this.props.onOrdinalChange(newPath, newValue.toString());
            }
          });
        });
      }
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside); // A definir o oldValue logo no início

    this.setState({
      oldValue: this.props.value
    }); // A processar se ser internal functions em que o campo vai afetar os campos

    if (Array.isArray(this.props.internalFunctions)) {
      if (this.props.internalFunctions.length > 0) {
        this.props.internalFunctions.forEach(obj => {
          // VER SE HÁ CAMPOS QUE DEPENDEM DO VALOR DESTE
          if (obj.affectedFields) {
            this.setState(prevState => ({
              affectedFields: [obj, ...prevState.affectedFields]
            }));
          }
        });
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    let ordinal = null;
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
      className: dropListHeigth[this.props.items.length] ? dropListHeigth[this.props.items.length] + " w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
    }, this.props.items.map((elemento, index) => {
      return /*#__PURE__*/React.createElement("div", {
        id: "DropItem",
        onClick: () => this.handleChange(elemento),
        key: index,
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: this.props.value.code === elemento.code ? "duration-300 relative flex items-center bg-blue-100 text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100" : "duration-300 relative flex items-center bg-white text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100"
      }, elemento.text, this.props.value.code === elemento.code && /*#__PURE__*/React.createElement("div", {
        className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faCheck
      })));
    }));
    ordinal = /*#__PURE__*/React.createElement("div", {
      className: "w-full relative"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative"
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
      className: this.props.value !== "" ? "cursor-pointer flex items-center block h-10 appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "cursor-pointer flex items-center block h-10 appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }, this.props.value === "" ? "Selecione uma opção..." : this.props.value.text)), this.state.showDropdown && dropList), /*#__PURE__*/React.createElement("div", {
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
      datatype: "DV_ORDINAL",
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
    }), ordinal))));
  }

}

_defineProperty(OrdinalComponent, "contextType", CombinedContext);

class Ordinal extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(OrdinalComponent, this.props));
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
})))(Ordinal);