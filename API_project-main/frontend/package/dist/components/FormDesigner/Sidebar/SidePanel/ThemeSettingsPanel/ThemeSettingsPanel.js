function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import SidePanel from "../SidePanel";
import Dropdown from "../../../UI/DropdownWithoutContainer/Dropdown";
import PaletteColor from "./PaletteColor";
import CombinedContext from "../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../contexts/ProviderCombinedContext";
import ColorPicker from "./ColorPicker";

class ThemePaletteComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      initialColor: "",
      initialValues: {}
    });

    _defineProperty(this, "handleCancelChanges", async () => {
      this.props.onCancel();
      await this.context.theme.handleCancelThemeChange(this.state.initialColor, this.state.initialValues);
    });

    _defineProperty(this, "handleConfirmChanges", () => {
      this.setState(prevState => ({ ...prevState,
        initialColor: this.context.theme.themeColor,
        initialValues: this.context.theme.themePalette
      }));
    });
  }

  componentDidMount() {
    this.setState({
      initialColor: this.context.theme.themeColor,
      initialValues: this.context.theme.themePalette
    });
  }

  render() {
    const data = [{
      title: 'Cores Pré-Definidas',
      content: /*#__PURE__*/React.createElement(PaletteColor, null)
    }, {
      title: 'Personalizar Cor do Tema',
      content: /*#__PURE__*/React.createElement(ColorPicker, null)
    }];
    const content = /*#__PURE__*/React.createElement(Dropdown, {
      dropData: data
    });
    return /*#__PURE__*/React.createElement(SidePanel, {
      title: "Tema do Formul\xE1rio",
      content: content,
      isSidePanelOpen: this.props.isSidePanelOpen,
      collapseSidePanel: () => this.props.collapseSidePanel(),
      onCancelChanges: () => this.handleCancelChanges(),
      onClosed: () => this.handleConfirmChanges()
    });
  }

}

_defineProperty(ThemePaletteComponent, "contextType", CombinedContext);

const ThemeSettingsPanel = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(ThemePaletteComponent, props));
};

export default ThemeSettingsPanel;