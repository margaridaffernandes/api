function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import SidePanel from "../SidePanel";
import Accordion from "../../../UI/Accordion/Accordion";
import CombinedContext from "../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../contexts/ProviderCombinedContext";
import FontSize from "./FontSize";
import FontStyle from "./FontStyle";
import FontAlignment from "./FontAlignment";
import FontLetters from "./FontLetters";

class FontStyleComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      initialFontSize: {},
      initialFontStyle: {},
      initialFontLetters: {},
      initialFontAlignment: {}
    });

    _defineProperty(this, "handleCancelChanges", async () => {
      this.props.onCancel();
      await this.context.font.handleCancelFontChange(this.state.initialFontSize, this.state.initialFontStyle, this.state.initialFontLetters, this.state.initialFontAlignment);
    });

    _defineProperty(this, "handleConfirmChanges", () => {
      this.setState(prevState => ({ ...prevState,
        initialFontSize: this.context.font.fontSize,
        initialFontStyle: this.context.font.fontStyle,
        initialFontLetters: this.context.font.fontLetters,
        initialFontAlignment: this.context.font.fontAlignment
      }));
    });
  }

  componentDidMount() {
    this.setState({
      initialFontSize: this.context.font.fontSize,
      initialFontStyle: this.context.font.fontStyle,
      initialFontLetters: this.context.font.fontLetters,
      initialFontAlignment: this.context.font.fontAlignment
    });
  }

  render() {
    const items = [{
      title: "Título do formulário",
      identifier: "formTitle"
    }, {
      title: "Letra do cabeçalho",
      identifier: "header"
    }, {
      title: "Título das secções",
      identifier: "sectionTitle"
    }, {
      title: "Título dos campos",
      identifier: "fieldTitle"
    }, {
      title: "Letra dos botões",
      identifier: "button"
    }, {
      title: "Letra dos campos",
      identifier: "field"
    } // Não há opção bold para os campos
    ];
    const accordionData = [{
      title: 'Tamanho da letra',
      content: items.map((obj, index) => {
        return /*#__PURE__*/React.createElement(FontSize, {
          key: index,
          title: obj.title,
          identifier: obj.identifier
        });
      })
    }, {
      title: 'Formatação da letra',
      content: items.filter(i => i.identifier !== "field").map((obj, index) => {
        return /*#__PURE__*/React.createElement(FontStyle, {
          key: index,
          title: obj.title,
          identifier: obj.identifier
        });
      })
    }, {
      title: 'Maiúsculas/Minúsculas',
      content: items.filter(i => i.identifier !== "field" && i.identifier !== "header").map((obj, index) => {
        return /*#__PURE__*/React.createElement(FontLetters, {
          key: index,
          title: obj.title,
          identifier: obj.identifier
        });
      })
    }, {
      title: 'Posição da letra',
      content: items.filter(i => i.identifier !== "field" && i.identifier !== "button" && i.identifier !== "header").map((obj, index) => {
        return /*#__PURE__*/React.createElement(FontAlignment, {
          key: index,
          title: obj.title,
          identifier: obj.identifier
        });
      })
    }];
    const content = /*#__PURE__*/React.createElement(Accordion, {
      accordionData: accordionData
    });
    return /*#__PURE__*/React.createElement(SidePanel, {
      title: "Letra do Formul\xE1rio",
      content: content,
      isSidePanelOpen: this.props.isSidePanelOpen,
      collapseSidePanel: () => this.props.collapseSidePanel(),
      onCancelChanges: () => this.handleCancelChanges(),
      onClosed: () => this.handleConfirmChanges()
    });
  }

}

_defineProperty(FontStyleComponent, "contextType", CombinedContext);

const FontSettingsPanel = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(FontStyleComponent, props));
};

export default FontSettingsPanel;