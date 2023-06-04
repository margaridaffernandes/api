function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import File from "./File";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import { FileUploadIcon } from "../../../assets/icons/svg_icons"; //import {removeMultimediaFiles} from "../../../assets/functions/HandleMultimediaFiles/removeMultimediaFiles";

import { mapFileExtension } from "../../../assets/functions/HandleMultimediaFiles/mapFileExtension";
import axios from "axios";
import { getEnvUrl } from "../../../environment";

class MultimediaComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      hover: false,
      files: []
    });

    _defineProperty(this, "deleteFile", event => {
      let value = [...this.props.value];
      let fileRemoved = value.filter(file => file.name !== event.name);
      this.props.onMultimediaChange(this.props.pathLabel, fileRemoved);
    });

    _defineProperty(this, "handleChange", (event, type) => {
      this.context.fields.updateValue(this.props.pathLabel);

      if (type === "add") {
        let file = {};
        let file64;
        let ext = event.target.files[0].name.split(".").pop();
        file["name"] = event.target.files[0].name;
        file["size"] = event.target.files[0].size;
        file["type"] = event.target.files[0].type;
        file["URI"] = "";
        let format = mapFileExtension(event.target.files[0].type, ext);
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = e => {
          file64 = e.target.result.toString().replace(/^data:(.*,)?/, '');
          this.setState(prevState => ({ ...prevState,
            files: [...prevState.files, file64]
          }));
          this.context.datatypes.handleMultimediaFields(this.props.path, file64, format);
        };

        let value = [...this.props.value];
        let fileRemoved = value.filter(file => file.name !== event.target.files[0].name);
        this.props.onMultimediaChange(this.props.pathLabel, [...fileRemoved, file]);

        if (this.context.formMode !== "consult") {
          this.setState({
            hover: false
          });
          document.getElementById('svgMultimediaFile1').classList.remove("animate-horizontal");
          document.getElementById('svgMultimediaFile2').classList.remove("animate-horizontal2");
          document.getElementById('svgMultimediaFile3').classList.remove("animate-vertical");
        }
      } else if (type === "remove") {
        // se tiver URI e idComposition significa que o ficheiro já está guardado na composition
        // é necessário chamar o serviço para remover o ficheiro da BD
        if (this.props.idComposition && event.URI) {
          axios({
            method: "post",
            url: `${getEnvUrl('aidaauth', '4000')}/removeMultimedia`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer " + this.context.token
            },
            data: {
              compositionId: this.props.idComposition.toString(),
              URI: event.URI.toString(),
              userInfo: this.props.userInfo.toString()
            }
          }).then(res => {
            res && this.deleteFile(event);
          }); // DEVIDO À FIREWALL FOI NECESSÁRIO MIGRAR AS CHAMADAS PARA UM SERVIÇO FORA DA APP
          // removeMultimediaFiles(event.URI, this.props.idComposition, this.props.userInfo).then((res) => {
          //     res && this.deleteFile(event)
          // })
        } else {
          this.deleteFile(event);
        }
      }
    });

    _defineProperty(this, "handleTouch", () => {
      this.props.onTouch(this.props.pathLabel);
    });

    _defineProperty(this, "handleHover", (e, action) => {
      e.preventDefault();

      if (action === "over") {
        if (!this.state.hover) {
          this.setState({
            hover: true
          });
        }
      } else if (action === "out") {
        if (this.state.hover) {
          this.setState({
            hover: false
          });
        }
      }
    });
  }

  componentDidMount() {
    if (this.context.formMode !== "consult") {
      document.getElementById('fileInput').addEventListener('dragenter', () => {
        this.setState({
          hover: true
        });
        document.getElementById('svgMultimediaFile1').classList.add("animate-horizontal");
        document.getElementById('svgMultimediaFile2').classList.add("animate-horizontal2");
        document.getElementById('svgMultimediaFile3').classList.add("animate-vertical");
      });
      document.getElementById('fileInput').addEventListener('dragleave', () => {
        this.setState({
          hover: false
        });
        document.getElementById('svgMultimediaFile1').classList.remove("animate-horizontal");
        document.getElementById('svgMultimediaFile2').classList.remove("animate-horizontal2");
        document.getElementById('svgMultimediaFile3').classList.remove("animate-vertical");
      });
    }
  }

  render() {
    let multimedia = null;
    let filesUploaded = null;

    if (this.props.editMode) {
      multimedia = /*#__PURE__*/React.createElement("div", {
        className: "relative file-input"
      }, /*#__PURE__*/React.createElement("input", {
        id: "fileInput",
        onMouseOver: e => this.handleHover(e, "over"),
        onMouseOut: e => this.handleHover(e, "out"),
        title: this.props.description,
        onBlur: this.handleTouch.bind(this),
        className: "z-20 opacity-0 h-48 w-full cursor-pointer",
        type: "file",
        accept: this.context.datatypes.fileExtensions[this.props.path]?.map(f => {
          return f.extension;
        }).join(''),
        onChange: event => this.handleChange(event, "add")
      }), /*#__PURE__*/React.createElement("div", {
        className: "w-full pointer-events-none absolute top-0 bottom-0"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          borderColor: this.props.error ? null : this.state.hover && Array.isArray(this.context.theme) ? this.state.hover && this.context.theme[1] : this.state.hover && this.context.theme.themePalette.$400,
          backgroundColor: this.state.hover && this.context.theme.themePalette.$100 + "52"
        },
        className: this.props.error ? this.state.hover ? "duration-500 flex flex-col items-center justify-center border-dashed border-red-500 bg-gray-100 border-2 rounded-sm h-48" : "duration-500 flex flex-col items-center justify-center border-dashed border-red-500 bg-white border-2 rounded-sm h-48" : "duration-500 flex flex-col items-center justify-center border-dashed border-2 rounded-sm h-48"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center"
      }, /*#__PURE__*/React.createElement("div", {
        className: "pb-3",
        style: {
          width: "155px"
        }
      }, /*#__PURE__*/React.createElement(FileUploadIcon, null))), /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col pb-2 text-center"
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field,
          color: this.context.theme.themePalette.$600
        },
        className: "text-gray-700 leading-tight pb-1"
      }, "Arraste um ficheiro para esta \xE1rea"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "text-gray-700 leading-tight pb-1"
      }, /*#__PURE__*/React.createElement("u", null, "OU")), /*#__PURE__*/React.createElement("button", {
        style: {
          fontSize: this.context.font.fontSize.field,
          backgroundColor: this.context.theme.themePalette.$300
        },
        className: "rounded-lg text-white font-semibold py-2"
      }, "Carregue um arquivo")))));
    } else if (!this.props.editMode && Array.isArray(this.props.value)) {
      multimedia = this.props.value.map((file, index) => {
        return /*#__PURE__*/React.createElement(File, {
          title: this.props.description,
          mode: "download",
          key: index,
          isLast: index === this.props.value.length - 1,
          name: file.name,
          type: file.type,
          data: this.state.files.filter((f, i) => i === index && f),
          URI: file.URI,
          idComposition: this.props.idComposition,
          size: Math.ceil(file.size * 0.0009765625)
        });
      });
    } else if (!this.props.editMode && !Array.isArray(this.props.value)) {
      multimedia = /*#__PURE__*/React.createElement(File, {
        title: this.props.description,
        mode: "notfound",
        name: "N\xE3o foram encontrados ficheiros"
      });
    }

    if (this.props.editMode) {
      filesUploaded = this.props.value.map((file, index) => {
        return /*#__PURE__*/React.createElement(File, {
          mode: "upload",
          onDeleteFile: () => this.handleChange(file, "remove"),
          key: index,
          name: file.name,
          type: file.type,
          data: this.state.files.filter((f, i) => i === index && f),
          URI: file.URI,
          idComposition: this.props.idComposition,
          size: Math.ceil(file.size * 0.0009765625)
        });
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      style: {
        order: this.props.order,
        width: this.context.sizes.sizes[this.props.path] ? this.context.sizes.sizes[this.props.path] : "100%"
      },
      className: "flex"
    }, /*#__PURE__*/React.createElement(FieldContainer, null, /*#__PURE__*/React.createElement(Label, {
      label: this.props.label,
      editMode: this.props.editMode,
      optional: this.props.optional,
      showLabel: this.props.showLabel,
      optionalMandatory: this.props.optionalMandatory,
      sectionOccurrence: this.props.sectionOccurrence
    }), multimedia, filesUploaded, this.props.error && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.error
    })));
  }

}

_defineProperty(MultimediaComponent, "contextType", CombinedContext);

const Multimedia = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(MultimediaComponent, props));
};

export default Multimedia;