function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { ContentState, EditorState } from "draft-js";
import flow from "lodash/flow";
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import WordCount from "../../../UI/WordCounter/WordCounter";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";

class TextInputComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      width: 0,
      height: 0
    });

    _defineProperty(this, "handleResize", () => {
      const width = this.divElement.clientWidth;
      this.setState({
        width
      });
    });

    _defineProperty(this, "handleChange", (event, textId = -1) => {
      const text = EditorState.createWithContent(ContentState.createFromText(event.target.value));

      if (textId > -1) {
        let fields = [...this.props.value];
        fields.forEach(function (field) {
          if (field.textId === textId) {
            field.value = text;
          }
        });
        this.props.onTextInputChange(this.props.pathLabel, fields);
      } else {
        this.props.onTextInputChange(this.props.pathLabel, text);
      }
    });

    _defineProperty(this, "removeField", textId => {
      let fields = this.props.value.filter(field => field.textId !== textId);
      this.props.onTextInputChange(this.props.pathLabel, fields);
    });

    _defineProperty(this, "addField", () => {
      let maxId = 0;
      this.props.value.forEach(function (field) {
        if (field.textId > maxId) {
          maxId = field.textId;
        }
      });
      let newField = {
        textId: maxId + 1,
        value: EditorState.createEmpty()
      };
      let fields = [...this.props.value];
      this.props.onTextInputChange(this.props.pathLabel, [...fields, newField]);
    });

    _defineProperty(this, "getHeight", text => {
      let height;
      let containerHeight;

      if (this.context.datatypes.textHeight && Object.keys(this.context.datatypes.textHeight).length > 0) {
        containerHeight = this.context.datatypes.textHeight[this.props.pathLabel];
      }

      const values = {
        input: containerHeight ? {
          max: containerHeight + "px",
          min: containerHeight + "px"
        } : {
          max: "80px",
          min: "40px"
        },
        textarea: containerHeight ? {
          max: containerHeight + "px",
          min: containerHeight + "px"
        } : {
          max: "90px",
          min: "90px"
        }
      };

      if (text._immutable) {
        if (text.getCurrentContent().getPlainText("\n").split("\n").length > 1) {
          height = values[this.props.inputType].max;
        } else {
          if (text.getCurrentContent().getPlainText("\n").length * 8 < this.state.width) {
            height = values[this.props.inputType].min;
          } else {
            height = values[this.props.inputType].max;
          }
        }
      } else {
        if (text.length * 8 < this.state.width) {
          height = values[this.props.inputType].min;
        } else {
          height = values[this.props.inputType].max;
        }
      }

      this.setState({
        height: height
      });
    });
  }

  componentDidMount() {
    const width = this.divElement.clientWidth;
    this.setState({
      width
    });
    window.addEventListener("resize", this.handleResize);
    this.getHeight(this.props.value);
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const height = Math.floor(entry.contentRect.height) + 19;
        height > 19 && this.context.datatypes.updateTextHeight(this.props.pathLabel, height);
      });
    });
    observer.observe(this.divElement);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    let textInput = null;

    if (!Array.isArray(this.props.value)) {
      textInput = /*#__PURE__*/React.createElement("div", {
        className: "relative"
      }, /*#__PURE__*/React.createElement("textarea", {
        ref: divElement => this.divElement = divElement,
        title: this.props.description,
        placeholder: "Insira o seu texto...",
        maxLength: this.context.datatypes.limitCharacters[this.props.path] ? this.context.datatypes.limitCharacters[this.props.path] : undefined,
        value: this.props.value._immutable ? this.props.value.getCurrentContent().getPlainText("\n") : this.props.value,
        onChange: event => this.handleChange(event),
        style: {
          fontSize: this.context.font.fontSize.field,
          height: this.state.height
        },
        className: this.props.value !== "" ? "overflow-y-auto appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "overflow-y-auto appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
      }), this.context.datatypes.limitCharacters[this.props.path] && /*#__PURE__*/React.createElement(WordCount, {
        type: "textarea",
        total: this.context.datatypes.limitCharacters[this.props.path],
        current: this.props.value._immutable ? this.props.value.getCurrentContent().getPlainText("\n").length : this.props.value.length
      }));
    } else if (Array.isArray(this.props.value)) {
      textInput = this.props.value.map((value, index) => /*#__PURE__*/React.createElement("div", {
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: "relative"
      }, /*#__PURE__*/React.createElement("textarea", {
        ref: divElement => this.divElement = divElement,
        title: this.props.description,
        placeholder: "Insira o seu texto...",
        maxLength: this.context.datatypes.limitCharacters[this.props.path] ? this.context.datatypes.limitCharacters[this.props.path] : undefined,
        value: value.value._immutable ? value.value.getCurrentContent().getPlainText("\n") : value.value,
        onChange: event => this.handleChange(event, value.textId),
        style: {
          fontSize: this.context.font.fontSize.field,
          height: this.state.height
        },
        className: value.value !== "" ? "overflow-y-auto appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "overflow-y-auto appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 px-4 py-2 pr-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
      }), this.context.datatypes.limitCharacters[this.props.path] && /*#__PURE__*/React.createElement(WordCount, {
        type: "textarea",
        total: this.context.datatypes.limitCharacters[this.props.path],
        current: value.value._immutable ? value.value.getCurrentContent().getPlainText("\n").length : value.value.length
      })), /*#__PURE__*/React.createElement("div", {
        className: index === this.props.value.length - 1 ? "flex flex-row justify-between" : "flex flex-row justify-end"
      }, index === this.props.value.length - 1 && /*#__PURE__*/React.createElement("label", {
        onClick: () => this.addField(),
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block tracking-wide mb-2 pt-2 text-blue-400 cursor-pointer hover:text-blue-500"
      }, "Adicionar"), this.props.value.length > 1 && /*#__PURE__*/React.createElement("label", {
        onClick: () => this.removeField(value.textId),
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "block tracking-wide mb-2 pt-2 text-red-500 cursor-pointer hover:text-red-600"
      }, "Remover"))));
    }

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
      datatype: "DV_TEXT",
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
    }), textInput))));
  }

}

_defineProperty(TextInputComponent, "contextType", CombinedContext);

class TextInput extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(TextInputComponent, this.props));
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
})))(TextInput);