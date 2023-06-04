function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import flow from "lodash/flow";
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import File from "../../../Datatypes/Multimedia/File";
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";
import { FileUploadIcon } from "../../../../assets/icons/svg_icons";
import { mapFileExtension } from "../../../../assets/functions/HandleMultimediaFiles/mapFileExtension";

class MultimediaComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      hover: false,
      files: []
    });

    _defineProperty(this, "handleChange", (event, type) => {
      if (type === "add") {
        let file = {};
        let file64;
        file["name"] = event.target.files[0].name;
        file["size"] = event.target.files[0].size;
        file["type"] = event.target.files[0].type;
        file["URI"] = "";
        let ext = event.target.files[0].name.split(".").pop();
        let format = mapFileExtension(event.target.files[0].type, ext);
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = e => {
          //file["fileData"] = e.target.result;
          file64 = e.target.result.toString().replace(/^data:(.*,)?/, '');
          this.setState(prevState => ({ ...prevState,
            files: [...prevState.files, file64]
          }));
          this.context.datatypes.handleMultimediaFields(this.props.path, file64, format);
        };

        let value = [...this.props.value];
        let fileRemoved = value.filter(file => file.name !== event.target.files[0].name);
        this.props.onMultimediaChange(this.props.pathLabel, [...fileRemoved, file]);
      } else if (type === "remove") {
        let value = [...this.props.value];
        let fileRemoved = value.filter(file => file.name !== event.name);
        this.props.onMultimediaChange(this.props.pathLabel, fileRemoved);
      }
    });

    _defineProperty(this, "handleHover", action => {
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

  render() {
    let multimedia = null;
    let filesUploaded = null;
    multimedia = /*#__PURE__*/React.createElement("div", {
      className: "relative file-input"
    }, /*#__PURE__*/React.createElement("input", {
      onMouseOver: () => this.handleHover("over"),
      onMouseOut: () => this.handleHover("out"),
      title: this.props.description,
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
        borderColor: Array.isArray(this.context.theme) ? this.state.hover && this.context.theme[1] : this.state.hover && this.context.theme.themePalette.$400,
        backgroundColor: this.state.hover && this.context.theme.themePalette.$100 + "52"
      },
      className: "duration-500 flex flex-col items-center justify-center border-dashed border-2 rounded-sm h-48"
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
    filesUploaded = this.props.value.map((file, index) => {
      return /*#__PURE__*/React.createElement(File, {
        mode: "upload",
        onDeleteFile: () => this.handleChange(file, "remove"),
        key: index,
        name: file.name,
        data: this.state.files.filter((f, i) => i === index && f),
        type: file.type,
        size: Math.round(file.size * 0.0009765625)
      });
    });
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
      datatype: "DV_MULTIMEDIA",
      isRM: this.props.isRM,
      showDatatype: false
    }), /*#__PURE__*/React.createElement(FieldContainer, {
      path: this.props.path,
      datatype: this.props.item.dataType
    }, /*#__PURE__*/React.createElement(Label, {
      showLabel: this.props.showLabel,
      label: this.props.label,
      editMode: true,
      optional: this.props.optional,
      sectionOccurrence: this.props.sectionOccurrence
    }), multimedia, filesUploaded))));
  }

}

_defineProperty(MultimediaComponent, "contextType", CombinedContext);

class Multimedia extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(MultimediaComponent, this.props));
  }

}

export default flow(DragSource("form", fieldSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  // 9
  getItem: monitor.getItem()
})), DropTarget("form", fieldTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})))(Multimedia);