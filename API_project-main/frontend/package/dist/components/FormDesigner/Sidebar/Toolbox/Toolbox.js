function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import CombinedContext from "../../../../contexts/CombinedContext";
import ToolboxItem from "./ToolboxItem";

class IconSidebarComponent extends Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "toolbox",
      className: "relative flex flex-col items-center text-center text-gray-400",
      style: {
        minWidth: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1469 ? '45px' : '52px',
        width: '65px',
        paddingTop: "30px",
        backgroundColor: this.context.theme.themePalette.$500
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center"
    }, this.props.data.map(data => data.type === "geral" && /*#__PURE__*/React.createElement(ToolboxItem, {
      key: data.key,
      icon: data.icon,
      isEnabled: true,
      isActive: data.key === this.props.activeIndex,
      handleToolButtonClick: () => this.props.handleToolButtonClick(data.key)
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center mt-4 border-t border-gray-200"
    }, this.props.data.map(data => data.type === "individual" && /*#__PURE__*/React.createElement(ToolboxItem, {
      key: data.key,
      icon: data.icon,
      isEnabled: data.isEnabled //só pode alterar as configurações se algum item estiver selecionado
      ,
      isActive: data.key === this.props.activeIndex,
      handleToolButtonClick: () => this.props.handleToolButtonClick(data.key)
    }))));
  }

}

_defineProperty(IconSidebarComponent, "contextType", CombinedContext);

const Toolbox = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(IconSidebarComponent, props));
};

export default Toolbox;