function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import HeaderOption from "./HeaderOption"; // import HoverMenu from "./HoverMenu";

import NumberInput from "./Inputs/NumberInput";
import Option from "./Option";
import { codedTextOptions } from "./Options/CodedTextOptions";
import { horizontalSizes } from "./Options/HorizontalSizes";
import { textOptions } from "./Options/TextOptions";
import OptionsButton from "./OptionsButton";

class ToolBarComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "menu", /*#__PURE__*/React.createRef());

    _defineProperty(this, "button", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      isTitleVisible: true,
      sectionTitleDescription: "Ocultar título",
      sectionTitleIcon: "faEye",
      openedMenu: false,
      openHoverModal: false,
      openedSubMenuWidth: false,
      openedSubMenuDatatype: false,
      openedSubMenuTextHeight: false,
      openedSubMenuLimitCharacters: false
    });

    _defineProperty(this, "handleClickOutside", event => {
      if (this.menu.current && !this.menu.current.contains(event.target) && !this.button.current.contains(event.target)) {
        this.setState({
          openedMenu: false,
          openedSubMenuDatatype: false,
          openedSubMenuWidth: false,
          openedSubMenuTextHeight: false,
          openedSubMenuLimitCharacters: false
        });
      }
    });

    _defineProperty(this, "handleOptions", e => {
      this.setState(prevState => ({ ...prevState,
        openedMenu: !prevState.openedMenu
      }));
      e.stopPropagation();
    });

    _defineProperty(this, "handleRemoveRM", e => {
      this.context.rmData.handleRemoveRM(this.props.path);
      e.stopPropagation();
    });

    _defineProperty(this, "handleSectionArchetype", e => {
      this.context.sectionArchetype.handleOpenSectionArchetype(this.props.path);
      e.stopPropagation();
    });

    _defineProperty(this, "handleSectionTitleVisibility", e => {
      this.setState(prevState => ({ ...prevState,
        isTitleVisible: !prevState.isTitleVisible
      }), () => {
        if (this.state.isTitleVisible) {
          this.setState({
            sectionTitleDescription: "Ocultar título",
            sectionTitleIcon: "faEye"
          });
        } else {
          this.setState({
            sectionTitleDescription: "Mostrar título",
            sectionTitleIcon: "faEyeSlash"
          });
        }

        this.context.datatypes.updateSectionTitle(this.props.path, this.state.isTitleVisible);
      });
      e.stopPropagation();
    });

    _defineProperty(this, "handleEditSectionArchetype", e => {
      this.context.sectionArchetype.handleEditSectionArchetype("open", this.props.path);
      e.stopPropagation();
    });

    _defineProperty(this, "handleDatatype", (e, type) => {
      // Se escolher um DV_TEXT do tipo input, é necessário retirar a altura caso existir => porque a altura é definida
      if (this.props.datatype === "DV_TEXT" && type === "input") {
        this.context.datatypes.removeField(this.props.path, "textHeight");
        this.context.datatypes.removeField(this.props.path, "limitCharacters");
        this.context.datatypes.updateDatatypes(this.props.path, type);
      } else {
        this.context.datatypes.updateDatatypes(this.props.path, type);
      }

      e.stopPropagation();
    });

    _defineProperty(this, "handleWidth", (e, size) => {
      this.context.sizes.updateSizes(this.props.path, size);
      e.stopPropagation();
    });

    _defineProperty(this, "handleTextHeight", (e, height) => {
      this.context.datatypes.updateTextHeight(this.props.path, height);
      e.stopPropagation();
    });

    _defineProperty(this, "handleLimitCharacters", (e, max) => {
      if (max === "") {
        this.context.datatypes.removeField(this.props.path, "limitCharacters");
      } else {
        this.context.datatypes.updateLimitCharacters(this.props.path, max);
      }

      e.stopPropagation();
    });

    _defineProperty(this, "handleSubMenu", (e, type) => {
      this.setState(prevState => ({ ...prevState,
        [type]: !prevState[type]
      }));
      e.stopPropagation();
    });

    _defineProperty(this, "handleOnMouseOver", () => {
      if (this.state.openHoverModal === false) {
        this.setState({
          openHoverModal: true
        });
      }
    });

    _defineProperty(this, "handleOnMouseOut", () => {
      if (this.state.openHoverModal === true) {
        this.setState({
          openHoverModal: false
        });
      }
    });
  }

  componentDidMount() {
    if (this.props.isSection && this.context.datatypes.showSectionTitle && Object.keys(this.context.datatypes.showSectionTitle).length > 0) {
      this.setState({
        isTitleVisible: this.context.datatypes.showSectionTitle[this.props.path] !== undefined ? this.context.datatypes.showSectionTitle[this.props.path] : true
      }, () => {
        if (this.state.isTitleVisible) {
          this.setState({
            sectionTitleDescription: "Ocultar título",
            sectionTitleIcon: "faEye"
          });
        } else {
          this.setState({
            sectionTitleDescription: "Mostrar título",
            sectionTitleIcon: "faEyeSlash"
          });
        }
      });
    }

    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    let menu;
    let options;
    const sizes = horizontalSizes(this.context.sizes.sizes[this.props.path]);

    if (this.props.datatype === "DV_TEXT") {
      options = textOptions(this.context.datatypes.datatypes[this.props.path]);
    } else if (this.props.datatype === "DV_CODED_TEXT") {
      options = codedTextOptions(this.context.datatypes.datatypes[this.props.path]);
    }

    const marginRight = this.props.isSection ? "42px" : "13px";
    menu = /*#__PURE__*/React.createElement("div", {
      ref: this.menu,
      style: {
        zIndex: 9999,
        width: "7.5rem",
        marginTop: "25px",
        marginRight: marginRight
      },
      className: "absolute top-0 right-0 flex flex-col rounded-sm bg-white border border-gray-200 mb-2"
    }, /*#__PURE__*/React.createElement(HeaderOption, {
      isOpened: this.state.openedSubMenuWidth,
      handleSubMenu: e => this.handleSubMenu(e, "openedSubMenuWidth"),
      title: "Largura"
    }), this.state.openedSubMenuWidth && Object.keys(sizes).map((size, index) => {
      return /*#__PURE__*/React.createElement(Option, {
        key: index,
        text: sizes[size].text,
        optionStyle: sizes[size].style,
        handleClick: e => this.handleWidth(e, sizes[size].width)
      });
    }), this.props.showDatatype && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HeaderOption, {
      isOpened: this.state.openedSubMenuDatatype,
      handleSubMenu: e => this.handleSubMenu(e, "openedSubMenuDatatype"),
      title: "Componente"
    }), this.state.openedSubMenuDatatype && Object.keys(options).map((option, index) => {
      return /*#__PURE__*/React.createElement(Option, {
        key: index,
        text: options[option].text,
        optionStyle: options[option].style,
        handleClick: e => this.handleDatatype(e, option)
      });
    })), this.props.datatype === "DV_TEXT" && (this.context.datatypes.datatypes[this.props.path] === "editor" || this.context.datatypes.datatypes[this.props.path] === "textarea") && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HeaderOption, {
      isOpened: this.state.openedSubMenuTextHeight,
      handleSubMenu: e => this.handleSubMenu(e, "openedSubMenuTextHeight"),
      title: "Altura"
    }), this.state.openedSubMenuTextHeight && /*#__PURE__*/React.createElement(NumberInput, {
      label: "Altura da caixa de texto",
      unit: "px",
      handleClear: event => this.handleTextHeight(event, "px"),
      handleChange: event => this.handleTextHeight(event, event.target.value + "px"),
      value: this.context.datatypes.textHeight[this.props.path] ? this.context.datatypes.textHeight[this.props.path].split("px")[0] : "90" // 90px é o default

    })), this.props.datatype === "DV_TEXT" && (this.context.datatypes.datatypes[this.props.path] === "editor" || this.context.datatypes.datatypes[this.props.path] === "textarea") && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(HeaderOption, {
      isOpened: this.state.openedSubMenuLimitCharacters,
      handleSubMenu: e => this.handleSubMenu(e, "openedSubMenuLimitCharacters"),
      title: "Carateres"
    }), this.state.openedSubMenuLimitCharacters && /*#__PURE__*/React.createElement(NumberInput, {
      label: "Limite de carateres",
      handleClear: event => this.handleLimitCharacters(event, ""),
      handleChange: event => this.handleLimitCharacters(event, event.target.value),
      value: this.context.datatypes.limitCharacters[this.props.path] ? this.context.datatypes.limitCharacters[this.props.path] : "" // Default é não ter limite

    })));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: this.props.isAddSection ? "5px" : "0px",
        paddingRight: this.props.isSection && this.props.isFormTitle ? "2px" : this.props.isSection ? "30px" : "0px"
      },
      className: this.props.isSection || this.props.isAddSection ? "flex flex-row absolute inset-y-0 right-0" : "flex flex-row absolute top-0 right-0"
    }, this.props.isAddSection && /*#__PURE__*/React.createElement(OptionsButton, {
      ref: this.button,
      isSection: this.props.isSection,
      onClick: e => this.handleEditSectionArchetype(e),
      description: "Editar",
      icon: "faPen"
    }), this.props.isRM && /*#__PURE__*/React.createElement(OptionsButton, {
      ref: this.button,
      isSection: this.props.isSection,
      hover: "hover:text-red-500",
      onClick: e => this.handleRemoveRM(e),
      description: "Remover",
      icon: "faTrash"
    }), this.props.isSection && !this.props.isFormTitle && !this.props.isAddSection && /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row"
    }, /*#__PURE__*/React.createElement(OptionsButton, {
      ref: this.button,
      isSection: this.props.isSection,
      onClick: e => this.handleSectionArchetype(e),
      description: "Seccionar o Arqu\xE9tipo",
      icon: "faPlus"
    }), /*#__PURE__*/React.createElement(OptionsButton, {
      ref: this.button,
      isSection: this.props.isSection,
      onClick: e => this.handleSectionTitleVisibility(e),
      description: this.state.sectionTitleDescription,
      icon: this.state.sectionTitleIcon
    })), !this.props.isFormTitle && /*#__PURE__*/React.createElement(OptionsButton, {
      ref: this.button,
      menu: menu,
      isSection: this.props.isSection,
      description: "Modificar componente",
      onClick: e => this.handleOptions(e),
      openedMenu: this.state.openedMenu,
      icon: "faEllipsisV"
    }));
  }

}

_defineProperty(ToolBarComponent, "contextType", CombinedContext);

const ToolBar = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(ToolBarComponent, props));
};

export default ToolBar;