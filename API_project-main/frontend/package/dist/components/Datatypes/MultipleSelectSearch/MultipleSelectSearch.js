function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faCheck, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { debounce } from "../../../assets/functions/Debounce/debounce";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import styles from "../../../styles/custom.module.css";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import { getEnvUrl } from "../../../environment";

class MultipleSelectSearchComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      data: [],
      searchValue: "",
      showDropdown: false,
      focused: false,
      height: 0,
      width: 0,
      fetchedRefset: false
    });

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "heightContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "handleClickOutside", event => {
      if (this.dropContainer.current && !this.dropContainer.current.contains(event.target)) {
        this.setState({
          showDropdown: false,
          searchValue: ""
        });
      }
    });

    _defineProperty(this, "handleChange", item => {
      this.context.fields.updateValue(this.props.pathLabel);

      if (this.props.value.indexOf(item) > -1) {
        // Remover
        let value = [...this.props.value].filter(option => option.code !== item.code);
        this.props.onMultiSelectSearchChange(this.props.pathLabel, value);
      } else {
        // Adicionar
        let value = [...this.props.value];
        this.props.onMultiSelectSearchChange(this.props.pathLabel, [...value, item]);
      }
    });

    _defineProperty(this, "handleRemoveItem", (event, obj) => {
      event.stopPropagation();
      this.context.fields.updateValue(this.props.pathLabel);
      let value = [...this.props.value].filter(option => option.code !== obj.code);
      this.props.onMultiSelectSearchChange(this.props.pathLabel, value);
    });

    _defineProperty(this, "handleClearAll", event => {
      event.stopPropagation();
      this.context.fields.updateValue(this.props.pathLabel);
      this.props.onMultiSelectSearchChange(this.props.pathLabel, []);
      this.setState({
        data: []
      });
    });

    _defineProperty(this, "handleChangeSearch", value => {
      this.setState({
        searchValue: value
      });

      if (value.length >= 3) {
        this.fetchData(value);
      }
    });

    _defineProperty(this, "fetchData", debounce(value => {
      let data = [];
      this.setState({
        showDropdown: true,
        data: []
      });
      const context = this.context; // Vai ver se tem refset em primeiro

      if (Array.isArray(this.props.refset) && this.props.refset.length > 0) {
        this.setState({
          fetchedRefset: true
        }, () => {
          if (this.props.refset[0].includes("code") && this.props.refset[0].includes("text")) {
            axios({
              method: "get",
              url: `${this.props.refset[0]}&query=${value}`,
              headers: {
                Authorization: `Bearer ${this.context.token}`
              }
            }).then(res => {
              if (res.data.success === true || res.data.success === "true") {
                if (Array.isArray(res.data.concepts) && res.data.concepts.length > 0) {
                  this.setState({
                    data: res.data.concepts
                  });
                } else {
                  this.setState({
                    showDropdown: false
                  });
                }
              } else {
                this.setState({
                  showDropdown: false
                });
              }
            }).catch(err => {
              this.setState({
                showDropdown: false
              });
            });
          } else if (this.props.concepts) {
            this.setState({
              data: this.props.concepts
            });
          }
        });
      } else if (this.state.fetchedRefset === false && this.props.internalFunctions.length !== 0) {
        // Seleciono logo o primeiro porque no caso de um drop downdown não haverá mais functions em princípio
        // Apenas uma função para ir buscar os valores da drop e pronto
        // A ver no futuro se isso se mantém
        // Há um url já definido porque não me mandam o url no internalFunctions
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
          }

          if (data.length === 0) {
            this.setState({
              showDropdown: false
            });
          } else {
            this.setState({
              data: data
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
        this.props.onTouch(this.props.pathLabel);
        this.setState({
          focused: false,
          searchValue: ""
        });
      }
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      height: this.heightContainer.current.offsetHeight
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate() {
    if (this.state.height !== this.heightContainer.current.offsetHeight) {
      this.setState({
        height: this.heightContainer.current.offsetHeight
      });
    }
  }

  render() {
    let dropList;
    let dropListHeigth = {
      1: "h-8",
      2: "h-16",
      3: "h-24"
    };
    let placeholder = "Insira um texto para pesquisa...";
    const focusedStyle = this.state.showDropdown || this.state.focused ? "bg-white border-gray-300" : "bg-gray-200 border-gray-200";
    const styleError = this.state.showDropdown || this.state.focused ? "bg-white border-red-500" : "bg-gray-200 border-red-500";
    const itemStyle = this.state.showDropdown || this.state.focused ? "bg-gray-200 border-gray-300" : "bg-white border-gray-300";

    if (this.state.data.length > 0) {
      dropList = /*#__PURE__*/React.createElement("div", {
        style: {
          zIndex: 99999999,
          marginTop: this.state.height
        },
        ref: this.dropContainer,
        className: dropListHeigth[this.state.data.length] ? dropListHeigth[this.state.data.length] + " w-full absolute inset-y-0 z-10 cursor-pointer bg-white overflow-y-auto border border-gray-200 rounded-sm" : "w-full absolute inset-y-0 z-10 cursor-pointer bg-white h-32 overflow-y-auto border border-gray-200 rounded-sm"
      }, this.state.data.map((elemento, index) => {
        return /*#__PURE__*/React.createElement("div", {
          onClick: () => this.handleChange(elemento),
          key: index,
          style: {
            fontSize: this.context.font.fontSize.field
          },
          className: this.props.value.filter(obj => obj.code === elemento.code).length > 0 ? "duration-300 bg-blue-100 hover:bg-blue-100 relative flex items-center text-gray-700 leading-tight h-8 px-4 hover:outline" : "duration-300 bg-white hover:bg-blue-100 flex items-center text-gray-700 leading-tight h-8 px-4 hover:outline hover:bg-gray-200"
        }, elemento.text, this.props.value.filter(obj => obj.code === elemento.code).length > 0 && /*#__PURE__*/React.createElement("div", {
          className: "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
        }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          size: "xs",
          icon: faCheck
        })));
      }));
    } else {
      dropList = /*#__PURE__*/React.createElement("div", {
        style: {
          zIndex: 99999999,
          marginTop: this.state.height
        },
        ref: this.dropContainer,
        className: "flex items-center justify-center w-full absolute inset-y-0 mt-10 z-10 cursor-pointer bg-white h-12 overflow-y-auto border border-gray-200 rounded-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.dataLoaderSelectSearch
      }));
    }

    let selectSearch = /*#__PURE__*/React.createElement("div", {
      ref: this.heightContainer,
      onClick: () => this.refs.input.focus(),
      className: "w-full relative"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cursor-default absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "sm",
      icon: faSearch
    })), /*#__PURE__*/React.createElement("div", {
      title: this.props.description,
      style: {
        minHeight: "2.5rem",
        fontSize: this.context.font.fontSize.field
      },
      className: this.props.error ? this.props.value.length !== 0 ? "flex flex-row pl-8 pr-8 flex-wrap items-center appearance-none w-full border rounded-sm focus:outline-none " + styleError : "flex flex-row pl-8 pr-8 flex-wrap items-center appearance-none w-full border rounded-sm focus:outline-none " + styleError : this.props.value.length !== 0 ? "flex flex-row pl-8 pr-8 flex-wrap items-center appearance-none w-full border rounded-sm focus:outline-none " + focusedStyle : "flex flex-row pl-8 pr-8 flex-wrap items-center appearance-none w-full border rounded-sm focus:outline-none " + focusedStyle
    }, this.props.value.length !== 0 && this.props.value.map((obj, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "mr-1 my-1 flex flex-row items-center rounded-sm shadow-xs py-1 px-1 border " + itemStyle
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: this.context.font.fontSize.field
        },
        className: "text-gray-700"
      }, obj.text), /*#__PURE__*/React.createElement("div", {
        onClick: event => this.handleRemoveItem(event, obj),
        className: "duration-500 flex items-center cursor-pointer ml-2 mr-1 text-gray-400 hover:text-gray-700"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        size: "xs",
        icon: faTimes
      })));
    }), /*#__PURE__*/React.createElement("input", {
      ref: "input",
      value: this.state.searchValue,
      onFocus: () => this.handleFocus("in"),
      onBlur: () => this.handleFocus("out"),
      onChange: e => this.handleChangeSearch(e.target.value),
      style: this.state.searchValue === "" ? this.state.focused ? {
        width: 32 + "px",
        fontSize: this.context.font.fontSize.field
      } : this.props.value.length > 0 ? {
        width: 32 + "px",
        fontSize: this.context.font.fontSize.field
      } : {
        width: placeholder.length * 32 + "px",
        fontSize: this.context.font.fontSize.field
      } : this.state.focused ? {
        width: this.state.searchValue.length * 32 + "px",
        fontSize: this.context.font.fontSize.field
      } : {
        width: 32 + "px",
        fontSize: this.context.font.fontSize.field
      },
      className: this.state.searchValue !== "" || this.props.value.length > 0 ? "bg-transparent h-10 px-1 flex items-center appearance-none text-gray-700 py-2 leading-tight focus:outline-none" : "bg-transparent h-10 px-1 flex items-center appearance-none text-gray-500 py-2 leading-tight focus:outline-none",
      title: this.props.description,
      placeholder: this.props.value.length > 0 || this.state.focused ? "" : placeholder
    })), this.props.value.length > 0 && !this.state.showDropdown && /*#__PURE__*/React.createElement("div", {
      onClick: event => this.handleClearAll(event),
      className: "duration-500 cursor-pointer absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "xs",
      icon: faTimes
    })));
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
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, selectSearch, this.state.showDropdown && dropList), this.props.error && /*#__PURE__*/React.createElement(ValidationError, {
      errorMessage: this.props.error
    })));
  }

}

_defineProperty(MultipleSelectSearchComponent, "contextType", CombinedContext);

const MultipleSelectSearch = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(MultipleSelectSearchComponent, props));
};

export default MultipleSelectSearch;