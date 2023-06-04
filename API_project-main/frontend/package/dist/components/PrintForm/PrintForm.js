function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import loadable from '@loadable/component';
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formDefinition } from "./FormDefinition";
import ProviderCombinedContext from "../../contexts/ProviderCombinedContext";
import CombinedContext from "../../contexts/CombinedContext";
const PdfMake = loadable.lib(() => import('pdfmake/build/pdfmake'));
const PdfFonts = loadable.lib(() => import('pdfmake/build/vfs_fonts'));

class PrintFormComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "pdf", /*#__PURE__*/React.createRef());

    _defineProperty(this, "pdfFont", /*#__PURE__*/React.createRef());

    _defineProperty(this, "checkBrowser", () => {
      const ua = window.navigator.userAgent;
      const msie = ua.indexOf("MSIE ");

      if (msie > 0) {
        return true;
      }

      const trident = ua.indexOf("Trident/");

      if (trident > 0) {
        return true;
      }

      const edge = ua.indexOf("Edge/");

      if (edge > 0) {
        return true;
      }

      return false;
    });

    _defineProperty(this, "handlePrintPDF", () => {
      this.pdf.current.default.vfs = this.pdfFont.current.default.pdfMake.vfs;
      this.checkBrowser() === true ? this.pdf.current.default.createPdf(formDefinition(this.props.template, this.props.professionalTasks, this.context.formData.patientData, this.context.formData.reportData)).download(this.props.template.node.text) : this.pdf.current.default.createPdf(formDefinition(this.props.template, this.props.professionalTasks, this.context.formData.patientData, this.context.formData.reportData)).open();
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      onClick: this.handlePrintPDF,
      className: "flex flex-row justify-center w-full items-center my-1 sm:my-0 md:my-0 lg:my-0 xl:my-0"
    }, /*#__PURE__*/React.createElement(PdfMake, {
      ref: this.pdf
    }), /*#__PURE__*/React.createElement(PdfFonts, {
      ref: this.pdfFont
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "sm",
      icon: faPrint
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: this.context.font.fontSize.header
      },
      className: `duration-500 hover:text-gray-700 cursor-pointer text-gray-600 pl-2 flex break-words tracking-wide ${this.context.font.fontStyle.header.toString().replaceAll(",", " ")}`
    }, "Imprimir Formul\xE1rio"));
  }

}

_defineProperty(PrintFormComponent, "contextType", CombinedContext);

const PrintForm = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(PrintFormComponent, props));
};

export default PrintForm;