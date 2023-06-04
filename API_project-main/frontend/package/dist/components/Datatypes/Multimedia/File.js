function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import { FileIcon, NoFilesIcon } from "../../../assets/icons/svg_icons";
import axios from "axios";
import { getEnvUrl } from "../../../environment";

class FileComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCreateFileView", data => {
      const byteArray = Uint8Array.from(atob(data).split("").map(char => char.charCodeAt(0)));
      const blob = new Blob([byteArray], {
        type: this.props.type
      }); // para IE

      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, this.props.name);
      } else {
        // para o resto dos browsers
        const fileData = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.href = fileData;
        link.style = "display: none";
        link.target = "_blank";
        link.name = this.props.name; //link.download = this.props.name; // removido para poder abrir num novo separador

        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
          // no Firefox é preciso haver um delay para fazer o revoke
          document.body.removeChild(link);
          window.URL.revokeObjectURL(data);
        }, 100);
      }
    });

    _defineProperty(this, "handleDownloadFile", async () => {
      let data;

      if (this.props.URI && this.props.idComposition) {
        let res = await axios({
          method: "post",
          url: `${getEnvUrl('aidaauth', '4000')}/getMultimedia`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.context.token
          },
          data: {
            compositionId: this.props.idComposition.toString(),
            URI: this.props.URI.toString()
          }
        });
        data = res.data.fileData;
      } else {
        data = this.props.data;
      }

      this.handleCreateFileView(data);
    });
  }

  render() {
    document.documentElement.style.setProperty('--icon-hover', this.context.theme.themePalette.$400);
    let file;
    let nameArray = this.props.name.split('.');
    let extension = nameArray[nameArray.length - 1];

    if (this.props.mode === "upload") {
      file = /*#__PURE__*/React.createElement("div", {
        className: "duration-500 flex w-full content-between cursor-default flex-row items-center h-12 mt-4 border-b border-gray-400"
      }, extension.length < 5 ? /*#__PURE__*/React.createElement("div", {
        className: "px-3"
      }, /*#__PURE__*/React.createElement("div", {
        className: "pt-1",
        style: {
          width: "55px",
          height: "55px"
        }
      }, /*#__PURE__*/React.createElement(FileIcon, {
        fill: this.context.theme.themePalette.$300,
        text: extension.length < 4 ? extension.toUpperCase() : extension
      }))) : /*#__PURE__*/React.createElement("div", {
        className: "text-gray-700 pr-4 pl-4"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "1x",
        icon: faPaperclip
      })), /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "text-gray-700 leading-tight"
      }, this.props.name), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "text-gray-500 leading-tight pt-1"
      }, this.props.size, "KB")), /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row ml-auto pr-4"
      }, /*#__PURE__*/React.createElement("div", {
        title: "Download",
        onClick: () => this.handleDownloadFile(),
        className: "icon duration-500 cursor-pointer text-gray-400 pr-4"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "1x",
        icon: faEye
      })), /*#__PURE__*/React.createElement("div", {
        title: "Remover",
        onClick: this.props.onDeleteFile,
        className: "duration-500 cursor-pointer text-gray-400 hover:text-red-500"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "1x",
        icon: faTrashAlt
      }))));
    } else if (this.props.mode === "download") {
      file = /*#__PURE__*/React.createElement("div", {
        title: this.props.title,
        className: this.props.isLast ? "duration-500 flex w-full content-between cursor-default flex-row items-center rounded-sm h-12 border border-gray-400" : "duration-500 flex w-full content-between cursor-default flex-row items-center rounded-sm h-12 mb-4 border border-gray-400"
      }, extension.length < 5 ? /*#__PURE__*/React.createElement("div", {
        className: "px-3"
      }, /*#__PURE__*/React.createElement("div", {
        className: "pt-1",
        style: {
          width: "55px",
          height: "55px"
        }
      }, /*#__PURE__*/React.createElement(FileIcon, {
        fill: this.context.theme.themePalette.$300,
        text: extension.length < 4 ? extension.toUpperCase() : extension
      }))) : /*#__PURE__*/React.createElement("div", {
        className: "text-gray-700 pr-4 pl-4"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "1x",
        icon: faPaperclip
      })), /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "text-gray-700 leading-tight"
      }, this.props.name), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "text-gray-500 leading-tight pt-1"
      }, this.props.size, "KB")), /*#__PURE__*/React.createElement("div", {
        title: "Download",
        onClick: () => this.handleDownloadFile(),
        className: "icon duration-500 cursor-pointer text-gray-400 ml-auto pr-4"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "1x",
        icon: faEye
      })));
    } else if (this.props.mode === "notfound") {
      file = /*#__PURE__*/React.createElement("div", {
        title: this.props.title,
        className: "w-full"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col items-center justify-center border-gray-400 border rounded-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center"
      }, /*#__PURE__*/React.createElement("div", {
        className: "pb-2",
        style: {
          width: "155px"
        }
      }, /*#__PURE__*/React.createElement(NoFilesIcon, null))), /*#__PURE__*/React.createElement("div", {
        className: "flex flex-row pb-2"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "cursor-default text-gray-700 leading-tight"
      }, this.props.name))));
    }

    return /*#__PURE__*/React.createElement("div", null, file);
  }

}

_defineProperty(FileComponent, "contextType", CombinedContext);

const File = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(FileComponent, props));
};

export default File;