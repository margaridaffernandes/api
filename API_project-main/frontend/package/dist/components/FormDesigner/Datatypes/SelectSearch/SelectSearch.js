function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faCheck, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ContentState, EditorState } from "draft-js";
import flow from "lodash/flow";
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { debounce } from "../../../../assets/functions/Debounce/debounce";
import CombinedContext from "../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../contexts/ProviderCombinedContext";
import ComponentsStyle from "../../../../styles/ComponentsStyle";
import styles from "../../../../styles/custom.module.css";
import FieldContainer from "../../../UI/FieldContainer/FieldContainer";
import { fieldSource } from "../../SpecificationMethods/Source/fieldSource";
import { fieldTarget } from "../../SpecificationMethods/Target/fieldTarget";
import { style } from "../../Style/Style";
import ToolBarDesigner from "../../Toolbar/Toolbar";
import Label from "../../UI/Label/Label";
import { getEnvUrl } from "../../../../environment";

class SelectSearchComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      showDropdown: false,
      data: [],
      searchValue: "",
      focused: false,
      additionalData: []
    });

    _defineProperty(this, "handleClickOutside", event => {
      if (this.dropContainer.current && !this.dropContainer.current.contains(event.target)) {
        this.setState({
          showDropdown: false,
          data: [],
          additionalData: []
        });
      }
    });

    _defineProperty(this, "handleChange", value => {
      this.setState({
        showDropdown: false
      });
      this.props.onSelectSearchChange(this.props.pathLabel, value); // ACRESCENTAR OUTRAS OPÇÕES

      if (this.state.additionalData.length > 0) {
        const res = this.state.additionalData.filter(x => x.code === value.code);

        if (res.length > 0) {
          const paths = res[0].data;
          Object.keys(paths).forEach(path => {
            const newPath = path.split(".").join("-");

            if (paths[path] !== null) {
              const datatypes = this.props.internalFunctions[0].datatypeCompositionData[path];

              if (datatypes.datatype === "DV_TEXT" && datatypes.upperOccurrences === 1) {
                const fieldValue = EditorState.createWithContent(ContentState.createFromText(paths[path].toString()));
                this.props.onSelectSearchChange(newPath, fieldValue);
              } else if (datatypes.datatype === "DV_IDENTIFIER" && datatypes.upperOccurrences === 1) {
                this.props.onSelectSearchChange(newPath, paths[path].toString());
                this.context.fields.updateValue(newPath);
              }
            }
          });
        }
      }
    });

    _defineProperty(this, "handleChangeSearch", value => {
      this.setState({
        searchValue: value
      }, () => {
        this.context.fields.updateValue(this.props.pathLabel);
        this.props.onSelectSearchChange(this.props.pathLabel, {
          code: this.state.searchValue,
          text: this.state.searchValue
        });
      });

      if (value.length >= 3) {
        this.fetchData(value);
      }
    });

    _defineProperty(this, "fetchData", debounce(value => {
      let data = [];
      let additionalData = [];
      this.setState({
        showDropdown: true,
        data: [],
        additionalData: []
      });
      const context = this.context; // Seleciono logo o primeiro porque no caso de um drop downdown não haverá mais functions em princípio
      // Apenas uma função para ir buscar os valores da drop e pronto
      // A ver no futuro se isso se mantém
      // Há um url já definido porque não me mandam o url no internalFunctions

      if (this.props.internalFunctions.length !== 0) {
        let params = {};
        let url = "";

        if (this.props.internalFunctions[0].url) {
          url = this.props.internalFunctions[0].url + this.props.internalFunctions[0].name;
        } else {
          url = `${getEnvUrl('aidagequipas', '4001')}/${this.props.internalFunctions[0].name}`; // url = "http://172.21.220.44:4001/" + this.props.internalFunctions[0].name;
        }

        if (this.props.internalFunctions[0].definedParams !== null) {
          params = { ...this.props.internalFunctions[0].definedParams
          };
        }

        if (this.props.internalFunctions[0].undefinedParams !== null) {
          Object.keys(this.props.internalFunctions[0].undefinedParams).forEach(function (key) {
            if (key === "Codigos") {
              params["codigos"] = context.codigos;
            } else if (key === "QueryString") {
              params["query"] = value;
            }

            context.formData.referenceModel.forEach(obj => {
              if (key === obj.item) {
                params[key] = obj.value;
              }
            });
          });
        }

        axios({
          method: this.props.internalFunctions[0].method,
          url: url,
          headers: {
            Authorization: "Bearer " + context.token
          },
          data: params
        }).then(response => {
          if (response.data.success) {
            let i;

            for (i = 0; i < response.data.data.length; i++) {
              data.push(response.data.data[i]);
            }

            if (response.data.additionalData) {
              for (i = 0; i < response.data.additionalData.length; i++) {
                additionalData.push(response.data.additionalData[i]);
              }
            }
          }

          if (data.length === 0) {
            this.setState({
              showDropdown: false
            });
          } else {
            this.setState({
              data: data,
              additionalData: additionalData
            });
          }
        }).catch(error => {
          this.setState({
            showDropdown: false
          });
        });
      } else {
        this.setState({
          showDropdown: false
        });
      }
    }, 500));

    _defineProperty(this, "handleFocus", state => {
      if (state === "in") {
        if (this.state.data.length > 0) {
          this.setState({
            focused: true,
            showDropdown: true
          });
        } else {
          this.setState({
            focused: true
          });
        }
      } else if (state === "out") {
        this.setState({
          focused: false,
          searchValue: ""
        });
      }
    });

    _defineProperty(this, "handleClearSelectedValue", () => {
      this.props.onSelectSearchChange(this.props.pathLabel, "");
      this.setState({
        data: [],
        additionalData: []
      });
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    let dropListHeigth = {
      1: "h-8",
      2: "h-16",
      3: "h-24"
    };
    let dropList;

    if (this.state.data.length > 0) {
      dropList = /*#__PURE__*/React.createElement("div", {
        ref: this.dropContainer,
        style: {
          zIndex: 99999999
        },
        className: dropListHeigth[this.state.data.length] ? dropListHeigth[this.state.data.length] + " w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
      }, this.state.data.map((elemento, index) => {
        return /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(elemento),
          key: index,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.value.code === elemento.code ? "duration-300 relative flex items-center bg-blue-100 text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100" : "duration-300 relative flex items-center bg-white text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-blue-100"
        }, elemento.text, this.props.value.code === elemento.code && /*#__PURE__*/React.createElement("div", {
          className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faCheck
        })));
      }));
    } else {
      dropList = /*#__PURE__*/React.createElement("div", {
        ref: this.dropContainer,
        className: "flex items-center justify-center w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white h-12 overflow-y-auto border border-gray-200 rounded-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.dataLoaderSelectSearch
      }));
    }

    let selectSearch = /*#__PURE__*/React.createElement("div", {
      className: "w-full relative"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "sm",
      icon: faSearch
    })), this.props.value && !this.state.showDropdown && /*#__PURE__*/React.createElement("div", {
      onClick: () => this.handleClearSelectedValue(),
      className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faTimes
    })), /*#__PURE__*/React.createElement("input", {
      onFocus: () => this.handleFocus("in"),
      onBlur: () => this.handleFocus("out"),
      value: this.state.focused ? this.state.searchValue : this.props.value !== "" ? this.props.value.text : "",
      onChange: e => this.handleChangeSearch(e.target.value),
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: this.state.searchValue !== "" || this.props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2 pr-4 pl-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 flex items-center appearance-none w-full bg-gray-100 border border-gray-200 text-gray-500 py-2 pr-4 pl-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300",
      title: this.props.description,
      placeholder: this.props.value !== "" ? this.props.value.text : "Insira um texto para pesquisa..."
    }));
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
      datatype: "DV_CODED_TEXT",
      isRM: this.props.isRM,
      showDatatype: false
    }), /*#__PURE__*/React.createElement(FieldContainer, {
      path: this.props.path,
      datatype: this.props.item.dataType
    }, /*#__PURE__*/React.createElement(Label, {
      isRM: this.props.isRM,
      showLabel: this.props.showLabel,
      label: this.props.label,
      editMode: true,
      optional: this.props.optional,
      sectionOccurrence: this.props.sectionOccurrence
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, selectSearch, this.state.showDropdown && dropList)))));
  }

}

_defineProperty(SelectSearchComponent, "contextType", CombinedContext);

class SelectSearch extends Component {
  render() {
    return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(SelectSearchComponent, this.props));
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
})))(SelectSearch);