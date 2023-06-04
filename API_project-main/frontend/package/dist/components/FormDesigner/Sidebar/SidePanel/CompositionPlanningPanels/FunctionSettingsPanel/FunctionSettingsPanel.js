import React, { useContext, useEffect, useState } from "react";
import SidePanel from "../../SidePanel";
import CombinedContext from "../../../../../../contexts/CombinedContext";
import ProviderCombinedContext from "../../../../../../contexts/ProviderCombinedContext";
import Tab from "../../../../UI/Tab/Tab";
import axios from "axios";
import CompositionPlanningPanel from "../CompositionPlanningPanel";
import { getFormFields } from "../../../../../../assets/functions/GetFormFields/getFormFields";
import { maxValueArray } from "../../../../../../assets/functions/Maximum/maxValueArray";
import ConfirmButton from "../../../../UI/Button/ConfirmButton";
import { getEnvUrl } from "../../../../../../environment";

const FunctionSettingsPanel = props => {
  const context = useContext(CombinedContext); // INTERNAL FUNCTIONS

  const [iFunctionSelected, setIFunction] = useState(null);
  const [showDrop, setShowDrop] = useState({
    showDropList: false,
    // Show primeiro dropdown dos conceitos
    showDropRefsets: false,
    // Show dropdown dos refsets
    showDropColRes: false,
    // Show dropdowm coluna com a resposta
    showDropField: false,
    // Show dropdown coluna com o campo a ser preenchido
    showDropDependencyField: [{
      id: 0,
      boolean: false
    }],
    // show dropdown campos dependencia
    showDropDependencyColumn: [{
      id: 0,
      boolean: false
    }],
    // show dropdown colunas dependencia
    showDropCodeColumn: false,
    showDropTextColumn: false
  });
  const [field, setField] = useState(null); // Campo a ser preenchido

  const [refset, setRefset] = useState(null); // refset selecionado

  const [columnRes, setColumnRes] = useState(null); // coluna com a resposta

  const [dependencies, setDependencies] = useState([{
    id: 0,
    columnRef: null,
    field: null
  }]); // dependencias

  const [codeColumn, setCodeColumn] = useState(null);
  const [textColumn, setTextColumn] = useState(null);

  const handleOpenDropList = key => {
    setShowDrop(prevState => ({ ...prevState,
      [key]: !prevState[key]
    }));
  };

  const handleIFunctionSelected = obj => {
    setIFunction(iFunctionSelected !== null && iFunctionSelected.id === obj.id ? null : obj);
    setShowDrop(prevState => ({ ...prevState,
      showDropList: false
    }));
    setField(null);
    setRefset(null);
  };

  const handleClearIFunction = () => {
    setIFunction(null);
    setField(null);
    setRefset(null);
    setShowDrop(prevState => ({ ...prevState,
      showDropList: false,
      showDropField: false,
      showDropRefsets: false
    }));
  };

  useEffect(() => {
    (async () => {
      if (iFunctionSelected !== null && iFunctionSelected.IFUNCAO === "Preenchimento automático de campos") {
        if (context.composition.compositionPlanningRefsets.length === 0) {
          axios({
            method: "get",
            url: `${getEnvUrl('aidarefsets', '4010')}/localRefsets`,
            // url: "http://172.21.220.49:4010/localRefsets",
            headers: {
              Authorization: "Bearer " + context.token
            }
          }).then(response => {
            if (response.data.success === true && Array.isArray(response.data.refsets)) {
              context.composition.updateCompositionPlanningRefsets(response.data.refsets);
            }
          });
        }

        if (context.composition.formFields.length === 0) {
          const values = await getFormFields(context.composition.template);
          context.composition.updateFormFields(values);
        }
      }
    })();
  }, [iFunctionSelected, context.token, context.composition]);

  const handleFieldSelected = obj => {
    setField(field === obj ? null : obj);
    setShowDrop(prevState => ({ ...prevState,
      showDropField: false
    }));
  };

  const handleRemoveField = () => {
    setField(null);
    setShowDrop(prevState => ({ ...prevState,
      showDropField: false
    }));
    setDependencies([{
      id: 0,
      columnRef: null,
      field: null
    }]);
    setColumnRes(null);
    setTextColumn(null);
    setCodeColumn(null);
  };

  const handleRefsetSelected = obj => {
    setRefset(refset === obj ? null : obj);
    setShowDrop(prevState => ({ ...prevState,
      showDropRefsets: false
    }));
  };

  const handleRemoveRefset = () => {
    setRefset(null);
    setShowDrop(prevState => ({ ...prevState,
      showDropRefsets: false
    }));
    setDependencies([{
      id: 0,
      columnRef: null,
      field: null
    }]);
    setColumnRes(null);
    setTextColumn(null);
    setCodeColumn(null);
  };

  const handleCodeColumnSelected = obj => {
    setCodeColumn(codeColumn === obj ? null : obj);
    setShowDrop(prevState => ({ ...prevState,
      showDropCodeColumn: false
    }));
  };

  const handleRemoveCodeColumn = () => {
    setCodeColumn(null);
    setShowDrop(prevState => ({ ...prevState,
      showDropCodeColumn: false
    }));
  };

  const handleTextColumnSelected = obj => {
    setTextColumn(textColumn === obj ? null : obj);
    setShowDrop(prevState => ({ ...prevState,
      showDropTextColumn: false
    }));
  };

  const handleRemoveTextColumn = () => {
    setTextColumn(null);
    setShowDrop(prevState => ({ ...prevState,
      showDropTextColumn: false
    }));
  };

  const handleColumnResSelected = obj => {
    setColumnRes(columnRes === obj ? null : obj);
    setShowDrop(prevState => ({ ...prevState,
      showDropColRes: false
    }));
  };

  const handleRemoveColumnRes = () => {
    setColumnRes(null);
    setShowDrop(prevState => ({ ...prevState,
      showDropColRes: false
    }));
  };

  const handleDependency = (id, type, value) => {
    let newDependencies = [];
    dependencies.forEach(obj => {
      if (obj.id === id) {
        newDependencies.push({ ...obj,
          [type]: value
        });
      } else {
        newDependencies.push(obj);
      }
    });
    setDependencies(newDependencies);
    let newShowDropDependencyColumn = [];
    showDrop.showDropDependencyColumn.forEach(obj => {
      newShowDropDependencyColumn.push({ ...obj,
        boolean: false
      });
    });
    let newShowDropDependencyField = [];
    showDrop.showDropDependencyField.forEach(obj => {
      newShowDropDependencyField.push({ ...obj,
        boolean: false
      });
    });
    setShowDrop(prevState => ({ ...prevState,
      showDropDependencyColumn: newShowDropDependencyColumn,
      showDropDependencyField: newShowDropDependencyField
    }));
  };

  const handleDropDependency = (id, type) => {
    let array = [];
    showDrop[type].forEach(obj => {
      if (obj.id === id) {
        array.push({ ...obj,
          boolean: !obj.boolean
        });
      } else {
        array.push(obj);
      }
    });
    setShowDrop(prevState => ({ ...prevState,
      [type]: array
    }));
  };

  const removeDependency = id => {
    let newDependencies = dependencies.filter(obj => obj.id !== id);
    let newShowDropDependencyField = showDrop.showDropDependencyField.filter(obj => obj.id !== id);
    let newShowDropDependencyColumn = showDrop.showDropDependencyColumn.filter(obj => obj.id !== id);
    setDependencies(newDependencies);
    setShowDrop(prevState => ({ ...prevState,
      showDropDependencyColumn: newShowDropDependencyColumn,
      showDropDependencyField: newShowDropDependencyField
    }));
  };

  const addDependency = () => {
    const ids = dependencies.map(obj => {
      return obj.id;
    });
    let maxId = maxValueArray(ids);
    const newDependencies = [...dependencies, {
      id: maxId + 1,
      field: null,
      columnRef: null
    }];
    setDependencies(newDependencies);
    setShowDrop(prevState => ({ ...prevState,
      showDropDependencyColumn: [...prevState.showDropDependencyColumn, {
        id: maxId + 1,
        boolean: false
      }],
      showDropDependencyField: [...prevState.showDropDependencyField, {
        id: maxId + 1,
        boolean: false
      }]
    }));
  };

  const handleComposition = () => {
    let value = [];

    if (iFunctionSelected.IFUNCAO === "Preenchimento automático de campos") {
      if (context.composition.compositionPlanning[context.composition.openCompositionPlanningPath] && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath]["InternalFunctions"] && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath]["InternalFunctions"].length > 0 && context.composition.compositionPlanning[context.composition.openCompositionPlanningPath]["InternalFunctions"].filter(obj => obj.type === "Preenchimento automático de campos").length > 0) {
        let currentValue = context.composition.compositionPlanning[context.composition.openCompositionPlanningPath]["InternalFunctions"].filter(obj => obj.type === "Preenchimento automático de campos")[0];
        let obj = { ...currentValue.affectedFields
        };
        let props = {};
        dependencies.forEach(y => {
          props[y.columnRef] = y.field.path;
        });
        currentValue.affectedFields = { ...obj,
          [field.path]: {
            url: `${getEnvUrl('aidarefsets', '4010')}/`,
            // url: "http://172.21.220.49:4010/",
            serviceName: `refsetConceptsPaginated?id=${refset.id}`,
            method: "post",
            body: {
              page: 0,
              props: [props]
            },
            datatype: field.datatype,
            upperOccurrences: field.upperOccurrences,
            name: field.name,
            path: field.path,
            refsetName: refset.name,
            refsetId: refset.id,
            resColumn: columnRes,
            codeColumn: codeColumn,
            textColumn: textColumn,
            dependencies: dependencies.map(y => {
              return {
                columnRef: y.columnRef,
                field: y.field
              };
            })
          }
        };
        value = [...context.composition.compositionPlanning[context.composition.openCompositionPlanningPath]["InternalFunctions"].filter(obj => obj.type !== "Preenchimento automático de campos"), currentValue];
      } else {
        let props = {};
        dependencies.forEach(y => {
          props[y.columnRef] = y.field.path;
        });
        value = [...context.composition.compositionPlanning[context.composition.openCompositionPlanningPath]["InternalFunctions"], {
          affectedFields: {
            [field.path]: {
              url: `${getEnvUrl('aidarefsets', '4010')}/`,
              // url: "http://172.21.220.49:4010/",
              serviceName: `refsetConceptsPaginated?id=${refset.id}`,
              method: "post",
              body: {
                page: 0,
                props: [props]
              },
              datatype: field.datatype,
              upperOccurrences: field.upperOccurrences,
              name: field.name,
              path: field.path,
              refsetName: refset.name,
              refsetId: refset.id,
              resColumn: columnRes,
              codeColumn: codeColumn,
              textColumn: textColumn,
              dependencies: dependencies.map(y => {
                return {
                  columnRef: y.columnRef,
                  field: y.field
                };
              })
            }
          },
          type: "Preenchimento automático de campos"
        }];
      }
    }

    context.composition.handleCompositionPlanning(context.composition.openCompositionPlanningPath, "InternalFunctions", value);
    setField(null);
    setRefset(null);
    setColumnRes(null);
    setCodeColumn(null);
    setTextColumn(null);
    setDependencies([{
      id: 0,
      columnRef: null,
      field: null
    }]);
    setShowDrop(prevState => ({ ...prevState,
      showDropList: false,
      showDropRefsets: false,
      showDropColRes: false,
      showDropField: false,
      showDropDependencyField: [{
        id: 0,
        boolean: false
      }],
      showDropDependencyColumn: [{
        id: 0,
        boolean: false
      }],
      showDropCodeColumn: false,
      showDropTextColumn: false
    }));
  }; // FUNCTIONS


  const [searchValue, setSearchValue] = useState("");
  const [functionSelected, setFunction] = useState(null);
  const [concepts, setConcepts] = useState(null);
  const [showDropConcepts, setShowDropConcepts] = useState(false);
  const [conceptSelected, setConcept] = useState(null);
  useEffect(() => {
    functionSelected !== null && axios({
      method: "get",
      url: `${getEnvUrl('aidarefsets', '4010')}/refsetConcepts?id=${functionSelected.id}`,
      // url: `http://172.21.220.49:4010/refsetConcepts?id=${functionSelected.id}`,
      headers: {
        Authorization: "Bearer " + context.token
      }
    }).then(response => {
      if (response.data.success === true) {
        setConcepts(response.data.concepts);
      } else {
        setConcepts([]);
      }
    }).catch(error => {
      setConcepts([]);
    });
  }, [functionSelected, context.token]);

  const handleFunctionsComposition = () => {
    const value = [conceptSelected.functionName];
    context.composition.handleCompositionPlanning(context.composition.openCompositionPlanningPath, "Functions", value);
    setFunction(null);
    setConcept(null);
    setShowDropConcepts(false);
  };

  const handleFunctionSelected = obj => {
    setFunction(functionSelected !== null && functionSelected.id === obj.id ? null : obj);
    setConcept(null);
    setConcepts(null);
  };

  const handleSetValue = value => {
    setConcept(conceptSelected !== null && conceptSelected === value ? null : value);
    setShowDropConcepts(false);
  };

  const handleClearValue = () => {
    setConcept(null);
    setShowDropConcepts(false);
  };

  const handleSetShowDropConcepts = () => {
    setShowDropConcepts(!showDropConcepts);
  };

  const handleRemoveFilter = () => {
    setSearchValue("");
    setFunction(null);
    setConcepts(null);
  };

  const handleCancelChanges = () => {
    props.onCancel(); // ver se ao carregar no botão de cancelar, queremos que o item fique deseleccionado -> descomentar linha de baixo
    //await this.context.composition.handleOpenCompositionPlanning(this.context.composition.openCompositionPlanningPath);
  };

  const handleConfirmChanges = () => {
    functionSelected !== null && conceptSelected !== null && handleFunctionsComposition();
  };

  let bodyDataFunctions = [{
    value: conceptSelected,
    valueKey: "functionName",
    placeholder: "Selecione uma função...",
    type: "dropdown",
    key: "concepts",
    isDropSelected: showDropConcepts,
    dropList: concepts,
    dropListID: "idFunction",
    dropListTextID: "functionName",
    handleOpenDrop: handleSetShowDropConcepts,
    handleSetValue: handleSetValue,
    handleClearValue: handleClearValue
  }];
  let bodyDataInternalFunctions1 = [{
    title: "Campo a ser preenchido",
    value: field,
    valueKey: "name",
    placeholder: "Selecione um campo...",
    type: "dropdown",
    key: "field",
    isDropSelected: showDrop.showDropField,
    dropList: context.composition.formFields,
    dropListID: "path",
    dropListTextID: "name",
    handleOpenDrop: handleOpenDropList,
    handleSetValue: handleFieldSelected,
    handleClearValue: handleRemoveField
  }, {
    title: "Refset",
    value: refset,
    valueKey: "name",
    placeholder: "Selecione um refset...",
    type: "dropdown",
    key: "refsets",
    isDropSelected: showDrop.showDropRefsets,
    dropList: context.composition.compositionPlanningRefsets,
    dropListID: "id",
    dropListTextID: "name",
    handleOpenDrop: handleOpenDropList,
    handleSetValue: handleRefsetSelected,
    handleClearValue: handleRemoveRefset
  }];
  let bodyDataInternalFunctions2 = [];
  let bodyDataInternalFunctions3 = [];

  if (refset !== null && field !== null) {
    bodyDataInternalFunctions2 = [{
      type: "dependency",
      title: "Associar dependências",
      text: "Nota: Para os campos com opções, o identificador único é utilizado como variável para associar à coluna do refset.",
      dependencies: dependencies,
      handleDependency: handleDependency,
      handleOpenDrop: handleDropDependency,
      showDropDependencyField: showDrop.showDropDependencyField,
      showDropDependencyColumn: showDrop.showDropDependencyColumn,
      formFields: context.composition.formFields,
      refsets: refset.concept_keys,
      removeDependency: removeDependency,
      addDependency: addDependency
    }];
    bodyDataInternalFunctions3 = field.datatype === "DV_CODED_TEXT" ? [{
      title: "Coluna do identificador único do resultado",
      value: codeColumn,
      placeholder: "Selecione uma coluna...",
      type: "dropdown",
      key: "codeColumn",
      isDropSelected: showDrop.showDropCodeColumn,
      dropList: refset.concept_keys,
      handleOpenDrop: handleOpenDropList,
      handleSetValue: handleCodeColumnSelected,
      handleClearValue: handleRemoveCodeColumn
    }, {
      title: "Coluna da designação do resultado",
      value: textColumn,
      placeholder: "Selecione uma coluna...",
      type: "dropdown",
      key: "textColumn",
      isDropSelected: showDrop.showDropTextColumn,
      dropList: refset.concept_keys,
      handleOpenDrop: handleOpenDropList,
      handleSetValue: handleTextColumnSelected,
      handleClearValue: handleRemoveTextColumn
    }] : [{
      title: "Coluna do resultado",
      value: columnRes,
      placeholder: "Selecione uma coluna...",
      type: "dropdown",
      key: "colRes",
      isDropSelected: showDrop.showDropColRes,
      dropList: refset.concept_keys,
      handleOpenDrop: handleOpenDropList,
      handleSetValue: handleColumnResSelected,
      handleClearValue: handleRemoveColumnRes
    }];
  }

  let bodyDataInternalFunctions = bodyDataInternalFunctions1.concat(bodyDataInternalFunctions2, bodyDataInternalFunctions3);
  let functionsList = context.composition.compositionPlanningFunctions;
  let internalFunctionsList = context.composition.compositionPlanningInternalFunctions;
  let functionsContent;
  let internalFunctionsContent;
  functionsContent = context.composition.openCompositionPlanning && /*#__PURE__*/React.createElement(CompositionPlanningPanel, {
    jsonTitle: "Functions",
    itemsList: functionsList,
    selectedItem: functionSelected,
    handleSelectItem: handleFunctionSelected,
    badgePrefix: "F",
    hasSearchBar: true,
    searchBarType: "SearchBar",
    searchValue: searchValue,
    handleChangeSearch: setSearchValue,
    handleRemoveFilter: handleRemoveFilter,
    concepts: concepts,
    bodyData: bodyDataFunctions
  });
  internalFunctionsContent = context.composition.openCompositionPlanning && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CompositionPlanningPanel, {
    jsonTitle: "InternalFunctions",
    itemsList: internalFunctionsList,
    hasSearchBar: false,
    selectedItem: iFunctionSelected,
    dropListID: "ID",
    dropListTextID: "IFUNCAO",
    showDropList: showDrop.showDropList,
    handleOpenDrop: handleOpenDropList,
    dropKey: "list",
    handleClearValue: handleClearIFunction,
    handleSelectItem: handleIFunctionSelected,
    bodyData: bodyDataInternalFunctions
  }), refset !== null && field !== null && (field.datatype !== "DV_CODED_TEXT" ? columnRes !== null : codeColumn !== null && textColumn !== null) && dependencies.filter(obj => obj.columnRef !== null && obj.field !== null).length === dependencies.length && /*#__PURE__*/React.createElement(ConfirmButton, {
    title: "Criar depend\xEAncia",
    handleConfirm: handleComposition
  }));
  const tabData = [{
    title: 'Funções',
    content: functionsContent
  }, {
    title: 'Funções Internas',
    content: internalFunctionsContent
  }];
  const content = /*#__PURE__*/React.createElement(Tab, {
    tabData: tabData
  });
  return /*#__PURE__*/React.createElement(ProviderCombinedContext, null, /*#__PURE__*/React.createElement(SidePanel, {
    title: "Associar Fun\xE7\xE3o",
    content: content,
    isSidePanelOpen: props.isSidePanelOpen,
    collapseSidePanel: () => props.collapseSidePanel(),
    onCancelChanges: () => handleCancelChanges(),
    onClosed: () => handleConfirmChanges()
  }));
};

export default FunctionSettingsPanel;