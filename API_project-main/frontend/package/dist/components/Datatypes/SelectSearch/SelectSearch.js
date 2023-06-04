function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { faCheck, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ContentState, EditorState } from "draft-js";
import React, { Component } from "react";
import { debounce } from "../../../assets/functions/Debounce/debounce";
import CombinedContext from "../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../contexts/ProviderCombinedContext";
import styles from "../../../styles/custom.module.css";
import FieldContainer from "../../UI/FieldContainer/FieldContainer";
import Label from "../../UI/Label/Label";
import ValidationError from "../../UI/ValidationError/ValidationError";
import { handleInternalFunctions } from "../../../assets/functions/InternalFuntions/handleInternalFunctions";
import { getEnvUrl } from "../../../environment"; // ESTE COMPONENTE NÃO FOI MUDADO PARA HOOKS POR CAUSA DA CALLBACK A SEGUIR AO SETSTATE

class SelectSearchComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dropContainer", /*#__PURE__*/React.createRef());

    _defineProperty(this, "state", {
      showDropdown: false,
      data: [],
      searchValue: "",
      focused: false,
      additionalData: [],
      fetchedRefset: false
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

    _defineProperty(this, "handleChange", async value => {
      await this.context.fields.updateValue(this.props.pathLabel);
      this.setState({
        showDropdown: false
      });
      await this.props.onSelectSearchChange(this.props.pathLabel, value); // Ver se internal functions para processar

      if (Array.isArray(this.props.internalFunctions) && this.props.internalFunctions.length > 0) {
        await handleInternalFunctions(this.props.internalFunctions, this.props.onSelectSearchChange, this.context.token, this.props.values, this.context.fields);
      } // ACRESCENTAR OUTRAS OPÇÕES => Antigas internal functions


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
                this.context.fields.updateValue(newPath);
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
        let filteredData = [];

        if (Array.isArray(this.state.data) && this.state.data.length > 0) {
          filteredData = this.state.data.filter(d => {
            return d.text.toLowerCase().includes(this.state.searchValue.toLowerCase());
          });
        }

        this.setState({
          data: filteredData
        });
      });
    });

    _defineProperty(this, "fetchData", debounce(value => {
      let data = [];
      let additionalData = [];
      this.setState({
        showDropdown: true,
        data: [],
        additionalData: []
      });
      const context = this.context; // Vai ver se tem refset em primeiro

      if (Array.isArray(this.props.refset) && this.props.refset.length > 0) {
        this.setState({
          fetchedRefset: true
        }, () => {
          if (this.props.refset[0].includes("code") && this.props.refset[0].includes("text")) {
            axios({
              method: "get",
              url: `${this.props.refset[0]}`,
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
        } // COMENTEI ESTA PARTE PORQUE AGORA JÁ NÃO TEMOS O 'VALUE'
        // A função deixou de ser chamada no handleChangeSearch e passou a ser chamada no onClick
        // VER ESTA QUESTÃO -> VOU TER QUE ARRANJAR FORMA DE DETETAR QUANDO É QUE VAI SER PARA ENVIAR O PARÂMETRO 'QUERY'
        // if (this.props.internalFunctions[0].undefinedParams !== null) {
        //   Object.keys(this.props.internalFunctions[0].undefinedParams).forEach(
        //     function (key) {
        //       if (key === "Codigos") {
        //         params["codigos"] = context.codigos;
        //       } else if (key === "QueryString") {
        //         params["query"] = value;
        //       }
        //       context.formData.referenceModel.forEach((obj) => {
        //         if (key === obj.item) {
        //           params[key] = obj.value;
        //         }
        //       });
        //     }
        //   );
        // }


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
        this.props.onTouch(this.props.pathLabel);
        this.setState({
          focused: false,
          searchValue: ""
        });
      }
    });

    _defineProperty(this, "handleClearSelectedValue", () => {
      this.context.fields.updateValue(this.props.pathLabel);
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

    let selectSearch = this.props.isFieldEditable ? /*#__PURE__*/React.createElement("div", {
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
      onClick: () => this.fetchData(),
      onChange: e => this.handleChangeSearch(e.target.value),
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: this.props.error ? this.state.searchValue !== "" || this.props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-red-500 text-gray-700 py-2 pr-4 pl-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-red-500 text-gray-500 py-2 pr-4 pl-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-red-500" : this.state.searchValue !== "" || this.props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 pr-4 pl-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 py-2 pr-4 pl-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300",
      title: this.props.description,
      placeholder: this.props.value !== "" ? this.props.value.text : "Insira um texto para pesquisa..."
    })) : /*#__PURE__*/React.createElement("div", {
      className: "w-full relative cursor-not-allowed opacity-50"
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-y-0 left-0 flex items-center px-3 text-gray-700"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      size: "sm",
      icon: faSearch
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: this.context.font.fontSize.field
      },
      className: this.state.searchValue !== "" || this.props.value !== "" ? "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 pr-4 pl-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300" : "block h-10 flex items-center appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 py-2 pr-4 pl-8 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-300"
    }, this.props.value !== "" ? this.props.value.text : "Insira um texto para pesquisa..."));
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

_defineProperty(SelectSearchComponent, "contextType", CombinedContext);

const SelectSearch = props => {
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(SelectSearchComponent, props));
};

export default SelectSearch;