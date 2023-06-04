function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import PrintForm from "../../PrintForm/PrintForm";
import ToggleSwitch from "../../FormDesigner/UI/ToggleSwitch/ToggleSwitch";

class FormHeaderComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      showall: true,
      showHeader: true,
      headerFields: []
    });

    _defineProperty(this, "handleSwitch", () => {
      this.setState(prevState => ({ ...prevState,
        showall: !prevState.showall
      }));
    });
  }

  componentDidMount() {
    if (this.props.fields) {
      const array = [...this.props.fields].filter(field => field.formVisible === true);
      const {
        showInformacaoComplementar = true,
        showHeader = true
      } = this.props;
      this.setState({
        headerFields: array,
        showall: showInformacaoComplementar,
        showHeader: showHeader
      });
    }
  }

  render() {
    let header;
    if (!this.state.showHeader) return null;
    header = /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col w-11/12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex w-full flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row"
    }, this.props.showPrint && this.props.professionalTasks.length > 0 && /*#__PURE__*/React.createElement(PrintForm, {
      professionalTasks: this.props.professionalTasks,
      template: this.props.template
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row w-full items-center justify-center my-1 sm:my-0 md:my-0 lg:my-0 xl:my-0"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.header
      },
      className: `text-gray-600 break-words tracking-wide pr-2 ${this.context.font.fontStyle.header.toString().replaceAll(",", " ")}`
    }, "Colapsar Formul\xE1rio"), /*#__PURE__*/React.createElement(ToggleSwitch, {
      isOn: this.props.isCollapsed,
      onClick: this.props.collapseSections
    })), this.state.headerFields.length > 0 && (this.state.showall ? /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row w-full items-center justify-center my-1 sm:my-0 md:my-0 lg:my-0 xl:my-0"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.header
      },
      className: `text-gray-600 break-words tracking-wide pr-2 ${this.context.font.fontStyle.header.toString().replaceAll(",", " ")}`
    }, "Mostrar Cabe\xE7alho"), /*#__PURE__*/React.createElement(ToggleSwitch, {
      isOn: this.state.showall === true,
      onClick: () => this.handleSwitch()
    })) : /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row w-full items-center justify-center my-1 sm:my-0 md:my-0 lg:my-0 xl:my-0"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.header
      },
      className: `text-gray-600 break-words tracking-wide pr-2 ${this.context.font.fontStyle.header.toString().replaceAll(",", " ")}`
    }, "Mostrar Cabe\xE7alho"), /*#__PURE__*/React.createElement(ToggleSwitch, {
      isOn: this.state.showall === true,
      onClick: () => this.handleSwitch()
    })))), this.state.headerFields.length > 0 && this.state.showall && /*#__PURE__*/React.createElement("div", {
      className: "cursor-default bg-gray-100 border border-gray-200 flex flex-col w-full rounded-sm mt-2"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: "0.2rem",
        paddingBottom: "0.1rem"
      },
      className: "flex justify-center border-b border-gray-200 mx-8 items-center"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.header
      },
      className: `text-gray-600 text-white break-words tracking-wide ${this.context.font.fontStyle.header.toString().replaceAll(",", " ")}`
    }, "Informa\xE7\xE3o complementar")), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap justify-between w-full items-start items-stretch"
    }, this.state.headerFields.map((field, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        style: {
          paddingTop: "0.2rem",
          paddingBottom: "0.2rem"
        },
        className: "flex w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 justify-center"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col w-full"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: Array.isArray(this.context.theme) ? this.context.theme[0] : this.context.theme.themePalette.$500,
          paddingTop: "0.1rem"
        },
        className: "px-2"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.header
        },
        className: `break-words tracking-wide ${this.context.font.fontStyle.header.toString().replaceAll(",", " ")}`
      }, field.itemName)), /*#__PURE__*/React.createElement("div", {
        style: {
          paddingTop: "0.1rem",
          paddingBottom: "0.1rem"
        },
        className: "px-2"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.header
        },
        className: `text-gray-700 break-words leading-tight ${this.context.font.fontStyle.header.toString().replaceAll(",", " ")}`
      }, field.value))));
    }))));
    return /*#__PURE__*/React.createElement("div", {
      className: "flex w-full justify-center"
    }, header);
  }

}

_defineProperty(FormHeaderComponent, "contextType", CombinedContext);

const FormHeader = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(FormHeaderComponent, props));
};

export default FormHeader;