function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import { checkIfValidObject } from "../../assets/functions/CheckIfValidObject/CheckIfValidObject";
import { handleSubmit } from "../../assets/functions/HandleSubmit/handleSubmit";
import { handleIsVisible } from "../../assets/functions/HandleTasks/handleIsVisible";
import PageContainer from "../../components/UI/PageContainer/PageContainer";
import BackgroundContext from "../../contexts/BackgroundContext";
import ChangedFieldsContext from "../../contexts/ChangedFieldsContext";
import CodigosDependenciaContext from "../../contexts/CodigosDependenciaContext";
import CompositionPlanningContext from "../../contexts/CompositionPlanningContext";
import DatatypesContext from "../../contexts/DatatypesContext";
import FontContext from "../../contexts/FontContext";
import FormDataContext from "../../contexts/FormDataContext";
import FormOrderContext from "../../contexts/FormOrderContext";
import HSizesContext from "../../contexts/HSizesContext";
import ThemeContext from "../../contexts/ThemeContext";
import TokenContext from "../../contexts/TokenContext";
import DlmContextProvider from "../../contexts/DlmContext";
import SectionArchetypeContext from "../../contexts/SectionArchetypeContext";
import FormConsultMode from "./FormModes/FormConsultMode";
import { buildJDTRules } from "../../assets/functions/BuildJDTRules/BuildJDTRules";
import { handleOrder } from "../../assets/functions/HandleOrder/HandleOrder";
import { handleOrderAnyItens } from "../../assets/functions/HandleOrder/HandleOrderAnyItens";
import FormDesignerMode from "./FormModes/FormDesignerMode";
import FormEditMode from "./FormModes/FormEditMode";
import themeColors from "../../assets/colors/ThemeColors";
import objPath from "object-path";
import FormModeContext from "../../contexts/FormModeContext";
import ReferenceModelContext from "../../contexts/ReferenceModelContext";
import { orderObjectByValue } from "../../assets/functions/Order/orderObjectByValue";

class Form extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      editMode: false,
      confirmEditMode: false,
      themeColor: {},
      backgroundColor: "default",
      showPalette: false,
      showPrint: false,
      professionalTasks: [],
      canSubmit: true,
      canSave: true,
      canCancel: true,
      canSaveFD: true,
      canCreateFD: true,
      reportData: {},
      patientData: {},
      buttonClicked: "",
      changedFields: [],
      token: null,
      codigosDependencia: null,
      idJDT: null,
      idComposition: null,
      template: null,
      dlm: null,
      templateGroupId: null,
      formDesignerMode: false,
      formOrder: null,
      formTitle: null,
      datatypes: {},
      textHeight: {},
      showSectionTitle: {},
      limitCharacters: {},
      hsizes: {},
      fileExtensions: {},
      fileMaxSize: {},
      referenceModel: [],
      fontSize: {},
      fontStyle: {},
      fontAlignment: {},
      fontLetters: {},
      openCompositionPlanning: false,
      openCompositionPlanningPath: "",
      openCompositionPlanningDatatype: "",
      compositionPlanning: {},
      compositionPlanningRefsets: [],
      compositionPlanningFunctions: [],
      compositionPlanningInternalFunctions: [],
      compositionPlanningTasks: [],
      formFields: [],
      openSectionArchetype: false,
      openSectionArchetypeData: null,
      sectionArchetype: {},
      multimediaFields: [],
      referenceModelJDT: {},
      referenceModelForm: [],
      formRM: []
    });

    _defineProperty(this, "handleChangedFields", path => {
      if (this.state.changedFields.indexOf(path) === -1) {
        this.setState(prevState => ({ ...prevState,
          changedFields: [...prevState.changedFields, path]
        }));
      }
    });

    _defineProperty(this, "handleSubmit", async (values, multipleSections) => {
      let jsonValues = handleSubmit(this.state.template, values, this.props.formRM);
      multipleSections.forEach(function (section) {
        const path = section.path.split("-").join(".") + ".value";
        jsonValues[path] = section.values;
      });
      let changedFields;
      changedFields = this.state.changedFields.map(path => {
        const newPath = path.split("-").join(".");
        return newPath;
      }).join(";");

      if (typeof this.props.onSubmit === "function" && this.state.buttonClicked === "submit") {
        this.props.onSubmit(JSON.stringify(jsonValues), changedFields);
        this.setState({
          buttonClicked: ""
        });
      } else if (typeof this.props.onSave === "function" && this.state.buttonClicked === "save") {
        this.props.onSave(JSON.stringify(jsonValues), changedFields);
        this.setState({
          buttonClicked: ""
        });
      }
    });

    _defineProperty(this, "handleCancelForm", () => {
      if (typeof this.props.onCancel === "function") {
        this.props.onCancel(true);
      }
    });

    _defineProperty(this, "handleFormOrder", (actionType, isSection, isSectionHover, dragPath, hoverPath, dragOrder, hoverOrder, showLabelDrag, showLabelHover, isAnyDrag, isAnyHover) => {
      let objOrder;

      if (actionType === "general") {
        objOrder = handleOrder(isSection, isSectionHover, dragPath, hoverPath, dragOrder, hoverOrder, showLabelDrag, showLabelHover, isAnyDrag, isAnyHover, this.state.formOrder);
      } else if (actionType === "anyItens") {
        objOrder = handleOrderAnyItens(dragPath, dragOrder, hoverOrder, this.state.formOrder);
      }

      this.setState({
        formOrder: objOrder
      });
    });

    _defineProperty(this, "handleRM", (path, key, value) => {
      this.setState(prevState => ({ ...prevState,
        referenceModelForm: prevState.referenceModelForm.map(item => item.itemPath === path ? { ...item,
          [key]: value
        } : item)
      }));
    });

    _defineProperty(this, "handleAddRM", (rmItem, isSectionHover, dragPath, hoverPath, dragOrder, hoverOrder, showLabelHover, isAnyHover, dropSectionPath, dragGroupID) => {
      if (this.state.referenceModelForm.indexOf(rmItem) === -1) {
        //rearranjar a ordem dos componentes
        let objOrder = handleOrder(false, isSectionHover, dragPath, hoverPath, dragOrder, hoverOrder, false, showLabelHover, false, isAnyHover, this.state.formOrder); //ir buscar o path da secção para a qual o item foi arrastado

        rmItem["parentPath"] = dropSectionPath;
        rmItem["groupID"] = dragGroupID; //actualizar o referenceModelForm com o componente colocado e a ordem

        this.setState(prevState => ({ ...prevState,
          referenceModelForm: [...prevState.referenceModelForm, rmItem],
          formOrder: objOrder
        }));
      }
    });

    _defineProperty(this, "handleRemoveRM", itemPathRM => {
      let path = itemPathRM.split(".").splice(1); // quando se clica no botão de remoção de um componente RM é preciso:
      // 1. apagar esse elemento do referenceModelForm

      this.setState(prevState => ({ ...prevState,
        referenceModelForm: prevState.referenceModelForm.filter(item => item.itemPath !== path.join("."))
      })); //2. remover esse elemento do formOrder e reajustar a ordem dos restantes elementos
      // obter a ordem do elemento que estamos a remover

      let orderToRemove = this.state.formOrder[itemPathRM]; // remover o elemento

      let objOrder = { ...this.state.formOrder
      };
      Object.keys(objOrder).forEach(path => {
        if (objOrder[path] === orderToRemove) {
          delete objOrder[path];
        } else if (objOrder[path] > orderToRemove) {
          objOrder[path] = objOrder[path] - 1; //move item down
        }
      });
      this.setState(prevState => ({ ...prevState,
        formOrder: objOrder
      }));
    });

    _defineProperty(this, "handleThemeColor", color => {
      this.setState({
        themeColor: color
      });
    });

    _defineProperty(this, "handleThemePalette", (color, values) => {
      if (color === "personalizada") {
        this.setState({
          themePalette: values
        });
      } else if (themeColors[color]) {
        this.setState({
          themePalette: themeColors[color]
        });
      }
    });

    _defineProperty(this, "handleCancelThemeChange", (previousColor, previousValues) => {
      this.setState({
        themeColor: previousColor,
        themePalette: previousValues
      });
    });

    _defineProperty(this, "handleFontSize", (type, value) => {
      this.setState(prevState => ({ ...prevState,
        fontSize: { ...prevState.fontSize,
          [type]: value
        }
      }));
    });

    _defineProperty(this, "handleFontStyle", (type, value) => {
      this.setState(prevState => ({ ...prevState,
        fontStyle: { ...prevState.fontStyle,
          [type]: value
        }
      }));
    });

    _defineProperty(this, "handleFontAlignment", (type, value) => {
      this.setState(prevState => ({ ...prevState,
        fontAlignment: { ...prevState.fontAlignment,
          [type]: value
        }
      }));
    });

    _defineProperty(this, "handleFontLetters", (type, value) => {
      this.setState(prevState => ({ ...prevState,
        fontLetters: { ...prevState.fontLetters,
          [type]: value
        }
      }));
    });

    _defineProperty(this, "handleCancelFontChange", (prevSizeValues, prevStyleValues, prevLetterValues, prevAlignValues) => {
      this.setState({
        fontSize: prevSizeValues,
        fontStyle: prevStyleValues,
        fontLetters: prevLetterValues,
        fontAlignment: prevAlignValues
      });
    });

    _defineProperty(this, "handleDatatypes", (path, datatype) => {
      this.setState(prevState => ({ ...prevState,
        datatypes: { ...prevState.datatypes,
          [path]: datatype
        }
      }));
    });

    _defineProperty(this, "handleMultimediaFields", (path, file, format) => {
      this.setState(prevState => ({ ...prevState,
        multimediaFields: [...prevState.multimediaFields, {
          [path]: file,
          format: format
        }]
      }));
    });

    _defineProperty(this, "handleTextHeight", (path, height) => {
      this.setState(prevState => ({ ...prevState,
        textHeight: { ...prevState.textHeight,
          [path]: height
        }
      }));
    });

    _defineProperty(this, "handleSectionTitleVisibility", (path, isVisible) => {
      this.setState(prevState => ({ ...prevState,
        showSectionTitle: { ...prevState.showSectionTitle,
          [path]: isVisible
        }
      }));
    });

    _defineProperty(this, "handleLimitCharacaters", (path, max) => {
      this.setState(prevState => ({ ...prevState,
        limitCharacters: { ...prevState.limitCharacters,
          [path]: max
        }
      }));
    });

    _defineProperty(this, "handleRemoveField", (path, type) => {
      if (type === "textHeight") {
        this.setState(prevState => {
          let obj = {};
          Object.keys(prevState.textHeight).forEach(p => {
            if (p !== path) {
              obj[p] = prevState.textHeight[p];
            }
          });
          return { ...prevState,
            textHeight: obj
          };
        });
      } else if (type === "limitCharacters") {
        this.setState(prevState => {
          let obj = {};
          Object.keys(prevState.limitCharacters).forEach(p => {
            if (p !== path) {
              obj[p] = prevState.limitCharacters[p];
            }
          });
          return { ...prevState,
            limitCharacters: obj
          };
        });
      }
    });

    _defineProperty(this, "handleHSizes", (path, size) => {
      this.setState(prevState => ({ ...prevState,
        hsizes: { ...prevState.hsizes,
          [path]: size
        }
      }));
    });

    _defineProperty(this, "handleFileExtensions", (path, extensions) => {
      this.setState(prevState => ({ ...prevState,
        fileExtensions: { ...prevState.fileExtensions,
          [path]: extensions
        }
      }));
    });

    _defineProperty(this, "handleFileMaxSize", (path, value) => {
      this.setState(prevState => ({ ...prevState,
        fileMaxSize: { ...prevState.fileMaxSize,
          [path]: value
        }
      }));
    });

    _defineProperty(this, "handleOpenSectionArchetype", (path = null) => {
      if (path === null) {
        this.setState({
          openSectionArchetype: false,
          openSectionArchetypeData: null
        });
      } else {
        const archetype = objPath.get(this.state.templateGroupId, path);
        this.setState(prevState => ({ ...prevState,
          openSectionArchetype: true,
          openSectionArchetypeData: {
            parentPath: path,
            parentName: archetype.node ? archetype.node.text : "",
            parentOrder: prevState.formOrder[path]
          }
        }));
      }
    });

    _defineProperty(this, "handleEditSectionArchetype", (status, path, newName = "") => {
      if (status === "open") {
        this.setState(prevState => ({ ...prevState,
          openSectionArchetype: true,
          openSectionArchetypeData: {
            path: path,
            parentName: prevState.sectionArchetype[path].parentName
          }
        }));
      } else if ("edit") {
        this.setState(prevState => ({ ...prevState,
          openSectionArchetype: false,
          openSectionArchetypeData: null,
          sectionArchetype: { ...prevState.sectionArchetype,
            [path]: { ...prevState.sectionArchetype[path],
              sectionName: newName
            }
          }
        }));
      }
    });

    _defineProperty(this, "handleRemoveSectionArchetype", path => {
      this.setState(prevState => {
        let newSectionArchetype = {};
        let obj = {};
        Object.keys(prevState.sectionArchetype).forEach(x => {
          if (x !== path) {
            newSectionArchetype[x] = prevState.sectionArchetype[x];
          }
        });
        Object.keys(prevState.formOrder).forEach(x => {
          if (x !== path) {
            if (prevState.formOrder[x] > prevState.formOrder[path]) {
              obj[x] = prevState.formOrder[x] - 1;
            } else {
              obj[x] = prevState.formOrder[x];
            }
          }
        });
        return { ...prevState,
          formOrder: obj,
          openSectionArchetype: false,
          openSectionArchetypeData: null,
          sectionArchetype: { ...newSectionArchetype
          }
        };
      });
    });

    _defineProperty(this, "handleAddSectionArchetype", (sectionName, parentName, parentPath, parentOrder) => {
      this.setState(prevState => {
        // Descalar a ordem dos restantes elementos porque a secção passa a ter ordem = parentOrder + 1
        let max = -1;
        Object.keys(prevState.sectionArchetype).forEach(x => {
          const indexID = x.indexOf("id");
          const indexStop = x.indexOf(".");

          if (Number(x.slice(indexID + 2, indexStop)) > max) {
            max = x.slice(indexID + 2, indexStop);
          }
        }); // O path deve ser assim para ser único e para funcionar na ordenação

        const id = `id${Number(max) + 1}.${parentPath}.${sectionName.replace(/\s/g, "")}`;
        let obj = {};
        obj[id] = parentOrder + 1;
        Object.keys(prevState.formOrder).forEach(x => {
          if (prevState.formOrder[x] > parentOrder) {
            obj[x] = prevState.formOrder[x] + 1;
          } else {
            obj[x] = prevState.formOrder[x];
          }
        }); // Ir buscar o groupID do item a seguir à secção => poder ser um item/secção normal ou um any item

        const nextGroupID = objPath.get(this.state.templateGroupId, `${parentPath}.items.0`).groupID !== undefined ? objPath.get(this.state.templateGroupId, `${parentPath}.items.0`).groupID : objPath.get(this.state.templateGroupId, `${parentPath}.items.0.0`).groupID;
        return { ...prevState,
          formOrder: obj,
          openSectionArchetype: false,
          openSectionArchetypeData: null,
          sectionArchetype: { ...prevState.sectionArchetype,
            [id]: {
              sectionName: sectionName,
              groupID: nextGroupID,
              parentName: parentName,
              parentPath: parentPath
            }
          }
        };
      });
    });

    _defineProperty(this, "handleOpenCompositionPlanning", (path, datatype) => {
      if (path === this.state.openCompositionPlanningPath) {
        this.setState({
          openCompositionPlanning: false,
          openCompositionPlanningPath: "",
          openCompositionPlanningDatatype: ""
        });
      } else {
        this.setState({
          openCompositionPlanning: true,
          openCompositionPlanningPath: path,
          openCompositionPlanningDatatype: datatype
        });
      }
    });

    _defineProperty(this, "handleCompositionPlanning", (path, key, value) => {
      this.setState(prevState => ({ ...prevState,
        compositionPlanning: { ...prevState.compositionPlanning,
          [path]: { ...prevState.compositionPlanning[path],
            [key]: value
          }
        }
      }));
    });

    _defineProperty(this, "updateFormTitle", newName => {
      this.setState({
        formTitle: newName
      });
    });

    _defineProperty(this, "updateCompositionPlanningRefsets", value => {
      this.setState(prevState => ({ ...prevState,
        compositionPlanningRefsets: [...value]
      }));
    });

    _defineProperty(this, "updateCompositionPlanningTasks", value => {
      this.setState(prevState => ({ ...prevState,
        compositionPlanningTasks: [...value]
      }));
    });

    _defineProperty(this, "updateCompositionPlanningFunctions", value => {
      this.setState(prevState => ({ ...prevState,
        compositionPlanningFunctions: [...value]
      }));
    });

    _defineProperty(this, "updateCompositionPlanningInternalFunctions", value => {
      this.setState(prevState => ({ ...prevState,
        compositionPlanningInternalFunctions: [...value]
      }));
    });

    _defineProperty(this, "updateFormFields", value => {
      this.setState(prevState => ({ ...prevState,
        formFields: [...value]
      }));
    });

    _defineProperty(this, "handleSaveFormDesigner", type => {
      const textHeight = {};
      Object.keys(this.state.textHeight).forEach(p => {
        if (this.state.textHeight[p] !== "px") {
          textHeight[p] = this.state.textHeight[p];
        }
      });
      const formDesign = {
        formOrder: orderObjectByValue(this.state.formOrder),
        formTitle: this.state.formTitle,
        datatypes: this.state.datatypes,
        hsizes: this.state.hsizes,
        fileExtensions: this.state.fileExtensions,
        fileMaxSize: this.state.fileMaxSize,
        fontSize: this.state.fontSize,
        fontStyle: this.state.fontStyle,
        fontAlignment: this.state.fontAlignment,
        fontLetters: this.state.fontLetters,
        themeColor: this.state.themeColor,
        themePalette: this.state.themePalette,
        limitCharacters: this.state.limitCharacters,
        sectionArchetype: this.state.sectionArchetype,
        textHeight: this.state.textHeight,
        showSectionTitle: this.state.showSectionTitle
      };
      const composition = [];
      Object.keys(this.state.compositionPlanning).forEach(x => {
        composition.push(this.state.compositionPlanning[x]);
      });
      const formRM = this.state.referenceModelForm;

      if (type === "save" && typeof this.props.onSaveFormDesigner === "function") {
        this.props.onSaveFormDesigner(JSON.stringify({
          formDesign,
          compositionPlanning: composition
        }), JSON.stringify({
          formRM
        }));
      } else if (type === "create" && typeof this.props.onCreateFormDesigner === "function") {
        this.props.onCreateFormDesigner(JSON.stringify({
          formDesign,
          compositionPlanning: composition
        }), JSON.stringify({
          formRM
        }));
      }
    });
  }

  async componentDidMount() {
    let data;
    let formOrder;
    let formTitle;
    let datatypes;
    let hsizes;
    let fileExtensions;
    let fileMaxSize;
    let fontSize;
    let fontStyle;
    let fontAlignment;
    let fontLetters;
    let themeColor;
    let themePalette;
    let textHeight;
    let limitCharacters;
    let sectionArchetype;
    let showSectionTitle; // Valores defaults

    const defaultFontSize = {
      formTitle: "16px",
      sectionTitle: "12px",
      fieldTitle: "11px",
      field: "11px",
      button: "12px",
      header: "10px"
    };
    const defaultFontStyle = {
      formTitle: [],
      sectionTitle: [],
      fieldTitle: ["font-bold"],
      button: [],
      header: []
    };
    const defaultFontAlignment = {
      formTitle: "justify-center",
      sectionTitle: "justify-left",
      fieldTitle: "justify-left"
    };
    const defaultFontLetters = {
      formTitle: "normal-case",
      sectionTitle: "normal-case",
      fieldTitle: "normal-case",
      button: "normal-case"
    };
    const defaultThemeColor = "azul";
    const defaultThemePalette = themeColors["azul"];

    if (this.props.template && this.props.dlm) {
      data = await buildJDTRules(this.props.template, this.props.dlm); // return [newTemplate, order, compositionPlanning]

      formOrder = data[1];
      formTitle = this.props.template.templateName;
    } // Se for passado um formDesign, então o formOrder vai ser alterado


    if (this.props.formDesign) {
      try {
        const design = JSON.parse(this.props.formDesign);
        formOrder = design.formOrder ? design.formOrder : formOrder;
        formTitle = design.formTitle ? design.formTitle : formTitle;
        sectionArchetype = design.formOrder && design.sectionArchetype ? design.sectionArchetype : {};
        fontSize = design.fontSize && checkIfValidObject(design.fontSize, defaultFontSize) ? design.fontSize : defaultFontSize;
        fontStyle = design.fontStyle && checkIfValidObject(design.fontStyle, defaultFontStyle) ? design.fontStyle : defaultFontStyle;
        fontAlignment = design.fontAlignment && checkIfValidObject(design.fontAlignment, defaultFontAlignment) ? design.fontAlignment : defaultFontAlignment;
        fontLetters = design.fontLetters && checkIfValidObject(design.fontLetters, defaultFontLetters) ? design.fontLetters : defaultFontLetters;
        datatypes = design.datatypes;
        textHeight = design.textHeight;
        showSectionTitle = design.showSectionTitle;
        limitCharacters = design.limitCharacters;
        hsizes = design.hsizes;
        fileExtensions = design.fileExtensions;
        fileMaxSize = design.fileMaxSize;
        themeColor = design.themeColor === "personalizada" || themeColors[design.themeColor] !== undefined ? design.themeColor : defaultThemeColor;
        themePalette = design.themePalette && checkIfValidObject(design.themePalette, defaultThemePalette) ? design.themePalette : themeColors[design.themeColor] !== undefined ? themeColors[design.themeColor] : defaultThemePalette;
      } catch (e) {
        fontSize = defaultFontSize;
        fontStyle = defaultFontStyle;
        fontAlignment = defaultFontAlignment;
        fontLetters = defaultFontLetters;
        themeColor = defaultThemeColor;
        themePalette = defaultThemePalette;
      }
    } else {
      fontSize = defaultFontSize;
      fontStyle = defaultFontStyle;
      fontAlignment = defaultFontAlignment;
      fontLetters = defaultFontLetters;
      themeColor = defaultThemeColor;
      themePalette = defaultThemePalette;
    }

    if (this.props.formRM !== undefined && this.props.formRM !== null && this.props.formRM.length > 0) {
      this.props.formRM.forEach(rm => {
        this.setState(prevState => ({ ...prevState,
          referenceModelForm: [...prevState.referenceModelForm, rm]
        }));
      });
    }

    this.setState({
      formDesignerMode: this.props.formDesignerMode === true,
      templateGroupId: this.props.formDesignerMode === true ? data ? data[0] : null : null,
      compositionPlanning: this.props.formDesignerMode === true ? data ? data[2] : {} : {},
      formOrder: formOrder ? formOrder : null,
      formTitle: formTitle ? formTitle : null,
      sectionArchetype: sectionArchetype ? sectionArchetype : {},
      idJDT: this.props.idJDT,
      idComposition: this.props.idComposition ? this.props.idComposition : null,
      template: this.props.template,
      dlm: this.props.dlm,
      datatypes: datatypes ? datatypes : {},
      textHeight: textHeight ? textHeight : {},
      showSectionTitle: showSectionTitle ? showSectionTitle : {},
      limitCharacters: limitCharacters ? limitCharacters : {},
      hsizes: hsizes ? hsizes : {},
      fileExtensions: fileExtensions ? fileExtensions : {},
      fileMaxSize: fileMaxSize ? fileMaxSize : {},
      fontSize: fontSize ? fontSize : defaultFontSize,
      fontStyle: fontStyle ? fontStyle : defaultFontStyle,
      fontAlignment: fontAlignment ? fontAlignment : defaultFontAlignment,
      fontLetters: fontLetters ? fontLetters : defaultFontLetters,
      referenceModel: this.props.referenceModel && Array.isArray(this.props.referenceModel) ? this.props.referenceModel : [],
      themeColor: this.props.formColors && Array.isArray(this.props.formColors) ? this.props.formDesignerMode !== true && this.props.formColors.length === 4 ? this.props.formColors : themeColor : themeColor,
      themePalette: themePalette ? themePalette : defaultThemePalette,
      backgroundColor: this.props.pageBackgroundColor ? this.props.pageBackgroundColor : "default",
      showPalette: this.props.formDesignerMode === true,
      showPrint: this.props.formDesignerMode === true ? false : this.props.showPrint === true,
      editMode: this.props.editMode === true,
      professionalTasks: this.props.professionalTasks && Array.isArray(this.props.professionalTasks) ? this.props.professionalTasks : [],
      canSave: this.props.formDesignerMode === true ? false : this.props.canSave !== false,
      canSubmit: this.props.formDesignerMode === true ? false : this.props.canSubmit !== false,
      canSaveFD: this.props.formDesignerMode === true ? this.props.canSaveFD !== false : false,
      canCreateFD: this.props.formDesignerMode === true ? this.props.canCreateFD !== false : false,
      canCancel: this.props.canCancel !== false,
      patientData: this.props.patientData ? this.props.patientData : {},
      reportData: this.props.reportData ? this.props.reportData : {},
      token: this.props.token ? this.props.token : null,
      referenceModelJDT: this.props.rmJDT ? this.props.rmJDT : null,
      formRM: this.props.formRM === undefined ? [] : this.props.formRM,
      codigosDependencia: this.props.codigosDependencia && Array.isArray(this.props.codigosDependencia) ? this.props.codigosDependencia : null
    });
  } // Implementado para fazer o this.setState após a construção do formulário editável
  // Sem isso os erros não dão, precisa de haver mudança no estado...


  componentDidUpdate() {
    if (this.state.editMode && !this.state.confirmEditMode) {
      this.setState(prevState => ({ ...prevState,
        confirmEditMode: !prevState.confirmEditMode
      }));
    }
  }

  render() {
    let form = null;
    let formDesigner = null;

    if (!this.state.formDesignerMode && this.state.template) {
      if (this.state.editMode) {
        let isVisible = !this.state.template.TaskVisible ? false : handleIsVisible(this.state.template, this.state.professionalTasks);

        if (isVisible) {
          form = /*#__PURE__*/React.createElement(FormEditMode, {
            handleButtonClicked: type => this.setState({
              buttonClicked: type
            }),
            buttonClickType: this.state.buttonClicked,
            handleSubmit: (values, multipleSections) => this.handleSubmit(values, multipleSections),
            handleCancelForm: () => this.handleCancelForm(),
            professionalTasks: this.state.professionalTasks,
            submitButtonDisabled: this.props.submitButtonDisabled,
            saveButtonDisabled: this.props.saveButtonDisabled,
            showInformacaoComplementar: this.props.showInformacaoComplementar,
            showHeader: this.props.showHeader,
            canSave: this.state.canSave,
            canSubmit: this.state.canSubmit,
            canCancel: this.state.canCancel,
            showPrint: this.state.showPrint,
            idJDT: this.state.idJDT,
            idComposition: this.state.idComposition,
            template: this.state.template,
            formRM: this.state.formRM,
            formTitle: this.state.formTitle,
            multimediaFields: this.state.multimediaFields,
            patientData: this.props.patientData,
            userInfo: this.props.userInfo
          });
        }
      } else if (!this.state.editMode) {
        let isVisible;

        if (!this.state.template.TaskVisible) {
          isVisible = false;
        } else {
          isVisible = handleIsVisible(this.state.template, this.state.professionalTasks);
        }

        if (isVisible) {
          form = /*#__PURE__*/React.createElement(FormConsultMode, {
            professionalTasks: this.state.professionalTasks,
            showPrint: this.state.showPrint,
            template: this.state.template,
            formRM: this.state.formRM,
            formTitle: this.state.formTitle,
            idComposition: this.state.idComposition
          });
        }
      }
    } else if (this.state.formDesignerMode) {
      if (this.state.templateGroupId && this.state.formOrder) {
        formDesigner = /*#__PURE__*/React.createElement(FormDesignerMode, {
          handleFormOrder: this.handleFormOrder,
          handleCancelForm: () => this.handleCancelForm(),
          handleSaveFormDesigner: type => this.handleSaveFormDesigner(type),
          canCancel: this.state.canCancel,
          canCreateFD: this.state.canCreateFD,
          canSaveFD: this.state.canSaveFD,
          saveFDButtonDisabled: this.props.saveFDButtonDisabled,
          createFDButtonDisabled: this.props.createFDButtonDisabled,
          templateGroupId: this.state.templateGroupId,
          formTitle: this.state.formTitle,
          updateFormTitle: this.updateFormTitle
        });
      }
    }

    return /*#__PURE__*/React.createElement(FormModeContext.Provider, {
      value: this.state.formDesignerMode ? "design" : this.state.editMode ? "edit" : "consult"
    }, /*#__PURE__*/React.createElement(ReferenceModelContext.Provider, {
      value: {
        rmJDT: this.state.referenceModelJDT,
        rmForm: this.state.referenceModelForm,
        handleRM: this.handleRM,
        handleAddRM: this.handleAddRM,
        handleRemoveRM: this.handleRemoveRM
      }
    }, /*#__PURE__*/React.createElement(ThemeContext.Provider, {
      value: {
        themeColor: this.state.themeColor,
        themePalette: this.state.themePalette,
        handleThemePalette: this.handleThemePalette,
        handleThemeColor: this.handleThemeColor,
        handleCancelThemeChange: this.handleCancelThemeChange
      }
    }, /*#__PURE__*/React.createElement(BackgroundContext.Provider, {
      value: this.state.backgroundColor === "default" ? "#ffffff" : this.state.backgroundColor
    }, /*#__PURE__*/React.createElement(ChangedFieldsContext.Provider, {
      value: {
        value: this.state.changedFields,
        updateValue: this.handleChangedFields
      }
    }, /*#__PURE__*/React.createElement(DlmContextProvider, null, /*#__PURE__*/React.createElement(TokenContext.Provider, {
      value: this.state.token
    }, /*#__PURE__*/React.createElement(CodigosDependenciaContext.Provider, {
      value: this.state.codigosDependencia
    }, /*#__PURE__*/React.createElement(FormOrderContext.Provider, {
      value: this.state.formOrder
    }, /*#__PURE__*/React.createElement(DatatypesContext.Provider, {
      value: {
        datatypes: this.state.datatypes,
        updateDatatypes: this.handleDatatypes,
        textHeight: this.state.textHeight,
        updateTextHeight: this.handleTextHeight,
        limitCharacters: this.state.limitCharacters,
        updateLimitCharacters: this.handleLimitCharacaters,
        fileExtensions: this.state.fileExtensions,
        fileMaxSize: this.state.fileMaxSize,
        handleMultimediaFields: this.handleMultimediaFields,
        handleFileMaxSize: this.handleFileMaxSize,
        handleFileExtensions: this.handleFileExtensions,
        removeField: this.handleRemoveField,
        showSectionTitle: this.state.showSectionTitle,
        updateSectionTitle: this.handleSectionTitleVisibility
      }
    }, /*#__PURE__*/React.createElement(HSizesContext.Provider, {
      value: {
        sizes: this.state.hsizes,
        updateSizes: this.handleHSizes
      }
    }, /*#__PURE__*/React.createElement(FormDataContext.Provider, {
      value: {
        patientData: this.state.patientData,
        reportData: this.state.reportData,
        referenceModel: this.state.referenceModel
      }
    }, /*#__PURE__*/React.createElement(FontContext.Provider, {
      value: {
        fontSize: this.state.fontSize,
        handleFontSize: this.handleFontSize,
        fontStyle: this.state.fontStyle,
        handleFontStyle: this.handleFontStyle,
        fontLetters: this.state.fontLetters,
        handleFontLetters: this.handleFontLetters,
        fontAlignment: this.state.fontAlignment,
        handleFontAlignment: this.handleFontAlignment,
        handleCancelFontChange: this.handleCancelFontChange
      }
    }, /*#__PURE__*/React.createElement(CompositionPlanningContext.Provider, {
      value: {
        template: this.state.template,
        compositionPlanning: this.state.compositionPlanning,
        compositionPlanningRefsets: this.state.compositionPlanningRefsets,
        compositionPlanningTasks: this.state.compositionPlanningTasks,
        compositionPlanningFunctions: this.state.compositionPlanningFunctions,
        compositionPlanningInternalFunctions: this.state.compositionPlanningInternalFunctions,
        formFields: this.state.formFields,
        updateCompositionPlanningRefsets: this.updateCompositionPlanningRefsets,
        updateCompositionPlanningTasks: this.updateCompositionPlanningTasks,
        updateCompositionPlanningFunctions: this.updateCompositionPlanningFunctions,
        updateCompositionPlanningInternalFunctions: this.updateCompositionPlanningInternalFunctions,
        updateFormFields: this.updateFormFields,
        handleOpenCompositionPlanning: this.handleOpenCompositionPlanning,
        openCompositionPlanningPath: this.state.openCompositionPlanningPath,
        openCompositionPlanningDatatype: this.state.openCompositionPlanningDatatype,
        openCompositionPlanning: this.state.openCompositionPlanning,
        handleCompositionPlanning: this.handleCompositionPlanning
      }
    }, /*#__PURE__*/React.createElement(SectionArchetypeContext.Provider, {
      value: {
        sectionArchetype: this.state.sectionArchetype,
        handleOpenSectionArchetype: this.handleOpenSectionArchetype,
        openSectionArchetype: this.state.openSectionArchetype,
        openSectionArchetypeData: this.state.openSectionArchetypeData,
        handleSectionArchetype: this.handleAddSectionArchetype,
        handleEditSectionArchetype: this.handleEditSectionArchetype,
        handleRemoveSectionArchetype: this.handleRemoveSectionArchetype
      }
    }, /*#__PURE__*/React.createElement(PageContainer, null, this.state.formDesignerMode === false && this.state.professionalTasks.length > 0 && form, this.state.formDesignerMode === true && formDesigner))))))))))))))));
  }

}

export default Form;