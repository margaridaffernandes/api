function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import flow from "lodash/flow";
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import highlightColors from "../../../Datatypes/WysiwygTextEditor/Style/HighlightColors";
import styleMap from "../../../Datatypes/WysiwygTextEditor/Style/StyleMap";
import textColors from "../../../Datatypes/WysiwygTextEditor/Style/TextColors";
import ToolBar from "../../../Datatypes/WysiwygTextEditor/ToolBar";
import ToolBarButton from "../../../Datatypes/WysiwygTextEditor/ToolBarButton";
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import WordCount from "../../../UI/WordCounter/WordCounter";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";

class WysiwygTextEditorComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      width: 0,
      focused: false,
      // quando é um texto único
      areFocused: [],
      // quando é um array de textos
      displayColorPicker: false,
      // quando é um texto único
      displayColorPickerArray: [],
      // quando é um array de textos
      displayHighlightPicker: false,
      // quando é um texto único
      displayHighlightPickerArray: [] // quando é um array de textos

    });

    _defineProperty(this, "handleResize", event => {
      const width = this.divElement.clientWidth;
      this.setState({
        width
      });
    });

    _defineProperty(this, "handleFocus", (textId = -1) => {
      if (textId > -1) {
        this.setState(state => {
          const areFocused = [...state.areFocused, textId];
          return {
            areFocused
          };
        });
      } else {
        this.setState({
          focused: true
        });
      }
    });

    _defineProperty(this, "handleBlur", (textId = -1) => {
      if (textId > -1) {
        this.setState(state => {
          const areFocused = state.areFocused.filter(item => item !== textId);
          const displayColorPickerArray = state.displayColorPickerArray.filter(item => item !== textId);
          const displayHighlightPickerArray = state.displayHighlightPickerArray.filter(item => item !== textId);
          return {
            areFocused,
            displayColorPickerArray,
            displayHighlightPickerArray
          };
        });
      } else {
        this.setState({
          focused: false,
          displayColorPicker: false,
          displayHighlightPicker: false
        });
      }
    });

    _defineProperty(this, "handleChange", (editorState, textId = -1) => {
      if (textId > -1) {
        let fields = [...this.props.value];
        fields.forEach(function (field) {
          if (field.textId === textId) {
            field.value = editorState;
          }
        });
        this.props.onTextChange(this.props.pathLabel, fields);
      } else {
        this.props.onTextChange(this.props.pathLabel, editorState);
      }
    });

    _defineProperty(this, "handleKeyCommand", (command, textId = -1) => {
      const text = textId > -1 ? this.props.value.filter(obj => obj.textId === textId)[0].value : this.props.value;

      if (this.context.datatypes.limitCharacters[this.props.path] && command === "split-block") {
        if (text.getCurrentContent().getPlainText("\n").length >= this.context.datatypes.limitCharacters[this.props.path]) {
          return "handled";
        }
      }

      if (textId > -1) {
        const newState = RichUtils.handleKeyCommand(text, command);

        if (newState) {
          this.handleChange(newState, textId);
        }
      } else {
        const newState = RichUtils.handleKeyCommand(text, command);

        if (newState) {
          this.handleChange(newState);
        }
      }
    });

    _defineProperty(this, "getIsStyleActive", (type, textId = -1) => {
      if (textId > -1) {
        let inlineStyle = this.props.value.filter(obj => obj.textId === textId)[0].value.getCurrentInlineStyle().has(type);
        return inlineStyle;
      } else {
        let inlineStyle = this.props.value.getCurrentInlineStyle().has(type);
        return inlineStyle;
      }
    });

    _defineProperty(this, "getIsBlockActive", (type, textId = -1) => {
      if (textId > -1) {
        let blockStyle = RichUtils.getCurrentBlockType(this.props.value.filter(obj => obj.textId === textId)[0].value);
        return blockStyle === type;
      } else {
        let blockStyle = RichUtils.getCurrentBlockType(this.props.value);
        return blockStyle === type;
      }
    });

    _defineProperty(this, "handleTextColor", (toggledColor, textId = -1) => {
      let value;

      if (textId > -1) {
        value = this.props.value.filter(obj => obj.textId === textId)[0].value;
      } else {
        value = this.props.value;
      }

      const currentStyle = value.getCurrentInlineStyle();

      if (currentStyle["_map"]["_list"]["_tail"] !== undefined) {
        const currentInlineStyles = currentStyle["_map"]["_list"]["_tail"]["array"];
        const styles = currentInlineStyles.filter(array => array !== undefined).filter(array => array[0] !== undefined).map(array => {
          return array[0];
        }); // Turn off all active colors

        styles.forEach(function (style) {
          if (Object.keys(textColors).indexOf(style) > -1) {
            value = RichUtils.toggleInlineStyle(value, style);
          }
        });
      }

      let textColor = Object.keys(textColors).filter(key => textColors[key].color === toggledColor)[0]; // Add the selected color

      if (!currentStyle.has(textColor)) {
        value = RichUtils.toggleInlineStyle(value, textColor);
      }

      if (textId > -1) {
        this.handleChange(value, textId);
        this.setState(state => {
          const displayColorPickerArray = state.displayColorPickerArray.filter(item => item !== textId);
          return {
            displayColorPickerArray
          };
        });
      } else {
        this.handleChange(value);
        this.setState({
          displayColorPicker: false
        });
      }
    });

    _defineProperty(this, "handleHighlightColor", (toggledColor, textId = -1) => {
      let value;

      if (textId > -1) {
        value = this.props.value.filter(obj => obj.textId === textId)[0].value;
      } else {
        value = this.props.value;
      }

      const currentStyle = value.getCurrentInlineStyle();

      if (currentStyle["_map"]["_list"]["_tail"] !== undefined) {
        const currentInlineStyles = currentStyle["_map"]["_list"]["_tail"]["array"];
        const styles = currentInlineStyles.filter(array => array !== undefined).filter(array => array[0] !== undefined).map(array => {
          return array[0];
        }); // Turn off highlight color

        styles.forEach(function (style) {
          if (Object.keys(highlightColors).indexOf(style) > -1) {
            value = RichUtils.toggleInlineStyle(value, style);
          }
        });
      }

      let highlightColor = Object.keys(highlightColors).filter(key => highlightColors[key].backgroundColor === toggledColor)[0]; // Add the selected highlight color. If it's white, don't add highlight

      if (!currentStyle.has(highlightColor) && highlightColor !== "HIGHLIGHTWHITE") {
        value = RichUtils.toggleInlineStyle(value, highlightColor);
      }

      if (textId > -1) {
        this.handleChange(value, textId);
        this.setState(state => {
          const displayHighlightPickerArray = state.displayHighlightPickerArray.filter(item => item !== textId);
          return {
            displayHighlightPickerArray
          };
        });
      } else {
        this.handleChange(value);
        this.setState({
          displayHighlightPicker: false
        });
      }
    });

    _defineProperty(this, "handleStyle", (e, type, textId = -1) => {
      e.preventDefault();

      if (textId > -1) {
        this.closeColorPickers(e, textId);
        let value = this.props.value.filter(obj => obj.textId === textId)[0].value;
        this.handleChange(RichUtils.toggleInlineStyle(value, type), textId);
      } else {
        this.closeColorPickers(e);
        this.handleChange(RichUtils.toggleInlineStyle(this.props.value, type));
      }
    });

    _defineProperty(this, "handleBlockType", (e, type, textId = -1) => {
      e.preventDefault();

      if (textId > -1) {
        this.closeColorPickers(e, textId);
        let value = this.props.value.filter(obj => obj.textId === textId)[0].value;
        this.handleChange(RichUtils.toggleBlockType(value, type), textId);
      } else {
        this.closeColorPickers(e);
        this.handleChange(RichUtils.toggleBlockType(this.props.value, type));
      }
    });

    _defineProperty(this, "handleTab", (e, textId = -1) => {
      if (e.key === "Tab") {
        e.preventDefault();

        if (textId > -1) {
          let value = this.props.value.filter(obj => obj.textId === textId)[0].value;
          const newState = RichUtils.onTab(e, value, 4);

          if (newState) {
            this.handleChange(newState, textId);
          }
        } else {
          const newState = RichUtils.onTab(e, this.props.value, 4);

          if (newState) {
            this.handleChange(newState);
          }
        }
      }
    });

    _defineProperty(this, "removeField", fieldId => {
      let fields = [...this.props.value].filter(field => field.textId !== fieldId);
      this.props.onTextChange(this.props.pathLabel, fields);
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
      this.props.onTextChange(this.props.pathLabel, [...fields, newField]);
    });

    _defineProperty(this, "closeColorPickers", (e, textId = -1) => {
      e.preventDefault();

      if (textId > -1) {
        this.setState(state => {
          const displayColorPickerArray = state.displayColorPickerArray.filter(item => item !== textId);
          const displayHighlightPickerArray = state.displayHighlightPickerArray.filter(item => item !== textId);
          return {
            displayHighlightPickerArray,
            displayColorPickerArray
          };
        });
      } else {
        this.setState({
          displayColorPicker: false,
          displayHighlightPicker: false
        });
      }
    });

    _defineProperty(this, "displayColorPicker", (e, textId = -1) => {
      e.preventDefault();

      if (textId > -1) {
        this.setState(state => {
          const displayColorPickerArray = state.displayColorPickerArray.indexOf(textId) > -1 ? state.displayColorPickerArray.filter(item => item !== textId) : [...state.displayColorPickerArray, textId];
          const displayHighlightPickerArray = state.displayHighlightPickerArray.filter(item => item !== textId);
          return {
            displayColorPickerArray,
            displayHighlightPickerArray
          };
        });
      } else {
        this.setState(state => {
          const displayColorPicker = !state.displayColorPicker;
          return {
            displayColorPicker,
            displayHighlightPicker: false
          };
        });
      }
    });

    _defineProperty(this, "displayHighlightPicker", (e, textId = -1) => {
      e.preventDefault();

      if (textId > -1) {
        this.setState(state => {
          const displayHighlightPickerArray = state.displayHighlightPickerArray.indexOf(textId) > -1 ? state.displayHighlightPickerArray.filter(item => item !== textId) : [...state.displayHighlightPickerArray, textId];
          const displayColorPickerArray = state.displayColorPickerArray.filter(item => item !== textId);
          return {
            displayHighlightPickerArray,
            displayColorPickerArray
          };
        });
      } else {
        this.setState(state => {
          const displayHighlightPicker = !state.displayHighlightPicker;
          return {
            displayHighlightPicker,
            displayColorPicker: false
          };
        });
      }
    });

    _defineProperty(this, "handleBeforeInput", (val, max, value) => {
      if (max) {
        if (val && value.getCurrentContent().getPlainText("\n").length >= max) {
          return "handled";
        }
      }

      return "not-handled";
    });

    _defineProperty(this, "handlePastedText", (val, max, value) => {
      if (max) {
        if (val.length + value.getCurrentContent().getPlainText("\n").length > max) {
          return true;
        }
      }

      return false;
    });
  }

  componentDidMount() {
    const width = this.divElement.clientWidth;
    this.setState({
      width
    });
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    let text = null;
    let fields = this.props.value;
    const containerHeight = this.context.datatypes.textHeight[this.props.path] ? this.context.datatypes.textHeight[this.props.path] === "px" ? "0px" : this.context.datatypes.textHeight[this.props.path] : "90px"; // default

    if (!Array.isArray(this.props.value)) {
      text = /*#__PURE__*/React.createElement("div", {
        className: "block relative w-full rounded-sm"
      }, /*#__PURE__*/React.createElement(ToolBar, null, /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.focused,
        isActive: this.getIsStyleActive("ITALIC"),
        onMouseDown: event => this.handleStyle(event, "ITALIC"),
        type: "ITALIC"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.focused,
        isActive: this.getIsStyleActive("BOLD"),
        onMouseDown: event => this.handleStyle(event, "BOLD"),
        type: "BOLD"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.focused,
        isActive: this.getIsStyleActive("UNDERLINE"),
        onMouseDown: event => this.handleStyle(event, "UNDERLINE"),
        type: "UNDERLINE"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.focused,
        isActive: this.getIsStyleActive("STRIKETHROUGH"),
        onMouseDown: event => this.handleStyle(event, "STRIKETHROUGH"),
        type: "STRIKETHROUGH"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        onChangeColor: color => this.handleTextColor(color),
        displayColorPicker: this.state.displayColorPicker,
        focused: this.state.focused,
        onMouseDown: event => this.displayColorPicker(event),
        type: "TEXTCOLOR"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        onChangeColor: color => this.handleHighlightColor(color),
        displayColorPicker: this.state.displayHighlightPicker,
        focused: this.state.focused,
        onMouseDown: event => this.displayHighlightPicker(event),
        type: "HIGHLIGHT"
      }), /*#__PURE__*/React.createElement("div", {
        className: "border-r m-1 mt-2 mb-2 border-gray-400"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.focused,
        isActive: this.getIsBlockActive("unordered-list-item"),
        onMouseDown: event => this.handleBlockType(event, "unordered-list-item"),
        type: "UL"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.focused,
        isActive: this.getIsBlockActive("ordered-list-item"),
        onMouseDown: event => this.handleBlockType(event, "ordered-list-item"),
        type: "OL"
      })), /*#__PURE__*/React.createElement("div", {
        ref: divElement => this.divElement = divElement,
        onKeyDown: this.handleTab,
        title: this.props.description,
        onClick: event => this.closeColorPickers(event),
        tabIndex: "1",
        style: {
          fontSize: this.context.font.fontSize.field,
          height: containerHeight
        },
        className: this.state.focused ? "block px-4 py-2 overflow-y-auto appearance-none w-full bg-white border border-gray-300 text-gray-700 leading-tight focus:outline-none" : "block px-4 py-2 overflow-y-auto appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 leading-tight focus:outline-none"
      }, /*#__PURE__*/React.createElement(Editor, {
        placeholder: "Insira o seu texto...",
        customStyleMap: styleMap,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        handleKeyCommand: this.handleKeyCommand,
        editorState: this.props.value,
        onChange: this.handleChange,
        handleBeforeInput: val => this.handleBeforeInput(val, this.context.datatypes.limitCharacters[this.props.path], this.props.value),
        handlePastedText: val => this.handlePastedText(val, this.context.datatypes.limitCharacters[this.props.path], this.props.value)
      })), this.context.datatypes.limitCharacters[this.props.path] && /*#__PURE__*/React.createElement(WordCount, {
        type: "editor",
        total: this.context.datatypes.limitCharacters[this.props.path],
        current: this.props.value.getCurrentContent().getPlainText("\n").length
      }));
    } else if (Array.isArray(this.props.value)) {
      text = fields.map((value, index) => /*#__PURE__*/React.createElement("div", {
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: "block relative w-full rounded-sm"
      }, /*#__PURE__*/React.createElement(ToolBar, null, /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.areFocused.indexOf(value.textId) > -1,
        isActive: this.getIsStyleActive("ITALIC", value.textId),
        onMouseDown: event => this.handleStyle(event, "ITALIC", value.textId),
        type: "ITALIC"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.areFocused.indexOf(value.textId) > -1,
        isActive: this.getIsStyleActive("BOLD", value.textId),
        onMouseDown: event => this.handleStyle(event, "BOLD", value.textId),
        type: "BOLD"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.areFocused.indexOf(value.textId) > -1,
        isActive: this.getIsStyleActive("UNDERLINE", value.textId),
        onMouseDown: event => this.handleStyle(event, "UNDERLINE", value.textId),
        type: "UNDERLINE"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.areFocused.indexOf(value.textId) > -1,
        isActive: this.getIsStyleActive("STRIKETHROUGH", value.textId),
        onMouseDown: event => this.handleStyle(event, "STRIKETHROUGH", value.textId),
        type: "STRIKETHROUGH"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        onChangeColor: color => this.handleTextColor(color, value.textId),
        displayColorPicker: this.state.displayColorPickerArray.indexOf(value.textId) > -1,
        focused: this.state.areFocused.indexOf(value.textId) > -1,
        onMouseDown: event => this.displayColorPicker(event, value.textId),
        type: "TEXTCOLOR"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        onChangeColor: color => this.handleHighlightColor(color, value.textId),
        displayColorPicker: this.state.displayHighlightPickerArray.indexOf(value.textId) > -1,
        focused: this.state.areFocused.indexOf(value.textId) > -1,
        onMouseDown: event => this.displayHighlightPicker(event, value.textId),
        type: "HIGHLIGHT"
      }), /*#__PURE__*/React.createElement("div", {
        className: "border-r m-1 mt-2 mb-2 border-gray-400"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.areFocused.indexOf(value.textId) > -1,
        isActive: this.getIsBlockActive("unordered-list-item", value.textId),
        onMouseDown: event => this.handleBlockType(event, "unordered-list-item", value.textId),
        type: "UL"
      }), /*#__PURE__*/React.createElement(ToolBarButton, {
        focused: this.state.areFocused.indexOf(value.textId) > -1,
        isActive: this.getIsBlockActive("ordered-list-item", value.textId),
        onMouseDown: event => this.handleBlockType(event, "ordered-list-item", value.textId),
        type: "OL"
      })), /*#__PURE__*/React.createElement("div", {
        ref: divElement => this.divElement = divElement,
        onKeyDown: event => this.handleTab(event, value.textId, value.textId),
        title: this.props.description,
        onClick: event => this.closeColorPickers(event, value.textId),
        tabIndex: "1",
        style: {
          fontSize: this.context.font.fontSize.field,
          height: containerHeight
        },
        className: this.state.areFocused.indexOf(value.textId) > -1 ? "block px-4 py-2 overflow-y-auto appearance-none w-full bg-white border border-gray-300 text-gray-700 leading-tight focus:outline-none" : "block px-4 py-2 overflow-y-auto appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 leading-tight focus:outline-none"
      }, /*#__PURE__*/React.createElement(Editor, {
        placeholder: "Insira o seu texto...",
        customStyleMap: styleMap,
        onFocus: () => this.handleFocus(value.textId),
        onBlur: () => this.handleBlur(value.textId),
        handleKeyCommand: command => this.handleKeyCommand(command, value.textId),
        editorState: value.value,
        onChange: editorState => this.handleChange(editorState, value.textId),
        handleBeforeInput: val => this.handleBeforeInput(val, this.context.datatypes.limitCharacters[this.props.path], value.value),
        handlePastedText: val => this.handlePastedText(val, this.context.datatypes.limitCharacters[this.props.path], value.value)
      })), this.context.datatypes.limitCharacters[this.props.path] && /*#__PURE__*/React.createElement(WordCount, {
        type: "editor",
        total: this.context.datatypes.limitCharacters[this.props.path],
        current: value.value.getCurrentContent().getPlainText("\n").length
      })), /*#__PURE__*/React.createElement("div", {
        className: index === fields.length - 1 ? "flex flex-row justify-between" : "flex flex-row justify-end"
      }, index === fields.length - 1 && /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        onClick: () => this.addField(),
        className: "block tracking-wide mb-2 pt-2 text-blue-400 cursor-pointer hover:text-blue-500"
      }, "Adicionar"), fields.length > 1 && /*#__PURE__*/React.createElement("label", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        onClick: () => this.removeField(value.textId),
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
      showLabel: this.props.showLabel,
      label: this.props.label,
      editMode: true,
      optional: this.props.optional,
      sectionOccurrence: this.props.sectionOccurrence
    }), text))));
  }

}

_defineProperty(WysiwygTextEditorComponent, "contextType", CombinedContext);

class WysiwygTextEditor extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(WysiwygTextEditorComponent, this.props));
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
})))(WysiwygTextEditor);